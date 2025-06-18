# React + Vite Business Website Template - Usage Guide

This template provides a production-ready foundation for building modern business websites with
React, TypeScript, and Vite. Follow this guide to customize it for your specific business needs.

## Quick start (5 minutes)

### Prerequisites

- Node.js 18+ installed
- Git installed
- Code editor (VS Code recommended)

### Setup steps

1. **Clone or download template**

   ```bash
   git clone [REPOSITORY_URL] [PROJECT_NAME]
   cd [PROJECT_NAME]
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open browser**

   - Visit `http://localhost:5173`
   - You should see the template running with placeholder content

5. **Quick test**
   - Edit `src/data/businessInfo.ts` - change the business name
   - Save and see the changes instantly in your browser

**✅ You're Ready!** The template is now running. Continue to the Customization Guide to make it
yours.

---

## Customization guide

### Step 1: Business information setup

**Location:** `src/data/businessInfo.ts`

Replace placeholder information with your business details:

```typescript
export const businessInfo = {
  // Basic Business Info
  name: "[YOUR_BUSINESS_NAME]",
  tagline: "[YOUR_TAGLINE]",
  description: "[YOUR_BUSINESS_DESCRIPTION]",

  // Contact Information
  contact: {
    phone: "[YOUR_PHONE_NUMBER]",
    email: "[YOUR_EMAIL_ADDRESS]",
    website: "[YOUR_WEBSITE_URL]",
  },

  // Business Address
  address: {
    street: "[YOUR_STREET_ADDRESS]",
    city: "[YOUR_CITY]",
    state: "[YOUR_STATE]",
    zipCode: "[YOUR_ZIP_CODE]",
    country: "[YOUR_COUNTRY]",
  },

  // Operating Hours
  hours: {
    monday: { open: "[MONDAY_OPEN_TIME]", close: "[MONDAY_CLOSE_TIME]" },
    tuesday: { open: "[TUESDAY_OPEN_TIME]", close: "[TUESDAY_CLOSE_TIME]" },
    // ... customize for your schedule
  },
};
```

### Step 2: Customize content structure

**Choose your business type pattern:**

#### For service business:

```typescript
// Update these constants in your files
const CONTENT_TYPE = "services";
const PRIMARY_SECTION = "Services";
const SECONDARY_SECTION = "Portfolio";
const TERTIARY_SECTION = "Testimonials";
```

#### For restaurant/cafe:

```typescript
const CONTENT_TYPE = "menu";
const PRIMARY_SECTION = "Menu";
const SECONDARY_SECTION = "About";
const TERTIARY_SECTION = "Events";
```

#### For retail store:

```typescript
const CONTENT_TYPE = "products";
const PRIMARY_SECTION = "Products";
const SECONDARY_SECTION = "Features";
const TERTIARY_SECTION = "Reviews";
```

### Step 3: Update component names

**Rename files and folders to match your business:**

1. **Rename section components**

   ```
   src/components/FeaturesSection/ → src/components/ServicesSection/
   src/components/ServicesSection/ → src/components/PortfolioSection/
   ```

2. **Update component imports**

   ```typescript
   // In src/pages/HomePage.tsx
   import { ServicesSection } from "../components/ServicesSection";
   import { PortfolioSection } from "../components/PortfolioSection";
   ```

3. **Update component names in JSX**
   ```typescript
   export const HomePage: React.FC = () => {
     return (
       <Layout>
         <HeroSection />
         <ServicesSection />
         <PortfolioSection />
         <Footer />
       </Layout>
     );
   };
   ```

### Step 4: Customize visual branding

**Location:** `src/styles/globals.css`

Update CSS custom properties to match your brand:

