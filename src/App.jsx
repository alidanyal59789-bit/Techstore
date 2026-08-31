import { useCallback, useMemo, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategorySection } from './components/CategorySection';
import { FilterBar } from './components/FilterBar';
import { ProductGrid } from './components/ProductGrid';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { Checkout } from './components/Checkout';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';
import { SectionHead } from './components/SectionHead';
import { PRODUCTS, CATEGORIES, PRICE_MIN, PRICE_MAX } from './data/products';
import { useScrollReveal } from './hooks/useScrollReveal';

/**
 * Everything a product is searched or matched against, lowercased once per
 * product so a keystroke does not rebuild the string for every comparison.
 */
const SEARCH_INDEX = new Map(
  PRODUCTS.map((product) => [
    product.id,
    `${product.brand} ${product.name} ${product.category} ${product.specs.join(' ')} ${product.description}`.toLowerCase(),
  ])
);

const COMPARATORS = {
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  'rating-desc': (a, b) => b.rating - a.rating || b.reviews - a.reviews,
  'name-asc': (a, b) => `${a.brand} ${a.name}`.localeCompare(`${b.brand} ${b.name}`),
};

export default function App() {
  /* All four catalogue filters live here, in one place. Each control is a
     controlled component, so search, category, price and sort compose without
     any of them needing to know the others exist. */
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [range, setRange] = useState([PRICE_MIN, PRICE_MAX]);
  const [sort, setSort] = useState('default');

  const [viewing, setViewing] = useState(null);

  const visible = useMemo(() => {
    const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const [min, max] = range;

    const filtered = PRODUCTS.filter((product) => {
      if (category !== 'All' && product.category !== category) return false;
      if (product.price < min || product.price > max) return false;

      // Every word must appear somewhere, so "apple watch" narrows rather
      // than widening the way an OR match would.
      if (tokens.length) {
        const haystack = SEARCH_INDEX.get(product.id);
        if (!tokens.every((token) => haystack.includes(token))) return false;
      }

      return true;
    });

    // Sorting is applied last, to a copy — PRODUCTS keeps its curated order,
    // which is what "Featured" sorts back to.
    const comparator = COMPARATORS[sort];
    return comparator ? [...filtered].sort(comparator) : filtered;
  }, [query, category, range, sort]);

  // Re-scan for newly rendered cards whenever the visible set changes. Query
  // is included so a search that yields a result set of the same length but
  // with different products still gets its new cards observed.
  useScrollReveal([visible.length, category, sort, query]);

  const resetFilters = useCallback(() => {
    setQuery('');
    setCategory('All');
    setRange([PRICE_MIN, PRICE_MAX]);
    setSort('default');
  }, []);

  const closeModal = useCallback(() => setViewing(null), []);

  return (
    <>
      {/* First stop for keyboard and screen-reader users. */}
      <a
        href="#products"
        className="btn btn-primary sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70]"
      >
        Skip to products
      </a>

      <Navbar query={query} onQueryChange={setQuery} />

      <main id="main">
        <Hero />

        <CategorySection selected={category} onSelect={setCategory} />

        <section id="products" className="scroll-mt-20 pb-20 lg:pb-28">
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
            <SectionHead
              eyebrow="Catalogue"
              title="Featured Products"
              lede={`${PRODUCTS.length} products across ${CATEGORIES.length} categories. Filter by category or price, sort however you shop, and open any card for the full datasheet.`}
            />

            <div className="mt-10">
              <FilterBar
                category={category}
                onCategoryChange={setCategory}
                range={range}
                onRangeChange={setRange}
                sort={sort}
                onSortChange={setSort}
                query={query}
                onQueryChange={setQuery}
                shown={visible.length}
                total={PRODUCTS.length}
              />
            </div>

            <div className="mt-8">
              <ProductGrid
                products={visible}
                onView={setViewing}
                query={query}
                onReset={resetFilters}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer onCategorySelect={setCategory} />

      {/* Overlays live outside main so they stack above everything. */}
      <ProductModal product={viewing} onClose={closeModal} />
      <CartDrawer />
      <Checkout />
      <Toast />
    </>
  );
}
