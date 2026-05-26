# Notification Templates

Notification Templates are pre-configured Email, DEC and Microsoft Teams types of templates that the platform uses to communicate with users (employees, system admins) across a range of scenarios — from training enrollments and reminders to security alerts and investigation updates. Admins can create, edit, duplicate, and delete notification templates, configure delivery via SMTP or Direct Email Creation, and localize content so each recipient receives notifications in their preferred language.

## Notification Templates Page

You can preview, duplicate, make default, edit, or delete any notification templates at the **Company > Company Settings > Notification Templates** page.

<table><thead><tr><th width="169"></th><th width="579.1428571428571"></th></tr></thead><tbody><tr><td>Template Name</td><td>The name assigned to the notification template.</td></tr><tr><td>Category</td><td>The product category the template belongs to, indicating which platform module uses it.</td></tr><tr><td>Template Type</td><td>The type of notification the template delivers within the selected product.</td></tr><tr><td>Subject</td><td>The subject line of the notification email as it appears to recipients.</td></tr><tr><td>Languages</td><td>The language variants configured for the template. Admins can add multiple languages using the localization feature so the email is delivered in each recipient's preferred language.</td></tr><tr><td>Tags</td><td>Custom labels assigned to the template for easier filtering and discovery on the Notification Templates page.</td></tr><tr><td>Date Created</td><td>The date and time the template was created.</td></tr><tr><td>Created By</td><td>The name of the company that created the template.</td></tr><tr><td>Available For</td><td>The number of companies with access to this template.</td></tr><tr><td>Actions</td><td>Options available for the template: edit, preview, duplicate, set as default, or delete.</td></tr></tbody></table>

## **How to Create a Notification Template**

Click on the **+ NEW** button to create a notification template on the notification template page.

The components of the **Notification Templates** page are explained in the table below.

<table data-header-hidden><thead><tr><th width="150"></th><th width="581.1428571428571"></th></tr></thead><tbody><tr><td>Template Name</td><td>The name assigned to the notification template.</td></tr><tr><td>Template Type</td><td>The type of notification the template delivers within the selected product, either Email or Microsoft Teams can be selected.</td></tr><tr><td>Email Delivery</td><td>The <a href="smtp-settings.md">SMTP</a> or <a href="direct-email-creation/">DEC</a> configuration through which the notification email will be sent.</td></tr><tr><td>Tags</td><td>Custom labels assigned to the template for easier filtering and discovery on the Notification Templates page.</td></tr><tr><td>Make Available For</td><td>This option is valid only for users with Reseller permissions. Specify the companies or company groups that will have access to the template.</td></tr><tr><td>Email Template</td><td><ul><li><strong>Subject:</strong> The subject line the recipient sees in their inbox.</li><li><strong>From Name:</strong> The sender name displayed to the recipient.</li><li><strong>From Email:</strong> The sender email address displayed to the recipient.</li><li><strong>Email Template:</strong> The body content of the notification email.</li></ul></td></tr></tbody></table>

## **How to Customize a Notification Template**

Click the **Edit (✎)** icon in the **Actions** column of the target template. Make the required changes and click **Save**.

## **How to Delete a Notification Template**

Click the **Delete (🗑)** icon in the **Actions** column of the target template to permanently remove it.

## **What is the ‘Make Default’ Option**

The **Make Default** option designates which template the platform will use when sending a particular notification type. The platform always selects the template marked as **Default** for each notification type. To set a template as default, click the **three-dot menu** under the **Actions** column and select **Make Default**.

## How to Localize a Notification Template

The **Localize** feature allows admins to create language-specific versions of a notification template. When a target user has a **Preferred Language** configured in their profile, the platform automatically delivers the notification email in that language. Users without a Preferred Language, or whose language does not match any localized template, receive the email in the **company's default language.**

