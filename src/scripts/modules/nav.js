// Sticky header state, current-section highlighting and the mobile menu.
import { onScroll, lockScroll, unlockScroll } from './scroll.js';

export function initNav() {
  const nav = document.querySelector('[data-nav]');
  if (!nav) return;

  onScroll((y) => nav.classList.toggle('is-scrolled', y > 24));

  // Highlight the link for the section in view.
  const links = [...nav.querySelectorAll('[data-nav-link]')];
  const byId = new Map(links.map((l) => [l.getAttribute('href').slice(1), l]));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((l) => { l.classList.remove('is-current'); l.removeAttribute('aria-current'); });
      const link = byId.get(en.target.id);
      if (link && en.target.id !== 'top') { link.classList.add('is-current'); link.setAttribute('aria-current', 'true'); }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  byId.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });

  // Mobile menu
  const toggle = nav.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  if (!toggle || !menu) return;
  const label = toggle.querySelector('.sr-only');

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    label.textContent = open ? 'Close menu' : 'Open menu';
    nav.classList.toggle('menu-open', open);
    if (open) {
      menu.hidden = false;
      requestAnimationFrame(() => menu.classList.add('is-open'));
      lockScroll();
      menu.querySelector('a')?.focus({ preventScroll: true });
    } else {
      menu.classList.remove('is-open');
      menu.hidden = true;
      unlockScroll();
    }
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) { setOpen(false); toggle.focus(); }
  });
  // Keep focus inside the open menu (menu + toggle).
  document.addEventListener('focusin', (e) => {
    if (menu.hidden || menu.contains(e.target) || toggle.contains(e.target)) return;
    menu.querySelector('a')?.focus();
  });
  window.matchMedia('(min-width: 961px)').addEventListener('change', (m) => { if (m.matches) setOpen(false); });
}
