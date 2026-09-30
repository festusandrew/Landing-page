import React, { useState } from 'react';
import { X, Check, Calendar, Clock, Building, Users, CheckCircle2, ChevronRight, ChevronLeft, Shield } from 'lucide-react';

interface BookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: string;
  initialModule?: string;
}

export const BookDemoModal: React.FC<BookDemoModalProps> = ({
  isOpen,
  onClose,
  initialRole = 'Care Home Manager',
  initialModule = 'All Modules'
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    orgName: '',
    role: initialRole,
    staffCount: '20-50 Staff',
    modules: [initialModule === 'All Modules' ? 'care-management' : initialModule],
    preferredDate: new Date().toISOString().split('T')[0],
    preferredTime: '10:00 AM'
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleModuleToggle = (modId: string) => {
    setFormData(prev => {
      const exists = prev.modules.includes(modId);
      return {
        ...prev,
        modules: exists ? prev.modules.filter(m => m !== modId) : [...prev.modules, modId]
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetForm = () => {
    setStep(1);
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 p-6 text-white flex items-center justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold mb-2">
              <Shield className="w-3.5 h-3.5" /> 1-on-1 Product Walkthrough
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Book Your Personal MployUS Demo</h2>
            <p className="text-slate-300 text-sm mt-1">
              See how our integrated platform can transform your healthcare operations.
            </p>
          </div>
          <button
            onClick={resetForm}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Demo Session Confirmed!</h3>
              <p className="text-slate-600 max-w-md mx-auto text-sm">
                Thank you <span className="font-semibold text-slate-900">{formData.fullName || 'there'}</span>. We’ve sent a calendar invitation and meeting link to <span className="font-semibold text-teal-700">{formData.email || 'your email'}</span>.
              </p>
              
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-left text-sm max-w-md mx-auto space-y-2 mt-4">
                <div className="flex items-center justify-between text-slate-700">
                  <span className="text-slate-500">Date & Time:</span>
                  <span className="font-semibold">{formData.preferredDate} at {formData.preferredTime}</span>
                </div>
                <div className="flex items-center justify-between text-slate-700">
                  <span className="text-slate-500">Organization:</span>
                  <span className="font-semibold">{formData.orgName || 'Care Organization'}</span>
                </div>
                <div className="flex items-center justify-between text-slate-700">
                  <span className="text-slate-500">Assigned Specialist:</span>
                  <span className="font-semibold text-teal-700">Rachel Vance (Healthcare Solutions Specialist)</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={resetForm}
                  className="px-6 py-2.5 bg-teal-600 text-white font-medium rounded-xl hover:bg-teal-700 transition-all shadow-md shadow-teal-600/20"
                >
                  Return to Platform
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Stepper */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      step === s 
                        ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30 ring-2 ring-teal-600 ring-offset-2' 
                        : step > s 
                        ? 'bg-teal-100 text-teal-700' 
                        : 'bg-slate-100 text-slate-400'
                    }`}>
                      {step > s ? <Check className="w-4 h-4" /> : s}
                    </div>
                    <span className={`text-xs font-medium hidden sm:inline ${step === s ? 'text-slate-900 font-semibold' : 'text-slate-400'}`}>
                      {s === 1 ? 'Contact Info' : s === 2 ? 'Organization' : 'Schedule'}
                    </span>
                  </div>
                ))}
              </div>

              {step === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Step 1: Your Details</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sarah Mitchell"
                        value={formData.fullName}
                        onChange={e => setFormData({...formData, fullName: e.target.value})}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-sm outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Work Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="sarah@caregroup.co.uk"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-sm outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="07700 900000"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-sm outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Organization Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sunrise Care Home"
                        value={formData.orgName}
                        onChange={e => setFormData({...formData, orgName: e.target.value})}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-sm outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Primary Role</label>
                    <select
                      value={formData.role}
                      onChange={e => setFormData({...formData, role: e.target.value})}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-sm outline-none bg-white transition-all"
                    >
                      <option value="Care Home Manager">Care Home Manager / Director</option>
                      <option value="Recruitment Agency">Healthcare Recruitment Agency</option>
                      <option value="Locum Healthcare Worker">Locum Nurse / Healthcare Worker</option>
                      <option value="Operations / HR Director">Operations / HR Director</option>
                      <option value="Finance / Compliance Officer">Finance / Compliance Officer</option>
                    </select>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Step 2: Operations & Scope</h4>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Facility Size / Active Staff</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['1-20 Staff', '20-50 Staff', '50-200 Staff', '200+ Staff'].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setFormData({...formData, staffCount: s})}
                          className={`px-3 py-2 text-xs font-medium rounded-xl border transition-all text-center ${
                            formData.staffCount === s 
                              ? 'bg-teal-50 border-teal-500 text-teal-800 font-bold shadow-sm'
                              : 'border-slate-200 hover:border-slate-300 text-slate-700'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">Modules You Want to Explore</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        { id: 'recruitment', label: 'Recruitment Software (ATS)' },
                        { id: 'care-management', label: 'Care Management & eMAR' },
                        { id: 'locums-staffing', label: 'Locums & Staffing App' },
                        { id: 'facility-management', label: 'Facility Operations Portal' }
                      ].map((m) => {
                        const checked = formData.modules.includes(m.id);
                        return (
                          <div
                            key={m.id}
                            onClick={() => handleModuleToggle(m.id)}
                            className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                              checked ? 'bg-teal-50/60 border-teal-500 text-slate-900' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded flex items-center justify-center border text-white ${
                              checked ? 'bg-teal-600 border-teal-600' : 'border-slate-300'
                            }`}>
                              {checked && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span className="text-xs font-medium">{m.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Step 3: Schedule Your Demo</h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-teal-600" /> Select Date
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.preferredDate}
                        onChange={e => setFormData({...formData, preferredDate: e.target.value})}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-sm outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-teal-600" /> Preferred Time (UK)
                      </label>
                      <select
                        value={formData.preferredTime}
                        onChange={e => setFormData({...formData, preferredTime: e.target.value})}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-sm outline-none bg-white"
                      >
                        <option value="09:00 AM">09:00 AM BST</option>
                        <option value="10:30 AM">10:30 AM BST</option>
                        <option value="01:30 PM">01:30 PM BST</option>
                        <option value="03:00 PM">03:00 PM BST</option>
                        <option value="04:30 PM">04:30 PM BST</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-3 bg-teal-50/70 border border-teal-200/80 rounded-xl text-xs text-teal-900 flex items-start gap-2">
                    <Shield className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                    <p>
                      <strong>Guaranteed:</strong> No hard sell. Our healthcare solution engineers will tailor the demonstration specifically to your team’s workflows.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-4 py-2 text-slate-600 font-medium text-sm hover:text-slate-900 flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                ) : <div />}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (step === 1 && (!formData.fullName || !formData.email)) {
                        alert('Please fill in your name and work email.');
                        return;
                      }
                      setStep(step + 1);
                    }}
                    className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-medium text-sm rounded-xl transition-all shadow-md shadow-teal-600/20 flex items-center gap-1.5"
                  >
                    Continue <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-teal-600/25 flex items-center gap-1.5"
                  >
                    Confirm & Book Demo <Check className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
