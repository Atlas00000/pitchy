import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { normalizeCallAnalysis } from "../lib/ai/normalize-analysis"
import type { CallAnalysis } from "../types"

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

export const getAllAnalyses = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) return []

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique()

    if (!user) return []

    // Managers see all analyses for their team's calls; reps see only their own
    const calls = await ctx.db
      .query("calls")
      .withIndex(
        user.role === "manager" && user.teamId ? "by_team" : "by_rep",
        (q) =>
          user.role === "manager" && user.teamId
            ? (q as any).eq("teamId", user.teamId)
            : (q as any).eq("repId", user._id)
      )
      .collect()

    const analyses = await Promise.all(
      calls.map(async (call) => {
        const analysis = await ctx.db
          .query("callAnalysis")
          .withIndex("by_call", (q) => q.eq("callId", call._id))
          .unique()
        return analysis ? { ...analysis, callDate: call.callDate } : null
      })
    )

    return analyses.filter((a): a is NonNullable<typeof a> => a !== null)
  },
})

export const saveAnalysis = mutation({
  args: {
    callId: v.id("calls"),
    summary: v.string(),
    topActions: v.array(
      v.object({
        title: v.string(),
        rationale: v.string(),
        priority: v.union(v.literal("high"), v.literal("medium"), v.literal("low")),
      })
    ),
    outcomeConfidence: v.object({
      score: v.number(),
      label: v.union(v.literal("high"), v.literal("medium"), v.literal("low")),
      rationale: v.string(),
    }),
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
        severity: v.union(v.literal("high"), v.literal("medium"), v.literal("low")),
        talkTrackSuggestions: v.array(v.string()),
      })
    ),
    coachingNotes: v.array(
      v.object({
        type: v.union(v.literal("strength"), v.literal("improvement")),
        observation: v.string(),
        suggestion: v.string(),
        severity: v.union(v.literal("high"), v.literal("medium"), v.literal("low")),
        talkTrackSuggestions: v.array(v.string()),
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

export const backfillLegacyAnalyses = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Unauthenticated")

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique()

    if (!user || user.role !== "manager") throw new Error("Only managers can run backfill")

    const analyses = await ctx.db.query("callAnalysis").collect()
    for (const analysis of analyses) {
      const normalized = normalizeCallAnalysis(analysis as unknown as CallAnalysis)
      await ctx.db.patch(analysis._id, {
        topActions: normalized.topActions,
        outcomeConfidence: normalized.outcomeConfidence,
        objections: normalized.objections,
        coachingNotes: normalized.coachingNotes,
      })
    }

    return { updated: analyses.length }
  },
})
