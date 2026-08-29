import { useEffect, useState } from 'react';
import { Icon } from './Icon';
import { CATEGORIES } from '../data/products';

/* Only destinations that exist on this page. A demo footer that links out to
   pages it does not have reads as a template; these three are real anchors. */
const QUICK_LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'All products', href: '#products' },
  { label: 'Categories', href: '#categories' },
];

const SOCIAL = [
  { name: 'X', icon: 'x' },
  { name: 'Instagram', icon: 'instagram' },
  { name: 'GitHub', icon: 'github' },
  { name: 'LinkedIn', icon: 'linkedin' },
];

/** Back to top, revealed once the hero is well out of view. */
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={`btn bg-brand text-brand-ink fixed right-4 bottom-5 z-30 size-11 rounded-full transition-all duration-300 ease-out sm:right-6 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
      style={{ boxShadow: 'var(--shadow-lift)' }}
    >
      <Icon name="arrowUp" size={17} strokeWidth={2} />
    </button>
  );
}

export function Footer({ onCategorySelect }) {
  const choose = (category) => {
    onCategorySelect(category);
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <BackToTop />

      <footer className="border-line bg-paper-2 mt-8 border-t">
        <div className="mx-auto max-w-[1320px] px-4 pt-14 pb-8 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
            {/* ---- Identity ---------------------------------------------- */}
            <div className="max-w-sm">
              <div className="flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-brand to-brand-hi text-brand-ink shadow-[0_8px_20px_-8px_color-mix(in_srgb,var(--brand)_70%,transparent)]">
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
              </div>

              <p className="text-ink-2 mt-4 text-[14px] leading-relaxed">
                A short, opinionated catalogue of premium electronics. We carry the phones,
                laptops, headphones, keyboards and watches we would recommend to a friend, and
                write up the specs that actually decide it.
              </p>

              <ul className="mt-6 flex items-center gap-2">
                {SOCIAL.map((item) => (
                  <li key={item.name}>
                    <a
                      href="#top"
                      aria-label={`TechStore on ${item.name}`}
                      className="border-line text-ink-2 hover:border-brand hover:text-brand hover:bg-brand-tint grid size-9 place-items-center rounded-full border transition-all duration-200"
                    >
                      <Icon name={item.icon} size={15} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* ---- Quick links ------------------------------------------- */}
            <nav aria-labelledby="footer-links">
              <h2 id="footer-links" className="label text-ink">
                Quick links
              </h2>
              <ul className="mt-4 space-y-2.5">
                {QUICK_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-ink-2 hover:text-brand text-[14px] transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* ---- Categories -------------------------------------------- */}
            <nav aria-labelledby="footer-categories">
              <h2 id="footer-categories" className="label text-ink">
                Categories
              </h2>
              <ul className="mt-4 space-y-2.5">
                {CATEGORIES.map((category) => (
                  <li key={category}>
                    <button
                      type="button"
                      onClick={() => choose(category)}
                      className="text-ink-2 hover:text-brand cursor-pointer text-left text-[14px] transition-colors duration-200"
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* ---- Support ----------------------------------------------- */}
            <div>
              <h2 className="label text-ink">Support</h2>
              <ul className="text-ink-2 mt-4 space-y-2.5 text-[14px]">
                <li>Mon–Fri, 9:00–18:00</li>
                <li>
                  <a
                    href="mailto:support@techstore.demo"
                    className="hover:text-brand transition-colors duration-200"
                  >
                    support@techstore.demo
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+919876543210"
                    className="hover:text-brand font-mono text-[12px] transition-colors duration-200"
                  >
                    +91 98765 43210
                  </a>
                </li>
                {/* The one policy this demo actually implements, in the cart. */}
                <li className="text-ink-3">Free shipping over ₹2,000</li>
              </ul>
            </div>
          </div>

          <div className="rule-fade mt-12" />

          <div className="mt-6 flex flex-col-reverse items-center justify-between gap-3 sm:flex-row">
            <p className="label text-ink-3 text-center sm:text-left">
              © {new Date().getFullYear()} TechStore. All rights reserved.
            </p>
            <p className="label text-ink-3 text-center sm:text-right">
              Front-end demo · React · Tailwind CSS · No real payments
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
