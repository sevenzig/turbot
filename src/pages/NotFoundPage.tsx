import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.notFoundPage}>
      <div className={styles.notFoundContent}>
        <h1 className={styles.errorCode}>[ERROR_404_CODE]</h1>
        <h2 className={styles.errorTitle}>[ERROR_404_TITLE]</h2>
        <p className={styles.errorMessage}>[ERROR_404_MESSAGE]</p>
        <div className={styles.actions}>
          <Link to='/' className={styles.homeButton}>
            [ERROR_404_HOME_BUTTON]
          </Link>
          <button
            className={styles.backButton}
            onClick={() => window.history.back()}
          >
            [ERROR_404_BACK_BUTTON]
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
