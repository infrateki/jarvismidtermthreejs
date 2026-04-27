# Claude Code Prompts — Orchestrated Build Guide

> **Project:** `C:\Infratek\repos\jarvismidtermthreejs`
> **Method:** COMMS.md + CLAUDE.md Multi-Terminal Orchestration (Boris Cherny pattern)
> **Terminals:** 5 (T1–T5)
> **Orchestrator:** This document + Claude Chat session
> **Time estimate:** ~60 minutes total

---

## Prerequisites

Before pasting any prompt:

1. All 5 terminals must be opened in the same project folder:
   `C:\Infratek\repos\jarvismidtermthreejs`

2. Verify these files exist in the project root:
   - `CLAUDE.md` (the constitution — every terminal reads this automatically)
   - `COMMS.md` (the coordination board — terminals read/write this)
   - `package.json` (dependencies listed)
   - `index.html` (fonts preloaded)

3. The `jarvis-pdbm-source/` folder contains pre-built source files ready to merge.

---

## Execution Order

```
Phase A: T1 alone           ← MUST finish before Phase B
         ↓ wait ~5 min
Phase B: T2 ──────┐
         T3 ──────┤         ← RUN IN PARALLEL (no file conflicts)
         T4 ──────┤
         T5 ──────┘
         ↓ wait for all 4
Phase C: T1 then T2          ← INTEGRATION then POLISH
```

---

## PHASE A — Foundation (T1 only)

> Run T1 first. Wait for it to report success before launching T2–T5.

### T1 — Prompt 1

```
Read COMMS.md and CLAUDE.md. You are T1 — Foundation owner.

Tasks A1 + A2 + A3: Merge source files, install dependencies, verify dev server.

There is a folder called jarvis-pdbm-source/ in the project root that contains
pre-built source files. Your job is to merge them into the main src/ directory
and get the dev server running cleanly.

### Deliverables

1. Copy these files from jarvis-pdbm-source/src/ into src/:
   - App.jsx → src/App.jsx (overwrite existing if any)
   - index.css → src/index.css (new file)
   - components/Reveal.jsx → src/components/Reveal.jsx
   - components/Counter.jsx → src/components/Counter.jsx
   - components/NavDots.jsx → src/components/NavDots.jsx
   - components/ChartTooltip.jsx → src/components/ChartTooltip.jsx
   - sections/HeroSection.jsx → src/sections/HeroSection.jsx
   - sections/KpiSection.jsx → src/sections/KpiSection.jsx
   - sections/VelocitySection.jsx → src/sections/VelocitySection.jsx
   - sections/SentimentSection.jsx → src/sections/SentimentSection.jsx
   - sections/TopicsSection.jsx → src/sections/TopicsSection.jsx
   - sections/EntitySection.jsx → src/sections/EntitySection.jsx
   - sections/TimelineSection.jsx → src/sections/TimelineSection.jsx
   - sections/ArcSection.jsx → src/sections/ArcSection.jsx
   - three/HeroScene.jsx → src/three/HeroScene.jsx

2. Run: npm install

3. Run: npm run dev

4. If there are import errors, fix them:
   - CSS import in App.jsx should be './index.css'
   - framer-motion: import { motion, useInView } from 'framer-motion'
   - @react-three/fiber: import { Canvas, useFrame } from '@react-three/fiber'
   - Verify every imported file actually exists

5. Keep fixing until the dev server compiles with zero errors.

### Constraints
- DO NOT modify files outside of: src/App.jsx, src/index.css, src/components/*, src/sections/*, src/three/*
- DO NOT touch src/data/* (owned by T2)
- DO NOT delete jarvis-pdbm-source/ folder

### When done
1. Verify npm run dev shows no errors
2. Update COMMS.md: mark tasks A1, A2, A3 as ✅ DONE with timestamp
3. Note any issues in COMMS.md BLOCKERS section
4. Report: "Phase A complete. Dev server running. T2-T5 can start."
```

---

## PHASE B — Parallel Build (T2 + T3 + T4 + T5)

> Start all 4 terminals simultaneously after T1 reports success.
> Each terminal owns different files — no conflicts possible.

---

### T2 — Prompt 2

