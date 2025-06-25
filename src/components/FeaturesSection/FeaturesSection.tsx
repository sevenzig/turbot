import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { businessInfo } from '../../data/businessInfo';
import styles from './FeaturesSection.module.css';

interface FeatureDetail {
  title: string;
  description: string;
  icon: string;
  stat: string;
  statLabel: string;
  color: string;
}

const FeaturesSection: React.FC = () => {
  const [counters, setCounters] = useState<Record<number, number>>({});
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Enhanced feature data with stats and details
  const enhancedFeatures: FeatureDetail[] = businessInfo.features.map((feature, index) => {
    const featureDetails = {
      'Secure & Protected': {
        description: 'Advanced security measures protect your website and customer data with enterprise-grade encryption and monitoring.',
        icon: '🔒',
        stat: '99.9%',
        statLabel: 'Uptime Guaranteed',
        color: '--color-primary'
      },
      'Lightning Fast': {
        description: 'Optimized for speed with advanced caching, compression, and modern development techniques for superior performance.',
        icon: '⚡',
        stat: '<3s',
        statLabel: 'Load Time',
        color: '--color-secondary'
      },
      'Mobile Optimized': {
        description: 'Responsive design ensures your website looks perfect and functions flawlessly on all devices and screen sizes.',
        icon: '📱',
        stat: '100%',
        statLabel: 'Mobile Ready',
        color: '--color-accent'
      },
      '25 Years Experience': {
        description: 'Quarter-century of web development expertise solving complex challenges across diverse industries and platforms.',
        icon: '🏆',
        stat: '500+',
        statLabel: 'Websites Built',
        color: '--color-primary'
      }
    };

    const defaultFeature = {
      description: 'Professional web development service designed to exceed expectations and drive business success.',
      icon: '✨',
      stat: '4',
      statLabel: 'Week Delivery',
      color: '--color-primary'
    };

    return {
      title: feature,
      ...(featureDetails[feature as keyof typeof featureDetails] || defaultFeature)
    };
  });

  // Counter animation effect
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      enhancedFeatures.forEach((feature, index) => {
        const numericValue = parseInt(feature.stat.replace(/[^\d]/g, '')) || 100;
        let current = 0;
        const increment = numericValue / 50; // Animate over ~50 steps
        const timer = setInterval(() => {
          current += increment;
          if (current >= numericValue) {
            current = numericValue;
            clearInterval(timer);
          }
          setCounters(prev => ({ ...prev, [index]: Math.floor(current) }));
        }, 30);
      });
    }
  }, [isInView, hasAnimated, enhancedFeatures]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const featureVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const statVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 0.3,
        type: "spring",
        bounce: 0.6
      }
    }
  };

  return (
    <section className={styles.featuresSection} ref={ref}>
      <div className={styles.sectionContent}>
        <motion.div 
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.sectionTitle}>Technical Excellence That Drives Results</h2>
          <p className={styles.sectionDescription}>
            Combining 25 years of expertise with cutting-edge technology to deliver secure, fast, mobile-optimized websites that help your business succeed online.
          </p>
        </motion.div>

        <motion.div 
          className={styles.featuresGrid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {enhancedFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className={styles.featureCard}
              variants={featureVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              <div className={styles.cardBackground} />
              
              <div className={styles.cardContent}>
                <motion.div 
                  className={styles.featureIcon}
                  variants={iconVariants}
                  whileHover="hover"
                >
                  {feature.icon}
                </motion.div>

                <motion.div 
                  className={styles.featureStat}
                  variants={statVariants}
                >
                  <span className={styles.statNumber}>
                    {feature.stat.includes('%') || feature.stat.includes('/') 
                      ? feature.stat 
                      : `${counters[index] || 0}${feature.stat.includes('+') ? '+' : ''}`
                    }
                  </span>
                  <span className={styles.statLabel}>{feature.statLabel}</span>
                </motion.div>

                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>

                <motion.div 
                  className={styles.featureGlow}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ 
                    opacity: 1, 
                    scale: 1.1,
                    transition: { duration: 0.3 }
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Interactive Stats Bar */}
        <motion.div 
          className={styles.statsBar}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className={styles.statsContent}>
            <motion.div 
              className={styles.statItem}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className={styles.statIcon}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                🚀
              </motion.div>
              <div className={styles.statText}>
                <span className={styles.statValue}>10+</span>
                <span className={styles.statDesc}>Years Experience</span>
              </div>
            </motion.div>

            <motion.div 
              className={styles.statItem}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className={styles.statIcon}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                👥
              </motion.div>
              <div className={styles.statText}>
                <span className={styles.statValue}>500+</span>
                <span className={styles.statDesc}>Happy Clients</span>
              </div>
            </motion.div>

            <motion.div 
              className={styles.statItem}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className={styles.statIcon}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🏆
              </motion.div>
              <div className={styles.statText}>
                <span className={styles.statValue}>98%</span>
                <span className={styles.statDesc}>Success Rate</span>
              </div>
            </motion.div>

            <motion.div 
              className={styles.statItem}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className={styles.statIcon}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                ⭐
              </motion.div>
              <div className={styles.statText}>
                <span className={styles.statValue}>24/7</span>
                <span className={styles.statDesc}>Support</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div 
          className={styles.trustBadges}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className={styles.trustText}>Trusted by industry leaders</p>
          <div className={styles.badgeGrid}>
            {['ISO Certified', 'BBB A+', 'Industry Expert', 'Award Winner'].map((badge, index) => (
              <motion.div
                key={index}
                className={styles.badge}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)"
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <span className={styles.badgeIcon}>🏅</span>
                <span className={styles.badgeText}>{badge}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
