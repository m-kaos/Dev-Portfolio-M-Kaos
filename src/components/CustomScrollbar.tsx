import React, { useEffect, useRef, useState } from 'react';

interface CustomScrollbarProps {
  containerRef?: React.RefObject<HTMLElement>;
  lineCount?: number;
  activeLinesCount?: number;
}

const WIDTH_BY_DISTANCE = [18, 12, 8, 5];
const BASE_WIDTH = 3;

function widthFor(distance: number, activeLinesCount: number): number {
  if (distance >= WIDTH_BY_DISTANCE.length) return BASE_WIDTH;
  if (distance >= activeLinesCount) return BASE_WIDTH;
  return WIDTH_BY_DISTANCE[distance];
}

const CustomScrollbar: React.FC<CustomScrollbarProps> = ({
  containerRef,
  lineCount = 40,
  activeLinesCount = 3,
}) => {
  // Only the active index lives in state, so a scroll tick re-renders at most
  // `lineCount` times over the whole page instead of on every scroll event.
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const target = containerRef?.current;

    const measure = (): void => {
      frameRef.current = null;

      const scrollTop = target ? target.scrollTop : window.scrollY;
      const scrollHeight = target ? target.scrollHeight : document.documentElement.scrollHeight;
      const clientHeight = target ? target.clientHeight : window.innerHeight;

      const scrollable = scrollHeight - clientHeight;
      const ratio = scrollable > 0 ? scrollTop / scrollable : 0;
      const index = Math.min(lineCount - 1, Math.max(0, Math.round(ratio * (lineCount - 1))));

      setActiveIndex((previous) => (previous === index ? previous : index));
    };

    const onScroll = (): void => {
      if (frameRef.current !== null) return;
      frameRef.current = requestAnimationFrame(measure);
    };

    measure();

    const source: Window | HTMLElement = target ?? window;
    source.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      source.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [containerRef, lineCount]);

  return (
    <div className="pointer-events-none fixed right-6 top-0 z-50 hidden h-screen items-center md:flex">
      <div className="flex h-[85vh] flex-col items-end justify-between gap-[2px]">
        {Array.from({ length: lineCount }).map((_, index) => {
          const width = widthFor(Math.abs(index - activeIndex), activeLinesCount);
          return (
            <div
              key={index}
              className="rounded-full bg-accent transition-[width,opacity] duration-300 ease-out motion-reduce:transition-none"
              style={{ height: '2px', width: `${width}px`, opacity: width > BASE_WIDTH ? 1 : 0.5 }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CustomScrollbar;
