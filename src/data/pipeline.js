export const PIPELINE_STAGES = [
  'Radar',
  'Qualified',
  'Jorge Review',
  'Contact',
  'Proposal',
  'Won',
  'Lost',
];

export const AUTONOMY_KNOB = [
  { level: 0, mode: 'Manual', description: 'Everything requires Jorge approval' },
  { level: 3, mode: 'Conservative', description: 'Jarvis suggests; Jorge approves all outbound' },
  { level: 6, mode: 'Balanced', description: 'Jarvis drafts and queues; Jorge reviews batches' },
  { level: 9, mode: 'Autonomous', description: 'Jarvis executes routine; flags exceptions' },
  { level: 10, mode: 'Vacation', description: 'Full autonomy; Jorge informed of escalations only' },
];
