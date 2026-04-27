# Jarvis × PDBM — 5-Terminal Claude Code Execution Plan

> **Project:** C:\Infratek\repos\jarvismidtermthreejs
> **Repo:** https://github.com/infrateki/jarvismidtermthreejs.git
> **Setup:** 5 Claude Code terminals (T1–T5), Boris Cherny style
> **Goal:** Complete the award-winning 3D mid-term review site

---

## Current State Audit

```
✅ DONE:
  package.json (all deps: react, three, r3f, recharts, framer-motion)
  vite.config.js (esnext target)
  index.html (fonts preloaded: Syne, DM Sans, JetBrains Mono)
  src/data/ (8 files — kpis, daily-messages, sentiment, topics, verbs, entities, milestones, meta)
  src/main.jsx

⏳ EXTRACTED BUT NOT MERGED (in jarvis-pdbm-source/):
  src/App.jsx
  src/index.css
  src/components/ (Reveal, Counter, NavDots, ChartTooltip)
  src/sections/ (Hero, KPI, Velocity, Sentiment, Topics, Entity, Timeline, Arc)
  src/three/HeroScene.jsx
  CLAUDE.md

❌ MISSING:
  node_modules (npm install not run)
  src/hooks/ (empty)
  src/lib/ (empty)
  Expanded data (full 17-chapter document has WAY more data)
  New sections for chapters VI–XVI
  docs/ (empty)
```

---

## Execution Phases

```
PHASE A ─── T1 alone (sequential, ~5 min)
  Merge files, install deps, verify dev server

PHASE B ─── T2 + T3 + T4 + T5 (parallel, ~30 min)
  T2: Data layer expansion
  T3: Three.js hero + shared components + hooks
  T4: Sections 0–4 (build/refine)
  T5: Sections 5–7 + new chapter sections

PHASE C ─── T1 + T2 (sequential, ~15 min)
  T1: Wire App.jsx with all sections, test
  T2: Polish, responsive, performance
```

---

## PHASE A — Foundation (T1 only, run first)

### T1 — PROMPT 1: Merge & Bootstrap

```
You are working on a React + Three.js project at C:\Infratek\repos\jarvismidtermthreejs

There are source files extracted in jarvis-pdbm-source/ that need to be merged into the root project. Do this:

1. Copy jarvis-pdbm-source/CLAUDE.md → root CLAUDE.md
2. Copy jarvis-pdbm-source/src/App.jsx → src/App.jsx
3. Copy jarvis-pdbm-source/src/index.css → src/index.css
4. Copy jarvis-pdbm-source/src/components/*.jsx → src/components/
5. Copy jarvis-pdbm-source/src/sections/*.jsx → src/sections/
6. Copy jarvis-pdbm-source/src/three/*.jsx → src/three/
7. Copy jarvis-pdbm-source/docs/* → docs/
8. Run: npm install
9. Run: npm run dev (verify it starts without errors)
10. If there are import errors, fix them. The CSS import in App.jsx should be './index.css'.

Do NOT delete jarvis-pdbm-source/ yet — we may reference it.

After dev server starts, report what works and what errors you see.
```

**Wait for T1 to complete before starting Phase B.**

---

## PHASE B — Parallel Build (T2 + T3 + T4 + T5, run simultaneously)

### T2 — PROMPT 2: Data Layer Expansion

