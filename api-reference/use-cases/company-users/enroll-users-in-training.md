# Enroll users in training

Enroll target users in Awareness Educator trainings via the API.

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
* **Training ID:** From [Pull training list](pull-training-list.md)
* **Target user IDs:** From [Add target users](add-target-users.md) or target user search
* **Reseller:** Company ID from [List companies with license details](../reseller/list-companies-with-license-details.md)

---

## Create enrollments

Use the Enrollments endpoint to enroll one or more users in a training. Refer to the OpenAPI spec for the exact path and request body format.

---

## Search enrollments

**Endpoint:** Enrollments search

Retrieve enrollment status, completion dates, and user progress.

---

## Reseller: scope by Company ID

When using a Reseller credential, include the Company ID to enroll users for a specific company:

* **Header:** `X-KEEPNET-Company-Id: {companyId}`
* **Query:** `?companyId={companyId}` (when supported)

---

## Quick reference

| What you need           | Endpoint                          | Method |
| ----------------------- | --------------------------------- | ------ |
| Create enrollment       | Enrollments create endpoint       | POST   |
| Search enrollments      | Enrollments search endpoint       | POST   |
| Export enrollments      | Enrollments search/export         | POST   |

{% hint style="info" %}
Exact endpoint paths are available in the OpenAPI spec at the bottom of the API Reference sidebar.
{% endhint %}

---

## What's next

* [Pull training list →](pull-training-list.md)
* [Pull training reports →](../reports/training-reports.md)
* [Add target users →](add-target-users.md)
