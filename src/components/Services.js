import { Eyebrow, SplitHeading, Button } from './Button.js';
import { icon } from './Icons.js';
import { esc, each, pad } from '../lib/html.js';

// Editorial index of services: a sticky intro beside a ruled list.
export const Services = ({ services }) => `
<section class="services section" id="services" aria-labelledby="services-title">
  <div class="container services__grid">
    <div class="services__intro">
      ${Eyebrow('Services', `(${pad(services.length)})`)}
      ${SplitHeading(['More than', 'just a website.'], { id: 'services-title' })}
      <p class="lede" data-reveal>Strategy, design, development and everything after launch. One team takes your website from first idea to the leads it brings in.</p>
      <div data-reveal>${Button({ label: 'Book a Free Consultation', book: true, variant: 'ghost' })}</div>
    </div>

    <ol class="svc-list" role="list">
      ${each(services, (s, i) => `
      <li class="svc" data-reveal style="--d:${(i % 4) * 50}ms">
        <span class="svc__num">${pad(i + 1)}</span>
        <span class="svc__icon">${icon(s.icon)}</span>
        <div class="svc__text">
          <h3 class="svc__name">${esc(s.name)}</h3>
          <p class="svc__desc">${esc(s.text)}</p>
        </div>
        <span class="svc__arrow">${icon('arrowUpRight')}</span>
      </li>`)}
    </ol>
  </div>
</section>`;
