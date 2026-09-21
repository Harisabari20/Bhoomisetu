"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Compass,
  ArrowLeft,
  Share2,
  Download,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  Landmark,
  Receipt,
  MapPin,
  Building2,
  Layers,
  History,
  FileCheck,
  ExternalLink,
  ChevronRight,
  BellRing,
  Building,
  Check,
  Info,
} from "lucide-react";
import {
  getParcel,
  getNeighboringParcels,
  getStructures,
  getParcelConflicts,
  getParcelValidation,
  getParcelById,
} from "@/services/parcelService";
import {
  DemoParcel,
  DemoNeighborParcel,
  DemoStructure,
  DemoConflict,
  DEMO_PARCEL,
  DEMO_NEIGHBORING_PARCELS,
  DEMO_STRUCTURES,
  DEMO_CONFLICTS,
} from "@/data/demoParcel";
import { ParcelLayersConfig, ParcelData } from "@/types/parcel";
import { DEFAULT_PARCEL_LAYERS } from "@/mock/gisData";
import { MOCK_PARCELS } from "@/mock/parcels";
import { DataSourceBadge } from "@/components/ui/DataSourceBadge";
import { HouseDimensionViewer } from "@/components/parcel/HouseDimensionViewer";
import { LandMap } from "@/components/map";
import { Button } from "@/components/ui/Button";
import { formatAcreage, formatCurrencyINR, formatDateIndian, cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

export default function Parcel360Page() {
  const { currentUser, currentRole } = useAuth();
  const params = useParams();
  const rawId = (params?.id as string) || currentUser?.primaryParcelId || "BS-P00125";
  const parcelId = (rawId === "my" || rawId === "current" ? currentUser?.primaryParcelId : rawId) || "BS-P00125";
  const normalizedParcelId = parcelId.trim().toUpperCase();

  // Parcel & Cadastral GIS Data State (Loaded via service layer)
  const [parcel, setParcel] = useState<DemoParcel>(DEMO_PARCEL);
  const [neighboringParcels, setNeighboringParcels] = useState<DemoNeighborParcel[]>(
    DEMO_NEIGHBORING_PARCELS
  );
  const [structures, setStructures] = useState<DemoStructure[]>(DEMO_STRUCTURES);
  const [conflicts, setConflicts] = useState<DemoConflict[]>(DEMO_CONFLICTS);
  const [layers, setLayers] = useState<ParcelLayersConfig>(DEFAULT_PARCEL_LAYERS);

  // Authoritative Registry Record Data
  const [parcelData, setParcelData] = useState<ParcelData>(
    MOCK_PARCELS[normalizedParcelId] || MOCK_PARCELS["BS-P00125"]
  );

  // Selected conflict for click-to-focus
  const [selectedConflictId, setSelectedConflictId] = useState<number | null>(null);

  // Tabs ref for auto-scrolling
  const tabsRef = useRef<HTMLDivElement>(null);

  // Active Bottom Tab
  const [activeTab, setActiveTab] = useState<
    "overview" | "revenue" | "registration" | "tax" | "gis" | "documents" | "anomalies" | "timeline"
  >("overview");

  // Officer workflow simulation
  const [officerStatus, setOfficerStatus] = useState<string>("Verification Required");

  // Toast feedback state
  const [toast, setToast] = useState<{ title: string; desc: string } | null>(null);

  // Load data via service layer
  useEffect(() => {
    getParcel(normalizedParcelId).then((data) => {
      if (data) setParcel(data);
    });
    getNeighboringParcels(normalizedParcelId).then((data) => setNeighboringParcels(data));
    getStructures(normalizedParcelId).then((data) => setStructures(data));
    getParcelConflicts(normalizedParcelId).then((data) => setConflicts(data));
    getParcelById(normalizedParcelId).then((data) => {
      if (data) setParcelData(data);
    });
  }, [normalizedParcelId]);

  const triggerToast = (title: string, desc: string) => {
    setToast({ title, desc });
    setTimeout(() => setToast(null), 4000);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
      }
      triggerToast("Link Copied to Clipboard", "Direct link to Parcel 360° GIS inspection view copied.");
    }
  };

  const handleDownloadMap = () => {
    triggerToast("Generating Cadastral Map Export", "Exporting GeoTIFF and digitally signed PDF certificate.");
  };

  const handleTrackUpdates = () => {
    triggerToast("Subscribed to Land Alerts", "Real-time registry & spatial alerts enabled for Survey 125/2.");
  };

  const handleToggleLayer = (key: keyof ParcelLayersConfig) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleFocusConflict = (id: number) => {
    setSelectedConflictId(id);
  };

  return (
    <div className="flex-1 bg-neutral-surface min-h-[calc(100vh-4rem)] font-sans">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 p-4 rounded-xl bg-navy-950 text-white border border-earth-500/50 shadow-2xl flex items-center gap-3 animate-fade-in font-sans">
          <ShieldCheck className="w-5 h-5 text-earth-400 shrink-0" />
          <div>
            <p className="text-xs font-bold">{toast.title}</p>
            <p className="text-[11px] text-slate-300">{toast.desc}</p>
          </div>
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* 1. HEADER (Section 29 Visual Target: Citizen Portal > Parcel 360° ...) */}
      {/* --------------------------------------------------------------------- */}
      <div className="bg-white border-b border-slate-200">
        {/* Breadcrumb */}
        <div className="border-b border-slate-100 py-2.5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1720px] mx-auto flex items-center gap-2 text-xs text-slate-500 font-sans">
            <Link href="/citizen" className="hover:text-navy-900 transition-colors">
              Citizen Portal
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/citizen/discover" className="hover:text-navy-900 transition-colors">
              Parcel 360°
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-mono font-bold text-navy-950 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              {parcel.id}
            </span>
          </div>
        </div>

        {/* Title Bar & Actions */}
        <div className="py-5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1720px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950 tracking-tight">
                Parcel 360°
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Interactive map and land details with surrounding structures and detected conflicts
              </p>
            </div>

            {/* Right Actions: [ Share ] [ Download Map ] [ Track Updates ] */}
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleShare} className="text-xs">
                <Share2 className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
                <span>Share</span>
              </Button>

              <Button variant="outline" size="sm" onClick={handleDownloadMap} className="text-xs">
                <Download className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
                <span>Download Map</span>
              </Button>

              <Button variant="primary" size="sm" onClick={handleTrackUpdates} className="text-xs">
                <BellRing className="w-3.5 h-3.5 mr-1.5 text-earth-200" />
                <span>Track Updates</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* 2. MAIN 2-COLUMN LAYOUT (70% GIS MAP, 30% RIGHT PANEL)                */}
      {/* --------------------------------------------------------------------- */}
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: 70% WIDTH (col-span-8) */}
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse-subtle" />
                <span className="font-mono font-bold text-navy-950 uppercase tracking-wider">
                  Cadastral GIS Engine • Kondalampatti, Salem
                </span>
              </div>
              <span className="font-mono text-slate-500 text-[11px] hidden sm:inline-block">
                Standard GeoJSON Layer (WGS 84)
              </span>
            </div>

            {/* PROFESSIONAL CADASTRAL GIS MAP */}
            <LandMap
              selectedParcelId={normalizedParcelId}
              selectedConflictId={selectedConflictId}
              onSelectConflict={handleFocusConflict}
              onSelectParcel={(id) => {
                triggerToast(`Selected Parcel ${id}`, `Viewing boundaries and revenue records for ${id}`);
              }}
              onOpenHouseDimensions={() => {
                setActiveTab("gis");
                tabsRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
              userRole={currentRole}
              height="h-[680px] min-h-[580px]"
            />
          </div>

          {/* RIGHT: 30% WIDTH (col-span-4) */}
          <div className="lg:col-span-4 space-y-5">
            {/* ---------------------------------------------------------------- */}
            {/* CARD 1: TARGET PARCEL DETAILS (Section 16)                       */}
            {/* ---------------------------------------------------------------- */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    TARGET PARCEL
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <h2 className="text-lg font-bold font-mono text-navy-950">{parcel.id}</h2>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-mono text-xs font-bold border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>✓ {parcel.status}</span>
                    </span>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>

              {/* Key Details List */}
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 col-span-2">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">ULPIN</span>
                  <span className="font-mono font-bold text-navy-900 text-xs">{parcel.ulpin}</span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 col-span-2">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">LEGAL OWNER</span>
                  <span className="font-bold text-navy-900">{parcel.owner}</span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">SURVEY NO.</span>
                  <span className="font-mono font-bold text-navy-900">{parcel.surveyNumber}</span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">TOTAL EXTENT</span>
                  <span className="font-mono font-bold text-navy-900">
                    {parcel.area} {parcel.areaUnit}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">VILLAGE</span>
                  <span className="font-semibold text-slate-800">{parcel.village}</span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">TALUK</span>
                  <span className="font-semibold text-slate-800">{parcel.taluk}</span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">DISTRICT</span>
                  <span className="font-semibold text-slate-800">{parcel.district}</span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">STATE</span>
                  <span className="font-semibold text-slate-800">{parcel.state}</span>
                </div>
              </div>
            </div>

            {/* ---------------------------------------------------------------- */}
            {/* CARD 2: DETECTED CONFLICTS (3) - HIGH ATTENTION (Section 16)     */}
            {/* ---------------------------------------------------------------- */}
            <div className="bg-white rounded-2xl border border-rose-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-rose-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse-subtle" />
                  <h3 className="text-sm font-bold text-navy-950">
                    DETECTED CONFLICTS ({conflicts.length})
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-50 text-rose-700 font-bold border border-rose-200">
                  HIGH ATTENTION
                </span>
              </div>

              {/* Citizen Workflow Alert Banner */}
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[11px] text-amber-950">
                    Potential Inconsistency Detected
                  </p>
                  <p className="text-[11px] text-amber-800 leading-snug">
                    Your parcel contains a potential record/GIS inconsistency. Our automatic engine has flagged 3 spatial boundaries for verification.
                  </p>
                </div>
              </div>

              {/* Clickable Conflict List with "Focus Conflict" */}
              <div className="space-y-2.5">
                {conflicts.map((cf) => {
                  const isSelected = selectedConflictId === cf.id;
                  return (
                    <div
                      key={cf.id}
                      onClick={() => handleFocusConflict(cf.id)}
                      className={cn(
                        "p-3 rounded-xl border transition-all cursor-pointer space-y-1.5",
                        isSelected
                          ? "bg-rose-50/90 border-rose-400 ring-2 ring-rose-400/20 shadow-xs"
                          : "bg-slate-50/70 border-slate-200 hover:border-rose-300 hover:bg-slate-50"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-rose-600 text-white font-mono font-bold text-[10px] flex items-center justify-center">
                            {cf.id === 1 ? "①" : cf.id === 2 ? "②" : "③"}
                          </span>
                          <span className="text-xs font-bold text-navy-950">{cf.title}</span>
                        </div>
                        <span
                          className={cn(
                            "text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border",
                            cf.severity === "HIGH"
                              ? "bg-rose-100 text-rose-800 border-rose-200"
                              : "bg-amber-100 text-amber-800 border-amber-200"
                          )}
                        >
                          {cf.area} {cf.unit}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-600 leading-snug pl-7">
                        {cf.description}
                      </p>

                      <div className="pl-7 pt-1 flex items-center justify-between text-[10px] font-mono">
                        <span className="text-slate-500">Confidence: {cf.confidence}%</span>
                        <span className="text-rose-600 font-bold hover:underline">
                          Focus Conflict →
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Officer Verification Simulation */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-500 text-[10px] uppercase">
                    Officer Verification:
                  </span>
                  <span className="font-mono font-bold text-[11px] text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                    {officerStatus}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  <button
                    onClick={() => {
                      setOfficerStatus("Under Field Review");
                      triggerToast("Review Initiated", "Tahsildar Salem field inspection scheduled.");
                    }}
                    className="px-2 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-[11px] font-medium text-slate-700 transition-colors"
                  >
                    Review
                  </button>
                  <button
                    onClick={() => {
                      setOfficerStatus("Demarcation Notice Issued");
                      triggerToast("Notice Issued", "Section 9 TN Survey & Boundaries Act notice dispatched.");
                    }}
                    className="px-2 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-[11px] font-medium text-slate-700 transition-colors"
                  >
                    Demarcate
                  </button>
                  <button
                    onClick={() => {
                      setOfficerStatus("Clarification Requested");
                      triggerToast("Clarification Dispatched", "Deed inquiry submitted to Sub-Registrar Salem.");
                    }}
                    className="px-2 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-[11px] font-medium text-slate-700 transition-colors"
                  >
                    Request Info
                  </button>
                  <button
                    onClick={() => {
                      setOfficerStatus("Resolved");
                      triggerToast("Resolved", "Patta boundary harmonized with GIS orthomosaic.");
                    }}
                    className="px-2 py-1.5 rounded-lg border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-[11px] font-bold text-emerald-800 transition-colors"
                  >
                    Mark Resolved
                  </button>
                </div>
              </div>
            </div>

            {/* ---------------------------------------------------------------- */}
            {/* CARD 3: MAP LAYERS PANEL (7 Checkboxes)                          */}
            {/* ---------------------------------------------------------------- */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-navy-900" />
                  <h3 className="text-sm font-bold text-navy-950">Map Layers</h3>
                </div>
                <span className="text-[10px] font-mono text-slate-500">Live Cadastre</span>
              </div>

              <div className="space-y-2 text-xs font-sans">
                {[
                  {
                    key: "parcelBoundaries" as const,
                    label: "Parcel Boundaries",
                    desc: "Cadastral lot polygons (Blue / Grey)",
                  },
                  {
                    key: "buildingStructures" as const,
                    label: "Building Structures",
                    desc: "House and plinth footprint polygons",
                  },
                  {
                    key: "surveyNumbers" as const,
                    label: "Survey Numbers",
                    desc: "Survey stones and boundary labels",
                  },
                  {
                    key: "conflictAreas" as const,
                    label: "Conflict Areas",
                    desc: "Red highlighted overlaps & intrusions",
                  },
                  {
                    key: "satelliteImagery" as const,
                    label: "Satellite Imagery",
                    desc: "High-resolution orthomosaic imagery",
                  },
                  {
                    key: "roads" as const,
                    label: "Roads",
                    desc: "Salem bypass & feeder corridor",
                  },
                  {
                    key: "utilities" as const,
                    label: "Utilities",
                    desc: "Electrical distribution & pipelines",
                  },
                ].map((item) => {
                  const isChecked = layers[item.key];
                  return (
                    <label
                      key={item.key}
                      className={cn(
                        "flex items-start gap-2.5 p-2 rounded-xl transition-all cursor-pointer",
                        isChecked ? "bg-slate-50/80" : "opacity-60 hover:opacity-100"
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggleLayer(item.key)}
                        className="mt-0.5 rounded border-slate-300 text-earth-600 focus:ring-earth-500 cursor-pointer"
                      />
                      <div className="space-y-0.5">
                        <span className="font-semibold text-slate-800 text-xs block">
                          {item.label}
                        </span>
                        <span className="text-[10px] text-slate-500 block leading-tight">
                          {item.desc}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* ---------------------------------------------------------------- */}
            {/* PROTOTYPE ACCURACY DISCLAIMER (Section 31)                      */}
            {/* ---------------------------------------------------------------- */}
            <div className="p-3 rounded-xl bg-slate-100/90 border border-slate-200 text-slate-600 text-[11px] leading-relaxed flex items-start gap-2">
              <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800 block">Prototype GIS Data • Demo cadastral layer</strong>
                <span>
                  Demonstrating sovereign cross-system interoperability workflows. Not legally authoritative until confirmed by revenue survey records.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------- */}
        {/* 3. BOTTOM RECORD TABS (8 REUSABLE PANELS)                           */}
        {/* ------------------------------------------------------------------- */}
        <div ref={tabsRef} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Tabs Navigation Header */}
          <div className="border-b border-slate-200 bg-slate-50/75 px-4 overflow-x-auto">
            <nav className="flex space-x-2 sm:space-x-4">
              {[
                { id: "overview", label: "Overview", icon: Layers },
                { id: "revenue", label: "Revenue Records", icon: Landmark },
                { id: "registration", label: "Registration Records", icon: FileText },
                { id: "tax", label: "Property Tax Records", icon: Receipt },
                { id: "gis", label: "GIS & Spatial Data", icon: MapPin },
                { id: "documents", label: "Documents", icon: FileCheck },
                { id: "anomalies", label: "Verification & Anomalies", icon: AlertTriangle },
                { id: "timeline", label: "Timeline", icon: History },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={cn(
                      "py-3.5 px-3 text-xs font-semibold whitespace-nowrap border-b-2 flex items-center gap-2 transition-all font-sans",
                      isActive
                        ? "border-earth-600 text-earth-800 bg-white shadow-sm -mb-[1px]"
                        : "border-transparent text-slate-500 hover:text-navy-900 hover:border-slate-300"
                    )}
                  >
                    <Icon className={cn("w-4 h-4", isActive ? "text-earth-700" : "text-slate-400")} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* TAB CONTENTS */}
          <div className="p-6 sm:p-8">
            {/* TAB 1: OVERVIEW */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-navy-900 mb-1">
                    Unified Parcel Intelligence
                  </h3>
                  <p className="text-xs text-slate-500">
                    Authoritative cross-system resolution synthesizing data from 4 state registries.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      PARCEL AREA
                    </span>
                    <p className="text-xl font-bold font-mono text-navy-900">
                      {formatAcreage(parcelData.areaAcres)}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Registered Deed: 2.00 ac • GIS Calculated: 1.87 ac (0.13 ac Road Setback)
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      PRIMARY TITLE HOLDER
                    </span>
                    <p className="text-base font-bold text-navy-900 truncate">
                      {parcelData.legalOwnerName}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Co-owner: {parcelData.coOwners?.[0] || "Priya R. Kumar"}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      CADASTRAL SHEET
                    </span>
                    <p className="text-sm font-bold font-mono text-navy-900">
                      {parcelData.gis.cadastralMapSheet}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Polygon (4 Vertices M1–M4) • Kondalampatti, Salem
                    </p>
                  </div>
                </div>

                {/* Building Footprint Preview */}
                <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-earth-400" />
                      <span className="text-[10px] font-mono uppercase text-earth-300">
                        BUILDING FOOTPRINT ON PARCEL
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-white">
                      Main Residence Villa: 36.5m × 25.9m (120 ft × 85 ft)
                    </h4>
                    <p className="text-xs text-slate-300">
                      Plinth Area: 10,183 sq.ft (946 m²) • Ground Coverage: 11.7% • Setbacks: Fully Compliant
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab("gis");
                      tabsRef.current?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-3.5 py-2 rounded-lg bg-earth-600 hover:bg-earth-500 text-white font-mono text-xs font-bold shrink-0 transition-colors shadow-glow-green flex items-center gap-1.5"
                  >
                    <span>View GIS Specs & House CAD</span>
                    <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: REVENUE RECORDS */}
            {activeTab === "revenue" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-base font-bold text-navy-900">Revenue Administration (Patta / RoR)</h3>
                    <p className="text-xs text-slate-500">Department of Land Administration, Government of Tamil Nadu</p>
                  </div>
                  <DataSourceBadge source="Revenue" size="md" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-mono">
                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-400 block uppercase">Patta Number</span>
                    <span className="font-bold text-navy-900">{parcelData.revenue.pattaNumber}</span>
                  </div>
                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-400 block uppercase">Khata Number</span>
                    <span className="font-bold text-navy-900">{parcelData.revenue.khataNumber}</span>
                  </div>
                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-400 block uppercase">Recorded Extent</span>
                    <span className="font-bold text-navy-900">{parcelData.revenue.recordedAreaAcres} Acres</span>
                  </div>
                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-400 block uppercase">Land Classification</span>
                    <span className="font-bold text-navy-900">{parcelData.revenue.landClassification}</span>
                  </div>
                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-400 block uppercase">Last Mutation Date</span>
                    <span className="font-bold text-navy-900">{formatDateIndian(parcelData.revenue.lastMutatedDate)}</span>
                  </div>
                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-400 block uppercase">Jurisdiction</span>
                    <span className="font-bold text-navy-900">{parcelData.revenue.taluk} Taluk, {parcelData.revenue.village}</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: REGISTRATION RECORDS */}
            {activeTab === "registration" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-base font-bold text-navy-900">Registration Deed Records (SRO)</h3>
                    <p className="text-xs text-slate-500">Inspector General of Registration, Sub-Registrar Office, Salem</p>
                  </div>
                  <DataSourceBadge source="Registration" size="md" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-mono">
                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-400 block uppercase">Document Reference</span>
                    <span className="font-bold text-navy-900">{parcelData.registration.documentNumber}</span>
                  </div>
                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-400 block uppercase">SRO Office</span>
                    <span className="font-bold text-navy-900">{parcelData.registration.sroOffice}</span>
                  </div>
                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-400 block uppercase">Deed Type</span>
                    <span className="font-bold text-navy-900">{parcelData.registration.deedType}</span>
                  </div>
                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-400 block uppercase">Consideration Value</span>
                    <span className="font-bold text-navy-900">{formatCurrencyINR(parcelData.registration.considerationValueINR)}</span>
                  </div>
                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-400 block uppercase">Stamp Duty Paid</span>
                    <span className="font-bold text-navy-900">{formatCurrencyINR(parcelData.registration.stampDutyPaidINR)}</span>
                  </div>
                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-400 block uppercase">Encumbrance Status</span>
                    <span className="font-bold text-emerald-700">✓ {parcelData.registration.encumbranceStatus}</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: PROPERTY TAX RECORDS */}
            {activeTab === "tax" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-base font-bold text-navy-900">Municipal Property Tax Records</h3>
                    <p className="text-xs text-slate-500">Salem City Municipal Corporation Civic Assessment</p>
                  </div>
                  <DataSourceBadge source="Tax" size="md" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-mono">
                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-400 block uppercase">Assessment No.</span>
                    <span className="font-bold text-navy-900">{parcelData.tax.assessmentNumber}</span>
                  </div>
                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-400 block uppercase">Civic Body</span>
                    <span className="font-bold text-navy-900">{parcelData.tax.municipalBody}</span>
                  </div>
                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-400 block uppercase">Payment Status</span>
                    <span className="font-bold text-emerald-700">✓ {parcelData.tax.paymentStatus}</span>
                  </div>
                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-400 block uppercase">Annual Tax</span>
                    <span className="font-bold text-navy-900">{formatCurrencyINR(parcelData.tax.annualTaxINR)}</span>
                  </div>
                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-400 block uppercase">Tax Assessment Year</span>
                    <span className="font-bold text-navy-900">{parcelData.tax.taxYear}</span>
                  </div>
                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-400 block uppercase">Last Payment Date</span>
                    <span className="font-bold text-navy-900">{formatDateIndian(parcelData.tax.lastPaymentDate)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: GIS & SPATIAL DATA */}
            {activeTab === "gis" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-base font-bold text-navy-900">GIS Cadastral Dimensions & Survey Stones</h3>
                    <p className="text-xs text-slate-500">Calculated geometry from satellite orthomosaic & FMB sketch</p>
                  </div>
                  <DataSourceBadge source="GIS" size="md" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="text-xs font-bold text-navy-900 block">Surrounding Survey Abutments</span>
                    <ul className="space-y-1.5 text-slate-600 text-[11px]">
                      <li><strong>North (Survey 125/1):</strong> R. Meena (3.50 ac)</li>
                      <li><strong>South (Survey 124/1):</strong> P. Natarajan (2.40 ac)</li>
                      <li><strong>East (Survey 125/3):</strong> K. Selvam (1.90 ac)</li>
                      <li><strong>West (Survey 124/2):</strong> V. Raghavan (1.75 ac)</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="text-xs font-bold text-navy-900 block">Cadastral Sheet Details</span>
                    <ul className="space-y-1.5 text-slate-600 text-[11px]">
                      <li><strong>Cadastral Sheet:</strong> {parcelData.gis.cadastralMapSheet}</li>
                      <li><strong>Zoning Classification:</strong> {parcelData.gis.zoneClassification}</li>
                      <li><strong>Calculated Polygon:</strong> 1.87 acres (Road Setback: 0.13 ac)</li>
                      <li><strong>Coordinate System:</strong> EPSG:4326 (WGS 84)</li>
                    </ul>
                  </div>
                </div>

                {/* EXACT HOUSE & BUILDING ARCHITECTURAL DIMENSIONAL ANALYSIS */}
                <div className="pt-2">
                  <HouseDimensionViewer
                    parcelId={parcel.id}
                    surveyNumber={parcel.surveyNumber}
                  />
                </div>
              </div>
            )}

            {/* TAB 6: DOCUMENTS */}
            {activeTab === "documents" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-base font-bold text-navy-900">Authenticated Deeds & Documents</h3>
                    <p className="text-xs text-slate-500">State land registry documents verified with cryptographic hashes</p>
                  </div>
                </div>

                <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden text-xs">
                  {parcelData.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-earth-50 text-earth-700 flex items-center justify-center shrink-0 border border-earth-200">
                          <FileCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-navy-900">{doc.title}</h4>
                          <p className="text-slate-500 text-[11px]">
                            {doc.issuingAuthority} • Issued {formatDateIndian(doc.dateOfIssue)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 font-mono text-xs">
                        <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {doc.ocrConfidence}% OCR Match
                        </span>
                        <Button variant="outline" size="sm" onClick={handleDownloadMap}>
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 7: VERIFICATION & ANOMALIES */}
            {activeTab === "anomalies" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-base font-bold text-navy-900">Spatial Verification & Anomaly Reports</h3>
                    <p className="text-xs text-slate-500">Algorithmic conflict detection across GIS, Revenue, and Registration datasets</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {conflicts.map((cf) => (
                    <div key={cf.id} className="p-4 rounded-xl border border-rose-200 bg-rose-50/30 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-rose-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                            {cf.id === 1 ? "①" : cf.id === 2 ? "②" : "③"}
                          </span>
                          <h4 className="font-bold text-navy-900 text-sm">{cf.title}</h4>
                        </div>
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-200">
                          Affected Extent: {cf.area} {cf.unit}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 pl-8">{cf.description}</p>
                      <div className="pl-8 pt-2 flex flex-wrap items-center justify-between text-xs font-mono text-slate-500">
                        <span>Source: <strong>{cf.source}</strong> (Confidence: {cf.confidence}%)</span>
                        <span className="text-rose-700 font-semibold">{cf.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 8: TIMELINE */}
            {activeTab === "timeline" && (
              <div className="space-y-6">
                <div className="pb-3 border-b border-slate-100">
                  <h3 className="text-base font-bold text-navy-900">Audit Timeline & Cadastral Lineage</h3>
                  <p className="text-xs text-slate-500">Chronological history of mutations, registrations, and spatial surveys</p>
                </div>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {parcelData.auditHistory.map((entry) => (
                    <div key={entry.id} className="relative group">
                      <div
                        className={cn(
                          "absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full border-2 bg-white",
                          entry.status === "RESOLVED" || entry.status === "SUCCESS"
                            ? "border-emerald-500"
                            : entry.status === "WARNING"
                            ? "border-amber-500"
                            : "border-blue-500"
                        )}
                      />
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="font-bold text-navy-900">{entry.timestamp}</span>
                          <span className="text-[10px] text-slate-400">{entry.system}</span>
                        </div>
                        <h4 className="text-sm font-bold text-navy-900">{entry.action}</h4>
                        <p className="text-xs text-slate-600">{entry.notes}</p>
                        <p className="text-[10px] font-mono text-slate-400 pt-1">
                          Actor: <strong>{entry.actor}</strong>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