```
You are working on C:\Infratek\repos\jarvismidtermthreejs

The project is a 3D interactive mid-term review site for Jarvis × PDBM Consulting.
The current src/data/ has 8 basic files. The FULL source document has 17 chapters
with much more data. I need you to expand the data layer.

Read the current data files in src/data/ to understand the format, then create
or update these files:

=== UPDATE EXISTING ===

1. src/data/daily-messages.js — Add the full detail array with actual dates:
[{"date":"2026-02-15","messages":4},{"date":"2026-02-17","messages":50},
{"date":"2026-02-23","messages":19},{"date":"2026-02-24","messages":20},
{"date":"2026-02-25","messages":10},{"date":"2026-02-26","messages":5},
{"date":"2026-02-27","messages":15},{"date":"2026-02-28","messages":7},
{"date":"2026-03-03","messages":5},{"date":"2026-03-11","messages":75},
{"date":"2026-03-13","messages":86},{"date":"2026-03-14","messages":30},
{"date":"2026-04-23","messages":455},{"date":"2026-04-24","messages":125},
{"date":"2026-04-25","messages":1078},{"date":"2026-04-26","messages":210}]
Keep the existing sparkline array too. Add PEAK and SECONDARY_PEAKS exports.

2. src/data/entities.js — Expand to ALL 14 entities:
Jorge(2600,person), PDBM(1168,company), MIA(723,company), AUS(676,company),
USACE(628,company), PANYNJ(589,company), Miami-Dade(537,company), Sergio(515,person),
Journey With AUS(205,project), USACE Caribbean(117,project), Julio(110,person),
E25AV05(102,project), BIM Search(83,project), Shami(39,person)

3. src/data/milestones.js — Expand to 11 milestones with descriptions:
Add Shami session(Apr 11, phase 2), Julio session(Apr 23, phase 2).
Add description field to each.

4. src/data/verbs.js — Expand to 11 verbs:
Add summarize(1), schedule(1), analyze(1).

=== CREATE NEW ===

5. src/data/sentiment-daily.js — Daily sentiment time series:
Export DAILY_SENTIMENT array with date, productive, neutral, frustrated, exploratory.
13 data points from Apr 1 to Apr 26.

6. src/data/era-volume.js — Anthropic vs OpenAI era message volume:
Export ERA_VOLUME array with date, anthropic count, openai count. 9 data points.

7. src/data/commercial.js — Commercial terms:
Implementation fee $5000, monthly $450, commission model.
Three invoices: INF-2026-007($2500), INF-2026-008($2500), INF-2026-009($200).

8. src/data/tiers.js — BIM Search 3-tier system:
Tier 1 (Airports/Federal, $100M+), Tier 2 (Municipalities, $10M+),
Tier 3 (Staff Aug, N/A). Each with high/medium/low ranking thresholds.

9. src/data/pipeline.js — Pipeline stages + autonomy knob:
Stages: Radar → Qualified → Jorge Review → Contact → Proposal → Won/Lost.
Autonomy knob: 0(Manual), 3(Conservative), 6(Balanced), 9(Autonomous), 10(Vacation).

10. src/data/portals.js — 12 portal sources:
AUS, FLL, DFW, MIA, MCO, PANYNJ, SAM.gov, USACE Caribbean (all Tier 1),
BidNet, EUNA/Bonfire, OpenGov (Tier 2), LinkedIn (Tier 3).
Each with name, type, tier, scan_method, scan_frequency, active, notes.

11. src/data/risks.js — 8 risks with severity and mitigation:
Hallucinated contacts(high), Outreach reputation(high), Cost spikes(medium),
Noise overload(medium), Team silos(medium), Context contamination(medium),
Remote access fragility(medium), Privacy risk(medium).

12. src/data/sprint.js — 7-day sprint plan:
Day 1 Stabilize, Day 2 Scope, Day 3 Build, Day 4 Pilot,
Day 5 Train, Day 6 Review, Day 7 Operate.

13. src/data/roadmap.js — 30/60/90 day roadmap items with importance.

14. src/data/people.js — 5 people with role, org, description, device.

15. src/data/agents.js — 4 agents (Jarvis, Friday, EDITH, Deby) with model, runtime, desc.

16. src/data/strengths.js — 7 strengths from Chapter VI with evidence.

17. src/data/gaps.js — 8 gaps from Chapter VII with evidence.

18. src/data/questions.js — 25 crucial questions from Chapter XVI,
each with id, category, and question text.

19. src/data/needs.js — 5 unresolved needs with area, severity (1-5), notes array.

20. src/data/model-migration.js — Migration details:
from claude-opus-4-6 to gpt-5.5, date, fallbacks, auth, reason, identity principle.

Every file should use named exports. Follow the pattern of the existing data files.
```

---

### T3 — PROMPT 3: Three.js Hero + Shared Components + Hooks