```
Read COMMS.md and CLAUDE.md. You are T2 — Data Layer owner.

Tasks B1 + B2 + B3 + B4 + B5 + B6: Expand data layer from 8 files to 20+ files.

The source document has 17 chapters of data. Our src/data/ folder only has
8 basic files. You need to update 3 existing files and create 14 new ones.

Read the existing files in src/data/ to understand the export format. Every
file uses named exports (not default exports). Follow that pattern exactly.

### UPDATE EXISTING FILES

FILE: src/data/entities.js
Expand to 14 entities (was 8). Add:
  { name: 'Journey With AUS', mentions: 205, type: 'project' },
  { name: 'USACE Caribbean', mentions: 117, type: 'project' },
  { name: 'Julio', mentions: 110, type: 'person' },
  { name: 'E25AV05', mentions: 102, type: 'project' },
  { name: 'BIM Search', mentions: 83, type: 'project' },
  { name: 'Shami', mentions: 39, type: 'person' }

FILE: src/data/milestones.js
Expand to 11 milestones (was 9). Add description field to ALL milestones.
Insert these two in chronological position:
  { date: 'Apr 11', label: 'Shami Session', phase: 2, description: 'Team adoption begins' },
  { date: 'Apr 23', label: 'Julio Session', phase: 2, description: 'Technical onboarding' }
Add descriptions to existing:
  Trial Launch → "MEMORY.md: trial started with Jorge"
  Voice Rules → "Concise, one message, no process narration"
  BIM Search Tiers → "Official 3-tier scoring system"
  Convex + GHL → "Data layer documented"
  Chrome CDP → "Portal intelligence path"
  Graph Email → "Primary outbound email via jarvis@pdbmconsulting.com"
  Codex Migration → "Runtime migration starts"
  GPT-5.5 Primary → "OpenAI Codex primary; Anthropic fallback"
  Midterm Prep → "Meeting package generated"

FILE: src/data/verbs.js
Rename export to ACTION_VERBS if not already. Add:
  { verb: 'Summarize', weight: 1, fullMark: 10 },
  { verb: 'Schedule', weight: 1, fullMark: 10 },
  { verb: 'Analyze', weight: 1, fullMark: 10 }

### CREATE NEW FILES (14 files)

Each file below: create in src/data/, use named exports, no default export.

FILE: src/data/sentiment-daily.js → export const DAILY_SENTIMENT = [
  { date: '2026-04-01', productive: 17, neutral: 37, frustrated: 5, exploratory: 14 },
  { date: '2026-04-02', productive: 25, neutral: 46, frustrated: 25, exploratory: 27 },
  { date: '2026-04-03', productive: 47, neutral: 73, frustrated: 23, exploratory: 36 },
  { date: '2026-04-06', productive: 28, neutral: 119, frustrated: 27, exploratory: 32 },
  { date: '2026-04-10', productive: 13, neutral: 46, frustrated: 17, exploratory: 17 },
  { date: '2026-04-13', productive: 20, neutral: 38, frustrated: 15, exploratory: 8 },
  { date: '2026-04-17', productive: 31, neutral: 50, frustrated: 15, exploratory: 13 },
  { date: '2026-04-21', productive: 31, neutral: 78, frustrated: 49, exploratory: 23 },
  { date: '2026-04-22', productive: 58, neutral: 112, frustrated: 40, exploratory: 32 },
  { date: '2026-04-23', productive: 102, neutral: 205, frustrated: 81, exploratory: 67 },
  { date: '2026-04-24', productive: 11, neutral: 82, frustrated: 13, exploratory: 19 },
  { date: '2026-04-25', productive: 145, neutral: 560, frustrated: 195, exploratory: 178 },
  { date: '2026-04-26', productive: 38, neutral: 117, frustrated: 32, exploratory: 23 }
];

FILE: src/data/era-volume.js → export const ERA_VOLUME = [
  { date: '2026-02-15', anthropic: 4, openai: 0 },
  { date: '2026-02-17', anthropic: 50, openai: 0 },
  { date: '2026-03-13', anthropic: 86, openai: 0 },
  { date: '2026-03-30', anthropic: 93, openai: 0 },
  { date: '2026-04-06', anthropic: 206, openai: 0 },
  { date: '2026-04-23', anthropic: 455, openai: 0 },
  { date: '2026-04-24', anthropic: 117, openai: 8 },
  { date: '2026-04-25', anthropic: 0, openai: 1078 },
  { date: '2026-04-26', anthropic: 0, openai: 210 }
];

FILE: src/data/commercial.js →
  export const COMMERCIAL_TERMS = { implementationFee: 5000, monthlyRetainer: 450, termMonths: 12, commission: "Finder's fee per converted JARVIS-sourced project" };
  export const INVOICES = [
    { id: 'INF-2026-007', amount: 2500, date: '2026-02-24', description: 'First implementation deposit' },
    { id: 'INF-2026-008', amount: 2500, date: '2026-04-24', description: 'Second implementation payment' },
    { id: 'INF-2026-009', amount: 200, date: '2026-04-24', description: 'Jarvis API credit boost' }
  ];

FILE: src/data/tiers.js → export const TIERS = [
  { tier: 1, label: 'Airports & Federal', targets: 'Airports, federal agencies, capital programs', budgetThreshold: '$100M+', ranking: { high: '$1B+', medium: '$100M–$1B', low: '<$100M' } },
  { tier: 2, label: 'Municipalities', targets: 'Cities, towns, local agencies with BIM', budgetThreshold: '$10M+', ranking: { high: '$100M+', medium: '$10M–$100M', low: '<$10M' } },
  { tier: 3, label: 'Staff Augmentation', targets: 'Architects, engineers, contractors', budgetThreshold: 'N/A', ranking: { high: '5+ resources', medium: '2–4 resources', low: '1 resource' } }
];

FILE: src/data/pipeline.js →
  export const PIPELINE_STAGES = ['Radar', 'Qualified', 'Jorge Review', 'Contact', 'Proposal', 'Won', 'Lost'];
  export const AUTONOMY_KNOB = [
    { level: 0, mode: 'Manual', description: 'Everything requires Jorge approval' },
    { level: 3, mode: 'Conservative', description: 'Jarvis suggests; Jorge approves all outbound' },
    { level: 6, mode: 'Balanced', description: 'Jarvis drafts and queues; Jorge reviews batches' },
    { level: 9, mode: 'Autonomous', description: 'Jarvis executes routine; flags exceptions' },
    { level: 10, mode: 'Vacation', description: 'Full autonomy; Jorge informed of escalations only' }
  ];

FILE: src/data/portals.js → export const PORTALS (12 items, each with name, type, tier, scanMethod, scanFrequency, active, notes):
  Austin-Bergstrom (AUS), federal, 1, browser, weekly, true, "Journey With AUS expansion"
  Broward County (FLL), federal, 1, browser, weekly, true, "Fort Lauderdale airport"
  DFW Airport, federal, 1, browser, biweekly, true, "Dallas/Fort Worth procurement"
  Miami-Dade Aviation (MIA), federal, 1, browser, weekly, true, "Jorge primary target"
  Orlando Airport (MCO/GOAA), federal, 1, browser, weekly, true, "GOAA procurement portal"
  PANYNJ, federal, 1, browser, weekly, true, "Port Authority of NY/NJ"
  SAM.gov, federal, 1, api, weekly, true, "Primary federal portal"
  USACE Caribbean, federal, 1, api, weekly, true, "PR USACE Fantastic Four pilot"
  BidNet Direct, municipal, 2, browser, biweekly, true, "Municipal aggregator"
  EUNA / Bonfire, municipal, 2, browser, weekly, true, "Shami primary portal"
  OpenGov Procurement, municipal, 2, browser, biweekly, true, "Municipal procurement"
  LinkedIn / Web Research, private, 3, manual, biweekly, true, "Tier 3 staff aug"

FILE: src/data/risks.js → export const RISKS (8 items, each with risk, severity, mitigation):
  Hallucinated contacts, high, "Deterministic sources only. Label confidence. Human review."
  Outreach reputation, high, "Draft only. Humans review, edit, send."
  Cost / token spikes, medium, "Weekly scans. Deep research after qualification. Caps."
  Noise overload, medium, "Limit sources. Refine keywords. Tier scoring."
  Team silos, medium, "Central Command Center with owner/status per opp."
  Context contamination, medium, "Separate projects/agents. Memory compaction."
  Remote access fragility, medium, "Verify stack once. Document permissions."
  Privacy risk, medium, "Purpose-bound access. Separate PDBM environment."

FILE: src/data/sprint.js → export const SPRINT (7 items: day, title, description):
  1 Stabilize "Fix auth, email, remote access"
  2 Scope "Lock sources, keywords, taxonomy"
  3 Build "Command Center pipeline + fields"
  4 Pilot "PR USACE through full workflow"
  5 Train "Yami/Shami + Julio onboarding"
  6 Review "Show Jorge dashboard + pilot card"
  7 Operate "Start Mon 6 AM scan cadence"

FILE: src/data/roadmap.js → export const ROADMAP = {
  thirtyDay: [{ item: 'Reliability hardening', importance: 'high' }, { item: 'BIMSEARCH tracker MVP', importance: 'high' }, { item: 'Evidence model per claim', importance: 'high' }],
  sixtyDay: [{ item: 'Portal monitoring playbooks', importance: 'high' }, { item: 'Outbound approval queue', importance: 'medium' }, { item: 'Feedback labels', importance: 'medium' }],
  ninetyDay: [{ item: 'Team rollout permissions', importance: 'high' }, { item: 'Business-impact analytics', importance: 'high' }, { item: 'Model routing by task', importance: 'medium' }]
};

FILE: src/data/people.js → export const PEOPLE (5 items: name, role, org, description, device):
  Jorge Quiroz, CEO/Decision-maker, PDBM Consulting, "Clean dashboard, high-signal opps, low-friction review", iPad
  Julio Salazar, BIM PM/Operations Manager, PDBM Consulting, "Technical review, scope/resource/feasibility", TBD
  Shami/Yami, BD/Prequalification, PDBM Consulting, "Portal review, commodity codes, keyword filtering", TBD
  Sergio Villanueva-Meyer, Architect/Builder, INFRATEK LLC, "AI workflow builder, trainer, dashboard/automation", Desktop
  Jesus, Collaborator, INFRATEK LLC, "Voice interaction design, conversational flow", TBD

FILE: src/data/agents.js → export const AGENTS (4 items: name, model, runtime, description):
  Jarvis, openai-codex/gpt-5.5, Jorge Mac Mini, "Primary PDBM AI employee — opportunity radar, memory, documents"
  Friday, openai-codex/gpt-5.5, Jorge Mac Mini, "Deep research — portal scanning, LinkedIn, wild search"
  EDITH, openai-codex/gpt-5.5, Jorge Mac Mini, "Email/outreach drafts — separated for risk control"
  Deby, openai-codex/gpt-5.5, Sergio Mac Mini, "Debug/training/support environment"

FILE: src/data/strengths.js → export const STRENGTHS (7 items: title, description, evidence)
FILE: src/data/gaps.js → export const GAPS (8 items: title, description, evidence)
FILE: src/data/questions.js → export const QUESTIONS (25 items: id q1-q25, category, question)
FILE: src/data/needs.js → export const NEEDS (5 items: area, severity 1-5, notes array)

For strengths, gaps, questions, needs: use the exact text from CLAUDE.md confirmed facts
and the full data I provided in my descriptions above. Create complete arrays with all items.

### Constraints
- DO NOT modify: src/data/kpis.js, src/data/daily-messages.js, src/data/sentiment.js, src/data/topics.js, src/data/meta.js
- DO NOT touch any files outside src/data/
- All exports are NAMED exports (not default)

### When done
1. Verify all 20+ files exist in src/data/ with correct exports
2. Update COMMS.md: mark tasks B1–B6 as ✅ DONE with timestamp
3. Note in terminal log: "T2: All 20 data files created/updated"
```

