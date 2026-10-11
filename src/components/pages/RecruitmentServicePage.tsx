import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';
import { ModernServiceHero } from '../PlatformExperiences';
import { RecruitmentAuthScreen, type RecruitmentAuthMode } from '../RecruitmentAuthScreen';
import { Footer } from '../Footer';
import { RecruitmentDialog } from '../RecruitmentDialog';
import { RecruitmentCVDialog } from '../RecruitmentCVDialog';
import { RecruitmentArticle, type RecruitmentStory } from './RecruitmentArticle';
import { RecruitmentRoleDetails } from './RecruitmentRoleDetails';
import { RECRUITMENT_JOB_REGIONS as JOB_REGIONS, getRoleReference, type RecruitmentRole } from '../../data/recruitmentRoleDetails';
import './recruitment-article.css';
import {
  ArrowRight, Menu, X, Globe, Clock, Target, Users,
  Check, Mail, Phone, Building2, Briefcase, Send, CheckCircle2,
  Plus, Minus, FileText, ChevronRight, Search, MapPin,
  Star, Award, TrendingUp, Shield, Car, Bus, Bike, Plane,
} from 'lucide-react';

// ── Figma images ──────────────────────────────────────────────────────────────
import imgLouis        from '@/src/imports/RecruitmentLandingPage/f8040af1a61ac9ad59fd58c84658cc44062206ba.png';
import imgLogistics    from '@/src/imports/RecruitmentLandingPage/aa37e48f6c02d0a65f199fa158471a8040b91305.png';
import imgHealthcare   from '@/src/imports/RecruitmentLandingPage/49d7528f8b3dc57a0295eda062854be297056b4d.png';
import imgHospitality  from '@/src/imports/RecruitmentLandingPage/8c1cea987026a18528cb0bf86f4f814bb9bd4034.png';
import imgEducation    from '@/src/imports/RecruitmentLandingPage/c511b99cc403642ea75f66bac88e333cc5768037.png';
import imgBlog1        from '@/src/imports/RecruitmentLandingPage/91cecfeff21bc6df8c61a3e31d6514b7efb231a6.png';
import imgBlog2        from '@/src/imports/RecruitmentLandingPage/7941db92e4d97482ed49a8f1a6fe4be0fca9562d.png';
import imgBlog3        from '@/src/imports/RecruitmentLandingPage/aaf772a81b05c538b61b11fa0d9c097a44c4309c.png';
import imgSarah        from '@/src/imports/RecruitmentLandingPage/40b658c00757bb1aeede15376b9e7b2d32234f5c.png';
import imgJames        from '@/src/imports/RecruitmentLandingPage/99891f367ad1c536e61556060274079b908b6cc0.png';
import imgMichael      from '@/src/imports/RecruitmentLandingPage/ca27e31ef2c2e6763717010455537962ccdd0fe8.png';
import imgMployUs      from '@/src/imports/RecruitmentLandingPage/afa262f7bab0644138f6a6848b0032c4e2a7d048.png';
import imgHiring       from '@/src/imports/RecruitmentLandingPage/d7b4f06932544d5c20501c4962c2946b7d37b4f0.png';

type Page = 'home' | 'jobseekers' | 'role' | 'employers' | 'blog' | 'article' | 'contact';

interface Props {
  onBackToHome: () => void;
  onBookDemo: (moduleTitle?: string) => void;
  onStartTrial: () => void;
}

// ── Design tokens ─────────────────────────────────────────────────────────────
const P   = '#810161';           // primary magenta
const TD  = '#24332d';           // text dark
const TM  = '#68716c';           // text medium
const TT  = '#67716b';           // text muted / tag
const TN  = '#4b5750';           // nav link colour
const BGL = '#f8f8f5';           // bg light
const BD  = 'rgba(0,0,0,0.05)'; // border — 1px black 5%
const BDL = 'rgba(0,0,0,0.05)'; // border light — same

// ── Animation primitives ─────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};
const staggerGrid = (delay = 0.08) => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay } },
});

const Reveal = ({
  children, className = '', delay = 0,
}: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-56px' }}
    variants={{
      ...fadeUp,
      visible: { ...fadeUp.visible, transition: { ...(fadeUp.visible as any).transition, delay } },
    }}
  >
    {children}
  </motion.div>
);

// ── Tiny shared components ────────────────────────────────────────────────────
const Eyebrow = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <p className="text-[13px] font-['DM_Sans',sans-serif] uppercase font-normal mb-3"
    style={{ color: light ? 'rgba(255,255,255,0.6)' : TT, letterSpacing: '1.56px' }}>
    {children}
  </p>
);

const H1 = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <h1 className={`font-['DM_Sans',sans-serif] text-[42px] sm:text-[56px] leading-[1.08] font-medium tracking-[-0.02em] ${className}`}
    style={{ color: TD }}>
    {children}
  </h1>
);

const H2 = ({ children, className = '', light = false }: { children: React.ReactNode; className?: string; light?: boolean }) => (
  <h2 className={`font-['DM_Sans',sans-serif] text-[30px] sm:text-[38px] leading-[1.15] font-medium ${className}`}
    style={{ color: light ? 'white' : TD }}>
    {children}
  </h2>
);

const Fade = ({ children }: { children: React.ReactNode }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
    {children}
  </motion.div>
);

const IconField = ({
  icon: Icon, placeholder, type = 'text', value = '', onChange,
}: {
  icon: React.ElementType; placeholder: string; type?: string;
  value?: string; onChange?: (v: string) => void;
}) => (
  <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-black/5"
    style={{ backgroundColor: BGL }}>
    <Icon className="w-4 h-4 shrink-0" style={{ color: TT }} />
    <input type={type} placeholder={placeholder} value={value}
      onChange={e => onChange?.(e.target.value)}
      className="bg-transparent text-[14px] outline-none w-full" style={{ color: TD }} />
  </div>
);

// ── Data ──────────────────────────────────────────────────────────────────────
const ALL_ROLES = [
  { title: 'Warehouse Operative',     location: 'Dublin',   type: 'Contract',  sector: 'Logistics',     salary: '€13–€15/hr',        desc: 'Picking, packing, and goods-in duties for a busy FMCG distributor. Immediate start. Full training provided.' },
  { title: 'Staff Nurse (General)',   location: 'Cork',     type: 'Permanent', sector: 'Healthcare',    salary: '€38,000–€48,000',   desc: 'NMBI registration required. Rotating roster, excellent CPD budget, and public sector pay scales.' },
  { title: 'Hotel Receptionist',      location: 'Galway',   type: 'Permanent', sector: 'Hospitality',   salary: '€27,000–€30,000',   desc: "Front-of-house role for a 4-star property on Galway's waterfront. Previous hospitality experience essential." },
  { title: 'SNA (Special Needs Asst)', location: 'Dublin',  type: 'Contract',  sector: 'Education',     salary: '€15–€18/hr',        desc: 'Supporting students with additional learning needs in a primary school. Garda vetting required.' },
  { title: 'Supply Chain Coordinator', location: 'Limerick', type: 'Permanent', sector: 'Logistics',    salary: '€35,000–€42,000',   desc: 'End-to-end supply chain visibility. Strong Excel, ERP experience, and logistics degree preferred.' },
  { title: 'Care Assistant',           location: 'Dublin',  type: 'Contract',  sector: 'Healthcare',    salary: '€13.50–€15/hr',     desc: 'Residential care. QQI Level 5 Care Skills required. Early, late, and weekend shifts available.' },
  { title: 'Head Chef',                location: 'Kilkenny', type: 'Permanent', sector: 'Hospitality',  salary: '€42,000–€52,000',   desc: 'Leading a brigade in a busy gastropub. Strong Irish market knowledge and proven menu development skills.' },
  { title: 'Secondary School Teacher', location: 'Cork',    type: 'Permanent', sector: 'Education',     salary: '€37,000–€58,000',   desc: 'Teaching post (maths/science) in a well-resourced secondary school. Teaching Council registration required.' },
  { title: 'Transport Manager',        location: 'Athlone', type: 'Permanent', sector: 'Logistics',     salary: '€50,000–€60,000',   desc: "CPC holder with fleet management experience. Responsible for a fleet of 18 HGVs across the Midlands route." },
  { title: 'Physiotherapist',          location: 'Galway',  type: 'Contract',  sector: 'Healthcare',    salary: '€28–€34/hr',        desc: 'Community-based outpatient caseload. CORU registration required. 6-month rolling contract with renewal.' },
  { title: 'Staff Nurse', location: 'Belfast', type: 'Permanent', sector: 'Healthcare', salary: '£30,000–£38,000', desc: 'Illustrative nursing role in Northern Ireland. NMC registration required; exact duties and roster to be confirmed.' },
  { title: 'Warehouse Team Leader', location: 'Manchester', type: 'Permanent', sector: 'Logistics', salary: '£28,000–£34,000', desc: 'Illustrative warehouse leadership role in England, supporting safe operations and daily team coordination.' },
  { title: 'Hotel Receptionist', location: 'Cardiff', type: 'Contract', sector: 'Hospitality', salary: '£13–£15/hr', desc: 'Illustrative front-of-house role in Wales, welcoming guests and coordinating reservations.' },
  { title: 'Care Assistant', location: 'Edinburgh', type: 'Permanent', sector: 'Healthcare', salary: '£25,000–£29,000', desc: 'Illustrative care role in Scotland. Experience, registration and safeguarding checks to be confirmed.' },
];

const LOCATIONS = ['All Locations', 'Dublin', 'Cork', 'Galway', 'Limerick', 'Kilkenny', 'Athlone', 'Belfast', 'Manchester', 'Cardiff', 'Edinburgh'];
const findRoleFromUrl = () => {
  const reference = new URLSearchParams(window.location.search).get('recruitment-role');
  return ALL_ROLES.find(role => getRoleReference(role, ALL_ROLES) === reference) || null;
};
const SECTORS   = ['All Sectors', 'Logistics', 'Healthcare', 'Hospitality', 'Education'];
const JOB_TYPES = ['All Types', 'Permanent', 'Contract'];

