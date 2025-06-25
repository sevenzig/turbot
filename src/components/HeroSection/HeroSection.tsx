import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { businessInfo } from '../../data/businessInfo';
import styles from './HeroSection.module.css';

const HeroSection: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = businessInfo.tagline;
  
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1200], [0, 50]);
  const opacity = useTransform(scrollY, [0, 1000], [1, 0.8]);

  // Typing animation effect
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  // Simplified particle animation data
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 30 + 20,
  }));

  return (
    <section className={styles.heroSection}>
      {/* Animated Background */}
      <div className={styles.heroBackground}>
        <div className={styles.gradientOverlay} />
        
        {/* Floating Particles */}
        <div className={styles.particleContainer}>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className={styles.particle}
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        
        {/* Geometric Shapes */}
        <motion.div 
          className={styles.floatingShape1}
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
        <motion.div 
          className={styles.floatingShape2}
          animate={{ 
            rotate: -360,
            y: [-10, 10, -10],
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      </div>

      {/* Hero Content */}
      <motion.div 
        className={styles.heroContent}
        style={{ y, opacity }}
      >
        <div className={styles.heroInner}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className={styles.heroTitle}>
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
              >
                {businessInfo.name}
              </motion.span>
            </h1>
          </motion.div>

          <motion.div
            className={styles.taglineContainer}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className={styles.heroTagline}>
              {displayText}
              <motion.span
                className={styles.cursor}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                |
              </motion.span>
            </p>
          </motion.div>

          <motion.p 
            className={styles.heroDescription}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            25 years of web development expertise • 4-week delivery guarantee • Secure, fast, mobile-optimized websites that drive business growth
          </motion.p>

          <motion.div 
            className={styles.heroActions}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.a 
              href='#contact' 
              className={styles.primaryButton}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 40px rgba(217, 119, 6, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span>Start Your Project</span>
              <motion.svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.buttonIcon}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </motion.svg>
            </motion.a>
            
            <motion.a 
              href='/about' 
              className={styles.secondaryButton}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Portfolio
            </motion.a>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            className={styles.trustIndicators}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <div className={styles.trustItem}>
              <motion.div 
                className={styles.trustNumber}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2, type: "spring" }}
              >
                25
              </motion.div>
              <span className={styles.trustLabel}>Years Experience</span>
            </div>
            
            <div className={styles.trustItem}>
              <motion.div 
                className={styles.trustNumber}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 1.4, type: "spring" }}
              >
                4
              </motion.div>
              <span className={styles.trustLabel}>Week Delivery</span>
            </div>
            
            <div className={styles.trustItem}>
              <motion.div 
                className={styles.trustNumber}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 1.6, type: "spring" }}
              >
                99.9%
              </motion.div>
              <span className={styles.trustLabel}>Uptime Guaranteed</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className={styles.scrollIndicator}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.8 }}
      >
        <motion.div
          className={styles.scrollMouse}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className={styles.mouseWheel} />
        </motion.div>
        <span className={styles.scrollText}>Scroll to explore</span>
      </motion.div>
    </section>
  );
};

export default HeroSection;
