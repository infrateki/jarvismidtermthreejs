# Technical Architecture

**Document ID:** JARVIS-PDBM-ARCH-001
**Version:** 1.0
**Date:** April 27, 2026

---

## 1. Architecture Overview

Single-page React application with a Three.js 3D layer, Recharts data visualizations, and Framer Motion scroll animations. Static data embedded at build time. No backend.

```
┌──────────────────────────────────────────────────────────┐
│                     BROWSER                               │
│                                                           │
│  ┌─────────────────────────────────────────────────────┐  │
│  │               Vite Dev Server / Static Host          │  │
│  └─────────────────────────────────────────────────────┘  │
│                          │                                 │
│  ┌─────────────────────────────────────────────────────┐  │
│  │                   React 19 App                       │  │
│  │                                                      │  │
│  │  ┌──────────┐  ┌──────────┐  ┌───────────────────┐  │  │
│  │  │ Three.js │  │ Recharts │  │  Framer Motion    │  │  │
│  │  │ (R3F)    │  │ Charts   │  │  Scroll Reveals   │  │  │
│  │  │          │  │          │  │  Page Transitions  │  │  │
│  │  │ WebGL2   │  │ SVG      │  │  Layout Anims     │  │  │
│  │  └──────────┘  └──────────┘  └───────────────────┘  │  │
│  │                                                      │  │
│  │  ┌──────────────────────────────────────────────┐   │  │
│  │  │           Static Data Layer (TS)              │   │  │
│  │  │  kpis · sentiment · topics · entities · etc   │   │  │
│  │  └──────────────────────────────────────────────┘   │  │
│  └─────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

---

## 2. Tech Stack Decisions

### React 19 + TypeScript

React for component composition. TypeScript for type safety on data structures. React 19 for concurrent features and improved performance.

### React Three Fiber (R3F) over raw Three.js

R3F provides declarative Three.js in React. Benefits:
- Component lifecycle management (auto-dispose)
- React state drives 3D scene updates
- Drei helpers for common patterns (OrbitControls, Text, etc.)
- Fits naturally in the React component tree

The Three.js scene is isolated to the hero section. It does NOT wrap the entire page.

### Recharts over D3 / Nivo / Victory

Recharts is React-native, declarative, and handles responsive containers well. The charts needed (area, bar, pie, radar) are all first-class in Recharts. Custom tooltip styling is straightforward.

### Framer Motion over GSAP / CSS-only

Framer Motion integrates natively with React. Provides `whileInView` for scroll-triggered animations without manual IntersectionObserver boilerplate. Layout animations for future section transitions.

GSAP is the fallback if complex timeline sequencing is needed beyond what Framer Motion handles.

### Lenis for Smooth Scroll

Native browser scroll with Lenis providing smooth interpolation. Lenis runs on top of native scroll (not hijacking it), so accessibility and browser behavior are preserved.

### Tailwind CSS 4

Utility-first styling with CSS variables for the design system tokens. Avoids writing custom CSS for layout/spacing. Custom CSS only for glassmorphism effects, gradients, and animation keyframes.

---

## 3. Project Structure

```
jarvis-pdbm/
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── vite.config.ts
├── postcss.config.js
│
├── public/
│   ├── og-image.png              # Open Graph image
│   └── favicon.svg               # Favicon
│
├── src/
│   ├── main.tsx                  # Entry point
│   ├── App.tsx                   # Root component, scroll provider
│   ├── index.css                 # Global styles, font imports, CSS vars
│   │
│   ├── data/                     # Static data layer
│   │   ├── kpis.ts
│   │   ├── daily-messages.ts
│   │   ├── sentiment.ts
│   │   ├── topics.ts
│   │   ├── verbs.ts
│   │   ├── entities.ts
│   │   ├── milestones.ts
│   │   └── meta.ts
│   │
│   ├── components/               # Shared components
│   │   ├── Reveal.tsx            # Scroll-triggered reveal wrapper
│   │   ├── Counter.tsx           # Animated number counter
│   │   ├── NavDots.tsx           # Fixed section navigation
│   │   ├── SectionLabel.tsx      # "CHAPTER I" style label
│   │   ├── SectionHeading.tsx    # Section title with glow text
│   │   ├── GlassCard.tsx         # Glassmorphism card
│   │   ├── ChartTooltip.tsx      # Styled tooltip for all charts
│   │   └── LoadingScreen.tsx     # Initial loading state
│   │
│   ├── sections/                 # Page sections (1 file per section)
│   │   ├── HeroSection.tsx       # Section 0: 3D hero
│   │   ├── KpiSection.tsx        # Section 1: KPI cards
│   │   ├── VelocitySection.tsx   # Section 2: Daily messages
│   │   ├── SentimentSection.tsx  # Section 3: Sentiment analysis
│   │   ├── TopicsSection.tsx     # Section 4: Topics + verbs
│   │   ├── EntitySection.tsx     # Section 5: Entity graph
│   │   ├── TimelineSection.tsx   # Section 6: Milestones
│   │   └── ArcSection.tsx        # Section 7: Closing arc
│   │
│   ├── three/                    # Three.js scene components
│   │   ├── HeroCanvas.tsx        # R3F Canvas wrapper
│   │   ├── ParticleField.tsx     # Particle constellation
│   │   ├── ConnectionLines.tsx   # Dynamic lines between particles
│   │   ├── CoreGeometry.tsx      # Icosahedron wireframe
│   │   ├── OrbitalRings.tsx      # Torus rings
│   │   └── ScrollCamera.tsx      # Scroll-driven camera movement
│   │
│   ├── hooks/                    # Custom hooks
│   │   ├── useScrollProgress.ts  # Normalized scroll position
│   │   ├── useActiveSection.ts   # Current visible section index
│   │   ├── useMediaQuery.ts      # Responsive breakpoint detection
│   │   └── useReducedMotion.ts   # Accessibility: prefers-reduced-motion
│   │
│   ├── lib/                      # Utilities
│   │   ├── cn.ts                 # Tailwind class merge utility
│   │   ├── easing.ts             # Easing functions
│   │   └── format.ts             # Number formatting
│   │
│   └── types/                    # TypeScript types
│       └── index.ts              # All shared interfaces
```

---

## 4. Component Tree

```
<App>
  <Lenis>                          ← smooth scroll wrapper
    <LoadingScreen />              ← shown during Three.js init
    <NavDots />                    ← fixed position, z-50
    
    <main>
      <HeroSection>
        <HeroCanvas>               ← R3F Canvas (absolute positioned)
          <ScrollCamera />
          <ParticleField />
          <ConnectionLines />
          <CoreGeometry />
          <OrbitalRings />
        </HeroCanvas>
        <HeroContent />            ← title, metadata (z-10 over canvas)
      </HeroSection>
      
      <KpiSection>
        <Reveal> × 6
          <GlassCard>
            <Counter />
          </GlassCard>
        </Reveal>
        <Reveal>
          <NorthStarQuote />
        </Reveal>
      </KpiSection>
      
      <VelocitySection>
        <GlassCard>
          <AreaChart />            ← Recharts
        </GlassCard>
      </VelocitySection>
      
      <SentimentSection>
        <GlassCard>
          <PieChart />             ← Recharts
        </GlassCard>
        <GlassCard>
          <BarChart />             ← Recharts (grouped)
        </GlassCard>
      </SentimentSection>
      
      <TopicsSection>
        <GlassCard>
          <BarChart layout="vertical" />
        </GlassCard>
        <GlassCard>
          <RadarChart />
        </GlassCard>
      </TopicsSection>
      
      <EntitySection>
        <GlassCard>
          <EntityBar /> × 8
        </GlassCard>
      </EntitySection>
      
      <TimelineSection>
        <TimelineLine />
        <MilestoneCard /> × 9
      </TimelineSection>
      
      <ArcSection>
        <ClosingStatement />
        <SummaryStats />
        <Footer />
      </ArcSection>
    </main>
  </Lenis>
