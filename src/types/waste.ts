export type WasteCategory = 'Organic' | 'Recyclable' | 'Residual' | 'Hazardous';

export type OperationalStatus = 'On Schedule' | 'Delayed' | 'Under Review' | 'Completed' | 'Missed';

export type VerificationStatus = 'Verified' | 'Pending Verification' | 'Anomaly Flagged';

export type ComplaintStatus = 'Received' | 'Assigned' | 'In Progress' | 'Resolved' | 'Reopened';

export type ComplaintCategory =
  | 'Missed waste collection'
  | 'Illegal dumping'
  | 'Segregated waste mixed together'
  | 'Delayed collection'
  | 'Overflowing waste container'
  | 'Other waste-management issues';

export type FacilityType =
  | 'Transfer Station'
  | 'Weighbridge'
  | 'Material Recovery Facility'
  | 'Organic Waste Treatment'
  | 'Hazardous Treatment'
  | 'Residual Disposal'
  | 'Conditional WtE';

export type ModuleId =
  | 'overview'
  | 'map'
  | 'tracking'
  | 'vehicles'
  | 'facilities'
  | 'wards'
  | 'contractors'
  | 'complaints'
  | 'recovery'
  | 'roadmap'
  | 'about';

export interface WardRecord {
  id: string; // e.g., WARD-DEMO-01
  wardNumber: number;
  name: string; // Illustrative zone label
  contractorId: string;
  scheduledCollections: number;
  completedCollections: number;
  onTimeCollections: number;
  missedCollections: number;
  recordedWasteTonnes: number;
  sourceSegregationRate: number; // percentage
  performanceStatus: 'Optimal' | 'Satisfactory' | 'Needs Attention' | 'Critical Review';
  coordinates: [number, number]; // Illustrative Dhaka lat, lng
  schematicPos: { x: number; y: number };
}

export interface ContractorRecord {
  id: string; // e.g., DEMO-CONT-01
  label: string;
  assignedWards: string[];
  scheduledTasks: number;
  completedTasks: number;
  onTimeTasks: number;
  missedCollections: number;
  recordCompletenessRate: number; // percentage
  performanceStatus: 'Exemplary' | 'Compliant' | 'Watchlist' | 'Under Audit';
}

export interface RouteStop {
  stopId: string;
  label: string;
  type: 'Collection Point' | 'Transfer Station' | 'Weighbridge' | 'Treatment Facility' | 'Disposal Site';
  status: 'Completed' | 'Current' | 'Upcoming' | 'Missed';
  timestamp?: string;
  coordinates: [number, number];
  schematicPos: { x: number; y: number };
}

export interface RouteRecord {
  id: string; // e.g., ROUTE-DEMO-01
  name: string;
  wardId: string;
  contractorId: string;
  wasteCategory: WasteCategory;
  status: OperationalStatus;
  stops: RouteStop[];
}

export interface VehicleRecord {
  id: string; // e.g., DEMO-TRK-001
  wardId: string;
  routeId: string;
  contractorId: string;
  wasteCategory: WasteCategory;
  status: OperationalStatus;
  lastRecordedWeightKg: number | null;
  lastCheckpoint: string;
  nextPlannedStop: string;
  lastTimestamp: string;
  completionRate: number;
  destinationFacilityId: string;
  coordinates: [number, number];
  schematicPos: { x: number; y: number };
}

export interface FacilityRecord {
  id: string; // e.g., DEMO-FACILITY-01 or DEMO-WS-01
  name: string;
  type: FacilityType;
  illustrativeLocation: string;
  receivingCapacityTonnesPerDay: number | null;
  quantityReceivedTonnes: number | null;
  status: 'Operational' | 'Approaching Threshold' | 'Calibration Pending' | 'Conditional Evaluation';
  lastUpdated: string;
  coordinates: [number, number];
  schematicPos: { x: number; y: number };
  notes: string;
}

export interface WeighbridgeRecord {
  id: string; // e.g., WB-REC-2026-01
  weighbridgeId: string; // DEMO-WS-01 or DEMO-WS-02
  batchId: string;
  vehicleId: string;
  wardId: string;
  timestamp: string;
  grossWeightKg: number | null;
  tareWeightKg: number | null;
  destinationFacilityId: string;
  verificationStatus: VerificationStatus;
  notes?: string;
}

export interface CustodyStage {
  stageName: string;
  timestamp: string;
  operatorOrSystem: string;
  recordedQuantityKg: number | null;
  status:
    | 'Recorded'
    | 'Received'
    | 'Weighed'
    | 'Transferred'
    | 'Processed'
    | 'Recovered'
    | 'Residual Disposal Completed'
    | 'Pending Verification';
  notes: string;
}

export interface WasteBatchRecord {
  id: string; // e.g., DEMO-BATCH-2026-001
  date: string; // YYYY-MM-DD
  collectionTime: string;
  wardId: string;
  collectionSource: string;
  wasteCategory: WasteCategory;
  vehicleId: string;
  contractorId: string;
  grossWeightKg: number | null;
  tareWeightKg: number | null;
  weighbridgeRecordId: string | null;
  transferStationId: string;
  treatmentFacilityId: string;
  recoveredMaterialKg: number | null;
  residualQuantityKg: number | null;
  finalDisposalDestinationId: string;
  operationalStatus: OperationalStatus;
  verificationStatus: VerificationStatus;
  timeline: CustodyStage[];
}

export interface ComplaintActionLog {
  timestamp: string;
  actor: string;
  action: string;
}

export interface ComplaintRecord {
  id: string; // e.g., DEMO-COMP-001
  wardId: string;
  routeId: string;
  category: ComplaintCategory;
  reportedDate: string; // YYYY-MM-DD HH:mm
  assignedContractorId: string;
  responsibleUnit: string;
  status: ComplaintStatus;
  resolutionTimeHours: number | null;
  verificationStatus: VerificationStatus;
  description: string;
  referenceId?: string;
  actionHistory: ComplaintActionLog[];
  resolutionRecord?: string;
}

export interface ServiceAlert {
  id: string;
  title: string;
  description: string;
  severity: 'On Schedule' | 'Delayed' | 'Under Review' | 'Resolved' | 'Critical';
  timestamp: string;
  targetModule: ModuleId;
  relatedEntityId: string;
  entityType: 'vehicle' | 'facility' | 'batch' | 'complaint' | 'ward';
}

export interface WtEGateState {
  technical: boolean;
  financial: boolean;
  environmental: boolean;
  governance: boolean;
}

export interface GlobalFilters {
  wardId: string; // 'ALL' or WARD-DEMO-XX
  contractorId: string; // 'ALL' or DEMO-CONT-XX
  dateRange: '7D' | '14D' | '30D' | 'ALL';
  wasteCategory: 'ALL' | WasteCategory;
  status: 'ALL' | OperationalStatus;
  issueType: 'ALL' | ComplaintCategory;
}
