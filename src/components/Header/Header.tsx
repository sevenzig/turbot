import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { businessInfo, getCurrentBusinessStatus } from '../../data/businessInfo';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const businessStatus = getCurrentBusinessStatus();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  const navigationLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <header className={styles.header}>
      {/* Desktop Header - Row 1 */}
      <div className={styles.headerRow1}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <Link to='/' className={styles.logoLink}>
              <h1 className={styles.logoText}>{businessInfo.shortName}</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            <ul className={styles.navList}>
              {navigationLinks.map((link) => (
                <li key={link.path} className={styles.navItem}>
                  <Link
                    to={link.path}
                    className={`${styles.navLink} ${isActiveLink(link.path) ? styles.active : ''}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={styles.mobileMenuButton}
            onClick={toggleMenu}
            aria-label='Toggle navigation menu'
            aria-expanded={isMenuOpen}
          >
            <span className={styles.hamburger}>
              <span className={styles.hamburgerLine}></span>
              <span className={styles.hamburgerLine}></span>
              <span className={styles.hamburgerLine}></span>
            </span>
          </button>
        </div>
      </div>

      {/* Desktop Header - Row 2 */}
      <div className={styles.headerRow2}>
        <div className={styles.headerContent}>
          <div className={styles.businessStatus}>
            <span
              className={`${styles.statusText} ${businessStatus.isOpen ? styles.open : styles.closed}`}
            >
              {businessStatus.status}
            </span>
          </div>
          <div className={styles.directions}>
            <a
                          href={`https://maps.google.com/maps?q=${encodeURIComponent(businessInfo.address.full)}`}
            target='_blank'
            rel='noopener noreferrer'
            className={styles.directionsLink}
          >
            Get directions to {businessInfo.address.full}
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className={styles.mobileMenuOverlay} onClick={closeMenu}>
          <nav
            className={styles.mobileNav}
            onClick={(e) => e.stopPropagation()}
          >
            <ul className={styles.mobileNavList}>
              {navigationLinks.map((link) => (
                <li key={link.path} className={styles.mobileNavItem}>
                  <Link
                    to={link.path}
                    className={`${styles.mobileNavLink} ${isActiveLink(link.path) ? styles.active : ''}`}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
