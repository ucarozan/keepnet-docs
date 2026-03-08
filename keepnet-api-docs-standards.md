# Keepnet API Docs — Writing Standards

Base: Google Developer Documentation Style Guide
Additions: 3 Keepnet-specific rules below

**Relationship to DOCUMENTATION-RULES.md:** This file covers **how to write** (language, tone, structure, terminology). For mandatory project rules (GitBook, OpenAPI, menu, link format, swagger, page templates), see **DOCUMENTATION-RULES.md**. Both are used together; where they overlap, DOCUMENTATION-RULES takes precedence.

---

## The 3 Keepnet Rules

### Rule 1: Task-based headings

Page titles and section headings describe what the reader accomplishes — not what the topic is called.

| ✅ Do | ❌ Don't |
|---|---|
| `Authenticate your requests` | `Authentication` |
| `Request an access token` | `Token endpoint` |
| `Handle token expiry` | `Token expiry` |
| `Manage System Users` | `System Users API` |
| `Pull training content` | `Training endpoints` |

Pattern: **Verb + object** (`Create credentials`, `Handle errors`, `Filter results`)

---

### Rule 2: Code first, explanation after

Show the code example first. Follow with explanation. Never lead with theory.

**✅ Do:**
````markdown
## Request an access token

```bash
curl -X POST https://api.keepnetlabs.com/connect/token \
  -d "grant_type=client_credentials" \
  ...
```

The response includes your token and its expiry time:
````

**❌ Don't:**
````markdown
## Request an access token

To obtain a token, you must send a POST request to the token endpoint 
with your credentials encoded as form data. The endpoint accepts the 
following parameters...

```bash
curl ...
```
````

Every endpoint section must include code tabs: **cURL, JavaScript, Python** — in that order.

---

### Rule 3: Direct links, no "for more information"

Use arrow-style inline links. Never write "For more information, see X."

| ✅ Do | ❌ Don't |
|---|---|
| `[Roles and permissions →](#)` | `For more information about roles, see the Roles and permissions page.` |
| `[REST API Settings →](https://doc...)` | `See also: REST API Settings` |
| `[Pull Training List →](./guides/...)` | `Refer to the Pull Training List guide for details.` |

---

## Google Style Guide rules we follow

From [developers.google.com/style](https://developers.google.com/style):

**Voice and tone**
- Use **active voice**. "Request a token" not "A token should be requested."
- Use **second person** ("you"). "You need a Client ID" not "The user needs a Client ID."
- Be direct and conversational — not formal, not casual.

**Language**
- Use **present tense**. "The token expires" not "The token will expire."
- Use **imperative mood** for instructions. "Click + NEW" not "You should click + NEW."
- Avoid "please" in instructions.
- Avoid Latin abbreviations (e.g., i.e.) — write "for example" or "that is."

**Capitalization**
- Sentence case for headings. `Handle token expiry` not `Handle Token Expiry`
- Exception: proper nouns, product names (`Awareness Educator`, `Company Admin`)

**Lists**
- Use a list when you have 3+ parallel items.
- Don't use a list for 2 items — write a sentence instead.
- End list items with a period only if they're full sentences.

**Code formatting**
- Use `code font` for: endpoint paths, parameter names, field names, HTTP methods, status codes, values
- Use **bold** for UI elements: **Company → Settings → REST API**
- Never use code font for UI elements

---

## Page structure template

Every API reference page follows this structure:

```
# [Verb] [object]            ← Rule 1: task-based

One-sentence description of what this page helps you do.

---

## [First task heading]

[Code example first]         ← Rule 2: code first

[Brief explanation]

---

## [Second task heading]
...

---

## Handle errors

[Error table]

---

## What's next

- [Related guide →]          ← Rule 3: direct links
- [Related endpoint →]
```

---

## Hint block usage

```
{% hint style="info" %}     → Platform UI equivalent, notes
{% hint style="warning" %}  → Data loss risk, one-time secrets, irreversible actions
{% hint style="danger" %}   → Permanent deletion, security risk
{% hint style="success" %}  → Best practices, recommended patterns
```

Always pair a platform doc cross-link inside `info` hints:
```markdown
{% hint style="info" %}
**Platform UI:** Go to **Company → Company Settings → REST API**.
[Full instructions →](https://doc.keepnetlabs.com/...)
{% endhint %}
```

---

## Language cheat sheet

| Use | Avoid |
|---|---|
| `Generate` | `Create` (for credentials, tokens) |
| `Request` | `Get`, `Fetch` (for tokens) |
| `Authenticate` | `Auth`, `Login` |
| `Credential` | `Key`, `Secret key` (ambiguous) |
| `Expires after` | `Has a TTL of` |
| `Back off and retry` | `Implement exponential backoff` |
| `Endpoint` | `API call`, `method` |
| `Returns` | `Responds with`, `gives back` |
