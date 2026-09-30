import React, { useState, useEffect, useRef } from 'react';
import {
  Users, Clock, ShieldCheck, MapPin, CheckCircle2, ArrowRight, Building2,
  Search, Calendar, Stethoscope, Briefcase, Mail, Lock, Linkedin, Phone,
  ChevronDown, ChevronRight, BookOpen, GraduationCap, Cookie, Award,
  PlusCircle, UserPlus, Check, Menu, X, Apple, Play, Bell, Zap, Wallet,
  Plus, Minus, TrendingUp, Star, Sparkles, MoveRight, Smartphone
} from 'lucide-react';

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
  country: string; flag: string; currency: string; defaultCity: string;
  cities: string[]; compliance: string; payGuide: string;
  shifts: { facility: string; location: string; date: string; time: string; rate: string; urgent: boolean }[];
}> = {
  IE: {
    country: 'Ireland', flag: '🇮🇪', currency: '€', defaultCity: 'Dublin',
    cities: ['Dublin', 'Cork', 'Galway', 'Limerick', 'Waterford'],
    compliance: 'Garda vetting', payGuide: '€50–€60/hr',
    shifts: [
      { facility: 'Boots Pharmacy — Grafton St', location: 'Dublin 2, IE', date: 'Mon 27 Jul', time: '09:00–18:00', rate: '€55/hr', urgent: true },
      { facility: 'McCabes Pharmacy', location: 'Cork City, IE', date: 'Tue 28 Jul', time: '08:30–17:30', rate: '€52/hr', urgent: false },
      { facility: 'LloydsPharmacy', location: 'Galway, IE', date: 'Wed 29 Jul', time: '10:00–19:00', rate: '€58/hr', urgent: true },
      { facility: 'Hickeys Pharmacy', location: 'Limerick, IE', date: 'Thu 30 Jul', time: '09:00–18:00', rate: '€50/hr', urgent: false },
    ]
  },
  UK: {
    country: 'United Kingdom', flag: '🇬🇧', currency: '£', defaultCity: 'London',
    cities: ['London', 'Manchester', 'Birmingham', 'Belfast', 'Glasgow'],
    compliance: 'Enhanced DBS check', payGuide: '£28–£38/hr',
    shifts: [
      { facility: 'Boots — Oxford Street', location: 'London W1, UK', date: 'Mon 27 Jul', time: '09:00–18:00', rate: '£34/hr', urgent: true },
      { facility: 'Well Pharmacy', location: 'Manchester, UK', date: 'Tue 28 Jul', time: '08:30–17:30', rate: '£30/hr', urgent: false },
      { facility: 'Rowlands Pharmacy', location: 'Birmingham, UK', date: 'Wed 29 Jul', time: '10:00–19:00', rate: '£36/hr', urgent: true },
      { facility: 'Gordons Chemists', location: 'Belfast, NI', date: 'Thu 30 Jul', time: '09:00–18:00', rate: '£32/hr', urgent: false },
    ]
  }
};

const detectRegionFromTimezone = (): Region => {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz === 'Europe/Dublin') return 'IE';
    if (['Europe/London','Europe/Belfast','Europe/Guernsey','Europe/Isle_of_Man','Europe/Jersey'].some(z => tz === z || tz.startsWith(z))) return 'UK';
  } catch { /* ignore */ }
  return 'IE';
};

type Profession = { name: string; reg: string | null; region: 'UK' | 'IE' | 'Both' };
const PROFESSIONS: Profession[] = [
  { name: 'Locum GP', reg: 'GMC Number', region: 'UK' },
  { name: 'Locum GP (Ireland)', reg: 'IMC Number', region: 'IE' },
  { name: 'Agency Nurse', reg: 'NMBI Number', region: 'IE' },
  { name: 'Locum Optician', reg: 'CORU Registration Number', region: 'Both' },
  { name: 'Locum Pharmacist', reg: 'PSNI Number', region: 'Both' },
  { name: 'Agency HCA', reg: null, region: 'Both' },
  { name: 'Locum Pharmacy Technician', reg: null, region: 'Both' },
];

const WHO_CAN_JOIN = [
  { img: imgRectangle3463566, label: 'Registered Nurses', emoji: '🩺' },
  { img: imgRectangle3463567, label: 'Pharmacists', emoji: '💊' },
  { img: imgRectangle3463568, label: 'Doctors & Consultants', emoji: '🩻' },
  { img: imgRectangle3463569, label: 'Healthcare Assistants', emoji: '🧑‍⚕️' },
  { img: imgRectangle3463569, label: 'Allied Health Workers', emoji: '🧬' },
];

const WHY_FEATURES = [
  { icon: Calendar, title: 'Flexible Scheduling', desc: 'Pick shifts based on your availability. Work when it suits you — no long-term commitments.' },
  { icon: ShieldCheck, title: 'Verified Employers', desc: 'Every listed shift comes from a trusted, compliance-checked healthcare institution.' },
  { icon: MapPin, title: 'Location-Based Listings', desc: 'Find shifts near you or in preferred regions. Coverage across Ireland and the UK.' },
  { icon: TrendingUp, title: 'Transparent Pay', desc: 'See the rate, duration, and role upfront. Zero hidden agency cuts — you keep 100%.' },
  { icon: Users, title: 'Supportive Community', desc: 'Connect with professionals who choose flexibility and high-standard healthcare work.' },
];

const TESTIMONIALS = [
  { name: 'Aoife N.', role: 'Locum Pharmacist, Dublin', quote: "The platform is super easy to use and the support team is responsive. I've picked up consistent shifts across Dublin — brilliant experience.", stars: 5 },
  { name: 'James O.', role: 'Agency Nurse, Belfast', quote: 'Onboarding took ten minutes and my NMBI details were verified the same day. I love the flexibility this gives me.', stars: 5 },
  { name: 'Sarah K.', role: 'Locum GP, Cork', quote: "MployUs Locums has transformed how I manage my work-life balance. I'm in control of my schedule for the first time.", stars: 5 },
  { name: 'Pharmacy Lead', role: 'McCabes, Cork', quote: "We fill last-minute cover before lunch. It's completely replaced our old agency — faster, cheaper, and more reliable.", stars: 5 },
];

