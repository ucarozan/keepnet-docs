# Microsoft Teams Settings

Microsoft Teams integration allows you to send training notifications directly inside Teams, where your employees already collaborate every day. Instead of relying only on SMS or email, you can reach users in a familiar workspace without leaving their daily workflow. This makes training invitations harder to miss and easier to act on. Messages arrive from a dedicated bot that you can name, keeping communication clear and professional.

All permissions and settings remain under your control in **Company Settings > Microsoft Teams Settings** page, so you can enable, update, or revoke access at any time.

## Prerequisites

* Microsoft 365 tenant with Microsoft Teams enabled.
* Tenant admin/global admin permission to grant consent during setup.
* Keepnet platform access.

## Enable the integration (Step 1)

On **Company > Company Settings > Microsoft Teams Settings** you will see two access cards. Enable them in order:

### Access 1: **Connect to Teams**

Links your Microsoft Teams tenant to Keepnet.

1. Click **Enable Access**.
2. Sign in with a Microsoft global admin account.
3. Review and **Accept** the permissions consent.
4. You’ll return to Keepnet and see **Access Enabled**.

### Access 2: **Training Delivery**

Allows Keepnet to send training notifications to Teams.

1. Click **Enable Access** on the second card.
2. Sign in with a Microsoft global admin account.
3. Review and **Accept** the permissions consent.
4. You’ll return to Keepnet and see **Access Enabled**.
5. When both cards show **Access Enabled**, setup is complete and you can send trainings via Teams.

> Status banner: When both accesses are enabled you’ll see **Access complete. You can now send trainings via Teams**.

***

### Bot name (Step 2)

Choose the display name that users will see as the sender in Teams.

1. In **Bot Name**, enter a clear name (e.g., **Keepnet Training Delivery Bot**).&#x20;
2. Click **Update** to save.

{% hint style="warning" %}
The bot name is not allowed to be updated at the moment, but it will be available to change in the future.
{% endhint %}

## Update Integration Version

If Keepnet releases an integration update for Microsoft Teams, you may see an **Update Integration Version** button. Click it to apply the latest improvements.

## Disable or Revoke Access

* Click **Disable Accesses** to remove Keepnet’s permissions from your Microsoft Teams tenant.
* You can re-enable it later by repeating **Enable the integration**.

## How to Launch Training via Microsoft Teams

You can learn how to launch training content through Microsoft Teams integration by going to the document [here](microsoft-teams-settings.md#how-to-launch-training-via-microsoft-teams).

## Troubleshooting

### **1. I don’t see the Microsoft consent page.**

Use a Microsoft tenant/global admin account and try again in a private browser window.

### **2. Access 1 enabled but Access 2 fails.**

Ensure the same admin completes both steps and that Teams is enabled for the tenant. If the issue persists, please take a screenshot of the error and share it with the [support team](../../../../resources/keepnet-support-help-desk.md).

### **3. Messages aren’t arriving in Teams.**

* Confirm both accesses show **Access Enabled**.
* Verify the Bot Name is saved.
* Check the campaign’s audience actually has Teams licenses and can receive chat messages.
* Check the '**Activity**' menu on your Microsoft Teams app to confirm if you see the training enrollment.

If this case persists, contact the [support team](../../../../resources/keepnet-support-help-desk.md) for further assistance.

## FAQ

### **Q: Who can enable the integration?**

A: A Microsoft tenant/global admin and access to the Keepnet platform.

### **Q: Does this replace Email or SMS delivery?**

A: No. It adds Microsoft Teams as an additional training-delivery channel.

### **Q: Can I limit which users receive Teams messages?**

A: Yes. You control the target groups when launching or scheduling a training. Please create target groups for your employees, and launch the training to those groups via Microsoft Teams.
