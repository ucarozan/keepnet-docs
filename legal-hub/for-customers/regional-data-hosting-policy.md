# Regional Data Hosting Policy

**PLEASE READ THESE TERMS CAREFULLY**

**Last Modified:** 23 September 2026

Our Keepnet Regional Data Hosting Policy ("Policy") explains where Keepnet hosts Customer Data for the Subscription Service, how you select a hosting region, and the limited exceptions to regional hosting. This Policy forms part of the Keepnet Customer Terms of Service (the "Agreement"). Terms not defined here have the meaning given in the Agreement and the Data Processing Agreement ("DPA").

In the event of a conflict between this Policy and the Agreement about where Customer Data is primarily stored, this Policy will control. We may update this Policy by posting a revised version on this page and, if the changes are material, by email or in-product notice.

### 1. Available hosting regions

1.1 Keepnet offers the following standard hosting regions for Customer Data ("Standard Regions"):

| Region code | Location             | Cloud region                              |
| ----------- | -------------------- | ----------------------------------------- |
| **UK**      | United Kingdom       | Microsoft Azure UK South (London)         |
| **US**      | United States        | Microsoft Azure Central US (Iowa)         |
| **EU**      | European Union / EEA | Microsoft Azure West Europe (Netherlands) |
| **CA**      | Canada               | Microsoft Azure Canada Central (Toronto)  |
| **UAE**     | United Arab Emirates | Microsoft Azure UAE North (Dubai)         |
| **TR**      | Türkiye              | Amazon Web Services Istanbul Local Zone   |

