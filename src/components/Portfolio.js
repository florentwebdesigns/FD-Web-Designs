import { PortfolioCard } from './PortfolioCard.js';
import { Eyebrow, SplitHeading, Button } from './Button.js';
import { each, pad } from '../lib/html.js';

// Main portfolio: an editorial sequence of case studies. The featured project
// takes the full width; the rest alternate sides. Driven by data/projects.js.
export const Portfolio = ({ projects }) => {
  const ordered = [...projects].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
  const total = pad(ordered.length);
  return `
<section class="work section" id="work" aria-labelledby="work-title">
  <div class="container work__head">
    ${Eyebrow('Portfolio', `(${total})`)}
    ${SplitHeading(['Built for real businesses.', '<span class="muted-line">Designed to stand out.</span>'], { id: 'work-title', cls: 'display display--xl' })}
  </div>

  <div class="work__list">
    ${each(ordered, (p, i) => PortfolioCard({ project: p, index: i + 1, total, layout: i === 0 ? 'featured' : i % 2 ? 'right' : 'left' }))}

    <article class="case case--next container" data-reveal>
      <div class="case-next">
        <p class="eyebrow"><span class="eyebrow__index">${pad(ordered.length + 1)}</span><span>Your project</span></p>
        <h3 class="case-next__title">Your business could be next.</h3>
        <p class="case-next__text">Tell us what you do and who you serve. We'll show you what a website built for your business could look like.</p>
        ${Button({ label: 'Start Your Project', href: '#contact' })}
      </div>
    </article>
  </div>
</section>`;
};
