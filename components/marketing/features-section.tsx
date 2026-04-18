const FEATURES = [
  {
    icon: "📄",
    title: "Transcript Upload & Viewer",
    description:
      "Paste text or upload .txt, .pdf, .docx files. Client-side parsing, zero server overhead. Objection positions highlighted inline.",
    tag: "Core",
    tagClass: "bg-pitchly-brand-light text-pitchly-brand",
    borderAccent: "border-l-pitchly-brand",
  },
  {
    icon: "✍️",
    title: "AI Call Summaries",
    description:
      "One-paragraph summary covering key topics, prospect pain points, deal context, and agreed next steps — generated in seconds.",
    tag: "AI",
    tagClass: "bg-pitchly-raised text-pitchly-text-secondary",
    borderAccent: "border-l-pitchly-border-strong",
  },
  {
    icon: "🎯",
    title: "Call Grading & Scoring",
    description:
      "4-dimension scorecard: Discovery, Objection Handling, Talk/Listen Ratio, Next Step Clarity. Color-coded 0–10 with weighted overall.",
    tag: "AI",
    tagClass: "bg-pitchly-raised text-pitchly-text-secondary",
    borderAccent: "border-l-pitchly-score-caution",
  },
  {
    icon: "🚩",
    title: "Objection Tagging",
    description:
      "Every objection identified, categorized (price, timing, authority, need), and highlighted inline with a suggested response for each.",
    tag: "AI",
    tagClass: "bg-pitchly-raised text-pitchly-text-secondary",
    borderAccent: "border-l-pitchly-score-critical",
  },
  {
    icon: "💬",
    title: "Coaching Notes",
    description:
      "3–5 specific notes per call: what the rep did well and what to improve, written in direct coaching tone with concrete action steps.",
    tag: "AI",
    tagClass: "bg-pitchly-raised text-pitchly-text-secondary",
    borderAccent: "border-l-pitchly-brand-muted",
  },
  {
    icon: "👤",
    title: "Rep Performance Insights",
    description:
      "Per-rep dashboard with score trends, objection frequency, call volume, and avg score — updated automatically after every call.",
    tag: "Analytics",
    tagClass: "bg-pitchly-brand-light/80 text-pitchly-score-excellence",
    borderAccent: "border-l-pitchly-score-excellence",
  },
  {
    icon: "📊",
    title: "Team Analytics & Trends",
    description:
      "Team-level score trends, top objections across all calls, rep leaderboard, and call volume by rep — one view for the whole team.",
    tag: "Analytics",
    tagClass: "bg-pitchly-brand-light/80 text-pitchly-score-excellence",
    borderAccent: "border-l-pitchly-brand",
  },
] as const

export function FeaturesSection() {
  return (
    <section id="features" className="bg-pitchly-surface py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-pitchly-brand">
            Features
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-pitchly-text-primary sm:text-4xl">
            Everything your team needs to improve
          </h2>
          <p className="mt-4 text-base text-pitchly-text-secondary">
            Seven integrated features that cover the full coaching loop — from raw transcript to
            team-wide performance trends.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon, title, description, tag, tagClass, borderAccent }) => (
            <div
              key={title}
              className={`group rounded-xl border border-pitchly-border bg-pitchly-canvas p-7 shadow-pitchly-raised transition-all duration-150 ease-out border-l-4 hover:-translate-y-1 hover:shadow-pitchly-floating ${borderAccent}`}
            >
              <div className="mb-4 flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-md border border-pitchly-border bg-pitchly-surface text-xl">
                  {icon}
                </span>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${tagClass}`}>
                  {tag}
                </span>
              </div>
              <h3 className="mb-2 text-sm font-semibold text-pitchly-text-primary">{title}</h3>
              <p className="text-sm leading-relaxed text-pitchly-text-secondary">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
