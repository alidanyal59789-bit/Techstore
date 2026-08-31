/**
 * Inline SVG icon set.
 *
 * Hand-rolled rather than pulled from a library: it keeps the bundle free of
 * another dependency and lets every glyph share one stroke weight, cap style
 * and 24-unit grid, which is what makes an icon set look drawn rather than
 * collected. Icons inherit colour via `currentColor`.
 */

const paths = {
  search: <path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm10 2-4.35-4.35" />,
  cart: (
    <>
      <path d="M3 4h2.2a1 1 0 0 1 .98.8L6.6 7m0 0 1.7 8.2a1 1 0 0 0 .98.8h8.85a1 1 0 0 0 .97-.76L21 7H6.6Z" />
      <circle cx="9.5" cy="20" r="1.4" />
      <circle cx="17.5" cy="20" r="1.4" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.5 1.5m11.2 11.2 1.5 1.5M19.1 4.9l-1.5 1.5M6.4 17.6l-1.5 1.5" />
    </>
  ),
  moon: <path d="M20.5 14.6A8.6 8.6 0 0 1 9.4 3.5a8.6 8.6 0 1 0 11.1 11.1Z" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  trash: (
    <>
      <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
      <path d="M6 7l1 12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-12" />
      <path d="M10 11v6M14 11v6" />
    </>
  ),
  arrowRight: <path d="M4 12h15m-6-6 6 6-6 6" />,
  arrowUp: <path d="M12 20V5m-6 6 6-6 6 6" />,
  chevronDown: <path d="M6 9l6 6 6-6" />,
  chevronRight: <path d="M9 6l6 6-6 6" />,
  check: <path d="M4 12.5l5 5L20 6.5" />,
  sliders: (
    <>
      <path d="M4 7h10m4 0h2M4 17h4m4 0h8" />
      <circle cx="16" cy="7" r="2.2" />
      <circle cx="10" cy="17" r="2.2" />
    </>
  ),
  shield: <path d="M12 3l7.5 3v5.4c0 4.3-3 8.2-7.5 9.6-4.5-1.4-7.5-5.3-7.5-9.6V6L12 3Z" />,
  truck: (
    <>
      <path d="M2 7h11v9H2zM13 10h4.6l2.9 3v3H13z" />
      <circle cx="6" cy="18.5" r="1.6" />
      <circle cx="16.5" cy="18.5" r="1.6" />
    </>
  ),
  refresh: <path d="M20 11a8 8 0 1 0-2.6 6M20 5v6h-6" />,
  user: (
    <>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="8" r="4" />
    </>
  ),
  'map-pin': (
    <>
      <path d="M12 21s7-5.5 7-11a7 7 0 0 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 5.19 13a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12 1.21.4 2.39.82 3.5a2 2 0 0 1-.57 2.11L8.09 10.69a16 16 0 0 0 6 6l1.36-1.36a2 2 0 0 1 2.11-.57c1.11.42 2.29.7 3.5.82A2 2 0 0 1 22 16.92Z" />,
  mail: (
    <>
      <rect x="2" y="4" width="20" height="14" rx="2" />
      <path d="m2 6 10 7L22 6" />
    </>
  ),
  'credit-card': (
    <>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
    </>
  ),
  shieldCheck: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />,
  heart: <path d="M12 20.2 4.5 12.7A4 4 0 0 1 12 6.2a4 4 0 0 1 7.5 6.5L12 20.2Z" />,
  lock: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2.2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </>
  ),
  spark: <path d="M12 3v4m0 10v4m9-9h-4M7 12H3m13.5-6.5-2.8 2.8M9.3 14.7l-2.8 2.8m11 0-2.8-2.8M9.3 9.3 6.5 6.5" />,

  /* ---- Category glyphs, drawn as simplified product silhouettes -------- */
  smartphone: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2.4" />
      <path d="M10.6 5.4h2.8" />
    </>
  ),
  laptop: (
    <>
      <path d="M5 5.5h14v10H5z" />
      <path d="M2.5 18.5h19l-1.4-3H3.9z" />
    </>
  ),
  headphones: (
    <>
      <path d="M4.5 14v-2a7.5 7.5 0 0 1 15 0v2" />
      <path d="M4.5 13.5h2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1Z" />
      <path d="M17.5 13.5h2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1Z" />
    </>
  ),
  keyboard: (
    <>
      <rect x="2.5" y="6.5" width="19" height="11" rx="1.8" />
      <path d="M6 10h.01M9.5 10h.01M13 10h.01M16.5 10h.01M7.5 14h9" />
    </>
  ),
  smartwatch: (
    <>
      <rect x="6.5" y="6.5" width="11" height="11" rx="2.6" />
      <path d="M9.5 6.5V3.5h5v3M9.5 17.5v3h5v-3" />
    </>
  ),

  /* ---- Footer social -------------------------------------------------- */
  x: <path d="M4 4l16 16M20 4L4 20" />,
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.8" />
      <path d="M16.9 7.2h.01" />
    </>
  ),
  github: (
    <path d="M9 20.5c-4.2 1.2-4.2-2.4-6-3m12 5v-3.6c0-1 .1-1.4-.5-2 2.3-.3 4.5-1.2 4.5-5a4 4 0 0 0-1.1-2.8 3.7 3.7 0 0 0-.1-2.8s-1.2-.4-3.8 1.4a9.4 9.4 0 0 0-5 0C6.4 4.1 5.2 4.5 5.2 4.5a3.7 3.7 0 0 0-.1 2.8A4 4 0 0 0 4 10.1c0 3.8 2.2 4.7 4.5 5-.6.6-.6 1.2-.5 2V23" />
  ),
  linkedin: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
      <path d="M8 10.5V16M8 7.6h.01M12 16v-3.2a1.9 1.9 0 0 1 3.8 0V16" />
    </>
  ),
};

/** Category name -> glyph key, so cards and chips stay in step automatically. */
export const CATEGORY_ICONS = {
  Smartphones: 'smartphone',
  Laptops: 'laptop',
  Headphones: 'headphones',
  Keyboards: 'keyboard',
  Smartwatches: 'smartwatch',
};

export function Icon({ name, size = 18, className = '', strokeWidth = 1.6, filled = false, ...rest }) {
  const glyph = paths[name];
  if (!glyph) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {glyph}
    </svg>
  );
}

/**
 * Rating star. Filled proportionally so a 4.5 shows a half star rather than
 * rounding — the number beside it would otherwise disagree with the graphic.
 */
export function StarIcon({ fill = 1, size = 13, id }) {
  const clipId = `star-clip-${id}`;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      className="shrink-0"
    >
      <defs>
        <clipPath id={clipId}>
          <rect x="0" y="0" width={24 * fill} height="24" />
        </clipPath>
      </defs>
      <path
        d="M12 2.6l2.9 5.9 6.5.95-4.7 4.6 1.1 6.45L12 17.45 6.2 20.5l1.1-6.45-4.7-4.6 6.5-.95L12 2.6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        opacity="0.32"
      />
      {fill > 0 && (
        <path
          d="M12 2.6l2.9 5.9 6.5.95-4.7 4.6 1.1 6.45L12 17.45 6.2 20.5l1.1-6.45-4.7-4.6 6.5-.95L12 2.6Z"
          fill="currentColor"
          clipPath={`url(#${clipId})`}
        />
      )}
    </svg>
  );
}
