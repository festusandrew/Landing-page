import React, { useState } from 'react';
import { UserPlus, HeartPulse, Users, Building2, CheckCircle2, Search, ArrowRight, Sparkles } from 'lucide-react';
import { FEATURE_CATEGORIES } from '../data/mockData';

interface FeaturesGridProps {
  onBookDemo: () => void;
}

export const FeaturesGrid: React.FC<FeaturesGridProps> = ({ onBookDemo }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const iconMap: Record<string, React.ElementType> = {
    UserPlus,
    HeartPulse,
    Users,
    Building2
  };

  const categories = ['All', 'Recruitment & Hiring', 'Care Delivery', 'Workforce Management', 'Operations & Analytics'];

  return (
    <section id="features" className="py-20 bg-slate-50 text-slate-900 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Complete Feature Matrix
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Everything You Need in One Platform
          </h2>
          <p className="text-slate-600 text-base mt-3">
            Explore 24+ native healthcare capabilities engineered to simplify daily care operations.
          </p>

          {/* Search & Category Filter Bar */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-2xl mx-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search features (e.g. eMAR, GPS)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 shadow-xs"
              />
            </div>

            {/* Category Pills (Cal.com style) */}
            <div className="flex flex-wrap items-center justify-center gap-1 bg-slate-200/80 p-1 rounded-full border border-slate-300 text-xs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full font-semibold transition-all ${
                    selectedCategory === cat ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat === 'All' ? 'All' : cat.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 4-Column Feature Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURE_CATEGORIES.filter(cat => selectedCategory === 'All' || cat.title === selectedCategory).map((cat) => {
            const Icon = iconMap[cat.iconName] || Sparkles;

            const filteredItems = cat.items.filter(item =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              item.description.toLowerCase().includes(searchTerm.toLowerCase())
            );

            if (filteredItems.length === 0) return null;

            return (
              <div
                key={cat.title}
                className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2.5 text-slate-900 font-bold text-sm mb-4 pb-3 border-b border-slate-100">
                    <Icon className="w-5 h-5 text-emerald-600" />
                    <span>{cat.title}</span>
                  </div>

                  <div className="space-y-3">
                    {filteredItems.map((item, idx) => (
                      <div key={idx} className="group/item">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-900 group-hover/item:text-emerald-700 transition-colors">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{item.name}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 pl-5 mt-0.5 leading-tight font-medium">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 text-[10px] text-slate-400 font-mono">
                  Module Sync Active
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={onBookDemo}
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-md transition-colors shadow-xs"
          >
            Request Full Technical Features Walkthrough <ArrowRight className="w-4 h-4 text-slate-300" />
          </button>
        </div>

      </div>
    </section>
  );
};
