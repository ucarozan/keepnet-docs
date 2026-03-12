# Export customer list for billing

As a Reseller you can export the list of companies you manage to CSV or Excel for billing, MSSP reporting, license reconciliation, or partner dashboards. Use a credential with Client Role = **Reseller**. Same endpoint as the export in [List companies with license details →](list-companies-with-license-details.md); this page focuses on billing and export use cases.

***

## POST /api/companies/search/export

> Exports the list of companies (with license details) to CSV or Excel. **Test it:** Authorize with Client ID/Secret, then Send — request body is pre-filled (minimal pagination + `exportType: Csv`). Use `exportType: "Excel"` for Excel output.

{% hint style="info" %}
**Automation tools:** Send a non-empty request body (`pageNumber`, `pageSize`, `orderBy`, `ascending`, `filter`, `exportType`). Empty body can cause errors. See [Quickstart → Integration and automation](../quickstart.md#integration-and-automation) and [List companies with license details →](list-companies-with-license-details.md).
{% endhint %}

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/companies/search/export" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

***

## Common errors

* **403 Forbidden** — Credential is not Reseller. Set Client Role = **Reseller** in **Company → Company Settings → REST API**. [Roles and permissions →](../../../next-generation-product/platform/company/system-users/user-roles.md)
* **401 Unauthorized** — Missing or invalid token. Request a new token via `POST /connect/token`.
* **400 Bad Request** — Invalid request body. Use minimal body: `pageNumber`, `pageSize`, `orderBy`, `ascending`, `exportType` (e.g. `Csv`).

**Related:** Paginated list without file download: [List companies with license details →](list-companies-with-license-details.md). [Scope API requests to a customer →](scope-api-requests-to-customer.md).
