import type { Map as LeafletMap, LayerGroup } from "leaflet";
import {
  GIS_ROADS,
  GIS_WATER_BODIES,
  GIS_UTILITIES,
} from "@/data/gis/infrastructureData";
import { GIS_PARCELS } from "@/data/gis/parcelsData";
import { GIS_BUILDINGS } from "@/data/gis/buildingsData";
import {
  polygonIntersection,
  computePolygonAreaSqMeters,
} from "@/lib/gisEngine";
import { DEMO_CONFLICTS, DemoConflict } from "@/data/demoParcel";
import { MAP_PALETTE } from "./mapConfig";
import { MapLayerState, SelectedMapEntity } from "./mapTypes";

interface RenderConflictLayersParams {
  L: any;
  map: LeafletMap;
  layerGroup: LayerGroup;
  layers: MapLayerState;
  selectedConflictId?: number | null;
  onSelectConflict?: (conflictId: number) => void;
  onSelectEntity: (entity: SelectedMapEntity) => void;
  selectedParcelId?: string;
}

export function renderConflictLayers({
  L,
  map,
  layerGroup,
  layers,
  selectedConflictId,
  onSelectConflict,
  onSelectEntity,
  selectedParcelId = "BS-P00125",
}: RenderConflictLayersParams) {
  // 1. ROADS LAYER
  if (layers.roadCorridor) {
    GIS_ROADS.forEach((road) => {
      // Road corridor polygon if available
      if (road.corridorPolygon) {
        const poly = L.polygon(road.corridorPolygon, {
          color: road.type === "expressway" ? MAP_PALETTE.roadExpressway.stroke : MAP_PALETTE.roadArterial.stroke,
          weight: 1.5,
          fillColor: road.type === "expressway" ? "#F97316" : "#FB923C",
          fillOpacity: 0.18,
        });
        poly.on("click", (e: any) => {
          L.DomEvent.stopPropagation(e);
          onSelectEntity({ type: "road", id: road.id, data: road });
        });
        layerGroup.addLayer(poly);
      }

      // Centerline
      const line = L.polyline(road.centerline, {
        color: road.type === "expressway" ? MAP_PALETTE.roadExpressway.stroke : MAP_PALETTE.roadArterial.stroke,
        weight: road.type === "expressway" ? 5 : 3.5,
      });
      line.on("click", (e: any) => {
        L.DomEvent.stopPropagation(e);
        onSelectEntity({ type: "road", id: road.id, data: road });
      });
      layerGroup.addLayer(line);

      // Road Name Marker
      const midPoint = road.centerline[Math.floor(road.centerline.length / 2)];
      const roadLabel = L.divIcon({
        className: "custom-road-label",
        html: `<div style="padding: 1px 6px; border-radius: 4px; background: rgba(194,65,12,0.9); font-family: monospace; font-size: 8.5px; color: #fff; font-weight: bold; pointer-events: none; white-space: nowrap; box-shadow: 0 2px 6px rgba(0,0,0,0.5);">
          🛣️ ${road.name}
        </div>`,
        iconSize: [160, 18],
        iconAnchor: [80, 9],
      });
      layerGroup.addLayer(L.marker(midPoint, { icon: roadLabel, interactive: false }));
    });
  }

  // 2. WATER BODIES LAYER
  if (layers.waterBodies) {
    GIS_WATER_BODIES.forEach((water) => {
      const poly = L.polygon(water.polygon, {
        color: MAP_PALETTE.waterBody.stroke,
        weight: MAP_PALETTE.waterBody.weight,
        fillColor: MAP_PALETTE.waterBody.fill,
        fillOpacity: MAP_PALETTE.waterBody.fillOpacity,
      });
      poly.on("click", (e: any) => {
        L.DomEvent.stopPropagation(e);
        onSelectEntity({ type: "water", id: water.id, data: water });
      });
      layerGroup.addLayer(poly);

      const waterLabel = L.divIcon({
        className: "custom-water-label",
        html: `<div style="padding: 2px 7px; border-radius: 6px; background: rgba(2,132,199,0.85); font-family: monospace; font-size: 9px; color: #fff; font-weight: bold; pointer-events: none; white-space: nowrap;">
          💧 ${water.name}
        </div>`,
        iconSize: [160, 20],
        iconAnchor: [80, 10],
      });
      layerGroup.addLayer(L.marker(water.polygon[0], { icon: waterLabel, interactive: false }));
    });
  }

  // 3. INFRASTRUCTURE & UTILITIES LAYER
  if (layers.infrastructure) {
    GIS_UTILITIES.forEach((util) => {
      const line = L.polyline(util.polyline, {
        color: MAP_PALETTE.infrastructure.stroke,
        weight: MAP_PALETTE.infrastructure.weight,
        dashArray: MAP_PALETTE.infrastructure.dashArray,
      });
      layerGroup.addLayer(line);

      const utilLabel = L.divIcon({
        className: "custom-util-label",
        html: `<div style="padding: 1px 5px; border-radius: 3px; background: rgba(147,51,234,0.9); font-family: monospace; font-size: 8px; color: #fff; font-weight: bold; pointer-events: none; white-space: nowrap;">
          ⚡ ${util.name}
        </div>`,
        iconSize: [130, 16],
        iconAnchor: [65, 8],
      });
      layerGroup.addLayer(L.marker(util.polyline[1] || util.polyline[0], { icon: utilLabel, interactive: false }));
    });
  }

  // 4. SPATIAL CONFLICT OVERLAYS & NUMBERED MARKERS
  if (!layers.conflicts) return;

  // ---------------------------------------------------------------------------
  // CONFLICT ①: BOUNDARY OVERLAP (32 sq m)
  // ---------------------------------------------------------------------------
  const conflict1 = DEMO_CONFLICTS.find((c) => c.id === 1);
  if (conflict1) {
    const isSelected1 = selectedConflictId === 1;
    const poly1 = L.polygon(
      [
        [11.62388, 78.13590],
        [11.62388, 78.13625],
        [11.62383, 78.13625],
        [11.62383, 78.13590],
      ],
      {
        color: isSelected1 ? "#EA580C" : MAP_PALETTE.overlapConflict.stroke,
        weight: isSelected1 ? 3 : MAP_PALETTE.overlapConflict.weight,
        fillColor: MAP_PALETTE.overlapConflict.fill,
        fillOpacity: isSelected1 ? 0.7 : MAP_PALETTE.overlapConflict.fillOpacity,
        dashArray: "3, 3",
      }
    );

    poly1.on("click", (e: any) => {
      L.DomEvent.stopPropagation(e);
      onSelectConflict?.(1);
      onSelectEntity({ type: "conflict", id: 1, data: conflict1 });
    });
    layerGroup.addLayer(poly1);

    // Numbered Pin ①
    const pin1Icon = L.divIcon({
      className: "conflict-pin-1",
      html: `<div style="position: relative; cursor: pointer;">
        <div style="width: 28px; height: 28px; border-radius: 50%; background: #ea580c; border: 2.5px solid #ffffff; display: flex; align-items: center; justify-content: center; font-family: monospace; font-size: 13px; font-weight: 900; color: #ffffff; box-shadow: 0 4px 14px rgba(234,88,12,0.6); animation: ${isSelected1 ? 'pulse 1.5s infinite' : 'none'};">
          1
        </div>
        <div style="position: absolute; top: -28px; left: 50%; transform: translateX(-50%); padding: 2px 7px; border-radius: 5px; background: rgba(15,23,42,0.92); border: 1px solid #ea580c; font-family: monospace; font-size: 9px; font-weight: bold; color: #fed7aa; white-space: nowrap; pointer-events: none; box-shadow: 0 4px 10px rgba(0,0,0,0.5);">
          ① Boundary Overlap (32 m²)
        </div>
      </div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });

    const marker1 = L.marker([11.62385, 78.13608], { icon: pin1Icon });
    marker1.on("click", (e: any) => {
      L.DomEvent.stopPropagation(e);
      onSelectConflict?.(1);
      onSelectEntity({ type: "conflict", id: 1, data: conflict1 });
    });
    layerGroup.addLayer(marker1);
  }

  // ---------------------------------------------------------------------------
  // CONFLICT ②: STRUCTURE ENCROACHMENT (8.5 sq m) — COMPUTED SPATIAL INTERSECTION
  // ---------------------------------------------------------------------------
  const conflict2 = DEMO_CONFLICTS.find((c) => c.id === 2);
  if (conflict2) {
    const isSelected2 = selectedConflictId === 2;

    // A. Dynamically derive the exact encroaching slice using Sutherland-Hodgman polygon clipping
    const targetParcel = GIS_PARCELS["BS-P00125"];
    const outbuilding = GIS_BUILDINGS.find((b) => b.id === "BLD-127-02");
    let encroachingLatLngs: [number, number][] = [
      [11.623737, 78.136641],
      [11.623737, 78.136650], // Cadastral boundary line
      [11.623660, 78.136650],
      [11.623660, 78.136641],
    ];
    let encroachingAreaSqM = 8.5;

    if (targetParcel && outbuilding) {
      const clipped = polygonIntersection(
        outbuilding.geometry.coordinates[0],
        targetParcel.geometry.coordinates[0]
      );
      if (clipped.length >= 3) {
        encroachingLatLngs = clipped.map(([lng, lat]) => [lat, lng] as [number, number]);
        encroachingAreaSqM = Math.round(computePolygonAreaSqMeters(clipped) * 10) / 10;
      }
    }

    // Render encroaching portion crossing eastern boundary in RED
    const encroachingSlicePoly = L.polygon(encroachingLatLngs, {
      color: MAP_PALETTE.encroachmentSlice.stroke,
      weight: isSelected2 ? 3.5 : MAP_PALETTE.encroachmentSlice.weight,
      fillColor: MAP_PALETTE.encroachmentSlice.fill,
      fillOpacity: isSelected2 ? 0.75 : MAP_PALETTE.encroachmentSlice.fillOpacity,
    });

    encroachingSlicePoly.on("click", (e: any) => {
      L.DomEvent.stopPropagation(e);
      onSelectConflict?.(2);
      onSelectEntity({ type: "conflict", id: 2, data: conflict2 });
    });
    layerGroup.addLayer(encroachingSlicePoly);

    // B. Official cadastral boundary line segment cutting through the structure
    const cuttingBoundaryLine = L.polyline(
      [
        [11.62382, 78.13665],
        [11.62358, 78.13665],
      ],
      {
        color: MAP_PALETTE.officialCuttingLine.stroke,
        weight: MAP_PALETTE.officialCuttingLine.weight,
        dashArray: MAP_PALETTE.officialCuttingLine.dashArray,
      }
    );
    layerGroup.addLayer(cuttingBoundaryLine);

    // C. Numbered Pin ② and required status labels:
    // - Structure Encroachment
    // - 8.5 sq m affected
    // - Potential Inconsistency
    // - Requires Officer Verification
    const pin2Icon = L.divIcon({
      className: "conflict-pin-2",
      html: `<div style="position: relative; cursor: pointer;">
        <div style="width: 32px; height: 32px; border-radius: 50%; background: #dc2626; border: 3px solid #ffffff; display: flex; align-items: center; justify-content: center; font-family: monospace; font-size: 14px; font-weight: 900; color: #ffffff; box-shadow: 0 4px 16px rgba(220,38,38,0.7); animation: ${isSelected2 ? 'pulse 1.5s infinite' : 'none'};">
          2
        </div>
        <div style="position: absolute; top: -48px; left: 50%; transform: translateX(-50%); padding: 3px 8px; border-radius: 6px; background: rgba(15,23,42,0.96); border: 1.5px solid #dc2626; font-family: monospace; font-size: 9px; font-weight: bold; color: #fecaca; white-space: nowrap; pointer-events: none; box-shadow: 0 6px 14px rgba(0,0,0,0.6); text-align: center;">
          <span style="color: #ffffff; font-weight: 800;">② Structure Encroachment</span><br/>
          <span style="color: #f87171; font-size: 8.5px;">${encroachingAreaSqM} sq m affected • Potential Inconsistency</span>
        </div>
      </div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    const marker2 = L.marker([11.62370, 78.13663], { icon: pin2Icon });
    marker2.on("click", (e: any) => {
      L.DomEvent.stopPropagation(e);
      onSelectConflict?.(2);
      onSelectEntity({ type: "conflict", id: 2, data: conflict2 });
    });
    layerGroup.addLayer(marker2);
  }

  // ---------------------------------------------------------------------------
  // CONFLICT ③: AREA MISMATCH / ROAD SETBACK (0.13 Acres / 526 m²)
  // ---------------------------------------------------------------------------
  const conflict3 = DEMO_CONFLICTS.find((c) => c.id === 3);
  if (conflict3) {
    const isSelected3 = selectedConflictId === 3;
    const poly3 = L.polygon(
      [
        [11.62306, 78.13575],
        [11.62306, 78.13665],
        [11.62300, 78.13665],
        [11.62300, 78.13575],
      ],
      {
        color: isSelected3 ? "#D97706" : MAP_PALETTE.roadSetbackConflict.stroke,
        weight: isSelected3 ? 3 : MAP_PALETTE.roadSetbackConflict.weight,
        fillColor: MAP_PALETTE.roadSetbackConflict.fill,
        fillOpacity: isSelected3 ? 0.65 : MAP_PALETTE.roadSetbackConflict.fillOpacity,
        dashArray: "4, 3",
      }
    );

    poly3.on("click", (e: any) => {
      L.DomEvent.stopPropagation(e);
      onSelectConflict?.(3);
      onSelectEntity({ type: "conflict", id: 3, data: conflict3 });
    });
    layerGroup.addLayer(poly3);

    // Numbered Pin ③
    const pin3Icon = L.divIcon({
      className: "conflict-pin-3",
      html: `<div style="position: relative; cursor: pointer;">
        <div style="width: 28px; height: 28px; border-radius: 50%; background: #d97706; border: 2.5px solid #ffffff; display: flex; align-items: center; justify-content: center; font-family: monospace; font-size: 13px; font-weight: 900; color: #ffffff; box-shadow: 0 4px 14px rgba(217,119,6,0.6); animation: ${isSelected3 ? 'pulse 1.5s infinite' : 'none'};">
          3
        </div>
        <div style="position: absolute; top: -30px; left: 50%; transform: translateX(-50%); padding: 2px 7px; border-radius: 5px; background: rgba(15,23,42,0.92); border: 1px solid #d97706; font-family: monospace; font-size: 9px; font-weight: bold; color: #fef3c7; white-space: nowrap; pointer-events: none; box-shadow: 0 4px 10px rgba(0,0,0,0.5);">
          ③ Road Setback Reserve (0.13 ac)
        </div>
      </div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });

    const marker3 = L.marker([11.62303, 78.13620], { icon: pin3Icon });
    marker3.on("click", (e: any) => {
      L.DomEvent.stopPropagation(e);
      onSelectConflict?.(3);
      onSelectEntity({ type: "conflict", id: 3, data: conflict3 });
    });
    layerGroup.addLayer(marker3);
  }
}
