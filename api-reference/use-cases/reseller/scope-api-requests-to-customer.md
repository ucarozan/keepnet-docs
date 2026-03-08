# Scope API requests to a customer

As a Reseller you manage multiple customer companies. Most list/report endpoints return data for **all** companies you manage. To get or change data for **one specific customer**, send that customer’s Company ID in the request. This page explains how Reseller scope works and where to pass Company ID.

---

## How Reseller scope works

* **Without Company ID:** Endpoints such as `POST /api/companies/search` and `GET /api/companies/my` return data for every company you (the Reseller) manage.
* **With Company ID:** To limit results or actions to a single customer (e.g. training report, phishing campaigns, target users), send the customer’s Company ID so the API scopes the response or operation to that company.

---

## How to send Company ID

Use one of these:

* **Header (recommended):** `X-KEEPNET-Company-Id: <companyResourceId>`
* **Query:** `?companyId=<companyResourceId>`
* **Path:** Some endpoints use `{companyId}` or `{resourceId}` in the path (e.g. `GET /api/companies/{resourceId}`).

Obtain customer Company IDs from <a href="list-companies-with-license-details.md" target="_blank" rel="noopener noreferrer">List companies with license details →</a> (`POST /api/companies/search`). The response includes `resourceId` per company — use that as `X-KEEPNET-Company-Id` or `companyId`. Use dummy/placeholder IDs in examples (H8d).

---

## Where to use Company ID

* **Reports:** Training, phishing, gamification, executive summaries, audit logs — pass Company ID to get that customer’s data. <a href="view-customer-enrollment-list-and-report.md" target="_blank" rel="noopener noreferrer">View customer's training enrollment list and report →</a>, <a href="view-customer-simulation-campaign-list-and-report.md" target="_blank" rel="noopener noreferrer">View customer's simulation campaign list and report →</a>, <a href="../reports/training-reports.md" target="_blank" rel="noopener noreferrer">Pull training reports →</a>, <a href="../reports/phishing-campaign-reports.md" target="_blank" rel="noopener noreferrer">Pull phishing campaign reports →</a>, and other report use-cases.
* **Company & Users:** Add target users, enroll users in training, manage system users, set up SCIM — use Company ID to scope the operation to one customer. <a href="../company-users/add-target-users.md" target="_blank" rel="noopener noreferrer">Add target users →</a> (generic). For a Reseller flow: <a href="add-target-users-for-customer.md" target="_blank" rel="noopener noreferrer">Add target users for a customer →</a>, <a href="list-or-export-target-users-for-customer.md" target="_blank" rel="noopener noreferrer">List or export target users for a customer →</a>, <a href="set-up-scim-for-customer.md" target="_blank" rel="noopener noreferrer">Set up SCIM for a customer →</a>, <a href="add-system-user-for-customer.md" target="_blank" rel="noopener noreferrer">Add system user for a customer →</a>. <a href="../company-users/enroll-users-in-training.md" target="_blank" rel="noopener noreferrer">Enroll users in training →</a>. To create a new company (onboard): <a href="onboard-new-customer.md" target="_blank" rel="noopener noreferrer">Create a new company →</a>. To get, update, or delete a company: <a href="get-a-company.md" target="_blank" rel="noopener noreferrer">Get a company →</a>, <a href="update-a-company.md" target="_blank" rel="noopener noreferrer">Update a company →</a>, <a href="delete-a-company.md" target="_blank" rel="noopener noreferrer">Delete a company →</a>.

{% hint style="info" %}
**Quickstart:** Company ID usage is summarized in the <a href="../../quickstart.md" target="_blank" rel="noopener noreferrer">Quickstart →</a> under “Reseller: scope by Company ID”.
{% endhint %}

---

## Common errors

* **403 Forbidden** — Credential is not Reseller, or the Company ID is not one you manage. Set Client Role = **Reseller**. <a href="../../../next-generation-product/platform/company/system-users/user-roles.md" target="_blank" rel="noopener noreferrer">Roles and permissions →</a>
* **401 Unauthorized** — Missing or invalid token. Request a new token via `POST /connect/token`.
* **404 Not Found** — Invalid or unknown Company ID. Verify from `POST /api/companies/search`.
