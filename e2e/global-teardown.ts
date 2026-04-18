import fs from "fs"
import path from "path"

const CLERK_API = "https://api.clerk.com/v1"
const AUTH_DIR = path.resolve("e2e/.auth")
const TEST_USERS_PATH = path.join(AUTH_DIR, "test-users.json")

export default async function globalTeardown() {
  const secretKey = process.env.CLERK_SECRET_KEY
  if (!secretKey || !fs.existsSync(TEST_USERS_PATH)) return

  const { managerId, repId } = JSON.parse(fs.readFileSync(TEST_USERS_PATH, "utf-8"))

  for (const userId of [managerId, repId]) {
    const res = await fetch(`${CLERK_API}/users/${userId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${secretKey}` },
    })
    if (res.ok) {
      console.log(`[teardown] Deleted Clerk user ${userId}`)
    } else {
      console.warn(`[teardown] Could not delete user ${userId} (${res.status})`)
    }
  }

  fs.unlinkSync(TEST_USERS_PATH)
}
