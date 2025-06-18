# React + Vite Template Initializer

A powerful initialization script that customizes this React + Vite template with your project's
configuration, business information, and preferred technologies.

## Quick start

### Interactive Mode (Recommended for first-time users)

```bash
node init-template.js
```

### Configuration File Mode (Recommended for automation)

```bash
# 1. Copy example configuration
cp init-config.example.json [CONFIG_FILE_NAME].json

# 2. Edit your configuration
# Customize [CONFIG_FILE_NAME].json with your project details

# 3. Run initialization
node init-template.js --config [CONFIG_FILE_NAME].json
```

### Preview Changes (Dry Run)

```bash
# Preview what will be changed without applying
node init-template.js --dry-run

# Preview with config file
node init-template.js --config [CONFIG_FILE_NAME].json --dry-run
```

## Command line options

| Flag        | Short | Description                      | Example                                                  |
| ----------- | ----- | -------------------------------- | -------------------------------------------------------- |
| `--help`    | `-h`  | Show usage information           | `node init-template.js --help`                           |
| `--dry-run` | `-d`  | Preview changes without applying | `node init-template.js --dry-run`                        |
| `--config`  | `-c`  | Use configuration file           | `node init-template.js --config [CONFIG_FILE_NAME].json` |

### Flag Combinations

```bash
# Interactive mode with preview
node init-template.js --dry-run

# Config file with preview
node init-template.js --config [CONFIG_FILE_NAME].json --dry-run
```

## Configuration options

### Required fields

```json
{
  "projectName": "[PROJECT_NAME]", // npm package name (lowercase, no spaces)
  "authorName": "[AUTHOR_NAME]", // Your full name
  "authorEmail": "[AUTHOR_EMAIL]", // Valid email address
  "githubUsername": "[GITHUB_USERNAME]" // GitHub username or organization
}
```

### Basic project settings

```json
{
  "description": "[PROJECT_DESCRIPTION]",
  "license": "[LICENSE_TYPE]" // MIT, ISC, Apache-2.0, GPL-3.0, etc.
}
```

### Business information

```json
{
  "businessName": "[BUSINESS_NAME]",
  "websiteUrl": "[WEBSITE_URL]",
  "primaryColor": "[PRIMARY_COLOR]", // Hex color code
  "secondaryColor": "[SECONDARY_COLOR]" // Optional
}
```

### Technical configuration

```json
{
  "deploymentPlatform": "vercel", // vercel, netlify, github-pages, etc.
  "includePWA": false, // true/false
  "cssApproach": "css-modules" // css-modules, tailwind, styled-components, etc.
}
```

### Optional business details

```json
{
  "businessDescription": "[BUSINESS_DESCRIPTION]",
  "businessPhone": "[BUSINESS_PHONE]",
  "businessEmail": "[BUSINESS_EMAIL]",
  "businessAddress": "[BUSINESS_ADDRESS]",
  "socialFacebook": "[FACEBOOK_URL]",
  "socialTwitter": "[TWITTER_URL]",
  "socialInstagram": "[INSTAGRAM_URL]"
}
```

### Feature flags

```json
{
  "features": {
    "analytics": false, // Google Analytics integration
    "seo": true, // SEO meta tags
    "darkMode": false, // Dark/light theme toggle
    "contactForm": true, // Contact form with validation
    "socialLinks": true, // Social media links
    "businessHours": true, // Business hours display
    "testimonials": false, // Customer testimonials
    "blog": false // Blog/news section
  }
}
```

## What the script does

### 1. Package.json updates

- ✅ Updates project name, description, author
- ✅ Sets license and repository information
- ✅ Adds deployment scripts based on platform choice
- ✅ Installs dependencies for selected features
- ✅ Creates backup before modification

### 2. Feature configuration

- ✅ Adds/removes PWA files based on selection
- ✅ Configures CSS framework (Tailwind config, etc.)
- ✅ Sets up deployment platform files
- ✅ Removes unused configuration files

### 3. Template file processing

- ✅ Replaces placeholders in all template files
- ✅ Updates business information throughout codebase
- ✅ Applies color scheme to CSS files
- ✅ Customizes component content

