import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './GsapSetup.js';
import { prefersReducedMotion } from '../utils/device.js';

let lenisInstance = null;

export function initLenis() {
  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    duration: prefersReducedMotion() ? 0.1 : 1.1,
    easing: (t) => 1 - Math.pow(1 - t, 4),
    smoothWheel: !prefersReducedMotion(),
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
  });

  lenisInstance.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenisInstance.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
}

export function getLenis() {
  return lenisInstance;
}
