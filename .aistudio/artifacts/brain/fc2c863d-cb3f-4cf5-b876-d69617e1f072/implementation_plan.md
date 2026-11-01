# Dhaka WasteTrack — Municipal Waste Operations & Public Accountability Platform

An interactive civic-technology dashboard prototype built for **Team MacroMind** (CPD Climate Week 2026 Climate Policy Case Competition) to demonstrate how Dhaka and major cities in Bangladesh can link municipal waste collection routes, vehicles, transfer stations, weighbridges, recovery/treatment facilities, and disposal sites with public ward-level and contractor-level accountability.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural and UX choices incorporate your confirmed preferences and govern the prototype implementation:

- **Confirmed Decision 1 — Dual-Mode Operations Map**: Module 2 will feature a seamless toggle between an **Interactive SVG Schematic Network View** (clearly showing separated operational pathways for Organic, Recyclable, Hazardous, and Residual waste) and an **Interactive Geographic Map View** (using Leaflet with OpenStreetMap tiles, requiring zero paid API keys, with illustrative Dhaka demonstration coordinates). Both views share the same live filters, clickable markers, and 5-stage client-side route simulation controls (Play, Pause, Step Forward, Reset).
- **Confirmed Decision 2 — Interactive WtE 4-Gate Viability Simulator**: Module 8 will include an interactive checklist for the four Waste-to-Energy decision gates (Technical, Financial, Environmental & Social, Governance). Toggling any gate dynamically updates the policy outcome banner between *"All Required Gates Passed: Proceed to Relevant Approval & Investment Process"* and *"One or More Gates Not Passed: Defer Major WtE Expansion & Strengthen Material Recovery and Composting"*, reinforcing the core principle: **"Reform First. Recover Value. Use WtE Only When Viable."**
- **Confirmed Decision 3 — Guided Judge Walkthrough Presentation Mode**: Activating Presentation Mode collapses secondary chrome and reveals a sticky **Guided Judge Walkthrough Bar** with step-by-step highlights (Requirement C Digital Platform, Sample Batch Journey, Requirement D Ward & Contractor Accountability, WtE Decision Gates, and 2027–2036 Roadmap), alongside a one-click **"Run Sample Waste Journey"** and **"Reset Demo State"** control.

---

## 1. Overview & Core Concept

- **What It Does**: Provides a complete, transparent digital prototype that links municipal waste collection points, fleet vehicles, transfer stations, weighbridge records, Material Recovery Facilities (MRFs), organic composting/digestion plants, hazardous waste pathways, and residual disposal sites into a single chain-of-custody and public performance system.
- **Target Audience / Persona**: CPD Climate Policy Case Competition judges, municipal planners, environmental regulators, contractors, and citizens inspecting ward service performance on desktop or via a presentation QR code on mobile.
- **Key Value**: Makes Requirements C (Digital Platform) and D (Public Municipal Dashboard) tangible and verifiable. Demonstrates how traceable weighbridge and transfer records identify missed collections, unexplained weight discrepancies, and contractor performance gaps—while enforcing strict pre-conditions before considering Waste-to-Energy.
- **Synthetic Data Integrity**: Every screen, card, marker, and record is powered by a single coherent synthetic dataset and visibly labeled `DEMO ENVIRONMENT — ALL DATA IS ILLUSTRATIVE` so no synthetic figure is ever mistaken for live government telemetry or statutory targets.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Executive Overview & One-Click Sample Journey**: Judges land on the Overview Dashboard featuring 8 core KPIs (with formula tooltips and proposed target comparisons), interactive trend/composition/destination charts, and clickable service alerts. Clicking **"Run Sample Waste Journey"** launches an interactive step-by-step trace of batch `DEMO-BATCH-2026-001` from collection to weighbridge verification, recovery, and residual disposal.
2. **Operations Map & Route Simulation (Requirement C)**: Users filter routes, vehicles, and facilities by ward, waste stream, or operational status, click markers to inspect synthetic telemetry in a contextual side drawer, and run the 5-checkpoint vehicle simulation (`Play`, `Pause`, `Step Forward`, `Reset`).
3. **Chain-of-Custody Batch Tracking**: Users search or filter 48 synthetic waste batches, inspect gross/tare/net weight calculations (`Net = Gross − Tare`, or `"Pending Verification"` where records are incomplete), and step through the interactive stage timeline.
4. **Public Ward & Contractor Accountability (Requirement D)**: Without logging in, citizens and evaluators filter performance across 8 demonstration wards and 4 synthetic contractors (`DEMO-CONT-01` to `04`), inspect formula definitions, click any ward or contractor row to open a detailed scorecard drawer, and compare on-time collection vs. missed collections.
5. **Citizen Complaint Simulation**: Users inspect 20 synthetic complaints across 6 categories and submit a new synthetic complaint via a prototype form, immediately generating a `DEMO-COMP-XXX` record that updates all dashboard KPIs and ward tables in real time.

