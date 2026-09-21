import {
  DiscoveryStepStatus,
  IdentityResolutionResult,
  AutomaticValidationResult,
  GovIdsQuery,
  SurveyDetailsQuery,
  DiscoveredParcel,
} from "@/types/discovery";
import { MOCK_PARCELS } from "@/mock/parcels";

/**
 * Service simulating FastAPI REST API:
 * POST /api/v1/discovery/connect
 * POST /api/v1/discovery/identify-parcel
 * POST /api/v1/discovery/resolve-identity
 * POST /api/v1/discovery/validate
 */

/**
 * Generates a BhoomiSetu Parcel ID dynamically from parcel/survey characteristics.
 * Format: BS-P##### (e.g. BS-P00125)
 * Generated ONLY AFTER identification across connected government systems.
 */
export function generateBhoomiSetuParcelId(surveyNumber: string, district?: string): string {
  const cleanSurvey = surveyNumber.trim().replace(/\s+/g, "");

  // Check known mock parcels first
  for (const [id, parcel] of Object.entries(MOCK_PARCELS)) {
    if (parcel.surveyNumber.replace(/\s+/g, "") === cleanSurvey) {
      if (!district || parcel.district.toLowerCase().includes(district.toLowerCase())) {
        return id;
      }
    }
  }

  // Exact partial matches for known demo cases
  if (cleanSurvey.includes("125/2") || cleanSurvey === "125") return "BS-P00125";
  if (cleanSurvey.includes("125/3") || cleanSurvey === "126") return "BS-P00126";
  if (cleanSurvey.includes("204")) return "BS-P00204";
  if (cleanSurvey.includes("318")) return "BS-P00318";

  // Dynamic deterministic generation for custom survey numbers
  const digits = cleanSurvey.replace(/\D/g, "");
  if (digits.length > 0) {
    const num = parseInt(digits, 10);
    const padded = String(num % 100000).padStart(5, "0");
    return `BS-P${padded}`;
  }

  // Hash-based dynamic fallback
  let hash = 0;
  const seed = `${surveyNumber}-${district || "INDIA"}`;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) & 0xfffff;
  }
  const padded = String(Math.abs(hash) % 100000).padStart(5, "0");
  return `BS-P${padded}`;
}

/**
 * Simulates discovering and identifying a parcel across connected government systems
 * (Revenue, Tax, Registration, GIS).
 * The BhoomiSetu Parcel ID is generated ONLY AFTER successful identification.
 */
export async function discoverAndIdentifyParcel(input: {
  mode: "SURVEY_DETAILS" | "GOV_IDS";
  surveyForm?: {
    ownerName: string;
    surveyNumber: string;
    state: string;
    district: string;
  };
  govIds?: {
    districtId?: string;
    taxId?: string;
    registrationId?: string;
    gisId?: string;
  };
}): Promise<DiscoveredParcel> {
  // Simulate network latency for record retrieval & identity resolution
  await new Promise((res) => setTimeout(res, 400));

  let surveyNumber = "125/2";
  let ownerName = "Ravi Kumar";
  let district = "Salem";
  let state = "Tamil Nadu";
  let sourceIdentifiers = {
    revenuePatta: "TR-88219/2021",
    taxAssessment: "ASMT-SLM-2023-8819",
    registrationDeed: "DOC-4192/2018",
    gisUlpin: "TN-SLM-2024-000125",
  };

  if (input.mode === "SURVEY_DETAILS" && input.surveyForm) {
    surveyNumber = input.surveyForm.surveyNumber.trim() || "125/2";
    ownerName = input.surveyForm.ownerName.trim() || "Ravi Kumar";
    district = input.surveyForm.district.trim() || "Salem";
    state = input.surveyForm.state || "Tamil Nadu";

    const cleanDigits = surveyNumber.replace(/\D/g, "") || "125";
    sourceIdentifiers = {
      revenuePatta: `PT-${cleanDigits}412`,
      taxAssessment: `ASMT-${district.slice(0, 3).toUpperCase()}-${cleanDigits}`,
      registrationDeed: `DOC-${cleanDigits}/2019`,
      gisUlpin: `ULPIN-${state.slice(0, 2).toUpperCase()}-${cleanDigits}-01`,
    };
  } else if (input.mode === "GOV_IDS" && input.govIds) {
    const enteredTax = input.govIds.taxId?.trim();
    const enteredDeed = input.govIds.registrationId?.trim();
    const enteredDistrict = input.govIds.districtId?.trim();
    const enteredGis = input.govIds.gisId?.trim();

    sourceIdentifiers = {
      revenuePatta: enteredDistrict ? `PT-${enteredDistrict}` : "TR-88219/2021",
      taxAssessment: enteredTax || "ASMT-SLM-2023-8819",
      registrationDeed: enteredDeed || "DOC-4192/2018",
      gisUlpin: enteredGis || "TN-SLM-2024-000125",
    };

    if (enteredTax?.includes("990184") || enteredDeed?.includes("4192")) {
      surveyNumber = "125/2";
      ownerName = "Ravi Kumar";
      district = "Salem";
      state = "Tamil Nadu";
    } else {
      surveyNumber = "125/2";
      ownerName = "Ravi Kumar";
      district = "Salem";
      state = "Tamil Nadu";
    }
  }

  // PARCEL ID IS GENERATED ONLY AFTER SUCCESSFUL IDENTIFICATION
  const generatedParcelId = generateBhoomiSetuParcelId(surveyNumber, district);

  return {
    parcelId: generatedParcelId,
    surveyNumber,
    ownerName,
    district,
    state,
    sourceIdentifiers,
    matchedSources: ["Revenue", "Tax", "Registration", "GIS"],
    confidenceScore: 96,
  };
}


