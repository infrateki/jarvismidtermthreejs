# COMMS.md — Terminal Orchestration Board
## Jarvis × PDBM — v2 Enhancement Sprint

**Last updated:** 2026-04-27 · by Orchestrator
**Status:** 🟢 DEPLOYED — v2 live on Vercel
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
| B1 | Create BIM building geometry (procedural hospital/terminal) | T2 | ✅ DONE | src/three/BIMBuilding.jsx |
| B2 | Create BIMShowcaseSection with R3F scene | T2 | ✅ DONE | src/sections/BIMShowcaseSection.jsx |
| B3 | Make BIM scene theme-aware (dark=glow wireframe, light=pastel solid) | T2 | ✅ DONE | src/three/BIMBuilding.jsx |
| B4 | Add floating architectural elements to Hero (wireframe shapes) | T3 | ✅ DONE | src/three/HeroScene.jsx |
| B5 | Make HeroScene theme-aware (particle colors, bg, ring colors) | T3 | ✅ DONE | src/three/HeroScene.jsx |
| B6 | Create section divider 3D strip (noise shader or wave) | T3 | ✅ DONE | src/three/SectionDivider.jsx |
| B7 | Theme-ify sections 0–3 (Hero, KPIs, Velocity, Sentiment) | T4 | ✅ DONE | src/sections/Hero*, Kpi*, Velocity*, Sentiment* |
| B8 | Theme-ify sections 4–7 (Topics, Entities, Timeline, StrengthsGaps) | T4 | ✅ DONE | src/sections/Topics*, Entity*, Timeline*, StrengthsGaps* |
| B9 | Theme-ify ChartTooltip + all Recharts color arrays | T4 | ✅ DONE | src/components/ChartTooltip.jsx |
| B10 | Theme-ify sections 8–11 (Pipeline, Risks, Sprint, People) | T5 | ✅ DONE | src/sections/Pipeline*, Risk*, Sprint*, People* |
| B11 | Theme-ify sections 12–14 (Roadmap, Questions, Arc) | T5 | ✅ DONE | src/sections/Roadmap*, Questions*, Arc* |
| B12 | Theme-ify NavDots, GlassCard, SectionHeader, Counter | T5 | ✅ DONE | src/components/* |

### Phase C — Integration (T1 + T2 sequential)

| # | Task | Owner | Status | File(s) |
|---|---|---|---|---|
| C1 | Add BIMShowcaseSection to App.jsx section order | T1 | ⬜ TODO | src/App.jsx, src/data/meta.js |
| C2 | Add SectionDivider between key sections | T1 | ⬜ TODO | src/App.jsx |
| C3 | Full test: toggle dark↔light, verify all sections | T1 | ⬜ TODO | — |
| C4 | Performance check + git commit + push | T2 | ✅ DONE | — |

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
2026-04-27: B1–B3 ✅ DONE. Build passes (3.38s).
  - src/three/BIMBuilding.jsx — procedural hospital/terminal, Float wrapper, slow Y-rotation,
    dark=cyan wireframe, light=teal solid + EdgesGeometry + warm ground plane
  - src/sections/BIMShowcaseSection.jsx — 2-col layout, R3F Canvas, OrbitControls autoRotate,
    data-section="15", responsive (stacks on ≤768px)
  - useTheme imported with safe try/catch fallback (isDark defaults to true)
  - BIMShowcaseSection.jsx ready — needs to be added to App.jsx in Phase C (T1 owns App.jsx)
```

### T3 — Enhanced Three.js
```
2026-04-26: B4–B6 ✅ DONE.
  - HeroScene.jsx: added FloatingShapes (TorusKnot [-10,5,-5], Octahedron [12,-4,-8],
    floating Icosahedron [-8,-6,5] with sine-wave Y). All three rotate slowly.
  - HeroScene.jsx: full theme-awareness via useTheme(). isDark controls particle colors
    (dark: grey/cyan/amber; light: warm/teal/peach), blending mode (Additive→Normal),
    particle size (1.8→2.2), line/ring/shape colors. Color swap is done imperatively
    in useFrame on theme change (not every frame) for performance.
  - SectionDivider.jsx: new R3F Canvas (height 80px), animated wave PlaneGeometry
    (30×0.5, 100 segments), vertex Y displaced by sin(x*2+t) each frame,
    cyan wireframe dark / teal wireframe light.
  - useTheme() called with null-check fallback (isDark defaults true if no provider).
```

### T4 — Theme Sections 0–7 + Charts
```
2026-04-27: B7–B9 ✅ DONE. Build passes (3.34s).
  Strategy: CSS custom properties used directly in all style objects AND Recharts SVG props
  (stopColor, stroke, fill, tick.fill, axisLine.stroke) — no JS theme detection needed,
  CSS var() in SVG presentation attributes resolves automatically on theme toggle.
  - HeroSection: bg-primary gradient, text-muted × sep, cyan-400 metadata, border-strong scroll pill
  - KpiSection: text-primary quote, cyan-400 attribution
  - VelocitySection: all chart colors → CSS vars (cyan-400, amber-400, bg-primary, border-subtle, text-muted)
  - SentimentSection: all chart + pie colors → CSS vars; SENTIMENT_COLORS map for pie cells
  - TopicsSection: gradient stops, radar, axis → CSS vars (cyan-400/600, border-medium, text-secondary)
  - EntitySection: border-subtle track, cyan-400/600 + amber-400 bar gradients
  - TimelineSection: border-strong vertical line, bg-primary dot fill
  - StrengthsGapsSection: green-400 replaces hardcoded #34D399
  - ChartTooltip: bg-glass + border-medium + text-primary + cyan-400 (tooltip adapts to theme)
  NOTE: #3A4A6B (neutral sentiment) kept hardcoded — semantic data color, not a theme color.
  NOTE: T1 needs to add --green-400: #34D399 to dark mode CSS vars in index.css.
```

### T5 — Theme Sections 8–14 + Components
```
2026-04-27: B10–B12 ✅ DONE.
  - Audited all 7 sections (8–14) + 4 shared components for hardcoded hex colors
  - Replaced #00B4D8 → var(--cyan-500) in SprintSection DAY_COLORS
  - Replaced #FF4D6A → var(--red-400) in RoadmapSection severity gradient
  - Counter, NavDots, GlassCard, SectionHeader: fully CSS-class-based, no changes needed
  - Remaining hardcoded hex with no CSS var equivalent (left as-is, no T1 dep):
      #34D399 (semantic green for Won/success) in Pipeline + StrengthsGaps
      #00D4AA (teal accent, sprint day 2) in Sprint
      #FF8C00 (dark amber, sprint day 5 + need severity gradient) in Sprint + Roadmap
  - ArcSection, QuestionsSection, RiskSection, PeopleSection: already fully on CSS vars
  - All section data-section attrs renumbered by linter: 7 StrengthsGaps, 8 Pipeline,
    9 Risk, 10 Sprint, 11 People, 12 Roadmap, 13 Questions, 14 Arc
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
