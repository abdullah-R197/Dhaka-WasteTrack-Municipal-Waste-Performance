import {
  WardRecord,
  ContractorRecord,
  RouteRecord,
  VehicleRecord,
  FacilityRecord,
  WeighbridgeRecord,
  WasteBatchRecord,
  ComplaintRecord,
  ServiceAlert,
  WasteCategory,
  OperationalStatus,
  VerificationStatus,
} from '../types/waste';

// 1. 8 ILLUSTRATIVE WARDS
export const INITIAL_WARDS: WardRecord[] = [
  {
    id: 'WARD-DEMO-01',
    wardNumber: 1,
    name: 'Ward 01 (Uttara Model Sector — Illustrative)',
    contractorId: 'DEMO-CONT-01',
    scheduledCollections: 140,
    completedCollections: 136,
    onTimeCollections: 131,
    missedCollections: 4,
    recordedWasteTonnes: 64.2,
    sourceSegregationRate: 68.4,
    performanceStatus: 'Optimal',
    coordinates: [23.8728, 90.3984],
    schematicPos: { x: 140, y: 95 },
  },
  {
    id: 'WARD-DEMO-02',
    wardNumber: 2,
    name: 'Ward 02 (Mirpur North Corridor — Illustrative)',
    contractorId: 'DEMO-CONT-01',
    scheduledCollections: 135,
    completedCollections: 127,
    onTimeCollections: 118,
    missedCollections: 8,
    recordedWasteTonnes: 58.6,
    sourceSegregationRate: 59.2,
    performanceStatus: 'Satisfactory',
    coordinates: [23.8223, 90.3654],
    schematicPos: { x: 110, y: 195 },
  },
  {
    id: 'WARD-DEMO-03',
    wardNumber: 3,
    name: 'Ward 03 (Banani–Gulshan Civic Zone — Illustrative)',
    contractorId: 'DEMO-CONT-02',
    scheduledCollections: 150,
    completedCollections: 147,
    onTimeCollections: 143,
    missedCollections: 3,
    recordedWasteTonnes: 71.8,
    sourceSegregationRate: 74.5,
    performanceStatus: 'Optimal',
    coordinates: [23.7937, 90.4066],
    schematicPos: { x: 250, y: 165 },
  },
  {
    id: 'WARD-DEMO-04',
    wardNumber: 4,
    name: 'Ward 04 (Tejgaon Industrial & Mixed — Illustrative)',
    contractorId: 'DEMO-CONT-02',
    scheduledCollections: 145,
    completedCollections: 133,
    onTimeCollections: 121,
    missedCollections: 12,
    recordedWasteTonnes: 69.4,
    sourceSegregationRate: 54.0,
    performanceStatus: 'Satisfactory',
    coordinates: [23.7639, 90.3929],
    schematicPos: { x: 230, y: 265 },
  },
  {
    id: 'WARD-DEMO-05',
    wardNumber: 5,
    name: 'Ward 05 (Dhanmondi Residential — Illustrative)',
    contractorId: 'DEMO-CONT-03',
    scheduledCollections: 130,
    completedCollections: 124,
    onTimeCollections: 116,
    missedCollections: 6,
    recordedWasteTonnes: 55.1,
    sourceSegregationRate: 64.8,
    performanceStatus: 'Optimal',
    coordinates: [23.7461, 90.3742],
    schematicPos: { x: 135, y: 320 },
  },
  {
    id: 'WARD-DEMO-06',
    wardNumber: 6,
    name: 'Ward 06 (Mohammadpur West — Illustrative)',
    contractorId: 'DEMO-CONT-03',
    scheduledCollections: 140,
    completedCollections: 121,
    onTimeCollections: 106,
    missedCollections: 19,
    recordedWasteTonnes: 52.3,
    sourceSegregationRate: 46.5,
    performanceStatus: 'Needs Attention',
    coordinates: [23.7658, 90.3584],
    schematicPos: { x: 95, y: 265 },
  },
  {
    id: 'WARD-DEMO-07',
    wardNumber: 7,
    name: 'Ward 07 (Motijheel Commercial Hub — Illustrative)',
    contractorId: 'DEMO-CONT-04',
    scheduledCollections: 155,
    completedCollections: 138,
    onTimeCollections: 124,
    missedCollections: 17,
    recordedWasteTonnes: 66.9,
    sourceSegregationRate: 49.8,
    performanceStatus: 'Needs Attention',
    coordinates: [23.7330, 90.4172],
    schematicPos: { x: 265, y: 345 },
  },
  {
    id: 'WARD-DEMO-08',
    wardNumber: 8,
    name: 'Ward 08 (Old Dhaka High-Density Pilot — Illustrative)',
    contractorId: 'DEMO-CONT-04',
    scheduledCollections: 145,
    completedCollections: 118,
    onTimeCollections: 99,
    missedCollections: 27,
    recordedWasteTonnes: 49.7,
    sourceSegregationRate: 38.2,
    performanceStatus: 'Critical Review',
    coordinates: [23.7115, 90.4071],
    schematicPos: { x: 195, y: 415 },
  },
];

// 2. 4 SYNTHETIC CONTRACTORS
export const INITIAL_CONTRACTORS: ContractorRecord[] = [
  {
    id: 'DEMO-CONT-01',
    label: 'DEMO-CONT-01 (North Sector Municipal Consortium — Synthetic)',
    assignedWards: ['WARD-DEMO-01', 'WARD-DEMO-02'],
    scheduledTasks: 275,
    completedTasks: 263,
    onTimeTasks: 249,
    missedCollections: 12,
    recordCompletenessRate: 97.4,
    performanceStatus: 'Exemplary',
  },
  {
    id: 'DEMO-CONT-02',
    label: 'DEMO-CONT-02 (Central Civic Resource Logistics — Synthetic)',
    assignedWards: ['WARD-DEMO-03', 'WARD-DEMO-04'],
    scheduledTasks: 295,
    completedTasks: 280,
    onTimeTasks: 264,
    missedCollections: 15,
    recordCompletenessRate: 94.8,
    performanceStatus: 'Compliant',
  },
  {
    id: 'DEMO-CONT-03',
    label: 'DEMO-CONT-03 (West Corridor Urban Services — Synthetic)',
    assignedWards: ['WARD-DEMO-05', 'WARD-DEMO-06'],
    scheduledTasks: 270,
    completedTasks: 245,
    onTimeTasks: 222,
    missedCollections: 25,
    recordCompletenessRate: 88.5,
    performanceStatus: 'Watchlist',
  },
  {
    id: 'DEMO-CONT-04',
    label: 'DEMO-CONT-04 (South Metro Hauling & Recovery — Synthetic)',
    assignedWards: ['WARD-DEMO-07', 'WARD-DEMO-08'],
    scheduledTasks: 300,
    completedTasks: 256,
    onTimeTasks: 223,
    missedCollections: 44,
    recordCompletenessRate: 81.2,
    performanceStatus: 'Under Audit',
  },
];

