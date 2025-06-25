/**
 * Law Firm Business Information
 * Complete business data structure for legal practices
 */

import type { LawBusinessInfo, Attorney, PracticeArea, CaseResult, LegalResource, ConsultationOption } from '../types/businessInfo';

// Sample attorneys data
export const attorneys: Attorney[] = [
  {
    id: 'attorney-1',
    name: 'Sarah J. Williams',
    title: 'Managing Partner',
    specializations: ['Corporate Law', 'Mergers & Acquisitions', 'Business Litigation'],
    education: [
      'Harvard Law School, J.D., cum laude',
      'University of California Berkeley, B.A. Economics'
    ],
    barAdmissions: ['California State Bar', 'Federal District Court', 'U.S. Court of Appeals'],
    experience: '15+ years',
    bio: 'Sarah leads our corporate practice with extensive experience in complex business transactions, mergers and acquisitions, and commercial litigation. She has successfully represented Fortune 500 companies and emerging businesses in multi-million dollar transactions.',
    email: 'swilliams@lawfirm.com',
    phone: '(555) 123-4567',
    imageUrl: '/images/attorneys/sarah-williams.jpg'
  },
  {
    id: 'attorney-2',
    name: 'Michael R. Chen',
    title: 'Senior Partner',
    specializations: ['Personal Injury', 'Medical Malpractice', 'Civil Litigation'],
    education: [
      'Stanford Law School, J.D.',
      'UCLA, B.S. Biochemistry'
    ],
    barAdmissions: ['California State Bar', 'Federal District Court'],
    experience: '12+ years',
    bio: 'Michael specializes in personal injury and medical malpractice cases, securing over $50 million in settlements for his clients. His scientific background provides unique insights into complex medical and technical cases.',
    email: 'mchen@lawfirm.com',
    phone: '(555) 123-4568',
    imageUrl: '/images/attorneys/michael-chen.jpg'
  },
  {
    id: 'attorney-3',
    name: 'Jennifer L. Rodriguez',
    title: 'Partner',
    specializations: ['Family Law', 'Estate Planning', 'Probate'],
    education: [
      'University of California Los Angeles School of Law, J.D.',
      'USC, B.A. Psychology'
    ],
    barAdmissions: ['California State Bar', 'Probate Court'],
    experience: '10+ years',
    bio: 'Jennifer provides compassionate yet aggressive representation in family law matters and comprehensive estate planning services. She is certified in collaborative law and mediation.',
    email: 'jrodriguez@lawfirm.com',
    phone: '(555) 123-4569',
    imageUrl: '/images/attorneys/jennifer-rodriguez.jpg'
  }
];

