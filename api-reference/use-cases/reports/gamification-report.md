# Pull gamification report

Retrieve gamification data: leaderboard, points, badges, and security growth metrics via the API.

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

## Access gamification data

Gamification and leaderboard data are available through the Reports and Dashboard endpoints. Refer to the OpenAPI spec for the exact paths.

---

## Reseller: scope by Company ID

When using a Reseller credential, include the Company ID to scope the request to a specific company:

* **Header:** `X-KEEPNET-Company-Id: {companyId}`
* **Query:** `?companyId={companyId}` (when supported)

---

## Quick reference

| What you need           | Endpoint                          | Method |
| ----------------------- | --------------------------------- | ------ |
| Dashboard summary       | `/api/dashboard/summary`          | GET    |
| Widgets / reports       | Dashboard and Reports endpoints   | GET/POST |

{% hint style="info" %}
Exact endpoint paths are available in the OpenAPI spec at the bottom of the API Reference sidebar.
{% endhint %}

---

## What's next

* [Pull training reports →](training-reports.md)
* [Pull executive summaries →](executive-summaries.md)
* [Pull phishing campaign reports →](phishing-campaign-reports.md)
