# List companies with license details

Retrieve all companies you manage with license information: License Type, Target Users, Monthly Users, License Limit, Renewal Date. Reseller-only.

---

## Who can use this

<table><thead><tr><th>Your role</th><th>Can use?</th><th>What you need</th></tr></thead><tbody>
<tr><td><strong>Company Admin</strong></td><td>No</td><td>—</td></tr>
<tr><td><strong>Reseller</strong></td><td>Yes</td><td>Token with Reseller credential</td></tr>
</tbody></table>

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

<table><thead><tr><th>Field</th><th>Description</th></tr></thead><tbody>
<tr><td><code>companyResourceId</code></td><td>Company ID — use in <code>X-KEEPNET-Company-Id</code> for scoped requests</td></tr>
<tr><td><code>companyName</code></td><td>Company name</td></tr>
<tr><td><code>licenseTypeName</code></td><td>License type (e.g. Custom)</td></tr>
<tr><td><code>numberOfUsers</code></td><td>License user limit</td></tr>
<tr><td><code>targetUserCount</code></td><td>Current target user count</td></tr>
<tr><td><code>monthlyActiveUserCount</code></td><td>Monthly active users</td></tr>
<tr><td><code>licenseEndDate</code></td><td>License renewal/expiry date</td></tr>
<tr><td><code>industryName</code></td><td>Industry (e.g. Technology, Legal)</td></tr>
<tr><td><code>resellerName</code></td><td>Reseller company name</td></tr>
</tbody></table>

---

## Export company list

**Endpoint:** `POST /api/companies/search/export`

Export the full company list to CSV or Excel for reporting or billing.

{% swagger src="../../../openapi/keepnet-api-spec.json" path="/api/companies/search/export" method="post" expanded="true" %}
<a href="../../../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

---

## Common errors

<table><thead><tr><th>HTTP status</th><th>Cause</th><th>Fix</th></tr></thead><tbody>
<tr><td><code>403 Forbidden</code></td><td>Credential is not Reseller</td><td>Set Client Role = <strong>Reseller</strong> in <strong>Company → Company Settings → REST API</strong></td></tr>
<tr><td><code>401 Unauthorized</code></td><td>Missing or invalid token</td><td>Request a new token via <code>POST /connect/token</code></td></tr>
<tr><td><code>400 Bad Request</code></td><td>Invalid request body (e.g. missing <code>orderBy</code>)</td><td>Include <code>pageNumber</code>, <code>pageSize</code>, <code>orderBy</code>, <code>ascending</code>, <code>filter</code></td></tr>
</tbody></table>

---

## Quick reference

<table><thead><tr><th>What you need</th><th>Endpoint</th><th>Method</th></tr></thead><tbody>
<tr><td>Search companies</td><td><code>/api/companies/search</code></td><td>POST</td></tr>
<tr><td>Export companies</td><td><code>/api/companies/search/export</code></td><td>POST</td></tr>
<tr><td>Get single company</td><td><code>/api/companies/{resourceId}</code></td><td>GET</td></tr>
</tbody></table>

---

## What's next

* <a href="onboard-new-customer.md" target="_blank" rel="noopener noreferrer">Onboard a new customer →</a>
* <a href="manage-companies.md" target="_blank" rel="noopener noreferrer">Manage companies →</a>
* <a href="../reports/phishing-campaign-reports.md" target="_blank" rel="noopener noreferrer">Pull phishing campaign reports →</a> (use Company ID for scoped reports)
