import type { ObjectionCategory, DealStage } from "@/types"

export const SCORE_WEIGHTS = {
  discovery: 0.3,
  objectionHandling: 0.3,
  talkListenRatio: 0.2,
  nextStepClarity: 0.2,
} as const

export const OBJECTION_CATEGORIES: Record<ObjectionCategory, string> = {
  price: "Price / Budget",
  timing: "Timing / Not Now",
  authority: "Decision Authority",
  need: "No Perceived Need",
  competitor: "Using a Competitor",
  other: "Other",
}

export const DEAL_STAGES: Record<DealStage, string> = {
  prospecting: "Prospecting",
  discovery: "Discovery",
  demo: "Demo",
  proposal: "Proposal",
  negotiation: "Negotiation",
  closed_won: "Closed Won",
  closed_lost: "Closed Lost",
}

export const SCORE_THRESHOLDS = {
  low: 4,
  mid: 7,
} as const

export const PROMPT_VERSION = "v1.0.0"

export const AI_PROVIDERS = {
  gemini: "gemini",
  claude: "claude",
} as const

export const DEFAULT_AI_PROVIDER = AI_PROVIDERS.gemini
