import React from 'react';
import { businessInfo } from '@data/businessInfo';
import styles from './HeroSection.module.css';

const HeroSection: React.FC = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          [HERO_TITLE_PREFIX] {businessInfo.name}
        </h1>
        <p className={styles.heroTagline}>{businessInfo.tagline}</p>
        <p className={styles.heroDescription}>
          {businessInfo.shortDescription}
        </p>
        <div className={styles.heroActions}>
          <a href='#contact' className={styles.primaryButton}>
            [CTA_PRIMARY_TEXT]
          </a>
          <a href='/about' className={styles.secondaryButton}>
            [CTA_SECONDARY_TEXT]
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
