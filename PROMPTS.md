# Claude Code Prompts — Build Guide

> **Project:** `C:\Infratek\repos\jarvismidtermthreejs`
> **Goal:** Complete the Jarvis × PDBM immersive 3D mid-term review website
> **Method:** 5 Claude Code terminals (T1–T5), phased execution
> **Time estimate:** ~60 minutes total

---

## How to Use This Guide

1. Open **5 Claude Code terminals** in the project folder
2. Run prompts **in phase order** — Phase A must finish before Phase B starts
3. Phase B prompts run **simultaneously** across T2, T3, T4, T5
4. Phase C runs **after** Phase B finishes
5. Copy-paste each prompt exactly into the designated terminal

---

## Current State (as of now)

```
✅ EXISTS:
   package.json         — React 18, Three.js 0.170, R3F, Recharts, Framer Motion
   vite.config.js       — esnext target
   index.html           — Syne + DM Sans + JetBrains Mono preloaded
   src/main.jsx         — React entry point
   src/data/ (8 files)  — kpis, daily-messages, sentiment, topics, verbs, entities, milestones, meta
   CLAUDE.md            — Project instructions for Claude Code

⏳ EXTRACTED BUT NOT MERGED (in jarvis-pdbm-source/):
   App.jsx, index.css, 4 components, 8 sections, HeroScene.jsx

❌ EMPTY:
   src/components/   src/sections/   src/three/   src/hooks/   src/lib/   docs/

❌ NOT RUN:
   npm install
```

---

## PHASE A — Foundation

> **Run T1 alone. Wait for it to finish before starting Phase B.**

---

### T1 — Prompt 1: Merge Files & Bootstrap

Open Claude Code terminal 1 in the project root and paste:

```
I'm building a React + Three.js project at this location. There are source 
files that were extracted into a subfolder called jarvis-pdbm-source/ that 
need to be merged into the main project.

Do these steps in order:

STEP 1 — Copy files from jarvis-pdbm-source/ into the correct locations:
  - jarvis-pdbm-source/src/App.jsx → src/App.jsx (overwrite)
  - jarvis-pdbm-source/src/index.css → src/index.css (new file)
  - jarvis-pdbm-source/src/components/Reveal.jsx → src/components/Reveal.jsx
  - jarvis-pdbm-source/src/components/Counter.jsx → src/components/Counter.jsx
  - jarvis-pdbm-source/src/components/NavDots.jsx → src/components/NavDots.jsx
  - jarvis-pdbm-source/src/components/ChartTooltip.jsx → src/components/ChartTooltip.jsx
  - jarvis-pdbm-source/src/sections/HeroSection.jsx → src/sections/HeroSection.jsx
  - jarvis-pdbm-source/src/sections/KpiSection.jsx → src/sections/KpiSection.jsx
  - jarvis-pdbm-source/src/sections/VelocitySection.jsx → src/sections/VelocitySection.jsx
  - jarvis-pdbm-source/src/sections/SentimentSection.jsx → src/sections/SentimentSection.jsx
  - jarvis-pdbm-source/src/sections/TopicsSection.jsx → src/sections/TopicsSection.jsx
  - jarvis-pdbm-source/src/sections/EntitySection.jsx → src/sections/EntitySection.jsx
  - jarvis-pdbm-source/src/sections/TimelineSection.jsx → src/sections/TimelineSection.jsx
  - jarvis-pdbm-source/src/sections/ArcSection.jsx → src/sections/ArcSection.jsx
  - jarvis-pdbm-source/src/three/HeroScene.jsx → src/three/HeroScene.jsx

STEP 2 — Run: npm install

STEP 3 — Run: npm run dev

STEP 4 — If there are any import errors or missing module errors, fix them.
Common issues:
  - The CSS import in App.jsx should be './index.css'
  - framer-motion uses named imports: import { motion, useInView } from 'framer-motion'
  - @react-three/fiber uses: import { Canvas, useFrame } from '@react-three/fiber'
  - Make sure all section/component files exist before they're imported

STEP 5 — Report what the dev server shows. Does it compile? Any warnings?

Do NOT delete the jarvis-pdbm-source/ folder.
```

**Expected outcome:** Dev server running, basic site renders with 8 sections.

**Wait for this to complete before starting Phase B.**

---

## PHASE B — Parallel Build

> **Start T2, T3, T4, T5 simultaneously after T1 finishes.**
> Each terminal works on a different part of the codebase.
> They do not depend on each other.

---

### T2 — Prompt 2: Expand the Data Layer

Open Claude Code terminal 2 and paste:

