import { gsap } from '../core/GsapSetup.js';
import { ScrollTrigger } from '../core/GsapSetup.js';

export class Footer {
  constructor() {
    this.footer = document.querySelector('.footer');
    if (!this.footer) return;

    gsap.from(this.footer.children, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.1,
      scrollTrigger: { trigger: this.footer, start: 'top 90%' },
    });
  }
}
