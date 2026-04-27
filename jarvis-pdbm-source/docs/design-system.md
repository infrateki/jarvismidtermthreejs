# Design System

**Document ID:** JARVIS-PDBM-DS-001
**Version:** 1.0
**Aesthetic Direction:** Dark Luxe Data — Bloomberg meets Awwwards

---

## 1. Design Philosophy

The visual language communicates three things simultaneously: **technical sophistication** (this team builds serious AI infrastructure), **data transparency** (the metrics are real and thorough), and **editorial refinement** (this is not a dashboard, it is a story).

The design should feel like reading a premium annual report projected onto the inside of a spacecraft.

---

## 2. Color System

### Core Palette

```css
:root {
  /* ── Backgrounds ── */
  --bg-primary:       #060A18;    /* Deep space navy — main background */
  --bg-secondary:     #0A0E1F;    /* Slightly lighter — card backgrounds */
  --bg-elevated:      #0F1428;    /* Elevated surfaces — hover states */
  --bg-glass:         rgba(12, 16, 35, 0.7);  /* Glassmorphism base */

  /* ── Accent: Cyan (Primary) ── */
  --cyan-100:         #E0FCFF;
  --cyan-200:         #B0F0FF;
  --cyan-300:         #66E3FF;
  --cyan-400:         #00F0FF;    /* PRIMARY ACCENT */
  --cyan-500:         #00B4D8;
  --cyan-600:         #0077B6;
  --cyan-700:         #005F8A;

  /* ── Accent: Amber (Secondary) ── */
  --amber-300:        #FFD580;
  --amber-400:        #FFB547;    /* SECONDARY ACCENT */
  --amber-500:        #FF8C00;

  /* ── Semantic ── */
  --red-400:          #FF4D6A;    /* Frustrated / negative */
  --purple-400:       #A855F7;    /* Phase 4 / special */
  --green-400:        #34D399;    /* Positive / success */

  /* ── Text ── */
  --text-primary:     #E2E8F0;    /* Headings, important text */
  --text-secondary:   rgba(200, 214, 229, 0.6);  /* Body text */
  --text-tertiary:    rgba(200, 214, 229, 0.35);  /* Captions, labels */
  --text-muted:       rgba(200, 214, 229, 0.2);   /* Decorative text */

  /* ── Borders ── */
  --border-subtle:    rgba(0, 240, 255, 0.06);
  --border-medium:    rgba(0, 240, 255, 0.12);
  --border-strong:    rgba(0, 240, 255, 0.3);

  /* ── Effects ── */
  --glow-cyan:        0 0 20px rgba(0, 240, 255, 0.15);
  --glow-cyan-strong: 0 0 40px rgba(0, 240, 255, 0.25);
  --glow-amber:       0 0 20px rgba(255, 181, 71, 0.15);
}
```

### Color Usage Rules

