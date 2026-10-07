// Scroll-linked effects, computed in the shared frame loop and only for
// elements currently near the viewport.
import { motionOK, viewProgress, clamp } from './env.js';
import { onFrame } from './ticker.js';

export function initScrollFx() {
  initScreenshotScroll();
  if (!motionOK()) return;

  const words = document.querySelector('[data-scrub-words]');
  const wordEls = words ? [...words.querySelectorAll('.w')] : [];
  const steps = document.querySelector('[data-process]');
  const stepEls = steps ? [...steps.querySelectorAll('[data-step]')] : [];
  const cineLines = [...document.querySelectorAll('[data-parallax]')];
  const cine = document.querySelector('[data-cine]');

  // Track which of these are near the viewport so off-screen work is skipped.
  const visible = new Set();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => (en.isIntersecting ? visible.add(en.target) : visible.delete(en.target)));
  }, { rootMargin: '20% 0px' });
  [words, steps, cine].filter(Boolean).forEach((el) => io.observe(el));

  if (words) words.classList.add('is-scrubbing');
  if (steps) steps.classList.add('is-tracking');

  let lastY = -1;
  let lastW = 0;
  onFrame(() => {
    const y = window.scrollY;
    if (y === lastY && innerWidth === lastW) return;
    lastY = y; lastW = innerWidth;

    // Statement brightens word by word.
    if (words && visible.has(words)) {
      const p = viewProgress(words, 0.85, 0.35);
      const lit = Math.round(p * wordEls.length);
      wordEls.forEach((w, i) => w.classList.toggle('is-lit', i < lit));
    }

    // Process rail fills toward the viewport's center line.
    if (steps && visible.has(steps)) {
      const r = steps.getBoundingClientRect();
      const mid = innerHeight * 0.55;
      const p = clamp((mid - r.top) / r.height);
      steps.style.setProperty('--progress', p.toFixed(4));
      stepEls.forEach((s) => {
        const sr = s.getBoundingClientRect();
        s.classList.toggle('is-active', sr.top + 30 < mid);
      });
    }

    // Cinematic lines drift at different speeds.
    if (cine && visible.has(cine)) {
      const r = cine.getBoundingClientRect();
      const p = clamp((r.top + r.height / 2 - innerHeight / 2) / innerHeight, -1, 1);
      cineLines.forEach((l) => l.style.setProperty('--py', `${(p * parseFloat(l.dataset.parallax)).toFixed(1)}px`));
    }

  });
}

// On hover, screenshots scroll through the full page inside their frame.
// Measures how far each one can travel.
function initScreenshotScroll() {
  const pairs = [...document.querySelectorAll('.browser__view, .phone__screen')]
    .map((view) => ({ view, inner: view.querySelector('.browser__scroll, .phone__scroll') }))
    .filter((p) => p.inner);

  const measure = () => pairs.forEach(({ view, inner }) => {
    const dist = Math.min(0, view.clientHeight - inner.offsetHeight);
    inner.style.setProperty('--scroll-dist', `${dist}px`);
    // Speed scales with distance so long pages don't race.
    inner.style.transitionDuration = `${Math.max(2.5, Math.abs(dist) / 260).toFixed(2)}s`;
  });
  measure();
  pairs.forEach(({ inner }) => inner.querySelector('img')?.addEventListener('load', measure));
  let t;
  window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(measure, 150); });
  window.addEventListener('load', measure);
}
