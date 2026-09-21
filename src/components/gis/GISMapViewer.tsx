"use client";

import React from "react";
import { LandMap } from "@/components/map";

export interface GISMapViewerProps {
  selectedParcelId?: string;
  onParcelSelect?: (parcelId: string) => void;
  highlightDiscrepancy?: boolean;
  className?: string;
  showLayersControl?: boolean;
  showInspectorCard?: boolean;
  height?: string;
  interactive?: boolean;
}

export function GISMapViewer({
  selectedParcelId = "BS-P00125",
  onParcelSelect,
  highlightDiscrepancy = false,
  className,
  showLayersControl = true,
  showInspectorCard = true,
  height = "h-[500px]",
  interactive = true,
}: GISMapViewerProps) {
  return (
    <LandMap
      selectedParcelId={selectedParcelId}
      selectedConflictId={highlightDiscrepancy ? 2 : null}
      onSelectParcel={onParcelSelect}
      className={className}
      height={height}
      interactive={interactive}
      showLayersToggle={showLayersControl}
      showInspectorCard={showInspectorCard}
      showSearch={true}
      showControls={true}
      showLegend={true}
    />
  );
}
