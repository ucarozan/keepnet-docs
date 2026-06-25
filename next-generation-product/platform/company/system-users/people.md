# People

This section describes how to create and manage authorized accounts with various permission levels, called **System Users**, who manage and perform activities on the platform on your company profile. From the **Company > System Users** page you can create new system users, edit their details and sign-in policies, and remove access when it is no longer needed.

## How to Create a System User?

After logging into the platform, go to the **System Users** page by following **Company > System Users** on the left menu. The system users currently registered are listed on this page.

{% hint style="info" %}
You need to be an authorized admin to create a system user in this menu.
{% endhint %}

Click the **+ New** button in the upper right corner and fill in the following fields.

<table><thead><tr><th width="152.51953125">Field</th><th>Description</th></tr></thead><tbody><tr><td>First Name</td><td>System user's First Name</td></tr><tr><td>Last Name</td><td>System user's Last Name</td></tr><tr><td>Email Address</td><td>System user's Email Address</td></tr><tr><td>Phone Number</td><td>System user's Phone Number. This information is required for MFA &#x26; SMS purposes.</td></tr><tr><td>Status</td><td>Validity of the system user: active or not. If not active, the user cannot log in to the platform.</td></tr><tr><td>Role</td><td>System user's permission level. You can create custom roles for your users and limit their access to various products on the platform. See <a href="user-roles.md">User Roles</a> for more information about the usage of the Roles feature.</td></tr></tbody></table>

Below these fields, the form includes an **Authentication Overrides** section, which lets you grant per-user exceptions to your sign-in policies. This section appears in both the Create and Edit forms and is described in the next section.

After you save the new system user, they receive an email to create a password. The user can then set a password and log in to the platform by clicking the link in that email.

## Authentication Overrides

The **Authentication Overrides** section — available when you create or edit a system user — lets you grant that individual user an exception to your company's sign-in policies, without changing the company-wide configuration. This is useful for cases such as service accounts, legacy integrations, migration periods, or a specific administrator who needs an exception.

The section header reflects the current state: it shows **No overrides active** when none are enabled, or a label such as **SSO bypassed**, **MFA bypassed**, or **SSO + MFA bypassed** when one or more overrides are on.

The available overrides are:

<table><thead><tr><th width="189.3359375">Override</th><th>Description</th></tr></thead><tbody><tr><td>Bypass SSO Redirect</td><td>Lets the user sign in directly with a password, skipping the domain's SSO policy. This toggle is disabled when no SSO configuration exists for the domain.</td></tr><tr><td>Bypass MFA</td><td>Lets the user sign in without a one-time code or authenticator app.</td></tr><tr><td>Bypass IP Restriction</td><td>Lets the user sign in from outside the company's allowed IP ranges. This toggle is disabled when no IP restriction is configured for the company. See <a href="../company-settings/ip-restrictions.md">IP Restrictions</a>.</td></tr></tbody></table>

How the overrides behave:

* Each toggle is independent and applies only to this user. Other users and the company-wide SSO, MFA, and IP Restriction policies are not affected.
* A toggle is disabled when its prerequisite is not configured. In that case a hint explains why and links you to the relevant settings page — for example, the **Bypass IP Restriction** hint shows "IP restriction isn't configured yet. Set it up →".
* Overrides take effect from the user's next sign-in. They do not change a session that is already active.
* On the Create form for a new user, all overrides are off by default.

{% hint style="info" %}
Each override reduces a security control for the affected user. Grant overrides only when necessary — such as for a service account that cannot complete SSO or MFA — and review them periodically.
{% endhint %}

## How to Edit a System User?

System user information can be edited at any time. Go to the **Company > System Users** page on the left menu, find the user, then click the **pencil icon ✎** in the **Actions** column to open the edit form.&#x20;

From here you can update the user's details, change their role, and adjust their **Authentication Overrides** (described above). Changes to overrides take effect from the user's next sign-in.

## How to Delete a System User?

System user accounts can be deleted at any time to cancel access to the platform. Go to the **Company > System Users** page on the left menu, find the relevant user, and click the **Delete** button in the **Actions** column. Then click **Delete** again to confirm.

{% hint style="danger" %}
This action cannot be undone. The deleted user will no longer be able to log in to the platform, and the processes related to the user will be disabled. It is wise to double-check the user information before deleting.
{% endhint %}

## FAQs

### Q: Why can't I set permissions for a new system user when adding them into Keepnet?

A: First create a custom role with the permissions you want, then assign the system user to that role. You can create a role by going to **Company > System Users > Roles > New +**.

### Q: I've accidentally deleted a system user. Can I create it again?

A: Yes. You can recreate the user by following the steps in the [How to Create a System User?](https://claude.ai/cowork/local_6d826663-48e6-4a3d-b8d0-b76e31107f14#how-to-create-a-system-user) section.

### Q: How can I access the activities of a system user I created on the platform?

A: You can review all the actions a system admin performed on the platform from the **Audit Log** field under **Company** on the left menu.

### Q: How can I edit a system user's permissions?

A: You can review and customize an admin's permissions on the Role Management page. See [User Roles](user-roles.md) for the relevant document.

### Q: Why is the Bypass SSO Redirect or Bypass IP Restriction toggle greyed out?

A: A toggle is disabled when its prerequisite is not configured. **Bypass SSO Redirect** is disabled until SSO is configured for the domain, and **Bypass IP Restriction** is disabled until at least one allowed IP range is configured under **Company Settings > IP Restrictions**. The disabled toggle shows a hint with a link to set up the missing configuration.

### Q: If I enable Bypass MFA for one user, does MFA turn off for everyone?

A: No. Authentication Overrides apply only to the individual system user you are editing. Your company-wide SSO, MFA, and IP Restriction policies are unchanged.

### Q: When do Authentication Overrides take effect?

A: Overrides apply from the affected user's next sign-in. They do not interrupt or change a session that is already active.
