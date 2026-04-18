const PROBLEMS = [
  {
    icon: "⏱",
    title: "Hours lost reviewing calls manually",
    description:
      "Managers spend 5–10 hours a week listening to recordings and writing feedback — time that should go to strategy and coaching.",
  },
  {
    icon: "📉",
    title: "Inconsistent feedback across reps",
    description:
      "Without a structured rubric, two reps with the same performance get wildly different feedback depending on the manager's mood and memory.",
  },
  {
    icon: "🔇",
    title: "Reps wait days for coaching",
    description:
      "By the time feedback arrives, the deal has moved on. Delayed coaching means missed patterns and repeated mistakes call after call.",
  },
]

export function ProblemSection() {
  return (
    <section className="bg-slate-900 py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-indigo-400">
            The problem
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Sales coaching is broken at scale
          </h2>
          <p className="mt-4 text-base text-slate-400">
            As your team grows, manual review becomes the bottleneck. Feedback gets slower, more
            inconsistent, and easier to skip entirely.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {PROBLEMS.map(({ icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-700/60 bg-slate-800/60 p-8 transition-all hover:border-slate-600 hover:bg-slate-800"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-700/80 text-2xl">
                {icon}
              </div>
              <h3 className="mb-3 text-base font-semibold text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-slate-400">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
