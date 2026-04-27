# Implementation Roadmap

**Document ID:** JARVIS-PDBM-IMPL-001
**Version:** 1.0
**Estimated Duration:** 4 days (solo developer with Claude Code)

---

## Phase 1: Foundation (Day 1, Morning)

### Step 1.1 — Scaffold Project

```bash
npm create vite@latest jarvis-pdbm -- --template react-ts
cd jarvis-pdbm
npm install
```

### Step 1.2 — Install Dependencies

```bash
# Core
npm install three @react-three/fiber @react-three/drei
npm install recharts
npm install framer-motion
npm install lenis

# Types
npm install -D @types/three

# Tailwind CSS 4
npm install tailwindcss @tailwindcss/vite
```

### Step 1.3 — Configure Vite

Update `vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          charts: ['recharts'],
          motion: ['framer-motion'],
        },
      },
    },
  },
});
```

### Step 1.4 — Configure Tailwind

Create `src/index.css` with Tailwind imports + CSS custom properties from the design system document.

### Step 1.5 — Create File Structure

Create all directories and empty files per the architecture document:
- `src/data/` — all 8 data files
- `src/types/index.ts`
- `src/components/` — shared components
- `src/sections/` — section components
- `src/three/` — R3F components
- `src/hooks/` — custom hooks
- `src/lib/` — utilities

### Step 1.6 — Populate Data Layer

Copy all data files from the data schema document. These are ready to paste.

**Claude Code prompt:**
```
Read the data schema spec at specs/data-schema.md and create all data 
files under src/data/ with the exact TypeScript interfaces and values 
specified. Also create src/types/index.ts with all interfaces.
```

### Step 1.7 — Build App Shell

Create `App.tsx` with:
- Lenis smooth scroll wrapper
- Section refs for scroll tracking
- Active section state
- Basic layout with all 8 sections as empty containers

**Claude Code prompt:**
```
Create App.tsx with a Lenis smooth scroll wrapper, 8 section containers 
with data-section attributes, and scroll-tracking state using 
IntersectionObserver. Import and render all 8 section components (empty 
for now). Follow the architecture doc at docs/architecture.md.
```

---

## Phase 2: Three.js Hero (Day 1, Afternoon)

### Step 2.1 — HeroCanvas

Create the R3F `<Canvas>` wrapper in `src/three/HeroCanvas.tsx`.

**Claude Code prompt:**
```
Create HeroCanvas.tsx — a React Three Fiber Canvas component that wraps 
the 3D hero scene. It should have:
- alpha: true, antialias: true
- Camera at z=30, fov=60
- dpr clamped to [1, 2]
- Absolute positioned, full parent size
- Contains: ParticleField, ConnectionLines, CoreGeometry, OrbitalRings, ScrollCamera

Follow the component spec at specs/components.md for exact props and behavior.
```

### Step 2.2 — ParticleField

**Claude Code prompt:**
```
Create ParticleField.tsx — an R3F component that renders 500 particles as 
a Points mesh with BufferGeometry. Vertex colors: 70% blue-grey (0.3, 0.4, 0.6), 
20% cyan (0, 0.94, 1.0), 10% amber (1.0, 0.7, 0.28). Size 1.8, additive 
blending, opacity 0.8. Each frame, update positions by stored velocities 
and bounce at ±30x, ±20y, ±15z bounds. Use useFrame from R3F.
```

### Step 2.3 — ConnectionLines

**Claude Code prompt:**
```
Create ConnectionLines.tsx — R3F component that renders LineSegments 
between nearby particles. Each frame, check first 100 particles and draw 
lines where distance < 8 units. Max 200 lines. Cyan color, opacity 0.08, 
additive blending. Use setDrawRange to only render active lines.

This component needs access to the particle positions array from ParticleField. 
Use a shared ref or Zustand store to pass the positions buffer.
```

### Step 2.4 — CoreGeometry + OrbitalRings

**Claude Code prompt:**
```
Create CoreGeometry.tsx (wireframe icosahedron, radius 4, detail 1, cyan, 
opacity 0.12, rotating) and OrbitalRings.tsx (two torus meshes — ring 1: 
radius 12, tube 0.05, cyan, opacity 0.15; ring 2: radius 16, tube 0.03, 
amber, opacity 0.08). Both rotate using useFrame. See component spec 
for exact rotation speeds and initial orientations.
```

### Step 2.5 — ScrollCamera

**Claude Code prompt:**
```
Create ScrollCamera.tsx — reads scroll progress (0-1 normalized) from a 
custom hook and applies camera Y offset and slight X rotation. Use lerp 
for smooth interpolation. useFrame should update camera.position.y and 
camera.rotation.x based on scroll progress.
```

### Step 2.6 — Integrate Hero

Wire up `HeroSection.tsx` with `HeroCanvas` behind the hero content. Add gradient overlay and all hero text elements per the component spec.

---

## Phase 3: Sections + Charts (Day 2)

### Step 3.1 — Shared Components

Build all shared components first:

**Claude Code prompt:**
```
Create all shared components in src/components/ following the component 
spec at specs/components.md:
1. Reveal.tsx — Framer Motion whileInView wrapper
2. Counter.tsx — Animated number counter with IntersectionObserver
3. NavDots.tsx — Fixed section navigation
4. SectionLabel.tsx — Monospace chapter label
5. SectionHeading.tsx — Section title
6. GlowText.tsx — Gradient text span
7. GlassCard.tsx — Glassmorphism card container
8. ChartTooltip.tsx — Custom Recharts tooltip

Follow the design system at docs/design-system.md for all styling values.
```

