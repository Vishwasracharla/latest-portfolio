import { gsap, ScrollTrigger } from '../core/GsapSetup.js';
import { TERMINAL_DATA } from '../config/data.js';

export class About {
  constructor() {
    this.section = document.querySelector('#about');
    if (!this.section) return;

    this.terminal = this.section.querySelector('#about-terminal');
    this.hasTyped = false;

    this.initScroll();
    this.initStatsHover();
  }

  initScroll() {
    ScrollTrigger.create({
      trigger: this.section,
      start: 'top 70%',
      once: true,
      onEnter: () => this.typeTerminal()
    });
  }

  async typeTerminal() {
    if (this.hasTyped || !this.terminal) return;
    this.hasTyped = true;

    // Type main command
    await this.typeLine('> initializing_developer_profile.exe', 'terminal-cmd');
    await this.wait(400);

    // Type fields
    for (const field of TERMINAL_DATA) {
      const line = document.createElement('div');
      line.className = 'terminal-line';

      const label = document.createElement('span');
      label.className = 'terminal-label';
      label.textContent = field.label + ':';
      line.appendChild(label);

      const value = document.createElement('span');
      value.className = 'terminal-value';
      if (field.status) value.className += ' terminal-status-online';
      line.appendChild(value);
      this.terminal.appendChild(line);

      await this.typeInto(value, field.value);
      await this.wait(150);
    }

    // Type footer command
    await this.typeLine('> ready_to_build_impact.exe _', 'terminal-cmd');
  }

  typeLine(text, className) {
    return new Promise((resolve) => {
      const line = document.createElement('div');
      line.className = `terminal-line ${className || ''}`;
      this.terminal.appendChild(line);

      let i = 0;
      const type = () => {
        if (i < text.length) {
          line.textContent += text[i];
          i++;
          setTimeout(type, 30 + Math.random() * 20);
        } else {
          resolve();
        }
      };
      type();
    });
  }

  typeInto(el, text) {
    return new Promise((resolve) => {
      let i = 0;
      const type = () => {
        if (i < text.length) {
          el.textContent += text[i];
          i++;
          setTimeout(type, 20 + Math.random() * 20);
        } else {
          resolve();
        }
      };
      type();
    });
  }

  initStatsHover() {
    const cards = this.section.querySelectorAll('.stat-card');
    cards.forEach((card) => {
      const valEl = card.querySelector('.stat-value');
      const originalText = valEl.textContent;
      const numericVal = parseFloat(originalText);
      const suffix = originalText.replace(/[0-9.]/g, '');

      card.addEventListener('mouseenter', () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: numericVal,
          duration: 1.2,
          ease: 'power2.out',
          onUpdate: () => {
            valEl.textContent = Math.floor(obj.val) + suffix;
          }
        });
      });

      card.addEventListener('mouseleave', () => {
        valEl.textContent = originalText;
      });
    });
  }

  wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
