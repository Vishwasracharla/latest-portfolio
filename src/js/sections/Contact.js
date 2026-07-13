import { gsap } from '../core/GsapSetup.js';
import { randomRange } from '../utils/math.js';

export class Contact {
  constructor() {
    this.section = document.querySelector('#contact');
    if (!this.section) return;

    this.form = this.section.querySelector('#contact-form-el');
    this.rocket = this.section.querySelector('#rocket-element');
    this.submitBtn = this.section.querySelector('#rocket-submit-btn');

    this.bindEvents();
  }

  bindEvents() {
    if (!this.form) return;

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic validation
      const fields = this.form.querySelectorAll('.contact-field');
      let isValid = true;
      fields.forEach((f) => {
        if (!f.value.trim()) {
          isValid = false;
          f.style.borderColor = '#ff5f56';
        } else {
          f.style.borderColor = 'rgba(168, 85, 247, 0.2)';
        }
      });

      if (isValid) {
        this.launchRocket();
      }
    });
  }

  launchRocket() {
    if (!this.rocket || !this.submitBtn) return;

    // Trigger flame flicker
    this.rocket.classList.add('launching');

    const btnText = this.submitBtn.querySelector('.btn-text');
    const originalText = btnText ? btnText.textContent : 'LAUNCH MESSAGE';
    if (btnText) btnText.textContent = 'TRANSMITTING...';

    // Particle spawning interval representing exhaust smoke
    const smokeInterval = setInterval(() => {
      this.spawnSmokeParticle();
    }, 40);

    // Launch rocket timeline
    const tl = gsap.timeline({
      onComplete: () => {
        clearInterval(smokeInterval);
        this.rocket.classList.remove('launching');
        this.form.reset();
        if (btnText) btnText.textContent = 'MESSAGE SHIPPED! 🚀';

        // Return rocket back down from top out of bounds
        gsap.set(this.rocket, { y: 300, opacity: 0 });
        gsap.to(this.rocket, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          delay: 1.5,
          onComplete: () => {
            if (btnText) btnText.textContent = originalText;
          }
        });
      }
    });

    // Subtly shake rocket first, then shoot upward
    tl.to(this.rocket, { x: randomRange(-3, 3), duration: 0.05, repeat: 10, yoyo: true })
      .to(this.rocket, {
        y: -600,
        scale: 0.6,
        opacity: 0,
        duration: 1.5,
        ease: 'power4.in'
      });
  }

  spawnSmokeParticle() {
    if (!this.rocket) return;

    // Get rocket tail coordinates
    const rect = this.rocket.getBoundingClientRect();
    const rocketZone = this.section.querySelector('.contact-rocket-zone');
    if (!rocketZone) return;
    const zoneRect = rocketZone.getBoundingClientRect();

    const tailX = rect.left - zoneRect.left + rect.width / 2;
    const tailY = rect.bottom - zoneRect.top - 20;

    const particle = document.createElement('div');
    particle.className = 'contact-smoke-particle';
    particle.style.left = `${tailX}px`;
    particle.style.top = `${tailY}px`;
    rocketZone.appendChild(particle);

    const size = randomRange(15, 30);
    const floatX = randomRange(-40, 40);
    const floatY = randomRange(50, 100);

    gsap.set(particle, { width: size, height: size, xPercent: -50, yPercent: -50 });
    gsap.to(particle, {
      x: `+=${floatX}`,
      y: `+=${floatY}`,
      scale: 1.6,
      opacity: 0,
      duration: randomRange(0.8, 1.2),
      ease: 'power1.out',
      onComplete: () => particle.remove()
    });
  }
}
