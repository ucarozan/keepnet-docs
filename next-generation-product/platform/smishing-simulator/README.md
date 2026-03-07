---
description: >-
  Technical documentation for the Keepnet Smishing Simulator, describing setup
  steps, SMS phishing scenario configuration, campaign execution, and analysis
  of simulation results.
---

# Smishing Simulator

The **Smishing** **Simulator** allows you to create realistic simulated smishing SMS messages sent to employees to assess their ability to recognize suspicious SMS messages and their response to attacks that could compromise organizational data and systems.\
\
The product provides the capability to customize and target a smishing campaign suited to your organization and to evaluate the results.

## Shortcuts

* [How to create smishing scenarios](manage-smishing-scenarios/)
* [How to launch a smishing campaign](smishing-campaign-manager.md)
* [How to view campaign reports](smishing-campaign-reports.md)

## FAQ

### Q: How Is the Difficulty Level Determined?

A: The difficulty level of text message templates and landing pages is determined based on several factors, including but not limited to:

* **Sophistication of Phishing Techniques:** The use of advanced spoofing methods, such as display name spoofing, domain similarity, and the inclusion of personalized information, can make a phishing attempt more difficult to recognize.
* **Quality of the Content:** The presence of grammatical errors, unusual requests, or other indicators typically associated with phishing can vary. Templates with fewer errors and more realistic scenarios are considered more difficult.
* **Design and Presentation:** For landing pages, the visual design and how closely it mimics legitimate websites play a crucial role. High-quality designs that closely resemble real sites increase the difficulty level.
* **Context and Relevance:** Attempts that leverage current events, believable scenarios, or target specific job roles can be harder to identify as phishing, especially if they align closely with the recipient's expectations or experiences.

#### Criteria for Difficulty Levels

* **Easy:** These attempts may contain obvious signs of phishing, such as poor spelling and grammar, generic greetings, or implausible requests. They are typically easier for users to identify with basic awareness training.
* **Medium:** These attempts are smarter, with less clear mistakes and stories that seem more real. They may use email addresses and websites that look authentic, but there are still some errors you can spot if you look closely.
* **Hard:** These are highly sophisticated attempts that closely mimic legitimate emails and websites, often using personalized information and current events to create convincing scenarios. Recognizing these requires advanced awareness of identity sms phishing tactics.

### **Q: How can clients request a new phone number or area code?**

A: Clients can request a new phone number or area code by contacting support@keepnetlabs.com. Our Customer Success team will coordinate with the support team to deploy the requested phone number onto the Smishing Simulator.

### **Q: What data collection items are allowed for smishing?**

A: We do not collect sensitive data such as passwords or similar information. Additionally, we do not capture responses from target users via SMS.

### **Q: Are QR codes supported within smishing?**

A: QR codes are not supported in our SMS phishing simulator. For QR code simulations, Keepnet Labs offers a separate product called [QR Code Simulator (Quishing)](../quishing-simulator/).

### **Q: Are email addresses required for smishing?**

A: Email addresses are not directly required for smishing itself; however, they are needed to create target user profiles in the system.

### **Q: If smishes are reported as junk by target users from other companies, will it affect the delivery of my campaigns?**&#x20;

A: Yes, if the sending phone number has been previously used and blocked by cellular providers due to reports from target users at other companies, it may affect your campaign's deliverability. To prevent this, create a test group with numbers from various providers (e.g., AT\&T, Verizon, Vodafone) to check if the number is blocked. Change the number as necessary.

### **Q: What happens if target users delete or report smishes as junk on their mobile devices? How does this impact future campaigns from the same number?**

A: If target users report smishes as junk or delete them, it can affect the deliverability of future campaigns from the same number. It's advisable to change the sending phone number.

### **Q: Why are my SMS messages not being delivered to users?**

A: Many telecommunication providers restrict message delivery to prevent spam and network overload through rate limiting, content filtering, and bulk messaging controls. To prevent your messages from being blocked, you need to understand and follow these guidelines:

* **Rate Limiting:** Telecommunication providers limit the number of SMS messages sent from a single number within a specific timeframe. Spread out your message dispatches to avoid being blocked, e.g., send 50 messages over 20 minutes instead of 20 seconds.
* **Content Filtering:** Telecommunication providers scan for repetitive content and specific keywords. Avoid sending identical messages to multiple recipients quickly and steer clear of spammy keywords like "Save big money," "Make money," "Free trial," "Free gift," "Guaranteed," "Risk-free," "Limited time," and "Act now."
* **Simulation Domain:** The phishing simulation domain used in the SMS message could be blocked or marked as spam by telecommunication providers. Therefore, it is advisable to change the domain to another available domain on the platform and send the SMS message again to see if it delivers successfully.
* **Landing Page:** The HTML landing page used in the SMS message could also trigger filtering and cause the message to be marked as spam. Ensure that the landing page does not include logos or branding from well-known companies like Microsoft or Apple, as this can lead to your message being flagged.

For further assistance on SMS delivery, please contact the support team.

### **Q:** Why might a customer get the error message '_There must be at least one target user in the selected groups_' ?

A: There a couple of reason you may receive this message

* There are no users in the target group selected
* The domain of selected users has not been verified
* The target users do not have mobile phone numbers

To resolve, ensure the target group you are selecting contains at least one user with a verified domain. In the case of Smishing and Vishing, the user must also have a phone number associated with them.

### Q: How undelivered smish attempts due to Telco blocking are identified and resent

Keepnet ensures successful SMS message delivery by actively tracking and managing undelivered messages, particularly those blocked by telecommunications providers. Here's how undelivered smishing simulation (smish) attempts are identified and resent:

#### **1. Tracking Message Delivery Status**

Keepnet monitors SMS delivery statuses in real time. Each message sent is assigned a status, such as:

* **Delivered** – Successfully received by the recipient.
* **Failed** – Unable to reach the recipient.
* **Rejected** – Blocked by the recipient's carrier before delivery.
* **Undelivered** – Encountered an issue preventing completion.

#### **2. Identifying Carrier Blocking**

When a message is blocked, an error code is logged, helping Keepnet pinpoint the reason for failure. Common indicators of carrier filtering include:

* **Content-related blocking** – Carriers may filter messages based on words, URLs, or patterns flagged as spam or phishing.
* **Destination restrictions** – Some numbers may be blocked from receiving messages due to carrier policies.
* **Rate-limiting or bulk message filtering** – Some carriers limit or delay messages that appear to be part of bulk campaigns.

#### **3. Analyzing and Adjusting Message Content**

If a smish attempt is blocked, Keepnet analyzes the message structure and content. To improve deliverability:

* Suspicious words and phrases that might trigger filtering are adjusted.
* URLs are modified or shortened appropriately.
* Messages are personalized to reduce the likelihood of being flagged as spam.

#### **4. Resending Messages**

Once adjustments are made, Keepnet resends the message, ensuring compliance with carrier guidelines while maintaining the integrity of the security simulation.

#### **5. Preventing Future Blocking**

To reduce future delivery issues, Keepnet follows best practices, such as:

* Using reputable sender numbers.
* Complying with carrier regulations.
* Implementing adaptive message templates that reduce filtering risks.

By proactively monitoring message logs, analyzing failures, and refining content, Keepnet ensures smishing simulations reach intended recipients effectively, enhancing security awareness training and real-world preparedness.

