import React, { useState } from 'react';
import {
  Search,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldAlert,
  Scale,
  ArrowRight,
  Info,
} from 'lucide-react';
import { useWasteTrack } from '../context/WasteTrackContext';
import { WasteCategory, OperationalStatus } from '../types/waste';

export const WasteTracking: React.FC = () => {
  const { batches, wards, vehicles, facilities, setSelectedEntity } = useWasteTrack();

  // Search and filter states required by Section 8
  const [searchBatchId, setSearchBatchId] = useState('');
  const [filterDate, setFilterDate] = useState('ALL');
  const [filterWard, setFilterWard] = useState('ALL');
  const [filterVehicle, setFilterVehicle] = useState('ALL');
  const [filterCategory, setFilterCategory] = useState<'ALL' | WasteCategory>('ALL');
  const [filterContractor, setFilterContractor] = useState('ALL');
  const [filterFacility, setFilterFacility] = useState('ALL');
  const [filterDestination, setFilterDestination] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState<'ALL' | OperationalStatus>('ALL');

  const [selectedBatchId, setSelectedBatchId] = useState<string>('DEMO-BATCH-2026-001');

  const uniqueDates = Array.from(new Set(batches.map((b) => b.date)));

  const filteredBatches = batches.filter((b) => {
    if (
      searchBatchId.trim() !== '' &&
      !b.id.toLowerCase().includes(searchBatchId.trim().toLowerCase())
    )
      return false;
    if (filterDate !== 'ALL' && b.date !== filterDate) return false;
    if (filterWard !== 'ALL' && b.wardId !== filterWard) return false;
    if (filterVehicle !== 'ALL' && b.vehicleId !== filterVehicle) return false;
    if (filterCategory !== 'ALL' && b.wasteCategory !== filterCategory) return false;
    if (filterContractor !== 'ALL' && b.contractorId !== filterContractor) return false;
    if (filterFacility !== 'ALL' && b.treatmentFacilityId !== filterFacility) return false;
    if (filterDestination !== 'ALL' && b.finalDisposalDestinationId !== filterDestination)
      return false;
    if (filterStatus !== 'ALL' && b.operationalStatus !== filterStatus) return false;
    return true;
  });

  const activeBatch =
    filteredBatches.find((b) => b.id === selectedBatchId) ||
    filteredBatches[0] ||
    batches[0];

  const resetAllFilters = () => {
    setSearchBatchId('');
    setFilterDate('ALL');
    setFilterWard('ALL');
    setFilterVehicle('ALL');
    setFilterCategory('ALL');
    setFilterContractor('ALL');
    setFilterFacility('ALL');
    setFilterDestination('ALL');
    setFilterStatus('ALL');
  };

  // Net Waste Weight = Gross Weight - Tare Weight (Only when both exist)
  const computedNetWeight =
    activeBatch &&
    activeBatch.grossWeightKg !== null &&
    activeBatch.tareWeightKg !== null
      ? activeBatch.grossWeightKg - activeBatch.tareWeightKg
      : null;

  return (
    <div className="space-y-6">
      {/* Header & Why Waste Tracking Matters */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono font-semibold text-amber-800">
              SYNTHETIC BATCH CUSTODY REGISTRY · ALL BATCH IDENTIFIERS ARE ILLUSTRATIVE
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">
              Waste Tracking & Chain of Custody
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              End-to-end digital traceability from ward collection point through secondary transfer
              station, digital weighbridge verification, material recovery/treatment, and residual
              disposal.
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs text-slate-600">
            <span>
              Total Synthetic Batches: <strong className="font-mono text-slate-900">{batches.length}</strong>
            </span>
            <span>·</span>
            <span>
              Matching Current Filter:{' '}
              <strong className="font-mono text-emerald-800">{filteredBatches.length}</strong>
            </span>
            <span>·</span>
            <span>
              Formula Enforced: <strong className="font-mono">Net Weight = Gross − Tare</strong> (or
              Pending Verification)
            </span>
          </div>
        </div>

        {/* Why Waste Tracking Matters Explanatory Panel */}
        <div className="bg-slate-900 text-white rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <Info className="w-4 h-4" />
              <span>POLICY ACCOUNTABILITY RATIONALE</span>
            </div>
            <h2 className="text-base font-bold mt-1">Why Waste Tracking Matters</h2>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Traceable chain-of-custody records help municipal authorities identify missing
              collections, unexplained weight differences between transfer stations and treatment
              plants, unrecorded transfers, and potential reporting inconsistencies.
            </p>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
            Note: This academic prototype demonstrates record-linkage rules using synthetic data and
            does not claim to detect real-world fraud or verify live municipal transactions.
          </div>
        </div>
      </div>

      {/* 9-Dimension Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-bold text-slate-900">
            Search & Filter Demonstration Batches
          </h2>
          <button
            onClick={resetAllFilters}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-800 hover:text-emerald-950 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset All Search Filters
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {/* 1. Batch ID Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              aria-label="Search by Batch ID"
              placeholder="Batch ID (e.g. 001, 009)..."
              value={searchBatchId}
              onChange={(e) => setSearchBatchId(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-900"
            />
          </div>

          {/* 2. Date */}
          <select
            aria-label="Filter by Date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
          >
            <option value="ALL">All Dates (Oct 2026)</option>
            {uniqueDates.map((d) => (
              <option key={d} value={d}>
                Date: {d}
              </option>
            ))}
          </select>

          {/* 3. Ward */}
          <select
            aria-label="Filter by Ward"
            value={filterWard}
            onChange={(e) => setFilterWard(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
          >
            <option value="ALL">All Wards (01–08)</option>
            {wards.map((w) => (
              <option key={w.id} value={w.id}>
                {w.id} (Ward 0{w.wardNumber})
              </option>
            ))}
          </select>

          {/* 4. Vehicle */}
          <select
            aria-label="Filter by Collection Vehicle"
            value={filterVehicle}
            onChange={(e) => setFilterVehicle(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
          >
            <option value="ALL">All Collection Vehicles</option>
            {vehicles.map((v) => (
              <option key={v.id} value={v.id}>
                {v.id} ({v.wasteCategory})
              </option>
            ))}
          </select>

          {/* 5. Waste Category */}
          <select
            aria-label="Filter by Waste Category"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value as 'ALL' | WasteCategory)}
            className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
          >
            <option value="ALL">All Waste Categories</option>
            <option value="Organic">Organic</option>
            <option value="Recyclable">Recyclable</option>
            <option value="Residual">Residual</option>
            <option value="Hazardous">Hazardous</option>
          </select>

          {/* 6. Contractor */}
          <select
            aria-label="Filter by Contractor"
            value={filterContractor}
            onChange={(e) => setFilterContractor(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
          >
            <option value="ALL">All Contractors</option>
            <option value="DEMO-CONT-01">DEMO-CONT-01</option>
            <option value="DEMO-CONT-02">DEMO-CONT-02</option>
            <option value="DEMO-CONT-03">DEMO-CONT-03</option>
            <option value="DEMO-CONT-04">DEMO-CONT-04</option>
          </select>

          {/* 7. Treatment Facility */}
          <select
            aria-label="Filter by Recovery or Treatment Facility"
            value={filterFacility}
            onChange={(e) => setFilterFacility(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
          >
            <option value="ALL">All Treatment / Recovery Facilities</option>
            {facilities
              .filter(
                (f) =>
                  f.type === 'Material Recovery Facility' ||
                  f.type === 'Organic Waste Treatment' ||
                  f.type === 'Hazardous Treatment' ||
                  f.type === 'Conditional WtE'
              )
              .map((f) => (
                <option key={f.id} value={f.id}>
                  {f.id} ({f.type})
                </option>
              ))}
          </select>

          {/* 8. Final Destination */}
          <select
            aria-label="Filter by Final Destination"
            value={filterDestination}
            onChange={(e) => setFilterDestination(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
          >
            <option value="ALL">All Final Destinations</option>
            <option value="DEMO-FACILITY-07">DEMO-FACILITY-07 (Sanitary Cell A)</option>
            <option value="DEMO-FACILITY-08">DEMO-FACILITY-08 (Residual Site B)</option>
            <option value="DEMO-FACILITY-10">DEMO-FACILITY-10 (Hazardous Unit)</option>
          </select>

          {/* 9. Operational Status */}
          <select
            aria-label="Filter by Operational Status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as 'ALL' | OperationalStatus)}
            className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
          >
            <option value="ALL">All Operational Statuses</option>
            <option value="Completed">Completed</option>
            <option value="On Schedule">On Schedule</option>
            <option value="Under Review">Under Review (Pending Tare)</option>
            <option value="Delayed">Delayed / Anomaly</option>
          </select>
        </div>
      </div>

      {/* Split View: Batch List Table (Left) + Selected Batch Detail & Timeline (Right) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Batch Selection Table */}
        <div className="xl:col-span-5 bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              Synthetic Batch Registry ({filteredBatches.length})
            </h3>
            <span className="text-xs text-slate-500">Select a row to inspect custody</span>
          </div>

          {filteredBatches.length === 0 ? (
            <div className="p-8 text-center space-y-2">
              <p className="text-sm font-semibold text-slate-800">
                No synthetic batches match your current filter combination.
              </p>
              <button
                onClick={resetAllFilters}
                className="px-3 py-1.5 text-xs font-medium text-white bg-emerald-800 rounded-lg"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto max-h-[620px] overflow-y-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200 sticky top-0">
                  <tr className="text-[11px] font-semibold text-slate-600">
                    <th className="py-2.5 px-3">Batch ID (Synthetic)</th>
                    <th className="py-2.5 px-3">Ward / Stream</th>
                    <th className="py-2.5 px-3 text-right">Net Weight</th>
                    <th className="py-2.5 px-3">Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs">
                  {filteredBatches.map((batch) => {
                    const net =
                      batch.grossWeightKg !== null && batch.tareWeightKg !== null
                        ? batch.grossWeightKg - batch.tareWeightKg
                        : null;
                    const isSelected = activeBatch && activeBatch.id === batch.id;

                    return (
                      <tr
                        key={batch.id}
                        onClick={() => setSelectedBatchId(batch.id)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-emerald-50/80 font-medium' : 'hover:bg-slate-50'
                        }`}
                      >
                        <td className="py-2.5 px-3 font-mono text-slate-900">
                          <div>{batch.id}</div>
                          <div className="text-[11px] text-slate-500">{batch.date}</div>
                        </td>
                        <td className="py-2.5 px-3">
                          <div className="font-mono text-slate-800">{batch.wardId}</div>
                          <div className="text-[11px] text-slate-500">{batch.wasteCategory}</div>
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono tabular-nums">
                          {net !== null ? (
                            <span className="text-slate-900">{net.toLocaleString()} kg</span>
                          ) : (
                            <span className="text-amber-700 font-sans text-[11px]">
                              Pending Verification
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`text-[11px] font-semibold ${
                              batch.verificationStatus === 'Verified'
                                ? 'text-emerald-800'
                                : batch.verificationStatus === 'Pending Verification'
                                ? 'text-amber-700'
                                : 'text-red-700'
                            }`}
                          >
                            {batch.verificationStatus}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Batch Detail & Chain-of-Custody Timeline */}
        {activeBatch && (
          <div className="xl:col-span-7 bg-white border border-slate-200 rounded-xl p-6 space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <div className="text-xs font-mono text-amber-800 font-semibold">
                  SYNTHETIC DEMONSTRATION RECORD · {activeBatch.verificationStatus.toUpperCase()}
                </div>
                <h2 className="text-xl font-bold font-mono text-slate-900 mt-1">
                  {activeBatch.id}
                </h2>
                <p className="text-xs text-slate-600 mt-0.5">
                  Collection Source: {activeBatch.collectionSource} · Date: {activeBatch.date}{' '}
                  {activeBatch.collectionTime}
                </p>
              </div>

              <button
                onClick={() => setSelectedEntity({ type: 'vehicle', id: activeBatch.vehicleId })}
                className="px-3 py-1.5 text-xs font-mono font-medium bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                Inspect Vehicle {activeBatch.vehicleId} →
              </button>
            </div>

            {/* Weight & Mass-Balance Calculation Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <span className="text-[11px] text-slate-500 block">Recorded Gross Weight</span>
                <span className="text-sm font-mono font-bold text-slate-900 tabular-nums">
                  {activeBatch.grossWeightKg !== null
                    ? `${activeBatch.grossWeightKg.toLocaleString()} kg`
                    : 'Pending Verification'}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block">Recorded Tare Weight</span>
                <span className="text-sm font-mono font-bold text-slate-900 tabular-nums">
                  {activeBatch.tareWeightKg !== null
                    ? `${activeBatch.tareWeightKg.toLocaleString()} kg`
                    : 'Pending Verification'}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block">
                  Net Waste Weight (Gross − Tare)
                </span>
                <span className="text-sm font-mono font-bold text-emerald-800 tabular-nums">
                  {computedNetWeight !== null
                    ? `${computedNetWeight.toLocaleString()} kg`
                    : 'Pending Verification'}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block">Weighbridge Record</span>
                <span className="text-sm font-mono font-semibold text-slate-900">
                  {activeBatch.weighbridgeRecordId || 'Pending Verification'}
                </span>
              </div>
            </div>

            {/* Facility & Recovery Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-lg border border-slate-200">
                <span className="text-slate-500 block">Transfer Station</span>
                <button
                  onClick={() =>
                    setSelectedEntity({ type: 'facility', id: activeBatch.transferStationId })
                  }
                  className="font-mono font-semibold text-slate-900 hover:underline mt-0.5"
                >
                  {activeBatch.transferStationId}
                </button>
              </div>
              <div className="p-3.5 rounded-lg border border-slate-200">
                <span className="text-slate-500 block">Recovery / Treatment Facility</span>
                <button
                  onClick={() =>
                    setSelectedEntity({ type: 'facility', id: activeBatch.treatmentFacilityId })
                  }
                  className="font-mono font-semibold text-emerald-800 hover:underline mt-0.5"
                >
                  {activeBatch.treatmentFacilityId}
                </button>
                <div className="text-slate-600 mt-1 font-mono">
                  Recovered:{' '}
                  {activeBatch.recoveredMaterialKg !== null
                    ? `${activeBatch.recoveredMaterialKg.toLocaleString()} kg`
                    : 'Pending Verification'}
                </div>
              </div>
              <div className="p-3.5 rounded-lg border border-slate-200">
                <span className="text-slate-500 block">Final Residual Destination</span>
                <button
                  onClick={() =>
                    setSelectedEntity({
                      type: 'facility',
                      id: activeBatch.finalDisposalDestinationId,
                    })
                  }
                  className="font-mono font-semibold text-slate-900 hover:underline mt-0.5"
                >
                  {activeBatch.finalDisposalDestinationId}
                </button>
                <div className="text-slate-600 mt-1 font-mono">
                  Residual:{' '}
                  {activeBatch.residualQuantityKg !== null
                    ? `${activeBatch.residualQuantityKg.toLocaleString()} kg`
                    : 'Pending Verification'}
                </div>
              </div>
            </div>

            {/* Interactive 5-Stage Chain-of-Custody Timeline */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-3">
                Chain-of-Custody Operational Timeline
              </h3>
              <div className="space-y-3 border-l-2 border-slate-200 ml-3 pl-5">
                {activeBatch.timeline.map((stage, index) => (
                  <div
                    key={index}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-bold text-slate-900">{stage.stageName}</span>
                      <span
                        className={`text-[11px] font-mono font-semibold ${
                          stage.status === 'Pending Verification'
                            ? 'text-amber-700'
                            : 'text-emerald-800'
                        }`}
                      >
                        [{stage.status}]
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 font-mono">
                      Timestamp: {stage.timestamp} · Operator/System: {stage.operatorOrSystem}
                    </div>
                    <div className="text-xs text-slate-700 pt-1">{stage.notes}</div>
                    <div className="text-[11px] font-mono text-slate-600 pt-0.5">
                      Recorded Stage Quantity:{' '}
                      {stage.recordedQuantityKg !== null
                        ? `${stage.recordedQuantityKg.toLocaleString()} kg`
                        : 'Pending Verification'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
