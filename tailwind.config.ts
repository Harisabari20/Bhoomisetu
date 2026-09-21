import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#070D1E",
          900: "#0B132B",
          850: "#111B38",
          800: "#1C2541",
          700: "#273456",
          600: "#3A4A73",
        },
        earth: {
          900: "#0D3823",
          800: "#0F5132",
          700: "#15803D",
          600: "#16A34A",
          500: "#10B981",
          400: "#34D399",
          100: "#DCFCE7",
          50: "#F0FDF4",
        },
        neutral: {
          base: "#FAFBFD",
          surface: "#F8FAFC",
          card: "#FFFFFF",
          border: "#E2E8F0",
          subtle: "#F1F5F9",
        },
        status: {
          verified: "#10B981",
          verifiedBg: "#ECFDF5",
          verifiedText: "#065F46",
          connected: "#2563EB",
          connectedBg: "#EFF6FF",
          connectedText: "#1E40AF",
          review: "#D97706",
          reviewBg: "#FFFBEB",
          reviewText: "#92400E",
          conflict: "#DC2626",
          conflictBg: "#FEF2F2",
          conflictText: "#991B1B",
          unavailable: "#64748B",
          unavailableBg: "#F1F5F9",
          unavailableText: "#334155",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "var(--font-jetbrains)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      boxShadow: {
        gis: "0 4px 20px -2px rgba(11, 19, 43, 0.08), 0 2px 6px -1px rgba(11, 19, 43, 0.04)",
        "gis-lg": "0 10px 30px -4px rgba(11, 19, 43, 0.12), 0 4px 12px -2px rgba(11, 19, 43, 0.06)",
        "glow-green": "0 0 15px -3px rgba(16, 185, 129, 0.3)",
        "glow-blue": "0 0 15px -3px rgba(37, 99, 235, 0.3)",
      },
      animation: {
        "pulse-subtle": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "ping-slow": "ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite",
        "flow-line": "flowLine 2s linear infinite",
      },
      keyframes: {
        flowLine: {
          "0%": { strokeDashoffset: "24" },
          "100%": { strokeDashoffset: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
