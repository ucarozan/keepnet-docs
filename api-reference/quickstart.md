# Quickstart

Get a token and make your first API call in three steps.

---

## Before you begin

Generate **Client ID** and **Client Secret** from the platform:

{% hint style="info" %}
**Platform UI:** Go to **Company → Company Settings → REST API** and click **+ NEW**.\
[REST API Settings →](https://doc.keepnetlabs.com/next-generation-product/platform/company/company-settings/rest-api)
{% endhint %}

---

## Step 1: Request an access token

Send a `POST` request to `https://api.keepnetlabs.com/connect/token` with OAuth2 client credentials (`grant_type=client_credentials`, `client_id`, `client_secret`, `scope=api1`).

{% hint style="info" %}
**Request format, parameters, and Try it:** See the [Authentication](authentication.md) section or the **Endpoints** API Reference (OpenAPI) in the sidebar. All request/response details are maintained in the spec and update automatically.
{% endhint %}

---

## Step 2: Call an endpoint

Use the `access_token` from Step 1 in the `Authorization: Bearer <token>` header. Example: list trainings from Awareness Educator.

{% hint style="info" %}
**Exact path, parameters, request/response schema, and Try it:** See the **Awareness Educator** or **Training** section in the **Endpoints** API Reference (OpenAPI) in the sidebar. The spec is the single source of truth for all endpoints.
{% endhint %}

---

## Step 3: Explore use cases

| What you want to do              | Use case                                      |
| -------------------------------- | --------------------------------------------- |
| Pull phishing campaign reports   | [Pull phishing campaign reports →](use-cases/reports/phishing-campaign-reports.md) |
| List companies (Reseller)        | [List companies with license details →](use-cases/reseller/list-companies-with-license-details.md) |
| Export audit logs to SIEM       | [Export audit logs to SIEM →](use-cases/reports/export-audit-logs-to-siem.md) |
| Add target users                | [Add target users →](use-cases/company-users/add-target-users.md) |

---

## What's next

* [Authenticate your requests →](authentication.md)
* [Pull phishing campaign reports →](use-cases/reports/phishing-campaign-reports.md)
