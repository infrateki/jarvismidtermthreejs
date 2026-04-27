// BIMSEARCH Pipeline — Enriched with GHL extraction + scored hot opportunities
// Source: GHL extraction 2026-04-27 + INFRATEK-PDBM-MTR-2026-FINAL
// GHL Pipeline: PDBM - Opportunity Intelligence (624 opps) + BIMSearch USA - RFPs (351 opps)

export const BIMSEARCH_HEALTH = {
  activePipeline: 624,
  qualified: 39,
  jorgeReview: 78,
  contact: 468,
  newThisWeek: 1,
  deadlinesThisWeek: 3,
  scansThisWeek: 3,
  alertsThisWeek: 6,
  pipelineValue: 7000000000,
  lastScan: '2026-04-26T19:03:00-04:00',
  dbEngine: 'Postgres 16',
  backupSchedule: '03:00 ET daily',
  ghlPipelines: 6,
  ghlTotalOpps: 2028,
  contactsFound: 603,
  sourceFiles: 312,
  portalsActive: 12,
};

export const PRIMARY_TARGETS = [
  { name: 'USACE Fantastic Four', region: 'Puerto Rico', value: 4000000000, status: 'Pilot', description: '~$4B infrastructure pipeline — PR USACE Caribbean district. AE IDIQ MATOC $249M, 3 SB slots. PDBM eligible.' },
  { name: 'MIA CIP Program', region: 'Miami', value: 12500000000, status: 'Active', description: '$12.5B capital program, 321 projects. PDBM has no real BIM competitor for SBE slots.' },
  { name: 'Callao Naval Base', region: 'Peru', value: 2500000000, status: 'Research', description: '$2.5B naval base project — international BIM opportunity.' },
  { name: 'Top US Airports', region: 'National', value: null, status: 'Active', description: 'Tier 1 BIMSEARCH portals — MIA, AUS, PANYNJ, MCO, FLL, DFW, CLT.' },
];

