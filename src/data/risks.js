export const RISKS = [
  { risk: 'Hallucinated contacts', severity: 'high', mitigation: 'Deterministic sources only. Label confidence. Human review.' },
  { risk: 'Outreach reputation', severity: 'high', mitigation: 'Draft only. Humans review, edit, send.' },
  { risk: 'Cost / token spikes', severity: 'medium', mitigation: 'Weekly scans. Deep research after qualification. Caps.' },
  { risk: 'Noise overload', severity: 'medium', mitigation: 'Limit sources. Refine keywords. Tier scoring.' },
  { risk: 'Team silos', severity: 'medium', mitigation: 'Central Command Center with owner/status per opp.' },
  { risk: 'Context contamination', severity: 'medium', mitigation: 'Separate projects/agents. Memory compaction.' },
  { risk: 'Remote access fragility', severity: 'medium', mitigation: 'Verify stack once. Document permissions.' },
  { risk: 'Privacy risk', severity: 'medium', mitigation: 'Purpose-bound access. Separate PDBM environment.' },
];
