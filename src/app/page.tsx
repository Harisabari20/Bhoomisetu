import React from "react";
import Link from "next/link";
import {
  Compass,
  ArrowRight,
  ShieldCheck,
  Layers,
  Database,
  Search,
  CheckCircle2,
  AlertTriangle,
  FileText,
  MapPin,
  Building2,
  Eye,
  Workflow,
  Cpu,
  Fingerprint,
} from "lucide-react";
import { HeroGISGraphic } from "@/components/gis/HeroGISGraphic";

export default function LandingPage() {
  const disconnectedSystems = [
    {
      name: "Revenue Dept",
      record: "Patta / RoR / Khata",
      issue: "Updated manually, often lags deed execution by months",
      icon: "🏛️",
    },
    {
      name: "Registration SRO",
      record: "Registered Deeds & Conveyances",
      issue: "Records legal transactions without spatial validation",
      icon: "📜",
    },
    {
      name: "Municipal Tax",
      record: "Property Tax Assessments",
      issue: "Maintains urban assessments disconnected from survey numbers",
      icon: "🧾",
    },
    {
      name: "Cadastral Survey",
      record: "FMB / GIS Orthomosaic",
      issue: "Spatial coordinates rarely linked with registration deeds",
      icon: "🛰️",
    },
    {
      name: "Town Planning",
      record: "Master Plan & Zoning",
      issue: "Separate approval workflows leading to zoning ambiguities",
      icon: "📐",
    },
    {
      name: "Utility & Forest",
      record: "Easements & Encroachment Buffers",
      issue: "Buffer restrictions invisible during transaction time",
      icon: "🌲",
    },
  ];

  const steps = [
    {
      num: "01",
      title: "CONNECT",
      desc: "Queries distributed state registries via secure digital bridges with zero data replication.",
      detail: "Revenue Patta, SRO Deeds, Municipal Tax, and Survey GIS feeds.",
    },
    {
      num: "02",
      title: "IDENTIFY",
      desc: "Deterministic and fuzzy matching models resolve disparate records to one real-world plot.",
      detail: "Cross-checks owner names, survey/subdivisions, and spatial centroids.",
    },
    {
      num: "03",
      title: "VERIFY",
      desc: "Automated parity checks compare acreage, boundaries, encumbrances, and tax compliance.",
      detail: "Instantly flags area variances or boundary overlaps for Revenue Officer review.",
    },
    {
      num: "04",
      title: "UNIFY",
      desc: "Generates an immutable Unified Parcel ID and comprehensive Parcel 360° record.",
      detail: "Citizen sees one clear truth; officers inspect full evidentiary provenance.",
    },
  ];

  const capabilities = [
    {
      title: "Parcel Discovery",
      desc: "Find any plot using partial identifiers: Survey Number, Tax Assessment ID, Patta Number, or SRO Deed reference.",
      icon: Search,
      tag: "Discovery Engine",
    },
    {
      title: "Identity Resolution",
      desc: "Algorithmic entity resolution links disconnected departmental records into a singular, high-confidence parcel identity.",
      icon: Fingerprint,
      tag: "Resolution Core",
    },
    {
      title: "Cross-System Validation",
      desc: "Real-time consistency checks between land extent in deeds, Patta records, and physical boundary measurements.",
      icon: CheckCircle2,
      tag: "Validation Engine",
    },
    {
      title: "GIS Validation",
      desc: "Cadastral polygon geometry cross-referenced with satellite passes and drone orthomosaics to verify physical footprints.",
      icon: Layers,
      tag: "Spatial Cadastre",
    },
    {
      title: "Conflict Detection",
      desc: "Proactive spatial collision and title caveat detection flags overlapping claims before dispute escalation.",
      icon: AlertTriangle,
      tag: "Dispute Guard",
    },
    {
      title: "Evidence-Based Verification",
      desc: "Empowers Revenue Officers and Tahsildars with automated OCR extraction, deed schedule comparators, and audit trails.",
      icon: ShieldCheck,
      tag: "Officer Workspace",
    },
    {
      title: "Parcel 360°",
      desc: "The complete single-pane view of land: ownership provenance, tax status, cadastral map, encumbrances, and data lineage.",
      icon: Eye,
      tag: "Unified View",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-navy-950 text-white pt-12 pb-20 lg:pt-16 lg:pb-28 border-b border-navy-800">
        {/* Background cadastral grid & radial ambiance */}
        <div className="absolute inset-0 bg-cadastral-dark-grid opacity-30" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-earth-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Text */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-earth-500/10 border border-earth-500/30 text-earth-300 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-earth-400 animate-pulse-subtle" />
                <span className="font-semibold">NATIONAL LAND INTEROPERABILITY PLATFORM</span>
              </div>

              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-sans leading-[1.08]">
                  ONE LAND. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-earth-400 to-emerald-200">
                    ONE RECORD.
                  </span>{" "}
                  <br />
                  ONE INDIA.
                </h1>
                <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed pt-2">
                  Connect, verify and understand your land through one unified parcel-centric platform.
                </p>
              </div>

              <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
                BhoomiSetu does not replace state land registries. It bridges Revenue, Registration, Tax, and GIS systems to resolve parcel identity, eliminate silos, and deliver a trusted Parcel 360°.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  href="/citizen/discover"
                  className="px-6 py-3.5 rounded-lg bg-earth-600 hover:bg-earth-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-glow-green transition-all transform hover:-translate-y-0.5"
                >
                  <span>Discover My Land</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="#how-it-works"
                  className="px-6 py-3.5 rounded-lg bg-navy-850 hover:bg-navy-800 text-slate-200 border border-navy-700 font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Explore Platform</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-navy-800/80 flex items-center gap-6 text-xs text-slate-400 font-mono">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-earth-400" />
                  <span>OGC Standards Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-blue-400" />
                  <span>FastAPI Decoupled Gateway</span>
                </div>
              </div>
            </div>

            {/* Right Hero Graphic */}
            <div className="lg:col-span-6">
              <HeroGISGraphic />
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROBLEM SECTION */}
      <section className="py-16 sm:py-24 bg-neutral-surface border-b border-neutral-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-rose-600 font-bold">
              The Fragmentation Challenge
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
              "Your land data shouldn't live in silos."
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Across India, land information is fragmented across isolated government departments. When records don't talk to each other, citizens face title uncertainty, slow approvals, and inadvertent boundary conflicts.
            </p>
          </div>

          {/* Disconnected Systems Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {disconnectedSystems.map((item, idx) => (
              <div
                key={item.name}
                className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
              >
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-xl">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 font-semibold">
                    DISCONNECTED SILO
                  </span>
                </div>
                <h3 className="text-base font-bold text-navy-900 mt-3">{item.name}</h3>
                <p className="font-mono text-xs font-semibold text-slate-700 mt-0.5">
                  Holds: {item.record}
                </p>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {item.issue}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SOLUTION SECTION */}
      <section className="py-16 sm:py-24 bg-navy-950 text-white relative overflow-hidden border-b border-navy-800">
        <div className="absolute inset-0 bg-cadastral-dark-grid opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-mono uppercase tracking-widest text-earth-400 font-bold">
                The BhoomiSetu Paradigm
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                One parcel. Connected records.
              </h2>
              <p className="text-base text-slate-300 leading-relaxed">
                BhoomiSetu functions as a federated digital bridge. It continuously resolves and harmonizes records from Revenue, Registration, Municipal, and GIS departments into a deterministic parcel identity.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-navy-900 border border-navy-800">
                  <CheckCircle2 className="w-5 h-5 text-earth-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Non-Invasive Architecture</h4>
                    <p className="text-xs text-slate-400">
                      Zero database replacement. Authoritative records remain sovereign in state servers.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-navy-900 border border-navy-800">
                  <CheckCircle2 className="w-5 h-5 text-earth-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Deterministic Cadastral Parity</h4>
                    <p className="text-xs text-slate-400">
                      Physical survey bounds automatically reconcile with registered legal deed schedules.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-navy-900 border border-navy-800">
                  <CheckCircle2 className="w-5 h-5 text-earth-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Authorized Officer Review</h4>
                    <p className="text-xs text-slate-400">
                      Never auto-rejects on discrepancy. Automatically routes edge cases to Revenue Officers.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Transformation Diagram */}
            <div className="lg:col-span-6">
              <div className="p-6 rounded-2xl bg-navy-900/90 border border-navy-700/80 shadow-2xl space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-navy-800 text-xs font-mono text-slate-400">
                  <span>FEDERATION MODEL</span>
                  <span className="text-earth-400 font-bold">STATE → PARCEL RESOLUTION</span>
                </div>

                <div className="flex flex-col items-center gap-3 font-mono text-xs text-center">
                  <div className="grid grid-cols-3 gap-2 w-full">
                    <div className="p-2 rounded bg-navy-800 border border-navy-700 text-slate-300">
                      REVENUE
                    </div>
                    <div className="p-2 rounded bg-navy-800 border border-navy-700 text-slate-300">
                      REGISTRATION
                    </div>
                    <div className="p-2 rounded bg-navy-800 border border-navy-700 text-slate-300">
                      TAX
                    </div>
                  </div>

                  <div className="text-earth-400 font-bold text-sm">↓ CONNECT ↓</div>

                  <div className="w-full p-3 rounded-lg bg-earth-950/80 border border-earth-500/50 text-white font-bold flex items-center justify-center gap-2 shadow-glow-green">
                    <Compass className="w-4 h-4 text-earth-400" />
                    <span>BHOOMISETU INTEROPERABILITY LAYER</span>
                  </div>

                  <div className="text-earth-400 font-bold text-sm">↓ RESOLVE & VALIDATE ↓</div>

                  <div className="w-full p-4 rounded-xl bg-navy-950 border border-earth-400/80 text-white">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-earth-300 font-bold">
                        UNIFIED PARCEL ID: BS-P00125
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                        ✓ VERIFIED
                      </span>
                    </div>
                    <p className="text-sm font-bold mt-1 text-left">
                      Survey 125/2 • 2.00 Acres • Ravi Kumar
                    </p>
                    <p className="text-[11px] text-slate-400 text-left mt-0.5">
                      Single source of truth linking Revenue Patta, SRO Deed & Cadastral GIS.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-earth-700 font-bold">
              Workflow Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
              How BhoomiSetu Works
            </h2>
            <p className="text-base text-slate-600">
              Four structured phases that transform disconnected databases into verified land intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div
                key={step.num}
                className="p-6 rounded-xl bg-neutral-surface border border-slate-200 hover:border-earth-500/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-navy-900 text-white flex items-center justify-center font-mono text-base font-bold group-hover:bg-earth-700 transition-colors">
                    {step.num}
                  </div>
                  <h3 className="text-lg font-bold font-mono tracking-wide text-navy-900 mt-4 uppercase">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-mono text-slate-500">
                  {step.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CORE CAPABILITIES CARDS */}
      <section className="py-16 sm:py-24 bg-neutral-surface border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-earth-700 font-bold">
              Platform Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
              Core Capabilities
            </h2>
            <p className="text-base text-slate-600">
              High-precision tools for citizens, field surveyors, and revenue officers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.title}
                  className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-navy-900 text-earth-400 flex items-center justify-center group-hover:bg-earth-800 group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-semibold">
                        {cap.tag}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-navy-900">{cap.title}</h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {cap.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-earth-700 group-hover:text-earth-800">
                    <span>Explore module →</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. FINAL CALL TO ACTION */}
      <section className="py-20 bg-navy-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-cadastral-dark-grid opacity-25" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-earth-600 mx-auto flex items-center justify-center shadow-glow-green">
            <Compass className="w-7 h-7 text-white" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Discover your land.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Enter your Survey Number, Patta reference, or Parcel ID to experience the unified land intelligence of BhoomiSetu.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/citizen/discover"
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-earth-600 hover:bg-earth-500 text-white font-bold text-sm shadow-glow-green transition-all"
            >
              Discover My Land →
            </Link>

            <Link
              href="/officer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-slate-200 border border-navy-700 font-bold text-sm transition-colors"
            >
              Open Officer Workspace
            </Link>
          </div>

          <p className="text-xs text-slate-500 font-mono pt-4">
            No Aadhaar biometrics or payment required for initial record discovery.
          </p>
        </div>
      </section>
    </div>
  );
}