```
You are working on C:\Infratek\repos\jarvismidtermthreejs

This is a React + Three.js (@react-three/fiber) project. The dev server should
already be running. Your job is to build/refine the 3D hero scene and all shared
components.

=== DESIGN SYSTEM (follow exactly) ===
- Background: #060A18
- Primary accent: #00F0FF (electric cyan)
- Secondary accent: #FFB547 (amber)
- Text primary: #E2E8F0
- Text secondary: rgba(200,214,229,0.6)
- Text tertiary: rgba(200,214,229,0.35)
- Glass cards: rgba(12,16,35,0.7) with backdrop-filter blur(12px)
- Display font: Syne (700-800, letter-spacing -1px)
- Body font: DM Sans
- Data/labels: JetBrains Mono (uppercase, letter-spacing 2-3px)
- Easing: cubic-bezier(0.16, 1, 0.3, 1)

=== THREE.JS HERO (src/three/HeroScene.jsx) ===
Review and improve the existing HeroScene.jsx. It should have:
- React Three Fiber Canvas with alpha:true, antialias:true
- 500 particles as Points with BufferGeometry, vertex colors (70% grey-blue,
  20% cyan, 10% amber), additive blending, size 1.8, opacity 0.8
- Bounded particle velocity with edge bouncing
- Connection lines between nearby particles (distance < 8, max 200 lines)
- Central wireframe icosahedron (radius 4, detail 1, cyan, opacity 0.12)
- Two orbital torus rings (ring1: r=12, cyan, opacity 0.15; ring2: r=16, amber, opacity 0.08)
- Scroll-driven camera offset (Y-axis parallax with lerp smoothing)
- All rotation speeds slow and ambient

=== SHARED COMPONENTS ===

1. src/components/Reveal.jsx — Uses framer-motion's motion.div with:
   - initial={{ opacity: 0, y: 40 }}
   - whileInView={{ opacity: 1, y: 0 }}
   - viewport={{ once: true, amount: 0.15 }}
   - transition with configurable delay prop (in ms, converted to seconds)
   - Easing: [0.16, 1, 0.3, 1]

2. src/components/Counter.jsx — Animated number counter:
   - Triggers on IntersectionObserver (threshold 0.3)
   - Quartic ease-out: 1 - (1-t)^4
   - 2000ms duration, configurable delay
   - Locale-aware formatting with toLocaleString()

3. src/components/NavDots.jsx — Fixed right-edge dot navigation:
   - 8+ dots for each section
   - Active dot: filled cyan, scale 1.3, glow shadow
   - Click smooth-scrolls to section
   - Hidden on mobile (< 640px)
   - Import section labels from data/meta.js

4. src/components/ChartTooltip.jsx — Custom Recharts tooltip:
   - Dark glass background rgba(10,14,28,0.95)
   - Cyan border, backdrop blur
   - Cyan title, white values with toLocaleString()

5. src/components/GlassCard.jsx — NEW, reusable card:
   - glass-card CSS class + ::before highlight
   - Configurable padding prop
   - Optional hover prop for lift effect

6. src/components/SectionHeader.jsx — NEW, reusable section header:
   - Takes label (e.g. "Chapter I") and title with glow text support
   - Wraps in Reveal

=== HOOKS ===

7. src/hooks/useScrollProgress.js — Returns 0-1 normalized scroll position
   of a ref'd container. Uses passive scroll listener.

8. src/hooks/useActiveSection.js — Returns the index of the currently
   visible section using IntersectionObserver on [data-section] elements.

9. src/hooks/useReducedMotion.js — Returns boolean for
   prefers-reduced-motion media query.

=== LIB ===

10. src/lib/easing.js — Export easeOutQuart, easeOutExpo functions.

11. src/lib/format.js — Export formatNumber (toLocaleString wrapper),
    formatPercent, formatCurrency.

Make sure all components are default exports. All hooks return values.
Test each component renders without errors.
```

---

### T4 — PROMPT 4: Sections 0–4 (Hero through Topics)

