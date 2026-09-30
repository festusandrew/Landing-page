import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users, Clock, ShieldCheck, MapPin, CheckCircle2, ArrowRight, Building2,
  Search, Calendar, Stethoscope, Briefcase, Mail, Lock, Linkedin, Phone,
  ChevronDown, ChevronRight, BookOpen, GraduationCap, Cookie, Award,
  PlusCircle, UserPlus, Check, Menu, X, Apple, Play, Bell, Zap, Wallet,
  Plus, Minus, TrendingUp, Star, MoveRight, Smartphone
} from 'lucide-react';

// Figma-imported images
import imgOverlay from '../../imports/MacBookPro14372/1ce878ea07a35dd888253f3062acd8e1583d0cbc.png';
import imgFindShiftsHero from '../../imports/MacBookPro1441/1d99878d3d95dcc6a2d5ffb9854dbccbc6b8cb8d.png';
import imgIrelandMap from '../../imports/MacBookPro1441/4d4f0de56401e20dc9d2bd550fe89357c2414c3b.png';
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
  shifts: { facility: string; location: string; date: string; time: string; rate: string; urgent: boolean; specialisation: string; description: string; requirements: string[] }[];
}> = {
  IE: {
    country: 'Ireland', flag: '🇮🇪', currency: '€', defaultCity: 'Dublin',
    cities: ['Dublin', 'Cork', 'Galway', 'Limerick', 'Waterford'],
    compliance: 'Garda vetting', payGuide: '€50–€60/hr',
    shifts: [
      { facility: 'Boots Pharmacy — Grafton St', location: 'Dublin 2, IE', date: 'Mon 27 Jul', time: '09:00–18:00', rate: '€55/hr', urgent: true, specialisation: 'Community Pharmacy', description: 'We are looking for an experienced locum pharmacist to cover a full-day shift at our busy Grafton Street branch. You will be responsible for dispensing prescriptions, providing patient counselling, and supporting the in-store pharmacy team. This is a high-footfall city-centre location with a strong OTC and prescription volume.', requirements: ['PSI registration (active)', 'Minimum 1 year community pharmacy experience', 'Strong dispensing and OTC advisory skills', 'Garda vetting clearance required'] },
      { facility: 'McCabes Pharmacy', location: 'Cork City, IE', date: 'Tue 28 Jul', time: '08:30–17:30', rate: '€52/hr', urgent: false, specialisation: 'Community Pharmacy', description: 'McCabes Pharmacy Cork City requires a locum pharmacist for a day shift covering routine dispensing, Methadone supervision, and patient medication reviews. The team is friendly and the pharmacy is well-organised with a modern PMR system in place.', requirements: ['PSI registration', 'Methadone supervision experience preferred', 'Familiarity with Healthmail and eRx', 'Reliable and punctual'] },
      { facility: 'LloydsPharmacy', location: 'Galway, IE', date: 'Wed 29 Jul', time: '10:00–19:00', rate: '€58/hr', urgent: true, specialisation: 'Hospital Outpatient', description: 'Urgent cover needed at our Galway outpatient dispensary. The successful locum will manage a high volume of hospital prescriptions, liaise with clinical staff, and ensure seamless patient throughput. Familiarity with hospital formularies is a strong advantage.', requirements: ['PSI registration', 'Hospital pharmacy experience desirable', 'HPRA and dispensary SOPs compliance', 'Immediate availability essential'] },
      { facility: 'Hickeys Pharmacy', location: 'Limerick, IE', date: 'Thu 30 Jul', time: '09:00–18:00', rate: '€50/hr', urgent: false, specialisation: 'Community Pharmacy', description: 'Hickeys Pharmacy Limerick seeks a locum for a standard weekday shift. Duties include dispensing, patient consultations, and stock management. The team is small and supportive; the role suits a pharmacist comfortable working independently in a community setting.', requirements: ['PSI registration', 'Community pharmacy experience', 'Confident working independently', 'Knowledge of NMS and MUR services'] },
      { facility: 'Allcare Pharmacy', location: 'Waterford, IE', date: 'Fri 01 Aug', time: '09:00–17:00', rate: '€53/hr', urgent: false, specialisation: 'Community Pharmacy', description: 'Allcare Pharmacy Waterford requires locum cover for a Friday shift. The branch operates a busy dispensary alongside a wellness clinic. Duties include prescription dispensing, health checks, and supporting the medicines adherence programme.', requirements: ['PSI registration', 'Wellness and adherence programme experience a bonus', 'Strong interpersonal skills', 'Garda vetting up to date'] },
      { facility: 'Uniphar — Citywest', location: 'Dublin 24, IE', date: 'Sat 02 Aug', time: '08:00–16:00', rate: '€60/hr', urgent: true, specialisation: 'Hospital Pharmacy', description: 'Uniphar Citywest distribution centre requires a registered pharmacist for a Saturday shift overseeing wholesale prescription processing, controlled drug records, and dispatch sign-off. Excellent rate for an experienced hospital or wholesale pharmacist.', requirements: ['PSI registration', 'Controlled drugs handling experience', 'Wholesale or hospital background preferred', 'Available for Saturday shift'] },
      { facility: 'Careway Pharmacy', location: 'Galway, IE', date: 'Mon 04 Aug', time: '09:00–18:00', rate: '€51/hr', urgent: false, specialisation: 'Community Pharmacy', description: 'Careway Pharmacy in Galway city seeks a locum for a Monday shift. The role involves standard dispensing, walk-in consultations, and minor ailment referrals. The branch has a loyal patient base and a well-stocked dispensary.', requirements: ['PSI registration', 'Community pharmacy experience', 'Good organisational skills', 'Experience with Touchstore or similar PMR'] },
      { facility: 'Montague Pharmacy', location: 'Cork City, IE', date: 'Tue 05 Aug', time: '10:00–18:30', rate: '€54/hr', urgent: false, specialisation: 'Community Pharmacy', description: 'Montague Pharmacy Cork seeks a confident locum for a Tuesday afternoon shift. This is a medium-volume branch with a focus on patient engagement and chronic disease management. The existing team will support the locum with all PMR and workflow queries.', requirements: ['PSI registration', 'Chronic disease management experience preferred', 'Excellent communication skills', 'Garda vetting clearance'] },
    ]
  },
  UK: {
    country: 'United Kingdom', flag: '🇬🇧', currency: '£', defaultCity: 'London',
    cities: ['London', 'Manchester', 'Birmingham', 'Belfast', 'Glasgow'],
    compliance: 'Enhanced DBS check', payGuide: '£28–£38/hr',
    shifts: [
      { facility: 'Boots — Oxford Street', location: 'London W1, UK', date: 'Mon 27 Jul', time: '09:00–18:00', rate: '£34/hr', urgent: true, specialisation: 'Community Pharmacy', description: 'Boots Oxford Street is one of the busiest pharmacy branches in the UK. We need an experienced locum to manage high prescription volume, supervise dispensing assistants, and deliver our NHS services including NMS and pharmacy first consultations.', requirements: ['GPhC registration (active)', 'Minimum 2 years community pharmacy experience', 'NHS services experience (NMS, MUR, Pharmacy First)', 'Enhanced DBS required'] },
      { facility: 'Well Pharmacy', location: 'Manchester, UK', date: 'Tue 28 Jul', time: '08:30–17:30', rate: '£30/hr', urgent: false, specialisation: 'Community Pharmacy', description: 'Well Pharmacy Manchester requires a locum for a standard weekday shift. Duties include dispensing, patient consultations, and supporting the healthy living programme. The branch has a well-established team and modern dispensing systems.', requirements: ['GPhC registration', 'Community experience preferred', 'Familiarity with Pharmacy First', 'Punctual and professional manner'] },
      { facility: 'Rowlands Pharmacy', location: 'Birmingham, UK', date: 'Wed 29 Jul', time: '10:00–19:00', rate: '£36/hr', urgent: true, specialisation: 'Hospital Outpatient', description: 'Urgent cover required at Rowlands Birmingham outpatient dispensary. You will work alongside the hospital clinical team dispensing inpatient TTOs, providing discharge counselling, and managing controlled drug records to standard.', requirements: ['GPhC registration', 'Hospital dispensary experience essential', 'Controlled drug handling', 'Available at short notice'] },
      { facility: 'Gordons Chemists', location: 'Belfast, NI', date: 'Thu 30 Jul', time: '09:00–18:00', rate: '£32/hr', urgent: false, specialisation: 'Community Pharmacy', description: 'Gordons Chemists Belfast requires locum cover for a Thursday. The branch is a busy community pharmacy serving a large residential catchment. Duties include dispensing, MAS consultations, and Medicine Delivery Scheme support.', requirements: ['GPhC or PSNI registration', 'Community pharmacy experience in NI preferred', 'Familiarity with MAS and MDS', 'Enhanced DBS certificate'] },
      { facility: 'Lloyds Pharmacy', location: 'Glasgow, UK', date: 'Fri 01 Aug', time: '09:00–17:30', rate: '£33/hr', urgent: false, specialisation: 'Community Pharmacy', description: 'Lloyds Pharmacy Glasgow seeks a locum for a Friday shift. The branch handles a medium volume of NHS prescriptions alongside a busy OTC section. The locum will work alongside two dispensing technicians and a medicines counter assistant.', requirements: ['GPhC registration', 'Scottish community pharmacy experience a bonus', 'NHS Pharmacy First Scotland awareness', 'Reliable and team-oriented'] },
      { facility: 'Superdrug Health Clinic', location: 'London W2, UK', date: 'Sat 02 Aug', time: '10:00–18:00', rate: '£38/hr', urgent: true, specialisation: 'Pharmacy Clinic', description: 'Superdrug Health Clinic Bayswater requires a pharmacist to manage Saturday walk-in consultations including travel health, sexual health screening, and emergency contraception. High patient interaction role with strong clinical advisory component.', requirements: ['GPhC registration', 'Clinical or consultation experience', 'PGD experience (travel health, contraception)', 'Saturday availability essential'] },
      { facility: 'Day Lewis Pharmacy', location: 'Birmingham, UK', date: 'Mon 04 Aug', time: '08:30–17:30', rate: '£31/hr', urgent: false, specialisation: 'Community Pharmacy', description: 'Day Lewis Pharmacy Birmingham requires a locum for Monday cover. This independent-style branch operates a strong patient relationship model with a focus on blister packing, chronic disease management, and medication reviews.', requirements: ['GPhC registration', 'Blister packing experience preferred', 'Medication review and MUR background', 'Friendly and patient-focused approach'] },
      { facility: 'Cohens Chemist', location: 'Manchester, UK', date: 'Tue 05 Aug', time: '09:00–18:00', rate: '£29/hr', urgent: false, specialisation: 'Community Pharmacy', description: 'Cohens Chemist Manchester requires standard locum cover for a Tuesday shift. Duties include supervised consumption, dispensing, and patient counselling. A well-structured pharmacy with a supportive technician team already in place.', requirements: ['GPhC registration', 'Supervised consumption experience preferred', 'Familiar with RxWeb or Titan PMR', 'Flexible and adaptable'] },
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

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};
const stagger = (delay = 0.1) => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay } },
});
const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};
const slideRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

// Viewport-triggered wrapper
const Reveal = ({
  children, className = '', delay = 0, variant = fadeUp,
}: {
  children: React.ReactNode; className?: string; delay?: number; variant?: typeof fadeUp;
}) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-60px' }}
    variants={{ ...variant, visible: { ...variant.visible, transition: { ...(variant.visible as any).transition, delay } } }}
  >
    {children}
  </motion.div>
);

// Animated counter hook
function useCounter(target: number, duration = 1.6, inView = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return count;
}

