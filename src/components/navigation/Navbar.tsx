"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Compass,
  Layers,
  Shield,
  User,
  Building2,
  FileCheck,
  ChevronDown,
  Menu,
  X,
  Bell,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const { currentUser, currentRole, switchUser, allUsers } = useAuth();

  // Determine active section
  const isOfficerRoute = pathname.startsWith("/officer");
  const isCitizenRoute = pathname.startsWith("/citizen");

  const handleSelectUser = (userId: string) => {
    switchUser(userId);
    setRoleDropdownOpen(false);
    if (userId === "officer") {
      router.push("/officer");
    } else if (userId === "admin") {
      router.push("/gis");
    } else {
      const targetUser = allUsers.find((u) => u.id === userId);
      if (targetUser) {
        router.push(`/citizen/parcel/${targetUser.primaryParcelId}`);
      } else {
        router.push("/citizen");
      }
    }
  };

  const isOfficer = currentRole === "officer" || isOfficerRoute;

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* ══════════════════════════════════════════════════════════════════════════
          TOP MICRO-BAR: Reference Screenshot Design
          "● National Land Interoperability Layer • ONE LAND. ONE RECORD. ONE INDIA."
          "Demo Persona: [ Ravi Kumar | K. Selvam | R. Meena | Officer ]"
         ══════════════════════════════════════════════════════════════════════════ */}
      <div className="bg-[#051713] text-slate-300 px-4 sm:px-6 lg:px-8 py-1.5 text-xs flex flex-wrap items-center justify-between gap-2 border-b border-[#0b241e]">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-slate-200 text-[11px] sm:text-xs tracking-wide">
            National Land Interoperability Layer
          </span>
          <span className="text-slate-500">•</span>
          <span className="font-mono text-[10px] sm:text-[11px] tracking-wider text-emerald-400 uppercase font-bold">
            ONE LAND. ONE RECORD. ONE INDIA.
          </span>
        </div>

        {/* Demo Persona Segmented Toggle Pill */}
        <div className="flex items-center gap-1.5 font-sans overflow-x-auto">
          <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider hidden md:inline">
            Active Citizen / Officer:
          </span>
          <div className="inline-flex items-center bg-[#0b201a] rounded-md p-0.5 border border-emerald-900/50 text-[11px]">
            <button
              onClick={() => handleSelectUser("ravi")}
              title="Citizen: Ravi Kumar (Survey 125/2)"
              className={cn(
                "px-2 py-0.5 rounded font-semibold transition-all whitespace-nowrap",
                currentUser.id === "ravi"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-white"
              )}
            >
              Ravi (125/2)
            </button>
            <button
              onClick={() => handleSelectUser("selvam")}
              title="Citizen: K. Selvam (Survey 125/3)"
              className={cn(
                "px-2 py-0.5 rounded font-semibold transition-all whitespace-nowrap",
                currentUser.id === "selvam"
                  ? "bg-amber-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-white"
              )}
            >
              Selvam (125/3)
            </button>
            <button
              onClick={() => handleSelectUser("meena")}
              title="Citizen: R. Meena (Survey 125/1)"
              className={cn(
                "px-2 py-0.5 rounded font-semibold transition-all whitespace-nowrap",
                currentUser.id === "meena"
                  ? "bg-teal-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-white"
              )}
            >
              Meena (125/1)
            </button>
            <button
              onClick={() => handleSelectUser("officer")}
              title="Revenue Officer: Tahsildar Salem"
              className={cn(
                "px-2 py-0.5 rounded font-semibold transition-all whitespace-nowrap",
                currentUser.id === "officer"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-white"
              )}
            >
              Officer
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════════
          MAIN NAVBAR: Reference Screenshot Design
          Clean White Background, Emerald Logo, Nav Links, User Pill
         ══════════════════════════════════════════════════════════════════════════ */}
      <div className="bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo & Tagline */}
            <Link href="/" className="flex items-center gap-3 group">
              <img
                src="/favicon.svg"
                alt="BhoomiSetu Cadastral Emblem"
                className="w-10 h-10 rounded-xl shadow-xs group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col">
                <span className="text-base font-extrabold tracking-tight text-navy-950 font-sans leading-tight">
                  BHOOMI<span className="text-emerald-600">SETU</span>
                </span>
                <span className="text-[9px] text-slate-400 font-mono tracking-widest uppercase font-semibold leading-tight mt-0.5">
                  LAND INTELLIGENCE BRIDGE
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/gis"
                className={cn(
                  "text-xs font-semibold transition-colors hover:text-emerald-700",
                  pathname === "/gis" ? "text-emerald-700 font-bold" : "text-slate-600"
                )}
              >
                Explore
              </Link>
              <Link
                href="/citizen/discover"
                className={cn(
                  "text-xs font-semibold transition-colors hover:text-emerald-700",
                  pathname === "/citizen/discover" ? "text-emerald-700 font-bold" : "text-slate-600"
                )}
              >
                How It Works
              </Link>
              <Link
                href="/citizen"
                className={cn(
                  "text-xs font-semibold transition-colors hover:text-emerald-700",
                  pathname === "/citizen" ? "text-emerald-700 font-bold" : "text-slate-600"
                )}
              >
                About
              </Link>
              <Link
                href="/citizen/services"
                className={cn(
                  "text-xs font-semibold transition-colors hover:text-emerald-700",
                  pathname === "/citizen/services" ? "text-emerald-700 font-bold" : "text-slate-600"
                )}
              >
                Help
              </Link>
            </nav>

            {/* Right Controls: Notification Bell + User Profile Pill */}
            <div className="hidden md:flex items-center gap-4">
              {/* Notification Bell with indicator */}
              <button
                className="relative p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                title="Notifications"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
              </button>

              {/* User Persona Pill dropdown */}
              <div className="relative">
                <button
                  onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all text-left"
                  aria-expanded={roleDropdownOpen}
                >
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px]",
                      isOfficer
                        ? "bg-blue-100 text-blue-700"
                        : "bg-emerald-100 text-emerald-800"
                    )}
                  >
                    {currentUser.name.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-navy-950 leading-tight">
                      {currentUser.name.split(" ")[0]} {currentUser.name.split(" ")[1] ? currentUser.name.split(" ")[1].charAt(0) + "." : ""}
                    </span>
                    <span className="text-[10px] text-slate-500 leading-tight capitalize">
                      {currentUser.role === "officer" ? "Tahsildar (Officer)" : `Citizen (Survey ${currentUser.surveyNumber})`}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
                </button>

                {roleDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 rounded-xl bg-white border border-slate-200 shadow-xl py-2 z-50 animate-fade-in text-xs">
                    <div className="px-3.5 py-1.5 border-b border-slate-100 flex items-center justify-between">
                      <p className="text-[10px] text-slate-400 font-mono uppercase font-bold">
                        Switch Demo Account
                      </p>
                      <span className="text-[10px] font-mono text-earth-600 font-semibold">
                        Role-Based GIS
                      </span>
                    </div>

                    {allUsers.map((user) => {
                      const isSelected = currentUser.id === user.id;
                      return (
                        <button
                          key={user.id}
                          onClick={() => handleSelectUser(user.id)}
                          className={cn(
                            "w-full flex items-start gap-2.5 px-3.5 py-2 text-left hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0",
                            isSelected && "bg-emerald-50/70 border-l-2 border-l-emerald-600"
                          )}
                        >
                          {user.role === "officer" ? (
                            <Shield className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                          ) : (
                            <User className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="font-bold text-navy-950 truncate">{user.name}</p>
                              {isSelected && (
                                <span className="text-[10px] font-mono font-bold text-emerald-600">
                                  ACTIVE
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-slate-500 font-mono">
                              {user.role === "officer"
                                ? user.designation
                                : `${user.primaryParcelId} • Survey ${user.surveyNumber}`}
                            </p>
                          </div>
                        </button>
                      );
                    })}

                    <div className="border-t border-slate-100 mt-1 pt-1">
                      <Link
                        href="/login"
                        onClick={() => setRoleDropdownOpen(false)}
                        className="block px-3.5 py-1.5 text-slate-500 hover:text-navy-950 hover:bg-slate-50 text-[11px]"
                      >
                        Sign Out / Switch Identity
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile hamburger */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-slate-600 hover:text-navy-900 hover:bg-slate-100"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-5 space-y-2 bg-white border-b border-slate-200 shadow-lg text-xs">
          <Link
            href="/gis"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg font-medium text-slate-700 hover:bg-slate-50"
          >
            Explore Cadastre
          </Link>
          <Link
            href="/citizen/discover"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg font-medium text-slate-700 hover:bg-slate-50"
          >
            Discover Land
          </Link>
          <Link
            href="/citizen"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg font-medium text-slate-700 hover:bg-slate-50"
          >
            Citizen Dashboard
          </Link>
          <Link
            href="/citizen/documents"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg font-medium text-slate-700 hover:bg-slate-50"
          >
            Documents & OCR
          </Link>
          <Link
            href="/citizen/services"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg font-medium text-slate-700 hover:bg-slate-50"
          >
            Services
          </Link>
          {isOfficer && (
            <Link
              href="/officer"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg font-bold text-blue-700 bg-blue-50"
            >
              Officer Portal Workspace
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

