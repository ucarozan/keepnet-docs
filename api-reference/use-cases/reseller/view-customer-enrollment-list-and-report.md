# View customer's enrollment list and report

As a Reseller you can list a customer's enrollments (training or survey), get details and summary reports, and pull the **Users** report for an enrollment so you have per-user data for custom reporting. Use a credential with Client Role = **Reseller**. Send **`X-KEEPNET-Company-Id`** (and for enrollment search, **`x-ir-company-id`** with the same value) so results are scoped to that customer.

***

## Get the customer's Company ID

**Endpoint:** `POST /api/companies/search`

Use the `resourceId` of the desired company as the Company ID in the enrollment and report requests below.

> Retrieves a paginated list of all companies you manage with license details. Each item includes `resourceId` — use it as the Company ID for scoped requests. **Test it:** Authorize in the Endpoints panel, then Send — request body is pre-filled.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/companies/search" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

From the response, pick the company (e.g. by `companyName`) and note its `companyResourceId`. Use that value in the **`X-KEEPNET-Company-Id`** and **`x-ir-company-id`** headers in the next steps.

***

## List enrollments for the customer

**Endpoint:** `POST /api/enrollments/search`

Returns a paginated list of enrollments for that customer. Send the Company ID in both **`X-KEEPNET-Company-Id`** and **`x-ir-company-id`** so the list is scoped to the chosen company. The response includes `enrollmentId`, `name`, `type` (e.g. `"Survey"` or training type), `status`, and other fields — use `enrollmentId` when calling the report endpoints below.

> Returns a list of enrollments. As a Reseller, send **`X-KEEPNET-Company-Id: <companyResourceId>`** and **`x-ir-company-id: <companyResourceId>`** with the same customer Company ID.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/enrollments/search" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

Example headers:

```http
Authorization: Bearer <your_access_token>
Content-Type: application/json
X-KEEPNET-Company-Id: xC5kfGz7w2Nz
x-ir-company-id: xC5kfGz7w2Nz
```

Example body (first page; **explicit `orderBy` / `ascending`**, **no `null` inside `filter`** — use **`SearchInputTextValue`: `""`**):

```json
{
  "pageNumber": 1,
  "pageSize": 20,
  "orderBy": "CreateTime",
  "ascending": false,
  "filter": {
    "Condition": "AND",
    "SearchInputTextValue": ""
  }
}
```

If your tenant returns **400** for this shape, add empty **`FilterGroups`** (two groups, **`FilterItems`: `[]`**) as in past docs — still **without** `null` conditions or `searchInputTextValue: null`.

From the response, use `enrollmentId` (or `resourceId`) of the enrollment you want to report on.

***

### List only Survey enrollments

To restrict the list to **Survey** enrollments (e.g. security culture surveys), add **`enrollmentType`** to the request body and use the same filter structure as above:

```json
{
  "pageNumber": 1,
  "pageSize": 20,
  "orderBy": "CreateTime",
  "ascending": false,
  "filter": {
    "Condition": "AND",
    "SearchInputTextValue": ""
  },
  "enrollmentType": "Survey"
}
```

Each result includes `"type": "Survey"`, `name`, `enrollmentId`, and delivery info. Use that `enrollmentId` for the summary and Users report endpoints below.

***

## Get enrollment details

**Endpoint:** `GET /api/enrollments/{resourceId}`

Returns full details for one enrollment. Send **`X-KEEPNET-Company-Id`** with the customer's Company ID.

> Get enrollment by Id. As a Reseller, send **`X-KEEPNET-Company-Id: <companyResourceId>`** for the customer that owns this enrollment.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/enrollments/{resourceId}" method="get" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

***

## Get enrollment summary report

**Endpoint:** `GET /api/training-reports/{enrollmentId}/summary`

Returns the enrollment summary (overview). Send **`X-KEEPNET-Company-Id`**. For Survey enrollments, you can pass the optional query parameter **`trainingType=0`**.

> Returns enrollment summary report. As a Reseller, send **`X-KEEPNET-Company-Id: <companyResourceId>`**.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/training-reports/{enrollmentId}/summary" method="get" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

***

## Pull Users report for an enrollment

**Endpoint:** `POST /api/training-reports/{enrollmentId}/users/search`

Returns the per-user training (or survey) report for that enrollment — one row per user with status, progress, and related fields. Use this to collect all users' data for a given enrollment (e.g. for custom reporting). Send **`X-KEEPNET-Company-Id`** and paginate with `pageNumber` / `pageSize` until you have all rows.

> Returns target user training report for an enrollment. As a Reseller, send **`X-KEEPNET-Company-Id: <companyResourceId>`**. Request body: `filter` (required), `pageNumber`, `pageSize`, `orderBy`, `ascending`; for Survey enrollments include **`trainingType`** (e.g. `0`) in the body. See Endpoints → **TrainingReport** for the full schema.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/training-reports/{enrollmentId}/users/search" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

Example body (first page; **same contract**: non-null **`orderBy`**, explicit **`ascending`**, **`searchInputTextValue`** is **`""`** not **`null`**):

```json
{
  "pageNumber": 1,
  "pageSize": 100,
  "orderBy": "Email",
  "ascending": false,
  "filter": {
    "Condition": "AND",
    "SearchInputTextValue": ""
  }
}
```

For Survey enrollments, add **`trainingType`** to the body (value depends on API; e.g. `0` for Survey). Paginate until `results` is empty or `totalNumberOfRecords` is reached.

***

## Export the enrollment list

**Endpoint:** `POST /api/enrollments/search/export`

Export the enrollment list (e.g. CSV/Excel) for that customer. Send the same **`X-KEEPNET-Company-Id`** and a body similar to search (filter, `exportType`, etc.). See Endpoints → **Enrollment** for the full request schema.

> Exports the list of enrollments. As a Reseller, send **`X-KEEPNET-Company-Id: <companyResourceId>`**.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/enrollments/search/export" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

***

## Common errors

* **403 Forbidden** — Credential is not Reseller, or the Company ID is not one you manage. Set Client Role = **Reseller**. [Roles and permissions →](../../../next-generation-product/platform/company/system-users/user-roles.md)
* **401 Unauthorized** — Missing or invalid token. Request a new token via `POST /connect/token`.
* **400 Bad Request** — Invalid request body. For `POST /api/enrollments/search`, ensure `filter` is sent with the structure above (e.g. `Condition`, `FilterGroups`). For Survey-only results, include `enrollmentType: "Survey"`.
* **404 Not Found** — Invalid Company ID or enrollment ID. Verify Company ID from `POST /api/companies/search` and enrollment ID from `POST /api/enrollments/search`; send **`X-KEEPNET-Company-Id`** (and for enrollment search **`x-ir-company-id`**) for the customer that owns the enrollment.

**Related:** [Scope API requests to a customer →](scope-api-requests-to-customer.md). For training report and enrollment schemas: **Endpoints** → **Enrollment**, **TrainingReport** in the API Reference sidebar.
