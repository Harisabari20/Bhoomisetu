/**
 * Sovereign Cadastral Spatial Computational Geometry Engine
 * Implements real 2D GIS algorithms:
 * - Sutherland-Hodgman polygon clipping / intersection
 * - Ray-casting point-in-polygon
 * - WGS84 Geodesic Shoelace metric area calculation
 * - Dynamic spatial conflict derivation (Structure Encroachment, Boundary Overlap, Setbacks)
 */

export type Coordinate = [number, number]; // [lng, lat] (standard GeoJSON)

export interface GeoJSONPolygon {
  type: "Polygon";
  coordinates: Coordinate[][];
}

export interface SpatialParcel {
  id: string;
  surveyNumber: string;
  owner: string;
  recordedAreaAcres: number;
  geometry: GeoJSONPolygon;
}

export interface SpatialBuilding {
  id: string;
  name: string;
  parcelId: string;
  type: string;
  dimensions: string;
  geometry: GeoJSONPolygon;
}

export interface ComputedSpatialConflict {
  id: number;
  type: "STRUCTURE_ENCROACHMENT" | "BOUNDARY_OVERLAP" | "AREA_MISMATCH";
  title: string;
  severity: "CRITICAL" | "HIGH" | "MODERATE";
  affectedAreaSqM: number;
  affectedAreaAcres: number;
  affectedGeometry: GeoJSONPolygon;
  primaryParcelId: string;
  relatedParcelId?: string;
  relatedStructureId?: string;
  status: "Potential Inconsistency" | "Under Review" | "Requires Officer Verification";
  description: string;
  centerPoint: [number, number]; // [lat, lng] for camera
}

