"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Compass, User, Phone, Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push("/citizen");
    }, 450);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-neutral-surface relative overflow-hidden">
      <div className="absolute inset-0 bg-cadastral-grid opacity-60" />

      <div className="relative w-full max-w-md space-y-6 bg-white p-8 sm:p-10 rounded-2xl shadow-gis-lg border border-slate-200">
        <div className="text-center space-y-1.5">
          <img
            src="/favicon.svg"
            alt="BhoomiSetu Cadastral Emblem"
            className="w-12 h-12 rounded-xl mx-auto shadow-md"
          />
          <h2 className="text-2xl font-bold tracking-tight text-navy-900 font-sans">
            Register Citizen Account
          </h2>
          <p className="text-xs text-slate-500 font-mono uppercase tracking-wider">
            Access Unified Land Information
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider font-mono">
              Full Legal Name
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ravi Kumar"
                className="block w-full pl-9 pr-3 py-2 sm:text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:border-navy-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider font-mono">
              Mobile Number (Aadhaar / SMS OTP)
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="tel"
                required
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                placeholder="+91 98765 43210"
                className="block w-full pl-9 pr-3 py-2 sm:text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:border-navy-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider font-mono">
              Email Address
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="ravi.kumar@example.com"
                className="block w-full pl-9 pr-3 py-2 sm:text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:border-navy-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider font-mono">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-3.5 h-3.5" />
                </div>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="block w-full pl-8 pr-2.5 py-2 sm:text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:border-navy-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider font-mono">
                Confirm Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-3.5 h-3.5" />
                </div>
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                  className="block w-full pl-8 pr-2.5 py-2 sm:text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:border-navy-900"
                />
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2 pt-1 text-[11px] text-slate-500">
            <ShieldCheck className="w-4 h-4 text-earth-600 shrink-0 mt-0.5" />
            <span>
              By continuing, you acknowledge that BhoomiSetu acts as a digital interoperability layer federating public land records.
            </span>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            className="w-full mt-2"
          >
            <span>Create Account</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </form>

        <div className="text-center pt-2 border-t border-slate-100">
          <p className="text-xs text-slate-500">
            Already registered?{" "}
            <Link href="/login" className="font-semibold text-earth-700 hover:underline">
              Sign in to your account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
