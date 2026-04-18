import { chromium } from "@playwright/test"
import fs from "fs"
import path from "path"

const CLERK_API = "https://api.clerk.com/v1"
const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000"
const AUTH_DIR = path.resolve("e2e/.auth")

interface CreatedUser {
  id: string
  email: string
}

function loadEnvLocal() {
  const envPath = path.resolve(".env.local")
  if (!fs.existsSync(envPath)) return
  for (const line of fs.readFileSync(envPath, "utf-8").split("\n")) {
    const match = line.match(/^([^#=\s][^=]*)=(.*)$/)
    if (!match) continue
    const key = match[1].trim()
    const value = match[2].trim().replace(/^["']|["']$/g, "")
    if (!process.env[key]) process.env[key] = value
  }
}

async function clerkRequest(path: string, options: RequestInit = {}) {
  const secretKey = process.env.CLERK_SECRET_KEY!
  const res = await fetch(`${CLERK_API}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  })
  return res
}

async function createClerkUser(email: string): Promise<CreatedUser> {
  // Delete any leftover user with this email first (idempotent re-runs)
  const existing = await clerkRequest(
    `/users?email_address=${encodeURIComponent(email)}&limit=1`
  )
  const existingData = await existing.json()
  if (existingData.data?.length) {
    await clerkRequest(`/users/${existingData.data[0].id}`, { method: "DELETE" })
  }

  const res = await clerkRequest("/users", {
    method: "POST",
    body: JSON.stringify({
      email_address: [email],
      password: "PitchlyE2E123!",
      skip_password_checks: true,
      skip_legal_checks: true,
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Clerk user creation failed (${res.status}): ${body}`)
  }

  const data = await res.json()
  return { id: data.id, email }
}

async function createSignInToken(userId: string): Promise<string> {
  // Clerk sign-in tokens bypass password + 2FA — perfect for test automation
  const res = await clerkRequest("/sign_in_tokens", {
    method: "POST",
    body: JSON.stringify({ user_id: userId, expires_in_seconds: 120 }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Sign-in token creation failed (${res.status}): ${body}`)
  }

  const data = await res.json()
  return data.token
}

async function signInWithTokenAndOnboard(
  user: CreatedUser,
  role: "manager" | "rep",
  storagePath: string
) {
  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()

  try {
    // Load the sign-in page so Clerk's SDK initializes in the browser
    await page.goto(`${BASE_URL}/sign-in`, { waitUntil: "networkidle" })
    await page.waitForFunction(() => (window as any).Clerk?.loaded, { timeout: 15_000 })

    // Use Clerk's programmatic sign-in with a ticket token.
    // This goes through the full SDK session setup (not just URL param),
    // which correctly initializes the JWT template for Convex.
    const token = await createSignInToken(user.id)
    await page.evaluate(async (ticket) => {
      const clerk = (window as any).Clerk
      const result = await clerk.client.signIn.create({ strategy: "ticket", ticket })
      await clerk.setActive({ session: result.createdSessionId })
    }, token)

    // Wait for Clerk session to be active in the page
    await page.waitForFunction(() => Boolean((window as any).Clerk?.session?.id), { timeout: 15_000 })

    // Warm up Convex JWT by visiting dashboard (triggers ConvexProviderWithClerk auth)
    await page.goto(`${BASE_URL}/dashboard`, { waitUntil: "networkidle" })
    await page.waitForTimeout(2000)

    // Complete onboarding (user has no Convex record yet)
    await page.goto(`${BASE_URL}/onboarding`, { waitUntil: "networkidle" })
    const label = role === "manager" ? /sales manager/i : /sales rep/i
    await page.getByRole("button", { name: label }).click()
    await page.getByRole("button", { name: "Continue", exact: true }).click()
    await page.waitForURL(/\/dashboard/, { timeout: 20_000 })

    fs.mkdirSync(path.dirname(storagePath), { recursive: true })
    await context.storageState({ path: storagePath })
    console.log(`[setup] ${role} session saved → ${storagePath}`)
  } finally {
    await browser.close()
  }
}

export default async function globalSetup() {
  loadEnvLocal()

  const secretKey = process.env.CLERK_SECRET_KEY
  if (!secretKey) {
    console.warn("[setup] CLERK_SECRET_KEY not set — skipping user creation, auth tests will be skipped")
    return
  }

  fs.mkdirSync(AUTH_DIR, { recursive: true })

  const managerEmail = "e2e-manager@pitchly-test.com"
  const repEmail = "e2e-rep@pitchly-test.com"

  const [manager, rep] = await Promise.all([
    createClerkUser(managerEmail),
    createClerkUser(repEmail),
  ])

  fs.writeFileSync(
    path.join(AUTH_DIR, "test-users.json"),
    JSON.stringify({ managerId: manager.id, repId: rep.id }, null, 2)
  )

  // Sign in sequentially to avoid Clerk rate limits
  await signInWithTokenAndOnboard(manager, "manager", path.join(AUTH_DIR, "manager.json"))
  await signInWithTokenAndOnboard(rep, "rep", path.join(AUTH_DIR, "rep.json"))

  console.log("[setup] Both test sessions ready")
}
