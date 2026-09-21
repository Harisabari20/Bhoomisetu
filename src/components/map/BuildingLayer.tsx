import type { Map as LeafletMap, LayerGroup } from "leaflet";
import { GIS_BUILDINGS, GISBuilding } from "@/data/gis/buildingsData";
import {
  transformCADToWGS84,
  SAMPLE_CAD_VILLA,
  DEFAULT_CAD_DATUM_KONDALAMPATTI,
} from "@/lib/cadTransformer";
import { MAP_PALETTE } from "./mapConfig";
import { MapLayerState, SelectedMapEntity } from "./mapTypes";

interface RenderBuildingLayersParams {
  L: any;
  map: LeafletMap;
  layerGroup: LayerGroup;
  layers: MapLayerState;
  onSelectEntity: (entity: SelectedMapEntity) => void;
  onOpenHouseDimensions?: () => void;
  cadGeoreferenced?: boolean;
}

export function renderBuildingLayers({
  L,
  map,
  layerGroup,
  layers,
  onSelectEntity,
  onOpenHouseDimensions,
  cadGeoreferenced = true,
}: RenderBuildingLayersParams) {
  // 1. RENDER ALL BUILDING FOOTPRINTS UNDERNEATH
  if (layers.buildingFootprints) {
    GIS_BUILDINGS.forEach((structure) => {
      const latLngs = structure.geometry.coordinates[0].map(([lng, lat]) => [lat, lng] as [number, number]);
      const isEncroaching = structure.isEncroaching;

      const poly = L.polygon(latLngs, {
        color: isEncroaching ? MAP_PALETTE.encroachingBuildingBase.stroke : MAP_PALETTE.normalBuilding.stroke,
        weight: isEncroaching ? MAP_PALETTE.encroachingBuildingBase.weight : MAP_PALETTE.normalBuilding.weight,
        fillColor: isEncroaching ? MAP_PALETTE.encroachingBuildingBase.fill : MAP_PALETTE.normalBuilding.fill,
        fillOpacity: isEncroaching ? MAP_PALETTE.encroachingBuildingBase.fillOpacity : MAP_PALETTE.normalBuilding.fillOpacity,
      });

      poly.on("click", (e: any) => {
        L.DomEvent.stopPropagation(e);
        onSelectEntity({ type: "building", id: structure.id, data: structure });
      });

      layerGroup.addLayer(poly);

      // Structure Label (Main Residence BLD-125-01)
      if (structure.id === "BLD-125-01" && layers.surveyLabels) {
        const houseLabel = L.divIcon({
          className: "custom-house-label",
          html: `<div style="padding: 3px 8px; border-radius: 6px; background: rgba(15,23,42,0.88); border: 1.5px solid #38bdf8; font-family: monospace; font-size: 10px; color: #ffffff; font-weight: bold; pointer-events: none; white-space: nowrap; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.6);">
            🏠 ${structure.name}<br/>
            <span style="font-size: 8.5px; font-weight: normal; color: #bae6fd;">${structure.dimensions} (${structure.plinthAreaSqM} m² Plinth)</span>
          </div>`,
          iconSize: [150, 32],
          iconAnchor: [75, 16],
        });
        layerGroup.addLayer(L.marker([11.62350, 78.13617], { icon: houseLabel, interactive: false }));
      }

      // Structure Label (Selvam House BLD-127-01)
      if (structure.id === "BLD-127-01" && layers.surveyLabels) {
        const selLabel = L.divIcon({
          className: "custom-selvam-label",
          html: `<div style="padding: 2px 6px; border-radius: 4px; background: rgba(15,23,42,0.85); border: 1px solid #94a3b8; font-family: monospace; font-size: 8.5px; color: #cbd5e1; font-weight: bold; pointer-events: none; white-space: nowrap;">
            🏠 K. Selvam Residence (${structure.plinthAreaSqM} m²)
          </div>`,
          iconSize: [140, 20],
          iconAnchor: [70, 10],
        });
        layerGroup.addLayer(L.marker([11.62348, 78.13715], { icon: selLabel, interactive: false }));
      }

      // Structure Label (Meena Villa BLD-126-01)
      if (structure.id === "BLD-126-01" && layers.surveyLabels) {
        const meenaLabel = L.divIcon({
          className: "custom-meena-label",
          html: `<div style="padding: 2px 6px; border-radius: 4px; background: rgba(15,23,42,0.85); border: 1px solid #34d399; font-family: monospace; font-size: 8.5px; color: #a7f3d0; font-weight: bold; pointer-events: none; white-space: nowrap;">
            🏠 R. Meena Contemporary Villa (${structure.plinthAreaSqM} m²)
          </div>`,
          iconSize: [150, 20],
          iconAnchor: [75, 10],
        });
        layerGroup.addLayer(L.marker([11.62452, 78.13635], { icon: meenaLabel, interactive: false }));
      }
    });
  }

  // 2. CAD ARCHITECTURAL DIMENSION CALLOUTS
  if (layers.buildingDimensions) {
    // North Wall: 36.5m (120 ft)
    const northLine = L.polyline(
      [[11.62365, 78.13600], [11.62365, 78.13635]],
      { color: "#38bdf8", weight: 2, dashArray: "3, 3" }
    );
    layerGroup.addLayer(northLine);

    const northDimBadge = L.divIcon({
      className: "custom-dim-badge",
      html: `<div style="padding: 1px 6px; border-radius: 4px; background: #0284c7; font-family: monospace; font-size: 9px; color: #ffffff; font-weight: bold; pointer-events: auto; cursor: pointer; white-space: nowrap; box-shadow: 0 2px 6px rgba(0,0,0,0.4);" title="Click to view full CAD architectural blueprint">
        ◄ 36.5m (120 ft) ►
      </div>`,
      iconSize: [100, 18],
      iconAnchor: [50, 9],
    });
    const mNorth = L.marker([11.62368, 78.13617], { icon: northDimBadge });
    if (onOpenHouseDimensions) {
      mNorth.on("click", (e: any) => {
        L.DomEvent.stopPropagation(e);
        onOpenHouseDimensions();
      });
    }
    layerGroup.addLayer(mNorth);

    // East Frontage Wall: 25.9m (85 ft)
    const eastLine = L.polyline(
      [[11.62365, 78.13635], [11.62340, 78.13635]],
      { color: "#38bdf8", weight: 2, dashArray: "3, 3" }
    );
    layerGroup.addLayer(eastLine);

    const eastDimBadge = L.divIcon({
      className: "custom-dim-badge",
      html: `<div style="padding: 1px 6px; border-radius: 4px; background: #0284c7; font-family: monospace; font-size: 9px; color: #ffffff; font-weight: bold; pointer-events: auto; cursor: pointer; white-space: nowrap; box-shadow: 0 2px 6px rgba(0,0,0,0.4);" title="Click to view full CAD architectural blueprint">
        ▲ 25.9m (85 ft) ▼
      </div>`,
      iconSize: [95, 18],
      iconAnchor: [47, 9],
    });
    const mEast = L.marker([11.62352, 78.13638], { icon: eastDimBadge });
    if (onOpenHouseDimensions) {
      mEast.on("click", (e: any) => {
        L.DomEvent.stopPropagation(e);
        onOpenHouseDimensions();
      });
    }
    layerGroup.addLayer(mEast);
  }

  // 3. INTER-HOUSE SEPARATION CORRIDOR (16.4m buffer between B-01 and B-05)
  if (layers.interHouseBuffer) {
    const corridorPoly = L.polygon(
      [
        [11.62365, 78.13615],
        [11.62365, 78.13655],
        [11.62435, 78.13655],
        [11.62435, 78.13615],
      ],
      {
        color: "#14b8a6",
        weight: 1.5,
        fillColor: "#2dd4bf",
        fillOpacity: 0.12,
        dashArray: "4, 4",
      }
    );
    layerGroup.addLayer(corridorPoly);

    const corridorBadge = L.divIcon({
      className: "custom-corridor-badge",
      html: `<div style="padding: 2px 7px; border-radius: 4px; background: rgba(13,148,136,0.92); border: 1px solid #5eead4; font-family: monospace; font-size: 9px; color: #ffffff; font-weight: bold; pointer-events: none; white-space: nowrap; box-shadow: 0 3px 8px rgba(0,0,0,0.5);">
        ◄ 16.4m (53.8 ft) Inter-House Buffer ►
      </div>`,
      iconSize: [180, 22],
      iconAnchor: [90, 11],
    });
    layerGroup.addLayer(L.marker([11.62400, 78.13635], { icon: corridorBadge, interactive: false }));
  }

  // 4. CAD ARCHITECTURAL DXF VECTORS & GEOREFERENCING CHECK
  if (layers.cadLayer) {
    if (!cadGeoreferenced) {
      // Prompt user/officer when CAD layer requires georeferencing
      const warningBadge = L.divIcon({
        className: "custom-cad-warning",
        html: `<div style="padding: 6px 12px; border-radius: 8px; background: rgba(239,68,68,0.95); border: 1.5px solid #fecaca; font-family: monospace; font-size: 11px; color: #ffffff; font-weight: bold; pointer-events: none; white-space: nowrap; box-shadow: 0 6px 18px rgba(0,0,0,0.6); text-align: center;">
          ⚠️ CAD layer requires georeferencing<br/>
          <span style="font-size: 9px; font-weight: normal; color: #fee2e2;">Missing authoritative ground control tie-points</span>
        </div>`,
        iconSize: [260, 44],
        iconAnchor: [130, 22],
      });
      layerGroup.addLayer(L.marker([11.62342, 78.13620], { icon: warningBadge, interactive: false }));
    } else {
      // Transform local engineering CAD to WGS84 GeoJSON
      const cadResult = transformCADToWGS84(SAMPLE_CAD_VILLA, DEFAULT_CAD_DATUM_KONDALAMPATTI);
      if (cadResult.success) {
        cadResult.features.forEach((feature) => {
          if (feature.geometry.type === "Polygon") {
            const latLngs = (feature.geometry.coordinates[0] as number[][]).map(
              ([lng, lat]) => [lat, lng] as [number, number]
            );
            const poly = L.polygon(latLngs, {
              color: feature.properties.strokeColor || "#38bdf8",
              weight: feature.properties.weight || 2,
              fillColor: "#38bdf8",
              fillOpacity: 0.1,
              dashArray: "3, 3",
            });
            layerGroup.addLayer(poly);
          } else {
            const latLngs = (feature.geometry.coordinates as number[][]).map(
              ([lng, lat]) => [lat, lng] as [number, number]
            );
            const line = L.polyline(latLngs, {
              color: feature.properties.strokeColor || "#38bdf8",
              weight: feature.properties.weight || 2,
              dashArray: "4, 2",
            });
            layerGroup.addLayer(line);
          }
        });

        // CAD Datum Anchor Stone Marker
        const datumAnchor = L.divIcon({
          className: "custom-cad-datum",
          html: `<div style="padding: 2px 6px; border-radius: 4px; background: rgba(14,165,233,0.9); font-family: monospace; font-size: 8.5px; color: #fff; font-weight: bold; pointer-events: none; white-space: nowrap;">
            📐 CAD Datum Origin (M1)
          </div>`,
          iconSize: [120, 18],
          iconAnchor: [60, 9],
        });
        layerGroup.addLayer(
          L.marker(DEFAULT_CAD_DATUM_KONDALAMPATTI.anchorOriginWGS84, { icon: datumAnchor, interactive: false })
        );
      }
    }
  }
}

