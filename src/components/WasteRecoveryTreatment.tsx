import React from 'react';
import {
  Recycle,
  Leaf,
  AlertTriangle,
  Layers,
  Flame,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { useWasteTrack } from '../context/WasteTrackContext';

export const WasteRecoveryTreatment: React.FC = () => {
  const { wteGates, toggleWteGate, setSelectedEntity } = useWasteTrack();

  const allGatesPassed =
    wteGates.technical &&
    wteGates.financial &&
    wteGates.environmental &&
    wteGates.governance;

  const passedCount = Object.values(wteGates).filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Header & Core Principle */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="text-xs font-mono font-semibold text-emerald-800">
          CORE POLICY PRINCIPLE: REFORM FIRST. RECOVER VALUE. USE WtE ONLY WHEN VIABLE.
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mt-1">
          Waste Recovery, Treatment Pathways & WtE Decision Gates
        </h1>
        <p className="text-sm text-slate-600 mt-0.5 max-w-4xl">
          A circular municipal waste system prioritises source segregation, dry material recovery,
          and organic composting/anaerobic digestion before considering capital-intensive
          Waste-to-Energy (WtE). Hazardous household waste is strictly isolated.
        </p>

        {/* Visual 5-Stage Process Diagram required by Section 13 */}
        <div className="mt-6 pt-5 border-t border-slate-200">
          <div className="text-xs font-bold text-slate-500 mb-3">
            INTEGRATED OPERATIONAL PATHWAY ARCHITECTURE
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {[
              {
                step: 'Stage 01',
                title: 'Source Segregation',
                desc: 'Households & markets separate Organic, Recyclable, Hazardous, and Residual streams.',
              },
              {
                step: 'Stage 02',
                title: 'Separate Collection',
                desc: 'Compartmentalized or stream-dedicated vehicles prevent re-mixing during transit.',
              },
              {
                step: 'Stage 03',
                title: 'Weighing & Recording',
                desc: 'Digital weighbridges verify Gross and Tare weights and assign batch custody IDs.',
              },
              {
                step: 'Stage 04',
                title: 'Recovery / Treatment',
                desc: 'Organic → Compost/AD; Recyclables → MRF; Hazardous → Isolated Safe Containment.',
              },
              {
                step: 'Stage 05',
                title: 'Safe Residual Disposal',
                desc: 'Post-recovery inert residuals routed to sanitary cells (or conditional WtE if gates pass).',
              },
            ].map((item, idx) => (
              <div
                key={item.step}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono font-bold text-emerald-800">{item.step}</div>
                  <div className="text-sm font-bold text-slate-900 mt-1">{item.title}</div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
                </div>
                {idx < 4 && (
                  <div className="text-[11px] font-mono text-slate-400 mt-3">
                    Proceeds to Stage 0{idx + 2} →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories A, B, C, D Stream Tracking Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* A. Organic Waste */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-800">
                PATHWAY A · BIOLOGICAL VALORISATION
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                A. Organic Waste (Composting & Anaerobic Digestion)
              </h2>
            </div>
            <Leaf className="w-5 h-5 text-emerald-700 shrink-0" />
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Appropriate source-segregated organic waste from households and kitchen markets is
            routed to composting or anaerobic digestion facilities, depending on feedstock purity
            and facility capability.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 block">Quantity Received</span>
              <span className="font-mono font-bold text-slate-900 text-sm">186.6 t/day</span>
            </div>
            <div>
              <span className="text-slate-500 block">Quantity Processed</span>
              <span className="font-mono font-bold text-slate-900 text-sm">179.2 t/day</span>
            </div>
            <div>
              <span className="text-slate-500 block">Recovered Output</span>
              <span className="font-mono font-bold text-emerald-800 text-sm">
                145.5 t Compost/Biogas
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Screening Residual</span>
              <span className="font-mono font-semibold text-slate-700">33.7 t (To DISP-01)</span>
            </div>
            <div className="col-span-2">
              <span className="text-slate-500 block">Demonstration Facility Status</span>
              <button
                onClick={() => setSelectedEntity({ type: 'facility', id: 'DEMO-FACILITY-05' })}
                className="font-mono font-semibold text-emerald-800 hover:underline"
              >
                DEMO-FACILITY-05 & 06: Operational (Synthetic) →
              </button>
            </div>
          </div>
        </div>

        {/* B. Recyclable Waste */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-blue-700">
                PATHWAY B · MATERIAL RECOVERY
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                B. Recyclable Waste (MRF Sorting & Baling)
              </h2>
            </div>
            <Recycle className="w-5 h-5 text-blue-600 shrink-0" />
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Paper, cardboard, PET/HDPE plastics, metals, and glass separated at source are directed
            to Material Recovery Facilities (MRFs) for optical/manual sorting and formal recycling
            channel integration.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 block">Quantity Collected</span>
              <span className="font-mono font-bold text-slate-900 text-sm">122.7 t/day</span>
            </div>
            <div>
              <span className="text-slate-500 block">Quantity Sorted</span>
              <span className="font-mono font-bold text-slate-900 text-sm">119.0 t/day</span>
            </div>
            <div>
              <span className="text-slate-500 block">Recovered for Recycling</span>
              <span className="font-mono font-bold text-blue-700 text-sm">103.1 t Baled</span>
            </div>
            <div>
              <span className="text-slate-500 block">Non-Recyclable Residual</span>
              <span className="font-mono font-semibold text-slate-700">15.9 t (To DISP-01)</span>
            </div>
            <div className="col-span-2">
              <span className="text-slate-500 block">Destination Record</span>
              <button
                onClick={() => setSelectedEntity({ type: 'facility', id: 'DEMO-FACILITY-03' })}
                className="font-mono font-semibold text-blue-700 hover:underline"
              >
                DEMO-FACILITY-03 & 04 (MRF Hubs) →
              </button>
            </div>
          </div>
        </div>

        {/* C. Hazardous Waste (Strictly Isolated) */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-red-700">
                PATHWAY C · ISOLATED SAFE PROTOCOL
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                C. Hazardous Household Waste (Dedicated Safe Pathway)
              </h2>
            </div>
            <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Household hazardous items (batteries, domestic chemical containers, e-waste, sharps)
            require segregated drop-off/collection, sealed transport, secure temporary storage, and
            specialized treatment. <strong>Never routed through composting or ordinary municipal waste pathways.</strong>
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-red-50/50 p-4 rounded-xl border border-red-200 text-xs">
            <div>
              <span className="text-slate-600 block">Segregated Intake</span>
              <span className="font-mono font-bold text-red-900 text-sm">11.2 t/day</span>
            </div>
            <div>
              <span className="text-slate-600 block">Transit Route</span>
              <span className="font-mono font-bold text-red-900 text-sm">ROUTE-DEMO-05</span>
            </div>
            <div>
              <span className="text-slate-600 block">Containment Status</span>
              <span className="font-mono font-bold text-red-900 text-sm">100% Isolated</span>
            </div>
            <div className="col-span-3 pt-1">
              <button
                onClick={() => setSelectedEntity({ type: 'facility', id: 'DEMO-FACILITY-10' })}
                className="font-mono font-semibold text-red-800 hover:underline"
              >
                Inspect Secure Containment Unit DEMO-FACILITY-10 →
              </button>
            </div>
          </div>
        </div>

        {/* D. Residual Waste */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-slate-600">
                PATHWAY D · POST-RECOVERY INERT MANAGEMENT
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                D. Residual Waste (Engineered Sanitary Disposal)
              </h2>
            </div>
            <Layers className="w-5 h-5 text-slate-600 shrink-0" />
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Residual waste comprises the non-recoverable material remaining after source
            segregation, MRF sorting, and organic treatment options have been exhausted. It is
            weighed and directed to engineered sanitary cells with leachate management.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 block">Direct & Reject Residual</span>
              <span className="font-mono font-bold text-slate-900 text-sm">217.9 t/day</span>
            </div>
            <div>
              <span className="text-slate-500 block">Pre-Sort Recovery</span>
              <span className="font-mono font-bold text-emerald-800 text-sm">26.4 t/day</span>
            </div>
            <div>
              <span className="text-slate-500 block">Sanitary Cell Intake</span>
              <span className="font-mono font-bold text-slate-900 text-sm">191.5 t/day</span>
            </div>
            <div className="col-span-3 pt-1">
              <button
                onClick={() => setSelectedEntity({ type: 'facility', id: 'DEMO-FACILITY-07' })}
                className="font-mono font-semibold text-slate-800 hover:underline"
              >
                Inspect Sanitary Residual Cells DEMO-FACILITY-07 & 08 →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* E. Interactive Waste-to-Energy (WtE) 4-Gate Viability Simulator */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="text-xs font-mono font-semibold text-amber-800">
              PATHWAY E · INTERACTIVE POLICY DECISION GATE SIMULATOR
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              E. Conditional Waste-to-Energy (WtE) Four-Gate Viability Assessment
            </h2>
            <p className="text-xs text-slate-600 mt-0.5 max-w-3xl">
              Major WtE investment must only proceed when all four feasibility gates are
              demonstrably satisfied. Toggle any decision gate below to test the policy governance
              rule during judge demonstrations. (Note: Does not label any real facility as viable
              without supporting evidence.)
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-xs font-mono text-slate-500 block">Gates Currently Passed</span>
            <span className="text-2xl font-bold font-mono text-slate-900">{passedCount} / 4</span>
          </div>
        </div>

        {/* 4 Interactive Gate Checkboxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              key: 'technical' as const,
              title: 'Gate 1 — Technical Feedstock Suitability',
              question:
                'Is there reliable, suitable post-recovery feedstock in sufficient quantity and calorific quality (after removing wet organics and recyclables)?',
              passed: wteGates.technical,
            },
            {
              key: 'financial' as const,
              title: 'Gate 2 — Financial Sustainability & Tipping Fee Viability',
              question:
                'Can the project cover operating costs, debt service, and a reasonable return under the proposed municipal financing structure without crowding out basic collection budgets?',
              passed: wteGates.financial,
            },
            {
              key: 'environmental' as const,
              title: 'Gate 3 — Environmental & Social Safeguards',
              question:
                'Are required regulatory approvals, continuous dioxin/flue-gas emission controls, safe fly/bottom ash residual management, and informal worker protections adequately addressed?',
              passed: wteGates.environmental,
            },
            {
              key: 'governance' as const,
              title: 'Gate 4 — Governance, Procurement & Oversight',
              question:
                'Are procurement, tipping-fee contracts, weighbridge reporting, and independent regulatory oversight sufficiently transparent and enforceable?',
              passed: wteGates.governance,
            },
          ].map((gate) => (
            <button
              key={gate.key}
              onClick={() => toggleWteGate(gate.key)}
              className={`text-left p-5 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                gate.passed
                  ? 'bg-emerald-50/60 border-emerald-300'
                  : 'bg-amber-50/60 border-amber-300'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {gate.passed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                ) : (
                  <XCircle className="w-5 h-5 text-amber-700" />
                )}
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-bold text-slate-900">{gate.title}</span>
                  <span
                    className={`text-[11px] font-mono font-bold ${
                      gate.passed ? 'text-emerald-800' : 'text-amber-800'
                    }`}
                  >
                    {gate.passed ? '[GATE PASSED]' : '[NOT PASSED]'}
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">{gate.question}</p>
                <span className="text-[11px] font-medium text-slate-500 block pt-1">
                  Click card to toggle gate status in simulation
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Dynamic Policy Decision Outcome Banner */}
        <div
          className={`p-5 rounded-xl border ${
            allGatesPassed
              ? 'bg-emerald-950 text-white border-emerald-800'
              : 'bg-slate-900 text-white border-slate-800'
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs font-mono font-semibold text-emerald-400">
                SIMULATED POLICY OUTCOME ({passedCount} OF 4 REQUIRED GATES PASSED)
              </div>
              {allGatesPassed ? (
                <>
                  <h3 className="text-lg font-bold text-white">
                    Outcome A — All Required Gates Passed: Proceed to Relevant Approval & Investment
                    Process
                  </h3>
                  <p className="text-xs text-slate-200 max-w-3xl">
                    With technical calorific feedstock, financial sustainability, emission/ash
                    safeguards, and transparent contract governance verified, conditional residual
                    WtE evaluation may proceed to formal statutory review for post-recovery dry
                    residuals only.
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-bold text-amber-300">
                    Outcome B — One or More Gates Not Passed: Defer Major WtE Expansion & Strengthen
                    Recovery
                  </h3>
                  <p className="text-xs text-slate-300 max-w-3xl">
                    Because {4 - passedCount} decision gate(s) remain unmet, major WtE capital
                    lock-in is deferred. Municipal resources must prioritise source segregation,
                    Material Recovery Facilities (MRFs), and organic composting/anaerobic digestion
                    ("Reform First. Recover Value. Use WtE Only When Viable.").
                  </p>
                </>
              )}
            </div>

            <div className="shrink-0">
              <button
                onClick={() => setSelectedEntity({ type: 'facility', id: 'DEMO-FACILITY-09' })}
                className="px-4 py-2 text-xs font-semibold bg-white text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer whitespace-nowrap"
              >
                Inspect DEMO-FACILITY-09
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