1.2 The Location for your tenant is shown in your Order Form. Sub-Processors used for hosting and related processing are listed in Annex 3 of the [DPA](https://doc.keepnetlabs.com/legal-hub/for-customers/data-processing-agreement#annex-3-sub-processors).

### 2. How your Location is chosen

2.1 "**Location**" means the Standard Region (or Custom Region under section 3) where your Customer Data is primarily stored for the Subscription Service.

2.2 You select your Location when you purchase or configure the Subscription Service. The selected Location will appear on your Order Form. You may request a change of Location subject to a migration plan, applicable fees, and technical feasibility; a Location change may require a new Order or written amendment.

2.3 If your Order Form does not specify a Location, Keepnet will confirm a Standard Region with you in writing before production go-live.

2.4 Customer Data submitted or collected after Regional Data Hosting applies to your subscription will be stored in the Location, subject to the exclusions in section 5. Historical data created before a Location was enabled may remain in its prior region until migrated under an agreed plan.

### 3. Customers outside the Standard Regions and Custom Regions

3.1 If your organisation is located in a country that is not mapped one-to-one to a Standard Region, one of the following applies, as set out in your Order Form or a separate service agreement / statement of work:

**(a) Mapped Standard Region.** Keepnet and you agree that Customer Data will be hosted in one of the Standard Regions (typically **UK**, **EU**, or **US**), selected in the Order Form; or

**(b) Custom Region.** Where you require Customer Data to be hosted in a Microsoft Azure or Amazon Web Services region that is not listed as a Standard Region, and that region is supported by the relevant cloud provider for the Keepnet services you purchase, Keepnet may provide regional hosting in that Azure or Amazon Web Services region under a written service agreement (including scope, timeline, fees, and any service limitations). That Azure or Amazon Web Services region then becomes your Location for the purposes of this Policy ("Custom Region").

3.2 Custom Region deployments use the same Keepnet security programme and control set described in section 4 and in our [Platform Security](https://doc.keepnetlabs.com/resources/compliance) documentation, unless the service agreement expressly documents a deviation.

### 4. Security, high availability, and encryption (all Locations)

4.1 The same Keepnet security controls apply across Standard Regions and Custom Regions, including access control, logging, vulnerability management, and encryption in transit and at rest, as described in Annex 2 of the DPA and on our [Platform Security](https://doc.keepnetlabs.com/resources/compliance) page.

4.2 For the US, UK, EU, CA and UAE regions, Customer Data is hosted on Microsoft Azure. Keepnet designs for high availability within the Location, using zone-redundant deployment patterns, and encrypts Customer Data at rest and in transit.

4.3 For the TR region, Customer Data is hosted on Amazon Web Services. Equivalent high availability, encryption at rest and encryption in transit controls are applied within the Location.

4.4 Backups and disaster recovery for Customer Data are maintained within the Location.

### 5. Exclusions (processing that may occur outside the Location)

5.1 Keepnet, its Affiliates, and Sub-Processors may access or process Customer Data outside the Location only as needed for the following exclusions. These exclusions do not change your primary storage Location stated on the Order Form.

**(i) Customer support and product engineering.** Keepnet personnel and support Sub-Processors may access your account and Customer Data to answer support requests, fix defects, or deliver agreed professional services.

**(ii) Security and abuse prevention.** Keepnet may access Customer Data from other office locations to investigate or remediate security incidents, fraud, or product abuse.

**(iii) Integrations and optional features.** If you enable an integration, engine, or feature that relies on a Sub-Processor outside the Location (see DPA Annex 3), that Sub-Processor may process relevant Customer Data outside the Location. You control whether to enable those features.

**(iv) User access.** Your Users may sign in from outside the Location; session access then occurs from the User’s network location.

**(v) Usage Data.** Operational telemetry about how the Subscription Service is used (as described in the Agreement) may be processed in Keepnet’s global operations environments, which may include the United States.

**(vi) Content delivery and edge security.** CDN, DNS, WAF, bot management, and similar edge services (for example Cloudflare) may cache or inspect traffic at edge locations worldwide to deliver and protect the service. See https://www.cloudflare.com/network/ for Cloudflare’s network map.

**(vii) AI-assisted features.** By default, AI-assisted features run OpenAI models through Microsoft Azure OpenAI Service (Azure West Europe and East US) and Cloudflare Workers AI, as described on our [AI Transparency](https://doc.keepnetlabs.com/legal-hub/for-customers/ai-transparency) page. If you configure your own OpenAI API key (Bring Your Own Key), requests are routed through our AI gateway to OpenAI under your own agreement with OpenAI, and may be processed outside the Location.

**(viii) Message delivery.** By default, simulation and notification emails are delivered through Keepnet's email delivery Sub-Processor listed in DPA Annex 3, which may process message content and recipient details outside the Location. You may configure your own email delivery service and set it as the default, in which case your provider's terms govern that processing. SMS and call simulations are delivered through the SMS and calling Sub-Processors listed in DPA Annex 3, which may process message content and recipient details outside the Location. Voice generation for vishing simulations is performed by the voice generation Sub-Processor listed in DPA Annex 3.

**(ix) Application error monitoring.** Error and performance diagnostics are processed by our error monitoring Sub-Processor in the United States. Personal Data is not sent by default, but limited Personal Data may be included incidentally in error messages.

5.2 The authoritative list of Sub-Processors is Annex 3 of the [DPA](https://doc.keepnetlabs.com/legal-hub/for-customers/data-processing-agreement#annex-3-sub-processors). This Policy does not maintain a second competing list.

### 6. Instructions for the DPA

For the purposes of the DPA, your selection of a Location (Standard Region or Custom Region) under this Policy and your Order Form constitutes your documented Instructions regarding the primary storage location of Customer Data, subject to section 5.

### 7. No warranty of regulatory “adequacy” by geography alone

Regional Data Hosting helps you meet contractual data-residency preferences. It does not by itself guarantee that the Location will satisfy every law, sector rule, or internal policy that applies to you. You remain responsible for determining whether the selected Location meets your compliance requirements.

### 8. Contact

Questions about this Policy: privacy@keepnetlabs.com or [Keepnet Support](https://doc.keepnetlabs.com/resources/keepnet-support-help-desk).
