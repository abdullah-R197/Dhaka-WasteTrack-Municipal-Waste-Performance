import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  Map as MapIcon,
  Network,
  Truck,
  Building2,
  Scale,
  AlertTriangle,
  CheckCircle2,
  Filter,
  Info,
} from 'lucide-react';
import L from 'leaflet';
import { useWasteTrack } from '../context/WasteTrackContext';
import { WasteCategory } from '../types/waste';

const SIMULATION_STAGES = [
  {
    step: 0,
    title: '1. Waste Collected at Ward Origin',
    detail:
      'Collection vehicle scans segregated ward containers and logs batch origin timestamp.',
    schematicPos: { x: 140, y: 95 },
    coordinates: [23.8728, 90.3984] as [number, number],
  },
  {
    step: 1,
    title: '2. Vehicle Arrives at Secondary Transfer Station',
    detail:
      'Stream-specific unloading bay assigned at STS-North (DEMO-FACILITY-01) to prevent mixing.',
    schematicPos: { x: 430, y: 155 },
    coordinates: [23.8191, 90.4125] as [number, number],
  },
  {
    step: 2,
    title: '3. Waste Weighed at Digital Weighbridge',
    detail:
      'Gross weight and certified vehicle tare weight recorded at DEMO-WS-01 to compute Net Weight.',
    schematicPos: { x: 580, y: 155 },
    coordinates: [23.8152, 90.4245] as [number, number],
  },
  {
    step: 3,
    title: '4. Transferred to Recovery / Treatment Facility',
    detail:
      'Batch routed to Bio-Compost & AD Plant 01 (DEMO-FACILITY-05) or MRF based on segregated category.',
    schematicPos: { x: 775, y: 245 },
    coordinates: [23.7880, 90.4720] as [number, number],
  },
  {
    step: 4,
    title: '5. Destination Record & Residual Disposal Completed',
    detail:
      'Post-recovery inert screening residuals transferred to Sanitary Cell A (DEMO-FACILITY-07); custody closed.',
    schematicPos: { x: 960, y: 210 },
    coordinates: [23.7210, 90.4890] as [number, number],
  },
];