export async function getDiscoveryPipelineSteps(): Promise<DiscoveryStepStatus[]> {
  return [
    {
      stepId: "step-rev",
      system: "Revenue",
      label: "Revenue Land Administration System",
      status: "COMPLETED",
      latencyMs: 340,
      recordsFoundCount: 1,
    },
    {
      stepId: "step-tax",
      system: "Tax",
      label: "Municipal Property Tax Ledger",
      status: "COMPLETED",
      latencyMs: 420,
      recordsFoundCount: 1,
    },
    {
      stepId: "step-reg",
      system: "Registration",
      label: "Inspector General of Registration (e-Pramaan)",
      status: "COMPLETED",
      latencyMs: 510,
      recordsFoundCount: 1,
    },
    {
      stepId: "step-gis",
      system: "GIS",
      label: "State Remote Sensing & Cadastral GIS (ISRO / Bhuvan)",
      status: "COMPLETED",
      latencyMs: 650,
      recordsFoundCount: 1,
    },
  ];
}

export async function resolveParcelIdentity(
  params: { surveyNumber?: string; parcelId?: string; ownerName?: string }
): Promise<IdentityResolutionResult> {
  await new Promise((res) => setTimeout(res, 400));

  return {
    parcelId: params.parcelId || "BS-P00125",
    surveyNumber: params.surveyNumber || "125/2",
    overallScore: 96,
    confidenceTier: "HIGH CONFIDENCE",
    attributes: [
      {
        id: "attr-1",
        attributeName: "Survey Number",
        status: "MATCHED",
        confidenceScore: 100,
        matchedSystems: ["Revenue", "Registration", "GIS", "Tax"],
        note: "Perfect concordance across all 4 departmental registries",
      },
      {
        id: "attr-2",
        attributeName: "Owner Name",
        status: "MATCHED",
        confidenceScore: 99,
        matchedSystems: ["Revenue", "Registration", "Tax"],
        note: "Ravi Kumar (s/o Late V. Ramanathan)",
      },
      {
        id: "attr-3",
        attributeName: "District & Taluk",
        status: "MATCHED",
        confidenceScore: 100,
        matchedSystems: ["Revenue", "Registration", "GIS", "Tax"],
        note: "Salem, Salem Taluk, Kondalampatti",
      },
      {
        id: "attr-4",
        attributeName: "Tax Reference",
        status: "MATCHED",
        confidenceScore: 98,
        matchedSystems: ["Tax", "Revenue"],
        note: "Assessment ASMT-SLM-2023-8819",
      },
      {
        id: "attr-5",
        attributeName: "Registration Deed",
        status: "MATCHED",
        confidenceScore: 99,
        matchedSystems: ["Registration", "Revenue"],
        note: "DOC-4192/2018 at SRO Salem",
      },
      {
        id: "attr-6",
        attributeName: "GIS Location Marker",
        status: "MATCHED",
        confidenceScore: 97,
        matchedSystems: ["GIS", "Revenue"],
        note: "Latitude 11.6234° N, Longitude 78.1362° E",
      },
      {
        id: "attr-7",
        attributeName: "Cadastral Geometry",
        status: "MATCHED",
        confidenceScore: 95,
        matchedSystems: ["GIS", "Revenue"],
        note: "Cadastral boundaries align with FMB sketch vertices",
      },
      {
        id: "attr-8",
        attributeName: "Area Extent",
        status: "PARTIAL",
        confidenceScore: 84,
        matchedSystems: ["Revenue", "Tax"],
        note: "Revenue/Tax record 2.00 acres; GIS satellite polygon measures 1.87 acres (-0.13 ac variance)",
      },
    ],
    disclaimer:
      "This 96% score represents probabilistic cross-registry record matching confidence across connected public databases. It does not replace statutory title adjudication or constitute a certificate of sovereign guarantee.",
  };
}

