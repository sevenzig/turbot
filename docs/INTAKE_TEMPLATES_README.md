# Business Website Intake Templates

This directory contains comprehensive client intake templates for generating industry-specific business websites. Each template captures all the essential business information needed to create a professional, conversion-optimized website.

## 📁 Available Templates

### **Law Firms & Legal Practices**
**File:** `law-firm-intake-template.json`  
**Example:** `law-firm-intake-example.json`  
**Usage:** `npm run init -- --config [law-firm-name]-intake.json`
- Attorney profiles with credentials and specializations
- Practice areas with urgency levels and FAQ sections
- Case results and client testimonials
- Emergency contact system for urgent legal matters
- Legal disclaimers and attorney-client privilege notices
- Multiple consultation types (phone, video, in-person)
- Bar association memberships and certifications

### **Restaurants & Food Service**
**File:** `restaurant-intake.json`  
**Usage:** `npm run init -- --config [restaurant-name]-intake.json`
- Menu categories and signature dishes
- Chef profiles and culinary credentials
- Dining experience details (atmosphere, seating, music)
- Beverage programs (wine, cocktails, beer)
- Reservation and catering services
- Special events and seasonal menus
- Food delivery and takeout options
- Dietary accommodations and allergen information

### **Healthcare & Medical Practices**
**File:** `healthcare-intake.json`  
**Usage:** `npm run init -- --config [practice-name]-intake.json`
- Physician profiles with board certifications
- Medical services and specializations
- Insurance acceptance and billing policies
- Patient portal and telemedicine options
- HIPAA compliance and privacy policies
- Hospital affiliations and emergency procedures
- Appointment scheduling and cancellation policies
- Patient education and wellness programs

### **Retail Stores & E-commerce**
**File:** `retail-intake.json`  
**Usage:** `npm run init -- --config [store-name]-intake.json`
- Product categories and inventory details
- Brand partnerships and exclusive items
- E-commerce platform integration
- Shipping and pickup options
- Return and exchange policies
- Loyalty programs and promotions
- Staff expertise and personal shopping services
- Seasonal sales and special events

### **Consulting Firms**
**File:** `consulting-intake.json`  
**Usage:** `npm run init -- --config [firm-name]-intake.json`
- Consultant profiles with industry experience
- Service offerings and methodologies
- Case studies and client success stories
- Industry specializations and expertise
- Engagement process and pricing models
- Thought leadership and publications
- Strategic partnerships and alliances
- Project inquiry and proposal processes

### **Fitness Studios & Gyms**
**File:** `fitness-intake.json`  
**Usage:** `npm run init -- --config [gym-name]-intake.json`
- Equipment lists and facility amenities
- Class schedules and program descriptions
- Trainer profiles and certifications
- Membership options and pricing
- Personal training services
- Health and safety protocols
- Fitness challenges and special events
- Nutrition and wellness programs

### **Beauty Salons & Spas**
**File:** `beauty-intake.json`  
**Usage:** `npm run init -- --config [salon-name]-intake.json`
- Service menus (hair, nails, skincare)
- Staff profiles and specializations
- Product lines and retail offerings
- Appointment booking and policies
- Bridal and special event services
- Pricing packages and promotions
- Health and safety protocols
- Client testimonials and portfolio

### **Real Estate Agencies**
**File:** `realestate-intake.json`  
**Usage:** `npm run init -- --config [agency-name]-intake.json`
- Agent profiles with licenses and specializations
- Service areas and market expertise
- Buyer and seller services with commission structures
- Property types and market statistics
- Client success stories and testimonials
- Marketing tools and technology platforms
- MLS integration and property search features
- Market reports and valuation tools

### **Home Services & Contractors**
**File:** `homeservices-intake.json`  
**Usage:** `npm run init -- --config [company-name]-intake.json`
- Service team with certifications and specializations
- HVAC, plumbing, electrical, landscaping services
- Emergency services and maintenance programs
- Equipment specifications and technology systems
- Licensing, insurance, and warranty information
- Service areas with travel fees and response times
- Safety protocols and compliance standards
- Online booking and estimate calculators