const ARTICLES = [
  { img: imgBlog1, cat: 'Industry', date: 'Feb 12, 2026', read: '5 min', title: 'How Irish SMEs are rethinking recruitment in 2026',              excerpt: 'The Irish SME landscape is changing fast. Here is how smart companies are restructuring their hiring strategies.' },
  { img: imgBlog2, cat: 'Strategy', date: 'Feb 6, 2026',  read: '4 min', title: 'Contract vs. permanent: which model fits your growth stage?',   excerpt: 'Choosing between contract and permanent hiring is one of the most consequential decisions a growing business makes.' },
  { img: imgBlog3, cat: 'Trends',   date: 'Jan 28, 2026', read: '6 min', title: 'Workforce trends shaping healthcare staffing this year',        excerpt: 'From SNA shortages to nursing emigration, the healthcare staffing landscape in Ireland is undergoing significant shifts.' },
  { img: imgLogistics,   cat: 'Industry', date: 'Jan 14, 2026', read: '4 min', title: 'Why logistics companies struggle to retain warehouse staff',    excerpt: 'High turnover in warehouse and logistics roles is costing Irish companies millions. We look at what drives attrition.' },
  { img: imgHospitality, cat: 'Strategy', date: 'Jan 7, 2026',  read: '3 min', title: 'Building a hospitality team that survives the summer peak',   excerpt: 'Seasonal demand spikes are predictable — your hiring strategy should be too. Practical steps to staff up fast.' },
  { img: imgEducation,   cat: 'Trends',   date: 'Dec 18, 2025', read: '5 min', title: 'The SNA shortage in Irish schools: what recruiters are seeing', excerpt: 'Special Needs Assistants are in critically short supply across Ireland. What we are seeing from the recruitment trenches.' },
].map(article => ({ ...article, region: 'Ireland' })).concat([
  { img: imgHiring, cat: 'Strategy', date: 'Oct 5, 2026', read: '4 min', region: 'UK', title: 'Hiring across the UK: a regional approach', excerpt: 'A practical introduction to recruitment planning across England, Northern Ireland, Wales and Scotland.' },
  { img: imgHealthcare, cat: 'Industry', date: 'Oct 5, 2026', read: '5 min', region: 'UK', title: 'Building resilient healthcare teams in the UK', excerpt: 'Balancing permanent recruitment and flexible cover while understanding local registration requirements.' },
]);

const TESTIMONIALS = [
  { img: imgSarah,   quote: '"MployUs cut our hiring timeline from eight weeks to twelve days. The candidates they presented actually understood our industry."', name: 'Sarah Jenkins',  role: 'HR Director, TechFlow Solutions' },
  { img: imgJames,   quote: '"Finding a Home Manager with the right clinical background and leadership skills is notoriously hard. MployUs delivered a shortlist in under two weeks."', name: 'Dr. James Wilson', role: 'Clinical Director, Sláinte Care Group' },
  { img: imgMichael, quote: '"We needed 14 warehouse operatives ahead of peak season. MployUs had them placed, vetted, and inducted within ten days."', name: 'Michael Chen',   role: 'Operations Manager, FastFreight IE' },
];

const SERVICES = [
  { n: '01', type: 'Permanent',  title: 'Permanent Placement',              desc: "Long-term hires for core roles. We identify, screen, and present candidates who'll grow with your organisation." },
  { n: '02', type: 'Contract',   title: 'Contract Staffing',                desc: 'Flexible staff for project-based work, seasonal peaks, or maternity cover without the overhead of permanent hires.' },
  { n: '03', type: 'Talent Solutions', title: 'Talent Solutions', desc: 'From workforce planning to volume hiring, we embed in your process and work as an extension of your HR team.' },
  { n: '04', type: 'Executive',  title: 'Executive Search',                 desc: "Discreet headhunting for C-suite and senior leadership. We access networks that job boards can't reach." },
];

const FAQS = [
  { q: 'How quickly can you fill a vacancy?',       a: 'For permanent roles we typically deliver a qualified shortlist within 5–10 business days. Urgent or temporary cover can be arranged within 24–48 hours. Executive searches run on a 3–4 week shortlist timeline.' },
  { q: 'What sectors do you recruit for?',          a: 'We specialise in logistics, healthcare & nursing, hospitality, and education across Ireland and the UK. We also recruit for technology, finance, and professional services on request.' },
  { q: 'How do you verify candidate compliance?',   a: 'All candidates undergo enhanced DBS (UK) or Garda vetting (Ireland), right-to-work checks, professional licence verification, and two structured professional references before presentation.' },
  { q: 'What does your service cost?',              a: 'Permanent placements are priced as a percentage of first-year salary, agreed in writing before search begins. Contract staffing operates on a weekly pay-and-margin model with full transparency.' },
  { q: "I'm a candidate — how do I register?",     a: "Upload your CV via our candidate portal and a consultant will contact you within one business day. We'll match you to live roles and keep you on our radar as new opportunities arise." },
  { q: 'Do you offer a placement guarantee?',       a: 'Yes. Every permanent placement is backed by a 90-day free replacement guarantee. If a candidate leaves within 90 days for reasons within our control, we re-recruit at no additional cost.' },
  { q: 'Can you handle volume hiring?',             a: 'Absolutely. Our RPO offering is purpose-built for volume and project-based recruitment. We have placed 200+ workers in a single campaign for logistics and healthcare clients.' },
];