---

### T3 — Prompt 3

```
Read COMMS.md and CLAUDE.md. You are T3 — 3D + Components + Hooks owner.

Tasks B7 + B8 + B9 + B10: Refine Three.js hero, create new shared
components, build hooks, build utility modules.

Read the design system in CLAUDE.md carefully — every color, font,
and easing value must match exactly.

### TASK B7: Refine src/three/HeroScene.jsx
Read the existing file, then improve it to production quality.
It uses @react-three/fiber. Required features:
- Canvas: alpha true, antialias true, dpr [1,2], camera z=30 fov=60
- 500 particles (Points + BufferGeometry):
  - Vertex colors: 70% (0.3,0.4,0.6) blue-grey, 20% (0,0.94,1) cyan, 10% (1,0.7,0.28) amber
  - PointsMaterial: size 1.8, vertexColors, transparent, opacity 0.8, AdditiveBlending
  - useFrame: update positions by velocity, bounce at ±30x ±20y ±15z
- Connection lines (LineSegments):
  - Check first 80 particles, draw lines where distance < 8, max 200 segments
  - Cyan, opacity 0.08, additive blending
- Wireframe icosahedron (radius 4, detail 1, cyan, opacity 0.12, rotating)
- Two torus rings:
  - r=12 tube=0.05 cyan opacity=0.15, initial rotation x=PI/2.5
  - r=16 tube=0.03 amber opacity=0.08, initial rotation x=PI/3 y=PI/6
- ScrollCamera: reads scrollProgress prop, lerps camera.position.y and rotation.x
- Default export: HeroScene component taking scrollProgress prop

### TASK B8: Create new shared components

FILE: src/components/GlassCard.jsx
  Props: children, className (optional), style (optional)
  Renders: <div className={"glass-card " + (className || "")} style={style}>{children}</div>
  Default export.

FILE: src/components/SectionHeader.jsx
  Props: label (string), children (heading content)
  Renders: Reveal wrapper containing section-label div + h2.section-heading
  Import Reveal from './Reveal'
  h2 style: fontSize clamp(28px, 4vw, 48px)
  Default export.

Also review existing components (Reveal.jsx, Counter.jsx, ChartTooltip.jsx,
NavDots.jsx) and fix any issues.

### TASK B9: Create hooks

FILE: src/hooks/useScrollProgress.js
  Takes a ref to a scrollable container.
  Returns 0-1 normalized scroll progress.
  Passive scroll listener. Cleanup on unmount.
  Export default.

FILE: src/hooks/useActiveSection.js
  Takes a ref to a scrollable container.
  Returns the index of the visible [data-section] element.
  IntersectionObserver threshold 0.3.
  Export default.

FILE: src/hooks/useReducedMotion.js
  Returns true if prefers-reduced-motion: reduce.
  Uses window.matchMedia. Listens for changes.
  Export default.

### TASK B10: Create utilities

FILE: src/lib/easing.js
  export function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }
  export function easeOutExpo(t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }

FILE: src/lib/format.js
  export function formatNumber(n) { return n.toLocaleString(); }
  export function formatPercent(n, total) { return Math.round((n / total) * 100) + '%'; }
  export function formatCurrency(n) { return '$' + n.toLocaleString(); }

### Constraints
- DO NOT modify files outside your ownership (see COMMS.md)
- DO NOT touch src/data/*, src/sections/*, src/App.jsx

### When done
1. Verify no import errors in dev server
2. Update COMMS.md: mark tasks B7–B10 as ✅ DONE with timestamp
3. Note in terminal log what was created/modified
```

