import { gsap } from '../core/GsapSetup.js';
import { PROJECTS } from '../config/data.js';

export class Projects {
  constructor() {
    this.section = document.querySelector('#projects');
    if (!this.section) return;

    this.track = this.section.querySelector('#projects-track-3d');
    this.dotsContainer = this.section.querySelector('#projects-nav-dots');
    
    this.currentIndex = 0;
    this.cards = [];
    this.dots = [];

    this.initProjects();
    this.updateSlider();
  }

  initProjects() {
    if (!this.track) return;

    PROJECTS.forEach((proj, idx) => {
      // Create slide card
      const card = document.createElement('div');
      card.className = 'project-card-3d';
      
      // 1. Browser Mockup Frame
      const mockFrame = document.createElement('div');
      mockFrame.className = `project-mockup-frame ${proj.imageClass || ''}`;
      
      const mockHeader = document.createElement('div');
      mockHeader.className = 'mock-browser-header';
      const mockDots = document.createElement('div');
      mockDots.className = 'mock-browser-dots';
      const d1 = document.createElement('span'); d1.className = 'mock-dot red';
      const d2 = document.createElement('span'); d2.className = 'mock-dot yellow';
      const d3 = document.createElement('span'); d3.className = 'mock-dot green';
      mockDots.appendChild(d1); mockDots.appendChild(d2); mockDots.appendChild(d3);
      
      const mockAddress = document.createElement('div');
      mockAddress.className = 'mock-browser-address';
      mockAddress.textContent = `${proj.title.toLowerCase().replace(/[^a-z0-9]/g, '')}.io`;
      
      mockHeader.appendChild(mockDots);
      mockHeader.appendChild(mockAddress);
      mockFrame.appendChild(mockHeader);

      // Create unique mockup screen content based on class
      const mockContent = document.createElement('div');
      mockContent.className = 'mock-browser-content';
      if (proj.imageClass === 'project-gift') {
        mockContent.innerHTML = `
          <div class="mock-ui-gift">
            <div class="mock-gift-hero">🎁 Personalized Suggestions</div>
            <div class="mock-gift-grid">
              <div class="mock-gift-item active">✨ AI Curated</div>
              <div class="mock-gift-item">Tech Geek</div>
              <div class="mock-gift-item">Creative Art</div>
            </div>
            <div class="mock-gift-bubble">"Finding the perfect gift using Gemini AI..."</div>
          </div>
        `;
      } else if (proj.imageClass === 'project-shopinity') {
        mockContent.innerHTML = `
          <div class="mock-ui-shop">
            <div class="mock-shop-nav">🛒 SHOPINITY</div>
            <div class="mock-shop-grid">
              <div class="mock-shop-card"></div>
              <div class="mock-shop-card"></div>
              <div class="mock-shop-card"></div>
              <div class="mock-shop-card"></div>
            </div>
          </div>
        `;
      } else if (proj.imageClass === 'project-caption') {
        mockContent.innerHTML = `
          <div class="mock-ui-caption">
            <div class="mock-cap-img-placeholder">🌅 Upload Image</div>
            <div class="mock-cap-bar">💬 "A beautiful sunset over the mountains"</div>
          </div>
        `;
      }
      mockFrame.appendChild(mockContent);
      card.appendChild(mockFrame);

      // 2. Project Details Overlay Card
      const detailsCard = document.createElement('div');
      detailsCard.className = 'project-details-overlay glass';

      const header = document.createElement('div');
      header.className = 'project-card-header';
      const category = document.createElement('span');
      category.className = 'project-category';
      category.textContent = proj.category;
      const emojiBox = document.createElement('div');
      emojiBox.className = 'project-emoji-box';
      emojiBox.textContent = proj.emoji || '💻';
      header.appendChild(category);
      header.appendChild(emojiBox);
      detailsCard.appendChild(header);

      const title = document.createElement('h3');
      title.textContent = proj.title;
      detailsCard.appendChild(title);

      const desc = document.createElement('p');
      desc.className = 'project-description';
      desc.textContent = proj.description;
      detailsCard.appendChild(desc);

      const stackWrap = document.createElement('div');
      stackWrap.className = 'project-stack-wrap';
      proj.stack.forEach((tech) => {
        const pill = document.createElement('span');
        pill.className = 'project-stack-pill';
        pill.textContent = tech;
        stackWrap.appendChild(pill);
      });
      detailsCard.appendChild(stackWrap);

      const btn = document.createElement('a');
      btn.className = 'project-action-btn';
      btn.href = proj.demo;
      btn.textContent = 'VIEW PROJECT';
      detailsCard.appendChild(btn);
      
      card.appendChild(detailsCard);
      this.track.appendChild(card);
      this.cards.push(card);

      // Click card to go to it
      card.addEventListener('click', () => {
        if (idx !== this.currentIndex) {
          this.currentIndex = idx;
          this.updateSlider();
        }
      });

      // Create nav dot
      const dot = document.createElement('div');
      dot.className = 'project-dot';
      this.dotsContainer.appendChild(dot);
      this.dots.push(dot);

      dot.addEventListener('click', () => {
        this.currentIndex = idx;
        this.updateSlider();
      });
    });

    this.bindTilt();
  }

  updateSlider() {
    this.cards.forEach((card, idx) => {
      card.className = 'project-card-3d'; // Reset classes
      
      if (idx === this.currentIndex) {
        card.classList.add('active');
      } else if (idx === this.currentIndex - 1) {
        card.classList.add('prev');
      } else if (idx === this.currentIndex + 1) {
        card.classList.add('next');
      } else {
        card.classList.add('hidden');
      }
    });

    this.dots.forEach((dot, idx) => {
      if (idx === this.currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  bindTilt() {
    this.cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        if (!card.classList.contains('active')) return;

        const rect = card.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(card, {
          rotateY: relX * 16,
          rotateX: -relY * 16,
          translateZ: 100, // keep the 3D depth pop active
          duration: 0.4,
          ease: 'power2.out',
          transformPerspective: 800
        });
      });

      card.addEventListener('mouseleave', () => {
        if (!card.classList.contains('active')) return;
        
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          translateZ: 100,
          duration: 0.6,
          ease: 'power2.out'
        });
      });
    });
  }
}
