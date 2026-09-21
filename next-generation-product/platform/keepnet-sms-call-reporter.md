# Keepnet SMS/Call Reporter

The **Keepnet SMS/Call Reporter** is a free mobile app that lets employees report a suspicious SMS message or an unknown phone call in one tap and receive a plain-language analysis result on the same device. It is available on iPhone today, and an Android version is on the way.

This page explains what the app does, which problem it solves, how it is installed and used, what data leaves the phone, and how to roll it out across an organization.

<figure><img src="../../.gitbook/assets/download.jpeg" alt="Keepnet SMS/Call Reporter — report suspicious SMS messages and calls in one tap." width="210"><figcaption></figcaption></figure>

## Overview

### The problem this app solves

[Phishing reporting ](phishing-reporter/)has been built around the inbox. An employee who receives a suspicious email clicks the Phishing Reporter add-in in Outlook, the report reaches the security team, and the incident is analyzed and closed.

[Smishing (SMS phishing)](smishing-simulator/) and [Vishing (voice phishing)](vishing-simulator/) arrive somewhere else — on a personal handset, outside the email gateway and outside the reporting workflow. An employee who receives a scam text has no equivalent button. The usual options are to screenshot the message and email it to IT, to forward it, or to delete it and say nothing. Each of these is slow, and the last one leaves the organization unaware that an attack is reaching its employees.

The **Keepnet SMS/Call Reporter** closes that gap on the employee's own device:

* Reporting takes one tap from the iOS Messages junk-reporting flow or from the Recents list in the Phone app.
* The employee receives the analysis result directly, so a suspicious message is resolved without waiting on a help desk.
* Reporting works from a personal phone without a management profile and without a Keepnet account.

### Key capabilities

<table><thead><tr><th width="189.8203125">Capability</th><th>Description</th></tr></thead><tbody><tr><td>One-tap reporting</td><td>Report a suspicious SMS from the Messages app or an unknown number from the Recents list in the Phone app. Copying the message, taking a screenshot, or forwarding it to an address is not required.</td></tr><tr><td>On-device first analysis</td><td>The reported content is first evaluated on the device, so clear-cut cases return a result immediately.</td></tr><tr><td>Threat-intelligence check</td><td>When the on-device result is not conclusive, the content, links, and number are compared against more than 10 threat-intelligence sources.</td></tr><tr><td>Four plain-language results</td><td>Every report resolves into No threat detected, Suspicious, Spam, or Malicious — each with the reasons behind it and a recommended action.</td></tr><tr><td>Bulk reporting</td><td>Report an entire conversation from an unknown sender at once, or select individual messages.</td></tr><tr><td>Personal report history</td><td>My Reports stores every report with a reference number, and supports search and filtering by type, date range, and result.</td></tr><tr><td>Analytics</td><td>Report counts, risk-detection rate, channel breakdown, a 14-day trend, and a threat-category distribution.</td></tr><tr><td>10 interface languages</td><td>Arabic, Chinese (Simplified), English, French, German, Hindi, Italian, Portuguese, Spanish, and Turkish.</td></tr></tbody></table>

### Platform availability

<table><thead><tr><th width="183.5">Platform</th><th>Status</th><th>Where to get it</th></tr></thead><tbody><tr><td>iPhone (iOS)</td><td>Available now, iOS 16.4 or later</td><td><a href="https://apps.apple.com/app/keepnet-sms-call-reporter/id6786218436">App Store</a></td></tr><tr><td>Android</td><td>Submitted to Google Play, not yet published</td><td>Added to this page once it goes live</td></tr></tbody></table>

The app is published by **KEEPNET LABS LTD**, is free, and needs no Keepnet licence and no Keepnet account — it can be used as a Guest. The iPhone download is 10.4 MB.

## Installing the app

There are three ways to get the app onto a phone. An employee installs it from the store, or the organization pushes it to managed devices through its MDM platform.

### On iPhone

Five steps. Step 3 is mandatory — without it, the reporting option does not appear inside Messages and Phone.

