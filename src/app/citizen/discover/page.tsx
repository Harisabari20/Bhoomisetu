"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Compass,
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  FileText,
  Landmark,
  Receipt,
  MapPin,
  ShieldCheck,
  Building2,
  Layers,
  Sparkles,
  RefreshCw,
  HelpCircle,
  Eye,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ConfidenceScore } from "@/components/ui/ConfidenceScore";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DataSourceBadge } from "@/components/ui/DataSourceBadge";
import { discoverAndIdentifyParcel } from "@/services/discoveryService";
import { DiscoveredParcel } from "@/types/discovery";

type FlowStage =
  | "INITIAL_DECISION" // "Do you already have a Parcel ID?"
  | "ENTER_PARCEL_ID" // Option 1
  | "PARCEL_ID_ANIMATING" // Finding parcel by ID
  | "CHOOSE_DISCOVERY_TYPE" // Option 2: What info do you have?
  | "FORM_GOV_IDS" // Option A: Existing Government IDs
  | "FORM_SURVEY" // Option B: No ID, enter Survey Number & Location
  | "RECORD_DISCOVERY_ANIMATION" // Animated data-flow querying Revenue, Tax, Registration, GIS
  | "PARCEL_IDENTIFIED" // Stage where BhoomiSetu Parcel ID is generated and prominently displayed
  | "IDENTITY_RESOLUTION" // Identity Resolution score & checklist
  | "AUTOMATIC_VALIDATION"; // Side-by-side comparison & officer routing