### 4. Validation & quality assurance

- ✅ Validates all placeholder replacements
- ✅ Checks file structure integrity
- ✅ Verifies package.json correctness
- ✅ Ensures feature configuration matches selections

### 5. Final setup tasks

- ✅ Initializes Git repository with initial commit
- ✅ Removes template-specific files
- ✅ Runs health check (npm install, build test)
- ✅ Generates comprehensive setup report

## Files modified/created

### Always modified

- `package.json` - Project configuration and dependencies
- `README.md` - Project documentation
- `src/data/businessInfo.ts` - Business information
- Various component files - Business details and branding

### Conditionally modified/created

- `tailwind.config.js` + `postcss.config.js` (if Tailwind selected)
- `netlify.toml` (if Netlify selected)
- `.github/workflows/deploy.yml` (if GitHub Pages selected)
- PWA files removed (if PWA not selected)

### Always created

- `SETUP_REPORT.md` - Complete initialization report
- Git repository with initial commit

### Always removed

- `init-template.js` - The initialization script itself
- Template documentation files
- Backup files created during process

## Dry-run mode

Perfect for testing before applying changes:

```bash
node init-template.js --dry-run
```

**Dry-run shows:**

- ✅ All configuration changes that would be made
- ✅ Files that would be modified/created/removed
- ✅ Dependencies that would be added
- ✅ Scripts that would be updated
- ✅ Complete preview without any actual changes

## Troubleshooting

### Common issues

**"npm not found" error:**

```bash
# Install Node.js and npm first
# Then try again
node init-template.js
```

**"Git not found" error:**

```bash
# Install Git first, or initialize manually later:
git init
git add .
git commit -m "Initial commit"
```

**Configuration file errors:**

```bash
# Validate JSON syntax
node -c my-config.json

# Check required fields are present
# See configuration section above
```

**Build failures during health check:**

```bash
# Often normal for new projects
# Try manual build after initialization:
npm install
npm run build
```

### Getting help

1. **Check the setup report:** `SETUP_REPORT.md`
2. **Run with dry-run first:** `--dry-run` flag
3. **Validate config file:** Ensure JSON is valid
4. **Check file permissions:** Ensure write access to directory

## Generated reports

After initialization, check `SETUP_REPORT.md` for:

- ✅ Complete configuration summary
- ✅ All operations performed
- ✅ Success/failure status for each step
- ✅ Next steps and useful resources
- ✅ Troubleshooting information

## Supported technologies

### CSS frameworks

- **CSS Modules** (default) - Scoped CSS with TypeScript support
- **Tailwind CSS** - Utility-first CSS framework
- **Styled Components** - CSS-in-JS solution
- **Emotion** - Performant CSS-in-JS library
- **Vanilla CSS** - Plain CSS files

### Deployment platforms

- **Vercel** (recommended) - Zero-config deployments
- **Netlify** - JAMstack platform
- **GitHub Pages** - Free static hosting
- **AWS Amplify** - Full-stack development platform
- **Firebase Hosting** - Google's hosting platform

### Optional features

- **PWA** - Progressive Web App capabilities
- **Analytics** - Google Analytics integration
- **SEO** - Search engine optimization
- **Dark Mode** - Theme switching
- **Contact Forms** - Form validation and handling

## Re-running the script

**⚠️ Warning:** The script removes itself after successful completion.

If you need to re-run:

1. Restore from Git history: `git checkout HEAD~1 -- init-template.js`
2. Or download fresh copy from template repository
3. Run again with new configuration

## Best practices

1. **Always run dry-run first** to preview changes
2. **Use config files for team projects** to ensure consistency
3. **Commit template state** before running initialization
4. **Review SETUP_REPORT.md** after completion
5. **Test build process** before deploying

## Next steps after initialization

1. **Review generated files:** Check `SETUP_REPORT.md`
2. **Install dependencies:** `npm install` (if not done automatically)
3. **Start development:** `npm run dev`
4. **Test production build:** `npm run build`
5. **Deploy your app:** `npm run deploy`

---

**Need help?** Check the generated `SETUP_REPORT.md` for detailed information about your specific
setup.
