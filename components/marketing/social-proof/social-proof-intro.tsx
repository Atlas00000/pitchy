/**
 * Asymmetric headline for the social proof band.
 */

export function SocialProofIntro() {
  return (
    <div className="relative lg:col-span-5">
      <div className="inline-flex items-center gap-2 rounded-full border border-pitchly-border-strong/55 bg-pitchly-canvas/80 px-3 py-1 shadow-sm backdrop-blur-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-pitchly-score-excellence shadow-[0_0_0_3px_rgb(16_185_129/0.18)]" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-pitchly-brand">Signal</span>
      </div>

      <h2 className="mt-6 max-w-xl text-left text-4xl font-bold leading-[1.08] tracking-tight text-pitchly-text-primary sm:text-5xl lg:text-[2.65rem] lg:leading-[1.05]">
        Proof lives in{" "}
        <span className="bg-gradient-to-r from-pitchly-brand via-pitchly-brand-muted to-pitchly-score-excellence bg-clip-text text-transparent">
          throughput and tone
        </span>
        — not taglines.
      </h2>

      <p className="mt-5 max-w-md text-left text-base leading-relaxed text-pitchly-text-secondary sm:text-lg">
        Numbers that mirror how Pitchly is used, plus verbatim manager narratives you can skim in seconds.
      </p>

      <p className="mt-6 max-w-sm text-left text-sm font-medium leading-relaxed text-pitchly-text-muted">
        Hover the metrics to feel the stack breathe. Use the quote rail to swap stories without losing context.
      </p>

      <div className="mt-10 hidden h-px w-28 bg-gradient-to-r from-pitchly-brand via-pitchly-score-excellence/70 to-transparent lg:block" />
    </div>
  )
}
