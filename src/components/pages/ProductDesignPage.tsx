import React from 'react';
import { Palette, ArrowRight, ArrowLeft, Layout, Sparkles, Smartphone, Shield, Eye } from 'lucide-react';

interface ProductDesignPageProps {
  onBackToHome: () => void;
  onBookDemo: (moduleTitle?: string) => void;
}

export const ProductDesignPage: React.FC<ProductDesignPageProps> = ({
  onBackToHome,
  onBookDemo
}) => {
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
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-700">
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
            <span>Healthcare Professional Service: Healthcare Product Design & UX</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="py-12 lg:py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider">
              <Palette className="w-3.5 h-3.5" /> Healthcare UI/UX & Design Systems
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Clinical UI/UX Design & Medical Software Prototyping
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              We design intuitive, error-free interfaces for clinical EHR systems, mobile care worker apps, patient portals, and medical IoT dashboards tailored for high-stress healthcare environments.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onBookDemo('Healthcare Product Design Service')}
                className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors shadow-2xs flex items-center gap-2"
              >
                Request Product Design Consultation <ArrowRight className="w-4 h-4 text-slate-300" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Design Showcase */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">What We Design For Healthcare Providers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center font-bold">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Mobile Care Apps</h3>
            <p className="text-xs text-slate-600">Fast, 1-tap mobile interfaces for care home assistants to log notes and medication passes without fatigue.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 border border-teal-200 flex items-center justify-center font-bold">
              <Layout className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Clinical EHR & Rota Portals</h3>
            <p className="text-xs text-slate-600">High-density desktop dashboards with clear visual hierarchy, accessible contrast, and zero clutter.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center font-bold">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Accessible Design Systems</h3>
            <p className="text-xs text-slate-600">WCAG 2.1 AAA compliant design tokens, component libraries, and typography guidelines for healthcare brand consistency.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
