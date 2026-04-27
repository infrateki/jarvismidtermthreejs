# PROMPTS-V2.md — Enhancement Sprint Prompts

> **Sprint:** Dark/Light Theme + 3D BIM Showcase + Shader FX
> **Prerequisite:** v1 site is fully built and running
> **Method:** COMMS.md + CLAUDE.md orchestration (5 terminals)

---

## Execution Order

```
Phase A: T1 alone             ← Theme foundation (MUST finish first)
         ↓ wait ~10 min
Phase B: T2 ──────┐
         T3 ──────┤           ← IN PARALLEL (no file conflicts)
         T4 ──────┤
         T5 ──────┘
         ↓ wait for all 4
Phase C: T1 then T2            ← Wire BIM section + final test + deploy
```

---

## PHASE A — Theme Foundation (T1 only)

### T1 — Prompt 1: Build Theme System

```
Read COMMS.md and CLAUDE.md. You are T1 — Theme Infrastructure owner.

Tasks A1 + A2 + A3 + A4 + A5 + A6: Create the dark/light theme system.

The site currently runs in dark mode only. I need a toggle that switches between
the existing dark mode and a new "Acuarela Oil Pastel Daylight" light mode.
The light mode should feel like warm watercolor on parchment paper.

### TASK A1: Create src/hooks/useTheme.js

Create a React context-based theme hook:

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

Create a ThemeContext with createContext().
Create a ThemeProvider component that:
  - Manages state: theme ('dark' | 'light'), default 'dark'
  - On theme change: sets document.documentElement.setAttribute('data-theme', theme)
  - Provides { theme, toggleTheme, isDark } to context
  - toggleTheme flips between 'dark' and 'light'

Create a useTheme() hook that returns the context value.

Export: ThemeProvider (named), useTheme (named, default).

### TASK A2: Add light mode CSS variables to src/index.css

Add this block AFTER the existing :root block (do NOT modify :root):

[data-theme="light"] {
  --bg-primary: #FBF7F0;
  --bg-secondary: #F3EDE4;
  --bg-elevated: #FFFFFF;
  --bg-glass: rgba(255, 255, 255, 0.75);
  --cyan-400: #0891B2;
  --cyan-500: #0E7490;
  --cyan-600: #155E75;
  --amber-400: #D97706;
  --red-400: #E07A5F;
  --purple-400: #7C3AED;
  --green-400: #059669;
  --text-primary: #1C1917;
  --text-secondary: rgba(28, 25, 23, 0.6);
  --text-tertiary: rgba(28, 25, 23, 0.35);
  --text-muted: rgba(28, 25, 23, 0.2);
  --border-subtle: rgba(14, 116, 144, 0.08);
  --border-medium: rgba(14, 116, 144, 0.15);
  --border-strong: rgba(14, 116, 144, 0.3);
}

Also add a global transition so theme changes feel smooth:

html { transition: background-color 0.4s ease, color 0.4s ease; }
.glass-card, .milestone-card, .kpi-card, .nav-dot {
  transition: all 0.4s ease;
}

### TASK A3: Create src/components/ThemeToggle.jsx

A small toggle button. Default export.
  - Import useTheme from '../hooks/useTheme'
  - Render a button with:
    - Position: fixed, top 20px, left 20px, z-index 100
    - Size: 40px × 40px, border-radius 50%
    - Background: var(--bg-glass), border: 1px solid var(--border-medium)
    - Backdrop-filter: blur(8px)
    - Content: a sun icon (☀) in light mode, moon icon (☾) in dark mode
    - Font-size: 18px, no font-family override (emoji is fine)
    - Hover: border-color var(--border-strong), scale 1.1
    - Transition: all 0.3s ease
    - onClick: toggleTheme()
    - aria-label: "Toggle theme"
    - title: isDark ? "Switch to light mode" : "Switch to dark mode"

### TASK A4: Wire into src/App.jsx

  - Import { ThemeProvider } from './hooks/useTheme'
  - Import ThemeToggle from './components/ThemeToggle'
  - Wrap the entire app return in <ThemeProvider>
  - Add <ThemeToggle /> just after <NavDots />
  - That's it — the CSS variables handle the rest

### TASK A5: Update light mode styles in src/index.css

Update these existing classes to work in light mode (add [data-theme="light"] overrides):

[data-theme="light"] .glow-text {
  background: linear-gradient(135deg, #0891B2, #0E7490, #155E75);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

[data-theme="light"] .glass-card {
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(14, 116, 144, 0.08);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
}

[data-theme="light"] .glass-card::before {
  background: linear-gradient(90deg, transparent, rgba(14, 116, 144, 0.15), transparent);
}

[data-theme="light"] .milestone-card {
  background: rgba(243, 237, 228, 0.8);
  border: 1px solid rgba(14, 116, 144, 0.08);
}

[data-theme="light"] .milestone-card:hover {
  border-color: rgba(14, 116, 144, 0.25);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
}

[data-theme="light"] .nav-dot {
  border-color: rgba(14, 116, 144, 0.3);
}

[data-theme="light"] .nav-dot.active {
  background: #0891B2;
  box-shadow: 0 0 12px rgba(8, 145, 178, 0.4);
}

[data-theme="light"] .section-label {
  color: rgba(14, 116, 144, 0.6);
}

[data-theme="light"] .kpi-card::after {
  background: linear-gradient(90deg, transparent, rgba(14, 116, 144, 0.25), transparent);
}

[data-theme="light"] ::-webkit-scrollbar-thumb {
  background: rgba(14, 116, 144, 0.2);
}

[data-theme="light"] .recharts-cartesian-grid-horizontal line,
[data-theme="light"] .recharts-cartesian-grid-vertical line {
  stroke: rgba(14, 116, 144, 0.08) !important;
}

### TASK A6: Test

Run npm run dev. Click the theme toggle. Verify:
  - Background swaps from deep navy to warm cream
  - Text swaps from light to dark
  - Glass cards become warm white with subtle shadows
  - Nav dots change accent color
  - Section labels change color
  - Toggle button icon swaps ☾ ↔ ☀

### Constraints
- DO NOT modify any section files (T4/T5 handle those)
- DO NOT modify src/three/* (T3 handles that)
- DO NOT restructure existing components

### When done
1. npm run build passes
2. Update COMMS.md: mark A1–A6 as ✅ DONE
3. Report: "Theme system live. Toggle works. T2–T5 can start."
```