```
You are working on C:\Infratek\repos\jarvismidtermthreejs

Build or refine the first 5 sections of the scrolling 3D site. Each section
is a file in src/sections/. Use components from src/components/ (Reveal,
Counter, GlassCard, SectionHeader, ChartTooltip). Import data from src/data/.

=== DESIGN RULES ===
- Container: max-width 1200px, margin 0 auto, padding 0 24px
- Section padding: 120px top for first, 80px top for rest, 120px bottom
- Charts: Recharts with ResponsiveContainer, height 280px desktop
- All axes: rgba(200,214,229,0.25) size 10, no tick lines
- Grid lines: rgba(0,240,255,0.05)
- All text colors from CSS variables
- Stagger Reveal delays at 60-100ms intervals

=== SECTION 0: HeroSection.jsx ===
- Full viewport height, relative positioned
- Import HeroScene from src/three/HeroScene.jsx (absolute behind content)
- Bottom gradient overlay (40% height, bg-primary to transparent)
- Centered content (z-index 2):
  - Section label: "INFRATEK-PDBM-MTR-2026-FINAL"
  - H1: "Jarvis" (glow-text) × "PDBM"
  - Subtitle: "Definitive Mid-Term Review — 75 Days of Intelligence"
  - Metadata: "Feb 10 → Apr 26, 2026 | Dorado, Puerto Rico | 4,103 interactions"
  - Scroll indicator (pill shape, floating animation)
- Props: scrollProgress (number 0-1)

=== SECTION 1: KpiSection.jsx ===
- Section label "Chapter I" + heading "By the Numbers"
- 6 KPI cards in responsive grid (auto-fit, minmax 160px)
- Each card: GlassCard with Counter + label
- Data: 53 Sessions, 4103 Interactions, 836 Memories, 75 Days, 72 Lifelogs, 256 Files
- Staggered reveals (80ms per card)
- North Star quote block below (cyan left border accent)
- Add subtitle: "Be Jorge's proactive right hand..."

=== SECTION 2: VelocitySection.jsx ===
- Section label "Signal Density" + heading "Daily Message Velocity"
- Recharts AreaChart with the 57-point sparkline data
- Gradient fill (cyan 40% → transparent)
- Active dot on hover, custom tooltip
- Add annotation for peak day (1,078 on Apr 25)
- Add description text about GPT-5.5 migration
- ALSO add a second chart: Era Volume (Anthropic vs OpenAI stacked area)
  using data from src/data/era-volume.js (if it exists, otherwise skip)

=== SECTION 3: SentimentSection.jsx ===
- Section label "Chapter III" + heading "Sentiment Pulse"
- Two-column responsive grid (min 280px):
  LEFT: PieChart donut (innerRadius 55, outerRadius 90, paddingAngle 3)
    - 4 segments: Productive(#00F0FF), Neutral(#3A4A6B), Frustrated(#FF4D6A), Exploratory(#FFB547)
    - Legend below with percentage
  RIGHT: Grouped BarChart comparing Claude vs GPT-5.5
    - Claude bars = cyan, GPT bars = amber
    - Annotation: "Anthropic carries relationship history..."
- ALSO add a third chart below both: Daily Sentiment stacked area
  using data from src/data/sentiment-daily.js (if it exists, otherwise skip)

=== SECTION 4: TopicsSection.jsx ===
- Section label "Chapter IV" + heading "What Jorge Asks"
- Two-column grid (min 300px):
  LEFT: Horizontal BarChart (layout="vertical") with 9 topics
    - Gradient bars (blue → cyan)
  RIGHT: RadarChart with action verbs
    - Grid: rgba(0,240,255,0.1)
    - Fill: cyan 15% opacity
    - Annotation: "Execution-oriented commands dominate"

All sections should be default exports. Use data imports, never hardcode values.
```

---

### T5 — PROMPT 5: Sections 5–7 + New Chapter Sections

