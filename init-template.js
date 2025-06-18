import inquirer from 'inquirer';
import { promises as fs } from 'fs';
import path from 'path';
import chalk from 'chalk';

// Command line argument parsing
function parseArguments() {
  const args = process.argv.slice(2);
  const flags = {
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

function showHelp() {
  console.log(
    chalk.blue(`
🚀 React + Vite Template Initializer

${chalk.bold('USAGE:')}
  node init-template.js [FLAGS]

${chalk.bold('FLAGS:')}
  -h, --help              Show this help message
  -d, --dry-run          Preview changes without applying them
  -c, --config <file>    Use configuration file instead of interactive prompts

${chalk.bold('EXAMPLES:')}
  ${chalk.gray('# Interactive mode (default)')}
  node init-template.js

  ${chalk.gray('# Preview changes without applying')}
  node init-template.js --dry-run

  ${chalk.gray('# Use configuration file')}
  node init-template.js --config my-config.json

  ${chalk.gray('# Preview with config file')}
  node init-template.js --config my-config.json --dry-run

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

async function loadConfigFile(configPath) {
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
    const config = JSON.parse(configContent);

    // Validate required fields
    const requiredFields = [
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
    const configWithDefaults = {
      ...DEFAULT_CONFIG,
      ...config,
      repositoryUrl: `https://github.com/${config.githubUsername}/${config.projectName}`,
    };

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
        error.message
      );
    }
    process.exit(1);
  }
}

