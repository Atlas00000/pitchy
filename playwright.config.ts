import { defineConfig, devices } from "@playwright/test"
import path from "path"

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000"

export const STORAGE = {
  manager: path.resolve("e2e/.auth/manager.json"),
  rep: path.resolve("e2e/.auth/rep.json"),
}

export default defineConfig({
  testDir: "./e2e",
  globalSetup: "./e2e/global-setup.ts",
  globalTeardown: "./e2e/global-teardown.ts",
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: "list",
  timeout: 30_000,

  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    headless: true,
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  webServer: {
    command: "pnpm dev",
    url: BASE_URL,
    reuseExistingServer: true,
    timeout: 120_000,
  },
})
