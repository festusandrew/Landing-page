import React, { useState, useEffect } from 'react';
import {
  Users, Clock, ShieldCheck, MapPin, CheckCircle2, ArrowRight, Star, Building2,
  Search, Calendar, Stethoscope, Briefcase, Mail, Lock, Linkedin, Phone, ChevronDown, ChevronRight,
  BookOpen, GraduationCap, Cookie, FileText, Award, PlusCircle, UserPlus, Check, Activity, Menu, X, LogIn,
  Apple, Play, Bell, Smartphone, Send, Zap, Wallet, Plus, Minus
} from 'lucide-react';
import { ImageWithFallback } from '../../app/components/figma/ImageWithFallback';

// Figma-imported images
import imgOverlay from '../../imports/MacBookPro14372/1ce878ea07a35dd888253f3062acd8e1583d0cbc.png';
import imgTjqvmx3 from '../../imports/MacBookPro14372/a6d47f8f7e83368a63cf10d1c76fe22cf80acf83.png';
import imgImage1 from '../../imports/MacBookPro14372/db6577642f84fa230c5ca308c9df636cad85556a.png';
import imgRectangle3463566 from '../../imports/MacBookPro14372/d059709d7463adb6ae1fa5b1076a1facae34ff15.png';
import imgRectangle3463567 from '../../imports/MacBookPro14372/d07e18d286fb62e0f78f4e05508d38c7cf4f7308.png';
import imgRectangle3463568 from '../../imports/MacBookPro14372/0ac829013a4b330c869f8ef345bd80dd93c6ea41.png';
import imgRectangle3463569 from '../../imports/MacBookPro14372/a8ebeb4092bb80b8fefb86fa8fcf83f1e47f0b17.png';
import imgWmremoveTransformed1 from '../../imports/MacBookPro14372/befeb82a2ce781d4cd9b1b720f15e99dfcd8ec5e.png';
import imgIPhone17 from '../../imports/MacBookPro14372/b3648975e70cf2fd988f4256f92f66daf2dd6001.png';
import imgVector from '../../imports/MacBookPro14372/f0bc36634edad22f1ba0d9dc695aff5fadeda7e7.png';
import imgLogoWhite from '../../imports/MacBookPro14372/b8700eda655f89d95fde6a9a941327028643e451.png';
import imgLogo from '../../imports/MacBookPro14372/b16ab5f34d40dbc6e584efa0666128eb7e0f9d4b.png';

interface LocumProvisionPageProps {
  onBackToHome: () => void;
  onBookDemo: (moduleTitle?: string) => void;
  onStartTrial: () => void;
}

type Region = 'IE' | 'UK';

const REGIONS: Record<Region, {
  country: string;
  flag: string;
  currency: string;
  defaultCity: string;
  cities: string[];
  compliance: string;
  payGuide: string;
  shifts: { facility: string; location: string; date: string; time: string; rate: string; urgent: boolean }[];
}> = {
  IE: {
    country: 'Ireland',
    flag: '🇮🇪',
    currency: '€',
    defaultCity: 'Dublin',
    cities: ['Dublin', 'Cork', 'Galway', 'Limerick', 'Waterford'],
    compliance: 'Garda vetting',
    payGuide: '€50–€60/hr',
    shifts: [
      { facility: 'Boots Pharmacy — Grafton St', location: 'Dublin 2, IE', date: 'Mon 27 Jul', time: '09:00 – 18:00', rate: '€55/hr', urgent: true },
      { facility: 'McCabes Pharmacy', location: 'Cork City, IE', date: 'Tue 28 Jul', time: '08:30 – 17:30', rate: '€52/hr', urgent: false },
      { facility: 'LloydsPharmacy', location: 'Galway, IE', date: 'Wed 29 Jul', time: '10:00 – 19:00', rate: '€58/hr', urgent: true },
      { facility: 'Hickeys Pharmacy', location: 'Limerick, IE', date: 'Thu 30 Jul', time: '09:00 – 18:00', rate: '€50/hr', urgent: false }
    ]
  },
  UK: {
    country: 'United Kingdom',
    flag: '🇬🇧',
    currency: '£',
    defaultCity: 'London',
    cities: ['London', 'Manchester', 'Birmingham', 'Belfast', 'Glasgow'],
    compliance: 'Enhanced DBS check',
    payGuide: '£28–£38/hr',
    shifts: [
      { facility: 'Boots — Oxford Street', location: 'London W1, UK', date: 'Mon 27 Jul', time: '09:00 – 18:00', rate: '£34/hr', urgent: true },
      { facility: 'Well Pharmacy', location: 'Manchester, UK', date: 'Tue 28 Jul', time: '08:30 – 17:30', rate: '£30/hr', urgent: false },
      { facility: 'Rowlands Pharmacy', location: 'Birmingham, UK', date: 'Wed 29 Jul', time: '10:00 – 19:00', rate: '£36/hr', urgent: true },
      { facility: 'Gordons Chemists', location: 'Belfast, NI', date: 'Thu 30 Jul', time: '09:00 – 18:00', rate: '£32/hr', urgent: false }
    ]
  }
};

const detectRegionFromTimezone = (): Region => {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz === 'Europe/Dublin') return 'IE';
    if (tz.startsWith('Europe/London') || tz === 'Europe/Belfast' || tz === 'Europe/Guernsey' || tz === 'Europe/Isle_of_Man' || tz === 'Europe/Jersey') return 'UK';
  } catch { /* ignore */ }
  return 'IE';
};

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

const WHO_CAN_JOIN = [
  { img: imgRectangle3463566, label: '🩺 Registered Nurses (RNs)' },
  { img: imgRectangle3463567, label: '💊 Pharmacists' },
  { img: imgRectangle3463568, label: '🩺 Doctors & Consultants' },
  { img: imgRectangle3463569, label: '🧑‍⚕️ Healthcare Assistants' },
  { img: imgRectangle3463569, label: '🧬 Allied Health Workers' },
];