// ═══════════════════════════════════════════════════════════════════════════
// SCORED HOT OPPORTUNITIES — ranked by BIMSEARCH score
// From the GHL extraction + Jarvis intelligence analysis
// ═══════════════════════════════════════════════════════════════════════════
export const OPPORTUNITIES = [
  // ── SCORED & RANKED (Top 10 from Jarvis analysis) ──
  { id: 'opp-01', title: 'MDAD E25AV05 — Aviation Planning & Programming', stage: 'Qualified', tier: 1, score: 94, interest: 5, mentions: 28, owner: 'Jorge', value: 10000000, deadline: '2026-05-22', source: 'Miami-Dade Aviation', portal: 'MIA', solicitation: 'E25AV05', pdbmAngle: 'Best immediate Jorge lead. BIM/VDC + planning data standards sub to aviation planning prime.', nextAction: 'Franklin Gutierrez — Franklin.Gutierrez@miamidade.gov / 305-375-2173', description: 'Explicit BIM methodology, MDAD BIM Manual/BEP, CIP support, iALP, 3DAAP, planning models.' },

  { id: 'opp-02', title: 'FLL/HWO Professional Consultant Services for Building Projects', stage: 'Radar', tier: 1, score: 90, interest: 5, mentions: 53, owner: 'Shami', value: null, deadline: '2026-05-15', source: 'Broward County Aviation', portal: 'FLL', solicitation: 'PNC2130378P1', pdbmAngle: 'BIM standards, Revit/model coordination, digital deliverables. 30% CBE teaming lane.', nextAction: 'Yohanna de Francisco — Ydefrancisco@broward.org', description: 'Open-end building/terminal/airside/landside A/E; Revit/BIM QA/QC fit.' },

  { id: 'opp-03', title: 'CLT Airport On-Call Architectural Consultant Services', stage: 'Radar', tier: 1, score: 88, interest: 4, mentions: 17, owner: 'Sergio', value: 10000000, deadline: '2026-05-26', source: 'City of Charlotte Aviation', portal: 'CLT', solicitation: '2026-Q2-AVI-20682', pdbmAngle: 'Early teaming with architecture/aviation primes; BIM QA, standards, Revit support.', nextAction: 'earlybird@charlottenc.gov', description: 'On-call airport A/E for Destination CLT capital work.' },

  { id: 'opp-04', title: 'GOAA/MCO Transportation Planning Consulting Services', stage: 'Radar', tier: 1, score: 86, interest: 5, mentions: 21, owner: 'Shami', value: null, deadline: '2026-05-08', source: 'GOAA / MCO', portal: 'MCO', solicitation: '26-422-RFSQ', pdbmAngle: 'Local backyard play. Digital criteria packages, visualization, constructability/VDC.', nextAction: 'GOAA OpenGov; target planning primes fast', description: 'Planning, engineering, DB criteria packages, program definition, concept design.' },

  { id: 'opp-05', title: 'Dallas Aviation A/E RFQ — CIZ26-AVI-3220', stage: 'Radar', tier: 1, score: 85, interest: 5, mentions: 26, owner: 'Sergio', value: null, deadline: '2026-05-08', source: 'City of Dallas Aviation', portal: 'DFW', solicitation: 'CIZ26-AVI-3220', pdbmAngle: 'Team with airport A/E prime for BIM execution planning and deliverable QA.', nextAction: 'Dallas Bonfire / City Aviation', description: 'Broad aviation A/E services.' },

  { id: 'opp-06', title: 'AUS Journey With AUS Ecosystem', stage: 'Radar', tier: 1, score: 84, interest: 4, mentions: 12, owner: 'Julio', value: 5000000000, deadline: null, source: 'Austin-Bergstrom AUS', portal: 'AUS', solicitation: null, pdbmAngle: 'Approach Hensel Phelps, HNTB/Populous, Austin Commercial, JE Dunn, CUP bidders.', nextAction: 'Build prime contact list', description: 'Concourse B, A&D Hall, CUP, UICW — phased $5B expansion.' },

  { id: 'opp-07', title: 'PANYNJ JFK Redevelopment Master Agreements', stage: 'Radar', tier: 1, score: 83, interest: 4, mentions: 3, owner: 'Jorge', value: null, deadline: null, source: 'PANYNJ / JFK', portal: 'PANYNJ', solicitation: null, pdbmAngle: 'BIM/VDC sub to qualified contractors; warm PANYNJ proof point.', nextAction: 'PAProcure; pull contractor list', description: 'JFK redevelopment work-order capital context.' },

  { id: 'opp-08', title: 'Aspen/Pitkin County New Terminal Modernization', stage: 'Monitoring', tier: 1, score: 82, interest: 4, mentions: 3, owner: 'Sergio', value: null, deadline: null, source: 'Aspen/Pitkin County Airport', portal: 'Research', solicitation: null, pdbmAngle: 'Early enough to influence team. BIM/VDC + logistics + model standards.', nextAction: 'ZGF aviation + airport modernization PM', description: 'New terminal, phasing, sustainability, live-airport complexity. Design through late 2026.' },

  { id: 'opp-09', title: 'MIA Gate D60 / Concourse D Expansion', stage: 'Radar', tier: 1, score: 81, interest: 5, mentions: 37, owner: 'Jorge', value: 1000000000, deadline: null, source: 'MDAD / MIA + American Airlines', portal: 'MIA', solicitation: null, pdbmAngle: 'Strategic local long game. Track designer/CMAR before procurement.', nextAction: 'MDAD board/procurement packets', description: 'Gates, BHS, passenger boarding, airport BIM standards. ~$1B connected to MDAD/American Airlines.' },

  { id: 'opp-10', title: 'FLL RCC Smoke Evacuation & HVAC Modernization', stage: 'Radar', tier: 1, score: 80, interest: 4, mentions: 25, owner: 'Shami', value: null, deadline: '2026-05-04', source: 'Broward / FLL', portal: 'FLL', solicitation: 'PNC2130780P1', pdbmAngle: 'Existing conditions modeling, clash detection, phasing/constructability.', nextAction: 'Yohanna de Francisco; Nancy Olesen', description: 'MEP/BIM coordination: smoke evacuation, HVAC, BMS.' },

  // ── JORGE MAY BE MISSING (from Jarvis analysis) ──
  { id: 'opp-11', title: 'Blue Grass Airport $776.5M Program', stage: 'Radar', tier: 1, score: 78, interest: 4, mentions: 0, owner: 'Sergio', value: 776500000, deadline: null, source: 'Research', portal: 'Research', solicitation: null, pdbmAngle: 'HDR positioned in program management. Good target for owner BIM standards and program-wide coordination support.', nextAction: 'Research HDR contact + procurement timeline', description: '$776.5M airport program. HDR appears positioned in program management.' },

  { id: 'opp-12', title: 'Memphis Terminal BHS CMAR Amendment', stage: 'Radar', tier: 1, score: 76, interest: 4, mentions: 6, owner: 'Sergio', value: null, deadline: null, source: 'Research', portal: 'Research', solicitation: null, pdbmAngle: 'Known GC tri-venture and active BHS coordination need. Worth a VDC contact hunt.', nextAction: 'Identify GC tri-venture contacts', description: 'Memphis terminal BHS CMAR. Active BHS coordination need.' },

  // ── ADDITIONAL PIPELINE (from GHL extraction — real opportunities) ──
  { id: 'opp-13', title: 'E25AV04 — MIA Construction & Design Surveying (SBE)', stage: 'Radar', tier: 1, score: 75, interest: 5, mentions: 172, owner: 'Julio', value: 5000000, deadline: null, source: 'Miami-Dade Aviation', portal: 'MIA', solicitation: 'E25AV04', pdbmAngle: 'PDBM precluded as prime (listed under HNTB). Best teaming: Stoner & Associates.', nextAction: 'Stoner & Associates teaming approach', description: '$5M, 4 PSAs, 100% SBE set-aside. Top teaming targets: Stoner, Formtech, Suarez Surveying.' },

  { id: 'opp-14', title: 'E25AV03 — MIA Construction & Design Surveying Services', stage: 'Radar', tier: 1, score: 73, interest: 5, mentions: 106, owner: 'Jorge', value: 20000000, deadline: null, source: 'Miami-Dade Aviation', portal: 'MIA', solicitation: 'E25AV03', pdbmAngle: 'PDBM can participate as BIM/scan-to-BIM subconsultant. Prime needs MD Tech Certs.', nextAction: 'Target GPI Geospatial, Metric Engineering as primes', description: '$20M, 4 PSAs, 5-year term. Prime must hold MD Tech Certs 15.01 + 15.03.' },

  { id: 'opp-15', title: 'A25AV03 — CIP Specialized Services – Facilities Development', stage: 'Radar', tier: 1, score: 92, interest: 5, mentions: 4, owner: 'Jorge', value: 137800000, deadline: '2026-06-01', source: 'Miami-Dade Aviation', portal: 'MIA', solicitation: 'A25AV03', pdbmAngle: 'BIG ONE to watch. $137.8M. Jorge flagged personally. BIM/VDC + CIP support.', nextAction: 'Monitor MDAD portal for advertising in June 2026', description: '$137.8M CIP Specialized Services. Advertising June 2026.' },

  { id: 'opp-16', title: 'A25AV02 — CIP In-House Support Services', stage: 'Radar', tier: 1, score: 85, interest: 5, mentions: 4, owner: 'Jorge', value: 75500000, deadline: null, source: 'Miami-Dade Future Solicitations', portal: 'MIA', solicitation: 'A25AV02', pdbmAngle: 'Jorge flagged personally — HIGH priority. Draft/Future Solicitation.', nextAction: 'Monitor Miami-Dade Strategic Procurement Future Solicitations', description: '$75.5M. Confirmed on the street (Jorge said so Apr 13). PM: A. Oporto.' },

  { id: 'opp-17', title: 'USACE Caribbean — AE IDIQ MATOC $249M', stage: 'Radar', tier: 1, score: 88, interest: 5, mentions: 39, owner: 'Sergio', value: 249000000, deadline: null, source: 'SAM.gov / USACE', portal: 'SAM.gov', solicitation: null, pdbmAngle: 'PDBM eligible for 3 of 8 SBE slots. First call: Mariano Torres-Feliciano.', nextAction: 'Contact Mariano — taskforcevipr-sb@usace.army.mil / 787-220-0225', description: 'AE IDIQ MATOC $249M, 3 SB slots. PR USACE Fantastic Four pilot.' },

  { id: 'opp-18', title: 'AA048A — MIA North Terminal Gate Optimization Ph 1 & 2', stage: 'Radar', tier: 1, score: 79, interest: 5, mentions: 4, owner: 'Jorge', value: 51400000, deadline: '2026-04-30', source: 'Miami-Dade Aviation', portal: 'MIA', solicitation: 'AA048A', pdbmAngle: 'MIA gate project. Watch MDAD portal for advertise.', nextAction: 'PM: M. Freire (305-869-3471)', description: '$51.4M. Advertise April 2026.' },

  { id: 'opp-19', title: 'AA048B — MIA North Terminal Gate Infrastructure Upgrades', stage: 'Radar', tier: 1, score: 77, interest: 5, mentions: 4, owner: 'Jorge', value: 29900000, deadline: '2026-04-30', source: 'Miami-Dade Aviation', portal: 'MIA', solicitation: 'AA048B', pdbmAngle: 'Paired with AA048A. Same PM.', nextAction: 'PM: M. Freire (305-869-3471)', description: '$29.9M. Advertise April 2026.' },

  { id: 'opp-20', title: 'LEAP Program — PANYNJ', stage: 'Radar', tier: 3, score: 65, interest: 5, mentions: 51, owner: 'Jorge', value: null, deadline: null, source: 'PANYNJ', portal: 'PANYNJ', solicitation: null, pdbmAngle: 'Existing PANYNJ relationship. Monitor for BIM scope.', nextAction: 'Check PANYNJ procurement portal', description: 'Port Authority NY/NJ program. Active research.' },

  { id: 'opp-21', title: 'MIA Parking Garage 6', stage: 'Radar', tier: 1, score: 70, interest: 5, mentions: 37, owner: 'Jorge', value: null, deadline: null, source: 'Miami-Dade Aviation', portal: 'MIA', solicitation: null, pdbmAngle: 'Airport parking structure. BIM standards opportunity.', nextAction: 'Monitor MDAD portal', description: 'MIA parking structure project.' },

  { id: 'opp-22', title: 'Dallas Love Field — Terminal Program', stage: 'Radar', tier: 1, score: 72, interest: 5, mentions: 36, owner: 'Sergio', value: null, deadline: null, source: 'Dallas Aviation', portal: 'DFW', solicitation: null, pdbmAngle: 'Dallas Love Field modernization. BIM execution planning.', nextAction: 'Dallas Bonfire procurement portal', description: 'Dallas Love Field airport terminal modernization.' },

  { id: 'opp-23', title: 'CTP — Dallas Comprehensive Terminal Program', stage: 'Radar', tier: 1, score: 71, interest: 5, mentions: 22, owner: 'Sergio', value: null, deadline: null, source: 'Dallas Aviation', portal: 'DFW', solicitation: null, pdbmAngle: 'Comprehensive terminal program. Large BIM coordination scope.', nextAction: 'Monitor Dallas Aviation procurement', description: 'Dallas Comprehensive Terminal Program.' },

  { id: 'opp-24', title: 'ORDNext — O\'Hare Next Gen Terminal', stage: 'Radar', tier: 1, score: 68, interest: 5, mentions: 25, owner: 'Jorge', value: null, deadline: null, source: 'PANYNJ', portal: 'Research', solicitation: null, pdbmAngle: 'O\'Hare next-gen terminal. Massive BIM scope.', nextAction: 'Research procurement timeline', description: 'O\'Hare airport next-gen terminal program.' },

  { id: 'opp-25', title: 'Río Puerto Nuevo — USACE Caribbean', stage: 'Monitoring', tier: 2, score: 60, interest: 4, mentions: 21, owner: 'Sergio', value: 500000000, deadline: null, source: 'USACE Caribbean', portal: 'SAM.gov', solicitation: null, pdbmAngle: 'PR flood control. Contract 3 $500M+. Watch W51DQV.', nextAction: 'Monitor SAM.gov for W51DQV award', description: 'PR flood control infrastructure. USACE Caribbean.' },

  { id: 'opp-26', title: 'Río de la Plata — USACE Caribbean', stage: 'Monitoring', tier: 2, score: 58, interest: 4, mentions: 18, owner: 'Sergio', value: null, deadline: null, source: 'USACE Caribbean', portal: 'SAM.gov', solicitation: null, pdbmAngle: 'PR river infrastructure. USACE.', nextAction: 'Monitor with Río Puerto Nuevo', description: 'PR river infrastructure — USACE Caribbean.' },

  { id: 'opp-27', title: 'Camp Santiago JTC — USACE Caribbean', stage: 'Monitoring', tier: 1, score: 62, interest: 4, mentions: 12, owner: 'Sergio', value: null, deadline: null, source: 'USACE Caribbean', portal: 'SAM.gov', solicitation: null, pdbmAngle: 'Military joint training center. USACE PR.', nextAction: 'Monitor with USACE Caribbean package', description: 'Military joint training center — Puerto Rico.' },

  { id: 'opp-28', title: 'Callao Naval Base — Peru', stage: 'Radar', tier: 1, score: 74, interest: 5, mentions: 0, owner: 'Jorge', value: 2500000000, deadline: null, source: 'Web Research', portal: 'Research', solicitation: null, pdbmAngle: '$2.5B naval base. International BIM opportunity.', nextAction: 'LATAM go-to-market research', description: '$2.5B naval base project in Peru. Early research phase.' },

  { id: 'opp-29', title: 'DB23AV01 — MIA South Terminal Expansion East Phase 1', stage: 'Contact', tier: 1, score: 90, interest: 5, mentions: 4, owner: 'Jorge', value: null, deadline: null, source: 'Miami-Dade Aviation', portal: 'MIA', solicitation: 'DB23AV01', pdbmAngle: 'PDBM already embedded as BIM Tech Support alongside Daniel Cinti.', nextAction: 'Design-Builder: Lemartec-NV2A JV. Lead: Perez & Perez Architects.', description: 'South Terminal Expansion East Phase 1. PDBM is already embedded.' },

  { id: 'opp-30', title: 'CA004A — MIA Cc F to H Interconnector', stage: 'Monitoring', tier: 1, score: 83, interest: 5, mentions: 4, owner: 'Jorge', value: 75500000, deadline: '2026-05-06', source: 'Miami-Dade Aviation', portal: 'MIA', solicitation: 'CA004A', pdbmAngle: 'Award pending BCC approval — watch May 6, 2026 BCC meeting. BIM methodology mandatory.', nextAction: 'Monitor Mon/Wed/Fri 8AM — alert Jorge when award drops. PM: L. Kamaruddin (305-869-1044)', description: '$75.5M. Bids closed March 30. 3 packages. 820 calendar days. BIM methodology mandatory.' },

  { id: 'opp-31', title: 'CIZ26-AVI-3227 — Dallas Aviation', stage: 'Radar', tier: 1, score: 67, interest: 4, mentions: 7, owner: 'Sergio', value: null, deadline: null, source: 'Dallas Aviation', portal: 'DFW', solicitation: 'CIZ26-AVI-3227', pdbmAngle: 'Dallas aviation infrastructure package.', nextAction: 'Monitor Dallas Bonfire', description: 'Dallas aviation infrastructure solicitation.' },

  { id: 'opp-32', title: 'EUNA/Bonfire — Municipal BIM Packages', stage: 'Radar', tier: 2, score: 55, interest: 3, mentions: 0, owner: 'Shami', value: null, deadline: null, source: 'EUNA/Bonfire', portal: 'EUNA', solicitation: null, pdbmAngle: '19 agencies registered. 66 commodity codes need refinement to ~25.', nextAction: 'Refine commodity codes with Shami', description: 'Municipal procurement aggregator. Tier 2 pipeline.' },

  { id: 'opp-33', title: 'Test Miami Airport Terminal BIM RFP', stage: 'Qualified', tier: 1, score: 50, interest: 3, mentions: 1, owner: 'Jarvis', value: 500000000, deadline: null, source: 'System Test', portal: 'MIA', solicitation: 'TEST-DOC-001', pdbmAngle: 'System test opportunity. Will be cleaned before production.', nextAction: 'N/A — test record', description: 'BIMSEARCH system verification test record.' },
];

