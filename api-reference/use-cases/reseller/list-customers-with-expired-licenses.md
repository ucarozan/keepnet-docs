---
description: "Learn about List customers with expired licenses in Keepnet Labs human risk management documentation."
---

# List customers with expired licenses

As a Reseller you list or export companies whose license renewal date is in the past (expired licenses) for compliance, renewal campaigns, or billing cleanup. Use a credential with Client Role = **Reseller**. Call company search with a **`filter`** on renewal date (e.g. renewal date before today) if the API supports it; otherwise export the full list and filter by the renewal date column client-side. Request body: see Endpoints → **Company** for filter structure and supported fields.

***

## POST /api/companies/search

Returns a paginated list of companies. Use **`filter`** to restrict results to companies whose **renewal date** is before today (expired). If the API supports a renewal-date filter, set it accordingly; otherwise use **`orderBy: "RenewalDate"`** and **`ascending: true`** and paginate or export, then filter client-side to keep only renewal date < today.

> Retrieves a list of all companies. Use filter on renewal date to list only customers with expired licenses (renewal date in the past).

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/companies/search" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

***

## POST /api/companies/search/export

Exports the company list to CSV or Excel. Apply the same filter as in search so the file contains only expired-license customers, or export all and filter by renewal date in your spreadsheet.

> Exports the list of companies to CSV or Excel. Use the same filter as in search to export only customers with expired licenses.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/companies/search/export" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

***

## Common errors

* **403 Forbidden** — Credential is not Reseller. Set Client Role = **Reseller** in **Company → Company Settings → REST API**. [Roles and permissions →](../../../next-generation-product/platform/company/system-users/user-roles.md)
* **401 Unauthorized** — Missing or invalid token. Request a new token via `POST /connect/token`.
* **400 Bad Request** — Invalid request body or filter. Include `pageNumber`, `pageSize`, `orderBy`, `ascending`; check Endpoints → **Company** for renewal-date filter syntax.

**Related:** [List customers with renewals in the next N days →](list-customers-with-renewals-in-next-n-days.md). [List companies with license details →](list-companies-with-license-details.md). [Export customer list for billing →](export-customer-list-for-billing.md). [Scope API requests to a customer →](scope-api-requests-to-customer.md).
