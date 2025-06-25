import inquirer from 'inquirer';
import { promises as fs } from 'fs';
import path from 'path';
import chalk from 'chalk';

// Type definitions
interface CommandLineFlags {
  dryRun: boolean;
  config: string | null;
  help: boolean;
}

interface BusinessConfig {
  // Core project information
  projectName: string;
  description: string;
  authorName: string;
  authorEmail: string;
  githubUsername: string;
  repositoryUrl: string;
  license: string;

  // Business information
  businessName: string;
  businessShortName?: string;
  businessTagline: string;
  businessDescription: string;
  businessShortDescription: string;

  // Contact information
  businessPhone: string;
  businessPhoneRaw: string;
  businessPhoneFormatted?: string;
  businessPhoneLink?: string;
  businessEmail: string;

  // Address
  businessStreet: string;
  businessCity: string;
  businessState: string;
  businessZip: string;
  businessAddress?: string;
  businessAddressFull?: string;
  businessLatitude: number;
  businessLongitude: number;

  // Website and branding
  websiteUrl: string;
  websiteDomain?: string;
  siteTitle?: string;
  siteDescription?: string;
  faviconUrl?: string;

  // Colors
  primaryColor: string;
  primaryColorHover?: string;
  primaryColorLight?: string;
  secondaryColor?: string;
  secondaryColorHover?: string;
  secondaryColorLight?: string;

  // Social media
  socialFacebook?: string;
  socialTwitter?: string;
  socialInstagram?: string;
  socialLinkedin?: string;
  socialFacebookUrl?: string;
  socialTwitterUrl?: string;
  socialInstagramUrl?: string;
  socialLinkedinUrl?: string;

  // Business hours
  hoursMonday: string;
  hoursTuesday: string;
  hoursWednesday: string;
  hoursThursday: string;
  hoursFriday: string;
  hoursSaturday: string;
  hoursSunday: string;

  // Features and services
  businessFeatures?: string[];
  businessServices?: string[];
  businessFeature1?: string;
  businessFeature2?: string;
  businessFeature3?: string;
  businessFeature4?: string;
  businessService1?: string;
  businessService2?: string;
  businessService3?: string;
  businessService4?: string;

  // Content
  heroTitlePrefix: string;
  ctaPrimaryText: string;
  ctaSecondaryText: string;

  // Section titles and descriptions
  featuresSectionTitle?: string;
  featuresDescriptionTemplate?: string;
  servicesSectionTitle?: string;
  servicesSectionDescription?: string;
  servicesDescriptionTemplate?: string;
  servicesCTAText?: string;
  aboutPageTitle?: string;
  aboutFeaturesTitle?: string;
  aboutServicesTitle?: string;
  contactPageTitle?: string;
  contactPageDescription?: string;
  contactInfoTitle?: string;
  contactPhoneLabel?: string;
  contactEmailLabel?: string;
  contactAddressLabel?: string;
  contactDirectionsText?: string;
  contactHoursLabel?: string;
  contactFormTitle?: string;
  formNameLabel?: string;
  formEmailLabel?: string;
  formSubjectLabel?: string;
  formMessageLabel?: string;
  formSubmitText?: string;
  formSendingText?: string;
  formSuccessMessage?: string;
  formErrorMessage?: string;
  error404Code?: string;
  error404Title?: string;
  error404Message?: string;
  error404HomeButton?: string;
  error404BackButton?: string;

  // Technical configuration
  deploymentPlatform: 'vercel' | 'netlify' | 'github-pages' | 'aws-amplify' | 'firebase' | 'other';
  includePWA: boolean;
  cssApproach: 'css-modules' | 'styled-components' | 'tailwind' | 'emotion' | 'vanilla-css';

  // Features
  features?: {
    analytics: boolean;
    seo: boolean;
    darkMode: boolean;
    contactForm: boolean;
    socialLinks: boolean;
    businessHours: boolean;
    testimonials: boolean;
    blog: boolean;
  };
}

interface ProcessingResults {
  total: number;
  successful: number;
  failed: number;
  skipped: number;
  details: Array<{
    file: string;
    status: 'success' | 'failed' | 'skipped';
    error?: string;
  }>;
}

interface ValidationResults {
  replacements: boolean;
  fileStructure: boolean;
  packageJson: boolean;
}

interface SetupResults {
  packageJson: boolean;
  features: boolean;
  git: boolean;
  cleanup: boolean;
  healthCheck: boolean;
}

interface ValidationIssue {
  file: string;
  line?: number | null;
  issue: string;
  content?: string | null;
  severity?: 'error' | 'warning';
}

interface FeatureOperations {
  filesAdded: string[];
  filesRemoved: string[];
  configurationsUpdated: string[];
}

// Command line argument parsing
function parseArguments(): CommandLineFlags {
  const args = process.argv.slice(2);
  const flags: CommandLineFlags = {
    dryRun: false,
    config: null,
    help: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '--dry-run' || arg === '-d') {
      flags.dryRun = true;
    } else if (arg === '--help' || arg === '-h') {
      flags.help = true;
    } else if (arg === '--config' || arg === '-c') {
      if (i + 1 < args.length) {
        flags.config = args[i + 1];
        i++; // Skip next argument as it's the config file path
      } else {
        console.error(chalk.red('❌ --config flag requires a file path'));
        process.exit(1);
      }
    } else if (arg.startsWith('--')) {
      console.error(chalk.red(`❌ Unknown flag: ${arg}`));
      console.log(chalk.yellow('💡 Use --help to see available options'));
      process.exit(1);
    }
  }

  return flags;
}

