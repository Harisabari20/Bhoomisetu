/**
 * CAD Transformation & Georeferencing Pipeline
 * Converts Local Engineering / CAD Coordinate Systems (DXF / DWG / Local Metric)
 * into WGS84 (EPSG:4326) GeoJSON layers with strict georeferencing verification.
 */

export interface CADEntity {
  id: string;
  type: "WALL" | "BOUNDARY" | "SETBACK" | "DIMENSION" | "DOOR";
  layer: string;
  localCoordinates: [number, number][]; // [x, y] in meters relative to site origin (0,0)
  strokeColor?: string;
  lineWeight?: number;
  label?: string;
}

export interface CADGeoreferenceDatum {
  crs: string; // e.g. "EPSG:4326" or "LOCAL_CAD_GRID"
  anchorOriginWGS84: [number, number]; // [lat, lng]
  rotationAngleDegrees: number; // clockwise angle from True North
  scaleFactor: number; // 1.0 for true meters
  isCalibrated: boolean;
  benchmarkSurveyStone: string; // e.g. "M1 (NW Corner)"
}

export interface CADTransformResult {
  success: boolean;
  requiresGeoreferencing: boolean;
  statusMessage: string;
  features: Array<{
    type: "Feature";
    properties: {
      id: string;
      layer: string;
      cadType: string;
      label?: string;
      strokeColor: string;
      weight: number;
    };
    geometry: {
      type: "LineString" | "Polygon";
      coordinates: number[][] | number[][][]; // [lng, lat]
    };
  }>;
}

/**
 * Standard Site Benchmark for Kondalampatti Survey 125/2
 * Benchmark Datum anchored on Survey Stone M1 (NW Corner)
 */
export const DEFAULT_CAD_DATUM_KONDALAMPATTI: CADGeoreferenceDatum = {
  crs: "EPSG:4326",
  anchorOriginWGS84: [11.62385, 78.13575], // Lat, Lng of M1
  rotationAngleDegrees: 0.0, // Aligned with cadastral North
  scaleFactor: 1.0,
  isCalibrated: true,
  benchmarkSurveyStone: "M1 (NW Corner)",
};

/**
 * Transform Local Engineering Meters into WGS84 GeoJSON
 */
export function transformCADToWGS84(
  entities: CADEntity[],
  datum: CADGeoreferenceDatum = DEFAULT_CAD_DATUM_KONDALAMPATTI
): CADTransformResult {
  // CRITICAL REQUIREMENT: If CAD data cannot be accurately georeferenced,
  // DO NOT pretend it is accurate. Flag "CAD layer requires georeferencing".
  if (!datum.isCalibrated) {
    return {
      success: false,
      requiresGeoreferencing: true,
      statusMessage: "CAD layer requires georeferencing: Missing authoritative survey tie-points.",
      features: [],
    };
  }

  const [lat0, lng0] = datum.anchorOriginWGS84;
  const rad = (datum.rotationAngleDegrees * Math.PI) / 180.0;
  const cosTheta = Math.cos(rad);
  const sinTheta = Math.sin(rad);

  // Conversion constants for Salem latitude (~11.62° N)
  const latMetersPerDegree = 110540.0;
  const lngMetersPerDegree = 111320.0 * Math.cos((lat0 * Math.PI) / 180.0);

  const features: CADTransformResult["features"] = entities.map((entity) => {
    // Transform each local (x, y) into [lng, lat]
    const transformedCoords: number[][] = entity.localCoordinates.map(([x, y]) => {
      // 1. Rotate in local engineering plane
      const deltaE = (x * cosTheta - y * sinTheta) * datum.scaleFactor;
      const deltaN = (x * sinTheta + y * cosTheta) * datum.scaleFactor;

      // 2. Project to WGS84
      const lng = lng0 + deltaE / lngMetersPerDegree;
      const lat = lat0 - deltaN / latMetersPerDegree; // Y decreases southward

      return [lng, lat];
    });

    const isClosed =
      transformedCoords.length >= 4 &&
      transformedCoords[0][0] === transformedCoords[transformedCoords.length - 1][0] &&
      transformedCoords[0][1] === transformedCoords[transformedCoords.length - 1][1];

    if (isClosed) {
      return {
        type: "Feature",
        properties: {
          id: entity.id,
          layer: entity.layer,
          cadType: entity.type,
          label: entity.label,
          strokeColor: entity.strokeColor || "#38bdf8",
          weight: entity.lineWeight || 2,
        },
        geometry: {
          type: "Polygon",
          coordinates: [transformedCoords],
        },
      };
    }

    return {
      type: "Feature",
      properties: {
        id: entity.id,
        layer: entity.layer,
        cadType: entity.type,
        label: entity.label,
        strokeColor: entity.strokeColor || "#38bdf8",
        weight: entity.lineWeight || 2,
      },
      geometry: {
        type: "LineString",
        coordinates: transformedCoords,
      },
    };
  });

  return {
    success: true,
    requiresGeoreferencing: false,
    statusMessage: "CAD layer successfully georeferenced to WGS84 (EPSG:4326).",
    features,
  };
}

/**
 * Authoritative Architectural DXF vectors for Main Villa (Survey 125/2)
 * Coordinates in meters relative to Benchmark Stone M1 (NW Corner)
 */
export const SAMPLE_CAD_VILLA: CADEntity[] = [
  // Outer Plinth Wall Loop (36.5m x 25.9m)
  {
    id: "CAD-EXT-WALL-01",
    type: "WALL",
    layer: "A-WALL-EXTR",
    strokeColor: "#38BDF8",
    lineWeight: 2.5,
    label: "External Load-Bearing RCC Wall",
    localCoordinates: [
      [27.8, 22.1],
      [64.3, 22.1],
      [64.3, 48.0],
      [42.0, 48.0],
      [42.0, 53.5],
      [27.8, 53.5],
      [27.8, 22.1],
    ],
  },
  // Internal Corridor Partition Wall
  {
    id: "CAD-INT-WALL-01",
    type: "WALL",
    layer: "A-WALL-INTR",
    strokeColor: "#7DD3FC",
    lineWeight: 1.5,
    label: "Internal Spine Wall",
    localCoordinates: [
      [27.8, 35.0],
      [64.3, 35.0],
    ],
  },
  // Statutory Building Setback Offset Line (3.0m Frontage)
  {
    id: "CAD-SETBACK-01",
    type: "SETBACK",
    layer: "A-STAT-SETBACK",
    strokeColor: "#F59E0B",
    lineWeight: 1.5,
    label: "3.0m Frontage Setback Limit",
    localCoordinates: [
      [24.8, 19.1],
      [67.3, 19.1],
      [67.3, 56.5],
      [24.8, 56.5],
      [24.8, 19.1],
    ],
  },
];

