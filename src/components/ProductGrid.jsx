import { Icon } from './Icon';
import { ProductCard } from './ProductCard';

/**
 * Empty state. Says what happened, and gives the one control that fixes it —
 * an empty screen should be an invitation to act, not an apology.
 */
function NoResults({ query, onReset }) {
  return (
    <div className="plate crop-marks anim-fade relative flex flex-col items-center px-6 py-16 text-center sm:py-20">
      <span className="bg-surface-2 text-ink-3 grid size-14 place-items-center rounded-2xl">
        <Icon name="search" size={24} strokeWidth={1.5} />
      </span>

      <h3 className="display text-ink mt-6 text-[20px]">No products found</h3>

      <p className="text-ink-2 mt-3 max-w-[42ch] text-[15px] leading-relaxed">
        {query
          ? `Nothing in the catalogue matches “${query}”. Try a shorter search, or widen the price range.`
          : 'No products match this combination of filters. Try widening the price range or picking another category.'}
      </p>

      <button type="button" onClick={onReset} className="btn btn-primary mt-7">
        Clear all filters
      </button>
    </div>
  );
}

/**
 * The product grid: four across on desktop, three on laptop, two on tablet
 * and small phones, one on the narrowest screens.
 */
export function ProductGrid({ products, onView, query, onReset }) {
  if (products.length === 0) {
    return <NoResults query={query} onReset={onReset} />;
  }

  return (
    <ul className="grid grid-cols-1 gap-4 min-[440px]:grid-cols-2 md:grid-cols-3 sm:gap-5 xl:grid-cols-4">
      {products.map((product, index) => (
        <li
          key={product.id}
          className="reveal"
          // Stagger by column so a row appears to settle together.
          style={{ '--d': `${(index % 4) * 70}ms` }}
        >
          <ProductCard product={product} onView={onView} />
        </li>
      ))}
    </ul>
  );
}