```css
:root {
  /* Primary Brand Colors */
  --color-primary: [YOUR_PRIMARY_COLOR];
  --color-secondary: [YOUR_SECONDARY_COLOR];
  --color-accent: [YOUR_ACCENT_COLOR];

  /* Typography */
  --font-family-primary: "[YOUR_PRIMARY_FONT]", sans-serif;
  --font-family-secondary: "[YOUR_SECONDARY_FONT]", serif;

  /* Spacing (adjust to your preference) */
  --spacing-xs: [YOUR_XS_SPACING];
  --spacing-sm: [YOUR_SM_SPACING];
  --spacing-md: [YOUR_MD_SPACING];
  --spacing-lg: [YOUR_LG_SPACING];
  --spacing-xl: [YOUR_XL_SPACING];
}
```

### Step 5: Add your content

**For services business example:**

1. **Create service data**

   ```typescript
   // src/data/services.ts
   export interface Service {
     id: string;
     title: string;
     description: string;
     features: string[];
     price?: string;
     imageUrl?: string;
   }

   export const services: Service[] = [
     {
       id: "web-design",
       title: "[SERVICE_TITLE]",
       description: "[SERVICE_DESCRIPTION]",
       features: ["[FEATURE_1]", "[FEATURE_2]", "[FEATURE_3]"],
       price: "[SERVICE_PRICE]",
     },
     // Add more services...
   ];
   ```

2. **Update homepage sections**

   ```typescript
   // src/components/ServicesSection/ServicesSection.tsx
   import { services } from '../../data/services';

   export const ServicesSection: React.FC = () => {
     return (
       <section className={styles.section}>
         <div className={styles.container}>
           <h2>Our Services</h2>
           <div className={styles.servicesGrid}>
             {services.map(service => (
               <ServiceCard key={service.id} service={service} />
             ))}
           </div>
         </div>
       </section>
     );
   };
   ```

---

## 📁 File Structure Explanation

### Core Directories

```
src/
├── components/          # Reusable UI components
│   ├── Header/         # Site navigation and branding
│   ├── HeroSection/    # Main banner/hero area
│   ├── Footer/         # Site footer with contact info
│   ├── Layout/         # Page layout wrapper
│   └── [Business-Specific]/  # Your custom sections
├── pages/              # Full page components
│   ├── HomePage.tsx    # Main landing page
│   ├── AboutPage.tsx   # About your business
│   └── ContactPage.tsx # Contact information
├── data/               # Business data and content
│   ├── businessInfo.ts # Core business information
│   └── [content].ts    # Your specific content data
├── hooks/              # Custom React hooks
├── utils/              # Helper functions
├── styles/             # Global styles and variables
│   ├── globals.css     # Global styles and CSS variables
│   └── index.css       # Base styles and imports
└── types/              # TypeScript type definitions
```

### Key Files Explained

#### `src/data/businessInfo.ts`

- **Purpose:** Single source of truth for all business information
- **Contains:** Contact details, hours, address, social media links
- **Usage:** Imported by Header, Footer, and Contact components

#### `src/components/Layout/Layout.tsx`

- **Purpose:** Provides consistent page structure
- **Contains:** Header, main content area, Footer
- **Usage:** Wraps all page components

#### `src/styles/globals.css`

- **Purpose:** Defines design system and CSS variables
- **Contains:** Colors, typography, spacing, breakpoints
- **Usage:** Variables used throughout all component CSS modules

#### Component Structure Pattern

```
ComponentName/
├── ComponentName.tsx          # React component
├── ComponentName.module.css   # Component-specific styles
└── index.ts                   # Clean export for imports
```

---

## ⚙️ Configuration Options

### Environment Variables

Create `.env.local` file in project root:

```env
# API Configuration
VITE_API_URL=https://your-api.com/api
VITE_CONTACT_FORM_ENDPOINT=https://your-form-handler.com

# Analytics (optional)
VITE_GA_TRACKING_ID=GA_MEASUREMENT_ID
VITE_GTM_ID=GTM-XXXXXXX

# Feature Flags
VITE_ENABLE_BLOG=true
VITE_ENABLE_ECOMMERCE=false
VITE_ENABLE_BOOKING=true
```

### Build Configuration

