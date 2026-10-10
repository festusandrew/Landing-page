import { useMemo, useState, type ChangeEvent, type ComponentType, type ReactNode } from 'react';
import { Link } from 'react-router';
import { LocumDialog } from '../LocumDialog';
import { Award, BadgeCheck, Calendar, Check, CheckCircle2, ChevronLeft, ChevronRight, FileText, Globe, IdCard, Mail, MapPin, Phone, ShieldCheck, User } from 'lucide-react';
import {
  REG_COUNTRIES, REG_OCCUPATIONS, canContinueRegistration, clearRegistrationFields,
  getRegistrationRoute, getRoleOptions, type OccupationKey, type RegCountry,
} from '../../data/locumRegistration';

export type RegRegion = 'IE' | 'UK';
const STEPS = ['Profession', 'Personal', 'Registration', 'Compliance', 'Review'] as const;
const COMMON_DOCS = ['Photo identity evidence', 'Address and employment / reference evidence', 'Occupational health and immunisation requirements, where applicable'];
const OCCUPATION_CHECKS: Record<OccupationKey, string[]> = {
  pharmacist: ['Responsible-pharmacist duties and clinical-service / PGD competencies, where applicable'],
  gp: ['Appraisal / revalidation, appropriate licence or register division and medical indemnity'],
  nurse: ['Revalidation / competency evidence and moving-and-handling training, where applicable'],
  hca: ['Care qualifications / training, employer references and moving-and-handling competency'],
  optometrist: ['Optometry competencies, relevant scope of practice and CPD evidence'],
  dispenser: ['Dispensing qualification, employer competency authorisation and permitted duties'],
  trainee: ['Supervised training duties only; no independent pharmacist placement'],
  ahp: ['CPD portfolio and profession-specific competency evidence'],
  dentist: ['Dental indemnity and relevant CPD / competency evidence'],
};
const inputCls = 'bg-transparent text-sm outline-none w-full';
const selectCls = 'w-full rounded-xl border border-black/5 bg-slate-50 px-4 py-3 text-sm outline-none';
const labelCls = 'block text-xs font-semibold text-slate-600 mb-1.5';
const primaryBtn = 'py-3 bg-[#368B62] hover:bg-[#286d4c] disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5';

function Field({ icon: Icon, children }: { icon: ComponentType<{ className?: string }>; children: ReactNode }) {
  return <div className="flex items-center gap-2.5 rounded-xl border border-black/5 bg-slate-50 px-4 py-3 focus-within:bg-[#edf4ef]"><Icon className="size-4 shrink-0 text-slate-400" />{children}</div>;
}

