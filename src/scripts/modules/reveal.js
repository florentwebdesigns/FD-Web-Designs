// Adds .is-in to elements as they enter the viewport (once).
const SELECTOR = '[data-reveal], [data-split], [data-mask], .pillar';

export function initReveal() {
  const els = document.querySelectorAll(SELECTOR);
  if (!('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('is-in')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  els.forEach((el) => io.observe(el));
}