```
I'm building a data-driven 3D website. The source document has 17 chapters 
of data but our src/data/ folder only has 8 basic files. I need you to 
expand the data layer to cover the full document.

Read CLAUDE.md for project context.
Read the existing files in src/data/ to understand the export format.

Then do these tasks:

=== TASK 1: UPDATE src/data/entities.js ===
Expand from 8 to 14 entities. The full list:
  Jorge (2600, person), PDBM (1168, company), MIA (723, company), 
  AUS (676, company), USACE (628, company), PANYNJ (589, company), 
  Miami-Dade (537, company), Sergio (515, person), 
  Journey With AUS (205, project), USACE Caribbean (117, project), 
  Julio (110, person), E25AV05 (102, project), 
  BIM Search (83, project), Shami (39, person)

=== TASK 2: UPDATE src/data/milestones.js ===
Expand from 9 to 11 milestones. Add:
  { date: 'Apr 11', label: 'Shami Session', phase: 2, description: 'Team adoption begins' },
  { date: 'Apr 23', label: 'Julio Session', phase: 2, description: 'Technical onboarding' }
Also add a description field to every existing milestone:
  Trial Launch → "MEMORY.md: trial started with Jorge"
  Voice Rules → "Concise, one message, no process narration"
  BIM Search Tiers → "Official 3-tier scoring system"
  Convex + GHL → "Data layer documented"
  Chrome CDP → "Portal intelligence path"
  Graph Email → "Primary outbound email via jarvis@pdbmconsulting.com"
  Codex Migration → "Runtime migration starts"
  GPT-5.5 Primary → "OpenAI Codex primary; Anthropic fallback"
  Midterm Prep → "Meeting package generated"

=== TASK 3: UPDATE src/data/verbs.js ===
Add 3 more verbs: summarize (1), schedule (1), analyze (1)

=== TASK 4: CREATE src/data/sentiment-daily.js ===
Export DAILY_SENTIMENT as an array of objects with fields:
date, productive, neutral, frustrated, exploratory.
Data (13 rows):
  2026-04-01: 17, 37, 5, 14
  2026-04-02: 25, 46, 25, 27
  2026-04-03: 47, 73, 23, 36
  2026-04-06: 28, 119, 27, 32
  2026-04-10: 13, 46, 17, 17
  2026-04-13: 20, 38, 15, 8
  2026-04-17: 31, 50, 15, 13
  2026-04-21: 31, 78, 49, 23
  2026-04-22: 58, 112, 40, 32
  2026-04-23: 102, 205, 81, 67
  2026-04-24: 11, 82, 13, 19
  2026-04-25: 145, 560, 195, 178
  2026-04-26: 38, 117, 32, 23

=== TASK 5: CREATE src/data/era-volume.js ===
Export ERA_VOLUME as an array. Fields: date, anthropic, openai.
Data (9 rows):
  2026-02-15: 4, 0
  2026-02-17: 50, 0
  2026-03-13: 86, 0
  2026-03-30: 93, 0
  2026-04-06: 206, 0
  2026-04-23: 455, 0
  2026-04-24: 117, 8
  2026-04-25: 0, 1078
  2026-04-26: 0, 210

=== TASK 6: CREATE src/data/commercial.js ===
Export COMMERCIAL_TERMS object:
  implementationFee: 5000
  monthlyRetainer: 450
  termMonths: 12
  commission: "Finder's fee per converted JARVIS-sourced project"
Export INVOICES array (3 items):
  INF-2026-007, $2500, Feb 24, "First implementation deposit"
  INF-2026-008, $2500, Apr 24, "Second implementation payment"
  INF-2026-009, $200, Apr 24, "Jarvis API credit boost"

=== TASK 7: CREATE src/data/tiers.js ===
Export TIERS array (3 objects). Each has: tier number, label, targets, 
budgetThreshold, ranking (high/medium/low).
  Tier 1: Airports & Federal, $100M+, high=$1B+, med=$100M-$1B, low=<$100M
  Tier 2: Municipalities, $10M+, high=$100M+, med=$10M-$100M, low=<$10M
  Tier 3: Staff Augmentation, N/A, high=5+ resources, med=2-4, low=1

=== TASK 8: CREATE src/data/pipeline.js ===
Export PIPELINE_STAGES array: 
  ['Radar', 'Qualified', 'Jorge Review', 'Contact', 'Proposal', 'Won', 'Lost']
Export AUTONOMY_KNOB array (5 objects):
  { level: 0, mode: 'Manual', description: 'Everything requires Jorge approval' }
  { level: 3, mode: 'Conservative', description: 'Jarvis suggests; Jorge approves all outbound' }
  { level: 6, mode: 'Balanced', description: 'Jarvis drafts and queues; Jorge reviews batches' }
  { level: 9, mode: 'Autonomous', description: 'Jarvis executes routine; flags exceptions' }
  { level: 10, mode: 'Vacation', description: 'Full autonomy; Jorge informed of escalations only' }

=== TASK 9: CREATE src/data/portals.js ===
Export PORTALS array (12 objects). Each: name, type, tier, scanMethod, 
scanFrequency, active (boolean), notes.
  1. Austin-Bergstrom (AUS), federal, 1, browser, weekly, true, "Journey With AUS expansion"
  2. Broward County (FLL), federal, 1, browser, weekly, true, "Fort Lauderdale airport"
  3. DFW Airport, federal, 1, browser, biweekly, true, "Dallas/Fort Worth procurement"
  4. Miami-Dade Aviation (MIA), federal, 1, browser, weekly, true, "Jorge primary target"
  5. Orlando Airport (MCO/GOAA), federal, 1, browser, weekly, true, "GOAA procurement portal"
  6. PANYNJ, federal, 1, browser, weekly, true, "Port Authority of NY/NJ"
  7. SAM.gov, federal, 1, api, weekly, true, "Primary federal portal"
  8. USACE Caribbean, federal, 1, api, weekly, true, "PR USACE Fantastic Four pilot"
  9. BidNet Direct, municipal, 2, browser, biweekly, true, "Municipal aggregator"
  10. EUNA / Bonfire, municipal, 2, browser, weekly, true, "Shami primary portal"
  11. OpenGov Procurement, municipal, 2, browser, biweekly, true, "Municipal procurement"
  12. LinkedIn / Web Research, private, 3, manual, biweekly, true, "Tier 3 staff aug"

=== TASK 10: CREATE src/data/risks.js ===
Export RISKS array (8 objects). Each: risk, severity ('high'|'medium'), mitigation.
  1. Hallucinated contacts, high, "Deterministic sources only. Label confidence. Human review."
  2. Outreach reputation, high, "Draft only. Humans review, edit, send."
  3. Cost / token spikes, medium, "Weekly scans. Deep research after qualification. Caps."
  4. Noise overload, medium, "Limit sources. Refine keywords. Tier scoring."
  5. Team silos, medium, "Central Command Center with owner/status per opp."
  6. Context contamination, medium, "Separate projects/agents. Memory compaction."
  7. Remote access fragility, medium, "Verify stack once. Document permissions."
  8. Privacy risk, medium, "Purpose-bound access. Separate PDBM environment."

=== TASK 11: CREATE src/data/sprint.js ===
Export SPRINT array (7 objects). Each: day (number), title, description.
  1, Stabilize, "Fix auth, email, remote access"
  2, Scope, "Lock sources, keywords, taxonomy"
  3, Build, "Command Center pipeline + fields"
  4, Pilot, "PR USACE through full workflow"
  5, Train, "Yami/Shami + Julio onboarding"
  6, Review, "Show Jorge dashboard + pilot card"
  7, Operate, "Start Mon 6 AM scan cadence"

=== TASK 12: CREATE src/data/roadmap.js ===
Export ROADMAP object with keys: thirtyDay, sixtyDay, ninetyDay.
Each is an array of { item, importance }.
  30d: Reliability hardening (high), BIMSEARCH tracker MVP (high), Evidence model per claim (high)
  60d: Portal monitoring playbooks (high), Outbound approval queue (medium), Feedback labels (medium)
  90d: Team rollout permissions (high), Business-impact analytics (high), Model routing by task (medium)

=== TASK 13: CREATE src/data/people.js ===
Export PEOPLE array (5 objects). Each: name, role, org, description, device.
  Jorge Quiroz, CEO/Decision-maker, PDBM Consulting, "Clean dashboard, high-signal opps, low-friction review", iPad
  Julio Salazar, BIM PM/Operations Manager, PDBM Consulting, "Technical review, scope/resource/feasibility", TBD
  Shami/Yami, BD/Prequalification, PDBM Consulting, "Portal review, commodity codes, keyword filtering", TBD
  Sergio Villanueva-Meyer, Architect/Builder, INFRATEK LLC, "AI workflow builder, trainer, dashboard/automation", Desktop (Windows)
  Jesus, Collaborator, INFRATEK LLC, "Voice interaction design, conversational flow", TBD

=== TASK 14: CREATE src/data/agents.js ===
Export AGENTS array (4 objects). Each: name, model, runtime, description.
  Jarvis, openai-codex/gpt-5.5, Jorge Mac Mini, "Primary PDBM AI employee — opportunity radar, memory, documents"
  Friday, openai-codex/gpt-5.5, Jorge Mac Mini, "Deep research agent — portal scanning, LinkedIn, wild search"
  EDITH, openai-codex/gpt-5.5, Jorge Mac Mini, "Email/outreach drafts — separated from Jarvis for risk control"
  Deby, openai-codex/gpt-5.5, Sergio Mac Mini, "Debug/training/support environment"

=== TASK 15: CREATE src/data/strengths.js ===
Export STRENGTHS array (7 objects). Each: title, description, evidence.
  1. Telegram natural, "Jorge uses Jarvis where he already works", "Direct Telegram DM records"
  2. BD research engine, "Opportunities, contacts, primes, outreach angles — strongest flow", "Top themes/topics"
  3. Defined voice, "Specific, actionable tone rules", "SOUL.md + USER.md"
  4. Durable memory, "Context PDBM, MIA PG6, tiers and contacts preserved", "836 memory records"
  5. Correction loop, "Errors become permanent rules", "AGENTS.md"
  6. Artifact production, "Briefs, dashboards, JSON, PDF/HTML on demand", "jarvis-briefs"
  7. Graph email primary, "jarvis@pdbmconsulting.com stabilizes outbound", "TOOLS.md / MEMORY.md"

=== TASK 16: CREATE src/data/gaps.js ===
Export GAPS array (8 objects). Each: title, description, evidence.
  1. Reliability risk, "Email, CDP, memory, model — critical failure points", "Prompt errors + notes"
  2. Unstructured data, "Value lives in notes/transcripts, not clean events", "Memory-derived records"
  3. Rule sprawl, "Permanent rules accumulate; need pruning", "AGENTS/SOUL accumulation"
  4. Skills uneven, "Many skills, uneven cadence and metrics", "Skill usage"
  5. Portal fragility, "Browser/CDP is high-value but brittle", "TOOLS.md"
  6. Process leakage, "Jorge wants outcomes, not technical narration", "USER/SOUL"
  7. Feedback missing, "Satisfaction not captured structurally", "Workflow funnel"
  8. Hallucinated contacts, "89.2% confirmed pattern flagged as unreliable", "Pattern analysis"

=== TASK 17: CREATE src/data/questions.js ===
Export QUESTIONS array (25 objects). Each: id (q1-q25), category, question.
Categories: "Vision & Purpose", "Voice & Identity", "Workflow Priorities", 
"Pain Points", "Roadmap", "Investment", "Team & Process", "Puerto Rico"
Questions:
  q1, Vision, "Is Jarvis primarily a BD intelligence partner, an executive assistant, or an operations automation layer?"
  q2, Vision, "What's the 12-month outcome that would make Jarvis 'obviously worth it'?"
  q3, Vision, "Should Jarvis grow into a PDBM-wide platform or stay Jorge-centric?"
  q4, Vision, "Who else inside PDBM should have direct access?"
  q5, Voice, "Should Jarvis ever speak as PDBM publicly, or always behind Jorge?"
  q6, Voice, "Spanish-first, English-first, or bilingual by default?"
  q7, Voice, "How aggressive should voice be? Polished and corporate, or raw and direct?"
  q8, Workflow, "What's the single workflow that, if perfected, would justify Jarvis on its own?"
  q9, Workflow, "Where should Jarvis pull back vs push harder?"
  q10, Workflow, "Should Jorge approve every outbound message, or only flagged ones?"
  q11, Workflow, "Who owns the Command Center day-to-day — Jorge, Julio, or Shami?"
  q12, Pain Points, "What does Jarvis still get wrong often enough to erode trust?"
  q13, Pain Points, "What manual work do you wish Jarvis would just do without asking?"
  q14, Pain Points, "Where do you feel the system is fighting you instead of helping?"
  q15, Roadmap, "Lock 9-15 opportunity sources today, or wait for the team's input?"
  q16, Roadmap, "Activate Monday scan cadence next week, or supervise one more cycle?"
  q17, Roadmap, "Build the simplified front-end dashboard or keep working through GHL?"
  q18, Roadmap, "Prioritize PR USACE pilot or Top US Airports first?"
  q19, Investment, "Is the current $5K + $450/mo model right for this scope?"
  q20, Investment, "Should there be a finder's fee on JARVIS-sourced wins?"
  q21, Investment, "Anthropic partnership — pursue discounts, training, certifications?"
  q22, Team, "Who does the 3-session training first — Jorge, Julio, or Shami?"
  q23, Team, "Should Sergio remain the only Jarvis architect, or train internal capability?"
  q24, Team, "How do we capture Jorge's voice for outbound — interview, recordings, or examples?"
  q25, Puerto Rico, "Option A (info handoff) or Option B (finder's fee)?"

=== TASK 18: CREATE src/data/needs.js ===
Export NEEDS array (5 objects). Each: area, severity (1-5), notes (array of strings).
  Infraestructura, 5, ["Email/Graph healthchecks invisible", "Gmail deprecated; Graph primary", "Browser access must validate before promising research"]
  Automatización, 5, ["Opportunity tracker / BIMSEARCH dashboard", "Follow-ups / deadlines / CRM still semi-manual", "Cron / heartbeat needs calibration"]
  Memoria, 5, ["Auto-promotion of daily notes", "Corrections to permanent files", "Separate transcript vs memory-derived evidence"]
  Investigación, 4, ["Airport RFP playbook needed", "Primary sources and confidence per claim", "Reprioritize hot vs pipeline"]
  Comunicación, 4, ["Results-first, no process narration", "LinkedIn/email in JQ voice", "Outbound always with approval trail"]

All files use named exports. Follow the pattern of existing files in src/data/.
```

