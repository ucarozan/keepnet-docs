# Microsoft 365

It is essential that your employees are able to receive all emails sent via Keepnet platform for you to accurately measure how your employees behave when faced with evolving social engineering threats.

**To ensure emails are delivered in Microsoft 365, you have 2 options:**

​[Direct Email Creation](m365-direct-email-creation.md) (recommended)

​[Whitelisting](m365-whitelisting.md)​

{% hint style="success" %}
You only need to do one of these options. Customers do not need to complete both.
{% endhint %}

## **Direct Email Creation** <a href="#direct-email-creation" id="direct-email-creation"></a>

**Direct Email Creation (DEC)** is a feature that connects to your O365 or Google Workspace with a few required API permissions. This feature creates the phishing simulation email directly in the user’s inbox instead of sending the emails over SMTP protocol.**Key Benefits:**

1. Remove false positives that whitelisting tools cause when analyzing links.
2. Eradicate maintenance and challenges of whitelisting for the purpose of email delivery (you may need to whitelist in your URL protection solutions such as Defender or ZScaler)
3. Very simple and quick setup (can be completed in a couple of minutes!)

## Whitelisting <a href="#whitelisting" id="whitelisting"></a>

**Whitelisting** is common practise for ensuring emails from specific domains are delivered successfully to the inboxes of your employees. Whitelisting is a method used by many organisations to ensure emails are successfully delivered.

The **key challenge** our customers face with whitelisting is email analysis tools often open links within emails to check for maliciousness, impacting the accuracy of your reporting data. For example, it may show that your employees have opened the phishing link when they have not. This will directly influence who receives the behavioural-based training.
