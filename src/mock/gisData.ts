import {
  Parcel,
  NeighbourParcel,
  Building,
  Conflict,
  ParcelLayersConfig,
  ParcelGISFeatureCollection,
} from "@/types/parcel";

/**
 * Cadastral Center: Kondalampatti, Salem, Tamil Nadu
 * Coordinates: [11.6234, 78.1362]
 * Note: Standard GeoJSON geometry coordinates are in [longitude, latitude] order.
 */

export const MOCK_PARCEL_GIS: Parcel = {
  parcelId: "BS-P00125",
  ulpin: "TN-SLM-2024-000125",
  owner: "Ravi Kumar & Priya R. Kumar",
  surveyNumber: "125/2",
  area: "2.00 acres",
  areaAcres: 2.0,
  village: "Kondalampatti",
  taluk: "Salem",
  district: "Salem",
  state: "Tamil Nadu",
  status: "Verified",
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [78.13575, 11.62385], // M1 (NW Corner)
        [78.13665, 11.62385], // M2 (NE Corner)
        [78.13665, 11.62300], // M3 (SE Corner)
        [78.13575, 11.62300], // M4 (SW Corner)
        [78.13575, 11.62385], // Closure
      ],
    ],
  },
};

export const MOCK_NEIGHBOUR_PARCELS: NeighbourParcel[] = [
  {
    parcelId: "BS-P00126",
    owner: "R. Meena",
    surveyNumber: "125/1",
    area: "3.50 acres",
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [78.13575, 11.62510],
          [78.13680, 11.62510],
          [78.13680, 11.62385],
          [78.13575, 11.62385],
          [78.13575, 11.62510],
        ],
      ],
    },
  },
  {
    parcelId: "BS-P00132",
    owner: "S. Arul",
    surveyNumber: "126/1",
    area: "2.80 acres",
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [78.13680, 11.62510],
          [78.13770, 11.62510],
          [78.13770, 11.62385],
          [78.13680, 11.62385],
          [78.13680, 11.62510],
        ],
      ],
    },
  },
  {
    parcelId: "BS-P00127",
    owner: "K. Selvam",
    surveyNumber: "125/3",
    area: "1.90 acres",
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [78.13665, 11.62385],
          [78.13760, 11.62385],
          [78.13760, 11.62300],
          [78.13665, 11.62300],
          [78.13665, 11.62385],
        ],
      ],
    },
  },
  {
    parcelId: "BS-P00128",
    owner: "L. Priya",
    surveyNumber: "125/4",
    area: "2.10 acres",
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [78.13665, 11.62300],
          [78.13760, 11.62300],
          [78.13760, 11.62210],
          [78.13665, 11.62210],
          [78.13665, 11.62300],
        ],
      ],
    },
  },
  {
    parcelId: "BS-P00123",
    owner: "P. Natarajan",
    surveyNumber: "124/1",
    area: "2.40 acres",
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [78.13575, 11.62300],
          [78.13665, 11.62300],
          [78.13665, 11.62210],
          [78.13575, 11.62210],
          [78.13575, 11.62300],
        ],
      ],
    },
  },
  {
    parcelId: "BS-P00124",
    owner: "V. Raghavan",
    surveyNumber: "124/2",
    area: "1.75 acres",
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [78.13480, 11.62385],
          [78.13575, 11.62385],
          [78.13575, 11.62300],
          [78.13480, 11.62300],
          [78.13480, 11.62385],
        ],
      ],
    },
  },
];

