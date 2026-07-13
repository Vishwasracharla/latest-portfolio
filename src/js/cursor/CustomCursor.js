import { gsap } from '../core/GsapSetup.js';
import { isTouch } from '../utils/device.js';

export class CustomCursor {
  constructor() {
    if (isTouch()) return;

    this.dot = document.createElement('div');
    this.dot.className = 'cursor cursor-dot';

    this.ring = document.createElement('div');
    this.ring.className = 'cursor cursor-ring';

    // Particle trail dots
    const TRAIL_COUNT = 8;
    this.trails = Array.from({ length: TRAIL_COUNT }, (_, i) => {
      const dot = document.createElement('div');
      dot.className = 'cursor cursor-trail';
      dot.style.setProperty('--trail-index', i);
      document.body.appendChild(dot);
      return { el: dot, x: window.innerWidth / 2, y: window.innerHeight / 2 };
    });

    document.body.append(this.ring, this.dot);
    document.body.classList.add('has-custom-cursor');

    this.pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.ringPos = { ...this.pos };

    this.bindEvents();
    this.tick();
  }

  bindEvents() {
    window.addEventListener('mousemove', (e) => {
      this.pos.x = e.clientX;
      this.pos.y = e.clientY;
      gsap.set(this.dot, { x: this.pos.x, y: this.pos.y });
    });

    window.addEventListener('mousedown', () => this.spawnRipple());

    const hoverSelector = 'a, button, [data-cursor-hover]';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(hoverSelector)) this.ring.classList.add('is-hover');
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(hoverSelector)) this.ring.classList.remove('is-hover');
    });

    document.querySelectorAll('[data-magnetic]').forEach((el) => this.applyMagnetic(el));
  }

  applyMagnetic(el) {
    const strength = parseFloat(el.dataset.magnetic) || 0.4;
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, { x: relX * strength, y: relY * strength, duration: 0.4, ease: 'power3.out' });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    });
  }

  spawnRipple() {
    const ripple = document.createElement('div');
    ripple.className = 'cursor-ripple';
    ripple.style.left = `${this.pos.x}px`;
    ripple.style.top = `${this.pos.y}px`;
    document.body.appendChild(ripple);
    gsap.to(ripple, {
      width: 80,
      height: 80,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      onComplete: () => ripple.remove(),
    });
  }

  tick() {
    this.ringPos.x += (this.pos.x - this.ringPos.x) * 0.15;
    this.ringPos.y += (this.pos.y - this.ringPos.y) * 0.15;
    gsap.set(this.ring, { x: this.ringPos.x, y: this.ringPos.y });

    // Trail particles follow with cascading lag
    for (let i = 0; i < this.trails.length; i++) {
      const target = i === 0 ? this.pos : this.trails[i - 1];
      const trail = this.trails[i];
      const speed = 0.25 - i * 0.02;

      trail.x += (target.x - trail.x) * speed;
      trail.y += (target.y - trail.y) * speed;

      gsap.set(trail.el, { x: trail.x, y: trail.y });
    }

    requestAnimationFrame(() => this.tick());
  }
}
