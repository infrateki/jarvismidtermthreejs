export function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4);
}

export function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}
