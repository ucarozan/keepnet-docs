# Direct Email Creation for Google Workspace

This page explains how to use the **Direct** **Email** **Creation** feature in **Google** **Workspace**. Please follow the steps below to set up DEC settings within your Google Workspace.

{% hint style="info" %}
The Google Workspace settings section requires global administrator privileges.&#x20;
{% endhint %}

## First Settings on Platform

Please follow the steps below to make the necessary settings on the platform for the Direct Email Creation feature to be connected within your Google Workspace.

* Log in to the platform
* Go to **Company > Company Settings >** **Direct Email Creation** page.
* Click the **+ NEW** button and select **Google** **Workspace**.
* Fill in the following fields.
  * **Configuration Name:** Give a name for your DEC settings.
  * **Client ID:** Copy the Client ID ( 102720780747216042586 ).
* Select your **domain(s)** under the **Domains** field.&#x20;
  * **IMPORTANT:** The selected domain(s) must be **Verified** on the **Allowed** **Domains** page and must be used in your **Google** **Workspace**. Otherwise, the selected domain will not work with this DEC configuration.
* You can keep the tab open. If you close it, you will need to do the settings above again later. Please proceed to the following section.

## Second Settings on Google Workspace

Please follow the steps below to make the necessary settings for the Direct Email Creation feature to be connected to your Google Workspace.

* Log in to [https://admin.google.com/](https://admin.google.com/) your Google Workspace admin panel.
* On the left-hand side, go to **Security > Access and Data Control > API Controls.**
* From the **API** **Controls** page, click on the **"Manage Domain-wide Delegation"** button under the **"Domain-wide Delegation"** field.
* Click on the **Add** **New** button.
* Enter the **Client** **ID** ( 102720780747216042586 ) into the **Client** **ID** field.
* Enter the following URLs into the **OAuth** **Scopes** field.
  * https://mail.google.com
  * https://www.googleapis.com/auth/gmail.insert
  * https://www.googleapis.com/auth/gmail.modify
* Click on the **Authorize** button.

## Complete Final Settings and Test Email Direct Creation Feature

Now, we will complete the process in this section, test the connection between Google Workspace and the Direct Email Creation feature, and see if we can successfully create an email in the user's inbox.

* Go to your **Company > Company Settings >** **Direct Email Creation** settings page.
* Click on the **"Send Test Email"** button to test the email creation.
  * **To:** Enter the recipient's email address who will receive the test email in their inbox.&#x20;
    * The **email** **domain** must be the domain that was selected previously in the **Domains** field.&#x20;
  * **From:** Enter an email as a from address.
  * **Sender Name:** Enter a sender name.
  * **Message:** Enter a message for test purposes.
* Click on the **Send** button to create the email in the user's inbox. If successful, please click the **Save** button to complete the configuration.

If the test is not successful, please see the **Troubleshoot** section.

## How to Launch Phishing Campaign by DEC Settings

Go to **Phishing Simulator > Campaign Manager** from the main menu. Click on **+ NEW** to create a phishing campaign and launch it to your target users.&#x20;

* Please complete the first, second, and third sections step by step. For more information about how to use each menu, see [here](../../../phishing-simulator/phishing-campaign-manager.md).
* When you get to the **Delivery** **Settings** page, inside of the **Email** **Delivery** field, select your **DEC** **settings.**
* Set up the rest of the settings as you wish, and then click on **Next** to go to the last page.
* Review all of your settings and click the **Launch** button to create phishing simulation emails in the selected target user's inbox.

## Video Tutorial

This video tutorial explains how to configure direct email creation settings and launch a campaign with these settings to create phishing emails directly in the user's inbox instead of launching with the SMTP option.

{% embed url="https://youtu.be/cEHtNP0-UcQ" %}

## Troubleshoot

If you test the DEC configuration and the test is not successful, please try the following options.&#x20;

* Please make sure the domain you selected in DEC settings is **Verified** in **the Allowed Domains** page. If it is not, please verify it.&#x20;
* Please ensure the domain you selected in DEC settings is used in the employee's email address as main domain in Google Workspace.
* Please try to launch a phishing campaign to the test emails with DEC settings via Campaign Manager. Then, go inside the campaign report and go to the **Sending** **Report** menu. You can see more technical information if you hover your mouse over the delivery **Error** status.

If the options above are not resolved, please [contact the support team](../../../../../resources/keepnet-support-help-desk.md) for further assistance.

## FAQ

### **Q:** I get the message "There was a problem sending the test email. Please check your configuration and try again." when I try to send a test email with DEC.

**A:** Please ensure that the email address has a mailbox (Gmail license). If the From Address you used is a group email or does not have a Gmail license, you will receive this error message.
