/**
 * Marketing problem section — copy and structure only (no UI).
 * Icons referenced by key; mapped to Lucide in `problem-pain-rail.tsx`.
 */

export type ProblemPainIconKey = "clock" | "scale" | "hourglass"

export type ProblemPainTone = "brand" | "caution" | "critical"

export type ProblemPainPoint = {
  id: string
  icon: ProblemPainIconKey
  tone: ProblemPainTone
  title: string
  description: string
  /** Short quantitative hook — real copy, not a placeholder. */
  stat: string
  statLabel: string
}

export const PROBLEM_PAIN_POINTS: readonly ProblemPainPoint[] = [
  {
    id: "manual-review",
    icon: "clock",
    tone: "brand",
    title: "Hours disappear into call review",
    description:
      "Managers sink roughly a full workday each week scrubbing recordings and writing notes. That time never compounds — it only delays the coaching your reps need now.",
    stat: "5–10",
    statLabel: "hrs / week in manual review",
  },
  {
    id: "inconsistent-feedback",
    icon: "scale",
    tone: "caution",
    title: "Feedback swings rep to rep",
    description:
      "Without a shared rubric, the same call quality earns praise one week and silence the next. Reps stop trusting the process — and performance variance widens.",
    stat: "2×",
    statLabel: "variance in manager scoring",
  },
  {
    id: "slow-coaching",
    icon: "hourglass",
    tone: "critical",
    title: "Coaching arrives after the deal moved",
    description:
      "By the time notes land in Slack, the prospect has already ghosted or signed. Patterns that should be fixed on the next dial repeat for weeks.",
    stat: "48h+",
    statLabel: "typical feedback lag",
  },
] as const
