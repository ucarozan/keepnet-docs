# List companies with license details

Retrieve all companies you manage with license information: License Type, Target Users, Monthly Users, License Limit, Renewal Date.

---

## Who can use this

| Your role       | Can use? | What you need                    |
| --------------- | -------- | -------------------------------- |
| **Company Admin** | No      | —                                |
| **Reseller**     | Yes     | Token with Reseller credential   |

{% hint style="warning" %}
**403 Forbidden?** This use case requires the **Reseller** role. Check your credential's Client Role in **Company → Company Settings → REST API**.
[Roles and permissions →](https://doc.keepnetlabs.com/next-generation-product/platform/company/system-users/user-roles)
{% endhint %}

---

## Prerequisites

* **Credential:** Client Role = **Reseller**
* **Token:** OAuth2 Client Credentials flow

---

## Search companies

**Endpoint:** `POST /api/companies/search`

Use this endpoint to list companies with filters and pagination. The response includes company details and license information. Send a JSON body with `pageNumber`, `pageSize`, `orderBy`, `ascending`, and optional `filter`. Include `Authorization: Bearer <access_token>` and `Content-Type: application/json`.

{% hint style="info" %}
**Request body schema, parameters, and Try it:** See the **Company** section in the Endpoints API Reference (OpenAPI).
{% endhint %}

---

## Key response fields

| Field           | Description                                        |
| --------------- | -------------------------------------------------- |
| `id` / `resourceId` | Company ID — use for scoped API requests       |
| `name`          | Company name                                       |
| `licenseType`   | License type                                       |
| `targetUserLimit` | License user limit                             |
| `targetUsers`   | Current target user count                          |
| `monthlyUsers`  | Monthly active users                               |
| `renewalDate` / `expiryDate` | License renewal date                       |
| `industry`      | Industry                                           |

---

## Export company list

**Endpoint:** `POST /api/companies/search/export`

Export the full company list to CSV or Excel format for reporting or billing.

---

## Quick reference

| What you need           | Endpoint                          | Method |
| ----------------------- | --------------------------------- | ------ |
| Search companies        | `/api/companies/search`           | POST   |
| Export companies        | `/api/companies/search/export`    | POST   |
| Get single company      | `/api/companies/{resourceId}`     | GET    |

---

## What's next

* [Onboard a new customer →](onboard-new-customer.md)
* [Manage companies →](manage-companies.md)
* [Pull phishing campaign reports →](../reports/phishing-campaign-reports.md) (use Company ID for scoped reports)
