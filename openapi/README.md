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
The enriched spec includes a minimal body (`pageNumber`, `pageSize`, `orderBy`, `filter: null`). Click **Check for updates**.

## Updating the Spec

When the API changes, regenerate the spec. From the repo root:

```bash
node scripts/enrich-openapi-spec.mjs openapi/keepnet-api-spec.json
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
│   │   └── View customer's enrollment sending, certificates, and notifications
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
│       └── Export customer list for billing
│
└── Endpoints  ← from OpenAPI spec (builtin), expands when clicked
    ├── Account
    ├── PhishingCampaign
    ├── Training
    └── ... (all API tags from keepnet-api-spec.json)
```
