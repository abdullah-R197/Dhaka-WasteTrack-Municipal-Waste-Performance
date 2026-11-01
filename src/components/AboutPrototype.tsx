import React from 'react';
import {
  ShieldAlert,
  BookOpen,
  Cpu,
  CheckCircle2,
  Play,
  RotateCcw,
  ArrowUpRight,
} from 'lucide-react';
import { useWasteTrack } from '../context/WasteTrackContext';

export const AboutPrototype: React.FC = () => {
  const {
    setActiveModule,
    setIsSampleJourneyOpen,
    setSampleJourneyStep,
    resetDemoEnvironment,
  } = useWasteTrack();

  return (
    <div className="space-y-6">
      {/* Project & Team Attribution Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <div className="text-xs font-mono font-semibold text-emerald-800">
          ACADEMIC POLICY CASE COMPETITION PROTOTYPE
        </div>
        <h1 className="text-2xl font-bold text-slate-900">
          About Dhaka WasteTrack — Municipal Waste Operations & Public Accountability
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-slate-500 block">Project Name</span>
            <span className="font-bold text-slate-900 text-sm mt-0.5 block">
              Dhaka WasteTrack
            </span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-slate-500 block">Participating Team</span>
            <span className="font-bold text-slate-900 text-sm mt-0.5 block">Team MacroMind</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-slate-500 block">Competition Event</span>
            <span className="font-bold text-slate-900 text-sm mt-0.5 block">
              CPD Climate Week 2026 Climate Policy Case Competition
            </span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-slate-500 block">Case Topic</span>
            <span className="font-bold text-slate-900 text-sm mt-0.5 block">
              Urban Waste Management in Bangladesh: Towards an Enforceable Municipal Plan
            </span>
          </div>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed pt-2">
          <strong>Purpose:</strong> Demonstrate a proposed digital platform for linking collection
          routes, vehicles, transfer stations, weighbridges, treatment facilities, disposal sites
          (Requirement C), and public municipal performance indicators by ward and contractor
          (Requirement D) under the governing principle:{' '}
          <strong className="text-emerald-900">
            “Reform First. Recover Value. Use WtE Only When Viable.”
          </strong>
        </p>
      </div>

      {/* Prominent Data Disclaimer (Exact Wording Required by Section 15) */}
      <div className="bg-slate-900 text-white rounded-xl p-6 space-y-3 border border-slate-800">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400">
          <ShieldAlert className="w-4 h-4" />
          <span>IMPORTANT DATA DISCLAIMER</span>
        </div>
        <blockquote className="text-sm sm:text-base text-slate-100 leading-relaxed font-medium">
          “This website is an academic demonstration prototype developed by Team MacroMind for a
          climate-policy case competition. All displayed operational records, vehicle information,
          contractor identifiers, facility records, route simulations, and dashboard values are
          synthetic unless explicitly identified as sourced information. This prototype does not
          represent a live municipal management system and is not connected to official city
          corporation databases, actual GPS feeds, or real complaint-processing services.”
        </blockquote>
      </div>

      {/* Evidence, Sources & Assumptions Classification (Section 20.F) */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-800" />
          <h2 className="text-base font-bold text-slate-900">
            Evidence, Policy Recommendations & Synthetic Assumptions Classification
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          To maintain rigorous academic transparency for competition judges, all elements in this
          prototype are explicitly categorized across four distinct tiers:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="font-bold text-slate-900">
              1. Information from the Official Case File
            </div>
            <p className="text-slate-600 leading-relaxed">
              Includes the structural problem statement for urban waste management in Bangladesh,
              Requirement C (digital platform linking routes, vehicles, transfer stations,
              weighbridges, treatment, and disposal), Requirement D (public ward and contractor
              dashboard), and the 2027–2036 phased reform horizon.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="font-bold text-slate-900">
              2. Proposed Policy Recommendations by Team MacroMind
            </div>
            <p className="text-slate-600 leading-relaxed">
              Includes the core hierarchy ("Reform First. Recover Value. Use WtE Only When Viable."),
              the Four Decision Gates for conditional WtE viability, the proposed 72-hour service
              complaint resolution target, and illustrative KPI targets (e.g., 95% completion, 90%
              on-time collection). None of these proposed targets are claimed as existing statutory
              law.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="font-bold text-slate-900">
              3. Synthetic Demonstration Dataset
            </div>
            <p className="text-slate-600 leading-relaxed">
              All 8 demonstration wards (`WARD-DEMO-01` to `08`), 4 contractor IDs (`DEMO-CONT-01`
              to `04`), 12 vehicle IDs (`DEMO-TRK-001` to `012`), 12 facility/weighbridge nodes, 48
              batch custody logs, and 20 complaint records are 100% synthetic and constructed solely
              to demonstrate how linked municipal records operate.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="font-bold text-slate-900">
              4. Future Production Integration Pathway
            </div>
            <p className="text-slate-600 leading-relaxed">
              In a future authorized municipal deployment (DNCC/DSCC/CCC), this architecture could
              connect to certified digital weighbridge RS-232/API controllers, onboard GPS/RFID
              transponders on compactor trucks, QR-coded ward transfer bins, and the national 333
              civic grievance portal. (These integrations do not exist in this prototype.)
            </p>
          </div>
        </div>
      </div>

      {/* How to Test the Main Website Interactions (Section 21.13 Judge Guide) */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <h2 className="text-base font-bold text-slate-900">
          Judge Evaluation Guide: How to Test Key Prototype Interactions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900">
              Test 1: Run Sample Waste Journey & Route Simulation
            </div>
            <p className="text-slate-600">
              Click "Run Sample Waste Journey" to trace `DEMO-BATCH-2026-001` across all 5 custody
              stages, or open the Operations Map to toggle between the SVG Schematic and Dhaka Map
              and click "Simulate Route".
            </p>
            <button
              onClick={() => {
                setSampleJourneyStep(0);
                setIsSampleJourneyOpen(true);
              }}
              className="inline-flex items-center gap-1 font-semibold text-emerald-800 hover:underline pt-1"
            >
              Launch Sample Journey <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900">
              Test 2: Inspect Missing Tare & WtE Decision Gates
            </div>
            <p className="text-slate-600">
              In Waste Tracking, filter by "Under Review" to see how missing tare scans (`DEMO-BATCH-2026-009`)
              display "Pending Verification". In Waste Recovery, toggle the 4 WtE Decision Gates to
              see the policy outcome change live.
            </p>
            <button
              onClick={() => setActiveModule('recovery')}
              className="inline-flex items-center gap-1 font-semibold text-emerald-800 hover:underline pt-1"
            >
              Test WtE Decision Gates <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900">
              Test 3: Submit a Synthetic Complaint & Reset Demo
            </div>
            <p className="text-slate-600">
              Open Complaints & Service Issues, submit a synthetic issue, and watch the Overview
              KPIs and Ward table update immediately. Use "Reset Demo State" in the top bar at any
              time to restore the baseline.
            </p>
            <button
              onClick={resetDemoEnvironment}
              className="inline-flex items-center gap-1 font-semibold text-emerald-800 hover:underline pt-1"
            >
              Reset Demo Environment Now <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
