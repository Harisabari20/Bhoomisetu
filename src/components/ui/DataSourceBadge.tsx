import React from "react";
import { DepartmentSource } from "@/types/parcel";
import { Landmark, FileText, Receipt, MapPin, Building2, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataSourceBadgeProps {
  source: DepartmentSource | string;
  size?: "xs" | "sm" | "md";
  showIcon?: boolean;
  className?: string;
}

export function DataSourceBadge({
  source,
  size = "sm",
  showIcon = true,
  className,
}: DataSourceBadgeProps) {
  let icon = Landmark;
  let bg = "bg-slate-100 text-slate-700 border-slate-200";

  switch (source) {
    case "Revenue":
      icon = Landmark;
      bg = "bg-emerald-50 text-emerald-800 border-emerald-200";
      break;
    case "Registration":
      icon = FileText;
      bg = "bg-blue-50 text-blue-800 border-blue-200";
      break;
    case "Tax":
      icon = Receipt;
      bg = "bg-amber-50 text-amber-800 border-amber-200";
      break;
    case "GIS":
      icon = MapPin;
      bg = "bg-cyan-50 text-cyan-800 border-cyan-200";
      break;
    case "Municipal":
      icon = Building2;
      bg = "bg-indigo-50 text-indigo-800 border-indigo-200";
      break;
    case "Planning":
      icon = Layers;
      bg = "bg-purple-50 text-purple-800 border-purple-200";
      break;
  }

  const Icon = icon;

  const sizeClasses = {
    xs: "text-[10px] px-1.5 py-0.5 font-medium gap-1",
    sm: "text-[11px] px-2 py-0.5 font-medium gap-1.5",
    md: "text-xs px-2.5 py-1 font-semibold gap-1.5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded border font-mono uppercase tracking-wider transition-colors",
        sizeClasses[size],
        bg,
        className
      )}
      title={`Verified source: ${source} Department`}
    >
      {showIcon && <Icon className={size === "xs" ? "w-2.5 h-2.5" : "w-3 h-3"} />}
      <span>{source}</span>
    </span>
  );
}

export function DataSourceLineageGroup({
  sources,
  label = "Sources:",
  size = "xs",
  className,
}: {
  sources: DepartmentSource[];
  label?: string;
  size?: "xs" | "sm";
  className?: string;
}) {
  return (
    <div className={cn("inline-flex items-center flex-wrap gap-1.5", className)}>
      {label && <span className="text-[11px] text-slate-400 font-medium">{label}</span>}
      {sources.map((src) => (
        <DataSourceBadge key={src} source={src} size={size} />
      ))}
    </div>
  );
}
