export type VerificationStatus =
  | "VERIFIED"
  | "UNDER_REVIEW"
  | "POTENTIAL_CONFLICT"
  | "CONNECTED"
  | "NOT_AVAILABLE";

export type DepartmentSource =
  | "Revenue"
  | "Registration"
  | "Tax"
  | "GIS"
  | "Planning"
  | "Municipal";

export interface SourceProvenance {
  department: DepartmentSource;
  systemName: string;
  recordId: string;
  syncedAt: string;
  status: "MATCHED" | "DISCREPANCY" | "UNAVAILABLE";
  confidenceScore: number;
}

export interface ParcelBoundaryPoint {
  lat: number;
  lng: number;
  surveyMarker?: string;
}

export interface ParcelGeoJSON {
  type: "Feature";
  properties: {
    parcelId: string;
    surveyNumber: string;
    areaAcres: number;
    color?: string;
  };
  geometry: {
    type: "Polygon";
    coordinates: number[][][]; // [lng, lat]
  };
}

export interface RevenueRecord {
  pattaNumber: string;
  khataNumber: string;
  ownerName: string;
  fatherOrSpouse: string;
  subDivision: string;
  village: string;
  taluk: string;
  district: string;
  state: string;
  landClassification: string; // e.g. "Ryotwari Dry", "Wet Agricultural", "Residential Urban"
  recordedAreaAcres: number;
  lastMutatedDate: string;
}

export interface RegistrationRecord {
  documentNumber: string;
  sroOffice: string;
  registrationYear: number;
  deedType: string; // e.g. "Absolute Sale Deed", "Partition Deed"
  executantName: string;
  claimantName: string;
  marketValueINR: number;
  considerationValueINR: number;
  guidelineValueINR: number;
  stampDutyPaidINR: number;
  encumbranceStatus: "NIL_ENCUMBRANCE" | "ACTIVE_MORTGAGE" | "UNDER_DISPUTE";
}

export interface TaxRecord {
  assessmentNumber: string;
  propertyTaxId: string;
  municipalBody: string;
  ownerName: string;
  annualTaxINR: number;
  paymentStatus: "PAID" | "PENDING" | "OVERDUE";
  lastPaymentDate: string;
  taxYear: string;
  constructedAreaSqFt?: number;
  vacantLandAreaAcres: number;
}

export interface GISRecord {
  gisParcelId: string;
  coordinates: {
    center: [number, number]; // [lat, lng]
    boundaryPoints: ParcelBoundaryPoint[];
  };
  calculatedAreaAcres: number;
  surroundingSurveys: {
    north: string;
    south: string;
    east: string;
    west: string;
  };
  cadastralMapSheet: string;
  droneSurveyDate?: string;
  satellitePassDate: string;
  zoneClassification: string;
}

export interface ParcelDocument {
  id: string;
  title: string;
  type: "PATTA_CHITTA" | "SALE_DEED" | "TAX_RECEIPT" | "FMB_SKETCH" | "ENCUMBRANCE_CERTIFICATE";
  issuingAuthority: string;
  dateOfIssue: string;
  fileSize: string;
  isVerified: boolean;
  ocrConfidence: number;
  verifiedFieldsMatched: number;
  totalFieldsExtracted: number;
  previewUrl?: string;
}

export interface BuildingDimensionRecord {
  approvalPlanNumber: string; // e.g. "SCMC/WD24/BLD/2022/88194"
  approvalAuthority: string; // "Salem City Municipal Corporation Town Planning"
  structureType: string; // "Reinforced Concrete Multi-Storey Villa / Commercial Facility"
  floors: string; // "G+2 Floors"
  totalHeightMeters: number; // 10.5 m (34.4 ft)
  
  // Plot Dimensions (Boundary lengths)
  plotDimensions: {
    northBoundaryMeters: number; // 90.0 m (295.3 ft)
    southBoundaryMeters: number; // 88.5 m (290.4 ft)
    eastBoundaryMeters: number; // 91.2 m (299.2 ft)
    westBoundaryMeters: number; // 89.8 m (294.6 ft)
    totalPlotAreaSqFt: number; // 87,120 sq.ft (2.00 Acres)
    totalPlotAreaSqMeters: number; // 8,093.7 sq.m
  };

  // House / Building Footprint (Plinth) Dimensions
  buildingFootprint: {
    lengthMeters: number; // 36.5 m (119.8 ft)
    widthMeters: number; // 25.9 m (85.0 ft)
    plinthAreaSqFt: number; // 10,183 sq.ft (946.0 sq.m)
    carpetAreaSqFt: number; // 8,655 sq.ft
    superBuiltUpAreaSqFt: number; // 25,450 sq.ft across 3 floors
    groundCoveragePercent: number; // 11.7% (Max Permissible: 35%)
    fsiRatio: number; // 0.29 (Max Permissible: 1.50)
  };

