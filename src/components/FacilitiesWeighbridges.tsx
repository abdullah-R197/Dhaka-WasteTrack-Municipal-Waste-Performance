import React, { useState } from 'react';
import {
  Building2,
  Scale,
  Search,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight,
  ShieldAlert,
} from 'lucide-react';
import { useWasteTrack } from '../context/WasteTrackContext';
import { FacilityType } from '../types/waste';

const FACILITY_TABS: { label: string; type: FacilityType | 'ALL' }[] = [
  { label: 'All Facilities (12)', type: 'ALL' },
  { label: '1. Transfer Stations', type: 'Transfer Station' },
  { label: '2. Weighbridges', type: 'Weighbridge' },
  { label: '3. Material Recovery (MRF)', type: 'Material Recovery Facility' },
  { label: '4. Organic Treatment', type: 'Organic Waste Treatment' },
  { label: '5. Residual Disposal Sites', type: 'Residual Disposal' },
  { label: '6. Conditional WtE', type: 'Conditional WtE' },
];

export const FacilitiesWeighbridges: React.FC = () => {
  const { facilities, weighbridgeRecords, setSelectedEntity } = useWasteTrack();

  const [activeTab, setActiveTab] = useState<FacilityType | 'ALL'>('ALL');
  const [wbSearch, setWbSearch] = useState('');
  const [wbStatusFilter, setWbStatusFilter] = useState('ALL');

  const filteredFacilities = facilities.filter(
    (f) => activeTab === 'ALL' || f.type === activeTab
  );

  const filteredWeighbridgeRecords = weighbridgeRecords.filter((rec) => {
    if (
      wbSearch.trim() !== '' &&
      !rec.id.toLowerCase().includes(wbSearch.toLowerCase()) &&
      !rec.vehicleId.toLowerCase().includes(wbSearch.toLowerCase()) &&
      !rec.batchId.toLowerCase().includes(wbSearch.toLowerCase())
    ) {
      return false;
    }
    if (wbStatusFilter !== 'ALL' && rec.verificationStatus !== wbStatusFilter) return false;
    return true;
  });

  // Transparent rule-based operational integrity alerts
  const missingTareRecords = weighbridgeRecords.filter((r) => r.tareWeightKg === null);
  const weightVarianceRecords = weighbridgeRecords.filter(
    (r) => r.verificationStatus === 'Anomaly Flagged'
  );
  const highCapacityFacilities = facilities.filter((f) => {
    if (!f.receivingCapacityTonnesPerDay || f.quantityReceivedTonnes === null) return false;
    return f.quantityReceivedTonnes / f.receivingCapacityTonnesPerDay >= 0.85;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="text-xs font-mono font-semibold text-amber-800">
          SYNTHETIC INFRASTRUCTURE & WEIGHBRIDGE LEDGER · ALL CAPACITIES ARE ILLUSTRATIVE
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mt-1">
          Facilities, Weighbridges & Operational Integrity
        </h1>
        <p className="text-sm text-slate-600 mt-0.5">
          Inspect secondary transfer stations, digital weighbridge axle logs, Material Recovery
          Facilities (MRFs), composting plants, sanitary residual cells, and conditional WtE gates.
        </p>

        {/* 6 Required Category Tabs */}
        <div className="mt-5 flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl">
          {FACILITY_TABS.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.type)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === tab.type
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Facility Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFacilities.map((fac) => {
          const utilRate =
            fac.receivingCapacityTonnesPerDay && fac.quantityReceivedTonnes !== null
              ? ((fac.quantityReceivedTonnes / fac.receivingCapacityTonnesPerDay) * 100).toFixed(1)
              : null;

          return (
            <div
              key={fac.id}
              onClick={() => setSelectedEntity({ type: 'facility', id: fac.id })}
              className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between hover:border-slate-300 transition-colors cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-mono font-semibold text-slate-800">{fac.id}</span>
                  <span>·</span>
                  <span
                    className={`font-semibold ${
                      fac.status === 'Operational'
                        ? 'text-emerald-800'
                        : fac.status === 'Conditional Evaluation'
                        ? 'text-blue-700'
                        : 'text-amber-700'
                    }`}
                  >
                    {fac.status}
                  </span>
                </div>

                <h2 className="text-base font-bold text-slate-900 mt-1.5">{fac.name}</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {fac.type} · {fac.illustrativeLocation}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-[11px] text-slate-500 block">Capacity</span>
                    <span className="font-mono font-semibold text-slate-900">
                      {fac.receivingCapacityTonnesPerDay !== null
                        ? `${fac.receivingCapacityTonnesPerDay} t/d`
                        : 'Missing Data'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block">Received</span>
                    <span className="font-mono font-semibold text-slate-900">
                      {fac.quantityReceivedTonnes !== null
                        ? `${fac.quantityReceivedTonnes} t`
                        : 'Missing Data'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block">Utilisation</span>
                    <span
                      className={`font-mono font-bold ${
                        utilRate && Number(utilRate) >= 85 ? 'text-amber-700' : 'text-emerald-800'
                      }`}
                    >
                      {utilRate !== null ? `${utilRate}%` : 'Insufficient Data'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Updated: {fac.lastUpdated}</span>
                <span className="text-emerald-800 font-semibold inline-flex items-center gap-0.5">
                  Inspect <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Operational Integrity Rules & Anomaly Alerts */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Rule-Based Operational Integrity Checks (Synthetic Dataset)
            </h2>
            <p className="text-xs text-slate-500">
              Automated transparent checks for missing tare scans, intake variance, and capacity
              thresholds (Note: Operational anomalies indicate verification needs, not proof of
              misconduct).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
            <div className="text-xs font-bold text-amber-800">
              1. Missing Weighbridge Tare Records ({missingTareRecords.length})
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Batches {missingTareRecords.map((r) => r.batchId).join(', ')} lack exit tare scans at
              DEMO-WS-02. Net weight is held as "Pending Verification".
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
            <div className="text-xs font-bold text-red-700">
              2. Inconsistent Batch Weights ({weightVarianceRecords.length})
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Records {weightVarianceRecords.map((r) => r.id).join(', ')} show &gt;6% variance
              between transfer dispatch and facility intake. Flagged for reconciliation.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
            <div className="text-xs font-bold text-slate-900">
              3. Capacity Threshold Alerts ({highCapacityFacilities.length})
            </div>
            <p className="text-xs text-slate-600 mt-1">
              {highCapacityFacilities.map((f) => f.id).join(', ')} operating above 85% of configured
              daily demonstration threshold.
            </p>
          </div>
        </div>
      </div>

      {/* Searchable Weighbridge Records Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Digital Weighbridge Records ({filteredWeighbridgeRecords.length})
            </h2>
            <p className="text-xs text-slate-500">
              Net Weight is calculated strictly when both Gross Weight and Tare Weight exist.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                aria-label="Search Weighbridge Records"
                placeholder="Search Record, Vehicle, Batch..."
                value={wbSearch}
                onChange={(e) => setWbSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono"
              />
            </div>

            <select
              aria-label="Filter Weighbridge Verification Status"
              value={wbStatusFilter}
              onChange={(e) => setWbStatusFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
            >
              <option value="ALL">All Verification Statuses</option>
              <option value="Verified">Verified</option>
              <option value="Pending Verification">Pending Verification</option>
              <option value="Anomaly Flagged">Anomaly Flagged</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto max-h-[480px] overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 sticky top-0 text-[11px] font-semibold text-slate-600">
              <tr>
                <th className="py-3 px-4">Record ID</th>
                <th className="py-3 px-4">Weighbridge</th>
                <th className="py-3 px-4">Vehicle & Batch</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4 text-right">Gross Weight</th>
                <th className="py-3 px-4 text-right">Tare Weight</th>
                <th className="py-3 px-4 text-right">Net Weight</th>
                <th className="py-3 px-4">Destination Facility</th>
                <th className="py-3 px-4">Verification Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs">
              {filteredWeighbridgeRecords.map((rec) => {
                const net =
                  rec.grossWeightKg !== null && rec.tareWeightKg !== null
                    ? rec.grossWeightKg - rec.tareWeightKg
                    : null;

                return (
                  <tr
                    key={rec.id}
                    onClick={() => setSelectedEntity({ type: 'batch', id: rec.batchId })}
                    className="hover:bg-slate-50 cursor-pointer"
                  >
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">{rec.id}</td>
                    <td className="py-3 px-4 font-mono text-slate-700">{rec.weighbridgeId}</td>
                    <td className="py-3 px-4 font-mono">
                      <span className="text-slate-900 font-semibold">{rec.vehicleId}</span>
                      <span className="text-slate-500 block text-[11px]">{rec.batchId}</span>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-600">{rec.timestamp}</td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums">
                      {rec.grossWeightKg !== null ? (
                        `${rec.grossWeightKg.toLocaleString()} kg`
                      ) : (
                        <span className="text-amber-700">Missing Data</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums">
                      {rec.tareWeightKg !== null ? (
                        `${rec.tareWeightKg.toLocaleString()} kg`
                      ) : (
                        <span className="text-amber-700">Missing Data</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold tabular-nums">
                      {net !== null ? (
                        <span className="text-emerald-800">{net.toLocaleString()} kg</span>
                      ) : (
                        <span className="text-amber-700">Pending Verification</span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-800">
                      {rec.destinationFacilityId}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`font-semibold ${
                          rec.verificationStatus === 'Verified'
                            ? 'text-emerald-800'
                            : rec.verificationStatus === 'Pending Verification'
                            ? 'text-amber-700'
                            : 'text-red-700'
                        }`}
                      >
                        {rec.verificationStatus}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
