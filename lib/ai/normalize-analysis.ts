import type { CallAnalysis, CoachingNote, InsightSeverity, Objection, OutcomeConfidence, TopAction } from "@/types"

function normalizeSeverity(value: unknown): InsightSeverity {
  return value === "high" || value === "medium" || value === "low" ? value : "medium"
}

function normalizeTalkTracks(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0).slice(0, 3)
}

function normalizeObjection(raw: Partial<Objection> | undefined): Objection {
  return {
    category: raw?.category ?? "other",
    quote: raw?.quote ?? "",
    position: typeof raw?.position === "number" ? raw.position : 0,
    suggestedResponse: raw?.suggestedResponse ?? "",
    severity: normalizeSeverity(raw?.severity),
    talkTrackSuggestions: normalizeTalkTracks(raw?.talkTrackSuggestions),
  }
}

function normalizeCoaching(raw: Partial<CoachingNote> | undefined): CoachingNote {
  return {
    type: raw?.type === "strength" || raw?.type === "improvement" ? raw.type : "improvement",
    observation: raw?.observation ?? "",
    suggestion: raw?.suggestion ?? "",
    severity: normalizeSeverity(raw?.severity),
    talkTrackSuggestions: normalizeTalkTracks(raw?.talkTrackSuggestions),
  }
}

function normalizeTopActions(raw: unknown): TopAction[] {
  if (!Array.isArray(raw)) return []
  const rows = raw
    .filter((item): item is Partial<TopAction> => typeof item === "object" && item !== null)
    .map((item) => ({
      title: item.title ?? "Follow-up with clear next step",
      rationale: item.rationale ?? "Derived from conversation review.",
      priority: normalizeSeverity(item.priority),
    }))
  return rows.slice(0, 3)
}

function normalizeOutcomeConfidence(raw: unknown): OutcomeConfidence {
  const obj = typeof raw === "object" && raw !== null ? (raw as Partial<OutcomeConfidence>) : {}
  const score = typeof obj.score === "number" ? Math.max(0, Math.min(100, Math.round(obj.score))) : 60
  const label = obj.label === "high" || obj.label === "medium" || obj.label === "low"
    ? obj.label
    : score >= 75
      ? "high"
      : score >= 45
        ? "medium"
        : "low"
  return {
    score,
    label,
    rationale: obj.rationale ?? "Confidence estimated from transcript specificity and signal quality.",
  }
}

export function normalizeCallAnalysis(raw: CallAnalysis): CallAnalysis {
  const scores = raw.scores ?? {
    discovery: 0,
    objectionHandling: 0,
    talkListenRatio: 0,
    nextStepClarity: 0,
    overall: 0,
  }

  return {
    summary: raw.summary ?? "",
    scores,
    analyzedWith: raw.analyzedWith ?? "gemini",
    promptVersion: raw.promptVersion ?? "v1.0.0",
    topActions: normalizeTopActions(raw.topActions),
    outcomeConfidence: normalizeOutcomeConfidence(raw.outcomeConfidence),
    objections: (raw.objections ?? []).map((row) => normalizeObjection(row)),
    coachingNotes: (raw.coachingNotes ?? []).map((row) => normalizeCoaching(row)),
  }
}
