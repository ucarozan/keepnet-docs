# Create a new company with SCIM and Direct Email Creation

As a Reseller you can onboard a new customer and configure SCIM (user provisioning) and Direct Email Creation (DEC) for that company in a single workflow. The flow: create the company, then configure SCIM so the customer's IdP provisions users, and set up DEC so phishing simulations and training emails are sent via the customer's Microsoft 365 or Google Workspace tenant. Use a credential with Client Role = **Reseller**. After company creation, send **`X-KEEPNET-Company-Id`** with the new company's `resourceId`.

---

## POST /api/companies

> Creates a new company. The request uses **multipart/form-data**. Required fields: `Name`, `CountryResourceId`, `IndustryResourceId`, `LicenseTypeResourceId`, `LicensePeriodTypeResourceId`, `NumberOfUsers`, `TimeZoneId`, `DateFormat`, `TimeFormat`. Reference IDs are platform-specific — use values from your environment. See Endpoints → **Company** for the full schema.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/companies" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

From the response, note the new company's `resourceId`. Use it as `X-KEEPNET-Company-Id` in all subsequent requests.

---

## POST /api/companies/clients

> Creates REST API credentials (Client ID / Client Secret) for the new company. This is required if the customer will use the API themselves. Send **`X-KEEPNET-Company-Id`** with the new company's `resourceId`.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/companies/clients" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## POST /api/scim

> Creates a new SCIM integration for the company. Send **`X-KEEPNET-Company-Id`**. Body: `name` (required, max 30 chars), optional `groupResourceId` (assign provisioned users to a target group), and optional `fieldMappings` (map SCIM attributes to Keepnet fields). The response includes `token` and `baseUrl` — provide these to the customer for their IdP (Entra ID, Okta, etc.).

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/scim" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

Example body:

```json
{
  "name": "Entra ID SCIM",
  "groupResourceId": "<targetGroupResourceId>",
  "fieldMappings": [],
  "syncPlatformGroup": false
}
```

---

## GET /api/scim/fields

> Returns all available SCIM fields that can be mapped. Use these values to configure `fieldMappings` in the SCIM integration if needed. Send **`X-KEEPNET-Company-Id`**.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/scim/fields" method="get" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## POST /api/companies/direct-email-settings

> Creates a Direct Email Creation (DEC) setting for the company. Send **`X-KEEPNET-Company-Id`**. Body: `name` (required), `tenantId` (required — the customer's Microsoft 365 or Google Workspace tenant ID), `allowedDomains` (required — list of email domains authorized for sending), and `type` (1 = Microsoft 365, 2 = Google Workspace).

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/companies/direct-email-settings" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

Example body (Microsoft 365):

```json
{
  "name": "Acme Corp M365 DEC",
  "tenantId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "allowedDomains": ["acmecorp.com", "acme.co.uk"],
  "type": 1
}
```

---

## POST /api/companies/direct-email-settings/test

> Tests the DEC connection by sending a test email through the customer's tenant. Send **`X-KEEPNET-Company-Id`**. Use the `resourceId` from the DEC create response.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/companies/direct-email-settings/test" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

Example body:

```json
{
  "resourceId": "<decResourceId>",
  "from": "noreply@acmecorp.com",
  "fromName": "Keepnet",
  "to": "admin@acmecorp.com",
  "message": "DEC test email",
  "tenantId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "type": 1
}
```

---

## PUT /api/companies/direct-email-settings/make-default/{resourceId}

> Sets the DEC as the default email delivery method for this company. Replace `{resourceId}` with the DEC ID. Send **`X-KEEPNET-Company-Id`**.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/companies/direct-email-settings/make-default/{resourceId}" method="put" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## Common errors

* **403 Forbidden** — Credential is not Reseller. Set Client Role = **Reseller**. <a href="../../../next-generation-product/platform/company/system-users/user-roles.md" target="_blank" rel="noopener noreferrer">Roles and permissions →</a>
* **401 Unauthorized** — Missing or invalid token. Request a new token via `POST /connect/token`.
* **400 Bad Request** — Missing required fields. For company creation: check `Name`, `CountryResourceId`, `IndustryResourceId`, etc. For SCIM: `name` is required (max 30 chars). For DEC: `name`, `tenantId`, and `allowedDomains` are required.
* **409 Conflict** — A SCIM integration or DEC with the same name already exists for this company.

{% hint style="info" %}
**Platform UI:** Configure SCIM under **Company → Company Settings → SCIM Settings**. <a href="../../../next-generation-product/platform/company/company-settings/scim-settings/README.md" target="_blank" rel="noopener noreferrer">SCIM Settings →</a>. Configure DEC under **Company → Company Settings → Direct Email Creation**. <a href="../../../next-generation-product/platform/company/company-settings/direct-email-creation/README.md" target="_blank" rel="noopener noreferrer">Direct Email Creation →</a>
{% endhint %}

**Related:** <a href="onboard-new-customer.md" target="_blank" rel="noopener noreferrer">Create a company →</a> (basic company creation). <a href="set-up-scim-for-customer.md" target="_blank" rel="noopener noreferrer">Set up SCIM for a customer →</a>. <a href="scope-api-requests-to-customer.md" target="_blank" rel="noopener noreferrer">Scope API requests to a customer →</a>.