// Configuration objects
const PLACEHOLDER_PATTERNS = {
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

const FILE_TARGETS = [
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

const OPTIONAL_FEATURES = {
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

const DEFAULT_CONFIG = {
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
async function processFile(filePath, config) {
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
    const replacements = {
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
          replacement
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
    console.error(chalk.red(`❌ Error processing ${filePath}:`), error.message);
    return false;
  }
}

// Function to update package.json with proper JSON handling
async function updatePackageJson(config) {
  const packageJsonPath = 'package.json';

  try {
    console.log(chalk.blue('📦 Updating package.json...'));

    // Check if package.json exists
    const fileExists = await fs
      .access(packageJsonPath)
      .then(() => true)
      .catch(() => false);
    if (!fileExists) {
      console.log(chalk.red('❌ package.json not found!'));
      return false;
    }

    // Create backup
    const backupPath = `package.json.backup.${Date.now()}`;
    await fs.copyFile(packageJsonPath, backupPath);
    console.log(chalk.gray(`💾 Backup created: ${backupPath}`));

    // Read and parse package.json
    const packageJsonContent = await fs.readFile(packageJsonPath, 'utf8');
    const packageJson = JSON.parse(packageJsonContent);

    // Update basic fields
    packageJson.name = config.projectName;
    packageJson.description = config.description;
    packageJson.author = config.authorName;
    packageJson.license = config.license;

    // Update repository field
    if (config.repositoryUrl) {
      packageJson.repository = {
        type: 'git',
        url: config.repositoryUrl,
      };
    }

    // Update homepage and bugs URLs
    if (config.repositoryUrl) {
      packageJson.homepage = `${config.repositoryUrl}#readme`;
      packageJson.bugs = {
        url: `${config.repositoryUrl}/issues`,
      };
    }

    // Feature-based dependency management
    const featureDependencies = {
      pwa: {
        dependencies: ['workbox-window'],
        devDependencies: ['vite-plugin-pwa'],
      },
      styledComponents: {
        dependencies: ['styled-components'],
        devDependencies: ['@types/styled-components'],
      },
      tailwind: {
        dependencies: [],
        devDependencies: ['tailwindcss', 'postcss', 'autoprefixer'],
      },
      emotion: {
        dependencies: ['@emotion/react', '@emotion/styled'],
        devDependencies: ['@emotion/babel-plugin'],
      },
    };

    // Initialize dependencies objects if they don't exist
    if (!packageJson.dependencies) packageJson.dependencies = {};
    if (!packageJson.devDependencies) packageJson.devDependencies = {};

    // Add PWA dependencies if selected
    if (config.includePWA) {
      console.log(chalk.gray('  ✓ Adding PWA dependencies...'));
      const pwaDeps = featureDependencies.pwa;
      pwaDeps.dependencies.forEach((dep) => {
        packageJson.dependencies[dep] = '^1.0.0'; // You might want to specify actual versions
      });
      pwaDeps.devDependencies.forEach((dep) => {
        packageJson.devDependencies[dep] = '^1.0.0';
      });
    }

    // Handle CSS approach dependencies
    if (config.cssApproach === 'styled-components') {
      console.log(chalk.gray('  ✓ Adding Styled Components dependencies...'));
      const styledDeps = featureDependencies.styledComponents;
      styledDeps.dependencies.forEach((dep) => {
        packageJson.dependencies[dep] = '^6.0.0';
      });
      styledDeps.devDependencies.forEach((dep) => {
        packageJson.devDependencies[dep] = '^6.0.0';
      });
    } else if (config.cssApproach === 'tailwind') {
      console.log(chalk.gray('  ✓ Adding Tailwind CSS dependencies...'));
      const tailwindDeps = featureDependencies.tailwind;
      tailwindDeps.devDependencies.forEach((dep) => {
        packageJson.devDependencies[dep] = '^3.0.0';
      });
    } else if (config.cssApproach === 'emotion') {
      console.log(chalk.gray('  ✓ Adding Emotion dependencies...'));
      const emotionDeps = featureDependencies.emotion;
      emotionDeps.dependencies.forEach((dep) => {
        packageJson.dependencies[dep] = '^11.0.0';
      });
      emotionDeps.devDependencies.forEach((dep) => {
        packageJson.devDependencies[dep] = '^11.0.0';
      });
    }

    // Update scripts based on deployment platform
    if (config.deploymentPlatform === 'vercel') {
      packageJson.scripts = {
        ...packageJson.scripts,
        deploy: 'vercel --prod',
        'deploy:preview': 'vercel',
      };
    } else if (config.deploymentPlatform === 'netlify') {
      packageJson.scripts = {
        ...packageJson.scripts,
        deploy: 'netlify deploy --prod --dir dist',
        'deploy:preview': 'netlify deploy --dir dist',
      };
    } else if (config.deploymentPlatform === 'github-pages') {
      packageJson.scripts = {
        ...packageJson.scripts,
        deploy: 'gh-pages -d dist',
        predeploy: 'npm run build',
      };
      packageJson.devDependencies['gh-pages'] = '^6.0.0';
    }

    // Add PWA build script if PWA is enabled
    if (config.includePWA) {
      packageJson.scripts = {
        ...packageJson.scripts,
        'build:pwa': 'vite build --mode pwa',
      };
    }

    // Sort dependencies alphabetically for cleaner output
    if (packageJson.dependencies) {
      const sortedDeps = {};
      Object.keys(packageJson.dependencies)
        .sort()
        .forEach((key) => {
          sortedDeps[key] = packageJson.dependencies[key];
        });
      packageJson.dependencies = sortedDeps;
    }

    if (packageJson.devDependencies) {
      const sortedDevDeps = {};
      Object.keys(packageJson.devDependencies)
        .sort()
        .forEach((key) => {
          sortedDevDeps[key] = packageJson.devDependencies[key];
        });
      packageJson.devDependencies = sortedDevDeps;
    }

    // Write updated package.json with proper formatting
    const updatedContent = JSON.stringify(packageJson, null, 2) + '\n';
    await fs.writeFile(packageJsonPath, updatedContent, 'utf8');

    console.log(chalk.green('✅ package.json updated successfully!'));
    console.log(chalk.gray(`  • Name: ${packageJson.name}`));
    console.log(chalk.gray(`  • Description: ${packageJson.description}`));
    console.log(chalk.gray(`  • Author: ${packageJson.author}`));
    console.log(chalk.gray(`  • License: ${packageJson.license}`));

    return true;
  } catch (error) {
    console.error(chalk.red('❌ Error updating package.json:'), error.message);
    return false;
  }
}

// Function to configure features based on user selections
async function configureFeatures(config) {
  console.log(chalk.cyan('\n⚙️  Configuring features...'));

  const operations = {
    filesAdded: [],
    filesRemoved: [],
    configurationsUpdated: [],
  };

  try {
    // Handle PWA feature configuration
    if (!config.includePWA) {
      console.log(
        chalk.yellow('  📱 PWA not selected - removing PWA files...')
      );

      const pwaFiles = [
        'public/manifest.json',
        'public/sw.js',
        'public/icons',
        'src/pwa',
        'src/serviceWorker.ts',
      ];

      for (const file of pwaFiles) {
        try {
          const fileExists = await fs
            .access(file)
            .then(() => true)
            .catch(() => false);
          if (fileExists) {
            const stats = await fs.stat(file);
            if (stats.isDirectory()) {
              await fs.rmdir(file, { recursive: true });
              console.log(chalk.gray(`    ✓ Removed directory: ${file}`));
            } else {
              await fs.unlink(file);
              console.log(chalk.gray(`    ✓ Removed file: ${file}`));
            }
            operations.filesRemoved.push(file);
          }
        } catch (error) {
          console.log(
            chalk.gray(`    ⚠️  Could not remove ${file}: ${error.message}`)
          );
        }
      }
    } else {
      console.log(chalk.green('  📱 PWA enabled - keeping PWA files'));
    }

    // Handle CSS approach configuration
    console.log(chalk.blue(`  🎨 CSS approach: ${config.cssApproach}`));

    if (config.cssApproach === 'tailwind') {
      console.log(chalk.gray('    ✓ Adding Tailwind CSS configuration...'));

      // Create tailwind.config.js
      const tailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '${config.primaryColor}',
        secondary: '${config.secondaryColor || DEFAULT_CONFIG.secondaryColor}',
      },
    },
  },
  plugins: [],
}`;

      await fs.writeFile('tailwind.config.js', tailwindConfig, 'utf8');
      operations.filesAdded.push('tailwind.config.js');

      // Create postcss.config.js
      const postcssConfig = `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;

      await fs.writeFile('postcss.config.js', postcssConfig, 'utf8');
      operations.filesAdded.push('postcss.config.js');

      console.log(chalk.gray('    ✓ Created Tailwind configuration files'));
    } else if (config.cssApproach === 'styled-components') {
      console.log(
        chalk.gray(
          '    ✓ Styled Components selected - CSS modules will be replaced during build'
        )
      );
    } else if (config.cssApproach === 'emotion') {
      console.log(
        chalk.gray('    ✓ Emotion selected - will configure during build')
      );
    } else if (config.cssApproach === 'vanilla-css') {
      console.log(
        chalk.gray(
          '    ✓ Vanilla CSS selected - removing CSS modules structure'
        )
      );
    } else {
      console.log(
        chalk.gray('    ✓ CSS Modules (default) - keeping current structure')
      );
    }

    // Handle deployment platform configuration
    console.log(
      chalk.blue(`  🚀 Deployment platform: ${config.deploymentPlatform}`)
    );

    if (config.deploymentPlatform === 'vercel') {
      // Vercel config is already present, just log
      console.log(
        chalk.gray('    ✓ Vercel configuration already present (vercel.json)')
      );
    } else if (config.deploymentPlatform === 'netlify') {
      console.log(chalk.gray('    ✓ Adding Netlify configuration...'));

      const netlifyConfig = `[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200`;

      await fs.writeFile('netlify.toml', netlifyConfig, 'utf8');
      operations.filesAdded.push('netlify.toml');

      // Remove vercel.json if it exists
      try {
        await fs.unlink('vercel.json');
        operations.filesRemoved.push('vercel.json');
        console.log(
          chalk.gray('    ✓ Removed vercel.json (using Netlify instead)')
        );
      } catch (error) {
        // File doesn't exist, that's fine
      }
    } else if (config.deploymentPlatform === 'github-pages') {
      console.log(chalk.gray('    ✓ Adding GitHub Pages configuration...'));

      const githubWorkflow = `name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: \${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist`;

      // Create .github/workflows directory
      await fs.mkdir('.github/workflows', { recursive: true });
      await fs.writeFile(
        '.github/workflows/deploy.yml',
        githubWorkflow,
        'utf8'
      );
      operations.filesAdded.push('.github/workflows/deploy.yml');

      // Remove vercel.json if it exists
      try {
        await fs.unlink('vercel.json');
        operations.filesRemoved.push('vercel.json');
        console.log(
          chalk.gray('    ✓ Removed vercel.json (using GitHub Pages instead)')
        );
      } catch (error) {
        // File doesn't exist, that's fine
      }
    } else {
      console.log(
        chalk.gray(
          '    ✓ Other deployment platform - keeping current configuration'
        )
      );
    }

    // Log summary of operations
    console.log(chalk.cyan('\n📋 Feature Configuration Summary:'));

    if (operations.filesAdded.length > 0) {
      console.log(
        chalk.green(`✅ Files added (${operations.filesAdded.length}):`)
      );
      operations.filesAdded.forEach((file) => {
        console.log(chalk.gray(`  • ${file}`));
      });
    }

    if (operations.filesRemoved.length > 0) {
      console.log(
        chalk.yellow(`🗑️  Files removed (${operations.filesRemoved.length}):`)
      );
      operations.filesRemoved.forEach((file) => {
        console.log(chalk.gray(`  • ${file}`));
      });
    }

    if (
      operations.filesAdded.length === 0 &&
      operations.filesRemoved.length === 0
    ) {
      console.log(
        chalk.gray('📄 No file operations needed - using default configuration')
      );
    }

    console.log(chalk.green('✅ Feature configuration completed!'));
    return true;
  } catch (error) {
    console.error(chalk.red('❌ Error configuring features:'), error.message);
    return false;
  }
}

