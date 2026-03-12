---
description: "Learn about List and create target groups for a customer in Keepnet Labs human risk management documentation."
---

# List and create target groups for a customer

As a Reseller you can list and create target groups (user groups used for campaigns and training) for a customer. Get the customer's Company ID, then call the target-groups endpoints with **`X-KEEPNET-Company-Id`** so groups are scoped to that company. Use a credential with Client Role = **Reseller**.

***

## POST /api/companies/search

Get the customer's Company ID. Use the `resourceId` of the desired company in the next steps.

> Retrieves a paginated list of all companies you manage with license details. Each item includes `resourceId` — use it as the Company ID for scoped requests. **Test it:** Authorize with Client ID/Secret, then Send — request body is pre-filled.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/companies/search" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

From the response, pick the company and note its `resourceId`. Example: `"resourceId": "xC5kfGz7w2Nz"` → use as `X-KEEPNET-Company-Id` in the target-group requests below.

***

## GET /api/target-groups

Returns all target groups for that customer (no pagination). Send **`X-KEEPNET-Company-Id`**.

> Retrieves a list of target groups. As a Reseller, send **`X-KEEPNET-Company-Id: <companyResourceId>`**.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/target-groups" method="get" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

***

## POST /api/target-groups/search

Returns a paginated, filterable list of target groups for that customer. Send **`X-KEEPNET-Company-Id`**.

> Returns a list of target groups. As a Reseller, send **`X-KEEPNET-Company-Id: <companyResourceId>`**. Request body: optional `filter`, `pageNumber`, `pageSize`, `orderBy`, `ascending`. **Test it:** Endpoints → **TargetGroup** — use dummy data (H8d) and set the header to a Company ID from companies/search.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/target-groups/search" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

***

## POST /api/target-groups

Creates a new target group for that customer. Send **`X-KEEPNET-Company-Id`**. Request body: `name` and optional fields (see Endpoints → **TargetGroup**).

> Creates a new target group. As a Reseller, send **`X-KEEPNET-Company-Id: <companyResourceId>`**. **Test it:** Endpoints → **TargetGroup** → **Creates a new target group** — use dummy name (H8d) and set the header to a Company ID from companies/search.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/target-groups" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

***

## Common errors

* **403 Forbidden** — Credential is not Reseller, or the Company ID is not one you manage. Set Client Role = **Reseller**. [Roles and permissions →](../../../next-generation-product/platform/company/system-users/user-roles.md)
* **401 Unauthorized** — Missing or invalid token. Request a new token via `POST /connect/token`.
* **404 Not Found** / **400 Bad Request** — Invalid Company ID or missing required body fields. Verify Company ID from `POST /api/companies/search` and check Endpoints → **TargetGroup** for the request schema.

**Related:** [Scope API requests to a customer →](scope-api-requests-to-customer.md). [Add target users for a customer →](add-target-users-for-customer.md). [List or export target users for a customer →](list-or-export-target-users-for-customer.md).