// 3. FACILITIES & WEIGHBRIDGES (12 Total Operational Nodes across all 6 required tabs + Hazardous safe node)
export const INITIAL_FACILITIES: FacilityRecord[] = [
  {
    id: 'DEMO-FACILITY-01',
    name: 'North Secondary Transfer Station (STS-North Demo)',
    type: 'Transfer Station',
    illustrativeLocation: 'Sector North Corridor (Illustrative)',
    receivingCapacityTonnesPerDay: 140,
    quantityReceivedTonnes: 118.4,
    status: 'Operational',
    lastUpdated: '2026-10-28 11:45',
    coordinates: [23.8191, 90.4125],
    schematicPos: { x: 430, y: 155 },
    notes: 'Equipped with segregated bays for organic, dry recyclables, and residual transfers.',
  },
  {
    id: 'DEMO-FACILITY-02',
    name: 'South Central Transfer Station (STS-South Demo)',
    type: 'Transfer Station',
    illustrativeLocation: 'Central-South Ring (Illustrative)',
    receivingCapacityTonnesPerDay: 160,
    quantityReceivedTonnes: 148.2,
    status: 'Approaching Threshold',
    lastUpdated: '2026-10-28 11:50',
    coordinates: [23.7382, 90.3958],
    schematicPos: { x: 430, y: 335 },
    notes: 'High peak-hour intake; automated compaction bay scheduled for secondary shift.',
  },
  {
    id: 'DEMO-WS-01',
    name: 'North Digital Weighbridge Hub (WB-North Demo)',
    type: 'Weighbridge',
    illustrativeLocation: 'Adjacent to STS-North Corridor (Illustrative)',
    receivingCapacityTonnesPerDay: 200,
    quantityReceivedTonnes: 162.8,
    status: 'Operational',
    lastUpdated: '2026-10-28 12:05',
    coordinates: [23.8152, 90.4245],
    schematicPos: { x: 580, y: 155 },
    notes: 'Automated gross and tare axle scale linked to central batch registry.',
  },
  {
    id: 'DEMO-WS-02',
    name: 'South Digital Weighbridge Hub (WB-South Demo)',
    type: 'Weighbridge',
    illustrativeLocation: 'Eastern Approach Gateway (Illustrative)',
    receivingCapacityTonnesPerDay: 220,
    quantityReceivedTonnes: 185.6,
    status: 'Calibration Pending',
    lastUpdated: '2026-10-28 11:30',
    coordinates: [23.7295, 90.4362],
    schematicPos: { x: 580, y: 335 },
    notes: 'Lane B sensor awaiting tare verification on 2 incoming batches.',
  },
  {
    id: 'DEMO-FACILITY-03',
    name: 'North Material Recovery Facility (MRF-01 Demo)',
    type: 'Material Recovery Facility',
    illustrativeLocation: 'North Eco-Industrial Park (Illustrative)',
    receivingCapacityTonnesPerDay: 85,
    quantityReceivedTonnes: 68.5,
    status: 'Operational',
    lastUpdated: '2026-10-28 12:00',
    coordinates: [23.8350, 90.4480],
    schematicPos: { x: 775, y: 85 },
    notes: 'Optical and manual sorting lines for PET, HDPE, paper/cardboard, metals, and glass.',
  },
  {
    id: 'DEMO-FACILITY-04',
    name: 'South Material Recovery Facility (MRF-02 Demo)',
    type: 'Material Recovery Facility',
    illustrativeLocation: 'South-East Recovery Zone (Illustrative)',
    receivingCapacityTonnesPerDay: 75,
    quantityReceivedTonnes: 54.2,
    status: 'Operational',
    lastUpdated: '2026-10-28 11:55',
    coordinates: [23.7485, 90.4610],
    schematicPos: { x: 775, y: 165 },
    notes: 'Processes dry source-segregated recyclables with baling press.',
  },
  {
    id: 'DEMO-FACILITY-05',
    name: 'Bio-Compost & Anaerobic Digestion Plant 01 (ORG-01 Demo)',
    type: 'Organic Waste Treatment',
    illustrativeLocation: 'Eastern Green Belt Sector (Illustrative)',
    receivingCapacityTonnesPerDay: 120,
    quantityReceivedTonnes: 104.6,
    status: 'Operational',
    lastUpdated: '2026-10-28 12:10',
    coordinates: [23.7880, 90.4720],
    schematicPos: { x: 775, y: 245 },
    notes: 'Produces agricultural-grade compost and biogas from source-segregated wet organic waste.',
  },
  {
    id: 'DEMO-FACILITY-06',
    name: 'Windrow Composting & Bio-Recovery Facility 02 (ORG-02 Demo)',
    type: 'Organic Waste Treatment',
    illustrativeLocation: 'Western Peri-Urban Buffer (Illustrative)',
    receivingCapacityTonnesPerDay: 95,
    quantityReceivedTonnes: 82.0,
    status: 'Operational',
    lastUpdated: '2026-10-28 11:40',
    coordinates: [23.7810, 90.3320],
    schematicPos: { x: 775, y: 315 },
    notes: 'Dedicated to market vegetable waste and household kitchen organic streams.',
  },
  {
    id: 'DEMO-FACILITY-07',
    name: 'Engineered Sanitary Residual Cell A (DISP-01 Demo)',
    type: 'Residual Disposal',
    illustrativeLocation: 'Eastern Sanitary Containment Zone (Illustrative)',
    receivingCapacityTonnesPerDay: 150,
    quantityReceivedTonnes: 98.4,
    status: 'Operational',
    lastUpdated: '2026-10-28 12:00',
    coordinates: [23.7210, 90.4890],
    schematicPos: { x: 960, y: 210 },
    notes: 'Receives post-recovery inert residuals only; leachate treatment active.',
  },
  {
    id: 'DEMO-FACILITY-08',
    name: 'Controlled Residual Containment Site B (DISP-02 Demo)',
    type: 'Residual Disposal',
    illustrativeLocation: 'Western Engineered Containment Zone (Illustrative)',
    receivingCapacityTonnesPerDay: 130,
    quantityReceivedTonnes: 119.5,
    status: 'Approaching Threshold',
    lastUpdated: '2026-10-28 11:50',
    coordinates: [23.7920, 90.3150],
    schematicPos: { x: 960, y: 325 },
    notes: 'Cell 3 at 91.9% daily intake threshold; diversion to MRF/composting prioritized.',
  },
  {
    id: 'DEMO-FACILITY-09',
    name: 'Conditional Residual WtE Evaluation Facility (WTE-01 Demo)',
    type: 'Conditional WtE',
    illustrativeLocation: 'Designated Policy Evaluation Site (Illustrative)',
    receivingCapacityTonnesPerDay: 60,
    quantityReceivedTonnes: 22.4,
    status: 'Conditional Evaluation',
    lastUpdated: '2026-10-28 11:20',
    coordinates: [23.7620, 90.4850],
    schematicPos: { x: 960, y: 105 },
    notes: 'Restricted strictly to non-recyclable, high-calorific dry residual fractions subject to 4 policy decision gates.',
  },
  {
    id: 'DEMO-FACILITY-10',
    name: 'Secure Household Hazardous Containment Unit (HAZ-01 Demo)',
    type: 'Hazardous Treatment',
    illustrativeLocation: 'Isolated Special Handling Zone (Illustrative)',
    receivingCapacityTonnesPerDay: 25,
    quantityReceivedTonnes: 11.2,
    status: 'Operational',
    lastUpdated: '2026-10-28 11:58',
    coordinates: [23.8510, 90.3620],
    schematicPos: { x: 775, y: 415 },
    notes: 'Isolated pathway for batteries, e-waste, medical sharps, and chemical containers. Never mixed with municipal compost or MRF lines.',
  },
];

