/**
 * Asymmetric headline — left-weighted, pairs with the interactive flow column.
 */

export function HowItWorksIntro() {
  return (
    <div className="relative lg:col-span-5">
      <div className="inline-flex items-center gap-2 rounded-full border border-pitchly-border bg-pitchly-canvas/80 px-3 py-1 shadow-sm backdrop-blur-sm">
        <span className="h-1 w-1 rounded-full bg-pitchly-score-excellence shadow-[0_0_0_3px_rgb(16_185_129/0.2)]" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-pitchly-brand">
          How it works
        </span>
      </div>

      <h2 className="mt-6 max-w-xl text-left text-4xl font-bold leading-[1.08] tracking-tight text-pitchly-text-primary sm:text-5xl lg:text-[2.65rem] lg:leading-[1.06]">
        Transcript in.{" "}
        <span className="bg-gradient-to-r from-pitchly-brand via-pitchly-brand-muted to-pitchly-score-excellence bg-clip-text text-transparent">
          Coaching out.
        </span>
      </h2>

      <p className="mt-5 max-w-md text-left text-base leading-relaxed text-pitchly-text-secondary sm:text-lg">
        Three beats — ingest, analyze, act — without wiring CRMs or provisioning bots. The UI is the workflow: submit once, read the report, move the deal.
      </p>

      <p className="mt-6 max-w-sm text-left text-sm font-medium leading-relaxed text-pitchly-text-muted">
        Trace the pipeline on the right — hover any card, click to pin, or Tab to the timeline and use arrow keys.
      </p>

      <div className="mt-10 hidden h-px w-28 bg-gradient-to-r from-pitchly-score-excellence/80 via-pitchly-brand to-transparent lg:block" />
    </div>
  )
}
