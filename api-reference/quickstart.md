# Quickstart

The Keepnet API lets you automate platform operations: pull reports, manage users, onboard customers, and integrate with SIEM, SOAR, or identity systems.

You can use the Keepnet API to:

* Pull campaign reports (phishing, smishing, quishing, vishing, callback)
* Export training reports, gamification data, and executive summaries
* Add target users and enroll them in training
* List and manage companies (Reseller)
* Export audit logs to SIEM

…and more, all via REST calls with OAuth 2.0 Client Credentials.

---

{% stepper %}
{% step %}

### Getting started

You need a Keepnet platform account with API access. Generate **Client ID** and **Client Secret** from **Company → Company Settings → REST API** before making any API calls.

{% hint style="info" %}
**Platform UI:** Go to **Company → Company Settings → REST API** and click **+ NEW**.
<a href="../next-generation-product/platform/company/company-settings/rest-api.md" target="_blank" rel="noopener noreferrer">REST API Settings →</a>
{% endhint %}

Field|Description
:---|:---
**Name**|A label for this credential set (e.g. `prod-integration`, `siem-connector`)
**Client Role**|`Company Admin` for full access, or a custom role with limited privileges
**IP Restriction**|Optionally restrict access to specific IP addresses
**Status**|Set to `Active`

{% hint style="warning" %}
**The Client Secret is shown only once.** Copy and store it securely immediately after you generate it — it cannot be retrieved later.
{% endhint %}

{% endstep %}

{% step %}

### Request an access token

Keepnet API uses **OAuth 2.0 Client Credentials**. Every request requires a Bearer token in the `Authorization` header.

**Endpoint:** `POST /connect/token`

{% swagger src="../openapi/keepnet-api-spec.json" path="/connect/token" method="post" expanded="true" %}
<a href="../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

{% tabs %}
{% tab title="HTTP" %}
Send a POST request with form-encoded body:

```bash
curl -X POST https://api.keepnetlabs.com/connect/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "client_secret=YOUR_CLIENT_SECRET" \
  -d "scope=api1"
```

Response:

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 3600,
  "token_type": "Bearer",
  "scope": "api1",
  "permissions": ["tags/search|POST", "companies/search|POST", "..."]
}
```

Include `access_token` in every API request as `Authorization: Bearer <token>`. The optional `permissions` array lists endpoints your credential can call (e.g. `companies/search|POST`).
{% endtab %}

{% tab title="JavaScript" %}
```javascript
const response = await fetch('https://api.keepnetlabs.com/connect/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    scope: 'api1',
  }),
});

const { access_token } = await response.json();
// Use: Authorization: Bearer ${access_token}
```
{% endtab %}
{% endtabs %}

{% hint style="success" %}
**Use Authorize to get your token**

1. Open the **Authentication** panel (OAuth2) in the **Endpoints** sidebar.
2. Enter your **Client ID** and **Client Secret**.
3. Click **Authorize** — the token is fetched and applied to all subsequent requests.
{% endhint %}

{% endstep %}

{% step %}

### Make your first API call

Verify your token and company access with `GET /api/companies/my` — returns your company (Company Admin) or companies you manage (Reseller). No request body, no extra parameters.

{% swagger src="../openapi/keepnet-api-spec.json" path="/api/companies/my" method="get" expanded="true" %}
<a href="../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

```bash
curl -X GET "https://api.keepnetlabs.com/api/companies/my" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json"
```

If successful, you'll get `isSuccess: true` and a `data` array with your company details (id, name, etc.). This confirms:
* Token is valid
* Credentials have API access
* You can fetch your own company data

{% endstep %}
{% endstepper %}

---

## Base URL and response format

**Base URL:** `https://api.keepnetlabs.com`

All API responses include an `isSuccess` field. When `isSuccess` is `false`, check the `messages` array for error details.

Field|Type|Description
:---|:---|:---
`isSuccess`|boolean|Indicates whether the request succeeded
`data`|object|Response payload when successful
`messages`|array|Error or validation messages when failed

---

## Common conventions

Convention|Description
:---|:---
**Pagination**|Search endpoints use `pageNumber`, `pageSize`, `orderBy`, `ascending`, `filter` in the request body
**Filter**|Use `filter: null` for no filtering, or a filter object with operators (`eq`, `neq`, `contains`, `gt`, `lt`, etc.)
**Sorting**|`orderBy` is often required — use `CreateTime` for chronological ordering
**Company scope**|Most endpoints require a company context. Company Admin: automatic. Reseller: include Company ID (header/path/query)

---

## What the token contains

The access token is a **JWT**. Decode it to read company context, role, and other values — useful when endpoints require Company ID in the path, header, or query.

