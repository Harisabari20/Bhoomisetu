/**
 * Sovereign Cadastral Prototype GIS Dataset
 * Cadastral Unit: Kondalampatti, Salem Taluk, Salem District, Tamil Nadu
 * WGS 84 Coordinates: [11.6234° N, 78.1362° E]
 * Standard GeoJSON Polygon Coordinates are in [longitude, latitude]
 */

export interface DemoParcelGeometry {
  type: "Polygon";
  coordinates: number[][][]; // [lng, lat]
}

export interface DemoParcel {
  id: string;
  surveyNumber: string;
  ulpin: string;
  owner: string;
  area: number;
  areaUnit: string;
  village: string;
  taluk: string;
  district: string;
  state: string;
  status: "Verified" | "Potential Inconsistency" | "Requires Verification";
  geometry: DemoParcelGeometry;
  vertexNodes: Array<{ id: string; name: string; coord: [number, number]; desc: string }>;
}

export interface DemoNeighborParcel {
  id: string;
  surveyNumber: string;
  owner: string;
  area: number;
  areaUnit: string;
  geometry: DemoParcelGeometry;
  labelCoord: [number, number]; // [lat, lng]
}

export interface DemoStructure {
  id: string;
  parcelId: string;
  name: string;
  type: "residential" | "commercial" | "outbuilding" | "utility";
  dimensions: string;
  areaSqMeters: number;
  geometry: DemoParcelGeometry;
  isEncroaching?: boolean;
  encroachmentAreaSqM?: number;
  encroachmentGeometry?: DemoParcelGeometry;
}

export interface DemoConflict {
  id: number;
  type: "BOUNDARY_OVERLAP" | "STRUCTURE_ENCROACHMENT" | "AREA_MISMATCH";
  title: string;
  area: number;
  unit: string;
  severity: "HIGH" | "MEDIUM" | "LOW";
  detectedBetween?: string[];
  detectedStructure?: string;
  parcelId?: string;
  revenueArea?: number;
  gisArea?: number;
  difference?: number;
  source: string;
  confidence: number;
  status: string;
  action?: string;
  description: string;
  geometry: DemoParcelGeometry;
  centerPoint: [number, number]; // [lat, lng] for zoom
}

// ---------------------------------------------------------------------------
// 1. TARGET SUBJECT PARCEL (BS-P00125)
// ---------------------------------------------------------------------------
export const DEMO_PARCEL: DemoParcel = {
  id: "BS-P00125",
  surveyNumber: "125/2",
  ulpin: "TN-SLM-2024-000125",
  owner: "Ravi Kumar & Priya R. Kumar",
  area: 2.0,
  areaUnit: "acres",
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
  vertexNodes: [
    { id: "M1", name: "M1 (NW Corner)", coord: [11.62385, 78.13575], desc: "North-West Survey Stone" },
    { id: "M2", name: "M2 (NE Corner)", coord: [11.62385, 78.13665], desc: "North-East Survey Stone" },
    { id: "M3", name: "M3 (SE Corner)", coord: [11.62300, 78.13665], desc: "South-East Road Frontage Stone" },
    { id: "M4", name: "M4 (SW Corner)", coord: [11.62300, 78.13575], desc: "South-West Boundary Stone" },
  ],
};

// ---------------------------------------------------------------------------
// 2. SURROUNDING NEIGHBOURING PARCELS (6 PLOTS)
// ---------------------------------------------------------------------------
export const DEMO_NEIGHBORING_PARCELS: DemoNeighborParcel[] = [
  {
    id: "BS-P00126",
    surveyNumber: "125/1",
    owner: "R. Meena",
    area: 3.5,
    areaUnit: "acres",
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
    labelCoord: [11.62445, 78.13628],
  },
  {
    id: "BS-P00132",
    surveyNumber: "126/1",
    owner: "S. Arul",
    area: 2.8,
    areaUnit: "acres",
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
    labelCoord: [11.62445, 78.13725],
  },
  {
    id: "BS-P00127",
    surveyNumber: "125/3",
    owner: "K. Selvam",
    area: 1.9,
    areaUnit: "acres",
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
    labelCoord: [11.62342, 78.13712],
  },
  {
    id: "BS-P00128",
    surveyNumber: "125/4",
    owner: "L. Priya",
    area: 2.1,
    areaUnit: "acres",
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
    labelCoord: [11.62255, 78.13712],
  },
  {
    id: "BS-P00123",
    surveyNumber: "124/1",
    owner: "P. Natarajan",
    area: 2.4,
    areaUnit: "acres",
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
    labelCoord: [11.62255, 78.13620],
  },
  {
    id: "BS-P00124",
    surveyNumber: "124/2",
    owner: "V. Raghavan",
    area: 1.75,
    areaUnit: "acres",
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
    labelCoord: [11.62342, 78.13528],
  },
];

