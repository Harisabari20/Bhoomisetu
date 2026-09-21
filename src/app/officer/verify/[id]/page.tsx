"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Compass,
  ArrowLeft,
  Shield,
  FileCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  FileText,
  Landmark,
  Receipt,
  MapPin,
  Building2,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Info,
  Check,
} from "lucide-react";
import { LandMap } from "@/components/map";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DataSourceBadge } from "@/components/ui/DataSourceBadge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { MOCK_OFFICER_CASES, MOCK_OCR_EVIDENCE } from "@/mock/cases";
import { MOCK_PARCELS } from "@/mock/parcels";
import { submitOfficerDecision } from "@/services/officerService";
import { cn, formatAcreage, formatCurrencyINR, formatDateIndian } from "@/lib/utils";

export default function OfficerVerificationWorkspace() {
  const params = useParams();
  const router = useRouter();
  const caseId = (params.id as string) || "APP-10291";

  const caseData =
    MOCK_OFFICER_CASES.find((c) => c.caseId === caseId) || MOCK_OFFICER_CASES[0];
  const parcel = MOCK_PARCELS[caseData.parcelId] || MOCK_PARCELS["BS-P00125"];

  const [activeEvidenceTab, setActiveEvidenceTab] = useState<
    "revenue" | "registration" | "tax" | "gis" | "documents" | "ocr"
  >("revenue");

  // Decision Modal states
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectionReasonCode, setRejectionReasonCode] = useState("AREA_DEFICIT_UNRESOLVED");
  const [rejectionRemarks, setRejectionRemarks] = useState("");

  const [correctionModalOpen, setCorrectionModalOpen] = useState(false);
  const [correctionRemarks, setCorrectionRemarks] = useState(
    "Request Field Surveyor to demarcate 8.5 sq m structure encroachment on eastern boundary (Survey 125/3) and 0.13-acre road widening setback along southern corridor."
  );

  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [approvalNotes, setApprovalNotes] = useState(
    "0.13 acre difference confirmed as statutory road setback acquired under Salem Master Plan. Encroachment notice ENC-2026-102 issued for 8.5 sq m outbuilding. Approved with statutory annotations."
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [decisionSuccessMessage, setDecisionSuccessMessage] = useState<string | null>(null);

  const handleExecuteDecision = async (
    decision: "APPROVE" | "REQUEST_CORRECTION" | "REJECT"
  ) => {
    setIsSubmitting(true);
    try {
      const res = await submitOfficerDecision({
        caseId: caseData.caseId,
        parcelId: caseData.parcelId,
        decision,
        officerId: "TN-DRO-4412",
        officerName: "K. Senthil Nathan",
        officerDesignation: "Tahsildar / Dist. Revenue Officer",
        timestamp: new Date().toISOString(),
        remarks:
          decision === "REJECT"
            ? rejectionRemarks
            : decision === "REQUEST_CORRECTION"
            ? correctionRemarks
            : approvalNotes,
        rejectionReasonCode: decision === "REJECT" ? (rejectionReasonCode as any) : undefined,
      });

      setDecisionSuccessMessage(res.message);
      setRejectModalOpen(false);
      setCorrectionModalOpen(false);
      setApproveModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-neutral-surface min-h-[calc(100vh-4rem)]">
      {/* Top Breadcrumb & Status Strip */}
      <div className="bg-navy-950 text-white px-4 sm:px-6 py-3 border-b border-navy-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-mono">
          <Link
            href="/officer"
            className="text-slate-400 hover:text-white transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Case Queue</span>
          </Link>
          <span className="text-slate-600">/</span>
          <span className="font-bold text-white">{caseData.caseId}</span>
          <span className="text-slate-600">•</span>
          <span className="text-earth-400 font-bold">{caseData.parcelId}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-slate-400">
            Adjudicating Officer: <strong>K. Senthil Nathan (Tahsildar)</strong>
          </span>
          <StatusBadge status={caseData.status} size="sm" />
        </div>
      </div>

      {/* Decision Success Notification Banner */}
      {decisionSuccessMessage && (
        <div className="bg-emerald-900/90 text-white p-4 border-b border-emerald-500/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-300" />
            <div>
              <p className="text-xs font-bold font-mono">Decision Recorded Successfully</p>
              <p className="text-xs text-emerald-100">{decisionSuccessMessage}</p>
            </div>
          </div>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => router.push("/officer")}
            className="font-mono text-xs"
          >
            Return to Queue
          </Button>
        </div>
      )}

      {/* SPLIT SCREEN WORKSPACE (Specification 18) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* ════════════════════════════════════════════════════════════════════════
            LEFT: INTERACTIVE GIS MAP (Cadastral Boundaries, Setbacks, Points)
           ════════════════════════════════════════════════════════════════════════ */}
        <div className="lg:col-span-6 p-4 sm:p-6 bg-slate-900 border-r border-navy-800 flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <div className="flex items-center justify-between text-white">
              <h2 className="text-sm font-bold font-mono uppercase tracking-wider flex items-center gap-2">
                <Compass className="w-4 h-4 text-earth-400" />
                <span>Spatial Cadastral Inspection Map</span>
              </h2>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-navy-950 border border-navy-700 text-xs font-mono text-earth-300 font-semibold">
                  Cadastral GIS Engine • Survey {parcel.surveyNumber}
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400">
              Active Discrepancies: (1) 32 sq m northern boundary overlap, (2) 8.5 sq m outbuilding encroachment by Survey 125/3, (3) 0.13-acre road widening setback reserve.
            </p>
          </div>

          {/* Large Map Viewer */}
          <div className="flex-1 min-h-[500px] rounded-xl overflow-hidden border border-navy-700 shadow-2xl relative">
            <LandMap
              selectedParcelId={caseData.parcelId}
              height="h-full min-h-[500px]"
              showSearch={true}
              showInspectorCard={true}
              userRole="officer"
            />
          </div>

          {/* Coordinate Summary Strip */}
          <div className="p-3 rounded-lg bg-navy-950/90 border border-navy-800 text-[11px] font-mono text-slate-300 grid grid-cols-2 gap-2">
            <div>
              <span className="text-slate-500 block">Centroid Coordinates:</span>
              <span className="text-white font-bold">11.6234° N, 78.1362° E</span>
            </div>
            <div>
              <span className="text-slate-500 block">FMB Cadastral Sheet:</span>
              <span className="text-earth-400 font-bold">TN-SHEET-SLM-2024-K1</span>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════════
            RIGHT: VERIFICATION INFORMATION & EVIDENCE TABS (Specification 18)
           ════════════════════════════════════════════════════════════════════════ */}
        <div className="lg:col-span-6 p-4 sm:p-6 bg-white overflow-y-auto space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            {/* Top Case ID & Match Analysis Header */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="grid grid-cols-3 gap-3 font-mono text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block font-semibold">
                    APPLICATION
                  </span>
                  <span className="font-bold text-navy-900 text-sm">{caseData.caseId}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block font-semibold">
                    PARCEL ID
                  </span>
                  <span className="font-bold text-earth-700 text-sm">{caseData.parcelId}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block font-semibold">
                    SURVEY NO.
                  </span>
                  <span className="font-bold text-navy-900 text-sm">{caseData.surveyNumber}</span>
                </div>
              </div>

              {/* MATCH ANALYSIS CHECKLIST (Specification 18) */}
              <div className="pt-3 border-t border-slate-200">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  MATCH ANALYSIS
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-xs">
                  <div className="p-2 rounded bg-white border border-emerald-200 flex items-center justify-between">
                    <span>Survey</span>
                    <span className="text-emerald-700 font-bold">✓</span>
                  </div>
                  <div className="p-2 rounded bg-white border border-emerald-200 flex items-center justify-between">
                    <span>Owner</span>
                    <span className="text-emerald-700 font-bold">✓</span>
                  </div>
                  <div className="p-2 rounded bg-white border border-emerald-200 flex items-center justify-between">
                    <span>Location</span>
                    <span className="text-emerald-700 font-bold">✓</span>
                  </div>
                  <div className="p-2 rounded bg-white border border-emerald-200 flex items-center justify-between">
                    <span>Geometry</span>
                    <span className="text-emerald-700 font-bold">✓</span>
                  </div>
                  <div className="p-2 rounded bg-amber-50 border border-amber-300 flex items-center justify-between text-amber-900 font-bold">
                    <span>Area</span>
                    <span className="text-amber-700 font-bold">⚠</span>
                  </div>
                </div>
              </div>
            </div>

            {/* EVIDENCE TABS (Specification 18) */}
            <div>
              <div className="border-b border-slate-200 flex space-x-2 overflow-x-auto text-xs font-mono font-semibold">
                {[
                  { id: "revenue", label: "Revenue", icon: Landmark },
                  { id: "registration", label: "Registration", icon: FileText },
                  { id: "tax", label: "Tax", icon: Receipt },
                  { id: "gis", label: "GIS", icon: MapPin },
                  { id: "documents", label: "Documents", icon: FileCheck },
                  { id: "ocr", label: "OCR Engine", icon: Sparkles },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeEvidenceTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveEvidenceTab(tab.id as any)}
                      className={cn(
                        "py-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap",
                        isActive
                          ? "border-navy-900 text-navy-900 font-bold bg-slate-50 rounded-t"
                          : "border-transparent text-slate-500 hover:text-navy-900"
                      )}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Contents */}
              <div className="pt-4 text-xs font-mono">
                {/* Revenue Evidence */}
                {activeEvidenceTab === "revenue" && (
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-navy-900">Patta Extract TR-88219/2021</span>
                        <DataSourceBadge source="Revenue" size="xs" />
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-slate-700">
                        <div>Patta Holder: <strong>Ravi Kumar</strong></div>
                        <div>Father: <strong>Late V. Ramanathan</strong></div>
                        <div>Recorded Extent: <strong>2.00 Acres</strong></div>
                        <div>Classification: <strong>Ryotwari Dry</strong></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Registration Evidence */}
                {activeEvidenceTab === "registration" && (
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-navy-900">Absolute Sale Deed DOC-4192/2018</span>
                        <DataSourceBadge source="Registration" size="xs" />
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-slate-700">
                        <div>Executant: <strong>T. G. Sundararaj</strong></div>
                        <div>Purchaser: <strong>Ravi Kumar</strong></div>
                        <div>Consideration: <strong>INR 45,000,000</strong></div>
                        <div>Encumbrance: <strong className="text-emerald-700">NIL</strong></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tax Evidence */}
                {activeEvidenceTab === "tax" && (
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-navy-900">SCMC Assessment ASMT-SLM-2023-8819</span>
                        <DataSourceBadge source="Tax" size="xs" />
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-slate-700">
                        <div>Annual Tax: <strong>INR 34,500</strong></div>
                        <div>Payment: <strong className="text-emerald-700">PAID (2026-27)</strong></div>
                        <div>Arrears: <strong>Zero</strong></div>
                        <div>Ward: <strong>Ward 24 (Kondalampatti, Salem)</strong></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* GIS Evidence */}
                {activeEvidenceTab === "gis" && (
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-lg border border-amber-300 bg-amber-50/50 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-navy-900">High-Res Satellite & Cadastral Analysis</span>
                        <DataSourceBadge source="GIS" size="xs" />
                      </div>
                      <p className="text-slate-700 leading-relaxed">
                        Calculated spatial boundary = <strong>1.87 Acres</strong> (variance: <strong>-0.13 Acres</strong>) due to Salem Master Plan road widening corridor reserve along South boundary.
                        Eastern boundary detects <strong>8.5 sq m structure encroachment</strong> by adjacent Survey 125/3 (K. Selvam outbuilding B-03).
                      </p>
                    </div>
                  </div>
                )}

                {/* Documents Evidence */}
                {activeEvidenceTab === "documents" && (
                  <div className="space-y-2">
                    {parcel.documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between"
                      >
                        <div>
                          <p className="font-bold text-navy-900">{doc.title}</p>
                          <p className="text-[10px] text-slate-500">{doc.issuingAuthority}</p>
                        </div>
                        <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {doc.ocrConfidence}% Match
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* OCR Engine Evidence */}
                {activeEvidenceTab === "ocr" && (
                  <div className="space-y-3">
                    <p className="text-slate-500 text-[11px]">
                      Live text extraction from Patta passbook scan via IndicOCR:
                    </p>
                    <div className="border border-slate-200 rounded-lg overflow-hidden divide-y divide-slate-100">
                      {MOCK_OCR_EVIDENCE[0].fields.map((field) => (
                        <div key={field.label} className="p-2.5 flex items-center justify-between">
                          <div>
                            <span className="text-slate-400 block text-[10px]">{field.label}</span>
                            <span className="font-bold text-navy-900">{field.extractedText}</span>
                          </div>
                          <span className="text-emerald-700 text-[11px] font-bold">
                            {field.confidence}% Match
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ════════════════════════════════════════════════════════════════════
              OFFICER DECISION ACTION BAR (Specification 19)
              Bottom action bar: [ Reject ] [ Request Correction ] [ ✓ Approve ]
             ════════════════════════════════════════════════════════════════════ */}
          <div className="pt-6 border-t border-slate-200">
            <div className="p-4 rounded-xl bg-slate-100/80 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-navy-900 block">
                  Official Adjudication Action
                </span>
                <p className="text-[11px] text-slate-500">
                  Every decision requires remarks and is logged to the sovereign audit trail.
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button
                  variant="danger"
                  size="md"
                  onClick={() => setRejectModalOpen(true)}
                  className="font-mono text-xs flex-1 sm:flex-initial"
                >
                  <XCircle className="w-4 h-4 mr-1" />
                  <span>Reject</span>
                </Button>

                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => setCorrectionModalOpen(true)}
                  className="font-mono text-xs flex-1 sm:flex-initial"
                >
                  <Clock className="w-4 h-4 mr-1 text-amber-600" />
                  <span>Request Correction</span>
                </Button>

                <Button
                  variant="earth"
                  size="md"
                  onClick={() => setApproveModalOpen(true)}
                  className="font-mono text-xs flex-1 sm:flex-initial shadow-glow-green"
                >
                  <Check className="w-4 h-4 mr-1" />
                  <span>✓ Approve</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── MODAL 1: REJECT (Mandatory reason required) ─────────────────── */}
      <Modal
        isOpen={rejectModalOpen}
        onClose={() => setRejectModalOpen(false)}
        title="Reject Application APP-10291"
        subtitle="Mandatory: Select statutory reason code and provide detailed justification."
      >
        <div className="space-y-4 font-sans text-xs">
          <div>
            <label className="block font-mono font-semibold text-slate-700 uppercase mb-1">
              Statutory Reason Code
            </label>
            <select
              value={rejectionReasonCode}
              onChange={(e) => setRejectionReasonCode(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg text-xs font-mono"
            >
              <option value="AREA_DEFICIT_UNRESOLVED">AREA_DEFICIT_UNRESOLVED (Extent delta exceeds permissible limit)</option>
              <option value="BOUNDARY_OVERLAP_CONFIRMED">BOUNDARY_OVERLAP_CONFIRMED (Cadastral geometric collision)</option>
              <option value="DOCUMENT_FRAUDULENT">DOCUMENT_FRAUDULENT (Discrepancy in registration stamps)</option>
              <option value="TITLE_DISPUTE_SUB_JUDICE">TITLE_DISPUTE_SUB_JUDICE (Civil court injunction pending)</option>
            </select>
          </div>

          <div>
            <label className="block font-mono font-semibold text-slate-700 uppercase mb-1">
              Officer Justification & Legal Remarks *
            </label>
            <textarea
              required
              rows={3}
              value={rejectionRemarks}
              onChange={(e) => setRejectionRemarks(e.target.value)}
              placeholder="State statutory grounds for rejection..."
              className="w-full p-2.5 border border-slate-300 rounded-lg text-xs"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button variant="outline" size="sm" onClick={() => setRejectModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              isLoading={isSubmitting}
              disabled={!rejectionRemarks.trim()}
              onClick={() => handleExecuteDecision("REJECT")}
            >
              Confirm Rejection
            </Button>
          </div>
        </div>
      </Modal>

      {/* ─── MODAL 2: REQUEST CORRECTION (Mandatory comments required) ───── */}
      <Modal
        isOpen={correctionModalOpen}
        onClose={() => setCorrectionModalOpen(false)}
        title="Request Correction for APP-10291"
        subtitle="Notice will be issued to applicant and Taluk surveyor."
      >
        <div className="space-y-4 font-sans text-xs">
          <div>
            <label className="block font-mono font-semibold text-slate-700 uppercase mb-1">
              Instructions to Surveyor & Applicant *
            </label>
            <textarea
              required
              rows={4}
              value={correctionRemarks}
              onChange={(e) => setCorrectionRemarks(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg text-xs font-mono"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button variant="outline" size="sm" onClick={() => setCorrectionModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              isLoading={isSubmitting}
              disabled={!correctionRemarks.trim()}
              onClick={() => handleExecuteDecision("REQUEST_CORRECTION")}
            >
              Issue Correction Notice
            </Button>
          </div>
        </div>
      </Modal>

      {/* ─── MODAL 3: APPROVE & ISSUE UNIFIED PARCEL CERTIFICATE ─────────── */}
      <Modal
        isOpen={approveModalOpen}
        onClose={() => setApproveModalOpen(false)}
        title="Approve & Mint Unified Parcel ID"
        subtitle="Endorse verification and sign with DSC credentials."
      >
        <div className="space-y-4 font-sans text-xs">
          <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1">
            <p className="font-bold">Endorsement Condition:</p>
            <p className="text-[11px]">
              0.13-acre difference recorded as Statutory Road Setback transferred to Salem City Municipal Corporation (Salem Master Plan Corridor).
            </p>
          </div>

          <div>
            <label className="block font-mono font-semibold text-slate-700 uppercase mb-1">
              Officer Endorsement Notes
            </label>
            <textarea
              rows={3}
              value={approvalNotes}
              onChange={(e) => setApprovalNotes(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg text-xs"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button variant="outline" size="sm" onClick={() => setApproveModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="earth"
              size="sm"
              isLoading={isSubmitting}
              onClick={() => handleExecuteDecision("APPROVE")}
              className="shadow-glow-green"
            >
              ✓ Authorize & Mint Certificate
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
