import React from 'react';
import {
  Filter,
  RotateCcw,
  ArrowUpRight,
  Calculator,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from 'recharts';
import { useWasteTrack } from '../context/WasteTrackContext';
import { COLLECTION_TREND_SERIES } from '../data/syntheticDataset';

interface PublicPerformanceProps {
  mode: 'wards' | 'contractors';
}

export const PublicPerformance: React.FC<PublicPerformanceProps> = ({ mode }) => {
  const {
    wards,
    contractors,
    complaints,
    batches,
    filters,
    setFilters,
    resetFilters,
    setSelectedEntity,
    setActiveModule,
  } = useWasteTrack();

  // Filter wards
  const filteredWards = wards.filter((w) => {
    if (filters.wardId !== 'ALL' && w.id !== filters.wardId) return false;
    if (filters.contractorId !== 'ALL' && w.contractorId !== filters.contractorId) return false;
    return true;
  });

  // Filter contractors
  const filteredContractors = contractors.filter((c) => {
    if (filters.contractorId !== 'ALL' && c.id !== filters.contractorId) return false;
    if (filters.wardId !== 'ALL' && !c.assignedWards.includes(filters.wardId)) return false;
    return true;
  });

  // Prepare Ward Chart Data
  const wardChartData = filteredWards.map((w) => {
    const onTimeRate = Number(((w.onTimeCollections / w.scheduledCollections) * 100).toFixed(1));
    const completionRate = Number(
      ((w.completedCollections / w.scheduledCollections) * 100).toFixed(1)
    );
    return {
      ward: `W0${w.wardNumber}`,
      id: w.id,
      onTimeRate,
      completionRate,
      missed: w.missedCollections,
      segregationRate: w.sourceSegregationRate,
    };
  });

  // Prepare Contractor Chart Data
  const contractorChartData = filteredContractors.map((c) => {
    const onTimeRate = Number(((c.onTimeTasks / c.scheduledTasks) * 100).toFixed(1));
    const completionRate = Number(((c.completedTasks / c.scheduledTasks) * 100).toFixed(1));
    return {
      contractor: c.id,
      onTimeRate,
      completionRate,
      completeness: c.recordCompletenessRate,
      missed: c.missedCollections,
    };
  });

  return (
    <div className="space-y-6">
      {/* Header & Sub-View Switcher */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="text-xs font-mono font-semibold text-amber-800">
              REQUIREMENT D — PUBLIC MUNICIPAL ACCOUNTABILITY DASHBOARD · NO LOGIN REQUIRED
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">
              {mode === 'wards'
                ? 'Ward-Level Service Performance & Public Scorecard'
                : 'Contractor Performance Scorecard & SLA Compliance'}
            </h1>
            <p className="text-sm text-slate-600 mt-0.5">
              Inspect scheduled vs. completed collections, missed pickups, source segregation rates,
              and citizen complaint resolution across demonstration wards and synthetic contractors.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl shrink-0">
            <button
              onClick={() => setActiveModule('wards')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                mode === 'wards'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Ward Performance (8 Wards)
            </button>
            <button
              onClick={() => setActiveModule('contractors')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                mode === 'contractors'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Contractor Scorecard (4 Units)
            </button>
          </div>
        </div>

        {/* 6 Main Public Filters required by Section 9 */}
        <div className="mt-5 pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <select
            aria-label="Filter by Ward"
            value={filters.wardId}
            onChange={(e) => setFilters((prev) => ({ ...prev, wardId: e.target.value }))}
            className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
          >
            <option value="ALL">All 8 Wards</option>
            {wards.map((w) => (
              <option key={w.id} value={w.id}>
                {w.id} (Ward 0{w.wardNumber})
              </option>
            ))}
          </select>

          <select
            aria-label="Filter by Contractor"
            value={filters.contractorId}
            onChange={(e) => setFilters((prev) => ({ ...prev, contractorId: e.target.value }))}
            className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
          >
            <option value="ALL">All 4 Contractors</option>
            {contractors.map((c) => (
              <option key={c.id} value={c.id}>
                {c.id}
              </option>
            ))}
          </select>

          <select
            aria-label="Filter by Date Range"
            value={filters.dateRange}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                dateRange: e.target.value as typeof filters.dateRange,
              }))
            }
            className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
          >
            <option value="30D">30-Day Demo Cycle</option>
            <option value="14D">Last 14 Days (Demo)</option>
            <option value="7D">Last 7 Days (Demo)</option>
            <option value="ALL">Full Demonstration Archive</option>
          </select>

          <select
            aria-label="Filter by Waste Category"
            value={filters.wasteCategory}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                wasteCategory: e.target.value as typeof filters.wasteCategory,
              }))
            }
            className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
          >
            <option value="ALL">All Waste Streams</option>
            <option value="Organic">Organic</option>
            <option value="Recyclable">Recyclable</option>
            <option value="Residual">Residual</option>
            <option value="Hazardous">Hazardous</option>
          </select>

          <select
            aria-label="Filter by Collection Status"
            value={filters.status}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                status: e.target.value as typeof filters.status,
              }))
            }
            className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
          >
            <option value="ALL">All Collection Statuses</option>
            <option value="On Schedule">On Schedule</option>
            <option value="Completed">Completed</option>
            <option value="Delayed">Delayed</option>
            <option value="Missed">Missed</option>
          </select>

          <button
            onClick={resetFilters}
            className="inline-flex items-center justify-center gap-1.5 text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg px-3 py-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Filters
          </button>
        </div>
      </div>

      {/* Ward Performance Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Demonstration Ward Performance Table ({filteredWards.length} Wards)
            </h2>
            <p className="text-xs text-slate-500">
              Click any ward row to open its contextual detail drawer with fleet assignments and
              service complaints.
            </p>
          </div>
          <span className="text-xs font-mono text-amber-800 font-semibold">
            Proposed Targets: On-Time ≥ 90% · Segregation ≥ 60% (Illustrative)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-600">
              <tr>
                <th className="py-3 px-4">Ward Number</th>
                <th className="py-3 px-4">Assigned Contractor</th>
                <th className="py-3 px-4 text-right">Scheduled</th>
                <th className="py-3 px-4 text-right">Completed</th>
                <th className="py-3 px-4 text-right">Missed</th>
                <th className="py-3 px-4 text-right">On-Time Rate</th>
                <th className="py-3 px-4 text-right">Waste Recorded</th>
                <th className="py-3 px-4 text-right">Segregation Rate</th>
                <th className="py-3 px-4 text-right">Complaints (Resolved)</th>
                <th className="py-3 px-4">Performance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs">
              {filteredWards.map((w) => {
                const onTimeRate = ((w.onTimeCollections / w.scheduledCollections) * 100).toFixed(
                  1
                );
                const wardComplaints = complaints.filter((c) => c.wardId === w.id);
                const resolvedCount = wardComplaints.filter((c) => c.status === 'Resolved').length;
                const resRate =
                  wardComplaints.length > 0
                    ? ((resolvedCount / wardComplaints.length) * 100).toFixed(0)
                    : '100';

                return (
                  <tr
                    key={w.id}
                    onClick={() => setSelectedEntity({ type: 'ward', id: w.id })}
                    className="hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="font-mono font-bold text-slate-900">{w.id}</div>
                      <div className="text-[11px] text-slate-500">{w.name}</div>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-800">{w.contractorId}</td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums">
                      {w.scheduledCollections}
                    </td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums">
                      {w.completedCollections}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-red-700 tabular-nums">
                      {w.missedCollections}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-slate-900 tabular-nums">
                      {onTimeRate}%
                    </td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums">
                      {w.recordedWasteTonnes.toFixed(1)} t
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-semibold text-emerald-800 tabular-nums">
                      {w.sourceSegregationRate.toFixed(1)}%
                    </td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums">
                      {wardComplaints.length} ({resRate}%)
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`font-semibold ${
                          w.performanceStatus === 'Optimal'
                            ? 'text-emerald-800'
                            : w.performanceStatus === 'Satisfactory'
                            ? 'text-blue-700'
                            : w.performanceStatus === 'Needs Attention'
                            ? 'text-amber-700'
                            : 'text-red-700'
                        }`}
                      >
                        {w.performanceStatus}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Contractor Performance Scorecard Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Synthetic Contractor Performance Scorecard ({filteredContractors.length} Contractors)
            </h2>
            <p className="text-xs text-slate-500">
              All contractor identifiers (DEMO-CONT-01 to 04) are synthetic and do not represent real
              companies.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-600">
              <tr>
                <th className="py-3 px-4">Contractor ID (Synthetic)</th>
                <th className="py-3 px-4">Assigned Wards</th>
                <th className="py-3 px-4 text-right">Scheduled Tasks</th>
                <th className="py-3 px-4 text-right">Completed Tasks</th>
                <th className="py-3 px-4 text-right">On-Time Performance</th>
                <th className="py-3 px-4 text-right">Missed Collections</th>
                <th className="py-3 px-4 text-right">Complaints (Resolved)</th>
                <th className="py-3 px-4 text-right">Record Completeness</th>
                <th className="py-3 px-4">Overall Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs">
              {filteredContractors.map((c) => {
                const onTime = ((c.onTimeTasks / c.scheduledTasks) * 100).toFixed(1);
                const contComplaints = complaints.filter((comp) => comp.assignedContractorId === c.id);
                const resolved = contComplaints.filter((comp) => comp.status === 'Resolved').length;

                return (
                  <tr
                    key={c.id}
                    onClick={() => setSelectedEntity({ type: 'contractor', id: c.id })}
                    className="hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="font-mono font-bold text-slate-900">{c.id}</div>
                      <div className="text-[11px] text-slate-500">{c.label}</div>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-700">
                      {c.assignedWards.join(', ')}
                    </td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums">
                      {c.scheduledTasks}
                    </td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums">
                      {c.completedTasks}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-slate-900 tabular-nums">
                      {onTime}%
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-red-700 tabular-nums">
                      {c.missedCollections}
                    </td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums">
                      {resolved} / {contComplaints.length}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-semibold text-emerald-800 tabular-nums">
                      {c.recordCompletenessRate}%
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`font-semibold ${
                          c.performanceStatus === 'Exemplary'
                            ? 'text-emerald-800'
                            : c.performanceStatus === 'Compliant'
                            ? 'text-blue-700'
                            : c.performanceStatus === 'Watchlist'
                            ? 'text-amber-700'
                            : 'text-red-700'
                        }`}
                      >
                        {c.performanceStatus}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5 Interactive Service Performance Charts required by Section 9 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1 & 2: On-time collection & Source Segregation by Ward */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="text-sm font-bold text-slate-900">
            1. On-Time Collection & Source Segregation Rate by Ward (%)
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Comparing ward-level collection punctuality against household segregation compliance
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={wardChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="ward" tick={{ fontSize: 12 }} />
                <YAxis unit="%" domain={[0, 100]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="onTimeRate" name="On-Time Rate (%)" fill="#0F172A" />
                <Bar dataKey="segregationRate" name="Source Segregation (%)" fill="#059669" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Missed Collections by Ward */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="text-sm font-bold text-slate-900">
            2. Missed Scheduled Collections by Ward (Task Count)
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Identifies high-density wards requiring micro-vehicle or transfer station intervention
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={wardChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="ward" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="missed" name="Missed Collection Tasks" fill="#DC2626" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Contractor Performance Comparison */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="text-sm font-bold text-slate-900">
            3. Contractor Performance & Weighbridge Record Completeness (%)
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Synthetic contractor comparison across on-time completion and manifest completeness
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={contractorChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="contractor" tick={{ fontSize: 11 }} />
                <YAxis unit="%" domain={[0, 100]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="onTimeRate" name="On-Time Performance (%)" fill="#2563EB" />
                <Bar dataKey="completeness" name="Record Completeness (%)" fill="#14532D" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4 & 5: Material Recovery & Complaint Resolution Trend */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="text-sm font-bold text-slate-900">
            4 & 5. Material Recovery Rate & On-Time Trend Over Demo Period
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Illustrates system-wide improvement as segregation and weighbridge tracking scale
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={COLLECTION_TREND_SERIES}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis unit="%" domain={[40, 100]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line
                  type="monotone"
                  dataKey="onTimeRate"
                  name="On-Time Collection (%)"
                  stroke="#0F172A"
                  strokeWidth={2.5}
                />
                <Line
                  type="monotone"
                  dataKey="recoveryRate"
                  name="Material Recovery Rate (%)"
                  stroke="#059669"
                  strokeWidth={2.5}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Indicator Definitions Panel with Explicit Formulas */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-emerald-800" />
          <h2 className="text-base font-bold text-slate-900">
            Indicator Definitions & Calculation Methodology
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="font-bold text-slate-900">Collection Completion Rate</div>
            <div className="font-mono text-emerald-800">
              Completed scheduled collection tasks ÷ Total scheduled collection tasks × 100
            </div>
            <p className="text-slate-600 pt-1">
              Measures basic fulfillment of ward pickup schedules. Proposed Target: 95%
              (Illustrative).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="font-bold text-slate-900">On-Time Collection Rate</div>
            <div className="font-mono text-emerald-800">
              Collections completed on time ÷ Total scheduled collection tasks × 100
            </div>
            <p className="text-slate-600 pt-1">
              Prevents secondary container overflow and street littering during peak traffic hours.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="font-bold text-slate-900">Missed Collection Rate</div>
            <div className="font-mono text-red-700">
              Missed scheduled collection tasks ÷ Total scheduled collection tasks × 100
            </div>
            <p className="text-slate-600 pt-1">
              Triggers automatic supervisor review and citizen complaint cross-verification.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="font-bold text-slate-900">Complaint Resolution Rate</div>
            <div className="font-mono text-emerald-800">
              Resolved complaints ÷ Total complaints received × 100
            </div>
            <p className="text-slate-600 pt-1">
              Evaluated against a configurable proposed service target of 72 hours (Not a claim of
              an existing statutory mandate).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1 md:col-span-2">
            <div className="font-bold text-slate-900">
              Material Recovery Rate (Denominator & Scope Disclosure)
            </div>
            <div className="font-mono text-emerald-800">
              Recovered material weight (compost + dry recyclables) ÷ Recorded total incoming
              verified waste weight × 100
            </div>
            <p className="text-slate-600 pt-1">
              <strong>Denominator Specification:</strong> Covers all verified incoming municipal
              waste batches weighed at demonstration weighbridges over the selected reporting
              period. Batches lacking verified tare weights are marked "Pending Verification" and
              excluded from the denominator to prevent distortion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
