# List companies with license details

Retrieve all companies you manage with license information: License Type, Target Users, Monthly Users, License Limit, Renewal Date. Reseller-only — use a credential with Client Role = **Reseller**. Use this list to get Company IDs for scoped API calls and for export to CSV/Excel.

***

## POST /api/companies/search

> Retrieves a paginated, filterable, sortable list of all companies with license details. **Test it:** Authorize with Client ID/Secret, then Send — request body is pre-filled (`pageNumber: 1`, `pageSize: 10`, `orderBy: CreateTime`).

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/companies/search" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

***

## POST /api/companies/search/export

> Exports the same list to CSV or Excel for reporting or billing. **Test it:** Authorize with Client ID/Secret, then Send — request body is pre-filled (minimal pagination + `exportType: Csv`).

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/companies/search/export" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

***

## Common errors

* **403 Forbidden** — Credential is not Reseller. Set Client Role = **Reseller** in **Company → Company Settings → REST API**.
* **401 Unauthorized** — Missing or invalid token. Request a new token via `POST /connect/token`.
* **400 Bad Request** — Invalid request body (e.g. missing `orderBy`). Include `pageNumber`, `pageSize`, `orderBy`, `ascending`, `filter`.

{% hint style="info" %}
**Platform UI:** View and manage companies in **Company → Companies**. For billing export, see [Export customer list for billing →](export-customer-list-for-billing.md). [Companies →](../../../next-generation-product/platform/company/companies/)
{% endhint %}
