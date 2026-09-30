import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { PRICING_PLANS } from '../data/mockData';

interface PricingProps {
  onBookDemo: () => void;
  onStartTrial: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onBookDemo, onStartTrial }) => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="py-20 bg-white text-slate-900 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold uppercase tracking-wider mb-3">
            Transparent Scaling
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Flexible Plans for Every Organization
          </h2>
          <p className="text-slate-600 text-base mt-3">
            Whether you're a single care home or a multi-site NHS group, we have a plan that scales with you.
          </p>

          {/* Monthly / Annual Toggle (Cal.com style nav-pill-group) */}
          <div className="mt-8 inline-flex items-center gap-1 bg-slate-200/80 p-1 rounded-full border border-slate-300">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                !isAnnual ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                isAnnual ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-1.5 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-mono font-bold">SAVE 20%</span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {PRICING_PLANS.map((plan) => {
            const price = isAnnual ? plan.annualMonthlyPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                className={`p-8 rounded-xl bg-white border transition-all duration-200 relative flex flex-col justify-between ${
                  plan.popular
                    ? 'border-2 border-slate-900 shadow-md scale-[1.02]'
                    : 'border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                    MOST POPULAR CHOICE
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{plan.name}</h3>
                  <p className="text-xs text-slate-500 mb-6 font-medium">{plan.target}</p>

                  <div className="mb-6">
                    <span className="text-4xl font-bold text-slate-900">
                      £{plan.id === 'enterprise' && !isAnnual ? 'Custom' : price}
                    </span>
                    <span className="text-slate-500 text-xs font-normal"> / month</span>
                    {isAnnual && plan.id !== 'enterprise' && (
                      <div className="text-[10px] text-emerald-700 font-bold mt-1">
                        Billed annually (£{(price * 12).toLocaleString()}/yr)
                      </div>
                    )}
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 mb-8">
                    {plan.features.map((f, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 font-medium">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={plan.id === 'starter' ? onStartTrial : onBookDemo}
                  className={`w-full py-3.5 rounded-md font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 ${
                    plan.popular
                      ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs'
                      : 'bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 shadow-xs'
                  }`}
                >
                  {plan.cta} <ArrowRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Note Below Pricing */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 max-w-2xl mx-auto text-center text-xs text-slate-600 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            <strong>Included in all plans:</strong> Dedicated onboarding manager, free data migration, staff training video academy, and no long-term lock-in contracts.
          </span>
        </div>

      </div>
    </section>
  );
};