</App>
```

---

## 5. Rendering Pipeline

### Three.js Scene (Hero only)

```
Frame Loop:
  1. Update particle positions (bounded velocity)
  2. Recalculate connection lines (distance check, max 200 lines)
  3. Rotate core geometry and rings
  4. Apply scroll-driven camera offset
  5. Render via WebGL2
```

The R3F `<Canvas>` is positioned `absolute` behind the hero content. It uses `alpha: true` for transparent background so the gradient overlay and text sit on top.

On mobile (< 768px), the 3D scene is replaced with a static gradient + subtle CSS animation to preserve performance.

### Chart Rendering

All Recharts components use `<ResponsiveContainer>` for fluid sizing. SVG-based rendering. Custom tooltip component shared across all charts.

### Scroll Animation Pipeline

```
Scroll Event (passive listener)
  → Lenis interpolates scroll position
  → useScrollProgress() computes 0–1 progress
  → useActiveSection() determines current section
  → NavDots re-renders with active state
  → Framer Motion whileInView triggers section reveals
  → Three.js camera offset updates via R3F useFrame
```

---

## 6. Performance Strategy

### Code Splitting

```typescript
// Lazy load sections below the fold
const VelocitySection = lazy(() => import('./sections/VelocitySection'));
const SentimentSection = lazy(() => import('./sections/SentimentSection'));
// ... etc
```

### Three.js Optimization

- Particle count: 500 desktop, 200 mobile, 0 on `prefers-reduced-motion`
- Connection lines: max 200 line segments, check only first 100 particles
- `setPixelRatio(Math.min(devicePixelRatio, 2))`
- Dispose all geometries, materials, textures on unmount
- Use `BufferGeometry` with `Float32Array` (no intermediate arrays)

### Bundle Optimization

```typescript
// vite.config.ts
export default defineConfig({
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

### Font Loading

```html
<link rel="preload" href="Syne-Variable.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="DMSans-Variable.woff2" as="font" type="font/woff2" crossorigin>
```

---

## 7. Responsive Breakpoints

| Breakpoint | Width | Behavior |
|------------|-------|----------|
| `mobile` | < 640px | Single column, no 3D, reduced chart heights |
| `tablet` | 640–1023px | Single/two column, simplified 3D |
| `desktop` | 1024–1439px | Full layout, full 3D |
| `wide` | ≥ 1440px | Max-width container (1200px), generous padding |

---

## 8. Deployment

Static build deployed to Vercel (or Netlify/Cloudflare Pages).

```bash
npm run build     # Produces dist/
vercel deploy     # Auto-deploys
```

Environment: No secrets, no env vars needed. Fully static.

Custom domain: `review.infratek.ai` or `jarvis.pdbm.com` (TBD).

---

## 9. Browser Compatibility

| Browser | Version | Support Level |
|---------|---------|--------------|
| Chrome | 100+ | Full (primary target) |
| Edge | 100+ | Full |
| Safari | 17+ | Full (WebGL2 supported) |
| Firefox | 120+ | Full |
| Safari iOS | 17+ | Degraded (no 3D, 2D charts only) |
| Chrome Android | 100+ | Degraded (reduced 3D) |