function showHelp(): void {
  console.log(
    chalk.blue(`
🚀 React + Vite Template Initializer

${chalk.bold('USAGE:')}
  npm run init [FLAGS]

${chalk.bold('FLAGS:')}
  -h, --help              Show this help message
  -d, --dry-run          Preview changes without applying them
  -c, --config <file>    Use configuration file instead of interactive prompts

${chalk.bold('EXAMPLES:')}
  ${chalk.gray('# Interactive mode (default)')}
  npm run init

  ${chalk.gray('# Preview changes without applying')}
  npm run init:dry-run

  ${chalk.gray('# Use configuration file')}
  npm run init -- --config my-config.json

  ${chalk.gray('# Preview with config file')}
  npm run init:dry-run -- --config my-config.json

${chalk.bold('CONFIG FILE FORMAT:')}
  ${chalk.gray('{')}
    ${chalk.gray('"projectName": "my-project",')}
    ${chalk.gray('"description": "My awesome project",')}
    ${chalk.gray('"authorName": "John Doe",')}
    ${chalk.gray('"authorEmail": "john@example.com",')}
    ${chalk.gray('"githubUsername": "johndoe",')}
    ${chalk.gray('"license": "MIT",')}
    ${chalk.gray('"businessName": "My Business",')}
    ${chalk.gray('"websiteUrl": "https://mybusiness.com",')}
    ${chalk.gray('"primaryColor": "#1a4d5c",')}
    ${chalk.gray('"deploymentPlatform": "vercel",')}
    ${chalk.gray('"includePWA": false,')}
    ${chalk.gray('"cssApproach": "css-modules"')}
  ${chalk.gray('}')}

${chalk.bold('NOTES:')}
  • Dry-run mode shows what would be changed without modifying files
  • Config files must be valid JSON
  • All configuration options from interactive mode are supported
  • Missing config values will use defaults or prompt for input
`)
  );
}

async function loadConfigFile(configPath: string): Promise<BusinessConfig> {
  try {
    console.log(chalk.blue(`📄 Loading configuration from ${configPath}...`));

    const configExists = await fs
      .access(configPath)
      .then(() => true)
      .catch(() => false);
    if (!configExists) {
      console.error(
        chalk.red(`❌ Configuration file not found: ${configPath}`)
      );
      process.exit(1);
    }

    const configContent = await fs.readFile(configPath, 'utf8');
    const config = JSON.parse(configContent) as Partial<BusinessConfig>;

    // Validate required fields
    const requiredFields: (keyof BusinessConfig)[] = [
      'projectName',
      'authorName',
      'authorEmail',
      'githubUsername',
    ];
    const missingFields = requiredFields.filter((field) => !config[field]);

    if (missingFields.length > 0) {
      console.error(
        chalk.red(
          `❌ Configuration file missing required fields: ${missingFields.join(', ')}`
        )
      );
      process.exit(1);
    }

    // Apply defaults for missing optional fields
    const configWithDefaults: BusinessConfig = {
      ...DEFAULT_CONFIG,
      ...config,
      repositoryUrl: `https://github.com/${config.githubUsername}/${config.projectName}`,
    } as BusinessConfig;

    console.log(chalk.green('✅ Configuration loaded successfully!'));
    console.log(chalk.gray(`  • Project: ${configWithDefaults.projectName}`));
    console.log(chalk.gray(`  • Author: ${configWithDefaults.authorName}`));
    console.log(
      chalk.gray(`  • Platform: ${configWithDefaults.deploymentPlatform}`)
    );

    return configWithDefaults;
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error(chalk.red('❌ Configuration file is not valid JSON:'));
      console.error(chalk.red(`  ${error.message}`));
    } else {
      console.error(
        chalk.red('❌ Error loading configuration file:'),
        (error as Error).message
      );
    }
    process.exit(1);
  }
}

