import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import App from './App';

// Test wrapper for router context
const AppWithRouter = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<AppWithRouter />);
    expect(document.body).toBeTruthy();
  });

  it('renders the header component', () => {
    render(<AppWithRouter />);
    // Check for header element
    const headerElement = document.querySelector('header');
    expect(headerElement).toBeTruthy();
  });

  it('renders the footer component', () => {
    render(<AppWithRouter />);
    // Check for footer element
    const footerElement = document.querySelector('footer');
    expect(footerElement).toBeTruthy();
  });

  it('renders the main content area', () => {
    render(<AppWithRouter />);
    // Check for main element
    const mainElement = document.querySelector('main');
    expect(mainElement).toBeTruthy();
  });
});
