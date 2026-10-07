# FD Web Designs LLC website

A static, production-ready agency site. Components render to plain HTML at build
time (good for SEO and speed); a small script bundle adds the motion and
interactions. No framework, one runtime dependency (Lenis smooth scroll).

## Commands

```bash
npm install
npm run dev       # build + serve dist/ at http://localhost:4173, rebuilds on save
npm run build     # production build -> dist/ (upload this folder to any static host)
npm run preview   # single-file preview build -> preview/
npm run mockups   # regenerate placeholder project screenshots (needs Playwright + Python Pillow)
npm run og        # regenerate the social share image + apple-touch-icon
```

Deploy `dist/` to any static host. This repo is set up for Vercel (`vercel.json`): pushes to `main` build with `npm run build` and serve `dist/`.

## Where to edit things

| What | File |
| --- | --- |
| Business email, phone, socials, domain, booking link, form endpoint | `src/data/site.js` |
| Portfolio projects | `src/data/projects.js` |
| Services, pillars, process, stats, pricing, testimonials, form options | `src/data/content.js` |
| Page order / SEO head / structured data | `src/pages/index.js` |
| Section markup | `src/components/*.js` |
| Colors, fonts, spacing tokens | `src/styles/tokens.css` |

### Before launch, replace every `[PLACEHOLDER]`

Search the `src/data` folder for `[` to find them:

- **Email & phone**: `site.email`, `site.phone`. Placeholders are shown as-is and
  left out of the structured data until filled in.
- **Social links**: `site.socials[].href`.
- **Domain**: `site.url` (also update `public/robots.txt` and `public/sitemap.xml`).
- **Pricing**: `plans[].price` in `content.js`. Unfilled prices display `[ADD PRICE]`.
- **Testimonials**: replace the quotes, names and companies, and set `placeholder: false`
  (placeholder reviews are labeled "Placeholder review" on the page).
- **Stats**: confirm the "20+ websites built" figure.
- **Project years and live URLs**: `year` and `url` in `projects.js`.

### Adding a portfolio project

1. Copy an object in `src/data/projects.js` and fill it in (`slug`, `name`, `industry`,
   `description`, `challenge`, `approach`, `services`, `accent`, `url`).
2. Add screenshots to `public/images/projects/` named
   `<image>-desktop-800.webp`, `<image>-desktop-1440.webp`, `<image>-mobile-400.webp`,
   `<image>-mobile-780.webp` (AVIF versions optional but recommended).
   Easiest route: save a full-page PNG of the live site as
   `tools/.cache/captures/<image>-desktop.png` and `<image>-mobile.png`, then run
   `python3 tools/optimize-images.py`. It resizes, converts and records image sizes.
3. Rebuild. The project appears in the showcase and gets its own case-study view.

The current Johnny Electrical, Basco and Beauty by Diella images are **design
placeholders** made in `tools/mockups/`. Swap them for real screenshots.

### Booking

Set `site.booking.url` to a Calendly / Cal.com / TidyCal link and every
"Book a call" button opens it. While it's empty, those buttons scroll to the
contact form with "Book a call" selected.

### Contact form

Set `site.form.endpoint` to a form backend (Formspree, Basin, Getform, or your
own API). The form POSTs JSON with: `intent`, `start`, `name`, `business`,
`email`, `phone`, `business_type`, `website`, `looking_for[]`, `budget`,
`message`. While the endpoint is empty the form runs in demo mode (validates,
shows the success state, logs the data to the console). Includes a honeypot
field for basic spam filtering.

## Architecture

```
src/
  data/          content as structured data
  components/    Navbar, Hero, PortfolioPreview, Portfolio, PortfolioCard,
                 Frames, Services, WhyUs, Stats, Process, Pricing, Cinematic,
                 Testimonials, CTA, ContactForm, Footer, Button, Icons, Logo
  pages/         page composition + <head> (SEO, Open Graph, JSON-LD)
  scripts/       main.js + modules/ (scroll, nav, reveal, intro, pointer,
                 heroField canvas, scrollfx, counters, testimonials,
                 projectDialog, form)
  styles/        tokens, base, chrome (nav/buttons), hero, portfolio, sections, motion
public/          static files copied as-is (images, favicon, robots, sitemap)
tools/           mockup capture, image optimizer, OG image generator
```

## Motion, accessibility and performance notes

- All content is in the HTML. Hidden "before" animation states only apply when
  script runs and the visitor allows motion; `prefers-reduced-motion` turns
  off smooth scrolling, the canvas loop, parallax, counters and autoplay.
- One shared `requestAnimationFrame` loop; scroll effects only compute for
  elements near the viewport; the hero canvas pauses off-screen and in
  background tabs, caps pixel ratio at 1.5 and uses fewer points on phones.
- Portfolio images are responsive AVIF/WebP with explicit sizes and lazy loading.
- Skip link, visible focus states, labelled controls, native `<dialog>` for case
  studies (focus trap + Esc), keyboard-operable carousel, accessible form errors.
