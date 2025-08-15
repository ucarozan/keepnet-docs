# Whitelisting in Other Security Solutions

## Whitelisting in Content Filtering (Proxy)

### Whitelisting Platform Addresses

Platform administrators must whitelist **dash.keepnetlabs.com** and **api.keepnetlabs.com** on content filtering proxy solutions to use the products successfully.

{% hint style="warning" %}
If you have completed white labeling, it is sufficient to whitelist the platform domain name that will be used to access to platform and api.keepnetlabs.com address.
{% endhint %}

### Whitelisting Phishing Simulation Domain Addresses

The domain names of the [Phishing Simulator](https://keepnetlabs.com/products/phishing-simulator) should be whitelisted with content filtering (proxy) solutions to make sure that the domains can be accessed by the target users. If the target users can't access the phishing link in the network, the simulated phishing campaign might not be successful.

You can find the phishing simulation domains by logging into the platform and then go to **Phishing Simulator > Settings > Domains** page.

### Whitelisting in Data Loss Prevention (DLP)

System administrators may upload the target users' first name, last name, email address, department, or such other information to the platform; however, because [DLP](https://digitalguardian.com/blog/what-data-loss-prevention-dlp-definition-data-loss-prevention) can be very sensitive, the platform domain information should be whitelisted to ensure DLP allows you to upload these pieces of information to the platform.

