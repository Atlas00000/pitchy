import { describe, it, expect, vi, beforeEach } from "vitest"
import { convexTest } from "convex-test"
import schema from "../../convex/schema"
import { api } from "../../convex/_generated/api"

// vi.mock is hoisted — this intercepts the import inside the action before it runs
vi.mock("../../lib/ai/index", () => ({
  getProvider: vi.fn(),
}))

import { getProvider } from "../../lib/ai/index"

const modules = import.meta.glob("../../convex/**/*.{ts,js}")

const MOCK_ANALYSIS = {
  summary: "Mock summary: rep discovered key pain points and agreed on a demo.",
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
      quote: "That sounds expensive.",
      position: 100,
      suggestedResponse: "Let's look at ROI together.",
    },
  ],
  coachingNotes: [
    {
      type: "strength" as const,
      observation: "You set a clear next step.",
      suggestion: "Keep confirming in writing after each call.",
    },
    {
      type: "improvement" as const,
      observation: "Discovery was surface-level.",
      suggestion: "Ask 'why' at least twice.",
    },
  ],
  analyzedWith: "gemini" as const,
  promptVersion: "v1.0.0",
}

async function seedUserAndCall(t: ReturnType<typeof convexTest>, clerkId: string) {
  await t.mutation(api.users.createUser, {
    clerkId,
    name: "Test Rep",
    email: `${clerkId}@example.com`,
  })
  const callId = await t.withIdentity({ subject: clerkId }).mutation(api.calls.createCall, {
    transcriptText: "Rep: Tell me about your process. Prospect: We use spreadsheets.",
    repName: "Test Rep",
    prospectCompany: "Acme Corp",
    dealStage: "discovery" as const,
    callDate: "2026-04-18",
  })
  return callId
}

beforeEach(() => {
  vi.resetAllMocks()
  process.env.GEMINI_API_KEY = "test-gemini-key"
})

describe("analyzeCall — status transitions", () => {
  it("sets status to analyzing before calling the AI provider", async () => {
    const t = convexTest(schema, modules)
    const clerkId = "clerk_ac001"
    const callId = await seedUserAndCall(t, clerkId)

    let statusDuringAnalysis: string | undefined
    ;(getProvider as ReturnType<typeof vi.fn>).mockImplementation(() => ({
      analyzeCall: async () => {
        // Capture status mid-flight before returning
        const call = await t.query(api.calls.getCall, { callId })
        statusDuringAnalysis = call?.status
        return MOCK_ANALYSIS
      },
    }))

    await t.withIdentity({ subject: clerkId }).action(api.actions.analyzeCall.analyzeCall, { callId })

    expect(statusDuringAnalysis).toBe("analyzing")
  })

  it("sets status to complete on success", async () => {
    const t = convexTest(schema, modules)
    const clerkId = "clerk_ac002"
    const callId = await seedUserAndCall(t, clerkId)

    ;(getProvider as ReturnType<typeof vi.fn>).mockReturnValue({
      analyzeCall: vi.fn().mockResolvedValue(MOCK_ANALYSIS),
    })

    await t.withIdentity({ subject: clerkId }).action(api.actions.analyzeCall.analyzeCall, { callId })

    const call = await t.query(api.calls.getCall, { callId })
    expect(call?.status).toBe("complete")
  })

  it("sets status to failed and stores errorMessage on AI error", async () => {
    const t = convexTest(schema, modules)
    const clerkId = "clerk_ac003"
    const callId = await seedUserAndCall(t, clerkId)

    ;(getProvider as ReturnType<typeof vi.fn>).mockReturnValue({
      analyzeCall: vi.fn().mockRejectedValue(new Error("AI provider timeout")),
    })

    await expect(
      t.withIdentity({ subject: clerkId }).action(api.actions.analyzeCall.analyzeCall, { callId })
    ).rejects.toThrow("AI provider timeout")

    const call = await t.query(api.calls.getCall, { callId })
    expect(call?.status).toBe("failed")
    expect(call?.errorMessage).toBe("AI provider timeout")
  })
})

describe("analyzeCall — success: analysis record", () => {
  it("saves an analysis record linked to the callId", async () => {
    const t = convexTest(schema, modules)
    const clerkId = "clerk_ac004"
    const callId = await seedUserAndCall(t, clerkId)

    ;(getProvider as ReturnType<typeof vi.fn>).mockReturnValue({
      analyzeCall: vi.fn().mockResolvedValue(MOCK_ANALYSIS),
    })

    await t.withIdentity({ subject: clerkId }).action(api.actions.analyzeCall.analyzeCall, { callId })

    const analysis = await t.query(api.analysis.getAnalysis, { callId })
    expect(analysis).not.toBeNull()
  })

  it("response shape has all required top-level fields", async () => {
    const t = convexTest(schema, modules)
    const clerkId = "clerk_ac005"
    const callId = await seedUserAndCall(t, clerkId)

    ;(getProvider as ReturnType<typeof vi.fn>).mockReturnValue({
      analyzeCall: vi.fn().mockResolvedValue(MOCK_ANALYSIS),
    })

    await t.withIdentity({ subject: clerkId }).action(api.actions.analyzeCall.analyzeCall, { callId })

    const analysis = await t.query(api.analysis.getAnalysis, { callId })
    expect(analysis).toMatchObject({
      summary: expect.any(String),
      scores: expect.any(Object),
      objections: expect.any(Array),
      coachingNotes: expect.any(Array),
      analyzedWith: expect.any(String),
      promptVersion: expect.any(String),
    })
  })

  it("scores object has all five dimensions within 0–10", async () => {
    const t = convexTest(schema, modules)
    const clerkId = "clerk_ac006"
    const callId = await seedUserAndCall(t, clerkId)

    ;(getProvider as ReturnType<typeof vi.fn>).mockReturnValue({
      analyzeCall: vi.fn().mockResolvedValue(MOCK_ANALYSIS),
    })

    await t.withIdentity({ subject: clerkId }).action(api.actions.analyzeCall.analyzeCall, { callId })

    const analysis = await t.query(api.analysis.getAnalysis, { callId })
    const { discovery, objectionHandling, talkListenRatio, nextStepClarity, overall } = analysis!.scores

    for (const score of [discovery, objectionHandling, talkListenRatio, nextStepClarity, overall]) {
      expect(score).toBeGreaterThanOrEqual(0)
      expect(score).toBeLessThanOrEqual(10)
    }
  })

  it("saves analyzedWith and promptVersion from provider response", async () => {
    const t = convexTest(schema, modules)
    const clerkId = "clerk_ac007"
    const callId = await seedUserAndCall(t, clerkId)

    ;(getProvider as ReturnType<typeof vi.fn>).mockReturnValue({
      analyzeCall: vi.fn().mockResolvedValue(MOCK_ANALYSIS),
    })

    await t.withIdentity({ subject: clerkId }).action(api.actions.analyzeCall.analyzeCall, { callId })

    const analysis = await t.query(api.analysis.getAnalysis, { callId })
    expect(analysis?.analyzedWith).toBe("gemini")
    expect(analysis?.promptVersion).toBe("v1.0.0")
  })
})

describe("analyzeCall — auth guard", () => {
  it("throws Unauthenticated when called without identity", async () => {
    const t = convexTest(schema, modules)
    const clerkId = "clerk_ac008"
    const callId = await seedUserAndCall(t, clerkId)

    await expect(
      t.action(api.actions.analyzeCall.analyzeCall, { callId })
    ).rejects.toThrow("Unauthenticated")
  })
})
