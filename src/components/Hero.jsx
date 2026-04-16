import React from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

const Hero = ({ onStart }) => {
  return (
    <section className="section-padding overflow-hidden">
      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-primary-light text-primary px-4 py-1.5 rounded-full text-sm font-bold mb-6">
            <Zap className="w-4 h-4" />
            <span>AI-Powered Product Discovery</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-[1.1]">
            Find the <span className="text-primary">best product</span> for you, not just the popular one.
          </h1>
          
          <p className="text-lg text-text-secondary mb-10 max-w-lg leading-relaxed">
            Stop scrolling through endless reviews. Our AI buying assistant analyzes your specific context to find your perfect match in seconds.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={onStart}
              className="bg-primary text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-primary-hover transition-all shadow-xl hover:shadow-primary/20 flex items-center gap-2 active:scale-95"
            >
              Start Finding <ArrowRight className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-3 px-6 py-4">
              <div className="flex -space-x-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-surface bg-slate-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                  </div>
                ))}
              </div>
              <p className="text-sm font-medium text-text-secondary">
                <span className="font-bold text-text-primary">10k+</span> people helped
              </p>
            </div>
          </div>
          
          <div className="mt-12 flex items-center gap-6 text-text-muted">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-sm font-medium">Unbiased Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              <span className="text-sm font-medium">Deep Web Search</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-full blur-3xl opacity-60"></div>
          
          <div className="glass rounded-3xl p-6 shadow-2xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
            </div>
            
            <div className="space-y-4">
              <div className="h-4 w-3/4 bg-slate-100 rounded-full"></div>
              <div className="h-4 w-1/2 bg-slate-100 rounded-full"></div>
              <div className="mt-8 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                  <div className="h-3 w-1/3 bg-primary/20 rounded-full"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-full bg-primary/10 rounded-full"></div>
                  <div className="h-2 w-full bg-primary/10 rounded-full"></div>
                  <div className="h-2 w-2/3 bg-primary/10 rounded-full"></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="h-24 bg-slate-50 rounded-2xl"></div>
                <div className="h-24 bg-slate-50 rounded-2xl"></div>
              </div>
            </div>
            
            {/* Abstract Floating Elements */}
            <motion.div 
              animate={{ y: [0, -10, 0] }} 
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 bg-white p-4 shadow-xl rounded-2xl border border-slate-100"
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success"></div>
                <span className="text-xs font-bold font-heading uppercase tracking-wider">98% Match</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Sparkles = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
  </svg>
);

export default Hero;
