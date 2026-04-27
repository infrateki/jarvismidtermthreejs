# BIMSEARCH Command Center — Build Plan

> **This is a SEPARATE PROJECT from the midterm review site.**
> **New repo. New stack. Real operational tool.**

---

## Why It's Separate

| | Midterm Review Site | BIMSEARCH Command Center |
|---|---|---|
| **Purpose** | Presentation for tomorrow's meeting | Daily operational tool for PDBM |
| **Data** | Static JSON embedded in code | Live Postgres database |
| **Backend** | None | FastAPI + Postgres |
| **Users** | Anyone with the URL | Jorge, Julio, Shami, Sergio |
| **CRUD** | Read-only | Read + write (status, owner, notes) |
| **Deployment** | Vercel (public) | Jorge's Mac Mini (local/private) |
| **Lifecycle** | One-time deliverable | Long-running product |

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│            Jorge's Mac Mini (runtime)                │
│                                                      │
│  ┌──────────────┐    ┌───────────────────────────┐  │
│  │  Postgres 16  │───│  FastAPI Backend           │  │
│  │  bimsearch DB │    │  /api/kpi                 │  │
│  │               │    │  /api/opportunities        │  │
│  │  12 portals   │    │  /api/opportunities/:id    │  │
│  │  tables +     │    │  /api/deadlines           │  │
│  │  views        │    │  /api/portal-health       │  │
│  └──────────────┘    │  /api/team-workload       │  │
│                       │  /api/documents/search     │  │
│                       │  /api/alerts              │  │
│                       └───────────────────────────┘  │
│                                │                      │
│                       ┌───────────────────────────┐  │
│                       │  React Frontend (Vite)     │  │
│                       │  - Dashboard / KPI Home    │  │
│                       │  - Pipeline Kanban         │  │
│                       │  - Hot Opportunities       │  │
│                       │  - Opportunity Detail      │  │
│                       │  - Deadlines Calendar      │  │
│                       │  - Team Workload           │  │
│                       │  - Portal Health           │  │
│                       │  - Document Search         │  │
│                       └───────────────────────────┘  │
│                                                      │
│  ┌──────────────┐    ┌───────────────────────────┐  │
│  │  BIMSEARCH    │    │  Jarvis (AI agent)        │  │
│  │  Pipeline     │───│  Writes opportunities,     │  │
│  │  (Python)     │    │  scans, alerts to Postgres │  │
│  └──────────────┘    └───────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

---

## Tech Stack

### Backend — FastAPI (Python)
- **Why:** The BIMSEARCH pipeline is already Python. FastAPI connects to the same Postgres.
- psycopg2 for database access (already installed on Mac Mini)
- Pydantic models for API schemas
- CORS enabled for local React frontend
- Runs on localhost:8000

