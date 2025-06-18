import React from 'react';
import { businessInfo } from '@data/businessInfo';
import styles from './AboutPage.module.css';

const AboutPage: React.FC = () => {
  return (
    <div className={styles.aboutPage}>
      <section className={styles.aboutSection}>
        <div className={styles.aboutContent}>
          <h1 className={styles.aboutTitle}>[ABOUT_PAGE_TITLE]</h1>
          <p className={styles.aboutDescription}>{businessInfo.description}</p>

          <div className={styles.featuresGrid}>
            <h2 className={styles.sectionTitle}>[ABOUT_FEATURES_TITLE]</h2>
            <div className={styles.featuresList}>
              {businessInfo.features.map((feature, index) => (
                <div key={index} className={styles.featureItem}>
                  <h3 className={styles.featureTitle}>{feature}</h3>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.servicesGrid}>
            <h2 className={styles.sectionTitle}>[ABOUT_SERVICES_TITLE]</h2>
            <div className={styles.servicesList}>
              {businessInfo.services.map((service, index) => (
                <div key={index} className={styles.serviceItem}>
                  <h3 className={styles.serviceTitle}>{service}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
