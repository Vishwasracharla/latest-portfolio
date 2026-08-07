import { gsap, ScrollTrigger } from '../core/GsapSetup.js';
import { PROJECTS } from '../config/data.js';
import { getIconSvg } from '../utils/icons.js';

export class Projects {
  constructor() {
    this.section = document.querySelector('#projects');
    if (!this.section) return;

    // Rebuild the section HTML structure
    this.section.innerHTML = '';
    this.section.className = 'projects';
    this.section.innerHTML = `
      <div class="projects-sticky-wrapper">
        <div class="projects-header">
          <span class="projects-eyebrow"><span class="section-number">05</span> PROJECTS SHOWCASE</span>
        </div>

        <div class="projects-viewport">
          <div class="projects-horizontal-track" id="projects-horizontal-track">
            <!-- Dynamically Injected Slides -->
          </div>
        </div>

        <!-- Carousel navigation indicators -->
        <div class="projects-nav-dots" id="projects-nav-dots"></div>
      </div>
    `;

    this.track = this.section.querySelector('#projects-horizontal-track');
    this.dotsContainer = this.section.querySelector('#projects-nav-dots');

    this.currentIndex = 0;
    this.cards = [];
    this.dots = [];
    this.lastThemeIndex = -1;

    // Space environment background
    this.section.style.background = "url('/5fc06aee-f047-405b-8c1f-beebe01ace9a.png') no-repeat center center";
    this.section.style.backgroundSize = 'cover';

    this.initProjects();
    this.setupScrollTrigger();
    this.bindMouseInteraction();
  }

  initProjects() {
    if (!this.track) return;

    PROJECTS.forEach((proj, idx) => {
      const slide = document.createElement('div');
      slide.className = 'project-slide-full';

      // ── TOP HEADER: category + title + subtitle ──────────────────────────
      const header = document.createElement('div');
      header.className = 'project-slide-header';
      header.innerHTML = `
        <span class="project-slide-category">${proj.category.toUpperCase()}</span>
        <h2 class="project-slide-title">${proj.title.toUpperCase()}</h2>
        <p class="project-slide-subtitle">${proj.subtitle || ''}</p>
      `;
      slide.appendChild(header);

      // ── MAIN BODY: 3-column layout ────────────────────────────────────────
      const body = document.createElement('div');
      body.className = 'project-slide-body';

      // LEFT PANEL — About This Project
      const leftPanel = document.createElement('div');
      leftPanel.className = 'project-panel project-panel-left';
      leftPanel.innerHTML = `
        <div class="panel-label">ABOUT THIS PROJECT</div>
        <h3 class="panel-title">${proj.aboutTitle || proj.title}</h3>
        <p class="panel-desc">${proj.aboutDesc || ''}</p>
        <ul class="panel-features">
          ${(proj.features || []).map(f => `
            <li class="panel-feature-item">
              <span class="feature-check">✓</span>
              <span>${f}</span>
            </li>
          `).join('')}
        </ul>
      `;

      // CENTER — Screenshot on glowing pedestal
      const center = document.createElement('div');
      center.className = 'project-center';

      const sceneWrapper = document.createElement('div');
      sceneWrapper.className = 'project-scene-wrapper';

      const frame = document.createElement('div');
      frame.className = 'project-frame';

      const img = document.createElement('img');
      img.src = proj.image;
      img.className = 'project-screenshot-hero';
      img.alt = proj.title;
      img.loading = 'lazy';

      const reflection = document.createElement('div');
      reflection.className = 'project-glass-reflection';

      const scanlines = document.createElement('div');
      scanlines.className = 'project-scan-lines';

      frame.appendChild(img);
      frame.appendChild(reflection);
      frame.appendChild(scanlines);
      sceneWrapper.appendChild(frame);

      // Glowing pedestal rings under screenshot
      const pedestal = document.createElement('div');
      pedestal.className = 'project-pedestal';
      pedestal.innerHTML = `
        <div class="project-pedestal-ring ring-1"></div>
        <div class="project-pedestal-ring ring-2"></div>
        <div class="project-pedestal-ring ring-3"></div>
        <div class="project-pedestal-glow"></div>
      `;

      center.appendChild(sceneWrapper);
      center.appendChild(pedestal);

      // RIGHT PANEL — Tech Stack
      const rightPanel = document.createElement('div');
      rightPanel.className = 'project-panel project-panel-right';
      rightPanel.innerHTML = `
        <div class="panel-label">TECH STACK</div>
        <ul class="panel-tech-list">
          ${(proj.techStack || []).map(t => `
            <li class="panel-tech-item">
              <span class="tech-icon">${getIconSvg(t.name)}</span>
              <span class="tech-name">${t.name}</span>
            </li>
          `).join('')}
        </ul>
      `;

      body.appendChild(leftPanel);
      body.appendChild(center);
      body.appendChild(rightPanel);
      slide.appendChild(body);

      // ── BOTTOM ACTIONS: Live Demo + View Code ────────────────────────────
      const actions = document.createElement('div');
      actions.className = 'project-slide-actions';
      actions.innerHTML = `
        <a class="btn-demo-link" href="${proj.demo}" target="_blank" rel="noopener">
          LIVE DEMO ➔
        </a>
        <a class="btn-github-link" href="${proj.github}" target="_blank" rel="noopener">
          VIEW CODE ↻
        </a>
      `;
      slide.appendChild(actions);

      this.track.appendChild(slide);
      this.cards.push(slide);

      // Nav dot
      const dot = document.createElement('div');
      dot.className = 'project-dot';
      if (idx === 0) dot.classList.add('active');
      this.dotsContainer.appendChild(dot);
      this.dots.push(dot);

      dot.addEventListener('click', () => {
        const scrollDistance = (idx / (PROJECTS.length - 1)) * (PROJECTS.length * window.innerHeight);
        const sectionTop = this.section.offsetTop;
        window.scrollTo({ top: sectionTop + scrollDistance, behavior: 'smooth' });
      });
    });

    // Apply initial accent color from first project
    const first = PROJECTS[0];
    this.section.style.setProperty('--active-accent-color', first.color);
    this.section.style.setProperty('--active-accent-color-rgb', first.colorRgb);
    this.section.style.setProperty('--active-accent-glow', first.glow);
  }

