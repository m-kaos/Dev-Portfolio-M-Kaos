import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Opens every route at the top.
 *
 * Two separate things push a visitor down the page, and both are handled here:
 *
 * 1. The browser restores the previous scroll offset on reload. `index.tsx`
 *    turns that off, but the offset can already be applied by the time React
 *    mounts, so the first paint still needs a reset.
 * 2. React Router keeps the window scroll across navigations, so moving from a
 *    link halfway down the home page into a post lands mid-article.
 */
export function ScrollToTop(): null {
  const { pathname } = useLocation();

  useEffect(() => {
    // 'instant' rather than the CSS default: a smooth scroll on arrival reads
    // as the page sliding away under the visitor.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return null;
}