---

### T4 — Prompt 4

```
Read COMMS.md and CLAUDE.md. You are T4 — Sections 0-4 owner.

Tasks B11 + B12 + B13 + B14 + B15: Build the first 5 scrolling sections.

These files already exist from T1's merge. Read each one, then REWRITE it
to production quality. Use the design system from CLAUDE.md exactly.

Import shared components: Reveal, Counter, ChartTooltip from '../components/'.
If GlassCard or SectionHeader exist, use them. If not, inline the styling.
Import data from '../data/' files. NEVER hardcode values.

If a data file import fails (hasn't been created by T2 yet), use optional
chaining and fallback to empty arrays: const data = IMPORTED_DATA || [];

### TASK B11: src/sections/HeroSection.jsx
- data-section="0"
- Full viewport height, relative position
- Import HeroScene from '../three/HeroScene' — absolute behind content, z-0
- Bottom gradient: 40% height, #060A18 → transparent, z-1, pointer-events none
- Content z-2, centered:
  - section-label: "INFRATEK-PDBM-MTR-2026-FINAL"
  - H1 Syne clamp(42px,8vw,96px) weight 800 spacing -2px: "Jarvis" glow-text × "PDBM"
  - Subtitle Syne clamp(16px,2.5vw,24px): "Definitive Mid-Term Review — 75 Days of Intelligence"
  - Metadata JetBrains Mono 12px cyan 50%: "Feb 10 → Apr 26, 2026 | Dorado, Puerto Rico | 4,103 interactions"
  - Scroll indicator: 24×40 pill, cyan border, inner 3×8 dot, animation float
- Props: scrollProgress (passed to HeroScene)

### TASK B12: src/sections/KpiSection.jsx
- data-section="1", padding 120px top
- "Chapter I" + "By the Numbers" with "Numbers" glow-text
- Import KPIS from '../data/kpis'
- Grid auto-fit minmax(160px,1fr) gap 16
- 6 cards: glass-card kpi-card, Counter + label, staggered Reveal delay i*80
- North Star quote block: 3px cyan left border, italic Syne, attribution "— NORTH STAR DIRECTIVE"

### TASK B13: src/sections/VelocitySection.jsx
- data-section="2", padding 80px top
- "Signal Density" + "Daily Message Velocity" with "Velocity" glow-text
- Import DAILY_MESSAGES from '../data/daily-messages'
- Recharts AreaChart, height 280, gradient fill cyan→transparent
- Try importing ERA_VOLUME from '../data/era-volume' for second chart (Anthropic vs OpenAI)
  If it exists: second glass-card with stacked AreaChart, cyan + amber series
  If not: skip gracefully

### TASK B14: src/sections/SentimentSection.jsx
- data-section="3", padding 80px top
- "Chapter III" + "Sentiment Pulse" with "Pulse" glow-text
- Two-column grid min 280px
- LEFT: PieChart donut, 4 colors from SENTIMENT_OVERALL
- RIGHT: Grouped BarChart from SENTIMENT_COMPARISON, claude=cyan gpt=amber
- Try importing DAILY_SENTIMENT for optional third chart (stacked area of daily sentiment)

### TASK B15: src/sections/TopicsSection.jsx
- data-section="4", padding 80px top
- "Chapter IV" + "What Jorge Asks" with "Asks" glow-text
- Two-column grid min 300px
- LEFT: Horizontal BarChart (layout vertical), gradient bars, 9 topics
- RIGHT: RadarChart, 8+ verbs, cyan fill 15% opacity

### Constraints
- DO NOT modify files outside your ownership (see COMMS.md)
- DO NOT touch src/data/*, src/components/*, src/three/*, src/hooks/*, src/lib/*

### When done
1. Verify all 5 sections render without errors
2. Update COMMS.md: mark tasks B11–B15 as ✅ DONE with timestamp
3. Note any data files that were missing (T2 may not be done yet)
```

