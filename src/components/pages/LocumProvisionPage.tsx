import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router';
import { LoginExperience } from '../PlatformExperiences';
import VerticalMarqueeDemo from "@/components/ui/marquee-03";
import { Footer } from '../Footer';
import imgLocumProfessional from '../../imports/locum-professional.jpg';
import {
  Users, Clock, ShieldCheck, MapPin, CheckCircle2, ArrowRight, Building2,
  Search, Calendar, Stethoscope, Briefcase, Mail, Lock, Linkedin, Phone,
  ChevronDown, ChevronRight, BookOpen, Cookie, Award,
  PlusCircle, UserPlus, Check, Menu, X, Apple, Play, Bell, Zap, Wallet,
  Plus, Minus, TrendingUp, Star, MoveRight, Smartphone
} from 'lucide-react';

// Figma-imported images
import imgOverlay from '../../imports/MacBookPro14372/1ce878ea07a35dd888253f3062acd8e1583d0cbc.png';
import imgFindShiftsHero from '../../imports/MacBookPro1441/1d99878d3d95dcc6a2d5ffb9854dbccbc6b8cb8d.png';
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
import { LocumRegistrationWizard } from './LocumRegistrationWizard';
import { LocumJobDetails } from './LocumJobDetails';
import { LocumEmployerLanding } from './LocumEmployerLanding';
import { LocumInsights } from './LocumInsights';
import { LocumDialog } from '../LocumDialog';

interface LocumProvisionPageProps {
  onBackToHome: () => void;
  onBookDemo: (moduleTitle?: string) => void;
  onStartTrial: () => void;
}

type Region = 'IE' | 'UK';
type WorkRegion = 'IE' | 'UK-eng' | 'UK-wal' | 'UK-sco' | 'UK-ni';

const WORK_REGIONS: { id: WorkRegion; label: string; cities: string[] }[] = [
  { id: 'IE', label: 'Republic of Ireland', cities: ['Dublin', 'Cork', 'Galway', 'Limerick', 'Waterford'] },
  { id: 'UK-eng', label: 'England', cities: ['London', 'Manchester', 'Birmingham', 'Liverpool', 'Leeds', 'Bristol', 'Newcastle'] },
  { id: 'UK-wal', label: 'Wales', cities: ['Cardiff', 'Swansea', 'Newport', 'Wrexham'] },
  { id: 'UK-sco', label: 'Scotland', cities: ['Glasgow', 'Edinburgh', 'Aberdeen', 'Dundee', 'Inverness'] },
  { id: 'UK-ni', label: 'Northern Ireland', cities: ['Belfast', 'Derry / Londonderry', 'Lisburn', 'Newry', 'Bangor'] },
];

function shiftRegion(location: string): WorkRegion {
  return WORK_REGIONS.find(area => area.cities.some(city => location.includes(city)))?.id ?? 'IE';
}

function shiftFacts(shift: { date: string; time: string; rate: string }) {
  const [start, end] = shift.time.split('–').map(time => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  });
  const paidHours = (end - start - 30) / 60;
  const hourlyRate = Number(shift.rate.replace(/[^\d.]/g, ''));
  const [, day, month] = shift.date.split(' ');
  return {
    paidHours,
    totalPay: `${shift.rate.startsWith('€') ? '€' : '£'}${(paidHours * hourlyRate).toFixed(2)}`,
    hourlyRate,
    dateISO: `2026-${month === 'Jul' ? '07' : '08'}-${day.padStart(2, '0')}`,
  };
}

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
      { facility: 'Allcare Pharmacy', location: 'Waterford, IE', date: 'Sat 01 Aug', time: '09:00–17:00', rate: '€53/hr', urgent: false, specialisation: 'Community Pharmacy', description: 'Allcare Pharmacy Waterford requires locum cover for a Friday shift. The branch operates a busy dispensary alongside a wellness clinic. Duties include prescription dispensing, health checks, and supporting the medicines adherence programme.', requirements: ['PSI registration', 'Wellness and adherence programme experience a bonus', 'Strong interpersonal skills', 'Garda vetting up to date'] },
      { facility: 'Uniphar — Citywest', location: 'Dublin 24, IE', date: 'Sun 02 Aug', time: '08:00–16:00', rate: '€60/hr', urgent: true, specialisation: 'Hospital Pharmacy', description: 'Uniphar Citywest distribution centre requires a registered pharmacist for a Saturday shift overseeing wholesale prescription processing, controlled drug records, and dispatch sign-off. Excellent rate for an experienced hospital or wholesale pharmacist.', requirements: ['PSI registration', 'Controlled drugs handling experience', 'Wholesale or hospital background preferred', 'Available for Saturday shift'] },
      { facility: 'Careway Pharmacy', location: 'Galway, IE', date: 'Tue 04 Aug', time: '09:00–18:00', rate: '€51/hr', urgent: false, specialisation: 'Community Pharmacy', description: 'Careway Pharmacy in Galway city seeks a locum for a Monday shift. The role involves standard dispensing, walk-in consultations, and minor ailment referrals. The branch has a loyal patient base and a well-stocked dispensary.', requirements: ['PSI registration', 'Community pharmacy experience', 'Good organisational skills', 'Experience with Touchstore or similar PMR'] },
      { facility: 'Montague Pharmacy', location: 'Cork City, IE', date: 'Wed 05 Aug', time: '10:00–18:30', rate: '€54/hr', urgent: false, specialisation: 'Community Pharmacy', description: 'Montague Pharmacy Cork seeks a confident locum for a Tuesday afternoon shift. This is a medium-volume branch with a focus on patient engagement and chronic disease management. The existing team will support the locum with all PMR and workflow queries.', requirements: ['PSI registration', 'Chronic disease management experience preferred', 'Excellent communication skills', 'Garda vetting clearance'] },
    ]
  },
  UK: {
    country: 'United Kingdom', flag: '🇬🇧', currency: '£', defaultCity: 'London',
    cities: WORK_REGIONS.filter(area => area.id !== 'IE').flatMap(area => area.cities),
    compliance: 'Enhanced DBS check', payGuide: '£28–£38/hr',
    shifts: [
      { facility: 'Boots — Oxford Street', location: 'London W1, UK', date: 'Mon 27 Jul', time: '09:00–18:00', rate: '£34/hr', urgent: true, specialisation: 'Community Pharmacy', description: 'Boots Oxford Street is one of the busiest pharmacy branches in the UK. We need an experienced locum to manage high prescription volume, supervise dispensing assistants, and deliver our NHS services including NMS and pharmacy first consultations.', requirements: ['GPhC registration (active)', 'Minimum 2 years community pharmacy experience', 'NHS services experience (NMS, MUR, Pharmacy First)', 'Enhanced DBS required'] },
      { facility: 'Well Pharmacy', location: 'Manchester, UK', date: 'Tue 28 Jul', time: '08:30–17:30', rate: '£30/hr', urgent: false, specialisation: 'Community Pharmacy', description: 'Well Pharmacy Manchester requires a locum for a standard weekday shift. Duties include dispensing, patient consultations, and supporting the healthy living programme. The branch has a well-established team and modern dispensing systems.', requirements: ['GPhC registration', 'Community experience preferred', 'Familiarity with Pharmacy First', 'Punctual and professional manner'] },
      { facility: 'Rowlands Pharmacy', location: 'Birmingham, UK', date: 'Wed 29 Jul', time: '10:00–19:00', rate: '£36/hr', urgent: true, specialisation: 'Hospital Outpatient', description: 'Urgent cover required at Rowlands Birmingham outpatient dispensary. You will work alongside the hospital clinical team dispensing inpatient TTOs, providing discharge counselling, and managing controlled drug records to standard.', requirements: ['GPhC registration', 'Hospital dispensary experience essential', 'Controlled drug handling', 'Available at short notice'] },
      { facility: 'Gordons Chemists', location: 'Belfast, NI', date: 'Thu 30 Jul', time: '09:00–18:00', rate: '£32/hr', urgent: false, specialisation: 'Community Pharmacy', description: 'Gordons Chemists Belfast requires locum cover for a Thursday. The branch is a busy community pharmacy serving a large residential catchment. Duties include dispensing, MAS consultations, and Medicine Delivery Scheme support.', requirements: ['PSNI registration (active)', 'Community pharmacy experience in NI preferred', 'Familiarity with MAS and MDS', 'Role-appropriate AccessNI check'] },
      { facility: 'Lloyds Pharmacy', location: 'Glasgow, UK', date: 'Sat 01 Aug', time: '09:00–17:30', rate: '£33/hr', urgent: false, specialisation: 'Community Pharmacy', description: 'Lloyds Pharmacy Glasgow seeks a locum for a Friday shift. The branch handles a medium volume of NHS prescriptions alongside a busy OTC section. The locum will work alongside two dispensing technicians and a medicines counter assistant.', requirements: ['GPhC registration', 'Scottish community pharmacy experience a bonus', 'NHS Pharmacy First Scotland awareness', 'Reliable and team-oriented'] },
      { facility: 'Superdrug Health Clinic', location: 'London W2, UK', date: 'Sun 02 Aug', time: '10:00–18:00', rate: '£38/hr', urgent: true, specialisation: 'Pharmacy Clinic', description: 'Superdrug Health Clinic Bayswater requires a pharmacist to manage Saturday walk-in consultations including travel health, sexual health screening, and emergency contraception. High patient interaction role with strong clinical advisory component.', requirements: ['GPhC registration', 'Clinical or consultation experience', 'PGD experience (travel health, contraception)', 'Saturday availability essential'] },
      { facility: 'Day Lewis Pharmacy', location: 'Birmingham, UK', date: 'Tue 04 Aug', time: '08:30–17:30', rate: '£31/hr', urgent: false, specialisation: 'Community Pharmacy', description: 'Day Lewis Pharmacy Birmingham requires a locum for Monday cover. This independent-style branch operates a strong patient relationship model with a focus on blister packing, chronic disease management, and medication reviews.', requirements: ['GPhC registration', 'Blister packing experience preferred', 'Medication review and MUR background', 'Friendly and patient-focused approach'] },
      { facility: 'Cohens Chemist', location: 'Manchester, UK', date: 'Wed 05 Aug', time: '09:00–18:00', rate: '£29/hr', urgent: false, specialisation: 'Community Pharmacy', description: 'Cohens Chemist Manchester requires standard locum cover for a Tuesday shift. Duties include supervised consumption, dispensing, and patient counselling. A well-structured pharmacy with a supportive technician team already in place.', requirements: ['GPhC registration', 'Supervised consumption experience preferred', 'Familiar with RxWeb or Titan PMR', 'Flexible and adaptable'] },
      { facility: 'Example community pharmacy — Cardiff', location: 'Cardiff, UK', date: 'Thu 06 Aug', time: '09:00–17:30', rate: '£32/hr', urgent: false, specialisation: 'Community Pharmacy', description: 'Example Welsh locum listing for preview purposes. Community pharmacy cover involves prescription dispensing, patient advice and working with the pharmacy team. This is not a live vacancy; service responsibilities and booking terms must be confirmed by the employer.', requirements: ['Active GPhC registration', 'Right to work in the UK', 'Relevant community pharmacy experience', 'Role-appropriate background check and professional indemnity'] },
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
  { icon: TrendingUp, title: 'Transparent Pay', desc: 'See the rate, duration, and full pay breakdown upfront — before you apply.' },
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
  { value: '98%', label: 'Shift fill rate', icon: TrendingUp },
  { value: '< 2hr', label: 'Average shift fill', icon: Clock },
];

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
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
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
};
const slideRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
};

