# Popular Customisations

Some customers like to customise the default behaviour of the Incident Responder and the relevant Notification Templates associated with the default workflow. Below are some popular customisation our customers request and how to achieve each one:

* [Customise Notifications](popular-customisations.md#customise-notifications)
* [Auto-delete Malicious Emails](popular-customisations.md#auto-delete-malicious-emails)

## Customise Notifications

Customers can fully customise notifications employees and system admins receive when they report an email for Analysis Results & Investigation Updates. You can view the default notification template [here](default-behaviour-of-incident-responder.md)

To make customisations, please go to:

1. Company > Company Settings > Notification Templates
2. Filter **Category** by "Incident Responder"
3. Click on the 3 dots to the right then select "Duplicate" to be able to edit
4. Make all the customisations you would like, including:
   1. **Email Delivery** (select Direct Email Creation if setup)
   2. **Subject Line**
   3. **From Name**
   4. **From Email Address** (must be keepnetlabs.com unless you have selected [Direct Email Creation](../../../platform/company/company-settings/direct-email-creation/) or [setup your own SMTP](../../../platform/company/company-settings/smtp-settings.md#how-to-configure-the-smtp))
   5. **Body of the Email**
5. Once you're happy with your edits, Save the template
6. Set this template as default by click on the 3 dots and selecting "Make Default" - don't forget this step!&#x20;

<div align="left"><figure><img src="../../../../.gitbook/assets/image (4).png" alt="" width="563"><figcaption></figcaption></figure></div>

{% hint style="warning" %}
Please note: If you have not purchased the Incident Responder, you will not be able to see Notification Templates for the Incident Responder module.
{% endhint %}

{% embed url="https://www.loom.com/share/110f0f651a0e40f9a5c3f1a68d3ddb3c?sid=b2e7bdcc-165f-46b0-9753-03ecb7e55209" %}

## Auto-delete Malicious Emails

As you will have seen, the [Default Behaviour of Incident Responder](default-behaviour-of-incident-responder.md) automatically analyses reported email and then automatically runs an investigation for all emails which are found malicious. To take this one step further, you can automate the deletion of all instances of malicious emails.

This is not enabled by default, allowing system admins to decide whether emails should be deleted - especially in rare cases where a safe email may be incorrectly flagged as malicious.

To set this up, please follow the below instructions:

1. Incident Responder > Playbook
2. Create a new Playbook by click on the blue +NEW button
3. **Rule Info:** Name the playbook and add a description
4. **Conditions:** Set to From > exists (this will cover all reported emails)
5. **Actions:** Create a new workflow
   1. Select "Analyse" from the drop down
   2. Select all Integrations (if you don't have any setup, please follow [these steps](../../../getting-started/5.-incident-responder-setup/step-1.-integrate-threat-intel-partners.md))
   3. Tick the box - "Investigate according to analyze results"
   4. Select Sources > Select the [Mail Integration](../../../getting-started/5.-incident-responder-setup/step-2.-mail-configurations/) you have setup
   5. Actions > Delete Email
   6. SAVE

{% hint style="success" %}
Top Tip: if you have multiple Playbooks running, set the priority for this one as **Very High** to ensure this rule will supersede the other rules you have in place
{% endhint %}

{% embed url="https://www.loom.com/share/9197aa677da34c7896f847429bd80eb1?sid=9dda6c52-3f81-4864-9530-0be6835f7487" %}
