import React, { useState } from 'react';
import { businessInfo, getGoogleMapsUrl } from '../data/businessInfo';
import styles from './ContactPage.module.css';

const ContactPage: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    timeline: '',
    budget: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(
    null
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      // Here you would typically send the form data to a server
      // For this example, we'll simulate a network request
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Form submitted:', formState);
      setSubmitStatus('success');
      setFormState({ 
        name: '', 
        email: '', 
        phone: '', 
        company: '', 
        projectType: '', 
        timeline: '', 
        budget: '', 
        message: '' 
      });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.contactPage}>
      <section className={styles.contactSection}>
        <div className={styles.contactContent}>
          <h1 className={styles.contactTitle}>Let's Build Your Perfect Website</h1>
          <p className={styles.contactDescription}>
            Ready to get a secure, fast, mobile-optimized website that drives business results? 
            Let's discuss your project and how I can help your business succeed online.
          </p>

          <div className={styles.contactGrid}>
            {/* Contact Information */}
            <div className={styles.contactInfo}>
              <h2 className={styles.sectionTitle}>Get Your Project Started</h2>
              
              <div className={styles.responseTime}>
                <h3 className={styles.responseTitle}>Quick Response Guarantee</h3>
                <p className={styles.responseText}>
                  I respond to all project inquiries within 2 business hours. 
                  Ready to start? Let's discuss your needs and timeline.
                </p>
              </div>

              <div className={styles.contactItem}>
                <h3 className={styles.contactLabel}>Direct Line</h3>
                <a
                  href={businessInfo.contact.phone.link}
                  className={styles.contactValue}
                >
                  {businessInfo.contact.phone.formatted}
                </a>
                <p className={styles.contactNote}>Call for immediate consultation</p>
              </div>

              <div className={styles.contactItem}>
                <h3 className={styles.contactLabel}>Project Email</h3>
                <a
                  href={`mailto:${businessInfo.contact.email}`}
                  className={styles.contactValue}
                >
                  {businessInfo.contact.email}
                </a>
                <p className={styles.contactNote}>Detailed project discussions</p>
              </div>

              <div className={styles.contactItem}>
                <h3 className={styles.contactLabel}>Service Area</h3>
                <p className={styles.contactValue}>
                  {businessInfo.address.city}, {businessInfo.address.state} & Remote Worldwide
                </p>
                <p className={styles.contactNote}>Serving clients locally and globally</p>
              </div>

              <div className={styles.contactItem}>
                <h3 className={styles.contactLabel}>Availability</h3>
                <div className={styles.hoursGrid}>
                  <div className={styles.hoursRow}>
                    <span className={styles.day}>Monday - Thursday:</span>
                    <span className={styles.hours}>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className={styles.hoursRow}>
                    <span className={styles.day}>Friday:</span>
                    <span className={styles.hours}>9:00 AM - 5:00 PM</span>
                  </div>
                  <div className={styles.hoursRow}>
                    <span className={styles.day}>Weekend:</span>
                    <span className={styles.hours}>Emergency Support Available</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Inquiry Form */}
            <div className={styles.contactForm}>
              <h2 className={styles.sectionTitle}>Start Your Project</h2>
              <p className={styles.formDescription}>
                Tell me about your project and I'll provide a detailed proposal within 24 hours.
              </p>
              
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor='name' className={styles.formLabel}>
                      Full Name *
                    </label>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      className={styles.formInput}
                      value={formState.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor='email' className={styles.formLabel}>
                      Email Address *
                    </label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      className={styles.formInput}
                      value={formState.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor='phone' className={styles.formLabel}>
                      Phone Number
                    </label>
                    <input
                      type='tel'
                      id='phone'
                      name='phone'
                      className={styles.formInput}
                      value={formState.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor='company' className={styles.formLabel}>
                      Company/Business Name
                    </label>
                    <input
                      type='text'
                      id='company'
                      name='company'
                      className={styles.formInput}
                      value={formState.company}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor='projectType' className={styles.formLabel}>
                      Project Type *
                    </label>
                    <select
                      id='projectType'
                      name='projectType'
                      className={styles.formSelect}
                      value={formState.projectType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select project type</option>
                      <option value="new-website">New Website</option>
                      <option value="wordpress-site">WordPress Development</option>
                      <option value="website-redesign">Website Redesign</option>
                      <option value="seo-audit">SEO Audit & Optimization</option>
                      <option value="maintenance">Website Maintenance</option>
                      <option value="hosting">Hosting Solutions</option>
                      <option value="other">Other (describe below)</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor='timeline' className={styles.formLabel}>
                      Project Timeline
                    </label>
                    <select
                      id='timeline'
                      name='timeline'
                      className={styles.formSelect}
                      value={formState.timeline}
                      onChange={handleInputChange}
                    >
                      <option value="">Select timeline</option>
                      <option value="asap">ASAP (Rush Project)</option>
                      <option value="1-month">Within 1 Month</option>
                      <option value="2-3-months">2-3 Months</option>
                      <option value="3-6-months">3-6 Months</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor='budget' className={styles.formLabel}>
                    Budget Range (Optional)
                  </label>
                  <select
                    id='budget'
                    name='budget'
                    className={styles.formSelect}
                    value={formState.budget}
                    onChange={handleInputChange}
                  >
                    <option value="">Select budget range</option>
                    <option value="under-5k">Under $5,000</option>
                    <option value="5k-10k">$5,000 - $10,000</option>
                    <option value="10k-25k">$10,000 - $25,000</option>
                    <option value="25k-plus">$25,000+</option>
                    <option value="discuss">Let's Discuss</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor='message' className={styles.formLabel}>
                    Project Details *
                  </label>
                  <textarea
                    id='message'
                    name='message'
                    className={styles.formTextarea}
                    rows={6}
                    value={formState.message}
                    onChange={handleInputChange}
                    placeholder="Please describe your project goals, current website (if any), target audience, specific features needed, and any other relevant details..."
                    required
                  ></textarea>
                </div>

                <button
                  type='submit'
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending Project Details...' : 'Get Your Proposal'}
                </button>
                
                {submitStatus === 'success' && (
                  <div className={styles.successMessage}>
                    <h4>Thank you for your project inquiry!</h4>
                    <p>I'll review your requirements and send you a detailed proposal within 24 hours. 
                    I may contact you to clarify any details or schedule a brief consultation call.</p>
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className={styles.errorMessage}>
                    <h4>There was an error submitting your request.</h4>
                    <p>Please call me directly at {businessInfo.contact.phone.formatted} or 
                    email {businessInfo.contact.email} to discuss your project.</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
