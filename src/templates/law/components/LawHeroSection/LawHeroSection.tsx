/**
 * Law Firm Hero Section
 * Establishes immediate credibility and clear value proposition
 */

import React from 'react';
import { lawBusinessInfo } from '../../data/businessInfo';
import styles from './LawHeroSection.module.css';

const LawHeroSection: React.FC = () => {
  const handleConsultationClick = () => {
    // Scroll to consultation section
    const consultationSection = document.getElementById('consultation');
    consultationSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleEmergencyCall = () => {
    window.location.href = lawBusinessInfo.emergencyContact.phone.replace(/[^\d]/g, '');
  };

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          {/* Firm establishment and credibility */}
          <div className={styles.credibilityBadge}>
            <span className={styles.establishedYear}>Est. {lawBusinessInfo.established}</span>
            <span className={styles.separator}>•</span>
            <span className={styles.barAssociation}>
              {lawBusinessInfo.barAssociations[0]}
            </span>
          </div>

          {/* Main heading with firm name */}
          <h1 className={styles.heroTitle}>
            <span className={styles.firmPrefix}>The Law Offices of</span>
            <strong className={styles.firmName}>{lawBusinessInfo.firmName}</strong>
          </h1>

          {/* Firm motto and specialization */}
          <p className={styles.motto}>"{lawBusinessInfo.motto}"</p>
          
          <div className={styles.specializations}>
            {lawBusinessInfo.specialization.map((spec, index) => (
              <span key={spec} className={styles.specializationTag}>
                {spec}
                {index < lawBusinessInfo.specialization.length - 1 && (
                  <span className={styles.tagSeparator}>•</span>
                )}
              </span>
            ))}
          </div>

          {/* Value proposition */}
          <p className={styles.valueProposition}>
            {lawBusinessInfo.description}
          </p>

          {/* Trust indicators */}
          <div className={styles.trustIndicators}>
            <div className={styles.trustItem}>
              <span className={styles.trustNumber}>15+</span>
              <span className={styles.trustLabel}>Years Experience</span>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustNumber}>500+</span>
              <span className={styles.trustLabel}>Cases Won</span>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustNumber}>$50M+</span>
              <span className={styles.trustLabel}>Recovered</span>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className={styles.heroActions}>
            <button 
              onClick={handleConsultationClick}
              className={styles.primaryButton}
              aria-label="Schedule a free consultation"
            >
              <span className={styles.buttonIcon}>📅</span>
              Schedule Free Consultation
            </button>
            
            <a 
              href={`tel:${lawBusinessInfo.contact.phone.raw}`}
              className={styles.secondaryButton}
              aria-label="Call now for immediate assistance"
            >
              <span className={styles.buttonIcon}>📞</span>
              Call Now: {lawBusinessInfo.contact.phone.formatted}
            </a>
          </div>

          {/* Emergency contact */}
          <div className={styles.emergencyContact}>
            <span className={styles.emergencyLabel}>Emergency Legal Assistance:</span>
            <a 
              href={`tel:${lawBusinessInfo.emergencyContact.phone}`}
              className={styles.emergencyPhone}
              aria-label="24/7 emergency legal line"
            >
              {lawBusinessInfo.emergencyContact.phone} (24/7)
            </a>
          </div>

          {/* Confidentiality assurance */}
          <div className={styles.confidentialityNote}>
            <span className={styles.lockIcon}>🔒</span>
            <span>All consultations are confidential and protected by attorney-client privilege</span>
          </div>
        </div>

        {/* Hero Image/Visual */}
        <div className={styles.heroVisual}>
          <div className={styles.visualContent}>
            {/* Law-themed visual elements */}
            <div className={styles.legalIcons}>
              <div className={styles.iconItem}>⚖️</div>
              <div className={styles.iconItem}>🏛️</div>
              <div className={styles.iconItem}>📋</div>
              <div className={styles.iconItem}>🛡️</div>
            </div>
            
            {/* Professional image placeholder */}
            <div className={styles.heroImagePlaceholder}>
              <div className={styles.imageOverlay}>
                <h3>Professional Legal Representation</h3>
                <p>Protecting your rights with integrity and expertise</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick access bar for urgent legal matters */}
      <div className={styles.urgentAccessBar}>
        <div className={styles.urgentContent}>
          <span className={styles.urgentLabel}>Need Immediate Legal Help?</span>
          <div className={styles.urgentActions}>
            <a 
              href={`tel:${lawBusinessInfo.emergencyContact.phone}`}
              className={styles.urgentCall}
            >
              Emergency Line: {lawBusinessInfo.emergencyContact.phone}
            </a>
            <button 
              onClick={handleConsultationClick}
              className={styles.urgentConsult}
            >
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LawHeroSection; 