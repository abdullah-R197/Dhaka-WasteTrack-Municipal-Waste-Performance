import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  ModuleId,
  WardRecord,
  ContractorRecord,
  RouteRecord,
  VehicleRecord,
  FacilityRecord,
  WeighbridgeRecord,
  WasteBatchRecord,
  ComplaintRecord,
  ServiceAlert,
  GlobalFilters,
  WtEGateState,
  ComplaintCategory,
} from '../types/waste';
import {
  INITIAL_WARDS,
  INITIAL_CONTRACTORS,
  INITIAL_ROUTES,
  INITIAL_VEHICLES,
  INITIAL_FACILITIES,
  INITIAL_WEIGHBRIDGE_RECORDS,
  INITIAL_BATCHES,
  INITIAL_COMPLAINTS,
  INITIAL_ALERTS,
} from '../data/syntheticDataset';

export interface SelectedEntity {
  type: 'vehicle' | 'facility' | 'batch' | 'complaint' | 'ward' | 'contractor';
  id: string;
}

interface WasteTrackContextType {
  activeModule: ModuleId;
  setActiveModule: (mod: ModuleId) => void;
  wards: WardRecord[];
  contractors: ContractorRecord[];
  routes: RouteRecord[];
  vehicles: VehicleRecord[];
  facilities: FacilityRecord[];
  weighbridgeRecords: WeighbridgeRecord[];
  batches: WasteBatchRecord[];
  complaints: ComplaintRecord[];
  alerts: ServiceAlert[];
  filters: GlobalFilters;
  setFilters: React.Dispatch<React.SetStateAction<GlobalFilters>>;
  resetFilters: () => void;
  selectedEntity: SelectedEntity | null;
  setSelectedEntity: (entity: SelectedEntity | null) => void;
  // Route simulation state
  simVehicleId: string;
  setSimVehicleId: (id: string) => void;
  simStepIndex: number;
  setSimStepIndex: React.Dispatch<React.SetStateAction<number>>;
  isSimPlaying: boolean;
  setIsSimPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  stepSimulationForward: () => void;
  resetRouteSimulation: () => void;
  // Sample Waste Journey modal state
  isSampleJourneyOpen: boolean;
  setIsSampleJourneyOpen: (open: boolean) => void;
  sampleJourneyStep: number;
  setSampleJourneyStep: React.Dispatch<React.SetStateAction<number>>;
  // Presentation mode & judge walkthrough
  isPresentationMode: boolean;
  setIsPresentationMode: React.Dispatch<React.SetStateAction<boolean>>;
  presentationStep: number;
  setPresentationStep: (step: number) => void;
  // WtE 4-Gate interactive state
  wteGates: WtEGateState;
  toggleWteGate: (gate: keyof WtEGateState) => void;
  // Actions
  submitSyntheticComplaint: (input: {
    wardId: string;
    category: ComplaintCategory;
    description: string;
    referenceId?: string;
  }) => ComplaintRecord;
  updateComplaintStatus: (complaintId: string, newStatus: ComplaintRecord['status']) => void;
  resetDemoEnvironment: () => void;
  navigateToVehicleOnMap: (vehicleId: string) => void;
}

const DEFAULT_FILTERS: GlobalFilters = {
  wardId: 'ALL',
  contractorId: 'ALL',
  dateRange: '30D',
  wasteCategory: 'ALL',
  status: 'ALL',
  issueType: 'ALL',
};

const DEFAULT_WTE_GATES: WtEGateState = {
  technical: true,
  financial: false,
  environmental: true,
  governance: true,
};

const WasteTrackContext = createContext<WasteTrackContextType | undefined>(undefined);

