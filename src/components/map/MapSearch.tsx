"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, X, MapPin, AlertTriangle, Building } from "lucide-react";
import {
  DEMO_PARCEL,
  DEMO_NEIGHBORING_PARCELS,
  DEMO_LOCALITY_PARCELS,
  DEMO_CONFLICTS,
  DEMO_STRUCTURES,
} from "@/data/demoParcel";
import { cn } from "@/lib/utils";

interface MapSearchProps {
  onFlyTo: (coords: [number, number], zoom?: number) => void;
  onSelectParcel?: (parcelId: string) => void;
  onSelectConflict?: (conflictId: number) => void;
  className?: string;
}

export function MapSearch({
  onFlyTo,
  onSelectParcel,
  onSelectConflict,
  className,
}: MapSearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const allSearchItems = [
    // Subject Parcel
    {
      id: DEMO_PARCEL.id,
      title: `Survey ${DEMO_PARCEL.surveyNumber} • Target Parcel`,
      subtitle: `${DEMO_PARCEL.owner} (2.00 ac) • Kondalampatti`,
      type: "parcel" as const,
      coords: [11.6234, 78.1362] as [number, number],
      zoom: 18.5,
      parcelId: DEMO_PARCEL.id,
    },
    // Neighbor Parcels
    ...DEMO_NEIGHBORING_PARCELS.map((p) => ({
      id: p.id,
      title: `Survey ${p.surveyNumber} (${p.id})`,
      subtitle: `${p.owner} • ${p.area} ${p.areaUnit}`,
      type: "parcel" as const,
      coords: p.labelCoord,
      zoom: 18.5,
      parcelId: p.id,
    })),
    // Locality Parcels
    ...DEMO_LOCALITY_PARCELS.map((p) => ({
      id: p.id,
      title: `Survey ${p.surveyNumber} (${p.owner})`,
      subtitle: `Kondalampatti Sheet Grid • ${p.area} ${p.areaUnit}`,
      type: "locality" as const,
      coords: p.labelCoord,
      zoom: 16.5,
      parcelId: p.id,
    })),
    // Conflicts
    ...DEMO_CONFLICTS.map((c) => ({
      id: `conflict-${c.id}`,
      title: `Conflict #${c.id}: ${c.title}`,
      subtitle: `${c.area} ${c.unit} • ${c.severity} Severity`,
      type: "conflict" as const,
      coords: c.centerPoint,
      zoom: 19.5,
      conflictId: c.id,
    })),
    // Structures
    {
      id: "structure-B01",
      title: "Building B-01 (Main Residence)",
      subtitle: "36.5m × 25.9m (946 m² Plinth)",
      type: "structure" as const,
      coords: [11.62350, 78.13617] as [number, number],
      zoom: 20,
    },
    {
      id: "structure-B03",
      title: "Building B-03 (K. Selvam Outbuilding)",
      subtitle: "8.5 sq m Encroaching Slice into 125/2",
      type: "conflict" as const,
      coords: [11.62370, 78.13663] as [number, number],
      zoom: 20,
      conflictId: 2,
    },
  ];

  const filtered = query.trim()
    ? allSearchItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSelect = (item: (typeof allSearchItems)[0]) => {
    onFlyTo(item.coords, item.zoom);
    if ("parcelId" in item && item.parcelId && onSelectParcel) {
      onSelectParcel(item.parcelId);
    }
    if ("conflictId" in item && item.conflictId && onSelectConflict) {
      onSelectConflict(item.conflictId);
    }
    setQuery("");
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={cn("absolute top-4 left-1/2 -translate-x-1/2 z-[400] w-full max-w-sm px-4", className)}
    >
      <div className="relative">
        <div className="flex items-center bg-navy-950/90 backdrop-blur-md rounded-xl border border-navy-800 shadow-2xl px-3 py-2 text-white">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Search Survey #, Owner, Conflict, Plot..."
            className="w-full bg-transparent px-2 text-xs font-mono text-white placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                setIsOpen(false);
              }}
              className="text-slate-400 hover:text-white p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {isOpen && filtered.length > 0 && (
          <div className="absolute top-full left-4 right-4 mt-1.5 bg-navy-950/95 backdrop-blur-md rounded-xl border border-navy-800 shadow-2xl overflow-hidden max-h-60 overflow-y-auto">
            {filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item)}
                className="w-full px-3 py-2 text-left hover:bg-navy-900 border-b border-navy-900/60 last:border-0 flex items-start gap-2.5 transition-colors"
              >
                <div className="mt-0.5">
                  {item.type === "conflict" ? (
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                  ) : item.type === "structure" ? (
                    <Building className="w-3.5 h-3.5 text-blue-400" />
                  ) : (
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                </div>
                <div>
                  <p className="text-xs font-mono font-semibold text-white">{item.title}</p>
                  <p className="text-[10px] text-slate-400 font-sans">{item.subtitle}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
