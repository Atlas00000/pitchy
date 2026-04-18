const TESTIMONIALS = [
  {
    quote:
      "We went from weekly call reviews to instant feedback on every single call. Our reps improved faster in one month than they had in the previous six.",
    name: "Sarah Chen",
    role: "VP of Sales",
    company: "Reachify",
    initials: "SC",
    avatarClass: "bg-pitchly-brand-light text-pitchly-brand",
  },
  {
    quote:
      "The objection tagging alone is worth it. I can see exactly where deals are dying and coach my reps on the specific moments that matter.",
    name: "Marcus Davis",
    role: "Sales Manager",
    company: "Stackform",
    initials: "MD",
    avatarClass: "bg-pitchly-raised text-pitchly-text-secondary",
  },
  {
    quote:
      "I used to spend Sunday evenings reviewing call recordings. Now I spend 20 minutes reviewing AI summaries. Game changer for my work-life balance.",
    name: "Priya Nair",
    role: "Director of Revenue",
    company: "Cloudbase",
    initials: "PN",
    avatarClass: "bg-pitchly-brand-light/80 text-pitchly-score-excellence",
  },
] as const

const STATS = [
  { value: "10×", label: "More calls reviewed per manager" },
  { value: "<30s", label: "Time to full analysis" },
  { value: "94%", label: "Reps say feedback is actionable" },
] as const

export function SocialProof() {
  return (
    <section className="bg-pitchly-canvas py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-20 grid grid-cols-3 gap-8 rounded-xl border border-pitchly-border bg-pitchly-surface px-8 py-10 shadow-pitchly-raised">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="font-mono text-4xl font-bold text-pitchly-text-primary">{value}</p>
              <p className="mt-1.5 text-sm text-pitchly-text-secondary">{label}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-pitchly-brand">
            What people are saying
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-pitchly-text-primary sm:text-4xl">
            Loved by sales managers and reps alike
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {TESTIMONIALS.map(({ quote, name, role, company, initials, avatarClass }) => (
            <div
              key={name}
              className="flex flex-col justify-between rounded-xl border border-pitchly-border bg-pitchly-canvas p-7 shadow-pitchly-raised transition-shadow duration-150 hover:shadow-pitchly-floating"
            >
              <p className="text-sm leading-relaxed text-pitchly-text-secondary">&ldquo;{quote}&rdquo;</p>

              <div className="mt-6 flex items-center gap-3">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${avatarClass}`}
                >
                  {initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-pitchly-text-primary">{name}</p>
                  <p className="text-xs text-pitchly-text-muted">
                    {role} · {company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
