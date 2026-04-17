import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const getCall = query({
  args: { callId: v.id("calls") },
  handler: async (ctx, { callId }) => {
    return ctx.db.get(callId)
  },
})

export const getCalls = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) return []

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique()

    if (!user) return []

    if (user.role === "manager" && user.teamId) {
      return ctx.db
        .query("calls")
        .withIndex("by_team", (q) => q.eq("teamId", user.teamId))
        .order("desc")
        .collect()
    }

    return ctx.db
      .query("calls")
      .withIndex("by_rep", (q) => q.eq("repId", user._id))
      .order("desc")
      .collect()
  },
})

export const getCallsByRep = query({
  args: { repId: v.id("users") },
  handler: async (ctx, { repId }) => {
    return ctx.db
      .query("calls")
      .withIndex("by_rep", (q) => q.eq("repId", repId))
      .order("desc")
      .collect()
  },
})

export const createCall = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Unauthenticated")

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique()

    if (!user) throw new Error("User not found")

    return ctx.db.insert("calls", {
      ...args,
      repId: user._id,
      teamId: user.teamId,
      status: "pending",
    })
  },
})

export const updateCallStatus = mutation({
  args: {
    callId: v.id("calls"),
    status: v.union(
      v.literal("pending"),
      v.literal("analyzing"),
      v.literal("complete"),
      v.literal("failed")
    ),
    errorMessage: v.optional(v.string()),
  },
  handler: async (ctx, { callId, status, errorMessage }) => {
    await ctx.db.patch(callId, { status, errorMessage })
  },
})
