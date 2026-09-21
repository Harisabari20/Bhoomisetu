import {
  DemoParcel,
  DemoNeighborParcel,
  DemoStructure,
  DemoConflict,
  DemoRoadFeature,
  DemoWaterBody,
  DemoInfrastructure,
} from "@/data/demoParcel";

export type BasemapType = "satellite" | "street" | "hybrid" | "dark" | "terrain";

export interface MapLayerState {
  subjectParcel: boolean;
  neighborParcels: boolean;
  localityParcels: boolean;
  surveyMarkers: boolean;
  surveyLabels: boolean;
  buildingFootprints: boolean;
  buildingDimensions: boolean;
  interHouseBuffer: boolean;
  conflicts: boolean;
  roadCorridor: boolean;
  waterBodies: boolean;
  infrastructure: boolean;
  cadLayer: boolean;
  zoning: boolean;
  taxLayer: boolean;
  encumbrance: boolean;
}

export interface MapTelemetry {
  lat: number;
  lng: number;
  zoom: number;
  elevation: number;
  satellitePassDate: string;
}

export type SelectedMapEntity =
  | { type: "parcel"; id: string; data: DemoParcel | DemoNeighborParcel | any }
  | { type: "building"; id: string; data: DemoStructure | any }
  | { type: "conflict"; id: number; data: DemoConflict | any }
  | { type: "road"; id: string; data: DemoRoadFeature | any }
  | { type: "water"; id: string; data: DemoWaterBody | any }
  | { type: "marker"; id: string; name: string; coord: [number, number]; desc: string }
  | null;

export interface LandMapProps {
  selectedParcelId?: string;
  selectedConflictId?: number | null;
  onSelectConflict?: (conflictId: number) => void;
  onSelectParcel?: (parcelId: string) => void;
  onOpenHouseDimensions?: () => void;
  height?: string;
  className?: string;
  interactive?: boolean;
  showSearch?: boolean;
  showControls?: boolean;
  showLayersToggle?: boolean;
  showLegend?: boolean;
  showInspectorCard?: boolean;
  initialBasemap?: BasemapType;
  initialZoom?: number;
  customCenter?: [number, number];
  userRole?: "citizen" | "officer" | "admin";
  cadGeoreferenced?: boolean;
}
