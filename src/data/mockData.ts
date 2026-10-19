import { ProductModule, WorkflowStep, MetricOutcome, Testimonial, FAQItem, PricingPlan, FeatureCategory } from '../types';

export const PRODUCT_MODULES: ProductModule[] = [
  {
    id: 'recruitment',
    title: 'Recruitment Software',
    tagline: 'Fill care roles 60% faster with intelligent hiring tools',
    iconName: 'UserPlus',
    badge: 'Recruitment & ATS',
    color: 'from-blue-600 to-teal-500',
    metrics: '60% Faster Hiring',
    features: [
      'Post to 10+ job boards with one click and track which sources deliver quality candidates',
      'Build custom hiring pipelines with drag-and-drop stages and automated candidate workflows',
      'Collaborate with team permissions, shared notes, and real-time candidate updates',
      'Seamlessly transition hired candidates into employee profiles for instant onboarding'
    ],
    useCase: 'Perfect for recruitment agencies and HR teams hiring nurses, care assistants, and clinical staff.',
    ctaText: 'Explore Recruitment Tools',
    uiPreviewType: 'recruitment',
    link: '/products/recruitment-software'
  },
  {
    id: 'care-management',
    title: 'Care Management Software',
    tagline: 'Deliver safer, compliant care with digital-first workflows',
    iconName: 'HeartPulse',
    badge: 'Care & Clinical',
    color: 'from-emerald-600 to-teal-600',
    metrics: 'CQC Audit Ready',
    features: [
      'Secure service user profiles with encrypted medical histories and care preferences',
      'Digital care plans with real-time updates and clinical sign-offs',
      'Electronic medication records (eMAR) with smart alerts and safety checks',
      'Incident reporting with severity grading and automated investigation tracking'
    ],
    useCase: 'Built for care homes, residential facilities, and domiciliary care providers.',
    ctaText: 'Explore Care Tools',
    uiPreviewType: 'care',
    link: '/products/care-management'
  },
  {
    id: 'locums-staffing',
    title: 'Locums & Care Staffing',
    tagline: 'Match qualified workers to urgent shifts in real-time',
    iconName: 'Users',
    badge: 'Staffing App',
    color: 'from-violet-600 to-indigo-600',
    metrics: '< 2 Hr Fill Rate',
    features: [
      'Smart shift matching with instant alerts for rate, location, and role type',
      'Digital compliance vault with auto-renew prompts for certifications',
      'GPS timesheets with facility sign-off and fast payroll processing',
      'One-tap booking for urgent and planned shifts without phone calls'
    ],
    useCase: 'Designed for locum healthcare workers and agencies managing flexible staffing.',
    ctaText: 'Explore Staffing Tools',
    uiPreviewType: 'staffing',
    link: '/products/locums-staffing'
  },
  {
    id: 'facility-management',
    title: 'Facility Management Portal',
    tagline: 'Fill urgent shifts and track staff in real-time',
    iconName: 'Building2',
    badge: 'Facility Operations',
    color: 'from-amber-600 to-orange-500',
    metrics: '100% Rota Visibility',
    features: [
      'Post emergency shifts 24/7 and receive instant locum responses',
      'Monitor staff check-ins, attendance, and compliance status live',
      'Verify incoming staff credentials, photos, and certifications before arrival',
      'Track costs, funder billing, and operational analytics in one dashboard'
    ],
    useCase: 'Essential for care home managers and operations directors managing daily staffing.',
    ctaText: 'Explore Facility Tools',
    uiPreviewType: 'facility',
    link: '/products/facility-management'
  }
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    stepNumber: 1,
    title: 'Recruit & Hire',
    subtitle: 'Multi-board distribution & ATS',
    description: 'Post a care assistant role to 10 job boards instantly. Track candidates through your custom pipeline. Hire the best fit.',
    iconName: 'Briefcase',
    highlights: ['1-Click multi-posting', 'Automated screening', 'ATS pipeline'],
    mockupDetails: {
      status: '8 Applicants Screened',
      metrics: '3 Qualified Candidates ready for Interview',
      actionLabel: 'Convert Candidate to Employee',
      activeModule: 'Recruitment Software'
    }
  },
  {
    stepNumber: 2,
    title: 'Onboard & Credential',
    subtitle: 'Digital Compliance Vault',
    description: 'Move hired candidates into employee profiles. Upload DBS checks, training certs, and IDs to their secure compliance vault.',
    iconName: 'ShieldCheck',
    highlights: ['Automated DBS checks', 'Cert auto-reminders', 'Digital profile'],
    mockupDetails: {
      status: 'Compliance 100% Verified',
      metrics: 'DBS & NMC License Validated',
      actionLabel: 'Publish Employee to Rota',
      activeModule: 'Workforce Compliance'
    }
  },
  {
    stepNumber: 3,
    title: 'Schedule & Staff',
    subtitle: 'Smart Rota & Locum Matching',
    description: 'Build compliant rotas with skill-match alerts. Publish shifts to your team or fill urgent gaps with qualified locums.',
    iconName: 'CalendarClock',
    highlights: ['Smart skill-matching', 'Instant shift alerts', '1-Tap booking'],
    mockupDetails: {
      status: '12 Shifts Filled Today',
      metrics: '2 Urgent Locums Matched in 14 mins',
      actionLabel: 'Send Check-in Link to Mobile App',
      activeModule: 'Locums & Staffing App'
    }
  },
  {
    stepNumber: 4,
    title: 'Deliver Care',
    subtitle: 'Digital Care Plans & eMAR',
    description: 'Staff clock in via GPS, access service user care plans, log daily notes, and record medications digitally on mobile.',
    iconName: 'Stethoscope',
    highlights: ['GPS clock-in', 'eMAR safety checks', 'Voice notes logging'],
    mockupDetails: {
      status: 'Morning Med Pass Completed',
      metrics: '42 Resident Care Logs Synced Live',
      actionLabel: 'Review Clinical Audit Trail',
      activeModule: 'Care Management Software'
    }
  },
  {
    stepNumber: 5,
    title: 'Track & Optimize',
    subtitle: 'Live Analytics & Funder Billing',
    description: 'View live attendance, care trends, compliance gaps, and financial data. Export audit-ready reports for CQC inspections or payroll.',
    iconName: 'BarChart3',
    highlights: ['CQC inspection reports', 'Sage/Xero payroll export', 'Live cost dashboard'],
    mockupDetails: {
      status: 'CQC Audit Package Ready',
      metrics: '15 Hrs Admin Saved This Week',
      actionLabel: 'Export Funder Invoices & Payroll',
      activeModule: 'Facility Analytics Portal'
    }
  }
];

