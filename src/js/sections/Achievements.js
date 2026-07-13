import { gsap, ScrollTrigger } from '../core/GsapSetup.js';
import { ACHIEVEMENTS } from '../config/data.js';

export class Achievements {
  constructor() {
    this.section = document.querySelector('#achievements');
    if (!this.section) return;

    this.nodesContainer = this.section.querySelector('#achievements-nodes-wrap');
    this.svg = this.section.querySelector('#achievements-svg-lines');

    this.points = [
      { x: 100, y: 300, pos: 'bottom' },
      { x: 260, y: 220, pos: 'top' },
      { x: 420, y: 280, pos: 'bottom' },
      { x: 580, y: 160, pos: 'top' },
      { x: 740, y: 220, pos: 'bottom' },
      { x: 900, y: 100, pos: 'top' }
    ];

    this.initConstellation();
    this.animateEntrance();
  }

  initConstellation() {
    if (!this.nodesContainer || !this.svg) return;

    // Build the SVG path connecting points
    let d = '';
    this.points.forEach((pt, idx) => {
      if (idx === 0) {
        d += `M ${pt.x} ${pt.y}`;
      } else {
        // Curve to make it look smooth and wavy
        const prev = this.points[idx - 1];
        const cpX1 = prev.x + 80;
        const cpY1 = prev.y;
        const cpX2 = pt.x - 80;
        const cpY2 = pt.y;
        d += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${pt.x} ${pt.y}`;
      }
    });

    // Create the background line
    const bgLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    bgLine.setAttribute('d', d);
    bgLine.setAttribute('fill', 'none');
    bgLine.setAttribute('stroke', 'rgba(168, 85, 247, 0.1)');
    bgLine.setAttribute('stroke-width', '4');
    this.svg.appendChild(bgLine);

    // Create the active/glowing line
    const activeLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    activeLine.setAttribute('d', d);
    activeLine.setAttribute('fill', 'none');
    activeLine.setAttribute('stroke', 'url(#achievements-grad)');
    activeLine.setAttribute('stroke-width', '4');
    activeLine.setAttribute('class', 'glow-effect');
    this.svg.appendChild(activeLine);

    // Add SVG Gradient definition
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const grad = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    grad.setAttribute('id', 'achievements-grad');
    grad.setAttribute('x1', '0%');
    grad.setAttribute('y1', '0%');
    grad.setAttribute('x2', '100%');
    grad.setAttribute('y2', '0%');

    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', '#7c3aed');

    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', '#06b6d4');

    grad.appendChild(stop1);
    grad.appendChild(stop2);
    defs.appendChild(grad);
    this.svg.appendChild(defs);

    // Render HTML nodes on top
    ACHIEVEMENTS.forEach((ach, idx) => {
      const pt = this.points[idx];
      if (!pt) return;

      const node = document.createElement('div');
      node.className = `achievement-node position-${pt.pos}`;
      node.style.left = `${(pt.x / 1000) * 100}%`;
      node.style.top = `${(pt.y / 400) * 100}%`;

      const dot = document.createElement('div');
      dot.className = 'achievement-dot';
      node.appendChild(dot);

      const label = document.createElement('div');
      label.className = 'achievement-label';
      label.textContent = ach.label;
      node.appendChild(label);

      // Tooltip/popup containing extra description
      const tooltip = document.createElement('div');
      tooltip.className = 'achievement-tooltip';
      tooltip.textContent = `Completed milestone: ${ach.label}`;
      node.appendChild(tooltip);

      this.nodesContainer.appendChild(node);
    });
  }

  animateEntrance() {
    const activeLine = this.svg.querySelector('.glow-effect');
    if (!activeLine) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: this.section,
        start: 'top 65%',
        toggleActions: 'play none none none'
      }
    });

    // Animate drawing the line path
    timeline.fromTo(activeLine, 
      { strokeDashoffset: 1200, strokeDasharray: 1200 }, 
      { strokeDashoffset: 0, duration: 2.2, ease: 'power2.inOut' }
    );

    // Stagger reveal nodes
    const nodeEls = this.section.querySelectorAll('.achievement-node');
    timeline.from(nodeEls, {
      opacity: 0,
      scale: 0,
      stagger: 0.12,
      duration: 0.6,
      ease: 'back.out(1.5)'
    }, 0.5);
  }
}
