import React, { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { SERVICE_CATALOG, SERVICE_CATEGORY_ORDER } from '../../lib/services/catalog';
import { formatPrice, getServicesCopy } from '../../lib/services/copy';
import type { ServiceCategoryId } from '../../lib/services/types';
import { CategoryTabs } from './category-tabs';
import { ServiceRow } from './service-row';
import { OPEN_QUICK_DM_EVENT } from '../../lib/events';

export function ServicesSection(): React.ReactElement {
  const { language } = useLanguage();
  const [active, setActive] = useState<ServiceCategoryId>('web');
  const copy = getServicesCopy(language);

  const tabs = useMemo(
    () =>
      SERVICE_CATEGORY_ORDER.map((id) => ({
        id,
        label: copy.categories[id].label,
        count: SERVICE_CATALOG.filter((entry) => entry.category === id).length,
      })),
    [copy],
  );

  const rows = useMemo(
    () =>
      SERVICE_CATALOG.filter((entry) => entry.category === active).map((entry) => ({
        id: entry.id,
        ...copy.services[entry.id],
        ...formatPrice(entry.price, language, copy),
      })),
    [active, copy, language],
  );

  return (
    <section className="min-h-screen px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-6xl font-light md:text-8xl">02</h2>
          <h3 className="text-3xl font-light md:text-4xl">{copy.title}</h3>
        </div>

        <p className="mb-12 max-w-2xl text-muted-foreground">{copy.lead}</p>

        <CategoryTabs tabs={tabs} active={active} onSelect={setActive} />

        <p className="mt-6 text-sm text-muted-foreground">{copy.categories[active].blurb}</p>

        <ul
          // Remounting on category change replays the staggered entrance.
          key={active}
          role="tabpanel"
          id={`services-panel-${active}`}
          aria-labelledby={`services-tab-${active}`}
          className="mt-2"
        >
          {rows.map((row, index) => (
            <ServiceRow
              key={row.id}
              name={row.name}
              note={row.note}
              amount={row.amount}
              qualifier={row.qualifier}
              index={index}
            />
          ))}
        </ul>

        <div className="mt-12 flex flex-col gap-6 border-t border-border pt-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-md">
            <p className="text-sm text-muted-foreground">{copy.ctaNote}</p>
            <p className="mt-1 text-xs text-muted-foreground">{copy.currencyNote}</p>
          </div>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent(OPEN_QUICK_DM_EVENT))}
            className="group inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-full border border-border px-6 text-sm transition-colors duration-200 hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {copy.ctaLabel}
            <ArrowRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