### **Auto Repair Shops**
**File:** `autorepair-intake.json`  
**Usage:** `npm run init -- --config [shop-name]-intake.json`
- Technician team with ASE certifications
- Vehicle specializations and manufacturer certifications
- Diagnostic equipment and shop technology
- Parts suppliers and warranty programs
- Service packages and pricing structures
- Customer amenities and communication methods
- Towing services and emergency assistance
- Fleet services and insurance claim handling

### **Creative Services & Design Agencies**
**File:** `creative-intake.json`  
**Usage:** `npm run init -- --config [agency-name]-intake.json`
- Creative team profiles with portfolios and awards
- Design services, marketing, and digital solutions
- Tools, software, and equipment specifications
- Client portfolio with case studies and results
- Creative process and project management methodology
- Pricing packages and service delivery methods
- Partnerships and collaboration preferences
- Awards, recognition, and press features

## 🚀 How to Use These Templates

### 1. **Choose Your Industry Template**
Select the template that best matches your client's business type from the available options above.

### 2. **Copy & Customize Template**
Copy the relevant template and rename it for your specific client:
```bash
# Example: Copy template for a law firm client
cp intake-templates/law-firm-intake-template.json my-law-firm-intake.json

# Example: Copy template for a restaurant client  
cp intake-templates/restaurant-intake.json joes-bistro-intake.json
```

### 3. **Fill Out Client Information**
Replace all placeholder values (written in `ALL_CAPS`) with actual client details:
- `FULL_BUSINESS_NAME` → "Smith & Associates Law Firm"
- `BUSINESS_PHONE` → "(555) 123-4567"
- `PRIMARY_SERVICE_1` → "Personal Injury Law"
- `BUSINESS_STREET` → "123 Main Street"
- `BUSINESS_CITY` → "Springfield"

### 4. **Generate Website**
Use the npm init command with your completed intake file:

**Law Firm Example:**
```bash
npm run init -- --config smith-associates-intake.json
```

**Restaurant Example:**
```bash
npm run init -- --config joes-bistro-intake.json
```

**Auto Repair Shop Example:**
```bash
npm run init -- --config mikes-auto-repair-intake.json
```

**Real Estate Agency Example:**
```bash
npm run init -- --config downtown-realty-intake.json
```

### 5. **Review Generated Website**
The system will generate a complete website based on your intake template with:
- Industry-specific components and layouts
- Customized content and forms
- Appropriate feature flags enabled
- SEO optimization for the business type

### 6. **Customize & Deploy**
After generation, make any final customizations and deploy to your preferred platform.

## 📋 Template Structure

Each template is organized into standardized sections:

### **Core Sections (All Templates)**
1. **Project & Developer Info** - Your information and project setup
2. **Core Business Information** - Business name, tagline, description
3. **Contact Information** - Phone, email, emergency contacts
4. **Physical Address** - Location and facility details
5. **Website & Branding** - Colors, logo, domain
6. **Social Media** - All social platform links
7. **Business Hours** - Operating hours and availability
8. **Services/Products** - Main offerings and specializations
9. **Staff/Team** - Professional profiles and credentials
10. **Customer Testimonials** - Reviews and success stories
11. **Pricing & Policies** - Payment, cancellation, terms
12. **Content Customization** - Copy and messaging
13. **Form Configuration** - Contact forms and labels
14. **Technical Settings** - Deployment and features
15. **SEO & Marketing** - Keywords and local optimization

### **Industry-Specific Sections**
Each template includes additional sections tailored to the industry:

- **Legal:** Emergency contact, case results, legal disclaimers
- **Restaurant:** Menu items, chef profiles, reservation systems
- **Healthcare:** Insurance, HIPAA compliance, patient portal
- **Retail:** Inventory, e-commerce, shipping policies
- **Consulting:** Case studies, methodologies, thought leadership
- **Fitness:** Equipment, classes, membership options
- **Beauty:** Treatment menus, appointment booking, product lines