---

### T3 — Prompt 3: Three.js Hero + Shared Components + Hooks + Utilities

Open Claude Code terminal 3 and paste:

```
I'm building a React + Three.js project. Read CLAUDE.md for the full design system.
The dev server is already running. Your job is to build or improve:
1. The 3D hero scene
2. Two new shared components
3. Three custom hooks
4. Two utility modules

=== DESIGN SYSTEM (critical — follow exactly) ===
Background: #060A18
Primary accent: #00F0FF (electric cyan)
Secondary accent: #FFB547 (amber)
Glass cards: rgba(12,16,35,0.7) + backdrop-filter blur(12px)
Display font: Syne (700-800, letter-spacing -1px to -2px)
Body font: DM Sans
Data labels: JetBrains Mono (uppercase, letter-spacing 2-3px, 10-11px size)
Reveal easing: cubic-bezier(0.16, 1, 0.3, 1), 800ms
Text primary: #E2E8F0
Text secondary: rgba(200,214,229,0.6)
Text tertiary: rgba(200,214,229,0.35)
Text muted: rgba(200,214,229,0.2)

=== TASK 1: Review and improve src/three/HeroScene.jsx ===
This file already exists. Read it, then improve it to be production quality.
It should use @react-three/fiber and render:
- 500 particles as a Points mesh with BufferGeometry
  - Vertex colors: 70% blue-grey (0.3, 0.4, 0.6), 20% cyan (0, 0.94, 1.0), 10% amber (1.0, 0.7, 0.28)
  - PointsMaterial: size 1.8, vertexColors, transparent, opacity 0.8, AdditiveBlending
  - Each frame: update positions by velocity, bounce at ±30 x, ±20 y, ±15 z
- Connection lines (LineSegments) between particles closer than distance 8
  - Max 200 line segments. Cyan, opacity 0.08, additive blending.
  - Recalculate every frame using the first 80 particles
- Wireframe icosahedron (radius 4, detail 1, cyan, opacity 0.12, rotating slowly)
- Two torus rings:
  - Ring 1: radius 12, tube 0.05, cyan, opacity 0.15, initial rotation x=PI/2.5
  - Ring 2: radius 16, tube 0.03, amber, opacity 0.08, initial rotation x=PI/3 y=PI/6
  - Both rotate z-axis slowly in opposite directions
- ScrollCamera component that reads a scrollProgress prop (0 to 1)
  and smoothly moves camera Y and rotation X using lerp
The default export is a HeroScene component that takes a scrollProgress prop
and wraps everything in a Canvas from @react-three/fiber.

=== TASK 2: Create src/components/GlassCard.jsx ===
A reusable glassmorphism card container:
  - Uses the CSS class "glass-card" from index.css
  - Props: children, className (optional), style (optional)
  - Simply renders a div with the glass-card class + merged className/style
  - Default export

=== TASK 3: Create src/components/SectionHeader.jsx ===
A reusable section header with label + title:
  - Props: label (string, e.g. "Chapter I"), children (the heading content)
  - Wraps in Reveal component (import from ./Reveal)
  - Renders: <div className="section-label">{label}</div>
  - Then: <h2 className="section-heading" style fontSize clamp(28px, 4vw, 48px)>{children}</h2>
  - Default export

=== TASK 4: Create src/hooks/useScrollProgress.js ===
Custom hook that takes a ref to a scrollable container
and returns a number 0-1 representing scroll progress.
Uses a passive scroll event listener. Cleans up on unmount.
Export default.

=== TASK 5: Create src/hooks/useActiveSection.js ===
Custom hook that takes a ref to a scrollable container
and returns the index of the currently visible [data-section] element.
Uses IntersectionObserver with threshold 0.3.
Export default.

=== TASK 6: Create src/hooks/useReducedMotion.js ===
Custom hook that returns true if the user has prefers-reduced-motion enabled.
Uses window.matchMedia('(prefers-reduced-motion: reduce)').
Listens for changes. Export default.

=== TASK 7: Create src/lib/easing.js ===
Export two functions:
  easeOutQuart(t) — returns 1 - Math.pow(1 - t, 4)
  easeOutExpo(t) — returns t === 1 ? 1 : 1 - Math.pow(2, -10 * t)

=== TASK 8: Create src/lib/format.js ===
Export three functions:
  formatNumber(n) — returns n.toLocaleString()
  formatPercent(n, total) — returns Math.round((n / total) * 100) + '%'
  formatCurrency(n) — returns '$' + n.toLocaleString()

After creating all files, verify no import errors in the dev server.
```