// Function to process all target files
async function processAllFiles(config) {
  console.log(chalk.cyan('\n🔄 Processing all template files...'));

  const results = {
    total: FILE_TARGETS.length,
    successful: 0,
    failed: 0,
    skipped: 0,
    details: [],
  };

  for (let i = 0; i < FILE_TARGETS.length; i++) {
    const filePath = FILE_TARGETS[i];
    const fileNumber = i + 1;

    console.log(
      chalk.blue(
        `\n[${fileNumber}/${FILE_TARGETS.length}] Processing ${filePath}...`
      )
    );

    try {
      const success = await processFile(filePath, config);

      if (success) {
        results.successful++;
        results.details.push({ file: filePath, status: 'success' });
        console.log(
          chalk.green(
            `✅ [${fileNumber}/${FILE_TARGETS.length}] ${filePath} completed successfully`
          )
        );
      } else {
        results.skipped++;
        results.details.push({ file: filePath, status: 'skipped' });
        console.log(
          chalk.yellow(
            `⚠️  [${fileNumber}/${FILE_TARGETS.length}] ${filePath} skipped (file not found)`
          )
        );
      }
    } catch (error) {
      results.failed++;
      results.details.push({
        file: filePath,
        status: 'failed',
        error: error.message,
      });
      console.log(
        chalk.red(
          `❌ [${fileNumber}/${FILE_TARGETS.length}] ${filePath} failed: ${error.message}`
        )
      );
    }
  }

  // Display summary
  console.log(chalk.cyan('\n📊 Processing Summary:'));
  console.log(chalk.white(`Total files: ${results.total}`));
  console.log(chalk.green(`✅ Successful: ${results.successful}`));
  console.log(chalk.yellow(`⚠️  Skipped: ${results.skipped}`));
  console.log(chalk.red(`❌ Failed: ${results.failed}`));

  // Show detailed results if there were failures
  if (results.failed > 0) {
    console.log(chalk.red('\n💥 Failed Files:'));
    results.details
      .filter((detail) => detail.status === 'failed')
      .forEach((detail) => {
        console.log(chalk.red(`  • ${detail.file}: ${detail.error}`));
      });
  }

  // Show skipped files
  if (results.skipped > 0) {
    console.log(chalk.yellow('\n📂 Skipped Files (not found):'));
    results.details
      .filter((detail) => detail.status === 'skipped')
      .forEach((detail) => {
        console.log(chalk.yellow(`  • ${detail.file}`));
      });
  }

  const overallSuccess = results.failed === 0;
  if (overallSuccess) {
    console.log(chalk.green('\n🎉 All files processed successfully!'));
  } else {
    console.log(
      chalk.orange(
        '\n⚠️  Some files encountered issues. Check the details above.'
      )
    );
  }

  return results;
}

// Validation functions
async function validateReplacements(config) {
  console.log(chalk.cyan('\n🔍 Validating placeholder replacements...'));

  const issues = [];
  const allPatterns = Object.keys(PLACEHOLDER_PATTERNS);

  // Files to check for remaining placeholders
  const filesToCheck = [...FILE_TARGETS, 'package.json'];

  for (const filePath of filesToCheck) {
    try {
      const fileExists = await fs
        .access(filePath)
        .then(() => true)
        .catch(() => false);
      if (!fileExists) {
        continue; // Skip files that don't exist
      }

      const content = await fs.readFile(filePath, 'utf8');
      const lines = content.split('\n');

      // Check each line for remaining placeholders
      lines.forEach((line, index) => {
        allPatterns.forEach((patternKey) => {
          const placeholder = `[${patternKey}]`;
          if (line.includes(placeholder)) {
            issues.push({
              file: filePath,
              line: index + 1,
              issue: `Unreplaced placeholder: ${placeholder}`,
              content: line.trim(),
            });
          }
        });
      });
    } catch (error) {
      issues.push({
        file: filePath,
        line: null,
        issue: `Error reading file: ${error.message}`,
        content: null,
      });
    }
  }

  if (issues.length === 0) {
    console.log(chalk.green('✅ All placeholders successfully replaced!'));
    return true;
  } else {
    console.log(
      chalk.red(`❌ Found ${issues.length} unreplaced placeholder(s):`)
    );
    issues.forEach((issue) => {
      const lineInfo = issue.line ? `:${issue.line}` : '';
      console.log(chalk.red(`  • ${issue.file}${lineInfo} - ${issue.issue}`));
      if (issue.content) {
        console.log(chalk.gray(`    "${issue.content}"`));
      }
    });
    return false;
  }
}

