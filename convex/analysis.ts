import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const getAnalysis = query({
  args: { callId: v.id("calls") },
  handler: async (ctx, { callId }) => {
    return ctx.db
      .query("callAnalysis")
      .withIndex("by_call", (q) => q.eq("callId", callId))
      .unique()
  },
})

export const getAnalysisByRep = query({
  args: { repId: v.id("users") },
  handler: async (ctx, { repId }) => {
    const calls = await ctx.db
      .query("calls")
      .withIndex("by_rep", (q) => q.eq("repId", repId))
      .collect()

    const analyses = await Promise.all(
      calls.map((call) =>
        ctx.db
          .query("callAnalysis")
          .withIndex("by_call", (q) => q.eq("callId", call._id))
          .unique()
      )
    )

    return analyses.filter(Boolean)
  },
})

export const saveAnalysis = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("callAnalysis")
      .withIndex("by_call", (q) => q.eq("callId", args.callId))
      .unique()

    if (existing) {
      await ctx.db.patch(existing._id, args)
      return existing._id
    }

    return ctx.db.insert("callAnalysis", args)
  },
})
