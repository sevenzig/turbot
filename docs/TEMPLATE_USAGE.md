# Business Website Templates

This package provides multiple pre-configured templates for different types of businesses. Each template includes industry-appropriate defaults, colors, content, and features.

## Quick Start

### Using npm init (Recommended)

```bash
# For a basic business website
npm init business-website@latest my-business -- --template=basic

# For a healthcare practice
npm init business-website@latest my-practice -- --template=healthcare

# For a retail store
npm init business-website@latest my-store -- --template=retail

# For a real estate agency
npm init business-website@latest my-realty -- --template=realestate

# For a fitness studio
npm init business-website@latest my-gym -- --template=fitness

# For a law firm
npm init business-website@latest my-lawfirm -- --template=law

# For a beauty salon
npm init business-website@latest my-salon -- --template=beauty

# For an auto repair shop
npm init business-website@latest my-autoshop -- --template=autorepair

# For a creative agency
npm init business-website@latest my-agency -- --template=creative

# For home services
npm init business-website@latest my-services -- --template=homeservices

# For a brewery website  
npm init business-website@latest my-brewery -- --template=brewery

# For a restaurant website
npm init business-website@latest my-restaurant -- --template=restaurant

# For a consulting firm website
npm init business-website@latest my-consulting -- --template=consulting
```

### Using Direct Installation

1. **Clone or download this template**
2. **Run the initialization script:**

```bash
# Interactive template selection
npm run init

# Or use a specific template directly
npm run init:basic
npm run init:healthcare
npm run init:retail
npm run init:realestate
npm run init:fitness
npm run init:law
npm run init:beauty
npm run init:autorepair
npm run init:creative
npm run init:homeservices
npm run init:brewery  
npm run init:restaurant
npm run init:consulting
```

## Available Templates

### 🏢 Basic Business Template
**Usage:** `npm run init:basic`

