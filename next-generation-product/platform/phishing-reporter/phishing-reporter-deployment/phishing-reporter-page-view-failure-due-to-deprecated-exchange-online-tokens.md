# Phishing Reporter Page View Failure Due to Deprecated Exchange Online Tokens

The **Phishing** **Reporter** **Page** **View** feature fails due to Microsoft's deprecation of legacy Exchange Online tokens earlier than expected date, June 2025.

## **Affected Systems**

* **Microsoft** **365** **users** utilizing the **Phishing** **Reporter** **Page** **View** feature.

## **Symptoms**

If you are using the **Phishing** **Reporter** **Page** **View** version, it  may fail with the following empty message:

<figure><img src="../../../../.gitbook/assets/Screenshot 2025-03-26 at 16.48.23.png" alt="" width="320"><figcaption></figcaption></figure>

## **Root Cause**

**Microsoft** has deprecated legacy **Exchange** **Online** **tokens**, which the **Phishing** **Reporter** previously relied upon for **authentication** **and** **access**.

## Short Term Solution

Customers can turn on legacy Exchange Online tokens following below documentation.

[https://learn.microsoft.com/en-us/office/dev/add-ins/outlook/turn-exchange-tokens-on-off](https://learn.microsoft.com/en-us/office/dev/add-ins/outlook/turn-exchange-tokens-on-off)

{% hint style="warning" %}
It can take up to 24 hours before all requests from Outlook add-ins for legacy tokens are allowed.
{% endhint %}

<figure><img src="../../../../.gitbook/assets/Screenshot 2025-03-26 153928.png" alt=""><figcaption><p>Picture 1: Exchange Online Powershell - Allow Legacy Token Sample</p></figcaption></figure>

## Long-Term Solution

A more permanent solution, we highly recommend using **Microsoft** **Ribbon** **Phishing** **Reporter** that utilises **Graph** **API** and no dependency on Exchange Online tokens.

## FAQ:

### Q: Why is it happening now?

A: Legacy tokens turned off for all tenants before the scheduled date before June.

<table><thead><tr><th width="111.53125">Date</th><th>Legacy tokens status</th></tr></thead><tbody><tr><td>Feb 17th, 2025</td><td>Legacy tokens turned off for all tenants. Admins can reenable legacy tokens via PowerShell.</td></tr><tr><td>Jun 2025</td><td>Legacy tokens turned off for all tenants. Admins can no longer reenable legacy tokens via PowerShell and must contact Microsoft for any exception.</td></tr><tr><td>Oct 2025</td><td>Legacy tokens turned off for all tenants. Exceptions are no longer allowed.</td></tr></tbody></table>

[https://learn.microsoft.com/en-us/office/dev/add-ins/outlook/faq-nested-app-auth-outlook-legacy-tokens](https://learn.microsoft.com/en-us/office/dev/add-ins/outlook/faq-nested-app-auth-outlook-legacy-tokens)
