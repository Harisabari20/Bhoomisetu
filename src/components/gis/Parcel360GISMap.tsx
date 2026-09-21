"use client";

import React from "react";
import { LandMap } from "@/components/map";
import { DemoParcel, DemoNeighborParcel, DemoStructure, DemoConflict } from "@/data/demoParcel";
import { ParcelLayersConfig } from "@/types/parcel";

export interface Parcel360GISMapProps {
  parcel?: DemoParcel;
  neighboringParcels?: DemoNeighborParcel[];
  structures?: DemoStructure[];
  conflicts?: DemoConflict[];
  layers?: ParcelLayersConfig;
  selectedConflictId?: number | null;
  onSelectConflict?: (conflictId: number) => void;
  onSelectParcel?: (parcelId: string) => void;
  onOpenHouseDimensions?: () => void;
  className?: string;
  height?: string;
}

export function Parcel360GISMap({
  parcel,
  selectedConflictId,
  onSelectConflict,
  onSelectParcel,
  onOpenHouseDimensions,
  className,
  height = "h-[640px]",
}: Parcel360GISMapProps) {
  return (
    <LandMap
      selectedParcelId={parcel?.id || "BS-P00125"}
      selectedConflictId={selectedConflictId}
      onSelectConflict={onSelectConflict}
      onSelectParcel={onSelectParcel}
      onOpenHouseDimensions={onOpenHouseDimensions}
      className={className}
      height={height}
      showSearch={true}
      showControls={true}
      showLayersToggle={true}
      showLegend={true}
      showInspectorCard={true}
    />
  );
}
