/**
 * Asymmetric pricing headline — pairs with tier stack on large screens.
 */

export function PricingIntro() {
  return (
    <div className="relative lg:col-span-5">
      <div className="inline-flex items-center gap-2 rounded-full border border-pitchly-border-strong/55 bg-pitchly-canvas/80 px-3 py-1 shadow-sm backdrop-blur-sm">
        <span className="h-px w-8 bg-gradient-to-r from-transparent via-pitchly-brand to-transparent" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-pitchly-brand">Pricing</span>
      </div>

      <h2 className="mt-6 max-w-xl text-left text-4xl font-bold leading-[1.08] tracking-tight text-pitchly-text-primary sm:text-5xl lg:text-[2.65rem] lg:leading-[1.05]">
        Two lanes.{" "}
        <span className="bg-gradient-to-r from-pitchly-brand via-pitchly-brand-muted to-pitchly-score-excellence bg-clip-text text-transparent">
          Zero invoice theater
        </span>
        .
      </h2>

      <p className="mt-5 max-w-md text-left text-base leading-relaxed text-pitchly-text-secondary sm:text-lg">
        Free proves the workflow on real calls. Pro unlocks volume, shared analytics, and your own model keys — same surface, sharper throughput.
      </p>

      <p className="mt-6 max-w-sm text-left text-sm font-medium leading-relaxed text-pitchly-text-muted">
        Hover either lane to spotlight it. Click a card to pin while you compare. Arrow keys work when the tier panel is focused.
      </p>

      <div className="mt-10 hidden h-px w-32 bg-gradient-to-r from-pitchly-brand to-pitchly-brand-muted/40 to-transparent lg:block" />
    </div>
  )
}
