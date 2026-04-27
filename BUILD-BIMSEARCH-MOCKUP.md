# BUILD-BIMSEARCH-MOCKUP.md — Visual Prototype with Real Data

> **What:** A mockup of the BIMSEARCH Command Center inside the existing project
> **Why:** Show Jorge tomorrow what the operational tool WILL look like
> **Data:** Real 33 opportunities + 603 contacts from the pipeline
> **How:** New route `/command-center` in the existing Vite+React app

---

## What gets built

- `/` → Existing review site (unchanged)
- `/command-center` → BIMSEARCH mockup with 5 views:
  1. **Dashboard** — KPI cards + hot opportunities table
  2. **Pipeline** — Full Kanban with all 33 opportunities
  3. **Portals** — Portal health grid
  4. **Contacts** — Searchable contact directory (603 contacts)
  5. **Documents** — Search placeholder

All using the REAL data from the CSVs. Static JSON — no backend needed.

---

## Terminal Setup

Open 5 Claude Code terminals in: `C:\Infratek\repos\jarvismidtermthreejs`

```
STEP 1:  Paste Prompt 1 into T1. Wait for it to finish.
STEP 2:  Paste Prompts 2, 3, 4, 5 into T2, T3, T4, T5 simultaneously.
STEP 3:  Done. Test at localhost:5173/command-center
```

---

## PROMPT 1 — paste into T1

> Foundation: routing, layout, data files. Must finish first.

