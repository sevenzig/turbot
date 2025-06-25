/**
 * Generic Business Information Template
 * This serves as the default business template before industry-specific templates are applied
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

// Professional web development business information
export const businessInfo: BusinessInfo = {
  // Basic business information
  name: 'Elite Web Solutions',
  shortName: 'EWS',
  tagline: 'Secure, Fast, Mobile-Optimized Websites That Drive Business Results',
  description: 'With 25 years of web development experience, I create secure, fast-loading, mobile-optimized websites that help established businesses succeed online. From custom development to ongoing optimization, I deliver complete web solutions in just 4 weeks with transparent processes and proven results.',
  shortDescription: 'Expert web developer with 25 years of experience creating secure, fast, mobile-optimized websites for established businesses',

  // Address information
  address: {
    street: '456 Tech Innovation Drive',
    city: 'Austin',
    state: 'TX',
    zip: '78701',
    full: '456 Tech Innovation Drive, Austin, TX 78701',
    coordinates: {
      latitude: 30.2672,
      longitude: -97.7431
    }
  },

  // Contact information
  contact: {
    phone: {
      raw: '512-555-0199',
      formatted: '(512) 555-0199',
      link: 'tel:+15125550199'
    },
    email: 'hello@elitewebsolutions.com'
  },

  // Social media
  social: {
    linkedin: 'https://linkedin.com/in/elite-web-developer',
    twitter: 'https://twitter.com/elitewebsolutions'
  },

  // Website information
  website: {
    domain: 'elitewebsolutions.com',
    baseUrl: 'https://elitewebsolutions.com'
  },

  // Business hours
  hours: {
    monday: '9:00 AM - 6:00 PM',
    tuesday: '9:00 AM - 6:00 PM',
    wednesday: '9:00 AM - 6:00 PM',
    thursday: '9:00 AM - 6:00 PM',
    friday: '9:00 AM - 5:00 PM',
    saturday: 'By Appointment',
    sunday: 'Emergency Support Available'
  },

  // Key features highlighting technical excellence and business value
  features: [
    'Secure & Protected',
    'Lightning Fast',
    'Mobile Optimized',
    '25 Years Experience'
  ],
  
  // Core service offerings
  services: [
    'Custom Website Development',
    'WordPress Development',
    'SEO & Optimization',
    'Hosting & Maintenance'
  ]
};

// Utility functions for business data
export function getCurrentBusinessStatus() {
  const now = new Date();
  const currentHour = now.getHours();
  const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  
  const todayHours = businessInfo.hours[currentDay as keyof typeof businessInfo.hours];
  
  if (todayHours === 'Closed' || todayHours === 'By Appointment') {
    return { isOpen: false, status: 'Closed', nextOpen: 'Monday 9:00 AM' };
  }
  
  // Simple check for business hours (9 AM - 5 PM on weekdays)
  if (currentHour >= 9 && currentHour < 17) {
    return { isOpen: true, status: 'Open', closesAt: '5:00 PM' };
  }
  
  return { isOpen: false, status: 'Closed', nextOpen: 'Tomorrow 9:00 AM' };
}

export function getGoogleMapsUrl(): string {
  return `https://maps.google.com/maps?q=${encodeURIComponent(businessInfo.address.full)}`;
}

// Export for use in components
export default businessInfo; 