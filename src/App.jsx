import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductInquiryForm from './components/ProductInquiryForm';
import AIAnalysisView from './components/AIAnalysisView';
import ResultsDashboard from './components/ResultsDashboard';
import Footer from './components/Footer';
import { mockRecommendations } from './data/mockData';
import './App.css';

const App = () => {
  const [appState, setAppState] = useState('home'); // home, inquiry, analyzing, results
  const [formData, setFormData] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleStartInquiry = () => {
    setAppState('inquiry');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmit = (data) => {
    setFormData(data);
    setAppState('analyzing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnalysisComplete = () => {
    // In a real app, this would fetch from an API based on formData
    // For the demo, we use the shampoo mock data
    setRecommendation(mockRecommendations[formData.category] || mockRecommendations.shampoo);
    setAppState('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setAppState('home');
    setFormData(null);
    setRecommendation(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="main-content">
        {appState === 'home' && (
          <Hero onStart={handleStartInquiry} />
        )}

        {appState === 'inquiry' && (
          <section className="section-padding">
            <div className="container">
              <ProductInquiryForm onSubmit={handleFormSubmit} />
            </div>
          </section>
        )}

        {appState === 'analyzing' && (
          <AIAnalysisView formData={formData} onComplete={handleAnalysisComplete} />
        )}

        {appState === 'results' && (
          <ResultsDashboard recommendation={recommendation} onReset={handleReset} />
        )}
      </main>

      {/* Trust Badges section for home */}
      {appState === 'home' && (
        <section className="trust-badges-section">
          <div className="container">
            <h3 className="trust-badges-title">Trusted by global savvy shoppers</h3>
            <div className="trust-badges-grid">
              <span className="trust-badge-item">SHOPSTYLE</span>
              <span className="trust-badge-item">VOGUE</span>
              <span className="trust-badge-item">WIRED</span>
              <span className="trust-badge-item">TECHGEAR</span>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default App;
