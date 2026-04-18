# Pitchly — Pages & Sections Reference

All 12 pages across 3 route groups. Each entry lists the route, status, components used, and what each section does.

---

## Route Groups

| Group | Purpose | Auth required |
|-------|---------|--------------|
| `(marketing)` | Public landing page | No |
| `(auth)` | Sign in, sign up, onboarding | No |
| `(dashboard)` | All product features | Yes (Clerk) |

---

## (marketing)

### `/` — Landing Page
**File:** `app/(marketing)/page.tsx`
**Status:** Placeholder — needs full rebuild (Week 4 Day 3)
**Layout:** `app/(marketing)/layout.tsx` — minimal flex column wrapper

| Section | Component | Status | Description |
|---------|-----------|--------|-------------|
| Navbar | `components/marketing/navbar.tsx` | Not built | Logo left, Sign In + Get Started CTAs right |
| Hero | `components/marketing/hero.tsx` | Not built | Bold headline, subtext, primary CTA buttons |
| Problem | `components/marketing/problem-section.tsx` | Not built | 3 pain point cards — the problem Pitchly solves |
| How it works | `components/marketing/how-it-works.tsx` | Not built | 3-step visual flow: Upload → Analyze → Coach |
| Features | `components/marketing/features-section.tsx` | Not built | 7 feature cards grid |
| Social proof | `components/marketing/social-proof.tsx` | Not built | Testimonial / logo placeholder strip |
| Pricing | `components/marketing/pricing-section.tsx` | Not built | Free vs Pro tier cards |
| Footer | `components/marketing/footer.tsx` | Not built | Nav links, product name, copyright |

**Current state:** Single centered block with heading, two auth links, and a dev-only SignOutButton. All 8 sections need to be built and composed here.

---

## (auth)

### `/sign-in` — Sign In Page
**File:** `app/(auth)/sign-in/[[...sign-in]]/page.tsx`
**Status:** Done
**Layout:** `app/(auth)/layout.tsx` — centered minimal layout

| Section | Component | Status | Description |
|---------|-----------|--------|-------------|
| Sign in form | Clerk `<SignIn />` | Done | Clerk-managed — handles email/password and OAuth |

---

### `/sign-up` — Sign Up Page
**File:** `app/(auth)/sign-up/[[...sign-up]]/page.tsx`
**Status:** Done
**Layout:** `app/(auth)/layout.tsx`

| Section | Component | Status | Description |
|---------|-----------|--------|-------------|
| Sign up form | Clerk `<SignUp />` | Done | Clerk-managed — redirects to `/onboarding` after sign-up |

---

### `/onboarding` — Role Selection
**File:** `app/(auth)/onboarding/page.tsx`
**Status:** Done
**Layout:** `app/(auth)/layout.tsx`

| Section | Component | Status | Description |
|---------|-----------|--------|-------------|
| Role picker | Inline | Done | Two cards: Sales Manager / Sales Rep — calls `updateRole` mutation on submit, redirects to `/dashboard` |

---

## (dashboard)

All dashboard pages share `app/(dashboard)/layout.tsx` which wraps with `Sidebar`, `Topbar`, `ToastProvider`, and `ErrorBoundary`.

---

### `/dashboard` — Overview
**File:** `app/(dashboard)/dashboard/page.tsx`
**Status:** Done
**Role:** Manager + Rep (rep sees own data only)

| Section | Component | Status | Description |
|---------|-----------|--------|-------------|
| Page header | `components/shared/page-header.tsx` | Done | Title + description |
| Summary cards | `components/layout/dashboard-summary-cards.tsx` | Done | 4 stat cards: Total Calls, Analyzed, Avg Score, Top Objection — live Convex data, skeleton on load |
| Recent calls | `components/calls/call-list.tsx` | Done | List of latest calls with status badge + score; empty state with "Upload transcript" CTA |

---

### `/calls` — Calls List
**File:** `app/(dashboard)/calls/page.tsx`
**Status:** Done
**Role:** Manager (sees team) + Rep (sees own)

| Section | Component | Status | Description |
|---------|-----------|--------|-------------|
| Page header | `components/shared/page-header.tsx` | Done | Title + "New Call" action button |
| Calls list | `components/calls/call-list.tsx` | Done | All calls — skeleton on load, empty state with CTA, each row links to call detail |

---

### `/calls/new` — Upload Transcript
**File:** `app/(dashboard)/calls/new/page.tsx`
**Status:** Done
**Role:** Manager + Rep

| Section | Component | Status | Description |
|---------|-----------|--------|-------------|
| Page header | Inline `h1` | Done | Title + subtitle |
| Error message | Inline | Done | Red banner if call creation fails |
| Upload form | `components/calls/transcript-upload-form.tsx` | Done | Tab switcher (Paste / Upload), file parsing (.txt/.pdf/.docx), metadata fields (rep, company, date, stage), per-field validation on blur, submit button with loading state |

**Behaviour:** On submit → `createCall` mutation (optimistic update) → fire-and-forget `analyzeCall` action → toast "Call submitted" → redirect to `/calls/[callId]`

---

### `/calls/[callId]` — Call Detail
**File:** `app/(dashboard)/calls/[callId]/page.tsx`
**Status:** Done
**Role:** Manager + Rep

