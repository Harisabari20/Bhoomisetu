"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { OfficerSidebar } from "@/components/navigation/OfficerSidebar";
import { getConflicts } from "@/services/officerService";
import { ConflictRecord } from "@/types/officer";
import { DataSourceBadge } from "@/components/ui/DataSourceBadge";
import { Button } from "@/components/ui/Button";
import {
  ShieldAlert,
  AlertTriangle,
  Layers,
  ArrowRight,
  CheckCircle2,
  Filter,
  FileCheck,
  Compass,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LandMap } from "@/components/map";

export default function ConflictManagementPage() {
  const [conflicts, setConflicts] = useState<ConflictRecord[]>([]);
  const [selectedSeverity, setSelectedSeverity] = useState<string>("ALL");
  const [focusedConflictId, setFocusedConflictId] = useState<number | null>(2);

  useEffect(() => {
    getConflicts().then(setConflicts);
  }, []);

  const filtered = conflicts.filter(
    (c) => selectedSeverity === "ALL" || c.severity === selectedSeverity
  );

  return (
    <div className="flex-1 flex flex-col md:flex-row bg-neutral-surface min-h-[calc(100vh-4rem)]">
      <OfficerSidebar />

      <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-100 text-rose-800 border border-rose-200">
                DISPUTE GUARD
              </span>
              <span className="text-xs text-slate-500 font-mono">Spatial & Title Collision Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight font-sans mt-1">
              Conflict Management Hub
            </h1>
            <p className="text-sm text-slate-500">
              Active discrepancies detected across Revenue, Registration Deeds, Municipal Tax, and GIS Cadastre.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            {["ALL", "CRITICAL", "MODERATE", "MINOR"].map((sev) => (
              <button
                key={sev}
                onClick={() => setSelectedSeverity(sev)}
                className={cn(
                  "px-3 py-1.5 rounded-lg font-semibold transition-colors",
                  selectedSeverity === sev
                    ? "bg-navy-900 text-white"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                )}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>

        {/* Spatial Conflict GIS Inspector */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse-subtle" />
              <span className="font-mono text-xs font-bold text-navy-900 uppercase tracking-wider">
                Spatial Conflict Inspection Radar • Salem Cadastre
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              Interactive Leaflet CAD & Satellite Overlays
            </span>
          </div>
          <LandMap
            selectedParcelId="BS-P00125"
            selectedConflictId={focusedConflictId}
            onSelectConflict={(id) => setFocusedConflictId(id)}
            userRole="officer"
            height="h-[380px]"
            showSearch={false}
            showInspectorCard={true}
          />
        </div>

        {/* Conflicts List */}
        <div className="space-y-6">
          {filtered.map((conf) => {
            const isCritical = conf.severity === "CRITICAL";
            const isModerate = conf.severity === "MODERATE";

            return (
              <div
                key={conf.conflictId}
                className={cn(
                  "p-6 rounded-2xl bg-white border shadow-sm space-y-4 transition-all",
                  isCritical
                    ? "border-rose-300 ring-1 ring-rose-500/20"
                    : isModerate
                    ? "border-amber-300 ring-1 ring-amber-500/20"
                    : "border-slate-200"
                )}
              >
                {/* Conflict Card Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-navy-900">
                      {conf.conflictId}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="font-mono text-xs text-earth-700 font-semibold">
                      {conf.parcelId} (Survey {conf.surveyNumber})
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border",
                        isCritical
                          ? "bg-rose-50 text-rose-700 border-rose-300"
                          : isModerate
                          ? "bg-amber-50 text-amber-700 border-amber-300"
                          : "bg-slate-100 text-slate-700 border-slate-300"
                      )}
                    >
                      {conf.severity} SEVERITY
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {conf.detectedAt}
                    </span>
                  </div>
                </div>

                {/* Conflict Title & Description */}
                <div>
                  <h3 className="text-base font-bold text-navy-900">{conf.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {conf.description}
                  </p>
                </div>

                {/* Department A vs Department B Comparison Box */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">
                        Department A Claim
                      </span>
                      <DataSourceBadge source={conf.departmentA.source} size="xs" />
                    </div>
                    <p className="font-bold text-navy-900 text-sm">{conf.departmentA.value}</p>
                    <p className="text-[11px] text-slate-500 font-sans">
                      Source Ref: {conf.departmentA.documentRef}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">
                        Department B Claim
                      </span>
                      <DataSourceBadge source={conf.departmentB.source} size="xs" />
                    </div>
                    <p className="font-bold text-navy-900 text-sm">{conf.departmentB.value}</p>
                    <p className="text-[11px] text-slate-500 font-sans">
                      Source Ref: {conf.departmentB.documentRef}
                    </p>
                  </div>
                </div>

                {/* Suggested Action & Resolution Link */}
                <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-bold text-blue-900 block">Suggested Protocol:</span>
                    <p className="text-blue-800 text-[11px] mt-0.5">{conf.suggestedAction}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const targetId = conf.title.toLowerCase().includes("encroach")
                          ? 2
                          : conf.title.toLowerCase().includes("overlap")
                          ? 1
                          : 3;
                        setFocusedConflictId(targetId);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="px-3 py-1.5 rounded-md bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-mono text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <span>Locate on Map</span>
                    </button>
                    <Link
                      href={`/officer/verify/${conf.caseId}`}
                      className="shrink-0 px-3.5 py-1.5 rounded-md bg-navy-900 hover:bg-navy-800 text-white font-mono text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <span>Investigate in Workspace</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
