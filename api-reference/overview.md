# Overview

The Keepnet API lets you automate platform operations: pull reports, manage users, onboard customers, and integrate with SIEM, SOAR, or identity systems.

---

## Base URL

```
https://api.keepnetlabs.com
```

---

## Response format

All API responses include an `isSuccess` field. When `isSuccess` is `false`, check the `messages` array for error details.

| Field       | Type    | Description                          |
| ----------- | ------- | ------------------------------------ |
| `isSuccess` | boolean | Indicates whether the request succeeded |
| `data`      | object  | Response payload when successful     |
| `messages`  | array   | Error or validation messages when failed |

---

## Common conventions

| Convention   | Description                                                                 |
| ------------ | --------------------------------------------------------------------------- |
| **Pagination** | Search endpoints use `pageNumber`, `pageSize`, `orderBy`, `ascending`, `filter` in the request body |
| **Filter**   | Use `filter: null` for no filtering, or a filter object with operators (`eq`, `neq`, `contains`, `gt`, `lt`, etc.) |
| **Sorting**  | `orderBy` is often required — use `CreateTime` for chronological ordering   |
| **Company scope** | Most endpoints require a company context. Company Admin: automatic. Reseller: include Company ID (header/path/query) |

---

## Who can use the API

| Role           | Access                                                       |
| -------------- | ------------------------------------------------------------ |
| **Company Admin** | Full access to your company's data — no Company ID needed |
| **Reseller**  | Cross-company management — list companies, onboard customers, pull reports per company using Company ID |
| **Custom role** | Scoped to specific products or actions based on role definition |

---

## What's next

* [Quickstart →](quickstart.md)
* [Authenticate your requests →](authentication.md)
