import { gsap } from '../core/GsapSetup.js';
import { isTouch } from '../utils/device.js';
import { randomRange } from '../utils/math.js';
import { getIconSvg } from '../utils/icons.js';

const HERO_TECH = [];

export class Hero {
  constructor() {
    this.section = document.querySelector('#hero');
    if (!this.section) return;

    this.portrait = this.section.querySelector('#hero-portrait');
    this.networkContainer = this.section.querySelector('#hero-network');
    
    this.nodes = [];
    this.canvas = null;
    this.ctx = null;

    this.initNetwork();
    this.animateEntrance();
    this.bindFloat();
    if (!isTouch()) this.bindParallax();
  }

  initNetwork() {
    if (!this.networkContainer) return;

    // Create Canvas for lines
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'hero-network-canvas';
    this.networkContainer.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    // Create nodes
    HERO_TECH.forEach((tech) => {
      const el = document.createElement('div');
      el.className = 'hero-tech-node glass';
      
      const icon = document.createElement('span');
      icon.className = 'tech-node-icon';
      icon.innerHTML = getIconSvg(tech.name);
      
      const label = document.createElement('span');
      label.className = 'tech-node-label';
      label.textContent = tech.name;

      el.appendChild(icon);
      el.appendChild(label);
      this.networkContainer.appendChild(el);

      // Initial layout coordinates
      this.nodes.push({
        el,
        xPercent: tech.x,
        yPercent: tech.y,
        currentX: 0,
        currentY: 0,
        offsetX: randomRange(-15, 15),
        offsetY: randomRange(-15, 15),
        floatSpeedX: randomRange(0.01, 0.02),
        floatSpeedY: randomRange(0.01, 0.02)
      });
    });

    this.drawLines();
  }

  resizeCanvas() {
    if (!this.canvas) return;
    const rect = this.networkContainer.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
  }

  drawLines() {
    const draw = () => {
      if (!this.canvas || !this.ctx) return;
      const { width, height } = this.canvas;
      this.ctx.clearRect(0, 0, width, height);

      // Update positions
      const time = performance.now() * 0.05;
      this.nodes.forEach((n) => {
        const baseX = (n.xPercent / 100) * width;
        const baseY = (n.yPercent / 100) * height;

        n.currentX = baseX + Math.sin(time * n.floatSpeedX) * 15;
        n.currentY = baseY + Math.cos(time * n.floatSpeedY) * 15;

        gsap.set(n.el, { x: n.currentX, y: n.currentY, xPercent: -50, yPercent: -50 });
      });

      // Draw glowing lines between close nodes
      this.ctx.lineWidth = 1.2;
      for (let i = 0; i < this.nodes.length; i++) {
        for (let j = i + 1; j < this.nodes.length; j++) {
          const n1 = this.nodes[i];
          const n2 = this.nodes[j];

          const dx = n1.currentX - n2.currentX;
          const dy = n1.currentY - n2.currentY;
          const dist = Math.hypot(dx, dy);

          if (dist < width * 0.5) {
            const alpha = (1 - dist / (width * 0.5)) * 0.25;
            this.ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
            this.ctx.beginPath();
            this.ctx.moveTo(n1.currentX, n1.currentY);
            this.ctx.lineTo(n2.currentX, n2.currentY);
            this.ctx.stroke();
          }
        }
      }

      requestAnimationFrame(draw);
    };
    draw();
  }

  animateEntrance() {
    const tl = gsap.timeline();

    tl.from('.hero-eyebrow', { opacity: 0, y: 20, duration: 0.6 })
      .from('.hero-title', { opacity: 0, y: 35, duration: 0.8 }, '-=0.4')
      .from('.hero-role-title', { opacity: 0, y: 20, duration: 0.6 }, '-=0.5')
      .from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.6 }, '-=0.5')
      .from('.hero-actions .btn', { opacity: 0, y: 20, stagger: 0.1, duration: 0.6 }, '-=0.4')
      .from(this.portrait, { opacity: 0, scale: 0.85, duration: 1.2, ease: 'power3.out' }, 0.2)
      .from('.hero-portrait-glow', { opacity: 0, scale: 0.6, duration: 1.5 }, 0.2);

    if (this.nodes.length > 0) {
      tl.from(this.nodes.map(n => n.el), { opacity: 0, scale: 0, stagger: 0.08, duration: 0.6, ease: 'back.out(1.5)' }, 0.5);
    }
  }

  bindFloat() {
    if (!this.portrait) return;
    gsap.to(this.portrait, {
      y: -12,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }

  bindParallax() {
    window.addEventListener('mousemove', (e) => {
      const relX = (e.clientX / window.innerWidth) - 0.5;
      const relY = (e.clientY / window.innerHeight) - 0.5;

      gsap.to(this.portrait, { x: relX * 15, y: relY * 15, duration: 1.5, ease: 'power2.out' });
      gsap.to('.hero-portrait-glow', { x: relX * 25, y: relY * 25, duration: 1.8, ease: 'power2.out' });
      gsap.to(this.networkContainer, { x: relX * 10, y: relY * 10, duration: 1.5, ease: 'power2.out' });
    });
  }
}
