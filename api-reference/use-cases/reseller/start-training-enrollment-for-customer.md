# Start training enrollment for a customer

As a Reseller you can create and send a training enrollment for a customer's target users. The flow: get the customer's Company ID, find the training and target group, create the enrollment, and send it. Use a credential with Client Role = **Reseller**. Send **`X-KEEPNET-Company-Id`** with every request.

---

## POST /api/companies/search

> Get the customer's Company ID first. Use the `resourceId` from the response as **`X-KEEPNET-Company-Id`** in all subsequent requests. **Test it:** Authorize with Client ID/Secret, then Send — request body is pre-filled.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/companies/search" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## POST /api/trainings/search

> List available trainings. Send **`X-KEEPNET-Company-Id`**. Use the `resourceId` of the desired training as `trainingId` when creating the enrollment.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/trainings/search" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## POST /api/target-groups/search/current-company

> List target groups available for the customer. Send **`X-KEEPNET-Company-Id`**. Use one or more `resourceId` values as `targetGroupResourceIds` in the enrollment.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/target-groups/search/current-company" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## GET /api/enrollments/form-details

> Returns dropdown data (enrollment types, certificate options, reminder config, etc.) needed to build the enrollment create request. Send **`X-KEEPNET-Company-Id`**.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/enrollments/form-details" method="get" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## POST /api/enrollments

> Creates a new enrollment for the customer. Send **`X-KEEPNET-Company-Id`**. Body: `trainingId` (from trainings/search), `name`, `targetGroupResourceIds`, scheduling config, and optional fields (certificate, reminder, etc.). See Endpoints → **Enrollment** for the full schema.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/enrollments" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

Example body (minimal):

```json
{
  "trainingId": "<trainingResourceId>",
  "name": "Q1 Security Awareness Training",
  "targetGroupResourceIds": ["<targetGroupResourceId>"],
  "enrollmentScheduler": {
    "scheduledDate": "2026-04-01T09:00:00Z",
    "scheduledTimeZoneId": "Europe/Istanbul",
    "useOwnTimeZone": false,
    "dueDate": "2026-04-30T23:59:59Z"
  },
  "awardCertificate": true,
  "markedAsTest": false,
  "sendTeamsNotification": false
}
```

From the response, note the enrollment `resourceId`. Use it to send the enrollment.

---

## POST /api/enrollments/{resourceId}/send

> Sends the enrollment immediately to all assigned target users. Replace `{resourceId}` with the enrollment ID from the create response. Send **`X-KEEPNET-Company-Id`**. No request body — just POST to the URL.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/enrollments/{resourceId}/send" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## Common errors

* **403 Forbidden** — Credential is not Reseller, or the Company ID is not one you manage. Set Client Role = **Reseller**. <a href="../../../next-generation-product/platform/company/system-users/user-roles.md" target="_blank" rel="noopener noreferrer">Roles and permissions →</a>
* **401 Unauthorized** — Missing or invalid token. Request a new token via `POST /connect/token`.
* **400 Bad Request** — Invalid request body. Verify `trainingId` from `POST /api/trainings/search`, `targetGroupResourceIds` from `POST /api/target-groups/search/current-company`, and check Endpoints → **Enrollment** for the full schema.
* **404 Not Found** — Invalid Company ID, training ID, or enrollment ID.

{% hint style="info" %}
**Platform UI:** Create enrollments under **Awareness Educator → Enrollments**. <a href="../../../next-generation-product/platform/awareness-educator/enrollments.md" target="_blank" rel="noopener noreferrer">Enrollments →</a>
{% endhint %}

**Related:** <a href="view-customer-enrollment-list-and-report.md" target="_blank" rel="noopener noreferrer">View customer's enrollment list and report →</a>. <a href="scope-api-requests-to-customer.md" target="_blank" rel="noopener noreferrer">Scope API requests to a customer →</a>.
