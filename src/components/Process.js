import { Eyebrow, SplitHeading, Button } from './Button.js';
import { esc, each, pad } from '../lib/html.js';

// Five-step process. A light travels down the rail as the visitor scrolls,
// switching each step on as it passes.
export const Process = ({ steps }) => `
<section class="process section" id="process" aria-labelledby="process-title">
  <div class="container process__grid">
    <div class="process__intro">
      ${Eyebrow('How It Works')}
      ${SplitHeading(['From idea', 'to launch.'], { id: 'process-title' })}
      <p class="lede" data-reveal>A clear, collaborative process with no guesswork. You always know what's happening and what comes next.</p>
      <div data-reveal>${Button({ label: 'Start Your Project', href: '#contact', variant: 'ghost' })}</div>
    </div>

    <ol class="steps" data-process role="list">
      <span class="steps__rail" aria-hidden="true"><span class="steps__fill"></span></span>
      ${each(steps, (s, i) => `
      <li class="step" data-step>
        <span class="step__node" aria-hidden="true"></span>
        <span class="step__num">${pad(i + 1)}</span>
        <div>
          <h3 class="step__title">${esc(s.title)}</h3>
          <p class="step__text">${esc(s.text)}</p>
        </div>
      </li>`)}
    </ol>
  </div>
</section>`;
