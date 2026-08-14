import { SKILLS } from '../config/data.js';
import { getIconSvg } from '../utils/icons.js';
import { randomRange } from '../utils/math.js';
import { prefersReducedMotion } from '../utils/device.js';

const RING_RADII_DESKTOP = [20, 27, 34, 41, 48];
// Cards keep roughly the same pixel width on small screens (padding/font
// only shrink a little), but the container itself gets much narrower, so
// the same percentage radii used on desktop push card edges past the
// viewport. Pull rings in tighter below 576px.
const RING_RADII_MOBILE = [14, 20, 26, 32, 38];
const RING_RADII = window.innerWidth <= 576 ? RING_RADII_MOBILE : RING_RADII_DESKTOP;
const VERTICAL_SCALE = 0.65;

export class SkillsGalaxy {
  constructor() {
    this.section = document.querySelector('#skills-galaxy');
    if (!this.section) return;

    this.nodesWrapper = this.section.querySelector('#orbit-nodes');
    this.starsWrapper = this.section.querySelector('#skills-stars');
    this.nodes = [];
    this.dots = [];
    this.time = 0;
    this.isActive = true;

    // Dynamically inject Background Image & Glow Overlay, hide old CSS visual rings
    const orbitContainer = this.section.querySelector('.skills-orbit-container');
    if (orbitContainer) {
      // Create and prepend background image
      this.bgImg = document.createElement('img');
      this.bgImg.src = '/ChatGPT Image Aug 6, 2026, 11_53_05 AM.webp';
      this.bgImg.className = 'skills-orbit-bg';
      this.bgImg.alt = 'Skills Orbit Background';
      orbitContainer.prepend(this.bgImg);

      // Create and prepend planet glow overlay
      this.planetGlowOverlay = document.createElement('div');
      this.planetGlowOverlay.className = 'planet-glow-overlay';
      orbitContainer.prepend(this.planetGlowOverlay);

      // Hide old visual elements (CSS planet, rings)
      const oldElements = orbitContainer.querySelectorAll('.orbit-line, .orbit-center-glow, .skills-core-node');
      oldElements.forEach(el => {
        el.style.display = 'none';
      });
    }

    // Parallax variables
    this.targetParallaxBgX = 0;
    this.targetParallaxBgY = 0;
    this.animatedParallaxBgX = 0;
    this.animatedParallaxBgY = 0;

    this.targetParallaxCardsX = 0;
    this.targetParallaxCardsY = 0;
    this.animatedParallaxCardsX = 0;
    this.animatedParallaxCardsY = 0;

    this.targetParallaxPlanetX = 0;
    this.targetParallaxPlanetY = 0;
    this.animatedParallaxPlanetX = 0;
    this.animatedParallaxPlanetY = 0;

    // Hover tracker
    this.hoveredNode = null;

    this.buildStars();
    this.initOrbits();
    this.initOrbitDots();
    this.initParallax();
    this.startLoop();
  }

  buildStars() {
    if (!this.starsWrapper || prefersReducedMotion()) return;

    const count = 150;
    for (let i = 0; i < count; i += 1) {
      const star = document.createElement('span');
      star.className = 'skills-star';
      star.style.left = `${randomRange(0, 100)}%`;
      star.style.top = `${randomRange(0, 100)}%`;
      star.style.width = star.style.height = `${randomRange(1, 2.4)}px`;
      star.style.animationDelay = `${randomRange(0, 3.5)}s`;
      star.style.animationDuration = `${randomRange(2.5, 5)}s`;
      this.starsWrapper.appendChild(star);
    }
  }

  initParallax() {
    if (prefersReducedMotion()) return;

    this.section.addEventListener('mousemove', (e) => {
      const rect = this.section.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const moveX = (e.clientX - centerX) / (rect.width / 2);
      const moveY = (e.clientY - centerY) / (rect.height / 2);
      
      this.targetParallaxBgX = moveX * 5;
      this.targetParallaxBgY = moveY * 5;
      
      this.targetParallaxCardsX = moveX * 12;
      this.targetParallaxCardsY = moveY * 12;

      this.targetParallaxPlanetX = moveX * 18;
      this.targetParallaxPlanetY = moveY * 18;
    });

    this.section.addEventListener('mouseleave', () => {
      this.targetParallaxBgX = 0;
      this.targetParallaxBgY = 0;
      this.targetParallaxCardsX = 0;
      this.targetParallaxCardsY = 0;
      this.targetParallaxPlanetX = 0;
      this.targetParallaxPlanetY = 0;
    });
  }

