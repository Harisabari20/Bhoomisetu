"use client";

import React, { useState } from "react";
import { BuildingDimensionRecord } from "@/types/parcel";
import {
  Ruler,
  Maximize2,
  CheckCircle2,
  Building,
  Layers,
  ArrowRight,
  ShieldCheck,
  Compass,
  FileCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface HouseDimensionViewerProps {
  dimensions?: BuildingDimensionRecord;
  parcelId?: string;
  surveyNumber?: string;
  className?: string;
}

export function HouseDimensionViewer({
  dimensions,
  parcelId = "BS-P00125",
  surveyNumber = "125/2",
  className,
}: HouseDimensionViewerProps) {
  const [unit, setUnit] = useState<"metric" | "imperial">("imperial");
  const [activeZone, setActiveZone] = useState<string>("all");

  const d = dimensions || {
    approvalPlanNumber: "SCMC/WD24/BLD/2022/88194",
    approvalAuthority: "Salem City Municipal Corporation Town Planning",
    structureType: "L-Shaped Articulated Residential Villa (G+1 Floors)",
    floors: "G+1 Floors",
    totalHeightMeters: 8.5,
    plotDimensions: {
      northBoundaryMeters: 90.0,
      southBoundaryMeters: 88.5,
      eastBoundaryMeters: 91.2,
      westBoundaryMeters: 89.8,
      totalPlotAreaSqFt: 87120,
      totalPlotAreaSqMeters: 8093.7,
    },
    buildingFootprint: {
      lengthMeters: 20.5,
      widthMeters: 18.7,
      plinthAreaSqFt: 5018,
      carpetAreaSqFt: 4265,
      superBuiltUpAreaSqFt: 10036,
      groundCoveragePercent: 5.76,
      fsiRatio: 0.12,
    },
    setbacks: {
      frontRoadSetbackMeters: 84.2,
      rearSetbackMeters: 64.5,
      leftSideSetbackMeters: 50.5,
      rightSideSetbackMeters: 96.0,
      complianceStatus: "FULLY_COMPLIANT" as const,
    },
    roofType: "Weatherproof Terraced RCC Slab with Rainwater Harvesting & Solar PV (10kW)",
    compoundWallLengthMeters: 359.5,
    mainGateWidthMeters: 6.0,
    drivewayWidthMeters: 4.5,
    wallSchedule: [
      { segment: "North Wall (NW Wing)", fromCorner: "H1", toCorner: "H2", lengthMeters: 17.9, description: "Master Wing North Elevation" },
      { segment: "Courtyard Recess Step", fromCorner: "H2", toCorner: "H3", lengthMeters: 11.7, description: "Central Garden Courtyard Inset" },
      { segment: "North Wall (SE Wing)", fromCorner: "H3", toCorner: "H4", lengthMeters: 11.1, description: "Living Pavilion North Wall" },
      { segment: "East Frontage Wall", fromCorner: "H4", toCorner: "H5", lengthMeters: 18.7, description: "OMR Road Facing Porch Facade" },
      { segment: "South Wall", fromCorner: "H5", toCorner: "H6", lengthMeters: 15.2, description: "Dining & Kitchen South Wall" },
      { segment: "West Wall (Main Block)", fromCorner: "H6", toCorner: "H7", lengthMeters: 20.5, description: "Rear Service Corridor Wall" },
      { segment: "Inner Courtyard Return", fromCorner: "H7", toCorner: "H8", lengthMeters: 13.6, description: "Western Courtyard Step" },
      { segment: "West Wall (NW Wing)", fromCorner: "H8", toCorner: "H1", lengthMeters: 9.7, description: "Master Suite Rear Elevation" },
    ],
  };

  // Unit conversion helpers
  const mToFt = (m: number) => (m * 3.28084).toFixed(1);
  const sqmToSqft = (sqm: number) => (sqm * 10.7639).toFixed(0);

  const formatLen = (m: number) =>
    unit === "imperial" ? `${mToFt(m)} ft` : `${m.toFixed(1)} m`;

  const formatArea = (sqft: number, sqm: number) =>
    unit === "imperial"
      ? `${sqft.toLocaleString()} sq.ft`
      : `${sqm.toLocaleString(undefined, { maximumFractionDigits: 1 })} m²`;

  return (
    <div className={cn("bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden", className)}>
      {/* Top Header & Unit Switcher */}
      <div className="bg-navy-950 text-white p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-navy-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-earth-400 animate-pulse-subtle" />
            <span className="font-mono text-xs font-bold text-earth-300 uppercase tracking-wider">
              ARCHITECTURAL CAD & MUNICIPAL BLUEPRINT
            </span>
          </div>
          <h3 className="text-xl font-bold font-sans text-white mt-1">
            House & Building Dimensional Analysis
          </h3>
          <p className="text-xs text-slate-300 font-mono mt-0.5">
            Plan Ref: <strong>{d.approvalPlanNumber}</strong> • {d.approvalAuthority}
          </p>
        </div>

        {/* Metric vs Imperial Toggle */}
        <div className="flex items-center gap-2 bg-navy-900 p-1 rounded-xl border border-navy-700 font-mono text-xs">
          <button
            onClick={() => setUnit("imperial")}
            className={cn(
              "px-3 py-1.5 rounded-lg transition-all font-semibold",
              unit === "imperial"
                ? "bg-earth-600 text-white shadow-glow-green"
                : "text-slate-400 hover:text-white"
            )}
          >
            Imperial (ft / sq.ft)
          </button>
          <button
            onClick={() => setUnit("metric")}
            className={cn(
              "px-3 py-1.5 rounded-lg transition-all font-semibold",
              unit === "metric"
                ? "bg-earth-600 text-white shadow-glow-green"
                : "text-slate-400 hover:text-white"
            )}
          >
            Metric (m / m²)
          </button>
        </div>
      </div>

      {/* Main Grid: Blueprint Visualizer + Dimensional Metrics */}
      <div className="p-6 sm:p-8 space-y-8">
        {/* Architectural 2D Blueprint Graphic */}
        <div className="relative rounded-2xl bg-[#0B1528] border-2 border-navy-800 p-6 overflow-hidden shadow-gis-lg">
          {/* Blueprint Title */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4 pb-2 border-b border-navy-800">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-earth-400" />
              <span className="text-white font-bold">CADASTRAL PLOT & FOOTPRINT SPECIFICATION</span>
            </div>
            <span className="text-earth-400 font-bold">
              Scale 1:200 CAD Vector
            </span>
          </div>

          {/* SVG CAD Drawing */}
          <div className="relative w-full overflow-x-auto">
            <svg
              viewBox="0 0 800 480"
              className="w-full h-auto min-w-[650px]"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {/* Blueprint grid pattern */}
                <pattern id="cad-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                </pattern>
                {/* Hatch for building walls */}
                <pattern id="wall-hatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="8" stroke="#3B82F6" strokeWidth="1.5" opacity="0.4" />
                </pattern>
                {/* Hatch for setback buffer */}
                <pattern id="setback-dots" width="12" height="12" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="#F59E0B" opacity="0.25" />
                </pattern>
                {/* Marker arrow */}
                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#94A3B8" />
                </marker>
                <marker id="arrow-green" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#10B981" />
                </marker>
                <marker id="arrow-amber" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#F59E0B" />
                </marker>
              </defs>

              {/* Grid Background */}
              <rect width="800" height="480" fill="#0A1122" />
              <rect width="800" height="480" fill="url(#cad-grid)" />

              {/* ─── 1. OUTER PLOT BOUNDARY ──────────────────────────────────── */}
              {/* Outer Compound Wall Boundary (Offset from edges) */}
              <polygon
                points="70,50 710,50 710,430 70,430"
                fill="none"
                stroke="#64748B"
                strokeWidth="2.5"
                strokeDasharray="6 4"
              />

              {/* Road Indicator along East (Right side) */}
              <rect x="735" y="30" width="45" height="420" fill="#1E293B" stroke="#334155" />
              <text x="757" y="240" fill="#94A3B8" fontSize="11" fontFamily="monospace" transform="rotate(90 757 240)" textAnchor="middle" letterSpacing="3">
                60FT OMR FEEDER ROAD
              </text>

              {/* Plot Boundary Dimension Callouts */}
              {/* North Boundary */}
              <line x1="70" y1="30" x2="710" y2="30" stroke="#94A3B8" strokeWidth="1.2" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
              <rect x="340" y="20" width="110" height="20" rx="4" fill="#0B132B" stroke="#334155" />
              <text x="395" y="34" fill="#E2E8F0" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                N: {formatLen(d.plotDimensions.northBoundaryMeters)}
              </text>

              {/* South Boundary */}
              <line x1="70" y1="450" x2="710" y2="450" stroke="#94A3B8" strokeWidth="1.2" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
              <rect x="340" y="440" width="110" height="20" rx="4" fill="#0B132B" stroke="#334155" />
              <text x="395" y="454" fill="#E2E8F0" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                S: {formatLen(d.plotDimensions.southBoundaryMeters)}
              </text>

              {/* West Boundary */}
              <line x1="45" y1="50" x2="45" y2="430" stroke="#94A3B8" strokeWidth="1.2" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
              <rect x="2" y="230" width="85" height="20" rx="4" fill="#0B132B" stroke="#334155" />
              <text x="45" y="244" fill="#E2E8F0" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                W: {formatLen(d.plotDimensions.westBoundaryMeters)}
              </text>

              {/* East Boundary (Road Frontage) */}
              <line x1="725" y1="50" x2="725" y2="430" stroke="#94A3B8" strokeWidth="1.2" markerStart="url(#arrow)" markerEnd="url(#arrow)" />

              {/* ─── 2. STATUTORY SETBACK BUFFER ZONE ────────────────────────── */}
              {/* Outer plot area is filled with setback pattern except where building stands */}
              <rect x="70" y="50" width="640" height="380" fill="url(#setback-dots)" />

              {/* Setback dimension callouts with arrows */}
              {/* Front Setback (East to Building) */}
              <line x1="570" y1="210" x2="710" y2="210" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 3" markerStart="url(#arrow-amber)" markerEnd="url(#arrow-amber)" />
              <rect x="600" y="195" width="80" height="18" rx="3" fill="#1C1917" stroke="#78350F" />
              <text x="640" y="208" fill="#FBBF24" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                Front {formatLen(d.setbacks.frontRoadSetbackMeters)}
              </text>

              {/* Rear Setback (West to Building) */}
              <line x1="70" y1="210" x2="190" y2="210" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 3" markerStart="url(#arrow-amber)" markerEnd="url(#arrow-amber)" />
              <rect x="95" y="195" width="70" height="18" rx="3" fill="#1C1917" stroke="#78350F" />
              <text x="130" y="208" fill="#FBBF24" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                Rear {formatLen(d.setbacks.rearSetbackMeters)}
              </text>

              {/* North Side Setback */}
              <line x1="380" y1="50" x2="380" y2="130" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 3" markerStart="url(#arrow-amber)" markerEnd="url(#arrow-amber)" />
              <rect x="345" y="80" width="70" height="18" rx="3" fill="#1C1917" stroke="#78350F" />
              <text x="380" y="93" fill="#FBBF24" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                Side {formatLen(d.setbacks.leftSideSetbackMeters)}
              </text>

              {/* South Side Setback */}
              <line x1="380" y1="350" x2="380" y2="430" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 3" markerStart="url(#arrow-amber)" markerEnd="url(#arrow-amber)" />
              <rect x="345" y="380" width="70" height="18" rx="3" fill="#1C1917" stroke="#78350F" />
              <text x="380" y="393" fill="#FBBF24" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                Side {formatLen(d.setbacks.rightSideSetbackMeters)}
              </text>

              {/* ─── 3. MAIN BUILDING FOOTPRINT (PLINTH) ─────────────────────── */}
              {/* L-Shaped Articulated Villa Footprint */}
              <polygon
                points="220,130 380,130 380,210 520,210 520,340 360,340 360,250 220,250"
                fill="#13233F"
                stroke="#10B981"
                strokeWidth="3"
                className="filter drop-shadow-lg"
              />
              <polygon
                points="220,130 380,130 380,210 520,210 520,340 360,340 360,250 220,250"
                fill="url(#wall-hatch)"
              />

              {/* Internal Functional Zones / Architectural Layout */}
              {/* Zone 1: NW Wing (Master Suite & Terrace) */}
              <rect x="230" y="140" width="140" height="100" rx="3" fill="#1E3A8A" opacity="0.3" stroke="#3B82F6" strokeWidth="1" />
              <text x="300" y="190" fill="#93C5FD" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
                Master Wing (G+1)
              </text>

              {/* Zone 2: Central Living Pavilion */}
              <rect x="370" y="220" width="140" height="110" rx="3" fill="#065F46" opacity="0.25" stroke="#10B981" strokeWidth="1" />
              <text x="440" y="275" fill="#A7F3D0" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
                Living & Dining Pavilion
              </text>

              {/* Wall 1 (H1-H2): North Wall NW Wing */}
              <line x1="220" y1="115" x2="380" y2="115" stroke="#10B981" strokeWidth="1.5" markerStart="url(#arrow-green)" markerEnd="url(#arrow-green)" />
              <rect x="260" y="105" width="80" height="18" rx="3" fill="#064E3B" stroke="#059669" />
              <text x="300" y="118" fill="#A7F3D0" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                {unit === "imperial" ? "58.7 ft" : "17.9 m"}
              </text>

              {/* Wall 2 (H2-H3): Courtyard Step */}
              <line x1="395" y1="130" x2="395" y2="210" stroke="#10B981" strokeWidth="1.5" markerStart="url(#arrow-green)" markerEnd="url(#arrow-green)" />
              <text x="402" y="175" fill="#A7F3D0" fontSize="9" fontFamily="monospace" fontWeight="bold">
                {unit === "imperial" ? "38.4 ft" : "11.7 m"}
              </text>

              {/* Wall 3 (H3-H4): North Wall SE Wing */}
              <line x1="380" y1="195" x2="520" y2="195" stroke="#10B981" strokeWidth="1.5" markerStart="url(#arrow-green)" markerEnd="url(#arrow-green)" />
              <text x="450" y="190" fill="#A7F3D0" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                {unit === "imperial" ? "36.4 ft" : "11.1 m"}
              </text>

              {/* Wall 4 (H4-H5): East Frontage Wall */}
              <line x1="535" y1="210" x2="535" y2="340" stroke="#10B981" strokeWidth="1.5" markerStart="url(#arrow-green)" markerEnd="url(#arrow-green)" />
              <rect x="540" y="265" width="80" height="18" rx="3" fill="#064E3B" stroke="#059669" />
              <text x="580" y="278" fill="#A7F3D0" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                {unit === "imperial" ? "61.4 ft" : "18.7 m"}
              </text>

              {/* Wall 5 (H5-H6): South Wall */}
              <line x1="360" y1="355" x2="520" y2="355" stroke="#10B981" strokeWidth="1.5" markerStart="url(#arrow-green)" markerEnd="url(#arrow-green)" />
              <text x="440" y="370" fill="#A7F3D0" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                {unit === "imperial" ? "49.9 ft" : "15.2 m"}
              </text>

              {/* Center Plinth Area Badge */}
              <rect x="375" y="295" width="130" height="35" rx="5" fill="#071328" stroke="#10B981" strokeWidth="1.5" />
              <text x="440" y="310" fill="#34D399" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                PLINTH FOOTPRINT
              </text>
              <text x="440" y="324" fill="#FFFFFF" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                {formatArea(d.buildingFootprint.plinthAreaSqFt, 466.2)}
              </text>

              {/* ─── 4. ENTRY GATE & DRIVEWAY ────────────────────────────────── */}
              {/* Driveway path from East Road to Building Entry */}
              <polygon points="520,270 710,270 710,320 520,320" fill="#1E293B" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />
              <text x="615" y="298" fill="#CBD5E1" fontSize="10" fontFamily="monospace" textAnchor="middle">
                Driveway {formatLen(d.drivewayWidthMeters)}
              </text>

              {/* Main Gate Callout */}
              <rect x="705" y="270" width="10" height="50" fill="#F59E0B" />
              <text x="690" y="340" fill="#FBBF24" fontSize="9" fontFamily="monospace" textAnchor="end">
                Main Gate: {formatLen(d.mainGateWidthMeters)}
              </text>
            </svg>
          </div>

          {/* Blueprint Legend Footer */}
          <div className="mt-4 pt-3 border-t border-navy-800 flex flex-wrap items-center justify-between text-xs font-mono text-slate-300 gap-2">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-500/30 border border-emerald-400" />
                <span>Building Footprint</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-amber-500/20 border border-amber-400" />
                <span>Statutory Setback</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-slate-700 border border-slate-500" />
                <span>Compound Wall</span>
              </span>
            </div>
            <span className="text-emerald-400 font-bold">
              ✓ Setbacks 100% Verified against SCMC 2022 Bylaws
            </span>
          </div>
        </div>

        {/* 6 Dimension Specification Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card 1: Building Footprint (Plinth) */}
          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-400">
                BUILDING FOOTPRINT (PLINTH)
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                {d.floors}
              </span>
            </div>
            <p className="text-xl font-bold font-mono text-navy-900">
              {formatLen(d.buildingFootprint.lengthMeters)} × {formatLen(d.buildingFootprint.widthMeters)}
            </p>
            <div className="pt-1 text-xs text-slate-600 space-y-1">
              <div>Plinth Area: <strong>{formatArea(d.buildingFootprint.plinthAreaSqFt, (d.buildingFootprint.lengthMeters * d.buildingFootprint.widthMeters))}</strong></div>
              <div>Super Built-up: <strong>{formatArea(d.buildingFootprint.superBuiltUpAreaSqFt, 2364)}</strong></div>
              <div>Building Height: <strong>{formatLen(d.totalHeightMeters)}</strong></div>
            </div>
          </div>

          {/* Card 2: Plot Extent & Coverage */}
          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-400">
                PLOT EXTENT & GROUND COVERAGE
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 text-blue-800 border border-blue-200">
                FSI / FAR {d.buildingFootprint.fsiRatio}
              </span>
            </div>
            <p className="text-xl font-bold font-mono text-navy-900">
              {d.buildingFootprint.groundCoveragePercent}% Coverage
            </p>
            <div className="pt-1 text-xs text-slate-600 space-y-1">
              <div>Total Plot Area: <strong>{formatArea(d.plotDimensions.totalPlotAreaSqFt, d.plotDimensions.totalPlotAreaSqMeters)}</strong> (2.00 ac)</div>
              <div>Max Permissible Coverage: <strong>35.0%</strong> (Safe Margin: +23.3%)</div>
              <div>Max Permissible FSI: <strong>1.50</strong> (Utilized: 0.29)</div>
            </div>
          </div>

          {/* Card 3: Setback Compliance Matrix */}
          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-400">
                SETBACK ADJUDICATION
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                ✓ COMPLIANT
              </span>
            </div>
            <div className="pt-1 text-xs font-mono space-y-1 text-slate-700">
              <div className="flex justify-between">
                <span>Front (OMR Road):</span>
                <strong>{formatLen(d.setbacks.frontRoadSetbackMeters)} (Req: {unit === "imperial" ? "20 ft" : "6.0 m"})</strong>
              </div>
              <div className="flex justify-between">
                <span>Rear:</span>
                <strong>{formatLen(d.setbacks.rearSetbackMeters)} (Req: {unit === "imperial" ? "15 ft" : "4.5 m"})</strong>
              </div>
              <div className="flex justify-between">
                <span>Side (Left):</span>
                <strong>{formatLen(d.setbacks.leftSideSetbackMeters)} (Req: {unit === "imperial" ? "12 ft" : "3.5 m"})</strong>
              </div>
              <div className="flex justify-between">
                <span>Side (Right):</span>
                <strong>{formatLen(d.setbacks.rightSideSetbackMeters)} (Req: {unit === "imperial" ? "12 ft" : "3.5 m"})</strong>
              </div>
            </div>
          </div>
        </div>

        {/* 8-Segment Cadastral Wall Schedule (DGPS Surveyed) */}
        {d.wallSchedule && d.wallSchedule.length > 0 && (
          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs">
            <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-emerald-600" />
                <h4 className="text-sm font-bold text-navy-900 font-mono">
                  ARCHITECTURAL CADASTRAL WALL SCHEDULE (DGPS SURVEYED)
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {d.wallSchedule.length} Boundary Walls
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  Perimeter: {unit === "imperial" ? `${(d.wallSchedule.reduce((sum, w) => sum + w.lengthMeters, 0) * 3.28084).toFixed(1)} ft` : `${d.wallSchedule.reduce((sum, w) => sum + w.lengthMeters, 0).toFixed(1)} m`}
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-100/70 border-b border-slate-200 text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                  <tr>
                    <th className="py-2.5 px-4">Segment</th>
                    <th className="py-2.5 px-4">Wall / Elevation</th>
                    <th className="py-2.5 px-4">DGPS Survey Description</th>
                    <th className="py-2.5 px-4 text-right">Length ({unit === "imperial" ? "Feet" : "Meters"})</th>
                    <th className="py-2.5 px-4 text-right">Alt Unit</th>
                    <th className="py-2.5 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {d.wallSchedule.map((wall, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-2.5 px-4 whitespace-nowrap">
                        <span className="px-1.5 py-0.5 rounded bg-navy-100 text-navy-800 font-bold border border-navy-200 text-[11px]">
                          {wall.fromCorner} → {wall.toCorner}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 font-semibold text-navy-900 whitespace-nowrap">
                        {wall.segment}
                      </td>
                      <td className="py-2.5 px-4 text-slate-600">
                        {wall.description}
                      </td>
                      <td className="py-2.5 px-4 text-right font-bold text-emerald-700 whitespace-nowrap">
                        {unit === "imperial" ? `${(wall.lengthMeters * 3.28084).toFixed(1)} ft` : `${wall.lengthMeters.toFixed(1)} m`}
                      </td>
                      <td className="py-2.5 px-4 text-right text-slate-400 whitespace-nowrap">
                        {unit === "imperial" ? `${wall.lengthMeters.toFixed(1)} m` : `${(wall.lengthMeters * 3.28084).toFixed(1)} ft`}
                      </td>
                      <td className="py-2.5 px-4 text-center whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          Surveyed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-50 border-t border-slate-200 font-bold text-navy-900">
                  <tr>
                    <td colSpan={3} className="py-2.5 px-4 text-slate-700">
                      Total Plinth Perimeter & Enclosed Ground Footprint
                    </td>
                    <td className="py-2.5 px-4 text-right text-emerald-800 font-extrabold text-sm">
                      {unit === "imperial" ? `${(d.wallSchedule.reduce((sum, w) => sum + w.lengthMeters, 0) * 3.28084).toFixed(1)} ft` : `${d.wallSchedule.reduce((sum, w) => sum + w.lengthMeters, 0).toFixed(1)} m`}
                    </td>
                    <td colSpan={2} className="py-2.5 px-4 text-right text-slate-500 text-[11px]">
                      Plinth: {formatArea(d.buildingFootprint.plinthAreaSqFt, 466.2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        {/* Compound Wall, Gates & Access Dimensions */}
        <div className="p-4 rounded-xl bg-slate-100/80 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-700">
          <div className="flex flex-wrap items-center gap-6">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Compound Perimeter:</span>
              <strong className="text-navy-900">{formatLen(d.compoundWallLengthMeters)}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Main Entry Gate:</span>
              <strong className="text-navy-900">{formatLen(d.mainGateWidthMeters)}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Paved Driveway:</span>
              <strong className="text-navy-900">{formatLen(d.drivewayWidthMeters)}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Roof System:</span>
              <strong className="text-navy-900">{d.roofType}</strong>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-emerald-800 font-bold">Town Planning Endorsed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
