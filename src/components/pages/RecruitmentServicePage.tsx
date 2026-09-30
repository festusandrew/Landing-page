import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight, Menu, X, Globe, Clock, Target, Users,
  Check, Mail, Phone, Building2, Briefcase, Send, CheckCircle2,
  Plus, Minus, FileText, ChevronRight, Search, MapPin,
  BookOpen, Star, Award, TrendingUp, Shield, SlidersHorizontal,
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

type Page = 'home' | 'jobseekers' | 'employers' | 'blog' | 'contact';

interface Props {
  onBackToHome: () => void;
  onBookDemo: (moduleTitle?: string) => void;
  onStartTrial: () => void;
}

// ── Design tokens ─────────────────────────────────────────────────────────────
const P   = '#810161';   // primary magenta
const TD  = '#364153';   // text dark
const TM  = '#6a7282';   // text medium
const TT  = '#99a1af';   // text muted / tag
const TN  = '#4a5565';   // nav link colour
const BGL = '#f9fafb';   // bg light
const BD  = '#e5e7eb';   // border
const BDL = '#f3f4f6';   // border light

// ── Tiny shared components ────────────────────────────────────────────────────
const Eyebrow = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <p className="text-[13px] font-['Inter',sans-serif] uppercase font-normal mb-3"
    style={{ color: light ? 'rgba(255,255,255,0.6)' : TT, letterSpacing: '1.56px' }}>
    {children}
  </p>
);

const H1 = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <h1 className={`font-['Arimo',sans-serif] text-[48px] sm:text-[56px] leading-[1.12] font-normal ${className}`}
    style={{ color: P }}>
    {children}
  </h1>
);

const H2 = ({ children, className = '', light = false }: { children: React.ReactNode; className?: string; light?: boolean }) => (
  <h2 className={`font-['Arimo',sans-serif] text-[36px] leading-[1.2] font-normal ${className}`}
    style={{ color: light ? 'white' : P }}>
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
  as = 'input',
}: {
  icon: React.ElementType; placeholder: string; type?: string;
  value?: string; onChange?: (v: string) => void; as?: 'input' | 'select';
}) => (
  <div className="flex items-center gap-3 px-4 py-3 rounded-lg border"
    style={{ borderColor: BD, backgroundColor: BGL }}>
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
];

const LOCATIONS = ['All Locations', 'Dublin', 'Cork', 'Galway', 'Limerick', 'Kilkenny', 'Athlone'];
const SECTORS   = ['All Sectors', 'Logistics', 'Healthcare', 'Hospitality', 'Education'];
const JOB_TYPES = ['All Types', 'Permanent', 'Contract'];

const ARTICLES = [
  { img: imgBlog1, cat: 'Industry', date: 'Feb 12, 2026', read: '5 min', title: 'How Irish SMEs are rethinking recruitment in 2026',              excerpt: 'The Irish SME landscape is changing fast. Here is how smart companies are restructuring their hiring strategies.' },
  { img: imgBlog2, cat: 'Strategy', date: 'Feb 6, 2026',  read: '4 min', title: 'Contract vs. permanent: which model fits your growth stage?',   excerpt: 'Choosing between contract and permanent hiring is one of the most consequential decisions a growing business makes.' },
  { img: imgBlog3, cat: 'Trends',   date: 'Jan 28, 2026', read: '6 min', title: 'Workforce trends shaping healthcare staffing this year',        excerpt: 'From SNA shortages to nursing emigration, the healthcare staffing landscape in Ireland is undergoing significant shifts.' },
  { img: imgLogistics,   cat: 'Industry', date: 'Jan 14, 2026', read: '4 min', title: 'Why logistics companies struggle to retain warehouse staff',    excerpt: 'High turnover in warehouse and logistics roles is costing Irish companies millions. We look at what drives attrition.' },
  { img: imgHospitality, cat: 'Strategy', date: 'Jan 7, 2026',  read: '3 min', title: 'Building a hospitality team that survives the summer peak',   excerpt: 'Seasonal demand spikes are predictable — your hiring strategy should be too. Practical steps to staff up fast.' },
  { img: imgEducation,   cat: 'Trends',   date: 'Dec 18, 2025', read: '5 min', title: 'The SNA shortage in Irish schools: what recruiters are seeing', excerpt: 'Special Needs Assistants are in critically short supply across Ireland. What we are seeing from the recruitment trenches.' },
];

const TESTIMONIALS = [
  { img: imgSarah,   quote: '"MployUs cut our hiring timeline from eight weeks to twelve days. The candidates they presented actually understood our industry."', name: 'Sarah Jenkins',  role: 'HR Director, TechFlow Solutions' },
  { img: imgJames,   quote: '"Finding a Home Manager with the right clinical background and leadership skills is notoriously hard. MployUs delivered a shortlist in under two weeks."', name: 'Dr. James Wilson', role: 'Clinical Director, Sláinte Care Group' },
  { img: imgMichael, quote: '"We needed 14 warehouse operatives ahead of peak season. MployUs had them placed, vetted, and inducted within ten days."', name: 'Michael Chen',   role: 'Operations Manager, FastFreight IE' },
];

