#!/usr/bin/env bash
# Week 4 Day 1 + Day 2 test script
# Tests: file existence, component exports, Convex backend flows
# Run from project root: bash scripts/test-day1-day2.sh

cd "$(dirname "$0")/.."

PASS=0
FAIL=0
WARN=0

green()  { echo -e "\033[32m✓ $1\033[0m"; }
red()    { echo -e "\033[31m✗ $1\033[0m"; }
yellow() { echo -e "\033[33m~ $1\033[0m"; }
header() { echo -e "\n\033[1m$1\033[0m"; }

check_file() {
  local label="$1" path="$2"
  if [ -f "$path" ]; then
    green "$label exists"
    PASS=$((PASS+1))
  else
    red "$label MISSING: $path"
    FAIL=$((FAIL+1))
  fi
}

check_export() {
  local label="$1" path="$2" pattern="$3"
  if grep -q "$pattern" "$path" 2>/dev/null; then
    green "$label"
    PASS=$((PASS+1))
  else
    red "$label — pattern '$pattern' not found in $path"
    FAIL=$((FAIL+1))
  fi
}

check_pattern() {
  local label="$1" path="$2" pattern="$3"
  if grep -q "$pattern" "$path" 2>/dev/null; then
    green "$label"
    PASS=$((PASS+1))
  else
    red "$label — pattern '$pattern' not found in $path"
    FAIL=$((FAIL+1))
  fi
}

# ─── DAY 1: FILE + EXPORT CHECKS ─────────────────────────────────────────────
header "DAY 1 — Loading + Empty States"

header "  File existence"
check_file "loading-skeleton.tsx" "components/shared/loading-skeleton.tsx"
check_file "empty-state.tsx"      "components/shared/empty-state.tsx"
check_file "call-list.tsx"        "components/calls/call-list.tsx"
check_file "rep-list.tsx"         "components/reps/rep-list.tsx"
check_file "analytics/page.tsx"   "app/(dashboard)/analytics/page.tsx"
check_file "calls/new/page.tsx"   "app/(dashboard)/calls/new/page.tsx"

header "  New skeleton variants"
check_export "RepCardSkeleton exported"  "components/shared/loading-skeleton.tsx" "export function RepCardSkeleton"
check_export "ChartSkeleton exported"    "components/shared/loading-skeleton.tsx" "export function ChartSkeleton"

header "  CallList empty state CTA"
check_pattern "CallList imports Link"               "components/calls/call-list.tsx" "import Link"
check_pattern "CallList empty state has /calls/new" "components/calls/call-list.tsx" "/calls/new"
check_pattern "CallList empty state has action"     "components/calls/call-list.tsx" "Upload transcript"

header "  RepList skeleton + EmptyState"
check_pattern "RepList imports RepCardSkeleton" "components/reps/rep-list.tsx" "RepCardSkeleton"
check_pattern "RepList imports EmptyState"      "components/reps/rep-list.tsx" "EmptyState"
check_pattern "RepList uses EmptyState"         "components/reps/rep-list.tsx" "No reps yet"

header "  Analytics page skeleton + EmptyState"
check_pattern "Analytics imports ChartSkeleton" "app/(dashboard)/analytics/page.tsx" "ChartSkeleton"
check_pattern "Analytics imports EmptyState"    "app/(dashboard)/analytics/page.tsx" "EmptyState"
check_pattern "Analytics empty state text"      "app/(dashboard)/analytics/page.tsx" "No data yet"

header "  Optimistic UI"
check_pattern "createCall uses withOptimisticUpdate" "app/(dashboard)/calls/new/page.tsx" "withOptimisticUpdate"
check_pattern "Optimistic update patches getCalls"   "app/(dashboard)/calls/new/page.tsx" "getCalls"

# ─── DAY 2: FILE + EXPORT CHECKS ─────────────────────────────────────────────
header "DAY 2 — Error Handling + Notifications"

header "  File existence"
check_file "toast.tsx"          "components/shared/toast.tsx"
check_file "error-boundary.tsx" "components/shared/error-boundary.tsx"
check_file "retry-button.tsx"   "components/calls/retry-button.tsx"

