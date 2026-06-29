---
description: >-
  Agentic AI is Keepnet's agent-based security awareness product. It coordinates
  AI agents to generate microlearning, design simulations, analyze behavior, and
  build reports — grounded in your content
---

# Agentic AI

**Agentic AI** is Keepnet's **agent-based product** for running security awareness at scale. It is **not a chatbot** or a chat-only tool. Instead, it coordinates multiple AI agents to drive a continuous improvement loop: **plan, create, deliver, measure, and improve** your security awareness program.

Agentic AI generates and optimizes **microlearning content** and **phishing simulation scenarios** using behavioral science and your organization's context. Outputs adapt to **roles and responsibilities**, **observed behavior signals** (such as reporting rates, simulation outcomes, and risk indicators), and **training performance**, so the right content reaches the right audience at the right time.

Agentic AI is also **multilingual**, enabling global teams to work and generate outputs in the languages they use.

## Overview

### What you can achieve with Agentic AI

Agentic AI helps security teams move from manual content production to a continuous improvement cycle (plan → create → deliver → measure → improve).

You can use it to:

* Reduce risk driven by human behavior by focusing on the behaviors that lead to incidents.
* Generate training content and phishing simulations in minutes instead of starting from scratch.
* Build reports and dashboards from your platform data in seconds.
* Improve consistency across departments, regions, and languages.
* Align outputs to internal standards by using your uploaded documents as reference material.

### Why teams adopt it

For IT and Security teams, the value is practical:

* Less manual work creating campaign content, training drafts, and reports.
* Faster response to evolving social engineering tactics — new scenarios and microlearning on demand.
* Governance-focused AI adoption with enterprise-grade controls.

## Licensing and access

### License requirement

Your company must have an **Agentic AI license** to use this product. If you do not have a license, contact [**sales@keepnetlabs.com**](mailto:sales@keepnetlabs.com).

### Who can use Agentic AI

By default, Agentic AI is available to **Reseller** and **Company Admin** users (when licensed). If your tenant uses **custom system roles**, your admin can allow or deny access based on role permissions.

## Getting started

### Open Agentic AI

1. Go to the **Dashboard**.
2. Click **Use Agentic AI** in the **top-right corner**.
3. The Agentic AI panel opens.

If you don't see Agentic AI, it is typically due to a missing license entitlement or role permissions.

### Navigate the panel

Open the menu (☰) to move between your work:

* **Your chats** — your conversation history, grouped by date, with **New chat** to start a fresh workstream.
* **Files** — documents that ground what Agentic AI generates.
* **Knowledge base** — search what your agents retrieve from those documents.
* **Memory** — what the assistant remembers about you and your organization.
* **Usage & cost** and **API keys** — consumption reporting and your own provider keys.

You can also expand the panel to full screen, switch the theme (System, Light, Dark), and search your chats.

### Start a new chat

