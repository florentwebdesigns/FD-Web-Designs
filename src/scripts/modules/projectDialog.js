// Case-study dialog. Each project's content lives in a <template>; opening
// a project clones it into a native <dialog> (focus trap + Esc built in).
import { lockScroll, unlockScroll, scrollToEl } from './scroll.js';
import { motionOK } from './env.js';

export function initProjectDialog() {
  const dialog = document.querySelector('[data-dialog]');
  if (!dialog || typeof dialog.showModal !== 'function') return; // links fall back to anchors
  const body = dialog.querySelector('[data-dialog-body]');
  let opener = null;

  const fill = (slug) => {
    const tpl = document.getElementById(`tpl-${slug}`);
    if (!tpl) return false;
    body.replaceChildren(tpl.content.cloneNode(true));
    body.scrollTop = 0;
    return true;
  };

  const open = (slug, trigger) => {
    if (!fill(slug)) return;
    opener = trigger;
    if (!dialog.open) { dialog.showModal(); lockScroll(); }
    dialog.querySelector('.dialog__close')?.focus();
  };

  const close = (after) => {
    if (!dialog.open) return;
    let finished = false;
    const done = () => {
      if (finished) return;
      finished = true;
      dialog.classList.remove('is-closing');
      dialog.close();
      unlockScroll();
      if (after) after(); else opener?.focus({ preventScroll: true });
    };
    if (motionOK()) {
      dialog.classList.add('is-closing');
      const onEnd = (e) => { if (e.target === dialog) { dialog.removeEventListener('animationend', onEnd); done(); } };
      dialog.addEventListener('animationend', onEnd);
      setTimeout(done, 450);
    } else done();
  };

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-open-project]');
    if (trigger) {
      e.preventDefault();
      open(trigger.dataset.openProject, dialog.contains(trigger) ? opener : trigger);
      return;
    }
    const closer = e.target.closest('[data-close-dialog]');
    if (closer && dialog.contains(closer)) {
      e.preventDefault();
      const href = closer.getAttribute('href');
      const target = href && href.startsWith('#') ? document.querySelector(href) : null;
      close(target ? () => scrollToEl(target) : null);
    }
  });

  // Backdrop click closes.
  dialog.addEventListener('click', (e) => { if (e.target === dialog) close(); });
  dialog.addEventListener('cancel', (e) => { e.preventDefault(); close(); });
}
