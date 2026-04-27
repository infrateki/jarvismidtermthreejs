# Product Requirements Document

**Project:** Jarvis × PDBM — Immersive Mid-Term Review
**Document ID:** JARVIS-PDBM-PRD-001
**Version:** 1.0
**Date:** April 27, 2026
**Author:** Senior PM
**Status:** Approved for Development

---

## 1. Executive Summary

Build an award-winning, immersive 3D data experience that presents the Jarvis AI assistant's 75-day mid-term review for PDBM Consulting and INFRATEK AI. The site transforms a dense operational report into a narrative-driven, scroll-based interactive experience using Three.js (WebGPU/WebGL), React, and modern data visualization.

The target quality bar is Awwwards / FWA / CSS Design Awards submission-ready. Think Bloomberg Terminal aesthetics meets Stripe's editorial design, rendered in a Three.js-powered 3D environment.

---

## 2. Problem Statement

The mid-term review contains 17 chapters of dense telemetry, sentiment analysis, entity graphs, milestone timelines, and operational metrics across 4,103 interactions. Presenting this as a traditional PDF or slide deck fails to communicate the sophistication of the Jarvis system and the scale of what PDBM + INFRATEK have built.

The stakeholders (Jorge Quiroz, Julio, Shami, and potential investors/partners) need a presentation format that is memorable, navigable, data-rich, and demonstrates the technical capabilities of the team building Jarvis.

---

## 3. Target Users

| Persona | Context | Need |
|---------|---------|------|
| **Jorge Quiroz** (PDBM Principal) | Reviews Jarvis performance, shares with partners | Executive summary, key metrics, clear narrative arc |
| **Sergio** (INFRATEK Lead) | Demonstrates technical achievement | Showcase the engineering, data density, system sophistication |
| **Investors / Partners** | First impression of PDBM + INFRATEK capabilities | "Wow factor", professionalism, data transparency |
| **Technical Audience** | Evaluating the AI stack | Architecture decisions, model comparison, pipeline visibility |

---

## 4. Success Criteria

| Criteria | Target | Measurement |
|----------|--------|-------------|
| First meaningful paint | < 1.5s | Lighthouse |
| 3D scene at 60fps | Desktop Chrome/Edge | Chrome DevTools FPS meter |
| Scroll interactions smooth | No jank on modern hardware | Scroll performance profiling |
| Mobile responsive | Graceful degradation, no 3D on < 768px | Manual QA on iPhone 15, Pixel 8 |
| Data accuracy | 100% match to source document | Manual cross-reference |
| Awwwards-quality design | Peer review by 2+ designers | Subjective, documented feedback |
| Accessibility | WCAG 2.1 AA on text content | axe-core audit |
| Build size | < 500KB gzipped (excl. Three.js) | Vite build output |

---

## 5. Scope

### 5.1 In Scope

- Single-page scrolling application (SPA)
- 8 sections mapped to document chapters
- Interactive 3D hero scene with particle constellation
- Animated KPI counters with scroll-triggered reveal
- 6 distinct data visualizations (area, bar, pie, radar, horizontal bar, progress bars)
- Timeline with phase-coded milestones
- Scroll-based navigation with dot indicators
- Responsive layout (desktop-first, mobile-friendly)
- WebGL renderer (Three.js r170+, WebGL2 default, WebGPU optional enhancement)
- Dark theme with cyan + amber accent palette
- Page load orchestration (staggered reveals)
- Keyboard navigation for sections

### 5.2 Out of Scope (v1)

- CMS or dynamic data editing
- User authentication
- Backend API (all data is static/embedded)
- html-in-canvas effects (Chrome Canary flag — not production-ready)
- Full 17-chapter coverage (v1 covers Chapters I–V + Timeline + Arc)
- Print stylesheet
- Internationalization
- Analytics integration

### 5.3 Future Considerations (v2)

- Full 17-chapter expansion
- WebGPU renderer with TSL shaders (when browser support > 95%)
- html-in-canvas page transitions
- Dynamic data pipeline from Convex/Limitless API
- PDF export
- Presentation mode (full-screen, auto-advancing sections)

---

## 6. Information Architecture

```
┌─────────────────────────────────────────────────┐
│  SECTION 0 — HERO                               │
│  3D particle scene · Title · Metadata            │
├─────────────────────────────────────────────────┤
│  SECTION 1 — BY THE NUMBERS                     │
│  6 KPI cards · North Star quote                  │
├─────────────────────────────────────────────────┤
│  SECTION 2 — DAILY VELOCITY                     │
│  Area chart (57 days) · Peak callout             │
├─────────────────────────────────────────────────┤
│  SECTION 3 — SENTIMENT PULSE                    │
│  Donut chart (overall) · Bar chart (Claude/GPT)  │
├─────────────────────────────────────────────────┤
│  SECTION 4 — WHAT JORGE ASKS                    │
│  Horizontal bar (topics) · Radar (action verbs)  │
├─────────────────────────────────────────────────┤
│  SECTION 5 — ENTITY GRAPH                       │
│  Ranked progress bars · Type indicators          │
├─────────────────────────────────────────────────┤
│  SECTION 6 — THE JOURNEY                        │
│  Vertical timeline · Phase badges                │
├─────────────────────────────────────────────────┤
│  SECTION 7 — THE ARC                            │
│  Closing statement · Summary stats · Footer      │
└─────────────────────────────────────────────────┘

PERSISTENT:
  ├── Navigation dots (right edge, fixed)
  └── Scroll progress indicator (optional)
```