// Practice areas with detailed information
export const practiceAreas: PracticeArea[] = [
  {
    id: 'corporate-law',
    name: 'Corporate Law',
    shortDescription: 'Comprehensive business legal services from startups to Fortune 500 companies.',
    fullDescription: 'Our corporate law practice provides comprehensive legal services to businesses of all sizes, from emerging startups to established corporations. We handle entity formation, corporate governance, securities offerings, mergers and acquisitions, contract negotiations, and regulatory compliance.',
    iconName: 'building',
    urgencyLevel: 'standard',
    processSteps: [
      'Initial consultation to understand business needs',
      'Legal strategy development and planning',
      'Documentation preparation and review',
      'Negotiation and transaction management',
      'Closing and post-transaction support'
    ],
    commonQuestions: [
      {
        question: 'What type of business entity should I form?',
        answer: 'The choice depends on factors like liability protection, tax implications, ownership structure, and growth plans. We analyze your specific situation to recommend the optimal entity type.'
      },
      {
        question: 'How long does it take to complete a business acquisition?',
        answer: 'Typical transactions take 60-120 days from letter of intent to closing, depending on complexity, due diligence requirements, and regulatory approvals needed.'
      }
    ],
    relatedAreas: ['business-litigation', 'intellectual-property', 'employment-law']
  },
  {
    id: 'personal-injury',
    name: 'Personal Injury',
    shortDescription: 'Fighting for maximum compensation for accident and injury victims.',
    fullDescription: 'We represent individuals who have been injured due to the negligence of others. Our personal injury practice includes auto accidents, slip and fall cases, medical malpractice, product liability, and wrongful death claims. We work on a contingency fee basis, meaning you pay nothing unless we win.',
    iconName: 'shield',
    urgencyLevel: 'urgent',
    processSteps: [
      'Free initial consultation and case evaluation',
      'Medical records and evidence collection',
      'Insurance company negotiations',
      'Filing lawsuit if necessary',
      'Settlement or trial representation'
    ],
    commonQuestions: [
      {
        question: 'How much does it cost to hire a personal injury lawyer?',
        answer: 'We work on a contingency fee basis. You pay no attorney fees unless we successfully recover compensation for you. Our fee is a percentage of the settlement or judgment.'
      },
      {
        question: 'How long do I have to file a personal injury claim?',
        answer: 'In California, the statute of limitations for most personal injury cases is two years from the date of injury. However, some cases have shorter deadlines, so it\'s important to consult with an attorney immediately.'
      }
    ],
    relatedAreas: ['medical-malpractice', 'workers-compensation', 'wrongful-death']
  },
  {
    id: 'family-law',
    name: 'Family Law',
    shortDescription: 'Compassionate representation for divorce, custody, and family matters.',
    fullDescription: 'Our family law practice handles all aspects of family legal matters with sensitivity and expertise. We provide representation in divorce proceedings, child custody and support, spousal support, property division, domestic violence protection, adoption, and prenuptial agreements.',
    iconName: 'heart',
    urgencyLevel: 'urgent',
    processSteps: [
      'Confidential consultation to discuss your situation',
      'Case strategy development and options review',
      'Document preparation and filing',
      'Negotiation and mediation services',
      'Court representation if needed'
    ],
    commonQuestions: [
      {
        question: 'How is child custody determined in California?',
        answer: 'California courts prioritize the best interests of the child, considering factors like the child\'s health, safety, welfare, and the ability of each parent to provide care. Courts prefer arrangements that allow frequent and continuing contact with both parents.'
      },
      {
        question: 'How long does a divorce take in California?',
        answer: 'California has a minimum 6-month waiting period from when divorce papers are served. Uncontested divorces may be finalized soon after this period, while contested cases can take 12-18 months or longer.'
      }
    ],
    relatedAreas: ['estate-planning', 'domestic-violence', 'adoption']
  },
  {
    id: 'estate-planning',
    name: 'Estate Planning',
    shortDescription: 'Protecting your assets and securing your family\'s future.',
    fullDescription: 'We help individuals and families create comprehensive estate plans to protect assets, minimize taxes, and ensure their wishes are carried out. Our services include wills, trusts, powers of attorney, healthcare directives, probate administration, and estate and gift tax planning.',
    iconName: 'document',
    urgencyLevel: 'standard',
    processSteps: [
      'Comprehensive assessment of assets and goals',
      'Estate planning strategy development',
      'Document drafting and preparation',
      'Review and signing of estate documents',
      'Ongoing plan maintenance and updates'
    ],
    commonQuestions: [
      {
        question: 'Do I need a will or a trust?',
        answer: 'The answer depends on your assets, family situation, and goals. A will is essential for everyone, while trusts can provide additional benefits like avoiding probate, privacy, and tax advantages for larger estates.'
      },
      {
        question: 'When should I update my estate plan?',
        answer: 'Review your estate plan after major life events like marriage, divorce, birth of children, significant changes in assets, or changes in tax laws. We recommend a comprehensive review every 3-5 years.'
      }
    ],
    relatedAreas: ['family-law', 'tax-law', 'business-succession']
  }
];

// Case results (anonymized but realistic)
export const caseResults: CaseResult[] = [
  {
    id: 'result-1',
    caseType: 'Personal Injury - Auto Accident',
    result: '$2.4 Million Settlement',
    description: 'Secured substantial settlement for client with traumatic brain injury in multi-vehicle collision.',
    year: '2023',
    isPublic: true
  },
  {
    id: 'result-2',
    caseType: 'Corporate M&A',
    result: '$45 Million Transaction',
    description: 'Successfully represented technology company in acquisition by Fortune 500 corporation.',
    year: '2023',
    isPublic: true
  },
  {
    id: 'result-3',
    caseType: 'Medical Malpractice',
    result: '$1.8 Million Verdict',
    description: 'Obtained favorable jury verdict for surgical malpractice resulting in permanent disability.',
    year: '2022',
    isPublic: true
  },
  {
    id: 'result-4',
    caseType: 'Family Law - Custody',
    result: 'Full Custody Awarded',
    description: 'Protected client\'s parental rights and secured primary custody of minor children.',
    year: '2023',
    isPublic: false
  }
];

