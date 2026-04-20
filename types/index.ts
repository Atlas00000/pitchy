export type UserRole = "manager" | "rep"

export type AIProviderType = "gemini" | "claude"

export type CallStatus = "pending" | "analyzing" | "complete" | "failed"

export type DealStage =
  | "prospecting"
  | "discovery"
  | "demo"
  | "proposal"
  | "negotiation"
  | "closed_won"
  | "closed_lost"

export type ObjectionCategory = "price" | "timing" | "authority" | "need" | "competitor" | "other"
export type InsightSeverity = "high" | "medium" | "low"

export interface ScoreDimensions {
  discovery: number
  objectionHandling: number
  talkListenRatio: number
  nextStepClarity: number
  overall: number
}

export interface Objection {
  category: ObjectionCategory
  quote: string
  position: number
  suggestedResponse: string
  severity: InsightSeverity
  talkTrackSuggestions: string[]
}

export interface CoachingNote {
  type: "strength" | "improvement"
  observation: string
  suggestion: string
  severity: InsightSeverity
  talkTrackSuggestions: string[]
}

export interface TopAction {
  title: string
  rationale: string
  priority: InsightSeverity
}

export interface OutcomeConfidence {
  score: number
  label: "high" | "medium" | "low"
  rationale: string
}

export interface CallAnalysis {
  summary: string
  topActions: TopAction[]
  outcomeConfidence: OutcomeConfidence
  scores: ScoreDimensions
  objections: Objection[]
  coachingNotes: CoachingNote[]
  analyzedWith: AIProviderType
  promptVersion: string
}

export interface CallMetadata {
  repName: string
  dealStage: DealStage
  prospectCompany: string
  callDate: string
}

export interface RepStats {
  repId: string
  repName: string
  callCount: number
  averageScore: number
  topObjectionCategory: ObjectionCategory | null
  scoreTrend: Array<{ date: string; score: number }>
  dimensionAverages: ScoreDimensions
}
