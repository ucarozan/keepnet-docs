# List recently created companies

As a Reseller you list or count companies created in a recent period for billing, onboarding reports, or growth metrics. Use a credential with Client Role = **Reseller**. Call company search with **`orderBy: "CreateTime"`** and **`ascending: false`** to get newest first; use **`filter`** with a date range on creation date if the API supports it. Total count is in the response or sum across pages.

---

## POST /api/companies/search

Returns a paginated list of companies. Set **`orderBy: "CreateTime"`** and **`ascending: false`** to list newest companies first. Optionally use **`filter`** to restrict by creation date range (see Endpoints → **Company** for supported filter fields). The response total count gives the number of companies matching the criteria; paginate through all pages if you need a full list or count for a period.

> Retrieves a list of all companies. Use orderBy CreateTime and ascending false to list recently created companies first; use filter for a date range if supported.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/companies/search" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## POST /api/companies/search/export

Exports the company list to CSV or Excel with the same order and filter. Use this to get all recently created companies in one file and compute counts or dates client-side.

> Exports the list of companies to CSV or Excel. Use the same orderBy and filter as in search to export recently created companies.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/companies/search/export" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## Common errors

* **403 Forbidden** — Credential is not Reseller. Set Client Role = **Reseller** in **Company → Company Settings → REST API**. <a href="../../../next-generation-product/platform/company/system-users/user-roles.md" target="_blank" rel="noopener noreferrer">Roles and permissions →</a>
* **401 Unauthorized** — Missing or invalid token. Request a new token via `POST /connect/token`.
* **400 Bad Request** — Invalid request body. Include `pageNumber`, `pageSize`, `orderBy: "CreateTime"`, `ascending: false`; use `filter: null` or a valid filter structure.

**Related:** <a href="list-companies-with-license-details.md" target="_blank" rel="noopener noreferrer">List companies with license details →</a>. <a href="export-customer-list-for-billing.md" target="_blank" rel="noopener noreferrer">Export customer list for billing →</a>. <a href="scope-api-requests-to-customer.md" target="_blank" rel="noopener noreferrer">Scope API requests to a customer →</a>.
