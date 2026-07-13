import { gsap } from '../core/GsapSetup.js';
import { SKILLS } from '../config/data.js';
import { getIconSvg } from '../utils/icons.js';

export class SkillsGalaxy {
  constructor() {
    this.section = document.querySelector('#skills-galaxy');
    if (!this.section) return;

    this.nodesWrapper = this.section.querySelector('#orbit-nodes');
    this.nodes = [];
    this.time = 0;
    this.isActive = true;

    this.initOrbits();
    this.startLoop();
  }

  initOrbits() {
    if (!this.nodesWrapper) return;

    // Distribute skills equally among 3 elliptical tracks
    const innerSkills = SKILLS.slice(0, 4);
    const middleSkills = SKILLS.slice(4, 8);
    const outerSkills = SKILLS.slice(8, 12);

    const orbits = [
      { skills: innerSkills, radiusX: 18, radiusY: 18, speed: 0.006, direction: 1 },
      { skills: middleSkills, radiusX: 32, radiusY: 32, speed: 0.004, direction: -1 },
      { skills: outerSkills, radiusX: 46, radiusY: 46, speed: 0.0025, direction: 1 }
    ];

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
        this.nodesWrapper.appendChild(card);

        // Store active reference and initial angular offset
        const angleOffset = (Math.PI * 2 / orbit.skills.length) * i;
        this.nodes.push({
          el: card,
          angleOffset,
          radiusX: orbit.radiusX,
          radiusY: orbit.radiusY,
          speed: orbit.speed * orbit.direction
        });
      });
    });
  }

  startLoop() {
    const tick = () => {
      if (!this.isActive) return;

      this.time += 1;

      this.nodes.forEach((node) => {
        // Calculate current angle based on elapsed time and orbital speed
        const angle = this.time * node.speed + node.angleOffset;

        // Calculate elliptical coordinate offsets
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        const x = 50 + node.radiusX * cos;
        const y = 50 + node.radiusY * sin;

        // Apply scale depth based on vertical position (closer to bottom of page is closer to viewer)
        // sin ranges from -1 to 1. When sin = 1 (bottom), node is closest. When sin = -1 (top), node is furthest.
        const depthPercent = (sin + 1) / 2; // ranges from 0 to 1
        const scale = 0.75 + depthPercent * 0.35; // scale from 0.75 to 1.1
        const opacity = 0.5 + depthPercent * 0.5; // opacity from 0.5 to 1.0
        const zIndex = Math.round(depthPercent * 20) + 1; // zIndex from 1 to 21

        gsap.set(node.el, {
          left: `${x}%`,
          top: `${y}%`,
          scale,
          opacity,
          zIndex
        });
      });

      requestAnimationFrame(tick);
    };

    // Use IntersectionObserver to stop loop if section is out of viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        this.isActive = entry.isIntersecting;
        if (this.isActive) tick();
      });
    }, { threshold: 0.1 });

    observer.observe(this.section);
  }
}
