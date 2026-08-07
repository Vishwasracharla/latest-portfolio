import { gsap } from '../core/GsapSetup.js';
import { TOOLKIT } from '../config/data.js';
import { getIconSvg } from '../utils/icons.js';

const BRAND_COLORS = {
  'VS Code':  '#007acc',
  'Git':      '#f05032',
  'GitHub':   '#ffffff',
  'Docker':   '#2496ed',
  'Postman':  '#ff6c37',
  'Figma':    '#a259ff',
  'Jira':     '#0052cc',
  'Vercel':   '#ffffff',
  'Netlify':  '#00c7b7',
  'Linux':    '#fcc624',
  'npm':      '#cb3837',
  'ESLint':   '#4b32c3'
};

export class TechWall {
  constructor() {
    this.section = document.querySelector('#tech-wall');
    if (!this.section) return;

    this.grid = this.section.querySelector('#toolkit-grid');
    this.nodes = [];

    this.orbitAngle = 0;
    // Orbit radii precisely matched to the pre-drawn perspective orbit in toolsik.png
    this.rx = 34;   // horizontal radius in %
    this.ry = 17.5; // vertical radius in %
    this.isDesktop = window.innerWidth > 768;
    this.isAnyCardHovered = false;

    this.initToolkit();

    this.updateOrbit = this.updateOrbit.bind(this);
    gsap.ticker.add(this.updateOrbit);

    window.addEventListener('resize', () => {
      const wasDesktop = this.isDesktop;
      this.isDesktop = window.innerWidth > 768;
      if (wasDesktop && !this.isDesktop) {
        this.nodes.forEach(node => gsap.set(node.el, { clearProps: 'all' }));
      }
    });
  }

  initToolkit() {
    if (!this.grid) return;

    const total = TOOLKIT.length;

    TOOLKIT.forEach((tool, idx) => {
      const card = document.createElement('div');
      const toolClass = 'tool-' + tool.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      card.className = `toolkit-card glass ${toolClass}`;
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

      const baseAngle = (idx / total) * 2 * Math.PI;

      const node = {
        el: card,
        baseAngle,
        isHovered: false,
        currentScale: 1,
        currentOpacity: 1,
        currentBlur: 0
      };

      this.nodes.push(node);

      card.addEventListener('mouseenter', () => {
        node.isHovered = true;
        this.isAnyCardHovered = true;
      });

      card.addEventListener('mouseleave', () => {
        node.isHovered = false;
        this.isAnyCardHovered = false;
        gsap.to(card, {
          x: 0, y: 0, rotateX: 0, rotateY: 0,
          duration: 0.6, ease: 'power2.out'
        });
      });

      card.addEventListener('mousemove', (e) => {
        if (!this.isDesktop) return;
        const rect = card.getBoundingClientRect();
        const relX = e.clientX - rect.left - rect.width / 2;
        const relY = e.clientY - rect.top - rect.height / 2;
        gsap.to(card, {
          x: relX * 0.25, y: relY * 0.25,
          rotateY: relX * 0.15, rotateX: -relY * 0.15,
          duration: 0.4, ease: 'power2.out'
        });
      });
    });
  }

  updateOrbit() {
    if (!this.isDesktop) return;

    if (!this.isAnyCardHovered) {
      this.orbitAngle += 0.0018;
    }

    this.nodes.forEach((node) => {
      const angle = node.baseAngle + this.orbitAngle;
      const sinVal = Math.sin(angle);

      // Position centered over the glowing brain ring (50%, 48%)
      const targetX = 50 + Math.cos(angle) * this.rx;
      const targetY = 48 + sinVal * this.ry;

      // Crisp visibility depth effects matching Image 1
      let targetScale   = 0.85 + (sinVal + 1) * 0.15;  // range 0.85 → 1.15
      let targetOpacity = 0.75 + (sinVal + 1) * 0.125; // range 0.75 → 1.0 (always bright!)
      let targetZIndex  = sinVal > 0 ? 6 : 3;

      if (node.isHovered) {
        targetScale   = 1.35;
        targetOpacity = 1.0;
        targetZIndex  = 15;
      }

      // Smooth lerp interpolation
      node.currentScale   += (targetScale   - node.currentScale)   * 0.1;
      node.currentOpacity += (targetOpacity - node.currentOpacity) * 0.1;

      gsap.set(node.el, {
        left:    `${targetX}%`,
        top:     `${targetY}%`,
        scale:   node.currentScale,
        opacity: node.currentOpacity,
        zIndex:  targetZIndex
      });
    });
  }
}