---

### T4 — Prompt 4: Sections 0 through 4

Open Claude Code terminal 4 and paste:

```
I'm building a React scrolling website. Read CLAUDE.md for the design system.
The dev server is running. Review and improve sections 0 through 4.

These files already exist in src/sections/ — read each one, then rewrite it 
to be production quality using proper imports and the full data.

Import shared components from src/components/ (Reveal, Counter, ChartTooltip, 
GlassCard if it exists, SectionHeader if it exists — if they don't exist yet, 
inline the functionality).

Import data from src/data/. NEVER hardcode data values.

=== SECTION 0: src/sections/HeroSection.jsx ===
Full viewport height hero with the 3D scene behind text.
- Import HeroScene from '../three/HeroScene'
- HeroScene is absolute positioned (inset 0, z-index 0) behind everything
- Bottom gradient overlay: 40% height, from #060A18 to transparent, z-index 1
- Content centered (z-index 2):
  - Section label (JetBrains Mono): "INFRATEK-PDBM-MTR-2026-FINAL"
  - H1 (Syne, clamp 42px/8vw/96px, weight 800, letter-spacing -2px):
    "Jarvis" in glow-text class, then " × " in faint white, then "PDBM"
  - Subtitle (Syne, clamp 16px/2.5vw/24px): 
    "Definitive Mid-Term Review — 75 Days of Intelligence"
  - Metadata row (JetBrains Mono, 12px, cyan 50% opacity):
    "Feb 10 → Apr 26, 2026 | Dorado, Puerto Rico | 4,103 interactions"
  - Scroll indicator at bottom: pill outline (24×40px, rounded, cyan border)
    with small inner dot, floating animation (CSS keyframe "float")
- Props: scrollProgress (number, passed to HeroScene)
- data-section="0" on the outer element

=== SECTION 1: src/sections/KpiSection.jsx ===
"By the Numbers" section.
- data-section="1", padding 120px top
- Container max-width 1200px centered
- Section label "Chapter I" + heading with "Numbers" in glow-text
- 6 KPI cards in CSS grid: gridTemplateColumns repeat(auto-fit, minmax(160px, 1fr)), gap 16px
  - Import KPIS from '../data/kpis'
  - Each card: glass-card + kpi-card classes, padding 28px 24px, text-align center
  - Number: Syne, clamp(28px,4vw,42px), weight 800, color #00F0FF
    Use Counter component with stagger delay (i * 120ms)
  - Label: JetBrains Mono, 11px, letter-spacing 2px, uppercase, color tertiary
  - Wrap each in Reveal with delay={i * 80}
- Below the grid: North Star quote block
  - Left border 3px solid cyan, background rgba(0,240,255,0.02), border-radius 0 12px 12px 0
  - Quote text (Syne, italic, clamp 16px/2vw/20px): 
    "Be Jorge's proactive right hand..."
  - Attribution: JetBrains Mono, 11px, cyan 40%, "— NORTH STAR DIRECTIVE"
  - Wrap in Reveal delay={500}

=== SECTION 2: src/sections/VelocitySection.jsx ===
Daily message velocity chart.
- data-section="2", padding 80px top 120px bottom
- Section label "Signal Density" + heading with "Velocity" in glow-text
- Description text: "75 days of interaction. Peak: 1,078 messages on April 25 — GPT-5.5 migration day."
- Import DAILY_MESSAGES from '../data/daily-messages'
- Import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
- Glass card containing ResponsiveContainer width="100%" height={280}
- AreaChart with:
  - linearGradient defs: id="msgGrad", cyan 40% opacity top → 0% bottom
  - XAxis dataKey="day", tick fill rgba(200,214,229,0.25) fontSize 10
  - YAxis same styling, no axis line
  - Tooltip content={<ChartTooltip />}
  - Area type="monotone" dataKey="messages" stroke="#00F0FF" strokeWidth 2
    fill="url(#msgGrad)" dot={false}
    activeDot r=4 fill cyan stroke #060A18 strokeWidth 2
- If src/data/era-volume.js exists, add a second chart below:
  "Anthropic vs OpenAI" stacked AreaChart with two Area series
  (anthropic = cyan, openai = amber). If the file doesn't exist, skip this.

=== SECTION 3: src/sections/SentimentSection.jsx ===
Sentiment analysis with pie + bar charts.
- data-section="3", padding 80px top 120px bottom
- Section label "Chapter III" + heading with "Pulse" in glow-text
- Two-column grid: gridTemplateColumns repeat(auto-fit, minmax(280px, 1fr)), gap 24px
- LEFT CARD (glass card, padding 32px):
  - Title: "Overall — 4,103 interactions" (Syne, 18px, weight 600)
  - Import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
  - Import SENTIMENT_OVERALL from '../data/sentiment'
  - PieChart: Pie innerRadius 55 outerRadius 90 paddingAngle 3 stroke="none"
  - Cell colors: Productive=#00F0FF, Neutral=#3A4A6B, Frustrated=#FF4D6A, Exploratory=#FFB547
  - Legend below: flex row, wrap, centered, each item has 8×8 color swatch + name + percentage
- RIGHT CARD (glass card, padding 32px):
  - Title: "Claude vs GPT-5.5"
  - Import SENTIMENT_COMPARISON from '../data/sentiment'
  - Import { BarChart, Bar } from 'recharts'
  - Grouped BarChart: XAxis=name, two Bar series (claude=cyan, gpt=amber)
  - Bar radius [4,4,0,0]
  - Annotation below: "Anthropic carries relationship history..."
- If src/data/sentiment-daily.js exists, add a third full-width card below 
  with a stacked AreaChart of daily sentiment over time. If not, skip.

=== SECTION 4: src/sections/TopicsSection.jsx ===
Topic distribution + action verb radar.
- data-section="4", padding 80px top 120px bottom
- Section label "Chapter IV" + heading with "Asks" in glow-text
- Two-column grid: min 300px
- LEFT CARD:
  - Title: "Topic Distribution"
  - Import TOPICS from '../data/topics'
  - Horizontal BarChart (layout="vertical")
  - linearGradient: id="topicGrad", from #0077B6 to #00F0FF
  - Bar fill="url(#topicGrad)" radius [0,6,6,0]
  - YAxis width 85 for labels
  - Height 320px
- RIGHT CARD:
  - Title: "Action Verbs — Radar"
  - Import ACTION_VERBS from '../data/verbs'
  - RadarChart with PolarGrid stroke rgba(0,240,255,0.1)
  - Radar stroke cyan, fill cyan fillOpacity 0.15, strokeWidth 2
  - PolarRadiusAxis hidden, domain [0,10]
  - Height 320px
  - Annotation: "Execution-oriented commands dominate."

After rewriting all 5 files, check that the dev server compiles without errors.
```