```
You are working on C:\Infratek\repos\jarvismidtermthreejs

Build the remaining sections and ADD new sections for the full 17-chapter
document. Use components from src/components/ and data from src/data/.

=== EXISTING SECTIONS TO BUILD/REFINE ===

SECTION 5: EntitySection.jsx
- "Chapter V" + "Entity Graph"
- 14 entities (expanded) with ranked progress bars
- Color: amber gradient for persons, cyan for companies, purple for projects
- Type indicators: circle=person, square=company, diamond=project
- Proportional to max (Jorge = 100%)
- Staggered reveals at 60ms

SECTION 6: TimelineSection.jsx
- "Chapter II" + "The Journey"
- 11 milestones (expanded) with descriptions
- Vertical timeline, phase-colored dots (Phase 1=cyan, 2=amber, 3=red, 4=purple)
- Milestone cards with hover lift
- Description text shown below label

SECTION 7: ArcSection.jsx
- "The Arc" closing section, max 900px centered
- Arc statement with glow text
- Summary stats: 85 Jorge Messages, 4 Phases, 17 Chapters
- Final principle quote
- Jorge quote: "Yo necesito esto, Sergio..."
- Footer: PDBM CONSULTING × INFRATEK AI — DORADO, PR — 2026

=== NEW SECTIONS TO CREATE ===

SECTION: StrengthsGapsSection.jsx (Chapters VI & VII combined)
- "What Works & What Hurts"
- Two-column layout:
  LEFT: 7 strengths from src/data/strengths.js — green accent (#34D399),
    each with title and evidence text
  RIGHT: 8 gaps from src/data/gaps.js — red accent (#FF4D6A),
    each with title and evidence text
- Use GlassCard for each side

SECTION: PipelineSection.jsx (Chapters IX & X)
- "Command Center & BIMSEARCH"
- Pipeline stages as a horizontal flow diagram (Radar → Qualified → Jorge Review → Contact → Proposal → Won/Lost)
  - CSS flexbox with connecting lines, each stage a glass pill
- Autonomy Knob: visual slider showing levels 0-10 with current level highlighted
- Portal inventory: grid of 12 portal cards showing name, tier badge, scan frequency
  - Use data from src/data/portals.js
- Operating rhythm: 7-day schedule as a mini calendar grid

SECTION: RiskSection.jsx (Chapter XIII)
- "Risk Register"
- 8 risks as cards with severity badge (high=red, medium=amber)
- Each card shows risk title, severity, mitigation text
- Two-column responsive grid

SECTION: SprintSection.jsx (Chapter XIV)
- "7-Day Sprint"
- 7 numbered cards in a horizontal scrollable row
- Each card: day number, title, description
- Glass card style with phase-like color accents

SECTION: RoadmapSection.jsx (Chapter XV)
- "The Road Ahead"
- Three columns: 30 Days, 60 Days, 90 Days
- Each column lists items with importance badges
- Below: Unresolved Needs — 5 items with severity bars (1-5 scale)
  from src/data/needs.js

SECTION: PeopleSection.jsx (Chapter XII)
- "People & Agents"
- Two rows:
  TOP: 5 people cards (name, role, org, description)
  BOTTOM: 4 agent cards (Jarvis, Friday, EDITH, Deby) with model, runtime
- People cards: warm styling. Agent cards: tech/cyan styling.

SECTION: QuestionsSection.jsx (Chapter XVI)
- "25 Crucial Questions"
- Grouped by category (Vision, Voice, Workflow, Pain Points, Roadmap, Investment, Team, PR)
- Each category is a collapsible accordion or a labeled group
- Questions numbered q1-q25
- Minimal, editorial styling

Every section: default export, data-section attribute with sequential index,
uses Reveal for scroll animation, follows the design system.
```

---

## PHASE C — Integration & Polish (T1 + T2, sequential)

### T1 — PROMPT 6: Wire Everything Together

```
You are working on C:\Infratek\repos\jarvismidtermthreejs

All sections and components have been built. Now wire everything together.

1. Update src/data/meta.js — expand SECTIONS array to include ALL sections
   in display order:
   Hero, KPIs, Velocity, Sentiment, Topics, Entities, StrengthsGaps,
   Pipeline, Timeline, Risks, Sprint, People, Roadmap, Questions, Arc
   (15 sections total, or however many were actually created)

2. Update src/App.jsx:
   - Import ALL section components
   - Import useScrollProgress, useActiveSection hooks
   - Render all sections in order inside <main>
   - Pass scrollProgress to HeroSection
   - Wire NavDots with activeSection state
   - Add smooth scroll behavior

3. Update src/components/NavDots.jsx to handle the expanded SECTIONS array.
   If there are more than 10 sections, make the dots smaller (6px) to fit.

4. Update src/index.css if any new CSS classes are needed for new sections.

5. Run npm run dev and test:
   - All sections render
   - Scroll reveals trigger
   - Charts have tooltips
   - NavDots track correctly
   - 3D hero animates
   - No console errors

Fix any import errors, missing files, or rendering issues.
Report the final state.
```

