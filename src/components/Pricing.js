import { Eyebrow, SplitHeading } from './Button.js';
import { icon } from './Icons.js';
import { esc, each } from '../lib/html.js';

// Three packages from data/content.js. Plans with `trial` / `ads` get the
// free-trial and ads-included highlights.
export const Pricing = ({ plans }) => `
<section class="pricing section" id="pricing" aria-labelledby="pricing-title">
  <div class="container">
    <div class="pricing__head">
      <div>
        ${Eyebrow('Packages')}
        ${SplitHeading(['Three ways', 'to get started.'], { id: 'pricing-title' })}
      </div>
      <p class="lede" data-reveal>Every package includes a custom-designed website, hosting and ongoing maintenance. Intermediate and Maximum Growth start with a free first month and include ads we run for you.</p>
    </div>

    <ul class="plans" role="list">
      ${each(plans, (p, i) => `
      <li class="plan${p.featured ? ' plan--featured' : ''}" data-reveal style="--d:${i * 90}ms">
        <h3 class="plan__name">${esc(p.name)}</h3>
        <p class="plan__price">
          <span class="plan__amount">${esc(p.monthly)}<span class="plan__per">/month</span></span>
          <span class="plan__setup">+ ${esc(p.setup)} one-time setup</span>
        </p>
        ${p.trial || p.ads ? `<ul class="plan__perks" role="list">
          ${p.trial ? `<li>${icon('spark')}<span>First month free</span></li>` : ''}
          ${p.ads ? `<li>${icon('convert')}<span>Ads run for you, included</span></li>` : ''}
        </ul>` : ''}
        ${p.includesPrevious ? `<p class="plan__includes">Everything in ${esc(p.includesPrevious)}, plus:</p>` : '<p class="plan__includes">Includes:</p>'}
        <ul class="plan__features" role="list">
          ${each(p.features, (f) => `<li>${icon('check')}<span>${esc(f)}</span></li>`)}
        </ul>
        <p class="plan__best"><b>Best for:</b> ${esc(p.bestFor)}</p>
        <a class="btn btn--${p.featured ? 'primary' : 'ghost'} plan__cta" href="#contact" data-plan="${esc(p.name)}" data-magnetic>
          <span class="btn__label">${p.trial ? 'Start Free Month' : `Choose ${esc(p.name)}`}</span><span class="btn__icon">${icon('arrow')}</span>
        </a>
      </li>`)}
    </ul>
    <p class="pricing__note" data-reveal>Not sure which fits? <a href="#contact">Tell us about your business</a> and we'll recommend the right package.</p>
  </div>
</section>`;
