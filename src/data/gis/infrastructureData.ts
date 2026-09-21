export interface GISRoad {
  id: string;
  name: string;
  type: "expressway" | "arterial" | "access";
  widthMeters: number;
  centerline: [number, number][]; // [lat, lng]
  corridorPolygon?: [number, number][]; // [lat, lng]
}

export interface GISWaterBody {
  id: string;
  name: string;
  type: "lake" | "stream" | "canal";
  polygon: [number, number][]; // [lat, lng]
}

export interface GISUtility {
  id: string;
  name: string;
  type: "powerline" | "water_pipeline" | "telecom";
  operator: string;
  polyline: [number, number][]; // [lat, lng]
}

// Statutory Road Widening Corridor along Kondalampatti Main Road:
// Crosses the southern 6.5 meters of Survey 125/2 and 124/1
export const ROAD_WIDENING_CORRIDOR_GEOJSON_COORDS: [number, number][] = [
  [78.13450, 11.62306],
  [78.13800, 11.62306],
  [78.13800, 11.62300],
  [78.13450, 11.62300],
  [78.13450, 11.62306],
];

export const GIS_ROADS: GISRoad[] = [
  {
    id: "ROAD-01",
    name: "Kondalampatti Main Road (SH-188 Feeder)",
    type: "arterial",
    widthMeters: 14.0,
    centerline: [
      [11.62295, 78.13450],
      [11.62295, 78.13575],
      [11.62295, 78.13665],
      [11.62295, 78.13800],
    ],
    corridorPolygon: [
      [11.62306, 78.13450],
      [11.62306, 78.13800],
      [11.62290, 78.13800],
      [11.62290, 78.13450],
    ],
  },
  {
    id: "ROAD-02",
    name: "Salem Bypass Expressway (NH-44 Corridor)",
    type: "expressway",
    widthMeters: 30.0,
    centerline: [
      [11.62530, 78.13450],
      [11.62525, 78.13600],
      [11.62520, 78.13750],
      [11.62515, 78.13850],
    ],
    corridorPolygon: [
      [11.62540, 78.13450],
      [11.62525, 78.13850],
      [11.62505, 78.13850],
      [11.62520, 78.13450],
    ],
  },
  {
    id: "ROAD-03",
    name: "East Sector Cadastral Lane",
    type: "access",
    widthMeters: 6.0,
    centerline: [
      [11.62510, 78.13765],
      [11.62385, 78.13765],
      [11.62300, 78.13765],
      [11.62210, 78.13765],
    ],
  },
];

export const GIS_WATER_BODIES: GISWaterBody[] = [
  {
    id: "WATER-01",
    name: "Kondalampatti Retention Lake",
    type: "lake",
    polygon: [
      [11.62580, 78.13770],
      [11.62620, 78.13830],
      [11.62590, 78.13910],
      [11.62520, 78.13890],
      [11.62510, 78.13810],
    ],
  },
];

export const GIS_UTILITIES: GISUtility[] = [
  {
    id: "UTIL-01",
    name: "TANGEDCO 11kV Aerial Distribution Grid",
    type: "powerline",
    operator: "Tamil Nadu Generation & Distribution Corporation",
    polyline: [
      [11.62390, 78.13565],
      [11.62340, 78.13565],
      [11.62295, 78.13565],
    ],
  },
  {
    id: "UTIL-02",
    name: "TWAD Salem Municipal Potable Water Trunk Main",
    type: "water_pipeline",
    operator: "Tamil Nadu Water Supply & Drainage Board",
    polyline: [
      [11.62292, 78.13450],
      [11.62292, 78.13600],
      [11.62292, 78.13750],
      [11.62292, 78.13850],
    ],
  },
];

export interface GISZoning {
  id: string;
  zoneCode: string;
  name: string;
  maxFAR: number;
  maxHeightM: number;
  polygon: [number, number][];
}

export const GIS_ZONING: GISZoning[] = [
  {
    id: "ZONE-01",
    zoneCode: "R-2",
    name: "Salem LPA Urban Residential R-2 (Permitted FAR 1.75)",
    maxFAR: 1.75,
    maxHeightM: 12.0,
    polygon: [
      [11.62385, 78.13480],
      [11.62385, 78.13760],
      [11.62210, 78.13760],
      [11.62210, 78.13480],
      [11.62385, 78.13480],
    ],
  },
  {
    id: "ZONE-02",
    zoneCode: "A-1",
    name: "Salem Peri-Urban Agricultural Buffer (Permitted FAR 0.5)",
    maxFAR: 0.5,
    maxHeightM: 9.0,
    polygon: [
      [11.62510, 78.13575],
      [11.62510, 78.13770],
      [11.62385, 78.13770],
      [11.62385, 78.13575],
      [11.62510, 78.13575],
    ],
  },
];

export interface GISTaxAssessment {
  parcelId: string;
  assessmentNo: string;
  annualValueINR: number;
  taxDemandINR: number;
  status: "Paid" | "Pending" | "Exempt";
  dueDate: string;
  polygon: [number, number][];
}

export const GIS_PROPERTY_TAX: GISTaxAssessment[] = [
  {
    parcelId: "BS-P00125",
    assessmentNo: "SCMC-2024-8819",
    annualValueINR: 240000,
    taxDemandINR: 19200,
    status: "Paid",
    dueDate: "31-Mar-2025",
    polygon: [
      [11.62385, 78.13575],
      [11.62385, 78.13665],
      [11.62300, 78.13665],
      [11.62300, 78.13575],
    ],
  },
  {
    parcelId: "BS-P00127",
    assessmentNo: "SCMC-2024-8821",
    annualValueINR: 180000,
    taxDemandINR: 14400,
    status: "Pending",
    dueDate: "31-Dec-2024",
    polygon: [
      [11.62385, 78.13665],
      [11.62385, 78.13760],
      [11.62300, 78.13760],
      [11.62300, 78.13665],
    ],
  },
];

export interface GISEncumbrance {
  parcelId: string;
  ecNumber: string;
  period: string;
  status: "Nil Encumbrance" | "Registered Mortgage" | "Court Injunction";
  sroOffice: string;
  details: string;
}

export const GIS_ENCUMBRANCES: GISEncumbrance[] = [
  {
    parcelId: "BS-P00125",
    ecNumber: "EC-2024-SLM-008129",
    period: "01-Jan-1994 to 20-Sep-2026 (32 Years)",
    status: "Nil Encumbrance",
    sroOffice: "SRO Salem West",
    details: "Clear title. No prior adverse encumbrances or mortgages on registered Patta TR-88219/2024.",
  },
  {
    parcelId: "BS-P00127",
    ecNumber: "EC-2024-SLM-008131",
    period: "01-Jan-2000 to 20-Sep-2026",
    status: "Registered Mortgage",
    sroOffice: "SRO Salem West",
    details: "Mortgage in favor of Indian Bank, Kondalampatti Branch (Loan A/c #66219801).",
  },
];

