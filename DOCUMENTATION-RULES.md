# Keepnet Documentation Rules

This file defines **mandatory (hard) rules** for doc.keepnetlabs.com and API Reference, and serves as a guide for future authors.

---

## 📚 GitBook API Documentation References

| Source | URL | Use |
|--------|-----|-----|
| **Document your API in 5 steps** | [gitbook.com/docs/guides/api-documentation/document-your-api-in-gitbook-in-5-simple-steps](https://gitbook.com/docs/guides/api-documentation/document-your-api-in-gitbook-in-5-simple-steps) | General API doc workflow |
| **7 Principles of Great API Docs** | [gitbook.com/docs/guides/api-documentation](https://gitbook.com/docs/guides/api-documentation) | 7 Cs principles |
| **Structuring your API reference** | [gitbook.com/docs/api-references/guides/structuring-your-api-reference](https://gitbook.com/docs/api-references/guides/structuring-your-api-reference) | x-parent, tag hierarchy |
| **Configuring the Test it button** | [gitbook.com/docs/api-references/guides/configuring-the-test-it-button](https://gitbook.com/docs/api-references/guides/configuring-the-test-it-button) | servers, securitySchemes, bearerAuth |
| **Add OpenAPI specification** | [gitbook.com/docs/api-references/openapi/add-an-openapi-specification](https://gitbook.com/docs/api-references/openapi/add-an-openapi-specification) | Spec URL, updates |
| **GitBook API Reference (example)** | [gitbook.com/docs/developers/gitbook-api/api-reference/organizations](https://gitbook.com/docs/developers/gitbook-api/api-reference/organizations) | OpenAPI embed + Test it reference page |

**Reference target:** GitBook Organizations page — OpenAPI direct embed, Test it button in right panel, parameters, authorization, response example.

---

## 🎯 Keepnet API Reference — Implemented Requirements

The following are implemented in this project. New changes must not break this structure.

### OpenAPI + Test it (GitBook Organizations style)

| Requirement | Implementation |
|-------------|----------------|
| **OpenAPI direct embed** | Parameters, schema, authorization on every endpoint page |
| **Test it button** | Token input and request send in right panel |
| **servers** | `https://api.keepnetlabs.com` (defined in spec) |
| **bearerAuth** | Paste token (obtained via OAuth2 client credentials) |
| **OAuth2** | Get token with client_id/client_secret (optional) |

### Menu hierarchy (x-parent)

| Requirement | Implementation |
|-------------|----------------|
| **x-parent** | All tags grouped with `"x-parent": "endpoints"` |
| **Endpoints parent** | 98 tags under single "Endpoints" |
| **Menu order** | Quickstart → Reseller → Reports → Company & Users → Endpoints |

### builtin:openapi block (SUMMARY.md)

In SUMMARY.md, the Endpoints entry is defined as follows (actual format: `SUMMARY.md` lines 317–328):

```
* Endpoints
* ```yaml
  type: builtin:openapi
  props:
    models: true
    downloadLink: true
  dependencies:
    spec:
      ref:
        kind: openapi
        spec: keepnet-api
  ```
```

### Spec source (GitBook Integration only — not for doc content)

- **GitBook Space:** Integrations → OpenAPI → `keepnet-api` → URL
- Spec URL is configured in GitBook Integration (do not paste GitHub URLs in user-facing docs)
- **Update:** `npm run openapi` → commit → push → GitBook "Check for updates"

### Internal links

- Do **not** use `[Endpoints](.)`, `github.com`, or `raw.githubusercontent.com` in doc content
- **Always** use relative paths (e.g. `api-reference/quickstart.md`); links open in new tab
- Correct: `<a href="next-generation-product/platform/rest-api-settings.md" target="_blank" rel="noopener noreferrer">REST API Settings →</a>`, `[Quickstart](quickstart.md)`, `**Endpoints** (sidebar)`

---

## 🔴 HARD RULES (Mandatory)

The following rules apply to **every new or updated page**. Violation = review rejection.

### H1: Task-based headings

| ✅ Do | ❌ Don't |
|------|----------|
| `Authenticate your requests` | `Authentication` |
| `Request an access token` | `Token endpoint` |
| `Pull training reports` | `Training Reports API` |
| `Add target users` | `Target Users` |

**Pattern:** Verb + object (`Create credentials`, `Handle errors`, `Filter results`)

---

### H2: Code first, explanation after

Code or example first, then explanation. Do not start with theory.

**✅ Do:**
```markdown
## Request an access token

```bash
curl -X POST https://api.keepnetlabs.com/connect/token ...
```

The response includes your token and its expiry time.
```

**❌ Don't:**
```markdown
## Request an access token

To obtain a token, you must send a POST request to the token endpoint 
with your credentials encoded as form data. The endpoint accepts...

```bash
curl ...
```
```

**API Reference use-case pages:** Provide OpenAPI (Endpoints sidebar) reference for endpoint details. Use `[Test it →](Endpoints)` instead of code examples.

---

### H3: Direct links, no "for more information"

Use inline arrow-style links. Do not write "For more information, see X".

| ✅ Do | ❌ Don't |
|------|----------|
| `<a href="next-generation-product/platform/rest-api-settings.md" target="_blank" rel="noopener noreferrer">REST API Settings →</a>` | `For more information about REST API, see...` |
| `<a href="api-reference/use-cases/company-users/pull-training-list.md" target="_blank" rel="noopener noreferrer">Pull Training List →</a>` | `Refer to the Pull Training List guide for details.` |

---

### H4: Internal links — no GitHub, no static domains

- **Never** use `github.com` or `raw.githubusercontent.com` in documentation content.
- **Never** hardcode `doc.keepnetlabs.com` or `github.com` as static base URLs.
- **Always** use relative paths so GitBook resolves them: `api-reference/quickstart.md`, `next-generation-product/platform/rest-api-settings.md`
- Links must open in new tab (`target="_blank"`).
- Do not use broken links like `[Endpoints](.)`.

---

### H5: Links open in new tab

All external and internal links must open in a new tab. Use HTML with `target="_blank"` and `rel="noopener noreferrer"`:

```markdown
<a href="next-generation-product/platform/rest-api-settings.md" target="_blank" rel="noopener noreferrer">REST API Settings →</a>
```

| ✅ Do | ❌ Don't |
|------|----------|
| `<a href="url" target="_blank" rel="noopener noreferrer">Link text</a>` | `[Link](url)` (opens in same tab) |

---

### H6: Hint blocks — platform cross-link

When using `{% hint style="info" %}`, add a platform doc link. Links must open in new tab:

```markdown
{% hint style="info" %}
**Platform UI:** Go to **Company → Company Settings → REST API**.
<a href="next-generation-product/platform/rest-api-settings.md" target="_blank" rel="noopener noreferrer">REST API Settings →</a>
{% endhint %}
```

---

### H7: OpenAPI embed + Test it (Core pages)

**Quickstart** (tek core page) ve endpoint dokümante eden her sayfada OpenAPI embed ve Test it butonu **zorunludur**.

```markdown
{% swagger src="../openapi/keepnet-api-spec.json" path="/ENDPOINT_PATH" method="post" expanded="true" %}
<a href="../openapi/keepnet-api-spec.json" target="_blank" rel="noopener noreferrer">keepnet-api-spec.json</a>
{% endswagger %}
```

Sayfa tipi|Kural
:---|:---
Quickstart (tek core page)|Endpoint varsa `{% swagger %}` block zorunlu
Use-case pages|`[Endpoints → Test it](sidebar)` veya ilgili endpoint referansı

---

### H8: Tablo formatı — başta `|` yok (GitBook bug workaround)

GitBook'da satır başında `|` olan tablolar gereksiz boşluk gösteriyor. **Baştaki pipe kullanma.**

**✅ Do:**
```markdown
Field|Description
:---|:---
**Name**|A label for this credential set
**Client Role**|`Company Admin` for full access
```

**❌ Don't:**
```markdown
| Field | Description |
|-------|-------------|
| **Name** | A label for this credential set |
```

---

## 📐 Page Templates

### API Reference — Use-case page

Every use-case page follows the **same section order**:

```markdown
# [Use-case title — task-based]

[1–2 sentences: What it does, who uses it]

## Who can use this
| Role | Can use? | What you need |

## Prerequisites
- Token, Company ID (Reseller), etc.

## [Step 1 — task-based]
**Endpoint:** `METHOD /path`
[Brief explanation]
{% hint %} [Endpoints → Test it](sidebar) {% endhint %}

## Reseller: scope by Company ID
[If applicable]

## Common errors
|Code|Cause|Fix|
|:---|:---|:---|

## What's next
- [Related use-case →]
- [Related endpoint →]
```

---

### API Reference — Core pages (Overview, Quickstart, Authentication)

```markdown
# [Verb] [object]

One-sentence description.

---

## [First task heading]
[Code or OpenAPI reference first]
[Brief explanation]

---

## Handle errors
[Error table]

---

## What's next
- [Link →]
```

---

## 📖 7 Cs (GitBook principles)

| Principle | Description | Application |
|-----------|-------------|-------------|
| **Convenient** | Meet developers in their environment | Specific error messages, help outside doc |
| **Concrete** | Examples, interactive when possible | OpenAPI Test it, realistic examples |
| **Consistent** | Format, terminology consistent | Same template across all use-cases |
| **Complete** | Every endpoint, response | OpenAPI spec as single source |
| **Contextual** | Context, skimmable | Role, prerequisite tables |
| **Concise** | Get to the point quickly | Short explanations, tables |
| **Clear** | Plain language | Clear expression over technical jargon |

---

## ✍️ Language and style (Google Style Guide)

- **Active voice:** "Request a token" not "A token should be requested."
- **Second person:** "You need a Client ID" not "The user needs..."
- **Present tense:** "The token expires" not "The token will expire."
- **Imperative mood:** "Click + NEW" not "You should click..."
- **Sentence case** for headings: `Handle token expiry` not `Handle Token Expiry`
- **Exception:** Proper nouns, product names (`Awareness Educator`, `Company Admin`)

**Code formatting:**
- `code font`: endpoint paths, parameters, HTTP methods, status codes
- **bold**: UI elements (**Company → Settings → REST API**)
- Do not use code font for UI

**Tables (no leading padding):**
- Use compact format: `|Field|Description|` (no spaces between pipe and content)
- Use left alignment: `|:---|:---|` to avoid extra column padding

---

## 📋 Terminology

| Use | Avoid |
|-----|-------|
| `Generate` | `Create` (for credentials, tokens) |
| `Request` | `Get`, `Fetch` (for token) |
| `Authenticate` | `Auth`, `Login` |
| `Credential` | `Key`, `Secret key` |
| `Expires after` | `Has a TTL of` |
| `Endpoint` | `API call`, `method` |
| `Returns` | `Responds with`, `gives back` |

---

## 🔧 Hint blocks

| Style | Use |
|-------|-----|
| `info` | Platform UI, notes |
| `warning` | Data loss risk, one-time secrets |
| `danger` | Permanent deletion, security risk |
| `success` | Best practice, recommended pattern |

---

## 📁 Related files

| File | Description |
|------|-------------|
| `GITBOOK-OPENAPI-SETUP.md` | OpenAPI spec, Test it, x-parent setup |
| `api-reference/` | Use-case pages, Overview, Quickstart, Authentication |
| `SUMMARY.md` | Left menu structure (API Reference section) |

---

*Last updated: March 2026*