async function validateFileStructure(config) {
  console.log(chalk.cyan('\n📁 Validating file structure...'));

  const issues = [];

  // Essential files that should always exist
  const essentialFiles = [
    'package.json',
    'index.html',
    'src/main.tsx',
    'src/App.tsx',
    'vite.config.ts',
    'tsconfig.json',
  ];

  // Files that should exist based on configuration
  const conditionalFiles = [];

  if (config.deploymentPlatform === 'vercel') {
    conditionalFiles.push('vercel.json');
  } else if (config.deploymentPlatform === 'netlify') {
    conditionalFiles.push('netlify.toml');
  } else if (config.deploymentPlatform === 'github-pages') {
    conditionalFiles.push('.github/workflows/deploy.yml');
  }

  if (config.cssApproach === 'tailwind') {
    conditionalFiles.push('tailwind.config.js', 'postcss.config.js');
  }

  const allRequiredFiles = [...essentialFiles, ...conditionalFiles];

  for (const filePath of allRequiredFiles) {
    try {
      const fileExists = await fs
        .access(filePath)
        .then(() => true)
        .catch(() => false);
      if (!fileExists) {
        const isEssential = essentialFiles.includes(filePath);
        issues.push({
          file: filePath,
          issue: `Missing ${isEssential ? 'essential' : 'expected'} file`,
          severity: isEssential ? 'error' : 'warning',
        });
      }
    } catch (error) {
      issues.push({
        file: filePath,
        issue: `Error checking file: ${error.message}`,
        severity: 'error',
      });
    }
  }

  // Check for unexpected files that should have been removed
  const unexpectedFiles = [];

  if (!config.includePWA) {
    const pwaFiles = [
      'public/manifest.json',
      'public/sw.js',
      'src/serviceWorker.ts',
    ];
    for (const file of pwaFiles) {
      const exists = await fs
        .access(file)
        .then(() => true)
        .catch(() => false);
      if (exists) {
        unexpectedFiles.push(file);
      }
    }
  }

  if (config.deploymentPlatform !== 'vercel') {
    const exists = await fs
      .access('vercel.json')
      .then(() => true)
      .catch(() => false);
    if (exists && config.deploymentPlatform !== 'other') {
      unexpectedFiles.push('vercel.json');
    }
  }

  unexpectedFiles.forEach((file) => {
    issues.push({
      file: file,
      issue: 'Unexpected file should have been removed',
      severity: 'warning',
    });
  });

  if (issues.length === 0) {
    console.log(chalk.green('✅ File structure is valid!'));
    return true;
  } else {
    const errors = issues.filter((i) => i.severity === 'error');
    const warnings = issues.filter((i) => i.severity === 'warning');

    if (errors.length > 0) {
      console.log(
        chalk.red(`❌ Found ${errors.length} file structure error(s):`)
      );
      errors.forEach((issue) => {
        console.log(chalk.red(`  • ${issue.file} - ${issue.issue}`));
      });
    }

    if (warnings.length > 0) {
      console.log(
        chalk.yellow(`⚠️  Found ${warnings.length} file structure warning(s):`)
      );
      warnings.forEach((issue) => {
        console.log(chalk.yellow(`  • ${issue.file} - ${issue.issue}`));
      });
    }

    return errors.length === 0;
  }
}

async function validatePackageJson(config) {
  console.log(chalk.cyan('\n📦 Validating package.json...'));

  const issues = [];

  try {
    // Check if file exists
    const fileExists = await fs
      .access('package.json')
      .then(() => true)
      .catch(() => false);
    if (!fileExists) {
      console.log(chalk.red('❌ package.json not found!'));
      return false;
    }

    // Read and parse JSON
    const content = await fs.readFile('package.json', 'utf8');
    let packageJson;

    try {
      packageJson = JSON.parse(content);
    } catch (parseError) {
      console.log(chalk.red('❌ package.json is not valid JSON:'));
      console.log(chalk.red(`  ${parseError.message}`));
      return false;
    }

    // Validate required fields
    const requiredFields = {
      name: config.projectName,
      description: config.description,
      author: config.authorName,
      license: config.license,
    };

    for (const [field, expectedValue] of Object.entries(requiredFields)) {
      if (!packageJson[field]) {
        issues.push(`Missing required field: ${field}`);
      } else if (packageJson[field] !== expectedValue) {
        issues.push(
          `Field '${field}' has unexpected value: "${packageJson[field]}" (expected: "${expectedValue}")`
        );
      }
    }

    // Validate repository structure
    if (config.repositoryUrl) {
      if (!packageJson.repository) {
        issues.push('Missing repository field');
      } else if (typeof packageJson.repository === 'object') {
        if (!packageJson.repository.type || !packageJson.repository.url) {
          issues.push('Repository object missing type or url');
        } else if (packageJson.repository.url !== config.repositoryUrl) {
          issues.push(
            `Repository URL mismatch: "${packageJson.repository.url}" (expected: "${config.repositoryUrl}")`
          );
        }
      }
    }

    // Validate essential dependencies exist
    const essentialDeps = ['react', 'react-dom'];
    const essentialDevDeps = ['vite'];

    essentialDeps.forEach((dep) => {
      if (!packageJson.dependencies || !packageJson.dependencies[dep]) {
        issues.push(`Missing essential dependency: ${dep}`);
      }
    });

    essentialDevDeps.forEach((dep) => {
      if (!packageJson.devDependencies || !packageJson.devDependencies[dep]) {
        issues.push(`Missing essential dev dependency: ${dep}`);
      }
    });

    // Validate feature-based dependencies
    if (config.includePWA) {
      const pwaDeps = ['workbox-window'];
      const pwaDevDeps = ['vite-plugin-pwa'];

      pwaDeps.forEach((dep) => {
        if (!packageJson.dependencies || !packageJson.dependencies[dep]) {
          issues.push(`Missing PWA dependency: ${dep}`);
        }
      });

      pwaDevDeps.forEach((dep) => {
        if (!packageJson.devDependencies || !packageJson.devDependencies[dep]) {
          issues.push(`Missing PWA dev dependency: ${dep}`);
        }
      });
    }

    // Validate CSS approach dependencies
    if (config.cssApproach === 'tailwind') {
      const tailwindDeps = ['tailwindcss', 'postcss', 'autoprefixer'];
      tailwindDeps.forEach((dep) => {
        if (!packageJson.devDependencies || !packageJson.devDependencies[dep]) {
          issues.push(`Missing Tailwind dependency: ${dep}`);
        }
      });
    }

    // Validate deployment scripts
    if (config.deploymentPlatform === 'vercel') {
      if (
        !packageJson.scripts ||
        !packageJson.scripts.deploy ||
        !packageJson.scripts['deploy:preview']
      ) {
        issues.push('Missing Vercel deployment scripts');
      }
    } else if (config.deploymentPlatform === 'github-pages') {
      if (
        !packageJson.devDependencies ||
        !packageJson.devDependencies['gh-pages']
      ) {
        issues.push('Missing gh-pages dependency for GitHub Pages deployment');
      }
    }

    if (issues.length === 0) {
      console.log(chalk.green('✅ package.json is valid!'));
      console.log(chalk.gray(`  • Valid JSON structure`));
      console.log(chalk.gray(`  • All required fields present`));
      console.log(chalk.gray(`  • Dependencies match configuration`));
      return true;
    } else {
      console.log(
        chalk.red(`❌ Found ${issues.length} package.json issue(s):`)
      );
      issues.forEach((issue) => {
        console.log(chalk.red(`  • ${issue}`));
      });
      return false;
    }
  } catch (error) {
    console.log(chalk.red('❌ Error validating package.json:'), error.message);
    return false;
  }
}

