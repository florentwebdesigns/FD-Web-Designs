import { BrowserFrame } from './Frames.js';
import { Eyebrow, SplitHeading } from './Button.js';
import { icon } from './Icons.js';
import { esc, each } from '../lib/html.js';

// "Selected work": a clean row of browser previews, one per project.
// On phones it becomes a swipeable rail.
export const PortfolioPreview = ({ projects }) => `
<section class="preview section" id="selected-work" aria-labelledby="preview-title">
  <div class="container preview__head">
    <div>
      ${Eyebrow('Selected Work')}
      ${SplitHeading(['We let the work', 'speak for itself.'], { id: 'preview-title' })}
    </div>
    <div class="preview__aside" data-reveal>
      <p class="lede">From local service businesses to growing brands across the country, we design websites that combine strong visual identity with real-world functionality.</p>
      <a class="link-arrow" href="#work">Explore every project ${icon('arrow')}</a>
    </div>
  </div>

  <div class="stage container">
    <ul class="stage__track" role="list">
      ${each(projects.slice(0, 3), (p, i) => `
      <li class="stage__item" style="--n:${i}">
        <a class="stage__link" href="#case-${p.slug}" data-open-project="${p.slug}" data-cursor="View">
          ${BrowserFrame({ project: p, sizes: '(min-width: 900px) 46vw, 84vw', eager: i === 0 })}
          <span class="stage__caption">
            <span class="stage__name">${esc(p.name)}</span>
            <span class="stage__industry">${esc(p.industry)}</span>
          </span>
          <span class="sr-only">: open case study</span>
        </a>
      </li>`)}
    </ul>
  </div>
</section>`;