```
Read CLAUDE.md. You are T1 — BIMSEARCH Mockup Foundation.

We're adding a BIMSEARCH Command Center mockup to this project as a new route.
The existing review site at "/" stays untouched.

STEP 1: Install react-router-dom

Run: npm install react-router-dom

STEP 2: Create src/bimsearch/data/opportunities.js

This file contains ALL 33 real opportunities from the PDBM pipeline.
Export as: export const OPPORTUNITIES = [...]

Each opportunity object:
{ id, name, owner, tier, status, interest, mentions, estimatedValue, portal, stage }

Map status to Kanban stages:
  "qualified" → "Qualified"
  "active/research" → "Radar"
  "mentioned" → "Radar"
  "monitoring" → "Monitoring"

Here is the REAL data — paste this EXACTLY:

export const OPPORTUNITIES = [
  { id: 'opp-01', name: 'E25AV04', owner: 'Miami-Dade Aviation / MIA', tier: 2, status: 'active/research', interest: 5, mentions: 172, estimatedValue: null, portal: 'MIA', stage: 'Radar', description: 'MIA Surveying RFP — Stoner & Associates teaming target. Top mentions in pipeline.' },
  { id: 'opp-02', name: 'E25AV03', owner: 'Miami-Dade Aviation / MIA', tier: 1, status: 'active/research', interest: 5, mentions: 106, estimatedValue: null, portal: 'MIA', stage: 'Radar', description: 'Miami-Dade Aviation solicitation. Tier 1 high interest. Active research.' },
  { id: 'opp-03', name: 'PNC2130378P1', owner: 'Broward / FLL', tier: 1, status: 'mentioned', interest: 5, mentions: 53, estimatedValue: null, portal: 'FLL', stage: 'Radar', description: 'Fort Lauderdale-Hollywood airport procurement.' },
  { id: 'opp-04', name: 'LEAP', owner: 'PANYNJ', tier: 3, status: 'active/research', interest: 5, mentions: 51, estimatedValue: null, portal: 'PANYNJ', stage: 'Radar', description: 'Port Authority NY/NJ program. Active research.' },
  { id: 'opp-05', name: 'USACE Caribbean', owner: 'USACE / Caribbean District', tier: 1, status: 'mentioned', interest: 5, mentions: 39, estimatedValue: 4000000000, portal: 'SAM.gov', stage: 'Radar', description: 'Fantastic Four PR infrastructure. ~$4B pipeline.' },
  { id: 'opp-06', name: 'MIA Parking Garage 6', owner: 'Miami-Dade Aviation / MIA', tier: 1, status: 'mentioned', interest: 5, mentions: 37, estimatedValue: null, portal: 'MIA', stage: 'Radar', description: 'Airport parking structure project.' },
  { id: 'opp-07', name: 'Dallas Love Field', owner: 'Dallas Aviation / DFW', tier: 1, status: 'active/research', interest: 5, mentions: 36, estimatedValue: null, portal: 'DFW', stage: 'Radar', description: 'Dallas Love Field airport modernization.' },
  { id: 'opp-08', name: 'E25AV05', owner: 'Miami-Dade Aviation / MIA', tier: 1, status: 'mentioned', interest: 5, mentions: 28, estimatedValue: null, portal: 'MIA', stage: 'Radar', description: 'Additional MIA aviation solicitation.' },
  { id: 'opp-09', name: 'CIZ26-AVI-3220', owner: 'Dallas Aviation / DFW', tier: 1, status: 'active/research', interest: 5, mentions: 26, estimatedValue: null, portal: 'DFW', stage: 'Radar', description: 'Dallas/Fort Worth aviation infrastructure.' },
  { id: 'opp-10', name: 'ORDNext', owner: 'PANYNJ', tier: 1, status: 'mentioned', interest: 5, mentions: 25, estimatedValue: null, portal: 'PANYNJ', stage: 'Radar', description: 'O\'Hare airport next-gen terminal program.' },
  { id: 'opp-11', name: 'CTP', owner: 'Dallas Aviation / DFW', tier: 1, status: 'active/research', interest: 5, mentions: 22, estimatedValue: null, portal: 'DFW', stage: 'Radar', description: 'Dallas Comprehensive Terminal Program.' },
  { id: 'opp-12', name: '26-422-RFSQ', owner: 'GOAA / MCO', tier: 1, status: 'active/research', interest: 5, mentions: 21, estimatedValue: null, portal: 'MCO', stage: 'Radar', description: 'Orlando GOAA procurement — BIM services.' },
  { id: 'opp-13', name: 'MIA Gate D60', owner: 'Miami-Dade Aviation / MIA', tier: 1, status: 'mentioned', interest: 5, mentions: 5, estimatedValue: null, portal: 'MIA', stage: 'Radar', description: 'MIA terminal gate renovation.' },
  { id: 'opp-14', name: 'PNC2130780P1', owner: 'Broward / FLL', tier: 1, status: 'mentioned', interest: 4, mentions: 25, estimatedValue: null, portal: 'FLL', stage: 'Radar', description: 'Broward County FLL additional procurement.' },
  { id: 'opp-15', name: 'Río Puerto Nuevo', owner: 'USACE / Caribbean District', tier: 2, status: 'monitoring', interest: 4, mentions: 21, estimatedValue: null, portal: 'SAM.gov', stage: 'Monitoring', description: 'PR flood control infrastructure — USACE.' },
  { id: 'opp-16', name: 'Río de la Plata', owner: 'USACE / Caribbean District', tier: 2, status: 'monitoring', interest: 4, mentions: 18, estimatedValue: null, portal: 'SAM.gov', stage: 'Monitoring', description: 'PR river infrastructure — USACE.' },
  { id: 'opp-17', name: '2026-Q2-AVI-20682', owner: 'CLT Airport', tier: 1, status: 'mentioned', interest: 4, mentions: 17, estimatedValue: null, portal: 'CLT', stage: 'Radar', description: 'Charlotte Douglas airport BIM project.' },
  { id: 'opp-18', name: 'AUS Journey With AUS', owner: 'Austin-Bergstrom / AUS', tier: 1, status: 'mentioned', interest: 4, mentions: 12, estimatedValue: null, portal: 'AUS', stage: 'Radar', description: 'Austin airport Journey expansion program.' },
  { id: 'opp-19', name: 'Camp Santiago JTC', owner: 'USACE / Caribbean District', tier: 1, status: 'monitoring', interest: 4, mentions: 12, estimatedValue: null, portal: 'SAM.gov', stage: 'Monitoring', description: 'Military joint training center — PR.' },
  { id: 'opp-20', name: 'Concourse K', owner: 'Unknown / research required', tier: 3, status: 'mentioned', interest: 4, mentions: 10, estimatedValue: null, portal: 'Research', stage: 'Radar', description: 'Airport concourse project — research needed.' },
  { id: 'opp-21', name: '2026-Q2-AVI-19688', owner: 'CLT Airport', tier: 1, status: 'monitoring', interest: 4, mentions: 7, estimatedValue: null, portal: 'CLT', stage: 'Monitoring', description: 'Charlotte airport second procurement.' },
  { id: 'opp-22', name: 'CIZ26-AVI-3227', owner: 'Dallas Aviation / DFW', tier: 1, status: 'active/research', interest: 4, mentions: 7, estimatedValue: null, portal: 'DFW', stage: 'Radar', description: 'Dallas aviation infrastructure package.' },
  { id: 'opp-23', name: 'MDAD E25AV05', owner: 'Miami-Dade Aviation / MIA', tier: 1, status: 'mentioned', interest: 4, mentions: 6, estimatedValue: null, portal: 'MIA', stage: 'Radar', description: 'MDAD additional solicitation.' },
  { id: 'opp-24', name: 'Memphis BHS', owner: 'Unknown / research required', tier: 1, status: 'mentioned', interest: 4, mentions: 6, estimatedValue: null, portal: 'Research', stage: 'Radar', description: 'Memphis baggage handling system.' },
  { id: 'opp-25', name: 'Broward/FLL PNC2130378P1', owner: 'Broward / FLL', tier: 1, status: 'active/research', interest: 4, mentions: 4, estimatedValue: null, portal: 'FLL', stage: 'Radar', description: 'Broward/FLL active research variant.' },
  { id: 'opp-26', name: 'MIA E25AV03', owner: 'Miami-Dade Aviation / MIA', tier: 1, status: 'monitoring', interest: 4, mentions: 4, estimatedValue: null, portal: 'MIA', stage: 'Monitoring', description: 'MIA E25AV03 monitoring variant.' },
  { id: 'opp-27', name: 'Aspen/Pitkin Terminal', owner: 'Unknown / research required', tier: 1, status: 'monitoring', interest: 4, mentions: 3, estimatedValue: null, portal: 'Research', stage: 'Monitoring', description: 'Aspen terminal modernization project.' },
  { id: 'opp-28', name: 'CLT 2026-Q2-AVI-20682', owner: 'CLT Airport', tier: 1, status: 'active/research', interest: 4, mentions: 3, estimatedValue: null, portal: 'CLT', stage: 'Radar', description: 'Charlotte airport active research.' },
  { id: 'opp-29', name: 'GOAA/MCO 26-422-RFSQ', owner: 'GOAA / MCO', tier: 1, status: 'monitoring', interest: 4, mentions: 3, estimatedValue: null, portal: 'MCO', stage: 'Monitoring', description: 'Orlando MCO procurement monitoring.' },
  { id: 'opp-30', name: 'PANYNJ JFK Redevelopment', owner: 'PANYNJ', tier: 1, status: 'active/research', interest: 4, mentions: 3, estimatedValue: null, portal: 'PANYNJ', stage: 'Radar', description: 'JFK airport redevelopment program.' },
  { id: 'opp-31', name: 'Dallas CIZ26-AVI-3220', owner: 'Dallas Aviation / DFW', tier: 1, status: 'active/research', interest: 5, mentions: 4, estimatedValue: null, portal: 'DFW', stage: 'Radar', description: 'Dallas aviation variant.' },
  { id: 'opp-32', name: 'Callao Naval Base', owner: 'Peru / International', tier: 1, status: 'research', interest: 5, mentions: 0, estimatedValue: 2500000000, portal: 'Research', stage: 'Radar', description: '$2.5B naval base project in Peru.' },
  { id: 'opp-33', name: 'Test Miami Airport Terminal BIM RFP', owner: 'Jarvis (test)', tier: 1, status: 'qualified', interest: 3, mentions: 1, estimatedValue: 500000000, portal: 'MIA', stage: 'Qualified', description: 'System test opportunity — $500M BIM RFP.' },
];

export const PIPELINE_STAGES = ['Radar', 'Monitoring', 'Qualified', 'Jorge Review', 'Contact', 'Proposal', 'Won'];

export const KPI_SNAPSHOT = {
  totalOpportunities: 33,
  activeResearch: 12,
  monitoring: 8,
  qualified: 1,
  tier1Count: 27,
  tier2Count: 3,
  tier3Count: 3,
  topPortal: 'MIA',
  topPortalCount: 9,
  pipelineValue: 7000000000,
  contactsFound: 603,
  sourceFiles: 312,
  portalsActive: 12,
  lastScan: '2026-04-26',
};

STEP 3: Create src/bimsearch/data/contacts.js

Export the top 30 REAL contacts as clean data. Only include contacts with
real names, real emails, real titles. Here is the curated list:

export const CONTACTS = [
  { name: 'Jorge Quiroz', title: 'CEO', company: 'PDBM Consulting', email: 'jorge.quiroz@pdbmconsulting.com', mentions: 239, tier: 'internal' },
  { name: 'Julio Salazar', title: 'Staff Engineer', company: 'PDBM Consulting', email: 'julio.salazar@pdbmconsulting.com', mentions: 57, tier: 'internal' },
  { name: 'Shamy Perea', title: 'Associate', company: 'PDBM Consulting', email: 'shamy.perea@pdbmconsulting.com', mentions: 25, tier: 'internal' },
  { name: 'Sergio', title: 'System Operator', company: 'INFRATEK AI', email: 'sergio@infratek.ai', mentions: 66, tier: 'internal' },
  { name: 'Rebecca Moore', title: 'Procurement', company: 'Miami-Dade Aviation / MDAD', email: 'remoore@flymia.com', mentions: 55, tier: 'agency' },
  { name: 'Franklin Gutierrez', title: 'Strategic Procurement', company: 'Miami-Dade / MDAD', email: 'franklin.gutierrez@miamidade.gov', mentions: 35, tier: 'agency' },
  { name: 'Kerry Gray-Brown', title: 'Sr. Procurement Agent, Capital Programs', company: 'GOAA / MCO', email: 'kerry.gray-brown@goaa.org', mentions: 30, tier: 'agency' },
  { name: 'Hugh Greechan Jr.', title: 'County Official', company: 'Westchester County', email: 'greechan@westchestercountyny.gov', mentions: 29, tier: 'agency' },
  { name: 'James D. Stoner', title: 'P.S.M., President', company: 'Stoner & Associates', email: 'jstoner@stonersurveyors.com', mentions: 27, tier: 'teaming' },
  { name: 'COL Charles L. Decker', title: 'PE, PMP, District Commander', company: 'USACE Caribbean', email: 'cesaa-cco@usace.army.mil', mentions: 26, tier: 'agency' },
  { name: 'Jose O. Vazquez-Torres', title: 'Contracting Officer', company: 'USACE Caribbean', email: 'jose.o.vazquez-torres@usace.army.mil', mentions: 24, tier: 'agency' },
  { name: 'Robert Borges', title: 'P.S.M., Sr. Crew Chief Aviation', company: 'Stoner & Associates', email: 'bborges@stonersurveyors.com', mentions: 22, tier: 'teaming' },
  { name: 'Juan A. Suarez Jr.', title: 'P.S.M., Founder & Principal', company: 'Suarez Surveying & Mapping', email: 'suarezsurveying@gmail.com', mentions: 17, tier: 'teaming' },
  { name: 'Masha Drozdov', title: 'AIA, NCARB, Director of Design', company: 'ARORA Engineers', email: 'drozdovmasha@gmail.com', mentions: 27, tier: 'teaming' },
  { name: 'Frank Paruas', title: 'PSM, Miami Survey Manager', company: 'GPI Geospatial', email: 'frank.paruas@gpinet.com', mentions: 16, tier: 'teaming' },
  { name: 'Stephanie Kopelousos', title: 'Board Chair', company: 'GOAA / MCO', email: 'stephanie.kopelousos@goaa.org', mentions: 16, tier: 'agency' },
  { name: 'Gustavo Alfonso', title: 'AIA, Architect', company: 'Gresham Smith', email: 'gustavo.alfonso@greshamsmith.com', mentions: 14, tier: 'teaming' },
  { name: 'Monika Radkowska', title: 'Procurement', company: 'PANYNJ', email: 'mradkowska@panynj.gov', mentions: 12, tier: 'agency' },
  { name: 'Walter De La Rocha', title: 'P.S.M., Sr. Land Surveyor', company: 'Stoner & Associates', email: 'wdelarocha@stonersurveyors.com', mentions: 13, tier: 'teaming' },
  { name: 'Jane Decker', title: 'Procurement', company: 'City of Doral, FL', email: 'jane.decker@cityofdoral.com', mentions: 34, tier: 'agency' },
  { name: 'Mariano Torres-Feliciano', title: 'Task Force Contact', company: 'USACE Caribbean', email: 'taskforcevipr-sb@usace.army.mil', mentions: 55, tier: 'agency' },
  { name: 'Debi', title: 'Backend / BIM Search API', company: 'INFRATEK AI', email: 'debi@infratek.ai', mentions: 18, tier: 'internal' },
  { name: 'Dani', title: 'AI Engineering', company: 'INFRATEK AI', email: 'dani@infratek.ai', mentions: 18, tier: 'internal' },
  { name: 'Joel Diaz', title: 'Scheduler Manager', company: 'Lima Airport', email: 'jdiazs@lima-airport.com', mentions: 16, tier: 'teaming' },
  { name: 'Jason Gunn', title: 'Architect', company: 'Gresham Smith', email: 'jason.gunn@greshamsmith.com', mentions: 21, tier: 'teaming' },
  { name: 'Wilson Rayfield', title: 'Architect', company: 'Gresham Smith', email: 'wilson.rayfield@greshamsmith.com', mentions: 20, tier: 'teaming' },
];

STEP 4: Create src/bimsearch/layout/CommandCenterLayout.jsx

A sidebar layout for the command center. Default export.

- Left sidebar: 220px wide, background var(--bg-secondary)
  - Logo: "BIMSEARCH" in JetBrains Mono, fontSize 14, letterSpacing 3
  - Below: "Command Center" in fontSize 10, color var(--text-tertiary)
  - Navigation links (use react-router-dom NavLink):
    - Dashboard (icon: ▣)
    - Pipeline (icon: ⬡)
    - Portals (icon: ◈)
    - Contacts (icon: ◉)
    - Documents (icon: ▤) — grayed out "Coming Soon"
  - Bottom of sidebar: "← Back to Review" link that goes to "/"
  - Active link: background var(--border-subtle), color var(--cyan-400)
  - Inactive: color var(--text-secondary)

- Main content area: flex-grow, padding 32px, overflow-y auto
  - Render <Outlet /> from react-router-dom

Import the ThemeToggle component and render it top-right of the content area.

STEP 5: Update src/App.jsx

Wrap the existing app with React Router:

import { BrowserRouter, Routes, Route } from 'react-router-dom';

The existing return goes inside <Route path="/" element={<ExistingApp />} />

Add a new route:
<Route path="/command-center" element={<CommandCenterLayout />}>
  <Route index element={<DashboardPage />} />
  <Route path="pipeline" element={<PipelinePage />} />
  <Route path="portals" element={<PortalsPage />} />
  <Route path="contacts" element={<ContactsPage />} />
</Route>

Move the existing app content into a new component ExistingApp.
Import placeholder page components (they'll be built by T2-T5):

For now, create minimal placeholder pages in src/bimsearch/pages/:
  DashboardPage.jsx → export default () => <div>Dashboard loading...</div>
  PipelinePage.jsx → export default () => <div>Pipeline loading...</div>
  PortalsPage.jsx → export default () => <div>Portals loading...</div>
  ContactsPage.jsx → export default () => <div>Contacts loading...</div>

STEP 6: Update vercel.json for SPA routing

{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
(Should already be this — verify.)

STEP 7: Test

Run npm run dev. Visit localhost:5173/command-center
Verify: sidebar renders, navigation works, clicking "Back to Review" goes to /.
Verify: existing review site at "/" is completely unchanged.

When done, report: "Router wired. Layout built. Data files created. T2-T5 can start."
```

