# OpenAPI Spec — GitBook Menu Hierarchy

This folder contains the OpenAPI spec enriched with `x-parent` for GitBook API Reference. All endpoint groups are grouped under **Endpoints**.

## Files

| File | Description |
|------|-------------|
| `keepnet-api-spec.json` | Live API spec + tags + x-parent (for GitBook) |

## Using in GitBook

### Option 1: By URL (Recommended)

1. Add this file to the repo and push.
2. GitBook Space → **Integrations** → **OpenAPI** → edit the `keepnet-api` spec.
3. Select **URL** as **Source**.
4. Set the URL to this format:
   ```
   https://raw.githubusercontent.com/ORGANIZATION/keepnet-docs/BRANCH/openapi/keepnet-api-spec.json
   ```
   (e.g. `https://raw.githubusercontent.com/keepnetlabs/keepnet-docs/main/openapi/keepnet-api-spec.json`)
5. Trigger an update with **Check for updates**.

### Option 2: File Upload

1. Run the `scripts/enrich-openapi-spec.mjs` script.
2. GitBook → OpenAPI → `keepnet-api` → **Update** to upload the new file.

### ⚠️ If Test it shows wrong Body (filterGroups, orderBy: null, 400 error)

**Cause:** GitBook may be using the live API URL (`https://api.keepnetlabs.com/swagger/v1/swagger.json`). The request body schema in that spec is complex — the API returns 400.

**Fix:** In GitBook Integration → OpenAPI → `keepnet-api`, **Source URL** must be the **GitHub raw** URL:
```
https://raw.githubusercontent.com/ORGANIZATION/keepnet-docs/BRANCH/openapi/keepnet-api-spec.json
```
The enriched spec should include **minimal search bodies**: explicit `orderBy`, `ascending`, and a **non-null `filter`** (`Condition` + `SearchInputTextValue: ""`), not `filter: null` or null-heavy nested filters. Click **Check for updates**.

## Do not use the live Swagger URL for GitBook (for now)

[Swagger UI](https://api.keepnetlabs.com/docs/index.html) loads **`https://api.keepnetlabs.com/swagger/v1/swagger.json`**. That response is **not valid JSON** in current environments (e.g. broken `example` values such as `"enrollmentPayload":}`, and the document does not parse with `JSON.parse`). **GitBook OpenAPI** must **not** use that URL as the spec source.

**Use instead:** this repo’s enriched file — **GitHub raw** or upload **`.gitbook/assets/keepnet-api-spec.json`** after running the enrich script (see below).

## Updating the Spec

When the API changes, you need a **valid** OpenAPI JSON (from Keepnet once the live spec is fixed, or an internal export). Then enrich:

```bash
# If https://api.keepnetlabs.com/swagger/v1/swagger.json parses again:
node scripts/enrich-openapi-spec.mjs openapi/keepnet-api-spec.json

# Until then — refresh from the last good file in the repo (re-applies examples/tags):
node scripts/enrich-openapi-spec.mjs --from=.gitbook/assets/keepnet-api-spec.json .gitbook/assets/keepnet-api-spec.json
cp .gitbook/assets/keepnet-api-spec.json openapi/keepnet-api-spec.json   # optional: sync copy under openapi/
```

Validate:

```bash
node scripts/validate-spec.mjs .gitbook/assets/keepnet-api-spec.json
```

## API Reference menu structure

From **SUMMARY.md** (sidebar in GitBook). The **Endpoints** node is filled by the OpenAPI integration; the rest are static pages.

```
🔌 API REFERENCE
├── Quickstart
├── Use the API with AI assistants (MCP)
│
├── Reseller
│   ├── Companies
│   │   ├── Scope API requests to a customer
│   │   ├── List companies with license details
│   │   ├── Create a company
│   │   ├── Get a company
│   │   ├── Update a company
│   │   ├── Delete a company
│   │   └── List and manage company groups
│   │
│   ├── Users & groups
│   │   ├── Add target users for a customer
│   │   ├── List or export target users for a customer
│   │   ├── List and create target groups for a customer
│   │   ├── Add system user for a customer
│   │   └── Set up SCIM for a customer
│   │
│   ├── Training
│   │   ├── View customer's enrollment list and report
│   │   ├── View customer's enrollment sending, certificates, and notifications
│   │   └── Pull survey results for a customer
│   │
│   ├── Phishing simulation
│   │   ├── View customer's campaign list and report
│   │   ├── List phishing scenarios for a customer
│   │   └── Create and start phishing campaign for a customer
│   │
│   ├── Reports
│   │   ├── Pull executive report data for a customer
│   │   ├── Pull gamification report data for a customer
│   │   ├── Export gamification leaderboard for a customer
│   │   └── List scheduled reports for a customer
│   │
│   └── Billing
│       ├── Export customer list for billing
│       ├── List customers exceeding license limit
│       ├── List companies for cross-sell by license and usage
│       ├── List recently created companies
│       ├── Get total monthly user count across customers
│       ├── List customers with renewals in the next N days
│       └── List customers with expired licenses
│
└── Endpoints  ← from OpenAPI spec (builtin), expands when clicked
    ├── Account
    ├── PhishingCampaign
    ├── Training
    └── ... (all API tags from keepnet-api-spec.json)
```
