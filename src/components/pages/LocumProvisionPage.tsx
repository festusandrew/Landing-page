import React, { useState } from 'react';
import { Users, Clock, ShieldCheck, MapPin, Sparkles, CheckCircle2, ArrowRight, Zap, Calculator, Bell, Check, PhoneCall, AlertCircle, ArrowLeft, Star, Building2, UserCheck, Smartphone } from 'lucide-react';

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
  const [selectedShiftId, setSelectedShiftId] = useState<string | null>(null);
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-20 pb-16 animate-fade-in font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200 py-3 sticky top-16 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Overview
          </button>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Locum Provision Live Network Active (98.4% Shift Fill Rate)</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 lg:py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-bold uppercase tracking-wider">
                <Users className="w-3.5 h-3.5" /> Locum Provision & Urgent Staffing
              </span>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                On-Demand Locum Staffing & Instant Shift Dispatch
              </h1>

              <p className="text-base text-slate-600 leading-relaxed font-normal">
                Connect your care facility directly with a network of pre-vetted RGN nurses, senior carers, and healthcare assistants. Fill unexpected shift gaps in under 2 hours with automated broadcast, live GPS check-ins, and zero paperwork.
              </p>

              {/* Key Value Metrics */}
              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-2xl font-extrabold text-slate-900">&lt; 2 Hrs</div>
                  <div className="text-[11px] text-slate-500 font-medium">Avg. Shift Fill Time</div>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-2xl font-extrabold text-slate-900">100%</div>
                  <div className="text-[11px] text-slate-500 font-medium">Verified DBS & NMC</div>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-2xl font-extrabold text-slate-900">0%</div>
                  <div className="text-[11px] text-slate-500 font-medium">Manual Paperwork</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onBookDemo('Locum Provision')}
                  className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors shadow-sm flex items-center gap-2"
                >
                  Book Locum Provision Demo <ArrowRight className="w-4 h-4 text-slate-300" />
                </button>
                <button
                  onClick={onStartTrial}
                  className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-900 font-semibold text-xs rounded-lg border border-slate-200 shadow-2xs transition-colors"
                >
                  Start 14-Day Free Trial
                </button>
              </div>
            </div>

            {/* Right Interactive Live Dispatch Callout */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 rounded-2xl shadow-xl border border-slate-800 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-700/80 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Live Locum Dispatch Engine</div>
                    <div className="text-[11px] text-slate-400">London & South East Sector</div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold">
                  LIVE BROADCAST
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" /> Sunrise Care Home
                    </div>
                    <div className="text-[11px] text-slate-400">1x RGN Nurse needed for Night Shift</div>
                  </div>
                  <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded text-[10px] font-bold">
                    Matched in 14m
                  </span>
                </div>

                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" /> Meadowview Group
                    </div>
                    <div className="text-[11px] text-slate-400">2x HCA Carers needed for Early Shift</div>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded text-[10px] font-bold">
                    Filled & Checked In
                  </span>
                </div>
              </div>

              <div className="pt-2 text-center">
                <p className="text-[11px] text-slate-400 mb-3">
                  Are you a care home manager needing urgent shift cover today?
                </p>
                <button
                  onClick={() => onBookDemo('Locum Shift Dispatch')}
                  className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" /> Request Emergency Locum Cover
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Locum Shift Marketplace & Dispatcher Section */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Live Software Portal</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Interactive Locum Shift Marketplace & Dispatch Portal
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl">
            Test our real-time shift broadcast simulator. Filter shifts by clinical role, review compliance credentials, and see how easy it is to manage temporary healthcare workers.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
          {/* Controls & Role Filter */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700">Filter Role:</span>
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
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
              <Sparkles className="w-4 h-4 text-emerald-600" />
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
                      ? 'bg-emerald-50/60 border-emerald-300 shadow-2xs' 
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
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

                  <div className="space-y-2 py-3 border-y border-slate-100 text-xs">
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
                      <span className="text-emerald-700 font-semibold text-[11px] flex items-center gap-1">
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
                          ? 'bg-emerald-600 text-white cursor-default' 
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
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
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
                <span className="text-emerald-400 font-bold font-mono text-sm">£{hourlyRate}/hr</span>
              </div>
              <input
                type="range"
                min={18}
                max={50}
                step={1}
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full accent-emerald-400 bg-slate-700 h-2 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-2 bg-slate-800/80 p-4 rounded-xl border border-slate-700">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300">Shift Length (Hours):</span>
                <span className="text-emerald-400 font-bold font-mono text-sm">{shiftHours} Hours</span>
              </div>
              <input
                type="range"
                min={4}
                max={14}
                step={1}
                value={shiftHours}
                onChange={(e) => setShiftHours(Number(e.target.value))}
                className="w-full accent-emerald-400 bg-slate-700 h-2 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-2 bg-slate-800/80 p-4 rounded-xl border border-slate-700">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300">Number of Locums Required:</span>
                <span className="text-emerald-400 font-bold font-mono text-sm">{locumCount} Staff</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                step={1}
                value={locumCount}
                onChange={(e) => setLocumCount(Number(e.target.value))}
                className="w-full accent-emerald-400 bg-slate-700 h-2 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          <div className="p-4 bg-slate-800/90 rounded-xl border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">Total Estimated Shift Cost</span>
              <div className="text-3xl font-extrabold text-white font-mono">
                £{totalCalculatedCost.toLocaleString()}
              </div>
              <p className="text-[11px] text-emerald-400 font-medium">Includes automated DBS checks, digital timesheets & payroll export</p>
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
          <h3 className="text-xl font-bold text-slate-900">Why UK Care Facilities Choose MployUS Locum Provision</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center font-bold mb-3">
                <Bell className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Instant SMS Broadcast</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Publish a vacant shift and alert qualified locums within a 15-mile radius instantly via mobile push and SMS.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center font-bold mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Digital Compliance Vault</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Automated checks for NMC PIN status, Enhanced DBS, right-to-work, and mandatory training certificates.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
              <div className="w-10 h-10 rounded-lg bg-violet-50 text-violet-600 border border-violet-200 flex items-center justify-center font-bold mb-3">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">GPS Geofenced Clock-In</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Ensure locum staff are physically on-site before clocking in. Digital timesheets with manager mobile signatures.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
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

        {/* CTA Banner */}
        <div className="p-8 rounded-2xl bg-slate-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Ready to Fill Urgent Shifts?</span>
            <h3 className="text-2xl font-bold text-white">Start Dispatching Locums in Minutes</h3>
            <p className="text-xs text-slate-300">Set up your facility account today with zero upfront setup fees.</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onBookDemo('Locum Provision')}
              className="px-6 py-3 bg-white text-slate-900 font-semibold text-xs rounded-md hover:bg-slate-100 transition-colors shadow-2xs"
            >
              Book Locum Demo
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
