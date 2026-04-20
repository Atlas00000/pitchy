export type SummaryMetricTone = "brand" | "positive" | "warning" | "critical"
export type SummaryTrendDirection = "up" | "down" | "flat"

export type SummaryMetricId = "volume" | "coverage" | "rubric" | "friction"

export interface SummaryMetricModel {
  readonly id: SummaryMetricId
  readonly title: string
  readonly value: string
  readonly helper: string
  readonly tone: SummaryMetricTone
  readonly delta?: string
  readonly deltaLabel?: string
  readonly contextLabel?: string
  readonly trendDirection?: SummaryTrendDirection
}
