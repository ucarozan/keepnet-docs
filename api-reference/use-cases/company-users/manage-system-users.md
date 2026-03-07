# Manage system users

Create, search, update, and manage system users (platform admins) via the API.

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

## Search system users

Use the System Users search endpoint to list system users with filters and pagination. Refer to the OpenAPI spec for the exact path and request body format.

---

## Create and update system users

System user management endpoints allow you to:

* Create new system users
* Update user details and roles
* Deactivate or delete users

Refer to the OpenAPI spec for the exact endpoint paths.

---

## Reseller: scope by Company ID

When using a Reseller credential, include the Company ID to manage system users for a specific company:

* **Header:** `X-KEEPNET-Company-Id: {companyId}`
* **Query:** `?companyId={companyId}` (when supported)

---

## Quick reference

| What you need           | Endpoint                          | Method |
| ----------------------- | --------------------------------- | ------ |
| Search system users     | System Users search endpoint      | POST   |
| Create system user      | System Users create endpoint      | POST   |
| Update system user      | System Users update endpoint      | PUT    |

{% hint style="info" %}
Exact endpoint paths are available in the OpenAPI spec at the bottom of the API Reference sidebar.
{% endhint %}

---

## What's next

* [Add target users →](add-target-users.md)
* [Pull training list →](pull-training-list.md)
* [Export audit logs to SIEM →](../reports/export-audit-logs-to-siem.md)