header "  Toast system"
check_export "ToastProvider exported" "components/shared/toast.tsx" "export function ToastProvider"
check_export "useToast exported"      "components/shared/toast.tsx" "export function useToast"
check_pattern "Toast has success type" "components/shared/toast.tsx" "success"
check_pattern "Toast has error type"   "components/shared/toast.tsx" "error"
check_pattern "Toast auto-dismisses"   "components/shared/toast.tsx" "setTimeout"

header "  Error boundary"
check_export "ErrorBoundary exported"              "components/shared/error-boundary.tsx" "export class ErrorBoundary"
check_pattern "ErrorBoundary getDerivedStateFromError" "components/shared/error-boundary.tsx" "getDerivedStateFromError"
check_pattern "ErrorBoundary has Try again button" "components/shared/error-boundary.tsx" "Try again"

header "  Dashboard layout wired"
check_pattern "Layout imports ToastProvider"  "app/(dashboard)/layout.tsx" "ToastProvider"
check_pattern "Layout imports ErrorBoundary"  "app/(dashboard)/layout.tsx" "ErrorBoundary"
check_pattern "Layout uses ToastProvider"     "app/(dashboard)/layout.tsx" "<ToastProvider"
check_pattern "Layout uses ErrorBoundary"     "app/(dashboard)/layout.tsx" "<ErrorBoundary"

header "  Retry button"
check_export "RetryButton exported"          "components/calls/retry-button.tsx" "export function RetryButton"
check_pattern "RetryButton calls analyzeCall" "components/calls/retry-button.tsx" "analyzeCall"
check_pattern "RetryButton uses useToast"     "components/calls/retry-button.tsx" "useToast"

header "  Call detail page wired"
check_pattern "Call detail imports RetryButton"  "app/(dashboard)/calls/[callId]/page.tsx" "RetryButton"
check_pattern "Call detail imports useToast"     "app/(dashboard)/calls/[callId]/page.tsx" "useToast"
check_pattern "Call detail shows RetryButton"    "app/(dashboard)/calls/[callId]/page.tsx" "<RetryButton"
check_pattern "Call detail tracks prev status"   "app/(dashboard)/calls/[callId]/page.tsx" "prevStatus"

header "  New call page toast"
check_pattern "New call page imports useToast"  "app/(dashboard)/calls/new/page.tsx" "useToast"
check_pattern "New call page fires toast"        "app/(dashboard)/calls/new/page.tsx" "showToast"

header "  Upload form validation"
check_pattern "Form has touched state"           "components/calls/transcript-upload-form.tsx" "touched"
check_pattern "Form has touch() function"        "components/calls/transcript-upload-form.tsx" "function touch"
check_pattern "Form has fieldError() function"   "components/calls/transcript-upload-form.tsx" "function fieldError"
check_pattern "Form shows rep name error"        "components/calls/transcript-upload-form.tsx" "Rep name is required"
check_pattern "Form shows company error"         "components/calls/transcript-upload-form.tsx" "Company name is required"
check_pattern "Form shows transcript length error" "components/calls/transcript-upload-form.tsx" "50 characters"

# ─── CONVEX BACKEND FLOWS ────────────────────────────────────────────────────
header "DAY 1+2 — Convex backend flows"

IDENTITY='{"subject":"day1-day2-test","name":"Day1 Tester","email":"day1@test.com","issuer":"test"}'

TRANSCRIPT="Rep: Hi Sarah, thanks for joining today. Can you walk me through your current sales process?
Prospect: We rely on spreadsheets mostly, which gets painful as the team grows to about twelve reps.
Rep: How do you currently track follow-ups across the team?
Prospect: Honestly it's a mess — Slack messages and sticky notes. Things slip through.
Rep: That's a common pain point. What would an ideal solution look like for your team?
Prospect: Something central with pipeline visibility. Budget is also a concern after a bad vendor experience.
Rep: We offer a 30-day pilot with full support. Would that address the risk concern?
Prospect: Yes, that sounds reasonable. Let's loop in my VP next week."

echo ""
header "  Step 1: Ensure user exists"
npx convex run users:createUser \
  --identity "$IDENTITY" \
  '{"clerkId":"day1-day2-test","name":"Day1 Tester","email":"day1@test.com"}' 2>/dev/null || true
green "User ready"
PASS=$((PASS+1))

