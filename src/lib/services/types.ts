import type { Language } from '../../contexts/LanguageContext';

export type ServiceCategoryId = 'web' | 'extras' | 'retainer' | 'email' | 'ai';

/**
 * How a price should be read. The amount itself is stored as a number so it
 * formats per locale; the unit carries the meaning the number cannot.
 */
export type PriceUnit = 'project' | 'from' | 'monthly' | 'each' | 'plusRetainer';

export interface ServicePrice {
  amount: number;
  /** Upper bound of a range, when the service is quoted as a span. */
  max?: number;
  unit: PriceUnit;
}

export interface ServiceEntry {
  id: string;
  category: ServiceCategoryId;
  price: ServicePrice;
}

export interface ServiceCopy {
  name: string;
  /** One line on when this applies. Outcome, not feature list. */
  note: string;
}

export type ServiceCopyMap = Record<string, ServiceCopy>;

export interface CategoryCopy {
  label: string;
  /** Short framing shown above the list once a category is active. */
  blurb: string;
}

export type CategoryCopyMap = Record<ServiceCategoryId, CategoryCopy>;

export interface ServicesCopy {
  lead: string;
  title: string;
  categories: CategoryCopyMap;
  services: ServiceCopyMap;
  units: Record<Exclude<PriceUnit, 'project' | 'from'>, string>;
  currencyNote: string;
  ctaLabel: string;
  ctaNote: string;
}

export type ServicesCopyByLanguage = Record<Language, ServicesCopy>;
