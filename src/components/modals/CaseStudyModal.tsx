import React from 'react';
import { X, CheckCircle2, TrendingUp, Clock, ShieldCheck, ArrowRight, Award } from 'lucide-react';

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookDemo: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ isOpen, onClose, onBookDemo }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-2">
            <Award className="w-4 h-4" /> Customer Success Story
          </div>
          <h3 className="text-2xl font-bold">Meadowview Care Group Transformation</h3>
          <p className="text-slate-300 text-xs mt-1">How a 120-bed residential group reduced admin by 18 hrs/wk and achieved CQC Outstanding.</p>
        </div>

        {/* Case Study Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700">
          {/* Key Outcome Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-center">
              <Clock className="w-6 h-6 text-teal-600 mx-auto mb-1" />
              <div className="text-2xl font-black text-teal-950">18 Hrs/Wk</div>
              <div className="text-[11px] font-semibold text-teal-700">Admin Reclaimed</div>
            </div>
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
              <ShieldCheck className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
              <div className="text-2xl font-black text-emerald-950">99.8%</div>
              <div className="text-[11px] font-semibold text-emerald-700">eMAR Med Accuracy</div>
            </div>
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-center">
              <TrendingUp className="w-6 h-6 text-blue-600 mx-auto mb-1" />
              <div className="text-2xl font-black text-blue-950">14 Mins</div>
              <div className="text-[11px] font-semibold text-blue-700">Avg Locum Fill Speed</div>
            </div>
          </div>

          {/* Background & Challenge */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">The Challenge</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Meadowview Care operated 3 sites across Yorkshire with disconnected systems for hiring, paper care plans, WhatsApp shift requests, and manual Excel rotas. Staff spent 2.5 hours daily on repetitive admin, leading to burnout and delayed CQC audit prep.
            </p>
          </div>

          {/* The Solution */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">The MployUS Solution</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                <span>Unified applicant tracking with automated DBS verification reduced hiring time from 24 days to 7 days.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                <span>Replaced paper MAR charts with MployUS eMAR mobile app, eliminating medication record omissions entirely.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                <span>Integrated smart rotas with 1-tap locum broadcast, filling emergency night shifts in under 15 minutes.</span>
              </div>
            </div>
          </div>

          {/* Testimonial Quote */}
          <blockquote className="p-4 rounded-xl bg-slate-900 text-white italic text-xs leading-relaxed relative">
            <span className="text-teal-400 font-bold font-serif text-xl">“</span>
            MployUS completely transformed our operations. CQC inspectors called our digital care records ‘a gold standard for residential care’.
            <span className="block not-italic font-bold text-teal-300 mt-2 text-[11px]">
              — Eleanor Vance, Operations Director at Meadowview Care
            </span>
          </blockquote>
        </div>

        {/* Footer CTAs */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button onClick={onClose} className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900">
            Close Case Study
          </button>
          <button
            onClick={() => {
              onClose();
              onBookDemo();
            }}
            className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs rounded-xl transition-all shadow-md shadow-teal-600/20 flex items-center gap-1.5"
          >
            Schedule a Demo Like Meadowview <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
