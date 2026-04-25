import React from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  ExternalLink, 
  ThumbsUp, 
  AlertTriangle, 
  Star,
  Zap,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  BarChart3,
  Globe
} from 'lucide-react';
import './Results.css';

const ResultsDashboard = ({ recommendation, onReset }) => {
  const { bestMatch, alternatives } = recommendation;

  return (
    <div className="section-padding results-container">
      <div className="container">
        {/* Superior Header */}
        <div className="results-header">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="results-badge"
          >
            <div className="results-badge-inner">
              <Trophy className="w-5 h-5 text-emerald-600" />
              <span className="results-badge-text">Neural Fit Optimization Complete</span>
            </div>
          </motion.div>
          <h2 className="results-title">The <span className="gradient-text">Absolute Best</span> for You.</h2>
          <p className="results-subtitle">
            Our AI has identified one dominant candidate and two high-potential alternatives based on your unique profile.
          </p>
        </div>

        {/* Best Match - The "Winner" Card */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, cubicBezier: [0.16, 1, 0.3, 1] }}
          className="winner-card-wrap"
        >
          {/* Pulsing Aura */}
          <div className="winner-card-aura"></div>
          
          <div className="winner-card glass-panel">
            <div className="winner-grid">
              <div className="winner-image-wrap">
                <img 
                  src={bestMatch.image} 
                  alt={bestMatch.name} 
                  className="winner-image"
                />
                <div className="winner-image-overlay"></div>
                
                <div className="winner-score-badge">
                  <div className="winner-score-icon">
                    <Star width={20} height={20} color="white" fill="white" />
                  </div>
                  <div className="winner-score-col">
                      <p className="winner-score-label">Confidence Score</p>
                      <p className="winner-score-value">{bestMatch.matchScore}%</p>
                  </div>
                </div>

                <div className="winner-tags">
                   <div className="winner-tag-outline">Verified</div>
                   <div className="winner-tag-fill">Top Pick</div>
                </div>
              </div>

              <div className="winner-body">
                <div>
                  <div className="winner-meta">
                    <div className="winner-brand">
                       <span className="winner-brand-line"></span>
                       <p className="winner-brand-text">{bestMatch.brand}</p>
                    </div>
                    <div className="winner-price">{bestMatch.price}</div>
                  </div>
                  <h3 className="winner-name">{bestMatch.name}</h3>
                  <div className="winner-quote">
                    <Zap width={96} height={96} className="winner-quote-icon" />
                    <p className="winner-quote-text">"{bestMatch.aiExplanation}"</p>
                  </div>
                </div>

                <div className="winner-details-grid">
                  <div>
                    <h4 className="winner-section-title">
                      <ShieldCheck width={16} height={16} color="var(--c-emerald-500)" /> Accuracy Report
                    </h4>
                    <ul className="winner-list">
                      {bestMatch.whyMatch.map((point, i) => (
                        <li key={i} className="winner-list-item">
                          <div className="winner-list-bullet">
                            <div className="winner-list-dot"></div>
                          </div>
                          <span className="winner-list-text">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="winner-section-title">
                      <BarChart3 width={16} height={16} color="var(--c-emerald-500)" /> Sentiment Analysis
                    </h4>
                    <div className="winner-sentiment-box">
                       "{bestMatch.reviewSummary.praise}"
                    </div>
                    
                    <div className="winner-pros-flex">
                       {bestMatch.pros.slice(0, 2).map((pro, i) => (
                         <div key={i} className="winner-pro-tag">
                           <ThumbsUp width={12} height={12} /> {pro}
                         </div>
                       ))}
                    </div>
                  </div>
                </div>

                <div style={{ paddingTop: '1.5rem' }}>
                  <button 
                    onClick={() => window.open(bestMatch.link, '_blank')}
                    className="btn-buy group"
                  >
                    Acquire Product <ExternalLink width={24} height={24} className="btn-buy-icon" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Review Badge */}
            <div className="intel-bar">
              <div className="intel-item">
                <div className="intel-icon-box">
                  <TrendingUp width={28} height={28} color="var(--c-emerald-600)" />
                </div>
                <div>
                  <p className="intel-label">Market Sentiment</p>
                  <p className="intel-value">{bestMatch.reviewSummary.sentiment}</p>
                </div>
              </div>
              
              <div className="intel-divider"></div>
              
              <div className="intel-item">
                <div className="intel-icon-box">
                  <Globe width={28} height={28} color="var(--c-emerald-600)" />
                </div>
                <div>
                  <p className="intel-label">Global Availability</p>
                  <p className="intel-value">High Confidence</p>
                </div>
              </div>
              
              <div className="intel-tag-box">
                 <p className="intel-tag-label">Fit Category</p>
                 <p className="intel-tag-value">{bestMatch.reviewSummary.bestFor}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Alternatives Section */}
        <div className="alt-section">
          <div className="alt-header">
             <div>
                <h3 className="alt-title">Secondary <span>Options</span></h3>
                <p className="alt-subtitle">High-performance alternatives worth considering.</p>
             </div>
             <div className="alt-line"></div>
          </div>
          
          <div className="alt-grid">
            {alternatives.map((alt, i) => (
              <motion.div
                key={alt.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + (i * 0.1) }}
                className="alt-card glass-panel"
              >
                <div className="alt-bg-icon">
                   <Star width={128} height={128} color="var(--c-emerald-600)" />
                </div>
                
                <div className="alt-content">
                  <div className="alt-image-wrap">
                    <img src={alt.image} alt={alt.name} className="alt-image" />
                  </div>
                  <div className="alt-details">
                    <div className="alt-meta">
                      <div className="alt-brand">
                        <span className="alt-brand-line"></span>
                        <p className="alt-brand-text">{alt.brand}</p>
                      </div>
                      <div className="alt-score">{alt.matchScore}% FIT</div>
                    </div>
                    <h4 className="alt-name">{alt.name}</h4>
                    <p className="alt-desc">{alt.aiExplanation}</p>
                    <div className="alt-footer">
                      <span className="alt-price">{alt.price}</span>
                      <button 
                        onClick={() => window.open(alt.link, '_blank')}
                        className="btn-icon-only"
                      >
                        <ArrowRight width={20} height={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Global Action */}
        <div className="results-global-actions">
          <button 
            onClick={onReset}
            className="btn-reset"
          >
            Reset Analysis & Search Again <ArrowRight width={16} height={16} className="btn-reset-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsDashboard;
