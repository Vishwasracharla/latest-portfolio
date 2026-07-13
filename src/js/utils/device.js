export const isTouch = () => window.matchMedia('(pointer: coarse)').matches;

export const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