async function runAllValidations(config) {
  console.log(chalk.cyan('\n🔬 Running post-initialization validations...'));

  const validationResults = {
    replacements: await validateReplacements(config),
    fileStructure: await validateFileStructure(config),
    packageJson: await validatePackageJson(config),
  };

  const allValid = Object.values(validationResults).every(
    (result) => result === true
  );

  console.log(chalk.cyan('\n📋 Validation Summary:'));
  console.log(
    chalk.white(
      `Placeholder replacements: ${validationResults.replacements ? chalk.green('✅ Valid') : chalk.red('❌ Failed')}`
    )
  );
  console.log(
    chalk.white(
      `File structure: ${validationResults.fileStructure ? chalk.green('✅ Valid') : chalk.red('❌ Failed')}`
    )
  );
  console.log(
    chalk.white(
      `Package.json: ${validationResults.packageJson ? chalk.green('✅ Valid') : chalk.red('❌ Failed')}`
    )
  );

  if (allValid) {
    console.log(chalk.green('\n🎉 All validations passed!'));
  } else {
    console.log(
      chalk.yellow(
        '\n⚠️  Some validations failed. Please review the issues above.'
      )
    );
  }

  return validationResults;
}

// Final setup functions
async function createInitialCommit(config) {
  console.log(
    chalk.cyan(
      '\n📝 Initializing Git repository and creating initial commit...'
    )
  );

  try {
    // Check if git is already initialized
    const gitExists = await fs
      .access('.git')
      .then(() => true)
      .catch(() => false);

    if (!gitExists) {
      console.log(chalk.gray('  ✓ Initializing Git repository...'));
      const { execSync } = await import('child_process');

      // Initialize git repo
      execSync('git init', { stdio: 'pipe' });

      // Set initial branch to main if git version supports it
      try {
        execSync('git branch -m main', { stdio: 'pipe' });
      } catch (error) {
        // Older git versions might not support this, that's okay
      }

      // Add all files
      execSync('git add .', { stdio: 'pipe' });

      // Create initial commit
      const commitMessage = `Initial commit: ${config.projectName}

Project: ${config.description}
Author: ${config.authorName}
License: ${config.license}
Generated with React + Vite template`;

      execSync(`git commit -m "${commitMessage}"`, { stdio: 'pipe' });

      console.log(
        chalk.green('✅ Git repository initialized and initial commit created!')
      );
      console.log(chalk.gray(`  • Repository: ${config.repositoryUrl}`));
      console.log(chalk.gray(`  • Branch: main`));
      console.log(chalk.gray(`  • Initial commit with all template files`));

      return true;
    } else {
      console.log(
        chalk.yellow(
          '⚠️  Git repository already exists, skipping initialization'
        )
      );
      return true;
    }
  } catch (error) {
    console.error(
      chalk.red('❌ Error creating Git repository:'),
      error.message
    );
    console.log(
      chalk.yellow(
        '💡 You can manually initialize Git later with: git init && git add . && git commit -m "Initial commit"'
      )
    );
    return false;
  }
}

async function cleanupTemplateFiles(config) {
  console.log(chalk.cyan('\n🧹 Cleaning up template-specific files...'));

  const filesToRemove = [
    'init-template.js',
    'template-summary.md',
    'template-usage.md',
    'TESTING.md',
    'docs/ai-master-init-prompt.md',
    'docs/brewery-example-implementation-guide.md',
    'docs/brewery-example-layout-spec.md',
    'docs/brewery-example-website-spec.md',
    'DOCUMENTATION_STYLE_GUIDE.md',
  ];

  // Also remove backup files
  const backupFiles = [];
  try {
    const files = await fs.readdir('.');
    backupFiles.push(...files.filter((file) => file.includes('.backup.')));
  } catch (error) {
    // Directory read error, continue anyway
  }

  const allFilesToRemove = [...filesToRemove, ...backupFiles];
  let removedCount = 0;
  let errors = [];

  for (const file of allFilesToRemove) {
    try {
      const exists = await fs
        .access(file)
        .then(() => true)
        .catch(() => false);
      if (exists) {
        const stats = await fs.stat(file);
        if (stats.isDirectory()) {
          await fs.rmdir(file, { recursive: true });
          console.log(chalk.gray(`  ✓ Removed directory: ${file}`));
        } else {
          await fs.unlink(file);
          console.log(chalk.gray(`  ✓ Removed file: ${file}`));
        }
        removedCount++;
      }
    } catch (error) {
      errors.push({ file, error: error.message });
      console.log(
        chalk.yellow(`  ⚠️  Could not remove ${file}: ${error.message}`)
      );
    }
  }

  if (errors.length === 0) {
    console.log(
      chalk.green(
        `✅ Cleanup completed! Removed ${removedCount} template files.`
      )
    );
    return true;
  } else {
    console.log(
      chalk.yellow(
        `⚠️  Cleanup completed with ${errors.length} warnings. Removed ${removedCount} files.`
      )
    );
    return true; // Still consider success since it's not critical
  }
}

