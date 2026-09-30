import React, { useState } from 'react';
import {
  Users, Clock, ShieldCheck, MapPin, CheckCircle2, ArrowRight, ArrowLeft, Star, Building2,
  Search, Calendar, Stethoscope, Briefcase, Mail, Lock, Linkedin, Phone, ChevronDown, ChevronRight,
  BookOpen, GraduationCap, Cookie, FileText, Award, PlusCircle, UserPlus, Check, Activity, Menu, X, LogIn,
  Apple, Play, Bell, Smartphone, Send, Zap, Wallet
} from 'lucide-react';
import { ImageWithFallback } from '../../app/components/figma/ImageWithFallback';

// Marketing imagery (Unsplash)
const IMG_HERO = 'https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';
const IMG_APP = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';
const GALLERY = [
  { src: 'https://images.unsplash.com/photo-1758691463384-771db2f192b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', alt: 'Locum doctor at a desk' },
  { src: 'https://images.unsplash.com/photo-1683520701495-1888fa4633b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', alt: 'Pharmacist in a community pharmacy' },
  { src: 'https://images.unsplash.com/photo-1594819159323-b72124baafaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', alt: 'Healthcare colleagues together' },
  { src: 'https://images.unsplash.com/photo-1612944095914-33fd0a85fcfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', alt: 'Nurse in uniform' }
];

interface LocumProvisionPageProps {
  onBackToHome: () => void;
  onBookDemo: (moduleTitle?: string) => void;
  onStartTrial: () => void;
}

type Profession = {
  name: string;
  reg: string | null;
  region: 'UK' | 'IE' | 'Both';
};

const PROFESSIONS: Profession[] = [
  { name: 'Locum GP', reg: 'GMC Number', region: 'UK' },
  { name: 'Locum GP (Ireland)', reg: 'IMC Number', region: 'IE' },
  { name: 'Agency Nurse', reg: 'NMBI Number', region: 'IE' },
  { name: 'Locum Optician', reg: 'CORU Registration Number', region: 'Both' },
  { name: 'Locum Pharmacist', reg: 'PSNI Number', region: 'Both' },
  { name: 'Agency HCA', reg: null, region: 'Both' },
  { name: 'Locum Pharmacy Technician', reg: null, region: 'Both' }
];