---

### T5 — Prompt 5

```
Read COMMS.md and CLAUDE.md. You are T5 — Sections 5-14 owner.

Tasks B16 + B17 + B18 + B19 + B20: Build sections 5-7 (refine existing)
and create 7 brand new sections for remaining chapters.

Import Reveal from '../components/Reveal'.
Import ChartTooltip from '../components/ChartTooltip'.
Import data from '../data/' files.

CRITICAL: Some data files may not exist yet (T2 may still be working).
Guard every import: if a file doesn't exist, the section should still
render with placeholder content or gracefully skip. Use try/catch around
dynamic imports, or check with: const data = typeof IMPORT !== 'undefined' ? IMPORT : [];

### TASK B16: Refine existing sections

src/sections/EntitySection.jsx — data-section="5"
  "Chapter V" + "Entity Graph" glow-text
  14 entities with progress bars (persons=amber, companies=cyan, projects=purple)
  Width proportional to max (Jorge 2600 = 100%). Staggered Reveal 60ms.

src/sections/TimelineSection.jsx — data-section="6"
  "Chapter II" + "The Journey" glow-text
  11 milestones. Vertical timeline. Phase-colored dots + badges.
  Show description text below each milestone label.

src/sections/ArcSection.jsx — THIS WILL BE THE LAST SECTION (data-section="14")
  "The Arc" closing. Max 900px centered.
  Heading: "From conversational assistant → emergent BD intelligence layer → multi-model operating system"
  Stats: 85 Jorge Messages, 4 Phases, 17 Chapters
  Final principle quote about being "boringly useful"
  Jorge quote in Spanish with attribution
  Footer: PDBM CONSULTING × INFRATEK AI — DORADO, PR — 2026

### TASK B17: Create src/sections/StrengthsGapsSection.jsx — data-section="7"
  "Chapters VI & VII" + "What Works & What Hurts"
  Two-column grid. LEFT: 7 strengths (green accent #34D399). RIGHT: 8 gaps (red accent #FF4D6A).
  Each item: title bold, description, evidence in mono.

### TASK B18: Create src/sections/PipelineSection.jsx — data-section="8"
  "Chapters IX & X" + "Command Center" glow-text
  Pipeline stages as horizontal flow (glass pills connected by lines)
  Autonomy Knob: 5 level indicators, level 3 highlighted
  Portal grid: 12 cards with tier badge and scan frequency

### TASK B19: Create src/sections/RiskSection.jsx — data-section="9"
  "Chapter XIII" + "Risk Register" glow-text
  8 risk cards in 2-column grid. Severity badge (high=red pill, medium=amber pill).

  Create src/sections/SprintSection.jsx — data-section="10"
  "Chapter XIV" + "7-Day Sprint" glow-text
  7 cards in responsive grid. Day number large (Syne 48px cyan), title, description.

### TASK B20: Create remaining sections

  src/sections/PeopleSection.jsx — data-section="11"
  "Chapter XII" + "People & Agents" glow-text
  5 people cards (warm styling) + 4 agent cards (tech/cyan styling)

  src/sections/RoadmapSection.jsx — data-section="12"
  "Chapter XV" + "The Road Ahead" glow-text
  Three columns: 30/60/90 days with importance badges
  Below: 5 unresolved needs with severity bars

  src/sections/QuestionsSection.jsx — data-section="13"
  "Chapter XVI" + "25 Crucial Questions" glow-text
  Questions grouped by category. Category headers in JetBrains Mono cyan.
  Clean editorial layout.

### Constraints
- DO NOT modify files outside your ownership (see COMMS.md)
- DO NOT touch src/data/*, src/components/*, src/three/*, src/hooks/*, src/lib/*
- ArcSection MUST be the narratively last section (highest data-section number)

### When done
1. Verify all sections render (even if data is placeholder)
2. Update COMMS.md: mark tasks B16–B20 as ✅ DONE with timestamp
3. List every section file created in terminal log
```

