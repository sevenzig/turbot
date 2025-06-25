import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Layout from './components/Layout/Layout';
import styles from './App.module.css';

function App() {
  return (
    <ErrorBoundary>
      <div className={styles.app}>
        <Routes>
          <Route
            path='/'
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path='/about'
            element={
              <Layout>
                <AboutPage />
              </Layout>
            }
          />
          <Route
            path='/contact'
            element={
              <Layout>
                <ContactPage />
              </Layout>
            }
          />
          <Route
            path='*'
            element={
              <Layout>
                <NotFoundPage />
              </Layout>
            }
          />
        </Routes>
      </div>
    </ErrorBoundary>
  );
}

export default App;
