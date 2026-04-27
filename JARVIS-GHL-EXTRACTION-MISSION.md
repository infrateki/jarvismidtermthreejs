# JARVIS MISSION: GHL Data Extraction + Pipeline Enrichment

> **Give this entire prompt to Jarvis on the Mac Mini.**
> **Goal:** Extract the complete GHL CRM schema, pipeline structure, opportunity/contact data models, forms, and any opportunities Jorge has discussed that aren't yet in BIMSEARCH.

---

## MISSION BRIEF

Jarvis, I need you to do a comprehensive data extraction and enrichment sweep. We're building the BIMSEARCH Command Center frontend and we need to understand exactly how Jorge's GHL (Go HighLevel) CRM is structured so we can mirror it, improve on it, and eventually replace it.

Do these 6 tasks in order. For each task, output the results as a clean Markdown file saved to:
```
/Users/jarvis/.openclaw/workspace/outputs/bimsearch-reports/ghl-extraction-2026-04-27/
```

---

## TASK 1: GHL Pipeline Schema

I need the COMPLETE pipeline structure from Go HighLevel.

Find and document:
- **Every pipeline** (name, ID if available)
- **Every stage within each pipeline** (name, order, color, type)
- **Stage transition rules** (what moves an opportunity from one stage to the next?)
- **Default pipeline** that Jorge uses for BIM opportunities
- **Any automation triggers** tied to stage changes

Where to look:
- GHL dashboard → Opportunities → Pipeline settings
- GHL API if accessible: `GET /opportunities/pipelines`
- Jorge's GHL account settings
- Any GHL documentation or screenshots in the workspace

Output: `01-ghl-pipeline-schema.md`

---

## TASK 2: GHL Opportunity Data Model

I need EVERY field on a GHL opportunity — both standard and custom.

For each field, document:
- Field name (display label)
- Field key (API key if known)
- Field type (text, number, dropdown, date, currency, etc.)
- Required or optional
- Dropdown options (if applicable)
- Which pipeline stage it appears in
- Whether Jarvis/BIMSEARCH has an equivalent field

Where to look:
- GHL → Opportunities → any opportunity → inspect all fields
- GHL → Settings → Custom Fields → Opportunity fields
- GHL API: `GET /opportunities/fields` or similar
- Any opportunity export Jorge has done

Output: `02-ghl-opportunity-fields.md`

---

## TASK 3: GHL Contact Data Model

Same thing for contacts. Document EVERY field:

- Standard fields: name, email, phone, company, address, etc.
- Custom fields Jorge has added
- Tags and tag taxonomy
- Contact source tracking
- Lead score fields
- Any custom properties for BIM/VDC classification

Where to look:
- GHL → Contacts → any contact → inspect all fields
- GHL → Settings → Custom Fields → Contact fields
- Any contact export or import templates

Output: `03-ghl-contact-fields.md`

---

## TASK 4: GHL Forms + Workflows

Document every form and automation workflow in Jorge's GHL:

**Forms:**
- Form name
- Form purpose (intake, qualification, contact capture, etc.)
- Fields on the form
- Where the form is used (website, email, landing page)
- What happens when submitted (pipeline stage, tags, notifications)

**Workflows/Automations:**
- Workflow name
- Trigger condition
- Actions taken
- Which pipeline/stage it affects

Where to look:
- GHL → Sites → Forms
- GHL → Automation → Workflows
- GHL → Triggers
- Any webhook configurations

Output: `04-ghl-forms-workflows.md`

---

## TASK 5: Unmapped Opportunities from Jorge's Conversations

This is critical. Go through Jorge's recent conversations, lifelogs, and session memories to find opportunities he's discussed that are NOT yet in the BIMSEARCH database or the 33 opportunities we already have.

Search for:
- Any RFP, RFQ, or solicitation numbers Jorge mentioned
- Any company names + "project" or "opportunity" or "bid"
- Any dollar amounts associated with projects
- Any "we should look at" or "check this out" or "interesting opportunity"
- Any airport, infrastructure, or BIM project names
- Any contacts Jorge said to follow up with
- Anything from GHL that Jorge moved or updated

