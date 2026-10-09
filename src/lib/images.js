// Build-time image helpers: responsive <picture> markup with AVIF + WebP
// sources and intrinsic width/height read from the generated manifest.
import { readFileSync, existsSync } from 'node:fs';
import { esc } from './html.js';

const MANIFEST = 'public/images/projects/manifest.json';
const manifest = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, 'utf8')) : {};

const WIDTHS = { desktop: [800, 1440], mobile: [400, 780] };

/**
 * <picture> for a project screenshot.
 * @param {string} base    image base name, e.g. "rays-hvac"
 * @param {'desktop'|'mobile'} variant
 * @param {string} alt
 * @param {string} sizes   sizes attribute
 * @param {boolean} eager  load immediately (above the fold)
 */
export function ProjectPicture({ base, variant = 'desktop', alt, sizes, eager = false, cls = '' }) {
  const [small, large] = WIDTHS[variant];
  const src = (w, ext) => `images/projects/${base}-${variant}-${w}.${ext}`;
  const set = (ext) => `${src(small, ext)} ${small}w, ${src(large, ext)} ${large}w`;
  const [w, h] = manifest[`${base}-${variant}-${small}.webp`] || [small, Math.round(small * 0.62)];
  return `<picture class="${cls}">
    <source type="image/avif" srcset="${set('avif')}" sizes="${sizes}">
    <source type="image/webp" srcset="${set('webp')}" sizes="${sizes}">
    <img src="${src(small, 'webp')}" alt="${esc(alt)}" width="${w}" height="${h}" loading="${eager ? 'eager' : 'lazy'}" decoding="async">
  </picture>`;
}
