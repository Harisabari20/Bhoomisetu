import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "earth" | "outline" | "ghost" | "danger" | "nav";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center font-medium rounded-md transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none active:scale-[0.99]";

    const variants = {
      primary:
        "bg-navy-900 text-white hover:bg-navy-800 active:bg-navy-950 focus-visible:ring-navy-900 shadow-sm",
      secondary:
        "bg-white text-navy-900 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm",
      earth:
        "bg-earth-800 text-white hover:bg-earth-700 active:bg-earth-900 focus-visible:ring-earth-800 shadow-sm",
      outline:
        "border border-navy-900/30 text-navy-900 hover:bg-navy-900/5 focus-visible:ring-navy-900",
      ghost:
        "text-slate-600 hover:text-navy-900 hover:bg-slate-100/80 focus-visible:ring-slate-400",
      danger:
        "bg-rose-600 text-white hover:bg-rose-700 focus-visible:ring-rose-600 shadow-sm",
      nav:
        "text-slate-300 hover:text-white hover:bg-white/10 text-sm font-medium",
    };

    const sizes = {
      sm: "text-xs px-3 py-1.5 gap-1.5",
      md: "text-sm px-4 py-2.5 gap-2",
      lg: "text-base px-6 py-3 gap-2.5 font-semibold",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
