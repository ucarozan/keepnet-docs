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

### H0: Documentation language — English only

All user-facing documentation (API Reference, use-cases, Quickstart, guides) must be written in **English**. No Turkish or other languages in body text, headings, hints, table headers, or button/step labels. Exception: internal project notes or comments in code/config that are not published to doc.keepnetlabs.com.

---

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

### H8b: Swagger + tablo — tablo kullanma

`{% swagger %}` (Test it) olan sayfalarda markdown ve HTML tabloları bozulabiliyor. **Tablo yerine bullet list** kullan:

```markdown
## Common errors

* **403 Forbidden** — Credential is not Reseller. Set Client Role = **Reseller** in **Company → Company Settings → REST API**.
* **401 Unauthorized** — Missing or invalid token. Request a new token via `POST /connect/token`.
* **400 Bad Request** — Invalid request body. Include required fields.
```

Format: `* **HTTP status** — Cause. Fix.`

### H8c: Test it — Request body minimal example

Test it panelinde body içeren (POST/PUT) endpoint'lerde **schema'dan gelen karmaşık default** (filterGroups, filterItems, nested null'lar) API'de `400 Invalid request` hatası veriyor. **Minimal inline schema + example** kullan.

**Uygulama:** `scripts/enrich-openapi-spec.mjs` içinde `injectRequestExamples()` — her yeni endpoint için ekle.

Kural|Açıklama
:---|:---
**Minimal schema**|Sadece gerekli alanlar — `$ref` ile gelen karmaşık filter yapısı kullanma
**Example**|Authorize sonrası direkt Send ile çalışacak değerler (örn. `pageNumber: 1`, `pageSize: 10`, `orderBy: "CreateTime"`, `filter: null`)
**Pagination**|Search endpoint'leri: `pageNumber`, `pageSize`, `orderBy`, `ascending`, `filter: null`

**Örnek (companies/search):**
```json
{
  "pageNumber": 1,
  "pageSize": 10,
  "orderBy": "CreateTime",
  "ascending": false,
  "filter": null
}
```

Yeni endpoint dokümante ederken: `enrich-openapi-spec.mjs` → `injectRequestExamples()` içine path + example ekle.

### H8d: Test ve örnek veriler — sadece dummy / seed / placeholder

Yeni doküman veya use-case eklerken **test ederek ekle**; örneklerde ve Test it açıklamalarında **gerçek veri kullanma**. Sadece dummy, seed veya placeholder (sallama) veriler kullan.

Kural|Açıklama
:---|:---
**Token / credential**|Örnekte `eyJ...`, `xxxxxxxxxxxxxxxx` gibi anonim placeholder. Gerçek `access_token`, Client ID/Secret yazma.
**Şirket / kullanıcı adı**|Örnekte "Acme Corp", "demo-user", "Company A" gibi dummy isimler. Gerçek müşteri veya şirket adı kullanma.
**ID / resourceId**|Örnekte `xC5kfGz7w2Nz`, `abc123` gibi seed/placeholder. Gerçek production ID’leri dokümana koyma.
**E-posta / telefon**|Örnekte `user@example.com`, `+15551234567` gibi test değerleri.

**Amaç:** Dokümanı test ederken ve okuyucu Test it kullanırken güvenli, tekrarlanabilir örnekler; production verisi veya gizlilik ihlali yok.

---

## 📐 Page Templates

### API Reference — Tag page (GitBook standard)

**Referans:** <a href="https://gitbook.com/docs/developers/gitbook-api/api-reference/organizations" target="_blank" rel="noopener noreferrer">GitBook Organizations API →</a>

Tag veya use-case bazlı her API sayfası **aynı yapıyı** takip eder:

```markdown
# [Sayfa başlığı — task-based]

[1 paragraf: İş hedefi — ne yapar, kim kullanır. 2–3 cümle.]

## METHOD /path

> [OpenAPI summary — tek cümle özet]

{% swagger src="..." path="/path" method="..." expanded="true" %}
{% endswagger %}

## METHOD /path

> [OpenAPI summary]

{% swagger ... %}
{% endswagger %}
```

Kural|Açıklama
:---|:---
**H1**|Task-based başlık (örn. `List companies with license details`)
**Intro**|Tek paragraf — iş hedefi, rol (Reseller/Company Admin)
**H2**|`METHOD /path` formatında (örn. `POST /api/companies/search`)
**Blockquote**|OpenAPI `summary` değeri veya kısa özet
**Swagger**|Her endpoint için `{% swagger %}` — Test it zorunlu
**Request body**|Body içeren endpoint'lerde H8c — `enrich-openapi-spec.mjs` içinde minimal example ekle
**Opsiyonel**|Reseller/role hint, Common errors tablosu (sayfa sonunda)

**Yasak:** Who can use this, Prerequisites, Steps, What's next gibi uzun bölümler — sadece referans odaklı, endpoint-first.

---

### API Reference — Use-case page (Legacy)

Eski use-case sayfaları yukarıdaki **Tag page** standardına migrate edilmeli. Geçiş sürecinde aşağıdaki yapı hâlâ kabul edilir:

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

### API Reference — Quickstart (standard hierarchy)

Quickstart tek core page'dir. Bölüm sırası **sabit** — değiştirme.

Sıra|Bölüm|İçerik
:---|:---|:---
1|Intro|Title, kısa açıklama, API kullanım alanları (bullet), OAuth mention
2|{% stepper %}|3 adım: Getting started → Request token → First API call
3|Base URL and response format|Base URL, `isSuccess`, `data`, `messages`
4|Common conventions|Pagination, Filter, Sorting, Company scope
5|What the token contains|JWT claim tabloları (Company context, Role and access, Token metadata) + ayrı hint'ler (Company Admin, Reseller)
6|Who can use the API|Role tablosu
7|Token expiry and errors|HTTP status tablosu
8|Reseller: scope by Company ID|Header, path, query — Company ID kullanımı
9|Keep credentials secure|Do / Don't hint'leri
10|**Explore the API**|Use-case linkleri tablosu — **sayfanın sonunda**

**Hint blokları:** Company Admin ve Reseller için **ayrı** hint kullan — tek paragrafta sıkıştırma.

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

**Participants (company group):** Bir company group’un **üyesi olan şirketler**. API’de "participants" = gruptaki şirketlerin listesi (company `resourceId` dizisi). `PUT /api/company-groups/{resourceId}/participants` ile gruba eklenecek veya güncellenecek şirket ID’lerini gönderirsin. Kullanıcı veya kullanıcı grubu değil, **şirket (company)** listesidir.

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

File|Description
:---|:---
`GITBOOK-OPENAPI-SETUP.md`|OpenAPI spec, Test it, x-parent setup
`scripts/enrich-openapi-spec.mjs`|Spec zenginleştirme — token endpoint, request body examples (H8c)
`api-reference/`|Use-case pages, Quickstart
`SUMMARY.md`|Left menu structure (API Reference section)

---

*Last updated: March 2026*
