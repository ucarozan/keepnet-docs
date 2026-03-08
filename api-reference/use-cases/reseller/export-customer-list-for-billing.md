# Export customer list for billing

Export the list of companies you manage to CSV or Excel for billing, MSSP reporting, license reconciliation, or partner dashboards. Reseller-only — use a credential with Client Role = **Reseller**. Same endpoint as the export in <a href="list-companies-with-license-details.md" target="_blank" rel="noopener noreferrer">List companies with license details →</a>; this page focuses on billing and export use cases.

---

## POST /api/companies/search/export

> Exports the list of companies (with license details) to CSV or Excel. **Test it:** Authorize with Client ID/Secret, then Send — request body is pre-filled (minimal pagination + `exportType: Csv`). Use `exportType: "Excel"` for Excel output.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/companies/search/export" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## Common errors

* **403 Forbidden** — Credential is not Reseller. Set Client Role = **Reseller** in **Company → Company Settings → REST API**.
* **401 Unauthorized** — Missing or invalid token. Request a new token via `POST /connect/token`.
* **400 Bad Request** — Invalid request body. Use minimal body: `pageNumber`, `pageSize`, `orderBy`, `ascending`, `exportType` (e.g. `Csv`).

**Related:** Paginated list without file download: <a href="list-companies-with-license-details.md" target="_blank" rel="noopener noreferrer">List companies with license details →</a>. MSSP billing report data: <a href="../reports/mssp-billing-report.md" target="_blank" rel="noopener noreferrer">Pull MSSP Billing Report →</a>.
