# Pull executive report data for a customer

As a Reseller you can search executive reports and retrieve executive report widget data (raw metrics) for a customer. Get the customer's Company ID, then call the executive-report endpoints with **`X-KEEPNET-Company-Id`** so data is scoped to that company. Use a credential with Client Role = **Reseller**.

---

## POST /api/companies/search

Get the customer's Company ID. Use the `resourceId` of the desired company in the next steps.

> Retrieves a paginated list of all companies you manage with license details. Each item includes `resourceId` — use it as the Company ID for scoped requests. **Test it:** Authorize with Client ID/Secret, then Send — request body is pre-filled.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/companies/search" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

From the response, pick the company and note its `resourceId`. Example: `"resourceId": "xC5kfGz7w2Nz"` → use as `X-KEEPNET-Company-Id` in the executive-report requests below.

---

## POST /api/executive-report/search

Returns a list of executive reports for that customer. Send **`X-KEEPNET-Company-Id`**. Request body: see Endpoints → **ExecutiveReport** for the search schema (e.g. filter, date range).

> Search executive report. As a Reseller, send **`X-KEEPNET-Company-Id: <companyResourceId>`**.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/executive-report/search" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## POST /api/executive-report/get-widget-datas

Returns widget data (raw metrics) for executive reports — e.g. phishing, training, high-level KPIs. Send **`X-KEEPNET-Company-Id`** so widget data is for that customer. Request body: see Endpoints → **ExecutiveReport** → **Get widget data list**.

> Get widget data list. As a Reseller, send **`X-KEEPNET-Company-Id: <companyResourceId>`**.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/executive-report/get-widget-datas" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## Common errors

* **403 Forbidden** — Credential is not Reseller, or the Company ID is not one you manage. Set Client Role = **Reseller**. <a href="../../../next-generation-product/platform/company/system-users/user-roles.md" target="_blank" rel="noopener noreferrer">Roles and permissions →</a>
* **401 Unauthorized** — Missing or invalid token. Request a new token via `POST /connect/token`.
* **404 Not Found** / **400 Bad Request** — Invalid Company ID or invalid request body. Verify Company ID from `POST /api/companies/search` and check Endpoints → **ExecutiveReport** for the request schema.

**Related:** <a href="scope-api-requests-to-customer.md" target="_blank" rel="noopener noreferrer">Scope API requests to a customer →</a>. <a href="view-customer-enrollment-list-and-report.md" target="_blank" rel="noopener noreferrer">View customer's enrollment list and report →</a>. <a href="view-customer-simulation-campaign-list-and-report.md" target="_blank" rel="noopener noreferrer">View customer's campaign list and report →</a>.
