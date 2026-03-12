---
description: "Learn about Pull survey results for a customer in Keepnet Labs human risk management documentation."
---

# Pull survey results for a customer

As a Reseller you can list a customer's survey enrollments, get the summary report, and pull per-user survey results (status, progress, and question-level responses) for analysis or reporting. Use a credential with Client Role = **Reseller**. Send **`X-KEEPNET-Company-Id`** and **`x-ir-company-id`** (for enrollment search) so results are scoped to that customer.

***

## POST /api/companies/search

> Use this to get the customer's Company ID; use the `resourceId` as **`X-KEEPNET-Company-Id`** in the requests below. Retrieves a paginated list of companies you manage. **Test it:** Authorize with Client ID/Secret, then Send — request body is pre-filled.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/companies/search" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

***

## POST /api/enrollments/search

> Returns a list of enrollments for the customer. Send **`X-KEEPNET-Company-Id`** and **`x-ir-company-id`** with the same Company ID. Include **`enrollmentType: "Survey"`** in the request body to list only survey enrollments. Use `enrollmentId` from the response for the summary and users report below.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/enrollments/search" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

***

## GET /api/enrollments/{resourceId}

> Returns full details for one enrollment. As a Reseller, send **`X-KEEPNET-Company-Id: <companyResourceId>`** for the customer that owns this enrollment.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/enrollments/{resourceId}" method="get" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

***

## GET /api/training-reports/{enrollmentId}/summary

> Returns the enrollment summary (overview) for the survey. Send **`X-KEEPNET-Company-Id`**. For Survey enrollments you can pass the optional query parameter **`trainingType=0`** if required by the API.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/training-reports/{enrollmentId}/summary" method="get" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

***

## POST /api/training-reports/{enrollmentId}/users/search

> Returns the per-user report for that survey enrollment — one row per user with status, progress, and related fields. Send **`X-KEEPNET-Company-Id`**. Request body: `filter` (required), `pageNumber`, `pageSize`, `orderBy`, `ascending`. For Survey enrollments include **`trainingType`** (e.g. `0`) in the body if required. See Endpoints → **TrainingReport** for the full schema.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/training-reports/{enrollmentId}/users/search" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

***

## GET /api/training-reports/{enrollmentId}/interactions/{targetUserResourceId}

> Returns per-user interaction data for the enrollment (e.g. survey question-level responses when the enrollment is a survey). Send **`X-KEEPNET-Company-Id`**. Use `targetUserResourceId` from the users/search response. See Endpoints → **TrainingReport** for the response shape.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/training-reports/{enrollmentId}/interactions/{targetUserResourceId}" method="get" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

***

## Common errors

* **403 Forbidden** — Credential is not Reseller, or the Company ID is not one you manage. Set Client Role = **Reseller**. [Roles and permissions →](../../../next-generation-product/platform/company/system-users/user-roles.md)
* **401 Unauthorized** — Missing or invalid token. Request a new token via `POST /connect/token`.
* **400 Bad Request** — Invalid request body. For `POST /api/enrollments/search`, ensure `filter` is sent with the required structure (e.g. `Condition`, `FilterGroups`). For survey-only results, include **`enrollmentType: "Survey"`**. For users/search, include the required `filter` object.
* **404 Not Found** — Invalid Company ID or enrollment ID. Verify Company ID from `POST /api/companies/search` and enrollment ID from `POST /api/enrollments/search`; send **`X-KEEPNET-Company-Id`** and **`x-ir-company-id`** for enrollment search.

{% hint style="info" %}
**Platform UI:** View survey enrollments and reports under **Awareness Educator → Enrollments**. [Enrollments →](../../../next-generation-product/platform/awareness-educator/enrollments.md)
{% endhint %}

**Related:** [View customer's enrollment list and report →](view-customer-enrollment-list-and-report.md). [View customer's enrollment sending, certificates, and notifications →](view-customer-enrollment-sending-certificates-notifications.md). [Scope API requests to a customer →](scope-api-requests-to-customer.md).
