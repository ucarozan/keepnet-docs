# SOAR Integration

In case the end user reports an email, the relevant email is analyzed by the services with which the Incident Responder product is integrated. If the analysis result appears to be malicious, the institution's SOC team will apply additional measures such as using antivirus, firewall, EDR, proxy etc. to target this malicious email. This manual process will take a lot of time and will delay the intervention to the incident in a timely manner.

If the email reported to the platform is determined to be phishing or malicious after analysis, your current SOAR solution can obtain this detail from the platform via API and automatically perform the necessary actions on your solutions such as EDR, Proxy, and Firewall. In this way, the process will be manageable due to the quick action taken. API usage details are explained in detail in this document.

You can perform almost every operation in the Incident Responder product using API. You can refer to our Rest API [document](https://api.keepnetlabs.com/docs/index.html) to see the details



API integration with your security orchestration, automation, and response (SOAR) solutions enables you to respond more efficiently to harmful emails.

If the [Incident Responder](https://keepnetlabs.com/products/incident-responder) API endpoints are integrated with your current SOAR products, such as antivirus, firewall, endpoint detection, and response, proxy services, etc., it will save valuable time in the response to a potential threat via API endpoints in comparison with a manual investigation of a reported email.
