# List or export target users for a customer (Reseller)

As a Reseller you can list or export a customer’s target users (learners) scoped to that company. Get the customer’s Company ID, then call the target-user search and export endpoints with **`X-KEEPNET-Company-Id`** so results are limited to that customer. Use a credential with Client Role = **Reseller**.

---

## POST /api/companies/search

Get the customer’s Company ID. Use the `resourceId` of the desired company in the next steps.

> Retrieves a paginated list of all companies you manage with license details. Each item includes `resourceId` — use it as the Company ID for scoped requests. **Test it:** Authorize with Client ID/Secret, then Send — request body is pre-filled.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/companies/search" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

From the response, pick the company (e.g. by `name`) and note its `resourceId`. Example: `"resourceId": "xC5kfGz7w2Nz"` → use `xC5kfGz7w2Nz` as Company ID in the target-user requests below.

---

## POST /api/target-users/search

Returns a paginated list of target users for that customer. Send the Company ID in the **`X-KEEPNET-Company-Id`** header so the list is scoped to the chosen company. Response includes user `resourceId`, email, name, department, status, and other fields.

> Returns a list of the target user. As a Reseller, send **`X-KEEPNET-Company-Id: <companyResourceId>`** with the customer’s Company ID. Request body: optional `filter`, `pageNumber`, `pageSize`, `orderBy`, `ascending`, `newVersion`. **Test it:** Endpoints → **TargetUser** → **Returns a list of the target user** — use dummy data (H8d) and set the header to a Company ID from companies/search.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/target-users/search" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

Example request headers:

```http
Authorization: Bearer <your_access_token>
Content-Type: application/json
X-KEEPNET-Company-Id: xC5kfGz7w2Nz
```

Example body (dummy data — first page):

```json
{
  "pageNumber": 1,
  "pageSize": 20
}
```

---

## POST /api/target-users/search/export

Exports the target user list (e.g. CSV/Excel) for that customer. Send the same **`X-KEEPNET-Company-Id`** header. Request body schema (filter, exportType, etc.) is in Endpoints → **TargetUser** → **Exports the list of target users**.

> Exports the list of target users. As a Reseller, send **`X-KEEPNET-Company-Id: <companyResourceId>`** so the export is scoped to the chosen customer.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/target-users/search/export" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## Optional: count summary

**GET /api/target-users/count-summary** returns counts (active, inactive, deleted, monthly active users). As a Reseller, send **`X-KEEPNET-Company-Id`** to get the summary for one customer. See Endpoints → **TargetUser** for parameters.

---

## Common errors

* **403 Forbidden** — Credential is not Reseller, or the Company ID is not one you manage. Set Client Role = **Reseller**. <a href="../../../next-generation-product/platform/company/system-users/user-roles.md" target="_blank" rel="noopener noreferrer">Roles and permissions →</a>
* **401 Unauthorized** — Missing or invalid token. Request a new token via `POST /connect/token`.
* **404 Not Found** / **400 Bad Request** — Invalid Company ID. Verify Company ID from `POST /api/companies/search` and ensure you send `X-KEEPNET-Company-Id` for the customer.

**Related:** <a href="scope-api-requests-to-customer.md" target="_blank" rel="noopener noreferrer">Scope API requests to a customer (Reseller) →</a>. <a href="add-target-users-for-customer.md" target="_blank" rel="noopener noreferrer">Add target users for a customer (Reseller) →</a> to create users for that company. <a href="../company-users/add-target-users.md" target="_blank" rel="noopener noreferrer">Add target users →</a> (Company & Users, generic).