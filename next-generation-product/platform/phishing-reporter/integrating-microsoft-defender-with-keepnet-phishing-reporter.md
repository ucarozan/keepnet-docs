---
hidden: true
---

# Integrating Microsoft Defender with Keepnet Phishing Reporter

This integration allows your employees to report suspicious emails using the [**Keepnet** **Phishing** **Reporter**](./) button, forwarding them to both your **SOC team** and **Microsoft Defender**. Additionally, reported emails are sent to [**Keepnet’s** **Incident** **Responder**](../incident-responder/), enabling deeper analysis and enhanced tracking while maintaining your current reporting workflow.

**Key Benefits:**

* **Dual Reporting:** Emails reported via the Keepnet Phishing Reporter button are forwarded to both **Microsoft Defender** and **Keepnet’s Incident Responder** for comprehensive threat analysis.
* **SOC/IT Reporting:** Reported emails are also delivered to the **SOC/IT team's mailbox** for manual review and internal investigation.
* **Simulation Tracking:** During phishing simulations, Keepnet tracks users who report simulation emails, enabling administrators to measure awareness and deliver targeted training.

{% hint style="info" %}
Microsoft Defender requires that reported emails be in **EML format** for analysis.
{% endhint %}

{% hint style="danger" %}
**Important Notice:** Enabling this integration will **automatically disable Microsoft’s native “Report” button**. Users will exclusively use the **Keepnet Phishing Reporter** to report suspicious emails.
{% endhint %}

## Steps to Set Up the Integration

Please follow the steps below.

1. Log in using your global admin credentials and navigate to the [**Microsoft 365 Defender portal**](https://security.microsoft.com) > **Settings** > **Email & collaboration**.
2. Click the **User reported settings** option in the left-hand panel.
3. Under the **Select an Outlook report button configuration** section, choose: ➤ **Use a non-Microsoft add-in button**.

{% hint style="danger" %}
Important Notice: Choosing this option will automatically **disable the Microsoft Report button**.
{% endhint %}

5. In the **Add an Exchange Online mailbox to send reported messages to** field, enter the email address, such as your **SecOps mailbox** or **a shared email address**.
6. **(Optional)** You can enable the **Allow reporting for quarantined messages. Only admins can report quarantined Teams messages,** which allows your users to report emails from their quarantine folder.

After you have configured these settings in Microsoft 365 Defender, you’ll now need to configure the rest of the settings in the Keepnet platform under the Phishing Reporter menu.

* Log in to the **Keepnet platform**.
* From the left menu, click **Phishing Reporter**, then go to **Settings**.
* Customize your **Phishing** **Reporter** button as needed.
* Click on the **Email Settings** tab and follow the steps below:
  * Enable the **Send information email for reported incidents** option.
  * In the **Recipient Email Address** field, enter the same address used in step 5 of the Microsoft Defender configuration.
  * Optionally, add **CC** or **BCC** **email** **addresses** to forward reported emails to additional recipients.
  * Customize the **Email Subject** and **Email Body** for end-user submissions.
* After configuring these, click **MANAGE AND DOWNLOAD**.
* Click the **CONNECT** button to authorize **Graph API** access, so **Keepnet** **Phishing** **Reporter** can work with your Microsoft 365.
* Upon successful authorization:
  * Download the **Ribbon** or **Page View** version of the reporter button as an **XML** file.
  * Follow the deployment steps below to add the button to users’ Outlook apps.

You can now deploy the **Keepnet** **Phishing** **Reporter** button to test groups or all users using one of the following methods:

1. [**Deploy Microsoft Ribbon Phishing Reporter**](phishing-reporter-deployment/microsoft-ribbon-phishing-reporter.md)
2. [**Deploy Microsoft Page View Phishing Reporter**](phishing-reporter-deployment/microsoft-page-view-phishing-reporter.md)

{% hint style="info" %}
If you wish to compare the differences between Ribbon and Page View phishing reporter buttons, please [click this link](phishing-reporter-deployment/#comparison-ribbon-vs-page-view-vs-msi-outlook-phishing-reporter-microsoft-365).
{% endhint %}

## What Happens When a User Reports a Suspicious Email?

When an employee reports a **suspicious email** using the **Keepnet Phishing Reporter**, the following workflow is triggered:

1. The reported email is sent to **Microsoft Defender** under the [**Submissions**](https://security.microsoft.com/securitysettings/userSubmission) page for automated analysis.
2. The email is simultaneously forwarded to **Keepnet Incident Responder** (if licensed) for advanced case management, automated triage, and analysis.
3. The same reported email is also sent to **SOC/IT teams**, as well as any configured **CC or BCC** recipients, for manual investigation and review.

{% hint style="info" %}
Microsoft’s **Submissions** page does not support emails containing multiple attachments. For example, files like header.txt will not be included when forwarded to Microsoft Defender. Only the original email  will be analyzed by Microsoft Defender.
{% endhint %}

{% hint style="info" %}
**Processing Time:** Once an employee reports an email, the email will appear on your **Microsoft 365 Defender > Submissions** page in a few minutes.
{% endhint %}
