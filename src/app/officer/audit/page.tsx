"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { OfficerSidebar } from "@/components/navigation/OfficerSidebar";
import { getGlobalAuditLogs } from "@/services/officerService";
import { GlobalAuditLogItem } from "@/mock/auditLogs";
import {
  History,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Shield,
  Search,
  Filter,
  ArrowLeft,
  FileCheck,
  Hash,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AuditHistoryPage() {
  const [logs, setLogs] = useState<GlobalAuditLogItem[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getGlobalAuditLogs().then(setLogs);
  }, []);

  const filtered = logs.filter(
    (l) =>
      l.parcelId.toLowerCase().includes(search.toLowerCase()) ||
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.actor.toLowerCase().includes(search.toLowerCase()) ||
      l.surveyNumber.includes(search)
  );

  return (
    <div className="flex-1 flex flex-col md:flex-row bg-neutral-surface min-h-[calc(100vh-4rem)]">
      <OfficerSidebar />

      <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-800 border border-slate-200">
                PROVENANCE LEDGER
              </span>
              <span className="text-xs text-slate-500 font-mono">Immutable Audit Trail</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight font-sans mt-1">
              National Land Audit Trail
            </h1>
            <p className="text-sm text-slate-500">
              Cryptographic logging of all identity resolutions, validation checks, and officer adjudications.
            </p>
          </div>

          <div className="w-full sm:w-72">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search audit trail..."
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Audit Timeline List (Specification 23) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-8">
          <div className="relative pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {filtered.map((log) => {
              const isResolved = log.status === "RESOLVED" || log.status === "SUCCESS";
              const isWarning = log.status === "WARNING" || log.status === "FLAGGED";

              return (
                <div key={log.id} className="relative group">
                  {/* Timeline dot */}
                  <div
                    className={cn(
                      "absolute -left-[30px] top-1.5 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center",
                      isResolved
                        ? "border-emerald-500 text-emerald-600"
                        : isWarning
                        ? "border-amber-500 text-amber-600"
                        : "border-blue-500 text-blue-600"
                    )}
                  >
                    <div
                      className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        isResolved ? "bg-emerald-500" : isWarning ? "bg-amber-500" : "bg-blue-500"
                      )}
                    />
                  </div>

                  <div className="p-5 rounded-xl bg-slate-50/80 border border-slate-200 space-y-2.5 hover:bg-slate-50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-navy-900 text-sm">
                          {log.timestamp}
                        </span>
                        <span className="text-slate-400">•</span>
                        <span className="text-earth-700 font-bold">{log.parcelId} (S.No {log.surveyNumber})</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-500">{log.ipAddress}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-navy-900 text-white">
                          {log.status}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-navy-900 font-sans">
                      {log.action}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                      {log.details}
                    </p>

                    <div className="pt-2 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-500">
                      <div>
                        Actor: <strong className="text-navy-900">{log.actor}</strong> ({log.actorRole})
                      </div>
                      <div className="flex items-center gap-1 text-slate-400">
                        <Hash className="w-3 h-3" />
                        <span>Hash: {log.hashSignature}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
