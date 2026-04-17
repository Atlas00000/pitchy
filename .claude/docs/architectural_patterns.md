# Architectural Patterns

Patterns that apply across the entire codebase. Read this before adding a new feature, function, or component.

---

## 1. AI Provider Abstraction (Multi-Model Pattern)

All AI calls are routed through a single provider interface. No component or Convex action imports a specific AI SDK directly.

```
lib/ai/types.ts          — AIProvider interface + CallAnalysis response schema
lib/ai/providers/        — one file per model (gemini.ts, claude.ts)
lib/ai/index.ts          — runtime resolver: reads user.aiProvider, returns correct implementation
convex/actions/analyzeCall.ts  — the only place that calls lib/ai/index.ts
```

**Rule:** Adding a new AI provider = add one file to `lib/ai/providers/`. Nothing else changes.

**Rule:** The `CallAnalysis` type in `types/index.ts` is the contract all providers must satisfy. If a provider returns a different shape, adapt it inside the provider file — never in the action.

---

## 2. Convex Domain Isolation (One File Per Table)

Each Convex table has exactly one file that owns its queries and mutations.

```
convex/users.ts      — users table only
convex/teams.ts      — teams table only
convex/calls.ts      — calls table only
convex/analysis.ts   — callAnalysis table only
```

**Rule:** A Convex file for table X never writes to table Y. Cross-table coordination happens in actions, not mutations.

**Rule:** All external API calls (AI, third-party) live in `convex/actions/` — never in mutations or queries.

---

## 3. Single-Pass AI Analysis

The entire analysis for a call (summary, scores, objections, coaching notes) is requested from the AI in one prompt and returned as a single structured JSON object. There are no sequential or chained AI calls per transcript.

```
lib/prompts/callAnalysis.ts   — single prompt template requesting all outputs at once
convex/actions/analyzeCall.ts — one AI call per transcript, result saved atomically
```

**Rule:** Never add a second AI call to the analysis pipeline. If a new output type is needed, extend the prompt and the `CallAnalysis` schema.

**Rule:** Prompts live in `lib/prompts/` as versioned constants — never inline inside action files.

---

## 4. Pages Compose, Components Own

App Router pages in `app/` are thin composers. All UI logic, state, and data fetching lives in components and hooks.

```
app/(dashboard)/calls/[callId]/page.tsx   — imports and composes components, nothing else
components/analysis/score-card.tsx        — owns its own rendering logic
hooks/use-analysis.ts                     — owns the Convex useQuery call
```

**Rule:** No `useQuery` or `useMutation` calls inside `app/` page files — only inside `hooks/`.

**Rule:** No business logic inside `app/` page files — only component composition and layout.

---

## 5. Feature-Scoped Components

Components are grouped by feature, not by type. A component belongs to the feature it primarily serves.

```
components/calls/        — transcript upload, viewer, call list
components/analysis/     — summary, scorecard, objections, coaching notes
components/reps/         — rep performance views
components/analytics/    — all charts and trend visualisations
components/shared/       — only components used across 2+ features
```

**Rule:** Never import from one feature folder into another (e.g. `calls/` importing from `analytics/`). If something is needed by multiple features, move it to `shared/`.

**Rule:** One component per file. No barrel `index.ts` re-exports inside feature folders.

---

## 6. Client-Side File Parsing

PDF and DOCX transcript files are parsed entirely in the browser before upload. The extracted plain text is what gets stored in Convex — not the original file.

```
lib/utils/parseFile.ts   — parsePdf(file): Promise<string | null>
                           parseDocx(file): Promise<string | null>
components/calls/transcript-upload-form.tsx  — calls parseFile, populates textarea
```

**Rule:** File parsing never happens server-side or inside Convex. Only plain transcript text is stored in the `calls` table.

**Rule:** If extraction returns `null` (scanned/image PDF), surface a user-facing fallback message — never silently store empty text.

---

## 7. BYOK (Bring Your Own Key) for AI Upgrades

Users who want Claude over Gemini paste their Anthropic API key into the Settings page. The key is stored encrypted in the `users` table and read only inside Convex actions — never returned to the client.

```
convex/users.ts              — stores aiProvider ("gemini" | "claude") + encryptedApiKey
convex/actions/analyzeCall.ts — reads key from user record inside the action
lib/ai/index.ts              — receives key as parameter, constructs provider
```

**Rule:** API keys are never returned by any Convex query. They are read inside actions only.

**Rule:** The default `aiProvider` for every new user is `"gemini"`. Claude is always opt-in.

---

## 8. Call Status State Machine

Every call record moves through a defined set of statuses. UI and actions coordinate through this field.

```
pending → analyzing → complete
                    → failed
```

```
convex/calls.ts   — updateCallStatus mutation
convex/actions/analyzeCall.ts  — transitions: pending → analyzing → complete | failed
components/shared/status-badge.tsx  — renders status visually
```

**Rule:** Only `analyzeCall.ts` transitions a call out of `analyzing`. No other file should write to the status field during analysis.

**Rule:** `failed` calls must store an `errorMessage` string so the UI can surface a meaningful reason and offer a retry.
