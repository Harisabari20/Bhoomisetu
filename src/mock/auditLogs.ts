export interface GlobalAuditLogItem {
  id: string;
  timestamp: string;
  parcelId: string;
  surveyNumber: string;
  action: string;
  actor: string;
  actorRole: "CITIZEN" | "OFFICER" | "SYSTEM_AI" | "GATEWAY";
  system: "BHOOMISETU_CORE" | "REVENUE" | "REGISTRATION" | "TAX" | "GIS" | "OFFICER_PORTAL" | "GATEWAY";
  status: "SUCCESS" | "WARNING" | "FLAGGED" | "RESOLVED" | "REJECTED";
  ipAddress: string;
  hashSignature: string;
  details: string;
}

export const MOCK_GLOBAL_AUDIT_LOGS: GlobalAuditLogItem[] = [
  {
    id: "TXN-88192",
    timestamp: "15 AUG 2026, 10:00 AM",
    parcelId: "BS-P00125",
    surveyNumber: "125/2",
    action: "Verification completed & Authorized",
    actor: "K. Senthil Nathan (Tahsildar)",
    actorRole: "OFFICER",
    system: "OFFICER_PORTAL",
    status: "RESOLVED",
    ipAddress: "10.45.12.89 (GovNet-TN)",
    hashSignature: "0x89f4b7...a19c",
    details: "Endorsed 0.13 ac road-widening setback. Approved Unified Parcel ID BS-P00125 certificate.",
  },
  {
    id: "TXN-88155",
    timestamp: "14 AUG 2026, 03:45 PM",
    parcelId: "BS-P00125",
    surveyNumber: "125/2",
    action: "Officer reviewed evidence and cadastral FMB",
    actor: "K. Senthil Nathan (Tahsildar)",
    actorRole: "OFFICER",
    system: "OFFICER_PORTAL",
    status: "FLAGGED",
    ipAddress: "10.45.12.89 (GovNet-TN)",
    hashSignature: "0x67e1a3...bc42",
    details: "Initiated multi-layer cadastral inspection. Reconciled Salem Master Plan NH-44 corridor expansion notification.",
  },
  {
    id: "TXN-88102",
    timestamp: "13 AUG 2026, 11:15 AM",
    parcelId: "BS-P00125",
    surveyNumber: "125/2",
    action: "Potential area mismatch detected (VAL-04)",
    actor: "BhoomiSetu Spatial AI Engine",
    actorRole: "SYSTEM_AI",
    system: "BHOOMISETU_CORE",
    status: "WARNING",
    ipAddress: "internal-service-bus",
    hashSignature: "0x34c9f1...58ef",
    details: "Discrepancy: Revenue Patta (2.00 ac) vs GIS Cadastral Polygon (1.87 ac). Routed to Officer queue APP-10291.",
  },
  {
    id: "TXN-88040",
    timestamp: "12 AUG 2026, 09:30 AM",
    parcelId: "BS-P00125",
    surveyNumber: "125/2",
    action: "Parcel discovered across connected systems",
    actor: "Citizen: Ravi Kumar",
    actorRole: "CITIZEN",
    system: "GATEWAY",
    status: "SUCCESS",
    ipAddress: "49.207.184.22",
    hashSignature: "0x12b8d0...e810",
    details: "Citizen queried Survey 125/2. Connected 4 systems (Revenue, Registration, Tax, GIS) with 96% identity confidence.",
  },
  {
    id: "TXN-87980",
    timestamp: "10 AUG 2026, 02:15 PM",
    parcelId: "BS-P00204",
    surveyNumber: "84/3",
    action: "Automated Parity Certification Minted",
    actor: "BhoomiSetu Auto-Validator",
    actorRole: "SYSTEM_AI",
    system: "BHOOMISETU_CORE",
    status: "SUCCESS",
    ipAddress: "internal-service-bus",
    hashSignature: "0x98aa45...71bb",
    details: "100% attribute parity verified across Bhoomi RTC, Kaveri 2.0 and BBMP PID. Parcel ID BS-P00204 activated.",
  },
];
