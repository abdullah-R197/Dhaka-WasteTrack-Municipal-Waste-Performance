import React, { useState } from 'react';
import {
  Info,
  Play,
  ArrowUpRight,
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileSearch,
  Filter,
  RotateCcw,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import { useWasteTrack } from '../context/WasteTrackContext';
import { COLLECTION_TREND_SERIES } from '../data/syntheticDataset';

export const OverviewDashboard: React.FC = () => {
  const {
    wards,
    vehicles,
    facilities,
    batches,
    complaints,
    alerts,
    filters,
    setFilters,
    resetFilters,
    setActiveModule,
    setSelectedEntity,
    setIsSampleJourneyOpen,
    setSampleJourneyStep,
  } = useWasteTrack();

  const [activeKpiTooltip, setActiveKpiTooltip] = useState<string | null>(null);
  const [trendRange, setTrendRange] = useState<'6P' | '4P'>('6P');

  // Filter wards & records based on GlobalFilters
  const filteredWards = wards.filter((w) => {
    if (filters.wardId !== 'ALL' && w.id !== filters.wardId) return false;
    if (filters.contractorId !== 'ALL' && w.contractorId !== filters.contractorId) return false;
    return true;
  });

  const filteredBatches = batches.filter((b) => {
    if (filters.wardId !== 'ALL' && b.wardId !== filters.wardId) return false;
    if (filters.contractorId !== 'ALL' && b.contractorId !== filters.contractorId) return false;
    if (filters.wasteCategory !== 'ALL' && b.wasteCategory !== filters.wasteCategory) return false;
    return true;
  });

  const filteredComplaints = complaints.filter((c) => {
    if (filters.wardId !== 'ALL' && c.wardId !== filters.wardId) return false;
    if (filters.contractorId !== 'ALL' && c.assignedContractorId !== filters.contractorId)
      return false;
    return true;
  });

  const filteredVehicles = vehicles.filter((v) => {
    if (filters.wardId !== 'ALL' && v.wardId !== filters.wardId) return false;
    if (filters.contractorId !== 'ALL' && v.contractorId !== filters.contractorId) return false;
    if (filters.wasteCategory !== 'ALL' && v.wasteCategory !== filters.wasteCategory) return false;
    return true;
  });

  // Compute 8 KPIs from filtered synthetic data
  const totalScheduled = filteredWards.reduce((acc, w) => acc + w.scheduledCollections, 0);
  const totalCompleted = filteredWards.reduce((acc, w) => acc + w.completedCollections, 0);
  const totalOnTime = filteredWards.reduce((acc, w) => acc + w.onTimeCollections, 0);
  const totalRecordedWasteTonnes = filteredWards.reduce(
    (acc, w) => acc + w.recordedWasteTonnes,
    0
  );

  const completionRate =
    totalScheduled > 0 ? ((totalCompleted / totalScheduled) * 100).toFixed(1) : null;
  const onTimeRate = totalScheduled > 0 ? ((totalOnTime / totalScheduled) * 100).toFixed(1) : null;

  const avgSegregationRate =
    filteredWards.length > 0
      ? (
          filteredWards.reduce((acc, w) => acc + w.sourceSegregationRate, 0) /
          filteredWards.length
        ).toFixed(1)
      : null;

  // Material Recovery Rate from verified batches
  const verifiedBatches = filteredBatches.filter(
    (b) =>
      b.grossWeightKg !== null &&
      b.tareWeightKg !== null &&
      b.recoveredMaterialKg !== null
  );
  const totalIncomingKg = verifiedBatches.reduce(
    (acc, b) => acc + ((b.grossWeightKg ?? 0) - (b.tareWeightKg ?? 0)),
    0
  );
  const totalRecoveredKg = verifiedBatches.reduce(
    (acc, b) => acc + (b.recoveredMaterialKg ?? 0),
    0
  );
  const materialRecoveryRate =
    totalIncomingKg > 0 ? ((totalRecoveredKg / totalIncomingKg) * 100).toFixed(1) : null;

  const resolvedComplaintsCount = filteredComplaints.filter((c) => c.status === 'Resolved').length;
  const complaintResolutionRate =
    filteredComplaints.length > 0
      ? ((resolvedComplaintsCount / filteredComplaints.length) * 100).toFixed(1)
      : null;

  const activeVehiclesCount = filteredVehicles.filter((v) => v.status !== 'Missed').length;
  const reportingFacilitiesCount = facilities.filter(
    (f) => f.status !== 'Calibration Pending'
  ).length;

  const kpis = [
    {
      id: 'kpi-1',
      name: 'Total Waste Recorded',
      value: `${totalRecordedWasteTonnes.toFixed(1)} t`,
      sub: `Across ${filteredWards.length} demonstration ward(s) · 30-day cycle`,
      trend: '+4.2% weighbridge capture vs prior demo cycle',
      formula:
        'Sum of certified Net Waste Weight (Gross − Tare) recorded across demonstration weighbridges for selected wards.',
    },
    {
      id: 'kpi-2',
      name: 'Collection Completion Rate',
      value: completionRate !== null ? `${completionRate}%` : 'Insufficient Data',
      sub: `${totalCompleted} of ${totalScheduled} scheduled tasks completed`,
      trend: 'Proposed Target: 95.0% (Illustrative)',
      formula: 'Completed scheduled collection tasks ÷ Total scheduled collection tasks × 100.',
    },
    {
      id: 'kpi-3',
      name: 'On-Time Collection Rate',
      value: onTimeRate !== null ? `${onTimeRate}%` : 'Insufficient Data',
      sub: `${totalOnTime} pickups within scheduled ward window`,
      trend: 'Proposed Target: 90.0% (Illustrative)',
      formula: 'Collections completed on time ÷ Total scheduled collection tasks × 100.',
    },
    {
      id: 'kpi-4',
      name: 'Source Segregation Rate',
      value: avgSegregationRate !== null ? `${avgSegregationRate}%` : 'Insufficient Data',
      sub: 'Households & points separating wet/dry streams',
      trend: '+6.8% following ward pilot signage rollout',
      formula:
        'Weight of uncontaminated segregated waste streams at collection origin ÷ Total waste collected × 100.',
    },
    {
      id: 'kpi-5',
      name: 'Material Recovery Rate',
      value: materialRecoveryRate !== null ? `${materialRecoveryRate}%` : 'Insufficient Data',
      sub: `${(totalRecoveredKg / 1000).toFixed(1)} t recovered of ${(
        totalIncomingKg / 1000
      ).toFixed(1)} t verified intake`,
      trend: 'Denominator: All verified incoming batch weights',
      formula:
        'Recovered material weight (compost + dry recyclables) ÷ Recorded total incoming verified waste weight × 100.',
    },
    {
      id: 'kpi-6',
      name: 'Complaints Resolved',
      value:
        complaintResolutionRate !== null
          ? `${resolvedComplaintsCount} / ${filteredComplaints.length} (${complaintResolutionRate}%)`
          : 'Insufficient Data',
      sub: 'Citizen service issue accountability log',
      trend: 'Proposed Target: ≤ 72h resolution window',
      formula: 'Resolved complaints ÷ Total complaints received × 100.',
    },
    {
      id: 'kpi-7',
      name: 'Active Demonstration Vehicles',
      value: `${activeVehiclesCount} / ${filteredVehicles.length}`,
      sub: 'Fleet units logging checkpoint telemetry',
      trend: '1 unit flagged for missed window (DEMO-TRK-011)',
      formula:
        'Count of synthetic collection vehicles actively transmitting route checkpoints in the current demonstration shift.',
    },
    {
      id: 'kpi-8',
      name: 'Facilities Reporting Data',
      value: `${reportingFacilitiesCount} / ${facilities.length}`,
      sub: 'STS, Weighbridges, MRFs, Compost & Disposal cells',
      trend: '1 weighbridge lane pending tare calibration',
      formula:
        'Operational facilities and weighbridges submitting verified daily intake and capacity records.',
    },
  ];

  // Composition chart data (clearly labelled as illustrative)
  const compositionData = [
    { name: 'Organic Waste (Illustrative)', value: 54, color: '#059669' },
    { name: 'Recyclable Materials (Illustrative)', value: 24, color: '#2563EB' },
    { name: 'Residual Waste (Illustrative)', value: 19, color: '#64748B' },
    { name: 'Hazardous Household (Illustrative)', value: 3, color: '#DC2626' },
  ];

  // Destination Breakdown chart data
  const destinationData = [
    {
      destination: 'Organic Treatment (Compost/AD)',
      tonnes: 186.6,
      pathway: 'Primary Recovery',
    },
    {
      destination: 'Material Recovery Facilities (MRF)',
      tonnes: 122.7,
      pathway: 'Primary Recovery',
    },
    {
      destination: 'Engineered Residual Disposal',
      tonnes: 145.1,
      pathway: 'Post-Recovery Inert',
    },
    {
      destination: 'Conditional WtE (Subject to 4 Gates)',
      tonnes: 22.4,
      pathway: 'Conditional Residual Only',
    },
    {
      destination: 'Isolated Hazardous Containment',
      tonnes: 11.2,
      pathway: 'Dedicated Safe Protocol',
    },
  ];

  const displayedTrendSeries =
    trendRange === '4P' ? COLLECTION_TREND_SERIES.slice(-4) : COLLECTION_TREND_SERIES;

  return (
    <div className="space-y-8">
      {/* Executive Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-semibold text-amber-800">
              <span>DEMO ENVIRONMENT — ALL DATA IS ILLUSTRATIVE</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-800">
                PRINCIPLE: REFORM FIRST. RECOVER VALUE. USE WtE ONLY WHEN VIABLE.
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Dhaka WasteTrack — Municipal Waste Performance
            </h1>
            <p className="text-sm text-slate-600 max-w-3xl">
              An integrated digital model for monitoring collection, transportation, recovery,
              treatment, and disposal. Built by Team MacroMind for the CPD Climate Week 2026
              Climate Policy Case Competition.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => {
                setSampleJourneyStep(0);
                setIsSampleJourneyOpen(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Run Sample Waste Journey
            </button>
            <button
              onClick={() => setActiveModule('map')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Open Operations Map
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quick Global Filter Bar */}
        <div className="mt-5 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              <span>Filter Overview Data:</span>
            </div>

            <select
              aria-label="Filter by Ward"
              value={filters.wardId}
              onChange={(e) => setFilters((prev) => ({ ...prev, wardId: e.target.value }))}
              className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 font-medium"
            >
              <option value="ALL">All 8 Demonstration Wards</option>
              {wards.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.id} — Ward 0{w.wardNumber}
                </option>
              ))}
            </select>

            <select
              aria-label="Filter by Contractor"
              value={filters.contractorId}
              onChange={(e) => setFilters((prev) => ({ ...prev, contractorId: e.target.value }))}
              className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 font-medium"
            >
              <option value="ALL">All 4 Synthetic Contractors</option>
              <option value="DEMO-CONT-01">DEMO-CONT-01 (North Sector)</option>
              <option value="DEMO-CONT-02">DEMO-CONT-02 (Central Civic)</option>
              <option value="DEMO-CONT-03">DEMO-CONT-03 (West Corridor)</option>
              <option value="DEMO-CONT-04">DEMO-CONT-04 (South Metro)</option>
            </select>

            <select
              aria-label="Filter by Waste Stream"
              value={filters.wasteCategory}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  wasteCategory: e.target.value as typeof filters.wasteCategory,
                }))
              }
              className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 font-medium"
            >
              <option value="ALL">All Waste Categories</option>
              <option value="Organic">Organic Waste</option>
              <option value="Recyclable">Recyclable Materials</option>
              <option value="Residual">Residual Waste</option>
              <option value="Hazardous">Hazardous Household Waste</option>
            </select>
          </div>

          {(filters.wardId !== 'ALL' ||
            filters.contractorId !== 'ALL' ||
            filters.wasteCategory !== 'ALL') && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-xs font-medium text-emerald-800 hover:text-emerald-950"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* 8 KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div
            key={kpi.id}
            className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between relative"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-semibold text-slate-600">{kpi.name}</span>
                <button
                  onClick={() =>
                    setActiveKpiTooltip(activeKpiTooltip === kpi.id ? null : kpi.id)
                  }
                  className="text-slate-400 hover:text-slate-700 p-0.5 rounded"
                  aria-label={`View formula and explanation for ${kpi.name}`}
                  title={kpi.formula}
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>
              <div className="text-2xl font-bold font-mono text-slate-900 mt-2 tabular-nums">
                {kpi.value}
              </div>
              <p className="text-xs text-slate-600 mt-1">{kpi.sub}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-medium text-emerald-800">
              {kpi.trend}
            </div>

            {activeKpiTooltip === kpi.id && (
              <div className="mt-3 p-3 bg-slate-900 text-white text-xs rounded-lg space-y-1">
                <div className="font-semibold text-emerald-400">Indicator Definition:</div>
                <p className="text-slate-200 leading-relaxed">{kpi.formula}</p>
                <div className="text-[10px] text-slate-400 pt-1">
                  Source: Synthetic demonstration dataset (Illustrative).
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Overview Charts Row 1: Waste Collection Trend + Illustrative Waste Composition */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart A: Waste Collection Trend */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                A. Recorded Waste Collection Trend (Illustrative Demo Period)
              </h2>
              <p className="text-xs text-slate-500">
                Tonnes recorded at demonstration weighbridges by waste stream (Synthetic data)
              </p>
            </div>
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
              <button
                onClick={() => setTrendRange('4P')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  trendRange === '4P'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Recent 4 Checkpoints
              </button>
              <button
                onClick={() => setTrendRange('6P')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  trendRange === '6P'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Full Oct Demo Cycle
              </button>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={displayedTrendSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#475569' }} />
                <YAxis tick={{ fontSize: 12, fill: '#475569' }} unit=" t" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E2E8F0',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Area
                  type="monotone"
                  dataKey="organicTonnes"
                  name="Organic (t)"
                  stackId="1"
                  stroke="#059669"
                  fill="#10B981"
                  fillOpacity={0.25}
                />
                <Area
                  type="monotone"
                  dataKey="recyclableTonnes"
                  name="Recyclable (t)"
                  stackId="1"
                  stroke="#2563EB"
                  fill="#3B82F6"
                  fillOpacity={0.25}
                />
                <Area
                  type="monotone"
                  dataKey="residualTonnes"
                  name="Residual (t)"
                  stackId="1"
                  stroke="#64748B"
                  fill="#94A3B8"
                  fillOpacity={0.25}
                />
                <Area
                  type="monotone"
                  dataKey="hazardousTonnes"
                  name="Hazardous (t)"
                  stackId="1"
                  stroke="#DC2626"
                  fill="#EF4444"
                  fillOpacity={0.25}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart B: Illustrative Waste Composition */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              B. Illustrative Waste Composition
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Synthetic demonstration stream breakdown (Not a claim of official national statistics)
            </p>
          </div>

          <div className="h-56 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={compositionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {compositionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any) => [`${value}% (Illustrative)`, 'Share']}
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E2E8F0',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 border-t border-slate-100 pt-3">
            {compositionData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-xs shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-slate-700 font-medium">{item.name}</span>
                </div>
                <span className="font-mono font-semibold text-slate-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overview Row 2: Waste Destination Breakdown + Operational Service Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart C: Waste Destination Breakdown */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              C. Waste Destination Breakdown (Illustrative Quantities)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Prioritising Organic Treatment & Material Recovery; WtE shown strictly as a
              conditional pathway for suitable residual waste.
            </p>

            <div className="h-64 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={destinationData}
                  layout="vertical"
                  margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis type="number" tick={{ fontSize: 12, fill: '#475569' }} unit=" t" />
                  <YAxis
                    dataKey="destination"
                    type="category"
                    width={175}
                    tick={{ fontSize: 11, fill: '#0F172A' }}
                  />
                  <Tooltip
                    formatter={(val: any) => [`${val} tonnes (Synthetic)`, 'Recorded Intake']}
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E2E8F0',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="tonnes" name="Tonnes Directed" fill="#14532D" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 flex items-center justify-between">
            <span>
              <strong>Policy Note:</strong> Conditional WtE receives only verified dry residual
              fractions when all 4 viability gates are satisfied.
            </span>
            <button
              onClick={() => setActiveModule('recovery')}
              className="text-emerald-800 font-semibold hover:underline ml-3 whitespace-nowrap shrink-0"
            >
              Inspect WtE Gates →
            </button>
          </div>
        </div>

        {/* Panel D: Service Alerts */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                D. Operational Service Alerts (Clickable)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Click any alert to inspect the linked vehicle, batch, facility, or complaint
              </p>
            </div>
            <span className="text-xs font-mono text-slate-500">
              {alerts.length} Active Records
            </span>
          </div>

          <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden">
            {alerts.map((alert) => (
              <button
                key={alert.id}
                onClick={() => {
                  setSelectedEntity({
                    type: alert.entityType,
                    id: alert.relatedEntityId,
                  });
                }}
                className="w-full text-left p-4 hover:bg-slate-50 transition-colors flex items-start justify-between gap-4 cursor-pointer"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span
                      className={`font-semibold ${
                        alert.severity === 'Critical'
                          ? 'text-red-700'
                          : alert.severity === 'Delayed'
                          ? 'text-amber-700'
                          : alert.severity === 'Under Review'
                          ? 'text-blue-700'
                          : 'text-emerald-800'
                      }`}
                    >
                      [{alert.severity}]
                    </span>
                    <span className="font-mono text-slate-500">{alert.relatedEntityId}</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-slate-500">{alert.timestamp}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900">{alert.title}</h3>
                  <p className="text-xs text-slate-600">{alert.description}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
