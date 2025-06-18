import React from 'react';
import { businessInfo } from '@data/businessInfo';
import styles from './ServicesSection.module.css';

const ServicesSection: React.FC = () => {
  return (
    <section className={styles.servicesSection}>
      <div className={styles.servicesContent}>
        <h2 className={styles.sectionTitle}>[SERVICES_SECTION_TITLE]</h2>
        <p className={styles.sectionDescription}>
          [SERVICES_SECTION_DESCRIPTION]
        </p>
        <div className={styles.servicesGrid}>
          {businessInfo.services.map((service, index) => (
            <div key={index} className={styles.serviceCard}>
              <h3 className={styles.serviceTitle}>{service}</h3>
              <p className={styles.serviceDescription}>
                [SERVICES_DESCRIPTION_TEMPLATE]
              </p>
              <a href='/contact' className={styles.serviceLink}>
                [SERVICES_CTA_TEXT]
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
