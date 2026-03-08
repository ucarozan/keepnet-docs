# Export customer list for billing

Export the list of companies you manage to CSV or Excel for billing, MSSP reporting, or license reconciliation. Reseller-only — use a credential with Client Role = **Reseller**.

---

## POST /api/companies/search/export

> Exports the list of companies (with license details) to CSV or Excel. **Test it:** Authorize with Client ID/Secret, then Send — request body is pre-filled (minimal pagination + `exportType: Csv`).

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/companies/search/export" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## Common errors

* **403 Forbidden** — Credential is not Reseller. Set Client Role = **Reseller** in **Company → Company Settings → REST API**.
* **401 Unauthorized** — Missing or invalid token. Request a new token via `POST /connect/token`.
* **400 Bad Request** — Invalid request body. Use minimal body: `pageNumber`, `pageSize`, `orderBy`, `ascending`, `exportType` (e.g. `Csv`).

**Related:** For a paginated list without export, see <a href="list-companies-with-license-details.md" target="_blank" rel="noopener noreferrer">List companies with license details →</a>. For MSSP billing report data, see <a href="../reports/mssp-billing-report.md" target="_blank" rel="noopener noreferrer">Pull MSSP Billing Report →</a>.
