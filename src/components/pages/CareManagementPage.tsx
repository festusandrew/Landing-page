import React, { useState } from 'react';
import { HeartPulse, CheckCircle2, ArrowRight, ArrowLeft, Shield, AlertTriangle, Pill, Activity, FileText } from 'lucide-react';

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
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>Product Module: Care Management & eMAR</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="py-12 lg:py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider">
              <HeartPulse className="w-3.5 h-3.5" /> Clinical Records & CQC Audit Readiness
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Safer Digital Care Plans, Electronic Medication & Vitals Tracking
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              Eliminate paper care records with real-time digital care plans, electronic medication administration (eMAR), automated dosage alerts, and 1-click CQC audit reports.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onBookDemo('Care Management Software')}
                className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors shadow-2xs flex items-center gap-2"
              >
                Book Care Software Demo <ArrowRight className="w-4 h-4 text-slate-300" />
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

      {/* eMAR & Clinical Simulator */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Live eMAR Simulator</span>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">Interactive Medication Administration Pass</h2>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 space-y-6">
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl text-xs font-semibold border border-slate-200">
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
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-emerald-100 text-emerald-800">
                    <Pill className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">Paracetamol 500mg (2x Tablets)</div>
                    <div className="text-xs text-slate-500">Resident: Eleanor Vance (Room 12B) • Morning Pass (08:00)</div>
                  </div>
                </div>
                <span className="px-3 py-1 bg-emerald-600 text-white font-bold text-xs rounded-md">Administered & Synced</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
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
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="text-sm font-bold text-slate-900">Personalized Mobility & Dietary Plan</h4>
              <p className="text-xs text-slate-600">Requires 2-person assistance for transfer. Low-sodium diet prescribed by NHS GP.</p>
              <div className="pt-2 text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Reviewed by Clinical Nurse Manager (20 Jul 2026)
              </div>
            </div>
          )}

          {activeTab === 'Vitals & Logs' && (
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-slate-500">Blood Pressure</div>
                <div className="text-lg font-bold text-slate-900">120/80 mmHg</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-slate-500">Oxygen Saturation</div>
                <div className="text-lg font-bold text-slate-900">98% SpO2</div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
