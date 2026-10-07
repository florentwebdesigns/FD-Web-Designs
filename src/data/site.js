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
    // [CONFIRM] Replace with the Facebook page's direct URL (facebook.com/yourpage).
    { label: 'Facebook', handle: 'FD Web Designs', href: 'https://www.facebook.com/search/top?q=FD%20Web%20Designs', icon: 'facebook' },
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
