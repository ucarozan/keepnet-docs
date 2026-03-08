# List and create target groups for a customer

As a Reseller you can list and create target groups (user groups used for campaigns and training) for a customer. Get the customer's Company ID, then call the target-groups endpoints with **`X-KEEPNET-Company-Id`** so groups are scoped to that company. Use a credential with Client Role = **Reseller**.

---

## POST /api/companies/search

Get the customer's Company ID. Use the `resourceId` of the desired company in the next steps.

> Retrieves a paginated list of all companies you manage with license details. Each item includes `resourceId` — use it as the Company ID for scoped requests. **Test it:** Authorize with Client ID/Secret, then Send — request body is pre-filled.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/companies/search" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

From the response, pick the company and note its `resourceId`. Example: `"resourceId": "xC5kfGz7w2Nz"` → use as `X-KEEPNET-Company-Id` in the target-group requests below.

---

## GET /api/target-groups

Returns all target groups for that customer (no pagination). Send **`X-KEEPNET-Company-Id`**.

> Retrieves a list of target groups. As a Reseller, send **`X-KEEPNET-Company-Id: <companyResourceId>`**.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/target-groups" method="get" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## POST /api/target-groups/search

Returns a paginated, filterable list of target groups for that customer. Send **`X-KEEPNET-Company-Id`**.

> Returns a list of target groups. As a Reseller, send **`X-KEEPNET-Company-Id: <companyResourceId>`**. Request body: optional `filter`, `pageNumber`, `pageSize`, `orderBy`, `ascending`. **Test it:** Endpoints → **TargetGroup** — use dummy data (H8d) and set the header to a Company ID from companies/search.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/target-groups/search" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## POST /api/target-groups

Creates a new target group for that customer. Send **`X-KEEPNET-Company-Id`**. Request body: `name` and optional fields (see Endpoints → **TargetGroup**).

> Creates a new target group. As a Reseller, send **`X-KEEPNET-Company-Id: <companyResourceId>`**. **Test it:** Endpoints → **TargetGroup** → **Creates a new target group** — use dummy name (H8d) and set the header to a Company ID from companies/search.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/target-groups" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## Common errors

* **403 Forbidden** — Credential is not Reseller, or the Company ID is not one you manage. Set Client Role = **Reseller**. <a href="../../../next-generation-product/platform/company/system-users/user-roles.md" target="_blank" rel="noopener noreferrer">Roles and permissions →</a>
* **401 Unauthorized** — Missing or invalid token. Request a new token via `POST /connect/token`.
* **404 Not Found** / **400 Bad Request** — Invalid Company ID or missing required body fields. Verify Company ID from `POST /api/companies/search` and check Endpoints → **TargetGroup** for the request schema.

**Related:** <a href="scope-api-requests-to-customer.md" target="_blank" rel="noopener noreferrer">Scope API requests to a customer →</a>. <a href="add-target-users-for-customer.md" target="_blank" rel="noopener noreferrer">Add target users for a customer →</a>. <a href="list-or-export-target-users-for-customer.md" target="_blank" rel="noopener noreferrer">List or export target users for a customer →</a>.