  initOrbits() {
    if (!this.nodesWrapper) return;

    // Distribute the skills across 5 concentric rings
    const ringCounts = [3, 4, 3, 4, 3];
    const orbits = [];
    let cursor = 0;

    ringCounts.forEach((count, ringIndex) => {
      orbits.push({
        skills: SKILLS.slice(cursor, cursor + count),
        radiusX: RING_RADII[ringIndex],
        radiusY: RING_RADII[ringIndex] * VERTICAL_SCALE,
        speed: 0.007 - ringIndex * 0.001,
        direction: ringIndex % 2 === 0 ? 1 : -1,
      });
      cursor += count;
    });

    orbits.forEach((orbit) => {
      orbit.skills.forEach((skill, i) => {
        const card = document.createElement('div');
        card.className = 'orbit-node-card glass';
        card.style.setProperty('--skill-color', skill.color || '#a855f7');

        const icon = document.createElement('span');
        icon.className = 'orbit-node-icon';
        icon.innerHTML = getIconSvg(skill.name);

        const name = document.createElement('span');
        name.className = 'orbit-node-name';
        name.textContent = skill.name;

        card.appendChild(icon);
        card.appendChild(name);

        // Dynamically inject the premium glass tooltip card
        const tooltip = document.createElement('div');
        tooltip.className = 'orbit-node-tooltip glass';

        const starsHtml = '⭐'.repeat(skill.rating || 5);

        tooltip.innerHTML = `
          <div class="tooltip-stars">${starsHtml}</div>
          <div class="tooltip-meta">
            <span class="tooltip-exp">${skill.experience || '1+ Years'}</span>
            <span class="tooltip-desc">${skill.description || 'Developer'}</span>
          </div>
        `;
        card.appendChild(tooltip);
        this.nodesWrapper.appendChild(card);

        const angleOffset = (Math.PI * 2 / Math.max(orbit.skills.length, 1)) * i;
        const baseSpeed = orbit.speed * orbit.direction;

        const node = {
          el: card,
          angleOffset,
          currentAngle: angleOffset,
          radiusX: orbit.radiusX,
          radiusY: orbit.radiusY,
          baseSpeed: baseSpeed,
          currentSpeed: baseSpeed,
          targetSpeed: baseSpeed,
          isHovered: false,
          animatedScale: undefined,
          animatedOpacity: undefined,
        };

        // Attach deceleration and hover state listeners
        card.addEventListener('mouseenter', () => {
          node.isHovered = true;
          node.targetSpeed = 0;
          this.hoveredNode = node;

          if (this.planetGlowOverlay) {
            this.planetGlowOverlay.style.background = `radial-gradient(circle, ${skill.color}55 0%, transparent 70%)`;
            this.planetGlowOverlay.style.opacity = '1';
          }
        });

        card.addEventListener('mouseleave', () => {
          node.isHovered = false;
          node.targetSpeed = node.baseSpeed;
          if (this.hoveredNode === node) {
            this.hoveredNode = null;
          }
        });

        this.nodes.push(node);
      });
    });
  }

  initOrbitDots() {
    if (!this.nodesWrapper) return;

    const dotColors = ['#a855f7', '#3b82f6', '#06b6d4'];

    RING_RADII.forEach((radius, ringIndex) => {
      const dot = document.createElement('div');
      dot.className = 'orbit-dot';
      dot.style.setProperty('--dot-color', dotColors[ringIndex % dotColors.length]);
      this.nodesWrapper.appendChild(dot);

      this.dots.push({
        el: dot,
        angleOffset: randomRange(0, Math.PI * 2),
        radiusX: radius,
        radiusY: radius * VERTICAL_SCALE,
        speed: (0.012 - ringIndex * 0.0015) * (ringIndex % 2 === 0 ? -1 : 1),
      });
    });
  }

