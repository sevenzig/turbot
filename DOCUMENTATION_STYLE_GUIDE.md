# Documentation Style Guide

This document outlines the standards for creating and editing documentation for the React + Vite
Business Website Template. Following these guidelines ensures consistency, clarity, and ease of use
for both developers and AI assistants.

## 1. File Naming

- **Convention:** All documentation files must use `kebab-case`.
- **Examples:**
  - `README.md`
  - `template-usage.md`
  - `style-guide.md`
  - `contributing-guide.md`

## 2. Header Hierarchy

- **Top-Level Header:** Each document must begin with a single Level 1 Header (`#`). This should be
  the title of the document.
- **Subsequent Headers:** Use Level 2 (`##`) to Level 4 (`####`) headers to create a logical
  structure. Do not skip levels (e.g., an `<h2>` should be followed by an `<h3>`, not an `<h4>`).
- **Capitalization:** Use sentence case for headers (e.g., `## Quick start guide`).

## 3. Terminology

- **Primary Term:** The project should be referred to as a **"template"** or **"starter template"**.
- **Avoid:** Do not use "boilerplate," "kit," or "framework" unless referring to an external
  technology (e.g., "React framework").
- **Consistency:** Ensure terms are used consistently across all documents. For example, if
  referring to a specific feature, use the same name for it everywhere.

## 4. Placeholders

- **Format:** All placeholders for user-provided information must use square brackets and be in all
  caps.
- **Convention:** `[PLACEHOLDER_NAME]`
- **Examples:**
  - `[YOUR_BUSINESS_NAME]`
  - `[REPOSITORY_URL]`
  - `[API_KEY]`

## 5. Code Blocks

- **Syntax Highlighting:** Always specify the language for syntax highlighting in fenced code
  blocks.
- **Examples:**
  - ```bash
    npm install
    ```
  - ```typescript
    const message: string = "Hello, world!";
    ```
- **Clarity:** Ensure code examples are clear, concise, and relevant to the context.

## 6. Links

- **Internal Links:** Use relative paths for internal links to other documentation files.
  - **Example:** `[See the usage guide](./template-usage.md) for more details.`
- **External Links:** Use full URLs for external links.

## 7. Document Purpose

- **User-Facing Documentation:** Files like `README.md` and `template-usage.md` should be written
  for a developer using the template. The language should be clear, helpful, and focused on
  practical application.
- **Example Implementations:** Specific use cases (like the "Brewery Website") should be framed as
  examples of how the template can be adapted. These can be in a separate `examples` directory.
- **Specification Documents:** Detailed specifications for development (often for AI) should be
  clearly marked as such and can reside in a `specs` or similar directory if needed.
