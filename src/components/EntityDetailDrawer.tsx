import React from 'react';
import {
  X,
  Truck,
  Building2,
  PackageCheck,
  MessageSquareWarning,
  MapPin,
  Users,
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Scale,
} from 'lucide-react';
import { useWasteTrack } from '../context/WasteTrackContext';

export const EntityDetailDrawer: React.FC = () => {
  const {
    selectedEntity,
    setSelectedEntity,
    vehicles,
    facilities,
    batches,
    complaints,
    wards,
    contractors,
    weighbridgeRecords,
    navigateToVehicleOnMap,
    setActiveModule,
    updateComplaintStatus,
  } = useWasteTrack();

  if (!selectedEntity) return null;

  const closeDrawer = () => setSelectedEntity(null);

  const renderVehicleDetail = (id: string) => {
    const vehicle = vehicles.find((v) => v.id === id);
    if (!vehicle) return null;
    const ward = wards.find((w) => w.id === vehicle.wardId);
    const facility = facilities.find((f) => f.id === vehicle.destinationFacilityId);
    const vehicleBatches = batches.filter((b) => b.vehicleId === vehicle.id).slice(0, 4);
    const vehicleWb = weighbridgeRecords.filter((w) => w.vehicleId === vehicle.id).slice(0, 3);

    return (
      <div className="space-y-6">
        <div className="flex items-start justify-between border-b border-slate-200 pb-4">
          <div>
            <div className="text-xs font-medium text-slate-500">
              Synthetic Collection Vehicle · {vehicle.contractorId}
            </div>
            <h3 className="text-xl font-bold font-mono text-slate-900 mt-1">{vehicle.id}</h3>
            <p className="text-sm text-slate-600 mt-0.5">{ward?.name || vehicle.wardId}</p>
          </div>
          <button
            onClick={() => {
              closeDrawer();
              navigateToVehicleOnMap(vehicle.id);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <MapPin className="w-3.5 h-3.5" />
            View on Map
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
          <div>
            <span className="text-xs text-slate-500 block">Operational Status</span>
            <span className="font-semibold text-slate-900">{vehicle.status}</span>
          </div>
          <div>
            <span className="text-xs text-slate-500 block">Waste Stream</span>
            <span className="font-semibold text-slate-900">{vehicle.wasteCategory}</span>
          </div>
          <div>
            <span className="text-xs text-slate-500 block">Assigned Route</span>
            <span className="font-mono font-medium text-slate-900">{vehicle.routeId}</span>
          </div>
          <div>
            <span className="text-xs text-slate-500 block">Last Recorded Weight</span>
            <span className="font-mono font-medium text-slate-900">
              {vehicle.lastRecordedWeightKg !== null
                ? `${vehicle.lastRecordedWeightKg.toLocaleString()} kg`
                : 'Pending Weighbridge Scan'}
            </span>
          </div>
          <div className="col-span-2">
            <span className="text-xs text-slate-500 block">Last Checkpoint</span>
            <span className="font-medium text-slate-900">{vehicle.lastCheckpoint}</span>
            <span className="text-xs text-slate-500 block mt-0.5">
              Timestamp: {vehicle.lastTimestamp} (Synthetic)
            </span>
          </div>
          <div className="col-span-2">
            <span className="text-xs text-slate-500 block">Next Planned Stop</span>
            <span className="font-medium text-slate-900">{vehicle.nextPlannedStop}</span>
          </div>
          <div className="col-span-2">
            <span className="text-xs text-slate-500 block">Designated Facility</span>
            <span className="font-medium text-slate-900">
              {facility ? `${facility.name} (${facility.id})` : vehicle.destinationFacilityId}
            </span>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-900 mb-2">
            Recent Weighbridge Records ({vehicleWb.length})
          </h4>
          <div className="divide-y divide-slate-200 border border-slate-200 rounded-lg">
            {vehicleWb.map((wb) => (
              <div key={wb.id} className="p-3 text-xs flex items-center justify-between">
                <div>
                  <span className="font-mono font-semibold text-slate-900">{wb.id}</span>
                  <span className="text-slate-500 ml-2">· {wb.timestamp}</span>
                  <div className="text-slate-600 mt-0.5">
                    Gross: {wb.grossWeightKg ? `${wb.grossWeightKg} kg` : 'Missing'} · Tare:{' '}
                    {wb.tareWeightKg ? `${wb.tareWeightKg} kg` : 'Pending'}
                  </div>
                </div>
                <span className="font-medium text-slate-700">{wb.verificationStatus}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-900 mb-2">
            Linked Demonstration Waste Batches
          </h4>
          <div className="divide-y divide-slate-200 border border-slate-200 rounded-lg">
            {vehicleBatches.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedEntity({ type: 'batch', id: b.id })}
                className="w-full text-left p-3 text-xs hover:bg-slate-50 flex items-center justify-between transition-colors"
              >
                <div>
                  <span className="font-mono font-semibold text-emerald-800">{b.id}</span>
                  <span className="text-slate-500 ml-2">· {b.date}</span>
                  <div className="text-slate-600 mt-0.5">
                    {b.wasteCategory} · {b.verificationStatus}
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderFacilityDetail = (id: string) => {
    const fac = facilities.find((f) => f.id === id);
    if (!fac) return null;
    const utilRate =
      fac.receivingCapacityTonnesPerDay && fac.quantityReceivedTonnes !== null
        ? ((fac.quantityReceivedTonnes / fac.receivingCapacityTonnesPerDay) * 100).toFixed(1)
        : null;

    return (
      <div className="space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <div className="text-xs font-medium text-slate-500">
            Demonstration Facility · {fac.type}
          </div>
          <h3 className="text-xl font-bold text-slate-900 mt-1">{fac.name}</h3>
          <p className="text-sm font-mono text-slate-600 mt-0.5">{fac.id}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
          <div>
            <span className="text-xs text-slate-500 block">Operational Status</span>
            <span className="font-semibold text-slate-900">{fac.status}</span>
          </div>
          <div>
            <span className="text-xs text-slate-500 block">Illustrative Location</span>
            <span className="font-medium text-slate-900">{fac.illustrativeLocation}</span>
          </div>
          <div>
            <span className="text-xs text-slate-500 block">Daily Receiving Capacity</span>
            <span className="font-mono font-semibold text-slate-900">
              {fac.receivingCapacityTonnesPerDay !== null
                ? `${fac.receivingCapacityTonnesPerDay} t/day`
                : 'Insufficient Data'}
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-500 block">Recorded Intake Today</span>
            <span className="font-mono font-semibold text-slate-900">
              {fac.quantityReceivedTonnes !== null
                ? `${fac.quantityReceivedTonnes} t`
                : 'Insufficient Data'}
            </span>
          </div>
          <div className="col-span-2">
            <span className="text-xs text-slate-500 block">Capacity Utilisation Rate</span>
            <div className="flex items-center gap-3 mt-1">
              <span className="font-mono font-bold text-slate-900">
                {utilRate !== null ? `${utilRate}%` : 'Insufficient Data'}
              </span>
              {utilRate !== null && (
                <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      Number(utilRate) > 85 ? 'bg-amber-600' : 'bg-emerald-600'
                    }`}
                    style={{ width: `${Math.min(100, Number(utilRate))}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-white">
          <h4 className="text-xs font-semibold text-slate-500">Operational Notes (Synthetic)</h4>
          <p className="text-sm text-slate-700 mt-1">{fac.notes}</p>
          <p className="text-xs text-slate-500 mt-2">Last Updated: {fac.lastUpdated}</p>
        </div>
      </div>
    );
  };

  const renderBatchDetail = (id: string) => {
    const batch = batches.find((b) => b.id === id);
    if (!batch) return null;
    const netWeight =
      batch.grossWeightKg !== null && batch.tareWeightKg !== null
        ? batch.grossWeightKg - batch.tareWeightKg
        : null;

    return (
      <div className="space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <div className="text-xs font-medium text-slate-500">
            Synthetic Waste Batch · {batch.date} {batch.collectionTime}
          </div>
          <h3 className="text-xl font-bold font-mono text-slate-900 mt-1">{batch.id}</h3>
          <p className="text-sm text-slate-600 mt-0.5">{batch.collectionSource}</p>
        </div>

        <div className="grid grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
          <div>
            <span className="text-xs text-slate-500 block">Gross Weight</span>
            <span className="font-mono font-semibold text-slate-900">
              {batch.grossWeightKg !== null
                ? `${batch.grossWeightKg.toLocaleString()} kg`
                : 'Pending Verification'}
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-500 block">Tare Weight</span>
            <span className="font-mono font-semibold text-slate-900">
              {batch.tareWeightKg !== null
                ? `${batch.tareWeightKg.toLocaleString()} kg`
                : 'Pending Verification'}
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-500 block">Net Waste Weight</span>
            <span className="font-mono font-bold text-emerald-800">
              {netWeight !== null ? `${netWeight.toLocaleString()} kg` : 'Pending Verification'}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-slate-900">Chain-of-Custody Timeline</h4>
          <div className="space-y-3 border-l border-slate-200 ml-2 pl-4">
            {batch.timeline.map((stage, idx) => (
              <div key={idx} className="relative text-xs">
                <span className="font-semibold text-slate-900 block">{stage.stageName}</span>
                <span className="text-slate-500">
                  {stage.timestamp} · {stage.operatorOrSystem} · Status: {stage.status}
                </span>
                <p className="text-slate-600 mt-0.5">{stage.notes}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderWardDetail = (id: string) => {
    const ward = wards.find((w) => w.id === id);
    if (!ward) return null;
    const onTimeRate = ((ward.onTimeCollections / ward.scheduledCollections) * 100).toFixed(1);
    const completionRate = ((ward.completedCollections / ward.scheduledCollections) * 100).toFixed(
      1
    );
    const wardVehicles = vehicles.filter((v) => v.wardId === ward.id);
    const wardComplaints = complaints.filter((c) => c.wardId === ward.id);

    return (
      <div className="space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <div className="text-xs font-medium text-slate-500">
            Demonstration Municipal Ward · Assigned Contractor: {ward.contractorId}
          </div>
          <h3 className="text-xl font-bold text-slate-900 mt-1">{ward.name}</h3>
          <p className="text-sm font-mono text-slate-600 mt-0.5">{ward.id}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
          <div>
            <span className="text-xs text-slate-500 block">Collection Completion</span>
            <span className="font-mono font-bold text-slate-900">
              {completionRate}% ({ward.completedCollections}/{ward.scheduledCollections})
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-500 block">On-Time Rate</span>
            <span className="font-mono font-bold text-slate-900">{onTimeRate}%</span>
          </div>
          <div>
            <span className="text-xs text-slate-500 block">Missed Collections</span>
            <span className="font-mono font-bold text-red-700">{ward.missedCollections} tasks</span>
          </div>
          <div>
            <span className="text-xs text-slate-500 block">Source Segregation Rate</span>
            <span className="font-mono font-bold text-emerald-800">
              {ward.sourceSegregationRate}%
            </span>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-900 mb-2">
            Assigned Collection Fleet ({wardVehicles.length})
          </h4>
          <div className="divide-y divide-slate-200 border border-slate-200 rounded-lg">
            {wardVehicles.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedEntity({ type: 'vehicle', id: v.id })}
                className="w-full text-left p-3 text-xs hover:bg-slate-50 flex items-center justify-between"
              >
                <div>
                  <span className="font-mono font-semibold text-slate-900">{v.id}</span>
                  <span className="text-slate-500 ml-2">
                    · {v.wasteCategory} · {v.status}
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-900 mb-2">
            Ward Service Complaints ({wardComplaints.length})
          </h4>
          <div className="divide-y divide-slate-200 border border-slate-200 rounded-lg">
            {wardComplaints.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedEntity({ type: 'complaint', id: c.id })}
                className="w-full text-left p-3 text-xs hover:bg-slate-50 flex items-center justify-between"
              >
                <div>
                  <span className="font-mono font-semibold text-slate-900">{c.id}</span>
                  <span className="text-slate-500 ml-2">· {c.category}</span>
                  <div className="text-slate-600 mt-0.5">Status: {c.status}</div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderContractorDetail = (id: string) => {
    const cont = contractors.find((c) => c.id === id);
    if (!cont) return null;
    const onTimeRate = ((cont.onTimeTasks / cont.scheduledTasks) * 100).toFixed(1);
    const contComplaints = complaints.filter((c) => c.assignedContractorId === cont.id);
    const resolvedCount = contComplaints.filter((c) => c.status === 'Resolved').length;

    return (
      <div className="space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <div className="text-xs font-medium text-slate-500">
            Synthetic Contractor Scorecard · Status: {cont.performanceStatus}
          </div>
          <h3 className="text-lg font-bold text-slate-900 mt-1">{cont.label}</h3>
          <p className="text-xs text-slate-500 mt-1">
            Assigned Wards: {cont.assignedWards.join(', ')}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
          <div>
            <span className="text-xs text-slate-500 block">Completed / Scheduled</span>
            <span className="font-mono font-bold text-slate-900">
              {cont.completedTasks} / {cont.scheduledTasks}
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-500 block">On-Time Performance</span>
            <span className="font-mono font-bold text-slate-900">{onTimeRate}%</span>
          </div>
          <div>
            <span className="text-xs text-slate-500 block">Record Completeness</span>
            <span className="font-mono font-bold text-emerald-800">
              {cont.recordCompletenessRate}%
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-500 block">Complaints Resolved</span>
            <span className="font-mono font-bold text-slate-900">
              {resolvedCount} / {contComplaints.length}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderComplaintDetail = (id: string) => {
    const comp = complaints.find((c) => c.id === id);
    if (!comp) return null;
    const ward = wards.find((w) => w.id === comp.wardId);

    return (
      <div className="space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <div className="text-xs font-medium text-slate-500">
            Synthetic Service Complaint · {comp.reportedDate}
          </div>
          <h3 className="text-xl font-bold font-mono text-slate-900 mt-1">{comp.id}</h3>
          <p className="text-sm font-medium text-slate-800 mt-0.5">{comp.category}</p>
        </div>

        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-sm space-y-2">
          <p className="text-slate-800">{comp.description}</p>
          <div className="pt-2 border-t border-slate-200 grid grid-cols-2 gap-2 text-xs text-slate-600">
            <div>Ward: {ward?.name || comp.wardId}</div>
            <div>Route: {comp.routeId}</div>
            <div>Contractor: {comp.assignedContractorId}</div>
            <div>Unit: {comp.responsibleUnit}</div>
            <div>Current Status: {comp.status}</div>
            <div>
              Resolution Time:{' '}
              {comp.resolutionTimeHours !== null
                ? `${comp.resolutionTimeHours} hrs`
                : 'Awaiting Closure'}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            Simulate Status Update (Interactive Demo Control)
          </label>
          <div className="flex flex-wrap gap-1.5">
            {(['Received', 'Assigned', 'In Progress', 'Resolved', 'Reopened'] as const).map(
              (st) => (
                <button
                  key={st}
                  onClick={() => updateComplaintStatus(comp.id, st)}
                  className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                    comp.status === st
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {st}
                </button>
              )
            )}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-900 mb-2">Action History</h4>
          <div className="space-y-2.5 border-l border-slate-200 ml-2 pl-4">
            {comp.actionHistory.map((log, i) => (
              <div key={i} className="text-xs">
                <div className="text-slate-500">
                  {log.timestamp} · {log.actor}
                </div>
                <div className="text-slate-800 font-medium mt-0.5">{log.action}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-[1px]">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col justify-between overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <span className="text-xs font-semibold text-amber-800">
              DEMO ENVIRONMENT — SYNTHETIC RECORD INSPECTOR
            </span>
            <button
              onClick={closeDrawer}
              className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Close detail panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {selectedEntity.type === 'vehicle' && renderVehicleDetail(selectedEntity.id)}
          {selectedEntity.type === 'facility' && renderFacilityDetail(selectedEntity.id)}
          {selectedEntity.type === 'batch' && renderBatchDetail(selectedEntity.id)}
          {selectedEntity.type === 'ward' && renderWardDetail(selectedEntity.id)}
          {selectedEntity.type === 'contractor' && renderContractorDetail(selectedEntity.id)}
          {selectedEntity.type === 'complaint' && renderComplaintDetail(selectedEntity.id)}
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>All values represent illustrative prototype records.</span>
          <button
            onClick={closeDrawer}
            className="px-3 py-1.5 font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100"
          >
            Close Panel
          </button>
        </div>
      </div>
    </div>
  );
};
