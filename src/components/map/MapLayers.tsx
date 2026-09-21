"use client";

import React from "react";
import { X, Layers, Check, Eye } from "lucide-react";
import { MapLayerState } from "./mapTypes";
import { cn } from "@/lib/utils";

interface MapLayersProps {
  isOpen: boolean;
  onClose: () => void;
  layers: MapLayerState;
  onToggleLayer: (key: keyof MapLayerState) => void;
  onResetAll?: () => void;
  userRole?: "citizen" | "officer" | "admin";
  subjectParcelSurvey?: string;
}

export function MapLayers({
  isOpen,
  onClose,
  layers,
  onToggleLayer,
  onResetAll,
  userRole = "citizen",
  subjectParcelSurvey = "125/2",
}: MapLayersProps) {
  if (!isOpen) return null;

  const isOfficerOrAdmin = userRole === "officer" || userRole === "admin";

  const layerCategories = [
    {
      title: "Cadastral Boundaries",
      items: [
        {
          key: "subjectParcel" as keyof MapLayerState,
          label: `Subject Parcel (${subjectParcelSurvey})`,
          color: "bg-blue-500",
          desc: "Target registered boundary & survey polygon",
        },
        {
          key: "neighborParcels" as keyof MapLayerState,
          label: "Neighbor Parcels (Adjacent)",
          color: "bg-emerald-500",
          desc: "Adjacent cadastral survey holdings",
        },
        {
          key: "localityParcels" as keyof MapLayerState,
          label: "Wider Locality Plots",
          color: "bg-slate-400",
          desc: "Kondalampatti village cadastre grid",
        },
        {
          key: "surveyMarkers" as keyof MapLayerState,
          label: "Survey Stones (FMB Corner Markers)",
          color: "bg-amber-400",
          desc: "FMB corner boundary stone markers",
        },
        {
          key: "surveyLabels" as keyof MapLayerState,
          label: "Survey Numbers & Names",
          color: "bg-white",
          desc: "Text callouts for survey numbers",
        },
      ],
    },
    {
      title: "Built Environment",
      items: [
        {
          key: "buildingFootprints" as keyof MapLayerState,
          label: "House / Building Footprints",
          color: "bg-slate-700",
          desc: "Footprints (residences, garage, outbuildings)",
        },
        {
          key: "buildingDimensions" as keyof MapLayerState,
          label: "CAD Dimension Callouts",
          color: "bg-indigo-400",
          desc: "Wall lengths & architectural setback lines",
        },
        {
          key: "interHouseBuffer" as keyof MapLayerState,
          label: "Inter-House Separation Buffer",
          color: "bg-teal-400",
          desc: "Statutory separation corridor between structures",
        },
      ],
    },
    {
      title: "Spatial Discrepancies & Natural",
      items: [
        {
          key: "conflicts" as keyof MapLayerState,
          label: "Conflict & Encroachments",
          color: "bg-rose-500",
          desc: "Structure encroachment & boundary overlaps",
        },
        {
          key: "roadCorridor" as keyof MapLayerState,
          label: "Roads & Corridor Setbacks",
          color: "bg-orange-500",
          desc: "Road network & statutory widening corridor",
        },
        {
          key: "waterBodies" as keyof MapLayerState,
          label: "Water Bodies & Drainage",
          color: "bg-cyan-500",
          desc: "Retention lake & stormwater channel",
        },
      ],
    },
    ...(isOfficerOrAdmin
      ? [
          {
            title: "Officer & Settlement Authority Layers",
            items: [
              {
                key: "cadLayer" as keyof MapLayerState,
                label: "CAD Engineering DXF Overlay",
                color: "bg-sky-400",
                desc: "Georeferenced engineering site blueprint",
              },
              {
                key: "zoning" as keyof MapLayerState,
                label: "Town Planning Zoning (LPA)",
                color: "bg-purple-500",
                desc: "Salem LPA Urban Residential & Buffer zoning",
              },
              {
                key: "taxLayer" as keyof MapLayerState,
                label: "Municipal Property Tax Registry",
                color: "bg-emerald-400",
                desc: "SCMC assessment zone & payment clearance",
              },
              {
                key: "encumbrance" as keyof MapLayerState,
                label: "SRO Encumbrance Certificate (EC)",
                color: "bg-amber-500",
                desc: "Sub-Registrar 30-yr encumbrance records",
              },
              {
                key: "infrastructure" as keyof MapLayerState,
                label: "Utility Infrastructure Grids",
                color: "bg-fuchsia-500",
                desc: "TANGEDCO 11kV grid & TWAD water trunk",
              },
            ],
          },
        ]
      : []),
  ];

  return (
    <div className="absolute top-16 left-4 z-[410] w-80 max-h-[calc(100%-5rem)] overflow-y-auto bg-navy-950/95 backdrop-blur-md rounded-2xl border border-navy-800 shadow-2xl p-4 text-white animate-in fade-in slide-in-from-left-2 duration-200">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-navy-800">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-earth-600/30 text-earth-400 flex items-center justify-center">
            <Layers className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
            GIS Layer Stacks
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Layer Groups */}
      <div className="space-y-4 mt-3">
        {layerCategories.map((group) => (
          <div key={group.title} className="space-y-1.5">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
              {group.title}
            </h4>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isEnabled = layers[item.key];
                return (
                  <button
                    key={item.key}
                    onClick={() => onToggleLayer(item.key)}
                    className={cn(
                      "w-full px-2.5 py-2 rounded-xl text-left flex items-start justify-between gap-2 border transition-all",
                      isEnabled
                        ? "bg-navy-900/80 border-navy-700 text-white"
                        : "bg-navy-950/40 border-navy-900/60 text-slate-500 hover:text-slate-300"
                    )}
                  >
                    <div className="flex items-start gap-2.5">
                      <span
                        className={cn(
                          "w-2.5 h-2.5 rounded-full mt-1 shrink-0",
                          item.color,
                          !isEnabled && "opacity-30"
                        )}
                      />
                      <div>
                        <p className="text-xs font-semibold">{item.label}</p>
                        <p className="text-[10px] text-slate-400 leading-tight mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <div
                      className={cn(
                        "w-4 h-4 rounded mt-0.5 flex items-center justify-center text-xs transition-colors shrink-0",
                        isEnabled
                          ? "bg-earth-600 text-white"
                          : "border border-navy-700 text-transparent"
                      )}
                    >
                      {isEnabled && <Check className="w-3 h-3" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