- **Cyan (#00F0FF)** is the primary accent. Use for: KPI numbers, chart highlights, active states, primary data series, navigation indicators, glow effects.
- **Amber (#FFB547)** is the secondary accent. Use for: secondary data series (GPT-5.5), person-type entities, Phase 2 indicators, warning states.
- **Red (#FF4D6A)** only for "Frustrated" sentiment and Phase 3.
- **Purple (#A855F7)** only for Phase 4.
- **Never** use cyan and amber at equal visual weight in the same component. One must dominate.

### Gradient Definitions

```css
/* Primary chart gradient */
.gradient-cyan-fill {
  background: linear-gradient(180deg, rgba(0, 240, 255, 0.4) 0%, rgba(0, 240, 255, 0) 100%);
}

/* Bar gradient */
.gradient-bar {
  background: linear-gradient(90deg, #0077B6 0%, #00F0FF 100%);
}

/* Text gradient */
.glow-text {
  background: linear-gradient(135deg, #00F0FF 0%, #00B4D8 50%, #0077B6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Hero bottom fade */
.hero-fade {
  background: linear-gradient(to top, var(--bg-primary), transparent);
}

/* Glass card top highlight */
.glass-highlight {
  background: linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.3), transparent);
}
```

---

## 3. Typography

### Font Stack

| Role | Family | Weight | Source |
|------|--------|--------|--------|
| Display (H1, H2) | **Syne** | 600–800 | Google Fonts |
| Body text | **DM Sans** | 300–700 | Google Fonts |
| Mono / Data labels | **JetBrains Mono** | 400–500 | Google Fonts |

### Type Scale

```css
/* ── Display ── */
--text-hero:     clamp(42px, 8vw, 96px);   /* Hero title only */
--text-h2:       clamp(28px, 5vw, 56px);   /* Section headings */
--text-h3:       clamp(20px, 3vw, 32px);   /* Sub-headings */
--text-h4:       18px;                      /* Card titles */

/* ── Body ── */
--text-body:     15px;                      /* Paragraphs */
--text-small:    13px;                      /* Chart tooltips, captions */
--text-xs:       11px;                      /* Labels, metadata */
--text-xxs:      10px;                      /* Axis ticks, type badges */

/* ── Data ── */
--text-kpi:      clamp(28px, 4vw, 42px);   /* KPI numbers */
--text-stat:     48px;                      /* Summary statistics */
```

### Typography Rules

- **Headings (Syne):** Letter-spacing: `-1px` to `-2px`. Line-height: `1.0`–`1.1`. Always `font-weight: 700` or `800`.
- **Body (DM Sans):** Letter-spacing: `0`. Line-height: `1.6`–`1.8`. Weight: `400` for body, `500` for emphasis, `600` for strong.
- **Mono (JetBrains Mono):** Letter-spacing: `2px`–`3px`. Always `text-transform: uppercase` for labels. `font-size: 10px`–`12px`. Color: `--text-tertiary` or `--cyan-400` at 50% opacity.
- **Section labels** ("CHAPTER I"): JetBrains Mono, 11px, letter-spacing 3px, uppercase, `rgba(0,240,255,0.5)`.
- **Never** use Syne for body text. Never use DM Sans for data labels.

---

## 4. Spacing System

Base unit: `4px`. Use Tailwind spacing scale.

```
4   → xs gap, inner padding
8   → small gap
12  → between label and heading
16  → card inner padding (small), grid gap
24  → card inner padding (medium), section sub-gap
32  → card inner padding (large)
48  → between heading and content
60  → between section heading and first child
80  → section top padding (compact)
120 → section top padding (standard)
160 → section bottom padding (closing)
```

### Section Layout

```
Max width: 1200px (centered)
Side padding: 24px (mobile) → 48px (desktop)
Section vertical padding: 80px top / 120px bottom
```

---

## 5. Component Styles

### GlassCard

```css
.glass-card {
  background: var(--bg-glass);           /* rgba(12,16,35,0.7) */
  border: 1px solid var(--border-subtle); /* rgba(0,240,255,0.06) */
  border-radius: 16px;
  backdrop-filter: blur(12px);
  overflow: hidden;
  position: relative;
}

/* Top highlight line */
.glass-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0,240,255,0.3), transparent);
}
```

### KPI Card

Extends GlassCard. Inner padding: `28px 24px`. Text-align: center.

Number: Syne, `--text-kpi`, weight 800, color `--cyan-400`.
Label: JetBrains Mono, 11px, spacing 2px, uppercase, `--text-tertiary`.

Hover: scan-line animation (2px cyan line sweeps top to bottom in 2s).

### Milestone Card

```css
.milestone-card {
  padding: 20px 24px;
  background: rgba(15, 20, 40, 0.6);
  border: 1px solid rgba(0, 240, 255, 0.08);
  border-radius: 12px;
  backdrop-filter: blur(8px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.milestone-card:hover {
  border-color: rgba(0, 240, 255, 0.3);
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
}
```

### Entity Bar

Progress bar track: `rgba(0,240,255,0.06)`, height 6px, border-radius 3px.
Fill: gradient. Person = amber gradient. Company = cyan gradient.
Animated width on scroll reveal (1.5s, cubic-bezier spring).

### Chart Tooltip

```css
background: rgba(10, 14, 28, 0.95);
border: 1px solid rgba(0, 240, 255, 0.2);
border-radius: 8px;
padding: 10px 14px;
backdrop-filter: blur(10px);
font-family: 'DM Sans';
font-size: 13px;
color: var(--text-secondary);
```

Tooltip title: `--cyan-400`, weight 600, margin-bottom 4px.

---

## 6. Motion System

### Easing Functions

```css
--ease-out-expo:  cubic-bezier(0.16, 1, 0.3, 1);     /* Primary — reveals, transitions */
--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);      /* Counters */
--ease-in-out:    cubic-bezier(0.4, 0, 0.2, 1);       /* Hover effects */
--ease-spring:    cubic-bezier(0.34, 1.56, 0.64, 1);  /* Bouncy micro-interactions */
```

### Scroll Reveal

Default: `opacity 0→1` + `translateY 40px→0`.
Duration: `800ms`. Easing: `--ease-out-expo`.
Delay: configurable per element (stagger groups at 60–100ms intervals).
Trigger: IntersectionObserver at 15% threshold. Fires once.

### Counter Animation

Duration: `2000ms`. Easing: quartic ease-out (`1 - (1 - t)^4`).
Triggered by IntersectionObserver at 30% threshold.
Stagger delay: `120ms × index`.

### Floating Animation (scroll indicator)

```css
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
animation: float 3s ease-in-out infinite;
```

### Three.js Rotation Speeds

```
Icosahedron X-axis: time × 0.5
Icosahedron Y-axis: time × 0.3
Ring 1 Z-axis:      time × 0.2
Ring 2 Z-axis:     -time × 0.15
```

---

## 7. Iconography

No icon library needed. Visual indicators use:

- **Colored dots**: 6px circles for entity type (rounded = person, square = company)
- **Phase badges**: Pill-shaped, border + tinted background, JetBrains Mono text
- **Scroll indicator**: CSS-only pill with inner circle

---

## 8. Responsive Adaptations

### Mobile (< 640px)

- Hero: No Three.js. Replace with animated gradient background (CSS only).
- KPI grid: 2 columns.
- Chart cards: Single column, full width.
- Charts: Reduced height (200px vs 280px).
- Navigation dots: Hidden (use native scroll).
- Section padding: 60px top.
- Font sizes: Use clamp() min values.

### Tablet (640–1023px)

- Hero: Reduced particle count (200).
- KPI grid: 3 columns.
- Chart cards: Single column.
- Navigation dots: Visible.

### Desktop (1024+)

- Full experience.

---

## 9. Accessibility

- All chart data is also present as text (screen reader alternative).
- Color is never the sole indicator — shapes/labels supplement color coding.
- Focus states on navigation dots (outline + glow).
- `prefers-reduced-motion`: Disable Three.js, disable scroll reveals, counters show final value immediately.
- Skip-to-content link (visually hidden, visible on focus).
- Section headings use proper `h2`/`h3` hierarchy.
- Chart tooltips are keyboard-accessible (Tab to chart, arrow keys to navigate data points).
