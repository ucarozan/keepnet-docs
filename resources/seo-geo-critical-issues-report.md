# keepnet-docs — SEO / GEO Kritik Sorunlar Raporu

Derin analiz kapsamı: **keepnet-docs/** altındaki tüm markdown dokümanları (327 dosya). Odak: arama motoru (SEO) ve erişilebilirlik/teknik (GEO) açısından **kritik** maddeler.

**Analiz tarihi:** 2026-03-11

---

## 1. Görsel erişilebilirlik ve SEO — Boş `alt=""`

**Kural ([Documentation Standards](resources/documentation-standards.md)):** Her `<img>` anlamlı `alt` veya (dekoratifse) `alt=""` + dolu figcaption içermeli.

**Durum:** Çok sayıda görselde **`alt=""`** kullanılıyor; figcaption çoğunda dolu. Boş alt, ekran okuyucularda görselin atlanmasına ve Google Images’ta anlamsız snippet’lere yol açar.

| Öncelik | Dosya / alan | Tahmini adet (alt="" ) |
|---------|----------------|------------------------|
| Yüksek  | microsoft-page-view-phishing-reporter.md | 22 |
| Yüksek  | microsoft-ribbon-phishing-reporter.md     | 24 |
| Yüksek  | executive-reports/README.md               | 22 |
| Orta    | Diğer platform/getting-started sayfaları  | ~50+ |

**Öneri:** Figcaption metnini kısaltıp `alt` değeri olarak kullanın veya figcaption ile aynı anlama gelen kısa bir alt metni ekleyin. [Figcaption remediation plan](resources/figcaption-remediation-plan.md) zaten var; aynı kapsamda `alt` doldurulmalı.

---

## 2. H1 / sayfa başlığı ile URL (slug) uyumsuzluğu

H1 ile dosya adı/URL tutarsız olduğunda kullanıcı ve arama motoru beklentisi bozulur; “duplicate” veya yanlış sayfa izlenimi oluşur.

| Dosya | Mevcut H1 | Sorun |
|-------|-----------|--------|
| `step-1.-download-phishing-reporter.md` | **Step 1. Configure the Phishing Reporter** | URL “download”, H1 “Configure” — kavram uyumsuz. |
| `onboard-new-customer.md` | **Create a company** | Slug “onboard-new-customer”, H1 “Create a company”. Menüde “Onboard new customer” gibi kullanılıyorsa H1 ile uyumlu hale getirin. |
| `compliance.md` | **Platform Security** | SUMMARY’de “Platform Security” olarak listeleniyor; H1 ile uyumlu. |

**Öneri:**  
- `step-1.-download-phishing-reporter.md`: H1’i “Step 1. Download and configure the Phishing Reporter” gibi hem download hem configure’ı yansıtacak şekilde güncelleyin veya dosya adını H1 ile uyumlu yeniden adlandırın.  
- Onboard sayfası: Ya H1 “Onboard a new customer” yapın ya da SUMMARY metnini “Create a company” ile bırakıp slug’ı kabul edilebilir açıklayın.

---

## 3. Benzer / yinelenen H1’ler (içerik çakışması riski)

Aynı veya çok yakın H1’ler farklı sayfalarda kullanılıyor; SEO’da “thin/duplicate” sayfa algısı ve snippet karışıklığı yaratır.

| H1 (veya çok yakın) | Dosya 1 | Dosya 2 |
|---------------------|---------|---------|
| **Create a company** | api-reference/use-cases/reseller/onboard-new-customer.md | create-company-with-scim-and-dec.md → “Create a company **with SCIM and DEC**” (ayırt edici) |
| **How to Deploy the Add-in in Google Workspace** | getting-started/.../how-to-deploy-add-in-in-google-workspace.md | phishing-reporter-deployment/how-to-deploy-the-add-in-in-google-workspace.md |
| **How to Deploy Add-In in Google Workspace** | (yukarıdaki ile aynı; biri “Add-in” biri “Add-In”) | Tutarlılık: hepsinde “Add-in” kullanın. |

**Öneri:**  
- “Create a company” iki sayfada geçiyor; biri “Onboard a new customer (create company)” biri “Create a company with SCIM and DEC” gibi net ayrım yapın.  
- Tüm “Add-in” / “Add-In” kullanımlarını tek forma (tercihen “Add-in”) getirin.

---

## 4. Yayınlanan dokümanlarda dil — İngilizce zorunluluğu

**Kural ([documentation-rules.md](../api-writing-repo/documentation-rules.md) H0):** doc.keepnetlabs.com’da yayınlanan tüm kullanıcıya dönük içerik **İngilizce** olmalı.

**Durum:**  
- **SUMMARY’de yer alan (yayınlanan) sayfalar** içinde Türkçe başlık/içerik tespit edilmedi (compliance, volume-and-performance, keepnet-support-help-desk, release-notes vb. İngilizce).  
- **SUMMARY’de olmayan** internal/plan dosyaları Türkçe: `resources/external-links-broken-report.md`, `resources/reporter-upn-email-mismatch-plan.md`, `resources/figcaption-remediation-plan.md` (bunlar menüde görünmüyorsa “internal” sayılabilir).

**Öneri:**  
- Bu plan/rapor dosyaları doc.keepnetlabs.com menüsüne eklenecekse tamamen İngilizceye çevrilmeli.  
- Açıkça “internal” ve menüde gösterilmiyorsa mevcut dil politikasıyla uyumlu bırakılabilir; yine de ileride yayınlanma ihtimaline karşı İngilizce versiyon düşünülebilir.

---

## 5. Meta description ve sayfa başlığı (SEO)

**Durum:** GitBook genelde ilk **H1**’i sayfa başlığı (title), bazen ilk paragrafı da snippet için kullanır. Projede **özel meta description** veya front matter (description) kullanımı taranmadı; çoğu sayfada yok varsayılır.

**Risk:**  
- Uzun veya çok teknik ilk paragraf, arama sonuçlarında kötü snippet üretebilir.  
- Benzer H1’li sayfalar farklı description ile ayrıştırılamaz.

**Öneri:**  
- GitBook’ta sayfa bazlı description varsa (veya eklenebiliyorsa) her önemli sayfa için **kısa, benzersiz, aksiyon odaklı** (örn. 150–160 karakter) description tanımlayın.  
- Özellikle “How to deploy…”, “Create a company”, “Step 1…” gibi tekrarlayan başlıkları olan sayfaları önceliklendirin.

---

## 6. Marka / terim tutarsızlığı

| Örnek | Konum | Öneri |
|-------|--------|--------|
| **Jumpcloud** | platform/company/.../jumpcloud-scim-integration.md (H1: “Jumpcloud SCIM Integration”) | Marka adı genelde **JumpCloud** (C büyük). Doğru yazım kontrol edilip H1 ve metin güncellenmeli. |
| **Microosft** (typo) | microsoft-page-view-phishing-reporter.md figcaption’da “Microosft Page View” | “Microsoft” olarak düzeltilmeli. |

---

## 7. Özet — Kritik aksiyon listesi

| # | Sorun | Öncelik | Aksiyon |
|---|--------|---------|--------|
| 1 | Çok sayıda görselde boş `alt=""` | Yüksek | Figcaption ile uyumlu anlamlı `alt` metni ekleyin; figcaption remediation ile birlikte yürütülebilir. |
| 2 | H1 “Configure” vs URL “download” (Phishing Reporter Step 1) | Orta | H1 veya dosya adını birbiriyle uyumlu hale getirin. |
| 3 | “Create a company” iki sayfada; “Add-in” / “Add-In” karışık | Orta | H1’leri ayırt edici yapın; “Add-in” yazımını tek forma getirin. |
| 4 | Yayınlanan sayfalarda dil | Orta | Plan/rapor dosyaları yayına açılacaksa İngilizce yapın. |
| 5 | Meta description eksikliği | Orta | Özellikle tekrarlayan başlıklı sayfalara kısa, benzersiz description ekleyin. |
| 6 | JumpCloud yazımı, “Microosft” typo | Düşük | Marka ve typo düzeltmeleri uygulayın. |

---

*Bu rapor, keepnet-docs içeriğinin statik analizi ve mevcut standartlarla (Documentation Standards, documentation-rules) karşılaştırılmasıyla üretilmiştir. Canlı sitede (doc.keepnetlabs.com) title/meta render’ı GitBook ayarlarına bağlıdır.*
