import { test, expect } from "@playwright/test"
import fs from "fs"
import { STORAGE } from "../playwright.config"

const hasSetup = fs.existsSync(STORAGE.manager) && fs.existsSync(STORAGE.rep)

// ---------------------------------------------------------------------------
// Unauthenticated routing — always runs, no credentials needed
// ---------------------------------------------------------------------------

test.describe("unauthenticated routing", () => {
  test("GET /dashboard redirects to /sign-in", async ({ page }) => {
    await page.goto("/dashboard")
    await expect(page).toHaveURL(/\/sign-in/)
  })

  test("GET /calls redirects to /sign-in", async ({ page }) => {
    await page.goto("/calls")
    await expect(page).toHaveURL(/\/sign-in/)
  })

  test("GET /reps redirects to /sign-in", async ({ page }) => {
    await page.goto("/reps")
    await expect(page).toHaveURL(/\/sign-in/)
  })

  test("GET /analytics redirects to /sign-in", async ({ page }) => {
    await page.goto("/analytics")
    await expect(page).toHaveURL(/\/sign-in/)
  })

  test("GET /settings redirects to /sign-in", async ({ page }) => {
    await page.goto("/settings")
    await expect(page).toHaveURL(/\/sign-in/)
  })

  test("GET / (landing page) is publicly accessible", async ({ page }) => {
    await page.goto("/")
    await expect(page).not.toHaveURL(/\/sign-in/)
    await expect(page).toHaveURL("/")
  })

  test("GET /sign-in is publicly accessible", async ({ page }) => {
    await page.goto("/sign-in")
    await expect(page).not.toHaveURL(/\/dashboard/)
  })
})

// ---------------------------------------------------------------------------
// Role-based sidebar — requires global-setup to have run
// ---------------------------------------------------------------------------

test.describe("manager sidebar", () => {
  test.skip(!hasSetup, "global-setup session not found — run with CLERK_SECRET_KEY set")

  test.use({ storageState: STORAGE.manager })

  test("manager sees Reps and Analytics links", async ({ page }) => {
    await page.goto("/dashboard", { waitUntil: "networkidle" })

    // Force Clerk to refresh its session token so ConvexProviderWithClerk
    // gets a fresh JWT for the restored storage-state context.
    await page.waitForFunction(() => Boolean((window as any).Clerk?.loaded), { timeout: 15_000 })
    await page.evaluate(async () => {
      const clerk = (window as any).Clerk
      if (clerk?.session) {
        await clerk.session.getToken({ template: "convex", skipCache: true })
      }
    })

    await expect(page.getByRole("link", { name: "Reps" })).toBeVisible({ timeout: 15_000 })
    await expect(page.getByRole("link", { name: "Analytics" })).toBeVisible({ timeout: 15_000 })
  })
})

test.describe("rep sidebar", () => {
  test.skip(!hasSetup, "global-setup session not found — run with CLERK_SECRET_KEY set")

  test.use({ storageState: STORAGE.rep })

  test("rep does not see Reps or Analytics links", async ({ page }) => {
    await page.goto("/dashboard")
    await expect(page.getByRole("link", { name: "Reps" })).not.toBeVisible()
    await expect(page.getByRole("link", { name: "Analytics" })).not.toBeVisible()
  })
})