---

## PHASE B — Parallel Build

> Start T2, T3, T4, T5 simultaneously after T1 finishes.

---

### T2 — Prompt 2: 3D BIM Showcase Section

```
Read COMMS.md and CLAUDE.md. You are T2 — 3D BIM Showcase owner.

Tasks B1 + B2 + B3: Build a new section showcasing a procedural 3D BIM
building using Three.js primitives.

### TASK B1: Create src/three/BIMBuilding.jsx

Build a procedural BIM-style hospital/airport terminal using only Three.js
primitive geometry (BoxGeometry, PlaneGeometry, CylinderGeometry). No
external model files. The goal: look like an architectural wireframe model.

The component should be a default export that renders inside an R3F Canvas.

Architecture to build:
  1. Main building body — wide box (20 × 4 × 10), positioned at center
  2. Three floor slabs — thin boxes (20 × 0.1 × 10), stacked at y=0, y=1.5, y=3
  3. Central atrium — taller box (6 × 6 × 6) rising from the middle
  4. Two wing corridors — narrow boxes (4 × 3 × 16), extending from sides
  5. Entrance canopy — thin box (8 × 0.1 × 4) floating in front
  6. 8–12 columns — thin cylinders (r=0.15, h=4), placed at regular intervals
  7. Rooftop mechanical room — small box on top of atrium

Materials:
  - Import useTheme from '../hooks/useTheme' (if available, wrap in try/catch)
  - Dark mode: MeshBasicMaterial wireframe, color #00F0FF, opacity 0.25, transparent
  - Light mode: MeshStandardMaterial, color #0891B2, opacity 0.15, transparent,
    with edges visible (use EdgesGeometry + LineSegments, color #0E7490, opacity 0.4)

Wrap the entire building in a <group> that slowly rotates on Y-axis (useFrame).
Add a <Float> wrapper from @react-three/drei for gentle bobbing (speed 1, floatIntensity 0.3).

### TASK B2: Create src/sections/BIMShowcaseSection.jsx

A new section that showcases the 3D BIM model. Default export.

Layout:
  - data-section="15" (or next available index — will be adjusted in Phase C)
  - Two-column layout: LEFT = text, RIGHT = 3D canvas
  - Section label: "THREE.JS SHOWCASE"
  - Heading: "BIM" in glow-text + "Intelligence in 3D"
  - Description text (3–4 lines):
    "Jarvis processes building information models, airport terminal designs,
    and infrastructure data. This procedural BIM visualization demonstrates
    the Three.js rendering capabilities powering the Jarvis visual layer."
  - Below description: 3 stat pills (inline-flex):
    "12 Portals" | "$500M Pipeline" | "3-Tier Scoring"

Right side:
  - R3F Canvas (width 100%, height 500px, or aspect-ratio 4/3)
  - Import BIMBuilding from '../three/BIMBuilding'
  - Camera position [15, 10, 15], looking at origin
  - Add OrbitControls from @react-three/drei (enableZoom false, autoRotate, autoRotateSpeed 0.5)
  - Ambient light (0.5) + directional light from top-right
  - Background: transparent (alpha true) — inherits page bg

Responsive: on mobile (< 768px), stack vertically (text above, 3D below, height 300px).
Wrap text block in Reveal.

### TASK B3: Make BIM scene theme-aware

Try to import useTheme. If not available yet (T1 not done), use a fallback:
  const theme = (typeof useTheme === 'function') ? useTheme() : { isDark: true };

In BIMBuilding, read theme.isDark:
  - Dark: wireframe materials, cyan edges, dark bg → transparent canvas
  - Light: semi-transparent solid materials, teal edges, warm tones,
    add a soft ground plane (PlaneGeometry 30×30, rotation -PI/2, warm beige material)

### Constraints
- DO NOT modify any existing files — create NEW files only
- Files: src/three/BIMBuilding.jsx, src/sections/BIMShowcaseSection.jsx

### When done
1. npm run dev — BIM section renders (test by temporarily importing in App.jsx)
2. Update COMMS.md: mark B1–B3 as ✅ DONE
3. Note: "BIMShowcaseSection.jsx ready — needs to be added to App.jsx in Phase C"
```