const SERVICES = [
  { n: '01', type: 'Permanent',  title: 'Permanent Placement',              desc: "Long-term hires for core roles. We identify, screen, and present candidates who'll grow with your organisation." },
  { n: '02', type: 'Contract',   title: 'Contract Staffing',                desc: 'Flexible staff for project-based work, seasonal peaks, or maternity cover without the overhead of permanent hires.' },
  { n: '03', type: 'RPO',        title: 'Recruitment Process Outsourcing',  desc: 'Outsource part or all of your hiring. We embed in your process and work as an extension of your HR team.' },
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
  const [page, setPage] = useState<Page>('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  // Contact modal
  const [contactOpen, setContactOpen]   = useState(false);
  const [contactStep, setContactStep]   = useState<1 | 2 | 3>(1);
  const [contactType, setContactType]   = useState<'Employer' | 'Candidate' | ''>('');
  const [contactForm, setContactForm]   = useState({ name: '', email: '', phone: '', company: '', role: '', message: '' });

  // CV modal
  const [cvOpen, setCvOpen]   = useState(false);
  const [cvStep, setCvStep]   = useState<1 | 2>(1);

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

  const goTo = (p: Page) => { setPage(p); setMobileOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const openContact = () => { setContactStep(1); setContactType(''); setContactForm({ name: '', email: '', phone: '', company: '', role: '', message: '' }); setContactOpen(true); };
  const openCV = () => { setCvStep(1); setCvOpen(true); };

  const filteredRoles = useMemo(() => ALL_ROLES.filter(r => {
    const kw = jobKeyword.toLowerCase();
    const matchKw = !kw || r.title.toLowerCase().includes(kw) || r.sector.toLowerCase().includes(kw) || r.desc.toLowerCase().includes(kw);
    const matchLoc = jobLocation === 'All Locations' || r.location === jobLocation;
    const matchSec = jobSector   === 'All Sectors'   || r.sector   === jobSector;
    const matchTyp = jobType     === 'All Types'     || r.type     === jobType;
    return matchKw && matchLoc && matchSec && matchTyp;
  }), [jobKeyword, jobLocation, jobSector, jobType]);

  const visibleArticles = blogCat === 'All' ? ARTICLES : ARTICLES.filter(a => a.cat === blogCat);

  const NAV = [
    { label: 'Home',            p: 'home'        as Page },
    { label: 'For Jobseekers',  p: 'jobseekers'  as Page },
    { label: 'For Employers',   p: 'employers'   as Page },
    { label: 'Blog',            p: 'blog'        as Page },
    { label: 'Contact Us',      p: 'contact'     as Page },
  ];

  // ── Shared blocks ────────────────────────────────────────────────────────────
  const Industries = () => (
    <section style={{ backgroundColor: BGL }} className="py-16">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="flex items-end justify-between mb-10">
          <div><Eyebrow>Industries we serve</Eyebrow><H2 className="max-w-sm">Deep expertise in sectors that matter</H2></div>
          <button onClick={() => goTo('jobseekers')} className="hidden sm:flex items-center gap-2 text-[14px]"
            style={{ color: TD }} onMouseEnter={e => (e.currentTarget.style.color = P)} onMouseLeave={e => (e.currentTarget.style.color = TD)}>
            View roles <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { img: imgLogistics,   label: 'Logistics',    sub: 'Warehouse, Supply Chain, Transport' },
            { img: imgHealthcare,  label: 'Healthcare',   sub: 'Nursing, Allied Health, Medical Admin' },
            { img: imgHospitality, label: 'Hospitality',  sub: 'Hotels, Restaurants, Events' },
            { img: imgEducation,   label: 'Education',    sub: 'Teaching, SNA, Administration' },
          ].map(ind => (
            <div key={ind.label} onClick={() => { setJobSector(ind.label); goTo('jobseekers'); }}
              className="relative rounded-xl overflow-hidden h-[300px] group cursor-pointer">
              <img src={ind.img} alt={ind.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(16,24,40,0.82) 0%, rgba(16,24,40,0.18) 50%, transparent 100%)' }} />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-white text-[18px] font-medium">{ind.label}</p>
                <p className="text-[13px] mt-1" style={{ color: 'rgba(255,255,255,0.65)' }}>{ind.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const Testimonials = () => (
    <section style={{ backgroundColor: BGL }} className="py-16">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <Eyebrow>Client stories</Eyebrow><H2 className="mb-10 max-w-sm">Trusted by companies across Ireland</H2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(t => (
            <div key={t.name} className="bg-white rounded-xl p-6 border flex flex-col gap-5" style={{ borderColor: BDL }}>
              <p className="text-[15px] leading-[1.65] flex-1" style={{ color: TN }}>{t.quote}</p>
              <div className="flex items-center gap-3">
                <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-[14px] font-medium" style={{ color: P }}>{t.name}</p>
                  <p className="text-[12px]" style={{ color: TT }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const Newsletter = () => (
    <section className="py-14 px-6 text-center text-white" style={{ backgroundColor: P }}>
      <div className="max-w-xl mx-auto">
        <Eyebrow light>Stay in the loop</Eyebrow>
        <h2 className="font-['Arimo',sans-serif] text-[32px] font-normal leading-snug mb-2">Hiring insights, market trends &amp; salary reports</h2>
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
    <div className="space-y-2">
      {(max ? FAQS.slice(0, max) : FAQS).map((f, i) => {
        const open = openFaq === i;
        return (
          <div key={f.q} className="border rounded-xl overflow-hidden" style={{ borderColor: open ? P : BDL }}>
            <button onClick={() => setOpenFaq(open ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
              style={{ backgroundColor: open ? P : 'white' }}>
              <span className="text-[14px] font-medium leading-snug" style={{ color: open ? 'white' : TD }}>{f.q}</span>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: open ? 'rgba(255,255,255,0.2)' : BGL, border: `1px solid ${open ? 'transparent' : BDL}` }}>
                {open ? <Minus className="w-3.5 h-3.5 text-white" /> : <Plus className="w-3.5 h-3.5" style={{ color: TT }} />}
              </div>
            </button>
            {open && <div className="px-5 pb-5 pt-4 text-[14px] leading-relaxed border-t" style={{ color: TM, borderColor: 'rgba(129,1,97,0.1)' }}>{f.a}</div>}
          </div>
        );
      })}
    </div>
  );

  // ── PAGES ────────────────────────────────────────────────────────────────────

  const HomePage = () => (
    <Fade>
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          <div className="flex-1 min-w-0">
            <Eyebrow>Recruitment · Staffing · HR Advisory</Eyebrow>
            <H1 className="mb-5">Find the right people.<br />Build a stronger team.</H1>
            <p className="text-[17px] leading-[1.65] max-w-lg mb-8" style={{ color: TM }}>
              MployUs connects Irish businesses with skilled professionals across logistics, healthcare, hospitality, and education. Permanent, contract, or executive — we handle it.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              <button onClick={openContact} className="flex items-center gap-2 px-6 py-3.5 rounded-lg text-[15px] font-medium text-white hover:opacity-90" style={{ backgroundColor: P }}>
                Request Talent <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => goTo('jobseekers')} className="flex items-center gap-2 px-6 py-3.5 rounded-lg text-[15px] font-medium border" style={{ borderColor: BD, color: TD }}>
                Explore Vacancies
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#00c950' }} /><span className="text-[13px]" style={{ color: TT }}>1,200+ placements</span></div>
              <div className="w-px h-4" style={{ backgroundColor: BD }} />
              <span className="text-[13px]" style={{ color: TT }}>4 industry sectors</span>
              <div className="w-px h-4" style={{ backgroundColor: BD }} />
              <span className="text-[13px]" style={{ color: TT }}>Dublin &amp; Cork offices</span>
            </div>
          </div>
          {/* Consultant card */}
          <div className="w-full lg:w-[340px] shrink-0">
            <div className="bg-white rounded-2xl overflow-hidden border" style={{ borderColor: BDL }}>
              <div className="h-[340px] overflow-hidden">
                <img src={imgLouis} alt="Louis Moses" className="w-full h-full object-cover object-top" />
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[16px] font-medium" style={{ color: P }}>Louis Moses</p>
                    <p className="text-[13px]" style={{ color: TM }}>Talent Acquisition Specialist</p>
                  </div>
                  <span className="text-[11px] font-medium px-3 py-1 rounded border tracking-wide uppercase" style={{ backgroundColor: '#ecfdf5', borderColor: '#d0fae5', color: '#007a55' }}>Top Rated</span>
                </div>
                <div className="pt-4 border-t text-[13px] leading-relaxed" style={{ borderColor: BDL, color: TM }}>
                  Connected 1,000+ businesses with qualified candidates across Ireland and the UK.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ backgroundColor: BGL }} className="py-16">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <Eyebrow>What we offer</Eyebrow>
          <H2 className="mb-10 max-w-md">Recruitment services built around your business</H2>
          <div className="rounded-xl overflow-hidden border" style={{ borderColor: BD }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-x divide-y">
              {[
                { icon: Globe,   label: 'Global Talent Access', desc: 'Source skilled professionals across multiple industries and geographies, with deep roots in the Irish market.' },
                { icon: Target,  label: 'Local & Remote Roles',  desc: 'Flexible hiring models whether you need on-site staff in Dublin or remote specialists working from anywhere.' },
                { icon: Check,   label: 'Right-Fit Matching',    desc: 'Our sourcing process goes beyond CVs. We evaluate culture fit, technical skills, and long-term potential.' },
                { icon: Clock,   label: 'Faster Time-to-Hire',   desc: 'Streamlined workflows and a pre-vetted talent pool mean you fill roles in days, not months.' },
              ].map(({ icon: Icon, label, desc }) => (
                <div key={label} className="bg-white p-8 flex flex-col gap-6">
                  <Icon className="w-5 h-5" style={{ color: TT }} strokeWidth={1.25} />
                  <div>
                    <p className="text-[16px] font-medium mb-2" style={{ color: P }}>{label}</p>
                    <p className="text-[14px] leading-[1.65]" style={{ color: TM }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hiring solutions */}
      <section className="py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-12 lg:gap-16">
          <div className="w-full lg:w-[420px] shrink-0 rounded-2xl overflow-hidden" style={{ minHeight: '340px' }}>
            <img src={imgHiring} alt="Hiring discussion" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 space-y-3">
            <Eyebrow>How we help</Eyebrow>
            <H2 className="mb-8">Tailored hiring solutions for every stage of growth</H2>
            {SERVICES.map(s => (
              <div key={s.n} className="flex gap-5 p-6 bg-white rounded-xl border" style={{ borderColor: BDL }}>
                <div className="w-10 h-10 rounded-lg shrink-0 flex items-center justify-center text-[13px]" style={{ backgroundColor: BGL, color: TT, border: `1px solid ${BDL}` }}>{s.n}</div>
                <div>
                  <p className="text-[11px] uppercase tracking-[1.1px] mb-1" style={{ color: TT }}>{s.type}</p>
                  <p className="text-[17px] font-medium mb-1.5" style={{ color: P }}>{s.title}</p>
                  <p className="text-[14px] leading-[1.65]" style={{ color: TM }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Industries />

      {/* Blog preview */}
      <section className="py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-10">
            <div><Eyebrow>From the blog</Eyebrow><H2>Latest insights &amp; trends</H2></div>
            <button onClick={() => goTo('blog')} className="hidden sm:flex items-center gap-2 text-[14px]"
              style={{ color: TD }} onMouseEnter={e => (e.currentTarget.style.color = P)} onMouseLeave={e => (e.currentTarget.style.color = TD)}>
              All articles <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ARTICLES.slice(0, 3).map(a => (
              <button key={a.title} onClick={() => goTo('blog')} className="flex flex-col gap-4 text-left group">
                <div className="rounded-xl overflow-hidden h-[200px]">
                  <img src={a.img} alt={a.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex items-center gap-3 text-[12px]">
                  <span style={{ color: P }}>{a.cat}</span><span style={{ color: TT }}>·</span><span style={{ color: TT }}>{a.date}</span>
                </div>
                <p className="text-[16px] font-medium leading-snug" style={{ color: P }}>{a.title}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <Newsletter />
    </Fade>
  );

  // ── FOR JOBSEEKERS ────────────────────────────────────────────────────────────
  const JobseekersPage = () => (
    <Fade>
      {/* Hero + search */}
      <section className="py-14 bg-white border-b" style={{ borderColor: BDL }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <Eyebrow>For jobseekers</Eyebrow>
          <H1 className="mb-4 max-w-2xl">Your next career move starts here.</H1>
          <p className="text-[17px] leading-[1.65] max-w-xl mb-8" style={{ color: TM }}>
            Whether you are looking for a permanent role, contract work, or a change of direction — MployUs connects you with employers who value your skills.
          </p>

          {/* Search bar */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-3xl mb-4">
            <div className="flex items-center gap-3 flex-1 px-4 py-3 rounded-lg border bg-white" style={{ borderColor: BD }}>
              <Search className="w-4 h-4 shrink-0" style={{ color: TT }} />
              <input placeholder="Job title, keyword or sector…" value={jobKeyword}
                onChange={e => setJobKeyword(e.target.value)}
                className="bg-transparent text-[14px] outline-none w-full" style={{ color: TD }} />
            </div>
            <div className="flex items-center gap-3 w-full sm:w-52 px-4 py-3 rounded-lg border bg-white" style={{ borderColor: BD }}>
              <MapPin className="w-4 h-4 shrink-0" style={{ color: TT }} />
              <select value={jobLocation} onChange={e => setJobLocation(e.target.value)}
                className="bg-transparent text-[14px] outline-none w-full appearance-none cursor-pointer" style={{ color: TD }}>
                {LOCATIONS.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
            <button className="px-6 py-3 rounded-lg text-white text-[14px] font-medium hover:opacity-90 whitespace-nowrap" style={{ backgroundColor: P }}>
              Search Jobs
            </button>
          </div>

          {/* Filter toggle */}
          <button onClick={() => setShowFilters(v => !v)}
            className="flex items-center gap-2 text-[13px] px-3.5 py-2 rounded-lg border transition-colors"
            style={{ borderColor: showFilters ? P : BDL, color: showFilters ? P : TM, backgroundColor: showFilters ? 'rgba(129,1,97,0.04)' : 'white' }}>
            <SlidersHorizontal className="w-4 h-4" />
            {showFilters ? 'Hide filters' : 'More filters'}
          </button>

          {/* Expanded filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden">
                <div className="pt-4 flex flex-wrap gap-3">
                  {/* Sector */}
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg border bg-white" style={{ borderColor: BD }}>
                    <Briefcase className="w-4 h-4 shrink-0" style={{ color: TT }} />
                    <select value={jobSector} onChange={e => setJobSector(e.target.value)}
                      className="bg-transparent text-[14px] outline-none appearance-none cursor-pointer pr-4" style={{ color: TD }}>
                      {SECTORS.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  {/* Type */}
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg border bg-white" style={{ borderColor: BD }}>
                    <Clock className="w-4 h-4 shrink-0" style={{ color: TT }} />
                    <select value={jobType} onChange={e => setJobType(e.target.value)}
                      className="bg-transparent text-[14px] outline-none appearance-none cursor-pointer pr-4" style={{ color: TD }}>
                      {JOB_TYPES.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  {/* Clear */}
                  {(jobSector !== 'All Sectors' || jobType !== 'All Types' || jobLocation !== 'All Locations' || jobKeyword) && (
                    <button onClick={() => { setJobKeyword(''); setJobLocation('All Locations'); setJobSector('All Sectors'); setJobType('All Types'); }}
                      className="px-4 py-2.5 rounded-lg text-[13px] border" style={{ borderColor: BDL, color: TM }}>
                      Clear all
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Results */}
      <section style={{ backgroundColor: BGL }} className="py-12">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between mb-6">
            <p className="text-[14px]" style={{ color: TM }}>
              <span className="font-medium" style={{ color: TD }}>{filteredRoles.length}</span> role{filteredRoles.length !== 1 ? 's' : ''} found
              {jobSector !== 'All Sectors' && <> in <span style={{ color: P }}>{jobSector}</span></>}
              {jobLocation !== 'All Locations' && <> · <span style={{ color: P }}>{jobLocation}</span></>}
              {jobType !== 'All Types' && <> · <span style={{ color: P }}>{jobType}</span></>}
            </p>
          </div>

          {filteredRoles.length === 0 ? (
            <div className="text-center py-16">
              <Search className="w-10 h-10 mx-auto mb-3" style={{ color: TT }} />
              <p className="text-[16px] font-medium mb-1" style={{ color: TD }}>No roles found</p>
              <p className="text-[14px] mb-4" style={{ color: TM }}>Try adjusting your filters or uploading your CV to be considered for future roles.</p>
              <button onClick={openCV} className="px-5 py-2.5 rounded-lg text-white text-[14px] font-medium" style={{ backgroundColor: P }}>Upload CV</button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredRoles.map((role, i) => (
                <div key={role.title + role.location} className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: openRoleIdx === i ? P : BDL }}>
                  <button onClick={() => setOpenRoleIdx(openRoleIdx === i ? null : i)}
                    className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 text-left">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg shrink-0 flex items-center justify-center text-[11px] font-medium"
                        style={{ backgroundColor: BGL, border: `1px solid ${BDL}`, color: TT }}>
                        {role.sector.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-[16px] font-medium" style={{ color: P }}>{role.title}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className="flex items-center gap-1 text-[13px]" style={{ color: TM }}><MapPin className="w-3 h-3" /> {role.location}</span>
                          <span style={{ color: BD }}>·</span>
                          <span className="text-[13px]" style={{ color: TM }}>{role.type}</span>
                          <span style={{ color: BD }}>·</span>
                          <span className="text-[13px]" style={{ color: TM }}>{role.salary}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[12px] px-2.5 py-1 rounded-full border" style={{ borderColor: BDL, color: TM, backgroundColor: BGL }}>{role.sector}</span>
                      <span className="text-[12px] px-2.5 py-1 rounded-full border" style={{ borderColor: BDL, color: TM, backgroundColor: BGL }}>{role.type}</span>
                      <ChevronRight className="w-4 h-4 transition-transform" style={{ color: TT, transform: openRoleIdx === i ? 'rotate(90deg)' : 'none' }} />
                    </div>
                  </button>
                  {openRoleIdx === i && (
                    <div className="px-5 pb-5 border-t" style={{ borderColor: BDL }}>
                      <p className="text-[14px] leading-relaxed mt-4 mb-5" style={{ color: TM }}>{role.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        <button onClick={openCV} className="px-5 py-2.5 rounded-lg text-white text-[14px] font-medium hover:opacity-90" style={{ backgroundColor: P }}>
                          Apply Now
                        </button>
                        <button onClick={openContact} className="px-5 py-2.5 rounded-lg text-[14px] font-medium border" style={{ borderColor: BD, color: TD }}>
                          Ask a Question
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <Eyebrow>How it works</Eyebrow>
          <H2 className="mb-10 max-w-md">Four steps to your next role</H2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { n: '01', icon: FileText,    title: 'Upload your CV',     desc: 'Submit your CV through our portal. A dedicated consultant reviews your profile within one business day.' },
              { n: '02', icon: Users,       title: 'Consultant call',    desc: "We'll call you to understand your goals, preferences, salary target, and the role type you are looking for." },
              { n: '03', icon: Target,      title: 'Matched to roles',   desc: "You'll receive a curated shortlist of roles that genuinely fit — not a mass email of every open position." },
              { n: '04', icon: CheckCircle2, title: 'Interview support', desc: 'We prepare you for every interview, provide feedback, and handle all negotiations on your behalf.' },
            ].map(s => (
              <div key={s.n} className="p-6 rounded-xl border" style={{ borderColor: BDL }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-[12px] mb-4" style={{ backgroundColor: BGL, color: TT, border: `1px solid ${BDL}` }}>{s.n}</div>
                <s.icon className="w-5 h-5 mb-4" style={{ color: TT }} strokeWidth={1.25} />
                <p className="text-[16px] font-medium mb-2" style={{ color: P }}>{s.title}</p>
                <p className="text-[14px] leading-[1.65]" style={{ color: TM }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Candidate benefits + CV form */}
      <section style={{ backgroundColor: BGL }} className="py-16">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-12 items-start">
          <div className="flex-1">
            <Eyebrow>Why candidates choose us</Eyebrow>
            <H2 className="mb-6 max-w-sm">We work for you, not just the employer</H2>
            <div className="space-y-4">
              {[
                { icon: Shield,     title: 'Confidential job search', desc: 'We never share your CV without your explicit consent. Your search stays private.' },
                { icon: Star,       title: 'Expert sector knowledge', desc: 'Our consultants recruit exclusively in your sector — they know what employers actually want.' },
                { icon: Award,      title: 'Salary negotiation',      desc: 'We negotiate on your behalf and have data on current market rates across every role we place.' },
                { icon: TrendingUp, title: 'Long-term career partner', desc: 'We stay in touch. Many of our candidates return to us 3 or 4 times throughout their career.' },
              ].map(b => (
                <div key={b.title} className="flex gap-4 p-5 bg-white rounded-xl border" style={{ borderColor: BDL }}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: BGL, border: `1px solid ${BDL}` }}>
                    <b.icon className="w-4 h-4" style={{ color: TT }} strokeWidth={1.25} />
                  </div>
                  <div>
                    <p className="text-[15px] font-medium mb-1" style={{ color: P }}>{b.title}</p>
                    <p className="text-[13px] leading-relaxed" style={{ color: TM }}>{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick CV form */}
          <div className="w-full lg:w-[360px] shrink-0 bg-white rounded-2xl border overflow-hidden" style={{ borderColor: BDL }}>
            <div className="p-6 border-b" style={{ borderColor: BDL }}>
              <p className="text-[18px] font-['Arimo',sans-serif] mb-1" style={{ color: P }}>Upload your CV</p>
              <p className="text-[13px]" style={{ color: TM }}>Get matched with live roles in your sector</p>
            </div>
            <div className="p-6 space-y-3">
              <IconField icon={Users}    placeholder="Full name" />
              <IconField icon={Mail}     placeholder="Email address" type="email" />
              <IconField icon={Phone}    placeholder="Phone number" type="tel" />
              <IconField icon={Briefcase} placeholder="Your profession / job title" />
              <div className="border-dashed border-2 rounded-xl px-5 py-6 text-center cursor-pointer" style={{ borderColor: BD }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = P)} onMouseLeave={e => (e.currentTarget.style.borderColor = BD)}>
                <FileText className="w-7 h-7 mx-auto mb-2" style={{ color: TT }} />
                <p className="text-[13px] font-medium mb-0.5" style={{ color: TD }}>Drop your CV here</p>
                <p className="text-[12px]" style={{ color: TT }}>PDF or Word · max 5 MB</p>
              </div>
              <button onClick={openCV} className="w-full py-3 rounded-lg text-white text-[14px] font-medium flex items-center justify-center gap-2 hover:opacity-90" style={{ backgroundColor: P }}>
                <Send className="w-4 h-4" /> Submit CV
              </button>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </Fade>
  );

  // ── FOR EMPLOYERS ─────────────────────────────────────────────────────────────
  const EmployersPage = () => (
    <Fade>
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          <div className="flex-1">
            <Eyebrow>For employers</Eyebrow>
            <H1 className="mb-5 max-w-xl">Hire faster. Hire better. Every time.</H1>
            <p className="text-[17px] leading-[1.65] max-w-lg mb-8" style={{ color: TM }}>
              From urgent temporary cover to executive search, MployUs operates as an extension of your HR team — fully managed, fully accountable, and built around your timeline.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              <button onClick={openContact} className="flex items-center gap-2 px-6 py-3.5 rounded-lg text-[15px] font-medium text-white hover:opacity-90" style={{ backgroundColor: P }}>
                Request Talent <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => goTo('contact')} className="flex items-center gap-2 px-6 py-3.5 rounded-lg text-[15px] font-medium border" style={{ borderColor: BD, color: TD }}>
                Book a Call
              </button>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {[{ n: '5–10', label: 'Days to shortlist' }, { n: '90', label: 'Day guarantee' }, { n: '1,200+', label: 'Placements made' }].map(s => (
                <div key={s.label}>
                  <p className="text-[28px] font-['Arimo',sans-serif]" style={{ color: P }}>{s.n}</p>
                  <p className="text-[13px]" style={{ color: TT }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-[420px] shrink-0 rounded-2xl overflow-hidden" style={{ minHeight: '340px' }}>
            <img src={imgHiring} alt="Hiring discussion" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: BGL }} className="py-16">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <Eyebrow>Our services</Eyebrow>
          <H2 className="mb-10 max-w-md">Four hiring solutions. One trusted partner.</H2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SERVICES.map(s => (
              <div key={s.n} className="bg-white p-8 rounded-xl border" style={{ borderColor: BDL }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-[13px] mb-6" style={{ backgroundColor: BGL, color: TT, border: `1px solid ${BDL}` }}>{s.n}</div>
                <p className="text-[11px] uppercase tracking-[1.1px] mb-2" style={{ color: TT }}>{s.type}</p>
                <p className="text-[20px] font-['Arimo',sans-serif] mb-3" style={{ color: P }}>{s.title}</p>
                <p className="text-[14px] leading-[1.65]" style={{ color: TM }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <Eyebrow>Our process</Eyebrow>
          <H2 className="mb-10 max-w-md">How we fill your vacancy</H2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { n: '01', icon: Phone,        title: 'Discovery call',     desc: 'We understand your role, culture, timelines, and non-negotiables. No guesswork on our side.' },
              { n: '02', icon: Search,       title: 'Search & screen',    desc: 'We search our vetted talent pool and run structured competency interviews before presenting anyone.' },
              { n: '03', icon: Users,        title: 'Shortlist delivered', desc: 'You receive a shortlist of typically 3–5 candidates, each with a full profile and our recommendation.' },
              { n: '04', icon: CheckCircle2, title: 'Placement & support', desc: 'We manage offers, references, and onboarding — and follow up at 30, 60, and 90 days.' },
            ].map(s => (
              <div key={s.n} className="p-6 rounded-xl border" style={{ borderColor: BDL }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-[12px] mb-4" style={{ backgroundColor: BGL, color: TT, border: `1px solid ${BDL}` }}>{s.n}</div>
                <s.icon className="w-5 h-5 mb-4" style={{ color: TT }} strokeWidth={1.25} />
                <p className="text-[16px] font-medium mb-2" style={{ color: P }}>{s.title}</p>
                <p className="text-[14px] leading-[1.65]" style={{ color: TM }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Industries />
      <Testimonials />

      <section className="py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 text-center">
          <H2 className="mb-4">Ready to fill your next vacancy?</H2>
          <p className="text-[16px] mb-8 max-w-md mx-auto" style={{ color: TM }}>Tell us about the role and a consultant will respond within 2 business hours.</p>
          <button onClick={openContact} className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-white text-[15px] font-medium hover:opacity-90" style={{ backgroundColor: P }}>
            Request Talent <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <Newsletter />
    </Fade>
  );

  // ── BLOG ──────────────────────────────────────────────────────────────────────
  const BlogPage = () => (
    <Fade>
      <section className="py-16 bg-white border-b" style={{ borderColor: BDL }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <Eyebrow>Insights &amp; resources</Eyebrow>
          <H1 className="mb-4 max-w-xl">Recruitment insights from the Irish market</H1>
          <p className="text-[17px] leading-[1.65] max-w-lg" style={{ color: TM }}>
            Market trends, hiring advice, compliance updates, and salary reports — written by our consultants.
          </p>
        </div>
      </section>

      {/* Featured */}
      <section className="py-12 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="rounded-2xl overflow-hidden border flex flex-col lg:flex-row" style={{ borderColor: BDL }}>
            <div className="lg:w-[480px] h-56 lg:h-auto shrink-0 overflow-hidden">
              <img src={ARTICLES[0].img} alt={ARTICLES[0].title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 p-8 lg:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[12px] px-2.5 py-1 rounded-full font-medium" style={{ backgroundColor: 'rgba(129,1,97,0.08)', color: P }}>{ARTICLES[0].cat}</span>
                <span className="text-[12px]" style={{ color: TT }}>{ARTICLES[0].date} · {ARTICLES[0].read} read</span>
              </div>
              <h3 className="font-['Arimo',sans-serif] text-[28px] leading-snug mb-4" style={{ color: P }}>{ARTICLES[0].title}</h3>
              <p className="text-[15px] leading-relaxed mb-6" style={{ color: TM }}>{ARTICLES[0].excerpt}</p>
              <button className="self-start flex items-center gap-2 text-[14px] font-medium" style={{ color: P }}>
                Read article <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Grid + filters */}
      <section style={{ backgroundColor: BGL }} className="py-12">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap gap-2 mb-8">
            {['All', 'Industry', 'Strategy', 'Trends'].map(c => (
              <button key={c} onClick={() => setBlogCat(c)}
                className="px-4 py-2 rounded-full text-[13px] border transition-all"
                style={{ backgroundColor: blogCat === c ? P : 'white', color: blogCat === c ? 'white' : TM, borderColor: blogCat === c ? P : BDL }}>
                {c}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleArticles.map(a => (
              <div key={a.title} className="bg-white rounded-xl overflow-hidden border flex flex-col group cursor-pointer" style={{ borderColor: BDL }}>
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
                  <button className="self-start flex items-center gap-1.5 text-[13px] font-medium mt-1" style={{ color: P }}>
                    Read more <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </Fade>
  );

  // ── CONTACT ───────────────────────────────────────────────────────────────────
  const ContactPage = () => (
    <Fade>
      <section className="py-16 bg-white border-b" style={{ borderColor: BDL }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <Eyebrow>Get in touch</Eyebrow>
          <H1 className="mb-4 max-w-xl">{"We'd love to hear from you."}</H1>
          <p className="text-[17px] max-w-lg leading-relaxed" style={{ color: TM }}>
            Whether you are hiring, looking for work, or just want to understand how we can help — reach out and a consultant will respond within 2 business hours.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <div>
            <p className="text-[18px] font-['Arimo',sans-serif] mb-6" style={{ color: P }}>Send us a message</p>
            <div className="space-y-3">
              {[
                { icon: Users,    placeholder: 'Full name',                    key: 'name',    type: 'text' },
                { icon: Mail,     placeholder: 'Email address',                key: 'email',   type: 'email' },
                { icon: Phone,    placeholder: 'Phone number',                 key: 'phone',   type: 'tel' },
                { icon: Building2, placeholder: 'Company name (optional)',     key: 'company', type: 'text' },
                { icon: Briefcase, placeholder: 'What do you need help with?', key: 'role',   type: 'text' },
              ].map(({ icon: Icon, placeholder, key, type }) => (
                <div key={key} className="flex items-center gap-3 px-4 py-3 rounded-lg border" style={{ borderColor: BD, backgroundColor: BGL }}>
                  <Icon className="w-4 h-4 shrink-0" style={{ color: TT }} />
                  <input type={type} placeholder={placeholder}
                    value={contactForm[key as keyof typeof contactForm]}
                    onChange={e => setContactForm(f => ({ ...f, [key]: e.target.value }))}
                    className="bg-transparent text-[14px] outline-none w-full" style={{ color: TD }} />
                </div>
              ))}
              <textarea placeholder="Your message…" value={contactForm.message}
                onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))}
                rows={4} className="w-full px-4 py-3 rounded-lg border text-[14px] outline-none resize-none"
                style={{ borderColor: BD, backgroundColor: BGL, color: TD }} />
              <button onClick={() => onBookDemo('Recruitment Service')}
                className="w-full py-3.5 rounded-lg text-white text-[15px] font-medium flex items-center justify-center gap-2 hover:opacity-90"
                style={{ backgroundColor: P }}>
                Send Message <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Side info */}
          <div className="space-y-8">
            <div>
              <p className="text-[18px] font-['Arimo',sans-serif] mb-5" style={{ color: P }}>Our offices</p>
              <div className="space-y-4">
                {[
                  { city: 'Dublin', addr: '12 Fitzwilliam Square, Dublin 2', phone: '+353 1 234 5678', email: 'dublin@mployus.ie' },
                  { city: 'Cork',   addr: '14 Grand Parade, Cork City, T12 XA10', phone: '+353 21 234 5678', email: 'cork@mployus.ie' },
                ].map(o => (
                  <div key={o.city} className="p-5 rounded-xl border" style={{ borderColor: BDL }}>
                    <p className="text-[15px] font-medium mb-3" style={{ color: P }}>{o.city}</p>
                    <div className="space-y-2 text-[14px]" style={{ color: TM }}>
                      <div className="flex items-center gap-2"><MapPin className="w-4 h-4 shrink-0" style={{ color: TT }} /> {o.addr}</div>
                      <div className="flex items-center gap-2"><Phone className="w-4 h-4 shrink-0" style={{ color: TT }} /> {o.phone}</div>
                      <div className="flex items-center gap-2"><Mail className="w-4 h-4 shrink-0" style={{ color: TT }} /> {o.email}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-5 rounded-xl border" style={{ borderColor: BDL, backgroundColor: BGL }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#00c950' }} />
                <p className="text-[14px] font-medium" style={{ color: TD }}>We respond fast</p>
              </div>
              <p className="text-[13px] leading-relaxed" style={{ color: TM }}>
                Employer enquiries are answered within 2 business hours. Candidate enquiries are answered the same working day.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: BGL }} className="py-16">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <Eyebrow>Common questions</Eyebrow>
          <H2 className="mb-8">Everything you need to know</H2>
          <div className="max-w-3xl"><FaqBlock /></div>
        </div>
      </section>

      <Newsletter />
    </Fade>
  );

  // ── RENDER ────────────────────────────────────────────────────────────────────
  const pages: Record<Page, React.ReactNode> = {
    home: <HomePage />,
    jobseekers: <JobseekersPage />,
    employers: <EmployersPage />,
    blog: <BlogPage />,
    contact: <ContactPage />,
  };

  return (
    <div className="min-h-screen bg-white font-['Inter',sans-serif]" style={{ color: TD }}>

      {/* ══ NAVBAR ══ */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white border-b" style={{ borderColor: BD }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 h-[68px] flex items-center justify-between">
          <button onClick={() => goTo('home')} className="shrink-0">
            <img src={imgMployUs} alt="MployUs" className="h-7 w-auto object-contain" />
          </button>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map(({ label, p }) => (
              <button key={label} onClick={() => goTo(p)}
                className="text-[14px] leading-[21px] transition-colors whitespace-nowrap"
                style={{ color: page === p ? P : TN, fontWeight: page === p ? 500 : 400 }}
                onMouseEnter={e => (e.currentTarget.style.color = P)}
                onMouseLeave={e => (e.currentTarget.style.color = page === p ? P : TN)}>
                {label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <button onClick={openCV} className="text-[14px] leading-[21px] transition-colors" style={{ color: TN }}
              onMouseEnter={e => (e.currentTarget.style.color = P)} onMouseLeave={e => (e.currentTarget.style.color = TN)}>
              Login
            </button>
            <button onClick={openContact} className="h-[41px] px-5 rounded-lg text-white text-[14px] hover:opacity-90 whitespace-nowrap" style={{ backgroundColor: P }}>
              Get Started
            </button>
          </div>

          <button onClick={() => setMobileOpen(v => !v)} className="lg:hidden p-2 rounded-lg" style={{ color: TN }}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className="lg:hidden bg-white border-t px-6 py-4 space-y-1" style={{ borderColor: BD }}>
              {NAV.map(({ label, p }) => (
                <button key={label} onClick={() => goTo(p)}
                  className="block w-full text-left py-2.5 text-[14px] border-b last:border-0"
                  style={{ color: page === p ? P : TN, borderColor: BDL, fontWeight: page === p ? 500 : 400 }}>
                  {label}
                </button>
              ))}
              <div className="flex gap-2 pt-3">
                <button onClick={openCV}     className="flex-1 py-2.5 border rounded-lg text-[14px]" style={{ borderColor: BD, color: TN }}>Login</button>
                <button onClick={openContact} className="flex-1 py-2.5 rounded-lg text-white text-[14px]" style={{ backgroundColor: P }}>Get Started</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="pt-[68px]">{pages[page]}</main>

      {/* ══ FOOTER ══ */}
      <footer className="bg-white border-t py-12 px-6" style={{ borderColor: BD }}>
        <div className="max-w-[1280px] mx-auto lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b mb-8" style={{ borderColor: BDL }}>
            <div className="md:col-span-2 space-y-4">
              <img src={imgMployUs} alt="MployUs" className="h-8 w-auto object-contain" />
              <p className="text-[14px] leading-relaxed max-w-xs" style={{ color: TM }}>
                Specialist managed recruitment for logistics, healthcare, hospitality, and education across Ireland and the UK.
              </p>
              <div className="flex items-center gap-2 text-[13px]" style={{ color: TT }}>
                <span>🇮🇪 Dublin</span><span>·</span><span>🇮🇪 Cork</span>
              </div>
            </div>
            {[
              { heading: 'Services', links: [['Permanent Placement', 'employers'], ['Contract Staffing', 'employers'], ['RPO', 'employers'], ['Executive Search', 'employers']] },
              { heading: 'Navigate', links: [['For Jobseekers', 'jobseekers'], ['For Employers', 'employers'], ['Blog', 'blog'], ['Contact Us', 'contact']] },
            ].map(col => (
              <div key={col.heading}>
                <p className="text-[11px] font-semibold uppercase tracking-widest mb-4" style={{ color: TT }}>{col.heading}</p>
                <ul className="space-y-2">
                  {col.links.map(([l, p]) => (
                    <li key={l}>
                      <button onClick={() => goTo(p as Page)} className="text-[14px]" style={{ color: TM }}
                        onMouseEnter={e => (e.currentTarget.style.color = P)} onMouseLeave={e => (e.currentTarget.style.color = TM)}>
                        {l}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px]" style={{ color: TT }}>
            <p>© {new Date().getFullYear()} MployUs Recruit. All rights reserved.</p>
            <div className="flex items-center gap-5">
              <button className="hover:underline">Privacy Policy</button>
              <button className="hover:underline">Terms of Service</button>
              <button onClick={onBackToHome} className="hover:underline">Back to MployUs</button>
            </div>
          </div>
        </div>
      </footer>

      {/* ══ CONTACT MODAL ══ */}
      <AnimatePresence>
        {contactOpen && (
          <motion.div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setContactOpen(false)} />
            <motion.div className="relative bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 32 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}>
              <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: BDL }}>
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-widest" style={{ color: P }}>MployUs Recruit</p>
                  <h3 className="text-[18px] font-['Arimo',sans-serif]" style={{ color: P }}>Request Talent</h3>
                </div>
                <button onClick={() => setContactOpen(false)} className="w-8 h-8 rounded-lg flex items-center justify-center border" style={{ borderColor: BDL, backgroundColor: BGL }}>
                  <X className="w-4 h-4" style={{ color: TM }} />
                </button>
              </div>
              <div className="p-5">
                {contactStep < 3 && (
                  <div className="flex gap-1.5 mb-5">
                    {[1, 2].map(s => <div key={s} className="h-1 flex-1 rounded-full" style={{ backgroundColor: contactStep >= s ? P : BDL }} />)}
                  </div>
                )}
                {contactStep === 1 && (
                  <div className="space-y-4">
                    <p className="text-[14px]" style={{ color: TM }}>Are you looking to hire, or looking for a role?</p>
                    {[{ key: 'Employer' as const, icon: Building2, desc: "I'm looking to hire" }, { key: 'Candidate' as const, icon: Users, desc: "I'm looking for a role" }].map(({ key, icon: Icon, desc }) => (
                      <button key={key} onClick={() => setContactType(key)}
                        className="w-full flex items-center gap-4 p-4 rounded-xl border text-left"
                        style={{ borderColor: contactType === key ? P : BDL, backgroundColor: contactType === key ? 'rgba(129,1,97,0.04)' : 'white' }}>
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: contactType === key ? P : BGL }}>
                          <Icon className="w-5 h-5" style={{ color: contactType === key ? 'white' : TM }} />
                        </div>
                        <div>
                          <p className="font-medium text-[14px]" style={{ color: TD }}>{key}</p>
                          <p className="text-[12px]" style={{ color: TM }}>{desc}</p>
                        </div>
                      </button>
                    ))}
                    <button disabled={!contactType} onClick={() => setContactStep(2)}
                      className="w-full py-3 rounded-lg text-white text-[14px] font-medium disabled:opacity-40 hover:opacity-90"
                      style={{ backgroundColor: P }}>
                      Continue <ChevronRight className="inline w-4 h-4 ml-1" />
                    </button>
                  </div>
                )}
                {contactStep === 2 && (
                  <div className="space-y-3">
                    <p className="text-[14px] font-medium" style={{ color: TD }}>Your details</p>
                    {[
                      { icon: Users,    placeholder: 'Full name',        key: 'name',    type: 'text' },
                      { icon: Mail,     placeholder: 'Email address',    key: 'email',   type: 'email' },
                      { icon: Phone,    placeholder: 'Phone number',     key: 'phone',   type: 'tel' },
                      ...(contactType === 'Employer'
                        ? [{ icon: Building2, placeholder: 'Company name',        key: 'company', type: 'text' }, { icon: Briefcase, placeholder: 'Role to fill', key: 'role', type: 'text' }]
                        : [{ icon: Briefcase, placeholder: 'Your profession',     key: 'role',    type: 'text' }]),
                    ].map(({ icon: Icon, placeholder, key, type }) => (
                      <div key={key} className="flex items-center gap-3 px-4 py-3 rounded-lg border" style={{ borderColor: BD, backgroundColor: BGL }}>
                        <Icon className="w-4 h-4 shrink-0" style={{ color: TT }} />
                        <input type={type} placeholder={placeholder}
                          value={contactForm[key as keyof typeof contactForm]}
                          onChange={e => setContactForm(f => ({ ...f, [key]: e.target.value }))}
                          className="bg-transparent text-[14px] outline-none w-full" style={{ color: TD }} />
                      </div>
                    ))}
                    <div className="flex gap-2 pt-1">
                      <button onClick={() => setContactStep(1)} className="px-4 py-3 text-[13px] rounded-lg border" style={{ borderColor: BD, color: TM }}>← Back</button>
                      <button disabled={!contactForm.name || !contactForm.email}
                        onClick={() => { setContactStep(3); onBookDemo('Recruitment Service'); }}
                        className="flex-1 py-3 rounded-lg text-white text-[14px] font-medium disabled:opacity-40 flex items-center justify-center gap-2"
                        style={{ backgroundColor: P }}>
                        <Send className="w-4 h-4" /> Send enquiry
                      </button>
                    </div>
                  </div>
                )}
                {contactStep === 3 && (
                  <div className="flex flex-col items-center text-center py-6 space-y-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgba(129,1,97,0.08)' }}>
                      <CheckCircle2 className="w-7 h-7" style={{ color: P }} />
                    </div>
                    <div>
                      <h4 className="text-[18px] font-['Arimo',sans-serif]" style={{ color: P }}>Enquiry received</h4>
                      <p className="text-[14px] mt-1 max-w-xs leading-relaxed" style={{ color: TM }}>A specialist will be in touch within 2 business hours.</p>
                    </div>
                    <button onClick={() => setContactOpen(false)} className="px-6 py-2.5 rounded-lg text-white text-[14px] font-medium" style={{ backgroundColor: P }}>Done</button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ CV MODAL ══ */}
      <AnimatePresence>
        {cvOpen && (
          <motion.div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setCvOpen(false)} />
            <motion.div className="relative bg-white rounded-2xl w-full max-w-sm"
              initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 32 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}>
              <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: BDL }}>
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-widest" style={{ color: P }}>Candidates</p>
                  <h3 className="text-[18px] font-['Arimo',sans-serif]" style={{ color: P }}>Upload your CV</h3>
                </div>
                <button onClick={() => setCvOpen(false)} className="w-8 h-8 rounded-lg flex items-center justify-center border" style={{ borderColor: BDL, backgroundColor: BGL }}>
                  <X className="w-4 h-4" style={{ color: TM }} />
                </button>
              </div>
              <div className="p-5">
                {cvStep === 1 ? (
                  <div className="space-y-3">
                    {[{ icon: Users, placeholder: 'Full name', type: 'text' }, { icon: Mail, placeholder: 'Email address', type: 'email' }, { icon: Briefcase, placeholder: 'Profession / job title', type: 'text' }].map(({ icon: Icon, placeholder, type }) => (
                      <div key={placeholder} className="flex items-center gap-3 px-4 py-3 rounded-lg border" style={{ borderColor: BD, backgroundColor: BGL }}>
                        <Icon className="w-4 h-4 shrink-0" style={{ color: TT }} />
                        <input type={type} placeholder={placeholder} className="bg-transparent text-[14px] outline-none w-full" style={{ color: TD }} />
                      </div>
                    ))}
                    <div className="border-dashed border-2 rounded-xl px-5 py-8 text-center cursor-pointer" style={{ borderColor: BD }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = P)} onMouseLeave={e => (e.currentTarget.style.borderColor = BD)}>
                      <FileText className="w-8 h-8 mx-auto mb-2" style={{ color: TT }} />
                      <p className="text-[14px] font-medium mb-0.5" style={{ color: TD }}>Drop your CV here</p>
                      <p className="text-[12px]" style={{ color: TT }}>PDF or Word · max 5 MB</p>
                    </div>
                    <button onClick={() => { setCvStep(2); onBookDemo('CV Upload'); }}
                      className="w-full py-3 rounded-lg text-white text-[14px] font-medium flex items-center justify-center gap-2"
                      style={{ backgroundColor: P }}>
                      <Send className="w-4 h-4" /> Submit CV
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center py-6 space-y-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgba(129,1,97,0.08)' }}>
                      <CheckCircle2 className="w-7 h-7" style={{ color: P }} />
                    </div>
                    <div>
                      <h4 className="text-[18px] font-['Arimo',sans-serif]" style={{ color: P }}>CV received</h4>
                      <p className="text-[14px] mt-1 leading-relaxed max-w-xs" style={{ color: TM }}>A consultant will review your profile and be in touch within one business day.</p>
                    </div>
                    <button onClick={() => setCvOpen(false)} className="px-6 py-2.5 rounded-lg text-white text-[14px] font-medium" style={{ backgroundColor: P }}>Done</button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
