# Pull callback campaign reports

Retrieve callback phishing campaign data via the API.

---

## Who can use this

| Your role       | Can use? | What you need                    |
| --------------- | -------- | -------------------------------- |
| **Company Admin** | Yes     | Token only                       |
| **Reseller**     | Yes     | Token + Company ID (for each company) |

---

## Prerequisites

* **Credential:** Company Admin or Reseller
* **Token:** OAuth2 Client Credentials flow
* **Reseller:** Company ID from [List companies with license details](../reseller/list-companies-with-license-details.md)

---

## Search callback campaigns

Use the Callback Campaign search endpoint to list campaigns with filters and pagination. Refer to the OpenAPI spec for the exact path and request body format.

---

## Reseller: scope by Company ID

When using a Reseller credential, include the Company ID to scope the request:

* **Header:** `X-KEEPNET-Company-Id: {companyId}`
* **Query:** `?companyId={companyId}` (when supported)

---

## Quick reference

| What you need           | Endpoint                          | Method |
| ----------------------- | --------------------------------- | ------ |
| Search callback campaigns | Callback Campaign search endpoint | POST   |
| Export                  | Callback Campaign search/export   | POST   |

{% hint style="info" %}
Exact endpoint paths are available in the OpenAPI spec at the bottom of the API Reference sidebar.
{% endhint %}

---

## What's next

* [Pull vishing campaign reports →](vishing-campaign-reports.md)
* [Pull phishing campaign reports →](phishing-campaign-reports.md)
* [Pull executive summaries →](executive-summaries.md)
