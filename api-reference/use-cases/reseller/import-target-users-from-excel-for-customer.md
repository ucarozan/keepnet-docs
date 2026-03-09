# Import target users from Excel for a customer

As a Reseller you can bulk-import target users for a customer by uploading an Excel or CSV file through the API. The flow mirrors the platform UI: upload the file, map columns to user fields, preview the parsed rows, then confirm the import. Use a credential with Client Role = **Reseller**. Send **`X-KEEPNET-Company-Id`** with every request so the users are created under the correct customer.

---

## POST /api/companies/search

> Get the customer's Company ID first. Use the `resourceId` from the response as **`X-KEEPNET-Company-Id`** in all subsequent requests. **Test it:** Authorize with Client ID/Secret, then Send — request body is pre-filled.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/companies/search" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## POST /api/target-users/example-file

> Downloads an example Excel template with the expected column headers. Use this as a reference when preparing your file. Send **`X-KEEPNET-Company-Id`**. Body: `exportType` (`"Csv"` or `"Excel"`).

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/target-users/example-file" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

Example body:

```json
{
  "exportType": "Excel"
}
```

---

## POST /api/target-users/upload

> Uploads the Excel/CSV file containing target users. Send the file as **multipart/form-data** with the field name `File`. Send **`X-KEEPNET-Company-Id`**. The response returns a `transactionId` — use it in all subsequent steps.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/target-users/upload" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

Example request headers:

```http
Authorization: Bearer <your_access_token>
Content-Type: multipart/form-data
X-KEEPNET-Company-Id: xC5kfGz7w2Nz
```

---

## GET /api/target-users/upload/{transactionId}

> Returns the upload summary: detected column headers, sheet names, and row count. Use the column names from this response to build the field mappings in the next step. Send **`X-KEEPNET-Company-Id`**.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/target-users/upload/{transactionId}" method="get" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## POST /api/target-users/create-mapping

> Maps Excel column headers to Keepnet target user fields and starts the mapping job. Send **`X-KEEPNET-Company-Id`**. Body: `transactionId`, `fieldMappings` (array of column-to-field pairs), and optionally `targetGroupResourceIds` to assign imported users to existing groups.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/target-users/create-mapping" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

Example body:

```json
{
  "transactionId": "abc123-def456",
  "targetGroupResourceIds": [],
  "fieldMappings": [
    { "excelColumnName": "Email", "fieldName": "email" },
    { "excelColumnName": "First Name", "fieldName": "firstName" },
    { "excelColumnName": "Last Name", "fieldName": "lastName" },
    { "excelColumnName": "Department", "fieldName": "department" }
  ]
}
```

The response returns a `resourceId` for the mapping job — use it to poll the job status.

---

## GET /api/target-users/mapping-job/{resourceId}

> Polls the mapping job status. The job parses Excel rows and validates them against the field mappings. Send **`X-KEEPNET-Company-Id`**. Poll until the job status indicates completion, then proceed to preview or import.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/target-users/mapping-job/{resourceId}" method="get" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## POST /api/target-users/{transactionId}/search

> Preview the parsed target users before importing. Returns a paginated list of temporary user records parsed from the uploaded file. Send **`X-KEEPNET-Company-Id`**. Use this to verify the data looks correct before confirming the import.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/target-users/{transactionId}/search" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## POST /api/target-users/{transactionId}/import

> Confirms and imports the parsed users into the customer's target user list. Send **`X-KEEPNET-Company-Id`**. Body: `importType` (e.g. `"All"` to import all rows, or `"Selected"` with `selectedResourceIds` to import specific users).

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/target-users/{transactionId}/import" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

Example body (import all):

```json
{
  "importType": "All",
  "selectedResourceIds": []
}
```

---

## Common errors

* **403 Forbidden** — Credential is not Reseller, or the Company ID is not one you manage. Set Client Role = **Reseller**. <a href="../../../next-generation-product/platform/company/system-users/user-roles.md" target="_blank" rel="noopener noreferrer">Roles and permissions →</a>
* **401 Unauthorized** — Missing or invalid token. Request a new token via `POST /connect/token`.
* **400 Bad Request** — File format not supported, or field mappings do not match the uploaded file's columns. Verify column names from `GET /api/target-users/upload/{transactionId}`.
* **404 Not Found** — Invalid `transactionId` or `resourceId`. The transaction may have expired — re-upload the file.

{% hint style="info" %}
**Platform UI:** Import target users under **Company → Target Users → Import**. <a href="../../../next-generation-product/platform/company/target-users.md" target="_blank" rel="noopener noreferrer">Target Users →</a>
{% endhint %}

**Related:** <a href="add-target-users-for-customer.md" target="_blank" rel="noopener noreferrer">Add target users for a customer →</a> for adding users one by one via API. <a href="scope-api-requests-to-customer.md" target="_blank" rel="noopener noreferrer">Scope API requests to a customer →</a> for how Company ID is used across endpoints.
