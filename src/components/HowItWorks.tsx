import React, { useState } from 'react';
import { Briefcase, ShieldCheck, CalendarClock, Stethoscope, BarChart3, CheckCircle2, ArrowRight, Sparkles, RefreshCw } from 'lucide-react';
import { WORKFLOW_STEPS } from '../data/mockData';

interface HowItWorksProps {
  onBookDemo: () => void;
  onStartTrial: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onBookDemo, onStartTrial }) => {
  const [activeStep, setActiveStep] = useState(0);

  const iconMap: Record<string, React.ElementType> = {
    Briefcase,
    ShieldCheck,
    CalendarClock,
    Stethoscope,
    BarChart3
  };

  const currentStep = WORKFLOW_STEPS[activeStep];
  const Icon = iconMap[currentStep.iconName] || Sparkles;

  return (
    <section id="how-it-works" className="py-20 bg-white text-slate-900 relative border-t border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <RefreshCw className="w-3.5 h-3.5 text-emerald-600" /> End-to-End Workflow
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            See How Everything Connects
          </h2>
          <p className="text-slate-600 text-base mt-3">
            From posting a job to delivering care, our platform eliminates handoffs and keeps your data flowing.
          </p>
        </div>

        {/* Step Navigation Bar (Horizontal Timeline) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-8 bg-slate-100 p-2 rounded-xl border border-slate-200">
          {WORKFLOW_STEPS.map((s, idx) => {
            const StepIcon = iconMap[s.iconName] || Sparkles;
            const isActive = activeStep === idx;

            return (
              <button
                key={s.stepNumber}
                onClick={() => setActiveStep(idx)}
                className={`p-3 rounded-lg transition-all duration-150 text-left flex flex-col justify-between ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs font-bold scale-[1.01]'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-800'
                  }`}>
                    0{s.stepNumber}
                  </span>
                  <StepIcon className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold truncate">{s.title}</div>
              </button>
            );
          })}
        </div>

        {/* Interactive Step Preview Panel */}
        <div className="bg-slate-50/80 rounded-2xl border border-slate-200 p-6 md:p-10 shadow-xs relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Step Explanation */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 border border-slate-300 text-slate-800 text-xs font-semibold">
                <Icon className="w-4 h-4 text-emerald-700" /> Step {currentStep.stepNumber} of 5: {currentStep.subtitle}
              </div>

              <h3 className="text-3xl font-bold text-slate-900">
                {currentStep.title}
              </h3>

              <p className="text-slate-600 text-base leading-relaxed">
                {currentStep.description}
              </p>

              {/* Step Highlights */}
              <div className="space-y-2.5 pt-2">
                {currentStep.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Next Step Controls */}
              <div className="pt-4 flex items-center gap-3">
                <button
                  onClick={() => setActiveStep((activeStep + 1) % WORKFLOW_STEPS.length)}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-md transition-colors shadow-xs flex items-center gap-1.5"
                >
                  Next Step ({WORKFLOW_STEPS[(activeStep + 1) % WORKFLOW_STEPS.length].title}) <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
                </button>
              </div>
            </div>

            {/* Step Mockup Screen */}
            <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                <span className="font-mono text-slate-900 font-bold">Live UI Simulator</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200 text-[10px] font-bold">
                  {currentStep.mockupDetails.activeModule}
                </span>
              </div>

              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                <div className="text-xs text-slate-500 font-medium">Current State</div>
                <div className="text-lg font-bold text-slate-900">{currentStep.mockupDetails.status}</div>
                <div className="text-xs text-emerald-700 font-semibold">{currentStep.mockupDetails.metrics}</div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-700 font-medium">Automated Next Action:</span>
                <span className="font-bold text-slate-900 bg-white px-2.5 py-1 rounded border border-slate-200">
                  {currentStep.mockupDetails.actionLabel}
                </span>
              </div>
            </div>

          </div>

          {/* Callout Box */}
          <div className="mt-8 pt-6 border-t border-slate-200 text-center bg-white p-4 rounded-xl border border-slate-200">
            <p className="text-xs text-slate-700 font-medium">
              💡 <strong>Every action in one module updates the others automatically.</strong> No duplicate entry. No integration headaches. One source of truth.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
