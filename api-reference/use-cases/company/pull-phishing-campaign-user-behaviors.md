# Pull phishing campaign user behaviors

As a **Company Admin** you can list your organization’s phishing, smishing, or quishing campaigns and pull per-user behaviors for a campaign job: who opened, clicked, or submitted data, with timestamps. Use a credential with Client Role = **Company Admin**. Company context is automatic. Do **not** send **`X-KEEPNET-Company-Id`**.

The same endpoints apply to **phishing**, **smishing**, and **quishing** simulators; only the base path changes.

{% hint style="info" %}
**Reseller**

If your credential has Client Role = **Reseller**, send **`X-KEEPNET-Company-Id: <companyResourceId>`** on every request below (get the ID from `POST /api/companies/search`; use the `companyResourceId` field). Do not use `GET /api/companies/my` for customer scope. See [View customer's campaign list and report →](../reseller/view-customer-simulation-campaign-list-and-report.md) and [Scope API requests to a customer →](../reseller/scope-api-requests-to-customer.md).
{% endhint %}

***

## GET /api/companies/my

Confirms your token and company context. **Company Admin:** response is your company (single record). **Reseller:** response may list companies you manage. Use `POST /api/companies/search` and **`X-KEEPNET-Company-Id`** instead for customer-scoped campaign data.

> Returns your company (Company Admin) or companies you manage (Reseller). **Test it:** Authorize with Client ID/Secret, then Send. No request body.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/companies/my" method="get" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

***

## POST /api/phishing-simulator/phishing-campaign/search

Returns a paginated list of phishing campaigns for your company. Response items include campaign identifiers you use in later steps (for example campaign name and related resource fields; see the response schema in **Endpoints**).

> Returns a list of the phishing campaigns. **Company Admin:** no Company ID header. **Reseller:** send **`X-KEEPNET-Company-Id: <companyResourceId>`**. Request body: `pageNumber`, `pageSize`, `orderBy`, `ascending`, `filter`. **Test it:** Endpoints → **PhishingCampaign** → **Returns a list of the phishing campaigns**; use dummy data (H8d).

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/phishing-simulator/phishing-campaign/search" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

Example request headers (**Company Admin**):

```http
Authorization: Bearer <your_access_token>
Content-Type: application/json
```

Example body (dummy data, first page):

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

Campaigns marked **Mark as Test** (`excludeFromReports: true`) are excluded from dashboard and report statistics in the platform UI; they may still appear in API list responses. When aggregating metrics for reporting, filter or ignore items where `excludeFromReports` is `true`.

***

## POST /api/phishing-simulator/phishing-campaign-job-report/search

Campaign **jobs** are run instances of a campaign. This endpoint returns jobs for reporting. From each result row, note **`phishingCampaignResourceId`** and **`instanceGroup`**. You need both for summary and per-user behavior searches below.

> Retrieves campaign job's list. **Company Admin:** no Company ID header. **Reseller:** send **`X-KEEPNET-Company-Id: <companyResourceId>`**. **Test it:** Endpoints → **PhishingCampaignJobReport** → **Retrieves campaign job's list**.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/phishing-simulator/phishing-campaign-job-report/search" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

Example body (verified against `https://api.keepnetlabs.com`): use **`orderBy`: `"Name"`**. `"CreateTime"` can return **400 Invalid request** for this endpoint.

```json
{
  "pageNumber": 1,
  "pageSize": 20,
  "orderBy": "Name",
  "ascending": false,
  "filter": {
    "Condition": "AND",
    "SearchInputTextValue": ""
  }
}
```

Example row fields used in later steps: `"phishingCampaignResourceId": "xHJe83nmj0W7"`, `"instanceGroup": 1` (dummy IDs; use values from your response).

***

## GET /api/phishing-simulator/phishing-campaign-job-report/summary/{resourceId}/{instanceGroup}

Returns aggregate metrics for one campaign job (sent, opened, clicked, submitted counts, and related summary fields).

> Returns campaign job summary. Path **`resourceId`** is the job row’s **`phishingCampaignResourceId`** (not a target-user ID). **Reseller:** send **`X-KEEPNET-Company-Id: <companyResourceId>`**.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/phishing-simulator/phishing-campaign-job-report/summary/{resourceId}/{instanceGroup}" method="get" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

Example: `GET /api/phishing-simulator/phishing-campaign-job-report/summary/xHJe83nmj0W7/1` with **Company Admin** headers only (see above).

***

## POST /api/phishing-simulator/phishing-campaign-job-report/{searchType}/search/{resourceId}/{instanceGroup}

Returns a paginated list of **target users** for the campaign job filtered by behavior. Use this for integration exports (opened / clicked / submitted / full list).

| `searchType` (path) | Use for |
| --- | --- |
| `Opened` | Users who opened the email |
| `Clicked` | Users who clicked |
| `All` | All users with behavior fields (opened, clicked, submitted counts and timestamps) |
| `NoResponse` | Users with no response |
| `Reported` | Users who reported |
| `AttachmentOpened` | Attachment opened |
| `Replied` | Users who replied |

Path **`resourceId`** = **`phishingCampaignResourceId`** from the job search row. Path **`instanceGroup`** = **`instanceGroup`** from the same row.

> Search Phishing Campaign Users. **Test it:** Endpoints → **PhishingCampaignJobReport** → **Search Phishing Campaign Users**.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/phishing-simulator/phishing-campaign-job-report/{searchType}/search/{resourceId}/{instanceGroup}" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

Example: `POST /api/phishing-simulator/phishing-campaign-job-report/Opened/search/xHJe83nmj0W7/1`

Example body:

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

Per-user fields in the response (phishing) include:

| Field | Description |
| --- | --- |
| `email`, `firstName`, `lastName`, `department` | User identity |
| `lastOpenedTime`, `openedCount` | Email opened (timestamp + count) |
| `lastClickedTime`, `clickedCount` | Link clicked |
| `lastSubmittedTime`, `submittedCount` | Data submitted on landing page |
| `lastSendingTime` | Message sent time |
| `phishingScenarioName` | Scenario name |

Paginate until `pageNumber` reaches `totalNumberOfPages` or `results` is empty.

### Who opened / clicked / submitted (three calls)

* **Opened:** `POST .../Opened/search/{phishingCampaignResourceId}/{instanceGroup}`
* **Clicked:** `POST .../Clicked/search/{phishingCampaignResourceId}/{instanceGroup}`
* **Submitted (data):** use `POST .../All/search/...` and read users where `submittedCount` > 0 or `lastSubmittedTime` is set. The path value `Submitted` is **not** valid for `searchType` (returns **400** on live API).

***

## POST /api/phishing-simulator/phishing-campaign-job-report/search-email-opened/{resourceId}

## POST /api/phishing-simulator/phishing-campaign-job-report/search-email-clicked/{resourceId}

## POST /api/phishing-simulator/phishing-campaign-job-report/search-email-submitted/{resourceId}

These endpoints return event-level detail for **one target user**. Path **`resourceId`** is the user’s **`resourceId`** from a user list row (`Opened` / `Clicked` / `All` search), not `phishingCampaignResourceId`. Using the campaign job ID here returns **404** (`Phishing campaign instance user not found`).

> Search Phishing Campaign User Email Opened / Clicked / Submitted. **Test it:** Endpoints → **PhishingCampaignJobReport**.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/phishing-simulator/phishing-campaign-job-report/search-email-opened/{resourceId}" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/phishing-simulator/phishing-campaign-job-report/search-email-clicked/{resourceId}" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/phishing-simulator/phishing-campaign-job-report/search-email-submitted/{resourceId}" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

Example body (same minimal search shape):

```json
{
  "pageNumber": 1,
  "pageSize": 20,
  "orderBy": "Email",
  "ascending": false,
  "filter": {
    "Condition": "AND",
    "SearchInputTextValue": ""
  }
}
```

Submitted detail rows include `submittedTime` (see **Endpoints** schema).

***

## Export

* **Export job report list:** `POST /api/phishing-simulator/phishing-campaign-job-report/search/export`. Same body shape as job search; see **Endpoints** → **PhishingCampaignJobReport** → **Export**.
* **Export per behavior list:** `POST /api/phishing-simulator/phishing-campaign-job-report/{searchType}/search/export/{resourceId}/{instanceGroup}` (for example `Opened` with the same `phishingCampaignResourceId` and `instanceGroup`).

**Reseller:** send **`X-KEEPNET-Company-Id`** on export calls.

***

### Smishing and quishing

Same flow with a different base path (and the same **`searchType`** / job ID pattern):

* **Smishing:** `.../smishing-campaign/search`, `.../smishing-campaign-job-report/search`, `.../summary/{resourceId}/{instanceGroup}`, `.../{searchType}/search/{resourceId}/{instanceGroup}`
* **Quishing:** `.../quishing-campaign/search`, `.../quishing-campaign-job-report/search`, equivalent report paths under `quishing-simulator`

***

## Common errors

* **403 Forbidden:** Wrong Client Role or missing permission. **Company Admin:** set Client Role = **Company Admin** in **Company → Company Settings → REST API**. **Reseller:** set Client Role = **Reseller** and send **`X-KEEPNET-Company-Id`** for the customer that owns the campaign. [Roles and permissions →](../../../next-generation-product/platform/company/system-users/user-roles.md)
* **401 Unauthorized:** Missing or invalid token. Request a new token via `POST /connect/token` (form-encoded body).
* **400 Bad Request:** Invalid search body. For `phishing-campaign-job-report/search`, use **`orderBy`: `"Name"`** and a non-null **filter** object (`Condition`, `SearchInputTextValue`: `""`). Do not send `filter: null`.
* **404 Not Found:** Wrong ID in the path. Use **`phishingCampaignResourceId`** + **`instanceGroup`** for summary and `{searchType}/search`; use the user’s **`resourceId`** for `search-email-*` endpoints.

**Related:** [Quickstart →](../../quickstart.md). **Reseller (customer scope):** [View customer's campaign list and report →](../reseller/view-customer-simulation-campaign-list-and-report.md). Endpoint schemas: **Endpoints** → **PhishingCampaign**, **PhishingCampaignJobReport**.

***

## Verification

Live checks against `https://api.keepnetlabs.com` (script: `scripts/test-company-phishing-campaign-report-e2e.py`; credentials from `~/.zhc.env`):

| Step | HTTP |
| --- | --- |
| `POST /connect/token` | 200 |
| `POST /api/phishing-simulator/phishing-campaign/search` | 200 |
| `POST /api/phishing-simulator/phishing-campaign-job-report/search` (`orderBy`: `Name`) | 200 |
| `GET .../summary/{phishingCampaignResourceId}/{instanceGroup}` | 200 |
| `POST .../Opened/search/{phishingCampaignResourceId}/{instanceGroup}` | 200 |
| `POST .../Clicked/search/...` | 200 |
| `POST .../All/search/...` | 200 |
| `POST .../search-email-opened/{userResourceId}` | 200 |
| `POST .../search-email-clicked/{userResourceId}` | 200 |
| `POST .../search-email-submitted/{userResourceId}` | 200 |
| `POST .../phishing-campaign-job-report/search/export` | 200 |
| `POST .../Opened/search/export/{phishingCampaignResourceId}/{instanceGroup}` | 200 |

**Verified (UTC):** 2026-05-21T18:49:56Z. Reseller-scoped run used **`X-KEEPNET-Company-Id`**; Company Admin clients omit that header.
