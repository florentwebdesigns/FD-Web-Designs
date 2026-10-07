// Section content: services, positioning pillars, process, stats, plans and
// testimonials. Edit text here; the layout updates automatically.

export const services = [
  { name: 'Custom Website Design', icon: 'design', text: 'Strategic, modern websites designed around your brand, customers, and goals.' },
  { name: 'Website Development', icon: 'code', text: 'Hand-built, fast, production-ready code that turns the design into a working site.' },
  { name: 'Mobile Responsive Design', icon: 'mobile', text: 'Layouts rethought for every screen, so phones get a first-class experience.' },
  { name: 'Website Redesigns', icon: 'redesign', text: 'A modern rebuild for outdated sites that no longer reflect the business.' },
  { name: 'Local Business Websites', icon: 'pin', text: 'Sites made for service areas, local search, and customers ready to call.' },
  { name: 'Conversion Optimization', icon: 'convert', text: 'Clear paths, strong calls to action, and fewer reasons for visitors to leave.' },
  { name: 'SEO Foundations', icon: 'search', text: 'Clean structure, metadata, and speed that give search engines what they need.' },
  { name: 'Google Business Profile Integration', icon: 'map', text: 'Your profile, reviews, and website working together to win local searches.' },
  { name: 'Booking & Lead Generation Systems', icon: 'calendar', text: 'Forms, scheduling, and lead capture that bring inquiries straight to you.' },
  { name: 'Website Maintenance', icon: 'wrench', text: 'Updates, backups, and content changes handled so your site stays sharp.' },
  { name: 'Hosting & Deployment', icon: 'cloud', text: 'Fast, secure hosting on modern infrastructure, set up and managed for you.' },
  { name: 'Custom Website Features', icon: 'spark', text: 'Galleries, calculators, portals, integrations: whatever your business needs.' },
];

export const pillars = [
  { title: 'Designed to Impress', text: 'Modern visual design that immediately establishes credibility.' },
  { title: 'Built to Convert', text: 'Strategic layouts and calls-to-action designed to turn visitors into leads.' },
  { title: 'Built for Your Business', text: "Every website is customized around the company's industry, customers, and goals." },
  { title: 'Fast & Responsive', text: 'Websites that look and perform beautifully across phones, tablets, and desktops.' },
  { title: 'Modern Technology', text: 'Modern development tools and deployment infrastructure for fast, scalable websites.' },
];

export const processSteps = [
  { title: 'Discovery', text: 'We learn about your business, customers, goals, and vision.' },
  { title: 'Design', text: 'We create a visual direction and website experience around your brand.' },
  { title: 'Development', text: 'The design becomes a fully responsive, production-ready website.' },
  { title: 'Review', text: 'We refine the website based on feedback and make final improvements.' },
  { title: 'Launch', text: 'Your website goes live and is ready to start generating business.' },
];

// [CONFIRM] Replace with your real numbers before launch. Only publish
// figures you can stand behind.
export const stats = [
  { value: 20, suffix: '+', label: 'Websites Built' },
  { value: 100, suffix: '%', label: 'Custom Designed' },
  { display: '24/7', label: 'Online Presence' },
  { display: '∞', label: 'Creative Possibilities' },
];

// [ADD PRICING] Placeholder packages. Set names, prices and inclusions.
export const plans = [
  {
    name: 'Launch',
    price: '[ADD PRICE]',
    cadence: 'one-time',
    summary: 'A polished, professional site for businesses getting online the right way.',
    features: ['Up to 5 custom-designed pages', 'Mobile responsive design', 'Contact form', 'SEO foundations', 'Google Business Profile link-up'],
  },
  {
    name: 'Growth',
    price: '[ADD PRICE]',
    cadence: 'one-time',
    featured: true,
    summary: 'Our most popular package for businesses ready to generate more leads.',
    features: ['Up to 10 custom-designed pages', 'Everything in Launch', 'Booking or quote request system', 'Conversion-focused copy structure', 'Analytics setup', 'Hosting & deployment'],
  },
  {
    name: 'Signature',
    price: '[ADD PRICE]',
    cadence: 'starting at',
    summary: 'A fully bespoke build with custom features and ongoing care.',
    features: ['Unlimited pages, fully custom', 'Everything in Growth', 'Custom features & integrations', 'Advanced animation & interactions', 'Priority support', 'Ongoing maintenance options'],
  },
];

// [ADD REVIEWS] Placeholder testimonials. Replace with real client reviews
// and set `placeholder: false`. Placeholder entries are labeled on the site.
export const testimonials = [
  {
    quote: 'FD Web Designs completely changed how our business looks online. The website feels professional, modern, and actually represents our company.',
    name: 'Client Name',
    company: 'Company Name',
    rating: 5,
    placeholder: true,
  },
  {
    quote: 'The entire process was smooth and the final website exceeded our expectations.',
    name: 'Client Name',
    company: 'Company Name',
    rating: 5,
    placeholder: true,
  },
  {
    quote: 'Professional design, great communication, and a website that actually helps our business.',
    name: 'Client Name',
    company: 'Company Name',
    rating: 5,
    placeholder: true,
  },
];

// Contact form options.
export const formOptions = {
  businessTypes: ['Home Services / Trades', 'Beauty & Wellness', 'Restaurant & Hospitality', 'Professional Services', 'Retail / E-commerce', 'Health & Medical', 'Real Estate', 'Other'],
  lookingFor: ['New website', 'Website redesign', 'Booking system', 'SEO foundations', 'Maintenance', 'Something custom'],
  budgets: ['Under $2k', '$2k–$5k', '$5k–$10k', '$10k+', 'Not sure yet'],
};