**To decode:** Paste the token at [jwt.io](https://jwt.io) (signature verification optional) or Base64URL-decode the middle part (between the two dots).

### Company context

Claim|Description|Example
:---|:---|:---
`user_company_resourceid`|**Company ID** — use in `X-KEEPNET-Company-Id`, path `/api/.../companies/{id}/...`, or `?companyId=`|`xC5kfGz7w2Nz`
`user_company_name`|Company name|`ACME LLC`
`user_company_id`|Numeric company ID|`1`
`user_company_logopath`|Company logo URL|`https://api.keepnetlabs.com/companylogo/...`
`user_company_industry_name`|Industry (e.g. Technology)|`Technology`
`user_company_parentcompany_resourceid`|Parent/MSSP company ID — **Reseller only**, empty for Company Admin|`xC5kfGz7w2Nz` (Reseller) or empty
`user_company_parentcompany_name`|Parent company name — **Reseller only**|`ACME Corp`

### Role and access

Claim|Description|Company Admin|Reseller
:---|:---|:---|:---
`role`|User role|`Company Admin`|`Reseller`
`company_admin_access`|Can manage own company|`true`|`true`
`reseller_access`|Can manage multiple companies|`false`|`true`
`root_access`|Platform root/admin|`false`|`false`
`scope`|API scope|`["api1"]`|`["api1"]`

### Token metadata

Claim|Description|Example
:---|:---|:---
`exp`|Expiry (Unix timestamp)|`1772935488`
`iat`|Issued at (Unix timestamp)|`1772931888`
`client_id`|Client ID used to obtain the token|`R5SS0MCusE2yKD7kbraVTfyfVRKHyLsN`

{% hint style="info" %}
**Company Admin**

* `user_company_resourceid` = your Company ID — use when an endpoint requires a company context (e.g. `GET /api/companies/{resourceId}`)
* `user_company_parentcompany_*` = empty
{% endhint %}

{% hint style="info" %}
**Reseller**

* `user_company_resourceid` = your Reseller company
* `user_company_parentcompany_resourceid` = parent/MSSP company
* Managed company IDs → `POST /api/companies/search` — use those IDs in `X-KEEPNET-Company-Id` for company-scoped requests
{% endhint %}

---

## Who can use the API

Role|Access
:---|:---
**Company Admin**|Full access to your company's data — no Company ID needed
**Reseller**|Cross-company management — list companies, onboard customers, pull reports per company using Company ID
**Custom role**|Scoped to specific products or actions based on role definition

---

## Token expiry and errors

Tokens expire after **1 hour**. No refresh token — request a new one when the current token expires.

HTTP status|Cause|Action
:---|:---|:---
`400 Bad Request` — `invalid_client`|Wrong or placeholder credentials|Use real credentials from **Company → Company Settings → REST API**
`401 Unauthorized`|Missing or invalid token|Re-authenticate and retry
`403 Forbidden`|Insufficient role permissions|Check the Client Role in platform settings
`429 Too Many Requests`|Rate limit exceeded|Back off and retry after a delay

---

## Reseller: scope by Company ID

If your credential has the **Reseller** role, include Company ID when calling company-scoped endpoints:

* **Header:** `X-KEEPNET-Company-Id: {companyId}` (when supported)
* **Path:** `/api/.../companies/{companyId}/...`
* **Query:** `?companyId={companyId}`

Retrieve Company IDs via `POST /api/companies/search`. See <a href="use-cases/reseller/list-companies-with-license-details.md" target="_blank" rel="noopener noreferrer">List companies with license details →</a>.

---

## Keep credentials secure

{% hint style="success" %}
**Do:** Store credentials in environment variables or a secrets manager. Enable IP Restriction if your integration runs from a fixed IP. Use a custom role scoped to only the endpoints you need.
{% endhint %}

{% hint style="danger" %}
**Don't:** Hard-code `client_id` or `client_secret` in source code. Don't commit credentials to version control.
{% endhint %}

---

## Explore the API

What you want to do|Use case
:---|:---
Pull phishing campaign reports|<a href="use-cases/reports/phishing-campaign-reports.md" target="_blank" rel="noopener noreferrer">Pull phishing campaign reports →</a>
List companies (Reseller)|<a href="use-cases/reseller/list-companies-with-license-details.md" target="_blank" rel="noopener noreferrer">List companies with license details →</a>
Export audit logs to SIEM|<a href="use-cases/reports/export-audit-logs-to-siem.md" target="_blank" rel="noopener noreferrer">Export audit logs to SIEM →</a>
Add target users|<a href="use-cases/company-users/add-target-users.md" target="_blank" rel="noopener noreferrer">Add target users →</a>
Enroll users in training|<a href="use-cases/company-users/enroll-users-in-training.md" target="_blank" rel="noopener noreferrer">Enroll users in training →</a>
