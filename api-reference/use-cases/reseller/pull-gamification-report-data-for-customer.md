# Pull gamification report data for a customer

As a Reseller you can retrieve gamification (leaderboard) data for a customer — top performers, full leaderboard, user performance, and user timeline — scoped by Company ID. Use a credential with Client Role = **Reseller**. Send **`X-KEEPNET-Company-Id`** on each request so data is for that customer.

***

## POST /api/companies/search

> Use this to get the customer's Company ID; use the `resourceId` of the desired company as `X-KEEPNET-Company-Id` in the leaderboard requests below. Retrieves a paginated list of companies you manage with license details. **Test it:** Authorize with Client ID/Secret, then Send — request body is pre-filled.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/companies/search" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

***

## POST /api/leaderboard/get-top-performers

Returns top leaderboard performers for the customer. Send **`X-KEEPNET-Company-Id`**. Request body: see Endpoints → **Leaderboard** (e.g. date range, filters).

> Get top leaderboard performance. As a Reseller, send **`X-KEEPNET-Company-Id: <companyResourceId>`**.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/leaderboard/get-top-performers" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

***

## POST /api/leaderboard/get-all

Returns the full leaderboard for the customer. Send **`X-KEEPNET-Company-Id`**.

> Get all leaderboard performance. As a Reseller, send **`X-KEEPNET-Company-Id: <companyResourceId>`**.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/leaderboard/get-all" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

***

## POST /api/leaderboard/user-performance

Returns detailed performance for selected users in the customer's gamification data. Send **`X-KEEPNET-Company-Id`**.

> Get detailed user performance. As a Reseller, send **`X-KEEPNET-Company-Id: <companyResourceId>`**.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/leaderboard/user-performance" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

***

## POST /api/leaderboard/get-user-timeline

Returns timeline data for leaderboard users. Send **`X-KEEPNET-Company-Id`**.

> Get user timeline for leaderboard. As a Reseller, send **`X-KEEPNET-Company-Id: <companyResourceId>`**.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/leaderboard/get-user-timeline" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

***

## Common errors

* **403 Forbidden** — Credential is not Reseller, or the Company ID is not one you manage. Set Client Role = **Reseller**. [Roles and permissions →](../../../next-generation-product/platform/company/system-users/user-roles.md)
* **401 Unauthorized** — Missing or invalid token. Request a new token via `POST /connect/token`.
* **404 Not Found** / **400 Bad Request** — Invalid Company ID or invalid request body. Verify Company ID from `POST /api/companies/search` and check Endpoints → **Leaderboard** for the request schema.

**Related:** [Pull executive report data for a customer →](pull-executive-report-data-for-customer.md). [Scope API requests to a customer →](scope-api-requests-to-customer.md). [Export gamification leaderboard for a customer →](export-gamification-leaderboard-for-customer.md).
