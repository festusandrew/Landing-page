import React, { useState } from 'react';
import { Users, Clock, ShieldCheck, MapPin, CheckCircle2, ArrowRight, Zap, Calculator, Bell, Check, PhoneCall, ArrowLeft, Star, Building2, Smartphone, LayoutDashboard, BarChart3, CalendarClock, Play } from 'lucide-react';
import locumDashboard from '../../imports/Screenshot_2026-07-24_140350.png';

interface LocumProvisionPageProps {
  onBackToHome: () => void;
  onBookDemo: (moduleTitle?: string) => void;
  onStartTrial: () => void;
}

export const LocumProvisionPage: React.FC<LocumProvisionPageProps> = ({
  onBackToHome,
  onBookDemo,
  onStartTrial
}) => {
  // Interactive State for Shift Dispatch Simulator
  const [activeRoleFilter, setActiveRoleFilter] = useState<'all' | 'RGN' | 'HCA' | 'Senior Carer'>('all');
  const [bookedShiftIds, setBookedShiftIds] = useState<string[]>([]);
  const [hourlyRate, setHourlyRate] = useState<number>(28);
  const [shiftHours, setShiftHours] = useState<number>(12);
  const [locumCount, setLocumCount] = useState<number>(2);

  const mockShifts = [
    {
      id: 'shift-101',
      facility: 'Sunrise Care Home - West Suite',
      role: 'RGN',
      date: 'Today • Night Shift (20:00 - 08:00)',
      rate: '£34.00/hr',
      urgency: 'URGENT',
      distance: '1.2 miles away',
      compliance: 'NMC Validated • Enhanced DBS',
      assignedLocum: 'Sarah Jenkins (RGN - 4.9 ★)'
    },
    {
      id: 'shift-102',
      facility: 'Meadowview Residential Unit',
      role: 'Senior Carer',
      date: 'Tomorrow • Day Shift (08:00 - 20:00)',
      rate: '£22.50/hr',
      urgency: 'HIGH PRIORITY',
      distance: '2.8 miles away',
      compliance: 'Level 3 NVQ • DBS Verified',
      assignedLocum: 'David Okafor (Senior Carer - 5.0 ★)'
    },
    {
      id: 'shift-103',
      facility: 'Beacon Dementia Facility',
      role: 'HCA',
      date: 'Today • Late Shift (14:00 - 22:00)',
      rate: '£18.50/hr',
      urgency: 'URGENT',
      distance: '0.8 miles away',
      compliance: 'Care Certificate • Manual Handling',
      assignedLocum: 'Elena Rostova (HCA - 4.8 ★)'
    },
    {
      id: 'shift-104',
      facility: 'St. Jude Clinical Care Wing',
      role: 'RGN',
      date: 'Sat, 26 Jul • Day Shift (08:00 - 20:00)',
      rate: '£36.00/hr',
      urgency: 'PLANNED COVER',
      distance: '3.5 miles away',
      compliance: 'NMC Registered • Tracheostomy Cert',
      assignedLocum: 'Pending Dispatch'
    }
  ];

  const filteredShifts = mockShifts.filter(s => activeRoleFilter === 'all' || s.role === activeRoleFilter);

  const totalCalculatedCost = hourlyRate * shiftHours * locumCount;

  const handleBookShift = (id: string) => {
    if (!bookedShiftIds.includes(id)) {
      setBookedShiftIds([...bookedShiftIds, id]);
    }
  };

  const dashboardFeatures = [
    {
      icon: BarChart3,
      title: 'Real-time shift analytics',
      desc: 'Track fill rate, active shifts, open requests and time-to-fill at a glance — every metric updates the moment a locum is booked.'
    },
    {
      icon: CalendarClock,
      title: 'Emergency staffing alerts',
      desc: 'Unfilled and urgent shifts surface at the top of the dashboard so your team can act on gaps before they impact care.'
    },
    {
      icon: ShieldCheck,
      title: 'Compliance & risk at a glance',
      desc: 'Live compliance alerts flag expiring DBS checks, NMC PINs and mandatory training before they become a problem.'
    },
    {
      icon: BarChart3,
      title: 'Payroll & invoicing built in',
      desc: 'Approve timesheets, see revenue MTD and generate invoices without ever leaving the locum dashboard.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-20 pb-16 animate-fade-in font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Breadcrumb Header */}
      <div className="bg-white border-b border-black/10 py-3 sticky top-16 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Overview
          </button>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-700">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span>Locum Dashboard Live (98.4% Shift Fill Rate)</span>
          </div>
        </div>
      </div>

      {/* HERO — Dashboard-led landing */}
      <section className="py-14 lg:py-20 bg-white border-b border-black/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-bold uppercase tracking-wider">
              <LayoutDashboard className="w-3.5 h-3.5" /> The Locum Dashboard
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.08]">
              Every locum shift, in one live dashboard
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl">
              Dispatch urgent shifts, monitor fill rates, track compliance and run payroll — all from a single command centre built for UK care providers. Fill unexpected gaps in under 2 hours with zero paperwork.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => onBookDemo('Locum Dashboard')}
                className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-lg transition-colors shadow-xs flex items-center gap-2"
              >
                Book a Dashboard Demo <ArrowRight className="w-4 h-4 text-slate-300" />
              </button>
              <button
                onClick={onStartTrial}
                className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-900 font-semibold text-sm rounded-lg border border-black/10 shadow-2xs transition-colors flex items-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-current" /> Start 14-Day Free Trial
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 text-xs text-slate-600 font-medium">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-blue-600" /> 100% verified DBS & NMC</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-blue-600" /> No setup fees</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-blue-600" /> CQC compliant</span>
            </div>
          </div>

          {/* Dashboard screenshot in browser frame */}
          <div className="relative max-w-5xl mx-auto mt-12">
            <div className="rounded-2xl bg-white border border-black/10 shadow-sm overflow-hidden">
              <div className="bg-slate-50 px-4 py-3 border-b border-black/10 flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-slate-300" />
                  <div className="w-3 h-3 rounded-full bg-slate-300" />
                  <div className="w-3 h-3 rounded-full bg-slate-300" />
                </div>
                <span className="text-xs font-mono text-slate-500 ml-2 hidden sm:inline">mployus.cloud/locum/dashboard</span>
              </div>
              <img
                src={locumDashboard}
                alt="MployUs locum dashboard showing active shifts, fill rate, emergency staffing alerts and shift fill trends"
                className="w-full object-cover object-top"
              />
            </div>
            {/* Floating stat callout */}
            <div className="hidden sm:flex absolute -bottom-5 -left-5 items-center gap-3 bg-white border border-black/10 rounded-xl shadow-sm px-4 py-3">
              <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center">
                <Zap className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-sm font-extrabold text-slate-900">&lt; 2 hrs</div>
                <div className="text-[11px] text-slate-500 font-medium">Avg. shift fill time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '98.4%', label: 'Average shift fill rate' },
            { value: '< 2 hrs', label: 'Time to fill urgent shifts' },
            { value: '892', label: 'Verified locums in network' },
            { value: '0%', label: 'Manual paperwork' }
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl sm:text-4xl font-extrabold text-white">{stat.value}</div>
              <div className="text-[11px] sm:text-xs text-slate-400 font-medium mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Dashboard feature highlights */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Inside the dashboard</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2">
            Everything your staffing team needs, on one screen
          </h2>
          <p className="text-slate-600 text-sm mt-3">
            The locum dashboard brings dispatch, compliance, scheduling and finance together so nothing slips through the cracks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {dashboardFeatures.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="p-6 rounded-2xl bg-white border border-black/10 shadow-2xs space-y-3">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">{f.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Locum Shift Marketplace & Dispatcher Section */}
      <section className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Try it live</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Dispatch a shift from the live marketplace
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2">
            Filter shifts by clinical role, review compliance credentials, and broadcast to matched locums — exactly as you would inside the dashboard.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-black/10 shadow-xs p-6 space-y-6">
          {/* Controls & Role Filter */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-black/10">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700">Filter Role:</span>
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-black/10 text-xs">
                {(['all', 'RGN', 'Senior Carer', 'HCA'] as const).map(role => (
                  <button
                    key={role}
                    onClick={() => setActiveRoleFilter(role)}
                    className={`px-3 py-1 rounded-md font-semibold transition-all ${
                      activeRoleFilter === role ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {role === 'all' ? 'All Roles' : role}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span>Smart Locum Auto-Matching Engine Active</span>
            </div>
          </div>

          {/* Shift Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredShifts.map(s => {
              const isBooked = bookedShiftIds.includes(s.id);
              return (
                <div
                  key={s.id}
                  className={`p-5 rounded-xl border transition-all ${
                    isBooked
                      ? 'bg-blue-50/60 border-blue-300 shadow-2xs'
                      : 'bg-white border-black/10 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-1.5 ${
                        s.urgency === 'URGENT'
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}>
                        {s.urgency}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">{s.facility}</h4>
                      <p className="text-xs text-slate-500 font-medium">{s.date}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-base font-extrabold text-slate-900">{s.rate}</div>
                      <div className="text-[10px] text-slate-400 font-medium">{s.distance}</div>
                    </div>
                  </div>

                  <div className="space-y-2 py-3 border-y border-black/10 text-xs">
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="font-semibold text-slate-700">Required Role:</span>
                      <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded text-[11px]">{s.role}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="font-semibold text-slate-700">Locum Assigned:</span>
                      <span className="text-slate-800 font-medium">{s.assignedLocum}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="font-semibold text-slate-700">Compliance Vault:</span>
                      <span className="text-blue-700 font-semibold text-[11px] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {s.compliance}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">
                      {isBooked ? 'Shift Dispatched & Confirmed' : 'Instant 1-Tap Booking Ready'}
                    </span>
                    <button
                      onClick={() => handleBookShift(s.id)}
                      disabled={isBooked}
                      className={`px-4 py-2 rounded-md font-semibold text-xs transition-colors flex items-center gap-1.5 ${
                        isBooked
                          ? 'bg-blue-600 text-white cursor-default'
                          : 'bg-slate-900 hover:bg-slate-800 text-white shadow-2xs'
                      }`}
                    >
                      {isBooked ? (
                        <>
                          <Check className="w-4 h-4" /> Dispatched
                        </>
                      ) : (
                        'Broadcast to Locums'
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Locum Cost Calculator */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider">
            <Calculator className="w-4 h-4" /> Facility Budget Estimator
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Locum Staffing Cost & Margin Calculator
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Estimate your weekly or monthly temporary staffing expenditure with zero hidden agency surcharges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2 bg-slate-800/80 p-4 rounded-xl border border-slate-700">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300">Locum Hourly Pay Rate:</span>
                <span className="text-blue-400 font-bold font-mono text-sm">£{hourlyRate}/hr</span>
              </div>
              <input
                type="range"
                min={18}
                max={50}
                step={1}
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full accent-blue-400 bg-slate-700 h-2 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-2 bg-slate-800/80 p-4 rounded-xl border border-slate-700">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300">Shift Length (Hours):</span>
                <span className="text-blue-400 font-bold font-mono text-sm">{shiftHours} Hours</span>
              </div>
              <input
                type="range"
                min={4}
                max={14}
                step={1}
                value={shiftHours}
                onChange={(e) => setShiftHours(Number(e.target.value))}
                className="w-full accent-blue-400 bg-slate-700 h-2 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-2 bg-slate-800/80 p-4 rounded-xl border border-slate-700">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300">Number of Locums Required:</span>
                <span className="text-blue-400 font-bold font-mono text-sm">{locumCount} Staff</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                step={1}
                value={locumCount}
                onChange={(e) => setLocumCount(Number(e.target.value))}
                className="w-full accent-blue-400 bg-slate-700 h-2 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          <div className="p-4 bg-slate-800/90 rounded-xl border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">Total Estimated Shift Cost</span>
              <div className="text-3xl font-extrabold text-white font-mono">
                £{totalCalculatedCost.toLocaleString()}
              </div>
              <p className="text-[11px] text-blue-400 font-medium">Includes automated DBS checks, digital timesheets & payroll export</p>
            </div>
            <button
              onClick={() => onBookDemo('Locum Budget Breakdown')}
              className="px-6 py-3 bg-white text-slate-900 font-semibold text-xs rounded-lg hover:bg-slate-100 transition-colors shrink-0 flex items-center gap-1.5"
            >
              Get Custom Agency Rate Card <ArrowRight className="w-4 h-4 text-slate-900" />
            </button>
          </div>
        </div>

        {/* Core Pillars of Locum Provision */}
        <div className="pt-6 space-y-6">
          <h3 className="text-xl font-bold text-slate-900">Why UK Care Facilities Choose MployUs Locum Provision</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl bg-white border border-black/10 shadow-2xs space-y-2">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center font-bold mb-3">
                <Bell className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Instant SMS Broadcast</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Publish a vacant shift and alert qualified locums within a 15-mile radius instantly via mobile push and SMS.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-black/10 shadow-2xs space-y-2">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center font-bold mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Digital Compliance Vault</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Automated checks for NMC PIN status, Enhanced DBS, right-to-work, and mandatory training certificates.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-black/10 shadow-2xs space-y-2">
              <div className="w-10 h-10 rounded-lg bg-violet-50 text-violet-600 border border-violet-200 flex items-center justify-center font-bold mb-3">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">GPS Geofenced Clock-In</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Ensure locum staff are physically on-site before clocking in. Digital timesheets with manager mobile signatures.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-black/10 shadow-2xs space-y-2">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center font-bold mb-3">
                <Smartphone className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Free Mobile Worker App</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Locum healthcare workers download the iOS/Android app to set availability, store credentials, and view pay slips.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="p-8 rounded-2xl bg-white border border-black/10 shadow-2xs text-center max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
          </div>
          <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed">
            "The locum dashboard replaced three spreadsheets and two agencies. We fill night shifts before the previous carer has even clocked out — and I can see our compliance status without chasing anyone."
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
            <Building2 className="w-4 h-4 text-slate-400" />
            <span className="font-semibold text-slate-700">Omar Murphy</span> · Operations Lead, Riverside Care Group
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-8 rounded-2xl bg-slate-900 text-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-2">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Ready to fill urgent shifts?</span>
            <h3 className="text-2xl font-bold text-white">Start dispatching locums in minutes</h3>
            <p className="text-xs text-slate-300">Set up your facility account today with zero upfront setup fees.</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onBookDemo('Locum Dashboard')}
              className="px-6 py-3 bg-white text-slate-900 font-semibold text-xs rounded-md hover:bg-slate-100 transition-colors shadow-2xs"
            >
              Book Dashboard Demo
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