// 4. 5 COLLECTION ROUTES
export const INITIAL_ROUTES: RouteRecord[] = [
  {
    id: 'ROUTE-DEMO-01',
    name: 'R-01: North Organic Segregation Loop (Illustrative)',
    wardId: 'WARD-DEMO-01',
    contractorId: 'DEMO-CONT-01',
    wasteCategory: 'Organic',
    status: 'On Schedule',
    stops: [
      {
        stopId: 'STOP-101',
        label: 'Ward 01 Collection Point A (Organic Bin Cluster)',
        type: 'Collection Point',
        status: 'Completed',
        timestamp: '07:30',
        coordinates: [23.8728, 90.3984],
        schematicPos: { x: 140, y: 95 },
      },
      {
        stopId: 'STOP-102',
        label: 'North Secondary Transfer Station (DEMO-FACILITY-01)',
        type: 'Transfer Station',
        status: 'Completed',
        timestamp: '08:25',
        coordinates: [23.8191, 90.4125],
        schematicPos: { x: 430, y: 155 },
      },
      {
        stopId: 'STOP-103',
        label: 'North Weighbridge Hub (DEMO-WS-01)',
        type: 'Weighbridge',
        status: 'Completed',
        timestamp: '08:45',
        coordinates: [23.8152, 90.4245],
        schematicPos: { x: 580, y: 155 },
      },
      {
        stopId: 'STOP-104',
        label: 'Bio-Compost & AD Plant 01 (DEMO-FACILITY-05)',
        type: 'Treatment Facility',
        status: 'Current',
        timestamp: '09:30',
        coordinates: [23.7880, 90.4720],
        schematicPos: { x: 775, y: 245 },
      },
      {
        stopId: 'STOP-105',
        label: 'Sanitary Residual Cell A (DEMO-FACILITY-07 — Screening Rejects Only)',
        type: 'Disposal Site',
        status: 'Upcoming',
        timestamp: '10:30',
        coordinates: [23.7210, 90.4890],
        schematicPos: { x: 960, y: 210 },
      },
    ],
  },
  {
    id: 'ROUTE-DEMO-02',
    name: 'R-02: Central Dry Recyclables Recovery Corridor (Illustrative)',
    wardId: 'WARD-DEMO-03',
    contractorId: 'DEMO-CONT-02',
    wasteCategory: 'Recyclable',
    status: 'On Schedule',
    stops: [
      {
        stopId: 'STOP-201',
        label: 'Ward 03 Dry Recyclable Collection Hub',
        type: 'Collection Point',
        status: 'Completed',
        timestamp: '08:00',
        coordinates: [23.7937, 90.4066],
        schematicPos: { x: 250, y: 165 },
      },
      {
        stopId: 'STOP-202',
        label: 'North Secondary Transfer Station (DEMO-FACILITY-01)',
        type: 'Transfer Station',
        status: 'Completed',
        timestamp: '08:50',
        coordinates: [23.8191, 90.4125],
        schematicPos: { x: 430, y: 155 },
      },
      {
        stopId: 'STOP-203',
        label: 'North Weighbridge Hub (DEMO-WS-01)',
        type: 'Weighbridge',
        status: 'Completed',
        timestamp: '09:15',
        coordinates: [23.8152, 90.4245],
        schematicPos: { x: 580, y: 155 },
      },
      {
        stopId: 'STOP-204',
        label: 'North Material Recovery Facility (DEMO-FACILITY-03)',
        type: 'Treatment Facility',
        status: 'Completed',
        timestamp: '10:05',
        coordinates: [23.8350, 90.4480],
        schematicPos: { x: 775, y: 85 },
      },
      {
        stopId: 'STOP-205',
        label: 'Sanitary Residual Cell A (DEMO-FACILITY-07 — Non-Recyclable Tailings)',
        type: 'Disposal Site',
        status: 'Completed',
        timestamp: '11:10',
        coordinates: [23.7210, 90.4890],
        schematicPos: { x: 960, y: 210 },
      },
    ],
  },
  {
    id: 'ROUTE-DEMO-03',
    name: 'R-03: West Corridor Mixed/Organic Haul (Illustrative)',
    wardId: 'WARD-DEMO-06',
    contractorId: 'DEMO-CONT-03',
    wasteCategory: 'Organic',
    status: 'Delayed',
    stops: [
      {
        stopId: 'STOP-301',
        label: 'Ward 06 Market Organic Point',
        type: 'Collection Point',
        status: 'Completed',
        timestamp: '08:15',
        coordinates: [23.7658, 90.3584],
        schematicPos: { x: 95, y: 265 },
      },
      {
        stopId: 'STOP-302',
        label: 'South Central Transfer Station (DEMO-FACILITY-02)',
        type: 'Transfer Station',
        status: 'Current',
        timestamp: '10:05',
        coordinates: [23.7382, 90.3958],
        schematicPos: { x: 430, y: 335 },
      },
      {
        stopId: 'STOP-303',
        label: 'South Weighbridge Hub (DEMO-WS-02)',
        type: 'Weighbridge',
        status: 'Upcoming',
        coordinates: [23.7295, 90.4362],
        schematicPos: { x: 580, y: 335 },
      },
      {
        stopId: 'STOP-304',
        label: 'Windrow Composting Facility 02 (DEMO-FACILITY-06)',
        type: 'Treatment Facility',
        status: 'Upcoming',
        coordinates: [23.7810, 90.3320],
        schematicPos: { x: 775, y: 315 },
      },
      {
        stopId: 'STOP-305',
        label: 'Controlled Residual Site B (DEMO-FACILITY-08)',
        type: 'Disposal Site',
        status: 'Upcoming',
        coordinates: [23.7920, 90.3150],
        schematicPos: { x: 960, y: 325 },
      },
    ],
  },
  {
    id: 'ROUTE-DEMO-04',
    name: 'R-04: South Commercial Residual & Recovery Line (Illustrative)',
    wardId: 'WARD-DEMO-07',
    contractorId: 'DEMO-CONT-04',
    wasteCategory: 'Residual',
    status: 'Delayed',
    stops: [
      {
        stopId: 'STOP-401',
        label: 'Ward 07 Commercial Transfer Point',
        type: 'Collection Point',
        status: 'Completed',
        timestamp: '07:50',
        coordinates: [23.7330, 90.4172],
        schematicPos: { x: 265, y: 345 },
      },
      {
        stopId: 'STOP-402',
        label: 'South Central Transfer Station (DEMO-FACILITY-02)',
        type: 'Transfer Station',
        status: 'Completed',
        timestamp: '09:20',
        coordinates: [23.7382, 90.3958],
        schematicPos: { x: 430, y: 335 },
      },
      {
        stopId: 'STOP-403',
        label: 'South Weighbridge Hub (DEMO-WS-02)',
        type: 'Weighbridge',
        status: 'Current',
        timestamp: '10:40',
        coordinates: [23.7295, 90.4362],
        schematicPos: { x: 580, y: 335 },
      },
      {
        stopId: 'STOP-404',
        label: 'South Material Recovery Facility (DEMO-FACILITY-04 — Pre-Sort)',
        type: 'Treatment Facility',
        status: 'Upcoming',
        coordinates: [23.7485, 90.4610],
        schematicPos: { x: 775, y: 165 },
      },
      {
        stopId: 'STOP-405',
        label: 'Engineered Sanitary Residual Cell A (DEMO-FACILITY-07)',
        type: 'Disposal Site',
        status: 'Upcoming',
        coordinates: [23.7210, 90.4890],
        schematicPos: { x: 960, y: 210 },
      },
    ],
  },
  {
    id: 'ROUTE-DEMO-05',
    name: 'R-05: Isolated Household Hazardous Collection Protocol (Illustrative)',
    wardId: 'WARD-DEMO-04',
    contractorId: 'DEMO-CONT-02',
    wasteCategory: 'Hazardous',
    status: 'On Schedule',
    stops: [
      {
        stopId: 'STOP-501',
        label: 'Ward 04 Designated Hazardous Drop-Off Kiosk',
        type: 'Collection Point',
        status: 'Completed',
        timestamp: '08:30',
        coordinates: [23.7639, 90.3929],
        schematicPos: { x: 230, y: 265 },
      },
      {
        stopId: 'STOP-502',
        label: 'North Weighbridge Sealed Hazmat Scale (DEMO-WS-01)',
        type: 'Weighbridge',
        status: 'Completed',
        timestamp: '09:40',
        coordinates: [23.8152, 90.4245],
        schematicPos: { x: 580, y: 155 },
      },
      {
        stopId: 'STOP-503',
        label: 'Secure Household Hazardous Containment Unit (DEMO-FACILITY-10)',
        type: 'Treatment Facility',
        status: 'Current',
        timestamp: '10:35',
        coordinates: [23.8510, 90.3620],
        schematicPos: { x: 775, y: 415 },
      },
    ],
  },
];

