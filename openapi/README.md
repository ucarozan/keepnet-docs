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

## Expected Menu Structure

```
API REFERENCE
├── Overview
├── Quickstart
├── Authenticate your requests
├── Reseller
├── Reports
├── Company & Users
└── Endpoints  ← Expands when clicked
    ├── Account
    ├── PhishingCampaign
    ├── Training
    └── ... (98 tags)
```
