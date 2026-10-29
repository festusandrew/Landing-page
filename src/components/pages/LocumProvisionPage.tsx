import { LOCUM_VISUALS } from "../../data/locumVisuals";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router';
import { LoginExperience } from '../PlatformExperiences';
import VerticalMarqueeDemo from "@/components/ui/marquee-03";
import { Footer } from '../Footer';
import { BrandLogo } from '../BrandLogo';
import { CountryFlag, type FlagCountry } from '../CountryFlag';
import imgLocumProfessional from '../../imports/locum-professional.jpg';
import {
  Users, Clock, ShieldCheck, MapPin, CheckCircle2, ArrowRight, Building2,
  Search, Calendar, Stethoscope, Briefcase, Mail, Lock, Linkedin, Phone,
  ChevronDown, ChevronLeft, ChevronRight, BookOpen, Cookie, Award,
  PlusCircle, UserPlus, Check, Menu, X, Apple, Play, Bell, Zap, Wallet, Globe,
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
import { ScrollFirstPanel, type ScrollFirstPanelHandle } from '../ScrollFirstPanel';
import { getPublicShiftDate, getShiftArea, type PublicLocumShift } from '../../data/locumShiftPresentation';
import { LocumEmployerLanding } from './LocumEmployerLanding';
import { LocumInsights } from './LocumInsights';
import { LocumDialog } from '../LocumDialog';
import locumHeroOverlay from '../../imports/locum-reference/38d30.png';
import locumPhones from '../../imports/locum-reference/locum-app-phones-1600.webp';
import locumPhonesSmall from '../../imports/locum-reference/locum-app-phones-800.webp';
import './locum-reference.css';

interface LocumProvisionPageProps {
  onBackToHome: () => void;
  onBookDemo: (moduleTitle?: string) => void;
  onStartTrial: () => void;
}

type Region = 'IE' | 'UK';
type WorkRegion = 'IE' | 'UK-eng' | 'UK-wal' | 'UK-sco' | 'UK-ni';

const WORK_REGIONS: { id: WorkRegion; label: string; flag: FlagCountry; cities: string[] }[] = [
  { id: 'IE', label: 'Republic of Ireland', flag: 'IE', cities: ['Dublin', 'Cork', 'Galway', 'Limerick', 'Waterford'] },
  { id: 'UK-eng', label: 'England', flag: 'ENG', cities: ['London', 'Manchester', 'Birmingham', 'Liverpool', 'Leeds', 'Bristol', 'Newcastle', 'Cumbria'] },
  { id: 'UK-wal', label: 'Wales', flag: 'WLS', cities: ['Cardiff', 'Swansea', 'Newport', 'Wrexham'] },
  { id: 'UK-sco', label: 'Scotland', flag: 'SCT', cities: ['Glasgow', 'Edinburgh', 'Aberdeen', 'Dundee', 'Inverness'] },
  { id: 'UK-ni', label: 'Northern Ireland', flag: 'UK', cities: ['Belfast', 'Derry / Londonderry', 'Lisburn', 'Newry', 'Bangor'] },
];
const UK_WORK_REGIONS = WORK_REGIONS.filter(area => area.id !== 'IE').map(area => area.id);
// Display order of the region chips on Locum Shifts.
const REGION_FILTER_ORDER: WorkRegion[] = ['UK-eng', 'IE', 'UK-wal', 'UK-sco', 'UK-ni'];

function shiftWorkRegion(location: string) {
  return WORK_REGIONS.find(area => area.cities.some(city => location.includes(city))) ?? WORK_REGIONS[0];
}

function shiftRegion(location: string): WorkRegion {
  return shiftWorkRegion(location).id;
}

// Region filters hold explicit selections; an empty selection shows every region.
function regionsFor(region: Region): WorkRegion[] {
  return region === 'IE' ? ['IE'] : UK_WORK_REGIONS;
}

// Adds the regions, or removes them when every one is already selected.
function toggleRegions(selected: WorkRegion[], regions: WorkRegion[]): WorkRegion[] {
  return regions.every(region => selected.includes(region))
    ? selected.filter(region => !regions.includes(region))
    : [...selected, ...regions.filter(region => !selected.includes(region))];
}

function preferredScrollBehavior(): ScrollBehavior {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}

const REGIONS: Record<Region, {
  country: string; flag: string; currency: string; defaultCity: string;
  cities: string[]; compliance: string;
  shifts: PublicLocumShift[];
}> = {
  IE: {
    country: 'Ireland', flag: '🇮🇪', currency: '€', defaultCity: 'Dublin',
    cities: ['Dublin', 'Cork', 'Galway', 'Limerick', 'Waterford'],
    compliance: 'Garda vetting',
    shifts: [
      { facility: 'Boots Pharmacy — Grafton St', location: 'Dublin 2, IE', date: 'Mon 27 Jul', time: '09:00–18:00', urgent: true, specialisation: 'Community Pharmacy', description: 'We are looking for an experienced locum pharmacist to cover a full-day shift at our busy Grafton Street branch. You will be responsible for dispensing prescriptions, providing patient counselling, and supporting the in-store pharmacy team. This is a high-footfall city-centre location with a strong OTC and prescription volume.', requirements: ['PSI registration (active)', 'Minimum 1 year community pharmacy experience', 'Strong dispensing and OTC advisory skills', 'Garda vetting clearance required'] },
      { facility: 'McCabes Pharmacy', location: 'Cork City, IE', date: 'Tue 28 Jul', time: '08:30–17:30', urgent: false, specialisation: 'Community Pharmacy', description: 'McCabes Pharmacy Cork City requires a locum pharmacist for a day shift covering routine dispensing, Methadone supervision, and patient medication reviews. The team is friendly and the pharmacy is well-organised with a modern PMR system in place.', requirements: ['PSI registration', 'Methadone supervision experience preferred', 'Familiarity with Healthmail and eRx', 'Reliable and punctual'] },
      { facility: 'LloydsPharmacy', location: 'Galway, IE', date: 'Wed 29 Jul', time: '10:00–19:00', urgent: true, specialisation: 'Hospital Outpatient', description: 'Urgent cover needed at our Galway outpatient dispensary. The successful locum will manage a high volume of hospital prescriptions, liaise with clinical staff, and ensure seamless patient throughput. Familiarity with hospital formularies is a strong advantage.', requirements: ['PSI registration', 'Hospital pharmacy experience desirable', 'HPRA and dispensary SOPs compliance', 'Immediate availability essential'] },
      { facility: 'Hickeys Pharmacy', location: 'Limerick, IE', date: 'Thu 30 Jul', time: '09:00–18:00', urgent: false, specialisation: 'Community Pharmacy', description: 'Hickeys Pharmacy Limerick seeks a locum for a standard weekday shift. Duties include dispensing, patient consultations, and stock management. The team is small and supportive; the role suits a pharmacist comfortable working independently in a community setting.', requirements: ['PSI registration', 'Community pharmacy experience', 'Confident working independently', 'Knowledge of NMS and MUR services'] },
      { facility: 'Allcare Pharmacy', location: 'Waterford, IE', date: 'Sat 01 Aug', time: '09:00–17:00', urgent: false, specialisation: 'Community Pharmacy', description: 'Allcare Pharmacy Waterford requires locum cover for a Friday shift. The branch operates a busy dispensary alongside a wellness clinic. Duties include prescription dispensing, health checks, and supporting the medicines adherence programme.', requirements: ['PSI registration', 'Wellness and adherence programme experience a bonus', 'Strong interpersonal skills', 'Garda vetting up to date'] },
      { facility: 'Uniphar — Citywest', location: 'Dublin 24, IE', date: 'Sun 02 Aug', time: '08:00–16:00', urgent: true, specialisation: 'Hospital Pharmacy', description: 'Uniphar Citywest distribution centre requires a registered pharmacist for a Saturday shift overseeing wholesale prescription processing, controlled drug records, and dispatch sign-off. Excellent rate for an experienced hospital or wholesale pharmacist.', requirements: ['PSI registration', 'Controlled drugs handling experience', 'Wholesale or hospital background preferred', 'Available for Saturday shift'] },
      { facility: 'Careway Pharmacy', location: 'Galway, IE', date: 'Tue 04 Aug', time: '09:00–18:00', urgent: false, specialisation: 'Community Pharmacy', description: 'Careway Pharmacy in Galway city seeks a locum for a Monday shift. The role involves standard dispensing, walk-in consultations, and minor ailment referrals. The branch has a loyal patient base and a well-stocked dispensary.', requirements: ['PSI registration', 'Community pharmacy experience', 'Good organisational skills', 'Experience with Touchstore or similar PMR'] },
      { facility: 'Montague Pharmacy', location: 'Cork City, IE', date: 'Wed 05 Aug', time: '10:00–18:30', urgent: false, specialisation: 'Community Pharmacy', description: 'Montague Pharmacy Cork seeks a confident locum for a Tuesday afternoon shift. This is a medium-volume branch with a focus on patient engagement and chronic disease management. The existing team will support the locum with all PMR and workflow queries.', requirements: ['PSI registration', 'Chronic disease management experience preferred', 'Excellent communication skills', 'Garda vetting clearance'] },
    ]
  },
  UK: {
    country: 'United Kingdom', flag: '🇬🇧', currency: '£', defaultCity: 'London',
    cities: WORK_REGIONS.filter(area => area.id !== 'IE').flatMap(area => area.cities),
    compliance: 'Enhanced DBS check',
    shifts: [
      { facility: 'Community pharmacy — Cumbria', location: 'Cumbria, UK', date: 'Mon 12 Oct', time: '08:00–18:00', urgent: false, specialisation: 'Community Pharmacy', dispensingSystem: 'Columbus', availability: 'Available', description: 'Community pharmacist shift in Cumbria, England on Monday 12 October 2026.', requirements: ['Current GPhC registration and role-specific eligibility must be verified before booking'] },
      { facility: 'Boots — Oxford Street', location: 'London W1, UK', date: 'Mon 27 Jul', time: '09:00–18:00', urgent: true, specialisation: 'Community Pharmacy', description: 'Boots Oxford Street is one of the busiest pharmacy branches in the UK. We need an experienced locum to manage high prescription volume, supervise dispensing assistants, and deliver our NHS services including NMS and pharmacy first consultations.', requirements: ['GPhC registration (active)', 'Minimum 2 years community pharmacy experience', 'NHS services experience (NMS, MUR, Pharmacy First)', 'Enhanced DBS required'] },
      { facility: 'Well Pharmacy', location: 'Manchester, UK', date: 'Tue 28 Jul', time: '08:30–17:30', urgent: false, specialisation: 'Community Pharmacy', description: 'Well Pharmacy Manchester requires a locum for a standard weekday shift. Duties include dispensing, patient consultations, and supporting the healthy living programme. The branch has a well-established team and modern dispensing systems.', requirements: ['GPhC registration', 'Community experience preferred', 'Familiarity with Pharmacy First', 'Punctual and professional manner'] },
      { facility: 'Rowlands Pharmacy', location: 'Birmingham, UK', date: 'Wed 29 Jul', time: '10:00–19:00', urgent: true, specialisation: 'Hospital Outpatient', description: 'Urgent cover required at Rowlands Birmingham outpatient dispensary. You will work alongside the hospital clinical team dispensing inpatient TTOs, providing discharge counselling, and managing controlled drug records to standard.', requirements: ['GPhC registration', 'Hospital dispensary experience essential', 'Controlled drug handling', 'Available at short notice'] },
      { facility: 'Gordons Chemists', location: 'Belfast, NI', date: 'Thu 30 Jul', time: '09:00–18:00', urgent: false, specialisation: 'Community Pharmacy', description: 'Gordons Chemists Belfast requires locum cover for a Thursday. The branch is a busy community pharmacy serving a large residential catchment. Duties include dispensing, MAS consultations, and Medicine Delivery Scheme support.', requirements: ['PSNI registration (active)', 'Community pharmacy experience in NI preferred', 'Familiarity with MAS and MDS', 'Role-appropriate AccessNI check'] },
      { facility: 'Lloyds Pharmacy', location: 'Glasgow, UK', date: 'Sat 01 Aug', time: '09:00–17:30', urgent: false, specialisation: 'Community Pharmacy', description: 'Lloyds Pharmacy Glasgow seeks a locum for a Friday shift. The branch handles a medium volume of NHS prescriptions alongside a busy OTC section. The locum will work alongside two dispensing technicians and a medicines counter assistant.', requirements: ['GPhC registration', 'Scottish community pharmacy experience a bonus', 'NHS Pharmacy First Scotland awareness', 'Reliable and team-oriented'] },
      { facility: 'Superdrug Health Clinic', location: 'London W2, UK', date: 'Sun 02 Aug', time: '10:00–18:00', urgent: true, specialisation: 'Pharmacy Clinic', description: 'Superdrug Health Clinic Bayswater requires a pharmacist to manage Saturday walk-in consultations including travel health, sexual health screening, and emergency contraception. High patient interaction role with strong clinical advisory component.', requirements: ['GPhC registration', 'Clinical or consultation experience', 'PGD experience (travel health, contraception)', 'Saturday availability essential'] },
      { facility: 'Day Lewis Pharmacy', location: 'Birmingham, UK', date: 'Tue 04 Aug', time: '08:30–17:30', urgent: false, specialisation: 'Community Pharmacy', description: 'Day Lewis Pharmacy Birmingham requires a locum for Monday cover. This independent-style branch operates a strong patient relationship model with a focus on blister packing, chronic disease management, and medication reviews.', requirements: ['GPhC registration', 'Blister packing experience preferred', 'Medication review and MUR background', 'Friendly and patient-focused approach'] },
      { facility: 'Cohens Chemist', location: 'Manchester, UK', date: 'Wed 05 Aug', time: '09:00–18:00', urgent: false, specialisation: 'Community Pharmacy', description: 'Cohens Chemist Manchester requires standard locum cover for a Tuesday shift. Duties include supervised consumption, dispensing, and patient counselling. A well-structured pharmacy with a supportive technician team already in place.', requirements: ['GPhC registration', 'Supervised consumption experience preferred', 'Familiar with RxWeb or Titan PMR', 'Flexible and adaptable'] },
      { facility: 'Community pharmacy — Cardiff', location: 'Cardiff, UK', date: 'Thu 06 Aug', time: '09:00–17:30', urgent: false, specialisation: 'Community Pharmacy', description: 'Community pharmacy cover involving prescription dispensing, patient advice and working with the pharmacy team. Service responsibilities and booking terms are confirmed by the employer.', requirements: ['Active GPhC registration', 'Right to work in the UK', 'Relevant community pharmacy experience', 'Role-appropriate background check and professional indemnity'] },
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
  { icon: TrendingUp, title: 'Transparent Pay', desc: 'Create an account and sign in to review shift pay before deciding whether to apply.' },
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
  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 border border-black/5 text-[#368B62] text-caption font-bold uppercase tracking-widest">
    {children}
  </span>
);

// ─── Who can join: profession cards moved with chevrons instead of a scrollbar ─
const WhoCanJoinCarousel = () => {
  const track = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ atStart: true, atEnd: false, active: 0 });
  // The dots show progress from the first card to the last.
  const measure = () => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const next = {
      atStart: el.scrollLeft <= 1,
      atEnd: el.scrollLeft >= max - 1,
      active: Math.round((max > 1 ? el.scrollLeft / max : 0) * (WHO_CAN_JOIN.length - 1)),
    };
    setPosition(prev => prev.atStart === next.atStart && prev.atEnd === next.atEnd && prev.active === next.active ? prev : next);
  };
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  // One card per click. Near either end it goes all the way, so no click is just a sliver.
  const move = (direction: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const cards = Array.from(el.children) as HTMLElement[];
    const origin = cards[0]?.offsetLeft ?? 0;
    const step = (cards[1]?.offsetLeft ?? origin) - origin;
    const max = el.scrollWidth - el.clientWidth;
    const stops = [...cards.map(card => card.offsetLeft - origin).filter(left => left < max - step / 2), max];
    const target = direction > 0
      ? stops.find(left => left > el.scrollLeft + 1) ?? max
      : stops.reverse().find(left => left < el.scrollLeft - 1) ?? 0;
    el.scrollTo({ left: target, behavior: preferredScrollBehavior() });
  };
  const control = 'flex size-11 items-center justify-center rounded-full border border-black/10 bg-white text-[#368B62] transition-colors enabled:hover:border-[#368B62] enabled:hover:bg-[#368B62] enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-40';

  return (
    <>
      <motion.div
        ref={track}
        id="locum-who-can-join"
        onScroll={measure}
        className="scrollbar-hide flex snap-x snap-mandatory gap-5 overflow-x-auto pt-2 pb-4"
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        {WHO_CAN_JOIN.map((item, i) => (
          <motion.div
            key={i}
            className="group shrink-0 snap-start"
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
                <p className="inline-flex rounded-full bg-white px-4 py-2.5 text-[#24332d] font-medium text-body">{item.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-8 flex items-center justify-center gap-5">
        <button type="button" onClick={() => move(-1)} disabled={position.atStart} aria-controls="locum-who-can-join" aria-label="Previous professions" className={control}>
          <ChevronLeft aria-hidden="true" className="size-5" />
        </button>
        <div className="flex gap-2" aria-hidden="true">
          {WHO_CAN_JOIN.map((_, i) => (
            <span key={i} className={`h-2 rounded-full transition-all duration-300 ${i === position.active ? 'w-6 bg-[#368B62]' : 'w-2 bg-slate-200'}`} />
          ))}
        </div>
        <button type="button" onClick={() => move(1)} disabled={position.atEnd} aria-controls="locum-who-can-join" aria-label="Next professions" className={control}>
          <ChevronRight aria-hidden="true" className="size-5" />
        </button>
      </div>
    </>
  );
};

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
  const [filterRegions, setFilterRegions] = useState<WorkRegion[]>(['IE']);
  const [filterUrgentOnly, setFilterUrgentOnly] = useState(false);
  const [filterExperience, setFilterExperience] = useState('');
  const [sortBy, setSortBy] = useState<'date'>('date');

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

  // Auth is a frontend preview; visitors are always prompted to sign in until a backend session exists.
  const isSignedIn = false as boolean;
  const openApply = () => { setApplyStep(isSignedIn ? 2 : 1); setApplyOpen(true); };
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
    setFilterRegions(regionsFor(guess));
    setSearchLocation(REGIONS[guess].defaultCity);
    setFaqRegion(guess);
  }, []);

  const applyRegion = (r: Region) => {
    setRegion(r);
    setSearchLocation(REGIONS[r].defaultCity);
    setFaqRegion(r);
    setFilterRegions(regionsFor(r));
    setSelectedShift(0);
  };

  const selectFilterRegions = (selection: WorkRegion[]) => {
    // Every region selected is the same as no filter, so it shows as "All".
    const next = WORK_REGIONS.every(area => selection.includes(area.id)) ? [] : selection;
    setFilterRegions(next);
    setSearchLocation('');
    setSelectedShift(0);
    // The page-wide country follows the filter only when the selection sits within one country.
    const ireland = next.includes('IE');
    const uk = next.some(area => area !== 'IE');
    if (ireland !== uk) setRegion(ireland ? 'IE' : 'UK');
  };

  const openAuth = (mode: 'signin' | 'signup') => {
    setMobileNavOpen(false);
    setSignupStep('role');
    setAuthModal(mode);
  };

  type LocumPage = 'home' | 'find-shifts' | 'post-shift' | 'blog' | 'faq';
  const [page, setPage] = useState<LocumPage>('home');
  const [wizardStep, setWizardStep] = useState(1);

  // Post-shift modal flow
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [postStep, setPostStep] = useState<1|2|3|4>(1);
  const [postSuccess, setPostSuccess] = useState(false);
  const [postForm, setPostForm] = useState({
    profession: '', specialisation: '', date: '', startTime: '09:00', endTime: '17:30',
    rate: '', town: '', urgent: false,
    description: '',
    facility: '', facilityAddress: '', contact: '', email: '', phone: '',
    termsAccepted: false,
  });
  const openPostModal = () => {
    setPostStep(1); setPostSuccess(false);
    setPostForm({ profession: '', specialisation: '', date: '', startTime: '09:00', endTime: '17:30', rate: '', town: '', urgent: false, description: '', facility: '', facilityAddress: '', contact: '', email: '', phone: '', termsAccepted: false });
    setPostModalOpen(true);
  };
  const closePostModal = () => { setPostModalOpen(false); setPostSuccess(false); };
  // Temporary locum shifts only; permanent recruitment is managed on the recruitment site.
  const [cookieOpen, setCookieOpen] = useState(() => { try { return !localStorage.getItem('mployus-cookie-preferences'); } catch { return true; } });
  const [cookiePrefsOpen, setCookiePrefsOpen] = useState(false);
  const [cookiePrefs, setCookiePrefs] = useState(() => { const defaults = { necessary: true, functional: false, performance: false, targeting: false }; try { const saved = JSON.parse(localStorage.getItem('mployus-cookie-preferences') || 'null'); return saved && typeof saved === 'object' ? { necessary: true, functional: saved.functional === true, performance: saved.performance === true, targeting: saved.targeting === true } : defaults; } catch { return defaults; } });
  const saveCookiePreferences = (preferences: typeof cookiePrefs) => { setCookiePrefs(preferences); try { localStorage.setItem('mployus-cookie-preferences', JSON.stringify(preferences)); } catch {} setCookieOpen(false); setCookiePrefsOpen(false); };

  const goto = (p: LocumPage) => {
    setMobileNavOpen(false);
    setPage(p);
    if (p === 'faq') setOpenFaq(0);
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
    const countryMatches = filterRegions.length === 0 || filterRegions.includes(area);
    const professionMatches = !searchProfession || searchProfession === 'Locum Pharmacist';
    const locationMatches = !searchLocation || shift.location.toLowerCase().includes(searchLocation.toLowerCase());
    const facts = getPublicShiftDate(shift.date);
    const minimumExperience = shift.requirements.join(' ').match(/Minimum (\d+) year/i);
    const experienceMatches = !filterExperience || (minimumExperience !== null && (filterExperience === 'Newly qualified' ? Number(minimumExperience[1]) === 0 : Number(minimumExperience[1]) <= Number(filterExperience.match(/\d+/)?.[0] ?? 0)));
    return countryMatches && professionMatches && locationMatches && experienceMatches
      && (!filterSpecialisation || shift.specialisation === filterSpecialisation)
      && (!filterDate || facts.iso >= filterDate)
      && (!filterUrgentOnly || shift.urgent);
  }).sort((first, second) => getPublicShiftDate(first.date).iso.localeCompare(getPublicShiftDate(second.date).iso));
  const filterCities = WORK_REGIONS.filter(area => filterRegions.length === 0 || filterRegions.includes(area.id)).flatMap(area => area.cities);
  const ukRegionsSelected = UK_WORK_REGIONS.filter(area => filterRegions.includes(area)).length;
  const ukRegionsPressed: boolean | 'mixed' = ukRegionsSelected === UK_WORK_REGIONS.length ? true : ukRegionsSelected > 0 ? 'mixed' : false;
  const resetShiftFilters = () => {
    setFilterRegions([]); setSearchLocation(''); setSearchProfession('');
    setFilterSpecialisation(''); setFilterDate('');
    setFilterExperience(''); setFilterUrgentOnly(false); setSelectedShift(0);
  };
  useEffect(() => setSelectedShift(0), [filterRegions, searchLocation, searchProfession, filterSpecialisation, filterDate, filterExperience, filterUrgentOnly, sortBy]);
  const applyShift = shifts[selectedShift] ?? shifts[0];
  const shiftDetailsPanel = useRef<ScrollFirstPanelHandle>(null);

  const faqs: Record<string, { q: string; a: string }[]> = {
    Locum: [
      { q: "What services does MployUs Locums offer?", a: "MployUs is a direct marketplace connecting locum pharmacists and pharmacy technicians with employers across Ireland and the UK. Register in minutes, set your location and availability, and receive relevant shift opportunities instantly. You can apply, confirm, and manage shifts entirely within the app — no phone calls or intermediaries." },
      { q: "Are there any fees for locums to register?", a: "Registration is free for locums. Once registered and verified, you can apply for shifts immediately. Platform fees are outlined transparently when you apply — you'll always see exactly what you'll receive before accepting a shift." },
      { q: "What compliance documents do I need to upload?", a: "At minimum: a valid PSI or GPhC registration certificate, Garda vetting (Ireland) or Enhanced DBS (UK), proof of indemnity insurance, and your CV. Once uploaded and verified, your compliance status is shown to employers automatically — you won't need to resend documents for each shift." },
      { q: "How does payment work after completing a shift?", a: "After each shift, your timesheet is submitted and approved in-app — typically within a few hours of shift end. Payments are processed weekly via SEPA (Ireland) or Faster Payments (UK), landing in your account within 2–3 working days of approval. A full earnings summary is available in your dashboard." },
      { q: "Can I set my own hourly rate?", a: "Yes. You set your preferred rate when applying for each shift, or set a default in your profile. MployUs data shows that 61% of locums who name their rate in applications receive it or within 5% of it. Employers see your rate before accepting, so transparency works in your favour." },
      { q: "What types of roles can I find on MployUs?", a: "This locum platform is for temporary shifts across Ireland, Northern Ireland and Great Britain. Permanent jobs are separate and managed by MployUs on the recruitment site. You can filter locum opportunities by region, profession and location." },
      { q: "How do renewal reminders for compliance documents work?", a: "MployUs tracks expiry dates for your Garda vetting / DBS, registration, and indemnity certificates. You receive in-app and email notifications 6 months and 1 month before each document expires, giving you plenty of time to renew without disrupting your bookings." },
    ],
    Employers: [
      { q: "How do I post a shift on MployUs?", a: "Register your facility, complete a brief profile, and use our guided posting flow — it takes under 3 minutes. Your shift goes live immediately and is matched to relevant locums in your region. You can optionally mark shifts as urgent to boost visibility." },
      { q: "How are locums verified before they can apply?", a: "Every locum must upload and pass verification of: PSI or GPhC registration, Garda vetting (Ireland) or Enhanced DBS with barred list check (UK), professional indemnity insurance, and identity documents. Verification is handled by MployUs — you receive a compliance summary before any shift starts. You never need to chase documents yourself." },
      { q: "What does it cost to fill a shift?", a: "Employers pay a flat per-shift platform fee — not a percentage of the locum's rate. This means the more senior (and higher-rate) the locum you hire, the better value the fee represents compared to a traditional agency model. Contact us for volume pricing if you fill more than 20 shifts per month." },
      { q: "How quickly can I fill an urgent shift?", a: "MployUs data shows an average fill time of under 4 hours for urgent shifts posted on the platform — compared to an industry average of 11 hours via traditional agencies. Marking a shift as urgent surfaces it prominently to locums within your travel radius." },
      { q: "Can I request a specific locum I have worked with before?", a: "Yes. After a completed shift, you can add a locum to your favourites and send them a direct request for future shifts. If they are available and accept, the booking is confirmed immediately — no competition with other applicants." },
      { q: "What happens if a locum cancels close to shift time?", a: "MployUs sends an immediate notification and re-posts the shift automatically. Our network of verified locums is active around the clock, and urgent re-posts typically attract new applicants within 30–60 minutes. Your account manager is also available to assist with same-day cover." },
      { q: "Can I post permanent positions as well as locum shifts?", a: "Permanent jobs are separate from locum shifts. Contact the MployUs recruitment team to review your requirements and arrange posting on the recruitment site. Permanent roles cannot be self-posted through the locum platform." },
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
          <span className={`text-control font-medium flex-1 select-text ${dark ? 'text-white' : 'text-slate-800'}`}>{value}</span>
          <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform ${dark ? 'text-white/40' : 'text-slate-400'} ${open ? 'rotate-180' : ''}`} />
        </button>
        {open && (
          <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-black/5 rounded-xl z-50 overflow-hidden max-h-52 overflow-y-auto">
            {options.map(o => (
              <button
                key={o}
                type="button"
                onClick={() => { onChange(o); setDropdownOpen(null); }}
                className={`w-full text-left px-4 py-2.5 text-control select-text transition-colors ${o === value ? 'bg-green-50 text-green-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'}`}
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
      className={`rounded-2xl ${dark ? 'bg-white/10 backdrop-blur-xl border border-black/5 p-2' : 'bg-white border border-black/5 p-2'} grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4`}
      onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setDropdownOpen(null); }}
    >
      <SearchDropdown id="profession" icon={Stethoscope} value={searchProfession} options={PROFESSIONS.map(p => p.name)} onChange={setSearchProfession} dark={dark} />
      <SearchDropdown id="location" icon={MapPin} value={searchLocation} options={loc.cities} onChange={setSearchLocation} dark={dark} />
      <div className={`flex items-center gap-2.5 px-4 py-3 rounded-xl ${dark ? 'bg-white/10 border border-black/5' : 'bg-slate-50 border border-black/5 '}`}>
        <Calendar className={`w-4 h-4 shrink-0 ${dark ? 'text-white/50' : 'text-slate-400'}`} />
        <input type="date" placeholder="Select date" className={`bg-transparent text-control font-medium w-full outline-none ${dark ? 'text-white/70 [color-scheme:dark]' : 'text-slate-600'}`} />
      </div>
      <button
        onClick={() => goto('find-shifts')}
        className="px-4 py-3 bg-[#368B62] hover:bg-[#286d4c] text-white font-semibold text-control rounded-xl transition-all flex items-center justify-center gap-2"
      >
        <Search className="w-4 h-4" /> Search Shifts
      </button>
    </div>
  );

  return (
    <div data-locum-page={page} className="locum-reference min-h-screen overflow-x-clip bg-white font-sans text-slate-900">

      {/* ══════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════ */}
      <header className={`locum-navigation locum-surface fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-lg border-b border-black/5' : 'bg-white border-b border-black/5'}`}>
        <div className="site-container">
          <div className="flex items-center justify-between h-[70px]">

            <button onClick={() => goto('home')} className="shrink-0 text-brand">
              <BrandLogo />
            </button>

            <nav className="hidden lg:flex items-center">
              {navLinks.map(l => (
                <button
                  key={l.id}
                  onClick={() => goto(l.id)}
                  className={`px-3.5 py-2 mx-0.5 text-control font-medium rounded-lg transition-all ${
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
              <div role="group" aria-label="Region" className="flex items-center bg-slate-50 border border-black/5 rounded-lg p-0.5 mr-1">
                {(Object.keys(REGIONS) as Region[]).map(r => (
                  <button
                    key={r}
                    onClick={() => applyRegion(r)}
                    title={REGIONS[r].country}
                    aria-label={REGIONS[r].country}
                    aria-pressed={region === r}
                    className={`w-8 h-7 rounded-md flex items-center justify-center transition-all ${region === r ? 'bg-white' : 'opacity-40 hover:opacity-80'}`}
                  >
                    <CountryFlag country={r} className="h-3.5 w-[21px]" />
                  </button>
                ))}
              </div>
              <button onClick={() => openAuth('signup')} className="rounded-full bg-[#368B62] px-5 py-2.5 text-control font-semibold text-white transition-colors hover:bg-[#286d4c]">
                Register
              </button>
              <button onClick={() => openAuth('signin')} className="px-4 py-2 text-control font-medium text-[#24332d] transition-colors hover:text-[#368B62]">
                Login
              </button>
            </div>

            <button aria-label={mobileNavOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileNavOpen} className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100" onClick={() => setMobileNavOpen(o => !o)}>
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileNavOpen && (
          // The header is fixed, so on short screens the menu scrolls within the viewport.
          <div className="lg:hidden max-h-[calc(100dvh-var(--locum-header-height))] overflow-y-auto overscroll-contain border-t border-black/5 bg-white/98 backdrop-blur-xl px-4 py-4 space-y-1">
            {navLinks.map(l => (
              <button key={l.id} onClick={() => goto(l.id)} className={`block w-full text-left px-3 py-2.5 rounded-lg text-control font-semibold ${page === l.id ? 'bg-green-50 text-green-700' : 'text-slate-700 hover:bg-slate-50'}`}>
                {l.label}
              </button>
            ))}
            <div role="group" aria-label="Region" className="flex gap-1.5 pt-3">
              {(Object.keys(REGIONS) as Region[]).map(r => (
                <button key={r} onClick={() => applyRegion(r)} title={REGIONS[r].country} aria-label={REGIONS[r].country} aria-pressed={region === r} className={`flex-1 flex items-center justify-center py-2.5 rounded-lg border border-black/5 transition-colors ${region === r ? 'bg-green-50' : 'bg-white'}`}>
                  <CountryFlag country={r} className={`h-4 w-6 transition-opacity ${region === r ? '' : 'opacity-50'}`} />
                </button>
              ))}
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={() => openAuth('signup')} className="flex-1 py-2.5 text-control font-semibold border border-black/5 rounded-lg">Register</button>
              <button onClick={() => openAuth('signin')} className="flex-1 py-2.5 text-control font-semibold text-white bg-[#368B62] rounded-lg">Login</button>
            </div>
          </div>
        )}
      </header>

      {/* ══════════════════════════════════════
          HOME PAGE
      ══════════════════════════════════════ */}
      {page === 'home' && (
        <div className="locum-home locum-surface bg-white [&_h2]:text-[#24332d]">

        <section className="site-container mt-[86px]" aria-label="Locum opportunities in Ireland and the UK">
          <div className="relative overflow-hidden rounded-[28px] bg-[#edf2ef]">
            <div className="absolute inset-y-0 right-0 hidden w-[54%] lg:block">
              <img src={imgLocumProfessional} alt="Healthcare professional in teal scrubs" className="h-full w-full object-cover object-[center_22%]" />
              <img src={locumHeroOverlay} alt="" className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="relative z-10 px-7 py-12 sm:px-12 sm:py-16 lg:w-[61%] lg:px-14 lg:py-20">
              <p className="mb-7 flex items-center gap-2 text-eyebrow font-semibold uppercase text-[#53685b]"><span className="h-1.5 w-1.5 rounded-full bg-[#368B62]" />Healthcare, on your terms · Ireland & UK</p>
              <h1 className="text-hero font-normal text-[#24332d] font-display">Great care.<br />More freedom.<br /><span className="text-[#368B62]">Your next shift.</span></h1>
              <p className="mt-6 max-w-[430px] text-body text-[#64716a]">A more human way to work in healthcare. Find flexible shifts, connect with trusted facilities and make room for the life you want to live.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={() => goto('find-shifts')} className="group inline-flex items-center gap-4 rounded-full bg-[#368B62] px-6 py-3.5 text-control font-semibold text-white transition-colors hover:bg-[#286d4c]">Find your next shift<img src={LOCUM_VISUALS.home.heroArrow[0]} alt="" className="locum-reference-icon" /></button>
                <button onClick={() => openAuth('signup')} className="rounded-full bg-white px-6 py-3.5 text-control font-semibold text-[#24332d] transition-colors hover:bg-[#dcebe1]">Join as a locum</button>
              </div>
              <div className="mt-9 flex max-w-[450px] flex-wrap gap-x-5 gap-y-3">{['Flexible opportunities', 'Country-aware registration', 'People-first support'].map((label, index) => <span key={label} className="flex items-center gap-1.5 text-caption text-[#64716a]"><img src={LOCUM_VISUALS.home.heroChecks[index]} alt="" className="locum-reference-icon" />{label}</span>)}</div>
            </motion.div>
            <div className="relative h-[340px] overflow-hidden lg:hidden"><img src={imgLocumProfessional} alt="Healthcare professional in teal scrubs" className="h-full w-full object-cover object-[center_25%]" /></div>

          </div>
        </section>
        <section aria-label="Find locum opportunities" className="site-container relative z-20 pb-4 pt-8"><div className="site-content"><p className="mb-4 text-eyebrow font-semibold uppercase text-[#67716b]">A little closer to your next opportunity</p><SearchBar /></div></section>

        <Reveal className="mx-auto max-w-[1000px] px-6 pb-12 pt-20 text-center"><p className="text-eyebrow font-medium uppercase text-[#a5b9ad]">Care is personal.<br />Your working life should be, too.</p><p className="mx-auto mt-7 max-w-[630px] text-body text-[#68716c]">Find the opportunities that fit your expertise, your schedule and your ambitions. We connect healthcare professionals and facilities, with thoughtful support along the way.</p></Reveal>
        {/* ── STATS RIBBON ── */}
        <section className="site-container">
          <div ref={statsRef} className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className={`flex min-h-[220px] flex-col rounded-[24px] p-4 min-[360px]:p-6 sm:min-h-[260px] sm:p-8 ${["bg-[#dceee4]", "bg-[#eef0f1]", "bg-[#faf0e1]", "bg-[#e3eff4]"][i % 4]}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="text-stat font-medium tracking-tight text-[#24332d]">{stat.value}</div>
                  <img src={LOCUM_VISUALS.home.stats[i]} alt="" className="locum-reference-icon mb-3 mt-auto" />
                  <p className="text-caption font-medium text-[#53685b]">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </section>



        {/* ── ABOUT ── */}
        <section className="site-container py-20">
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
                    <div className="text-caption font-bold text-slate-900">All Vetted</div>
                    <div className="text-caption text-slate-500">Garda & DBS verified</div>
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
              <motion.h2 variants={fadeUp} className="text-stat font-medium text-slate-900 tracking-tight">
                MployUs connects you to the <span className="text-[#368B62]">right job</span>
              </motion.h2>
              <motion.div variants={fadeUp} className="space-y-4 text-control text-slate-600">
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
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      className="flex items-center gap-2.5 text-control text-slate-700 font-medium"
                      whileHover={{ x: 3 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                      <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                        <img src={LOCUM_VISUALS.home.benefits[index]} alt="" className="locum-reference-icon" />
                      </div>
                      {item.label}
                    </motion.div>
                  );
                })}
              </motion.div>
              <motion.button
                variants={fadeUp}
                onClick={() => goto('find-shifts')}
                className="group inline-flex items-center gap-2 text-control font-bold text-[#368B62] hover:text-green-700 transition-colors"
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
          <div className="site-container">
            <Reveal className="text-center mb-14">
              <SectionLabel>Who can join MployUs Locums</SectionLabel>
              <h2 className="text-section font-normal text-slate-900 mt-4 mb-3 font-display">Built for certified healthcare professionals</h2>
              <p className="text-slate-500 text-body max-w-xl mx-auto">
                Flexible shifts at trusted hospitals and clinics. If you're qualified and passionate about care, join us today.
              </p>
            </Reveal>

            <WhoCanJoinCarousel />
          </div>
        </section>

        {/* ── WHY MPLOYUS ── */}
        <section className="site-container py-20">
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
                <h2 className="text-section font-normal text-slate-900 font-display">
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
                        <img src={LOCUM_VISUALS.home.features[i]} alt="" className="locum-reference-icon" />
                      </motion.div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-control">{f.title}</h4>
                        <p className="text-slate-500 text-body mt-0.5">{f.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              <motion.div variants={fadeUp} className="flex gap-3 pt-2">
                <motion.button
                  onClick={() => openAuth('signup')}
                  className="px-5 py-2.5 text-control font-bold text-white bg-[#368B62] rounded-xl"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  Join for free
                </motion.button>
                <motion.button
                  onClick={() => goto('find-shifts')}
                  className="px-5 py-2.5 text-control font-bold text-slate-700 border border-black/5 rounded-xl"
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
              <div className="relative rounded-3xl overflow-hidden h-[520px]">
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
                      <div className="text-caption font-bold text-slate-500 uppercase tracking-wider">Live shifts available</div>
                      <div className="text-title font-bold text-slate-900 mt-0.5">{loc.shifts.length} shifts near {loc.defaultCity}</div>
                    </div>
                    <button onClick={() => goto('find-shifts')} className="px-4 py-2 bg-[#368B62] hover:bg-[#286d4c] text-white text-control font-bold rounded-lg transition-colors">
                      View all →
                    </button>
                  </div>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── MOBILE APP ── */}
        <Reveal className="site-container locum-app-section py-8">
          <div className="relative rounded-3xl overflow-hidden bg-[#e6f0e9]">
            {/* Decorative blobs */}

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[420px]">
              {/* Text */}
              <div className="p-10 lg:p-14 flex flex-col justify-center space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 border border-black/5 text-[#53685b] text-caption font-semibold uppercase tracking-widest w-fit">
                  <img src={LOCUM_VISUALS.home.app[0]} alt="" className="locum-reference-icon" /> Mobile App
                </div>
                <h2 className="text-section font-normal text-[#24332d] font-display">
                  Your shifts,<br />in your pocket.
                </h2>
                <p className="text-[#64716a] text-body max-w-md">
                  Find and apply for locum shifts on the go. Manage your schedule, submit timesheets, and track payments — all in one app.
                </p>
                <ul className="space-y-2.5">
                  {[
                    { icon: Bell, label: 'Real-time shift alerts near you' },
                    { icon: CheckCircle2, label: 'One-tap apply & in-app timesheets' },
                    { icon: Wallet, label: 'Weekly payment tracking' },
                  ].map((f, index) => {
                    const Icon = f.icon;
                    return (
                      <li key={f.label} className="flex items-center gap-2.5 text-control text-[#53685b]">
                        <img src={LOCUM_VISUALS.home.app[index + 1]} alt="" className="locum-reference-icon" /> {f.label}
                      </li>
                    );
                  })}
                </ul>
                <div className="flex flex-wrap gap-3 pt-2">
                  {[
                    { icon: Apple, top: 'Download on the', bottom: 'App Store', key: 'iOS App' },
                    { icon: Play, top: 'Get it on', bottom: 'Google Play', key: 'Android App' },
                  ].map((btn, index) => {
                    const Icon = btn.icon;
                    return (
                      <button
                        key={btn.key}
                        onClick={() => onBookDemo(btn.key)}
                        className="flex items-center gap-3 px-5 py-3 bg-white hover:bg-[#d5e6db] border border-black/5 rounded-xl transition-all group"
                      >
                        <img src={LOCUM_VISUALS.home.app[index + 4]} alt="" className="locum-reference-icon" />
                        <span className="text-left">
                          <span className="block text-caption text-[#64716a]">{btn.top}</span>
                          <span className="block text-control font-bold text-[#24332d]">{btn.bottom}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="locum-phone-composition">
                <img
                  src={locumPhones}
                  srcSet={`${locumPhonesSmall} 800w, ${locumPhones} 1600w`}
                  sizes="(min-width: 1024px) 50vw, (min-width: 640px) 36rem, 100vw"
                  width={1600}
                  height={1119}
                  loading="lazy"
                  decoding="async"
                  alt="MployUs Locums app on two phones, showing a shift dashboard and a list of available shifts"
                />
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── TESTIMONIALS ── */}
        <section className="site-container py-20">
          <div className="text-center mb-14">
            <SectionLabel>Testimonials</SectionLabel>
            <h2 className="text-section font-normal text-slate-900 mt-4 mb-3 font-display">Trusted by healthcare professionals</h2>
            <p className="text-slate-500 text-body max-w-md mx-auto">Hear what our community has to say about working with MployUs Locums.</p>
          </div>

          <VerticalMarqueeDemo reviews={[...TESTIMONIALS, TESTIMONIALS[1], TESTIMONIALS[2]].map(testimonial => ({
            name: testimonial.name,
            username: testimonial.role,
            body: testimonial.quote,
          }))} />
        </section>

        {/* ── FAQ SECTION ── */}
        <section className="py-20 bg-white">
          <div className="site-container">
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
                <h2 className="text-section font-normal text-slate-900 font-display">Frequently asked questions</h2>
                <p className="text-slate-500 text-body">
                  Everything you need to know about working with MployUs Locums, from shift requests to payments.
                </p>
                <motion.button
                  onClick={() => goto('faq')}
                  className="group inline-flex items-center gap-2 text-control font-bold text-[#368B62] hover:text-green-700 transition-colors"
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
                      className={`px-5 py-2 rounded-lg text-control font-semibold transition-all ${faqTab === tab ? 'bg-[#368B62] text-white' : 'text-slate-600 hover:text-slate-900'}`}
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
                          <span className={`text-control font-semibold ${isOpen ? 'text-white' : 'text-slate-900'}`}>{f.q}</span>
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
                          <div className="px-5 pb-5 text-control text-white/85">{f.a}</div>
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

        <section className="site-inset mb-12 rounded-[28px] bg-[#e6f0e9] py-14 overflow-hidden">
          <motion.div
            className="site-container flex flex-col lg:flex-row items-center justify-between gap-8"
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            <motion.div variants={slideLeft} className="space-y-3 text-center lg:text-left">
              <div className="text-caption font-bold text-[#368B62] uppercase tracking-widest">Join MployUs Locums</div>
              <h3 className="text-title font-semibold text-[#24332d] font-sans">Start finding — or filling — shifts today</h3>
              <p className="text-[#64716a] text-body">Free to register in Ireland and the UK. Verified professionals only.</p>
            </motion.div>
            <motion.div variants={slideRight} className="flex w-full flex-wrap items-center gap-3 lg:w-auto">
              <motion.button
                onClick={() => openAuth('signup')}
                className="px-7 py-3.5 bg-white text-slate-900 font-bold text-control rounded-full"
                whileHover={{ scale: 1.04, backgroundColor: '#f8fafc' }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              >
                Create free account
              </motion.button>
              <motion.button
                onClick={onBackToHome}
                className="px-6 py-3.5 bg-white border border-black/5 text-[#24332d] font-semibold text-control rounded-full"
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
        <div className="locum-shifts locum-surface pt-[70px] min-h-screen bg-white">

          {/* ── Hero banner with background image ── */}
          <section className="bg-[#f5f7f1] px-6 py-14 sm:py-16"><div className="site-content"><p className="mb-5 text-eyebrow font-semibold uppercase text-[#67716b]">Your expertise. Your schedule.</p><h1 className="text-hero font-normal text-[#24332d] font-display">Find your next shift.<br /><span className="text-[#368B62]">Make it work for you.</span></h1><p className="mt-5 max-w-lg text-body text-[#68716c]">Explore flexible locum opportunities and find the right fit for your profession, location and availability.</p></div></section>

          {/* ── Filter bar ── */}
          <div className="bg-white border-b border-black/5">
            <div className="site-container py-6 flex flex-wrap items-end justify-between gap-4">
              <div className="grid w-full grid-cols-2 items-end gap-x-3 gap-y-4 sm:grid-cols-3 lg:flex lg:w-auto lg:flex-wrap lg:gap-6">
                {/* Profession */}
                <div className="flex min-w-0 flex-col gap-1.5">
                  <label className="text-[#757575] text-control font-normal">Profession</label>
                  <div className="relative">
                    <select
                      value={searchProfession}
                      onChange={e => setSearchProfession(e.target.value)}
                      className="appearance-none bg-white border border-black/5 rounded px-3.5 py-2.5 pr-8 text-control text-slate-700 outline-none focus:border-green-500 w-full lg:w-[244px] cursor-pointer"
                    >
                      <option value="">Choose profession</option>
                      {PROFESSIONS.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#757575] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                {/* Specialisation */}
                <div className="flex min-w-0 flex-col gap-1.5">
                  <label className="text-[#757575] text-control font-normal">Specialisation</label>
                  <div className="relative">
                    <select
                      value={filterSpecialisation}
                      onChange={e => setFilterSpecialisation(e.target.value)}
                      className="appearance-none bg-white border border-black/5 rounded px-3.5 py-2.5 pr-8 text-control text-slate-700 outline-none focus:border-green-500 w-full lg:w-[240px] cursor-pointer"
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
                <div className="flex min-w-0 flex-col gap-1.5">
                  <label className="text-[#757575] text-control font-normal">Shift Location</label>
                  <div className="relative">
                    <select
                      value={searchLocation}
                      onChange={e => setSearchLocation(e.target.value)}
                      className="appearance-none bg-white border border-black/5 rounded px-3.5 py-2.5 pr-8 text-control text-slate-700 outline-none focus:border-green-500 w-full lg:w-[236px] cursor-pointer"
                    >
                      <option value="">Choose location</option>
                      {filterCities.map(city => <option key={city}>{city}</option>)}
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#757575] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                {/* Start Date */}
                <div className="flex min-w-0 flex-col gap-1.5">
                  <label className="text-[#757575] text-control font-normal">Earliest Start Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={filterDate}
                      onChange={e => setFilterDate(e.target.value)}
                      className="bg-white border border-black/5 rounded px-3.5 py-2.5 text-control text-slate-700 outline-none focus:border-green-500 w-full lg:w-[200px] cursor-pointer"
                    />
                  </div>
                </div>
                <div className="col-span-2 flex min-w-0 flex-col gap-1.5 sm:col-span-1">
                  <label className="text-[#757575] text-control font-normal">Pay information</label>
                  <button onClick={() => openAuth('signin')} className="inline-flex w-full items-center gap-2 rounded-lg border border-black/5 bg-white px-4 py-2.5 text-control font-semibold whitespace-nowrap text-[#368B62] lg:w-auto"><Lock size={14} />Account required</button>
                </div>
                {/* Experience */}
                <div className="flex min-w-0 flex-col gap-1.5">
                  <label className="text-[#757575] text-control font-normal">Experience Level</label>
                  <div className="relative">
                    <select
                      value={filterExperience}
                      onChange={e => setFilterExperience(e.target.value)}
                      className="appearance-none bg-white border border-black/5 rounded px-3.5 py-2.5 pr-8 text-control text-slate-700 outline-none focus:border-green-500 w-full lg:w-[180px] cursor-pointer"
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
                <div className="flex min-w-0 flex-col gap-1.5">
                  <label className="text-[#757575] text-control font-normal">Availability</label>
                  <button
                    onClick={() => setFilterUrgentOnly(v => !v)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded border text-left text-control font-medium leading-tight transition-colors lg:px-3.5 ${filterUrgentOnly ? 'bg-red-50 border-red-200 text-red-700' : 'bg-white border-black/5 text-slate-600'}`}
                  >
                    <span className={`w-2 h-2 rounded-full ${filterUrgentOnly ? 'bg-red-500 animate-pulse' : 'bg-slate-300'}`} />
                    Urgent shifts only
                  </button>
                </div>
              </div>
              <button
                onClick={() => setSelectedShift(0)}
                className="w-full bg-[#368B62] hover:bg-[#276647] text-white font-semibold text-control px-8 py-3 rounded-lg transition-colors shrink-0 lg:w-auto"
              >
                Search
              </button>
            </div>
          </div>

          {/* ── Country filter tabs ── */}
          <div className="border-b border-black/5 bg-white">
            <div className="site-container py-4 flex flex-col gap-2">
              <div className="flex items-center justify-between gap-4"><p id="locum-region-filter-label" className="text-[#3d3d3d] text-body">Country &amp; region</p><button onClick={resetShiftFilters} className="text-control font-semibold text-[#368B62]">Clear all filters</button></div>
              <p className="text-caption text-slate-500">Sign in to see shift pay and to filter or sort by pay.</p>
              <div role="group" aria-labelledby="locum-region-filter-label" className="flex flex-wrap items-center gap-x-6 gap-y-3 sm:gap-x-8">
                {[
                  { id: 'all', label: 'All', icon: <Globe aria-hidden="true" className="size-4 text-[#368B62]" />, pressed: filterRegions.length === 0, next: [] },
                  { id: 'UK', label: 'All UK regions', icon: <CountryFlag country="UK" className="h-4 w-6" />, pressed: ukRegionsPressed, next: toggleRegions(filterRegions, UK_WORK_REGIONS) },
                  ...REGION_FILTER_ORDER.map(id => {
                    const area = WORK_REGIONS.find(region => region.id === id)!;
                    return { id, label: area.label, icon: <CountryFlag country={area.flag} className="h-4 w-6" />, pressed: filterRegions.includes(id), next: toggleRegions(filterRegions, [id]) };
                  }),
                ].map(c => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => selectFilterRegions(c.next)}
                    aria-pressed={c.pressed}
                    aria-label={c.label}
                    className="flex items-center gap-2 text-control text-black"
                  >
                    <span className={`size-5.5 rounded-sm border flex items-center justify-center shrink-0 transition-colors ${c.pressed === true ? 'bg-[#368B62] border-[#368B62]' : c.pressed === 'mixed' ? 'bg-white border-[#368B62]' : 'bg-white border-black/20'}`}>
                      {c.pressed === true && <Check aria-hidden="true" className="size-3 text-white" />}
                      {c.pressed === 'mixed' && <Minus aria-hidden="true" className="size-3 text-[#368B62]" />}
                    </span>
                    {c.icon}
                    <span>{c.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Main content: shift list + detail panel ── */}
          <div className="site-container py-6">
            <div className="grid grid-cols-1 md:grid-cols-[300px_minmax(0,1fr)] lg:grid-cols-[380px_minmax(0,1fr)] gap-6">

              {/* Left: shift list */}
              <div id="locum-shift-results" className="scroll-mt-24">
                <div className="flex items-center justify-between mb-3">
                  <p aria-live="polite" className="text-[#757575] text-body">{shifts.length} available {shifts.length === 1 ? 'shift' : 'shifts'}</p>
                  {/* Sort tabs */}
                  <div className="flex items-center gap-0.5 bg-white border border-black/5 rounded-full px-0.5 py-0.5">
                    {(['date'] as const).map((s, i) => {
                      const labels = { date: 'Start Date' };
                      const active = sortBy === s;
                      return (
                        <button
                          key={s}
                          onClick={() => setSortBy(s)}
                          className={`px-2.5 py-1 rounded-full text-control font-medium transition-colors ${active ? 'bg-[#368B62] text-white' : 'text-[#757575] hover:text-slate-900'}`}
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
                    const area = shiftWorkRegion(s.location);
                    return (
                      <button
                        key={i}
                        onClick={() => { setSelectedShift(i); requestAnimationFrame(() => shiftDetailsPanel.current?.reveal()); }}
                        className={`w-full text-left transition-all border-b border-[#f1f1f1] ${active ? 'bg-[#368B62]' : 'bg-[rgba(245,245,245,0.6)] hover:bg-slate-50'}`}
                        style={active ? { borderColor: 'rgba(163,209,57,0.3)' } : {}}
                      >
                        <div className="flex flex-col gap-2 px-4 py-3">
                          {/* Pharmacy + title */}
                          <div>
                            <p className={`text-caption ${active ? 'text-[#c5e8d7]' : 'text-black'}`}>{s.facility}</p>
                            <p className={`font-semibold text-lead ${active ? 'text-[#a3d139]' : 'text-[#368B62]'}`}>{searchProfession || 'Locum Pharmacist'}</p>
                          </div>
                          {/* Date + rate row */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Calendar className={`w-3.5 h-3.5 shrink-0 ${active ? 'text-[#c5e8d7]/80' : 'text-[#757575]'}`} />
                              <span className={`text-control ${active ? 'text-white/80' : 'text-black'}`}>{s.date}</span>
                            </div>
                            <div>
                              <p className={`text-body font-normal ${active ? 'text-[#a3d139]' : 'text-[#368B62]'}`}><span className="inline-flex items-center"><Lock size={12} aria-hidden="true" /><span className="sr-only">Pay locked until sign-in</span></span></p>
                            </div>
                          </div>
                          {/* Time + location row */}
                          <div className="flex flex-col gap-1.5">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5">
                                <Clock className={`w-3.5 h-3.5 shrink-0 ${active ? 'text-white/80' : 'text-[#757575]'}`} />
                                <span className={`text-control ${active ? 'text-white/80' : 'text-black'}`}>{s.time}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <MapPin className={`w-3 h-3 shrink-0 ${active ? 'text-[#c5e8d7]/80' : 'text-[#757575]'}`} />
                              <span className={`text-control ${active ? 'text-white/80' : 'text-black'}`}>{getShiftArea(s.location)}<span className="sr-only">, {area.label}</span></span>
                              <CountryFlag country={area.flag} className={`ml-0.5 h-3 w-[18px] ${active ? 'ring-1 ring-white/60' : ''}`} />
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <p className="mt-4 text-center text-caption text-slate-500">Showing all {shifts.length} matching shifts</p>
              </div>

              {/* Right: selected shift detail + map */}
              {(() => {
                const s = shifts[selectedShift] ?? shifts[0];
                if (!s) return <div className="rounded-3xl bg-[#f4f8f5] p-10 text-center"><Search className="mx-auto mb-5 h-8 w-8 text-[#368B62]" /><h2 className="text-title font-semibold font-sans">No shifts match these filters</h2><p className="mt-3 text-body text-slate-500">Try another region or clear your filters. New shifts are added regularly.</p><button onClick={resetShiftFilters} className="mt-6 rounded-full bg-[#368B62] px-6 py-3 text-control font-semibold text-white">Show all shifts</button></div>;
                const area = shiftWorkRegion(s.location);
                return (
                  <ScrollFirstPanel ref={shiftDetailsPanel} id="selected-locum-shift" className="locum-shift-details min-w-0 scroll-mt-24" resetKey={`${s.facility}-${s.date}`}>
                    <LocumJobDetails
                      key={`${s.facility}-${s.date}`}
                      shift={s}
                      reference={`LOC-${area.id}-${String(allShifts.indexOf(s) + 1).padStart(3, '0')}`}
                      region={area.label}
                      flag={area.flag}
                      onBack={() => document.getElementById('locum-shift-results')?.scrollIntoView({ block: 'start', behavior: preferredScrollBehavior() })}
                      onApply={openApply}
                      onLogin={() => openAuth('signin')}
                    />
                  </ScrollFirstPanel>
                );
              })()}
            </div>
          </div>
        </div>

        {/* ══ APPLY FLOW MODAL ══ */}
        {applyOpen && (
          <LocumDialog onClose={closeApply} closeLabel="Close shift application" title={applyStep === 1 ? "Sign in to apply" : applyStep === 4 ? "Application sent" : "Apply for this shift"} description={applyStep === 1 ? "You need a MployUs Locums account to apply for shifts." : "Confirm your availability and send your application."} headline={"Your next shift.\nYour next chapter."} steps={['Sign in', 'Apply', 'Done']} currentStep={applyStep === 1 ? 0 : applyStep === 4 ? 2 : 1}>
              <div className="mx-7 mt-5 mb-1 bg-[#368B62]/5 border border-black/5 rounded-xl px-4 py-3 flex items-center justify-between gap-4">
                <div>
                  <p className="text-caption text-slate-500">{applyShift.facility}</p>
                  <p className="font-bold text-[#368B62] text-body">{searchProfession || 'Locum Pharmacist'} · {applyShift.date}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-caption text-slate-500">{applyShift.time}</p>
                  <p className="text-caption text-slate-500 inline-flex items-center gap-1"><MapPin className="w-3 h-3" aria-hidden="true" />{getShiftArea(applyShift.location)}<span className="sr-only">, {shiftWorkRegion(applyShift.location).label}</span><CountryFlag country={shiftWorkRegion(applyShift.location).flag} className="ml-1 h-3 w-[18px]" /></p>
                </div>
              </div>

              <div className="px-7 pb-7 pt-4">
                {applyStep === 1 && (
                  <motion.div key="gate" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="space-y-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#368B62]/10 flex items-center justify-center shrink-0"><Lock className="w-4 h-4 text-[#368B62]" aria-hidden="true" /></div>
                      <div>
                        <h2 className="text-title font-semibold text-slate-900 font-sans">Sign in to apply</h2>
                        <p className="text-body text-slate-500 mt-1">Your verified profile and documents are shared with the facility, so you only answer a couple of quick questions per shift.</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <button onClick={() => { closeApply(); openAuth('signin'); }} className="w-full py-3 bg-[#368B62] hover:bg-[#276647] text-white font-bold rounded-xl transition-colors">Sign in</button>
                      <button onClick={() => { closeApply(); openAuth('signup'); }} className="w-full py-3 border border-black/5 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors">Create a free account</button>
                    </div>
                  </motion.div>
                )}

                {applyStep === 2 && (
                  <motion.div key="apply" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="space-y-5">
                    <label className="flex items-start gap-3 cursor-pointer bg-slate-50 border border-black/5 rounded-xl p-4">
                      <input type="checkbox" checked={applyForm.availabilityConfirmed} onChange={e => setApplyForm(f => ({...f, availabilityConfirmed: e.target.checked}))} className="w-4 h-4 mt-0.5 accent-[#368B62] shrink-0" />
                      <span className="text-control text-slate-700">I'm available for the full shift on {applyShift.date}, {applyShift.time}.</span>
                    </label>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="apply-note" className="text-caption font-semibold text-slate-700">Note to the facility <span className="text-slate-400 font-normal">(optional)</span></label>
                      <textarea id="apply-note" value={applyForm.coverNote} maxLength={300} onChange={e => setApplyForm(f => ({...f, coverNote: e.target.value}))} placeholder="Anything they should know?" rows={3} className="px-3.5 py-3 rounded-xl border border-black/5 text-control outline-none focus:border-[#368B62] transition-colors bg-slate-50 resize-none" />
                    </div>
                    <div className="flex gap-3">
                      <button onClick={closeApply} className="px-5 py-3 rounded-xl border border-black/5 text-control font-semibold text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
                      <button onClick={() => setApplyStep(4)} disabled={!applyForm.availabilityConfirmed} className="flex-1 py-3 bg-[#368B62] disabled:opacity-40 hover:bg-[#276647] text-white font-bold rounded-xl transition-colors">Submit application</button>
                    </div>
                  </motion.div>
                )}

                {applyStep === 4 && (
                  <motion.div key="done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="flex flex-col items-center text-center py-6 space-y-5">
                    <div className="w-16 h-16 rounded-full bg-[#368B62] flex items-center justify-center"><Check className="w-8 h-8 text-white" strokeWidth={2.5} /></div>
                    <div className="space-y-1.5">
                      <h2 className="text-title font-semibold text-slate-900 font-sans">Thank you for applying.</h2>
                      <p className="text-body text-slate-500 max-w-sm">Your application for {applyShift.facility} on {applyShift.date} is complete.</p>
                    </div>
                    <button onClick={closeApply} className="w-full py-3 bg-[#368B62] hover:bg-[#276647] text-white font-bold rounded-xl transition-colors">Back to shifts</button>
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
        <LocumEmployerLanding country={loc.country} onRequest={(urgent = false) => { openPostModal(); setPostForm(form => ({ ...form, urgent })); }} onRegister={() => { openAuth('signup'); setRole('Client'); }} onLogin={() => openAuth('signin')} onTalk={() => onBookDemo('Locum employer staffing')} />

        {/* ══ POST FLOW MODAL ══ */}
        {postModalOpen && (
          <LocumDialog onClose={closePostModal} closeLabel="Close shift posting" title={postSuccess ? "A clearer staffing brief." : "Build your locum brief."} description="The practical details behind a well-covered temporary shift." headline={"Good people.\nBetter-covered teams."} steps={['Cover & urgency', 'Shift details', 'Your facility', 'Review your brief']} currentStep={postSuccess ? 4 : postStep - 1}>
              <div className="px-7 pb-7 pt-5">
                

                {/* ── SUCCESS SCREEN ── */}
                {postSuccess && (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }} className="py-6 flex flex-col items-center text-center gap-5">
                    <motion.div className="w-20 h-20 rounded-full bg-[#368B62] flex items-center justify-center"
                      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 350, damping: 18, delay: 0.1 }}>
                      <Check className="w-9 h-9 text-white" />
                    </motion.div>
                    <div>
                      <h2 className="text-title font-semibold text-slate-900 mb-1 font-sans">
                        Your shift draft is ready
                      </h2>
                      <p className="text-slate-500 text-body max-w-sm mx-auto">
                        {`Your shift brief for ${postForm.profession || 'healthcare professionals'} near ${postForm.town || loc.defaultCity} is complete.`}
                      </p>
                    </div>
                    <div className="w-full bg-slate-50 border border-black/5 rounded-xl p-5 text-left space-y-2">
                      <p className="text-eyebrow font-bold text-slate-500 uppercase mb-3">What happens next</p>
                      {[
                        { icon: '🏥', title: 'Set up your facility account', desc: 'Register your facility or sign in to access the intended employer workspace.' },
                        { icon: '📋', title: 'Check your brief', desc: 'Confirm the profession, location, dates, rate and all practical requirements.' },
                        { icon: '🔍', title: 'Review applications', desc: 'For a live posting, review relevant experience and role-appropriate compliance information.' },
                        { icon: '🤝', title: 'Agree the arrangement', desc: 'Confirm the complete brief, pay and booking terms in writing before work starts.' },
                      ].map((step, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.08 }}
                          className="flex items-start gap-3 py-2.5 border-b border-black/5 last:border-0">
                          <span className="text-lead mt-0.5">{step.icon}</span>
                          <div>
                            <p className="text-body font-bold text-slate-900">{step.title}</p>
                            <p className="text-caption text-slate-500 mt-0.5">{step.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <div className="flex gap-3 w-full">
                      <button onClick={closePostModal}
                        className="flex-1 py-3 border border-black/5 text-slate-700 text-control font-semibold rounded-xl hover:bg-slate-50 transition-colors">
                        Back to Employers
                      </button>
                      <button onClick={openPostModal}
                        className="flex-1 py-3 bg-[#368B62] hover:bg-[#276647] text-white text-control font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
                        Create another draft <PlusCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ══ LOCUM SHIFT FLOW ══ */}
                {!postSuccess && (

                  <>
                    {/* Locum Step 1 — Type & urgency */}
                    {postStep === 1 && (
                      <motion.div key="ls1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }} className="space-y-5">
                        <div>
                          <h2 className="text-title font-semibold text-slate-900 font-sans">Temporary locum cover</h2>
                          <p className="text-body text-slate-500 mt-1">This form is for temporary shifts, whether urgent or planned.</p>
                        </div>
                        <div className="rounded-xl bg-[#f8eef5] p-4 text-caption text-slate-600">
                          Need a permanent hire? MployUs manages permanent job postings on the recruitment site.
                          <Link to="/recruitment-service?recruitment-enquiry=permanent" onClick={closePostModal} className="mt-2 flex items-center gap-2 font-semibold text-[#810161]">Contact MployUs Recruitment <ArrowRight size={14} /></Link>
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-xl border border-black/5 bg-slate-50">
                          <div>
                            <p className="text-body font-bold text-slate-900">Mark as urgent</p>
                            <p className="text-caption text-slate-500 mt-0.5">Flag this shift for last-minute cover.</p>
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
                          <h2 className="text-title font-semibold text-slate-900 font-sans">Shift details</h2>
                          <p className="text-body text-slate-500 mt-1">Tell locums exactly what you need and when.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="col-span-2 flex flex-col gap-1.5">
                            <label className="text-caption font-semibold text-slate-700">Profession required <span className="text-rose-500">*</span></label>
                            <div className="relative">
                              <select value={postForm.profession} onChange={e => setPostForm(f => ({ ...f, profession: e.target.value }))}
                                className="appearance-none w-full px-3.5 py-2.5 rounded-xl border border-black/5 text-control outline-none focus:border-[#368B62] transition-colors bg-slate-50 cursor-pointer">
                                <option value="">Select profession…</option>
                                {['Locum Pharmacist', 'Pharmacy Technician', 'Locum GP', 'Agency Nurse', 'Healthcare Assistant', 'Locum Optician', 'Allied Health Worker'].map(p => <option key={p}>{p}</option>)}
                              </select>
                              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-caption font-semibold text-slate-700">Shift date <span className="text-rose-500">*</span></label>
                            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-black/5 bg-slate-50 focus-within:border-[#368B62] transition-colors">
                              <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                              <input type="date" value={postForm.date} onChange={e => setPostForm(f => ({ ...f, date: e.target.value }))}
                                className="bg-transparent text-control text-slate-700 outline-none w-full" />
                            </div>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-caption font-semibold text-slate-700">Hourly rate ({loc.currency}) <span className="text-rose-500">*</span></label>
                            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-black/5 bg-slate-50 focus-within:border-[#368B62] transition-colors">
                              <Wallet className="w-4 h-4 text-slate-400 shrink-0" />
                              <input value={postForm.rate} onChange={e => setPostForm(f => ({ ...f, rate: e.target.value }))}
                                placeholder={`e.g. ${loc.currency}32`}
                                className="bg-transparent text-control outline-none w-full" />
                            </div>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-caption font-semibold text-slate-700">Start time</label>
                            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-black/5 bg-slate-50 focus-within:border-[#368B62] transition-colors">
                              <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                              <input type="time" value={postForm.startTime} onChange={e => setPostForm(f => ({ ...f, startTime: e.target.value }))}
                                className="bg-transparent text-control text-slate-700 outline-none w-full" />
                            </div>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-caption font-semibold text-slate-700">End time</label>
                            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-black/5 bg-slate-50 focus-within:border-[#368B62] transition-colors">
                              <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                              <input type="time" value={postForm.endTime} onChange={e => setPostForm(f => ({ ...f, endTime: e.target.value }))}
                                className="bg-transparent text-control text-slate-700 outline-none w-full" />
                            </div>
                          </div>
                          <div className="col-span-2 flex flex-col gap-1.5">
                            <label className="text-caption font-semibold text-slate-700">Location / town <span className="text-rose-500">*</span></label>
                            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-black/5 bg-slate-50 focus-within:border-[#368B62] transition-colors">
                              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                              <input value={postForm.town} onChange={e => setPostForm(f => ({ ...f, town: e.target.value }))}
                                placeholder={`e.g. ${loc.defaultCity}`}
                                className="bg-transparent text-control outline-none w-full" />
                            </div>
                          </div>
                          <div className="col-span-2 flex flex-col gap-1.5">
                            <label className="text-caption font-semibold text-slate-700">Additional requirements <span className="text-slate-400 font-normal">(optional)</span></label>
                            <textarea value={postForm.description} onChange={e => setPostForm(f => ({ ...f, description: e.target.value }))}
                              placeholder="Any specific skills, software experience, or clinical requirements…"
                              rows={3} className="px-3.5 py-2.5 rounded-xl border border-black/5 text-control outline-none resize-none focus:border-[#368B62] transition-colors bg-slate-50" />
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <button onClick={() => setPostStep(1)} className="px-5 py-3 border border-black/5 text-slate-600 text-control font-semibold rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1.5">
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
                          <h2 className="text-title font-semibold text-slate-900 font-sans">Your facility</h2>
                          <p className="text-body text-slate-500 mt-1">Locums use this to confirm the listing is legitimate.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="col-span-2 flex flex-col gap-1.5">
                            <label className="text-caption font-semibold text-slate-700">Facility / pharmacy name <span className="text-rose-500">*</span></label>
                            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-black/5 bg-slate-50 focus-within:border-[#368B62] transition-colors">
                              <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                              <input value={postForm.facility} onChange={e => setPostForm(f => ({ ...f, facility: e.target.value }))}
                                placeholder="e.g. Boots Pharmacy — Grafton Street"
                                className="bg-transparent text-control outline-none w-full" />
                            </div>
                          </div>
                          <div className="col-span-2 flex flex-col gap-1.5">
                            <label className="text-caption font-semibold text-slate-700">Facility address <span className="text-slate-400 font-normal">(optional)</span></label>
                            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-black/5 bg-slate-50 focus-within:border-[#368B62] transition-colors">
                              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                              <input value={postForm.facilityAddress} onChange={e => setPostForm(f => ({ ...f, facilityAddress: e.target.value }))}
                                placeholder="Street address"
                                className="bg-transparent text-control outline-none w-full" />
                            </div>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-caption font-semibold text-slate-700">Contact name <span className="text-rose-500">*</span></label>
                            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-black/5 bg-slate-50 focus-within:border-[#368B62] transition-colors">
                              <Users className="w-4 h-4 text-slate-400 shrink-0" />
                              <input value={postForm.contact} onChange={e => setPostForm(f => ({ ...f, contact: e.target.value }))}
                                placeholder="Your name"
                                className="bg-transparent text-control outline-none w-full" />
                            </div>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-caption font-semibold text-slate-700">Phone number <span className="text-rose-500">*</span></label>
                            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-black/5 bg-slate-50 focus-within:border-[#368B62] transition-colors">
                              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                              <input value={postForm.phone} onChange={e => setPostForm(f => ({ ...f, phone: e.target.value }))}
                                placeholder="+353 / +44"
                                className="bg-transparent text-control outline-none w-full" />
                            </div>
                          </div>
                          <div className="col-span-2 flex flex-col gap-1.5">
                            <label className="text-caption font-semibold text-slate-700">Email address <span className="text-rose-500">*</span></label>
                            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-black/5 bg-slate-50 focus-within:border-[#368B62] transition-colors">
                              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                              <input type="email" value={postForm.email} onChange={e => setPostForm(f => ({ ...f, email: e.target.value }))}
                                placeholder="manager@facility.ie"
                                className="bg-transparent text-control outline-none w-full" />
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <button onClick={() => setPostStep(2)} className="px-5 py-3 border border-black/5 text-slate-600 text-control font-semibold rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1.5">
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
                          <h2 className="text-title font-semibold text-slate-900 font-sans">Review your shift draft</h2>
                          <p className="text-body text-slate-500 mt-1">Check your temporary cover details before posting.</p>
                        </div>
                        <div className="bg-green-50 border border-black/5 rounded-xl px-4 py-3 flex items-center justify-between gap-4">
                          <div>
                            <p className="text-caption text-slate-500">{postForm.facility}</p>
                            <p className="font-bold text-[#368B62] text-body">{postForm.profession} · {postForm.date || 'Date TBC'}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-caption text-slate-500">{postForm.startTime} – {postForm.endTime}</p>
                            <p className="font-bold text-[#368B62] text-body">{postForm.rate ? `${loc.currency}${postForm.rate}/hr` : '—'}</p>
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
                            <div key={label} className="flex items-start justify-between px-4 py-3 text-control gap-4">
                              <span className="text-slate-500 font-medium shrink-0">{label}</span>
                              <span className="font-semibold text-slate-900 text-right">{val}</span>
                            </div>
                          ))}
                        </div>
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input type="checkbox" checked={postForm.termsAccepted} onChange={e => setPostForm(f => ({ ...f, termsAccepted: e.target.checked }))} className="mt-0.5 accent-[#368B62]" />
                          <span className="text-caption text-slate-500">
                            I confirm this shift is genuine and I agree to MployUs{" "}
                            <Link to="/policies/terms" target="_blank" className="text-[#368B62] font-semibold underline">Terms of Service</Link> and{" "}
                            <Link to="/policies/privacy" target="_blank" className="text-[#368B62] font-semibold underline">Privacy Policy</Link>.
                          </span>
                        </label>
                        <div className="flex gap-3">
                          <button onClick={() => setPostStep(3)} className="px-5 py-3 border border-black/5 text-slate-600 text-control font-semibold rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1.5">
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
            <motion.div className="locum-article locum-surface pt-[70px] min-h-screen bg-white"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>

              {/* Sticky breadcrumb bar */}
              <div className="sticky top-[70px] z-20 bg-white border-b border-black/5">
                <div className="site-container py-3.5 flex items-center justify-between">
                  <button onClick={() => setBlogPost(null)} className="flex items-center gap-2 text-control font-semibold text-slate-500 hover:text-slate-900 transition-colors">
                    <ChevronDown className="w-4 h-4 rotate-90" />
                    <span className="hidden sm:inline text-slate-400">Insights</span>
                    <span className="hidden sm:inline text-slate-300">/</span>
                    <span className="text-slate-900 truncate max-w-[260px] sm:max-w-[500px]">{a.title}</span>
                  </button>
                  <span className={`hidden sm:inline-flex items-center px-3 py-1 rounded-full text-caption font-bold border ${a.tagColor}`}>{a.tag}</span>
                </div>
              </div>

              {/* Article hero */}
              <div className="bg-[#edf2e9] px-6 pt-14 pb-16">
                <div className="max-w-[860px] mx-auto">
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-caption font-bold border ${a.tagColor}`}>{a.tag}</span>
                    <span className="text-slate-400 text-caption font-medium">{a.date}</span>
                    <span className="text-slate-600 text-caption">·</span>
                    <span className="text-slate-400 text-caption font-medium">{a.read} read</span>
                  </div>
                  <h1 className="font-display text-hero font-normal text-[#20382c] mb-5">{a.title}</h1>
                  <p className="text-[#53685b] text-body max-w-2xl">{a.subtitle}</p>
                  <img src={a.img} alt="" className="mt-9 aspect-[16/7] w-full rounded-2xl object-cover" />
                </div>
              </div>

              {/* Article body + sidebar */}
              <div className="site-container py-14 grid grid-cols-1 lg:grid-cols-3 gap-14">

                {/* Body */}
                <article className="lg:col-span-2 space-y-8">
                  {a.callout && (
                    <div className="bg-green-50 border-l-4 border-black/5 rounded-r-xl px-5 py-4">
                      <p className="text-body text-[#368B62] font-medium">{a.callout}</p>
                    </div>
                  )}
                  {a.body.map((section, si) => (
                    <motion.div id={`locum-article-section-${si}`} className="scroll-mt-32" key={si} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: si * 0.06 }}>
                      <h2 className="text-title font-semibold text-slate-900 mb-3 font-sans">{section.h}</h2>
                      <p className="text-body text-slate-600">{section.p}</p>
                    </motion.div>
                  ))}

                  {/* Bottom CTA */}
                  <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}
                    className="mt-10 bg-slate-900 rounded-2xl p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                    <div>
                      <p className="text-eyebrow font-bold text-green-400 uppercase mb-1">MployUs Locums</p>
                      <p className="text-white font-bold text-lead">Ready to find your next shift?</p>
                      <p className="text-slate-400 text-caption mt-1">Free to join · No agency fees · Verified employers</p>
                    </div>
                    <button onClick={() => openAuth('signup')}
                      className="shrink-0 px-6 py-3 bg-[#368B62] hover:bg-[#276647] text-white font-bold text-control rounded-xl transition-colors flex items-center gap-2">
                      Create free account <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>

                  {/* Related articles */}
                  {related.length > 0 && (
                    <div className="pt-4">
                      <h3 className="text-title font-semibold text-slate-900 mb-5 font-sans">More from Insights</h3>
                      <div className="space-y-3">
                        {related.map((r, ri) => (
                          <motion.button key={ri} onClick={() => { setBlogPost(articles.indexOf(r)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            className="w-full flex items-start gap-4 p-4 bg-slate-50 hover:bg-white border border-black/5 rounded-2xl text-left transition-all group"
                            whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 400, damping: 22 }}>
                            <div>
                              <div className="flex items-center gap-2 mb-1.5">
                                <span className={`text-caption font-bold px-2 py-0.5 rounded-full border ${r.tagColor}`}>{r.tag}</span>
                                <span className="text-caption text-slate-400 font-medium">{r.read} read</span>
                              </div>
                              <p className="text-body font-bold text-slate-900 group-hover:text-[#368B62] transition-colors">{r.title}</p>
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
                      <p className="text-eyebrow font-bold text-slate-400 uppercase mb-4">In this article</p>
                      <nav className="space-y-2">
                        {a.body.map((s, si) => (
                          <button type="button" key={si} onClick={() => document.getElementById(`locum-article-section-${si}`)?.scrollIntoView({ behavior: "smooth", block: "start" })} className="block text-left text-control text-slate-600 font-medium hover:text-[#368B62] transition-colors py-1 border-l-2 border-transparent hover:border-black/5 pl-3">{s.h}</button>
                        ))}
                      </nav>
                    </div>
                    <div className="bg-[#368B62] rounded-2xl p-5 space-y-3">
                      <p className="text-white font-bold text-body">Find locum shifts near you</p>
                      <p className="text-white/70 text-caption">Verified opportunities. Account-only shift pay. Region-aware support.</p>
                      <button onClick={() => { setBlogPost(null); goto('find-shifts'); }}
                        className="w-full py-2.5 bg-white text-[#368B62] font-bold text-control rounded-xl flex items-center justify-center gap-1.5">
                        Browse shifts <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="bg-white border border-black/5 rounded-2xl p-5">
                      <p className="text-eyebrow font-bold text-slate-400 uppercase mb-4">More articles</p>
                      <div className="space-y-3">
                        {countryArticles.filter(article => article !== a).slice(0, 4).map((r, ri) => (
                          <button key={ri} onClick={() => { setBlogPost(articles.indexOf(r)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            className="w-full text-left group">
                            <span className={`text-caption font-bold px-1.5 py-0.5 rounded border ${r.tagColor}`}>{r.tag}</span>
                            <p className="text-caption font-semibold text-slate-800 mt-1 group-hover:text-[#368B62] transition-colors">{r.title}</p>
                            <p className="text-caption text-slate-400 mt-0.5">{r.read} read · {r.date}</p>
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
        <div className="locum-faq locum-surface pt-[70px] min-h-screen bg-slate-50">

          {/* Hero */}
          <section className="bg-slate-900 px-6 pt-16 pb-20 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.04]" />
            <div className="site-content relative">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-black/5 text-white/80 text-caption font-semibold uppercase tracking-widest mb-5 backdrop-blur-sm">
                <img src={LOCUM_VISUALS.faq.help[0]} alt="" className="locum-reference-icon" /> Help Centre
              </div>
              <h1 className="text-hero font-normal text-white mb-3 font-display">Frequently asked<br />questions</h1>
              <p className="text-white/60 text-body max-w-lg mb-8">Everything you need to know about working with MployUs Locums — for locums and employers alike.</p>
              {/* Tab switcher in hero */}
              <div className="flex items-center gap-2">
                {(['Locum', 'Employers'] as const).map(tab => (
                  <button key={tab} onClick={() => { setFaqTab(tab); setOpenFaq(0); }}
                    className={`px-6 py-2.5 rounded-xl text-control font-bold transition-all ${faqTab === tab ? 'bg-white text-slate-900' : 'bg-white/10 text-white/70 border border-black/5 hover:bg-white/20'}`}>
                    {tab === 'Locum' ? 'For Locums' : 'For Employers'}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Main content */}
          <div className="site-container py-14 grid grid-cols-1 lg:grid-cols-3 gap-14">

            {/* FAQ accordion */}
            <div className="lg:col-span-2 space-y-3">
              {faqs[faqTab].slice(0, faqTab === 'Locum' ? 4 : 5).map((f, i) => {
                const isOpen = openFaq === i;
                return (
                  <motion.div key={f.q}
                    initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.05 }}
                    className={`rounded-2xl border overflow-hidden transition-all duration-200 ${isOpen ? 'border-black/5' : 'bg-white border-black/5 hover:border-black/5'}`}>
                    <button aria-expanded={isOpen} aria-controls={`locum-faq-answer-${i}`} onClick={() => setOpenFaq(isOpen ? null : i)}
                      className={`w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors ${isOpen ? 'bg-[#368B62]' : 'bg-white'}`}>
                      <span className={`text-control font-semibold ${isOpen ? 'text-white' : 'text-slate-900'}`}>{f.q}</span>
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-white/20' : 'bg-slate-50'}`}>
                        {isOpen
                          ? <img src={LOCUM_VISUALS.faq.minus[0]} alt="" className="locum-reference-icon" />
                          : <img src={LOCUM_VISUALS.faq.plus[0]} alt="" className="locum-reference-icon" />}
                      </div>
                    </button>
                    {isOpen && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        id={`locum-faq-answer-${i}`} className="bg-white px-6 pb-6 pt-4 text-control text-slate-600 border-t border-black/5">
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
                  <img src={LOCUM_VISUALS.faq.mail[0]} alt="" className="locum-reference-icon" />
                </div>
                <div className="flex-1">
                  <p className="text-body font-bold text-slate-900 mb-0.5">Still have questions?</p>
                  <p className="text-caption text-slate-500 mb-3">Our team typically responds within 2 hours on business days.</p>
                  <button onClick={() => onBookDemo('FAQ contact')} className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#368B62] hover:bg-[#276647] text-white text-control font-bold rounded-lg transition-colors">
                    Contact support <img src={LOCUM_VISUALS.faq.contactArrow[0]} alt="" className="locum-reference-icon" />
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-5">
              {/* Quick links */}
              <div className="bg-white border border-black/5 rounded-2xl p-5">
                <p className="text-eyebrow font-bold text-slate-400 uppercase mb-4">Quick links</p>
                <div className="space-y-2">
                  {[
                    { label: 'Browse shifts', icon: Search, action: () => goto('find-shifts') },
                    { label: 'Employer dashboard', icon: PlusCircle, action: () => goto('post-shift') },
                    { label: 'Insights & guides', icon: BookOpen, action: () => goto('blog') },
                    { label: 'FAQ', icon: CheckCircle2, action: () => goto('faq') },
                  ].map(({ label, icon: Icon, action }, index) => (
                    <button key={label} onClick={action}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 hover:bg-green-50 hover:text-[#368B62] text-slate-700 text-control font-semibold transition-all group">
                      <img src={LOCUM_VISUALS.faq.quickIcons[index]} alt="" className="locum-reference-icon" />
                      {label}
                      <img src={LOCUM_VISUALS.faq.quickArrows[index]} alt="" className="locum-reference-icon ml-auto" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="bg-slate-900 rounded-2xl p-5 space-y-4">
                <p className="text-eyebrow font-bold text-green-400 uppercase">Platform by the numbers</p>
                {[
                  { value: '2,400+', label: 'Registered locums' },
                  { value: '< 4 hrs', label: 'Avg urgent fill time' },
                  { value: '100%', label: 'Compliance verified' },
                  { value: '£0', label: "Agency fee to locums" },
                ].map(({ value, label }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-white/70 text-caption font-medium">{label}</span>
                    <span className="text-white font-bold text-control">{value}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="bg-white border border-black/5 rounded-2xl p-5 space-y-3">
                <p className="text-body font-bold text-slate-900">Ready to get started?</p>
                <p className="text-caption text-slate-500">Join thousands of pharmacists and employers already on MployUs.</p>
                <button onClick={() => openAuth('signup')} className="w-full py-2.5 bg-[#368B62] hover:bg-[#276647] text-white font-bold text-control rounded-xl transition-colors">
                  Create free account
                </button>
                <button onClick={() => openAuth('signin')} className="w-full py-2.5 border border-black/5 text-slate-700 font-semibold text-control rounded-xl hover:border-black/5 transition-colors">
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
        description={<><p>Flexible shifts. More time for you.<br />Healthcare in Ireland &amp; the UK.</p><div className="mt-3 flex flex-wrap gap-3">{(Object.keys(REGIONS) as Region[]).map(country => <button key={country} onClick={() => applyRegion(country)} aria-pressed={region === country} className="text-control text-[#62748e] transition-colors hover:text-[#368B62] aria-pressed:text-[#368B62]"><span>{REGIONS[country].flag}</span> {REGIONS[country].country}</button>)}</div></>}
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
                        <h3 className="text-title font-semibold text-slate-900 font-sans">Choose account type</h3>
                        <p className="text-body text-slate-500 mt-0.5">Tell us how you'll use MployUs Locums.</p>
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
                                  <span className="font-medium text-slate-900 text-body">Register as a {r.key === 'Client' ? 'Facility' : r.key}</span>
                                  <span className={`text-caption font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full ${active ? 'bg-green-200 text-green-800' : 'bg-slate-100 text-slate-500'}`}>{r.badge}</span>
                                </div>
                                <p className="text-caption text-slate-500 mt-2">{r.desc}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                      <button disabled={!role} onClick={() => { if (role === 'Locum') { setAuthModal(null); setRegWizardOpen(true); } else { setSignupStep('details'); } }} className="w-full py-3 bg-[#368B62] disabled:opacity-40 text-white text-control font-bold rounded-xl transition-all flex items-center justify-center gap-1.5">
                        Continue <ChevronRight className="w-4 h-4" />
                      </button>
                      <p className="text-center text-caption text-slate-500">Already have an account? <button onClick={() => setAuthModal('signin')} className="font-bold text-[#368B62] hover:underline">Sign in</button></p>
                    </div>
                  )}

                  {signupStep === 'details' && (
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-title font-semibold text-slate-900 font-sans">Account setup</h3>
                        <p className="text-body text-slate-500 mt-0.5">Your form adapts to your profession's registration body.</p>
                      </div>
                      {role === 'Locum' && (
                        <div className="relative">
                          <select value={setupProfession.name} onChange={e => setSetupProfession(PROFESSIONS.find(p => p.name === e.target.value)!)} className="w-full appearance-none px-4 py-3 rounded-xl bg-slate-50 border border-black/5 text-control font-semibold text-slate-800 outline-none cursor-pointer">
                            {PROFESSIONS.map(p => <option key={p.name}>{p.name}</option>)}
                          </select>
                          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      )}
                      {role === 'Locum' && (
                        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50 border border-amber-200">
                          <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <p className="text-caption text-amber-800"><span className="font-bold">Verification required.</span> After registration, you'll need to upload your registration certificate, Garda vetting / DBS, and indemnity insurance before applying for shifts.</p>
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-50 border border-black/5 focus-within:border-green-400 transition-colors">
                          <Users className="w-4 h-4 text-slate-400 shrink-0" />
                          <input placeholder={role === 'Client' ? 'Facility name' : 'Full name'} className="bg-transparent text-control outline-none w-full" />
                        </div>
                        <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-50 border border-black/5 focus-within:border-green-400 transition-colors">
                          <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                          <input placeholder="Email" className="bg-transparent text-control outline-none w-full" />
                        </div>
                      </div>
                      {role === 'Locum' && setupProfession.reg && (
                        <div className="p-4 rounded-xl bg-green-50 border border-black/5 space-y-2">
                          <label className="block text-caption font-bold text-green-900">{setupProfession.reg} <span className="text-rose-500">*</span></label>
                          <input placeholder={`Enter your ${setupProfession.reg}`} className="w-full px-3 py-2.5 rounded-lg bg-white border border-black/5 text-control outline-none" />
                        </div>
                      )}
                      <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-50 border border-black/5 focus-within:border-green-400 transition-colors">
                        <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                        <input placeholder="Mobile number" className="bg-transparent text-control outline-none w-full" />
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setSignupStep('role')} className="px-4 py-3 text-control font-semibold text-slate-500 hover:text-slate-900">← Back</button>
                        <button onClick={() => setSignupStep('verify')} className="flex-1 py-3 bg-[#368B62] text-white text-control font-bold rounded-xl flex items-center justify-center gap-1.5">
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
                        <h3 className="text-title font-semibold text-slate-900 font-sans">Verify your phone</h3>
                        <p className="text-body text-slate-500 mt-1">Enter the 6-digit code we texted to your mobile.</p>
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
                            className="w-11 h-13 text-center text-control font-bold rounded-xl bg-slate-50 border border-black/5 outline-none focus:border-green-500 transition-colors"
                          />
                        ))}
                      </div>
                      <button onClick={() => { onBookDemo('Account created'); setAuthModal(null); }} className="w-full py-3 bg-[#368B62] text-white text-control font-bold rounded-xl">
                        Verify & Continue
                      </button>
                      <button className="text-control text-slate-400 hover:text-slate-700 font-medium">Resend code</button>
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
              <h4 className="text-control font-bold text-slate-900">Cookie preferences</h4>
              <p className="text-caption text-slate-500 mt-0.5">Optional preferences are off until you choose. <Link to="/policies/cookies" className="underline">Cookie policy</Link></p>
            </div>
          </div>
          {cookiePrefsOpen && (
            <LocumDialog onClose={() => setCookiePrefsOpen(false)} closeLabel="Close cookie preferences" title="Your visit. Your choice." description="Choose what you’re comfortable with. Optional preferences remain off until you choose them." headline={"A considered visit.\nA choice that’s yours."}>
              <div className="space-y-5 p-7">
                <p className="text-body text-slate-500">Necessary preferences support the requested experience. Optional switches record your choices.</p>
                <div className="space-y-3">
                  {([
                    { key: 'necessary', label: 'Necessary', detail: 'Essential settings and your saved consent choice. Always on.', locked: true },
                    { key: 'functional', label: 'Functional', detail: 'Your preference for additional convenience features.', locked: false },
                    { key: 'performance', label: 'Performance', detail: 'Your preference for optional usage analytics.', locked: false },
                    { key: 'targeting', label: 'Targeting', detail: 'Your preference for optional advertising technologies.', locked: false },
                  ] as const).map(pref => <label key={pref.key} className="flex items-center justify-between gap-5 rounded-2xl bg-[#f5f8f6] p-5"><span><span className="block text-control font-medium text-[#24332d]">{pref.label}</span><span className="mt-1 block text-caption text-slate-500">{pref.detail}</span></span><input type="checkbox" role="switch" disabled={pref.locked} checked={cookiePrefs[pref.key]} onChange={event => setCookiePrefs(preferences => ({ ...preferences, [pref.key]: event.target.checked }))} className="h-5 w-5 shrink-0 accent-[#368B62] disabled:opacity-50" /></label>)}
                </div>
                <button onClick={() => saveCookiePreferences(cookiePrefs)} className="w-full rounded-full bg-[#368B62] py-3.5 text-control font-semibold text-white hover:bg-[#286d4c]">Save my preferences</button>
                <div className="grid grid-cols-2 gap-3"><button onClick={() => saveCookiePreferences({ necessary: true, functional: true, performance: true, targeting: true })} className="rounded-full border border-black/5 py-3 text-control font-semibold text-[#53685b] hover:bg-[#edf4ef]">Accept all</button><button onClick={() => saveCookiePreferences({ necessary: true, functional: false, performance: false, targeting: false })} className="rounded-full border border-black/5 py-3 text-control font-semibold text-[#53685b] hover:bg-[#edf4ef]">Reject optional</button></div>
                <p className="text-center text-caption text-slate-400">Change your choices anytime in the footer. <Link to="/policies/cookies" className="text-[#368B62] underline">Read the cookie policy</Link></p>
              </div>
            </LocumDialog>
          )}
          <div className="flex gap-2">
            <button onClick={() => cookiePrefsOpen ? saveCookiePreferences(cookiePrefs) : setCookiePrefsOpen(true)} className="flex-1 py-2 text-control font-semibold text-slate-600 border border-black/5 rounded-lg hover:bg-slate-50 transition-colors">
              {cookiePrefsOpen ? 'Save' : 'Manage'}
            </button>
            <button onClick={() => saveCookiePreferences({ necessary: true, functional: true, performance: true, targeting: true })} className="flex-1 py-2 text-control font-semibold bg-[#368B62] hover:bg-[#286d4c] text-white rounded-lg transition-colors">
              Accept all
            </button>
            <button onClick={() => saveCookiePreferences({ necessary: true, functional: false, performance: false, targeting: false })} className="flex-1 rounded-lg border border-black/5 py-2 text-control font-semibold text-slate-600 hover:bg-slate-50">Reject optional</button>
          </div>
        </div>
      )}
    </div>
  );
};
