# COMMS.md — Terminal Orchestration Board
## Jarvis × PDBM — Immersive Mid-Term Review

**Last updated:** 2026-04-27 · by Orchestrator (Claude Chat)
**Status:** 🟡 IN PROGRESS — Phase A ready

---

## HOW TO USE THIS FILE

Each Claude Code terminal MUST:
1. **READ this file** at the start of every task
2. **UPDATE your section** when you start/finish work
3. **CHECK blockers** before modifying shared files
4. **NEVER modify another terminal's owned files** without updating COMMS.md first
5. **When done with a task**, change its status to ✅ and add a timestamp

---

## PROJECT STATUS

| Component | Terminal | Status | Last Update | Notes |
|---|---|---|---|---|
| Foundation (merge, install, verify) | T1 | ⬜ TODO | | Must run first |
| Data Layer (20 data files) | T2 | ⬜ TODO | | Depends on T1 |
| 3D Hero + Components + Hooks | T3 | ⬜ TODO | | Depends on T1 |
| Sections 0–4 | T4 | ⬜ TODO | | Depends on T1 |
| Sections 5–14 (existing + new) | T5 | ⬜ TODO | | Depends on T1 |
| Integration (wire App.jsx) | T1 | ⬜ TODO | | Depends on T2–T5 |
| Polish & Deploy | T2 | ⬜ TODO | | Depends on Integration |

---

## TASK BOARD

### Phase A — Foundation (T1 only, sequential)