---

### T3 — Prompt 3: Enhanced Three.js + Shader FX

```
Read COMMS.md and CLAUDE.md. You are T3 — Enhanced Three.js owner.

Tasks B4 + B5 + B6: Add 3D enhancements to the hero and create a
reusable section divider.

### TASK B4: Add floating architectural shapes to HeroScene.jsx

Open src/three/HeroScene.jsx. ADD (do not remove existing particles/lines/geo):

  1. A TorusKnotGeometry (r=2, tube=0.3, segments 100, 16) floating at position [-10, 5, -5]
     - MeshBasicMaterial wireframe, color cyan, opacity 0.08
     - Slowly rotating (useFrame delta * 0.1 on all axes)

  2. An OctahedronGeometry (r=1.5, detail 0) at position [12, -4, -8]
     - MeshBasicMaterial wireframe, amber, opacity 0.06
     - Rotating opposite direction

  3. A small IcosahedronGeometry (r=0.8, detail 1) at position [-8, -6, 5]
     - MeshBasicMaterial wireframe, purple, opacity 0.06
     - Floating with gentle sine wave (useFrame: mesh.position.y = base + sin(time) * 0.5)

These add architectural "artifacts" floating in the particle field for visual depth.

### TASK B5: Make HeroScene theme-aware

Import useTheme from '../hooks/useTheme'. If unavailable, use fallback:
  let isDark = true;
  try { const t = useTheme(); isDark = t.isDark; } catch(e) {}

Adapt based on isDark:

DARK MODE (existing):
  - Particles: 70% grey-blue, 20% cyan, 10% amber (keep as-is)
  - Connection lines: cyan, opacity 0.08
  - Icosahedron: cyan wireframe, 0.12
  - Rings: cyan + amber
  - Background: transparent (dark page shows through)

LIGHT MODE:
  - Particles: 50% warm grey (0.6,0.55,0.5), 25% teal (0.03,0.57,0.7), 25% peach (0.88,0.48,0.37)
  - Connection lines: teal (#0E7490), opacity 0.1
  - Icosahedron: teal, opacity 0.08
  - Ring 1: teal, opacity 0.1
  - Ring 2: warm coral (#E07A5F), opacity 0.06
  - Floating shapes: adapt colors to teal/coral/sage
  - Particle size: slightly larger (2.2) in light mode for softer feel
  - Blending: NormalBlending instead of AdditiveBlending (additive doesn't work on light bg)

IMPORTANT: To switch particle colors at runtime, you need to update the color buffer
attribute in useFrame based on the isDark flag. Create two color arrays (one dark, one light)
and lerp between them, or just set them directly when theme changes.

### TASK B6: Create src/three/SectionDivider.jsx

A small R3F component that renders a decorative 3D divider between sections.
Default export. Used as a visual break between major section groups.

Implementation:
  - A thin horizontal strip (Canvas, height 80px, full width, alpha transparent)
  - Inside: a single subdivided PlaneGeometry (width 30, height 0.5, segments 100x1)
  - Vertex displacement: gentle sine wave along X
    positionNode or useFrame: vertices[i].y = sin(x * 2 + time) * 0.1
  - Material: MeshBasicMaterial, wireframe, color var(--cyan-400) equivalent
  - Dark mode: cyan wireframe, light mode: teal wireframe
  - Read theme from useTheme()

This creates a subtle animated wave line between sections.

### Constraints
- ONLY modify: src/three/HeroScene.jsx
- ONLY create: src/three/SectionDivider.jsx
- DO NOT touch sections, components, CSS, or data files

### When done
1. Verify hero renders with new floating shapes
2. Verify theme toggle changes hero colors (if T1 is done)
3. Update COMMS.md: mark B4–B6 as ✅ DONE
```

