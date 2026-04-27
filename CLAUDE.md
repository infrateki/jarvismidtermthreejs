# CLAUDE.md — Project Instructions for All Terminals

## Project: Jarvis × PDBM — Immersive Mid-Term Review (v2 Enhancement Sprint)

### What this is
An award-winning 3D scrolling data experience presenting the 75-day Jarvis AI mid-term review. The v1 build is COMPLETE (15 sections, 6 components, 3 hooks, R3F hero, Recharts charts, Framer Motion). This sprint adds: a dark/light theme toggle, 3D BIM architectural showcase, enhanced Three.js shaders, and full theme-aware styling across all sections.

### Stack
- React 18.3 (JSX)
- Vite 6 (target: esnext)
- Three.js 0.170 via @react-three/fiber 8.x + @react-three/drei 9.x
- Recharts 2.x
- Framer Motion 11.x
- Raw CSS with CSS custom properties in index.css

### Before doing any work
1. **Read COMMS.md** — check current status, blockers, your terminal's ownership
2. **Check file ownership** — do NOT modify files owned by another terminal
3. **Update COMMS.md** when you start and finish work
4. **DO NOT break existing functionality** — this is an enhancement, not a rebuild

### Confirmed facts (source of truth — unchanged from v1)
- Total interactions: **4,103** · Sessions: **53** · Memories: **836**
- Period: **75 days** (Feb 10 → Apr 26, 2026) · Lifelogs: **72** · Files: **256**
- Peak: **1,078 messages** April 25, 2026
- Document ID: **INFRATEK-PDBM-MTR-2026-FINAL**
- Location: **Dorado, Puerto Rico**

### Design System — DARK MODE (existing, do not change values)
```
--bg-primary:      #060A18
--bg-glass:        rgba(12, 16, 35, 0.7)
--cyan-400:        #00F0FF
--amber-400:       #FFB547
--text-primary:    #E2E8F0
--text-secondary:  rgba(200, 214, 229, 0.6)
--text-tertiary:   rgba(200, 214, 229, 0.35)
Fonts: Syne (display), DM Sans (body), JetBrains Mono (data)
```

### Design System — LIGHT MODE (new, "Acuarela Oil Pastel Daylight")
The light mode should feel like a warm watercolor painting — soft, airy, handmade.
```
--bg-primary:      #FBF7F0       (warm parchment cream)
--bg-secondary:    #F3EDE4       (soft linen)
--bg-elevated:     #FFFFFF       (clean white)
--bg-glass:        rgba(255, 255, 255, 0.75)
--cyan-400:        #0891B2       (deep teal — replaces electric cyan)
--cyan-500:        #0E7490
--cyan-600:        #155E75
--amber-400:       #D97706       (warm honey amber)
--red-400:         #E07A5F       (terracotta coral)
--purple-400:      #7C3AED       (stays the same)
--green-400:       #059669       (forest sage)
--text-primary:    #1C1917       (warm charcoal)
--text-secondary:  rgba(28, 25, 23, 0.6)
--text-tertiary:   rgba(28, 25, 23, 0.35)
--text-muted:      rgba(28, 25, 23, 0.2)
--border-subtle:   rgba(14, 116, 144, 0.08)
--border-medium:   rgba(14, 116, 144, 0.15)
--border-strong:   rgba(14, 116, 144, 0.3)

Glass card: white 75% opacity, subtle warm shadow, no cyan glow on ::before
  Instead: soft peach/teal gradient highlight
Glow text: teal-to-ocean gradient instead of cyan
Charts: teal primary, honey amber secondary, warm grid lines
Particles (hero): warm tones — peach, sage, lavender, cream, on white bg
Scroll bars: teal tinted
Section labels: teal instead of cyan
```

### 3D BIM Showcase Guidelines
- Use Three.js PRIMITIVE geometry (BoxGeometry, PlaneGeometry, CylinderGeometry)
  to build a procedural BIM-style hospital/building — no external model files needed
- Wireframe + transparent materials with soft glow edges
- Floating isometric view or slow orbit
- Keep it SIMPLE but elegant — this is a tech demo, not a full BIM model
- Adapt materials to theme (dark = glowing wireframe, light = soft pastel wireframe)
- Optional: add drei helpers like <Float>, <MeshTransmissionMaterial>, <MeshDistortMaterial>
- For a future version, user can drop in a .glb model from Blender via GLTF loader

### Theme Toggle Behavior
- Toggle button in top-left or near NavDots
- Toggles `data-theme="dark"` / `data-theme="light"` on <html> element
- CSS variables swap via [data-theme="light"] selector
- Three.js scenes read theme from React context and adapt
- Charts read theme and swap color arrays
- Transition: all CSS vars transition 0.4s ease
- Default: dark mode
- Persist choice in a React state (NOT localStorage — constraint from v1)

### Critical constraints
- DO NOT break any existing section or component
- DO NOT delete or rename existing files
- NEW files only in: src/three/, src/components/, src/sections/, src/hooks/
- Theme system uses CSS custom properties — components read from CSS vars
- All existing inline styles with hardcoded colors must be updated to use var(--xxx)

### Commands
```bash
npm run dev          # Dev server
npm run build        # Must pass before deploy
```

### When you finish a task
1. Run npm run build — must pass
2. Update COMMS.md: mark your tasks ✅ with timestamp
3. Note new exports or files in COMMS.md terminal log