---

## PHASE C — Integration & Polish

> Run after ALL Phase B terminals report done.

---

### T1 — Prompt 6

```
Read COMMS.md and CLAUDE.md. You are T1 — Integration owner.

Tasks C1 + C2 + C3 + C4: Wire all sections together, fix all errors.

### STEP 1: Update src/data/meta.js
List every .jsx file that exists in src/sections/. Create a SECTIONS entry for each.
Order: Hero, KPIs, Velocity, Sentiment, Topics, Entities, Timeline, StrengthsGaps,
Pipeline, Risks, Sprint, People, Roadmap, Questions, Arc.
Only include sections that actually exist as files. Index sequentially 0, 1, 2...
Arc is ALWAYS last.

### STEP 2: Rewrite src/App.jsx
Import every section component that exists. Render them all in <main> in order.
HeroSection gets scrollProgress prop. All others get no props.
Keep the scroll tracking logic and NavDots.

### STEP 3: Update src/components/NavDots.jsx
If there are more than 10 sections, reduce dot size to 6px and gap to 8px.
Import SECTIONS from '../data/meta' for labels.

### STEP 4: Fix ALL errors
Run npm run dev. Read every error. Fix every error.
Common problems:
- Missing data files → use optional chaining or fallback arrays
- Wrong import paths → verify file exists
- Missing component exports → check export default
- Recharts prop issues → verify component names
Keep fixing until zero errors.

### STEP 5: Run npm run build
Must pass with zero errors. Fix anything that fails.

### Constraints
- You may touch: src/App.jsx, src/data/meta.js, src/components/NavDots.jsx
- You may fix import errors in ANY file if they prevent build
- Note any cross-terminal fixes in COMMS.md

### When done
1. npm run build passes
2. Update COMMS.md: mark C1–C4 as ✅ DONE
3. Report: total sections rendering, any remaining issues
```