### Step 3.2 — KPI Section

**Claude Code prompt:**
```
Build KpiSection.tsx with 6 KPI cards in a responsive grid using data 
from src/data/kpis.ts. Each card uses GlassCard + Counter + Reveal 
(staggered 80ms). Add the North Star quote block below with a cyan 
left border accent. Follow design system for all typography and spacing.
```

### Step 3.3 — Velocity Section

**Claude Code prompt:**
```
Build VelocitySection.tsx with a Recharts AreaChart showing 57 days of 
message data from src/data/daily-messages.ts. Cyan gradient fill, custom 
tooltip, dark-themed axes. Wrap in GlassCard. Add heading with peak 
callout text. 280px height desktop, 200px mobile.
```

### Step 3.4 — Sentiment Section

**Claude Code prompt:**
```
Build SentimentSection.tsx with two-column grid:
1. PieChart (donut) for overall sentiment with legend
2. Grouped BarChart comparing Claude vs GPT-5.5

Use data from src/data/sentiment.ts. Custom tooltip. Colors from 
SENTIMENT_COLORS. Add annotation text below the bar chart.
```

### Step 3.5 — Topics Section

**Claude Code prompt:**
```
Build TopicsSection.tsx with two-column grid:
1. Horizontal BarChart (layout="vertical") for topics
2. RadarChart for action verbs

Use data from src/data/topics.ts and src/data/verbs.ts. Gradient bars 
for topics. Cyan fill at 15% opacity for radar. Custom tooltips.
```

### Step 3.6 — Entity Section

**Claude Code prompt:**
```
Build EntitySection.tsx with ranked progress bars for 8 entities from 
src/data/entities.ts. Each row: type indicator + name + type badge + 
mention count + animated progress bar. Amber gradient for persons, 
cyan gradient for companies. Bars proportional to max (Jorge = 100%). 
Staggered Reveal at 60ms per row.
```

### Step 3.7 — Timeline Section

**Claude Code prompt:**
```
Build TimelineSection.tsx with a vertical timeline for 9 milestones 
from src/data/milestones.ts. Vertical line on left, phase-colored 
dots, milestone cards with hover lift effect and phase badges. 
Use PHASE_COLORS from meta. Staggered reveals.
```

### Step 3.8 — Arc Section

**Claude Code prompt:**
```
Build ArcSection.tsx — the closing section. Centered, max 900px. 
Section label + arc heading ("From conversational assistant → emergent 
BD intelligence layer → multi-model operating system"). Three summary 
stats. Final principle quote. Footer with org name and location.
```

---

## Phase 4: Motion + Polish (Day 3)

### Step 4.1 — Wire NavDots

Connect NavDots to `useActiveSection` hook. Test section jumping.

### Step 4.2 — Loading Screen

Build LoadingScreen component. Show during Three.js Canvas init. Fade out on ready.

### Step 4.3 — Scan-Line Hover on KPI Cards

Add CSS keyframe for scan-line that sweeps across card on hover.

### Step 4.4 — Test All Scroll Reveals

Manually scroll through entire page. Verify all reveals trigger once, at correct thresholds, with proper stagger.

### Step 4.5 — Test All Chart Tooltips

Hover every chart data point. Verify tooltip renders, positions correctly, dismisses on mouseout.

### Step 4.6 — Keyboard Navigation

Add arrow key support for navigating between sections.

---

## Phase 5: Responsive + Performance (Day 4, Morning)

### Step 5.1 — Mobile Breakpoint

Test at 375px. Apply all responsive rules from design system. Replace Three.js with CSS gradient on mobile.

### Step 5.2 — Tablet Breakpoint

Test at 768px. Verify grid layouts collapse to single column where specified.

### Step 5.3 — Performance Audit

```bash
# Build and preview
npm run build
npm run preview

# Test with Lighthouse
# Target: Performance 80+, Accessibility 90+
```

Check Three.js FPS with Chrome DevTools FPS meter. Target: steady 60fps on desktop.

### Step 5.4 — Reduced Motion

Test with `prefers-reduced-motion: reduce`. Verify: no Three.js, no reveals, counters show final values.

### Step 5.5 — Font Loading

Add preload links for Syne, DM Sans, JetBrains Mono. Test for FOUT.

---

## Phase 6: Deploy (Day 4, Afternoon)

### Step 6.1 — Build

```bash
npm run build
```

Verify dist/ output. Check bundle sizes.

### Step 6.2 — Deploy to Vercel

```bash
npm i -g vercel
vercel
```

### Step 6.3 — Final QA

Test deployed URL on: Chrome, Edge, Safari, mobile Safari, Chrome Android.

### Step 6.4 — OG Image

Create 1200×630px OG image with project branding. Add to `<meta>` tags.

---

## Verification Checklist

- [ ] All 8 sections render with correct data
- [ ] 3D hero runs at ≥ 55fps
- [ ] All 6 charts render with tooltips
- [ ] Scroll reveals trigger correctly
- [ ] KPI counters animate on scroll
- [ ] NavDots track and navigate
- [ ] Mobile layout works at 375px
- [ ] No console errors in production
- [ ] Lighthouse Performance ≥ 80
- [ ] Data integrity: all values match source document
- [ ] Fonts load without FOUT
- [ ] Loading screen appears and fades
- [ ] prefers-reduced-motion respected
