# How to Configure SAML on Okta

This document explains the steps of integrating the Okta identity provider with the platform over SAML to log in to the platform by using your Okta account.

## **Okta Settings**

Please follow the steps below to set up SAML settings correctly on the Okta side.

* Log in to Okta with a privileged account that can create applications.
* Go to the **Applications > Applications** menu from the main dashboard.
* Click on **Create App Integration,** select **SAML 2.0**, and then click the **Next** button.
* Enter the **App** **Name** and click **Next**.
* Enter the following information and click **Next**.
  * **Single sign-on URL:** [https://api.keepnetlabs.com/api/saml/assertion](https://api.keepnetlabs.com/api/saml/assertion)
  * **Audience URI (SP Entity ID):** KeepnetLabs
  * **Name ID format:** EmailAddress
  * **Application username:** Email
* Select the **App Type** as **Internal** **App** and click **Finish**.
* Click the **View SAML setup instructions** button on the right side of the opened page.
* Copy the following information to your notepad and download the certificate.
  * **Identity Provider Single Sign-On URL:**
  * **Identity Provider Issuer:**
  * **X.509 Certificate:**
* Please go to your **Application** **settings** and then the **Assignments** menu. Add the users here who will log in to the Keepnet platform over SAML.&#x20;

That's it for Okta settings. Now, we need to do the rest of the SAML settings on the Keepnet platform.

## **Platform Settings**

Log in to the platform with the privileged user who can access the SAML settings, and then follow up on the document here to fill out the required fields.

* Log in to the platform with a privileged user who can access SAML settings.
* From the left menu, under **Company** heading, click on **Company Settings > SAML Settings**.
* Click on the **“Create your first SAML configuration”** button in the middle of the page.
* Then, fill in the following details when the **"New SAML Configuration"** field is opened.
  * **SAML Name:** Enter a name for the SAML setting.
  * **Allowed Domains:** Enter the domain name that the admin will be using to log in to the platform. The platform will recognize the user with the domain and redirect to the SSO authentication.
  * **Issuer URL of the IdP:** Enter the **"Identity Provider Issuer"** address that you noted from the Okta SAML instructions page.
  * **IdP SSO URL:** Enter the **"Identity Provider Single Sign-On URL"** address that you noted from the Okta SAML instructions page.
  * **Upload Certificate:** Upload the Okta SAML certificate.
  * **Default Role:** Assing a default role to the users who will log in to the platform. If this option is not enabled, the user must have the **‘spRole’** attribute configured in the Okta with the correct system role name to log in to the platform.

## **How to Test SAML Configuration**

Check whether the configuration works or not by following the steps below.

* Make sure the system admin who will log in to the platform over SAML is created in the platform under the **Company > System Users** page.
* Go to the platform login page.
* Enter the email address. The email **domain** must be the one that is defined in the SAML settings.
* The platform will redirect you to the Okta SSO page to authenticate.

You have now successfully logged in to the platform.
