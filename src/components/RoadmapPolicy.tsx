import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  ArrowRight,
  Recycle,
  Briefcase,
  ShieldCheck,
  TrendingDown,
  Factory,
  Layers,
} from 'lucide-react';

const ROADMAP_PHASES = [
  {
    id: 'phase-1',
    period: '2027',
    title: 'Phase 1: Initial Actions & Baseline Foundation',
    subtitle: 'Establishing empirical baselines, ward pilots, and weighbridge discipline',
    milestones: [
      'Baseline data development across municipal collection zones and transfer stations.',
      'Ward-level pilot planning in representative residential and commercial sectors.',
      'Initial household and market source-segregation measures (wet organic vs. dry recyclable).',
      'Basic collection manifest and digital weighbridge gross/tare recordkeeping.',
      'Formal definition of enforceable municipal key performance indicators (KPIs).',
    ],
    kpiFocus: 'Weighbridge Record Completeness (%) & Pilot Ward Source Segregation Rate (%)',
  },
  {
    id: 'phase-2',
    period: '2028–2029',
    title: 'Phase 2: System Development & Recovery Rollout',
    subtitle: 'Scaling digital batch tracking, contractor SLAs, and organic/MRF processing',
    milestones: [
      'Improved ward collection scheduling with time-window tracking.',
      'Wider city-wide adoption of source segregation supported by compartmentalized hauling.',
      'Digital batch tracking linking Secondary Transfer Stations (STS) to treatment facilities.',
      'Standardized facility and contractor performance recordkeeping on the public dashboard.',
      'Commissioning and expansion of initial Material Recovery Facilities (MRFs) and organic composting/AD systems.',
    ],
    kpiFocus: 'On-Time Collection Rate (%), Material Recovery Rate (%), & SLA Compliance',
  },
  {
    id: 'phase-3',
    period: '2030–2031',
    title: 'Phase 3: City-Wide Scale-Up & Evidence-Based Assessment',
    subtitle: 'Expanding recovery capacity, independent auditing, and 4-gate WtE evaluation',
    milestones: [
      'Expansion of successful ward-level segregation and tracking systems across Dhaka.',
      'Improved public reporting, mass-balance reconciliation, and independent audit arrangements.',
      'Additional decentralized and regional material recovery and organic treatment capacity.',
      'Rigorous, evidence-based assessment of possible WtE investment using the 4 Decision Gates (Technical, Financial, Environmental/Social, Governance).',
    ],
    kpiFocus: 'Landfill Diversion Rate (%) & 4-Gate WtE Feedstock/Financial Readiness Audit',
  },
  {
    id: 'phase-4',
    period: '2032–2036',
    title: 'Phase 4: Consolidation & National Replication',
    subtitle: 'Long-term circular sustainability and adaptation to Chattogram & major cities',
    milestones: [
      'Continued real-time public performance monitoring and citizen accountability.',
      'Long-term operational and financial sustainability of municipal waste services.',
      'Full integration of EPR producer take-back schemes, MRFs, and biological treatment systems.',
      'Adaptation and replication of validated digital tracking and accountability frameworks to Chattogram and other major cities in Bangladesh.',
    ],
    kpiFocus: 'Long-Term Residual Reduction & Multi-City Standardized Accountability Index',
  },
];

