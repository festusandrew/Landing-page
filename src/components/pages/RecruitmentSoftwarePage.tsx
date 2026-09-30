import React, { useState } from 'react';
import { UserPlus, CheckCircle2, ArrowRight, ArrowLeft, Building2, Star, Play, LayoutDashboard, Rocket, Users, FileCheck, BarChart3 } from 'lucide-react';
import recruitmentDashboard from '../../imports/Screenshot_2026-07-24_140138.png';

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
    { name: 'Alistair Vance', role: 'Senior Software Engineer', experience: '8 Yrs Full-Stack', stage: 'Interview', score: '98% Match', status: 'ID Verified' },
    { name: 'Hannah Wright', role: 'Retail Store Manager', experience: '5 Yrs Multi-site', stage: 'Offered', score: '94% Match', status: 'Right-to-Work OK' },
    { name: 'Marcus Bell', role: 'Financial Analyst', experience: '3 Yrs Fintech', stage: 'Screened', score: '89% Match', status: 'Checking References' },
    { name: 'Priya Sharma', role: 'Registered Nurse (RGN)', experience: '6 Yrs Clinical', stage: 'Applied', score: '96% Match', status: 'New Application' }
  ];

  const filteredCandidates = candidates.filter(c => c.stage === pipelineStage);

  const dashboardFeatures = [
    {
      icon: Rocket,
      title: '1-click multi-board posting',
      desc: 'Publish vacancies to 10+ job boards at once — from tech and retail to finance and healthcare — and watch applications land in a single inbox.'
    },
    {
      icon: Users,
      title: 'Visual candidate pipeline',
      desc: 'Drag candidates through Applied, Screened, Interview and Offered stages with match scores updating in real time.'
    },
    {
      icon: FileCheck,
      title: 'Automated screening & checks',
      desc: 'ID, right-to-work and reference checks run automatically so every hire is compliant and onboard-ready before day one.'
    },
    {
      icon: BarChart3,
      title: 'Hiring analytics at a glance',
      desc: 'Track applications, time-to-hire and active jobs from the dashboard — and auto-onboard new hires into your team.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-20 pb-16 animate-fade-in font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Header */}
      <div className="bg-white border-b border-black/10 py-3 sticky top-16 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Overview
          </button>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-700">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>Recruitment Dashboard Live (24 active jobs)</span>
          </div>
        </div>
      </div>

      {/* HERO — Dashboard-led landing */}
      <section className="py-14 lg:py-20 bg-white border-b border-black/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <LayoutDashboard className="w-3.5 h-3.5" /> The Recruitment Dashboard
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.08]">
              Hire great people 60% faster
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl">
              Post to 10+ job boards in one click, screen candidates with automated checks, and manage your whole hiring pipeline from a single dashboard — for any role, in any industry, then auto-onboard new hires straight into your team.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => onBookDemo('Recruitment Software')}
                className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-lg transition-colors shadow-xs flex items-center gap-2"
              >
                Book a Dashboard Demo <ArrowRight className="w-4 h-4 text-slate-300" />
              </button>
              <button
                onClick={onStartTrial}
                className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-900 font-semibold text-sm rounded-lg border border-black/10 shadow-2xs transition-colors flex items-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-current" /> Start 14-Day Free Trial
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 text-xs text-slate-600 font-medium">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-blue-600" /> 10+ job boards</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-blue-600" /> Automated screening</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-blue-600" /> Any industry</span>
            </div>
          </div>

          {/* Dashboard screenshot in browser frame */}
          <div className="relative max-w-5xl mx-auto mt-12">
            <div className="rounded-2xl bg-white border border-black/10 shadow-sm overflow-hidden">
              <div className="bg-slate-50 px-4 py-3 border-b border-black/10 flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-slate-300" />
                  <div className="w-3 h-3 rounded-full bg-slate-300" />
                  <div className="w-3 h-3 rounded-full bg-slate-300" />
                </div>
                <span className="text-xs font-mono text-slate-500 ml-2 hidden sm:inline">mployus.cloud/recruitment/dashboard</span>
              </div>
              <img
                src={recruitmentDashboard}
                alt="MployUs recruitment dashboard showing hiring overview, active jobs, applicant counts and team activity"
                className="w-full object-cover object-top"
              />
            </div>
            {/* Floating stat callout */}
            <div className="hidden sm:flex absolute -bottom-5 -left-5 items-center gap-3 bg-white border border-black/10 rounded-xl shadow-sm px-4 py-3">
              <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center">
                <Rocket className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-sm font-extrabold text-slate-900">60% faster</div>
                <div className="text-[11px] text-slate-500 font-medium">Time to hire</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '60%', label: 'Faster time to hire' },
            { value: '10+', label: 'Job boards, 1 click' },
            { value: '1,847', label: 'Candidates managed' },
            { value: '100%', label: 'Compliant hires' }
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl sm:text-4xl font-extrabold text-white">{stat.value}</div>
              <div className="text-[11px] sm:text-xs text-slate-400 font-medium mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Dashboard feature highlights */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Inside the dashboard</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2">
            Your entire hiring funnel, on one screen
          </h2>
          <p className="text-slate-600 text-sm mt-3">
            From job posting to signed offer, the recruitment dashboard keeps sourcing, screening and compliance in one place — for teams in every industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {dashboardFeatures.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="p-6 rounded-2xl bg-white border border-black/10 shadow-2xs space-y-3">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">{f.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Candidate Pipeline Simulator */}
      <section className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Try it live</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Move a candidate through the pipeline</h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">Click through the stages to see candidate screening and match scorecards exactly as they appear in the dashboard.</p>
        </div>

        <div className="bg-white rounded-2xl border border-black/10 shadow-xs p-6 space-y-6">
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl text-xs font-semibold border border-black/10">
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
              <div key={i} className="p-4 rounded-xl bg-slate-50 border border-black/10 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900">{c.name}</h4>
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">{c.score}</span>
                </div>
                <div className="text-xs text-slate-600 font-medium">{c.role} • {c.experience}</div>
                <div className="pt-2 border-t border-black/10 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1 text-blue-700 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> {c.status}
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

        {/* Testimonial */}
        <div className="p-8 rounded-2xl bg-white border border-black/10 shadow-2xs text-center max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
          </div>
          <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed">
            "We hire across engineering, retail and finance, and this replaced three separate tools. Posting to every job board at once and having checks run themselves means our managers actually spend time with candidates, not spreadsheets."
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
            <Building2 className="w-4 h-4 text-slate-400" />
            <span className="font-semibold text-slate-700">Jane Doe</span> · Head of Talent, Northwind Group
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-8 rounded-2xl bg-slate-900 text-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-2">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Ready to hire faster?</span>
            <h3 className="text-2xl font-bold text-white">Start filling roles in minutes</h3>
            <p className="text-xs text-slate-300">Set up your recruitment dashboard today with zero upfront setup fees.</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onBookDemo('Recruitment Software')}
              className="px-6 py-3 bg-white text-slate-900 font-semibold text-xs rounded-md hover:bg-slate-100 transition-colors shadow-2xs"
            >
              Book Dashboard Demo
            </button>
            <button
              onClick={onBackToHome}
              className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-md border border-slate-700 transition-colors"
            >
              Back to Overview
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
