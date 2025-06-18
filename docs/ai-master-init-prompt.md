# AI Master Initialization Prompt

You are tasked with building a complete React + Vite business website. All project specifications,
requirements, and coding standards have been documented in the project directory as markdown files.

## Template customization guide

This template is designed to be adapted for any type of business. Before starting development,
you'll need to customize it for your specific business type.

### Common business types this template supports:

- Restaurants & Cafes
- Retail Stores
- Service Businesses
- Professional Services
- Entertainment Venues
- Healthcare Practices
- And many more...

### How to customize this template:

1. **Replace all placeholder text** marked with `[BRACKETS]` throughout the project
2. **Update business-specific sections** to match your industry (e.g., "Menu" for restaurants,
   "Services" for agencies)
3. **Modify component names** to reflect your business type (e.g., `ProductCard` instead of
   `ServiceCard`)
4. **Adapt data structures** in the `/data` directory for your content type
5. **Update routing structure** to match your site architecture

## Step 1: Read and register all requirements

Before writing any code, read and internalize these specification documents:

### Project architecture files:

- `./docs/brewery-example-website-spec.md` - Complete project specification for the brewery example.
- `./docs/brewery-example-layout-spec.md` - Exact layout and component requirements for the brewery
  example.
- `./docs/brewery-example-implementation-guide.md` - Implementation guide for the brewery example.

### CSS & styling standards:

- `.cursor/rules/css-best-practices.mdc` - CSS architecture and best practices
- `.cursor/rules/css-scoping-rules.mdc` - CSS Modules implementation requirements
- `.cursor/rules/no-important-rules.mdc` - CSS specificity and !important prevention
- `.cursor/rules/responsive-breakpoints.mdc` - Responsive design breakpoint standards

## Step 2: Confirm understanding

After reading all specification files, confirm you understand:

1. **Layout requirements:**

   - Desktop: 2-row header ([BUSINESS_NAME]/nav, [BUSINESS_HOURS]/[CONTACT_ACTION])
   - Mobile: logo/hamburger + business hours, then action buttons below hero
   - Full-width sections with 1200px centered containers
   - 5 responsive breakpoints (480px, 768px, 1024px, 1200px)

2. **Content data system:**

   - Markdown files in `src/data/[CONTENT_TYPE]/` with specific frontmatter
   - Status-based filtering: homepage (featured), content page (active), individual (all data)
   - Routing: `/[CONTENT_TYPE]/[SLUG]` for individual content pages

3. **Technical architecture:**

   - CSS Modules for ALL component styling (no global classes)
   - `businessInfo.ts` as single source of truth for business data
   - Business hours function integration
   - React Router DOM for navigation

4. **Component structure:**
   - Each component in own folder with `.jsx` and `.module.css`
   - Full-width sections: Header, Hero, [PRIMARY_CONTENT], [SECONDARY_CONTENT], [TERTIARY_CONTENT],
     [SOCIAL_MEDIA], Footer
   - Mobile-only action buttons below hero section

## Step 3: Project initialization

Once you confirm understanding, initialize the project with this exact structure:

### Install dependencies

```bash
npm create vite@latest [BUSINESS_NAME]-website -- --template react
cd [BUSINESS_NAME]-website
npm install react-router-dom gray-matter remark remark-html
```

### Create file structure

```
src/
├── components/
│   ├── Header/
│   ├── HeroSection/
│   ├── [PRIMARY_CONTENT]Section/
│   ├── [CONTENT_TYPE]Card/
│   ├── [SECONDARY_CONTENT]Section/
│   ├── [TERTIARY_CONTENT]Section/
│   ├── [SOCIAL_MEDIA]Section/
│   └── Footer/
├── pages/
│   ├── HomePage.jsx
│   ├── [CONTENT_TYPE]Page.jsx
│   └── Individual[CONTENT_TYPE]Page.jsx
├── data/
│   ├── businessInfo.ts
│   └── [CONTENT_TYPE]/
├── hooks/
│   └── use[CONTENT_TYPE].js
├── utils/
│   └── [CONTENT_TYPE]Loader.js
└── styles/
    ├── globals.css
    └── variables.css
```

## Step 4: Implementation order

Build components in this exact sequence:

1. **Foundation setup:**

   - `businessInfo.ts` template structure
   - `globals.css` with CSS custom properties
   - `[CONTENT_TYPE]Loader.js` utility for markdown processing

2. **Core components:**

   - Header (desktop 2-row + mobile hamburger)
   - HeroSection (full-width with overlay)
   - [CONTENT_TYPE]Card (reusable component)

3. **Section components:**

   - [PRIMARY_CONTENT]Section (featured content)
   - [SECONDARY_CONTENT]Section (additional content)
   - [TERTIARY_CONTENT]Section (supplementary content)
   - [SOCIAL_MEDIA]Section (social media integration)
   - Footer (business info)

