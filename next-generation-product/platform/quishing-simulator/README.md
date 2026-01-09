---
description: >-
  Technical documentation for the Keepnet Quishing Simulator, outlining setup,
  QR phishing scenario configuration, campaign execution, and analysis of
  simulated quishing test results.
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

# Quishing Simulator

The **Quishing** **Simulator** allows you to create realistic simulated quishing attacks using QR codes sent through emails to employees to assess their ability to recognize suspicious QR code-based emails and their response to attacks that could compromise organizational data and systems.

The product provides the capability to customize and target a quishing campaign suited to your organization and to evaluate the results.

## Shortcuts

* [How to create quishing scenarios](manage-quishing-scenarios/quishing-scenarios.md)
* [How to launch a quishing campaign](quishing-campaign-manager.md)
* [How to view quishing campaign statistics](quishing-campaign-reports.md)

## FAQ

### Q: How are the printout QR code posters and email QR code tracked?

A: Scanning the QR code directs users to a chosen HTML Landing Page (a simulation phishing URL). This triggers an HTTP request on their browser to the unique simulation URL hosted on our platform, enabling us to track the QR code scan, clicked link, or submitted data.

### Q: How Is the Difficulty Level Determined?

A: The difficulty level of quishing templates and landing pages is determined based on several factors, including but not limited to:

* **Sophistication of Phishing Techniques:** The use of advanced spoofing methods, such as display name spoofing, domain similarity, and the inclusion of personalized information, can make a phishing attempt more difficult to recognize.
* **Quality of the Content:** The presence of grammatical errors, unusual requests, or other indicators typically associated with phishing can vary. Templates with fewer errors and more realistic scenarios are considered more difficult.
* **Design and Presentation:** For landing pages, the visual design and how closely it mimics legitimate websites play a crucial role. High-quality designs that closely resemble real sites increase the difficulty level.
* **Context and Relevance:** Attempts that leverage current events, believable scenarios, or target specific job roles can be harder to identify as phishing, especially if they align closely with the recipient's expectations or experiences.

#### Criteria for Difficulty Levels

* **Easy:** These attempts may contain obvious signs of phishing, such as poor spelling and grammar, generic greetings, or implausible requests. They are typically easier for users to identify with basic awareness training.
* **Medium:** These attempts are more sophisticated, with fewer obvious errors and more plausible scenarios. They might have email addresses and websites that look genuine, but if you pay attention, you can still find some mistakes.
* **Hard:** These are highly sophisticated attempts that closely mimic legitimate emails and websites, often using personalized information and current events to create convincing scenarios. Recognizing these requires advanced awareness of identity QR code phishing tactics.
