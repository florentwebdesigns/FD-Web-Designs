// Minimal line icons drawn for this site (24px grid, 1.5 stroke).
// Usage: icon('arrow') -> inline SVG string. Icons are decorative (aria-hidden).

const paths = {
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowUpRight: '<path d="M7 17 17 7M8 7h9v9"/>',
  arrowDown: '<path d="M12 5v14M6 13l6 6 6-6"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  mail: '<rect x="3.5" y="5.5" width="17" height="13" rx="1"/><path d="m4 6.5 8 6 8-6"/>',
  phone: '<path d="M8.5 3.5h-3a1 1 0 0 0-1 1.1A16 16 0 0 0 19.4 19.5a1 1 0 0 0 1.1-1v-3l-4-1.5-2 2a11 11 0 0 1-5.5-5.5l2-2z"/>',
  globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.6 2.6 2.6 14.4 0 17M12 3.5c-2.6 2.6-2.6 14.4 0 17"/>',

  // Services
  design: '<path d="M4 20 15.5 8.5M14 5l5 5M12.5 6.5l2-2a1.4 1.4 0 0 1 2 0l3 3a1.4 1.4 0 0 1 0 2l-2 2"/><circle cx="6" cy="6" r="2"/>',
  code: '<path d="m8.5 8-4 4 4 4M15.5 8l4 4-4 4M13.5 5.5l-3 13"/>',
  mobile: '<rect x="7" y="3.5" width="10" height="17" rx="1.5"/><path d="M11 17.5h2"/>',
  redesign: '<path d="M4.5 12a7.5 7.5 0 0 1 13-5.1M19.5 12a7.5 7.5 0 0 1-13 5.1"/><path d="M17.5 3.5v3.4h-3.4M6.5 20.5v-3.4h3.4"/>',
  pin: '<path d="M12 20.5s6.5-5.6 6.5-10.5a6.5 6.5 0 0 0-13 0c0 4.9 6.5 10.5 6.5 10.5z"/><circle cx="12" cy="10" r="2.2"/>',
  convert: '<path d="M4 18.5 9.5 13l3.5 3.5 7-7.5"/><path d="M15 9h5v5"/>',
  search: '<circle cx="10.5" cy="10.5" r="6"/><path d="m15 15 5 5"/>',
  map: '<path d="m3.5 6.5 5.5-2 6 2 5.5-2v13l-5.5 2-6-2-5.5 2z"/><path d="M9 4.5v13M15 6.5v13"/>',
  calendar: '<rect x="4" y="5.5" width="16" height="14.5" rx="1"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4M8 14h3"/>',
  wrench: '<path d="M14.5 6.5a4 4 0 0 0 5 5L12 19a2.1 2.1 0 0 1-3-3l7.5-7.5a4 4 0 0 1-2-2z"/>',
  cloud: '<path d="M7 18.5a4.5 4.5 0 0 1-.4-9A5.5 5.5 0 0 1 17.2 9 4.75 4.75 0 0 1 17 18.5z"/>',
  spark: '<path d="M12 3.5v5M12 15.5v5M3.5 12h5M15.5 12h5M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3"/>',

  // Social
  instagram: '<rect x="4" y="4" width="16" height="16" rx="4.5"/><circle cx="12" cy="12" r="3.6"/><circle cx="16.8" cy="7.2" r=".6" fill="currentColor"/>',
  facebook: '<path d="M14 8.5h2.5V5H14a3.5 3.5 0 0 0-3.5 3.5V11H8v3.5h2.5V21H14v-6.5h2.5l.5-3.5h-3V9a.5.5 0 0 1 .5-.5z"/>',
  tiktok: '<path d="M13.5 4v10.8a3.3 3.3 0 1 1-3.3-3.3M13.5 4c.4 2.6 2.2 4.3 5 4.5"/>',
  linkedin: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 10.5V16M8 7.8v.2M11.5 16v-5.5M11.5 13c0-1.6 1-2.5 2.3-2.5S16 11.4 16 13v3"/>',
};

export const icon = (name, cls = '') =>
  `<svg class="icon ${cls}" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths[name] || ''}</svg>`;

export const stars = (n = 5) =>
  `<span class="stars" role="img" aria-label="${n} out of 5 stars">${'<svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="m10 1.8 2.5 5.3 5.8.7-4.3 4 1.1 5.7L10 14.7l-5.1 2.8 1.1-5.7-4.3-4 5.8-.7z"/></svg>'.repeat(n)}</span>`;
