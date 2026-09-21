import { DepartmentSource, VerificationStatus } from "./parcel";

export type DiscoveryMode = "PARCEL_ID" | "GOV_IDS" | "SURVEY_DETAILS";

export interface ParcelIdQuery {
  parcelId: string;
}

export interface GovIdsQuery {
  districtId?: string;
  taxId?: string;
  registrationId?: string;
  gisId?: string;
}

export interface SurveyDetailsQuery {
  ownerName: string;
  surveyNumber: string;
  state: string;
  district: string;
}

export interface DiscoveryStepStatus {
  stepId: string;
  system: DepartmentSource | "Core";
  label: string;
  status: "PENDING" | "CONNECTING" | "RETRIEVING" | "COMPLETED" | "WARNING";
  latencyMs: number;
  recordsFoundCount: number;
}

export interface IdentityMatchAttribute {
  id: string;
  attributeName: string;
  status: "MATCHED" | "PARTIAL" | "MISMATCH" | "UNAVAILABLE";
  confidenceScore: number;
  matchedSystems: DepartmentSource[];
  note?: string;
}

export interface IdentityResolutionResult {
  parcelId: string;
  surveyNumber: string;
  overallScore: number; // e.g. 96
  confidenceTier: "HIGH CONFIDENCE" | "MODERATE CONFIDENCE" | "LOW CONFIDENCE";
  attributes: IdentityMatchAttribute[];
  disclaimer: string;
}

export interface SystemValueComparison {
  source: DepartmentSource | "Search";
  value: string;
  isConsistent: boolean;
}

export interface ValidationFieldComparison {
  fieldName: string;
  canonicalValue: string;
  isConsistent: boolean;
  statusText: "CONSISTENT" | "POTENTIAL INCONSISTENCY" | "REQUIRES REVIEW";
  comparisons: SystemValueComparison[];
  discrepancyNote?: string;
}

export interface AutomaticValidationResult {
  parcelId: string;
  surveyNumber: string;
  overallStatus: VerificationStatus;
  fields: ValidationFieldComparison[];
  hasDiscrepancy: boolean;
  discrepancyMessage?: string;
  routedToOfficer: boolean;
  caseTrackingNumber?: string;
}

export interface DiscoveredParcel {
  parcelId: string;
  surveyNumber: string;
  ownerName: string;
  district: string;
  state: string;
  sourceIdentifiers?: {
    revenuePatta?: string;
    taxAssessment?: string;
    registrationDeed?: string;
    gisUlpin?: string;
  };
  matchedSources: ("Revenue" | "Tax" | "Registration" | "GIS")[];
  confidenceScore: number;
}