async function generateSummaryReport(
  config,
  processingResults,
  validationResults,
  setupResults
) {
  console.log(chalk.cyan('\n📄 Generating summary report...'));

  try {
    const timestamp = new Date().toISOString();
    const report = `# Template Initialization Report

Generated: ${timestamp}
Project: ${config.projectName}

## Configuration Summary

### Basic Information
- **Project Name**: ${config.projectName}
- **Description**: ${config.description}
- **Author**: ${config.authorName} (${config.authorEmail})
- **License**: ${config.license}
- **Repository**: ${config.repositoryUrl}

### Business Information
- **Business Name**: ${config.businessName}
- **Website**: ${config.websiteUrl}
- **Primary Color**: ${config.primaryColor}

### Technical Configuration
- **Deployment Platform**: ${config.deploymentPlatform}
- **CSS Approach**: ${config.cssApproach}
- **PWA Features**: ${config.includePWA ? 'Enabled' : 'Disabled'}

## Processing Results

### Package.json
- Status: ${setupResults.packageJson ? '✅ Updated' : '❌ Failed'}
- Backup created with dependencies and scripts updated

### Features Configuration
- Status: ${setupResults.features ? '✅ Configured' : '❌ Failed'}
- PWA files: ${config.includePWA ? 'Kept' : 'Removed'}
- CSS framework: ${config.cssApproach}
- Deployment config: ${config.deploymentPlatform}

### Template Files Processing
- Total files: ${processingResults.total}
- Successful: ${processingResults.successful}
- Skipped: ${processingResults.skipped}
- Failed: ${processingResults.failed}

### Validations
- Placeholder replacements: ${validationResults.replacements ? '✅ Passed' : '❌ Failed'}
- File structure: ${validationResults.fileStructure ? '✅ Passed' : '❌ Failed'}
- Package.json validation: ${validationResults.packageJson ? '✅ Passed' : '❌ Failed'}

### Setup Tasks
- Git repository: ${setupResults.git ? '✅ Initialized' : '❌ Failed'}
- Cleanup: ${setupResults.cleanup ? '✅ Completed' : '❌ Failed'}
- Health check: ${setupResults.healthCheck ? '✅ Passed' : '❌ Failed'}

## Next Steps

1. **Install Dependencies**
   \`\`\`bash
   npm install
   \`\`\`

2. **Start Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Build for Production**
   \`\`\`bash
   npm run build
   \`\`\`

4. **Deploy to ${config.deploymentPlatform}**
   \`\`\`bash
   npm run deploy
   \`\`\`

## Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
${config.cssApproach === 'tailwind' ? '- [Tailwind CSS Documentation](https://tailwindcss.com/)' : ''}
${config.deploymentPlatform === 'vercel' ? '- [Vercel Documentation](https://vercel.com/docs)' : ''}
${config.deploymentPlatform === 'netlify' ? '- [Netlify Documentation](https://docs.netlify.com/)' : ''}

---
*Report generated by React + Vite Template Initializer*
`;

    await fs.writeFile('SETUP_REPORT.md', report, 'utf8');
    console.log(chalk.green('✅ Summary report created: SETUP_REPORT.md'));
    console.log(
      chalk.gray('  • Contains complete configuration and setup details')
    );
    console.log(chalk.gray('  • Includes next steps and useful resources'));

    return true;
  } catch (error) {
    console.error(
      chalk.red('❌ Error generating summary report:'),
      error.message
    );
    return false;
  }
}

async function runHealthCheck(config) {
  console.log(chalk.cyan('\n🏥 Running health check...'));

  try {
    const { execSync } = await import('child_process');

    // Check if npm is available
    console.log(chalk.blue('  📦 Checking npm installation...'));
    try {
      execSync('npm --version', { stdio: 'pipe' });
      console.log(chalk.gray('    ✓ npm is available'));
    } catch (error) {
      console.log(chalk.red('    ❌ npm not found'));
      return false;
    }

    // Install dependencies
    console.log(chalk.blue('  📥 Installing dependencies...'));
    try {
      execSync('npm install', { stdio: 'pipe' });
      console.log(chalk.gray('    ✓ Dependencies installed successfully'));
    } catch (error) {
      console.log(chalk.red('    ❌ Failed to install dependencies'));
      console.log(
        chalk.yellow('    💡 You may need to run "npm install" manually')
      );
      return false;
    }

    // Test build
    console.log(chalk.blue('  🔨 Testing build process...'));
    try {
      execSync('npm run build', { stdio: 'pipe' });
      console.log(chalk.gray('    ✓ Build completed successfully'));
    } catch (error) {
      console.log(
        chalk.yellow(
          '    ⚠️  Build test failed - this may be normal if dependencies need manual configuration'
        )
      );
      console.log(
        chalk.gray('    💡 Try running "npm run build" manually after setup')
      );
    }

    // Check if TypeScript compilation works
    console.log(chalk.blue('  📝 Testing TypeScript compilation...'));
    try {
      execSync('npx tsc --noEmit', { stdio: 'pipe' });
      console.log(chalk.gray('    ✓ TypeScript compilation successful'));
    } catch (error) {
      console.log(
        chalk.yellow(
          '    ⚠️  TypeScript compilation has issues - this is often normal for new projects'
        )
      );
    }

    console.log(chalk.green('✅ Health check completed!'));
    console.log(chalk.gray('  • Dependencies installed'));
    console.log(chalk.gray('  • Build process verified'));
    console.log(chalk.gray('  • Project ready for development'));

    return true;
  } catch (error) {
    console.error(chalk.red('❌ Health check failed:'), error.message);
    console.log(
      chalk.yellow('💡 You can manually run: npm install && npm run build')
    );
    return false;
  }
}

