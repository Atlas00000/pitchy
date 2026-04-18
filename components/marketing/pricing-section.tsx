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
] as const

export function PricingSection() {
  return (
    <section id="pricing" className="bg-pitchly-surface py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-pitchly-brand">
            Pricing
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-pitchly-text-primary sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-base text-pitchly-text-secondary">
            Start free, upgrade when you need team features. No hidden fees, no per-call charges.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-2">
          {TIERS.map(({ name, price, period, description, cta, ctaHref, featured, features }) => (
            <div
              key={name}
              className={`relative flex flex-col rounded-xl p-8 shadow-pitchly-raised transition-shadow duration-150 hover:shadow-pitchly-floating ${
                featured
                  ? "border border-pitchly-brand bg-pitchly-brand shadow-pitchly-floating"
                  : "border border-pitchly-border bg-pitchly-canvas"
              }`}
            >
              {featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-pitchly-accent-amber px-4 py-1 text-xs font-bold text-pitchly-text-primary shadow-pitchly-raised">
                    Most popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <p
                  className={`text-sm font-semibold ${featured ? "text-pitchly-brand-light" : "text-pitchly-text-muted"}`}
                >
                  {name}
                </p>
                <div className="mt-2 flex items-end gap-2">
                  <span
                    className={`font-mono text-4xl font-bold ${featured ? "text-white" : "text-pitchly-text-primary"}`}
                  >
                    {price}
                  </span>
                  <span
                    className={`mb-1 text-sm ${featured ? "text-pitchly-brand-light/90" : "text-pitchly-text-muted"}`}
                  >
                    {period}
                  </span>
                </div>
                <p
                  className={`mt-3 text-sm leading-relaxed ${featured ? "text-white/90" : "text-pitchly-text-secondary"}`}
                >
                  {description}
                </p>
              </div>

              <Link
                href={ctaHref}
                className={`mb-8 w-full rounded-md py-3 text-center text-sm font-semibold transition-all duration-150 ease-out hover:-translate-y-0.5 active:scale-[0.99] ${
                  featured
                    ? "bg-pitchly-canvas text-pitchly-brand shadow-pitchly-raised hover:shadow-pitchly-floating"
                    : "bg-pitchly-brand text-white shadow-pitchly-raised hover:opacity-90 hover:shadow-pitchly-floating"
                }`}
              >
                {cta}
              </Link>

              <ul className="space-y-3">
                {features.map((feat) => (
                  <li key={feat} className="flex items-center gap-3">
                    <svg
                      className={`h-4 w-4 shrink-0 ${featured ? "text-pitchly-brand-light" : "text-pitchly-brand"}`}
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
                    <span className={`text-sm ${featured ? "text-white/95" : "text-pitchly-text-secondary"}`}>
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-pitchly-text-muted">
          All plans include a 14-day free trial on Pro. No credit card required to start.
        </p>
      </div>
    </section>
  )
}