export const MOCK_BUILDINGS: Building[] = [
  // Selected Parcel (BS-P00125) - Main House Footprint (36.5m x 25.9m)
  {
    id: "BLD-P125-01",
    parcelId: "BS-P00125",
    name: "Main Residence (G+2 Multi-Storey Villa)",
    type: "residential",
    dimensions: "36.5m × 25.9m (120 ft × 85 ft)",
    areaSqMeters: 946.0,
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [78.13600, 11.62365],
          [78.13635, 11.62365],
          [78.13635, 11.62340],
          [78.13615, 11.62340],
          [78.13615, 11.62335],
          [78.13600, 11.62335],
          [78.13600, 11.62365],
        ],
      ],
    },
  },
  // Selected Parcel (BS-P00125) - Covered Parking / Generator Facility
  {
    id: "BLD-P125-02",
    parcelId: "BS-P00125",
    name: "Utility Garage & Solar Substation",
    type: "outbuilding",
    dimensions: "12.0m × 8.0m",
    areaSqMeters: 96.0,
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [78.13585, 11.62325],
          [78.13596, 11.62325],
          [78.13596, 11.62315],
          [78.13585, 11.62315],
          [78.13585, 11.62325],
        ],
      ],
    },
  },
  // Neighbour BS-P00124 (V. Raghavan) - Residential House
  {
    id: "BLD-P124-01",
    parcelId: "BS-P00124",
    name: "V. Raghavan House (G+1)",
    type: "residential",
    dimensions: "22.0m × 16.0m",
    areaSqMeters: 352.0,
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [78.13515, 11.62360],
          [78.13545, 11.62360],
          [78.13545, 11.62335],
          [78.13515, 11.62335],
          [78.13515, 11.62360],
        ],
      ],
    },
  },
  // Neighbour BS-P00126 (R. Meena) - Farmhouse Residence
  {
    id: "BLD-P126-01",
    parcelId: "BS-P00126",
    name: "R. Meena Villa (Ground Floor)",
    type: "residential",
    dimensions: "28.0m × 20.0m",
    areaSqMeters: 560.0,
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [78.13615, 11.62470],
          [78.13655, 11.62470],
          [78.13655, 11.62435],
          [78.13615, 11.62435],
          [78.13615, 11.62470],
        ],
      ],
    },
  },
  // Neighbour BS-P00127 (K. Selvam) - Main Villa
  {
    id: "BLD-P127-01",
    parcelId: "BS-P00127",
    name: "K. Selvam Main House",
    type: "residential",
    dimensions: "24.0m × 18.0m",
    areaSqMeters: 432.0,
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [78.13695, 11.62360],
          [78.13735, 11.62360],
          [78.13735, 11.62335],
          [78.13695, 11.62335],
          [78.13695, 11.62360],
        ],
      ],
    },
  },
  // Neighbour BS-P00127 (K. Selvam) - Outbuilding that extends across boundary (Encroachment)
  {
    id: "BLD-P127-02",
    parcelId: "BS-P00127",
    name: "K. Selvam Outbuilding / Store",
    type: "outbuilding",
    dimensions: "15.0m × 8.5m",
    areaSqMeters: 127.5,
    isEncroaching: true,
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [78.13660, 11.62375], // Crosses western line of 125/3 into 125/2 by 0.00005 deg (~5.5m)
          [78.13680, 11.62375],
          [78.13680, 11.62365],
          [78.13660, 11.62365],
          [78.13660, 11.62375],
        ],
      ],
    },
  },
  // Neighbour BS-P00128 (L. Priya) - Residence
  {
    id: "BLD-P128-01",
    parcelId: "BS-P00128",
    name: "L. Priya Residence",
    type: "residential",
    dimensions: "20.0m × 15.0m",
    areaSqMeters: 300.0,
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [78.13695, 11.62270],
          [78.13735, 11.62270],
          [78.13735, 11.62245],
          [78.13695, 11.62245],
          [78.13695, 11.62270],
        ],
      ],
    },
  },
  // Neighbour BS-P00123 (P. Natarajan) - Residence
  {
    id: "BLD-P123-01",
    parcelId: "BS-P00123",
    name: "P. Natarajan House",
    type: "residential",
    dimensions: "25.0m × 18.0m",
    areaSqMeters: 450.0,
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [78.13600, 11.62270],
          [78.13645, 11.62270],
          [78.13645, 11.62245],
          [78.13600, 11.62245],
          [78.13600, 11.62270],
        ],
      ],
    },
  },
];

