// Smooth scrolling (Lenis) plus anchor navigation that accounts for the
// fixed header. Falls back to native scrolling for reduced motion / touch.
import Lenis from 'lenis';
import { motionOK } from './env.js';
import { onFrame } from './ticker.js';

let lenis = null;
const listeners = new Set();

export function initScroll() {
  if (motionOK() && !('ontouchstart' in window)) {
    lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true });
    onFrame((t) => lenis.raf(t));
    lenis.on('scroll', () => listeners.forEach((fn) => fn(window.scrollY)));
  } else {
    window.addEventListener('scroll', () => listeners.forEach((fn) => fn(window.scrollY)), { passive: true });
  }

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || a.hasAttribute('data-book') || a.hasAttribute('data-open-project')) return;
    const id = a.getAttribute('href');
    if (id === '#' || id.length < 2) return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    scrollToEl(target);
  });
}

export function onScroll(fn) { listeners.add(fn); fn(window.scrollY); }

export function scrollToEl(target, { onComplete } = {}) {
  const offset = target.id === 'top' ? 0 : -(document.querySelector('[data-nav]')?.offsetHeight || 72) + 1;
  if (lenis) {
    lenis.scrollTo(target.id === 'top' ? 0 : target, { offset, duration: 1.4, onComplete });
  } else {
    const y = target.id === 'top' ? 0 : target.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top: y, behavior: motionOK() ? 'smooth' : 'auto' });
    if (onComplete) setTimeout(onComplete, motionOK() ? 700 : 0);
  }
  try { if (target.id && target.id !== 'top') history.replaceState(null, '', `#${target.id}`); } catch { /* sandboxed */ }
}

export const lockScroll = () => { lenis?.stop(); document.documentElement.style.overflow = 'hidden'; };
export const unlockScroll = () => { lenis?.start(); document.documentElement.style.overflow = ''; };
