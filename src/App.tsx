import React, { useState } from 'react';
import {
  LayoutDashboard,
  Map,
  PackageSearch,
  Truck,
  Building2,
  ShieldCheck,
  Award,
  MessageSquareWarning,
  Recycle,
  CalendarRange,
  Info,
  Menu,
  X,
  Presentation,
  RotateCcw,
  Play,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { WasteTrackProvider, useWasteTrack } from './context/WasteTrackContext';
import { ModuleId } from './types/waste';
import { OverviewDashboard } from './components/OverviewDashboard';
import { OperationsMap } from './components/OperationsMap';
import { WasteTracking } from './components/WasteTracking';
import { CollectionVehicles } from './components/CollectionVehicles';
import { FacilitiesWeighbridges } from './components/FacilitiesWeighbridges';
import { PublicPerformance } from './components/PublicPerformance';
import { ComplaintsAccountability } from './components/ComplaintsAccountability';
import { WasteRecoveryTreatment } from './components/WasteRecoveryTreatment';
import { RoadmapPolicy } from './components/RoadmapPolicy';
import { AboutPrototype } from './components/AboutPrototype';
import { EntityDetailDrawer } from './components/EntityDetailDrawer';
import { SampleJourneyModal } from './components/SampleJourneyModal';

const NAV_ITEMS: {
  id: ModuleId;
  label: string;
  shortLabel: string;
  icon: React.FC<{ className?: string }>;
}[] = [
  { id: 'overview', label: '1. Overview Dashboard', shortLabel: 'Overview', icon: LayoutDashboard },
  { id: 'map', label: '2. Operations Map', shortLabel: 'Operations Map', icon: Map },
  { id: 'tracking', label: '3. Waste Tracking', shortLabel: 'Waste Tracking', icon: PackageSearch },
  { id: 'vehicles', label: '4. Collection Vehicles', shortLabel: 'Vehicles', icon: Truck },
  {
    id: 'facilities',
    label: '5. Facilities & Weighbridges',
    shortLabel: 'Facilities',
    icon: Building2,
  },
  { id: 'wards', label: '6. Ward Performance', shortLabel: 'Ward Performance', icon: ShieldCheck },
  {
    id: 'contractors',
    label: '7. Contractor Performance',
    shortLabel: 'Contractors',
    icon: Award,
  },
  {
    id: 'complaints',
    label: '8. Complaints & Service Issues',
    shortLabel: 'Complaints',
    icon: MessageSquareWarning,
  },
  {
    id: 'recovery',
    label: '9. Waste Recovery & Treatment',
    shortLabel: 'Recovery & WtE',
    icon: Recycle,
  },
  {
    id: 'roadmap',
    label: '10. Roadmap & Policy',
    shortLabel: 'Roadmap 2027–36',
    icon: CalendarRange,
  },
  { id: 'about', label: '11. About This Prototype', shortLabel: 'About', icon: Info },
];

const JUDGE_WALKTHROUGH_STEPS = [
  {
    step: 0,
    module: 'overview' as ModuleId,
    title: 'Step 1: Executive Overview & Core Principle',
    highlight:
      'Demonstrates all 8 municipal KPIs, stream composition, and the central hierarchy: "Reform First. Recover Value. Use WtE Only When Viable."',
  },
  {
    step: 1,
    module: 'map' as ModuleId,
    title: 'Step 2: Requirement C — Integrated Digital Platform Map',
    highlight:
      'Dual-mode SVG Schematic & Dhaka Map linking collection points, vehicles, transfer stations, weighbridges, MRFs, composting, and isolated hazardous disposal.',
  },
  {
    step: 2,
    module: 'tracking' as ModuleId,
    title: 'Step 3: Chain-of-Custody & Weighbridge Verification',
    highlight:
      'Tracks batches from origin to disposal using Net Weight = Gross − Tare, flagging missing tare scans as "Pending Verification".',
  },
  {
    step: 3,
    module: 'wards' as ModuleId,
    title: 'Step 4: Requirement D — Public Ward & Contractor Accountability',
    highlight:
      'Open public scorecard comparing scheduled vs. completed pickups, missed collections, segregation rates, and contractor record completeness.',
  },
  {
    step: 4,
    module: 'recovery' as ModuleId,
    title: 'Step 5: Recovery Priority & Conditional WtE 4-Gate Simulator',
    highlight:
      'Interactive checklist testing Technical, Financial, Environmental/Social, and Governance gates before considering Waste-to-Energy.',
  },
  {
    step: 5,
    module: 'roadmap' as ModuleId,
    title: 'Step 6: 2027–2036 Phased Reform & Replication Roadmap',
    highlight:
      'Outlines phased implementation from 2027 baseline pilots to 2032–2036 consolidation and adaptation to Chattogram and major cities.',
  },
];

const MainWorkspace: React.FC = () => {
  const {
    activeModule,
    setActiveModule,
    isPresentationMode,
    setIsPresentationMode,
    presentationStep,
    setPresentationStep,
    resetDemoEnvironment,
    setIsSampleJourneyOpen,
    setSampleJourneyStep,
  } = useWasteTrack();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'overview':
        return <OverviewDashboard />;
      case 'map':
        return <OperationsMap />;
      case 'tracking':
        return <WasteTracking />;
      case 'vehicles':
        return <CollectionVehicles />;
      case 'facilities':
        return <FacilitiesWeighbridges />;
      case 'wards':
        return <PublicPerformance mode="wards" />;
      case 'contractors':
        return <PublicPerformance mode="contractors" />;
      case 'complaints':
        return <ComplaintsAccountability />;
      case 'recovery':
        return <WasteRecoveryTreatment />;
      case 'roadmap':
        return <RoadmapPolicy />;
      case 'about':
        return <AboutPrototype />;
      default:
        return <OverviewDashboard />;
    }
  };

  const currentGuide =
    JUDGE_WALKTHROUGH_STEPS[presentationStep] || JUDGE_WALKTHROUGH_STEPS[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Bar Contract: 3 Clean Zones separated by gap-8 */}
      <header className="sticky top-0 z-30 bg-slate-950 text-white border-b border-slate-800 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          {!isPresentationMode && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-slate-300 hover:text-white rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}
          <a
            href="#overview"
            onClick={(e) => {
              e.preventDefault();
              setActiveModule('overview');
            }}
            className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 font-display"
          >
            Dhaka WasteTrack
          </a>
        </div>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
          <a
            href="#overview"
            onClick={(e) => {
              e.preventDefault();
              setActiveModule('overview');
            }}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
              activeModule === 'overview' ? 'text-white underline underline-offset-4' : ''
            }`}
          >
            Overview
          </a>
          <a
            href="#map"
            onClick={(e) => {
              e.preventDefault();
              setActiveModule('map');
            }}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
              activeModule === 'map' ? 'text-white underline underline-offset-4' : ''
            }`}
          >
            Operations Map
          </a>
          <a
            href="#tracking"
            onClick={(e) => {
              e.preventDefault();
              setActiveModule('tracking');
            }}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
              activeModule === 'tracking' ? 'text-white underline underline-offset-4' : ''
            }`}
          >
            Waste Tracking
          </a>
          <a
            href="#wards"
            onClick={(e) => {
              e.preventDefault();
              setActiveModule('wards');
            }}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
              activeModule === 'wards' || activeModule === 'contractors'
                ? 'text-white underline underline-offset-4'
                : ''
            }`}
          >
            Public Accountability
          </a>
          <a
            href="#recovery"
            onClick={(e) => {
              e.preventDefault();
              setActiveModule('recovery');
            }}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
              activeModule === 'recovery' ? 'text-white underline underline-offset-4' : ''
            }`}
          >
            Recovery & WtE
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsPresentationMode((prev) => !prev)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              isPresentationMode
                ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                : 'bg-emerald-800 text-white hover:bg-emerald-700'
            }`}
          >
            {isPresentationMode ? 'Exit Judge Mode' : 'Judge Presentation Mode'}
          </button>
        </div>
      </header>

      {/* Guided Judge Walkthrough Bar (Visible when Presentation Mode is Active) */}
      {isPresentationMode && (
        <div className="bg-emerald-950 text-white border-b border-emerald-800 px-4 sm:px-6 py-3">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <div className="space-y-0.5">
              <div className="text-[11px] font-mono text-emerald-300 font-semibold">
                CPD CLIMATE WEEK 2026 · TEAM MACROMIND · GUIDED JUDGE PRESENTATION WALKTHROUGH
              </div>
              <div className="text-sm font-bold text-white">{currentGuide.title}</div>
              <p className="text-xs text-emerald-100">{currentGuide.highlight}</p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={() => setPresentationStep(Math.max(0, presentationStep - 1))}
                disabled={presentationStep === 0}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-emerald-900 hover:bg-emerald-800 rounded-lg disabled:opacity-40 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Prev
              </button>

              <span className="text-xs font-mono px-2">
                {presentationStep + 1} / {JUDGE_WALKTHROUGH_STEPS.length}
              </span>

              <button
                onClick={() =>
                  setPresentationStep(
                    Math.min(JUDGE_WALKTHROUGH_STEPS.length - 1, presentationStep + 1)
                  )
                }
                disabled={presentationStep === JUDGE_WALKTHROUGH_STEPS.length - 1}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg disabled:opacity-40 cursor-pointer"
              >
                Next Highlight
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  setSampleJourneyStep(0);
                  setIsSampleJourneyOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white text-slate-900 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                <Play className="w-3 h-3 fill-current" />
                Sample Journey
              </button>

              <button
                onClick={resetDemoEnvironment}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-emerald-900 hover:bg-emerald-800 text-emerald-100 rounded-lg cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Demo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Body Layout: Fixed/Sticky Sidebar + Spacious Main Content Area */}
      <div className="flex-1 flex">
        {/* Desktop Sidebar (Hidden in Presentation Mode for clean focus) */}
        {!isPresentationMode && (
          <aside className="hidden lg:flex lg:flex-col lg:w-68 bg-slate-900 text-slate-200 border-r border-slate-800 shrink-0 justify-between">
            <div className="p-4 space-y-5">
              {/* Brand Subtitle & Competition Context */}
              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                <div className="text-[11px] font-mono font-semibold text-emerald-400">
                  Team MacroMind · CPD 2026
                </div>
                <div className="text-xs font-semibold text-white">
                  Municipal Waste Operations & Public Accountability
                </div>
                <div className="text-[11px] text-slate-400 pt-0.5">
                  Track Waste. Measure Performance. Build a Circular City.
                </div>
              </div>

              {/* 11 Required Navigation Items */}
              <nav className="space-y-1" aria-label="Main Module Navigation">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeModule === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveModule(item.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-medium rounded-lg transition-colors text-left cursor-pointer ${
                        isActive
                          ? 'bg-emerald-800 text-white font-semibold'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Sidebar Utility Controls: Sample Journey & Reset Demo */}
            <div className="p-4 border-t border-slate-800 space-y-2">
              <button
                onClick={() => {
                  setSampleJourneyStep(0);
                  setIsSampleJourneyOpen(true);
                }}
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-600 rounded-lg transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Run Sample Waste Journey
              </button>

              <button
                onClick={resetDemoEnvironment}
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Demo State
              </button>
            </div>
          </aside>
        )}

        {/* Mobile Collapsible Navigation Drawer */}
        {mobileMenuOpen && !isPresentationMode && (
          <div className="fixed inset-0 z-40 lg:hidden flex">
            <div
              className="fixed inset-0 bg-slate-900/60"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="relative w-72 max-w-full bg-slate-900 text-white h-full overflow-y-auto p-4 flex flex-col justify-between z-50">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <div className="text-sm font-bold">Dhaka WasteTrack</div>
                    <div className="text-[11px] text-emerald-400">
                      MacroMind | CPD Climate Week 2026
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-1">
                  {NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeModule === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveModule(item.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-medium rounded-lg text-left ${
                          isActive
                            ? 'bg-emerald-800 text-white font-semibold'
                            : 'text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setSampleJourneyStep(0);
                    setIsSampleJourneyOpen(true);
                  }}
                  className="w-full py-2 text-xs font-semibold bg-emerald-700 text-white rounded-lg"
                >
                  Run Sample Waste Journey
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    resetDemoEnvironment();
                  }}
                  className="w-full py-2 text-xs font-medium bg-slate-800 text-slate-200 rounded-lg"
                >
                  Reset Demo State
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Viewport */}
        <main className="flex-1 min-w-0 flex flex-col justify-between">
          {/* Workspace Sub-Toolbar for Quick Return & Demo Context */}
          <div className="bg-white border-b border-slate-200 px-4 sm:px-8 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex flex-wrap items-center gap-2 text-slate-600">
              <span className="font-semibold text-slate-900">
                MacroMind | CPD Climate Week 2026 Case Competition
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-800 font-mono font-medium">
                DEMO ENVIRONMENT — SYNTHETIC DATA
              </span>
            </div>

            <div className="flex items-center gap-3">
              {activeModule !== 'overview' && (
                <button
                  onClick={() => setActiveModule('overview')}
                  className="font-semibold text-emerald-800 hover:underline cursor-pointer"
                >
                  ← Return to Overview Dashboard
                </button>
              )}
              <button
                onClick={resetDemoEnvironment}
                className="text-slate-600 hover:text-slate-900 font-medium cursor-pointer"
              >
                Reset Demo
              </button>
            </div>
          </div>

          {/* Active Page Content */}
          <div className="p-4 sm:p-6 lg:p-8 max-w-[1440px] w-full mx-auto">
            {renderActiveModule()}
          </div>

          {/* Clean Institutional Footer */}
          <footer className="bg-white border-t border-slate-200 px-4 sm:px-8 py-5 mt-8 text-xs text-slate-500">
            <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <strong className="text-slate-800">Dhaka WasteTrack</strong> — Municipal Waste
                Operations & Public Accountability · Team MacroMind (CPD Climate Week 2026)
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <span>“Reform First. Recover Value. Use WtE Only When Viable.”</span>
                <span>·</span>
                <button
                  onClick={() => setActiveModule('about')}
                  className="text-emerald-800 font-semibold hover:underline cursor-pointer"
                >
                  Data Disclaimer & Methodology
                </button>
              </div>
            </div>
          </footer>
        </main>
      </div>

      {/* Contextual Side Drawer & Sample Journey Modal */}
      <EntityDetailDrawer />
      <SampleJourneyModal />
    </div>
  );
};

export default function App() {
  return (
    <WasteTrackProvider>
      <MainWorkspace />
    </WasteTrackProvider>
  );
}
