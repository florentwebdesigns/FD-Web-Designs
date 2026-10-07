// First-load sequence: a brief curtain with the mark, then the hero
// entrance. Skipped entirely for reduced motion.
import { motionOK } from './env.js';

export function initIntro() {
  const root = document.documentElement;
  if (!motionOK()) { root.classList.add('is-loaded'); return; }

  const mark = document.querySelector('.logo-mark')?.cloneNode(true);
  const curtain = document.createElement('div');
  curtain.className = 'curtain';
  curtain.setAttribute('aria-hidden', 'true');
  if (mark) curtain.append(mark);
  document.body.append(curtain);

  const fonts = document.fonts?.ready ?? Promise.resolve();
  const minDelay = new Promise((r) => setTimeout(r, 650));
  const maxDelay = new Promise((r) => setTimeout(r, 1600));
  Promise.race([Promise.all([fonts, minDelay]), maxDelay]).then(() => {
    curtain.classList.add('is-done');
    setTimeout(() => root.classList.add('is-loaded'), 180);
    curtain.addEventListener('transitionend', () => curtain.remove(), { once: true });
    setTimeout(() => curtain.remove(), 1500);
  });
}
