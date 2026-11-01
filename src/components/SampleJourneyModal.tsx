import React from 'react';
import {
  X,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Scale,
  Truck,
  Recycle,
  ShieldCheck,
  MapPin,
} from 'lucide-react';
import { useWasteTrack } from '../context/WasteTrackContext';

const SAMPLE_STEPS = [
  {
    step: 1,
    stage: 'Stage 1: Curbside Source Segregation & Primary Collection',
    timestamp: '2026-10-28 07:15',
    location: 'WARD-DEMO-01 (Uttara Model Sector — Illustrative)',
    actor: 'DEMO-CONT-01 Crew · Vehicle DEMO-TRK-001',
    metric: 'Segregated Stream: Wet Organic Waste',
    description:
      'Households in Ward 01 separate organic kitchen waste from dry recyclables. Collection vehicle DEMO-TRK-001 scans the route cluster tag and logs batch DEMO-BATCH-2026-001 into the digital manifest.',
    accountabilityNote:
      'Verifies scheduled pickup completion in Ward 01 and prevents mixed-waste hauling at the origin.',
  },
  {
    step: 2,
    stage: 'Stage 2: Secondary Transfer Station Arrival & Bay Assignment',
    timestamp: '2026-10-28 08:05',
    location: 'North Secondary Transfer Station (DEMO-FACILITY-01)',
    actor: 'Automated Gate Controller · STS-North',
    metric: 'Assigned Bay: Dedicated Organic Compaction Bay #2',
    description:
      'DEMO-TRK-001 arrives at DEMO-FACILITY-01. Because the batch is registered as source-segregated organic waste, it is directed to a dedicated organic bay rather than mixed with residual or hazardous streams.',
    accountabilityNote:
      'Prevents cross-contamination of separated organic feedstock during intermediate transfer.',
  },
  {
    step: 3,
    stage: 'Stage 3: Digital Weighbridge Gross & Tare Verification',
    timestamp: '2026-10-28 08:16',
    location: 'North Digital Weighbridge Hub (DEMO-WS-01)',
    actor: 'Automated Axle Scale · Record WB-REC-2026-001',
    metric: 'Gross: 8,180 kg − Tare: 3,350 kg = Net: 4,830 kg',
    description:
      'Before exiting the transfer hub, the vehicle is weighed loaded (8,180 kg) and matched against its certified tare weight (3,350 kg), certifying a Net Waste Weight of 4,830 kg.',
    accountabilityNote:
      'Eliminates estimated or inflated contractor tonnage claims by requiring both gross and tare measurements.',
  },
  {
    step: 4,
    stage: 'Stage 4: Resource Recovery & Organic Treatment Intake',
    timestamp: '2026-10-28 09:40',
    location: 'Bio-Compost & Anaerobic Digestion Plant 01 (DEMO-FACILITY-05)',
    actor: 'Facility Intake Operator · ORG-01 Demo',
    metric: 'Recovered Output: 3,767 kg Compost/Biogas Feedstock (78%)',
    description:
      'The certified 4,830 kg organic batch is received at DEMO-FACILITY-05. Pre-screening removes minor non-compostable impurities, routing 3,767 kg into biological treatment.',
    accountabilityNote:
      'Demonstrates the core policy principle: "Reform First. Recover Value. Use WtE Only When Viable."',
  },
  {
    step: 5,
    stage: 'Stage 5: Safe Residual Disposal & Chain-of-Custody Closure',
    timestamp: '2026-10-28 11:10',
    location: 'Engineered Sanitary Residual Cell A (DEMO-FACILITY-07)',
    actor: 'Sanitary Cell Manifest System · DISP-01 Demo',
    metric: 'Inert Screening Residual Disposed: 1,063 kg (22%)',
    description:
      'Only the 1,063 kg of inert screening rejects remaining after composting recovery are sent to Engineered Sanitary Cell A. The chain-of-custody record is closed with 100% mass balance reconciliation.',
    accountabilityNote:
      'Reduces landfill dependence by 78% for this batch while leaving a complete, auditable public record.',
  },
];

export const SampleJourneyModal: React.FC = () => {
  const {
    isSampleJourneyOpen,
    setIsSampleJourneyOpen,
    sampleJourneyStep,
    setSampleJourneyStep,
    setActiveModule,
    setSelectedEntity,
  } = useWasteTrack();

  if (!isSampleJourneyOpen) return null;

  const current = SAMPLE_STEPS[sampleJourneyStep] || SAMPLE_STEPS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-[2px]">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden">
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-emerald-400 block">
              INTERACTIVE JUDGE WALKTHROUGH · SYNTHETIC CHAIN OF CUSTODY
            </span>
            <h3 className="text-lg font-bold mt-0.5">
              Sample Waste Journey: Batch DEMO-BATCH-2026-001
            </h3>
          </div>
          <button
            onClick={() => setIsSampleJourneyOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg"
            aria-label="Close sample journey"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Progress Stepper */}
          <div className="grid grid-cols-5 gap-2">
            {SAMPLE_STEPS.map((s, idx) => (
              <button
                key={s.step}
                onClick={() => setSampleJourneyStep(idx)}
                className={`text-left p-2.5 rounded-lg border transition-colors ${
                  idx === sampleJourneyStep
                    ? 'border-emerald-700 bg-emerald-50/70 text-emerald-950'
                    : idx < sampleJourneyStep
                    ? 'border-slate-200 bg-slate-50 text-slate-700'
                    : 'border-slate-200 bg-white text-slate-400'
                }`}
              >
                <div className="text-xs font-mono font-bold">Step 0{s.step}</div>
                <div className="text-[11px] font-medium truncate mt-0.5">
                  {s.stage.replace(/^Stage \d:\s*/, '')}
                </div>
              </button>
            ))}
          </div>

          {/* Current Step Card */}
          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
              <span className="font-mono font-semibold text-emerald-800">{current.timestamp}</span>
              <span>·</span>
              <span className="font-medium text-slate-700">{current.location}</span>
            </div>

            <h4 className="text-base font-bold text-slate-900">{current.stage}</h4>

            <div className="p-3 bg-white rounded-lg border border-slate-200 font-mono text-xs text-slate-900 flex items-center justify-between">
              <span>{current.actor}</span>
              <span className="font-semibold text-emerald-800">{current.metric}</span>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">{current.description}</p>

            <div className="pt-2 border-t border-slate-200 text-xs text-slate-600">
              <strong className="text-slate-900">Municipal Accountability Impact: </strong>
              {current.accountabilityNote}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setSampleJourneyStep((prev) => Math.max(0, prev - 1))}
              disabled={sampleJourneyStep === 0}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-40"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous Stage
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setIsSampleJourneyOpen(false);
                  setActiveModule('tracking');
                  setSelectedEntity({ type: 'batch', id: 'DEMO-BATCH-2026-001' });
                }}
                className="px-3.5 py-2 text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
              >
                Inspect Full Batch Record
              </button>

              {sampleJourneyStep < SAMPLE_STEPS.length - 1 ? (
                <button
                  onClick={() =>
                    setSampleJourneyStep((prev) => Math.min(SAMPLE_STEPS.length - 1, prev + 1))
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors"
                >
                  Next Stage
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setIsSampleJourneyOpen(false)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Finish Walkthrough
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
