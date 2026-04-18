import { describe, it, expect } from "vitest"
import { convexTest } from "convex-test"
import schema from "../../convex/schema"
import { api } from "../../convex/_generated/api"

const modules = import.meta.glob("../../convex/**/*.{ts,js}")

const CALL_ARGS = {
  transcriptText: "Rep: Hi, how can I help? Prospect: We need a better CRM solution.",
  repName: "Alice Smith",
  prospectCompany: "Acme Corp",
  dealStage: "discovery" as const,
  callDate: "2026-04-18",
}

async function seedUser(t: ReturnType<typeof convexTest>, clerkId: string, name = "Test Rep") {
  return t.mutation(api.users.createUser, {
    clerkId,
    name,
    email: `${clerkId}@example.com`,
  })
}

describe("calls — createCall", () => {
  it("creates a call and returns an id", async () => {
    const t = convexTest(schema, modules)
    const clerkId = "clerk_c001"
    await seedUser(t, clerkId)

    const callId = await t.withIdentity({ subject: clerkId }).mutation(api.calls.createCall, CALL_ARGS)
    expect(callId).toBeTruthy()
  })

  it("sets initial status to pending", async () => {
    const t = convexTest(schema, modules)
    const clerkId = "clerk_c002"
    await seedUser(t, clerkId)

    const callId = await t.withIdentity({ subject: clerkId }).mutation(api.calls.createCall, CALL_ARGS)
    const call = await t.query(api.calls.getCall, { callId })
    expect(call?.status).toBe("pending")
  })

  it("sets repId to the authenticated user", async () => {
    const t = convexTest(schema, modules)
    const clerkId = "clerk_c003"
    const userId = await seedUser(t, clerkId)

    const callId = await t.withIdentity({ subject: clerkId }).mutation(api.calls.createCall, CALL_ARGS)
    const call = await t.query(api.calls.getCall, { callId })
    expect(call?.repId).toBe(userId)
  })

  it("throws when unauthenticated", async () => {
    const t = convexTest(schema, modules)
    await expect(
      t.mutation(api.calls.createCall, CALL_ARGS)
    ).rejects.toThrow("Unauthenticated")
  })
})

describe("calls — updateCallStatus", () => {
  it("transitions status to analyzing", async () => {
    const t = convexTest(schema, modules)
    const clerkId = "clerk_c004"
    await seedUser(t, clerkId)

    const callId = await t.withIdentity({ subject: clerkId }).mutation(api.calls.createCall, CALL_ARGS)
    await t.mutation(api.calls.updateCallStatus, { callId, status: "analyzing" })

    const call = await t.query(api.calls.getCall, { callId })
    expect(call?.status).toBe("analyzing")
  })

  it("transitions status to complete", async () => {
    const t = convexTest(schema, modules)
    const clerkId = "clerk_c005"
    await seedUser(t, clerkId)

    const callId = await t.withIdentity({ subject: clerkId }).mutation(api.calls.createCall, CALL_ARGS)
    await t.mutation(api.calls.updateCallStatus, { callId, status: "complete" })

    const call = await t.query(api.calls.getCall, { callId })
    expect(call?.status).toBe("complete")
  })

  it("sets errorMessage on failed status", async () => {
    const t = convexTest(schema, modules)
    const clerkId = "clerk_c006"
    await seedUser(t, clerkId)

    const callId = await t.withIdentity({ subject: clerkId }).mutation(api.calls.createCall, CALL_ARGS)
    await t.mutation(api.calls.updateCallStatus, {
      callId,
      status: "failed",
      errorMessage: "AI provider timeout",
    })

    const call = await t.query(api.calls.getCall, { callId })
    expect(call?.status).toBe("failed")
    expect(call?.errorMessage).toBe("AI provider timeout")
  })
})

describe("calls — getCalls (role-filtered)", () => {
  it("rep sees only their own calls", async () => {
    const t = convexTest(schema, modules)
    const clerkId = "clerk_c007"
    await seedUser(t, clerkId, "Rep One")

    await t.withIdentity({ subject: clerkId }).mutation(api.calls.createCall, CALL_ARGS)
    await t.withIdentity({ subject: clerkId }).mutation(api.calls.createCall, CALL_ARGS)

    const calls = await t.withIdentity({ subject: clerkId }).query(api.calls.getCalls, {})
    expect(calls).toHaveLength(2)
  })

  it("rep does not see another rep's calls", async () => {
    const t = convexTest(schema, modules)
    const clerkA = "clerk_c008"
    const clerkB = "clerk_c009"
    await seedUser(t, clerkA, "Rep A")
    await seedUser(t, clerkB, "Rep B")

    await t.withIdentity({ subject: clerkA }).mutation(api.calls.createCall, CALL_ARGS)

    const callsB = await t.withIdentity({ subject: clerkB }).query(api.calls.getCalls, {})
    expect(callsB).toHaveLength(0)
  })

  it("returns empty array when unauthenticated", async () => {
    const t = convexTest(schema, modules)
    const calls = await t.query(api.calls.getCalls, {})
    expect(calls).toHaveLength(0)
  })
})

describe("calls — getCallsByRep", () => {
  it("returns all calls for a given repId", async () => {
    const t = convexTest(schema, modules)
    const clerkId = "clerk_c010"
    const userId = await seedUser(t, clerkId, "Rep Query")

    await t.withIdentity({ subject: clerkId }).mutation(api.calls.createCall, CALL_ARGS)
    await t.withIdentity({ subject: clerkId }).mutation(api.calls.createCall, CALL_ARGS)

    const calls = await t.query(api.calls.getCallsByRep, { repId: userId })
    expect(calls).toHaveLength(2)
  })
})