---

## PROMPT 2 — paste into T2

> Dashboard page + KPI cards + Hot Opportunities table.

```
Read CLAUDE.md. You are T2 — Dashboard Page.

Create src/bimsearch/pages/DashboardPage.jsx — the BIMSEARCH home screen.

Import the data:
  import { OPPORTUNITIES, KPI_SNAPSHOT } from '../data/opportunities';

SECTION 1: KPI Cards Row

Display 8 KPI cards in a responsive grid (4 columns desktop, 2 mobile):

Each card: glass-card class, padding 20px, text-align center.
  - Big number: Syne font, 32px, bold, color var(--cyan-400)
  - Label: JetBrains Mono, 9px, uppercase, letterSpacing 2px, var(--text-tertiary)

Cards:
  1. KPI_SNAPSHOT.totalOpportunities → "OPPORTUNITIES"
  2. KPI_SNAPSHOT.activeResearch → "ACTIVE RESEARCH"
  3. KPI_SNAPSHOT.qualified → "QUALIFIED"
  4. KPI_SNAPSHOT.tier1Count → "TIER 1"
  5. KPI_SNAPSHOT.portalsActive → "PORTALS"
  6. KPI_SNAPSHOT.contactsFound → "CONTACTS"
  7. KPI_SNAPSHOT.sourceFiles → "SOURCE FILES"
  8. Format KPI_SNAPSHOT.pipelineValue as "$7B+" → "PIPELINE VALUE"

SECTION 2: Hot Opportunities Table

Title: "Hot Opportunities — Interest 5, Active Research"

Filter: OPPORTUNITIES.filter(o => o.interest === 5 && o.status === 'active/research')
Sort by mentions descending.

Render as a table with columns:
  RANK | NAME | OWNER | TIER | MENTIONS | PORTAL | STAGE

Table styling:
  - No visible table borders
  - Header row: JetBrains Mono, 9px, uppercase, letterSpacing 2px, var(--text-muted)
  - Data rows: fontSize 13px, padding 12px 16px
  - Alternating row backgrounds: transparent / var(--bg-glass) at 0.3 opacity
  - Tier column: colored badge (T1=cyan, T2=amber, T3=purple)
  - Mentions column: bar chart inline (width proportional to max mentions)
  - Hover row: background var(--border-subtle), transition 0.2s

SECTION 3: Pipeline Summary Bar

A horizontal bar showing opportunity count per stage:
  Radar: X | Monitoring: X | Qualified: X | Jorge Review: 0 | Contact: 0 | Proposal: 0

Each segment as a colored block proportional to count.
  Radar: var(--text-tertiary)
  Monitoring: var(--amber-400)
  Qualified: var(--cyan-400)
  Other stages: var(--border-subtle) with dashed border

SECTION 4: Quick Stats

Below the bar, show:
  - "Top Portal: MIA (9 opportunities)"
  - "Last Scan: April 26, 2026"
  - "Next Action: Monday 6AM supervised scan"

Style: JetBrains Mono, fontSize 11, color var(--text-tertiary)

When done, report: "Dashboard page complete with KPIs + hot table + pipeline bar."
```

