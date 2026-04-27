# V2 BUILD GUIDE — Dark/Light Theme + 3D BIM Showcase

> **One file. All instructions. Copy-paste each prompt into Claude Code.**

---

## What we're building

The site is done and looks amazing. This sprint adds three things:

1. **Dark/Light mode toggle** — current dark mode stays, new "Acuarela Oil Pastel" light mode with warm cream, teal, terracotta colors
2. **3D BIM building showcase** — procedural hospital/terminal built from Three.js primitives, no external models needed
3. **Enhanced 3D effects** — floating wireframe shapes in the hero, animated section dividers, theme-aware particles

---

## What exists right now

```
src/
├── App.jsx                    ← main app with 15 sections + loading screen
├── index.css                  ← full dark mode design system
├── main.jsx                   ← entry point
├── components/                ← Reveal, Counter, NavDots, ChartTooltip, GlassCard, SectionHeader
├── data/                      ← 20+ static data files
├── hooks/                     ← useScrollProgress, useActiveSection, useReducedMotion
├── lib/                       ← easing, format utilities
├── sections/                  ← 15 section components (all working)
└── three/
    └── HeroScene.jsx          ← R3F particles + wireframe + rings (dark mode only)
```

---

## Terminal setup

Open 5 Claude Code terminals in: `C:\Infratek\repos\jarvismidtermthreejs`

```
T1 → Theme infrastructure (CSS, context, toggle button)
T2 → 3D BIM model + showcase section
T3 → Hero enhancements + section divider
T4 → Update sections 0–7 colors for theme support
T5 → Update sections 8–14 + components for theme support
```

---

## Execution order

```
STEP 1:  Paste Prompt 1 into T1. Wait for it to finish.
STEP 2:  Paste Prompts 2, 3, 4, 5 into T2, T3, T4, T5 simultaneously.
STEP 3:  After all four finish, paste Prompt 6 into T1.
STEP 4:  After T1 finishes, paste Prompt 7 into T2.
Done.
```

---

## PROMPT 1 — paste into T1

> Theme foundation. Must run first and finish before anything else.

```
Read CLAUDE.md. You are T1 — Theme Infrastructure.

The site currently only has dark mode. I need a dark/light theme toggle.
The light mode is called "Acuarela Oil Pastel Daylight" — warm watercolor aesthetic.

Do these 6 tasks in order:

TASK 1: Create src/hooks/useTheme.js

Create a React context for theme management:

import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  const isDark = theme === 'dark';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) return { theme: 'dark', toggleTheme: () => {}, isDark: true };
  return ctx;
}

TASK 2: Add light mode CSS to src/index.css

Add this block AFTER the existing :root block. Do NOT modify :root.

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

Also add these light mode class overrides:

html { transition: background-color 0.4s ease, color 0.4s ease; }
.glass-card, .milestone-card, .kpi-card, .nav-dot { transition: all 0.4s ease; }

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

[data-theme="light"] .nav-dot { border-color: rgba(14, 116, 144, 0.3); }
[data-theme="light"] .nav-dot.active { background: #0891B2; box-shadow: 0 0 12px rgba(8, 145, 178, 0.4); }
[data-theme="light"] .section-label { color: rgba(14, 116, 144, 0.6); }
[data-theme="light"] .kpi-card::after { background: linear-gradient(90deg, transparent, rgba(14, 116, 144, 0.25), transparent); }
[data-theme="light"] ::-webkit-scrollbar-thumb { background: rgba(14, 116, 144, 0.2); }
[data-theme="light"] .recharts-cartesian-grid-horizontal line,
[data-theme="light"] .recharts-cartesian-grid-vertical line { stroke: rgba(14, 116, 144, 0.08) !important; }

TASK 3: Create src/components/ThemeToggle.jsx

import useTheme from '../hooks/useTheme';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        position: 'fixed', top: 20, left: 20, zIndex: 100,
        width: 40, height: 40, borderRadius: '50%',
        background: 'var(--bg-glass)', border: '1px solid var(--border-medium)',
        backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
        cursor: 'pointer', fontSize: 18, lineHeight: 1,
        color: 'var(--text-primary)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={e => { e.target.style.transform = 'scale(1.1)'; e.target.style.borderColor = 'var(--border-strong)'; }}
      onMouseLeave={e => { e.target.style.transform = 'scale(1)'; e.target.style.borderColor = 'var(--border-medium)'; }}
    >
      {isDark ? '☀' : '☾'}
    </button>
  );
}

TASK 4: Wire into src/App.jsx

At the top, add these imports:
  import { ThemeProvider } from './hooks/useTheme';
  import ThemeToggle from './components/ThemeToggle';

Wrap the entire return JSX in <ThemeProvider>:
  return (
    <ThemeProvider>
      <div ref={containerRef} style={...}>
        ...existing content...
        <ThemeToggle />   ← add this right after <NavDots ... />
      </div>
    </ThemeProvider>
  );

TASK 5: Test

Run npm run dev. Click the toggle button (top-left corner).
Verify: background swaps from navy to cream, text inverts, cards change,
nav dots change accent, glass cards get warm shadows.

TASK 6: Run npm run build — must pass with zero errors.

Do NOT modify any section files, three/ files, or data files.
When done, report: "Theme system live. Toggle works. Other terminals can start."
```

