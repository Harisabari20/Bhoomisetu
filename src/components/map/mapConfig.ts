import { BasemapType, MapLayerState } from "./mapTypes";

export const CADASTRAL_CENTER: [number, number] = [11.6234, 78.1362];

export const MAP_ZOOM_TIERS = {
  DISTRICT: 13,
  TALUK_VILLAGE: 15,
  LOCALITY: 16,
  NEIGHBORHOOD: 18,
  PLINTH_CAD: 19.5,
  MAX: 21,
  MIN: 12,
};

export const DEFAULT_MAP_LAYERS: MapLayerState = {
  subjectParcel: true,
  neighborParcels: true,
  localityParcels: true,
  surveyMarkers: true,
  surveyLabels: true,
  buildingFootprints: true,
  buildingDimensions: true,
  interHouseBuffer: true,
  conflicts: true,
  roadCorridor: true,
  waterBodies: true,
  infrastructure: true,
  cadLayer: false,
  zoning: false,
  taxLayer: false,
  encumbrance: false,
};

export interface BasemapConfig {
  id: BasemapType;
  label: string;
  url: string;
  subdomains?: string;
  attribution: string;
  maxZoom: number;
}

export const BASEMAP_CONFIGS: Record<BasemapType, BasemapConfig> = {
  hybrid: {
    id: "hybrid",
    label: "Google Hybrid",
    url: "https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
    subdomains: "0123",
    attribution: "Imagery & Roads © Google",
    maxZoom: 21,
  },
  satellite: {
    id: "satellite",
    label: "Satellite HD",
    url: "https://mt{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
    subdomains: "0123",
    attribution: "Imagery © Google Maps",
    maxZoom: 21,
  },
  street: {
    id: "street",
    label: "Street Map",
    url: "https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
    subdomains: "0123",
    attribution: "Map data © Google",
    maxZoom: 21,
  },
  dark: {
    id: "dark",
    label: "Carto Dark",
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    subdomains: "abcd",
    attribution: "© OpenStreetMap © CARTO",
    maxZoom: 20,
  },
  terrain: {
    id: "terrain",
    label: "Esri Topo",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles © Esri, USGS Topo",
    maxZoom: 19,
  },
};

export const MAP_PALETTE = {
  subjectParcel: {
    stroke: "#2563EB",
    fill: "#3B82F6",
    fillOpacity: 0.22,
    weight: 3,
  },
  neighborParcel: {
    stroke: "#059669",
    fill: "#10B981",
    fillOpacity: 0.12,
    weight: 2,
  },
  neighborDispute: {
    stroke: "#D97706",
    fill: "#F59E0B",
    fillOpacity: 0.16,
    weight: 2.5,
  },
  localityParcel: {
    stroke: "#64748B",
    fill: "#94A3B8",
    fillOpacity: 0.08,
    weight: 1.5,
  },
  normalBuilding: {
    stroke: "#0F172A",
    fill: "#1E293B",
    fillOpacity: 0.72,
    weight: 2,
  },
  encroachingBuildingBase: {
    stroke: "#1E293B",
    fill: "#334155",
    fillOpacity: 0.65,
    weight: 2,
  },
  encroachmentSlice: {
    stroke: "#DC2626",
    fill: "#EF4444",
    fillOpacity: 0.58,
    weight: 2.5,
  },
  officialCuttingLine: {
    stroke: "#2563EB",
    weight: 3.5,
    dashArray: "6, 4",
  },
  overlapConflict: {
    stroke: "#EA580C",
    fill: "#F97316",
    fillOpacity: 0.55,
    weight: 2,
  },
  roadSetbackConflict: {
    stroke: "#D97706",
    fill: "#FBBF24",
    fillOpacity: 0.45,
    weight: 2,
  },
  roadArterial: {
    stroke: "#EA580C",
    weight: 4,
  },
  roadExpressway: {
    stroke: "#C2410C",
    weight: 6,
  },
  waterBody: {
    stroke: "#0284C7",
    fill: "#0EA5E9",
    fillOpacity: 0.35,
    weight: 2,
  },
  infrastructure: {
    stroke: "#9333EA",
    weight: 2.5,
    dashArray: "4, 4",
  },
  cadLayer: {
    stroke: "#38BDF8",
    weight: 2,
    dashArray: "2, 2",
  },
  zoning: {
    stroke: "#8B5CF6",
    fill: "#A78BFA",
    fillOpacity: 0.18,
    weight: 2,
    dashArray: "5, 5",
  },
  taxLayer: {
    stroke: "#10B981",
    fill: "#34D399",
    fillOpacity: 0.15,
    weight: 1.5,
  },
  encumbrance: {
    stroke: "#F59E0B",
    fill: "#FCD34D",
    fillOpacity: 0.18,
    weight: 2,
  },
};
