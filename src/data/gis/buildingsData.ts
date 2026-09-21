import { SpatialBuilding } from "@/lib/gisEngine";

export interface GISBuilding extends SpatialBuilding {
  owner: string;
  floors: string;
  plinthAreaSqM: number;
  carpetAreaSqM: number;
  approvalPlanNo?: string;
  isEncroaching?: boolean;
}

export const GIS_BUILDINGS: GISBuilding[] = [
  // 1. Ravi Kumar Main Residence (BS-P00125)
  {
    id: "BLD-125-01",
    name: "Main Residence (G+2 Architectural Villa)",
    parcelId: "BS-P00125",
    owner: "Ravi Kumar & Priya R. Kumar",
    type: "residential",
    dimensions: "36.5m × 25.9m (120 ft × 85 ft)",
    floors: "G+2 Floors",
    plinthAreaSqM: 946.0,
    carpetAreaSqM: 804.0,
    approvalPlanNo: "SCMC/WD24/BLD/2022/88194",
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [78.13600, 11.62365],
          [78.13635, 11.62365],
          [78.13635, 11.62340],
          [78.13615, 11.62340],
          [78.13615, 11.62335],
          [78.13600, 11.62335],
          [78.13600, 11.62365],
        ],
      ],
    },
  },
  // 2. Ravi Kumar Utility Garage & Solar Substation (BS-P00125)
  {
    id: "BLD-125-02",
    name: "Solar Substation & Utility Garage",
    parcelId: "BS-P00125",
    owner: "Ravi Kumar",
    type: "utility",
    dimensions: "12.0m × 8.0m",
    floors: "G Floor",
    plinthAreaSqM: 96.0,
    carpetAreaSqM: 90.0,
    approvalPlanNo: "SCMC/WD24/UTL/2023/102",
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [78.13585, 11.62325],
          [78.13596, 11.62325],
          [78.13596, 11.62315],
          [78.13585, 11.62315],
          [78.13585, 11.62325],
        ],
      ],
    },
  },
  // 3. K. Selvam Main House (BS-P00127)
  {
    id: "BLD-127-01",
    name: "K. Selvam Main House",
    parcelId: "BS-P00127",
    owner: "K. Selvam",
    type: "residential",
    dimensions: "24.0m × 18.0m",
    floors: "G+1 Floors",
    plinthAreaSqM: 432.0,
    carpetAreaSqM: 375.0,
    approvalPlanNo: "SCMC/WD24/BLD/2021/4491",
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [78.13695, 11.62360],
          [78.13735, 11.62360],
          [78.13735, 11.62335],
          [78.13695, 11.62335],
          [78.13695, 11.62360],
        ],
      ],
    },
  },
  // 4. K. Selvam Secondary Outbuilding (B-03) — Crosses boundary into BS-P00125
  // Footprint: 15.0m x 8.5m (127.5 m²).
  // Cadastral boundary between 125/2 and 125/3 is at longitude 78.13665.
  // Western side extends to 78.13660 (5m into BS-P00125) -> EXACTLY 8.5 sq m affected!
  {
    id: "BLD-127-02",
    name: "K. Selvam Secondary Outbuilding / Store (B-03)",
    parcelId: "BS-P00127",
    owner: "K. Selvam",
    type: "outbuilding",
    dimensions: "15.0m × 8.5m",
    floors: "G Floor",
    plinthAreaSqM: 127.5,
    carpetAreaSqM: 110.0,
    isEncroaching: true,
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [78.136641, 11.623737], // Western corner inside BS-P00125 (encroaching by 1.0m)
          [78.136778, 11.623737], // Eastern corner inside BS-P00127 (total width 15.0m)
          [78.136778, 11.623660], // SE corner inside BS-P00127 (depth 8.5m)
          [78.136641, 11.623660], // SW corner inside BS-P00125
          [78.136641, 11.623737], // Closure
        ],
      ],
    },
  },
  // 5. R. Meena Contemporary Villa (BS-P00126)
  {
    id: "BLD-126-01",
    name: "R. Meena Contemporary Villa (B-05)",
    parcelId: "BS-P00126",
    owner: "R. Meena",
    type: "residential",
    dimensions: "28.0m × 20.0m",
    floors: "Ground Floor",
    plinthAreaSqM: 560.0,
    carpetAreaSqM: 480.0,
    approvalPlanNo: "SCMC/WD24/BLD/2020/2180",
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [78.13615, 11.62470],
          [78.13655, 11.62470],
          [78.13655, 11.62435],
          [78.13615, 11.62435],
          [78.13615, 11.62470],
        ],
      ],
    },
  },
  // 6. V. Raghavan House (BS-P00124)
  {
    id: "BLD-124-01",
    name: "V. Raghavan House (B-04)",
    parcelId: "BS-P00124",
    owner: "V. Raghavan",
    type: "residential",
    dimensions: "22.0m × 16.0m",
    floors: "G+1 Floors",
    plinthAreaSqM: 352.0,
    carpetAreaSqM: 310.0,
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [78.13515, 11.62360],
          [78.13545, 11.62360],
          [78.13545, 11.62335],
          [78.13515, 11.62335],
          [78.13515, 11.62360],
        ],
      ],
    },
  },
  // 7. P. Natarajan House (BS-P00123)
  {
    id: "BLD-123-01",
    name: "P. Natarajan House (B-08)",
    parcelId: "BS-P00123",
    owner: "P. Natarajan",
    type: "residential",
    dimensions: "25.0m × 18.0m",
    floors: "G Floor",
    plinthAreaSqM: 450.0,
    carpetAreaSqM: 390.0,
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [78.13600, 11.62270],
          [78.13645, 11.62270],
          [78.13645, 11.62245],
          [78.13600, 11.62245],
          [78.13600, 11.62270],
        ],
      ],
    },
  },
  // 8. L. Priya Residence (BS-P00128)
  {
    id: "BLD-128-01",
    name: "L. Priya Residence (B-07)",
    parcelId: "BS-P00128",
    owner: "L. Priya",
    type: "residential",
    dimensions: "20.0m × 15.0m",
    floors: "G Floor",
    plinthAreaSqM: 300.0,
    carpetAreaSqM: 260.0,
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [78.13695, 11.62270],
          [78.13735, 11.62270],
          [78.13735, 11.62245],
          [78.13695, 11.62245],
          [78.13695, 11.62270],
        ],
      ],
    },
  },
];
