import React from 'react';
import { X, CheckCircle2, ArrowRight, Shield, Zap, Sparkles } from 'lucide-react';
import { ProductModule } from '../../types';

interface ModuleDetailModalProps {
  module: ProductModule | null;
  isOpen: boolean;
  onClose: () => void;
  onBookDemo: (moduleTitle: string) => void;
}

export const ModuleDetailModal: React.FC<ModuleDetailModalProps> = ({
  module,
  isOpen,
  onClose,
  onBookDemo
}) => {
  if (!isOpen || !module) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 my-8 max-h-[90vh] flex flex-col">
        {/* Module Header */}
        <div className={`p-6 bg-gradient-to-r ${module.color} text-white relative flex items-center justify-between`}>
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold mb-2 backdrop-blur-md">
              {module.badge}
            </span>
            <h3 className="text-2xl font-bold">{module.title}</h3>
            <p className="text-white/90 text-sm mt-1">{module.tagline}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-black/10 hover:bg-black/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700">
          {/* Key Capabilities */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" /> Core Functional Capabilities
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {module.features.map((feat, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <span className="text-xs font-medium text-slate-800 leading-relaxed">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Target Audience & Use Case */}
          <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200/80">
            <h5 className="text-xs font-bold text-teal-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-teal-600" /> Target Healthcare Environment
            </h5>
            <p className="text-xs text-teal-950 font-medium leading-relaxed">
              {module.useCase}
            </p>
          </div>

          {/* Integration Highlight */}
          <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-teal-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-teal-300">Seamless Ecosystem Sync</div>
                <div className="text-xs text-slate-300">Data captured here updates all other 3 modules instantly with zero duplicate entries.</div>
              </div>
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full border border-teal-500/30 shrink-0">
              {module.metrics}
            </span>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            Close Window
          </button>
          <button
            onClick={() => {
              onClose();
              onBookDemo(module.title);
            }}
            className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs rounded-xl transition-all shadow-md shadow-teal-600/20 flex items-center gap-1.5"
          >
            Book Demo for {module.title} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
