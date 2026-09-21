export interface DemoUser {
  id: string;
  name: string;
  role: "citizen" | "officer" | "admin";
  email: string;
  designation?: string;
  jurisdiction?: string;
  primaryParcelId: string;
  surveyNumber: string;
  pattaNumber?: string;
  phone: string;
  allowedParcels: string[];
  documentsCount: number;
}

export const DEMO_USERS: Record<string, DemoUser> = {
  ravi: {
    id: "ravi",
    name: "Ravi Kumar & Priya R. Kumar",
    role: "citizen",
    email: "ravi.kumar@bhoomisetu.gov.in",
    primaryParcelId: "BS-P00125",
    surveyNumber: "125/2",
    pattaNumber: "TR-88219/2024",
    phone: "+91 98402 12590",
    allowedParcels: ["BS-P00125"],
    documentsCount: 4,
  },
  selvam: {
    id: "selvam",
    name: "K. Selvam",
    role: "citizen",
    email: "k.selvam@bhoomisetu.gov.in",
    primaryParcelId: "BS-P00127",
    surveyNumber: "125/3",
    pattaNumber: "TR-88221/2024",
    phone: "+91 94432 99812",
    allowedParcels: ["BS-P00127"],
    documentsCount: 3,
  },
  meena: {
    id: "meena",
    name: "R. Meena",
    role: "citizen",
    email: "r.meena@bhoomisetu.gov.in",
    primaryParcelId: "BS-P00126",
    surveyNumber: "125/1",
    pattaNumber: "TR-88220/2024",
    phone: "+91 98410 44219",
    allowedParcels: ["BS-P00126"],
    documentsCount: 2,
  },
  officer: {
    id: "officer",
    name: "K. Senthil Nathan",
    role: "officer",
    email: "senthil.nathan@revenue.tn.gov.in",
    designation: "Tahsildar / District Revenue Officer",
    jurisdiction: "Salem Taluk, Salem District",
    primaryParcelId: "BS-P00125",
    surveyNumber: "125/2",
    phone: "+91 427 241 8800",
    allowedParcels: ["BS-P00125", "BS-P00127", "BS-P00126", "BS-P00124", "BS-P00123", "BS-P00128", "BS-P00132"],
    documentsCount: 18,
  },
  admin: {
    id: "admin",
    name: "Dr. A. Rajeshwari, IAS",
    role: "admin",
    email: "director.survey@tn.gov.in",
    designation: "Director of Survey and Settlement",
    jurisdiction: "Tamil Nadu Cadastral Repository",
    primaryParcelId: "BS-P00125",
    surveyNumber: "125/2",
    phone: "+91 44 2852 1100",
    allowedParcels: ["BS-P00125", "BS-P00127", "BS-P00126", "BS-P00124", "BS-P00123", "BS-P00128", "BS-P00132"],
    documentsCount: 42,
  },
};

export const DEFAULT_CITIZEN_USER = DEMO_USERS.ravi;
export const DEFAULT_OFFICER_USER = DEMO_USERS.officer;
