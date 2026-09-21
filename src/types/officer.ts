import { DepartmentSource, VerificationStatus, ParcelData } from "./parcel";

export type CasePriority = "HIGH" | "MEDIUM" | "NORMAL";

export interface OfficerCaseItem {
  caseId: string; // e.g. APP-10291
  parcelId: string; // e.g. BS-P00125
  surveyNumber: string; // e.g. 125/2
  villageLocality: string;
  district: string;
  applicantName: string;
  appliedDate: string;
  priority: CasePriority;
  status: VerificationStatus;
  matchScore: number;
  triggerReason: string; // e.g. "Area discrepancy between Revenue (2.00 ac) and GIS (1.87 ac)"
  conflictType?: "AREA_DISCREPANCY" | "BOUNDARY_OVERLAP" | "NAME_SPELLING" | "MULTIPLE_CLAIMS";
}

export interface OCRExtractionField {
  label: string;
  extractedText: string;
  confidence: number; // e.g. 98.4%
  matchedWithSystem: boolean;
  systemValue?: string;
  systemName?: DepartmentSource;
}

export interface OCREvidenceDocument {
  documentId: string;
  docName: string;
  category: "DEED" | "PATTA" | "FMB_MAP" | "TAX_RECEIPT";
  scannedAt: string;
  ocrEngine: string;
  fields: OCRExtractionField[];
}

export interface ConflictRecord {
  conflictId: string;
  caseId: string;
  parcelId: string;
  surveyNumber: string;
  title: string;
  description: string;
  severity: "CRITICAL" | "MODERATE" | "MINOR";
  detectedAt: string;
  departmentA: {
    source: DepartmentSource;
    value: string;
    documentRef: string;
  };
  departmentB: {
    source: DepartmentSource;
    value: string;
    documentRef: string;
  };
  suggestedAction: string;
  status: "OPEN" | "UNDER_INVESTIGATION" | "RESOLVED";
}

export interface OfficerDecisionPayload {
  caseId: string;
  parcelId: string;
  decision: "APPROVE" | "REQUEST_CORRECTION" | "REJECT";
  officerId: string;
  officerName: string;
  officerDesignation: string;
  timestamp: string;
  remarks: string; // Required for correction & rejection
  rejectionReasonCode?:
    | "BOUNDARY_OVERLAP_CONFIRMED"
    | "DOCUMENT_FRAUDULENT"
    | "TITLE_DISPUTE_SUB_JUDICE"
    | "AREA_DEFICIT_UNRESOLVED"
    | "INSUFFICIENT_PROOFS";
  conditionNotes?: string;
}

export interface OfficerDashboardMetrics {
  totalCases: number;
  pendingVerification: number;
  activeConflicts: number;
  resolvedCases: number;
  avgResolutionDays: number;
}
