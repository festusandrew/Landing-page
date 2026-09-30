import React, { useState, useEffect } from 'react';
import { ChevronDown, Sparkles, Menu, X, ArrowRight, Activity, UserPlus, HeartPulse, Users, Briefcase, Palette, Code2, CheckCircle2, Zap } from 'lucide-react';
import { UserRole } from '../types';

interface NavbarProps {
  activeRole?: UserRole;
  onRoleChange?: (role: UserRole) => void;
  onBookDemo: (moduleTitle?: string) => void;
  onStartTrial: () => void;
  onNavigate: (view: string) => void;
  activeView?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onBookDemo,
  onStartTrial,
  onNavigate,
  activeView = 'home'
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const productsList = [
    {
      id: 'recruitment-software',
      name: 'Recruitment Software',
      desc: 'Smarter ATS, multi-board job posting & candidate pipeline',
      icon: UserPlus,
      color: 'text-blue-600',
      badge: 'ATS Platform'
    },
    {
      id: 'care-management',
      name: 'Care Management Software',
      desc: 'Digital care plans, eMAR medication charts & CQC audits',
      icon: HeartPulse,
      color: 'text-emerald-600',
      badge: 'eMAR & Clinical'
    }
  ];

  const servicesList = [
    {
      id: 'locum-provision',
      name: 'Locum Provision',
      desc: 'Urgent shift dispatch & verified locum staff under 2 hrs',
      icon: Users,
      color: 'text-violet-600',
      badge: 'Urgent Staffing',
      popular: true
    },
    {
      id: 'recruitment-service',
      name: 'Recruitment Service',
      desc: 'End-to-end managed hiring, headhunting & DBS vetting',
      icon: Briefcase,
      color: 'text-indigo-600',
      badge: 'Managed Service'
    },
    {
      id: 'product-design',
      name: 'Product Design',
      desc: 'Healthcare UI/UX design, EHR portals & design systems',
      icon: Palette,
      color: 'text-rose-600',
      badge: 'UI/UX Design'
    },
    {
      id: 'web-development',
      name: 'Web Development',
      desc: 'Care home websites, NHS spine sync & cloud engineering',
      icon: Code2,
      color: 'text-cyan-600',
      badge: 'Engineering'
    }
  ];

