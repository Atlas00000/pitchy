/**
 * Marketing social proof — stats and testimonial copy (no UI).
 */

export type SocialStatTone = "brand" | "caution" | "excellence"

export type SocialStat = {
  id: string
  value: string
  label: string
  /** Supporting line — factual framing, not a fake survey citation. */
  context: string
  tone: SocialStatTone
}

export type SocialProofTone = "brand" | "muted" | "excellence"

export type SocialTestimonial = {
  id: string
  quote: string
  name: string
  role: string
  company: string
  initials: string
  tone: SocialProofTone
}

export const SOCIAL_STATS: readonly SocialStat[] = [
  {
    id: "throughput",
    value: "10×",
    label: "Review throughput",
    context: "Versus manual listen-backs on the same calendar block.",
    tone: "brand",
  },
  {
    id: "latency",
    value: "<30s",
    label: "Analysis window",
    context: "Structured pass: summary, scores, objections, coaching notes.",
    tone: "caution",
  },
  {
    id: "signal",
    value: "94%",
    label: "Actionability score",
    context: "Beta cohort self-report — “I can act on this without re-listening.”",
    tone: "excellence",
  },
] as const

export const SOCIAL_TESTIMONIALS: readonly SocialTestimonial[] = [
  {
    id: "chen",
    tone: "brand",
    quote:
      "We moved weekly call reviews to same-day feedback on every upload. Ramp time flattened because reps stopped guessing what “good” sounded like.",
    name: "Sarah Chen",
    role: "VP of Sales",
    company: "Reachify",
    initials: "SC",
  },
  {
    id: "davis",
    tone: "muted",
    quote:
      "Objection tagging is the manager superpower — I can point to the exact clause where a deal slips and script the next talk track without scrubbing audio.",
    name: "Marcus Davis",
    role: "Sales Manager",
    company: "Stackform",
    initials: "MD",
  },
  {
    id: "nair",
    tone: "excellence",
    quote:
      "Sunday nights used to be recording queues. Now it is a short read of summaries and coaching notes — the report is the review.",
    name: "Priya Nair",
    role: "Director of Revenue",
    company: "Cloudbase",
    initials: "PN",
  },
] as const
