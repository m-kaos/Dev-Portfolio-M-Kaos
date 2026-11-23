import React, { useEffect, useRef } from 'react';
import type { ServiceCategoryId } from '../../lib/services/types';

export interface CategoryTab {
  id: ServiceCategoryId;
  label: string;
  count: number;
}

export interface CategoryTabsProps {
  tabs: CategoryTab[];
  active: ServiceCategoryId;
  onSelect: (id: ServiceCategoryId) => void;
}

export function CategoryTabs({ tabs, active, onSelect }: CategoryTabsProps): React.ReactElement {
  const stripRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);
  const hasSelected = useRef(false);

  // On a narrow screen the strip scrolls, so the selected tab can sit off
  // screen and leave the panel looking unlabelled. Keep it in view.
  //
  // This has to move the strip and nothing else. `scrollIntoView` ignores that:
  // it walks every scrollable ancestor up to the document, so on mount it
  // dragged the whole page down to the services section. Scroll the strip by
  // the measured horizontal delta instead, and only once the visitor has
  // actually picked a category.
  useEffect(() => {
    if (!hasSelected.current) {
      hasSelected.current = true;
      return;
    }

    const strip = stripRef.current;
    const tab = activeRef.current;
    if (!strip || !tab) return;

    const stripBox = strip.getBoundingClientRect();
    const tabBox = tab.getBoundingClientRect();
    const delta = tabBox.left - stripBox.left - (stripBox.width - tabBox.width) / 2;

    strip.scrollBy({ left: delta, behavior: 'smooth' });
  }, [active]);

  return (
    // The strip scrolls on its own so a narrow screen never scrolls the page sideways.
    <div ref={stripRef} className="-mx-6 overflow-x-auto px-6 pb-px md:mx-0 md:px-0">
      <div role="tablist" aria-label="Service categories" className="flex w-max gap-1 border-b border-border md:w-full">
        {tabs.map((tab) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              ref={isActive ? activeRef : undefined}
              type="button"
              role="tab"
              id={`services-tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`services-panel-${tab.id}`}
              onClick={() => onSelect(tab.id)}
              className={`relative flex min-h-[44px] items-center gap-2 whitespace-nowrap px-4 text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
              <span className="text-xs tabular-nums text-muted-foreground">{tab.count}</span>
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 -bottom-px h-px transition-colors duration-200 ${
                  isActive ? 'bg-accent' : 'bg-transparent'
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
