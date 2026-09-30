import React from 'react';
import { ArrowRight, CheckCircle2, Shield, Sparkles } from 'lucide-react';

interface FinalCTAProps {
  onBookDemo: () => void;
  onStartTrial: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onBookDemo, onStartTrial }) => {
  return (
    <section className="py-20 bg-white text-slate-900 relative border-t border-slate-200 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <div className="p-8 sm:p-12 rounded-2xl bg-slate-900 text-white shadow-xl relative overflow-hidden border border-slate-800">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold uppercase tracking-wider mb-4">
            <Shield className="w-3.5 h-3.5 text-emerald-400" /> Start Modernizing Today
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Ready to Transform Your Healthcare Operations?
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
            Join 500+ care providers across the UK who've streamlined recruitment, improved care quality, and saved thousands of administrative hours with MployUS.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <button
              onClick={onBookDemo}
              className="px-8 py-3.5 bg-white hover:bg-slate-100 text-slate-900 font-semibold text-sm rounded-md transition-colors shadow-xs flex items-center gap-2"
            >
              Book Your Demo <ArrowRight className="w-4 h-4 text-slate-900" />
            </button>

            <button
              onClick={onStartTrial}
              className="px-7 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm rounded-md border border-slate-700 transition-colors"
            >
              Start Free 14-Day Trial
            </button>
          </div>

          {/* Trust Value Props */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Free data migration assistance
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Cancel anytime with 30 days notice
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
