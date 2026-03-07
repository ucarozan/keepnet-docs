# Pull training reports

Retrieve Awareness Educator training reports, enrollment status, and completion data via the API.

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

## List trainings

**Endpoint:** `GET /api/awareness-educator/trainings`

Include `Authorization: Bearer <access_token>` in the request header.

{% hint style="info" %}
**Parameters, request/response schema, and Try it:** See the **Awareness Educator** or **Training** section in the Endpoints API Reference (OpenAPI).
{% endhint %}

---

## Search enrollments

Use the Enrollments search endpoint to retrieve enrollment status, completion dates, and user progress. Refer to the OpenAPI spec for the exact path and request body format.

---

## Reseller: scope by Company ID

When using a Reseller credential, include the Company ID to scope the request:

* **Header:** `X-KEEPNET-Company-Id: {companyId}`
* **Query:** `?companyId={companyId}` (when supported)

---

## Quick reference

| What you need           | Endpoint                          | Method |
| ----------------------- | --------------------------------- | ------ |
| List trainings          | `/api/awareness-educator/trainings` | GET  |
| Search enrollments      | Enrollments search endpoint       | POST   |
| Export enrollments      | Enrollments search/export         | POST   |

---

## What's next

* [Pull training list →](../company-users/pull-training-list.md)
* [Enroll users in training →](../company-users/enroll-users-in-training.md)
* [Pull gamification report →](gamification-report.md)
* [Pull executive summaries →](executive-summaries.md)
