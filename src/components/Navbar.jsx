import React from 'react';
import { Sparkles, Moon, Sun } from 'lucide-react';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  return (
    <nav className="glass sticky top-0 z-50 py-4 shadow-sm">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-2 rounded-lg">
            <Sparkles className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold font-heading tracking-tight">
            BestFit<span className="text-primary">AI</span>
          </span>
        </div>
        
        <div className="flex items-center gap-6">
          <ul className="hidden md:flex gap-8 text-sm font-medium text-text-secondary">
            <li className="hover:text-primary transition-colors cursor-pointer">How it Works</li>
            <li className="hover:text-primary transition-colors cursor-pointer">Categories</li>
            <li className="hover:text-primary transition-colors cursor-pointer">About</li>
          </ul>
          
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-surface-hover transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          <button className="bg-primary text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-primary-hover transition-all shadow-md hover:shadow-lg active:scale-95">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