---

## PROMPT 3 — paste into T3

> Pipeline Kanban with all 33 opportunities.

```
Read CLAUDE.md. You are T3 — Pipeline Kanban Page.

Create src/bimsearch/pages/PipelinePage.jsx — the full Kanban board.

Import: import { OPPORTUNITIES, PIPELINE_STAGES } from '../data/opportunities';

HEADER:
  Title: "Pipeline Kanban" in Syne bold
  Subtitle: "33 opportunities across 7 stages" in JetBrains Mono
  Filter bar: buttons for "All", "Tier 1", "Tier 2", "Tier 3", "Interest 5"
    Active filter: background var(--cyan-400), color dark
    Inactive: glass-card style, border only
    onClick: filter opportunities by criteria (use React useState)

KANBAN BOARD:
  Display: flex, horizontal scroll, gap 16px
  Each stage is a column, min-width 260px, flex-shrink 0

  Column header:
    Stage name: Syne 14px bold
    Count badge: circle, 24px, JetBrains Mono, background var(--cyan-400) at 10%
    Separator line: 1px solid var(--border-subtle)

  Opportunity cards inside each column:
    glass-card class, padding 14px, marginBottom 10px
    
    Card content:
      - Top row: Tier badge (T1/T2/T3 with color) + Interest dots (●●●●● filled based on interest)
      - Title: Syne 13px semibold, color var(--text-primary)
      - Owner: fontSize 11, var(--text-secondary)
      - Portal badge: JetBrains Mono 9px, pill shape, border var(--border-medium)
      - Mentions: small bar + number, JetBrains Mono 10px
      - If estimatedValue: big number in var(--cyan-400)
      - Description: fontSize 11, var(--text-tertiary), maxHeight 40px, overflow hidden

    Card hover: translateY(-2px), border-color var(--cyan-400) at 0.3

  Group OPPORTUNITIES by stage using:
    const grouped = {};
    PIPELINE_STAGES.forEach(s => { grouped[s] = []; });
    filteredOpps.forEach(o => {
      if (grouped[o.stage]) grouped[o.stage].push(o);
      else grouped['Radar'].push(o);
    });

  Sort cards within each column by mentions descending.

BOTTOM STATS:
  After the Kanban, show:
  "Showing X of 33 opportunities | Radar: X | Monitoring: X | Qualified: X"

When done, report: "Kanban page complete with all 33 opportunities + filters."
```

