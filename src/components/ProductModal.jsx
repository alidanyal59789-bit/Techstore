import { useEffect, useState } from 'react';
import { Icon } from './Icon';
import { Stars } from './Stars';
import { ProductImage } from './ProductImage';
import { useOverlay } from '../hooks/useOverlay';
import { useCart } from '../context/CartContext';
import { formatPrice, discountPercent } from '../lib/format';

const ASSURANCES = [
  { icon: 'truck', text: 'Free shipping on orders over ₹2,000' },
  { icon: 'shield', text: '2-year manufacturer warranty' },
  { icon: 'refresh', text: '30-day returns, no questions' },
];

/**
 * Product details. Escape, overlay clicks, focus trapping and scroll locking
 * all come from useOverlay, which the cart drawer shares.
 */
export function ProductModal({ product, onClose }) {
  const { addItem, quantityOf } = useCart();
  const panelRef = useOverlay(Boolean(product), onClose);
  const [quantity, setQuantity] = useState(1);

  // Each product opens at a quantity of one rather than inheriting the last.
  useEffect(() => setQuantity(1), [product?.id]);

  if (!product) return null;

  const reduction = discountPercent(product.price, product.oldPrice);
  const inCart = quantityOf(product.id);

  const add = () => {
    addItem(product, quantity);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Overlay. Clicking it closes; it is decorative to assistive tech
          because the close button is the labelled route out. */}
      <div
        className="anim-fade absolute inset-0 bg-[hsl(var(--shadow-color)/0.55)] backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        tabIndex={-1}
        className="anim-sheet bg-surface border-line relative max-h-[94svh] w-full max-w-4xl overflow-y-auto rounded-t-3xl border sm:max-h-[90svh] sm:rounded-3xl"
        style={{ boxShadow: 'var(--shadow-float)' }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="btn-icon absolute top-4 right-4 z-10 shadow-[var(--shadow-plate)]"
        >
          <Icon name="close" size={16} />
        </button>

        <div className="grid gap-0 sm:grid-cols-2">
          {/* ---- Plate --------------------------------------------------- */}
          {/* Centred so a short plate sits level with the details column
              rather than leaving a block of empty panel beneath it. */}
          <div className="bg-surface-2 relative flex flex-col justify-center p-4 sm:p-6 lg:sticky lg:top-8">
            <div className="crop-marks bg-surface border-line relative overflow-hidden rounded-3xl border p-3 shadow-[var(--shadow-plate)] ring-1 ring-line/50">
              <ProductImage
                src={product.image}
                alt={`${product.brand} ${product.name}`}
                category={product.category}
                name={product.name}
                className="aspect-square w-full rounded-2xl"
                eager
                sizes="(max-width: 640px) 100vw, 45vw"
              />
            </div>
            <p className="label text-ink-3 mt-3 flex items-center justify-between px-1">
              <span className="text-brand">{product.category}</span>
              <span>Ref. {String(product.id).padStart(3, '0')}</span>
            </p>
          </div>

          {/* ---- Details ------------------------------------------------- */}
          <div className="flex flex-col p-5 pr-14 sm:p-7 sm:pr-7">
            {product.badge && (
              <p className="label text-brand bg-brand-tint w-fit rounded-full px-2.5 py-1.5">
                {product.badge}
              </p>
            )}

            <p className="label text-ink-2 mt-4">{product.brand}</p>
            <h2
              id="modal-title"
              className="display text-ink mt-1.5 text-[clamp(1.5rem,4vw,2rem)] leading-[1.1]"
            >
              {product.name}
            </h2>

            <Stars rating={product.rating} reviews={product.reviews} size={15} className="mt-3.5" />

            <div className="mt-5 flex flex-wrap items-baseline gap-2.5">
              <p className="font-mono text-ink text-[28px] leading-none font-semibold tracking-[-0.03em]">
                {formatPrice(product.price)}
              </p>
              {product.oldPrice && (
                <>
                  <p className="font-mono text-ink-3 text-[15px] line-through">
                    {formatPrice(product.oldPrice)}
                  </p>
                  <span className="label bg-brick text-brick-ink rounded-full px-2 py-1">
                    Save {formatPrice(product.oldPrice - product.price)} · {reduction}%
                  </span>
                </>
              )}
            </div>

            <p className="text-ink-2 mt-5 text-[15px] leading-relaxed">{product.description}</p>

            {/* Full datasheet — the card shows the same specs, keyed here. */}
            <p className="label text-ink-3 mt-7">Specifications</p>
            <dl className="border-line mt-3 divide-y divide-[var(--line)] border-y">
              {product.specs.map((spec, index) => (
                <div key={spec} className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="label text-ink-3">Spec {String(index + 1).padStart(2, '0')}</dt>
                  <dd className="font-mono text-ink text-right text-[12px]">{spec}</dd>
                </div>
              ))}
            </dl>

            {/* ---- Quantity + add ---------------------------------------- */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <div
                className="border-line flex items-center gap-1 rounded-full border p-1"
                role="group"
                aria-label="Quantity"
              >
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="btn-icon size-9"
                  aria-label="Decrease quantity"
                >
                  <Icon name="minus" size={14} strokeWidth={2.2} />
                </button>
                <span
                  className="font-mono text-ink w-8 text-center text-[13px] font-semibold"
                  aria-live="polite"
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                  disabled={quantity >= 99}
                  className="btn-icon size-9"
                  aria-label="Increase quantity"
                >
                  <Icon name="plus" size={14} strokeWidth={2.2} />
                </button>
              </div>

              <button type="button" onClick={add} className="btn btn-primary flex-1 px-6 py-3.5">
                <Icon name="cart" size={16} />
                Add {quantity > 1 ? `${quantity} ` : ''}to cart —{' '}
                {formatPrice(product.price * quantity)}
              </button>
            </div>

            {inCart > 0 && (
              <p className="label text-brand mt-3 flex items-center gap-1.5">
                <Icon name="check" size={13} strokeWidth={2.2} />
                {inCart} already in your cart
              </p>
            )}

            <ul className="mt-7 space-y-2.5">
              {ASSURANCES.map((item) => (
                <li key={item.text} className="text-ink-2 flex items-center gap-2.5">
                  <Icon name={item.icon} size={15} className="text-brand shrink-0" strokeWidth={1.5} />
                  <span className="text-[13px]">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
