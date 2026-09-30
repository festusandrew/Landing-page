import React, { useState } from 'react';
import { X, Check, Rocket, ShieldCheck, ArrowRight } from 'lucide-react';

interface FreeTrialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FreeTrialModal: React.FC<FreeTrialModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    companyName: '',
    primaryModule: 'care-management'
  });
  const [isCreated, setIsCreated] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreated(true);
  };

  const handleClose = () => {
    setStep(1);
    setIsCreated(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 my-8">
        <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 p-6 text-white relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold mb-2">
            <Rocket className="w-3.5 h-3.5" /> 14-Day Full Access Trial
          </div>
          <h3 className="text-2xl font-bold">Start Your Free MployUS Trial</h3>
          <p className="text-slate-300 text-xs mt-1">No credit card required. Cancel anytime with 1-click.</p>
        </div>

        <div className="p-6">
          {isCreated ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">Workspace Provisioned!</h4>
              <p className="text-slate-600 text-sm max-w-xs mx-auto">
                Your sandbox workspace for <strong className="text-slate-900">{formData.companyName || 'Your Facility'}</strong> is ready with pre-populated care plans & sample staff profiles.
              </p>

              <div className="pt-2">
                <button
                  onClick={handleClose}
                  className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl transition-all shadow-md shadow-teal-600/20 flex items-center justify-center gap-2"
                >
                  Launch MployUS Sandbox <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Work Email</label>
                    <input
                      type="email"
                      required
                      placeholder="manager@carehome.co.uk"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-sm outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Create Secure Password</label>
                    <input
                      type="password"
                      required
                      minLength={8}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={e => setFormData({ ...formData, password: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-sm outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Care Home / Agency Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Oakwood Care Home"
                      value={formData.companyName}
                      onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-sm outline-none"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (!formData.email || !formData.companyName) {
                        alert('Please enter your work email and organization name.');
                        return;
                      }
                      setStep(2);
                    }}
                    className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm rounded-xl transition-all shadow-md shadow-teal-600/20 flex items-center justify-center gap-1.5"
                  >
                    Next: Choose Primary Module <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">Select Primary Module for Sandbox</label>
                    <div className="space-y-2">
                      {[
                        { id: 'care-management', name: 'Care Management & eMAR', desc: 'Digital care plans, medication safety & CQC reports' },
                        { id: 'recruitment', name: 'Recruitment & ATS', desc: 'Multi-board job posting & hiring pipeline' },
                        { id: 'locums-staffing', name: 'Locums & Staffing App', desc: 'Shift posting & instant locum matching' },
                        { id: 'facility-management', name: 'Facility Operations', desc: 'Live check-ins, attendance & billing dashboard' }
                      ].map((m) => (
                        <label
                          key={m.id}
                          className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                            formData.primaryModule === m.id ? 'bg-teal-50 border-teal-500 text-slate-900' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="module"
                            checked={formData.primaryModule === m.id}
                            onChange={() => setFormData({ ...formData, primaryModule: m.id })}
                            className="mt-0.5 text-teal-600 focus:ring-teal-500"
                          />
                          <div>
                            <div className="text-xs font-bold">{m.name}</div>
                            <div className="text-[11px] text-slate-500">{m.desc}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 py-1 text-xs text-slate-500">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Includes sample care data & dummy staff records for instant testing.</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold text-xs rounded-xl hover:from-teal-700 hover:to-emerald-700 shadow-md shadow-teal-600/20"
                    >
                      Complete & Create Workspace
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