// Configuration objects
const PLACEHOLDER_PATTERNS: Record<string, RegExp> = {
  // Core project placeholders
  PROJECT_NAME: /\[PROJECT_NAME\]/g,
  DESCRIPTION: /\[DESCRIPTION\]/g,
  AUTHOR_NAME: /\[AUTHOR_NAME\]/g,
  REPOSITORY_URL: /\[REPOSITORY_URL\]/g,

  // Basic business information
  BUSINESS_NAME: /\[BUSINESS_NAME\]/g,
  BUSINESS_SHORT_NAME: /\[BUSINESS_SHORT_NAME\]/g,
  BUSINESS_TAGLINE: /\[BUSINESS_TAGLINE\]/g,
  BUSINESS_DESCRIPTION: /\[BUSINESS_DESCRIPTION\]/g,
  BUSINESS_SHORT_DESCRIPTION: /\[BUSINESS_SHORT_DESCRIPTION\]/g,

  // Contact information
  BUSINESS_EMAIL: /\[BUSINESS_EMAIL\]/g,
  BUSINESS_PHONE_RAW: /\[BUSINESS_PHONE_RAW\]/g,
  BUSINESS_PHONE_FORMATTED: /\[BUSINESS_PHONE_FORMATTED\]/g,
  BUSINESS_PHONE_LINK: /\[BUSINESS_PHONE_LINK\]/g,

  // Address information
  BUSINESS_STREET: /\[BUSINESS_STREET\]/g,
  BUSINESS_CITY: /\[BUSINESS_CITY\]/g,
  BUSINESS_STATE: /\[BUSINESS_STATE\]/g,
  BUSINESS_ZIP: /\[BUSINESS_ZIP\]/g,
  BUSINESS_ADDRESS_FULL: /\[BUSINESS_ADDRESS_FULL\]/g,
  BUSINESS_LATITUDE: /\[BUSINESS_LATITUDE\]/g,
  BUSINESS_LONGITUDE: /\[BUSINESS_LONGITUDE\]/g,

  // Website and branding
  WEBSITE_URL: /\[WEBSITE_URL\]/g,
  WEBSITE_DOMAIN: /\[WEBSITE_DOMAIN\]/g,
  SITE_TITLE: /\[SITE_TITLE\]/g,
  SITE_DESCRIPTION: /\[SITE_DESCRIPTION\]/g,
  FAVICON_URL: /\[FAVICON_URL\]/g,

  // Brand colors
  PRIMARY_COLOR: /\[PRIMARY_COLOR\]/g,
  PRIMARY_COLOR_HOVER: /\[PRIMARY_COLOR_HOVER\]/g,
  PRIMARY_COLOR_LIGHT: /\[PRIMARY_COLOR_LIGHT\]/g,
  SECONDARY_COLOR: /\[SECONDARY_COLOR\]/g,
  SECONDARY_COLOR_HOVER: /\[SECONDARY_COLOR_HOVER\]/g,
  SECONDARY_COLOR_LIGHT: /\[SECONDARY_COLOR_LIGHT\]/g,

  // Social media
  SOCIAL_FACEBOOK_URL: /\[SOCIAL_FACEBOOK_URL\]/g,
  SOCIAL_INSTAGRAM_URL: /\[SOCIAL_INSTAGRAM_URL\]/g,
  SOCIAL_TWITTER_URL: /\[SOCIAL_TWITTER_URL\]/g,
  SOCIAL_LINKEDIN_URL: /\[SOCIAL_LINKEDIN_URL\]/g,

  // Business hours
  HOURS_MONDAY: /\[HOURS_MONDAY\]/g,
  HOURS_TUESDAY: /\[HOURS_TUESDAY\]/g,
  HOURS_WEDNESDAY: /\[HOURS_WEDNESDAY\]/g,
  HOURS_THURSDAY: /\[HOURS_THURSDAY\]/g,
  HOURS_FRIDAY: /\[HOURS_FRIDAY\]/g,
  HOURS_SATURDAY: /\[HOURS_SATURDAY\]/g,
  HOURS_SUNDAY: /\[HOURS_SUNDAY\]/g,

  // Business features and services
  BUSINESS_FEATURE_1: /\[BUSINESS_FEATURE_1\]/g,
  BUSINESS_FEATURE_2: /\[BUSINESS_FEATURE_2\]/g,
  BUSINESS_FEATURE_3: /\[BUSINESS_FEATURE_3\]/g,
  BUSINESS_FEATURE_4: /\[BUSINESS_FEATURE_4\]/g,
  BUSINESS_SERVICE_1: /\[BUSINESS_SERVICE_1\]/g,
  BUSINESS_SERVICE_2: /\[BUSINESS_SERVICE_2\]/g,
  BUSINESS_SERVICE_3: /\[BUSINESS_SERVICE_3\]/g,
  BUSINESS_SERVICE_4: /\[BUSINESS_SERVICE_4\]/g,

  // Website content and copy
  HERO_TITLE_PREFIX: /\[HERO_TITLE_PREFIX\]/g,
  CTA_PRIMARY_TEXT: /\[CTA_PRIMARY_TEXT\]/g,
  CTA_SECONDARY_TEXT: /\[CTA_SECONDARY_TEXT\]/g,

  // Features section
  FEATURES_SECTION_TITLE: /\[FEATURES_SECTION_TITLE\]/g,
  FEATURES_DESCRIPTION_TEMPLATE: /\[FEATURES_DESCRIPTION_TEMPLATE\]/g,

  // Services section
  SERVICES_SECTION_TITLE: /\[SERVICES_SECTION_TITLE\]/g,
  SERVICES_SECTION_DESCRIPTION: /\[SERVICES_SECTION_DESCRIPTION\]/g,
  SERVICES_DESCRIPTION_TEMPLATE: /\[SERVICES_DESCRIPTION_TEMPLATE\]/g,
  SERVICES_CTA_TEXT: /\[SERVICES_CTA_TEXT\]/g,

  // About page
  ABOUT_PAGE_TITLE: /\[ABOUT_PAGE_TITLE\]/g,
  ABOUT_FEATURES_TITLE: /\[ABOUT_FEATURES_TITLE\]/g,
  ABOUT_SERVICES_TITLE: /\[ABOUT_SERVICES_TITLE\]/g,

  // Contact page
  CONTACT_PAGE_TITLE: /\[CONTACT_PAGE_TITLE\]/g,
  CONTACT_PAGE_DESCRIPTION: /\[CONTACT_PAGE_DESCRIPTION\]/g,
  CONTACT_INFO_TITLE: /\[CONTACT_INFO_TITLE\]/g,
  CONTACT_PHONE_LABEL: /\[CONTACT_PHONE_LABEL\]/g,
  CONTACT_EMAIL_LABEL: /\[CONTACT_EMAIL_LABEL\]/g,
  CONTACT_ADDRESS_LABEL: /\[CONTACT_ADDRESS_LABEL\]/g,
  CONTACT_DIRECTIONS_TEXT: /\[CONTACT_DIRECTIONS_TEXT\]/g,
  CONTACT_HOURS_LABEL: /\[CONTACT_HOURS_LABEL\]/g,

  // Contact form
  CONTACT_FORM_TITLE: /\[CONTACT_FORM_TITLE\]/g,
  FORM_NAME_LABEL: /\[FORM_NAME_LABEL\]/g,
  FORM_EMAIL_LABEL: /\[FORM_EMAIL_LABEL\]/g,
  FORM_SUBJECT_LABEL: /\[FORM_SUBJECT_LABEL\]/g,
  FORM_MESSAGE_LABEL: /\[FORM_MESSAGE_LABEL\]/g,
  FORM_SUBMIT_TEXT: /\[FORM_SUBMIT_TEXT\]/g,
  FORM_SENDING_TEXT: /\[FORM_SENDING_TEXT\]/g,
  FORM_SUCCESS_MESSAGE: /\[FORM_SUCCESS_MESSAGE\]/g,
  FORM_ERROR_MESSAGE: /\[FORM_ERROR_MESSAGE\]/g,

  // Error pages
  ERROR_404_CODE: /\[ERROR_404_CODE\]/g,
  ERROR_404_TITLE: /\[ERROR_404_TITLE\]/g,
  ERROR_404_MESSAGE: /\[ERROR_404_MESSAGE\]/g,
  ERROR_404_HOME_BUTTON: /\[ERROR_404_HOME_BUTTON\]/g,
  ERROR_404_BACK_BUTTON: /\[ERROR_404_BACK_BUTTON\]/g,
};

