import React from 'react';

export interface ServiceRowProps {
  name: string;
  note: string;
  amount: string;
  qualifier?: string;
  /** Position in the visible list, used to stagger the entrance. */
  index: number;
}

export function ServiceRow({ name, note, amount, qualifier, index }: ServiceRowProps): React.ReactElement {
  return (
    <li
      className="animate-row-in border-b border-border/60 py-5 last:border-b-0 motion-reduce:animate-none"
      style={{ animationDelay: `${Math.min(index, 12) * 28}ms` }}
    >
      <div className="flex items-baseline gap-3">
        <h4 className="min-w-0 text-lg font-light leading-snug md:text-xl">{name}</h4>
        <span
          aria-hidden="true"
          className="hidden flex-1 translate-y-[-0.3rem] border-b border-dotted border-border sm:block"
        />
        <p className="ml-auto flex shrink-0 items-baseline gap-1.5 tabular-nums">
          <span className="text-lg font-light md:text-xl">{amount}</span>
          {qualifier ? (
            <span className="text-xs font-normal uppercase tracking-wider text-muted-foreground">
              {qualifier}
            </span>
          ) : null}
        </p>
      </div>
      <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">{note}</p>
    </li>
  );
}
