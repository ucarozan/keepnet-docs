# Onboard a new customer

Create a new company via the API. Only available to Resellers.

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

## Onboarding flow

Reseller onboarding typically involves four steps:

1. **Company Info** — Create the company with basic details
2. **License** — Set license type, expiry, user limits
3. **Groups** — Add to company groups if needed
4. **Content Management** — Configure training, phishing scenarios, etc.

---

## Step 1: Create the company

**Endpoint:** `POST /api/companies`

Send a JSON body with `name`, `industryId`, `licenseTypeId`, `targetUserLimit`, `expiryDate`, and other required fields. Include `Authorization: Bearer <access_token>` and `Content-Type: application/json`.

{% hint style="info" %}
**Request body schema, required fields, and Try it:** See the **Company** section in the Endpoints API Reference (OpenAPI).
{% endhint %}

The response includes the new company's `resourceId` (Company ID). Use it for license configuration, groups, and content management.

---

## Step 2: Configure license and groups

Use the Company ID from Step 1 to:

* Update license settings via `PUT /api/companies/{resourceId}`
* Add the company to a company group via `PUT /api/company-groups/{resourceId}/participants`

---

## Quick reference

| What you need           | Endpoint                          | Method |
| ----------------------- | --------------------------------- | ------ |
| Create company          | `/api/companies`                  | POST   |
| Update company          | `/api/companies/{resourceId}`     | PUT    |
| Add to company group    | `/api/company-groups/{id}/participants` | PUT |

---

## Handle errors

| HTTP | Cause                          | Action                                      |
| ---- | ------------------------------ | ------------------------------------------- |
| 403  | Credential is not Reseller     | Use a credential with Reseller role         |
| 400  | Invalid request body           | Check the Endpoints API Reference for required fields and format |

---

## What's next

* [List companies with license details →](list-companies-with-license-details.md)
* [Manage companies →](manage-companies.md)
