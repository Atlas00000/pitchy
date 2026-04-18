#!/usr/bin/env bash
# Test the full transcript upload → analyze → result flow via Convex CLI.
# Run from the project root: bash scripts/test-upload-flow.sh

set -e
cd "$(dirname "$0")/.."

IDENTITY='{"subject":"script-test-user","name":"Test Script","email":"script@test.com","issuer":"test"}'

TRANSCRIPT="Rep: Hi Sarah, thanks for taking the time today. Can you walk me through your current sales process?
Prospect: Sure. We use spreadsheets mostly, which is getting painful as the team grows.
Rep: How many reps do you have right now?
Prospect: About twelve. It's getting hard to track who's following up on what.
Rep: Makes sense. What would a better solution look like for you?
Prospect: Something that centralises notes and gives me visibility into pipeline without constant check-ins.
Rep: We can definitely help with that. One concern I hear from teams your size is budget — is that something we should talk through?
Prospect: Honestly yes. We had a bad experience with a vendor last year who overpromised and the ROI wasn't there.
Rep: That's fair. What would you need to see to feel confident this time?
Prospect: A clear onboarding plan and some kind of trial period before we commit.
Rep: We offer a 30-day pilot with full support — would that work?
Prospect: That sounds reasonable. Let's set up a follow-up with my VP next week."

echo ""
echo "=== Step 1: Create test user ==="
npx convex run users:createUser \
  --identity "$IDENTITY" \
  '{"clerkId":"script-test-user","name":"Test Script","email":"script@test.com"}'

echo ""
echo "=== Step 2: Create call ==="
CALL_ID=$(npx convex run calls:createCall \
  --identity "$IDENTITY" \
  "{\"transcriptText\":$(echo "$TRANSCRIPT" | python3 -c 'import json,sys; print(json.dumps(sys.stdin.read()))'),\"repName\":\"Jane Smith\",\"prospectCompany\":\"Acme Corp\",\"dealStage\":\"discovery\",\"callDate\":\"2026-04-18\"}")

echo "Call ID: $CALL_ID"

echo ""
echo "=== Step 3: Trigger analysis ==="
npx convex run actions/analyzeCall:analyzeCall \
  --identity "$IDENTITY" \
  "{\"callId\":$CALL_ID}"

echo ""
echo "=== Step 4: Fetch result ==="
npx convex run analysis:getAnalysis "{\"callId\":$CALL_ID}"

echo ""
echo "=== Done ==="
