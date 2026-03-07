# Export audit logs to SIEM

Transfer platform audit logs to your SIEM (Splunk, QRadar, Syslog, etc.) via the API for real-time monitoring and compliance.

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

## Search audit logs

**Endpoint:** `POST /api/audit-logs/search`

Send a JSON body with `pageNumber`, `pageSize`, `orderBy`, `ascending`, and optional `filter`. Include `Authorization: Bearer <access_token>` and `Content-Type: application/json`.

{% hint style="info" %}
**Request body schema, parameters, and Try it:** See the **Audit Logs** section in the Endpoints API Reference (OpenAPI).
{% endhint %}

---

## Export audit logs

**Endpoint:** `POST /api/audit-logs/search/export`

Export audit logs to a file (CSV/Excel) for ingestion into your SIEM or for archival.

---

## Audit log fields

| Field           | Description                                        |
| --------------- | -------------------------------------------------- |
| Log Date        | When the activity occurred                         |
| User Name       | System user or service that performed the activity |
| Entity Name     | Product or component where the activity occurred   |
| Operation       | Type of activity (create, delete, update, etc.)   |
| Changed Set     | Previous state for deleted/updated records        |
| New Value       | Details of newly created records                  |
| IP              | IP address of the user                            |
| Browser User Agent | Browser information                            |

{% hint style="warning" %}
Audit log records cannot be changed or deleted by any user.
{% endhint %}

---

## SIEM integration options

* **REST API** — Poll the audit log endpoint and push events to your SIEM's HTTP Event Collector (e.g. Splunk HEC)
* **Web Interface** — Use platform SIEM integrations for real-time streaming where supported

[SIEM Integrations →](https://doc.keepnetlabs.com/next-generation-product/platform/company/company-settings/siem-integrations)

---

## Quick reference

| What you need           | Endpoint                          | Method |
| ----------------------- | --------------------------------- | ------ |
| Search audit logs       | `/api/audit-logs/search`          | POST   |
| Export audit logs       | `/api/audit-logs/search/export`   | POST   |

---

## What's next

* [Pull phishing campaign reports →](phishing-campaign-reports.md)
* [List companies with license details →](../reseller/list-companies-with-license-details.md)