// 5. 12 COLLECTION VEHICLES
export const INITIAL_VEHICLES: VehicleRecord[] = [
  {
    id: 'DEMO-TRK-001',
    wardId: 'WARD-DEMO-01',
    routeId: 'ROUTE-DEMO-01',
    contractorId: 'DEMO-CONT-01',
    wasteCategory: 'Organic',
    status: 'On Schedule',
    lastRecordedWeightKg: 4820,
    lastCheckpoint: 'DEMO-WS-01 (Weighbridge North)',
    nextPlannedStop: 'DEMO-FACILITY-05 (Bio-Compost Plant 01)',
    lastTimestamp: '2026-10-28 11:42',
    completionRate: 85,
    destinationFacilityId: 'DEMO-FACILITY-05',
    coordinates: [23.8020, 90.4450],
    schematicPos: { x: 675, y: 195 },
  },
  {
    id: 'DEMO-TRK-002',
    wardId: 'WARD-DEMO-01',
    routeId: 'ROUTE-DEMO-01',
    contractorId: 'DEMO-CONT-01',
    wasteCategory: 'Recyclable',
    status: 'Completed',
    lastRecordedWeightKg: 3150,
    lastCheckpoint: 'DEMO-FACILITY-03 (North MRF)',
    nextPlannedStop: 'Shift Complete — Depot Standby',
    lastTimestamp: '2026-10-28 11:15',
    completionRate: 100,
    destinationFacilityId: 'DEMO-FACILITY-03',
    coordinates: [23.8350, 90.4480],
    schematicPos: { x: 760, y: 95 },
  },
  {
    id: 'DEMO-TRK-003',
    wardId: 'WARD-DEMO-02',
    routeId: 'ROUTE-DEMO-01',
    contractorId: 'DEMO-CONT-01',
    wasteCategory: 'Organic',
    status: 'On Schedule',
    lastRecordedWeightKg: 4410,
    lastCheckpoint: 'DEMO-FACILITY-01 (STS-North)',
    nextPlannedStop: 'DEMO-WS-01 (Weighbridge North)',
    lastTimestamp: '2026-10-28 11:50',
    completionRate: 65,
    destinationFacilityId: 'DEMO-FACILITY-05',
    coordinates: [23.8170, 90.4180],
    schematicPos: { x: 505, y: 155 },
  },
  {
    id: 'DEMO-TRK-004',
    wardId: 'WARD-DEMO-03',
    routeId: 'ROUTE-DEMO-02',
    contractorId: 'DEMO-CONT-02',
    wasteCategory: 'Recyclable',
    status: 'On Schedule',
    lastRecordedWeightKg: 3680,
    lastCheckpoint: 'DEMO-WS-01 (Weighbridge North)',
    nextPlannedStop: 'DEMO-FACILITY-03 (North MRF)',
    lastTimestamp: '2026-10-28 11:55',
    completionRate: 80,
    destinationFacilityId: 'DEMO-FACILITY-03',
    coordinates: [23.8260, 90.4360],
    schematicPos: { x: 675, y: 120 },
  },
  {
    id: 'DEMO-TRK-005',
    wardId: 'WARD-DEMO-03',
    routeId: 'ROUTE-DEMO-02',
    contractorId: 'DEMO-CONT-02',
    wasteCategory: 'Organic',
    status: 'Completed',
    lastRecordedWeightKg: 5120,
    lastCheckpoint: 'DEMO-FACILITY-05 (Bio-Compost Plant 01)',
    nextPlannedStop: 'Shift Complete — Depot Standby',
    lastTimestamp: '2026-10-28 10:55',
    completionRate: 100,
    destinationFacilityId: 'DEMO-FACILITY-05',
    coordinates: [23.7880, 90.4720],
    schematicPos: { x: 790, y: 245 },
  },
  {
    id: 'DEMO-TRK-006',
    wardId: 'WARD-DEMO-04',
    routeId: 'ROUTE-DEMO-05',
    contractorId: 'DEMO-CONT-02',
    wasteCategory: 'Hazardous',
    status: 'On Schedule',
    lastRecordedWeightKg: 1120,
    lastCheckpoint: 'DEMO-WS-01 (Hazmat Sealed Scale)',
    nextPlannedStop: 'DEMO-FACILITY-10 (Hazardous Containment Unit)',
    lastTimestamp: '2026-10-28 11:48',
    completionRate: 75,
    destinationFacilityId: 'DEMO-FACILITY-10',
    coordinates: [23.8380, 90.3790],
    schematicPos: { x: 675, y: 405 },
  },
  {
    id: 'DEMO-TRK-007',
    wardId: 'WARD-DEMO-05',
    routeId: 'ROUTE-DEMO-03',
    contractorId: 'DEMO-CONT-03',
    wasteCategory: 'Organic',
    status: 'On Schedule',
    lastRecordedWeightKg: 4290,
    lastCheckpoint: 'DEMO-WS-02 (Weighbridge South)',
    nextPlannedStop: 'DEMO-FACILITY-06 (Windrow Composting 02)',
    lastTimestamp: '2026-10-28 11:38',
    completionRate: 70,
    destinationFacilityId: 'DEMO-FACILITY-06',
    coordinates: [23.7580, 90.3620],
    schematicPos: { x: 675, y: 325 },
  },
  {
    id: 'DEMO-TRK-008',
    wardId: 'WARD-DEMO-06',
    routeId: 'ROUTE-DEMO-03',
    contractorId: 'DEMO-CONT-03',
    wasteCategory: 'Organic',
    status: 'Delayed',
    lastRecordedWeightKg: null,
    lastCheckpoint: 'Ward 06 Collection Sector B',
    nextPlannedStop: 'DEMO-FACILITY-02 (STS-South)',
    lastTimestamp: '2026-10-28 10:20',
    completionRate: 40,
    destinationFacilityId: 'DEMO-FACILITY-06',
    coordinates: [23.7520, 90.3750],
    schematicPos: { x: 270, y: 300 },
  },
  {
    id: 'DEMO-TRK-009',
    wardId: 'WARD-DEMO-06',
    routeId: 'ROUTE-DEMO-03',
    contractorId: 'DEMO-CONT-03',
    wasteCategory: 'Recyclable',
    status: 'Under Review',
    lastRecordedWeightKg: 2890,
    lastCheckpoint: 'DEMO-FACILITY-02 (STS-South)',
    nextPlannedStop: 'DEMO-WS-02 (Tare Weight Verification Pending)',
    lastTimestamp: '2026-10-28 11:10',
    completionRate: 55,
    destinationFacilityId: 'DEMO-FACILITY-04',
    coordinates: [23.7340, 90.4150],
    schematicPos: { x: 505, y: 335 },
  },
  {
    id: 'DEMO-TRK-010',
    wardId: 'WARD-DEMO-07',
    routeId: 'ROUTE-DEMO-04',
    contractorId: 'DEMO-CONT-04',
    wasteCategory: 'Residual',
    status: 'On Schedule',
    lastRecordedWeightKg: 4950,
    lastCheckpoint: 'DEMO-WS-02 (Weighbridge South)',
    nextPlannedStop: 'DEMO-FACILITY-07 (Sanitary Residual Cell A)',
    lastTimestamp: '2026-10-28 11:52',
    completionRate: 80,
    destinationFacilityId: 'DEMO-FACILITY-07',
    coordinates: [23.7260, 90.4620],
    schematicPos: { x: 865, y: 210 },
  },
  {
    id: 'DEMO-TRK-011',
    wardId: 'WARD-DEMO-08',
    routeId: 'ROUTE-DEMO-04',
    contractorId: 'DEMO-CONT-04',
    wasteCategory: 'Residual',
    status: 'Missed',
    lastRecordedWeightKg: null,
    lastCheckpoint: 'Depot Dispatch Gate South',
    nextPlannedStop: 'Ward 08 Narrow-Lane Transfer Point (Missed Window)',
    lastTimestamp: '2026-10-28 09:05',
    completionRate: 15,
    destinationFacilityId: 'DEMO-FACILITY-08',
    coordinates: [23.7115, 90.4071],
    schematicPos: { x: 245, y: 415 },
  },
  {
    id: 'DEMO-TRK-012',
    wardId: 'WARD-DEMO-04',
    routeId: 'ROUTE-DEMO-02',
    contractorId: 'DEMO-CONT-02',
    wasteCategory: 'Organic',
    status: 'Delayed',
    lastRecordedWeightKg: 4640,
    lastCheckpoint: 'DEMO-FACILITY-01 (STS-North)',
    nextPlannedStop: 'DEMO-WS-01 (Weighbridge North)',
    lastTimestamp: '2026-10-28 11:25',
    completionRate: 60,
    destinationFacilityId: 'DEMO-FACILITY-05',
    coordinates: [23.7890, 90.4020],
    schematicPos: { x: 350, y: 215 },
  },
];

