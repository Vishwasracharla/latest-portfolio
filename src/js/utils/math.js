export const lerp = (start, end, t) => start + (end - start) * t;

export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const mapRange = (value, inMin, inMax, outMin, outMax) =>
  outMin + ((value - inMin) * (outMax - outMin)) / (inMax - inMin);

export const randomRange = (min, max) => Math.random() * (max - min) + min;