---

## PROMPT 2 — paste into T2

> 3D BIM showcase. Run after T1 finishes.

```
Read CLAUDE.md. You are T2 — 3D BIM Showcase.

Build a new section that showcases a procedural 3D BIM building using
Three.js primitives. Create TWO new files. Do not modify existing files.

FILE 1: src/three/BIMBuilding.jsx

Build a procedural BIM-style hospital or airport terminal using only
Three.js primitive geometry. No external model files. This is a tech demo
showing Three.js capabilities.

Use @react-three/fiber and @react-three/drei.

Architecture to build inside a <group> with slow Y-axis rotation:
  - Main building body: BoxGeometry(20, 4, 10), centered
  - Three floor slabs: BoxGeometry(20, 0.1, 10) at y=0, y=1.5, y=3
  - Central atrium: BoxGeometry(6, 6, 6) rising from middle
  - Two wing corridors: BoxGeometry(4, 3, 16) on each side
  - Entrance canopy: BoxGeometry(8, 0.1, 4) floating in front at y=4
  - 8 columns: CylinderGeometry(0.15, 0.15, 4) at regular intervals along front
  - Rooftop mechanical box: BoxGeometry(3, 1.5, 3) on top of atrium

Materials — read theme to adapt:
  Import useTheme from '../hooks/useTheme'.
  If import fails, default to: const isDark = true;

  Dark mode: All meshes use MeshBasicMaterial({ wireframe: true, color: '#00F0FF', transparent: true, opacity: 0.2 })
  Light mode: All meshes use MeshBasicMaterial({ wireframe: true, color: '#0E7490', transparent: true, opacity: 0.3 })
  
  Also add for each mesh an EdgesGeometry + LineSegments overlay:
    const edges = new THREE.EdgesGeometry(geometry);
    LineBasicMaterial({ color: isDark ? '#00F0FF' : '#0E7490', transparent: true, opacity: isDark ? 0.4 : 0.5 })

Wrap the group in <Float speed={1} floatIntensity={0.3}> from @react-three/drei.
Use useFrame to rotate the group: group.rotation.y += delta * 0.08;

Default export: BIMBuilding component (no props needed).

FILE 2: src/sections/BIMShowcaseSection.jsx

A new section with the 3D BIM model. Default export.

Layout:
  - data-section attribute (use "15" for now, will be adjusted later)
  - padding: 80px top, 120px bottom
  - Container max-width 1200px centered
  - Two-column grid: gridTemplateColumns "1fr 1fr", gap 48px
    On mobile: single column (use @media or inline min-width check)

LEFT COLUMN (text):
  - Wrap in Reveal component (import from '../components/Reveal')
  - Section label (class "section-label"): "THREE.JS SHOWCASE"
  - h2 (class "section-heading", fontSize clamp(28px,4vw,48px)):
    <span className="glow-text">BIM</span> Intelligence in 3D
  - Description paragraph (color var(--text-secondary), lineHeight 1.7, maxWidth 480px):
    "Jarvis processes building information models, airport terminal designs,
    and infrastructure data. This procedural visualization demonstrates
    the rendering engine powering the Jarvis intelligence layer."
  - Three stat pills below (inline-flex, gap 16px, marginTop 32px):
    Each pill: padding 8px 16px, borderRadius 20px, background var(--bg-glass),
    border 1px solid var(--border-subtle), fontFamily JetBrains Mono, fontSize 11px,
    letterSpacing 1px, color var(--text-secondary)
    Values: "12 PORTALS" | "$500M PIPELINE" | "3 TIERS"

RIGHT COLUMN (3D):
  - Import { Canvas } from '@react-three/fiber'
  - Import { OrbitControls } from '@react-three/drei'
  - Import BIMBuilding from '../three/BIMBuilding'
  - Canvas: style={{ width: '100%', height: 500 }}, camera={{ position: [15, 10, 15], fov: 50 }},
    gl={{ alpha: true, antialias: true }}, dpr={[1, 2]}
  - Inside Canvas:
    <ambientLight intensity={0.5} />
    <directionalLight position={[10, 10, 5]} intensity={0.8} />
    <BIMBuilding />
    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
  - Wrap Canvas in a div with borderRadius 16px, overflow hidden,
    border 1px solid var(--border-subtle)

Test: Temporarily import BIMShowcaseSection in App.jsx to verify it renders.
Then REMOVE that temporary import (Phase C will add it properly).

When done, report: "BIM showcase section ready. Two new files created."
```

