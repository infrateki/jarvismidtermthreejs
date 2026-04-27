export const TIERS = [
  {
    tier: 1,
    label: 'Airports & Federal',
    targets: '$100M+',
    budgetThreshold: '$100M+',
    ranking: { high: '$1B+', medium: '$100M-$1B', low: '<$100M' },
  },
  {
    tier: 2,
    label: 'Municipalities',
    targets: '$10M+',
    budgetThreshold: '$10M+',
    ranking: { high: '$100M+', medium: '$10M-$100M', low: '<$10M' },
  },
  {
    tier: 3,
    label: 'Staff Augmentation',
    targets: 'N/A',
    budgetThreshold: 'N/A',
    ranking: { high: '5+ resources', medium: '2-4', low: '1' },
  },
];