---

### T5 — Prompt 5: Sections 5 through 7 + New Chapter Sections

Open Claude Code terminal 5 and paste:

```
I'm building a React scrolling website. Read CLAUDE.md for the design system.
The dev server is running. Your job is to build sections 5, 6, 7 AND create 
new sections for the additional chapters in the document.

Import Reveal from '../components/Reveal'.
Import ChartTooltip from '../components/ChartTooltip'.
Import data from '../data/' files.
If a data file doesn't exist yet, check if it's being created by another 
terminal — if so, create the section anyway with a try/catch or conditional 
import. Use optional chaining (data?.length) to guard against undefined.

=== SECTION 5: src/sections/EntitySection.jsx ===
- data-section="5"
- "Chapter V" + "Entity Graph" (glow-text)
- Import ENTITIES from '../data/entities'
- 14 entities with ranked progress bars inside a glass-card
- For each entity:
  - Row with: type indicator (6px dot, circle for person, square for company, diamond for project)
    + name (Syne 600, 15px) + type badge (JetBrains Mono 10px, muted)
    + mention count right-aligned (JetBrains Mono 13px)
  - Progress bar below: 6px height, rounded, background rgba(0,240,255,0.06)
  - Fill width = (entity.mentions / 2600) * 100 + '%'
  - Color: person = linear-gradient(90deg, #FFB547, #FF8C00)
           company = linear-gradient(90deg, #0077B6, #00F0FF)
           project = linear-gradient(90deg, #7C3AED, #A855F7)
- Each row in Reveal delay={i * 60}

=== SECTION 6: src/sections/TimelineSection.jsx ===
- data-section="6"
- "Chapter II" + "The Journey" (glow-text)
- Import MILESTONES from '../data/milestones'
- Import { PHASE_COLORS } from '../data/meta'
- Vertical timeline with left padding 32px
- Vertical line: absolute, left 11px, 1px width, gradient cyan to faint
- 11 milestones, each:
  - Dot: absolute left -27px, 12px circle, border 2px colored by phase, bg #060A18
  - Card (milestone-card class):
    - Flex row: label (Syne 600, 16px) + date (JetBrains Mono 11px, tertiary)
    - Phase badge (pill shape, phase color at 15% bg + 30% border)
    - Description text below if it exists (DM Sans, 13px, tertiary)
  - Wrap in Reveal delay={i * 100}

=== SECTION 7: src/sections/ArcSection.jsx ===
- data-section="7" (will be renumbered later when more sections are added)
- Max-width 900px, centered, text-align center
- Section label "The Arc"
- Heading: "From conversational assistant → emergent BD intelligence layer → multi-model operating system."
  The middle part "emergent BD intelligence layer" uses glow-text
- Three summary stats inline: 85 Jorge Messages, 4 Phases, 17 Chapters
  Each: number in Syne 48px weight 800 cyan, label in JetBrains Mono 10px
- Quote block below (glass card with cyan border):
  Final principle text about being "boringly useful"
- Jorge quote: "Yo necesito esto, Sergio... Quiero que te lleves la idea, yo lo necesito."
  Attribution: "— Jorge Quiroz, January 28, 2026"
- Footer: JetBrains Mono 11px, muted, letter-spacing 2px:
  "PDBM CONSULTING × INFRATEK AI — DORADO, PR — 2026"

=== NEW: src/sections/StrengthsGapsSection.jsx ===
- data-section="8"
- "Chapters VI & VII" + "What Works & What Hurts" (glow-text on "Works", red on "Hurts")
- Try to import STRENGTHS from '../data/strengths' and GAPS from '../data/gaps'
  If imports fail, use placeholder arrays
- Two-column grid (min 300px)
- LEFT: Strengths card
  - Title "What's Working" with green dot indicator (#34D399)
  - List each strength: title bold, description normal, evidence in mono/tertiary
  - Each wrapped in Reveal
- RIGHT: Gaps card
  - Title "What Hurts" with red dot indicator (#FF4D6A)
  - Same layout as strengths but red accent

=== NEW: src/sections/PipelineSection.jsx ===
- data-section="9"
- "Chapters IX & X" + "Command Center" (glow-text)
- Try to import { PIPELINE_STAGES, AUTONOMY_KNOB } from '../data/pipeline'
  and PORTALS from '../data/portals'
- Sub-section 1: Pipeline Flow
  - Horizontal flex row of stage pills (glass card style, small)
  - Connected by thin cyan lines between them
  - Stages: Radar → Qualified → Jorge Review → Contact → Proposal → Won/Lost
- Sub-section 2: The Knob (Autonomy Levels)
  - Visual representation: row of 5 level indicators
  - Each shows level number, mode name, description
  - Current level (3 Conservative) highlighted
- Sub-section 3: Portal Inventory
  - Grid of portal cards (3 columns desktop, 1 mobile)
  - Each card: name, tier badge (colored), scan frequency, scan method
  - Tier 1 = cyan, Tier 2 = amber, Tier 3 = purple

=== NEW: src/sections/RiskSection.jsx ===
- data-section="10"
- "Chapter XIII" + "Risk Register" (glow-text)
- Try to import RISKS from '../data/risks'
- Grid of risk cards (2 columns desktop)
- Each card (glass-card):
  - Severity badge: high = red pill, medium = amber pill
  - Risk title (Syne 600)
  - Mitigation text (DM Sans, secondary color)

=== NEW: src/sections/SprintSection.jsx ===
- data-section="11"
- "Chapter XIV" + "7-Day Sprint" (glow-text)
- Try to import SPRINT from '../data/sprint'
- 7 cards in a horizontal scrollable row (flex, overflow-x auto, gap 16px)
  or a responsive grid
- Each card: day number large (Syne 48px, cyan), title (Syne 600), description
- Cards get progressively different accent colors

=== NEW: src/sections/PeopleSection.jsx ===
- data-section="12"
- "Chapter XII" + "People & Agents" (glow-text)
- Try to import PEOPLE from '../data/people' and AGENTS from '../data/agents'
- Two sub-sections:
  - "The Team" — grid of 5 people cards
    Each: name (Syne 600), role, org (amber), description, device
  - "The Agents" — grid of 4 agent cards (different styling, tech look)
    Each: name (Syne 600, cyan), model (JetBrains Mono), runtime, description

=== NEW: src/sections/RoadmapSection.jsx ===
- data-section="13"
- "Chapter XV" + "The Road Ahead" (glow-text)
- Try to import ROADMAP from '../data/roadmap' and NEEDS from '../data/needs'
- Three columns: "30 Days", "60 Days", "90 Days"
  Each lists items with importance badges (high=cyan, medium=amber)
- Below: "Unresolved Needs" — 5 items
  Each: area name, severity bar (filled to severity/5), notes list

=== NEW: src/sections/QuestionsSection.jsx ===
- data-section="14"
- "Chapter XVI" + "25 Crucial Questions" (glow-text)
- Try to import QUESTIONS from '../data/questions'
- Group questions by category
- Each category: label header (JetBrains Mono, uppercase, cyan)
- Questions listed below each category label
  Each: number (q1-q25 in mono), question text (DM Sans)
- Clean editorial layout, generous line-height

After creating all files, check for any import errors in the dev server console.
If a data file doesn't exist yet, wrap the import in a try/catch or use 
a fallback empty array so the section still renders.
```

