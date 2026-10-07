import { Logo } from './Logo.js';
import { Button } from './Button.js';
import { icon } from './Icons.js';
import { esc, each } from '../lib/html.js';

export const Navbar = ({ site }) => `
<header class="nav" data-nav>
  <div class="nav__inner">
    ${Logo()}
    <nav class="nav__links" aria-label="Primary">
      <ul>${each(site.nav, (l) => `<li><a href="${l.href}" data-nav-link>${esc(l.label)}</a></li>`)}</ul>
    </nav>
    <div class="nav__actions">
      ${Button({ label: 'Book a Call', variant: 'primary', book: true, attrs: 'data-size="sm"' })}
      <button class="nav__toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" data-menu-toggle>
        <span class="sr-only">Open menu</span>
        <span class="nav__burger" aria-hidden="true"><i></i><i></i></span>
      </button>
    </div>
  </div>
</header>

<div class="menu" id="mobile-menu" data-menu hidden>
  <nav class="menu__inner" aria-label="Mobile">
    <ol class="menu__links">
      ${each(site.nav, (l, i) => `<li style="--i:${i}"><a href="${l.href}" data-menu-link><span class="menu__num">0${i + 1}</span>${esc(l.label)}</a></li>`)}
    </ol>
    <div class="menu__foot">
      ${Button({ label: 'Book a Free Consultation', book: true })}
      <ul class="menu__social">${each(site.socials, (s) => `<li><a href="${s.href}" target="_blank" rel="noopener" aria-label="FD Web Designs on ${s.label} (opens in a new tab)">${icon(s.icon)}</a></li>`)}</ul>
    </div>
  </nav>
</div>`;
