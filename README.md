# Keepnet API Documentation

GitBook ile yayınlanan Keepnet API dokümantasyonu ve doc.keepnetlabs.com içerik deposu.

---

## İçerik

| Klasör / dosya | Açıklama |
|----------------|----------|
| `api-reference/` | Quickstart, use-case'ler (Reseller → Companies, Users & groups, Training, Phishing simulation, Reports & billing) |
| `SUMMARY.md` | GitBook sol menü yapısı; API Reference bölümü burada tanımlı |

---

## Yazım kuralları ve Cursor

Yazım standartları, zorunlu kurallar ve Cursor rule dosyaları **ayrı bir private repoda** tutuluyor:

**→ [api-writing](https://github.com/ucarozan/api-writing)** (private) — DOCUMENTATION-RULES.md, keepnet-api-docs-standards.md, .cursor/rules

Bu repoda dokümantasyon üzerinde çalışırken api-writing reposundaki kuralları referans alın; Cursor rules için api-writing’i klonlayıp `.cursor/rules` dosyalarını kullanabilirsiniz.

---

## GitBook ile senkron

- İçerik GitBook Space’e bu repo üzerinden bağlıdır (GitHub entegrasyonu).
- OpenAPI spec: GitBook’da Integrations → OpenAPI → `keepnet-api` ile yapılandırılır.

---

## Yeni use-case veya sayfa eklerken

- **Rol:** Reseller → `api-reference/use-cases/reseller/`; Company Admin (ileride) → `api-reference/use-cases/company/`
- **Menü:** `SUMMARY.md` içinde ilgili alt gruba link ekleyin; bir grupta 10’dan fazla madde olursa grubu bölün.
- **Şablon ve kurallar:** api-writing reposundaki DOCUMENTATION-RULES.md ve keepnet-api-docs-standards.md.