- **Best for:** General businesses, professional services, agencies
- **Colors:** Professional blue (#2563EB) and warm gold (#F59E0B)
- **Features:** Contact form, business hours, basic services showcase
- **Services:** Professional Services, Expert Consultation, Quality Solutions, Ongoing Support

### 🏥 Healthcare/Medical Practice
**Usage:** `npm run init:healthcare`

- **Best for:** Medical practices, clinics, healthcare providers
- **Colors:** Medical teal (#0F766E) and emergency red (#DC2626)
- **Features:** Appointment booking, patient care focus, medical hours
- **Services:** Primary Care, Preventive Medicine, Urgent Care, Specialized Treatment
- **Special:** HIPAA compliance considerations, emergency contact options

### 🏪 Retail Store
**Usage:** `npm run init:retail`

- **Best for:** Retail stores, boutiques, product-based businesses
- **Colors:** Retail purple (#7C3AED) and sale gold (#F59E0B)
- **Features:** Product showcase, PWA support, extended retail hours
- **Services:** In-Store Shopping, Online Ordering, Custom Orders, Gift Services
- **Special:** E-commerce focus, customer loyalty features

### 🏡 Real Estate Agency
**Usage:** `npm run init:realestate`

- **Best for:** Real estate agencies, agents, property professionals
- **Colors:** Trust blue (#1E40AF) and success green (#059669)
- **Features:** Property focus, market insights, extended weekend hours
- **Services:** Home Buying, Home Selling, Market Analysis, Investment Properties
- **Special:** Blog for market updates, consultation-focused CTAs

### 💪 Fitness Studio/Gym
**Usage:** `npm run init:fitness`

- **Best for:** Fitness studios, gyms, wellness centers
- **Colors:** Energy red (#DC2626) and strong black (#1F2937)
- **Features:** Early/late hours, class scheduling, PWA support
- **Services:** Personal Training, Group Classes, Nutrition Coaching, Membership Plans
- **Special:** Extended hours (5 AM - 10 PM), fitness-focused CTAs

### ⚖️ Law Firm
**Usage:** `npm run init:law`

- **Best for:** Law firms, attorneys, legal professionals
- **Colors:** Professional black (#1F2937) and authority red (#B91C1C)
- **Features:** Legal consultation, attorney profiles, blog capability
- **Services:** Corporate Law, Personal Injury, Family Law, Estate Planning
- **Special:** Emergency-only Sundays, confidential consultation focus

### 💅 Beauty Salon/Spa
**Usage:** `npm run init:beauty`

- **Best for:** Beauty salons, spas, wellness centers
- **Colors:** Beauty pink (#EC4899) and luxury purple (#A855F7)
- **Features:** Service booking, treatment focus, PWA support
- **Services:** Hair Styling, Skincare Treatments, Nail Services, Spa Packages
- **Special:** Closed Mondays, extended weekend hours

### 🔧 Auto Repair Shop
**Usage:** `npm run init:autorepair`

- **Best for:** Auto repair shops, automotive services, mechanics
- **Colors:** Mechanic black (#0F172A) and caution yellow (#EAB308)
- **Features:** Service estimates, trust building, early morning hours
- **Services:** General Repairs, Oil Changes, Brake Service, Diagnostic Testing
- **Special:** Early hours (7 AM start), closed Sundays

### 🎨 Creative Agency
**Usage:** `npm run init:creative`

- **Best for:** Creative agencies, design studios, marketing firms
- **Colors:** Creative purple (#7C3AED) and inspiration orange (#F59E0B)
- **Features:** Portfolio showcase, blog capability, PWA support
- **Services:** Brand Design, Web Development, Marketing Strategy, Content Creation
- **Special:** Creative-focused CTAs, project inquiry forms

### 🏠 Home Services
**Usage:** `npm run init:homeservices`

- **Best for:** Home services, contractors, maintenance professionals
- **Colors:** Reliable green (#059669) and emergency red (#DC2626)
- **Features:** Emergency contact, service areas, estimate requests
- **Services:** Plumbing, Electrical, HVAC, Emergency Repairs
- **Special:** Emergency-only Sundays, long service hours

### 🍺 Brewery Template  
**Usage:** `npm run init:brewery`

- **Best for:** Craft breweries, taprooms, beer production facilities
- **Colors:** Craft brown (#8B4513) and golden ale (#DAA520)
- **Features:** Taproom hours, beer showcase, events, testimonials
- **Services:** Craft Beer on Tap, Beer To-Go, Private Events, Brewery Tours
- **Special:** Brewery-specific business hours (closed Mondays, weekend focus)

### 🍽️ Restaurant Template
**Usage:** `npm run init:restaurant`

- **Best for:** Restaurants, cafes, fine dining establishments
- **Colors:** Appetizing red (#DC2626) and fresh green (#059669) 
- **Features:** Dining hours, menu showcase, reservations, catering
- **Services:** Fine Dining, Private Events, Catering, Wine Selection
- **Special:** Restaurant-appropriate hours, reservation CTAs

### 💼 Consulting Firm Template
**Usage:** `npm run init:consulting`

- **Best for:** Business consultants, professional services firms
- **Colors:** Trustworthy blue (#1E40AF) and growth green (#059669)
- **Features:** Business hours, blog capability, case studies, testimonials
- **Services:** Strategic Planning, Process Optimization, Change Management, Performance Analytics
- **Special:** Professional business hours, thought leadership focus

## Customization Process

When you run any template, you'll be prompted to provide:

### Required Information
- **Your name** - For package.json author
- **Your email** - For contact and package.json
- **GitHub username** - For repository setup
- **Business name** - Your business name
- **Business phone** - Customer contact number  
- **Business email** - Customer contact email
- **Business address** - Street, city, state, ZIP

### Generated Automatically
- Project name (from business name)
- Repository URL (from GitHub username + project name)
- Formatted phone numbers and links
- Business short name
- Website domain extraction
- Site title and meta descriptions

## Template Features Comparison

| Feature | Basic | Healthcare | Retail | Real Estate | Fitness | Law | Beauty | Auto | Creative | Home | Brewery | Restaurant | Consulting |
|---------|-------|------------|--------|-------------|---------|-----|--------|------|----------|------|---------|------------|------------|
| Contact Form | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Business Hours | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Social Links | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| SEO Optimization | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Testimonials | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Blog Capability | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ✅ |
| Analytics Ready | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| PWA Support | ❌ | ❌ | ✅ | ❌ | ✅ | ❌ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Extended Hours | ❌ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ | ❌ | ✅ | ✅ | ❌ | ❌ |
| Emergency Contact | ❌ | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |

## File Structure After Initialization

```
my-business-website/
├── src/
│   ├── components/          # React components
│   ├── data/
│   │   └── businessInfo.ts  # Your business data (single source of truth)
│   ├── pages/              # Route pages
│   ├── styles/             # CSS and styling
│   └── ...
├── public/                 # Static assets
├── presets/               # Template configurations
└── package.json           # Configured with your details
```

## Next Steps After Initialization

1. **Install dependencies:** `npm install`
2. **Start development:** `npm run dev`
3. **Customize your content** in `src/data/businessInfo.ts`
4. **Add your images** to `public/images/`
5. **Deploy:** `npm run deploy`

## Advanced Usage

### Creating Custom Templates

1. Create a new config file in `presets/`:
```json
{
  "businessName": "[BUSINESS_NAME]", 
  "businessTagline": "Your custom tagline",
  "primaryColor": "#YOUR_COLOR",
  // ... other configuration
}
```

2. Add a script to `package.json`:
```json
{
  "scripts": {
    "init:mytemplate": "npx tsx init-template.ts --config presets/mytemplate.config.json"
  }
}
```

### Using Configuration Files

You can create and use custom configuration files:

```bash
# Create your config
cp examples/configs/init-config.example.json my-config.json

# Edit with your details
# Then run:
npm run init -- --config my-config.json
```

## Template Development

Each template includes:
- **Industry-appropriate colors** - Carefully chosen for the business type
- **Relevant business hours** - Typical for the industry
- **Appropriate services** - Common offerings for the business type
- **Feature flags** - Enabled features that make sense for the industry
- **Professional copy** - Industry-appropriate messaging and calls-to-action

## Support & Documentation

- 📖 **Full Documentation:** See `README.md`
- 🐛 **Issues:** Report bugs in the GitHub repository  
- 💡 **Feature Requests:** Suggest new templates or improvements
- 🔧 **Development:** See `CONTRIBUTING.md` for development setup

## License

MIT - see `LICENSE` file for details. 