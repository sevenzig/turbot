import React from 'react';
import { businessInfo } from '@data/businessInfo';
import styles from './FeaturesSection.module.css';

const FeaturesSection: React.FC = () => {
  return (
    <section className={styles.featuresSection}>
      <div className={styles.featuresContent}>
        <h2 className={styles.sectionTitle}>Why Choose Us</h2>
        <div className={styles.featuresGrid}>
          {businessInfo.features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <h3 className={styles.featureTitle}>{feature}</h3>
              <p className={styles.featureDescription}>
                {getFeatureDescription(feature)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Helper function to generate relevant descriptions
function getFeatureDescription(feature: string): string {
  const descriptions: Record<string, string> = {
    'Professional Expertise': 'Our team brings years of experience and industry knowledge to deliver exceptional results.',
    'Reliable Service': 'Count on us for consistent, dependable service that meets your deadlines and expectations.',
    'Customer-First Approach': 'We prioritize your needs and work closely with you to achieve your goals.',
    '24/7 Support Available': 'Get help when you need it with our round-the-clock support and assistance.',
  };
  
  return descriptions[feature] || 'Learn more about this feature and how it benefits your business.';
}

export default FeaturesSection;
