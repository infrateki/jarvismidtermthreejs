# Jarvis × PDBM — Immersive Mid-Term Review

## Project Context

You are building an award-winning, immersive 3D data experience that presents the Jarvis AI assistant's 75-day mid-term review for PDBM Consulting × INFRATEK AI. This is a single-page scrolling React application with a Three.js 3D hero, 6 data visualizations, and scroll-driven animations.

The quality bar is Awwwards submission-ready.

## Tech Stack

- React 19 + TypeScript
- Vite 6 (target: esnext)
- Three.js (via @react-three/fiber + @react-three/drei)
- Recharts (data visualization)
- Framer Motion (scroll animations)
- Lenis (smooth scrolling)
- Tailwind CSS 4

## Architecture

Read these documents before writing any code:
- `docs/PRD.md` — full product requirements, scope, success criteria
- `docs/architecture.md` — project structure, component tree, rendering pipeline
- `docs/design-system.md` — colors, typography, spacing, motion, responsive rules
- `specs/components.md` — every component with TypeScript interfaces and behavior
- `specs/data-schema.md` — all data files with exact values and types
- `docs/implementation-roadmap.md` — step-by-step build order

## Critical Design Rules

### Color
- Background: `#060A18` (deep space navy)
- Primary accent: `#00F0FF` (electric cyan) — KPIs, charts, active states
- Secondary accent: `#FFB547` (amber) — person entities, GPT data, Phase 2
- Text primary: `#E2E8F0`, secondary: `rgba(200,214,229,0.6)`
- Glass cards: `rgba(12,16,35,0.7)` with `backdrop-filter: blur(12px)`

### Typography
- Display: Syne (700–800 weight, letter-spacing: -1px to -2px)
- Body: DM Sans (300–700)
- Data/labels: JetBrains Mono (400–500, uppercase, letter-spacing: 2–3px)
- NEVER use Inter, Roboto, Arial, or system fonts

### Motion
- All reveals: Framer Motion `whileInView`, ease `[0.16, 1, 0.3, 1]`, 800ms
- Counters: quartic ease-out, 2000ms, triggered by IntersectionObserver
- Three.js: 500 particles desktop, 200 mobile, 0 on reduced motion
- Stagger groups at 60–100ms intervals

### Charts (Recharts)
- Custom dark tooltip component on all charts (see specs/components.md)
- Axis text: `rgba(200,214,229,0.25)`, size 10px
- Grid lines: `rgba(0,240,255,0.05)`
- Always use `<ResponsiveContainer width="100%" height={X}>`

## Build Order

Follow `docs/implementation-roadmap.md` exactly. In summary:
1. Scaffold + install deps + configure Vite/Tailwind
2. Create data layer (all `src/data/` files)
3. Build shared components (Reveal, Counter, NavDots, GlassCard, etc.)
4. Build Three.js hero (ParticleField, ConnectionLines, CoreGeometry, Rings)
5. Build sections top-to-bottom (Hero → KPIs → Velocity → Sentiment → Topics → Entities → Timeline → Arc)
6. Wire navigation, scroll tracking, loading screen
7. Responsive, performance, deploy

## Data

All data is static. Source: `INFRATEK-PDBM-MTR-2026-FINAL`. See `specs/data-schema.md` for complete TypeScript files ready to paste.

Key numbers: 53 sessions, 4103 interactions, 836 memories, 75 days, 72 lifelogs, 256 files. Peak day: Apr 25 = 1078 messages.

## File Structure

```
src/
├── main.tsx
├── App.tsx
├── index.css
├── data/ (8 files — kpis, daily-messages, sentiment, topics, verbs, entities, milestones, meta)
├── types/index.ts
├── components/ (8 shared components)
├── sections/ (8 section components)
├── three/ (6 R3F components)
├── hooks/ (4 custom hooks)
└── lib/ (3 utilities)
```

## Testing Commands

```bash
npm run dev      # Dev server
npm run build    # Production build
npm run preview  # Preview production build
```

## Quality Checks

Before marking any section complete:
- Verify data values match source document
- Check typography matches design system (font, weight, size, spacing)
- Test scroll reveal triggers once at correct threshold
- Test chart tooltip on hover
- Verify responsive at 375px, 768px, 1440px
- No console errors or warnings
