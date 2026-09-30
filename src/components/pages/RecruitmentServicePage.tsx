import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Briefcase, Users, ShieldCheck, Award, ArrowRight, Search, MapPin, Mail,
  Phone, ChevronDown, ChevronRight, Check, X, Menu, Clock, Star,
  Building2, FileText, TrendingUp, Target, Zap, CheckCircle2,
  Plus, Minus, UserPlus, Send, Globe, BookOpen, Layers,
} from 'lucide-react';

interface RecruitmentServicePageProps {
  onBackToHome: () => void;
  onBookDemo: (moduleTitle?: string) => void;
  onStartTrial: () => void;
}

// ── Animation helpers ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = (delay = 0.08) => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay } },
});

const Reveal = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    className={className}
    initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}
    variants={stagger(0.1)}
  >
    {children}
  </motion.div>
);

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <motion.p variants={fadeUp} className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-2 flex items-center gap-1.5">
    {children}
  </motion.p>
);

// ── Accent colour ────────────────────────────────────────────────────────────
const A = '#D97706'; // amber-600

export const RecruitmentServicePage: React.FC<RecruitmentServicePageProps> = ({
  onBackToHome,
  onBookDemo,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [roleFilter, setRoleFilter] = useState('All');
  const [contactStep, setContactStep] = useState<1 | 2 | 3>(1);
  const [contactType, setContactType] = useState<'Employer' | 'Candidate' | ''>('');
  const [cvStep, setCvStep] = useState<1 | 2>(1);
  const [contactForm, setContactForm] = useState({
    name: '', email: '', phone: '', company: '', role: '', message: '',
  });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileOpen(false);
  };

  // ── Data ────────────────────────────────────────────────────────────────────
  const services = [
    {
      icon: Users, title: 'Permanent Placement',
      desc: 'End-to-end search, screening, and placement for full-time roles across all sectors and seniority levels.',
      points: ['Multi-channel candidate sourcing', 'Structured competency interviews', '90-day replacement guarantee'],
    },
    {
      icon: Clock, title: 'Temporary & Contract',
      desc: 'Flexible short-term and contract staffing to cover peaks, projects, and planned absences — fast.',
      points: ['Same-day cover capability', 'Fully vetted, ready-to-start candidates', 'Weekly timesheet & payroll management'],
    },
    {
      icon: Target, title: 'Executive Search',
      desc: 'Discreet headhunting for leadership, director, and C-suite positions requiring deep market knowledge.',
      points: ['Confidential market mapping', 'Passive candidate engagement', 'Guaranteed shortlist within 3 weeks'],
    },
    {
      icon: Layers, title: 'Volume Hiring',
      desc: 'Scalable recruitment solutions for high-growth businesses, project teams, or seasonal demand spikes.',
      points: ['Dedicated hiring project managers', 'ATS integration & bulk processing', 'SLA-backed fill-rate targets'],
    },
    {
      icon: ShieldCheck, title: 'Compliance & Vetting',
      desc: 'Comprehensive background checks, licence verification, and right-to-work audits managed for every candidate.',
      points: ['Enhanced DBS & Garda vetting', 'NMC / PSI / GPhC licence checks', 'Digital compliance vault per candidate'],
    },
    {
      icon: TrendingUp, title: 'Workforce Planning',
      desc: 'Strategic talent pipeline consulting to help you anticipate hiring needs and reduce time-to-hire over time.',
      points: ['Salary benchmarking reports', 'Workforce gap analysis', 'Quarterly talent market briefings'],
    },
  ];

  const industries = [
    { icon: '🏥', label: 'Healthcare & Nursing' },
    { icon: '💊', label: 'Pharmacy' },
    { icon: '🤝', label: 'Social Care' },
    { icon: '💻', label: 'Technology & IT' },
    { icon: '📊', label: 'Finance & Accounting' },
    { icon: '⚙️', label: 'Engineering' },
    { icon: '🎓', label: 'Education' },
    { icon: '🏨', label: 'Hospitality' },
  ];

  const openRoles = [
    { title: 'Home Manager', type: 'Permanent', sector: 'Healthcare', location: 'Cork, IE', salary: '€55k – €68k', urgent: false },
    { title: 'Registered Nurse (Community)', type: 'Permanent', sector: 'Healthcare', location: 'Dublin, IE', salary: '€40k – €50k', urgent: true },
    { title: 'Senior Software Engineer', type: 'Permanent', sector: 'Technology', location: 'Remote / Hybrid', salary: '£65k – £85k', urgent: false },
    { title: 'Pharmacy Technician', type: 'Full-time', sector: 'Pharmacy', location: 'Manchester, UK', salary: '£28k – £34k', urgent: false },
    { title: 'Finance Manager', type: 'Permanent', sector: 'Finance', location: 'London, UK', salary: '£72k – £88k', urgent: true },
    { title: 'Care Coordinator', type: 'Permanent', sector: 'Social Care', location: 'Birmingham, UK', salary: '£30k – £36k', urgent: false },
  ];

  const steps = [
    { n: '01', title: 'Brief us', desc: "Share your requirements in a 20-minute call. We'll confirm timelines, rates, and what good looks like for your role." },
    { n: '02', title: 'We search', desc: 'Our specialists identify, approach, and screen candidates — including passive talent not on job boards.' },
    { n: '03', title: 'You choose', desc: 'Receive a curated shortlist of pre-screened, compliance-verified candidates ready to interview.' },
    { n: '04', title: 'Hire with confidence', desc: 'We handle offer management, referencing, and onboarding support. Every placement is backed by our 90-day guarantee.' },
  ];

  const testimonials = [
    {
      quote: "We placed three Home Managers in six weeks — roles we'd been trying to fill for months through other agencies. The shortlists were genuinely high quality.",
      name: 'Sarah Brennan', role: 'Regional Director', company: 'Sláinte Care Group',
    },
    {
      quote: "The compliance piece alone justified switching to MployUs Recruit. Every candidate arrived fully vetted. Zero chasing, zero surprises.",
      name: 'James Tierney', role: 'Head of HR', company: 'HealthBridge UK',
    },
  ];

  const faqs = [
    { q: 'How quickly can you fill a vacancy?', a: 'For permanent roles, we typically deliver a qualified shortlist within 5–10 business days. Urgent or temporary cover can be arranged within 24–48 hours depending on the role and location. Executive searches run on a 3–4 week shortlist timeline.' },
    { q: 'What is your placement guarantee?', a: 'Every permanent placement is backed by a 90-day free replacement guarantee. If a candidate leaves or is let go within 90 days of start date for reasons within our control, we re-recruit at no additional cost.' },
    { q: 'How do you verify candidate compliance?', a: 'All candidates undergo enhanced DBS (UK) or Garda vetting (Ireland), right-to-work verification, professional licence checks (NMC, GPhC, PSI, CORU as applicable), and two professional references before being presented to you. Documents are stored in a secure digital compliance vault.' },
    { q: 'What does your service cost?', a: 'Permanent placements are typically priced as a percentage of first-year salary, agreed in advance. Temporary and contract staffing is priced on a weekly pay-and-margin model with full rate transparency. Volume and retained search are priced on project terms. Contact us for a tailored quote.' },
    { q: "I'm a candidate — can I register directly?", a: "Yes. Upload your CV and availability via our candidate portal and a specialist will contact you within one business day. We'll match you to live roles and keep you informed as new opportunities arise that fit your profile." },
    { q: 'Do you work outside Ireland and the UK?', a: 'Currently our primary markets are Ireland (Republic and Northern Ireland) and Great Britain. We have partner networks for international placements — particularly within the EU — and can discuss cross-border requirements on a case-by-case basis.' },
    { q: 'Can you handle RPO (Recruitment Process Outsourcing)?', a: 'Yes. For organisations looking to outsource part or all of their recruitment function, we offer dedicated RPO engagements with embedded consultants, branded hiring portals, and full reporting dashboards.' },
  ];

  const sectors = ['All', 'Healthcare', 'Pharmacy', 'Technology', 'Finance', 'Social Care'];
  const filteredRoles = roleFilter === 'All' ? openRoles : openRoles.filter(r => r.sector === roleFilter);

  const openContact = () => { setContactStep(1); setContactType(''); setContactForm({ name: '', email: '', phone: '', company: '', role: '', message: '' }); setContactOpen(true); };
  const openCV = () => { setCvStep(1); setCvOpen(true); };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">

      {/* ══════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════ */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white border-b border-black/5">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 h-[70px] flex items-center justify-between gap-6">
          {/* Logo + back */}
          <div className="flex items-center gap-4">
            <button onClick={onBackToHome} className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-900 transition-colors">
              <ChevronDown className="w-3.5 h-3.5 rotate-90" /> Back
            </button>
            <div className="w-px h-4 bg-slate-200" />
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-slate-900 text-sm">MployUs <span className="text-amber-600">Recruit</span></span>
            </button>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-500">
            {[['Services', 'services'], ['Industries', 'industries'], ['Open Roles', 'roles'], ['FAQ', 'faq']].map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)} className="hover:text-slate-900 transition-colors">{label}</button>
            ))}
          </nav>

          {/* CTAs */}
          <div className="hidden lg:flex items-center gap-2">
            <button onClick={openCV} className="px-4 py-2 text-sm font-semibold text-slate-700 border border-black/5 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-400" /> Upload CV
            </button>
            <button onClick={openContact} className="px-4 py-2 text-sm font-bold bg-amber-500 hover:bg-amber-600 text-white rounded-xl transition-colors flex items-center gap-2">
              Book Consultation <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button onClick={() => setMobileOpen(v => !v)} className="lg:hidden p-2 rounded-lg text-slate-500">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className="lg:hidden bg-white border-t border-black/5 px-6 py-4 space-y-1">
              {[['Services', 'services'], ['Industries', 'industries'], ['Open Roles', 'roles'], ['FAQ', 'faq']].map(([label, id]) => (
                <button key={id} onClick={() => scrollTo(id)} className="block w-full text-left py-2.5 text-sm font-semibold text-slate-700 border-b border-black/5 last:border-0">
                  {label}
                </button>
              ))}
              <div className="flex gap-2 pt-2">
                <button onClick={openCV} className="flex-1 py-2.5 border border-black/5 rounded-xl text-sm font-semibold text-slate-700">Upload CV</button>
                <button onClick={openContact} className="flex-1 py-2.5 bg-amber-500 text-white rounded-xl text-sm font-bold">Book Consultation</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="pt-[70px]">

        {/* ══════════════════════════════════════
            HERO
        ══════════════════════════════════════ */}
        <section className="bg-slate-900 py-20 px-6">
          <div className="max-w-[1280px] mx-auto lg:px-6">
            <motion.div variants={stagger(0.1)} initial="hidden" animate="visible" className="max-w-2xl">
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-black/5 text-white/80 text-xs font-semibold uppercase tracking-widest mb-6">
                <Briefcase className="w-3.5 h-3.5 text-amber-400" /> Managed Recruitment Service
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl font-bold text-white leading-[1.06] tracking-tight mb-5">
                Find the right people.<br />
                <span className="text-amber-400">Faster.</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-white/65 text-lg leading-relaxed mb-8 max-w-xl">
                Specialist recruitment for healthcare, technology, and professional services across Ireland and the UK. Permanent, contract, and executive search — all compliance-verified.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-10">
                <button onClick={openContact} className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm rounded-xl transition-colors">
                  Book a Consultation <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => scrollTo('roles')} className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 text-white font-semibold text-sm rounded-xl transition-colors">
                  Browse Open Roles
                </button>
              </motion.div>
              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
                {['DBS & Garda Vetted', '90-Day Guarantee', 'Ireland & UK'].map(b => (
                  <span key={b} className="flex items-center gap-1.5 text-xs text-white/50 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> {b}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            STATS STRIP
        ══════════════════════════════════════ */}
        <section className="bg-amber-500 border-y border-black/5">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { val: '4,200+', label: 'Placements made' },
              { val: '94%', label: 'Fill rate' },
              { val: '12 days', label: 'Avg. time to shortlist' },
              { val: '90-day', label: 'Placement guarantee' },
            ].map(({ val, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-bold text-white">{val}</div>
                <div className="text-white/75 text-xs font-medium mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════
            SERVICES
        ══════════════════════════════════════ */}
        <section id="services" className="py-20 bg-white px-6">
          <div className="max-w-[1280px] mx-auto lg:px-6">
            <Reveal className="mb-12">
              <SectionLabel><Zap className="w-3.5 h-3.5" /> What we do</SectionLabel>
              <motion.h2 variants={fadeUp} className="text-4xl font-bold text-slate-900 tracking-tight">
                Recruitment that covers<br />every hiring need
              </motion.h2>
              <motion.p variants={fadeUp} className="text-slate-500 text-base mt-3 max-w-xl leading-relaxed">
                From a single permanent hire to a full outsourced recruitment function — we adapt to how you need to grow.
              </motion.p>
            </Reveal>

            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              variants={stagger(0.07)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {services.map((s) => {
                const Icon = s.icon;
                return (
                  <motion.div key={s.title} variants={fadeUp}
                    className="p-6 bg-white border border-black/5 rounded-2xl group cursor-pointer"
                    whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                    <div className="w-10 h-10 rounded-xl bg-amber-50 border border-black/5 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-amber-600" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">{s.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-4">{s.desc}</p>
                    <ul className="space-y-1.5">
                      {s.points.map(p => (
                        <li key={p} className="flex items-start gap-2 text-xs text-slate-600 font-medium">
                          <Check className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" /> {p}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            HOW IT WORKS
        ══════════════════════════════════════ */}
        <section id="how-it-works" className="py-20 bg-slate-50 px-6 border-y border-black/5">
          <div className="max-w-[1280px] mx-auto lg:px-6">
            <Reveal className="mb-12 text-center">
              <SectionLabel><Target className="w-3.5 h-3.5" /> Our process</SectionLabel>
              <motion.h2 variants={fadeUp} className="text-4xl font-bold text-slate-900 tracking-tight">
                From brief to hire — in four steps
              </motion.h2>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {steps.map((s, i) => (
                <motion.div key={s.n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="bg-white border border-black/5 rounded-2xl p-6 relative">
                  <div className="text-4xl font-black text-amber-100 mb-3">{s.n}</div>
                  <h3 className="font-bold text-slate-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 z-10 w-6 h-6 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center">
                      <ChevronRight className="w-3 h-3 text-white" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.4 }}
              className="mt-10 text-center">
              <button onClick={openContact} className="inline-flex items-center gap-2 px-7 py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm rounded-xl transition-colors">
                Start with a free consultation <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            INDUSTRIES
        ══════════════════════════════════════ */}
        <section id="industries" className="py-20 bg-white px-6">
          <div className="max-w-[1280px] mx-auto lg:px-6">
            <Reveal className="mb-12">
              <SectionLabel><Globe className="w-3.5 h-3.5" /> Sectors we serve</SectionLabel>
              <motion.h2 variants={fadeUp} className="text-4xl font-bold text-slate-900 tracking-tight">
                Deep expertise across<br />eight sectors
              </motion.h2>
              <motion.p variants={fadeUp} className="text-slate-500 text-base mt-3 max-w-lg leading-relaxed">
                Our consultants specialise by sector — not generalists. When you brief us, you're talking to someone who knows your market.
              </motion.p>
            </Reveal>

            <motion.div className="grid grid-cols-2 sm:grid-cols-4 gap-4"
              variants={stagger(0.07)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {industries.map((ind) => (
                <motion.div key={ind.label} variants={fadeUp}
                  className="flex flex-col items-center gap-3 p-6 bg-slate-50 border border-black/5 rounded-2xl group cursor-default"
                  whileHover={{ y: -3, backgroundColor: '#fffbeb' }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                  <span className="text-3xl">{ind.icon}</span>
                  <p className="text-sm font-bold text-slate-800 text-center leading-snug">{ind.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            OPEN ROLES
        ══════════════════════════════════════ */}
        <section id="roles" className="py-20 bg-slate-50 px-6 border-y border-black/5">
          <div className="max-w-[1280px] mx-auto lg:px-6">
            <Reveal className="mb-8">
              <SectionLabel><Search className="w-3.5 h-3.5" /> Live vacancies</SectionLabel>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <motion.h2 variants={fadeUp} className="text-4xl font-bold text-slate-900 tracking-tight">
                  {filteredRoles.length} open roles
                </motion.h2>
                <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
                  {sectors.map(s => (
                    <button key={s} onClick={() => setRoleFilter(s)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${roleFilter === s ? 'bg-amber-500 text-white' : 'bg-white border border-black/5 text-slate-600 hover:bg-slate-100'}`}>
                      {s}
                    </button>
                  ))}
                </motion.div>
              </div>
            </Reveal>

            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              variants={stagger(0.06)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}>
              {filteredRoles.map((r) => (
                <motion.div key={r.title} variants={fadeUp}
                  className="bg-white border border-black/5 rounded-2xl p-5 flex flex-col gap-3 group"
                  whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 border border-black/5 flex items-center justify-center shrink-0">
                      <Briefcase className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="flex gap-1.5">
                      {r.urgent && <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 text-[10px] font-bold border border-black/5">Urgent</span>}
                      <span className="px-2 py-0.5 rounded-full bg-slate-50 text-slate-600 text-[10px] font-bold border border-black/5">{r.type}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-amber-600 transition-colors">{r.title}</h3>
                    <p className="text-[11px] text-amber-600 font-semibold mt-0.5">{r.sector}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {r.location}</span>
                    <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" /> {r.salary}</span>
                  </div>
                  <button onClick={openCV}
                    className="mt-auto w-full py-2.5 bg-slate-50 hover:bg-amber-500 hover:text-white border border-black/5 text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5">
                    Apply Now <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.3 }}
              className="mt-8 text-center">
              <p className="text-sm text-slate-500 mb-3">Don't see the right role? Upload your CV and we'll match you to opportunities as they arise.</p>
              <button onClick={openCV} className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-colors">
                <FileText className="w-4 h-4" /> Upload your CV
              </button>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            TESTIMONIALS
        ══════════════════════════════════════ */}
        <section className="py-20 bg-white px-6">
          <div className="max-w-[1280px] mx-auto lg:px-6">
            <Reveal className="mb-12 text-center">
              <SectionLabel><Star className="w-3.5 h-3.5" /> Client stories</SectionLabel>
              <motion.h2 variants={fadeUp} className="text-4xl font-bold text-slate-900 tracking-tight">
                What our clients say
              </motion.h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {testimonials.map((t, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.12 }}
                  className="bg-slate-50 border border-black/5 rounded-2xl p-7">
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, si) => <Star key={si} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                  </div>
                  <p className="text-[15px] text-slate-700 leading-relaxed mb-5 italic">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center text-white text-sm font-bold">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{t.name}</p>
                      <p className="text-xs text-slate-500">{t.role} · {t.company}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            WHY US STRIP
        ══════════════════════════════════════ */}
        <section className="bg-slate-900 py-14 px-6">
          <div className="max-w-[1280px] mx-auto lg:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <p className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">Why MployUs Recruit</p>
                <h2 className="text-2xl font-bold text-white leading-snug">What sets us apart</h2>
              </div>
              <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { icon: ShieldCheck, title: 'Full compliance stack', desc: 'DBS, Garda vetting, right-to-work, and professional licence checks on every candidate — automated and auditable.' },
                  { icon: Award, title: '90-day guarantee', desc: 'Every permanent placement is backed by a free replacement guarantee. We stand behind every hire we make.' },
                  { icon: UserPlus, title: 'Sector specialists', desc: 'Each consultant works exclusively within their sector. No generalists. Deep market knowledge on every brief.' },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 border border-black/5 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-amber-400" />
                    </div>
                    <h3 className="font-bold text-white text-sm">{title}</h3>
                    <p className="text-xs text-white/55 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            FAQ
        ══════════════════════════════════════ */}
        <section id="faq" className="py-20 bg-white px-6">
          <div className="max-w-[1280px] mx-auto lg:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">
              <div className="lg:col-span-1">
                <Reveal>
                  <SectionLabel><BookOpen className="w-3.5 h-3.5" /> FAQs</SectionLabel>
                  <motion.h2 variants={fadeUp} className="text-3xl font-bold text-slate-900 tracking-tight mb-4">
                    Common questions
                  </motion.h2>
                  <motion.p variants={fadeUp} className="text-slate-500 text-sm leading-relaxed mb-6">
                    Can't find your answer? Get in touch and we'll come back to you within two hours on business days.
                  </motion.p>
                  <motion.div variants={fadeUp}>
                    <button onClick={openContact} className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm rounded-xl transition-colors">
                      Contact us <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                </Reveal>
              </div>

              <div className="lg:col-span-2 space-y-3">
                {faqs.map((f, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <motion.div key={f.q} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.05 }}
                      className={`rounded-2xl border overflow-hidden transition-all ${isOpen ? 'border-amber-500' : 'border-black/5 bg-white hover:border-black/10'}`}>
                      <button onClick={() => setOpenFaq(isOpen ? null : i)}
                        className={`w-full flex items-center justify-between gap-4 px-5 py-4 text-left transition-colors ${isOpen ? 'bg-amber-500' : 'bg-white'}`}>
                        <span className={`text-sm font-semibold leading-snug ${isOpen ? 'text-white' : 'text-slate-900'}`}>{f.q}</span>
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${isOpen ? 'bg-white/20' : 'bg-slate-50 border border-black/5'}`}>
                          {isOpen ? <Minus className="w-3.5 h-3.5 text-white" /> : <Plus className="w-3.5 h-3.5 text-slate-500" />}
                        </div>
                      </button>
                      {isOpen && (
                        <div className="bg-white px-5 pb-5 pt-4 text-[14px] text-slate-600 leading-relaxed border-t border-amber-500/10">
                          {f.a}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            CTA STRIP
        ══════════════════════════════════════ */}
        <section className="bg-amber-500 py-16 px-6">
          <div className="max-w-[1280px] mx-auto lg:px-6 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-xs font-bold text-white/70 uppercase tracking-widest mb-2">Get started today</p>
              <h2 className="text-3xl font-bold text-white leading-snug">Ready to hire smarter?</h2>
              <p className="text-white/75 text-sm mt-2 max-w-md leading-relaxed">
                Book a free 20-minute consultation and receive a tailored recruitment proposal within 24 hours.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <button onClick={openContact} className="px-7 py-3.5 bg-white text-amber-600 font-bold text-sm rounded-xl flex items-center gap-2 transition-colors hover:bg-amber-50">
                Book a Consultation <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={openCV} className="px-7 py-3.5 bg-white/10 border border-white/20 text-white font-semibold text-sm rounded-xl hover:bg-white/20 transition-colors">
                Upload CV
              </button>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            FOOTER
        ══════════════════════════════════════ */}
        <footer className="bg-slate-950 text-slate-400 px-6 pt-14 pb-10">
          <div className="max-w-[1280px] mx-auto lg:px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-white/5">
              <div className="md:col-span-2 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-bold text-white text-sm">MployUs <span className="text-amber-400">Recruit</span></span>
                </div>
                <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
                  Specialist managed recruitment for healthcare, technology, and professional services across Ireland and the UK.
                </p>
                <div className="flex items-center gap-3">
                  {['IE', 'UK'].map(r => (
                    <span key={r} className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-xs font-semibold text-slate-500">{r}</span>
                  ))}
                </div>
              </div>
              {[
                { heading: 'Services', links: ['Permanent Placement', 'Temp & Contract', 'Executive Search', 'Volume Hiring', 'Compliance & Vetting'] },
                { heading: 'Company', links: ['About', 'Industries', 'Open Roles', 'For Employers', 'Contact'] },
              ].map(col => (
                <div key={col.heading}>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-4">{col.heading}</p>
                  <ul className="space-y-2">
                    {col.links.map(l => (
                      <li key={l}>
                        <button onClick={openContact} className="text-sm text-slate-500 hover:text-white transition-colors text-left">{l}</button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
              <p>© {new Date().getFullYear()} MployUs Recruit. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <button className="hover:text-white transition-colors">Privacy Policy</button>
                <button className="hover:text-white transition-colors">Terms of Service</button>
                <button onClick={onBackToHome} className="hover:text-white transition-colors">Back to MployUs</button>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* ══════════════════════════════════════
          CONTACT MODAL
      ══════════════════════════════════════ */}
      <AnimatePresence>
        {contactOpen && (
          <motion.div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setContactOpen(false)} />
            <motion.div className="relative bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, y: 40, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}>

              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-black/5">
                <div>
                  <p className="text-xs font-bold text-amber-600 uppercase tracking-widest">MployUs Recruit</p>
                  <h3 className="text-lg font-bold text-slate-900">Book a consultation</h3>
                </div>
                <button onClick={() => setContactOpen(false)} className="w-8 h-8 rounded-lg bg-slate-50 border border-black/5 flex items-center justify-center">
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              <div className="p-5">
                {/* Progress */}
                {contactStep < 3 && (
                  <div className="flex gap-1.5 mb-5">
                    {[1, 2].map(s => (
                      <div key={s} className={`h-1 flex-1 rounded-full transition-all ${contactStep >= s ? 'bg-amber-500' : 'bg-slate-100'}`} />
                    ))}
                  </div>
                )}

                {/* Step 1 — Who are you? */}
                {contactStep === 1 && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-slate-900 mb-0.5">How can we help?</h4>
                      <p className="text-xs text-slate-500">Tell us whether you're looking to hire or looking for a role.</p>
                    </div>
                    <div className="space-y-2.5">
                      {[
                        { key: 'Employer' as const, icon: Building2, desc: "I'm looking to hire" },
                        { key: 'Candidate' as const, icon: Users, desc: "I'm looking for a role" },
                      ].map(({ key, icon: Icon, desc }) => (
                        <button key={key} onClick={() => setContactType(key)}
                          className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${contactType === key ? 'border-amber-500 bg-amber-50' : 'border-black/5 bg-white hover:bg-slate-50'}`}>
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${contactType === key ? 'bg-amber-500' : 'bg-slate-100'}`}>
                            <Icon className={`w-5 h-5 ${contactType === key ? 'text-white' : 'text-slate-500'}`} />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 text-sm">{key}</p>
                            <p className="text-xs text-slate-500">{desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                    <button disabled={!contactType} onClick={() => setContactStep(2)}
                      className="w-full py-3 bg-amber-500 disabled:opacity-40 hover:bg-amber-600 text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-1.5">
                      Continue <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Step 2 — Details */}
                {contactStep === 2 && (
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-bold text-slate-900 mb-0.5">Your details</h4>
                      <p className="text-xs text-slate-500">A specialist will reach out within 2 hours on business days.</p>
                    </div>
                    <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-50 border border-black/5 focus-within:border-amber-500 transition-colors">
                      <Users className="w-4 h-4 text-slate-400 shrink-0" />
                      <input placeholder="Full name" value={contactForm.name} onChange={e => setContactForm(f => ({ ...f, name: e.target.value }))}
                        className="bg-transparent text-sm outline-none w-full" />
                    </div>
                    <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-50 border border-black/5 focus-within:border-amber-500 transition-colors">
                      <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                      <input type="email" placeholder="Email address" value={contactForm.email} onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))}
                        className="bg-transparent text-sm outline-none w-full" />
                    </div>
                    <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-50 border border-black/5 focus-within:border-amber-500 transition-colors">
                      <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                      <input placeholder="Phone number" value={contactForm.phone} onChange={e => setContactForm(f => ({ ...f, phone: e.target.value }))}
                        className="bg-transparent text-sm outline-none w-full" />
                    </div>
                    {contactType === 'Employer' && (
                      <>
                        <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-50 border border-black/5 focus-within:border-amber-500 transition-colors">
                          <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                          <input placeholder="Company / organisation name" value={contactForm.company} onChange={e => setContactForm(f => ({ ...f, company: e.target.value }))}
                            className="bg-transparent text-sm outline-none w-full" />
                        </div>
                        <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-50 border border-black/5 focus-within:border-amber-500 transition-colors">
                          <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
                          <input placeholder="Role you're looking to fill" value={contactForm.role} onChange={e => setContactForm(f => ({ ...f, role: e.target.value }))}
                            className="bg-transparent text-sm outline-none w-full" />
                        </div>
                      </>
                    )}
                    {contactType === 'Candidate' && (
                      <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-50 border border-black/5 focus-within:border-amber-500 transition-colors">
                        <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
                        <input placeholder="Your profession / discipline" value={contactForm.role} onChange={e => setContactForm(f => ({ ...f, role: e.target.value }))}
                          className="bg-transparent text-sm outline-none w-full" />
                      </div>
                    )}
                    <textarea placeholder="Any additional context or questions…" value={contactForm.message} onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))}
                      rows={3} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-black/5 focus:border-amber-500 text-sm outline-none resize-none transition-colors" />
                    <div className="flex gap-2 pt-1">
                      <button onClick={() => setContactStep(1)} className="px-4 py-3 text-sm font-semibold text-slate-500 hover:text-slate-900 border border-black/5 rounded-xl transition-colors">← Back</button>
                      <button disabled={!contactForm.name || !contactForm.email} onClick={() => { setContactStep(3); onBookDemo('Recruitment Service'); }}
                        className="flex-1 py-3 bg-amber-500 disabled:opacity-40 hover:bg-amber-600 text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2">
                        <Send className="w-4 h-4" /> Send enquiry
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3 — Success */}
                {contactStep === 3 && (
                  <div className="flex flex-col items-center text-center py-6 space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-black/5 flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">Enquiry received</h4>
                      <p className="text-sm text-slate-500 mt-1 max-w-xs leading-relaxed">
                        A specialist will be in touch within 2 business hours. We look forward to speaking with you.
                      </p>
                    </div>
                    <button onClick={() => setContactOpen(false)} className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm rounded-xl transition-colors">
                      Done
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════
          CV UPLOAD MODAL
      ══════════════════════════════════════ */}
      <AnimatePresence>
        {cvOpen && (
          <motion.div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setCvOpen(false)} />
            <motion.div className="relative bg-white rounded-2xl w-full max-w-sm"
              initial={{ opacity: 0, y: 40, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}>

              <div className="flex items-center justify-between p-5 border-b border-black/5">
                <div>
                  <p className="text-xs font-bold text-amber-600 uppercase tracking-widest">Candidates</p>
                  <h3 className="text-lg font-bold text-slate-900">Upload your CV</h3>
                </div>
                <button onClick={() => setCvOpen(false)} className="w-8 h-8 rounded-lg bg-slate-50 border border-black/5 flex items-center justify-center">
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              <div className="p-5">
                {cvStep === 1 ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-50 border border-black/5 focus-within:border-amber-500 transition-colors">
                      <Users className="w-4 h-4 text-slate-400 shrink-0" />
                      <input placeholder="Full name" className="bg-transparent text-sm outline-none w-full" />
                    </div>
                    <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-50 border border-black/5 focus-within:border-amber-500 transition-colors">
                      <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                      <input type="email" placeholder="Email address" className="bg-transparent text-sm outline-none w-full" />
                    </div>
                    <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-50 border border-black/5 focus-within:border-amber-500 transition-colors">
                      <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
                      <input placeholder="Profession / job title" className="bg-transparent text-sm outline-none w-full" />
                    </div>
                    {/* File drop zone */}
                    <div className="border border-dashed border-black/10 rounded-xl px-5 py-8 text-center bg-slate-50 cursor-pointer hover:bg-amber-50 hover:border-amber-300 transition-colors">
                      <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      <p className="text-sm font-semibold text-slate-700 mb-0.5">Drop your CV here</p>
                      <p className="text-xs text-slate-400">PDF or Word · max 5 MB</p>
                    </div>
                    <button onClick={() => { setCvStep(2); onBookDemo('CV Upload'); }}
                      className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" /> Submit CV
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center py-6 space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-black/5 flex items-center justify-center">
                      <CheckCircle2 className="w-7 h-7 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">CV received</h4>
                      <p className="text-sm text-slate-500 mt-1 max-w-xs leading-relaxed">
                        A consultant will review your profile and be in touch within one business day.
                      </p>
                    </div>
                    <button onClick={() => setCvOpen(false)} className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm rounded-xl transition-colors">
                      Done
                    </button>
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
