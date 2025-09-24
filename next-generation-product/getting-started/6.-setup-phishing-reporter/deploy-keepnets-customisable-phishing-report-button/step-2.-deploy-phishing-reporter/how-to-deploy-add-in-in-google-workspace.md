# How to Deploy Add-In in Google Workspace

## Deployment Steps

To deploy the Phishing Reporter add-in to users in Google Workspace, follow these steps.

### Create Script

* Go to[ script.google.com](http://script.google.com) and click on the **New Project** button.
* The new script file that is opened is saved with a project name.
* In the **Code.gs**, paste the script code provided by the platform and save it.
* Go to the settings icon and click **Project Settings**.
* In the **project settings**, click: **Show "appsscript.json" manifest file in editor.**
* Save the **appscript.json** file. Copy and save the manifest code.

### Create Project

* Go to [console.cloud.google.com](https://console.cloud.google.com/) and create **a new project**.&#x20;
* Name your project and select the location. Then click on **Create** to start your project.&#x20;
* Go to the **API & Services** page. Open the **OAuth content screen** page from the left menu and select your project.
* Please make sure the **User type** option selected is **Internal**.
* Click **Create**

### OAuth Content Screen Configuration

* On the **OAuth content screen**, fill in the **App Name, User Support Email, App Logo** and **Developers Contact Email Address.** Then click **Save and Continue.**
* &#x20;After that, click the **Save and Continue** button again on the **Scope** screen without making any changes. Then click **Back to Dashboard.**
* Go to **API & Services,** open the **Library** page to search **Gmail API,** and then **enable it**.
* Go to **Project Settings** and copy the **Project Number.**

### Change the Project Number of Script

* Go to **Project** **Settings,** find the "**Cloud Platform Project"** title, and click on the **Change** **Project** button on [script.google.com.](https://script.google.com/)
* Paste the **Project Number** in the designated field and click **Set** **Project**.&#x20;
* Confirm the project change.

The change is enabled once the project change is confirmed.

### Testing the Add-in

If you don't want to test the add-in in your Gmail account, please go to the "**Enable Google Workspace Marketplace SDK"** part to distribute the add-in to the organization.

If you want to test and see the add-in functionality, logos, add-in name, description, and more information, you can deploy the add-in to your Gmail account for test purposes and remove it anytime.

* Go to [script.google.com](https://script.google.com/)
* Select the add-in project.
* Click on **Deploy** **>Test Deployments > Install** butto&#x6E;**.**
* Click **Done**.

The add-in will appear on your Gmail account shortly.

### Enable Google Workspace Marketplace SDK

* From the **Library** page, search for the **Google Workspace Marketplace SDK** and click on it.
* Click the **Enable** button and activate **Google Workspace Marketplace SDK**.
* Go back to [script.google.com](https://script.google.com/) and click on the **Deploy** **> New Deployment** button.
* Enter information in the **Description** field, click the **Deploy** button, and copy the **Deployment ID**.
* Go back to the Console Cloud. Go to the **API & Services** page, find **“Google Workspace Marketplace SDK”** and click on it.
* Go to the **App Configuration** tab and enable the **Google Workspace add-on** option and check **Deploy using Apps Script Deployment ID**.
* Then paste the **Deployment ID** to the deployment field on the page and then fill in the following fields.
  * **Developer Name** with **Keepnet**.&#x20;
  * Fill in the **Developer Website URL** with **https://keepnetlabs.com**
  * Fill in the **Developer Email** with **support@keepnetlabs.com**.
* Before saving, do not forget to select the **Private** option and then click **Save**.
* Go to the **Google Workspace Marketplace SDK** page and click the **Manage** button to see the **Store Listing** menu.
  * Select the **Category** as **"Web Project".**
  * Select the **Language** as **"English".**
  * Upload your company logos. If you prefer, you can use the default logos below.
* Fill in the **Terms of Service URL**, **Private Policy URL**, and **Support URL** with  **https://keepnetlabs.com** for the add-in.
* Under **Distribution**, select the **Region** that you will be deploying the add-in to and click **Publish**.

{% file src="../../../../../.gitbook/assets/Add-In Logos.zip" %}
Default Phishing Reporter Add-In Logos
{% endfile %}

### Deploy Add-in

Please follow up the following steps to deploy the add-in to your target users.&#x20;

* To deploy the add-in, go to [mail.google.com](https://mail.google.com/) and click on the **Google Apps** icon in the top right-hand corner of the screen.&#x20;
* Scroll down to [**More from Google Workspace Marketplace**](https://workspace.google.com/u/1/marketplace) and click on it.&#x20;
* Click **Internal Apps** and find the add-in
* Click the **Admin Install** button to start the deployment process.&#x20;
* Click **Continue** to start the distribution of the extension.&#x20;
* Accept the required permissions to complete the deployment.&#x20;

{% hint style="warning" %}
It may take up to 24 hours for this app to be installed for your entire Google Workspace domain or organizational unit.
{% endhint %}

✅ **You have now deployed the Phishing Reporter.**&#x20;

**Next step is to** [**Setup Incident Responder**](../../../7.-incident-responder-setup/) **(only for customers who have purchased the Incident Responder or SOC package)**
