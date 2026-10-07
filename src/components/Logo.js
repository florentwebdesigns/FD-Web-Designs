// FD mark: a solid F built from three bars beside an outlined D bowl.
// The gradient id is suffixed so the mark can appear more than once per page.

export const LogoMark = (id = 'a') => `
<svg class="logo-mark" viewBox="0 0 32 32" width="32" height="32" aria-hidden="true" focusable="false">
  <defs>
    <linearGradient id="fd-g-${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#4fd8ff"/>
      <stop offset=".5" stop-color="#3d6bff"/>
      <stop offset="1" stop-color="#9b6bff"/>
    </linearGradient>
  </defs>
  <path fill="currentColor" d="M3 4h12v4H7v4.5h6.5v4H7V28H3z"/>
  <path fill="none" stroke="url(#fd-g-${id})" stroke-width="3.2" d="M17.6 5.6h1.9a10.4 10.4 0 0 1 0 20.8h-1.9z"/>
  <rect x="25" y="2" width="3" height="3" fill="#4fd8ff"/>
</svg>`;

export const Logo = ({ id = 'nav', href = '#top' } = {}) => `
<a class="logo" href="${href}" aria-label="FD Web Designs, back to top">
  ${LogoMark(id)}
  <span class="logo-type" aria-hidden="true"><b>FD</b><span>WEB DESIGNS</span></span>
</a>`;