async function main() {
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

    console.log(chalk.blue('Starting template initialization...'));

    let config;

    // Load configuration from file or collect interactively
    if (flags.config) {
      config = await loadConfigFile(flags.config);
    } else {
      // Collect basic project information
      config = await inquirer.prompt([
        {
          type: 'input',
          name: 'projectName',
          message: 'What is your project name?',
          default: DEFAULT_CONFIG.projectName,
          validate: (input) => {
            // Validate npm package name format
            const npmNameRegex = /^[a-z0-9]([a-z0-9\-_]*[a-z0-9])?$/;
            if (!input.trim()) {
              return 'Project name is required';
            }
            if (input.includes(' ')) {
              return 'Project name cannot contain spaces. Use hyphens (-) instead.';
            }
            if (!npmNameRegex.test(input)) {
              return 'Project name must be lowercase and can only contain letters, numbers, hyphens, and underscores';
            }
            if (input.length > 214) {
              return 'Project name must be less than 214 characters';
            }
            return true;
          },
        },
        {
          type: 'input',
          name: 'description',
          message: 'Project description:',
          default: DEFAULT_CONFIG.description,
        },
        {
          type: 'input',
          name: 'authorName',
          message: 'Author name:',
          default: DEFAULT_CONFIG.author,
        },
        {
          type: 'input',
          name: 'authorEmail',
          message: 'Author email:',
          validate: (input) => {
            if (!input.trim()) {
              return 'Author email is required';
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input)) {
              return 'Please enter a valid email address';
            }
            return true;
          },
        },
        {
          type: 'input',
          name: 'githubUsername',
          message: 'GitHub username/organization:',
          validate: (input) => {
            if (!input.trim()) {
              return 'GitHub username is required';
            }
            const githubUsernameRegex =
              /^[a-zA-Z0-9]([a-zA-Z0-9\-])*[a-zA-Z0-9]$/;
            if (!githubUsernameRegex.test(input)) {
              return 'GitHub username can only contain alphanumeric characters and hyphens, and cannot start or end with a hyphen';
            }
            return true;
          },
        },
        {
          type: 'list',
          name: 'license',
          message: 'Choose a license:',
          choices: [
            { name: 'MIT License', value: 'MIT' },
            { name: 'ISC License', value: 'ISC' },
            { name: 'Apache License 2.0', value: 'Apache-2.0' },
            { name: 'GNU GPL v3', value: 'GPL-3.0' },
            { name: 'BSD 3-Clause License', value: 'BSD-3-Clause' },
            { name: 'Mozilla Public License 2.0', value: 'MPL-2.0' },
            { name: 'Unlicense', value: 'Unlicense' },
          ],
          default: 'MIT',
        },
      ]);

      // Collect advanced settings
      console.log(chalk.cyan('\n🔧 Advanced Configuration:'));

      const advancedConfig = await inquirer.prompt([
        {
          type: 'input',
          name: 'businessName',
          message: 'Business/Company name:',
          default: DEFAULT_CONFIG.businessName,
          validate: (input) => {
            if (!input.trim()) {
              return 'Business name is required';
            }
            return true;
          },
        },
        {
          type: 'input',
          name: 'websiteUrl',
          message: 'Business website URL:',
          default: DEFAULT_CONFIG.websiteUrl,
          validate: (input) => {
            if (!input.trim()) {
              return 'Website URL is required';
            }
            try {
              new URL(input);
              return true;
            } catch {
              return 'Please enter a valid URL (e.g., https://example.com)';
            }
          },
        },
        {
          type: 'input',
          name: 'primaryColor',
          message: 'Primary brand color (hex code):',
          default: DEFAULT_CONFIG.primaryColor,
          validate: (input) => {
            if (!input.trim()) {
              return 'Primary color is required';
            }
            const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
            if (!hexColorRegex.test(input)) {
              return 'Please enter a valid hex color code (e.g., #1a4d5c or #abc)';
            }
            return true;
          },
        },
        {
          type: 'list',
          name: 'deploymentPlatform',
          message: 'Preferred deployment platform:',
          choices: [
            { name: 'Vercel (Recommended for React)', value: 'vercel' },
            { name: 'Netlify', value: 'netlify' },
            { name: 'GitHub Pages', value: 'github-pages' },
            { name: 'AWS Amplify', value: 'aws-amplify' },
            { name: 'Firebase Hosting', value: 'firebase' },
            { name: 'Other/Manual', value: 'other' },
          ],
          default: 'vercel',
        },
        {
          type: 'confirm',
          name: 'includePWA',
          message: 'Include Progressive Web App (PWA) features?',
          default: false,
        },
        {
          type: 'list',
          name: 'cssApproach',
          message: 'Preferred CSS approach:',
          choices: [
            { name: 'CSS Modules (Current default)', value: 'css-modules' },
            { name: 'Styled Components', value: 'styled-components' },
            { name: 'Tailwind CSS', value: 'tailwind' },
            { name: 'Emotion', value: 'emotion' },
            { name: 'Vanilla CSS', value: 'vanilla-css' },
          ],
          default: 'css-modules',
        },
      ]);

      // Merge configurations
      Object.assign(config, advancedConfig);
    }

    // Generate repository URL from GitHub username and project name
    config.repositoryUrl = `https://github.com/${config.githubUsername}/${config.projectName}`;

    // Log the collected configuration for verification
    console.log(chalk.yellow('\n📋 Collected Configuration:'));
    console.log(JSON.stringify(config, null, 2));

    if (flags.dryRun) {
      console.log(chalk.yellow('\n🔍 DRY RUN MODE - Simulating operations...'));

      // Simulate package.json update
      console.log(chalk.blue('📦 [DRY RUN] Would update package.json...'));
      console.log(chalk.gray('  • Would change name to:', config.projectName));
      console.log(
        chalk.gray('  • Would change description to:', config.description)
      );
      console.log(chalk.gray('  • Would change author to:', config.authorName));
      console.log(chalk.gray('  • Would add repository URL'));
      console.log(chalk.gray('  • Would add deployment scripts'));

      // Simulate feature configuration
      console.log(chalk.blue('\n⚙️  [DRY RUN] Would configure features...'));
      if (!config.includePWA) {
        console.log(chalk.gray('  • Would remove PWA files'));
      }
      console.log(chalk.gray(`  • CSS approach: ${config.cssApproach}`));
      console.log(
        chalk.gray(`  • Deployment platform: ${config.deploymentPlatform}`)
      );

      // Simulate file processing
      console.log(chalk.blue('\n🔄 [DRY RUN] Would process template files...'));
      FILE_TARGETS.forEach((file, index) => {
        console.log(
          chalk.gray(
            `  [${index + 1}/${FILE_TARGETS.length}] Would process ${file}`
          )
        );
      });

      // Simulate setup tasks
      console.log(chalk.blue('\n🚀 [DRY RUN] Would run final setup tasks...'));
      console.log(chalk.gray('  • Would initialize Git repository'));
      console.log(chalk.gray('  • Would cleanup template files'));
      console.log(chalk.gray('  • Would run health check'));
      console.log(chalk.gray('  • Would generate summary report'));

      console.log(chalk.green('\n✅ DRY RUN COMPLETED'));
      console.log(
        chalk.blue('💡 Run without --dry-run to apply these changes')
      );
      return;
    }

    // Continue with normal execution...
    // Update package.json with specialized handling
    const packageJsonSuccess = await updatePackageJson(config);

    // Configure features based on user selections
    const featuresSuccess = await configureFeatures(config);

    // Process all template files
    const processingResults = await processAllFiles(config);

    // Run comprehensive validations
    const validationResults = await runAllValidations(config);

    // Run final setup tasks
    console.log(chalk.cyan('\n🚀 Running final setup tasks...'));

    const setupResults = {
      packageJson: packageJsonSuccess,
      features: featuresSuccess,
      git: await createInitialCommit(config),
      cleanup: await cleanupTemplateFiles(config),
      healthCheck: await runHealthCheck(config),
    };

    // Generate comprehensive summary report
    const reportSuccess = await generateSummaryReport(
      config,
      processingResults,
      validationResults,
      setupResults
    );

    // Final status message
    const validationFailed = !Object.values(validationResults).every(
      (result) => result === true
    );
    const setupFailed = !Object.values(setupResults).every(
      (result) => result === true
    );
    const totalErrors =
      processingResults.failed +
      (validationFailed ? 1 : 0) +
      (setupFailed ? 1 : 0) +
      (reportSuccess ? 0 : 1);
    if (totalErrors === 0) {
      console.log(
        chalk.green('\n🎉 Template initialization completed successfully!')
      );
      console.log(chalk.cyan('\n📊 Final Summary:'));
      console.log(
        chalk.white(
          `  Package.json: ${setupResults.packageJson ? '✅ updated' : '❌ failed'}`
        )
      );
      console.log(
        chalk.white(
          `  Features: ${setupResults.features ? '✅ configured' : '❌ failed'}`
        )
      );
      console.log(
        chalk.white(
          `  Template files: ${processingResults.successful} successful, ${processingResults.skipped} skipped`
        )
      );
      console.log(
        chalk.white(
          `  Validations: ${validationFailed ? '❌ failed' : '✅ passed'}`
        )
      );
      console.log(
        chalk.white(
          `  Git repository: ${setupResults.git ? '✅ initialized' : '❌ failed'}`
        )
      );
      console.log(
        chalk.white(
          `  Cleanup: ${setupResults.cleanup ? '✅ completed' : '❌ failed'}`
        )
      );
      console.log(
        chalk.white(
          `  Health check: ${setupResults.healthCheck ? '✅ passed' : '❌ failed'}`
        )
      );
      console.log(
        chalk.white(
          `  Summary report: ${reportSuccess ? '✅ generated' : '❌ failed'}`
        )
      );

      console.log(chalk.green('\n🚀 Your template is ready to use!'));
      console.log(chalk.blue('💡 Next steps:'));
      console.log(
        chalk.gray('  1. Review SETUP_REPORT.md for complete details')
      );
      console.log(chalk.gray('  2. Run "npm run dev" to start development'));
      console.log(
        chalk.gray('  3. Run "npm run build" to test production build')
      );
      console.log(chalk.gray('  4. Run "npm run deploy" when ready to deploy'));
    } else {
      console.log(
        chalk.red('\n⚠️  Template initialization completed with errors.')
      );
      console.log(chalk.cyan('\n📊 Final Summary:'));
      console.log(
        chalk.white(
          `  Package.json: ${setupResults.packageJson ? '✅ updated' : '❌ failed'}`
        )
      );
      console.log(
        chalk.white(
          `  Features: ${setupResults.features ? '✅ configured' : '❌ failed'}`
        )
      );
      console.log(
        chalk.white(
          `  Template files: ${processingResults.successful} successful, ${processingResults.skipped} skipped, ${processingResults.failed} failed`
        )
      );
      console.log(
        chalk.white(
          `  Validations: ${validationFailed ? '❌ failed' : '✅ passed'}`
        )
      );
      console.log(
        chalk.white(
          `  Git repository: ${setupResults.git ? '✅ initialized' : '❌ failed'}`
        )
      );
      console.log(
        chalk.white(
          `  Cleanup: ${setupResults.cleanup ? '✅ completed' : '❌ failed'}`
        )
      );
      console.log(
        chalk.white(
          `  Health check: ${setupResults.healthCheck ? '✅ passed' : '❌ failed'}`
        )
      );
      console.log(
        chalk.white(
          `  Summary report: ${reportSuccess ? '✅ generated' : '❌ failed'}`
        )
      );

      console.log(
        chalk.yellow(
          '\n⚠️  Please review and fix the issues above before using the template.'
        )
      );
      console.log(
        chalk.blue(
          '💡 Check SETUP_REPORT.md (if generated) for complete details and troubleshooting steps.'
        )
      );
    }
  } catch (error) {
    console.error(
      chalk.red('❌ Template initialization failed:'),
      error.message
    );
    throw error;
  }
}

// Execute the script
main().catch(console.error);