---

## PROMPT 3 — paste into T3

> Hero enhancements + section divider. Run after T1 finishes.

```
Read CLAUDE.md. You are T3 — Enhanced Three.js.

Modify HeroScene.jsx and create one new file. Do NOT touch any other files.

TASK 1: Add floating wireframe shapes to src/three/HeroScene.jsx

Open the file. Keep ALL existing code (particles, connection lines,
icosahedron, rings, scroll camera). ADD these three new shapes:

Shape 1: TorusKnotGeometry(2, 0.3, 100, 16) at position [-10, 5, -5]
  MeshBasicMaterial wireframe, opacity 0.06
  Slowly rotating all axes: useFrame delta * 0.08

Shape 2: OctahedronGeometry(1.5, 0) at position [12, -4, -8]
  MeshBasicMaterial wireframe, opacity 0.05
  Rotating opposite direction

Shape 3: DodecahedronGeometry(1, 0) at position [-8, -6, 5]
  MeshBasicMaterial wireframe, opacity 0.05
  Gentle sine wave bob: position.y = baseY + Math.sin(clock.elapsedTime * 0.5) * 0.8

Create each as a small internal component (FloatingShape1, FloatingShape2, etc.)
and add them inside the Canvas alongside the existing components.

TASK 2: Make HeroScene theme-aware

Import useTheme from '../hooks/useTheme'.
Wrap in try/catch — if it fails, default isDark = true.

To call useTheme inside the Canvas, create a ThemeAdapter component that
reads the theme and passes it down, OR pass isDark as a prop from HeroSection.

The simplest approach: Add an isDark prop to HeroScene and every sub-component.
HeroSection will import useTheme and pass isDark to HeroScene.

Wait — HeroSection is owned by T4. So instead, do this:
  - In HeroScene, accept an optional isDark prop (default true)
  - Use it to control colors:

  Dark mode (isDark=true, existing):
    Particle colors: 70% grey-blue, 20% cyan, 10% amber
    Lines: cyan, opacity 0.08, AdditiveBlending
    Icosahedron: cyan, opacity 0.12
    Rings: cyan + amber
    New shapes: cyan/amber/purple, low opacity

  Light mode (isDark=false):
    Particle colors: 50% warm grey (0.6,0.55,0.5), 25% teal (0.03,0.57,0.7), 25% peach (0.88,0.48,0.37)
    Lines: teal #0E7490, opacity 0.12, NormalBlending (NOT additive — additive is invisible on light bg)
    Icosahedron: teal, opacity 0.1
    Ring 1: teal, opacity 0.1
    Ring 2: coral #E07A5F, opacity 0.08
    New shapes: teal/coral/sage tones
    Particle material: change blending to NormalBlending
    Particle size: 2.2 (slightly larger for softer feel)

To switch colors at runtime, update the particle color buffer in useFrame
when isDark changes. Create two color presets and apply when isDark flips.
Or simpler: store isDark in a ref, and in useFrame regenerate colors only
when the ref changes.

TASK 3: Create src/three/SectionDivider.jsx

A small visual divider component. Default export.

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

Create a component that renders a thin animated wave:
  - Canvas: height 60px, width 100%, alpha transparent, dpr [1,2]
  - Inside: a line made of 100 points spread from x=-15 to x=15
    Using THREE.BufferGeometry + THREE.Line
  - In useFrame: animate each point's Y with:
    y[i] = Math.sin(x[i] * 0.5 + clock.elapsedTime * 0.8) * 0.15
  - Material: LineBasicMaterial, color var(--cyan-400) equivalent
    Accept isDark prop: dark=#00F0FF opacity 0.2, light=#0891B2 opacity 0.3
  - Camera: orthographic, positioned to see the wave flat

The section divider sits BETWEEN sections as a subtle animated line.
It has no data-section attribute — it's decorative only.

When done, report: "Hero enhanced with 3 floating shapes + theme-aware colors.
SectionDivider created. HeroScene accepts isDark prop."
```

