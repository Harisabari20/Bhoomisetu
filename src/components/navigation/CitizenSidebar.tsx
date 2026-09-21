"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Layers,
  Search,
  FileText,
  User,
  ShieldCheck,
  Building2,
  FileCheck,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function CitizenSidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/citizen", icon: LayoutDashboard },
    { name: "Discover Land", href: "/citizen/discover", icon: Search },
    { name: "Verification Status", href: "/citizen#verification-status", icon: FileCheck },
    { name: "Sample Parcel 360°", href: "/citizen/parcel/BS-P00125", icon: Layers },
    { name: "Documents & OCR", href: "/citizen/documents", icon: FileText },
    { name: "Digital Services", href: "/citizen/services", icon: Building2 },
    { name: "Citizen Profile", href: "/citizen#profile", icon: User },
  ];

  return (
    <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-5 space-y-6 shrink-0">
      {/* Top Banner Card from Reference Screenshot */}
      <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800">
            CITIZEN LAND PORTAL
          </span>
        </div>
        <p className="text-[11px] text-slate-500 mt-1">Single Window Land Service</p>
      </div>

      {/* Navigation list */}
      <nav className="space-y-1.5">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive =
            pathname === link.href ||
            (link.href.includes("/citizen/parcel") && pathname.startsWith("/citizen/parcel"));

          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group",
                isActive
                  ? "bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 shadow-xs"
                  : "text-slate-600 hover:text-navy-950 hover:bg-slate-50"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={cn(
                    "w-4 h-4 transition-colors",
                    isActive ? "text-emerald-700" : "text-slate-400 group-hover:text-slate-600"
                  )}
                />
                <span>{link.name}</span>
              </div>
              {isActive && <ChevronRight className="w-4 h-4 text-emerald-700 shrink-0" />}
            </Link>
          );
        })}
      </nav>

      {/* Interoperability trust seal */}
      <div className="p-3.5 rounded-xl bg-slate-900 text-white space-y-1.5 text-xs">
        <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[10px] font-bold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Sovereign Linkage</span>
        </div>
        <p className="text-[11px] text-slate-300 leading-relaxed">
          Your parcels are synchronized with Revenue Patta, STAR 2.0, and Salem SCMC databases.
        </p>
      </div>
    </aside>
  );
}

