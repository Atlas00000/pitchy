import Link from "next/link"

const TIERS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "For individuals and small teams getting started with AI-powered call analysis.",
    cta: "Start for free",
    ctaHref: "/sign-up",
    featured: false,
    features: [
      "Up to 10 calls / month",
      "AI summary + scoring",
      "Objection tagging",
      "Coaching notes",
      "Gemini 2.5 Flash model",
      "1 user",
    ],
  },
  {
    name: "Pro",
    price: "$49",
    period: "per seat / month",
    description: "For growing sales teams that need unlimited analysis, team analytics, and BYO model.",
    cta: "Start free trial",
    ctaHref: "/sign-up",
    featured: true,
    features: [
      "Unlimited calls",
      "Everything in Free",
      "Team analytics dashboard",
      "Rep performance insights",
      "Rep leaderboard",
      "BYO Claude / GPT-4 key",
      "Manager + rep roles",
      "Priority support",
    ],
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-indigo-600">
            Pricing
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-base text-slate-500">
            Start free, upgrade when you need team features. No hidden fees, no per-call charges.
          </p>
        </div>

        {/* Tier cards */}
        <div className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-2">
          {TIERS.map(({ name, price, period, description, cta, ctaHref, featured, features }) => (
            <div
              key={name}
              className={`relative flex flex-col rounded-2xl p-8 ${
                featured
                  ? "bg-indigo-600 shadow-2xl shadow-indigo-200 border border-indigo-500"
                  : "bg-white border border-slate-200 shadow-sm"
              }`}
            >
              {featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-amber-400 px-4 py-1 text-xs font-bold text-amber-900 shadow-sm">
                    Most popular
                  </span>
                </div>
              )}

              {/* Tier header */}
              <div className="mb-6">
                <p className={`text-sm font-semibold ${featured ? "text-indigo-200" : "text-slate-500"}`}>
                  {name}
                </p>
                <div className="mt-2 flex items-end gap-2">
                  <span className={`font-mono text-4xl font-bold ${featured ? "text-white" : "text-slate-900"}`}>
                    {price}
                  </span>
                  <span className={`mb-1 text-sm ${featured ? "text-indigo-200" : "text-slate-400"}`}>
                    {period}
                  </span>
                </div>
                <p className={`mt-3 text-sm leading-relaxed ${featured ? "text-indigo-100" : "text-slate-500"}`}>
                  {description}
                </p>
              </div>

              {/* CTA */}
              <Link
                href={ctaHref}
                className={`mb-8 w-full rounded-xl py-3 text-center text-sm font-semibold transition-all hover:-translate-y-0.5 ${
                  featured
                    ? "bg-white text-indigo-600 shadow-md hover:shadow-lg"
                    : "bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 hover:shadow-md"
                }`}
              >
                {cta}
              </Link>

              {/* Features */}
              <ul className="space-y-3">
                {features.map((feat) => (
                  <li key={feat} className="flex items-center gap-3">
                    <svg
                      className={`h-4 w-4 shrink-0 ${featured ? "text-indigo-200" : "text-indigo-500"}`}
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M3 8L6.5 11.5L13 4.5"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className={`text-sm ${featured ? "text-indigo-100" : "text-slate-600"}`}>
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-slate-400">
          All plans include a 14-day free trial on Pro. No credit card required to start.
        </p>
      </div>
    </section>
  )
}
