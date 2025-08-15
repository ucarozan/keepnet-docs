# Phishing Simulator

The [**Phishing Simulator**](https://keepnetlabs.com/products/phishing-simulator) allows you to create a realistic simulated phishing email that is sent to employees in order to assess their ability to recognize suspicious emails and their response to attacks that could compromise organizational data and systems.

The product provides the capability to customize and target a phishing campaign suited to your organization and to evaluate the results.

## Shortcuts

* [How to see or create phishing scenarios and launch the target users](manage-phishing-scenarios/phishing-scenarios.md)
* [How to see or create phishing email templates](manage-phishing-scenarios/email-templates.md)
* [How to see or create phishing landing pages](manage-phishing-scenarios/landing-pages.md)
* [How to launch a campaign to target users with advanced options](phishing-campaign-manager.md)
* [How to see phishing domains or integrate my phishing domain to the platform](settings/dns-services-and-domains.md)
* [How to exclude IP addresses to prevent false positives reporting](settings/exclude-ip-address.md)

## FAQ

## Q: When executing a phishing simulator attack, you will receive a “test” email prior to execution. Is there a way currently to turn that off?

A: Currently, no - it’s mandatory to see the campaign tested before making any mistake. You will receive the email on the Delivery Settings page. The system automatically sends a test email and notifies you about this action

## Q: Some subdomains are banned such as Microsoft.domain.com. Is it possible for these to be unbanned?

A: If the microsoft name is used in a subdomain there are many threat intelligence services, chromium based browsers, URL filtering tools easily detect and block this domain. If you need this, please reach out to [support@keepnetlabs.com](mailto:support@keepnetlabs.com)

## Q: What would be the steps to get additional URLs added to Keepnet’s Phishing Simulator? For example, if you already own several through GoDaddy.

A: We can only host domains verified through Cloudflare. Please refer to [this document](settings/dns-services-and-domains.md) for more information.

## Q: How can I combine the Email Template and Landing Page to create a phishing scenario?

A: You can easily create a customized phishing scenario to suit your organization. You will find the instructions [here](manage-phishing-scenarios/phishing-scenarios.md).

## Q: Can I delete System Scenarios/Email/Landing Pages?

A: The System templates can't be deleted by the admin users. The admins are able to delete their custom templates.

## Q: Which tracking domain is used for Attachment type campaigns?

A: The platform automatically generates unique tracking links for attached files for each target user for Attachment type campaigns. The domain that is used for the attachment type campaign are dynamics. Please make sure you whitelist all the simulation domains.&#x20;

## Q: Emails do not arrive to the target users

A: The delivery status can be checked on Sending Report menu in the campaign report to see if the emails have been delivered successfully to the users. If the emails are successfully delivered, please check your [whitelisting settings](../../miscellaneous/whitelisting/).

## Q: Why the domain that is used for the campaign gives a red screen on Google?

A: If the campaign contains an HTML page where it contains any words, pictures or links related to Google, Facebook, Twitter, Apple, Microsoft or other such major companies, Google will easily identify it as suspicious and as a result, the user will see red screen after click the link in the simulated phishing email.&#x20;

* Please make sure not to use real words, pictures or links that are related to major companies.
* The platform offers approximately fifty domains to be used in campaigns. The admin can also try to change the phishing domain to a new one and then launch the campaign with the new domain.

## Q: Why I see phishing email looks not properly in Outlook Desktop App?

A: The Outlook Desktop application doesn't read CSS styles which cause sometimes the email not to look properly as it was seen on the platform. You may contact the support team to check if the phishing email could be optimized.

## Q: How Is the Difficulty Level Determined?

A: The difficulty level of email templates and landing pages is determined based on several factors, including but not limited to:

* **Sophistication of Phishing Techniques:** The use of advanced spoofing methods, such as display name spoofing, domain similarity, and the inclusion of personalized information, can make a phishing attempt more difficult to recognize.
* **Quality of the Content:** The presence of grammatical errors, unusual requests, or other indicators typically associated with phishing can vary. Templates with fewer errors and more realistic scenarios are considered more difficult.
* **Design and Presentation:** For landing pages, the visual design and how closely it mimics legitimate websites play a crucial role. High-quality designs that closely resemble real sites increase the difficulty level.
* **Context and Relevance:** Attempts that leverage current events, believable scenarios, or target specific job roles can be harder to identify as phishing, especially if they align closely with the recipient's expectations or experiences.

#### Criteria for Difficulty Levels

* **Easy:** These attempts may contain obvious signs of phishing, such as poor spelling and grammar, generic greetings, or implausible requests. They are typically easier for users to identify with basic awareness training.
* **Medium:** These attempts are more sophisticated, with fewer obvious errors and more believable scenarios. They might have email addresses and websites that look like they are real, but if you look closely, you can still find some mistakes.
* **Hard:** These are highly sophisticated attempts that closely mimic legitimate emails and websites, often using personalized information and current events to create convincing scenarios. Recognizing these requires advanced awareness of identity phishing tactics.

### Q: **Why can't I see the X-Keepnet-TID header in phishing simulation emails once it is forwarded?**

A: If you can't see the X-Keepnet-TID header in phishing simulation emails, it's likely due to how the email was forwarded. If the simulation email was forwarded using the "Forward as Attachment" or "Normal Forward" options in Outlook, Microsoft may alter the email headers.

When a message is forwarded as an attachment in the Outlook desktop application, the attachment is often compressed to reduce its size. This compression can strip the original message headers, including the EOP headers we need to analyze.

To ensure the original message and its headers remain intact, save the message to your desktop first, compress it (we recommend adding it to a .zip archive), and then send the compressed file as an attachment. The Outlook Desktop client will not modify the message within a zip file, ensuring that the complete message with all headers arrives at its destination.

For more details, please refer to the following article: [https://learn.microsoft.com/en-us/archive/blogs/eopfieldnotes/1986](https://learn.microsoft.com/en-us/archive/blogs/eopfieldnotes/1986)
