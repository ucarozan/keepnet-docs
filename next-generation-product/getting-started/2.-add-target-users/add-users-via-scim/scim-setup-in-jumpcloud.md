# SCIM Setup in Jumpcloud

The document show step-by-step how to synchronize users' information from the Jumpcloud identity provider to the platform.

## **SCIM Configuration in Jumpcloud**

1. Please log in to Jumpcloud as an **admin** and follow the following steps.
2. Please create a group and assign users to the group for synchronization.
3. Go to **SSO** > **+** > and then click the **Custom SSO SAML.**
4. Enter a name for the **Application name**.
5. Go to the **SSO s**ubmenu and **enter a number like ‘1’** into the **‘IdP Entity ID’** and **‘SP Identity ID’** fields.
6. Go to the **Identity Management** submenu and then go to the bottom of the page to fill up the following fields.
   1. **SCIM Version:** SCIM 2.0&#x20;
   2. **Base URL:** https://scim-api.keepnetlabs.com/scim
   3. **Token Key:** Please enter the secret token.&#x20;
   4. Click the **‘Test Connection’** button to test the connection and then please click the **‘Activate’** button next to the **‘Test Connection’ button**.&#x20;
   5. Edit the **SSO** rule and then go to the **SSO** menu to **Disable the SSO** at the bottom of the page.

Jumpcloud configuration has been successfully finished. You can proceed with the following step.

## **Synchronization Users or Groups**

1. Go to the **SAML** application and then select **Groups** that contain users that will be synchronized to the platform and then click the **Save** button.
2. The users will be synchronized to the platform in approximately a few minutes.

✅ **You have now added your first Target Users. Now you need to** [**ensure they are able to receive emails from Keepnet**](../../3.-email-deliverability/) **successfully ➡️**