---

### T4 — Prompt 4: Theme-ify Sections 0–7 + Charts

```
Read COMMS.md and CLAUDE.md. You are T4 — Theme Sections 0–7 + Charts owner.

Tasks B7 + B8 + B9: Replace hardcoded colors with CSS variables in
sections 0–7 and update all Recharts color references.

THE GOLDEN RULE: Any inline style that currently uses a hardcoded hex color
(like '#00F0FF', '#FFB547', 'rgba(0,240,255,...)') must be replaced with
var(--cyan-400), var(--amber-400), or the appropriate CSS variable.

This way, when the theme toggles, these elements automatically update.

### TASK B7: Theme-ify sections 0–3

For each file (HeroSection, KpiSection, VelocitySection, SentimentSection),
find every hardcoded color in inline styles and replace:

  '#00F0FF' or '#00f0ff' → 'var(--cyan-400)'
  '#00B4D8' → 'var(--cyan-500)'
  '#0077B6' → 'var(--cyan-600)'
  '#FFB547' → 'var(--amber-400)'
  '#FF4D6A' → 'var(--red-400)'
  '#A855F7' → 'var(--purple-400)'
  '#E2E8F0' → 'var(--text-primary)'
  '#060A18' → 'var(--bg-primary)'
  'rgba(200,214,229,0.6)' → 'var(--text-secondary)'
  'rgba(200,214,229,0.35)' → 'var(--text-tertiary)'
  'rgba(200,214,229,0.2)' → 'var(--text-muted)'
  'rgba(0,240,255,...)' for borders → 'var(--border-subtle)' or 'var(--border-medium)'

ALSO for HeroSection.jsx specifically:
  - The bottom gradient overlay: change from '#060A18' to 'var(--bg-primary)'
  - The × separator color: use 'var(--text-muted)' instead of hardcoded rgba

DO NOT change: component structure, layout, data imports, animation logic.
ONLY change: color values in style objects.

### TASK B8: Theme-ify sections 4–7

Same process for TopicsSection, EntitySection, TimelineSection, StrengthsGapsSection.

For EntitySection: the progress bar gradients for person/company/project types:
  - Use CSS variables where possible
  - For gradients, you can keep linear-gradient but swap the hex values:
    Dark amber gradient: linear-gradient(90deg, var(--amber-400), #FF8C00)
    This is acceptable since CSS vars work inside gradients

For TimelineSection: the phase colors come from PHASE_COLORS in meta.js.
  Leave those as-is — they are semantic colors tied to phases, not theme colors.

For StrengthsGapsSection: green (#34D399 → var(--green-400)) and red (#FF4D6A → var(--red-400))

### TASK B9: Theme-ify ChartTooltip and Recharts colors

Open src/components/ChartTooltip.jsx:
  Replace hardcoded tooltip background/border colors with CSS vars.
  The tooltip should be dark in dark mode and light cream in light mode.

For charts in ALL sections (VelocitySection, SentimentSection, TopicsSection):
  Recharts stroke/fill colors are passed as props, not CSS vars. You have two options:
  
  Option A (simpler): Import useTheme, then conditionally set colors:
    const { isDark } = useTheme();
    const cyanColor = isDark ? '#00F0FF' : '#0891B2';
    const amberColor = isDark ? '#FFB547' : '#D97706';
    Then use these variables in chart component props.

  Option B (CSS-only): Use currentColor tricks or CSS variable extraction.

  I recommend Option A. Import useTheme in each section that has charts.
  If useTheme isn't available yet (T1 not done), use fallback:
    let isDark = true;
    try { isDark = useTheme().isDark; } catch(e) {}

  Create color constants at the top of each chart section:
    const CHART_COLORS = {
      cyan: isDark ? '#00F0FF' : '#0891B2',
      amber: isDark ? '#FFB547' : '#D97706',
      red: isDark ? '#FF4D6A' : '#E07A5F',
      neutral: isDark ? '#3A4A6B' : '#A8A29E',
      grid: isDark ? 'rgba(0,240,255,0.05)' : 'rgba(14,116,144,0.08)',
      axis: isDark ? 'rgba(200,214,229,0.25)' : 'rgba(28,25,23,0.25)',
      gradientStart: isDark ? 'rgba(0,240,255,0.4)' : 'rgba(8,145,178,0.3)',
    };

  Then use CHART_COLORS.cyan instead of '#00F0FF' in Recharts props.

  For the gradient <linearGradient> defs: use CHART_COLORS.gradientStart for stopColor.

### Constraints
- DO NOT restructure components or change layout/animation logic
- ONLY change: color values (hardcoded hex → CSS var or theme-conditional)
- DO NOT touch: data imports, Reveal timing, Counter logic, grid layouts

### When done
1. Toggle theme — sections 0–7 should all adapt colors
2. Charts should show teal/honey in light mode, cyan/amber in dark mode
3. Update COMMS.md: mark B7–B9 as ✅ DONE
```

