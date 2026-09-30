import React, { useState } from 'react';
import { Unplug, FileSpreadsheet, EyeOff, CheckCircle2, XCircle, ArrowRight, AlertTriangle, ShieldCheck } from 'lucide-react';

interface ProblemStatementProps {
  onBookDemo: () => void;
}

export const ProblemStatement: React.FC<ProblemStatementProps> = ({ onBookDemo }) => {
  const [activeTab, setActiveTab] = useState<'problem' | 'solution'>('problem');

  return (
    <section className="py-20 bg-slate-50 text-slate-900 relative overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-semibold uppercase tracking-wider mb-3">
            The Operational Challenge
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Healthcare Operations Shouldn't Be This Fragmented
          </h2>
          <p className="text-slate-600 text-base mt-3">
            Juggling standalone tools creates expensive compliance blind spots, burnt-out care managers, and endless paper logs.
          </p>

          {/* Interactive Contrast Switcher (Cal.com nav-pill-group) */}
          <div className="inline-flex p-1 bg-slate-200/80 border border-slate-300 rounded-full mt-6">
            <button
              onClick={() => setActiveTab('problem')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'problem' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              Fragmented Point Solutions
            </button>
            <button
              onClick={() => setActiveTab('solution')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'solution' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Unified MployUS Platform
            </button>
          </div>
        </div>

        {/* 3-Column Pain Points */}
        {activeTab === 'problem' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
            
            {/* Pain 1 */}
            <div className="p-6 sm:p-8 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all group relative">
              <div className="w-11 h-11 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mb-4">
                <Unplug className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Disconnected Systems</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Your recruitment tool doesn't talk to your care software. Your staffing app lives in isolation. Every handoff requires duplicate data entry and creates compliance gaps.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-amber-700 font-semibold flex items-center gap-1.5">
                <XCircle className="w-4 h-4 shrink-0" /> High risk of lost candidate & care data
              </div>
            </div>

            {/* Pain 2 */}
            <div className="p-6 sm:p-8 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all group relative">
              <div className="w-11 h-11 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mb-4">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Manual Processes</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Job postings to 10 boards take hours. Shift schedules are built in spreadsheets. Medication records still live on paper. Your team spends more time on admin than care.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-amber-700 font-semibold flex items-center gap-1.5">
                <XCircle className="w-4 h-4 shrink-0" /> 15+ hours lost per manager every week
              </div>
            </div>

            {/* Pain 3 */}
            <div className="p-6 sm:p-8 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all group relative">
              <div className="w-11 h-11 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mb-4">
                <EyeOff className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Poor Visibility</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                You can't see which job boards deliver quality hires. Care managers don't know who's clocking in. Finance can't track costs in real-time. Decisions are made blind.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-amber-700 font-semibold flex items-center gap-1.5">
                <XCircle className="w-4 h-4 shrink-0" /> Stressful CQC audit preparation
              </div>
            </div>

          </div>
        ) : (
          /* Solution Contrast View */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
            
            <div className="p-6 sm:p-8 rounded-xl bg-white border border-emerald-200/90 shadow-xs hover:border-emerald-300 transition-all">
              <div className="w-11 h-11 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Single Cloud Source</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Candidate records seamlessly transition into employee rotas, digital care plans, eMAR logs, and council billing invoices without re-typing.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-emerald-700 font-bold">
                ✓ Zero duplicate data entry
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-xl bg-white border border-emerald-200/90 shadow-xs hover:border-emerald-300 transition-all">
              <div className="w-11 h-11 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Automated Workflows</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                1-Click multi-board posting, mobile eMAR with double-sign checks, GPS geofenced clock-ins, and 1-tap locum broadcast for urgent shifts.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-emerald-700 font-bold">
                ✓ 60% faster hiring & shift fill
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-xl bg-white border border-emerald-200/90 shadow-xs hover:border-emerald-300 transition-all">
              <div className="w-11 h-11 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Live CQC Dashboard</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Real-time attendance feeds, automated compliance scorecards, instant incident tracking, and 1-click CQC inspection report exports.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-emerald-700 font-bold">
                ✓ 100% CQC Audit Readiness
              </div>
            </div>

          </div>
        )}

        {/* Transition Statement Callout */}
        <div className="mt-12 p-8 rounded-2xl bg-white border border-slate-200 text-center max-w-3xl mx-auto shadow-sm">
          <p className="text-lg font-bold text-slate-900 mb-4">
            "What if one platform could handle it all — and make your teams more effective?"
          </p>
          <button
            onClick={onBookDemo}
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-md transition-colors shadow-sm"
          >
            See How MployUS Unifies Your Workflow <ArrowRight className="w-4 h-4 text-slate-300" />
          </button>
        </div>

      </div>
    </section>
  );
};