// 6. GENERATE 48 COHERENT WASTE BATCHES & WEIGHBRIDGE RECORDS
function buildBatchesAndWeighbridgeRecords(): {
  batches: WasteBatchRecord[];
  weighbridgeRecords: WeighbridgeRecord[];
} {
  const batches: WasteBatchRecord[] = [];
  const weighbridgeRecords: WeighbridgeRecord[] = [];

  const dates = [
    '2026-10-28',
    '2026-10-27',
    '2026-10-26',
    '2026-10-25',
    '2026-10-24',
    '2026-10-23',
    '2026-10-22',
    '2026-10-20',
    '2026-10-18',
    '2026-10-15',
    '2026-10-10',
    '2026-10-05',
  ];

  const categories: WasteCategory[] = [
    'Organic',
    'Recyclable',
    'Organic',
    'Residual',
    'Organic',
    'Recyclable',
    'Hazardous',
    'Residual',
  ];

  for (let i = 1; i <= 48; i++) {
    const batchNum = String(i).padStart(3, '0');
    const id = `DEMO-BATCH-2026-${batchNum}`;
    const wardIndex = (i - 1) % 8;
    const ward = INITIAL_WARDS[wardIndex];
    const contractorId = ward.contractorId;
    const date = dates[(i - 1) % dates.length];
    const category = categories[(i - 1) % categories.length];

    // Map vehicle consistently
    const wardVehicles = INITIAL_VEHICLES.filter((v) => v.wardId === ward.id);
    const vehicle =
      wardVehicles.length > 0
        ? wardVehicles[i % wardVehicles.length]
        : INITIAL_VEHICLES[i % INITIAL_VEHICLES.length];

    const isNorth = ward.wardNumber <= 4;
    const transferStationId = isNorth ? 'DEMO-FACILITY-01' : 'DEMO-FACILITY-02';
    const weighbridgeId = isNorth ? 'DEMO-WS-01' : 'DEMO-WS-02';

    let treatmentFacilityId = 'DEMO-FACILITY-05';
    let finalDisposalDestinationId = 'DEMO-FACILITY-07';

    if (category === 'Organic') {
      treatmentFacilityId = isNorth ? 'DEMO-FACILITY-05' : 'DEMO-FACILITY-06';
      finalDisposalDestinationId = isNorth ? 'DEMO-FACILITY-07' : 'DEMO-FACILITY-08';
    } else if (category === 'Recyclable') {
      treatmentFacilityId = isNorth ? 'DEMO-FACILITY-03' : 'DEMO-FACILITY-04';
      finalDisposalDestinationId = 'DEMO-FACILITY-07';
    } else if (category === 'Hazardous') {
      treatmentFacilityId = 'DEMO-FACILITY-10';
      finalDisposalDestinationId = 'DEMO-FACILITY-10';
    } else {
      // Residual
      treatmentFacilityId = i % 16 === 0 ? 'DEMO-FACILITY-09' : 'DEMO-FACILITY-04';
      finalDisposalDestinationId = i % 2 === 0 ? 'DEMO-FACILITY-07' : 'DEMO-FACILITY-08';
    }

    // Introduce intentional missing tare weight or pending verification on specific batches (e.g., i === 9, 19, 31)
    const isPendingTare = i === 9 || i === 19 || i === 31;
    const isWeightAnomaly = i === 14 || i === 27;

    const tareWeightKg = isPendingTare ? null : 3200 + (i % 5) * 150;
    const netTarget = 3800 + (i % 9) * 280;
    const grossWeightKg = isPendingTare && i === 31 ? null : (tareWeightKg ?? 3400) + netTarget;
    const computedNet =
      grossWeightKg !== null && tareWeightKg !== null ? grossWeightKg - tareWeightKg : null;

    let recoveredMaterialKg: number | null = null;
    let residualQuantityKg: number | null = null;

    if (computedNet !== null && !isWeightAnomaly) {
      if (category === 'Organic') {
        recoveredMaterialKg = Math.round(computedNet * 0.78);
        residualQuantityKg = computedNet - recoveredMaterialKg;
      } else if (category === 'Recyclable') {
        recoveredMaterialKg = Math.round(computedNet * 0.84);
        residualQuantityKg = computedNet - recoveredMaterialKg;
      } else if (category === 'Hazardous') {
        recoveredMaterialKg = 0;
        residualQuantityKg = computedNet;
      } else {
        // Residual pre-sorting recovers ~18%
        recoveredMaterialKg = Math.round(computedNet * 0.18);
        residualQuantityKg = computedNet - recoveredMaterialKg;
      }
    }

    const verificationStatus: VerificationStatus = isPendingTare
      ? 'Pending Verification'
      : isWeightAnomaly
      ? 'Anomaly Flagged'
      : 'Verified';

    const operationalStatus: OperationalStatus = isPendingTare
      ? 'Under Review'
      : isWeightAnomaly
      ? 'Delayed'
      : i <= 6
      ? 'On Schedule'
      : 'Completed';

    const wbRecordId = `WB-REC-2026-${batchNum}`;

    weighbridgeRecords.push({
      id: wbRecordId,
      weighbridgeId,
      batchId: id,
      vehicleId: vehicle.id,
      wardId: ward.id,
      timestamp: `${date} 08:${String(15 + (i % 40)).padStart(2, '0')}`,
      grossWeightKg,
      tareWeightKg,
      destinationFacilityId: treatmentFacilityId,
      verificationStatus,
      notes: isPendingTare
        ? 'Exit tare weight scan missing; awaiting weighbridge operator confirmation.'
        : isWeightAnomaly
        ? 'Transfer station intake variance exceeds 6% tolerance threshold; flagged for review.'
        : 'Automated gross and tare axle verification complete.',
    });

    const timeline = [
      {
        stageName: '1. Curbside / Primary Collection Recorded',
        timestamp: `${date} 07:15`,
        operatorOrSystem: `${contractorId} Field Crew (${vehicle.id})`,
        recordedQuantityKg: grossWeightKg !== null && tareWeightKg !== null ? computedNet : null,
        status: 'Recorded' as const,
        notes: `Source-segregated ${category.toLowerCase()} batch loaded in ${ward.name}.`,
      },
      {
        stageName: '2. Transfer Station Arrival & Bay Assignment',
        timestamp: `${date} 08:05`,
        operatorOrSystem: `${transferStationId} Gate Controller`,
        recordedQuantityKg: computedNet,
        status: 'Received' as const,
        notes:
          category === 'Hazardous'
            ? 'Direct sealed transit bypass — isolated from municipal compactors.'
            : `Assigned to segregated ${category} bay at ${transferStationId}.`,
      },
      {
        stageName: '3. Digital Weighbridge Gross & Tare Verification',
        timestamp: `${date} 08:${String(15 + (i % 40)).padStart(2, '0')}`,
        operatorOrSystem: `${weighbridgeId} Automated Scale (${wbRecordId})`,
        recordedQuantityKg: computedNet,
        status: isPendingTare ? ('Pending Verification' as const) : ('Weighed' as const),
        notes:
          computedNet !== null
            ? `Gross: ${grossWeightKg} kg | Tare: ${tareWeightKg} kg | Net: ${computedNet} kg.`
            : 'Tare weight scan pending verification; net weight not yet certified.',
      },
      {
        stageName: '4. Recovery / Treatment Facility Intake & Processing',
        timestamp: `${date} 09:40`,
        operatorOrSystem: `${treatmentFacilityId} Operations Log`,
        recordedQuantityKg: recoveredMaterialKg,
        status:
          isPendingTare || isWeightAnomaly
            ? ('Pending Verification' as const)
            : category === 'Hazardous'
            ? ('Processed' as const)
            : ('Recovered' as const),
        notes:
          recoveredMaterialKg !== null
            ? `Processed at ${treatmentFacilityId}. Recovered value output: ${recoveredMaterialKg} kg.`
            : 'Awaiting weighbridge clearance before final batch reconciliation.',
      },
      {
        stageName: '5. Safe Residual Disposal & Custody Closure',
        timestamp: `${date} 11:10`,
        operatorOrSystem: `${finalDisposalDestinationId} Manifest System`,
        recordedQuantityKg: residualQuantityKg,
        status:
          isPendingTare || isWeightAnomaly
            ? ('Pending Verification' as const)
            : ('Residual Disposal Completed' as const),
        notes:
          residualQuantityKg !== null
            ? `Inert residual fraction (${residualQuantityKg} kg) safely logged at ${finalDisposalDestinationId}.`
            : 'Final custody sign-off held pending weight reconciliation.',
      },
    ];

    batches.push({
      id,
      date,
      collectionTime: '07:15',
      wardId: ward.id,
      collectionSource: `${ward.name} — Sector Cluster ${(i % 4) + 1}`,
      wasteCategory: category,
      vehicleId: vehicle.id,
      contractorId,
      grossWeightKg,
      tareWeightKg,
      weighbridgeRecordId: wbRecordId,
      transferStationId,
      treatmentFacilityId,
      recoveredMaterialKg,
      residualQuantityKg,
      finalDisposalDestinationId,
      operationalStatus,
      verificationStatus,
      timeline,
    });
  }

  return { batches, weighbridgeRecords };
}

