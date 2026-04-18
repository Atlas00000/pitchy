/**
 * Marketing features — copy, taxonomy, and responsive bento placement (Tailwind grid classes).
 */

export type FeatureTag = "Core" | "AI" | "Analytics"

export type FeatureTone = "brand" | "neutral" | "caution" | "critical" | "muted" | "excellence"

export type FeatureIconKey =
  | "file-stack"
  | "align-left"
  | "gauge"
  | "flag"
  | "message-square"
  | "user-round"
  | "bar-chart"

export type MarketingFeature = {
  id: string
  icon: FeatureIconKey
  tone: FeatureTone
  tag: FeatureTag
  title: string
  description: string
  /** One concrete capability line — not a placeholder. */
  proof: string
  /** DOM order + Tailwind placement for the 12-column bento. */
  bentoClass: string
}

export const MARKETING_FEATURES: readonly MarketingFeature[] = [
  {
    id: "transcript",
    icon: "file-stack",
    tone: "brand",
    tag: "Core",
    title: "Transcript ingest & reader",
    description:
      "Paste or upload supported formats. Parsing stays client-side until submit; objections surface inline where they land in the thread.",
    proof: "Parse locally · highlight in context",
    bentoClass: "col-span-12 min-h-[min(38vh,300px)] lg:col-span-7 lg:row-span-2 lg:min-h-[min(44vh,360px)]",
  },
  {
    id: "summaries",
    icon: "align-left",
    tone: "neutral",
    tag: "AI",
    title: "Executive call summaries",
    description:
      "One tight paragraph for topics, pains, deal posture, and agreed next steps — generated in the same pass as scores and objections.",
    proof: "Single structured pass",
    bentoClass: "col-span-12 sm:col-span-6 lg:col-span-5",
  },
  {
    id: "scoring",
    icon: "gauge",
    tone: "caution",
    tag: "AI",
    title: "Rubric-backed scoring",
    description:
      "Discovery, objection handling, talk/listen balance, and next-step clarity roll into a weighted overall score with the same palette reps see in-app.",
    proof: "Four dimensions · 0–10 scale",
    bentoClass: "col-span-12 sm:col-span-6 lg:col-span-5",
  },
  {
    id: "objections",
    icon: "flag",
    tone: "critical",
    tag: "AI",
    title: "Objection capture",
    description:
      "Every objection tagged by category with suggested responses — tied back to transcript offsets so reps can rehearse the exact moment.",
    proof: "Category + response hints",
    bentoClass: "col-span-12 sm:col-span-6 lg:col-span-4",
  },
  {
    id: "coaching",
    icon: "message-square",
    tone: "muted",
    tag: "AI",
    title: "Coaching notes that read like a manager",
    description:
      "Three to five crisp notes per call: what landed, what wobbled, and the next behavior to practice — written for immediate 1:1 use.",
    proof: "Actionable tone · ready to send",
    bentoClass: "col-span-12 sm:col-span-6 lg:col-span-4",
  },
  {
    id: "rep-insights",
    icon: "user-round",
    tone: "excellence",
    tag: "Analytics",
    title: "Rep-level performance",
    description:
      "Per-rep trends for score, objection mix, and volume refresh automatically after each upload — no CSV exports or pivot tables.",
    proof: "Auto-refresh after every call",
    bentoClass: "col-span-12 sm:col-span-6 lg:col-span-4",
  },
  {
    id: "team-analytics",
    icon: "bar-chart",
    tone: "brand",
    tag: "Analytics",
    title: "Team rollups & leaderboards",
    description:
      "Cross-team score curves, top objections, call volume by rep, and leaderboards — the manager view without queueing another listen-through.",
    proof: "Team-wide charts in one surface",
    bentoClass: "col-span-12 lg:col-span-12",
  },
] as const
