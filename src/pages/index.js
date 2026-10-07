// Composes the home page from components and data.
import { site } from '../data/site.js';
import { projects } from '../data/projects.js';
import { services, pillars, processSteps, stats, plans, testimonials, formOptions } from '../data/content.js';
import { esc, isPlaceholder } from '../lib/html.js';

import { Navbar } from '../components/Navbar.js';
import { Hero } from '../components/Hero.js';
import { PortfolioPreview } from '../components/PortfolioPreview.js';
import { Portfolio } from '../components/Portfolio.js';
import { CaseStudyDialog } from '../components/PortfolioCard.js';
import { Services } from '../components/Services.js';
import { WhyUs } from '../components/WhyUs.js';
import { Stats } from '../components/Stats.js';
import { Process } from '../components/Process.js';
import { Pricing } from '../components/Pricing.js';
import { Cinematic } from '../components/Cinematic.js';
import { Testimonials } from '../components/Testimonials.js';
import { CTA } from '../components/CTA.js';
import { ContactForm } from '../components/ContactForm.js';
import { Footer } from '../components/Footer.js';

export const FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap';

/** schema.org structured data for local/business SEO. */
function structuredData() {
  const sameAs = site.socials.map((s) => s.href).filter((h) => /^https?:/.test(h));
  const business = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: site.name,
    description: site.description,
    url: site.url,
    logo: `${site.url}/favicon.svg`,
    image: `${site.url}${site.ogImage}`,
    slogan: site.tagline,
    areaServed: 'United States',
    knowsAbout: services.map((s) => s.name),
    makesOffer: services.slice(0, 6).map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.name } })),
  };
  if (!isPlaceholder(site.email)) business.email = site.email;
  if (!isPlaceholder(site.phone)) business.telephone = site.phone;
  if (site.address.locality) {
    business.address = { '@type': 'PostalAddress', addressLocality: site.address.locality, addressRegion: site.address.region, addressCountry: site.address.country };
  }
  if (sameAs.length) business.sameAs = sameAs;
  const website = { '@context': 'https://schema.org', '@type': 'WebSite', name: site.shortName, url: site.url };
  return JSON.stringify([business, website]);
}

/** <head> contents (without the <head> tag itself). */
export function renderHead({ css = '', inlineCss = '' } = {}) {
  return `
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(site.title)}</title>
<meta name="description" content="${esc(site.description)}">
<link rel="canonical" href="${site.url}/">
<meta name="theme-color" content="#05060a">
<meta name="color-scheme" content="dark">

<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(site.title)}">
<meta property="og:description" content="${esc(site.description)}">
<meta property="og:url" content="${site.url}/">
<meta property="og:image" content="${site.url}${site.ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="${site.locale}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(site.title)}">
<meta name="twitter:description" content="${esc(site.description)}">
<meta name="twitter:image" content="${site.url}${site.ogImage}">

<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<link rel="manifest" href="site.webmanifest">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS_HREF}">
${css ? `<link rel="stylesheet" href="${css}">` : ''}
${inlineCss ? `<style>${inlineCss}</style>` : ''}
<script type="application/ld+json">${structuredData()}</script>`;
}

/** Everything inside <body>. */
export function renderBody() {
  return `
<a class="skip-link" href="#main">Skip to content</a>
<div class="ambient" aria-hidden="true"><div class="ambient__glow" data-glow></div><div class="ambient__noise"></div></div>
${Navbar({ site })}
<main id="main">
  ${Hero()}
  ${PortfolioPreview({ projects })}
  ${Portfolio({ projects })}
  ${Services({ services })}
  ${WhyUs({ pillars })}
  ${Stats({ stats })}
  ${Process({ steps: processSteps })}
  ${Pricing({ plans })}
  ${Cinematic()}
  ${Testimonials({ testimonials })}
  ${CTA()}
  ${ContactForm({ site, formOptions })}
</main>
${Footer({ site })}
${CaseStudyDialog({ projects })}
<div class="cursor" aria-hidden="true" data-cursor-el><span data-cursor-label>View</span></div>
<script id="site-config" type="application/json">${JSON.stringify({ booking: site.booking, form: site.form })}</script>`;
}
