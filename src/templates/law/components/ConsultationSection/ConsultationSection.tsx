/**
 * Consultation Section
 * Primary conversion component for legal consultation scheduling
 */

import React, { useState } from 'react';
import { lawBusinessInfo, getEmergencyConsultations } from '../../data/businessInfo';
import type { ConsultationOption } from '../../types/businessInfo';
import styles from './ConsultationSection.module.css';

interface FormData {
  name: string;
  email: string;
  phone: string;
  legalMatterType: string;
  urgency: 'low' | 'medium' | 'high' | 'emergency';
  consultationType: string;
  preferredDate: string;
  preferredTime: string;
  description: string;
  hasRetainedAttorney: boolean;
  referralSource: string;
}

const ConsultationSection: React.FC = () => {
  const [selectedConsultation, setSelectedConsultation] = useState<ConsultationOption | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    legalMatterType: '',
    urgency: 'medium',
    consultationType: '',
    preferredDate: '',
    preferredTime: '',
    description: '',
    hasRetainedAttorney: false,
    referralSource: ''
  });

  const emergencyConsultations = getEmergencyConsultations();
  const standardConsultations = lawBusinessInfo.consultationOptions.filter(opt => !opt.isEmergency);

  const practiceAreaOptions = lawBusinessInfo.practiceAreas.map(area => area.name);

  const getConsultationIcon = (type: string) => {
    switch (type) {
      case 'phone':
        return '📞';
      case 'video':
        return '📹';
      case 'inPerson':
        return '🏛️';
      default:
        return '💼';
    }
  };

  const handleConsultationSelect = (consultation: ConsultationOption) => {
    setSelectedConsultation(consultation);
    setFormData(prev => ({
      ...prev,
      consultationType: consultation.type
    }));
    setShowForm(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checkbox.checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, this would send data to your backend
      console.log('Consultation request:', formData);
      
      setSubmitStatus('success');
      setIsSubmitting(false);
      
      // Reset form after successful submission
      setTimeout(() => {
        setShowForm(false);
        setSubmitStatus('idle');
        setFormData({
          name: '',
          email: '',
          phone: '',
          legalMatterType: '',
          urgency: 'medium',
          consultationType: '',
          preferredDate: '',
          preferredTime: '',
          description: '',
          hasRetainedAttorney: false,
          referralSource: ''
        });
      }, 3000);
    } catch (error) {
      setSubmitStatus('error');
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name && formData.email && formData.phone && formData.legalMatterType && formData.description;

  return (
    <section className={styles.consultationSection} id="consultation">
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Schedule Your Legal Consultation</h2>
          <p className={styles.sectionDescription}>
            Take the first step toward resolving your legal matter. Our experienced attorneys are ready to provide you with personalized legal guidance.
          </p>
        </div>

        {/* Emergency Consultation Banner */}
        {emergencyConsultations.length > 0 && (
          <div className={styles.emergencySection}>
            <div className={styles.emergencyBanner}>
              <div className={styles.emergencyContent}>
                <div className={styles.emergencyIcon}>🚨</div>
                <div className={styles.emergencyText}>
                  <h3>Need Immediate Legal Assistance?</h3>
                  <p>For urgent legal matters requiring immediate attention, we offer 24/7 emergency consultations.</p>
                </div>
                <a 
                  href={`tel:${lawBusinessInfo.emergencyContact.phone}`}
                  className={styles.emergencyButton}
                >
                  Call Emergency Line
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Consultation Options */}
        <div className={styles.consultationOptions}>
          <h3 className={styles.optionsTitle}>Choose Your Consultation Type</h3>
          
          <div className={styles.optionsGrid}>
            {standardConsultations.map((consultation) => (
              <div 
                key={consultation.id}
                className={`${styles.optionCard} ${selectedConsultation?.id === consultation.id ? styles.selected : ''}`}
                onClick={() => handleConsultationSelect(consultation)}
              >
                <div className={styles.optionIcon}>
                  {getConsultationIcon(consultation.type)}
                </div>
                
                <div className={styles.optionInfo}>
                  <h4 className={styles.optionTitle}>
                    {consultation.type === 'inPerson' ? 'In-Person' : 
                     consultation.type === 'phone' ? 'Phone' : 'Video'} Consultation
                  </h4>
                  
                  <p className={styles.optionDescription}>
                    {consultation.description}
                  </p>
                  
                  <div className={styles.optionDetails}>
                    <div className={styles.detail}>
                      <span className={styles.detailLabel}>Duration:</span>
                      <span className={styles.detailValue}>{consultation.duration}</span>
                    </div>
                    
                    <div className={styles.detail}>
                      <span className={styles.detailLabel}>Price:</span>
                      <span className={styles.detailValue}>{consultation.price}</span>
                    </div>
                    
                    <div className={styles.detail}>
                      <span className={styles.detailLabel}>Available:</span>
                      <span className={styles.detailValue}>{consultation.availableHours}</span>
                    </div>
                  </div>
                </div>
                
                <div className={styles.selectButton}>
                  Select This Option
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Consultation Form */}
        {showForm && selectedConsultation && (
          <div className={styles.formSection}>
            <div className={styles.formHeader}>
              <h3 className={styles.formTitle}>
                Schedule Your {selectedConsultation.type === 'inPerson' ? 'In-Person' : 
                              selectedConsultation.type === 'phone' ? 'Phone' : 'Video'} Consultation
              </h3>
              <p className={styles.formDescription}>
                Please provide the following information so we can better assist you with your legal matter.
              </p>
            </div>

            <form onSubmit={handleSubmit} className={styles.consultationForm}>
              {/* Personal Information */}
              <div className={styles.formSection}>
                <h4 className={styles.sectionTitle}>Personal Information</h4>
                
                <div className={styles.inputGrid}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="name" className={styles.label}>Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={styles.input}
                      required
                    />
                  </div>
                  
                  <div className={styles.inputGroup}>
                    <label htmlFor="email" className={styles.label}>Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={styles.input}
                      required
                    />
                  </div>
                  
                  <div className={styles.inputGroup}>
                    <label htmlFor="phone" className={styles.label}>Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={styles.input}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Legal Matter Information */}
              <div className={styles.formSection}>
                <h4 className={styles.sectionTitle}>Legal Matter Information</h4>
                
                <div className={styles.inputGrid}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="legalMatterType" className={styles.label}>Type of Legal Matter *</label>
                    <select
                      id="legalMatterType"
                      name="legalMatterType"
                      value={formData.legalMatterType}
                      onChange={handleInputChange}
                      className={styles.select}
                      required
                    >
                      <option value="">Select a practice area</option>
                      {practiceAreaOptions.map(area => (
                        <option key={area} value={area}>{area}</option>
                      ))}
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div className={styles.inputGroup}>
                    <label htmlFor="urgency" className={styles.label}>Urgency Level</label>
                    <select
                      id="urgency"
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleInputChange}
                      className={styles.select}
                    >
                      <option value="low">Low - Not time sensitive</option>
                      <option value="medium">Medium - Within a few weeks</option>
                      <option value="high">High - Within a few days</option>
                      <option value="emergency">Emergency - Immediate attention needed</option>
                    </select>
                  </div>
                </div>
                
                <div className={styles.inputGroup}>
                  <label htmlFor="description" className={styles.label}>Brief Description of Your Legal Matter *</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className={styles.textarea}
                    rows={4}
                    placeholder="Please provide a brief description of your legal situation. This information is confidential and protected by attorney-client privilege."
                    required
                  />
                </div>
              </div>

              {/* Scheduling Preferences */}
              {selectedConsultation.type !== 'emergency' && (
                <div className={styles.formSection}>
                  <h4 className={styles.sectionTitle}>Scheduling Preferences</h4>
                  
                  <div className={styles.inputGrid}>
                    <div className={styles.inputGroup}>
                      <label htmlFor="preferredDate" className={styles.label}>Preferred Date</label>
                      <input
                        type="date"
                        id="preferredDate"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleInputChange}
                        className={styles.input}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    
                    <div className={styles.inputGroup}>
                      <label htmlFor="preferredTime" className={styles.label}>Preferred Time</label>
                      <select
                        id="preferredTime"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleInputChange}
                        className={styles.select}
                      >
                        <option value="">Select time preference</option>
                        <option value="morning">Morning (9:00 AM - 12:00 PM)</option>
                        <option value="afternoon">Afternoon (12:00 PM - 5:00 PM)</option>
                        <option value="evening">Evening (5:00 PM - 7:00 PM)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Additional Information */}
              <div className={styles.formSection}>
                <h4 className={styles.sectionTitle}>Additional Information</h4>
                
                <div className={styles.checkboxGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="hasRetainedAttorney"
                      checked={formData.hasRetainedAttorney}
                      onChange={handleInputChange}
                      className={styles.checkbox}
                    />
                    <span className={styles.checkboxText}>
                      I have previously retained an attorney for this matter
                    </span>
                  </label>
                </div>
                
                <div className={styles.inputGroup}>
                  <label htmlFor="referralSource" className={styles.label}>How did you hear about us?</label>
                  <select
                    id="referralSource"
                    name="referralSource"
                    value={formData.referralSource}
                    onChange={handleInputChange}
                    className={styles.select}
                  >
                    <option value="">Select an option</option>
                    <option value="google">Google Search</option>
                    <option value="referral">Referral from friend/family</option>
                    <option value="attorney-referral">Attorney referral</option>
                    <option value="social-media">Social Media</option>
                    <option value="yellow-pages">Yellow Pages</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Confidentiality Notice */}
              <div className={styles.confidentialityNotice}>
                <div className={styles.noticeIcon}>🔒</div>
                <div className={styles.noticeText}>
                  <strong>Confidentiality Guaranteed:</strong> All information provided is confidential and protected by attorney-client privilege. We take your privacy seriously and will never share your information without your consent.
                </div>
              </div>

              {/* Submit Button */}
              <div className={styles.submitSection}>
                {submitStatus === 'success' && (
                  <div className={styles.successMessage}>
                    <div className={styles.successIcon}>✅</div>
                    <div className={styles.successText}>
                      <strong>Consultation Request Received!</strong>
                      <p>We'll contact you within 24 hours to schedule your consultation and discuss your legal matter.</p>
                    </div>
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className={styles.errorMessage}>
                    <div className={styles.errorIcon}>❌</div>
                    <div className={styles.errorText}>
                      <strong>Submission Failed</strong>
                      <p>Please try again or call our office directly at {lawBusinessInfo.contact.phone.formatted}</p>
                    </div>
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className={styles.submitButton}
                >
                  {isSubmitting ? (
                    <>
                      <span className={styles.spinner}>⏳</span>
                      Submitting Request...
                    </>
                  ) : (
                    <>
                      <span className={styles.buttonIcon}>📅</span>
                      Request Consultation
                    </>
                  )}
                </button>
                
                <p className={styles.submitNote}>
                  Or call us directly at{' '}
                  <a href={`tel:${lawBusinessInfo.contact.phone.raw}`} className={styles.phoneLink}>
                    {lawBusinessInfo.contact.phone.formatted}
                  </a>
                </p>
              </div>
            </form>
          </div>
        )}

        {/* Trust Indicators */}
        <div className={styles.trustSection}>
          <h3 className={styles.trustTitle}>Why Choose Our Firm?</h3>
          
          <div className={styles.trustGrid}>
            <div className={styles.trustItem}>
              <div className={styles.trustIcon}>⚖️</div>
              <h4>Experienced Legal Team</h4>
              <p>Our attorneys have decades of combined experience handling complex legal matters.</p>
            </div>
            
            <div className={styles.trustItem}>
              <div className={styles.trustIcon}>🔒</div>
              <h4>Confidential Consultation</h4>
              <p>All communications are protected by attorney-client privilege from the first contact.</p>
            </div>
            
            <div className={styles.trustItem}>
              <div className={styles.trustIcon}>🏆</div>
              <h4>Proven Track Record</h4>
              <p>We've successfully resolved hundreds of cases with favorable outcomes for our clients.</p>
            </div>
            
            <div className={styles.trustItem}>
              <div className={styles.trustIcon}>🤝</div>
              <h4>Personalized Attention</h4>
              <p>Every client receives dedicated attention and a customized legal strategy.</p>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className={styles.disclaimer}>
          <p>{lawBusinessInfo.disclaimers.consultation}</p>
        </div>
      </div>
    </section>
  );
};

export default ConsultationSection; 