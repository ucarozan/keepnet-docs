# Pull phishing campaign user behaviors

As a **Company Admin** you can list your organization’s phishing, smishing, or quishing campaigns and pull per-user behaviors for a campaign job: who opened, clicked, or submitted data, with timestamps. Use a credential with Client Role = **Company Admin**. Company context is automatic. Do **not** send **`X-KEEPNET-Company-Id`**. The same pattern applies to **phishing**, **smishing**, and **quishing** simulators — only the base path changes.

{% hint style="info" %}
**Reseller**

If your credential has Client Role = **Reseller**, send **`X-KEEPNET-Company-Id: <companyResourceId>`** on every request below (from `POST /api/companies/search`). See [View customer's campaign list and report →](../reseller/view-customer-simulation-campaign-list-and-report.md) and [Scope API requests to a customer →](../reseller/scope-api-requests-to-customer.md).
{% endhint %}

***

## POST /api/phishing-simulator/phishing-campaign/search

Returns a paginated list of phishing campaigns for your company.

> Returns a list of the phishing campaigns. **Test it:** Authorize with Client ID/Secret, then Send — request body is pre-filled.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/phishing-simulator/phishing-campaign/search" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

Campaigns with **Mark as Test** (`excludeFromReports: true`) are excluded from dashboard and report statistics in the UI; they may still appear in API list responses. When aggregating metrics, filter or ignore items where `excludeFromReports` is `true`.

### Smishing and quishing

Same flow with a different base path:

* **Smishing:** `POST /api/smishing-simulator/smishing-campaign/search`
* **Quishing:** `POST /api/quishing-simulator/quishing-campaign/search`

***

## POST /api/phishing-simulator/phishing-campaign-job-report/search

Campaign **jobs** are run instances of a campaign. This endpoint returns jobs for reporting. From each result row, note **`phishingCampaignResourceId`** and **`instanceGroup`** for the summary and per-user searches below. For this endpoint, use **`orderBy`: `"Name"`** in the request body (`"CreateTime"` can return **400 Invalid request**).

> Retrieves campaign job's list. **Test it:** Authorize with Client ID/Secret, then Send — request body is pre-filled.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/phishing-simulator/phishing-campaign-job-report/search" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

From the response, pick a job and note `phishingCampaignResourceId` and `instanceGroup`. Example: `"phishingCampaignResourceId": "xHJe83nmj0W7"`, `"instanceGroup": 1` (use values from your response; dummy IDs in examples — H8d).

***

## GET /api/phishing-simulator/phishing-campaign-job-report/summary/{resourceId}/{instanceGroup}

Returns aggregate metrics for one campaign job (sent, opened, clicked, submitted counts, and related summary fields). Path **`resourceId`** is the job row’s **`phishingCampaignResourceId`** (not a target-user ID).

> Returns campaign job summary. **Test it:** Set path `resourceId` and `instanceGroup` from the job search response.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/phishing-simulator/phishing-campaign-job-report/summary/{resourceId}/{instanceGroup}" method="get" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

Example: `GET /api/phishing-simulator/phishing-campaign-job-report/summary/xHJe83nmj0W7/1`

***

## POST /api/phishing-simulator/phishing-campaign-job-report/{searchType}/search/{resourceId}/{instanceGroup}

Returns a paginated list of target users for the campaign job filtered by behavior. Path **`resourceId`** = **`phishingCampaignResourceId`** from the job search row; **`instanceGroup`** = **`instanceGroup`** from the same row. Common **`searchType`** values: `Opened`, `Clicked`, `All`, `NoResponse`, `Reported`, `AttachmentOpened`, `Replied`. For **submitted** users, use `All` and read `submittedCount` / `lastSubmittedTime`; `Submitted` is not valid as `searchType` (**400**). Per-user field names are in **Endpoints** → **PhishingCampaignJobReport**.

> Search Phishing Campaign Users. **Test it:** Set path parameters from the job search response; request body is pre-filled.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/phishing-simulator/phishing-campaign-job-report/{searchType}/search/{resourceId}/{instanceGroup}" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

Example: `POST /api/phishing-simulator/phishing-campaign-job-report/Opened/search/xHJe83nmj0W7/1`. Paginate until `pageNumber` reaches `totalNumberOfPages` or `results` is empty. From a user row, note **`resourceId`** for the email detail endpoints below.

***

## POST /api/phishing-simulator/phishing-campaign-job-report/search-email-opened/{resourceId}

Event-level **opened** detail for one target user. Path **`resourceId`** is the user’s **`resourceId`** from the behavior search above, not `phishingCampaignResourceId`.

> Search Phishing Campaign User Email Opened. **Test it:** Set path `resourceId` from the user list; request body is pre-filled.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/phishing-simulator/phishing-campaign-job-report/search-email-opened/{resourceId}" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

***

## POST /api/phishing-simulator/phishing-campaign-job-report/search-email-clicked/{resourceId}

Event-level **clicked** detail for the same user. Same path **`resourceId`** as the opened endpoint.

> Search Phishing Campaign User Email Clicked. **Test it:** Set path `resourceId` from the user list; request body is pre-filled.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/phishing-simulator/phishing-campaign-job-report/search-email-clicked/{resourceId}" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

***

## POST /api/phishing-simulator/phishing-campaign-job-report/search-email-submitted/{resourceId}

Event-level **submitted** detail for the same user. Same path **`resourceId`** as above. Using the campaign job ID here returns **404** (`Phishing campaign instance user not found`).

> Search Phishing Campaign User Email Submitted. **Test it:** Set path `resourceId` from the user list; request body is pre-filled.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/phishing-simulator/phishing-campaign-job-report/search-email-submitted/{resourceId}" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

***

## Export

* **Export job report list:** `POST /api/phishing-simulator/phishing-campaign-job-report/search/export` — same body shape as job search (see **Endpoints** → **PhishingCampaignJobReport**).
* **Export per behavior list:** `POST /api/phishing-simulator/phishing-campaign-job-report/{searchType}/search/export/{resourceId}/{instanceGroup}` (for example `Opened` with the same `phishingCampaignResourceId` and `instanceGroup`).

Smishing and quishing have equivalent export paths under `smishing-simulator` and `quishing-simulator`.

***

## Common errors

* **403 Forbidden** — Wrong Client Role or missing permission. Set Client Role = **Company Admin** in **Company → Company Settings → REST API**. [Roles and permissions →](../../../next-generation-product/platform/company/system-users/user-roles.md)
* **401 Unauthorized** — Missing or invalid token. Request a new token via `POST /connect/token`.
* **400 Bad Request** — Invalid search body. For `phishing-campaign-job-report/search`, use **`orderBy`: `"Name"`** and a non-null **filter** (`Condition`, `SearchInputTextValue`: `""`). Do not send `filter: null`.
* **404 Not Found** — Wrong path ID. Use **`phishingCampaignResourceId`** + **`instanceGroup`** for summary and `{searchType}/search`; use the user’s **`resourceId`** for `search-email-*` endpoints.

**Related:** [Quickstart →](../../quickstart.md). **Reseller:** [View customer's campaign list and report →](../reseller/view-customer-simulation-campaign-list-and-report.md). Endpoint details: **Endpoints** → **PhishingCampaign**, **PhishingCampaignJobReport**.
