# Troubleshooting: Phishing Reporter Button Not Working — User Principal Name (UPN) and Email Address Mismatch

The Keepnet Phishing Reporter add-in may fail for **some users** when their **Microsoft Entra ID (formerly Azure AD) User Principal Name (UPN)** does not match their **primary email address** used in Outlook for sending and receiving email. This page describes the problem, how to identify it, and how to resolve it.

***

## Problem

When a user signs in to Outlook using their UPN (e.g. `user.login@company.com`) but their **primary email address** (the address used for the mailbox and SMTP) is different (e.g. `user.name@company.com`), the Phishing Reporter add-in cannot correctly associate the signed-in user with their mailbox identity. As a result, the add-in may not work for those users—for example, the Reporter button may not appear, may be greyed out, or may return an error when the user tries to report an email. Typically only a subset of users in the organization are affected.

***

## Symptoms

* The Phishing Reporter button does not appear, is greyed out, or does not respond for certain users.
* The user can open Outlook and use email normally, but reporting fails when they click the Reporter button.
* Other users in the same tenant, with UPN matching their primary email, can use the Reporter button without issues.

***

## Root cause

The Phishing Reporter add-in identifies the user based on their **primary email address** (e.g. the SMTP address of the mailbox). When the user signs in to Microsoft 365 or Outlook, they use their **User Principal Name (UPN)**. If the UPN and the primary email address are different, the add-in cannot match the signed-in identity to the correct user record in Entra ID, and the reporting flow fails.

***

## Resolution

### 1. Identify affected users

For users who report that the Phishing Reporter button does not work:

1. In **Microsoft Entra ID** (Azure AD), open the user’s profile.
2. Compare the **User principal name** with the user’s **primary email address** (e.g. **Mail** or **Primary SMTP** in Exchange/Outlook).
3. If they differ, that user is affected by this issue.

### 2. Update the User Principal Name

Update the user’s UPN in Microsoft Entra ID to match their primary email address:

1. In the [Microsoft 365 admin center](https://admin.microsoft.com/) or [Azure portal](https://portal.azure.com/), go to **Users** → **Active users** (or **Azure Active Directory** → **Users**).
2. Open the affected user.
3. Edit the **User principal name** so it matches the user’s **primary email address** (the address they use to send and receive email in Outlook).
4. Save the change.

For detailed steps and constraints (e.g. verified domains), see Microsoft’s documentation: [Add or update a user's profile information in Azure AD](https://learn.microsoft.com/en-us/entra/identity/enterprise-users/users-profile-edit).

### 3. Verify

After updating the UPN:

* Ask the user to sign out of Outlook/Microsoft 365 and sign in again.
* Have them open an email and use the Phishing Reporter button.
* Allow a short time for changes to propagate if the add-in does not work immediately.

***

## Best practice

To prevent this issue during deployment:

* **Ensure UPN matches primary email** for all users who will use the Phishing Reporter add-in. When provisioning new users or changing email addresses, align the User Principal Name with the primary SMTP/mail address.
* Consider this requirement as part of your **Phishing Reporter deployment checklist** so that identity consistency is verified before or shortly after rollout.

For installation and deployment steps, see [How to Deploy Microsoft Page View Phishing Reporter](microsoft-page-view-phishing-reporter.md) or [Microsoft Ribbon Phishing Reporter](microsoft-ribbon-phishing-reporter.md).