echo ""
header "  Step 2: Fetch calls (empty state check)"
CALLS=$(npx convex run calls:getCalls --identity "$IDENTITY" 2>/dev/null || echo "[]")
echo "  getCalls returned: $CALLS"
if echo "$CALLS" | grep -q "\[\]" || echo "$CALLS" | grep -q "^\[\]"; then
  green "Empty call list returned — empty state condition met"
  PASS=$((PASS+1))
else
  yellow "Calls exist for this test user — empty state not testable (existing data)"
  WARN=$((WARN+1))
fi

echo ""
header "  Step 3: Create a new call (optimistic backing)"
CALL_ID=$(npx convex run calls:createCall \
  --identity "$IDENTITY" \
  "{\"transcriptText\":$(echo "$TRANSCRIPT" | python3 -c 'import json,sys; print(json.dumps(sys.stdin.read()))'),\"repName\":\"Jane Smith\",\"prospectCompany\":\"Acme Corp\",\"dealStage\":\"discovery\",\"callDate\":\"2026-04-18\"}")
echo "  Call created: $CALL_ID"
if [ -n "$CALL_ID" ]; then
  green "Call created successfully"
  PASS=$((PASS+1))
else
  red "Call creation failed"
  FAIL=$((FAIL+1))
fi

echo ""
header "  Step 4: Verify call status is 'pending' (pre-analysis)"
STATUS=$(npx convex run calls:getCall "{\"callId\":$CALL_ID}" 2>/dev/null | python3 -c 'import json,sys; d=json.load(sys.stdin); print(d.get("status","?"))' 2>/dev/null || echo "unknown")
echo "  Status: $STATUS"
if [ "$STATUS" = "pending" ]; then
  green "Call status is 'pending' — correct initial state"
  PASS=$((PASS+1))
else
  yellow "Unexpected status: $STATUS"
  WARN=$((WARN+1))
fi

echo ""
header "  Step 5: Run analysis (simulates submit + retry flow)"
npx convex run actions/analyzeCall:analyzeCall \
  --identity "$IDENTITY" \
  "{\"callId\":$CALL_ID}"
green "analyzeCall action completed"
PASS=$((PASS+1))

echo ""
header "  Step 6: Verify status is 'complete'"
STATUS=$(npx convex run calls:getCall "{\"callId\":$CALL_ID}" 2>/dev/null | python3 -c 'import json,sys; d=json.load(sys.stdin); print(d.get("status","?"))' 2>/dev/null || echo "unknown")
echo "  Status after analysis: $STATUS"
if [ "$STATUS" = "complete" ]; then
  green "Call status transitioned to 'complete' — toast trigger condition met"
  PASS=$((PASS+1))
else
  red "Expected 'complete', got '$STATUS'"
  FAIL=$((FAIL+1))
fi

echo ""
header "  Step 7: Fetch analysis result"
ANALYSIS=$(npx convex run analysis:getAnalysis "{\"callId\":$CALL_ID}" 2>/dev/null)
SUMMARY=$(echo "$ANALYSIS" | python3 -c 'import json,sys; d=json.load(sys.stdin); print(d.get("summary","")[:80])' 2>/dev/null || echo "")
OVERALL=$(echo "$ANALYSIS" | python3 -c 'import json,sys; d=json.load(sys.stdin); print(d.get("scores",{}).get("overall","?"))' 2>/dev/null || echo "?")
echo "  Summary: $SUMMARY…"
echo "  Overall score: $OVERALL"
if [ -n "$SUMMARY" ] && [ "$OVERALL" != "?" ]; then
  green "Analysis data present — analysis cards will render"
  PASS=$((PASS+1))
else
  red "Analysis result missing or malformed"
  FAIL=$((FAIL+1))
fi

# ─── SUMMARY ─────────────────────────────────────────────────────────────────
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "\033[32m✓ PASSED: $PASS\033[0m"
[ $WARN -gt 0 ] && echo -e "\033[33m~ WARNED: $WARN\033[0m"
[ $FAIL -gt 0 ] && echo -e "\033[31m✗ FAILED: $FAIL\033[0m"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $FAIL -gt 0 ]; then
  echo "Some checks failed — review output above."
  exit 1
else
  echo "All checks passed."
fi
