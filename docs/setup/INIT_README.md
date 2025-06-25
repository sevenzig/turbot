# Template Initialization Guide

Quick setup wizard to customize this React + Vite template for your project.

## Basic Usage

```bash
npm run init
```

Follow the interactive prompts to customize:
- Project details (name, description, author)
- Business information (name, website, colors)
- Technical configuration (deployment platform, CSS framework)
- Feature selection (PWA, analytics, etc.)

## Configuration File Mode

```bash
npm run init -- --config my-config.json
```

## Preview Mode (Recommended First)

```bash
npm run init:dry-run
```

Or with config file:
```bash
npm run init:dry-run -- --config my-config.json
```

## Available Commands

| Command | Description | Example |
|---------|-------------|---------|
| `npm run init` | Interactive setup | `npm run init` |
| `npm run init:dry-run` | Preview changes without applying | `npm run init:dry-run` |
| `npm run init:help` | Show help and options | `npm run init:help` |

- `init-template.ts` - The initialization script itself

```bash
npm run init:dry-run
```

```bash
npm run init
```

1. Restore from Git history: `git checkout HEAD~1 -- init-template.ts` 