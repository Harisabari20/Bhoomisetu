import {
  OfficerCaseItem,
  OfficerDashboardMetrics,
  OfficerDecisionPayload,
  ConflictRecord,
} from "@/types/officer";
import { MOCK_OFFICER_METRICS, MOCK_OFFICER_CASES, MOCK_OCR_EVIDENCE } from "@/mock/cases";
import { MOCK_CONFLICTS } from "@/mock/conflicts";
import { MOCK_GLOBAL_AUDIT_LOGS, GlobalAuditLogItem } from "@/mock/auditLogs";

export async function getOfficerMetrics(): Promise<OfficerDashboardMetrics> {
  await new Promise((res) => setTimeout(res, 150));
  return MOCK_OFFICER_METRICS;
}

export async function getOfficerCases(): Promise<OfficerCaseItem[]> {
  await new Promise((res) => setTimeout(res, 200));
  return MOCK_OFFICER_CASES;
}

export async function getCaseDetails(caseId: string): Promise<OfficerCaseItem | null> {
  await new Promise((res) => setTimeout(res, 200));
  return MOCK_OFFICER_CASES.find((c) => c.caseId === caseId) || MOCK_OFFICER_CASES[0];
}

export async function getConflicts(): Promise<ConflictRecord[]> {
  await new Promise((res) => setTimeout(res, 200));
  return MOCK_CONFLICTS;
}

export async function getGlobalAuditLogs(): Promise<GlobalAuditLogItem[]> {
  await new Promise((res) => setTimeout(res, 200));
  return MOCK_GLOBAL_AUDIT_LOGS;
}

export async function submitOfficerDecision(
  payload: OfficerDecisionPayload
): Promise<{ success: boolean; certificateId?: string; auditTxnId: string; message: string }> {
  await new Promise((res) => setTimeout(res, 500));

  const txnId = `TXN-${Math.floor(10000 + Math.random() * 90000)}`;

  if (payload.decision === "APPROVE") {
    return {
      success: true,
      certificateId: `BS-CERT-${payload.parcelId}-${new Date().getFullYear()}`,
      auditTxnId: txnId,
      message: `Parcel ${payload.parcelId} has been successfully verified and digitally signed. Unified Parcel Record generated.`,
    };
  } else if (payload.decision === "REQUEST_CORRECTION") {
    return {
      success: true,
      auditTxnId: txnId,
      message: `Correction notice dispatched to applicant and field surveyor with remarks: "${payload.remarks}".`,
    };
  } else {
    return {
      success: true,
      auditTxnId: txnId,
      message: `Application ${payload.caseId} has been rejected. Reason logged: ${payload.rejectionReasonCode} - "${payload.remarks}".`,
    };
  }
}
