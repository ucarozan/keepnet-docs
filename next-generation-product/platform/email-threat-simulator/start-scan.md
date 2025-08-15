# Start Scan

Go to the **Email Threat Simulator** page from the left menu on the dashboard to see the following fields.&#x20;

## Scans

The components of the scans page are explained in the table below.&#x20;

<table data-header-hidden><thead><tr><th width="139"></th><th></th></tr></thead><tbody><tr><td>Date Created</td><td>The date and time the scan was created</td></tr><tr><td>Status</td><td>Current status of the scan</td></tr><tr><td>Domain</td><td>Domain address of the email used to initiate the scan</td></tr></tbody></table>

## Actions

You can delete or duplicate a scan as well as to view detailed reports of a scan.

<table data-header-hidden><thead><tr><th width="127"></th><th></th></tr></thead><tbody><tr><td>View Report</td><td>Access detailed reports of a scan. You can find more information about the report details here</td></tr><tr><td>Delete</td><td>Delete the scan</td></tr><tr><td>Duplicate</td><td>Create a copy of the scan</td></tr></tbody></table>

## How to Start a New Email Threat Simulator

The Email Threat Simulator has only one mandatory component: the test email address. Follow the steps below to start a new scan:

* Click the **+NEW** button in the upper right corner of the **Email Threat Simulator > Scans** page.
* **Test Email Address:** Enter your ETS test email address to which you want all attack vectors to be sent.
* **Choose an Option:** Please select one of the following suitable options for your ETS scan.
  * **Manual (no password is required):** The malicious emails will be sent to your email inbox, and the automated checks, such as how many email is reached in the inbox or not, will not be performed. You will need to manually confirm how many malicious emails reached the inbox.
  * **Automate with password:** The malicious emails will be sent to your email inbox, and the automated check, such as how many emails have reached the inbox or not, will be performed automatically.&#x20;
    * **OWA:** If your Microsoft 365 email inbox is accessible from the internet, click the OWA option and define your Outlook Web Access URL and Username information.
    * **Google Workspace:** If you want to use your Google Workspace email inbox with a password, please use [this document](start-scan-on-google-workspace-email-account.md) for more information.
  * **Continue with Microsoft Office 365:** The malicious emails will be sent to your inbox, and the automated checks, such  as how many emails have reached your inbox or not, will be performed automatically. Please learn how to start a scan on a Microsoft 365 email account [here](start-scan-on-o365-email-account.md).
  * Click the **Next** button and check the **Continuous** **Scan** box if you want it to be included in this scan automatically when a new attack vector is added.
* Define the delivery interval for emails in the **Distribution** section and click the **Next** button.
* Accept the **User** **Agreement** and click the **Start** button.

{% hint style="info" %}
If your Office 365 test account has MFA (Multi Factor Authentication) option that can not let Email Threat Simulator to log in related account, please follow Microsoft's "[Manage app passwords for two-step verification](https://support.microsoft.com/en-us/account-billing/manage-app-passwords-for-two-step-verification-d6dc8c6d-4bf7-4851-ad95-6d07799387e9)" to complete this step.
{% endhint %}

## Attack Vectors

A table provides a list of attack vectors that will be sent in the scan. The details include the name, type, hash, severity, status, and creation date of each attack vector.

### Actions

These settings give you the ability to **edit**, **enable/disable**, or **delete** attack vectors.

{% hint style="info" %}
In the first version of the Email Threat Simulator, only the support team is able to add new attack vectors or take action on existing attack vectors
{% endhint %}

**.**&#x43;lick on the **three dots** **“︙”** button under the **Action** heading to adjust the following

<table data-header-hidden><thead><tr><th width="115"></th><th></th></tr></thead><tbody><tr><td>Edit</td><td>Change the settings of the relevant attack vector</td></tr><tr><td>Enable/Disable</td><td>Enable or disable existing attack vectors. Disabled attack vectors will not be sent in new scans.</td></tr><tr><td>Delete</td><td>Delete the attack vector</td></tr></tbody></table>

## **FAQ**

### Q: Can I start a duplicate continuous scan for the same domain?

A: No. You may not duplicate continuous scans for the same domain; however, you are able to start multiple scans without selecting the continuous scan option.

### Q: Can I edit a scan?

A: No. You cannot edit a scan, but you can delete a previous scan and start a new scan.

### **Q: Why is the New button disabled (gray) on the attack vectors page?**

A: You are not permitted to add new attack vectors or take action on existing attack vectors.
