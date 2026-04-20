import type { CallStatus, DealStage } from "@/types"
import type { Id } from "@/convex/_generated/dataModel"

export interface CallsPageRowModel {
  readonly id: Id<"calls">
  readonly company: string
  readonly repName: string
  readonly callDate: string
  readonly status: CallStatus
  readonly dealStage: DealStage
  readonly score?: number
  readonly summarySnippet?: string
  readonly objectionsCount: number
  readonly coachingCount: number
  readonly analyzedWith?: "gemini" | "claude"
}

export interface CallsPageStats {
  readonly totalCalls: number
  readonly analyzedCalls: number
  readonly avgScore: string
  readonly activeReps: number
}

export interface CallsPageGroup {
  readonly key: string
  readonly label: string
  readonly rows: CallsPageRowModel[]
}