// ─── Label pill used throughout sections ─────────────────────────────────────
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 border border-green-100 text-green-600 text-[11px] font-bold uppercase tracking-widest">
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

  const [dropdownOpen, setDropdownOpen] = useState<'profession' | 'location' | null>(null);
  const [selectedShift, setSelectedShift] = useState(0);
  const [filterSpecialisation, setFilterSpecialisation] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterCountry, setFilterCountry] = useState<'all' | 'IE' | 'UK-eng' | 'UK-wal' | 'UK-sco' | 'UK-ni'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'rate'>('date');

  // Apply flow
  const [applyOpen, setApplyOpen] = useState(false);
  const [applyStep, setApplyStep] = useState<1 | 2 | 3 | 4>(1);
  const [applyForm, setApplyForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    regBody: '', regNumber: '', yearsExp: '',
    transport: '', travelTime: '',
    coverNote: '', questions: '',
    termsAccepted: false, availabilityConfirmed: false,
  });

  const openApply = () => { setApplyStep(1); setApplyOpen(true); };
  const closeApply = () => { setApplyOpen(false); setApplyStep(1); };

  const [scrolled, setScrolled] = useState(false);
  const [statsInView, setStatsInView] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsInView(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
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

  // Post-shift modal flow
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [postStep, setPostStep] = useState<1|2|3|4|5>(1);
  const [postSuccess, setPostSuccess] = useState(false);
  const [postForm, setPostForm] = useState({
    profession: '', specialisation: '', date: '', startTime: '09:00', endTime: '17:30',
    rate: '', town: '', urgent: false,
    jobTitle: '', contractType: 'Full-time', salaryMin: '', salaryMax: '',
    description: '', requirements: '', benefits: '',
    facility: '', facilityAddress: '', contact: '', email: '', phone: '',
    termsAccepted: false,
  });
  const openPostModal = (type: 'Locum Shift' | 'Permanent Job') => {
    setPostType(type); setPostStep(1); setPostSuccess(false);
    setPostForm({ profession: '', specialisation: '', date: '', startTime: '09:00', endTime: '17:30', rate: '', town: '', urgent: false, jobTitle: '', contractType: 'Full-time', salaryMin: '', salaryMax: '', description: '', requirements: '', benefits: '', facility: '', facilityAddress: '', contact: '', email: '', phone: '', termsAccepted: false });
    setPostModalOpen(true);
  };
  const closePostModal = () => { setPostModalOpen(false); setPostSuccess(false); };
  // Locum: 4 steps. Permanent: 4 steps (different content)
  const postTotalSteps = 4;
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
  const applyShift = shifts[selectedShift] ?? shifts[0];

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
    { tag: 'Salary Guide', title: '2026 Locum Pharmacist pay rates: Ireland vs UK', read: '8 min read', color: 'bg-green-50 text-green-700 border-green-100' },
    { tag: 'Compliance', title: 'The complete Garda vetting & DBS toolkit for employers', read: '11 min read', color: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  ];

  const cpdCourses = [
    { title: 'Antimicrobial Stewardship', hours: '3 CPD hours', icon: Award, color: 'from-green-500 to-green-600' },
    { title: 'Safeguarding Adults at Risk', hours: '2 CPD hours', icon: ShieldCheck, color: 'from-violet-500 to-violet-600' },
    { title: 'Emergency Contraception Consultation', hours: '4 CPD hours', icon: GraduationCap, color: 'from-emerald-500 to-emerald-600' },
  ];

  // ── Search bar (reused on multiple pages) ────────────────────────────────
  const SearchDropdown = ({
    id, icon: Icon, value, options, onChange, dark,
  }: {
    id: 'profession' | 'location';
    icon: React.ElementType;
    value: string;
    options: string[];
    onChange: (v: string) => void;
    dark: boolean;
  }) => {
    const open = dropdownOpen === id;
    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setDropdownOpen(open ? null : id)}
          className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-left ${dark ? 'bg-white/10 border border-white/10' : 'bg-slate-50 border border-slate-100 hover:border-slate-200'} transition-colors`}
        >
          <Icon className={`w-4 h-4 shrink-0 ${dark ? 'text-white/50' : 'text-slate-400'}`} />
          <span className={`text-sm font-medium flex-1 select-text ${dark ? 'text-white' : 'text-slate-800'}`}>{value}</span>
          <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform ${dark ? 'text-white/40' : 'text-slate-400'} ${open ? 'rotate-180' : ''}`} />
        </button>
        {open && (
          <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-100 rounded-xl shadow-xl shadow-slate-900/10 z-50 overflow-hidden max-h-52 overflow-y-auto">
            {options.map(o => (
              <button
                key={o}
                type="button"
                onClick={() => { onChange(o); setDropdownOpen(null); }}
                className={`w-full text-left px-4 py-2.5 text-sm select-text transition-colors ${o === value ? 'bg-green-50 text-green-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                {o}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const SearchBar = ({ dark = false }: { dark?: boolean }) => (
    <div
      className={`rounded-2xl ${dark ? 'bg-white/10 backdrop-blur-xl border border-white/20 p-2' : 'bg-white border border-black/10 shadow-lg shadow-green-900/5 p-2'} grid grid-cols-1 md:grid-cols-4 gap-2`}
      onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setDropdownOpen(null); }}
    >
      <SearchDropdown id="profession" icon={Stethoscope} value={searchProfession} options={PROFESSIONS.map(p => p.name)} onChange={setSearchProfession} dark={dark} />
      <SearchDropdown id="location" icon={MapPin} value={searchLocation} options={loc.cities} onChange={setSearchLocation} dark={dark} />
      <div className={`flex items-center gap-2.5 px-4 py-3 rounded-xl ${dark ? 'bg-white/10 border border-white/10' : 'bg-slate-50 border border-slate-100'}`}>
        <Calendar className={`w-4 h-4 shrink-0 ${dark ? 'text-white/50' : 'text-slate-400'}`} />
        <input type="date" className={`bg-transparent text-sm font-medium w-full outline-none ${dark ? 'text-white/70' : 'text-slate-600'}`} />
      </div>
      <button
        onClick={() => goto('find-shifts')}
        className="px-4 py-3 bg-gradient-to-br from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-green-600/30"
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
                      ? 'bg-green-50 text-green-600'
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
              <button onClick={() => openAuth('signin')} className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-br from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 rounded-lg shadow-md shadow-green-600/20 transition-all">
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
              <button key={l.id} onClick={() => goto(l.id)} className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold ${page === l.id ? 'bg-green-50 text-green-700' : 'text-slate-700 hover:bg-slate-50'}`}>
                {l.label}
              </button>
            ))}
            <div className="flex gap-1.5 pt-3">
              {(Object.keys(REGIONS) as Region[]).map(r => (
                <button key={r} onClick={() => applyRegion(r)} className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold border transition-colors ${region === r ? 'bg-green-50 border-green-200 text-green-700' : 'bg-white border-slate-100 text-slate-600'}`}>
                  <span className="text-base">{REGIONS[r].flag}</span> {REGIONS[r].country}
                </button>
              ))}
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={() => openAuth('signup')} className="flex-1 py-2.5 text-sm font-semibold border border-slate-200 rounded-lg">Register</button>
              <button onClick={() => openAuth('signin')} className="flex-1 py-2.5 text-sm font-semibold text-white bg-green-600 rounded-lg">Login</button>
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
          {/* Background with subtle scale-in */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src={imgOverlay} alt="" className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-slate-900/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
          </motion.div>

          {/* Glassmorphic stat cards — right side, staggered in */}
          <div className="absolute right-[6%] top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-3 z-10">
            {[
              { val: '140+', label: 'Registered Professionals', color: 'text-green-300' },
              { val: '25+', label: 'Partner Facilities', color: 'text-emerald-300' },
              { val: '0%', label: 'Agency Commission', color: 'text-amber-300' },
            ].map((stat, i) => (
              <motion.div
                key={stat.val}
                className="backdrop-blur-2xl bg-white/10 border border-white/15 rounded-2xl px-6 py-5 text-center w-52"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.8 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.04, backgroundColor: 'rgba(255,255,255,0.15)' }}
              >
                <div className={`text-4xl font-bold ${stat.color}`}>{stat.val}</div>
                <p className="text-white/70 text-xs mt-1.5 leading-snug">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Hero copy — staggered lines */}
          <motion.div
            className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-20 xl:px-28 max-w-[780px] py-24"
            variants={stagger(0.12)}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-semibold uppercase tracking-widest mb-6 w-fit backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Healthcare Locum Marketplace · Ireland & UK
              </div>
            </motion.div>

            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-5"
              variants={fadeUp}
            >
              Browse & apply<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-500">flexible shifts</span><br />
              near you.
            </motion.h1>

            <motion.p
              className="text-lg text-white/75 leading-relaxed max-w-[520px] mb-8 font-normal"
              variants={fadeUp}
            >
              Join our growing network of trusted medical professionals. Transparent pay, verified employers, zero agency margins.
            </motion.p>

            <motion.div className="flex flex-wrap gap-3" variants={fadeUp}>
              <motion.button
                onClick={() => goto('find-shifts')}
                className="group flex items-center gap-2 px-7 py-3.5 bg-gradient-to-br from-green-500 to-green-600 text-white font-semibold text-sm rounded-xl shadow-lg shadow-green-600/30"
                whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(22,163,74,0.45)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                Browse Available Shifts
                <MoveRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </motion.button>
              <motion.button
                onClick={() => openAuth('signup')}
                className="flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold text-sm rounded-xl backdrop-blur-sm"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                Register as a Locum
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Search bar floated at bottom */}
          <motion.div
            className="relative z-10 px-6 sm:px-12 lg:px-20 xl:px-28 pb-10"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <SearchBar dark />
          </motion.div>
        </section>

        {/* ── STATS RIBBON ── */}
        <section className="bg-gradient-to-r from-green-600 to-green-700 border-y border-green-500/30">
          <div ref={statsRef} className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Icon className="w-5 h-5 text-green-200 mb-2" />
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <p className="text-green-100/80 text-xs mt-1 font-medium">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section className="py-28 max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Stacked images with offset */}
            <Reveal variant={slideLeft} className="relative h-[520px] hidden lg:block">
              <motion.div
                className="absolute left-0 top-0 w-[330px] h-[460px] rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/15 ring-1 ring-black/5"
                whileHover={{ scale: 1.02, rotate: -1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                <img src={imgTjqvmx3} alt="Healthcare professional" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div
                className="absolute right-0 bottom-0 w-[300px] h-[420px] rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/15 ring-1 ring-black/5 border-4 border-white"
                whileHover={{ scale: 1.02, rotate: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                <img src={imgImage1} alt="Medical consultation" className="w-full h-full object-cover" />
              </motion.div>
              {/* Floating badge */}
              <motion.div
                className="absolute left-[270px] top-[200px] bg-white rounded-2xl shadow-xl border border-black/5 px-4 py-3 z-10"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 350, damping: 22 }}
                whileHover={{ y: -3 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">All Vetted</div>
                    <div className="text-[10px] text-slate-500">Garda & DBS verified</div>
                  </div>
                </div>
              </motion.div>
            </Reveal>

            {/* Text */}
            <motion.div
              className="space-y-6"
              variants={stagger(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <motion.div variants={fadeUp}><SectionLabel>About Us</SectionLabel></motion.div>
              <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-bold text-slate-900 leading-[1.1] tracking-tight">
                MployUs connects you to the <span className="text-green-600">right job</span>
              </motion.h2>
              <motion.div variants={fadeUp} className="space-y-4 text-[15px] text-slate-600 leading-relaxed">
                <p>
                  At MployUs Locums, we connect healthcare professionals with flexible, reliable shift opportunities at trusted medical facilities. Whether you're a nurse, doctor, pharmacist, or allied health worker, our platform helps you take control of your schedule and work on your terms.
                </p>
                <p>
                  Our locum provision software enables seamless scheduling, tracking, and management of locum professionals, while ensuring continuous coverage and efficient management of temporary staffing needs for medical facilities.
                </p>
              </motion.div>
              <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3 pt-2">
                {[
                  { icon: Zap, label: 'Instant shift matching' },
                  { icon: Wallet, label: 'Keep 100% of your rate' },
                  { icon: ShieldCheck, label: 'Compliance handled' },
                  { icon: Bell, label: 'Real-time notifications' },
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      className="flex items-center gap-2.5 text-sm text-slate-700 font-medium"
                      whileHover={{ x: 3 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                      <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                        <Icon className="w-3.5 h-3.5 text-green-600" />
                      </div>
                      {item.label}
                    </motion.div>
                  );
                })}
              </motion.div>
              <motion.button
                variants={fadeUp}
                onClick={() => goto('find-shifts')}
                className="group inline-flex items-center gap-2 text-sm font-bold text-green-600 hover:text-green-700 transition-colors"
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                Browse open shifts <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* ── WHO CAN JOIN ── */}
        <section className="py-24 bg-slate-50 border-y border-slate-100">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
            <Reveal className="text-center mb-14">
              <SectionLabel>Who can join MployUs Locums</SectionLabel>
              <h2 className="text-4xl font-bold text-slate-900 tracking-tight mt-4 mb-3">Built for certified healthcare professionals</h2>
              <p className="text-slate-500 text-base max-w-xl mx-auto leading-relaxed">
                Flexible shifts at trusted hospitals and clinics. If you're qualified and passionate about care, join us today.
              </p>
            </Reveal>

            <motion.div
              className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide"
              variants={stagger(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
            >
              {WHO_CAN_JOIN.map((item, i) => (
                <motion.div
                  key={i}
                  className="group shrink-0 cursor-pointer"
                  variants={{
                    hidden: { opacity: 0, y: 40, scale: 0.96 },
                    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                >
                  <div className="relative w-[260px] h-[380px] rounded-2xl overflow-hidden shadow-lg shadow-slate-900/10 ring-1 ring-black/5">
                    <motion.img
                      src={item.img}
                      alt={item.label}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="text-2xl mb-1">{item.emoji}</div>
                      <p className="text-white font-semibold text-[15px] leading-tight">{item.label}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="flex justify-center gap-2 mt-8">
              {WHO_CAN_JOIN.map((_, i) => (
                <div key={i} className={`rounded-full transition-all ${i === 1 ? 'w-6 h-2 bg-green-600' : 'w-2 h-2 bg-slate-200'}`} />
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY MPLOYUS ── */}
        <section className="py-28 max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Feature list */}
            <motion.div
              className="space-y-8 order-2 lg:order-1"
              variants={stagger(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <motion.div variants={fadeUp} className="space-y-3">
                <SectionLabel>Why MployUs Locums?</SectionLabel>
                <h2 className="text-4xl font-bold text-slate-900 tracking-tight leading-[1.1]">
                  Everything you need to<br /><span className="text-green-600">work on your terms</span>
                </h2>
              </motion.div>
              <div className="space-y-5">
                {WHY_FEATURES.map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <motion.div
                      key={i}
                      className="flex gap-4 group"
                      variants={fadeUp}
                      whileHover={{ x: 6 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                    >
                      <motion.div
                        className="w-11 h-11 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center shrink-0"
                        whileHover={{ scale: 1.1, backgroundColor: '#dcfce7' }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      >
                        <Icon className="w-5 h-5 text-green-600" />
                      </motion.div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-[15px]">{f.title}</h4>
                        <p className="text-slate-500 text-sm mt-0.5 leading-relaxed">{f.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              <motion.div variants={fadeUp} className="flex gap-3 pt-2">
                <motion.button
                  onClick={() => openAuth('signup')}
                  className="px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-br from-green-600 to-green-700 rounded-xl shadow-md shadow-green-600/20"
                  whileHover={{ scale: 1.04, boxShadow: '0 8px 24px rgba(22,163,74,0.4)' }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  Join for free
                </motion.button>
                <motion.button
                  onClick={() => goto('find-shifts')}
                  className="px-5 py-2.5 text-sm font-bold text-slate-700 border border-slate-200 rounded-xl"
                  whileHover={{ scale: 1.04, borderColor: '#cbd5e1', backgroundColor: '#f8fafc' }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  Browse shifts
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Image */}
            <Reveal variant={slideRight} className="order-1 lg:order-2">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/15 ring-1 ring-black/5 h-[520px]">
                <motion.img
                  src={imgWmremoveTransformed1}
                  alt="Healthcare professional"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
                <motion.div
                  className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-sm rounded-2xl p-4 border border-white/50 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Live shifts available</div>
                      <div className="text-xl font-bold text-slate-900 mt-0.5">{loc.shifts.length} shifts near {loc.defaultCity}</div>
                    </div>
                    <button onClick={() => goto('find-shifts')} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-lg transition-colors">
                      View all →
                    </button>
                  </div>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── MOBILE APP ── */}
        <Reveal className="py-8 px-6 lg:px-12 max-w-[1280px] mx-auto">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-green-950 to-slate-900">
            {/* Decorative blobs */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-600/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-green-500/15 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none" />

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
                        <Icon className="w-4 h-4 text-green-400 shrink-0" /> {f.label}
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
                <motion.img
                  src={imgIPhone17}
                  alt="MployUs Locums mobile app"
                  className="relative z-10 h-[380px] w-auto object-contain"
                  style={{ rotate: -8, y: 20 }}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 20 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                  whileHover={{ rotate: -4, y: 10 }}
                />
                {/* Notification bubble */}
                <motion.div
                  className="absolute top-12 right-10 bg-white rounded-2xl shadow-xl border border-black/5 px-4 py-3 z-20 animate-[float_2.4s_ease-in-out_1s_infinite]"
                  initial={{ opacity: 0, scale: 0.7, x: 20 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, type: 'spring', stiffness: 350, damping: 22 }}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center">
                      <Bell className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-slate-900">New shift nearby</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{loc.currency}55/hr · {loc.defaultCity}</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── TESTIMONIALS ── */}
        <section className="py-28 max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <SectionLabel>Testimonials</SectionLabel>
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight mt-4 mb-3">Trusted by healthcare professionals</h2>
            <p className="text-slate-500 text-base max-w-md mx-auto">Hear what our community has to say about working with MployUs Locums.</p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5"
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                className="group relative bg-white border border-slate-100 rounded-2xl p-6 cursor-default"
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.97 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                }}
                whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(15,23,42,0.10)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              >
                <div className="text-5xl text-green-100 font-serif leading-none mb-3 select-none">"</div>
                <div className="flex gap-0.5 mb-3">
                  {[...Array(t.stars)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-5">{t.quote}</p>
                <div className="flex items-center gap-3 pt-3 border-t border-slate-50">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{t.name}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── FAQ SECTION ── */}
        <section className="py-28 bg-slate-50 border-t border-slate-100">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
              {/* Left sticky */}
              <motion.div
                className="lg:col-span-2 space-y-5 lg:sticky lg:top-24 self-start"
                variants={slideLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
              >
                <SectionLabel>FAQ</SectionLabel>
                <h2 className="text-4xl font-bold text-slate-900 tracking-tight leading-[1.1]">Frequently asked questions</h2>
                <p className="text-slate-500 text-[15px] leading-relaxed">
                  Everything you need to know about working with MployUs Locums, from shift requests to payments.
                </p>
                <motion.button
                  onClick={() => goto('faq')}
                  className="group inline-flex items-center gap-2 text-sm font-bold text-green-600 hover:text-green-700 transition-colors"
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  View all FAQs <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </motion.button>
              </motion.div>

              {/* Right: accordion */}
              <motion.div
                className="lg:col-span-3 space-y-6"
                variants={stagger(0.08)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
              >
                {/* Tabs */}
                <motion.div variants={fadeUp} className="flex items-center gap-1 bg-white border border-slate-100 rounded-xl p-1 w-fit">
                  {(['Locum', 'Employers'] as const).map(tab => (
                    <motion.button
                      key={tab}
                      onClick={() => { setFaqTab(tab); setOpenFaq(0); }}
                      className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${faqTab === tab ? 'bg-green-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'}`}
                      whileTap={{ scale: 0.95 }}
                    >
                      {tab}
                    </motion.button>
                  ))}
                </motion.div>

                <div className="space-y-2">
                  {faqs[faqTab].map((f, i) => {
                    const isOpen = openFaq === i;
                    return (
                      <motion.div
                        key={f.q}
                        variants={fadeUp}
                        className={`rounded-xl border overflow-hidden ${isOpen ? 'bg-green-600 border-green-600 shadow-lg shadow-green-600/20' : 'bg-white border-slate-100 hover:border-slate-200'}`}
                        animate={{ borderColor: isOpen ? '#16a34a' : '#f1f5f9' }}
                        transition={{ duration: 0.2 }}
                      >
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : i)}
                          className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                        >
                          <span className={`text-sm font-semibold leading-snug ${isOpen ? 'text-white' : 'text-slate-900'}`}>{f.q}</span>
                          <motion.div
                            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-white/20' : 'bg-slate-50'}`}
                            animate={{ rotate: isOpen ? 45 : 0 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                          >
                            <Plus className={`w-4 h-4 ${isOpen ? 'text-white' : 'text-slate-500'}`} />
                          </motion.div>
                        </button>
                        <motion.div
                          initial={false}
                          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div className="px-5 pb-5 text-sm text-white/85 leading-relaxed">{f.a}</div>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── CTA STRIP ── */}
        <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
          <motion.div
            className="max-w-[1280px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-8"
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            <motion.div variants={slideLeft} className="space-y-3 text-center lg:text-left">
              <div className="text-xs font-bold text-green-400 uppercase tracking-widest">Join MployUs Locums</div>
              <h3 className="text-3xl font-bold text-white">Start finding — or filling — shifts today</h3>
              <p className="text-slate-400 text-sm">Free to join in Ireland and the UK. Zero agency commission.</p>
            </motion.div>
            <motion.div variants={slideRight} className="flex flex-wrap items-center gap-3 shrink-0">
              <motion.button
                onClick={() => openAuth('signup')}
                className="px-7 py-3.5 bg-white text-slate-900 font-bold text-sm rounded-xl shadow-lg"
                whileHover={{ scale: 1.04, backgroundColor: '#f8fafc' }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              >
                Create free account
              </motion.button>
              <motion.button
                onClick={onBackToHome}
                className="px-6 py-3.5 bg-white/10 border border-white/10 text-white font-semibold text-sm rounded-xl"
                whileHover={{ scale: 1.03, backgroundColor: 'rgba(255,255,255,0.15)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              >
                Back to MployUs
              </motion.button>
            </motion.div>
          </motion.div>
        </section>

        </>
      )}

      {/* ══════════════════════════════════════
          FIND SHIFTS
      ══════════════════════════════════════ */}
      {page === 'find-shifts' && (
        <>
        <div className="pt-[70px] min-h-screen bg-white">

          {/* ── Hero banner with background image ── */}
          <div className="relative h-[340px] overflow-hidden">
            <img src={imgFindShiftsHero} alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-black/68" />
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 gap-3 pt-6">
              <p className="text-white/90 text-sm font-semibold tracking-widest uppercase">Find Your Next Healthcare Shift</p>
              <h1 className="text-3xl lg:text-[35px] font-bold text-white leading-tight max-w-3xl">
                Explore flexible locum shifts, apply instantly, and manage your availability in one place.
              </h1>
            </div>
          </div>

          {/* ── Filter bar ── */}
          <div className="bg-white border-b border-slate-100 shadow-sm">
            <div className="max-w-[1286px] mx-auto px-10 py-6 flex flex-wrap items-end justify-between gap-4" style={{ backgroundImage: 'linear-gradient(90deg, rgba(39,102,71,0.03) 0%, rgba(39,102,71,0.03) 100%), linear-gradient(90deg, #fff 0%, #fff 100%)' }}>
              <div className="flex flex-wrap gap-6 items-end">
                {/* Profession */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#757575] text-sm font-normal">Profession</label>
                  <div className="relative">
                    <select
                      value={searchProfession}
                      onChange={e => setSearchProfession(e.target.value)}
                      className="appearance-none bg-white border border-[#d9d9d9] rounded px-3.5 py-2.5 pr-8 text-sm text-slate-700 outline-none focus:border-green-500 w-[244px] cursor-pointer"
                    >
                      <option value="">Choose profession</option>
                      {PROFESSIONS.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#757575] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                {/* Specialisation */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#757575] text-sm font-normal">Specialisation</label>
                  <div className="relative">
                    <select
                      value={filterSpecialisation}
                      onChange={e => setFilterSpecialisation(e.target.value)}
                      className="appearance-none bg-white border border-[#d9d9d9] rounded px-3.5 py-2.5 pr-8 text-sm text-slate-700 outline-none focus:border-green-500 w-[240px] cursor-pointer"
                    >
                      <option value="">Choose Specialization</option>
                      <option>Community Pharmacy</option>
                      <option>Hospital Pharmacy</option>
                      <option>General Practice</option>
                      <option>Primary Care</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#757575] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                {/* Shift Location */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#757575] text-sm font-normal">Shift Location</label>
                  <div className="relative">
                    <select
                      value={searchLocation}
                      onChange={e => setSearchLocation(e.target.value)}
                      className="appearance-none bg-white border border-[#d9d9d9] rounded px-3.5 py-2.5 pr-8 text-sm text-slate-700 outline-none focus:border-green-500 w-[236px] cursor-pointer"
                    >
                      <option value="">Choose location</option>
                      {loc.cities.map(c => <option key={c}>{c}</option>)}
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#757575] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                {/* Start Date */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#757575] text-sm font-normal">Earliest Start Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={filterDate}
                      onChange={e => setFilterDate(e.target.value)}
                      className="bg-white border border-[#d9d9d9] rounded px-3.5 py-2.5 text-sm text-slate-700 outline-none focus:border-green-500 w-[200px] cursor-pointer"
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedShift(0)}
                className="bg-[#276647] hover:bg-[#1e4f37] text-white font-semibold text-[22px] px-8 py-3 rounded-lg transition-colors shrink-0"
              >
                Search
              </button>
            </div>
          </div>

          {/* ── Country filter tabs ── */}
          <div className="border-b border-slate-100 bg-white">
            <div className="max-w-[1286px] mx-auto px-10 py-4 flex flex-col gap-2">
              <p className="text-[#3d3d3d] text-sm">Select Country</p>
              <div className="flex flex-wrap gap-8 items-center">
                {[
                  { id: 'all', flag: '🌍', label: 'All' },
                  { id: 'UK-eng', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', label: 'England' },
                  { id: 'IE', flag: '🇮🇪', label: 'Republic of Ireland' },
                  { id: 'UK-wal', flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', label: 'Wales' },
                  { id: 'UK-sco', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', label: 'Scotland' },
                  { id: 'UK-ni', flag: '🇬🇧', label: 'Northern Ireland' },
                ].map(c => {
                  const active = filterCountry === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setFilterCountry(c.id as typeof filterCountry)}
                      className="flex items-center gap-2 text-[15px] text-black"
                    >
                      <div className={`w-[22px] h-[22px] rounded-full border flex items-center justify-center shrink-0 transition-colors ${active ? 'bg-[#2033A0] border-[#2033A0]' : 'border-black/40 bg-white'}`}>
                        {active && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-lg leading-none">{c.flag}</span>
                      <span>{c.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Main content: shift list + detail panel ── */}
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">

              {/* Left: shift list */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[#757575] text-base">Available Shift</p>
                  {/* Sort tabs */}
                  <div className="flex items-center gap-0.5 bg-white border border-[#d9d9d9] rounded-full px-0.5 py-0.5">
                    {(['date', 'rate', 'distance', 'added'] as const).map((s, i) => {
                      const labels = { date: 'Start Date', rate: 'Hourly Rate', distance: 'Distance', added: 'Date Added' };
                      const active = sortBy === s;
                      return (
                        <button
                          key={s}
                          onClick={() => setSortBy(s as 'date' | 'rate')}
                          className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${active ? 'bg-[#276647] text-white' : 'text-[#757575] hover:text-slate-900'}`}
                        >
                          {labels[s]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-0">
                  {/* Selected/active shift — green card */}
                  {shifts.map((s, i) => {
                    const active = selectedShift === i;
                    return (
                      <button
                        key={i}
                        onClick={() => setSelectedShift(i)}
                        className={`w-full text-left transition-all border-b border-[#f1f1f1] ${active ? 'bg-[#276647]' : 'bg-[rgba(245,245,245,0.6)] hover:bg-slate-50'}`}
                        style={active ? { borderColor: 'rgba(163,209,57,0.3)' } : {}}
                      >
                        <div className="flex flex-col gap-2 px-4 py-3">
                          {/* Pharmacy + title */}
                          <div>
                            <p className={`text-[11px] leading-snug ${active ? 'text-[#c5e8d7]' : 'text-black'}`}>{s.facility}</p>
                            <p className={`font-semibold text-lg leading-snug ${active ? 'text-[#a3d139]' : 'text-[#276647]'}`}>{searchProfession || 'Locum Pharmacist'}</p>
                          </div>
                          {/* Date + rate row */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Calendar className={`w-3.5 h-3.5 shrink-0 ${active ? 'text-[#c5e8d7]/80' : 'text-[#757575]'}`} />
                              <span className={`text-[13px] ${active ? 'text-white/80' : 'text-black'}`}>{s.date}</span>
                            </div>
                            <div>
                              <p className={`text-[13px] font-normal ${active ? 'text-[#a3d139]' : 'text-[#276647]'}`}>{s.rate}</p>
                              <p className={`text-[11px] ${active ? 'text-white/80' : 'text-black'}`}>Total Pay: {loc.currency}280</p>
                            </div>
                          </div>
                          {/* Time + location row */}
                          <div className="flex flex-col gap-1.5">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5">
                                <Clock className={`w-3.5 h-3.5 shrink-0 ${active ? 'text-white/80' : 'text-[#757575]'}`} />
                                <span className={`text-[13px] ${active ? 'text-white/80' : 'text-black'}`}>{s.time}</span>
                              </div>
                              <span className={`text-[13px] ${active ? 'text-[#c5e8d7]' : 'text-black'}`}>30 minutes unpaid</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <MapPin className={`w-3 h-3 shrink-0 ${active ? 'text-[#c5e8d7]/80' : 'text-[#757575]'}`} />
                              <span className={`text-[13px] ${active ? 'text-white/80' : 'text-black'}`}>{s.location}</span>
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Pagination */}
                <div className="flex items-center gap-1.5 mt-4 justify-center">
                  {[1,2,3,'...',11].map((p, i) => (
                    <button key={i} className={`min-w-[32px] h-8 rounded text-sm font-medium transition-colors ${p === 1 ? 'bg-[#276647] text-white' : 'text-slate-600 hover:bg-slate-100'}`}>{p}</button>
                  ))}
                </div>
              </div>

              {/* Right: selected shift detail + map */}
              {(() => {
                const s = shifts[selectedShift] ?? shifts[0];
                return (
                  <div className="flex flex-col gap-4">
                    {/* Detail card */}
                    <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-6 space-y-5">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm text-slate-500">{s.facility}</p>
                          <h2 className="text-2xl font-bold text-[#276647] mt-0.5">{searchProfession || 'Locum Pharmacist'}</h2>
                          <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full bg-green-50 border border-green-100 text-[11px] font-semibold text-[#276647]">{s.specialisation}</span>
                        </div>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#276647] text-[#276647] rounded text-xs font-semibold hover:bg-green-50 transition-colors shrink-0">
                          <ArrowRight className="w-3.5 h-3.5" /> Share link
                        </button>
                      </div>

                      {/* Key details grid */}
                      <div className="grid grid-cols-2 gap-4 text-sm border-t border-slate-50 pt-4">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2.5 text-slate-700">
                            <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                            <div>
                              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Date</p>
                              <p className="font-semibold">{s.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2.5 text-slate-700">
                            <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                            <div>
                              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Time</p>
                              <p className="font-semibold">{s.time} <span className="text-slate-400 font-normal text-xs">· 30 min unpaid break</span></p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2.5 text-slate-700">
                            <Wallet className="w-4 h-4 text-slate-400 shrink-0" />
                            <div>
                              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Hourly Rate</p>
                              <p className="font-bold text-[#276647] text-base">{s.rate}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2.5 text-slate-700">
                            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                            <div>
                              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Location</p>
                              <p className="font-semibold">{s.location}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="border-t border-slate-50 pt-4 space-y-2">
                        <h4 className="text-sm font-bold text-slate-900">About this shift</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">{s.description}</p>
                      </div>

                      {/* Requirements */}
                      <div className="border-t border-slate-50 pt-4 space-y-2">
                        <h4 className="text-sm font-bold text-slate-900">Requirements</h4>
                        <ul className="space-y-1.5">
                          {s.requirements.map((r, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                              <CheckCircle2 className="w-4 h-4 text-[#276647] shrink-0 mt-0.5" />
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Apply */}
                      <div className="pt-1">
                        <motion.button
                          onClick={openApply}
                          className="w-full py-3 bg-[#276647] hover:bg-[#1e4f37] text-white font-bold text-base rounded-lg transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                        >
                          Apply for this shift
                        </motion.button>
                      </div>
                    </div>

                    {/* Map */}
                    <div className="rounded-xl overflow-hidden border border-slate-100 shadow-sm">
                      <p className="px-4 py-2.5 bg-white text-sm font-semibold text-slate-700 border-b border-slate-100">Shift Location</p>
                      <div className="relative h-[320px] bg-[#e8f4ec]">
                        <img src={imgIrelandMap} alt="Shift location map" className="w-full h-full object-cover object-center" />
                        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md">
                          <p className="text-xs font-bold text-slate-900">{s.location}</p>
                          <p className="text-[10px] text-slate-500">{s.facility}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>

        {/* ══ APPLY FLOW MODAL ══ */}
        {applyOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              onClick={closeApply}
            />

            <motion.div
              className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            >
              {/* Modal header */}
              <div className="sticky top-0 z-10 bg-white border-b border-slate-100 px-7 py-5 flex items-center justify-between rounded-t-2xl">
                {applyStep < 4 ? (
                  <div className="flex-1">
                    <p className="text-xs font-bold text-[#276647] uppercase tracking-widest mb-1">Step {applyStep} of 3</p>
                    <div className="flex gap-1.5">
                      {[1,2,3].map(n => (
                        <div key={n} className={`h-1 flex-1 rounded-full transition-all duration-400 ${applyStep >= n ? 'bg-[#276647]' : 'bg-slate-100'}`} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div />
                )}
                <button onClick={closeApply} className="ml-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
                  <X className="w-4 h-4 text-slate-600" />
                </button>
              </div>

              {/* Shift summary strip */}
              {applyStep < 4 && (
                <div className="mx-7 mt-5 mb-1 bg-[#276647]/5 border border-[#276647]/10 rounded-xl px-4 py-3 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-slate-500">{applyShift.facility}</p>
                    <p className="font-bold text-[#276647] text-sm">{searchProfession || 'Locum Pharmacist'} · {applyShift.date}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-slate-500">{applyShift.time}</p>
                    <p className="font-bold text-[#276647] text-sm">{applyShift.rate}</p>
                  </div>
                </div>
              )}

              <div className="px-7 pb-7 pt-4">

                {/* ── STEP 1: Your Details ── */}
                {applyStep === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }} className="space-y-5">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Your details</h2>
                      <p className="text-sm text-slate-500 mt-1">We'll use these to confirm your identity and match your registration.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-700">First name <span className="text-rose-500">*</span></label>
                        <input value={applyForm.firstName} onChange={e => setApplyForm(f => ({...f, firstName: e.target.value}))} placeholder="e.g. Aoife" className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#276647] transition-colors bg-slate-50" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-700">Last name <span className="text-rose-500">*</span></label>
                        <input value={applyForm.lastName} onChange={e => setApplyForm(f => ({...f, lastName: e.target.value}))} placeholder="e.g. Murphy" className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#276647] transition-colors bg-slate-50" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-700">Email address <span className="text-rose-500">*</span></label>
                      <input type="email" value={applyForm.email} onChange={e => setApplyForm(f => ({...f, email: e.target.value}))} placeholder="your@email.com" className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#276647] transition-colors bg-slate-50" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-700">Mobile number <span className="text-rose-500">*</span></label>
                      <input type="tel" value={applyForm.phone} onChange={e => setApplyForm(f => ({...f, phone: e.target.value}))} placeholder="+353 87 000 0000" className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#276647] transition-colors bg-slate-50" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-700">Registration body <span className="text-rose-500">*</span></label>
                        <div className="relative">
                          <select value={applyForm.regBody} onChange={e => setApplyForm(f => ({...f, regBody: e.target.value}))} className="appearance-none w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#276647] transition-colors bg-slate-50 cursor-pointer">
                            <option value="">Select body</option>
                            <option>PSI (Ireland)</option>
                            <option>GPhC (UK)</option>
                            <option>PSNI (Northern Ireland)</option>
                            <option>IMC (Ireland)</option>
                            <option>GMC (UK)</option>
                            <option>NMBI (Ireland)</option>
                            <option>NMC (UK)</option>
                            <option>CORU (Ireland)</option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-700">Registration number <span className="text-rose-500">*</span></label>
                        <input value={applyForm.regNumber} onChange={e => setApplyForm(f => ({...f, regNumber: e.target.value}))} placeholder="e.g. PSI-12345" className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#276647] transition-colors bg-slate-50" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-700">Years of experience</label>
                      <div className="relative">
                        <select value={applyForm.yearsExp} onChange={e => setApplyForm(f => ({...f, yearsExp: e.target.value}))} className="appearance-none w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#276647] transition-colors bg-slate-50 cursor-pointer">
                          <option value="">Select range</option>
                          <option>Less than 1 year</option>
                          <option>1–2 years</option>
                          <option>3–5 years</option>
                          <option>6–10 years</option>
                          <option>10+ years</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                    <button
                      onClick={() => setApplyStep(2)}
                      disabled={!applyForm.firstName || !applyForm.lastName || !applyForm.email || !applyForm.phone || !applyForm.regBody || !applyForm.regNumber}
                      className="w-full py-3 bg-[#276647] disabled:opacity-40 hover:bg-[#1e4f37] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      Continue <ChevronRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}

                {/* ── STEP 2: Availability & Travel ── */}
                {applyStep === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }} className="space-y-5">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Availability & travel</h2>
                      <p className="text-sm text-slate-500 mt-1">Confirm you can make this shift and let us know how you'll get there.</p>
                    </div>
                    {/* Availability confirmation */}
                    <div className="bg-[#276647]/5 border border-[#276647]/10 rounded-xl p-4 space-y-3">
                      <p className="text-sm font-semibold text-slate-800">Shift you're applying for</p>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-slate-700">
                          <Calendar className="w-4 h-4 text-[#276647] shrink-0" />
                          <span>{applyShift.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-700">
                          <Clock className="w-4 h-4 text-[#276647] shrink-0" />
                          <span>{applyShift.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-700">
                          <MapPin className="w-4 h-4 text-[#276647] shrink-0" />
                          <span>{applyShift.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-700">
                          <Wallet className="w-4 h-4 text-[#276647] shrink-0" />
                          <span className="font-bold text-[#276647]">{applyShift.rate}</span>
                        </div>
                      </div>
                      <label className="flex items-start gap-3 cursor-pointer pt-1">
                        <input type="checkbox" checked={applyForm.availabilityConfirmed} onChange={e => setApplyForm(f => ({...f, availabilityConfirmed: e.target.checked}))} className="w-4 h-4 mt-0.5 accent-[#276647] shrink-0" />
                        <span className="text-sm text-slate-700">I confirm I am available and able to work this full shift without prior commitments.</span>
                      </label>
                    </div>
                    {/* Transport */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold text-slate-700">How will you get to the shift? <span className="text-rose-500">*</span></label>
                      <div className="grid grid-cols-2 gap-2.5">
                        {[
                          { icon: '🚗', label: 'Own car' },
                          { icon: '🚌', label: 'Public transport' },
                          { icon: '🚶', label: 'Walking / cycling' },
                          { icon: '🚕', label: 'Taxi / rideshare' },
                        ].map(t => (
                          <button
                            key={t.label}
                            type="button"
                            onClick={() => setApplyForm(f => ({...f, transport: t.label}))}
                            className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${applyForm.transport === t.label ? 'border-[#276647] bg-[#276647]/5 text-[#276647]' : 'border-slate-100 bg-slate-50 text-slate-700 hover:border-slate-200'}`}
                          >
                            <span className="text-lg">{t.icon}</span> {t.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-700">Estimated travel time to shift</label>
                      <div className="relative">
                        <select value={applyForm.travelTime} onChange={e => setApplyForm(f => ({...f, travelTime: e.target.value}))} className="appearance-none w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#276647] transition-colors bg-slate-50 cursor-pointer">
                          <option value="">Select estimate</option>
                          <option>Under 15 minutes</option>
                          <option>15–30 minutes</option>
                          <option>30–60 minutes</option>
                          <option>Over 1 hour</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                    <div className="flex gap-3 pt-1">
                      <button onClick={() => setApplyStep(1)} className="px-5 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">← Back</button>
                      <button
                        onClick={() => setApplyStep(3)}
                        disabled={!applyForm.availabilityConfirmed || !applyForm.transport}
                        className="flex-1 py-3 bg-[#276647] disabled:opacity-40 hover:bg-[#1e4f37] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                      >
                        Continue <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 3: Cover Note & Review ── */}
                {applyStep === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }} className="space-y-5">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Cover note & review</h2>
                      <p className="text-sm text-slate-500 mt-1">Add a message to the hiring manager and review your application before submitting.</p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-700">Cover note <span className="text-slate-400 font-normal">(optional)</span></label>
                      <textarea
                        value={applyForm.coverNote}
                        onChange={e => setApplyForm(f => ({...f, coverNote: e.target.value}))}
                        placeholder={`Hi, I'm a locum pharmacist with ${applyForm.yearsExp || 'several years of'} experience in community pharmacy. I'm very interested in covering this shift at ${applyShift.facility}...`}
                        rows={4}
                        className="px-3.5 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#276647] transition-colors bg-slate-50 resize-none"
                      />
                      <p className="text-[11px] text-slate-400">{applyForm.coverNote.length}/500 characters</p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-700">Any questions for the facility? <span className="text-slate-400 font-normal">(optional)</span></label>
                      <textarea
                        value={applyForm.questions}
                        onChange={e => setApplyForm(f => ({...f, questions: e.target.value}))}
                        placeholder="e.g. Is parking available on site? Is this shift dispensary-only or will there be OTC advisory?"
                        rows={3}
                        className="px-3.5 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#276647] transition-colors bg-slate-50 resize-none"
                      />
                    </div>
                    {/* Summary */}
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-3">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Application summary</p>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                        <div><span className="text-slate-400">Name</span><p className="font-semibold text-slate-900 mt-0.5">{applyForm.firstName} {applyForm.lastName}</p></div>
                        <div><span className="text-slate-400">Email</span><p className="font-semibold text-slate-900 mt-0.5 break-all">{applyForm.email}</p></div>
                        <div><span className="text-slate-400">Phone</span><p className="font-semibold text-slate-900 mt-0.5">{applyForm.phone}</p></div>
                        <div><span className="text-slate-400">Registration</span><p className="font-semibold text-slate-900 mt-0.5">{applyForm.regBody} · {applyForm.regNumber}</p></div>
                        <div><span className="text-slate-400">Experience</span><p className="font-semibold text-slate-900 mt-0.5">{applyForm.yearsExp || '—'}</p></div>
                        <div><span className="text-slate-400">Transport</span><p className="font-semibold text-slate-900 mt-0.5">{applyForm.transport} · {applyForm.travelTime || '—'}</p></div>
                      </div>
                    </div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" checked={applyForm.termsAccepted} onChange={e => setApplyForm(f => ({...f, termsAccepted: e.target.checked}))} className="w-4 h-4 mt-0.5 accent-[#276647] shrink-0" />
                      <span className="text-sm text-slate-600">I agree to MployUs Locums' <span className="text-[#276647] font-semibold underline cursor-pointer">Terms & Conditions</span> and confirm the information provided is accurate.</span>
                    </label>
                    <div className="flex gap-3 pt-1">
                      <button onClick={() => setApplyStep(2)} className="px-5 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">← Back</button>
                      <motion.button
                        onClick={() => setApplyStep(4)}
                        disabled={!applyForm.termsAccepted}
                        className="flex-1 py-3 bg-[#276647] disabled:opacity-40 hover:bg-[#1e4f37] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                      >
                        Submit application
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 4: Success ── */}
                {applyStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center text-center py-8 space-y-6"
                  >
                    {/* Animated checkmark */}
                    <motion.div
                      className="w-24 h-24 rounded-full bg-[#276647] flex items-center justify-center shadow-xl shadow-[#276647]/30"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
                    >
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.35, duration: 0.25 }}
                      >
                        <Check className="w-12 h-12 text-white" strokeWidth={2.5} />
                      </motion.div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="space-y-2">
                      <h2 className="text-2xl font-bold text-slate-900">Application submitted!</h2>
                      <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
                        Your application for <span className="font-semibold text-slate-700">{searchProfession || 'Locum Pharmacist'}</span> at <span className="font-semibold text-slate-700">{applyShift.facility}</span> on <span className="font-semibold text-slate-700">{applyShift.date}</span> has been sent successfully.
                      </p>
                    </motion.div>

                    {/* What happens next */}
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-5 text-left space-y-3">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">What happens next?</p>
                      <div className="space-y-3">
                        {[
                          { icon: '📧', title: 'Confirmation email sent', desc: `A confirmation has been sent to ${applyForm.email}` },
                          { icon: '🔍', title: 'Employer review', desc: 'The facility will review your profile and registration within 24 hours.' },
                          { icon: '📱', title: "You'll be notified", desc: "We'll send you an SMS and app notification once you're accepted." },
                          { icon: '✅', title: 'Shift confirmed', desc: 'Once accepted, the shift will appear in your MployUs dashboard.' },
                        ].map((step, i) => (
                          <motion.div
                            key={i}
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + i * 0.08 }}
                          >
                            <span className="text-xl shrink-0 mt-0.5">{step.icon}</span>
                            <div>
                              <p className="text-sm font-semibold text-slate-800">{step.title}</p>
                              <p className="text-xs text-slate-500 mt-0.5">{step.desc}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="flex flex-col sm:flex-row gap-3 w-full pt-2">
                      <button
                        onClick={closeApply}
                        className="flex-1 py-3 bg-[#276647] hover:bg-[#1e4f37] text-white font-bold rounded-xl transition-colors"
                      >
                        Back to shifts
                      </button>
                      <button
                        onClick={() => { closeApply(); goto('find-shifts'); }}
                        className="flex-1 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors"
                      >
                        Browse more shifts
                      </button>
                    </motion.div>
                  </motion.div>
                )}

              </div>
            </motion.div>
          </div>
        )}
        </>
      )}

      {/* ══════════════════════════════════════
          EMPLOYERS PAGE
      ══════════════════════════════════════ */}
      {page === 'post-shift' && (
        <>
        <div className="pt-[70px] min-h-screen bg-slate-50">

          <div className="bg-gradient-to-br from-slate-900 to-green-950 pt-16 pb-10 px-6 text-center">
            <span className="text-xs font-bold text-violet-300 uppercase tracking-widest">For Employers</span>
            <h1 className="text-4xl font-bold text-white mt-2 tracking-tight">Post an open shift in 3 steps</h1>
            <p className="text-slate-400 text-sm mt-2 max-w-lg mx-auto">List a locum shift or a permanent role and reach verified {loc.country} healthcare professionals in minutes.</p>
          </div>

          <div className="max-w-2xl mx-auto px-4 py-12">
            <div className="grid grid-cols-2 gap-4">
              {(['Locum Shift', 'Permanent Job'] as const).map(t => (
                <motion.button key={t} onClick={() => openPostModal(t)}
                  className={`p-6 rounded-2xl border-2 text-left transition-all ${t === 'Locum Shift' ? 'border-green-100 bg-white hover:border-green-300 hover:shadow-md' : 'border-violet-100 bg-white hover:border-violet-300 hover:shadow-md'}`}
                  whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${t === 'Locum Shift' ? 'bg-green-600' : 'bg-violet-600'}`}>
                    {t === 'Locum Shift' ? <Clock className="w-5 h-5 text-white" /> : <Briefcase className="w-5 h-5 text-white" />}
                  </div>
                  <div className="font-bold text-slate-900 mb-1">{t}</div>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">{t === 'Locum Shift' ? 'Temporary cover for one or more days' : 'Full-time or part-time permanent role'}</p>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-bold ${t === 'Locum Shift' ? 'text-green-600' : 'text-violet-600'}`}>
                    Get started <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

        </div>

        {/* ══ POST FLOW MODAL ══ */}
        {postModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={closePostModal} />

            <motion.div
              className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            >
              {/* Header */}
              <div className="sticky top-0 z-10 bg-white border-b border-slate-100 px-7 py-5 flex items-center justify-between rounded-t-2xl">
                {!postSuccess ? (
                  <div className="flex-1">
                    <p className="text-xs font-bold text-[#276647] uppercase tracking-widest mb-1">
                      {postType === 'Locum Shift' ? '🕐 Locum Shift' : '💼 Permanent Job'} · Step {postStep} of {postTotalSteps}
                    </p>
                    <div className="flex gap-1.5">
                      {Array.from({ length: postTotalSteps }).map((_, n) => (
                        <div key={n} className={`h-1 flex-1 rounded-full transition-all duration-400 ${postStep > n ? 'bg-[#276647]' : 'bg-slate-100'}`} />
                      ))}
                    </div>
                  </div>
                ) : <div />}
                <button onClick={closePostModal} className="ml-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors shrink-0">
                  <X className="w-4 h-4 text-slate-600" />
                </button>
              </div>

              <div className="px-7 pb-7 pt-5">

                {/* ── SUCCESS SCREEN ── */}
                {postSuccess && (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }} className="py-6 flex flex-col items-center text-center gap-5">
                    <motion.div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/30"
                      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 350, damping: 18, delay: 0.1 }}>
                      <Check className="w-9 h-9 text-white" />
                    </motion.div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-1">
                        {postType === 'Locum Shift' ? 'Shift posted successfully!' : 'Role posted successfully!'}
                      </h2>
                      <p className="text-slate-500 text-sm max-w-sm mx-auto">
                        {postType === 'Locum Shift'
                          ? `Verified ${postForm.profession || 'healthcare professionals'} near ${postForm.town || loc.defaultCity} have been notified. You'll hear back within hours.`
                          : `Your ${postForm.jobTitle || 'role'} listing is now live. Qualified candidates in ${loc.country} will be able to apply directly.`}
                      </p>
                    </div>
                    <div className="w-full bg-slate-50 border border-slate-100 rounded-xl p-5 text-left space-y-2">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">What happens next</p>
                      {(postType === 'Locum Shift' ? [
                        { icon: '🔔', title: 'Locums notified immediately', desc: `Registered ${postForm.profession || 'professionals'} within range receive a push and SMS alert.` },
                        { icon: '📋', title: 'Applications reviewed', desc: 'Applicants appear in your MployUs dashboard with their full compliance profile.' },
                        { icon: '✅', title: 'Accept and confirm', desc: "Accept the locum you want — they're notified instantly and the shift is locked in." },
                        { icon: '📄', title: 'Compliance summary sent', desc: 'Registration, insurance, and DBS documents are emailed to you automatically.' },
                      ] : [
                        { icon: '🌍', title: 'Role goes live', desc: `Your listing is visible to job seekers across ${loc.country} immediately.` },
                        { icon: '📩', title: 'Applications arrive', desc: 'Candidates apply directly through MployUs — no email chains or external forms.' },
                        { icon: '🔍', title: 'Review & shortlist', desc: 'Filter applicants by registration, experience, and availability in your dashboard.' },
                        { icon: '🤝', title: 'Make an offer', desc: 'Connect with your preferred candidate and arrange interviews through the platform.' },
                      ]).map((step, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.08 }}
                          className="flex items-start gap-3 py-2.5 border-b border-slate-100 last:border-0">
                          <span className="text-lg leading-none mt-0.5">{step.icon}</span>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{step.title}</p>
                            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{step.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <div className="flex gap-3 w-full">
                      <button onClick={closePostModal}
                        className="flex-1 py-3 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors">
                        Back to Employers
                      </button>
                      <button onClick={() => openPostModal(postType)}
                        className="flex-1 py-3 bg-[#276647] hover:bg-[#1e4f37] text-white text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
                        Post another <PlusCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ══ LOCUM SHIFT FLOW ══ */}
                {!postSuccess && postType === 'Locum Shift' && (

                  <>
                    {/* Locum Step 1 — Type & urgency */}
                    {postStep === 1 && (
                      <motion.div key="ls1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }} className="space-y-5">
                        <div>
                          <h2 className="text-xl font-bold text-slate-900">What are you posting?</h2>
                          <p className="text-sm text-slate-500 mt-1">You can switch between shift types at any time.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {(['Locum Shift', 'Permanent Job'] as const).map(t => (
                            <button key={t} onClick={() => setPostType(t)}
                              className={`p-5 rounded-xl border-2 text-left transition-all ${postType === t ? (t === 'Locum Shift' ? 'border-green-500 bg-green-50' : 'border-violet-500 bg-violet-50') : 'border-slate-100 bg-white hover:border-slate-200'}`}>
                              {t === 'Locum Shift'
                                ? <Clock className={`w-5 h-5 mb-2 ${postType === t ? 'text-green-600' : 'text-slate-400'}`} />
                                : <Briefcase className={`w-5 h-5 mb-2 ${postType === t ? 'text-violet-600' : 'text-slate-400'}`} />}
                              <div className={`font-bold text-sm ${postType === t ? (t === 'Locum Shift' ? 'text-green-700' : 'text-violet-700') : 'text-slate-700'}`}>{t}</div>
                              <p className="text-[11px] text-slate-500 mt-0.5">{t === 'Locum Shift' ? 'Temporary cover — one or more days' : 'Full-time or part-time permanent role'}</p>
                            </button>
                          ))}
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50">
                          <div>
                            <p className="text-sm font-bold text-slate-900">Mark as urgent</p>
                            <p className="text-xs text-slate-500 mt-0.5">Urgent shifts are pinned to the top and trigger SMS alerts.</p>
                          </div>
                          <button onClick={() => setPostForm(f => ({ ...f, urgent: !f.urgent }))}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0 ${postForm.urgent ? 'bg-green-500' : 'bg-slate-200'}`}>
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${postForm.urgent ? 'translate-x-6' : 'translate-x-1'}`} />
                          </button>
                        </div>
                        <button onClick={() => setPostStep(2)}
                          className="w-full py-3 bg-[#276647] hover:bg-[#1e4f37] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
                          Continue <ChevronRight className="w-4 h-4" />
                        </button>
                      </motion.div>
                    )}

                    {/* Locum Step 2 — Shift details */}
                    {postStep === 2 && (
                      <motion.div key="ls2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }} className="space-y-5">
                        <div>
                          <h2 className="text-xl font-bold text-slate-900">Shift details</h2>
                          <p className="text-sm text-slate-500 mt-1">Tell locums exactly what you need and when.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="col-span-2 flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">Profession required <span className="text-rose-500">*</span></label>
                            <div className="relative">
                              <select value={postForm.profession} onChange={e => setPostForm(f => ({ ...f, profession: e.target.value }))}
                                className="appearance-none w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#276647] transition-colors bg-slate-50 cursor-pointer">
                                <option value="">Select profession…</option>
                                {['Locum Pharmacist', 'Pharmacy Technician', 'Locum GP', 'Agency Nurse', 'Healthcare Assistant', 'Locum Optician', 'Allied Health Worker'].map(p => <option key={p}>{p}</option>)}
                              </select>
                              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">Shift date <span className="text-rose-500">*</span></label>
                            <input type="date" value={postForm.date} onChange={e => setPostForm(f => ({ ...f, date: e.target.value }))}
                              className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 outline-none focus:border-[#276647] transition-colors bg-slate-50" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">Hourly rate ({loc.currency}) <span className="text-rose-500">*</span></label>
                            <input value={postForm.rate} onChange={e => setPostForm(f => ({ ...f, rate: e.target.value }))}
                              placeholder={`e.g. ${loc.currency}32`}
                              className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#276647] transition-colors bg-slate-50" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">Start time</label>
                            <input type="time" value={postForm.startTime} onChange={e => setPostForm(f => ({ ...f, startTime: e.target.value }))}
                              className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 outline-none focus:border-[#276647] transition-colors bg-slate-50" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">End time</label>
                            <input type="time" value={postForm.endTime} onChange={e => setPostForm(f => ({ ...f, endTime: e.target.value }))}
                              className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 outline-none focus:border-[#276647] transition-colors bg-slate-50" />
                          </div>
                          <div className="col-span-2 flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">Location / town <span className="text-rose-500">*</span></label>
                            <input value={postForm.town} onChange={e => setPostForm(f => ({ ...f, town: e.target.value }))}
                              placeholder={`e.g. ${loc.defaultCity}`}
                              className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#276647] transition-colors bg-slate-50" />
                          </div>
                          <div className="col-span-2 flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">Additional requirements <span className="text-slate-400 font-normal">(optional)</span></label>
                            <textarea value={postForm.description} onChange={e => setPostForm(f => ({ ...f, description: e.target.value }))}
                              placeholder="Any specific skills, software experience, or clinical requirements…"
                              rows={3} className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none resize-none focus:border-[#276647] transition-colors bg-slate-50" />
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <button onClick={() => setPostStep(1)} className="px-5 py-3 border border-slate-200 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1.5">
                            <ChevronDown className="w-4 h-4 rotate-90" /> Back
                          </button>
                          <button onClick={() => setPostStep(3)} disabled={!postForm.profession || !postForm.date || !postForm.rate || !postForm.town}
                            className="flex-1 py-3 bg-[#276647] disabled:opacity-40 hover:bg-[#1e4f37] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
                            Continue <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* Locum Step 3 — Facility details */}
                    {postStep === 3 && (
                      <motion.div key="ls3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }} className="space-y-5">
                        <div>
                          <h2 className="text-xl font-bold text-slate-900">Your facility</h2>
                          <p className="text-sm text-slate-500 mt-1">Locums use this to confirm the listing is legitimate.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="col-span-2 flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">Facility / pharmacy name <span className="text-rose-500">*</span></label>
                            <input value={postForm.facility} onChange={e => setPostForm(f => ({ ...f, facility: e.target.value }))}
                              placeholder="e.g. Boots Pharmacy — Grafton Street"
                              className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#276647] transition-colors bg-slate-50" />
                          </div>
                          <div className="col-span-2 flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">Facility address <span className="text-slate-400 font-normal">(optional)</span></label>
                            <input value={postForm.facilityAddress} onChange={e => setPostForm(f => ({ ...f, facilityAddress: e.target.value }))}
                              placeholder="Street address"
                              className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#276647] transition-colors bg-slate-50" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">Contact name <span className="text-rose-500">*</span></label>
                            <input value={postForm.contact} onChange={e => setPostForm(f => ({ ...f, contact: e.target.value }))}
                              placeholder="Your name"
                              className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#276647] transition-colors bg-slate-50" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">Phone number <span className="text-rose-500">*</span></label>
                            <input value={postForm.phone} onChange={e => setPostForm(f => ({ ...f, phone: e.target.value }))}
                              placeholder="+353 / +44"
                              className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#276647] transition-colors bg-slate-50" />
                          </div>
                          <div className="col-span-2 flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">Email address <span className="text-rose-500">*</span></label>
                            <input type="email" value={postForm.email} onChange={e => setPostForm(f => ({ ...f, email: e.target.value }))}
                              placeholder="manager@facility.ie"
                              className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#276647] transition-colors bg-slate-50" />
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <button onClick={() => setPostStep(2)} className="px-5 py-3 border border-slate-200 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1.5">
                            <ChevronDown className="w-4 h-4 rotate-90" /> Back
                          </button>
                          <button onClick={() => setPostStep(4)} disabled={!postForm.facility || !postForm.contact || !postForm.phone || !postForm.email}
                            className="flex-1 py-3 bg-[#276647] disabled:opacity-40 hover:bg-[#1e4f37] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
                            Review & Publish <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* Locum Step 4 — Review & publish */}
                    {postStep === 4 && (
                      <motion.div key="ls4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }} className="space-y-5">
                        <div>
                          <h2 className="text-xl font-bold text-slate-900">Review & publish</h2>
                          <p className="text-sm text-slate-500 mt-1">Check everything looks right before going live.</p>
                        </div>
                        <div className="bg-green-50 border border-green-100 rounded-xl px-4 py-3 flex items-center justify-between gap-4">
                          <div>
                            <p className="text-xs text-slate-500">{postForm.facility}</p>
                            <p className="font-bold text-[#276647] text-sm">{postForm.profession} · {postForm.date || 'Date TBC'}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-xs text-slate-500">{postForm.startTime} – {postForm.endTime}</p>
                            <p className="font-bold text-[#276647] text-sm">{postForm.rate ? `${loc.currency}${postForm.rate}/hr` : '—'}</p>
                          </div>
                        </div>
                        <div className="bg-slate-50 border border-slate-100 rounded-xl divide-y divide-slate-100">
                          {[
                            { label: 'Profession', val: postForm.profession || '—' },
                            { label: 'Location', val: postForm.town || '—' },
                            { label: 'Urgent', val: postForm.urgent ? '🔴 Yes — SMS alerts enabled' : 'No' },
                            { label: 'Facility', val: postForm.facility || '—' },
                            { label: 'Contact', val: postForm.contact || '—' },
                            { label: 'Email', val: postForm.email || '—' },
                            ...(postForm.description ? [{ label: 'Requirements', val: postForm.description }] : []),
                          ].map(({ label, val }) => (
                            <div key={label} className="flex items-start justify-between px-4 py-3 text-sm gap-4">
                              <span className="text-slate-500 font-medium shrink-0">{label}</span>
                              <span className="font-semibold text-slate-900 text-right">{val}</span>
                            </div>
                          ))}
                        </div>
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input type="checkbox" checked={postForm.termsAccepted} onChange={e => setPostForm(f => ({ ...f, termsAccepted: e.target.checked }))} className="mt-0.5 accent-[#276647]" />
                          <span className="text-xs text-slate-500 leading-relaxed">
                            I confirm this shift is genuine and I agree to MployUs{" "}
                            <span className="text-[#276647] font-semibold underline">Terms of Service</span> and{" "}
                            <span className="text-[#276647] font-semibold underline">Employer Policy</span>.
                          </span>
                        </label>
                        <div className="flex gap-3">
                          <button onClick={() => setPostStep(3)} className="px-5 py-3 border border-slate-200 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1.5">
                            <ChevronDown className="w-4 h-4 rotate-90" /> Back
                          </button>
                          <button onClick={() => { if (postForm.termsAccepted) setPostSuccess(true); }}
                            disabled={!postForm.termsAccepted}
                            className="flex-1 py-3 bg-[#276647] disabled:opacity-40 hover:bg-[#1e4f37] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
                            Publish Shift <PlusCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </>
                )}

                {/* ══ PERMANENT JOB FLOW ══ */}
                {!postSuccess && postType === 'Permanent Job' && (

                  <>
                    {/* Perm Step 1 — Type selection */}
                    {postStep === 1 && (
                      <motion.div key="pj1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }} className="space-y-5">
                        <div>
                          <h2 className="text-xl font-bold text-slate-900">What are you posting?</h2>
                          <p className="text-sm text-slate-500 mt-1">You can switch between listing types at any time.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {(['Locum Shift', 'Permanent Job'] as const).map(t => (
                            <button key={t} onClick={() => setPostType(t)}
                              className={`p-5 rounded-xl border-2 text-left transition-all ${postType === t ? (t === 'Locum Shift' ? 'border-green-500 bg-green-50' : 'border-violet-500 bg-violet-50') : 'border-slate-100 bg-white hover:border-slate-200'}`}>
                              {t === 'Locum Shift'
                                ? <Clock className={`w-5 h-5 mb-2 ${postType === t ? 'text-green-600' : 'text-slate-400'}`} />
                                : <Briefcase className={`w-5 h-5 mb-2 ${postType === t ? 'text-violet-600' : 'text-slate-400'}`} />}
                              <div className={`font-bold text-sm ${postType === t ? (t === 'Locum Shift' ? 'text-green-700' : 'text-violet-700') : 'text-slate-700'}`}>{t}</div>
                              <p className="text-[11px] text-slate-500 mt-0.5">{t === 'Locum Shift' ? 'Temporary cover — one or more days' : 'Full-time or part-time permanent role'}</p>
                            </button>
                          ))}
                        </div>
                        <div className="space-y-3">
                          <label className="text-xs font-semibold text-slate-700">Contract type</label>
                          <div className="grid grid-cols-3 gap-2">
                            {['Full-time', 'Part-time', 'Contract'].map(ct => (
                              <button key={ct} onClick={() => setPostForm(f => ({ ...f, contractType: ct }))}
                                className={`py-2.5 px-3 rounded-xl border-2 text-xs font-bold transition-all ${postForm.contractType === ct ? 'border-violet-500 bg-violet-50 text-violet-700' : 'border-slate-100 text-slate-500 hover:border-slate-200'}`}>
                                {ct}
                              </button>
                            ))}
                          </div>
                        </div>
                        <button onClick={() => setPostStep(2)}
                          className="w-full py-3 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
                          Continue <ChevronRight className="w-4 h-4" />
                        </button>
                      </motion.div>
                    )}

                    {/* Perm Step 2 — Role details */}
                    {postStep === 2 && (
                      <motion.div key="pj2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }} className="space-y-5">
                        <div>
                          <h2 className="text-xl font-bold text-slate-900">Role details</h2>
                          <p className="text-sm text-slate-500 mt-1">Help candidates understand the position at a glance.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="col-span-2 flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">Job title <span className="text-rose-500">*</span></label>
                            <input value={postForm.jobTitle} onChange={e => setPostForm(f => ({ ...f, jobTitle: e.target.value }))}
                              placeholder="e.g. Superintendent Pharmacist"
                              className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-violet-500 transition-colors bg-slate-50" />
                          </div>
                          <div className="col-span-2 flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">Profession / discipline <span className="text-rose-500">*</span></label>
                            <div className="relative">
                              <select value={postForm.profession} onChange={e => setPostForm(f => ({ ...f, profession: e.target.value }))}
                                className="appearance-none w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-violet-500 transition-colors bg-slate-50 cursor-pointer">
                                <option value="">Select profession…</option>
                                {['Pharmacist', 'Pharmacy Technician', 'GP / Doctor', 'Nurse', 'Healthcare Assistant', 'Optician', 'Allied Health Worker'].map(p => <option key={p}>{p}</option>)}
                              </select>
                              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">Salary min ({loc.currency})</label>
                            <input value={postForm.salaryMin} onChange={e => setPostForm(f => ({ ...f, salaryMin: e.target.value }))}
                              placeholder={`e.g. ${loc.currency}45,000`}
                              className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-violet-500 transition-colors bg-slate-50" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">Salary max ({loc.currency})</label>
                            <input value={postForm.salaryMax} onChange={e => setPostForm(f => ({ ...f, salaryMax: e.target.value }))}
                              placeholder={`e.g. ${loc.currency}60,000`}
                              className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-violet-500 transition-colors bg-slate-50" />
                          </div>
                          <div className="col-span-2 flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">Location <span className="text-rose-500">*</span></label>
                            <input value={postForm.town} onChange={e => setPostForm(f => ({ ...f, town: e.target.value }))}
                              placeholder={`e.g. ${loc.defaultCity}`}
                              className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-violet-500 transition-colors bg-slate-50" />
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <button onClick={() => setPostStep(1)} className="px-5 py-3 border border-slate-200 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1.5">
                            <ChevronDown className="w-4 h-4 rotate-90" /> Back
                          </button>
                          <button onClick={() => setPostStep(3)} disabled={!postForm.jobTitle || !postForm.profession || !postForm.town}
                            className="flex-1 py-3 bg-violet-600 disabled:opacity-40 hover:bg-violet-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
                            Continue <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* Perm Step 3 — Description + facility */}
                    {postStep === 3 && (
                      <motion.div key="pj3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }} className="space-y-5">
                        <div>
                          <h2 className="text-xl font-bold text-slate-900">About the role & your facility</h2>
                          <p className="text-sm text-slate-500 mt-1">A good description attracts the right candidates faster.</p>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-700">Role description <span className="text-rose-500">*</span></label>
                          <textarea value={postForm.description} onChange={e => setPostForm(f => ({ ...f, description: e.target.value }))}
                            placeholder="Describe the role, working environment, team, and day-to-day responsibilities…"
                            rows={4} className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none resize-none focus:border-violet-500 transition-colors bg-slate-50" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-700">Key requirements <span className="text-slate-400 font-normal">(optional)</span></label>
                          <textarea value={postForm.requirements} onChange={e => setPostForm(f => ({ ...f, requirements: e.target.value }))}
                            placeholder="e.g. GPhC registration, 2+ years community pharmacy, full driving licence…"
                            rows={3} className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none resize-none focus:border-violet-500 transition-colors bg-slate-50" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-700">Benefits <span className="text-slate-400 font-normal">(optional)</span></label>
                          <input value={postForm.benefits} onChange={e => setPostForm(f => ({ ...f, benefits: e.target.value }))}
                            placeholder="e.g. CPD allowance, pension, 25 days holiday, free parking…"
                            className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-violet-500 transition-colors bg-slate-50" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="col-span-2 flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">Facility name <span className="text-rose-500">*</span></label>
                            <input value={postForm.facility} onChange={e => setPostForm(f => ({ ...f, facility: e.target.value }))}
                              placeholder="e.g. Allcare Pharmacy Group"
                              className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-violet-500 transition-colors bg-slate-50" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">Contact name <span className="text-rose-500">*</span></label>
                            <input value={postForm.contact} onChange={e => setPostForm(f => ({ ...f, contact: e.target.value }))}
                              placeholder="HR / Manager"
                              className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-violet-500 transition-colors bg-slate-50" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">Phone number <span className="text-rose-500">*</span></label>
                            <input value={postForm.phone} onChange={e => setPostForm(f => ({ ...f, phone: e.target.value }))}
                              placeholder="+353 / +44"
                              className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-violet-500 transition-colors bg-slate-50" />
                          </div>
                          <div className="col-span-2 flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">Email address <span className="text-rose-500">*</span></label>
                            <input type="email" value={postForm.email} onChange={e => setPostForm(f => ({ ...f, email: e.target.value }))}
                              placeholder="hr@facility.ie"
                              className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-violet-500 transition-colors bg-slate-50" />
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <button onClick={() => setPostStep(2)} className="px-5 py-3 border border-slate-200 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1.5">
                            <ChevronDown className="w-4 h-4 rotate-90" /> Back
                          </button>
                          <button onClick={() => setPostStep(4)} disabled={!postForm.description || !postForm.facility || !postForm.contact || !postForm.phone || !postForm.email}
                            className="flex-1 py-3 bg-violet-600 disabled:opacity-40 hover:bg-violet-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
                            Review & Post <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* Perm Step 4 — Review & post */}
                    {postStep === 4 && (
                      <motion.div key="pj4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }} className="space-y-5">
                        <div>
                          <h2 className="text-xl font-bold text-slate-900">Review & post</h2>
                          <p className="text-sm text-slate-500 mt-1">Check everything before your listing goes live.</p>
                        </div>
                        <div className="bg-violet-50 border border-violet-100 rounded-xl px-4 py-3 flex items-center justify-between gap-4">
                          <div>
                            <p className="text-xs text-slate-500">{postForm.facility}</p>
                            <p className="font-bold text-violet-700 text-sm">{postForm.jobTitle} · {postForm.contractType}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-xs text-slate-500">{postForm.town}</p>
                            <p className="font-bold text-violet-700 text-sm">
                              {postForm.salaryMin && postForm.salaryMax ? `${loc.currency}${postForm.salaryMin} – ${loc.currency}${postForm.salaryMax}` : 'Salary negotiable'}
                            </p>
                          </div>
                        </div>
                        <div className="bg-slate-50 border border-slate-100 rounded-xl divide-y divide-slate-100">
                          {[
                            { label: 'Profession', val: postForm.profession || '—' },
                            { label: 'Contract', val: postForm.contractType },
                            { label: 'Location', val: postForm.town || '—' },
                            { label: 'Facility', val: postForm.facility || '—' },
                            { label: 'Contact', val: `${postForm.contact} · ${postForm.email}` },
                            ...(postForm.benefits ? [{ label: 'Benefits', val: postForm.benefits }] : []),
                          ].map(({ label, val }) => (
                            <div key={label} className="flex items-start justify-between px-4 py-3 text-sm gap-4">
                              <span className="text-slate-500 font-medium shrink-0">{label}</span>
                              <span className="font-semibold text-slate-900 text-right">{val}</span>
                            </div>
                          ))}
                        </div>
                        {postForm.description && (
                          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Role description</p>
                            <p className="text-xs text-slate-700 leading-relaxed line-clamp-4">{postForm.description}</p>
                          </div>
                        )}
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input type="checkbox" checked={postForm.termsAccepted} onChange={e => setPostForm(f => ({ ...f, termsAccepted: e.target.checked }))} className="mt-0.5 accent-violet-600" />
                          <span className="text-xs text-slate-500 leading-relaxed">
                            I confirm this role is genuine and I agree to MployUs{" "}
                            <span className="text-violet-600 font-semibold underline">Terms of Service</span> and{" "}
                            <span className="text-violet-600 font-semibold underline">Employer Policy</span>.
                          </span>
                        </label>
                        <div className="flex gap-3">
                          <button onClick={() => setPostStep(3)} className="px-5 py-3 border border-slate-200 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1.5">
                            <ChevronDown className="w-4 h-4 rotate-90" /> Back
                          </button>
                          <button onClick={() => { if (postForm.termsAccepted) setPostSuccess(true); }}
                            disabled={!postForm.termsAccepted}
                            className="flex-1 py-3 bg-violet-600 disabled:opacity-40 hover:bg-violet-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
                            Post Role <PlusCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </>
                )}

              </div>
            </motion.div>
          </div>
        )}
        </>
      )}

      {/* ══════════════════════════════════════
          CPD
      ══════════════════════════════════════ */}
      {page === 'cpd' && (
        <div className="pt-[70px] min-h-screen bg-slate-50">
          <div className="bg-gradient-to-br from-slate-900 to-green-950 pt-16 pb-14 px-6 text-center">
            <span className="text-green-300 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 mb-3"><GraduationCap className="w-4 h-4" /> CPD Training</span>
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
                    <button onClick={() => onBookDemo('CPD Training')} className="text-xs font-bold text-green-600 group-hover:text-green-700 flex items-center gap-1">
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
          <div className="bg-gradient-to-br from-slate-900 to-green-950 pt-16 pb-14 px-6">
            <div className="max-w-5xl mx-auto">
              <span className="text-green-300 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 mb-3"><BookOpen className="w-4 h-4" /> Content Hub</span>
              <h1 className="text-4xl font-bold text-white tracking-tight">Guides, salary reports & insights</h1>
            </div>
          </div>
          <div className="max-w-5xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {articles.map(a => (
                <button key={a.title} onClick={() => onBookDemo(`Article: ${a.title}`)} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-left hover:shadow-md hover:-translate-y-0.5 transition-all group">
                  <span className={`inline-block px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border mb-4 ${a.color}`}>{a.tag}</span>
                  <h4 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-green-700 transition-colors">{a.title}</h4>
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
          <div className="bg-gradient-to-br from-slate-900 to-green-950 pt-16 pb-14 px-6 text-center">
            <h1 className="text-4xl font-bold text-white tracking-tight">Frequently Asked Questions</h1>
            <p className="text-slate-400 text-sm mt-2 max-w-lg mx-auto">Everything you need to know about working with MployUs Locums.</p>
          </div>
          <div className="max-w-3xl mx-auto px-6 py-12">
            <div className="flex items-center gap-1 bg-white border border-slate-100 rounded-xl p-1 w-fit mb-8">
              {(['Locum', 'Employers'] as const).map(tab => (
                <button key={tab} onClick={() => { setFaqTab(tab); setOpenFaq(0); }} className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${faqTab === tab ? 'bg-green-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'}`}>
                  {tab}
                </button>
              ))}
            </div>
            <div className="space-y-2">
              {faqs[faqTab].map((f, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={f.q} className={`rounded-xl border overflow-hidden transition-all ${isOpen ? 'bg-green-600 border-green-600 shadow-lg shadow-green-600/20' : 'bg-white border-slate-100 hover:border-slate-200'}`}>
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
                  <button key={r} onClick={() => applyRegion(r)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold border transition-colors ${region === r ? 'bg-green-600/10 border-green-500/30 text-green-400' : 'border-white/8 text-slate-500 hover:text-white'}`}>
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
                <button className="px-4 py-2.5 bg-green-600 hover:bg-green-500 text-white text-sm font-semibold rounded-xl transition-colors shrink-0">
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
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus-within:border-green-400 transition-colors">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <input placeholder="Email address" className="bg-transparent text-sm w-full outline-none" />
                    </div>
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus-within:border-green-400 transition-colors">
                      <Lock className="w-4 h-4 text-slate-400" />
                      <input type="password" placeholder="Password" className="bg-transparent text-sm w-full outline-none" />
                    </div>
                    <button onClick={() => onBookDemo('Sign In')} className="w-full py-3 bg-gradient-to-br from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white text-sm font-bold rounded-xl shadow-md shadow-green-600/20 transition-all">
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
                    <button onClick={() => { setSignupStep('role'); setAuthModal('signup'); }} className="font-bold text-green-600 hover:underline">Create account</button>
                  </p>
                </div>
              ) : (
                <div className="space-y-5">
                  {/* Progress bar */}
                  <div className="flex gap-1.5">
                    {(['role', 'details', 'verify'] as const).map((s, i) => {
                      const order = ['role', 'details', 'verify'];
                      return <div key={s} className={`h-1 flex-1 rounded-full transition-all duration-300 ${order.indexOf(signupStep) >= i ? 'bg-green-600' : 'bg-slate-100'}`} />;
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
                            <button key={r.key} onClick={() => setRole(r.key)} className={`w-full p-4 rounded-xl border-2 text-left flex items-start gap-3 transition-all ${active ? 'border-green-500 bg-green-50' : 'border-slate-100 bg-white hover:border-slate-200'}`}>
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${active ? 'bg-green-600' : 'bg-slate-100'}`}>
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
                      <button disabled={!role} onClick={() => setSignupStep('details')} className="w-full py-3 bg-gradient-to-br from-green-600 to-green-700 disabled:opacity-40 text-white text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-1.5">
                        Continue <ChevronRight className="w-4 h-4" />
                      </button>
                      <p className="text-center text-xs text-slate-500">Already have an account? <button onClick={() => setAuthModal('signin')} className="font-bold text-green-600 hover:underline">Sign in</button></p>
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
                        <input placeholder={role === 'Client' ? 'Facility name' : 'Full name'} className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-green-400 transition-colors" />
                        <input placeholder="Email" className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-green-400 transition-colors" />
                      </div>
                      {role === 'Locum' && setupProfession.reg && (
                        <div className="p-4 rounded-xl bg-green-50 border border-green-100 space-y-2">
                          <label className="block text-xs font-bold text-green-900">{setupProfession.reg} <span className="text-rose-500">*</span></label>
                          <input placeholder={`Enter your ${setupProfession.reg}`} className="w-full px-3 py-2.5 rounded-lg bg-white border border-green-100 text-sm outline-none" />
                        </div>
                      )}
                      <input placeholder="Mobile number" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-green-400 transition-colors" />
                      <div className="flex gap-2">
                        <button onClick={() => setSignupStep('role')} className="px-4 py-3 text-sm font-semibold text-slate-500 hover:text-slate-900">← Back</button>
                        <button onClick={() => setSignupStep('verify')} className="flex-1 py-3 bg-gradient-to-br from-green-600 to-green-700 text-white text-sm font-bold rounded-xl flex items-center justify-center gap-1.5">
                          <UserPlus className="w-4 h-4" /> Create account
                        </button>
                      </div>
                    </div>
                  )}

                  {signupStep === 'verify' && (
                    <div className="flex flex-col items-center text-center space-y-5 py-2">
                      <div className="w-16 h-16 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center">
                        <Phone className="w-7 h-7 text-green-600" />
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
                            className="w-11 h-13 text-center text-lg font-bold rounded-xl bg-slate-50 border-2 border-slate-100 outline-none focus:border-green-500 transition-colors"
                          />
                        ))}
                      </div>
                      <button onClick={() => { onBookDemo('Account created'); setAuthModal(null); }} className="w-full py-3 bg-gradient-to-br from-green-600 to-green-700 text-white text-sm font-bold rounded-xl">
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
                  <input type="checkbox" disabled={pref.locked} checked={cookiePrefs[pref.key]} onChange={e => setCookiePrefs(p => ({ ...p, [pref.key]: e.target.checked }))} className="accent-green-600 w-4 h-4 disabled:opacity-50" />
                </label>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <button onClick={() => setCookiePrefsOpen(o => !o)} className="flex-1 py-2 text-xs font-semibold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              {cookiePrefsOpen ? 'Save' : 'Manage'}
            </button>
            <button onClick={() => setCookieOpen(false)} className="flex-1 py-2 text-xs font-semibold bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
              Accept all
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