  const handleNavClick = (viewId: string) => {
    onNavigate(viewId);
    setProductsDropdownOpen(false);
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/90 text-slate-900 shadow-sm py-3' 
        : 'bg-white text-slate-900 py-3.5 border-b border-slate-200/80'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-2.5 group text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold shadow-2xs group-hover:bg-slate-800 transition-colors">
              <Activity className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-tight text-slate-900 flex items-center gap-1 font-['Plus_Jakarta_Sans',sans-serif]">
                Mploy<span className="text-emerald-600">US</span>
              </span>
              <span className="text-[9px] uppercase tracking-wider text-slate-500 font-medium -mt-1">Healthcare Platform</span>
            </div>
          </button>

          {/* Center Navigation Links (100hires-styled mega dropdowns) */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-700">
            
            {/* PRODUCTS DROPDOWN */}
            <div 
              className="relative"
              onMouseEnter={() => setProductsDropdownOpen(true)}
              onMouseLeave={() => setProductsDropdownOpen(false)}
            >
              <button 
                onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
                className={`flex items-center gap-1 py-2 transition-colors font-semibold ${
                  activeView.includes('software') || activeView === 'care-management' ? 'text-slate-900 font-bold' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                <span>Products</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${productsDropdownOpen ? 'rotate-180 text-slate-900' : 'text-slate-400'}`} />
              </button>

              {/* 100hires-Style Products Mega Dropdown */}
              {productsDropdownOpen && (
                <div className="absolute top-full left-0 w-[560px] bg-white border border-slate-200 rounded-2xl shadow-2xl p-4 grid grid-cols-12 gap-4 animate-fade-in z-50">
                  
                  {/* Left Main Products Column */}
                  <div className="col-span-7 space-y-2">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
                      Healthcare Software Solutions
                    </div>
                    
                    <div className="space-y-1">
                      {productsList.map((p) => {
                        const Icon = p.icon;
                        const isActive = activeView === p.id;
                        return (
                          <button
                            key={p.id}
                            onClick={() => handleNavClick(p.id)}
                            className={`w-full flex items-start gap-3 p-2.5 rounded-xl transition-all group text-left ${
                              isActive ? 'bg-slate-100/90' : 'hover:bg-slate-50'
                            }`}
                          >
                            <div className={`p-2 rounded-lg bg-slate-100 border border-slate-200 ${p.color} group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all shrink-0`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="space-y-0.5">
                              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                                <span>{p.name}</span>
                                <span className="px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded text-[9px] font-mono font-medium">
                                  {p.badge}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500 font-normal leading-snug line-clamp-2">
                                {p.desc}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Featured Promo Box (100hires style) */}
                  <div className="col-span-5 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-3.5 text-white flex flex-col justify-between border border-slate-800">
                    <div className="space-y-2">
                      <span className="inline-block px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded text-[9px] font-mono font-bold uppercase">
                        Unified Platform
                      </span>
                      <h4 className="text-xs font-bold text-white leading-snug">
                        Explore Live Interactive Dashboards
                      </h4>
                      <p className="text-[10px] text-slate-300 leading-relaxed">
                        Test recruitment candidate pipelines and digital eMAR medication pass charts live.
                      </p>
                    </div>

                    <button
                      onClick={() => handleNavClick('locum-provision')}
                      className="mt-3 w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-[11px] rounded-lg transition-colors flex items-center justify-center gap-1"
                    >
                      <span>See Locum Portal</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                </div>
              )}
            </div>

            {/* SERVICES DROPDOWN */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button 
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className={`flex items-center gap-1 py-2 transition-colors font-semibold ${
                  activeView.includes('service') || activeView === 'locum-provision' || activeView === 'product-design' || activeView === 'web-development'
                    ? 'text-slate-900 font-bold'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                <span>Services</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-slate-900' : 'text-slate-400'}`} />
              </button>

              {/* 100hires-Style Services Mega Dropdown */}
              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 w-[600px] bg-white border border-slate-200 rounded-2xl shadow-2xl p-4 grid grid-cols-12 gap-4 animate-fade-in z-50">
                  
                  {/* Left Main Services List */}
                  <div className="col-span-7 space-y-2">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
                      Healthcare Professional Services
                    </div>
                    
                    <div className="space-y-1">
                      {servicesList.map((s) => {
                        const Icon = s.icon;
                        const isActive = activeView === s.id;
                        return (
                          <button
                            key={s.id}
                            onClick={() => handleNavClick(s.id)}
                            className={`w-full flex items-start gap-3 p-2.5 rounded-xl transition-all group text-left ${
                              isActive ? 'bg-slate-100/90' : 'hover:bg-slate-50'
                            }`}
                          >
                            <div className={`p-2 rounded-lg bg-slate-100 border border-slate-200 ${s.color} group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all shrink-0`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="space-y-0.5">
                              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                                <span>{s.name}</span>
                                {s.popular && (
                                  <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded text-[9px] font-bold">
                                    Popular
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-500 font-normal leading-snug line-clamp-1">
                                {s.desc}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Featured Service Card */}
                  <div className="col-span-5 bg-slate-900 rounded-xl p-3.5 text-white flex flex-col justify-between border border-slate-800">
                    <div className="space-y-2">
                      <div className="flex items-center gap-1 text-emerald-400 font-mono text-[9px] font-bold uppercase">
                        <Zap className="w-3 h-3" /> Featured Provision
                      </div>
                      <h4 className="text-xs font-bold text-white leading-snug">
                        Locum Provision & Urgent Dispatch
                      </h4>
                      <p className="text-[10px] text-slate-300 leading-relaxed">
                        Need temporary RGN nurses or care assistants today? Shift matching under 2 hours.
                      </p>
                    </div>

                    <div className="pt-3">
                      <button
                        onClick={() => handleNavClick('locum-provision')}
                        className="w-full py-2 bg-white hover:bg-slate-100 text-slate-900 font-bold text-[11px] rounded-lg transition-colors flex items-center justify-center gap-1 shadow-2xs"
                      >
                        <span>Open Locum Landing Page</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                </div>
              )}
            </div>

            <button 
              onClick={() => handleNavClick('home')} 
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              Overview
            </button>
            <a href="#how-it-works" onClick={() => { if (activeView !== 'home') handleNavClick('home'); }} className="text-slate-600 hover:text-slate-900 transition-colors">How It Works</a>
            <a href="#pricing" onClick={() => { if (activeView !== 'home') handleNavClick('home'); }} className="text-slate-600 hover:text-slate-900 transition-colors">Pricing</a>
            <a href="#faq" onClick={() => { if (activeView !== 'home') handleNavClick('home'); }} className="text-slate-600 hover:text-slate-900 transition-colors">FAQ</a>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-2.5">
            <button
              onClick={onStartTrial}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 rounded-md transition-all"
            >
              Free Trial
            </button>
            
            <button
              onClick={() => onBookDemo()}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-md shadow-2xs transition-colors flex items-center gap-1.5 active:scale-95"
            >
              Book a Demo <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => onBookDemo()}
              className="px-3 py-1.5 bg-slate-900 text-white font-semibold text-xs rounded-md sm:hidden"
            >
              Demo
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-200 space-y-4 pb-3 animate-fade-in bg-white max-h-[80vh] overflow-y-auto">
            {/* Products Section */}
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Products
              </div>
              <div className="grid grid-cols-1 gap-1 text-xs font-medium">
                {productsList.map((m) => {
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.id}
                      onClick={() => handleNavClick(m.id)}
                      className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-left text-xs font-semibold text-slate-800 hover:bg-slate-100 flex items-center gap-2.5"
                    >
                      <Icon className={`w-4 h-4 ${m.color}`} />
                      <div>
                        <div>{m.name}</div>
                        <div className="text-[10px] text-slate-500 font-normal">{m.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Services Section */}
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Services
              </div>
              <div className="grid grid-cols-1 gap-1 text-xs font-medium">
                {servicesList.map((s) => {
                  const Icon = s.icon;
                  return (
                    <button
                      key={s.id}
                      onClick={() => handleNavClick(s.id)}
                      className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-left text-xs font-semibold text-slate-800 hover:bg-slate-100 flex items-center gap-2.5"
                    >
                      <Icon className={`w-4 h-4 ${s.color}`} />
                      <div>
                        <div>{s.name}</div>
                        <div className="text-[10px] text-slate-500 font-normal">{s.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  onBookDemo();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 bg-slate-900 text-white font-semibold text-xs rounded-md text-center"
              >
                Book a Demo
              </button>
              <button
                onClick={() => {
                  onStartTrial();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 border border-slate-200 text-slate-700 font-semibold text-xs rounded-md text-center hover:bg-slate-50"
              >
                Start Free Trial
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
