import React, { useState } from 'react';
import { Play, ArrowRight, ShieldCheck, CheckCircle2, Sparkles, Building2, UserPlus, HeartPulse, Users, BarChart3, RefreshCw, Zap } from 'lucide-react';
import { UserRole } from '../types';
import { CLIENT_LOGOS } from '../data/mockData';

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
  const [mockView, setMockView] = useState<'overview' | 'care' | 'staffing' | 'recruitment'>('overview');
  const headline = "Recruit, Care, Staff, and Manage — All in One Platform";

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-white text-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Badge & Headline */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-4xl mx-auto mb-8">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Unified Healthcare Operating System</span>
            <span className="text-slate-300">•</span>
            <span className="text-emerald-700 font-bold">UK CQC Compliant</span>
          </div>

          {/* Main H1 */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.08] font-['Plus_Jakarta_Sans',sans-serif]">
            Recruit, Care, Staff, and Manage — <span className="text-slate-900 underline decoration-emerald-500/60 decoration-wavy decoration-2">All in One Platform</span>
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
            <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> CQC Compliant
            </span>
            <span className="flex items-center gap-1.5 text-slate-700">
              <ShieldCheck className="w-4 h-4 text-slate-900" /> GDPR Secure
            </span>
            <span className="flex items-center gap-1.5 text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> ISO 27001 Certified
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
                { id: 'overview', label: 'Ecosystem View', icon: RefreshCw },
                { id: 'recruitment', label: 'Recruitment', icon: UserPlus },
                { id: 'care', label: 'Care & eMAR', icon: HeartPulse },
                { id: 'staffing', label: 'Locum Rota', icon: Users }
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

            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-emerald-700 font-mono text-[11px] font-bold">4 Modules Synced</span>
            </div>
          </div>

          {/* Dynamic Interactive Visual Panel */}
          <div className="p-4 sm:p-6 bg-slate-50/50 min-h-[340px] flex flex-col justify-between relative">
            
            {/* View 1: Overview Unified Data Flow */}
            {mockView === 'overview' && (
              <div className="space-y-6 relative z-10 animate-fade-in">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  
                  <div 
                    onClick={() => onOpenModule('recruitment')}
                    className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md cursor-pointer transition-all group"
                  >
                    <div className="flex items-center justify-between text-xs text-slate-700 mb-1">
                      <span className="font-bold flex items-center gap-1 text-slate-900">
                        <UserPlus className="w-3.5 h-3.5 text-blue-600" /> 1. Recruitment
                      </span>
                      <span className="text-[10px] bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded-full border border-blue-200">Live ATS</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-900">12 Hired</div>
                    <div className="text-[11px] text-slate-500">Auto-onboarded to Rota</div>
                  </div>

                  <div 
                    onClick={() => onOpenModule('locums-staffing')}
                    className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md cursor-pointer transition-all group"
                  >
                    <div className="flex items-center justify-between text-xs text-slate-700 mb-1">
                      <span className="font-bold flex items-center gap-1 text-slate-900">
                        <Users className="w-3.5 h-3.5 text-violet-600" /> 2. Staffing Rota
                      </span>
                      <span className="text-[10px] bg-violet-50 text-violet-700 font-semibold px-2 py-0.5 rounded-full border border-violet-200">GPS Active</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-900">98% Filled</div>
                    <div className="text-[11px] text-slate-500">2 Locums Matched</div>
                  </div>

                  <div 
                    onClick={() => onOpenModule('care-management')}
                    className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md cursor-pointer transition-all group"
                  >
                    <div className="flex items-center justify-between text-xs text-slate-700 mb-1">
                      <span className="font-bold flex items-center gap-1 text-slate-900">
                        <HeartPulse className="w-3.5 h-3.5 text-emerald-600" /> 3. Care & eMAR
                      </span>
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-full border border-emerald-200">CQC Ready</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-900">142 Logs</div>
                    <div className="text-[11px] text-slate-500">0 eMAR Misses</div>
                  </div>

                  <div 
                    onClick={() => onOpenModule('facility-management')}
                    className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md cursor-pointer transition-all group"
                  >
                    <div className="flex items-center justify-between text-xs text-slate-700 mb-1">
                      <span className="font-bold flex items-center gap-1 text-slate-900">
                        <Building2 className="w-3.5 h-3.5 text-amber-600" /> 4. Operations
                      </span>
                      <span className="text-[10px] bg-amber-50 text-amber-700 font-semibold px-2 py-0.5 rounded-full border border-amber-200">Sage Sync</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-900">100% Audit</div>
                    <div className="text-[11px] text-slate-500">Payroll Auto-Calc</div>
                  </div>
                </div>

                {/* Animated Data Pipeline Flow Graph */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm relative">
                  <div className="text-xs font-semibold text-slate-700 mb-2.5 flex items-center justify-between">
                    <span>Live Cross-Module Data Stream</span>
                    <span className="text-emerald-700 font-mono text-[10px] font-bold">Zero Re-keying • Instant Sync</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 w-full sm:w-auto text-center sm:text-left">
                      <div className="font-bold text-slate-900">Applicant Accepted</div>
                      <div className="text-[10px] text-slate-500">DBS & NMC verified</div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 rotate-90 sm:rotate-0" />

                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 w-full sm:w-auto text-center sm:text-left">
                      <div className="font-bold text-slate-900">Assigned Shift 07:00</div>
                      <div className="text-[10px] text-slate-500">GPS mobile check-in</div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 rotate-90 sm:rotate-0" />

                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 w-full sm:w-auto text-center sm:text-left">
                      <div className="font-bold text-slate-900">eMAR & Care Notes</div>
                      <div className="text-[10px] text-slate-500">Voice log synced</div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 rotate-90 sm:rotate-0" />

                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 w-full sm:w-auto text-center sm:text-left">
                      <div className="font-bold text-slate-900">Billing & Payroll</div>
                      <div className="text-[10px] text-slate-500">Invoiced to council</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* View 2: Recruitment Software Preview */}
            {mockView === 'recruitment' && (
              <div className="space-y-4 relative z-10 animate-fade-in">
                <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2">
                    <UserPlus className="w-5 h-5 text-blue-600" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Active Recruitment Pipeline: Registered Nurse (RGN)</h4>
                      <p className="text-xs text-slate-500">Multi-posted to Indeed, Reed, NHS Jobs & TotalJobs</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => onOpenModule('recruitment')}
                    className="px-3 py-1 bg-slate-900 text-white text-xs font-semibold rounded-md hover:bg-slate-800 transition-all"
                  >
                    Explore Module →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <div className="font-bold text-slate-800 mb-2 flex justify-between">
                      <span>Applied (14)</span>
                      <span className="text-blue-600 font-semibold">Auto-Filtered</span>
                    </div>
                    <div className="space-y-2">
                      <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="font-semibold text-slate-900">Sarah Jenkins, RGN</div>
                        <div className="text-[10px] text-slate-500">NMC Pin Active • 5 Yrs Exp</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <div className="font-bold text-slate-800 mb-2 flex justify-between">
                      <span>Interviewed (4)</span>
                      <span className="text-emerald-600 font-semibold">Scorecards Ready</span>
                    </div>
                    <div className="space-y-2">
                      <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="font-semibold text-slate-900">David Ross, Senior Carer</div>
                        <div className="text-[10px] text-emerald-700 font-bold">Passed Clinical Interview</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-emerald-300">
                    <div className="font-bold text-emerald-800 mb-2 flex justify-between">
                      <span>Hired & Onboarded (2)</span>
                      <span className="text-emerald-700 font-semibold">Synced to Rota</span>
                    </div>
                    <div className="p-2 bg-emerald-50/60 rounded-lg border border-emerald-200">
                      <div className="font-semibold text-slate-900">Amira Patel, RGN</div>
                      <div className="text-[10px] text-emerald-700 font-semibold">DBS Cleared • Added to Rota</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* View 3: Care & eMAR Preview */}
            {mockView === 'care' && (
              <div className="space-y-4 relative z-10 animate-fade-in">
                <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2">
                    <HeartPulse className="w-5 h-5 text-emerald-600" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Digital Service User Records & eMAR Live Log</h4>
                      <p className="text-xs text-slate-500">Room 14 - Resident Arthur Pendelton (High Risk Fall Protocol)</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => onOpenModule('care-management')}
                    className="px-3 py-1 bg-slate-900 text-white text-xs font-semibold rounded-md hover:bg-slate-800 transition-all"
                  >
                    Explore Module →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                    <div className="font-bold text-slate-800 flex items-center justify-between">
                      <span>eMAR Medication Round</span>
                      <span className="text-[10px] bg-emerald-50 px-2 py-0.5 rounded-full text-emerald-700 border border-emerald-200 font-semibold">08:00 AM Complete</span>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-slate-900">Paracetamol 500mg</div>
                        <div className="text-[10px] text-slate-500">2 Tablets • Oral</div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                        Administered & Signed
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                    <div className="font-bold text-slate-800 flex items-center justify-between">
                      <span>Voice Care Log Dictation</span>
                      <span className="text-[10px] bg-blue-50 px-2 py-0.5 rounded-full text-blue-700 border border-blue-200 font-semibold">AI Transcribed</span>
                    </div>
                    <p className="p-2 bg-slate-50 rounded-lg border border-slate-200 text-slate-700 italic text-[11px]">
                      "Resident enjoyed breakfast in the garden. Hydration levels monitored at 450ml. Mood bright."
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* View 4: Locum Rota Preview */}
            {mockView === 'staffing' && (
              <div className="space-y-4 relative z-10 animate-fade-in">
                <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-violet-600" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Smart Rota & Locum Shift Match Engine</h4>
                      <p className="text-xs text-slate-500">Emergency Night Shift Broadcast - Filled in 11 minutes</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => onOpenModule('locums-staffing')}
                    className="px-3 py-1 bg-slate-900 text-white text-xs font-semibold rounded-md hover:bg-slate-800 transition-all"
                  >
                    Explore Module →
                  </button>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <div>
                      <div className="font-bold text-slate-900 flex items-center gap-2">
                        <span>Night Nurse (RGN) - Shift 20:00 - 08:00</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">Shift Matched</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Assigned to: Nurse Hannah Vance (5.0 ★ Rating) • GPS Verified</div>
                    </div>
                    <span className="font-mono text-sm font-bold text-slate-900">£38.50/hr</span>
                  </div>
                </div>
              </div>
            )}

            {/* Mockup Bottom Status Bar */}
            <div className="mt-4 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
              <span className="flex items-center gap-1.5 font-medium">
                <Zap className="w-3.5 h-3.5 text-emerald-600" /> 
                <span>One Source of Truth across Recruitment, Care, Staffing & Facility Portal</span>
              </span>
              <button 
                onClick={onBookDemo}
                className="text-slate-900 hover:text-emerald-700 font-bold underline flex items-center gap-1 text-[11px]"
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
