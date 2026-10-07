// Environment checks shared by every module.
const mq = (q) => window.matchMedia(q);

export const reducedMotion = mq('(prefers-reduced-motion: reduce)');
export const finePointer = mq('(hover: hover) and (pointer: fine)');
export const isMobile = () => window.innerWidth < 760;

export const motionOK = () => !reducedMotion.matches;

export const config = (() => {
  try { return JSON.parse(document.getElementById('site-config')?.textContent || '{}'); }
  catch { return {}; }
})();

export const lerp = (a, b, t) => a + (b - a) * t;
export const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));

/** Progress (0..1) of an element moving through the viewport. */
export function viewProgress(el, start = 1, end = 0) {
  const r = el.getBoundingClientRect();
  const vh = window.innerHeight;
  // 0 when the element's top is at `start * vh`, 1 when its top is at `end * vh`.
  return clamp((start * vh - r.top) / ((start - end) * vh || 1));
}
