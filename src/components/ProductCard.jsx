import { useState } from 'react';
import { Icon } from './Icon';
import { Stars } from './Stars';
import { ProductImage } from './ProductImage';
import { useCart } from '../context/CartContext';
import { formatPrice, discountPercent } from '../lib/format';

/**
 * A single catalogue entry.
 *
 * Hover does three quiet things at once — the plate lifts, the photo scales a
 * little inside its well, and the actions gain contrast. Nothing moves far;
 * the point is that the card feels picked up, not animated.
 */
export function ProductCard({ product, onView }) {
  const { addItem, quantityOf } = useCart();
  const inCart = quantityOf(product.id);
  const reduction = discountPercent(product.price, product.oldPrice);
  const [wished, setWished] = useState(false);

  return (
    <article className="plate group relative flex flex-col overflow-hidden ring-1 ring-line/40 transition-[transform,box-shadow,border-color] duration-400 ease-out hover:-translate-y-1.5 hover:border-line-2 hover:shadow-[var(--shadow-lift)]">
      {/* ---- Image well --------------------------------------------------- */}
      <div className="relative">
        <ProductImage
          src={product.image}
          alt={`${product.brand} ${product.name}`}
          category={product.category}
          name={product.name}
          className="aspect-[4/5] w-full"
          imgClassName="transition-transform duration-[1100ms] ease-out group-hover:scale-[1.06]"
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
        />

        {/* Flags. Editorial badge top-left; sale flag bottom-left so the
            wishlist control keeps the top-right corner to itself. */}
        {product.badge && (
          <span className="label bg-ink/90 text-paper shadow-[var(--shadow-plate)] absolute top-3 left-3 rounded-full px-2.5 py-1.5 backdrop-blur-sm">
            {product.badge}
          </span>
        )}
        {reduction > 0 && (
          <span className="label bg-brick text-brick-ink shadow-[0_8px_20px_-8px_color-mix(in_srgb,var(--brick)_70%,transparent)] absolute bottom-3 left-3 rounded-full px-2.5 py-1.5">
            −{reduction}%
          </span>
        )}

        {/* Wishlist — a tasteful heart toggle. Visual only; no catalogue state. */}
        <button
          type="button"
          onClick={() => setWished((value) => !value)}
          aria-pressed={wished}
          aria-label={wished ? `Remove ${product.brand} ${product.name} from wishlist` : `Add ${product.brand} ${product.name} to wishlist`}
          className={`absolute top-3 right-3 z-10 grid size-9 place-items-center rounded-full border border-line/60 bg-surface/85 text-ink-2 shadow-[var(--shadow-plate)] backdrop-blur-sm transition-[color,background-color,border-color,transform] duration-200 hover:text-brick hover:scale-105 ${
            wished ? '!text-brick !border-brick/50' : ''
          }`}
        >
          <Icon name="heart" size={16} filled={wished} strokeWidth={1.9} className={wished ? 'anim-pop' : ''} />
        </button>

        {/* Quick view. Slides in on hover on pointer devices; on touch the
            card's own View button below is the route in. */}
        <button
          type="button"
          onClick={() => onView(product)}
          className="btn label bg-ink text-paper absolute inset-x-3 bottom-3 hidden translate-y-2 justify-center rounded-full py-2.5 opacity-0 shadow-[var(--shadow-lift)] backdrop-blur-sm transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 sm:flex"
        >
          Quick view
        </button>
      </div>

      {/* ---- Body -------------------------------------------------------- */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="label text-ink-3">{product.category}</p>

        <h3 className="font-display text-ink mt-2 text-[15px] leading-snug font-bold tracking-[-0.015em]">
          <button
            type="button"
            onClick={() => onView(product)}
            className="hover:text-brand cursor-pointer text-left transition-colors duration-200"
          >
            <span className="text-ink-2 font-sans text-[13px] font-normal">{product.brand}</span>{' '}
            {product.name}
          </button>
        </h3>

        <Stars rating={product.rating} reviews={product.reviews} className="mt-2.5" />

        {/* Stock status — a small, honest signal that keeps the datasheet
            voice without inventing numbers. */}
        <div className="mt-3 flex items-center gap-1.5">
          <span
            className={`size-1.5 rounded-full ${reduction > 0 ? 'bg-amber' : 'bg-brand'}`}
            aria-hidden="true"
          />
          <span className="label text-ink-3 normal-case tracking-normal">
            {reduction > 0 ? 'Low stock' : 'In stock'}
          </span>
        </div>

        {/* Datasheet strip — the recurring device that makes this read as a
            catalogue rather than a storefront. */}
        <dl className="border-line mt-4 space-y-1.5 border-t pt-3.5">
          {product.specs.map((spec) => (
            <div key={spec} className="flex items-baseline gap-2">
              <dt className="bg-line-2 mt-1.5 size-1 shrink-0 rounded-full" aria-hidden="true" />
              <dd className="font-mono text-ink-2 text-[11px] leading-relaxed">{spec}</dd>
            </div>
          ))}
        </dl>

        {/* ---- Price + actions, pinned to the base of the card ----------- */}
        <div className="mt-auto pt-5">
          <div className="flex items-baseline gap-2">
            <p className="font-mono text-ink text-[19px] font-semibold tracking-[-0.02em]">
              {formatPrice(product.price)}
            </p>
            {product.oldPrice && (
              <p className="font-mono text-ink-3 text-[13px] line-through">
                {formatPrice(product.oldPrice)}
              </p>
            )}
          </div>

          <div className="mt-3.5 flex items-center gap-2">
          <button
            type="button"
            onClick={() => addItem(product)}
            className="btn btn-primary flex-1 px-3 py-3"
            aria-label={`Add ${product.brand} ${product.name} to cart`}
          >
              {inCart > 0 ? (
                <>
                  <Icon name="check" size={14} strokeWidth={2.2} />
                  In cart · {inCart}
                </>
              ) : (
                'Add to cart'
              )}
            </button>
            <button
              type="button"
              onClick={() => onView(product)}
            className="btn btn-outline shrink-0 px-3.5 py-3"
            aria-label={`View details for ${product.brand} ${product.name}`}
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
