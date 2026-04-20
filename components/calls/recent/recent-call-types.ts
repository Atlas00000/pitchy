import type { CallStatus, DealStage } from "@/types"
import type { Id } from "@/convex/_generated/dataModel"

export interface RecentCallViewModel {
  readonly id: Id<"calls">
  readonly company: string
  readonly repName: string
  readonly callDate: string
  readonly status: CallStatus
  readonly dealStage: DealStage
  readonly score?: number
  readonly objectionsCount: number
  readonly coachingCount: number
  readonly summarySnippet?: string
  readonly analyzedWith?: "gemini" | "claude"
}