---

## PROMPT 4 — paste into T4

> Portal Health + placeholder pages.

```
Read CLAUDE.md. You are T4 — Portals Page.

Create src/bimsearch/pages/PortalsPage.jsx — portal health dashboard.

Import: import { PORTALS } from '../../data/portals';
(The portals data already exists at src/data/portals.js — reuse it.)
Also count opportunities per portal from OPPORTUNITIES data.

HEADER:
  Title: "Portal Health" in Syne bold
  Subtitle: "12 active procurement sources" in JetBrains Mono

PORTAL GRID:
  Display: grid, 2 columns desktop, 1 mobile, gap 16px

  Each portal card (glass-card class, padding 20px):
    - Portal name: Syne 16px bold
    - Tier badge: colored pill (T1 cyan, T2 amber, T3 purple)
    - Type badge: "federal" / "municipal" / "private" — JetBrains Mono pill
    - Scan frequency: "Weekly" / "Biweekly" — with clock icon
    - Scan method: "Browser" / "API" / "Manual" — with method icon
    - Status indicator: green dot + "Healthy" or amber dot + "Needs attention"
      (For now, all healthy)
    - Opportunity count: "X opportunities linked" from OPPORTUNITIES data
    - Notes: portal.notes in fontSize 11, var(--text-tertiary)
    - Last scan bar: a thin progress bar at bottom, filled var(--cyan-400)

  Sort portals: Tier 1 first, then by name.

SUMMARY ROW at bottom:
  "12 portals | 7 Tier 1 | 3 Tier 2 | 2 Tier 3 | Last scan: April 26, 2026"

When done, report: "Portals page complete with 12 portal health cards."
```

