"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  BasemapType,
  MapLayerState,
  MapTelemetry,
  SelectedMapEntity,
  LandMapProps,
} from "./mapTypes";
import {
  CADASTRAL_CENTER,
  DEFAULT_MAP_LAYERS,
  BASEMAP_CONFIGS,
  MAP_ZOOM_TIERS,
} from "./mapConfig";
import { MapControls } from "./MapControls";
import { MapLayers } from "./MapLayers";
import { MapLegend } from "./MapLegend";
import { MapSearch } from "./MapSearch";
import { renderParcelLayers } from "./ParcelLayer";
import { renderBuildingLayers } from "./BuildingLayer";
import { renderConflictLayers } from "./ConflictLayer";
import { GIS_PARCELS } from "@/data/gis/parcelsData";
import { DEMO_PARCEL, DEMO_CONFLICTS, DemoConflict } from "@/data/demoParcel";
import {
  X,
  AlertTriangle,
  Building,
  MapPin,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Compass,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function LandMap({
  selectedParcelId = "BS-P00125",
  selectedConflictId = null,
  onSelectConflict,
  onSelectParcel,
  onOpenHouseDimensions,
  height = "h-[640px]",
  className,
  interactive = true,
  showSearch = true,
  showControls = true,
  showLayersToggle = true,
  showLegend = true,
  showInspectorCard = true,
  initialBasemap = "hybrid",
  initialZoom = 18,
  customCenter,
  userRole = "citizen",
  cadGeoreferenced = true,
}: LandMapProps) {
  const activeParcel = GIS_PARCELS[selectedParcelId] || GIS_PARCELS["BS-P00125"];

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapWrapperRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const leafletModuleRef = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);
  const parcelsGroupRef = useRef<any>(null);
  const buildingsGroupRef = useRef<any>(null);
  const conflictsGroupRef = useRef<any>(null);

  const [basemap, setBasemap] = useState<BasemapType>(initialBasemap);
  const [layers, setLayers] = useState<MapLayerState>(DEFAULT_MAP_LAYERS);
  const [isLayersOpen, setIsLayersOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<SelectedMapEntity>(null);
  const [cursorCoords, setCursorCoords] = useState<{ lat: number; lng: number } | null>(null);

  const [telemetry, setTelemetry] = useState<MapTelemetry>({
    lat: customCenter ? customCenter[0] : (activeParcel ? activeParcel.centroid[0] : CADASTRAL_CENTER[0]),
    lng: customCenter ? customCenter[1] : (activeParcel ? activeParcel.centroid[1] : CADASTRAL_CENTER[1]),
    zoom: initialZoom,
    elevation: 286,
    satellitePassDate: "18 Sep 2026",
  });

  // Automatically fly to parcel when selectedParcelId changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !activeParcel) return;
    map.flyTo(activeParcel.centroid, 18, { duration: 1.0 });
  }, [selectedParcelId]);

  // Layer toggler
  const handleToggleLayer = (key: keyof MapLayerState) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // 1. INITIALIZE LEAFLET MAP
  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (!mapContainerRef.current || mapInstanceRef.current) return;

      const L = (await import("leaflet")).default;
      leafletModuleRef.current = L;

      if (!isMounted || !mapContainerRef.current) return;

      const startCenter = customCenter || CADASTRAL_CENTER;

      const map = L.map(mapContainerRef.current, {
        center: startCenter,
        zoom: initialZoom,
        minZoom: MAP_ZOOM_TIERS.MIN,
        maxZoom: MAP_ZOOM_TIERS.MAX,
        zoomControl: false,
        attributionControl: false,
        dragging: interactive,
        scrollWheelZoom: interactive,
        touchZoom: interactive,
        doubleClickZoom: interactive,
      });

      mapInstanceRef.current = map;

      // Base Tile Layer
      const baseConfig = BASEMAP_CONFIGS[basemap];
      tileLayerRef.current = L.tileLayer(baseConfig.url, {
        attribution: baseConfig.attribution,
        maxZoom: baseConfig.maxZoom,
        subdomains: baseConfig.subdomains || "abc",
      }).addTo(map);

      // Layer Groups
      parcelsGroupRef.current = L.layerGroup().addTo(map);
      buildingsGroupRef.current = L.layerGroup().addTo(map);
      conflictsGroupRef.current = L.layerGroup().addTo(map);

      // Telemetry & cursor listeners
      map.on("mousemove", (e: any) => {
        setCursorCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
      });

      map.on("zoomend", () => {
        setTelemetry((prev) => ({ ...prev, zoom: map.getZoom() }));
      });

      map.on("moveend", () => {
        const center = map.getCenter();
        setTelemetry((prev) => ({
          ...prev,
          lat: center.lat,
          lng: center.lng,
          zoom: map.getZoom(),
        }));
      });

      // Render initial layers
      refreshAllLayers(L, map);

      // Invalidate size to ensure crisp rendering
      setTimeout(() => {
        if (map) map.invalidateSize();
      }, 200);
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // 2. BASEMAP SWITCHER
  useEffect(() => {
    const map = mapInstanceRef.current;
    const L = leafletModuleRef.current;
    if (!map || !L) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    const config = BASEMAP_CONFIGS[basemap];
    tileLayerRef.current = L.tileLayer(config.url, {
      attribution: config.attribution,
      maxZoom: config.maxZoom,
      subdomains: config.subdomains || "abc",
    }).addTo(map);

    // Keep base tile behind vector layers
    tileLayerRef.current.bringToBack();
  }, [basemap]);

  // 3. LAYER REFRESH FUNCTION
  const refreshAllLayers = useCallback((L: any, map: any) => {
    if (!L || !map) return;

    // Clear existing
    if (parcelsGroupRef.current) parcelsGroupRef.current.clearLayers();
    if (buildingsGroupRef.current) buildingsGroupRef.current.clearLayers();
    if (conflictsGroupRef.current) conflictsGroupRef.current.clearLayers();

    // Render 1: Parcels
    renderParcelLayers({
      L,
      map,
      layerGroup: parcelsGroupRef.current,
      layers,
      selectedParcelId,
      onSelectEntity: (entity) => {
        setSelectedEntity(entity);
        if (entity && entity.type === "parcel" && onSelectParcel) {
          onSelectParcel(entity.id);
        }
      },
    });

    // Render 2: Buildings (Footprint underneath)
    renderBuildingLayers({
      L,
      map,
      layerGroup: buildingsGroupRef.current,
      layers,
      onSelectEntity: (entity) => {
        setSelectedEntity(entity);
      },
      onOpenHouseDimensions,
      cadGeoreferenced,
    });

    // Render 3: Conflicts & Encroachments
    renderConflictLayers({
      L,
      map,
      layerGroup: conflictsGroupRef.current,
      layers,
      selectedConflictId,
      onSelectConflict: (id) => {
        onSelectConflict?.(id);
      },
      onSelectEntity: (entity) => {
        setSelectedEntity(entity);
      },
      selectedParcelId,
    });
  }, [layers, selectedParcelId, selectedConflictId, onSelectConflict, onSelectParcel, onOpenHouseDimensions, cadGeoreferenced]);

  // Refresh whenever dependencies change
  useEffect(() => {
    const map = mapInstanceRef.current;
    const L = leafletModuleRef.current;
    if (map && L) {
      refreshAllLayers(L, map);
    }
  }, [refreshAllLayers]);

  // 4. EXTERNAL CONFLICT FOCUS FLY-TO
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || selectedConflictId === null || selectedConflictId === undefined) return;

    const conflict = DEMO_CONFLICTS.find((c) => c.id === selectedConflictId);
    if (conflict) {
      map.flyTo(conflict.centerPoint, 19.5, { duration: 1.2 });
      setSelectedEntity({ type: "conflict", id: conflict.id, data: conflict });
    }
  }, [selectedConflictId]);

  // 5. RESIZE OBSERVER
  useEffect(() => {
    if (!mapContainerRef.current) return;
    const observer = new ResizeObserver(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    });
    observer.observe(mapContainerRef.current);
    return () => observer.disconnect();
  }, []);

  // 6. MAP CONTROL HANDLERS
  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  const handleRecenter = () => {
    const target = activeParcel ? activeParcel.centroid : CADASTRAL_CENTER;
    mapInstanceRef.current?.flyTo(target, 18, { duration: 1.0 });
  };

  const handleFitArea = () => {
    const L = leafletModuleRef.current;
    const map = mapInstanceRef.current;
    if (!L || !map) return;
    if (activeParcel) {
      const latLngs = activeParcel.geometry.coordinates[0].map(([lng, lat]) => [lat, lng] as [number, number]);
      const bounds = L.latLngBounds(latLngs);
      map.flyToBounds(bounds, { duration: 1.2, padding: [60, 60] });
    } else {
      map.flyToBounds(
        [
          [11.6220, 78.1345],
          [11.6255, 78.1385],
        ],
        { duration: 1.2, padding: [40, 40] }
      );
    }
  };

  const handleFlyTo = (coords: [number, number], zoom = 19) => {
    mapInstanceRef.current?.flyTo(coords, zoom, { duration: 1.2 });
  };

  const handleToggleFullscreen = () => {
    if (!mapWrapperRef.current) return;
    if (!document.fullscreenElement) {
      mapWrapperRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      setTimeout(() => mapInstanceRef.current?.invalidateSize(), 150);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  return (
    <div
      ref={mapWrapperRef}
      className={cn(
        "relative rounded-2xl overflow-hidden border border-slate-200 bg-[#070D1E] shadow-2xl transition-all select-none",
        height,
        className
      )}
    >
      {/* MAP CANVAS */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* TOP SEARCH BAR */}
      {showSearch && (
        <MapSearch
          onFlyTo={handleFlyTo}
          onSelectParcel={onSelectParcel}
          onSelectConflict={onSelectConflict}
        />
      )}

      {/* MAP CONTROLS & BASEMAP SWITCHER */}
      {showControls && (
        <MapControls
          currentBasemap={basemap}
          onBasemapChange={setBasemap}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onRecenter={handleRecenter}
          onFitArea={handleFitArea}
          onToggleLayers={() => setIsLayersOpen(!isLayersOpen)}
          isLayersOpen={isLayersOpen}
          isFullscreen={isFullscreen}
          onToggleFullscreen={handleToggleFullscreen}
        />
      )}

      {/* LAYERS TOGGLE PANEL */}
      {showLayersToggle && (
        <MapLayers
          isOpen={isLayersOpen}
          onClose={() => setIsLayersOpen(false)}
          layers={layers}
          onToggleLayer={handleToggleLayer}
          userRole={userRole}
          subjectParcelSurvey={activeParcel?.surveyNumber || "125/2"}
        />
      )}

      {/* INSPECTOR OVERLAY CARD (INTERACTIVE CLICK RESULT) */}
      {showInspectorCard && selectedEntity && (
        <div className="absolute top-16 right-4 z-[410] w-80 bg-navy-950/95 backdrop-blur-md rounded-2xl border border-navy-800 shadow-2xl p-4 text-white animate-in fade-in slide-in-from-right-2 duration-200">
          <div className="flex items-start justify-between pb-3 border-b border-navy-800">
            <div className="flex items-center gap-2">
              {selectedEntity.type === "conflict" ? (
                <div className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4" />
                </div>
              ) : selectedEntity.type === "building" ? (
                <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <Building className="w-4 h-4" />
                </div>
              ) : (
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
              )}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                  {selectedEntity.type.toUpperCase()} INSPECTOR
                </span>
                <h4 className="text-xs font-bold text-white font-mono">
                  {selectedEntity.type === "conflict"
                    ? `Conflict #${selectedEntity.id}: ${(selectedEntity.data as DemoConflict).title}`
                    : selectedEntity.type === "building"
                    ? selectedEntity.data.name
                    : selectedEntity.type === "parcel"
                    ? `Survey ${selectedEntity.data.surveyNumber} (${selectedEntity.id})`
                    : selectedEntity.id}
                </h4>
              </div>
            </div>
            <button
              onClick={() => setSelectedEntity(null)}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-navy-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3 space-y-2 text-xs">
            {selectedEntity.type === "conflict" && (
              <>
                <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-rose-300 font-semibold">Affected Extent:</span>
                    <span className="font-bold text-white">
                      {(selectedEntity.data as DemoConflict).area} {(selectedEntity.data as DemoConflict).unit}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-rose-300 font-semibold">Severity:</span>
                    <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-200 text-[10px] font-bold">
                      {(selectedEntity.data as DemoConflict).severity}
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                  {(selectedEntity.data as DemoConflict).description}
                </p>
                <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>Confidence: {(selectedEntity.data as DemoConflict).confidence}%</span>
                  <span className="text-amber-400">{(selectedEntity.data as DemoConflict).status}</span>
                </div>
              </>
            )}

            {selectedEntity.type === "building" && (
              <>
                <div className="p-2.5 rounded-xl bg-navy-900/80 border border-navy-800 space-y-1 text-[11px] font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Dimensions:</span>
                    <span className="text-white font-bold">{selectedEntity.data.dimensions}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Plinth Area:</span>
                    <span className="text-white font-bold">{selectedEntity.data.areaSqMeters} m²</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Parcel ID:</span>
                    <span className="text-earth-400 font-bold">{selectedEntity.data.parcelId}</span>
                  </div>
                </div>
                {selectedEntity.data.isEncroaching && (
                  <div className="p-2 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-200 text-[11px] leading-tight">
                    ⚠️ Encroaches {selectedEntity.data.encroachmentAreaSqM} m² into adjacent parcel BS-P00125.
                  </div>
                )}
                {onOpenHouseDimensions && selectedEntity.data.id === "B-01" && (
                  <button
                    onClick={onOpenHouseDimensions}
                    className="w-full mt-1 px-3 py-1.5 rounded-lg bg-earth-600 hover:bg-earth-500 text-white font-mono text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>View Architectural Blueprints</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </>
            )}

            {selectedEntity.type === "parcel" && (
              <>
                <div className="p-2.5 rounded-xl bg-navy-900/80 border border-navy-800 space-y-1 text-[11px] font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Survey No:</span>
                    <span className="text-white font-bold">{selectedEntity.data.surveyNumber}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Owner:</span>
                    <span className="text-white font-bold">{selectedEntity.data.owner}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Total Area:</span>
                    <span className="text-emerald-400 font-bold">
                      {selectedEntity.data.area} {selectedEntity.data.areaUnit}
                    </span>
                  </div>
                </div>
              </>
            )}

            {selectedEntity.type === "marker" && (
              <div className="p-2.5 rounded-xl bg-navy-900/80 border border-navy-800 space-y-1 text-[11px] font-mono">
                <p className="text-white font-bold">{selectedEntity.name}</p>
                <p className="text-[11px] text-slate-300">{selectedEntity.desc}</p>
                <p className="text-[10px] text-earth-400">
                  {selectedEntity.coord[0].toFixed(5)}° N, {selectedEntity.coord[1].toFixed(5)}° E
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* BOTTOM LEGEND & TELEMETRY */}
      {showLegend && (
        <MapLegend
          telemetry={telemetry}
          cursorCoords={cursorCoords}
        />
      )}
    </div>
  );
}
