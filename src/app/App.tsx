import React, { useState } from 'react';
import { createBrowserRouter, Link, RouterProvider, useLocation, useNavigate } from 'react-router';
import { MotionConfig } from 'motion/react';
import { PolicyPage, SoftwareAnimation } from '../components/PlatformExperiences';
import { ArrowUpRight, ArrowRight, ChevronDown, Check, Heart, Users, BriefcaseBusiness, CalendarDays, ShieldCheck, Globe2, Menu, X, Plus, Minus } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

import { LocumProvisionPage } from '../components/pages/LocumProvisionPage';
import { RecruitmentSoftwarePage } from '../components/pages/RecruitmentSoftwarePage';
import { CareManagementPage } from '../components/pages/CareManagementPage';
import { RecruitmentServicePage } from '../components/pages/RecruitmentServicePage';
import { ProductDesignPage } from '../components/pages/ProductDesignPage';
import { WebDevelopmentPage } from '../components/pages/WebDevelopmentPage';

import { BookDemoModal } from '../components/modals/BookDemoModal';
import { FreeTrialModal } from '../components/modals/FreeTrialModal';
import { VideoModal } from '../components/modals/VideoModal';
import { ModuleDetailModal } from '../components/modals/ModuleDetailModal';
import { CaseStudyModal } from '../components/modals/CaseStudyModal';

import { PRODUCT_MODULES } from '../data/mockData';
import { UserRole, ProductModule } from '../types';

const solutions = [
  { id: 'recruitment-service', name: 'Recruitment services', icon: Users, color: 'text-[#810161]', background: 'bg-[#f8eef5]', description: 'The right people. The right fit. A specialist recruitment partner who understands healthcare.', features: ['Permanent and international recruitment', 'A personal, end-to-end hiring service'] },
  { id: 'locum-provision', name: 'Locum provision', icon: CalendarDays, color: 'text-[#368B62]', background: 'bg-[#edf5ef]', description: 'Keep care moving with qualified professionals, exactly when and where you need them.', features: ['Flexible, short- and long-term cover', 'Professionals across Ireland and the UK'] },
  { id: 'care-management', name: 'Care management', icon: Heart, color: 'text-[#ae663d]', background: 'bg-[#fbf1e9]', description: 'Less administration. More time for people. Bring your daily care operations together.', features: ['Digital care plans and medication records', 'Built for your team’s everyday workflow'] },
  { id: 'recruitment-software', name: 'Recruitment software', icon: BriefcaseBusiness, color: 'text-[#52658e]', background: 'bg-[#eef1f7]', description: 'From first application to the first day, make every stage of hiring feel effortless.', features: ['One organised candidate pipeline', 'Job posting and applicant tracking'] },
];