---

## PHASE C — Integration & Polish

> **Run after Phase B finishes. T1 first, then T2.**

---

### T1 — Prompt 6: Wire Everything Together

Open Claude Code terminal 1 and paste:

```
All sections and components have been built by other terminals.
Now I need to wire everything together.

STEP 1: Update src/data/meta.js
Expand the SECTIONS array to list ALL sections that exist in src/sections/.
List every .jsx file in src/sections/ and create an entry for each.
The order should be:
  hero (0), kpis (1), velocity (2), sentiment (3), topics (4), 
  entities (5), timeline (6), strengthsGaps (7), pipeline (8), 
  risks (9), sprint (10), people (11), roadmap (12), questions (13), arc (14)
Only include sections that actually exist as files. Skip any that weren't created.

STEP 2: Update src/App.jsx
- Import ALL section components that exist in src/sections/
- Import NavDots from components
- Render all sections in order inside <main>, each with the correct props
- HeroSection gets scrollProgress prop
- All others get no props
- Make sure data-section attributes are sequential (0, 1, 2, 3...)

STEP 3: Update src/components/NavDots.jsx
- Import SECTIONS from '../data/meta'
- If there are more than 10 sections, reduce dot size to 6px
- Add title attributes from the SECTIONS labels

STEP 4: Run npm run dev
- Fix ALL import errors
- Fix ALL missing file errors
- Fix ALL rendering errors
- Common issues:
  - Data files that don't exist yet: use try/catch or conditional imports
  - Components not yet created: inline the functionality
  - Wrong import paths
  - Missing named exports

STEP 5: Report the final state
- How many sections render?
- Any remaining errors?
- Does the 3D hero work?
- Do the charts show data?
```

