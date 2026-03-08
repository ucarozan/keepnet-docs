# Export gamification leaderboard for a customer

As a Reseller you export the gamification leaderboard or user timeline for a customer to CSV or Excel for reporting, MSSP dashboards, or audits. Use a credential with Client Role = **Reseller**. Send **`X-KEEPNET-Company-Id`** so the export is scoped to that company.

---

## POST /api/companies/search

Get the customer's Company ID. Use the `resourceId` as `X-KEEPNET-Company-Id` in the export requests below.

> Retrieves a paginated list of companies you manage. **Test it:** Authorize with Client ID/Secret, then Send.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/companies/search" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## POST /api/leaderboard/get-all/export

Exports the full leaderboard for the customer to a file (e.g. CSV or Excel). Send **`X-KEEPNET-Company-Id`**. Request body: see Endpoints → **Leaderboard** (e.g. `LeaderboardSearchExportRequestParameter` — date range, export format).

> Export leaderboard performance. As a Reseller, send **`X-KEEPNET-Company-Id: <companyResourceId>`**.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/leaderboard/get-all/export" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## POST /api/leaderboard/get-user-timeline/export

Exports user timeline data for the customer to a file. Send **`X-KEEPNET-Company-Id`**. Request body: see Endpoints → **Leaderboard** (e.g. `LeaderboardUserTimelineExportRequestParameter`).

> Export user timeline. As a Reseller, send **`X-KEEPNET-Company-Id: <companyResourceId>`**.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/leaderboard/get-user-timeline/export" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## Common errors

* **403 Forbidden** — Credential is not Reseller, or the Company ID is not one you manage. Set Client Role = **Reseller**. <a href="../../../next-generation-product/platform/company/system-users/user-roles.md" target="_blank" rel="noopener noreferrer">Roles and permissions →</a>
* **401 Unauthorized** — Missing or invalid token. Request a new token via `POST /connect/token`.
* **400 Bad Request** — Invalid request body or export format. Check Endpoints → **Leaderboard** for the export request schema.

**Related:** <a href="pull-gamification-report-data-for-customer.md" target="_blank" rel="noopener noreferrer">Pull gamification report data for a customer →</a>. <a href="export-customer-list-for-billing.md" target="_blank" rel="noopener noreferrer">Export customer list for billing →</a>. <a href="scope-api-requests-to-customer.md" target="_blank" rel="noopener noreferrer">Scope API requests to a customer →</a>.
