import { gsap } from '../core/GsapSetup.js';
import { clamp } from '../utils/math.js';
import { isTouch } from '../utils/device.js';

export function applyTilt(el, { max = 12, scale = 1.03 } = {}) {
  if (isTouch()) return;

  const wrap = el.parentElement;

  const onMove = (e) => {
    const rect = wrap.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    const rotateY = clamp(relX * max * 2, -max, max);
    const rotateX = clamp(-relY * max * 2, -max, max);

    gsap.to(el, {
      rotateX,
      rotateY,
      scale,
      duration: 0.6,
      ease: 'power3.out',
    });
  };

  const onLeave = () => {
    gsap.to(el, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.8, ease: 'elastic.out(1, 0.5)' });
  };

  wrap.addEventListener('mousemove', onMove);
  wrap.addEventListener('mouseleave', onLeave);
}
