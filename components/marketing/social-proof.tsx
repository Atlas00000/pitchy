const TESTIMONIALS = [
  {
    quote:
      "We went from weekly call reviews to instant feedback on every single call. Our reps improved faster in one month than they had in the previous six.",
    name: "Sarah Chen",
    role: "VP of Sales",
    company: "Reachify",
    initials: "SC",
    color: "bg-indigo-100 text-indigo-700",
  },
  {
    quote:
      "The objection tagging alone is worth it. I can see exactly where deals are dying and coach my reps on the specific moments that matter.",
    name: "Marcus Davis",
    role: "Sales Manager",
    company: "Stackform",
    initials: "MD",
    color: "bg-slate-100 text-slate-600",
  },
  {
    quote:
      "I used to spend Sunday evenings reviewing call recordings. Now I spend 20 minutes reviewing AI summaries. Game changer for my work-life balance.",
    name: "Priya Nair",
    role: "Director of Revenue",
    company: "Cloudbase",
    initials: "PN",
    color: "bg-emerald-100 text-emerald-700",
  },
]

const STATS = [
  { value: "10×", label: "More calls reviewed per manager" },
  { value: "<30s", label: "Time to full analysis" },
  { value: "94%", label: "Reps say feedback is actionable" },
]

export function SocialProof() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Stats strip */}
        <div className="mb-20 grid grid-cols-3 gap-8 rounded-2xl border border-slate-100 bg-slate-50 px-8 py-10">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="font-mono text-4xl font-bold text-slate-900">{value}</p>
              <p className="mt-1.5 text-sm text-slate-500">{label}</p>
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-indigo-600">
            What people are saying
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Loved by sales managers and reps alike
          </h2>
        </div>

        {/* Testimonials */}
        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {TESTIMONIALS.map(({ quote, name, role, company, initials, color }) => (
            <div
              key={name}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
            >
              {/* Quote */}
              <p className="text-sm leading-relaxed text-slate-600">"{quote}"</p>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${color}`}
                >
                  {initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{name}</p>
                  <p className="text-xs text-slate-400">
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