export async function validateParcelRecords(
  params: { surveyNumber?: string; parcelId?: string }
): Promise<AutomaticValidationResult> {
  await new Promise((res) => setTimeout(res, 350));

  const survey = params.surveyNumber || "125/2";
  const pId = params.parcelId || "BS-P00125";

  return {
    parcelId: pId,
    surveyNumber: survey,
    overallStatus: "UNDER_REVIEW",
    hasDiscrepancy: true,
    discrepancyMessage:
      "Potential inconsistency detected: Area discrepancy between Revenue Records (2.00 acres) and Digital GIS Polygon (1.87 acres). Your case has been automatically sent for authorized officer verification.",
    routedToOfficer: true,
    caseTrackingNumber: "APP-10291",
    fields: [
      {
        fieldName: "SURVEY NUMBER",
        canonicalValue: "125/2",
        isConsistent: true,
        statusText: "CONSISTENT",
        comparisons: [
          { source: "Search", value: "125/2", isConsistent: true },
          { source: "Revenue", value: "125/2", isConsistent: true },
          { source: "Registration", value: "125/2", isConsistent: true },
          { source: "GIS", value: "125/2", isConsistent: true },
        ],
      },
      {
        fieldName: "OWNER IDENTITY",
        canonicalValue: "Ravi Kumar",
        isConsistent: true,
        statusText: "CONSISTENT",
        comparisons: [
          { source: "Search", value: "Ravi Kumar", isConsistent: true },
          { source: "Revenue", value: "Ravi Kumar", isConsistent: true },
          { source: "Registration", value: "Ravi Kumar", isConsistent: true },
          { source: "Tax", value: "Ravi Kumar", isConsistent: true },
        ],
      },
      {
        fieldName: "AREA",
        canonicalValue: "2.00 acres (Deed) / 1.87 acres (GIS)",
        isConsistent: false,
        statusText: "POTENTIAL INCONSISTENCY",
        discrepancyNote:
          "Variance of 0.13 acres detected between deed records and GIS cadastral layer. Attributed to OMR Road Setback notification.",
        comparisons: [
          { source: "Revenue", value: "2.00 acres", isConsistent: true },
          { source: "Tax", value: "2.00 acres", isConsistent: true },
          { source: "GIS", value: "1.87 acres", isConsistent: false },
        ],
      },
      {
        fieldName: "TAX CLEARANCE",
        canonicalValue: "Paid (ASMT-CHN-2023-8819)",
        isConsistent: true,
        statusText: "CONSISTENT",
        comparisons: [
          { source: "Tax", value: "Paid up to 2026-27", isConsistent: true },
          { source: "Municipal", value: "Zero Outstanding Arrears", isConsistent: true },
        ],
      },
    ],
  };
}
