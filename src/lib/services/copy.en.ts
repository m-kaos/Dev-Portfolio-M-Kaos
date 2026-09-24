import type { CategoryCopyMap, ServiceCopyMap } from './types';

export const SERVICE_CATEGORIES_EN: CategoryCopyMap = {
  web: { label: 'Web', blurb: 'Sites and applications, from a one-off fix to a full platform.' },
  extras: { label: 'Add-ons', blurb: 'Pieces that bolt onto a site you already have.' },
  retainer: { label: 'Retainer', blurb: 'Ongoing work at a fixed monthly rate.' },
  email: { label: 'Email', blurb: 'Campaigns and flows that keep selling after the visit.' },
  ai: { label: 'AI agents', blurb: 'Agents that operate the business, not just chat.' },
};

export const SERVICES_EN: ServiceCopyMap = {
  repair: { name: 'Repair or change', note: 'An existing site with a fault or a one-off change.' },
  translation: { name: 'Site translation', note: 'Your site needs to work in another language.' },
  migration: { name: 'Migration', note: 'Move platform or hosting without losing your ranking.' },
  landing: { name: 'Landing page', note: 'One offer, one action.' },
  multipage: { name: 'Multi-page site', note: 'An institutional or services site with several sections.' },
  storePlatform: { name: 'E-commerce on Shopify or Wix', note: 'A store on a platform, set up to sell.' },
  storeCustom: { name: 'Custom-built e-commerce', note: 'The platform is not enough, or you want full control.' },
  storeDashboard: { name: 'E-commerce dashboard', note: 'See your sales and edit content without entering the platform.' },
  webApp: { name: 'Web application', note: 'A custom CRM or ERP, an all-in-one integrator, your own AI.' },
  integrationDashboard: { name: 'Integration dashboard', note: 'Google, your CRM, your ERP and your calendar in one place.' },

  booking: { name: 'Appointment booking', note: 'Visitors book their own slot, straight into your calendar.' },
  payments: { name: 'Payment gateway', note: 'Take card payments from your own site.' },
  formToCrm: { name: 'Form to CRM', note: 'Every lead lands in your CRM, never in a forgotten inbox.' },
  quoterFormula: { name: 'Formula quote tool', note: 'Visitors get a price from your own formula.' },
  quoterApi: { name: 'API quote tool', note: 'Live quotes pulled from an external service.' },
  seo: { name: 'SEO', note: 'Get found for what you actually sell.' },
  pixels: { name: 'Tracking pixels', note: 'Your ads finally measure what happens after the click.' },
  autoBlog: { name: 'Automated blog', note: 'Articles that publish on schedule, reviewed before they go out.' },
  autoMetrics: { name: 'Automated reporting', note: 'The numbers arrive on their own, on the day you choose.' },
  webAgent: { name: 'Web AI agent', note: 'A chatbot on your site that answers and guides visitors.' },

  retainer: { name: 'Monthly retainer', note: 'Five hours of changes a month, plus maintenance, servers and domain.' },

  emailSingle: { name: 'HTML email', note: 'One designed campaign, tested in Gmail and Outlook.' },
  emailPack: { name: 'Pack of four emails', note: 'Four campaigns a month, written and sent.' },
  emailFlows: { name: 'Email flows', note: 'Abandoned cart, welcome, nurture or win-back, running on their own.' },
  emailSetup: { name: 'Full email marketing setup', note: 'Domain authentication, lists and first flows, from zero.' },

  aiAgent: { name: 'Custom AI agent', note: 'A WhatsApp agent wired to your CRM, your sheets or your calendar.' },
  aiPlatform: { name: 'Extra platform', note: 'One more platform connected to your agent.' },
  aiPdf: { name: 'PDF handling', note: 'The agent reads and fills your documents.' },
  aiVoiceIn: { name: 'Voice understanding', note: 'The agent understands voice notes.' },
  aiVoiceOut: { name: 'Voice replies', note: 'The agent answers out loud.' },
  aiImages: { name: 'Image generation', note: 'The agent creates images on request.' },
  aiEmailSending: { name: 'Email sending', note: 'The agent sends email on your behalf.' },
  aiCustomApi: { name: 'Custom API', note: 'Your own API so any system can talk to it.' },
};