export const METRIC_OUTCOMES: MetricOutcome[] = [
  {
    id: 'speed',
    title: 'Fill Roles 60% Faster',
    stat: '8 Days',
    benchmark: 'Industry average: 21 days',
    description: 'Multi-board job posting and automated candidate screening cut your time-to-hire from weeks to days.',
    iconName: 'Timer',
    color: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  {
    id: 'compliance',
    title: '95% Compliance Score',
    stat: '100% CQC',
    benchmark: 'Zero major compliance findings',
    description: 'Digital care plans, eMAR tracking, and incident management keep you audit-ready at all times.',
    iconName: 'ShieldCheck',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  {
    id: 'efficiency',
    title: 'Save 15 Hours Per Week',
    stat: '15 Hrs/Wk',
    benchmark: 'Reclaim 2+ hours daily per manager',
    description: 'Automation, mobile access, and integrated workflows eliminate duplicate admin and manual processes.',
    iconName: 'Zap',
    color: 'bg-amber-50 text-amber-700 border-amber-200'
  },
  {
    id: 'visibility',
    title: 'Real-Time Operational Insight',
    stat: '80% Faster',
    benchmark: 'Staffing gap resolution speed',
    description: 'Live dashboards show staffing, care delivery, and financial metrics so you can act fast on what matters.',
    iconName: 'TrendingUp',
    color: 'bg-teal-50 text-teal-700 border-teal-200'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote: 'Before MployUS, we juggled five different systems for recruitment, rotas, and care plans. Now everything lives in one place. Our CQC inspection was the smoothest we’ve ever had — the inspectors were impressed by how quickly we could pull up records.',
    author: 'Sarah Mitchell',
    role: 'Care Home Manager',
    organization: 'Sunrise Care Group',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    moduleBadge: 'Care Management & Facility Portal'
  },
  {
    id: '2',
    quote: 'We’ve cut our time-to-fill by half. The multi-board posting alone saves us 10 hours a week, and being able to track candidates from application to their first shift is a game-changer.',
    author: 'James Chen',
    role: 'Director',
    organization: 'HealthStaff Recruitment',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    moduleBadge: 'Recruitment Software'
  },
  {
    id: '3',
    quote: 'I used to spend hours calling agencies to find shifts. Now I get instant alerts for roles near me, book with one tap, and get paid faster. The compliance vault means I’m never scrambling for paperwork.',
    author: 'Amira Patel',
    role: 'RGN, Locum Nurse',
    organization: 'Independent Healthcare Professional',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813566-78853a167098?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    moduleBadge: 'Locums & Staffing App'
  }
];

export const FEATURE_CATEGORIES: FeatureCategory[] = [
  {
    title: 'Recruitment & Hiring',
    iconName: 'UserPlus',
    items: [
      { name: 'Multi-board job distribution', description: 'Post to 10+ UK job boards with 1 click' },
      { name: 'Custom hiring pipelines', description: 'Drag-and-drop stages for care roles' },
      { name: 'Team collaboration & permissions', description: 'Shared interview notes & hiring scorecards' },
      { name: 'Customizable email templates', description: 'Automated candidate engagement messaging' },
      { name: 'Custom screening questions', description: 'Pre-qualify candidates based on licenses' },
      { name: 'Task management & reminders', description: 'Never miss an interview or follow-up' }
    ]
  },
  {
    title: 'Care Delivery',
    iconName: 'HeartPulse',
    items: [
      { name: 'Secure service user profiles', description: 'Encrypted medical histories & care preferences' },
      { name: 'Digital care plans', description: 'Real-time updates with clinical sign-offs' },
      { name: 'Daily logs & voice dictation', description: 'Fast mobile care documentation for staff' },
      { name: 'Electronic medication (eMAR)', description: 'Smart dosage alerts & double-sign checks' },
      { name: 'Incident reporting & investigations', description: 'Severity grading & automated CQC notifications' },
      { name: 'Activity & program tracking', description: 'Log resident engagement & wellbeing trends' }
    ]
  },
  {
    title: 'Workforce Management',
    iconName: 'Users',
    items: [
      { name: 'Live attendance & GPS clocking', description: 'Geofenced check-ins with shift verification' },
      { name: 'Smart rota builder', description: 'Automated skill & licensing match warnings' },
      { name: 'Shift matching & alerts', description: 'Push notifications for urgent vacant shifts' },
      { name: 'Digital compliance vault', description: 'Auto-renew prompts for DBS, NMC & training' },
      { name: 'Self-service leave booking', description: 'Mobile holiday & sickness request workflow' },
      { name: 'Automated timesheets & payroll', description: 'One-click sign-off & fast pay calculations' }
    ]
  },
  {
    title: 'Operations & Analytics',
    iconName: 'Building2',
    items: [
      { name: 'Real-time dashboards', description: 'Live occupancy, staffing & care KPI tracking' },
      { name: 'Compliance gap analysis', description: 'Proactive audit score alerts before inspections' },
      { name: 'Funder billing & invoicing', description: 'Track local authority & private resident funding' },
      { name: 'Risk assessments', description: 'Standardized clinical & environmental risk forms' },
      { name: 'Audit-ready reports', description: 'Export complete CQC compliance binders in seconds' },
      { name: 'White-label branding', description: 'Custom logo & colors for enterprise providers' }
    ]
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    target: 'For small care homes and independent agencies',
    monthlyPrice: 199,
    annualMonthlyPrice: 159,
    features: [
      'Up to 50 active staff / employees',
      'Select any 2 product modules',
      'Core recruitment & care logging features',
      'Digital compliance vault',
      'Standard email & chat support',
      'Free data migration assistance'
    ],
    cta: 'Start Free 14-Day Trial'
  },
  {
    id: 'professional',
    name: 'Professional',
    target: 'For growing care facilities and multi-site groups',
    monthlyPrice: 499,
    annualMonthlyPrice: 399,
    popular: true,
    features: [
      'Up to 200 active staff / employees',
      'All 4 product modules included',
      'Advanced eMAR & voice dictation',
      'GPS time tracking & smart rota builder',
      'Priority 24/7 UK phone & chat support',
      'Custom payroll export (Sage, Xero, BrightPay)',
      'Dedicated onboarding manager'
    ],
    cta: 'Book a Live Demo'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    target: 'For large multi-site healthcare groups & NHS trusts',
    monthlyPrice: 999,
    annualMonthlyPrice: 799,
    features: [
      'Unlimited staff & service user profiles',
      'All 4 product modules + white-label option',
      'Custom API integrations & Webhooks',
      'Dedicated Customer Success Manager',
      'Custom SLA & 99.99% uptime guarantee',
      'On-site staff training workshops',
      'Enterprise CQC audit guarantee'
    ],
    cta: 'Contact Enterprise Sales'
  }
];

export const FAQS: FAQItem[] = [
  {
    question: 'Do I need to use all four modules?',
    answer: 'No. You can start with a single module (e.g. Recruitment or Care Management) and unlock additional modules as your organization grows. All modules function independently or seamlessly together with zero data duplication.',
    category: 'general'
  },
  {
    question: 'How long does implementation take?',
    answer: 'Most organizations are fully operational within 2 to 4 weeks. We provide a dedicated implementation specialist, full data migration support, and tailored training sessions for care staff and management.',
    category: 'general'
  },
  {
    question: 'Is MployUS CQC compliant and audit-ready?',
    answer: 'Yes. Our Care Management module is designed explicitly to meet and exceed CQC standards for record-keeping, eMAR medication tracking, incident reporting, and staff licensing verification. You can export audit-ready packages in one click.',
    category: 'compliance'
  },
  {
    question: 'Can we integrate with our existing payroll and accounting systems?',
    answer: 'Yes. MployUS provides native integrations and direct export templates for major UK payroll systems including Sage, Xero, BrightPay, and Access Payroll, eliminating manual timesheet entry.',
    category: 'technical'
  },
  {
    question: 'What training and ongoing support do you offer?',
    answer: 'Every plan includes complete access to MployUS Academy video guides, documentation, and email support. Professional and Enterprise plans include 24/7 UK phone support and a dedicated Customer Success Manager.',
    category: 'general'
  },
  {
    question: 'Is our sensitive healthcare data secure and GDPR compliant?',
    answer: 'Absolutely. MployUS utilizes bank-grade 256-bit encryption in transit and at rest, is ISO 27001 certified, Cyber Essentials Plus accredited, and fully compliant with UK GDPR laws. Data is hosted in tier-4 UK data centers.',
    category: 'compliance'
  },
  {
    question: 'Can locum workers download and use the app for free?',
    answer: 'Yes! Locum and agency healthcare workers can download the MployUS mobile app on iOS and Android, build their profile, store compliance documents, and book shifts completely free of charge.',
    category: 'pricing'
  },
  {
    question: 'What happens to our data if we decide to cancel?',
    answer: 'You own 100% of your data at all times. If you choose to cancel, you can export all service user records, care plans, and staff profiles in standard CSV and PDF formats with 30 days notice.',
    category: 'pricing'
  }
];

export const CLIENT_LOGOS = [
  { name: 'Sunrise Care Group', logoText: 'SUNRISE CARE' },
  { name: 'HealthStaff Recruitment', logoText: 'HEALTHSTAFF' },
  { name: 'Meadowview Healthcare', logoText: 'MEADOWVIEW' },
  { name: 'Apex Clinical Services', logoText: 'APEX CLINICAL' },
  { name: 'Beacon Care Homes', logoText: 'BEACON CARE' },
  { name: 'St. Jude Healthcare Trust', logoText: 'ST. JUDE TRUST' }
];
