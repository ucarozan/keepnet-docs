# Pull phishing campaign user behaviors

As a **Company Admin** you can list your organization’s phishing, smishing, or quishing campaigns and pull per-user behaviors for a campaign job: who opened, clicked, or submitted data, with timestamps. Use a credential with Client Role = **Company Admin**. Company context is automatic. Do **not** send **`X-KEEPNET-Company-Id`**. The same pattern applies to **phishing**, **smishing**, and **quishing** simulators — only the base path changes.

{% hint style="info" %}
**Reseller**

If your credential has Client Role = **Reseller**, send **`X-KEEPNET-Company-Id: <companyResourceId>`** on every request below (from `POST /api/companies/search`). See [View customer's campaign list and report →](../reseller/view-customer-simulation-campaign-list-and-report.md) and [Scope API requests to a customer →](../reseller/scope-api-requests-to-customer.md).
{% endhint %}

***

## Flow at a glance

Use this sequence to reproduce a **Campaign Report** in the platform UI (for example `https://dash.keepnetlabs.com/reports/campaign-reports/campaign-report/vFuH7UsYF5NP/1`).

| Platform URL segment | API value |
| --- | --- |
| `.../campaign-report/{id}/{group}` | Path **`resourceId`** = job row **`phishingCampaignResourceId`** (not the target-user `resourceId`) |
| `{group}` | Path **`instanceGroup`** (integer, often `1`) |

**Typical integration (10 HTTP calls)** — one campaign job, one target user, event detail included:

| Step | Method | Endpoint | Read from response |
| --- | --- | --- | --- |
| 0 | POST | `/connect/token` | `access_token` → `Authorization: Bearer ...` on all following calls |
| 1 | POST | `/api/phishing-simulator/phishing-campaign/search` | Confirm campaign `resourceId` (optional if you already have IDs from the UI) |
| 2 | POST | `/api/phishing-simulator/phishing-campaign-job-report/search` | **`phishingCampaignResourceId`**, **`instanceGroup`** for the job |
| 3 | GET | `/api/phishing-simulator/phishing-campaign-job-report/summary/{resourceId}/{instanceGroup}` | Dashboard-style totals (`scenarioStats`, `campaignInfo`) |
| 4 | POST | `.../Opened/search/{resourceId}/{instanceGroup}` | Users who opened; per-user `resourceId`, `lastOpenedTime` |
| 5 | POST | `.../Clicked/search/{resourceId}/{instanceGroup}` | Users who clicked; `lastClickedTime` |
| 6 | POST | `.../All/search/{resourceId}/{instanceGroup}` | Full user row; **`submittedCount`**, **`lastSubmittedTime`** (submitted users — do not use `searchType=Submitted`, it returns **400**) |
| 7 | POST | `.../search-email-opened/{resourceId}` | Event-level open times (path **`resourceId`** = user from step 4–6) |
| 8 | POST | `.../search-email-clicked/{resourceId}` | Event-level click times |
| 9 | POST | `.../search-email-submitted/{resourceId}` | Event-level submit times and masked `submittedData` |

**Lean integration (9 HTTP calls):** use step 6 only with **`searchType`: `All`** instead of separate Opened + Clicked + All (steps 4–6 collapse to one call). You still need steps 7–9 for event-level detail.

**Optional (+2 HTTP):** [Export](#export) — CSV export of the job list or a behavior list.

**Headers (every call after step 0):**

```http
Authorization: Bearer <access_token>
Content-Type: application/json
```

Company Admin: do **not** send `X-KEEPNET-Company-Id`.

***

## Step 0 — POST /connect/token

Request a Bearer token before any API call. See [Quickstart → Request an access token](../../quickstart.md).

> **Test it:** Quickstart tab or `POST https://api.keepnetlabs.com/connect/token` with form body `grant_type=client_credentials`, `client_id`, `client_secret`.

***

## Step 1 — POST /api/phishing-simulator/phishing-campaign/search

Returns a paginated list of phishing campaigns for your company. Use this to find a campaign `resourceId` when you do not already have it from the dashboard URL.

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

## Step 2 — POST /api/phishing-simulator/phishing-campaign-job-report/search

Campaign **jobs** are run instances of a campaign. This endpoint returns jobs for reporting. From the row that matches your dashboard report, note **`phishingCampaignResourceId`** and **`instanceGroup`** for steps 3–9. Use **`orderBy`: `"Name"`** (`"CreateTime"` can return **400 Invalid request**).

> Retrieves campaign job's list. **Test it:** Authorize with Client ID/Secret, then Send — request body is pre-filled.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/phishing-simulator/phishing-campaign-job-report/search" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

From the response, pick a job and note `phishingCampaignResourceId` and `instanceGroup`. Example: `"phishingCampaignResourceId": "vFuH7UsYF5NP"`, `"instanceGroup": 1` for `.../campaign-report/vFuH7UsYF5NP/1` (use values from your response; dummy IDs — H8d).

***

## Step 3 — GET /api/phishing-simulator/phishing-campaign-job-report/summary/{resourceId}/{instanceGroup}

Returns aggregate metrics for one campaign job (sent, opened, clicked, submitted counts). Aligns with the top of the **Campaign Report** page (`scenarioStats`, delivery counts).

> Returns campaign job summary. **Test it:** Set path `resourceId` = `phishingCampaignResourceId` and `instanceGroup` from step 2.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/phishing-simulator/phishing-campaign-job-report/summary/{resourceId}/{instanceGroup}" method="get" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

Example: `GET /api/phishing-simulator/phishing-campaign-job-report/summary/vFuH7UsYF5NP/1`

***

## Steps 4–6 — POST /api/phishing-simulator/phishing-campaign-job-report/{searchType}/search/{resourceId}/{instanceGroup}

Returns a paginated list of target users for the campaign job filtered by behavior. Path **`resourceId`** = **`phishingCampaignResourceId`** from step 2; **`instanceGroup`** = **`instanceGroup`** from step 2.

| Step | `searchType` | Use for |
| --- | --- | --- |
| 4 | `Opened` | Users who opened the message |
| 5 | `Clicked` | Users who clicked the link |
| 6 | `All` | All users with behavior fields; use for **submitted** (`submittedCount` > 0 or `lastSubmittedTime` set) |

Other valid values: `NoResponse`, `Reported`, `AttachmentOpened`, `Replied`. **`Submitted`** as `searchType` is **not** valid (**400**).

For **lean** integrations, call step 6 only (`All`) and skip steps 4–5.

> Search Phishing Campaign Users. **Test it:** Set path parameters from step 2; request body is pre-filled.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/phishing-simulator/phishing-campaign-job-report/{searchType}/search/{resourceId}/{instanceGroup}" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

Example: `POST /api/phishing-simulator/phishing-campaign-job-report/Opened/search/vFuH7UsYF5NP/1`. Paginate until `pageNumber` reaches `totalNumberOfPages` or `results` is empty. From each user row, note **`resourceId`** (email address fields: `email`, `lastOpenedTime`, `lastClickedTime`, `lastSubmittedTime`) for steps 7–9.

***

## Step 7 — POST /api/phishing-simulator/phishing-campaign-job-report/search-email-opened/{resourceId}

Event-level **opened** detail for one target user. Path **`resourceId`** is the user’s **`resourceId`** from steps 4–6, **not** `phishingCampaignResourceId`.

> Search Phishing Campaign User Email Opened. **Test it:** Set path `resourceId` from the user list; request body is pre-filled.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/phishing-simulator/phishing-campaign-job-report/search-email-opened/{resourceId}" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

***

## Step 8 — POST /api/phishing-simulator/phishing-campaign-job-report/search-email-clicked/{resourceId}

Event-level **clicked** detail for the same user (same path **`resourceId`** as step 7).

> Search Phishing Campaign User Email Clicked. **Test it:** Set path `resourceId` from the user list; request body is pre-filled.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/phishing-simulator/phishing-campaign-job-report/search-email-clicked/{resourceId}" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

***

## Step 9 — POST /api/phishing-simulator/phishing-campaign-job-report/search-email-submitted/{resourceId}

Event-level **submitted** detail for the same user. Using the campaign job ID (`phishingCampaignResourceId`) in this path returns **404** (`Phishing campaign instance user not found`).

> Search Phishing Campaign User Email Submitted. **Test it:** Set path `resourceId` from the user list; request body is pre-filled.

{% openapi src="../../../.gitbook/assets/keepnet-api-spec.json" path="/api/phishing-simulator/phishing-campaign-job-report/search-email-submitted/{resourceId}" method="post" expanded="true" %}
[keepnet-api-spec.json](../../../.gitbook/assets/keepnet-api-spec.json)
{% endopenapi %}

***

## Export

Optional steps after the flow above (not required to match the in-app report UI).

* **Export job report list:** `POST /api/phishing-simulator/phishing-campaign-job-report/search/export` — same body shape as step 2 (see **Endpoints** → **PhishingCampaignJobReport**). Response is **CSV** (binary), not JSON.
* **Export per behavior list:** `POST /api/phishing-simulator/phishing-campaign-job-report/{searchType}/search/export/{resourceId}/{instanceGroup}` (for example `Opened` with the same IDs from step 2).

Smishing and quishing have equivalent export paths under `smishing-simulator` and `quishing-simulator`.

***

## Common errors

* **403 Forbidden** — Wrong Client Role or missing permission. Set Client Role = **Company Admin** in **Company → Company Settings → REST API**. [Roles and permissions →](../../../next-generation-product/platform/company/system-users/user-roles.md)
* **401 Unauthorized** — Missing or invalid token. Request a new token via `POST /connect/token` (step 0).
* **400 Bad Request** — Invalid search body. For step 2, use **`orderBy`: `"Name"`** and a non-null **filter** (`Condition`, `SearchInputTextValue`: `""`). Do not send `filter: null`. Do not use `searchType=Submitted` in steps 4–6.
* **404 Not Found** — Wrong path ID. Use **`phishingCampaignResourceId`** + **`instanceGroup`** for steps 3 and 4–6; use the user’s **`resourceId`** for steps 7–9.

**Related:** [Quickstart →](../../quickstart.md). **Reseller:** [View customer's campaign list and report →](../reseller/view-customer-simulation-campaign-list-and-report.md). Endpoint details: **Endpoints** → **PhishingCampaign**, **PhishingCampaignJobReport**.