export function LocumRegistrationWizard({ initialRegion = 'IE', onClose, onComplete }: {
  initialRegion?: RegRegion; onClose: () => void; onComplete?: (summary: Record<string, string>) => void;
}) {
  const [step, setStep] = useState(0);
  // A generic UK selection cannot safely choose a pharmacist's regulator.
  const [country, setCountry] = useState<RegCountry | ''>(initialRegion === 'IE' ? 'IE' : '');
  const [occupation, setOccupation] = useState<OccupationKey>('pharmacist');
  const [form, setForm] = useState<Record<string, string>>({});
  const [acknowledged, setAcknowledged] = useState<string[]>([]);
  const [terms, setTerms] = useState(false);
  const [done, setDone] = useState(false);
  const selectedCountry = country || 'EN';
  const meta = REG_COUNTRIES[selectedCountry];
  const profession = REG_OCCUPATIONS.find(item => item.key === occupation)!;
  const route = getRegistrationRoute(selectedCountry, occupation, form.registrationRole, form.specialisation === 'Accuracy Checking');
  const roleOptions = getRoleOptions(selectedCountry, occupation);
  const field = route.field;
  const set = (key: string) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm(previous => ({ ...previous, [key]: event.target.value }));

  function changeContext(nextCountry: RegCountry | '', nextOccupation: OccupationKey) {
    setCountry(nextCountry); setOccupation(nextOccupation);
    setForm(clearRegistrationFields); setAcknowledged([]); setTerms(false); setStep(0);
  }
  function changeRole(value: string) {
    setForm(previous => ({ ...previous, registrationRole: value, regNumber: '', qualification: '', trainingProvider: '', actEvidence: '' }));
    setAcknowledged([]); setTerms(false);
  }
  const allDocs = useMemo(() => [
    ...COMMON_DOCS,
    meta.vetting,
    ...(field?.kind === 'professional' ? [`${field.acronym} register status, identity match, scope and restrictions`] : []),
    ...(occupation === 'trainee' ? ['Training programme, placement, supervisor and current approval/status'] : []),
    ...(route.needsQualification ? ['Applicable qualification, training and employment evidence'] : []),
    ...(route.needsACTEvidence ? ['ACT qualification/accreditation, competency and employer authorisation'] : []),
    ...OCCUPATION_CHECKS[occupation],
    'Right-to-work evidence and role-appropriate indemnity / insurance requirements',
  ], [meta.vetting, field?.kind, field?.acronym, occupation, route.needsQualification, route.needsACTEvidence]);
  const detailsReady = Boolean(form.fullName?.trim() && form.dob && form.city?.trim() && form.rightToWork);
  const professionalReady = country && canContinueRegistration(country, occupation, form);
  const allAcknowledged = allDocs.every(document => acknowledged.includes(document));
  const emailReady = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email?.trim() || '');
  const canContinue = step === 0 ? Boolean(country && emailReady) : step === 1 ? detailsReady : step === 2 ? Boolean(professionalReady) : step === 3 ? allAcknowledged : Boolean(terms && detailsReady && professionalReady && allAcknowledged && emailReady);

  function submit() {
    if (!canContinue || !country) return;
    setDone(true);
    onComplete?.({
      region: meta.name, country: meta.name, countryCode: country, profession: profession.name,
      regulator: field?.acronym || 'Qualification / employer review',
      registrationRoute: form.registrationRole || (field?.kind === 'professional' ? 'professional' : 'qualification-review'),
      registrationField: field?.label || 'Qualification / employer review',
      registrationNumber: form.regNumber?.trim() || '',
      qualification: form.qualification?.trim() || '', trainingProvider: form.trainingProvider?.trim() || '',
      actEvidence: form.actEvidence?.trim() || '', verificationStatus: route.verificationStatus,
      name: form.fullName?.trim() || '', email: form.email?.trim() || '',
    });
  }
  const registrationSummary = field ? `${field.label}: ${form.regNumber?.trim() || 'Not issued / not supplied'}` : 'No universal professional number — alternative evidence review';

  return <LocumDialog onClose={onClose} closeLabel="Close locum registration" title={done ? 'Your registration preview is ready.' : 'A little more freedom starts here.'} description={done ? 'No account has been created. Your registration and eligibility remain unverified.' : `Step ${step + 1} of ${STEPS.length} · ${country ? meta.name : 'Choose your country'} · ${profession.name}`} headline={'Good care.\nOn your terms.'} steps={STEPS} currentStep={done ? STEPS.length : step}>
    {done ? <div className="space-y-5 px-7 py-9">
      <CheckCircle2 className="mx-auto size-14 text-[#368B62]" />
      <h3 className="text-center text-2xl font-medium">Registration preview complete</h3>
      <p className="text-center text-sm leading-7 text-slate-500">Thanks {form.fullName?.split(' ')[0] || 'there'}. Your {profession.name} details for {meta.name} have been prepared locally. Nothing has been submitted or checked against a live register.</p>
      <div className="space-y-3 rounded-xl bg-[#edf4ef] p-5"><p className="text-sm font-semibold">Verification still required</p><p className="text-xs leading-6 text-slate-600">{registrationSummary}</p><p className="text-xs leading-6 text-slate-600">{route.guidance}</p><p className="text-xs leading-6 text-slate-600">Before any placement, an authorised reviewer must confirm current registration/training status, identity, scope, restrictions, right to work and the applicable safeguarding and qualification checks. This preview does not grant a verified badge or permission to practise.</p></div>
      <button onClick={onClose} className={`w-full ${primaryBtn}`}>Done</button>
    </div> : <>
      <div className="space-y-5 p-6">
        <div><label htmlFor="locum-country" className={labelCls}>Where will you work? <span className="text-[#368B62]">*</span></label><select id="locum-country" value={country} onChange={event => changeContext(event.target.value as RegCountry | '', occupation)} className={selectCls}><option value="">Choose Ireland or a UK nation</option>{Object.entries(REG_COUNTRIES).map(([code, info]) => <option key={code} value={code}>{info.name}</option>)}</select><p className="mt-2 text-xs leading-6 text-slate-500">Select the country of practice, not nationality. England, Scotland and Wales share several regulators; Northern Ireland has a separate pharmacist register.</p></div>

        {step === 0 && <div className="space-y-4">
          <div><label htmlFor="locum-occupation" className={labelCls}>Your occupation <span className="text-[#368B62]">*</span></label><select id="locum-occupation" value={occupation} onChange={event => changeContext(country, event.target.value as OccupationKey)} className={selectCls}>{REG_OCCUPATIONS.map(item => <option key={item.key} value={item.key}>{item.name}</option>)}</select></div>
          {country && <div aria-live="polite" className="rounded-xl bg-[#edf4ef] p-4"><p className="text-xs font-semibold text-[#368B62]">{field ? `${field.acronym} · ${field.kind === 'training' ? 'Training-status review' : 'Professional registration'}` : 'Qualification / employer verification route'}</p><p className="mt-2 text-xs leading-6 text-slate-600">{route.guidance}</p></div>}
          <label className={labelCls}>Account email <Field icon={Mail}><input type="email" autoComplete="email" value={form.email || ''} onChange={set('email')} placeholder="you@email.com" className={inputCls} /></Field></label>
        </div>}

        {step === 1 && <div className="space-y-4">
          <label className={labelCls}>Full name <Field icon={User}><input autoComplete="name" value={form.fullName || ''} onChange={set('fullName')} placeholder="First and last name" className={inputCls} /></Field></label>
          <div className="grid gap-3 sm:grid-cols-2"><label className={labelCls}>Date of birth <Field icon={Calendar}><input type="date" autoComplete="bday" value={form.dob || ''} onChange={set('dob')} className={inputCls} /></Field></label><label className={labelCls}>Mobile (optional)<Field icon={Phone}><input type="tel" autoComplete="tel" value={form.phone || ''} onChange={set('phone')} placeholder={country === 'IE' ? '+353 …' : '+44 …'} className={inputCls} /></Field></label></div>
          <label className={labelCls}>City / town<Field icon={MapPin}><input autoComplete="address-level2" value={form.city || ''} onChange={set('city')} placeholder="Your city or town" className={inputCls} /></Field></label>
          <label className={labelCls}>Right to work<select value={form.rightToWork || ''} onChange={set('rightToWork')} className={`mt-2 ${selectCls}`}><option value="">Select status</option><option>{meta.rightToWork}</option><option>Visa sponsorship / eligibility review required</option></select></label>
          <label className={labelCls}>{meta.payrollId} (optional in this preview)<Field icon={IdCard}><input value={form.nationalId || ''} onChange={set('nationalId')} placeholder="Only provide if needed for onboarding" className={inputCls} /></Field></label>
          <p className="text-xs leading-6 text-slate-500">Payroll identifiers do not prove professional registration or permission to work. A live service should collect them only when necessary through a secure onboarding process.</p>
        </div>}

        {step === 2 && <div className="space-y-4">
          <div className="flex items-start gap-3 rounded-xl bg-[#edf4ef] p-4"><ShieldCheck className="mt-1 size-4 shrink-0 text-[#368B62]" /><div><p className="text-xs font-semibold">The right checks for your role</p><p className="mt-2 text-xs leading-6 text-slate-600">{route.guidance}</p></div></div>
          {roleOptions.length > 0 && <label className={labelCls}>{occupation === 'hca' ? 'Social-care registration for this specific role' : occupation === 'trainee' ? 'Training reference status' : 'Your dispensing / accuracy-checking role'} <span className="text-[#368B62]">*</span><select id="locum-registration-role" value={form.registrationRole || ''} onChange={event => changeRole(event.target.value)} className={`mt-2 ${selectCls}`}><option value="">Choose the applicable route</option>{roleOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>}
          {field && <div><label htmlFor="locum-registration-number" className={labelCls}>{field.label} {field.required ? <span className="text-[#368B62]">*</span> : '(optional)'}</label><Field icon={BadgeCheck}><input id="locum-registration-number" maxLength={100} value={form.regNumber || ''} onChange={set('regNumber')} placeholder="Enter the identifier exactly as issued" className={inputCls} aria-describedby="locum-registration-help" /></Field><p id="locum-registration-help" className="mt-2 text-xs leading-6 text-slate-500">Issuing / reviewing body: {field.body}. This field is collected, not verified.</p><a href={field.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-xs font-semibold text-[#368B62] underline">View official {field.acronym} guidance / register</a></div>}
          {route.needsQualification && <label className={labelCls}>{occupation === 'trainee' ? 'Training programme / qualification and current status' : 'Relevant qualification / training and experience'} <span className="text-[#368B62]">*</span><textarea value={form.qualification || ''} onChange={set('qualification')} maxLength={2000} rows={3} placeholder="Programme or qualification, awarding body and current status. Do not upload identity documents here." className={`mt-2 resize-y ${selectCls}`} /></label>}
          {occupation === 'trainee' && <label className={labelCls}>Training provider / university and placement <span className="text-[#368B62]">*</span><Field icon={Award}><input value={form.trainingProvider || ''} onChange={set('trainingProvider')} placeholder="Provider, placement and supervising pharmacist" className={inputCls} /></Field></label>}
          {route.needsACTEvidence && <label className={labelCls}>ACT qualification / accreditation and current competency <span className="text-[#368B62]">*</span><textarea value={form.actEvidence || ''} onChange={set('actEvidence')} rows={3} maxLength={2000} placeholder="Awarding body, qualification and employer competency authorisation. No universal ACT number is assumed." className={`mt-2 resize-y ${selectCls}`} /></label>}
          <label className={labelCls}>Specialisation <span className="text-[#368B62]">*</span><select value={form.specialisation || ''} onChange={set('specialisation')} className={`mt-2 ${selectCls}`}><option value="">Choose a specialisation</option>{profession.specialisations.map(item => <option key={item}>{item}</option>)}</select></label>
          <div className="grid gap-3 sm:grid-cols-2"><label className={labelCls}>Years of experience<select value={form.experience || ''} onChange={set('experience')} className={`mt-2 ${selectCls}`}><option value="">Select range</option>{['Less than 1 year', '1–3 years', '3–5 years', '5–10 years', '10+ years'].map(item => <option key={item}>{item}</option>)}</select></label>{!route.needsQualification && <label className={labelCls}>Highest qualification<Field icon={Award}><input value={form.qualification || ''} onChange={set('qualification')} placeholder="Qualification and awarding body" className={inputCls} /></Field></label>}</div>
          <p className="rounded-xl bg-slate-50 p-4 text-xs leading-6 text-slate-600">Verification pending. A number alone is not proof of approval. Live register checks and a compliance reviewer must confirm current status before any professional placement.</p>
        </div>}

        {step === 3 && <div className="space-y-4">
          <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-4"><FileText className="mt-1 size-4 shrink-0 text-[#368B62]" /><p className="text-xs leading-6 text-slate-600">Acknowledge the checks that need review. These are not document uploads or evidence of clearance. A reviewer must determine applicability, request evidence securely and resolve outstanding items before a placement.</p></div>
          <div className="space-y-2">{allDocs.map(document => <button key={document} aria-pressed={acknowledged.includes(document)} onClick={() => setAcknowledged(previous => previous.includes(document) ? previous.filter(item => item !== document) : [...previous, document])} className={`flex w-full items-start gap-3 rounded-xl border border-black/5 p-3 text-left ${acknowledged.includes(document) ? 'bg-[#edf4ef]' : 'bg-slate-50'}`}><span className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded ${acknowledged.includes(document) ? 'bg-[#368B62] text-white' : 'bg-white'}`}>{acknowledged.includes(document) && <Check size={14} />}</span><span className="text-xs leading-6">{document}</span></button>)}</div>
          <a href={meta.vettingUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-[#368B62] underline">Check official safeguarding requirements for {meta.name}</a>
          <p className="text-xs text-slate-500">{acknowledged.filter(item => allDocs.includes(item)).length}/{allDocs.length} checks acknowledged — no documents verified</p>
        </div>}

        {step === 4 && <div className="space-y-4">
          <dl className="space-y-3 rounded-xl bg-slate-50 p-4">{[['Country of practice', meta.name], ['Occupation', profession.name], ['Professional / training identifier', registrationSummary], ['Verification status', route.verificationStatus.replace(/-/g, ' ')], ['Specialisation', form.specialisation], ['Name', form.fullName], ['Email', form.email], ...(route.needsQualification ? [['Qualification / training', form.qualification]] : []), ...(occupation === 'trainee' ? [['Training provider', form.trainingProvider]] : []), ...(route.needsACTEvidence ? [['ACT evidence', form.actEvidence]] : []), ['Safeguarding checks', meta.vetting]].map(([label, value]) => <div key={label}><dt className="text-xs text-slate-500">{label}</dt><dd className="mt-1 break-words text-sm">{value || 'Not supplied'}</dd></div>)}</dl>
          <p className="text-xs leading-6 text-slate-600">{route.guidance}</p>
          <label className="flex items-start gap-3 text-xs leading-6"><input type="checkbox" checked={terms} onChange={event => setTerms(event.target.checked)} className="mt-1 size-4 shrink-0 accent-[#368B62]" /><span>I confirm these details are accurate and agree to the <Link to="/policies/terms" target="_blank" rel="noopener noreferrer" className="text-[#368B62] underline">Terms of Service</Link> and <Link to="/policies/privacy" target="_blank" rel="noopener noreferrer" className="text-[#368B62] underline">Privacy Policy</Link>. I understand this preview performs no live verification and does not authorise practice.</span></label>
        </div>}
      </div>
      <div className="sticky bottom-0 flex items-center gap-2 border-t border-black/5 bg-white px-6 py-4">{step > 0 && <button onClick={() => setStep(previous => previous - 1)} className="flex items-center gap-1 px-4 py-3 text-sm font-semibold text-slate-500"><ChevronLeft size={16} />Back</button>}<button disabled={!canContinue} onClick={step === STEPS.length - 1 ? submit : () => setStep(previous => previous + 1)} className={`flex-1 ${primaryBtn}`}>{step === STEPS.length - 1 ? 'Prepare registration preview' : 'Continue'}<ChevronRight size={16} /></button></div>
    </>}
  </LocumDialog>;
}

export default LocumRegistrationWizard;
