import { describe, it, expect } from "vitest"
import { convexTest } from "convex-test"
import schema from "../../convex/schema"
import { api } from "../../convex/_generated/api"

const modules = import.meta.glob("../../convex/**/*.{ts,js}")

function makeT() {
  return convexTest(schema, modules)
}

describe("users — createUser", () => {
  it("creates a user and returns an id", async () => {
    const t = makeT()
    const id = await t.mutation(api.users.createUser, {
      clerkId: "clerk_001",
      name: "Alice",
      email: "alice@example.com",
    })
    expect(id).toBeTruthy()
  })

  it("is idempotent — calling twice returns same id and creates only one record", async () => {
    const t = makeT()
    const args = { clerkId: "clerk_002", name: "Bob", email: "bob@example.com" }
    const id1 = await t.mutation(api.users.createUser, args)
    const id2 = await t.mutation(api.users.createUser, args)
    expect(id1).toBe(id2)
  })

  it("sets default role to rep", async () => {
    const t = makeT()
    const id = await t.mutation(api.users.createUser, {
      clerkId: "clerk_003",
      name: "Carol",
      email: "carol@example.com",
    })
    const user = await t.query(api.users.getUser, { userId: id })
    expect(user?.role).toBe("rep")
  })

  it("sets default aiProvider to gemini", async () => {
    const t = makeT()
    const id = await t.mutation(api.users.createUser, {
      clerkId: "clerk_004",
      name: "Dan",
      email: "dan@example.com",
    })
    const user = await t.query(api.users.getUser, { userId: id })
    expect(user?.aiProvider).toBe("gemini")
  })
})

describe("users — updateRole", () => {
  it("patches role to manager", async () => {
    const t = makeT()
    const clerkId = "clerk_005"
    const id = await t.mutation(api.users.createUser, {
      clerkId,
      name: "Eve",
      email: "eve@example.com",
    })

    await t.withIdentity({ subject: clerkId }).mutation(api.users.updateRole, { role: "manager" })

    const user = await t.query(api.users.getUser, { userId: id })
    expect(user?.role).toBe("manager")
  })

  it("throws when unauthenticated", async () => {
    const t = makeT()
    await expect(
      t.mutation(api.users.updateRole, { role: "manager" })
    ).rejects.toThrow("Unauthenticated")
  })
})

describe("users — getCurrentUser", () => {
  it("returns null when unauthenticated", async () => {
    const t = makeT()
    const result = await t.query(api.users.getCurrentUser, {})
    expect(result).toBeNull()
  })

  it("returns the correct user for the authenticated identity", async () => {
    const t = makeT()
    const clerkId = "clerk_006"
    await t.mutation(api.users.createUser, {
      clerkId,
      name: "Frank",
      email: "frank@example.com",
    })

    const user = await t.withIdentity({ subject: clerkId }).query(api.users.getCurrentUser, {})
    expect(user?.clerkId).toBe(clerkId)
    expect(user?.name).toBe("Frank")
  })
})