---

### T2 — PROMPT 7: Polish & Ship

```
You are working on C:\Infratek\repos\jarvismidtermthreejs

Final polish pass. The site should be award-winning quality.

1. RESPONSIVE:
   - Test at 375px, 768px, 1024px, 1440px viewports
   - On mobile (< 640px): hide Three.js hero (replace with CSS gradient),
     hide NavDots, single-column layouts, reduce chart heights to 200px
   - On tablet (640-1023px): simplified layouts, smaller particle count

2. PERFORMANCE:
   - Verify 60fps on the 3D scene
   - Lazy load sections below the fold with React.lazy + Suspense
   - Check bundle size with: npm run build

3. ACCESSIBILITY:
   - Add aria-labels to NavDots
   - Ensure all chart data has text alternatives
   - Test with prefers-reduced-motion: skip Three.js, show final counter values

4. LOADING STATE:
   - Add a simple loading screen that shows while Three.js initializes
   - Centered pulsing cyan dot + "Initializing..." text
   - Fade out on ready

5. META TAGS:
   - Update index.html with proper OG tags for sharing

6. GIT:
   - Stage all changes: git add .
   - Commit: git commit -m "Complete Jarvis × PDBM immersive mid-term review"
   - Push: git push origin main

Report final bundle sizes and any issues.
```

---

## Quick Reference — Terminal Assignment

```
┌─────┬──────────────────────────┬─────────┬──────────┐
│ T#  │ Domain                   │ Phase   │ Depends  │
├─────┼──────────────────────────┼─────────┼──────────┤
│ T1  │ Foundation + Integration │ A → C   │ None     │
│ T2  │ Data Layer Expansion     │ B → C   │ T1(A)    │
│ T3  │ 3D + Components + Hooks  │ B       │ T1(A)    │
│ T4  │ Sections 0–4             │ B       │ T1(A)    │
│ T5  │ Sections 5+ & New        │ B       │ T1(A)    │
└─────┴──────────────────────────┴─────────┴──────────┘

Execution order:
  1. T1 runs Prompt 1 ALONE (merge + install + verify)
  2. T2, T3, T4, T5 run Prompts 2-5 IN PARALLEL
  3. T1 runs Prompt 6 (wire together)
  4. T2 runs Prompt 7 (polish + ship)
```

---

## Emergency Fixes

If a terminal hits errors, use this prompt:

```
There are errors in the project at C:\Infratek\repos\jarvismidtermthreejs.
Run npm run dev, read the error output, and fix all issues.
Common problems:
- Missing imports (check file exists before importing)
- Wrong relative paths (components are in ../components/)
- Data files not yet created (conditionally import with try/catch or optional chaining)
- Recharts components need exact prop names
- framer-motion needs named imports: { motion, useInView } from 'framer-motion'
- R3F needs: { Canvas, useFrame } from '@react-three/fiber'
Fix everything until the dev server runs clean.
```

---

## Data Integrity Checksum

After all terminals complete, verify these values match the source document:

| Check | Expected |
|-------|----------|
| Total interactions | 4,103 |
| Sessions analyzed | 53 |
| Memories stored | 836 |
| Period days | 75 |
| Lifelogs | 72 |
| Files inspected | 256 |
| Jorge messages | 85 |
| Peak day messages | 1,078 |
| Entity count | 14 |
| Milestone count | 11 |
| Portal count | 12 |
| Risk count | 8 |
| Question count | 25 |
| People count | 5 |
| Agent count | 4 |
| Strength count | 7 |
| Gap count | 8 |
