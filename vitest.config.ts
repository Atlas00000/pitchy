import { defineConfig } from "vitest/config"
import path from "path"

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  test: {
    include: ["tests/**/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      include: [
        "lib/utils/index.ts",
        "lib/constants.ts",
        "lib/prompts/callAnalysis.ts",
        "convex/users.ts",
        "convex/teams.ts",
        "convex/calls.ts",
        "convex/analysis.ts",
      ],
    },
    environmentMatchGlobs: [
      ["tests/convex/**", "edge-runtime"],
      ["tests/**", "node"],
    ],
    server: {
      deps: {
        inline: ["convex", "convex-test"],
      },
    },
  },
})
