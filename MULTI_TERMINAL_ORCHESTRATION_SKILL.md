# Multi-Terminal Claude Code Orchestration
## COMMS.md + CLAUDE.md Pattern

**Author:** Sergio Villanueva-Meyer · INFRATEK LLC
**Origin:** VIA-HABITA Proposal Site Build (April 2026)
**Technique:** Boris Cherny Parallel Terminals (T1–T5)

---

## What This Solves

When building a project with multiple Claude Code terminals running in parallel, each terminal operates independently — it has no awareness of what other terminals are doing, what files they've changed, or what decisions have been made. This creates three problems:

1. **File conflicts** — Two terminals edit the same file simultaneously
2. **State blindness** — A terminal doesn't know what's been completed by others
3. **Decision drift** — Critical parameters (prices, names, dates) get inconsistent across terminals

The COMMS.md + CLAUDE.md pattern solves all three by giving every terminal a shared source of truth inside the repo itself.

---

## The Two Files

### CLAUDE.md — The Constitution
Lives in the project root. Every Claude Code terminal reads this automatically when it opens the project. It contains:

- **What the project is** (one paragraph)
- **Tech stack** (frameworks, languages, deployment target)
- **Confirmed facts** that must never be wrong (prices, names, dates, URLs)
- **Design constraints** (colors, fonts, responsive breakpoints, accessibility rules)
- **File ownership rules** (which terminal owns which files)
- **Build/test commands** (`npm run build`, `npx tsc --noEmit`, etc.)
- **What to do when finished** (run build, update COMMS.md)

**Key principle:** CLAUDE.md is written once at project start and rarely changes. It's the "system prompt" for every agent working on the project.

### COMMS.md — The Coordination Board
Lives in the project root. Every terminal reads this before starting work and updates it when done. It contains:

