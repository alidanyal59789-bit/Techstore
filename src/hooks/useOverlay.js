import { useEffect, useRef } from 'react';

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

/**
 * Shared behaviour for the two overlay surfaces — the product modal and the
 * cart drawer. Both need the same four things, so they get it from one place:
 *
 *  1. Escape closes.
 *  2. The page behind stops scrolling (compensated so the layout does not
 *     jump sideways when the scrollbar disappears).
 *  3. Focus moves into the panel on open and is trapped inside it, so Tab
 *     cannot wander into the page behind.
 *  4. Focus returns to whatever opened the overlay on close.
 *
 * Returns a ref to attach to the panel element.
 */
export function useOverlay(isOpen, onClose) {
  const panelRef = useRef(null);
  const restoreTo = useRef(null);

  /* Held in a ref so the effect below can depend on `isOpen` alone. Callers
     usually pass an inline arrow, and a changing dependency would tear the
     overlay down and rebuild it on every unrelated render — which would drag
     focus back out of the panel each time the cart quantity changed. */
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!isOpen) return;

    restoreTo.current = document.activeElement;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = 'hidden';
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    /* Move focus to the first control in the panel, falling back to the panel
       itself so screen readers announce the overlay rather than the page. The
       panel is already in the DOM by the time an effect runs, so this happens
       straight away rather than waiting for a frame. */
    const opened = panelRef.current;
    if (opened) (opened.querySelector(FOCUSABLE) ?? opened).focus({ preventScroll: true });

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeRef.current();
        return;
      }

      if (event.key !== 'Tab') return;

      const panel = panelRef.current;
      if (!panel) return;

      const items = Array.from(panel.querySelectorAll(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null
      );
      if (!items.length) return;

      const first = items[0];
      const last = items[items.length - 1];

      // Tab from outside the panel (or from the panel itself) re-enters at the
      // top, so focus can never fall through to the page behind.
      if (!panel.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;

      // Only take focus back if it is still inside the overlay — otherwise the
      // user has already moved on and moving it again would be a surprise.
      const panel = panelRef.current;
      if (!panel || panel.contains(document.activeElement)) {
        restoreTo.current?.focus?.({ preventScroll: true });
      }
    };
  }, [isOpen]);

  return panelRef;
}
