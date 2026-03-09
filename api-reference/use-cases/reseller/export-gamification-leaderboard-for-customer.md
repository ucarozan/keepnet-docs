# Export gamification leaderboard for a customer

As a Reseller you export the gamification leaderboard or user timeline for a customer to CSV or Excel for reporting, MSSP dashboards, or audits. Use a credential with Client Role = **Reseller**. Send **`X-KEEPNET-Company-Id`** so the export is scoped to that company.

***

## POST /api/companies/search

> Use this to get the customer's Company ID; use the `resourceId` as `X-KEEPNET-Company-Id` in the export requests below. Retrieves a paginated list of companies you manage. **Test it:** Authorize with Client ID/Secret, then Send.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/companies/search" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

***

## POST /api/leaderboard/get-all/export

Exports the full leaderboard for the customer to a file (e.g. CSV or Excel). Send **`X-KEEPNET-Company-Id`**. Request body: see Endpoints → **Leaderboard** (e.g. `LeaderboardSearchExportRequestParameter` — date range, export format).

> Export leaderboard performance. As a Reseller, send **`X-KEEPNET-Company-Id: <companyResourceId>`**.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/leaderboard/get-all/export" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

***

## POST /api/leaderboard/get-user-timeline/export

Exports user timeline data for the customer to a file. Send **`X-KEEPNET-Company-Id`**. Request body: see Endpoints → **Leaderboard** (e.g. `LeaderboardUserTimelineExportRequestParameter`).

> Export user timeline. As a Reseller, send **`X-KEEPNET-Company-Id: <companyResourceId>`**.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/leaderboard/get-user-timeline/export" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

***

## Common errors

* **403 Forbidden** — Credential is not Reseller, or the Company ID is not one you manage. Set Client Role = **Reseller**. [Roles and permissions →](../../../next-generation-product/platform/company/system-users/user-roles.md)
* **401 Unauthorized** — Missing or invalid token. Request a new token via `POST /connect/token`.
* **400 Bad Request** — Invalid request body or export format. Check Endpoints → **Leaderboard** for the export request schema.

**Related:** [Pull gamification report data for a customer →](pull-gamification-report-data-for-customer.md). [Export customer list for billing →](export-customer-list-for-billing.md). [Scope API requests to a customer →](scope-api-requests-to-customer.md).