const FILE_TARGETS: string[] = [
  'package.json',
  'README.md',
  'index.html',
  'src/data/businessInfo.ts',
  'src/pages/HomePage.tsx',
  'src/pages/AboutPage.tsx',
  'src/pages/ContactPage.tsx',
  'src/pages/NotFoundPage.tsx',
  'src/components/Header/Header.tsx',
  'src/components/Footer/Footer.tsx',
  'src/components/HeroSection/HeroSection.tsx',
  'src/components/FeaturesSection/FeaturesSection.tsx',
  'src/components/ServicesSection/ServicesSection.tsx',
  'src/styles/globals.css',
  'vercel.json',
];

interface OptionalFeature {
  name: string;
  description: string;
  default: boolean;
}

const OPTIONAL_FEATURES: Record<string, OptionalFeature> = {
  analytics: {
    name: 'Google Analytics',
    description: 'Add Google Analytics tracking',
    default: false,
  },
  seo: {
    name: 'SEO Meta Tags',
    description: 'Add comprehensive SEO meta tags',
    default: true,
  },
  darkMode: {
    name: 'Dark Mode Support',
    description: 'Add dark/light theme toggle',
    default: false,
  },
  contactForm: {
    name: 'Contact Form',
    description: 'Add functional contact form with validation',
    default: true,
  },
  socialLinks: {
    name: 'Social Media Links',
    description: 'Add social media integration',
    default: true,
  },
  businessHours: {
    name: 'Business Hours Display',
    description: 'Add business hours component',
    default: true,
  },
  testimonials: {
    name: 'Testimonials Section',
    description: 'Add customer testimonials component',
    default: false,
  },
  blog: {
    name: 'Blog Section',
    description: 'Add blog/news section',
    default: false,
  },
};

const DEFAULT_CONFIG: BusinessConfig = {
  projectName: 'my-business-website',
  description: 'A modern business website built with React and Vite',
  authorName: 'Your Name',
  authorEmail: 'your.email@example.com',
  githubUsername: 'yourusername',
  repositoryUrl: 'https://github.com/yourusername/my-business-website',
  license: 'MIT',

  // Business information
  businessName: 'Your Business Name',
  businessShortName: 'Your Business',
  businessTagline: 'Your compelling business tagline',
  businessDescription:
    'A comprehensive description of your business, what you do, your mission, and what makes you unique.',
  businessShortDescription:
    'Brief description for cards, previews, and meta tags',

  // Contact information
  businessPhone: '(555) 123-4567',
  businessPhoneRaw: '5551234567',
  businessEmail: 'contact@yourbusiness.com',

  // Address
  businessStreet: '123 Main Street',
  businessCity: 'Your City',
  businessState: 'Your State',
  businessZip: '12345',
  businessAddress: '123 Main Street, Your City, Your State 12345',
  businessLatitude: 40.7128,
  businessLongitude: -74.006,

  // Website and branding
  websiteUrl: 'https://yourbusiness.com',
  websiteDomain: 'yourbusiness.com',
  siteTitle: 'Your Business Name - Professional Services',
  siteDescription: 'Professional business services in Your City',
  faviconUrl: '/favicon.svg',

  // Colors
  primaryColor: '#2563eb',
  primaryColorHover: '#1d4ed8',
  primaryColorLight: '#dbeafe',
  secondaryColor: '#f59e0b',
  secondaryColorHover: '#d97706',
  secondaryColorLight: '#fef3c7',

  // Social media
  socialFacebook: 'https://facebook.com/yourbusiness',
  socialTwitter: 'https://twitter.com/yourbusiness',
  socialInstagram: 'https://instagram.com/yourbusiness',
  socialLinkedin: 'https://linkedin.com/company/yourbusiness',

  // Business hours
  hoursMonday: '9:00 AM - 5:00 PM',
  hoursTuesday: '9:00 AM - 5:00 PM',
  hoursWednesday: '9:00 AM - 5:00 PM',
  hoursThursday: '9:00 AM - 5:00 PM',
  hoursFriday: '9:00 AM - 5:00 PM',
  hoursSaturday: '10:00 AM - 4:00 PM',
  hoursSunday: 'Closed',

  // Features and services
  businessFeatures: [
    'Professional Service',
    'Expert Team',
    'Quality Results',
    'Customer Focused',
  ],
  businessServices: [
    'Consulting Services',
    'Strategic Planning',
    'Implementation Support',
    'Ongoing Maintenance',
  ],

  // Content
  heroTitlePrefix: 'Welcome to',
  ctaPrimaryText: 'Get Started',
  ctaSecondaryText: 'Learn More',

  // Technical configuration
  deploymentPlatform: 'vercel',
  includePWA: false,
  cssApproach: 'css-modules',

  features: {
    analytics: false,
    seo: true,
    darkMode: false,
    contactForm: true,
    socialLinks: true,
    businessHours: true,
    testimonials: false,
    blog: false,
  },
};

