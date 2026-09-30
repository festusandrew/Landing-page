import React from 'react';
import { Activity, Mail, Phone, MapPin, Linkedin, Twitter, Facebook, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (viewId: string) => void;
  onBookDemo: () => void;
  onStartTrial: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onBookDemo }) => {
  const handleNav = (viewId: string) => {
    onNavigate(viewId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white text-slate-600 text-xs border-t border-slate-200 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* 5 Columns Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* Column 1: Products */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider">Products</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNav('recruitment-software')} className="hover:text-slate-900 transition-colors text-left">
                  Recruitment Software
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('care-management')} className="hover:text-slate-900 transition-colors text-left">
                  Care Management Software
                </button>
              </li>
            </ul>

            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider pt-2">Services</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNav('locum-provision')} className="hover:text-slate-900 transition-colors text-left font-semibold text-slate-900">
                  Locum Provision
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('recruitment-service')} className="hover:text-slate-900 transition-colors text-left">
                  Recruitment Service
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('product-design')} className="hover:text-slate-900 transition-colors text-left">
                  Product Design
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('web-development')} className="hover:text-slate-900 transition-colors text-left">
                  Web Development
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Platform Links */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2">
              <li><button onClick={() => handleNav('home')} className="hover:text-slate-900 transition-colors text-left">Overview Landing Page</button></li>
              <li><a href="#how-it-works" onClick={() => handleNav('home')} className="hover:text-slate-900 transition-colors">How It Works</a></li>
              <li><a href="#benefits" onClick={() => handleNav('home')} className="hover:text-slate-900 transition-colors">ROI & Benefits</a></li>
              <li><a href="#pricing" onClick={() => handleNav('home')} className="hover:text-slate-900 transition-colors">Pricing Plans</a></li>
              <li><a href="#faq" onClick={() => handleNav('home')} className="hover:text-slate-900 transition-colors">FAQ & Support</a></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-slate-900 transition-colors">About MployUS</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Careers (We're Hiring)</a></li>
              <li><button onClick={onBookDemo} className="hover:text-slate-900 transition-colors">Contact Sales</button></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Security & Compliance</a></li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">UK GDPR Compliance</a></li>
            </ul>
          </div>

          {/* Column 5: Contact & UK HQ */}
          <div className="space-y-3 col-span-2 md:col-span-1">
            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider">Contact Us</h4>
            <div className="space-y-2 text-[11px] font-medium">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-800 shrink-0" />
                <a href="mailto:hello@mployus.cloud" className="hover:text-slate-900">hello@mployus.cloud</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-800 shrink-0" />
                <span>0800 900 8000 (UK Toll-Free)</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-800 shrink-0 mt-0.5" />
                <span>124 Healthcare Place, London, EC1A 1BB</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2 flex items-center gap-3">
              <a href="#" className="p-2 rounded-lg bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-slate-900 text-white flex items-center justify-center font-bold">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <span className="font-bold text-slate-900 text-sm">MployUS</span>
            <span className="text-slate-500">• © 2026 MployUS Healthcare Platform. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-2 text-emerald-700 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>CQC Compliant • GDPR Secure • ISO 27001 Certified</span>
          </div>

        </div>

      </div>
    </footer>
  );
};
