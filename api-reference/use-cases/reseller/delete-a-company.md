# Delete a company

As a Reseller you can permanently delete a company you manage and all its associated data. Get the company's `resourceId` from the companies list, then call **DELETE /api/companies/{resourceId}**. Use a credential with Client Role = **Reseller**. This action is **irreversible**.

***

## POST /api/companies/search

Get the company's `resourceId` by calling this endpoint; use it in the next step as `{resourceId}`.

> Retrieves a paginated list of all companies you manage with license details. Each item includes `resourceId` — use it as the Company ID. **Test it:** Authorize with Client ID/Secret, then Send — request body is pre-filled.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/companies/search" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

From the response, pick the company to delete and note its `resourceId`. Example: `"resourceId": "xC5kfGz7w2Nz"` → use in `DELETE /api/companies/xC5kfGz7w2Nz`.

***

## DELETE /api/companies/{resourceId}

Permanently deletes the company and all associated data. Replace `{resourceId}` with the company ID. Irreversible — there is no undo.

> Deletes an existing company. **Test it:** Authorize, then set path parameter to the company ID. Use with caution.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/companies/{resourceId}" method="delete" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

***

## Common errors

* **403 Forbidden** — Credential is not Reseller, or company is not one you manage. Set Client Role = **Reseller**. [Roles and permissions →](../../../next-generation-product/platform/company/system-users/user-roles.md)
* **401 Unauthorized** — Missing or invalid token. Request a new token via `POST /connect/token`.
* **404 Not Found** — Invalid or unknown company ID. Verify from `POST /api/companies/search`.

**Related:** [Scope API requests to a customer →](scope-api-requests-to-customer.md). [List companies with license details →](list-companies-with-license-details.md). [Get a company →](get-a-company.md), [Update a company →](update-a-company.md).

{% hint style="danger" %}
Deleting a company is **irreversible**. All associated data (users, campaigns, reports, etc.) is permanently removed. Confirm the company ID before sending the request.
{% endhint %}
