# Delete a company

Permanently delete a company you manage and all its associated data. Reseller-only — use a credential with Client Role = **Reseller**. Get the company's `resourceId` from the companies list, then call **DELETE /api/companies/{resourceId}**. This action is **irreversible**.

---

## POST /api/companies/search

Get the company's `resourceId` by calling this endpoint; use it in the next step as `{resourceId}`.

> Retrieves a paginated list of all companies you manage with license details. Each item includes `resourceId` — use it as the Company ID. **Test it:** Authorize with Client ID/Secret, then Send — request body is pre-filled.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/companies/search" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

From the response, pick the company to delete and note its `resourceId`. Example: `"resourceId": "xC5kfGz7w2Nz"` → use in `DELETE /api/companies/xC5kfGz7w2Nz`.

---

## DELETE /api/companies/{resourceId}

Permanently deletes the company and all associated data. Replace `{resourceId}` with the company ID. Irreversible — there is no undo.

> Deletes an existing company. **Test it:** Authorize, then set path parameter to the company ID. Use with caution.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/companies/{resourceId}" method="delete" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## Common errors

* **403 Forbidden** — Credential is not Reseller, or company is not one you manage. Set Client Role = **Reseller**. <a href="../../../next-generation-product/platform/company/system-users/user-roles.md" target="_blank" rel="noopener noreferrer">Roles and permissions →</a>
* **401 Unauthorized** — Missing or invalid token. Request a new token via `POST /connect/token`.
* **404 Not Found** — Invalid or unknown company ID. Verify from `POST /api/companies/search`.

**Related:** <a href="scope-api-requests-to-customer.md" target="_blank" rel="noopener noreferrer">Scope API requests to a customer →</a>. <a href="list-companies-with-license-details.md" target="_blank" rel="noopener noreferrer">List companies with license details →</a>. <a href="get-a-company.md" target="_blank" rel="noopener noreferrer">Get a company →</a>, <a href="update-a-company.md" target="_blank" rel="noopener noreferrer">Update a company →</a>.

{% hint style="danger" %}
Deleting a company is **irreversible**. All associated data (users, campaigns, reports, etc.) is permanently removed. Confirm the company ID before sending the request.
{% endhint %}
