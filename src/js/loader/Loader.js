import { gsap } from '../core/GsapSetup.js';
import { preloadAssets } from '../utils/loadAssets.js';
import { PROFILE } from '../config/data.js';

export class Loader {
  constructor({ onComplete }) {
    this.onComplete = onComplete;
    this.el = document.querySelector('.loader');
    this.curtain = document.querySelector('.loader-curtain');
    this.nameEl = this.el.querySelector('.loader-name');
    this.roleEl = this.el.querySelector('.loader-role');
    this.progressBar = this.el.querySelector('.loader-progress-bar');
    this.percentEl = this.el.querySelector('.loader-percent');

    this.buildName();
    this.run();
  }

  buildName() {
    const chars = PROFILE.name.toUpperCase().replace(' ', ' ').split('');
    this.nameEl.innerHTML = chars
      .map((c) => `<span class="char">${c === ' ' ? '&nbsp;' : c}</span>`)
      .join('');
  }

  async run() {
    const tl = gsap.timeline();

    tl.to(this.el.querySelectorAll('.char'), {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.04,
      ease: 'power4.out',
    }).to(this.roleEl, { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3');

    await preloadAssets([], (percent) => {
      gsap.to(this.progressBar, { width: `${percent}%`, duration: 0.3, ease: 'power1.out' });
      this.percentEl.textContent = `${percent}%`;
    });

    await gsap
      .timeline()
      .to(this.progressBar, { width: '100%', duration: 0.4 })
      .to({}, { duration: 0.3 });

    this.exit();
  }

  exit() {
    const tl = gsap.timeline();

    tl.to(this.el.querySelectorAll('.char'), {
      y: '-110%',
      opacity: 0,
      duration: 0.5,
      stagger: 0.02,
      ease: 'power3.in',
    })
      .to(this.roleEl, { opacity: 0, duration: 0.3 }, '<')
      .to(
        [this.el.querySelector('.loader-progress'), this.percentEl],
        { opacity: 0, duration: 0.3 },
        '<'
      )
      .set(this.curtain, { transformOrigin: 'bottom' })
      .to(this.curtain, { scaleY: 1, duration: 0.5, ease: 'power4.in' })
      .set(this.el, { autoAlpha: 0 })
      .call(() => {
        // The curtain is now fully opaque, hiding everything. Build the
        // rest of the page NOW — while it's still hidden — so every
        // section's entrance animation (which snaps to its hidden "from"
        // state the instant it's constructed) is already in that hidden
        // state before the curtain lifts. Building it only after the
        // curtain fully clears (the old behavior) let the page flash in
        // fully visible for a frame, then instantly reset and re-fade —
        // reading as "the page rendering twice".
        this.el.remove();
        this.onComplete?.();
      })
      .set(this.curtain, { transformOrigin: 'top' })
      .to(this.curtain, {
        scaleY: 0,
        duration: 0.7,
        ease: 'power4.inOut',
        onComplete: () => this.curtain.remove(),
      });
  }
}
