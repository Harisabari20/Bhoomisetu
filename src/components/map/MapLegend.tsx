"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Info, Satellite, Compass } from "lucide-react";
import { MapTelemetry } from "./mapTypes";
import { cn } from "@/lib/utils";

interface MapLegendProps {
  telemetry: MapTelemetry;
  cursorCoords: { lat: number; lng: number } | null;
  className?: string;
}

export function MapLegend({ telemetry, cursorCoords, className }: MapLegendProps) {
  const [isLegendOpen, setIsLegendOpen] = useState(false);

  const legendItems = [
    { label: "Subject Parcel Boundary", color: "border-blue-500 bg-blue-500/30", type: "poly" },
    { label: "Neighbor Parcels (6 Plots)", color: "border-emerald-500 bg-emerald-500/20", type: "poly" },
    { label: "Building Footprint (Underneath)", color: "border-slate-800 bg-slate-800/80", type: "poly" },
    { label: "Structure Encroachment (8.5 m²)", color: "border-red-600 bg-red-600/60", type: "poly" },
    { label: "Official Cadastral Boundary Line", color: "border-blue-500 border-dashed", type: "line" },
    { label: "Boundary Overlap (32 m²)", color: "border-orange-500 bg-orange-500/40", type: "poly" },
    { label: "Road Corridor & Setback (0.13 ac)", color: "border-amber-500 bg-amber-500/30", type: "poly" },
    { label: "Water Bodies & Hydrology", color: "border-cyan-500 bg-cyan-500/30", type: "poly" },
    { label: "Utility Powerline & Water Trunk", color: "border-purple-500 border-dashed", type: "line" },
  ];

  const currentLat = cursorCoords ? cursorCoords.lat.toFixed(5) : telemetry.lat.toFixed(5);
  const currentLng = cursorCoords ? cursorCoords.lng.toFixed(5) : telemetry.lng.toFixed(5);

  return (
    <div className={cn("absolute bottom-0 left-0 right-0 z-[400] pointer-events-none", className)}>
      {/* FLOATING COLLAPSIBLE LEGEND BOX (BOTTOM LEFT) */}
      <div className="absolute bottom-11 left-4 pointer-events-auto">
        <div className="bg-navy-950/90 backdrop-blur-md rounded-xl border border-navy-800 shadow-2xl overflow-hidden text-white transition-all max-w-[280px]">
          <button
            onClick={() => setIsLegendOpen(!isLegendOpen)}
            className="w-full px-3 py-2 flex items-center justify-between gap-2 text-xs font-mono font-semibold hover:bg-navy-900 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-subtle" />
              <span>Map Legend & Symbology</span>
            </div>
            {isLegendOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>

          {isLegendOpen && (
            <div className="p-3 pt-1 border-t border-navy-800/80 space-y-1.5 text-[11px] font-sans">
              {legendItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  {item.type === "poly" ? (
                    <span className={cn("w-3.5 h-3.5 rounded-xs border shrink-0", item.color)} />
                  ) : (
                    <span className={cn("w-4 h-0 border-t-2 shrink-0", item.color)} />
                  )}
                  <span className="text-slate-300 text-[10.5px] leading-tight">{item.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM TELEMETRY STRIP */}
      <div className="bg-navy-950/95 backdrop-blur-md border-t border-navy-800 px-4 py-2 text-[10px] sm:text-[11px] font-mono text-slate-300 flex flex-wrap items-center justify-between gap-2 shadow-2xl pointer-events-auto">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-earth-400" />
            <span className="text-slate-400">Position:</span>
            <span className="text-white font-bold tracking-wider">
              {currentLat}° N, {currentLng}° E
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5">
            <span className="text-slate-400">Zoom:</span>
            <span className="text-earth-300 font-semibold">
              Z{telemetry.zoom.toFixed(1)}
              {telemetry.zoom >= 19
                ? " (Cadastral CAD)"
                : telemetry.zoom >= 17
                ? " (Parcel View)"
                : " (Locality Grid)"}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1.5">
            <span className="text-slate-400">Elevation:</span>
            <span className="text-slate-200">{telemetry.elevation}m AMSL</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-slate-400">
          <div className="hidden lg:flex items-center gap-1.5">
            <Satellite className="w-3.5 h-3.5 text-blue-400" />
            <span>Pass: {telemetry.satellitePassDate}</span>
          </div>
          <span className="px-1.5 py-0.5 rounded bg-navy-900 border border-navy-700 text-slate-300 text-[9px] uppercase tracking-wider font-bold">
            EPSG:4326 • WGS 84
          </span>
        </div>
      </div>
    </div>
  );
}
