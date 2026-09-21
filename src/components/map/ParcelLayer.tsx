import type { Map as LeafletMap, LayerGroup } from "leaflet";
import {
  GIS_PARCELS,
  ALL_GIS_PARCELS_LIST,
  GISParcel,
} from "@/data/gis/parcelsData";
import {
  GIS_ZONING,
  GIS_PROPERTY_TAX,
  GIS_ENCUMBRANCES,
} from "@/data/gis/infrastructureData";
import { MAP_PALETTE } from "./mapConfig";
import { MapLayerState, SelectedMapEntity } from "./mapTypes";

interface RenderParcelLayersParams {
  L: any;
  map: LeafletMap;
  layerGroup: LayerGroup;
  layers: MapLayerState;
  selectedParcelId?: string;
  onSelectEntity: (entity: SelectedMapEntity) => void;
}

export function renderParcelLayers({
  L,
  map,
  layerGroup,
  layers,
  selectedParcelId = "BS-P00125",
  onSelectEntity,
}: RenderParcelLayersParams) {
  const subjectParcel = GIS_PARCELS[selectedParcelId] || GIS_PARCELS["BS-P00125"];
  const neighborParcels = ALL_GIS_PARCELS_LIST.filter((p) => p.id !== subjectParcel.id);

  // 1. WIDER LOCALITY PARCELS (Z-index base cadastral)
  if (layers.localityParcels) {
    neighborParcels
      .filter((p) => ["BS-P00128", "BS-P00123", "BS-P00124", "BS-P00132"].includes(p.id))
      .forEach((localityPlot) => {
        const latLngs = localityPlot.geometry.coordinates[0].map(([lng, lat]) => [lat, lng] as [number, number]);
        const poly = L.polygon(latLngs, {
          color: MAP_PALETTE.localityParcel.stroke,
          weight: MAP_PALETTE.localityParcel.weight,
          fillColor: MAP_PALETTE.localityParcel.fill,
          fillOpacity: MAP_PALETTE.localityParcel.fillOpacity,
          dashArray: "4, 4",
        });

        poly.on("click", (e: any) => {
          L.DomEvent.stopPropagation(e);
          onSelectEntity({ type: "parcel", id: localityPlot.id, data: localityPlot });
        });

        layerGroup.addLayer(poly);

        if (layers.surveyLabels) {
          const labelIcon = L.divIcon({
            className: "custom-cadastral-label",
            html: `<div style="padding: 2px 6px; border-radius: 4px; background: rgba(15,23,42,0.65); border: 1px solid rgba(148,163,184,0.3); font-family: monospace; font-size: 9px; color: #94a3b8; font-weight: bold; pointer-events: none; white-space: nowrap; text-align: center;">
              Survey ${localityPlot.surveyNumber}<br/><span style="font-size: 8px; font-weight: normal; color: #cbd5e1;">${localityPlot.owner}</span>
            </div>`,
            iconSize: [80, 26],
            iconAnchor: [40, 13],
          });
          layerGroup.addLayer(L.marker(localityPlot.centroid, { icon: labelIcon, interactive: false }));
        }
      });
  }

  // 2. ADJACENT NEIGHBORING PARCELS
  if (layers.neighborParcels) {
    neighborParcels.forEach((neighbor) => {
      const latLngs = neighbor.geometry.coordinates[0].map(([lng, lat]) => [lat, lng] as [number, number]);
      const isDispute = neighbor.status === "Potential Inconsistency" || neighbor.id === "BS-P00127";
      const isSelected = selectedParcelId === neighbor.id;

      const poly = L.polygon(latLngs, {
        color: isSelected
          ? "#3B82F6"
          : isDispute
          ? MAP_PALETTE.neighborDispute.stroke
          : MAP_PALETTE.neighborParcel.stroke,
        weight: isSelected ? 3.5 : isDispute ? 2.5 : MAP_PALETTE.neighborParcel.weight,
        fillColor: isDispute ? MAP_PALETTE.neighborDispute.fill : MAP_PALETTE.neighborParcel.fill,
        fillOpacity: isSelected ? 0.35 : isDispute ? 0.22 : MAP_PALETTE.neighborParcel.fillOpacity,
        dashArray: isDispute ? "5, 3" : undefined,
      });

      poly.on("click", (e: any) => {
        L.DomEvent.stopPropagation(e);
        onSelectEntity({ type: "parcel", id: neighbor.id, data: neighbor });
      });

      layerGroup.addLayer(poly);

      if (layers.surveyLabels) {
        const labelIcon = L.divIcon({
          className: "custom-cadastral-label",
          html: `<div style="padding: 2px 7px; border-radius: 6px; background: rgba(15,23,42,0.85); border: 1px solid ${
            isDispute ? "rgba(245,158,11,0.6)" : "rgba(16,185,129,0.4)"
          }; font-family: monospace; font-size: 10px; color: ${
            isDispute ? "#fbbf24" : "#6ee7b7"
          }; font-weight: bold; pointer-events: none; white-space: nowrap; text-align: center; box-shadow: 0 4px 10px rgba(0,0,0,0.5);">
            Survey ${neighbor.surveyNumber} ${isDispute ? '<span style="color:#ef4444;">⚠️</span>' : ""}<br/>
            <span style="font-size: 8.5px; font-weight: normal; color: #f1f5f9;">${neighbor.owner} (${neighbor.recordedAreaAcres} ac)</span>
          </div>`,
          iconSize: [110, 32],
          iconAnchor: [55, 16],
        });
        layerGroup.addLayer(L.marker(neighbor.centroid, { icon: labelIcon, interactive: false }));
      }
    });
  }

  // 3. TARGET SUBJECT PARCEL
  if (layers.subjectParcel && subjectParcel) {
    const latLngs = subjectParcel.geometry.coordinates[0].map(([lng, lat]) => [lat, lng] as [number, number]);

    const subjectPoly = L.polygon(latLngs, {
      color: MAP_PALETTE.subjectParcel.stroke,
      weight: 4,
      fillColor: MAP_PALETTE.subjectParcel.fill,
      fillOpacity: 0.28,
    });

    subjectPoly.on("click", (e: any) => {
      L.DomEvent.stopPropagation(e);
      onSelectEntity({ type: "parcel", id: subjectParcel.id, data: subjectParcel });
    });

    layerGroup.addLayer(subjectPoly);

    // Subject Parcel Badge
    if (layers.surveyLabels) {
      const subjectBadge = L.divIcon({
        className: "custom-cadastral-subject-badge",
        html: `<div style="padding: 3px 8px; border-radius: 6px; background: rgba(37,99,235,0.92); border: 1.5px solid #60a5fa; font-family: monospace; font-size: 11px; color: #ffffff; font-weight: 800; pointer-events: none; white-space: nowrap; text-align: center; box-shadow: 0 6px 16px rgba(37,99,235,0.5);">
          🎯 Survey ${subjectParcel.surveyNumber} • ${subjectParcel.id}<br/>
          <span style="font-size: 9px; font-weight: 500; color: #dbeafe;">${subjectParcel.owner} (${subjectParcel.recordedAreaAcres} Acres)</span>
        </div>`,
        iconSize: [160, 36],
        iconAnchor: [80, 18],
      });
      // Place near upper quadrant of the parcel
      layerGroup.addLayer(L.marker([subjectParcel.centroid[0] + 0.0003, subjectParcel.centroid[1]], { icon: subjectBadge, interactive: false }));
    }

    // 4. SURVEY MARKERS / STONES
    if (layers.surveyMarkers && subjectParcel.vertexNodes) {
      subjectParcel.vertexNodes.forEach((node) => {
        const markerIcon = L.divIcon({
          className: "custom-survey-marker",
          html: `<div style="width: 22px; height: 22px; border-radius: 50%; background: #0f172a; border: 2px solid #f59e0b; display: flex; align-items: center; justify-content: center; font-family: monospace; font-size: 9px; font-weight: bold; color: #fef3c7; box-shadow: 0 2px 8px rgba(0,0,0,0.6); cursor: pointer;">
            ${node.id}
          </div>`,
          iconSize: [22, 22],
          iconAnchor: [11, 11],
        });

        const marker = L.marker(node.coord, { icon: markerIcon });
        marker.on("click", (e: any) => {
          L.DomEvent.stopPropagation(e);
          onSelectEntity({ type: "marker", id: node.id, name: node.name, coord: node.coord, desc: node.desc });
        });
        layerGroup.addLayer(marker);
      });
    }
  }

  // 5. OFFICER LAYER: TOWN PLANNING ZONING
  if (layers.zoning) {
    GIS_ZONING.forEach((z) => {
      const zPoly = L.polygon(z.polygon, {
        color: MAP_PALETTE.zoning.stroke,
        weight: MAP_PALETTE.zoning.weight,
        fillColor: MAP_PALETTE.zoning.fill,
        fillOpacity: MAP_PALETTE.zoning.fillOpacity,
        dashArray: MAP_PALETTE.zoning.dashArray,
      });
      zPoly.on("click", (e: any) => {
        L.DomEvent.stopPropagation(e);
        onSelectEntity({
          type: "marker",
          id: z.id,
          name: `Zoning: ${z.name}`,
          coord: z.polygon[0],
          desc: `Zone Code: ${z.zoneCode} | Max FAR: ${z.maxFAR} | Max Height: ${z.maxHeightM}m`,
        });
      });
      layerGroup.addLayer(zPoly);

      const zBadge = L.divIcon({
        className: "custom-zoning-badge",
        html: `<div style="padding: 2px 6px; border-radius: 4px; background: rgba(139,92,246,0.9); font-family: monospace; font-size: 8.5px; color: #fff; font-weight: bold; pointer-events: none; white-space: nowrap;">
          🏛️ ${z.zoneCode}: FAR ${z.maxFAR} (H=${z.maxHeightM}m)
        </div>`,
        iconSize: [140, 18],
        iconAnchor: [70, 9],
      });
      layerGroup.addLayer(L.marker(z.polygon[0], { icon: zBadge, interactive: false }));
    });
  }

  // 6. OFFICER LAYER: MUNICIPAL PROPERTY TAX
  if (layers.taxLayer) {
    GIS_PROPERTY_TAX.forEach((tax) => {
      const taxPoly = L.polygon(tax.polygon, {
        color: MAP_PALETTE.taxLayer.stroke,
        weight: MAP_PALETTE.taxLayer.weight,
        fillColor: MAP_PALETTE.taxLayer.fill,
        fillOpacity: MAP_PALETTE.taxLayer.fillOpacity,
      });
      taxPoly.on("click", (e: any) => {
        L.DomEvent.stopPropagation(e);
        onSelectEntity({
          type: "marker",
          id: tax.assessmentNo,
          name: `Property Tax Assessment (${tax.parcelId})`,
          coord: tax.polygon[0],
          desc: `Assessment No: ${tax.assessmentNo} | Annual Value: ₹${tax.annualValueINR.toLocaleString("en-IN")} | Demand: ₹${tax.taxDemandINR.toLocaleString("en-IN")} | Status: ${tax.status}`,
        });
      });
      layerGroup.addLayer(taxPoly);

      const taxBadge = L.divIcon({
        className: "custom-tax-badge",
        html: `<div style="padding: 2px 6px; border-radius: 4px; background: rgba(16,185,129,0.9); font-family: monospace; font-size: 8.5px; color: #fff; font-weight: bold; pointer-events: none; white-space: nowrap;">
          🏷️ Tax: ${tax.status === "Paid" ? "✅ Paid" : "⚠️ Pending ₹" + tax.taxDemandINR}
        </div>`,
        iconSize: [110, 18],
        iconAnchor: [55, 9],
      });
      layerGroup.addLayer(L.marker(tax.polygon[2], { icon: taxBadge, interactive: false }));
    });
  }

  // 7. OFFICER LAYER: ENCUMBRANCE (SRO RECORDS)
  if (layers.encumbrance) {
    GIS_ENCUMBRANCES.forEach((ec) => {
      const targetP = GIS_PARCELS[ec.parcelId];
      if (targetP) {
        const ecBadge = L.divIcon({
          className: "custom-ec-badge",
          html: `<div style="padding: 2px 6px; border-radius: 4px; background: rgba(245,158,11,0.9); font-family: monospace; font-size: 8.5px; color: #000; font-weight: bold; pointer-events: none; white-space: nowrap;">
            📜 EC: ${ec.status} (${ec.sroOffice})
          </div>`,
          iconSize: [130, 18],
          iconAnchor: [65, 9],
        });
        layerGroup.addLayer(L.marker([targetP.centroid[0] - 0.0002, targetP.centroid[1]], { icon: ecBadge, interactive: false }));
      }
    });
  }
}

