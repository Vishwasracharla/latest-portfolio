import { gsap, ScrollTrigger } from '../core/GsapSetup.js';
import { EXPERIENCE } from '../config/data.js';

export class Experience {
  constructor() {
    this.section = document.querySelector('#experience');
    if (!this.section) return;

    this.timelineItemsWrap = this.section.querySelector('#timeline-items-wrap');
    this.timelineLine = this.section.querySelector('.timeline-line');
    
    this.initTimeline();
    this.animateTimeline();
  }

  initTimeline() {
    if (!this.timelineItemsWrap) return;

    EXPERIENCE.forEach((exp) => {
      const item = document.createElement('div');
      item.className = 'timeline-item';

      const node = document.createElement('div');
      node.className = 'timeline-item-node';
      const circle = document.createElement('span');
      circle.className = 'timeline-node-circle';

      // Define SVGs for different nodes
      let iconSvg = '';
      if (exp.company.includes('Mobius')) {
        iconSvg = `
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
        `;
      } else if (exp.company.includes('Fresher')) {
        iconSvg = `
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="11" width="18" height="10" rx="2"></rect>
            <circle cx="12" cy="5" r="2"></circle>
            <path d="M12 7v4M8 16h.01M16 16h.01M6 16h.01M18 16h.01"></path>
          </svg>
        `;
      } else {
        // Academy / EduSkills / school
        iconSvg = `
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
            <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
          </svg>
        `;
      }
      circle.innerHTML = iconSvg;
      node.appendChild(circle);

      const card = document.createElement('div');
      card.className = 'timeline-item-card glass';

      const header = document.createElement('div');
      header.className = 'timeline-card-header';
      const title = document.createElement('h3');
      title.textContent = exp.company;
      header.appendChild(title);

      if (exp.live) {
        const badge = document.createElement('span');
        badge.className = 'timeline-status-badge';
        badge.textContent = 'LIVE';
        header.appendChild(badge);
      }
      card.appendChild(header);

      const role = document.createElement('div');
      role.className = 'timeline-role';
      role.textContent = exp.role;
      card.appendChild(role);

      const period = document.createElement('div');
      period.className = 'timeline-period';
      period.textContent = exp.period;
      card.appendChild(period);

      const desc = document.createElement('p');
      desc.className = 'timeline-desc';
      desc.textContent = exp.description;
      card.appendChild(desc);

      item.appendChild(node);
      item.appendChild(card);
      this.timelineItemsWrap.appendChild(item);
    });
  }

  animateTimeline() {
    if (!this.timelineLine) return;

    // Animate timeline line growth as user scrolls
    gsap.fromTo(this.timelineLine, 
      { scaleY: 0 }, 
      {
        scaleY: 1,
        transformOrigin: 'top center',
        ease: 'none',
        scrollTrigger: {
          trigger: '.experience-timeline-container',
          start: 'top 60%',
          end: 'bottom 80%',
          scrub: true
        }
      }
    );

    // Fade and slide in cards
    const cards = this.section.querySelectorAll('.timeline-item-card');
    const nodes = this.section.querySelectorAll('.timeline-node-circle');

    cards.forEach((card, i) => {
      gsap.from(card, {
        x: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });

    nodes.forEach((node, i) => {
      gsap.from(node, {
        scale: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: node,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });
  }
}
