import { randomRange } from '../utils/math.js';
import { prefersReducedMotion } from '../utils/device.js';

export class ParticleField {
  constructor(canvas, { count = 80, color = '255, 255, 255', maxSpeed = 0.15 } = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.color = color;
    this.maxSpeed = maxSpeed;
    this.count = prefersReducedMotion() ? 0 : count;
    this.particles = [];
    this.visible = true;

    this.resize();
    this.createParticles();

    window.addEventListener('resize', () => this.resize());
    document.addEventListener('visibilitychange', () => {
      this.visible = !document.hidden;
    });

    if (this.count > 0) this.loop();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    this.particles = Array.from({ length: this.count }, () => ({
      x: randomRange(0, this.canvas.width),
      y: randomRange(0, this.canvas.height),
      r: randomRange(0.6, 2),
      vx: randomRange(-this.maxSpeed, this.maxSpeed),
      vy: randomRange(-this.maxSpeed, this.maxSpeed),
      alpha: randomRange(0.2, 0.8),
    }));
  }

  loop() {
    if (this.visible) this.draw();
    requestAnimationFrame(() => this.loop());
  }

  draw() {
    const { ctx, canvas } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${p.alpha})`;
      ctx.fill();
    }
  }
}