---

## 7. Functional Requirements

### FR-01: 3D Hero Scene

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-01.1 | Particle constellation with 400–600 points | P0 |
| FR-01.2 | Particles drift with bounded velocity, bounce at edges | P0 |
| FR-01.3 | Dynamic connection lines between nearby particles (< 8 units) | P0 |
| FR-01.4 | Central wireframe icosahedron, rotating slowly | P1 |
| FR-01.5 | Two orbital torus rings with different rotation axes | P1 |
| FR-01.6 | Additive blending for particles (glow effect) | P0 |
| FR-01.7 | Vertex colors: 70% blue-grey, 20% cyan, 10% amber | P1 |
| FR-01.8 | Scroll-driven camera parallax (Y-axis offset) | P1 |
| FR-01.9 | Gradient overlay at bottom for text readability | P0 |
| FR-01.10 | Responsive: scale particle count on mobile (200 max) | P2 |

### FR-02: KPI Cards

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-02.1 | 6 cards in responsive grid (auto-fit, 160px min) | P0 |
| FR-02.2 | Animated counters (ease-out quartic, 2s duration) | P0 |
| FR-02.3 | Counter animation triggers on scroll into view (IntersectionObserver) | P0 |
| FR-02.4 | Staggered reveal delay (80ms per card) | P1 |
| FR-02.5 | Number formatting with locale-aware commas | P0 |
| FR-02.6 | Glassmorphism card style with subtle top highlight line | P1 |
| FR-02.7 | Scan-line hover effect on cards | P2 |

### FR-03: Daily Velocity Chart

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-03.1 | Area chart with 57 data points | P0 |
| FR-03.2 | Gradient fill (cyan → transparent) | P0 |
| FR-03.3 | Active dot on hover with styled tooltip | P0 |
| FR-03.4 | Axes styled to match dark theme | P0 |
| FR-03.5 | Peak annotation (Apr 25 = 1,078) | P1 |

### FR-04: Sentiment Analysis

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-04.1 | Donut/ring chart for overall sentiment (4 categories) | P0 |
| FR-04.2 | Legend with percentage calculations | P0 |
| FR-04.3 | Grouped bar chart: Claude vs GPT-5.5 by sentiment | P0 |
| FR-04.4 | Two-column responsive layout | P0 |
| FR-04.5 | Contextual annotation text | P1 |

### FR-05: Topics & Verbs

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-05.1 | Horizontal bar chart with 9 topics | P0 |
| FR-05.2 | Gradient fill on bars (blue → cyan) | P1 |
| FR-05.3 | Radar chart with 8 action verbs | P0 |
| FR-05.4 | Two-column responsive layout | P0 |

### FR-06: Entity Graph

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-06.1 | 8 entities with ranked progress bars | P0 |
| FR-06.2 | Bars proportional to max entity (Jorge = 100%) | P0 |
| FR-06.3 | Color coding: amber for persons, cyan for companies | P0 |
| FR-06.4 | Type indicator (dot shape: circle = person, square = company) | P1 |
| FR-06.5 | Staggered scroll reveal (60ms per entity) | P1 |

### FR-07: Timeline

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-07.1 | Vertical timeline with 9 milestones | P0 |
| FR-07.2 | Phase-colored dots and badges (4 phases, 4 colors) | P0 |
| FR-07.3 | Cards with date, label, phase indicator | P0 |
| FR-07.4 | Hover effect: lift + border glow | P1 |
| FR-07.5 | Staggered reveal on scroll | P1 |

### FR-08: Navigation

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-08.1 | Fixed dot navigation on right edge | P0 |
| FR-08.2 | Active dot highlights based on scroll position | P0 |
| FR-08.3 | Click to scroll to section (smooth behavior) | P0 |
| FR-08.4 | Tooltip labels on hover | P1 |
| FR-08.5 | Keyboard: Arrow keys navigate sections | P2 |

### FR-09: Scroll Reveal System

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-09.1 | Generic `<Reveal>` component wrapping any content | P0 |
| FR-09.2 | Fade-in + translate-Y animation | P0 |
| FR-09.3 | Configurable delay prop | P0 |
| FR-09.4 | Triggers once (no re-animation on scroll back) | P0 |
| FR-09.5 | Uses IntersectionObserver (threshold 0.15) | P0 |

---

