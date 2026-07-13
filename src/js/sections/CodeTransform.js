import { gsap, ScrollTrigger } from '../core/GsapSetup.js';

export class CodeTransform {
  constructor() {
    this.section = document.querySelector('#code-transform');
    if (!this.section) return;

    this.block = this.section.querySelector('.code-block');
    this.lines = Array.from(this.section.querySelectorAll('.code-line'));

    this.build();
  }

  build() {
    gsap.timeline({
      scrollTrigger: {
        trigger: this.section,
        start: 'top 70%',
        end: 'top top',
        scrub: 1,
      },
    })
      .to(this.block, { opacity: 1, duration: 1 })
      .to(this.lines, { opacity: 1, y: 0, stagger: 0.15, duration: 1 }, '<');

    gsap.to(this.block, {
      yPercent: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: this.section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }
}
