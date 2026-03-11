# Plan: Reporter Button UPN / Email Mismatch — Documentation (revised)

**Overview:** UPN/email mismatch içeriği, **mevcut Troubleshooting bölümlerinin altına** yeni alt başlık (###) olarak eklenecek; tam metin için tek bir troubleshooting sayfası kullanılacak.

---

## Situation summary

Keepnet Reporter button add-in, kullanıcının **Entra ID UPN** ile **primary email** adresi uyuşmadığında (ör. UPN `nbean@...`, primary email `nivanov@...`) bazı kullanıcılarda çalışmıyor. Çözüm: Entra ID’de UPN’i primary email ile aynı yapmak. Tüm içerik **İngilizce** olacak.

---

## Mevcut Troubleshooting alanları

| Dosya | Bölüm | Mevcut alt başlıklar |
|-------|--------|----------------------|
| microsoft-page-view-phishing-reporter.md | `## Troubleshooting` (satır ~171) | AADSTS530004, AADSTS50076 |
| microsoft-ribbon-phishing-reporter.md | `## Troubleshooting Microsoft Ribbon Phishing Reporter` (satır ~131) | "We were unable to process this item...", AADSTS530004 |
| troubleshooting-phishing-reporter-on-outlook-desktop.md | Sayfa tamamı troubleshooting | Adımlar 1–8, hata alt bölümleri |

---

## 1. Tek troubleshooting sayfası (kaynak)

**Dosya:** `next-generation-product/platform/phishing-reporter/phishing-reporter-deployment/troubleshooting-reporter-button-upn-email-mismatch.md`

**İçerik (İngilizce):** Problem, symptoms, root cause, resolution (identify users, update UPN in Entra ID, verify), best practice. Tam metin burada; Page View ve Ribbon’da sadece özet + link verilecek.

---

## 2. Page View — Troubleshooting altına ekleme

**Dosya:** `next-generation-product/platform/phishing-reporter/phishing-reporter-deployment/microsoft-page-view-phishing-reporter.md`

**Yer:** `## Troubleshooting` bölümü içinde, **son alt başlıktan sonra** (AADSTS50076’dan sonra, `## How Microsoft Page View Phishing Reporter Buttons Look...` bölümünden önce).

**Eklenecek:** Yeni alt başlık  
`### Reporter button not working for some users — UPN and primary email mismatch`  
+ kısa paragraf (problem + belirtiler) + link:  
“For identification steps and resolution, see [Troubleshooting: Phishing Reporter Button — UPN and Email Mismatch](troubleshooting-reporter-button-upn-email-mismatch.md).”

---

## 3. Ribbon — Troubleshooting altına ekleme

**Dosya:** `next-generation-product/platform/phishing-reporter/phishing-reporter-deployment/microsoft-ribbon-phishing-reporter.md`

**Yer:** `## Troubleshooting Microsoft Ribbon Phishing Reporter` bölümü içinde, **son alt başlıktan sonra** (AADSTS530004’ten sonra).

**Eklenecek:** Aynı alt başlık  
`### Reporter button not working for some users — UPN and primary email mismatch`  
+ kısa özet + aynı troubleshooting sayfasına link.

---

## 4. İsteğe bağlı: Outlook Desktop troubleshooting sayfası

**Dosya:** `next-generation-product/platform/phishing-reporter/troubleshooting-phishing-reporter-on-outlook-desktop.md`

**Yer:** “Step 8: Contact Support”tan önce veya kısa bir “See also” notu.

**Eklenecek:** Microsoft 365 add-in (Page View veya Ribbon) kullanılıyorsa ve **sadece bazı kullanıcılar** Reporter’ı kullanamıyorsa, sebep UPN/email uyumsuzluğu olabilir; çözüm için [Troubleshooting: Reporter Button — UPN and Email Mismatch](phishing-reporter-deployment/troubleshooting-reporter-button-upn-email-mismatch.md) sayfasına link.

---

## 5. SUMMARY.md ve Deployment README

- **SUMMARY.md:** Phishing Reporter Deployment altına yeni troubleshooting sayfası için bir link ekle.
- **phishing-reporter-deployment/README.md:** Shortcuts veya “Troubleshooting” alt bölümüne aynı sayfaya link ekle.

---

## 6. Kurulum öncesi uyarı (Page View)

**Dosya:** microsoft-page-view-phishing-reporter.md  

**Yer:** “How to Install the Microsoft Page View Phishing Reporter” adımından hemen önce (satır ~71 civarı).  

**Eklenecek:** Prerequisite / important not: Her kullanıcı için **Entra ID UPN** ile **primary email** aynı olmalı; aynı değilse add-in o kullanıcılarda çalışmayabilir. Çözüm için [Troubleshooting: UPN and Email Mismatch](troubleshooting-reporter-button-upn-email-mismatch.md) linki.

---

## 7. Yapılacaklar özeti

| İşlem | Dosya |
|--------|--------|
| **Oluştur** | troubleshooting-reporter-button-upn-email-mismatch.md (tam içerik) |
| **Düzenle** | microsoft-page-view-phishing-reporter.md — Troubleshooting altına yeni ### + kurulum öncesi uyarı |
| **Düzenle** | microsoft-ribbon-phishing-reporter.md — Troubleshooting altına yeni ### |
| **Düzenle** (isteğe bağlı) | troubleshooting-phishing-reporter-on-outlook-desktop.md — “See also” + link |
| **Düzenle** | SUMMARY.md, phishing-reporter-deployment/README.md — yeni sayfaya link |

Özet: **Troubleshooting alanları varsa onların altına** (Page View ve Ribbon’da mevcut `## Troubleshooting` içine yeni `###`) ekleme planlandı; tam metin tek sayfada toplanacak.

---

## Link + eklenen metin (doc.keepnetlabs.com, İngilizce aynen)

### 1. Microsoft Page View Phishing Reporter

**Link:** https://doc.keepnetlabs.com/next-generation-product/platform/phishing-reporter/phishing-reporter-deployment/microsoft-page-view-phishing-reporter

**Hint (kurulumdan önce):**

```
**User Principal Name (UPN) and primary email:** For the Phishing Reporter add-in to work, each user's **Microsoft Entra ID (Azure AD) User Principal Name** must match their **primary email address** in Outlook. If they differ, the add-in may not work for those users. Identification steps and resolution are described in the Troubleshooting section below.
```

**Troubleshooting — ### Reporter button not working for some users — UPN and primary email mismatch:**

```
The Keepnet Phishing Reporter add-in may fail for **some users** when their **Microsoft Entra ID (formerly Azure AD) User Principal Name (UPN)** does not match their **primary email address** used in Outlook. Typically only a subset of users in the organization are affected.

**Symptoms:** The Phishing Reporter button does not appear, is greyed out, or does not respond for certain users; other users in the same tenant can use it. The user can open Outlook and use email normally, but reporting fails when they click the Reporter button.

**Root cause:** The add-in identifies the user by **primary email address** (e.g. SMTP/mailbox address). Sign-in uses **UPN**. If UPN and primary email differ, the add-in cannot match the signed-in identity to the correct user in Entra ID.

**Resolution:**

1. **Identify affected users:** In Microsoft Entra ID, open the user's profile and compare **User principal name** with **primary email address** (Mail/Primary SMTP). If they differ, the user is affected.
2. **Update UPN:** In [Microsoft 365 admin center](https://admin.microsoft.com/) or [Azure portal](https://portal.azure.com/), go to **Users** → **Active users**, open the user, edit **User principal name** to match their **primary email address**, and save. See [Add or update a user's profile information in Azure AD](https://learn.microsoft.com/en-us/entra/fundamentals/how-to-manage-user-profile-info) for details and constraints.
3. **Verify:** Have the user sign out and sign in again, then try the Phishing Reporter button.

**Best practice:** Ensure UPN matches primary email for all users who will use the add-in, and include this in your Phishing Reporter deployment checklist.
```

---

### 2. Microsoft Ribbon Phishing Reporter

**Link:** https://doc.keepnetlabs.com/next-generation-product/platform/phishing-reporter/phishing-reporter-deployment/microsoft-ribbon-phishing-reporter

**Troubleshooting — ### Reporter button not working for some users — UPN and primary email mismatch:**

```
The Keepnet Phishing Reporter add-in may fail for **some users** when their **Microsoft Entra ID (formerly Azure AD) User Principal Name (UPN)** does not match their **primary email address** used in Outlook. Typically only a subset of users in the organization are affected.

**Symptoms:** The Phishing Reporter button does not appear, is greyed out, or does not respond for certain users; other users in the same tenant can use it. The user can open Outlook and use email normally, but reporting fails when they click the Reporter button.

**Root cause:** The add-in identifies the user by **primary email address** (e.g. SMTP/mailbox address). Sign-in uses **UPN**. If UPN and primary email differ, the add-in cannot match the signed-in identity to the correct user in Entra ID.

**Resolution:**

1. **Identify affected users:** In Microsoft Entra ID, open the user's profile and compare **User principal name** with **primary email address** (Mail/Primary SMTP). If they differ, the user is affected.
2. **Update UPN:** In [Microsoft 365 admin center](https://admin.microsoft.com/) or [Azure portal](https://portal.azure.com/), go to **Users** → **Active users**, open the user, edit **User principal name** to match their **primary email address**, and save. See [Add or update a user's profile information in Azure AD](https://learn.microsoft.com/en-us/entra/fundamentals/how-to-manage-user-profile-info) for details and constraints.
3. **Verify:** Have the user sign out and sign in again, then try the Phishing Reporter button.

**Best practice:** Ensure UPN matches primary email for all users who will use the add-in, and include this in your Phishing Reporter deployment checklist.
```

---

### 3. Troubleshooting Phishing Reporter on Outlook Desktop

**Link:** https://doc.keepnetlabs.com/next-generation-product/platform/phishing-reporter/troubleshooting-phishing-reporter-on-outlook-desktop

**#### See also (Step 8'den önce):**

```
If the add-in is deployed via **Microsoft 365** (Page View or Ribbon) and only some users cannot use the Phishing Reporter button, the cause may be a mismatch between the user's **User Principal Name (UPN)** in Microsoft Entra ID and their **primary email address**. Identify affected users in Entra ID (compare User principal name with primary email); update UPN to match primary email in Microsoft 365 admin center or Azure portal; then have the user sign out and sign in again. For full steps, see the **Reporter button not working for some users — UPN and primary email mismatch** subsection under Troubleshooting in [Microsoft Page View Phishing Reporter](phishing-reporter-deployment/microsoft-page-view-phishing-reporter.md) or [Microsoft Ribbon Phishing Reporter](phishing-reporter-deployment/microsoft-ribbon-phishing-reporter.md).
```
