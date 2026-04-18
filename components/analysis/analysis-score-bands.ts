import { SCORE_THRESHOLDS } from "@/lib/constants"

/** Performance band aligned with `SCORE_THRESHOLDS` (same as call list / utils). */
export type AnalysisScoreBand = "critical" | "caution" | "excellence"

export function scoreToBand(score: number): AnalysisScoreBand {
  if (score <= SCORE_THRESHOLDS.low) return "critical"
  if (score <= SCORE_THRESHOLDS.mid) return "caution"
  return "excellence"
}

/** Fill for dimension bar / solid accents. */
export const bandBarFill: Record<AnalysisScoreBand, string> = {
  critical: "bg-pitchly-score-critical",
  caution: "bg-pitchly-score-caution",
  excellence: "bg-pitchly-score-excellence",
}

/** Text for numeric labels. */
export const bandText: Record<AnalysisScoreBand, string> = {
  critical: "text-pitchly-score-critical",
  caution: "text-pitchly-score-caution",
  excellence: "text-pitchly-score-excellence",
}

/** SVG / ring stroke via `currentColor`. */
export const bandStroke: Record<AnalysisScoreBand, string> = {
  critical: "text-pitchly-score-critical",
  caution: "text-pitchly-score-caution",
  excellence: "text-pitchly-score-excellence",
}
