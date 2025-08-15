# Training Completion Queries

### Overview

This document guides the address of issues related to training completion and certificate issuance within the Keepnet platform. It specifically targets situations where users have finished their training but have yet to receive their completion certificates and offers solutions to improve user experience and administrative responses.

### Problem Description

Users may report having completed their training without receiving the appropriate completion certificate. Investigations often reveal that these users have completed the training but have yet to trigger the necessary system signals to register their completion officially.

<figure><img src="../../../.gitbook/assets/Screenshot 2024-04-16 at 16.40.36.png" alt=""><figcaption></figcaption></figure>

<figure><img src="../../../.gitbook/assets/Screenshot 2024-05-14 at 08.57.10.png" alt=""><figcaption></figcaption></figure>

<figure><img src="../../../.gitbook/assets/Screenshot 2024-05-14 at 09.09.17.png" alt=""><figcaption></figcaption></figure>

### **Technical Explanation**

The Keepnet platform uses SCORM (Sharable Content Object Reference Model) to manage and track online training. A critical aspect of this model is the <mark style="color:blue;">**LMSFINISH**</mark> signal, which must be sent to the platform to officially mark a training session as completed. If a user finishes the training content but remains on the page without closing the window or clicking the "Save/Exit" button, the system does not receive the <mark style="color:blue;">**LMSFINISH**</mark> signal. Consequently, the session remains incomplete in the system records.

### Solution

To ensure that users properly complete training sessions and receive their certificates, the following solutions are proposed:

**User Experience Enhancements:**

Clear Instructions at Course End:

* Incorporate explicit instructions at the end of the training content prompting users to either:
  * "Please click 'Save and Exit' to finish your training," or
  * Notify users that "In 10 seconds, this page will automatically close," ensuring the trigger of the LMSFINISH signal.

Automated Page Closure:

* Implement an automatic closure feature for the training page after a short delay post-training completion. This ensures that the system correctly sends the LMSFINISH signal even if the user fails to manually exit.

**Guidelines for Managed Service Providers (MSPs):**

Verification of Training Completion:

* MSPs should verify the training completion status in the "Training Report > Users" section of the administrative platform.

Handling Discrepancies:

* If a user claims to have completed the training but the report indicates otherwise, MSPs should instruct the user to ensure they have clicked the "Save/Exit" button at the end of the session or have closed the training window to signal completion properly.

<figure><img src="../../../.gitbook/assets/This one.png" alt=""><figcaption></figcaption></figure>

