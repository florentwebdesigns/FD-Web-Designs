import { Eyebrow, SplitHeading } from './Button.js';
import { stars } from './Icons.js';
import { esc, each } from '../lib/html.js';

// Client reviews as a row of cards (stacked on phones).
export const Testimonials = ({ testimonials }) => `
<section class="testimonials section" id="testimonials" aria-labelledby="t-title">
  <div class="container">
    <div class="t__top">
      ${Eyebrow('Testimonials')}
      ${SplitHeading(['What our', 'clients say'], { id: 't-title' })}
    </div>

    <div class="t__grid">
      ${each(testimonials, (t) => `
      <figure class="t__card" data-reveal>
        ${stars(t.rating)}
        <blockquote class="t__quote"><p>${esc(t.quote)}</p></blockquote>
        <figcaption class="t__who">
          <span class="t__name">${esc(t.name)}</span>
          <span class="t__company">${esc(t.company)}</span>
          ${t.placeholder ? '<span class="t__flag">Placeholder review</span>' : ''}
        </figcaption>
      </figure>`)}
    </div>
  </div>
</section>`;
