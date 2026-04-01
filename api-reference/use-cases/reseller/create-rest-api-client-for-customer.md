# Create a REST API client for a customer

As a Reseller you can create a **REST API client** (Client ID / Client Secret) for a managed company so that company—or your integration—can call the Keepnet API with OAuth 2.0 client credentials. Use your Reseller token, scope the request with **`X-KEEPNET-Company-Id`**, then generate credentials and register the client. This mirrors **Company → Company Settings → REST API** in the UI; see [REST API](../../../next-generation-product/platform/company/company-settings/rest-api.md) for field meanings (IP restriction, Client Role, status).

{% hint style="warning" %}
**GitBook “Test it” / OpenAPI playground:** If **Headers** show **`Content-Type: application/json-patch+json`**, change it to **`application/json`**. The patch media type can produce **`400`** with generic **`INPUT_ERROR`** / **`Invalid request`** on **`POST /api/companies/clients`** and **`POST /api/companies/clients/search`** even when other endpoints return **`200`** with the same token.
{% endhint %}

***

## POST /api/companies/search

Get the customer’s Company ID. Each result includes **`companyResourceId`** — use that value as **`X-KEEPNET-Company-Id`** in the steps below. (Some docs refer to this value as the company’s `resourceId`; it is the same identifier.)

> Retrieves a paginated list of all companies you manage with license details. **Test it:** Authorize with Client ID/Secret, then Send — request body is pre-filled.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/companies/search" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

From the response, note **`data.results[].companyResourceId`** for the target customer.

***

## GET /api/roles

The create-client API **requires** at least one **Client Role**. List roles for the **same customer** by calling **`GET /api/roles`** with **`X-KEEPNET-Company-Id`** set to that customer’s **`companyResourceId`**. From the response, pick a role (for example **Company Admin** for that company’s integrations, or **Reseller** if your use case requires it) and copy its **`resourceId`** into **`roleResourceIdList`** when you call **`POST /api/companies/clients`**.

> Returns all roles for the company in **`data`** (array of roles with `name`, `resourceId`, etc.). **Test it:** Endpoints → **SystemRole** → **Retrieves a list of roles of company** — set **`X-KEEPNET-Company-Id`**.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/roles" method="get" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

{% hint style="warning" %}
**`POST /api/roles/search`** may return an error if the request body is incomplete (e.g. missing filter structure). Prefer **`GET /api/roles`** for this flow (pick **`roleResourceIdList`** from the list).
{% endhint %}

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
* **`statusId`** — Client status in the UI/API. **`1`** is **Active** in environments verified for this flow; use **`2`** or other values only if your tenant/UI indicates them (invalid **`statusId`** returns a validation error).
* **`roleResourceIdList`** — **Required** by the API (at least one role). Use **`resourceId`** values from **`GET /api/roles`** for that company, e.g. **`["<roleResourceIdFromGetRoles>"]`**.

**Optional:**

* **`hasIpAddressRestriction`**, **`allowedIpAddresses`** — IP allow list (see [REST API](../../../next-generation-product/platform/company/company-settings/rest-api.md)). If the playground prefills **`hasIpAddressRestriction`: true** with an empty **`allowedIpAddresses`** entry, either set **`hasIpAddressRestriction`** to **`false`** or supply **valid** IP/CIDR strings; empty strings trigger **`Invalid ip address`** in **`validationMessages`**.

> Creates a new client for the company. **Test it:** Endpoints → **Company** → **Creates a new client for company** — set **`X-KEEPNET-Company-Id`**, paste `clientId` / `clientSecret` from the generate step, set **`name`**, **`statusId`**, and **`roleResourceIdList`** from **`GET /api/roles`**.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/companies/clients" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

Example request headers:

```http
Authorization: Bearer <your_reseller_access_token>
Content-Type: application/json
X-KEEPNET-Company-Id: <customer_companyResourceId>
```

Example body (replace placeholders with values from **`generate-client-credentials`** and **`GET /api/roles`**; **`hasIpAddressRestriction`** omitted or **`false`** avoids empty-IP **`400`** errors in the playground):

```json
{
  "name": "My customer REST API client",
  "clientId": "<data.clientId from generate-client-credentials>",
  "clientSecret": "<data.clientSecret from generate-client-credentials>",
  "statusId": 1,
  "hasIpAddressRestriction": false,
  "roleResourceIdList": ["<resourceId from GET /api/roles>"]
}
```

***

## List, update, or delete clients (optional)

### POST /api/companies/clients/search

List REST API clients for the company. Send **`X-KEEPNET-Company-Id`** and **`Content-Type: application/json`**. Do **not** send **`filter`: null** — the API may respond with **`INTERNAL_SERVER_ERROR`**. Avoid **`null`** inside **`filter`** fields; use **`""`** for **`SearchInputTextValue`** and **`"AND"`** for **`Condition`**. A minimal body that returns **`200`** on **`https://api.keepnetlabs.com`**:

