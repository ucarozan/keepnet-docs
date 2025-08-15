# Microsoft 365

You can integrate your Microsoft 365 environment with the Incident Responder product to start an investigation on users' email accounts by following the steps below.

{% hint style="warning" %}
You must use an account with global administrator permission.
{% endhint %}

## New Application

* Select [App Registration](https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade) on the Microsoft Azure portal
* Click **+New registration**
* In the **Register an application** section, enter the name of the new application (required field).
* Select supported accounts from the **Accounts in this organizational directory only** option (auth secure login only - single-tenant).
* Select **Public client/native (mobile & desktop)** from the dropdown menu to enter a Redirect URL.
* Click **Register**. (Leave the myapp://auth field section blank).
* The new application will now appear in the list of app registrations; click on the name of the new application.
* Under **Essentials**, you will see the following displayed:
  * Application (client) ID
  * Directory (tenant) ID
* Please take note of these as you will need this information later to set up the new configuration.

Now you are ready to proceed to the next step: the application secret key.

## Application Secret Key

An application secret key must be created for the new registration.

* Under **Manage** from the left-side menu, select **Certificates & Secrets**.
* Select **Client secrets**.
* Select **+New client secret**.
* Enter the description and expiration date and click **Add**.
* Make sure to save the secret key value before you move on to the final step.

## Application Permissions

The last step is to add application permissions.&#x20;

* Select **Manage > API Permissions** and click **+Add permission**.
* Click **Microsoft Graph** and a new window called **Request API permissions** will appear.
* Click **Application permissions** and then choose **Application Permission** and in the **Select permissions** field, find and select the following required permissions:
  * Directory.Read.All&#x20;
  * Mail.ReadWrite&#x20;
  * MailboxSettings.ReadWrite&#x20;
  * User.Read.All (under User)
* Click **Add permissions**.
* Click **Grant admin consent for (user).**

{% hint style="info" %}
You can find more information about these permissions at “[About Permissions](microsoft-365.md#about-permissions)”.
{% endhint %}

## Test the Email Server Integration

You can test the integration on the platform to make sure that it is working. Go to **Incident Responder > Mail Configurations** on the left sidebar menu of the dashboard and then click **+ NEW** and choose the mail provider - in this case, Office 365.

Complete the following fields in the Microsoft Office 365 configuration table:

The integration details are:

<table><thead><tr><th width="152.54879972451124"></th><th width="581.1428571428571"></th></tr></thead><tbody><tr><td>Name</td><td>Name of the configuration</td></tr><tr><td>Application (client) ID</td><td>Application ID information is provided on the azure portal under the Overview menu.</td></tr><tr><td>Application Secret</td><td>Application Secret information is provided on the azure portal under the Overview menu.</td></tr><tr><td>Directory (tenant) ID</td><td>Directory ID information is provided on the azure portal under the Manage > Certificates &#x26; secrets menu.</td></tr><tr><td>Test Email Address</td><td>An active email address to be used for testing purposes</td></tr><tr><td>Domain Selection</td><td>Authorized domain(s) to start investigations on</td></tr><tr><td>Test Connection</td><td>Perform a test of the configuration</td></tr></tbody></table>

If the test was successful, the new email server integration will be shown in the list of mail configurations.

{% hint style="warning" %}
If an X appears, it indicates there was a problem and the email server integration failed; please wait a few minutes (5-10+min) for O365 to successfully complete the integration, and then if not work still, please review the instructions.
{% endhint %}

## About Permissions

### **Directory.Read.All (Get user list)**

This permission allows the app to read data in your organization's directory, such as users, groups, and apps. Note: Users may consent to applications that require this permission if the application is registered with their organization’s tenant.

The platform uses this permission to retrieve the client's user list when an investigation is initiated and then to access the email addresses. For example, when a user finds a suspicious email, the platform can scan all users in the list retrieved.

### Mail.ReadWrite (Get users mails)

This permission allows the app to create, read, update, and delete email in user mailboxes. It does not include permission to send mail. The platform uses this permission to scan and filter users' emails. For example, when the “From” filter is selected as a parameter to be used in an investigation, this authorization enables the creation of a list of the emails that meet this criterion. It is also used to send a warning message to users. This permission also allows the platform to scan the contents of the emails to find and match the designated investigation parameters. For example, specific filters such as regex, keywords, etc.

### MailboxSettings.ReadWrite (Warning action)

This permission allows the app to create, read, update, and delete the user's mailbox settings. It does not include permission to send mail directly, but allows the app to create rules that can forward or redirect messages. The platform uses this permission to mark emails that will receive a warning message.

### User.Read.All (Get user data)

This permission allows the app to read the full set of profile properties, reports, and managers of other users in your organization on behalf of the signed-in user. The platform uses this permission to read and filter user information during the scanning process. If user-related filters, such as specific users, are selected as scan criteria, the user information may need to be read. For example, an organization may elect to initiate an investigation of employees in a particular department.

## Video Tutorial <a href="#video-tutorial" id="video-tutorial"></a>

Learn how to integrate Microsoft 365 with the Incident Responder to investigate and delete phishing emails from user inboxes in seconds, enhancing security and reducing risks effectively.

{% embed url="https://www.loom.com/share/2ed198c7943142e8bc26db681b392877?sid=5a0dcddc-dfac-4a56-b39a-925b2e616c8d" %}

## FAQ

### Q: Is it possible to run a suspicious email investigation on the platform 24/7?

A: Yes. The platform’s flexibility allows you to start an investigation at any time and specify how long it is to run, or to create a continuous, automatic search for harmful e-mails. Server-based integration with your email service provides the most comprehensive protection.

### Q: Is it possible to start investigations and delete harmful emails without Office 365 and Exchange EWS integration?

A: Yes. The Phishing Reporter plug-in can be used to conduct investigations and mitigation. However, the user must have Outlook open and the plug-in active. Email server integration eliminates this limitation.
