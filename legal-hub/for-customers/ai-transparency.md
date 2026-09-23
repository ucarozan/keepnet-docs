---
description: >-
  How Keepnet uses AI in its products, which providers process your data, and
  our commitment not to train models on Customer Data.
---

# AI Transparency

### Our commitment

We do not use Customer Data to train artificial intelligence or machine learning models, whether our own or those of any third party. Every Sub-Processor we engage is contractually prohibited from doing so. The full list is in Annex 3 of our Data Processing Agreement.

### How AI-assisted features work

The input you provide is sent to a model provider only to generate the output you requested. The output is returned to you. Neither the input nor the output is used to train or improve any model.

Every AI request from the Subscription Service is routed through Cloudflare AI Gateway, which we operate. The gateway authenticates each request and forwards it to the provider that serves that feature. The application never calls a model provider directly.

Requests are served in one of three ways:

* Through Azure OpenAI Service, which runs OpenAI models inside our Microsoft Azure tenant. Data processed this way is not shared with OpenAI.
* Through Cloudflare Workers AI, which runs open-weight models on Cloudflare infrastructure. Data processed this way is not shared with the developers of those models.

### Where AI is used

All AI-assisted features in the Subscription Service are delivered through AI Ally.

| Feature                   | What it does                                                   | What data is sent                                                   | Provider                   | Region                      |
| ------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------- | -------------------------- | --------------------------- |
| Training content          | Generates awareness training content from your prompt          | Your prompt, selected language and tone                             | Azure OpenAI Service       | Azure: West-Europe, East-US |
| Phishing email simulation | Generates simulation emails and landing pages from your prompt | Your prompt, selected language, tone and template settings          | Azure OpenAI Service       | Azure: West-Europe, East-US |
| Voice phishing simulation | Generates the synthetic voice used in vishing simulations      | The script you provide and the voice settings you select            | ElevenLabs                 | Europe, US                  |
| Email analysis            | Analyses a reported email and returns a verdict and summary    | The reported email in full, including headers, body and attachments | Azure OpenAI Service       | Azure: West-Europe, East-US |
| Customer support          | Helps our team respond to and resolve your support requests    | Your name, contact details and the content of your request          | Intercom, Anthropic Claude | US                          |

Email analysis processes the reported email as it was received, including any attachments, because the attachment is often the part that carries the threat. If your organisation does not want attachments analysed, contact us and we will go through the options available for your account.

### Providers

| Provider                         | Role                                                          | Trains on your data |
| -------------------------------- | ------------------------------------------------------------- | ------------------- |
| Cloudflare (AI Gateway)          | Routes and authenticates every AI request we make             | No                  |
| Cloudflare (Workers AI)          | Runs open-weight models on Cloudflare infrastructure          | No                  |
| OpenAI                           | Model provider, reached through the gateway                   | No                  |
| Microsoft (Azure OpenAI Service) | Runs OpenAI models inside our Azure tenant                    | No                  |
| ElevenLabs                       | Voice generation for vishing simulations                      | No                  |
| Intercom                         | Support platform used to receive and respond to your requests | No                  |
| Anthropic                        | AI assistant used to help our team resolve support requests   | No                  |

### Retention

We do not retain your input or output for model development.

Providers apply their own limited retention for safety and abuse monitoring. OpenAI and Azure OpenAI Service retain abuse monitoring logs for up to 30 days under access controls. These logs are not used to train models.

### Human oversight and accuracy

Output may not be accurate or complete. Review Output before you use or share it. You remain responsible for the content you send to your users.

### Your controls

AI Ally can be turned on or off for your company in Company Settings. Email template generation and landing page template generation can be enabled or disabled separately.

### Data residency

Where you have selected a hosting region under our Regional Data Hosting Policy, AI processing follows that selection for the providers that support it. The Region column above shows where each provider processes data. Some providers operate only in the United States, and those requests are processed there regardless of your selected region.

### Governance

Our AI management system is certified to ISO/IEC 42001:2023. We also hold ISO 27001, ISO 27017 and ISO 27018 certifications.

### Sub-processors and changes

Our current Sub-Processors, including the regions in which they process Customer Data, are listed in Annex 3 of our Data Processing Agreement. We notify customers of new Sub-Processors before they begin processing.

### Questions

Contact privacy@keepnetlabs.com.