{% hint style="info" %}
**Prerequisite:** Target users must have a **Preferred Language** set in their profile for this feature to work. To learn how to configure this, see [Adding Target Users](https://doc.keepnetlabs.com/next-generation-product/platform/awareness-educator/pages/WpvNbKjn8eIuEJrWCOjZ#id-2.-adding-target-users-manually).
{% endhint %}

For the full step-by-step localization guide — including which templates to localize, how to set them as default, and how to test the feature — see [**How to Localize Training Notification Templates**](https://doc.keepnetlabs.com/next-generation-product/platform/awareness-educator/training-library#how-to-localize-training-notification-templates).

## **Notification Template Use Cases**

Notification templates deliver emails to the following user types across various platform scenarios.

There are two types of recipients for notification emails:

* **System Admin:** The template is sent to the platform administrator.
* **Target User:** The template is sent to the target users (employees).

The list of template types and their descriptions.

<table data-header-hidden><thead><tr><th width="213.66666666666666"></th><th></th><th></th></tr></thead><tbody><tr><td><strong>General Templates</strong></td><td><strong>What is it for?</strong></td><td><strong>Who will receive it?</strong></td></tr><tr><td>Multi-Factor Authentication Activation</td><td>Notifies the admin that MFA has been enabled for their account.</td><td>System Admin</td></tr><tr><td>Welcome Email</td><td>Notifies the admin that a new account has been created on the platform.</td><td>System Admin</td></tr><tr><td>Reset Password</td><td>Notifies the admin that a password reset has been requested for their account.</td><td>System Admin</td></tr><tr><td><strong>Incident Responder</strong></td><td><strong>What is it for?</strong></td><td><strong>Who will receive it?</strong></td></tr><tr><td>Suspicious Email Analysis Report</td><td>Delivers the analysis results of a reported email to the user who submitted it.</td><td>Target User</td></tr><tr><td>Suspicious Email Analysis Report Update</td><td>Delivers a custom message from the admin to the user who reported the email.</td><td>Target User</td></tr><tr><td>Investigation Started</td><td>Notifies the admin that an investigation has been initiated.</td><td>System Admin</td></tr><tr><td>Investigation Finished</td><td>Notifies the admin that an investigation has been completed.</td><td>System Admin</td></tr><tr><td>Investigation Expired</td><td>Notifies the admin that an investigation has expired.</td><td>System Admin</td></tr><tr><td><strong>Threat Sharing</strong></td><td><strong>What is it for?</strong></td><td><strong>Who will receive it?</strong></td></tr><tr><td>Threat Sharing New Post</td><td>Confirms that a new post has been successfully shared with a community.</td><td>System Admin</td></tr><tr><td>Threat Sharing Community Invitation</td><td>Notifies the admin of an invitation to join a community.</td><td>System Admin</td></tr><tr><td>Threat Sharing Post Shared</td><td>Notifies the admin that a community member has shared a post.</td><td>System Admin</td></tr><tr><td><strong>Awareness Educator</strong></td><td><strong>What is it for?</strong></td><td><strong>Who will receive it?</strong></td></tr><tr><td>Enrollment</td><td>Notifies the target user that a training has been assigned to them.</td><td>Target User</td></tr><tr><td>Learning Path Enrollment Reminder</td><td>Notifies the target user that a learning path training has been assigned to them.</td><td>Target User</td></tr><tr><td>Learning Path Enrollment</td><td>Notifies the target user that an assigned learning path training has not been completed.</td><td>Target User</td></tr><tr><td>Infographic Enrollment</td><td>Notifies the target user that an infographic training has been assigned to them.</td><td>Target User</td></tr><tr><td>Poster Enrollment</td><td>Notifies the target user that a poster training has been assigned to them.</td><td>Target User</td></tr><tr><td>Certificate</td><td>Notifies the target user that a training has been completed successfully.</td><td>Target User</td></tr><tr><td>Enrollment Reminder</td><td>Notifies the target user that an assigned training has not been completed.</td><td>Target User</td></tr><tr><td>Enrollment after Failed in a Simulation</td><td>Notifies the target user that a training has been assigned following a failed phishing simulation.</td><td>Target User</td></tr><tr><td>Teams Survey Enrollment</td><td>Notifies the target user via Microsoft Teams that a survey has been assigned to them.</td><td>Target User</td></tr><tr><td>Teams Infographic Enrollment</td><td>Notifies the target user via Microsoft Teams that an infographic training has been assigned to them.</td><td>Target User</td></tr><tr><td>Teams Poster Enrollment</td><td>Notifies the target user via Microsoft Teams that a poster training has been assigned to them.</td><td>Target User</td></tr><tr><td>Teams Learning Path Enrollment</td><td>Notifies the target user via Microsoft Teams that a learning path training has been assigned to them.</td><td>Target User</td></tr><tr><td>Teams Enrollment Notification</td><td>Notifies the target user via Microsoft Teams that a training has been assigned to them.</td><td>Target User</td></tr></tbody></table>

## Video Tutorial

This tutorial demonstrates how to list, create, edit, and delete notification templates on the platform.

{% embed url="https://youtu.be/Gx7e0inX--E" %}

## FAQs

### Q: Can I be notified when a user is enrolled in training after failing a simulation?

A: Yes. Use the CC field on the Enrollment after Failed in a Simulation template to add the email address you want to notify. Note that an email address in CC cannot also appear in the To field — use an address that does not belong to any target user.

### **Q:** Can I use the {ENROLLMENT\_NAME} merge tag in the Subject line of enrollment templates?

A: Yes. The {ENROLLMENT\_NAME} merge tag is supported in the Subject line of the following templates: Training Enrollment, Learning Path Enrollment, Poster Enrollment, and Infographic Enrollment.
