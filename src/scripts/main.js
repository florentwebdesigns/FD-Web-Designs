// FD Web Designs: client-side behavior. Every module enhances markup that
// already works without script.
import { initScroll } from './modules/scroll.js';
import { initIntro } from './modules/intro.js';
import { initNav } from './modules/nav.js';
import { initReveal } from './modules/reveal.js';
import { initPointer, initMagnetic } from './modules/pointer.js';
import { initHeroField } from './modules/heroField.js';
import { initScrollFx } from './modules/scrollfx.js';
import { initCounters } from './modules/counters.js';
import { initProjectDialog } from './modules/projectDialog.js';
import { initForm } from './modules/form.js';

window.__fdReady = true;

const modules = [initScroll, initIntro, initNav, initReveal, initHeroField, initScrollFx, initPointer, initMagnetic, initCounters, initProjectDialog, initForm];
for (const init of modules) {
  try { init(); } catch (err) { console.error(`[FD] ${init.name} failed`, err); }
}

document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = String(new Date().getFullYear()); });
