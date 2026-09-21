"use client";

import React from "react";
import Link from "next/link";
import { CitizenSidebar } from "@/components/navigation/CitizenSidebar";
import {
  Compass,
  FileSearch,
  BadgePercent,
  Receipt,
  MapPin,
  FileCheck,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function CitizenServicesPage() {
  const services = [
    {
      title: "Encumbrance Certificate (30-Year EC)",
      desc: "Instant cryptographic search of all registered transactions and mortgages.",
      tag: "SRO Interop",
      icon: FileSearch,
      link: "/citizen/parcel/BS-P00125",
    },
    {
      title: "Field Measurement Book (FMB) Sketch",
      desc: "Cadastral survey boundary sketch with vertex coordinates and tie-lines.",
      tag: "GIS Cadastre",
      icon: MapPin,
      link: "/gis",
    },
    {
      title: "Property Tax Clearance Certificate",
      desc: "Unified civic tax assessment receipt with zero outstanding arrears verification.",
      tag: "Municipal",
      icon: Receipt,
      link: "/citizen/parcel/BS-P00125",
    },
    {
      title: "Unified Parcel Identity Certificate",
      desc: "Official digital public infrastructure credential signed by District Revenue Officer.",
      tag: "BhoomiSetu DPI",
      icon: ShieldCheck,
      link: "/citizen/parcel/BS-P00125",
    },
  ];

  return (
    <div className="flex-1 flex flex-col md:flex-row bg-neutral-surface min-h-[calc(100vh-4rem)]">
      <CitizenSidebar />

      <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-900 font-sans">
            Citizen Land Services
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Apply for digital certificates, cadastral extracts, and cross-system clearances.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.title}
                className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-earth-600 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-navy-950 text-earth-400 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
                      {svc.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-navy-900">{svc.title}</h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    {svc.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 flex justify-end">
                  <Link
                    href={svc.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-earth-700 hover:text-earth-800"
                  >
                    <span>Request Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
