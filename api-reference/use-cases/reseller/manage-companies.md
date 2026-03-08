# Manage companies

Get, update, or delete a single company you manage, and add companies to a company group. Reseller-only — use a credential with Client Role = **Reseller**. Company ID comes from <a href="list-companies-with-license-details.md" target="_blank" rel="noopener noreferrer">List companies with license details →</a> (`POST /api/companies/search` response `resourceId`).

---

## GET /api/companies/{resourceId}

> Retrieves a single company by ID. Replace `{resourceId}` with the company’s resource ID. No request body. **Test it:** Authorize, then set path parameter to a dummy ID (e.g. from search response).

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/companies/{resourceId}" method="get" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## PUT /api/companies/{resourceId}

> Updates company details, license (type, target user limit, expiry), or other settings. Replace `{resourceId}` with the company ID. **Test it:** Endpoints → **Company** → **Updates a company** — use dummy/placeholder values (H8d).

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/companies/{resourceId}" method="put" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## PUT /api/company-groups/{resourceId}/participants

> Adds or updates participants (companies) in a company group. First `{resourceId}` = group ID; request body = array of company resource IDs. Replaces the group’s member list. See <a href="list-and-manage-company-groups.md" target="_blank" rel="noopener noreferrer">List and manage company groups →</a>.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/company-groups/{resourceId}/participants" method="put" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## DELETE /api/companies/{resourceId}

> Permanently deletes a company and all associated data. Replace `{resourceId}` with the company ID. Irreversible.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/companies/{resourceId}" method="delete" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## Common errors

* **403 Forbidden** — Credential is not Reseller, or company is not one you manage. Set Client Role = **Reseller**. <a href="../../../next-generation-product/platform/company/system-users/user-roles.md" target="_blank" rel="noopener noreferrer">Roles and permissions →</a>
* **401 Unauthorized** — Missing or invalid token. Request a new token via `POST /connect/token`.
* **404 Not Found** — Invalid or unknown company ID. Verify from `POST /api/companies/search`.

{% hint style="danger" %}
Deleting a company is irreversible. All associated data is removed.
{% endhint %}
