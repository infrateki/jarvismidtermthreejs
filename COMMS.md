# COMMS.md — Terminal Orchestration Board
## Jarvis × PDBM — v2 Enhancement Sprint

**Last updated:** 2026-04-27 · by Orchestrator
**Status:** 🟡 READY — Phase A can start
**Sprint goal:** Dark/light theme toggle + 3D BIM showcase + shader enhancements

---

## HOW TO USE THIS FILE

Each Claude Code terminal MUST:
1. **READ this file** at the start of every task
2. **UPDATE your section** when you start/finish work
3. **CHECK blockers** before modifying shared files
4. **NEVER modify another terminal's owned files** without updating COMMS.md first
5. **When done**, change status to ✅ and add a timestamp

---

## PROJECT STATUS

| Component | Terminal | Status | Last Update | Notes |
|---|---|---|---|---|
| Theme infrastructure (context, CSS, toggle) | T1 | ⬜ TODO | | Run first |
| 3D BIM Showcase section | T2 | ⬜ TODO | | After T1 |
| Enhanced Three.js + shader FX | T3 | ⬜ TODO | | After T1 |
| Theme-ify sections 0–7 + charts | T4 | ⬜ TODO | | After T1 |
| Theme-ify sections 8–14 + integration | T5 | ⬜ TODO | | After T1 |

---

## TASK BOARD

### Phase A — Theme Foundation (T1 only, sequential)

| # | Task | Owner | Status | File(s) |
|---|---|---|---|---|
| A1 | Create ThemeContext (React context + provider) | T1 | ⬜ TODO | src/hooks/useTheme.js |
| A2 | Add [data-theme="light"] CSS variables to index.css | T1 | ⬜ TODO | src/index.css |
| A3 | Add theme toggle button component | T1 | ⬜ TODO | src/components/ThemeToggle.jsx |
| A4 | Wire ThemeProvider + toggle into App.jsx | T1 | ⬜ TODO | src/App.jsx |
| A5 | Update glass-card, glow-text, milestone-card for light mode | T1 | ⬜ TODO | src/index.css |
| A6 | Verify: toggling dark↔light swaps all CSS vars | T1 | ⬜ TODO | — |

### Phase B — Parallel Build (T2 + T3 + T4 + T5)

