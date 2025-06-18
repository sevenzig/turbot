import React from 'react';
import { businessInfo } from '@data/businessInfo';
import styles from './FeaturesSection.module.css';

const FeaturesSection: React.FC = () => {
  return (
    <section className={styles.featuresSection}>
      <div className={styles.featuresContent}>
        <h2 className={styles.sectionTitle}>[FEATURES_SECTION_TITLE]</h2>
        <div className={styles.featuresGrid}>
          {businessInfo.features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <h3 className={styles.featureTitle}>{feature}</h3>
              <p className={styles.featureDescription}>
                [FEATURES_DESCRIPTION_TEMPLATE]
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
