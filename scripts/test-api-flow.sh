#!/bin/bash
# Keepnet API — step-by-step test script
# Usage: CLIENT_ID=xxx CLIENT_SECRET=yyy ./scripts/test-api-flow.sh
# Or: load automatically from ~/.zhc.env or ~/zhc.env (source)

set -e
BASE_URL="https://api.keepnetlabs.com"

# Credentials: env, ~/.zhc.env or ~/zhc.env
for f in "$HOME/.zhc.env" "$HOME/zhc.env"; do
  [[ -f "$f" ]] && source "$f" && break
done

CLIENT_ID="${CLIENT_ID:-$KEEPNET_CLIENT_ID}"
CLIENT_SECRET="${CLIENT_SECRET:-$KEEPNET_CLIENT_SECRET}"

if [[ -z "$CLIENT_ID" || -z "$CLIENT_SECRET" ]]; then
  echo "❌ CLIENT_ID and CLIENT_SECRET are required."
  echo "   Usage: CLIENT_ID=xxx CLIENT_SECRET=yyy $0"
  exit 1
fi

echo "=== 1. Get token (POST /connect/token) ==="
TOKEN_RESP=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/connect/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials" \
  -d "client_id=$CLIENT_ID" \
  -d "client_secret=$CLIENT_SECRET" \
  -d "scope=api1")

HTTP=$(echo "$TOKEN_RESP" | tail -n1)
BODY=$(echo "$TOKEN_RESP" | sed '$d')

if [[ "$HTTP" != "200" ]]; then
  echo "❌ Failed to get token (HTTP $HTTP): $BODY"
  exit 1
fi

ACCESS_TOKEN=$(echo "$BODY" | grep -o '"access_token":"[^"]*"' | cut -d'"' -f4)
if [[ -z "$ACCESS_TOKEN" ]]; then
  echo "❌ Could not parse access_token: $BODY"
  exit 1
fi

echo "✓ Token obtained (${#ACCESS_TOKEN} characters)"
echo ""

echo "=== 2. First API call (GET /api/companies/my) ==="
MY_RESP=$(curl -s -w "\n%{http_code}" -X GET "$BASE_URL/api/companies/my" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json")

HTTP=$(echo "$MY_RESP" | tail -n1)
BODY=$(echo "$MY_RESP" | sed '$d')

if [[ "$HTTP" != "200" ]]; then
  echo "❌ /api/companies/my failed (HTTP $HTTP): $BODY"
  exit 1
fi

if echo "$BODY" | grep -q '"isSuccess":true'; then
  echo "✓ isSuccess: true, company info retrieved"
else
  echo "⚠ Response: $BODY"
fi
echo ""

echo "=== 3. Companies search (POST /api/companies/search) — Reseller may be required ==="
SEARCH_RESP=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/api/companies/search" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"pageNumber":1,"pageSize":5,"orderBy":"CreateTime","ascending":false,"filter":null}')

HTTP=$(echo "$SEARCH_RESP" | tail -n1)
BODY=$(echo "$SEARCH_RESP" | sed '$d')

if [[ "$HTTP" == "200" ]]; then
  if echo "$BODY" | grep -q '"isSuccess":true'; then
    echo "✓ companies/search succeeded"
  else
    echo "⚠ Response: $BODY"
  fi
elif [[ "$HTTP" == "403" ]]; then
  echo "⚠ 403 Forbidden — Reseller credential required (this endpoint is not available for Company Admin)"
else
  echo "❌ HTTP $HTTP: $BODY"
fi

echo ""
echo "=== All steps completed ==="
