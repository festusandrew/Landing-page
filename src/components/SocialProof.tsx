import React from 'react';
import { Star, Building2, ArrowRight, ShieldCheck, Award, Quote } from 'lucide-react';
import { TESTIMONIALS, CLIENT_LOGOS } from '../data/mockData';

interface SocialProofProps {
  onOpenCaseStudy: () => void;
  onBookDemo: () => void;
}

export const SocialProof: React.FC<SocialProofProps> = ({ onOpenCaseStudy, onBookDemo }) => {
  return (
    <section id="social-proof" className="py-20 bg-white text-slate-900 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5 text-emerald-600" /> Customer Success Stories
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Trusted by Leading Care Providers
          </h2>
          <p className="text-slate-600 text-base mt-3">
            Hear how care home directors, agency managers, and locum nurses thrive with MployUS.
          </p>
        </div>

        {/* 3 Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-xl bg-white border border-slate-200 hover:border-slate-300 transition-all duration-200 shadow-xs flex flex-col justify-between relative group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500 gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
                    {t.moduleBadge}
                  </span>
                </div>

                <blockquote className="text-xs text-slate-600 leading-relaxed italic relative font-medium">
                  "{t.quote}"
                </blockquote>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-3">
                <img
                  src={t.avatarUrl}
                  alt={t.author}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900">{t.author}</div>
                  <div className="text-[11px] text-emerald-700 font-semibold">{t.role}, <span className="text-slate-500 font-normal">{t.organization}</span></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Case Study Highlight Banner */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-slate-200 text-slate-800 uppercase tracking-wider inline-block">
              Featured Case Study
            </span>
            <h3 className="text-2xl font-bold text-slate-900">
              How Meadowview Care Reduced Admin by 18 Hours/Week & Achieved CQC Outstanding
            </h3>
            <p className="text-xs text-slate-600">
              Discover how integrating digital care plans, eMAR medication charts, and locum shift broadcasts eliminated compliance backlogs for a 120-bed residential group.
            </p>
          </div>

          <button
            onClick={onOpenCaseStudy}
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-md transition-colors shadow-xs shrink-0 flex items-center gap-2"
          >
            Read Full Case Study <ArrowRight className="w-4 h-4 text-slate-300" />
          </button>
        </div>

        {/* Customer Logo Cloud */}
        <div className="mt-16 text-center">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">
            Accredited & Trusted Healthcare Network
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CLIENT_LOGOS.map((logo, i) => (
              <div
                key={i}
                className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-xs font-semibold text-slate-700 hover:text-slate-900 hover:border-slate-300 transition-all gap-1.5"
              >
                <Building2 className="w-3.5 h-3.5 text-slate-800" />
                <span>{logo.logoText}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
