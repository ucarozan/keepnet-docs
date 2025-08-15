# Step 2. Deploy Phishing Reporter

This section describes in detail how to deploy the Phishing Reporter add-in to users in Microsoft 365, Exchange, or Google Workspace platforms.&#x20;

## Shortcuts

* [How to Deploy the Add-in in Microsoft 365](how-to-deploy-add-in-in-microsoft-365.md)
* [How to Deploy the Add-in in Exchange Admin Center](how-to-deploy-add-in-in-exchange-admin-center.md)
* [How to Deploy the Add-in in Google Workspace](how-to-deploy-add-in-in-google-workspace.md)
* [Phishing Reporter Announcement Email Template](../../../platform/phishing-reporter/phishing-reporter-deployment/phishing-reporter-announcement-email-template.md)

## FAQ

### Q: The add-in was deployed to one of the listed email servers more than 12 hours ago but is still not visible on users' email applications. What can I do?

A: You can try to re-deploy the add-in. If it still does not appear, you should contact the support team of the email service provider.

### **Q: Can an Attacker hijack Outlook Add-in?**

A: The platform uses “Code Signing with Microsoft Authenticode” to protect tools against hacking attempt. For more information, please [click here](https://www.digicert.com/dc/code-signing/microsoft-authenticode.htm)​.

### **Q: Is it possible to centralise the distribution of add-in?**

A: Yes, it is. Many institutions manage the add-in (install, uninstall, enable, disable) with central administration tools, such as Microsoft SCCM, IBM Bigfix.

### Q: Does the Phishing Reporter Add-In work with the Outlook application on iOS?

A: Yes, if you distribute the Phishing Reporter Add-In as an XML package (Microsoft 365), it will be available in both OWA/Outlook applications and will also function within the Outlook application on iOS.
