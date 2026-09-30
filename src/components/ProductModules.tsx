import React from 'react';
import { UserPlus, HeartPulse, Users, Building2, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCT_MODULES } from '../data/mockData';
import { ProductModule } from '../types';

interface ProductModulesProps {
  onOpenModule: (modId: string) => void;
  onBookDemo: (moduleTitle?: string) => void;
}

export const ProductModules: React.FC<ProductModulesProps> = ({ onOpenModule, onBookDemo }) => {
  const iconMap: Record<string, React.ElementType> = {
    UserPlus,
    HeartPulse,
    Users,
    Building2
  };

  return (
    <section id="products" className="py-20 bg-slate-50 text-slate-900 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Modular & Integrated
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Four Connected Modules. Built for Healthcare.
          </h2>
          <p className="text-slate-600 text-base mt-3">
            Deploy them individually or seamlessly connected as one platform.
          </p>
        </div>

        {/* 2x2 Grid of Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PRODUCT_MODULES.map((mod: ProductModule) => {
            const Icon = iconMap[mod.iconName] || Sparkles;

            return (
              <div
                key={mod.id}
                className="group relative rounded-xl bg-white border border-slate-200 p-8 hover:border-slate-300 transition-all duration-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-11 h-11 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-900">
                      <Icon className="w-5 h-5 text-slate-900" />
                    </div>

                    <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-800 rounded-full">
                      {mod.badge}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {mod.title}
                  </h3>
                  <p className="text-sm font-semibold text-emerald-700 mb-6">
                    "{mod.tagline}"
                  </p>

                  {/* Key Feature Bullets */}
                  <div className="space-y-3 mb-6">
                    {mod.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs text-slate-600 leading-relaxed font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Target Use Case */}
                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 mb-6">
                    <strong className="text-slate-900 block mb-0.5 font-bold">Use Case:</strong>
                    {mod.useCase}
                  </div>
                </div>

                {/* Bottom Action CTAs */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700 font-mono">
                    ★ {mod.metrics}
                  </span>

                  <button
                    onClick={() => onOpenModule(mod.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-slate-700 transition-colors"
                  >
                    {mod.ctaText} <ArrowRight className="w-4 h-4 text-slate-600" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Bottom Banner */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-500">
            Need a tailored bundle for multi-site care homes or recruitment agencies?
          </p>
          <button
            onClick={() => onBookDemo('Custom Bundles')}
            className="mt-2 text-xs font-bold text-slate-900 hover:underline inline-flex items-center gap-1"
          >
            Request Custom Product Bundle Consultation →
          </button>
        </div>

      </div>
    </section>
  );
};
