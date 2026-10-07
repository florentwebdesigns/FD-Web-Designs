import { Logo } from './Logo.js';
import { icon } from './Icons.js';
import { esc, each } from '../lib/html.js';

export const Footer = ({ site }) => `
<footer class="footer">
  <div class="footer__line" aria-hidden="true"></div>
  <div class="container">
    <div class="footer__top">
      <div class="footer__brand">
        ${Logo({ id: 'footer' })}
        <p class="footer__tag">${esc(site.tagline)}</p>
      </div>
      <nav class="footer__nav" aria-label="Footer">
        <p class="footer__heading">Quick links</p>
        <ul role="list">${each(site.nav, (l) => `<li><a href="${l.href}">${esc(l.label)}</a></li>`)}</ul>
      </nav>
      <div class="footer__social">
        <p class="footer__heading">Follow</p>
        <ul class="socials" role="list">${each(site.socials, (s) => `<li><a href="${s.href}" target="_blank" rel="noopener" aria-label="FD Web Designs on ${s.label} (opens in a new tab)">${icon(s.icon)}</a></li>`)}</ul>
      </div>
    </div>

    <p class="footer__word" aria-hidden="true">FD WEB DESIGNS</p>

    <div class="footer__bottom">
      <p>© <span data-year>${new Date().getFullYear()}</span> ${esc(site.name)}. All rights reserved.</p>
      <a class="footer__top-link" href="#top">Back to top ${icon('arrow', 'up')}</a>
    </div>
  </div>
</footer>`;