1. **Download the app from the App Store.** Search for **Keepnet SMS/Call Reporter**, published by **KEEPNET LABS LTD**, or open [keepnetlabs.com/app](https://keepnetlabs.com/app) on the iPhone.
2. **Pass the welcome screen.** The app opens on a screen that explains what it does. Tap **Get Started** to move to the permission step. Setup cannot continue until permission is granted.
3. **Enable the reporting extension.** Go to **Settings > Apps > Phone > SMS/Call Reporting** and select **Keepnet**.
4. **Allow notifications.** The analysis result arrives as a notification. With notifications turned off, the app has to be opened manually to see the result.
5. **Sign in, or continue as a Guest.** Signing in with an Apple, Google, or Microsoft account synchronizes reports across devices. Without signing in, the app runs in **Guest** mode and every reporting feature works the same way.

> **Check that setup worked.** Open a conversation from an unknown sender in the Messages app. If a reporting link appears below the messages, setup is complete. If it does not, return to step 3.

A single download installs two components: the main app, and the reporting extension that runs inside Messages and Phone. The reporting screen shown by that extension follows the phone's system language rather than the language selected inside the app.

### On Android

The Android app has been submitted to Google Play and is not published yet. Once it is live, the Google Play link and the Android installation steps are added to this page. The reporting flow, the analysis, and the four results are the same on both platforms.

### Through MDM, for organizations

Because the app is published on the App Store, it can be assigned to managed iPhones through Apple Business Manager and an MDM platform — Microsoft Intune, Jamf, Workspace ONE, or any other — in the same way as any other App Store app. Employees do not have to find or download anything. No enterprise certificate and no custom build are required.

#### Before starting

| Requirement                             | Detail                                                                                                                             |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Apple Business Manager                  | An active account with a Content Manager role that can acquire licences in Apps and Books.                                         |
| MDM connected to Apple Business Manager | The MDM must hold a current location token from Apple Business Manager. Tokens are valid for one year.                             |
| Enrolled devices                        | Devices already enrolled in the MDM. Company-owned devices enrolled through Automated Device Enrollment give the smoothest result. |
| iOS 16.4 or later                       | iPhones below this version do not receive the app.                                                                                 |

#### Deployment steps

1. **Acquire licences in Apple Business Manager.** Open **Apps and Books**, search for **Keepnet SMS/Call Reporter**, and assign the required quantity to the location linked to the MDM. The app is free, so the licences carry no cost; acquiring them places the app under central management.
2. **Sync the MDM with Apple Business Manager.** Run a manual sync so the new licences appear in the app catalogue.
3. **Assign the app as required, with device licensing.** Target the device or user group that should receive the app. Device licensing does not ask the employee for a personal Apple Account, and consumes one licence per device. In Microsoft Intune the path is **Apps > All Apps >** the app **> Properties > Edit** next to **Assignments > Required**.
4. **Pilot before the full rollout.** Assign to a small group first and confirm the app reaches the home screen. The MDM does not install the app itself; it tells Apple which licence belongs to which device, and the install happens between Apple and the device. Devices must be unlocked and checked in for the install to complete.

#### What the employee sees

How quiet the installation is depends on the enrolment type. Fully silent installation is possible on supervised, company-owned devices. On other enrolment types Apple requires the employee to accept the install once, and no MDM can remove that step.

| Device and enrolment type                      | Install prompt        | Apple Account required                                                                                 |
| ---------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------ |
| Company-owned, supervised, device licensed     | None — fully silent   | No                                                                                                     |
| Company-owned, not supervised, device licensed | Employee accepts once | No                                                                                                     |
| Personal device (BYOD), device licensed        | Employee accepts once | No                                                                                                     |
| User Enrollment devices                        | Employee accepts once | Yes — device licensing is not supported here, so a user licence with a Managed Apple Account is needed |

> **One step cannot be pushed centrally.** Enabling the reporting extension under **Settings > Apps > Phone > SMS/Call Reporting** is a per-user choice on iOS. An MDM deployment installs the app, but each employee still has to enable Keepnet there before the reporting option appears in Messages and Phone. Cover this step explicitly in the rollout communication.

#### Operational notes

<table><thead><tr><th width="179.3046875">Topic</th><th>Detail</th></tr></thead><tbody><tr><td>Licence count</td><td>One licence per device with device licensing. Acquire a few more than the device count to leave room for replacements.</td></tr><tr><td>Updates</td><td>Enable automatic app updates in the Apple Business Manager token settings. A device-licensed app is installed and updated through the MDM channel only, so employees cannot update that copy from the App Store themselves. Updates can take up to 24 hours to reach a device.</td></tr><tr><td>Removing the app</td><td>Unassigning the app in the MDM reclaims the licence and removes the managed copy from the device.</td></tr><tr><td>Keepnet-side configuration</td><td>None. The deployment runs entirely inside the organization's own Apple Business Manager and MDM.</td></tr><tr><td>Android devices</td><td>The Android app is not published yet, so it cannot be assigned through Managed Google Play. Once it is live, the same principle applies and the steps are documented here.</td></tr></tbody></table>

### Announcing the app to employees

Whichever route is used, employees need one short message telling them what appeared on their phone and what to do with it. The first point to make is that the inbox is not read and only the reported item is transmitted; stating this clearly increases adoption.

> **Subject: A new app on your work phone — report scam texts and calls**
>
> You will see a new app on your work phone called Keepnet SMS/Call Reporter. It has been installed for you, so there is nothing to download.
>
> Scam text messages and voice calls are now one of the most common ways attackers reach people directly, and until now there was no simple way to report them. This app closes that gap.
>
> Two minutes to set up:
>
> 1. Open the app from your home screen.
> 2. Go to Settings > Apps > Phone > SMS/Call Reporting and select Keepnet.
> 3. The next time a suspicious text or call arrives, report it in one tap.
>
> The app does not read your messages and does not record your calls. It only sends what you choose to report.

## Reporting a suspicious message or call

The screens below are the iPhone app.

### Reporting an SMS

1. **Open the conversation in the Messages app.** The reporting link appears below the messages.
2. **Choose what to report.** Tap **Report All Messages** to report the whole conversation — the fastest path. To report only some of them, enter selection mode, tap the circles to the left of those messages, then tap **Report Messages** at the bottom of the screen.
3. **Check the confirmation screen.** It shows the number of messages to be reported, the sender, and the first lines of each message, so the selection can be verified before anything leaves the phone.
4. **Send or cancel.** The check mark at the top right sends the report. The cross at the top left closes the screen without sending anything.

When the report is sent, the sender, content, and timestamp of the reported messages are encrypted and transmitted to Keepnet. Nothing else in the inbox is transmitted.

> **Note.** The reporting link appears only in conversations from senders that are not in the contacts list. iOS does not expose the junk-reporting flow for messages from a saved contact. To report a message from a known sender, remove the sender from contacts or report the number from the Phone app.

### Reporting a call

1. **Open the Recents list** in the Phone app.
2. **Select the unknown number.** The number does not have to be written down anywhere first.
3. **Choose the reporting option and select Keepnet.**

For calls where the caller withheld their number, the result screen shows **Unknown number** instead of a number. This means the caller's number was not presented to the phone, not that the app failed to capture it.

## Understanding the result

### How the analysis works

<table><thead><tr><th width="204.6875">Stage</th><th>What happens</th></tr></thead><tbody><tr><td>1. On-device analysis</td><td>The reported content is evaluated locally at the moment of reporting. Clear-cut cases return a result immediately.</td></tr><tr><td>2. Deep analysis</td><td>When the local result is not conclusive, the content, its links, and the number are compared against more than 10 threat-intelligence sources.</td></tr><tr><td>3. Result</td><td>The result usually returns within seconds. Under heavy load it can take a minute or two, and it is ready by the time the notification arrives.</td></tr></tbody></table>

### Reading the result

Tapping the notification, or opening a report card in the app, shows the Security Analysis screen.

<figure><img src="../../.gitbook/assets/download (1).jpeg" alt="Security Analysis — the result, the signals behind it, and the recommended action." width="210"><figcaption></figcaption></figure>

The screen contains:

* **Sender and time** — the reported number or sender name, and the date of the report.
* **Status labels** — the record type (SMS or Call) and the analysis status.
* **Message content** — the text of the reported message. Links inside it are displayed but are not tappable.
* **Report summary** — Reference No, reported date, threat type, and status.
* **Result and reasons** — the result, a one-sentence explanation, and the signals that triggered it.
* **Recommended action** — the step to take, for example not opening the link and deleting the message.

> **Note.** Sharing the **Reference No** (for example `RPT-779044A1`) in a support request lets the record be located quickly.

### The four results

<table><thead><tr><th width="160.43359375">Result</th><th>What it means</th><th>What to do</th></tr></thead><tbody><tr><td><strong>No threat detected</strong></td><td>The message or number did not match known threat indicators.</td><td>Stay cautious. A very new attack may not have reached the intelligence sources yet.</td></tr><tr><td><strong>Suspicious</strong></td><td>Something is out of the ordinary — brand imitation or a mismatched link — but the evidence is not sufficient to call it an attack.</td><td>Do not tap the link. Verify the sender through the organization's official channel.</td></tr><tr><td><strong>Spam</strong></td><td>Unsolicited bulk messaging rather than a targeted attack.</td><td>Do not reply. Use the mobile operator's blocking options if required.</td></tr><tr><td><strong>Malicious</strong></td><td>The message or number is linked to a known attack — typically a phishing site, payment fraud, or credential harvesting.</td><td>Do not tap the link and do not reply. If the link was already opened, follow the recovery steps below.</td></tr></tbody></table>

A result describes the reported item. **No threat detected** does not certify that a message is safe. Verifying an unexpected message with the sending organization through its official channel remains the safest course.

In the My Reports list, the coloured strip on the left of each card reflects the risk level: red for malicious, amber for suspicious, and green for items where no threat was found. On the Home screen, the strip indicates the record type instead — blue for SMS, orange for calls.

### Sending feedback on a result

If a result looks wrong, feedback can be submitted from the analysis screen. This feedback is used to improve the analysis rules.

## My Reports and Analytics

### My Reports

<figure><img src="../../.gitbook/assets/download (2).jpeg" alt="My Reports — every report, searchable and filterable." width="210"><figcaption></figcaption></figure>

My Reports lists every report submitted from the device:

* Type tabs — All, SMS, or Call.
* Search — by sender, message text, or reference number.
* Time filter — last 24 hours, 7 days, 30 days, or all.
* Result filter — No threat detected, Suspicious, Spam, or Malicious.
* Day grouping — records are grouped under Today, Yesterday, and older headings.

### Analytics

<figure><img src="../../.gitbook/assets/download (3).jpeg" alt="Analytics — volume, risk detection rate, and threat distribution." width="210"><figcaption></figcaption></figure>

Analytics summarizes reporting activity for the selected time range:

* **Total Reports** and **Risk Detection Rate** — how many reports were submitted, and what percentage were found to carry risk.
* **SMS Reports** and **Call Reports** — the breakdown by channel.
* **Report Trend** — the daily distribution over the last 14 days, with SMS and calls in separate colours.
* **Threat Categories** — the distribution of reports by result.

## Privacy and data handling

The most frequent question about the app is whether it reads messages. It does not.

<table><thead><tr><th width="172.4921875">Topic</th><th>Status</th></tr></thead><tbody><tr><td>Inbox access</td><td>None. The app does not read or scan the SMS inbox. Apple's privacy framework blocks background access to messages.</td></tr><tr><td>When data is sent</td><td>Only when the check mark on the confirmation screen is tapped.</td></tr><tr><td>What is sent</td><td>The sender, content, and timestamp of the reported messages, transmitted in encrypted form.</td></tr><tr><td>Retention</td><td>Reports are deleted automatically after 90 days.</td></tr><tr><td>Export and deletion</td><td>Report data can be exported or deleted at any time from the app.</td></tr><tr><td>Account deletion</td><td>Deleting the account also removes the associated reports from the server.</td></tr><tr><td>Account requirement</td><td>None. Signing in is optional and serves to synchronize reports across devices.</td></tr><tr><td>Price</td><td>Free on the App Store.</td></tr></tbody></table>

### What the app does and does not do

The app does:

* Analyze only the message or number that was explicitly reported.
* Allow several messages in the same conversation to be reported at once.
* Keep every report in a personal report list.
* State the reason behind each result and the step to take.

The app does not:

* Read or scan the SMS inbox.
* Access messages in the background — Apple's privacy framework prevents this.
* Require an account in order to start using it.
* Block messages or calls. The function is reporting and analysis.

### Where reports go

Reports submitted from the app are currently returned to the employee inside the app. Central visibility of employee SMS and call reports alongside reported emails in Incident Responder is planned for a future release.

To discuss reporting requirements across an organization, [contact the Keepnet team](https://claude.ai/resources/keepnet-support-help-desk).

## Guidance for employees

### What to do with a suspicious message

Do not:

* Tap the link. A single visit confirms that the number is active.
* Reply. Every reply, including writing STOP, shows that a real person was reached.
* Call back the number in the message.
* Share personal information, passwords, or verification codes.
* Delete the message silently — reporting it helps stop the same attack reaching other people.

Do:

* Report the message through Keepnet.
* Verify the sender's identity through the organization's official channel.
* Report other messages from the same sender together.
* Read the result — the reasons and the recommended action help with recognizing similar messages.
* Inform the organization's information security team if doubt remains.

### If a link was opened or information was entered

1. **Change the password immediately**, and update any other account using the same password.
2. **Turn on multi-factor authentication** wherever it is not already active.
3. **Inform the bank** without delay if payment or card details were entered.
4. **Notify the organization** if a corporate account or device is affected.
5. **Report the message** so the same attack can be stopped from reaching other employees.

A fraud message is rarely sent to one person — attackers send the same text to hundreds of numbers at once. The first person to report it helps prevent that attack reaching other employees, which makes reporting a shared defence rather than an individual precaution.

## FAQs

### Q: Is a Keepnet account required?

A: No. Signing in is optional. The app runs in Guest mode and every reporting feature works the same way.

### Q: Is there a charge for the app?

A: No. The app is offered free of charge on the App Store. For enterprise use and licensing, contact the Keepnet team.

### Q: Which devices are supported?

A: Any iPhone running iOS 16.4 or later. An Android version has been submitted to Google Play and is not available yet.

### Q: Is there an Android version?

A: The Android app has been submitted to Google Play and will be available once it is published. This page is updated with the Android store link and installation steps at that point. The reporting flow and the four results are the same on both platforms.

### Q: Does the app read my messages?

A: No. The inbox is neither read nor scanned. Only the item chosen for reporting is sent.

### Q: The reporting option does not appear in Messages.

A: Confirm that Keepnet is enabled under **Settings > Apps > Phone > SMS/Call Reporting**.

### Q: Why can some messages not be reported?

A: iOS exposes the junk-reporting flow only for conversations with senders that are not in the contacts list. Messages from a saved contact do not show the reporting link.

### Q: A report was started on the wrong message. Can it be cancelled?

A: Yes. Tap the cross at the top left of the confirmation screen. Nothing is sent.

### Q: How long does a result take?

A: Usually seconds. Cases that need deep analysis can take a minute or two.

### Q: How long are reported records kept?

A: 90 days. Records are deleted automatically after that period and can be deleted manually at any time.

### Q: What should be shared in a support request?

A: The **Reference No** shown on the result screen, which allows the record to be located quickly.
