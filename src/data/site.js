// Business details used across the site, SEO metadata and structured data.
// Anything in [BRACKETS] is a placeholder: replace it before launch.

export const site = {
  name: 'FD Web Designs LLC',
  shortName: 'FD Web Designs',
  tagline: 'We build websites that build businesses.',
  descriptor: 'Premium Web Design & Development',
  url: 'https://www.fdwebdesigns.org',
  title: 'FD Web Designs LLC | Premium Web Design & Development',
  description:
    'FD Web Designs LLC creates premium, high-converting websites for businesses of every kind, nationwide. Build credibility, attract customers, and grow online.',
  ogImage: '/images/og-image.png',
  locale: 'en_US',

  email: 'FDwebdesignz@gmail.com',
  // Shown in order on the contact section; the first is used in structured data.
  phones: [
    { display: '(732) 850-2086', tel: '+17328502086' },
    { display: '(973) 609-9663', tel: '+19736099663' },
  ],
  serviceArea: 'Websites for every kind of business, nationwide.',
  address: {
    // Optional. Fill in to strengthen local SEO, or leave blank to omit.
    locality: '',
    region: '',
    country: 'US',
  },

  socials: [
    { label: 'Instagram', handle: '@fdwebdesigns_LLC', href: 'https://www.instagram.com/fdwebdesigns_llc/', icon: 'instagram' },
    { label: 'Facebook', handle: 'FD Web Designs', href: 'https://www.facebook.com/FDWebDesignsLLC', icon: 'facebook' },
    // Add TikTok / LinkedIn here when those accounts exist (icons: 'tiktok', 'linkedin').
  ],

  nav: [
    { label: 'Home', href: '#top' },
    { label: 'Our Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ],

  // Booking: paste a Calendly / Cal.com / TidyCal / Google Calendar booking link
  // into `url` and every BOOK A FREE CONSULTATION button opens it. Leave it empty and the
  // buttons scroll to the contact form with "Schedule a meeting" preselected.
  booking: {
    provider: 'calendly', // label only
    url: '',
  },

  // Contact / booking form: on submit it opens the visitor's messages app with
  // their details filled in, addressed to `smsTo`. Optionally also set
  // `endpoint` to a form backend (Formspree, Basin, ...) to receive a JSON copy.
  // `sheetLog` = the Google Apps Script web app URL from docs/booking-log.gs:
  // every form request and Call button tap is saved as a row in your Sheet.
  form: {
    smsTo: '+17328502086',
    smsDisplay: '(732) 850-2086',
    endpoint: '',
    sheetLog: 'https://script.google.com/macros/s/AKfycbyaUMmbt77pEyOp4hqXfcxbaySPVMfvjSzRTP3CHx4uZLfJ5PQneQxr88q-Pg1xqz_P/exec',
  },
};