**Vite Config (`vite.config.ts`):**

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@components": resolve(__dirname, "./src/components"),
      "@pages": resolve(__dirname, "./src/pages"),
      "@utils": resolve(__dirname, "./src/utils"),
      "@styles": resolve(__dirname, "./src/styles"),
    },
  },
  // Add your build optimizations here
});
```

### Responsive Breakpoints

**Location:** `src/styles/globals.css`

```css
:root {
  --breakpoint-mobile: 480px;
  --breakpoint-tablet: 768px;
  --breakpoint-desktop: 1024px;
  --breakpoint-wide: 1200px;
}
```

### Color System

**Customizable color palette:**

```css
:root {
  /* Primary Colors */
  --color-primary: #1a4d5c;
  --color-primary-light: #2d6b7b;
  --color-primary-dark: #0d3742;

  /* Secondary Colors */
  --color-secondary: #f4a261;
  --color-accent: #e76f51;

  /* Neutral Colors */
  --color-background: #ffffff;
  --color-surface: #f8f9fa;
  --color-text-primary: #2c3e50;
  --color-text-secondary: #6c757d;

  /* Status Colors */
  --color-success: #28a745;
  --color-warning: #ffc107;
  --color-error: #dc3545;
  --color-info: #17a2b8;
}
```

---

## 💡 Generic Examples

### Universal Contact Section

```typescript
// Works for any business type
interface ContactSectionProps {
  title?: string;
  subtitle?: string;
  showMap?: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  title = "Get In Touch",
  subtitle = "We'd love to hear from you",
  showMap = true
}) => {
  return (
    <section className={styles.contactSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>

        <div className={styles.contactGrid}>
          <div className={styles.contactInfo}>
            <ContactItem
              icon="phone"
              label="Phone"
              value={businessInfo.contact.phone}
              href={`tel:${businessInfo.contact.phone}`}
            />
            <ContactItem
              icon="email"
              label="Email"
              value={businessInfo.contact.email}
              href={`mailto:${businessInfo.contact.email}`}
            />
            <ContactItem
              icon="location"
              label="Address"
              value={formatAddress(businessInfo.address)}
            />
          </div>

          {showMap && (
            <div className={styles.mapContainer}>
              {/* Map component or placeholder */}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
```

### Universal Hero Section

```typescript
interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  primaryAction?: {
    text: string;
    href: string;
  };
  secondaryAction?: {
    text: string;
    href: string;
  };
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  backgroundImage,
  primaryAction,
  secondaryAction
}) => {
  const heroStyle = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})` }
    : {};

  return (
    <section className={styles.hero} style={heroStyle}>
      <div className={styles.heroOverlay}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.subtitle}>{subtitle}</p>

            <div className={styles.actions}>
              {primaryAction && (
                <a
                  href={primaryAction.href}
                  className={styles.primaryButton}
                >
                  {primaryAction.text}
                </a>
              )}
              {secondaryAction && (
                <a
                  href={secondaryAction.href}
                  className={styles.secondaryButton}
                >
                  {secondaryAction.text}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
```

### Universal Content Card

```typescript
interface ContentCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  tags?: string[];
  price?: string;
  actionText?: string;
  onAction?: () => void;
  href?: string;
}

export const ContentCard: React.FC<ContentCardProps> = ({
  title,
  description,
  imageUrl,
  tags,
  price,
  actionText = "Learn More",
  onAction,
  href
}) => {
  const CardWrapper = href ? 'a' : 'div';

  return (
    <CardWrapper
      className={styles.card}
      href={href}
      onClick={onAction}
    >
      {imageUrl && (
        <div className={styles.imageContainer}>
          <img src={imageUrl} alt={title} className={styles.image} />
        </div>
      )}

      <div className={styles.content}>
        {tags && tags.length > 0 && (
          <div className={styles.tags}>
            {tags.map(tag => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        )}

        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>

        <div className={styles.footer}>
          {price && (
            <span className={styles.price}>{price}</span>
          )}
          <span className={styles.action}>{actionText}</span>
        </div>
      </div>
    </CardWrapper>
  );
};
```

---

## 🔧 Troubleshooting

### Common Setup Issues

#### "Module not found" errors

**Problem:** Import paths not working **Solution:**

1. Check `vite.config.ts` has correct path aliases
2. Restart development server after config changes
3. Use absolute imports: `@components/Button` instead of `../components/Button`

#### Styles not applying

**Problem:** CSS Modules not working **Solution:**

1. Ensure files end with `.module.css`
2. Import as: `import styles from './Component.module.css'`
3. Use: `className={styles.className}` not `className="className"`

#### TypeScript errors

**Problem:** Type definitions missing **Solution:**

1. Check `src/vite-env.d.ts` exists
2. Add missing type definitions:
   ```typescript
   declare module "*.module.css" {
     const classes: { [key: string]: string };
     export default classes;
   }
   ```

#### Build fails

**Problem:** Production build errors **Solution:**

1. Run type check: `npm run type-check`
2. Check for unused imports
3. Verify all environment variables are set

### Development Issues

#### Hot reload not working

**Solutions:**

1. Restart dev server: `npm run dev`
2. Clear browser cache
3. Check file is saved correctly

#### Components not updating

**Solutions:**

1. Check file naming conventions (PascalCase for components)
2. Verify exports are correct: `export const Component`
3. Check import statements match export names

#### CSS changes not reflecting

**Solutions:**

1. Hard refresh browser (Ctrl+Shift+R)
2. Check CSS file is imported correctly
3. Verify CSS variable names are correct

---

## 🚀 Development Workflow

### Recommended Development Process

#### 1. Planning Phase

- [ ] Define your business type and content structure
- [ ] List all sections needed for your website
- [ ] Gather all content (text, images, contact info)
- [ ] Choose color scheme and fonts

#### 2. Setup Phase

- [ ] Follow Quick Start guide
- [ ] Update `businessInfo.ts` with real data
- [ ] Customize color variables in `globals.css`
- [ ] Test development server works

#### 3. Customization Phase

- [ ] Rename components to match your business
- [ ] Update component content and structure
- [ ] Add your specific data files
- [ ] Customize styling for your brand

#### 4. Content Phase

- [ ] Add real text content
- [ ] Optimize and add images
- [ ] Set up contact forms (if needed)
- [ ] Add any business-specific features

#### 5. Testing Phase

- [ ] Test on different screen sizes
- [ ] Check all links work
- [ ] Verify contact information is correct
- [ ] Test performance with dev tools

#### 6. Deployment Phase

- [ ] Build for production: `npm run build`
- [ ] Test production build locally: `npm run preview`
- [ ] Deploy to your hosting service
- [ ] Set up domain and SSL

### Daily Development Commands

```bash
# Start development
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint
npm run lint:fix

# Build for production
npm run build

# Preview production build
npm run preview
```

### File Organization Tips

1. **Keep components small and focused**

   - One responsibility per component
   - Extract reusable parts into separate components

2. **Use consistent naming**

   - PascalCase for components: `ContactForm`
   - camelCase for variables: `contactInfo`
   - kebab-case for CSS classes: `contact-form`

3. **Organize by feature**

   ```
   src/features/contact/
   ├── components/
   ├── hooks/
   ├── utils/
   └── types/
   ```

4. **Keep data separate from components**
   - Business data in `src/data/`
   - Component logic in components
   - Utility functions in `src/utils/`

### Code Quality Checklist

Before committing code:

- [ ] No TypeScript errors
- [ ] No linting errors
- [ ] All imports are used
- [ ] CSS follows naming conventions
- [ ] Components have proper TypeScript interfaces
- [ ] Responsive design works on mobile
- [ ] Accessibility attributes are present
- [ ] Performance is acceptable (no unnecessary re-renders)

### Getting Help

**Template Issues:**

- Check this usage guide first
- Review the cursor rules files for coding standards
- Look at existing component examples

**React/TypeScript Issues:**

- Official React documentation
- TypeScript handbook
- Vite documentation

**CSS/Styling Issues:**

- MDN CSS documentation
- CSS-Tricks for techniques
- Can I Use for browser support

---

**🎉 You're Ready to Build!** This template provides a solid foundation for any business website.
Customize it step by step, and don't hesitate to modify anything to better fit your specific needs.
