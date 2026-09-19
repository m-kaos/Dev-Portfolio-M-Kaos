import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { WorkThumbnail } from './work-thumbnail';

export interface WorkItem {
  id: number;
  title: string;
  date: string;
  description: string;
  url: string;
  thumbnail?: string;
}

interface WorkCardProps {
  item: WorkItem;
}

export function WorkCard({ item }: WorkCardProps): React.ReactElement {
  const { theme } = useTheme();

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block rounded-2xl p-8 transition-[background-color,border-color,box-shadow] duration-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
        theme === 'glass'
          ? 'glass-card hover:bg-white/20'
          : 'border border-border hover:border-accent'
      }`}
    >
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="flex-1">
          <p className="mb-2 text-sm font-medium text-accent">{item.date}</p>
          <h4 className="mb-3 flex items-start gap-2 text-2xl font-light">
            {item.title}
            <ArrowUpRight
              size={20}
              aria-hidden="true"
              className="mt-1 flex-shrink-0 text-muted-foreground transition-colors duration-200 group-hover:text-accent"
            />
          </h4>
          <p className="text-muted-foreground">{item.description}</p>
        </div>

        <div className="h-48 w-full flex-shrink-0 overflow-hidden rounded-lg border border-border md:w-80">
          <WorkThumbnail src={item.thumbnail} title={item.title} url={item.url} />
        </div>
      </div>
    </a>
  );
}