// Function to process individual files and replace placeholders
async function processFile(filePath: string, config: BusinessConfig): Promise<boolean> {
  try {
    console.log(chalk.blue(`📄 Processing ${filePath}...`));

    // Check if file exists
    const fileExists = await fs
      .access(filePath)
      .then(() => true)
      .catch(() => false);
    if (!fileExists) {
      console.log(chalk.yellow(`⚠️  File ${filePath} not found, skipping...`));
      return false;
    }

    // Read the file content
    let content = await fs.readFile(filePath, 'utf8');

    // Create mapping between config properties and placeholder patterns
    const replacements: Record<string, string | number | undefined> = {
      // Core project placeholders
      PROJECT_NAME: config.projectName,
      DESCRIPTION: config.description,
      AUTHOR_NAME: config.authorName,
      REPOSITORY_URL: config.repositoryUrl,

      // Basic business information
      BUSINESS_NAME: config.businessName,
      BUSINESS_SHORT_NAME:
        config.businessShortName || config.businessName.split(' ')[0],
      BUSINESS_TAGLINE: config.businessTagline,
      BUSINESS_DESCRIPTION: config.businessDescription,
      BUSINESS_SHORT_DESCRIPTION: config.businessShortDescription,

      // Contact information
      BUSINESS_EMAIL: config.businessEmail,
      BUSINESS_PHONE_RAW: config.businessPhoneRaw,
      BUSINESS_PHONE_FORMATTED: config.businessPhoneFormatted,
      BUSINESS_PHONE_LINK: config.businessPhoneLink,

      // Address information
      BUSINESS_STREET: config.businessStreet,
      BUSINESS_CITY: config.businessCity,
      BUSINESS_STATE: config.businessState,
      BUSINESS_ZIP: config.businessZip,
      BUSINESS_ADDRESS_FULL: config.businessAddressFull,
      BUSINESS_LATITUDE: config.businessLatitude,
      BUSINESS_LONGITUDE: config.businessLongitude,

      // Website and branding
      WEBSITE_URL: config.websiteUrl,
      WEBSITE_DOMAIN: config.websiteDomain,
      SITE_TITLE: config.siteTitle,
      SITE_DESCRIPTION: config.siteDescription,
      FAVICON_URL: config.faviconUrl,

      // Brand colors
      PRIMARY_COLOR: config.primaryColor,
      PRIMARY_COLOR_HOVER: config.primaryColorHover,
      PRIMARY_COLOR_LIGHT: config.primaryColorLight,
      SECONDARY_COLOR: config.secondaryColor,
      SECONDARY_COLOR_HOVER: config.secondaryColorHover,
      SECONDARY_COLOR_LIGHT: config.secondaryColorLight,

      // Social media
      SOCIAL_FACEBOOK_URL: config.socialFacebookUrl,
      SOCIAL_INSTAGRAM_URL: config.socialInstagramUrl,
      SOCIAL_TWITTER_URL: config.socialTwitterUrl,
      SOCIAL_LINKEDIN_URL: config.socialLinkedinUrl,

      // Business hours
      HOURS_MONDAY: config.hoursMonday,
      HOURS_TUESDAY: config.hoursTuesday,
      HOURS_WEDNESDAY: config.hoursWednesday,
      HOURS_THURSDAY: config.hoursThursday,
      HOURS_FRIDAY: config.hoursFriday,
      HOURS_SATURDAY: config.hoursSaturday,
      HOURS_SUNDAY: config.hoursSunday,

      // Business features and services
      BUSINESS_FEATURE_1: config.businessFeature1,
      BUSINESS_FEATURE_2: config.businessFeature2,
      BUSINESS_FEATURE_3: config.businessFeature3,
      BUSINESS_FEATURE_4: config.businessFeature4,
      BUSINESS_SERVICE_1: config.businessService1,
      BUSINESS_SERVICE_2: config.businessService2,
      BUSINESS_SERVICE_3: config.businessService3,
      BUSINESS_SERVICE_4: config.businessService4,

      // Website content and copy
      HERO_TITLE_PREFIX: config.heroTitlePrefix,
      CTA_PRIMARY_TEXT: config.ctaPrimaryText,
      CTA_SECONDARY_TEXT: config.ctaSecondaryText,

      // Features section
      FEATURES_SECTION_TITLE: config.featuresSectionTitle,
      FEATURES_DESCRIPTION_TEMPLATE: config.featuresDescriptionTemplate,

      // Services section
      SERVICES_SECTION_TITLE: config.servicesSectionTitle,
      SERVICES_SECTION_DESCRIPTION: config.servicesSectionDescription,
      SERVICES_DESCRIPTION_TEMPLATE: config.servicesDescriptionTemplate,
      SERVICES_CTA_TEXT: config.servicesCTAText,

      // About page
      ABOUT_PAGE_TITLE: config.aboutPageTitle,
      ABOUT_FEATURES_TITLE: config.aboutFeaturesTitle,
      ABOUT_SERVICES_TITLE: config.aboutServicesTitle,

      // Contact page
      CONTACT_PAGE_TITLE: config.contactPageTitle,
      CONTACT_PAGE_DESCRIPTION: config.contactPageDescription,
      CONTACT_INFO_TITLE: config.contactInfoTitle,
      CONTACT_PHONE_LABEL: config.contactPhoneLabel,
      CONTACT_EMAIL_LABEL: config.contactEmailLabel,
      CONTACT_ADDRESS_LABEL: config.contactAddressLabel,
      CONTACT_DIRECTIONS_TEXT: config.contactDirectionsText,
      CONTACT_HOURS_LABEL: config.contactHoursLabel,

      // Contact form
      CONTACT_FORM_TITLE: config.contactFormTitle,
      FORM_NAME_LABEL: config.formNameLabel,
      FORM_EMAIL_LABEL: config.formEmailLabel,
      FORM_SUBJECT_LABEL: config.formSubjectLabel,
      FORM_MESSAGE_LABEL: config.formMessageLabel,
      FORM_SUBMIT_TEXT: config.formSubmitText,
      FORM_SENDING_TEXT: config.formSendingText,
      FORM_SUCCESS_MESSAGE: config.formSuccessMessage,
      FORM_ERROR_MESSAGE: config.formErrorMessage,

      // Error pages
      ERROR_404_CODE: config.error404Code,
      ERROR_404_TITLE: config.error404Title,
      ERROR_404_MESSAGE: config.error404Message,
      ERROR_404_HOME_BUTTON: config.error404HomeButton,
      ERROR_404_BACK_BUTTON: config.error404BackButton,
    };

    // Replace placeholders using PLACEHOLDER_PATTERNS
    let hasChanges = false;
    for (const [patternKey, replacement] of Object.entries(replacements)) {
      if (PLACEHOLDER_PATTERNS[patternKey] && replacement !== undefined) {
        const before = content;
        content = content.replace(
          PLACEHOLDER_PATTERNS[patternKey],
          String(replacement)
        );
        if (content !== before) {
          hasChanges = true;
          console.log(
            chalk.gray(`  ✓ Replaced [${patternKey}] with "${replacement}"`)
          );
        }
      }
    }

    // Write the updated content back to the file
    if (hasChanges) {
      await fs.writeFile(filePath, content, 'utf8');
      console.log(chalk.green(`✅ Successfully processed ${filePath}`));
      return true;
    } else {
      console.log(chalk.gray(`📝 No changes needed for ${filePath}`));
      return true;
    }
  } catch (error) {
    console.error(chalk.red(`❌ Error processing ${filePath}:`), (error as Error).message);
    return false;
  }
}

