# Start phishing simulation for a customer

As a Reseller you can create a phishing campaign for a customer and immediately start it so the simulation emails go out to target users. The flow: get the customer's Company ID, pick a scenario and target group, create the campaign, then start the campaign job. Use a credential with Client Role = **Reseller**. Send **`X-KEEPNET-Company-Id`** with every request.

---

## POST /api/companies/search

> Get the customer's Company ID first. Use the `resourceId` from the response as **`X-KEEPNET-Company-Id`** in all subsequent requests. **Test it:** Authorize with Client ID/Secret, then Send — request body is pre-filled.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/companies/search" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## POST /api/phishing-simulator/phishing-scenario/search

> List phishing scenarios available for the customer. Send **`X-KEEPNET-Company-Id`**. Pick a scenario and note its `resourceId` — use it as `phishingScenarioResourceIds` in the campaign body.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/phishing-simulator/phishing-scenario/search" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## POST /api/target-groups/search/current-company

> List target groups for the customer. Send **`X-KEEPNET-Company-Id`**. Use one or more `resourceId` values as `targetGroupResourceIds` in the campaign body.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/target-groups/search/current-company" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## GET /api/phishing-simulator/phishing-campaign/form-details

> Returns dropdown and reference data (email delivery settings, schedule types, etc.) needed to build the campaign. Send **`X-KEEPNET-Company-Id`**.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/phishing-simulator/phishing-campaign/form-details" method="get" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## POST /api/phishing-simulator/phishing-campaign

> Creates a new phishing campaign for the customer. Send **`X-KEEPNET-Company-Id`**. Body: `name` (required), `scheduleTypeId` (required), `phishingScenarioResourceIds`, `targetGroupResourceIds`, duration, distribution, and email delivery settings. See Endpoints → **PhishingCampaign** for the full schema.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/phishing-simulator/phishing-campaign" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

Example body (minimal — send immediately):

```json
{
  "name": "Q1 Phishing Simulation",
  "scheduleTypeId": 1,
  "phishingScenarioResourceIds": ["<scenarioResourceId>"],
  "targetGroupResourceIds": ["<targetGroupResourceId>"],
  "duration": 7,
  "distributionTypeId": 1,
  "distributionDelayEvery": 0,
  "distributionDelayTimeTypeId": 1,
  "sendingLimit": 0,
  "emailDeliverySettingType": 1,
  "excludeFromReports": false,
  "sendOnlyActiveUsers": true
}
```

From the response, note the campaign `resourceId`. Use it in the next step.

---

## POST /api/phishing-simulator/phishing-campaign-job/start/{resourceId}

> Starts the campaign — emails go out to target users. Replace `{resourceId}` with the campaign ID from the create response. Send **`X-KEEPNET-Company-Id`**. Body: `scheduleTypeId`, `targetGroupResourceIds`, and optional distribution config.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/phishing-simulator/phishing-campaign-job/start/{resourceId}" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

Example body (start immediately):

```json
{
  "scheduleTypeId": 1,
  "targetGroupResourceIds": ["<targetGroupResourceId>"],
  "excludeFromReports": false,
  "sendingLimit": 0,
  "distributionDelayEvery": 0,
  "distributionDelayTimeTypeId": 1,
  "useTargetUserTimeZone": false
}
```

---

## Common errors

* **403 Forbidden** — Credential is not Reseller, or the Company ID is not one you manage. Set Client Role = **Reseller**. <a href="../../../next-generation-product/platform/company/system-users/user-roles.md" target="_blank" rel="noopener noreferrer">Roles and permissions →</a>
* **401 Unauthorized** — Missing or invalid token. Request a new token via `POST /connect/token`.
* **400 Bad Request** — Invalid request body (missing scenario, target group, or schedule). Verify IDs from the search endpoints above; check Endpoints → **PhishingCampaign** for the full schema.
* **404 Not Found** — Invalid Company ID, scenario ID, or campaign ID.

{% hint style="info" %}
**Platform UI:** Create phishing campaigns under **Phishing Simulator → Campaign Manager**. <a href="../../../next-generation-product/platform/phishing-simulator/phishing-campaign-manager.md" target="_blank" rel="noopener noreferrer">Campaign Manager →</a>
{% endhint %}

**Related:** <a href="create-and-start-phishing-campaign-for-customer.md" target="_blank" rel="noopener noreferrer">Create and start phishing campaign for a customer →</a> (compact version). <a href="list-phishing-scenarios-for-customer.md" target="_blank" rel="noopener noreferrer">List phishing scenarios for a customer →</a>. <a href="view-customer-simulation-campaign-list-and-report.md" target="_blank" rel="noopener noreferrer">View customer's campaign list and report →</a>. <a href="scope-api-requests-to-customer.md" target="_blank" rel="noopener noreferrer">Scope API requests to a customer →</a>.
