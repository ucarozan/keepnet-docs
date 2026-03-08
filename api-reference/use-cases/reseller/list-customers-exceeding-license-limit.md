# List customers exceeding license limit

As a Reseller you list or export companies that currently exceed their license limit (more users than the licensed maximum) for billing review, true-up, or compliance. Use a credential with Client Role = **Reseller**. Send **`isTargetUserCountExceededLimit: true`** in the request body so only overage customers are returned.

---

## POST /api/companies/search

Returns a paginated list of companies that exceed their license limit. Include **`isTargetUserCountExceededLimit: true`** in the request body. Use `pageNumber`, `pageSize`, `orderBy` (e.g. `CreateTime`), and `ascending` as needed. Request body: see Endpoints → **Company** → Company search; add `isTargetUserCountExceededLimit: true`.

> Retrieves a list of companies. For billing overage, set **`isTargetUserCountExceededLimit: true`** so only companies over their license limit are returned.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/companies/search" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## POST /api/companies/search/export

Exports the same overage list to CSV or Excel. Include **`isTargetUserCountExceededLimit: true`** in the request body. Use `exportType: "Csv"` or `"Excel"`. Request body: see Endpoints → **Company** → Company search export.

> Exports the list of companies to CSV or Excel. Set **`isTargetUserCountExceededLimit: true`** to export only customers exceeding their license limit.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/companies/search/export" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## Common errors

* **403 Forbidden** — Credential is not Reseller. Set Client Role = **Reseller** in **Company → Company Settings → REST API**. <a href="../../../next-generation-product/platform/company/system-users/user-roles.md" target="_blank" rel="noopener noreferrer">Roles and permissions →</a>
* **401 Unauthorized** — Missing or invalid token. Request a new token via `POST /connect/token`.
* **400 Bad Request** — Invalid request body. Include `pageNumber`, `pageSize`, `orderBy`, `ascending`, and `isTargetUserCountExceededLimit: true`; use `filter: null` if you do not need date or other filters.

{% hint style="info" %}
**Platform UI:** In **Company → Companies**, use the **FILTER EXCEEDING LIMIT** toggle to see the same overage list. <a href="../../../next-generation-product/platform/company/companies/README.md" target="_blank" rel="noopener noreferrer">Companies →</a>
{% endhint %}

**Related:** <a href="export-customer-list-for-billing.md" target="_blank" rel="noopener noreferrer">Export customer list for billing →</a>. <a href="list-companies-with-license-details.md" target="_blank" rel="noopener noreferrer">List companies with license details →</a>. <a href="scope-api-requests-to-customer.md" target="_blank" rel="noopener noreferrer">Scope API requests to a customer →</a>.