const WHY_FEATURES = [
  { title: 'Flexible Scheduling', desc: 'Work when it suits you. Pick shifts based on your availability and preferences.' },
  { title: 'Verified Healthcare Employers', desc: 'All listed shifts come from trusted, vetted healthcare institutions.' },
  { title: 'Location-Based Shift Listings', desc: 'Find shifts near you or in preferred regions without stress.' },
  { title: 'Transparent Shift Details', desc: 'See shift duration, pay rate, role, and employer details upfront, no guesswork.' },
  { title: 'Supportive Community', desc: 'Connect with professionals who choose flexible, high-standard healthcare shifts.' },
];

const TESTIMONIALS = [
  { name: 'Aoife N.', role: 'Locum Pharmacist, Dublin', quote: 'The platform is super easy to use and the support team is responsive. I\'ve picked up consistent shifts across Dublin.' },
  { name: 'James O.', role: 'Agency Nurse, Belfast', quote: 'Onboarding took ten minutes and my NMBI details were verified the same day. I love the flexibility.' },
  { name: 'Sarah K.', role: 'Locum GP, Cork', quote: 'MployUs Locums has transformed how I manage my work-life balance. Brilliant platform.' },
  { name: 'Pharmacy Lead', role: 'McCabes, Cork', quote: 'We fill last-minute cover before lunch. It has completely replaced our old agency arrangement.' },
];

