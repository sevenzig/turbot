/**
 * Practice Areas Section
 * Showcases legal specializations with urgency indicators and process information
 */

import React, { useState } from 'react';
import { lawBusinessInfo, getPracticeAreaById, getUrgentPracticeAreas } from '../../data/businessInfo';
import type { PracticeArea } from '../../types/businessInfo';
import styles from './PracticeAreasSection.module.css';

const PracticeAreasSection: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState<PracticeArea | null>(null);
  const [showAllAreas, setShowAllAreas] = useState(false);
  
  const urgentAreas = getUrgentPracticeAreas();
  const displayAreas = showAllAreas ? lawBusinessInfo.practiceAreas : lawBusinessInfo.practiceAreas.slice(0, 4);

  const getUrgencyIcon = (urgencyLevel: string) => {
    switch (urgencyLevel) {
      case 'emergency':
        return '🚨';
      case 'urgent':
        return '⚡';
      default:
        return '📋';
    }
  };

  const getUrgencyColor = (urgencyLevel: string) => {
    switch (urgencyLevel) {
      case 'emergency':
        return 'var(--color-error)';
      case 'urgent':
        return 'var(--color-warning)';
      default:
        return 'var(--color-primary)';
    }
  };

  const handleAreaClick = (area: PracticeArea) => {
    setSelectedArea(selectedArea?.id === area.id ? null : area);
  };

  const handleConsultation = (practiceArea: string) => {
    // Scroll to consultation section with practice area context
    const consultationSection = document.getElementById('consultation');
    if (consultationSection) {
      consultationSection.scrollIntoView({ behavior: 'smooth' });
      // Could store practice area in state/context for form pre-population
      console.log('Consultation requested for:', practiceArea);
    }
  };

  return (
    <section className={styles.practiceAreasSection} id="practice-areas">
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Practice Areas</h2>
          <p className={styles.sectionDescription}>
            Comprehensive legal services delivered with expertise, integrity, and unwavering commitment to our clients
          </p>
        </div>

        {/* Urgent Legal Matters Banner */}
        {urgentAreas.length > 0 && (
          <div className={styles.urgentBanner}>
            <div className={styles.urgentContent}>
              <div className={styles.urgentIcon}>⚡</div>
              <div className={styles.urgentText}>
                <h3>Need Immediate Legal Assistance?</h3>
                <p>
                  For urgent matters like {urgentAreas.map(area => area.name).join(', ')}, 
                  contact us immediately for time-sensitive legal guidance.
                </p>
              </div>
              <a 
                href={`tel:${lawBusinessInfo.emergencyContact.phone}`}
                className={styles.urgentCallButton}
              >
                Call Emergency Line
              </a>
            </div>
          </div>
        )}

        {/* Practice Areas Grid */}
        <div className={styles.practiceAreasGrid}>
          {displayAreas.map((area) => (
            <div 
              key={area.id}
              className={`${styles.practiceAreaCard} ${selectedArea?.id === area.id ? styles.expanded : ''}`}
              onClick={() => handleAreaClick(area)}
            >
              {/* Card Header */}
              <div className={styles.cardHeader}>
                <div className={styles.areaIcon}>
                  {getUrgencyIcon(area.urgencyLevel)}
                </div>
                <div className={styles.areaInfo}>
                  <h3 className={styles.areaTitle}>{area.name}</h3>
                  <div 
                    className={styles.urgencyBadge}
                    style={{ backgroundColor: getUrgencyColor(area.urgencyLevel) }}
                  >
                    {area.urgencyLevel}
                  </div>
                </div>
                <div className={styles.expandIcon}>
                  {selectedArea?.id === area.id ? '−' : '+'}
                </div>
              </div>

              {/* Short Description */}
              <p className={styles.shortDescription}>{area.shortDescription}</p>

              {/* Expanded Content */}
              {selectedArea?.id === area.id && (
                <div className={styles.expandedContent}>
                  {/* Full Description */}
                  <div className={styles.fullDescription}>
                    <h4>About This Practice Area</h4>
                    <p>{area.fullDescription}</p>
                  </div>

                  {/* Process Steps */}
                  <div className={styles.processSteps}>
                    <h4>Our Process</h4>
                    <ol className={styles.stepsList}>
                      {area.processSteps.map((step, index) => (
                        <li key={index} className={styles.stepItem}>
                          <span className={styles.stepNumber}>{index + 1}</span>
                          <span className={styles.stepText}>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Common Questions */}
                  <div className={styles.commonQuestions}>
                    <h4>Frequently Asked Questions</h4>
                    <div className={styles.faqList}>
                      {area.commonQuestions.slice(0, 2).map((faq, index) => (
                        <div key={index} className={styles.faqItem}>
                          <h5 className={styles.faqQuestion}>{faq.question}</h5>
                          <p className={styles.faqAnswer}>{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Related Areas */}
                  {area.relatedAreas.length > 0 && (
                    <div className={styles.relatedAreas}>
                      <h4>Related Practice Areas</h4>
                      <div className={styles.relatedTags}>
                        {area.relatedAreas.map((relatedId) => {
                          const relatedArea = getPracticeAreaById(relatedId);
                          return relatedArea ? (
                            <span key={relatedId} className={styles.relatedTag}>
                              {relatedArea.name}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className={styles.cardActions}>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleConsultation(area.name);
                      }}
                      className={styles.consultButton}
                    >
                      Schedule Consultation
                    </button>
                    <a 
                      href={`tel:${lawBusinessInfo.contact.phone.raw}`}
                      className={styles.callButton}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Call: {lawBusinessInfo.contact.phone.formatted}
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Show More/Less Button */}
        {lawBusinessInfo.practiceAreas.length > 4 && (
          <div className={styles.showMoreSection}>
            <button 
              onClick={() => setShowAllAreas(!showAllAreas)}
              className={styles.showMoreButton}
            >
              {showAllAreas ? 'Show Less Practice Areas' : 'View All Practice Areas'}
              <span className={styles.showMoreIcon}>
                {showAllAreas ? '↑' : '↓'}
              </span>
            </button>
          </div>
        )}

        {/* Bottom CTA */}
        <div className={styles.bottomCTA}>
          <div className={styles.ctaContent}>
            <h3>Don't See Your Legal Issue Listed?</h3>
            <p>
              We handle a wide range of legal matters beyond our primary practice areas. 
              Contact us to discuss your specific legal needs and how we can help.
            </p>
            <div className={styles.ctaActions}>
              <button 
                onClick={() => handleConsultation('General Legal Consultation')}
                className={styles.primaryCTA}
              >
                Get Legal Consultation
              </button>
              <a 
                href={`mailto:${lawBusinessInfo.contact.email}`}
                className={styles.secondaryCTA}
              >
                Email Our Firm
              </a>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className={styles.disclaimer}>
          <p>{lawBusinessInfo.disclaimers.general}</p>
        </div>
      </div>
    </section>
  );
};

export default PracticeAreasSection; 