Use **New chat** to keep workstreams separate — for example "Microlearning drafts", "Phishing scenarios for Finance", or "Behavior insights and actions". In the message box, type **@** to mention specific items and **/** to use skills, and use the attach options to add files to the conversation.

## The AI agents

Agentic AI works through two agents you can switch between at the top of the panel: the **Main Assistant** and the **Reporting Agent**.

### Main Assistant

The **Main Assistant** is your day-to-day agent for creating content and getting insight. It offers three core capabilities.

**Generate Microlearning** — create short, practical microlearning for a target audience, improving over time based on outcomes and signals.

* "Create microlearning about QR phishing for frontline staff. Keep it short and practical."
* "Rewrite this as a 5-bullet checklist."
* "Make this suitable for executives, formal tone, under 120 words."

**Analyze User Behavior** — turn behavior signals into actionable insight. Agentic AI works with **anonymized behavior attributes** such as training outcomes, simulation outcomes, reporting behavior, role, region, language, and culture.

* "Summarize the riskiest behaviors and recommend the top 3 actions for next month."
* "Which department needs the most attention and why? Provide 3 actions."
* "Draft a short message for managers to reinforce reporting suspicious emails."

**Design Phishing Scenario** — generate phishing simulation scenarios from your goals and constraints, supported by safety layers that reduce unsafe or inaccurate output.

* "Create a phishing scenario targeting finance users using invoice urgency. Include learning goals and safe wording."
* "Generate 3 variants with increasing difficulty."
* "Create a scenario aligned to our internal phishing policy, using uploaded documents as references."

### Reporting Agent

The **Reporting Agent** turns your platform data into charts and reports from a natural-language request. Choose a visualization type — including **funnel, line, bullet, doughnut, Sankey, KPI dashboard, sunburst, and bar** — and describe what you want to see. Quick starts include **Executive Briefing**, **Enrollment Status**, and **CISO Report**.

Example requests:

* "Show the phishing campaign funnel from delivered to opened to clicked to submitted as a funnel chart."
* "Show the phishing report rate trend over time as a line chart."
* "Show company-wide training completion status as a bullet chart."
* "Show key security metrics (active users, training completion, report rate, click rate) as a KPI dashboard."

## Ground Agentic AI in your content

Agentic AI produces better, more on-brand output when it is grounded in your own documents and context.

### Files

The **Files** area holds the documents that guide Agentic AI decisions — policies, procedures, and guidelines used when generating training, simulations, and reports.

* **Use in generation** controls whether a document is used as a source when Agentic AI generates content. Turn it on to include a document across the whole platform.
* **Source** shows where a document came from. Files attached in a chat are labelled **From chat** — they start with Use in generation off and are read-only inside that conversation until you enable them. Documents added to your library are labelled **Library**.
* **Upload** supports **PDF, XLSX, XLS, DOCX, and TXT** files, up to **50 MB** each. Use **Click to upload** or drag and drop.
* **Delete** a document from the **Actions** column.

Common documents to add: phishing simulation policy, security awareness policy, acceptable use policy, and internal writing or style guidelines.

### Knowledge base

The **Knowledge base** lets you ask a question and see exactly what your agents retrieve from your documents. Search runs over the documents that have **Use in generation** enabled in Files, and the results are the passages an agent grounds its answer in, shown with their source document. Use it to verify what context the agents are drawing on before you rely on an output.

### Memory

**Memory** is what the assistant remembers across conversations.

* **About you** — short personal facts you add (up to 280 characters each) so the assistant tailors its responses.
* **Organization** — shared context for everyone in your organization, including **Sector**, **Brand tone**, **Priority risks**, and **Notes**. Any team member can update it, and it shapes the tone and focus of generated content.

You can review what is saved at any time, or use **Forget everything** to erase it.

## Governance and controls

### Execution mode and safeguards

How and when Agentic AI is allowed to act is controlled by an **execution mode** (Approval-Gated or Autonomous) and **mandatory safeguards**, configured by an admin. See [Agentic AI Settings](https://claude.ai/cowork/company/company-settings/agentic-ai-settings.md) for how to enable Agentic AI and set these controls.

### Bring Your Own Key

By default, AI traffic runs on the platform key. With **Bring Your Own Key**, you can run your AI traffic on your **own provider key**, billed directly to your own account. Keys are stored in a secure secrets store and are never shown again after saving; when no key is set, traffic runs on the platform key as usual.

To add a key, open **API keys**, select your provider, paste the API key, use **Test** to validate it, then **Save key**. You can configure one key per provider, and saving a provider you already configured replaces its key.

### Usage and cost

The **Usage & cost** view shows token consumption and estimated cost for your company, broken down by **user, model, provider, and product**. You can filter by date range and **export to CSV**. It also separates spend made on the platform key from spend made on your own key, so you can track exactly where AI cost is coming from.

## Security, privacy, and governance

Agentic AI is designed for enterprise use with governance-focused controls. For detailed answers, review:

* **AI Governance & Data Security (PDF)** — governance, retention and deletion, audit, and lifecycle policies.
* **Security Architecture (PDF)** — end-to-end security architecture and control layers.
* **AI + Data Security FAQ (PDF)** — common security and privacy questions.

{% file src="../../.gitbook/assets/SECURITY ARCHITECTURE (1).pdf" %}

{% file src="../../.gitbook/assets/AI + DATA SECURITY FAQ (1).pdf" %}

{% file src="../../.gitbook/assets/AI GOVERNANCE & DATA SECURITY (1).pdf" %}

If you have additional questions, contact [**support@keepnetlabs.com**](mailto:support@keepnetlabs.com).

## FAQs

### Q: Do we need a license?

A: Yes. Your company must have an **Agentic AI license**. If you don't have one, contact [**sales@keepnetlabs.com**](mailto:sales@keepnetlabs.com).

### Q: Who can use Agentic AI?

A: By default, **Reseller** or **Company Admin** users can access it when licensed. If you use custom roles, your admin can allow or deny access through role permissions.

### Q: Does Agentic AI process personal data (PII)?

A: No. PII stays within your tenant boundary and is stripped before AI processing.

### Q: Does the AI provider store our data or train on it?

A: No. The AI service is configured for no retention and no training.

### Q: How do you reduce unsafe or inaccurate output?

A: Outputs go through layered controls — retrieval-grounded generation, filtering, and validation layers. Admins can also require human review by setting Approval-Gated Execution and mandatory safeguards in [Agentic AI Settings](https://claude.ai/cowork/company/company-settings/agentic-ai-settings.md).

### Q: Which files can we upload, and how large can they be?

A: You can upload **PDF, XLSX, XLS, DOCX, and TXT** files, up to **50 MB** each. Enable **Use in generation** on a document to let Agentic AI use it as a source across the platform, and delete files from the Files area at any time.

### Q: What should we add first?

A: Start with documents that define how you want content produced: phishing simulation policy, security awareness policy, acceptable use policy, and internal style or brand guidelines.

### Q: Can we use our own AI provider key?

A: Yes. Use **Bring Your Own Key** to run AI traffic on your own provider key, billed to your own account. When no key is set, traffic runs on the platform key.