export const WasteTrackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeModule, setActiveModule] = useState<ModuleId>('overview');
  const [wards, setWards] = useState<WardRecord[]>(INITIAL_WARDS);
  const [contractors, setContractors] = useState<ContractorRecord[]>(INITIAL_CONTRACTORS);
  const [routes, setRoutes] = useState<RouteRecord[]>(INITIAL_ROUTES);
  const [vehicles, setVehicles] = useState<VehicleRecord[]>(INITIAL_VEHICLES);
  const [facilities, setFacilities] = useState<FacilityRecord[]>(INITIAL_FACILITIES);
  const [weighbridgeRecords, setWeighbridgeRecords] = useState<WeighbridgeRecord[]>(
    INITIAL_WEIGHBRIDGE_RECORDS
  );
  const [batches, setBatches] = useState<WasteBatchRecord[]>(INITIAL_BATCHES);
  const [complaints, setComplaints] = useState<ComplaintRecord[]>(INITIAL_COMPLAINTS);
  const [alerts, setAlerts] = useState<ServiceAlert[]>(INITIAL_ALERTS);

  const [filters, setFilters] = useState<GlobalFilters>(DEFAULT_FILTERS);
  const [selectedEntity, setSelectedEntity] = useState<SelectedEntity | null>(null);

  // Route simulation state
  const [simVehicleId, setSimVehicleId] = useState<string>('DEMO-TRK-001');
  const [simStepIndex, setSimStepIndex] = useState<number>(2); // 0 to 4
  const [isSimPlaying, setIsSimPlaying] = useState<boolean>(false);

  // Sample Waste Journey modal state
  const [isSampleJourneyOpen, setIsSampleJourneyOpen] = useState<boolean>(false);
  const [sampleJourneyStep, setSampleJourneyStep] = useState<number>(0);

  // Presentation mode state
  const [isPresentationMode, setIsPresentationMode] = useState<boolean>(false);
  const [presentationStep, setPresentationStepState] = useState<number>(0);

  // WtE 4-gate interactive checklist
  const [wteGates, setWteGates] = useState<WtEGateState>(DEFAULT_WTE_GATES);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  const stepSimulationForward = useCallback(() => {
    setSimStepIndex((prev) => {
      if (prev >= 4) {
        setIsSimPlaying(false);
        return 4;
      }
      return prev + 1;
    });
  }, []);

  const resetRouteSimulation = useCallback(() => {
    setIsSimPlaying(false);
    setSimStepIndex(0);
  }, []);

  useEffect(() => {
    if (!isSimPlaying) return;
    const timer = setInterval(() => {
      setSimStepIndex((prev) => {
        if (prev >= 4) {
          setIsSimPlaying(false);
          return 4;
        }
        return prev + 1;
      });
    }, 1800);
    return () => clearInterval(timer);
  }, [isSimPlaying]);

  const toggleWteGate = useCallback((gate: keyof WtEGateState) => {
    setWteGates((prev) => ({
      ...prev,
      [gate]: !prev[gate],
    }));
  }, []);

  const submitSyntheticComplaint = useCallback(
    (input: {
      wardId: string;
      category: ComplaintCategory;
      description: string;
      referenceId?: string;
    }) => {
      const nextNum = complaints.length + 1;
      const newId = `DEMO-COMP-${String(nextNum).padStart(3, '0')}`;
      const ward = wards.find((w) => w.id === input.wardId) || wards[0];
      const wardRoute = routes.find((r) => r.wardId === ward.id) || routes[0];
      const nowStr = '2026-10-28 12:45';

      const newComplaint: ComplaintRecord = {
        id: newId,
        wardId: ward.id,
        routeId: wardRoute.id,
        category: input.category,
        reportedDate: nowStr,
        assignedContractorId: ward.contractorId,
        responsibleUnit: 'Municipal Accountability Rapid Desk (Demo)',
        status: 'Received',
        resolutionTimeHours: null,
        verificationStatus: 'Pending Verification',
        description: input.description.trim(),
        referenceId: input.referenceId?.trim() || undefined,
        actionHistory: [
          {
            timestamp: nowStr,
            actor: 'Prototype Simulation Form',
            action: 'Synthetic demonstration complaint created in local state.',
          },
        ],
      };

      setComplaints((prev) => [newComplaint, ...prev]);

      // Add a live alert so the overview dashboard reflects it immediately
      setAlerts((prev) => [
        {
          id: `ALERT-${newId}`,
          title: `New Synthetic Complaint Logged (${newId})`,
          description: `${input.category} reported in ${ward.name}. Assigned to ${ward.contractorId}.`,
          severity: 'Under Review',
          timestamp: nowStr,
          targetModule: 'complaints',
          relatedEntityId: newId,
          entityType: 'complaint',
        },
        ...prev,
      ]);

      return newComplaint;
    },
    [complaints.length, wards, routes]
  );

  const updateComplaintStatus = useCallback(
    (complaintId: string, newStatus: ComplaintRecord['status']) => {
      setComplaints((prev) =>
        prev.map((c) => {
          if (c.id !== complaintId) return c;
          const isNowResolved = newStatus === 'Resolved';
          return {
            ...c,
            status: newStatus,
            resolutionTimeHours: isNowResolved ? c.resolutionTimeHours ?? 12 : null,
            verificationStatus: isNowResolved ? 'Verified' : c.verificationStatus,
            resolutionRecord: isNowResolved
              ? 'Marked resolved during interactive prototype demonstration.'
              : c.resolutionRecord,
            actionHistory: [
              ...c.actionHistory,
              {
                timestamp: '2026-10-28 12:48',
                actor: 'Interactive Demo Evaluator',
                action: `Status updated to "${newStatus}" in demonstration session.`,
              },
            ],
          };
        })
      );
    },
    []
  );

  const resetDemoEnvironment = useCallback(() => {
    setWards(INITIAL_WARDS);
    setContractors(INITIAL_CONTRACTORS);
    setRoutes(INITIAL_ROUTES);
    setVehicles(INITIAL_VEHICLES);
    setFacilities(INITIAL_FACILITIES);
    setWeighbridgeRecords(INITIAL_WEIGHBRIDGE_RECORDS);
    setBatches(INITIAL_BATCHES);
    setComplaints(INITIAL_COMPLAINTS);
    setAlerts(INITIAL_ALERTS);
    setFilters(DEFAULT_FILTERS);
    setSelectedEntity(null);
    setSimVehicleId('DEMO-TRK-001');
    setSimStepIndex(2);
    setIsSimPlaying(false);
    setWteGates(DEFAULT_WTE_GATES);
    setIsSampleJourneyOpen(false);
    setSampleJourneyStep(0);
  }, []);

  const navigateToVehicleOnMap = useCallback((vehicleId: string) => {
    setSimVehicleId(vehicleId);
    setActiveModule('map');
    setSelectedEntity({ type: 'vehicle', id: vehicleId });
  }, []);

  const setPresentationStep = useCallback((step: number) => {
    setPresentationStepState(step);
    const stepModules: ModuleId[] = ['overview', 'map', 'tracking', 'wards', 'recovery', 'roadmap'];
    const targetMod = stepModules[step] || 'overview';
    setActiveModule(targetMod);
  }, []);

  return (
    <WasteTrackContext.Provider
      value={{
        activeModule,
        setActiveModule,
        wards,
        contractors,
        routes,
        vehicles,
        facilities,
        weighbridgeRecords,
        batches,
        complaints,
        alerts,
        filters,
        setFilters,
        resetFilters,
        selectedEntity,
        setSelectedEntity,
        simVehicleId,
        setSimVehicleId,
        simStepIndex,
        setSimStepIndex,
        isSimPlaying,
        setIsSimPlaying,
        stepSimulationForward,
        resetRouteSimulation,
        isSampleJourneyOpen,
        setIsSampleJourneyOpen,
        sampleJourneyStep,
        setSampleJourneyStep,
        isPresentationMode,
        setIsPresentationMode,
        presentationStep,
        setPresentationStep,
        wteGates,
        toggleWteGate,
        submitSyntheticComplaint,
        updateComplaintStatus,
        resetDemoEnvironment,
        navigateToVehicleOnMap,
      }}
    >
      {children}
    </WasteTrackContext.Provider>
  );
};

export const useWasteTrack = () => {
  const ctx = useContext(WasteTrackContext);
  if (!ctx) {
    throw new Error('useWasteTrack must be used within a WasteTrackProvider');
  }
  return ctx;
};
