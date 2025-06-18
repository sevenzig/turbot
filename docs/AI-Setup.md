# AI Setup Guide

Welcome to **Turbot's AI Development Suite**! This guide explains how to enable business-aware, Cursor-powered AI assistance in your local environment.

## 1. Install Cursor

Download the Cursor editor from <https://cursor.sh> and sign in with your GitHub account.

## 2. Clone the Repository

```bash
git clone https://github.com/YOUR_GH_USERNAME/REPO_NAME my-business-site
cd my-business-site
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Run the Initialiser

```bash
npm run init   # supplies your business context to the AI rules
```

The wizard stores your answers in `.turbot.config.json` which Cursor reads for context.

## 5. Open the Project in Cursor

```bash
cursor .
```

Cursor will automatically pick up the rules in `.cursor/rules` and surface intelligent suggestions.

> **Tip:** Press `Ctrl+K` inside Cursor and type prompts such as *"Add a testimonials section for my brewery"*.

## 6. Next Steps

- Review the [Cursor Rules Reference](Cursor-Rules.md)
- Try out sample prompts in [AI Prompts Library](AI-Prompts.md)
- Push your changes and open a PR—CI will validate AI rule compliance. 