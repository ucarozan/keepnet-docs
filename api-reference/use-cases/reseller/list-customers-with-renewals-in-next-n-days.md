---
description: "Learn about List customers with renewals in the next N days in Keepnet Labs human risk management documentation."
---

# List customers with renewals in the next N days

As a Reseller you list or export companies whose license renewal date falls within the next N days (e.g. 90 days) for renewal forecasting and sales follow-up. Use a credential with Client Role = **Reseller**. Call company search with a **`filter`** on renewal date (e.g. renewal date between today and today + N days) if the API supports it; otherwise export the full list and filter by the renewal date column client-side. Request body: see Endpoints → **Company** for filter structure and supported fields.

***

## POST /api/companies/search

Returns a paginated list of companies. Use **`filter`** to restrict results to companies whose **renewal date** is within the next N days (e.g. next 90 days). If the API supports a renewal-date filter, set the filter accordingly; otherwise use **`orderBy: "RenewalDate"`** and **`ascending: true`** and paginate to get upcoming renewals first, then filter client-side by date range.

> Retrieves a list of all companies. Use filter on renewal date (or orderBy RenewalDate) to list customers with renewals in the next N days.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/companies/search" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

***

## POST /api/companies/search/export

Exports the company list to CSV or Excel. Apply the same filter (or orderBy) as in search so the file contains only companies with renewals in the target window, or export all and filter by the renewal date column in your spreadsheet.

> Exports the list of companies to CSV or Excel. Use the same filter or orderBy as in search to export only customers with upcoming renewals.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/companies/search/export" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

***

## Common errors

* **403 Forbidden** — Credential is not Reseller. Set Client Role = **Reseller** in **Company → Company Settings → REST API**. [Roles and permissions →](../../../next-generation-product/platform/company/system-users/user-roles.md)
* **401 Unauthorized** — Missing or invalid token. Request a new token via `POST /connect/token`.
* **400 Bad Request** — Invalid request body or filter. Include `pageNumber`, `pageSize`, `orderBy`, `ascending`; check Endpoints → **Company** for renewal-date filter syntax.

**Related:** [List companies with license details →](list-companies-with-license-details.md). [List customers with expired licenses →](list-customers-with-expired-licenses.md). [Export customer list for billing →](export-customer-list-for-billing.md). [Scope API requests to a customer →](scope-api-requests-to-customer.md).
