# Incident Responder: Notify a Specific Inbox

## Notify a Specific Inbox

By default, all system admins are notified about Investigation Results. Some customers would like this email to go to just one (or more!) inboxes so this is easier to manage without notifying every system admin.

To set this up, please follow the below instructions:

1. Incident Responder > Playbook
2. Create a new Playbook by click on the blue +NEW button
3. **Rule Info:** Name the playbook and add a description
4. **Conditions:** Set to From > exists (this will cover all reported emails)
5. **Actions:** Create a new workflow
   1. Select "Analyse" from the drop down
   2. Select all Integrations (if you don't have any setup, please follow [these steps](../../getting-started/5.-incident-responder-setup/step-1.-integrate-threat-intel-partners.md))
   3. Tick the box - "Investigate according to analyze results"
   4. Select Sources > Select the [Mail Integration](../../getting-started/5.-incident-responder-setup/step-2.-mail-configurations/) you have setup
   5. Actions > Notify
   6. SAVE
