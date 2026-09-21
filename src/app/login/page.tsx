"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Compass, Shield, User, Lock, Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      // If identifier includes officer, route to officer, else citizen
      if (identifier.toLowerCase().includes("officer") || identifier.toLowerCase().includes("tahsildar") || identifier.toLowerCase().includes("revenue")) {
        localStorage.setItem("bhoomi_auth_role", "officer");
        router.push("/officer");
      } else {
        localStorage.setItem("bhoomi_auth_role", "citizen");
        router.push("/citizen");
      }
    }, 400);
  };

  const handleQuickLogin = (userId: string, targetPath: string) => {
    localStorage.setItem("bhoomi_auth_user", userId);
    localStorage.setItem("bhoomi_auth_role", userId === "officer" ? "officer" : "citizen");
    setIsLoading(true);
    setTimeout(() => router.push(targetPath), 300);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-neutral-surface relative overflow-hidden">
      {/* Background cadastral grid pattern */}
      <div className="absolute inset-0 bg-cadastral-grid opacity-60" />

      <div className="relative w-full max-w-lg space-y-8 bg-white p-8 sm:p-10 rounded-2xl shadow-gis-lg border border-slate-200">
        {/* Header */}
        <div className="text-center space-y-2">
          <img
            src="/favicon.svg"
            alt="BhoomiSetu Cadastral Emblem"
            className="w-12 h-12 rounded-xl mx-auto shadow-md"
          />
          <h2 className="text-2xl font-bold tracking-tight text-navy-900 font-sans">
            Sign In to BhoomiSetu
          </h2>
          <p className="text-xs text-slate-500 font-mono uppercase tracking-wider">
            One Land • One Record • One India
          </p>
        </div>

        {/* Quick Demo Access Toggles (4 Personas) */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-mono font-bold text-slate-600 uppercase tracking-wider">
              Select Demo Persona:
            </p>
            <span className="text-[10px] font-mono text-emerald-600 font-bold">
              User-Specific Cadastre
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin("ravi", "/citizen/parcel/BS-P00125")}
              className="px-3 py-2.5 rounded-lg bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-400 text-left transition-all flex items-center gap-2 group shadow-2xs"
            >
              <User className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-bold text-navy-900 group-hover:text-emerald-800 truncate">Ravi Kumar</p>
                <p className="text-[10px] text-slate-400 font-mono">BS-P00125 (125/2)</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin("selvam", "/citizen/parcel/BS-P00127")}
              className="px-3 py-2.5 rounded-lg bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-400 text-left transition-all flex items-center gap-2 group shadow-2xs"
            >
              <User className="w-4 h-4 text-amber-600 shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-bold text-navy-900 group-hover:text-amber-800 truncate">K. Selvam</p>
                <p className="text-[10px] text-slate-400 font-mono">BS-P00127 (125/3)</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin("meena", "/citizen/parcel/BS-P00126")}
              className="px-3 py-2.5 rounded-lg bg-white hover:bg-teal-50 border border-slate-200 hover:border-teal-400 text-left transition-all flex items-center gap-2 group shadow-2xs"
            >
              <User className="w-4 h-4 text-teal-600 shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-bold text-navy-900 group-hover:text-teal-800 truncate">R. Meena</p>
                <p className="text-[10px] text-slate-400 font-mono">BS-P00126 (125/1)</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin("officer", "/officer")}
              className="px-3 py-2.5 rounded-lg bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-400 text-left transition-all flex items-center gap-2 group shadow-2xs"
            >
              <Shield className="w-4 h-4 text-blue-600 shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-bold text-navy-900 group-hover:text-blue-800 truncate">Tahsildar</p>
                <p className="text-[10px] text-slate-400 font-mono">Revenue Officer</p>
              </div>
            </button>
          </div>
        </div>

        {/* Form */}
        <form className="mt-6 space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider font-mono">
              Email Address or Mobile Number
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="name@domain.gov.in or 9876543210"
                className="block w-full pl-9 pr-3 py-2.5 sm:text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:border-navy-900 transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider font-mono">
                Password
              </label>
              <a href="#" className="text-[11px] font-semibold text-earth-700 hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="block w-full pl-9 pr-3 py-2.5 sm:text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:border-navy-900 transition-colors"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            className="w-full font-semibold"
          >
            <span>Sign In to Platform</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </form>

        {/* Footer info */}
        <div className="text-center pt-2 border-t border-slate-100">
          <p className="text-xs text-slate-500">
            Don't have an account yet?{" "}
            <Link href="/signup" className="font-semibold text-earth-700 hover:underline">
              Register Citizen Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
