# OpenAPI Spec — GitBook Menü Hiyerarşisi

Bu klasör, GitBook API Reference için `x-parent` ile zenginleştirilmiş OpenAPI spec içerir. Tüm endpoint grupları **Endpoints** altında toplanır.

## Dosyalar

| Dosya | Açıklama |
|-------|----------|
| `keepnet-api-spec.json` | Canlı API spec + tags + x-parent (GitBook için) |

## GitBook'da Kullanım

### Seçenek 1: URL ile (Önerilen)

1. Bu dosyayı repo'ya ekleyip push edin.
2. GitBook Space → **Integrations** → **OpenAPI** → `keepnet-api` spec'ini düzenleyin.
3. **Source** olarak **URL** seçin.
4. URL'yi şu formata ayarlayın:
   ```
   https://raw.githubusercontent.com/ORGANIZATION/keepnet-docs/BRANCH/openapi/keepnet-api-spec.json
   ```
   (Örn: `https://raw.githubusercontent.com/keepnetlabs/keepnet-docs/main/openapi/keepnet-api-spec.json`)
5. **Check for updates** ile güncellemeyi tetikleyin.

### Seçenek 2: Dosya Yükleme

1. `scripts/enrich-openapi-spec.mjs` script'ini çalıştırın.
2. GitBook → OpenAPI → `keepnet-api` → **Update** ile yeni dosyayı yükleyin.

### ⚠️ Test it'te Body yanlış görünüyorsa (filterGroups, orderBy: null, 400 hatası)

**Sebep:** GitBook, canlı API URL'sini (`https://api.keepnetlabs.com/swagger/v1/swagger.json`) kullanıyor olabilir. Bu spec'te request body schema karmaşık — API 400 döner.

**Çözüm:** GitBook Integration → OpenAPI → `keepnet-api` → **Source URL** mutlaka **GitHub raw** olmalı:
```
https://raw.githubusercontent.com/ORGANIZATION/keepnet-docs/BRANCH/openapi/keepnet-api-spec.json
```
Enriched spec minimal body içerir (`pageNumber`, `pageSize`, `orderBy`, `filter: null`). **Check for updates** tıklayın.

## Spec Güncelleme

API değiştiğinde spec'i yeniden oluşturun. Repo root'tan:

```bash
node scripts/enrich-openapi-spec.mjs openapi/keepnet-api-spec.json
```

## Beklenen Menü Yapısı

```
API REFERENCE
├── Overview
├── Quickstart
├── Authenticate your requests
├── Reseller
├── Reports
├── Company & Users
└── Endpoints  ← Tıklanınca açılır
    ├── Account
    ├── PhishingCampaign
    ├── Training
    └── ... (98 tag)
```
