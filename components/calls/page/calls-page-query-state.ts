import type { CallStatus, DealStage } from "@/types"

export type CallsPageSort = "recent" | "score_high" | "score_low"
export type CallsPageGroupBy = "none" | "status" | "stage" | "rep"

export interface CallsPageQueryState {
  readonly search: string
  readonly status: "all" | CallStatus
  readonly stage: "all" | DealStage
  readonly sort: CallsPageSort
  readonly groupBy: CallsPageGroupBy
}

export const defaultCallsPageQueryState: CallsPageQueryState = {
  search: "",
  status: "all",
  stage: "all",
  sort: "recent",
  groupBy: "none",
}
