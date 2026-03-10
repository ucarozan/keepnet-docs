# Documentation Standards

This document defines standards for Keepnet documentation published on doc.keepnetlabs.com. All contributors should follow these guidelines to ensure consistency, accessibility, and clarity.

## Images and figures

### Figcaption (image caption) — required

Every image or figure in the documentation **must** have a **figcaption** (caption) that appears below the image on the published site.

- **Purpose:** Captions help readers understand what the image shows without relying on the surrounding text. They improve accessibility and make the doc easier to scan.
- **Format:** Use GitBook’s figure syntax and always include a non-empty `<figcaption>`:
  ```html
  <figure>
    <img src="path/to/image.png" alt="Short description for screen readers">
    <figcaption>Brief caption describing what the image shows</figcaption>
  </figure>
  ```
- **Content:** The caption should be a short, descriptive sentence (or two) that answers: *What is this image showing?* Avoid repeating the section title word-for-word; add concrete detail (e.g. which screen, which step, which chart).
- **Language:** Match the language of the page (e.g. English for English docs).

### Alt text — required

Every `<img>` **must** have an `alt` attribute.

- **Purpose:** Alt text is used by screen readers and when the image cannot be displayed. It should convey the same information as the image in a concise way.
- **Content:** Describe the content or function of the image in a short phrase. Leave `alt=""` only for purely decorative images (and add a figcaption so the figure still has a visible description).

### Checklist for adding or editing figures

- [ ] `<figure>` contains exactly one `<img>` and one `<figcaption>`.
- [ ] `<figcaption>` is not empty.
- [ ] `<img>` has an `alt` attribute that describes the image (or `alt=""` only if decorative, with a meaningful figcaption).

---

*For other documentation conventions (tone, structure, links), follow existing Keepnet docs and this document will be extended as needed.*