---

### T2 — Prompt 7: Final Polish & Deploy

Open Claude Code terminal 2 and paste:

```
The site is working. Now do the final polish pass for award-winning quality.

STEP 1: RESPONSIVE DESIGN
Test the layout mentally at these breakpoints:
- 375px (mobile): Hide Three.js hero (show CSS gradient instead), 
  hide NavDots, single-column grids, chart heights 200px, 
  reduce section padding to 60px top
- 768px (tablet): Two-column where appropriate, simplified hero
- 1440px (desktop): Full experience, max-width 1200px container

Add a @media (max-width: 640px) section to src/index.css for mobile overrides.
In HeroSection, conditionally render the 3D scene only on screens > 768px
using a state variable checked on mount.

STEP 2: LOADING STATE
Add a simple loading overlay to App.jsx:
- Full viewport, bg-primary background
- Centered: pulsing dot (8px, cyan, CSS animation) + 
  "Initializing..." text (JetBrains Mono, 11px, muted)
- After 1.5 seconds (or when Three.js Canvas mounts), fade out and remove
- Use useState + useEffect with a timeout

STEP 3: ACCESSIBILITY
- Ensure all nav dots have aria-label attributes
- Add role="region" and aria-label to each section
- Skip-to-content link (hidden, visible on focus)

STEP 4: PERFORMANCE CHECK
- Run: npm run build
- Report the output sizes
- If total JS > 1MB, check if Three.js can be further tree-shaken
  by moving the manualChunks config into vite.config.js:
  build.rollupOptions.output.manualChunks = {
    three: ['three', '@react-three/fiber', '@react-three/drei'],
    charts: ['recharts'],
    motion: ['framer-motion'],
  }

STEP 5: GIT COMMIT
- git add .
- git commit -m "feat: complete Jarvis × PDBM immersive mid-term review

  - 15 scrolling sections covering all 17 document chapters
  - Three.js particle constellation hero with R3F
  - 6+ Recharts data visualizations
  - Framer Motion scroll reveals
  - Full design system: Syne + DM Sans + JetBrains Mono
  - Responsive with mobile fallback
  - All data from INFRATEK-PDBM-MTR-2026-FINAL"
- git push origin main

Report: build sizes, any warnings, deployment URL if available.
```

