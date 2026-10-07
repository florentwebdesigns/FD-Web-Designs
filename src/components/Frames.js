import { ProjectPicture } from '../lib/images.js';
import { esc } from '../lib/html.js';

const host = (p) => {
  try { return new URL(p.url).host.replace(/^www\./, ''); }
  catch { return p.name; }
};

/** Desktop browser window showing a project's homepage screenshot. */
export const BrowserFrame = ({ project, sizes = '(min-width: 1100px) 60vw, 92vw', eager = false, full = false }) => `
<div class="browser${full ? ' browser--full' : ''}" style="--accent:${project.accent}">
  <div class="browser__bar" aria-hidden="true">
    <span class="browser__dots"><i></i><i></i><i></i></span>
    <span class="browser__url">${esc(host(project))}</span>
    <span class="browser__spacer"></span>
  </div>
  <div class="browser__view">
    <div class="browser__scroll">
      ${ProjectPicture({ base: project.image, variant: 'desktop', alt: `${project.name} website homepage design`, sizes, eager })}
    </div>
  </div>
</div>`;

/** Phone frame showing the mobile version of a project. */
export const PhoneFrame = ({ project, full = false }) => `
<div class="phone${full ? ' phone--full' : ''}" aria-hidden="${full ? 'false' : 'true'}">
  <div class="phone__screen">
    <div class="phone__scroll">
      ${ProjectPicture({ base: project.image, variant: 'mobile', alt: full ? `${project.name} website on a phone` : '', sizes: '(min-width: 900px) 240px, 40vw' })}
    </div>
  </div>
</div>`;
