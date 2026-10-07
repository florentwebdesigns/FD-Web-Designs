import { Eyebrow } from './Button.js';
import { esc, each } from '../lib/html.js';

// Small geometric glyphs, one per pillar.
const glyphs = [
  '<path d="M4 20 12 4l8 16z"/><path d="M8 20 12 12l4 8"/>',
  '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r=".8" fill="currentColor"/>',
  '<rect x="4" y="4" width="7" height="7"/><rect x="13" y="4" width="7" height="7"/><rect x="4" y="13" width="7" height="7"/><path d="M13 16.5h7M16.5 13v7"/>',
  '<path d="M4 16h4l3-9 3 12 2-6h4"/>',
  '<path d="M12 3.5 19.5 8v8L12 20.5 4.5 16V8z"/><path d="M12 12 19.5 8M12 12v8.5M12 12 4.5 8"/>',
];

// Positioning section. The headline brightens word by word as it scrolls.
export const WhyUs = ({ pillars }) => {
  const words = 'Your website is often your first impression. Make it count.'.split(' ');
  return `
<section class="why section" id="about" aria-labelledby="why-title">
  <div class="container">
    ${Eyebrow('Why FD Web Designs')}
    <h2 class="why__statement" id="why-title" data-scrub-words>
      ${words.map((w, i) => `<span class="w${i >= 6 ? ' w--accent' : ''}">${w}</span>`).join(' ')}
    </h2>

    <div class="why__about">
      <p class="why__kicker" data-reveal>About us</p>
      <div class="why__copy">
        <p data-reveal>FD Web Designs LLC is a web design and development studio that builds websites for any business, anywhere in the country. Contractors, salons, restaurants, professional services: we design and build every site ourselves, from the first sketch to the launch, so the result looks like your business and works like a sales tool.</p>
        <p data-reveal>Most people judge a business by its website before they ever call. We make sure that first look earns their trust.</p>
      </div>
    </div>

    <ul class="pillars" role="list">
      ${each(pillars, (p, i) => `
      <li class="pillar" data-reveal style="--d:${i * 70}ms">
        <svg class="pillar__glyph" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true">${glyphs[i % glyphs.length]}</svg>
        <h3 class="pillar__title">${esc(p.title)}</h3>
        <p class="pillar__text">${esc(p.text)}</p>
      </li>`)}
    </ul>
  </div>
</section>`;
};