Cross-reference against the 33 known opportunities:
```
E25AV04, E25AV03, PNC2130378P1, LEAP, USACE Caribbean,
MIA Parking Garage 6, Dallas Love Field, E25AV05, CIZ26-AVI-3220,
ORDNext, CTP, 26-422-RFSQ, MIA Gate D60, PNC2130780P1,
Río Puerto Nuevo, Río de la Plata, 2026-Q2-AVI-20682,
AUS Journey With AUS, Camp Santiago JTC, Concourse K,
2026-Q2-AVI-19688, CIZ26-AVI-3227, MDAD E25AV05, Memphis BHS,
Aspen/Pitkin Terminal, CLT 2026-Q2-AVI-20682, GOAA/MCO 26-422-RFSQ,
PANYNJ JFK Redevelopment, Dallas CIZ26-AVI-3220, Callao Naval Base,
Test Miami Airport Terminal BIM RFP
```

For each NEW opportunity found, provide:
- Name / solicitation number
- Owner / agency
- Estimated tier (1/2/3)
- Where Jorge mentioned it (date, context)
- Estimated value if known
- Current status
- Relevant contacts
- Why it matters to PDBM

Where to look:
- `/Users/jarvis/.openclaw/workspace/memory/` — all daily memory files
- `/Users/jarvis/Documents/JarvisVault/weekly-reports/` — weekly recaps
- GHL → Opportunities → any that aren't in the 33 list above
- GHL → Conversations → any threads about new projects
- Jorge's email threads about opportunities
- LinkedIn messages or research Jorge asked about

Output: `05-unmapped-opportunities.md`

---

## TASK 6: GHL ↔ BIMSEARCH Field Mapping

Create a mapping table that shows how every GHL field translates to BIMSEARCH.

Format:
```
| GHL Field | GHL Type | BIMSEARCH Equivalent | BIMSEARCH Table | Match Status |
|-----------|----------|---------------------|-----------------|--------------|
| Opportunity Name | text | title | opportunities | ✅ exact |
| Pipeline Stage | dropdown | status | opportunities | ⚠️ values differ |
| Contact Email | email | email | contacts | ✅ exact |
| Custom: BIM Scope | textarea | (missing) | — | ❌ need to add |
```

Mark each field as:
- ✅ Exact match — field exists in both systems
- ⚠️ Partial — exists but values/format differ
- ❌ Missing — GHL has it, BIMSEARCH doesn't (these are what we need to add)
- ➕ Extra — BIMSEARCH has it, GHL doesn't (our advantage)

Output: `06-ghl-bimsearch-mapping.md`

---

## FINAL DELIVERY

After all 6 tasks, create a summary file:

`00-extraction-summary.md`

Contents:
- How many pipeline stages found in GHL
- How many opportunity fields found (standard + custom)
- How many contact fields found
- How many forms found
- How many workflows found
- How many NEW unmapped opportunities found
- How many field gaps between GHL and BIMSEARCH
- Top 5 recommendations for what to add to BIMSEARCH next

Then zip everything:
```bash
cd /Users/jarvis/.openclaw/workspace/outputs/bimsearch-reports/
zip -r ghl-extraction-2026-04-27.zip ghl-extraction-2026-04-27/
```

And report back to Sergio with the summary.

---

## IMPORTANT NOTES

- Do NOT modify any data in GHL. Read-only extraction.
- Do NOT send any emails or messages. This is research only.
- If you can't access GHL API directly, document what you CAN see from the UI/screenshots/exports.
- If Jorge has exported any GHL data to CSV/Excel, find those files and include them.
- Be thorough. Every field matters. Every opportunity matters. This data shapes the Command Center we're building.
- Save everything as Markdown for easy reading.
- Time box: spend up to 60 minutes on this. If GHL access is blocked, document what you need and move on.
