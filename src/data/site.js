// Business details used across the site, SEO metadata and structured data.
// Anything in [BRACKETS] is a placeholder: replace it before launch.

export const site = {
  name: 'FD Web Designs LLC',
  shortName: 'FD Web Designs',
  tagline: 'We build websites that build businesses.',
  descriptor: 'Premium Web Design & Development',
  url: 'https://www.fdwebdesigns.com', // [CONFIRM DOMAIN]
  title: 'FD Web Designs LLC | Premium Web Design & Development',
  description:
    'FD Web Designs LLC creates premium, high-converting websites for businesses looking to build credibility, attract customers, and grow online.',
  ogImage: '/images/og-image.png',
  locale: 'en_US',

  email: '[ADD BUSINESS EMAIL]',
  phone: '[ADD BUSINESS PHONE]',
  serviceArea: 'Serving businesses locally and nationwide.',
  address: {
    // Optional. Fill in to strengthen local SEO, or leave blank to omit.
    locality: '',
    region: '',
    country: 'US',
  },

  socials: [
    { label: 'Instagram', href: '#', icon: 'instagram' }, // [ADD INSTAGRAM URL]
    { label: 'Facebook', href: '#', icon: 'facebook' }, // [ADD FACEBOOK URL]
    { label: 'TikTok', href: '#', icon: 'tiktok' }, // [ADD TIKTOK URL]
    { label: 'LinkedIn', href: '#', icon: 'linkedin' }, // [ADD LINKEDIN URL]
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
  // into `url` and every BOOK A CALL button opens it. Leave it empty and the
  // buttons scroll to the contact form with "Book a call" preselected.
  booking: {
    provider: 'calendly', // label only
    url: '',
  },

  // Contact form: set `endpoint` to a form backend (Formspree, Basin, Getform,
  // your own API, ...). The form POSTs JSON. Leave empty to run in demo mode.
  form: {
    endpoint: '',
  },
};
