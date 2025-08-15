# Phishing Scenarios

The [**Phishing Simulator**](https://keepnetlabs.com/products/phishing-simulator) **> Phishing Scenarios > Scenarios** page provides a selection of ready-to-use phishing campaigns. These standard system scenarios are available to all clients and can be launched with just a few clicks. You also have the option to customize a scenario to your needs or to create a unique phishing campaign.

The components of the **Scenarios** page are explained below.

<table><thead><tr><th width="150"></th><th width="590.1428571428571"></th></tr></thead><tbody><tr><td>Scenario name</td><td>The name of the phishing template</td></tr><tr><td>Category</td><td>Category is used to classify phishing scenarios by threat type.</td></tr><tr><td>Method</td><td><p>The phishing technique.</p><ul><li><strong>Data Submit:</strong> Used to detect target users who submit data on the landing page</li><li><strong>Attachment:</strong> Used to detect target users who download the attachment in the phishing simulation email</li><li><strong>Click-Only:</strong> Used to detect target users who click unknown links in the phishing email.</li><li><strong>MFA:</strong> Used to detect target users who enter their MFA codes on the landing page</li></ul></td></tr><tr><td>Tags</td><td>Tags can be added to the phishing scenario to enable viewing using related tag lists.</td></tr><tr><td>Difficulty</td><td>The level of difficulty to recognize a phishing attempt <strong>(Easy, Medium, Hard).</strong> Please <a href="../#q-how-is-the-difficulty-level-determined">click here</a> to see how the difficulty level is determined.</td></tr><tr><td>Created By</td><td><p><strong>System:</strong> Standard phishing scenario templates provided with the product.</p><p></p><p><strong>Custom:</strong> Phishing scenarios created or customized by system users.</p></td></tr><tr><td>Date Created</td><td>The date and time the phishing scenario was created.</td></tr></tbody></table>

{% hint style="info" %}
Keepnet uses a tiny, 1x1 pixel image from a remote URL to track when files are opened in Microsoft Office applications like Excel, Word.\
\
This method does not work with Macbook Numbers, which does not support URL-based images in cells, preventing file tracking. \
\
For broader compatibility in phishing attacks across Microsoft, Mac, and Android devices, use HTML file attachments, which support complex elements across diverse devices and software environments.
{% endhint %}

## Phishing Scenario Actions

This section explains how to initiate a phishing campaign.

### How to Launch a Phishing Campaign

Once you have selected a phishing template for your campaign and identified the targets, click on the **Launch '➤'** button in the **Actions** menu on the far right of the page.

You will be presented with options to specify or modify various elements of the campaign.

#### Campaign Settings

<table><thead><tr><th width="150"></th><th width="576.3496376811595"></th></tr></thead><tbody><tr><td>Campaign Name</td><td>The name used to identify the phishing campaign and the name that will be used on the report generated at the conclusion of the campaign</td></tr><tr><td>Target Groups</td><td>The group(s) selected to receive the phishing campaign message</td></tr><tr><td>Mark as Test</td><td>The phishing report can be removed from other reporting areas of the platform</td></tr><tr><td>Limit Recipients</td><td>The phishing campaign can be designed to be sent to random users in the target group according to a percentage or user count.</td></tr></tbody></table>

#### Campaign Summary

Once you designed the proposed campaign and clicked the **Next** button, you will be provided with a summary. The components are explained below.

<table><thead><tr><th width="166.19942884934343"></th><th width="576.3496376811595"></th></tr></thead><tbody><tr><td>Scenario Info</td><td>Basic information about the phishing campaign</td></tr><tr><td>Settings</td><td>Settings information of the phishing campaign</td></tr><tr><td>Other</td><td>Any other additional information about the campaign</td></tr><tr><td>Target Users</td><td>The users to whom the phishing campaign will be sent</td></tr><tr><td>Email that will be sent to users</td><td>Preview of the phishing email that will be sent</td></tr><tr><td>Landing page for users who click the phishing link</td><td>Preview of the landing page when a user clicks the phishing link used in this campaign</td></tr></tbody></table>

### How to Edit a Phishing Campaign

Click on the three dots '⋮' button in the **Actions** option on the far right of the relevant page, and then click the **Edit** button.

### How to Preview a Phishing Campaign

Click on the three dots '⋮' button in the **Actions** option on the far right of the relevant page, and then click the **Preview** button to view what will be sent to the targeted users.

### How to Duplicate a Phishing Campaign

Click on the three dots '⋮' button in the **Actions** option on the far right of the relevant page, and then click the **Duplicate** button to recreate a previous campaign.

### How to Delete a Phishing Campaign

Click on the three dots '⋮' button in the **Actions** option on the far right of the relevant page, and then click the **Delete** button to delete a phishing campaign.

### How to View Scenario Statistics

This option gives you an overview of phishing templates on the platform, grouped by region (e.g., EMEA, NAM), brand (e.g., Microsoft, Google), industry (e.g., finance, IT), attack type (e.g., click-only), language, and emotional triggers (e.g., urgency, excitement). It helps you explore and select the most relevant templates for your campaigns.&#x20;

To access it, go to **Phishing** **Simulator > Scenarios** and click the "**Scenario** **Statistics**" button at the top-right of the scenarios page.

### How to View Scam of the Week Scenarios

The **Scam of the Week** category highlights phishing scenarios that are based on the most recent and trending cybersecurity threats. These scenarios are updated weekly and curated by security experts to help you quickly launch timely and realistic phishing simulations.

To view scam of the week scenarios, go to **Phishing Simulator > Phishing Scenarios**, select **Scam of the Week** from the **Category** filter.&#x20;

## How to Add a New Phishing Scenario

Phishing scenarios have two components: the phishing email template and the landing page. Follow the steps below to add a new phishing scenario:

1. Click the **+NEW** button in the upper right corner of the **Phishing Simulator > Phishing Scenarios** page.
2. Complete the required fields on the first page, then click **Next**.
   1. **Scenario Name:** Enter a name for your scenario.
   2. **Description:** Describe the template briefly for your reference.
   3. **Category:** Select the threat type that classifies your phishing scenario.
   4. **Method:** Choose the appropriate phishing strategy for your scenario.
      1. **Click-Only:** Redirect users to a specific landing page, and see who clicks the phishing link within the report.
      2. **Data Submission:** Redirect users to a page where they must enter requested credentials and see who submits this information in the report.
      3. **Attachment:** Redirect users to download a file attached within the simulated email, and see who opens the file within the report.
      4. **MFA:** Redirect users to a Multi-Factor Authentication (MFA) page where they must input a received MFA code to continue, and see who submits MFA codes in the report.&#x20;
   5. **Language:** Select the language of your scenario.
   6. **Tags:** Define tags for the scenario.
   7. **Make Available For:** Make your scenario available to be used by the other customers under your organization. This feature is only available to admins who have Reseller permissions.&#x20;
   8. On the **Email Template** pag&#x65;**,** select the e-mail template you want to use and then click the **Next** button.
   9. Select the **Landing Page** template you want to use and then click the **Next** button to move on to the **Summary** page.
      1. If the **MFA** **method** is selected, you'll find a sub-menu titled **"MFA Settings"** on the **Landing** **Page**. Here, you can customize the "**Sender** **Phone** **Number"** and the text for the "**SMS** **Verification** **Message".**
   10. The **Summary** page provides you with an overview of the proposed phishing campaign, including the type of campaign, the targeted users, and other important details.

Now you can click the **Save** button to create your scenario.

## Video Tutorial

This tutorial will cover the **Scenarios** that are created by combining the **Email** **Template** and/or **Landing** **Page** and making the campaign ready to send to the target users.

{% embed url="https://youtu.be/y1BPobrQXIU" %}
