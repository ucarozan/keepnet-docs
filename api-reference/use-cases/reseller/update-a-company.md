# Update a company

As a Reseller you can update a customer company's details, license (type, target user limit, expiry), or other settings. Get the company's `resourceId` from the companies list, then call **PUT /api/companies/{resourceId}** with the fields you want to change. Use a credential with Client Role = **Reseller**.

***

## POST /api/companies/search

Get the company's `resourceId` by calling this endpoint; use it in the next step as `{resourceId}`.

> Retrieves a paginated list of all companies you manage with license details. Each item includes `resourceId` — use it as the Company ID. **Test it:** Authorize with Client ID/Secret, then Send — request body is pre-filled.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/companies/search" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

From the response, pick the company and note its `resourceId`. Example: `"resourceId": "xC5kfGz7w2Nz"` → use in `PUT /api/companies/xC5kfGz7w2Nz`.

***

## PUT /api/companies/{resourceId}

Updates company details, license (type, target user limit, expiry), or other settings. Replace `{resourceId}` with the company ID. Request body depends on what you change — see Endpoints → **Company** → **Updates a company** for the full schema.

> Updates an existing company. **Test it:** Endpoints → **Company** → **Updates a company** — use dummy/placeholder values (H8d).

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/companies/{resourceId}" method="put" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

***

## Common errors

* **403 Forbidden** — Credential is not Reseller, or company is not one you manage. Set Client Role = **Reseller**. [Roles and permissions →](../../../next-generation-product/platform/company/system-users/user-roles.md)
* **401 Unauthorized** — Missing or invalid token. Request a new token via `POST /connect/token`.
* **404 Not Found** / **400 Bad Request** — Invalid company ID or invalid request body. Verify company ID from `POST /api/companies/search` and check Endpoints → **Company** for the request schema.

**Related:** [Scope API requests to a customer →](scope-api-requests-to-customer.md). [Get a company →](get-a-company.md). To add or update the company in a group: [List and manage company groups →](list-and-manage-company-groups.md) (PUT participants).
