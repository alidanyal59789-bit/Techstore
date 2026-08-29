import { useEffect, useRef, useState } from 'react';
import { Icon, CATEGORY_ICONS } from './Icon';

/**
 * Product photo with a designed failure state.
 *
 * Remote images can be slow or gone, and the brief is explicit that neither
 * should spoil the layout, so this component covers three cases:
 *
 *   loading — a quiet pulse in the image well, no layout shift
 *   loaded  — the photo, faded in
 *   error   — the category glyph plus the product name, still on-brand
 *
 * The fallback is deliberately not a "broken image" apology. It reads as a
 * catalogue plate awaiting its photograph, which is a state a real catalogue
 * has too.
 */
export function ProductImage({
  src,
  alt,
  category,
  name,
  className = '',
  imgClassName = '',
  sizes,
  eager = false,
}) {
  const imgRef = useRef(null);
  const [status, setStatus] = useState('loading');

  /* Two things have to be right here, and both are answered by asking the
     element rather than waiting for an event:
       - a cached image can finish before React attaches `onLoad`, so the load
         event never arrives and the photo would sit at opacity 0 forever;
       - a changed `src` must not inherit the previous image's status. */
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    if (img.complete) setStatus(img.naturalWidth > 0 ? 'loaded' : 'error');
    else setStatus('loading');
  }, [src]);

  const glyph = CATEGORY_ICONS[category] ?? 'shield';

  return (
    <div className={`bg-surface-2 relative overflow-hidden ${className}`}>
      {status === 'loading' && (
        <div className="bg-line/40 absolute inset-0 animate-pulse" aria-hidden="true" />
      )}

      {/* Kept mounted in every state so the ref above always has an element to
          ask, and so a failed photo can be covered rather than swapped out. */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        sizes={sizes}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        draggable="false"
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
        className={`h-full w-full object-cover transition-opacity duration-500 ${
          status === 'loaded' ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />

      {status === 'error' && (
        <div className="bg-surface-2 absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center">
          <Icon name={glyph} size={30} className="text-ink-3" strokeWidth={1.3} />
          <span className="label text-ink-3 leading-relaxed">{name ?? category}</span>
          <span className="label text-ink-3/70 text-[9px]">Image unavailable</span>
        </div>
      )}
    </div>
  );
}
