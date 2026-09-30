import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { FAQS } from '../data/mockData';

interface FAQProps {
  onBookDemo: () => void;
}

export const FAQ: React.FC<FAQProps> = ({ onBookDemo }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const filteredFaqs = FAQS.filter(faq => selectedCategory === 'all' || faq.category === selectedCategory);

  return (
    <section id="faq" className="py-20 bg-slate-50 text-slate-900 relative border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" /> Got Questions?
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-base mt-3">
            Everything you need to know about implementing MployUS in your care organization.
          </p>

          {/* Category Filter Pills (Cal.com style) */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-1 bg-slate-200/80 p-1 rounded-full border border-slate-300 text-xs">
            {[
              { id: 'all', label: 'All Questions' },
              { id: 'general', label: 'General & Modules' },
              { id: 'compliance', label: 'CQC & Security' },
              { id: 'technical', label: 'Integrations & Payroll' },
              { id: 'pricing', label: 'Pricing & Contracts' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3 py-1 rounded-full font-semibold transition-all ${
                  selectedCategory === tab.id ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Expandable Accordions */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-xl bg-white border border-slate-200 shadow-xs overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-slate-700 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-slate-900 shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pl-10 font-medium">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-12 p-6 rounded-xl bg-white border border-slate-200 text-center space-y-3 shadow-xs">
          <p className="text-xs text-slate-600 font-medium">
            Have a specific technical or compliance question not listed here?
          </p>
          <button
            onClick={onBookDemo}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-md transition-colors shadow-xs"
          >
            Ask a Solutions Specialist <ArrowRight className="w-4 h-4 text-slate-300" />
          </button>
        </div>

      </div>
    </section>
  );
};
