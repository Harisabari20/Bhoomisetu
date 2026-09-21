"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft, LogIn } from "lucide-react";

export default function OfficerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [role, setRole] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Check authenticated role in localStorage
    const savedRole = localStorage.getItem("bhoomi_auth_role");
    setRole(savedRole);
    setChecking(false);
  }, []);

  if (checking) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh] bg-neutral-surface">
        <div className="text-center space-y-2 font-mono text-xs text-slate-500">
          <div className="w-6 h-6 border-2 border-navy-900 border-t-transparent rounded-full animate-spin mx-auto" />
          <p>Verifying sovereign credentials...</p>
        </div>
      </div>
    );
  }

  // If user is authenticated as Citizen, BLOCK officer views
  if (role === "citizen") {
    return (
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-neutral-surface min-h-[calc(100vh-4rem)]">
        <div className="max-w-md w-full bg-white rounded-2xl border border-rose-200 shadow-2xl p-8 text-center space-y-6 animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto shadow-xs">
            <ShieldAlert className="w-8 h-8 text-rose-600" />
          </div>

          <div className="space-y-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-100 text-rose-800 border border-rose-200 uppercase tracking-wider">
              403 • ACCESS RESTRICTED
            </span>
            <h2 className="text-xl font-bold text-navy-900">
              Officer View Cannot Be Accessed by Citizen
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Statutory adjudication workspaces, evidence verification queues, and certificate minting tools are strictly restricted to authorized Revenue Officers (Tahsildars / DRO / Town Planning Authority).
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-left space-y-1 font-mono text-[11px] text-slate-600">
            <div className="flex justify-between">
              <span className="text-slate-400">Current Persona:</span>
              <strong className="text-navy-900">Citizen (Ravi Kumar)</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Required Role:</span>
              <strong className="text-rose-700">Revenue Officer / Tahsildar</strong>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href="/citizen"
              className="flex-1 px-4 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Citizen Portal</span>
            </Link>

            <Link
              href="/login"
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Officer Sign In</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Authorized officer
  return <>{children}</>;
}
