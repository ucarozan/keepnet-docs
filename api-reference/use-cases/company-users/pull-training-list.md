# Pull training list

List all trainings from Awareness Educator via the API.

---

## Who can use this

| Your role       | Can use? | What you need                    |
| --------------- | -------- | -------------------------------- |
| **Company Admin** | Yes     | Token only                       |
| **Reseller**     | Yes     | Token + Company ID (for each company) |

---

## Prerequisites

* **Company Admin:** Token only. Requests are automatically scoped to your company.
* **Reseller:** Token + Company ID. Get Company IDs from [List companies with license details](../reseller/list-companies-with-license-details.md), then include in each request.

---

## List trainings

**Endpoint:** `GET /api/awareness-educator/trainings`

Include `Authorization: Bearer <access_token>` in the request header.

{% hint style="info" %}
**Parameters, request/response schema, and Try it:** See the **Awareness Educator** or **Training** section in the Endpoints API Reference (OpenAPI).
{% endhint %}

---

## Reseller: scope by Company ID

When using a Reseller credential, include the Company ID to pull the training list for a specific company:

* **Header:** `X-KEEPNET-Company-Id: {companyId}`
* **Query:** `?companyId={companyId}` (when supported)

---

## Quick reference

| What you need           | Endpoint                          | Method |
| ----------------------- | --------------------------------- | ------ |
| List trainings         | `/api/awareness-educator/trainings` | GET  |
| Search enrollments     | Enrollments search endpoint       | POST   |

---

## What's next

* [Pull training reports →](../reports/training-reports.md)
* [Enroll users in training →](enroll-users-in-training.md)
* [Add target users →](add-target-users.md)
