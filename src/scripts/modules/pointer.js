// Pointer-driven effects: the ambient glow, hero fragment parallax and the
// "View" cursor over portfolio items. Fine pointers only.
import { finePointer, motionOK, lerp } from './env.js';
import { onFrame } from './ticker.js';

export function initPointer() {
  if (!finePointer.matches || !motionOK()) return;
  const root = document.documentElement;
  const glow = document.querySelector('[data-glow]');
  const cursor = document.querySelector('[data-cursor-el]');
  const cursorLabel = cursor?.querySelector('[data-cursor-label]');
  const frags = [...document.querySelectorAll('.frag[data-depth]')];
  const hero = document.querySelector('[data-hero]');

  const target = { x: innerWidth / 2, y: innerHeight / 3 };
  const glowPos = { ...target };
  const curPos = { ...target };
  let moved = false;

  window.addEventListener('pointermove', (e) => {
    target.x = e.clientX; target.y = e.clientY;
    if (!moved) { moved = true; root.classList.add('has-pointer'); Object.assign(curPos, target); }
  }, { passive: true });

  // Cursor label over [data-cursor] elements.
  document.addEventListener('pointerover', (e) => {
    const el = e.target.closest('[data-cursor]');
    if (!cursor) return;
    if (el) { cursorLabel.textContent = el.dataset.cursor; cursor.classList.add('is-active'); }
    else cursor.classList.remove('is-active');
  });

  onFrame(() => {
    glowPos.x = lerp(glowPos.x, target.x, 0.08);
    glowPos.y = lerp(glowPos.y, target.y, 0.08);
    curPos.x = lerp(curPos.x, target.x, 0.22);
    curPos.y = lerp(curPos.y, target.y, 0.22);
    if (glow) glow.style.transform = `translate3d(${glowPos.x}px, ${glowPos.y}px, 0)`;
    if (cursor) cursor.style.transform = `translate3d(${curPos.x}px, ${curPos.y}px, 0)`;
  });

  // Fragment parallax, only while the hero is on screen.
  if (hero && frags.length) {
    let raf = 0;
    hero.addEventListener('pointermove', (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const nx = e.clientX / innerWidth - 0.5;
        const ny = e.clientY / innerHeight - 0.5;
        frags.forEach((f) => {
          const d = parseFloat(f.dataset.depth) || 1;
          f.style.setProperty('--mx', `${(-nx * 26 * d).toFixed(1)}px`);
          f.style.setProperty('--my', `${(-ny * 20 * d).toFixed(1)}px`);
        });
      });
    });
  }
}

// Magnetic buttons: the button drifts toward the pointer while hovered.
export function initMagnetic() {
  if (!finePointer.matches || !motionOK()) return;
  document.querySelectorAll('[data-magnetic]').forEach((el) => {
    const strength = 0.22;
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate3d(${x * strength}px, ${y * strength * 1.4}px, 0)`;
      const label = el.querySelector('.btn__label');
      if (label) label.style.transform = `translate3d(${x * 0.06}px, ${y * 0.08}px, 0)`;
    });
    el.addEventListener('pointerleave', () => {
      el.style.transform = '';
      const label = el.querySelector('.btn__label');
      if (label) label.style.transform = '';
    });
  });
}