---

### T2 — Prompt 7

```
Read COMMS.md and CLAUDE.md. You are T2 — Polish & Deploy owner.

Tasks C5 + C6 + C7: Responsive design, loading state, deploy.

### STEP 1: Responsive (C5)
Add mobile overrides to src/index.css:
  @media (max-width: 640px):
    - .container padding 0 16px
    - .section-heading font-size 24px, margin-bottom 32px
    - .hide-mobile display none
    - Chart heights 200px
    - Grid columns 1fr

In HeroSection: wrap the Three.js canvas in a check — only render on
window.innerWidth > 768. On mobile, show a CSS gradient background instead.
Add className="hide-mobile" to NavDots wrapper.

### STEP 2: Loading + Accessibility (C6)
Add to App.jsx: a loading overlay (full screen, bg-primary, centered pulsing
cyan dot + "Initializing..." text). Show for 1.5s then fade out.
Add role="region" and aria-label to each section element.

### STEP 3: Git + Deploy (C7)
Run:
  git add .
  git commit -m "feat: complete Jarvis × PDBM immersive 3D mid-term review

  - 15 scrolling sections covering all 17 document chapters
  - Three.js particle constellation hero with React Three Fiber
  - 6+ Recharts data visualizations (area, bar, pie, radar)
  - Framer Motion scroll reveals with staggered animations
  - Full design system: Syne + DM Sans + JetBrains Mono
  - Responsive with mobile graceful degradation
  - Data source: INFRATEK-PDBM-MTR-2026-FINAL (4,103 interactions)"
  git push origin main

### Constraints
- You may touch: src/index.css, src/App.jsx, src/sections/HeroSection.jsx, index.html
- Coordinate with COMMS.md if modifying T4/T5 owned sections

### When done
1. npm run build passes
2. Git pushed
3. Update COMMS.md: mark C5–C7 as ✅ DONE, change status to 🟢 DEPLOYED
4. Report final bundle sizes
```

