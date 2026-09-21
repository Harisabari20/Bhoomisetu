import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StepItem {
  id: string;
  number: string; // e.g. "01"
  label: string; // e.g. "CONNECT"
  description?: string;
}

interface ProgressStepperProps {
  steps: StepItem[];
  currentStepIndex: number;
  className?: string;
  onStepClick?: (index: number) => void;
}

export function ProgressStepper({
  steps,
  currentStepIndex,
  className,
  onStepClick,
}: ProgressStepperProps) {
  return (
    <div className={cn("w-full py-4", className)}>
      <div className="flex items-center justify-between relative">
        {/* Background track line */}
        <div className="absolute top-5 left-8 right-8 h-0.5 bg-slate-200 -z-0" />
        <div
          className="absolute top-5 left-8 h-0.5 bg-earth-600 transition-all duration-500 ease-out -z-0"
          style={{
            width: `${(currentStepIndex / Math.max(1, steps.length - 1)) * 100}%`,
          }}
        />

        {steps.map((step, idx) => {
          const isCompleted = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;

          return (
            <div
              key={step.id}
              onClick={() => onStepClick && onStepClick(idx)}
              className={cn(
                "relative z-10 flex flex-col items-center group cursor-pointer transition-all",
                !onStepClick && "cursor-default"
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 border-2",
                  isCompleted
                    ? "bg-earth-600 border-earth-600 text-white"
                    : isCurrent
                    ? "bg-navy-900 border-earth-500 text-white shadow-glow-green scale-105"
                    : "bg-white border-slate-300 text-slate-400 group-hover:border-slate-400"
                )}
              >
                {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : step.number}
              </div>

              <div className="mt-2 text-center">
                <span
                  className={cn(
                    "text-xs font-mono tracking-wider font-semibold block uppercase",
                    isCurrent
                      ? "text-navy-900 font-bold"
                      : isCompleted
                      ? "text-earth-700"
                      : "text-slate-400"
                  )}
                >
                  {step.label}
                </span>
                {step.description && (
                  <span className="text-[10px] text-slate-500 hidden sm:block">
                    {step.description}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
