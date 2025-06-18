import React, { useState } from 'react';
import { businessInfo, getGoogleMapsUrl } from '@data/businessInfo';
import styles from './ContactPage.module.css';

const ContactPage: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(
    null
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      setFormState({ name: '', email: '', subject: '', message: '' });
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
          <h1 className={styles.contactTitle}>[CONTACT_PAGE_TITLE]</h1>
          <p className={styles.contactDescription}>
            [CONTACT_PAGE_DESCRIPTION]
          </p>

          <div className={styles.contactGrid}>
            {/* Contact Information */}
            <div className={styles.contactInfo}>
              <h2 className={styles.sectionTitle}>[CONTACT_INFO_TITLE]</h2>

              <div className={styles.contactItem}>
                <h3 className={styles.contactLabel}>[CONTACT_PHONE_LABEL]</h3>
                <a
                  href={businessInfo.contact.phone.link}
                  className={styles.contactValue}
                >
                  {businessInfo.contact.phone.formatted}
                </a>
              </div>

              <div className={styles.contactItem}>
                <h3 className={styles.contactLabel}>[CONTACT_EMAIL_LABEL]</h3>
                <a
                  href={`mailto:${businessInfo.contact.email}`}
                  className={styles.contactValue}
                >
                  {businessInfo.contact.email}
                </a>
              </div>

              <div className={styles.contactItem}>
                <h3 className={styles.contactLabel}>[CONTACT_ADDRESS_LABEL]</h3>
                <p className={styles.contactValue}>
                  {businessInfo.address.full}
                </p>
                <a
                  href={getGoogleMapsUrl()}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={styles.directionsLink}
                >
                  [CONTACT_DIRECTIONS_TEXT]
                </a>
              </div>

              <div className={styles.contactItem}>
                <h3 className={styles.contactLabel}>[CONTACT_HOURS_LABEL]</h3>
                <div className={styles.hoursGrid}>
                  {Object.entries(businessInfo.hours).map(([day, hours]) => (
                    <div key={day} className={styles.hoursRow}>
                      <span className={styles.day}>
                        {day.charAt(0).toUpperCase() + day.slice(1)}:
                      </span>
                      <span className={styles.hours}>{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className={styles.contactForm}>
              <h2 className={styles.sectionTitle}>[CONTACT_FORM_TITLE]</h2>
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor='name' className={styles.formLabel}>
                    [FORM_NAME_LABEL]
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
                    [FORM_EMAIL_LABEL]
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

                <div className={styles.formGroup}>
                  <label htmlFor='subject' className={styles.formLabel}>
                    [FORM_SUBJECT_LABEL]
                  </label>
                  <input
                    type='text'
                    id='subject'
                    name='subject'
                    className={styles.formInput}
                    value={formState.subject}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor='message' className={styles.formLabel}>
                    [FORM_MESSAGE_LABEL]
                  </label>
                  <textarea
                    id='message'
                    name='message'
                    className={styles.formTextarea}
                    rows={5}
                    value={formState.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>

                <button
                  type='submit'
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '[FORM_SENDING_TEXT]' : '[FORM_SUBMIT_TEXT]'}
                </button>
                {submitStatus === 'success' && (
                  <p className={styles.successMessage}>
                    [FORM_SUCCESS_MESSAGE]
                  </p>
                )}
                {submitStatus === 'error' && (
                  <p className={styles.errorMessage}>[FORM_ERROR_MESSAGE]</p>
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