async function selectTemplate(): Promise<string | null> {
  const templateChoices = [
    {
      name: 'Interactive Setup (Custom Configuration)',
      value: 'interactive',
      description: 'Walk through setup questions to create a custom configuration'
    },
    {
      name: 'Basic Business Template',
      value: 'basic',
      description: 'Generic business template suitable for any industry'
    },
    {
      name: 'Healthcare/Medical Practice',
      value: 'healthcare',
      description: 'Medical practice with patient-focused features and HIPAA considerations'
    },
    {
      name: 'Retail Store',
      value: 'retail',
      description: 'Retail business with product showcase and e-commerce features'
    },
    {
      name: 'Real Estate Agency',
      value: 'realestate',
      description: 'Real estate agency with property listings and market analysis'
    },
    {
      name: 'Fitness Studio/Gym',
      value: 'fitness',
      description: 'Fitness studio with class scheduling and membership management'
    },
    {
      name: 'Law Firm',
      value: 'law',
      description: 'Legal practice with attorney profiles and consultation booking'
    },
    {
      name: 'Beauty Salon/Spa',
      value: 'beauty',
      description: 'Beauty salon with service booking and treatment menus'
    },
    {
      name: 'Auto Repair Shop',
      value: 'autorepair',
      description: 'Automotive service with repair estimates and trust features'
    },
    {
      name: 'Creative Agency',
      value: 'creative',
      description: 'Design agency with portfolio showcase and creative services'
    },
    {
      name: 'Home Services',
      value: 'homeservices',
      description: 'Home maintenance with service areas and emergency contact'
    },
    {
      name: 'Brewery Template',
      value: 'brewery',
      description: 'Craft brewery with taproom, beer services, and events'
    },
    {
      name: 'Restaurant Template',
      value: 'restaurant',
      description: 'Restaurant with dining, catering, and reservation focus'
    },
    {
      name: 'Consulting Firm Template',
      value: 'consulting',
      description: 'Professional consulting with services and expertise focus'
    }
  ];

  const templateAnswer = await inquirer.prompt([
    {
      type: 'list',
      name: 'template',
      message: 'Choose a template to get started:',
      choices: templateChoices,
      pageSize: 10
    }
  ]);

  if (templateAnswer.template === 'interactive') {
    return null; // Continue with interactive setup
  }

  return templateAnswer.template;
}

async function loadPresetConfig(templateName: string): Promise<BusinessConfig> {
  const presetPath = path.join(process.cwd(), 'presets', `${templateName}.config.json`);
  
  try {
    const presetContent = await fs.readFile(presetPath, 'utf-8');
    const presetConfig = JSON.parse(presetContent) as Partial<BusinessConfig>;
    
    console.log(chalk.green(`✓ Loaded ${templateName} template`));
    
    // Still need to collect the dynamic values that are marked with placeholders
    return await collectPresetOverrides(presetConfig);
  } catch (error) {
    console.error(chalk.red(`Failed to load preset ${templateName}:`), error);
    throw error;
  }
}

