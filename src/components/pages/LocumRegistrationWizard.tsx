import React, { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import {
  X, ChevronRight, ChevronDown, ChevronLeft, Check, CheckCircle2, ShieldCheck,
  Stethoscope, User, Mail, Phone, MapPin, Calendar, IdCard, Award, FileText,
  Upload, Building2, Globe, Briefcase, BadgeCheck,
} from 'lucide-react';

/* ────────────────────────────────────────────────────────────────────────────
   Locum registration — country + profession aware config
   Regulators are the real statutory bodies for UK & Ireland.
   ──────────────────────────────────────────────────────────────────────────── */

export type RegRegion = 'IE' | 'UK';

type Regulator = { name: string; acronym: string; field: string; hint: string };

export type ProfessionConfig = {
  key: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  /** null = not statutorily registered in that country */
  regulator: Record<RegRegion, Regulator | null>;
  specialisations: string[];
  /** extra profession-specific document requirements (added to the common set) */
  extraDocs: string[];
};

const PROFESSION_CONFIG: ProfessionConfig[] = [
  {
    key: 'gp',
    name: 'GP / Doctor',
    icon: Stethoscope,
    regulator: {
      UK: { name: 'General Medical Council', acronym: 'GMC', field: 'GMC Reference Number', hint: '7-digit number, e.g. 1234567' },
      IE: { name: 'Medical Council of Ireland', acronym: 'IMC', field: 'IMC Registration Number', hint: 'e.g. 123456' },
    },
    specialisations: ['General Practice', 'Out-of-Hours', 'Urgent Care', 'Occupational Health', 'Sexual Health', 'Dermatology (GPwSI)'],
    extraDocs: ['Annual appraisal / revalidation evidence', 'Medical indemnity (MDU / MPS / MDDUS)'],
  },
  {
    key: 'nurse',
    name: 'Nurse / Midwife',
    icon: BadgeCheck,
    regulator: {
      UK: { name: 'Nursing & Midwifery Council', acronym: 'NMC', field: 'NMC PIN', hint: 'e.g. 12A3456E' },
      IE: { name: 'Nursing & Midwifery Board of Ireland', acronym: 'NMBI', field: 'NMBI PIN', hint: 'e.g. 123456' },
    },
    specialisations: ['General (RGN)', 'Mental Health (RMN)', 'Paediatric', 'Theatre / Scrub', 'ICU / Critical Care', 'A&E', 'Midwifery', 'Community'],
    extraDocs: ['Revalidation / competency portfolio', 'Manual handling certificate'],
  },
  {
    key: 'pharmacist',
    name: 'Pharmacist',
    icon: Briefcase,
    regulator: {
      UK: { name: 'General Pharmaceutical Council', acronym: 'GPhC', field: 'GPhC Registration Number', hint: '7-digit number (PSNI in Northern Ireland)' },
      IE: { name: 'Pharmaceutical Society of Ireland', acronym: 'PSI', field: 'PSI Registration Number', hint: 'e.g. 12345' },
    },
    specialisations: ['Community Pharmacy', 'Hospital Pharmacy', 'Pharmacy Clinic / PGD', 'Wholesale / Distribution', 'Prescribing Pharmacist'],
    extraDocs: ['Responsible Pharmacist declaration', 'PGD / clinical service competency (if applicable)'],
  },
  {
    key: 'hca',
    name: 'Healthcare Assistant (HCA)',
    icon: User,
    regulator: { UK: null, IE: null },
    specialisations: ['Elderly / Nursing Home', 'Acute Hospital', 'Home Care', 'Disability Support', 'Mental Health Support'],
    extraDocs: ['QQI Level 5 (Ireland) or Care Certificate (UK)', 'Patient moving & handling certificate'],
  },
  {
    key: 'ahp',
    name: 'Allied Health Professional',
    icon: Award,
    regulator: {
      UK: { name: 'Health & Care Professions Council', acronym: 'HCPC', field: 'HCPC Registration Number', hint: 'e.g. PH123456' },
      IE: { name: 'CORU (Health & Social Care Regulator)', acronym: 'CORU', field: 'CORU Registration Number', hint: 'e.g. PT012345' },
    },
    specialisations: ['Physiotherapy', 'Radiography', 'Occupational Therapy', 'Speech & Language Therapy', 'Dietetics', 'Podiatry', 'Optometry'],
    extraDocs: ['CPD portfolio', 'Profession-specific competency evidence'],
  },
  {
    key: 'dentist',
    name: 'Dentist',
    icon: Stethoscope,
    regulator: {
      UK: { name: 'General Dental Council', acronym: 'GDC', field: 'GDC Registration Number', hint: 'e.g. 123456' },
      IE: { name: 'Dental Council of Ireland', acronym: 'Dental Council', field: 'Dental Council Registration Number', hint: 'e.g. 12345' },
    },
    specialisations: ['General Dentistry', 'Orthodontics', 'Oral Surgery', 'Endodontics', 'Community Dental'],
    extraDocs: ['Dental indemnity insurance', 'CPD / enhanced CPD record'],
  },
];

const REGION_META: Record<RegRegion, {
  country: string; flag: string; vetting: string; nationalId: string; nationalIdHint: string; rightToWork: string;
}> = {
  IE: { country: 'Ireland', flag: '🇮🇪', vetting: 'Garda Vetting (NVB)', nationalId: 'PPS Number', nationalIdHint: 'e.g. 1234567AB', rightToWork: 'EU/EEA citizen or valid Irish work permit' },
  UK: { country: 'United Kingdom', flag: '🇬🇧', vetting: 'Enhanced DBS Check', nationalId: 'National Insurance Number', nationalIdHint: 'e.g. QQ123456C', rightToWork: 'British/Irish citizen or valid UK visa / share code' },
};

const COMMON_DOCS = [
  'Photo ID (passport / driving licence)',
  'Proof of address (dated within 3 months)',
  'Two professional references',
  'Occupational health clearance & immunisations',
];

const STEPS = ['Profession', 'Personal', 'Registration', 'Compliance', 'Review'] as const;

/* ────────────────────────────────────────────────────────────────────────────
   Small shared field primitives (match the Locum page look & feel)
   ──────────────────────────────────────────────────────────────────────────── */

const Field = ({ icon: Icon, children }: { icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) => (
  <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-50 border border-black/5 focus-within:border-green-400 transition-colors">
    <Icon className="w-4 h-4 text-slate-400 shrink-0" />
    {children}
  </div>
);

const inputCls = 'bg-transparent text-sm outline-none w-full';
const labelCls = 'block text-xs font-bold text-slate-600 mb-1.5';

/* ────────────────────────────────────────────────────────────────────────────
   Wizard
   ──────────────────────────────────────────────────────────────────────────── */

export function LocumRegistrationWizard({
  initialRegion = 'IE',
  onClose,
  onComplete,
}: {
  initialRegion?: RegRegion;
  onClose: () => void;
  onComplete?: (summary: Record<string, string>) => void;
}) {
  const [step, setStep] = useState(0);
  const [region, setRegion] = useState<RegRegion>(initialRegion);
  const [professionKey, setProfessionKey] = useState<string>(PROFESSION_CONFIG[0].key);

  const profession = useMemo(() => PROFESSION_CONFIG.find(p => p.key === professionKey)!, [professionKey]);
  const regulator = profession.regulator[region];
  const meta = REGION_META[region];

  // Form state (kept flat for a simple summary)
  const [form, setForm] = useState<Record<string, string>>({});
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const [confirmedDocs, setConfirmedDocs] = useState<string[]>([]);
  const [terms, setTerms] = useState(false);
  const [done, setDone] = useState(false);

  const allDocs = useMemo(
    () => [...COMMON_DOCS, `${meta.vetting} (${meta.country})`, ...profession.extraDocs],
    [meta, profession],
  );
  const toggleDoc = (d: string) => setConfirmedDocs(c => (c.includes(d) ? c.filter(x => x !== d) : [...c, d]));

  const canContinue = () => {
    if (step === 0) return !!profession && !!form.email;
    if (step === 1) return !!form.fullName && !!form.dob && !!form.city && !!form.nationalId;
    if (step === 2) return regulator ? !!form.regNumber && !!form.specialisation : !!form.specialisation;
    if (step === 3) return confirmedDocs.length === allDocs.length;
    return terms;
  };

  const submit = () => {
    setDone(true);
    onComplete?.({
      region: meta.country,
      profession: profession.name,
      regulator: regulator ? `${regulator.acronym} ${form.regNumber || ''}`.trim() : 'Non-registered role',
      name: form.fullName || '',
      email: form.email || '',
    });
  };

  const primaryBtn = 'py-3 bg-green-600 hover:bg-green-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-1.5';

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        className="relative w-full max-w-lg bg-white rounded-3xl max-h-[92vh] overflow-y-auto"
      >
        {done ? (
          <div className="flex flex-col items-center text-center px-8 py-12 space-y-5">
            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
              className="w-20 h-20 rounded-full bg-green-50 border border-black/5 flex items-center justify-center"
            >
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Registration submitted!</h3>
              <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
                Thanks {form.fullName?.split(' ')[0] || 'there'} — your {profession.name} registration for {meta.flag} {meta.country} is in review.
              </p>
            </div>
            <div className="w-full text-left p-4 rounded-2xl bg-green-50 border border-black/5 space-y-2.5">
              <p className="text-xs font-bold text-green-900 uppercase tracking-wider">What happens next</p>
              {[
                'Our compliance team verifies your details with the regulator',
                `We confirm your ${meta.vetting} and occupational health records`,
                'You get a verified badge — then you can apply for shifts',
              ].map((t, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-green-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <p className="text-xs text-slate-600 leading-relaxed">{t}</p>
                </div>
              ))}
            </div>
            <button onClick={onClose} className={`w-full ${primaryBtn}`}>Done</button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white px-6 pt-6 pb-4 border-b border-black/5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Locum registration</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Step {step + 1} of {STEPS.length} · {STEPS[step]}</p>
                </div>
                <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex gap-1.5">
                {STEPS.map((_, i) => (
                  <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= step ? 'bg-green-600' : 'bg-slate-100'}`} />
                ))}
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* ── Step 0 — Country + profession ── */}
              {step === 0 && (
                <div className="space-y-4">
                  <div>
                    <label className={labelCls}>Where will you work?</label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {(['IE', 'UK'] as RegRegion[]).map(r => {
                        const active = region === r;
                        return (
                          <button key={r} onClick={() => setRegion(r)} className={`p-3 rounded-xl border-2 text-left transition-all ${active ? 'border-green-600 bg-green-50' : 'border-black/5 bg-white hover:bg-slate-50'}`}>
                            <div className="text-2xl leading-none">{REGION_META[r].flag}</div>
                            <div className="text-sm font-bold text-slate-900 mt-1.5">{REGION_META[r].country}</div>
                            <div className="text-[10px] text-slate-500 mt-0.5">{REGION_META[r].vetting}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Your profession</label>
                    <div className="space-y-2">
                      {PROFESSION_CONFIG.map(p => {
                        const Icon = p.icon;
                        const active = professionKey === p.key;
                        const reg = p.regulator[region];
                        return (
                          <button key={p.key} onClick={() => setProfessionKey(p.key)} className={`w-full p-3 rounded-xl border-2 text-left flex items-center gap-3 transition-all ${active ? 'border-green-600 bg-green-50' : 'border-black/5 bg-white hover:bg-slate-50'}`}>
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${active ? 'bg-green-600' : 'bg-slate-100'}`}>
                              <Icon className={`w-4.5 h-4.5 ${active ? 'text-white' : 'text-slate-500'}`} />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-bold text-slate-900">{p.name}</div>
                              <div className="text-[10px] text-slate-500">{reg ? `Regulated by ${reg.acronym}` : 'Non-registered role · training verified'}</div>
                            </div>
                            {active && <Check className="w-4 h-4 text-green-600" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Account email</label>
                    <Field icon={Mail}><input value={form.email || ''} onChange={set('email')} placeholder="you@email.com" className={inputCls} /></Field>
                  </div>
                </div>
              )}

              {/* ── Step 1 — Personal details ── */}
              {step === 1 && (
                <div className="space-y-3">
                  <div>
                    <label className={labelCls}>Full name</label>
                    <Field icon={User}><input value={form.fullName || ''} onChange={set('fullName')} placeholder="First and last name" className={inputCls} /></Field>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className={labelCls}>Date of birth</label>
                      <Field icon={Calendar}><input type="date" value={form.dob || ''} onChange={set('dob')} className={inputCls} /></Field>
                    </div>
                    <div>
                      <label className={labelCls}>Mobile</label>
                      <Field icon={Phone}><input value={form.phone || ''} onChange={set('phone')} placeholder={region === 'IE' ? '+353 …' : '+44 …'} className={inputCls} /></Field>
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>City / town</label>
                    <Field icon={MapPin}><input value={form.city || ''} onChange={set('city')} placeholder={region === 'IE' ? 'e.g. Dublin' : 'e.g. London'} className={inputCls} /></Field>
                  </div>
                  <div>
                    <label className={labelCls}>{meta.nationalId}</label>
                    <Field icon={IdCard}><input value={form.nationalId || ''} onChange={set('nationalId')} placeholder={meta.nationalIdHint} className={inputCls} /></Field>
                  </div>
                  <div>
                    <label className={labelCls}>Right to work</label>
                    <div className="relative">
                      <select value={form.rightToWork || ''} onChange={set('rightToWork')} className="w-full appearance-none px-4 py-3 rounded-xl bg-slate-50 border border-black/5 text-sm text-slate-800 outline-none cursor-pointer">
                        <option value="">Select status…</option>
                        <option>{meta.rightToWork}</option>
                        <option>Visa sponsorship required</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>
              )}

              {/* ── Step 2 — Professional registration ── */}
              {step === 2 && (
                <div className="space-y-3">
                  {regulator ? (
                    <>
                      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-green-50 border border-black/5">
                        <ShieldCheck className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                        <p className="text-xs text-green-900 leading-relaxed">
                          As a {profession.name} in {meta.country}, you must hold active registration with the <span className="font-bold">{regulator.name} ({regulator.acronym})</span>.
                        </p>
                      </div>
                      <div>
                        <label className={labelCls}>{regulator.field} <span className="text-rose-500">*</span></label>
                        <Field icon={BadgeCheck}><input value={form.regNumber || ''} onChange={set('regNumber')} placeholder={regulator.hint} className={inputCls} /></Field>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50 border border-amber-200">
                      <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-800 leading-relaxed">
                        <span className="font-bold">No statutory register.</span> {profession.name}s aren't on a regulator register in {meta.country}, so we verify your training and experience instead ({region === 'IE' ? 'QQI Level 5' : 'Care Certificate'}).
                      </p>
                    </div>
                  )}
                  <div>
                    <label className={labelCls}>Specialisation <span className="text-rose-500">*</span></label>
                    <div className="relative">
                      <select value={form.specialisation || ''} onChange={set('specialisation')} className="w-full appearance-none px-4 py-3 rounded-xl bg-slate-50 border border-black/5 text-sm text-slate-800 outline-none cursor-pointer">
                        <option value="">Select…</option>
                        {profession.specialisations.map(s => <option key={s}>{s}</option>)}
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className={labelCls}>Years of experience</label>
                      <div className="relative">
                        <select value={form.experience || ''} onChange={set('experience')} className="w-full appearance-none px-4 py-3 rounded-xl bg-slate-50 border border-black/5 text-sm text-slate-800 outline-none cursor-pointer">
                          <option value="">Select…</option>
                          {['< 1 year', '1–3 years', '3–5 years', '5–10 years', '10+ years'].map(y => <option key={y}>{y}</option>)}
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Highest qualification</label>
                      <Field icon={Award}><input value={form.qualification || ''} onChange={set('qualification')} placeholder="e.g. BSc, MRCGP" className={inputCls} /></Field>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Step 3 — Compliance & documents ── */}
              {step === 3 && (
                <div className="space-y-3">
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50 border border-amber-200">
                    <FileText className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800 leading-relaxed">
                      <span className="font-bold">Confirm you can provide these.</span> Tick each item — you'll upload them to your compliance profile after registering. All are required before your first shift.
                    </p>
                  </div>
                  <div className="space-y-2">
                    {allDocs.map(d => {
                      const checked = confirmedDocs.includes(d);
                      return (
                        <button key={d} onClick={() => toggleDoc(d)} className={`w-full p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${checked ? 'border-green-600 bg-green-50' : 'border-black/5 bg-slate-50 hover:bg-slate-100'}`}>
                          <span className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border ${checked ? 'bg-green-600 border-green-600' : 'bg-white border-black/10'}`}>
                            {checked ? <Check className="w-3.5 h-3.5 text-white" /> : <Upload className="w-3 h-3 text-slate-400" />}
                          </span>
                          <span className="text-xs font-medium text-slate-700 leading-snug">{d}</span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-[10px] text-slate-400 text-center">{confirmedDocs.length}/{allDocs.length} confirmed</p>
                </div>
              )}

              {/* ── Step 4 — Review & submit ── */}
              {step === 4 && (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-black/5 overflow-hidden">
                    {[
                      { icon: Globe, label: 'Country', value: `${meta.flag} ${meta.country}` },
                      { icon: profession.icon, label: 'Profession', value: profession.name },
                      { icon: BadgeCheck, label: regulator ? regulator.field : 'Registration', value: regulator ? (form.regNumber || '—') : 'Non-registered role' },
                      { icon: Briefcase, label: 'Specialisation', value: form.specialisation || '—' },
                      { icon: User, label: 'Name', value: form.fullName || '—' },
                      { icon: Mail, label: 'Email', value: form.email || '—' },
                      { icon: IdCard, label: meta.nationalId, value: form.nationalId || '—' },
                      { icon: ShieldCheck, label: 'Vetting', value: meta.vetting },
                    ].map((row, i) => {
                      const Icon = row.icon;
                      return (
                        <div key={i} className={`flex items-center gap-3 px-4 py-2.5 ${i % 2 ? 'bg-white' : 'bg-slate-50'}`}>
                          <Icon className="w-4 h-4 text-slate-400 shrink-0" />
                          <span className="text-[11px] text-slate-500 w-32 shrink-0">{row.label}</span>
                          <span className="text-xs font-semibold text-slate-900 truncate">{row.value}</span>
                        </div>
                      );
                    })}
                  </div>
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input type="checkbox" checked={terms} onChange={e => setTerms(e.target.checked)} className="mt-0.5 accent-[#368B62] w-4 h-4" />
                    <span className="text-xs text-slate-600 leading-relaxed">
                      I confirm the information is accurate and agree to the <Link to="/policies/terms" target="_blank" className="font-semibold text-green-700 underline">Terms of Service</Link> and <Link to="/policies/privacy" target="_blank" className="font-semibold text-green-700 underline">Privacy Policy</Link>. I consent to MployUs verifying my registration and vetting.
                    </span>
                  </label>
                </div>
              )}
            </div>

            {/* Footer nav */}
            <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-black/5 flex items-center gap-2">
              {step > 0 && (
                <button onClick={() => setStep(s => s - 1)} className="px-4 py-3 text-sm font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1">
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
              )}
              {step < STEPS.length - 1 ? (
                <button disabled={!canContinue()} onClick={() => setStep(s => s + 1)} className={`flex-1 ${primaryBtn}`}>
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button disabled={!canContinue()} onClick={submit} className={`flex-1 ${primaryBtn}`}>
                  <BadgeCheck className="w-4 h-4" /> Submit registration
                </button>
              )}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default LocumRegistrationWizard;