const generatedData = buildBatchesAndWeighbridgeRecords();
export const INITIAL_BATCHES: WasteBatchRecord[] = generatedData.batches;
export const INITIAL_WEIGHBRIDGE_RECORDS: WeighbridgeRecord[] = generatedData.weighbridgeRecords;

// 7. 20 SYNTHETIC CITIZEN COMPLAINTS
export const INITIAL_COMPLAINTS: ComplaintRecord[] = [
  {
    id: 'DEMO-COMP-001',
    wardId: 'WARD-DEMO-08',
    routeId: 'ROUTE-DEMO-04',
    category: 'Missed waste collection',
    reportedDate: '2026-10-28 08:40',
    assignedContractorId: 'DEMO-CONT-04',
    responsibleUnit: 'South Metro Dispatch Unit',
    status: 'In Progress',
    resolutionTimeHours: null,
    verificationStatus: 'Verified',
    description: 'Morning primary collection vehicle DEMO-TRK-011 did not arrive at Lane 4 transfer point by 08:30 scheduled window.',
    referenceId: 'CIT-REF-8821',
    actionHistory: [
      { timestamp: '2026-10-28 08:40', actor: 'Citizen Portal (Synthetic)', action: 'Complaint logged with ward location tag.' },
      { timestamp: '2026-10-28 09:05', actor: 'Ward 08 Supervisor', action: 'Cross-checked route schedule; assigned relief van.' },
    ],
  },
  {
    id: 'DEMO-COMP-002',
    wardId: 'WARD-DEMO-06',
    routeId: 'ROUTE-DEMO-03',
    category: 'Segregated waste mixed together',
    reportedDate: '2026-10-27 14:20',
    assignedContractorId: 'DEMO-CONT-03',
    responsibleUnit: 'Segregation Compliance Inspector',
    status: 'Assigned',
    resolutionTimeHours: null,
    verificationStatus: 'Verified',
    description: 'Source-separated household organic and dry recyclable bags were loaded into a single unpartitioned cart during afternoon pickup.',
    referenceId: 'CIT-REF-8790',
    actionHistory: [
      { timestamp: '2026-10-27 14:20', actor: 'Citizen Portal (Synthetic)', action: 'Issue reported for Ward 06 Sector B.' },
      { timestamp: '2026-10-27 16:00', actor: 'Municipal Accountability Desk', action: 'Notice issued to DEMO-CONT-03 for compartmentalized bin enforcement.' },
    ],
  },
  {
    id: 'DEMO-COMP-003',
    wardId: 'WARD-DEMO-01',
    routeId: 'ROUTE-DEMO-01',
    category: 'Delayed collection',
    reportedDate: '2026-10-26 09:15',
    assignedContractorId: 'DEMO-CONT-01',
    responsibleUnit: 'North Sector Operations',
    status: 'Resolved',
    resolutionTimeHours: 14,
    verificationStatus: 'Verified',
    description: 'Organic collection delayed by 90 minutes due to road maintenance near Sector 4.',
    actionHistory: [
      { timestamp: '2026-10-26 09:15', actor: 'Citizen Portal (Synthetic)', action: 'Delay reported.' },
      { timestamp: '2026-10-26 23:15', actor: 'DEMO-CONT-01 Supervisor', action: 'Collection completed and weighbridge manifest WB-REC-2026-003 verified.' },
    ],
    resolutionRecord: 'Verified via weighbridge intake timestamp and ward supervisor sign-off within 14 hours.',
  },
  {
    id: 'DEMO-COMP-004',
    wardId: 'WARD-DEMO-04',
    routeId: 'ROUTE-DEMO-02',
    category: 'Overflowing waste container',
    reportedDate: '2026-10-26 11:30',
    assignedContractorId: 'DEMO-CONT-02',
    responsibleUnit: 'Central Container Maintenance',
    status: 'Resolved',
    resolutionTimeHours: 22,
    verificationStatus: 'Verified',
    description: 'Secondary container near commercial corridor reached full capacity prior to midday transfer.',
    actionHistory: [
      { timestamp: '2026-10-26 11:30', actor: 'Citizen Portal (Synthetic)', action: 'Reported overflowing container.' },
      { timestamp: '2026-10-27 09:30', actor: 'DEMO-CONT-02 Fleet', action: 'Cleared via supplemental haul DEMO-TRK-012.' },
    ],
    resolutionRecord: 'Supplemental haul logged at DEMO-WS-01; area sanitized.',
  },
  {
    id: 'DEMO-COMP-005',
    wardId: 'WARD-DEMO-07',
    routeId: 'ROUTE-DEMO-04',
    category: 'Illegal dumping',
    reportedDate: '2026-10-27 17:45',
    assignedContractorId: 'DEMO-CONT-04',
    responsibleUnit: 'Public Space Enforcement Team',
    status: 'In Progress',
    resolutionTimeHours: null,
    verificationStatus: 'Verified',
    description: 'Unregistered commercial packaging debris deposited outside designated collection hours near Motijheel back-lane.',
    actionHistory: [
      { timestamp: '2026-10-27 17:45', actor: 'Citizen Portal (Synthetic)', action: 'Logged illegal dumping incident.' },
      { timestamp: '2026-10-28 08:10', actor: 'Ward 07 Inspector', action: 'Cleanup crew scheduled; dry recyclables separated for MRF-02.' },
    ],
  },
  {
    id: 'DEMO-COMP-006',
    wardId: 'WARD-DEMO-02',
    routeId: 'ROUTE-DEMO-01',
    category: 'Missed waste collection',
    reportedDate: '2026-10-25 10:00',
    assignedContractorId: 'DEMO-CONT-01',
    responsibleUnit: 'North Sector Operations',
    status: 'Resolved',
    resolutionTimeHours: 18,
    verificationStatus: 'Verified',
    description: 'Cul-de-sac residential cluster missed during morning primary cart sweep.',
    actionHistory: [
      { timestamp: '2026-10-25 10:00', actor: 'Citizen Portal (Synthetic)', action: 'Reported missed pickup.' },
      { timestamp: '2026-10-26 04:00', actor: 'DEMO-CONT-01', action: 'Completed during priority morning sweep.' },
    ],
    resolutionRecord: 'Collection verified by resident callback and transfer station intake.',
  },
  {
    id: 'DEMO-COMP-007',
    wardId: 'WARD-DEMO-03',
    routeId: 'ROUTE-DEMO-02',
    category: 'Other waste-management issues',
    reportedDate: '2026-10-24 15:20',
    assignedContractorId: 'DEMO-CONT-02',
    responsibleUnit: 'Civic Recycling Outreach',
    status: 'Resolved',
    resolutionTimeHours: 28,
    verificationStatus: 'Verified',
    description: 'Request for clearer Bengali/English color-coded signage at neighborhood dry recyclable drop-off point.',
    actionHistory: [
      { timestamp: '2026-10-24 15:20', actor: 'Citizen Portal (Synthetic)', action: 'Signage improvement requested.' },
      { timestamp: '2026-10-25 19:20', actor: 'Civic Outreach Unit', action: 'Updated bilingual stream sorting boards installed.' },
    ],
    resolutionRecord: 'Signage installed and verified by Ward 03 officer.',
  },
  {
    id: 'DEMO-COMP-008',
    wardId: 'WARD-DEMO-05',
    routeId: 'ROUTE-DEMO-03',
    category: 'Delayed collection',
    reportedDate: '2026-10-24 09:50',
    assignedContractorId: 'DEMO-CONT-03',
    responsibleUnit: 'West Corridor Dispatch',
    status: 'Resolved',
    resolutionTimeHours: 19,
    verificationStatus: 'Verified',
    description: 'Morning organic waste van arrived 2 hours behind published ward schedule.',
    actionHistory: [
      { timestamp: '2026-10-24 09:50', actor: 'Citizen Portal (Synthetic)', action: 'Delay logged.' },
      { timestamp: '2026-10-25 04:50', actor: 'DEMO-CONT-03', action: 'Route timing adjusted and verified on subsequent shift.' },
    ],
    resolutionRecord: 'On-time arrival restored and confirmed via checkpoint log.',
  },
  {
    id: 'DEMO-COMP-009',
    wardId: 'WARD-DEMO-08',
    routeId: 'ROUTE-DEMO-04',
    category: 'Overflowing waste container',
    reportedDate: '2026-10-28 07:30',
    assignedContractorId: 'DEMO-CONT-04',
    responsibleUnit: 'South Metro Dispatch Unit',
    status: 'Received',
    resolutionTimeHours: null,
    verificationStatus: 'Pending Verification',
    description: 'High-density alley container full; awaiting primary handcart transfer to STS-South.',
    actionHistory: [
      { timestamp: '2026-10-28 07:30', actor: 'Citizen Portal (Synthetic)', action: 'Complaint received; queued for Ward 08 supervisor verification.' },
    ],
  },
  {
    id: 'DEMO-COMP-010',
    wardId: 'WARD-DEMO-06',
    routeId: 'ROUTE-DEMO-03',
    category: 'Missed waste collection',
    reportedDate: '2026-10-23 11:10',
    assignedContractorId: 'DEMO-CONT-03',
    responsibleUnit: 'West Corridor Dispatch',
    status: 'Resolved',
    resolutionTimeHours: 36,
    verificationStatus: 'Verified',
    description: 'Missed secondary pickup at housing block C.',
    actionHistory: [
      { timestamp: '2026-10-23 11:10', actor: 'Citizen Portal (Synthetic)', action: 'Complaint submitted.' },
      { timestamp: '2026-10-24 23:10', actor: 'DEMO-CONT-03', action: 'Cleared and logged in batch manifest.' },
    ],
    resolutionRecord: 'Resolved within 36 hours (within proposed 72-hour target).',
  },
  {
    id: 'DEMO-COMP-011',
    wardId: 'WARD-DEMO-07',
    routeId: 'ROUTE-DEMO-04',
    category: 'Segregated waste mixed together',
    reportedDate: '2026-10-22 16:40',
    assignedContractorId: 'DEMO-CONT-04',
    responsibleUnit: 'Segregation Compliance Inspector',
    status: 'Reopened',
    resolutionTimeHours: null,
    verificationStatus: 'Anomaly Flagged',
    description: 'Office paper recyclables mixed with wet canteen waste during evening loading.',
    actionHistory: [
      { timestamp: '2026-10-22 16:40', actor: 'Citizen Portal (Synthetic)', action: 'Reported mixed collection.' },
      { timestamp: '2026-10-24 10:00', actor: 'Audit Desk', action: 'Reopened after MRF-02 reported moisture contamination in batch.' },
    ],
  },
  {
    id: 'DEMO-COMP-012',
    wardId: 'WARD-DEMO-04',
    routeId: 'ROUTE-DEMO-05',
    category: 'Other waste-management issues',
    reportedDate: '2026-10-21 13:00',
    assignedContractorId: 'DEMO-CONT-02',
    responsibleUnit: 'Hazardous Waste Protocol Unit',
    status: 'Resolved',
    resolutionTimeHours: 16,
    verificationStatus: 'Verified',
    description: 'Request for scheduled pickup of segregated household e-waste and fluorescent bulbs.',
    actionHistory: [
      { timestamp: '2026-10-21 13:00', actor: 'Citizen Portal (Synthetic)', action: 'Special hazardous pickup requested.' },
      { timestamp: '2026-10-22 05:00', actor: 'DEMO-TRK-006 Crew', action: 'Routed safely to DEMO-FACILITY-10.' },
    ],
    resolutionRecord: 'Handled via dedicated hazardous route R-05.',
  },
  {
    id: 'DEMO-COMP-013',
    wardId: 'WARD-DEMO-01',
    routeId: 'ROUTE-DEMO-01',
    category: 'Overflowing waste container',
    reportedDate: '2026-10-20 12:00',
    assignedContractorId: 'DEMO-CONT-01',
    responsibleUnit: 'North Sector Operations',
    status: 'Resolved',
    resolutionTimeHours: 11,
    verificationStatus: 'Verified',
    description: 'Park perimeter bin full after weekend market activity.',
    actionHistory: [
      { timestamp: '2026-10-20 12:00', actor: 'Citizen Portal (Synthetic)', action: 'Logged container overflow.' },
      { timestamp: '2026-10-20 23:00', actor: 'DEMO-CONT-01', action: 'Emptied and weighed at DEMO-WS-01.' },
    ],
    resolutionRecord: 'Resolved in 11 hours.',
  },
  {
    id: 'DEMO-COMP-014',
    wardId: 'WARD-DEMO-02',
    routeId: 'ROUTE-DEMO-01',
    category: 'Illegal dumping',
    reportedDate: '2026-10-19 08:25',
    assignedContractorId: 'DEMO-CONT-01',
    responsibleUnit: 'North Sector Operations',
    status: 'Resolved',
    resolutionTimeHours: 31,
    verificationStatus: 'Verified',
    description: 'Construction and packaging waste left near drainage canal buffer.',
    actionHistory: [
      { timestamp: '2026-10-19 08:25', actor: 'Citizen Portal (Synthetic)', action: 'Reported canal-side dumping.' },
      { timestamp: '2026-10-20 15:25', actor: 'DEMO-CONT-01', action: 'Site cleared and sorted.' },
    ],
    resolutionRecord: 'Cleared and verified by ward environmental officer.',
  },
  {
    id: 'DEMO-COMP-015',
    wardId: 'WARD-DEMO-05',
    routeId: 'ROUTE-DEMO-03',
    category: 'Segregated waste mixed together',
    reportedDate: '2026-10-18 10:40',
    assignedContractorId: 'DEMO-CONT-03',
    responsibleUnit: 'West Corridor Dispatch',
    status: 'Resolved',
    resolutionTimeHours: 42,
    verificationStatus: 'Verified',
    description: 'Resident-sorted plastic recyclables placed in general compactor compartment.',
    actionHistory: [
      { timestamp: '2026-10-18 10:40', actor: 'Citizen Portal (Synthetic)', action: 'Complaint logged.' },
      { timestamp: '2026-10-20 04:40', actor: 'DEMO-CONT-03', action: 'Crew retrained on dual-compartment loading; verified on shift.' },
    ],
    resolutionRecord: 'Crew compliance audit completed.',
  },
  {
    id: 'DEMO-COMP-016',
    wardId: 'WARD-DEMO-08',
    routeId: 'ROUTE-DEMO-04',
    category: 'Delayed collection',
    reportedDate: '2026-10-27 11:00',
    assignedContractorId: 'DEMO-CONT-04',
    responsibleUnit: 'South Metro Dispatch Unit',
    status: 'Assigned',
    resolutionTimeHours: null,
    verificationStatus: 'Verified',
    description: 'Collection van delayed by 3 hours at narrow market intersection.',
    actionHistory: [
      { timestamp: '2026-10-27 11:00', actor: 'Citizen Portal (Synthetic)', action: 'Delay reported.' },
      { timestamp: '2026-10-27 14:00', actor: 'South Metro Dispatch', action: 'Assigned to night-window micro-vehicle.' },
    ],
  },
  {
    id: 'DEMO-COMP-017',
    wardId: 'WARD-DEMO-03',
    routeId: 'ROUTE-DEMO-02',
    category: 'Delayed collection',
    reportedDate: '2026-10-16 09:00',
    assignedContractorId: 'DEMO-CONT-02',
    responsibleUnit: 'Central Civic Logistics',
    status: 'Resolved',
    resolutionTimeHours: 9,
    verificationStatus: 'Verified',
    description: 'Minor 45-minute delay on dry recyclable pickup route.',
    actionHistory: [
      { timestamp: '2026-10-16 09:00', actor: 'Citizen Portal (Synthetic)', action: 'Reported delay.' },
      { timestamp: '2026-10-16 18:00', actor: 'DEMO-CONT-02', action: 'Completed and weighed.' },
    ],
    resolutionRecord: 'Resolved within same operational day (9 hours).',
  },
  {
    id: 'DEMO-COMP-018',
    wardId: 'WARD-DEMO-06',
    routeId: 'ROUTE-DEMO-03',
    category: 'Overflowing waste container',
    reportedDate: '2026-10-15 14:15',
    assignedContractorId: 'DEMO-CONT-03',
    responsibleUnit: 'West Corridor Dispatch',
    status: 'Resolved',
    resolutionTimeHours: 48,
    verificationStatus: 'Verified',
    description: 'Community bin overflow near bus stand.',
    actionHistory: [
      { timestamp: '2026-10-15 14:15', actor: 'Citizen Portal (Synthetic)', action: 'Reported overflow.' },
      { timestamp: '2026-10-17 14:15', actor: 'DEMO-CONT-03', action: 'Cleared and disinfected.' },
    ],
    resolutionRecord: 'Resolved within 48 hours.',
  },
  {
    id: 'DEMO-COMP-019',
    wardId: 'WARD-DEMO-07',
    routeId: 'ROUTE-DEMO-04',
    category: 'Missed waste collection',
    reportedDate: '2026-10-14 08:50',
    assignedContractorId: 'DEMO-CONT-04',
    responsibleUnit: 'South Metro Dispatch Unit',
    status: 'Resolved',
    resolutionTimeHours: 54,
    verificationStatus: 'Verified',
    description: 'Commercial block collection skipped during rainstorm.',
    actionHistory: [
      { timestamp: '2026-10-14 08:50', actor: 'Citizen Portal (Synthetic)', action: 'Reported missed collection.' },
      { timestamp: '2026-10-16 14:50', actor: 'DEMO-CONT-04', action: 'Recovery haul completed.' },
    ],
    resolutionRecord: 'Resolved in 54 hours.',
  },
  {
    id: 'DEMO-COMP-020',
    wardId: 'WARD-DEMO-08',
    routeId: 'ROUTE-DEMO-04',
    category: 'Illegal dumping',
    reportedDate: '2026-10-12 16:10',
    assignedContractorId: 'DEMO-CONT-04',
    responsibleUnit: 'Public Space Enforcement Team',
    status: 'Resolved',
    resolutionTimeHours: 64,
    verificationStatus: 'Verified',
    description: 'Mixed market waste piled outside transfer enclosure.',
    actionHistory: [
      { timestamp: '2026-10-12 16:10', actor: 'Citizen Portal (Synthetic)', action: 'Logged incident.' },
      { timestamp: '2026-10-15 08:10', actor: 'DEMO-CONT-04', action: 'Cleared and routed to STS-South.' },
    ],
    resolutionRecord: 'Resolved in 64 hours.',
  },
];

