import React from 'react';
import HeroSection from '@components/HeroSection/HeroSection';
import FeaturesSection from '@components/FeaturesSection/FeaturesSection';
import ServicesSection from '@components/ServicesSection/ServicesSection';
import styles from './HomePage.module.css';

const HomePage: React.FC = () => {
  return (
    <div className={styles.homePage}>
      <HeroSection />
      <FeaturesSection />
      <ServicesSection />
    </div>
  );
};

export default HomePage;
