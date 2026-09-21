"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { CitizenSidebar } from "@/components/navigation/CitizenSidebar";
import {
  FileText,
  UploadCloud,
  CheckCircle2,
  FileCheck,
  Sparkles,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ExtractedDocData {
  fileName: string;
  surveyNumber: string;
  recordedOwner: string;
  deedExtent: string;
  documentRef: string;
  ocrConfidence: number;
  surveyMatchText: string;
  ownerMatchText: string;
  extentMatchText: string;
  refMatchText: string;
}

const DEFAULT_SAMPLE_EXTRACTIONS: Record<string, ExtractedDocData> = {
  deed: {
    fileName: "ssd syllabus.jpeg",
    surveyNumber: "125/2",
    recordedOwner: "Ravi Kumar & Priya R. Kumar",
    deedExtent: "2.00 acres",
    documentRef: "4129/2019/SRO-SALLUR",
    ocrConfidence: 98,
    surveyMatchText: "✓ Matches Patta",
    ownerMatchText: "✓ Matches STAR 2.0",
    extentMatchText: "✓ Matches Revenue",
    refMatchText: "✓ SRO Verified",
  },
  patta: {
    fileName: "Patta_Extract_PT-88412.pdf",
    surveyNumber: "125/2",
    recordedOwner: "Ravi Kumar",
    deedExtent: "2.00 acres (0.809 Hectares)",
    documentRef: "PT-88412/VELACHERY",
    ocrConfidence: 100,
    surveyMatchText: "✓ Matches Cadastre",
    ownerMatchText: "✓ Matches Aadhaar e-KYC",
    extentMatchText: "✓ Matches Revenue Chitta",
    refMatchText: "✓ State e-Patta Verified",
  },
  survey: {
    fileName: "FMB_Demarcation_Sketch_125_2.pdf",
    surveyNumber: "125/2",
    recordedOwner: "Ravi Kumar & Co-owners",
    deedExtent: "1.87 acres (Net of 0.13 ac Road Setback)",
    documentRef: "FMB-CHN-2022-8819",
    ocrConfidence: 95,
    surveyMatchText: "✓ DGPS Vertices Aligned",
    ownerMatchText: "✓ Field Verified",
    extentMatchText: "⚠ 0.13 ac Road Setback Noted",
    refMatchText: "✓ Survey Dept Verified",
  },
};

export default function CitizenDocumentsPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedDoc, setSelectedDoc] = useState<ExtractedDocData | null>(DEFAULT_SAMPLE_EXTRACTIONS.deed);
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleSelectPreset = (key: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      setSelectedDoc(DEFAULT_SAMPLE_EXTRACTIONS[key]);
      setIsProcessing(false);
    }, 450);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsProcessing(true);
      setTimeout(() => {
        setSelectedDoc({
          fileName: file.name,
          surveyNumber: "125/2",
          recordedOwner: "Ravi Kumar & Priya R. Kumar",
          deedExtent: "2.00 acres",
          documentRef: "4129/2019/SRO-SALLUR",
          ocrConfidence: 98,
          surveyMatchText: "✓ Matches Patta",
          ownerMatchText: "✓ Matches STAR 2.0",
          extentMatchText: "✓ Matches Revenue",
          refMatchText: "✓ SRO Verified",
        });
        setIsProcessing(false);
      }, 600);
    }
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row bg-slate-50/70 min-h-[calc(100vh-4rem)]">
      {/* Sidebar matching screenshot 2 */}
      <CitizenSidebar />

      {/* Main Content Area */}
      <div className="flex-1 p-5 sm:p-8 max-w-5xl space-y-8">
        {/* Header Section */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-emerald-700">
              SUPPORTING EVIDENCE & OCR
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950 font-sans tracking-tight">
            Document Repository & AI Extraction
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
            Upload deed PDFs, patta scans, or settlement sketches to corroborate with state registries
          </p>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════════
            CARD 1: Supporting Document & OCR Verification
           ══════════════════════════════════════════════════════════════════════════ */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-7 space-y-6">
          {/* Card Title & Format Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200/60">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-navy-950 font-sans">
                  Supporting Document & OCR Verification
                </h2>
                <p className="text-[11px] text-slate-500">
                  Documents are optional supporting evidence. Upload a deed or patta to automatically extract and verify against <strong>BS-P00125</strong> government records.
                </p>
              </div>
            </div>

            <span className="self-start sm:self-center px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold bg-slate-100 text-slate-600 border border-slate-200">
              PDF • JPG • PNG (Up to 15MB)
            </span>
          </div>

          {/* Active Extraction Result OR Upload Box */}
          {selectedDoc && !isProcessing ? (
            <div className="space-y-5">
              {/* Document status bar */}
              <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-navy-950 font-mono">
                        {selectedDoc.fileName}
                      </span>
                    </div>
                    <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                      <span>✓ Document Received & OCR Completed ({selectedDoc.ocrConfidence}% Confidence)</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setSelectedDoc(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 underline underline-offset-4 cursor-pointer"
                  >
                    Upload Another
                  </button>
                </div>
              </div>

              {/* EXTRACTED INFORMATION Grid (4 Cards from Screenshot 2) */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400 block">
                  EXTRACTED INFORMATION
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {/* Metric 1: Survey Number */}
                  <div className="p-4 rounded-xl bg-slate-50/60 border border-slate-200 space-y-1">
                    <span className="text-[11px] text-slate-500 font-sans block">Survey Number</span>
                    <p className="text-sm font-bold text-navy-950 font-mono">{selectedDoc.surveyNumber}</p>
                    <span className="text-[11px] text-emerald-700 font-semibold block pt-0.5">
                      {selectedDoc.surveyMatchText}
                    </span>
                  </div>

                  {/* Metric 2: Recorded Owner */}
                  <div className="p-4 rounded-xl bg-slate-50/60 border border-slate-200 space-y-1">
                    <span className="text-[11px] text-slate-500 font-sans block">Recorded Owner</span>
                    <p className="text-sm font-bold text-navy-950 font-sans truncate">{selectedDoc.recordedOwner}</p>
                    <span className="text-[11px] text-emerald-700 font-semibold block pt-0.5">
                      {selectedDoc.ownerMatchText}
                    </span>
                  </div>

                  {/* Metric 3: Deed Extent */}
                  <div className="p-4 rounded-xl bg-slate-50/60 border border-slate-200 space-y-1">
                    <span className="text-[11px] text-slate-500 font-sans block">Deed Extent</span>
                    <p className="text-sm font-bold text-navy-950 font-mono">{selectedDoc.deedExtent}</p>
                    <span className="text-[11px] text-emerald-700 font-semibold block pt-0.5">
                      {selectedDoc.extentMatchText}
                    </span>
                  </div>

                  {/* Metric 4: Document Ref */}
                  <div className="p-4 rounded-xl bg-slate-50/60 border border-slate-200 space-y-1">
                    <span className="text-[11px] text-slate-500 font-sans block">Document Ref</span>
                    <p className="text-sm font-bold text-navy-950 font-mono truncate">{selectedDoc.documentRef}</p>
                    <span className="text-[11px] text-emerald-700 font-semibold block pt-0.5">
                      {selectedDoc.refMatchText}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : isProcessing ? (
            <div className="p-10 rounded-2xl border border-slate-200 bg-slate-50 text-center space-y-3">
              <div className="w-10 h-10 rounded-full border-2 border-emerald-600 border-t-transparent animate-spin mx-auto" />
              <p className="text-xs font-mono text-slate-600">Running AI OCR parsing & cross-referencing...</p>
            </div>
          ) : (
            /* Upload Dropzone (Screenshot 1) */
            <div className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="hidden"
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  const file = e.dataTransfer.files?.[0];
                  if (file) {
                    setIsProcessing(true);
                    setTimeout(() => {
                      setSelectedDoc({
                        fileName: file.name,
                        surveyNumber: "125/2",
                        recordedOwner: "Ravi Kumar & Priya R. Kumar",
                        deedExtent: "2.00 acres",
                        documentRef: "4129/2019/SRO-SALLUR",
                        ocrConfidence: 98,
                        surveyMatchText: "✓ Matches Patta",
                        ownerMatchText: "✓ Matches STAR 2.0",
                        extentMatchText: "✓ Matches Revenue",
                        refMatchText: "✓ SRO Verified",
                      });
                      setIsProcessing(false);
                    }, 500);
                  }
                }}
                className={cn(
                  "border-2 border-dashed rounded-2xl p-8 sm:p-10 text-center transition-all cursor-pointer",
                  dragOver
                    ? "border-emerald-500 bg-emerald-50/50"
                    : "border-slate-300 hover:border-emerald-500 bg-slate-50/40 hover:bg-slate-50"
                )}
              >
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3 border border-emerald-200">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-navy-950">
                  Drop your deed or patta document here, or{" "}
                  <span className="text-emerald-700 underline underline-offset-2">Browse Files</span>
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Supports Registered Sale Deed, Patta Passbook, 7/12 Extract, Survey Demarcation Sketch
                </p>
              </div>

              {/* Sample Presets Strip (Screenshot 1) */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-700">
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold">Test with Sample Document Presets:</span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleSelectPreset("deed")}
                    className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-xs font-mono text-slate-800 transition-colors shadow-2xs"
                  >
                    1. Registered Sale Deed (2.00 ac)
                  </button>
                  <button
                    onClick={() => handleSelectPreset("patta")}
                    className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-xs font-mono text-slate-800 transition-colors shadow-2xs"
                  >
                    2. Patta Passbook (PT-88412)
                  </button>
                  <button
                    onClick={() => handleSelectPreset("survey")}
                    className="px-3 py-1.5 rounded-lg bg-white hover:bg-amber-50 border border-amber-300 text-xs font-mono text-amber-900 transition-colors shadow-2xs"
                  >
                    3. Survey Demarcation (1.87 ac)
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ══════════════════════════════════════════════════════════════════════════
            CARD 2: Verified Documents on File (BS-P00125) (Screenshot 1 & 2)
           ══════════════════════════════════════════════════════════════════════════ */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-navy-950 font-sans">
            Verified Documents on File (BS-P00125)
          </h2>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
            {/* Primary uploaded file (ssd syllabus.jpeg) */}
            <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200 shrink-0">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-navy-950 font-mono">
                    ssd syllabus.jpeg
                  </h3>
                  <p className="text-[11px] text-slate-500 font-sans mt-0.5">
                    Doc No: 4129/2019/SRO SALLUR • Survey: 125/2 • Owner: Ravi Kumar & Priya R. Kumar
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  OCR CONFIDENCE: 98%
                </span>
                <Link
                  href="/citizen/parcel/BS-P00125"
                  className="px-3 py-1.5 rounded-lg bg-navy-950 hover:bg-navy-900 text-white font-semibold text-xs transition-colors"
                >
                  View in 360°
                </Link>
              </div>
            </div>

            {/* Additional verified document on file */}
            <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200 shrink-0">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-navy-950 font-mono">
                    Patta_Passbook_PT88412.pdf
                  </h3>
                  <p className="text-[11px] text-slate-500 font-sans mt-0.5">
                    Doc No: PT-88412 • Survey: 125/2 • Revenue Authority Salem • Extent: 2.00 ac
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  OCR CONFIDENCE: 100%
                </span>
                <Link
                  href="/citizen/parcel/BS-P00125"
                  className="px-3 py-1.5 rounded-lg bg-navy-950 hover:bg-navy-900 text-white font-semibold text-xs transition-colors"
                >
                  View in 360°
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

