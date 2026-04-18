import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pb-24 pt-20">
      {/* Background gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-indigo-50 opacity-60 blur-3xl" />
        <div className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-sky-50 opacity-50 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
            AI Sales Manager
          </span>
        </div>

        {/* Headline */}
        <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
          Every call coached.{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
            Every rep improved.
          </span>
        </h1>

        {/* Subtext */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-500 sm:text-xl">
          Upload a sales call transcript and get AI-generated scores, objection analysis, and
          actionable coaching notes in under 30 seconds.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/sign-up"
            className="rounded-xl bg-indigo-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 hover:-translate-y-0.5"
          >
            Start for free
          </Link>
          <Link
            href="#how-it-works"
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-8 py-3.5 text-base font-semibold text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
          >
            See how it works
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {/* Social proof micro-line */}
        <p className="mt-8 text-sm text-slate-400">
          Trusted by sales teams at fast-growing B2B SaaS companies
        </p>

        {/* Dashboard preview card */}
        <div className="mx-auto mt-16 max-w-4xl overflow-hidden rounded-2xl border border-slate-200 shadow-2xl shadow-slate-200/60">
          <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-5 py-3">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
            <span className="ml-3 flex-1 rounded bg-white px-3 py-1 text-center text-xs text-slate-400 font-mono border border-slate-100">
              app.pitchly.ai/calls/discovery-call
            </span>
          </div>
          <div className="grid grid-cols-3 divide-x divide-slate-100 bg-white p-6 gap-0">
            <div className="flex flex-col items-center gap-1 px-6">
              <span className="font-mono text-4xl font-bold text-emerald-500">8.4</span>
              <span className="text-xs text-slate-400 uppercase tracking-wide">Overall Score</span>
            </div>
            <div className="flex flex-col items-center gap-1 px-6">
              <span className="font-mono text-4xl font-bold text-indigo-500">4</span>
              <span className="text-xs text-slate-400 uppercase tracking-wide">Objections Handled</span>
            </div>
            <div className="flex flex-col items-center gap-1 px-6">
              <span className="font-mono text-4xl font-bold text-amber-500">3</span>
              <span className="text-xs text-slate-400 uppercase tracking-wide">Coaching Notes</span>
            </div>
          </div>
          <div className="space-y-3 bg-slate-50/50 p-6 border-t border-slate-100">
            {[
              { label: "Discovery Quality", score: 9, color: "bg-emerald-500", width: "w-[90%]" },
              { label: "Objection Handling", score: 8, color: "bg-emerald-500", width: "w-[80%]" },
              { label: "Talk / Listen Ratio", score: 7, color: "bg-amber-500", width: "w-[70%]" },
              { label: "Next Step Clarity", score: 9, color: "bg-emerald-500", width: "w-[90%]" },
            ].map(({ label, score, color, width }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="w-40 text-right text-xs text-slate-500 shrink-0">{label}</span>
                <div className="flex-1 rounded-full bg-slate-100 h-2">
                  <div className={`h-2 rounded-full ${color} ${width}`} />
                </div>
                <span className="w-6 font-mono text-xs font-semibold text-slate-700">{score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
