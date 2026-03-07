# Add target users

Add, search, and edit target users via the API for user provisioning and IAM integration.

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

## Add a target user

**Endpoint:** `POST /api/target-users`

Send a JSON body with `email`, `firstName`, `lastName`, and optional `department`. Include `Authorization: Bearer <access_token>` and `Content-Type: application/json`.

{% hint style="info" %}
**Request body schema, parameters, and Try it:** See the **Target Users** section in the Endpoints API Reference (OpenAPI).
{% endhint %}

---

## Search target users

**Endpoint:** `POST /api/target-users/search`

Search for target users with filters and pagination.

---

## Edit a target user

**Endpoint:** `PUT /api/target-users/{resourceId}`

Update an existing target user's details.

---

## Quick reference

| What you need           | Endpoint                          | Method |
| ----------------------- | --------------------------------- | ------ |
| Add target user         | `/api/target-users`               | POST   |
| Search target users     | `/api/target-users/search`         | POST   |
| Edit target user        | `/api/target-users/{resourceId}`   | PUT    |

---

## What's next

* [Manage system users →](manage-system-users.md)
* [Pull training list →](pull-training-list.md)
* [Enroll users in training →](enroll-users-in-training.md)
