# CLAUDE.md — Project Instructions for All Terminals

## Project: Jarvis × PDBM — Immersive Mid-Term Review

### What this is
An award-winning, Awwwards-quality 3D scrolling data experience presenting the 75-day Jarvis AI mid-term review for PDBM Consulting × INFRATEK AI. Single-page React application with a Three.js particle hero, 6+ Recharts visualizations, Framer Motion scroll reveals, and 15 sections covering all 17 chapters of the source document. Dark luxe aesthetic — Bloomberg Terminal meets Stripe editorial.

### Stack
- React 18.3 (JSX, not TypeScript)
- Vite 6 (target: esnext)
- Three.js 0.170 via @react-three/fiber 8.x + @react-three/drei 9.x
- Recharts 2.x (data visualization)
- Framer Motion 11.x (scroll animations)
- No CSS framework — raw CSS with CSS custom properties in index.css
- Deployment: Vercel (static export)

### Language
All UI text is in English. Jorge's quotes appear in original Spanish.

### Before doing any work
1. **Read COMMS.md** — check current status, blockers, and your terminal's ownership
2. **Check file ownership** — do NOT modify files owned by another terminal
3. **Update COMMS.md** when you start and finish work

### Confirmed facts (source of truth)
These values are FINAL. Every terminal must use these exact numbers:

- Total interactions: **4,103**
- Sessions analyzed: **53**
- Memories stored: **836**
- Period: **75 days** (Feb 10 → Apr 26, 2026)
- Lifelogs: **72**
- Files inspected: **256**
- Jorge messages: **85**
- Peak day: **1,078 messages** on April 25, 2026 (GPT-5.5 migration)
- Entity count: **14**
- Milestone count: **11**
- Portal count: **12**
- Risk count: **8**
- Question count: **25**
- People count: **5**
- Agent count: **4**
- Strength count: **7**
- Gap count: **8**
- Autonomy knob levels: **5** (0, 3, 6, 9, 10)
- Pipeline stages: **7** (Radar → Qualified → Jorge Review → Contact → Proposal → Won → Lost)
- Document ID: **INFRATEK-PDBM-MTR-2026-FINAL**
- Location: **Dorado, Puerto Rico**
- Authors: **Sergio Villanueva-Meyer (INFRATEK LLC)** + **Jorge Quiroz (PDBM Consulting)**
- Jorge quote: **"Yo necesito esto, Sergio... Quiero que te lleves la idea, yo lo necesito."** — January 28, 2026

### Design system
```
BACKGROUNDS:
  --bg-primary:    #060A18      (deep space navy — main)
  --bg-glass:      rgba(12, 16, 35, 0.7)  (glassmorphism base)

ACCENTS:
  --cyan-400:      #00F0FF      (PRIMARY — KPIs, charts, active states, glow)
  --cyan-600:      #0077B6      (gradient endpoint)
  --amber-400:     #FFB547      (SECONDARY — persons, GPT data, phase 2)
  --red-400:       #FF4D6A      (frustrated, gaps, phase 3)
  --purple-400:    #A855F7      (phase 4, projects)
  --green-400:     #34D399      (strengths, positive)

TEXT:
  --text-primary:   #E2E8F0
  --text-secondary: rgba(200, 214, 229, 0.6)
  --text-tertiary:  rgba(200, 214, 229, 0.35)
  --text-muted:     rgba(200, 214, 229, 0.2)

TYPOGRAPHY:
  Display/Headings: Syne 700-800, letter-spacing -1px to -2px
  Body:             DM Sans 400-600
  Data/Labels:      JetBrains Mono 400, uppercase, letter-spacing 2-3px, 10-11px

MOTION:
  Reveal easing:    cubic-bezier(0.16, 1, 0.3, 1), 800ms
  Counter easing:   quartic ease-out 1-(1-t)^4, 2000ms
  Stagger:          60-100ms between siblings

COMPONENTS:
  Glass card:       bg-glass + border 1px rgba(0,240,255,0.06) + border-radius 16px + backdrop-filter blur(12px)
  Glass highlight:  ::before pseudo-element, 1px height, gradient cyan glow
  Section padding:  120px top first section, 80px top rest, 120px bottom
  Container:        max-width 1200px, margin 0 auto, padding 0 24px

CHARTS (Recharts):
  Tooltip:          rgba(10,14,28,0.95) bg, cyan border, backdrop blur
  Axes:             rgba(200,214,229,0.25) fontSize 10, no tick lines
  Grid:             rgba(0,240,255,0.05)
  Area fill:        linearGradient cyan 0.4 opacity → 0
  Bar radius:       [4,4,0,0] top corners

NEVER USE: Inter, Roboto, Arial, system fonts, purple gradients on white
```

### Critical constraints
- NO localStorage or sessionStorage (not supported in some contexts)
- CSS class `glow-text` for cyan gradient text — defined in index.css
- CSS class `glass-card` for glassmorphism — defined in index.css
- CSS class `section-label` for JetBrains Mono chapter labels
- CSS class `section-heading` for Syne headings
- Mobile (< 640px): hide Three.js, hide NavDots, single column, reduce chart heights
- All data values come from `src/data/` files — NEVER hardcode numbers
- Source document is INFRATEK-PDBM-MTR-2026-FINAL — treat as read-only truth
- Every section component must have `data-section="N"` attribute (sequential integer)
- Every section component must be a default export

### Commands
```bash
npm install          # Install dependencies (run once)
npm run dev          # Start dev server
npm run build        # Production build (must pass before deploy)
```

### When you finish a task
1. Run `npm run build` to verify production build passes
2. Update your section in COMMS.md with status ✅ and timestamp
3. If you created new exports that other terminals need, note them in COMMS.md
4. If you hit a blocker, add it to COMMS.md BLOCKERS section
