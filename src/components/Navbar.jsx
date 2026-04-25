import React from 'react';
import { Moon, Sun, Leaf } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  return (
    <nav className="navbar glass-panel">
      <div className="container navbar-container">
        <div className="nav-brand">
          <div className="nav-brand-icon">
            <Leaf className="text-white w-6 h-6" color="white" />
          </div>
          <span className="nav-brand-text">
            BestFit<span>AI</span>
          </span>
        </div>
        
        <div className="nav-actions">
          <ul className="nav-links">
            <li className="nav-link">How it Works</li>
            <li className="nav-link">Categories</li>
            <li className="nav-link">About</li>
          </ul>
          
          <div className="nav-divider"></div>
          
          <div className="nav-buttons">
            <button 
              onClick={toggleDarkMode}
              className="btn-theme-toggle"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun width={20} height={20} /> : <Moon width={20} height={20} />}
            </button>
            
            <button className="btn-primary">
              Launch App
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