// ---------------------------------------------------------------------------
// 3. BUILDING / HOUSE FOOTPRINTS
// ---------------------------------------------------------------------------
export const DEMO_STRUCTURES: DemoStructure[] = [
  // Selected Parcel (BS-P00125) - Main Residence (B-01)
  {
    id: "B-01",
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
  // Selected Parcel (BS-P00125) - Covered Garage & Substation (B-02)
  {
    id: "B-02",
    parcelId: "BS-P00125",
    name: "Utility Garage & Solar Substation",
    type: "utility",
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
  // Neighbour BS-P00127 (K. Selvam) - Outbuilding B-03 that crosses boundary into BS-P00125
  // Base footprint (on BS-P00127) is neutral dark; only the encroaching section is RED!
  {
    id: "B-03",
    parcelId: "BS-P00127",
    name: "K. Selvam Secondary Outbuilding / Store",
    type: "outbuilding",
    dimensions: "15.0m × 8.5m",
    areaSqMeters: 127.5,
    isEncroaching: true,
    encroachmentAreaSqM: 8.5,
    // Base footprint on K. Selvam's side (BS-P00127)
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [78.13665, 11.62375],
          [78.13680, 11.62375],
          [78.13680, 11.62365],
          [78.13665, 11.62365],
          [78.13665, 11.62375],
        ],
      ],
    },
    // The exact 8.5 sq m section crossing the boundary into BS-P00125 (Highlighted in RED)
    encroachmentGeometry: {
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
  },
  // Neighbour BS-P00124 (V. Raghavan) - Residence (B-04)
  {
    id: "B-04",
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
  // Neighbour BS-P00126 (R. Meena) - Villa (B-05)
  {
    id: "B-05",
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
  // Neighbour BS-P00127 (K. Selvam) - Main Villa (B-06)
  {
    id: "B-06",
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
  // Neighbour BS-P00128 (L. Priya) - House (B-07)
  {
    id: "B-07",
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
  // Neighbour BS-P00123 (P. Natarajan) - House (B-08)
  {
    id: "B-08",
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

// ---------------------------------------------------------------------------
// 4. DETECTED SPATIAL CONFLICTS (3 ITEMS)
// ---------------------------------------------------------------------------
export const DEMO_CONFLICTS: DemoConflict[] = [
  // Conflict ①: BOUNDARY OVERLAP (32 sq m)
  {
    id: 1,
    type: "BOUNDARY_OVERLAP",
    title: "Boundary Overlap",
    area: 32,
    unit: "sq m",
    severity: "HIGH",
    detectedBetween: ["BS-P00125", "BS-P00126"],
    source: "Cadastral GIS comparison",
    confidence: 94,
    status: "Requires Officer Verification",
    description: "Selected parcel overlaps neighbouring parcel BS-P00126 by 32 sq m along the northern lot demarcation.",
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
  },
  // Conflict ②: STRUCTURE ENCROACHMENT (8.5 sq m)
  {
    id: 2,
    type: "STRUCTURE_ENCROACHMENT",
    title: "Structure Encroachment",
    area: 8.5,
    unit: "sq m",
    severity: "HIGH",
    detectedStructure: "Building B-03",
    parcelId: "BS-P00125",
    source: "GIS spatial analysis",
    confidence: 96,
    status: "Potential Inconsistency",
    action: "Officer verification: Pending",
    description: "Adjacent building (K. Selvam outbuilding B-03) extends 8.5 sq m across eastern boundary into BS-P00125.",
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
  },
  // Conflict ③: AREA MISMATCH (0.13 acres)
  {
    id: 3,
    type: "AREA_MISMATCH",
    title: "Area Mismatch",
    revenueArea: 2.0,
    gisArea: 1.87,
    difference: 0.13,
    area: 0.13,
    unit: "acres",
    severity: "MEDIUM",
    source: "Revenue Deed vs GIS Orthomosaic",
    confidence: 98,
    status: "Potential Inconsistency",
    action: "Officer Verification Required",
    description: "Revenue deed records 2.00 acres, whereas GIS calculated polygon is 1.87 acres due to a 6.5m statutory road corridor widening setback.",
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
  },
];

// ---------------------------------------------------------------------------
// 5. ROADS & TRANSPORTATION CORRIDORS
// ---------------------------------------------------------------------------
export interface DemoRoadFeature {
  id: string;
  name: string;
  type: "expressway" | "arterial" | "access";
  widthMeters: number;
  status: "existing" | "proposed_widening";
  coordinates: [number, number][]; // [lat, lng] center line
  polygon?: [number, number][]; // corridor footprint
}

export const DEMO_ROADS: DemoRoadFeature[] = [
  {
    id: "ROAD-01",
    name: "Kondalampatti Main Road (SH-188 Feeder)",
    type: "arterial",
    widthMeters: 14.0,
    status: "proposed_widening",
    coordinates: [
      [11.62295, 78.13450],
      [11.62295, 78.13575],
      [11.62295, 78.13665],
      [11.62295, 78.13800],
    ],
    polygon: [
      [11.62300, 78.13450],
      [11.62300, 78.13800],
      [11.62290, 78.13800],
      [11.62290, 78.13450],
    ],
  },
  {
    id: "ROAD-02",
    name: "Salem Bypass Expressway (NH-44 Feeder Corridor)",
    type: "expressway",
    widthMeters: 30.0,
    status: "existing",
    coordinates: [
      [11.62530, 78.13450],
      [11.62525, 78.13600],
      [11.62520, 78.13750],
      [11.62515, 78.13850],
    ],
    polygon: [
      [11.62540, 78.13450],
      [11.62525, 78.13850],
      [11.62505, 78.13850],
      [11.62520, 78.13450],
    ],
  },
  {
    id: "ROAD-03",
    name: "East Sector Cadastral Access Lane",
    type: "access",
    widthMeters: 6.0,
    status: "existing",
    coordinates: [
      [11.62510, 78.13765],
      [11.62385, 78.13765],
      [11.62300, 78.13765],
      [11.62210, 78.13765],
    ],
  },
];

// ---------------------------------------------------------------------------
// 6. WATER BODIES & DRAINAGE BASINS
// ---------------------------------------------------------------------------
export interface DemoWaterBody {
  id: string;
  name: string;
  type: "lake" | "stream" | "canal";
  areaSqMeters?: number;
  coordinates: [number, number][]; // polygon vertices [lat, lng]
}

export const DEMO_WATER_BODIES: DemoWaterBody[] = [
  {
    id: "WATER-01",
    name: "Kondalampatti Irrigation Retention Lake",
    type: "lake",
    areaSqMeters: 14200,
    coordinates: [
      [11.62580, 78.13770],
      [11.62620, 78.13830],
      [11.62590, 78.13910],
      [11.62520, 78.13890],
      [11.62510, 78.13810],
    ],
  },
  {
    id: "WATER-02",
    name: "North Cadastral Drainage Channel (Thodu)",
    type: "stream",
    coordinates: [
      [11.62515, 78.13560],
      [11.62515, 78.13680],
      [11.62515, 78.13770],
    ],
  },
];

// ---------------------------------------------------------------------------
// 7. UTILITY & INFRASTRUCTURE NETWORKS
// ---------------------------------------------------------------------------
export interface DemoInfrastructure {
  id: string;
  name: string;
  type: "powerline" | "water_pipeline" | "telecom";
  operator: string;
  coordinates: [number, number][]; // polyline [lat, lng]
}

export const DEMO_INFRASTRUCTURE: DemoInfrastructure[] = [
  {
    id: "UTIL-01",
    name: "TANGEDCO 11kV Aerial Distribution Line",
    type: "powerline",
    operator: "Tamil Nadu Generation and Distribution Corporation",
    coordinates: [
      [11.62390, 78.13565],
      [11.62340, 78.13565],
      [11.62295, 78.13565],
    ],
  },
  {
    id: "UTIL-02",
    name: "TWAD Salem Municipal Potable Water Trunk Main",
    type: "water_pipeline",
    operator: "Tamil Nadu Water Supply and Drainage Board",
    coordinates: [
      [11.62292, 78.13450],
      [11.62292, 78.13600],
      [11.62292, 78.13750],
      [11.62292, 78.13850],
    ],
  },
];

// ---------------------------------------------------------------------------
// 8. WIDER LOCALITY PARCELS (Kondalampatti Cadastral Village Sheet SLM-2024-K1)
// ---------------------------------------------------------------------------
export const DEMO_LOCALITY_PARCELS: DemoNeighborParcel[] = [
  {
    id: "BS-P00129",
    surveyNumber: "123/1",
    owner: "Salem Agricultural Trust",
    area: 4.8,
    areaUnit: "acres",
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [78.13380, 11.62510],
          [78.13480, 11.62510],
          [78.13480, 11.62385],
          [78.13380, 11.62385],
          [78.13380, 11.62510],
        ],
      ],
    },
    labelCoord: [11.62450, 78.13430],
  },
  {
    id: "BS-P00130",
    surveyNumber: "123/2",
    owner: "M. Jayakumar",
    area: 2.2,
    areaUnit: "acres",
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [78.13380, 11.62385],
          [78.13480, 11.62385],
          [78.13480, 11.62260],
          [78.13380, 11.62260],
          [78.13380, 11.62385],
        ],
      ],
    },
    labelCoord: [11.62320, 78.13430],
  },
  {
    id: "BS-P00131",
    surveyNumber: "127/1",
    owner: "D. Sridhar",
    area: 3.1,
    areaUnit: "acres",
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [78.13770, 11.62510],
          [78.13880, 11.62510],
          [78.13880, 11.62385],
          [78.13770, 11.62385],
          [78.13770, 11.62510],
        ],
      ],
    },
    labelCoord: [11.62450, 78.13825],
  },
  {
    id: "BS-P00133",
    surveyNumber: "127/2",
    owner: "Kondalampatti Co-op",
    area: 3.4,
    areaUnit: "acres",
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [78.13760, 11.62385],
          [78.13880, 11.62385],
          [78.13880, 11.62260],
          [78.13760, 11.62260],
          [78.13760, 11.62385],
        ],
      ],
    },
    labelCoord: [11.62320, 78.13820],
  },
];

