/**
 * Emergency Contact Section
 * Handles urgent legal matters and emergency consultation requests
 */

import React, { useState } from 'react';
import { lawBusinessInfo } from '../../data/businessInfo';
import styles from './EmergencyContactSection.module.css';

const EmergencyContactSection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const urgentAreas = getUrgentPracticeAreas();

  const emergencyScenarios = [
    {
      icon: '🚨',
      title: 'Criminal Arrest',
      description: 'If you or a loved one has been arrested, time is critical. Contact us immediately.',
      urgency: 'immediate'
    },
    {
      icon: '⏰',
      title: 'Court Deadlines',
      description: 'Missing court deadlines can severely impact your case. Get emergency assistance.',
      urgency: 'urgent'
    },
    {
      icon: '🏠',
      title: 'Restraining Orders',
      description: 'Domestic violence situations require immediate legal protection and intervention.',
      urgency: 'immediate'
    },
    {
      icon: '⚡',
      title: 'Emergency Injunctions',
      description: 'Business disputes requiring immediate court intervention to prevent harm.',
      urgency: 'urgent'
    },
    {
      icon: '🆘',
      title: 'Child Custody Emergencies',
      description: 'Urgent child welfare or custody situations that cannot wait for regular hours.',
      urgency: 'immediate'
    },
    {
      icon: '🏢',
      title: 'Business Crises',
      description: 'Corporate emergencies, regulatory actions, or time-sensitive business matters.',
      urgency: 'urgent'
    }
  ];

  const handleEmergencyCall = () => {
    window.location.href = `tel:${lawBusinessInfo.emergencyContact.phone}`;
  };

  const handleRegularCall = () => {
    window.location.href = `tel:${lawBusinessInfo.contact.phone.raw}`;
  };

  return (
    <section className={styles.emergencySection} id="emergency-contact">
      <div className={styles.container}>
        {/* Main Emergency Banner */}
        <div className={styles.emergencyBanner}>
          <div className={styles.bannerContent}>
            <div className={styles.emergencyIcon}>🚨</div>
            <div className={styles.emergencyText}>
              <h2 className={styles.emergencyTitle}>Legal Emergency?</h2>
              <p className={styles.emergencySubtitle}>
                {lawBusinessInfo.emergencyContact.description}
              </p>
            </div>
            <div className={styles.emergencyActions}>
              <button 
                onClick={handleEmergencyCall}
                className={styles.emergencyButton}
              >
                <span className={styles.buttonIcon}>📞</span>
                Call Emergency Line
                <span className={styles.emergencyNumber}>
                  {lawBusinessInfo.emergencyContact.phone}
                </span>
              </button>
              
              {lawBusinessInfo.emergencyContact.afterHoursPhone && (
                <a 
                  href={`tel:${lawBusinessInfo.emergencyContact.afterHoursPhone}`}
                  className={styles.afterHoursButton}
                >
                  After Hours: {lawBusinessInfo.emergencyContact.afterHoursPhone}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Emergency Scenarios */}
        <div className={styles.scenariosSection}>
          <div className={styles.scenariosHeader}>
            <h3 className={styles.scenariosTitle}>When to Call Our Emergency Line</h3>
            <p className={styles.scenariosDescription}>
              Don't wait if you're facing any of these urgent legal situations. Our emergency line is staffed 24/7.
            </p>
          </div>

          <div className={styles.scenariosGrid}>
            {emergencyScenarios.map((scenario, index) => (
              <div 
                key={index} 
                className={`${styles.scenarioCard} ${scenario.urgency === 'immediate' ? styles.immediate : styles.urgent}`}
              >
                <div className={styles.scenarioIcon}>{scenario.icon}</div>
                <h4 className={styles.scenarioTitle}>{scenario.title}</h4>
                <p className={styles.scenarioDescription}>{scenario.description}</p>
                <div className={styles.urgencyBadge}>
                  {scenario.urgency === 'immediate' ? 'Call Immediately' : 'Urgent - Same Day'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Process */}
        <div className={styles.processSection}>
          <h3 className={styles.processTitle}>Emergency Legal Assistance Process</h3>
          
          <div className={styles.processSteps}>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h4 className={styles.stepTitle}>Immediate Response</h4>
                <p className={styles.stepDescription}>
                  Call our emergency line. You'll speak directly with an attorney or legal professional within minutes.
                </p>
              </div>
            </div>

            <div className={styles.processStep}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h4 className={styles.stepTitle}>Rapid Assessment</h4>
                <p className={styles.stepDescription}>
                  We quickly assess your situation and provide immediate guidance to protect your rights.
                </p>
              </div>
            </div>

            <div className={styles.processStep}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <h4 className={styles.stepTitle}>Emergency Action</h4>
                <p className={styles.stepDescription}>
                  If needed, we take immediate legal action including emergency filings, injunctions, or court appearances.
                </p>
              </div>
            </div>

            <div className={styles.processStep}>
              <div className={styles.stepNumber}>4</div>
              <div className={styles.stepContent}>
                <h4 className={styles.stepTitle}>Ongoing Support</h4>
                <p className={styles.stepDescription}>
                  We provide continuous support throughout your case with regular updates and strategic guidance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Options */}
        <div className={styles.contactOptions}>
          <h3 className={styles.contactTitle}>Emergency Contact Methods</h3>
          
          <div className={styles.contactGrid}>
            {/* Emergency Phone */}
            <div className={styles.contactMethod}>
              <div className={styles.contactIcon}>🚨</div>
              <h4 className={styles.contactMethodTitle}>Emergency Line</h4>
              <div className={styles.contactDetails}>
                <a 
                  href={`tel:${lawBusinessInfo.emergencyContact.phone}`}
                  className={styles.contactLink}
                >
                  {lawBusinessInfo.emergencyContact.phone}
                </a>
                <span className={styles.contactAvailability}>24/7 Availability</span>
              </div>
              <p className={styles.contactDescription}>
                For immediate legal emergencies requiring urgent attention
              </p>
            </div>

            {/* Regular Phone */}
            <div className={styles.contactMethod}>
              <div className={styles.contactIcon}>📞</div>
              <h4 className={styles.contactMethodTitle}>Main Office</h4>
              <div className={styles.contactDetails}>
                <a 
                  href={`tel:${lawBusinessInfo.contact.phone.raw}`}
                  className={styles.contactLink}
                >
                  {lawBusinessInfo.contact.phone.formatted}
                </a>
                <span className={styles.contactAvailability}>Business Hours</span>
              </div>
              <p className={styles.contactDescription}>
                For general inquiries and non-emergency consultations
              </p>
            </div>

            {/* Emergency Email */}
            <div className={styles.contactMethod}>
              <div className={styles.contactIcon}>📧</div>
              <h4 className={styles.contactMethodTitle}>Emergency Email</h4>
              <div className={styles.contactDetails}>
                <a 
                  href={`mailto:${lawBusinessInfo.emergencyContact.email}`}
                  className={styles.contactLink}
                >
                  {lawBusinessInfo.emergencyContact.email}
                </a>
                <span className={styles.contactAvailability}>Monitored 24/7</span>
              </div>
              <p className={styles.contactDescription}>
                For urgent matters when phone contact isn't possible
              </p>
            </div>
          </div>
        </div>

        {/* Expandable Information */}
        <div className={styles.expandableSection}>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className={styles.expandButton}
          >
            <span>What Information Should I Have Ready?</span>
            <span className={styles.expandIcon}>{isExpanded ? '−' : '+'}</span>
          </button>
          
          {isExpanded && (
            <div className={styles.expandedContent}>
              <div className={styles.preparationInfo}>
                <h4>Before Calling, Try to Have Ready:</h4>
                <ul className={styles.preparationList}>
                  <li>Your full name and contact information</li>
                  <li>Brief description of the legal emergency</li>
                  <li>Any court documents or case numbers</li>
                  <li>Timeline of events leading to the emergency</li>
                  <li>Names of other parties involved</li>
                  <li>Any deadlines you're aware of</li>
                  <li>Your current location if detained or in custody</li>
                </ul>
                
                <div className={styles.confidentialityNote}>
                  <div className={styles.noteIcon}>🔒</div>
                  <div className={styles.noteText}>
                    <strong>Complete Confidentiality:</strong> All emergency communications are protected by attorney-client privilege. 
                    We understand the sensitive nature of legal emergencies and maintain strict confidentiality.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className={styles.bottomCTA}>
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaTitle}>Don't Face Legal Emergencies Alone</h3>
            <p className={styles.ctaDescription}>
              When urgent legal matters arise, having experienced legal representation can make the difference 
              between a favorable outcome and a legal disaster. Our emergency line ensures you're never without 
              professional legal support.
            </p>
            
            <div className={styles.ctaButtons}>
              <button 
                onClick={handleEmergencyCall}
                className={styles.primaryCTA}
              >
                Call Emergency Line Now
              </button>
              
              <button 
                onClick={handleRegularCall}
                className={styles.secondaryCTA}
              >
                Schedule Regular Consultation
              </button>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className={styles.disclaimer}>
          <p>
            <strong>Important:</strong> This emergency line is for legal emergencies only. 
            For medical emergencies, call 911 immediately. {lawBusinessInfo.disclaimers.general}
          </p>
        </div>
      </div>
    </section>
  );
};

export default EmergencyContactSection; 