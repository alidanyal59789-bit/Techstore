/**
 * Shared section header: monospace eyebrow, display heading, optional lede.
 * Used by the category and product sections so their hierarchy matches.
 */
export function SectionHead({ eyebrow, title, lede, action, className = '' }) {
  return (
    <div className={`flex flex-wrap items-end justify-between gap-6 ${className}`}>
      <div className="reveal max-w-[52ch]">
        {eyebrow && (
          <p className="label text-brand flex items-center gap-2.5">
            <span className="bg-brand/40 h-px w-6" aria-hidden="true" />
            {eyebrow}
          </p>
        )}
        <h2 className="display text-ink mt-3 text-[clamp(1.8rem,3.6vw,2.7rem)] leading-[1.05]">
          {title}
        </h2>
        {lede && <p className="text-ink-2 mt-4 text-[15px] leading-relaxed sm:text-base">{lede}</p>}
      </div>
      {action && <div className="reveal" style={{ '--d': '120ms' }}>{action}</div>}
    </div>
  );
}