export const PIPELINE_STAGES = ['Radar', 'Monitoring', 'Qualified', 'Jorge Review', 'Contact', 'Proposal', 'Won'];

export const OPERATING_RHYTHM = [
  { day: 'Mon', task: 'Scan', description: 'Active portals · score new finds · weekly digest', active: true },
  { day: 'Tue', task: 'Research', description: 'Deep dive on qualified opportunities', active: true },
  { day: 'Wed', task: 'Outreach', description: 'Draft contacts · deadline warning checks', active: true },
  { day: 'Thu', task: 'Documents', description: 'Process RFP / RFQ files', active: true },
  { day: 'Fri', task: 'Report', description: 'Pipeline cleanup + summary', active: true },
  { day: 'Sat', task: 'Rest', description: 'Emergency deadlines only', active: false },
  { day: 'Sun', task: 'Prep', description: 'Light SAM.gov scan', active: false },
];

export const RECENT_ALERTS = [
  { type: 'deadline_warning', preview: 'FLL RCC due May 4 — 7 days remaining', time: '08:00' },
  { type: 'deadline_warning', preview: 'GOAA/MCO & Dallas CIZ26 due May 8 — 11 days', time: '08:00' },
  { type: 'pipeline_snapshot', preview: 'Active: 624, Qualified: 39, Jorge Review: 78, Pipeline: $7B+', time: '19:03' },
  { type: 'weekly_digest', preview: 'Top: E25AV05 (score 94), FLL PNC2130378P1 (score 90), CLT (score 88)', time: '18:39' },
  { type: 'jorge_action', preview: 'CA004A BCC meeting May 6 — award pending. Monitor alert active.', time: '18:00' },
];

export const SCORING_MODEL = 'Cost × Size × Win Probability — refined over time by actual outcomes';

export const KPI_SNAPSHOT = {
  totalOpportunities: 33,
  activeResearch: 16,
  monitoring: 7,
  qualified: 2,
  jorgeReview: 0,
  contact: 1,
  tier1Count: 28,
  tier2Count: 3,
  tier3Count: 2,
  portalsActive: 12,
  contactsFound: 603,
  sourceFiles: 312,
  pipelineValue: 7000000000,
  ghlOpps: 2028,
  topScore: 94,
  deadlinesSoon: 3,
};

export const REQUIRED_FIELDS = [
  'Scope of work', 'RFP / RFQ docs', 'Addenda', 'Calendar milestones',
  'Question deadline', 'Site visits', 'Submission deadline', 'Required expertise',
  'Prime / sub angle', 'Known contacts', 'Likely bidders', 'PDBM fit score',
  'Next action', 'Human owner',
];
