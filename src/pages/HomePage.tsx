/**
 * Generic Business Homepage
 * Adaptable for any business type with standard sections
 */

import React from 'react';
import HeroSection from '../components/HeroSection/HeroSection';
import FeaturesSection from '../components/FeaturesSection/FeaturesSection';
import ServicesSection from '../components/ServicesSection/ServicesSection';
import styles from './HomePage.module.css';

const HomePage: React.FC = () => {
  return (
    <div className={styles.homePage}>
      {/* Hero Section - Main value proposition and call to action */}
      <HeroSection />
      
      {/* Features Section - What makes this business special */}
      <FeaturesSection />
      
      {/* Services Section - What the business offers */}
      <ServicesSection />
    </div>
  );
};

export default HomePage; 