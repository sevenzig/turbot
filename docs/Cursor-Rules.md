# Cursor Rules Reference

This document lists all **Turbot** Cursor rules that guide the AI during code generation and editing.

| Rule Set | Purpose |
|----------|---------|
| **Design System Tokens** | Enforce consistent colours, spacing, typography across components |
| **Component Conventions** | Enforce file structure `ComponentName/ComponentName.tsx` + barrel export |
| **Accessibility** | Warn when ARIA labels or semantic HTML are missing |
| **Architecture** | Prevent default exports; enforce named exports + `index.ts` |
| **Copy Tone** | Maintain brand voice and friendly, professional tone in user-facing copy |

## Directory Structure

```
.cursor/
  rules/
    design.yml
    accessibility.yml
    architecture.yml
    copy.yml
```

Each YAML file defines triggers, good/bad examples and automated fixes.

> **Editing Rules**: Submit a PR with updates; CI will run `ai-validation.yml` to ensure they compile and do not conflict. 