// 8. SERVICE ALERTS FOR OVERVIEW & INTEGRITY
export const INITIAL_ALERTS: ServiceAlert[] = [
  {
    id: 'ALERT-DEMO-01',
    title: 'Vehicle Missing Scheduled Collection Window',
    description: 'DEMO-TRK-011 missed scheduled 08:30 primary pickup window in Ward 08 (Old Dhaka Pilot). Relief dispatch queued.',
    severity: 'Critical',
    timestamp: '2026-10-28 09:05',
    targetModule: 'vehicles',
    relatedEntityId: 'DEMO-TRK-011',
    entityType: 'vehicle',
  },
  {
    id: 'ALERT-DEMO-02',
    title: 'Collection Route Running Behind Schedule',
    description: 'ROUTE-DEMO-03 (Vehicle DEMO-TRK-008) in Ward 06 is delayed by 45 minutes approaching STS-South.',
    severity: 'Delayed',
    timestamp: '2026-10-28 10:20',
    targetModule: 'map',
    relatedEntityId: 'DEMO-TRK-008',
    entityType: 'vehicle',
  },
  {
    id: 'ALERT-DEMO-03',
    title: 'Weighbridge Record Awaiting Tare Verification',
    description: 'Batch DEMO-BATCH-2026-009 at DEMO-WS-02 lacks exit tare weight scan. Net weight calculation held pending verification.',
    severity: 'Under Review',
    timestamp: '2026-10-28 11:10',
    targetModule: 'tracking',
    relatedEntityId: 'DEMO-BATCH-2026-009',
    entityType: 'batch',
  },
  {
    id: 'ALERT-DEMO-04',
    title: 'Facility Approaching Daily Receiving Threshold',
    description: 'South Central Transfer Station (DEMO-FACILITY-02) is at 92.6% of its 160 t/day illustrative capacity.',
    severity: 'Delayed',
    timestamp: '2026-10-28 11:50',
    targetModule: 'facilities',
    relatedEntityId: 'DEMO-FACILITY-02',
    entityType: 'facility',
  },
  {
    id: 'ALERT-DEMO-05',
    title: 'Citizen Complaint Awaiting Resolution in Ward 08',
    description: 'DEMO-COMP-001 (Missed waste collection) is actively in progress with South Metro Dispatch Unit.',
    severity: 'Under Review',
    timestamp: '2026-10-28 08:40',
    targetModule: 'complaints',
    relatedEntityId: 'DEMO-COMP-001',
    entityType: 'complaint',
  },
  {
    id: 'ALERT-DEMO-06',
    title: 'North Organic Recovery Route Operating On Schedule',
    description: 'DEMO-TRK-001 verified at DEMO-WS-01 (Net 4,820 kg) and en route to Bio-Compost Plant 01.',
    severity: 'On Schedule',
    timestamp: '2026-10-28 11:42',
    targetModule: 'tracking',
    relatedEntityId: 'DEMO-BATCH-2026-001',
    entityType: 'batch',
  },
];