| # | Task | Owner | Status | File(s) |
|---|---|---|---|---|
| A1 | Merge jarvis-pdbm-source/ files into root src/ | T1 | ⬜ TODO | src/* |
| A2 | Run npm install | T1 | ⬜ TODO | node_modules/ |
| A3 | Run npm run dev, fix errors until clean | T1 | ⬜ TODO | various |

### Phase B — Parallel Build (T2 + T3 + T4 + T5)

| # | Task | Owner | Status | File(s) |
|---|---|---|---|---|
| B1 | Update existing data files (entities, milestones, verbs) | T2 | ⬜ TODO | src/data/entities.js, milestones.js, verbs.js |
| B2 | Create sentiment-daily.js, era-volume.js | T2 | ⬜ TODO | src/data/sentiment-daily.js, era-volume.js |
| B3 | Create commercial.js, tiers.js, pipeline.js | T2 | ⬜ TODO | src/data/commercial.js, tiers.js, pipeline.js |
| B4 | Create portals.js, risks.js, sprint.js | T2 | ⬜ TODO | src/data/portals.js, risks.js, sprint.js |
| B5 | Create roadmap.js, people.js, agents.js | T2 | ⬜ TODO | src/data/roadmap.js, people.js, agents.js |
| B6 | Create strengths.js, gaps.js, questions.js, needs.js | T2 | ⬜ TODO | src/data/strengths.js, gaps.js, questions.js, needs.js |
| B7 | Refine HeroScene.jsx (3D particles, lines, geo, rings) | T3 | ⬜ TODO | src/three/HeroScene.jsx |
| B8 | Create GlassCard.jsx, SectionHeader.jsx | T3 | ⬜ TODO | src/components/GlassCard.jsx, SectionHeader.jsx |
| B9 | Create hooks (useScrollProgress, useActiveSection, useReducedMotion) | T3 | ⬜ TODO | src/hooks/*.js |
| B10 | Create lib utilities (easing.js, format.js) | T3 | ⬜ TODO | src/lib/*.js |
| B11 | Build HeroSection.jsx | T4 | ⬜ TODO | src/sections/HeroSection.jsx |
| B12 | Build KpiSection.jsx | T4 | ⬜ TODO | src/sections/KpiSection.jsx |
| B13 | Build VelocitySection.jsx | T4 | ⬜ TODO | src/sections/VelocitySection.jsx |
| B14 | Build SentimentSection.jsx | T4 | ⬜ TODO | src/sections/SentimentSection.jsx |
| B15 | Build TopicsSection.jsx | T4 | ⬜ TODO | src/sections/TopicsSection.jsx |
| B16 | Build EntitySection.jsx, TimelineSection.jsx, ArcSection.jsx | T5 | ⬜ TODO | src/sections/Entity*.jsx, Timeline*.jsx, Arc*.jsx |
| B17 | Create StrengthsGapsSection.jsx | T5 | ⬜ TODO | src/sections/StrengthsGapsSection.jsx |
| B18 | Create PipelineSection.jsx | T5 | ⬜ TODO | src/sections/PipelineSection.jsx |
| B19 | Create RiskSection.jsx, SprintSection.jsx | T5 | ⬜ TODO | src/sections/Risk*.jsx, Sprint*.jsx |
| B20 | Create PeopleSection.jsx, RoadmapSection.jsx, QuestionsSection.jsx | T5 | ⬜ TODO | src/sections/People*.jsx, Roadmap*.jsx, Questions*.jsx |

### Phase C — Integration & Polish (T1 then T2)

| # | Task | Owner | Status | File(s) |
|---|---|---|---|---|
| C1 | Update meta.js SECTIONS array for all sections | T1 | ⬜ TODO | src/data/meta.js |
| C2 | Rewrite App.jsx to import all sections | T1 | ⬜ TODO | src/App.jsx |
| C3 | Update NavDots for expanded sections | T1 | ⬜ TODO | src/components/NavDots.jsx |
| C4 | Fix all import/render errors | T1 | ⬜ TODO | various |
| C5 | Responsive design (mobile, tablet) | T2 | ⬜ TODO | src/index.css, sections |
| C6 | Loading state, accessibility, perf | T2 | ⬜ TODO | src/App.jsx, index.html |
| C7 | Git commit + push | T2 | ⬜ TODO | all |

---

## FILE OWNERSHIP

Terminals MUST respect file ownership. To modify a file owned by another terminal, update COMMS.md first.

```
T1 owns:
  src/App.jsx
  src/main.jsx
  src/index.css
  src/data/meta.js
  package.json
  vite.config.js
  index.html
  COMMS.md (primary updater)

T2 owns:
  src/data/entities.js
  src/data/milestones.js
  src/data/verbs.js
  src/data/sentiment-daily.js
  src/data/era-volume.js
  src/data/commercial.js
  src/data/tiers.js
  src/data/pipeline.js
  src/data/portals.js
  src/data/risks.js
  src/data/sprint.js
  src/data/roadmap.js
  src/data/people.js
  src/data/agents.js
  src/data/strengths.js
  src/data/gaps.js
  src/data/questions.js
  src/data/needs.js

T3 owns:
  src/three/HeroScene.jsx
  src/components/GlassCard.jsx
  src/components/SectionHeader.jsx
  src/components/Reveal.jsx
  src/components/Counter.jsx
  src/components/ChartTooltip.jsx
  src/hooks/useScrollProgress.js
  src/hooks/useActiveSection.js
  src/hooks/useReducedMotion.js
  src/lib/easing.js
  src/lib/format.js

T4 owns:
  src/sections/HeroSection.jsx
  src/sections/KpiSection.jsx
  src/sections/VelocitySection.jsx
  src/sections/SentimentSection.jsx
  src/sections/TopicsSection.jsx

T5 owns:
  src/sections/EntitySection.jsx
  src/sections/TimelineSection.jsx
  src/sections/ArcSection.jsx
  src/sections/StrengthsGapsSection.jsx
  src/sections/PipelineSection.jsx
  src/sections/RiskSection.jsx
  src/sections/SprintSection.jsx
  src/sections/PeopleSection.jsx
  src/sections/RoadmapSection.jsx
  src/sections/QuestionsSection.jsx

SHARED (coordinate via COMMS.md):
  src/components/NavDots.jsx (T3 creates, T1 updates in Phase C)
  src/data/kpis.js (T2 may update, T4 reads)
  src/data/daily-messages.js (T2 may update, T4 reads)
  src/data/sentiment.js (T2 may update, T4 reads)
  src/data/topics.js (T2 may update, T4 reads)
```

---

## TERMINAL LOG

### T1 — Foundation + Integration
```
```

### T2 — Data Layer
```
```

### T3 — 3D + Components + Hooks
```
```

### T4 — Sections 0–4
```
```

### T5 — Sections 5–14
```
```

### ORCHESTRATOR
```
2026-04-27: Project initialized. CLAUDE.md + COMMS.md created.
2026-04-27: Existing state: 8 data files in src/data/, extracted source in jarvis-pdbm-source/
2026-04-27: Phase A prompt ready for T1. Phase B prompts ready for T2-T5.
```

---

## BLOCKERS

```
(none yet)
```

---

## DECISION LOG

| Date | Decision | Made by | Impact |
|---|---|---|---|
| 2026-04-27 | Use JSX not TypeScript (matches existing scaffold) | Orchestrator | All files are .jsx |
| 2026-04-27 | 15 total sections covering all 17 chapters | Orchestrator | Some chapters combined |
| 2026-04-27 | Data files guard with optional chaining for cross-terminal safety | Orchestrator | T4/T5 can render even if T2 hasn't finished |
| 2026-04-27 | ArcSection is always LAST section regardless of index | Orchestrator | Arc closes the narrative |

---

## NEXT SPRINT

- [ ] WebGPU/TSL upgrade when browser support > 95%
- [ ] html-in-canvas page transitions (Chrome Canary only)
- [ ] Dynamic data from Convex/Limitless API
- [ ] PDF export
- [ ] Presentation mode (auto-advancing)
