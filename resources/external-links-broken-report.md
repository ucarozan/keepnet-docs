# keepnet-docs — Kırık / Bozuk Harici Linkler Raporu

Bu rapor, `keepnet-docs/` altındaki `.md` dosyalarında geçen **harici linklerin** (external URLs) kontrolü sonucu **404 veya erişilemeyen** bulunanları listeler. Kanıt: her link için yapılan HTTP isteğinde alınan sonuç.

**Kontrol tarihi:** 2026-03-11  
**Kapsam:** `keepnet-docs` içindeki tüm markdown dosyalarındaki `http://` ve `https://` linkleri (doc.keepnetlabs.com dahil edilmedi; YouTube/embed ve Keepnet kendi alan adları örnekle kontrol edildi).

---

## 1. Kırık link (404 Not Found)

### 1.1 Microsoft Learn — Exchange tokens sayfası (kaldırılmış/taşınmış)

| Alan | Değer |
|------|--------|
| **URL** | `https://learn.microsoft.com/en-us/office/dev/add-ins/outlook/turn-exchange-tokens-on-off` |
| **HTTP durumu** | **404 Not Found** |
| **Kanıt** | `mcp_web_fetch` ile GET isteği; yanıt: `Error fetching URL, status code: 404 Not Found` |

**Dosya ve kullanım:**

- **Dosya:** `next-generation-product/platform/phishing-reporter/phishing-reporter-deployment/phishing-reporter-page-view-failure-due-to-deprecated-exchange-online-tokens.md`
- **Satır ~23:** Short Term Solution bölümünde “Customers can turn on legacy Exchange Online tokens following below documentation.” ifadesinden sonra bu URL metin ve link olarak kullanılıyor.
- **İçerik:** Legacy Exchange Online token’larını açma/kapama dokümanına referans; sayfa Microsoft tarafından kaldırılmış veya taşınmış.

**Öneri:** Aynı konuyu anlatan güncel Microsoft dokümanı bulunup link güncellenmeli. Örneğin [Nested app authentication FAQ - Legacy tokens](https://learn.microsoft.com/en-us/office/dev/add-ins/outlook/faq-nested-app-auth-outlook-legacy-tokens) (bu link kontrol edildi, 200 dönüyor) veya [Updates on deprecating legacy Exchange Online tokens](https://devblogs.microsoft.com/microsoft365dev/updates-on-deprecating-legacy-exchange-online-tokens-for-outlook-add-ins/) gibi bir sayfaya yönlendirilebilir.

**Yapılan düzeltme (2026-03-11):** Kırık link kaldırıldı; Short Term Solution bölümünde ana link [Nested app authentication FAQ - Legacy tokens](https://learn.microsoft.com/en-us/office/dev/add-ins/outlook/faq-nested-app-auth-outlook-legacy-tokens) ile değiştirildi ve “See also” olarak [Regarding deprecation of exchange tokens (Microsoft Q&A)](https://learn.microsoft.com/en-us/answers/questions/4756209/regarding-deprecation-of-exchange-tokens) eklendi.

---

## 2. Kontrol edilen ve çalışan linkler (örnek)

Aşağıdaki harici linkler aynı kontrolde **200** veya erişilebilir yanıt verdi (kısa örnek):

- `https://www.digicert.com/dc/code-signing/microsoft-authenticode.htm` — 200
- `https://support.microsoft.com/en-us/office/feature-comparison-between-new-outlook-and-classic-outlook-de453583-1e76-48bf-975a-2e9cd2ee16dd` — 200
- `https://support.microsoft.com/en-gb/office/toggle-out-of-the-new-outlook-for-windows-ec102b39-5727-418e-ae1f-a1805434640c` — 200
- `https://learn.microsoft.com/en-us/office/dev/add-ins/outlook/faq-nested-app-auth-outlook-legacy-tokens` — 200
- `https://learn.microsoft.com/en-us/entra/fundamentals/how-to-manage-user-profile-info` — 200 (daha önce 404 olan `users-profile-edit` yerine güncellenmişti)
- `https://keepnetlabs.com/blog/what-is-the-protection-level-agreement-in-security-awareness-training` — 200
- `https://api.keepnetlabs.com/docs/index.html` — 200
- `https://learn.microsoft.com/en-us/archive/blogs/eopfieldnotes/1986` — 200
- `https://learn.microsoft.com/en-us/azure/security/fundamentals/shared-responsibility` — 200
- `https://learn.microsoft.com/en-us/visualstudio/vsto/registry-entries-for-vsto-add-ins` — 200

---

## 3. Özet

| Durum | Adet |
|--------|------|
| **Kırık (404)** | 0 (1 adet düzeltildi) |
| **Raporda örnek verilen çalışan** | 10 |

**Sonuç:** Eski kırık link (turn-exchange-tokens-on-off) kaldırılıp FAQ + Q&A linkleri ile değiştirildi. Güncel durumda kırık harici link tespit edilmedi.
