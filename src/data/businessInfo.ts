/**
 * Business information template
 * Replace all placeholder values with your actual business information
 */

export interface BusinessInfo {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  shortDescription: string;

  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    full: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };

  contact: {
    phone: {
      raw: string;
      formatted: string;
      link: string;
    };
    email: string;
  };

  social: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
  };

  website: {
    domain: string;
    baseUrl: string;
  };

  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };

  features: string[];
  services: string[];
}

export const businessInfo: BusinessInfo = {
  // Basic Information - REPLACE WITH YOUR BUSINESS INFO
  name: '[BUSINESS_NAME]',
  shortName: '[BUSINESS_SHORT_NAME]',
  tagline: '[BUSINESS_TAGLINE]',
  description: '[BUSINESS_DESCRIPTION]',
  shortDescription: '[BUSINESS_SHORT_DESCRIPTION]',

  // Address Information - REPLACE WITH YOUR ACTUAL ADDRESS
  address: {
    street: '[BUSINESS_STREET]',
    city: '[BUSINESS_CITY]',
    state: '[BUSINESS_STATE]',
    zip: '[BUSINESS_ZIP]',
    full: '[BUSINESS_ADDRESS_FULL]',
    coordinates: {
      latitude: 40.7128, // [BUSINESS_LATITUDE] Replace with your actual coordinates
      longitude: -74.006, // [BUSINESS_LONGITUDE] Replace with your actual coordinates
    },
  },

  // Contact Information - REPLACE WITH YOUR CONTACT INFO
  contact: {
    phone: {
      raw: '[BUSINESS_PHONE_RAW]',
      formatted: '[BUSINESS_PHONE_FORMATTED]',
      link: '[BUSINESS_PHONE_LINK]',
    },
    email: '[BUSINESS_EMAIL]',
  },

  // Social Media - ADD YOUR SOCIAL MEDIA LINKS
  social: {
    facebook: '[SOCIAL_FACEBOOK_URL]',
    instagram: '[SOCIAL_INSTAGRAM_URL]',
    twitter: '[SOCIAL_TWITTER_URL]',
    linkedin: '[SOCIAL_LINKEDIN_URL]',
    // Remove any platforms you don't use
  },

  // Website Information - UPDATE WITH YOUR DOMAIN
  website: {
    domain: '[WEBSITE_DOMAIN]',
    baseUrl: '[WEBSITE_URL]',
  },

  // Business Hours - UPDATE WITH YOUR ACTUAL HOURS
  hours: {
    monday: '[HOURS_MONDAY]',
    tuesday: '[HOURS_TUESDAY]',
    wednesday: '[HOURS_WEDNESDAY]',
    thursday: '[HOURS_THURSDAY]',
    friday: '[HOURS_FRIDAY]',
    saturday: '[HOURS_SATURDAY]',
    sunday: '[HOURS_SUNDAY]',
  },

  // Business Features - CUSTOMIZE FOR YOUR BUSINESS
  features: [
    '[BUSINESS_FEATURE_1]',
    '[BUSINESS_FEATURE_2]',
    '[BUSINESS_FEATURE_3]',
    '[BUSINESS_FEATURE_4]',
  ],

  // Services Offered - CUSTOMIZE FOR YOUR BUSINESS
  services: [
    '[BUSINESS_SERVICE_1]',
    '[BUSINESS_SERVICE_2]',
    '[BUSINESS_SERVICE_3]',
    '[BUSINESS_SERVICE_4]',
  ],
};

// Business Hours Utility Functions
export function getCurrentBusinessStatus() {
  const now = new Date();
  const currentHour = now.getHours();

  // This is a basic implementation - customize based on your needs
  const isWeekend = now.getDay() === 0 || now.getDay() === 6;
  const isBusinessHours = currentHour >= 9 && currentHour < 17;

  const isOpen = !isWeekend && isBusinessHours;

  if (isOpen) {
    return {
      isOpen: true,
      message: 'Open today until 5:00 PM',
      status: 'open',
    };
  } else if (isWeekend) {
    return {
      isOpen: false,
      message: 'Closed - Opens Monday at 9:00 AM',
      status: 'closed',
    };
  } else {
    return {
      isOpen: false,
      message: 'Closed - Opens tomorrow at 9:00 AM',
      status: 'closed',
    };
  }
}

export function getFormattedAddress(): string {
  return businessInfo.address.full;
}

export function getGoogleMapsUrl(): string {
  const { latitude, longitude } = businessInfo.address.coordinates;
  if (latitude === 0 && longitude === 0) {
    // Fallback to address search if coordinates not set
    return `https://maps.google.com/maps?q=${encodeURIComponent(businessInfo.address.full)}`;
  }
  return `https://maps.google.com/maps?q=${latitude},${longitude}`;
}

export function getDirectionsText(): string {
  return `Get directions to ${businessInfo.address.full}`;
}

// SEO Data Generation
export function generateSEOData(pageTitle?: string) {
  const title = pageTitle
    ? `${pageTitle} | ${businessInfo.name}`
    : `${businessInfo.name} - ${businessInfo.tagline}`;

  return {
    title,
    description: businessInfo.shortDescription,
    keywords: [
      businessInfo.name,
      businessInfo.shortName,
      ...businessInfo.services,
      businessInfo.address.city,
      businessInfo.address.state,
    ].join(', '),
    ogTitle: title,
    ogDescription: businessInfo.shortDescription,
    ogUrl: businessInfo.website.baseUrl,
    ogImage: `${businessInfo.website.baseUrl}/images/og-image.jpg`,
  };
}

export default businessInfo;