---

### T5 — Prompt 5: Theme-ify Sections 8–14 + Shared Components

```
Read COMMS.md and CLAUDE.md. You are T5 — Theme Sections 8–14 + Components owner.

Tasks B10 + B11 + B12: Replace hardcoded colors with CSS variables in the
remaining sections and shared components.

### TASK B10: Theme-ify sections 8–11

Files: PipelineSection, RiskSection, SprintSection, PeopleSection

Same rule as T4: find every hardcoded hex color in inline styles and replace
with CSS variables or theme-conditional values.

Specific notes:
  - PipelineSection: pipeline stage pills use cyan borders — use var(--border-strong)
  - RiskSection: severity badges — high stays red (var(--red-400)), medium stays amber (var(--amber-400))
  - SprintSection: day number color — use var(--cyan-400)
  - PeopleSection: person cards use amber accent — use var(--amber-400)
    Agent cards use cyan accent — use var(--cyan-400)

For any section with charts, import useTheme and create CHART_COLORS like T4 does.

### TASK B11: Theme-ify sections 12–14

Files: RoadmapSection, QuestionsSection, ArcSection

  - RoadmapSection: importance badges — high=var(--cyan-400), medium=var(--amber-400)
    Severity bars use hardcoded fills — swap to CSS vars
  - QuestionsSection: category headers use cyan — swap to var(--cyan-400)
    Question numbers in mono — already using CSS class so should auto-adapt
  - ArcSection: the stats numbers — use var(--cyan-400)
    The quote block border — use var(--cyan-400) at appropriate opacity
    Footer text — use var(--text-muted)

### TASK B12: Theme-ify shared components

src/components/NavDots.jsx:
  Already themed via CSS classes. Verify it works — may need no changes.

src/components/GlassCard.jsx:
  Already uses the glass-card CSS class. Verify. May need no changes.

src/components/SectionHeader.jsx:
  Uses section-label and section-heading CSS classes. Verify. May need no changes.

src/components/Counter.jsx:
  If the counter number has a hardcoded color, swap to var(--cyan-400).
  Check if it uses color: '#00F0FF' or similar.

src/components/Reveal.jsx:
  No colors — no changes needed.

### Constraints
- DO NOT restructure any component
- DO NOT touch files owned by T1, T2, T3, or T4
- ONLY change color values

### When done
1. Toggle theme — ALL remaining sections adapt
2. Nav dots, glass cards, counters all work in both modes
3. Update COMMS.md: mark B10–B12 as ✅ DONE
```

---

## PHASE C — Integration & Polish

> Run after ALL Phase B terminals report done.

---

### T1 — Prompt 6: Wire BIM Section + Section Dividers

