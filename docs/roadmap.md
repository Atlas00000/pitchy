# Pitchly — MVP Report & Roadmap

---

## Product Overview

**Product Name:** Pitchly

**Problem:** Sales managers spend hours manually reviewing calls, writing feedback, and tracking rep performance — most of it inconsistent and delayed.

**Solution:** An AI-powered Sales Manager that automatically analyzes uploaded transcripts, grades performance, surfaces coaching opportunities, and gives reps instant feedback — so managers focus on strategy, not admin.

**Target Users:** B2B SaaS sales teams (5–50 reps), SDR/AE managers, revenue operations leads.

---

## Tech Stack Decisions

| Layer | Choice | Reason |
|---|---|---|
| Frontend | Next.js 14 (App Router) | SSR, file-based routing, great DX |
| Backend/DB/Realtime | Convex | No dedicated server needed, reactive queries, file storage built-in |
| Auth | Clerk | Faster to ship, better UI components, clean Convex integration |
| AI Integration | Multi-model via provider abstraction | Gemini Flash (free default) + Claude Sonnet (BYOK upgrade) — one interface, swappable at runtime |
| Charting | Recharts + D3.js | Recharts for standard charts, D3 for custom visualisations |
| Styling | Tailwind + shadcn/ui | Fast, clean, consistent UI |
| File Uploads | Convex File Storage | Native, no S3 setup needed |

**Architecture note:** Convex handles the database, real-time subscriptions, server functions (mutations/actions), and file storage — eliminating the need for Express/Fastify or a separate API layer. All AI calls live inside a single Convex action behind a provider abstraction layer.

### AI Provider Strategy

