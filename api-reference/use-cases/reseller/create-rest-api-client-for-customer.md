# Create a REST API client for a customer

As a Reseller you can create a **REST API client** (Client ID / Client Secret) for a managed company so that company—or your integration—can call the Keepnet API with OAuth 2.0 client credentials. Use your Reseller token, scope the request with **`X-KEEPNET-Company-Id`**, then generate credentials and register the client. This mirrors **Company → Company Settings → REST API** in the UI; see [REST API](../../../next-generation-product/platform/company/company-settings/rest-api.md) for field meanings (IP restriction, Client Role, status).

***

## POST /api/companies/search

Get the customer’s Company ID. Each result includes **`companyResourceId`** — use that value as **`X-KEEPNET-Company-Id`** in the steps below. (Some docs refer to this value as the company’s `resourceId`; it is the same identifier.)

> Retrieves a paginated list of all companies you manage with license details. **Test it:** Authorize with Client ID/Secret, then Send — request body is pre-filled.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/companies/search" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

From the response, note **`data.results[].companyResourceId`** for the target customer.

***

## GET /api/companies/clients/generate-client-credentials

Generate a **Client ID** and **Client Secret** pair for the next step. You must send the customer’s Company ID in **`X-KEEPNET-Company-Id`** so the credentials are created in that company’s context.

> Returns generated `clientId` and `clientSecret` in **`data`**. **Test it:** Endpoints → **Company** → **Retrieves generated client credentials** — set **`X-KEEPNET-Company-Id`** to a `companyResourceId` from companies/search.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/companies/clients/generate-client-credentials" method="get" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

Store **`data.clientSecret`** securely; it may not be shown again. Use **`data.clientId`** and **`data.clientSecret`** in the body of `POST /api/companies/clients`.

***

## POST /api/companies/clients

Register the REST API client for that company. Send **`X-KEEPNET-Company-Id`** with the same customer Company ID.

**Required body fields (see Endpoints for full schema):**

* **`name`** — Display name for this REST API configuration (1–64 characters).
* **`clientId`** — From `generate-client-credentials` **`data.clientId`**.
* **`clientSecret`** — From `generate-client-credentials` **`data.clientSecret`**.
* **`statusId`** — Client status (e.g. active vs inactive). Use the same integer values as in the UI; if you have an existing client for that company, you can copy **`statusId`** from **`POST /api/companies/clients/search`**. Otherwise confirm the correct value in **Endpoints** → **Company** or the UI.

**Optional:**

* **`hasIpAddressRestriction`**, **`allowedIpAddresses`** — IP allow list (see [REST API](../../../next-generation-product/platform/company/company-settings/rest-api.md)).
* **`roleResourceIdList`** — API **Client Role** (e.g. Reseller, Company Admin, or custom role resource IDs).

> Creates a new client for the company. **Test it:** Endpoints → **Company** → **Creates a new client for company** — set **`X-KEEPNET-Company-Id`**, paste `clientId` / `clientSecret` from the generate step, set **`name`** and **`statusId`**.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/companies/clients" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

Example request headers:

```http
Authorization: Bearer <your_reseller_access_token>
Content-Type: application/json
X-KEEPNET-Company-Id: <customer_companyResourceId>
```

***

## List, update, or delete clients (optional)

* **`POST /api/companies/clients/search`** — List REST API clients for the company; send **`X-KEEPNET-Company-Id`**. Use **`pageNumber`**, **`pageSize`**, optional **`filter`**, **`orderBy`**, **`ascending`**.
* **`GET /api/companies/clients/{resourceId}`** — Get one client by its **`resourceId`** (from search). Send **`X-KEEPNET-Company-Id`** when acting as Reseller.
* **`PUT /api/companies/clients/{resourceId}`** — Update client (same header when Reseller).
* **`DELETE /api/companies/clients/{resourceId}`** — Delete client (same header when Reseller).

Full request bodies: **Endpoints** → **Company** in the API Reference sidebar.

***

## Verification note

The Reseller flow **token → `POST /api/companies/search` → `GET /api/companies/clients/generate-client-credentials` with `X-KEEPNET-Company-Id`** was exercised against `https://api.keepnetlabs.com` and returned HTTP 200 with **`data.clientId`** and **`data.clientSecret`**. **`POST /api/companies/clients`** was not executed in that run to avoid creating clients on a live tenant; validate create/update on a non-production company before production use.

***

## Common errors

* **403 Forbidden** — Credential is not Reseller, or **`X-KEEPNET-Company-Id`** is not a company you manage. Use a Reseller REST API client for your own calls. [Roles and permissions →](../../../next-generation-product/platform/company/system-users/user-roles.md)
* **401 Unauthorized** — Missing or invalid token. Request a new token via **`POST /connect/token`**.
* **400 Bad Request** — Missing required fields (`name`, `clientId`, `clientSecret`, `statusId`) or invalid lengths; see **Endpoints** → **Company** → **Creates a new client for company**.

**Related:** [Scope API requests to a customer →](scope-api-requests-to-customer.md) · [Add system user for a customer →](add-system-user-for-customer.md) (same **`X-KEEPNET-Company-Id`** pattern)