export const LocumProvisionPage: React.FC<LocumProvisionPageProps> = ({
  onBackToHome,
  onBookDemo,
  onStartTrial
}) => {
  // Shift search
  const [searchProfession, setSearchProfession] = useState('Locum Pharmacist');
  const [searchLocation, setSearchLocation] = useState('Dublin');

  // Employer posting wizard
  const [wizardStep, setWizardStep] = useState(1);
  const [postType, setPostType] = useState<'Locum Shift' | 'Permanent Job'>('Locum Shift');

  // Auth / onboarding
  const [role, setRole] = useState<'Locum' | 'Client' | null>(null);
  const [setupProfession, setSetupProfession] = useState<Profession>(PROFESSIONS[4]);
  const [smsCode, setSmsCode] = useState(['', '', '', '', '', '']);

  // FAQ
  const [faqRegion, setFaqRegion] = useState<'UK' | 'IE'>('IE');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Standalone platform navbar
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Auth modal
  const [authModal, setAuthModal] = useState<'signin' | 'signup' | null>(null);
  const [signupStep, setSignupStep] = useState<'role' | 'details' | 'verify'>('role');

  const openAuth = (mode: 'signin' | 'signup') => {
    setMobileNavOpen(false);
    setSignupStep('role');
    setAuthModal(mode);
  };

  const scrollToId = (id: string) => {
    setMobileNavOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const navLinks = [
    { id: 'find-shifts', label: 'Find Shifts' },
    { id: 'post-shift', label: 'Post a Shift' },
    { id: 'cpd', label: 'CPD' },
    { id: 'blog', label: 'Blog' },
    { id: 'faq', label: 'FAQ' }
  ];

  // Cookie banner
  const [cookieOpen, setCookieOpen] = useState(true);
  const [cookiePrefsOpen, setCookiePrefsOpen] = useState(false);
  const [cookiePrefs, setCookiePrefs] = useState({
    necessary: true,
    functional: true,
    performance: true,
    targeting: false
  });

  const shifts = [
    { facility: 'Boots Pharmacy — Grafton St', location: 'Dublin 2, IE', date: 'Mon 27 Jul', time: '09:00 – 18:00', rate: '€55/hr', urgent: true },
    { facility: 'McCabes Pharmacy', location: 'Cork City, IE', date: 'Tue 28 Jul', time: '08:30 – 17:30', rate: '€52/hr', urgent: false },
    { facility: 'LloydsPharmacy', location: 'Galway, IE', date: 'Wed 29 Jul', time: '10:00 – 19:00', rate: '€58/hr', urgent: true },
    { facility: 'Hickeys Pharmacy', location: 'Limerick, IE', date: 'Thu 30 Jul', time: '09:00 – 18:00', rate: '€50/hr', urgent: false }
  ];

  const articles = [
    { tag: 'Market Report', title: 'How Irish SMEs are rethinking recruitment in 2026', read: '6 min read' },
    { tag: 'Salary Guide', title: '2026 Locum Pharmacist pay rates: Ireland vs UK', read: '8 min read' },
    { tag: 'Compliance', title: 'The complete Garda vetting & DBS toolkit for employers', read: '11 min read' }
  ];

  const cpdCourses = [
    { title: 'Antimicrobial Stewardship', hours: '3 CPD hours', icon: Award },
    { title: 'Safeguarding Adults at Risk', hours: '2 CPD hours', icon: ShieldCheck },
    { title: 'Emergency Contraception Consultation', hours: '4 CPD hours', icon: GraduationCap }
  ];

  const faqs = {
    IE: [
      { q: 'What commission does MployUs Locums charge in Ireland?', a: 'Locums keep 100% of their advertised rate. Clients pay a flat platform fee per filled shift — no percentage commissions and no hidden agency margins.' },
      { q: 'How and when do locums get paid?', a: 'Timesheets are approved in-app after each shift. Payments are processed weekly by SEPA transfer, typically within 3 working days of approval.' },
      { q: 'What is the cancellation policy?', a: 'Shifts cancelled more than 48 hours in advance are free. Late cancellations inside 24 hours may incur a fee to protect the other party.' },
      { q: 'Do I need Garda vetting?', a: 'Yes. All Irish healthcare locums must complete Garda vetting, which we facilitate and store securely in your compliance vault.' }
    ],
    UK: [
      { q: 'What commission does MployUs Locums charge in the UK & NI?', a: 'The same transparent model applies: locums keep 100% of their rate and clients pay a flat per-shift fee with no percentage commissions.' },
      { q: 'How and when do locums get paid?', a: 'Payments are processed weekly by Faster Payments, usually within 2 working days of timesheet approval.' },
      { q: 'What is the cancellation policy?', a: 'Cancellations more than 48 hours ahead are free; late cancellations within 24 hours may be charged to the cancelling party.' },
      { q: 'Do I need a DBS check?', a: 'Yes. UK & NI locums require an Enhanced DBS check, which we facilitate and store in your digital compliance vault.' }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16 animate-fade-in font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Standalone Platform Navbar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button onClick={() => scrollToId('find-shifts')} className="flex items-center gap-2 text-left">
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                <Activity className="w-4 h-4 text-blue-400" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-base font-extrabold tracking-tight text-slate-900">
                  MployUs <span className="text-blue-600">Locums</span>
                </span>
                <span className="text-[9px] uppercase tracking-wider text-slate-500 font-medium mt-0.5">Ireland & UK</span>
              </div>
            </button>

            {/* Center nav */}
            <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-slate-700">
              {navLinks.map(l => (
                <button key={l.id} onClick={() => scrollToId(l.id)} className="hover:text-slate-900 transition-colors">
                  {l.label}
                </button>
              ))}
            </nav>

            {/* Auth buttons */}
            <div className="hidden lg:flex items-center gap-2">
              <button onClick={onBackToHome} className="text-[11px] font-semibold text-slate-400 hover:text-slate-700 transition-colors mr-1">
                MployUs.com
              </button>
              <button
                onClick={() => openAuth('signin')}
                className="px-4 py-2 text-xs font-semibold text-slate-900 border border-black/10 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5" /> Sign In
              </button>
              <button
                onClick={() => openAuth('signup')}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
              >
                Sign Up
              </button>
            </div>

            {/* Mobile toggle */}
            <button className="lg:hidden p-2 text-slate-700" onClick={() => setMobileNavOpen(o => !o)}>
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileNavOpen && (
          <div className="lg:hidden border-t border-black/10 bg-white px-4 py-4 space-y-1 animate-fade-in">
            {navLinks.map(l => (
              <button key={l.id} onClick={() => scrollToId(l.id)} className="block w-full text-left py-2 text-sm font-semibold text-slate-700 hover:text-slate-900">
                {l.label}
              </button>
            ))}
            <div className="flex items-center gap-2 pt-3">
              <button onClick={() => openAuth('signin')} className="flex-1 py-2.5 text-xs font-semibold text-slate-900 border border-black/10 rounded-lg">Sign In</button>
              <button onClick={() => openAuth('signup')} className="flex-1 py-2.5 text-xs font-semibold text-white bg-slate-900 rounded-lg">Sign Up</button>
            </div>
            <button onClick={onBackToHome} className="block w-full text-left py-2 text-[11px] font-semibold text-slate-400">← Back to MployUs.com</button>
          </div>
        )}
      </header>

      {/* HERO + SHIFT SEARCH */}
      <section id="find-shifts" className="pt-28 lg:pt-32 pb-14 lg:pb-20 bg-white border-b border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            {/* Left: copy */}
            <div className="space-y-5">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
                <Users className="w-3.5 h-3.5" /> Healthcare Locum Marketplace
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.08]">
                Browse & apply for flexible healthcare shifts near you
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-xl">
                MployUs Locums connects pharmacists, GPs, nurses, opticians and healthcare assistants with pharmacies and clinics needing temporary cover — flexible shifts, transparent pay, zero agency margins.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button onClick={() => scrollToId('post-shift')} className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors shadow-2xs flex items-center gap-2">
                  Post a shift <ArrowRight className="w-4 h-4 text-slate-300" />
                </button>
                <button onClick={() => openAuth('signup')} className="px-6 py-3.5 bg-white text-slate-900 font-semibold text-xs rounded-lg border border-black/10 hover:bg-slate-50 transition-colors">
                  Create free account
                </button>
              </div>
            </div>

            {/* Right: image with floating stats */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden border border-black/10 shadow-sm">
                <ImageWithFallback src={IMG_HERO} alt="Healthcare professional ready for a locum shift" className="w-full h-72 sm:h-96 object-cover" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white border border-black/10 rounded-2xl shadow-sm px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center"><Building2 className="w-4 h-4" /></div>
                <div className="leading-none">
                  <div className="text-lg font-extrabold text-slate-900">25+</div>
                  <div className="text-[10px] text-slate-500 font-medium mt-0.5">Partner facilities</div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white border border-black/10 rounded-2xl shadow-sm px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center"><Users className="w-4 h-4" /></div>
                <div className="leading-none">
                  <div className="text-lg font-extrabold text-slate-900">140+</div>
                  <div className="text-[10px] text-slate-500 font-medium mt-0.5">Registered pros</div>
                </div>
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div className="max-w-5xl mx-auto mt-12 lg:mt-16 bg-white border border-black/10 rounded-2xl shadow-sm p-3 grid grid-cols-1 md:grid-cols-4 gap-2">
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-50 border border-black/10">
              <Stethoscope className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={searchProfession}
                onChange={(e) => setSearchProfession(e.target.value)}
                className="bg-transparent text-xs font-semibold text-slate-800 w-full outline-none cursor-pointer"
              >
                {PROFESSIONS.map(p => <option key={p.name}>{p.name}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-50 border border-black/10">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                placeholder="Location"
                className="bg-transparent text-xs font-semibold text-slate-800 w-full outline-none placeholder:text-slate-400"
              />
            </div>
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-50 border border-black/10">
              <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
              <input type="date" className="bg-transparent text-xs font-semibold text-slate-600 w-full outline-none" />
            </div>
            <button className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2">
              <Search className="w-4 h-4" /> Search Shifts
            </button>
          </div>
        </div>
      </section>

      {/* SHIFT RESULTS + IRELAND MAP */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Available now</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">{searchProfession} shifts near {searchLocation}</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {shifts.map((s) => (
              <div key={s.facility} className="p-5 rounded-xl bg-white border border-black/10 shadow-2xs flex items-center justify-between gap-4">
                <div className="space-y-1">
                  {s.urgent && (
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-200">Urgent</span>
                  )}
                  <h4 className="text-sm font-bold text-slate-900">{s.facility}</h4>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500 font-medium">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {s.location}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {s.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {s.time}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-lg font-extrabold text-slate-900">{s.rate}</div>
                  <button
                    onClick={() => onBookDemo(`Shift: ${s.facility}`)}
                    className="mt-1 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-semibold rounded-md transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Stylised Ireland map */}
          <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-slate-50 border border-black/10 shadow-2xs p-5 relative overflow-hidden min-h-[320px]">
            <div className="text-xs font-bold text-slate-700 mb-2">Live shift map — Ireland</div>
            <div className="relative h-full">
              <svg viewBox="0 0 200 240" className="w-full h-64 mx-auto opacity-90" aria-hidden>
                <path
                  d="M95 15 C120 18 130 35 138 55 C150 70 160 90 152 115 C160 135 150 160 135 175 C140 195 120 215 95 220 C70 225 55 205 50 185 C35 175 30 150 42 130 C32 110 40 85 55 70 C58 45 70 20 95 15 Z"
                  fill="#dbeafe"
                  stroke="#93c5fd"
                  strokeWidth="2"
                />
              </svg>
              {/* Pins */}
              {[
                { top: '28%', left: '62%', label: 'Dublin' },
                { top: '62%', left: '40%', label: 'Cork' },
                { top: '40%', left: '28%', label: 'Galway' },
                { top: '58%', left: '30%', label: 'Limerick' }
              ].map((pin) => (
                <div key={pin.label} className="absolute -translate-x-1/2 -translate-y-full flex flex-col items-center" style={{ top: pin.top, left: pin.left }}>
                  <span className="text-[9px] font-bold text-slate-700 bg-white/90 px-1.5 py-0.5 rounded border border-black/10 mb-0.5 whitespace-nowrap">{pin.label}</span>
                  <MapPin className="w-5 h-5 text-blue-600 fill-blue-200" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONNECT QUICKLY FEATURE */}
      <section className="py-14 bg-white border-y border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="rounded-3xl overflow-hidden border border-black/10 shadow-sm order-last lg:order-first">
            <ImageWithFallback src={GALLERY[1].src} alt={GALLERY[1].alt} className="w-full h-72 sm:h-80 object-cover" />
          </div>
          <div className="space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Matched in minutes</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Connect quickly to the right job</h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-lg">
              Tell us your profession, availability and preferred locations. We surface the shifts that fit — with the rate, distance and requirements up front — so you can apply in a single tap.
            </p>
            <ul className="space-y-3">
              {[
                { icon: Zap, text: 'Instant shift matching based on your profile' },
                { icon: Wallet, text: 'Transparent pay — keep 100% of your rate' },
                { icon: ShieldCheck, text: 'Verified employers, Garda-vetted & DBS-checked' }
              ].map(item => {
                const Icon = item.icon;
                return (
                  <li key={item.text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0"><Icon className="w-4 h-4" /></div>
                    <span className="text-sm font-medium text-slate-700">{item.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* HEALTHCARE PHOTO GALLERY */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">One community</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Trusted by healthcare professionals across Ireland & the UK</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {GALLERY.map(g => (
            <div key={g.alt} className="rounded-2xl overflow-hidden border border-black/10 shadow-2xs">
              <ImageWithFallback src={g.src} alt={g.alt} className="w-full h-48 sm:h-56 object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* EMPLOYER SHIFT POSTING WIZARD */}
      <section id="post-shift" className="py-14 bg-white border-y border-black/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-violet-700">For employers</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Post an open shift in 3 steps</h2>
          </div>

          {/* Stepper */}
          <div className="flex items-center justify-between mb-6">
            {['Shift Type', 'Shift Details', 'Contact Details'].map((label, i) => {
              const step = i + 1;
              const active = wizardStep === step;
              const done = wizardStep > step;
              return (
                <React.Fragment key={label}>
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border ${
                      done ? 'bg-blue-600 text-white border-blue-600' : active ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-400 border-black/10'
                    }`}>
                      {done ? <Check className="w-4 h-4" /> : step}
                    </div>
                    <span className={`text-xs font-semibold hidden sm:inline ${active || done ? 'text-slate-900' : 'text-slate-400'}`}>{label}</span>
                  </div>
                  {i < 2 && <div className="flex-1 h-px bg-black/10 mx-2" />}
                </React.Fragment>
              );
            })}
          </div>

          <div className="bg-slate-50 border border-black/10 rounded-2xl p-6 shadow-2xs space-y-5">
            {wizardStep === 1 && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900">What are you posting?</h4>
                <div className="grid grid-cols-2 gap-3">
                  {(['Locum Shift', 'Permanent Job'] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => setPostType(t)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        postType === t ? 'bg-white border-slate-900 shadow-xs' : 'bg-white border-black/10 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {t === 'Locum Shift' ? <Clock className="w-4 h-4 text-blue-600" /> : <Briefcase className="w-4 h-4 text-violet-600" />}
                        <span className="text-sm font-bold text-slate-900">{t}</span>
                      </div>
                      <p className="text-[11px] text-slate-500">{t === 'Locum Shift' ? 'Temporary cover for one or more days' : 'A full-time or part-time permanent role'}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {wizardStep === 2 && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900">Shift details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input placeholder="Profession required" className="px-3 py-2.5 rounded-xl bg-white border border-black/10 text-xs outline-none" />
                  <input placeholder="Hourly rate (€ / £)" className="px-3 py-2.5 rounded-xl bg-white border border-black/10 text-xs outline-none" />
                  <input type="date" className="px-3 py-2.5 rounded-xl bg-white border border-black/10 text-xs text-slate-600 outline-none" />
                  <input placeholder="Location" className="px-3 py-2.5 rounded-xl bg-white border border-black/10 text-xs outline-none" />
                </div>
                <textarea placeholder="Description & requirements" rows={3} className="w-full px-3 py-2.5 rounded-xl bg-white border border-black/10 text-xs outline-none resize-none" />
              </div>
            )}

            {wizardStep === 3 && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900">Contact details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input placeholder="Facility name" className="px-3 py-2.5 rounded-xl bg-white border border-black/10 text-xs outline-none" />
                  <input placeholder="Contact name" className="px-3 py-2.5 rounded-xl bg-white border border-black/10 text-xs outline-none" />
                  <input placeholder="Email" className="px-3 py-2.5 rounded-xl bg-white border border-black/10 text-xs outline-none" />
                  <input placeholder="Phone" className="px-3 py-2.5 rounded-xl bg-white border border-black/10 text-xs outline-none" />
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setWizardStep(s => Math.max(1, s - 1))}
                disabled={wizardStep === 1}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-40 transition-colors"
              >
                Back
              </button>
              {wizardStep < 3 ? (
                <button
                  onClick={() => setWizardStep(s => Math.min(3, s + 1))}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => onBookDemo(`Post ${postType}`)}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                >
                  Publish {postType} <PlusCircle className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROP / RECRUITMENT LANDING */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Why MployUs Locums</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2">Flexible work, trusted employers</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { value: '140+', label: 'Registered professionals' },
            { value: '2 countries', label: 'Ireland & the UK' },
            { value: '0%', label: 'Agency commission' },
            { value: '< 2 hrs', label: 'Avg. shift fill time' }
          ].map(stat => (
            <div key={stat.label} className="p-5 rounded-2xl bg-white border border-black/10 shadow-2xs text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">{stat.value}</div>
              <div className="text-[11px] text-slate-500 font-medium mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Aoife N.', role: 'Locum Pharmacist, Dublin', quote: 'I pick the shifts that fit my week and get paid the full rate — no agency taking a cut.' },
            { name: 'James O.', role: 'Agency Nurse, Belfast', quote: 'Onboarding took ten minutes and my NMBI details were verified the same day.' },
            { name: 'Pharmacy Lead', role: 'McCabes, Cork', quote: 'We fill last-minute cover before lunch. It has completely replaced our old agency.' }
          ].map(t => (
            <div key={t.name} className="p-6 rounded-2xl bg-white border border-black/10 shadow-2xs space-y-3">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
              </div>
              <p className="text-sm text-slate-800 leading-relaxed">"{t.quote}"</p>
              <div className="text-[11px] text-slate-500"><span className="font-semibold text-slate-700">{t.name}</span> · {t.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* BLOG / CONTENT HUB */}
      <section id="blog" className="py-14 bg-white border-y border-black/10 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> Content hub</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Guides, salary reports & market insights</h2>
            </div>
            <button onClick={() => onBookDemo('Blog')} className="hidden sm:flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-slate-900">
              View all <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {articles.map(a => (
              <button
                key={a.title}
                onClick={() => onBookDemo(`Article: ${a.title}`)}
                className="p-5 rounded-2xl bg-slate-50 border border-black/10 shadow-2xs text-left hover:border-slate-300 transition-all group"
              >
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-200 mb-3">{a.tag}</span>
                <h4 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-blue-700 transition-colors">{a.title}</h4>
                <p className="text-[11px] text-slate-500 mt-2">{a.read}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CPD TRAINING */}
      <section id="cpd" className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-16">
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 space-y-6 border border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider">
            <GraduationCap className="w-4 h-4" /> Locums CPD
          </div>
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Keep your registration current with CPD</h2>
            <p className="text-sm text-slate-300 mt-2">Accredited courses, assessments and certificates — earn Continuing Professional Development hours between shifts.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cpdCourses.map(c => {
              const Icon = c.icon;
              return (
                <div key={c.title} className="p-5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
                  <Icon className="w-6 h-6 text-blue-400" />
                  <h4 className="text-sm font-bold text-white">{c.title}</h4>
                  <p className="text-[11px] text-slate-400">{c.hours}</p>
                </div>
              );
            })}
          </div>
          <button onClick={() => onBookDemo('CPD Training')} className="px-6 py-3 bg-white text-slate-900 font-semibold text-xs rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1.5">
            Browse all courses <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* MOBILE APP PROMO */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 text-white overflow-hidden border border-blue-700 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="p-8 sm:p-12 space-y-5">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold uppercase tracking-wider">
                <Smartphone className="w-3.5 h-3.5" /> Our Locum Mobile App
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">Book shifts on the go</h2>
              <p className="text-sm text-blue-50 leading-relaxed max-w-md">
                Get instant push notifications for new shifts near you, apply in one tap, submit timesheets, and track weekly payments — all from your phone.
              </p>
              <ul className="space-y-2">
                {[
                  { icon: Bell, text: 'Real-time shift alerts' },
                  { icon: Check, text: 'One-tap apply & in-app timesheets' },
                  { icon: Wallet, text: 'Weekly payment tracking' }
                ].map(f => {
                  const Icon = f.icon;
                  return (
                    <li key={f.text} className="flex items-center gap-2.5 text-sm text-blue-50">
                      <Icon className="w-4 h-4 text-white shrink-0" /> {f.text}
                    </li>
                  );
                })}
              </ul>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button onClick={() => onBookDemo('iOS App')} className="flex items-center gap-2.5 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl border border-white/10 transition-colors">
                  <Apple className="w-5 h-5" />
                  <span className="text-left leading-none">
                    <span className="block text-[9px] text-slate-300">Download on the</span>
                    <span className="block text-xs font-bold">App Store</span>
                  </span>
                </button>
                <button onClick={() => onBookDemo('Android App')} className="flex items-center gap-2.5 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl border border-white/10 transition-colors">
                  <Play className="w-5 h-5 fill-current" />
                  <span className="text-left leading-none">
                    <span className="block text-[9px] text-slate-300">Get it on</span>
                    <span className="block text-xs font-bold">Google Play</span>
                  </span>
                </button>
              </div>
            </div>
            <div className="relative h-full min-h-[320px] flex items-center justify-center p-8">
              <div className="rounded-3xl overflow-hidden border-4 border-white/20 shadow-sm w-52 sm:w-60 aspect-[9/19] bg-slate-900">
                <ImageWithFallback src={IMG_APP} alt="Healthcare professional using the MployUs Locums app" className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-10 right-6 bg-white text-slate-900 rounded-2xl shadow-sm px-3 py-2 flex items-center gap-2 border border-black/10">
                <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center"><Bell className="w-3.5 h-3.5" /></div>
                <div className="leading-none">
                  <div className="text-[10px] font-bold">New shift nearby</div>
                  <div className="text-[9px] text-slate-500 mt-0.5">€58/hr · Galway</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-14 bg-white border-y border-black/10 scroll-mt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Frequently asked questions</h2>
            <div className="inline-flex items-center gap-1 bg-slate-100 p-1 rounded-full border border-black/10 text-xs mt-4">
              {(['IE', 'UK'] as const).map(r => (
                <button
                  key={r}
                  onClick={() => { setFaqRegion(r); setOpenFaq(0); }}
                  className={`px-4 py-1.5 rounded-full font-semibold transition-all ${
                    faqRegion === r ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {r === 'IE' ? 'Ireland' : 'UK & NI'}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            {faqs[faqRegion].map((f, i) => (
              <div key={f.q} className="rounded-xl bg-slate-50 border border-black/10 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-3 p-4 text-left"
                >
                  <span className="text-sm font-semibold text-slate-900">{f.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed animate-fade-in">{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEGAL NOTE */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-2xl bg-white border border-black/10 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-700 border border-black/10 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-slate-900">Garda vetting & DBS checks</h4>
            <p className="text-xs text-slate-600 mt-1">Every locum is compliance-checked before their first shift — Garda vetting in Ireland and Enhanced DBS in the UK & NI. Read our full guide for employers, terms & conditions and privacy policy.</p>
          </div>
          <button onClick={() => onBookDemo('Legal & Compliance')} className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors shrink-0">
            Read the guide
          </button>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-2xl bg-slate-900 text-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-2">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Join MployUs Locums</span>
            <h3 className="text-2xl font-bold text-white">Start finding — or filling — shifts today</h3>
            <p className="text-xs text-slate-300">Free to join in Ireland and the UK, with zero agency commission.</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button onClick={() => openAuth('signup')} className="px-6 py-3 bg-white text-slate-900 font-semibold text-xs rounded-md hover:bg-slate-100 transition-colors shadow-2xs">
              Create free account
            </button>
            <button onClick={onBackToHome} className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-md border border-slate-700 transition-colors">
              Back to Overview
            </button>
          </div>
        </div>
      </section>

      {/* STANDALONE FOOTER */}
      <footer className="mt-14 bg-slate-900 text-slate-300">
        {/* Newsletter */}
        <div className="border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Get new shifts in your inbox</h3>
              <p className="text-xs text-slate-400">Weekly shift digests and rate updates for Ireland & the UK. No spam.</p>
            </div>
            <form
              onSubmit={(e) => { e.preventDefault(); onBookDemo('Newsletter'); }}
              className="flex items-center gap-2 w-full md:w-auto"
            >
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/10 border border-white/10 flex-1 md:w-72">
                <Mail className="w-4 h-4 text-slate-400" />
                <input type="email" required placeholder="you@email.com" className="bg-transparent text-xs text-white w-full outline-none placeholder:text-slate-500" />
              </div>
              <button type="submit" className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5">
                Subscribe <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center">
                <Activity className="w-4 h-4 text-blue-400" />
              </div>
              <span className="text-base font-extrabold text-white">MployUs <span className="text-blue-400">Locums</span></span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">The healthcare locum marketplace for Ireland & the UK. Flexible shifts, transparent pay, zero agency commission.</p>
          </div>
          <div className="space-y-2">
            <div className="text-xs font-bold text-white uppercase tracking-wider mb-1">Platform</div>
            {navLinks.map(l => (
              <button key={l.id} onClick={() => scrollToId(l.id)} className="block text-xs text-slate-400 hover:text-white transition-colors">{l.label}</button>
            ))}
          </div>
          <div className="space-y-2">
            <div className="text-xs font-bold text-white uppercase tracking-wider mb-1">Account</div>
            <button onClick={() => openAuth('signin')} className="block text-xs text-slate-400 hover:text-white transition-colors">Sign In</button>
            <button onClick={() => openAuth('signup')} className="block text-xs text-slate-400 hover:text-white transition-colors">Sign Up</button>
            <button onClick={() => openAuth('signup')} className="block text-xs text-slate-400 hover:text-white transition-colors">Register a Facility</button>
          </div>
          <div className="space-y-2">
            <div className="text-xs font-bold text-white uppercase tracking-wider mb-1">Legal</div>
            <button onClick={() => onBookDemo('Legal & Compliance')} className="block text-xs text-slate-400 hover:text-white transition-colors">Terms & Conditions</button>
            <button onClick={() => onBookDemo('Legal & Compliance')} className="block text-xs text-slate-400 hover:text-white transition-colors">Privacy Policy</button>
            <button onClick={() => onBookDemo('Legal & Compliance')} className="block text-xs text-slate-400 hover:text-white transition-colors">Garda Vetting & DBS</button>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
            <span>© 2026 MployUs Locums. All rights reserved.</span>
            <button onClick={onBackToHome} className="hover:text-white transition-colors">← Back to MployUs.com</button>
          </div>
        </div>
      </footer>

      {/* AUTH MODAL */}
      {authModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm animate-fade-in" onClick={() => setAuthModal(null)} />
          <div className="relative w-full max-w-md bg-white border border-black/10 rounded-2xl shadow-sm max-h-[90vh] overflow-y-auto animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                  <Activity className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-sm font-extrabold tracking-tight text-slate-900">MployUs <span className="text-blue-600">Locums</span></span>
              </div>
              <button onClick={() => setAuthModal(null)} className="p-1.5 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {authModal === 'signin' ? (
                /* SIGN IN */
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Welcome back</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Log in to your MployUs Locums account.</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-50 border border-black/10">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <input placeholder="Email address" className="bg-transparent text-xs w-full outline-none" />
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-50 border border-black/10">
                      <Lock className="w-4 h-4 text-slate-400" />
                      <input type="password" placeholder="Password" className="bg-transparent text-xs w-full outline-none" />
                    </div>
                    <button onClick={() => onBookDemo('Sign In')} className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors">Log In</button>
                    <div className="flex items-center gap-3 text-[10px] text-slate-400 uppercase tracking-wider">
                      <div className="flex-1 h-px bg-black/10" /> or <div className="flex-1 h-px bg-black/10" />
                    </div>
                    <button className="w-full py-2.5 bg-[#0a66c2] hover:bg-[#0959aa] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                      <Linkedin className="w-4 h-4" /> Continue with LinkedIn
                    </button>
                  </div>
                  <p className="text-center text-[11px] text-slate-500">
                    New to MployUs Locums?{' '}
                    <button onClick={() => { setSignupStep('role'); setAuthModal('signup'); }} className="font-semibold text-blue-700 hover:underline">Create an account</button>
                  </p>
                </div>
              ) : (
                /* SIGN UP */
                <div className="space-y-4">
                  {/* Step indicator */}
                  <div className="flex items-center gap-1.5">
                    {(['role', 'details', 'verify'] as const).map((s, i) => {
                      const order = ['role', 'details', 'verify'];
                      const active = order.indexOf(signupStep) >= i;
                      return <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors ${active ? 'bg-blue-600' : 'bg-slate-200'}`} />;
                    })}
                  </div>

                  {signupStep === 'role' && (
                    <div className="space-y-4 animate-fade-in">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">Choose your account type</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Tell us how you'll use MployUs Locums.</p>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        {([
                          { key: 'Locum', icon: Stethoscope, desc: 'A healthcare professional looking for shifts' },
                          { key: 'Client', icon: Building2, desc: 'A pharmacy or facility posting shifts' }
                        ] as const).map(r => {
                          const Icon = r.icon;
                          const active = role === r.key;
                          return (
                            <button
                              key={r.key}
                              onClick={() => setRole(r.key)}
                              className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3 ${
                                active ? 'bg-blue-50 border-blue-500 shadow-xs' : 'bg-white border-black/10 hover:border-slate-300'
                              }`}
                            >
                              <Icon className={`w-6 h-6 mt-0.5 ${active ? 'text-blue-600' : 'text-slate-500'}`} />
                              <div>
                                <div className="text-sm font-bold text-slate-900">Register as a {r.key}</div>
                                <p className="text-[11px] text-slate-500 mt-0.5">{r.desc}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                      <button
                        disabled={!role}
                        onClick={() => setSignupStep('details')}
                        className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                      >
                        Continue <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {signupStep === 'details' && (
                    <div className="space-y-3 animate-fade-in">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">Account setup</h3>
                        <p className="text-xs text-slate-500 mt-0.5">The form adapts to your profession and its registration body.</p>
                      </div>
                      {role === 'Locum' && (
                        <>
                          <label className="block text-xs font-semibold text-slate-700">Your profession</label>
                          <div className="relative">
                            <select
                              value={setupProfession.name}
                              onChange={(e) => setSetupProfession(PROFESSIONS.find(p => p.name === e.target.value)!)}
                              className="w-full appearance-none px-3 py-2.5 rounded-xl bg-white border border-black/10 text-xs font-semibold text-slate-800 outline-none cursor-pointer"
                            >
                              {PROFESSIONS.map(p => <option key={p.name}>{p.name}</option>)}
                            </select>
                            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                        </>
                      )}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input placeholder={role === 'Client' ? 'Facility name' : 'Full name'} className="px-3 py-2.5 rounded-xl bg-white border border-black/10 text-xs outline-none" />
                        <input placeholder="Email" className="px-3 py-2.5 rounded-xl bg-white border border-black/10 text-xs outline-none" />
                      </div>
                      {role === 'Locum' && (setupProfession.reg ? (
                        <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 space-y-2 animate-fade-in">
                          <label className="block text-xs font-bold text-blue-800">{setupProfession.reg} <span className="text-rose-600">*</span></label>
                          <input placeholder={`Enter your ${setupProfession.reg}`} className="w-full px-3 py-2.5 rounded-lg bg-white border border-blue-200 text-xs outline-none" />
                          <p className="text-[10px] text-blue-700">Required for {setupProfession.name} · {setupProfession.region === 'IE' ? 'Ireland' : setupProfession.region === 'UK' ? 'UK & NI' : 'Ireland & UK'}</p>
                        </div>
                      ) : (
                        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 animate-fade-in">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <p className="text-[11px] text-emerald-800 font-medium">No professional registration number required for {setupProfession.name}.</p>
                        </div>
                      ))}
                      <input placeholder="Mobile number" className="w-full px-3 py-2.5 rounded-xl bg-white border border-black/10 text-xs outline-none" />
                      <div className="flex items-center gap-2 pt-1">
                        <button onClick={() => setSignupStep('role')} className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors">Back</button>
                        <button onClick={() => setSignupStep('verify')} className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5">
                          <UserPlus className="w-4 h-4" /> Create account
                        </button>
                      </div>
                    </div>
                  )}

                  {signupStep === 'verify' && (
                    <div className="flex flex-col items-center text-center space-y-4 animate-fade-in py-2">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">Verify your phone</h3>
                        <p className="text-xs text-slate-500 mt-1">Enter the 6-digit code we texted to your mobile.</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {smsCode.map((digit, i) => (
                          <input
                            key={i}
                            value={digit}
                            maxLength={1}
                            onChange={(e) => {
                              const next = [...smsCode];
                              next[i] = e.target.value.replace(/\D/g, '');
                              setSmsCode(next);
                              if (e.target.value && e.target.nextElementSibling) {
                                (e.target.nextElementSibling as HTMLInputElement).focus();
                              }
                            }}
                            className="w-11 h-12 text-center text-lg font-bold rounded-xl bg-white border border-black/10 outline-none focus:border-blue-500 transition-colors"
                          />
                        ))}
                      </div>
                      <button
                        onClick={() => { onBookDemo('Account created'); setAuthModal(null); }}
                        className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
                      >
                        Verify & Continue
                      </button>
                      <button className="text-[11px] text-slate-500 hover:text-slate-900 font-medium">Resend code</button>
                    </div>
                  )}

                  {signupStep === 'role' && (
                    <p className="text-center text-[11px] text-slate-500">
                      Already have an account?{' '}
                      <button onClick={() => setAuthModal('signin')} className="font-semibold text-blue-700 hover:underline">Sign in</button>
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* COOKIE CONSENT BANNER */}
      {cookieOpen && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-50 bg-white border border-black/10 rounded-2xl shadow-sm p-5 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <Cookie className="w-5 h-5 text-amber-500" />
            <h4 className="text-sm font-bold text-slate-900">We value your privacy</h4>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            We use cookies to improve your experience, analyse traffic and personalise content. Manage your preferences or accept all.
          </p>

          {cookiePrefsOpen && (
            <div className="mt-3 space-y-2 animate-fade-in">
              {([
                { key: 'necessary', label: 'Necessary', locked: true },
                { key: 'functional', label: 'Functional', locked: false },
                { key: 'performance', label: 'Performance', locked: false },
                { key: 'targeting', label: 'Targeting', locked: false }
              ] as const).map(pref => (
                <label key={pref.key} className="flex items-center justify-between text-xs">
                  <span className="text-slate-700 font-medium">{pref.label}{pref.locked && <span className="text-slate-400"> (always on)</span>}</span>
                  <input
                    type="checkbox"
                    disabled={pref.locked}
                    checked={cookiePrefs[pref.key]}
                    onChange={(e) => setCookiePrefs(prev => ({ ...prev, [pref.key]: e.target.checked }))}
                    className="accent-blue-600 w-4 h-4 disabled:opacity-60"
                  />
                </label>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={() => setCookiePrefsOpen(o => !o)}
              className="flex-1 py-2 text-xs font-semibold text-slate-700 border border-black/10 rounded-lg hover:bg-slate-50 transition-colors"
            >
              {cookiePrefsOpen ? 'Save preferences' : 'Preferences'}
            </button>
            <button
              onClick={() => setCookieOpen(false)}
              className="flex-1 py-2 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors"
            >
              Accept all
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
