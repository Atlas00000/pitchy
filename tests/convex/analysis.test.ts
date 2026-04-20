import { describe, it, expect } from "vitest"
import { convexTest } from "convex-test"
import schema from "../../convex/schema"
import { api } from "../../convex/_generated/api"

const modules = import.meta.glob("../../convex/**/*.{ts,js}")

const SAMPLE_ANALYSIS = {
  summary: "Rep uncovered pain around CRM scalability. Agreed to a demo next week.",
  topActions: [
    {
      title: "Quantify migration cost of current stack.",
      rationale: "Prospect raised scalability pain without concrete numbers.",
      priority: "high" as const,
    },
    {
      title: "Confirm stakeholder map before demo.",
      rationale: "Authority path was implied but not explicit.",
      priority: "medium" as const,
    },
    {
      title: "Frame ROI against existing spend.",
      rationale: "Budget objection emerged and needs proactive framing.",
      priority: "medium" as const,
    },
  ],
  outcomeConfidence: {
    score: 74,
    label: "medium" as const,
    rationale: "Solid transcript signal with minor ambiguity around authority.",
  },
  scores: {
    discovery: 8,
    objectionHandling: 7,
    talkListenRatio: 6,
    nextStepClarity: 9,
    overall: 7.6,
  },
  objections: [
    {
      category: "price" as const,
      quote: "That seems expensive for our budget.",
      position: 120,
      suggestedResponse: "Let's look at the ROI relative to your current spend.",
      severity: "high" as const,
      talkTrackSuggestions: [
        "Can we compare this against current tooling and process cost?",
        "If we phased rollout, would that make budget planning easier?",
      ],
    },
  ],
  coachingNotes: [
    {
      type: "strength" as const,
      observation: "You established clear next steps.",
      suggestion: "Keep confirming next steps in writing after each call.",
      severity: "low" as const,
      talkTrackSuggestions: [
        "I'll summarize owners and timeline before we wrap.",
        "I'll send a recap email with next steps right after this.",
      ],
    },
    {
      type: "improvement" as const,
      observation: "Discovery questions were surface-level.",
      suggestion: "Ask 'why' at least twice before moving on.",
      severity: "high" as const,
      talkTrackSuggestions: [
        "What downstream impact does that create for your team?",
        "What happens if this issue stays unresolved this quarter?",
      ],
    },
  ],
  analyzedWith: "gemini" as const,
  promptVersion: "v1.0.0",
}

async function seedCallWithUser(t: ReturnType<typeof convexTest>, clerkId: string) {
  await t.mutation(api.users.createUser, {
    clerkId,
    name: "Test Rep",
    email: `${clerkId}@example.com`,
  })
  return t.withIdentity({ subject: clerkId }).mutation(api.calls.createCall, {
    transcriptText: "Rep: Hello. Prospect: We need help.",
    repName: "Test Rep",
    prospectCompany: "Test Co",
    dealStage: "discovery" as const,
    callDate: "2026-04-18",
  })
}

describe("analysis — saveAnalysis", () => {
  it("creates a new analysis record and returns an id", async () => {
    const t = convexTest(schema, modules)
    const callId = await seedCallWithUser(t, "clerk_a001")

    const analysisId = await t.mutation(api.analysis.saveAnalysis, { callId, ...SAMPLE_ANALYSIS })
    expect(analysisId).toBeTruthy()
  })

  it("upserts — calling twice with same callId produces only one record", async () => {
    const t = convexTest(schema, modules)
    const callId = await seedCallWithUser(t, "clerk_a002")

    const id1 = await t.mutation(api.analysis.saveAnalysis, { callId, ...SAMPLE_ANALYSIS })
    const id2 = await t.mutation(api.analysis.saveAnalysis, { callId, ...SAMPLE_ANALYSIS })
    expect(id1).toBe(id2)
  })

  it("upserts — second save updates the record rather than creating a duplicate", async () => {
    const t = convexTest(schema, modules)
    const callId = await seedCallWithUser(t, "clerk_a003")

    await t.mutation(api.analysis.saveAnalysis, { callId, ...SAMPLE_ANALYSIS })
    const updated = { ...SAMPLE_ANALYSIS, summary: "Updated summary after re-analysis." }
    await t.mutation(api.analysis.saveAnalysis, { callId, ...updated })

    const record = await t.query(api.analysis.getAnalysis, { callId })
    expect(record?.summary).toBe("Updated summary after re-analysis.")
  })
})

