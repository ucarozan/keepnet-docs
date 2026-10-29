# Security Advisories

Keepnet Labs publishes security advisories for vulnerabilities identified in our products, including issues fixed before public disclosure. Each advisory lists the affected product, severity, remediation and current status.

<details>

<summary>KEEPNET-SA-2026-001 — Authentication bypass in Agentic AI / Agentic Ally (CVE-2026-92546)</summary>

**Advisory ID:** KEEPNET-SA-2026-001\
**CVE:** [CVE-2026-92546](https://www.cve.org/CVERecord?id=CVE-2026-92546)\
**CWE:** CWE-290 (Authentication Bypass by Spoofing)\
**Severity:** High (CVSS 7.5)\
**Status:** Fixed\
**Affected versions:** builds before 331 (before commit `0ef61f2e`)\
**Fixed version:** build 331 (`0ef61f2e`), deployed 29 August 2026

**Summary**

An authentication bypass existed in Agentic AI / Agentic Ally where the value supplied in the `X-Agentic-Ally-Token` HTTP header was not fully validated on the server side. This could allow unauthorized requests to the `/api/agents`, `/api/tools` and `/api/workflows` endpoints.

**Impact**

The affected endpoints expose only AI agent, tool and workflow definitions. No customer data or personal data was accessible through them. A review of the live code and database confirmed these endpoints hold no customer data, personal data, account or credential information. Our investigation found no evidence that customer data was accessed or that any customer was affected, and a post-fix review of logs found no successful exploitation.

**Remediation**

Server-side validation and authorization checks were added for the affected header and endpoints; invalid or unauthorized requests are now rejected. The fix passed security and functional testing and was deployed to all customers as part of our fully managed SaaS. No customer action is required.

**Timeline**

* August 2026 — Reported to Keepnet through responsible disclosure by a third-party researcher; fixed the same day.
* 29 August 2026 — Fix (build 331) deployed to production for all customers.
* September–October 2026 — Coordinated with the national cyber security authority; full investigation report provided.
* 27 October 2026 — CVE-2026-92546 published.

**Credit**

An external researcher, not engaged or authorised by Keepnet, reported an authentication issue to us on 28 August.

</details>
