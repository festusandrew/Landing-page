import React, { useState } from 'react';
import { UserPlus, CheckCircle2, ArrowRight, ArrowLeft, Filter, Sparkles, Building2, Briefcase, FileCheck, Search } from 'lucide-react';

interface RecruitmentSoftwarePageProps {
  onBackToHome: () => void;
  onBookDemo: (moduleTitle?: string) => void;
  onStartTrial: () => void;
}

export const RecruitmentSoftwarePage: React.FC<RecruitmentSoftwarePageProps> = ({
  onBackToHome,
  onBookDemo,
  onStartTrial
}) => {
  const [pipelineStage, setPipelineStage] = useState<'Applied' | 'Screened' | 'Interview' | 'Offered'>('Screened');

  const candidates = [
    { name: 'Dr. Alistair Vance', role: 'Clinical Lead RGN', experience: '8 Yrs NHS Exp.', stage: 'Interview', score: '98% Match', status: 'DBS Verified' },
    { name: 'Hannah Wright', role: 'Senior Care Assistant', experience: '5 Yrs NVQ L3', stage: 'Offered', score: '94% Match', status: 'Right-to-Work OK' },
    { name: 'Marcus Bell', role: 'Domiciliary Carer', experience: '3 Yrs Care Exp.', stage: 'Screened', score: '89% Match', status: 'Checking References' },
    { name: 'Priya Sharma', role: 'Registered Nurse (RGN)', experience: '6 Yrs Clinical', stage: 'Applied', score: '96% Match', status: 'New Application' }
  ];

  const filteredCandidates = candidates.filter(c => c.stage === pipelineStage);

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
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-700">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>Product Module: Recruitment Software & ATS</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="py-12 lg:py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <UserPlus className="w-3.5 h-3.5" /> Healthcare ATS & Candidate Sourcing
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Fill Healthcare Roles 60% Faster With Smart ATS Automation
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              Post care home and clinical vacancies to 10+ UK job boards with 1 click. Screen candidates with automated license checks, manage interviews, and convert hires into active profiles instantly.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onBookDemo('Recruitment Software')}
                className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors shadow-2xs flex items-center gap-2"
              >
                Book ATS Demo <ArrowRight className="w-4 h-4 text-slate-300" />
              </button>
              <button
                onClick={onStartTrial}
                className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-900 font-semibold text-xs rounded-lg border border-slate-200 shadow-2xs transition-colors"
              >
                Start 14-Day Free Trial
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Candidate Pipeline Simulator */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Live ATS Pipeline Simulator</span>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">Interactive Recruitment Pipeline</h2>
          <p className="text-xs text-slate-600 mt-1">Click through stages to see candidate screening and scorecards in action.</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 space-y-6">
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl text-xs font-semibold border border-slate-200">
            {(['Applied', 'Screened', 'Interview', 'Offered'] as const).map(stage => (
              <button
                key={stage}
                onClick={() => setPipelineStage(stage)}
                className={`flex-1 py-2 rounded-lg transition-all ${
                  pipelineStage === stage ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {stage} Stage
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCandidates.map((c, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900">{c.name}</h4>
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">{c.score}</span>
                </div>
                <div className="text-xs text-slate-600 font-medium">{c.role} • {c.experience}</div>
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> {c.status}
                  </span>
                  <button
                    onClick={() => onBookDemo(`Candidate: ${c.name}`)}
                    className="text-slate-900 hover:underline font-bold"
                  >
                    View Scorecard &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
