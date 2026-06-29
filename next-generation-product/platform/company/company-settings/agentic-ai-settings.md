---
description: >-
  Agentic AI Settings let admins control how and when AI can act across the
  organization — enabling Agentic AI, choosing an execution mode, and applying
  mandatory safeguards.
---

# Agentic AI Settings

[**Agentic AI** ](../../agentic-ai.md)**Settings** is where you control **how and when AI can act** across your organization. From a single tab you enable Agentic AI, decide whether AI actions run automatically or wait for approval, and apply the safeguards that keep AI behavior ethical, compliant, and predictable.

These settings govern what Keepnet's AI agents — the **Main Assistant** and the **Reporting Agent** — are allowed to do on your behalf, such as creating phishing simulations, enrolling users in training, and generating reports.

To open it, go to **Company** > **Company Settings** > **Agentic AI Settings**.

## Overview

This tab brings three controls together:

* **Enable Agentic AI** — the master switch that activates AI actions for your organization.
* **Execution Mode** — whether AI actions run automatically or require approval first.
* **Safeguards** — mandatory boundaries that govern how AI behaves.

Together they determine exactly what AI is allowed to do on your behalf.

## Access requirements

* Your company must have an **Agentic AI license**. Without a license, the controls on this tab are unavailable — contact [**sales@keepnetlabs.com**](mailto:sales@keepnetlabs.com).
* By default, **Reseller** and **Company Admin** users can manage these settings. If your tenant uses custom system roles, access depends on the role's permissions.

## Configure Agentic AI

Set up Agentic AI in four steps: enable it, choose an execution mode, configure safeguards, and save.

### 1. Enable Agentic AI

Turn on the **Enable Agentic AI** toggle to activate Agentic AI for your organization. Once enabled, every AI action is governed by the execution mode and safeguards configured below. When the toggle is off, Agentic AI does not act, and the controls below do not apply.

### 2. Set the Execution Mode

The execution mode decides whether AI actions require approval before they run. Choose the option that matches how much autonomy you want to give AI.

1. **Approval-Gated Execution** — AI recommends actions and executes them **only after approval**. Each proposed action is held for an admin to review and approve before anything is created or sent. This is the default and is recommended when you want a human in the loop on every AI-driven action.
2. **Autonomous Execution** — AI executes actions **automatically based on defined policies**. Proposed actions run without manual approval, within the boundaries set by your safeguards. Use this mode when you want AI to operate continuously with minimal manual intervention.

You can change the execution mode at any time. Many organizations start with **Approval-Gated Execution** and move to **Autonomous Execution** once they are confident in their safeguards.

### 3. Configure Safeguards

Safeguards are **mandatory** controls that ensure ethical, compliant, and predictable AI behavior. They apply in both execution modes. Expand each group to review and configure its controls.

1. **Operational Safeguards** — define practical boundaries that control **when and how often** AI actions can occur, such as the pace and volume of AI-driven activity.
2. **Ethical & Governance Safeguards** — ensure AI behavior aligns with **ethical standards, human rights, and organizational governance**.
3. **Clarity, Accessibility & Cultural Safeguards** — guarantee that AI communication is **clear, inclusive, accessible, and culturally appropriate** across regions and languages.

### 4. Save Your Changes

Save the tab to apply your settings across the organization. Changes take effect immediately for new AI actions.

## How Execution Mode and Safeguards Work Together

The execution mode sets _who approves_ AI actions; safeguards set _what AI is allowed to do_.

In **Approval-Gated Execution**, AI-proposed actions are queued for review and only create campaigns or enrollments after you approve them. In **Autonomous Execution**, the same actions run automatically once they pass your safeguards. In both modes, safeguards are always enforced — they are the boundary AI cannot cross regardless of execution mode.

Execution mode and safeguards control _how AI acts_. What AI knows when it acts comes from the **Agentic AI panel**: uploaded documents marked **Use in generation** in **Files**, and the **Organization** context in **Memory** (sector, brand tone, priority risks, and notes). Together, these settings and that context shape every action the Main Assistant and Reporting Agent take.

## FAQs

### Q: Which execution mode should we start with?

A: Start with **Approval-Gated Execution** so an admin reviews and approves each AI-proposed action. Move to **Autonomous Execution** once you are confident in your safeguards and policies.

### Q: Can we turn Agentic AI off after enabling it?

A: Yes. Toggle **Enable Agentic AI** off at any time to stop AI from acting. Your execution mode and safeguard settings are retained for when you re-enable it.

### Q: Are safeguards optional?

A: No. Safeguards are mandatory and apply in both execution modes to keep AI behavior ethical, compliant, and predictable.

### Q: Do these settings control the Reporting Agent too?

A: Yes. Execution mode and safeguards apply to all AI agents, including the Main Assistant and the Reporting Agent.