  setupScrollTrigger() {
    this.horizontalScroll = gsap.to(this.track, {
      x: () => -(this.track.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: this.section,
        pin: true,
        scrub: true,
        start: 'top top',
        end: () => `+=${this.cards.length * 100}%`,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const rawIdx = self.progress * (PROJECTS.length - 1);
          const index = Math.round(rawIdx);
          this.currentIndex = index;
          this.updateActiveTheme(index);
        }
      }
    });

    // Per-slide cinematic entrance/exit transitions
    this.cards.forEach((slide, idx) => {
      const frame = slide.querySelector('.project-frame');
      const header = slide.querySelector('.project-slide-header');
      const leftPanel = slide.querySelector('.project-panel-left');
      const rightPanel = slide.querySelector('.project-panel-right');
      const actions = slide.querySelector('.project-slide-actions');
      const pedestal = slide.querySelector('.project-pedestal');

      // Initial hidden state
      gsap.set(frame, { scale: 0.92, opacity: 0.5, filter: 'blur(10px)' });
      gsap.set([header, leftPanel, rightPanel, actions], { opacity: 0, y: 20 });
      gsap.set(pedestal, { opacity: 0, scaleX: 0.4 });

      if (idx === 0) {
        gsap.set(frame, { scale: 1, opacity: 1, filter: 'blur(0px)' });
        gsap.set([header, leftPanel, rightPanel, actions], { opacity: 1, y: 0 });
        gsap.set(pedestal, { opacity: 1, scaleX: 1 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: slide,
          containerAnimation: this.horizontalScroll,
          start: 'left right',
          end: 'right left',
          scrub: true
        }
      });

      tl.to(frame, {
        keyframes: [
          { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power2.out' },
          { scale: 0.92, opacity: 0.5, filter: 'blur(10px)', duration: 0.5, ease: 'power2.in' }
        ]
      });

      tl.to([header, leftPanel, rightPanel, actions], {
        keyframes: [
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
          { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' }
        ]
      }, 0);

      tl.to(pedestal, {
        keyframes: [
          { opacity: 1, scaleX: 1, duration: 0.4, ease: 'power2.out' },
          { opacity: 0, scaleX: 0.4, duration: 0.4, ease: 'power2.in' }
        ]
      }, 0);
    });
  }

  updateActiveTheme(index) {
    this.dots.forEach((dot, i) => dot.classList.toggle('active', i === index));

    const proj = PROJECTS[index];
    if (proj && this.lastThemeIndex !== index) {
      this.lastThemeIndex = index;
      gsap.to(this.section, {
        '--active-accent-color': proj.color,
        '--active-accent-color-rgb': proj.colorRgb,
        '--active-accent-glow': proj.glow,
        duration: 0.8,
        ease: 'power2.out'
      });
    }
  }

  bindMouseInteraction() {
    this.section.addEventListener('mousemove', (e) => {
      const rect = this.section.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      const activeSlide = this.cards[this.currentIndex];
      if (!activeSlide) return;
      const frame = activeSlide.querySelector('.project-frame');
      const reflection = activeSlide.querySelector('.project-glass-reflection');

      if (frame) {
        gsap.to(frame, {
          rotateY: x * 4,
          rotateX: -y * 4,
          x: x * 6,
          y: y * 4,
          boxShadow: `0 30px 60px rgba(0,0,0,.7), 0 0 35px var(--active-accent-color)`,
          duration: 0.5,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      }
      if (reflection) {
        gsap.to(reflection, {
          x: x * 35, y: y * 35,
          opacity: 0.25 + y * 0.08,
          duration: 0.5, ease: 'power2.out', overwrite: 'auto'
        });
      }
    });

    this.section.addEventListener('mouseleave', () => {
      const activeSlide = this.cards[this.currentIndex];
      if (!activeSlide) return;
      const frame = activeSlide.querySelector('.project-frame');
      const reflection = activeSlide.querySelector('.project-glass-reflection');

      if (frame) {
        gsap.to(frame, {
          rotateY: 0, rotateX: 0, x: 0, y: 0,
          boxShadow: `0 20px 50px rgba(0,0,0,.6), 0 0 30px var(--active-accent-glow)`,
          duration: 0.8, ease: 'power2.out', overwrite: 'auto'
        });
      }
      if (reflection) {
        gsap.to(reflection, {
          x: 0, y: 0, opacity: 0.20,
          duration: 0.8, ease: 'power2.out', overwrite: 'auto'
        });
      }
    });
  }
}
