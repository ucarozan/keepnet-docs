# Add users via SCIM

By setting up a SCIM integration, you can ensure all new employees are added in auto-enrolled training and phishing simulations. There are 2 key steps to setting up your SCIM integration:

1. **Get your secret token**
2. **Complete setup in your AD portal**

### First, get your secret token <a href="#first-get-your-secret-token" id="first-get-your-secret-token"></a>

#### **Step 1: Create a new SCIM Setting**

Go to **Company > Company Settings > SCIM Settings** page. Click the **‘+New’** button to create a SCIM setting.

<figure><img src="https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FlKFxOYqYqSykikkXpwjG%2Fuploads%2FcfJ6v1frE5N19HfDr8iL%2Fscim%20step%201.gif?alt=media&#x26;token=bd96034a-3496-4639-824a-0965b5c22e5b" alt=""><figcaption></figcaption></figure>

#### **Step 2: Map a Field (Optional)**

Some of our customers add custom fields to add information in addition to email, first name, last name, department and phone number. If you would like to set this up click here, otherwise you can skip.

#### **Step 3: Group Settings**

**Group Name:** If you would like to synch all users to one target group please select the group here. You can leave empty and group by department instead.

**Grouping Criteria:** You must select one of these

* **Select a SCIM field to determine user groups:** Group users by department (or a custom mapped field such as location). This will group all users by the Entra ID property "Department"
* **Synchronise groups with identity management platform:** Groups are mirrored directly from Entra ID. If you select a group called "Keepnet UK" on Entra ID, this group will be named exactly the same in Keepnet and contain the exact same users.

<figure><img src="../../../../.gitbook/assets/Screenshot 2025-10-09 at 16.54.19.png" alt=""><figcaption></figcaption></figure>

#### **Step 4: Copy your Secret Token**

Click **Save** and make sure to **copy the unique token information.**

<figure><img src="https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FlKFxOYqYqSykikkXpwjG%2Fuploads%2FrEvHb8iFGYuuosH4OohG%2FScreenshot%202024-03-08%20at%2015.23.13.png?alt=media&#x26;token=0d9e56cd-210b-4bb5-91bf-fc59c77baa8a" alt=""><figcaption></figcaption></figure>

✅ **You can now use the following shortcuts to complete the final settings on your identity provider platform.**

### Shortcuts <a href="#shortcuts" id="shortcuts"></a>

* ​[How to integrate Azure AD SCIM​](scim-setup-in-azure-ad.md)
* ​[How to integrate Okta SCIM](scim-setup-in-okta.md)​
* [​How to integrate Onelogin SCIM​](scim-setup-in-onelogin.md)
* ​[How to integrate Jumpcloud SCIM](scim-setup-in-jumpcloud.md)​
