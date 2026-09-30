import React from 'react';
import { Palette, ArrowRight, ArrowLeft, Layout, Smartphone, Eye, ShoppingBag, Landmark, GraduationCap, HeartPulse, Truck, Gamepad2, Layers, PenTool } from 'lucide-react';

interface ProductDesignPageProps {
  onBackToHome: () => void;
  onBookDemo: (moduleTitle?: string) => void;
}

export const ProductDesignPage: React.FC<ProductDesignPageProps> = ({
  onBackToHome,
  onBookDemo
}) => {
  const industries = [
    { icon: HeartPulse, label: 'Healthcare', color: 'text-rose-600 bg-rose-50 border-rose-200' },
    { icon: ShoppingBag, label: 'E-commerce & Retail', color: 'text-amber-600 bg-amber-50 border-amber-200' },
    { icon: Landmark, label: 'Fintech & Banking', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { icon: GraduationCap, label: 'Education & EdTech', color: 'text-blue-600 bg-blue-50 border-blue-200' },
    { icon: Truck, label: 'Logistics & SaaS', color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
    { icon: Gamepad2, label: 'Media & Entertainment', color: 'text-violet-600 bg-violet-50 border-violet-200' }
  ];

  const services = [
    {
      icon: Smartphone,
      label: 'text-rose-600 bg-rose-50 border-rose-200',
      title: 'Mobile & Web Apps',
      desc: 'Fast, intuitive interfaces for any product — from consumer apps to complex B2B platforms — built to convert and delight.'
    },
    {
      icon: Layout,
      label: 'text-blue-600 bg-blue-50 border-blue-200',
      title: 'Dashboards & SaaS Portals',
      desc: 'High-density admin and analytics dashboards with clear visual hierarchy, accessible contrast, and zero clutter.'
    },
    {
      icon: Layers,
      label: 'text-indigo-600 bg-indigo-50 border-indigo-200',
      title: 'Design Systems',
      desc: 'WCAG-compliant design tokens, component libraries, and typography guidelines that keep any brand consistent at scale.'
    },
    {
      icon: PenTool,
      label: 'text-amber-600 bg-amber-50 border-amber-200',
      title: 'Branding & Identity',
      desc: 'Logos, visual language, and marketing sites that give startups and enterprises alike a distinctive, memorable presence.'
    },
    {
      icon: Eye,
      label: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      title: 'UX Research & Testing',
      desc: 'User interviews, usability testing, and journey mapping to validate ideas before a line of code is written.'
    },
    {
      icon: Palette,
      label: 'text-violet-600 bg-violet-50 border-violet-200',
      title: 'Prototyping & Motion',
      desc: 'Clickable prototypes and micro-interactions that bring products to life and get stakeholder buy-in fast.'
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
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-700">
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
            <span>Professional Service: Product Design & UX for Every Industry</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="py-12 lg:py-16 bg-white border-b border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider">
              <Palette className="w-3.5 h-3.5" /> UI/UX & Design Systems for Any Niche
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Product Design & UX for Every Industry
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              From fintech and e-commerce to education, logistics and healthcare — we design intuitive, high-converting interfaces, design systems, and brand identities for products across every niche and platform.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onBookDemo('Product Design Service')}
                className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors shadow-2xs flex items-center gap-2"
              >
                Request Product Design Consultation <ArrowRight className="w-4 h-4 text-slate-300" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Design For */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-700">No niche off-limits</span>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">Industries We Design For</h2>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl">Whatever you're building, our design team has shipped for it. A few of the sectors we work across:</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {industries.map((ind) => {
            const Icon = ind.icon;
            return (
              <div key={ind.label} className="p-4 rounded-xl bg-white border border-black/10 shadow-2xs flex flex-col items-center text-center gap-2">
                <div className={`w-10 h-10 rounded-lg border flex items-center justify-center ${ind.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-800 leading-tight">{ind.label}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Design Services */}
      <section className="pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">What We Design</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="p-6 rounded-2xl bg-white border border-black/10 shadow-2xs space-y-3">
                <div className={`w-10 h-10 rounded-lg border flex items-center justify-center font-bold ${s.label}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{s.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-2xl bg-slate-900 text-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-2">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Have a product in mind?</span>
            <h3 className="text-2xl font-bold text-white">Let's design it — whatever the niche</h3>
            <p className="text-xs text-slate-300">Book a free consultation and we'll map out your product's design roadmap.</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onBookDemo('Product Design Service')}
              className="px-6 py-3 bg-white text-slate-900 font-semibold text-xs rounded-md hover:bg-slate-100 transition-colors shadow-2xs"
            >
              Book a Consultation
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
