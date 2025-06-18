import React from 'react';
import { businessInfo } from '@data/businessInfo';
import styles from './ServicesSection.module.css';

const ServicesSection: React.FC = () => {
  return (
    <section className={styles.servicesSection}>
      <div className={styles.servicesContent}>
        <h2 className={styles.sectionTitle}>Our Services</h2>
        <p className={styles.sectionDescription}>
          We offer comprehensive solutions tailored to meet your specific business needs.
        </p>
        <div className={styles.servicesGrid}>
          {businessInfo.services.map((service, index) => (
            <div key={index} className={styles.serviceCard}>
              <h3 className={styles.serviceTitle}>{service}</h3>
              <p className={styles.serviceDescription}>
                {getServiceDescription(service)}
              </p>
              <a href='/contact' className={styles.serviceLink}>
                Learn More
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Helper function to generate relevant descriptions
function getServiceDescription(service: string): string {
  const descriptions: Record<string, string> = {
    'Consulting Services': 'Expert guidance and strategic advice to help your business make informed decisions and achieve sustainable growth.',
    'Project Management': 'End-to-end project coordination ensuring timely delivery, quality results, and budget compliance.',
    'Custom Solutions': 'Tailored approaches designed specifically for your unique business challenges and requirements.',
    'Support & Maintenance': 'Ongoing assistance and system maintenance to keep your operations running smoothly and efficiently.',
  };
  
  return descriptions[service] || 'Professional service designed to help your business succeed and grow.';
}

export default ServicesSection;
