# Authenticate your requests

Keepnet API uses **OAuth 2.0 Client Credentials** flow. Every request requires a Bearer token in the `Authorization` header.

***

## Create API credentials

Before making any API calls, generate a **Client ID** and **Client Secret** from the platform.

{% hint style="info" %}
**Platform UI:** Go to **Company → Company Settings → REST API** and click **+ NEW**.\
[REST API Settings →](https://doc.keepnetlabs.com/next-generation-product/platform/company/company-settings/rest-api)
{% endhint %}

Configure the following fields when creating credentials:

| Field              | Description                                                                    |
| ------------------ | ------------------------------------------------------------------------------ |
| **Name**           | A label for this credential set (e.g. `prod-integration`, `siem-connector`)   |
| **Client Role**    | `Company Admin` for full access, or a custom role with limited privileges      |
| **IP Restriction** | Optionally restrict access to specific IP addresses                            |
| **Status**         | Set to `Active`                                                                |

{% hint style="warning" %}
**The Client Secret is shown only once.** Copy and store it securely immediately after creation — it cannot be retrieved later.
{% endhint %}

***

## Request an access token

{% tabs %}
{% tab title="cURL" %}
```bash
curl -X POST https://api.keepnetlabs.com/connect/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "client_secret=YOUR_CLIENT_SECRET" \
  -d "scope=api1"
```
{% endtab %}

{% tab title="JavaScript" %}
```javascript
const response = await fetch('https://api.keepnetlabs.com/connect/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: 'YOUR_CLIENT_ID',
    client_secret: 'YOUR_CLIENT_SECRET',
    scope: 'api1',
  }),
});

const { access_token, expires_in } = await response.json();
```
{% endtab %}

{% tab title="Python" %}
```python
import requests

response = requests.post(
    'https://api.keepnetlabs.com/connect/token',
    data={
        'grant_type': 'client_credentials',
        'client_id': 'YOUR_CLIENT_ID',
        'client_secret': 'YOUR_CLIENT_SECRET',
        'scope': 'api1',
    }
)

access_token = response.json()['access_token']
```
{% endtab %}
{% endtabs %}

The response includes your token and its expiry time:

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 3600,
  "token_type": "Bearer",
  "scope": "api1"
}
```

| Field           | Description                                        |
| --------------- | -------------------------------------------------- |
| `access_token`  | Include this in every API request                  |
| `expires_in`    | Seconds until expiry — typically `3600` (1 hour)   |
| `token_type`    | Always `Bearer`                                    |
| `scope`         | Always `api1` for Keepnet API                      |

***

## Make an authenticated request

{% tabs %}
{% tab title="cURL" %}
```bash
curl https://api.keepnetlabs.com/api/awareness-educator/trainings \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```
{% endtab %}

{% tab title="JavaScript" %}
```javascript
const response = await fetch('https://api.keepnetlabs.com/api/awareness-educator/trainings', {
  headers: {
    'Authorization': `Bearer ${access_token}`,
    'Content-Type': 'application/json',
  },
});

const data = await response.json();
```
{% endtab %}

{% tab title="Python" %}
```python
response = requests.get(
    'https://api.keepnetlabs.com/api/awareness-educator/trainings',
    headers={
        'Authorization': f'Bearer {access_token}',
    }
)
```
{% endtab %}
{% endtabs %}

***

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

***

## Understand roles and permissions

The **Client Role** on your credentials determines which endpoints are accessible.

| Role          | Access level                                  |
| ------------- | --------------------------------------------- |
| `Company Admin` | Full access to all endpoints                |
| `Reseller`    | Cross-company management endpoints            |
| Custom role   | Scoped to specific products or actions        |

{% hint style="info" %}
To restrict a credential set to specific products (e.g. Awareness Educator only), create a custom role with limited privileges.\
[Roles and permissions →](https://doc.keepnetlabs.com/next-generation-product/platform/company/system-users)
{% endhint %}

***

## Handle authentication errors

| HTTP status           | Cause                          | Action                                      |
| --------------------- | ------------------------------ | ------------------------------------------- |
| `401 Unauthorized`    | Missing or invalid token       | Re-authenticate and retry                   |
| `401 Unauthorized`    | Token expired                  | Request a new token                         |
| `403 Forbidden`       | Insufficient role permissions  | Check the Client Role in platform settings  |
| `429 Too Many Requests` | Rate limit exceeded           | Back off and retry after a delay            |

***

## Keep credentials secure

{% hint style="success" %}
**Do:**

* Store credentials in environment variables or a secrets manager (e.g. Azure Key Vault)
* Enable IP Restriction if your integration runs from a fixed IP
* Use a custom role scoped to only the endpoints your integration needs
* Create separate credentials per integration — don't share between systems
{% endhint %}

{% hint style="danger" %}
**Don't:**

* Hard-code `client_id` or `client_secret` in source code
* Commit credentials to version control
{% endhint %}

***

## What's next

* [Manage System Users →](guides/manage-system-users.md)
* [Pull Training List →](guides/pull-training-list.md)
