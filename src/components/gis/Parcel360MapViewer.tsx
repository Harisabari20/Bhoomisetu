"use client";

import React from "react";
import { LandMap } from "@/components/map";

interface Parcel360MapViewerProps {
  className?: string;
  height?: string;
  selectedParcelId?: string;
  selectedConflictId?: number | null;
  onSelectConflict?: (conflictId: string | number) => void;
  onSelectParcel?: (parcelId: string) => void;
  onOpenHouseDimensions?: () => void;
}

export function Parcel360MapViewer({
  className,
  height = "h-[620px]",
  selectedParcelId = "BS-P00125",
  selectedConflictId = null,
  onSelectConflict,
  onSelectParcel,
  onOpenHouseDimensions,
}: Parcel360MapViewerProps) {
  return (
    <LandMap
      selectedParcelId={selectedParcelId}
      selectedConflictId={selectedConflictId}
      onSelectConflict={(id) => onSelectConflict?.(id)}
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
