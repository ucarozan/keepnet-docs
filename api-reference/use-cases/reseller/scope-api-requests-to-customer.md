# Scope API requests to a customer (Reseller)

As a Reseller, you manage multiple customer companies. Many API endpoints return or act on data for **all** companies you manage. To pull reports or manage data for **one specific customer**, send the customer’s Company ID in the request.

---

## How Reseller scope works

* **Without Company ID:** Endpoints like `POST /api/companies/search` and `GET /api/companies/my` return data for all companies you (the Reseller) manage.
* **With Company ID:** To get data for a single customer (e.g. training report, phishing campaign list, target users), send the customer’s Company ID so the API scopes the response to that company.

---

## Send Company ID in the request

Use one of these:

* **Header (recommended):** `X-KEEPNET-Company-Id: <companyResourceId>`
* **Query:** `?companyId=<companyResourceId>`
* **Path:** Some endpoints include `{companyId}` or `{resourceId}` in the path (e.g. `GET /api/companies/{resourceId}`).

Get customer Company IDs from <a href="list-companies-with-license-details.md" target="_blank" rel="noopener noreferrer">List companies with license details →</a> (`POST /api/companies/search`). The response includes `resourceId` per company — use that value as `X-KEEPNET-Company-Id` or `companyId`.

---

## Where to use it

* **Reports:** Training, phishing, gamification, executive summaries, audit logs — pass Company ID to get that customer’s data. See <a href="../reports/training-reports.md" target="_blank" rel="noopener noreferrer">Pull training reports →</a>, <a href="../reports/phishing-campaign-reports.md" target="_blank" rel="noopener noreferrer">Pull phishing campaign reports →</a>, and other report use-cases.
* **Company & Users:** Add target users, enroll users in training, manage system users — use Company ID to scope the operation to one customer. See <a href="../company-users/add-target-users.md" target="_blank" rel="noopener noreferrer">Add target users →</a>, <a href="../company-users/enroll-users-in-training.md" target="_blank" rel="noopener noreferrer">Enroll users in training →</a>.

{% hint style="info" %}
**Quickstart:** Company ID usage is summarized in the <a href="../../quickstart.md" target="_blank" rel="noopener noreferrer">Quickstart →</a> under “Reseller: scope by Company ID”.
{% endhint %}

---

## Common errors

* **403 Forbidden** — Credential is not Reseller, or Company ID does not belong to a company you manage.
* **401 Unauthorized** — Missing or invalid token. Request a new token via `POST /connect/token`.
* **404 Not Found** — Invalid or unknown Company ID. Verify the ID from `POST /api/companies/search`.
