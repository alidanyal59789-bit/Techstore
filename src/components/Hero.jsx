import { Icon } from './Icon';
import { ProductImage } from './ProductImage';
import { PRODUCTS } from '../data/products';
import { formatPrice } from '../lib/format';

/** The three hero products — one per flagship category, so the plate reads as
 *  a multi-category store at a glance rather than a single device. */
const LAPTOP = PRODUCTS.find((p) => p.id === 5); // MacBook Air M3
const PHONE = PRODUCTS.find((p) => p.id === 1); // iPhone 15 Pro
const HEADPHONES = PRODUCTS.find((p) => p.id === 8); // WH-1000XM5

const ASSURANCES = [
  { icon: 'truck', text: 'Free shipping' },
  { icon: 'lock', text: 'Secure checkout' },
  { icon: 'refresh', text: 'Easy returns' },
];

export function Hero() {
  return (
    <section id="top" className="relative scroll-mt-24 overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-40 lg:pb-24">
      {/* A single soft brand wash, placed off-centre behind the plate. The one
          piece of atmosphere in the page — everything else is flat. */}
      <div
        className="pointer-events-none absolute top-[-14%] right-[-12%] -z-10 hidden size-[46rem] rounded-full opacity-[0.07] blur-3xl lg:block"
        style={{ background: 'radial-gradient(circle, var(--brand) 0%, transparent 65%)' }}
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-[1320px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8">
        {/* ---- Argument ---------------------------------------------------- */}
        <div>
          <p className="rise label text-ink-2 flex items-center gap-2.5" style={{ '--d': '80ms' }}>
            <span className="bg-brand size-1.5 rounded-full" aria-hidden="true" />
            Premium electronics · Est. 2026
          </p>

          <h1
            className="rise display text-ink mt-5 text-balance text-[clamp(2.6rem,7.4vw,5.1rem)] leading-[0.93]"
            style={{ '--d': '160ms' }}
          >
            Technology
            <br />
            That Fits
            <br />
            <span className="text-brand">Your Life.</span>
          </h1>

          <p
            className="rise text-ink-2 mt-6 max-w-[46ch] text-[16px] leading-relaxed sm:text-[17px]"
            style={{ '--d': '260ms' }}
          >
            We stock a short list rather than a long one. Every phone, laptop, pair of
            headphones, keyboard and watch here was chosen for how it holds up in daily
            use — then written up with the specs that actually decide it.
          </p>

          <div className="rise mt-9 flex flex-wrap items-center gap-3" style={{ '--d': '350ms' }}>
            <a href="#products" className="btn btn-primary group px-6 py-3.5">
              Shop now
              <Icon
                name="arrowRight"
                size={16}
                className="transition-transform duration-300 ease-out group-hover:translate-x-1"
              />
            </a>
            <a href="#categories" className="btn btn-outline px-6 py-3.5">
              Explore categories
            </a>
          </div>

          {/* Assurances, set as a datasheet row rather than three marketing cards. */}
          <ul
            className="rise text-ink-2 mt-10 flex flex-wrap items-center gap-x-6 gap-y-3"
            style={{ '--d': '440ms' }}
          >
            {ASSURANCES.map((item) => (
              <li key={item.text} className="flex items-center gap-2">
                <Icon name={item.icon} size={15} className="text-brand" strokeWidth={1.5} />
                <span className="label text-ink-2">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ---- Catalogue composition --------------------------------------
            A laptop anchors the centre; a smartphone and a pair of headphones
            float at its corners as supporting categories. Together they say
            "we sell more than one kind of tech" before a word is read. */}
        <figure
          className="plate-in relative mx-auto aspect-[5/4] w-full max-w-[440px] sm:aspect-[1/1] sm:max-w-[520px] lg:aspect-[4/5]"
          style={{ '--d': '300ms' }}
          aria-label="A laptop, smartphone and headphones representing the TechStore catalogue"
        >
          {/* Abstract tech texture — faint dotted grid, faded at the edges. */}
          <div className="hero-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />

          {/* Soft glow seated behind the cluster. */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 size-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
            style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--brand) 22%, transparent) 0%, transparent 70%)' }}
            aria-hidden="true"
          />

          {/* Laptop — the anchor. */}
          {LAPTOP && (
            <div className="absolute left-1/2 top-[15%] w-[80%] -translate-x-1/2">
              <div className="crop-marks bg-surface border-line relative overflow-hidden rounded-2xl border p-3 shadow-[var(--shadow-lift)] ring-1 ring-line/50">
                <ProductImage
                  src={LAPTOP.image}
                  alt={`${LAPTOP.brand} ${LAPTOP.name}`}
                  category={LAPTOP.category}
                  name={LAPTOP.name}
                  className="aspect-[16/10] w-full rounded-xl"
                  eager
                  sizes="(max-width: 1024px) 80vw, 38vw"
                />
              </div>

              <figcaption className="mt-3.5 flex items-end justify-between gap-3 px-1">
                <div>
                  <span className="label text-brand">{LAPTOP.category}</span>
                  <p className="font-display text-ink mt-1 text-[15px] leading-tight font-bold tracking-[-0.02em]">
                    {LAPTOP.brand} {LAPTOP.name}
                  </p>
                </div>
                <p className="font-mono text-ink shrink-0 text-[14px] font-semibold">
                  {formatPrice(LAPTOP.price)}
                </p>
              </figcaption>
            </div>
          )}

          {/* Smartphone — top-right accent. */}
          {PHONE && (
            <div className="hero-float absolute right-0 top-0 w-[32%]">
              <div className="bg-surface border-line relative overflow-hidden rounded-[20px] border p-2 shadow-[var(--shadow-lift)] ring-1 ring-line/50">
                <ProductImage
                  src={PHONE.image}
                  alt={`${PHONE.brand} ${PHONE.name}`}
                  category={PHONE.category}
                  name={PHONE.name}
                  className="aspect-[3/4] w-full rounded-[14px]"
                  sizes="(max-width: 1024px) 32vw, 15vw"
                />
                <span className="label bg-surface/85 text-ink-2 absolute top-2.5 left-2.5 rounded-full px-2 py-1 backdrop-blur-sm">
                  {PHONE.category}
                </span>
              </div>
            </div>
          )}

          {/* Headphones — bottom-left accent. */}
          {HEADPHONES && (
            <div className="hero-float-2 absolute bottom-[3%] left-0 w-[37%]">
              <div className="bg-surface border-line relative overflow-hidden rounded-2xl border p-2 shadow-[var(--shadow-lift)] ring-1 ring-line/50">
                <ProductImage
                  src={HEADPHONES.image}
                  alt={`${HEADPHONES.brand} ${HEADPHONES.name}`}
                  category={HEADPHONES.category}
                  name={HEADPHONES.name}
                  className="aspect-square w-full rounded-xl"
                  sizes="(max-width: 1024px) 37vw, 17vw"
                />
                <span className="label bg-surface/85 text-ink-2 absolute bottom-2.5 left-2.5 rounded-full px-2 py-1 backdrop-blur-sm">
                  {HEADPHONES.category}
                </span>
              </div>
            </div>
          )}
        </figure>
      </div>
    </section>
  );
}
