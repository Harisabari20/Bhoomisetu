import React from "react";
import Link from "next/link";
import { Compass, ShieldCheck, Database, MapPin, Award } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-navy-800 text-xs">
      {/* Upper connected systems strip */}
      <div className="border-b border-navy-800/60 bg-navy-900/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-earth-400 font-bold">
                Connected Registries:
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 text-slate-400 font-mono text-[11px]">
              <span className="px-2.5 py-1 rounded bg-navy-800/80 border border-navy-700/60">
                Land Revenue (Patta/RoR)
              </span>
              <span className="text-slate-600">•</span>
              <span className="px-2.5 py-1 rounded bg-navy-800/80 border border-navy-700/60">
                Registration Dept (SRO Deeds)
              </span>
              <span className="text-slate-600">•</span>
              <span className="px-2.5 py-1 rounded bg-navy-800/80 border border-navy-700/60">
                Municipal Property Tax
              </span>
              <span className="text-slate-600">•</span>
              <span className="px-2.5 py-1 rounded bg-navy-800/80 border border-navy-700/60">
                Survey & Cadastral GIS
              </span>
              <span className="text-slate-600">•</span>
              <span className="px-2.5 py-1 rounded bg-navy-800/80 border border-navy-700/60">
                Town & Country Planning
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <img
                src="/favicon.svg"
                alt="BhoomiSetu Cadastral Emblem"
                className="w-8 h-8 rounded-lg shadow-xs"
              />
              <span className="text-base font-bold text-white font-sans">
                Bhoomi<span className="text-earth-400">Setu</span>
              </span>
            </div>
            <p className="font-mono text-xs text-earth-300 font-semibold tracking-wider">
              ONE LAND. ONE RECORD. ONE INDIA.
            </p>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              A national digital public infrastructure platform for parcel identity resolution, cross-system validation, and unified land intelligence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-3">
              Citizen Services
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <Link href="/citizen/discover" className="hover:text-earth-300 transition-colors">
                  Discover My Land (Survey Search)
                </Link>
              </li>
              <li>
                <Link href="/citizen" className="hover:text-earth-300 transition-colors">
                  Citizen Dashboard
                </Link>
              </li>
              <li>
                <Link href="/citizen/parcel/BS-P00125" className="hover:text-earth-300 transition-colors">
                  Sample Parcel 360° View
                </Link>
              </li>
              <li>
                <Link href="/gis" className="hover:text-earth-300 transition-colors">
                  National Cadastral Map Viewer
                </Link>
              </li>
            </ul>
          </div>

          {/* Officer Portal */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-3">
              Institutional & Officers
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <Link href="/officer" className="hover:text-blue-300 transition-colors">
                  Officer Verification Workspace
                </Link>
              </li>
              <li>
                <Link href="/officer/conflicts" className="hover:text-blue-300 transition-colors">
                  Spatial & Boundary Conflict Hub
                </Link>
              </li>
              <li>
                <Link href="/officer/audit" className="hover:text-blue-300 transition-colors">
                  Tamper-Evident Audit Logs
                </Link>
              </li>
              <li>
                <span className="text-slate-500">FastAPI REST Gateway (v1.4 OpenAPI)</span>
              </li>
            </ul>
          </div>

          {/* Standards & Certifications */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-3">
              Standards & Security
            </h4>
            <div className="p-3 rounded-lg bg-navy-900 border border-navy-800 text-[11px] space-y-1.5">
              <div className="flex items-center gap-2 text-earth-300 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Zero-Data Duplication Arch</span>
              </div>
              <p className="text-slate-400 text-[10px] leading-relaxed">
                Records stay in authoritative state databases. BhoomiSetu maintains sovereign cryptographic pointers and identity resolution hashes.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-navy-900 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px] gap-3">
          <p>© 2026 BhoomiSetu Platform. Digital Public Infrastructure initiative for Land Interoperability.</p>
          <div className="flex items-center gap-4">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>API Documentation</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