  // Statutory Setbacks
  setbacks: {
    frontRoadSetbackMeters: number; // 7.6 m (24.9 ft) [Statutory: 6.0 m] - COMPLIANT
    rearSetbackMeters: number; // 6.1 m (20.0 ft) [Statutory: 4.5 m] - COMPLIANT
    leftSideSetbackMeters: number; // 5.5 m (18.0 ft) [Statutory: 3.5 m] - COMPLIANT
    rightSideSetbackMeters: number; // 5.5 m (18.0 ft) [Statutory: 3.5 m] - COMPLIANT
    complianceStatus: "FULLY_COMPLIANT" | "SETBACK_ENCROACHMENT" | "UNDER_SCRUTINY";
  };

  // Structural Details
  roofType: string;
  compoundWallLengthMeters: number; // 359.5 m (1,179.5 ft)
  mainGateWidthMeters: number; // 6.0 m (19.7 ft)
  drivewayWidthMeters: number; // 4.5 m (14.8 ft)
  wallSchedule?: Array<{
    segment: string;
    fromCorner: string;
    toCorner: string;
    lengthMeters: number;
    description: string;
  }>;
}

export interface ParcelAuditEntry {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  system: DepartmentSource | "BHOOMISETU_CORE" | "OFFICER";
  status: "SUCCESS" | "WARNING" | "FLAGGED" | "RESOLVED";
  notes: string;
}

export interface ParcelData {
  parcelId: string; // e.g. BS-P00125
  surveyNumber: string; // e.g. 125/2
  subDivision?: string;
  district: string;
  state: string;
  villageOrLocality: string;
  areaAcres: number;
  verificationStatus: VerificationStatus;
  overallMatchConfidence: number; // e.g. 96
  legalOwnerName: string;
  coOwners?: string[];
  departmentSources: DepartmentSource[];
  lineage: {
    ownerSources: DepartmentSource[];
    areaSources: DepartmentSource[];
    geometrySources: DepartmentSource[];
    taxSources: DepartmentSource[];
  };
  revenue: RevenueRecord;
  registration: RegistrationRecord;
  tax: TaxRecord;
  gis: GISRecord;
  documents: ParcelDocument[];
  auditHistory: ParcelAuditEntry[];
  hasConflict: boolean;
  conflictSummary?: string;
  buildingDimensions?: BuildingDimensionRecord;
}

// ---------------------------------------------------------------------------
// SPECIFICATION 18: PARCEL 360° DATA ARCHITECTURE INTERFACES
// ---------------------------------------------------------------------------

export interface GeoJSONPolygon {
  type: "Polygon";
  coordinates: number[][][]; // standard GeoJSON [lng, lat]
}

export interface GeoJSONPoint {
  type: "Point";
  coordinates: number[]; // standard GeoJSON [lng, lat]
}

export interface Parcel {
  parcelId: string;
  ulpin: string;
  owner: string;
  surveyNumber: string;
  area: string;
  areaAcres: number;
  village: string;
  taluk: string;
  district: string;
  state: string;
  status: "Verified" | "Potential Inconsistency" | "Under Review";
  geometry: GeoJSONPolygon;
}

export interface NeighbourParcel {
  parcelId: string;
  owner: string;
  surveyNumber: string;
  area?: string;
  geometry: GeoJSONPolygon;
}

export interface Building {
  id: string;
  parcelId: string;
  name: string;
  type: "residential" | "commercial" | "outbuilding" | "shed";
  dimensions?: string;
  areaSqMeters?: number;
  geometry: GeoJSONPolygon;
  isEncroaching?: boolean;
}

export interface Conflict {
  id: string;
  parcelId: string;
  type: "Boundary Overlap" | "Structure Encroachment" | "Area Mismatch";
  severity: "HIGH" | "MEDIUM" | "LOW";
  description: string;
  affectedArea: string;
  relatedParcelId?: string;
  status: "Potential Inconsistency Detected" | "Under Review" | "Resolved";
  geometry: GeoJSONPolygon;
  centerPoint: [number, number]; // [lat, lng] for map panning / popup
  officerWorkflow: {
    status: "Verification Required" | "Review In Progress" | "Resolved";
    suggestedAction: string;
    statutoryRef?: string;
  };
}

export interface ParcelLayersConfig {
  parcelBoundaries: boolean;
  buildingStructures: boolean;
  surveyNumbers: boolean;
  conflictAreas: boolean;
  satelliteImagery: boolean;
  roads: boolean;
  utilities: boolean;
}

export interface ParcelGISFeatureCollection {
  type: "FeatureCollection";
  features: Array<{
    type: "Feature";
    properties: Record<string, any>;
    geometry: GeoJSONPolygon | GeoJSONPoint;
  }>;
}

