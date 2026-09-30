import React, { useState } from 'react';
import { Play, ArrowRight, ShieldCheck, CheckCircle2, Building2, UserPlus, HeartPulse, Users, BarChart3, RefreshCw, Zap } from 'lucide-react';
import { UserRole } from '../types';
import { CLIENT_LOGOS } from '../data/mockData';
import recruitmentDashboard from '../imports/Screenshot_2026-07-24_140138.png';
import careDashboard from '../imports/Screenshot_2026-07-24_140316.png';
import staffingDashboard from '../imports/Screenshot_2026-07-24_140350.png';

interface HeroProps {
  activeRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onBookDemo: () => void;
  onStartTrial: () => void;
  onWatchVideo: () => void;
  onOpenModule: (modId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  activeRole,
  onRoleChange,
  onBookDemo,
  onStartTrial,
  onWatchVideo,
  onOpenModule
}) => {
  const [mockView, setMockView] = useState<'care' | 'staffing' | 'recruitment'>('staffing');
  const headline = "Recruit, Care, Staff, and Manage — All in One Platform";

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-white text-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Badge & Headline */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-4xl mx-auto mb-8">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold shadow-xs">
            
            <span>Unified Healthcare Operating System</span>
            <span className="text-slate-300">•</span>
            <span className="text-blue-700 font-bold">UK CQC Compliant</span>
          </div>

          {/* Main H1 */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.08] font-['Plus_Jakarta_Sans',sans-serif]">
            Recruit, Care, Staff, and Manage — <span className="text-slate-900">All in One Platform</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-3xl">
            Connect recruitment, care delivery, staffing operations, and facility management into a unified ecosystem. <strong className="text-slate-900 font-semibold">Reduce admin by 60%</strong>, fill shifts in hours, and deliver exceptional care.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              onClick={onBookDemo}
              className="px-7 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm sm:text-base rounded-md shadow-sm transition-colors flex items-center gap-2 active:scale-95"
            >
              Book a Demo <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            <button
              onClick={onStartTrial}
              className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-900 font-semibold text-sm sm:text-base rounded-md border border-slate-200 transition-colors"
            >
              Start Free Trial
            </button>

            <button
              onClick={onWatchVideo}
              className="px-5 py-3.5 text-slate-700 hover:text-slate-900 font-semibold text-sm sm:text-base flex items-center gap-2 group transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 text-slate-900 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </div>
              <span>Watch 2-Min Overview</span>
            </button>
          </div>

          {/* Key Trust Micro-Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2 text-xs text-slate-600 font-medium">
            <span className="flex items-center gap-1.5 text-blue-700 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-blue-600" /> CQC Compliant
            </span>
            <span className="flex items-center gap-1.5 text-slate-700">
              <ShieldCheck className="w-4 h-4 text-slate-900" /> GDPR Secure
            </span>
            <span className="flex items-center gap-1.5 text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-blue-600" /> ISO 27001 Certified
            </span>
          </div>
        </div>

        {/* HERO INTERACTIVE DASHBOARD MOCKUP */}
        <div className="relative max-w-5xl mx-auto rounded-2xl bg-white border border-slate-200/90 shadow-xl overflow-hidden mt-6">
          
          {/* Mockup Top Window Header */}
          <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-slate-300" />
                <div className="w-3 h-3 rounded-full bg-slate-300" />
                <div className="w-3 h-3 rounded-full bg-slate-300" />
              </div>
              <span className="text-xs font-mono text-slate-500 ml-2 hidden sm:inline">mployus.cloud/workspace/live-sync</span>
            </div>

            {/* Interactive View Toggles (Cal.com nav-pill-group) */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full border border-slate-200 text-xs">
              {[
                { id: 'staffing', label: 'Locum Rota', icon: Users },
                { id: 'recruitment', label: 'Recruitment', icon: UserPlus },
                { id: 'care', label: 'Care & eMAR', icon: HeartPulse }
              ].map((v) => {
                const Icon = v.icon;
                const isActive = mockView === v.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => setMockView(v.id as any)}
                    className={`px-3 py-1 rounded-full font-semibold flex items-center gap-1.5 transition-all text-xs ${
                      isActive
                        ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{v.label}</span>
                  </button>
                );
              })}
            </div>

            
          </div>

          {/* Dynamic Interactive Visual Panel */}
          <div className="p-4 sm:p-6 bg-slate-50/50 min-h-[520px] flex flex-col justify-between relative">


            {/* View 2: Recruitment Dashboard Snapshot */}
            {mockView === 'recruitment' && (
              <div className="space-y-3 relative z-10">
                <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2">
                    <UserPlus className="w-5 h-5 text-blue-600" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Recruitment Pipeline Dashboard</h4>
                      <p className="text-xs text-slate-500">Application trends, ATS pipeline & hiring analytics</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onOpenModule('recruitment')}
                    className="px-3 py-1 bg-slate-900 text-white text-xs font-semibold rounded-md hover:bg-slate-800 transition-all"
                  >
                    Explore Module →
                  </button>
                </div>
                <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                  <img
                    src={recruitmentDashboard}
                    alt="Recruitment dashboard showing application trends and hiring metrics"
                    className="w-full object-cover object-top"
                    style={{ maxHeight: 420 }}
                  />
                </div>
              </div>
            )}

            {/* View 3: Care Management Dashboard Snapshot */}
            {mockView === 'care' && (
              <div className="space-y-3 relative z-10">
                <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2">
                    <HeartPulse className="w-5 h-5 text-blue-600" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Care Management & eMAR Analytics</h4>
                      <p className="text-xs text-slate-500">Resident outcomes, medication logs & CQC compliance tracking</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onOpenModule('care-management')}
                    className="px-3 py-1 bg-slate-900 text-white text-xs font-semibold rounded-md hover:bg-slate-800 transition-all"
                  >
                    Explore Module →
                  </button>
                </div>
                <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                  <img
                    src={careDashboard}
                    alt="Care management dashboard with care hours, shift coverage and CQC compliance metrics"
                    className="w-full object-cover object-top"
                    style={{ maxHeight: 420 }}
                  />
                </div>
              </div>
            )}

            {/* View 4: Locum Rota Dashboard Snapshot */}
            {mockView === 'staffing' && (
              <div className="space-y-3 relative z-10">
                <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-violet-600" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Locum Rota & Shift Management</h4>
                      <p className="text-xs text-slate-500">Live shift matching, GPS check-in & workforce scheduling</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onOpenModule('locums-staffing')}
                    className="px-3 py-1 bg-slate-900 text-white text-xs font-semibold rounded-md hover:bg-slate-800 transition-all"
                  >
                    Explore Module →
                  </button>
                </div>
                <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                  <img
                    src={staffingDashboard}
                    alt="Locum rota dashboard showing active shifts, fill rate and shift matching"
                    className="w-full object-cover object-top"
                    style={{ maxHeight: 420 }}
                  />
                </div>
              </div>
            )}

            {/* Mockup Bottom Status Bar */}
            <div className="mt-4 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
              <span className="flex items-center gap-1.5 font-medium">
                <Zap className="w-3.5 h-3.5 text-blue-600" /> 
                <span>One Source of Truth across Recruitment, Care, Staffing & Facility Portal</span>
              </span>
              <button 
                onClick={onBookDemo}
                className="text-slate-900 hover:text-blue-700 font-bold underline flex items-center gap-1 text-[11px]"
              >
                Schedule Interactive Workspace Walkthrough →
              </button>
            </div>
          </div>
        </div>

        {/* TRUST LOGOS CLOUD */}
        <div className="mt-16 pt-8 border-t border-slate-200/80 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-6">
            Trusted by 500+ Leading Care Homes, Facilities & Recruitment Agencies Across the UK
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 text-slate-700">
            {CLIENT_LOGOS.map((logo, idx) => (
              <div key={idx} className="flex items-center gap-2 text-slate-700 font-bold text-sm tracking-wide hover:text-slate-900 transition-colors">
                <Building2 className="w-4 h-4 text-slate-400" />
                <span>{logo.logoText}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