describe("analysis — getAnalysis", () => {
  it("returns null when no analysis exists for a call", async () => {
    const t = convexTest(schema, modules)
    const callId = await seedCallWithUser(t, "clerk_a004")

    const result = await t.query(api.analysis.getAnalysis, { callId })
    expect(result).toBeNull()
  })

  it("returns the correct analysis for a given callId", async () => {
    const t = convexTest(schema, modules)
    const callId = await seedCallWithUser(t, "clerk_a005")

    await t.mutation(api.analysis.saveAnalysis, { callId, ...SAMPLE_ANALYSIS })

    const record = await t.query(api.analysis.getAnalysis, { callId })
    expect(record?.summary).toBe(SAMPLE_ANALYSIS.summary)
    expect(record?.scores.overall).toBe(SAMPLE_ANALYSIS.scores.overall)
    expect(record?.analyzedWith).toBe("gemini")
    expect(record?.promptVersion).toBe("v1.0.0")
  })

  it("stores objections and coaching notes correctly", async () => {
    const t = convexTest(schema, modules)
    const callId = await seedCallWithUser(t, "clerk_a006")

    await t.mutation(api.analysis.saveAnalysis, { callId, ...SAMPLE_ANALYSIS })

    const record = await t.query(api.analysis.getAnalysis, { callId })
    expect(record?.objections).toHaveLength(1)
    expect(record?.objections[0].category).toBe("price")
    expect(record?.coachingNotes).toHaveLength(2)
    expect(record?.coachingNotes[0].type).toBe("strength")
    expect(record?.coachingNotes[1].type).toBe("improvement")
  })
})

describe("analysis — getAnalysisByRep", () => {
  it("returns analyses for all calls belonging to a rep", async () => {
    const t = convexTest(schema, modules)
    const clerkId = "clerk_a007"
    const userId = await t.mutation(api.users.createUser, {
      clerkId,
      name: "Rep Multi",
      email: "multi@example.com",
    })

    const callId1 = await t.withIdentity({ subject: clerkId }).mutation(api.calls.createCall, {
      transcriptText: "call one",
      repName: "Rep Multi",
      prospectCompany: "Co A",
      dealStage: "demo" as const,
      callDate: "2026-04-18",
    })
    const callId2 = await t.withIdentity({ subject: clerkId }).mutation(api.calls.createCall, {
      transcriptText: "call two",
      repName: "Rep Multi",
      prospectCompany: "Co B",
      dealStage: "proposal" as const,
      callDate: "2026-04-18",
    })

    await t.mutation(api.analysis.saveAnalysis, { callId: callId1, ...SAMPLE_ANALYSIS })
    await t.mutation(api.analysis.saveAnalysis, { callId: callId2, ...SAMPLE_ANALYSIS })

    const analyses = await t.query(api.analysis.getAnalysisByRep, { repId: userId })
    expect(analyses).toHaveLength(2)
  })

  it("returns empty array when rep has no analyzed calls", async () => {
    const t = convexTest(schema, modules)
    const userId = await t.mutation(api.users.createUser, {
      clerkId: "clerk_a008",
      name: "Rep Empty",
      email: "empty@example.com",
    })

    const analyses = await t.query(api.analysis.getAnalysisByRep, { repId: userId })
    expect(analyses).toHaveLength(0)
  })
})
