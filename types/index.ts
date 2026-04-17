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
}

export interface CoachingNote {
  type: "strength" | "improvement"
  observation: string
  suggestion: string
}

export interface CallAnalysis {
  summary: string
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
