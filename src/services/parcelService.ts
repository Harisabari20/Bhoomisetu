import {
  ParcelData,
  Parcel,
  NeighbourParcel,
  Building,
  Conflict,
  ParcelLayersConfig,
} from "@/types/parcel";
import { MOCK_PARCELS } from "@/mock/parcels";
import {
  MOCK_PARCEL_GIS,
  MOCK_NEIGHBOUR_PARCELS,
  MOCK_BUILDINGS,
  MOCK_CONFLICTS,
  DEFAULT_PARCEL_LAYERS,
} from "@/mock/gisData";
import {
  DEMO_PARCEL,
  DEMO_NEIGHBORING_PARCELS,
  DEMO_STRUCTURES,
  DEMO_CONFLICTS,
  DemoParcel,
  DemoNeighborParcel,
  DemoStructure,
  DemoConflict,
} from "@/data/demoParcel";

/**
 * Service simulating FastAPI REST API / Spatial Engine:
 * GET /api/v1/parcels/{id}
 * GET /api/v1/parcels/{id}/neighbors
 * GET /api/v1/parcels/{id}/structures
 * GET /api/v1/parcels/{id}/conflicts
 * GET /api/v1/parcels/{id}/validation
 */

// ---------------------------------------------------------------------------
// SECTION 24: BACKEND-READY SERVICE ABSTRACTION
// ---------------------------------------------------------------------------

export async function getParcel(parcelId: string): Promise<DemoParcel | null> {
  await new Promise((res) => setTimeout(res, 120));
  const normalizedId = parcelId.trim().toUpperCase();
  if (normalizedId === "BS-P00125" || normalizedId === "125/2") {
    return DEMO_PARCEL;
  }
  const match = DEMO_NEIGHBORING_PARCELS.find(
    (n) => n.id.toUpperCase() === normalizedId || n.surveyNumber === parcelId
  );
  if (match) {
    return {
      id: match.id,
      surveyNumber: match.surveyNumber,
      ulpin: `TN-SLM-2024-${match.id.replace("BS-P", "")}`,
      owner: match.owner,
      area: match.area,
      areaUnit: match.areaUnit,
      village: "Kondalampatti",
      taluk: "Salem",
      district: "Salem",
      state: "Tamil Nadu",
      status: "Verified",
      geometry: match.geometry,
      vertexNodes: [],
    };
  }
  return DEMO_PARCEL;
}

export async function getNeighboringParcels(
  parcelId: string
): Promise<DemoNeighborParcel[]> {
  await new Promise((res) => setTimeout(res, 120));
  return DEMO_NEIGHBORING_PARCELS;
}

export async function getStructures(parcelId: string): Promise<DemoStructure[]> {
  await new Promise((res) => setTimeout(res, 120));
  return DEMO_STRUCTURES;
}

export async function getParcelConflicts(parcelId: string): Promise<DemoConflict[]> {
  await new Promise((res) => setTimeout(res, 120));
  return DEMO_CONFLICTS;
}

export async function getParcelValidation(parcelId: string): Promise<{
  overallConfidence: number;
  cadastralStatus: "VALIDATED" | "POTENTIAL_INCONSISTENCY";
  detectedConflictsCount: number;
  sourcesCrossChecked: string[];
}> {
  await new Promise((res) => setTimeout(res, 100));
  return {
    overallConfidence: 96,
    cadastralStatus: "POTENTIAL_INCONSISTENCY",
    detectedConflictsCount: 3,
    sourcesCrossChecked: [
      "Revenue (Tamil Nilam Patta/Chitta)",
      "Registration (STAR 2.0 SRO Salem)",
      "Municipal Tax (Salem City Municipal Corporation)",
      "Cadastral GIS Orthomosaic (Survey & Land Records Dept)",
    ],
  };
}

// ---------------------------------------------------------------------------
// COMPATIBILITY ALIASES
// ---------------------------------------------------------------------------

export async function getNeighbouringParcels(
  parcelId: string
): Promise<NeighbourParcel[]> {
  await new Promise((res) => setTimeout(res, 100));
  return MOCK_NEIGHBOUR_PARCELS;
}

export async function getBuildings(parcelId: string): Promise<Building[]> {
  await new Promise((res) => setTimeout(res, 100));
  return MOCK_BUILDINGS;
}

export async function getConflicts(parcelId: string): Promise<Conflict[]> {
  await new Promise((res) => setTimeout(res, 100));
  return MOCK_CONFLICTS;
}

export async function getParcelLayers(
  parcelId: string
): Promise<ParcelLayersConfig> {
  await new Promise((res) => setTimeout(res, 80));
  return DEFAULT_PARCEL_LAYERS;
}

export async function getParcelById(parcelId: string): Promise<ParcelData | null> {
  await new Promise((res) => setTimeout(res, 100));
  const normalizedId = parcelId.trim().toUpperCase();
  return MOCK_PARCELS[normalizedId] || MOCK_PARCELS["BS-P00125"] || null;
}

export async function getAllCitizenParcels(): Promise<ParcelData[]> {
  await new Promise((res) => setTimeout(res, 120));
  return Object.values(MOCK_PARCELS);
}

export async function searchParcelBySurvey(
  surveyNumber: string,
  district?: string
): Promise<ParcelData | null> {
  await new Promise((res) => setTimeout(res, 150));
  const normalizedSurvey = surveyNumber.trim().replace(/\s+/g, "");

  for (const parcel of Object.values(MOCK_PARCELS)) {
    if (parcel.surveyNumber.replace(/\s+/g, "") === normalizedSurvey) {
      if (!district || parcel.district.toLowerCase().includes(district.toLowerCase())) {
        return parcel;
      }
    }
  }

  return MOCK_PARCELS["BS-P00125"];
}
