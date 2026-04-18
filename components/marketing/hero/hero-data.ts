/**
 * Marketing hero — copy and preview structure (no UI).
 */

export const HERO_KICKER = "AI sales manager"

export const HERO_TITLE = {
  lead: "Every call coached.",
  gradient: "Every rep improved.",
} as const

export const HERO_BODY =
  "Upload a transcript and get structured scores, objection tags, and coaching notes in one pass — the same rubric your team sees inside Pitchly."

export const HERO_CTAS = [
  { label: "Start for free", href: "/sign-up", variant: "primary" as const },
  { label: "See how it works", href: "#how-it-works", variant: "secondary" as const },
] as const

/** Example output — mirrors in-app dimensions; not live data. */
export const HERO_PREVIEW_STATS = [
  { id: "overall", value: "8.4", label: "Overall score" },
  { id: "objections", value: "4", label: "Objections tagged" },
  { id: "notes", value: "3", label: "Coaching notes" },
] as const

export const HERO_PREVIEW_DIMENSIONS = [
  { id: "discovery", label: "Discovery quality", score: 9, widthPct: 90, tone: "excellence" as const },
  { id: "objections", label: "Objection handling", score: 8, widthPct: 80, tone: "excellence" as const },
  { id: "talk", label: "Talk / listen ratio", score: 7, widthPct: 70, tone: "caution" as const },
  { id: "next", label: "Next step clarity", score: 9, widthPct: 90, tone: "excellence" as const },
] as const

export type PreviewDimensionTone = "excellence" | "caution"
