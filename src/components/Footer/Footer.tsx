import React from 'react';
import { businessInfo } from '@data/businessInfo';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerGrid}>
          {/* Business Info */}
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>{businessInfo.name}</h3>
            <p className={styles.footerDescription}>
              {businessInfo.shortDescription}
            </p>
          </div>

          {/* Contact Info */}
          <div className={styles.footerSection}>
            <h4 className={styles.footerSubtitle}>Contact</h4>
            <div className={styles.contactInfo}>
              <p>
                <a
                  href={businessInfo.contact.phone.link}
                  className={styles.footerLink}
                >
                  {businessInfo.contact.phone.formatted}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${businessInfo.contact.email}`}
                  className={styles.footerLink}
                >
                  {businessInfo.contact.email}
                </a>
              </p>
              <p className={styles.address}>{businessInfo.address.full}</p>
            </div>
          </div>

          {/* Business Hours */}
          <div className={styles.footerSection}>
            <h4 className={styles.footerSubtitle}>Hours</h4>
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

          {/* Social Links */}
          <div className={styles.footerSection}>
            <h4 className={styles.footerSubtitle}>Follow Us</h4>
            <div className={styles.socialLinks}>
              {businessInfo.social.facebook && (
                <a
                  href={businessInfo.social.facebook}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={styles.socialLink}
                  aria-label='Facebook'
                >
                  Facebook
                </a>
              )}
              {businessInfo.social.instagram && (
                <a
                  href={businessInfo.social.instagram}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={styles.socialLink}
                  aria-label='Instagram'
                >
                  Instagram
                </a>
              )}
              {businessInfo.social.twitter && (
                <a
                  href={businessInfo.social.twitter}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={styles.socialLink}
                  aria-label='Twitter'
                >
                  Twitter
                </a>
              )}
              {businessInfo.social.linkedin && (
                <a
                  href={businessInfo.social.linkedin}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={styles.socialLink}
                  aria-label='LinkedIn'
                >
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © {currentYear} {businessInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
