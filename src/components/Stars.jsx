import { useId } from 'react';
import { StarIcon } from './Icon';
import { formatCount } from '../lib/format';

/**
 * Five stars filled proportionally to `rating`, plus the numeric value.
 *
 * The stars are decorative (aria-hidden inside StarIcon); the accessible
 * reading comes from the visually-hidden sentence, so a screen reader hears
 * "Rated 4.8 out of 5 from 1,284 reviews" instead of five unlabelled shapes.
 */
export function Stars({ rating, reviews, size = 13, className = '' }) {
  const uid = useId();

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="text-amber flex items-center gap-0.5">
        {[0, 1, 2, 3, 4].map((index) => (
          <StarIcon
            key={index}
            id={`${uid}-${index}`}
            size={size}
            // Clamp each star's fill to its own 0–1 slice of the rating.
            fill={Math.max(0, Math.min(1, rating - index))}
          />
        ))}
      </div>

      <span className="font-mono text-ink-2 text-[11px] font-medium">
        {rating.toFixed(1)}
      </span>

      {reviews != null && (
        <span className="font-mono text-ink-3 text-[11px]">
          ({formatCount(reviews)})
        </span>
      )}

      <span className="sr-only">
        Rated {rating.toFixed(1)} out of 5
        {reviews != null && ` from ${formatCount(reviews)} reviews`}
      </span>
    </div>
  );
}