### Frontend — Vite + React
- **Why:** Same stack as the review site, team already knows it.
- Tailwind CSS + shadcn/ui for clean operational UI
- Recharts for charts (same as review site)
- React Router for 8 views
- Fetch to localhost:8000/api/*

### Database — Postgres 16 (existing)
- Already running on Mac Mini
- Schema, views, data all exist
- No migrations needed for Phase A

---

## Repo Structure

```
bimsearch-command-center/
├── CLAUDE.md
├── COMMS.md
│
├── backend/
│   ├── main.py                  # FastAPI app entry
│   ├── requirements.txt          # fastapi, uvicorn, psycopg2-binary, pydantic
│   ├── config.py                # DB connection config
│   ├── database.py              # Postgres connection pool
│   ├── models.py                # Pydantic response models
│   └── routers/
│       ├── kpi.py               # GET /api/kpi
│       ├── opportunities.py     # GET/PATCH /api/opportunities
│       ├── deadlines.py         # GET /api/deadlines
│       ├── portals.py           # GET /api/portal-health
│       ├── team.py              # GET /api/team-workload
│       ├── documents.py         # GET /api/documents/search
│       ├── alerts.py            # GET /api/alerts
│       └── actions.py           # GET/PATCH /api/actions
│
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx              # Router + layout
│       ├── index.css
│       ├── api/
│       │   └── client.js        # Fetch wrapper for /api/*
│       ├── components/
│       │   ├── Layout.jsx       # Sidebar + header
│       │   ├── KPICard.jsx
│       │   ├── OpportunityCard.jsx
│       │   ├── KanbanColumn.jsx
│       │   ├── PortalRow.jsx
│       │   ├── DeadlineRow.jsx
│       │   ├── StatusBadge.jsx
│       │   ├── TierBadge.jsx
│       │   └── ScoreBadge.jsx
│       └── pages/
│           ├── Dashboard.jsx    # KPI home
│           ├── Pipeline.jsx     # Kanban board
│           ├── HotOpps.jsx      # Ranked table
│           ├── OpDetail.jsx     # Single opportunity
│           ├── Deadlines.jsx    # Calendar/list
│           ├── Team.jsx         # Workload view
│           ├── Portals.jsx      # Portal health
│           └── DocSearch.jsx    # Document search
│
└── scripts/
    ├── seed-dev.sql             # Test data for local dev
    └── start.sh                 # Starts both backend + frontend
```

---

## Build Phases

### Phase A — Read-Only Dashboard (this week, T1-T5)
What Jorge sees: KPI cards, Kanban board, hot opportunities table, portal health, deadlines.
No editing. Just visibility. **This is what we build with the 5 terminals.**

### Phase B — Opportunity Detail + Actions (next week)
Clicking an opportunity card opens a detail page. Jorge can update status, owner, next action, notes.

### Phase C — Documents + Contacts (week 3)
Document search. Contact list per opportunity. Confidence labels.

### Phase D — Alerts + Automation (week 4)
Alert log UI. Dry-run vs live controls. Heartbeat status. Scan history.

---

## Terminal Assignment for Phase A

```
T1 — Backend Foundation (FastAPI + Postgres connection + all API routes)
T2 — Frontend Foundation (Vite + React + Router + Layout + Design System)
T3 — Dashboard + KPI + Hot Opportunities pages
T4 — Pipeline Kanban + Opportunity Cards
T5 — Portals + Deadlines + Team + DocSearch pages
```

---

## For Tomorrow's Meeting

The midterm review site already has the new Pipeline Kanban section with real
opportunity data. For the meeting, add the BIMSEARCH Command Center as a
"coming soon" link in the Links section. The full app is a week-long build.

Jorge should see:
1. The review site (what Jarvis has accomplished in 75 days)
2. The pipeline kanban in the review site (what opportunities exist)
3. The PRD for the Command Center (what we're building next)

The Command Center itself ships by end of next week as Phase A.

---

## Mock Data Strategy

Since we're building on Windows (not Mac Mini with Postgres), the frontend
development uses mock data that matches the exact Postgres schema:

- Mock JSON files mirror each SQL view: v_kpi_snapshot, v_hot_opportunities, etc.
- API client has a `USE_MOCK=true` flag for development
- When deployed to Mac Mini, flip to `USE_MOCK=false` and point to real FastAPI

This means T2-T5 can build the entire frontend without a database.

---

## Decision Needed from You

Before I generate the T1-T5 prompts:

1. **New repo?** → I recommend `C:\Infratek\repos\bimsearch-command-center`
2. **Build this week or next week?** → Phase A is ~2-3 days with 5 terminals
3. **Mock data first or connect to Postgres first?** → Mock data (you're on Windows, Postgres is on Mac Mini)
4. **Same design system as review site?** → Yes, dark/light mode, same fonts, same accent colors, but operational UI instead of presentation UI
5. **Include the shadcn/ui components?** → Yes, they'll make forms/tables/badges much faster

Your call. I'll generate the full T1-T5 prompts the moment you say go.
