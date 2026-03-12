# Get a company

As a Reseller you can retrieve a single company you manage by its ID to view full details (license, settings, etc.). Get the company `resourceId` from the companies list, then call **GET /api/companies/{resourceId}**. Use a credential with Client Role = **Reseller**.

***

## POST /api/companies/search

Get the company's `resourceId` by calling this endpoint; use it in the next step as `{resourceId}`.

> Retrieves a paginated list of all companies you manage with license details. Each item includes `resourceId` — use it as the Company ID. **Test it:** Authorize with Client ID/Secret, then Send — request body is pre-filled.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/companies/search" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

From the response, pick the company (e.g. by `name`) and note its `resourceId`. Example: `"resourceId": "xC5kfGz7w2Nz"` → use in `GET /api/companies/xC5kfGz7w2Nz`.

***

## GET /api/companies/{resourceId}

Returns full details for that company (license, settings, etc.). Replace `{resourceId}` with the company ID from the search response. No request body.

> Retrieves a single company by ID. **Test it:** Authorize, then set path parameter to a company ID from companies/search.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/companies/{resourceId}" method="get" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

***

## Common errors

* **403 Forbidden** — Credential is not Reseller, or company is not one you manage. Set Client Role = **Reseller**. [Roles and permissions →](../../../next-generation-product/platform/company/system-users/user-roles.md)
* **401 Unauthorized** — Missing or invalid token. Request a new token via `POST /connect/token`.
* **404 Not Found** — Invalid or unknown company ID. Verify from `POST /api/companies/search`.

**Related:** [Scope API requests to a customer →](scope-api-requests-to-customer.md). [List companies with license details →](list-companies-with-license-details.md). [Update a company →](update-a-company.md).