export const OperationsMap: React.FC = () => {
  const {
    wards,
    vehicles,
    facilities,
    routes,
    setSelectedEntity,
    simVehicleId,
    setSimVehicleId,
    simStepIndex,
    setSimStepIndex,
    isSimPlaying,
    setIsSimPlaying,
    stepSimulationForward,
    resetRouteSimulation,
  } = useWasteTrack();

  const [viewMode, setViewMode] = useState<'schematic' | 'geographic'>('schematic');

  // Layer toggles as required by Section 7
  const [showRoutes, setShowRoutes] = useState(true);
  const [showVehicles, setShowVehicles] = useState(true);
  const [showTransferStations, setShowTransferStations] = useState(true);
  const [showWeighbridges, setShowWeighbridges] = useState(true);
  const [showTreatmentSites, setShowTreatmentSites] = useState(true);
  const [showDisposalSites, setShowDisposalSites] = useState(true);
  const [routeTimingFilter, setRouteTimingFilter] = useState<'ALL' | 'Delayed' | 'On Schedule'>(
    'ALL'
  );
  const [wardFilter, setWardFilter] = useState<string>('ALL');
  const [vehicleStatusFilter, setVehicleStatusFilter] = useState<string>('ALL');
  const [streamFilter, setStreamFilter] = useState<'ALL' | WasteCategory>('ALL');

  // Leaflet map container ref
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  // Filter entities
  const visibleWards = wards.filter((w) => wardFilter === 'ALL' || w.id === wardFilter);

  const visibleRoutes = routes.filter((r) => {
    if (!showRoutes) return false;
    if (wardFilter !== 'ALL' && r.wardId !== wardFilter) return false;
    if (streamFilter !== 'ALL' && r.wasteCategory !== streamFilter) return false;
    if (routeTimingFilter !== 'ALL' && r.status !== routeTimingFilter) return false;
    return true;
  });

  const visibleVehicles = vehicles.filter((v) => {
    if (!showVehicles) return false;
    if (wardFilter !== 'ALL' && v.wardId !== wardFilter) return false;
    if (vehicleStatusFilter !== 'ALL' && v.status !== vehicleStatusFilter) return false;
    if (streamFilter !== 'ALL' && v.wasteCategory !== streamFilter) return false;
    return true;
  });

  const visibleFacilities = facilities.filter((f) => {
    if (f.type === 'Transfer Station' && !showTransferStations) return false;
    if (f.type === 'Weighbridge' && !showWeighbridges) return false;
    if (
      (f.type === 'Material Recovery Facility' ||
        f.type === 'Organic Waste Treatment' ||
        f.type === 'Hazardous Treatment') &&
      !showTreatmentSites
    )
      return false;
    if ((f.type === 'Residual Disposal' || f.type === 'Conditional WtE') && !showDisposalSites)
      return false;
    return true;
  });

  const simVehicle = vehicles.find((v) => v.id === simVehicleId) || vehicles[0];
  const currentSimStage = SIMULATION_STAGES[simStepIndex] || SIMULATION_STAGES[0];

  // Initialize and update Leaflet map when in 'geographic' mode
  useEffect(() => {
    if (viewMode !== 'geographic' || !mapContainerRef.current) return;

    if (!leafletMapRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [23.785, 90.405],
        zoom: 12,
        scrollWheelZoom: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; OpenStreetMap contributors · Synthetic Demonstration Overlay (Not Live Municipal Locations)',
      }).addTo(map);

      markersLayerRef.current = L.layerGroup().addTo(map);
      leafletMapRef.current = map;
    }

    const layerGroup = markersLayerRef.current;
    if (!layerGroup) return;
    layerGroup.clearLayers();

    // Draw visible routes as polylines
    visibleRoutes.forEach((route) => {
      const latlngs = route.stops.map((s) => s.coordinates);
      const color =
        route.wasteCategory === 'Organic'
          ? '#059669'
          : route.wasteCategory === 'Recyclable'
          ? '#2563EB'
          : route.wasteCategory === 'Hazardous'
          ? '#DC2626'
          : '#475569';

      L.polyline(latlngs, {
        color,
        weight: route.status === 'Delayed' ? 4 : 3,
        dashArray: route.wasteCategory === 'Hazardous' ? '6, 6' : undefined,
        opacity: 0.85,
      })
        .bindPopup(
          `<div style="font-size:12px"><strong>${route.name}</strong><br/>Stream: ${route.wasteCategory}<br/>Status: ${route.status} (Synthetic)</div>`
        )
        .addTo(layerGroup);
    });

    // Draw Ward Collection Points
    visibleWards.forEach((ward) => {
      const marker = L.circleMarker(ward.coordinates, {
        radius: 7,
        fillColor: '#0F172A',
        color: '#FFFFFF',
        weight: 2,
        fillOpacity: 0.9,
      });
      marker.bindTooltip(`${ward.id} (Origin)`, { direction: 'top' });
      marker.on('click', () => setSelectedEntity({ type: 'ward', id: ward.id }));
      marker.addTo(layerGroup);
    });

    // Draw Facilities
    visibleFacilities.forEach((fac) => {
      const color =
        fac.type === 'Transfer Station'
          ? '#1E293B'
          : fac.type === 'Weighbridge'
          ? '#2563EB'
          : fac.type === 'Material Recovery Facility'
          ? '#0284C7'
          : fac.type === 'Organic Waste Treatment'
          ? '#059669'
          : fac.type === 'Hazardous Treatment'
          ? '#DC2626'
          : fac.type === 'Conditional WtE'
          ? '#D97706'
          : '#475569';

      const marker = L.circleMarker(fac.coordinates, {
        radius: 9,
        fillColor: color,
        color: '#FFFFFF',
        weight: 2,
        fillOpacity: 0.95,
      });
      marker.bindTooltip(`${fac.id}: ${fac.type}`, { direction: 'top' });
      marker.on('click', () => setSelectedEntity({ type: 'facility', id: fac.id }));
      marker.addTo(layerGroup);
    });

    // Draw Vehicles
    visibleVehicles.forEach((veh) => {
      const isSimulated = veh.id === simVehicle.id;
      const coords = isSimulated ? currentSimStage.coordinates : veh.coordinates;

      const marker = L.circleMarker(coords, {
        radius: isSimulated ? 11 : 8,
        fillColor:
          veh.status === 'Delayed' || veh.status === 'Missed' ? '#D97706' : '#14532D',
        color: isSimulated ? '#10B981' : '#FFFFFF',
        weight: isSimulated ? 4 : 2,
        fillOpacity: 1,
      });
      marker.bindTooltip(
        `${veh.id} (${veh.wasteCategory}) ${isSimulated ? '— SIMULATED ACTIVE' : ''}`,
        { direction: 'top' }
      );
      marker.on('click', () => setSelectedEntity({ type: 'vehicle', id: veh.id }));
      marker.addTo(layerGroup);
    });

    return () => {
      // Keep instance alive while in geographic view
    };
  }, [
    viewMode,
    visibleRoutes,
    visibleWards,
    visibleFacilities,
    visibleVehicles,
    simVehicle.id,
    currentSimStage,
    setSelectedEntity,
  ]);

  // Cleanup Leaflet when unmounting or switching back to schematic
  useEffect(() => {
    if (viewMode === 'schematic' && leafletMapRef.current) {
      leafletMapRef.current.remove();
      leafletMapRef.current = null;
      markersLayerRef.current = null;
    }
  }, [viewMode]);

  const getCategoryStroke = (cat: WasteCategory) => {
    if (cat === 'Organic') return '#059669';
    if (cat === 'Recyclable') return '#2563EB';
    if (cat === 'Hazardous') return '#DC2626';
    return '#64748B';
  };

  return (
    <div className="space-y-6">
      {/* Header & View Mode Switcher */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="text-xs font-mono font-semibold text-amber-800">
              REQUIREMENT C — DIGITAL PLATFORM · ALL LOCATIONS & ROUTES ARE SYNTHETIC DEMONSTRATIONS
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">
              Interactive Municipal Operations Map (Dhaka Demonstration Area)
            </h1>
            <p className="text-sm text-slate-600 mt-0.5">
              Linking collection points, fleet vehicles, secondary transfer stations, digital
              weighbridges, recovery/treatment plants, and residual disposal sites.
            </p>
          </div>

          {/* Dual-Mode Toggle */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl shrink-0">
            <button
              onClick={() => setViewMode('schematic')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                viewMode === 'schematic'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <Network className="w-4 h-4" />
              Interactive System Schematic
            </button>
            <button
              onClick={() => setViewMode('geographic')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                viewMode === 'geographic'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <MapIcon className="w-4 h-4" />
              Dhaka Geographic Map Overlay
            </button>
          </div>
        </div>

        {/* Route Simulation Control Bar */}
        <div className="mt-5 p-4 bg-slate-900 text-white rounded-xl flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span>CLIENT-SIDE ROUTE & CHECKPOINT SIMULATOR (NOT LIVE GPS)</span>
              <span>·</span>
              <span>ACTIVE VEHICLE: {simVehicle.id}</span>
            </div>
            <div className="text-sm font-bold text-white">{currentSimStage.title}</div>
            <p className="text-xs text-slate-300">{currentSimStage.detail}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <select
              aria-label="Select Vehicle to Simulate"
              value={simVehicleId}
              onChange={(e) => {
                setSimVehicleId(e.target.value);
                setSimStepIndex(0);
                setIsSimPlaying(false);
              }}
              className="text-xs bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 font-mono"
            >
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  Simulate {v.id} ({v.wasteCategory})
                </option>
              ))}
            </select>

            <button
              onClick={() => setIsSimPlaying((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors cursor-pointer"
            >
              {isSimPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Simulate Route
                </>
              )}
            </button>

            <button
              onClick={stepSimulationForward}
              disabled={simStepIndex >= 4}
              className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg disabled:opacity-40 cursor-pointer"
            >
              <SkipForward className="w-3.5 h-3.5" />
              Step Forward
            </button>

            <button
              onClick={resetRouteSimulation}
              className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>
        </div>

        {/* 5-Stage Simulation Progress Bar */}
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-5 gap-2">
          {SIMULATION_STAGES.map((stage, idx) => (
            <button
              key={stage.step}
              onClick={() => {
                setIsSimPlaying(false);
                setSimStepIndex(idx);
              }}
              className={`text-left p-2.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                idx === simStepIndex
                  ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-semibold'
                  : idx < simStepIndex
                  ? 'border-slate-200 bg-slate-50 text-slate-700'
                  : 'border-slate-200 bg-white text-slate-400'
              }`}
            >
              <div className="font-mono text-[11px]">Checkpoint {idx + 1}/5</div>
              <div className="truncate mt-0.5">{stage.title.replace(/^\d\.\s*/, '')}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Map Filters & Layer Controls */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-700 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              Layer Visibility:
            </span>
            {[
              { label: 'Collection Routes', state: showRoutes, setter: setShowRoutes },
              { label: 'Vehicles (12)', state: showVehicles, setter: setShowVehicles },
              {
                label: 'Transfer Stations (2)',
                state: showTransferStations,
                setter: setShowTransferStations,
              },
              {
                label: 'Weighbridges (2)',
                state: showWeighbridges,
                setter: setShowWeighbridges,
              },
              {
                label: 'Recovery & Treatment (5)',
                state: showTreatmentSites,
                setter: setShowTreatmentSites,
              },
              {
                label: 'Disposal & Conditional WtE (3)',
                state: showDisposalSites,
                setter: setShowDisposalSites,
              },
            ].map((layer) => (
              <button
                key={layer.label}
                onClick={() => layer.setter(!layer.state)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md border transition-colors cursor-pointer ${
                  layer.state
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {layer.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              aria-label="Filter Map by Ward"
              value={wardFilter}
              onChange={(e) => setWardFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
            >
              <option value="ALL">All Wards (01–08)</option>
              {wards.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.id} (Ward 0{w.wardNumber})
                </option>
              ))}
            </select>

            <select
              aria-label="Filter Map by Waste Stream"
              value={streamFilter}
              onChange={(e) => setStreamFilter(e.target.value as 'ALL' | WasteCategory)}
              className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
            >
              <option value="ALL">All Waste Streams</option>
              <option value="Organic">Organic Stream</option>
              <option value="Recyclable">Recyclable Stream</option>
              <option value="Residual">Residual Stream</option>
              <option value="Hazardous">Hazardous Stream (Isolated)</option>
            </select>

            <select
              aria-label="Filter Map by Vehicle Status"
              value={vehicleStatusFilter}
              onChange={(e) => setVehicleStatusFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
            >
              <option value="ALL">All Vehicle Statuses</option>
              <option value="On Schedule">On Schedule</option>
              <option value="Delayed">Delayed</option>
              <option value="Under Review">Under Review</option>
              <option value="Completed">Completed</option>
              <option value="Missed">Missed</option>
            </select>

            <select
              aria-label="Filter Routes by Schedule"
              value={routeTimingFilter}
              onChange={(e) =>
                setRouteTimingFilter(e.target.value as 'ALL' | 'Delayed' | 'On Schedule')
              }
              className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
            >
              <option value="ALL">All Routes (Completed & Delayed)</option>
              <option value="On Schedule">On-Schedule Routes Only</option>
              <option value="Delayed">Delayed Routes Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Map Viewport */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        {viewMode === 'schematic' ? (
          <div className="p-4 overflow-x-auto">
            <div className="min-w-[960px]">
              <svg
                viewBox="0 0 1080 480"
                className="w-full h-auto bg-slate-50 rounded-lg border border-slate-200"
              >
                {/* Stage Column Headers */}
                <g className="text-[11px] font-bold fill-slate-500">
                  <text x="80" y="30">
                    1. WARD COLLECTION POINTS
                  </text>
                  <text x="370" y="30">
                    2. TRANSFER STATIONS
                  </text>
                  <text x="535" y="30">
                    3. WEIGHBRIDGES
                  </text>
                  <text x="710" y="30">
                    4. RECOVERY & TREATMENT
                  </text>
                  <text x="905" y="30">
                    5. FINAL RESIDUAL / WtE
                  </text>
                </g>

                {/* Vertical Guide Dividers */}
                {[310, 500, 665, 885].map((xPos) => (
                  <line
                    key={xPos}
                    x1={xPos}
                    y1={45}
                    x2={xPos}
                    y2={455}
                    stroke="#E2E8F0"
                    strokeDasharray="4 4"
                  />
                ))}

                {/* Render Visible Routes */}
                {visibleRoutes.map((route) => {
                  const pts = route.stops.map((s) => `${s.schematicPos.x},${s.schematicPos.y}`).join(' ');
                  const strokeColor = getCategoryStroke(route.wasteCategory);
                  return (
                    <g key={route.id}>
                      <polyline
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth={route.status === 'Delayed' ? 3.5 : 2.5}
                        strokeDasharray={
                          route.wasteCategory === 'Hazardous'
                            ? '6 4'
                            : route.status === 'Delayed'
                            ? '4 2'
                            : undefined
                        }
                        opacity={0.75}
                        points={pts}
                      />
                    </g>
                  );
                })}

                {/* Active Simulated Route Highlight */}
                <polyline
                  fill="none"
                  stroke="#10B981"
                  strokeWidth={4}
                  opacity={0.4}
                  points={SIMULATION_STAGES.map(
                    (s) => `${s.schematicPos.x},${s.schematicPos.y}`
                  ).join(' ')}
                />

                {/* Ward Origin Nodes */}
                {visibleWards.map((ward) => (
                  <g
                    key={ward.id}
                    transform={`translate(${ward.schematicPos.x}, ${ward.schematicPos.y})`}
                    onClick={() => setSelectedEntity({ type: 'ward', id: ward.id })}
                    className="cursor-pointer"
                  >
                    <circle r="13" fill="#0F172A" stroke="#FFFFFF" strokeWidth="2" />
                    <text
                      textAnchor="middle"
                      dy="4"
                      fill="#FFFFFF"
                      fontSize="9"
                      fontWeight="bold"
                    >
                      W0{ward.wardNumber}
                    </text>
                    <text
                      x="18"
                      dy="4"
                      fill="#0F172A"
                      fontSize="10"
                      fontWeight="600"
                    >
                      {ward.id}
                    </text>
                  </g>
                ))}

                {/* Facility & Weighbridge Nodes */}
                {visibleFacilities.map((fac) => {
                  const fill =
                    fac.type === 'Transfer Station'
                      ? '#1E293B'
                      : fac.type === 'Weighbridge'
                      ? '#2563EB'
                      : fac.type === 'Material Recovery Facility'
                      ? '#0284C7'
                      : fac.type === 'Organic Waste Treatment'
                      ? '#059669'
                      : fac.type === 'Hazardous Treatment'
                      ? '#DC2626'
                      : fac.type === 'Conditional WtE'
                      ? '#D97706'
                      : '#475569';

                  return (
                    <g
                      key={fac.id}
                      transform={`translate(${fac.schematicPos.x}, ${fac.schematicPos.y})`}
                      onClick={() => setSelectedEntity({ type: 'facility', id: fac.id })}
                      className="cursor-pointer"
                    >
                      <rect
                        x="-16"
                        y="-14"
                        width="32"
                        height="28"
                        rx="6"
                        fill={fill}
                        stroke="#FFFFFF"
                        strokeWidth="2"
                      />
                      <text
                        textAnchor="middle"
                        dy="4"
                        fill="#FFFFFF"
                        fontSize="8"
                        fontWeight="bold"
                      >
                        {fac.type === 'Weighbridge'
                          ? 'WB'
                          : fac.type === 'Transfer Station'
                          ? 'STS'
                          : fac.type === 'Material Recovery Facility'
                          ? 'MRF'
                          : fac.type === 'Organic Waste Treatment'
                          ? 'ORG'
                          : fac.type === 'Hazardous Treatment'
                          ? 'HAZ'
                          : fac.type === 'Conditional WtE'
                          ? 'WtE?'
                          : 'DISP'}
                      </text>
                      <text
                        y="26"
                        textAnchor="middle"
                        fill="#0F172A"
                        fontSize="9.5"
                        fontWeight="600"
                      >
                        {fac.id}
                      </text>
                    </g>
                  );
                })}

                {/* Vehicle Markers */}
                {visibleVehicles.map((veh) => {
                  const isSim = veh.id === simVehicle.id;
                  const pos = isSim ? currentSimStage.schematicPos : veh.schematicPos;
                  const badgeColor =
                    veh.status === 'Missed'
                      ? '#DC2626'
                      : veh.status === 'Delayed'
                      ? '#D97706'
                      : '#14532D';

                  return (
                    <g
                      key={veh.id}
                      transform={`translate(${pos.x}, ${pos.y})`}
                      onClick={() => setSelectedEntity({ type: 'vehicle', id: veh.id })}
                      className="cursor-pointer"
                    >
                      {isSim && (
                        <circle
                          r="20"
                          fill="none"
                          stroke="#10B981"
                          strokeWidth="3"
                          strokeDasharray="3 2"
                        />
                      )}
                      <circle
                        r={isSim ? '13' : '10'}
                        fill={badgeColor}
                        stroke="#FFFFFF"
                        strokeWidth="2"
                      />
                      <text
                        textAnchor="middle"
                        dy="3"
                        fill="#FFFFFF"
                        fontSize="7.5"
                        fontWeight="bold"
                      >
                        {veh.id.replace('DEMO-TRK-', 'T')}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        ) : (
          <div className="relative">
            <div ref={mapContainerRef} className="w-full h-[500px]" />
          </div>
        )}

        {/* Map Legend & Pathway Integrity Note */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-bold text-slate-900">Pathway Legend:</span>
            <span className="inline-flex items-center gap-1.5 text-slate-700">
              <span className="w-3 h-1 bg-emerald-600 inline-block" /> Organic → Compost/AD
            </span>
            <span className="inline-flex items-center gap-1.5 text-slate-700">
              <span className="w-3 h-1 bg-blue-600 inline-block" /> Recyclable → MRF
            </span>
            <span className="inline-flex items-center gap-1.5 text-slate-700">
              <span className="w-3 h-1 bg-slate-500 inline-block" /> Residual → Sanitary Cell /
              Conditional WtE
            </span>
            <span className="inline-flex items-center gap-1.5 text-red-700 font-medium">
              <span className="w-3 h-1 bg-red-600 inline-block" /> Hazardous → Isolated Safe
              Containment (Never Mixed)
            </span>
          </div>
          <div className="text-slate-500">
            Click any vehicle, ward, or facility node on the map to open its synthetic telemetry
            drawer.
          </div>
        </div>
      </div>
    </div>
  );
};
