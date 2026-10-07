import { icon } from './Icons.js';
import { esc } from '../lib/html.js';

/**
 * Call-to-action button (rendered as a link).
 * variant: 'primary' | 'ghost' | 'text'
 * book: true wires it to the booking flow (see site.booking in data/site.js).
 */
export const Button = ({ label, href = '#contact', variant = 'primary', book = false, iconName = 'arrow', attrs = '' }) => `
<a class="btn btn--${variant}" href="${href}"${book ? ' data-book' : ''} data-magnetic ${attrs}>
  <span class="btn__label">${esc(label)}</span>
  <span class="btn__icon">${icon(iconName)}</span>
</a>`;

/** Eyebrow label + optional index used at the top of sections. */
export const Eyebrow = (text, index = '') => `
<p class="eyebrow" data-reveal>${index ? `<span class="eyebrow__index">${index}</span>` : ''}<span>${esc(text)}</span></p>`;

/** Headline split into lines that reveal behind a mask. */
export const SplitHeading = (lines, { tag = 'h2', cls = 'display', id = '' } = {}) => `
<${tag} class="${cls}" ${id ? `id="${id}"` : ''} data-split>${lines
  .map((l, i) => `<span class="line"><span class="line__inner" style="--i:${i}">${l}</span></span>`)
  .join(' ')}</${tag}>`;