export const LocumProvisionPage: React.FC<LocumProvisionPageProps> = ({
  onBackToHome,
  onBookDemo,
  onStartTrial
}) => {
  const [region, setRegion] = useState<Region>('IE');
  const [searchProfession, setSearchProfession] = useState('Locum Pharmacist');
  const [searchLocation, setSearchLocation] = useState(REGIONS['IE'].defaultCity);
  const loc = REGIONS[region];

  useEffect(() => {
    const guess = detectRegionFromTimezone();
    setRegion(guess);
    setSearchLocation(REGIONS[guess].defaultCity);
    setFaqRegion(guess);
  }, []);

  const applyRegion = (r: Region, city?: string) => {
    setRegion(r);
    setSearchLocation(city || REGIONS[r].defaultCity);
    setFaqRegion(r);
  };

  // Employer posting wizard
  const [wizardStep, setWizardStep] = useState(1);
  const [postType, setPostType] = useState<'Locum Shift' | 'Permanent Job'>('Locum Shift');

  // Auth
  const [role, setRole] = useState<'Locum' | 'Client' | null>(null);
  const [setupProfession, setSetupProfession] = useState<Profession>(PROFESSIONS[4]);
  const [smsCode, setSmsCode] = useState(['', '', '', '', '', '']);

  // FAQ
  const [faqRegion, setFaqRegion] = useState<'UK' | 'IE'>('IE');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [faqTab, setFaqTab] = useState<'Locum' | 'Employers'>('Locum');

  // Nav
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [authModal, setAuthModal] = useState<'signin' | 'signup' | null>(null);
  const [signupStep, setSignupStep] = useState<'role' | 'details' | 'verify'>('role');

  const openAuth = (mode: 'signin' | 'signup') => {
    setMobileNavOpen(false);
    setSignupStep('role');
    setAuthModal(mode);
  };

  type LocumPage = 'home' | 'find-shifts' | 'post-shift' | 'cpd' | 'blog' | 'faq';
  const [page, setPage] = useState<LocumPage>('home');

  const goto = (p: LocumPage) => {
    setMobileNavOpen(false);
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks: { id: LocumPage; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'find-shifts', label: 'Locum Shifts' },
    { id: 'post-shift', label: 'Employers' },
    { id: 'cpd', label: 'Training' },
    { id: 'blog', label: 'Blog' },
    { id: 'faq', label: 'FAQ' },
  ];

  const [cookieOpen, setCookieOpen] = useState(true);
  const [cookiePrefsOpen, setCookiePrefsOpen] = useState(false);
  const [cookiePrefs, setCookiePrefs] = useState({ necessary: true, functional: true, performance: true, targeting: false });

  const shifts = loc.shifts;

  const faqs: Record<string, { q: string; a: string }[]> = {
    Locum: [
      { q: 'What services does MployUs Locums offer?', a: 'Working with MployUs Locums is simple and seamless. Just register online in moments, set your location preferences and how far you\'re willing to travel, and we\'ll instantly send you relevant job opportunities. You can view, apply for, and confirm shifts in just a few clicks.' },
      { q: 'Are there any fees involved in registering or working as a locum?', a: 'Locums keep 100% of their advertised rate. There are no registration fees. Clients pay a flat platform fee per filled shift — no percentage commissions and no hidden agency margins.' },
      { q: 'Does MployUs Locums deduct any commission from my earnings?', a: 'No. We never deduct commission from your earnings. You receive 100% of your agreed rate.' },
      { q: 'What is the payment process after completing a shift?', a: 'Timesheets are approved in-app after each shift. Payments are processed weekly — by SEPA in Ireland and Faster Payments in the UK — typically within 2–3 working days of approval.' },
    ],
    Employers: [
      { q: 'How do I post a shift on MployUs Locums?', a: 'Register as an employer, complete your facility profile, and use our 3-step shift posting wizard. Shifts go live immediately and reach our network of verified professionals.' },
      { q: 'How are locums verified?', a: 'Every locum is compliance-checked before their first shift — Garda vetting in Ireland and Enhanced DBS in the UK & NI. We store documents securely in a digital compliance vault.' },
      { q: 'What does it cost to fill a shift?', a: 'Employers pay a flat per-shift fee. There are no percentage commissions or hidden margins. Contact us for a quote tailored to your facility.' },
      { q: 'Can I build a pool of preferred locums?', a: 'Yes. Once you\'ve worked with a locum, you can add them to your favourites list and request them directly for future shifts.' },
    ],
  };

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

  const searchBarEl = (
    <div className="max-w-5xl mx-auto bg-white border border-black/10 rounded-2xl shadow-sm p-3 grid grid-cols-1 md:grid-cols-4 gap-2">
      <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-50 border border-black/10">
        <Stethoscope className="w-4 h-4 text-slate-400 shrink-0" />
        <select value={searchProfession} onChange={(e) => setSearchProfession(e.target.value)} className="bg-transparent text-xs font-semibold text-slate-800 w-full outline-none cursor-pointer">
          {PROFESSIONS.map(p => <option key={p.name}>{p.name}</option>)}
        </select>
      </div>
      <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-50 border border-black/10">
        <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
        <select value={searchLocation} onChange={(e) => setSearchLocation(e.target.value)} className="bg-transparent text-xs font-semibold text-slate-800 w-full outline-none cursor-pointer">
          {loc.cities.map(city => <option key={city}>{city}</option>)}
        </select>
      </div>
      <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-50 border border-black/10">
        <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
        <input type="date" className="bg-transparent text-xs font-semibold text-slate-600 w-full outline-none" />
      </div>
      <button onClick={() => goto('find-shifts')} className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2">
        <Search className="w-4 h-4" /> Search Shifts
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-slate-900 font-['Inter',sans-serif]">

      {/* ═══ NAVBAR ═══ */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/97 backdrop-blur-md border-b border-black/10">
        <div className="max-w-[1512px] mx-auto px-6 lg:px-20">
          <div className="flex items-center justify-between h-[72px]">

            {/* Logo */}
            <button onClick={() => goto('home')} className="flex items-center gap-3">
              <img src={imgLogo} alt="MployUs Locums" className="h-9 w-auto object-contain" />
            </button>

            {/* Nav links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map(l => (
                <button
                  key={l.id}
                  onClick={() => goto(l.id)}
                  className={`px-2 py-3 text-[15px] font-medium transition-colors relative ${
                    page === l.id
                      ? 'text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-blue-600 after:rounded-t'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </nav>

            {/* Right: flag switcher + auth */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Flag region switcher */}
              <div className="flex items-center gap-0.5 bg-slate-100 border border-black/10 rounded-lg p-0.5">
                {(Object.keys(REGIONS) as Region[]).map(r => (
                  <button
                    key={r}
                    onClick={() => applyRegion(r)}
                    title={REGIONS[r].country}
                    className={`text-base leading-none w-8 h-7 rounded-md flex items-center justify-center transition-all ${
                      region === r ? 'bg-white shadow-sm' : 'opacity-50 hover:opacity-100'
                    }`}
                  >
                    {REGIONS[r].flag}
                  </button>
                ))}
              </div>
              <button onClick={onBackToHome} className="text-[11px] font-medium text-slate-400 hover:text-slate-700 transition-colors">
                MployUs.com
              </button>
              <button
                onClick={() => openAuth('signup')}
                className="px-5 py-2.5 bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-[15px] rounded-md hover:bg-slate-200 transition-colors"
              >
                Register
              </button>
              <button
                onClick={() => openAuth('signin')}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[15px] rounded-md transition-colors"
              >
                Login
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
              <button key={l.id} onClick={() => goto(l.id)} className={`block w-full text-left py-2 text-sm font-semibold ${page === l.id ? 'text-blue-700' : 'text-slate-700 hover:text-slate-900'}`}>
                {l.label}
              </button>
            ))}
            <div className="flex items-center gap-1 pt-3">
              {(Object.keys(REGIONS) as Region[]).map(r => (
                <button
                  key={r}
                  onClick={() => applyRegion(r)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                    region === r ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white border-black/10 text-slate-700'
                  }`}
                >
                  <span className="text-base leading-none">{REGIONS[r].flag}</span> {REGIONS[r].country}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 pt-3">
              <button onClick={() => openAuth('signup')} className="flex-1 py-2.5 text-xs font-semibold text-slate-900 border border-black/10 rounded-lg">Register</button>
              <button onClick={() => openAuth('signin')} className="flex-1 py-2.5 text-xs font-semibold text-white bg-blue-600 rounded-lg">Login</button>
            </div>
            <button onClick={onBackToHome} className="block w-full text-left py-2 text-[11px] font-semibold text-slate-400">← Back to MployUs.com</button>
          </div>
        )}
      </header>

      {/* ═══════════════════════════════════
          HOME PAGE
      ═══════════════════════════════════ */}
      {page === 'home' && (
        <>

        {/* ── HERO SECTION ── */}
        <section className="relative h-[754px] mt-[72px] overflow-hidden">
          {/* Background overlay image */}
          <div className="absolute inset-0">
            <img src={imgOverlay} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(88.79deg, rgba(19,19,19,0.85) 0.32%, rgba(19,19,19,0.42) 51.33%)' }} />
          </div>

          {/* Floating stat cards */}
          <div className="absolute right-[8%] top-1/2 -translate-y-1/2 flex flex-col gap-4 z-10">
            <div className="backdrop-blur-md bg-black/40 rounded-2xl p-6 text-white text-center w-56">
              <div className="text-5xl font-bold">25+</div>
              <p className="text-base opacity-80 mt-2 leading-tight">Years of Experience</p>
            </div>
            <div className="backdrop-blur-md bg-black/40 rounded-xl p-6 text-white text-center w-56">
              <div className="text-5xl font-bold">140+</div>
              <p className="text-base opacity-80 mt-2 leading-tight">Available Jobs</p>
            </div>
          </div>

          {/* Hero copy */}
          <div className="absolute left-[6.6%] top-1/2 -translate-y-[calc(50%-52px)] right-[52%] z-10">
            <div className="flex items-center gap-2 mb-4">
              <svg width="17.5" height="17.5" viewBox="0 0 17.5 17.5" fill="none">
                <path d="M8.75 0L10.57 6.07L16.9 5.72L12.01 9.57L13.83 15.64L8.75 11.99L3.67 15.64L5.49 9.57L0.6 5.72L6.93 6.07L8.75 0Z" fill="#3B82F6" />
              </svg>
              <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Find Locum Shifts. Work on Your Terms.</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-[1.1] capitalize mb-4">
              Browse and apply for flexible healthcare shifts near you.
            </h1>
            <p className="text-lg font-bold text-white mb-2">Join our growing network of trusted medical professionals.</p>
            <p className="text-sm text-white/80 leading-relaxed mb-8 max-w-lg">
              Comprehensive medical care with expert doctors, advanced technology, and compassionate service. Your health, our priority.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => goto('find-shifts')}
                className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-full transition-colors"
              >
                Browse Available Shifts
              </button>
              <button
                onClick={() => openAuth('signup')}
                className="px-10 py-5 border border-white/80 text-white font-bold text-sm rounded-full backdrop-blur-sm hover:bg-white/10 transition-colors"
              >
                Register as a Locum
              </button>
            </div>
          </div>
        </section>

        {/* ── SEARCH BAR ── */}
        <div className="bg-slate-50 border-b border-black/10 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {searchBarEl}
          </div>
        </div>

        {/* ── ABOUT SECTION ── */}
        <section className="py-20 max-w-[1352px] mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Images */}
            <div className="relative shrink-0 lg:w-[688px]">
              <div className="relative">
                {/* Main image */}
                <div className="rounded-2xl overflow-hidden w-[343px] h-[495px]">
                  <img src={imgTjqvmx3} alt="Healthcare professional" className="w-full h-full object-cover" />
                </div>
                {/* Overlapping second image */}
                <div className="absolute top-[78px] left-[375px] rounded-2xl overflow-hidden w-[343px] h-[495px] shadow-lg">
                  <img src={imgImage1} alt="Medical consultation" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-5">
              <div className="flex items-center gap-2">
                <svg width="17.5" height="17.5" viewBox="0 0 17.5 17.5" fill="none">
                  <path d="M8.75 0L10.57 6.07L16.9 5.72L12.01 9.57L13.83 15.64L8.75 11.99L3.67 15.64L5.49 9.57L0.6 5.72L6.93 6.07L8.75 0Z" fill="#3B82F6" />
                </svg>
                <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">About Us</span>
              </div>
              <h2 className="text-4xl font-semibold text-slate-900 capitalize leading-[1.2]">
                MployUs Connects you to the right Job
              </h2>
              <div className="text-slate-700 text-base leading-relaxed space-y-4 opacity-80">
                <p>
                  At MployUs Locums, we connect healthcare professionals with flexible, reliable shift opportunities at trusted medical facilities. Whether you're a nurse, doctor, pharmacist, or allied health worker, our platform helps you take control of your schedule and work on your terms.
                </p>
                <p>
                  Our locum provision software enables seamless scheduling, tracking, and management of locum professionals, while ensuring continuous coverage and efficient management of temporary staffing needs for medical facilities who we partner with. Partner with us today.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHO CAN JOIN ── */}
        <section className="py-20 bg-slate-50 border-y border-black/10">
          <div className="max-w-[1352px] mx-auto px-6 lg:px-8">
            {/* Header */}
            <div className="flex flex-col items-center text-center gap-6 mb-12 max-w-[914px] mx-auto">
              <div className="flex items-center gap-2">
                <svg width="17.5" height="17.5" viewBox="0 0 17.5 17.5" fill="none">
                  <path d="M8.75 0L10.57 6.07L16.9 5.72L12.01 9.57L13.83 15.64L8.75 11.99L3.67 15.64L5.49 9.57L0.6 5.72L6.93 6.07L8.75 0Z" fill="#3B82F6" />
                </svg>
                <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">Who can join MployUs Locums</span>
              </div>
              <p className="text-slate-500 text-xl leading-relaxed">
                MployUs Locum connects certified healthcare professionals with flexible shifts at trusted hospitals and clinics. If you're qualified and passionate about care, join us today.
              </p>
            </div>

            <p className="text-slate-500 text-base mb-8">We welcome applications from:</p>

            {/* Role cards */}
            <div className="flex gap-9 overflow-x-auto pb-4">
              {WHO_CAN_JOIN.map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-2 shrink-0">
                  <div className="relative w-[289px] h-[461px] rounded-2xl overflow-hidden">
                    <img src={item.img} alt={item.label} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/20 rounded-2xl" />
                  </div>
                  <p className="text-blue-600 text-lg text-center">{item.label}</p>
                </div>
              ))}
            </div>

            {/* Carousel dots */}
            <div className="flex items-center justify-center gap-4 mt-10">
              <div className="w-3 h-3 rounded-full bg-slate-200" />
              <div className="w-3.5 h-3.5 rounded-full bg-blue-600" />
              <div className="w-3 h-3 rounded-full bg-slate-200" />
            </div>
          </div>
        </section>

        {/* ── MOBILE APP PROMO ── */}
        <section className="py-20">
          <div className="max-w-[1348px] mx-auto px-6 lg:px-8">
            <div className="relative rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(90deg, rgba(1,81,180,0.85) 0%, rgba(1,81,180,0.85) 100%), url("")', backgroundColor: '#0151b4' }}>
              {/* Decorative ellipses background */}
              <div className="absolute inset-0 overflow-hidden opacity-20">
                {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => (
                  <div
                    key={i}
                    className="absolute rounded-full border-4 border-blue-300"
                    style={{
                      width: 580, height: 580,
                      left: i * 120 - 300,
                      top: -106,
                      opacity: 0.5 + (i % 3) * 0.15,
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-0 min-h-[422px]">
                {/* Text content */}
                <div className="flex-1 p-12 lg:pl-16 space-y-8">
                  <h2 className="text-white text-4xl font-medium leading-tight">Our Locum Mobile App</h2>
                  <p className="text-white/90 text-xl leading-relaxed max-w-[760px]">
                    Easily find and apply for locum shifts on the go. Our app connects healthcare professionals with verified job opportunities and helps manage your locum schedule all in one place.
                  </p>
                  {/* Store buttons */}
                  <div className="flex flex-wrap items-center gap-5">
                    <button
                      onClick={() => onBookDemo('iOS App')}
                      className="flex items-center gap-3 px-5 py-3 bg-black rounded-xl border border-white/30 hover:bg-slate-900 transition-colors"
                    >
                      <Apple className="w-6 h-6 text-white" />
                      <span className="text-left leading-none">
                        <span className="block text-[10px] text-white/70">Download on the</span>
                        <span className="block text-sm font-bold text-white">App Store</span>
                      </span>
                    </button>
                    <button
                      onClick={() => onBookDemo('Android App')}
                      className="flex items-center gap-3 px-5 py-3 bg-black rounded-xl border border-white/30 hover:bg-slate-900 transition-colors"
                    >
                      <Play className="w-6 h-6 text-white fill-current" />
                      <span className="text-left leading-none">
                        <span className="block text-[10px] text-white/70">Get it on</span>
                        <span className="block text-sm font-bold text-white">Google Play</span>
                      </span>
                    </button>
                  </div>
                </div>

                {/* iPhone mockup */}
                <div className="relative shrink-0 w-[400px] h-[422px] flex items-center justify-center">
                  <div className="absolute" style={{ transform: 'rotate(-13.54deg)', width: 220, height: 440 }}>
                    <img src={imgIPhone17} alt="MployUs Locums mobile app" className="w-full h-full object-contain" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY MPLOYUS LOCUMS ── */}
        <section className="py-20">
          <div className="max-w-[1348px] mx-auto px-6 lg:px-8">
            {/* Header */}
            <div className="flex flex-col items-center text-center gap-5 mb-16 max-w-[914px] mx-auto">
              <div className="flex items-center gap-2">
                <svg width="17.5" height="17.5" viewBox="0 0 17.5 17.5" fill="none">
                  <path d="M8.75 0L10.57 6.07L16.9 5.72L12.01 9.57L13.83 15.64L8.75 11.99L3.67 15.64L5.49 9.57L0.6 5.72L6.93 6.07L8.75 0Z" fill="#3B82F6" />
                </svg>
                <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">Why MployUs Locums?</span>
              </div>
              <p className="text-slate-500 text-lg leading-relaxed max-w-[766px]">
                Discover the benefits of choosing a locum platform built specifically for healthcare professionals.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Image */}
              <div className="shrink-0 lg:w-[678px]">
                <div className="rounded-2xl overflow-hidden h-[496px]">
                  <img src={imgWmremoveTransformed1} alt="Healthcare professional" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Feature list */}
              <div className="flex-1 space-y-6">
                {WHY_FEATURES.map((f) => (
                  <div key={f.title} className="flex items-start gap-4">
                    <div className="shrink-0 w-8 h-8 flex items-center justify-center">
                      <CheckCircle2 className="w-7 h-7 text-blue-600" />
                    </div>
                    <p className="text-slate-600 text-lg leading-relaxed">
                      <span className="text-blue-600 font-semibold">{f.title}</span>
                      {' – '}{f.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="py-24 bg-blue-600">
          <div className="max-w-[1512px] mx-auto px-6 lg:px-24">
            {/* Header */}
            <div className="flex flex-col items-center text-center gap-4 mb-16">
              <div className="flex items-center gap-2">
                <svg width="17.5" height="17.5" viewBox="0 0 17.5 17.5" fill="none">
                  <path d="M8.75 0L10.57 6.07L16.9 5.72L12.01 9.57L13.83 15.64L8.75 11.99L3.67 15.64L5.49 9.57L0.6 5.72L6.93 6.07L8.75 0Z" fill="white" />
                </svg>
                <span className="text-white text-xs font-bold uppercase tracking-widest">Patient Testimonials</span>
              </div>
              <h2 className="text-4xl font-semibold text-white capitalize">Hear from Those Who Trust MployUs</h2>
              <p className="text-white/80 text-sm">Hear what other healthcare professionals are saying about working with us.</p>
            </div>

            {/* Testimonial cards */}
            <div className="flex gap-10 overflow-x-auto pb-4">
              {TESTIMONIALS.map((t) => (
                <div key={t.name} className="shrink-0 w-[389px]">
                  {/* Avatar */}
                  <div className="flex justify-end mb-0">
                    <img src={imgVector} alt="" className="w-20 h-20 object-contain" />
                  </div>
                  {/* Card body */}
                  <div
                    className="rounded-b-2xl p-6 space-y-4 shadow-md"
                    style={{ background: 'linear-gradient(90deg, rgba(59,130,246,0.06) 0%, rgba(59,130,246,0.06) 100%), white' }}
                  >
                    <div>
                      <p className="text-blue-800 text-xl font-normal">{t.name}</p>
                      <p className="text-slate-500 text-xs italic">{t.role}</p>
                    </div>
                    <p className="text-blue-900 text-base leading-relaxed">{t.quote}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ SECTION ── */}
        <section className="py-20 bg-white">
          <div className="max-w-[1346px] mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left: heading */}
              <div className="space-y-4">
                <h2 className="text-4xl font-normal text-blue-800 leading-tight" style={{ fontFamily: 'Lexend, Inter, sans-serif' }}>
                  Frequently Asked Questions
                </h2>
                <p className="text-slate-500 text-lg leading-relaxed">
                  Got questions? Our Locum FAQ covers everything from shift requests and time tracking to payments and availability — helping locum professionals work smoothly and confidently with MployUs.
                </p>
              </div>

              {/* Right: FAQ accordion */}
              <div className="space-y-8">
                {/* Locum / Employers tabs */}
                <div className="flex items-center gap-10">
                  {(['Locum', 'Employers'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => { setFaqTab(tab); setOpenFaq(0); }}
                      className={`text-2xl font-semibold transition-colors ${
                        faqTab === tab ? 'text-blue-700 underline underline-offset-4' : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Accordion */}
                <div className="space-y-4">
                  {/* First card: expanded/highlighted */}
                  {faqs[faqTab].map((f, i) => (
                    <div
                      key={f.q}
                      className="rounded-xl overflow-hidden"
                      style={
                        i === 0 && openFaq === 0
                          ? { background: 'linear-gradient(90deg, rgb(37,99,235) 0%, rgb(37,99,235) 100%)' }
                          : { background: 'linear-gradient(90deg, rgba(59,130,246,0.05) 0%, rgba(59,130,246,0.05) 100%), white', border: '1px solid #f1f1f1' }
                      }
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between gap-6 px-7 py-5 text-left"
                      >
                        <span className={`text-base font-medium leading-relaxed ${i === 0 && openFaq === 0 ? 'text-white' : 'text-slate-800'}`}>
                          {f.q}
                        </span>
                        <div className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                          openFaq === i
                            ? (i === 0 ? 'bg-white/20' : 'bg-blue-100')
                            : 'bg-blue-50'
                        }`}>
                          {openFaq === i
                            ? <Minus className={`w-5 h-5 ${i === 0 ? 'text-white' : 'text-blue-700'}`} />
                            : <Plus className="w-5 h-5 text-blue-700" />
                          }
                        </div>
                      </button>
                      {openFaq === i && (
                        <div className={`px-7 pb-6 text-sm leading-relaxed animate-fade-in ${i === 0 ? 'text-white/90' : 'text-slate-600'}`}>
                          {f.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => goto('faq')}
                  className="text-blue-700 font-semibold text-lg hover:underline"
                >
                  View More
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA STRIP ── */}
        <section className="py-14 bg-slate-900">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Join MployUs Locums</span>
              <h3 className="text-2xl font-bold text-white">Start finding — or filling — shifts today</h3>
              <p className="text-xs text-slate-300">Free to join in Ireland and the UK, with zero agency commission.</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button onClick={() => openAuth('signup')} className="px-6 py-3 bg-white text-slate-900 font-semibold text-xs rounded-md hover:bg-slate-100 transition-colors">
                Create free account
              </button>
              <button onClick={onBackToHome} className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-md border border-slate-700 transition-colors">
                Back to Overview
              </button>
            </div>
          </div>
        </section>

        </>
      )}

      {/* ═══════════════════════════════════
          FIND SHIFTS PAGE
      ═══════════════════════════════════ */}
      {page === 'find-shifts' && (
        <section className="pt-24 pb-14 bg-slate-50 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">{loc.flag} {loc.country}</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">Find your next shift</h1>
              <p className="text-sm text-slate-600 mt-1.5 max-w-2xl">Search live locum and permanent healthcare shifts near you.</p>
            </div>
            <div className="mb-10">{searchBarEl}</div>
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Available now in {loc.country}</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">{searchProfession} shifts near {searchLocation}</h2>
              <p className="text-xs text-slate-500 font-medium mt-1.5">
                Typical rate: <span className="font-bold text-slate-700">{loc.payGuide}</span> · Compliance: {loc.compliance}
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-3">
                {shifts.map((s) => (
                  <div key={s.facility} className="p-5 rounded-xl bg-white border border-black/10 shadow-sm flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      {s.urgent && <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-200">Urgent</span>}
                      <h4 className="text-sm font-bold text-slate-900">{s.facility}</h4>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500 font-medium">
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {s.location}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {s.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {s.time}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-lg font-extrabold text-slate-900">{s.rate}</div>
                      <button onClick={() => onBookDemo(`Shift: ${s.facility}`)} className="mt-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold rounded-md transition-colors">
                        Apply
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-slate-50 border border-black/10 shadow-sm p-5 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs font-bold text-slate-700">{loc.flag} Coverage in {loc.country}</div>
                  <span className="text-[10px] font-semibold text-blue-700 bg-white/80 border border-black/10 px-2 py-0.5 rounded-full">Live</span>
                </div>
                <div className="space-y-2 flex-1">
                  {loc.cities.map((city) => {
                    const count = (city.length * 3) % 12 + 4;
                    const active = city === searchLocation;
                    return (
                      <button key={city} onClick={() => setSearchLocation(city)} className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl border text-left transition-all ${active ? 'bg-white border-blue-500 shadow-sm' : 'bg-white/60 border-black/10 hover:border-slate-300'}`}>
                        <span className="flex items-center gap-2">
                          <MapPin className={`w-4 h-4 ${active ? 'text-blue-600' : 'text-slate-400'}`} />
                          <span className="text-xs font-semibold text-slate-800">{city}</span>
                        </span>
                        <span className="text-[10px] font-bold text-slate-500">{count} open</span>
                      </button>
                    );
                  })}
                </div>
                <p className="text-[10px] text-slate-500 mt-3">Rates shown in {loc.currency}.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════
          POST A SHIFT PAGE
      ═══════════════════════════════════ */}
      {page === 'post-shift' && (
        <section className="pt-24 pb-14 bg-slate-50 min-h-screen">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">For employers</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1 tracking-tight">Post an open shift in 3 steps</h1>
              <p className="text-sm text-slate-600 mt-2 max-w-xl mx-auto">List a locum shift or a permanent role and reach verified {loc.country} healthcare professionals in minutes.</p>
            </div>
            <div className="flex items-center justify-between mb-6">
              {['Shift Type', 'Shift Details', 'Contact Details'].map((label, i) => {
                const step = i + 1;
                const active = wizardStep === step;
                const done = wizardStep > step;
                return (
                  <React.Fragment key={label}>
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border ${done ? 'bg-blue-600 text-white border-blue-600' : active ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-400 border-black/10'}`}>
                        {done ? <Check className="w-4 h-4" /> : step}
                      </div>
                      <span className={`text-xs font-semibold hidden sm:inline ${active || done ? 'text-slate-900' : 'text-slate-400'}`}>{label}</span>
                    </div>
                    {i < 2 && <div className="flex-1 h-px bg-black/10 mx-2" />}
                  </React.Fragment>
                );
              })}
            </div>
            <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-sm space-y-5">
              {wizardStep === 1 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-slate-900">What are you posting?</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {(['Locum Shift', 'Permanent Job'] as const).map(t => (
                      <button key={t} onClick={() => setPostType(t)} className={`p-4 rounded-xl border text-left transition-all ${postType === t ? 'bg-blue-50 border-blue-500 shadow-sm' : 'bg-white border-black/10 hover:border-slate-300'}`}>
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
                <button onClick={() => setWizardStep(s => Math.max(1, s - 1))} disabled={wizardStep === 1} className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-40 transition-colors">Back</button>
                {wizardStep < 3 ? (
                  <button onClick={() => setWizardStep(s => Math.min(3, s + 1))} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5">
                    Continue <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button onClick={() => onBookDemo(`Post ${postType}`)} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5">
                    Publish {postType} <PlusCircle className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════
          CPD PAGE
      ═══════════════════════════════════ */}
      {page === 'cpd' && (
        <section className="pt-24 pb-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[70vh]">
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
      )}

      {/* ═══════════════════════════════════
          BLOG PAGE
      ═══════════════════════════════════ */}
      {page === 'blog' && (
        <section className="pt-24 pb-14 bg-white min-h-[70vh]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> Content hub</span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1 tracking-tight">Guides, salary reports & market insights</h1>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {articles.map(a => (
                <button key={a.title} onClick={() => onBookDemo(`Article: ${a.title}`)} className="p-5 rounded-2xl bg-slate-50 border border-black/10 shadow-sm text-left hover:border-slate-300 transition-all group">
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-200 mb-3">{a.tag}</span>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-blue-700 transition-colors">{a.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-2">{a.read}</p>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════
          FAQ PAGE
      ═══════════════════════════════════ */}
      {page === 'faq' && (
        <section className="pt-24 pb-14 bg-white min-h-[70vh]">
          <div className="max-w-[1346px] mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-4">
                <h1 className="text-4xl font-normal text-blue-800 leading-tight" style={{ fontFamily: 'Lexend, Inter, sans-serif' }}>
                  Frequently Asked Questions
                </h1>
                <p className="text-slate-500 text-lg leading-relaxed">
                  Got questions? Our Locum FAQ covers everything from shift requests and time tracking to payments and availability — helping locum professionals work smoothly and confidently with MployUs.
                </p>
              </div>
              <div className="space-y-8">
                <div className="flex items-center gap-10">
                  {(['Locum', 'Employers'] as const).map(tab => (
                    <button key={tab} onClick={() => { setFaqTab(tab); setOpenFaq(0); }} className={`text-2xl font-semibold transition-colors ${faqTab === tab ? 'text-blue-700 underline underline-offset-4' : 'text-slate-400 hover:text-slate-600'}`}>
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="space-y-4">
                  {faqs[faqTab].map((f, i) => (
                    <div key={f.q} className="rounded-xl overflow-hidden" style={i === 0 && openFaq === 0 ? { background: 'linear-gradient(90deg, rgb(37,99,235) 0%, rgb(37,99,235) 100%)' } : { background: 'linear-gradient(90deg, rgba(59,130,246,0.05) 0%, rgba(59,130,246,0.05) 100%), white', border: '1px solid #f1f1f1' }}>
                      <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between gap-6 px-7 py-5 text-left">
                        <span className={`text-base font-medium leading-relaxed ${i === 0 && openFaq === 0 ? 'text-white' : 'text-slate-800'}`}>{f.q}</span>
                        <div className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${openFaq === i ? (i === 0 ? 'bg-white/20' : 'bg-blue-100') : 'bg-blue-50'}`}>
                          {openFaq === i ? <Minus className={`w-5 h-5 ${i === 0 ? 'text-white' : 'text-blue-700'}`} /> : <Plus className="w-5 h-5 text-blue-700" />}
                        </div>
                      </button>
                      {openFaq === i && (
                        <div className={`px-7 pb-6 text-sm leading-relaxed ${i === 0 ? 'text-white/90' : 'text-slate-600'}`}>{f.a}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════
          FOOTER
      ═══════════════════════════════════ */}
      <footer className="bg-blue-900 text-white">
        {/* Top: logo + newsletter */}
        <div className="max-w-[1346px] mx-auto px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-14">
            <img src={imgLogoWhite} alt="MployUs Locums" className="h-14 w-auto object-contain opacity-90" />
            <div className="space-y-4">
              <p className="font-semibold text-xl text-white">Subscribe to our newsletters</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-3 bg-white/10 border border-white/20 rounded-md w-72">
                  <Mail className="w-4 h-4 text-white/50" />
                  <input type="email" placeholder="Your email address" className="bg-transparent text-sm text-white w-full outline-none placeholder:text-white/40" />
                </div>
                <button className="px-5 py-3 bg-blue-400/60 hover:bg-blue-400/80 text-white text-sm font-normal rounded-md border border-white/30 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-white">Quick Links</h4>
              {navLinks.map(l => (
                <button key={l.id} onClick={() => goto(l.id)} className="block text-base text-white/80 hover:text-white transition-colors">{l.label}</button>
              ))}
            </div>
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-white">General</h4>
              {['Privacy Statement', 'Terms and Conditions', 'Cookies Policy', 'FAQs'].map(item => (
                <button key={item} onClick={() => onBookDemo('Legal & Compliance')} className="block text-base text-white/80 hover:text-white transition-colors">{item}</button>
              ))}
            </div>
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-white">Account</h4>
              <button onClick={() => openAuth('signin')} className="block text-base text-white/80 hover:text-white transition-colors">Sign In</button>
              <button onClick={() => openAuth('signup')} className="block text-base text-white/80 hover:text-white transition-colors">Register</button>
              <button onClick={() => openAuth('signup')} className="block text-base text-white/80 hover:text-white transition-colors">Register a Facility</button>
            </div>
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-white">Contact Us</h4>
              <p className="text-base text-white/80">info@mployuslocums.com</p>
              <p className="text-base text-white/80">+353 1 234 5678</p>
              <p className="text-base text-white/80">Ireland & United Kingdom</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="max-w-[1346px] mx-auto px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/50">
            <span>© 2026 MployUs Locums. All rights reserved.</span>
            <button onClick={onBackToHome} className="hover:text-white transition-colors">← Back to MployUs.com</button>
          </div>
        </div>
      </footer>

      {/* ═══════════════════════════════════
          AUTH MODAL
      ═══════════════════════════════════ */}
      {authModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setAuthModal(null)} />
          <div className="relative w-full max-w-md bg-white border border-black/10 rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 pt-6">
              <div className="flex items-center gap-2">
                <img src={imgLogo} alt="MployUs Locums" className="h-7 w-auto object-contain" />
              </div>
              <button onClick={() => setAuthModal(null)} className="p-1.5 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {authModal === 'signin' ? (
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
                    <button onClick={() => onBookDemo('Sign In')} className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors">Log In</button>
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
                <div className="space-y-4">
                  <div className="flex items-center gap-1.5">
                    {(['role', 'details', 'verify'] as const).map((s, i) => {
                      const order = ['role', 'details', 'verify'];
                      const active = order.indexOf(signupStep) >= i;
                      return <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors ${active ? 'bg-blue-600' : 'bg-slate-200'}`} />;
                    })}
                  </div>
                  {signupStep === 'role' && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">Choose your account type</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Tell us how you'll use MployUs Locums.</p>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        {([{ key: 'Locum', icon: Stethoscope, desc: 'A healthcare professional looking for shifts' }, { key: 'Client', icon: Building2, desc: 'A pharmacy or facility posting shifts' }] as const).map(r => {
                          const Icon = r.icon;
                          const active = role === r.key;
                          return (
                            <button key={r.key} onClick={() => setRole(r.key)} className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3 ${active ? 'bg-blue-50 border-blue-500 shadow-sm' : 'bg-white border-black/10 hover:border-slate-300'}`}>
                              <Icon className={`w-6 h-6 mt-0.5 ${active ? 'text-blue-600' : 'text-slate-500'}`} />
                              <div>
                                <div className="text-sm font-bold text-slate-900">Register as a {r.key}</div>
                                <p className="text-[11px] text-slate-500 mt-0.5">{r.desc}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                      <button disabled={!role} onClick={() => setSignupStep('details')} className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5">
                        Continue <ChevronRight className="w-4 h-4" />
                      </button>
                      <p className="text-center text-[11px] text-slate-500">
                        Already have an account?{' '}
                        <button onClick={() => setAuthModal('signin')} className="font-semibold text-blue-700 hover:underline">Sign in</button>
                      </p>
                    </div>
                  )}
                  {signupStep === 'details' && (
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">Account setup</h3>
                        <p className="text-xs text-slate-500 mt-0.5">The form adapts to your profession and its registration body.</p>
                      </div>
                      {role === 'Locum' && (
                        <>
                          <label className="block text-xs font-semibold text-slate-700">Your profession</label>
                          <div className="relative">
                            <select value={setupProfession.name} onChange={(e) => setSetupProfession(PROFESSIONS.find(p => p.name === e.target.value)!)} className="w-full appearance-none px-3 py-2.5 rounded-xl bg-white border border-black/10 text-xs font-semibold text-slate-800 outline-none cursor-pointer">
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
                        <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 space-y-2">
                          <label className="block text-xs font-bold text-blue-800">{setupProfession.reg} <span className="text-rose-600">*</span></label>
                          <input placeholder={`Enter your ${setupProfession.reg}`} className="w-full px-3 py-2.5 rounded-lg bg-white border border-blue-200 text-xs outline-none" />
                        </div>
                      ) : (
                        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <p className="text-[11px] text-emerald-800 font-medium">No professional registration number required for {setupProfession.name}.</p>
                        </div>
                      ))}
                      <input placeholder="Mobile number" className="w-full px-3 py-2.5 rounded-xl bg-white border border-black/10 text-xs outline-none" />
                      <div className="flex items-center gap-2 pt-1">
                        <button onClick={() => setSignupStep('role')} className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors">Back</button>
                        <button onClick={() => setSignupStep('verify')} className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5">
                          <UserPlus className="w-4 h-4" /> Create account
                        </button>
                      </div>
                    </div>
                  )}
                  {signupStep === 'verify' && (
                    <div className="flex flex-col items-center text-center space-y-4 py-2">
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
                      <button onClick={() => { onBookDemo('Account created'); setAuthModal(null); }} className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors">
                        Verify & Continue
                      </button>
                      <button className="text-[11px] text-slate-500 hover:text-slate-900 font-medium">Resend code</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════
          COOKIE BANNER
      ═══════════════════════════════════ */}
      {cookieOpen && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-50 bg-white border border-black/10 rounded-2xl shadow-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Cookie className="w-5 h-5 text-amber-500" />
            <h4 className="text-sm font-bold text-slate-900">We value your privacy</h4>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            We use cookies to improve your experience, analyse traffic and personalise content. Manage your preferences or accept all.
          </p>
          {cookiePrefsOpen && (
            <div className="mt-3 space-y-2">
              {([{ key: 'necessary', label: 'Necessary', locked: true }, { key: 'functional', label: 'Functional', locked: false }, { key: 'performance', label: 'Performance', locked: false }, { key: 'targeting', label: 'Targeting', locked: false }] as const).map(pref => (
                <label key={pref.key} className="flex items-center justify-between text-xs">
                  <span className="text-slate-700 font-medium">{pref.label}{pref.locked && <span className="text-slate-400"> (always on)</span>}</span>
                  <input type="checkbox" disabled={pref.locked} checked={cookiePrefs[pref.key]} onChange={(e) => setCookiePrefs(prev => ({ ...prev, [pref.key]: e.target.checked }))} className="accent-blue-600 w-4 h-4 disabled:opacity-60" />
                </label>
              ))}
            </div>
          )}
          <div className="flex items-center gap-2 mt-4">
            <button onClick={() => setCookiePrefsOpen(o => !o)} className="flex-1 py-2 text-xs font-semibold text-slate-700 border border-black/10 rounded-lg hover:bg-slate-50 transition-colors">
              {cookiePrefsOpen ? 'Save preferences' : 'Preferences'}
            </button>
            <button onClick={() => setCookieOpen(false)} className="flex-1 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              Accept all
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
