/**
 * Marketing “How it works” — structure and copy only (no UI).
 */

export type HowItWorksIconKey = "upload" | "sparkles" | "trending"

export type HowItWorksTone = "brand" | "muted" | "excellence"

export type HowItWorksStep = {
  id: string
  order: 1 | 2 | 3
  icon: HowItWorksIconKey
  tone: HowItWorksTone
  title: string
  description: string
  /** Short factual hook — not a placeholder. */
  highlight: string
}

export const HOW_IT_WORKS_STEPS: readonly HowItWorksStep[] = [
  {
    id: "ingest",
    order: 1,
    icon: "upload",
    tone: "brand",
    title: "Bring the transcript in",
    description:
      "Paste raw text or drop a supported file. Parsing stays on your device until you submit — nothing hits the server until you confirm.",
    highlight: "Client-side parse · then one submit",
  },
  {
    id: "analyze",
    order: 2,
    icon: "sparkles",
    tone: "muted",
    title: "AI compresses the call into signal",
    description:
      "One structured pass produces a summary, four scored dimensions, every objection tagged, and a handful of coaching notes you can act on immediately.",
    highlight: "Single pass · sub-30s turnaround",
  },
  {
    id: "coach",
    order: 3,
    icon: "trending",
    tone: "excellence",
    title: "Coach from the report, not the recording",
    description:
      "Reps read specifics while the deal is still warm. Managers zoom out to trends, leaderboards, and objection mix — without queueing another listen-through.",
    highlight: "Instant handoff · team rollups",
  },
] as const
