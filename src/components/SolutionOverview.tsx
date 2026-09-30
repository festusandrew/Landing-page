import React, { useState } from 'react';
import { Database, UserPlus, HeartPulse, Users, Building2, Sparkles, ArrowRight, ShieldCheck, Check } from 'lucide-react';

interface SolutionOverviewProps {
  onOpenModule: (modId: string) => void;
  onBookDemo: () => void;
}

export const SolutionOverview: React.FC<SolutionOverviewProps> = ({ onOpenModule, onBookDemo }) => {
  const [activeNode, setActiveNode] = useState<string>('recruitment');

  const nodes = [
    {
      id: 'recruitment',
      name: 'Recruitment Software',
      shortName: 'Recruitment',
      icon: UserPlus,
      color: 'border-blue-500 text-blue-400 bg-blue-500/10',
      badge: 'Step 1: Attract & Hire',
      dataFlow: 'Candidate Application → DBS & Credential Checks → Onboarding Package Created'
    },
    {
      id: 'care-management',
      name: 'Care Management Software',
      shortName: 'Care & eMAR',
      icon: HeartPulse,
      color: 'border-emerald-500 text-emerald-400 bg-emerald-500/10',
      badge: 'Step 2: Care Delivery',
      dataFlow: 'Service User Care Plan → Daily Notes & Voice Dictation → eMAR Medication Log'
    },
    {
      id: 'locums-staffing',
      name: 'Locums & Care Staffing',
      shortName: 'Staffing App',
      icon: Users,
      color: 'border-violet-500 text-violet-400 bg-violet-500/10',
      badge: 'Step 3: Rota & Shifts',
      dataFlow: 'Smart Shift Rota → Locum Broadcast → GPS Mobile Check-in & Sign-off'
    },
    {
      id: 'facility-management',
      name: 'Facility Management Portal',
      shortName: 'Operations',
      icon: Building2,
      color: 'border-amber-500 text-amber-400 bg-amber-500/10',
      badge: 'Step 4: Analytics',
      dataFlow: 'Live Attendance Stream → Funder Billing → CQC Inspection Audit Package'
    }
  ];

  const currentNode = nodes.find(n => n.id === activeNode) || nodes[0];

  return (
    <section className="py-20 bg-white text-slate-900 relative border-t border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Unified Architecture
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            One Platform. Four Powerful Modules.
          </h2>
          <p className="text-slate-600 text-base mt-4 leading-relaxed">
            We've built the only healthcare platform that connects recruitment, care delivery, workforce management, and facility operations into a seamless workflow.
          </p>
        </div>

        {/* INTERACTIVE CONNECTED NODE DIAGRAM */}
        <div className="bg-slate-50/80 rounded-2xl border border-slate-200 p-6 md:p-10 shadow-xs relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left/Top Node Connections Diagram */}
            <div className="lg:col-span-7 relative flex items-center justify-center min-h-[360px] p-4">
              
              {/* Central Database Core Node */}
              <div className="w-36 h-36 rounded-full bg-white border-2 border-slate-900 flex flex-col items-center justify-center text-center p-3 shadow-md z-20">
                <Database className="w-7 h-7 text-slate-900 mb-1" />
                <span className="text-xs font-bold text-slate-900">MployUS Core</span>
                <span className="text-[9px] text-emerald-700 font-mono uppercase font-bold">1 Source of Truth</span>
              </div>

              {/* 4 Surrounding Nodes */}
              <div className="absolute inset-0 flex flex-col justify-between p-2 pointer-events-none">
                <div className="flex justify-between items-center">
                  
                  {/* Top Left: Recruitment */}
                  <button
                    onClick={() => setActiveNode('recruitment')}
                    className={`pointer-events-auto p-3.5 rounded-xl border transition-all duration-200 shadow-xs flex items-center gap-2.5 ${
                      activeNode === 'recruitment'
                        ? 'bg-slate-900 border-slate-900 text-white scale-105'
                        : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300'
                    }`}
                  >
                    <UserPlus className={`w-5 h-5 ${activeNode === 'recruitment' ? 'text-blue-400' : 'text-blue-600'}`} />
                    <div className="text-left">
                      <div className="text-xs font-bold">Recruitment</div>
                      <div className={`text-[10px] hidden sm:block ${activeNode === 'recruitment' ? 'text-slate-300' : 'text-slate-500'}`}>Fill roles 60% faster</div>
                    </div>
                  </button>

                  {/* Top Right: Care */}
                  <button
                    onClick={() => setActiveNode('care-management')}
                    className={`pointer-events-auto p-3.5 rounded-xl border transition-all duration-200 shadow-xs flex items-center gap-2.5 ${
                      activeNode === 'care-management'
                        ? 'bg-slate-900 border-slate-900 text-white scale-105'
                        : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300'
                    }`}
                  >
                    <HeartPulse className={`w-5 h-5 ${activeNode === 'care-management' ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    <div className="text-left">
                      <div className="text-xs font-bold">Care & eMAR</div>
                      <div className={`text-[10px] hidden sm:block ${activeNode === 'care-management' ? 'text-slate-300' : 'text-slate-500'}`}>Digital Care Plans</div>
                    </div>
                  </button>
                </div>

                <div className="flex justify-between items-center">
                  {/* Bottom Left: Staffing */}
                  <button
                    onClick={() => setActiveNode('locums-staffing')}
                    className={`pointer-events-auto p-3.5 rounded-xl border transition-all duration-200 shadow-xs flex items-center gap-2.5 ${
                      activeNode === 'locums-staffing'
                        ? 'bg-slate-900 border-slate-900 text-white scale-105'
                        : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300'
                    }`}
                  >
                    <Users className={`w-5 h-5 ${activeNode === 'locums-staffing' ? 'text-violet-400' : 'text-violet-600'}`} />
                    <div className="text-left">
                      <div className="text-xs font-bold">Staffing App</div>
                      <div className={`text-[10px] hidden sm:block ${activeNode === 'locums-staffing' ? 'text-slate-300' : 'text-slate-500'}`}>Locum Shift Matching</div>
                    </div>
                  </button>

                  {/* Bottom Right: Facility Portal */}
                  <button
                    onClick={() => setActiveNode('facility-management')}
                    className={`pointer-events-auto p-3.5 rounded-xl border transition-all duration-200 shadow-xs flex items-center gap-2.5 ${
                      activeNode === 'facility-management'
                        ? 'bg-slate-900 border-slate-900 text-white scale-105'
                        : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300'
                    }`}
                  >
                    <Building2 className={`w-5 h-5 ${activeNode === 'facility-management' ? 'text-amber-400' : 'text-amber-600'}`} />
                    <div className="text-left">
                      <div className="text-xs font-bold">Facility Portal</div>
                      <div className={`text-[10px] hidden sm:block ${activeNode === 'facility-management' ? 'text-slate-300' : 'text-slate-500'}`}>Live Operations & Billing</div>
                    </div>
                  </button>
                </div>
              </div>

            </div>

            {/* Right Node Details Panel */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200 inline-block">
                {currentNode.badge}
              </span>

              <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                {currentNode.name}
              </h3>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Unified Data Flow:</span>
                <p className="text-xs font-mono text-slate-800 leading-relaxed font-medium">
                  {currentNode.dataFlow}
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Eliminates duplicate manual data entry between departments</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Maintains audit-ready real-time records for CQC inspections</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Connects agency workers, staff nurses, and finance teams seamlessly</span>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={() => onOpenModule(currentNode.id)}
                  className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-md transition-colors flex items-center justify-center gap-1.5"
                >
                  Explore {currentNode.shortName} <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
                </button>
              </div>
            </div>

          </div>

          {/* Key Differentiator Callout Banner */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 text-sm block">The MployUS Differentiator</strong>
                <p className="text-slate-600">
                  Unlike point solutions, our platform eliminates duplicate data entry, maintains one source of truth, and gives you end-to-end visibility from job posting to care delivery.
                </p>
              </div>
            </div>
            <button
              onClick={onBookDemo}
              className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-900 font-semibold text-xs rounded-md border border-slate-200 shrink-0 transition-colors shadow-xs"
            >
              Request Ecosystem Architecture Demo
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