---

## PROMPT 4 — paste into T4

> Theme-ify sections 0–7 and charts. Run after T1 finishes.

```
Read CLAUDE.md. You are T4 — Sections 0–7 + Charts.

Your job: go through sections 0–7 and replace every hardcoded hex color
in inline styles with CSS variables. This way the theme toggle works
automatically across all sections.

THE RULE: Find hardcoded colors → replace with var(--xxx):
  '#00F0FF' or '#00f0ff' → var(--cyan-400)
  '#00B4D8'              → var(--cyan-500)
  '#0077B6'              → var(--cyan-600)
  '#FFB547'              → var(--amber-400)
  '#FF4D6A'              → var(--red-400)
  '#A855F7'              → var(--purple-400)
  '#34D399'              → var(--green-400)
  '#E2E8F0'              → var(--text-primary)
  '#060A18'              → var(--bg-primary)
  'rgba(200,214,229,0.6)' → var(--text-secondary)
  'rgba(200,214,229,0.35)' → var(--text-tertiary)
  'rgba(200,214,229,0.2)' → var(--text-muted)
  'rgba(0,240,255,...)' borders → var(--border-subtle) or var(--border-medium)

FILES TO UPDATE:

1. src/sections/HeroSection.jsx
   - Bottom gradient: use var(--bg-primary) instead of #060A18
   - Pass isDark prop to HeroScene (import useTheme, get isDark, pass it)
   - All text colors: use CSS vars

2. src/sections/KpiSection.jsx
   - Counter number color: var(--cyan-400)
   - Quote border: var(--cyan-400)
   - All text colors: use CSS vars

3. src/sections/VelocitySection.jsx
   - Chart stroke/fill colors: need to be theme-conditional
   - Import useTheme, get isDark
   - Create: const chartCyan = isDark ? '#00F0FF' : '#0891B2';
   - Create: const chartAmber = isDark ? '#FFB547' : '#D97706';
   - Use these in Recharts stroke, fill, activeDot props
   - Gradient stopColor: use chartCyan with appropriate opacity
   - Axis tick fill: isDark ? 'rgba(200,214,229,0.25)' : 'rgba(28,25,23,0.25)'

4. src/sections/SentimentSection.jsx
   - Same chart color treatment as VelocitySection
   - Pie chart Cell colors: conditional on isDark
   - Bar chart fill colors: conditional
   - Sentiment legend dot colors: conditional

5. src/sections/TopicsSection.jsx
   - Bar gradient: adjust endpoint colors
   - Radar fill/stroke: conditional
   - PolarGrid stroke: conditional

6. src/sections/EntitySection.jsx
   - Progress bar gradients: swap hex values to vars where possible
   - Entity name colors: var(--amber-400) for persons, var(--text-primary) for companies
   - Type badge color: var(--text-muted)
   - Mention count: var(--text-tertiary)

7. src/sections/TimelineSection.jsx
   - Phase colors come from PHASE_COLORS in meta.js — leave those as-is
   - Timeline vertical line: use var(--border-medium)
   - Card text: use var(--text-primary) and var(--text-tertiary)

8. src/sections/StrengthsGapsSection.jsx
   - Green accent: var(--green-400)
   - Red accent: var(--red-400)
   - Text colors: CSS vars

9. src/components/ChartTooltip.jsx
   - Tooltip background: use var(--bg-glass) or conditional
     isDark ? 'rgba(10,14,28,0.95)' : 'rgba(255,255,255,0.95)'
   - Border: var(--border-medium)
   - Title color: var(--cyan-400)
   - Import useTheme for the conditional colors

DO NOT change: layouts, animations, data imports, component structure.
ONLY change: color values.

When done, toggle the theme and verify all 8 sections adapt colors properly.
Report: "Sections 0–7 themed. Charts are theme-conditional."
```

