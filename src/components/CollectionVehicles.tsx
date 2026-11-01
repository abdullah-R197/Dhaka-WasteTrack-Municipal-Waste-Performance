import React, { useState } from 'react';
import {
  MapPin,
  Truck,
  RotateCcw,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowUpRight,
  Scale,
} from 'lucide-react';
import { useWasteTrack } from '../context/WasteTrackContext';

export const CollectionVehicles: React.FC = () => {
  const {
    vehicles,
    wards,
    routes,
    batches,
    weighbridgeRecords,
    navigateToVehicleOnMap,
    setSelectedEntity,
  } = useWasteTrack();

  const [wardFilter, setWardFilter] = useState('ALL');
  const [contractorFilter, setContractorFilter] = useState('ALL');
  const [routeFilter, setRouteFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('DEMO-TRK-001');

  const filteredVehicles = vehicles.filter((v) => {
    if (wardFilter !== 'ALL' && v.wardId !== wardFilter) return false;
    if (contractorFilter !== 'ALL' && v.contractorId !== contractorFilter) return false;
    if (routeFilter !== 'ALL' && v.routeId !== routeFilter) return false;
    if (statusFilter !== 'ALL' && v.status !== statusFilter) return false;
    return true;
  });

  const activeVehicle =
    filteredVehicles.find((v) => v.id === selectedVehicleId) ||
    filteredVehicles[0] ||
    vehicles[0];

  const activeRoute = routes.find((r) => r.id === activeVehicle?.routeId) || routes[0];
  const activeVehicleBatches = batches
    .filter((b) => b.vehicleId === activeVehicle?.id)
    .slice(0, 5);
  const activeVehicleWb = weighbridgeRecords
    .filter((w) => w.vehicleId === activeVehicle?.id)
    .slice(0, 4);

  const resetVehicleFilters = () => {
    setWardFilter('ALL');
    setContractorFilter('ALL');
    setRouteFilter('ALL');
    setStatusFilter('ALL');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="text-xs font-mono font-semibold text-amber-800">
              SYNTHETIC FLEET OPERATIONS · NOT CONNECTED TO LIVE GPS OR MUNICIPAL TELEMETRY
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">
              Demonstration Collection Vehicles (12 Units)
            </h1>
            <p className="text-sm text-slate-600 mt-0.5">
              Monitor ward assignments, stream segregation compliance, checkpoint completions, and
              weighbridge logs across synthetic fleet units.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              aria-label="Filter Vehicles by Ward"
              value={wardFilter}
              onChange={(e) => setWardFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
            >
              <option value="ALL">All Wards (01–08)</option>
              {wards.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.id}
                </option>
              ))}
            </select>

            <select
              aria-label="Filter Vehicles by Contractor"
              value={contractorFilter}
              onChange={(e) => setContractorFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
            >
              <option value="ALL">All Contractors</option>
              <option value="DEMO-CONT-01">DEMO-CONT-01</option>
              <option value="DEMO-CONT-02">DEMO-CONT-02</option>
              <option value="DEMO-CONT-03">DEMO-CONT-03</option>
              <option value="DEMO-CONT-04">DEMO-CONT-04</option>
            </select>

            <select
              aria-label="Filter Vehicles by Route"
              value={routeFilter}
              onChange={(e) => setRouteFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
            >
              <option value="ALL">All Routes</option>
              {routes.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.id}
                </option>
              ))}
            </select>

            <select
              aria-label="Filter Vehicles by Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
            >
              <option value="ALL">All Statuses</option>
              <option value="On Schedule">On Schedule</option>
              <option value="Completed">Completed</option>
              <option value="Delayed">Delayed</option>
              <option value="Under Review">Under Review</option>
              <option value="Missed">Missed</option>
            </select>

            {(wardFilter !== 'ALL' ||
              contractorFilter !== 'ALL' ||
              routeFilter !== 'ALL' ||
              statusFilter !== 'ALL') && (
              <button
                onClick={resetVehicleFilters}
                className="inline-flex items-center gap-1 text-xs font-medium text-emerald-800 hover:underline px-2 py-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Vehicle Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-600">
              <tr>
                <th className="py-3 px-4">Vehicle ID</th>
                <th className="py-3 px-4">Ward & Route</th>
                <th className="py-3 px-4">Contractor</th>
                <th className="py-3 px-4">Waste Category</th>
                <th className="py-3 px-4">Operational Status</th>
                <th className="py-3 px-4">Last Checkpoint & Timestamp</th>
                <th className="py-3 px-4 text-right">Completion</th>
                <th className="py-3 px-4">Next Scheduled Stop</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs">
              {filteredVehicles.map((v) => {
                const isSelected = activeVehicle?.id === v.id;
                return (
                  <tr
                    key={v.id}
                    onClick={() => setSelectedVehicleId(v.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-emerald-50/70 font-medium' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">{v.id}</td>
                    <td className="py-3 px-4 font-mono text-slate-700">
                      {v.wardId} · {v.routeId}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-700">{v.contractorId}</td>
                    <td className="py-3 px-4 text-slate-800">{v.wasteCategory}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`font-semibold ${
                          v.status === 'Missed'
                            ? 'text-red-700'
                            : v.status === 'Delayed'
                            ? 'text-amber-700'
                            : v.status === 'Under Review'
                            ? 'text-blue-700'
                            : 'text-emerald-800'
                        }`}
                      >
                        {v.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-slate-900">{v.lastCheckpoint}</div>
                      <div className="text-[11px] font-mono text-slate-500">{v.lastTimestamp}</div>
                    </td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-900">
                      {v.completionRate}%
                    </td>
                    <td className="py-3 px-4 text-slate-700">{v.nextPlannedStop}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateToVehicleOnMap(v.id);
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-md whitespace-nowrap"
                      >
                        <MapPin className="w-3 h-3" />
                        View on Map
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Vehicle Detail Panel */}
      {activeVehicle && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-mono text-slate-500">
                SELECTED VEHICLE TELEMETRY & ROUTE SCHEMATIC (SYNTHETIC)
              </span>
              <h2 className="text-xl font-bold font-mono text-slate-900 mt-0.5">
                {activeVehicle.id} — {activeVehicle.wasteCategory} Stream ({activeVehicle.status})
              </h2>
            </div>

            <button
              onClick={() => navigateToVehicleOnMap(activeVehicle.id)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5" />
              View {activeVehicle.id} on Operations Map
            </button>
          </div>

          {/* Route Schematic Stops */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3">
              Assigned Route Schematic & Checkpoints ({activeRoute.name})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {activeRoute.stops.map((stop, idx) => (
                <div
                  key={stop.stopId}
                  className={`p-3.5 rounded-xl border text-xs ${
                    stop.status === 'Completed'
                      ? 'bg-emerald-50/50 border-emerald-200 text-slate-800'
                      : stop.status === 'Current'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 border-slate-200 text-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span>Stop 0{idx + 1}</span>
                    <span>{stop.timestamp || 'Scheduled'}</span>
                  </div>
                  <div className="font-bold mt-1">{stop.type}</div>
                  <div className="mt-1 opacity-90">{stop.label}</div>
                  <div className="mt-2 pt-2 border-t border-current/10 font-mono text-[11px]">
                    Status: {stop.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Linked Weighbridge & Waste Batch Records */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-2">
                Weighbridge Records for {activeVehicle.id}
              </h3>
              <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl">
                {activeVehicleWb.map((wb) => (
                  <div key={wb.id} className="p-3.5 text-xs flex items-center justify-between">
                    <div>
                      <span className="font-mono font-bold text-slate-900">{wb.id}</span>
                      <span className="text-slate-500 ml-2">· {wb.timestamp}</span>
                      <div className="text-slate-600 mt-0.5 font-mono">
                        Gross: {wb.grossWeightKg ?? 'Pending'} kg · Tare:{' '}
                        {wb.tareWeightKg ?? 'Pending'} kg
                      </div>
                    </div>
                    <span className="font-semibold text-emerald-800">{wb.verificationStatus}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-2">
                Waste Batches Hauling History ({activeVehicleBatches.length})
              </h3>
              <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl">
                {activeVehicleBatches.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedEntity({ type: 'batch', id: b.id })}
                    className="w-full text-left p-3.5 text-xs hover:bg-slate-50 flex items-center justify-between"
                  >
                    <div>
                      <span className="font-mono font-bold text-emerald-800">{b.id}</span>
                      <span className="text-slate-500 ml-2">· {b.date}</span>
                      <div className="text-slate-600 mt-0.5">
                        Destination: {b.treatmentFacilityId} → {b.finalDisposalDestinationId}
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