### Visual Identity & Theme
- **Aesthetic Direction**: Credible institutional civic-technology platform—clean, structured, data-dense, and authoritative without marketing fluff or decorative clutter.
- **Color Palette & Mood** (60-30-10 discipline):
  - **60% Neutral Canvas**: Crisp white (`#FFFFFF`) primary surfaces over cool light slate (`#F8FAFC`) workspace background.
  - **30% Institutional Structure**: Deep Navy (`#0F172A`) fixed left sidebar and institutional headers; Dark Forest Green (`#14532D`) primary brand identity; cool slate (`#E2E8F0`) 1px hairline borders.
  - **10% Semantic & Stream Accents** (always paired with explicit text labels and icons):
    - Emerald Green (`#059669`): Organic recovery, recycling, and on-schedule status.
    - Civic Blue (`#2563EB`): Transportation, weighbridge telemetry, and recyclable streams.
    - Amber (`#D97706`): Delayed routes, capacity warnings, and pending verifications.
    - Crimson Red (`#DC2626`): Missed collections, critical alerts, and separate hazardous waste pathways.
- **Typography & Hierarchy**:
  - **Display & Headings**: `Plus Jakarta Sans` (SemiBold/Bold, tight tracking) for institutional titles and section headers.
  - **Body & UI Controls**: `Public Sans` (Regular/Medium) for crisp legibility in dense civic tables, filters, and policy explanations.
  - **Data & Telemetry**: `JetBrains Mono` (`tabular-nums`) for all batch IDs (`DEMO-BATCH-2026-001`), vehicle codes (`DEMO-TRK-012`), weights (kg/tonnes), percentages, and timestamps.
- **Component Styling & Spatial Math**:
  - Desktop workspace designed for 1440px viewports with a 260px fixed sidebar (`<aside>`), a structured top header bar, and a fluid main canvas.
  - Single-elevation cards (`border border-slate-200 bg-white rounded-xl p-5`) with zero nested card boxes and compact `38px–44px` table rows.
  - Responsive mobile drawer navigation, touch-friendly controls ($\ge 44\text{px}$), and horizontal table scroll containers for QR-code mobile visitors.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Dual-Mode Map (SVG Schematic + Leaflet Tile Map)**
  - *Chosen Approach*: Provide both an engineered interactive SVG schematic network diagram and a Leaflet map view of Dhaka with an instant view switcher.
  - *Why*: Competition judges evaluating Requirement C need to clearly see the logical separation of waste streams (especially keeping Hazardous Waste out of ordinary municipal and composting flows) as well as geographic ward routing in Dhaka, without relying on paid map API keys or risking network tile blocks during a live presentation.
- **Decision 2: Unified Reactive Client Store with Deterministic Reset**
  - *Chosen Approach*: Centralize all 8 wards, 4 contractors, 12 vehicles, 5 routes, 9 facilities/weighbridges, 48 waste batches, 36 collection tasks, and 20 complaints in a single TypeScript reactive state context with `localStorage` persistence and a 1-click **"Reset Demo State"** button.
  - *Why*: Ensures 100% cross-module consistency—submitting a synthetic complaint or advancing a route simulation immediately updates KPIs, ward tables, and alerts, while allowing presenters to reset the application to a clean baseline for the next judge in one click.
- **Decision 3: Transparent Missing-Data & Formula Governance**
  - *Chosen Approach*: Explicitly include batches with missing tare weights or unconfirmed facility arrivals in the synthetic dataset, rendering `"Pending Verification"` or `"Insufficient Data"` rather than fabricating numbers.
  - *Why*: Directly fulfills the prompt's operational integrity rules and demonstrates how the platform surfaces reporting gaps and weighbridge anomalies objectively without making unverified accusations of fraud.

---

## 4. Technical Architecture & Data Strategy

### Architecture & Component Diagram

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│                   Dhaka WasteTrack — Central Data & Simulation Store                 │
│  • Coherent Synthetic Dataset (8 Wards, 4 Contractors, 12 Vehicles, 5 Routes,        │
│    9 Facilities/Weighbridges, 48 Batches, 36 Collection Tasks, 20 Complaints)        │
│  • Global Filter State (Ward, Contractor, Date Range, Waste Category, Status)        │
│  • Interactive Simulators (Route Checkpoint Engine, Sample Batch Journey, WtE Gates) │
└──────────────────────────────────────────┬───────────────────────────────────────────┘
                                           │
        ┌──────────────────────────────────┼──────────────────────────────────┐
        ▼                                  ▼                                  ▼
