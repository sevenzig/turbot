import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { businessInfo } from '../../data/businessInfo';
import styles from './ServicesSection.module.css';

interface ServiceDetail {
  title: string;
  description: string;
  features: string[];
  icon: string;
  color: string;
}

const ServicesSection: React.FC = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Enhanced service data with details
  const enhancedServices: ServiceDetail[] = businessInfo.services.map((service, index) => {
    const serviceDetails = {
      'Custom Website Development': {
        description: 'Built from scratch using modern technologies, optimized for performance, security, and search engines.',
        features: ['Responsive Design', 'Performance Optimized', 'Security Hardened', 'SEO Foundation', 'Cross-Browser Compatible', 'Fast Loading'],
        icon: '💻',
        color: '--color-primary'
      },
      'WordPress Development': {
        description: 'Custom WordPress solutions with advanced functionality, security enhancements, and performance optimization.',
        features: ['Custom Themes', 'Plugin Development', 'Security Hardening', 'Performance Tuning', 'Content Management', 'Backup Solutions'],
        icon: '⚙️',
        color: '--color-secondary'
      },
      'SEO & Optimization': {
        description: 'Comprehensive SEO strategies and website optimization to improve search rankings and user experience.',
        features: ['Technical SEO', 'Local SEO', 'Performance Audit', 'Speed Optimization', 'Content Strategy', 'Analytics Setup'],
        icon: '🎯',
        color: '--color-accent'
      },
      'Hosting & Maintenance': {
        description: 'Reliable hosting solutions with proactive maintenance, security monitoring, and performance optimization.',
        features: ['Secure Hosting', 'Daily Backups', 'Security Monitoring', 'Performance Tracking', 'Content Updates', '24/7 Support'],
        icon: '🛡️',
        color: '--color-primary'
      }
    };

    const defaultService = {
      description: 'Professional web development service tailored to meet your specific business needs and goals.',
      features: ['Expert Development', 'Quality Assurance', 'Timely Delivery', 'Ongoing Support', 'Business Focus', 'Results Driven'],
      icon: '⭐',
      color: '--color-primary'
    };

    return {
      title: service,
      ...(serviceDetails[service as keyof typeof serviceDetails] || defaultService)
    };
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 100
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: 100,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <section className={styles.servicesSection}>
      <div className={styles.sectionContent}>
        <motion.div 
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.sectionTitle}>Complete Web Development Solutions</h2>
          <p className={styles.sectionDescription}>
            From custom development to ongoing optimization - everything your business needs to succeed online
          </p>
        </motion.div>

        <motion.div 
          className={styles.servicesGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {enhancedServices.map((service, index) => (
            <motion.div
              key={index}
              className={styles.serviceCard}
              variants={cardVariants}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              onClick={() => setSelectedService(index)}
            >
              <div className={styles.cardContent}>
                <div className={styles.serviceIcon}>
                  {service.icon}
                </div>

                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDescription}>{service.description}</p>

                <div className={styles.serviceFeatures}>
                  <ul className={styles.featureList}>
                    {service.features.slice(0, 3).map((feature, featureIndex) => (
                      <li key={featureIndex}>
                        ✓ {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className={styles.learnMoreButton}
                  onClick={() => setSelectedService(index)}
                >
                  Learn More
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className={styles.servicesCallToAction}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3>Ready to Transform Your Online Presence?</h3>
          <p>Get a secure, fast, mobile-optimized website that drives business results in just 4 weeks</p>
          <motion.a
            href="#contact"
            className={styles.ctaButton}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(217, 119, 6, 0.4)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            Start Your Project Today
          </motion.a>
        </motion.div>
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService !== null && (
          <motion.div 
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedService(null)}
          >
            <motion.div 
              className={styles.modal}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className={styles.modalClose}
                onClick={() => setSelectedService(null)}
              >
                ×
              </button>
              
              <div className={styles.modalContent}>
                <div className={styles.modalIcon}>
                  {enhancedServices[selectedService].icon}
                </div>
                <h3>{enhancedServices[selectedService].title}</h3>
                <p>{enhancedServices[selectedService].description}</p>
                
                <div className={styles.modalFeatures}>
                  <h4>What's Included:</h4>
                  <ul>
                    {enhancedServices[selectedService].features.map((feature, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        ✓ {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className={styles.modalActions}>
                  <motion.a
                    href="#contact"
                    className={styles.modalCta}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedService(null)}
                  >
                    Get Started
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ServicesSection;
