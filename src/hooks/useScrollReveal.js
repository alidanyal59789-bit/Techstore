import { useEffect } from 'react';

/**
 * Reveals elements carrying `.reveal` as they scroll into view by setting
 * `data-shown="true"` on them; the transition itself lives in index.css.
 *
 * One observer is shared for the whole page and each element is unobserved
 * once shown, so nothing keeps firing as the user scrolls back and forth.
 *
 * `deps` lets a caller re-scan after the DOM changes — for example when the
 * product grid re-renders with a different set of cards.
 */
export function useScrollReveal(deps = []) {
  useEffect(() => {
    const targets = document.querySelectorAll('.reveal:not([data-shown])');
    if (!targets.length) return;

    // Without IntersectionObserver, show everything rather than nothing.
    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.setAttribute('data-shown', 'true'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-shown', 'true');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
