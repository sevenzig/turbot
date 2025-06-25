/**
 * Credibility Section
 * Showcases legal credentials, awards, and trust indicators
 */

import React from 'react';
import { lawBusinessInfo } from '../../data/businessInfo';
import styles from './CredibilitySection.module.css';

const CredibilitySection: React.FC = () => {
  const trustStats = [
    { number: '15+', label: 'Years of Experience', icon: '📅' },
    { number: '$50M+', label: 'Recovered for Clients', icon: '💰' },
    { number: '500+', label: 'Cases Successfully Resolved', icon: '⚖️' },
    { number: '24/7', label: 'Emergency Legal Support', icon: '🚨' },
  ];

  return (
    <section className={styles.credibilitySection} id="credentials">
      <div className={styles.container}>
        {/* Trust Statistics */}
        <div className={styles.trustStats}>
          <div className={styles.statsGrid}>
            {trustStats.map((stat, index) => (
              <div key={index} className={styles.statItem}>
                <div className={styles.statIcon}>{stat.icon}</div>
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Credentials Grid */}
        <div className={styles.credentialsGrid}>
          {/* Bar Associations */}
          <div className={styles.credentialCategory}>
            <div className={styles.categoryHeader}>
              <div className={styles.categoryIcon}>🏛️</div>
              <h3 className={styles.categoryTitle}>Bar Associations</h3>
            </div>
            <div className={styles.credentialList}>
              {lawBusinessInfo.barAssociations.map((association, index) => (
                <div key={index} className={styles.credentialItem}>
                  <div className={styles.credentialIcon}>✓</div>
                  <span className={styles.credentialText}>{association}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className={styles.credentialCategory}>
            <div className={styles.categoryHeader}>
              <div className={styles.categoryIcon}>🏆</div>
              <h3 className={styles.categoryTitle}>Certifications & Specializations</h3>
            </div>
            <div className={styles.credentialList}>
              {lawBusinessInfo.certifications.map((certification, index) => (
                <div key={index} className={styles.credentialItem}>
                  <div className={styles.credentialIcon}>⭐</div>
                  <span className={styles.credentialText}>{certification}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Awards & Recognition */}
          <div className={styles.credentialCategory}>
            <div className={styles.categoryHeader}>
              <div className={styles.categoryIcon}>🏅</div>
              <h3 className={styles.categoryTitle}>Awards & Recognition</h3>
            </div>
            <div className={styles.credentialList}>
              {lawBusinessInfo.awards.map((award, index) => (
                <div key={index} className={styles.credentialItem}>
                  <div className={styles.credentialIcon}>🏅</div>
                  <span className={styles.credentialText}>{award}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Languages & Accessibility */}
          <div className={styles.credentialCategory}>
            <div className={styles.categoryHeader}>
              <div className={styles.categoryIcon}>🌍</div>
              <h3 className={styles.categoryTitle}>Languages & Accessibility</h3>
            </div>
            <div className={styles.credentialList}>
              {lawBusinessInfo.officePolicy.languages.map((language, index) => (
                <div key={index} className={styles.credentialItem}>
                  <div className={styles.credentialIcon}>🗣️</div>
                  <span className={styles.credentialText}>{language}</span>
                </div>
              ))}
              <div className={styles.credentialItem}>
                <div className={styles.credentialIcon}>♿</div>
                <span className={styles.credentialText}>ADA Compliant Office</span>
              </div>
            </div>
          </div>
        </div>

        {/* Firm Establishment & Motto */}
        <div className={styles.firmInfo}>
          <div className={styles.firmBadge}>
            <div className={styles.establishedInfo}>
              <span className={styles.establishedLabel}>Established</span>
              <span className={styles.establishedYear}>{lawBusinessInfo.established}</span>
            </div>
            <div className={styles.firmMotto}>
              <div className={styles.mottoIcon}>⚖️</div>
              <span className={styles.mottoText}>"{lawBusinessInfo.motto}"</span>
            </div>
          </div>
        </div>

        {/* Professional Guarantees */}
        <div className={styles.guarantees}>
          <h3 className={styles.guaranteesTitle}>Our Professional Commitments</h3>
          
          <div className={styles.guaranteeGrid}>
            <div className={styles.guaranteeItem}>
              <div className={styles.guaranteeIcon}>🔒</div>
              <h4 className={styles.guaranteeTitle}>Complete Confidentiality</h4>
              <p className={styles.guaranteeDescription}>
                All communications protected by attorney-client privilege from the first contact.
              </p>
            </div>

            <div className={styles.guaranteeItem}>
              <div className={styles.guaranteeIcon}>⏱️</div>
              <h4 className={styles.guaranteeTitle}>Timely Response</h4>
              <p className={styles.guaranteeDescription}>
                We respond to all client communications within 24 hours, often much sooner.
              </p>
            </div>

            <div className={styles.guaranteeItem}>
              <div className={styles.guaranteeIcon}>💯</div>
              <h4 className={styles.guaranteeTitle}>Ethical Practice</h4>
              <p className={styles.guaranteeDescription}>
                We adhere to the highest ethical standards and maintain transparency in all dealings.
              </p>
            </div>

            <div className={styles.guaranteeItem}>
              <div className={styles.guaranteeIcon}>🎯</div>
              <h4 className={styles.guaranteeTitle}>Results-Focused</h4>
              <p className={styles.guaranteeDescription}>
                We develop strategic approaches tailored to achieve the best possible outcomes.
              </p>
            </div>
          </div>
        </div>

        {/* Payment & Accessibility Information */}
        <div className={styles.practiceInfo}>
          <div className={styles.infoSection}>
            <h4 className={styles.infoTitle}>Payment Options</h4>
            <div className={styles.paymentMethods}>
              {lawBusinessInfo.officePolicy.paymentMethods.map((method, index) => (
                <span key={index} className={styles.paymentMethod}>
                  {method}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.infoSection}>
            <h4 className={styles.infoTitle}>Office Policy</h4>
            <div className={styles.policyInfo}>
              <p className={styles.policyText}>
                {lawBusinessInfo.officePolicy.confidentiality}
              </p>
              <p className={styles.policyText}>
                {lawBusinessInfo.officePolicy.accessibility}
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className={styles.credibilityCTA}>
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaTitle}>Experience the Difference Professional Legal Representation Makes</h3>
            <p className={styles.ctaDescription}>
              Our credentials speak for themselves, but our commitment to your case is what sets us apart.
            </p>
            <div className={styles.ctaActions}>
              <a 
                href="#consultation" 
                className={styles.primaryCTA}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Schedule Consultation
              </a>
              <a 
                href={`tel:${lawBusinessInfo.contact.phone.raw}`}
                className={styles.secondaryCTA}
              >
                Call: {lawBusinessInfo.contact.phone.formatted}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CredibilitySection; 