---

## Emergency Fix Prompt

If any terminal hits unrecoverable errors, use this in any terminal:

```
The project has errors. Please do this:

1. Run: npm run dev
2. Read every error in the terminal output
3. For each error:
   - If it's a missing file: create it with a minimal valid export
   - If it's a bad import path: fix the path
   - If it's an undefined variable: check the data file exports
   - If it's a React error: check JSX syntax
4. Keep fixing until the dev server compiles with zero errors
5. Open localhost in the browser and check for runtime console errors too
6. Report what was wrong and what you fixed
```

---

## Verification Checklist (after all phases)

Run through this mentally or in a final terminal:

```
[ ] Dev server runs without errors (npm run dev)
[ ] 3D hero scene renders with particles, lines, geometry
[ ] All KPI counters animate on scroll
[ ] Area chart shows 57-day message data with tooltips
[ ] Sentiment pie chart + bar chart render
[ ] Topics horizontal bar + radar chart render
[ ] Entity progress bars fill proportionally
[ ] Timeline shows 11 milestones with phase colors
[ ] Strengths/Gaps section shows 7+8 items
[ ] Pipeline section shows stages + portals
[ ] Risk register shows 8 risks
[ ] Sprint shows 7 days
[ ] People shows 5 people + 4 agents
[ ] Roadmap shows 30/60/90 day items
[ ] Questions shows 25 questions grouped by category
[ ] Arc section closes with Jorge quote
[ ] Nav dots track all sections
[ ] Scroll reveals trigger on first view
[ ] No console errors
[ ] Production build succeeds (npm run build)
```
