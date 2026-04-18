const FEATURES = [
  {
    icon: "📄",
    title: "Transcript Upload & Viewer",
    description:
      "Paste text or upload .txt, .pdf, .docx files. Client-side parsing, zero server overhead. Objection positions highlighted inline.",
    tag: "Core",
    tagColor: "bg-indigo-50 text-indigo-700",
  },
  {
    icon: "✍️",
    title: "AI Call Summaries",
    description:
      "One-paragraph summary covering key topics, prospect pain points, deal context, and agreed next steps — generated in seconds.",
    tag: "AI",
    tagColor: "bg-slate-100 text-slate-600",
  },
  {
    icon: "🎯",
    title: "Call Grading & Scoring",
    description:
      "4-dimension scorecard: Discovery, Objection Handling, Talk/Listen Ratio, Next Step Clarity. Color-coded 0–10 with weighted overall.",
    tag: "AI",
    tagColor: "bg-slate-100 text-slate-600",
  },
  {
    icon: "🚩",
    title: "Objection Tagging",
    description:
      "Every objection identified, categorized (price, timing, authority, need), and highlighted inline with a suggested response for each.",
    tag: "AI",
    tagColor: "bg-slate-100 text-slate-600",
  },
  {
    icon: "💬",
    title: "Coaching Notes",
    description:
      "3–5 specific notes per call: what the rep did well and what to improve, written in direct coaching tone with concrete action steps.",
    tag: "AI",
    tagColor: "bg-slate-100 text-slate-600",
  },
  {
    icon: "👤",
    title: "Rep Performance Insights",
    description:
      "Per-rep dashboard with score trends, objection frequency, call volume, and avg score — updated automatically after every call.",
    tag: "Analytics",
    tagColor: "bg-emerald-50 text-emerald-700",
  },
  {
    icon: "📊",
    title: "Team Analytics & Trends",
    description:
      "Team-level score trends, top objections across all calls, rep leaderboard, and call volume by rep — one view for the whole team.",
    tag: "Analytics",
    tagColor: "bg-emerald-50 text-emerald-700",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-indigo-600">
            Features
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Everything your team needs to improve
          </h2>
          <p className="mt-4 text-base text-slate-500">
            Seven integrated features that cover the full coaching loop — from raw transcript to
            team-wide performance trends.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon, title, description, tag, tagColor }) => (
            <div
              key={title}
              className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:border-slate-300"
            >
              <div className="mb-4 flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 text-xl">
                  {icon}
                </span>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${tagColor}`}>
                  {tag}
                </span>
              </div>
              <h3 className="mb-2 text-sm font-semibold text-slate-900">{title}</h3>
              <p className="text-sm leading-relaxed text-slate-500">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