4. **Page components:**

   - HomePage (component assembly)
   - [CONTENT_TYPE]Page (all active content)
   - Individual[CONTENT_TYPE]Page (detailed content info)

5. **Data integration:**
   - use[CONTENT_TYPE] hook with filtering
   - Routing setup with React Router
   - Business hours integration

## Step 5: Validation requirements

After implementation, verify these critical success criteria:

### Layout validation:

- [ ] Desktop header has exactly 2 rows with specified content
- [ ] Mobile header shows logo/hamburger, then hours row
- [ ] Mobile action buttons appear only ≤768px below hero
- [ ] All sections are full-width with centered 1200px containers
- [ ] Responsive breakpoints work at 480px, 768px, 1024px, 1200px

### Data system validation:

- [ ] Content markdown files load with frontmatter parsing
- [ ] Homepage shows only featured active content
- [ ] Content page shows all active items with relevant dates
- [ ] Individual pages show complete content data + detailed info
- [ ] Routing works: /, /[CONTENT_TYPE], /[CONTENT_TYPE]/[SLUG]

### Technical validation:

- [ ] CSS Modules used exclusively (no global component classes)
- [ ] Business data comes from businessInfo.ts only
- [ ] Business hours function displays correct text patterns
- [ ] No !important declarations in CSS
- [ ] Mobile touch targets ≥44px

## Step 6: Code quality standards

Ensure all code follows these standards:

- **React:** Functional components with hooks, proper TypeScript types
- **CSS:** Mobile-first approach, CSS custom properties, semantic class names
- **Performance:** Build-time markdown processing, optimized images, lazy loading
- **Accessibility:** Semantic HTML, ARIA labels, proper contrast ratios
- **SEO:** Structured data, meta tags, semantic markup

## Template customization checklist

Before using this template, replace all of the following placeholders:

### Business information:

- [ ] `[BUSINESS_NAME]` - Your business name (e.g., "Acme Corp", "Your Business Name")
- [ ] `[BUSINESS_TYPE]` - Type of business (e.g., "Restaurant", "Agency", "Store")
- [ ] `[BUSINESS_HOURS]` - Operating hours format
- [ ] `[CONTACT_ACTION]` - Primary call-to-action (e.g., "Call Now", "Book Appointment")

### Content Structure:

- [ ] `[CONTENT_TYPE]` - Your main content type (e.g., "products", "services", "menu")
- [ ] `[PRIMARY_CONTENT]` - Main content section (e.g., "Products", "Services", "Menu")
- [ ] `[SECONDARY_CONTENT]` - Secondary section (e.g., "About", "Features", "Gallery")
- [ ] `[TERTIARY_CONTENT]` - Additional section (e.g., "Testimonials", "News", "Events")
- [ ] `[SOCIAL_MEDIA]` - Social integration type (e.g., "Instagram", "Reviews", "Social")

### File Structure:

- [ ] Update component folder names to match your business type
- [ ] Rename data directories to match your content structure
- [ ] Update hook and utility file names accordingly
- [ ] Modify page component names to reflect your site structure

### Content Examples by Business Type:

**Restaurant/Cafe:**

- `[CONTENT_TYPE]` = "menu"
- `[PRIMARY_CONTENT]` = "Menu"
- `[SECONDARY_CONTENT]` = "About"
- `[TERTIARY_CONTENT]` = "Events"

**Service Business:**

- `[CONTENT_TYPE]` = "services"
- `[PRIMARY_CONTENT]` = "Services"
- `[SECONDARY_CONTENT]` = "Portfolio"
- `[TERTIARY_CONTENT]` = "Testimonials"

**Retail Store:**

- `[CONTENT_TYPE]` = "products"
- `[PRIMARY_CONTENT]` = "Products"
- `[SECONDARY_CONTENT]` = "Features"
- `[TERTIARY_CONTENT]` = "Reviews"

## CRITICAL SUCCESS CRITERIA

The final implementation must:

1. **Match layout specifications exactly** (desktop 2-row header, mobile action buttons)
2. **Use full-width sections** with centered content like reference screenshots
3. **Implement complete content data system** with markdown files and proper filtering
4. **Follow CSS Modules architecture** with no global component classes
5. **Integrate business data** from single source of truth
6. **Work responsively** across all 5 breakpoints
7. **Pass all validation checks** listed above

## Ready to Begin?

**IMPORTANT:** Before starting development, complete the Template Customization Checklist above.

Confirm you have:

1. Read and understood all specification files in `./`
2. Completed the Template Customization Checklist
3. Replaced all `[PLACEHOLDER]` text with your business-specific content

Then proceed with Step 3 (Project Initialization).

Build this as a production-ready application that precisely follows every requirement documented in
the specification files. Do not deviate from the documented standards, layout requirements, or
technical architecture.

**Ask for clarification only if specification files are missing or contain conflicting information.
Otherwise, proceed with full implementation following the documented requirements exactly.**
