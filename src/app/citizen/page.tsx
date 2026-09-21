import React from "react";
import Link from "next/link";
import { CitizenSidebar } from "@/components/navigation/CitizenSidebar";
import { ParcelCard } from "@/components/parcel/ParcelCard";
import { getAllCitizenParcels } from "@/services/parcelService";
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  Search,
  Plus,
  ArrowRight,
  ShieldCheck,
  Compass,
} from "lucide-react";

export default async function CitizenDashboardPage() {
  const parcels = await getAllCitizenParcels();

  const verifiedCount = parcels.filter((p) => p.verificationStatus === "VERIFIED").length;
  const reviewCount = parcels.filter((p) => p.verificationStatus === "UNDER_REVIEW").length;
  const conflictCount = parcels.filter((p) => p.verificationStatus === "POTENTIAL_CONFLICT").length;

  return (
    <div className="flex-1 flex flex-col md:flex-row bg-neutral-surface min-h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <CitizenSidebar />

      {/* Main Content Area */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight font-sans">
              Good morning, Ravi Kumar.
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Your land, connected and verified through BhoomiSetu.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/citizen/discover"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-earth-600 hover:bg-earth-500 text-white font-semibold text-xs shadow-glow-green transition-all"
            >
              <Search className="w-4 h-4" />
              <span>Discover / Add Land</span>
            </Link>
          </div>
        </div>

        {/* Stats Metrics Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Verified Parcels
              </span>
              <p className="text-2xl font-bold font-mono text-emerald-700 mt-1">
                {verifiedCount}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">Parity confirmed across registries</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Under Review
              </span>
              <p className="text-2xl font-bold font-mono text-amber-700 mt-1">
                {reviewCount}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">Assigned to Revenue Officer</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Potential Conflicts
              </span>
              <p className="text-2xl font-bold font-mono text-rose-700 mt-1">
                {conflictCount}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">Boundary or title notices</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-200">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Signature Action Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-navy-950 via-navy-900 to-navy-850 text-white border border-navy-800 shadow-gis flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-earth-400">
              SIGNATURE CITIZEN FLOW
            </span>
            <h3 className="text-lg font-bold text-white">
              Do you already have a Parcel ID?
            </h3>
            <p className="text-xs text-slate-300 max-w-xl">
              Lookup your land immediately with your BhoomiSetu Parcel ID, or discover your land using your Survey Number, Patta, or Tax ID.
            </p>
          </div>

          <Link
            href="/citizen/discover"
            className="px-5 py-2.5 rounded-lg bg-earth-600 hover:bg-earth-500 text-white text-xs font-bold font-mono shadow-glow-green shrink-0 flex items-center gap-2 transition-all"
          >
            <span>Launch Flow →</span>
          </Link>
        </div>

        {/* My Parcels Grid */}
        <div id="my-parcels" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-navy-900 font-sans">
                My Registered Parcels
              </h2>
              <p className="text-xs text-slate-500">
                Showing all plots linked to your citizen profile.
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400">
              {parcels.length} Records Connected
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {parcels.map((parcel) => (
              <ParcelCard key={parcel.parcelId} parcel={parcel} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