## 8. Non-Functional Requirements

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-01 | Performance: 60fps 3D scene on M1+ MacBook | Mandatory |
| NFR-02 | Performance: Smooth scroll with charts on 2020+ hardware | Mandatory |
| NFR-03 | Bundle: Three.js tree-shaken, total JS < 800KB gzipped | Target |
| NFR-04 | Accessibility: All text content readable by screen readers | P1 |
| NFR-05 | Accessibility: Color contrast ratio ≥ 4.5:1 for body text | P1 |
| NFR-06 | Browser support: Chrome 100+, Edge 100+, Safari 17+, Firefox 120+ | P0 |
| NFR-07 | Responsive: Usable at 375px–2560px viewport width | P0 |
| NFR-08 | Deploy: Static export, hostable on Vercel/Netlify/S3 | P0 |
| NFR-09 | SEO: Proper meta tags, OG image, structured data | P2 |
| NFR-10 | Loading: Skeleton/loading state while Three.js initializes | P1 |

---

## 9. Data Contract

All data is static and embedded in the application. No API calls at runtime.

Source of truth: `INFRATEK-PDBM-MTR-2026-FINAL` document.

Data files to create:

| File | Contents |
|------|----------|
| `data/kpis.ts` | 6 KPI objects with value, label, suffix |
| `data/daily-messages.ts` | Array of 57 daily message counts |
| `data/sentiment.ts` | Overall, Claude-era, GPT-era sentiment breakdowns |
| `data/topics.ts` | 9 topic objects with topic name and mention count |
| `data/verbs.ts` | 8 action verb objects with verb and weight |
| `data/entities.ts` | 8 entity objects with name, mentions, type |
| `data/milestones.ts` | 9 milestone objects with date, label, phase |
| `data/meta.ts` | Document metadata (dates, location, authors, ID) |

See `specs/data-schema.md` for full schema.

---

## 10. Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | 19.x | UI framework |
| react-dom | 19.x | DOM rendering |
| three | ≥ 0.170.0 | 3D rendering (WebGL2) |
| @react-three/fiber | 9.x | React renderer for Three.js |
| @react-three/drei | 9.x | Three.js helpers (OrbitControls, etc.) |
| recharts | 2.x | Data visualization charts |
| framer-motion | 12.x | Scroll animations, reveals, layout transitions |
| tailwindcss | 4.x | Utility CSS |
| vite | 6.x | Build tool |
| typescript | 5.x | Type safety |

Optional / enhancement:
| Package | Purpose |
|---------|---------|
| lenis | Smooth scrolling library |
| gsap | Complex timeline animations (if Framer Motion insufficient) |
| postprocessing | Three.js post-processing effects (bloom, etc.) |

---

## 11. Risk Register

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Three.js performance on low-end hardware | High | Medium | Reduce particle count dynamically; skip 3D on mobile |
| Recharts styling conflicts with dark theme | Medium | High | Custom tooltip component; override all default styles |
| Bundle size too large | Medium | Medium | Tree-shake Three.js; lazy-load chart sections |
| Framer Motion + Three.js scroll conflicts | Medium | Medium | Isolate Three.js to portal; use native scroll for FM |
| Font loading FOUT | Low | High | Preload critical fonts; font-display: swap |

---

## 12. Release Plan

| Phase | Scope | Duration |
|-------|-------|----------|
| **Phase 1: Foundation** | Vite + React + TS + Tailwind scaffold, routing, layout shell, data layer | Day 1 |
| **Phase 2: Hero** | Three.js scene, particles, icosahedron, rings, scroll parallax | Day 1–2 |
| **Phase 3: Sections** | KPI cards, all 6 chart sections, timeline, arc | Day 2–3 |
| **Phase 4: Motion** | Scroll reveals, counter animations, hover effects, navigation | Day 3 |
| **Phase 5: Polish** | Responsive, performance audit, loading states, font tuning | Day 4 |
| **Phase 6: Deploy** | Build, deploy to Vercel, OG image, final QA | Day 4 |

---

## 13. Acceptance Criteria

1. All 8 sections render correctly with data matching the source document
2. 3D hero scene runs at ≥ 55fps on a 2022 MacBook Air
3. All charts are interactive (tooltips, hover states)
4. Scroll reveal animations trigger correctly on first entry
5. Navigation dots accurately track and scroll to sections
6. Site is navigable on a 375px viewport (3D scene hidden or simplified)
7. No console errors in production build
8. Lighthouse Performance score ≥ 80
9. Total load time < 3s on broadband connection

---

## Appendix A: Related Documents

| Document | Path | Purpose |
|----------|------|---------|
| Technical Architecture | `docs/architecture.md` | Stack decisions, component tree, rendering pipeline |
| Design System | `docs/design-system.md` | Colors, typography, spacing, components |
| Component Specification | `specs/components.md` | Every component with props, behavior, edge cases |
| Data Schema | `specs/data-schema.md` | TypeScript interfaces for all data structures |
| Implementation Roadmap | `docs/implementation-roadmap.md` | Step-by-step build order with Claude Code prompts |
| CLAUDE.md | `CLAUDE.md` | Claude Code project instructions |