// Viewport-triggered wrapper
const Reveal = ({
  children, className = '', delay = 0, variant = fadeUp,
}: {
  children: React.ReactNode; className?: string; delay?: number; variant?: typeof fadeUp | typeof slideLeft | typeof slideRight;
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
  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 border border-black/5 text-[#368B62] text-[11px] font-bold uppercase tracking-widest">
    {children}
  </span>
);

export const LocumProvisionPage: React.FC<LocumProvisionPageProps> = ({ onBackToHome, onBookDemo }) => {
  const navigate = useNavigate();
  const [region, setRegion] = useState<Region>('IE');
  const [searchProfession, setSearchProfession] = useState('Locum Pharmacist');
  const [searchLocation, setSearchLocation] = useState('Dublin');
  const loc = REGIONS[region];

  const [faqRegion, setFaqRegion] = useState<'UK' | 'IE'>('IE');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [faqTab, setFaqTab] = useState<'Locum' | 'Employers'>('Locum');

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [authModal, setAuthModal] = useState<'signin' | 'signup' | null>(null);
  const [regWizardOpen, setRegWizardOpen] = useState(false);
  const [signupStep, setSignupStep] = useState<'role' | 'details' | 'verify'>('role');
  const [role, setRole] = useState<'Locum' | 'Client' | null>(null);
  const [setupProfession, setSetupProfession] = useState<Profession>(PROFESSIONS[4]);
  const [smsCode, setSmsCode] = useState(['', '', '', '', '', '']);

  const [dropdownOpen, setDropdownOpen] = useState<'profession' | 'location' | null>(null);
  const [selectedShift, setSelectedShift] = useState(0);
  const [filterSpecialisation, setFilterSpecialisation] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterCountry, setFilterCountry] = useState<'all' | 'UK' | WorkRegion>('IE');
  const [filterRateMin, setFilterRateMin] = useState('');
  const [filterUrgentOnly, setFilterUrgentOnly] = useState(false);
  const [filterExperience, setFilterExperience] = useState('');
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

  const openApply = () => { setApplyStep(2); setApplyOpen(true); };
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
    setFilterCountry(r);
    setSelectedShift(0);
  };

  const openAuth = (mode: 'signin' | 'signup') => {
    setMobileNavOpen(false);
    setSignupStep('role');
    setAuthModal(mode);
  };

  type LocumPage = 'home' | 'find-shifts' | 'post-shift' | 'blog' | 'faq';
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
  const [cookieOpen, setCookieOpen] = useState(() => { try { return !localStorage.getItem('mployus-cookie-preferences'); } catch { return true; } });
  const [cookiePrefsOpen, setCookiePrefsOpen] = useState(false);
  const [cookiePrefs, setCookiePrefs] = useState(() => { const defaults = { necessary: true, functional: false, performance: false, targeting: false }; try { const saved = JSON.parse(localStorage.getItem('mployus-cookie-preferences') || 'null'); return saved && typeof saved === 'object' ? { necessary: true, functional: saved.functional === true, performance: saved.performance === true, targeting: saved.targeting === true } : defaults; } catch { return defaults; } });
  const saveCookiePreferences = (preferences: typeof cookiePrefs) => { setCookiePrefs(preferences); try { localStorage.setItem('mployus-cookie-preferences', JSON.stringify(preferences)); } catch {} setCookieOpen(false); setCookiePrefsOpen(false); };

  const goto = (p: LocumPage) => {
    setMobileNavOpen(false);
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks: { id: LocumPage; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'find-shifts', label: 'Locum Shifts' },
    { id: 'post-shift', label: 'Employers' },
    { id: 'blog', label: 'Blog' },
    { id: 'faq', label: 'FAQ' },
  ];

  const allShifts = [...REGIONS.IE.shifts, ...REGIONS.UK.shifts];
  const shifts = allShifts.filter(shift => {
    const area = shiftRegion(shift.location);
    const countryMatches = filterCountry === 'all' || (filterCountry === 'UK' ? area !== 'IE' : area === filterCountry);
    const professionMatches = !searchProfession || searchProfession === 'Locum Pharmacist';
    const locationMatches = !searchLocation || shift.location.toLowerCase().includes(searchLocation.toLowerCase());
    const facts = shiftFacts(shift);
    const minimumExperience = shift.requirements.join(' ').match(/Minimum (\d+) year/i);
    const experienceMatches = !filterExperience || (minimumExperience !== null && (filterExperience === 'Newly qualified' ? Number(minimumExperience[1]) === 0 : Number(minimumExperience[1]) <= Number(filterExperience.match(/\d+/)?.[0] ?? 0)));
    return countryMatches && professionMatches && locationMatches && experienceMatches
      && (!filterSpecialisation || shift.specialisation === filterSpecialisation)
      && (!filterDate || facts.dateISO >= filterDate)
      && (!filterRateMin || facts.hourlyRate >= Number(filterRateMin))
      && (!filterUrgentOnly || shift.urgent);
  }).sort((first, second) => sortBy === 'rate'
    ? shiftFacts(second).hourlyRate - shiftFacts(first).hourlyRate
    : shiftFacts(first).dateISO.localeCompare(shiftFacts(second).dateISO));
  const filterCities = WORK_REGIONS.filter(area => filterCountry === 'all' || (filterCountry === 'UK' ? area.id !== 'IE' : area.id === filterCountry)).flatMap(area => area.cities);
  const filterCurrency = filterCountry === 'all' ? '€ / £' : filterCountry === 'IE' ? '€' : '£';
  const resetShiftFilters = () => {
    setFilterCountry('all'); setSearchLocation(''); setSearchProfession('');
    setFilterSpecialisation(''); setFilterDate(''); setFilterRateMin('');
    setFilterExperience(''); setFilterUrgentOnly(false); setSelectedShift(0);
  };
  useEffect(() => setSelectedShift(0), [filterCountry, searchLocation, searchProfession, filterSpecialisation, filterDate, filterRateMin, filterExperience, filterUrgentOnly, sortBy]);
  const applyShift = shifts[selectedShift] ?? shifts[0];

  const faqs: Record<string, { q: string; a: string }[]> = {
    Locum: [
      { q: "What services does MployUs Locums offer?", a: "MployUs is a direct marketplace connecting locum pharmacists and pharmacy technicians with employers across Ireland and the UK. Register in minutes, set your location and availability, and receive relevant shift opportunities instantly. You can apply, confirm, and manage shifts entirely within the app — no phone calls or intermediaries." },
      { q: "Are there any fees for locums to register?", a: "Registration is free for locums. Once registered and verified, you can apply for shifts immediately. Platform fees are outlined transparently when you apply — you'll always see exactly what you'll receive before accepting a shift." },
      { q: "What compliance documents do I need to upload?", a: "At minimum: a valid PSI or GPhC registration certificate, Garda vetting (Ireland) or Enhanced DBS (UK), proof of indemnity insurance, and your CV. Once uploaded and verified, your compliance status is shown to employers automatically — you won't need to resend documents for each shift." },
      { q: "How does payment work after completing a shift?", a: "After each shift, your timesheet is submitted and approved in-app — typically within a few hours of shift end. Payments are processed weekly via SEPA (Ireland) or Faster Payments (UK), landing in your account within 2–3 working days of approval. A full earnings summary is available in your dashboard." },
      { q: "Can I set my own hourly rate?", a: "Yes. You set your preferred rate when applying for each shift, or set a default in your profile. MployUs data shows that 61% of locums who name their rate in applications receive it or within 5% of it. Employers see your rate before accepting, so transparency works in your favour." },
      { q: "What types of roles can I find on MployUs?", a: "Community pharmacy locum shifts, hospital pharmacy locum cover, and permanent pharmacist and pharmacy technician positions. Roles are available across Ireland (Republic and Northern Ireland) and Great Britain. You can filter by profession, date, rate, and travel distance." },
      { q: "How do renewal reminders for compliance documents work?", a: "MployUs tracks expiry dates for your Garda vetting / DBS, registration, and indemnity certificates. You receive in-app and email notifications 6 months and 1 month before each document expires, giving you plenty of time to renew without disrupting your bookings." },
    ],
    Employers: [
      { q: "How do I post a shift on MployUs?", a: "Register your facility, complete a brief profile, and use our guided posting flow — it takes under 3 minutes. Your shift goes live immediately and is matched to relevant locums in your region. You can optionally mark shifts as urgent to boost visibility." },
      { q: "How are locums verified before they can apply?", a: "Every locum must upload and pass verification of: PSI or GPhC registration, Garda vetting (Ireland) or Enhanced DBS with barred list check (UK), professional indemnity insurance, and identity documents. Verification is handled by MployUs — you receive a compliance summary before any shift starts. You never need to chase documents yourself." },
      { q: "What does it cost to fill a shift?", a: "Employers pay a flat per-shift platform fee — not a percentage of the locum's rate. This means the more senior (and higher-rate) the locum you hire, the better value the fee represents compared to a traditional agency model. Contact us for volume pricing if you fill more than 20 shifts per month." },
      { q: "How quickly can I fill an urgent shift?", a: "MployUs data shows an average fill time of under 4 hours for urgent shifts posted on the platform — compared to an industry average of 11 hours via traditional agencies. Marking a shift as urgent surfaces it prominently to locums within your travel radius." },
      { q: "Can I request a specific locum I have worked with before?", a: "Yes. After a completed shift, you can add a locum to your favourites and send them a direct request for future shifts. If they are available and accept, the booking is confirmed immediately — no competition with other applicants." },
      { q: "What happens if a locum cancels close to shift time?", a: "MployUs sends an immediate notification and re-posts the shift automatically. Our network of verified locums is active around the clock, and urgent re-posts typically attract new applicants within 30–60 minutes. Your account manager is also available to assist with same-day cover." },
      { q: "Can I post permanent positions as well as locum shifts?", a: "Yes. MployUs supports both locum shift postings and permanent job advertisements for pharmacists and pharmacy technicians. Permanent listings are displayed to candidates actively searching for career moves, with application management built into the employer dashboard." },
    ],
  };

  const [blogPost, setBlogPost] = useState<number | null>(null);
  const [blogCategory, setBlogCategory] = useState('All');
  const [blogAudience, setBlogAudience] = useState<'all' | Region>('all');

  const articles = [
    {
      tag: 'Salary Guide', tagColor: 'bg-green-50 text-green-700 border-black/5', read: '8 min', date: 'Jul 2026', featured: true,
      img: '/images/locum-journal/pharmacist.jpg',
      audience: ['IE', 'UK'],
      title: '2026 Locum Pharmacist pay rates: Ireland vs UK',
      subtitle: 'A comprehensive breakdown of hourly rates by region, specialisation, and experience level — with projections for the rest of the year.',
      body: [
        { h: 'The national picture', p: 'Locum pharmacist rates have risen across Ireland and the UK in 2026, driven by continued shortages of qualified staff and growing demand from community pharmacy groups expanding their clinical services offering. In Ireland, rates now average €52–€60/hr for community roles, with hospital outpatient positions commanding up to €68/hr in Dublin and Cork.' },
        { h: 'Ireland: city vs rural divide', p: 'Dublin, Cork and Galway remain premium markets. Dublin 2 and 4 postcodes — high footfall, long trading hours — continue to attract the highest rates, frequently at €58–€65/hr for urgent cover. Rural County Donegal or Kerry roles typically sit at €48–€54/hr, though agencies often add travel supplements that can close the gap significantly.' },
        { h: 'UK: England leads, Scotland narrows', p: 'In England, London community rates have settled at £34–£42/hr, with outer London and commuter belt pharmacies at £30–£36. Scotland has seen the fastest growth — Glasgow and Edinburgh now average £32–£38, up from £28–£33 in 2024, reflecting NHS Scotland investment in Pharmacy First.' },
        { h: 'Specialisation premium', p: 'Pharmacists with Pharmacy First accreditation, vaccination qualifications, or independent prescriber status consistently attract a 10–18% rate premium. OST (methadone) supervision experience adds £3–£5/hr in England and up to €5/hr in Ireland, where supervised consumption services are expanding.' },
        { h: 'What to negotiate', p: 'MployUs data shows 61% of locums who name their rate in applications receive it or within 5% of it. The lowest acceptance rates come from new graduates quoting senior rates — calibrate your ask to your PSI/GPhC year of registration and community experience.' },
      ],
      callout: 'Rates quoted are for community pharmacy locum cover. Hospital, clinic, and primary care rates vary significantly by Trust and HSE CHO area.',
    },
    {
      tag: 'Compliance', tagColor: 'bg-emerald-50 text-emerald-700 border-black/5', read: '11 min', date: 'Jun 2026', featured: true,
      img: '/images/locum-journal/consultation.jpg',
      audience: ['IE', 'UK'],
      title: 'The complete Garda vetting & DBS toolkit for locums and employers',
      subtitle: 'Everything you need to know about background checks in Irish and UK healthcare — what they cover, how long they take, and how to manage renewals.',
      body: [
        { h: 'Why background checks matter', p: 'Healthcare professionals have direct, unsupervised access to vulnerable patients. Garda vetting (Ireland) and DBS checks (UK) are the primary mechanisms by which employers and agencies verify that a locum has no disqualifying criminal history.' },
        { h: 'Garda vetting: the Irish system', p: 'The National Vetting Bureau (NVB) processes all Garda vetting applications in Ireland. Only registered bodies (which MployUs holds) can submit applications. Standard turnaround is 3–7 business days; peak periods (August/September) can stretch to 3 weeks. Vetting must be renewed every 3 years for roles in healthcare, or earlier if a new employer requests.' },
        { h: 'DBS: the UK system', p: 'In the UK, the Disclosure and Barring Service issues Standard and Enhanced DBS checks. Pharmacy roles require an Enhanced DBS with barred list check. MployUs processes DBS applications on behalf of registered locums within 2–5 working days in most cases. The DBS Update Service (£16/yr) lets you reuse a certificate with any employer in the same workforce — highly recommended for locums.' },
        { h: 'What shows up — and what does not', p: 'Both systems disclose spent and unspent convictions relevant to the role. Minor spent convictions may not appear on an Enhanced check depending on age, sentence, and recency rules. A caution for a healthcare-specific offence (e.g. supply of controlled drugs) will almost always appear and will require regulatory body disclosure.' },
        { h: 'Managing renewals as a locum', p: 'Keep digital copies of your vetting/DBS certificate. Add the 3-year renewal date to your calendar — many locums discover their certificate has expired mid-placement. MployUs sends automatic renewal reminders at 6 months and 1 month before expiry.' },
      ],
      callout: 'MployUs verifies Garda vetting and DBS for all registered locums automatically. Employers always receive a compliance summary before a shift starts.',
    },
    {
      tag: 'Market Report', tagColor: 'bg-amber-50 text-amber-700 border-black/5', read: '6 min', date: 'Jun 2026', featured: false,
      img: '/images/locum-journal/pharmacy.jpg',
      audience: ['IE'],
      title: 'How Irish pharmacy groups are rethinking locum staffing in 2026',
      subtitle: 'From agency dependence to direct marketplace access — what the data says about changing employer behaviour.',
      body: [
        { h: 'The shift away from agencies', p: 'Our 2026 employer survey of 120 Irish pharmacy managers found 67% had reduced their agency spend in the past 12 months. The most commonly cited reasons: margin transparency (agencies rarely disclose their mark-up), speed (direct platforms fill faster), and compliance burden (agencies vary widely in how thoroughly they vet locums).' },
        { h: 'What employers want', p: 'When asked to rank their priorities, pharmacy managers listed: (1) guaranteed compliance verification, (2) speed of fill, (3) known rates, (4) locum quality. Price came fifth. This is a significant shift from 2022, when rate was the primary driver.' },
        { h: 'Platform adoption trajectory', p: 'Among facilities that have used MployUs, average fill time is under 4 hours for urgent shifts and under 18 hours for planned cover. By contrast, the survey average for agency-sourced cover was 11 hours (urgent) and 3.2 days (planned).' },
      ],
      callout: null,
    },
    {
      tag: 'Career', tagColor: 'bg-amber-50 text-amber-700 border-black/5', read: '7 min', date: 'May 2026', featured: false,
      img: '/images/locum-journal/pharmacist.jpg',
      audience: ['IE', 'UK'],
      title: 'From staff pharmacist to locum: a practical transition guide',
      subtitle: 'The financial, logistical, and professional steps to make the leap — and what no one tells you about the first 90 days.',
      body: [
        { h: 'Why pharmacists go locum', p: 'Flexibility, rate, and autonomy are the top three reasons pharmacists make the switch. In our 2026 survey, 74% of locums said their hourly earnings increased immediately — but 58% also underestimated the admin burden of managing their own compliance, tax, and CPD.' },
        { h: 'What to sort before you hand in your notice', p: 'Registration: confirm your PSI or GPhC registration is active and note the renewal date. Indemnity: MIPS, Zurich, or MPS policies for locums differ from employed pharmacist policies — get a quote before you resign. Garda vetting/DBS: start the application before your last day of employment. Tax: inform Revenue (Ireland) or HMRC (UK) of your new self-employed status.' },
        { h: 'The first 90 days', p: 'Most locums take 3–6 weeks to fill their first week of shifts. The gap is normal — your profile needs to build, and employers need a track record. Register on MployUs, upload your documents, and set your travel radius generously at first. Once you have 5+ completed shifts, applications convert significantly faster.' },
      ],
      callout: null,
    },
    {
      tag: 'Compliance', tagColor: 'bg-emerald-50 text-emerald-700 border-black/5', read: '5 min', date: 'May 2026', featured: false,
      img: '/images/locum-journal/consultation.jpg',
      audience: ['IE'],
      title: 'PSI revalidation in 2026: what has changed and what you need to do',
      subtitle: 'A plain-English walkthrough of the PSI continuing competence framework updates effective January 2026.',
      body: [
        { h: 'The key changes', p: 'From January 2026, the PSI requires all registrants to complete a minimum of 30 CPD hours annually (up from 24) and to evidence at least one peer review activity. Pharmacists in managerial roles must additionally complete a formal governance CPD module from an approved provider.' },
        { h: 'What counts toward your hours', p: 'Structured learning (accredited courses, webinars, conferences) can account for a maximum of 20 hours. The remaining 10 must be reflective practice — structured reflection on a clinical or professional situation. MployUs CPD courses are PSI-approved and each completed course generates a timestamped certificate for your portfolio.' },
        { h: 'Deadline and consequences', p: 'The annual return window opens 1 October and closes 31 December. Failure to submit results in removal from the register. The PSI conducted 400 spot audits in 2025; 23 pharmacists were required to attend a fitness to practise interview as a result.' },
      ],
      callout: 'Complete your PSI CPD requirements with MployUs Training — all courses are PSI-approved and automatically logged to your compliance portfolio.',
    },
    {
      tag: 'Salary Guide', tagColor: 'bg-green-50 text-green-700 border-black/5', read: '9 min', date: 'Apr 2026', featured: false,
      img: '/images/locum-journal/pharmacy.jpg',
      audience: ['IE', 'UK'],
      title: 'Pharmacy technician rates 2026: community, hospital, and primary care',
      subtitle: 'Technician locum rates have risen faster than pharmacist rates in the last two years. Here is the data.',
      body: [
        { h: 'The technician shortage', p: 'Qualified pharmacy technicians are in shorter supply than pharmacists in many parts of Ireland and the UK. The PSI registered 1,340 new pharmacists in 2025 vs only 290 new pharmacy technicians. In the UK, similar dynamics are playing out — NVQ Level 3 completion rates have not kept pace with demand.' },
        { h: 'Current rates', p: 'Community pharmacy technician locum rates in Ireland now average €22–€28/hr, up 18% from 2024. Hospital technician rates range from €26–€34/hr depending on Band equivalent and speciality. In the UK, community rates of £16–£22/hr are common, with hospital Band 4–5 equivalent locum rates at £20–£28/hr.' },
        { h: 'What drives premiums', p: 'PMR system expertise (Titan, RxWeb, JAC, Pharmacy Manager) adds £1–£3/hr in most markets. Aseptics, TPN preparation, and cytotoxics experience can add 20–30% in hospital settings. Technicians with NPS checking qualifications command the highest premiums in England.' },
      ],
      callout: null,
    },
    {
      tag: 'Compliance', tagColor: 'bg-emerald-50 text-emerald-700 border-black/5', read: '4 min', date: 'Oct 2026', featured: false,
      audience: ['UK'], img: imgLocumProfessional,
      title: 'Locum work across the UK: a regional registration checklist',
      subtitle: 'England, Wales, Scotland and Northern Ireland: know which registration and background-check route applies to your role.',
      body: [
        { h: 'England and Wales', p: 'Pharmacists should check their GPhC registration and the services required by the hiring facility. Background-check requirements depend on the role and eligibility; confirm the appropriate DBS level rather than assuming every role needs the same check.' },
        { h: 'Scotland', p: 'Confirm GPhC registration for pharmacy roles, local service requirements and whether Disclosure Scotland or PVG scheme membership is required for the work. Check current guidance directly with the regulator and facility.' },
        { h: 'Northern Ireland', p: 'Pharmacist registration is overseen by the Pharmaceutical Society of Northern Ireland (PSNI). Discuss AccessNI requirements with the facility. Do not assume that a GPhC registration or DBS certificate alone satisfies the requirements for work in Northern Ireland.' },
        { h: 'Before confirming a shift', p: 'Agree the exact address, responsibilities, paid hours, breaks, rate, expenses and cancellation terms in writing. Verify right-to-work and professional indemnity requirements for the engagement. This is general guidance, not legal or regulatory advice.' },
      ], callout: 'Always verify current requirements with GPhC, PSNI, DBS, Disclosure Scotland or AccessNI, as appropriate to the role and location.',
    },
  ];
  const countryArticles = articles.filter(article => blogAudience === 'all' || article.audience.includes(blogAudience));
  const visibleArticles = countryArticles.filter(article => blogCategory === 'All' || article.tag === blogCategory);



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
          className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-left ${dark ? 'bg-white/10 border border-black/5' : 'bg-slate-50 border border-black/5 hover:border-black/5'} transition-colors`}
        >
          <Icon className={`w-4 h-4 shrink-0 ${dark ? 'text-white/50' : 'text-slate-400'}`} />
          <span className={`text-sm font-medium flex-1 select-text ${dark ? 'text-white' : 'text-slate-800'}`}>{value}</span>
          <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform ${dark ? 'text-white/40' : 'text-slate-400'} ${open ? 'rotate-180' : ''}`} />
        </button>
        {open && (
          <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-black/5 rounded-xl z-50 overflow-hidden max-h-52 overflow-y-auto">
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
      className={`rounded-2xl ${dark ? 'bg-white/10 backdrop-blur-xl border border-black/5 p-2' : 'bg-white border border-black/5 p-2'} grid grid-cols-1 md:grid-cols-4 gap-2`}
      onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setDropdownOpen(null); }}
    >
      <SearchDropdown id="profession" icon={Stethoscope} value={searchProfession} options={PROFESSIONS.map(p => p.name)} onChange={setSearchProfession} dark={dark} />
      <SearchDropdown id="location" icon={MapPin} value={searchLocation} options={loc.cities} onChange={setSearchLocation} dark={dark} />
      <div className={`flex items-center gap-2.5 px-4 py-3 rounded-xl ${dark ? 'bg-white/10 border border-black/5' : 'bg-slate-50 border border-black/5 '}`}>
        <Calendar className={`w-4 h-4 shrink-0 ${dark ? 'text-white/50' : 'text-slate-400'}`} />
        <input type="date" placeholder="Select date" className={`bg-transparent text-sm font-medium w-full outline-none ${dark ? 'text-white/70 [color-scheme:dark]' : 'text-slate-600'}`} />
      </div>
      <button
        onClick={() => goto('find-shifts')}
        className="px-4 py-3 bg-[#368B62] hover:bg-[#286d4c] text-white font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
      >
        <Search className="w-4 h-4" /> Search Shifts
      </button>
    </div>
  );

  return (
    <div className="min-h-screen overflow-x-clip bg-white text-slate-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ══════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════ */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-lg border-b border-black/5' : 'bg-white border-b border-black/5'}`}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <div className="flex items-center justify-between h-[70px]">

            <button onClick={() => goto('home')} className="shrink-0">
              <span className="flex items-baseline gap-2 text-[23px] font-semibold tracking-[-0.02em] text-[#24332d]">mployus<span className="text-xs font-medium tracking-normal text-[#368B62]">locums.</span></span>
            </button>

            <nav className="hidden lg:flex items-center">
              {navLinks.map(l => (
                <button
                  key={l.id}
                  onClick={() => goto(l.id)}
                  className={`px-3.5 py-2 mx-0.5 text-[14px] font-medium rounded-lg transition-all ${
                    page === l.id
                      ? 'bg-green-50 text-[#368B62]'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-2">
              <div className="flex items-center bg-slate-50 border border-black/5 rounded-lg p-0.5 mr-1">
                {(Object.keys(REGIONS) as Region[]).map(r => (
                  <button
                    key={r}
                    onClick={() => applyRegion(r)}
                    title={REGIONS[r].country}
                    className={`w-8 h-7 rounded-md text-base flex items-center justify-center transition-all ${region === r ? 'bg-white' : 'opacity-40 hover:opacity-80'}`}
                  >
                    {REGIONS[r].flag}
                  </button>
                ))}
              </div>
              <button onClick={onBackToHome} className="text-[11px] font-medium text-slate-400 hover:text-slate-600 mr-1 transition-colors">
                MployUs.com ↗
              </button>
              <button onClick={() => openAuth('signup')} className="rounded-full bg-[#368B62] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#286d4c]">
                Register
              </button>
              <button onClick={() => openAuth('signin')} className="px-4 py-2 text-sm font-medium text-[#24332d] transition-colors hover:text-[#368B62]">
                Login
              </button>
            </div>

            <button aria-label={mobileNavOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileNavOpen} className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100" onClick={() => setMobileNavOpen(o => !o)}>
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileNavOpen && (
          <div className="lg:hidden border-t border-black/5 bg-white/98 backdrop-blur-xl px-4 py-4 space-y-1">
            {navLinks.map(l => (
              <button key={l.id} onClick={() => goto(l.id)} className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold ${page === l.id ? 'bg-green-50 text-green-700' : 'text-slate-700 hover:bg-slate-50'}`}>
                {l.label}
              </button>
            ))}
            <div className="flex gap-1.5 pt-3">
              {(Object.keys(REGIONS) as Region[]).map(r => (
                <button key={r} onClick={() => applyRegion(r)} className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold border transition-colors ${region === r ? 'bg-green-50 border-black/5 text-green-700' : 'bg-white border-black/5 text-slate-600'}`}>
                  <span className="text-base">{REGIONS[r].flag}</span> {REGIONS[r].country}
                </button>
              ))}
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={() => openAuth('signup')} className="flex-1 py-2.5 text-sm font-semibold border border-black/5 rounded-lg">Register</button>
              <button onClick={() => openAuth('signin')} className="flex-1 py-2.5 text-sm font-semibold text-white bg-[#368B62] rounded-lg">Login</button>
            </div>
            <button onClick={onBackToHome} className="block w-full text-left px-3 py-2 text-[11px] text-slate-400">← Back to MployUs.com</button>
          </div>
        )}
      </header>

      {/* ══════════════════════════════════════
          HOME PAGE
      ══════════════════════════════════════ */}
      {page === 'home' && (
        <div className="bg-white [&_h2]:font-medium [&_h2]:leading-[1.12] [&_h2]:text-[#24332d] [&_h2]:tracking-[-0.025em]">

        <section className="mx-auto mt-[86px] max-w-[1280px] px-4 sm:px-6" aria-label="Locum opportunities in Ireland and the UK">
          <div className="relative overflow-hidden rounded-[28px] bg-[#edf2ef]">
            <div className="absolute inset-y-0 right-0 hidden w-[54%] lg:block">
              <img src={imgLocumProfessional} alt="Healthcare professional in teal scrubs" className="h-full w-full object-cover object-[center_22%]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#edf2ef] via-[#edf2ef]/10 to-transparent" />
            </div>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="relative z-10 px-7 py-12 sm:px-12 sm:py-16 lg:w-[61%] lg:px-14 lg:py-20">
              <p className="mb-7 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#53685b]"><span className="h-1.5 w-1.5 rounded-full bg-[#368B62]" />Healthcare, on your terms · Ireland & UK</p>
              <h1 className="text-[36px] font-medium leading-[1.04] tracking-[-0.025em] text-[#24332d] sm:text-[62px] lg:text-[68px]">Great care.<br />More freedom.<br /><span className="text-[#368B62]">Your next shift.</span></h1>
              <p className="mt-6 max-w-[430px] text-[15px] leading-7 text-[#64716a]">A more human way to work in healthcare. Find flexible shifts, connect with trusted facilities and make room for the life you want to live.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={() => goto('find-shifts')} className="group inline-flex items-center gap-4 rounded-full bg-[#368B62] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#286d4c]">Find your next shift<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></button>
                <button onClick={() => openAuth('signup')} className="rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#24332d] transition-colors hover:bg-[#dcebe1]">Join as a locum</button>
              </div>
              <div className="mt-9 flex max-w-[450px] flex-wrap gap-x-5 gap-y-3">{['Flexible opportunities', 'Country-aware registration', 'People-first support'].map(label => <span key={label} className="flex items-center gap-1.5 text-[10px] text-[#64716a]"><Check className="h-3.5 w-3.5 text-[#368B62]" />{label}</span>)}</div>
            </motion.div>
            <div className="relative h-[340px] overflow-hidden lg:hidden"><img src={imgLocumProfessional} alt="Healthcare professional in teal scrubs" className="h-full w-full object-cover object-[center_25%]" /></div>
            <div className="absolute bottom-6 right-6 z-10 flex items-center gap-4 rounded-2xl bg-white/95 px-5 py-4 lg:bottom-8 lg:right-8"><div><p className="mb-1 text-[9px] uppercase tracking-[0.14em] text-[#7a827c]">A schedule that fits</p><p className="text-sm font-medium text-[#24332d]">Your expertise. Your choice.</p></div><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#dceee4]"><Calendar className="h-4 w-4 text-[#368B62]" /></span></div>
          </div>
        </section>
        <section aria-label="Find locum opportunities" className="relative z-20 mx-auto max-w-[1280px] px-6 pb-4 pt-8"><div className="mx-auto max-w-[1184px]"><p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#67716b]">A little closer to your next opportunity</p><SearchBar /></div></section>

        <Reveal className="mx-auto max-w-[1000px] px-6 pb-12 pt-20 text-center"><p className="text-[32px] font-medium uppercase leading-[1.15] tracking-[-0.02em] text-[#a5b9ad] sm:text-[48px]">Care is personal.<br />Your working life should be, too.</p><p className="mx-auto mt-7 max-w-[630px] text-sm leading-7 text-[#68716c]">Find the opportunities that fit your expertise, your schedule and your ambitions. We connect healthcare professionals and facilities, with thoughtful support along the way.</p></Reveal>
        <section aria-label="Getting started with MployUs Locums" className="mx-auto max-w-[1280px] px-6 pb-12">
          <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><SectionLabel>A simple place to start</SectionLabel><h2 className="mt-4 text-3xl">Flexible work. A clear next step.</h2></div><p className="max-w-sm text-sm leading-6 text-slate-500">For healthcare professionals and facilities across Ireland, Northern Ireland, England, Wales and Scotland.</p></div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { number: '01', icon: ShieldCheck, title: 'Introduce yourself', description: 'Choose your country and profession, create your profile and prepare your registration and compliance documents.', label: 'Create your profile', action: () => openAuth('signup') },
              { number: '02', icon: MapPin, title: 'Find your fit', description: 'Explore opportunities by region, location, specialisation and rate. Read the full shift brief before applying.', label: 'Explore locum shifts', action: () => goto('find-shifts') },
              { number: '03', icon: Building2, title: 'Keep care moving', description: 'Need cover? Tell us your facility’s staffing requirements and use the guided flow to request a healthcare professional.', label: 'Request locum cover', action: () => goto('post-shift') },
            ].map(item => <Reveal key={item.number} className="rounded-3xl bg-[#f4f8f5] p-7"><div className="mb-7 flex items-center justify-between"><item.icon className="h-6 w-6 text-[#368B62]" /><span className="text-sm text-[#9ab1a3]">{item.number}</span></div><h3 className="text-lg font-medium text-[#24332d]">{item.title}</h3><p className="mt-3 text-sm leading-6 text-slate-500">{item.description}</p><button onClick={item.action} className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-[#368B62] hover:gap-3 transition-all">{item.label}<ArrowRight className="h-3.5 w-3.5" /></button></Reveal>)}
          </div>
        </section>
        {/* ── STATS RIBBON ── */}
        <section className="mx-auto max-w-[1280px] px-6">
          <div ref={statsRef} className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className={`flex min-h-[220px] flex-col rounded-[24px] p-6 sm:min-h-[260px] sm:p-8 ${["bg-[#dceee4]", "bg-[#eef0f1]", "bg-[#faf0e1]", "bg-[#e3eff4]"][i % 4]}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="text-[42px] font-medium leading-none tracking-[-0.03em] text-[#24332d] sm:text-[54px]">{stat.value}</div>
                  <Icon className="mb-3 mt-auto h-6 w-6 text-[#53685b]" />
                  <p className="text-xs font-medium text-[#53685b]">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </section>



        {/* ── ABOUT ── */}
        <section className="py-20 max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Stacked images with offset */}
            <Reveal variant={slideLeft} className="relative grid h-[430px] grid-cols-2 gap-4 sm:h-[520px]">
              <motion.div
                className="relative mt-10 h-[calc(100%-40px)] w-full rounded-3xl overflow-hidden "
                whileHover={{ scale: 1.02, rotate: -1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                <img src={imgTjqvmx3} alt="Healthcare professional" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div
                className="relative mb-10 h-[calc(100%-40px)] w-full rounded-3xl overflow-hidden "
                whileHover={{ scale: 1.02, rotate: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                <img src={imgImage1} alt="Medical consultation" className="w-full h-full object-cover" />
              </motion.div>
              {/* Floating badge */}
              <motion.div
                className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white rounded-2xl border border-black/5 px-4 py-3 z-10"
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
              <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-medium text-slate-900 leading-[1.1] tracking-[-0.02em]">
                MployUs connects you to the <span className="text-[#368B62]">right job</span>
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
                        <Icon className="w-3.5 h-3.5 text-[#368B62]" />
                      </div>
                      {item.label}
                    </motion.div>
                  );
                })}
              </motion.div>
              <motion.button
                variants={fadeUp}
                onClick={() => goto('find-shifts')}
                className="group inline-flex items-center gap-2 text-sm font-bold text-[#368B62] hover:text-green-700 transition-colors"
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                Browse open shifts <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* ── WHO CAN JOIN ── */}
        <section className="py-20 bg-[#f7f9f8]">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
            <Reveal className="text-center mb-14">
              <SectionLabel>Who can join MployUs Locums</SectionLabel>
              <h2 className="text-4xl font-bold text-slate-900 tracking-[-0.02em] mt-4 mb-3">Built for certified healthcare professionals</h2>
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
                  className="group shrink-0"
                  variants={{
                    hidden: { opacity: 0, y: 40, scale: 0.96 },
                    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                >
                  <div className="relative w-[280px] h-[360px] rounded-[24px] overflow-hidden ">
                    <motion.img
                      src={item.img}
                      alt={item.label}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#20372b]/80 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="text-2xl mb-1">{item.emoji}</div>
                      <p className="inline-flex rounded-full bg-white px-4 py-2.5 text-[#24332d] font-medium text-[13px] leading-tight">{item.label}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="flex justify-center gap-2 mt-8">
              {WHO_CAN_JOIN.map((_, i) => (
                <div key={i} className={`rounded-full transition-all ${i === 1 ? 'w-6 h-2 bg-[#368B62]' : 'w-2 h-2 bg-slate-200'}`} />
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY MPLOYUS ── */}
        <section className="py-20 max-w-[1280px] mx-auto px-6 lg:px-12">
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
                <h2 className="text-4xl font-bold text-slate-900 tracking-[-0.02em] leading-[1.1]">
                  Everything you need to<br /><span className="text-[#368B62]">work on your terms</span>
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
                        className="w-11 h-11 rounded-xl bg-green-50 border border-black/5 flex items-center justify-center shrink-0"
                        whileHover={{ scale: 1.1, backgroundColor: '#dcfce7' }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      >
                        <Icon className="w-5 h-5 text-[#368B62]" />
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
                  className="px-5 py-2.5 text-sm font-bold text-white bg-[#368B62] rounded-xl"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  Join for free
                </motion.button>
                <motion.button
                  onClick={() => goto('find-shifts')}
                  className="px-5 py-2.5 text-sm font-bold text-slate-700 border border-black/5 rounded-xl"
                  whileHover={{ scale: 1.04, backgroundColor: '#f8fafc' }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  Browse shifts
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Image */}
            <Reveal variant={slideRight} className="order-1 lg:order-2">
              <div className="relative rounded-3xl overflow-hidden  h-[520px]">
                <motion.img
                  src={imgWmremoveTransformed1}
                  alt="Healthcare professional"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-slate-900/30" />
                <motion.div
                  className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-sm rounded-2xl p-4 border border-black/5 "
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Live shifts available</div>
                      <div className="text-xl font-bold text-slate-900 mt-0.5">{loc.shifts.length} shifts near {loc.defaultCity}</div>
                    </div>
                    <button onClick={() => goto('find-shifts')} className="px-4 py-2 bg-[#368B62] hover:bg-[#286d4c] text-white text-xs font-bold rounded-lg transition-colors">
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
          <div className="relative rounded-3xl overflow-hidden bg-[#e6f0e9]">
            {/* Decorative blobs */}

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[420px]">
              {/* Text */}
              <div className="p-10 lg:p-14 flex flex-col justify-center space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 border border-black/5 text-[#53685b] text-[11px] font-semibold uppercase tracking-widest w-fit">
                  <Smartphone className="w-3 h-3" /> Mobile App
                </div>
                <h2 className="text-4xl font-bold text-[#24332d] leading-tight">
                  Your shifts,<br />in your pocket.
                </h2>
                <p className="text-[#64716a] text-[15px] leading-relaxed max-w-md">
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
                      <li key={f.label} className="flex items-center gap-2.5 text-sm text-[#53685b]">
                        <Icon className="w-4 h-4 text-[#368B62] shrink-0" /> {f.label}
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
                        className="flex items-center gap-3 px-5 py-3 bg-white hover:bg-[#d5e6db] border border-black/5 rounded-xl transition-all group"
                      >
                        <Icon className="w-5 h-5 text-[#24332d] fill-current" />
                        <span className="text-left">
                          <span className="block text-[9px] text-[#64716a]">{btn.top}</span>
                          <span className="block text-sm font-bold text-[#24332d]">{btn.bottom}</span>
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
                  className="absolute top-12 right-10 bg-white rounded-2xl border border-black/5 px-4 py-3 z-20 animate-[float_2.4s_ease-in-out_1s_infinite]"
                  initial={{ opacity: 0, scale: 0.7, x: 20 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, type: 'spring', stiffness: 350, damping: 22 }}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center">
                      <Bell className="w-4 h-4 text-[#368B62]" />
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
        <section className="py-20 max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <SectionLabel>Testimonials</SectionLabel>
            <h2 className="text-4xl font-bold text-slate-900 tracking-[-0.02em] mt-4 mb-3">Trusted by healthcare professionals</h2>
            <p className="text-slate-500 text-base max-w-md mx-auto">Hear what our community has to say about working with MployUs Locums.</p>
          </div>

          <VerticalMarqueeDemo reviews={TESTIMONIALS.map(testimonial => ({
            name: testimonial.name,
            username: testimonial.role,
            body: testimonial.quote,
          }))} />
        </section>

        {/* ── FAQ SECTION ── */}
        <section className="py-20 bg-white">
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
                <h2 className="text-4xl font-bold text-slate-900 tracking-[-0.02em] leading-[1.1]">Frequently asked questions</h2>
                <p className="text-slate-500 text-[15px] leading-relaxed">
                  Everything you need to know about working with MployUs Locums, from shift requests to payments.
                </p>
                <motion.button
                  onClick={() => goto('faq')}
                  className="group inline-flex items-center gap-2 text-sm font-bold text-[#368B62] hover:text-green-700 transition-colors"
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
                <motion.div variants={fadeUp} className="flex items-center gap-1 bg-white border border-black/5 rounded-xl p-1 w-fit">
                  {(['Locum', 'Employers'] as const).map(tab => (
                    <motion.button
                      key={tab}
                      onClick={() => { setFaqTab(tab); setOpenFaq(0); }}
                      className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${faqTab === tab ? 'bg-[#368B62] text-white' : 'text-slate-600 hover:text-slate-900'}`}
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
                        className={`rounded-xl border overflow-hidden ${isOpen ? 'bg-[#368B62] border-black/5' : 'bg-white border-black/5 hover:border-black/5'}`}
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
        <section className="mx-auto max-w-[1280px] px-6 pb-14 lg:px-12" aria-label="Locum policies"><div className="flex flex-col justify-between gap-6 rounded-3xl border border-black/5 p-7 md:flex-row md:items-center"><div><h2 className="text-2xl">Clear terms. Informed choices.</h2><p className="mt-2 text-sm text-slate-500">Understand the service, how your information is handled and your privacy choices.</p></div><nav aria-label="Locum legal documents" className="flex flex-wrap gap-x-5 gap-y-3 text-xs font-medium text-[#368B62]"><Link to="/policies/terms">Terms of service ↗</Link><Link to="/policies/privacy">Privacy policy ↗</Link><Link to="/policies/cookies">Cookie policy ↗</Link><Link to="/policies/data-protection">Data protection ↗</Link><Link to="/policies/accessibility">Accessibility ↗</Link></nav></div></section>
        <section className="mx-6 mb-12 max-w-[1184px] rounded-[28px] bg-[#e6f0e9] py-14 overflow-hidden xl:mx-auto">
          <motion.div
            className="max-w-[1280px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-8"
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            <motion.div variants={slideLeft} className="space-y-3 text-center lg:text-left">
              <div className="text-xs font-bold text-[#368B62] uppercase tracking-widest">Join MployUs Locums</div>
              <h3 className="text-3xl font-medium text-[#24332d]">Start finding — or filling — shifts today</h3>
              <p className="text-[#64716a] text-sm">Free to register in Ireland and the UK. Verified professionals only.</p>
            </motion.div>
            <motion.div variants={slideRight} className="flex w-full flex-wrap items-center gap-3 lg:w-auto">
              <motion.button
                onClick={() => openAuth('signup')}
                className="px-7 py-3.5 bg-white text-slate-900 font-bold text-sm rounded-full"
                whileHover={{ scale: 1.04, backgroundColor: '#f8fafc' }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              >
                Create free account
              </motion.button>
              <motion.button
                onClick={onBackToHome}
                className="px-6 py-3.5 bg-white border border-black/5 text-[#24332d] font-semibold text-sm rounded-full"
                whileHover={{ scale: 1.03, backgroundColor: 'rgba(255,255,255,0.15)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              >
                Back to MployUs
              </motion.button>
            </motion.div>
          </motion.div>
        </section>

        </div>
      )}

      {/* ══════════════════════════════════════
          FIND SHIFTS
      ══════════════════════════════════════ */}
      {page === 'find-shifts' && (
        <>
        <div className="pt-[70px] min-h-screen bg-white">

          {/* ── Hero banner with background image ── */}
          <section className="bg-[#f5f7f1] px-6 py-14 sm:py-16"><div className="mx-auto max-w-[1184px]"><p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#67716b]">Your expertise. Your schedule.</p><h1 className="text-[42px] font-medium leading-[1.08] tracking-[-0.02em] text-[#24332d] sm:text-[56px]">Find your next shift.<br /><span className="text-[#368B62]">Make it work for you.</span></h1><p className="mt-5 max-w-lg text-sm leading-7 text-[#68716c]">Explore flexible locum opportunities and find the right fit for your profession, location and availability.</p></div></section>

          {/* ── Filter bar ── */}
          <div className="bg-white border-b border-black/5">
            <div className="max-w-[1286px] mx-auto px-10 py-6 flex flex-wrap items-end justify-between gap-4">
              <div className="flex flex-wrap gap-6 items-end">
                {/* Profession */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#757575] text-sm font-normal">Profession</label>
                  <div className="relative">
                    <select
                      value={searchProfession}
                      onChange={e => setSearchProfession(e.target.value)}
                      className="appearance-none bg-white border border-black/5 rounded px-3.5 py-2.5 pr-8 text-sm text-slate-700 outline-none focus:border-green-500 w-[244px] cursor-pointer"
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
                      className="appearance-none bg-white border border-black/5 rounded px-3.5 py-2.5 pr-8 text-sm text-slate-700 outline-none focus:border-green-500 w-[240px] cursor-pointer"
                    >
                      <option value="">Choose Specialization</option>
                      <option>Community Pharmacy</option>
                      <option>Hospital Pharmacy</option>
                      <option>Hospital Outpatient</option>
                      <option>Pharmacy Clinic</option>
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
                      className="appearance-none bg-white border border-black/5 rounded px-3.5 py-2.5 pr-8 text-sm text-slate-700 outline-none focus:border-green-500 w-[236px] cursor-pointer"
                    >
                      <option value="">Choose location</option>
                      {filterCities.map(city => <option key={city}>{city}</option>)}
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
                      className="bg-white border border-black/5 rounded px-3.5 py-2.5 text-sm text-slate-700 outline-none focus:border-green-500 w-[200px] cursor-pointer"
                    />
                  </div>
                </div>
                {/* Min Rate */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#757575] text-sm font-normal">Min. Hourly Rate ({filterCurrency})</label>
                  <div className="relative">
                    <select
                      value={filterRateMin}
                      onChange={e => setFilterRateMin(e.target.value)}
                      className="appearance-none bg-white border border-black/5 rounded px-3.5 py-2.5 pr-8 text-sm text-slate-700 outline-none focus:border-green-500 w-[180px] cursor-pointer"
                    >
                      <option value="">Any rate</option>
                      <option value="30">{filterCurrency}30+</option>
                      <option value="35">{filterCurrency}35+</option>
                      <option value="40">{filterCurrency}40+</option>
                      <option value="50">{filterCurrency}50+</option>
                      <option value="55">{filterCurrency}55+</option>
                      <option value="60">{filterCurrency}60+</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#757575] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                {/* Experience */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#757575] text-sm font-normal">Experience Level</label>
                  <div className="relative">
                    <select
                      value={filterExperience}
                      onChange={e => setFilterExperience(e.target.value)}
                      className="appearance-none bg-white border border-black/5 rounded px-3.5 py-2.5 pr-8 text-sm text-slate-700 outline-none focus:border-green-500 w-[180px] cursor-pointer"
                    >
                      <option value="">Any level</option>
                      <option>Newly qualified</option>
                      <option>1–3 years</option>
                      <option>3–5 years</option>
                      <option>5+ years</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#757575] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                {/* Urgent only toggle */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#757575] text-sm font-normal">Availability</label>
                  <button
                    onClick={() => setFilterUrgentOnly(v => !v)}
                    className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded border text-sm font-medium transition-colors ${filterUrgentOnly ? 'bg-red-50 border-red-200 text-red-700' : 'bg-white border-black/5 text-slate-600'}`}
                  >
                    <span className={`w-2 h-2 rounded-full ${filterUrgentOnly ? 'bg-red-500 animate-pulse' : 'bg-slate-300'}`} />
                    Urgent shifts only
                  </button>
                </div>
              </div>
              <button
                onClick={() => setSelectedShift(0)}
                className="bg-[#368B62] hover:bg-[#276647] text-white font-semibold text-[22px] px-8 py-3 rounded-lg transition-colors shrink-0"
              >
                Search
              </button>
            </div>
          </div>

          {/* ── Country filter tabs ── */}
          <div className="border-b border-black/5 bg-white">
            <div className="max-w-[1286px] mx-auto px-10 py-4 flex flex-col gap-2">
              <div className="flex items-center justify-between gap-4"><p className="text-[#3d3d3d] text-sm">Country &amp; region</p><button onClick={resetShiftFilters} className="text-xs font-semibold text-[#368B62]">Clear all filters</button></div>
              <p className="text-xs leading-5 text-slate-500">Preview listings, not live vacancies. Rates remain in € for Ireland and £ for the UK; no currency conversion is applied. Minimum-rate and rate-sort comparisons use the numeric advertised rate. Dates shown are sample dates in 2026.</p>
              <div className="flex flex-wrap gap-8 items-center">
                {[
                  { id: 'all', flag: '🌍', label: 'All' },
                  { id: 'UK', flag: '🇬🇧', label: 'All UK regions' },
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
                      onClick={() => { setFilterCountry(c.id as typeof filterCountry); setSearchLocation(''); setSelectedShift(0); if (c.id !== 'all') setRegion(c.id === 'IE' ? 'IE' : 'UK'); }}
                      aria-pressed={active}
                      aria-label={c.label}
                      className="flex items-center gap-2 text-[15px] text-black"
                    >
                      <div className={`w-[22px] h-[22px] rounded-full border border-black/5 flex items-center justify-center shrink-0 transition-colors ${active ? 'bg-[#368B62]' : 'bg-white'}`}>
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
                  <p aria-live="polite" className="text-[#757575] text-sm">{shifts.length} available {shifts.length === 1 ? 'shift' : 'shifts'}</p>
                  {/* Sort tabs */}
                  <div className="flex items-center gap-0.5 bg-white border border-black/5 rounded-full px-0.5 py-0.5">
                    {(['date', 'rate'] as const).map((s, i) => {
                      const labels = { date: 'Start Date', rate: 'Hourly Rate', distance: 'Distance', added: 'Date Added' };
                      const active = sortBy === s;
                      return (
                        <button
                          key={s}
                          onClick={() => setSortBy(s as 'date' | 'rate')}
                          className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${active ? 'bg-[#368B62] text-white' : 'text-[#757575] hover:text-slate-900'}`}
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
                        className={`w-full text-left transition-all border-b border-[#f1f1f1] ${active ? 'bg-[#368B62]' : 'bg-[rgba(245,245,245,0.6)] hover:bg-slate-50'}`}
                        style={active ? { borderColor: 'rgba(163,209,57,0.3)' } : {}}
                      >
                        <div className="flex flex-col gap-2 px-4 py-3">
                          {/* Pharmacy + title */}
                          <div>
                            <p className={`text-[11px] leading-snug ${active ? 'text-[#c5e8d7]' : 'text-black'}`}>{s.facility}</p>
                            <p className={`font-semibold text-lg leading-snug ${active ? 'text-[#a3d139]' : 'text-[#368B62]'}`}>{searchProfession || 'Locum Pharmacist'}</p>
                          </div>
                          {/* Date + rate row */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Calendar className={`w-3.5 h-3.5 shrink-0 ${active ? 'text-[#c5e8d7]/80' : 'text-[#757575]'}`} />
                              <span className={`text-[13px] ${active ? 'text-white/80' : 'text-black'}`}>{s.date}</span>
                            </div>
                            <div>
                              <p className={`text-[13px] font-normal ${active ? 'text-[#a3d139]' : 'text-[#368B62]'}`}>{s.rate}</p>
                              <p className={`text-[11px] ${active ? 'text-white/80' : 'text-black'}`}>Est. gross pay: {shiftFacts(s).totalPay}</p>
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

                <p className="mt-4 text-center text-xs text-slate-500">Showing all {shifts.length} matching preview listings</p>
              </div>

              {/* Right: selected shift detail + map */}
              {(() => {
                const s = shifts[selectedShift] ?? shifts[0];
                if (!s) return <div className="rounded-3xl bg-[#f4f8f5] p-10 text-center"><Search className="mx-auto mb-5 h-8 w-8 text-[#368B62]" /><h2 className="text-xl font-medium">No shifts match these filters</h2><p className="mt-3 text-sm leading-6 text-slate-500">Try another region or clear your filters. Preview listings currently cover pharmacists; other professions and locations may have no sample vacancies.</p><button onClick={resetShiftFilters} className="mt-6 rounded-full bg-[#368B62] px-6 py-3 text-sm font-semibold text-white">Show all shifts</button></div>;
                return (
                  <div className="flex flex-col gap-4">
                    {/* Detail card */}
                    <div className="bg-white border border-black/5 rounded-xl p-6 space-y-5">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm text-slate-500">{s.facility}</p>
                          <h2 className="text-2xl font-bold text-[#368B62] mt-0.5">{searchProfession || 'Locum Pharmacist'}</h2>
                          <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full bg-green-50 border border-black/5 text-[11px] font-semibold text-[#368B62]">{s.specialisation}</span>
                        </div>
                        <a aria-label="Share this shift by email" href={`mailto:?subject=${encodeURIComponent(`Locum shift: ${s.facility}`)}&body=${encodeURIComponent(`${s.facility}\n${s.location}\n${s.date} 2026, ${s.time}\n${s.rate}\n${s.description}\nPreview listing only — confirm details with the facility.\n${window.location.href}`)}`} className="flex items-center gap-1.5 px-3 py-1.5 border border-black/5 text-[#368B62] rounded text-xs font-semibold hover:bg-green-50 transition-colors shrink-0"><Mail className="w-3.5 h-3.5" /> Share</a>
                      </div>

                      {/* Key details grid */}
                      <div className="grid grid-cols-2 gap-4 text-sm border-t border-black/5 pt-4">
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
                              <p className="font-bold text-[#368B62] text-base">{s.rate}</p>
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
                      <div className="border-t border-black/5 pt-4 space-y-2">
                        <h4 className="text-sm font-bold text-slate-900">About this shift</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">{s.description}</p>
                      </div>

                      {/* Requirements */}
                      <div className="border-t border-black/5 pt-4 space-y-2">
                        <h4 className="text-sm font-bold text-slate-900">Requirements</h4>
                        <ul className="space-y-1.5">
                          {s.requirements.map((r, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                              <CheckCircle2 className="w-4 h-4 text-[#368B62] shrink-0 mt-0.5" />
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <LocumJobDetails reference={`LOC-${shiftRegion(s.location)}-${String(allShifts.indexOf(s) + 1).padStart(3, '0')}`} region={WORK_REGIONS.find(area => area.id === shiftRegion(s.location))!.label} date={s.date} hours={shiftFacts(s).paidHours} totalPay={shiftFacts(s).totalPay} onEnquire={() => onBookDemo(`Locum shift enquiry: ${s.facility}`)} />

                      {/* Apply */}
                      <div className="pt-1">
                        <motion.button
                          onClick={openApply}
                          className="w-full py-3 bg-[#368B62] hover:bg-[#276647] text-white font-bold text-base rounded-lg transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                        >
                          Apply for this shift
                        </motion.button>
                      </div>
                    </div>

                    {/* Map */}
                    <div className="rounded-xl overflow-hidden border border-black/5 ">
                      <p className="px-4 py-2.5 bg-white text-sm font-semibold text-slate-700 border-b border-black/5">Shift Location</p>
                      <div className="relative h-[320px] bg-[#e8f4ec]">
                        <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center"><MapPin className="h-10 w-10 text-[#368B62]" /><p className="text-lg font-medium text-[#24332d]">{s.location}</p><p className="max-w-sm text-xs leading-6 text-slate-600">Only the general area is shown. The exact workplace address and arrival instructions must be confirmed with the facility.</p><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.location)}`} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-[#368B62]">Explore this area ↗</a></div>
                        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
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
          <LocumDialog onClose={closeApply} closeLabel="Close shift application" title={applyStep === 4 ? "Your application preview" : "Make your next shift count."} description="A clear application, from availability to professional details." headline={"Your next shift.\nYour next chapter."} steps={['Availability & travel', 'Professional details', 'Application preview']} currentStep={applyStep - 2}>
              {/* Shift summary strip */}
              {applyStep < 4 && (
                <div className="mx-7 mt-5 mb-1 bg-[#368B62]/5 border border-black/5 rounded-xl px-4 py-3 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-slate-500">{applyShift.facility}</p>
                    <p className="font-bold text-[#368B62] text-sm">{searchProfession || 'Locum Pharmacist'} · {applyShift.date}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-slate-500">{applyShift.time}</p>
                    <p className="font-bold text-[#368B62] text-sm">{applyShift.rate}</p>
                  </div>
                </div>
              )}

              <div className="px-7 pb-7 pt-4">

                {/* ── STEP 2: Availability & Travel ── */}
                {applyStep === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }} className="space-y-5">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Availability & travel</h2>
                      <p className="text-sm text-slate-500 mt-1">Confirm you can make this shift and let us know how you'll get there.</p>
                    </div>
                    {/* Availability confirmation */}
                    <div className="bg-[#368B62]/5 border border-black/5 rounded-xl p-4 space-y-3">
                      <p className="text-sm font-semibold text-slate-800">Shift you're applying for</p>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-slate-700">
                          <Calendar className="w-4 h-4 text-[#368B62] shrink-0" />
                          <span>{applyShift.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-700">
                          <Clock className="w-4 h-4 text-[#368B62] shrink-0" />
                          <span>{applyShift.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-700">
                          <MapPin className="w-4 h-4 text-[#368B62] shrink-0" />
                          <span>{applyShift.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-700">
                          <Wallet className="w-4 h-4 text-[#368B62] shrink-0" />
                          <span className="font-bold text-[#368B62]">{applyShift.rate}</span>
                        </div>
                      </div>
                      <label className="flex items-start gap-3 cursor-pointer pt-1">
                        <input type="checkbox" checked={applyForm.availabilityConfirmed} onChange={e => setApplyForm(f => ({...f, availabilityConfirmed: e.target.checked}))} className="w-4 h-4 mt-0.5 accent-[#368B62] shrink-0" />
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
                            className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${applyForm.transport === t.label ? 'border-black/5 bg-[#368B62]/5 text-[#368B62]' : 'border-black/5 bg-slate-50 text-slate-700 hover:border-black/5'}`}
                          >
                            <span className="text-lg">{t.icon}</span> {t.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-700">Estimated travel time to shift</label>
                      <div className="relative">
                        <select value={applyForm.travelTime} onChange={e => setApplyForm(f => ({...f, travelTime: e.target.value}))} className="appearance-none w-full px-3.5 py-2.5 rounded-xl border border-black/5 text-sm outline-none focus:border-[#368B62] transition-colors bg-slate-50 cursor-pointer">
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
                      <button onClick={closeApply} className="px-5 py-3 rounded-xl border border-black/5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
                      <button
                        onClick={() => setApplyStep(3)}
                        disabled={!applyForm.availabilityConfirmed || !applyForm.transport}
                        className="flex-1 py-3 bg-[#368B62] disabled:opacity-40 hover:bg-[#276647] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
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
                        className="px-3.5 py-3 rounded-xl border border-black/5 text-sm outline-none focus:border-[#368B62] transition-colors bg-slate-50 resize-none"
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
                        className="px-3.5 py-3 rounded-xl border border-black/5 text-sm outline-none focus:border-[#368B62] transition-colors bg-slate-50 resize-none"
                      />
                    </div>
                    {/* Summary */}
                    <div className="bg-slate-50 border border-black/5 rounded-xl p-4 space-y-3">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Application summary</p>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                        <div><span className="text-slate-400">Shift</span><p className="font-semibold text-slate-900 mt-0.5">{applyShift.facility}</p></div>
                        <div><span className="text-slate-400">Date &amp; time</span><p className="font-semibold text-slate-900 mt-0.5">{applyShift.date} · {applyShift.time}</p></div>
                        <div><span className="text-slate-400">Rate</span><p className="font-semibold text-slate-900 mt-0.5">{applyShift.rate}</p></div>
                        <div><span className="text-slate-400">Location</span><p className="font-semibold text-slate-900 mt-0.5">{applyShift.location}</p></div>
                        <div><span className="text-slate-400">Transport</span><p className="font-semibold text-slate-900 mt-0.5">{applyForm.transport || '—'}</p></div>
                        <div><span className="text-slate-400">Travel time</span><p className="font-semibold text-slate-900 mt-0.5">{applyForm.travelTime || '—'}</p></div>
                      </div>
                      <div className="mt-2 pt-2 border-t border-black/5 flex items-center gap-2 text-xs text-slate-500">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#368B62] shrink-0" />
                        Your profile, registration &amp; compliance documents will be shared with the facility automatically.
                      </div>
                    </div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" checked={applyForm.termsAccepted} onChange={e => setApplyForm(f => ({...f, termsAccepted: e.target.checked}))} className="w-4 h-4 mt-0.5 accent-[#368B62] shrink-0" />
                      <span className="text-sm text-slate-600">I agree to MployUs Locums' <Link to="/policies/terms" target="_blank" className="text-[#368B62] font-semibold underline cursor-pointer">Terms & Conditions</Link> and confirm the information provided is accurate.</span>
                    </label>
                    <div className="flex gap-3 pt-1">
                      <button onClick={() => setApplyStep(2)} className="px-5 py-3 rounded-xl border border-black/5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">← Back</button>
                      <motion.button
                        onClick={() => setApplyStep(4)}
                        disabled={!applyForm.termsAccepted}
                        className="flex-1 py-3 bg-[#368B62] disabled:opacity-40 hover:bg-[#276647] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
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
                      className="w-24 h-24 rounded-full bg-[#368B62] flex items-center justify-center"
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
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="w-full bg-slate-50 border border-black/5 rounded-xl p-5 text-left space-y-3">
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
                        className="flex-1 py-3 bg-[#368B62] hover:bg-[#276647] text-white font-bold rounded-xl transition-colors"
                      >
                        Back to shifts
                      </button>
                      <button
                        onClick={() => { closeApply(); goto('find-shifts'); }}
                        className="flex-1 py-3 border border-black/5 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors"
                      >
                        Browse more shifts
                      </button>
                    </motion.div>
                  </motion.div>
                )}

              </div>
          </LocumDialog>
        )}
        </>
      )}

      {/* ══════════════════════════════════════
          EMPLOYERS PAGE
      ══════════════════════════════════════ */}
      {page === 'post-shift' && (
        <>
        <LocumEmployerLanding country={loc.country} onRequest={(type, urgent = false) => { openPostModal(type); setPostForm(form => ({ ...form, urgent })); }} onRegister={() => { openAuth('signup'); setRole('Client'); }} onLogin={() => openAuth('signin')} onTalk={() => onBookDemo('Locum employer staffing')} />

        {/* ══ POST FLOW MODAL ══ */}
        {postModalOpen && (
          <LocumDialog onClose={closePostModal} closeLabel="Close posting preview" title={postSuccess ? "A clearer staffing brief." : postType === 'Locum Shift' ? "Build your locum brief." : "Find your next colleague."} description={postType === 'Locum Shift' ? "The practical details behind a well-covered shift." : "Give the right candidate a complete picture of the role."} headline={"Good people.\nBetter-covered teams."} steps={postType === 'Locum Shift' ? ['Cover & urgency', 'Shift details', 'Your facility', 'Review your brief'] : ['Role & contract', 'Role details', 'Your facility', 'Review your brief']} currentStep={postSuccess ? 4 : postStep - 1}>
              <div className="px-7 pb-7 pt-5">
                <p className="mb-5 rounded-xl bg-[#edf4ef] p-3 text-xs leading-5 text-[#53685b]">Guided posting preview. No vacancy is published and no notifications are sent. Use your facility account to manage live postings.</p>

                {/* ── SUCCESS SCREEN ── */}
                {postSuccess && (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }} className="py-6 flex flex-col items-center text-center gap-5">
                    <motion.div className="w-20 h-20 rounded-full bg-[#368B62] flex items-center justify-center"
                      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 350, damping: 18, delay: 0.1 }}>
                      <Check className="w-9 h-9 text-white" />
                    </motion.div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-1">
                        {postType === 'Locum Shift' ? 'Your shift draft is ready' : 'Your role draft is ready'}
                      </h2>
                      <p className="text-slate-500 text-sm max-w-sm mx-auto">
                        {postType === 'Locum Shift'
                          ? `You have prepared a brief for ${postForm.profession || 'healthcare professionals'} near ${postForm.town || loc.defaultCity}. This preview has not published or submitted it.`
                          : `You have prepared a brief for ${postForm.jobTitle || 'your role'} in ${loc.country}. This preview has not published or submitted it.`}
                      </p>
                    </div>
                    <div className="w-full bg-slate-50 border border-black/5 rounded-xl p-5 text-left space-y-2">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">What happens next</p>
                      {[
                        { icon: '🏥', title: 'Set up your facility account', desc: 'Register your facility or sign in to access the intended employer workspace.' },
                        { icon: '📋', title: 'Check your brief', desc: 'Confirm the profession, location, dates, rate and all practical requirements.' },
                        { icon: '🔍', title: 'Review applications', desc: 'For a live posting, review relevant experience and role-appropriate compliance information.' },
                        { icon: '🤝', title: 'Agree the arrangement', desc: 'Confirm the complete brief, pay and booking terms in writing before work starts.' },
                      ].map((step, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.08 }}
                          className="flex items-start gap-3 py-2.5 border-b border-black/5 last:border-0">
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
                        className="flex-1 py-3 border border-black/5 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors">
                        Back to Employers
                      </button>
                      <button onClick={() => openPostModal(postType)}
                        className="flex-1 py-3 bg-[#368B62] hover:bg-[#276647] text-white text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
                        Create another draft <PlusCircle className="w-4 h-4" />
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
                              className={`p-5 rounded-xl border text-left transition-all ${postType === t ? (t === 'Locum Shift' ? 'border-black/5 bg-green-50' : 'border-black/5 bg-[#edf4ef]') : 'border-black/5 bg-white hover:border-black/5'}`}>
                              {t === 'Locum Shift'
                                ? <Clock className={`w-5 h-5 mb-2 ${postType === t ? 'text-[#368B62]' : 'text-slate-400'}`} />
                                : <Briefcase className={`w-5 h-5 mb-2 ${postType === t ? 'text-[#368B62]' : 'text-slate-400'}`} />}
                              <div className={`font-bold text-sm ${postType === t ? (t === 'Locum Shift' ? 'text-green-700' : 'text-[#368B62]') : 'text-slate-700'}`}>{t}</div>
                              <p className="text-[11px] text-slate-500 mt-0.5">{t === 'Locum Shift' ? 'Temporary cover — one or more days' : 'Full-time or part-time permanent role'}</p>
                            </button>
                          ))}
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-xl border border-black/5 bg-slate-50">
                          <div>
                            <p className="text-sm font-bold text-slate-900">Mark as urgent</p>
                            <p className="text-xs text-slate-500 mt-0.5">Flag this draft for last-minute cover. No alerts are sent in this preview.</p>
                          </div>
                          <button onClick={() => setPostForm(f => ({ ...f, urgent: !f.urgent }))}
                            role="switch" aria-checked={postForm.urgent} aria-label="Mark request as urgent"
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0 ${postForm.urgent ? 'bg-[#368B62]' : 'bg-slate-200'}`}>
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${postForm.urgent ? 'translate-x-6' : 'translate-x-1'}`} />
                          </button>
                        </div>
                        <button onClick={() => setPostStep(2)}
                          className="w-full py-3 bg-[#368B62] hover:bg-[#276647] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
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
                                className="appearance-none w-full px-3.5 py-2.5 rounded-xl border border-black/5 text-sm outline-none focus:border-[#368B62] transition-colors bg-slate-50 cursor-pointer">
                                <option value="">Select profession…</option>
                                {['Locum Pharmacist', 'Pharmacy Technician', 'Locum GP', 'Agency Nurse', 'Healthcare Assistant', 'Locum Optician', 'Allied Health Worker'].map(p => <option key={p}>{p}</option>)}
                              </select>
                              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">Shift date <span className="text-rose-500">*</span></label>
                            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-black/5 bg-slate-50 focus-within:border-[#368B62] transition-colors">
                              <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                              <input type="date" value={postForm.date} onChange={e => setPostForm(f => ({ ...f, date: e.target.value }))}
                                className="bg-transparent text-sm text-slate-700 outline-none w-full" />
                            </div>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">Hourly rate ({loc.currency}) <span className="text-rose-500">*</span></label>
                            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-black/5 bg-slate-50 focus-within:border-[#368B62] transition-colors">
                              <Wallet className="w-4 h-4 text-slate-400 shrink-0" />
                              <input value={postForm.rate} onChange={e => setPostForm(f => ({ ...f, rate: e.target.value }))}
                                placeholder={`e.g. ${loc.currency}32`}
                                className="bg-transparent text-sm outline-none w-full" />
                            </div>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">Start time</label>
                            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-black/5 bg-slate-50 focus-within:border-[#368B62] transition-colors">
                              <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                              <input type="time" value={postForm.startTime} onChange={e => setPostForm(f => ({ ...f, startTime: e.target.value }))}
                                className="bg-transparent text-sm text-slate-700 outline-none w-full" />
                            </div>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">End time</label>
                            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-black/5 bg-slate-50 focus-within:border-[#368B62] transition-colors">
                              <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                              <input type="time" value={postForm.endTime} onChange={e => setPostForm(f => ({ ...f, endTime: e.target.value }))}
                                className="bg-transparent text-sm text-slate-700 outline-none w-full" />
                            </div>
                          </div>
                          <div className="col-span-2 flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">Location / town <span className="text-rose-500">*</span></label>
                            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-black/5 bg-slate-50 focus-within:border-[#368B62] transition-colors">
                              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                              <input value={postForm.town} onChange={e => setPostForm(f => ({ ...f, town: e.target.value }))}
                                placeholder={`e.g. ${loc.defaultCity}`}
                                className="bg-transparent text-sm outline-none w-full" />
                            </div>
                          </div>
                          <div className="col-span-2 flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">Additional requirements <span className="text-slate-400 font-normal">(optional)</span></label>
                            <textarea value={postForm.description} onChange={e => setPostForm(f => ({ ...f, description: e.target.value }))}
                              placeholder="Any specific skills, software experience, or clinical requirements…"
                              rows={3} className="px-3.5 py-2.5 rounded-xl border border-black/5 text-sm outline-none resize-none focus:border-[#368B62] transition-colors bg-slate-50" />
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <button onClick={() => setPostStep(1)} className="px-5 py-3 border border-black/5 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1.5">
                            <ChevronDown className="w-4 h-4 rotate-90" /> Back
                          </button>
                          <button onClick={() => setPostStep(3)} disabled={!postForm.profession || !postForm.date || !postForm.rate || !postForm.town}
                            className="flex-1 py-3 bg-[#368B62] disabled:opacity-40 hover:bg-[#276647] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
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
                            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-black/5 bg-slate-50 focus-within:border-[#368B62] transition-colors">
                              <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                              <input value={postForm.facility} onChange={e => setPostForm(f => ({ ...f, facility: e.target.value }))}
                                placeholder="e.g. Boots Pharmacy — Grafton Street"
                                className="bg-transparent text-sm outline-none w-full" />
                            </div>
                          </div>
                          <div className="col-span-2 flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">Facility address <span className="text-slate-400 font-normal">(optional)</span></label>
                            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-black/5 bg-slate-50 focus-within:border-[#368B62] transition-colors">
                              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                              <input value={postForm.facilityAddress} onChange={e => setPostForm(f => ({ ...f, facilityAddress: e.target.value }))}
                                placeholder="Street address"
                                className="bg-transparent text-sm outline-none w-full" />
                            </div>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">Contact name <span className="text-rose-500">*</span></label>
                            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-black/5 bg-slate-50 focus-within:border-[#368B62] transition-colors">
                              <Users className="w-4 h-4 text-slate-400 shrink-0" />
                              <input value={postForm.contact} onChange={e => setPostForm(f => ({ ...f, contact: e.target.value }))}
                                placeholder="Your name"
                                className="bg-transparent text-sm outline-none w-full" />
                            </div>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">Phone number <span className="text-rose-500">*</span></label>
                            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-black/5 bg-slate-50 focus-within:border-[#368B62] transition-colors">
                              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                              <input value={postForm.phone} onChange={e => setPostForm(f => ({ ...f, phone: e.target.value }))}
                                placeholder="+353 / +44"
                                className="bg-transparent text-sm outline-none w-full" />
                            </div>
                          </div>
                          <div className="col-span-2 flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">Email address <span className="text-rose-500">*</span></label>
                            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-black/5 bg-slate-50 focus-within:border-[#368B62] transition-colors">
                              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                              <input type="email" value={postForm.email} onChange={e => setPostForm(f => ({ ...f, email: e.target.value }))}
                                placeholder="manager@facility.ie"
                                className="bg-transparent text-sm outline-none w-full" />
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <button onClick={() => setPostStep(2)} className="px-5 py-3 border border-black/5 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1.5">
                            <ChevronDown className="w-4 h-4 rotate-90" /> Back
                          </button>
                          <button onClick={() => setPostStep(4)} disabled={!postForm.facility || !postForm.contact || !postForm.phone || !postForm.email}
                            className="flex-1 py-3 bg-[#368B62] disabled:opacity-40 hover:bg-[#276647] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
                            Review your draft <ChevronRight className="w-4 h-4" />
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
                        <div className="bg-green-50 border border-black/5 rounded-xl px-4 py-3 flex items-center justify-between gap-4">
                          <div>
                            <p className="text-xs text-slate-500">{postForm.facility}</p>
                            <p className="font-bold text-[#368B62] text-sm">{postForm.profession} · {postForm.date || 'Date TBC'}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-xs text-slate-500">{postForm.startTime} – {postForm.endTime}</p>
                            <p className="font-bold text-[#368B62] text-sm">{postForm.rate ? `${loc.currency}${postForm.rate}/hr` : '—'}</p>
                          </div>
                        </div>
                        <div className="bg-slate-50 border border-black/5 rounded-xl divide-y divide-slate-100">
                          {[
                            { label: 'Profession', val: postForm.profession || '—' },
                            { label: 'Location', val: postForm.town || '—' },
                            { label: 'Urgent', val: postForm.urgent ? 'Yes — urgent cover requested' : 'No' },
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
                          <input type="checkbox" checked={postForm.termsAccepted} onChange={e => setPostForm(f => ({ ...f, termsAccepted: e.target.checked }))} className="mt-0.5 accent-[#368B62]" />
                          <span className="text-xs text-slate-500 leading-relaxed">
                            I confirm this shift is genuine and I agree to MployUs{" "}
                            <Link to="/policies/terms" target="_blank" className="text-[#368B62] font-semibold underline">Terms of Service</Link> and{" "}
                            <Link to="/policies/privacy" target="_blank" className="text-[#368B62] font-semibold underline">Privacy Policy</Link>.
                          </span>
                        </label>
                        <div className="flex gap-3">
                          <button onClick={() => setPostStep(3)} className="px-5 py-3 border border-black/5 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1.5">
                            <ChevronDown className="w-4 h-4 rotate-90" /> Back
                          </button>
                          <button onClick={() => { if (postForm.termsAccepted) setPostSuccess(true); }}
                            disabled={!postForm.termsAccepted}
                            className="flex-1 py-3 bg-[#368B62] disabled:opacity-40 hover:bg-[#276647] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
                            Finish shift draft <PlusCircle className="w-4 h-4" />
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
                              className={`p-5 rounded-xl border text-left transition-all ${postType === t ? (t === 'Locum Shift' ? 'border-black/5 bg-green-50' : 'border-black/5 bg-[#edf4ef]') : 'border-black/5 bg-white hover:border-black/5'}`}>
                              {t === 'Locum Shift'
                                ? <Clock className={`w-5 h-5 mb-2 ${postType === t ? 'text-[#368B62]' : 'text-slate-400'}`} />
                                : <Briefcase className={`w-5 h-5 mb-2 ${postType === t ? 'text-[#368B62]' : 'text-slate-400'}`} />}
                              <div className={`font-bold text-sm ${postType === t ? (t === 'Locum Shift' ? 'text-green-700' : 'text-[#368B62]') : 'text-slate-700'}`}>{t}</div>
                              <p className="text-[11px] text-slate-500 mt-0.5">{t === 'Locum Shift' ? 'Temporary cover — one or more days' : 'Full-time or part-time permanent role'}</p>
                            </button>
                          ))}
                        </div>
                        <div className="space-y-3">
                          <label className="text-xs font-semibold text-slate-700">Contract type</label>
                          <div className="grid grid-cols-3 gap-2">
                            {['Full-time', 'Part-time', 'Contract'].map(ct => (
                              <button key={ct} onClick={() => setPostForm(f => ({ ...f, contractType: ct }))}
                                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${postForm.contractType === ct ? 'border-black/5 bg-[#edf4ef] text-[#368B62]' : 'border-black/5 text-slate-500 hover:border-black/5'}`}>
                                {ct}
                              </button>
                            ))}
                          </div>
                        </div>
                        <button onClick={() => setPostStep(2)}
                          className="w-full py-3 bg-[#368B62] hover:bg-[#286d4c] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
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
                            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-black/5 bg-slate-50 focus-within:border-black/5 transition-colors">
                              <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
                              <input value={postForm.jobTitle} onChange={e => setPostForm(f => ({ ...f, jobTitle: e.target.value }))}
                                placeholder="e.g. Superintendent Pharmacist"
                                className="bg-transparent text-sm outline-none w-full" />
                            </div>
                          </div>
                          <div className="col-span-2 flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">Profession / discipline <span className="text-rose-500">*</span></label>
                            <div className="relative">
                              <select value={postForm.profession} onChange={e => setPostForm(f => ({ ...f, profession: e.target.value }))}
                                className="appearance-none w-full px-3.5 py-2.5 rounded-xl border border-black/5 text-sm outline-none focus:border-black/5 transition-colors bg-slate-50 cursor-pointer">
                                <option value="">Select profession…</option>
                                {['Pharmacist', 'Pharmacy Technician', 'GP / Doctor', 'Nurse', 'Healthcare Assistant', 'Optician', 'Allied Health Worker'].map(p => <option key={p}>{p}</option>)}
                              </select>
                              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">Salary min ({loc.currency})</label>
                            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-black/5 bg-slate-50 focus-within:border-black/5 transition-colors">
                              <Wallet className="w-4 h-4 text-slate-400 shrink-0" />
                              <input value={postForm.salaryMin} onChange={e => setPostForm(f => ({ ...f, salaryMin: e.target.value }))}
                                placeholder={`e.g. ${loc.currency}45,000`}
                                className="bg-transparent text-sm outline-none w-full" />
                            </div>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">Salary max ({loc.currency})</label>
                            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-black/5 bg-slate-50 focus-within:border-black/5 transition-colors">
                              <Wallet className="w-4 h-4 text-slate-400 shrink-0" />
                              <input value={postForm.salaryMax} onChange={e => setPostForm(f => ({ ...f, salaryMax: e.target.value }))}
                                placeholder={`e.g. ${loc.currency}60,000`}
                                className="bg-transparent text-sm outline-none w-full" />
                            </div>
                          </div>
                          <div className="col-span-2 flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">Location <span className="text-rose-500">*</span></label>
                            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-black/5 bg-slate-50 focus-within:border-black/5 transition-colors">
                              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                              <input value={postForm.town} onChange={e => setPostForm(f => ({ ...f, town: e.target.value }))}
                                placeholder={`e.g. ${loc.defaultCity}`}
                                className="bg-transparent text-sm outline-none w-full" />
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <button onClick={() => setPostStep(1)} className="px-5 py-3 border border-black/5 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1.5">
                            <ChevronDown className="w-4 h-4 rotate-90" /> Back
                          </button>
                          <button onClick={() => setPostStep(3)} disabled={!postForm.jobTitle || !postForm.profession || !postForm.town}
                            className="flex-1 py-3 bg-[#368B62] disabled:opacity-40 hover:bg-[#286d4c] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
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
                            rows={4} className="px-3.5 py-2.5 rounded-xl border border-black/5 text-sm outline-none resize-none focus:border-black/5 transition-colors bg-slate-50" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-700">Key requirements <span className="text-slate-400 font-normal">(optional)</span></label>
                          <textarea value={postForm.requirements} onChange={e => setPostForm(f => ({ ...f, requirements: e.target.value }))}
                            placeholder="e.g. GPhC registration, 2+ years community pharmacy, full driving licence…"
                            rows={3} className="px-3.5 py-2.5 rounded-xl border border-black/5 text-sm outline-none resize-none focus:border-black/5 transition-colors bg-slate-50" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-700">Benefits <span className="text-slate-400 font-normal">(optional)</span></label>
                          <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-black/5 bg-slate-50 focus-within:border-black/5 transition-colors">
                            <Star className="w-4 h-4 text-slate-400 shrink-0" />
                            <input value={postForm.benefits} onChange={e => setPostForm(f => ({ ...f, benefits: e.target.value }))}
                              placeholder="e.g. CPD allowance, pension, 25 days holiday, free parking…"
                              className="bg-transparent text-sm outline-none w-full" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="col-span-2 flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">Facility name <span className="text-rose-500">*</span></label>
                            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-black/5 bg-slate-50 focus-within:border-black/5 transition-colors">
                              <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                              <input value={postForm.facility} onChange={e => setPostForm(f => ({ ...f, facility: e.target.value }))}
                                placeholder="e.g. Allcare Pharmacy Group"
                                className="bg-transparent text-sm outline-none w-full" />
                            </div>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">Contact name <span className="text-rose-500">*</span></label>
                            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-black/5 bg-slate-50 focus-within:border-black/5 transition-colors">
                              <Users className="w-4 h-4 text-slate-400 shrink-0" />
                              <input value={postForm.contact} onChange={e => setPostForm(f => ({ ...f, contact: e.target.value }))}
                                placeholder="HR / Manager"
                                className="bg-transparent text-sm outline-none w-full" />
                            </div>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">Phone number <span className="text-rose-500">*</span></label>
                            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-black/5 bg-slate-50 focus-within:border-black/5 transition-colors">
                              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                              <input value={postForm.phone} onChange={e => setPostForm(f => ({ ...f, phone: e.target.value }))}
                                placeholder="+353 / +44"
                                className="bg-transparent text-sm outline-none w-full" />
                            </div>
                          </div>
                          <div className="col-span-2 flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">Email address <span className="text-rose-500">*</span></label>
                            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-black/5 bg-slate-50 focus-within:border-black/5 transition-colors">
                              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                              <input type="email" value={postForm.email} onChange={e => setPostForm(f => ({ ...f, email: e.target.value }))}
                                placeholder="hr@facility.ie"
                                className="bg-transparent text-sm outline-none w-full" />
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <button onClick={() => setPostStep(2)} className="px-5 py-3 border border-black/5 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1.5">
                            <ChevronDown className="w-4 h-4 rotate-90" /> Back
                          </button>
                          <button onClick={() => setPostStep(4)} disabled={!postForm.description || !postForm.facility || !postForm.contact || !postForm.phone || !postForm.email}
                            className="flex-1 py-3 bg-[#368B62] disabled:opacity-40 hover:bg-[#286d4c] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
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
                        <div className="bg-[#edf4ef] border border-black/5 rounded-xl px-4 py-3 flex items-center justify-between gap-4">
                          <div>
                            <p className="text-xs text-slate-500">{postForm.facility}</p>
                            <p className="font-bold text-[#368B62] text-sm">{postForm.jobTitle} · {postForm.contractType}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-xs text-slate-500">{postForm.town}</p>
                            <p className="font-bold text-[#368B62] text-sm">
                              {postForm.salaryMin && postForm.salaryMax ? `${loc.currency}${postForm.salaryMin} – ${loc.currency}${postForm.salaryMax}` : 'Salary negotiable'}
                            </p>
                          </div>
                        </div>
                        <div className="bg-slate-50 border border-black/5 rounded-xl divide-y divide-slate-100">
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
                          <div className="bg-slate-50 border border-black/5 rounded-xl p-4">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Role description</p>
                            <p className="text-xs text-slate-700 leading-relaxed line-clamp-4">{postForm.description}</p>
                          </div>
                        )}
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input type="checkbox" checked={postForm.termsAccepted} onChange={e => setPostForm(f => ({ ...f, termsAccepted: e.target.checked }))} className="mt-0.5 accent-[#368B62]" />
                          <span className="text-xs text-slate-500 leading-relaxed">
                            I confirm this role is genuine and I agree to MployUs{" "}
                            <Link to="/policies/terms" target="_blank" className="text-[#368B62] font-semibold underline">Terms of Service</Link> and{" "}
                            <Link to="/policies/privacy" target="_blank" className="text-[#368B62] font-semibold underline">Privacy Policy</Link>.
                          </span>
                        </label>
                        <div className="flex gap-3">
                          <button onClick={() => setPostStep(3)} className="px-5 py-3 border border-black/5 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1.5">
                            <ChevronDown className="w-4 h-4 rotate-90" /> Back
                          </button>
                          <button onClick={() => { if (postForm.termsAccepted) setPostSuccess(true); }}
                            disabled={!postForm.termsAccepted}
                            className="flex-1 py-3 bg-[#368B62] disabled:opacity-40 hover:bg-[#286d4c] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
                            Finish role draft <PlusCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </>
                )}

              </div>
          </LocumDialog>
        )}
        </>
      )}

      {/* ══════════════════════════════════════
          BLOG
      ══════════════════════════════════════ */}
      {page === 'blog' && (
        <>

        {/* ── Article reader ── */}
        {blogPost !== null && (() => {
          const a = articles[blogPost];
          const related = countryArticles.filter(article => article !== a && (blogCategory === 'All' || article.tag === a.tag)).slice(0, 3);
          return (
            <motion.div className="pt-[70px] min-h-screen bg-white"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>

              {/* Sticky breadcrumb bar */}
              <div className="sticky top-[70px] z-20 bg-white border-b border-black/5">
                <div className="max-w-[1280px] mx-auto px-6 py-3.5 flex items-center justify-between">
                  <button onClick={() => setBlogPost(null)} className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
                    <ChevronDown className="w-4 h-4 rotate-90" />
                    <span className="hidden sm:inline text-slate-400">Insights</span>
                    <span className="hidden sm:inline text-slate-300">/</span>
                    <span className="text-slate-900 truncate max-w-[260px] sm:max-w-[500px]">{a.title}</span>
                  </button>
                  <span className={`hidden sm:inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold border ${a.tagColor}`}>{a.tag}</span>
                </div>
              </div>

              {/* Article hero */}
              <div className="bg-[#edf2e9] px-6 pt-14 pb-16">
                <div className="max-w-[860px] mx-auto">
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold border ${a.tagColor}`}>{a.tag}</span>
                    <span className="text-slate-400 text-xs font-medium">{a.date}</span>
                    <span className="text-slate-600 text-xs">·</span>
                    <span className="text-slate-400 text-xs font-medium">{a.read} read</span>
                  </div>
                  <h1 className="font-['Libre_Caslon_Display'] text-4xl sm:text-6xl font-normal text-[#20382c] leading-[1.1] mb-5">{a.title}</h1>
                  <p className="text-[#53685b] text-base leading-relaxed max-w-2xl">{a.subtitle}</p>
                  <img src={a.img} alt="" className="mt-9 aspect-[16/7] w-full rounded-2xl object-cover" />
                </div>
              </div>

              {/* Article body + sidebar */}
              <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-14 grid grid-cols-1 lg:grid-cols-3 gap-14">

                {/* Body */}
                <article className="lg:col-span-2 space-y-8">
                  {a.callout && (
                    <div className="bg-green-50 border-l-4 border-black/5 rounded-r-xl px-5 py-4">
                      <p className="text-sm text-[#368B62] font-medium leading-relaxed">{a.callout}</p>
                    </div>
                  )}
                  {a.body.map((section, si) => (
                    <motion.div key={si} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: si * 0.06 }}>
                      <h2 className="text-xl font-bold text-slate-900 mb-3">{section.h}</h2>
                      <p className="text-[15px] text-slate-600 leading-[1.8]">{section.p}</p>
                    </motion.div>
                  ))}

                  {/* Bottom CTA */}
                  <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}
                    className="mt-10 bg-slate-900 rounded-2xl p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                    <div>
                      <p className="text-xs font-bold text-green-400 uppercase tracking-widest mb-1">MployUs Locums</p>
                      <p className="text-white font-bold text-lg leading-snug">Ready to find your next shift?</p>
                      <p className="text-slate-400 text-xs mt-1">Free to join · No agency fees · Verified employers</p>
                    </div>
                    <button onClick={() => openAuth('signup')}
                      className="shrink-0 px-6 py-3 bg-[#368B62] hover:bg-[#276647] text-white font-bold text-sm rounded-xl transition-colors flex items-center gap-2">
                      Create free account <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>

                  {/* Related articles */}
                  {related.length > 0 && (
                    <div className="pt-4">
                      <h3 className="text-lg font-bold text-slate-900 mb-5">More from Insights</h3>
                      <div className="space-y-3">
                        {related.map((r, ri) => (
                          <motion.button key={ri} onClick={() => { setBlogPost(articles.indexOf(r)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            className="w-full flex items-start gap-4 p-4 bg-slate-50 hover:bg-white border border-black/5 rounded-2xl text-left transition-all group"
                            whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 400, damping: 22 }}>
                            <div>
                              <div className="flex items-center gap-2 mb-1.5">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${r.tagColor}`}>{r.tag}</span>
                                <span className="text-[10px] text-slate-400 font-medium">{r.read} read</span>
                              </div>
                              <p className="text-sm font-bold text-slate-900 group-hover:text-[#368B62] transition-colors leading-snug">{r.title}</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#368B62] transition-colors shrink-0 mt-0.5 ml-auto" />
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                </article>

                {/* Sidebar */}
                <aside className="hidden lg:block space-y-5">
                  <div className="sticky top-32 space-y-5">
                    <div className="bg-white border border-black/5 rounded-2xl p-5">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">In this article</p>
                      <nav className="space-y-2">
                        {a.body.map((s, si) => (
                          <p key={si} className="text-xs text-slate-600 font-medium leading-snug hover:text-[#368B62] transition-colors cursor-pointer py-1 border-l-2 border-transparent hover:border-black/5 pl-3">{s.h}</p>
                        ))}
                      </nav>
                    </div>
                    <div className="bg-[#368B62] rounded-2xl p-5 space-y-3">
                      <p className="text-white font-bold text-sm leading-snug">Find locum shifts near you</p>
                      <p className="text-white/70 text-xs leading-relaxed">Verified employers. Transparent rates. Zero agency cut.</p>
                      <button onClick={() => { setBlogPost(null); goto('find-shifts'); }}
                        className="w-full py-2.5 bg-white text-[#368B62] font-bold text-xs rounded-xl flex items-center justify-center gap-1.5">
                        Browse shifts <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="bg-white border border-black/5 rounded-2xl p-5">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">More articles</p>
                      <div className="space-y-3">
                        {countryArticles.filter(article => article !== a).slice(0, 4).map((r, ri) => (
                          <button key={ri} onClick={() => { setBlogPost(articles.indexOf(r)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            className="w-full text-left group">
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${r.tagColor}`}>{r.tag}</span>
                            <p className="text-xs font-semibold text-slate-800 mt-1 leading-snug group-hover:text-[#368B62] transition-colors">{r.title}</p>
                            <p className="text-[10px] text-slate-400 mt-0.5">{r.read} read · {r.date}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </motion.div>
          );
        })()}

        {/* ── Blog index ── */}
        {blogPost === null && (
          <LocumInsights
            articles={visibleArticles}
            audience={blogAudience}
            category={blogCategory}
            onAudience={setBlogAudience}
            onCategory={setBlogCategory}
            onRead={article => { setBlogPost(articles.findIndex(item => item.title === article.title)); window.scrollTo({ top: 0, behavior: 'instant' }); }}
            onFindShifts={() => goto('find-shifts')}
          />
        )}
        </>
      )}

      {/* ══════════════════════════════════════
          FAQ PAGE
      ══════════════════════════════════════ */}
      {page === 'faq' && (
        <div className="pt-[70px] min-h-screen bg-slate-50">

          {/* Hero */}
          <section className="bg-slate-900 px-6 pt-16 pb-20 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.04]" />
            <div className="max-w-[1280px] mx-auto lg:px-6 relative">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-black/5 text-white/80 text-xs font-semibold uppercase tracking-widest mb-5 backdrop-blur-sm">
                <Search className="w-3.5 h-3.5 text-green-400" /> Help Centre
              </div>
              <h1 className="text-5xl font-bold text-white tracking-[-0.02em] leading-[1.05] mb-3">Frequently asked<br />questions</h1>
              <p className="text-white/60 text-base max-w-lg leading-relaxed mb-8">Everything you need to know about working with MployUs Locums — for locums and employers alike.</p>
              {/* Tab switcher in hero */}
              <div className="flex items-center gap-2">
                {(['Locum', 'Employers'] as const).map(tab => (
                  <button key={tab} onClick={() => { setFaqTab(tab); setOpenFaq(null); }}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${faqTab === tab ? 'bg-white text-slate-900' : 'bg-white/10 text-white/70 border border-black/5 hover:bg-white/20'}`}>
                    {tab === 'Locum' ? 'For Locums' : 'For Employers'}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Main content */}
          <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-14 grid grid-cols-1 lg:grid-cols-3 gap-14">

            {/* FAQ accordion */}
            <div className="lg:col-span-2 space-y-3">
              {faqs[faqTab].map((f, i) => {
                const isOpen = openFaq === i;
                return (
                  <motion.div key={f.q}
                    initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.05 }}
                    className={`rounded-2xl border overflow-hidden transition-all duration-200 ${isOpen ? 'border-black/5' : 'bg-white border-black/5 hover:border-black/5'}`}>
                    <button onClick={() => setOpenFaq(isOpen ? null : i)}
                      className={`w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors ${isOpen ? 'bg-[#368B62]' : 'bg-white'}`}>
                      <span className={`text-sm font-semibold leading-snug ${isOpen ? 'text-white' : 'text-slate-900'}`}>{f.q}</span>
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-white/20' : 'bg-slate-50'}`}>
                        {isOpen
                          ? <Minus className="w-4 h-4 text-white" />
                          : <Plus className="w-4 h-4 text-slate-500" />}
                      </div>
                    </button>
                    {isOpen && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        className="bg-white px-6 pb-6 pt-4 text-[15px] text-slate-600 leading-relaxed border-t border-black/5">
                        {f.a}
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}

              {/* Still have questions */}
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.3 }}
                className="mt-4 bg-white border border-black/5 rounded-2xl p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#368B62]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-900 mb-0.5">Still have questions?</p>
                  <p className="text-xs text-slate-500 leading-relaxed mb-3">Our team typically responds within 2 hours on business days.</p>
                  <button onClick={() => onBookDemo('FAQ contact')} className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#368B62] hover:bg-[#276647] text-white text-xs font-bold rounded-lg transition-colors">
                    Contact support <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-5">
              {/* Quick links */}
              <div className="bg-white border border-black/5 rounded-2xl p-5">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Quick links</p>
                <div className="space-y-2">
                  {[
                    { label: 'Browse shifts', icon: Search, action: () => goto('find-shifts') },
                    { label: 'Employer dashboard', icon: PlusCircle, action: () => goto('post-shift') },
                    { label: 'Insights & guides', icon: BookOpen, action: () => goto('blog') },
                    { label: 'FAQ', icon: CheckCircle2, action: () => goto('faq') },
                  ].map(({ label, icon: Icon, action }) => (
                    <button key={label} onClick={action}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 hover:bg-green-50 hover:text-[#368B62] text-slate-700 text-sm font-semibold transition-all group">
                      <Icon className="w-4 h-4 text-slate-400 group-hover:text-[#368B62] transition-colors" />
                      {label}
                      <ArrowRight className="w-3.5 h-3.5 ml-auto text-slate-300 group-hover:text-[#368B62] transition-colors" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="bg-slate-900 rounded-2xl p-5 space-y-4">
                <p className="text-xs font-bold text-green-400 uppercase tracking-widest">Platform by the numbers</p>
                {[
                  { value: '2,400+', label: 'Registered locums' },
                  { value: '< 4 hrs', label: 'Avg urgent fill time' },
                  { value: '100%', label: 'Compliance verified' },
                  { value: '£0', label: "Agency fee to locums" },
                ].map(({ value, label }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-white/70 text-xs font-medium">{label}</span>
                    <span className="text-white font-bold text-sm">{value}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="bg-white border border-black/5 rounded-2xl p-5 space-y-3">
                <p className="text-sm font-bold text-slate-900">Ready to get started?</p>
                <p className="text-xs text-slate-500 leading-relaxed">Join thousands of pharmacists and employers already on MployUs.</p>
                <button onClick={() => openAuth('signup')} className="w-full py-2.5 bg-[#368B62] hover:bg-[#276647] text-white font-bold text-sm rounded-xl transition-colors">
                  Create free account
                </button>
                <button onClick={() => openAuth('signin')} className="w-full py-2.5 border border-black/5 text-slate-700 font-semibold text-sm rounded-xl hover:border-black/5 transition-colors">
                  Sign in
                </button>
              </div>
            </aside>

          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          FOOTER
      ══════════════════════════════════════ */}
<Footer
        brandSuffix="locums"
        description={<><p>Flexible shifts. More time for you.<br />Healthcare in Ireland &amp; the UK.</p><div className="mt-3 flex flex-wrap gap-3">{(Object.keys(REGIONS) as Region[]).map(country => <button key={country} onClick={() => applyRegion(country)} aria-pressed={region === country} className="text-xs text-[#62748e] transition-colors hover:text-[#368B62] aria-pressed:text-[#368B62]"><span>{REGIONS[country].flag}</span> {REGIONS[country].country}</button>)}</div></>}
        tagline="Your expertise. Your schedule. Connected."
        onNavigate={view => view === 'home' ? onBackToHome() : goto(view as LocumPage)}
        onBookDemo={() => onBookDemo('Locum Provision')}
        onStartTrial={() => openAuth('signup')}
        onCookiePreferences={() => { setCookieOpen(true); setCookiePrefsOpen(true); }}
        columns={[
          { title: 'Platform', links: navLinks.map(link => ({ label: link.label, onClick: () => goto(link.id) })) },
          { title: 'Explore', links: [{ label: 'Back to MployUs', onClick: onBackToHome }, { label: 'Talk to our team', onClick: () => onBookDemo('Locum Provision') }, { label: 'Privacy policy', href: '/policies/privacy' }, { label: 'Terms of service', href: '/policies/terms' }, { label: 'Cookie policy', href: '/policies/cookies' }] },
          { title: 'Your workspace', links: [{ label: 'Sign in', onClick: () => openAuth('signin'), arrow: true }, { label: 'Register your account', onClick: () => openAuth('signup'), arrow: true }] },
        ]}
      />

      {/* ══════════════════════════════════════
          AUTH MODAL
      ══════════════════════════════════════ */}
      <LoginExperience open={authModal === 'signin'} onClose={() => setAuthModal(null)} kind="locum" image={imgLocumProfessional} onRegister={() => openAuth('signup')} />
      {authModal === 'signup' && (
        <LocumDialog onClose={() => setAuthModal(null)} closeLabel="Close registration" title={signupStep === 'role' ? "A place for you. A place for your team." : signupStep === 'details' ? "Introduce your facility." : "One last step."} description="Choose how you’ll use MployUs, then make your next move." headline={"Care connects us.\nFind your place."} steps={['Choose your account', 'Your details', 'Verification']} currentStep={['role', 'details', 'verify'].indexOf(signupStep)}>
            <div className="p-6 space-y-5">
              {authModal === 'signup' && (
                <div className="space-y-5">
                  {signupStep === 'role' && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">Choose account type</h3>
                        <p className="text-sm text-slate-500 mt-0.5">Tell us how you'll use MployUs Locums.</p>
                      </div>
                      <div className="space-y-2.5">
                        {([
                          { key: 'Locum' as const, icon: Stethoscope, desc: 'A healthcare professional, support worker or trainee seeking role-appropriate opportunities', badge: 'Verification required' },
                          { key: 'Client' as const, icon: Building2, desc: 'A healthcare facility or pharmacy posting shifts', badge: 'Dashboard access' },
                        ]).map(r => {
                          const Icon = r.icon;
                          const active = role === r.key;
                          return (
                            <button key={r.key} onClick={() => setRole(r.key)} aria-pressed={active} className={`w-full p-6 rounded-2xl border text-left flex items-start gap-4 transition-all ${active ? 'border-black/5 bg-green-50' : 'border-black/5 bg-white hover:border-black/5'}`}>
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${active ? 'bg-[#368B62]' : 'bg-slate-100'}`}>
                                <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-slate-500'}`} />
                              </div>
                              <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="font-medium text-slate-900 text-base">Register as a {r.key === 'Client' ? 'Facility' : r.key}</span>
                                  <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full ${active ? 'bg-green-200 text-green-800' : 'bg-slate-100 text-slate-500'}`}>{r.badge}</span>
                                </div>
                                <p className="text-xs leading-6 text-slate-500 mt-2">{r.desc}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                      <button disabled={!role} onClick={() => { if (role === 'Locum') { setAuthModal(null); setRegWizardOpen(true); } else { setSignupStep('details'); } }} className="w-full py-3 bg-[#368B62] disabled:opacity-40 text-white text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-1.5">
                        Continue <ChevronRight className="w-4 h-4" />
                      </button>
                      <p className="text-center text-xs text-slate-500">Already have an account? <button onClick={() => setAuthModal('signin')} className="font-bold text-[#368B62] hover:underline">Sign in</button></p>
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
                          <select value={setupProfession.name} onChange={e => setSetupProfession(PROFESSIONS.find(p => p.name === e.target.value)!)} className="w-full appearance-none px-4 py-3 rounded-xl bg-slate-50 border border-black/5 text-sm font-semibold text-slate-800 outline-none cursor-pointer">
                            {PROFESSIONS.map(p => <option key={p.name}>{p.name}</option>)}
                          </select>
                          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      )}
                      {role === 'Locum' && (
                        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50 border border-amber-200">
                          <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <p className="text-xs text-amber-800 leading-relaxed"><span className="font-bold">Verification required.</span> After registration, you'll need to upload your registration certificate, Garda vetting / DBS, and indemnity insurance before applying for shifts.</p>
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-50 border border-black/5 focus-within:border-green-400 transition-colors">
                          <Users className="w-4 h-4 text-slate-400 shrink-0" />
                          <input placeholder={role === 'Client' ? 'Facility name' : 'Full name'} className="bg-transparent text-sm outline-none w-full" />
                        </div>
                        <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-50 border border-black/5 focus-within:border-green-400 transition-colors">
                          <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                          <input placeholder="Email" className="bg-transparent text-sm outline-none w-full" />
                        </div>
                      </div>
                      {role === 'Locum' && setupProfession.reg && (
                        <div className="p-4 rounded-xl bg-green-50 border border-black/5 space-y-2">
                          <label className="block text-xs font-bold text-green-900">{setupProfession.reg} <span className="text-rose-500">*</span></label>
                          <input placeholder={`Enter your ${setupProfession.reg}`} className="w-full px-3 py-2.5 rounded-lg bg-white border border-black/5 text-sm outline-none" />
                        </div>
                      )}
                      <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-50 border border-black/5 focus-within:border-green-400 transition-colors">
                        <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                        <input placeholder="Mobile number" className="bg-transparent text-sm outline-none w-full" />
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setSignupStep('role')} className="px-4 py-3 text-sm font-semibold text-slate-500 hover:text-slate-900">← Back</button>
                        <button onClick={() => setSignupStep('verify')} className="flex-1 py-3 bg-[#368B62] text-white text-sm font-bold rounded-xl flex items-center justify-center gap-1.5">
                          <UserPlus className="w-4 h-4" /> Create account
                        </button>
                      </div>
                    </div>
                  )}

                  {signupStep === 'verify' && (
                    <div className="flex flex-col items-center text-center space-y-5 py-2">
                      <div className="w-16 h-16 rounded-2xl bg-green-50 border border-black/5 flex items-center justify-center">
                        <Phone className="w-7 h-7 text-[#368B62]" />
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
                            className="w-11 h-13 text-center text-lg font-bold rounded-xl bg-slate-50 border border-black/5 outline-none focus:border-green-500 transition-colors"
                          />
                        ))}
                      </div>
                      <button onClick={() => { onBookDemo('Account created'); setAuthModal(null); }} className="w-full py-3 bg-[#368B62] text-white text-sm font-bold rounded-xl">
                        Verify & Continue
                      </button>
                      <button className="text-xs text-slate-400 hover:text-slate-700 font-medium">Resend code</button>
                    </div>
                  )}
                </div>
              )}
            </div>
        </LocumDialog>
      )}

      {/* ══════════════════════════════════════
          LOCUM 5-STEP REGISTRATION WIZARD
      ══════════════════════════════════════ */}
      {regWizardOpen && (
        <LocumRegistrationWizard
          initialRegion={region}
          onClose={() => setRegWizardOpen(false)}
        />
      )}

      {/* ══════════════════════════════════════
          COOKIE BANNER
      ══════════════════════════════════════ */}
      {cookieOpen && (
        <div className="fixed bottom-5 left-5 right-5 sm:left-auto sm:right-6 sm:w-[360px] z-50 bg-white border border-black/5 rounded-[24px] p-6">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-[#edf4ef] flex items-center justify-center shrink-0">
              <Cookie className="w-4.5 h-4.5 text-[#368B62]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Cookie preferences</h4>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">Optional preferences are off until you choose. This preview has no analytics or advertising integration. <Link to="/policies/cookies" className="underline">Cookie policy</Link></p>
            </div>
          </div>
          {cookiePrefsOpen && (
            <LocumDialog onClose={() => setCookiePrefsOpen(false)} closeLabel="Close cookie preferences" title="Your visit. Your choice." description="Choose what you’re comfortable with. Optional preferences remain off until you choose them." headline={"A considered visit.\nA choice that’s yours."}>
              <div className="space-y-5 p-7">
                <p className="text-sm leading-7 text-slate-500">Necessary preferences support the requested experience. This preview has no analytics or advertising integration; optional switches record your choices only.</p>
                <div className="space-y-3">
                  {([
                    { key: 'necessary', label: 'Necessary', detail: 'Essential settings and your saved consent choice. Always on.', locked: true },
                    { key: 'functional', label: 'Functional', detail: 'Your preference for additional convenience features.', locked: false },
                    { key: 'performance', label: 'Performance', detail: 'Your preference for optional usage analytics.', locked: false },
                    { key: 'targeting', label: 'Targeting', detail: 'Your preference for optional advertising technologies.', locked: false },
                  ] as const).map(pref => <label key={pref.key} className="flex items-center justify-between gap-5 rounded-2xl bg-[#f5f8f6] p-5"><span><span className="block text-sm font-medium text-[#24332d]">{pref.label}</span><span className="mt-1 block text-xs leading-6 text-slate-500">{pref.detail}</span></span><input type="checkbox" role="switch" disabled={pref.locked} checked={cookiePrefs[pref.key]} onChange={event => setCookiePrefs(preferences => ({ ...preferences, [pref.key]: event.target.checked }))} className="h-5 w-5 shrink-0 accent-[#368B62] disabled:opacity-50" /></label>)}
                </div>
                <button onClick={() => saveCookiePreferences(cookiePrefs)} className="w-full rounded-full bg-[#368B62] py-3.5 text-sm font-semibold text-white hover:bg-[#286d4c]">Save my preferences</button>
                <div className="grid grid-cols-2 gap-3"><button onClick={() => saveCookiePreferences({ necessary: true, functional: true, performance: true, targeting: true })} className="rounded-full border border-black/5 py-3 text-xs font-semibold text-[#53685b] hover:bg-[#edf4ef]">Accept all</button><button onClick={() => saveCookiePreferences({ necessary: true, functional: false, performance: false, targeting: false })} className="rounded-full border border-black/5 py-3 text-xs font-semibold text-[#53685b] hover:bg-[#edf4ef]">Reject optional</button></div>
                <p className="text-center text-[10px] text-slate-400">Change your choices anytime in the footer. <Link to="/policies/cookies" className="text-[#368B62] underline">Read the cookie policy</Link></p>
              </div>
            </LocumDialog>
          )}
          <div className="flex gap-2">
            <button onClick={() => cookiePrefsOpen ? saveCookiePreferences(cookiePrefs) : setCookiePrefsOpen(true)} className="flex-1 py-2 text-xs font-semibold text-slate-600 border border-black/5 rounded-lg hover:bg-slate-50 transition-colors">
              {cookiePrefsOpen ? 'Save' : 'Manage'}
            </button>
            <button onClick={() => saveCookiePreferences({ necessary: true, functional: true, performance: true, targeting: true })} className="flex-1 py-2 text-xs font-semibold bg-[#368B62] hover:bg-[#286d4c] text-white rounded-lg transition-colors">
              Accept all
            </button>
            <button onClick={() => saveCookiePreferences({ necessary: true, functional: false, performance: false, targeting: false })} className="flex-1 rounded-lg border border-black/5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50">Reject optional</button>
          </div>
        </div>
      )}
    </div>
  );
};