## 🎯 Business Benefits

### **For You (Developer/Agency)**
- **Streamlined Client Onboarding** - Comprehensive data collection
- **Professional Process** - Organized, thorough intake system
- **Faster Website Generation** - All information ready for setup
- **Industry Expertise** - Templates show deep business understanding
- **Consistent Quality** - Ensures no important details are missed

### **For Your Clients**
- **Comprehensive Online Presence** - All business aspects covered
- **Industry-Specific Features** - Built for their specific needs
- **Professional Credibility** - Trust-building elements included
- **Conversion Optimization** - Forms and CTAs designed for results
- **SEO-Ready Content** - Keywords and local optimization included

## 📝 Customization Tips

### **Content Quality**
- Use professional, industry-appropriate language
- Focus on benefits, not just features
- Include specific credentials and qualifications
- Highlight unique selling propositions

### **Visual Elements**
- Choose colors that match industry expectations
- Use high-quality professional photos
- Maintain consistent branding throughout
- Optimize images for web performance

### **Local SEO**
- Include location-specific keywords
- Add service area information
- Set up Google My Business categories
- Include local landmarks and neighborhoods

## 🔄 Template Updates

These templates are living documents that evolve based on:
- Industry best practices
- Client feedback and requirements
- New technology features
- Regulatory changes (especially for healthcare and legal)

## 💡 Best Practices

### **Before Client Meeting**
1. Review the relevant industry template
2. Prepare any industry-specific questions
3. Understand unique business requirements
4. Research local competitors and market conditions

### **During Data Collection**
1. Complete every section thoroughly
2. Ask for specific examples and details
3. Collect high-quality photos and materials
4. Verify contact information accuracy

### **After Template Completion**
1. Review with client for accuracy
2. Generate test website
3. Collect feedback and refine
4. Deploy to production environment

## 📞 Support

For questions about these templates or website generation:
- Review the main project documentation
- Check the example files for reference
- Consult industry-specific best practices
- Test thoroughly before client delivery

## 🔗 Quick Reference Commands

**Copy any template and generate a website:**

```bash
# Law Firm
cp intake-templates/law-firm-intake-template.json [client-name]-intake.json
npm run init -- --config [client-name]-intake.json

# Restaurant  
cp intake-templates/restaurant-intake.json [client-name]-intake.json
npm run init -- --config [client-name]-intake.json

# Healthcare
cp intake-templates/healthcare-intake.json [client-name]-intake.json
npm run init -- --config [client-name]-intake.json

# Retail Store
cp intake-templates/retail-intake.json [client-name]-intake.json
npm run init -- --config [client-name]-intake.json

# Consulting Firm
cp intake-templates/consulting-intake.json [client-name]-intake.json
npm run init -- --config [client-name]-intake.json

# Fitness/Gym
cp intake-templates/fitness-intake.json [client-name]-intake.json
npm run init -- --config [client-name]-intake.json

# Beauty Salon/Spa
cp intake-templates/beauty-intake.json [client-name]-intake.json
npm run init -- --config [client-name]-intake.json

# Real Estate Agency
cp intake-templates/realestate-intake.json [client-name]-intake.json
npm run init -- --config [client-name]-intake.json

# Home Services
cp intake-templates/homeservices-intake.json [client-name]-intake.json
npm run init -- --config [client-name]-intake.json

# Auto Repair Shop
cp intake-templates/autorepair-intake.json [client-name]-intake.json
npm run init -- --config [client-name]-intake.json

# Creative Services
cp intake-templates/creative-intake.json [client-name]-intake.json
npm run init -- --config [client-name]-intake.json
```

---

**Note:** These templates are designed to capture comprehensive business information. Not every field may apply to every business, but having complete information ensures the best possible website outcome. 