| Section | Component | Status | Description |
|---------|-----------|--------|-------------|
| Header | Inline | Done | Prospect company, rep name, date, deal stage; `AnalyzedWithBadge` once analysis exists |
| Status badge | `components/shared/status-badge.tsx` | Done | Pending / Analyzing / Complete / Failed |
| Analyzing banner | Inline | Done | Muted info banner while AI runs — updates reactively |
| Failed banner | Inline + `RetryButton` | Done | Red error box with error message + retry button |
| Transcript viewer | `components/calls/transcript-viewer.tsx` | Done | Full transcript text; objection quotes highlighted inline with `<mark>` |
| Analysis summary | `components/analysis/analysis-summary-card.tsx` | Done | AI-generated 1-paragraph summary with provider badge |
| Score card | `components/analysis/score-card.tsx` | Done | Overall score (color-coded) + 4 dimension bars via `ScoreDimensionBar` |
| Objection list | `components/analysis/objection-list.tsx` | Done | All objection tags sorted by position — category chip + quote + suggested response |
| Coaching notes | `components/analysis/coaching-notes-list.tsx` | Done | Grouped: "What went well" (strength) + "Areas to improve" (improvement) |

**Behaviour:** `useCall` + `useAnalysis` are reactive — page auto-updates when analysis completes. Toast fires on `analyzing → complete` and `analyzing → failed` transitions.

---

### `/reps` — Rep List (Manager only)
**File:** `app/(dashboard)/reps/page.tsx`
**Status:** Done
**Role:** Manager only (sidebar link hidden for reps)

| Section | Component | Status | Description |
|---------|-----------|--------|-------------|
| Page header | `components/shared/page-header.tsx` | Done | Title + description |
| Rep list | `components/reps/rep-list.tsx` | Done | Cards derived from call data — skeleton on load, empty state; each card links to `/reps/[repId]` |

---

### `/reps/[repId]` — Rep Detail
**File:** `app/(dashboard)/reps/[repId]/page.tsx`
**Status:** Done
**Role:** Manager only

| Section | Component | Status | Description |
|---------|-----------|--------|-------------|
| Stats header | `components/reps/rep-stats-header.tsx` | Done | Rep name, email, total calls, analyzed count, avg score (color-coded) |
| Calls list | Inline table | Done | All calls for this rep — company, date, score, status badge; each row links to call detail |

---

### `/analytics` — Team Analytics
**File:** `app/(dashboard)/analytics/page.tsx`
**Status:** Done
**Role:** Manager only

| Section | Component | Status | Description |
|---------|-----------|--------|-------------|
| Page header | `components/shared/page-header.tsx` | Done | Title + description |
| Loading state | `ChartSkeleton` × 4 | Done | 2×2 skeleton grid while data loads |
| Empty state | `EmptyState` | Done | Shown when no calls exist |
| Score trend chart | `components/analytics/score-trend-chart.tsx` | Done | Recharts `LineChart` — avg score over time |
| Objection bar chart | `components/analytics/objection-bar-chart.tsx` | Done | Recharts horizontal `BarChart` — top objection categories |
| Rep leaderboard | `components/analytics/rep-leaderboard.tsx` | Done | Ranked list of reps by avg score, links to rep detail |
| Call volume chart | `components/analytics/call-volume-chart.tsx` | Done | Recharts vertical `BarChart` — calls per rep |

---

### `/settings` — User Settings
**File:** `app/(dashboard)/settings/page.tsx`
**Status:** Done
**Role:** Manager + Rep

| Section | Component | Status | Description |
|---------|-----------|--------|-------------|
| Page header | `components/shared/page-header.tsx` | Done | Title + description |
| AI provider switcher | `components/settings/ai-provider-switcher.tsx` | Done | Two cards: Gemini 2.5 Flash (default, free) / Claude Sonnet (BYOK, "under development" label) |
| API key form | `components/settings/api-key-form.tsx` | Done | Shown when Claude is selected — validates `sk-ant-` prefix, saves encrypted key to Convex |

---

## Shared Layout Components

| Component | File | Used by |
|-----------|------|---------|
| Sidebar | `components/layout/sidebar.tsx` | All dashboard pages |
| Topbar | `components/layout/topbar.tsx` | All dashboard pages |
| Toast provider | `components/shared/toast.tsx` | All dashboard pages (via layout) |
| Error boundary | `components/shared/error-boundary.tsx` | All dashboard pages (via layout) |
| Empty state | `components/shared/empty-state.tsx` | Calls, Reps, Analytics |
| Loading skeleton | `components/shared/loading-skeleton.tsx` | Dashboard, Calls, Reps, Analytics |
| Status badge | `components/shared/status-badge.tsx` | Call list, Call detail, Rep detail |
| Page header | `components/shared/page-header.tsx` | Dashboard, Calls, Reps, Analytics, Settings |

---

## Build Status Summary

| Page | Built | Notes |
|------|-------|-------|
| `/` Landing | Partial | Placeholder only — 8 marketing sections needed |
| `/sign-in` | Done | Clerk-managed |
| `/sign-up` | Done | Clerk-managed |
| `/onboarding` | Done | Role selection |
| `/dashboard` | Done | Summary cards + recent calls |
| `/calls` | Done | Full list with skeleton + empty state |
| `/calls/new` | Done | Upload form with validation + optimistic UI |
| `/calls/[callId]` | Done | Full analysis view + retry + toasts |
| `/reps` | Done | Manager-only rep list |
| `/reps/[repId]` | Done | Per-rep stats + call history |
| `/analytics` | Done | 4 charts + skeleton + empty state |
| `/settings` | Done | AI provider switcher + API key form |

**11 of 12 pages complete. Landing page is the only remaining build.**
