import React from "react";
import Link from "next/link";
import { ParcelData } from "@/types/parcel";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DataSourceBadge } from "@/components/ui/DataSourceBadge";
import { ArrowRight, MapPin, Layers, ShieldCheck, AlertCircle } from "lucide-react";
import { formatAcreage } from "@/lib/utils";

interface ParcelCardProps {
  parcel: ParcelData;
}

export function ParcelCard({ parcel }: ParcelCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between group">
      <div>
        {/* Card Header: Parcel ID + Status */}
        <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <span className="text-xs font-mono font-bold text-earth-700 tracking-wider">
              {parcel.parcelId}
            </span>
            <h3 className="text-base font-bold text-navy-900 mt-0.5">
              Survey No. {parcel.surveyNumber}
            </h3>
          </div>
          <StatusBadge status={parcel.verificationStatus} size="sm" />
        </div>

        {/* Location & Metrics */}
        <div className="py-3.5 space-y-2 text-xs">
          <div className="flex items-center gap-1.5 text-slate-600">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{parcel.villageOrLocality}, {parcel.district}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 font-mono">
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-150">
              <span className="text-[10px] text-slate-400 uppercase block">Total Area</span>
              <span className="text-xs font-bold text-navy-900">
                {formatAcreage(parcel.areaAcres)}
              </span>
            </div>

            <div className="p-2 rounded-lg bg-slate-50 border border-slate-150">
              <span className="text-[10px] text-slate-400 uppercase block">Concordance</span>
              <span className="text-xs font-bold text-earth-700">
                {parcel.overallMatchConfidence}% Parity
              </span>
            </div>
          </div>

          {/* Department Sources Lineage */}
          <div className="pt-2">
            <span className="text-[10px] text-slate-400 font-mono block mb-1">
              Connected Registries:
            </span>
            <div className="flex flex-wrap gap-1">
              {parcel.departmentSources.map((src) => (
                <DataSourceBadge key={src} source={src} size="xs" />
              ))}
            </div>
          </div>

          {parcel.hasConflict && (
            <div className="mt-2 p-2 rounded-md bg-amber-50 border border-amber-200 text-[11px] text-amber-800 flex items-start gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
              <span className="line-clamp-2">{parcel.conflictSummary}</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer CTA */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] text-slate-400 font-mono">
          Holder: {parcel.legalOwnerName}
        </span>

        <Link
          href={`/citizen/parcel/${parcel.parcelId}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-900 group-hover:text-earth-700 transition-colors"
        >
          <span>View Parcel</span>
          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
