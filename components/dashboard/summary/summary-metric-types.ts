export type SummaryMetricAccent = "brand" | "excellence" | "caution" | "alert"

export type SummaryMetricId = "total" | "analyzed" | "avgScore" | "objection"

export interface SummaryMetricModel {
  readonly id: SummaryMetricId
  readonly label: string
  readonly value: string | number
  readonly hint: string
  readonly accent: SummaryMetricAccent
}
