# Component Specification

**Document ID:** JARVIS-PDBM-COMP-001
**Version:** 1.0

---

## Shared Components

### `<Reveal>`

Scroll-triggered fade-in wrapper. Core animation primitive used throughout.

```typescript
interface RevealProps {
  children: React.ReactNode;
  delay?: number;         // ms delay before animation starts (default: 0)
  duration?: number;       // ms animation duration (default: 800)
  distance?: number;       // px translateY distance (default: 40)
  threshold?: number;      // IntersectionObserver threshold (default: 0.15)
  once?: boolean;          // Only animate once (default: true)
  className?: string;
}
```

**Behavior:**
- Renders children with `opacity: 0` and `translateY(distance)` initially.
- When IntersectionObserver fires (threshold), transitions to `opacity: 1` and `translateY(0)`.
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)`.
- If `once: true`, disconnects observer after triggering.
- If `prefers-reduced-motion`, renders visible immediately with no animation.

**Framer Motion implementation:**

```tsx
<motion.div
  initial={{ opacity: 0, y: distance }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once, amount: threshold }}
  transition={{ duration: duration / 1000, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] }}
  className={className}
>
  {children}
</motion.div>
```

---

### `<Counter>`

Animated number that counts from 0 to target value.

```typescript
interface CounterProps {
  end: number;             // Target value
  duration?: number;       // ms (default: 2000)
  delay?: number;          // ms before animation starts (default: 0)
  suffix?: string;         // e.g., "%" or "+"
  prefix?: string;         // e.g., "$" or "#"
  separator?: boolean;     // Locale-aware thousand separators (default: true)
}
```

**Behavior:**
- Starts counting when scrolled into view (IntersectionObserver, threshold 0.3).
- Easing: quartic ease-out `(1 - (1-t)^4)`.
- Only triggers once.
- Displays `end` value immediately if `prefers-reduced-motion`.
- Formats with `toLocaleString()` when `separator: true`.

---

### `<NavDots>`

Fixed-position section navigation indicator.

```typescript
interface NavDotsProps {
  sections: string[];       // Labels: ["Hero", "KPIs", "Activity", ...]
  activeIndex: number;      // Currently visible section
  onNavigate: (index: number) => void;
}
```

**Behavior:**
- Fixed position: right 20px, vertically centered.
- Each dot: 8px circle, 1px border `rgba(0,240,255,0.4)`.
- Active dot: filled cyan, scale 1.3, box-shadow glow.
- Click triggers smooth scroll to section.
- Hover: show label tooltip (to the left of the dot).
- Hidden on mobile (< 640px).
- `z-index: 50`.

---

### `<SectionLabel>`

Monospace chapter identifier.

```typescript
interface SectionLabelProps {
  children: string;         // e.g., "Chapter I" or "Signal Density"
}
```

**Renders:** JetBrains Mono, 11px, letter-spacing 3px, uppercase, `rgba(0,240,255,0.5)`. Bottom margin 12px.

---

### `<SectionHeading>`

Section title with optional glow text span.

```typescript
interface SectionHeadingProps {
  children: React.ReactNode;  // Can include <GlowText> children
  className?: string;
}
```

**Renders:** Syne, `clamp(28px, 5vw, 56px)`, weight 700, letter-spacing -1px, bottom margin 48px (or 60px when followed directly by content).

---

### `<GlowText>`

Inline span with cyan gradient text effect.

```typescript
interface GlowTextProps {
  children: string;
}
```

**Renders:** `background: linear-gradient(135deg, #00F0FF, #00B4D8, #0077B6); -webkit-background-clip: text; -webkit-text-fill-color: transparent;`

---

### `<GlassCard>`

Glassmorphism container.

```typescript
interface GlassCardProps {
  children: React.ReactNode;
  padding?: string;         // Tailwind padding class (default: "p-8")
  className?: string;
  hover?: boolean;          // Enable hover lift effect (default: false)
}
```

**Renders:** See Design System `glass-card` specification. Includes `::before` top highlight line.

---

### `<ChartTooltip>`

Custom Recharts tooltip component.

```typescript
interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color?: string }>;
  label?: string;
}
```

**Renders:** Dark glass card with cyan title, value rows. See Design System spec.

---

### `<LoadingScreen>`

Full-screen loading state shown during Three.js initialization.

```typescript
interface LoadingScreenProps {
  isLoading: boolean;
}
```

**Behavior:**
- Full viewport, `bg-primary` background.
- Centered: pulsing cyan dot + "Initializing..." text (JetBrains Mono).
- Fades out over 600ms when `isLoading` becomes false.
- Then unmounts from DOM.

---

## Section Components

### `<HeroSection>`

**Layout:** Full viewport height, relative position. Three.js canvas behind, text centered over it.

**Children:**
- `<HeroCanvas>` (absolute, inset 0, z-0)
- Bottom gradient overlay (absolute, z-1)
- Content block (relative, z-2):
  - Section label: "INFRATEK-PDBM-MTR-2026"
  - H1: "Jarvis" (glow text) × "PDBM"
  - Subtitle: "Mid-Term Review — 75 Days of Intelligence"
  - Metadata row: date range | location | interactions count
  - Scroll indicator (floating animation)

**Responsive:** On mobile, replace HeroCanvas with CSS gradient background.

---

### `<KpiSection>`

**Layout:** Max-width 1200px, centered. Top padding 120px.

**Content:**
1. Section label + heading ("By the Numbers")
2. 6-column responsive grid of KPI cards
3. North Star quote block (border-left accent)

**KPI Card spec:**

| # | Value | Label |
|---|-------|-------|
| 1 | 53 | Sessions |
| 2 | 4,103 | Interactions |
| 3 | 836 | Memories |
| 4 | 75 | Days Active |
| 5 | 72 | Lifelogs |
| 6 | 256 | Files Inspected |

Each card is wrapped in `<Reveal delay={i * 80}>`.

---

### `<VelocitySection>`

**Layout:** Max-width 1200px. Contains label, heading, description text, chart card.

**Chart:** Recharts `<AreaChart>` with 57 data points.
- Gradient fill: cyan → transparent.
- Stroke: `#00F0FF`, width 2.
- No dots, active dot on hover (r=4, cyan fill, dark stroke).
- X-axis: Day number. Y-axis: message count.
- Height: 280px (desktop), 200px (mobile).

**Annotation:** "Peak: 1,078 messages on April 25 — GPT-5.5 migration day" in description.

---

### `<SentimentSection>`

**Layout:** Max-width 1200px. Two-column grid (min 280px per column).

**Left card — Donut chart:**
- Recharts `<PieChart>` with `<Pie innerRadius={55} outerRadius={90}>`.
- 4 segments: Productive (cyan), Neutral (grey-blue), Frustrated (red), Exploratory (amber).
- `paddingAngle: 3`, no stroke.
- Legend below chart with color swatches and percentage.

**Right card — Grouped bar chart:**
- 4 groups (sentiment categories), 2 bars each (Claude = cyan, GPT = amber).
- Rounded top corners on bars.
- Annotation text below chart.

---

### `<TopicsSection>`

**Layout:** Max-width 1200px. Two-column grid (min 300px).

**Left card — Horizontal bar chart:**
- Recharts `<BarChart layout="vertical">`.
- 9 topics. Gradient fill bars.
- Y-axis: topic labels. X-axis: mention count.

**Right card — Radar chart:**
- Recharts `<RadarChart>` with 8 action verbs.
- Single data series (weight).
- Grid: `rgba(0,240,255,0.1)`.
- Fill: cyan at 15% opacity, stroke cyan.
- Annotation text below.

---

### `<EntitySection>`

**Layout:** Max-width 1200px. Single GlassCard containing 8 entity rows.

**Each row:**
- Left: type indicator dot (circle/square) + entity name (Syne 600) + type badge (mono, 10px)
- Right: mention count (mono, 13px)
- Below: progress bar (6px, proportional to max entity, gradient fill)
- Each row wrapped in `<Reveal delay={i * 60}>`.

---

### `<TimelineSection>`

**Layout:** Max-width 1200px. Left padding 32px for timeline line.

**Structure:**
- Vertical line (absolute, 1px, cyan gradient top→bottom).
- 9 milestone cards, each with:
  - Timeline dot (12px, border-color by phase, hollow)
  - Card content: label, date, phase badge
  - Hover: lift + border glow

**Phase colors:**
| Phase | Color | Hex |
|-------|-------|-----|
| 1 | Cyan | `#00F0FF` |
| 2 | Amber | `#FFB547` |
| 3 | Red | `#FF4D6A` |
| 4 | Purple | `#A855F7` |

---

### `<ArcSection>`

**Layout:** Max-width 900px, centered, text-align center. Large padding.

**Content:**
1. Section label + heading (the arc statement with glow text)
2. Three summary stats in a row (85 Jorge Messages, 4 Phases, 17 Chapters)
3. Final principle quote in bordered card
4. Footer: "PDBM CONSULTING × INFRATEK AI — DORADO, PR — 2026"

---

## Three.js Components (R3F)

### `<HeroCanvas>`

R3F `<Canvas>` wrapper. Props: none (reads scroll from context or hook).

```tsx
<Canvas
  camera={{ position: [0, 0, 30], fov: 60, near: 0.1, far: 1000 }}
  gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
  dpr={[1, 2]}
  style={{ position: 'absolute', inset: 0, zIndex: 0 }}
>
  <ScrollCamera />
  <ParticleField />
  <ConnectionLines />
  <CoreGeometry />
  <OrbitalRings />
</Canvas>
```

### `<ParticleField>`

- 500 particles (200 on mobile, 0 on reduced motion).
- `<Points>` with `<BufferGeometry>` and `<PointsMaterial>`.
- Vertex colors: 70% blue-grey, 20% cyan, 10% amber.
- Additive blending, size 1.8, transparent, opacity 0.8.
- `useFrame`: update positions by velocity, bounce at bounds (±30x, ±20y, ±15z).

### `<ConnectionLines>`

- `<LineSegments>` with `<BufferGeometry>`.
- Each frame: check distances between first 100 particles, draw lines where distance < 8.
- Max 200 line segments.
- Material: cyan, opacity 0.08, additive blending.
- Update draw range each frame.

### `<CoreGeometry>`

- `<Mesh>`: `<IcosahedronGeometry args={[4, 1]}>` with `<MeshBasicMaterial wireframe color="#00F0FF" transparent opacity={0.12}>`.
- `useFrame`: rotate x and y at different speeds.

### `<OrbitalRings>`

- Two `<Mesh>` with `<TorusGeometry>`.
- Ring 1: radius 12, tube 0.05, cyan, opacity 0.15, rotation x=π/2.5.
- Ring 2: radius 16, tube 0.03, amber, opacity 0.08, rotation x=π/3, y=π/6.
- `useFrame`: rotate z-axis, opposite directions.

### `<ScrollCamera>`

- `useFrame`: read scroll progress from hook or context.
- Camera Y offset: `-scrollProgress * 3`.
- Camera X rotation: `scrollProgress * 0.1`.
- Smooth interpolation: `lerp(current, target, 0.05)`.
