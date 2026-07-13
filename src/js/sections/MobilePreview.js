import { gsap } from '../core/GsapSetup.js';

export class MobilePreview {
  constructor() {
    this.section = document.querySelector('#mobile-preview');
    if (!this.section) return;

    this.phones = this.section.querySelectorAll('.phone-frame');
    this.initTilts();
  }

  initTilts() {
    this.phones.forEach((phone) => {
      phone.addEventListener('mousemove', (e) => {
        const rect = phone.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(phone, {
          rotateY: relX * 20,
          rotateX: -relY * 20,
          translateZ: 15,
          duration: 0.4,
          ease: 'power2.out',
          transformPerspective: 600
        });
      });

      phone.addEventListener('mouseleave', () => {
        gsap.to(phone, {
          rotateX: 0,
          rotateY: 0,
          translateZ: 0,
          duration: 0.6,
          ease: 'power2.out'
        });
      });
    });
  }
}
