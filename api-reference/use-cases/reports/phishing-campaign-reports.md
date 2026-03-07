# Pull phishing campaign reports

Retrieve phishing campaign stats, clickers, department breakdown, templates, and delivery status via the API.

---

## Who can use this

| Your role       | Can use? | What you need                    |
| --------------- | -------- | -------------------------------- |
| **Company Admin** | Yes     | Token only                       |
| **Reseller**     | Yes     | Token + Company ID (for each company) |

---

## Common use cases

| Your question                         | Answer                                      |
| ------------------------------------- | ------------------------------------------- |
| Campaign list                          | `POST /api/phishing-simulator/phishing-campaign/search` |
| Campaign stats / summary               | Campaign summary endpoints (see OpenAPI)     |
| Who clicked?                           | Search email-clicked / campaign-clicked data |
| Emails with delivery errors            | `notDelivered`, `failedToSend` fields        |
| Department breakdown                   | Department-level report endpoints           |
| Template performance                  | Template-level aggregation                  |

---

## Prerequisites

* **Credential:** Company Admin or Reseller
* **Token:** OAuth2 Client Credentials flow
* **Reseller:** Company ID from [List companies with license details](../reseller/list-companies-with-license-details.md)

---

## Step 1: List campaigns

**Endpoint:** `POST /api/phishing-simulator/phishing-campaign/search`

Send a JSON body with `pageNumber`, `pageSize`, `orderBy`, `ascending`, and optional `filter`. Include `Authorization: Bearer <access_token>` and `Content-Type: application/json`.

{% hint style="info" %}
**Request body schema, parameters, and Try it:** See the **Phishing Campaign** section in the Endpoints API Reference (OpenAPI).
{% endhint %}

---

## Step 2: Get campaign details and reports

Use the campaign `resourceId` from the search response to fetch:

* **Summary** — stats, sent, opened, clicked
* **Department breakdown** — per-department metrics
* **Clicked users** — who clicked the phishing link
* **Delivery status** — notDelivered, failedToSend

Refer to the OpenAPI spec for exact endpoint paths and request/response schemas.

---

## Reseller: scope by Company ID

When using a Reseller credential, include the Company ID to scope the request to a specific company:

* **Header:** `X-KEEPNET-Company-Id: {companyId}`
* **Query:** `?companyId={companyId}` (when supported)

---

## Quick reference

| What you need           | Endpoint                                          | Method |
| ----------------------- | ------------------------------------------------- | ------ |
| Search campaigns        | `/api/phishing-simulator/phishing-campaign/search` | POST   |
| Export campaigns        | `/api/phishing-simulator/phishing-campaign/search/export` | POST   |
| Campaign preview        | `/api/phishing-simulator/phishing-campaign/preview/{resourceId}` | GET    |

---

## Handle errors

| HTTP | Cause                          | Action                                      |
| ---- | ------------------------------ | ------------------------------------------- |
| 403  | Reseller without Company ID     | Add Company ID to header or query           |
| 403  | Insufficient role              | Check Client Role in REST API settings      |

---

## What's next

* [Pull smishing campaign reports →](smishing-campaign-reports.md)
* [Pull training reports →](training-reports.md)
* [Pull executive summaries →](executive-summaries.md)
