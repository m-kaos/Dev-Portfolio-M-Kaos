import type { Language } from '../../contexts/LanguageContext';
import { SERVICE_CURRENCY } from './catalog';
import { SERVICE_CATEGORIES_EN, SERVICES_EN } from './copy.en';
import { SERVICE_CATEGORIES_ES, SERVICES_ES } from './copy.es';
import { SERVICE_CATEGORIES_FR, SERVICES_FR } from './copy.fr';
import type { ServicePrice, ServicesCopy, ServicesCopyByLanguage } from './types';

const LOCALES: Record<Language, string> = {
  en: 'en-US',
  es: 'es-MX',
  fr: 'fr-FR',
};

export const SERVICES_COPY: ServicesCopyByLanguage = {
  en: {
    lead: 'Fixed prices, written down. Pick what you need or describe the problem and I will point at the right one.',
    title: 'Services',
    categories: SERVICE_CATEGORIES_EN,
    services: SERVICES_EN,
    units: { monthly: '/mo', each: 'each', plusRetainer: '+ retainer' },
    currencyNote: 'Quoted in Mexican pesos. Scope agreed in writing before anything starts.',
    ctaLabel: 'Start a conversation',
    ctaNote: 'Not sure which one fits? Describe the problem, I will tell you the path.',
  },
  es: {
    lead: 'Precios fijos y por escrito. Elige lo que necesitas o cuéntame el problema y yo te señalo cuál es.',
    title: 'Servicios',
    categories: SERVICE_CATEGORIES_ES,
    services: SERVICES_ES,
    units: { monthly: '/mes', each: 'c/u', plusRetainer: '+ iguala' },
    currencyNote: 'Cotizado en pesos mexicanos. El alcance se acuerda por escrito antes de empezar.',
    ctaLabel: 'Empecemos a platicar',
    ctaNote: '¿No sabes cuál te toca? Cuéntame el problema y te digo el camino.',
  },
  fr: {
    lead: 'Des prix fixes, écrits noir sur blanc. Choisissez ce qu’il vous faut, ou décrivez le problème et je vous oriente.',
    title: 'Services',
    categories: SERVICE_CATEGORIES_FR,
    services: SERVICES_FR,
    units: { monthly: '/mois', each: 'pièce', plusRetainer: '+ forfait' },
    currencyNote: 'Tarifs en pesos mexicains. Le périmètre est convenu par écrit avant de commencer.',
    ctaLabel: 'Démarrer la conversation',
    ctaNote: 'Vous hésitez ? Décrivez le problème, je vous indique la voie.',
  },
};

export function getServicesCopy(language: Language): ServicesCopy {
  return SERVICES_COPY[language];
}

function formatAmount(amount: number, language: Language): string {
  return new Intl.NumberFormat(LOCALES[language], {
    style: 'currency',
    currency: SERVICE_CURRENCY,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Renders a price as the visitor should read it: a plain amount, a range, or
 * an amount qualified by its unit. Returns the parts separately so the row can
 * style the amount and its qualifier differently.
 */
export function formatPrice(
  price: ServicePrice,
  language: Language,
  copy: ServicesCopy,
): { amount: string; qualifier?: string } {
  const base = formatAmount(price.amount, language);

  if (price.max !== undefined) {
    // Only the lower bound carries the currency; repeating it reads as noise.
    const upper = new Intl.NumberFormat(LOCALES[language], { maximumFractionDigits: 0 }).format(price.max);
    return { amount: `${base} – ${upper}` };
  }

  if (price.unit === 'project') {
    return { amount: base };
  }

  if (price.unit === 'from') {
    // The trailing plus already says "starting at"; a prefix would break the
    // right-aligned price column.
    return { amount: `${base}+` };
  }

  return { amount: base, qualifier: copy.units[price.unit] };
}