- **Current project status** (phase, sprint, blockers)
- **Task board** with assignable tasks (P1, P2, P3...)
- **File ownership table** (who owns what — prevents conflicts)
- **Terminal log** (what each terminal has done, timestamped)
- **Decision log** (what was decided, by whom, when)
- **Blocker section** (what's stuck and why)
- **Next sprint** (what comes after current work)

**Key principle:** COMMS.md is a living document that every terminal reads and writes. It's the "shared memory" between agents.

---

## Setup Instructions

### Step 1: Create CLAUDE.md

At the start of any new project, create `CLAUDE.md` in the repo root with this template:

```markdown
# CLAUDE.md — Project Instructions for All Terminals

## Project: [PROJECT NAME]

### What this is
[One paragraph describing the project, its purpose, and who it's for.]

### Stack
- [Framework, e.g., Next.js 15, App Router, TypeScript]
- [Styling, e.g., Tailwind CSS, dark mode default]
- [Key libraries, e.g., Framer Motion, Stripe, Recharts]
- [Deployment target, e.g., Vercel → subdomain.example.com]

### Language
[UI language, e.g., ALL user-facing text is in Spanish. Code comments in English.]

### Before doing any work
1. **Read COMMS.md** — check current status, blockers, and your terminal's ownership
2. **Check file ownership** — do NOT modify files owned by another terminal
3. **Update COMMS.md** when you start and finish work

### Confirmed facts (source of truth)
[List every critical parameter that must be consistent across all terminals:]
- Price A: **$X,XXX**
- Price B: **$X,XXX**
- Person 1: **Full Name** — Role
- Person 2: **Full Name** — Role
- Start date: **Month Year**
- [Add all confirmed facts here]

### Design system
- Background: #XXXXXX
- Text: #XXXXXX
- Accent: #XXXXXX
- [Typography, spacing, component patterns]

### Critical constraints
- [e.g., NO localStorage or sessionStorage]
- [e.g., Mobile responsive at 375px minimum]
- [e.g., robots: noindex, nofollow]
- [e.g., Source document X.md is the content source of truth — do NOT modify it]

### Commands
```bash
npm run dev          # Start dev server
npm run build        # Production build (must pass before deploy)
npx tsc --noEmit     # Type check
```

### When you finish a task
1. Run `npx tsc --noEmit` to verify types
2. Run `npm run build` to verify production build
3. Update your section in COMMS.md with status and notes
4. If you created new exports that other terminals need, note them in COMMS.md
```

### Step 2: Create COMMS.md

Create `COMMS.md` in the repo root with this template:

```markdown
# COMMS.md — Terminal Orchestration Board
## [PROJECT NAME]

**Last updated:** [DATE] · by [WHO]
**Status:** 🟡 IN PROGRESS

---

## HOW TO USE THIS FILE

Each Claude Code terminal MUST:
1. **READ this file** at the start of every task
2. **UPDATE your section** when you start/finish work
3. **CHECK blockers** before modifying shared files
4. **NEVER modify another terminal's owned files** without updating COMMS.md first
5. **When done with a task**, change its status to ✅ and add a timestamp

---

## PROJECT STATUS

| Component | Terminal | Status | Last Update | Notes |
|---|---|---|---|---|
| [Component 1] | T1 | ⬜ TODO | | |
| [Component 2] | T2 | ⬜ TODO | | |
| [Component 3] | T3 | ⬜ TODO | | |
| [Component 4] | T4 | ⬜ TODO | | |
| [Component 5] | T5 | ⬜ TODO | | |

---

## TASK BOARD

| # | Task | Owner | Status | File(s) |
|---|---|---|---|---|
| P1 | [Task description] | | ⬜ TODO | [files] |
| P2 | [Task description] | | ⬜ TODO | [files] |
| P3 | [Task description] | | ⬜ TODO | [files] |
| [Add more as needed] | | | | |

---

## FILE OWNERSHIP

Terminals MUST respect file ownership. To modify a file owned by another terminal, update COMMS.md first.

```
T1 owns: [list of files/directories]
T2 owns: [list of files/directories]
T3 owns: [list of files/directories]
T4 owns: [list of files/directories]
T5 owns: [list of files/directories]

SHARED (coordinate writes via COMMS.md):
  - package.json (T1 primary)
  - tsconfig.json (T1 primary)
  - COMMS.md (all terminals)
  - CLAUDE.md (orchestrator only)
```

---

## TERMINAL LOG

### T1 — [Component Name]
```
[Timestamp entries added by T1 as it works]
```

### T2 — [Component Name]
```
[Timestamp entries added by T2 as it works]
```

### T3 — [Component Name]
```
[Timestamp entries added by T3 as it works]
```

### T4 — [Component Name]
```
[Timestamp entries added by T4 as it works]
```

### T5 — [Component Name]
```
[Timestamp entries added by T5 as it works]
```

### ORCHESTRATOR
```
[Entries from the orchestrator — Claude chat or human]
```

---

## BLOCKERS

```
[TEMPLATE]
🔴 BLOCKER T#: Description of issue
   Blocked by: T# or external
   Impact: What can't proceed
   Resolution: What's needed
```

---

## DECISION LOG

| Date | Decision | Made by | Impact |
|---|---|---|---|
| | | | |

---

## NEXT SPRINT

- [ ] [Future task 1]
- [ ] [Future task 2]
```

---

## How to Write Terminal Prompts

Each terminal gets a self-contained prompt with everything it needs. The prompt structure:

```
Read COMMS.md and CLAUDE.md. You are T[N] — [Component] owner.

Tasks [P#] + [P#]:

[Detailed description of what to build/fix]

### Requirements
[Numbered list of specific deliverables]

### Constraints
- DO NOT modify files outside of: [list owned files]
- [Other constraints]

### When done
1. Run npm run build — must pass
2. Update COMMS.md: mark tasks as ✅ DONE with timestamp
3. Note any issues in COMMS.md BLOCKERS section
```

**Critical rules for prompt writing:**

1. **Every prompt starts with "Read COMMS.md and CLAUDE.md"** — this ensures the terminal knows the project state
2. **Every prompt declares terminal identity** — "You are T3 — Configurator owner"
3. **Every prompt lists owned files** — prevents conflicts
4. **Every prompt ends with "Update COMMS.md"** — keeps the board current
5. **Never put two terminals on the same files** — if you need coordination, one waits for the other

---

## Execution Order

```
Phase 1: T1 (Foundation)         — RUN FIRST, ALONE
         ↓ wait ~3-5 min
Phase 2: T2 ──────┐
         T3 ──────┤              — RUN IN PARALLEL
         T4 ──────┤
         T5 ──────┘
         ↓ wait for all
Phase 3: Any terminal             — INTEGRATION TEST
```

**Why T1 runs first:** It creates the project, installs dependencies, and sets up the skeleton that all other terminals build on. Without T1 finishing first, T2–T5 have no project to work in.

**Why T2–T5 run in parallel:** Each owns different files, so they can't conflict. The file ownership table in COMMS.md prevents collisions.

**Why integration test runs last:** After all terminals finish, one terminal runs the full build, checks all imports resolve, and verifies all pages work together.

---

## Using an Orchestrator (Claude Chat)

The human + Claude chat session acts as the orchestrator. The orchestrator:

1. **Creates CLAUDE.md and COMMS.md** at the start
2. **Writes the T1–T5 prompts** with full context
3. **Pushes data files** directly to the repo via Filesystem MCP (if available)
4. **Updates COMMS.md** with new tasks, decisions, and specs
5. **Reviews cross-terminal issues** (e.g., data in T2 needed by T4)
6. **Writes follow-up prompts** when terminals go idle

**The orchestrator never modifies code files directly** — it only touches CLAUDE.md, COMMS.md, data files, and documentation. Code changes happen inside Claude Code terminals.

### Activating Idle Terminals

When a terminal finishes its tasks and goes idle, paste this to reactivate it:

```
Read COMMS.md, pick up the next unclaimed TODO task, and start working. Update COMMS.md when done.
```

### Restarting a Terminal That Lost Context

If a terminal crashes or loses its context, paste this to restart:

```
Read COMMS.md and CLAUDE.md. You are T[N] — [Component] owner.
Check the terminal log in COMMS.md for your previous work.
Pick up where you left off or claim a new TODO task.
```

---

## Filesystem MCP Integration

If the orchestrator (Claude chat) has access to the repo via Filesystem MCP, it can:

- **Read any file** to verify its contents
- **Write CLAUDE.md and COMMS.md** directly
- **Push data files** (e.g., features.ts, pricing data) that terminals need
- **Push reference documents** (e.g., docs/FEATURE_MATRIX.md) for terminals to read
- **Verify file ownership** by checking what exists

This is powerful because the orchestrator can prepare data that multiple terminals need, push it once, and then all terminals can read it. Without MCP, the human would have to copy-paste between chat and terminals.

---

## Anti-Patterns to Avoid

1. **Don't give two terminals the same file** — This is the #1 source of conflicts. If two terminals need to modify the same file, make one wait for the other and note it in COMMS.md.

2. **Don't skip COMMS.md** — If a terminal doesn't read COMMS.md, it might redo work, break another terminal's code, or use stale data.

3. **Don't put decisions in the prompt only** — If a decision matters (price change, name correction, feature removal), put it in CLAUDE.md or COMMS.md decision log, not just in the prompt. Otherwise, other terminals won't know about it.

4. **Don't run the integration test too early** — Wait for ALL terminals to finish. Running build while T4 is still writing components will produce false errors.

5. **Don't skip the build check** — Every terminal must run `npm run build` before marking a task as done. If it doesn't build, it's not done.

---

## Real-World Example: VIA-HABITA Build

### Terminal Assignment
```
T1: Foundation (layout, nav, hero, globals, design system)
T2: Data Layer (pricing engine, platform data, proposal content)
T3: Configurator (4-step Apple Store flow, price calculator)
T4: Content Pages (/propuesta with 8 sections, /comparativo with table+chart)
T5: Integrations (Stripe checkout, WhatsApp, Cal.com, /gracias page)
```

### File Ownership
```
T1: app/layout.tsx, app/page.tsx, app/globals.css, components/layout/*
T2: lib/pricing.ts, lib/constants.ts, data/*
T3: app/configurador/*, components/configurator/*
T4: app/propuesta/*, app/comparativo/*, components/proposal/*, components/comparison/*
T5: app/api/*, app/gracias/*, components/contact/*
```

### What CLAUDE.md Contained
- Project description (interactive proposal site for construction client)
- Stack (Next.js 15, Tailwind, Framer Motion, Stripe)
- All confirmed pricing ($12,500 base, $2,000/visit, $2,000/project/year, etc.)
- Team names and roles
- Design system (dark mode, Apple blue accent #0071E3)
- Constraints (no localStorage, mobile-first, all text in Spanish)

### What COMMS.md Tracked
- 12 priority tasks (P1–P12) across polish and feature work
- File ownership preventing conflicts
- Terminal logs showing exactly what each terminal did and when
- Decision log tracking price changes, name corrections, feature additions
- Blocker section for cross-terminal dependencies
- Cross-check flags for pre-launch verification

### Result
- 5 terminals built a complete Next.js site in parallel
- Zero file conflicts
- All pricing consistent across configurator, proposal, comparison table, and Stripe checkout
- Build passed on first integration test
- Deployed to Vercel same day

---

## Quick Reference

| Need to... | Do this |
|---|---|
| Start a new project | Create CLAUDE.md + COMMS.md, write T1 prompt, run T1 |
| Add parallel terminals | Write T2–T5 prompts with file ownership, run after T1 |
| Change a confirmed fact | Update CLAUDE.md, note in COMMS.md decision log |
| Add a new task | Add to COMMS.md task board with status ⬜ TODO |
| Push data to the repo | Use Filesystem MCP from orchestrator chat |
| Fix a cross-terminal issue | Add blocker in COMMS.md, assign to responsible terminal |
| Reactivate an idle terminal | "Read COMMS.md, pick up next TODO task" |
| Run final verification | "Read COMMS.md. Run npm run build. Verify all pages." |
| Deploy | One terminal does git + vercel deploy, updates COMMS.md to 🟢 DEPLOYED |