async function collectPresetOverrides(presetConfig: Partial<BusinessConfig>): Promise<BusinessConfig> {
  console.log(chalk.blue('\nPlease provide the following information to customize your template:\n'));
  
  const overrides = await inquirer.prompt([
    {
      type: 'input',
      name: 'authorName',
      message: 'Your name:',
      validate: (input: string) => input.trim() !== '' || 'Author name is required'
    },
    {
      type: 'input',
      name: 'authorEmail',
      message: 'Your email:',
      validate: (input: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(input) || 'Please enter a valid email address';
      }
    },
    {
      type: 'input',
      name: 'githubUsername',
      message: 'Your GitHub username:',
      validate: (input: string) => input.trim() !== '' || 'GitHub username is required'
    },
    {
      type: 'input',
      name: 'businessName',
      message: 'Business name:',
      validate: (input: string) => input.trim() !== '' || 'Business name is required'
    },
    {
      type: 'input',
      name: 'businessPhone',
      message: 'Business phone:',
      validate: (input: string) => input.trim() !== '' || 'Business phone is required'
    },
    {
      type: 'input',
      name: 'businessEmail',
      message: 'Business email:',
      validate: (input: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(input) || 'Please enter a valid email address';
      }
    },
    {
      type: 'input',
      name: 'businessStreet',
      message: 'Business street address:'
    },
    {
      type: 'input',
      name: 'businessCity',
      message: 'Business city:'
    },
    {
      type: 'input',
      name: 'businessState',
      message: 'Business state/province:'
    },
    {
      type: 'input',
      name: 'businessZip',
      message: 'Business ZIP/postal code:'
    },
    {
      type: 'input',
      name: 'websiteUrl',
      message: 'Website URL (e.g., https://yourbusiness.com):',
      validate: (input: string) => {
        try {
          new URL(input);
          return true;
        } catch {
          return 'Please enter a valid URL starting with http:// or https://';
        }
      }
    }
  ]);

  // Generate derived values
  const businessShortName = overrides.businessName.split(' ')[0];
  const businessPhoneRaw = overrides.businessPhone.replace(/\D/g, '');
  const businessPhoneFormatted = overrides.businessPhone;
  const businessPhoneLink = `tel:+1${businessPhoneRaw}`;
  const businessAddress = `${overrides.businessStreet}, ${overrides.businessCity}, ${overrides.businessState} ${overrides.businessZip}`;
  const projectName = overrides.businessName.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const repositoryUrl = `https://github.com/${overrides.githubUsername}/${projectName}`;

  // Merge preset with overrides and derived values
  return {
    ...presetConfig,
    ...overrides,
    businessShortName,
    businessPhoneRaw,
    businessPhoneFormatted,
    businessPhoneLink,
    businessAddress,
    businessAddressFull: businessAddress,
    projectName,
    repositoryUrl,
    websiteDomain: new URL(overrides.websiteUrl).hostname,
    siteTitle: `${overrides.businessName} - ${presetConfig.businessTagline || 'Quality Service'}`,
    siteDescription: presetConfig.businessShortDescription || `Professional ${overrides.businessName} services`
  } as BusinessConfig;
}

