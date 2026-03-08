# Add target users for a customer

Get a customer’s Company ID from the companies list, then add target users for that company by sending the Company ID in the request. Reseller-only — use a credential with Client Role = **Reseller**. This use-case ties together listing companies and scoping the target-users API to one customer.

---

## POST /api/companies/search

Get the customer’s Company ID by calling this endpoint; use the `resourceId` of the desired company in the next step.

> Retrieves a paginated list of all companies you manage with license details. Each item includes `resourceId` — use it as the Company ID for scoped requests. **Test it:** Authorize with Client ID/Secret, then Send — request body is pre-filled.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/companies/search" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

From the response, pick the company (e.g. by `name`) and note its `resourceId`. Example: `"resourceId": "xC5kfGz7w2Nz"` → use `xC5kfGz7w2Nz` as Company ID when calling `POST /api/target-users`.

---

## POST /api/target-users

Add target users for that company by sending the Company ID in the **`X-KEEPNET-Company-Id`** header. Without it, the user may be created in the wrong context or the request may fail.

> Creates a new target user. As a Reseller, send **`X-KEEPNET-Company-Id: <companyResourceId>`** with the customer’s Company ID from the companies search response. Body: `email`, `firstName`, `lastName`, and optional fields (e.g. `department`). **Test it:** Endpoints → **TargetUser** → **Creates a new target user** — use dummy data (H8d) and set the header to a Company ID from companies/search.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/target-users" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

Example request headers:

```http
Authorization: Bearer <your_access_token>
Content-Type: application/json
X-KEEPNET-Company-Id: xC5kfGz7w2Nz
```

Example body (dummy data):

```json
{
  "email": "user@example.com",
  "firstName": "Jane",
  "lastName": "Doe"
}
```

---

## Common errors

* **403 Forbidden** — Credential is not Reseller, or the Company ID is not one you manage. Set Client Role = **Reseller**. <a href="../../../next-generation-product/platform/company/system-users/user-roles.md" target="_blank" rel="noopener noreferrer">Roles and permissions →</a>
* **401 Unauthorized** — Missing or invalid token. Request a new token via `POST /connect/token`.
* **404 Not Found** / **400 Bad Request** — Invalid Company ID or missing required body fields. Verify Company ID from `POST /api/companies/search` and check Endpoints → **TargetUser** for the request body schema.

**Related:** <a href="scope-api-requests-to-customer.md" target="_blank" rel="noopener noreferrer">Scope API requests to a customer →</a> for how Company ID is used across endpoints. <a href="../company-users/add-target-users.md" target="_blank" rel="noopener noreferrer">Add target users →</a> (Company & Users) for the full target-users API without Reseller focus.
