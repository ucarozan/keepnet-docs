# SCIM Settings

The SCIM (system for cross-domain identity management) is a standard for automating the exchange of user identity information between identity platforms. The platform supports SCIM integration to automate and synchronize target user information from the identity providers to the platform.

## Shortcuts

* [Getting Started](getting-started-with-scim.md)
* [How to integrate Azure AD SCIM](azure-ad-scim-integration.md)
* [How to integrate Okta SCIM](okta-scim-integration.md)
* [How to integrate Onelogin SCIM](onelogin-scim-integration.md)
* [How to integrate Jumpcloud SCIM](jumpcloud-scim-integration.md)

## FAQ

### Q: Can I integrate not listed Identity Provider over SCIM on the platform?

A: Yes, by getting help from the documents that the identity provider provides, the SCIM settings can be configured correctly on the identity provider to synchronize users to the platform.

### Q: Where can I find the SCIM endpoint URL address?

A: The SCIM endpoint URL of the platform is https://scim-api.keepnetlabs.com/scim

### Q: Under what conditions are target users synced via SCIM set to an "Inactive" status or deleted permanently?

A: When an admin removes a user from the SCIM application, the user will be set to "Inactive" on the platform. However, if an admin permanently deletes the user from their identity provider, the user will be deleted from the platform as well.
