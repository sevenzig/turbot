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
  name: 'Your Business Name',
  shortName: 'Business',
  tagline: 'Professional Services & Solutions',
  description: 'We provide exceptional services tailored to meet your unique needs. Our experienced team is dedicated to delivering high-quality solutions that drive results for your business.',
  shortDescription: 'Professional services & solutions tailored to your business needs.',

  // Address Information - REPLACE WITH YOUR ACTUAL ADDRESS
  address: {
    street: '123 Main Street',
    city: 'Your City',
    state: 'State',
    zip: '12345',
    full: '123 Main Street, Your City, State 12345',
    coordinates: {
      latitude: 40.7128, // Replace with your actual coordinates
      longitude: -74.006, // Replace with your actual coordinates
    },
  },

  // Contact Information - REPLACE WITH YOUR CONTACT INFO
  contact: {
    phone: {
      raw: '555-123-4567',
      formatted: '(555) 123-4567',
      link: 'tel:+15551234567',
    },
    email: 'info@yourbusiness.com',
  },

  // Social Media - ADD YOUR SOCIAL MEDIA LINKS
  social: {
    facebook: 'https://facebook.com/yourbusiness',
    instagram: 'https://instagram.com/yourbusiness',
    twitter: 'https://twitter.com/yourbusiness',
    linkedin: 'https://linkedin.com/company/yourbusiness',
    // Remove any platforms you don't use
  },

  // Website Information - UPDATE WITH YOUR DOMAIN
  website: {
    domain: 'yourbusiness.com',
    baseUrl: 'https://yourbusiness.com',
  },

  // Business Hours - UPDATE WITH YOUR ACTUAL HOURS
  hours: {
    monday: '9:00 AM - 5:00 PM',
    tuesday: '9:00 AM - 5:00 PM',
    wednesday: '9:00 AM - 5:00 PM',
    thursday: '9:00 AM - 5:00 PM',
    friday: '9:00 AM - 5:00 PM',
    saturday: '10:00 AM - 3:00 PM',
    sunday: 'Closed',
  },

  // Business Features - CUSTOMIZE FOR YOUR BUSINESS
  features: [
    'Professional Expertise',
    'Reliable Service',
    'Customer-First Approach',
    '24/7 Support Available',
  ],

  // Services Offered - CUSTOMIZE FOR YOUR BUSINESS
  services: [
    'Consulting Services',
    'Project Management',
    'Custom Solutions',
    'Support & Maintenance',
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
