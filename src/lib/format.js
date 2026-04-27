export function formatNumber(n) {
  return n.toLocaleString();
}

export function formatPercent(n, total) {
  return Math.round((n / total) * 100) + '%';
}

export function formatCurrency(n) {
  return '$' + n.toLocaleString();
}
