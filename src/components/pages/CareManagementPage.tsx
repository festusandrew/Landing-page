import React, { useState } from 'react';
import { HeartPulse, CheckCircle2, ArrowRight, ArrowLeft, Pill, Star, Play, LayoutDashboard, ShieldCheck, Activity, FileText, ClipboardList, Building2 } from 'lucide-react';
import careDashboard from '../../imports/Screenshot_2026-07-24_140316.png';

interface CareManagementPageProps {
  onBackToHome: () => void;
  onBookDemo: (moduleTitle?: string) => void;
  onStartTrial: () => void;
}

export const CareManagementPage: React.FC<CareManagementPageProps> = ({
  onBackToHome,
  onBookDemo,
  onStartTrial
}) => {
  const [activeTab, setActiveTab] = useState<'eMAR' | 'Care Plans' | 'Vitals & Logs'>('eMAR');

  const dashboardFeatures = [
    {
      icon: Pill,
      title: 'Electronic MAR charts',
      desc: 'Record every medication pass with automated dosage alerts and a full audit trail — zero missed eMAR entries.'
    },
    {
      icon: ClipboardList,
      title: 'Digital care plans',
      desc: 'Person-centred care plans with review reminders, so nothing goes overdue and every change is time-stamped.'
    },
    {
      icon: Activity,
      title: 'Vitals & mood trends',
      desc: 'Track blood pressure, SpO2 and service-user wellbeing over time, surfaced right on the dashboard.'
    },
    {
      icon: ShieldCheck,
      title: '1-click CQC audit reports',
      desc: 'Compliance alerts and instant inspection-ready exports keep you audit-ready without the paperwork scramble.'
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
            <span>Care Dashboard Live (0 eMAR misses)</span>
          </div>
        </div>
      </div>

      {/* HERO — Dashboard-led landing */}
      <section className="py-14 lg:py-20 bg-white border-b border-black/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <LayoutDashboard className="w-3.5 h-3.5" /> The Care Management Dashboard
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.08]">
              Safer digital care, from one dashboard
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl">
              Replace paper records with real-time care plans, electronic medication administration (eMAR), vitals tracking and automated dosage alerts — with 1-click CQC audit reports whenever inspectors call.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => onBookDemo('Care Management Software')}
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
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-blue-600" /> eMAR & clinical records</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-blue-600" /> CQC audit-ready</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-blue-600" /> GDPR secure</span>
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
                <span className="text-xs font-mono text-slate-500 ml-2 hidden sm:inline">mployus.cloud/care/dashboard</span>
              </div>
              <img
                src={careDashboard}
                alt="MployUs care management dashboard showing care hours, shift coverage, mood trends, alerts and CQC compliance"
                className="w-full object-cover object-top"
              />
            </div>
            {/* Floating stat callout */}
            <div className="hidden sm:flex absolute -bottom-5 -left-5 items-center gap-3 bg-white border border-black/10 rounded-xl shadow-sm px-4 py-3">
              <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-sm font-extrabold text-slate-900">0 misses</div>
                <div className="text-[11px] text-slate-500 font-medium">eMAR entries</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '0', label: 'Missed eMAR entries' },
            { value: '148', label: 'Care hours logged / week' },
            { value: '85%', label: 'Shift coverage rate' },
            { value: '1-click', label: 'CQC audit reports' }
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
            Every resident record, in one place
          </h2>
          <p className="text-slate-600 text-sm mt-3">
            Medication, care plans, vitals and compliance come together so your team spends less time on paperwork and more on care.
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

      {/* eMAR & Clinical Simulator */}
      <section className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Try it live</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Run a medication pass</h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">Switch between eMAR, care plans and vitals to see how clinical records are captured inside the dashboard.</p>
        </div>

        <div className="bg-white rounded-2xl border border-black/10 shadow-xs p-6 space-y-6">
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl text-xs font-semibold border border-black/10">
            {(['eMAR', 'Care Plans', 'Vitals & Logs'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 rounded-lg transition-all ${
                  activeTab === tab ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'eMAR' && (
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-50 border border-black/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-blue-100 text-blue-800">
                    <Pill className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">Paracetamol 500mg (2x Tablets)</div>
                    <div className="text-xs text-slate-500">Resident: Eleanor Vance (Room 12B) • Morning Pass (08:00)</div>
                  </div>
                </div>
                <span className="px-3 py-1 bg-blue-600 text-white font-bold text-xs rounded-md">Administered & Synced</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-black/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-amber-100 text-amber-800">
                    <Pill className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">Amlodipine 5mg (1x Tablet)</div>
                    <div className="text-xs text-slate-500">Resident: Arthur Pendelton (Room 04A) • Due at 12:00</div>
                  </div>
                </div>
                <button
                  onClick={() => onBookDemo('eMAR Pass Action')}
                  className="px-3 py-1 bg-slate-900 text-white font-semibold text-xs rounded-md"
                >
                  Record Admin Pass
                </button>
              </div>
            </div>
          )}

          {activeTab === 'Care Plans' && (
            <div className="p-4 rounded-xl bg-slate-50 border border-black/10 space-y-2">
              <h4 className="text-sm font-bold text-slate-900">Personalized Mobility & Dietary Plan</h4>
              <p className="text-xs text-slate-600">Requires 2-person assistance for transfer. Low-sodium diet prescribed by NHS GP.</p>
              <div className="pt-2 text-[11px] text-blue-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Reviewed by Clinical Nurse Manager (20 Jul 2026)
              </div>
            </div>
          )}

          {activeTab === 'Vitals & Logs' && (
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-black/10">
                <div className="text-slate-500">Blood Pressure</div>
                <div className="text-lg font-bold text-slate-900">120/80 mmHg</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-black/10">
                <div className="text-slate-500">Oxygen Saturation</div>
                <div className="text-lg font-bold text-slate-900">98% SpO2</div>
              </div>
            </div>
          )}
        </div>

        {/* Testimonial */}
        <div className="p-8 rounded-2xl bg-white border border-black/10 shadow-2xs text-center max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
          </div>
          <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed">
            "Our last CQC inspection took an afternoon instead of a fortnight. Every medication pass, care plan review and incident is right there on the dashboard — and we haven't missed an eMAR entry since we switched."
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
            <Building2 className="w-4 h-4 text-slate-400" />
            <span className="font-semibold text-slate-700">Admin Manager</span> · Riverside Care Group, Bristol
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-8 rounded-2xl bg-slate-900 text-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-2">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Ready to go paperless?</span>
            <h3 className="text-2xl font-bold text-white">Digitise your care records in days</h3>
            <p className="text-xs text-slate-300">Set up your care dashboard today with zero upfront setup fees.</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onBookDemo('Care Management Software')}
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
