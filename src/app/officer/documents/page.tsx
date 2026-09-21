"use client";

import React from "react";
import Link from "next/link";
import { OfficerSidebar } from "@/components/navigation/OfficerSidebar";
import { MOCK_OCR_EVIDENCE } from "@/mock/cases";
import { Sparkles, FileText, CheckCircle2, Search, ExternalLink } from "lucide-react";

export default function OfficerDocumentsPage() {
  return (
    <div className="flex-1 flex flex-col md:flex-row bg-neutral-surface min-h-[calc(100vh-4rem)]">
      <OfficerSidebar />

      <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-900 font-sans">
            Officer Documents & OCR Repository
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Raw scans, OCR transcriptions, and cross-departmental evidence files for revenue adjudication.
          </p>
        </div>

        <div className="space-y-6">
          {MOCK_OCR_EVIDENCE.map((evidence) => (
            <div
              key={evidence.documentId}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {evidence.category}
                    </span>
                    <h3 className="text-base font-bold text-navy-900">{evidence.docName}</h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 font-mono">
                    Engine: {evidence.ocrEngine} • Ingested: {evidence.scannedAt}
                  </p>
                </div>

                <Link
                  href="/officer/verify/APP-10291"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-navy-900 hover:text-earth-700"
                >
                  <span>Open in Workspace</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Fields Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 text-xs font-mono">
                {evidence.fields.map((field) => (
                  <div
                    key={field.label}
                    className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50"
                  >
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                        {field.label}
                      </span>
                      <span className="text-navy-900 font-bold text-sm">
                        {field.extractedText}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {field.systemValue && (
                        <div className="text-right hidden sm:block">
                          <span className="text-[10px] text-slate-400 block">
                            System Parity Value ({field.systemName})
                          </span>
                          <span className="text-slate-700 font-semibold">{field.systemValue}</span>
                        </div>
                      )}
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                        {field.confidence}% Match
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
