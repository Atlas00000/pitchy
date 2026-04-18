/**
 * Marketing pricing — tier facts only (no UI).
 */

export type PricingTierId = "free" | "pro"

export type PricingTier = {
  id: PricingTierId
  name: string
  price: string
  period: string
  description: string
  cta: string
  ctaHref: string
  /** Primary tier for teams — drives layout emphasis, not a fake discount. */
  primary: boolean
  /** Short positioning line under the price. */
  tagline: string
  features: readonly string[]
}

export const PRICING_TIERS: readonly PricingTier[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    description: "For reps and managers proving the loop on real calls before rolling it out to the org.",
    cta: "Start for free",
    ctaHref: "/sign-up",
    primary: false,
    tagline: "Ship your first analyses this week",
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
    id: "pro",
    name: "Pro",
    price: "$49",
    period: "per seat / month",
    description: "For teams that want unlimited volume, shared analytics, and your own model keys in the same workspace.",
    cta: "Start free trial",
    ctaHref: "/sign-up",
    primary: true,
    tagline: "Everything in Free, scaled for the floor",
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
