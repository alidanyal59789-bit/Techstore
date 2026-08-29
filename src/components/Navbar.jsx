import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

const LINKS = [
  { id: 'top', label: 'Home' },
  { id: 'products', label: 'Products' },
  { id: 'categories', label: 'Categories' },
];

/**
 * The mark echoes the crop-marks motif used on every plate in the page: two
 * opposing corner brackets, the way a print proof is registered before trim.
 */
function Logo() {
  return (
    <a
      href="#top"
      className="group flex shrink-0 items-center gap-2.5"
      aria-label="TechStore — home"
    >
      <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-brand to-brand-hi text-brand-ink shadow-[0_8px_20px_-8px_color-mix(in_srgb,var(--brand)_70%,transparent)] transition-transform duration-300 ease-out group-hover:-rotate-6">
        <svg viewBox="0 0 24 24" className="text-brand-ink size-4" aria-hidden="true">
          <path
            d="M5 10V5h5M19 14v5h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.1"
            strokeLinecap="square"
          />
          <rect x="10.4" y="10.4" width="3.2" height="3.2" fill="currentColor" />
        </svg>
      </span>
      <span className="font-display text-ink text-[17px] leading-none font-extrabold tracking-[-0.03em]">
        TechStore
      </span>
    </a>
  );
}

export function Navbar({ query, onQueryChange }) {
  const { count, openCart } = useCart();
  const { isDark, toggleTheme } = useTheme();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('top');
  const bumpRef = useRef(null);

  /* Densify the bar once the page has moved, so it reads as a layer over the
     content rather than part of the hero. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Scroll-spy: mark the link for whichever section currently owns the
     upper third of the viewport. */
  useEffect(() => {
    const sections = LINKS.map((link) => document.getElementById(link.id)).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-72px 0px -60% 0px', threshold: [0.01, 0.2, 0.5] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  /* Close the mobile menu on Escape or once the viewport is wide enough to
     show the full bar again. */
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event) => event.key === 'Escape' && setMenuOpen(false);
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = (event) => event.matches && setMenuOpen(false);

    document.addEventListener('keydown', onKeyDown);
    mq.addEventListener('change', onChange);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      mq.removeEventListener('change', onChange);
    };
  }, [menuOpen]);

  /* Retrigger the badge animation whenever the count changes. */
  useEffect(() => {
    const badge = bumpRef.current;
    if (!badge || count === 0) return;
    badge.animate(
      [{ transform: 'scale(1)' }, { transform: 'scale(1.28)' }, { transform: 'scale(1)' }],
      { duration: 320, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
    );
  }, [count]);

  const searchField = (id, autoFocus = false) => (
    <div className="relative w-full">
      <Icon
        name="search"
        size={15}
        className="text-ink-3 pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2"
      />
      <input
        id={id}
        type="search"
        value={query}
        autoFocus={autoFocus}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Search products…"
        aria-label="Search products"
        className="field bg-surface-2 pl-9"
      />
      {query && (
        <button
          type="button"
          onClick={() => onQueryChange('')}
          aria-label="Clear search"
          className="text-ink-3 hover:text-ink absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer rounded-full p-1 transition-colors"
        >
          <Icon name="close" size={13} />
        </button>
      )}
    </div>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled
          ? 'glass border-line border-b shadow-[0_1px_24px_-10px_hsl(var(--shadow-color)/0.35)]'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-[1320px] items-center gap-3 px-4 sm:px-6 lg:px-8"
        aria-label="Main"
      >
        <Logo />

        {/* Desktop links */}
        <ul className="ml-4 hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={active === link.id ? 'true' : undefined}
                className={`relative rounded-full px-3 py-2 text-[13px] font-medium transition-colors duration-200 ${
                  active === link.id ? 'text-brand' : 'text-ink-2 hover:text-ink'
                }`}
              >
                {link.label}
                <span
                  className={`bg-brand absolute inset-x-3 -bottom-0.5 h-[2px] origin-left rounded-full transition-transform duration-300 ease-out ${
                    active === link.id ? 'scale-x-100' : 'scale-x-0'
                  }`}
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex-1" />

        {/* Desktop search */}
        <div className="hidden w-56 lg:block xl:w-72">{searchField('nav-search')}</div>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={toggleTheme}
          className="btn-icon"
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          aria-pressed={isDark}
        >
          <Icon name={isDark ? 'sun' : 'moon'} size={18} />
        </button>

        <button
          type="button"
          onClick={openCart}
          className="btn-icon relative"
          aria-label={`Open cart, ${count} ${count === 1 ? 'item' : 'items'}`}
        >
          <Icon name="cart" size={19} />
          {count > 0 && (
            <span
              ref={bumpRef}
              className="anim-pop bg-brand text-brand-ink absolute -top-0.5 -right-0.5 grid min-w-[18px] place-items-center rounded-full px-1 font-mono text-[10px] leading-[18px] font-semibold ring-2 ring-paper"
            >
              {count > 99 ? '99+' : count}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="btn-icon md:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <Icon name={menuOpen ? 'close' : 'menu'} size={19} />
        </button>
      </div>
      </nav>

      {/* Mobile menu. Kept mounted so it can transition both ways, and made
          inert while closed so it never takes focus. */}
      <div
        id="mobile-menu"
        inert={!menuOpen}
        className={`glass border-line overflow-hidden border-b transition-[max-height,opacity] duration-400 ease-out md:hidden ${
          menuOpen ? 'max-h-96 opacity-100' : 'pointer-events-none max-h-0 opacity-0'
        }`}
      >
        <div className="space-y-4 px-4 pt-2 pb-5 sm:px-6">
          <div className="lg:hidden">{searchField('mobile-search')}</div>
          <ul className="space-y-1">
            {LINKS.map((link, index) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setMenuOpen(false)}
                  style={{ transitionDelay: menuOpen ? `${index * 45 + 60}ms` : '0ms' }}
                  className={`hover:bg-surface-2 flex items-center justify-between rounded-xl px-3 py-3 text-[15px] font-medium transition-all duration-300 ${
                    menuOpen ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'
                  } ${active === link.id ? 'text-brand' : 'text-ink'}`}
                >
                  {link.label}
                  <Icon name="chevronRight" size={15} className="text-ink-3" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
