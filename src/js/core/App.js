import { initGsap } from './GsapSetup.js';
import { initLenis } from './LenisSetup.js';
import { Loader } from '../loader/Loader.js';
import { CustomCursor } from '../cursor/CustomCursor.js';
import { ParticleField } from '../background/ParticleField.js';
import { Hero } from '../sections/Hero.js';
import { About } from '../sections/About.js';
import { SkillsGalaxy } from '../sections/SkillsGalaxy.js';
import { Experience } from '../sections/Experience.js';
import { Projects } from '../sections/Projects.js';
import { TechWall } from '../sections/TechWall.js';
import { Achievements } from '../sections/Achievements.js';
import { Contact } from '../sections/Contact.js';
import { MobilePreview } from '../sections/MobilePreview.js';
import { Footer } from '../sections/Footer.js';
import { initScrollProgress } from '../animations/scrollProgress.js';
import { initSidebarIndicator } from '../animations/sidebarIndicator.js';

export class App {
  init() {
    initGsap();

    new Loader({
      onComplete: () => this.onLoaded(),
    });
  }

  onLoaded() {
    document.body.classList.remove('is-loading');

    initLenis();
    new CustomCursor();

    const bgCanvas = document.querySelector('#bg-particles');
    if (bgCanvas) {
      new ParticleField(bgCanvas, { count: 90, color: '148, 163, 184', maxSpeed: 0.12 });
    }

    new Hero();
    new About();
    new SkillsGalaxy();
    new Experience();
    new Projects();
    new TechWall();
    new Achievements();
    new Contact();
    new MobilePreview();
    new Footer();
    initScrollProgress();
    initSidebarIndicator();
  }
}
