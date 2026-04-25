import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle2, Info, User, MapPin, Wind, Wallet, Target, Sparkles } from 'lucide-react';
import { categories } from '../data/mockData';
import './Form.css';

const ProductInquiryForm = ({ onSubmit }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    category: '',
    age: '',
    city: '',
    climate: 'Humid',
    budget: '',
    brandPreference: '',
    mainGoal: '',
    additionalInfo: {}
  });

  const selectedCategory = categories.find(c => c.id === formData.category);

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const updateFormData = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const updateAdditionalInfo = (key, value) => {
    setFormData(prev => ({
      ...prev,
      additionalInfo: { ...prev.additionalInfo, [key]: value }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="form-step-container"
          >
            <div className="form-header">
              <h2 className="form-title">Choose Your Category</h2>
              <p className="form-subtitle">What kind of expert advice do you need today?</p>
            </div>
            
            <div className="category-grid">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    updateFormData('category', cat.id);
                    handleNext();
                  }}
                  className={`category-card ${formData.category === cat.id ? 'selected' : ''}`}
                >
                  <div className="category-icon-wrap">
                    {cat.id === 'shampoo' && <Sparkles width={28} height={28} />}
                    {cat.id === 'shoes' && <Target width={28} height={28} />}
                    {cat.id === 'laptop' && <Wallet width={28} height={28} />}
                  </div>
                  <div className="category-name">{cat.name}</div>
                  <div className="category-desc">Personalized analysis for {cat.name.toLowerCase()} seekers.</div>
                  
                  {formData.category === cat.id && (
                    <div className="category-check">
                      <CheckCircle2 width={24} height={24} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="form-step-container"
          >
            <div className="form-header">
               <h2 className="form-title">Personal Context</h2>
               <p className="form-subtitle">Context is king. Help the AI understand your environment.</p>
            </div>
            
            <div className="input-grid">
              <div className="input-group">
                <label className="input-label">
                  <User width={16} height={16} /> User Age
                </label>
                <input
                  type="number"
                  placeholder="e.g. 25"
                  className="form-input"
                  value={formData.age}
                  onChange={(e) => updateFormData('age', e.target.value)}
                />
              </div>
              <div className="input-group">
                <label className="input-label">
                  <MapPin width={16} height={16} /> Current City
                </label>
                <input
                  type="text"
                  placeholder="e.g. London"
                  className="form-input"
                  value={formData.city}
                  onChange={(e) => updateFormData('city', e.target.value)}
                />
              </div>
              <div className="input-group">
                <label className="input-label">
                  <Wind width={16} height={16} /> Local Climate
                </label>
                <select
                  className="form-input"
                  value={formData.climate}
                  onChange={(e) => updateFormData('climate', e.target.value)}
                >
                  <option value="Humid">Humid / Hot</option>
                  <option value="Dry">Dry / Arid</option>
                  <option value="Cold">Cold / Alpine</option>
                  <option value="Temperate">Temperate</option>
                </select>
              </div>
              <div className="input-group">
                <label className="input-label">
                  <Wallet width={16} height={16} /> Target Budget
                </label>
                <input
                  type="text"
                  placeholder="e.g. $50 - $100"
                  className="form-input"
                  value={formData.budget}
                  onChange={(e) => updateFormData('budget', e.target.value)}
                />
              </div>
            </div>
            
            <div className="form-actions">
              <button onClick={handleBack} className="btn-secondary">
                <ArrowLeft width={20} height={20} /> Back
              </button>
              <button 
                onClick={handleNext}
                disabled={!formData.age || !formData.city}
                className="btn-action"
              >
                Continue Analysis <ArrowRight width={20} height={20} />
              </button>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="form-step-container"
          >
            <div className="form-header">
               <div className="form-tag">Finalizing Profile</div>
               <h2 className="form-title">Refining Details</h2>
               <p className="form-subtitle">Almost there. Tell us about your specific goals.</p>
            </div>
            
            <div className="input-grid">
              {selectedCategory?.fields.map(field => (
                <div key={field.id} className="input-group">
                  <label className="input-label">
                     <Target width={16} height={16} /> {field.label}
                  </label>
                  {field.type === 'select' ? (
                    <select
                      className="form-input"
                      value={formData.additionalInfo[field.id] || ''}
                      onChange={(e) => updateAdditionalInfo(field.id, e.target.value)}
                    >
                      <option value="">Select option...</option>
                      {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  ) : (
                    <input
                      type="text"
                      className="form-input"
                      value={formData.additionalInfo[field.id] || ''}
                      onChange={(e) => updateAdditionalInfo(field.id, e.target.value)}
                    />
                  )}
                </div>
              ))}
              <div className="input-group input-full">
                <label className="input-label">
                   <Target width={16} height={16} /> Brand Preferences
                </label>
                <input
                  type="text"
                  placeholder="e.g. Prefers organic, avoid L'Oreal"
                  className="form-input"
                  value={formData.brandPreference}
                  onChange={(e) => updateFormData('brandPreference', e.target.value)}
                />
              </div>
            </div>
            
            <div className="form-actions">
              <button onClick={handleBack} className="btn-secondary">
                <ArrowLeft width={20} height={20} /> Back
              </button>
              <button 
                onClick={handleSubmit}
                className="btn-action"
              >
                Execute Analysis <ArrowRight width={20} height={20} />
              </button>
            </div>
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="form-container">
      {/* Premium Progress Bar */}
      <div className="form-progress-wrap">
        {[1, 2, 3].map(i => (
          <div key={i} className="form-progress-step">
            <div className="form-progress-header">
               <span className={`form-progress-label ${step >= i ? 'active' : ''}`}>
                 Step 0{i}
               </span>
               {step > i && <CheckCircle2 width={14} height={14} color="var(--c-emerald-500)" />}
            </div>
            <div className="form-progress-track">
               <div 
                 className="form-progress-fill"
                 style={{ width: step >= i ? '100%' : '0%' }}
               ></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="form-panel glass-panel">
        <LeafIcon className="form-bg-icon" width={200} height={200} color="var(--c-emerald-800)" />
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>

      <div className="form-info-card">
        <div className="form-info-icon">
          <Info width={24} height={24} color="var(--c-emerald-600)" />
        </div>
        <div className="form-info-content">
          <p className="form-info-title">Privacy First Advice</p>
          <p className="form-info-desc">
            Your personal context is analyzed locally and used anonymously to fetch the best reviews. We prioritize matching your biological and environmental needs over generic sales trends.
          </p>
        </div>
      </div>
    </div>
  );
};

const LeafIcon = ({ className, width, height, color }) => (
  <svg className={className} width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8a8 8 0 0 1-8 8Z"/><path d="M11 20c0-2.5 2-4.14 4-5.14"/><path d="M11 20H4c0-3.25 2.13-5.07 4-5.93"/><path d="M4.8 14.8c1 2.2 5.1 3.2 7 3.2"/>
  </svg>
);

export default ProductInquiryForm;
