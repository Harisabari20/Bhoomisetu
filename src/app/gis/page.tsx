"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LandMap } from "@/components/map";
import { Compass, ArrowLeft, ExternalLink, ShieldCheck, MapPin, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { GIS_PARCELS } from "@/data/gis/parcelsData";

export default function GISExplorerPage() {
  const { currentRole, activeParcelId, switchParcel } = useAuth();
  const [selectedParcelId, setSelectedParcelId] = useState(activeParcelId || "BS-P00125");
  const [selectedConflictId, setSelectedConflictId] = useState<number | null>(null);

  const handleSelect = (id: string) => {
    setSelectedParcelId(id);
    switchParcel(id);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#070D1E] min-h-[calc(100vh-4rem)]">
      {/* Top GIS Command Bar */}
      <div className="bg-navy-950/95 border-b border-navy-800 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-white">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-1.5 rounded-md hover:bg-navy-900 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-earth-600 flex items-center justify-center">
              <Compass className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold font-mono tracking-wider">
                NATIONAL CADASTRAL GIS EXPLORER
              </h1>
              <p className="text-[10px] text-slate-400 font-mono">
                Coordinate Reference System: EPSG:4326 (WGS84) • Kondalampatti, Salem
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions & Navigation Links */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <button
            onClick={() => handleSelect("BS-P00125")}
            className={cn(
              "px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-1.5",
              selectedParcelId === "BS-P00125"
                ? "bg-earth-600 border-earth-400 text-white"
                : "bg-navy-900 border-navy-700 text-slate-300 hover:text-white"
            )}
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>125/2 (Ravi)</span>
          </button>

          <button
            onClick={() => handleSelect("BS-P00127")}
            className={cn(
              "px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-1.5",
              selectedParcelId === "BS-P00127"
                ? "bg-earth-600 border-earth-400 text-white"
                : "bg-navy-900 border-navy-700 text-slate-300 hover:text-white"
            )}
          >
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>125/3 (Selvam)</span>
          </button>

          <button
            onClick={() => handleSelect("BS-P00126")}
            className={cn(
              "px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-1.5",
              selectedParcelId === "BS-P00126"
                ? "bg-earth-600 border-earth-400 text-white"
                : "bg-navy-900 border-navy-700 text-slate-300 hover:text-white"
            )}
          >
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
            <span>125/1 (Meena)</span>
          </button>

          <button
            onClick={() => {
              setSelectedConflictId(2);
            }}
            className="px-3 py-1.5 rounded-lg bg-rose-500/20 border border-rose-500/40 hover:bg-rose-500/30 text-rose-200 transition-colors flex items-center gap-1.5"
          >
            <span>⚠️ Focus Encroachment ②</span>
          </button>

          <Link
            href={`/citizen/parcel/${selectedParcelId}`}
            className="px-3 py-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-earth-300 border border-navy-600 font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <span>Parcel 360°</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Main Full GIS Canvas - Eliminating Layout Dead Space */}
      <div className="flex-1 p-2 sm:p-4 bg-[#070D1E] flex flex-col">
        <LandMap
          selectedParcelId={selectedParcelId}
          selectedConflictId={selectedConflictId}
          onSelectParcel={handleSelect}
          onSelectConflict={setSelectedConflictId}
          userRole={currentRole}
          height="h-[calc(100vh-8.5rem)] min-h-[640px]"
          className="w-full flex-1"
          showSearch={true}
          showControls={true}
          showLayersToggle={true}
          showLegend={true}
          showInspectorCard={true}
        />
      </div>
    </div>
  );
}
