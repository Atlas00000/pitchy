import { describe, expect, it } from "vitest"

import { normalizeCallAnalysis } from "@/lib/ai/normalize-analysis"
import type { CallAnalysis } from "@/types"

describe("normalizeCallAnalysis", () => {
  it("fills missing new contract fields with safe defaults", () => {
    const legacyLike = {
      summary: "Legacy summary",
      scores: {
        discovery: 6,
        objectionHandling: 5,
        talkListenRatio: 7,
        nextStepClarity: 6,
        overall: 6.0,
      },
      objections: [
        {
          category: "price",
          quote: "Too expensive",
          position: 100,
          suggestedResponse: "Discuss ROI",
        },
      ],
      coachingNotes: [
        {
          type: "improvement",
          observation: "Discovery lacked depth",
          suggestion: "Ask follow-up why questions",
        },
      ],
      analyzedWith: "gemini",
      promptVersion: "v1.0.0",
    } as unknown as CallAnalysis

    const normalized = normalizeCallAnalysis(legacyLike)
    expect(normalized.topActions).toEqual([])
    expect(normalized.outcomeConfidence.score).toBe(60)
    expect(normalized.outcomeConfidence.label).toBe("medium")
    expect(normalized.objections[0].severity).toBe("medium")
    expect(normalized.objections[0].talkTrackSuggestions).toEqual([])
    expect(normalized.coachingNotes[0].severity).toBe("medium")
    expect(normalized.coachingNotes[0].talkTrackSuggestions).toEqual([])
  })

  it("normalizes invalid confidence and trims talk tracks", () => {
    const raw = {
      summary: "test",
      scores: {
        discovery: 0,
        objectionHandling: 0,
        talkListenRatio: 0,
        nextStepClarity: 0,
        overall: 0,
      },
      topActions: [{ title: "A", rationale: "B", priority: "urgent" }],
      outcomeConfidence: { score: 180, label: "unknown", rationale: "" },
      objections: [
        {
          category: "other",
          quote: "",
          position: 0,
          suggestedResponse: "",
          severity: "urgent",
          talkTrackSuggestions: ["one", "two", "three", "four"],
        },
      ],
      coachingNotes: [],
      analyzedWith: "gemini",
      promptVersion: "v1.0.0",
    } as unknown as CallAnalysis

    const normalized = normalizeCallAnalysis(raw)
    expect(normalized.topActions[0].priority).toBe("medium")
    expect(normalized.outcomeConfidence.score).toBe(100)
    expect(normalized.outcomeConfidence.label).toBe("high")
    expect(normalized.objections[0].severity).toBe("medium")
    expect(normalized.objections[0].talkTrackSuggestions).toHaveLength(3)
  })
})