  startLoop() {
    const tick = () => {
      if (!this.isActive) return;

      this.time += 1;

      // 1. Lerp Parallax positions
      this.animatedParallaxBgX += (this.targetParallaxBgX - this.animatedParallaxBgX) * 0.1;
      this.animatedParallaxBgY += (this.targetParallaxBgY - this.animatedParallaxBgY) * 0.1;

      this.animatedParallaxCardsX += (this.targetParallaxCardsX - this.animatedParallaxCardsX) * 0.1;
      this.animatedParallaxCardsY += (this.targetParallaxCardsY - this.animatedParallaxCardsY) * 0.1;

      this.animatedParallaxPlanetX += (this.targetParallaxPlanetX - this.animatedParallaxPlanetX) * 0.1;
      this.animatedParallaxPlanetY += (this.targetParallaxPlanetY - this.animatedParallaxPlanetY) * 0.1;

      // Apply parallax translation to background image
      if (this.bgImg) {
        this.bgImg.style.transform = `translate(calc(-50% + ${this.animatedParallaxBgX}px), calc(-50% + ${this.animatedParallaxBgY}px))`;
      }

      // Apply parallax translation & idle glow pulsing to planet overlay
      if (this.planetGlowOverlay) {
        this.planetGlowOverlay.style.transform = `translate(calc(-50% + ${this.animatedParallaxPlanetX}px), calc(-50% + ${this.animatedParallaxPlanetY}px))`;
        
        if (!this.hoveredNode) {
          const pulseOpacity = 0.35 + Math.sin(this.time * 0.03) * 0.1;
          this.planetGlowOverlay.style.opacity = pulseOpacity;
          this.planetGlowOverlay.style.background = 'radial-gradient(circle, rgba(147, 51, 234, 0.45) 0%, transparent 70%)';
        }
      }

      // Apply parallax to nodes wrapper
      if (this.nodesWrapper) {
        this.nodesWrapper.style.transform = `translate3d(${this.animatedParallaxCardsX}px, ${this.animatedParallaxCardsY}px, 0)`;
      }

      // 2. Animate and position orbiting technology cards
      this.nodes.forEach((node) => {
        node.currentSpeed += (node.targetSpeed - node.currentSpeed) * 0.1;
        node.currentAngle += node.currentSpeed;

        const cos = Math.cos(node.currentAngle);
        const sin = Math.sin(node.currentAngle);

        const x = 50 + node.radiusX * cos;
        const y = 50 + node.radiusY * sin;

        const depthPercent = (sin + 1) / 2;

        let targetScale, targetOpacity;
        if (node.isHovered) {
          targetScale = 1.15;
          targetOpacity = 1;
        } else {
          targetScale = 0.75 + depthPercent * (1.1 - 0.75);
          targetOpacity = 0.55 + depthPercent * (1 - 0.55);
        }

        if (node.animatedScale === undefined) node.animatedScale = targetScale;
        if (node.animatedOpacity === undefined) node.animatedOpacity = targetOpacity;

        node.animatedScale += (targetScale - node.animatedScale) * 0.15;
        node.animatedOpacity += (targetOpacity - node.animatedOpacity) * 0.15;

        const zIndex = node.isHovered ? 115 : Math.round(depthPercent * 20) + 1;

        node.el.style.left = `${x}%`;
        node.el.style.top = `${y}%`;
        node.el.style.transform = `translate(-50%, -50%) scale(${node.animatedScale})`;
        node.el.style.opacity = node.animatedOpacity;
        node.el.style.zIndex = zIndex;
      });

      // 3. Animate and position background dots
      this.dots.forEach((dot) => {
        dot.angleOffset += dot.speed;

        const cos = Math.cos(dot.angleOffset);
        const sin = Math.sin(dot.angleOffset);

        const x = 50 + dot.radiusX * cos;
        const y = 50 + dot.radiusY * sin;

        const depthPercent = (sin + 1) / 2;
        const scale = 0.6 + depthPercent * (1.3 - 0.6);
        const opacity = 0.3 + depthPercent * (0.9 - 0.3);
        const zIndex = Math.round(depthPercent * 20) + 1;

        dot.el.style.left = `${x}%`;
        dot.el.style.top = `${y}%`;
        dot.el.style.transform = `translate(-50%, -50%) scale(${scale})`;
        dot.el.style.opacity = opacity;
        dot.el.style.zIndex = zIndex;
      });

      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          this.isActive = entry.isIntersecting;
          if (this.isActive) tick();
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(this.section);
  }
}
