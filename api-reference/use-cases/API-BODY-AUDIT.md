# API Reference Use-Cases — Request Body Audit

Bu dokümanda **API Reference → Reseller** altındaki tüm use-case sayfaları tek tek ele alınmış; POST/PUT endpoint'lerin **request body** yapıları spec ve dokümantasyonla karşılaştırılmıştır. Eksik/hatalı olanlar düzeltilmiştir.

**Güncel editör kuralı (Cursor):** Arama/liste endpoint’leri için **`orderBy`/`filter`/`searchInputTextValue` alanlarında `null`** kullanma; minimal **`filter`** + açık sıralama — bkz. **`.cursor/rules/keepnet-api-search-payloads.mdc`** (bu repoda).

## Özet tablo

| Use-case | Endpoint (POST/PUT) | Body kaynağı | Durum |
|----------|---------------------|--------------|--------|
| Scope API requests to a customer | `POST /api/companies/search` | Enriched (minimal) | ✅ Doğru |
| List companies with license details | `POST /api/companies/search`, `POST /api/companies/search/export` | Enriched | ✅ Doğru |
| Create a company (Onboard) | `POST /api/companies`, `PUT /api/companies/{id}`, `PUT .../participants` | Spec $ref | ⚠️ Spec'ten; Test it schema'ya göre doldurulur |
| Get a company | `POST /api/companies/search` (sadece liste) | Enriched | ✅ Doğru |
| Update a company | `POST /api/companies/search`, `PUT /api/companies/{resourceId}` | Enriched + $ref | ✅ Search doğru; PUT spec'ten |
| Delete a company | `POST /api/companies/search` | Enriched | ✅ Doğru |
| List and manage company groups | `POST /api/company-groups/search`, `POST .../search/export`, `POST /api/company-groups`, `PUT .../{id}`, `PUT .../participants` | Enriched (search/export) + $ref | ✅ Search/export doğru; diğerleri spec'ten |
| Add target users for a customer | `POST /api/companies/search`, `POST /api/target-users` | Enriched + $ref | ✅ Search doğru |
| List or export target users | `POST /api/companies/search`, `POST /api/target-users/search`, `POST .../search/export` | Enriched + $ref | ✅ Search doğru; target-users sayfada örnek body var |
| List and create target groups | `POST /api/companies/search`, `POST /api/target-groups/search`, `POST /api/target-groups` | Enriched + $ref | ✅ Search doğru |
| Add system user for a customer | `POST /api/companies/search`, `POST /api/system-users` | Enriched + $ref | ✅ Search doğru |
| Set up SCIM for a customer | `POST /api/companies/search`, `POST /api/scim`, `POST /api/scim/search`, `PUT /api/scim/{id}`, `POST .../revoke` | Enriched + $ref | ✅ Search doğru |
| **View customer's enrollment list and report** | `POST /api/companies/search`, `POST /api/enrollments/search`, `POST .../users/search`, `POST /api/enrollments/search/export` | Enriched (hepsi) | ✅ Tüm body'ler doğru; sayfada örnek body'ler spec ile uyumlu |
| View enrollment sending, certificates, notifications | `POST /api/companies/search`, `POST /api/enrollments/search`, `POST .../sending-report/search`, `POST .../certificates/search`, `POST .../reminder-mails/search`, `POST /api/notifications/{id}/search` | Enriched (companies, enrollments) + $ref | ✅ Düzeltildi: enrollments/search için "filter required" açıklaması doğru yapıya (Condition, FilterGroups) ve ilgili sayfaya yönlendirildi |
| Pull survey results for a customer | `POST /api/companies/search`, `POST /api/enrollments/search`, `POST .../users/search` | Enriched | ✅ Doğru |
| View customer's campaign list and report | `POST /api/companies/search`, `POST /api/phishing-simulator/phishing-campaign/search`, `POST .../phishing-campaign-job-report/search` | Enriched + $ref | ✅ Search doğru; sayfada örnek body (pageNumber, pageSize) var |
| List phishing scenarios | `POST /api/companies/search`, `POST /api/phishing-simulator/phishing-scenario/search` | Enriched + $ref | ✅ Search doğru |
| Create and start phishing campaign | `POST /api/companies/search`, `POST /api/phishing-simulator/phishing-campaign`, `POST .../campaign-job/start/{id}` | Enriched + $ref | ✅ Search doğru |
| Pull executive report data | `POST /api/companies/search`, `POST /api/executive-report/search`, `POST /api/executive-report/get-widget-datas` | Enriched + $ref | ✅ Search doğru |
| Pull gamification report data | `POST /api/companies/search`, `POST /api/leaderboard/get-top-performers`, `get-all`, `user-performance`, `get-user-timeline` | Enriched + $ref | ✅ Search doğru |
| Export gamification leaderboard | `POST /api/companies/search`, `POST /api/leaderboard/get-all/export`, `get-user-timeline/export` | Enriched + $ref | ✅ Search doğru |
| List scheduled reports | (Placeholder — endpoint henüz dokümante edilmedi) | — | — |
| Export customer list for billing | `POST /api/companies/search/export` | Enriched | ✅ Doğru |
| **List customers exceeding license limit** | `POST /api/companies/search`, `POST /api/companies/search/export` | Enriched + **overage örneği eklendi** | ✅ Spec'e `isTargetUserCountExceededLimit` ve overage example eklendi |
| List companies for cross-sell / List recently created / Get total monthly user count / Renewals / Expired licenses | `POST /api/companies/search`, `POST /api/companies/search/export` | Enriched | ✅ Doğru |

## Yapılan düzeltmeler

1. **view-customer-enrollment-sending-certificates-notifications.md**  
   - `POST /api/enrollments/search` için "filter (required; use `{}` for no filters)" ifadesi **yanlıştı**. API, `Condition`, `SearchInputTextValue`, `FilterGroups` içeren yapı bekliyor. Metin güncellendi; tam örnek için [View customer's enrollment list and report](view-customer-enrollment-list-and-report.md) sayfasına yönlendirme eklendi.

2. **enrich-openapi-spec.mjs**  
   - **companies/search:** `isTargetUserCountExceededLimit` opsiyonel alan ve "Customers exceeding license limit" örneği eklendi.  
   - **companies/search/export:** Aynı alan ve overage export örneği eklendi.  
   - **enrollments/search/export:** Bu path için minimal request body enjekte edildi (filter: condition, searchInputTextValue, filterGroups; reportAllPages, exportType). Böylece Test it ekranında circular ref / karmaşık schema yerine kullanılabilir örnek gösterilir.

## Enriched path'ler (Test it'te minimal/doğru body)

Script aşağıdaki path'lerde request body'yi override ediyor:

- `POST /api/companies/search` — minimal + overage örneği  
- `POST /api/companies/search/export` — minimal CSV export + overage örneği  
- `POST /api/company-groups/search`  
- `POST /api/company-groups/search/export`  
- `POST /api/enrollments/search`  
- **`POST /api/enrollments/search/export`** *(yeni)*  
- `POST /api/training-reports/{enrollmentId}/users/search`  

Diğer POST/PUT endpoint'lerde body, OpenAPI spec'teki `$ref` ile gelen schema'ya göre gösterilir; bazılarında karmaşık veya recursive filter yapısı olabilir. Use-case sayfalarında "Example body" veya "Request body: see Endpoints → …" ile tarif edildiği gibi kullanılmalıdır.

---

*Son güncelleme: bu audit sırasında yapılan düzeltmelerle.*
