import React, { useMemo } from 'react';
import workItemsData from '../data/workItems.json';
import { WorkCard, WorkItem } from './work/work-card';

interface WorkItemData {
  id: number;
  url: string;
  description: string;
  order: number;
  title?: string;
  date?: string;
  thumbnail?: string;
}

const MyWork: React.FC = () => {
  const workItems = useMemo<WorkItem[]>(
    () =>
      (workItemsData as WorkItemData[])
        .slice()
        .sort((a, b) => a.order - b.order)
        .map((item) => ({
          id: item.id,
          title: item.title || 'Untitled Project',
          date: item.date || new Date().getFullYear().toString(),
          description: item.description,
          url: item.url,
          thumbnail: item.thumbnail,
        })),
    [],
  );

  return (
    <section className="min-h-screen px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 flex items-center justify-between">
          <h2 className="text-6xl font-light md:text-8xl">01</h2>
          <h3 className="text-3xl font-light md:text-4xl">Featured work</h3>
        </div>

        <div className="space-y-12">
          {workItems.map((item) => (
            <WorkCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyWork;