function LandingPage({ onNavigate, onBookDemo, onStartTrial }: { onNavigate: (view: string) => void; onBookDemo: () => void; onStartTrial: () => void }) {
  const [country, setCountry] = useState('Ireland');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const primaryButton = 'inline-flex items-center justify-center gap-3 rounded-sm bg-[#368B62] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#286d4c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#368B62]';
  const secondaryButton = 'inline-flex items-center justify-center gap-3 rounded-sm border border-black/5 bg-white px-6 py-3.5 text-sm font-semibold text-[#233b35] transition-colors hover:bg-[#edf5ef] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#368B62]';
  const photos = [
    { image: 'https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?auto=format&fit=crop&w=1000&q=85', title: 'Good people.\nExceptional care.', category: 'RECRUITMENT SERVICES', id: 'recruitment-service', label: 'Find your people', alt: 'Healthcare professional wearing a stethoscope', tint: 'bg-[#810161]' },
    { image: 'https://images.unsplash.com/photo-1517120026326-d87759a7b63b?auto=format&fit=crop&w=1000&q=85', title: 'The cover you need.\nThe confidence you deserve.', category: 'LOCUM PROVISION', id: 'locum-provision', label: 'Find your cover', alt: 'Healthcare professional providing care in a hospital', tint: 'bg-[#368B62]' },
    { image: 'https://images.unsplash.com/photo-1599045118108-bf9954418b76?auto=format&fit=crop&w=1000&q=85', title: 'Less admin.\nMore human.', category: 'CARE MANAGEMENT', id: 'care-management', label: 'Simplify your day', alt: 'Medical professional focused on patient care', tint: 'bg-[#ae663d]' },
  ];
  const faqs = [
    ['Who is MployUs for?', 'MployUs supports healthcare providers, care homes, hospitals and healthcare professionals with recruitment, locum staffing and care management. Choose a service to explore how we can help your team.'],
    ['Do you operate in Ireland and the UK?', 'Yes. Our services support providers and professionals in Ireland and the UK. Our specialist teams can help you understand the registration and compliance requirements for your country.'],
    ['Can I use just one service?', 'Absolutely. Start with the service you need today, whether that is locum cover, permanent recruitment or software. Add other services as your organisation grows.'],
    ['How do I register as a locum?', 'Visit Locum Provision, select sign up and choose Locum. The registration flow guides you through your country, profession and required details.'],
  ];
  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMobileOpen(false); setOpenMenu(null); };
  return (
    <div className="bg-white font-['DM_Sans',sans-serif] text-[#233b35] selection:bg-[#dfeee4] [&_button]:cursor-pointer motion-reduce:[&_*]:transition-none">
      <header className="relative z-30 bg-white">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-3 text-[11px] text-[#5d6862] lg:px-10">
          <div className="flex items-center gap-5"><Globe2 size={12} /><label className="flex items-center gap-2 text-[11px]">Your region <select aria-label="Country" value={country} onChange={event => setCountry(event.target.value)} className="cursor-pointer bg-transparent text-[11px] font-medium text-[#233b35]"><option>Ireland</option><option>United Kingdom</option></select></label><span className="hidden sm:block">Built for better healthcare.</span></div>
          <button onClick={onBookDemo} className="transition-colors hover:text-[#368B62]">Talk to our team <ArrowUpRight size={11} className="ml-1 inline" /></button>
        </div>
        <div className="border-y border-black/5">
          <nav aria-label="Main navigation" className="mx-auto flex max-w-[1240px] items-center justify-between gap-8 px-6 py-5 lg:px-10">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="MployUs home" className="text-[28px] font-bold tracking-[-1px]">mploy<span className="text-[#368B62]">us</span><span className="text-[#368B62]">.</span></button>
            <div className="hidden flex-1 items-center gap-7 text-[13px] lg:flex">
              {['Solutions', 'Who we help'].map(menu => <div key={menu} className="relative"><button aria-expanded={openMenu === menu} onClick={() => setOpenMenu(openMenu === menu ? null : menu)} className="flex items-center gap-2 py-2 hover:text-[#368B62]">{menu}<ChevronDown size={13} /></button>{openMenu === menu && <div className="absolute left-0 top-full w-72 rounded-sm border border-black/5 bg-white p-3">{menu === 'Solutions' ? solutions.map(solution => <button key={solution.id} onClick={() => { setOpenMenu(null); onNavigate(solution.id); }} className="flex w-full items-center gap-3 rounded-sm p-3 text-left hover:bg-[#f5f7f4]"><solution.icon size={17} className={solution.color} />{solution.name}</button>) : <><button onClick={() => scrollTo('solutions')} className="block w-full p-3 text-left hover:bg-[#f5f7f4]">Healthcare providers</button><button onClick={() => onNavigate('recruitment-service')} className="block w-full p-3 text-left hover:bg-[#f5f7f4]">Jobseekers</button><button onClick={() => onNavigate('locum-provision')} className="block w-full p-3 text-left hover:bg-[#f5f7f4]">Locum professionals</button></>}</div>}</div>)}
              <button onClick={() => scrollTo('about')} className="hover:text-[#368B62]">Why MployUs</button><button onClick={() => scrollTo('questions')} className="hover:text-[#368B62]">Resources</button>
            </div>
            <div className="hidden items-center gap-3 sm:flex"><button onClick={onBookDemo} className={primaryButton}>Book a demo</button><button onClick={onStartTrial} className={secondaryButton}>Get started <ArrowUpRight size={15} /></button></div>
            <button aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)} className="p-2 lg:hidden">{mobileOpen ? <X size={22} /> : <Menu size={22} />}</button>
          </nav>
          {mobileOpen && <div className="border-t border-black/5 px-6 pb-5 lg:hidden">{solutions.map(solution => <button key={solution.id} onClick={() => { setMobileOpen(false); onNavigate(solution.id); }} className="block w-full py-3 text-left text-sm">{solution.name}</button>)}<button onClick={onBookDemo} className={primaryButton}>Book a demo</button> <button onClick={onStartTrial} className={secondaryButton}>Get started</button></div>}
        </div>
      </header>

      <section className="mx-auto max-w-[1100px] px-6 pb-16 pt-16 text-center md:pb-20 md:pt-20">
        <p className="mb-6 text-[10px] font-semibold tracking-[0.18em] text-[#5d6862]">PEOPLE. CARE. CONNECTED.</p>
        <h1 className="font-['Libre_Caslon_Display',serif] text-[48px] leading-[1.07] md:text-[76px]">Better people. Better care.<br />All connected<span className="text-[#368B62]">.</span></h1>
        <p className="mx-auto mt-6 max-w-[550px] text-[15px] leading-7 text-[#68736e]">Recruitment, locum staffing and care management — brought together.<br className="hidden sm:block" /> So you can focus on what matters most: people.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3"><button onClick={onBookDemo} className={primaryButton}>Book a demo <ArrowUpRight size={16} /></button><button onClick={() => scrollTo('solutions')} className={secondaryButton}>Explore our solutions</button></div>
        <p className="mt-5 text-[11px] text-[#7b837e]">Built for healthcare providers across Ireland & the UK</p>
        <SoftwareAnimation />
      </section>

      <section aria-label="Our healthcare services" className="grid gap-[3px] sm:grid-cols-3">
        {photos.map(photo => <button key={photo.id} onClick={() => onNavigate(photo.id)} className="group relative min-h-[350px] overflow-hidden text-left md:min-h-[400px]">
          <img src={photo.image} alt={photo.alt} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#142720]/95 via-[#142720]/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-7 text-white lg:p-10"><span className={`mb-5 inline-block h-1 w-8 ${photo.tint}`} /><p className="mb-3 text-[9px] font-medium tracking-[0.16em] text-white/80">{photo.category}</p><h2 className="whitespace-pre-line font-['Libre_Caslon_Display',serif] text-[32px] leading-[1.1] lg:text-[37px]">{photo.title}</h2><div className="mt-6 flex items-center justify-between text-xs"><span>{photo.label}</span><ArrowUpRight size={20} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></div></div>
        </button>)}
      </section>

      <section id="about" className="mx-auto max-w-[1160px] px-6 py-16 md:py-20">
        <div className="grid gap-8 md:grid-cols-2 md:gap-20"><div><p className="mb-4 text-[10px] font-semibold tracking-[0.14em] text-[#368B62]">MEET MPLOYUS</p><h2 className="font-['Libre_Caslon_Display',serif] text-4xl md:text-[46px]">Healthcare works better<br />when we work together.</h2></div><div className="pt-2 text-sm leading-7 text-[#68736e]"><p>Great care starts with great people. But finding them, supporting them and managing the everyday shouldn’t stand in the way.</p><p className="mt-4">MployUs brings your people and processes together. One connected partner for the way healthcare works today — and where it goes tomorrow.</p><button onClick={onBookDemo} className="mt-5 flex items-center gap-2 font-semibold text-[#233b35] hover:text-[#368B62]">Let’s talk about your team <ArrowRight size={15} /></button></div></div>
      </section>

      <section id="solutions" className="bg-[#f6f7f3] py-16 md:py-24">
        <div className="mx-auto grid max-w-[1160px] gap-12 px-6 lg:grid-cols-[0.8fr_1.5fr] lg:gap-16">
          <div className="lg:pt-3"><p className="mb-5 text-[10px] font-semibold tracking-[0.14em] text-[#368B62]">ONE PARTNER. MORE POSSIBILITIES.</p><h2 className="font-['Libre_Caslon_Display',serif] text-[44px] leading-[1.06] md:text-[52px]">Everything you need.<br />Better, together.</h2><p className="mt-6 max-w-sm text-sm leading-7 text-[#68736e]">Find your next team member. Cover your next shift. Simplify your care operations. Choose what you need, and we’ll help you move forward.</p><button onClick={onBookDemo} className={`${primaryButton} mt-7`}>Find your solution <ArrowUpRight size={15} /></button><p className="mt-5 text-[11px] text-[#7b837e]">A real conversation. A solution that fits.</p></div>
          <div className="grid gap-4 sm:grid-cols-2">{solutions.map(solution => <article key={solution.id} className="group flex flex-col rounded-sm border border-black/5 bg-white p-7 transition-colors hover:bg-[#fdfefc]"><div className={`mb-5 flex h-10 w-10 items-center justify-center rounded-lg ${solution.background} ${solution.color}`}><solution.icon size={21} strokeWidth={1.5} /></div><h3 className="text-[17px] font-semibold">{solution.name}</h3><p className="mb-5 mt-3 text-[12px] leading-6 text-[#68736e]">{solution.description}</p><ul className="mb-7 space-y-3">{solution.features.map(feature => <li key={feature} className="flex items-start gap-2 text-[11px] leading-5 text-[#68736e]"><Check size={13} className={`mt-1 shrink-0 ${solution.color}`} />{feature}</li>)}</ul><button onClick={() => onNavigate(solution.id)} className="mt-auto flex items-center gap-2 text-xs font-semibold">Explore {solution.name.toLowerCase()} <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></button></article>)}</div>
        </div>
      </section>

      <section className="bg-[#e9f0e7] py-16 md:py-20"><div className="mx-auto max-w-[1160px] px-6"><div className="flex flex-wrap items-end justify-between gap-6"><div><p className="mb-4 text-[10px] font-semibold tracking-[0.14em] text-[#368B62]">A LITTLE LESS COMPLEXITY</p><h2 className="font-['Libre_Caslon_Display',serif] text-[42px] leading-[1.08] md:text-[50px]">More connected.<br />More time for care.</h2></div><p className="max-w-sm text-sm leading-7 text-[#68736e]">Healthcare is human. Your systems should be too.<br />We make the complicated feel a little simpler.</p></div><div className="mt-12 grid gap-5 md:grid-cols-3">{[{ number: '01', title: 'Start with your people', body: 'Tell us about your team, your challenges and what better looks like for you.' }, { number: '02', title: 'Find your perfect fit', body: 'We connect you with the right service, software or healthcare professional.' }, { number: '03', title: 'Move forward, together', body: 'Get practical support from people who understand your world.' }].map(step => <div key={step.number} className="rounded-sm bg-white/65 p-7"><span className="font-['Libre_Caslon_Display',serif] text-4xl text-[#368B62]">{step.number}</span><h3 className="mb-3 mt-7 text-lg font-semibold">{step.title}</h3><p className="text-[13px] leading-6 text-[#68736e]">{step.body}</p></div>)}</div></div></section>

      <section className="mx-auto grid max-w-[1160px] items-center gap-10 px-6 py-20 md:grid-cols-2 md:gap-20"><div className="relative overflow-hidden rounded-sm"><img src={photos[0].image} alt="A healthcare professional ready to support your team" loading="lazy" className="h-[380px] w-full object-cover" /><div className="absolute bottom-5 left-5 right-5 rounded-sm bg-[#fffffff2] p-5"><p className="text-[10px] font-semibold tracking-[0.12em] text-[#368B62]">FOR THE PEOPLE BEHIND THE CARE</p><p className="mt-2 font-['Libre_Caslon_Display',serif] text-2xl">Your next chapter starts here.</p></div></div><div><p className="mb-5 text-[10px] font-semibold tracking-[0.14em] text-[#810161]">HEALTHCARE PROFESSIONALS</p><h2 className="font-['Libre_Caslon_Display',serif] text-[44px] leading-[1.08] md:text-[50px]">A career that cares<br />for you, too.</h2><p className="mt-5 text-sm leading-7 text-[#68736e]">Looking for your next permanent role or the flexibility of locum work? We’ll help you find opportunities that fit your skills, your ambitions and your life.</p><div className="mt-7 flex flex-wrap gap-3"><button onClick={() => onNavigate('recruitment-service')} className="inline-flex items-center gap-3 rounded-sm bg-[#810161] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#67014e]">Explore opportunities <ArrowUpRight size={15} /></button><button onClick={() => onNavigate('locum-provision')} className={secondaryButton}>Become a locum</button></div></div></section>

      <section id="questions" className="border-t border-black/5 bg-[#fafaf8] py-16 md:py-20"><div className="mx-auto grid max-w-[1160px] gap-10 px-6 md:grid-cols-[1fr_1.4fr] md:gap-20"><div><p className="mb-5 text-[10px] font-semibold tracking-[0.14em] text-[#368B62]">GOOD TO KNOW</p><h2 className="font-['Libre_Caslon_Display',serif] text-[44px] leading-[1.08]">A few questions.<br />Clear answers.</h2><button onClick={onBookDemo} className="mt-7 flex items-center gap-2 text-sm font-semibold">Talk to our team <ArrowRight size={15} /></button></div><div>{faqs.map(([question, answer], index) => <div key={question} className="border-b border-black/5"><button aria-expanded={openFaq === index} aria-controls={`faq-${index}`} onClick={() => setOpenFaq(openFaq === index ? null : index)} className="flex w-full items-center justify-between gap-5 py-5 text-left text-sm font-medium">{question}{openFaq === index ? <Minus size={16} className="shrink-0 text-[#368B62]" /> : <Plus size={16} className="shrink-0" />}</button>{openFaq === index && <p id={`faq-${index}`} className="pb-5 pr-8 text-[13px] leading-7 text-[#68736e]">{answer}</p>}</div>)}</div></div></section>

      <section className="bg-[#173e30] py-16 md:py-20"><div className="mx-auto flex max-w-[1160px] flex-wrap items-center justify-between gap-8 px-6"><div><p className="mb-4 text-[10px] font-medium tracking-[0.14em] text-[#b1ccbb]">LET’S MAKE BETTER HAPPEN</p><h2 className="font-['Libre_Caslon_Display',serif] text-[44px] leading-[1.1] text-white md:text-[52px]">Better healthcare starts<br />with a conversation.</h2></div><div><div className="flex flex-wrap gap-3"><button onClick={onBookDemo} className={primaryButton}>Book a demo <ArrowUpRight size={15} /></button><button onClick={onStartTrial} className={secondaryButton}>Get started</button></div><p className="mt-4 text-xs text-[#b1ccbb]">Your people. Your purpose. Our partnership.</p></div></div></section>
      <footer className="bg-[#f7f7f3] py-12"><div className="mx-auto max-w-[1160px] px-6"><div className="grid gap-10 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1fr]"><div><span className="text-[28px] font-bold tracking-[-1px]">mploy<span className="text-[#368B62]">us.</span></span><p className="mt-4 max-w-xs text-xs leading-6 text-[#68736e]">Connecting people, care and possibility.<br />For healthcare in Ireland and the UK.</p></div><div><h3 className="mb-4 text-xs font-semibold">Our solutions</h3>{solutions.map(solution => <button key={solution.id} onClick={() => onNavigate(solution.id)} className="mb-3 block text-xs text-[#68736e] transition-colors hover:text-[#368B62]">{solution.name}</button>)}</div><div><h3 className="mb-4 text-xs font-semibold">For your next chapter</h3><button onClick={() => onNavigate('recruitment-service')} className="mb-3 block text-xs text-[#68736e]">Find a permanent role</button><button onClick={() => onNavigate('locum-provision')} className="mb-3 block text-xs text-[#68736e]">Become a locum</button><button onClick={onBookDemo} className="block text-xs text-[#68736e]">Talk to a specialist</button></div><div><h3 className="mb-4 text-xs font-semibold">Explore MployUs</h3><button onClick={() => scrollTo('about')} className="mb-3 block text-xs text-[#68736e]">Why MployUs</button><button onClick={() => scrollTo('questions')} className="mb-3 block text-xs text-[#68736e]">Frequently asked questions</button><button onClick={onStartTrial} className="block text-xs text-[#68736e]">Start a free trial</button></div></div><div className="mt-10 flex flex-wrap justify-between gap-3 border-t border-black/5 pt-6 text-[10px] text-[#7b837e]"><p>© {new Date().getFullYear()} MployUs. All rights reserved.</p><div className="flex flex-wrap gap-4"><Link to="/policies/terms">Terms</Link><Link to="/policies/privacy">Privacy</Link><Link to="/policies/cookies">Cookies</Link></div><span>Made for people. Built for care. · {country}</span></div></div></footer>
    </div>
  );
}

