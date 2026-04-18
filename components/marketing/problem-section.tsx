const PROBLEMS = [
  {
    icon: "⏱",
    title: "Hours lost reviewing calls manually",
    description:
      "Managers spend 5–10 hours a week listening to recordings and writing feedback — time that should go to strategy and coaching.",
    accent: "border-l-pitchly-brand",
  },
  {
    icon: "📉",
    title: "Inconsistent feedback across reps",
    description:
      "Without a structured rubric, two reps with the same performance get wildly different feedback depending on the manager's mood and memory.",
    accent: "border-l-pitchly-score-caution",
  },
  {
    icon: "🔇",
    title: "Reps wait days for coaching",
    description:
      "By the time feedback arrives, the deal has moved on. Delayed coaching means missed patterns and repeated mistakes call after call.",
    accent: "border-l-pitchly-score-critical",
  },
] as const

export function ProblemSection() {
  return (
    <section className="border-y border-pitchly-border bg-pitchly-surface py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-pitchly-brand">
            The problem
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-pitchly-text-primary sm:text-4xl">
            Sales coaching is broken at scale
          </h2>
          <p className="mt-4 text-base text-pitchly-text-secondary">
            As your team grows, manual review becomes the bottleneck. Feedback gets slower, more
            inconsistent, and easier to skip entirely.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {PROBLEMS.map(({ icon, title, description, accent }) => (
            <div
              key={title}
              className={`rounded-xl border border-pitchly-border bg-pitchly-canvas p-8 shadow-pitchly-raised transition-all duration-150 ease-out hover:-translate-y-0.5 hover:shadow-pitchly-floating border-l-4 ${accent}`}
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md border border-pitchly-border bg-pitchly-surface text-2xl">
                {icon}
              </div>
              <h3 className="mb-3 text-base font-semibold text-pitchly-text-primary">{title}</h3>
              <p className="text-sm leading-relaxed text-pitchly-text-secondary">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
