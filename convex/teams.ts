import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const getTeam = query({
  args: { teamId: v.id("teams") },
  handler: async (ctx, { teamId }) => {
    return ctx.db.get(teamId)
  },
})

export const getTeamMembers = query({
  args: { teamId: v.id("teams") },
  handler: async (ctx, { teamId }) => {
    return ctx.db
      .query("users")
      .withIndex("by_team", (q) => q.eq("teamId", teamId))
      .collect()
  },
})

export const createTeam = mutation({
  args: { name: v.string() },
  handler: async (ctx, { name }) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Unauthenticated")

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique()

    if (!user) throw new Error("User not found")
    if (user.role !== "manager") throw new Error("Only managers can create teams")

    const teamId = await ctx.db.insert("teams", {
      name,
      managerId: user._id,
    })

    await ctx.db.patch(user._id, { teamId })
    return teamId
  },
})
