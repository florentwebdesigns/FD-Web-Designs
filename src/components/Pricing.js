import { Eyebrow, SplitHeading } from './Button.js';
import { icon } from './Icons.js';
import { esc, each, isPlaceholder } from '../lib/html.js';

// Three packages. Prices still in [BRACKETS] show as "Custom quote" styling
// with a visible placeholder so nothing misleading goes live by accident.
export const Pricing = ({ plans }) => `
<section class="pricing section" id="pricing" aria-labelledby="pricing-title">
  <div class="container">
    <div class="pricing__head">
      <div>
        ${Eyebrow('Packages')}
        ${SplitHeading(['Three ways', 'to get started.'], { id: 'pricing-title' })}
      </div>
      <p class="lede" data-reveal>Every package is fully custom designed. Pick the starting point that fits, and we'll tailor the details on a free consultation.</p>
    </div>

    <ul class="plans" role="list">
      ${each(plans, (p, i) => `
      <li class="plan${p.featured ? ' plan--featured' : ''}" data-reveal style="--d:${i * 90}ms">
        ${p.featured ? '<span class="plan__badge">Most popular</span>' : ''}
        <h3 class="plan__name">${esc(p.name)}</h3>
        <p class="plan__summary">${esc(p.summary)}</p>
        <p class="plan__price">
          <span class="plan__cadence">${esc(p.cadence)}</span>
          <span class="plan__amount${isPlaceholder(p.price) ? ' is-placeholder' : ''}">${esc(p.price)}</span>
        </p>
        <ul class="plan__features" role="list">
          ${each(p.features, (f) => `<li>${icon('check')}<span>${esc(f)}</span></li>`)}
        </ul>
        <a class="btn btn--${p.featured ? 'primary' : 'ghost'} plan__cta" href="#contact" data-plan="${esc(p.name)}" data-magnetic>
          <span class="btn__label">Choose ${esc(p.name)}</span><span class="btn__icon">${icon('arrow')}</span>
        </a>
      </li>`)}
    </ul>
    <p class="pricing__note" data-reveal>Need something different? <a href="#contact">Tell us about your project</a> and we'll put together a custom quote.</p>
  </div>
</section>`;