---

## PROMPT 5 — paste into T5

> Theme-ify sections 8–14 and shared components. Run after T1 finishes.

```
Read CLAUDE.md. You are T5 — Sections 8–14 + Components.

Same task as T4 but for the remaining sections and shared components.
Replace hardcoded hex colors with CSS variables or theme-conditional values.

FILES TO UPDATE:

1. src/sections/PipelineSection.jsx
   - Stage pill borders: var(--border-strong) or var(--border-medium)
   - Connecting lines between stages: var(--border-subtle)
   - Highlighted autonomy level: var(--cyan-400)
   - Portal tier badges: keep tier colors but use CSS vars

2. src/sections/RiskSection.jsx
   - Severity badge: high=var(--red-400), medium=var(--amber-400)
   - Risk title: var(--text-primary)
   - Mitigation text: var(--text-secondary)

3. src/sections/SprintSection.jsx
   - Day number: var(--cyan-400)
   - Title: var(--text-primary)
   - Description: var(--text-secondary)

4. src/sections/PeopleSection.jsx
   - Person name accent: var(--amber-400)
   - Agent name accent: var(--cyan-400)
   - Role text: var(--text-secondary)

5. src/sections/RoadmapSection.jsx
   - Column headers: var(--text-primary)
   - Importance badges: high=var(--cyan-400), medium=var(--amber-400)
   - Severity bars: use CSS vars for fill color
   - Need area names: var(--text-primary)

6. src/sections/QuestionsSection.jsx
   - Category headers: var(--cyan-400)
   - Question number: var(--text-tertiary)
   - Question text: var(--text-secondary)

7. src/sections/ArcSection.jsx
   - Summary stat numbers: var(--cyan-400)
   - Quote block border: use var(--cyan-400) at opacity
   - Quote background: use var(--bg-glass) or similar
   - Footer: var(--text-muted)

8. src/components/NavDots.jsx
   - Should already work via CSS classes. Verify. Fix if needed.

9. src/components/GlassCard.jsx
   - Uses glass-card class. Should auto-adapt. Verify.

10. src/components/Counter.jsx
    - If counter number has a hardcoded color like '#00F0FF', change to var(--cyan-400)

11. src/components/SectionHeader.jsx
    - Uses CSS classes. Should auto-adapt. Verify.

DO NOT change: layouts, animations, data imports, component structure.
ONLY change: color values.

When done, toggle the theme and verify all remaining sections adapt.
Report: "Sections 8–14 + components themed."
```

---

## PROMPT 6 — paste into T1 (after T2–T5 all finish)

> Wire new sections + final integration test.

