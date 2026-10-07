// Tiny helpers for writing components as template strings.

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/** Escape text for HTML content and attribute values. */
export const esc = (value = '') => String(value).replace(/[&<>"']/g, (c) => ESC[c]);

/** Join a list of rendered strings. */
export const each = (list, fn) => list.map(fn).join('');

/** Zero-padded index: 1 -> "01". */
export const pad = (n) => String(n).padStart(2, '0');

/** True when a value is still an unfilled [PLACEHOLDER]. */
export const isPlaceholder = (value) => /^\[.*\]$/.test(String(value || '').trim());