| Provider | Model | Cost | When Used |
|---|---|---|---|
| Google Gemini | gemini-2.0-flash | Free tier | Default for all users — no setup required |
| Anthropic Claude | claude-sonnet-4-6 | BYOK (user's own API key) | Opt-in upgrade for higher quality output |

**How it works — BYOK (Bring Your Own Key):**
- Every user defaults to Gemini Flash at zero cost
- Users can paste their own Anthropic API key in Settings
- Key is stored encrypted in Convex, never exposed to the client
- All AI calls route through a single abstraction layer — swapping providers requires no code changes

**Provider abstraction pattern:**
```ts
// lib/ai/types.ts — shared interface both providers implement
interface AIProvider {
  analyzeCall(transcript: string, metadata: CallMetadata): Promise<CallAnalysis>
}

// lib/ai/providers/gemini.ts   — Gemini implementation
// lib/ai/providers/claude.ts   — Claude implementation

// lib/ai/index.ts — resolves provider at runtime from user settings
export function getProvider(userSettings: UserSettings): AIProvider
```

**Why this approach:**
- Zero AI cost during development — use Gemini free tier throughout the build
- Claude available immediately for quality testing without switching infrastructure
- User-facing model switcher becomes a product feature, not just a dev tool
- Adding a third provider later (Groq, GPT-4o) requires only a new file in `lib/ai/providers/`

---

## MVP Scope: What We're Building

### 1. Landing Page

**Goal:** Feels like a real, conversion-ready product.

**Sections:**
- Hero — bold value prop headline + CTA ("Start Free Trial" / "See Demo")
- Problem statement — 3 pain points with icons
- How it works — 3-step visual flow (Upload Transcript → Analyze → Coach)
- Features overview — 7 feature cards with brief descriptions
- Social proof placeholder — logos or testimonial cards (can be mock)
- Pricing teaser — simple 1–2 tier cards
- Footer with nav

**Design feel:** Dark/neutral modern SaaS (think Linear, Vercel, or Loom aesthetic)

---

### 2. Auth + Dashboard Portal

**Auth flow:**
- Sign up / Log in (email + password or Google OAuth via Clerk)
- Role: Manager or Rep (simple toggle at onboarding)
- Redirect to dashboard after auth

**Dashboard:**
- Summary cards: Total calls this week, avg. score, top objection, top performing rep
- Quick actions: Upload transcript, View latest feedback
- Recent calls list with scores and status badges

---

### 3. Core Product Features (7 Features)

#### Feature 1 — Transcript Upload & Viewer
- Three input methods supported:
  - **Paste raw text** — direct textarea input
  - **Upload `.txt`** — plain text file
  - **Upload `.pdf`** — client-side text extraction via `pdfjs-dist` before upload
  - **Upload `.docx`** — client-side text extraction via `mammoth.js` before upload
- PDF/DOCX parsing happens in the browser — extracted text is sent to Convex, no server processing needed
- If PDF extraction returns empty text (scanned/image-based PDF), show fallback prompt: *"We couldn't extract text from this file. Please paste the transcript directly."*
- Store extracted transcript text in Convex, display in a clean structured reader view
- Tag call with rep name, date, deal stage, and prospect company
- On save, auto-trigger all AI analysis actions

#### Feature 2 — AI-Generated Call Summaries
- Claude generates a concise 1-paragraph summary of the call
- Includes: key topics discussed, prospect pain points surfaced, deal context, agreed next steps
- Displayed as the first card on the call detail page
- Manager can edit and annotate the summary

#### Feature 3 — Call Grading & Scoring
- Claude scores the call across 4 dimensions (0–10 each):
  - Discovery quality — how well the rep uncovered pain and goals
  - Objection handling — how effectively objections were addressed
  - Talk/listen ratio — estimated balance of rep vs prospect speaking
  - Next step clarity — whether a clear, committed next step was established
- Overall score = weighted average
- Visual scorecard with color indicators (red / yellow / green)
- Score stored per call and per rep for trend tracking

#### Feature 4 — Objection Tagging
- Claude identifies every objection moment in the transcript
- Tags each with: objection category (price, timing, authority, need), quoted text, and position in the call
- Displayed as highlighted inline annotations on the transcript viewer
- Objection categories aggregated per rep and across the team for trends

#### Feature 5 — Performance Insights per Rep
- Per-rep dashboard view showing:
  - Average score over time (line chart)
  - Score breakdown by dimension (radar/spider chart)
  - Most frequent objection types faced
  - Call volume this week / month
- Manager view shows all reps side-by-side for comparison

#### Feature 6 — Actionable Feedback & Coaching Notes
- Claude generates 3–5 specific coaching notes per call:
  - What the rep did well (positive reinforcement)
  - What to improve with a concrete suggestion
  - A recommended response for each objection encountered
- Feedback is written in second-person, direct coaching tone
- Rep receives their own coaching notes from their personal dashboard
- Manager can add manual notes on top of AI-generated feedback

#### Feature 7 — Simple Analytics & Trends
- Team-level analytics dashboard showing:
  - Average call score trend (weekly)
  - Top objections across all calls (bar chart)
  - Rep leaderboard by average score
  - Call volume by rep over time
- Filters by date range, rep, and deal stage

---

## Data Model (Convex Tables)

```
users          — id, name, email, role (manager/rep), teamId
teams          — id, name, managerId
calls          — id, repId, teamId, uploadedAt, transcriptText, fileId, dealStage, prospectCompany, status
callAnalysis   — callId, summary, scores{discovery, objHandling, talkRatio, nextStep, overall},
                 objections[{category, quote, position}], coachingNotes[], createdAt
```

---

## Priority Table

| Priority | Feature / Task | Effort | Impact | Must Ship for MVP |
|---|---|---|---|---|
| P0 | Project setup (Next.js + Convex + Clerk) | Low | High | Yes |
| P0 | Landing page | Medium | High | Yes |
| P0 | Auth + role-based routing (manager / rep) | Medium | High | Yes |
| P0 | Dashboard shell | Low | High | Yes |
| P1 | Transcript upload + viewer (Feature 1) | Low | High | Yes |
| P1 | AI call summary (Feature 2) | Medium | High | Yes |
| P1 | Call grading & scoring (Feature 3) | Medium | High | Yes |
| P1 | Objection tagging (Feature 4) | Medium | High | Yes |
| P1 | Coaching notes (Feature 6) | Medium | High | Yes |
| P2 | Performance insights per rep (Feature 5) | Medium | High | Yes |
| P2 | Analytics & trends dashboard (Feature 7) | Medium | Medium | Yes |
| P3 | Rep vs manager view polish + permissions | Medium | Medium | No (v1.1) |
| P3 | CRM integration (HubSpot / Salesforce) | Very High | High | No (v2) |
| P3 | Live call assist | Very High | High | No (v2) |
| P3 | Audio upload + transcription | High | Medium | No (v2) |

**Priority key:** P0 = blocker, P1 = core AI value, P2 = depth features, P3 = future

---

## Weekly Roadmap

> **Build order:** Backend and DB services first — fully tested before any frontend is built. Frontend then wraps the backend with confidence that all data and AI logic is solid.

---

### Week 1 — Backend Foundation
**Goal:** All Convex schema, queries, mutations, and auth wired up and testable via Convex dashboard.

#### Day 1 — Project Setup
- [ ] Init Next.js 14 (App Router) project
- [ ] Install and configure Convex (`npx convex dev`)
- [ ] Install and configure Clerk, link to Convex via `auth.config.ts`
- [ ] Install Tailwind, shadcn/ui, configure `components.json`
- [ ] Create `.env.local` with Clerk + Convex keys
- [ ] Push to repo, confirm Convex dev dashboard loads

#### Day 2 — Schema + Users/Teams Backend
- [ ] Define full Convex schema: `users`, `teams`, `calls`, `callAnalysis` tables
- [ ] Add all indexes: `repId`, `teamId`, `createdAt`, `callId`
- [ ] Write `convex/users.ts` — `getCurrentUser`, `createUser`, `updateRole`, `updateAiProvider`
- [ ] Write `convex/teams.ts` — `createTeam`, `getTeam`, `getTeamMembers`
- [ ] Test all user + team queries/mutations in Convex dashboard

#### Day 3 — Calls Backend
- [ ] Write `convex/calls.ts` — `createCall`, `getCall`, `getCalls`, `getCallsByRep`, `updateCallStatus`
- [ ] Write `convex/analysis.ts` — `saveAnalysis`, `getAnalysis`, `getAnalysisByRep`
- [ ] Add `status` field to calls: `pending | analyzing | complete | failed`
- [ ] Test all call + analysis queries/mutations in Convex dashboard with manual data

#### Day 4 — AI Abstraction Layer
- [ ] Define shared `AIProvider` interface in `lib/ai/types.ts`
- [ ] Define shared `CallAnalysis` response schema in `types/index.ts`
- [ ] Write `lib/ai/providers/gemini.ts` — Gemini Flash implementation
- [ ] Write `lib/ai/providers/claude.ts` — Claude Sonnet implementation
- [ ] Write `lib/ai/index.ts` — runtime provider resolver (reads from user `aiProvider` field)
- [ ] Write prompt template in `lib/prompts/callAnalysis.ts` — single-pass JSON prompt
- [ ] Unit test both providers locally with a sample transcript, confirm identical output shape

#### Day 5 — analyzeCall Action + End-to-End Backend Test
- [ ] Write `convex/actions/analyzeCall.ts` — fetches call, resolves provider, calls AI, saves result, updates status
- [ ] Add error handling: catch AI failure, set call status to `failed`, store error message
- [ ] Write `lib/constants.ts` — `SCORE_WEIGHTS`, `OBJECTION_CATEGORIES`, `DEAL_STAGES`
- [ ] Write `lib/utils.ts` — `scoreToColor()`, `formatDate()`, `cn()`, `truncate()`
- [ ] Full backend integration test: create call via Convex dashboard → trigger action → confirm `callAnalysis` record created with correct shape

**Exit criteria:** Full backend is testable end-to-end via the Convex dashboard. No frontend needed yet — paste a transcript via mutation, trigger the action, confirm full analysis stored correctly.

---

### Week 2 — Auth, Routing & Dashboard Shell
**Goal:** Working app skeleton — users can sign up, pick a role, and reach a real dashboard backed by live Convex data.

#### Day 1 — Middleware + Route Structure
- [ ] Write `middleware.ts` — Clerk middleware protecting all `/dashboard` routes
- [ ] Create route group folders: `(marketing)`, `(auth)`, `(dashboard)`
- [ ] Create layout files for each route group (no content yet, just providers + layout wrappers)
- [ ] Confirm redirect: unauthenticated user hitting `/dashboard` redirects to `/sign-in`

#### Day 2 — Auth Pages + Onboarding
- [ ] Build `app/(auth)/sign-in` and `sign-up` pages using Clerk components
- [ ] Build `app/(auth)/onboarding/page.tsx` — role selection (Manager / Rep) with Convex `updateRole` mutation on submit
- [ ] Hook Clerk `afterSignUp` redirect to `/onboarding`
- [ ] Hook onboarding submit to redirect to `/dashboard`
- [ ] Write `hooks/use-current-user.ts` — returns user + role from Convex
- [ ] Test full sign-up → onboarding → dashboard redirect flow

#### Day 3 — Dashboard Shell + Layout Components
- [ ] Build `components/layout/sidebar.tsx` — nav links, role-aware items (manager sees Reps + Analytics, rep sees only their calls)
- [ ] Build `components/layout/topbar.tsx` — page title + user avatar + sign out
- [ ] Build `app/(dashboard)/layout.tsx` — wraps all dashboard pages with sidebar + topbar
- [ ] Build `components/shared/empty-state.tsx`, `loading-skeleton.tsx`, `status-badge.tsx`, `page-header.tsx`
- [ ] Confirm dashboard layout renders correctly for both manager and rep roles

#### Day 4 — Dashboard Overview Page
- [ ] Write `hooks/use-calls.ts` — `useQuery` wrappers for `getCalls`, `getCall`, `getCallsByRep`
- [ ] Write `hooks/use-analysis.ts` — `useQuery` wrappers for `getAnalysis`, `getAnalysisByRep`
- [ ] Write `hooks/use-team-analytics.ts` — derived stats: avg score, top objection, call count
- [ ] Build `components/layout/dashboard-summary-cards.tsx` — 4 stat cards using live Convex data
- [ ] Build `app/(dashboard)/dashboard/page.tsx` — composes summary cards + recent calls list
- [ ] Confirm summary cards show real zeros for a new account (not broken)

#### Day 5 — Calls List Page + Settings Page
- [ ] Build `components/calls/call-list.tsx` — table of calls with rep name, date, score badge, status
- [ ] Build `components/calls/call-card.tsx` — single row component
- [ ] Build `app/(dashboard)/calls/page.tsx` — composes call list with page header + "New Call" CTA
- [ ] Build `app/(dashboard)/settings/page.tsx` — AI provider switcher (Gemini / Claude toggle + API key input)
- [ ] Wire settings form to `updateAiProvider` Convex mutation

**Exit criteria:** Full auth flow works. Signed-in users reach a live dashboard with real (empty) data. Role-based nav renders correctly. Settings page lets user switch AI provider.

---

### Week 3 — Core Feature Frontend
**Goal:** All 7 product features wired to the backend and working end-to-end.

#### Day 1 — Transcript Upload + Viewer
- [ ] Install `pdfjs-dist` and `mammoth` packages
- [ ] Write `lib/utils/parseFile.ts` — `parsePdf(file): Promise<string>` and `parseDocx(file): Promise<string>` utilities
- [ ] Handle empty extraction gracefully — return `null` and surface fallback message to user
- [ ] Build `components/calls/transcript-upload-form.tsx` — tab switcher: Paste Text / Upload File (.txt, .pdf, .docx), metadata fields (rep, date, deal stage, company)
- [ ] Wire file input: on file select, run client-side extraction, populate textarea with extracted text for user to review before submitting
- [ ] Build `app/(dashboard)/calls/new/page.tsx` — composes upload form, calls `createCall` mutation on submit, triggers `analyzeCall` action
- [ ] Build `components/calls/transcript-viewer.tsx` — renders transcript text with objection positions highlighted inline
- [ ] Build `app/(dashboard)/calls/[callId]/page.tsx` — call detail shell, shows transcript viewer + analysis panels
- [ ] Test: submit transcript via each input method → status changes `pending → analyzing → complete` in real time

#### Day 2 — AI Summary + Scorecard
- [ ] Build `components/analysis/analysis-summary-card.tsx` — summary paragraph + edit/annotate button
- [ ] Build `components/analysis/score-dimension-bar.tsx` — single labeled progress bar (0–10, color coded)
- [ ] Build `components/analysis/score-card.tsx` — overall score + 4 dimension bars using `score-dimension-bar`
- [ ] Compose summary card + scorecard into call detail page
- [ ] Test with a real transcript: confirm summary and scores render correctly

#### Day 3 — Objections + Coaching Notes
- [ ] Build `components/analysis/objection-tag.tsx` — inline annotation chip (category label + quoted text)
- [ ] Build `components/analysis/objection-list.tsx` — full list of tagged objections for a call
- [ ] Build `components/analysis/coaching-notes-list.tsx` — coaching note cards (positive / improve / suggested response)
- [ ] Wire objection positions to `transcript-viewer.tsx` highlights
- [ ] Compose objection list + coaching notes into call detail page
- [ ] Test full call detail page end-to-end: all 4 analysis sections visible and populated

#### Day 4 — Rep Performance + Analytics
- [ ] Build `components/reps/rep-stats-header.tsx`, `rep-card.tsx`, `rep-list.tsx`
- [ ] Build `app/(dashboard)/reps/page.tsx` (manager only) + `reps/[repId]/page.tsx`
- [ ] Build `components/analytics/score-trend-chart.tsx` (Recharts line chart)
- [ ] Build `components/analytics/objection-bar-chart.tsx` (Recharts bar chart)
- [ ] Build `components/analytics/dimension-radar-chart.tsx` (D3 radar/spider chart)
- [ ] Build `components/analytics/rep-leaderboard.tsx` + `call-volume-chart.tsx`
- [ ] Build `app/(dashboard)/analytics/page.tsx` — composes all chart components

#### Day 5 — AI Provider Switcher UI + Integration
- [ ] Wire AI provider toggle in settings to live user preference in Convex
- [ ] Confirm `analyzeCall` action reads user's `aiProvider` and routes to correct provider
- [ ] Test same transcript through both Gemini and Claude — confirm identical response shape
- [ ] Show active model badge on call detail page ("Analyzed with Gemini Flash" / "Analyzed with Claude Sonnet")

**Exit criteria:** All 7 features work end-to-end. A full cycle from transcript upload to viewing analysis, coaching notes, rep performance, and team analytics is functional.

---

### Week 4 — Polish + Demo Readiness
**Goal:** Product feels real, handles all edge cases, fully deployed and demo-ready.

#### Day 1 — Loading + Empty States
- [ ] Add skeleton loaders to every data-fetching component
- [ ] Add `empty-state.tsx` to calls list, reps list, analytics page
- [ ] Add "Upload your first transcript" prompt on empty dashboard
- [ ] Add optimistic UI to call creation mutation

#### Day 2 — Error Handling + Notifications
- [ ] Add error boundaries to all dashboard pages
- [ ] Add toast notifications: call submitted, analysis complete, analysis failed
- [ ] Handle `failed` call status with retry button
- [ ] Add form validation to transcript upload form

#### Day 3 — Landing Page
- [ ] Build all `components/marketing/` sections: navbar, hero, problem, how-it-works, features, social-proof, pricing, footer
- [ ] Build `app/(marketing)/page.tsx` composing all sections
- [ ] Mobile responsive audit across all pages

#### Day 4 — QA + Seed Data
- [ ] Write seed script: 3 demo users (1 manager, 2 reps), 5 pre-analyzed calls with full analysis data
- [ ] Run seed on dev environment, QA full demo flow end-to-end
- [ ] Cross-browser check (Chrome, Safari, Firefox)

#### Day 5 — Deploy + Demo Script
- [ ] Set up Convex production deployment
- [ ] Deploy to Vercel, configure production env vars
- [ ] Final UI polish pass
- [ ] Write demo walkthrough script

**Exit criteria:** Live URL works. Seed data in place. Clean demo run from landing page through sign-up, transcript upload, and full analysis with zero broken states.

---

## Industry Best Practices

### AI / Prompt Engineering
- **Single-pass analysis:** Send the full transcript to Claude once and request all outputs (summary, scores, objections, coaching notes) in a single structured JSON response — avoids redundant API calls and keeps costs low
- **Structured outputs:** Use Claude's JSON-mode for all stored data — never parse free-form text for scorecard fields or objection categories
- **Prompt versioning:** Store all prompt templates in a `/lib/prompts` constants file, not inline — makes iteration and A/B testing easy
- **Graceful degradation:** If the Claude action fails, show partial results rather than blocking the whole page
- **Temperature discipline:** Use low temperature (0.2–0.3) for scoring and tagging, higher (0.6–0.7) for coaching notes
- **Context hygiene:** Send only the transcript + call metadata to Claude — never pass full conversation history for single-call tasks

### Convex Best Practices
- **Separate queries from mutations:** Keep Convex queries pure and reactive — no writes inside queries
- **Actions for all external calls:** Claude API calls belong in Convex actions, not mutations
- **Index on day one:** Add indexes on `repId`, `teamId`, and `createdAt` from the start — retrofitting is painful
- **Optimistic updates:** Use `optimisticUpdate` on call creation so the UI feels instant

### Next.js Best Practices
- **App Router conventions:** Server components by default — only `"use client"` where interactivity requires it
- **Route groups:** Use `(marketing)`, `(auth)`, and `(dashboard)` route groups to cleanly separate layouts
- **Environment variables:** Claude API key and all secrets go in Convex environment variables — never in client-side code

### Auth & Security
- **Server-side role checks:** Role enforcement happens in Convex queries/mutations — client-side role state is UI-only
- **Rate limit AI actions:** Add a per-user daily call limit in Convex to cap Claude spend during MVP
- **Data minimalism:** Store only what the product needs — no raw audio, no PII beyond what's in the transcript

### UX / Product
- **Progressive disclosure:** Show summary first (instant win), then scorecard, then objection tags, then coaching notes
- **Make AI editable:** Managers can override scores and summaries — builds trust and captures ground truth corrections
- **Feedback loops:** Thumbs up/down on AI outputs from day one — becomes training signal later
- **Show confidence:** If a score or tag is ambiguous, surface that rather than presenting false precision

---

## What Makes This MVP Compelling

1. **Immediate value loop** — upload transcript → get full analysis in under 30 seconds
2. **Rep self-service** — reps get instant coaching without waiting for a manager review
3. **Manager leverage** — one manager can effectively "review" 10x more calls
4. **Data compounds** — every call added improves trends, insights, and rep performance visibility
5. **Extensible foundation** — all 7 features are natural stepping stones to CRM integration, live assist, and team benchmarking

---

## Additional API Integrations

| API | Purpose | MVP Value | Effort |
|---|---|---|---|
| Claude (Anthropic) | Core AI — summaries, scoring, objection tagging, coaching notes | Critical | Low |
| Zoom API | Auto-import transcript exports from recorded Zoom meetings — removes manual upload step | High | Medium |
| HubSpot API | Pull deal stage, contact, and company data into call context — richer, more relevant AI analysis | Medium | Medium |
| Apollo.io API | Prospect enrichment — firmographics (industry, revenue, headcount) for auto-tagging and context | Medium | Medium |
| Slack API | Push scores and coaching notes to Slack — manager digest in team channel, rep DM with feedback | Medium | Low |
| Salesforce API | Enterprise CRM integration — sync call scores and insights back to opportunity records | Low (now) / High (later) | High |
| Twilio | Real-time call recording and streaming — foundation for live call assist feature in v2 | Low (now) / High (later) | High |

### Integration Priority

**MVP (v1):** Claude API only — covers the full AI value loop.

**Quick win:** Slack — low effort, makes the product feel alive in existing team workflows.

**v1.1:** Zoom + HubSpot — removes the two biggest manual friction points (upload and deal context entry).

**v2:** Salesforce + Apollo.io + Twilio — enterprise tier and live call assist.

---

## Folder Structure & Modularity Guide

> **Rule:** Every file has one job. Pages compose components. Components own their own styles. Convex files own their own table. Hooks wrap Convex calls. Nothing leaks across boundaries.

```
salesai/
│
├── app/                                        # Next.js App Router — pages only, no logic
│   ├── layout.tsx                              # Root layout: ClerkProvider + ConvexProvider
│   ├── globals.css
│   │
│   ├── (marketing)/                            # Public routes — no auth required
│   │   ├── layout.tsx                          # Marketing layout: Navbar + Footer
│   │   └── page.tsx                            # Landing page (composes marketing/ components)
│   │
│   ├── (auth)/                                 # Auth routes
│   │   ├── layout.tsx                          # Minimal centered layout
│   │   ├── sign-in/[[...sign-in]]/page.tsx     # Clerk sign-in page
│   │   ├── sign-up/[[...sign-up]]/page.tsx     # Clerk sign-up page
│   │   └── onboarding/page.tsx                 # Role selection after sign-up
│   │
│   └── (dashboard)/                            # Protected routes — requires auth
│       ├── layout.tsx                          # Dashboard layout: Sidebar + Topbar
│       ├── dashboard/page.tsx                  # Overview: summary cards + recent calls
│       ├── calls/
│       │   ├── page.tsx                        # All calls list
│       │   ├── new/page.tsx                    # Upload / paste transcript
│       │   └── [callId]/page.tsx               # Call detail: viewer + full analysis
│       ├── reps/
│       │   ├── page.tsx                        # All reps (manager view only)
│       │   └── [repId]/page.tsx                # Individual rep performance
│       └── analytics/page.tsx                  # Team analytics + trends
│
├── components/                                 # All UI — split by feature, one component per file
│   │
│   ├── ui/                                     # shadcn/ui primitives — do not modify
│   │   └── button.tsx, card.tsx, badge.tsx, input.tsx, skeleton.tsx, ...
│   │
│   ├── marketing/                              # Landing page — one file per section
│   │   ├── navbar.tsx                          # Top nav with CTA
│   │   ├── hero.tsx                            # Hero headline + subtext + CTA buttons
│   │   ├── problem-section.tsx                 # 3 pain point cards
│   │   ├── how-it-works.tsx                    # 3-step visual flow
│   │   ├── features-section.tsx                # 7 feature cards grid
│   │   ├── social-proof.tsx                    # Testimonials / logo strip
│   │   ├── pricing-section.tsx                 # Pricing tier cards
│   │   └── footer.tsx                          # Footer with links
│   │
│   ├── layout/                                 # App shell — structural components
│   │   ├── sidebar.tsx                         # Nav links, role-aware items
│   │   ├── topbar.tsx                          # Page title + user avatar menu
│   │   └── dashboard-summary-cards.tsx         # Top stat cards on overview
│   │
│   ├── calls/                                  # Feature: transcript upload + viewer
│   │   ├── call-list.tsx                       # Table of all calls with status + score
│   │   ├── call-card.tsx                       # Single call row/card component
│   │   ├── transcript-upload-form.tsx          # File upload + paste text input form
│   │   ├── transcript-viewer.tsx               # Rendered transcript with objection highlights
│   │   └── call-metadata-form.tsx              # Rep name, date, deal stage, company fields
│   │
│   ├── analysis/                               # Feature: AI analysis display — one per output
│   │   ├── analysis-summary-card.tsx           # AI-generated call summary paragraph
│   │   ├── score-card.tsx                      # Overall score + 4 dimension breakdown
│   │   ├── score-dimension-bar.tsx             # Single dimension progress bar (reused x4)
│   │   ├── objection-list.tsx                  # All objections for a call
│   │   ├── objection-tag.tsx                   # Single inline objection annotation
│   │   └── coaching-notes-list.tsx             # All coaching notes for a call
│   │
│   ├── reps/                                   # Feature: rep performance views
│   │   ├── rep-list.tsx                        # Manager view — all reps table
│   │   ├── rep-card.tsx                        # Single rep summary card
│   │   └── rep-stats-header.tsx                # Rep name + avg score + call count banner
│   │
│   ├── analytics/                              # Feature: charts and trends
│   │   ├── score-trend-chart.tsx               # Line chart — avg score over time
│   │   ├── objection-bar-chart.tsx             # Horizontal bar — top objection categories
│   │   ├── rep-leaderboard.tsx                 # Ranked table of reps by avg score
│   │   ├── dimension-radar-chart.tsx           # Spider chart — score dimensions per rep
│   │   └── call-volume-chart.tsx               # Bar chart — calls per rep per week
│   │
│   └── shared/                                 # Reused across all features
│       ├── empty-state.tsx                     # No data placeholder with CTA
│       ├── loading-skeleton.tsx                # Generic skeleton loader
│       ├── page-header.tsx                     # Title + subtitle + optional action button
│       └── status-badge.tsx                    # Colored badge (Analyzed / Pending / Failed)
│
├── convex/                                     # Backend — one file per table/domain
│   ├── schema.ts                               # All table definitions + indexes
│   ├── auth.config.ts                          # Clerk JWT config
│   ├── users.ts                                # queries: getUser, getCurrentUser | mutations: createUser, updateRole, updateAiProvider
│   ├── teams.ts                                # queries: getTeam, getTeamMembers | mutations: createTeam
│   ├── calls.ts                                # queries: getCalls, getCall, getCallsByRep | mutations: createCall, updateCallStatus
│   ├── analysis.ts                             # queries: getAnalysis, getAnalysisByRep | mutations: saveAnalysis
│   ├── actions/
│   │   └── analyzeCall.ts                      # Main AI action — resolves provider from user settings, calls AI, saves result
│   └── _generated/                             # Convex CLI auto-generated (never edit manually)
│
├── lib/                                        # Pure utilities — no React, no Convex
│   ├── ai/
│   │   ├── types.ts                            # AIProvider interface + CallAnalysis response schema
│   │   ├── index.ts                            # Runtime provider resolver — reads user.aiProvider
│   │   └── providers/
│   │       ├── gemini.ts                       # Gemini Flash implementation (free default)
│   │       └── claude.ts                       # Claude Sonnet implementation (BYOK)
│   ├── prompts/
│   │   └── callAnalysis.ts                     # Versioned prompt templates shared by all providers
│   ├── utils/
│   │   ├── index.ts                            # cn(), formatDate(), scoreToColor(), truncate()
│   │   └── parseFile.ts                        # parsePdf() via pdfjs-dist, parseDocx() via mammoth.js
│   └── constants.ts                            # SCORE_WEIGHTS, OBJECTION_CATEGORIES, DEAL_STAGES
│
├── hooks/                                      # Convex query/mutation wrappers — keep pages clean
│   ├── use-calls.ts                            # useQuery wrappers for call data
│   ├── use-analysis.ts                         # useQuery wrappers for analysis data
│   ├── use-team-analytics.ts                   # Derived analytics queries
│   └── use-current-user.ts                     # Current user + role from Convex
│
├── types/
│   └── index.ts                                # Shared TS types: Call, Analysis, Score, Objection, CoachingNote
│
├── middleware.ts                               # Clerk middleware — protect all /dashboard routes
├── .env.local                                  # CLERK_SECRET_KEY, CONVEX_DEPLOYMENT — never commit
├── convex.json                                 # Convex project ID
├── components.json                             # shadcn/ui config
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
└── package.json
```

### Modularity Rules

| Rule | Why |
|---|---|
| Pages only compose — no logic in `app/` files | Keeps pages thin and easy to follow; logic lives in hooks and Convex |
| One component per file in `components/` | Easy to find, replace, or delete without side effects |
| One table per Convex file | Queries and mutations stay co-located with the schema they touch |
| All Claude calls go through `convex/actions/analyzeCall.ts` | Single entry point — swap model, adjust prompt, add retry logic in one place |
| Prompts live in `lib/prompts/` not inside actions | Prompts are versioned config, not implementation detail |
| Hooks encapsulate all `useQuery` / `useMutation` calls | Pages stay declarative — no Convex API calls scattered across components |
| `components/shared/` for anything used in 2+ features | Prevents duplication without premature abstraction |
| Never import across feature folders (e.g. `calls/` importing from `analytics/`) | Feature isolation — changes in one area don't break another |

---

## Confirmed Decisions

| Decision | Confirmed Choice | Notes |
|---|---|---|
| AI default provider | Gemini 2.0 Flash | Free tier, no key required for users |
| AI upgrade provider | Claude Sonnet (claude-sonnet-4-6) | BYOK — user pastes their Anthropic key in settings |
| AI architecture | Provider abstraction layer | `lib/ai/providers/` — swap models without touching Convex actions |
| Auth provider | Clerk | Faster to ship, better prebuilt UI, clean Convex integration |
| Transcript input | Paste, `.txt`, `.pdf`, `.docx` | Client-side parsing via `pdfjs-dist` (PDF) and `mammoth.js` (DOCX) — text extracted in browser, no backend processing |
| Charting | Recharts + D3.js | Recharts for standard charts, D3 for radar/custom viz |
| Deployment | Vercel + Convex prod deployment | Handled at end of Week 4 |
| Build order | Backend first, then frontend | All Convex schema/queries/actions tested before UI is built |
