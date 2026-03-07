# GitBook OpenAPI x-parent Kurulum Rehberi

Bu rehber, zenginleştirilmiş OpenAPI spec'in GitBook'da kullanılması için adım adım talimatlar içerir.

## ✅ Yapılan Testler

| Test | Sonuç |
|------|-------|
| Script çalıştırma | ✓ 99 tag oluşturuldu |
| OpenAPI validasyon (swagger-cli) | ✓ Geçerli |
| Yapı kontrolü (paths, tags, x-parent) | ✓ 828 path, 1 parent + 98 child |
| servers (Test it base URL) | ✓ https://api.keepnetlabs.com |
| bearerAuth (Test it auth) | ✓ Bearer token + OAuth2 client credentials |

## Hızlı Komutlar

```bash
# Spec oluştur + doğrula
npm run openapi

# Sadece spec oluştur
npm run openapi:enrich

# Sadece doğrula
npm run openapi:validate
```

## GitBook Entegrasyon Adımları

### 1. Repo'ya Ekle ve Push Et

```bash
git add openapi/ scripts/ package.json GITBOOK-OPENAPI-SETUP.md
git commit -m "feat: OpenAPI spec x-parent for GitBook menu hierarchy"
git push
```

### 2. GitBook Space Ayarları

1. **GitBook** → Space → **Integrations** → **OpenAPI**
2. `keepnet-api` spec'ini bulun ve **Edit** tıklayın
3. **Source** → **URL** seçin
4. URL girin (örnek):
   ```
   https://raw.githubusercontent.com/keepnetlabs/keepnet-docs/main/openapi/keepnet-api-spec.json
   ```
   *(Org, repo ve branch bilgilerinize göre güncelleyin)*
5. **Save** → **Check for updates**

### 3. Doğrulama

- doc.keepnetlabs.com → API Reference → **Endpoints** bölümüne gidin
- Sol menüde **Endpoints** altında gruplanmış tag'ler görünmeli (Account, PhishingCampaign, vb.)
- 100+ ayrı menü öğesi yerine tek **Endpoints** grubu olmalı

### 4. OpenAPI Embed + Test it (GitBook Organizations benzeri)

Spec şunları içerir:
- **OpenAPI direkt embed:** Her endpoint sayfasında parametreler, request/response schema, authorization bilgisi
- **Test it butonu:** Sağ panelde token girip isteği doğrudan gönderme
- **servers:** `https://api.keepnetlabs.com` (Test it base URL)
- **bearerAuth:** Token yapıştırma (OAuth2 client credentials ile alınan)
- **OAuth2:** İsteğe bağlı client_id/client_secret ile token alma

## API Güncellendiğinde

```bash
npm run openapi
git add openapi/keepnet-api-spec.json
git commit -m "chore: update OpenAPI spec"
git push
```

GitBook URL'den otomatik güncelleme yapar (6 saatte bir) veya **Check for updates** ile manuel tetikleyebilirsiniz.
