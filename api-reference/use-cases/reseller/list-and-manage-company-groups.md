# List and manage company groups

List, search, export, create, and update company groups and their participants. Reseller-only — use a credential with Client Role = **Reseller**. Company groups let you share training content, notification templates, and custom roles across multiple customer companies.

---

## GET /api/company-groups

> Retrieves all company groups. No request body. **Test it:** Authorize with Client ID/Secret, then Send.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/company-groups" method="get" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## POST /api/company-groups/search

> Searches company groups with pagination and sorting. **Test it:** Authorize with Client ID/Secret, then Send — request body is pre-filled (`pageNumber: 1`, `pageSize: 10`, `orderBy: CreateTime`).

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/company-groups/search" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## POST /api/company-groups/search/export

> Exports the list of company groups to CSV or Excel. **Test it:** Authorize with Client ID/Secret, then Send — request body is pre-filled (minimal pagination + `exportType: Csv`).

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/company-groups/search/export" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## GET /api/company-groups/{resourceId}

> Retrieves a single company group by ID. Replace `{resourceId}` with the group resource ID from search or list.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/company-groups/{resourceId}" method="get" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## POST /api/company-groups

> Creates a new company group. Send `name` and optionally `companyResourceIdArray` (company IDs to add). **Test it:** See Endpoints → **CompanyGroup** for request body schema.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/company-groups" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## PUT /api/company-groups/{resourceId}

> Updates a company group (e.g. name). Replace `{resourceId}` with the group ID.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/company-groups/{resourceId}" method="put" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## PUT /api/company-groups/{resourceId}/participants

> Adds or updates participants (companies) in a company group. Send an array of company resource IDs.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/company-groups/{resourceId}/participants" method="put" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## Common errors

* **403 Forbidden** — Credential is not Reseller. Set Client Role = **Reseller** in **Company → Company Settings → REST API**.
* **401 Unauthorized** — Missing or invalid token. Request a new token via `POST /connect/token`.
* **400 Bad Request** — Invalid request body (e.g. missing required fields). For search/export use minimal body: `pageNumber`, `pageSize`, `orderBy`, `ascending`, `filter`.

{% hint style="info" %}
**Platform UI:** Manage company groups in **Company → Company Groups**.
<a href="../../../next-generation-product/platform/company/companies/company-groups.md" target="_blank" rel="noopener noreferrer">Company groups →</a>
{% endhint %}
