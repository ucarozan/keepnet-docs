# List scheduled reports for a customer

As a Reseller you list scheduled executive reports configured for a customer — schedule name, frequency, report name, next send date, status — so you can audit or report on automated report delivery. Use a credential with Client Role = **Reseller**. When the API provides an endpoint for scheduled reports, send **`X-KEEPNET-Company-Id`** to scope results to that customer.

---

## Prerequisites

* Company ID from `POST /api/companies/search` (use `resourceId` as `X-KEEPNET-Company-Id`).
* Credential with Client Role = **Reseller**.

---

## Endpoint (when available)

When a dedicated scheduled-report list or search endpoint is added to the API, use it with:

* **Header:** `X-KEEPNET-Company-Id: <companyResourceId>`
* **Request body:** Pagination (e.g. `pageNumber`, `pageSize`) and optional filters. See **Endpoints** in the API Reference sidebar for **ScheduledReport** or **ExecutiveReport** when available.

{% hint style="info" %}
**Platform UI:** Scheduled reports are configured under **Advanced Report → Scheduled Reports**. <a href="../../../next-generation-product/platform/reports/scheduled-reports.md" target="_blank" rel="noopener noreferrer">Scheduled Reports →</a>
{% endhint %}

---

## Common errors

* **403 Forbidden** — Credential is not Reseller, or the Company ID is not one you manage.
* **401 Unauthorized** — Missing or invalid token.

**Related:** <a href="pull-executive-report-data-for-customer.md" target="_blank" rel="noopener noreferrer">Pull executive report data for a customer →</a>. <a href="scope-api-requests-to-customer.md" target="_blank" rel="noopener noreferrer">Scope API requests to a customer →</a>.
