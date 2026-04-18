import { describe, it, expect } from "vitest"
import { buildCallAnalysisPrompt, PROMPT_VERSION } from "@/lib/prompts/callAnalysis"
import type { CallMetadata } from "@/types"

const sampleMetadata: CallMetadata = {
  repName: "Alice Smith",
  prospectCompany: "Acme Corp",
  dealStage: "discovery",
  callDate: "2026-04-18",
}

const sampleTranscript = "Rep: Hi, thanks for joining. Can you tell me about your current sales process? Prospect: Sure, we use spreadsheets mostly and it's getting unwieldy."

describe("buildCallAnalysisPrompt", () => {
  it("returns a non-empty string", () => {
    const result = buildCallAnalysisPrompt(sampleTranscript, sampleMetadata)
    expect(typeof result).toBe("string")
    expect(result.length).toBeGreaterThan(100)
  })

  it("includes repName from metadata", () => {
    const result = buildCallAnalysisPrompt(sampleTranscript, sampleMetadata)
    expect(result).toContain(sampleMetadata.repName)
  })

  it("includes prospectCompany from metadata", () => {
    const result = buildCallAnalysisPrompt(sampleTranscript, sampleMetadata)
    expect(result).toContain(sampleMetadata.prospectCompany)
  })

  it("includes dealStage from metadata", () => {
    const result = buildCallAnalysisPrompt(sampleTranscript, sampleMetadata)
    expect(result).toContain(sampleMetadata.dealStage)
  })

  it("includes callDate from metadata", () => {
    const result = buildCallAnalysisPrompt(sampleTranscript, sampleMetadata)
    expect(result).toContain(sampleMetadata.callDate)
  })

  it("includes the transcript text", () => {
    const result = buildCallAnalysisPrompt(sampleTranscript, sampleMetadata)
    expect(result).toContain(sampleTranscript)
  })

  it("includes the current PROMPT_VERSION", () => {
    const result = buildCallAnalysisPrompt(sampleTranscript, sampleMetadata)
    expect(result).toContain(PROMPT_VERSION)
  })

  it("instructs the model to return JSON only", () => {
    const result = buildCallAnalysisPrompt(sampleTranscript, sampleMetadata)
    expect(result.toLowerCase()).toContain("json")
    expect(result).toContain("No markdown")
  })

  it("specifies all required response fields", () => {
    const result = buildCallAnalysisPrompt(sampleTranscript, sampleMetadata)
    const requiredFields = ["summary", "scores", "objections", "coachingNotes", "analyzedWith", "promptVersion"]
    for (const field of requiredFields) {
      expect(result).toContain(field)
    }
  })

  it("specifies all score dimensions", () => {
    const result = buildCallAnalysisPrompt(sampleTranscript, sampleMetadata)
    const dimensions = ["discovery", "objectionHandling", "talkListenRatio", "nextStepClarity", "overall"]
    for (const dim of dimensions) {
      expect(result).toContain(dim)
    }
  })
})

describe("PROMPT_VERSION", () => {
  it("follows semver format vX.Y.Z", () => {
    expect(PROMPT_VERSION).toMatch(/^v\d+\.\d+\.\d+$/)
  })
})
