# IP Restrictions

This section explains the functionality of **IP Restrictions** and provides some related use cases to assist you in creating an optimal configuration. To access the **IP Restrictions**, go to **Company > Company Settings > IP Restrictions**.

## What is "IP Restrictions" used for?

**IP Restrictions** let you control the networks from which users can access your company account in the platform. When you define one or more allowed IP ranges, sign-in is permitted only from those networks — any attempt from an IP address outside the allowed ranges is rejected. This allows organizations to enforce network-based access policies, such as limiting platform access to the corporate network or VPN.

By default, no IP restrictions are configured and users can sign in from any IP address. Restrictions take effect only after you add at least one allowed range and save your changes.

Allowed ranges are defined in **CIDR** notation (for example, `192.168.1.0/24`) or as a single IP address. The restriction applies to the entire company account and is enforced both when a user signs in and on subsequent requests, so a user who changes networks after signing in loses access on their next request.

{% hint style="warning" %}
Before you save an IP restriction, make sure your own current IP address or range is included in the allowed list. If you save a configuration that does not cover your network, you will be locked out of the company account on your next sign-in. If this happens, contact the [Keepnet support team](../../../../resources/keepnet-support-help-desk.md) for assistance.
{% endhint %}

## IP Restrictions Page

The components of the **IP Restrictions** page are:

<table><thead><tr><th width="151.546875">Component</th><th>Description</th></tr></thead><tbody><tr><td>Status banner</td><td>Indicates the current state. When no ranges are defined, it shows that IP restrictions are not configured and users can sign in from any IP address.</td></tr><tr><td>Allowed IP Range</td><td>The field where you add a single IP address or a CIDR range that is permitted to access the company account.</td></tr><tr><td>+ ADD</td><td>Adds the entered IP address or CIDR range to the allowed list.</td></tr><tr><td>Batch Import</td><td>Lets you add multiple IP addresses or CIDR ranges at once instead of entering them one by one.</td></tr><tr><td>Save Changes</td><td>Saves the configuration. Changes take effect on the next sign-in attempt.</td></tr></tbody></table>

## How to Configure IP Restrictions

Go to **Company > Company Settings > IP Restrictions** from the main menu. Then follow the steps below.

* In the **Allowed IP Range** field, enter a single IP address or a CIDR range (for example, `192.168.1.0/24`).
* Click **+ ADD** to add it to the allowed list.
* Repeat for each additional range you want to allow. To add several ranges at once, use **Batch Import**.
* Confirm that your own current IP address or range is included in the list.
* Click **SAVE CHANGES** to apply the configuration.

Once saved, only users connecting from the allowed ranges can sign in. Users connecting from any other network are rejected with a generic message that does not reveal the allowed ranges.

To remove a restriction, delete the relevant range from the allowed list and click **SAVE CHANGES**. When all ranges are removed, the account returns to the default state and users can sign in from any IP address.

## How to Allow a Specific System User to Bypass IP Restrictions

Some accounts — such as a remote administrator or a service account — may need to sign in from outside the allowed ranges. You can grant a per-user exception without changing the company-wide policy.

Go to **Company > System Users**, then create or edit a system user. In the **Authentication Overrides** section, enable the **Bypass IP Restriction** toggle and save the user.

* The toggle applies only to that system user. Other users and the company-wide IP restriction are not affected.
* The bypass takes effect from the user's next sign-in; it does not change an already active session.
* If your company has no IP restriction configured, the **Bypass IP Restriction** toggle is disabled and a hint ("IP restriction isn't configured yet. Set it up →") links you to the **IP Restrictions** page.

## FAQs

### Q: I want to restrict access to our corporate network. What happens if I'm working from home when I save the configuration?

A: Add your current IP address or range to the allowed list before saving — otherwise you will be locked out on your next sign-in. If you only want the corporate network allowed but still need to work remotely yourself, add your corporate range and enable **Bypass IP Restriction** on your own system user under **Company > System Users > Authentication Overrides**.

### Q: Our users connect from home or over mobile networks. Will IP Restrictions lock them out?

A: They can. IP Restrictions match the public IP address a user connects from, and many home, residential, and mobile connections use **dynamic** IP addresses that change over time. When a user's address changes, it no longer matches the allowed list and they are locked out on their next sign-in. Only allow IP ranges you know are static — such as a corporate office network or a VPN with a fixed egress IP. For users on dynamic connections, route them through a VPN with a static egress IP, allow the provider's full assigned range, or enable **Bypass IP Restriction** on those system users.

### Q: Are users who sign in with SSO or MFA exempt from IP Restrictions?

A: No. IP Restrictions apply to every user regardless of how they sign in — password, SSO, or MFA. SSO and MFA verify _who_ the user is, while IP Restrictions control _which network_ they connect from; these are separate, independent controls. A user signing in with SSO from outside the allowed ranges is still blocked. The only exception is a system user who has **Bypass IP Restriction** enabled. Likewise, turning IP Restrictions on or off does not change your SSO or MFA configuration.

### Q: Can I let one user sign in from outside the allowed ranges?

A: Yes. Edit that system user under **Company > System Users**, and enable the **Bypass IP Restriction** toggle in the **Authentication Overrides** section. The exception applies only to that user.

### Q: When do my changes take effect?

A: Saved IP ranges apply on the next sign-in attempt and on subsequent requests. A user who is already signed in and then moves to a network outside the allowed ranges loses access on their next request. A **Bypass IP Restriction** change applies from the affected user's next sign-in and does not interrupt their current active session.

### Q: What does a user see when they are blocked?

A: They receive a generic message indicating that their network is not authorized to access the platform. For security, the message does not reveal which IP ranges are allowed.

### Q: Can I add more than one IP range?

A: Yes. You can add several IP addresses or CIDR ranges, and you can use **Batch Import** to add multiple entries at once.
