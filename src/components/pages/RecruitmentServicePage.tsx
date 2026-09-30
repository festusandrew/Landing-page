import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight, Menu, X, ChevronDown, Globe, Clock, Target, Users,
  Check, Mail, Phone, Building2, Briefcase, Send, CheckCircle2,
  Plus, Minus, FileText, ChevronRight,
} from 'lucide-react';

// ── Figma-imported images ────────────────────────────────────────────────────
import imgLouis from '@/src/imports/RecruitmentLandingPage/f8040af1a61ac9ad59fd58c84658cc44062206ba.png';
import imgLogistics from '@/src/imports/RecruitmentLandingPage/aa37e48f6c02d0a65f199fa158471a8040b91305.png';
import imgHealthcare from '@/src/imports/RecruitmentLandingPage/49d7528f8b3dc57a0295eda062854be297056b4d.png';
import imgHospitality from '@/src/imports/RecruitmentLandingPage/8c1cea987026a18528cb0bf86f4f814bb9bd4034.png';
import imgEducation from '@/src/imports/RecruitmentLandingPage/c511b99cc403642ea75f66bac88e333cc5768037.png';
import imgBlog1 from '@/src/imports/RecruitmentLandingPage/91cecfeff21bc6df8c61a3e31d6514b7efb231a6.png';
import imgBlog2 from '@/src/imports/RecruitmentLandingPage/7941db92e4d97482ed49a8f1a6fe4be0fca9562d.png';
import imgBlog3 from '@/src/imports/RecruitmentLandingPage/aaf772a81b05c538b61b11fa0d9c097a44c4309c.png';
import imgSarah from '@/src/imports/RecruitmentLandingPage/40b658c00757bb1aeede15376b9e7b2d32234f5c.png';
import imgJames from '@/src/imports/RecruitmentLandingPage/99891f367ad1c536e61556060274079b908b6cc0.png';
import imgMichael from '@/src/imports/RecruitmentLandingPage/ca27e31ef2c2e6763717010455537962ccdd0fe8.png';
import imgMployUs from '@/src/imports/RecruitmentLandingPage/afa262f7bab0644138f6a6848b0032c4e2a7d048.png';
import imgHiringDiscussion from '@/src/imports/RecruitmentLandingPage/d7b4f06932544d5c20501c4962c2946b7d37b4f0.png';

interface RecruitmentServicePageProps {
  onBackToHome: () => void;
  onBookDemo: (moduleTitle?: string) => void;
  onStartTrial: () => void;
}

// ── Design tokens (from Figma) ────────────────────────────────────────────────
const PRIMARY = '#810161';
const TEXT_DARK = '#364153';
const TEXT_MED = '#6a7282';
const TEXT_MUTED = '#99a1af';
const BG_LIGHT = '#f9fafb';
const BORDER = '#e5e7eb';
const BORDER_LIGHT = '#f3f4f6';

// ── Small helpers ─────────────────────────────────────────────────────────────
const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p style={{ color: TEXT_MUTED, letterSpacing: '1.56px' }}
    className="text-[13px] font-['Inter',sans-serif] uppercase font-normal mb-3">
    {children}
  </p>
);

const H2 = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <h2 style={{ color: PRIMARY }} className={`font-['Arimo',sans-serif] text-[36px] leading-[1.2] font-normal ${className}`}>
    {children}
  </h2>
);

