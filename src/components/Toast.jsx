import { Icon } from './Icon';
import { useCart } from '../context/CartContext';

/**
 * Confirmation for cart changes.
 *
 * Announced politely rather than assertively so it does not interrupt a
 * screen reader mid-sentence, and keyed on the notice so an identical repeat
 * message still replays the animation.
 */
export function Toast() {
  const { notice, openCart, dismissNotice } = useCart();

  if (!notice) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-5 z-[60] flex justify-center px-4"
      role="status"
      aria-live="polite"
    >
      <div
        key={notice.key}
        className="anim-toast plate pointer-events-auto flex max-w-[min(92vw,26rem)] items-center gap-3 py-2.5 pr-2.5 pl-4"
        style={{ boxShadow: 'var(--shadow-float)' }}
      >
        <span className="bg-brand text-brand-ink grid size-6 shrink-0 place-items-center rounded-full">
          <Icon name="check" size={13} strokeWidth={2.6} />
        </span>

        <p className="text-ink min-w-0 flex-1 truncate text-[13px] font-medium">{notice.message}</p>

        <button type="button" onClick={openCart} className="btn label !text-brand shrink-0 !px-2">
          View cart
        </button>

        <button
          type="button"
          onClick={dismissNotice}
          aria-label="Dismiss notification"
          className="btn btn-quiet size-7 shrink-0 rounded-full !px-0"
        >
          <Icon name="close" size={13} />
        </button>
      </div>
    </div>
  );
}
