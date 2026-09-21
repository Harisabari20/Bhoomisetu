"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileCheck,
  ShieldAlert,
  Compass,
  FileText,
  History,
  Shield,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function OfficerSidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/officer", icon: LayoutDashboard },
    { name: "Verification Workspace", href: "/officer/verify/APP-10291", icon: FileCheck },
    { name: "Conflict Management", href: "/officer/conflicts", icon: ShieldAlert },
    { name: "GIS Explorer", href: "/gis", icon: Compass },
    { name: "Documents Repository", href: "/officer/documents", icon: FileText },
    { name: "Audit Logs", href: "/officer/audit", icon: History },
  ];

  return (
    <aside className="w-full md:w-64 bg-navy-950 text-slate-300 border-r border-navy-800 p-4 space-y-6 shrink-0">
      {/* Officer profile card */}
      <div className="p-3.5 rounded-xl bg-navy-900 border border-navy-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-900 text-blue-200 flex items-center justify-center font-bold text-sm shadow-sm">
            SO
          </div>
          <div className="overflow-hidden">
            <h3 className="text-xs font-bold text-white truncate">K. Senthil Nathan</h3>
            <p className="text-[11px] text-blue-400 font-mono">Tahsildar / DRO</p>
          </div>
        </div>
        <div className="mt-2.5 pt-2 border-t border-navy-800 flex items-center justify-between text-[10px] font-mono">
          <span className="text-slate-400">Jurisdiction:</span>
          <span className="text-white font-bold">Salem Hub (Taluk & DRO)</span>
        </div>
      </div>

      {/* Navigation list */}
      <nav className="space-y-1">
        <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 px-3 pb-1">
          Officer Menu
        </p>
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors",
                isActive
                  ? "bg-blue-600/20 text-blue-300 font-semibold border border-blue-500/40 shadow-sm"
                  : "text-slate-400 hover:text-white hover:bg-navy-900"
              )}
            >
              <Icon className={cn("w-4 h-4", isActive ? "text-blue-400" : "text-slate-500")} />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Sovereign Security Badge */}
      <div className="p-3 rounded-lg bg-navy-900/60 border border-navy-800/80 text-[11px] space-y-1 text-slate-400">
        <div className="flex items-center gap-1.5 text-blue-400 font-mono text-[10px] font-bold">
          <Shield className="w-3.5 h-3.5" />
          <span>Statutory Authority</span>
        </div>
        <p className="text-[10px] leading-relaxed">
          Decisions recorded here update the National Parcel Ledger with tamper-evident cryptographic hashes.
        </p>
      </div>
    </aside>
  );
}
