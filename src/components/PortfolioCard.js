import { BrowserFrame, PhoneFrame } from './Frames.js';
import { icon } from './Icons.js';
import { esc, each, pad } from '../lib/html.js';

/** Service tags for a project. */
const Tags = (services) => `<ul class="tags" aria-label="Services provided">${each(services, (s) => `<li>${esc(s)}</li>`)}</ul>`;

/**
 * One case study in the portfolio.
 * layout: 'featured' (full width) | 'left' | 'right' (media side)
 */
export const PortfolioCard = ({ project: p, index, total, layout }) => `
<article class="case case--${layout}" id="case-${p.slug}" style="--accent:${p.accent}" aria-labelledby="case-${p.slug}-title">
  <div class="container case__grid">
    <a class="case__media" href="#case-${p.slug}" data-open-project="${p.slug}" data-cursor="View" data-reveal aria-label="Open the ${esc(p.name)} case study">
      ${BrowserFrame({ project: p, sizes: layout === 'featured' ? '(min-width: 1100px) 82vw, 94vw' : '(min-width: 1100px) 58vw, 94vw' })}
      ${PhoneFrame({ project: p })}
    </a>

    <div class="case__info">
      <p class="case__index" data-reveal><span>${pad(index)}</span><span class="case__index-total">/ ${total}</span></p>
      <div class="case__titles">
        <h3 class="case__title" id="case-${p.slug}-title" data-reveal>${esc(p.name)}</h3>
        <p class="case__industry" data-reveal><span class="case__line" aria-hidden="true"></span>${esc(p.industry)}</p>
      </div>
      <div class="case__body">
        <p class="case__desc" data-reveal>${esc(p.description)}</p>
        <div data-reveal>${Tags(p.services)}</div>
        <div class="case__actions" data-reveal>
          <button class="link-arrow link-arrow--strong" type="button" data-open-project="${p.slug}">View project ${icon('arrow')}<span class="sr-only">: ${esc(p.name)} case study</span></button>
          ${p.url ? `<a class="link-arrow" href="${esc(p.url)}" target="_blank" rel="noopener">Visit live site ${icon('arrowUpRight')}<span class="sr-only">(opens in a new tab)</span></a>` : ''}
        </div>
      </div>
    </div>
  </div>
</article>`;

/** Full case-study content, cloned into the project dialog on demand. */
export const CaseStudyTemplate = ({ project: p, index, total, next }) => `
<template id="tpl-${p.slug}">
  <article class="study" style="--accent:${p.accent}">
    <header class="study__head">
      <p class="eyebrow"><span class="eyebrow__index">${pad(index)} / ${total}</span><span>${esc(p.industry)}${p.year ? ` · ${esc(p.year)}` : ''}</span></p>
      <h2 class="study__title" id="study-title">${esc(p.name)}</h2>
      <p class="study__lead">${esc(p.description)}</p>
      <div class="study__actions">
        ${p.url ? `<a class="btn btn--primary" href="${esc(p.url)}" target="_blank" rel="noopener"><span class="btn__label">Visit Live Site</span><span class="btn__icon">${icon('arrowUpRight')}</span></a>` : ''}
        <a class="btn btn--${p.url ? 'ghost' : 'primary'}" href="#contact" data-close-dialog><span class="btn__label">Start a Project Like This</span><span class="btn__icon">${icon('arrow')}</span></a>
      </div>
    </header>

    <div class="study__media">
      ${BrowserFrame({ project: p, sizes: '(min-width: 1100px) 70vw, 94vw', full: true })}
      ${PhoneFrame({ project: p, full: true })}
    </div>

    <div class="study__details">
      <section><h3>The challenge</h3><p>${esc(p.challenge)}</p></section>
      <section><h3>Our approach</h3><p>${esc(p.approach)}</p></section>
      <section><h3>Services provided</h3>${Tags(p.services)}</section>
    </div>

    ${next ? `<footer class="study__next"><span>Next project</span><button type="button" class="study__next-btn" data-open-project="${next.slug}">${esc(next.name)} ${icon('arrow')}</button></footer>` : ''}
  </article>
</template>`;

export const CaseStudyDialog = ({ projects }) => {
  const ordered = [...projects].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
  const total = pad(ordered.length);
  return `
<dialog class="dialog" id="case-dialog" aria-labelledby="study-title" data-dialog>
  <div class="dialog__chrome">
    <button class="dialog__close" type="button" data-close-dialog aria-label="Close case study">${icon('close')}</button>
  </div>
  <div class="dialog__body" data-dialog-body></div>
</dialog>
${each(ordered, (p, i) => CaseStudyTemplate({ project: p, index: i + 1, total, next: ordered[(i + 1) % ordered.length] }))}`;
};