export const MOCK_CONFLICTS: Conflict[] = [
  // CONFLICT 1: Boundary Overlap (32 sq m) with BS-P00126
  {
    id: "CONF-01",
    parcelId: "BS-P00125",
    type: "Boundary Overlap",
    severity: "HIGH",
    description: "Selected parcel overlaps neighbouring parcel BS-P00126.",
    affectedArea: "32 sq m",
    relatedParcelId: "BS-P00126",
    status: "Potential Inconsistency Detected",
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [78.13590, 11.62388],
          [78.13625, 11.62388],
          [78.13625, 11.62383],
          [78.13590, 11.62383],
          [78.13590, 11.62388],
        ],
      ],
    },
    centerPoint: [11.62385, 78.13608],
    officerWorkflow: {
      status: "Verification Required",
      suggestedAction: "Tahsildar Joint Resurvey under Section 9, TN Survey & Boundaries Act",
      statutoryRef: "DISP-2026-089",
    },
  },
  // CONFLICT 2: Structure Encroachment (8.5 sq m) from BS-P00127
  {
    id: "CONF-02",
    parcelId: "BS-P00125",
    type: "Structure Encroachment",
    severity: "HIGH",
    description: "A neighbouring building extends into the selected parcel.",
    affectedArea: "8.5 sq m",
    relatedParcelId: "BS-P00127",
    status: "Potential Inconsistency Detected",
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [78.13660, 11.62375],
          [78.13665, 11.62375],
          [78.13665, 11.62365],
          [78.13660, 11.62365],
          [78.13660, 11.62375],
        ],
      ],
    },
    centerPoint: [11.62370, 78.13663],
    officerWorkflow: {
      status: "Verification Required",
      suggestedAction: "Issue Notice for Boundary Demarcation to Owner of Survey 125/3 (K. Selvam)",
      statutoryRef: "ENC-2026-102",
    },
  },
  // CONFLICT 3: Area Mismatch (0.13 acres) Road Setback
  {
    id: "CONF-03",
    parcelId: "BS-P00125",
    type: "Area Mismatch",
    severity: "MEDIUM",
    description: "Document Area: 2.00 acres vs GIS Area: 1.87 acres (Difference: 0.13 acres)",
    affectedArea: "0.13 acres (526 sq m)",
    relatedParcelId: "BS-P00123",
    status: "Potential Inconsistency Detected",
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [78.13575, 11.62306],
          [78.13665, 11.62306],
          [78.13665, 11.62300],
          [78.13575, 11.62300],
          [78.13575, 11.62306],
        ],
      ],
    },
    centerPoint: [11.62303, 78.13620],
    officerWorkflow: {
      status: "Verification Required",
      suggestedAction: "Harmonize Patta Extent with Salem Master Plan Road Corridor Reserve",
      statutoryRef: "REV-2026-441",
    },
  },
];

export const DEFAULT_PARCEL_LAYERS: ParcelLayersConfig = {
  parcelBoundaries: true,
  buildingStructures: true,
  surveyNumbers: true,
  conflictAreas: true,
  satelliteImagery: true,
  roads: false,
  utilities: false,
};

export function getFullFeatureCollection(): ParcelGISFeatureCollection {
  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          id: MOCK_PARCEL_GIS.parcelId,
          type: "SELECTED_PARCEL",
          owner: MOCK_PARCEL_GIS.owner,
          survey: MOCK_PARCEL_GIS.surveyNumber,
          area: MOCK_PARCEL_GIS.area,
        },
        geometry: MOCK_PARCEL_GIS.geometry,
      },
      ...MOCK_NEIGHBOUR_PARCELS.map((p) => ({
        type: "Feature" as const,
        properties: {
          id: p.parcelId,
          type: "NEIGHBOUR_PARCEL",
          owner: p.owner,
          survey: p.surveyNumber,
          area: p.area,
        },
        geometry: p.geometry,
      })),
      ...MOCK_BUILDINGS.map((b) => ({
        type: "Feature" as const,
        properties: {
          id: b.id,
          type: "BUILDING",
          name: b.name,
          buildingType: b.type,
          parcelId: b.parcelId,
          dimensions: b.dimensions,
          areaSqMeters: b.areaSqMeters,
          isEncroaching: b.isEncroaching,
        },
        geometry: b.geometry,
      })),
      ...MOCK_CONFLICTS.map((c) => ({
        type: "Feature" as const,
        properties: {
          id: c.id,
          type: "CONFLICT",
          conflictType: c.type,
          severity: c.severity,
          affectedArea: c.affectedArea,
          description: c.description,
        },
        geometry: c.geometry,
      })),
    ],
  };
}
