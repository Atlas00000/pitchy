import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-pitchly-canvas pb-24 pt-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-pitchly-brand-light/80 blur-3xl" />
        <div className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-pitchly-surface blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-pitchly-border bg-pitchly-brand-light px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-pitchly-brand" />
          <span className="text-xs font-semibold uppercase tracking-widest text-pitchly-brand">
            AI Sales Manager
          </span>
        </div>

        <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-[1.1] tracking-tight text-pitchly-text-primary sm:text-6xl lg:text-7xl">
          Every call coached.{" "}
          <span className="bg-gradient-to-r from-pitchly-brand to-pitchly-brand-muted bg-clip-text text-transparent">
            Every rep improved.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-pitchly-text-secondary sm:text-xl">
          Upload a sales call transcript and get AI-generated scores, objection analysis, and
          actionable coaching notes in under 30 seconds.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/sign-up"
            className="rounded-xl bg-pitchly-brand px-8 py-3.5 text-base font-semibold text-white shadow-pitchly-floating transition-all duration-150 ease-out hover:-translate-y-0.5 hover:opacity-95 hover:shadow-pitchly-modal active:scale-[0.97]"
          >
            Start for free
          </Link>
          <Link
            href="#how-it-works"
            className="flex items-center gap-2 rounded-xl border border-pitchly-border bg-pitchly-canvas px-8 py-3.5 text-base font-semibold text-pitchly-text-secondary shadow-pitchly-raised transition-all duration-150 ease-out hover:border-pitchly-border-strong hover:shadow-pitchly-floating hover:text-pitchly-text-primary active:scale-[0.97]"
          >
            See how it works
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3 8H13M13 8L9 4M13 8L9 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        <p className="mt-8 text-sm text-pitchly-text-muted">
          Trusted by sales teams at fast-growing B2B SaaS companies
        </p>

        <div className="mx-auto mt-16 max-w-4xl overflow-hidden rounded-xl border border-pitchly-border bg-pitchly-canvas shadow-pitchly-floating">
          <div className="flex items-center gap-2 border-b border-pitchly-border bg-pitchly-surface px-5 py-3">
            <span className="h-3 w-3 rounded-full bg-pitchly-score-critical" />
            <span className="h-3 w-3 rounded-full bg-pitchly-score-caution" />
            <span className="h-3 w-3 rounded-full bg-pitchly-score-excellence" />
            <span className="ml-3 flex-1 rounded-md border border-pitchly-border bg-pitchly-canvas px-3 py-1 text-center font-mono text-xs text-pitchly-text-muted">
              app.pitchly.ai/calls/discovery-call
            </span>
          </div>
          <div className="grid grid-cols-3 gap-0 divide-x divide-pitchly-border bg-pitchly-canvas p-6">
            <div className="flex flex-col items-center gap-1 px-6">
              <span className="font-mono text-4xl font-bold text-pitchly-score-excellence">8.4</span>
              <span className="text-xs uppercase tracking-wide text-pitchly-text-muted">Overall Score</span>
            </div>
            <div className="flex flex-col items-center gap-1 px-6">
              <span className="font-mono text-4xl font-bold text-pitchly-brand">4</span>
              <span className="text-xs uppercase tracking-wide text-pitchly-text-muted">Objections Handled</span>
            </div>
            <div className="flex flex-col items-center gap-1 px-6">
              <span className="font-mono text-4xl font-bold text-pitchly-score-caution">3</span>
              <span className="text-xs uppercase tracking-wide text-pitchly-text-muted">Coaching Notes</span>
            </div>
          </div>
          <div className="space-y-3 border-t border-pitchly-border bg-pitchly-surface/80 p-6">
            {[
              { label: "Discovery Quality", score: 9, bar: "bg-pitchly-score-excellence", width: "w-[90%]" },
              { label: "Objection Handling", score: 8, bar: "bg-pitchly-score-excellence", width: "w-[80%]" },
              { label: "Talk / Listen Ratio", score: 7, bar: "bg-pitchly-score-caution", width: "w-[70%]" },
              { label: "Next Step Clarity", score: 9, bar: "bg-pitchly-score-excellence", width: "w-[90%]" },
            ].map(({ label, score, bar, width }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="w-40 shrink-0 text-right text-xs text-pitchly-text-secondary">{label}</span>
                <div className="h-2 flex-1 rounded-full bg-pitchly-raised">
                  <div className={`h-2 rounded-full ${bar} ${width}`} />
                </div>
                <span className="w-6 font-mono text-xs font-semibold text-pitchly-text-primary">{score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
