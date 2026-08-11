import { gsap } from '../core/GsapSetup.js';
import { getLenis } from '../core/LenisSetup.js';

const EXIT_EASE = 'power3.inOut';

export class ProjectDetailOverlay {
  constructor() {
    this.el = document.createElement('div');
    this.el.className = 'project-detail-overlay';
    this.el.innerHTML = `
      <div class="detail-backdrop"></div>
      <button class="detail-back-top" type="button">← Back to Projects</button>
      <button class="detail-close" type="button" aria-label="Close project details">✕</button>

      <div class="detail-astronaut-stage">
        <img class="detail-astronaut-img" src="/ASTRANAUT-1.png" alt="" />
      </div>

      <div class="detail-heading-block">
        <span class="detail-eyebrow"><span class="detail-number"></span><span class="detail-category"></span></span>
        <h2 class="detail-title"></h2>
        <p class="detail-subtitle"></p>
      </div>

      <div class="detail-info-panel glass" data-lenis-prevent>
        <div class="detail-divider"></div>

        <div class="detail-block detail-block-overview">
          <h4 class="detail-block-label">Project Overview</h4>
          <p class="detail-overview"></p>
        </div>

        <div class="detail-block detail-block-features">
          <h4 class="detail-block-label">Key Features</h4>
          <ul class="detail-built-list"></ul>
        </div>

        <div class="detail-block detail-block-tech">
          <h4 class="detail-block-label">Tech Stack</h4>
          <div class="detail-tech-chips"></div>
        </div>

        <div class="detail-divider"></div>

        <div class="detail-actions">
          <a class="btn btn-primary detail-action-live" target="_blank" rel="noopener">View Live ↗</a>
          <a class="btn btn-outline detail-action-code" target="_blank" rel="noopener">View Code ↗</a>
        </div>

        <button class="detail-back-btn" type="button">← Back to Projects</button>
      </div>
    `;
    document.body.appendChild(this.el);

    this.closeBtn = this.el.querySelector('.detail-close');
    this.backdrop = this.el.querySelector('.detail-backdrop');
    this.backBtn = this.el.querySelector('.detail-back-btn');
    this.backTopBtn = this.el.querySelector('.detail-back-top');

    this.stageEl = this.el.querySelector('.detail-astronaut-stage');
    this.headingEl = this.el.querySelector('.detail-heading-block');
    this.panelEl = this.el.querySelector('.detail-info-panel');

    this.numberEl = this.el.querySelector('.detail-number');
    this.categoryEl = this.el.querySelector('.detail-category');
    this.titleEl = this.el.querySelector('.detail-title');
    this.subtitleEl = this.el.querySelector('.detail-subtitle');
    this.overviewEl = this.el.querySelector('.detail-overview');
    this.overviewBlock = this.el.querySelector('.detail-block-overview');
    this.featuresBlock = this.el.querySelector('.detail-block-features');
    this.builtListEl = this.el.querySelector('.detail-built-list');
    this.techBlock = this.el.querySelector('.detail-block-tech');
    this.techChipsEl = this.el.querySelector('.detail-tech-chips');
    this.liveBtn = this.el.querySelector('.detail-action-live');
    this.codeBtn = this.el.querySelector('.detail-action-code');
    this.actionsEl = this.el.querySelector('.detail-actions');

    this.isOpen = false;
    this.sourceRefs = null;

    const close = () => this.close();
    this.closeBtn.addEventListener('click', close);
    this.backdrop.addEventListener('click', close);
    this.backBtn.addEventListener('click', close);
    this.backTopBtn.addEventListener('click', close);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) close();
    });
  }

  open(project, sourceRefs = null) {
    if (this.isOpen) return;
    this.isOpen = true;
    this.sourceRefs = sourceRefs;
    document.body.classList.add('detail-open');
    document.documentElement.classList.add('detail-open');
    getLenis()?.stop();

    this.populate(project);
    this.el.style.setProperty('--active-accent-color', project.color || '#a855f7');
    this.el.style.setProperty('--active-accent-color-rgb', project.colorRgb || '168, 85, 247');
    this.el.style.setProperty('--active-accent-glow', project.glow || 'rgba(168, 85, 247, 0.45)');

    gsap.set(this.el, { display: 'flex', opacity: 1, pointerEvents: 'auto' });
    gsap.set(this.backdrop, { opacity: 0 });
    gsap.set(this.stageEl, { opacity: 0, scale: 0.85 });
    gsap.set(this.headingEl, { opacity: 0, y: 16 });
    gsap.set(this.panelEl, { opacity: 0, x: 70, scale: 0.97 });
    this.setPanelChildrenHidden();

    const tl = gsap.timeline();
    this.openTl = tl;

    const src = this.sourceRefs;
    if (src) {
      const fadeAway = [src.frame, src.header, src.leftPanel, src.rightPanel].filter(Boolean);
      tl.to(fadeAway, {
        scale: 0.92,
        opacity: 0,
        y: -30,
        filter: 'blur(8px)',
        duration: 1,
        ease: EXIT_EASE,
      });
      if (src.pedestal) {
        tl.to(src.pedestal, { opacity: 0, duration: 0.6, ease: EXIT_EASE }, '<');
      }
    }

    tl.to(this.backdrop, { opacity: 1, duration: 0.6, ease: 'power2.out' }, src ? '-=0.5' : 0);
    tl.to(this.stageEl, { opacity: 1, scale: 1, duration: 0.9, ease: 'expo.out' }, src ? '-=0.35' : 0.1);
    tl.to(this.headingEl, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.5');
    tl.to(this.panelEl, { opacity: 1, x: 0, scale: 1, duration: 0.7, ease: 'power3.out' }, '-=0.4');
    tl.add(() => this.revealPanelContent(), '-=0.3');
  }

  populate(project) {
    const idx = project.__index ?? 0;
    this.numberEl.textContent = String(idx + 1).padStart(2, '0');
    this.categoryEl.textContent = project.category || '';
    this.titleEl.textContent = project.title || '';
    this.subtitleEl.textContent = project.subtitle || '';
    this.overviewEl.textContent = project.overview || project.aboutDesc || '';

    const features = project.features || [];
    this.builtListEl.innerHTML = '';
    features.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'detail-built-item';
      li.innerHTML = `<span class="detail-check">✓</span><span>${item}</span>`;
      this.builtListEl.appendChild(li);
    });
    this.featuresBlock.style.display = features.length ? '' : 'none';

    const tech = project.detailTechStack || (project.techStack || []).map((t) => t.name || t);
    this.techChipsEl.innerHTML = '';
    tech.forEach((t) => {
      const chip = document.createElement('span');
      chip.className = 'detail-tech-chip';
      chip.textContent = t;
      this.techChipsEl.appendChild(chip);
    });
    this.techBlock.style.display = tech.length ? '' : 'none';

    const hasLive = project.demo && project.demo !== '#';
    const hasCode = project.github && project.github !== '#';
    this.liveBtn.style.display = hasLive ? '' : 'none';
    this.codeBtn.style.display = hasCode ? '' : 'none';
    this.actionsEl.style.display = hasLive || hasCode ? '' : 'none';
    if (hasLive) this.liveBtn.href = project.demo;
    if (hasCode) this.codeBtn.href = project.github;
  }

  setPanelChildrenHidden() {
    const items = [
      this.el.querySelector('.detail-eyebrow'),
      this.titleEl,
      this.subtitleEl,
      this.overviewBlock,
      this.featuresBlock,
      this.techBlock,
      this.actionsEl,
    ].filter(Boolean);
    gsap.set(items, { opacity: 0, y: 10 });
  }

  revealPanelContent() {
    const items = [
      this.el.querySelector('.detail-eyebrow'),
      this.titleEl,
      this.subtitleEl,
      this.overviewBlock,
      this.featuresBlock,
      this.techBlock,
      this.actionsEl,
    ].filter((el) => el && el.style.display !== 'none');

    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.07,
      ease: 'power2.out',
    });

    gsap.from(this.builtListEl.children, {
      opacity: 0,
      x: -12,
      duration: 0.35,
      stagger: 0.05,
      ease: 'power2.out',
      delay: 0.15,
    });

    gsap.from(this.techChipsEl.children, {
      opacity: 0,
      y: 6,
      duration: 0.3,
      stagger: 0.03,
      ease: 'power2.out',
      delay: 0.25,
    });
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.openTl?.kill();
    document.body.classList.remove('detail-open');
    document.documentElement.classList.remove('detail-open');

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(this.el, { display: 'none' });
        getLenis()?.start();
      },
    });

    tl.to(this.panelEl, { opacity: 0, x: 70, scale: 0.97, duration: 0.4, ease: 'power2.in' });
    tl.to(this.headingEl, { opacity: 0, y: 16, duration: 0.35, ease: 'power2.in' }, '<');
    tl.to(this.stageEl, { opacity: 0, scale: 0.85, duration: 0.5, ease: 'power2.in' }, '<0.05');
    tl.to(this.backdrop, { opacity: 0, duration: 0.5, ease: 'power2.in' }, '<');

    const src = this.sourceRefs;
    if (src) {
      const restore = [src.frame, src.header, src.leftPanel, src.rightPanel].filter(Boolean);
      tl.to(restore, {
        scale: 1,
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.9,
        ease: EXIT_EASE,
      }, '-=0.2');
      if (src.pedestal) {
        tl.to(src.pedestal, { opacity: 1, duration: 0.7, ease: EXIT_EASE }, '<');
      }
    }
  }
}
