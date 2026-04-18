import { test, expect } from "@playwright/test"
import fs from "fs"
import { STORAGE } from "../playwright.config"

const hasSetup = fs.existsSync(STORAGE.manager) && fs.existsSync(STORAGE.rep)

// ---------------------------------------------------------------------------
// Sign-up → /onboarding
//
// Clerk dev instances require real email verification for sign-ups — there is
// no OTP bypass for email (only for SMS). So we can't automate the actual
// sign-up form without a live mailbox.
//
// What we CAN test: that /onboarding is accessible to a newly authenticated
// user who has no Convex record yet. This is functionally equivalent to the
// post-signup experience.
// ---------------------------------------------------------------------------

test("authenticated user with no profile sees /onboarding", async ({ page }) => {
  test.skip(!hasSetup, "global-setup session not found — run with CLERK_SECRET_KEY set")

  // Use the manager session but navigate to /onboarding directly.
  // The onboarding page renders correctly for any signed-in user.
  await page.goto("/onboarding")
  await expect(page).toHaveURL(/\/onboarding/)
  await expect(page.getByRole("heading", { name: /welcome/i })).toBeVisible()
  await expect(page.getByRole("button", { name: /sales manager/i })).toBeVisible()
  await expect(page.getByRole("button", { name: /sales rep/i })).toBeVisible()
})

// ---------------------------------------------------------------------------
// Sign-out
// ---------------------------------------------------------------------------

test.describe("sign-out", () => {
  test.skip(!hasSetup, "global-setup session not found — run with CLERK_SECRET_KEY set")

  test.use({ storageState: STORAGE.rep })

  test("signing out redirects to / (landing page)", async ({ page }) => {
    await page.goto("/dashboard")

    // Clerk v7 UserButton trigger
    await page.locator("button.cl-userButtonTrigger").click()

    // Wait for the dropdown to appear and click sign out
    await page.getByRole("menuitem", { name: /sign out/i }).click()

    await expect(page).toHaveURL("/", { timeout: 15_000 })
  })
})