const STATS = [
  { value: '140+', label: 'Registered professionals', icon: Users },
  { value: '25+', label: 'Partner facilities', icon: Building2 },
  { value: '0%', label: 'Agency commission', icon: TrendingUp },
  { value: '< 2hr', label: 'Average shift fill', icon: Clock },
];

// ─── Label pill used throughout sections ─────────────────────────────────────
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[11px] font-bold uppercase tracking-widest">
    <Sparkles className="w-3 h-3" />
    {children}
  </span>
);

export const LocumProvisionPage: React.FC<LocumProvisionPageProps> = ({ onBackToHome, onBookDemo }) => {
  const [region, setRegion] = useState<Region>('IE');
  const [searchProfession, setSearchProfession] = useState('Locum Pharmacist');
  const [searchLocation, setSearchLocation] = useState('Dublin');
  const loc = REGIONS[region];

  const [faqRegion, setFaqRegion] = useState<'UK' | 'IE'>('IE');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [faqTab, setFaqTab] = useState<'Locum' | 'Employers'>('Locum');

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [authModal, setAuthModal] = useState<'signin' | 'signup' | null>(null);
  const [signupStep, setSignupStep] = useState<'role' | 'details' | 'verify'>('role');
  const [role, setRole] = useState<'Locum' | 'Client' | null>(null);
  const [setupProfession, setSetupProfession] = useState<Profession>(PROFESSIONS[4]);
  const [smsCode, setSmsCode] = useState(['', '', '', '', '', '']);

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const guess = detectRegionFromTimezone();
    setRegion(guess);
    setSearchLocation(REGIONS[guess].defaultCity);
    setFaqRegion(guess);
  }, []);

  const applyRegion = (r: Region) => {
    setRegion(r);
    setSearchLocation(REGIONS[r].defaultCity);
    setFaqRegion(r);
  };

  const openAuth = (mode: 'signin' | 'signup') => {
    setMobileNavOpen(false);
    setSignupStep('role');
    setAuthModal(mode);
  };

  type LocumPage = 'home' | 'find-shifts' | 'post-shift' | 'cpd' | 'blog' | 'faq';
  const [page, setPage] = useState<LocumPage>('home');
  const [wizardStep, setWizardStep] = useState(1);
  const [postType, setPostType] = useState<'Locum Shift' | 'Permanent Job'>('Locum Shift');
  const [cookieOpen, setCookieOpen] = useState(true);
  const [cookiePrefsOpen, setCookiePrefsOpen] = useState(false);
  const [cookiePrefs, setCookiePrefs] = useState({ necessary: true, functional: true, performance: true, targeting: false });

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
    { tag: 'Market Report', title: 'How Irish SMEs are rethinking recruitment in 2026', read: '6 min read', color: 'bg-violet-50 text-violet-700 border-violet-100' },
    { tag: 'Salary Guide', title: '2026 Locum Pharmacist pay rates: Ireland vs UK', read: '8 min read', color: 'bg-blue-50 text-blue-700 border-blue-100' },
    { tag: 'Compliance', title: 'The complete Garda vetting & DBS toolkit for employers', read: '11 min read', color: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  ];

  const cpdCourses = [
    { title: 'Antimicrobial Stewardship', hours: '3 CPD hours', icon: Award, color: 'from-blue-500 to-blue-600' },
    { title: 'Safeguarding Adults at Risk', hours: '2 CPD hours', icon: ShieldCheck, color: 'from-violet-500 to-violet-600' },
    { title: 'Emergency Contraception Consultation', hours: '4 CPD hours', icon: GraduationCap, color: 'from-emerald-500 to-emerald-600' },
  ];

  // ── Search bar (reused on multiple pages) ────────────────────────────────
  const SearchBar = ({ dark = false }: { dark?: boolean }) => (
    <div className={`rounded-2xl ${dark ? 'bg-white/10 backdrop-blur-xl border border-white/20 p-2' : 'bg-white border border-black/10 shadow-lg shadow-blue-900/5 p-2'} grid grid-cols-1 md:grid-cols-4 gap-2`}>
      {[
        { icon: Stethoscope, placeholder: 'Profession', isSelect: true, value: searchProfession, onChange: (v: string) => setSearchProfession(v), options: PROFESSIONS.map(p => p.name) },
        { icon: MapPin, placeholder: 'Location', isSelect: true, value: searchLocation, onChange: (v: string) => setSearchLocation(v), options: loc.cities },
        { icon: Calendar, placeholder: 'Date', isSelect: false, value: '', onChange: () => {}, type: 'date' },
      ].map(({ icon: Icon, placeholder, isSelect, value, onChange, options, type }, i) => (
        <div key={i} className={`flex items-center gap-2.5 px-4 py-3 rounded-xl ${dark ? 'bg-white/10 border border-white/10' : 'bg-slate-50 border border-slate-100'}`}>
          <Icon className={`w-4 h-4 shrink-0 ${dark ? 'text-white/50' : 'text-slate-400'}`} />
          {isSelect ? (
            <select value={value} onChange={e => onChange(e.target.value)} className={`bg-transparent text-sm font-medium w-full outline-none cursor-pointer ${dark ? 'text-white' : 'text-slate-800'}`}>
              {options!.map(o => <option key={o}>{o}</option>)}
            </select>
          ) : (
            <input type={type || 'text'} placeholder={placeholder} className={`bg-transparent text-sm font-medium w-full outline-none ${dark ? 'text-white placeholder:text-white/40' : 'text-slate-600 placeholder:text-slate-400'}`} />
          )}
        </div>
      ))}
      <button
        onClick={() => goto('find-shifts')}
        className="px-4 py-3 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-600/30"
      >
        <Search className="w-4 h-4" /> Search Shifts
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-slate-900" style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}>

      {/* ══════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════ */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-lg shadow-sm border-b border-black/5' : 'bg-white border-b border-black/8'}`}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <div className="flex items-center justify-between h-[70px]">

            <button onClick={() => goto('home')} className="shrink-0">
              <img src={imgLogo} alt="MployUs Locums" className="h-10 w-auto object-contain" />
            </button>

            <nav className="hidden lg:flex items-center">
              {navLinks.map(l => (
                <button
                  key={l.id}
                  onClick={() => goto(l.id)}
                  className={`px-3.5 py-2 mx-0.5 text-[14px] font-medium rounded-lg transition-all ${
                    page === l.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-2">
              <div className="flex items-center bg-slate-50 border border-slate-100 rounded-lg p-0.5 mr-1">
                {(Object.keys(REGIONS) as Region[]).map(r => (
                  <button
                    key={r}
                    onClick={() => applyRegion(r)}
                    title={REGIONS[r].country}
                    className={`w-8 h-7 rounded-md text-base flex items-center justify-center transition-all ${region === r ? 'bg-white shadow-sm' : 'opacity-40 hover:opacity-80'}`}
                  >
                    {REGIONS[r].flag}
                  </button>
                ))}
              </div>
              <button onClick={onBackToHome} className="text-[11px] font-medium text-slate-400 hover:text-slate-600 mr-1 transition-colors">
                MployUs.com ↗
              </button>
              <button onClick={() => openAuth('signup')} className="px-4 py-2 text-sm font-semibold text-slate-700 border border-slate-200 rounded-lg hover:border-slate-300 hover:bg-slate-50 transition-all">
                Register
              </button>
              <button onClick={() => openAuth('signin')} className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-lg shadow-md shadow-blue-600/20 transition-all">
                Login
              </button>
            </div>

            <button className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100" onClick={() => setMobileNavOpen(o => !o)}>
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileNavOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white/98 backdrop-blur-xl px-4 py-4 space-y-1">
            {navLinks.map(l => (
              <button key={l.id} onClick={() => goto(l.id)} className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold ${page === l.id ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}>
                {l.label}
              </button>
            ))}
            <div className="flex gap-1.5 pt-3">
              {(Object.keys(REGIONS) as Region[]).map(r => (
                <button key={r} onClick={() => applyRegion(r)} className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold border transition-colors ${region === r ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-slate-100 text-slate-600'}`}>
                  <span className="text-base">{REGIONS[r].flag}</span> {REGIONS[r].country}
                </button>
              ))}
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={() => openAuth('signup')} className="flex-1 py-2.5 text-sm font-semibold border border-slate-200 rounded-lg">Register</button>
              <button onClick={() => openAuth('signin')} className="flex-1 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg">Login</button>
            </div>
            <button onClick={onBackToHome} className="block w-full text-left px-3 py-2 text-[11px] text-slate-400">← Back to MployUs.com</button>
          </div>
        )}
      </header>

      {/* ══════════════════════════════════════
          HOME PAGE
      ══════════════════════════════════════ */}
      {page === 'home' && (
        <>

        {/* ── HERO ── */}
        <section className="relative min-h-[88vh] flex flex-col mt-[70px] overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            <img src={imgOverlay} alt="" className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-slate-900/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
          </div>

          {/* Glassmorphic stat cards — right side */}
          <div className="absolute right-[6%] top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-3 z-10">
            {[
              { val: '140+', label: 'Registered Professionals', color: 'text-blue-300' },
              { val: '25+', label: 'Partner Facilities', color: 'text-emerald-300' },
              { val: '0%', label: 'Agency Commission', color: 'text-amber-300' },
            ].map(stat => (
              <div key={stat.val} className="backdrop-blur-2xl bg-white/10 border border-white/15 rounded-2xl px-6 py-5 text-center w-52">
                <div className={`text-4xl font-bold ${stat.color}`}>{stat.val}</div>
                <p className="text-white/70 text-xs mt-1.5 leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Hero copy */}
          <div className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-20 xl:px-28 max-w-[780px] py-24">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-semibold uppercase tracking-widest mb-6 w-fit backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Healthcare Locum Marketplace · Ireland & UK
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-5">
              Browse & apply<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-500">flexible shifts</span><br />
              near you.
            </h1>

            <p className="text-lg text-white/75 leading-relaxed max-w-[520px] mb-8 font-normal">
              Join our growing network of trusted medical professionals. Transparent pay, verified employers, zero agency margins.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => goto('find-shifts')}
                className="group flex items-center gap-2 px-7 py-3.5 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-600/30 transition-all"
              >
                Browse Available Shifts
                <MoveRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={() => openAuth('signup')}
                className="flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold text-sm rounded-xl backdrop-blur-sm transition-all"
              >
                Register as a Locum
              </button>
            </div>
          </div>

          {/* Search bar floated at bottom */}
          <div className="relative z-10 px-6 sm:px-12 lg:px-20 xl:px-28 pb-10">
            <SearchBar dark />
          </div>
        </section>

        {/* ── STATS RIBBON ── */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 border-y border-blue-500/30">
          <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map(stat => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex flex-col items-center text-center">
                  <Icon className="w-5 h-5 text-blue-200 mb-2" />
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <p className="text-blue-100/80 text-xs mt-1 font-medium">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section className="py-28 max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Stacked images with offset */}
            <div className="relative h-[520px] hidden lg:block">
              <div className="absolute left-0 top-0 w-[330px] h-[460px] rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/15 ring-1 ring-black/5">
                <img src={imgTjqvmx3} alt="Healthcare professional" className="w-full h-full object-cover" />
              </div>
              <div className="absolute right-0 bottom-0 w-[300px] h-[420px] rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/15 ring-1 ring-black/5 border-4 border-white">
                <img src={imgImage1} alt="Medical consultation" className="w-full h-full object-cover" />
              </div>
              {/* Floating badge */}
              <div className="absolute left-[270px] top-[200px] bg-white rounded-2xl shadow-xl border border-black/5 px-4 py-3 z-10">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">All Vetted</div>
                    <div className="text-[10px] text-slate-500">Garda & DBS verified</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="space-y-6">
              <SectionLabel>About Us</SectionLabel>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-[1.1] tracking-tight">
                MployUs connects you to the <span className="text-blue-600">right job</span>
              </h2>
              <div className="space-y-4 text-[15px] text-slate-600 leading-relaxed">
                <p>
                  At MployUs Locums, we connect healthcare professionals with flexible, reliable shift opportunities at trusted medical facilities. Whether you're a nurse, doctor, pharmacist, or allied health worker, our platform helps you take control of your schedule and work on your terms.
                </p>
                <p>
                  Our locum provision software enables seamless scheduling, tracking, and management of locum professionals, while ensuring continuous coverage and efficient management of temporary staffing needs for medical facilities.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                {[
                  { icon: Zap, label: 'Instant shift matching' },
                  { icon: Wallet, label: 'Keep 100% of your rate' },
                  { icon: ShieldCheck, label: 'Compliance handled' },
                  { icon: Bell, label: 'Real-time notifications' },
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                        <Icon className="w-3.5 h-3.5 text-blue-600" />
                      </div>
                      {item.label}
                    </div>
                  );
                })}
              </div>
              <button onClick={() => goto('find-shifts')} className="group inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
                Browse open shifts <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </section>

        {/* ── WHO CAN JOIN ── */}
        <section className="py-24 bg-slate-50 border-y border-slate-100">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
            <div className="text-center mb-14">
              <SectionLabel>Who can join MployUs Locums</SectionLabel>
              <h2 className="text-4xl font-bold text-slate-900 tracking-tight mt-4 mb-3">Built for certified healthcare professionals</h2>
              <p className="text-slate-500 text-base max-w-xl mx-auto leading-relaxed">
                Flexible shifts at trusted hospitals and clinics. If you're qualified and passionate about care, join us today.
              </p>
            </div>

            <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
              {WHO_CAN_JOIN.map((item, i) => (
                <div key={i} className="group shrink-0 cursor-pointer">
                  <div className="relative w-[260px] h-[380px] rounded-2xl overflow-hidden shadow-lg shadow-slate-900/10 ring-1 ring-black/5">
                    <img src={item.img} alt={item.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="text-2xl mb-1">{item.emoji}</div>
                      <p className="text-white font-semibold text-[15px] leading-tight">{item.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-2 mt-8">
              {WHO_CAN_JOIN.map((_, i) => (
                <div key={i} className={`rounded-full transition-all ${i === 1 ? 'w-6 h-2 bg-blue-600' : 'w-2 h-2 bg-slate-200'}`} />
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY MPLOYUS ── */}
        <section className="py-28 max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Feature list */}
            <div className="space-y-8 order-2 lg:order-1">
              <div className="space-y-3">
                <SectionLabel>Why MployUs Locums?</SectionLabel>
                <h2 className="text-4xl font-bold text-slate-900 tracking-tight leading-[1.1]">
                  Everything you need to<br /><span className="text-blue-600">work on your terms</span>
                </h2>
              </div>
              <div className="space-y-5">
                {WHY_FEATURES.map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <div key={i} className="flex gap-4 group">
                      <div className="w-11 h-11 rounded-xl bg-blue-50 group-hover:bg-blue-100 border border-blue-100 flex items-center justify-center shrink-0 transition-colors">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-[15px]">{f.title}</h4>
                        <p className="text-slate-500 text-sm mt-0.5 leading-relaxed">{f.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => openAuth('signup')} className="px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-xl shadow-md shadow-blue-600/20 transition-all">
                  Join for free
                </button>
                <button onClick={() => goto('find-shifts')} className="px-5 py-2.5 text-sm font-bold text-slate-700 border border-slate-200 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-all">
                  Browse shifts
                </button>
              </div>
            </div>

            {/* Image */}
            <div className="order-1 lg:order-2">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/15 ring-1 ring-black/5 h-[520px]">
                <img src={imgWmremoveTransformed1} alt="Healthcare professional" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
                {/* Overlay card */}
                <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-sm rounded-2xl p-4 border border-white/50 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Live shifts available</div>
                      <div className="text-xl font-bold text-slate-900 mt-0.5">{loc.shifts.length} shifts near {loc.defaultCity}</div>
                    </div>
                    <button onClick={() => goto('find-shifts')} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors">
                      View all →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── MOBILE APP ── */}
        <section className="py-8 px-6 lg:px-12 max-w-[1280px] mx-auto">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
            {/* Decorative blobs */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/15 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[420px]">
              {/* Text */}
              <div className="p-10 lg:p-14 flex flex-col justify-center space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/80 text-[11px] font-semibold uppercase tracking-widest w-fit">
                  <Smartphone className="w-3 h-3" /> Mobile App
                </div>
                <h2 className="text-4xl font-bold text-white leading-tight">
                  Your shifts,<br />in your pocket.
                </h2>
                <p className="text-white/60 text-[15px] leading-relaxed max-w-md">
                  Find and apply for locum shifts on the go. Manage your schedule, submit timesheets, and track payments — all in one app.
                </p>
                <ul className="space-y-2.5">
                  {[
                    { icon: Bell, label: 'Real-time shift alerts near you' },
                    { icon: CheckCircle2, label: 'One-tap apply & in-app timesheets' },
                    { icon: Wallet, label: 'Weekly payment tracking' },
                  ].map(f => {
                    const Icon = f.icon;
                    return (
                      <li key={f.label} className="flex items-center gap-2.5 text-sm text-white/75">
                        <Icon className="w-4 h-4 text-blue-400 shrink-0" /> {f.label}
                      </li>
                    );
                  })}
                </ul>
                <div className="flex flex-wrap gap-3 pt-2">
                  {[
                    { icon: Apple, top: 'Download on the', bottom: 'App Store', key: 'iOS App' },
                    { icon: Play, top: 'Get it on', bottom: 'Google Play', key: 'Android App' },
                  ].map(btn => {
                    const Icon = btn.icon;
                    return (
                      <button
                        key={btn.key}
                        onClick={() => onBookDemo(btn.key)}
                        className="flex items-center gap-3 px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl transition-all group"
                      >
                        <Icon className="w-5 h-5 text-white fill-current" />
                        <span className="text-left">
                          <span className="block text-[9px] text-white/50">{btn.top}</span>
                          <span className="block text-sm font-bold text-white">{btn.bottom}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Phone image */}
              <div className="relative flex items-end justify-center overflow-hidden">
                <img
                  src={imgIPhone17}
                  alt="MployUs Locums mobile app"
                  className="relative z-10 h-[380px] w-auto object-contain"
                  style={{ transform: 'rotate(-8deg) translateY(20px)' }}
                />
                {/* Notification bubble */}
                <div className="absolute top-12 right-10 bg-white rounded-2xl shadow-xl border border-black/5 px-4 py-3 z-20">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center">
                      <Bell className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-slate-900">New shift nearby</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{loc.currency}55/hr · {loc.defaultCity}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="py-28 max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <SectionLabel>Testimonials</SectionLabel>
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight mt-4 mb-3">Trusted by healthcare professionals</h2>
            <p className="text-slate-500 text-base max-w-md mx-auto">Hear what our community has to say about working with MployUs Locums.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="group relative bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-xl hover:shadow-slate-900/8 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Quote mark */}
                <div className="text-5xl text-blue-100 font-serif leading-none mb-3 select-none">"</div>
                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {[...Array(t.stars)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-5">{t.quote}</p>
                <div className="flex items-center gap-3 pt-3 border-t border-slate-50">
                  {/* Avatar letter */}
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{t.name}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ SECTION ── */}
        <section className="py-28 bg-slate-50 border-t border-slate-100">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
              {/* Left sticky */}
              <div className="lg:col-span-2 space-y-5 lg:sticky lg:top-24 self-start">
                <SectionLabel>FAQ</SectionLabel>
                <h2 className="text-4xl font-bold text-slate-900 tracking-tight leading-[1.1]">Frequently asked questions</h2>
                <p className="text-slate-500 text-[15px] leading-relaxed">
                  Everything you need to know about working with MployUs Locums, from shift requests to payments.
                </p>
                <button onClick={() => goto('faq')} className="group inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
                  View all FAQs <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              {/* Right: accordion */}
              <div className="lg:col-span-3 space-y-6">
                {/* Tabs */}
                <div className="flex items-center gap-1 bg-white border border-slate-100 rounded-xl p-1 w-fit">
                  {(['Locum', 'Employers'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => { setFaqTab(tab); setOpenFaq(0); }}
                      className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${faqTab === tab ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="space-y-2">
                  {faqs[faqTab].map((f, i) => {
                    const isOpen = openFaq === i;
                    return (
                      <div
                        key={f.q}
                        className={`rounded-xl border transition-all duration-200 overflow-hidden ${isOpen ? 'bg-blue-600 border-blue-600 shadow-lg shadow-blue-600/20' : 'bg-white border-slate-100 hover:border-slate-200'}`}
                      >
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : i)}
                          className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                        >
                          <span className={`text-sm font-semibold leading-snug ${isOpen ? 'text-white' : 'text-slate-900'}`}>{f.q}</span>
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-white/20' : 'bg-slate-50'}`}>
                            {isOpen ? <Minus className="w-4 h-4 text-white" /> : <Plus className="w-4 h-4 text-slate-500" />}
                          </div>
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-5 text-sm text-white/85 leading-relaxed">{f.a}</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA STRIP ── */}
        <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center lg:text-left">
              <div className="text-xs font-bold text-blue-400 uppercase tracking-widest">Join MployUs Locums</div>
              <h3 className="text-3xl font-bold text-white">Start finding — or filling — shifts today</h3>
              <p className="text-slate-400 text-sm">Free to join in Ireland and the UK. Zero agency commission.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button onClick={() => openAuth('signup')} className="px-7 py-3.5 bg-white text-slate-900 font-bold text-sm rounded-xl hover:bg-slate-50 transition-colors shadow-lg">
                Create free account
              </button>
              <button onClick={onBackToHome} className="px-6 py-3.5 bg-white/10 hover:bg-white/15 border border-white/10 text-white font-semibold text-sm rounded-xl transition-colors">
                Back to MployUs
              </button>
            </div>
          </div>
        </section>

        </>
      )}

      {/* ══════════════════════════════════════
          FIND SHIFTS
      ══════════════════════════════════════ */}
      {page === 'find-shifts' && (
        <div className="pt-[70px] min-h-screen bg-slate-50">
          {/* Hero banner */}
          <div className="bg-gradient-to-br from-slate-900 to-blue-950 pt-16 pb-10 px-6 lg:px-12">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{loc.flag}</span>
                <span className="text-blue-300 text-xs font-bold uppercase tracking-widest">{loc.country}</span>
              </div>
              <h1 className="text-4xl font-bold text-white tracking-tight mb-2">Find your next shift</h1>
              <p className="text-slate-400 text-sm mb-8 max-w-xl">Search live locum and permanent healthcare shifts. Switch country with the flags in the navbar.</p>
              <SearchBar dark />
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-6 lg:px-12 py-10">
            <div className="flex items-end justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{searchProfession} shifts near {searchLocation}</h2>
                <p className="text-xs text-slate-500 mt-1">Typical rate: <span className="font-semibold text-slate-700">{loc.payGuide}</span> · Compliance: {loc.compliance}</p>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full">{shifts.length} available</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-3">
                {shifts.map((s) => (
                  <div key={s.facility} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all p-5 flex items-center justify-between gap-4 group">
                    <div className="space-y-1.5">
                      {s.urgent && <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-100">Urgent</span>}
                      <h4 className="font-bold text-slate-900">{s.facility}</h4>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-500 font-medium">
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{s.location}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{s.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{s.time}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xl font-bold text-slate-900">{s.rate}</div>
                      <button onClick={() => onBookDemo(`Shift: ${s.facility}`)} className="mt-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold rounded-lg transition-colors">
                        Apply
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 p-5 h-fit shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold text-slate-900">{loc.flag} {loc.country} coverage</span>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">Live</span>
                </div>
                <div className="space-y-2">
                  {loc.cities.map(city => {
                    const count = (city.length * 3) % 12 + 4;
                    const active = city === searchLocation;
                    return (
                      <button key={city} onClick={() => setSearchLocation(city)} className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-all border ${active ? 'bg-blue-50 border-blue-200 shadow-sm' : 'bg-slate-50 border-transparent hover:border-slate-200'}`}>
                        <span className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                          <MapPin className={`w-3.5 h-3.5 ${active ? 'text-blue-600' : 'text-slate-400'}`} /> {city}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400">{count} open</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          POST A SHIFT
      ══════════════════════════════════════ */}
      {page === 'post-shift' && (
        <div className="pt-[70px] min-h-screen bg-slate-50">
          <div className="bg-gradient-to-br from-slate-900 to-blue-950 pt-16 pb-10 px-6 text-center">
            <span className="text-xs font-bold text-violet-300 uppercase tracking-widest">For Employers</span>
            <h1 className="text-4xl font-bold text-white mt-2 tracking-tight">Post an open shift in 3 steps</h1>
            <p className="text-slate-400 text-sm mt-2 max-w-lg mx-auto">List a locum shift or a permanent role and reach verified {loc.country} healthcare professionals in minutes.</p>
          </div>
          <div className="max-w-2xl mx-auto px-4 py-12">
            {/* Stepper */}
            <div className="flex items-center mb-8">
              {['Shift Type', 'Shift Details', 'Contact Details'].map((label, i) => {
                const step = i + 1;
                const done = wizardStep > step;
                const active = wizardStep === step;
                return (
                  <React.Fragment key={label}>
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${done ? 'bg-blue-600 text-white' : active ? 'bg-white text-slate-900 shadow-md ring-2 ring-blue-600' : 'bg-white border border-slate-200 text-slate-400'}`}>
                        {done ? <Check className="w-4 h-4" /> : step}
                      </div>
                      <span className={`text-xs font-semibold hidden sm:block ${active || done ? 'text-slate-900' : 'text-slate-400'}`}>{label}</span>
                    </div>
                    {i < 2 && <div className={`flex-1 h-0.5 mx-3 rounded transition-colors ${wizardStep > step ? 'bg-blue-600' : 'bg-slate-200'}`} />}
                  </React.Fragment>
                );
              })}
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7 space-y-5">
              {wizardStep === 1 && (
                <div className="space-y-4">
                  <h4 className="font-bold text-slate-900">What are you posting?</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {(['Locum Shift', 'Permanent Job'] as const).map(t => (
                      <button key={t} onClick={() => setPostType(t)} className={`p-5 rounded-xl border-2 text-left transition-all ${postType === t ? 'border-blue-500 bg-blue-50' : 'border-slate-100 bg-white hover:border-slate-200'}`}>
                        {t === 'Locum Shift' ? <Clock className="w-5 h-5 text-blue-600 mb-2" /> : <Briefcase className="w-5 h-5 text-violet-600 mb-2" />}
                        <div className="font-bold text-sm text-slate-900">{t}</div>
                        <p className="text-[11px] text-slate-500 mt-0.5">{t === 'Locum Shift' ? 'Temporary cover for one or more days' : 'Full-time or part-time role'}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {wizardStep === 2 && (
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-900">Shift details</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <input placeholder="Profession required" className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-blue-400 transition-colors" />
                    <input placeholder="Hourly rate (€ / £)" className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-blue-400 transition-colors" />
                    <input type="date" className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-600 outline-none focus:border-blue-400 transition-colors" />
                    <input placeholder="Location / town" className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-blue-400 transition-colors" />
                  </div>
                  <textarea placeholder="Description & requirements" rows={3} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none resize-none focus:border-blue-400 transition-colors" />
                </div>
              )}
              {wizardStep === 3 && (
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-900">Contact details</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <input placeholder="Facility name" className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-blue-400 transition-colors" />
                    <input placeholder="Contact name" className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-blue-400 transition-colors" />
                    <input placeholder="Email address" className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-blue-400 transition-colors" />
                    <input placeholder="Phone number" className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-blue-400 transition-colors" />
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between pt-2">
                <button onClick={() => setWizardStep(s => Math.max(1, s - 1))} disabled={wizardStep === 1} className="px-4 py-2.5 text-sm font-semibold text-slate-500 hover:text-slate-900 disabled:opacity-40 transition-colors">← Back</button>
                {wizardStep < 3
                  ? <button onClick={() => setWizardStep(s => s + 1)} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors flex items-center gap-1.5">Continue <ChevronRight className="w-4 h-4" /></button>
                  : <button onClick={() => onBookDemo(`Post ${postType}`)} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors flex items-center gap-1.5">Publish Shift <PlusCircle className="w-4 h-4" /></button>
                }
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          CPD
      ══════════════════════════════════════ */}
      {page === 'cpd' && (
        <div className="pt-[70px] min-h-screen bg-slate-50">
          <div className="bg-gradient-to-br from-slate-900 to-blue-950 pt-16 pb-14 px-6 text-center">
            <span className="text-blue-300 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 mb-3"><GraduationCap className="w-4 h-4" /> CPD Training</span>
            <h1 className="text-4xl font-bold text-white tracking-tight">Keep your registration current</h1>
            <p className="text-slate-400 text-sm mt-2 max-w-lg mx-auto">Earn CPD hours between shifts with accredited courses and certificates.</p>
          </div>
          <div className="max-w-5xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {cpdCourses.map(c => {
                const Icon = c.icon;
                return (
                  <div key={c.title} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all group cursor-pointer">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center mb-4 shadow-md`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-bold text-slate-900 mb-1">{c.title}</h4>
                    <p className="text-xs text-slate-500 mb-4">{c.hours}</p>
                    <button onClick={() => onBookDemo('CPD Training')} className="text-xs font-bold text-blue-600 group-hover:text-blue-700 flex items-center gap-1">
                      Start course <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          BLOG
      ══════════════════════════════════════ */}
      {page === 'blog' && (
        <div className="pt-[70px] min-h-screen bg-slate-50">
          <div className="bg-gradient-to-br from-slate-900 to-blue-950 pt-16 pb-14 px-6">
            <div className="max-w-5xl mx-auto">
              <span className="text-blue-300 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 mb-3"><BookOpen className="w-4 h-4" /> Content Hub</span>
              <h1 className="text-4xl font-bold text-white tracking-tight">Guides, salary reports & insights</h1>
            </div>
          </div>
          <div className="max-w-5xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {articles.map(a => (
                <button key={a.title} onClick={() => onBookDemo(`Article: ${a.title}`)} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-left hover:shadow-md hover:-translate-y-0.5 transition-all group">
                  <span className={`inline-block px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border mb-4 ${a.color}`}>{a.tag}</span>
                  <h4 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-blue-700 transition-colors">{a.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-3 font-medium">{a.read}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          FAQ PAGE
      ══════════════════════════════════════ */}
      {page === 'faq' && (
        <div className="pt-[70px] min-h-screen bg-slate-50">
          <div className="bg-gradient-to-br from-slate-900 to-blue-950 pt-16 pb-14 px-6 text-center">
            <h1 className="text-4xl font-bold text-white tracking-tight">Frequently Asked Questions</h1>
            <p className="text-slate-400 text-sm mt-2 max-w-lg mx-auto">Everything you need to know about working with MployUs Locums.</p>
          </div>
          <div className="max-w-3xl mx-auto px-6 py-12">
            <div className="flex items-center gap-1 bg-white border border-slate-100 rounded-xl p-1 w-fit mb-8">
              {(['Locum', 'Employers'] as const).map(tab => (
                <button key={tab} onClick={() => { setFaqTab(tab); setOpenFaq(0); }} className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${faqTab === tab ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'}`}>
                  {tab}
                </button>
              ))}
            </div>
            <div className="space-y-2">
              {faqs[faqTab].map((f, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={f.q} className={`rounded-xl border overflow-hidden transition-all ${isOpen ? 'bg-blue-600 border-blue-600 shadow-lg shadow-blue-600/20' : 'bg-white border-slate-100 hover:border-slate-200'}`}>
                    <button onClick={() => setOpenFaq(isOpen ? null : i)} className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left">
                      <span className={`text-sm font-semibold ${isOpen ? 'text-white' : 'text-slate-900'}`}>{f.q}</span>
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${isOpen ? 'bg-white/20' : 'bg-slate-50'}`}>
                        {isOpen ? <Minus className="w-4 h-4 text-white" /> : <Plus className="w-4 h-4 text-slate-500" />}
                      </div>
                    </button>
                    {isOpen && <div className="px-5 pb-5 text-sm text-white/85 leading-relaxed">{f.a}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          FOOTER
      ══════════════════════════════════════ */}
      <footer className="bg-slate-950 text-slate-400">
        {/* Top bar */}
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-16 pb-12">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-10 pb-12 border-b border-white/8">
            <div className="space-y-4">
              <img src={imgLogoWhite} alt="MployUs Locums" className="h-12 w-auto object-contain opacity-90" />
              <p className="text-sm text-slate-500 max-w-xs leading-relaxed">The healthcare locum marketplace for Ireland & the UK. Flexible shifts, transparent pay, zero agency commission.</p>
              {/* Region switcher */}
              <div className="flex items-center gap-1.5">
                {(Object.keys(REGIONS) as Region[]).map(r => (
                  <button key={r} onClick={() => applyRegion(r)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold border transition-colors ${region === r ? 'bg-blue-600/10 border-blue-500/30 text-blue-400' : 'border-white/8 text-slate-500 hover:text-white'}`}>
                    <span>{REGIONS[r].flag}</span> {REGIONS[r].country}
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-3 lg:w-80">
              <h4 className="text-white font-semibold text-base">Get new shifts in your inbox</h4>
              <p className="text-slate-500 text-xs">Weekly shift digests and rate updates. No spam.</p>
              <div className="flex gap-2">
                <div className="flex-1 flex items-center gap-2 px-3.5 py-2.5 bg-white/5 border border-white/8 rounded-xl">
                  <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                  <input type="email" placeholder="you@email.com" className="bg-transparent text-sm text-white w-full outline-none placeholder:text-slate-600" />
                </div>
                <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-colors shrink-0">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12">
            {[
              { title: 'Platform', links: navLinks.map(l => ({ label: l.label, onClick: () => goto(l.id) })) },
              { title: 'Legal', links: ['Privacy Statement', 'Terms & Conditions', 'Cookie Policy', 'FAQs'].map(l => ({ label: l, onClick: () => onBookDemo('Legal') })) },
              { title: 'Account', links: ['Sign In', 'Register', 'Register a Facility'].map(l => ({ label: l, onClick: () => openAuth(l === 'Sign In' ? 'signin' : 'signup') })) },
              { title: 'Contact', links: [{ label: 'info@mployuslocums.com', onClick: () => {} }, { label: '+353 1 234 5678', onClick: () => {} }, { label: 'Ireland & United Kingdom', onClick: () => {} }] },
            ].map(col => (
              <div key={col.title} className="space-y-3">
                <h5 className="text-white text-sm font-bold uppercase tracking-wider">{col.title}</h5>
                {col.links.map(link => (
                  <button key={link.label} onClick={link.onClick} className="block text-sm text-slate-500 hover:text-white transition-colors text-left">{link.label}</button>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/5">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-600">
            <span>© 2026 MployUs Locums Ltd. All rights reserved.</span>
            <button onClick={onBackToHome} className="hover:text-white transition-colors">← Back to MployUs.com</button>
          </div>
        </div>
      </footer>

      {/* ══════════════════════════════════════
          AUTH MODAL
      ══════════════════════════════════════ */}
      {authModal && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setAuthModal(null)} />
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl max-h-[92vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-0">
              <img src={imgLogo} alt="MployUs Locums" className="h-8 w-auto object-contain" />
              <button onClick={() => setAuthModal(null)} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {authModal === 'signin' ? (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Welcome back</h3>
                    <p className="text-sm text-slate-500 mt-0.5">Log in to your MployUs Locums account.</p>
                  </div>
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus-within:border-blue-400 transition-colors">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <input placeholder="Email address" className="bg-transparent text-sm w-full outline-none" />
                    </div>
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus-within:border-blue-400 transition-colors">
                      <Lock className="w-4 h-4 text-slate-400" />
                      <input type="password" placeholder="Password" className="bg-transparent text-sm w-full outline-none" />
                    </div>
                    <button onClick={() => onBookDemo('Sign In')} className="w-full py-3 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-sm font-bold rounded-xl shadow-md shadow-blue-600/20 transition-all">
                      Log In
                    </button>
                    <div className="flex items-center gap-3 text-[10px] text-slate-300 uppercase tracking-wider">
                      <div className="flex-1 h-px bg-slate-100" /> or <div className="flex-1 h-px bg-slate-100" />
                    </div>
                    <button className="w-full py-3 bg-[#0a66c2] hover:bg-[#0959aa] text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors">
                      <Linkedin className="w-4 h-4" /> Continue with LinkedIn
                    </button>
                  </div>
                  <p className="text-center text-xs text-slate-500">
                    New to MployUs?{' '}
                    <button onClick={() => { setSignupStep('role'); setAuthModal('signup'); }} className="font-bold text-blue-600 hover:underline">Create account</button>
                  </p>
                </div>
              ) : (
                <div className="space-y-5">
                  {/* Progress bar */}
                  <div className="flex gap-1.5">
                    {(['role', 'details', 'verify'] as const).map((s, i) => {
                      const order = ['role', 'details', 'verify'];
                      return <div key={s} className={`h-1 flex-1 rounded-full transition-all duration-300 ${order.indexOf(signupStep) >= i ? 'bg-blue-600' : 'bg-slate-100'}`} />;
                    })}
                  </div>

                  {signupStep === 'role' && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">Choose account type</h3>
                        <p className="text-sm text-slate-500 mt-0.5">Tell us how you'll use MployUs Locums.</p>
                      </div>
                      <div className="space-y-2.5">
                        {([{ key: 'Locum' as const, icon: Stethoscope, desc: 'A healthcare professional seeking flexible shifts' }, { key: 'Client' as const, icon: Building2, desc: 'A pharmacy or facility posting shifts' }]).map(r => {
                          const Icon = r.icon;
                          const active = role === r.key;
                          return (
                            <button key={r.key} onClick={() => setRole(r.key)} className={`w-full p-4 rounded-xl border-2 text-left flex items-start gap-3 transition-all ${active ? 'border-blue-500 bg-blue-50' : 'border-slate-100 bg-white hover:border-slate-200'}`}>
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${active ? 'bg-blue-600' : 'bg-slate-100'}`}>
                                <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-slate-500'}`} />
                              </div>
                              <div>
                                <div className="font-bold text-slate-900 text-sm">Register as a {r.key}</div>
                                <p className="text-[11px] text-slate-500 mt-0.5">{r.desc}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                      <button disabled={!role} onClick={() => setSignupStep('details')} className="w-full py-3 bg-gradient-to-br from-blue-600 to-blue-700 disabled:opacity-40 text-white text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-1.5">
                        Continue <ChevronRight className="w-4 h-4" />
                      </button>
                      <p className="text-center text-xs text-slate-500">Already have an account? <button onClick={() => setAuthModal('signin')} className="font-bold text-blue-600 hover:underline">Sign in</button></p>
                    </div>
                  )}

                  {signupStep === 'details' && (
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">Account setup</h3>
                        <p className="text-sm text-slate-500 mt-0.5">Your form adapts to your profession's registration body.</p>
                      </div>
                      {role === 'Locum' && (
                        <div className="relative">
                          <select value={setupProfession.name} onChange={e => setSetupProfession(PROFESSIONS.find(p => p.name === e.target.value)!)} className="w-full appearance-none px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm font-semibold text-slate-800 outline-none cursor-pointer">
                            {PROFESSIONS.map(p => <option key={p.name}>{p.name}</option>)}
                          </select>
                          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-2.5">
                        <input placeholder={role === 'Client' ? 'Facility name' : 'Full name'} className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-blue-400 transition-colors" />
                        <input placeholder="Email" className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-blue-400 transition-colors" />
                      </div>
                      {role === 'Locum' && setupProfession.reg && (
                        <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 space-y-2">
                          <label className="block text-xs font-bold text-blue-900">{setupProfession.reg} <span className="text-rose-500">*</span></label>
                          <input placeholder={`Enter your ${setupProfession.reg}`} className="w-full px-3 py-2.5 rounded-lg bg-white border border-blue-100 text-sm outline-none" />
                        </div>
                      )}
                      <input placeholder="Mobile number" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-blue-400 transition-colors" />
                      <div className="flex gap-2">
                        <button onClick={() => setSignupStep('role')} className="px-4 py-3 text-sm font-semibold text-slate-500 hover:text-slate-900">← Back</button>
                        <button onClick={() => setSignupStep('verify')} className="flex-1 py-3 bg-gradient-to-br from-blue-600 to-blue-700 text-white text-sm font-bold rounded-xl flex items-center justify-center gap-1.5">
                          <UserPlus className="w-4 h-4" /> Create account
                        </button>
                      </div>
                    </div>
                  )}

                  {signupStep === 'verify' && (
                    <div className="flex flex-col items-center text-center space-y-5 py-2">
                      <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                        <Phone className="w-7 h-7 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">Verify your phone</h3>
                        <p className="text-sm text-slate-500 mt-1">Enter the 6-digit code we texted to your mobile.</p>
                      </div>
                      <div className="flex items-center gap-2.5">
                        {smsCode.map((digit, i) => (
                          <input
                            key={i}
                            value={digit}
                            maxLength={1}
                            onChange={e => {
                              const next = [...smsCode];
                              next[i] = e.target.value.replace(/\D/g, '');
                              setSmsCode(next);
                              if (e.target.value && e.target.nextElementSibling) (e.target.nextElementSibling as HTMLInputElement).focus();
                            }}
                            className="w-11 h-13 text-center text-lg font-bold rounded-xl bg-slate-50 border-2 border-slate-100 outline-none focus:border-blue-500 transition-colors"
                          />
                        ))}
                      </div>
                      <button onClick={() => { onBookDemo('Account created'); setAuthModal(null); }} className="w-full py-3 bg-gradient-to-br from-blue-600 to-blue-700 text-white text-sm font-bold rounded-xl">
                        Verify & Continue
                      </button>
                      <button className="text-xs text-slate-400 hover:text-slate-700 font-medium">Resend code</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          COOKIE BANNER
      ══════════════════════════════════════ */}
      {cookieOpen && (
        <div className="fixed bottom-5 left-5 right-5 sm:left-auto sm:right-6 sm:w-80 z-50 bg-white border border-slate-100 rounded-2xl shadow-2xl shadow-slate-900/15 p-5">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
              <Cookie className="w-4.5 h-4.5 text-amber-500" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Cookie preferences</h4>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">We use cookies to improve your experience and personalise content.</p>
            </div>
          </div>
          {cookiePrefsOpen && (
            <div className="mb-3 space-y-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
              {([{ key: 'necessary', label: 'Necessary', locked: true }, { key: 'functional', label: 'Functional', locked: false }, { key: 'performance', label: 'Performance', locked: false }, { key: 'targeting', label: 'Targeting', locked: false }] as const).map(pref => (
                <label key={pref.key} className="flex items-center justify-between text-xs">
                  <span className="text-slate-700 font-medium">{pref.label}{pref.locked && <span className="text-slate-400 font-normal"> (always on)</span>}</span>
                  <input type="checkbox" disabled={pref.locked} checked={cookiePrefs[pref.key]} onChange={e => setCookiePrefs(p => ({ ...p, [pref.key]: e.target.checked }))} className="accent-blue-600 w-4 h-4 disabled:opacity-50" />
                </label>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <button onClick={() => setCookiePrefsOpen(o => !o)} className="flex-1 py-2 text-xs font-semibold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              {cookiePrefsOpen ? 'Save' : 'Manage'}
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
