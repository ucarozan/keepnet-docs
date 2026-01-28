---
description: >-
  Technical documentation for the Keepnet Incident Responder, explaining
  incident investigation workflows, response actions, case management, and tools
  for tracking and resolving security events.
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
---

# Incident Responder

This section provides a brief description of the Incident Responder. This guide will provide instructions on how to use the Incident Responder platform. The [Incident Responder](https://keepnetlabs.com/products/incident-responder) analyses a suspicious email, and according to the results, it takes action at the inbox level. The product also analyses the URLs, IPs, and Files with the engines of different technologies it is integrated where it enables an institution to acquire the technologies that it doesn’t have.

## Shortcuts

* [How to see reported emails and their analyses results](incident-responder-dashboard.md#reported-emails)
* [How to understand widgets on the Incident Responder](incident-responder-dashboard.md#widgets)
* [How can I start an investigation to find malicious emails on email users](investigations.md)
* [How can I integrate anaylsis engines that the platform supports into my company profile](integrations.md)
* [How to create automated playbook rules](playbook.md)
* [How can I integrate O365, Exchange or Google Workspace to start an investigation on the email server](mail-configurations/)
* [How can I customize the Phishing Reporter add-on and how can I deploy it to the email users after customization](../phishing-reporter/)

## **FAQ**

### Q: If a harmful email triggers an auto-investigation, will the same repeated email trigger auto-investigation each time?

A: No. A single auto-investigation is initiated for identical harmful reported emails, targeting specific malicious elements (Sender IP, Link, Attachment Hash). There is no need to start auto-investigation each time for the same reported harmful email after the first one is started and actively working. The auto-investigation remains active for a day and then expires.

### **Q: Does the incident responder violate the user's privacy?**

A: No, it does not. No one, including the Company Admins who manage the platform's interface, can view the contents of any email in the inbox.

### **Q: Is it possible to centralise the distribution of add-in?**

A: Yes, it is. Many institutions manage the add-in (install, uninstall, enable, disable) with central administration tools, such as Microsoft SCCM, IBM Bigfix.

### **Q: Are the emails sent by users for analysis securely stored on the server?**

A: The platform generates a random key which is unique for each customer then encrypts all reported emails on disk with AES 256 algorithm.

### **Q: Can I integrate this solution with the security products I have?**

A: Yes, it is possible to integrate any solution. There are many platforms such as DNS Firewall, Sandbox, exploitation tool platforms. [See the integrations here](integrations.md). Please view your support page.

### **Q: How do you report the incidents analysed, investigated and responded to?**

A: Yes, you have the feature for an automatic investigation by which and you can detect and remove the suspicious email or any of its variants in any of your users' inboxes, and you can automatically report it.

### **Q: How do you analyse the emails? Which tools are used for analysis?**

A: We analyze suspicious emails by Header, Body and Attachment using our third-party engines integrated into our interface. It is possible to add a new analysis service [here](integrations.md).

### **Q: If the suspicious email analysed is found to be malicious, can we delete this email from the inboxes without any intervention?**

A: Yes, you have a feature for automatic investigation. With this, you can detect and remove the suspicious email and/or any of its versions in any of your users' inboxes, which you can automatically report.

### **Q: What are the dependencies of the plugin? Java, Flash or something else?**

A: There are no dependencies that is required to download on users computer in order to use Phishing Reporter plugin.

### **Q: Can the plugin be disabled by individual users?**

A: This depends on your company policy. If the user has a right to disable it, then it can be disabled. Many organisations handle these processes by GPO.

### **Q: When this tool is running, it will be using a certain port. What port will it be?**&#x20;

A: Add-in to connect to the server is through https (default port 443).

### Q: Can emails reported on the Incident Responder be sent to Proofpoint for analysis?

A: Yes, you can use [Keepnet Labs' APIs](../company/company-settings/rest-api.md) to retrieve reported emails, including **Links**, **Sender** **IP**, and **Attachments**, and then submit them to **Proofpoint via their APIs** for analysis.



## Use cases

### **Introduction**

Primary use cases for Incident Responder are centered around the following:

1. I want an incident response system that can automate the technical analysis and investigation of suspicious, malicious emails in under a minute.
2. I want to integrate Incident Responder with other Threat Intelligence / Sharing and Incident Response solutions already purchased.
3. I want to make sure that the privacy of users is protected.
4. I want the service to work on mobile as well as desktop devices.
5. I want an interface/management console, which can manage each incident.

**Incident Responder satisfies the criteria of each of these use cases; please see more below:**

### **Use Case: I want to automate the technical analysis and investigation of suspicious emails in under a minute**

Receiving a suspicious email is not great, but with Incident Responder, you’re able to take the right steps to protect your organisation from any malicious attacks from suspected emails and resulting in damaging data breaches. Use the details we know from Phishing Reporter about this discovered Incident and start a New Investigation. This will enable investigators to determine how far the executed attack from the suspicious email has so far penetrated defences by use of filters to ascertain what particular departments or individuals etc., have been affected.

Playbooks are an essential feature of Incident Responder as it automates and initiates investigations without too much oversight from the user. We suggest that you monitor how they are performing and tweak/edit them occasionally to get the best information and results from the investigations.

Incident Analysis is then carried out on the suspicious email within the Incident Response platform as well as other third-party technologies to provide the best results. Act to take the best, effective and quick response to the results and make your organization, colleagues and systems safer, more secure and resilient to prevent the risk of future incidents.

### **Use Case: I want a system that integrates with my other Threat Intelligence / Sharing and incident response solutions**

Integrations are commonplace in the information security community, and Incident Responder is no different in being flexible to be used in alliance with other platforms.  The New Integration feature walks users through the stages of integrating another cybersecurity solution. Remember to make active the new Integration as the last step to complete Threat Intelligence and Incident Response coverage.

### **Use Case: I want to make sure that the privacy of users is protected**

Privacy concerns are of paramount importance in an incident response platform, and Incident Responder addresses these. Both Users and Company Administrators who manage the platform do not have access to the contents of any emails in the users’ inboxes.

### **Use case: I want the service to work on mobile as well as desktop devices**&#x20;

The Incident Responder service can be used on both mobile as well as desktop devices.

### **Use case: I want an interface/management console, which can manage each incident**

It is human nature to lose track of what’s going on in a hectic information security environment. Incident Responder mitigates this risk with a comprehensive dashboard which provides an overview into how many users are on the Phishing Reporter platform, Reported Emails, Incidents are undergoing investigation, Top Rules, Incident Analysis and ROI.

It is recommended that you use the Reports generated from the use of the Incident Responder in conjunction with authorised third party technologies to achieve the best results. Reports can be used in line with the organisation’s own procedures and help avert potential cyber threats in the future. Threat Sharing / Threat Intelligence platforms are ideal places in which reported Incidents can be used for the wider benefit of a particular industry or sector.

### **Use Case: I have a single main tenant on O365 but manage multiple business units under that tenant. I would like to restrict the** [**Incident Responder**](https://keepnetlabs.com/products/incident-responder) **integration to specific groups within the Main tenant.**

Yes, it’s possible to integrate with your main (single) tenant via the graph API, then you can restrict the API integration to a distribution group in Azure AD. i.e., you can decide which user mailboxes to integrate with (it does not have to be all of them). Please follow the steps below:

1. You need to implement the graph API settings for Incident Responder (following our standard configuration, which includes making the API work for “all’ users - [https://doc.keepnetlabs.com/Next-Generation-Product/platform/incident-responder/mail-configurations/microsoft-365](mail-configurations/microsoft-365.md))
2. Then you need to limit access to the App from Azure AD as it relates to Exchange Online ([https://docs.microsoft.com/en-us/graph/auth-limit-mailbox-access](https://docs.microsoft.com/en-us/graph/auth-limit-mailbox-access))\
   <br>
