import React from "react";
import { VerificationStatus } from "@/types/parcel";
import { CheckCircle2, Clock, AlertTriangle, Link2, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: VerificationStatus | string;
  size?: "sm" | "md" | "lg";
  className?: string;
  showIcon?: boolean;
}

export function StatusBadge({
  status,
  size = "md",
  className,
  showIcon = true,
}: StatusBadgeProps) {
  const normStatus = status?.toUpperCase() || "NOT_AVAILABLE";

  let bg = "bg-slate-100 text-slate-700 border-slate-200";
  let label = "NOT AVAILABLE";
  let Icon = HelpCircle;

  if (normStatus === "VERIFIED" || normStatus === "MATCHED") {
    bg = "bg-emerald-50 text-emerald-800 border-emerald-300 ring-1 ring-emerald-500/20";
    label = "VERIFIED";
    Icon = CheckCircle2;
  } else if (normStatus === "UNDER_REVIEW" || normStatus === "PARTIAL") {
    bg = "bg-amber-50 text-amber-800 border-amber-300 ring-1 ring-amber-500/20";
    label = "UNDER REVIEW";
    Icon = Clock;
  } else if (normStatus === "POTENTIAL_CONFLICT" || normStatus === "CONFLICT" || normStatus === "MISMATCH") {
    bg = "bg-rose-50 text-rose-800 border-rose-300 ring-1 ring-rose-500/20";
    label = "POTENTIAL CONFLICT";
    Icon = AlertTriangle;
  } else if (normStatus === "CONNECTED") {
    bg = "bg-blue-50 text-blue-800 border-blue-300 ring-1 ring-blue-500/20";
    label = "CONNECTED";
    Icon = Link2;
  }

  const sizeClasses = {
    sm: "text-[11px] px-2 py-0.5 font-medium tracking-wide gap-1",
    md: "text-xs px-2.5 py-1 font-semibold tracking-wider gap-1.5",
    lg: "text-sm px-3.5 py-1.5 font-bold tracking-wider gap-2",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border shadow-sm transition-colors",
        sizeClasses[size],
        bg,
        className
      )}
      role="status"
      aria-label={`Status: ${label}`}
    >
      {showIcon && <Icon className={size === "sm" ? "w-3 h-3" : size === "md" ? "w-3.5 h-3.5" : "w-4 h-4"} />}
      <span className="uppercase font-mono text-[0.88em]">{label}</span>
    </span>
  );
}