```
Read COMMS.md and CLAUDE.md. You are T1 — Integration owner.

Tasks C1 + C2 + C3: Add the new BIM section and section dividers to App.jsx.

### STEP 1 (C1): Add BIMShowcaseSection to App.jsx
  - Import BIMShowcaseSection from './sections/BIMShowcaseSection'
  - Place it in the section order — I recommend between PipelineSection and RiskSection
    (after Command Center, before Risk Register — the BIM showcase naturally fits there)
  - Update src/data/meta.js SECTIONS array to include it

### STEP 2 (C2): Add SectionDivider between key section groups
  - Import SectionDivider from './three/SectionDivider'
  - If SectionDivider.jsx exists (T3 created it), place it between:
    - After KpiSection (between numbers and charts)
    - After SentimentSection (between analysis and deep data)
    - After TimelineSection (between journey and operations)
  - If the file doesn't exist, skip this step
  - The divider is just a thin 80px tall visual break — no data-section attribute

### STEP 3 (C3): Full theme test
  1. Run npm run dev
  2. Click theme toggle — verify EVERY section adapts:
     - Hero particles change colors
     - All glass cards change background
     - All charts change colors
     - All text is readable in both modes
     - BIM model adapts (wireframe glow vs soft pastel)
     - Nav dots change accent
  3. Fix ANY remaining hardcoded colors you find
  4. Run npm run build — must pass

### Constraints
- Focus on App.jsx and meta.js
- You may fix color issues in ANY file if they break theme consistency

### When done
1. Update COMMS.md: mark C1–C3 as ✅ DONE
2. Report: total sections, theme works, build passes
```

---

### T2 — Prompt 7: Final Polish + Deploy

```
Read COMMS.md and CLAUDE.md. You are T2 — Polish + Deploy owner.

Task C4: Performance, final fixes, git, deploy.

### STEP 1: Performance
  Run npm run build. Report bundle sizes.
  If bundle > 1.5MB, add to vite.config.js:
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            three: ['three', '@react-three/fiber', '@react-three/drei'],
            charts: ['recharts'],
            motion: ['framer-motion'],
          }
        }
      }
    }

### STEP 2: Test both themes end-to-end
  - Dark mode: should look exactly like it did before (no regressions)
  - Light mode: warm parchment bg, teal accents, readable text, soft cards
  - Toggle should be smooth (0.4s transition)

### STEP 3: Git
  git add .
  git commit -m "feat: v2 — dark/light theme toggle + 3D BIM showcase + shader FX

  New features:
  - Dark/light theme toggle (acuarela oil pastel daylight mode)
  - Procedural BIM hospital/terminal 3D model showcase
  - Enhanced hero with floating architectural shapes
  - Theme-aware Three.js scenes (particle colors, materials adapt)
  - All 15+ sections fully themed with CSS variable system
  - Animated section dividers between groups"
  git push origin main

### When done
1. Update COMMS.md status to 🟢 DEPLOYED
2. Report: build sizes, deployment URL, any notes
```

---

## Emergency Prompts

### Error recovery:
```
Read COMMS.md and CLAUDE.md. You are T[N] — [Component] owner.
Run npm run dev. Read all errors. Fix only files you own.
If the error is in another terminal's file, add a BLOCKER to COMMS.md.
```

### Idle terminal reactivation:
```
Read COMMS.md. Pick up the next unclaimed ⬜ TODO task. Update COMMS.md when done.
```

### Theme debugging:
```
Read COMMS.md and CLAUDE.md. The theme toggle isn't working correctly.
1. Check that src/hooks/useTheme.js exports ThemeProvider and useTheme
2. Check that App.jsx wraps everything in <ThemeProvider>
3. Check that index.css has [data-theme="light"] block
4. Check that document.documentElement.setAttribute is called on toggle
5. Open browser DevTools, inspect <html> element, verify data-theme attribute changes
6. Check the CSS variables tab in DevTools — do they change when toggling?
Fix whatever is broken. Update COMMS.md.
```

---

## Quick Reference

```
T1: Theme infrastructure (context, CSS, toggle, App wiring)
T2: 3D BIM model + showcase section (new files only)
T3: Hero enhancements + section divider (HeroScene.jsx + new file)
T4: Theme-ify sections 0–7 + charts (color swaps only)
T5: Theme-ify sections 8–14 + components (color swaps only)
```
