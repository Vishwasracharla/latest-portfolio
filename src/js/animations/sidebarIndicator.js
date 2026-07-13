import { gsap, ScrollTrigger } from '../core/GsapSetup.js';
import { getLenis } from '../core/LenisSetup.js';

export function initSidebarIndicator() {
  const sidebar = document.querySelector('.sidebar-indicator');
  if (!sidebar) return;

  const numbers = sidebar.querySelectorAll('.indicator-number');
  const progress = sidebar.querySelector('.indicator-progress');
  const app = document.querySelector('#app');

  // 1. Click handler for indicators
  numbers.forEach((num) => {
    num.addEventListener('click', () => {
      const targetSelector = num.getAttribute('data-section');
      const targetSection = document.querySelector(targetSelector);
      if (!targetSection) return;

      const lenis = getLenis();

      // Trigger 3D spin on the clicked indicator number
      gsap.fromTo(num, 
        { rotationY: 0, scale: 1.2 }, 
        { rotationY: 360, scale: 1.2, duration: 0.8, ease: 'power2.out', clearProps: 'rotationY' }
      );

      // Squeeze, tilt, and skew warp animation on the #app wrapper
      // This creates the cinematic high-speed motion warp effect
      const scrollDuration = 1.6; // duration of scroll in seconds

      gsap.timeline()
        .to(app, {
          scale: 0.94,
          rotation: -1.5,
          skewX: -1.5,
          filter: 'blur(3px)',
          transformOrigin: 'center center',
          duration: 0.5,
          ease: 'power2.out',
        })
        .to(app, {
          scale: 1,
          rotation: 0,
          skewX: 0,
          filter: 'blur(0px)',
          duration: 1.1,
          ease: 'elastic.out(1, 0.6)',
          delay: 0.3,
          clearProps: 'transform,filter',
        });

      // Smooth scroll using Lenis
      if (lenis) {
        lenis.scrollTo(targetSection, {
          duration: scrollDuration,
          easing: (t) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2, // custom EaseInOutQuart
        });
      } else {
        // Fallback if lenis is not active
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 2. Active Section and Track Progress Tracking
  // Track scroll updates using ScrollTrigger
  const sections = Array.from(numbers).map(num => document.querySelector(num.getAttribute('data-section'))).filter(Boolean);

  sections.forEach((section, index) => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top 50%',
      end: 'bottom 50%',
      onToggle: (self) => {
        if (self.isActive) {
          // Remove active from all and add to current
          numbers.forEach(n => n.classList.remove('active'));
          numbers[index].classList.add('active');
        }
      }
    });
  });

  // Update indicator vertical progress bar based on page scroll
  ScrollTrigger.create({
    trigger: document.documentElement,
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate: (self) => {
      // Progress is from 0 to 1
      const progressVal = self.progress;
      // Since the indicator bar has height 20%, top can move from 0% to 80%
      const topVal = progressVal * 80;
      gsap.set(progress, { top: `${topVal}%` });
    }
  });
}
