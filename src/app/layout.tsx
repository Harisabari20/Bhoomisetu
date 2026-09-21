import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { AppProviders } from "@/components/providers/AppProviders";

export const metadata: Metadata = {
  metadataBase: new URL("https://bhoomisetu.gov.in"),
  title: {
    default: "BhoomiSetu — One Land. One Record. One India.",
    template: "%s | BhoomiSetu — Sovereign Cadastral Intelligence",
  },
  description:
    "National Land Interoperability, Cadastral GIS & Sovereign Land Intelligence Platform for India. Authoritative boundary parity, multi-registry convergence, and spatial conflict verification.",
  keywords: [
    "BhoomiSetu",
    "Cadastral GIS",
    "Land Stack India",
    "ULPIN",
    "Survey Number",
    "FMB Sketch",
    "Land Records Verification",
    "Spatial Cadastre",
    "Patta Chitta",
    "Tamil Nadu Land Records",
  ],
  authors: [{ name: "Government of India — Department of Land Resources" }],
  creator: "BhoomiSetu National Land Intelligence Platform",
  publisher: "Digital India Land Records Modernization Programme",
  applicationName: "BhoomiSetu",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "BhoomiSetu — One Land. One Record. One India.",
    description:
      "National Land Interoperability, Cadastral GIS & Sovereign Land Intelligence Platform for India.",
    url: "https://bhoomisetu.gov.in",
    siteName: "BhoomiSetu",
    images: [
      {
        url: "/icon-512.png",
        width: 512,
        height: 512,
        alt: "BhoomiSetu Official Sovereign Cadastral Emblem",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BhoomiSetu — One Land. One Record. One India.",
    description:
      "National Land Interoperability, Cadastral GIS & Sovereign Land Intelligence Platform for India.",
    images: ["/icon-512.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0B866C" />
      </head>
      <body className="min-h-full flex flex-col antialiased bg-neutral-base text-navy-900 selection:bg-earth-100 selection:text-earth-900">
        <AppProviders>
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
