import { Icon } from './Icon';
import { ProductImage } from './ProductImage';
import { useOverlay } from '../hooks/useOverlay';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/format';

const FREE_SHIPPING_AT = 2000;

/** A single cart line: photo, identity, unit price, quantity, line total. */
function CartLine({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <li className="anim-fade border-line flex gap-3.5 border-b py-4 last:border-b-0">
      <ProductImage
        src={item.image}
        alt={`${item.brand} ${item.name}`}
        category={item.category}
        name={item.name}
        className="border-line size-20 shrink-0 rounded-xl border"
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="label text-ink-3">{item.category}</p>
            <p className="font-display text-ink mt-1 truncate text-[14px] font-bold tracking-[-0.015em]">
              {item.brand} {item.name}
            </p>
            <p className="font-mono text-ink-2 mt-1 text-[11px]">
              {formatPrice(item.price)} each
            </p>
          </div>

            <button
              type="button"
              onClick={() => onRemove(item.id)}
              aria-label={`Remove ${item.brand} ${item.name} from cart`}
              className="btn-icon size-8 hover:!text-brick"
            >
              <Icon name="trash" size={15} />
            </button>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-2.5">
          <div
            className="border-line flex items-center gap-0.5 rounded-full border p-0.5"
            role="group"
            aria-label={`Quantity for ${item.name}`}
          >
             <button
               type="button"
               onClick={() => onDecrease(item.id)}
               className="btn-icon size-7"
               aria-label={item.quantity === 1 ? 'Remove item' : 'Decrease quantity'}
             >
               <Icon name={item.quantity === 1 ? 'trash' : 'minus'} size={13} strokeWidth={2.1} />
             </button>
             <span className="font-mono text-ink w-7 text-center text-[12px] font-semibold">
               {item.quantity}
             </span>
             <button
               type="button"
               onClick={() => onIncrease(item.id)}
               disabled={item.quantity >= 99}
               className="btn-icon size-7"
               aria-label="Increase quantity"
             >
               <Icon name="plus" size={13} strokeWidth={2.1} />
             </button>
          </div>

          <p className="font-mono text-ink text-[14px] font-semibold">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>
      </div>
    </li>
  );
}

export function CartDrawer() {
  const {
    items,
    count,
    subtotal,
    shipping,
    total,
    isOpen,
    closeCart,
    increment,
    decrement,
    removeItem,
    clearCart,
    openCheckout,
  } = useCart();

  const panelRef = useOverlay(isOpen, closeCart);

  if (!isOpen) return null;

  const remaining = FREE_SHIPPING_AT - subtotal;
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_AT) * 100);

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-title"
    >
      <div
        className="anim-fade absolute inset-0 bg-[hsl(var(--shadow-color)/0.55)] backdrop-blur-sm"
        onClick={closeCart}
        aria-hidden="true"
      />

      <aside
        ref={panelRef}
        tabIndex={-1}
        className="anim-drawer bg-paper border-line relative flex h-full w-full max-w-md flex-col border-l"
        style={{ boxShadow: 'var(--shadow-float)' }}
      >
        {/* ---- Header ------------------------------------------------------ */}
        <header className="border-line flex items-center justify-between gap-4 border-b px-5 py-4">
          <div>
            <h2 id="cart-title" className="display text-ink text-[18px]">
              Your cart
            </h2>
            <p className="label text-ink-3 mt-1">
              {count === 0 ? 'Empty' : `${count} ${count === 1 ? 'item' : 'items'}`}
            </p>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="btn-icon size-9"
          >
            <Icon name="close" size={17} />
          </button>
        </header>

        {items.length === 0 ? (
          /* ---- Empty ---------------------------------------------------- */
          <div className="anim-fade flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="bg-surface-2 text-ink-3 grid size-14 place-items-center rounded-2xl">
              <Icon name="cart" size={24} strokeWidth={1.5} />
            </span>
            <h3 className="display text-ink mt-6 text-[19px]">Your cart is empty</h3>
            <p className="text-ink-2 mt-3 text-[15px] leading-relaxed">
              Browse the catalogue and add something you have been meaning to replace.
            </p>
            <button type="button" onClick={closeCart} className="btn btn-primary mt-7 w-full">
              Browse products
            </button>
          </div>
        ) : (
          <>
            {/* ---- Free-shipping progress --------------------------------- */}
            {remaining > 0 && (
              <div className="border-line bg-surface border-b px-5 py-3.5">
                <p className="label text-ink-2">
                  <span className="text-brand font-semibold">{formatPrice(remaining)}</span> more for
                  free shipping
                </p>
                <div
                  className="bg-line-2 mt-2 h-1 overflow-hidden rounded-full"
                  role="progressbar"
                  aria-valuenow={Math.round(progress)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Progress towards free shipping"
                >
                  <div
                    className="bg-brand h-full rounded-full transition-[width] duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* ---- Lines -------------------------------------------------- */}
            <ul className="min-h-0 flex-1 overflow-y-auto px-5">
              {items.map((item) => (
                <CartLine
                  key={item.id}
                  item={item}
                  onIncrease={increment}
                  onDecrease={decrement}
                  onRemove={removeItem}
                />
              ))}
            </ul>

            {/* ---- Totals ------------------------------------------------- */}
            <footer className="border-line bg-surface border-t px-5 py-4">
              <dl className="space-y-2">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-ink-2 text-[13px]">Subtotal</dt>
                  <dd className="font-mono text-ink text-[13px]">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-ink-2 text-[13px]">Shipping</dt>
                  <dd className="font-mono text-[13px]">
                    {shipping === 0 ? (
                      <span className="text-brand font-semibold">Free</span>
                    ) : (
                      <span className="text-ink">{formatPrice(shipping)}</span>
                    )}
                  </dd>
                </div>
                <div className="rule-fade my-1" />
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="font-display text-ink text-[15px] font-bold">Total</dt>
                  <dd
                    className="font-mono text-ink text-[20px] font-semibold tracking-[-0.02em]"
                    aria-live="polite"
                  >
                    {formatPrice(total)}
                  </dd>
                </div>
              </dl>

              <button type="button" onClick={openCheckout} className="btn btn-primary mt-4 w-full py-4 text-[14px]">
                Proceed to Checkout
                <Icon name="arrowRight" size={16} />
              </button>

              <div className="mt-3 flex items-center justify-between gap-3">
                <button type="button" onClick={closeCart} className="btn btn-quiet label !px-1">
                  Keep shopping
                </button>
                <button
                  type="button"
                  onClick={clearCart}
                  className="btn btn-quiet label hover:!text-brick !px-1"
                >
                  Empty cart
                </button>
              </div>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
