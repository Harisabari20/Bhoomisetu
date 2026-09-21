"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Layers,
  MapPin,
  ShieldCheck,
  Sparkles,
  Database,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function HeroGISGraphic() {
  const [activeTab, setActiveTab] = useState<"cadastral" | "systems">("cadastral");
  const [selectedPlot, setSelectedPlot] = useState("125/2");

  const systems = [
    { name: "REVENUE", icon: "🏛️", records: "Patta TR-88219", status: "MATCHED" },
    { name: "REGISTRATION", icon: "📜", records: "Deed 4192/2018", status: "MATCHED" },
    { name: "TAX", icon: "🧾", records: "TX-990184 Paid", status: "MATCHED" },
    { name: "GIS CADASTRE", icon: "🛰️", records: "Polygon 1.87ac", status: "RESOLVED" },
    { name: "PLANNING", icon: "📐", records: "Zone 4B Comm.", status: "MATCHED" },
    { name: "MUNICIPAL", icon: "🏢", records: "SCMC Ward 24", status: "MATCHED" },
  ];

  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* Outer ambient glow */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-earth-500/20 via-blue-500/20 to-earth-600/20 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000"></div>

      <div className="relative rounded-2xl bg-navy-900 border border-navy-700/80 shadow-2xl overflow-hidden backdrop-blur-xl">
        {/* Graphic Top Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-navy-800 bg-navy-950/80">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-earth-400 animate-pulse-subtle" />
            <span className="font-mono text-xs font-bold text-white tracking-wider">
              PARCEL 360° RESOLUTION ENGINE
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-navy-900 p-1 rounded-md border border-navy-800 text-[11px] font-mono">
            <button
              onClick={() => setActiveTab("cadastral")}
              className={cn(
                "px-2.5 py-1 rounded transition-colors",
                activeTab === "cadastral"
                  ? "bg-earth-600 text-white font-semibold shadow-sm"
                  : "text-slate-400 hover:text-white"
              )}
            >
              Cadastral Grid
            </button>
            <button
              onClick={() => setActiveTab("systems")}
              className={cn(
                "px-2.5 py-1 rounded transition-colors",
                activeTab === "systems"
                  ? "bg-blue-600 text-white font-semibold shadow-sm"
                  : "text-slate-400 hover:text-white"
              )}
            >
              Connected Bridge (6)
            </button>
          </div>
        </div>

        {/* Cadastral Grid View */}
        {activeTab === "cadastral" ? (
          <div className="p-5 bg-cadastral-dark-grid relative">
            {/* SVG Visualizer */}
            <div className="relative rounded-xl border border-navy-700/80 bg-navy-950/90 p-4 overflow-hidden">
              <svg viewBox="0 0 460 260" className="w-full h-auto">
                <defs>
                  <linearGradient id="grad-selected" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1B3B36" />
                    <stop offset="100%" stopColor="#0E232B" />
                  </linearGradient>
                </defs>

                {/* Surrounding Plot 125/1 (North Forest) */}
                <g
                  className="cursor-pointer transition-all"
                  onClick={() => setSelectedPlot("125/1")}
                >
                  <rect
                    x="240"
                    y="15"
                    width="195"
                    height="105"
                    rx="4"
                    fill={selectedPlot === "125/1" ? "#1A2C42" : "#111B33"}
                    stroke={selectedPlot === "125/1" ? "#10B981" : "#2A3A60"}
                    strokeWidth="1.5"
                  />
                  <text
                    x="337"
                    y="65"
                    fill="#94A3B8"
                    fontSize="14"
                    fontFamily="monospace"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    125/1
                  </text>
                  <text
                    x="337"
                    y="82"
                    fill="#64748B"
                    fontSize="10"
                    fontFamily="sans-serif"
                    textAnchor="middle"
                  >
                    3.50 ac • Forest Buffer
                  </text>
                </g>

                {/* Surrounding Plot 126/1 (West) */}
                <g
                  className="cursor-pointer transition-all"
                  onClick={() => setSelectedPlot("126/1")}
                >
                  <rect
                    x="25"
                    y="15"
                    width="195"
                    height="105"
                    rx="4"
                    fill={selectedPlot === "126/1" ? "#1A2C42" : "#111B33"}
                    stroke={selectedPlot === "126/1" ? "#10B981" : "#2A3A60"}
                    strokeWidth="1.5"
                  />
                  <text
                    x="122"
                    y="65"
                    fill="#94A3B8"
                    fontSize="14"
                    fontFamily="monospace"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    126/1
                  </text>
                  <text
                    x="122"
                    y="82"
                    fill="#64748B"
                    fontSize="10"
                    fontFamily="sans-serif"
                    textAnchor="middle"
                  >
                    1.80 ac • V. Swaminathan
                  </text>
                </g>

                {/* Surrounding Plot 126/2 (South West) */}
                <g
                  className="cursor-pointer transition-all"
                  onClick={() => setSelectedPlot("126/2")}
                >
                  <rect
                    x="25"
                    y="135"
                    width="195"
                    height="105"
                    rx="4"
                    fill={selectedPlot === "126/2" ? "#1A2C42" : "#111B33"}
                    stroke={selectedPlot === "126/2" ? "#10B981" : "#2A3A60"}
                    strokeWidth="1.5"
                  />
                  <text
                    x="122"
                    y="185"
                    fill="#94A3B8"
                    fontSize="14"
                    fontFamily="monospace"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    126/2
                  </text>
                  <text
                    x="122"
                    y="202"
                    fill="#64748B"
                    fontSize="10"
                    fontFamily="sans-serif"
                    textAnchor="middle"
                  >
                    2.20 ac • K. Alagappan
                  </text>
                </g>

                {/* MAIN TARGET PLOT: 125/2 */}
                <g
                  className="cursor-pointer"
                  onClick={() => setSelectedPlot("125/2")}
                >
                  {/* Selected glow */}
                  <rect
                    x="240"
                    y="135"
                    width="195"
                    height="105"
                    rx="4"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="6"
                    opacity="0.25"
                  />
                  <rect
                    x="240"
                    y="135"
                    width="195"
                    height="105"
                    rx="4"
                    fill="url(#grad-selected)"
                    stroke="#10B981"
                    strokeWidth="2.5"
                  />

                  {/* Corner survey tags */}
                  <circle cx="240" cy="135" r="3.5" fill="#10B981" />
                  <circle cx="435" cy="135" r="3.5" fill="#10B981" />
                  <circle cx="435" cy="240" r="3.5" fill="#10B981" />
                  <circle cx="240" cy="240" r="3.5" fill="#10B981" />

                  {/* Center Survey Number */}
                  <text
                    x="337"
                    y="180"
                    fill="#FFFFFF"
                    fontSize="20"
                    fontFamily="monospace"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    125/2
                  </text>
                  <text
                    x="337"
                    y="200"
                    fill="#34D399"
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight="bold"
                    letterSpacing="1"
                    textAnchor="middle"
                  >
                    SELECT • BS-P00125
                  </text>
                  <text
                    x="337"
                    y="218"
                    fill="#E2E8F0"
                    fontSize="10"
                    fontFamily="sans-serif"
                    textAnchor="middle"
                  >
                    2.00 acres • Ravi Kumar
                  </text>

                  {/* Animated Pin */}
                  <circle cx="337" cy="155" r="4" fill="#10B981" />
                  <circle cx="337" cy="155" r="10" fill="none" stroke="#10B981" strokeWidth="1.5">
                    <animate attributeName="r" values="4;14" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;0" dur="2s" repeatCount="indefinite" />
                  </circle>
                </g>
              </svg>
            </div>

            {/* Bottom Status Card */}
            <div className="mt-4 p-3.5 rounded-xl bg-navy-950/90 border border-navy-800 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-white">
                    BS-P00125
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    ✓ VERIFIED
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Survey 125/2 • Kondalampatti, Salem • 2.00 acres
                </p>
              </div>

              <Link
                href="/citizen/parcel/BS-P00125"
                className="px-3 py-1.5 rounded-md bg-earth-600 hover:bg-earth-500 text-white font-mono text-xs font-semibold flex items-center gap-1 shadow-glow-green transition-all"
              >
                <span>Parcel 360°</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          /* Systems Bridge Animation View */
          <div className="p-5 space-y-3 bg-navy-950/95">
            <div className="text-center py-2">
              <span className="text-xs font-mono uppercase tracking-wider text-earth-400 font-bold">
                Digital Bridge: Many Systems → One Parcel
              </span>
              <p className="text-[11px] text-slate-400 mt-1">
                Zero data duplication. Real-time cryptographic federation.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {systems.map((s) => (
                <div
                  key={s.name}
                  className="p-3 rounded-lg bg-navy-900 border border-navy-800 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{s.icon}</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-bold">
                      {s.status}
                    </span>
                  </div>
                  <div className="mt-2">
                    <p className="font-mono text-[11px] font-bold text-white">{s.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">{s.records}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 rounded-lg bg-earth-950/50 border border-earth-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-earth-400" />
                <div>
                  <p className="text-xs font-bold text-white">Unified Parcel Identity Created</p>
                  <p className="text-[10px] text-slate-400">Deterministic ID: BS-P00125</p>
                </div>
              </div>
              <span className="font-mono text-xs font-bold text-earth-300">96% Parity</span>
            </div>
          </div>
        )}

        {/* Footer Micro-indicators */}
        <div className="px-4 py-2.5 bg-navy-950 border-t border-navy-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>4 Linked Registries</span>
            </span>
            <span>•</span>
            <span>96% Parity Confidence</span>
          </div>
          <span className="text-earth-400 font-semibold">Survey 125/2</span>
        </div>
      </div>
    </div>
  );
}
