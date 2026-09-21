import { ConflictRecord } from "@/types/officer";

export const MOCK_CONFLICTS: ConflictRecord[] = [
  {
    conflictId: "CONF-9014",
    caseId: "APP-10291",
    parcelId: "BS-P00125",
    surveyNumber: "125/2",
    title: "Structure Encroachment (8.5 sq m affected)",
    description:
      "Adjacent building (K. Selvam outbuilding B-03 on Survey 125/3) extends 8.5 sq m across eastern boundary into BS-P00125. Actual building footprint rendered underneath conflict demarcation.",
    severity: "CRITICAL",
    detectedAt: "13 AUG 2026, 11:00 AM",
    departmentA: {
      source: "GIS",
      value: "Building B-03 Footprint (15.0m × 8.5m)",
      documentRef: "High-Res Orthomosaic TN-SLM-2025",
    },
    departmentB: {
      source: "Revenue",
      value: "Survey 125/3 Eastern Lot Demarcation",
      documentRef: "Cadastral Sheet TN-SHEET-SLM-2024-K1",
    },
    suggestedAction:
      "Issue Form-IV Notice for Boundary Demarcation to Owner of Survey 125/3 (K. Selvam). Field inspection required.",
    status: "UNDER_INVESTIGATION",
  },
  {
    conflictId: "CONF-9011",
    caseId: "APP-10291",
    parcelId: "BS-P00125",
    surveyNumber: "125/2",
    title: "Cadastral Boundary Geometric Overlap (32 sq m)",
    description:
      "Selected parcel overlaps neighbouring parcel BS-P00126 (Survey 125/1, R. Meena) by 32 sq m along the northern boundary traverse.",
    severity: "CRITICAL",
    detectedAt: "13 AUG 2026, 10:45 AM",
    departmentA: {
      source: "Revenue",
      value: "Survey 125/2 Northern Demarcation",
      documentRef: "Patta Passbook TR-88219/2021",
    },
    departmentB: {
      source: "GIS",
      value: "Cadastral Boundary 32 sq m Overlap",
      documentRef: "Cadastral Sheet TN-SHEET-SLM-2024-K1",
    },
    suggestedAction:
      "Tahsildar Joint Resurvey under Section 9, TN Survey & Boundaries Act with Survey 125/1 claimant.",
    status: "UNDER_INVESTIGATION",
  },
  {
    conflictId: "CONF-9012",
    caseId: "APP-10291",
    parcelId: "BS-P00125",
    surveyNumber: "125/2",
    title: "Area Measurement Variance (0.13 Acre Delta)",
    description:
      "Recorded title area in Revenue Patta & Sale Deed is 2.00 acres, whereas digital satellite GIS polygon calculates 1.87 acres due to statutory 6.5m road-widening setback reserve under Salem Master Plan.",
    severity: "MODERATE",
    detectedAt: "13 AUG 2026, 11:15 AM",
    departmentA: {
      source: "Revenue",
      value: "2.00 Acres (0.8093 Hectares)",
      documentRef: "Patta Passbook TR-88219/2021",
    },
    departmentB: {
      source: "GIS",
      value: "1.87 Acres (Calculated Polygon)",
      documentRef: "Cadastral Sheet TN-SHEET-SLM-2024-K1",
    },
    suggestedAction:
      "Harmonize Patta Extent with Salem Master Plan Road Corridor Reserve and record statutory setback annotation.",
    status: "UNDER_INVESTIGATION",
  },
  {
    conflictId: "CONF-9015",
    caseId: "APP-10292",
    parcelId: "BS-P00318",
    surveyNumber: "210/1B",
    title: "Cadastral Boundary Geometric Overlap (0.12 Acres)",
    description:
      "Spatial polygon overlaps by 0.12 acres with adjacent Survey No. 210/1A on northern boundary. SRO records show an active title dispute caveat filed in 2023.",
    severity: "CRITICAL",
    detectedAt: "05 SEP 2026, 02:20 PM",
    departmentA: {
      source: "GIS",
      value: "Polygon overlaps Survey 210/1A by 0.12 acres",
      documentRef: "HARSAC High-Res Drone Orthomosaic 2024",
    },
    departmentB: {
      source: "Registration",
      value: "Active Injunction Order Caveat CV-882/2023",
      documentRef: "SRO Badshahpur Caveat Registry",
    },
    suggestedAction:
      "Summon Joint Inspection with Taluk Surveyor & notify both parcel claimants before proceeding with demarcation.",
    status: "OPEN",
  },
  {
    conflictId: "CONF-9018",
    caseId: "APP-10293",
    parcelId: "BS-P00412",
    surveyNumber: "45/3A",
    title: "Owner Name String Discrepancy Across Departmental Records",
    description:
      "Revenue Dharani record lists 'Venkat Rao Koppula' while Sale Deed registered in 2017 specifies 'Venkata Rao K'. Aadhaar/PAN linkage verified as identical holder.",
    severity: "MINOR",
    detectedAt: "15 AUG 2026, 09:40 AM",
    departmentA: {
      source: "Revenue",
      value: "Venkat Rao Koppula",
      documentRef: "Dharani Khata KH-99128",
    },
    departmentB: {
      source: "Registration",
      value: "Venkata Rao K",
      documentRef: "Registered Deed DOC-1192/2017",
    },
    suggestedAction:
      "Accept Aadhaar e-KYC affidavit proof and authorize standardized transliteration alias.",
    status: "UNDER_INVESTIGATION",
  },
];
