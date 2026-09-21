import React from "react";
import { ShieldCheck, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConfidenceScoreProps {
  score: number; // 0 to 100
  tier?: string;
  size?: "sm" | "md" | "lg";
  showDisclaimer?: boolean;
  className?: string;
}

export function ConfidenceScore({
  score,
  tier = "HIGH CONFIDENCE",
  size = "md",
  showDisclaimer = false,
  className,
}: ConfidenceScoreProps) {
  const isHigh = score >= 90;
  const isMed = score >= 70 && score < 90;

  const colorStyle = isHigh
    ? {
        stroke: "#10B981",
        badge: "bg-emerald-500/10 text-emerald-700 border-emerald-300",
        pill: "text-emerald-700 font-semibold",
      }
    : isMed
    ? {
        stroke: "#D97706",
        badge: "bg-amber-500/10 text-amber-700 border-amber-300",
        pill: "text-amber-700 font-semibold",
      }
    : {
        stroke: "#DC2626",
        badge: "bg-rose-500/10 text-rose-700 border-rose-300",
        pill: "text-rose-700 font-semibold",
      };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center">
          <svg
            className={cn(
              "transform -rotate-90",
              size === "sm" ? "w-10 h-10" : size === "md" ? "w-16 h-16" : "w-20 h-20"
            )}
            viewBox="0 0 36 36"
          >
            <path
              className="text-slate-100"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="transition-all duration-1000 ease-out"
              strokeDasharray={`${score}, 100`}
              strokeWidth="3.5"
              strokeLinecap="round"
              stroke={colorStyle.stroke}
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span
              className={cn(
                "font-mono font-bold tracking-tight text-navy-900",
                size === "sm" ? "text-xs" : size === "md" ? "text-base" : "text-xl"
              )}
            >
              {score}%
            </span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            <span className={cn("font-mono uppercase tracking-wider text-xs px-2 py-0.5 rounded border", colorStyle.badge)}>
              {tier}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Cross-system parity match</p>
        </div>
      </div>

      {showDisclaimer && (
        <div className="flex items-start gap-2 p-2.5 rounded-md bg-slate-50 border border-slate-200 text-[11px] text-slate-600">
          <Info className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
          <span>
            <strong>Deterministic Record Matching:</strong> This score quantifies cryptographic and fuzzy concordance across connected public databases. It does not replace statutory judicial title adjudication.
          </span>
        </div>
      )}
    </div>
  );
}
