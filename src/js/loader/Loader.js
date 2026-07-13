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
    const tl = gsap.timeline({
      onComplete: () => {
        this.el.remove();
        this.curtain.remove();
        this.onComplete?.();
      },
    });

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
      .set(this.curtain, { transformOrigin: 'top' })
      .to(this.curtain, { scaleY: 0, duration: 0.7, ease: 'power4.inOut' });
  }
}