export const RecruitmentServicePage: React.FC<RecruitmentServicePageProps> = ({
  onBackToHome,
  onBookDemo,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [contactStep, setContactStep] = useState<1 | 2 | 3>(1);
  const [contactType, setContactType] = useState<'Employer' | 'Candidate' | ''>('');
  const [cvStep, setCvStep] = useState<1 | 2>(1);
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', company: '', role: '', message: '' });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileOpen(false);
  };

  const openContact = () => {
    setContactStep(1); setContactType('');
    setContactForm({ name: '', email: '', phone: '', company: '', role: '', message: '' });
    setContactOpen(true);
  };
  const openCV = () => { setCvStep(1); setCvOpen(true); };

  const features = [
    { icon: Globe, label: 'Global Talent Access', desc: 'Source skilled professionals across multiple industries and geographies, with deep roots in the Irish market.' },
    { icon: Target, label: 'Local & Remote Roles', desc: 'Flexible hiring models whether you need on-site staff in Dublin or remote specialists working from anywhere.' },
    { icon: Check, label: 'Right-Fit Matching', desc: 'Our sourcing process goes beyond CVs. We evaluate culture fit, technical skills, and long-term potential.' },
    { icon: Clock, label: 'Faster Time-to-Hire', desc: 'Streamlined workflows and a pre-vetted talent pool mean you fill roles in days, not months.' },
  ];

  const services = [
    { n: '01', type: 'Permanent', title: 'Permanent Placement', desc: "Long-term hires for core roles. We identify, screen, and present candidates who'll grow with your organisation." },
    { n: '02', type: 'Contract', title: 'Contract Staffing', desc: 'Flexible staff for project-based work, seasonal peaks, or maternity cover without the overhead of permanent hires.' },
    { n: '03', type: 'RPO', title: 'Recruitment Process Outsourcing', desc: 'Outsource part or all of your hiring to our team. We embed in your process and work as an extension of your HR.' },
    { n: '04', type: 'Executive', title: 'Executive Search', desc: "Discreet headhunting for C-suite and senior leadership. We access networks that job boards can't reach." },
  ];

  const industries = [
    { img: imgLogistics, label: 'Logistics', sub: 'Warehouse, Supply Chain, Transport' },
    { img: imgHealthcare, label: 'Healthcare', sub: 'Nursing, Allied Health, Medical Admin' },
    { img: imgHospitality, label: 'Hospitality', sub: 'Hotels, Restaurants, Events' },
    { img: imgEducation, label: 'Education', sub: 'Teaching, SNA, Administration' },
  ];

  const articles = [
    { img: imgBlog1, cat: 'Industry', date: 'Feb 12, 2026', title: 'How Irish SMEs are rethinking recruitment in 2026' },
    { img: imgBlog2, cat: 'Strategy', date: 'Feb 6, 2026', title: 'Contract vs. permanent: which model fits your growth stage?' },
    { img: imgBlog3, cat: 'Trends', date: 'Jan 28, 2026', title: 'Workforce trends shaping healthcare staffing this year' },
  ];

  const testimonials = [
    { img: imgSarah, quote: '"MployUs cut our hiring timeline from eight weeks to twelve days. The candidates they presented actually understood our industry."', name: 'Sarah Jenkins', role: 'HR Director, TechFlow Solutions' },
    { img: imgJames, quote: '"Finding a Home Manager with the right clinical background and leadership skills is notoriously hard. MployUs delivered a shortlist in under two weeks."', name: 'Dr. James Wilson', role: 'Clinical Director, Sláinte Care Group' },
    { img: imgMichael, quote: '"We needed 14 warehouse operatives ahead of peak season. MployUs had them placed, vetted, and inducted within ten days."', name: 'Michael Chen', role: 'Operations Manager, FastFreight IE' },
  ];

  const faqs = [
    { q: 'How quickly can you fill a vacancy?', a: 'For permanent roles we typically deliver a qualified shortlist within 5–10 business days. Urgent or temporary cover can be arranged within 24–48 hours. Executive searches run on a 3–4 week shortlist timeline.' },
    { q: 'What sectors do you recruit for?', a: 'We specialise in logistics, healthcare & nursing, hospitality, and education across Ireland and the UK. We also recruit for technology, finance, and professional services on request.' },
    { q: 'How do you verify candidate compliance?', a: 'All candidates undergo enhanced DBS (UK) or Garda vetting (Ireland), right-to-work checks, professional licence verification, and two structured professional references before presentation.' },
    { q: 'What does your service cost?', a: 'Permanent placements are priced as a percentage of first-year salary, agreed in writing before search begins. Contract staffing operates on a weekly pay-and-margin model with full transparency. Volume and RPO engagements are project-priced.' },
    { q: "I'm a candidate — how do I register?", a: "Upload your CV via our candidate portal and a consultant will contact you within one business day. We'll match you to live roles and keep you on our radar as new opportunities arise." },
    { q: 'Do you offer a placement guarantee?', a: 'Yes. Every permanent placement is backed by a 90-day free replacement guarantee. If a candidate leaves or is let go within 90 days for reasons within our control, we re-recruit at no additional cost.' },
  ];

  return (
    <div className="min-h-screen bg-white font-['Inter',sans-serif]" style={{ color: TEXT_DARK }}>

      {/* ══════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════ */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white border-b" style={{ borderColor: BORDER }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 h-[68px] flex items-center justify-between gap-6">

          {/* Logo */}
          <div className="flex items-center gap-4">
            <button onClick={onBackToHome} className="flex items-center gap-1.5 text-xs font-medium transition-colors"
              style={{ color: TEXT_MUTED }}>
              <ChevronDown className="w-3.5 h-3.5 rotate-90" /> Back
            </button>
            <div className="w-px h-4" style={{ backgroundColor: BORDER }} />
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2.5">
              <img src={imgMployUs} alt="MployUs" className="h-7 w-auto object-contain" />
            </button>
          </div>

          {/* Nav links */}
          <nav className="hidden lg:flex items-center gap-7 text-[14px] font-medium" style={{ color: TEXT_MED }}>
            {[['Services', 'services'], ['Industries', 'industries'], ['Insights', 'insights'], ['FAQ', 'faq']].map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)}
                className="hover:transition-colors"
                style={{ color: TEXT_MED }}
                onMouseEnter={e => (e.currentTarget.style.color = PRIMARY)}
                onMouseLeave={e => (e.currentTarget.style.color = TEXT_MED)}>
                {label}
              </button>
            ))}
          </nav>

          {/* CTAs */}
          <div className="hidden lg:flex items-center gap-2.5">
            <button onClick={openCV}
              className="px-4 py-2 text-[14px] font-medium rounded-lg border transition-colors"
              style={{ borderColor: BORDER, color: TEXT_DARK }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = BG_LIGHT)}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'white')}>
              Upload CV
            </button>
            <button onClick={openContact}
              className="px-4 py-2 text-[14px] font-medium rounded-lg text-white flex items-center gap-2 transition-opacity hover:opacity-90"
              style={{ backgroundColor: PRIMARY }}>
              Request Talent <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(v => !v)} className="lg:hidden p-2 rounded-lg" style={{ color: TEXT_MED }}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className="lg:hidden bg-white border-t px-6 py-4 space-y-1" style={{ borderColor: BORDER }}>
              {[['Services', 'services'], ['Industries', 'industries'], ['Insights', 'insights'], ['FAQ', 'faq']].map(([label, id]) => (
                <button key={id} onClick={() => scrollTo(id)}
                  className="block w-full text-left py-2.5 text-[14px] font-medium border-b last:border-0"
                  style={{ color: TEXT_DARK, borderColor: BORDER_LIGHT }}>
                  {label}
                </button>
              ))}
              <div className="flex gap-2 pt-3">
                <button onClick={openCV} className="flex-1 py-2.5 border rounded-lg text-[14px] font-medium" style={{ borderColor: BORDER, color: TEXT_DARK }}>Upload CV</button>
                <button onClick={openContact} className="flex-1 py-2.5 rounded-lg text-white text-[14px] font-medium" style={{ backgroundColor: PRIMARY }}>Request Talent</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="pt-[68px]">

        {/* ══════════════════════════════════════
            HERO
        ══════════════════════════════════════ */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-start gap-12 lg:gap-16">

            {/* Left */}
            <div className="flex-1 min-w-0">
              <Eyebrow>Recruitment · Staffing · HR Advisory</Eyebrow>
              <h1 style={{ color: PRIMARY }} className="font-['Arimo',sans-serif] text-[48px] sm:text-[56px] leading-[1.12] font-normal mb-5">
                Find the right people.<br />Build a stronger team.
              </h1>
              <p className="text-[17px] leading-[1.65] max-w-lg mb-8" style={{ color: TEXT_MED }}>
                MployUs connects Irish businesses with skilled professionals across logistics, healthcare, hospitality, and education. Permanent, contract, or executive — we handle it.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                <button onClick={openContact}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-lg text-[15px] font-medium text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: PRIMARY }}>
                  Request Talent <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => scrollTo('services')}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-lg text-[15px] font-medium border transition-colors"
                  style={{ borderColor: BORDER, color: TEXT_DARK }}>
                  Explore Vacancies
                </button>
              </div>
              {/* Trust strip */}
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#00c950' }} />
                  <span className="text-[13px]" style={{ color: TEXT_MUTED }}>1,200+ placements</span>
                </div>
                <div className="w-px h-4" style={{ backgroundColor: BORDER }} />
                <span className="text-[13px]" style={{ color: TEXT_MUTED }}>4 industry sectors</span>
                <div className="w-px h-4" style={{ backgroundColor: BORDER }} />
                <span className="text-[13px]" style={{ color: TEXT_MUTED }}>Dublin &amp; Cork offices</span>
              </div>
            </div>

            {/* Right — consultant card */}
            <div className="w-full lg:w-[340px] shrink-0">
              <div className="bg-white rounded-2xl overflow-hidden border" style={{ borderColor: BORDER_LIGHT }}>
                <div className="h-[340px] overflow-hidden">
                  <img src={imgLouis} alt="Louis Moses — Talent Acquisition Specialist" className="w-full h-full object-cover object-top" />
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[16px] font-medium" style={{ color: PRIMARY }}>Louis Moses</p>
                      <p className="text-[13px]" style={{ color: TEXT_MED }}>Talent Acquisition Specialist</p>
                    </div>
                    <span className="text-[11px] font-medium px-3 py-1 rounded border tracking-wide uppercase"
                      style={{ backgroundColor: '#ecfdf5', borderColor: '#d0fae5', color: '#007a55' }}>
                      Top Rated
                    </span>
                  </div>
                  <div className="pt-4 border-t text-[13px] leading-relaxed" style={{ borderColor: BORDER_LIGHT, color: TEXT_MED }}>
                    Connected 1,000+ businesses with qualified candidates across Ireland and the UK.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            FEATURES STRIP
        ══════════════════════════════════════ */}
        <section id="services" className="py-16" style={{ backgroundColor: BG_LIGHT }}>
          <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
            <Eyebrow>What we offer</Eyebrow>
            <H2 className="mb-10 max-w-md">Recruitment services built around your business</H2>

            {/* 4-col grid separated by hairline borders */}
            <div className="rounded-xl overflow-hidden border" style={{ borderColor: BORDER }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-x divide-y" style={{ '--tw-divide-opacity': '1' } as React.CSSProperties}>
                {features.map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="bg-white p-8 flex flex-col gap-6">
                    <Icon className="w-5 h-5" style={{ color: TEXT_MUTED }} strokeWidth={1.25} />
                    <div>
                      <p className="text-[16px] font-medium mb-2" style={{ color: PRIMARY }}>{label}</p>
                      <p className="text-[14px] leading-[1.65]" style={{ color: TEXT_MED }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            TAILORED HIRING — numbered list + photo
        ══════════════════════════════════════ */}
        <section className="py-16 bg-white">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-12 lg:gap-16">

            {/* Left: image */}
            <div className="w-full lg:w-[420px] shrink-0 rounded-2xl overflow-hidden h-72 lg:h-auto" style={{ minHeight: '340px' }}>
              <img src={imgHiringDiscussion} alt="Hiring discussion" className="w-full h-full object-cover" />
            </div>

            {/* Right: numbered services */}
            <div className="flex-1 space-y-3">
              <Eyebrow>How we help</Eyebrow>
              <H2 className="mb-8">Tailored hiring solutions for every stage of growth</H2>
              {services.map(s => (
                <div key={s.n} className="flex gap-5 p-6 bg-white rounded-xl border" style={{ borderColor: BORDER_LIGHT }}>
                  <div className="w-10 h-10 rounded-lg shrink-0 flex items-center justify-center text-[13px]"
                    style={{ backgroundColor: BG_LIGHT, color: TEXT_MUTED, border: `1px solid ${BORDER_LIGHT}` }}>
                    {s.n}
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[1.1px] font-normal mb-1" style={{ color: TEXT_MUTED }}>{s.type}</p>
                    <p className="text-[17px] font-medium mb-1.5" style={{ color: PRIMARY }}>{s.title}</p>
                    <p className="text-[14px] leading-[1.65]" style={{ color: TEXT_MED }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            INDUSTRIES
        ══════════════════════════════════════ */}
        <section id="industries" className="py-16" style={{ backgroundColor: BG_LIGHT }}>
          <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
            <div className="flex items-end justify-between mb-10">
              <div>
                <Eyebrow>Industries we serve</Eyebrow>
                <H2 className="max-w-sm">Deep expertise in sectors that matter</H2>
              </div>
              <button onClick={openContact} className="hidden sm:flex items-center gap-2 text-[14px] transition-colors"
                style={{ color: TEXT_DARK }}
                onMouseEnter={e => (e.currentTarget.style.color = PRIMARY)}
                onMouseLeave={e => (e.currentTarget.style.color = TEXT_DARK)}>
                View all sectors <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {industries.map(ind => (
                <div key={ind.label} className="relative rounded-xl overflow-hidden h-[320px] group cursor-pointer">
                  <img src={ind.img} alt={ind.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  {/* Dark overlay */}
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(16,24,40,0.82) 0%, rgba(16,24,40,0.18) 50%, rgba(0,0,0,0) 100%)' }} />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-white text-[18px] font-medium leading-tight">{ind.label}</p>
                    <p className="text-[13px] mt-1" style={{ color: 'rgba(255,255,255,0.65)' }}>{ind.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            BLOG / INSIGHTS
        ══════════════════════════════════════ */}
        <section id="insights" className="py-16 bg-white">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
            <div className="flex items-end justify-between mb-10">
              <div>
                <Eyebrow>From the blog</Eyebrow>
                <H2>Latest insights &amp; trends</H2>
              </div>
              <button className="hidden sm:flex items-center gap-2 text-[14px]" style={{ color: TEXT_DARK }}
                onMouseEnter={e => (e.currentTarget.style.color = PRIMARY)}
                onMouseLeave={e => (e.currentTarget.style.color = TEXT_DARK)}>
                All articles <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {articles.map(a => (
                <button key={a.title} className="flex flex-col gap-4 text-left group">
                  <div className="rounded-xl overflow-hidden h-[200px]">
                    <img src={a.img} alt={a.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="flex items-center gap-3 text-[12px]">
                    <span style={{ color: PRIMARY }}>{a.cat}</span>
                    <span style={{ color: TEXT_MUTED }}>·</span>
                    <span style={{ color: TEXT_MUTED }}>{a.date}</span>
                  </div>
                  <p className="text-[16px] font-medium leading-snug transition-colors"
                    style={{ color: PRIMARY }}>
                    {a.title}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            TESTIMONIALS
        ══════════════════════════════════════ */}
        <section className="py-16" style={{ backgroundColor: BG_LIGHT }}>
          <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
            <Eyebrow>Client stories</Eyebrow>
            <H2 className="mb-10 max-w-sm">Trusted by companies across Ireland</H2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map(t => (
                <div key={t.name} className="bg-white rounded-xl p-6 border flex flex-col gap-5" style={{ borderColor: BORDER_LIGHT }}>
                  <p className="text-[15px] leading-[1.65] flex-1" style={{ color: '#4a5565' }}>{t.quote}</p>
                  <div className="flex items-center gap-3">
                    <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="text-[14px] font-medium" style={{ color: PRIMARY }}>{t.name}</p>
                      <p className="text-[12px]" style={{ color: TEXT_MUTED }}>{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            CONTACT FORM
        ══════════════════════════════════════ */}
        <section id="faq" className="py-16 bg-white">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Left: FAQ */}
            <div>
              <Eyebrow>Common questions</Eyebrow>
              <H2 className="mb-8">Everything you need to know</H2>
              <div className="space-y-2">
                {faqs.map((f, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div key={f.q} className="border rounded-xl overflow-hidden transition-all"
                      style={{ borderColor: isOpen ? PRIMARY : BORDER_LIGHT }}>
                      <button onClick={() => setOpenFaq(isOpen ? null : i)}
                        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                        style={{ backgroundColor: isOpen ? PRIMARY : 'white' }}>
                        <span className="text-[14px] font-medium leading-snug" style={{ color: isOpen ? 'white' : TEXT_DARK }}>{f.q}</span>
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                          style={{ backgroundColor: isOpen ? 'rgba(255,255,255,0.2)' : BG_LIGHT, border: `1px solid ${isOpen ? 'transparent' : BORDER_LIGHT}` }}>
                          {isOpen
                            ? <Minus className="w-3.5 h-3.5 text-white" />
                            : <Plus className="w-3.5 h-3.5" style={{ color: TEXT_MUTED }} />}
                        </div>
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 pt-4 text-[14px] leading-relaxed border-t" style={{ color: TEXT_MED, borderColor: 'rgba(129,1,97,0.1)' }}>
                          {f.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: contact form */}
            <div>
              <Eyebrow>Get in touch</Eyebrow>
              <H2 className="mb-2">Let's talk about your hiring needs</H2>
              <p className="text-[14px] leading-relaxed mb-8" style={{ color: TEXT_MED }}>
                Fill in the form and a specialist will respond within 2 business hours.
              </p>
              <div className="space-y-3">
                {[
                  { icon: Users, placeholder: 'Full name', key: 'name', type: 'text' },
                  { icon: Mail, placeholder: 'Email address', key: 'email', type: 'email' },
                  { icon: Phone, placeholder: 'Phone number', key: 'phone', type: 'tel' },
                  { icon: Building2, placeholder: 'Company name', key: 'company', type: 'text' },
                  { icon: Briefcase, placeholder: 'Role you need to fill', key: 'role', type: 'text' },
                ].map(({ icon: Icon, placeholder, key, type }) => (
                  <div key={key} className="flex items-center gap-3 px-4 py-3 rounded-lg border"
                    style={{ borderColor: BORDER, backgroundColor: BG_LIGHT }}>
                    <Icon className="w-4 h-4 shrink-0" style={{ color: TEXT_MUTED }} />
                    <input type={type} placeholder={placeholder}
                      value={contactForm[key as keyof typeof contactForm]}
                      onChange={e => setContactForm(f => ({ ...f, [key]: e.target.value }))}
                      className="bg-transparent text-[14px] outline-none w-full"
                      style={{ color: TEXT_DARK }} />
                  </div>
                ))}
                <textarea placeholder="Anything else you'd like to share…"
                  value={contactForm.message}
                  onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border text-[14px] outline-none resize-none"
                  style={{ borderColor: BORDER, backgroundColor: BG_LIGHT, color: TEXT_DARK }} />
                <button onClick={() => { onBookDemo('Recruitment Service'); }}
                  className="w-full py-3.5 rounded-lg text-white text-[15px] font-medium flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
                  style={{ backgroundColor: PRIMARY }}>
                  Send Enquiry <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            NEWSLETTER STRIP
        ══════════════════════════════════════ */}
        <section className="py-14 px-6 text-center text-white" style={{ backgroundColor: PRIMARY }}>
          <div className="max-w-xl mx-auto">
            <Eyebrow><span className="text-white/60">Stay in the loop</span></Eyebrow>
            <h2 className="font-['Arimo',sans-serif] text-[32px] font-normal leading-snug mb-2">
              Hiring insights, market trends &amp; salary reports
            </h2>
            <p className="text-[14px] mb-7 text-white/70">Delivered monthly. No spam, ever.</p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <div className="flex items-center gap-2.5 flex-1 px-4 py-3 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}>
                <Mail className="w-4 h-4 text-white/50 shrink-0" />
                <input placeholder="Enter your email" className="bg-transparent text-white text-[14px] placeholder-white/50 outline-none w-full" />
              </div>
              <button onClick={() => onBookDemo('Newsletter')}
                className="px-5 py-3 rounded-lg font-medium text-[14px] transition-opacity hover:opacity-90"
                style={{ backgroundColor: 'white', color: PRIMARY }}>
                Subscribe
              </button>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            FOOTER
        ══════════════════════════════════════ */}
        <footer className="bg-white border-t py-12 px-6" style={{ borderColor: BORDER }}>
          <div className="max-w-[1280px] mx-auto lg:px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b mb-8" style={{ borderColor: BORDER_LIGHT }}>
              <div className="md:col-span-2 space-y-4">
                <img src={imgMployUs} alt="MployUs" className="h-8 w-auto object-contain" />
                <p className="text-[14px] leading-relaxed max-w-xs" style={{ color: TEXT_MED }}>
                  Specialist managed recruitment for logistics, healthcare, hospitality, and education across Ireland and the UK.
                </p>
                <div className="flex items-center gap-2 text-[13px]" style={{ color: TEXT_MUTED }}>
                  <span className="flex items-center gap-1"><span>🇮🇪</span> Dublin</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><span>🇮🇪</span> Cork</span>
                </div>
              </div>
              {[
                { heading: 'Services', links: ['Permanent Placement', 'Contract Staffing', 'RPO', 'Executive Search', 'Compliance & Vetting'] },
                { heading: 'Company', links: ['About', 'Industries', 'Insights', 'Contact', 'Careers at MployUs'] },
              ].map(col => (
                <div key={col.heading}>
                  <p className="text-[11px] font-semibold uppercase tracking-widest mb-4" style={{ color: TEXT_MUTED }}>{col.heading}</p>
                  <ul className="space-y-2">
                    {col.links.map(l => (
                      <li key={l}>
                        <button className="text-[14px] transition-colors" style={{ color: TEXT_MED }}
                          onMouseEnter={e => (e.currentTarget.style.color = PRIMARY)}
                          onMouseLeave={e => (e.currentTarget.style.color = TEXT_MED)}>
                          {l}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px]" style={{ color: TEXT_MUTED }}>
              <p>© {new Date().getFullYear()} MployUs Recruit. All rights reserved.</p>
              <div className="flex items-center gap-5">
                <button className="hover:underline">Privacy Policy</button>
                <button className="hover:underline">Terms of Service</button>
                <button onClick={onBackToHome} className="hover:underline">Back to MployUs</button>
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
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setContactOpen(false)} />
            <motion.div className="relative bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 32 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}>
              <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: BORDER_LIGHT }}>
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-widest" style={{ color: PRIMARY }}>MployUs Recruit</p>
                  <h3 className="text-[18px] font-['Arimo',sans-serif]" style={{ color: PRIMARY }}>Request Talent</h3>
                </div>
                <button onClick={() => setContactOpen(false)} className="w-8 h-8 rounded-lg flex items-center justify-center border"
                  style={{ borderColor: BORDER_LIGHT, backgroundColor: BG_LIGHT }}>
                  <X className="w-4 h-4" style={{ color: TEXT_MED }} />
                </button>
              </div>
              <div className="p-5">
                {contactStep < 3 && (
                  <div className="flex gap-1.5 mb-5">
                    {[1, 2].map(s => (
                      <div key={s} className="h-1 flex-1 rounded-full transition-all"
                        style={{ backgroundColor: contactStep >= s ? PRIMARY : BORDER_LIGHT }} />
                    ))}
                  </div>
                )}
                {contactStep === 1 && (
                  <div className="space-y-4">
                    <p className="text-[14px]" style={{ color: TEXT_MED }}>Are you looking to hire, or looking for a role?</p>
                    <div className="space-y-2.5">
                      {[{ key: 'Employer' as const, icon: Building2, desc: "I'm looking to hire" }, { key: 'Candidate' as const, icon: Users, desc: "I'm looking for a role" }].map(({ key, icon: Icon, desc }) => (
                        <button key={key} onClick={() => setContactType(key)}
                          className="w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all"
                          style={{ borderColor: contactType === key ? PRIMARY : BORDER_LIGHT, backgroundColor: contactType === key ? 'rgba(129,1,97,0.04)' : 'white' }}>
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                            style={{ backgroundColor: contactType === key ? PRIMARY : BG_LIGHT }}>
                            <Icon className="w-5 h-5" style={{ color: contactType === key ? 'white' : TEXT_MED }} />
                          </div>
                          <div>
                            <p className="font-medium text-[14px]" style={{ color: TEXT_DARK }}>{key}</p>
                            <p className="text-[12px]" style={{ color: TEXT_MED }}>{desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                    <button disabled={!contactType} onClick={() => setContactStep(2)}
                      className="w-full py-3 rounded-lg text-white text-[14px] font-medium disabled:opacity-40 transition-opacity hover:opacity-90"
                      style={{ backgroundColor: PRIMARY }}>
                      Continue <ChevronRight className="inline w-4 h-4 ml-1" />
                    </button>
                  </div>
                )}
                {contactStep === 2 && (
                  <div className="space-y-3">
                    <p className="text-[14px] font-medium" style={{ color: TEXT_DARK }}>Your details</p>
                    {[
                      { icon: Users, placeholder: 'Full name', key: 'name', type: 'text' },
                      { icon: Mail, placeholder: 'Email address', key: 'email', type: 'email' },
                      { icon: Phone, placeholder: 'Phone number', key: 'phone', type: 'tel' },
                      ...(contactType === 'Employer' ? [{ icon: Building2, placeholder: 'Company name', key: 'company', type: 'text' }, { icon: Briefcase, placeholder: 'Role you need to fill', key: 'role', type: 'text' }] : [{ icon: Briefcase, placeholder: 'Your profession', key: 'role', type: 'text' }]),
                    ].map(({ icon: Icon, placeholder, key, type }) => (
                      <div key={key} className="flex items-center gap-3 px-4 py-3 rounded-lg border"
                        style={{ borderColor: BORDER, backgroundColor: BG_LIGHT }}>
                        <Icon className="w-4 h-4 shrink-0" style={{ color: TEXT_MUTED }} />
                        <input type={type} placeholder={placeholder}
                          value={contactForm[key as keyof typeof contactForm]}
                          onChange={e => setContactForm(f => ({ ...f, [key]: e.target.value }))}
                          className="bg-transparent text-[14px] outline-none w-full" style={{ color: TEXT_DARK }} />
                      </div>
                    ))}
                    <div className="flex gap-2 pt-1">
                      <button onClick={() => setContactStep(1)} className="px-4 py-3 text-[13px] font-medium rounded-lg border" style={{ borderColor: BORDER, color: TEXT_MED }}>← Back</button>
                      <button disabled={!contactForm.name || !contactForm.email}
                        onClick={() => { setContactStep(3); onBookDemo('Recruitment Service'); }}
                        className="flex-1 py-3 rounded-lg text-white text-[14px] font-medium disabled:opacity-40 flex items-center justify-center gap-2"
                        style={{ backgroundColor: PRIMARY }}>
                        <Send className="w-4 h-4" /> Send enquiry
                      </button>
                    </div>
                  </div>
                )}
                {contactStep === 3 && (
                  <div className="flex flex-col items-center text-center py-6 space-y-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgba(129,1,97,0.08)' }}>
                      <CheckCircle2 className="w-7 h-7" style={{ color: PRIMARY }} />
                    </div>
                    <div>
                      <h4 className="text-[18px] font-['Arimo',sans-serif]" style={{ color: PRIMARY }}>Enquiry received</h4>
                      <p className="text-[14px] mt-1 max-w-xs leading-relaxed" style={{ color: TEXT_MED }}>
                        A specialist will be in touch within 2 business hours.
                      </p>
                    </div>
                    <button onClick={() => setContactOpen(false)} className="px-6 py-2.5 rounded-lg text-white text-[14px] font-medium" style={{ backgroundColor: PRIMARY }}>Done</button>
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
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setCvOpen(false)} />
            <motion.div className="relative bg-white rounded-2xl w-full max-w-sm"
              initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 32 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}>
              <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: BORDER_LIGHT }}>
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-widest" style={{ color: PRIMARY }}>Candidates</p>
                  <h3 className="text-[18px] font-['Arimo',sans-serif]" style={{ color: PRIMARY }}>Upload your CV</h3>
                </div>
                <button onClick={() => setCvOpen(false)} className="w-8 h-8 rounded-lg flex items-center justify-center border"
                  style={{ borderColor: BORDER_LIGHT, backgroundColor: BG_LIGHT }}>
                  <X className="w-4 h-4" style={{ color: TEXT_MED }} />
                </button>
              </div>
              <div className="p-5">
                {cvStep === 1 ? (
                  <div className="space-y-3">
                    {[
                      { icon: Users, placeholder: 'Full name', type: 'text' },
                      { icon: Mail, placeholder: 'Email address', type: 'email' },
                      { icon: Briefcase, placeholder: 'Profession / job title', type: 'text' },
                    ].map(({ icon: Icon, placeholder, type }) => (
                      <div key={placeholder} className="flex items-center gap-3 px-4 py-3 rounded-lg border"
                        style={{ borderColor: BORDER, backgroundColor: BG_LIGHT }}>
                        <Icon className="w-4 h-4 shrink-0" style={{ color: TEXT_MUTED }} />
                        <input type={type} placeholder={placeholder} className="bg-transparent text-[14px] outline-none w-full" style={{ color: TEXT_DARK }} />
                      </div>
                    ))}
                    <div className="border-dashed border-2 rounded-xl px-5 py-8 text-center cursor-pointer transition-colors"
                      style={{ borderColor: BORDER }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = PRIMARY)}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = BORDER)}>
                      <FileText className="w-8 h-8 mx-auto mb-2" style={{ color: TEXT_MUTED }} />
                      <p className="text-[14px] font-medium mb-0.5" style={{ color: TEXT_DARK }}>Drop your CV here</p>
                      <p className="text-[12px]" style={{ color: TEXT_MUTED }}>PDF or Word · max 5 MB</p>
                    </div>
                    <button onClick={() => { setCvStep(2); onBookDemo('CV Upload'); }}
                      className="w-full py-3 rounded-lg text-white text-[14px] font-medium flex items-center justify-center gap-2"
                      style={{ backgroundColor: PRIMARY }}>
                      <Send className="w-4 h-4" /> Submit CV
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center py-6 space-y-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgba(129,1,97,0.08)' }}>
                      <CheckCircle2 className="w-7 h-7" style={{ color: PRIMARY }} />
                    </div>
                    <div>
                      <h4 className="text-[18px] font-['Arimo',sans-serif]" style={{ color: PRIMARY }}>CV received</h4>
                      <p className="text-[14px] mt-1 leading-relaxed max-w-xs" style={{ color: TEXT_MED }}>
                        A consultant will review your profile and be in touch within one business day.
                      </p>
                    </div>
                    <button onClick={() => setCvOpen(false)} className="px-6 py-2.5 rounded-lg text-white text-[14px] font-medium" style={{ backgroundColor: PRIMARY }}>Done</button>
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