// ═════════════════════════════════════════════════════════════════════════════
export const RecruitmentServicePage: React.FC<Props> = ({ onBackToHome, onBookDemo }) => {
  const [page, setPage] = useState<Page>(() => findRoleFromUrl() ? 'role' : 'home');
  const [activeRole, setActiveRole] = useState<RecruitmentRole | null>(findRoleFromUrl);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [authMode, setAuthMode] = useState<RecruitmentAuthMode>('login');
  const openAuth = (mode: RecruitmentAuthMode) => { setAuthMode(mode); setLoginOpen(true); setMobileOpen(false); };
  const [headcount, setHeadcount] = useState('1');
  const [employerCompany, setEmployerCompany] = useState('');
  const [employerRegion, setEmployerRegion] = useState('Ireland');
  const [blogRegion, setBlogRegion] = useState('All');
  const [activeArticle, setActiveArticle] = useState<RecruitmentStory | null>(null);
  const readArticle = (article: RecruitmentStory) => {
    setActiveArticle(article);
    goTo('article');
    const url = new URL(window.location.href);
    url.searchParams.set('recruitment-article', article.title);
    window.history.replaceState(window.history.state, '', url);
  };
  useEffect(() => {
    if (findRoleFromUrl()) return;
    const title = new URLSearchParams(window.location.search).get('recruitment-article');
    const article = ARTICLES.find(item => item.title === title);
    if (article) { setActiveArticle(article); setPage('article'); }
  }, []);
  useEffect(() => {
    if (page === 'article') return;
    const url = new URL(window.location.href);
    url.searchParams.delete('recruitment-article');
    window.history.replaceState(window.history.state, '', url);
  }, [page]);
  useEffect(() => {
    const url = new URL(window.location.href);
    if (page === 'role' && activeRole) {
      url.searchParams.set('recruitment-role', getRoleReference(activeRole, ALL_ROLES));
      url.searchParams.delete('recruitment-article');
    } else {
      url.searchParams.delete('recruitment-role');
    }
    window.history.replaceState(window.history.state, '', url);
  }, [page, activeRole]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [sortBy, setSortBy] = useState<'title' | 'salary' | 'location' | 'added'>('title');
  const [filterRegion, setFilterRegion] = useState('All regions');

  // Contact modal
  const [contactOpen, setContactOpen]   = useState(false);
  const [contactStep, setContactStep]   = useState<1 | 2 | 3 | 4>(1);
  const [contactForm, setContactForm]   = useState({ name: '', email: '', phone: '', company: '', role: '', message: '' });

  // CV modal
  const [cvOpen, setCvOpen]   = useState(false);

  // Apply modal
  const [applyOpen,  setApplyOpen]  = useState(false);
  const [applyStep,  setApplyStep]  = useState<1 | 2 | 3 | 4>(1);
  const [applyRole,  setApplyRole]  = useState<typeof ALL_ROLES[0] | null>(null);
  const [applyForm,  setApplyForm]  = useState({
    firstName: '', lastName: '', email: '', phone: '',
    yearsExp: '', transport: '', coverNote: '', questions: '',
    availabilityConfirmed: false, termsAccepted: false,
  });

  const openApply = (role: typeof ALL_ROLES[0]) => {
    setApplyRole(role);
    setApplyStep(1);
    setApplyForm({ firstName: '', lastName: '', email: '', phone: '', yearsExp: '', transport: '', coverNote: '', questions: '', availabilityConfirmed: false, termsAccepted: false });
    setApplyOpen(true);
  };
  const closeApply = () => setApplyOpen(false);

  // FAQ
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Blog filter
  const [blogCat, setBlogCat] = useState('All');

  // Job filters
  const [jobKeyword,  setJobKeyword]  = useState('');
  const [jobLocation, setJobLocation] = useState('All Locations');
  const [jobSector,   setJobSector]   = useState('All Sectors');
  const [jobType,     setJobType]     = useState('All Types');
  const [openRoleIdx, setOpenRoleIdx] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  useEffect(() => { setSelectedIdx(0); }, [jobKeyword, jobLocation, jobSector, jobType, filterRegion, sortBy]);

  const goTo = (p: Page) => { setPage(p); setMobileOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const readRole = (role: RecruitmentRole) => { setActiveRole(role); goTo('role'); };
  const navPage = page === 'role' ? 'jobseekers' : page;

  const openContact = () => { setContactStep(1); setHeadcount('1'); setEmployerCompany(''); setEmployerRegion('Ireland'); setContactForm({ name: '', email: '', phone: '', company: '', role: '', message: '' }); setMobileOpen(false); setContactOpen(true); };
  const openCV = () => { setApplyOpen(false); setCvOpen(true); };

  const filteredRoles = useMemo(() => ALL_ROLES.filter(r => {
    const kw = jobKeyword.toLowerCase();
    const matchKw = !kw || r.title.toLowerCase().includes(kw) || r.sector.toLowerCase().includes(kw) || r.desc.toLowerCase().includes(kw);
    const matchLoc = jobLocation === 'All Locations' || r.location === jobLocation;
    const matchSec = jobSector   === 'All Sectors'   || r.sector   === jobSector;
    const matchTyp = jobType     === 'All Types'     || r.type     === jobType;
    return matchKw && matchLoc && matchSec && matchTyp;
  }), [jobKeyword, jobLocation, jobSector, jobType]);

  const visibleArticles = ARTICLES.filter(article => (blogCat === 'All' || article.cat === blogCat) && (blogRegion === 'All' || article.region === blogRegion));

  const NAV = [
    { label: 'Home',            p: 'home'        as Page },
    { label: 'For Jobseekers',  p: 'jobseekers'  as Page },
              { label: 'Hire talent',   p: 'employers'   as Page },
    { label: 'Blog',            p: 'blog'        as Page },
    { label: 'Contact Us',      p: 'contact'     as Page },
  ];

  // ── Shared blocks ────────────────────────────────────────────────────────────
  const Industries = () => (
    <section style={{ backgroundColor: BGL }} className="py-16 border-y border-black/5">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <Reveal className="flex items-end justify-between mb-10">
          <div><Eyebrow>Industries we serve</Eyebrow><H2 className="max-w-sm">Deep expertise in sectors that matter</H2></div>
          <motion.button onClick={() => goTo('jobseekers')} className="hidden sm:flex items-center gap-2 text-[14px]"
            style={{ color: TD }}
            whileHover={{ x: 2 }}
            onMouseEnter={e => (e.currentTarget.style.color = P)} onMouseLeave={e => (e.currentTarget.style.color = TD)}>
            View roles <ArrowRight className="w-4 h-4" />
          </motion.button>
        </Reveal>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-56px' }}
          variants={staggerGrid(0.1)}
        >
          {[
            { img: imgLogistics,   label: 'Logistics',    sub: 'Warehouse, Supply Chain, Transport' },
            { img: imgHealthcare,  label: 'Healthcare',   sub: 'Nursing, Allied Health, Medical Admin' },
            { img: imgHospitality, label: 'Hospitality',  sub: 'Hotels, Restaurants, Events' },
            { img: imgEducation,   label: 'Education',    sub: 'Teaching, SNA, Administration' },
          ].map(ind => (
            <motion.div key={ind.label} variants={fadeUp}
              onClick={() => { setJobSector(ind.label); goTo('jobseekers'); }}
              className="relative rounded-xl overflow-hidden h-[300px] group cursor-pointer"
              whileHover={{ scale: 1.015 }}
              transition={{ type: 'spring', stiffness: 380, damping: 26 }}
            >
              <img src={ind.img} alt={ind.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-600 group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(16,24,40,0.82) 0%, rgba(16,24,40,0.18) 50%, transparent 100%)' }} />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-white text-[18px] font-medium">{ind.label}</p>
                <p className="text-[13px] mt-1" style={{ color: 'rgba(255,255,255,0.65)' }}>{ind.sub}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );

  const Testimonials = () => (
    <section className="py-16 bg-white border-y border-black/5">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <Reveal><Eyebrow>Client stories</Eyebrow><H2 className="mb-10 max-w-sm">Trusted by companies across Ireland</H2></Reveal>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-56px' }}
          variants={staggerGrid(0.12)}
        >
          {TESTIMONIALS.map(t => (
            <motion.div key={t.name} variants={fadeUp}
              className="bg-white rounded-xl p-6 border border-black/5 flex flex-col gap-5"
              whileHover={{ y: -3, borderColor: 'rgba(0,0,0,0.05)' }}
              transition={{ type: 'spring', stiffness: 380, damping: 26 }}
            >
              <p className="text-[15px] leading-[1.65] flex-1" style={{ color: TN }}>{t.quote}</p>
              <div className="flex items-center gap-3">
                <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-[14px] font-medium" style={{ color: P }}>{t.name}</p>
                  <p className="text-[12px]" style={{ color: TT }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );

  const Newsletter = () => (
    <section className="py-14 px-6 text-center text-white" style={{ backgroundColor: P }}>
      <div className="max-w-xl mx-auto">
        <Eyebrow light>Stay in the loop</Eyebrow>
        <h2 className="font-['DM_Sans',sans-serif] text-[32px] font-normal leading-snug mb-2">Hiring insights, market trends &amp; salary reports</h2>
        <p className="text-[14px] mb-7 text-white/70">Delivered monthly. No spam, ever.</p>
        <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <div className="flex items-center gap-2.5 flex-1 px-4 py-3 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <Mail className="w-4 h-4 text-white/50 shrink-0" />
            <input placeholder="Enter your email" className="bg-transparent text-white text-[14px] placeholder-white/50 outline-none w-full" />
          </div>
          <button onClick={() => onBookDemo('Newsletter')} className="px-5 py-3 rounded-lg font-medium text-[14px]" style={{ backgroundColor: 'white', color: P }}>Subscribe</button>
        </div>
      </div>
    </section>
  );

  const FaqBlock = ({ max }: { max?: number }) => (
    <div className="space-y-1.5">
      {(max ? FAQS.slice(0, max) : FAQS).map((f, i) => {
        const open = openFaq === i;
        return (
          <div key={f.q} className="border border-black/5 rounded-xl overflow-hidden"
            style={{ borderColor: open ? 'rgba(129,1,97,0.2)' : 'rgba(0,0,0,0.05)' }}>
            <motion.button onClick={() => setOpenFaq(open ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
              style={{ backgroundColor: open ? P : 'white' }}
              whileTap={{ scale: 0.99 }}
            >
              <span className="text-[14px] font-medium leading-snug" style={{ color: open ? 'white' : TD }}>{f.q}</span>
              <motion.div
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: open ? 'rgba(255,255,255,0.18)' : BGL }}
                animate={{ rotate: open ? 45 : 0 }}
                transition={{ duration: 0.22 }}
              >
                <Plus className="w-3.5 h-3.5" style={{ color: open ? 'white' : TT }} />
              </motion.div>
            </motion.button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key="faq-content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 pt-4 text-[14px] leading-relaxed border-t border-black/5" style={{ color: TM }}>{f.a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );

  // ── PAGES ────────────────────────────────────────────────────────────────────

  const HomePage = () => (
    <Fade>
      <ModernServiceHero kind="recruitment" image={imgSarah} onPrimary={() => goTo('jobseekers')} onSecondary={openContact} />

      <section className="border-b border-black/5 bg-white px-6 py-10"><div className="mx-auto grid max-w-[1184px] gap-6 md:grid-cols-2 md:gap-20"><p className="text-2xl font-medium leading-snug text-[#24332d]">Not just a recruitment agency.<br />A partner for your next chapter.</p><p className="text-sm leading-7 text-[#68716c]">From your first conversation to your next opportunity, we take the time to understand what matters. Specialist support for logistics, healthcare, hospitality and education across Ireland and the UK.</p></div></section>

      {/* Features */}
      <section style={{ backgroundColor: BGL }} className="py-16 border-y border-black/5">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <Reveal><Eyebrow>What we offer</Eyebrow></Reveal>
          <Reveal delay={0.06}><H2 className="mb-10 max-w-md">Recruitment services built around your business</H2></Reveal>
          <motion.div
            className="rounded-xl overflow-hidden border border-black/5"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-56px' }}
            variants={staggerGrid(0.1)}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-x divide-y divide-black/5">
              {[
                { icon: Globe,   label: 'Global Talent Access', desc: 'Source skilled professionals across multiple industries and geographies, with deep roots in the Irish market.' },
                { icon: Target,  label: 'Local & Remote Roles',  desc: 'Flexible hiring models whether you need on-site staff in Dublin or remote specialists working from anywhere.' },
                { icon: Check,   label: 'Right-Fit Matching',    desc: 'Our sourcing process goes beyond CVs. We evaluate culture fit, technical skills, and long-term potential.' },
                { icon: Clock,   label: 'Faster Time-to-Hire',   desc: 'Streamlined workflows and a pre-vetted talent pool mean you fill roles in days, not months.' },
              ].map(({ icon: Icon, label, desc }) => (
                <motion.div key={label} variants={fadeUp}
                  className="bg-white p-8 flex flex-col gap-6 group cursor-default"
                  whileHover={{ backgroundColor: 'rgba(129,1,97,0.02)' }}
                >
                  <motion.div whileHover={{ scale: 1.1, rotate: 3 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
                    <Icon className="w-5 h-5" style={{ color: TT }} strokeWidth={1.25} />
                  </motion.div>
                  <div>
                    <p className="text-[16px] font-medium mb-2" style={{ color: P }}>{label}</p>
                    <p className="text-[14px] leading-[1.65]" style={{ color: TM }}>{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hiring solutions */}
      <section className="py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-12 lg:gap-16">
          <motion.div
            className="w-full lg:w-[420px] shrink-0 rounded-xl overflow-hidden border border-black/5"
            style={{ minHeight: '340px' }}
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-56px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src={imgHiring} alt="Hiring discussion" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div
            className="flex-1 space-y-3"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-56px' }}
            variants={staggerGrid(0.1)}
          >
            <motion.div variants={fadeUp}><Eyebrow>How we help</Eyebrow></motion.div>
            <motion.div variants={fadeUp}><H2 className="mb-8">Tailored hiring solutions for every stage of growth</H2></motion.div>
            {SERVICES.map(s => (
              <motion.div key={s.n} variants={fadeUp}
                className="flex gap-5 p-6 bg-white rounded-xl border border-black/5"
                whileHover={{ x: 3, borderColor: 'rgba(0,0,0,0.05)' }}
                transition={{ type: 'spring', stiffness: 380, damping: 26 }}
              >
                <div className="w-10 h-10 rounded-lg shrink-0 flex items-center justify-center text-[13px] border border-black/5" style={{ backgroundColor: BGL, color: TT }}>{s.n}</div>
                <div>
                  <p className="text-[11px] uppercase tracking-[1.1px] mb-1" style={{ color: TT }}>{s.type}</p>
                  <p className="text-[17px] font-medium mb-1.5" style={{ color: P }}>{s.title}</p>
                  <p className="text-[14px] leading-[1.65]" style={{ color: TM }}>{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Industries />

      {/* Blog preview */}
      <section className="py-16 bg-white border-t border-black/5">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <Reveal className="flex items-end justify-between mb-10">
            <div><Eyebrow>From the blog</Eyebrow><H2>Latest insights &amp; trends</H2></div>
            <motion.button onClick={() => goTo('blog')} className="hidden sm:flex items-center gap-2 text-[14px]"
              style={{ color: TD }} whileHover={{ x: 2 }}
              onMouseEnter={e => (e.currentTarget.style.color = P)} onMouseLeave={e => (e.currentTarget.style.color = TD)}>
              All articles <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Reveal>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-56px' }}
            variants={staggerGrid(0.12)}
          >
            {ARTICLES.slice(0, 3).map(a => (
              <motion.button key={a.title} variants={fadeUp}
                onClick={() => readArticle(a)} className="flex flex-col gap-4 text-left group"
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 380, damping: 26 }}
              >
                <div className="rounded-xl overflow-hidden h-[200px] border border-black/5">
                  <img src={a.img} alt={a.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex items-center gap-3 text-[12px]">
                  <span style={{ color: P }}>{a.cat}</span><span style={{ color: TT }}>·</span><span style={{ color: TT }}>{a.date}</span>
                </div>
                <p className="text-[16px] font-medium leading-snug" style={{ color: P }}>{a.title}</p>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      <Testimonials />
      <Newsletter />
    </Fade>
  );

  // ── FOR JOBSEEKERS ────────────────────────────────────────────────────────────
  const JobseekersPage = () => {
    const sorted = (() => {
      let list = filteredRoles.filter(r => {
        return filterRegion === 'All regions' || (filterRegion === 'United Kingdom' ? Boolean(JOB_REGIONS[r.location]) : (JOB_REGIONS[r.location] || 'Ireland') === filterRegion);
      });
      if (sortBy === 'salary') list = [...list].sort((a, b) => parseInt(b.salary.replace(/[^0-9]/g, '')) - parseInt(a.salary.replace(/[^0-9]/g, '')));
      if (sortBy === 'location') list = [...list].sort((a, b) => a.location.localeCompare(b.location));
      if (sortBy === 'title') list = [...list].sort((a, b) => a.title.localeCompare(b.title));
      return list;
    })();

    const sel = sorted[selectedIdx] ?? sorted[0];

    return (
    <Fade>
      {/* Hero banner */}
      <section className="bg-[#faf5f8] px-6 py-14 sm:py-16"><div className="mx-auto max-w-[1184px]"><Eyebrow>Opportunities across Ireland &amp; the UK</Eyebrow><H1>A role that fits.<br />A future that’s yours.</H1><p className="mt-5 max-w-lg text-sm leading-7 text-[#68716c]">Explore opportunities across four specialist sectors, with a consultant by your side.</p></div></section>

      {/* Filter bar */}
      <p className="bg-[#fbf5f9] px-6 py-3 text-center text-xs text-[#810161]">Preview vacancies: these sample listings demonstrate recruitment across Ireland and the UK. Availability and full terms require confirmation.</p>
      <div className="bg-white border-b border-black/5">
        <div className="max-w-[1286px] mx-auto px-6 lg:px-10 py-5 flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-wrap gap-5 items-end">
            {/* Keyword */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[#757575] text-sm">Keyword / Job Title</label>
              <div className="relative">
                <Search className="w-4 h-4 text-[#757575] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input placeholder="e.g. Nurse, Warehouse…" value={jobKeyword} onChange={e => setJobKeyword(e.target.value)}
                  className="bg-white border border-black/5 rounded pl-9 pr-3.5 py-2.5 text-sm text-slate-700 outline-none w-[220px]"
                  style={{ '--tw-ring-color': P } as React.CSSProperties} />
              </div>
            </div>
            {/* Sector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[#757575] text-sm">Sector</label>
              <div className="relative">
                <Briefcase className="w-4 h-4 text-[#757575] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select value={jobSector} onChange={e => setJobSector(e.target.value)}
                  className="appearance-none bg-white border border-black/5 rounded pl-9 pr-8 py-2.5 text-sm text-slate-700 outline-none w-[200px] cursor-pointer">
                  {SECTORS.map(s => <option key={s}>{s}</option>)}
                </select>
                <ChevronRight className="w-4 h-4 text-[#757575] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none rotate-90" />
              </div>
            </div>
            {/* Location */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[#757575] text-sm">Location</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-[#757575] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select value={jobLocation} onChange={e => setJobLocation(e.target.value)}
                  className="appearance-none bg-white border border-black/5 rounded pl-9 pr-8 py-2.5 text-sm text-slate-700 outline-none w-[200px] cursor-pointer">
                  {LOCATIONS.map(l => <option key={l}>{l}</option>)}
                </select>
                <ChevronRight className="w-4 h-4 text-[#757575] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none rotate-90" />
              </div>
            </div>
            {/* Type */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[#757575] text-sm">Job Type</label>
              <div className="relative">
                <Clock className="w-4 h-4 text-[#757575] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select value={jobType} onChange={e => setJobType(e.target.value)}
                  className="appearance-none bg-white border border-black/5 rounded pl-9 pr-8 py-2.5 text-sm text-slate-700 outline-none w-[170px] cursor-pointer">
                  {JOB_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
                <ChevronRight className="w-4 h-4 text-[#757575] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none rotate-90" />
              </div>
            </div>
          </div>
          <button onClick={() => setSelectedIdx(0)}
            className="text-white font-semibold text-[18px] px-8 py-2.5 rounded-lg transition-opacity hover:opacity-90 shrink-0"
            style={{ backgroundColor: P }}>
            Search
          </button>
        </div>
      </div>

      {/* Region tabs */}
      <div className="border-b border-black/5 bg-white">
        <div className="max-w-[1286px] mx-auto px-6 lg:px-10 py-4 flex flex-col gap-2">
          <p className="text-[#3d3d3d] text-sm">Filter by region</p>
          <div className="flex flex-wrap gap-8 items-center">
            {['All regions', 'Ireland', 'Northern Ireland', 'England', 'Wales', 'Scotland'].map(label => ({ id: label, label, flag: label === 'Ireland' ? '🇮🇪' : label === 'All regions' ? '🌍' : '🇬🇧' })).map(c => {
              const active = filterRegion === c.id;
              return (
                <button key={c.id} aria-pressed={active} onClick={() => { setFilterRegion(c.id); setJobLocation('All Locations'); setSelectedIdx(0); }}
                  className="flex items-center gap-2 text-[15px] text-black">
                  <div className="w-[22px] h-[22px] rounded-full border flex items-center justify-center shrink-0 transition-colors"
                    style={{ backgroundColor: active ? P : 'white', borderColor: BD }}>
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

      {/* Two-column: list + detail */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">

          {/* Left: job list */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-[#757575] text-base">{sorted.length} role{sorted.length !== 1 ? 's' : ''} available</p>
              {/* Sort pills */}
              <div className="flex items-center gap-0.5 bg-white border border-black/5 rounded-full px-0.5 py-0.5">
                {([
                  { k: 'title',    l: 'Title' },
                  { k: 'salary',   l: 'Salary' },
                  { k: 'location', l: 'Location' },
                  { k: 'added',    l: 'Recent' },
                ] as const).map(({ k, l }) => (
                  <button key={k} onClick={() => setSortBy(k)}
                    className="px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors"
                    style={{ backgroundColor: sortBy === k ? P : 'transparent', color: sortBy === k ? 'white' : '#757575' }}>
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {sorted.length === 0 ? (
              <div className="text-center py-16">
                <Search className="w-8 h-8 mx-auto mb-3" style={{ color: TT }} />
                <p className="text-[15px] font-medium mb-1" style={{ color: TD }}>No roles found</p>
                <p className="text-[13px] mb-4" style={{ color: TM }}>Try adjusting your filters.</p>
                <button onClick={() => { setJobKeyword(''); setJobLocation('All Locations'); setJobSector('All Sectors'); setJobType('All Types'); }}
                  className="px-4 py-2 rounded text-white text-[13px]" style={{ backgroundColor: P }}>Clear filters</button>
              </div>
            ) : (
              <div className="space-y-0 border border-black/5 rounded-lg overflow-hidden">
                {sorted.map((r, i) => {
                  const active = selectedIdx === i;
                  return (
                    <motion.button key={r.title + r.location} onClick={() => setSelectedIdx(i)}
                      className="w-full text-left border-b border-black/5 last:border-0"
                      style={{ backgroundColor: active ? 'rgba(129,1,97,0.06)' : i % 2 === 0 ? 'rgba(245,245,245,0.5)' : 'white' }}
                      whileHover={{ backgroundColor: active ? 'rgba(129,1,97,0.06)' : 'rgba(129,1,97,0.03)' }}
                      transition={{ duration: 0.15 }}
                    >
                      <div className="flex flex-col gap-2 px-4 py-3.5">
                        <div>
                          <p className="text-[11px] leading-snug" style={{ color: active ? TD : '#555' }}>{r.sector}</p>
                          <p className="font-semibold text-[17px] leading-snug" style={{ color: active ? P : P }}>{r.title}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: active ? TD : '#757575' }} />
                            <span className="text-[13px]" style={{ color: active ? TD : '#333' }}>{r.location}</span>
                          </div>
                          <p className="text-[13px] font-medium" style={{ color: active ? P : P }}>{r.salary}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[11px] px-2 py-0.5 rounded-full border"
                            style={{ backgroundColor: active ? 'white' : BGL, borderColor: active ? BD : BDL, color: active ? TD : TT }}>
                            {r.type}
                          </span>
                          <Briefcase className="w-3.5 h-3.5" style={{ color: active ? TD : '#757575' }} />
                          <span className="text-[13px]" style={{ color: active ? TD : '#333' }}>{r.sector}</span>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            )}

            <p className="mt-4 text-center text-xs text-slate-500">Showing all matching preview roles</p>
          </div>

          {/* Selected-role preview; the complete brief opens on its own page. */}
          {sel && (
            <aside aria-label="Selected role" className="h-fit rounded-xl border border-black/5 bg-white p-6 space-y-5">
              <div>
                <p className="text-xs text-slate-500">{sel.sector} · {sel.location}</p>
                <h2 className="mt-2 text-2xl font-medium" style={{ color: P }}>{sel.title}</h2>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600">
                  <span className="rounded-full bg-[#fbf5f9] px-3 py-1.5">{sel.type}</span>
                  <span className="rounded-full bg-[#fbf5f9] px-3 py-1.5">{sel.salary}</span>
                  <span className="rounded-full bg-[#fbf5f9] px-3 py-1.5">{JOB_REGIONS[sel.location] || 'Ireland'}</span>
                </div>
              </div>
              <div className="border-t border-black/5 pt-5">
                <h3 className="mb-3 text-sm font-semibold">About this role</h3>
                <p className="text-sm leading-7 text-slate-600">{sel.desc}</p>
                <p className="mt-4 text-xs leading-6 text-slate-500">Preview listing. The full brief includes responsibilities, candidate requirements and application details to confirm with your consultant.</p>
                <p className="mt-3 text-xs text-slate-500">Reference: {getRoleReference(sel, ALL_ROLES)}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => readRole(sel)} className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-black/5 px-4 py-3 text-sm font-medium" style={{ color: P }}>View full role details <ArrowRight size={15} /></button>
                <button onClick={() => openApply(sel)} className="flex-1 rounded-lg px-4 py-3 text-sm font-medium text-white" style={{ backgroundColor: P }}>Apply for this role</button>
              </div>
            </aside>
          )}
        </div>
      </div>

      <Newsletter />
    </Fade>
  );
  };

  // ── FOR EMPLOYERS ─────────────────────────────────────────────────────────────
  const EmployersPage = () => (
    <Fade>
      <section className="bg-[#fbf5f9] px-6 py-16 lg:py-20">
        <div className="mx-auto max-w-[1184px]">
          <div className="flex flex-wrap items-start justify-between gap-8">
            <div className="max-w-xl"><Eyebrow>For employers · Ireland &amp; UK</Eyebrow><H1>Great talent.<br />A simpler way to hire.</H1><p className="mt-5 text-base leading-7 text-slate-600">Tell us who you need. We’ll help you find the right people, without the long forms or the guesswork.</p></div>
            <button onClick={openContact} className="inline-flex items-center gap-3 rounded-lg bg-[#810161] px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#65014b]">Submit a talent request <ArrowRight size={17} /></button>
          </div>
          <p className="mb-5 mt-12 text-xs font-medium uppercase tracking-[0.14em] text-slate-500">What would help your team?</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[
            { title: 'Permanent Placement', label: 'Permanent recruitment', icon: Users, text: 'Build a lasting team with people who share your purpose.' },
            { title: 'Contract / Temp Staffing', label: 'Contract recruitment', icon: Clock, text: 'Flexible expertise for projects, peaks and planned cover.' },
            { title: 'Executive Search', label: 'Executive search', icon: Target, text: 'A discreet, focused search for your next leader.' },
            { title: 'Talent Solutions', label: 'Talent solutions', icon: Briefcase, text: 'An embedded hiring partner, workforce planning or volume hiring.' },
          ].map(service => <button key={service.title} onClick={() => { openContact(); setContactForm(form => ({ ...form, role: service.title })); }} className="group rounded-xl border border-black/5 bg-white p-6 text-left transition-transform hover:-translate-y-1"><service.icon size={24} strokeWidth={1.4} className="mb-5 text-[#810161]" /><h2 className="text-base font-semibold text-slate-800">{service.label}</h2><p className="mb-6 mt-3 text-sm leading-6 text-slate-500">{service.text}</p><span className="flex items-center gap-2 text-xs font-semibold text-[#810161]">Request talent <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></span></button>)}</div>
          <p className="mt-8 text-center text-sm text-slate-500">Not sure what you need? <button onClick={openContact} className="font-semibold text-[#810161]">Start a conversation</button></p>
        </div>
      </section>
      <section className="mx-auto grid max-w-[1184px] gap-8 px-6 py-12 md:grid-cols-3">{['Share your brief', 'Meet your consultant', 'Find your people'].map((step, index) => <div key={step}><p className="text-xs font-semibold text-[#810161]">0{index + 1}</p><h2 className="mt-3 text-lg font-medium text-slate-800">{step}</h2><p className="mt-2 text-sm leading-6 text-slate-500">{['Choose your recruitment service and tell us about the role.', 'We clarify your requirements, budget and hiring timeline.', 'Review a tailored shortlist and move forward with confidence.'][index]}</p></div>)}</section>
    </Fade>
  );

  // ── BLOG ──────────────────────────────────────────────────────────────────────
  const BlogPage = () => (
    <Fade>
      <section className="py-16 bg-white border-b border-black/5">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <Reveal><Eyebrow>Insights &amp; resources</Eyebrow></Reveal>
          <Reveal delay={0.06}><H1 className="mb-4 max-w-xl">Fresh perspectives. Ireland &amp; the UK.</H1></Reveal>
          <Reveal delay={0.12}>
            <p className="text-[17px] leading-[1.65] max-w-lg" style={{ color: TM }}>
              Market trends, hiring advice, compliance updates, and salary reports — written by our consultants.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto flex max-w-[1280px] flex-wrap gap-2 px-6 py-6 lg:px-12">{['All', 'Ireland', 'UK'].map(region => <button key={region} aria-pressed={blogRegion === region} onClick={() => setBlogRegion(region)} className={`rounded-full px-5 py-2.5 text-sm transition-colors ${blogRegion === region ? 'bg-[#810161] text-white' : 'bg-[#f7f0f5] text-[#810161]'}`}>{region === 'All' ? 'All insights' : `Insights for ${region}`}</button>)}</div>

      {/* Featured article */}
      {visibleArticles.length > 0 && <section className="py-12 bg-white border-b border-black/5">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <motion.div
            className="rounded-xl overflow-hidden border border-black/5 flex flex-col lg:flex-row group cursor-pointer"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ borderColor: 'rgba(0,0,0,0.05)' }}
          >
            <div className="lg:w-[480px] h-56 lg:h-auto shrink-0 overflow-hidden">
              <img src={(visibleArticles[0] || ARTICLES[0]).img} alt={(visibleArticles[0] || ARTICLES[0]).title} className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105" />
            </div>
            <div className="flex-1 p-8 lg:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[12px] px-2.5 py-1 rounded-full font-medium" style={{ backgroundColor: 'rgba(129,1,97,0.08)', color: P }}>{(visibleArticles[0] || ARTICLES[0]).cat}</span>
                <span className="text-[12px]" style={{ color: TT }}>{(visibleArticles[0] || ARTICLES[0]).date} · {(visibleArticles[0] || ARTICLES[0]).read} read</span>
              </div>
              <h3 className="font-['DM_Sans',sans-serif] text-[28px] leading-snug mb-4" style={{ color: P }}>{(visibleArticles[0] || ARTICLES[0]).title}</h3>
              <p className="text-[15px] leading-relaxed mb-6" style={{ color: TM }}>{(visibleArticles[0] || ARTICLES[0]).excerpt}</p>
              <motion.button onClick={() => readArticle(visibleArticles[0])} className="self-start flex items-center gap-2 text-[14px] font-medium" style={{ color: P }}
                whileHover={{ x: 3 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
                Read article <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>}

      {/* Grid + filters */}
      <section style={{ backgroundColor: BGL }} className="py-12">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap gap-2 mb-8">
            {['All', 'Industry', 'Strategy', 'Trends'].map(c => (
              <motion.button key={c} onClick={() => setBlogCat(c)}
                className="px-4 py-2 rounded-full text-[13px] border border-black/5"
                style={{ backgroundColor: blogCat === c ? P : 'white', color: blogCat === c ? 'white' : TM }}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                {c}
              </motion.button>
            ))}
          </div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-56px' }}
            variants={staggerGrid(0.1)}
          >
            {visibleArticles.map(a => (
              <motion.div key={a.title} variants={fadeUp}
                className="bg-white rounded-xl overflow-hidden border border-black/5 flex flex-col group cursor-pointer"
                whileHover={{ y: -4, borderColor: 'rgba(0,0,0,0.05)' }}
                transition={{ type: 'spring', stiffness: 380, damping: 26 }}
              >
                <div className="h-[200px] overflow-hidden">
                  <img src={a.img} alt={a.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5 flex flex-col gap-3 flex-1">
                  <div className="flex items-center gap-2 text-[12px]">
                    <span style={{ color: P }}>{a.cat}</span>
                    <span style={{ color: TT }}>·</span><span style={{ color: TT }}>{a.date}</span>
                    <span style={{ color: TT }}>·</span><span style={{ color: TT }}>{a.read} read</span>
                  </div>
                  <p className="text-[15px] font-medium leading-snug flex-1" style={{ color: P }}>{a.title}</p>
                  <p className="text-[13px] leading-relaxed" style={{ color: TM }}>{a.excerpt.slice(0, 90)}…</p>
                  <motion.button onClick={() => readArticle(a)} className="self-start flex items-center gap-1.5 text-[13px] font-medium mt-1" style={{ color: P }}
                    whileHover={{ x: 2 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
                    Read more <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
          {visibleArticles.length === 0 && <div className="py-12 text-center"><p className="text-sm text-slate-500">No insights match this region and topic yet.</p><button onClick={() => { setBlogCat('All'); setBlogRegion('All'); }} className="mt-4 rounded-lg bg-[#810161] px-5 py-3 text-sm font-semibold text-white">Show all insights</button></div>}
        </div>
      </section>

      <Newsletter />
    </Fade>
  );

  // ── CONTACT ───────────────────────────────────────────────────────────────────
  const ContactPage = () => (
    <Fade>
      <section className="py-16 bg-white border-b border-black/5">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <Reveal><Eyebrow>Get in touch</Eyebrow></Reveal>
          <Reveal delay={0.06}><H1 className="mb-4 max-w-xl">{"We'd love to hear from you."}</H1></Reveal>
          <Reveal delay={0.12}>
            <p className="text-[17px] max-w-lg leading-relaxed" style={{ color: TM }}>
              Whether you are hiring, looking for work, or just want to understand how we can help — reach out and a consultant will respond within 2 business hours.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-56px' }}
            variants={staggerGrid(0.08)}
          >
            <motion.p variants={fadeUp} className="text-[18px] font-['DM_Sans',sans-serif] mb-6" style={{ color: P }}>Send us a message</motion.p>
            <div className="space-y-3">
              {[
                { icon: Users,    placeholder: 'Full name',                    key: 'name',    type: 'text' },
                { icon: Mail,     placeholder: 'Email address',                key: 'email',   type: 'email' },
                { icon: Phone,    placeholder: 'Phone number',                 key: 'phone',   type: 'tel' },
                { icon: Building2, placeholder: 'Company name (optional)',     key: 'company', type: 'text' },
                { icon: Briefcase, placeholder: 'What do you need help with?', key: 'role',   type: 'text' },
              ].map(({ icon: Icon, placeholder, key, type }) => (
                <motion.div key={key} variants={fadeUp}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg border border-black/5"
                  style={{ backgroundColor: BGL }}
                  whileFocus={{ borderColor: 'rgba(0,0,0,0.05)' }}
                >
                  <Icon className="w-4 h-4 shrink-0" style={{ color: TT }} />
                  <input type={type} placeholder={placeholder}
                    value={contactForm[key as keyof typeof contactForm]}
                    onChange={e => setContactForm(f => ({ ...f, [key]: e.target.value }))}
                    className="bg-transparent text-[14px] outline-none w-full" style={{ color: TD }} />
                </motion.div>
              ))}
              <motion.div variants={fadeUp}>
                <textarea placeholder="Your message…" value={contactForm.message}
                  onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))}
                  rows={4} className="w-full px-4 py-3 rounded-lg border border-black/5 text-[14px] outline-none resize-none"
                  style={{ backgroundColor: BGL, color: TD }} />
              </motion.div>
              <motion.button variants={fadeUp}
                onClick={() => onBookDemo('Recruitment Service')}
                className="w-full py-3.5 rounded-lg text-white text-[15px] font-medium flex items-center justify-center gap-2"
                style={{ backgroundColor: P }}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                Send Message <Send className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>

          {/* Side info */}
          <motion.div
            className="space-y-8"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-56px' }}
            variants={staggerGrid(0.12)}
          >
            <motion.div variants={fadeUp}>
              <p className="text-[18px] font-['DM_Sans',sans-serif] mb-5" style={{ color: P }}>Our offices</p>
              <div className="space-y-4">
                {[
                  { city: 'Dublin', addr: '12 Fitzwilliam Square, Dublin 2', phone: '+353 1 234 5678', email: 'dublin@mployus.ie' },
                  { city: 'Cork',   addr: '14 Grand Parade, Cork City, T12 XA10', phone: '+353 21 234 5678', email: 'cork@mployus.ie' },
                ].map(o => (
                  <motion.div key={o.city}
                    className="p-5 rounded-xl border border-black/5"
                    whileHover={{ borderColor: 'rgba(0,0,0,0.05)', x: 2 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 26 }}
                  >
                    <p className="text-[15px] font-medium mb-3" style={{ color: P }}>{o.city}</p>
                    <div className="space-y-2 text-[14px]" style={{ color: TM }}>
                      <div className="flex items-center gap-2"><MapPin className="w-4 h-4 shrink-0" style={{ color: TT }} /> {o.addr}</div>
                      <div className="flex items-center gap-2"><Phone className="w-4 h-4 shrink-0" style={{ color: TT }} /> {o.phone}</div>
                      <div className="flex items-center gap-2"><Mail className="w-4 h-4 shrink-0" style={{ color: TT }} /> {o.email}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp}
              className="p-5 rounded-xl border border-black/5"
              style={{ backgroundColor: BGL }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#00c950' }} />
                <p className="text-[14px] font-medium" style={{ color: TD }}>We respond fast</p>
              </div>
              <p className="text-[13px] leading-relaxed" style={{ color: TM }}>
                Employer enquiries are answered within 2 business hours. Candidate enquiries are answered the same working day.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section style={{ backgroundColor: BGL }} className="py-16 border-t border-black/5">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <Reveal><Eyebrow>Common questions</Eyebrow></Reveal>
          <Reveal delay={0.06}><H2 className="mb-8">Everything you need to know</H2></Reveal>
          <div className="max-w-3xl"><FaqBlock /></div>
        </div>
      </section>

      <Newsletter />
    </Fade>
  );

  // ── RENDER ────────────────────────────────────────────────────────────────────
  const pages: Record<Page, React.ReactNode> = {
    home: page === 'home' ? HomePage() : null,
    jobseekers: page === 'jobseekers' ? JobseekersPage() : null,
    role: page === 'role' && activeRole ? <RecruitmentRoleDetails key={getRoleReference(activeRole, ALL_ROLES)} role={activeRole} roles={ALL_ROLES} onBack={() => goTo('jobseekers')} onRead={readRole} onApply={openApply} /> : null,
    employers: page === 'employers' ? EmployersPage() : null,
    blog: page === 'blog' ? BlogPage() : null,
    article: page === 'article' && activeArticle ? <RecruitmentArticle key={activeArticle.title} article={activeArticle} articles={ARTICLES} onBack={() => goTo('blog')} onRead={readArticle} onContact={openContact} /> : null,
    contact: page === 'contact' ? ContactPage() : null,
  };

  return (
    <div className="min-h-screen bg-white font-['DM_Sans',sans-serif]" style={{ color: TD }}>

      {/* ══ NAVBAR ══ */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-sm border-b border-black/5">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 h-[68px] flex items-center justify-between">
          <motion.button onClick={() => goTo('home')} className="shrink-0"
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
            <span className="flex items-baseline gap-2 text-[23px] font-semibold tracking-[-0.02em] text-[#24332d]">mployus<span className="text-xs font-medium tracking-normal text-[#810161]">recruit.</span></span>
          </motion.button>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map(({ label, p }) => (
              <motion.button key={label} onClick={() => goTo(p)}
                className="text-[14px] leading-[21px] whitespace-nowrap relative"
                style={{ color: navPage === p ? P : TN, fontWeight: navPage === p ? 500 : 400 }}
                whileHover={{ color: P }}
                onMouseEnter={e => (e.currentTarget.style.color = P)}
                onMouseLeave={e => (e.currentTarget.style.color = navPage === p ? P : TN)}>
                {label}
                {navPage === p && (
                  <motion.div
                    className="absolute -bottom-[22px] left-0 right-0 h-px"
                    style={{ backgroundColor: P }}
                    layoutId="nav-underline"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <motion.button onClick={() => openAuth('login')}
              className="text-[14px] leading-[21px]" style={{ color: TN }}
              whileHover={{ color: P }}
              onMouseEnter={e => (e.currentTarget.style.color = P)} onMouseLeave={e => (e.currentTarget.style.color = TN)}>
              Login
            </motion.button>
            <button onClick={() => openAuth('register')} className="rounded-full border border-black/5 px-4 py-2.5 text-sm whitespace-nowrap" style={{ color: P }}>Get started</button>
            <motion.button onClick={openContact}
              className="h-[41px] px-5 rounded-full text-white text-[14px] whitespace-nowrap"
              style={{ backgroundColor: P }}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
              Request talent
            </motion.button>
          </div>

          <button aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileOpen} onClick={() => setMobileOpen(v => !v)} className="lg:hidden p-2 rounded-lg" style={{ color: TN }}>
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen
                ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}><X className="w-5 h-5" /></motion.div>
                : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}><Menu className="w-5 h-5" /></motion.div>
              }
            </AnimatePresence>
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden bg-white border-t border-black/5 px-6 py-4 space-y-1 overflow-hidden">
              {NAV.map(({ label, p }) => (
                <button key={label} onClick={() => goTo(p)}
                  className="block w-full text-left py-2.5 text-[14px] border-b border-black/5 last:border-0"
                  style={{ color: navPage === p ? P : TN, fontWeight: navPage === p ? 500 : 400 }}>
                  {label}
                </button>
              ))}
              <div className="flex gap-2 pt-3">
                <button onClick={() => openAuth('login')} className="flex-1 py-2.5 border border-black/5 rounded-lg text-[14px]" style={{ color: TN }}>Login</button>
                <button onClick={() => openAuth('register')} className="flex-1 py-2.5 border border-black/5 rounded-lg text-[14px]" style={{ color: P }}>Get started</button>
                <button onClick={openContact} className="flex-1 py-2.5 rounded-lg text-white text-[14px]" style={{ backgroundColor: P }}>Request talent</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="pt-[68px]">{pages[page]}</main>
      {loginOpen && <RecruitmentAuthScreen mode={authMode} onMode={setAuthMode} onClose={() => setLoginOpen(false)} onUploadCV={() => { setLoginOpen(false); openCV(); }} onRequestTalent={() => { setLoginOpen(false); openContact(); }} />}

      {/* ══ FOOTER ══ */}
<Footer
        brandSuffix="recruit"
        description={<>Specialist recruitment across Ireland &amp; the UK.<br />Good people. Great potential.</>}
        tagline="Your next chapter. Our shared ambition."
        onNavigate={view => view === 'home' ? onBackToHome() : goTo(view as Page)}
        onBookDemo={openContact}
        onStartTrial={openCV}
        columns={[
          { title: 'Platform', links: ['Permanent recruitment', 'Contract recruitment', 'Executive search', 'Talent solutions'].map(label => ({ label, onClick: () => goTo('employers') })) },
          { title: 'Explore', links: [{ label: 'For jobseekers', onClick: () => goTo('jobseekers') }, { label: 'Insights & resources', onClick: () => goTo('blog') }, { label: 'Contact us', onClick: () => goTo('contact') }, { label: 'Privacy policy', href: '/policies/privacy' }, { label: 'Terms of service', href: '/policies/terms' }, { label: 'Cookie policy', href: '/policies/cookies' }] },
          { title: 'Your workspace', links: [{ label: 'Candidate login', onClick: () => openAuth('login'), arrow: true }, { label: 'Create an account', onClick: () => openAuth('register'), arrow: true }, { label: 'Request talent', onClick: openContact, arrow: true }] },
        ]}
      />

      {/* ══ REQUEST TALENT MODAL ══ */}
      <AnimatePresence>
        {contactOpen && (
          <RecruitmentDialog onClose={() => setContactOpen(false)} eyebrow="Request talent" title={contactStep === 4 ? 'A clearer brief. A better beginning.' : 'Find your next great hire.'} description="A few details to understand your team and the people you need." headline={'Good people.\nStronger teams.'} steps={['Your hiring needs', 'Your organisation', 'Review your brief']} currentStep={contactStep - 1}>
              <div>


                {/* ── STEP 1: Hiring need ── */}
                {contactStep === 1 && (
                  <motion.div key="rt-step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }} className="space-y-5">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">What are you looking for?</h2>
                      <p className="text-sm text-slate-500 mt-1">Tell us about the type of recruitment support you need.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { key: 'Permanent Placement',   icon: Users,  desc: 'Long-term hire for a core role' },
                        { key: 'Contract / Temp Staffing', icon: Clock, desc: 'Flexible cover for a fixed period' },
                        { key: 'Executive Search', icon: Target, desc: 'Discreet search for senior leaders' },
                        { key: 'Talent Solutions', icon: Briefcase, desc: 'An embedded hiring partner or workforce strategy' },
                      ].map(({ key, icon: Icon, desc }) => (
                        <button key={key} type="button"
                          aria-pressed={contactForm.role === key}
                          onClick={() => setContactForm(f => ({ ...f, role: key }))}
                          className="flex items-start gap-3 p-4 rounded-xl border border-black/5 text-left transition-all"
                          style={{
                            borderColor: BD,
                            backgroundColor: contactForm.role === key ? 'rgba(129,1,97,0.06)' : 'var(--recruit-paper)',
                          }}>
                          <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                            style={{ backgroundColor: contactForm.role === key ? P : 'var(--recruit-tint)' }}>
                            <Icon className="w-4 h-4" style={{ color: contactForm.role === key ? 'white' : 'var(--recruit-muted)' }} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-800">{key}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-700">Which sector? <span className="text-rose-500">*</span></label>
                      <div className="relative">
                        <select value={contactForm.company} onChange={e => setContactForm(f => ({ ...f, company: e.target.value }))}
                          className="appearance-none w-full px-3.5 py-2.5 rounded-xl border border-black/5 text-sm outline-none bg-slate-50 cursor-pointer">
                          <option value="">Select a sector</option>
                          <option>Logistics &amp; Warehousing</option>
                          <option>Healthcare &amp; Nursing</option>
                          <option>Hospitality &amp; Catering</option>
                          <option>Education &amp; SNAs</option>
                          <option>Technology</option>
                          <option>Finance &amp; Accounting</option>
                          <option>Other</option>
                        </select>
                        <ChevronRight className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none rotate-90" />
                      </div>
                    </div>

                    <button onClick={() => setContactStep(2)}
                      disabled={!contactForm.role || !contactForm.company}
                      className="w-full py-3 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-40"
                      style={{ backgroundColor: P }}>
                      Continue <ChevronRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}

                {/* ── STEP 2: Company details ── */}
                {contactStep === 2 && (
                  <motion.div key="rt-step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }} className="space-y-5">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Your company details</h2>
                      <p className="text-sm text-slate-500 mt-1">{"We'll use these to connect you with the right consultant."}</p>
                    </div>
                    <label className="block text-xs font-semibold text-slate-700">Company name <span className="text-rose-500">*</span><input value={employerCompany} onChange={event => setEmployerCompany(event.target.value)} placeholder="Your organisation" className="mt-2 block w-full rounded-xl border border-black/5 bg-slate-50 px-3.5 py-2.5 text-sm" /></label>
                    <label className="block text-xs font-semibold text-slate-700">Hiring region<select value={employerRegion} onChange={event => setEmployerRegion(event.target.value)} className="mt-2 block w-full rounded-xl border border-black/5 bg-slate-50 px-3.5 py-2.5 text-sm">{['Ireland', 'Northern Ireland', 'England', 'Wales', 'Scotland', 'Multiple regions'].map(region => <option key={region}>{region}</option>)}</select></label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-700">First name <span className="text-rose-500">*</span></label>
                        <input value={contactForm.name.split(' ')[0] || ''} onChange={e => setContactForm(f => ({ ...f, name: e.target.value + ' ' + (f.name.split(' ')[1] || '') }))}
                          placeholder="e.g. Ciarán"
                          className="px-3.5 py-2.5 rounded-xl border border-black/5 text-sm outline-none bg-slate-50" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-700">Last name <span className="text-rose-500">*</span></label>
                        <input value={contactForm.name.split(' ').slice(1).join(' ') || ''} onChange={e => setContactForm(f => ({ ...f, name: (f.name.split(' ')[0] || '') + ' ' + e.target.value }))}
                          placeholder="e.g. O'Brien"
                          className="px-3.5 py-2.5 rounded-xl border border-black/5 text-sm outline-none bg-slate-50" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-700">Work email <span className="text-rose-500">*</span></label>
                      <input type="email" value={contactForm.email} onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="you@company.com"
                        className="px-3.5 py-2.5 rounded-xl border border-black/5 text-sm outline-none bg-slate-50" />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-700">Phone number</label>
                      <input type="tel" value={contactForm.phone} onChange={e => setContactForm(f => ({ ...f, phone: e.target.value }))}
                        placeholder="+353 1 000 0000"
                        className="px-3.5 py-2.5 rounded-xl border border-black/5 text-sm outline-none bg-slate-50" />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-700">How many roles do you need filled?</label>
                      <div className="grid grid-cols-4 gap-2">
                        {['1', '2–5', '6–10', '10+'].map(n => (
                          <button key={n} type="button"
                            aria-pressed={headcount === n}
                            onClick={() => setHeadcount(n)}
                            className="py-2.5 rounded-xl border border-black/5 text-sm font-semibold transition-all"
                            style={{
                              borderColor: BD,
                              backgroundColor: headcount === n ? 'rgba(129,1,97,0.06)' : 'var(--recruit-paper)',
                              color: headcount === n ? P : 'var(--recruit-ink)',
                            }}>
                            {n}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-1">
                      <button onClick={() => setContactStep(1)} className="px-5 py-3 rounded-xl border border-black/5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">← Back</button>
                      <button onClick={() => setContactStep(3)}
                        disabled={!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email) || !contactForm.name.trim() || !employerCompany.trim()}
                        className="flex-1 py-3 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-40"
                        style={{ backgroundColor: P }}>
                        Continue <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 3: Message & review ── */}
                {contactStep === 3 && (
                  <motion.div key="rt-step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }} className="space-y-5">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Additional details</h2>
                      <p className="text-sm text-slate-500 mt-1">Give us context so we can match you with the right specialist straight away.</p>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-700">Tell us about the role(s) <span className="text-slate-400 font-normal">(optional)</span></label>
                      <textarea value={contactForm.message}
                        onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))}
                        placeholder="e.g. We need a registered nurse for a care home in Dublin. The role is permanent, starting ASAP…"
                        rows={4}
                        className="px-3.5 py-3 rounded-xl border border-black/5 text-sm outline-none bg-slate-50 resize-none" />
                    </div>

                    {/* Enquiry summary */}
                    <div className="bg-slate-50 border border-black/5 rounded-xl p-4 space-y-3">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Enquiry summary</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                        <div><span className="text-slate-400">Contact</span><p className="font-semibold text-slate-900 mt-0.5">{contactForm.name.trim() || '—'}</p></div>
                        <div><span className="text-slate-400">Email</span><p className="font-semibold text-slate-900 mt-0.5 break-all">{contactForm.email || '—'}</p></div>
                        <div><span className="text-slate-400">Service</span><p className="font-semibold text-slate-900 mt-0.5">{contactForm.role || '—'}</p></div>
                        <div><span className="text-slate-400">Sector</span><p className="font-semibold text-slate-900 mt-0.5">{contactForm.company || '—'}</p></div>
                        <div><span className="text-slate-400">Roles needed</span><p className="font-semibold text-slate-900 mt-0.5">{headcount || '—'}</p></div>
                        <div><span className="text-slate-400">Phone</span><p className="font-semibold text-slate-900 mt-0.5">{contactForm.phone || '—'}</p></div>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-1">
                      <button onClick={() => setContactStep(2)} className="px-5 py-3 rounded-xl border border-black/5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">← Back</button>
                      <motion.button
                        onClick={() => setContactStep(4)}
                        className="flex-1 py-3 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                        style={{ backgroundColor: P }}
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 22 }}>
                        <Send className="w-4 h-4" /> Prepare talent request
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 4: Success ── */}
                {(contactStep as number) === 4 && (
                  <motion.div key="rt-step4"
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center text-center py-8 space-y-6">
                    <motion.div className="w-24 h-24 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: P }}
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}>
                      <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.35, duration: 0.25 }}>
                        <Check className="w-12 h-12 text-white" strokeWidth={2.5} />
                      </motion.div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="space-y-2">
                      <h2 className="text-2xl font-bold text-slate-900">Your talent brief is ready.</h2>
                      <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
                        This preview prepares your request locally. No enquiry has been sent. A production submission service still needs to be connected.
                      </p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                      className="w-full bg-slate-50 border border-black/5 rounded-xl p-5 text-left space-y-3">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Your talent brief</p>
                      <div className="space-y-3">
                        {[
                          { icon: Building2, title: employerCompany, desc: `${employerRegion} · ${contactForm.company}` },
                          { icon: Target, title: contactForm.role, desc: `${headcount} role(s) requested` },
                          { icon: Users, title: contactForm.name, desc: contactForm.email },
                          { icon: FileText, title: 'Your requirements', desc: contactForm.message || 'No additional requirements supplied.' },
                        ].map((step, i) => (
                          <motion.div key={i} className="flex items-start gap-3"
                            initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + i * 0.08 }}>
                            <step.icon className="w-5 h-5 shrink-0 mt-0.5" style={{ color: P }} />
                            <div>
                              <p className="text-sm font-semibold text-slate-800">{step.title}</p>
                              <p className="text-xs text-slate-500 mt-0.5">{step.desc}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                      className="flex flex-col sm:flex-row gap-3 w-full pt-2">
                      <button onClick={() => { const brief = new Blob([JSON.stringify({ service: contactForm.role, sector: contactForm.company, company: employerCompany, region: employerRegion, headcount, contact: contactForm.name, email: contactForm.email, phone: contactForm.phone, requirements: contactForm.message }, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(brief); const download = document.createElement('a'); download.href = url; download.download = 'mployus-talent-request.json'; download.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); }} className="flex-1 py-3 text-white font-bold rounded-xl transition-opacity hover:opacity-90"
                        style={{ backgroundColor: P }}>
                        Download brief
                      </button>
                      <button onClick={() => { setContactOpen(false); goTo('contact'); }} className="flex-1 py-3 border border-black/5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                        Contact page
                      </button>
                    </motion.div>
                  </motion.div>
                )}

              </div>
          </RecruitmentDialog>
        )}
      </AnimatePresence>

      {/* ══ CV MODAL ══ */}
      {cvOpen && <RecruitmentCVDialog onClose={() => setCvOpen(false)} />}

      {/* ══ APPLY MODAL ══ */}
      <AnimatePresence>
        {applyOpen && applyRole && (
          <RecruitmentDialog onClose={closeApply} eyebrow="Your application" title={applyStep === 4 ? 'Your next step, prepared.' : 'Make your next move.'} description="Introduce yourself and tell us why this opportunity feels right." headline={'Your potential.\nA new chapter.'} steps={['Your details', 'Suitability & availability', 'Review your application']} currentStep={applyStep - 1}>
              {/* Role summary strip */}
              {applyStep < 4 && (
                <div className="mb-6 border border-black/5 rounded-xl px-4 py-3 flex flex-wrap items-center justify-between gap-4"
                  style={{ backgroundColor: 'rgba(129,1,97,0.05)' }}>
                  <div>
                    <p className="text-xs text-slate-500">{applyRole.sector} · {applyRole.location}</p>
                    <p className="font-bold text-sm" style={{ color: P }}>{applyRole.title} · {applyRole.type}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-slate-500">Salary</p>
                    <p className="font-bold text-sm" style={{ color: P }}>{applyRole.salary}</p>
                  </div>
                </div>
              )}

              <div>

                {/* ── STEP 1: Your Details ── */}
                {applyStep === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }} className="space-y-5">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Your details</h2>
                      <p className="text-sm text-slate-500 mt-1">{"We'll use these to confirm your identity and contact you about this role."}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-700">First name <span className="text-rose-500">*</span></label>
                        <input value={applyForm.firstName} onChange={e => setApplyForm(f => ({ ...f, firstName: e.target.value }))}
                          placeholder="e.g. Aoife"
                          className="px-3.5 py-2.5 rounded-xl border border-black/5 text-sm outline-none bg-slate-50" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-700">Last name <span className="text-rose-500">*</span></label>
                        <input value={applyForm.lastName} onChange={e => setApplyForm(f => ({ ...f, lastName: e.target.value }))}
                          placeholder="e.g. Murphy"
                          className="px-3.5 py-2.5 rounded-xl border border-black/5 text-sm outline-none bg-slate-50" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-700">Email address <span className="text-rose-500">*</span></label>
                      <input type="email" value={applyForm.email} onChange={e => setApplyForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="your@email.com"
                        className="px-3.5 py-2.5 rounded-xl border border-black/5 text-sm outline-none bg-slate-50" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-700">Mobile number <span className="text-rose-500">*</span></label>
                      <input type="tel" value={applyForm.phone} onChange={e => setApplyForm(f => ({ ...f, phone: e.target.value }))}
                        placeholder="+353 87 000 0000"
                        className="px-3.5 py-2.5 rounded-xl border border-black/5 text-sm outline-none bg-slate-50" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-700">Years of experience</label>
                      <div className="relative">
                        <select value={applyForm.yearsExp} onChange={e => setApplyForm(f => ({ ...f, yearsExp: e.target.value }))}
                          className="appearance-none w-full px-3.5 py-2.5 rounded-xl border border-black/5 text-sm outline-none bg-slate-50 cursor-pointer">
                          <option value="">Select range</option>
                          <option>Less than 1 year</option>
                          <option>1–2 years</option>
                          <option>3–5 years</option>
                          <option>6–10 years</option>
                          <option>10+ years</option>
                        </select>
                        <ChevronRight className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none rotate-90" />
                      </div>
                    </div>
                    <button onClick={() => setApplyStep(2)}
                      disabled={!applyForm.firstName || !applyForm.lastName || !applyForm.email || !applyForm.phone}
                      className="w-full py-3 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-40"
                      style={{ backgroundColor: P }}>
                      Continue <ChevronRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}

                {/* ── STEP 2: Suitability ── */}
                {applyStep === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }} className="space-y-5">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Suitability & availability</h2>
                      <p className="text-sm text-slate-500 mt-1">Confirm you meet the requirements and are ready to interview for this role.</p>
                    </div>

                    {/* Role confirmation card */}
                    <div className="border border-black/5 rounded-xl p-4 space-y-3" style={{ backgroundColor: 'rgba(129,1,97,0.04)' }}>
                      <p className="text-sm font-semibold text-slate-800">Role you are applying for</p>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        {[
                          { icon: Briefcase, v: applyRole.title },
                          { icon: MapPin,    v: applyRole.location },
                          { icon: Clock,     v: applyRole.type },
                          { icon: Building2, v: applyRole.salary },
                        ].map(({ icon: Icon, v }) => (
                          <div key={v} className="flex items-center gap-2 text-slate-700">
                            <Icon className="w-4 h-4 shrink-0" style={{ color: P }} />
                            <span>{v}</span>
                          </div>
                        ))}
                      </div>
                      <label className="flex items-start gap-3 cursor-pointer pt-1">
                        <input type="checkbox" checked={applyForm.availabilityConfirmed}
                          onChange={e => setApplyForm(f => ({ ...f, availabilityConfirmed: e.target.checked }))}
                          className="w-4 h-4 mt-0.5 shrink-0 cursor-pointer" style={{ accentColor: P }} />
                        <span className="text-sm text-slate-700">I confirm I am eligible to work in Ireland / UK and available to start within a reasonable timeframe.</span>
                      </label>
                    </div>

                    {/* How did you hear */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold text-slate-700">How will you commute? <span className="text-rose-500">*</span></label>
                      <div className="grid grid-cols-2 gap-2.5">
                        {[
                          { icon: Car, label: 'Own car' },
                          { icon: Bus, label: 'Public transport' },
                          { icon: Bike, label: 'Walking / cycling' },
                          { icon: Plane, label: 'Relocating' },
                        ].map(t => (
                          <button key={t.label} type="button"
                            aria-pressed={applyForm.transport === t.label}
                            onClick={() => setApplyForm(f => ({ ...f, transport: t.label }))}
                            className="flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-medium transition-all"
                            style={{
                              borderColor: 'rgba(0,0,0,0.05)',
                              backgroundColor: applyForm.transport === t.label ? 'rgba(129,1,97,0.06)' : 'var(--recruit-paper)',
                              color: applyForm.transport === t.label ? P : 'var(--recruit-ink)',
                            }}>
                            <t.icon className="w-4 h-4 shrink-0" /> {t.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-1">
                      <button onClick={() => setApplyStep(1)} className="px-5 py-3 rounded-xl border border-black/5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">← Back</button>
                      <button onClick={() => setApplyStep(3)}
                        disabled={!applyForm.availabilityConfirmed || !applyForm.transport}
                        className="flex-1 py-3 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-40"
                        style={{ backgroundColor: P }}>
                        Continue <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 3: Cover Note & Review ── */}
                {applyStep === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }} className="space-y-5">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Cover note &amp; review</h2>
                      <p className="text-sm text-slate-500 mt-1">Add a message to the hiring manager and review your application before submitting.</p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-700">Cover note <span className="text-slate-400 font-normal">(optional)</span></label>
                      <textarea value={applyForm.coverNote}
                        onChange={e => setApplyForm(f => ({ ...f, coverNote: e.target.value }))}
                        placeholder={`Hi, I'm a ${applyRole.sector.toLowerCase()} professional with ${applyForm.yearsExp || 'several years of'} experience. I'm very interested in the ${applyRole.title} role based in ${applyRole.location}…`}
                        rows={4}
                        className="px-3.5 py-3 rounded-xl border border-black/5 text-sm outline-none bg-slate-50 resize-none" />
                      <p className="text-[11px] text-slate-400">{applyForm.coverNote.length}/500 characters</p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-700">Any questions for the employer? <span className="text-slate-400 font-normal">(optional)</span></label>
                      <textarea value={applyForm.questions}
                        onChange={e => setApplyForm(f => ({ ...f, questions: e.target.value }))}
                        placeholder="e.g. Is remote work available? What does the interview process look like?"
                        rows={3}
                        className="px-3.5 py-3 rounded-xl border border-black/5 text-sm outline-none bg-slate-50 resize-none" />
                    </div>

                    {/* Summary */}
                    <div className="bg-slate-50 border border-black/5 rounded-xl p-4 space-y-3">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Application summary</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                        <div><span className="text-slate-400">Name</span><p className="font-semibold text-slate-900 mt-0.5">{applyForm.firstName} {applyForm.lastName}</p></div>
                        <div><span className="text-slate-400">Email</span><p className="font-semibold text-slate-900 mt-0.5 break-all">{applyForm.email}</p></div>
                        <div><span className="text-slate-400">Phone</span><p className="font-semibold text-slate-900 mt-0.5">{applyForm.phone}</p></div>
                        <div><span className="text-slate-400">Experience</span><p className="font-semibold text-slate-900 mt-0.5">{applyForm.yearsExp || '—'}</p></div>
                        <div><span className="text-slate-400">Commute</span><p className="font-semibold text-slate-900 mt-0.5">{applyForm.transport || '—'}</p></div>
                        <div><span className="text-slate-400">Role</span><p className="font-semibold text-slate-900 mt-0.5">{applyRole.title}</p></div>
                      </div>
                    </div>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" checked={applyForm.termsAccepted}
                        onChange={e => setApplyForm(f => ({ ...f, termsAccepted: e.target.checked }))}
                        className="w-4 h-4 mt-0.5 shrink-0 cursor-pointer" style={{ accentColor: P }} />
                      <span className="text-sm text-slate-600">I agree to MployUs Recruit's <Link to="/policies/terms" target="_blank" className="font-semibold underline" style={{ color: P }}>Terms &amp; Conditions</Link> and confirm the information I have provided is accurate.</span>
                    </label>

                    <div className="flex gap-3 pt-1">
                      <button onClick={() => setApplyStep(2)} className="px-5 py-3 rounded-xl border border-black/5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">← Back</button>
                      <motion.button onClick={() => setApplyStep(4)}
                        disabled={!applyForm.termsAccepted}
                        className="flex-1 py-3 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-40"
                        style={{ backgroundColor: P }}
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 22 }}>
                        Prepare application
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 4: Success ── */}
                {applyStep === 4 && (
                  <motion.div key="step4"
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center text-center py-8 space-y-6">
                    <motion.div className="w-24 h-24 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: P }}
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}>
                      <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.35, duration: 0.25 }}>
                        <Check className="w-12 h-12 text-white" strokeWidth={2.5} />
                      </motion.div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="space-y-2">
                      <h2 className="text-2xl font-bold text-slate-900">Your application preview is ready.</h2>
                      <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
                        Your application for <span className="font-semibold text-slate-700">{applyRole.title}</span> in <span className="font-semibold text-slate-700">{applyRole.location}</span> is prepared locally. Nothing has been sent in this preview.
                      </p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                      className="w-full bg-slate-50 border border-black/5 rounded-xl p-5 text-left space-y-3">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Your application details</p>
                      <div className="space-y-3">
                        {[
                          { icon: Mail, title: 'Your contact details', desc: applyForm.email },
                          { icon: Briefcase, title: 'Your opportunity', desc: `${applyRole.title} · ${applyRole.location}` },
                          { icon: Clock, title: 'Experience & availability', desc: `${applyForm.yearsExp || 'Not specified'} · ${applyForm.transport}` },
                          { icon: FileText, title: 'Live submission not connected', desc: 'No application, email or interview request has been sent.' },
                        ].map((step, i) => (
                          <motion.div key={i} className="flex items-start gap-3"
                            initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + i * 0.08 }}>
                            <step.icon className="w-5 h-5 shrink-0 mt-0.5" style={{ color: P }} />
                            <div>
                              <p className="text-sm font-semibold text-slate-800">{step.title}</p>
                              <p className="text-xs text-slate-500 mt-0.5">{step.desc}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                      className="flex flex-col sm:flex-row gap-3 w-full pt-2">
                      <button onClick={closeApply} className="flex-1 py-3 text-white font-bold rounded-xl transition-opacity hover:opacity-90"
                        style={{ backgroundColor: P }}>
                        Back to roles
                      </button>
                      <button onClick={openCV} className="flex-1 py-3 border border-black/5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                        Upload CV too
                      </button>
                    </motion.div>
                  </motion.div>
                )}

              </div>
          </RecruitmentDialog>
        )}
      </AnimatePresence>

    </div>
  );
};