| # | Task | Owner | Status | File(s) |
|---|---|---|---|---|
| B1 | Create BIM building geometry (procedural hospital/terminal) | T2 | ⬜ TODO | src/three/BIMBuilding.jsx |
| B2 | Create BIMShowcaseSection with R3F scene | T2 | ⬜ TODO | src/sections/BIMShowcaseSection.jsx |
| B3 | Make BIM scene theme-aware (dark=glow wireframe, light=pastel solid) | T2 | ⬜ TODO | src/three/BIMBuilding.jsx |
| B4 | Add floating architectural elements to Hero (wireframe shapes) | T3 | ⬜ TODO | src/three/HeroScene.jsx |
| B5 | Make HeroScene theme-aware (particle colors, bg, ring colors) | T3 | ⬜ TODO | src/three/HeroScene.jsx |
| B6 | Create section divider 3D strip (noise shader or wave) | T3 | ⬜ TODO | src/three/SectionDivider.jsx |
| B7 | Theme-ify sections 0–3 (Hero, KPIs, Velocity, Sentiment) | T4 | ⬜ TODO | src/sections/Hero*, Kpi*, Velocity*, Sentiment* |
| B8 | Theme-ify sections 4–7 (Topics, Entities, Timeline, StrengthsGaps) | T4 | ⬜ TODO | src/sections/Topics*, Entity*, Timeline*, StrengthsGaps* |
| B9 | Theme-ify ChartTooltip + all Recharts color arrays | T4 | ⬜ TODO | src/components/ChartTooltip.jsx |
| B10 | Theme-ify sections 8–11 (Pipeline, Risks, Sprint, People) | T5 | ⬜ TODO | src/sections/Pipeline*, Risk*, Sprint*, People* |
| B11 | Theme-ify sections 12–14 (Roadmap, Questions, Arc) | T5 | ⬜ TODO | src/sections/Roadmap*, Questions*, Arc* |
| B12 | Theme-ify NavDots, GlassCard, SectionHeader, Counter | T5 | ⬜ TODO | src/components/* |

### Phase C — Integration (T1 + T2 sequential)

| # | Task | Owner | Status | File(s) |
|---|---|---|---|---|
| C1 | Add BIMShowcaseSection to App.jsx section order | T1 | ⬜ TODO | src/App.jsx, src/data/meta.js |
| C2 | Add SectionDivider between key sections | T1 | ⬜ TODO | src/App.jsx |
| C3 | Full test: toggle dark↔light, verify all sections | T1 | ⬜ TODO | — |
| C4 | Performance check + git commit + push | T2 | ⬜ TODO | — |

---

## FILE OWNERSHIP

```
T1 owns:
  src/App.jsx
  src/index.css
  src/hooks/useTheme.js (NEW)
  src/components/ThemeToggle.jsx (NEW)
  src/data/meta.js

T2 owns:
  src/three/BIMBuilding.jsx (NEW)
  src/sections/BIMShowcaseSection.jsx (NEW)

T3 owns:
  src/three/HeroScene.jsx
  src/three/SectionDivider.jsx (NEW)

T4 owns (for theme updates only — do not restructure):
  src/sections/HeroSection.jsx
  src/sections/KpiSection.jsx
  src/sections/VelocitySection.jsx
  src/sections/SentimentSection.jsx
  src/sections/TopicsSection.jsx
  src/sections/EntitySection.jsx
  src/sections/TimelineSection.jsx
  src/sections/StrengthsGapsSection.jsx
  src/components/ChartTooltip.jsx

T5 owns (for theme updates only — do not restructure):
  src/sections/PipelineSection.jsx
  src/sections/RiskSection.jsx
  src/sections/SprintSection.jsx
  src/sections/PeopleSection.jsx
  src/sections/RoadmapSection.jsx
  src/sections/QuestionsSection.jsx
  src/sections/ArcSection.jsx
  src/components/NavDots.jsx
  src/components/GlassCard.jsx
  src/components/SectionHeader.jsx
  src/components/Counter.jsx

SHARED (coordinate via COMMS.md):
  COMMS.md (all terminals)
  CLAUDE.md (orchestrator only)
```

---

## TERMINAL LOG

### T1 — Theme Infrastructure
```
```

### T2 — 3D BIM Showcase
```
```

### T3 — Enhanced Three.js
```
```

### T4 — Theme Sections 0–7 + Charts
```
```

### T5 — Theme Sections 8–14 + Components
```
```

### ORCHESTRATOR
```
2026-04-27: v2 enhancement sprint initialized.
2026-04-27: v1 build is COMPLETE and working (15 sections, all charts, 3D hero).
2026-04-27: Sprint scope: theme toggle + BIM showcase + shader FX + light mode styling.
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
| 2026-04-27 | Light mode = "Acuarela Oil Pastel" — warm cream bg, teal accent, terracotta secondary | Orchestrator | Full design system in CLAUDE.md |
| 2026-04-27 | Theme toggle via data-theme attribute on html + CSS variables | Orchestrator | No JS color logic needed — CSS handles it |
| 2026-04-27 | BIM model = procedural Three.js primitives (no external .glb for v2) | Orchestrator | Simple but impressive — Blender model is v3 |
| 2026-04-27 | ThemeContext via React context — components read theme for 3D adaptation | Orchestrator | Three.js scenes need JS theme, not just CSS |
| 2026-04-27 | Theme updates = replace hardcoded colors with CSS var() — preserve layout | Orchestrator | No restructuring of sections |
