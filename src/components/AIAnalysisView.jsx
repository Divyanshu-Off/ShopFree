import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Search, Database, Fingerprint, Network, Cpu, CheckCircle2 } from 'lucide-react';
import './Analysis.css';

const AIAnalysisView = ({ formData, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing Contextual Engine...');

  const steps = [
    { threshold: 20, message: 'Mapping unique fit-profile...', icon: Fingerprint },
    { threshold: 45, message: 'Scanning international databases...', icon: Search },
    { threshold: 70, message: 'Synthesizing verified reviews...', icon: Database },
    { threshold: 90, message: 'Running match probability...', icon: Network },
    { threshold: 100, message: 'Optimizing final results...', icon: Cpu }
  ];

  useEffect(() => {
    let resultData = null;
    let isComplete = false;

    // 1. Start the real analysis fetch
    const fetchAnalysis = async () => {
      try {
        const response = await fetch('/api/recommend-product', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        
        if (!response.ok) throw new Error('Analysis failed');
        resultData = await response.json();
      } catch (err) {
        console.error('Fetch error:', err);
        // Fallback handled in App.jsx
      } finally {
        isComplete = true;
      }
    };

    fetchAnalysis();

    // 2. Control the progress animation
    const interval = setInterval(() => {
      setProgress(prev => {
        // Slow down as we reach the end if fetch isn't done
        const increment = prev < 90 ? Math.random() * 6 : (isComplete ? 2 : 0.1);
        const next = prev + increment;
        
        if (next >= 100) {
          if (isComplete) {
            clearInterval(interval);
            setTimeout(() => onComplete(resultData), 800);
            return 100;
          }
          return 99; // Hold at 99% until backend responds
        }
        
        const currentStep = steps.find(s => next <= s.threshold) || steps[steps.length - 1];
        setStatus(currentStep.message);
        
        return next;
      });
    }, 180);

    return () => clearInterval(interval);
  }, [onComplete, formData]);

  return (
    <div className="section-padding analysis-container">
      <div className="analysis-header">
        <motion.div
           initial={{ opacity: 0, scale: 0.5 }}
           animate={{ opacity: 1, scale: 1 }}
           className="analysis-icon-wrap"
        >
          <div className="analysis-icon-center">
            <Brain width={64} height={64} color="white" />
          </div>
          <div className="analysis-ring-1"></div>
          <div className="analysis-ring-2"></div>
        </motion.div>
        
        <h2 className="analysis-title">Synthesizing Your <span className="gradient-text">Best Fit</span></h2>
        <p className="analysis-subtitle">
          Our AI is cross-referencing your climate, sensitivities, and needs against thousands of verified review patterns.
        </p>
      </div>

      <div className="analysis-grid">
        {/* Profile Synthesis Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="synthesis-card glass-panel"
        >
          <Network width={128} height={128} className="synthesis-bg-icon" />
          
          <div className="synthesis-card-header">
            <div className="synthesis-card-icon">
              <Sparkles width={24} height={24} color="white" />
            </div>
            <div>
              <h3 className="synthesis-card-title">AI Input Interpretation</h3>
              <p className="synthesis-card-subtitle">Active Fitting Process</p>
            </div>
          </div>
          
          <div className="synthesis-card-body">
            <div className="synthesis-data-grid">
              <div>
                <p className="synthesis-data-label">Product Category</p>
                <p className="synthesis-data-value">{formData.category.charAt(0).toUpperCase() + formData.category.slice(1)}</p>
              </div>
              <div>
                <p className="synthesis-data-label">Environmental Context</p>
                <p className="synthesis-data-value">{formData.city} ({formData.climate})</p>
              </div>
            </div>
            
            <div className="synthesis-neural-box">
               <p className="synthesis-neural-label">
                 <Cpu width={14} height={14} /> Neural Understanding
               </p>
               <p className="synthesis-neural-text">
                 Prioritizing solutions for <span className="synthesis-neural-highlight">"{Object.values(formData.additionalInfo).join(', ') || 'personal performance'}"</span>. 
                 Filtering for compatibility with <span className="synthesis-neural-highlight">{formData.age}yo</span> metabolism and <span className="synthesis-neural-highlight">{formData.climate}</span> humidity levels.
               </p>
            </div>

            <div className="synthesis-checks">
               <div className="synthesis-check-item">
                 <CheckCircle2 width={12} height={12} /> Sentiment Check
               </div>
               <div className="synthesis-check-item">
                 <CheckCircle2 width={12} height={12} /> Toxicity Filter
               </div>
               <div className="synthesis-check-item">
                 <CheckCircle2 width={12} height={12} /> Price Validation
               </div>
            </div>
          </div>
        </motion.div>

        {/* Progress System */}
        <div className="tracking-system">
          <div className="tracking-status">
            <div className="tracking-status-header">
              <div>
                <p className="tracking-status-label">Current Task</p>
                <h4 className="tracking-status-text">
                  {React.createElement(steps.find(s => progress <= s.threshold)?.icon || Cpu, { className: "pulse-icon", width: 24, height: 24 })}
                  {status}
                </h4>
              </div>
              <p className="tracking-percentage">{Math.round(progress)}%</p>
            </div>
            <div className="tracking-bar-bg">
              <motion.div 
                className="tracking-bar-fill"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              ></motion.div>
            </div>
          </div>

          <div className="tracking-steps">
            {steps.map((step, idx) => (
              <div 
                key={idx} 
                className={`tracking-step-item ${progress >= step.threshold ? 'active' : 'inactive'}`}
              >
                <div className={`tracking-step-icon ${progress >= step.threshold ? 'active' : 'inactive'}`}>
                  {progress >= step.threshold ? <CheckCircle2 width={20} height={20} /> : React.createElement(step.icon, { width: 16, height: 16 })}
                </div>
                <p className={`tracking-step-text ${progress >= step.threshold ? 'active' : 'inactive'}`}>
                  {step.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnalysisView;
