---
description: >-
  Agentic AI is Keepnet’s agent-based security awareness product that generates
  microlearning and phishing simulation scenarios, adapts to roles and behavior
  signals, and supports multilingual outputs w
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
---

# Agentic AI

**Agentic AI** is Keepnet’s **agent-based product** for running security awareness at scale. It’s **not a chatbot** or a chat-only tool. Instead, it coordinates multiple AI agents to drive a continuous improvement loop: **plan, create, deliver, measure, and improve** your security awareness program.

**Agentic AI** generates and optimizes **microlearning content** and **phishing simulation scenarios** using behavioral science and your organization’s context. Outputs adapt to **roles and responsibilities**, **observed behavior signals** (such as reporting rates, simulation outcomes, and risk indicators), and **training performance**, so the right content reaches the right audience at the right time.

**Agentic AI** is also **multilingual**, enabling global teams to work and generate outputs in the languages they use.

## Overview

### What you can achieve with Agentic AI

Agentic AI helps security teams move from manual content production to a continuous improvement cycle (plan → create → deliver → measure → improve).

You can use it to:

* Reduce risk driven by human behavior by focusing on the behaviors that lead to incidents.
* Generate training content and phishing simulations in minutes instead of starting from scratch.
* Improve consistency across departments, regions, and languages.
* Align outputs to internal standards by using uploaded PDFs as reference materials.

### Why IT teams typically adopt it

For IT and Security teams, the value is practical:

* Less manual work creating campaign content and training drafts
* Faster response to evolving social engineering tactics (new scenarios and microlearning on demand)
* Governance-focused AI adoption with enterprise-grade controls

## Licensing and Access

### License requirement (required)

Your company must have an **Agentic AI license** to use this product. If you do not have a license, contact: [**sales@keepnetlabs.com**](mailto:sales@keepnetlabs.com)

### Who can see and use Agentic AI

By default, Agentic AI is available to:

* **Reseller**
* **Company Admin** (when licensed)

If your tenant uses **custom system roles**, your admin can allow or deny access based on your role permissions.

## Getting Started

### Open Agentic AI from the Dashboard

1. Go to **Dashboard**.
2. Click **Agentic AI** in the **top-right corner**.
3. The Agentic AI panel opens.

{% hint style="info" %}
If you don’t see Agentic AI, it’s typically due to missing license entitlement or role permissions.
{% endhint %}

### Panel controls

* **Menu (☰)**: access chats and Files
* **Search (🔍)**: quick actions like New chat and theme selection (Light/Dark/System)
* **Expand (▢)**: maximize the panel to full screen
* **Close (✕)**: close the panel

### Create a new chat

Use **New chat** to keep workstreams separate, for example:

* “Microlearning drafts”
* “Phishing scenarios for Finance”
* “Behavior insights and actions”

## Core Capabilities

### Generate Microlearning

Create short, practical microlearning content for your target audience. This supports behavior change by improving content over time based on outcomes and signals.

**Example prompts**

* “Create microlearning about QR phishing for frontline staff. Keep it short and practical.”
* “Rewrite this as a 5-bullet checklist.”
* “Make this suitable for executives, formal tone, under 120 words.”

### Analyze User Behavior

Turn behavior signals into actionable insights. Agentic AI is designed to work with **anonymized behavior attributes** such as training outcomes, simulation outcomes, reporting behavior, role, region, language, and culture.

**Example prompts**

* “Summarize the riskiest behaviors and recommend the top 3 actions for next month.”
* “Which department needs the most attention and why? Provide 3 actions.”
* “Draft a short message for managers to reinforce reporting suspicious emails.”

### Design Phishing Scenario

Generate phishing simulation scenarios based on your goals and constraints, supported by safety layers designed to reduce unsafe or inaccurate output.

**Example prompts**

* “Create a phishing scenario targeting finance users using invoice urgency. Include learning goals and safe wording.”
* “Generate 3 variants with increasing difficulty.”
* “Create a scenario aligned to our internal phishing policy (use uploaded PDFs as references).”

## Upload Company Documents (PDFs)

### Why upload documents?

The **Files** area lets you upload company PDFs, so Agentic AI can better align outputs with your:

* internal policies and standards,
* approved tone and terminology,
* security awareness requirements.

Common PDFs to upload:

* phishing simulation policy
* security awareness policy
* acceptable use policy
* internal writing or style guidelines

### Upload rules

* PDF only
* Maximum file size: 500 MB

### Delete uploaded documents

You can delete uploaded PDFs from the **Files** page using the **Delete** action.

## Security, Privacy, and Governance

Agentic AI is designed for enterprise use with governance-focused controls. For detailed answers, please review:

* **AI Governance & Data Security (PDF)** – governance, retention/deletion, audit, and lifecycle policies
* **Security Architecture (PDF)** – end-to-end security architecture and control layers
* **AI + Data Security FAQ (PDF)** – common security and privacy questions

{% file src="../../.gitbook/assets/SECURITY ARCHITECTURE.pdf" %}

{% file src="../../.gitbook/assets/AI + DATA SECURITY FAQ.pdf" %}

{% file src="../../.gitbook/assets/AI GOVERNANCE & DATA SECURITY.pdf" %}

If you have additional questions, contact [**support@keepnetlabs.com**](mailto:support@keepnetlabs.com).

## FAQ

### Q: Do we need a license?

A: Yes. Your company must have an **Agentic AI license**. If you don’t have one, contact [**sales@keepnetlabs.com**](mailto:sales@keepnetlabs.com).

### Q: Who can use Agentic AI?

A: By default, **Reseller** or **Company Admin** users can access it (when licensed). If you use custom roles, your admin can allow or deny access through role permissions.

### Q: Does Agentic AI process personal data (PII)?

A: No. PII stays within your tenant boundary and is stripped before AI processing.

### Q: Where is our data stored?

A: Customer data remains in your selected Azure region.

### Q: Does OpenAI store our data or train on it?

A: No. Azure OpenAI is configured for no retention and no training.

### Q: How do you reduce unsafe or inaccurate output?

A: Outputs go through layered controls (RAG + filtering + validation layers + optional human approval).

### Q: Can we upload our company documents?

A: Yes. You can upload PDFs (max 500 MB) to help align outputs to your internal standards. You can delete uploaded files from the Files area.

### Q: What should we upload first?

A: Start with PDFs that define how you want content produced:

* phishing simulation policy
* security awareness policy
* acceptable use policy
* internal style or brand guidelines
