import { Icon, CATEGORY_ICONS } from './Icon';
import { SectionHead } from './SectionHead';
import { CATEGORIES, countByCategory, PRODUCTS } from '../data/products';
import { formatPrice } from '../lib/format';

/** Cheapest item in a category — the one genuinely useful number to preview. */
const startingAt = (category) =>
  Math.min(...PRODUCTS.filter((p) => p.category === category).map((p) => p.price));

/**
 * Category cards. Selecting one sets the catalogue filter and scrolls down to
 * the grid; selecting the active one again clears back to All, so a card is a
 * toggle rather than a dead end.
 */
export function CategorySection({ selected, onSelect }) {
  const choose = (category) => {
    onSelect(selected === category ? 'All' : category);
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="categories" className="scroll-mt-20 py-16 lg:py-24">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <SectionHead
          eyebrow="Browse"
          title="Five categories, kept short"
          lede="We would rather carry three good laptops than thirty. Pick a category to filter the catalogue below."
        />

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {CATEGORIES.map((category, index) => {
            const isActive = selected === category;

            return (
              <li key={category} className="reveal" style={{ '--d': `${index * 70}ms` }}>
                <button
                  type="button"
                  onClick={() => choose(category)}
                  aria-pressed={isActive}
                  className={`plate group relative flex h-full w-full cursor-pointer flex-col items-start gap-6 overflow-hidden p-5 text-left transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 ${
                    isActive
                      ? '!border-brand shadow-[var(--shadow-lift)] ring-1 ring-brand/40'
                      : 'hover:shadow-[var(--shadow-lift)]'
                  }`}
                >
                  {/* Tint sweeps up from the base on hover — one movement, not three. */}
                  <span
                    className={`absolute inset-x-0 bottom-0 origin-bottom bg-gradient-to-t from-brand-tint to-transparent transition-transform duration-400 ease-out ${
                      isActive ? 'h-full scale-y-100' : 'h-full scale-y-0 group-hover:scale-y-100'
                    }`}
                    aria-hidden="true"
                  />

                  <span
                    className={`relative grid size-11 shrink-0 place-items-center rounded-xl transition-colors duration-300 ${
                      isActive
                        ? 'bg-brand text-brand-ink'
                        : 'bg-surface-2 text-ink-2 group-hover:bg-brand group-hover:text-brand-ink'
                    }`}
                  >
                    <Icon name={CATEGORY_ICONS[category]} size={21} strokeWidth={1.5} />
                  </span>

                  <span className="relative">
                    <span className="font-display text-ink block text-[15px] leading-tight font-bold tracking-[-0.015em]">
                      {category}
                    </span>
                    {/* Count and starting price sit on their own lines. At five
                        across there is no room for both on one, and a fixed
                        two-line block reads as a data stack rather than as an
                        accidental wrap on whichever category costs the most. */}
                    <span className="label text-ink-3 mt-2 block tracking-[0.1em]">
                      {countByCategory(category)} items
                    </span>
                    <span className="label text-ink-3 block tracking-[0.1em]">
                      from {formatPrice(startingAt(category))}
                    </span>
                  </span>

                  <Icon
                    name={isActive ? 'check' : 'arrowRight'}
                    size={15}
                    className={`absolute top-5 right-5 transition-all duration-300 ${
                      isActive
                        ? 'text-brand opacity-100'
                        : 'text-brand -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                    }`}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
