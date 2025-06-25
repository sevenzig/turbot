# Publishing Business Website Templates to npm

This guide explains how to publish your business website template package to npm, enabling users to create new projects with `npm init` commands.

## Prerequisites

1. **npm account** - Create one at [npmjs.com](https://npmjs.com)
2. **npm CLI** - Install with `npm install -g npm`
3. **Login to npm** - Run `npm login`

## Package Preparation

### 1. Update package.json

Replace placeholder values in your `package.json`:

```json
{
  "name": "create-business-website",
  "version": "1.0.0",
  "description": "A collection of business website templates for React + TypeScript + Vite",
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/business-website-templates"
  },
  "homepage": "https://github.com/yourusername/business-website-templates#readme",
  "bugs": {
    "url": "https://github.com/yourusername/business-website-templates/issues"
  }
}
```

### 2. Create .npmignore

```gitignore
# Development files
.vscode/
.cursor/
node_modules/
dist/
coverage/

# Documentation that users don't need
docs/
examples/
scripts/validate-*
scripts/rule-*

# Template development files
*.md
!README.md
!docs/TEMPLATE_USAGE.md

# Git and CI files
.git/
.github/
.gitignore

# Local configuration
.env*
init-config.json
```

### 3. Verify Template Structure

Ensure your package includes:

```
create-business-website/
├── bin/
│   └── create-business-website.js    # npm init entry point
├── presets/                          # Template configurations
│   ├── basic.config.json
│   ├── brewery.config.json
│   ├── restaurant.config.json
│   └── consulting.config.json
├── src/                              # React template source
├── init-template.ts                  # Setup wizard
├── package.json                      # Configured for publishing
├── README.md                         # Main documentation
└── docs/TEMPLATE_USAGE.md           # Template usage guide
```

## Publishing Process

### 1. Version Management

```bash
# Update version before publishing
npm version patch   # For bug fixes (1.0.0 → 1.0.1)
npm version minor   # For new features (1.0.0 → 1.1.0)  
npm version major   # For breaking changes (1.0.0 → 2.0.0)
```

### 2. Publish to npm

```bash
# Dry run to check what will be published
npm publish --dry-run

# Publish to npm registry
npm publish

# For scoped packages (optional)
npm publish --access public
```

### 3. Verify Publication

```bash
# Check your package
npm view create-business-website

# Test installation
npm init business-website@latest test-project -- --template=basic
```

## Usage After Publishing

Once published, users can create new projects with:

### Standard npm init Commands

```bash
# Basic business website
npm init business-website@latest my-business -- --template=basic

# Brewery website
npm init business-website@latest my-brewery -- --template=brewery

# Restaurant website  
npm init business-website@latest my-restaurant -- --template=restaurant

# Consulting firm website
npm init business-website@latest my-consulting -- --template=consulting
```

### Alternative Installation Methods

```bash
# Clone and customize
npx create-business-website my-project

# With specific template
npx create-business-website my-project brewery

# Using yarn
yarn create business-website my-project --template=basic
```

## Template Updates and Maintenance

### Publishing Updates

```bash
# Make changes to templates
# Update version
npm version patch

# Publish update
npm publish
```

### Deprecating Old Versions

```bash
# Deprecate a specific version
npm deprecate create-business-website@1.0.0 "Please upgrade to 1.0.1 for bug fixes"

# Unpublish within 24 hours (not recommended)
npm unpublish create-business-website@1.0.0
```

## Template Package Best Practices

### 1. Semantic Versioning

- **Patch (1.0.X)** - Bug fixes in templates, content updates
- **Minor (1.X.0)** - New templates, new features in existing templates  
- **Major (X.0.0)** - Breaking changes to template structure or API

### 2. Template Documentation

Each template should include:
- Clear description of target business type
- Industry-appropriate defaults explanation
- Customization examples
- Screenshot or demo link

### 3. Quality Assurance

Before publishing:
- Test each template initialization
- Verify all placeholder replacements work
- Check that generated projects build successfully
- Validate industry-appropriate defaults

### 4. User Experience

- Keep template selection simple
- Provide clear prompts and validation
- Include helpful error messages
- Offer both interactive and config-file workflows

## Package Metrics and Analytics

### Download Statistics

```bash
# View download stats
npm view create-business-website

# More detailed stats at
# https://www.npmjs.com/package/create-business-website
```

### User Feedback

Monitor and respond to:
- GitHub issues and pull requests
- npm package reviews
- Social media mentions
- User-created projects showcasing templates

## Marketing Your Templates

### 1. Documentation

- Comprehensive README with examples
- Template showcase website
- Video tutorials showing template usage
- Blog posts about template design decisions

### 2. Community Engagement

- Share on Twitter, LinkedIn, dev communities
- Submit to template galleries and showcases
- Present at conferences or meetups
- Collaborate with business communities

### 3. SEO and Discovery

- Use relevant keywords in package.json
- Create landing page for template showcase
- Write articles about business website development
- Optimize for "business website template" searches

## Support and Maintenance

### Issue Management

1. **Bug Reports** - Fix quickly, especially for initialization issues
2. **Feature Requests** - Evaluate fit with template philosophy
3. **Template Requests** - Consider demand and feasibility
4. **Documentation** - Keep updated with package changes

### Long-term Maintenance

- Update dependencies regularly
- Keep templates aligned with React/Vite updates
- Monitor industry trends for new template opportunities
- Gather feedback on template effectiveness

## Example Publisher Workflow

```bash
# Development cycle
git checkout -b feature/new-template
# ... develop new template ...
git commit -m "feat(templates): add medical practice template"
git push origin feature/new-template
# ... merge PR ...

# Release cycle
git checkout main
git pull origin main
npm run test
npm run lint
npm version minor
git push origin main --tags
npm publish

# Post-release
# Update documentation
# Announce on social media
# Monitor for issues
```

This publishing strategy will enable your business website templates to reach a wide audience of developers and business owners looking for professional, industry-specific website solutions. 