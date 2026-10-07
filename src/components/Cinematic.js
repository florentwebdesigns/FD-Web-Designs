import { Button } from './Button.js';

// Full-bleed showcase moment: three statements drifting at different speeds
// over a slow-moving horizon of light.
export const Cinematic = () => `
<section class="cine" aria-labelledby="cine-title" data-cine>
  <div class="cine__bg" aria-hidden="true">
    <div class="cine__aurora"></div>
    <div class="cine__floor"></div>
    <div class="cine__horizon"></div>
  </div>
  <div class="container cine__content">
    <h2 class="cine__title" id="cine-title">
      <span class="cine__line" data-parallax="24">Your business.</span>
      <span class="cine__line cine__line--indent" data-parallax="0">Your brand.</span>
      <span class="cine__line cine__line--accent" data-parallax="-24">Your website.</span>
    </h2>
    <div class="cine__foot" data-reveal>
      <p class="lede">We combine strategy, design, development, and technology to create digital experiences that make businesses look as good online as they do in real life.</p>
      ${Button({ label: 'Start Your Project', href: '#contact' })}
    </div>
  </div>
</section>`;
