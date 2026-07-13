import SplitType from 'split-type';
import { gsap } from '../core/GsapSetup.js';

export function revealLines(target, { stagger = 0.08, delay = 0 } = {}) {
  const split = new SplitType(target, { types: 'lines', lineClass: 'split-line' });

  split.lines.forEach((line) => {
    const inner = document.createElement('span');
    inner.innerHTML = line.innerHTML;
    line.innerHTML = '';
    line.style.overflow = 'hidden';
    line.appendChild(inner);
    gsap.set(inner, { yPercent: 110, display: 'block' });
  });

  const innerSpans = split.lines.map((l) => l.firstChild);

  gsap.to(innerSpans, {
    yPercent: 0,
    duration: 1,
    delay,
    stagger,
    ease: 'power4.out',
  });

  return split;
}
