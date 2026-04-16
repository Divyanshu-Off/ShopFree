import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Search, Database, Fingerprint } from 'lucide-react';

const AIAnalysisView = ({ formData, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Building user profile...');

  const steps = [
    { threshold: 20, message: 'Creating fit-profile...', icon: Fingerprint },
    { threshold: 45, message: 'Searching product databases...', icon: Search },
    { threshold: 70, message: 'Analyzing review sentiment...', icon: Database },
    { threshold: 90, message: 'Calculating match scores...', icon: Brain },
    { threshold: 100, message: 'Finalizing recommendations...', icon: Sparkles }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 800);
          return 100;
        }
        
        const next = prev + Math.random() * 5;
        const currentStep = steps.find(s => next <= s.threshold) || steps[steps.length - 1];
        setStatus(currentStep.message);
        
        return next > 100 ? 100 : next;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="max-w-4xl mx-auto section-padding text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-12"
      >
        <div className="relative inline-block">
          <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mb-6 mx-auto animate-pulse">
            <Brain className="w-12 h-12 text-primary" />
          </div>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            className="absolute inset-0 border-4 border-dashed border-primary/20 rounded-3xl -m-2"
          ></motion.div>
        </div>
        
        <h2 className="text-4xl font-bold mb-4">Analyzing Your Needs</h2>
        <p className="text-xl text-text-secondary max-w-2xl mx-auto">
          Our AI is interpreting your context to find the best possible match.
        </p>
      </motion.div>

      {/* Profile Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass p-8 rounded-3xl border border-primary/20 mb-12 text-left max-w-2xl mx-auto"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-primary/20 p-2 rounded-lg">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-bold">AI Profile Interpretation</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-y-4 gap-x-8">
          <div>
            <p className="text-xs font-bold text-text-muted uppercase mb-1">Target Product</p>
            <p className="font-medium">{formData.category.charAt(0).toUpperCase() + formData.category.slice(1)}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-text-muted uppercase mb-1">User Segment</p>
            <p className="font-medium">{formData.age} year old in {formData.city}</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs font-bold text-text-muted uppercase mb-1">Key Context</p>
            <p className="text-sm text-text-secondary leading-relaxed">
              Seeking solutions for <span className="text-primary font-bold">{formData.additionalInfo.hairGoal || formData.additionalInfo.usage || 'performance'}</span> in a <span className="text-primary font-bold">{formData.climate}</span> environment. Avoiding allergens and prioritizing <span className="text-primary font-bold">suitability</span>.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-end mb-3">
          <span className="text-sm font-bold text-primary flex items-center gap-2">
            {steps.find(s => progress <= s.threshold)?.icon && React.createElement(steps.find(s => progress <= s.threshold).icon, { className: "w-4 h-4" })}
            {status}
          </span>
          <span className="text-sm font-bold text-text-muted">{Math.round(progress)}%</span>
        </div>
        <div className="h-4 bg-slate-200 rounded-full overflow-hidden p-1">
          <motion.div 
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          ></motion.div>
        </div>
      </div>
    </div>
  );
};

export default AIAnalysisView;
