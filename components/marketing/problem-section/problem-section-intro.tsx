/**
 * Asymmetric headline block — left-weighted, not a narrow centered column.
 */

export function ProblemSectionIntro() {
  return (
    <div className="relative lg:col-span-5">
      <div className="inline-flex items-center gap-2 rounded-full border border-pitchly-border-strong/60 bg-pitchly-canvas/70 px-3 py-1 shadow-sm backdrop-blur-sm">
        <span className="h-px w-6 bg-gradient-to-r from-transparent via-pitchly-brand to-transparent" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-pitchly-brand">
          The bottleneck
        </span>
      </div>

      <h2 className="mt-6 max-w-xl text-left text-4xl font-bold leading-[1.08] tracking-tight text-pitchly-text-primary sm:text-5xl lg:text-[2.75rem] lg:leading-[1.06]">
        Coaching{" "}
        <span className="bg-gradient-to-r from-pitchly-brand via-pitchly-brand-muted to-pitchly-brand bg-clip-text text-transparent">
          does not scale
        </span>{" "}
        on spreadsheets and memory.
      </h2>

      <p className="mt-5 max-w-md text-left text-base leading-relaxed text-pitchly-text-secondary sm:text-lg">
        As headcount grows, manual review becomes the ceiling. Feedback slows, drifts, and gets skipped — while pipeline still expects a coached team.
      </p>

      {/* Decorative index line — ties visually to the pain rail */}
      <div className="mt-10 hidden h-px w-24 bg-gradient-to-r from-pitchly-brand via-pitchly-brand-muted to-transparent lg:block" />
    </div>
  )
}
