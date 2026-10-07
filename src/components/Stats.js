import { esc, each } from '../lib/html.js';

// Animated counters. Numbers render in full in the HTML; script counts up to
// them only when motion is allowed.
export const Stats = ({ stats }) => `
<section class="stats" aria-label="FD Web Designs at a glance">
  <div class="container">
    <dl class="stats__grid">
      ${each(stats, (s, i) => `
      <div class="stat" data-reveal style="--d:${i * 80}ms">
        <dt class="stat__label">${esc(s.label)}</dt>
        <dd class="stat__value">${
          s.display
            ? `<span>${esc(s.display)}</span>`
            : `<span data-count="${s.value}">${s.value}</span><span class="stat__suffix">${esc(s.suffix || '')}</span>`
        }</dd>
      </div>`)}
    </dl>
  </div>
</section>`;
