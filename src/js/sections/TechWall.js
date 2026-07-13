import { gsap } from '../core/GsapSetup.js';
import { TOOLKIT } from '../config/data.js';
import { getIconSvg } from '../utils/icons.js';

const BRAND_COLORS = {
  'VS Code': '#007acc',
  'Git': '#f05032',
  'GitHub': '#ffffff',
  'Docker': '#2496ed',
  'Postman': '#ff6c37',
  'Figma': '#a259ff',
  'Jira': '#0052cc',
  'Vercel': '#ffffff',
  'Netlify': '#00c7b7',
  'Linux': '#fcc624',
  'npm': '#cb3837',
  'ESLint': '#4b32c3'
};

export class TechWall {
  constructor() {
    this.section = document.querySelector('#tech-wall');
    if (!this.section) return;

    this.grid = this.section.querySelector('#toolkit-grid');
    
    this.initToolkit();
    this.animateFloating();
  }

  initToolkit() {
    if (!this.grid) return;

    TOOLKIT.forEach((tool, idx) => {
      const card = document.createElement('div');
      card.className = 'toolkit-card glass';
      card.dataset.magnetic = '0.2';
      card.style.setProperty('--brand-color', BRAND_COLORS[tool.name] || '#a855f7');

      const iconWrap = document.createElement('div');
      iconWrap.className = 'toolkit-icon-wrapper';
      const icon = document.createElement('span');
      icon.className = 'toolkit-icon-img';
      icon.innerHTML = getIconSvg(tool.name);
      iconWrap.appendChild(icon);
      card.appendChild(iconWrap);

      const name = document.createElement('span');
      name.className = 'toolkit-card-name';
      name.textContent = tool.name;
      card.appendChild(name);

      this.grid.appendChild(card);
    });

    // Apply magnetic hover effects
    this.grid.querySelectorAll('.toolkit-card').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const relX = e.clientX - rect.left - rect.width / 2;
        const relY = e.clientY - rect.top - rect.height / 2;
        gsap.to(card, {
          x: relX * 0.25,
          y: relY * 0.25,
          rotateY: relX * 0.15,
          rotateX: -relY * 0.15,
          duration: 0.4,
          ease: 'power2.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          x: 0,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          duration: 0.6,
          ease: 'power2.out'
        });
      });
    });
  }

  animateFloating() {
    const cards = this.grid.querySelectorAll('.toolkit-card');
    cards.forEach((card, idx) => {
      // Gentle random floating offsets
      gsap.to(card, {
        y: '+=6',
        rotateZ: randomRange(-2, 2),
        duration: randomRange(2.5, 4),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: idx * 0.1
      });
    });
  }
}

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}
