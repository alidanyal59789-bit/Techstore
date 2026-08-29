import { Icon } from './Icon';
import { CATEGORIES, PRICE_MIN, PRICE_MAX, SORT_OPTIONS } from '../data/products';
import { formatPrice } from '../lib/format';

const ALL = 'All';
const STEP = 1000;

/**
 * The catalogue controls: category chips, a two-handle price range, and sort.
 *
 * Every control is presentational — it reports upward and renders from props,
 * so filter state has exactly one owner (App) and the four filters compose
 * without any of them knowing about the others.
 */
export function FilterBar({
  category,
  onCategoryChange,
  range,
  onRangeChange,
  sort,
  onSortChange,
  query,
  onQueryChange,
  shown,
  total,
}) {
  const [min, max] = range;

  const isFiltered =
    category !== ALL || query !== '' || min > PRICE_MIN || max < PRICE_MAX || sort !== 'default';

  const clearAll = () => {
    onCategoryChange(ALL);
    onRangeChange([PRICE_MIN, PRICE_MAX]);
    onSortChange('default');
    onQueryChange('');
  };

  /* Handles must not cross over each other. */
  const setMin = (value) => onRangeChange([Math.min(Number(value), max - STEP), max]);
  const setMax = (value) => onRangeChange([min, Math.max(Number(value), min + STEP)]);

  const pct = (value) => ((value - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;

  return (
    <div className="reveal">
      <div className="rounded-2xl border border-line/70 bg-surface/60 p-4 shadow-[var(--shadow-plate)] backdrop-blur-sm sm:p-5">
        {/* ---- Categories ------------------------------------------------- */}
        <div
          className="no-bar -mx-1 flex items-center gap-2 overflow-x-auto px-1 pb-1"
          role="group"
          aria-label="Filter by category"
        >
          {[ALL, ...CATEGORIES].map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => onCategoryChange(name)}
              aria-pressed={category === name}
              className="chip shrink-0 px-4 py-2.5"
            >
              {name}
            </button>
          ))}
        </div>

        <div className="bg-line my-4 h-px" />

        {/* ---- Price + sort ---------------------------------------------- */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:gap-8">
          <fieldset className="min-w-0 flex-1">
            <legend className="label text-ink-2 mb-3 flex w-full items-center justify-between gap-4">
              <span className="flex items-center gap-2">
                <Icon name="sliders" size={14} className="text-brand" />
                Price range
              </span>
              <span className="font-mono text-ink text-[12px] font-semibold tracking-normal normal-case">
                {formatPrice(min)} — {formatPrice(max)}
                {max >= PRICE_MAX && '+'}
              </span>
            </legend>

            {/* Two inputs share one visual track. The inputs themselves are
                click-through; only their thumbs accept the pointer. */}
            <div className="relative h-6">
              <div className="bg-line-2 absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full" />
              <div
                className="bg-brand absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full shadow-[0_0_10px_-1px_color-mix(in_srgb,var(--brand)_80%,transparent)]"
                style={{ left: `${pct(min)}%`, right: `${100 - pct(max)}%` }}
              />
              <input
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={STEP}
                value={min}
                onChange={(event) => setMin(event.target.value)}
                aria-label="Minimum price"
                className="range-overlay absolute inset-0 z-20 w-full"
              />
              <input
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={STEP}
                value={max}
                onChange={(event) => setMax(event.target.value)}
                aria-label="Maximum price"
                className="range-overlay absolute inset-0 z-30 w-full"
              />
            </div>

            <div className="label text-ink-3 mt-2 flex justify-between">
              <span>{formatPrice(PRICE_MIN)}</span>
              <span>{formatPrice(PRICE_MAX)}+</span>
            </div>
          </fieldset>

          <div className="lg:w-56">
            <label htmlFor="sort" className="label text-ink-2 mb-3 block">
              Sort by
            </label>
            <div className="relative">
              <select
                id="sort"
                value={sort}
                onChange={(event) => onSortChange(event.target.value)}
                className="select w-full"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <Icon
                name="chevronDown"
                size={15}
                className="text-ink-3 pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ---- Result summary --------------------------------------------- */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="label text-ink-2" role="status" aria-live="polite">
          Showing{' '}
          <span className="text-ink font-semibold">
            {shown}
          </span>{' '}
          of {total} products
          {query && (
            <>
              {' '}
              for “<span className="text-ink normal-case">{query}</span>”
            </>
          )}
        </p>

        {isFiltered && (
          <button
            type="button"
            onClick={clearAll}
            className="btn btn-quiet label !text-brand gap-1.5 !px-2"
          >
            <Icon name="close" size={12} strokeWidth={2.2} />
            Clear all filters
          </button>
        )}
      </div>
    </div>
  );
}
