import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle2, Info } from 'lucide-react';
import { categories } from '../data/mockData';

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
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold mb-2">What are you looking for?</h2>
            <p className="text-text-secondary mb-8">Select a category to get started.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    updateFormData('category', cat.id);
                    handleNext();
                  }}
                  className={`p-6 rounded-2xl border-2 text-left transition-all ${
                    formData.category === cat.id 
                    ? 'border-primary bg-primary/5 shadow-md' 
                    : 'border-border hover:border-text-muted bg-surface'
                  }`}
                >
                  <div className="font-bold text-lg mb-1">{cat.name}</div>
                  <div className="text-sm text-text-muted">Find the perfect {cat.name.toLowerCase()} for your needs.</div>
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
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold mb-2">Tell us about yourself</h2>
            <p className="text-text-secondary mb-8">This helps our AI understand your unique context.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-text-secondary uppercase tracking-wider">Age</label>
                <input
                  type="number"
                  placeholder="e.g. 15"
                  className="w-full p-4 rounded-xl border border-border bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  value={formData.age}
                  onChange={(e) => updateFormData('age', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-text-secondary uppercase tracking-wider">City / Location</label>
                <input
                  type="text"
                  placeholder="e.g. Chennai"
                  className="w-full p-4 rounded-xl border border-border bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  value={formData.city}
                  onChange={(e) => updateFormData('city', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-text-secondary uppercase tracking-wider">Climate</label>
                <select
                  className="w-full p-4 rounded-xl border border-border bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  value={formData.climate}
                  onChange={(e) => updateFormData('climate', e.target.value)}
                >
                  <option value="Humid">Humid / Hot</option>
                  <option value="Dry">Dry / Arid</option>
                  <option value="Cold">Cold / Alpine</option>
                  <option value="Temperate">Temperate</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-text-secondary uppercase tracking-wider">Budget Range</label>
                <input
                  type="text"
                  placeholder="e.g. $20 - $50"
                  className="w-full p-4 rounded-xl border border-border bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  value={formData.budget}
                  onChange={(e) => updateFormData('budget', e.target.value)}
                />
              </div>
            </div>
            
            <div className="pt-6 flex gap-4">
              <button onClick={handleBack} className="flex-1 p-4 rounded-xl border border-border font-bold hover:bg-surface-hover transition-all flex items-center justify-center gap-2">
                <ArrowLeft className="w-5 h-5" /> Back
              </button>
              <button 
                onClick={handleNext}
                disabled={!formData.age || !formData.city}
                className="flex-[2] p-4 rounded-xl bg-primary text-white font-bold hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                Continue <ArrowRight className="w-5 h-5" />
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
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-bold">Specific Requirements</h2>
              <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase">{selectedCategory?.name}</div>
            </div>
            <p className="text-text-secondary mb-8">Personalized fields for {selectedCategory?.name.toLowerCase()}.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedCategory?.fields.map(field => (
                <div key={field.id} className="space-y-2">
                  <label className="text-sm font-bold text-text-secondary uppercase tracking-wider">{field.label}</label>
                  {field.type === 'select' ? (
                    <select
                      className="w-full p-4 rounded-xl border border-border bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      value={formData.additionalInfo[field.id] || ''}
                      onChange={(e) => updateAdditionalInfo(field.id, e.target.value)}
                    >
                      <option value="">Select option...</option>
                      {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  ) : (
                    <input
                      type="text"
                      className="w-full p-4 rounded-xl border border-border bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      value={formData.additionalInfo[field.id] || ''}
                      onChange={(e) => updateAdditionalInfo(field.id, e.target.value)}
                    />
                  )}
                </div>
              ))}
              <div className="col-span-full space-y-2">
                <label className="text-sm font-bold text-text-secondary uppercase tracking-wider">Brand Preference or Avoidance</label>
                <input
                  type="text"
                  placeholder="e.g. Prefers organic, avoid L'Oreal"
                  className="w-full p-4 rounded-xl border border-border bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  value={formData.brandPreference}
                  onChange={(e) => updateFormData('brandPreference', e.target.value)}
                />
              </div>
            </div>
            
            <div className="pt-6 flex gap-4">
              <button onClick={handleBack} className="flex-1 p-4 rounded-xl border border-border font-bold hover:bg-surface-hover transition-all flex items-center justify-center gap-2">
                <ArrowLeft className="w-5 h-5" /> Back
              </button>
              <button 
                onClick={handleSubmit}
                className="flex-[2] p-4 rounded-xl bg-primary text-white font-bold hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
              >
                Analyze & Find Best Fit <CheckCircle2 className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="flex gap-2 mb-12">
        {[1, 2, 3].map(i => (
          <div 
            key={i} 
            className={`h-2 flex-1 rounded-full transition-all duration-500 ${
              step >= i ? 'bg-primary' : 'bg-slate-200'
            }`}
          ></div>
        ))}
      </div>
      
      <div className="glass p-8 md:p-12 rounded-[2rem] shadow-xl border border-white/40">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>

      <div className="mt-12 flex items-start gap-4 p-6 bg-slate-100/50 rounded-2xl border border-slate-200/60">
        <Info className="w-6 h-6 text-primary shrink-0 mt-0.5" />
        <p className="text-sm text-text-secondary leading-relaxed">
          <span className="font-bold text-text-primary">How we use this:</span> Our AI uses these details to filter out products that don't match your body type, climate conditions, or performance requirements. We prioritize health and suitability over brand popularity.
        </p>
      </div>
    </div>
  );
};

export default ProductInquiryForm;
