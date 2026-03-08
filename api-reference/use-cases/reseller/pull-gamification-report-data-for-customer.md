# Pull gamification report data for a customer

As a Reseller you can retrieve gamification (leaderboard) data for a customer — top performers, full leaderboard, user performance, and user timeline — scoped by Company ID. Use a credential with Client Role = **Reseller**. Send **`X-KEEPNET-Company-Id`** on each request so data is for that customer.

---

## POST /api/companies/search

Get the customer's Company ID. Use the `resourceId` of the desired company as `X-KEEPNET-Company-Id` in the leaderboard requests below.

> Retrieves a paginated list of companies you manage with license details. **Test it:** Authorize with Client ID/Secret, then Send — request body is pre-filled.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/companies/search" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## POST /api/leaderboard/get-top-performers

Returns top leaderboard performers for the customer. Send **`X-KEEPNET-Company-Id`**. Request body: see Endpoints → **Leaderboard** (e.g. date range, filters).

> Get top leaderboard performance. As a Reseller, send **`X-KEEPNET-Company-Id: <companyResourceId>`**.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/leaderboard/get-top-performers" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## POST /api/leaderboard/get-all

Returns the full leaderboard for the customer. Send **`X-KEEPNET-Company-Id`**.

> Get all leaderboard performance. As a Reseller, send **`X-KEEPNET-Company-Id: <companyResourceId>`**.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/leaderboard/get-all" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## POST /api/leaderboard/user-performance

Returns detailed performance for selected users in the customer's gamification data. Send **`X-KEEPNET-Company-Id`**.

> Get detailed user performance. As a Reseller, send **`X-KEEPNET-Company-Id: <companyResourceId>`**.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/leaderboard/user-performance" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## POST /api/leaderboard/get-user-timeline

Returns timeline data for leaderboard users. Send **`X-KEEPNET-Company-Id`**.

> Get user timeline for leaderboard. As a Reseller, send **`X-KEEPNET-Company-Id: <companyResourceId>`**.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/leaderboard/get-user-timeline" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## Common errors

* **403 Forbidden** — Credential is not Reseller, or the Company ID is not one you manage. Set Client Role = **Reseller**. <a href="../../../next-generation-product/platform/company/system-users/user-roles.md" target="_blank" rel="noopener noreferrer">Roles and permissions →</a>
* **401 Unauthorized** — Missing or invalid token. Request a new token via `POST /connect/token`.
* **404 Not Found** / **400 Bad Request** — Invalid Company ID or invalid request body. Verify Company ID from `POST /api/companies/search` and check Endpoints → **Leaderboard** for the request schema.

**Related:** <a href="pull-executive-report-data-for-customer.md" target="_blank" rel="noopener noreferrer">Pull executive report data for a customer →</a>. <a href="scope-api-requests-to-customer.md" target="_blank" rel="noopener noreferrer">Scope API requests to a customer →</a>. <a href="export-gamification-leaderboard-for-customer.md" target="_blank" rel="noopener noreferrer">Export gamification leaderboard for a customer →</a>.