// Execute the script
// Function to copy industry-specific templates
async function copyIndustryTemplates(config: BusinessConfig, flags: CommandLineFlags): Promise<void> {
  // Determine if this is a law firm based on config
  const isLawFirm = config.projectName?.includes('law') || 
                   config.businessName?.toLowerCase().includes('law') ||
                   config.businessDescription?.toLowerCase().includes('legal') ||
                   config.businessDescription?.toLowerCase().includes('attorney') ||
                   config.businessDescription?.toLowerCase().includes('lawyer');

  if (!isLawFirm) {
    return; // Only handle law firm templates for now
  }

  console.log(chalk.blue('📋 Copying law firm specific templates...\n'));

  try {
    const templatePath = path.join(process.cwd(), 'src', 'templates', 'law');
    
    // Check if law templates exist
    const lawTemplatesExist = await fs.access(templatePath).then(() => true).catch(() => false);
    if (!lawTemplatesExist) {
      console.log(chalk.yellow('⚠️  Law firm templates not found, using default layout'));
      return;
    }

    if (flags.dryRun) {
      console.log(chalk.yellow('🔍 DRY RUN: Would copy law firm templates'));
      return;
    }

    // Copy law firm business data and types
    const lawBusinessData = path.join(templatePath, 'data', 'businessInfo.ts');
    const targetBusinessData = path.join(process.cwd(), 'src', 'data', 'businessInfo.ts');
    
    if (await fs.access(lawBusinessData).then(() => true).catch(() => false)) {
      const lawBusinessContent = await fs.readFile(lawBusinessData, 'utf8');
      await fs.writeFile(targetBusinessData, lawBusinessContent);
      console.log(chalk.green('✓ Copied law firm business data'));
    }

    // Copy law firm types
    const lawTypesDir = path.join(templatePath, 'types');
    const targetTypesDir = path.join(process.cwd(), 'src', 'types');
    
    if (await fs.access(lawTypesDir).then(() => true).catch(() => false)) {
      await fs.mkdir(targetTypesDir, { recursive: true });
      const typeFiles = await fs.readdir(lawTypesDir);
      
      for (const file of typeFiles) {
        const sourceFile = path.join(lawTypesDir, file);
        const targetFile = path.join(targetTypesDir, file);
        const typeContent = await fs.readFile(sourceFile, 'utf8');
        await fs.writeFile(targetFile, typeContent);
      }
      console.log(chalk.green('✓ Copied law firm types'));
    }

    // Copy law firm HomePage
    const lawHomePage = path.join(templatePath, 'pages', 'HomePage.tsx');
    const targetHomePage = path.join(process.cwd(), 'src', 'pages', 'HomePage.tsx');
    
    if (await fs.access(lawHomePage).then(() => true).catch(() => false)) {
      const lawHomeContent = await fs.readFile(lawHomePage, 'utf8');
      await fs.writeFile(targetHomePage, lawHomeContent);
      console.log(chalk.green('✓ Copied law firm HomePage'));
    }

    // Copy law firm HomePage CSS
    const lawHomeCSS = path.join(templatePath, 'pages', 'HomePage.module.css');
    const targetHomeCSS = path.join(process.cwd(), 'src', 'pages', 'HomePage.module.css');
    
    if (await fs.access(lawHomeCSS).then(() => true).catch(() => false)) {
      const lawHomeCSSContent = await fs.readFile(lawHomeCSS, 'utf8');
      await fs.writeFile(targetHomeCSS, lawHomeCSSContent);
      console.log(chalk.green('✓ Copied law firm HomePage CSS'));
    }

    // Copy law firm specific components
    const lawComponentsPath = path.join(templatePath, 'components');
    const targetComponentsPath = path.join(process.cwd(), 'src', 'components');

    if (await fs.access(lawComponentsPath).then(() => true).catch(() => false)) {
      const componentDirs = await fs.readdir(lawComponentsPath, { withFileTypes: true });
      
      for (const dir of componentDirs) {
        if (dir.isDirectory()) {
          const sourceDir = path.join(lawComponentsPath, dir.name);
          const targetDir = path.join(targetComponentsPath, dir.name);
          
          // Create target directory
          await fs.mkdir(targetDir, { recursive: true });
          
          // Copy all files in the component directory
          const files = await fs.readdir(sourceDir);
          for (const file of files) {
            const sourceFile = path.join(sourceDir, file);
            const targetFile = path.join(targetDir, file);
            const fileContent = await fs.readFile(sourceFile, 'utf8');
            await fs.writeFile(targetFile, fileContent);
          }
          
          console.log(chalk.green(`✓ Copied law component: ${dir.name}`));
        }
      }
    }

    console.log(chalk.green('🎯 Law firm templates copied successfully!\n'));

  } catch (error) {
    console.error(chalk.red('❌ Failed to copy law firm templates:'), error);
  }
}

async function main(): Promise<void> {
  try {
    // Parse command line arguments
    const flags = parseArguments();

    // Show help if requested
    if (flags.help) {
      showHelp();
      return;
    }

    // Show mode information
    if (flags.dryRun) {
      console.log(chalk.yellow('🔍 DRY RUN MODE - No changes will be applied'));
    }

    console.log(chalk.blue('🚀 Business Website Template Initializer\n'));

    let config: BusinessConfig;

    // Load configuration from file or collect interactively
    if (flags.config) {
      config = await loadConfigFile(flags.config);
    } else {
      // Template selection process
      const selectedTemplate = await selectTemplate();
      
      if (selectedTemplate) {
        // Load preset configuration
        config = await loadPresetConfig(selectedTemplate);
      } else {
        // Continue with full interactive setup
        // This would call the existing interactive collection function
        throw new Error('Interactive setup not yet implemented in this version');
      }
    }

    // Copy industry-specific templates if applicable
    await copyIndustryTemplates(config, flags);
    
    // Process all template files
    console.log(chalk.blue('\n📁 Processing template files...\n'));
    
    const results: ProcessingResults = {
      total: 0,
      successful: 0,
      failed: 0,
      skipped: 0,
      details: []
    };

    // Process each target file
    for (const filePath of FILE_TARGETS) {
      results.total++;
      
      if (flags.dryRun) {
        console.log(chalk.yellow(`🔍 DRY RUN: Would process ${filePath}`));
        results.skipped++;
        results.details.push({
          file: filePath,
          status: 'skipped'
        });
      } else {
        const success = await processFile(filePath, config);
        if (success) {
          results.successful++;
          results.details.push({
            file: filePath,
            status: 'success'
          });
        } else {
          results.failed++;
          results.details.push({
            file: filePath,
            status: 'failed'
          });
        }
      }
    }

    // Show results summary
    console.log(chalk.blue('\n📊 Processing Summary:'));
    console.log(chalk.gray(`  • Total files: ${results.total}`));
    console.log(chalk.green(`  • Successful: ${results.successful}`));
    if (results.failed > 0) {
      console.log(chalk.red(`  • Failed: ${results.failed}`));
    }
    if (results.skipped > 0) {
      console.log(chalk.yellow(`  • Skipped: ${results.skipped}`));
    }

    if (flags.dryRun) {
      console.log(chalk.yellow('\n🔍 DRY RUN completed - no files were modified'));
    } else {
      console.log(chalk.green('\n✅ Template initialization completed successfully!'));
      console.log(chalk.blue('\n🚀 Next steps:'));
      console.log(chalk.gray('  1. Run "npm run dev" to start the development server'));
      console.log(chalk.gray('  2. Open http://localhost:5173 to view your website'));
      console.log(chalk.gray('  3. Customize components and content as needed'));
    }
  } catch (error) {
    console.error(
      chalk.red('❌ Template initialization failed:'),
      (error as Error).message
    );
    throw error;
  }
}

main().catch(console.error);