// 9. TREND SERIES FOR OVERVIEW & PUBLIC DASHBOARD CHARTS
export const COLLECTION_TREND_SERIES = [
  { date: 'Oct 05', label: '05 Oct', organicTonnes: 28.4, recyclableTonnes: 14.2, residualTonnes: 19.8, hazardousTonnes: 1.4, onTimeRate: 84.2, recoveryRate: 51.0, complaintsReceived: 4, complaintsResolved: 3 },
  { date: 'Oct 10', label: '10 Oct', organicTonnes: 30.1, recyclableTonnes: 15.6, residualTonnes: 18.9, hazardousTonnes: 1.5, onTimeRate: 85.8, recoveryRate: 53.4, complaintsReceived: 3, complaintsResolved: 3 },
  { date: 'Oct 15', label: '15 Oct', organicTonnes: 31.8, recyclableTonnes: 16.4, residualTonnes: 18.2, hazardousTonnes: 1.3, onTimeRate: 86.5, recoveryRate: 55.2, complaintsReceived: 4, complaintsResolved: 4 },
  { date: 'Oct 20', label: '20 Oct', organicTonnes: 33.0, recyclableTonnes: 17.1, residualTonnes: 17.5, hazardousTonnes: 1.6, onTimeRate: 87.9, recoveryRate: 57.8, complaintsReceived: 3, complaintsResolved: 2 },
  { date: 'Oct 24', label: '24 Oct', organicTonnes: 34.5, recyclableTonnes: 18.2, residualTonnes: 16.8, hazardousTonnes: 1.5, onTimeRate: 88.6, recoveryRate: 59.5, complaintsReceived: 3, complaintsResolved: 2 },
  { date: 'Oct 28', label: '28 Oct', organicTonnes: 36.2, recyclableTonnes: 19.4, residualTonnes: 16.1, hazardousTonnes: 1.6, onTimeRate: 89.3, recoveryRate: 61.8, complaintsReceived: 3, complaintsResolved: 1 },
];
