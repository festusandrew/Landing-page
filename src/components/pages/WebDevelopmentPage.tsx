import React from 'react';
import { Code2, ArrowRight, ArrowLeft, Globe, Database, Lock, Server, Smartphone, Cloud, Cpu, ShoppingBag, Landmark, GraduationCap, HeartPulse, Truck, Gamepad2 } from 'lucide-react';

interface WebDevelopmentPageProps {
  onBackToHome: () => void;
  onBookDemo: (moduleTitle?: string) => void;
}

export const WebDevelopmentPage: React.FC<WebDevelopmentPageProps> = ({
  onBackToHome,
  onBookDemo
}) => {
  const industries = [
    { icon: HeartPulse, label: 'Healthcare', color: 'text-rose-600 bg-rose-50 border-rose-200' },
    { icon: ShoppingBag, label: 'E-commerce & Retail', color: 'text-amber-600 bg-amber-50 border-amber-200' },
    { icon: Landmark, label: 'Fintech & Banking', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { icon: GraduationCap, label: 'Education & EdTech', color: 'text-blue-600 bg-blue-50 border-blue-200' },
    { icon: Truck, label: 'Logistics & SaaS', color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
    { icon: Gamepad2, label: 'Media & Entertainment', color: 'text-violet-600 bg-violet-50 border-violet-200' }
  ];

  const services = [
    {
      icon: Globe,
      color: 'text-cyan-600 bg-cyan-50 border-cyan-200',
      title: 'Websites & Web Apps',
      desc: 'High-converting, accessible marketing sites and complex single-page web apps built with React, Next.js and modern tooling.'
    },
    {
      icon: Smartphone,
      color: 'text-rose-600 bg-rose-50 border-rose-200',
      title: 'Mobile Apps',
      desc: 'Cross-platform iOS and Android apps with React Native or Flutter, sharing one codebase and a native feel.'
    },
    {
      icon: Server,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      title: 'Backends & APIs',
      desc: 'Scalable REST and GraphQL APIs, microservices, authentication, and real-time systems on Node, Python or Go.'
    },
    {
      icon: Database,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
      title: 'Integrations & Data',
      desc: 'Payments (Stripe), CRMs, ERPs, payroll, and third-party APIs — plus SQL/NoSQL data pipelines and dashboards.'
    },
    {
      icon: Cloud,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      title: 'Cloud & DevOps',
      desc: 'AWS, GCP and Azure infrastructure, CI/CD pipelines, containerisation, and automated scaling for any load.'
    },
    {
      icon: Cpu,
      color: 'text-violet-600 bg-violet-50 border-violet-200',
      title: 'AI & Automation',
      desc: 'Custom AI features, chatbots, and workflow automation that plug intelligence directly into your product.'
    }
  ];

  const stack = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Go', 'React Native', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL', 'Tailwind'];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-20 pb-16 animate-fade-in font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Header */}
      <div className="bg-white border-b border-black/10 py-3 sticky top-16 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Overview
          </button>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-700">
            <span className="w-2 h-2 rounded-full bg-cyan-600 animate-pulse" />
            <span>Professional Service: Full-Stack Web Development for Every Industry</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="py-12 lg:py-16 bg-white border-b border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 text-xs font-bold uppercase tracking-wider">
              <Code2 className="w-3.5 h-3.5" /> Full-Stack Web & App Engineering for Any Niche
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Full-Stack Web Development for Every Industry
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              From e-commerce and fintech to education, logistics and healthcare — we build fast, secure, scalable websites, web apps, mobile apps, APIs and cloud infrastructure across every niche and tech stack.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onBookDemo('Web Development Service')}
                className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors shadow-2xs flex items-center gap-2"
              >
                Discuss Your Project <ArrowRight className="w-4 h-4 text-slate-300" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Build For */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-700">No niche off-limits</span>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">Industries We Build For</h2>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl">Whatever you're shipping, we've engineered for it. A few of the sectors we work across:</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {industries.map((ind) => {
            const Icon = ind.icon;
            return (
              <div key={ind.label} className="p-4 rounded-xl bg-white border border-black/10 shadow-2xs flex flex-col items-center text-center gap-2">
                <div className={`w-10 h-10 rounded-lg border flex items-center justify-center ${ind.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-800 leading-tight">{ind.label}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Engineering Services */}
      <section className="pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">Custom Engineering Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="p-6 rounded-2xl bg-white border border-black/10 shadow-2xs space-y-3">
                <div className={`w-10 h-10 rounded-lg border flex items-center justify-center font-bold ${s.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{s.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Tech Stack + Security */}
      <section className="pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-black/10 shadow-2xs space-y-4">
          <h3 className="text-base font-bold text-slate-900">Our Tech Stack</h3>
          <p className="text-xs text-slate-600">We pick the right tools for the job — here's what we reach for most:</p>
          <div className="flex flex-wrap gap-2">
            {stack.map((tech) => (
              <span key={tech} className="px-3 py-1.5 rounded-lg bg-slate-100 border border-black/10 text-xs font-semibold text-slate-700">
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="p-6 rounded-2xl bg-white border border-black/10 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center font-bold">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Security by Default</h3>
          <p className="text-xs text-slate-600 leading-relaxed">ISO 27001-aligned cloud infrastructure, GDPR compliance, and end-to-end encryption baked into every build, whatever your industry's requirements.</p>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-2xl bg-slate-900 text-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-2">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Got something to build?</span>
            <h3 className="text-2xl font-bold text-white">Let's engineer it — whatever the niche</h3>
            <p className="text-xs text-slate-300">Book a free technical consultation and we'll scope your project end to end.</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onBookDemo('Web Development Service')}
              className="px-6 py-3 bg-white text-slate-900 font-semibold text-xs rounded-md hover:bg-slate-100 transition-colors shadow-2xs"
            >
              Book a Consultation
            </button>
            <button
              onClick={onBackToHome}
              className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-md border border-slate-700 transition-colors"
            >
              Back to Overview
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
