# View customer's training enrollment list and report (Reseller)

As a Reseller you can list a customer’s training enrollments and get reports for a specific enrollment. Get the customer’s Company ID, then call the enrollment search and training-report endpoints with **`X-KEEPNET-Company-Id`** so results are scoped to that company. Use a credential with Client Role = **Reseller**.

---

## POST /api/companies/search

Get the customer’s Company ID. Use the `resourceId` of the desired company in the next steps.

> Retrieves a paginated list of all companies you manage with license details. Each item includes `resourceId` — use it as the Company ID for scoped requests. **Test it:** Authorize with Client ID/Secret, then Send — request body is pre-filled.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/companies/search" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

From the response, pick the company (e.g. by `name`) and note its `resourceId`. Example: `"resourceId": "xC5kfGz7w2Nz"` → use `xC5kfGz7w2Nz` as Company ID in the enrollment and report requests below.

---

## POST /api/enrollments/search

Returns a paginated list of enrollments for that customer. Send the Company ID in the **`X-KEEPNET-Company-Id`** header so the list is scoped to the chosen company. The response includes enrollment IDs (`resourceId`), training info, status, and other fields — use an enrollment `resourceId` when calling the report endpoints in the next section.

> Returns a list of enrollments. As a Reseller, send **`X-KEEPNET-Company-Id: <companyResourceId>`** with the customer’s Company ID. Request body: `filter` (required; use an empty object `{}` for no filters), optional `pageNumber`, `pageSize`, `orderBy`, `ascending`, `enrollmentType`. **Test it:** Endpoints → **Enrollment** → **Returns a list of enrollments** — use dummy data (H8d) and set the header to a Company ID from companies/search.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/enrollments/search" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

Example request headers:

```http
Authorization: Bearer <your_access_token>
Content-Type: application/json
X-KEEPNET-Company-Id: xC5kfGz7w2Nz
```

Example body (dummy data — list first page of enrollments):

```json
{
  "filter": {},
  "pageNumber": 1,
  "pageSize": 20
}
```

From the response, take the `resourceId` of the enrollment you want to report on (e.g. `"resourceId": "eNrl9Ab3k2Qp"`).

---

## GET /api/enrollments/{resourceId}

Get full details for one enrollment by ID. Still send **`X-KEEPNET-Company-Id`** so the Reseller context is correct.

> Get enrollment by Id. As a Reseller, send **`X-KEEPNET-Company-Id: <companyResourceId>`** for the customer that owns this enrollment.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/enrollments/{resourceId}" method="get" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

Example: `GET /api/enrollments/eNrl9Ab3k2Qp` with header `X-KEEPNET-Company-Id: xC5kfGz7w2Nz`.

---

## Get a report for an enrollment

Use the enrollment `resourceId` from the list as `enrollmentId` in the training-report endpoints. Send **`X-KEEPNET-Company-Id`** so the report is scoped to that customer.

### GET /api/training-reports/{enrollmentId}/summary

Returns the enrollment summary report (overview for that enrollment).

> Returns enrollment summary report. As a Reseller, send **`X-KEEPNET-Company-Id: <companyResourceId>`**. Optional query: `trainingType`.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/training-reports/{enrollmentId}/summary" method="get" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

Example: `GET /api/training-reports/eNrl9Ab3k2Qp/summary` with header `X-KEEPNET-Company-Id: xC5kfGz7w2Nz`.

### Export enrollment list (bulk report)

To export the enrollment list (e.g. CSV/Excel) for that customer, use **POST /api/enrollments/search/export** with the same Company ID and a body similar to search (filter, exportType, etc.). See Endpoints → **Enrollment** → **Exports the list of enrollment** for the full request schema.

---

## Common errors

* **403 Forbidden** — Credential is not Reseller, or the Company ID is not one you manage. Set Client Role = **Reseller**. <a href="../../../next-generation-product/platform/company/system-users/user-roles.md" target="_blank" rel="noopener noreferrer">Roles and permissions →</a>
* **401 Unauthorized** — Missing or invalid token. Request a new token via `POST /connect/token`.
* **404 Not Found** / **400 Bad Request** — Invalid Company ID or enrollment ID. Verify Company ID from `POST /api/companies/search` and enrollment ID from `POST /api/enrollments/search`; ensure you send `X-KEEPNET-Company-Id` for the customer that owns the enrollment.

**Related:** <a href="scope-api-requests-to-customer.md" target="_blank" rel="noopener noreferrer">Scope API requests to a customer (Reseller) →</a> for how Company ID is used. <a href="../company-users/enroll-users-in-training.md" target="_blank" rel="noopener noreferrer">Enroll users in training →</a> (Company & Users). For training reports without Reseller focus: see the **TrainingReport** section in the Endpoints API Reference.
