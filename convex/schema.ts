import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
    role: v.union(v.literal("manager"), v.literal("rep")),
    teamId: v.optional(v.id("teams")),
    aiProvider: v.union(v.literal("gemini"), v.literal("claude")),
    encryptedApiKey: v.optional(v.string()),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_team", ["teamId"]),

  teams: defineTable({
    name: v.string(),
    managerId: v.id("users"),
  }).index("by_manager", ["managerId"]),

  calls: defineTable({
    repId: v.id("users"),
    teamId: v.optional(v.id("teams")),
    transcriptText: v.string(),
    repName: v.string(),
    prospectCompany: v.string(),
    dealStage: v.union(
      v.literal("prospecting"),
      v.literal("discovery"),
      v.literal("demo"),
      v.literal("proposal"),
      v.literal("negotiation"),
      v.literal("closed_won"),
      v.literal("closed_lost")
    ),
    callDate: v.string(),
    status: v.union(
      v.literal("pending"),
      v.literal("analyzing"),
      v.literal("complete"),
      v.literal("failed")
    ),
    errorMessage: v.optional(v.string()),
  })
    .index("by_rep", ["repId"])
    .index("by_team", ["teamId"])
    .index("by_rep_and_date", ["repId", "callDate"])
    .index("by_status", ["status"]),

  callAnalysis: defineTable({
    callId: v.id("calls"),
    summary: v.string(),
    scores: v.object({
      discovery: v.number(),
      objectionHandling: v.number(),
      talkListenRatio: v.number(),
      nextStepClarity: v.number(),
      overall: v.number(),
    }),
    objections: v.array(
      v.object({
        category: v.union(
          v.literal("price"),
          v.literal("timing"),
          v.literal("authority"),
          v.literal("need"),
          v.literal("competitor"),
          v.literal("other")
        ),
        quote: v.string(),
        position: v.number(),
        suggestedResponse: v.string(),
      })
    ),
    coachingNotes: v.array(
      v.object({
        type: v.union(v.literal("strength"), v.literal("improvement")),
        observation: v.string(),
        suggestion: v.string(),
      })
    ),
    analyzedWith: v.union(v.literal("gemini"), v.literal("claude")),
    promptVersion: v.string(),
  })
    .index("by_call", ["callId"]),
})