// ---------------------------------------------------------------------------
// 1. POINT IN POLYGON (Ray-casting Algorithm)
// ---------------------------------------------------------------------------
export function isPointInPolygon(point: Coordinate, polygon: Coordinate[]): boolean {
  const [x, y] = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

// ---------------------------------------------------------------------------
// 2. METRIC GEODESIC AREA CALCULATION (WGS84 Shoelace)
// ---------------------------------------------------------------------------
export function computePolygonAreaSqMeters(coordinates: Coordinate[]): number {
  if (!coordinates || coordinates.length < 3) return 0;
  const R = 6378137.0; // Earth radius in meters

  // Find mean latitude for local projection
  let latSum = 0;
  for (const coord of coordinates) {
    latSum += coord[1];
  }
  const meanLatRad = ((latSum / coordinates.length) * Math.PI) / 180.0;
  const cosMeanLat = Math.cos(meanLatRad);

  // Convert (lng, lat) to local Cartesian meters (x, y)
  const pts = coordinates.map(([lng, lat]) => [
    ((lng * Math.PI) / 180.0) * R * cosMeanLat,
    ((lat * Math.PI) / 180.0) * R,
  ]);

  // Shoelace formula
  let area = 0.0;
  for (let i = 0; i < pts.length; i++) {
    const j = (i + 1) % pts.length;
    area += pts[i][0] * pts[j][1] - pts[j][0] * pts[i][1];
  }

  return Math.abs(area) / 2.0;
}

export function sqMetersToAcres(sqMeters: number): number {
  return sqMeters / 4046.8564224;
}

// ---------------------------------------------------------------------------
// 3. SUTHERLAND-HODGMAN POLYGON CLIPPING (Polygon Intersection)
// ---------------------------------------------------------------------------
function isInside(p: Coordinate, cp1: Coordinate, cp2: Coordinate): boolean {
  return (cp2[0] - cp1[0]) * (p[1] - cp1[1]) > (cp2[1] - cp1[1]) * (p[0] - cp1[0]);
}

function intersection(cp1: Coordinate, cp2: Coordinate, s: Coordinate, e: Coordinate): Coordinate {
  const dc = [cp1[0] - cp2[0], cp1[1] - cp2[1]];
  const dp = [s[0] - e[0], s[1] - e[1]];
  const n1 = cp1[0] * cp2[1] - cp1[1] * cp2[0];
  const n2 = s[0] * e[1] - s[1] * e[0];
  const n3 = 1.0 / (dc[0] * dp[1] - dc[1] * dp[0]);
  return [(n1 * dp[0] - n2 * dc[0]) * n3, (n1 * dp[1] - n2 * dc[1]) * n3];
}

export function polygonIntersection(
  subjectPoly: Coordinate[],
  clipPoly: Coordinate[]
): Coordinate[] {
  let outputList = subjectPoly;
  if (!clipPoly || clipPoly.length < 3 || !subjectPoly || subjectPoly.length < 3) return [];

  // Ensure rings don't have duplicate closing vertex during clipping
  const cleanClip =
    clipPoly[0][0] === clipPoly[clipPoly.length - 1][0] &&
    clipPoly[0][1] === clipPoly[clipPoly.length - 1][1]
      ? clipPoly.slice(0, -1)
      : clipPoly;

  for (let j = 0; j < cleanClip.length; j++) {
    const cp1 = cleanClip[j];
    const cp2 = cleanClip[(j + 1) % cleanClip.length];
    const inputList = outputList;
    outputList = [];
    if (inputList.length === 0) break;

    let s = inputList[inputList.length - 1];
    for (let i = 0; i < inputList.length; i++) {
      const e = inputList[i];
      if (isInside(e, cp1, cp2)) {
        if (!isInside(s, cp1, cp2)) {
          outputList.push(intersection(cp1, cp2, s, e));
        }
        outputList.push(e);
      } else if (isInside(s, cp1, cp2)) {
        outputList.push(intersection(cp1, cp2, s, e));
      }
      s = e;
    }
  }

  // Close ring if we have a valid polygon
  if (outputList.length >= 3) {
    outputList.push([outputList[0][0], outputList[0][1]]);
  }

  return outputList;
}

// ---------------------------------------------------------------------------
// 4. COMPUTED SPATIAL CONFLICT DETECTION ENGINE
// ---------------------------------------------------------------------------
export function detectSpatialConflicts(
  targetParcel: SpatialParcel,
  allParcels: SpatialParcel[],
  allBuildings: SpatialBuilding[],
  roadCorridorPoly?: Coordinate[]
): ComputedSpatialConflict[] {
  const conflicts: ComputedSpatialConflict[] = [];
  const targetRing = targetParcel.geometry.coordinates[0];

  // 1. Check for STRUCTURE ENCROACHMENT via literal polygon intersection
  for (const bld of allBuildings) {
    if (bld.parcelId === targetParcel.id) continue; // Own buildings are valid inside
    const bldRing = bld.geometry.coordinates[0];

    // Compute exact geographic intersection between building and target parcel
    const encroachingSlice = polygonIntersection(bldRing, targetRing);

    if (encroachingSlice.length >= 3) {
      const affectedAreaSqM = computePolygonAreaSqMeters(encroachingSlice);

      // Only flag if physically meaningful (> 0.5 m² to avoid floating point noise)
      if (affectedAreaSqM > 0.5) {
        // Compute centroid of encroaching slice for camera targeting
        let sumLat = 0;
        let sumLng = 0;
        for (let i = 0; i < encroachingSlice.length - 1; i++) {
          sumLng += encroachingSlice[i][0];
          sumLat += encroachingSlice[i][1];
        }
        const count = encroachingSlice.length - 1;
        const centerPoint: [number, number] = [sumLat / count, sumLng / count];

        conflicts.push({
          id: 2,
          type: "STRUCTURE_ENCROACHMENT",
          title: "Structure Encroachment",
          severity: "CRITICAL",
          affectedAreaSqM: Math.round(affectedAreaSqM * 10) / 10,
          affectedAreaAcres: sqMetersToAcres(affectedAreaSqM),
          affectedGeometry: {
            type: "Polygon",
            coordinates: [encroachingSlice],
          },
          primaryParcelId: targetParcel.id,
          relatedParcelId: bld.parcelId,
          relatedStructureId: bld.id,
          status: "Potential Inconsistency",
          description: `Structure ${bld.name} (${bld.dimensions}) owned by neighbor parcel ${bld.parcelId} crosses the cadastral boundary by ${Math.round(affectedAreaSqM * 10) / 10} sq m into ${targetParcel.id}.`,
          centerPoint,
        });
      }
    }
  }

  // 2. Check for BOUNDARY OVERLAP between target parcel and neighboring parcels
  for (const neighbor of allParcels) {
    if (neighbor.id === targetParcel.id) continue;
    const neighborRing = neighbor.geometry.coordinates[0];

    const overlapPoly = polygonIntersection(targetRing, neighborRing);
    if (overlapPoly.length >= 3) {
      const overlapSqM = computePolygonAreaSqMeters(overlapPoly);
      if (overlapSqM > 1.0) {
        let sumLat = 0;
        let sumLng = 0;
        for (let i = 0; i < overlapPoly.length - 1; i++) {
          sumLng += overlapPoly[i][0];
          sumLat += overlapPoly[i][1];
        }
        const count = overlapPoly.length - 1;
        const centerPoint: [number, number] = [sumLat / count, sumLng / count];

        conflicts.push({
          id: 1,
          type: "BOUNDARY_OVERLAP",
          title: "Boundary Overlap",
          severity: "HIGH",
          affectedAreaSqM: Math.round(overlapSqM * 10) / 10,
          affectedAreaAcres: sqMetersToAcres(overlapSqM),
          affectedGeometry: {
            type: "Polygon",
            coordinates: [overlapPoly],
          },
          primaryParcelId: targetParcel.id,
          relatedParcelId: neighbor.id,
          status: "Requires Officer Verification",
          description: `Cadastral boundary overlap of ${Math.round(overlapSqM * 10) / 10} sq m detected between ${targetParcel.id} (Survey ${targetParcel.surveyNumber}) and ${neighbor.id} (Survey ${neighbor.surveyNumber}).`,
          centerPoint,
        });
      }
    }
  }

  // 3. Check for AREA MISMATCH / ROAD WIDENING SETBACK
  if (roadCorridorPoly && roadCorridorPoly.length >= 3) {
    const setbackSlice = polygonIntersection(targetRing, roadCorridorPoly);
    if (setbackSlice.length >= 3) {
      const setbackSqM = computePolygonAreaSqMeters(setbackSlice);
      if (setbackSqM > 5.0) {
        const setbackAcres = sqMetersToAcres(setbackSqM);
        let sumLat = 0;
        let sumLng = 0;
        for (let i = 0; i < setbackSlice.length - 1; i++) {
          sumLng += setbackSlice[i][0];
          sumLat += setbackSlice[i][1];
        }
        const count = setbackSlice.length - 1;
        const centerPoint: [number, number] = [sumLat / count, sumLng / count];

        conflicts.push({
          id: 3,
          type: "AREA_MISMATCH",
          title: "Area Mismatch (Road Corridor Setback)",
          severity: "MODERATE",
          affectedAreaSqM: Math.round(setbackSqM * 10) / 10,
          affectedAreaAcres: Math.round(setbackAcres * 100) / 100,
          affectedGeometry: {
            type: "Polygon",
            coordinates: [setbackSlice],
          },
          primaryParcelId: targetParcel.id,
          status: "Potential Inconsistency",
          description: `Revenue deed registers ${targetParcel.recordedAreaAcres.toFixed(2)} acres, but GIS spatial calculation measures a variance of ${Math.round(setbackAcres * 100) / 100} acres (${Math.round(setbackSqM)} m²) acquired for statutory road widening.`,
          centerPoint,
        });
      }
    }
  }

  return conflicts;
}
