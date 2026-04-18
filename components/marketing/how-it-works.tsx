const STEPS = [
  {
    step: "01",
    title: "Upload the transcript",
    description:
      "Paste raw text or upload a .txt, .pdf, or .docx file. Client-side parsing extracts the text — nothing stored until you submit.",
    accent: "border-pitchly-border bg-pitchly-brand-light",
    numberColor: "text-pitchly-brand",
  },
  {
    step: "02",
    title: "AI analyzes the call",
    description:
      "Pitchly runs a single-pass AI analysis: call summary, 4-dimension score, every objection tagged, and 3–5 coaching notes — all in under 30 seconds.",
    accent: "border-pitchly-border bg-pitchly-surface",
    numberColor: "text-pitchly-brand-muted",
  },
  {
    step: "03",
    title: "Coach and improve",
    description:
      "Reps get instant, specific feedback. Managers see team-wide trends, rep leaderboards, and objection patterns — without listening to a single recording.",
    accent: "border-pitchly-border bg-pitchly-brand-light/60",
    numberColor: "text-pitchly-score-excellence",
  },
] as const

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-pitchly-canvas py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-pitchly-brand">
            How it works
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-pitchly-text-primary sm:text-4xl">
            From transcript to coaching in 3 steps
          </h2>
          <p className="mt-4 text-base text-pitchly-text-secondary">
            No integrations, no setup, no waiting. Paste a transcript and walk away with a full
            coaching report.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {STEPS.map(({ step, title, description, accent, numberColor }, i) => (
            <div key={step} className="relative flex flex-col gap-5">
              {i < STEPS.length - 1 && (
                <div className="absolute left-[calc(100%+1rem)] top-8 hidden h-px w-8 -translate-y-1/2 bg-pitchly-border sm:block" />
              )}

              <div
                className={`flex h-16 w-16 items-center justify-center rounded-xl border-2 shadow-pitchly-raised ${accent}`}
              >
                <span className={`font-mono text-lg font-bold ${numberColor}`}>{step}</span>
              </div>
              <div>
                <h3 className="mb-2 text-base font-semibold text-pitchly-text-primary">{title}</h3>
                <p className="text-sm leading-relaxed text-pitchly-text-secondary">{description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 rounded-xl border border-pitchly-border bg-pitchly-surface px-8 py-8 shadow-pitchly-raised sm:flex-row">
          <div>
            <p className="font-semibold text-pitchly-text-primary">Ready to try it?</p>
            <p className="mt-1 text-sm text-pitchly-text-secondary">
              Upload your first transcript free — no credit card required.
            </p>
          </div>
          <a
            href="/sign-up"
            className="shrink-0 rounded-md bg-pitchly-brand px-6 py-3 text-sm font-semibold text-white shadow-pitchly-raised transition-all duration-150 ease-out hover:opacity-90 hover:shadow-pitchly-floating active:scale-[0.97]"
          >
            Start for free
          </a>
        </div>
      </div>
    </section>
  )
}
