// SuperJarvis — What Jarvis is becoming
// Source: pdbm-superjarvis-command-center.html

export const SUPERJARVIS_PILLARS = [
  { title: 'Opportunity Radar', color: 'cyan', description: 'Scans priority portals and sources for BIM, VDC, airport, public agency, and staff augmentation opportunities.' },
  { title: 'Qualification Engine', color: 'green', description: 'Scores opportunities by tier, budget, fit, required capabilities, geography, and PDBM relationship leverage.' },
  { title: 'Proposal Memory', color: 'amber', description: 'Uses PDBM resumes, project history, templates, and past performance to draft SOQs and proposal packages.' },
  { title: 'Relationship Graph', color: 'red', description: 'Maps contacts, LinkedIn connections, clients, partners, airports, and warm-intro paths.' },
];

export const TIERS = [
  { tier: 1, title: 'Airports & Federal', targets: ['Airports and authorities', 'Public/government agencies', 'Federal: DOT, DOE, VA, HUD, HHS'], budget: 'Above $100M', ranking: { high: 'Above $1B', medium: '$100M–$1B', low: 'Below $100M' }, portals: 'SAM.gov, PANYNJ, MIA SharePoint, Miami-Dade, GOAA Orlando' },
  { tier: 2, title: 'Municipal / Local Gov', targets: ['Municipalities', 'Cities, towns, villages', 'County agencies'], budget: 'Above $10M', ranking: { high: 'Above $100M', medium: '$10M–$100M', low: 'Below $10M' }, portals: 'Bonfire, BidNet Direct, OpenGov Procurement' },
  { tier: 3, title: 'Staff Augmentation', targets: ['Architects', 'Engineers & contractors', 'Design consultants'], budget: 'N/A', ranking: { high: '5+ resources', medium: '2–4 resources', low: '1 resource' }, portals: 'LinkedIn, Sales Navigator, Web Research' },
];

export const ONBOARDING = {
  critical: { label: 'Critical — 48 hours', items: ['Jorge CV', 'PDBM Word template', 'Capabilities statement', 'Contact/CRM export', 'HNTB invoices', 'LinkedIn connections', 'Active opportunities', 'Past projects with values'] },
  important: { label: 'Important — This week', items: ['PDBM org chart', 'Shami resume', 'Gonzalo resume', 'AGC Orlando passcode', 'Sample SOQ/proposal', 'Teaming agreements', 'PDBM logo files', 'Company brochure'] },
  nice: { label: 'Nice to have', items: ['Testimonials', 'Conference history', 'Competitor intel', 'Insurance/bonding', 'SAM.gov registration', 'Subcontractor template', 'Fee schedules', 'Project photos'] },
};

export const ACTION_PLAN = [
  { priority: 'P0', action: 'Stabilize Jarvis after Anthropic/token/billing changes', owner: 'Sergio', why: 'Prevents instability and cost surprises.' },
  { priority: 'P0', action: 'Fix email auth + establish official PDBM Jarvis email', owner: 'Sergio + IT', why: 'Enables safe reports, summaries, and outreach drafts.' },
  { priority: 'P0', action: 'Get Jorge Mac Mini access + complete technical setup', owner: 'Jorge + Sergio', why: 'Required for maintenance, memory compaction, integrations.' },
  { priority: 'P0', action: 'Set up Jarvis WhatsApp/group workflow', owner: 'Sergio + Jorge', why: 'Creates shared testing and review surface.' },
  { priority: 'P0', action: 'Finalize 9–15 opportunity sources', owner: 'Jorge + Team', why: 'Controls noise and defines what Jarvis scans.' },
  { priority: 'P1', action: 'Build Command Center pipeline and fields', owner: 'Sergio', why: 'Turns opportunities into trackable work.' },
  { priority: 'P1', action: 'Puerto Rico USACE / Fantastic Four pilot', owner: 'Sergio + PDBM', why: 'Creates a live proof of workflow.' },
  { priority: 'P1', action: 'Train Shamy Perea and Julio', owner: 'Sergio', why: 'Moves Jarvis from demo to team adoption.' },
  { priority: 'P2', action: 'Split Jarvis into Jarvis, Friday, EDITH, Deby', owner: 'Sergio', why: 'Reduces risk and improves specialization.' },
];

export const TEAM = [
  { name: 'Jorge Quiroz', role: 'CEO — Decision-maker, relationship closer, strategic judgment.' },
  { name: 'Julio', role: 'BIM/technical review, scope breakdown, feasibility, resource estimates.' },
  { name: 'Shamy Perea', role: 'BD, prequalification, proposal packaging, portal review.' },
  { name: 'Sergio', role: 'Jarvis architect, AI workflow builder, automation owner.' },
  { name: 'Friday', role: 'Research agent — portals, LinkedIn, discovery, deep search.' },
  { name: 'EDITH', role: 'Email and outreach drafting — separated from Jarvis for risk control.' },
];

export const RISKS = [
  { risk: 'AI hallucinated contacts or weak confidence', mitigation: 'Use deterministic sources. Label confidence. No external outreach without human review.' },
  { risk: 'Outreach reputation risk', mitigation: 'Jarvis drafts only. Humans review, edit, and send.' },
  { risk: 'Cost and token spikes', mitigation: 'Weekly scans, deep research only after qualification, usage caps.' },
  { risk: 'Noise overload', mitigation: 'Limit sources, refine keywords, use tier scoring and rejection criteria.' },
  { risk: 'Team silos', mitigation: 'Central Command Center with owner, status, and next action per opportunity.' },
  { risk: 'Context contamination', mitigation: 'Separate projects, memory compaction, specialized agents.' },
];
