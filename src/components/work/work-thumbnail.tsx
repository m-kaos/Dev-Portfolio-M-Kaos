import React, { useState } from 'react';

interface WorkThumbnailProps {
  src?: string;
  title: string;
  url: string;
}

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

/**
 * Static preview for a work item. Renders a lazy-loaded screenshot when one
 * exists, and falls back to a typographic tile built from the domain so a
 * project can ship before its screenshot does.
 */
export function WorkThumbnail({ src, title, url }: WorkThumbnailProps): React.ReactElement {
  const [failed, setFailed] = useState<boolean>(false);
  const domain = getDomain(url);

  if (!src || failed) {
    return (
      <div className="flex h-full w-full flex-col justify-end gap-1 bg-secondary p-4">
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Preview</span>
        <span className="truncate font-mono text-sm text-accent">{domain}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`${title} homepage`}
      width={800}
      height={500}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover object-left-top grayscale transition-[filter,transform] duration-500 ease-out will-change-transform group-hover:scale-[1.03] group-hover:grayscale-0 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
    />
  );
}
