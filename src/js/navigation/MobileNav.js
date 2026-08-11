export function initMobileNav() {
  const toggle = document.querySelector('.mobile-nav-toggle');
  const overlay = document.querySelector('.mobile-nav-overlay');
  if (!toggle || !overlay) return;

  const links = overlay.querySelectorAll('.mobile-nav-link, .mobile-nav-cta');

  const close = () => {
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('mobile-nav-open');
  };

  const open = () => {
    toggle.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('mobile-nav-open');
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.classList.contains('is-open');
    if (isOpen) close();
    else open();
  });

  links.forEach((link) => link.addEventListener('click', close));

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) close();
  });
}
