// Testimonial carousel: autoplay (paused on hover/focus, off for reduced
// motion), previous/next buttons, arrow keys.
import { motionOK } from './env.js';

export function initTestimonials() {
  const root = document.querySelector('[data-testimonials]');
  if (!root) return;
  const slides = [...root.querySelectorAll('[data-slide]')];
  const current = root.querySelector('[data-t-current]');
  const bar = root.querySelector('[data-t-progress]');
  if (slides.length < 2) return;
  let index = 0;

  const show = (i) => {
    index = (i + slides.length) % slides.length;
    slides.forEach((s, n) => {
      const active = n === index;
      s.classList.toggle('is-active', active);
      s.toggleAttribute('inert', !active);
      s.setAttribute('aria-hidden', String(!active));
    });
    if (current) current.textContent = String(index + 1).padStart(2, '0');
    if (bar && motionOK()) {
      bar.classList.remove('is-running');
      void bar.offsetWidth; // restart the progress animation
      bar.classList.add('is-running');
    }
  };

  root.querySelector('[data-t-prev]')?.addEventListener('click', () => show(index - 1));
  root.querySelector('[data-t-next]')?.addEventListener('click', () => show(index + 1));
  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });

  // Autoplay advances when the progress bar finishes; it only runs in view.
  if (bar && motionOK()) {
    bar.addEventListener('animationend', () => show(index + 1));
    new IntersectionObserver(([en]) => {
      bar.style.animationPlayState = en.isIntersecting ? '' : 'paused';
    }).observe(root);
  }
  show(0);
}