// Legal resources for clients
export const legalResources: LegalResource[] = [
  {
    id: 'resource-1',
    title: 'Guide to Starting a Business in California',
    type: 'guide',
    summary: 'Comprehensive guide covering entity selection, registration, permits, and initial compliance requirements.',
    content: 'This guide provides step-by-step instructions for entrepreneurs looking to start a business in California...',
    practiceArea: 'corporate-law',
    downloadUrl: '/resources/business-startup-guide.pdf',
    lastUpdated: '2023-12-01'
  },
  {
    id: 'resource-2',
    title: 'What to Do After a Car Accident',
    type: 'guide',
    summary: 'Essential steps to protect your legal rights and maximize your compensation after an auto accident.',
    content: 'If you\'ve been injured in a car accident, taking the right steps immediately can significantly impact your case...',
    practiceArea: 'personal-injury',
    downloadUrl: '/resources/car-accident-guide.pdf',
    lastUpdated: '2023-11-15'
  },
  {
    id: 'resource-3',
    title: 'Estate Planning Frequently Asked Questions',
    type: 'faq',
    summary: 'Common questions about wills, trusts, and estate planning answered by our experienced attorneys.',
    content: 'Q: Do I need an estate plan if I don\'t have many assets? A: Yes, everyone should have basic estate planning documents...',
    practiceArea: 'estate-planning',
    lastUpdated: '2023-10-20'
  }
];

// Consultation options
export const consultationOptions: ConsultationOption[] = [
  {
    id: 'initial-consultation',
    type: 'inPerson',
    duration: '60 minutes',
    description: 'Comprehensive case evaluation and legal strategy discussion',
    price: 'Free for injury cases',
    isEmergency: false,
    availableHours: 'Monday-Friday 9AM-6PM'
  },
  {
    id: 'phone-consultation',
    type: 'phone',
    duration: '30 minutes',
    description: 'Initial case assessment and legal guidance',
    price: '$150',
    isEmergency: false,
    availableHours: 'Monday-Friday 8AM-7PM'
  },
  {
    id: 'emergency-consultation',
    type: 'phone',
    duration: '45 minutes',
    description: 'Immediate legal assistance for urgent matters',
    price: '$300',
    isEmergency: true,
    availableHours: '24/7 Emergency Line'
  },
  {
    id: 'video-consultation',
    type: 'video',
    duration: '45 minutes',
    description: 'Secure video conference with document review capability',
    price: '$200',
    isEmergency: false,
    availableHours: 'Monday-Friday 9AM-6PM'
  }
];

