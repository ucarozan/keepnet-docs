---
description: "Learn about List scheduled reports for a customer in Keepnet Labs human risk management documentation."
---

# List scheduled reports for a customer

As a Reseller you list scheduled executive reports configured for a customer — schedule name, frequency, report name, next send date, status — for audit or reporting on automated report delivery. Use a credential with Client Role = **Reseller**. When the API provides a dedicated scheduled-report endpoint, send **`X-KEEPNET-Company-Id`** to scope results to that customer.

---

## When the endpoint is available

When a dedicated scheduled-report list or search endpoint is added to the API, use it with **`X-KEEPNET-Company-Id: <companyResourceId>`** in the header. Request body: pagination (e.g. `pageNumber`, `pageSize`) and optional filters. See **Endpoints** in the API Reference sidebar for **ScheduledReport** or **ExecutiveReport** when available.

{% hint style="info" %}
**Platform UI:** Scheduled reports are configured under **Reports → Scheduled Reports**. <a href="../../../next-generation-product/platform/reports/scheduled-reports.md" target="_blank" rel="noopener noreferrer">Scheduled Reports →</a>
{% endhint %}

---

## Common errors

* **403 Forbidden** — Credential is not Reseller, or the Company ID is not one you manage. Set Client Role = **Reseller**.
* **401 Unauthorized** — Missing or invalid token. Request a new token via `POST /connect/token`.

**Related:** <a href="pull-executive-report-data-for-customer.md" target="_blank" rel="noopener noreferrer">Pull executive report data for a customer →</a>. <a href="scope-api-requests-to-customer.md" target="_blank" rel="noopener noreferrer">Scope API requests to a customer →</a>.
