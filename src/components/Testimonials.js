import { Eyebrow, SplitHeading } from './Button.js';
import { icon, stars } from './Icons.js';
import { esc, each, pad } from '../lib/html.js';

// One large quote at a time with manual controls. All quotes stay in the DOM
// (hidden ones are inert) so they work without script.
export const Testimonials = ({ testimonials }) => `
<section class="testimonials section" id="testimonials" aria-labelledby="t-title">
  <div class="container">
    <div class="t__top">
      ${Eyebrow('Testimonials')}
      ${SplitHeading(['What our', 'clients say'], { id: 't-title' })}
    </div>

    <div class="t" data-testimonials aria-roledescription="carousel" aria-label="Client testimonials">
      <div class="t__slides">
        ${each(testimonials, (t, i) => `
        <figure class="t__slide${i === 0 ? ' is-active' : ''}" data-slide aria-roledescription="slide" aria-label="${i + 1} of ${testimonials.length}">
          ${stars(t.rating)}
          <blockquote class="t__quote"><p>${esc(t.quote)}</p></blockquote>
          <figcaption class="t__who">
            <span class="t__name">${esc(t.name)}</span>
            <span class="t__company">${esc(t.company)}</span>
            ${t.placeholder ? '<span class="t__flag">Placeholder review</span>' : ''}
          </figcaption>
        </figure>`)}
      </div>

      <div class="t__controls">
        <p class="t__count" aria-hidden="true"><span data-t-current>01</span> / ${pad(testimonials.length)}</p>
        <div class="t__progress" aria-hidden="true"><i data-t-progress></i></div>
        <div class="t__buttons">
          <button type="button" class="round-btn" data-t-prev aria-label="Previous testimonial">${icon('arrow', 'flip')}</button>
          <button type="button" class="round-btn" data-t-next aria-label="Next testimonial">${icon('arrow')}</button>
        </div>
      </div>
    </div>
  </div>
</section>`;
