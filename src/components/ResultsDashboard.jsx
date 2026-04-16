import React from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  ExternalLink, 
  ThumbsUp, 
  AlertTriangle, 
  CheckCircle2, 
  Star,
  Zap,
  ArrowRight
} from 'lucide-react';

const ResultsDashboard = ({ recommendation, onReset }) => {
  const { bestMatch, alternatives } = recommendation;

  return (
    <div className="section-padding">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-amber-100 text-amber-600 px-6 py-2 rounded-full text-sm font-bold mb-6 border border-amber-200"
          >
            <Trophy className="w-5 h-5" />
            <span>Optimal Match Found</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Recommended for You</h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Based on our analysis of 50+ products and 1000+ customer reviews.
          </p>
        </div>

        {/* Best Match */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-[2.5rem] overflow-hidden border-2 border-primary/20 shadow-2xl mb-24"
        >
          <div className="grid lg:grid-cols-2">
            <div className="relative h-[400px] lg:h-auto overflow-hidden">
              <img 
                src={bestMatch.image} 
                alt={bestMatch.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-xl shadow-lg flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                  <span className="font-bold text-lg">{bestMatch.matchScore}% Match Score</span>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-12 lg:p-16 space-y-8">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <p className="text-primary font-bold uppercase tracking-widest text-sm">{bestMatch.brand}</p>
                  <p className="text-text-muted font-medium">{bestMatch.price}</p>
                </div>
                <h3 className="text-3xl md:text-4xl font-extrabold mb-4">{bestMatch.name}</h3>
                <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
                  <p className="text-text-secondary italic leading-relaxed">
                    <Zap className="w-5 h-5 text-primary inline mr-2 mb-1" />
                    "{bestMatch.aiExplanation}"
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  Why this suits your profile
                </h4>
                <ul className="space-y-3">
                  {bestMatch.whyMatch.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-text-secondary">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></div>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-wider text-text-muted mb-4 flex items-center gap-2">
                    <ThumbsUp className="w-4 h-4 text-emerald-500" />
                    Consistently Liked
                  </h4>
                  <ul className="space-y-2">
                    {bestMatch.pros.map((pro, i) => (
                      <li key={i} className="text-sm font-medium flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-emerald-500"></div>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-wider text-text-muted mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    Keep in Mind
                  </h4>
                  <ul className="space-y-2">
                    {bestMatch.cautions.map((caution, i) => (
                      <li key={i} className="text-sm font-medium text-text-secondary flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-amber-500"></div>
                        {caution}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 flex flex-wrap gap-4">
                <a 
                  href={bestMatch.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-primary text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-primary-hover shadow-lg shadow-primary/30 transition-all flex-1 justify-center"
                >
                  Visit Official Website <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Review Intelligence Badge */}
          <div className="bg-slate-50 border-t border-border p-6 md:px-12 flex flex-wrap items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                <ThumbsUp className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-text-muted uppercase">Sentiment</p>
                <p className="text-sm font-bold">{bestMatch.reviewSummary.sentiment}</p>
              </div>
            </div>
            <div className="h-8 w-px bg-border hidden md:block"></div>
            <div>
              <p className="text-xs font-bold text-text-muted uppercase">Best For</p>
              <p className="text-sm font-bold">{bestMatch.reviewSummary.bestFor}</p>
            </div>
            <div className="flex-1 min-w-[300px]">
              <p className="text-xs font-bold text-text-muted uppercase mb-1">Common Praise</p>
              <p className="text-sm text-text-secondary">{bestMatch.reviewSummary.praise}</p>
            </div>
          </div>
        </motion.div>

        {/* Alternatives */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold mb-8">Alternative Options</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {alternatives.map((alt, i) => (
              <motion.div
                key={alt.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + (i * 0.1) }}
                className="glass rounded-3xl p-6 border border-border hover:shadow-xl transition-all"
              >
                <div className="flex gap-6">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                    <img src={alt.image} alt={alt.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-xs font-bold text-primary uppercase">{alt.brand}</p>
                      <div className="text-xs font-bold bg-slate-100 px-2 py-1 rounded-md">{alt.matchScore}% Fit</div>
                    </div>
                    <h4 className="font-bold text-lg mb-2">{alt.name}</h4>
                    <p className="text-sm text-text-secondary leading-relaxed mb-4">{alt.aiExplanation}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-text-muted">{alt.price}</span>
                      <a 
                        href={alt.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary text-sm font-bold flex items-center gap-1 hover:underline"
                      >
                        Details <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Action */}
        <div className="text-center">
          <button 
            onClick={onReset}
            className="text-text-secondary font-bold hover:text-primary transition-colors flex items-center gap-2 mx-auto"
          >
            Find another product <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsDashboard;
