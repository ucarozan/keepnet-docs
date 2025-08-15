# Whitelisting

This section explains whitelisting and the steps needed to use the platform effectively. To ensure phishing simulation emails or training enrollments reach users' inboxes without being blocked, whitelist the phishing simulation IP addresses and phishing simulation domains on your server and security solutions.&#x20;

It’s strongly recommended to send a test email to a small user group to confirm successful whitelisting.

## **Phishing Simulation IP Addresses for Whitelisting**

All clients must whitelist the IP addresses listed below in their email server and security solutions.

* 149.72.161.59&#x20;
* 149.72.42.201
* 149.72.154.87

{% hint style="info" %}
If you use [Direct Email Creation](../../platform/company/company-settings/direct-email-creation/), whitelisting isn’t required.
{% endhint %}

## Phishing Simulation Domains for Whitelisting

We strongly recommend whitelisting phishing simulation domains in your email server and security solutions to enhance the effectiveness of your phishing simulation program. Phishing simulation domains vary based on customer location, language, and license type.&#x20;

To find the phishing domains specific to your organization and whitelist them, please navigate to **Phishing Simulator > Settings**

## Shortcuts

The shortcuts below will show you how to whitelist phishing simulation IP addresses and phishing simulation domains with the most commonly used email services.

* [How to Whitelist an IP Address in Office 365](how-to-whitelist-an-ip-address-in-office-365.md)
* [How to Whitelist an IP Address in Exchange 2013 and 2016](how-to-whitelist-an-ip-address-in-exchange-2013-and-2016.md)
* [How to Whitelist an IP Address in Google Workspace](how-to-whitelist-an-ip-address-in-google-workspace.md)
* [Whitelisting in Security Solutions](whitelisting-in-other-security-solutions.md)
* [Why does "X" appear on Microsoft Emails in the Outlook App?](whitelisting-the-pictures-on-microsoft-outlook-apps.md)

## FAQ

### Q: Can I use Phishing Simulation on Office 365 without using Whitelisting?

A: Yes, you can. Our Direct Email Creation (DEC) feature enables you to send simulated phishing emails directly to users' inboxes, eliminating the need for Whitelisting. Discover how to leverage the DEC feature [here](../../platform/company/company-settings/direct-email-creation/).

### Q: Does whitelisting create a security weakness?

A: Whitelisted IP addresses or PTR Domains are owned by the platform, and only authorized admins are able to send emails to selected target users. Therefore, it does not create a security weakness for the organization.

### Q: Can I run training assignments or phishing tests without whitelisting?

A: Yes, you can, but it is definitely not recommended. If whitelisting is not properly done, there may be delivery difficulties. The best practice is to whitelist the platform IPs or PTR Domains before using the product.

