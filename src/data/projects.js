// Portfolio projects. Add a new client by copying one object below.
//
// Images: put responsive files in public/images/projects/ named
//   <image>-desktop-800.webp / -1440.webp (+ .avif) for the desktop screenshot
//   <image>-mobile-400.webp  / -780.webp  (+ .avif) for the phone screenshot
// tools/capture-mockups.mjs + tools/optimize-images.py generate them for you.
//
// `featured: true` puts the project in the large lead slot.
// `url` is the live website. Leave it empty to hide the "Visit live site" link.

export const projects = [
  {
    slug: 'rays-hvac',
    name: 'Rays HVAC',
    industry: 'Heating & Air Conditioning',
    year: '', // [ADD YEAR] e.g. '2025'
    featured: true,
    accent: '#3d8bff',
    image: 'rays-hvac',
    url: '', // [ADD LIVE URL]
    description:
      'A sleek, night-blue website for a local heating and air conditioning company, built so homeowners with a broken system can call in one tap.',
    challenge:
      'When the heat or AC goes out, people are stressed and scrolling fast. The site had to feel trustworthy right away and put the phone number everywhere.',
    approach:
      'A cool navy and ice-blue identity, an interactive thermostat in the hero, clear service cards for heating, cooling and maintenance, and call buttons at every step.',
    services: ['Custom Design', 'Development', 'Interactive Hero', 'Request Form', 'Mobile Responsive'],
  },
  {
    slug: 'select-plumbing',
    name: 'Select Plumbing Leak Investigators',
    industry: 'Leak Detection · Sugar Land, TX',
    year: '', // [ADD YEAR] e.g. '2025'
    accent: '#39c6e0',
    image: 'select-plumbing',
    url: '', // [ADD LIVE URL]
    description:
      'A precise, high-tech website for a leak detection specialist serving Sugar Land and the greater Houston area, for homes and businesses.',
    challenge:
      'Hidden leaks are hard to explain. Customers needed to understand the service quickly and trust that this team finds the source without tearing up their home.',
    approach:
      'A thermal-scan inspired hero, a clean step-by-step process, a gallery of real investigations, and a booking form plus click-to-call on every screen.',
    services: ['Custom Design', 'Development', 'Service Pages', 'Booking Form', 'Mobile Responsive'],
  },
  {
    slug: 'basco-plumbing-heating',
    name: 'Basco Plumbing & Heating',
    industry: 'Plumbing & Heating · South Orange, NJ',
    year: '', // [ADD YEAR] e.g. '2025'
    accent: '#e8772e',
    image: 'basco-plumbing',
    url: '', // [ADD LIVE URL]
    description:
      'A dark, trustworthy website for a family plumbing and heating company serving South Orange, Maplewood and Short Hills since 2012.',
    challenge:
      'Homeowners with a leak or a cold house want answers fast, and they want to know they are calling someone local they can trust.',
    approach:
      'A deep navy palette with a warm orange accent, the phone number and booking button always in reach, real customer reviews up front, and a simple online booking form.',
    services: ['Custom Design', 'Development', 'Booking Form', 'Review Showcase', 'Mobile Responsive'],
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