```json
{
  "pageNumber": 1,
  "pageSize": 10,
  "orderBy": "CreateTime",
  "ascending": false,
  "filter": {
    "Condition": "AND",
    "SearchInputTextValue": ""
  }
}
```

You can add **`FilterGroups`** (empty **`FilterItems`**) if your client or older docs require it; the minimal shape above is enough for listing.

CamelCase (`condition`, `searchInputTextValue`, …) is also accepted if your client serializes that way.

> **Test it:** Endpoints → **Company** → **Retrieves a list of all clients of company** — set **`X-KEEPNET-Company-Id`** and paste the JSON above (replace **`filter`: null** in the playground if needed).

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/companies/clients/search" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

### Other client endpoints

* **`GET /api/companies/clients/{resourceId}`** — Get one client by its **`resourceId`** (returned in the create response **`data.resourceId`**). Send **`X-KEEPNET-Company-Id`** when acting as Reseller.
* **`PUT /api/companies/clients/{resourceId}`** — Update client (same header when Reseller).
* **`DELETE /api/companies/clients/{resourceId}`** — Delete client (same header when Reseller).

Full request bodies: **Endpoints** → **Company** in the API Reference sidebar.

***

## Verification note

The full Reseller flow was exercised end-to-end against **`https://api.keepnetlabs.com`** using a Reseller **`client_credentials`** token from **`~/.zhc.env`** (or **`~/zhc.env`**): **`POST /connect/token`** → **`POST /api/companies/search`** → **`GET /api/roles`** (with **`X-KEEPNET-Company-Id`**) → **`GET /api/companies/clients/generate-client-credentials`** → **`POST /api/companies/clients`** (body included **`roleResourceIdList`** from roles, **`statusId`: 1**, **`hasIpAddressRestriction`**: **`false`**) → **`GET /api/companies/clients/{resourceId}`** → **`POST /api/companies/clients/search`** (minimal **`filter`**: **`Condition`** + **`SearchInputTextValue`**: **`""`**, **`pageSize`**: **`10`**) → **`DELETE /api/companies/clients/{resourceId}`** (cleanup).

**Last automated check** (**`2026-04-01T15:01Z`**, repo script, exit code **0**): each step printed **`OK`** through **`ALL_OK`** for `python3 scripts/test-reseller-rest-api-client-e2e.py` (including **`POST /api/companies/clients`** and **`POST /api/companies/clients/search`**).

To repeat the check locally (creates then deletes a client on the chosen company):

```bash
cd keepnet-docs && python3 scripts/test-reseller-rest-api-client-e2e.py
```

Optional environment variables: **`KEEPNET_TEST_COMPANY_RESOURCE_ID`**, **`KEEPNET_TEST_ROLE_RESOURCE_ID`**, **`KEEPNET_API_BASE_URL`** (default `https://api.keepnetlabs.com`). Credentials: **`KEEPNET_CLIENT_ID`** / **`KEEPNET_CLIENT_SECRET`** or **`CLIENT_ID`** / **`CLIENT_SECRET`** in the env file.

***

## Common errors

* **403 Forbidden** — Credential is not Reseller, or **`X-KEEPNET-Company-Id`** is not a company you manage. Use a Reseller REST API client for your own calls. [Roles and permissions →](../../../next-generation-product/platform/company/system-users/user-roles.md)
* **401 Unauthorized** — Missing or invalid token. Request a new token via **`POST /connect/token`**.
* **400 Bad Request — `POST /api/companies/clients`** — Typical when the body still has empty **`name`**, **`clientId`**, or **`clientSecret`** (use values from **`GET /api/companies/clients/generate-client-credentials`**), when **`roleResourceIdList`** is missing (**`Role should be selected`**), when **`statusId`** is invalid (try **`1`** for Active), or when **`hasIpAddressRestriction`** is **`true`** but **`allowedIpAddresses`** contains empty or invalid entries (**`Invalid ip address`**). Response may include **`validationMessages`** with these hints.
* **400 Bad Request — `POST /api/companies/clients/search`** — Often **`Content-Type: application/json-patch+json`** (switch to **`application/json`**) or a **`filter`** object that includes **`null`** for **`condition`** / **`searchInputTextValue`** / nested fields; use the sample JSON above with **`""`** and **`"AND"`** / **`"OR"`** strings, not **`null`**.
* **500 / `INTERNAL_SERVER_ERROR` on `POST /api/companies/clients/search`** — Often caused by **`"filter": null`**. Use the non-null minimal **`filter`** in **POST /api/companies/clients/search** above (**`Condition`** + **`SearchInputTextValue`**: **`""`**).

**Related:** [Scope API requests to a customer →](scope-api-requests-to-customer.md) · [Add system user for a customer →](add-system-user-for-customer.md) (same **`X-KEEPNET-Company-Id`** pattern)
