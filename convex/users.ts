import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { DEFAULT_AI_PROVIDER } from "../lib/constants"

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) return null
    return ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique()
  },
})

export const getUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    return ctx.db.get(userId)
  },
})

export const createUser = mutation({
  args: {
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
  },
  handler: async (ctx, { clerkId, name, email }) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", clerkId))
      .unique()

    if (existing) return existing._id

    return ctx.db.insert("users", {
      clerkId,
      name,
      email,
      role: "rep",
      aiProvider: DEFAULT_AI_PROVIDER,
    })
  },
})

export const updateRole = mutation({
  args: {
    role: v.union(v.literal("manager"), v.literal("rep")),
  },
  handler: async (ctx, { role }) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Unauthenticated")

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique()

    if (!user) throw new Error("User not found")
    await ctx.db.patch(user._id, { role })
  },
})

export const updateAiProvider = mutation({
  args: {
    aiProvider: v.union(v.literal("gemini"), v.literal("claude")),
    encryptedApiKey: v.optional(v.string()),
  },
  handler: async (ctx, { aiProvider, encryptedApiKey }) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Unauthenticated")

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique()

    if (!user) throw new Error("User not found")
    await ctx.db.patch(user._id, { aiProvider, encryptedApiKey })
  },
})
