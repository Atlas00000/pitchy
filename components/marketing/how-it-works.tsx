const STEPS = [
  {
    step: "01",
    title: "Upload the transcript",
    description:
      "Paste raw text or upload a .txt, .pdf, or .docx file. Client-side parsing extracts the text — nothing stored until you submit.",
    accent: "bg-indigo-50 border-indigo-100",
    numberColor: "text-indigo-600",
  },
  {
    step: "02",
    title: "AI analyzes the call",
    description:
      "Pitchly runs a single-pass AI analysis: call summary, 4-dimension score, every objection tagged, and 3–5 coaching notes — all in under 30 seconds.",
    accent: "bg-sky-50 border-sky-100",
    numberColor: "text-sky-600",
  },
  {
    step: "03",
    title: "Coach and improve",
    description:
      "Reps get instant, specific feedback. Managers see team-wide trends, rep leaderboards, and objection patterns — without listening to a single recording.",
    accent: "bg-emerald-50 border-emerald-100",
    numberColor: "text-emerald-600",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-indigo-600">
            How it works
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            From transcript to coaching in 3 steps
          </h2>
          <p className="mt-4 text-base text-slate-500">
            No integrations, no setup, no waiting. Paste a transcript and walk away with a full
            coaching report.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {STEPS.map(({ step, title, description, accent, numberColor }) => (
            <div key={step} className="relative flex flex-col gap-5">
              {/* Connector line (desktop) */}
              <div className="hidden sm:block absolute top-8 left-[calc(100%+1rem)] w-8 h-px bg-slate-200 -translate-y-1/2" />

              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl border-2 ${accent}`}
              >
                <span className={`font-mono text-lg font-bold ${numberColor}`}>{step}</span>
              </div>
              <div>
                <h3 className="mb-2 text-base font-semibold text-slate-900">{title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div className="mt-16 rounded-2xl bg-slate-50 border border-slate-100 px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-semibold text-slate-900">Ready to try it?</p>
            <p className="mt-1 text-sm text-slate-500">
              Upload your first transcript free — no credit card required.
            </p>
          </div>
          <a
            href="/sign-up"
            className="shrink-0 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 hover:-translate-y-0.5 hover:shadow-md"
          >
            Start for free
          </a>
        </div>
      </div>
    </section>
  )
}
