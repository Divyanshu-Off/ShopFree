import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6 text-white">
              <span className="text-2xl font-bold font-heading">BestFit<span className="text-primary">AI</span></span>
            </div>
            <p className="max-w-xs leading-relaxed">
              Empowering consumers with AI-driven contextual insights for smarter, more personalized buying decisions.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Product</h4>
            <ul className="space-y-4">
              <li className="hover:text-white transition-colors cursor-pointer text-sm">How it works</li>
              <li className="hover:text-white transition-colors cursor-pointer text-sm">Categories</li>
              <li className="hover:text-white transition-colors cursor-pointer text-sm">Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-4">
              <li className="hover:text-white transition-colors cursor-pointer text-sm">About Us</li>
              <li className="hover:text-white transition-colors cursor-pointer text-sm">Feedback</li>
              <li className="hover:text-white transition-colors cursor-pointer text-sm">Contact</li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-800 flex justify-between items-center text-xs">
          <p>© 2026 BestFitAI Solutions. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">Twitter</span>
            <span className="hover:text-white transition-colors cursor-pointer">LinkedIn</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
