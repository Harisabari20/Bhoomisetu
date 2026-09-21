"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { OfficerSidebar } from "@/components/navigation/OfficerSidebar";
import { getOfficerMetrics, getOfficerCases } from "@/services/officerService";
import { OfficerCaseItem, OfficerDashboardMetrics } from "@/types/officer";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  Shield,
  FileCheck,
  ShieldAlert,
  CheckCircle2,
  Clock,
  Filter,
  Search,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function OfficerDashboardPage() {
  const [metrics, setMetrics] = useState<OfficerDashboardMetrics | null>(null);
  const [cases, setCases] = useState<OfficerCaseItem[]>([]);
  const [filter, setFilter] = useState<"ALL" | "UNDER_REVIEW" | "POTENTIAL_CONFLICT" | "VERIFIED">("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getOfficerMetrics().then(setMetrics);
    getOfficerCases().then(setCases);
  }, []);

  const filteredCases = cases.filter((c) => {
    const matchesFilter = filter === "ALL" || c.status === filter;
    const matchesSearch =
      c.caseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.parcelId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.surveyNumber.includes(searchQuery) ||
      c.applicantName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex-1 flex flex-col md:flex-row bg-neutral-surface min-h-[calc(100vh-4rem)]">
      {/* Officer Sidebar */}
      <OfficerSidebar />

      {/* Main Content Area */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto">
        {/* Officer Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 text-blue-800 border border-blue-200">
                REVENUE ADJUDICATION
              </span>
              <span className="text-xs text-slate-500 font-mono">Salem Taluk • Salem District</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight font-sans mt-1">
              Officer Verification Workspace
            </h1>
            <p className="text-sm text-slate-500">
              Welcome, Tahsildar K. Senthil Nathan. Inspect cross-system evidence and resolve discrepancies.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/officer/verify/APP-10291"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-white font-mono text-xs font-semibold shadow-sm transition-all"
            >
              <FileCheck className="w-4 h-4 text-blue-400" />
              <span>Open Primary Case APP-10291 →</span>
            </Link>
          </div>
        </div>

        {/* 4 Metric Cards (Specification 17) */}
        {metrics && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  Total Cases
                </span>
                <p className="text-2xl font-bold font-mono text-navy-900 mt-1">
                  {metrics.totalCases}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">Assigned to jurisdiction</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  Pending Verification
                </span>
                <p className="text-2xl font-bold font-mono text-amber-700 mt-1">
                  {metrics.pendingVerification}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">Awaiting officer sign-off</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
                <Clock className="w-5 h-5" />
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  Active Conflicts
                </span>
                <p className="text-2xl font-bold font-mono text-rose-700 mt-1">
                  {metrics.activeConflicts}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">Boundary or title disputes</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-200">
                <ShieldAlert className="w-5 h-5" />
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  Resolved Cases
                </span>
                <p className="text-2xl font-bold font-mono text-emerald-700 mt-1">
                  {metrics.resolvedCases}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">Parity certificates minted</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
          </div>
        )}

        {/* Case Queue Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-navy-900 font-sans">
                Adjudication & Verification Queue
              </h2>
              <p className="text-xs text-slate-500">
                Parcels requiring field verification, setback endorsements, or evidence review.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
              {(["ALL", "UNDER_REVIEW", "POTENTIAL_CONFLICT", "VERIFIED"] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setFilter(st)}
                  className={cn(
                    "px-2.5 py-1 rounded-md transition-colors",
                    filter === st
                      ? "bg-navy-900 text-white font-bold"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  )}
                >
                  {st === "ALL" ? "All Cases" : st.replace("_", " ")}
                </button>
              ))}
            </div>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Case ID, Parcel ID, Survey Number, or Applicant Name..."
              className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-navy-900 font-mono"
            />
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs divide-y divide-slate-200">
              <thead className="bg-slate-50 font-mono text-[11px] text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Case ID</th>
                  <th className="py-3 px-4">Parcel / Survey</th>
                  <th className="py-3 px-4">Applicant</th>
                  <th className="py-3 px-4">Trigger Reason</th>
                  <th className="py-3 px-4">Match Score</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCases.map((c) => (
                  <tr key={c.caseId} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-navy-900">
                      {c.caseId}
                    </td>
                    <td className="py-3.5 px-4 font-mono">
                      <div className="font-bold text-earth-700">{c.parcelId}</div>
                      <div className="text-[11px] text-slate-500">S.No {c.surveyNumber}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-navy-900">{c.applicantName}</div>
                      <div className="text-[11px] text-slate-400">{c.district}</div>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs text-[11px] text-slate-600">
                      {c.triggerReason}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-navy-900">
                      <span className={c.matchScore >= 90 ? "text-emerald-700" : "text-amber-700"}>
                        {c.matchScore}%
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={c.status} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/officer/verify/${c.caseId}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-navy-900 hover:bg-navy-800 text-white font-mono text-xs font-semibold transition-colors"
                      >
                        <span>Inspect</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
