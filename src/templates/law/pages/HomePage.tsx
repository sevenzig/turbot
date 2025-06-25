/**
 * Law Firm Homepage
 * Optimized for legal practice user journey and conversion goals
 */

import React from 'react';
import LawHeroSection from '../components/sections/LawHeroSection/LawHeroSection';
import CredibilitySection from '../components/sections/CredibilitySection/CredibilitySection';
import PracticeAreasSection from '../components/sections/PracticeAreasSection/PracticeAreasSection';
import AttorneysSection from '../components/sections/AttorneysSection/AttorneysSection';
import ResultsSection from '../components/sections/ResultsSection/ResultsSection';
import ConsultationSection from '../components/sections/ConsultationSection/ConsultationSection';
import EmergencyContactSection from '../components/sections/EmergencyContactSection/EmergencyContactSection';
import styles from './HomePage.module.css';

const HomePage: React.FC = () => {
  return (
    <div className={styles.lawHomePage}>
      {/* Hero Section - Immediate credibility and clear value proposition */}
      <LawHeroSection />
      
      {/* Credibility Section - Awards, certifications, bar admissions */}
      <CredibilitySection />
      
      {/* Practice Areas - Detailed legal services with urgency indicators */}
      <PracticeAreasSection />
      
      {/* Attorneys Section - Team credentials and specializations */}
      <AttorneysSection preview={true} />
      
      {/* Results Section - Case outcomes and testimonials */}
      <ResultsSection />
      
      {/* Consultation Section - Multiple consultation options */}
      <ConsultationSection />
      
      {/* Emergency Contact - 24/7 availability for urgent matters */}
      <EmergencyContactSection />
    </div>
  );
};

export default HomePage; 