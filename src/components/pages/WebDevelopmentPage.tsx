import React from 'react';
import { Code2, ArrowRight, ArrowLeft, Globe, Database, Server, Lock } from 'lucide-react';

interface WebDevelopmentPageProps {
  onBackToHome: () => void;
  onBookDemo: (moduleTitle?: string) => void;
}

export const WebDevelopmentPage: React.FC<WebDevelopmentPageProps> = ({
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
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-700">
            <span className="w-2 h-2 rounded-full bg-cyan-600 animate-pulse" />
            <span>Healthcare Professional Service: Web & Portal Engineering</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="py-12 lg:py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 text-xs font-bold uppercase tracking-wider">
              <Code2 className="w-3.5 h-3.5" /> Full-Stack Healthcare Web & Portal Engineering
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Custom Care Home Websites, Patient Portals & NHS API Integrations
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              Full-stack software engineering for healthcare providers: custom websites, patient management portals, NHS spine integrations, and automated payroll sync with Sage & Xero.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onBookDemo('Healthcare Web Development Service')}
                className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors shadow-2xs flex items-center gap-2"
              >
                Discuss Web Development Project <ArrowRight className="w-4 h-4 text-slate-300" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Capabilities */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">Custom Engineering Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-50 text-cyan-600 border border-cyan-200 flex items-center justify-center font-bold">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Care Home Websites</h3>
            <p className="text-xs text-slate-600">High-converting, accessible websites with virtual 360 tour embeds, bed availability trackers, and inquiry forms.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center font-bold">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">NHS & Payroll API Sync</h3>
            <p className="text-xs text-slate-600">Direct integration with NHS Spine, GP Connect, Sage, Xero, BrightPay, and custom HL7/FHIR medical data standard APIs.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">GDPR & ISO Security</h3>
            <p className="text-xs text-slate-600">ISO 27001 compliant cloud infrastructure hosted in tier-4 UK data centers with 256-bit AES encryption.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