export default function DiscoverLandPage() {
  const router = useRouter();
  const [stage, setStage] = useState<FlowStage>("INITIAL_DECISION");

  // Parcel ID Input State
  const [parcelIdInput, setParcelIdInput] = useState("BS-P00125");

  // Discovered Parcel & Mode State
  const [discoverySourceMode, setDiscoverySourceMode] = useState<"SURVEY_DETAILS" | "GOV_IDS">("SURVEY_DETAILS");
  const [discoveredParcel, setDiscoveredParcel] = useState<DiscoveredParcel | null>(null);

  // Gov IDs Form State
  const [govIds, setGovIds] = useState({
    districtId: "SLM-KON-2024",
    taxId: "TX-990184",
    registrationId: "DOC-4192/2018",
    gisId: "",
  });

  // Survey Details Form State
  const [surveyForm, setSurveyForm] = useState({
    ownerName: "Ravi Kumar",
    surveyNumber: "125/2",
    state: "Tamil Nadu",
    district: "Salem",
  });

  // Animation ticks & progress states
  const [discoveryStep, setDiscoveryStep] = useState(0);
  const [idSearchStep, setIdSearchStep] = useState(0);

  // Trigger animation sequence when entering RECORD_DISCOVERY_ANIMATION
  useEffect(() => {
    if (stage === "RECORD_DISCOVERY_ANIMATION") {
      setDiscoveryStep(0);
      const timer1 = setTimeout(() => setDiscoveryStep(1), 500); // Revenue
      const timer2 = setTimeout(() => setDiscoveryStep(2), 1000); // Tax
      const timer3 = setTimeout(() => setDiscoveryStep(3), 1500); // Registration
      const timer4 = setTimeout(() => setDiscoveryStep(4), 2000); // GIS records retrieved
      const timer5 = setTimeout(() => setDiscoveryStep(5), 2600); // Resolving identity & matching
      const timer6 = setTimeout(async () => {
        // Discovers and identifies parcel across connected records, then generates BhoomiSetu Parcel ID
        const result = await discoverAndIdentifyParcel({
          mode: discoverySourceMode,
          surveyForm: surveyForm,
          govIds: govIds,
        });
        setDiscoveredParcel(result);
        setStage("PARCEL_IDENTIFIED");
      }, 3400);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
        clearTimeout(timer5);
        clearTimeout(timer6);
      };
    }
  }, [stage, discoverySourceMode, surveyForm, govIds]);

  // Trigger animation when searching by Parcel ID
  useEffect(() => {
    if (stage === "PARCEL_ID_ANIMATING") {
      setIdSearchStep(0);
      const t1 = setTimeout(() => setIdSearchStep(1), 400);
      const t2 = setTimeout(() => setIdSearchStep(2), 800);
      const t3 = setTimeout(() => setIdSearchStep(3), 1200);
      const t4 = setTimeout(() => setIdSearchStep(4), 1600);
      const t5 = setTimeout(() => {
        router.push(`/citizen/parcel/${parcelIdInput || "BS-P00125"}`);
      }, 2100);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
        clearTimeout(t5);
      };
    }
  }, [stage, parcelIdInput, router]);

  return (
    <div className="flex-1 bg-neutral-surface py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation Breadcrumb / Back control */}
        <div className="flex items-center justify-between">
          <Link
            href="/citizen"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-navy-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Citizen Dashboard</span>
          </Link>

          <span className="font-mono text-xs text-slate-400">
            Flow: Parcel Identity Resolution
          </span>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════════
            DISCOVERY FLOW: Reference Screenshots 3 & 4
            Pill switcher:
            [ 👤 I DON'T HAVE AN EXISTING ID ] | [ 📄 I HAVE EXISTING GOVERNMENT IDs ]
           ══════════════════════════════════════════════════════════════════════════ */}
        {stage === "INITIAL_DECISION" && (
          <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
            {/* Top Segmented Pill Toggle Container (Screenshots 3 & 4) */}
            <div className="bg-[#e9edf2] p-1.5 rounded-2xl flex items-center justify-between gap-1 shadow-inner border border-slate-200/80">
              <button
                type="button"
                onClick={() => setDiscoverySourceMode("SURVEY_DETAILS")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-3 px-3 sm:px-6 rounded-xl font-mono text-xs uppercase tracking-wider font-bold transition-all",
                  discoverySourceMode === "SURVEY_DETAILS"
                    ? "bg-white text-slate-900 border-2 border-black shadow-xs"
                    : "text-emerald-800 hover:text-navy-950"
                )}
              >
                <User className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="truncate">I DON'T HAVE AN EXISTING ID</span>
              </button>

              <button
                type="button"
                onClick={() => setDiscoverySourceMode("GOV_IDS")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-3 px-3 sm:px-6 rounded-xl font-mono text-xs uppercase tracking-wider font-bold transition-all",
                  discoverySourceMode === "GOV_IDS"
                    ? "bg-[#0b1320] text-white shadow-xs"
                    : "text-slate-500 hover:text-navy-950"
                )}
              >
                <FileText className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="truncate">I HAVE EXISTING GOVERNMENT IDs</span>
              </button>
            </div>

            {/* Mode 1: I DON'T HAVE AN EXISTING ID (Screenshot 4) */}
            {discoverySourceMode === "SURVEY_DETAILS" && (
              <div className="bg-white p-7 sm:p-9 rounded-2xl border border-slate-200 shadow-gis space-y-6">
                <p className="text-xs text-slate-500 leading-relaxed">
                  We'll use these basic details to discover matching records across connected revenue, registration, and GIS systems.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setStage("RECORD_DISCOVERY_ANIMATION");
                  }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5 font-sans">
                        Owner Name
                      </label>
                      <input
                        type="text"
                        required
                        value={surveyForm.ownerName}
                        onChange={(e) => setSurveyForm({ ...surveyForm, ownerName: e.target.value })}
                        placeholder="Ravi Kumar"
                        className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden font-normal text-slate-900 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5 font-sans">
                        Survey / Khasra / Gat Number
                      </label>
                      <input
                        type="text"
                        required
                        value={surveyForm.surveyNumber}
                        onChange={(e) => setSurveyForm({ ...surveyForm, surveyNumber: e.target.value })}
                        placeholder="125/2"
                        className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden font-bold text-slate-900 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5 font-sans">
                        State
                      </label>
                      <select
                        value={surveyForm.state}
                        onChange={(e) => setSurveyForm({ ...surveyForm, state: e.target.value })}
                        className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden font-normal text-slate-900 bg-white"
                      >
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Maharashtra">Maharashtra</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5 font-sans">
                        District
                      </label>
                      <input
                        type="text"
                        required
                        value={surveyForm.district}
                        onChange={(e) => setSurveyForm({ ...surveyForm, district: e.target.value })}
                        placeholder="Chennai"
                        className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden font-normal text-slate-900 bg-white"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-[#009b62] hover:bg-[#008755] text-white font-semibold text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Find My Land →</span>
                  </button>
                </form>
              </div>
            )}

            {/* Mode 2: I HAVE EXISTING GOVERNMENT IDs (Screenshot 3) */}
            {discoverySourceMode === "GOV_IDS" && (
              <div className="bg-white p-7 sm:p-9 rounded-2xl border border-slate-200 shadow-gis space-y-6">
                <p className="text-xs text-slate-500 leading-relaxed">
                  Enter any identifiers available to you. <strong>You do NOT need to fill all fields.</strong>
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setStage("RECORD_DISCOVERY_ANIMATION");
                  }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5 font-sans">
                        Revenue Patta / Khasra / 7-12 No (Optional)
                      </label>
                      <input
                        type="text"
                        value={govIds.districtId}
                        onChange={(e) => setGovIds({ ...govIds, districtId: e.target.value })}
                        placeholder="PT-88412"
                        className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-navy-900 focus:border-navy-900 outline-hidden font-mono text-slate-900 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5 font-sans">
                        Property Tax Assessment No (Optional)
                      </label>
                      <input
                        type="text"
                        value={govIds.taxId}
                        onChange={(e) => setGovIds({ ...govIds, taxId: e.target.value })}
                        placeholder="SCMC-Z04-W024"
                        className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-navy-900 focus:border-navy-900 outline-hidden font-mono text-slate-900 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5 font-sans">
                        Registration Document / Deed No (Optional)
                      </label>
                      <input
                        type="text"
                        value={govIds.registrationId}
                        onChange={(e) => setGovIds({ ...govIds, registrationId: e.target.value })}
                        placeholder="4129/2019"
                        className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-navy-900 focus:border-navy-900 outline-hidden font-mono text-slate-900 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5 font-sans">
                        ULPIN / Cadastral GIS ID (Optional)
                      </label>
                      <input
                        type="text"
                        value={govIds.gisId}
                        onChange={(e) => setGovIds({ ...govIds, gisId: e.target.value })}
                        placeholder="ULPIN-TN-33-02"
                        className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-navy-900 focus:border-navy-900 outline-hidden font-mono text-slate-900 bg-white"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-[#0b1320] hover:bg-slate-800 text-white font-semibold text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Search Connected Records →</span>
                  </button>
                </form>
              </div>
            )}

            {/* Direct Parcel ID Option */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setStage("ENTER_PARCEL_ID")}
                className="text-xs text-slate-500 hover:text-navy-950 font-medium underline underline-offset-4 cursor-pointer"
              >
                Already have a BhoomiSetu Parcel ID? Enter directly (e.g. BS-P00125) →
              </button>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════════
            STAGE 2: ENTER PARCEL ID FLOW (Direct Lookup)
           ══════════════════════════════════════════════════════════════════════════ */}
        {stage === "ENTER_PARCEL_ID" && (
          <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-gis max-w-xl mx-auto space-y-6 animate-fade-in">
            <div className="space-y-1 text-center">
              <span className="text-xs font-mono uppercase tracking-wider text-earth-700 font-bold">
                Direct Record Lookup
              </span>
              <h2 className="text-2xl font-bold text-navy-900">Enter Parcel ID</h2>
              <p className="text-xs text-slate-500">
                Format: <code>BS-P#####</code> (Demo default: <code>BS-P00125</code>)
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStage("PARCEL_ID_ANIMATING");
              }}
              className="space-y-4"
            >
              <div>
                <input
                  type="text"
                  required
                  value={parcelIdInput}
                  onChange={(e) => setParcelIdInput(e.target.value.toUpperCase())}
                  placeholder="BS-P00125"
                  className="block w-full text-center font-mono text-xl tracking-wider py-3.5 px-4 border-2 border-slate-300 rounded-xl focus:border-earth-600 focus:ring-2 focus:ring-earth-600/20 text-navy-900 font-bold uppercase"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={() => setStage("INITIAL_DECISION")}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="md" className="flex-1">
                  <span>Find Parcel</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </form>
          </div>
        )}


        {/* ══════════════════════════════════════════════════════════════════════════
            STAGE 6: RECORD DISCOVERY ANIMATION (Specification 14)
            Display: FINDING YOUR LAND
            ✓ Revenue
            ✓ Tax
            ✓ Registration
            ✓ GIS
            Identity Resolution ↓ Automatic Validation
           ══════════════════════════════════════════════════════════════════════════ */}
        {/* ══════════════════════════════════════════════════════════════════════════
            STAGE 6: RECORD DISCOVERY ANIMATION (Specification 4 & 14)
            Finding your land across connected systems
            ✓ Searching Revenue Records
            ✓ Searching Property Tax
            ✓ Searching Registration Records
            ✓ Searching GIS Records
            ✓ Records retrieved
            ● Resolving parcel identity & matching records
            ○ Generating BhoomiSetu parcel reference
           ══════════════════════════════════════════════════════════════════════════ */}
        {stage === "RECORD_DISCOVERY_ANIMATION" && (
          <div className="bg-navy-950 text-white p-8 sm:p-12 rounded-2xl border border-navy-800 shadow-2xl max-w-xl mx-auto space-y-8 text-center animate-fade-in">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-earth-400 font-bold">
                REAL-TIME DATA-FLOW GATEWAY
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-sans">
                Finding your land across connected systems
              </h2>
              <p className="text-xs text-slate-400">
                Querying sovereign state registries and digital cadastral repositories...
              </p>
            </div>

            {/* Pulsing Connected Nodes */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Revenue */}
              <div
                className={cn(
                  "p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all duration-500",
                  discoveryStep >= 1
                    ? "bg-navy-900 border-emerald-500/60 shadow-glow-green text-white"
                    : "bg-navy-900/50 border-navy-800 text-slate-500"
                )}
              >
                <Landmark className="w-5 h-5 text-emerald-400" />
                <span className="font-mono text-xs font-bold">Revenue</span>
                <span className="text-[10px]">
                  {discoveryStep >= 1 ? "✓ Connected" : "Querying..."}
                </span>
              </div>

              {/* Tax */}
              <div
                className={cn(
                  "p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all duration-500",
                  discoveryStep >= 2
                    ? "bg-navy-900 border-emerald-500/60 shadow-glow-green text-white"
                    : "bg-navy-900/50 border-navy-800 text-slate-500"
                )}
              >
                <Receipt className="w-5 h-5 text-emerald-400" />
                <span className="font-mono text-xs font-bold">Property Tax</span>
                <span className="text-[10px]">
                  {discoveryStep >= 2 ? "✓ Connected" : "Querying..."}
                </span>
              </div>

              {/* Registration */}
              <div
                className={cn(
                  "p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all duration-500",
                  discoveryStep >= 3
                    ? "bg-navy-900 border-emerald-500/60 shadow-glow-green text-white"
                    : "bg-navy-900/50 border-navy-800 text-slate-500"
                )}
              >
                <FileText className="w-5 h-5 text-emerald-400" />
                <span className="font-mono text-xs font-bold">Registration</span>
                <span className="text-[10px]">
                  {discoveryStep >= 3 ? "✓ Connected" : "Querying..."}
                </span>
              </div>

              {/* GIS */}
              <div
                className={cn(
                  "p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all duration-500",
                  discoveryStep >= 4
                    ? "bg-navy-900 border-emerald-500/60 shadow-glow-green text-white"
                    : "bg-navy-900/50 border-navy-800 text-slate-500"
                )}
              >
                <MapPin className="w-5 h-5 text-emerald-400" />
                <span className="font-mono text-xs font-bold">GIS Cadastral</span>
                <span className="text-[10px]">
                  {discoveryStep >= 4 ? "✓ Connected" : "Querying..."}
                </span>
              </div>
            </div>

            {/* Realistic Progress Sequence from Section 4 */}
            <div className="space-y-2.5 max-w-sm mx-auto text-left font-mono text-xs bg-navy-900/60 p-4 rounded-xl border border-navy-800">
              <div
                className={cn(
                  "flex items-center gap-2.5 transition-opacity duration-300",
                  discoveryStep >= 4 ? "text-emerald-400 opacity-100" : "text-slate-500 opacity-60"
                )}
              >
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Records retrieved from connected systems</span>
              </div>

              <div
                className={cn(
                  "flex items-center gap-2.5 transition-opacity duration-300",
                  discoveryStep >= 5
                    ? "text-emerald-400 opacity-100"
                    : discoveryStep === 4
                    ? "text-amber-400 opacity-100"
                    : "text-slate-600 opacity-40"
                )}
              >
                {discoveryStep >= 5 ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                ) : (
                  <RefreshCw className={cn("w-4 h-4 shrink-0", discoveryStep === 4 && "animate-spin")} />
                )}
                <span>
                  {discoveryStep >= 5
                    ? "Parcel identity resolved & matched ✓"
                    : "Normalizing & resolving parcel identity..."}
                </span>
              </div>

              <div
                className={cn(
                  "flex items-center gap-2.5 transition-opacity duration-300",
                  discoveryStep >= 5
                    ? "text-earth-400 font-bold opacity-100"
                    : "text-slate-600 opacity-40"
                )}
              >
                <Sparkles className={cn("w-4 h-4 shrink-0", discoveryStep >= 5 && "animate-pulse")} />
                <span>Generating BhoomiSetu Parcel ID...</span>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════════
            STAGE: PARCEL IDENTIFIED & BHOOMISETU PARCEL ID GENERATED
            Generated ONLY AFTER successful record identification across connected systems.
           ══════════════════════════════════════════════════════════════════════════ */}
        {stage === "PARCEL_IDENTIFIED" && discoveredParcel && (
          <div className="bg-white p-8 sm:p-10 rounded-2xl border-2 border-emerald-500/40 shadow-gis max-w-xl mx-auto text-center space-y-6 animate-fade-in">
            {/* Header / Success Indicator */}
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              </div>

              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  PARCEL IDENTIFIED
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-navy-900 tracking-tight">
                  Your parcel has been identified across connected records
                </h2>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Cross-registry record matching confirmed. A unique BhoomiSetu unified reference has been generated.
                </p>
              </div>
            </div>

            {/* Prominent BhoomiSetu Parcel ID Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white border border-navy-800 shadow-xl space-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-28 h-28 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                BHOOMISETU PARCEL ID
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-widest py-1 select-all">
                {discoveredParcel.parcelId}
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                Unified Parcel Reference • Generated post-identity resolution
              </p>
            </div>

            {/* Parcel Summary Details */}
            <div className="grid grid-cols-2 gap-3 text-left font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase text-slate-400 block font-semibold">Survey Number</span>
                <span className="font-bold text-navy-900 text-sm">{discoveredParcel.surveyNumber}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase text-slate-400 block font-semibold">Location</span>
                <span className="font-bold text-navy-900 text-sm truncate block">
                  {discoveredParcel.district}, {discoveredParcel.state}
                </span>
              </div>
            </div>

            {/* Sources Matched Chips */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 text-left">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[11px] uppercase font-bold text-slate-500">
                  Sources Matched
                </span>
                <span className="text-[11px] font-mono font-bold text-emerald-700">
                  {discoveredParcel.confidenceScore}% High Parity
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                <div className="p-2 rounded bg-white border border-emerald-200 text-emerald-800 font-semibold flex items-center justify-between">
                  <span>Revenue</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <div className="p-2 rounded bg-white border border-emerald-200 text-emerald-800 font-semibold flex items-center justify-between">
                  <span>Tax</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <div className="p-2 rounded bg-white border border-emerald-200 text-emerald-800 font-semibold flex items-center justify-between">
                  <span>Registration</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <div className="p-2 rounded bg-white border border-emerald-200 text-emerald-800 font-semibold flex items-center justify-between">
                  <span>GIS</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </div>
              </div>

              {/* Source-System IDs Distinction Note (Section 11) */}
              {discoveredParcel.sourceIdentifiers && (
                <div className="pt-2 text-[10px] font-mono text-slate-500 border-t border-slate-200 flex flex-wrap gap-x-4 gap-y-1">
                  <span>Patta: <strong className="text-slate-700">{discoveredParcel.sourceIdentifiers.revenuePatta}</strong></span>
                  <span>Tax: <strong className="text-slate-700">{discoveredParcel.sourceIdentifiers.taxAssessment}</strong></span>
                  <span>Deed: <strong className="text-slate-700">{discoveredParcel.sourceIdentifiers.registrationDeed}</strong></span>
                  <span>ULPIN: <strong className="text-slate-700">{discoveredParcel.sourceIdentifiers.gisUlpin}</strong></span>
                </div>
              )}
            </div>

            {/* Action Buttons with Back Support (Section 15) */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={() => {
                  // Safe Back: Return to discovery form without losing input
                  setStage("INITIAL_DECISION");
                }}
                className="sm:w-1/3"
              >
                ← Back
              </Button>

              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={() => {
                  // Continue to next stage with the newly generated Parcel ID
                  setStage("IDENTITY_RESOLUTION");
                }}
                className="flex-1"
              >
                <span>Continue to Land Records →</span>
              </Button>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════════
            STAGE 7: IDENTITY RESOLUTION (Specification 15)
            Display: IDENTIFYING YOUR PARCEL
            Checklist:
            Survey Number ✓
            Owner Name ✓
            District ✓
            Tax Reference ✓
            Registration ✓
            GIS Location ✓
            Geometry ✓
            Area ~
            Show: 96% HIGH CONFIDENCE
            Clarify: Record-matching confidence score, not legal ownership certainty.
           ══════════════════════════════════════════════════════════════════════════ */}
        {stage === "IDENTITY_RESOLUTION" && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-gis overflow-hidden animate-fade-in">
            <div className="bg-navy-950 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-navy-800">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-earth-400 font-bold">
                  STAGE 02: IDENTITY RESOLUTION
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                  IDENTIFYING YOUR PARCEL
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  Cross-registry probabilistic matching for Survey <strong>{discoveredParcel?.surveyNumber || "125/2"}</strong> ({discoveredParcel?.district || "Chennai"}, {discoveredParcel?.state || "Tamil Nadu"})
                </p>
              </div>

              <div className="p-4 rounded-xl bg-navy-900 border border-navy-700">
                <ConfidenceScore
                  score={96}
                  tier="HIGH CONFIDENCE"
                  size="md"
                  showDisclaimer={false}
                />
              </div>
            </div>

            {/* Checklist Table */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden text-xs">
                {[
                  { name: "Survey Number", status: "MATCHED", note: "125/2 perfectly matches Revenue, Reg & GIS" },
                  { name: "Owner Name", status: "MATCHED", note: "Ravi Kumar (s/o Late V. Ramanathan)" },
                  { name: "District", status: "MATCHED", note: "Salem, Salem Taluk, Kondalampatti" },
                  { name: "Tax Reference", status: "MATCHED", note: "Assessment ASMT-SLM-2023-8819 active" },
                  { name: "Registration", status: "MATCHED", note: "DOC-4192/2018 registered at SRO Salem" },
                  { name: "GIS Location", status: "MATCHED", note: "Lat 11.6234° N, Lng 78.1362° E verified" },
                  { name: "Geometry", status: "MATCHED", note: "Cadastral vertices align with survey sheet" },
                  { name: "Area", status: "PARTIAL", note: "Revenue (2.00 ac) vs GIS (1.87 ac) — Setback variance" },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors"
                  >
                    <div className="space-y-0.5">
                      <span className="font-mono font-bold text-navy-900 text-xs">
                        {item.name}
                      </span>
                      <p className="text-[11px] text-slate-500">{item.note}</p>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-xs">
                      {item.status === "MATCHED" ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>✓</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          <Clock className="w-3.5 h-3.5" />
                          <span>~</span>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Legal Disclaimer Box (Specification 15 requirement) */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs text-slate-600">
                <HelpCircle className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold text-navy-900">
                    Important Legal Notice on Confidence Scores:
                  </p>
                  <p className="text-[11px] leading-relaxed">
                    The <strong>96% High Confidence</strong> score represents probabilistic record-matching concordances across connected government databases. It does <strong>not</strong> represent statutory judicial title adjudication or state-guaranteed conclusive ownership.
                  </p>
                </div>
              </div>

              {/* Action Button to Next Step */}
              <div className="flex justify-end">
                <Button
                  onClick={() => setStage("AUTOMATIC_VALIDATION")}
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <span>Proceed to Automatic Validation →</span>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════════
            STAGE 8: AUTOMATIC VALIDATION (Specification 16)
            Compare available data.
            SURVEY NUMBER: Search 125/2, Revenue 125/2, Registration 125/2, GIS 125/2 -> ✓ CONSISTENT
            AREA: Revenue 2.00 acres, Tax 2.00 acres, GIS 1.87 acres -> ⚠ POTENTIAL INCONSISTENCY
            Never automatically reject because of a mismatch.
            Show: "Potential inconsistency detected. Your case has been sent for authorized officer verification."
           ══════════════════════════════════════════════════════════════════════════ */}
        {stage === "AUTOMATIC_VALIDATION" && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-gis overflow-hidden space-y-6 p-6 sm:p-8 animate-fade-in">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-earth-700 font-bold">
                STAGE 03: CROSS-SYSTEM PARITY CHECK
              </span>
              <h2 className="text-2xl font-bold text-navy-900 mt-1">
                Automatic Record Validation
              </h2>
              <p className="text-xs text-slate-500">
                Evaluating side-by-side consistency across linked registries.
              </p>
            </div>

            {/* Comparison 1: SURVEY NUMBER (Consistent) */}
            <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-navy-900">
                    SURVEY NUMBER
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>✓ CONSISTENT</span>
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                <div className="p-2 rounded bg-white border border-emerald-200">
                  <span className="text-[10px] text-slate-400 block">Search Input</span>
                  <span className="font-bold text-navy-900">{discoveredParcel?.surveyNumber || "125/2"}</span>
                </div>
                <div className="p-2 rounded bg-white border border-emerald-200">
                  <span className="text-[10px] text-slate-400 block">Revenue</span>
                  <span className="font-bold text-navy-900">{discoveredParcel?.surveyNumber || "125/2"}</span>
                </div>
                <div className="p-2 rounded bg-white border border-emerald-200">
                  <span className="text-[10px] text-slate-400 block">Registration</span>
                  <span className="font-bold text-navy-900">{discoveredParcel?.surveyNumber || "125/2"}</span>
                </div>
                <div className="p-2 rounded bg-white border border-emerald-200">
                  <span className="text-[10px] text-slate-400 block">GIS</span>
                  <span className="font-bold text-navy-900">{discoveredParcel?.surveyNumber || "125/2"}</span>
                </div>
              </div>
            </div>

            {/* Comparison 2: AREA (Potential Inconsistency) */}
            <div className="p-5 rounded-xl border border-amber-300 bg-amber-50/40 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-navy-900">
                    AREA EXTENT
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                  <span>⚠ POTENTIAL INCONSISTENCY</span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
                <div className="p-2 rounded bg-white border border-amber-200">
                  <span className="text-[10px] text-slate-400 block">Revenue Patta</span>
                  <span className="font-bold text-navy-900">2.00 acres</span>
                </div>
                <div className="p-2 rounded bg-white border border-amber-200">
                  <span className="text-[10px] text-slate-400 block">Tax Assessment</span>
                  <span className="font-bold text-navy-900">2.00 acres</span>
                </div>
                <div className="p-2 rounded bg-amber-100/50 border border-amber-300">
                  <span className="text-[10px] text-amber-800 block font-semibold">GIS Satellite Polygon</span>
                  <span className="font-bold text-amber-900">1.87 acres (-0.13 ac)</span>
                </div>
              </div>
            </div>

            {/* Routing Notice (Specification 16 requirement) */}
            <div className="p-5 rounded-xl bg-navy-900 text-white border border-navy-700 space-y-3">
              <div className="flex items-start gap-3">
                <Clock className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">
                    Potential inconsistency detected.
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Your case has been automatically sent for <strong>authorized officer verification</strong>. BhoomiSetu never rejects genuine parcels due to variance. A Tahsildar / Revenue Inspector will review the 0.13-acre road widening setback.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-navy-800 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono text-slate-400 gap-2">
                <span>Application Case Tracking ID: <strong>APP-10291</strong></span>
                <span className="text-earth-400 font-semibold">Assigned to: Tahsildar, Salem (Kondalampatti Jurisdiction)</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <Link
                href="/citizen"
                className="text-xs font-semibold text-slate-600 hover:text-navy-900"
              >
                ← Return to Citizen Dashboard
              </Link>

              <div className="flex gap-3 w-full sm:w-auto">
                <Link
                  href={`/citizen/parcel/${discoveredParcel?.parcelId || "BS-P00125"}`}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-earth-600 hover:bg-earth-500 text-white font-mono text-xs font-bold shadow-glow-green flex items-center justify-center gap-2 transition-all"
                >
                  <span>View Parcel 360° →</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