---

## PROMPT 5 — paste into T5

> Contacts directory page.

```
Read CLAUDE.md. You are T5 — Contacts Page.

Create src/bimsearch/pages/ContactsPage.jsx — searchable contact directory.

Import: import { CONTACTS } from '../data/contacts';

HEADER:
  Title: "Contacts" in Syne bold
  Subtitle: "26 key contacts from 603 discovered" in JetBrains Mono

SEARCH BAR:
  An input field at the top, full width, styled:
    background var(--bg-glass), border 1px solid var(--border-medium)
    borderRadius 12px, padding 12px 20px
    placeholder: "Search contacts by name, company, email..."
    fontFamily JetBrains Mono, fontSize 13
    On focus: border-color var(--cyan-400)

  Use useState for searchQuery. Filter contacts:
    CONTACTS.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.company.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.title.toLowerCase().includes(q)
    )

FILTER TABS:
  "All" | "Internal" | "Agency" | "Teaming"
  Filter by contact.tier field.

CONTACT CARDS:
  Display: grid, 3 columns desktop, 2 tablet, 1 mobile, gap 14px

  Each contact card (glass-card class, padding 18px):
    - Avatar placeholder: circle 40px, background tier-color at 15%, letter initial
      Internal: var(--cyan-400), Agency: var(--amber-400), Teaming: var(--purple-400)
    - Name: Syne 14px semibold, var(--text-primary)
    - Title: fontSize 12, var(--text-secondary), maxLines 2
    - Company: fontSize 12, var(--text-tertiary)
    - Email: JetBrains Mono 11px, var(--cyan-400), clickable mailto: link
    - Tier badge: "INTERNAL" / "AGENCY" / "TEAMING" — colored pill
    - Mentions: "X mentions" in JetBrains Mono 10px, var(--text-muted)

  Sort: by mentions descending.

STATS BAR:
  Below everything:
  "26 contacts shown | 4 internal | 10 agency | 12 teaming | from 603 total discovered"

When done, report: "Contacts page complete with search + filter + 26 cards."
```

---

## After All Terminals Finish

Test: visit `localhost:5173/command-center`

Verify:
- Sidebar navigation works between all 4 pages
- Dashboard shows 8 KPI cards + hot opportunities table
- Pipeline shows Kanban with all 33 opportunities in correct stages
- Portals shows 12 portal health cards
- Contacts shows 26 searchable contact cards
- "Back to Review" link goes to the main review site
- Theme toggle works in the command center too
- Design feels like an operational tool, not a presentation

Deploy:
```bash
npm run build
git add .
git commit -m "feat: BIMSEARCH Command Center mockup — 33 opportunities, 26 contacts, 12 portals"
git push origin main
```

---

## For Tomorrow's Meeting

Show Jorge:
1. The review site → scroll through to demonstrate Jarvis's 75-day output
2. Click the BIMSEARCH link (in Links section) or navigate to /command-center
3. Walk through Dashboard → Pipeline Kanban → Portals → Contacts
4. Explain: "This is a mockup. The production version connects to the Postgres database on your Mac Mini. Everything you see here is real data that Jarvis found."
