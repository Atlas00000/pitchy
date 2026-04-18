# Pitchly — Testing Plan

---

## Tools

| Tool | Use for | When |
|---|---|---|
| `vitest` | Utils, prompt builder, score calculations | Phase 1 |
| `convex-test` | Week 1 backend (schema, queries, mutations, AI action) | Phase 2 & 3 |
| `playwright` | Auth flow + dashboard routing | Phase 4 — after Week 2 manual pass |

---

## Phase 1 — Vitest: Utils & Prompt Layer

*Fastest to write, zero infrastructure needed*

**What to test:**
- `lib/utils/index.ts` — `scoreToColor()`, `computeOverallScore()`, `formatScore()`, `truncate()`
- `lib/constants.ts` — `SCORE_WEIGHTS` sum to 1.0
- `lib/prompts/callAnalysis.ts` — `buildCallAnalysisPrompt()` returns a string containing all required metadata fields

**Example assertions:**
```
scoreToColor(3)    → "red"
scoreToColor(5.5)  → "yellow"
scoreToColor(8)    → "green"
computeOverallScore({ discovery:8, objectionHandling:7, talkListenRatio:6, nextStepClarity:9 }) → valid weighted decimal
buildCallAnalysisPrompt(transcript, metadata) → includes repName, dealStage, prospectCompany
```

**Files:** `tests/utils.test.ts`, `tests/prompts.test.ts`

---

## Phase 2 — convex-test: Data Layer

*Tests schema, indexes, queries, mutations without a live deployment*

**What to test:**
- `convex/users.ts` — `createUser` is idempotent (call twice, one record created), `updateRole` patches correctly
- `convex/teams.ts` — `createTeam` sets `managerId`, `getTeamMembers` returns correct users
- `convex/calls.ts` — `createCall` sets status `"pending"`, `getCalls` returns role-filtered results (manager sees team, rep sees own)
- `convex/analysis.ts` — `saveAnalysis` upserts correctly (no duplicates on repeat call)

**Files:** `tests/convex/users.test.ts`, `tests/convex/calls.test.ts`, `tests/convex/analysis.test.ts`

---

## Phase 3 — convex-test: AI Action

*Tests the full analyzeCall pipeline with a mocked provider*

**What to test:**
- `analyzeCall` sets status `"analyzing"` before calling provider
- On success: saves analysis record, sets status `"complete"`
- On AI failure: sets status `"failed"` with `errorMessage`, re-throws
- Response shape: all required fields present (`summary`, `scores`, `objections`, `coachingNotes`, `analyzedWith`, `promptVersion`)
- Score range: all dimensions 0–10, overall is a valid weighted decimal

**Files:** `tests/convex/analyzeCall.test.ts`

---

## Phase 4 — Playwright: Auth & Routing

*Only after manual Week 2 pass confirms the flows work visually*

**Critical paths to automate (5 tests max):**
1. Unauthenticated `/dashboard` → redirects to `/sign-in`
2. Sign up → lands on `/onboarding`, not `/dashboard`
3. Complete onboarding as Manager → sidebar shows Reps + Analytics links
4. Complete onboarding as Rep → sidebar does NOT show Reps or Analytics
5. Sign out → redirects to `/` (landing page)

**Files:** `e2e/auth.spec.ts`, `e2e/routing.spec.ts`

---

## Execution Order

```
Phase 1 → Phase 2 → Phase 3 → [manual Week 2 pass] → Phase 4
```

Phases 1–3 run in CI with `pnpm test` before any browser is involved.
Phase 4 runs separately as `pnpm test:e2e`.

---

## Commands (once scaffolded)

```bash
pnpm test           # Vitest — unit + convex-test
pnpm test:e2e       # Playwright — auth + routing
pnpm test:coverage  # Vitest coverage report
```
