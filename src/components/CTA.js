import { Button } from './Button.js';

export const CTA = () => `
<section class="cta" aria-labelledby="cta-title">
  <div class="cta__light" aria-hidden="true"><i></i><i></i><i></i></div>
  <div class="container cta__inner">
    <p class="eyebrow" data-reveal><span class="eyebrow__dot" aria-hidden="true"></span><span>Now booking new projects</span></p>
    <h2 class="cta__title" id="cta-title" data-split>
      <span class="line"><span class="line__inner" style="--i:0">Ready to build</span></span>
      <span class="line"><span class="line__inner" style="--i:1">something better?</span></span>
    </h2>
    <p class="lede cta__lede" data-reveal>Let's create a website that makes your business impossible to overlook.</p>
    <div class="cta__buttons" data-reveal>
      ${Button({ label: 'Book a Free Consultation', book: true })}
      ${Button({ label: 'View Our Work', href: '#work', variant: 'ghost' })}
    </div>
  </div>
</section>`;
