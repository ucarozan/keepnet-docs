# Keepnet API Documentation

GitBook ile yayınlanan Keepnet API dokümantasyonu ve doc.keepnetlabs.com içerik deposu. Bu repo, Cursor ile sürdürülebilir şekilde güncellenmek üzere tasarlanmıştır.

---

## Projeyi kendine alıp Cursor ile devam etmek

1. **Repo’yu klonla** (GitHub’da private repo oluşturduysanız kendi repo URL’inizi kullanın):
   ```bash
   git clone https://github.com/<org>/keepnet-docs.git
   cd keepnet-docs
   ```

2. **Cursor’da aç:**  
   `File → Open Folder` ile bu klasörü açın. Cursor, `.cursor/rules/` altındaki kuralları otomatik kullanır.

3. **Standartlar nerede:**
   - **DOCUMENTATION-RULES.md** — Zorunlu kurallar (dil, başlıklar, linkler, menü yapısı, sayfa şablonları).
   - **keepnet-api-docs-standards.md** — Yazım standartları (Google Style Guide + 3 Keepnet kuralı).
   - **.cursor/rules/** — Cursor’a verilen kısa kurallar (API sayfaları, linkler, menü); detay için yukarıdaki iki dosyaya referans verir.

4. **Değişiklik yapıp GitHub’a göndermek:**
   ```bash
   git add .
   git commit -m "docs: kısa açıklama"
   git push origin main
   ```

---

## Klasör yapısı (özet)

| Klasör / dosya | Açıklama |
|----------------|----------|
| `api-reference/` | Quickstart, use-case’ler (Reseller → Companies, Users & groups, Training, Phishing simulation, Reports & billing) |
| `SUMMARY.md` | GitBook sol menü yapısı; API Reference bölümü burada tanımlı |
| `DOCUMENTATION-RULES.md` | Tüm dokümantasyon kuralları (hard rules + şablonlar) |
| `keepnet-api-docs-standards.md` | Yazım ve stil kuralları |
| `.cursor/rules/` | Cursor rule dosyaları (`.mdc`) |

---

## GitBook ile senkron

- İçerik GitBook Space’e bu repo üzerinden bağlıdır (GitHub entegrasyonu).
- OpenAPI spec: GitBook’da Integrations → OpenAPI → `keepnet-api` ile yapılandırılır; spec güncellemesi için `npm run openapi` (varsa) → commit → push → GitBook’da “Check for updates”.

---

## Yeni use-case veya sayfa eklerken

- **Rol:** Reseller mı Company Admin mi? → Doğru klasöre (`api-reference/use-cases/reseller/` veya ileride `company/`) koy.
- **Menü:** `SUMMARY.md` içinde ilgili alt gruba (Companies, Users & groups, Training, vb.) link ekle; bir grupta 10’dan fazla madde olursa grubu böl veya yeni alt grup aç.
- **Sayfa yapısı:** `DOCUMENTATION-RULES.md` → “API Reference — Tag page” şablonuna uy (H1 task-based, H2 = METHOD /path, swagger, code first).
- **Linkler:** Sadece relative path; tüm linkler `target="_blank"` ile yeni sekmede açılsın.

Bu repo’yu klonlayan herkes aynı standartlarla Cursor ile dokümantasyona devam edebilir.
