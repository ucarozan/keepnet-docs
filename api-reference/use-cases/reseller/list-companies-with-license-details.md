# List companies with license details

Retrieve all companies you manage with license information: License Type, Target Users, Monthly Users, License Limit, Renewal Date. Reseller-only.

---

## Who can use this

Your role|Can use?|What you need
:---|:---|:---
**Company Admin**|No|—
**Reseller**|Yes|Token with Reseller credential

{% hint style="warning" %}
**403 Forbidden?** This use case requires the **Reseller** role. Check your credential's Client Role in **Company → Company Settings → REST API**.
<a href="../../../next-generation-product/platform/company/system-users/user-roles.md" target="_blank" rel="noopener noreferrer">Roles and permissions →</a>
{% endhint %}

---

## Prerequisites

* **Credential:** Client Role = **Reseller**
* **Token:** OAuth2 Client Credentials flow — <a href="../../quickstart.md" target="_blank" rel="noopener noreferrer">Quickstart →</a>

---

## Search companies

**Endpoint:** `POST /api/companies/search`

Send a JSON body with `pageNumber`, `pageSize`, `orderBy`, `ascending`, and optional `filter`. Response includes company details and license info.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/companies/search" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

**Minimal request body (first page, 10 items):**

```json
{
  "pageNumber": 1,
  "pageSize": 10,
  "orderBy": "CreateTime",
  "ascending": false,
  "filter": null
}
```

{% hint style="success" %}
**Test it:** Use **Authorize** in the panel above with your Reseller Client ID and Client Secret. Then click **Send** to run the request and see live results.
{% endhint %}

---

## Key response fields

Response: `data.results` array. Pagination: `data.pageNumber`, `data.totalNumberOfRecords`, `data.totalNumberOfPages`.

Field|Description
:---|:---
`companyResourceId`|Company ID — use in `X-KEEPNET-Company-Id` for scoped requests
`companyName`|Company name
`licenseTypeName`|License type (e.g. Custom)
`numberOfUsers`|License user limit
`targetUserCount`|Current target user count
`monthlyActiveUserCount`|Monthly active users
`licenseEndDate`|License renewal/expiry date
`industryName`|Industry (e.g. Technology, Legal)
`resellerName`|Reseller company name

---

## Export company list

**Endpoint:** `POST /api/companies/search/export`

Export the full company list to CSV or Excel for reporting or billing.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/companies/search/export" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## Common errors

HTTP status|Cause|Fix
:---|:---|:---
`403 Forbidden`|Credential is not Reseller|Set Client Role = **Reseller** in **Company → Company Settings → REST API**
`401 Unauthorized`|Missing or invalid token|Request a new token via `POST /connect/token`
`400 Bad Request`|Invalid request body (e.g. missing `orderBy`)|Include `pageNumber`, `pageSize`, `orderBy`, `ascending`, `filter`

---

## Quick reference

What you need|Endpoint|Method
:---|:---|:---
Search companies|`/api/companies/search`|POST
Export companies|`/api/companies/search/export`|POST
Get single company|`/api/companies/{resourceId}`|GET

---

## What's next

* <a href="onboard-new-customer.md" target="_blank" rel="noopener noreferrer">Onboard a new customer →</a>
* <a href="manage-companies.md" target="_blank" rel="noopener noreferrer">Manage companies →</a>
* <a href="../reports/phishing-campaign-reports.md" target="_blank" rel="noopener noreferrer">Pull phishing campaign reports →</a> (use Company ID for scoped reports)
