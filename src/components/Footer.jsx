import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand-col">
            <div className="footer-brand">
              <span className="footer-brand-text">BestFit<span>AI</span></span>
            </div>
            <p className="footer-desc">
              Empowering consumers with AI-driven contextual insights for smarter, more personalized buying decisions.
            </p>
          </div>
          <div>
            <h4 className="footer-nav-title">Product</h4>
            <ul className="footer-nav-list">
              <li className="footer-nav-item">How it works</li>
              <li className="footer-nav-item">Categories</li>
              <li className="footer-nav-item">Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h4 className="footer-nav-title">Company</h4>
            <ul className="footer-nav-list">
              <li className="footer-nav-item">About Us</li>
              <li className="footer-nav-item">Feedback</li>
              <li className="footer-nav-item">Contact</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 BestFitAI Solutions. All rights reserved.</p>
          <div className="footer-socials">
            <span className="footer-social-link">Twitter</span>
            <span className="footer-social-link">LinkedIn</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
