# Authenticate your requests

Keepnet API uses **OAuth 2.0 Client Credentials** flow. Every request requires a Bearer token in the `Authorization` header.

---

## Generate API credentials

Before making any API calls, generate a **Client ID** and **Client Secret** from the platform.

{% hint style="info" %}
**Platform UI:** Go to **Company → Company Settings → REST API** and click **+ NEW**.\
<a href="https://doc.keepnetlabs.com/next-generation-product/platform/company/company-settings/rest-api" target="_blank" rel="noopener noreferrer">REST API Settings →</a>
{% endhint %}

Configure the following fields when generating credentials:

| Field | Description |
| --- | --- |
| **Name** | A label for this credential set (e.g. `prod-integration`, `siem-connector`) |
| **Client Role** | `Company Admin` for full access, or a custom role with limited privileges |
| **IP Restriction** | Optionally restrict access to specific IP addresses |
| **Status** | Set to `Active` |

{% hint style="warning" %}
**The Client Secret is shown only once.** Copy and store it securely immediately after you generate it — it cannot be retrieved later.
{% endhint %}

---

## Request an access token

**Endpoint:** `POST /connect/token`

{% swagger src="../openapi/keepnet-api-spec.json" path="/connect/token" method="post" expanded="true" %}
<a href="../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}

The response includes your token and its expiry time.

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 3600,
  "token_type": "Bearer",
  "scope": "api1"
}
```

| Field | Description |
| --- | --- |
| `access_token` | Include this in every API request |
| `expires_in` | Seconds until expiry — typically `3600` (1 hour) |
| `token_type` | Always `Bearer` |
| `scope` | Always `api1` for Keepnet API |

{% hint style="info" %}
[Endpoints → Authentication → Request an access token → Test it](sidebar)
{% endhint %}

---

## Make an authenticated request

Include the token in every API request: `Authorization: Bearer <access_token>`. Example: list trainings via `GET /api/awareness-educator/trainings`.

{% hint style="info" %}
[Endpoints → Test it](sidebar) — Paste `Bearer <access_token>` in **Authorization**.
{% endhint %}

---

## Handle token expiry

Tokens expire after **1 hour**. There is no refresh token — request a new one using your credentials when the current token expires.

Cache the token and refresh it proactively to avoid failed requests mid-session:

```javascript
class KeepnetClient {
  constructor(clientId, clientSecret) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.token = null;
    this.tokenExpiresAt = null;
  }

  async getToken() {
    // Refresh 60 seconds before expiry
    if (this.token && Date.now() < this.tokenExpiresAt - 60_000) {
      return this.token;
    }

    const response = await fetch('https://api.keepnetlabs.com/connect/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: this.clientId,
        client_secret: this.clientSecret,
        scope: 'api1',
      }),
    });

    const { access_token, expires_in } = await response.json();
    this.token = access_token;
    this.tokenExpiresAt = Date.now() + expires_in * 1000;
    return this.token;
  }

  async request(path, options = {}) {
    const token = await this.getToken();
    return fetch(`https://api.keepnetlabs.com${path}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
  }
}
```

---

## Understand roles and permissions

The **Client Role** on your credentials determines which endpoints are accessible.

| Role | Access level |
| --- | --- |
| `Company Admin` | Full access to all endpoints |
| `Reseller` | Cross-company management endpoints |
| Custom role | Scoped to specific products or actions |

{% hint style="info" %}
To restrict a credential set to specific products (e.g. Awareness Educator only), create a custom role with limited privileges.\
<a href="https://doc.keepnetlabs.com/next-generation-product/platform/company/system-users" target="_blank" rel="noopener noreferrer">Roles and permissions →</a>
{% endhint %}

---

## Handle authentication errors

| HTTP status | Cause | Action |
| --- | --- | --- |
| `401 Unauthorized` | Missing or invalid token | Re-authenticate and retry |
| `401 Unauthorized` | Token expired | Request a new token |
| `403 Forbidden` | Insufficient role permissions | Check the Client Role in platform settings |
| `429 Too Many Requests` | Rate limit exceeded | Back off and retry after a delay |

---

## Keep credentials secure

{% hint style="success" %}
**Do:**

* Store credentials in environment variables or a secrets manager (e.g. Azure Key Vault)
* Enable IP Restriction if your integration runs from a fixed IP
* Use a custom role scoped to only the endpoints your integration needs
* Generate separate credentials per integration — don't share between systems
{% endhint %}

{% hint style="danger" %}
**Don't:**

* Hard-code `client_id` or `client_secret` in source code
* Commit credentials to version control
{% endhint %}

---

## Use the API as a Reseller

If your credential has the **Reseller** role, you can manage multiple companies. Each company-scoped request must specify which company you are acting on.

### List managed companies

Retrieve the Company IDs of companies you manage via `POST /api/companies/search`. Use the `id` field from the response when making company-scoped requests.

### Scope requests to a company

When calling endpoints that require a company context, include the Company ID via:

* **Header:** `X-KEEPNET-Company-Id: {companyId}` (when supported)
* **Path:** `/api/.../companies/{companyId}/...`
* **Query:** `?companyId={companyId}`

{% hint style="info" %}
**Platform UI:** View Company IDs in **Company → Companies**.
<a href="https://doc.keepnetlabs.com/next-generation-product/platform/company/companies" target="_blank" rel="noopener noreferrer">Companies →</a>
{% endhint %}

---

## What's next

* <a href="use-cases/reports/phishing-campaign-reports.md" target="_blank" rel="noopener noreferrer">Pull phishing campaign reports →</a>
* <a href="use-cases/reseller/list-companies-with-license-details.md" target="_blank" rel="noopener noreferrer">List companies with license details →</a>
* <a href="use-cases/reports/export-audit-logs-to-siem.md" target="_blank" rel="noopener noreferrer">Export audit logs to SIEM →</a>
