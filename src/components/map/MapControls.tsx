"use client";

import React from "react";
import {
  Plus,
  Minus,
  Crosshair,
  Maximize2,
  Minimize2,
  Layers,
  Map as MapIcon,
  Satellite,
  Compass,
  Scan,
} from "lucide-react";
import { BasemapType } from "./mapTypes";
import { BASEMAP_CONFIGS } from "./mapConfig";
import { cn } from "@/lib/utils";

interface MapControlsProps {
  currentBasemap: BasemapType;
  onBasemapChange: (basemap: BasemapType) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onRecenter: () => void;
  onFitArea: () => void;
  onToggleLayers: () => void;
  isLayersOpen: boolean;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export function MapControls({
  currentBasemap,
  onBasemapChange,
  onZoomIn,
  onZoomOut,
  onRecenter,
  onFitArea,
  onToggleLayers,
  isLayersOpen,
  isFullscreen,
  onToggleFullscreen,
}: MapControlsProps) {
  const basemapOptions: BasemapType[] = ["hybrid", "satellite", "street", "dark", "terrain"];

  return (
    <>
      {/* LEFT VERTICAL TOOLBAR */}
      <div className="absolute top-4 left-4 z-[400] flex flex-col gap-1.5 shadow-xl">
        <div className="bg-navy-950/90 backdrop-blur-md rounded-xl border border-navy-800 p-1 flex flex-col gap-1 shadow-2xl">
          <button
            onClick={onZoomIn}
            title="Zoom In (Building Plinth / CAD view)"
            aria-label="Zoom In"
            className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-300 hover:text-white hover:bg-navy-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={onZoomOut}
            title="Zoom Out (Locality / Village Cadastre)"
            aria-label="Zoom Out"
            className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-300 hover:text-white hover:bg-navy-800 transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <div className="h-px bg-navy-800 my-0.5 mx-1" />
          <button
            onClick={onRecenter}
            title="Recenter to Selected Parcel (Kondalampatti 125/2)"
            aria-label="Recenter"
            className="w-9 h-9 flex items-center justify-center rounded-lg text-emerald-400 hover:text-emerald-300 hover:bg-navy-800 transition-colors"
          >
            <Crosshair className="w-4 h-4" />
          </button>
          <button
            onClick={onFitArea}
            title="Fit Cadastral Sheet (All Surrounding Plots)"
            aria-label="Fit Area"
            className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-300 hover:text-white hover:bg-navy-800 transition-colors"
          >
            <Scan className="w-4 h-4" />
          </button>
          <div className="h-px bg-navy-800 my-0.5 mx-1" />
          <button
            onClick={onToggleLayers}
            title="Toggle GIS Data Layers"
            aria-label="GIS Layers"
            className={cn(
              "w-9 h-9 flex items-center justify-center rounded-lg transition-colors",
              isLayersOpen
                ? "bg-earth-600 text-white shadow-xs"
                : "text-slate-300 hover:text-white hover:bg-navy-800"
            )}
          >
            <Layers className="w-4 h-4" />
          </button>
          <button
            onClick={onToggleFullscreen}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen View"}
            aria-label="Fullscreen"
            className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-300 hover:text-white hover:bg-navy-800 transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* TOP-RIGHT BASEMAP SELECTOR PILL */}
      <div className="absolute top-4 right-4 z-[400]">
        <div className="bg-navy-950/90 backdrop-blur-md rounded-xl border border-navy-800 p-1 flex items-center gap-1 shadow-2xl overflow-x-auto max-w-[calc(100vw-6rem)]">
          {basemapOptions.map((mode) => {
            const config = BASEMAP_CONFIGS[mode];
            const isActive = currentBasemap === mode;
            return (
              <button
                key={mode}
                onClick={() => onBasemapChange(mode)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-all whitespace-nowrap",
                  isActive
                    ? "bg-earth-600 text-white shadow-sm font-semibold"
                    : "text-slate-400 hover:text-slate-200 hover:bg-navy-900"
                )}
              >
                {mode === "satellite" && <Satellite className="w-3.5 h-3.5" />}
                {mode === "hybrid" && <Compass className="w-3.5 h-3.5" />}
                {mode === "street" && <MapIcon className="w-3.5 h-3.5" />}
                {mode === "dark" && <span className="text-xs">🌑</span>}
                {mode === "terrain" && <span className="text-xs">⛰️</span>}
                <span>{config.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
