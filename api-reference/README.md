# API Reference

REST API documentation for the Keepnet platform: Quickstart, use-cases (Reseller, and later Company Admin), and links to the **Endpoints** section (OpenAPI) in the sidebar.

---

## Adding a new use-case

1. **Choose role and sub-group**  
   Reseller → `use-cases/reseller/`. Company Admin (later) → `use-cases/company/`.  
   Sub-groups: Companies, Users & groups, Training, Phishing simulation, Reports, Billing.

2. **Create the page**  
   Add a new `.md` file under the right folder (e.g. `use-cases/reseller/your-use-case-name.md`).  
   Use the **Tag page** structure: task-based H1, one intro paragraph, then for each endpoint: `## METHOD /path`, blockquote, `{% swagger %}` block. Use `[Endpoints → Test it](sidebar)` for the Try it panel.

3. **Update the menu**  
   In **SUMMARY.md**, add a link under the correct Reseller sub-group (or Company when added). Keep at most ~8–10 items per sub-group; split or add a sub-group if needed.

4. **Writing standards**  
   Writing rules, page templates, and Cursor rules are in the **api-writing** repo (private). Use that repo for documentation-rules, keepnet-api-docs-standards, and gitbook-openapi-setup. This repo (keepnet-docs) contains only the published content.

5. **OpenAPI spec**  
   To refresh the spec used by GitBook: run `npm run openapi` in this repo, then commit and push. The `openapi/` and `scripts/` folders are in keepnet-docs.
