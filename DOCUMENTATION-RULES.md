# Keepnet Dokümantasyon Kuralları

Bu dosya, doc.keepnetlabs.com ve API Reference için **zorunlu (hard) kuralları** ve gelecekteki yazarlar için rehberi içerir.

---

## 🔴 HARD KURALLAR (Zorunlu)

Aşağıdaki kurallar **her yeni veya güncellenen sayfada** uygulanmalıdır. İhlal = review reddi.

### H1: Task-based başlıklar

| ✅ Do | ❌ Don't |
|------|----------|
| `Authenticate your requests` | `Authentication` |
| `Request an access token` | `Token endpoint` |
| `Pull training reports` | `Training Reports API` |
| `Add target users` | `Target Users` |

**Kalıp:** Fiil + nesne (`Create credentials`, `Handle errors`, `Filter results`)

---

### H2: Code first, açıklama sonra

Önce kod/örnek, sonra açıklama. Teori ile başlama.

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

**API Reference use-case sayfaları:** Endpoint detayı için OpenAPI (Endpoints sidebar) referansı ver. Kod örneği yerine `[Test it →](Endpoints)` kullanılabilir.

---

### H3: Direct links, "for more information" yok

Ok stilinde inline link kullan. "For more information, see X" yazma.

| ✅ Do | ❌ Don't |
|------|----------|
| `[REST API Settings →](https://doc...)` | `For more information about REST API, see...` |
| `[Pull Training List →](use-cases/...)` | `Refer to the Pull Training List guide for details.` |

---

### H4: Internal linkler — GitHub yok

Doküman içi linkler `api-reference/`, `next-generation-product/` gibi relative path kullanır. `github.com` veya `[Endpoints](.)` gibi dış/bozuk link kullanma.

---

### H5: Hint blokları — platform cross-link

`{% hint style="info" %}` kullandığında platform doc linki ekle:

```markdown
{% hint style="info" %}
**Platform UI:** Go to **Company → Company Settings → REST API**.
[REST API Settings →](https://doc.keepnetlabs.com/...)
{% endhint %}
```

---

## 📐 Sayfa Şablonları

### API Reference — Use-case sayfası

Her use-case sayfası **aynı bölüm sırası** ile yazılır:

```markdown
# [Use-case başlığı — task-based]

[1–2 cümle: Ne yapılır, kim kullanır]

## Who can use this
| Role | Can use? | What you need |

## Prerequisites
- Token, Company ID (Reseller), vb.

## [Adım 1 — task-based]
**Endpoint:** `METHOD /path`
[Kısa açıklama]
{% hint %} [Endpoints → Test it](sidebar) {% endhint %}

## Reseller: scope by Company ID
[Varsa]

## Common errors
| Code | Cause | Fix |

## What's next
- [Related use-case →]
- [Related endpoint →]
```

---

### API Reference — Temel sayfalar (Overview, Quickstart, Authentication)

```markdown
# [Verb] [object]

One-sentence description.

---

## [First task heading]
[Code or OpenAPI referans first]
[Brief explanation]

---

## Handle errors
[Error table]

---

## What's next
- [Link →]
```

---

## 📖 7 Cs (GitBook ilkeleri)

| İlke | Açıklama | Uygulama |
|------|----------|----------|
| **Convenient** | Geliştiriciyi kendi ortamında karşıla | Hata mesajları spesifik, doc dışı yardım |
| **Concrete** | Örnekler, mümkünse interaktif | OpenAPI Test it, gerçekçi örnekler |
| **Consistent** | Format, terim tutarlı | Tüm use-case'lerde aynı şablon |
| **Complete** | Her endpoint, response | OpenAPI spec tek kaynak |
| **Contextual** | Bağlam, skimmable | Rol, ön koşul tabloları |
| **Concise** | Hızlıca konuya gir | Kısa açıklamalar, tablolar |
| **Clear** | Sade dil | Teknik jargon yerine net ifade |

---

## ✍️ Dil ve stil (Google Style Guide)

- **Active voice:** "Request a token" not "A token should be requested."
- **Second person:** "You need a Client ID" not "The user needs..."
- **Present tense:** "The token expires" not "The token will expire."
- **Imperative mood:** "Click + NEW" not "You should click..."
- **Sentence case** başlıklar: `Handle token expiry` not `Handle Token Expiry`
- **Exception:** Proper nouns, product names (`Awareness Educator`, `Company Admin`)

**Code formatting:**
- `code font`: endpoint paths, parameters, HTTP methods, status codes
- **bold**: UI elements (**Company → Settings → REST API**)
- UI için code font kullanma

---

## 📋 Terim sözlüğü

| Kullan | Kaçın |
|--------|------|
| `Generate` | `Create` (credentials, tokens için) |
| `Request` | `Get`, `Fetch` (token için) |
| `Authenticate` | `Auth`, `Login` |
| `Credential` | `Key`, `Secret key` |
| `Expires after` | `Has a TTL of` |
| `Endpoint` | `API call`, `method` |
| `Returns` | `Responds with`, `gives back` |

---

## 🔧 Hint blokları

| Style | Kullanım |
|-------|----------|
| `info` | Platform UI, notlar |
| `warning` | Veri kaybı riski, one-time secrets |
| `danger` | Kalıcı silme, güvenlik riski |
| `success` | Best practice, önerilen pattern |

---

## 📁 İlgili dosyalar

| Dosya | Açıklama |
|-------|----------|
| `GITBOOK-OPENAPI-SETUP.md` | OpenAPI spec, Test it, x-parent kurulumu |
| `api-reference/` | Use-case sayfaları, Overview, Quickstart, Authentication |
| `SUMMARY.md` | Sol menü yapısı (API Reference bölümü) |

---

*Son güncelleme: Mart 2026*
