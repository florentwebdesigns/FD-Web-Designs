// Portfolio projects. Add a new client by copying one object below.
//
// Images: put responsive files in public/images/projects/ named
//   <image>-desktop-800.webp / -1440.webp (+ .avif) for the desktop screenshot
//   <image>-mobile-400.webp  / -780.webp  (+ .avif) for the phone screenshot
// tools/capture-mockups.mjs + tools/optimize-images.py generate them for you.
// The current images are design placeholders: swap in real screenshots.
//
// `featured: true` puts the project in the large lead slot.
// `url` is the live website. Leave it empty to hide the "Visit live site" link.

export const projects = [
  {
    slug: 'johnny-electrical',
    name: 'Johnny Electrical',
    industry: 'Electrical Contractor',
    year: '', // [ADD YEAR] e.g. '2025'
    featured: true,
    accent: '#ffb81c',
    image: 'johnny-electrical',
    url: '', // [ADD LIVE URL]
    description:
      'A bold, high-contrast site for a residential and commercial electrician, built to make the phone ring and the quote form fill up.',
    challenge:
      'Customers needed to see at a glance that this is a professional, reliable crew, and get in touch without hunting for a phone number.',
    approach:
      'A confident dark-and-amber identity, service pages organized by the jobs people actually search for, and quote buttons placed at every natural decision point.',
    services: ['Custom Design', 'Development', 'Mobile Responsive', 'Lead Generation', 'SEO Foundations'],
  },
  {
    slug: 'basco-plumbing-heating',
    name: 'Basco Plumbing & Heating',
    industry: 'Plumbing & HVAC',
    year: '', // [ADD YEAR] e.g. '2025'
    accent: '#e4572e',
    image: 'basco-plumbing',
    url: '', // [ADD LIVE URL]
    description:
      'A clean, trustworthy website for a plumbing and heating company, centered on fast online booking and clear service information.',
    challenge:
      'Homeowners with a leak or a cold house want answers fast. The old experience made them call and wait to find out what was offered.',
    approach:
      'A calm navy palette with a warm accent, an emergency line always in view, and a three-step booking flow that removes phone tag.',
    services: ['Website Redesign', 'Booking System', 'Mobile Responsive', 'Google Business Profile'],
  },
  {
    slug: 'beauty-by-diella',
    name: 'Beauty by Diella',
    industry: 'Makeup Artist · NJ & NYC',
    year: '', // [ADD YEAR] e.g. '2025'
    accent: '#c9a27e',
    image: 'beauty-by-diella', // real screenshots of beautybydiella.com
    url: 'https://beautybydiella.com/',
    description:
      'A dark, editorial website for makeup artist Diella Borici, serving New Jersey and New York City across bridal, editorial and special events.',
    challenge:
      'Her work lived on social media. She needed a home that felt as polished as her looks, showed the full range of her portfolio, and made booking simple.',
    approach:
      'A cinematic dark palette with warm rose-gold light, elegant serif typography, a portfolio organized by category, and Book Now always one tap away.',
    services: ['Custom Design', 'Development', 'Portfolio Gallery', 'Booking', 'Mobile Responsive'],
  },
];