// Main law firm business information
export const lawBusinessInfo: LawBusinessInfo = {
  // Basic business information
  name: 'Williams, Chen & Rodriguez Law Firm',
  shortName: 'WCR Law',
  tagline: 'Experienced advocates for your legal needs',
  description: 'A distinguished law firm providing comprehensive legal services with integrity, expertise, and unwavering commitment to our clients. Our experienced attorneys combine deep legal knowledge with personalized attention to achieve the best possible outcomes for every case we handle.',
  shortDescription: 'Professional law firm providing expert legal representation and comprehensive legal services',

  // Address information
  address: {
    street: '1250 Financial District Boulevard',
    city: 'San Francisco',
    state: 'CA',
    zip: '94111',
    full: '1250 Financial District Boulevard, San Francisco, CA 94111',
    coordinates: {
      latitude: 37.7949,
      longitude: -122.3980
    }
  },

  // Contact information
  contact: {
    phone: {
      raw: '415-555-0123',
      formatted: '(415) 555-0123',
      link: 'tel:+14155550123'
    },
    email: 'info@wcrlaw.com'
  },

  // Social media
  social: {
    linkedin: 'https://linkedin.com/company/wcr-law',
    facebook: 'https://facebook.com/wcrlaw',
    twitter: 'https://twitter.com/wcrlaw'
  },

  // Website information
  website: {
    domain: 'wcrlaw.com',
    baseUrl: 'https://wcrlaw.com'
  },

  // Business hours
  hours: {
    monday: '8:00 AM - 6:00 PM',
    tuesday: '8:00 AM - 6:00 PM',
    wednesday: '8:00 AM - 6:00 PM',
    thursday: '8:00 AM - 6:00 PM',
    friday: '8:00 AM - 5:00 PM',
    saturday: 'By Appointment',
    sunday: 'Emergency Only'
  },

  // Basic features and services
  features: [
    'Experienced Legal Team',
    'Personalized Attention',
    'Proven Track Record',
    'Confidential Consultation'
  ],
  services: [
    'Corporate Law',
    'Personal Injury',
    'Family Law',
    'Estate Planning'
  ],

  // Law firm specific information
  firmName: 'Williams, Chen & Rodriguez Law Firm',
  established: '2008',
  motto: 'Justice Through Excellence',
  specialization: ['Business Law', 'Personal Injury', 'Family Law', 'Estate Planning'],

  // Legal credentials
  barAssociations: [
    'California State Bar Association',
    'American Bar Association',
    'San Francisco Bar Association',
    'California Trial Lawyers Association'
  ],
  certifications: [
    'Board Certified Business Law Specialist',
    'Certified Family Law Specialist',
    'Collaborative Law Certification',
    'Mediation Certification'
  ],
  awards: [
    'Super Lawyers Rising Stars 2023',
    'Best Lawyers in America',
    'Martindale-Hubbell AV Preeminent Rating',
    'San Francisco Business Journal Legal Award'
  ],

  // Practice information
  practiceAreas,
  attorneys,
  caseResults,
  consultationOptions,

  // Client resources
  resources: legalResources,
  emergencyContact: {
    phone: '(415) 555-0199',
    afterHoursPhone: '(415) 555-0123',
    email: 'emergency@wcrlaw.com',
    description: '24/7 emergency legal assistance for urgent matters'
  },

  // Office policies
  officePolicy: {
    confidentiality: 'All communications are protected by attorney-client privilege and maintained in strict confidence.',
    accessibility: 'Our office is fully ADA compliant with wheelchair access, hearing assistance, and multilingual support.',
    languages: ['English', 'Spanish', 'Mandarin', 'Korean'],
    paymentMethods: ['Cash', 'Check', 'Credit Card', 'Wire Transfer', 'Payment Plans']
  },

  // Legal disclaimers
  disclaimers: {
    general: 'The information on this website is for general information purposes only. Nothing on this site should be taken as legal advice for any individual case or situation.',
    consultation: 'A consultation does not create an attorney-client relationship. Past results do not guarantee future outcomes.',
    results: 'Case results depend on a variety of factors unique to each case. Past results do not guarantee, warrant, or predict future case outcomes.'
  }
};

// Utility functions for law firm data
export function getPracticeAreaById(id: string): PracticeArea | undefined {
  return practiceAreas.find(area => area.id === id);
}

export function getAttorneyById(id: string): Attorney | undefined {
  return attorneys.find(attorney => attorney.id === id);
}

export function getAttorneysBySpecialization(specialization: string): Attorney[] {
  return attorneys.filter(attorney => 
    attorney.specializations.some(spec => 
      spec.toLowerCase().includes(specialization.toLowerCase())
    )
  );
}

export function getUrgentPracticeAreas(): PracticeArea[] {
  return practiceAreas.filter(area => area.urgencyLevel === 'urgent' || area.urgencyLevel === 'emergency');
}

export function getEmergencyConsultations(): ConsultationOption[] {
  return consultationOptions.filter(option => option.isEmergency);
}

export function getResourcesByPracticeArea(practiceAreaId: string): LegalResource[] {
  return legalResources.filter(resource => resource.practiceArea === practiceAreaId);
}

// Export for use in components
export default lawBusinessInfo; 