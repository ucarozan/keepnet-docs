---
description: >-
  Technical documentation for the Keepnet Awareness Educator, covering
  configuration, content management, training campaigns, assessment settings,
  and reporting for user security awareness.
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

# Awareness Educator

This section provides a brief description of the Awareness Educator and other documents that will guide the admins to use the product more effectively.&#x20;

[Awareness Educator](https://keepnetlabs.com/products/security-awareness-training) is a security awareness training tool that improves the security awareness of an organization and its employees. Utilizing Awareness Educator strengthens the organization's defenses against hacker attempts to carry out fraudulent activities, including various malicious threats like phishing, spear-phishing, whaling, baiting, and ransomware.

## Shortcuts

* [How to list training contents, edit, delete or launch](training-library.md)
* [How to view training reports, analyze the user's interaction](enrollments.md)
* [How to list certificates, create, edit or make default](certificates.md)
* [How to launch training through your LMS](training-library.md#how-to-launch-training-through-your-lms)
* [How to launch training through SMS](training-library.md#how-to-launch-training-through-sms)

## FAQ

### Q: What is the 'You have exceeded available time' prompt message that target users see while they watch the training?

A: There is timeout information that is embedded in the scorm file. According to this information, when the training timeout, an alert is displayed on the screen. The target user may click the 'OK' button to continue to training.

### Q: Emails do not arrive to the target users

A: The delivery status can be checked on Sending Report menu in the training report to see if the emails have been delivered successfully to the users. If the emails are successfully delivered, please check your [allow listing settings](../../miscellaneous/allow-listing/).

### Q: Can users resume their training from where they left off?

A: Yes, users can continue their training from the point at which they stopped.

### Q: Why do training emails contain the "X-MS-Exchange-Organization-SkipSafeLinksProcessing: true" header?

A: This header prevents Microsoft Defender from analyzing links in training emails, ensuring accurate test results and preventing false positives.
