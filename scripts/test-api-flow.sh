#!/bin/bash
# Keepnet API — adım adım test scripti
# Kullanım: CLIENT_ID=xxx CLIENT_SECRET=yyy ./scripts/test-api-flow.sh
# veya: ~/.zhc.env veya ~/zhc.env dosyasından otomatik yükle (source)

set -e
BASE_URL="https://api.keepnetlabs.com"

# Credentials: env, ~/.zhc.env veya ~/zhc.env
for f in "$HOME/.zhc.env" "$HOME/zhc.env"; do
  [[ -f "$f" ]] && source "$f" && break
done

CLIENT_ID="${CLIENT_ID:-$KEEPNET_CLIENT_ID}"
CLIENT_SECRET="${CLIENT_SECRET:-$KEEPNET_CLIENT_SECRET}"

if [[ -z "$CLIENT_ID" || -z "$CLIENT_SECRET" ]]; then
  echo "❌ CLIENT_ID ve CLIENT_SECRET gerekli."
  echo "   Kullanım: CLIENT_ID=xxx CLIENT_SECRET=yyy $0"
  exit 1
fi

echo "=== 1. Token al (POST /connect/token) ==="
TOKEN_RESP=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/connect/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials" \
  -d "client_id=$CLIENT_ID" \
  -d "client_secret=$CLIENT_SECRET" \
  -d "scope=api1")

HTTP=$(echo "$TOKEN_RESP" | tail -n1)
BODY=$(echo "$TOKEN_RESP" | sed '$d')

if [[ "$HTTP" != "200" ]]; then
  echo "❌ Token alınamadı (HTTP $HTTP): $BODY"
  exit 1
fi

ACCESS_TOKEN=$(echo "$BODY" | grep -o '"access_token":"[^"]*"' | cut -d'"' -f4)
if [[ -z "$ACCESS_TOKEN" ]]; then
  echo "❌ access_token parse edilemedi: $BODY"
  exit 1
fi

echo "✓ Token alındı (${#ACCESS_TOKEN} karakter)"
echo ""

echo "=== 2. İlk API çağrısı (GET /api/companies/my) ==="
MY_RESP=$(curl -s -w "\n%{http_code}" -X GET "$BASE_URL/api/companies/my" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json")

HTTP=$(echo "$MY_RESP" | tail -n1)
BODY=$(echo "$MY_RESP" | sed '$d')

if [[ "$HTTP" != "200" ]]; then
  echo "❌ /api/companies/my başarısız (HTTP $HTTP): $BODY"
  exit 1
fi

if echo "$BODY" | grep -q '"isSuccess":true'; then
  echo "✓ isSuccess: true, company bilgisi alındı"
else
  echo "⚠ Yanıt: $BODY"
fi
echo ""

echo "=== 3. Companies search (POST /api/companies/search) — Reseller gerekebilir ==="
SEARCH_RESP=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/api/companies/search" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"pageNumber":1,"pageSize":5,"orderBy":"CreateTime","ascending":false,"filter":null}')

HTTP=$(echo "$SEARCH_RESP" | tail -n1)
BODY=$(echo "$SEARCH_RESP" | sed '$d')

if [[ "$HTTP" == "200" ]]; then
  if echo "$BODY" | grep -q '"isSuccess":true'; then
    echo "✓ companies/search başarılı"
  else
    echo "⚠ Yanıt: $BODY"
  fi
elif [[ "$HTTP" == "403" ]]; then
  echo "⚠ 403 Forbidden — Reseller credential gerekli (Company Admin için bu endpoint kapalı)"
else
  echo "❌ HTTP $HTTP: $BODY"
fi

echo ""
echo "=== Tüm adımlar tamamlandı ==="
