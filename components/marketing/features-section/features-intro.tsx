/**
 * Asymmetric features headline — pairs with the bento grid column.
 */

export function FeaturesIntro() {
  return (
    <div className="relative lg:col-span-5">
      <div className="inline-flex items-center gap-2 rounded-full border border-pitchly-border-strong/50 bg-pitchly-canvas/75 px-3 py-1 shadow-sm backdrop-blur-sm">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-pitchly-brand-muted">
          01 — 07
        </span>
        <span className="h-3 w-px bg-pitchly-border-strong/70" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-pitchly-brand">Features</span>
      </div>

      <h2 className="mt-6 max-w-xl text-left text-4xl font-bold leading-[1.08] tracking-tight text-pitchly-text-primary sm:text-5xl lg:text-[2.7rem] lg:leading-[1.05]">
        A full coaching loop,{" "}
        <span className="bg-gradient-to-r from-pitchly-brand via-pitchly-brand-muted to-pitchly-score-excellence bg-clip-text text-transparent">
          engineered as one surface
        </span>
        .
      </h2>

      <p className="mt-5 max-w-md text-left text-base leading-relaxed text-pitchly-text-secondary sm:text-lg">
        Seven capabilities that mirror how managers actually work: ingest, interpret, score, flag, coach, then zoom from rep to team without changing tools.
      </p>

      <p className="mt-6 max-w-sm text-left text-sm font-medium leading-relaxed text-pitchly-text-muted">
        Tiles map to shipped modules — transcript reader, rubric scores, objection tags, coaching notes, rep and team
        analytics — the same depth you get after every upload.
      </p>

      <div className="mt-10 hidden h-px w-32 bg-gradient-to-r from-pitchly-brand via-pitchly-score-excellence/80 to-transparent lg:block" />
    </div>
  )
}
