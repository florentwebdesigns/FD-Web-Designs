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
  { value: 5, suffix: '+', label: 'Websites Built' },
  { value: 100, suffix: '%', label: 'Custom Designed' },
  { display: '24/7', label: 'Online Presence' },
  { display: '∞', label: 'Creative Possibilities' },
];

// Packages. `trial` / `ads` add the free-trial and ads-included highlights.
export const plans = [
  {
    name: 'Beginner',
    setup: '$1,000',
    monthly: '$500',
    bestFor: 'Small businesses that need a professional online presence.',
    features: ['3-page website', 'Mobile optimization', 'Click-to-call button', 'Contact / quote form', 'Fast loading', 'Basic SEO structure', 'Google Business Profile connection', 'Hosting & maintenance', 'Minor monthly edits'],
  },
  {
    name: 'Intermediate',
    setup: '$1,000',
    monthly: '$1,000',
    featured: true,
    trial: true,
    ads: true,
    includesPrevious: 'Beginner',
    bestFor: 'Established businesses looking to generate more calls and quote requests.',
    features: ['5-page professional website', 'Individual service sections / pages', 'Service area section', 'FAQ section', 'Google review integration', 'Lead-focused layout', 'Conversion optimization', 'Monthly content edits', 'Hosting & maintenance'],
  },
  {
    name: 'Maximum Growth',
    setup: '$1,000',
    monthly: '$2,000',
    trial: true,
    ads: true,
    includesPrevious: 'Intermediate',
    bestFor: 'Businesses building a stronger online presence. The best option for maximum professionalism.',
    features: ['8–10 page website', 'Individual pages for major services', 'Individual service-area pages', 'Advanced SEO structure', 'Google review integration', 'Lead / quote funnel', 'Conversion optimization', 'Analytics & lead tracking', 'Priority monthly updates', 'Hosting & maintenance'],
  },
];

// Client reviews. Entries with `placeholder: true` are NOT shown on the site;
// replace their text with a real review and set `placeholder: false`.
export const testimonials = [
  {
    quote: 'FD Web Designs completely changed how our business looks online. The website feels professional, modern, and actually represents our company.',
    name: "Basco's Plumbing & Heating",
    company: 'Plumbing & Heating',
    rating: 5,
    placeholder: false,
  },
  {
    quote: 'My website finally looks as polished as my work. It is elegant, easy for clients to browse, and booking with me has never been simpler. I could not be happier.',
    name: 'Beauty by Diella',
    company: 'Makeup Artist',
    rating: 5,
    placeholder: false,
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
  packages: ['Beginner', 'Intermediate', 'Maximum Growth', 'Not sure yet'],
};