┌───────────────────────────┐  ┌───────────────────────────┐  ┌───────────────────────────┐
│  App Shell & Navigation   │  │   Contextual Drawers &    │  │  Presentation & Judge UX  │
│  • 11-Module Sidebar      │  │   Modals                  │  │  • Guided Walkthrough Bar │
│  • Top Header + Demo Tag  │  │  • Vehicle / Facility     │  │  • "Run Sample Journey"   │
│  • Global Search & Reset  │  │    Inspector Drawer       │  │    Modal / Stepper        │
│  • Mobile Drawer Nav      │  │  • Ward / Contractor      │  │  • KPI Formula & Target   │
│                           │  │    Scorecard Drawer       │  │    Definition Popovers    │
└─────────────┬─────────────┘  └─────────────┬─────────────┘  └─────────────┬─────────────┘
              │                              │                              │
              └──────────────────────────────┼──────────────────────────────┘
                                             ▼
┌──────────────────────────────────────────────────────────────────────────────────────┐
│                           11 Interactive Application Modules                         │
├───────────────────────────┬──────────────────────────────┬───────────────────────────┤
│ 1. Overview Dashboard     │ 5. Facilities & Weighbridges │ 9. Waste Recovery & WtE   │
│    (8 KPIs, 3 Charts,     │    (6 Facility Tabs, Weight  │    (Stream Flows + 4-Gate │
│    Clickable Alerts)      │    Ledger, Integrity Alerts) │    Interactive Simulator) │
├───────────────────────────┼──────────────────────────────┼───────────────────────────┤
│ 2. Operations Map         │ 6. Ward Performance          │ 10. Roadmap & Policy      │
│    (Dual SVG Schematic +  │    (Public Filters, 8-Ward   │     (2027–2036 Phases +   │
│    Leaflet + Route Sim)   │    Table, 5 Recharts Views)  │     EPR / Circularity)    │
├───────────────────────────┼──────────────────────────────┼───────────────────────────┤
│ 3. Waste Tracking         │ 7. Contractor Performance    │ 11. About This Prototype  │
│    (Batch Search, Gross/  │    (DEMO-CONT-01..04 Table,  │     (MacroMind Context,   │
│    Tare/Net, Timeline)    │    SLA & Completeness Audit) │     Disclaimer, Evidence) │
├───────────────────────────┼──────────────────────────────┴───────────────────────────┤
│ 4. Collection Vehicles    │ 8. Complaints & Service Accountability                   │
│    (12-Vehicle Table,     │    (20-Complaint Ledger, Detail Drawer, Live Synthetic   │
│    Stop Progress, Map Link│    Complaint Submission Form, 72h Proposed Target Metric)│
└───────────────────────────┴──────────────────────────────────────────────────────────┘
```

### Data Model & Entities
- **Wards (`WARD-DEMO-01` to `08`)**: Illustrative Dhaka zones with scheduled tasks, completed/missed counts, source segregation rates, and assigned contractors (`DEMO-CONT-01` to `04`).
- **Vehicles (`DEMO-TRK-001` to `012`) & Routes (`ROUTE-DEMO-01` to `05`)**: Linked to specific wards, contractors, waste streams (`Organic`, `Recyclable`, `Residual`, `Hazardous`), checkpoint arrays, and simulated coordinate waypoints.
- **Facilities (`DEMO-FACILITY-01` to `09`) & Weighbridges (`DEMO-WS-01`, `02`)**: Categorized across Transfer Stations, Weighbridges, MRFs, Organic Treatment, Residual Disposal, and Conditional WtE (`DEMO-WTE-01`), tracking daily receiving capacity, current intake, and operational status.
- **Waste Batches (`DEMO-BATCH-2026-001` to `048`)**: Full chain-of-custody records containing Gross Weight, Tare Weight, computed Net Weight (or `Pending Verification`), recovered output, residual output, and a 5-stage timestamped custody log.
- **Complaints (`DEMO-COMP-001` to `020`)**: Linked to wards, routes, and contractors, supporting live creation of new synthetic complaints during judge testing.

### Interactive Component & State Mapping
- **Cross-Module Deep Linking**: Clicking `"View on Map"` on any vehicle card switches to Module 2 (Operations Map), centers the vehicle, and opens its telemetry drawer. Clicking any service alert on the Overview Dashboard navigates directly to the affected batch, facility, or complaint.
- **Live Filter Synchronization**: Changing ward, contractor, date range, or waste stream filters dynamically recalculates KPI cards, Recharts visualizations, and table rows—and gracefully displays `"Insufficient Data"` when a filtered subset lacks required denominator records.
