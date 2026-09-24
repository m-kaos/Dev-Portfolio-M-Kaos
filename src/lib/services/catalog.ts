import type { ServiceCategoryId, ServiceEntry } from './types';

/** Display order of the category filter. */
export const SERVICE_CATEGORY_ORDER: ServiceCategoryId[] = [
  'web',
  'extras',
  'retainer',
  'email',
  'ai',
];

/** ISO 4217 code the catalogue is quoted in. Change here only. */
export const SERVICE_CURRENCY = 'MXN';

/**
 * Structure only: identity, grouping and price. Every word a visitor reads
 * lives in the per-language copy files so a price change never touches prose.
 */
export const SERVICE_CATALOG: ServiceEntry[] = [
  { id: 'repair', category: 'web', price: { amount: 1500, max: 3000, unit: 'project' } },
  { id: 'translation', category: 'web', price: { amount: 3000, unit: 'project' } },
  { id: 'migration', category: 'web', price: { amount: 3000, max: 8000, unit: 'project' } },
  { id: 'landing', category: 'web', price: { amount: 3000, unit: 'project' } },
  { id: 'multipage', category: 'web', price: { amount: 6000, unit: 'project' } },
  { id: 'storePlatform', category: 'web', price: { amount: 15000, max: 25000, unit: 'project' } },
  { id: 'storeCustom', category: 'web', price: { amount: 10000, unit: 'project' } },
  { id: 'storeDashboard', category: 'web', price: { amount: 3000, unit: 'project' } },
  { id: 'webApp', category: 'web', price: { amount: 30000, unit: 'from' } },
  { id: 'integrationDashboard', category: 'web', price: { amount: 6000, unit: 'project' } },

  { id: 'booking', category: 'extras', price: { amount: 1000, unit: 'project' } },
  { id: 'payments', category: 'extras', price: { amount: 3000, unit: 'project' } },
  { id: 'formToCrm', category: 'extras', price: { amount: 1500, unit: 'project' } },
  { id: 'quoterFormula', category: 'extras', price: { amount: 500, unit: 'project' } },
  { id: 'quoterApi', category: 'extras', price: { amount: 1500, unit: 'project' } },
  { id: 'seo', category: 'extras', price: { amount: 1500, unit: 'project' } },
  { id: 'pixels', category: 'extras', price: { amount: 2000, unit: 'project' } },
  { id: 'autoBlog', category: 'extras', price: { amount: 3000, unit: 'project' } },
  { id: 'autoMetrics', category: 'extras', price: { amount: 3000, unit: 'project' } },
  { id: 'webAgent', category: 'extras', price: { amount: 5000, unit: 'plusRetainer' } },

  { id: 'retainer', category: 'retainer', price: { amount: 1000, unit: 'monthly' } },

  { id: 'emailSingle', category: 'email', price: { amount: 500, unit: 'each' } },
  { id: 'emailPack', category: 'email', price: { amount: 1500, unit: 'monthly' } },
  { id: 'emailFlows', category: 'email', price: { amount: 2500, unit: 'project' } },
  { id: 'emailSetup', category: 'email', price: { amount: 15000, unit: 'project' } },

  { id: 'aiAgent', category: 'ai', price: { amount: 15000, unit: 'from' } },
  { id: 'aiPlatform', category: 'ai', price: { amount: 1000, unit: 'project' } },
  { id: 'aiPdf', category: 'ai', price: { amount: 2000, unit: 'project' } },
  { id: 'aiVoiceIn', category: 'ai', price: { amount: 2000, unit: 'project' } },
  { id: 'aiVoiceOut', category: 'ai', price: { amount: 5000, unit: 'project' } },
  { id: 'aiImages', category: 'ai', price: { amount: 3000, unit: 'project' } },
  { id: 'aiEmailSending', category: 'ai', price: { amount: 1000, unit: 'project' } },
  { id: 'aiCustomApi', category: 'ai', price: { amount: 3000, unit: 'project' } },
];
