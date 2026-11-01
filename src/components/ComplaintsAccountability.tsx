import React, { useState } from 'react';
import {
  MessageSquareWarning,
  CheckCircle2,
  Clock,
  Send,
  AlertCircle,
  ArrowUpRight,
  RotateCcw,
} from 'lucide-react';
import { useWasteTrack } from '../context/WasteTrackContext';
import { ComplaintCategory, ComplaintStatus } from '../types/waste';

const COMPLAINT_CATEGORIES: ComplaintCategory[] = [
  'Missed waste collection',
  'Illegal dumping',
  'Segregated waste mixed together',
  'Delayed collection',
  'Overflowing waste container',
  'Other waste-management issues',
];

export const ComplaintsAccountability: React.FC = () => {
  const {
    complaints,
    wards,
    submitSyntheticComplaint,
    setSelectedEntity,
    updateComplaintStatus,
  } = useWasteTrack();

  // Filter states
  const [wardFilter, setWardFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState<'ALL' | ComplaintCategory>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | ComplaintStatus>('ALL');

  // Prototype Reporting Form states
  const [formWardId, setFormWardId] = useState('WARD-DEMO-01');
  const [formCategory, setFormCategory] = useState<ComplaintCategory>('Missed waste collection');
  const [formDescription, setFormDescription] = useState('');
  const [formRefId, setFormRefId] = useState('');
  const [lastCreatedId, setLastCreatedId] = useState<string | null>(null);

  const filteredComplaints = complaints.filter((c) => {
    if (wardFilter !== 'ALL' && c.wardId !== wardFilter) return false;
    if (categoryFilter !== 'ALL' && c.category !== categoryFilter) return false;
    if (statusFilter !== 'ALL' && c.status !== statusFilter) return false;
    return true;
  });

  // Resolution performance metrics
  const totalReceived = filteredComplaints.length;
  const resolvedList = filteredComplaints.filter((c) => c.status === 'Resolved');
  const totalResolved = resolvedList.length;
  const totalAwaiting = totalReceived - totalResolved;
  const resolutionRate =
    totalReceived > 0 ? ((totalResolved / totalReceived) * 100).toFixed(1) : null;

  const resolvedWithTime = resolvedList.filter((c) => c.resolutionTimeHours !== null);
  const avgResolutionHours =
    resolvedWithTime.length > 0
      ? (
          resolvedWithTime.reduce((acc, c) => acc + (c.resolutionTimeHours ?? 0), 0) /
          resolvedWithTime.length
        ).toFixed(1)
      : null;

  const within72hCount = resolvedWithTime.filter(
    (c) => (c.resolutionTimeHours ?? 999) <= 72
  ).length;

  const handleCreateComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formDescription.trim()) return;
    const created = submitSyntheticComplaint({
      wardId: formWardId,
      category: formCategory,
      description: formDescription,
      referenceId: formRefId,
    });
    setLastCreatedId(created.id);
    setFormDescription('');
    setFormRefId('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="text-xs font-mono font-semibold text-amber-800">
          CITIZEN SERVICE ACCOUNTABILITY MODULE · SIMULATION ONLY (DOES NOT CONTACT REAL AUTHORITIES)
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mt-1">
          Citizen Complaints & Service Accountability
        </h1>
        <p className="text-sm text-slate-600 mt-0.5">
          Demonstrating how residents can report missed collections, mixed segregated streams, or
          illegal dumping—and how municipal supervisors verify resolution against a proposed 72-hour
          service target.
        </p>

        {/* Resolution Performance Summary Cards */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs text-slate-500 block">Complaints Received</span>
            <span className="text-xl font-bold font-mono text-slate-900 mt-1 block">
              {totalReceived}
            </span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs text-slate-500 block">Complaints Resolved</span>
            <span className="text-xl font-bold font-mono text-emerald-800 mt-1 block">
              {totalResolved}
            </span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs text-slate-500 block">Awaiting Action / In Progress</span>
            <span className="text-xl font-bold font-mono text-amber-700 mt-1 block">
              {totalAwaiting}
            </span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs text-slate-500 block">Resolution Rate</span>
            <span className="text-xl font-bold font-mono text-slate-900 mt-1 block">
              {resolutionRate !== null ? `${resolutionRate}%` : 'Insufficient Data'}
            </span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs text-slate-500 block">
              Avg Resolution Time (Proposed Target: ≤72h)
            </span>
            <span className="text-xl font-bold font-mono text-slate-900 mt-1 block">
              {avgResolutionHours !== null ? `${avgResolutionHours} hrs` : 'Insufficient Data'}
            </span>
            <span className="text-[11px] text-emerald-800 block mt-0.5">
              {within72hCount}/{resolvedWithTime.length} resolved within 72h target
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Split: Complaint List (Left 8 cols) + Prototype Reporting Form (Right 4 cols) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Complaint Ledger */}
        <div className="xl:col-span-8 bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Service Issue & Complaint Ledger ({filteredComplaints.length})
              </h2>
              <p className="text-xs text-slate-500">
                Click any complaint row to inspect its action history or simulate status resolution.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                aria-label="Filter Complaints by Ward"
                value={wardFilter}
                onChange={(e) => setWardFilter(e.target.value)}
                className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
              >
                <option value="ALL">All Wards</option>
                {wards.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.id}
                  </option>
                ))}
              </select>

              <select
                aria-label="Filter Complaints by Category"
                value={categoryFilter}
                onChange={(e) =>
                  setCategoryFilter(e.target.value as 'ALL' | ComplaintCategory)
                }
                className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
              >
                <option value="ALL">All 6 Issue Categories</option>
                {COMPLAINT_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <select
                aria-label="Filter Complaints by Status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'ALL' | ComplaintStatus)}
                className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
              >
                <option value="ALL">All Statuses</option>
                <option value="Received">Received</option>
                <option value="Assigned">Assigned</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Reopened">Reopened</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-600">
                <tr>
                  <th className="py-3 px-4">Complaint ID</th>
                  <th className="py-3 px-4">Ward</th>
                  <th className="py-3 px-4">Category & Description</th>
                  <th className="py-3 px-4">Reported Date</th>
                  <th className="py-3 px-4">Assigned Unit</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Resolution Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs">
                {filteredComplaints.map((comp) => (
                  <tr
                    key={comp.id}
                    onClick={() => setSelectedEntity({ type: 'complaint', id: comp.id })}
                    className="hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">{comp.id}</td>
                    <td className="py-3 px-4 font-mono text-slate-700">{comp.wardId}</td>
                    <td className="py-3 px-4 max-w-xs">
                      <div className="font-semibold text-slate-900">{comp.category}</div>
                      <div className="text-slate-500 truncate">{comp.description}</div>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-600">{comp.reportedDate}</td>
                    <td className="py-3 px-4">
                      <div className="font-mono text-slate-800">{comp.assignedContractorId}</div>
                      <div className="text-[11px] text-slate-500">{comp.responsibleUnit}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`font-semibold ${
                          comp.status === 'Resolved'
                            ? 'text-emerald-800'
                            : comp.status === 'Reopened'
                            ? 'text-red-700'
                            : 'text-amber-700'
                        }`}
                      >
                        {comp.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums">
                      {comp.resolutionTimeHours !== null
                        ? `${comp.resolutionTimeHours} hrs`
                        : 'Pending'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Functional Prototype Reporting Form */}
        <div className="xl:col-span-4 bg-white border border-slate-200 rounded-xl p-6 space-y-4 h-fit">
          <div>
            <div className="text-xs font-mono font-semibold text-emerald-800">
              PROTOTYPE SIMULATION FORM
            </div>
            <h2 className="text-base font-bold text-slate-900 mt-0.5">
              Submit a Synthetic Service Complaint
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              This form is a client-side simulation for competition judges. It adds a synthetic
              record to local state and does not transmit complaints to any real city corporation. Do
              not enter personal data.
            </p>
          </div>

          {lastCreatedId && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                Synthetic Record Created: <span className="font-mono">{lastCreatedId}</span>
              </div>
              <p className="text-emerald-800">
                Added to the complaint table and linked to the Overview Dashboard KPI counter.
              </p>
            </div>
          )}

          <form onSubmit={handleCreateComplaint} className="space-y-4 text-xs">
            <div>
              <label
                htmlFor="comp-ward"
                className="block font-semibold text-slate-700 mb-1"
              >
                Select Demonstration Ward
              </label>
              <select
                id="comp-ward"
                value={formWardId}
                onChange={(e) => setFormWardId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-medium"
              >
                {wards.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.id} — {w.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="comp-cat"
                className="block font-semibold text-slate-700 mb-1"
              >
                Service Issue Category
              </label>
              <select
                id="comp-cat"
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value as ComplaintCategory)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-medium"
              >
                {COMPLAINT_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="comp-desc"
                className="block font-semibold text-slate-700 mb-1"
              >
                Short Issue Description (Synthetic)
              </label>
              <textarea
                id="comp-desc"
                rows={3}
                required
                placeholder="e.g., Source-segregated organic bin at Sector 3 transfer point was not collected during the 08:00 window..."
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-900"
              />
            </div>

            <div>
              <label
                htmlFor="comp-ref"
                className="block font-semibold text-slate-700 mb-1"
              >
                Optional Demonstration Reference ID
              </label>
              <input
                id="comp-ref"
                type="text"
                placeholder="e.g., JUDGE-TEST-01"
                value={formRefId}
                onChange={(e) => setFormRefId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 font-mono text-slate-900"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              Create Synthetic Complaint Record
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
