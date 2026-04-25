import React from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight, ShieldCheck, Zap, Sparkles, TrendingUp } from 'lucide-react';
import './Hero.css';

const Hero = ({ onStart }) => {
  return (
    <section className="section-padding hero-section container">
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
      >
        <div className="hero-badge">
          <Sparkles width={16} height={16} />
          <span>Next-Gen Shopping AI</span>
        </div>
        
        <h1 className="hero-title">
          Find the <span className="gradient-text">Absolute Best</span> match for you.
        </h1>
        
        <p className="hero-description">
          Tired of generic "Top 10" lists? Our AI deep-scans your environment and reviews to find your personal perfect product.
        </p>
        
        <div className="hero-actions">
          <button 
            onClick={onStart}
            className="btn-primary group"
          >
            Discover Your Match <ArrowRight width={20} height={20} className="hero-btn-icon" />
          </button>
          
          <div className="hero-social-proof">
            <div className="hero-avatars">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="hero-avatar">
                  <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="user" />
                </div>
              ))}
            </div>
            <div>
              <p className="hero-social-text-main">Join 15,000+</p>
              <p className="hero-social-text-sub">Smart Shoppers</p>
            </div>
          </div>
        </div>
        
        <div className="hero-features">
          <div className="hero-feature-item">
            <div className="hero-feature-icon-wrapper">
              <ShieldCheck width={20} height={20} color="var(--c-emerald-500)" />
            </div>
            <span className="hero-feature-text">Verified Reviews</span>
          </div>
          <div className="hero-feature-item">
            <div className="hero-feature-icon-wrapper">
              <TrendingUp width={20} height={20} color="var(--c-emerald-500)" />
            </div>
            <span className="hero-feature-text">Real-time Data</span>
          </div>
        </div>
      </motion.div>
      
      <motion.div
        className="hero-visual"
        initial={{ opacity: 0, scale: 0.9, x: 50 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.2, cubicBezier: [0.16, 1, 0.3, 1] }}
      >
        <div className="hero-showcase-glass glass-panel">
          <div className="hero-showcase-inner">
             <div className="hero-showcase-header">
                <Sparkles className="hero-showcase-bg-icon" />
                <div className="hero-showcase-header-content">
                  <div className="hero-showcase-tag">Top Recommendation</div>
                  <h3 className="hero-showcase-title">PureHarmony Scalp Relief</h3>
                  <p className="hero-showcase-subtitle">98% Match for your profile</p>
                </div>
             </div>
             <div className="hero-showcase-body">
               <div className="hero-skeleton-flex">
                 <div className="hero-skeleton-bar-md"></div>
                 <div className="hero-skeleton-bar-sm"></div>
               </div>
               <div className="hero-skeleton-col">
                 <div className="hero-skeleton-line-full"></div>
                 <div className="hero-skeleton-line-partial"></div>
               </div>
               <div className="hero-showcase-footer">
                  <div className="hero-stars">
                    {[1,2,3,4,5].map(star => (
                      <div key={star} className="hero-star-box">
                        <Search width={10} height={10} color="var(--c-emerald-600)" />
                      </div>
                    ))}
                  </div>
                  <div className="hero-showcase-action">VIEW DETAILS</div>
               </div>
             </div>
          </div>
        </div>

        {/* Floating Stat Card 1 */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="hero-floating-card card-1 glass-panel"
        >
          <div className="hero-floating-icon orange">
            <Zap width={20} height={20} fill="currentColor" />
          </div>
          <div>
            <p className="hero-floating-label">Precision</p>
            <p className="hero-floating-value orange">1.2s Analysis</p>
          </div>
        </motion.div>

        {/* Floating Stat Card 2 */}
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="hero-floating-card card-2 glass-panel"
        >
          <div className="hero-floating-icon emerald">
            <ShieldCheck width={20} height={20} />
          </div>
          <div>
            <p className="hero-floating-label">Confidence</p>
            <p className="hero-floating-value emerald">Verified Result</p>
          </div>
        </motion.div>

        <div className="hero-bg-ring"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