const POLICY_CONCEPTS = [
  {
    title: '1. Circular Economy',
    description:
      'Shifts municipal operations from linear "collect-and-dump" hauling to closed-loop resource retention by keeping organic nutrients and dry recyclables in productive circulation.',
    dashboardMetric: 'Tracked via Source Segregation Rate (%) and Material Recovery Rate (%).',
  },
  {
    title: '2. Waste Valorisation',
    description:
      'Converts high-moisture organic streams (which lower incinerator efficiency) into agricultural compost and biogas, while sorting high-value plastics, paper, and metals at MRFs.',
    dashboardMetric: 'Tracked via Compost/Biogas Output (t) and Baled Recyclables (t) at Facilities.',
  },
  {
    title: '3. Pollution Prevention',
    description:
      'Isolates household hazardous waste into a dedicated safe-handling pathway and prevents open dumping, canal blockage, and uncontrolled methane or dioxin emissions.',
    dashboardMetric: 'Tracked via Isolated Hazardous Intake (DEMO-FACILITY-10) & Illegal Dumping Resolution.',
  },
  {
    title: '4. Green Employment & Formalization',
    description:
      'Creates safer, formalized sorting, composting, and fleet monitoring jobs for informal waste collectors within Material Recovery Facilities and ward collection teams.',
    dashboardMetric: 'Tracked via MRF Sorting Throughput and Ward Collection Crew Completion.',
  },
  {
    title: '5. Reduced Landfill Dependence',
    description:
      'Ensures that engineered sanitary disposal cells receive only post-recovery inert residuals, dramatically extending landfill lifespan and reducing land acquisition pressure.',
    dashboardMetric: 'Tracked via Waste Destination Breakdown (Recovery vs. Residual Disposal).',
  },
  {
    title: '6. Extended Producer Responsibility (EPR)',
    description:
      'Provides transparent batch-level data on packaging and recyclable polymers recovered at MRFs, creating the empirical foundation for brand-owner EPR compliance.',
    dashboardMetric: 'Tracked via MRF Polymer/Packaging Recovery Logs in Module 3 & Module 6.',
  },
];

export const RoadmapPolicy: React.FC = () => {
  const [selectedPhaseIndex, setSelectedPhaseIndex] = useState<number>(0);
  const activePhase = ROADMAP_PHASES[selectedPhaseIndex];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="text-xs font-mono font-semibold text-amber-800">
          PROPOSED POLICY IMPLEMENTATION ARRANGEMENTS (2027–2036) · CASE COMPETITION RECOMMENDATION
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mt-1">
          2027–2036 Municipal Waste-Management Roadmap & Policy Integration
        </h1>
        <p className="text-sm text-slate-600 mt-0.5 max-w-4xl">
          A phased 10-year institutional reform sequence designed for Dhaka and adaptable to
          Chattogram and other major cities in Bangladesh. Note: These phases represent proposed
          policy recommendations based on the case requirements, not claims of completed government
          actions.
        </p>

        {/* Interactive 4-Phase Timeline Selector */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {ROADMAP_PHASES.map((phase, idx) => {
            const isSelected = idx === selectedPhaseIndex;
            return (
              <button
                key={phase.id}
                onClick={() => setSelectedPhaseIndex(idx)}
                className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div
                  className={`text-xs font-mono font-bold ${
                    isSelected ? 'text-emerald-400' : 'text-emerald-800'
                  }`}
                >
                  {phase.period}
                </div>
                <div className="text-sm font-bold mt-1">{phase.title}</div>
                <div
                  className={`text-xs mt-1 ${
                    isSelected ? 'text-slate-300' : 'text-slate-500'
                  }`}
                >
                  Click to inspect deliverables →
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Phase Detail Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-emerald-800">
              PROPOSED ROADMAP STAGE · {activePhase.period}
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">{activePhase.title}</h2>
            <p className="text-xs text-slate-600 mt-0.5">{activePhase.subtitle}</p>
          </div>
          <div className="px-3.5 py-2 rounded-lg bg-slate-100 text-xs font-mono text-slate-800">
            <strong>Primary KPI Focus:</strong> {activePhase.kpiFocus}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          {activePhase.milestones.map((item, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span className="text-slate-800 font-medium leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Policy Integration Matrix */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Policy Integration & How Dhaka WasteTrack Measures Progress
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Linking national climate, environmental, and circular-economy objectives to verifiable
            municipal dashboard indicators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {POLICY_CONCEPTS.map((concept) => (
            <div
              key={concept.title}
              className="p-5 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between space-y-3"
            >
              <div>
                <h3 className="text-sm font-bold text-slate-900">{concept.title}</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {concept.description}
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200/80 text-[11px] font-mono text-emerald-900">
                <strong>Dashboard Linkage:</strong> {concept.dashboardMetric}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