---

## Emergency Prompts

### If a terminal hits unrecoverable errors:

```
Read COMMS.md and CLAUDE.md. You are T[N] — [Component] owner.

The project has errors. Do this:
1. Run npm run dev
2. Read every error in the terminal output
3. For each error, fix it:
   - Missing file → create with minimal valid export
   - Bad import path → fix the path
   - Undefined variable → check data file exports match
   - React error → check JSX syntax
4. Only fix files you own (check COMMS.md FILE OWNERSHIP)
5. If the error is in another terminal's file, add a BLOCKER to COMMS.md
6. Keep fixing until dev server compiles clean
7. Update COMMS.md with what you fixed
```

### If a terminal finishes early and goes idle:

```
Read COMMS.md. Pick up the next unclaimed ⬜ TODO task from the task board.
Update COMMS.md to claim it, then start working. Update when done.
```

### If a terminal crashes and loses context:

```
Read COMMS.md and CLAUDE.md. You are T[N] — [Component] owner.
Check the terminal log in COMMS.md for your previous work.
Pick up where you left off or claim a new TODO task.
```

---

## Verification Checklist (run in any terminal after Phase C)

```
Read COMMS.md and CLAUDE.md. Run the final verification:

1. Run npm run dev — zero errors
2. Run npm run build — zero errors, report bundle sizes
3. Check: how many [data-section] elements render?
4. Check: does the Three.js hero show particles + lines + geometry?
5. Check: do KPI counters animate?
6. Check: do all Recharts charts render with tooltips?
7. Check: do scroll reveals trigger?
8. Check: do NavDots track correctly?
9. Check: does responsive work at 375px?
10. Report the full status to COMMS.md.

Update COMMS.md status to 🟢 COMPLETE.
```
