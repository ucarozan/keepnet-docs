# Onboard a new customer

Create a new company (customer) via the API and optionally set license and add it to a company group. Reseller-only — use a credential with Client Role = **Reseller**. After creation, use the returned Company ID for license configuration, groups, and scoped API calls.

---

## POST /api/companies

> Creates a new company. Send JSON with `name`, `industryId`, `licenseTypeId`, `targetUserLimit`, `expiryDate` and other required fields. **Test it:** Endpoints → **Company** → **Creates a new company** — use dummy data (e.g. name `"Acme Corp"`, placeholder IDs).

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/companies" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## PUT /api/companies/{resourceId}

> Updates company details and license (type, target user limit, expiry). Replace `{resourceId}` with the new company’s ID from the create response. Use after creation to adjust license or company info.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/companies/{resourceId}" method="put" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## PUT /api/company-groups/{resourceId}/participants

> Adds the new company to a company group. Replace the first `{resourceId}` with the **group** ID; send in the body the list of company resource IDs (including the new company). Participants = the companies in the group. See <a href="list-and-manage-company-groups.md" target="_blank" rel="noopener noreferrer">List and manage company groups →</a>.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/company-groups/{resourceId}/participants" method="put" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## Common errors

* **403 Forbidden** — Credential is not Reseller. Set Client Role = **Reseller** in **Company → Company Settings → REST API**. <a href="../../../next-generation-product/platform/company/system-users/user-roles.md" target="_blank" rel="noopener noreferrer">Roles and permissions →</a>
* **401 Unauthorized** — Missing or invalid token. Request a new token via `POST /connect/token`.
* **400 Bad Request** — Invalid or missing required fields. Check Endpoints → **Company** for request body schema.

{% hint style="info" %}
**Platform UI:** Create companies and set REST API credentials in **Company → Company Settings → REST API**.
<a href="../../../next-generation-product/platform/company/company-settings/rest-api.md" target="_blank" rel="noopener noreferrer">REST API Settings →</a>
{% endhint %}
