# Pull executive summaries

Retrieve executive summary reports: Email Phishing, SMS Phishing, Voice Phishing, and Awareness Educator summaries via the API.

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

## Available executive reports

| Report type                    | Description                                      |
| ------------------------------ | ------------------------------------------------ |
| Email Phishing Executive Summary | Phishing Simulator high-level metrics          |
| SMS Phishing Executive Summary  | Smishing Simulator high-level metrics           |
| Voice Phishing Executive Summary | Vishing Simulator high-level metrics          |
| Awareness Educator Executive Summary | Training completion and enrollment overview |

---

## Access via Advanced Reports

Executive summaries are available through the Advanced Reports endpoints. Refer to the OpenAPI spec for the exact paths and request formats.

---

## Reseller: scope by Company ID

When using a Reseller credential, include the Company ID to pull executive summaries for each managed company:

* **Header:** `X-KEEPNET-Company-Id: {companyId}`
* **Query:** `?companyId={companyId}` (when supported)

---

## Quick reference

| What you need           | Endpoint                          | Method |
| ----------------------- | --------------------------------- | ------ |
| Advanced reports        | Advanced Reports endpoints        | POST   |
| Export                  | Advanced Reports search/export    | POST   |

{% hint style="info" %}
Exact endpoint paths are available in the OpenAPI spec at the bottom of the API Reference sidebar.
{% endhint %}

---

## What's next

* [Pull phishing campaign reports →](phishing-campaign-reports.md)
* [Pull training reports →](training-reports.md)
* [Pull gamification report →](gamification-report.md)
