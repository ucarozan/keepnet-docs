# Manage companies

Edit, update, or delete companies you manage. Only available to Resellers.

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
* **Company ID:** From [List companies with license details](list-companies-with-license-details.md)

---

## Get company details

**Endpoint:** `GET /api/companies/{resourceId}`

Replace `{resourceId}` with the Company ID. Include `Authorization: Bearer <access_token>` in the request header.

{% hint style="info" %}
**Parameters, request/response schema, and Try it:** See the **Company** section in the Endpoints API Reference (OpenAPI).
{% endhint %}

---

## Update a company

**Endpoint:** `PUT /api/companies/{resourceId}`

Update company details, license, or settings. See the Endpoints API Reference (OpenAPI) for the request body schema.

---

## Add company to a group

**Endpoint:** `PUT /api/company-groups/{resourceId}/participants`

Add one or more companies to a company group.

---

## Delete a company

**Endpoint:** `DELETE /api/companies/{resourceId}`

{% hint style="danger" %}
Deleting a company is irreversible. All associated data is removed.
{% endhint %}

---

## Quick reference

| What you need           | Endpoint                          | Method |
| ----------------------- | --------------------------------- | ------ |
| Get company             | `/api/companies/{resourceId}`     | GET    |
| Update company          | `/api/companies/{resourceId}`     | PUT    |
| Delete company          | `/api/companies/{resourceId}`     | DELETE |
| Add to company group    | `/api/company-groups/{id}/participants` | PUT |

---

## What's next

* [List companies with license details →](list-companies-with-license-details.md)
* [Onboard a new customer →](onboard-new-customer.md)
