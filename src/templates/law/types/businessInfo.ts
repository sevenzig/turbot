/**
 * Law Firm Specific Business Information Types
 * Extends the base BusinessInfo with legal industry requirements
 */

export interface Attorney {
  id: string;
  name: string;
  title: string;
  specializations: string[];
  education: string[];
  barAdmissions: string[];
  experience: string;
  bio: string;
  imageUrl?: string;
  email: string;
  phone: string;
}

export interface PracticeArea {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  urgencyLevel: 'standard' | 'urgent' | 'emergency';
  processSteps: string[];
  commonQuestions: {
    question: string;
    answer: string;
  }[];
  relatedAreas: string[];
}

export interface CaseResult {
  id: string;
  caseType: string;
  result: string;
  description: string;
  year: string;
  isPublic: boolean;
}

export interface LegalResource {
  id: string;
  title: string;
  type: 'guide' | 'faq' | 'article' | 'form';
  summary: string;
  content: string;
  practiceArea: string;
  downloadUrl?: string;
  lastUpdated: string;
}

export interface ConsultationOption {
  id: string;
  type: 'phone' | 'video' | 'inPerson';
  duration: string;
  description: string;
  price: string;
  isEmergency: boolean;
  availableHours: string;
}

export interface LawFirmInfo {
  // Core firm information
  firmName: string;
  established: string;
  motto: string;
  specialization: string[];
  
  // Legal credentials
  barAssociations: string[];
  certifications: string[];
  awards: string[];
  
  // Practice information
  practiceAreas: PracticeArea[];
  attorneys: Attorney[];
  caseResults: CaseResult[];
  consultationOptions: ConsultationOption[];
  
  // Client resources
  resources: LegalResource[];
  emergencyContact: {
    phone: string;
    afterHoursPhone?: string;
    email: string;
    description: string;
  };
  
  // Office details
  officePolicy: {
    confidentiality: string;
    accessibility: string;
    languages: string[];
    paymentMethods: string[];
  };
  
  // Legal disclaimers
  disclaimers: {
    general: string;
    consultation: string;
    results: string;
  };
}

export interface LawBusinessInfo extends LawFirmInfo {
  // Inherit from base business info structure
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

// Utility types for filtering and organization
export type PracticeAreaCategory = 
  | 'business' 
  | 'personal' 
  | 'family' 
  | 'criminal' 
  | 'civil' 
  | 'estate';

export type AttorneySpecialization = 
  | 'litigation' 
  | 'corporate' 
  | 'family' 
  | 'criminal' 
  | 'personal-injury' 
  | 'estate-planning' 
  | 'real-estate' 
  | 'intellectual-property';

export type ConsultationType = 'initial' | 'follow-up' | 'emergency' | 'second-opinion'; 