```
Read CLAUDE.md. You are T1 — Integration.

All enhancements are built. Wire them together and test.

STEP 1: Add BIMShowcaseSection to App.jsx
  Import BIMShowcaseSection from './sections/BIMShowcaseSection'
  Place it between PipelineSection and RiskSection in the render order.
  It should have the next sequential data-section number.

STEP 2: Add SectionDivider (if src/three/SectionDivider.jsx exists)
  Import SectionDivider from './three/SectionDivider'
  Import useTheme from './hooks/useTheme'
  Inside the App component, get isDark from useTheme()
  Place <SectionDivider isDark={isDark} /> between these section pairs:
    - After KpiSection
    - After SentimentSection  
    - After TimelineSection
  If the file doesn't exist, skip this step.

STEP 3: Update src/data/meta.js
  Add BIMShowcaseSection to the SECTIONS array in the correct position.
  Make sure all indices are sequential.

STEP 4: HeroSection isDark prop
  Open src/sections/HeroSection.jsx.
  If T4 hasn't already done this: import useTheme, get isDark, pass isDark
  as a prop to the HeroScene component.

STEP 5: Full integration test
  Run npm run dev. Test:
  - Click theme toggle: EVERY section should change colors
  - Hero particles should change from cyan/amber to teal/peach
  - BIM building should change from glowing wireframe to soft teal wireframe  
  - All charts should swap color palettes
  - Glass cards should go from dark glass to warm white
  - Scroll through entire page in both modes — no broken colors
  - Fix any remaining hardcoded colors you find in any file

STEP 6: Run npm run build — must pass.

Report: "Integration complete. All sections themed. BIM showcase live.
Build passes. Ready for final deploy."
```

---

## PROMPT 7 — paste into T2 (after T1 Prompt 6 finishes)

> Final polish and deploy.

```
Read CLAUDE.md. You are T2 — Polish + Deploy.

STEP 1: Verify theme transition quality
  The transition between dark and light should feel smooth.
  Check that html { transition: background-color 0.4s ease } is in index.css.
  Check that all cards/components have transition: all 0.4s ease.
  If the transition is jarring, add missing transitions.

STEP 2: Mobile check
  On screens < 640px:
  - Theme toggle should still be accessible (maybe move to top-right on mobile)
  - BIM showcase section: stack text above 3D, reduce canvas height to 300px
  - Three.js hero: hide on mobile (already handled if existing code checks width)

STEP 3: Performance
  Run npm run build. Report total bundle sizes.
  If JS bundle > 1.5MB total, add to vite.config.js:
    build: { rollupOptions: { output: { manualChunks: {
      three: ['three', '@react-three/fiber', '@react-three/drei'],
      charts: ['recharts'],
      motion: ['framer-motion']
    }}}}

STEP 4: Git commit and push
  git add .
  git commit -m "feat: v2 — dark/light theme toggle + 3D BIM showcase

  - Acuarela Oil Pastel daylight mode with warm cream, teal, terracotta palette
  - Toggle button with smooth 0.4s CSS variable transitions
  - Procedural BIM hospital/terminal 3D model (Three.js primitives)
  - Theme-aware particles, wireframes, and chart colors
  - Floating architectural shapes in hero scene
  - Animated section dividers
  - All 16 sections fully themed via CSS custom properties"
  git push origin main

Report: build sizes, any warnings, done.
```

---

## If something breaks — paste into any terminal

```
The project has errors. Do this:
1. Run npm run dev
2. Read every error in the console
3. Fix each error:
   - Missing import → check if the file exists, fix the path
   - useTheme not found → the import might be wrong, it's in '../hooks/useTheme'
   - Canvas errors → check @react-three/fiber imports
   - CSS var not working → check [data-theme="light"] block exists in index.css
4. Keep fixing until zero errors
5. Test the theme toggle works
6. Run npm run build — must pass
```

---

## Checklist — verify after everything is done

```
[ ] Theme toggle button visible (top-left)
[ ] Dark mode: looks exactly like before (no regressions)
[ ] Light mode: warm cream bg, teal accents, all text readable
[ ] Hero particles change colors on toggle
[ ] All 6+ charts change color palettes on toggle
[ ] Glass cards change from dark to warm white
[ ] Nav dots change accent color
[ ] BIM building renders with orbit controls
[ ] BIM building adapts to theme (glow wireframe ↔ soft teal)
[ ] Section dividers animate (if created)
[ ] Floating shapes visible in hero
[ ] Mobile: theme toggle accessible, BIM stacks vertically
[ ] npm run build passes
[ ] Git pushed
```
