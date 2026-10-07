import { Button } from './Button.js';

// Decorative "design tool" fragments that float over the hero background.
// They hint at the craft (layout, color, type, collaboration) without making claims.
const Fragments = () => `
<div class="hero__fragments" aria-hidden="true">
  <div class="frag frag--frame" data-depth="0.6">
    <div class="frag__bar"><i></i><i></i><i></i><span>homepage — desktop</span></div>
    <div class="frag__layout">
      <span class="sk sk--nav"></span>
      <span class="sk sk--h1"></span><span class="sk sk--h1 sk--short"></span>
      <span class="sk sk--p"></span>
      <span class="sk sk--btn"></span>
      <span class="sk sk--img"></span>
    </div>
  </div>
  <div class="frag frag--swatch" data-depth="1.1">
    <span class="frag__label">Brand palette</span>
    <div class="swatches"><i style="--c:#05060a"></i><i style="--c:#13204a"></i><i style="--c:#3d6bff"></i><i style="--c:#8b5cf6"></i><i style="--c:#4fd8ff"></i></div>
  </div>
  <div class="frag frag--type" data-depth="0.85">
    <span class="frag__aa">Aa</span>
    <span class="frag__meta">Display / 700<br>Tracking −4%</span>
  </div>
  <div class="frag frag--cursor" data-depth="1.4">
    <svg viewBox="0 0 20 20" width="20" height="20"><path d="M3 2l13 7-6 1.5L7.5 17z" fill="#4fd8ff" stroke="#05060a" stroke-width="1"/></svg>
    <span>FD</span>
  </div>
</div>`;

export const Hero = () => `
<section class="hero" id="top" aria-labelledby="hero-title" data-hero>
  <div class="hero__bg" aria-hidden="true">
    <div class="hero__mesh"></div>
    <div class="hero__grid"></div>
    <canvas class="hero__canvas" data-hero-field></canvas>
    <div class="hero__streak"></div>
    <div class="hero__vignette"></div>
  </div>
  ${Fragments()}

  <div class="hero__content container">
    <p class="eyebrow hero__eyebrow" data-intro="0"><span class="eyebrow__dot" aria-hidden="true"></span><span>FD Web Designs LLC</span></p>
    <h1 class="hero__title" id="hero-title">
      <span class="line"><span class="line__inner" data-intro="1">We build</span></span>
      <span class="line"><span class="line__inner" data-intro="2">websites that</span></span>
      <span class="line"><span class="line__inner" data-intro="3"><span class="hero__accent">get noticed.</span></span></span>
    </h1>
    <div class="hero__lower">
      <p class="hero__lead" data-intro="4">Premium websites designed to make your business look better, build trust, and turn visitors into customers.</p>
      <div class="hero__ctas">
        <span data-intro="5">${Button({ label: 'Book a Free Consultation', book: true })}</span>
        <span data-intro="6">${Button({ label: 'View Our Work', href: '#work', variant: 'ghost', iconName: 'arrowDown' })}</span>
      </div>
    </div>
  </div>

  <div class="hero__meta container" data-intro="7">
    <span>Web Design &amp; Development</span>
    <a class="scroll-cue" href="#selected-work"><span class="scroll-cue__track" aria-hidden="true"><i></i></span><span>Scroll to explore</span></a>
    <span>Local &amp; Nationwide</span>
  </div>
</section>`;
