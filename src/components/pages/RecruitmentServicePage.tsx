import React from 'react';
import { Briefcase, CheckCircle2, ArrowRight, ArrowLeft, Users, ShieldCheck, Award, Headphones } from 'lucide-react';

interface RecruitmentServicePageProps {
  onBackToHome: () => void;
  onBookDemo: (moduleTitle?: string) => void;
  onStartTrial: () => void;
}

export const RecruitmentServicePage: React.FC<RecruitmentServicePageProps> = ({
  onBackToHome,
  onBookDemo
}) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-20 pb-16 animate-fade-in font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Header */}
      <div className="bg-white border-b border-slate-200 py-3 sticky top-16 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Overview
          </button>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
            <span>Healthcare Professional Service: Managed Recruitment</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="py-12 lg:py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider">
              <Briefcase className="w-3.5 h-3.5" /> Managed Recruitment & Executive Search
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              End-to-End Healthcare Recruitment Service & Headhunting
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              Let our dedicated healthcare talent specialists manage candidate sourcing, DBS vetting, clinical interviews, and compliance checks for permanent and temp-to-perm roles.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onBookDemo('Managed Recruitment Service')}
                className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors shadow-2xs flex items-center gap-2"
              >
                Discuss Recruitment Service <ArrowRight className="w-4 h-4 text-slate-300" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">Our Managed Recruitment Capabilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Clinical Headhunting</h3>
            <p className="text-xs text-slate-600">Targeted outreach for specialized Registered Nurses, Home Managers, and Clinical Leads.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">100% DBS Vetting</h3>
            <p className="text-xs text-slate-600">Enhanced criminal background checks, NMC license verification, and right-to-work audits.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Placement Guarantee</h3>
            <p className="text-xs text-slate-600">Free candidate replacement guarantee within 90 days if fit isn't perfect.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
