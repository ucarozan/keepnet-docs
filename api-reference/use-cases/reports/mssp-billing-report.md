# Pull MSSP Billing Report

Retrieve MSSP (Managed Security Service Provider) billing data: licenses, third-party training usage, and active users. Only available to Resellers.

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

## Access MSSP billing data

MSSP billing reports are available through Reseller-specific endpoints. The data typically includes:

* License usage per company
* Third-party training consumption
* Active user counts
* Billing period summaries

Refer to the OpenAPI spec for the exact endpoint paths and response structure.

---

## Quick reference

| What you need           | Endpoint                          | Method |
| ----------------------- | --------------------------------- | ------ |
| MSSP / Reseller reports | Reseller Reports endpoints        | POST   |

{% hint style="info" %}
Exact endpoint paths are available in the OpenAPI spec at the bottom of the API Reference sidebar.
{% endhint %}

---

## What's next

* [List companies with license details →](../reseller/list-companies-with-license-details.md)
* [Pull executive summaries →](executive-summaries.md)
