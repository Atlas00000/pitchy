@AGENTS.md

# Pitchly — CLAUDE.md

## Project Overview

Pitchly is a B2B SaaS MVP that acts as an AI Sales Manager. Sales reps upload call transcripts; the system returns AI-generated summaries, call scores, objection tags, and coaching notes. Managers get team-level analytics and per-rep performance insights.

Target users: B2B SaaS sales teams (5–50 reps), SDR/AE managers, revenue operations leads.
Full product context and roadmap: [roadmap.md](roadmap.md)

---

## Tech Stack

| Layer | Choice |
|---|---|
| Frontend | Next.js 14 (App Router) |
| Backend / DB / Realtime | Convex |
| Auth | Clerk |
| AI (default) | Google Gemini 2.0 Flash — free, no user setup |
| AI (upgrade) | Claude Sonnet (`claude-sonnet-4-6`) — BYOK via user settings |
| Charting | Recharts + D3.js |
| UI | Tailwind CSS + shadcn/ui |
| File parsing | `pdfjs-dist` (PDF), `mammoth.js` (DOCX) — client-side only |

No dedicated server. Convex replaces Express/Fastify — all backend logic lives in `convex/`.

---

## Key Directories

```
app/                  Next.js App Router — pages only, no business logic
  (marketing)/        Public landing page — no auth required
  (auth)/             Clerk sign-in, sign-up, onboarding (role selection)
  (dashboard)/        Protected app — all product features live here

components/           All UI, split by feature — one component per file
  marketing/          Landing page sections
  layout/             Sidebar, topbar, dashboard summary cards
  calls/              Transcript upload form, viewer, call list
  analysis/           Summary card, scorecard, objection tags, coaching notes
  reps/               Per-rep performance views
  analytics/          Recharts + D3 chart components
  shared/             Empty states, skeletons, badges — reused across features

convex/               All backend — one file per domain/table
  schema.ts           Single source of truth for all table definitions + indexes
  actions/            Convex actions for external calls (AI, file ops)

lib/
  ai/                 AI provider abstraction — see .claude/docs/architectural_patterns.md
  prompts/            Versioned Claude/Gemini prompt templates
  utils/              Pure helpers (no React, no Convex)

hooks/                Convex useQuery/useMutation wrappers — keeps pages clean
types/index.ts        Shared TypeScript types across the whole app
middleware.ts         Clerk route protection for all /dashboard routes
```

---

## Essential Commands

```bash
# Install dependencies
pnpm install

# Start Next.js + Convex dev servers together
npx convex dev               # terminal 1 — starts Convex backend + syncs schema
pnpm dev                     # terminal 2 — starts Next.js on localhost:3000

# Type checking
pnpm tsc --noEmit

# Build for production
pnpm build

# Deploy Convex to production
npx convex deploy

# Run seed data script (populates demo calls + analysis)
npx convex run seed:run
```

---

## Environment Variables

Required in `.env.local` (never committed):
```
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

AI provider keys are stored **in Convex environment variables**, not `.env.local`:
- `GEMINI_API_KEY` — set via `npx convex env set GEMINI_API_KEY <value>`
- User-provided Anthropic keys are stored encrypted in the `users` table at runtime

---

## Build Order

Backend before frontend — all Convex schema, queries, mutations, and AI actions should be tested via the Convex dashboard before any UI is built. See [roadmap.md](roadmap.md) for the full week-by-week breakdown.

---

## Additional Documentation

Check these files when working on the relevant area:

| File | When to read it |
|---|---|
| [../.claude/docs/architectural_patterns.md](../.claude/docs/architectural_patterns.md) | Before adding any new feature, Convex function, AI call, or component |
| [roadmap.md](roadmap.md) | For full feature specs, data model, priority table, and weekly task breakdown |
