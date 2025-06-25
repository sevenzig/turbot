import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
  variant?: 'default' | 'wide' | 'narrow';
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  variant = 'default',
  className,
}) => {
  const layoutClasses = [styles.layout, styles[variant], className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={layoutClasses}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
