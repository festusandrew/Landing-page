import React, { useState } from 'react';
import { Timer, ShieldCheck, Zap, TrendingUp, Calculator, ArrowRight, CheckCircle2 } from 'lucide-react';
import { METRIC_OUTCOMES } from '../data/mockData';

interface BenefitsProps {
  onBookDemo: () => void;
}

export const Benefits: React.FC<BenefitsProps> = ({ onBookDemo }) => {
  const [bedsCount, setBedsCount] = useState<number>(40);
  const [staffCount, setStaffCount] = useState<number>(35);

  // ROI Calculator Math
  const adminHoursSavedWeekly = Math.round((bedsCount * 0.25) + (staffCount * 0.3));
  const annualCostSaved = Math.round(adminHoursSavedWeekly * 52 * 18.5); // £18.50/hr avg manager rate
  const timeToFillDays = Math.max(5, Math.round(21 - (staffCount * 0.2)));

  const iconMap: Record<string, React.ElementType> = {
    Timer,
    ShieldCheck,
    Zap,
    TrendingUp
  };

  return (
    <section id="benefits" className="py-20 bg-white text-slate-900 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold uppercase tracking-wider mb-3">
            Proven Operational Impact
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            The Results Our Customers See
          </h2>
          <p className="text-slate-600 text-base mt-3">
            Transforming care quality, compliance scores, and staff retention across 500+ UK facilities.
          </p>
        </div>

        {/* 4 Outcome Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {METRIC_OUTCOMES.map((b) => {
            const Icon = iconMap[b.iconName] || Zap;

            return (
              <div
                key={b.id}
                className="p-6 rounded-xl bg-white border border-slate-200 hover:border-slate-300 transition-all duration-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-lg bg-slate-100 border border-slate-200 text-slate-900 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-slate-900" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-1">{b.title}</h3>
                  <div className="text-3xl font-bold text-slate-900 my-2">{b.stat}</div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{b.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 text-[11px] font-bold text-emerald-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {b.benchmark}
                </div>
              </div>
            );
          })}
        </div>

        {/* INTERACTIVE ROI & TIME SAVINGS CALCULATOR */}
        <div className="bg-slate-50/80 rounded-2xl border border-slate-200 p-8 shadow-xs relative overflow-hidden">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Sliders */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-xs uppercase tracking-wider">
                <Calculator className="w-4 h-4 text-emerald-600" /> Interactive Admin Savings Estimator
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Calculate Your Facility's Projected Time & Cost Savings
              </h3>

              {/* Slider 1: Beds Count */}
              <div className="space-y-2 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-slate-700">Number of Care Beds / Service Users:</span>
                  <span className="text-slate-900 font-mono text-base font-bold">{bedsCount} Beds</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={250}
                  step={5}
                  value={bedsCount}
                  onChange={(e) => setBedsCount(Number(e.target.value))}
                  className="w-full accent-slate-900 bg-slate-200 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider 2: Staff Count */}
              <div className="space-y-2 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-slate-700">Active Care Staff & Carers:</span>
                  <span className="text-slate-900 font-mono text-base font-bold">{staffCount} Staff</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={200}
                  step={5}
                  value={staffCount}
                  onChange={(e) => setStaffCount(Number(e.target.value))}
                  className="w-full accent-slate-900 bg-slate-200 h-2 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Right Calculated Results Box */}
            <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-slate-200 text-center space-y-4 shadow-xs">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Estimated Annual ROI</span>
              
              <div className="space-y-1">
                <div className="text-4xl font-extrabold text-slate-900">
                  £{annualCostSaved.toLocaleString()}
                </div>
                <div className="text-xs text-emerald-700 font-semibold">Annual Administrative Cost Saved</div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="text-xl font-bold text-slate-900">{adminHoursSavedWeekly} Hrs/Wk</div>
                  <div className="text-[10px] text-slate-500 font-medium">Admin Reclaimed</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="text-xl font-bold text-slate-900">{timeToFillDays} Days</div>
                  <div className="text-[10px] text-slate-500 font-medium">Time-to-Hire</div>
                </div>
              </div>

              <button
                onClick={onBookDemo}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-md transition-colors shadow-xs flex items-center justify-center gap-1.5"
              >
                Get Detailed ROI Breakdown Demo <ArrowRight className="w-4 h-4 text-slate-300" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
