---
description: >-
  Our customer success team have collected some common customer queries and
  added all the answers to these queries here in this section!
---

# 🧠 FAQs

### **Q: When I try to log-in, I get a "invalid token" error**

A: This error message appears when customers try to access keepnet using their "account creation" link on the original email you received when joining Keepnet. Instead, navigate to dash.keepnetlabs.com to login and you won't have any issues!

<div align="left"><figure><img src="../../.gitbook/assets/image (85).png" alt="Login — use dash.keepnetlabs.com to avoid invalid token." width="375"><figcaption><p>Login — use dash.keepnetlabs.com to avoid invalid token.</p></figcaption></figure></div>

### **Q: I added the new Just-in-time Red Flags landing page as a 2nd landing page for a data submission campaign. However, the email template didn't pull through when I tested.**

A: Great idea! When you copy the HTML of the Red Flags landing page to use as a 2nd step, you will also need to copy the custom javascript code. This is the code which loads the email template use in the campaign with the red flags highlighted. Below is a 5 minute video on how to resolve this!

[**https://www.loom.com/share/79889043685147479f35c80696442723**](https://www.loom.com/share/79889043685147479f35c80696442723)

We're also going to be improving the customer experience for adding 2nd landing pages which will allow you to select an existing landing page for page 2 without copying HTML at all!

### **Q: What is Bot Activity and why might I see it on my Campaign Report?**

Bot Activity means something has scanned the link on your phishing email. This could be a security tool, a chrome extension or an analysis engine. Keepnet has highly sophisticated methods of detecting bot activity to ensure your reports only include the human activity of your employees. Here is an explainer deck which covers each Bot Activity type in more detail 👇

{% file src="../../.gitbook/assets/BOT ACTIVITY EXPLAINED.pdf" %}

### **Q: How do I remove users from the platform if I've used SCIM to pull in from Entra ID?**

To remove users from Keepnet when connected to Entra ID, please go to portal.azure.com and find the Enterprise Application you made for Keepnet SCIM. Navigate to **Users & Groups** and manage users from here. Add and remove users to Keepnet from this application. Microsoft updates Keepnet every 40 minutes!

**Q: Can you share the compliance information for Vishing and Smishing?**

{% file src="../../.gitbook/assets/Vishing and Smishing Platform Security and Compliance (1).pdf" %}

### **Q: Are phishing reporter and email templates customizable? Can I add my logo?**

A: Yes! You can fully customize the Phishing Reporter add-in with your logo (60×60px, PNG/JPG, max 2MB), brand name, and dialog text in multiple languages. For email templates, you can customize any of our 16,000+ phishing templates or create your own. See [Phishing Reporter Customization](../platform/phishing-reporter/phishing-reporter-customization.md) for add-in customization, and [Email Templates](../platform/phishing-simulator/manage-phishing-scenarios/email-templates.md) and [Localization](../platform/phishing-simulator/manage-phishing-scenarios/email-templates.md#how-to-add-a-new-email-template) for template customization.

### **Q: What languages are supported? Can campaigns be sent in the user's language?**

A: Keepnet supports **all global languages and locales** with **no limit on language selection**. Campaigns can be automatically delivered in each user's preferred language. You can localize any phishing template into any language, and the platform adapts subject lines, body text, currencies, dates, and tone for cultural accuracy. See [Multi-Language Features](multi-language-features/), [Localization](multi-language-features/localisation.md), and [Understanding the Preferred Language Setting](../platform/phishing-simulator/phishing-campaign-manager.md#how-to-launch-scenarios-based-on-users-preferred-language) for details.

### **Q: What are the platform limits (e.g. targets per campaign, emails per minute)?**

A: Keepnet's platform is built for high-volume operations with scalable infrastructure. For detailed capacity and performance metrics across email phishing, SMS (Smishing), voice (Vishing), and training services, see [Volume & Performance](../../resources/volume-and-performance.md).

### **Q: How do I pull through mobile numbers instead of landlines for my employees?**

To change the information which pulls through to each field in Keepnet, you will need to update the attribute mapping on your Keepnet SCIM Enterprise Application on portal.azure.com. Here's a walkthrough guide on how to set this up:

{% embed url="https://www.loom.com/share/f2cb08b336ef4e76813a02f3e92e5aa4" %}