function PlatformApp() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeRole, setActiveRole] = useState<UserRole>('all');
  const requestedView = location.pathname.slice(1);
  const activeView = ['locum-provision', 'recruitment-service', 'recruitment-software', 'care-management', 'product-design', 'web-development'].includes(requestedView) ? requestedView : 'home';

  const [bookDemoOpen, setBookDemoOpen] = useState(false);
  const [freeTrialOpen, setFreeTrialOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<ProductModule | null>(null);
  const [caseStudyOpen, setCaseStudyOpen] = useState(false);
  const [initialDemoModule, setInitialDemoModule] = useState('All Modules');

  const handleNavigate = (viewId: string) => {
    navigate(viewId === 'home' ? '/' : `/${viewId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenModule = (modId: string) => {
    if (modId === 'recruitment' || modId === 'recruitment-software') {
      handleNavigate('recruitment-software');
    } else if (modId === 'care-management') {
      handleNavigate('care-management');
    } else if (modId === 'locums-staffing' || modId === 'locum-provision') {
      handleNavigate('locum-provision');
    } else if (modId === 'recruitment-service') {
      handleNavigate('recruitment-service');
    } else if (modId === 'product-design') {
      handleNavigate('product-design');
    } else if (modId === 'web-development') {
      handleNavigate('web-development');
    } else {
      const found = PRODUCT_MODULES.find(m => m.id === modId);
      if (found) setSelectedModule(found);
    }
  };

  const handleBookDemoWithModule = (moduleTitle?: string) => {
    setInitialDemoModule(moduleTitle || 'All Modules');
    setBookDemoOpen(true);
  };

  // Standalone platforms with their own navbar/footer.
  const isStandaloneLocum = activeView === 'locum-provision';
  const isStandaloneRecruitment = activeView === 'recruitment-service';
  const isStandalone = isStandaloneLocum || isStandaloneRecruitment;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-['Plus_Jakarta_Sans',sans-serif] selection:bg-slate-900 selection:text-white">
      {!isStandalone && activeView !== 'home' && (
        <Navbar
          activeRole={activeRole}
          onRoleChange={setActiveRole}
          onBookDemo={(mod) => handleBookDemoWithModule(mod)}
          onStartTrial={() => setFreeTrialOpen(true)}
          onNavigate={handleNavigate}
          activeView={activeView}
        />
      )}

      <main>
        {activeView === 'home' && (
          <>
            <LandingPage onNavigate={handleNavigate} onBookDemo={() => handleBookDemoWithModule()} onStartTrial={() => setFreeTrialOpen(true)} />
          </>
        )}

        {activeView === 'locum-provision' && (
          <LocumProvisionPage
            onBackToHome={() => handleNavigate('home')}
            onBookDemo={(mod) => handleBookDemoWithModule(mod || 'Locum Provision')}
            onStartTrial={() => setFreeTrialOpen(true)}
          />
        )}
        {activeView === 'recruitment-software' && (
          <RecruitmentSoftwarePage
            onBackToHome={() => handleNavigate('home')}
            onBookDemo={(mod) => handleBookDemoWithModule(mod || 'Recruitment Software')}
            onStartTrial={() => setFreeTrialOpen(true)}
          />
        )}
        {activeView === 'care-management' && (
          <CareManagementPage
            onBackToHome={() => handleNavigate('home')}
            onBookDemo={(mod) => handleBookDemoWithModule(mod || 'Care Management Software')}
            onStartTrial={() => setFreeTrialOpen(true)}
          />
        )}
        {activeView === 'recruitment-service' && (
          <RecruitmentServicePage
            onBackToHome={() => handleNavigate('home')}
            onBookDemo={(mod) => handleBookDemoWithModule(mod || 'Recruitment Service')}
            onStartTrial={() => setFreeTrialOpen(true)}
          />
        )}
        {activeView === 'product-design' && (
          <ProductDesignPage
            onBackToHome={() => handleNavigate('home')}
            onBookDemo={(mod) => handleBookDemoWithModule(mod || 'Product Design Service')}
          />
        )}
        {activeView === 'web-development' && (
          <WebDevelopmentPage
            onBackToHome={() => handleNavigate('home')}
            onBookDemo={(mod) => handleBookDemoWithModule(mod || 'Web Development Service')}
          />
        )}
      </main>

      {!isStandalone && activeView !== 'home' && (
        <Footer
          onNavigate={handleNavigate}
          onBookDemo={() => handleBookDemoWithModule()}
          onStartTrial={() => setFreeTrialOpen(true)}
        />
      )}

      <BookDemoModal
        isOpen={bookDemoOpen}
        onClose={() => setBookDemoOpen(false)}
        initialModule={initialDemoModule}
      />
      <FreeTrialModal
        isOpen={freeTrialOpen}
        onClose={() => setFreeTrialOpen(false)}
      />
      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        onBookDemo={() => handleBookDemoWithModule()}
      />
      <ModuleDetailModal
        module={selectedModule}
        isOpen={!!selectedModule}
        onClose={() => setSelectedModule(null)}
        onBookDemo={(modTitle) => handleBookDemoWithModule(modTitle)}
      />
      <CaseStudyModal
        isOpen={caseStudyOpen}
        onClose={() => setCaseStudyOpen(false)}
        onBookDemo={() => handleBookDemoWithModule('Meadowview Case Study')}
      />
    </div>
  );
}

const router = createBrowserRouter([
  { path: '/policies/:policy', Component: PolicyPage },
  { path: '*', Component: PlatformApp },
]);

export default function App() {
  return <MotionConfig reducedMotion="user"><RouterProvider router={router} /></MotionConfig>;
}
