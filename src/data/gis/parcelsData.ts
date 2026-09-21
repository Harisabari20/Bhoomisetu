import { GeoJSONPolygon, SpatialParcel } from "@/lib/gisEngine";

export interface GISParcel extends SpatialParcel {
  ulpin: string;
  village: string;
  taluk: string;
  district: string;
  state: string;
  status: "Verified" | "Potential Inconsistency" | "Requires Verification";
  centroid: [number, number]; // [lat, lng] for camera
  landClassification: string;
  marketValueINR: number;
  lastMutatedDate: string;
  pattaNumber: string;
  vertexNodes: Array<{ id: string; name: string; coord: [number, number]; desc: string }>;
}

export const GIS_PARCELS: Record<string, GISParcel> = {
  "BS-P00125": {
    id: "BS-P00125",
    surveyNumber: "125/2",
    ulpin: "TN-SLM-2024-000125",
    owner: "Ravi Kumar & Priya R. Kumar",
    recordedAreaAcres: 2.0,
    village: "Kondalampatti",
    taluk: "Salem",
    district: "Salem",
    state: "Tamil Nadu",
    status: "Verified",
    centroid: [11.62342, 78.13620],
    landClassification: "Ryotwari Urban Residential",
    marketValueINR: 42000000,
    lastMutatedDate: "14 Oct 2024",
    pattaNumber: "TR-88219/2024",
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [78.13575, 11.62385], // M1 NW Corner
          [78.13665, 11.62385], // M2 NE Corner (Shared boundary with 125/3)
          [78.13665, 11.62300], // M3 SE Corner (Road Frontage)
          [78.13575, 11.62300], // M4 SW Corner (Road Frontage)
          [78.13575, 11.62385], // Closure
        ],
      ],
    },
    vertexNodes: [
      { id: "M1", name: "M1 (NW Corner)", coord: [11.62385, 78.13575], desc: "North-West Cadastral Boundary Stone" },
      { id: "M2", name: "M2 (NE Corner)", coord: [11.62385, 78.13665], desc: "North-East Survey Demarcation Stone" },
      { id: "M3", name: "M3 (SE Corner)", coord: [11.62300, 78.13665], desc: "South-East Road Frontage Survey Stone" },
      { id: "M4", name: "M4 (SW Corner)", coord: [11.62300, 78.13575], desc: "South-West Road Frontage Survey Stone" },
    ],
  },
  "BS-P00127": {
    id: "BS-P00127",
    surveyNumber: "125/3",
    ulpin: "TN-SLM-2024-000127",
    owner: "K. Selvam",
    recordedAreaAcres: 1.9,
    village: "Kondalampatti",
    taluk: "Salem",
    district: "Salem",
    state: "Tamil Nadu",
    status: "Potential Inconsistency",
    centroid: [11.62342, 78.13712],
    landClassification: "Ryotwari Residential",
    marketValueINR: 38500000,
    lastMutatedDate: "22 Mar 2023",
    pattaNumber: "TR-88221/2024",
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
    vertexNodes: [
      { id: "S1", name: "S1 (NW Stone)", coord: [11.62385, 78.13665], desc: "Shared with 125/2 M2" },
      { id: "S2", name: "S2 (NE Stone)", coord: [11.62385, 78.13760], desc: "Eastern Cadastral Boundary Stone" },
      { id: "S3", name: "S3 (SE Stone)", coord: [11.62300, 78.13760], desc: "Road Frontage Eastern Stone" },
      { id: "S4", name: "S4 (SW Stone)", coord: [11.62300, 78.13665], desc: "Shared with 125/2 M3" },
    ],
  },
  "BS-P00126": {
    id: "BS-P00126",
    surveyNumber: "125/1",
    ulpin: "TN-SLM-2024-000126",
    owner: "R. Meena",
    recordedAreaAcres: 3.5,
    village: "Kondalampatti",
    taluk: "Salem",
    district: "Salem",
    state: "Tamil Nadu",
    status: "Verified",
    centroid: [11.62445, 78.13628],
    landClassification: "Ryotwari Agricultural / Garden",
    marketValueINR: 65000000,
    lastMutatedDate: "05 Jan 2024",
    pattaNumber: "TR-88220/2024",
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
    vertexNodes: [
      { id: "MN1", name: "MN1 (NW Stone)", coord: [11.62510, 78.13575], desc: "Northern Boundary Stone" },
      { id: "MN2", name: "MN2 (NE Stone)", coord: [11.62510, 78.13680], desc: "North-East Survey Stone" },
      { id: "MN3", name: "MN3 (SE Stone)", coord: [11.62385, 78.13680], desc: "South-East Demarcation Stone" },
      { id: "MN4", name: "MN4 (SW Stone)", coord: [11.62385, 78.13575], desc: "South-West Demarcation Stone" },
    ],
  },
  "BS-P00132": {
    id: "BS-P00132",
    surveyNumber: "126/1",
    ulpin: "TN-SLM-2024-000132",
    owner: "S. Arul",
    recordedAreaAcres: 2.8,
    village: "Kondalampatti",
    taluk: "Salem",
    district: "Salem",
    state: "Tamil Nadu",
    status: "Verified",
    centroid: [11.62445, 78.13725],
    landClassification: "Ryotwari Dry",
    marketValueINR: 52000000,
    lastMutatedDate: "18 Nov 2023",
    pattaNumber: "TR-88222/2024",
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
    vertexNodes: [],
  },
  "BS-P00128": {
    id: "BS-P00128",
    surveyNumber: "125/4",
    ulpin: "TN-SLM-2024-000128",
    owner: "L. Priya",
    recordedAreaAcres: 2.1,
    village: "Kondalampatti",
    taluk: "Salem",
    district: "Salem",
    state: "Tamil Nadu",
    status: "Verified",
    centroid: [11.62255, 78.13712],
    landClassification: "Ryotwari Urban",
    marketValueINR: 41000000,
    lastMutatedDate: "09 Feb 2024",
    pattaNumber: "TR-88223/2024",
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
    vertexNodes: [],
  },
  "BS-P00123": {
    id: "BS-P00123",
    surveyNumber: "124/1",
    ulpin: "TN-SLM-2024-000123",
    owner: "P. Natarajan",
    recordedAreaAcres: 2.4,
    village: "Kondalampatti",
    taluk: "Salem",
    district: "Salem",
    state: "Tamil Nadu",
    status: "Verified",
    centroid: [11.62255, 78.13620],
    landClassification: "Ryotwari Dry",
    marketValueINR: 45000000,
    lastMutatedDate: "12 Dec 2023",
    pattaNumber: "TR-88224/2024",
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
    vertexNodes: [],
  },
  "BS-P00124": {
    id: "BS-P00124",
    surveyNumber: "124/2",
    ulpin: "TN-SLM-2024-000124",
    owner: "V. Raghavan",
    recordedAreaAcres: 1.75,
    village: "Kondalampatti",
    taluk: "Salem",
    district: "Salem",
    state: "Tamil Nadu",
    status: "Verified",
    centroid: [11.62342, 78.13528],
    landClassification: "Ryotwari Urban",
    marketValueINR: 35000000,
    lastMutatedDate: "03 Aug 2024",
    pattaNumber: "TR-88225/2024",
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
    vertexNodes: [],
  },
};

export const ALL_GIS_PARCELS_LIST: GISParcel[] = Object.values(GIS_PARCELS);
