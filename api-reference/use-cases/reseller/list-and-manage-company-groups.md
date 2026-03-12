# List and manage company groups

As a Reseller you can list, search, export, create, and update company groups and their participants. **Participants** = the companies that belong to the group (company `resourceId` list). Company groups let you share training content, notification templates, and custom roles across multiple customer companies. Use a credential with Client Role = **Reseller**.

***

## GET /api/company-groups

> Retrieves all company groups. No request body. **Test it:** Authorize with Client ID/Secret, then Send.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/company-groups" method="get" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

***

## POST /api/company-groups/search

> Searches company groups with pagination and sorting. **Test it:** Authorize with Client ID/Secret, then Send — request body is pre-filled (`pageNumber: 1`, `pageSize: 10`, `orderBy: CreateTime`).

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/company-groups/search" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

***

## POST /api/company-groups/search/export

> Exports the list of company groups to CSV or Excel. **Test it:** Authorize with Client ID/Secret, then Send — request body is pre-filled (minimal pagination + `exportType: Csv`).

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/company-groups/search/export" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

***

## GET /api/company-groups/{resourceId}

> Retrieves a single company group by ID. Replace `{resourceId}` with the group resource ID from search or list.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/company-groups/{resourceId}" method="get" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

***

## POST /api/company-groups

> Creates a new company group. Send `name` and optionally `companyResourceIdArray` (company IDs to add as participants). **Test it:** Endpoints → **CompanyGroup** — use dummy name (e.g. `"Demo Group"`) and placeholder IDs (H8d).

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/company-groups" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

***

## PUT /api/company-groups/{resourceId}

> Updates a company group (e.g. name). Replace `{resourceId}` with the group ID.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/company-groups/{resourceId}" method="put" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

***

## PUT /api/company-groups/{resourceId}/participants

> Sets the participants (companies) in a company group. Replace `{resourceId}` with the **group** ID; request body = array of company resource IDs. Replaces the full member list. Participants = the companies in the group (see Terminology in DOCUMENTATION-RULES).

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/company-groups/{resourceId}/participants" method="put" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

***

## Common errors

* **403 Forbidden** — Credential is not Reseller. Set Client Role = **Reseller** in **Company → Company Settings → REST API**. [Roles and permissions →](../../../next-generation-product/platform/company/system-users/user-roles.md)
* **401 Unauthorized** — Missing or invalid token. Request a new token via `POST /connect/token`.
* **400 Bad Request** — Invalid request body. For search/export use minimal body: `pageNumber`, `pageSize`, `orderBy`, `ascending`, `filter`.

**Related:** [Scope API requests to a customer →](scope-api-requests-to-customer.md). [List companies with license details →](list-companies-with-license-details.md). [Create a company →](onboard-new-customer.md) (add new company to a group).

{% hint style="info" %}
**Platform UI:** Manage company groups in **Company → Company Groups**. [Company groups →](../../../next-generation-product/platform/company/companies/company-groups.md)
{% endhint %}
