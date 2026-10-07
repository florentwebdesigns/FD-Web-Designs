// Counts stat numbers up from zero when they enter the viewport.
import { motionOK } from './env.js';

export function initCounters() {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length || !motionOK()) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      io.unobserve(en.target);
      run(en.target);
    });
  }, { threshold: 0.6 });
  els.forEach((el) => { el.textContent = '0'; io.observe(el); });
}

function run(el) {
  const end = Number(el.dataset.count);
  const dur = 1800;
  const t0 = performance.now();
  const tick = (now) => {
    const p = Math.min(1, (now - t0) / dur);
    const eased = 1 - Math.pow(1 - p, 4);
    el.textContent = Math.round(end * eased).toString();
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
