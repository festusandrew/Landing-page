export interface PlatformPlan {
  name: string
  staff: string
  capacity: string
  price: number | null
  features: string[]
}

export const PLATFORM_PRICING: Record<"care" | "hire", {
  label: string
  description: string
  plans: PlatformPlan[]
}> = {
  care: {
    label: "Care Management",
    description: "Plan around your active staff and the people you care for. Clear capacity limits, with room to grow.",
    plans: [
      {
        name: "Care Starter", staff: "Up to 25 staff", capacity: "Up to 30 active service users", price: 129,
        features: ["Digital care plans & assessments", "Real-time rota & electronic call monitoring (ECM)", "Mobile GPS clock-in / clock-out", "eMAR & medication log tracking", "Family & next-of-kin access portal"],
      },
      {
        name: "Care Growth", staff: "26–75 staff", capacity: "Up to 100 active service users", price: 259,
        features: ["Everything in Starter, plus:", "Automated rota optimisation & shift swap approvals", "Incident & safeguarding reporting workflows", "Invoicing & payroll file exports (Xero / Sage)", "CQC / HIQA compliance & audit reports"],
      },
      {
        name: "Care Scale", staff: "76–200 staff", capacity: "Up to 250 active service users", price: 479,
        features: ["Everything in Growth, plus:", "Multi-location & multi-branch management", "Live capacity & bed / slot availability dashboards", "Advanced analytics & custom KPI reporting", "Dedicated customer success manager"],
      },
      {
        name: "Enterprise Care", staff: "200+ staff", capacity: "Unlimited service users", price: null,
        features: ["Custom API integrations", "Dedicated cloud tenant", "99.9% uptime SLA", "Custom onboarding"],
      },
    ],
  },
  hire: {
    label: "Recruitment & ATS",
    description: "Bring job posting, candidate tracking and onboarding together. Choose the access your hiring team needs.",
    plans: [
      {
        name: "Hire Starter", staff: "Up to 25 staff", capacity: "2 admin · 3 hiring manager seats", price: 139,
        features: ["1-click multi-posting (Indeed, LinkedIn, Glassdoor)", "Centralised candidate inbox & CV parser", "Custom hiring pipelines & stage tracking", "Automated email & interview scheduling"],
      },
      {
        name: "Hire Growth", staff: "26–75 staff", capacity: "5 admin · 10 hiring manager seats", price: 229,
        features: ["Everything in Starter, plus:", "Role-based access (admin / recruiter / viewer)", "Background & reference check workflows", "Branded careers page & application forms", "Candidate scorecards & evaluation metrics"],
      },
      {
        name: "Hire Scale", staff: "76–200 staff", capacity: "12 admin seats · unlimited viewers", price: 389,
        features: ["Everything in Growth, plus:", "Talent pool re-engagement & candidate tagging", "Advanced hiring analytics (time / cost to hire)", "Premium job board syndication"],
      },
      {
        name: "Enterprise Hire", staff: "200+ staff", capacity: "Custom access levels", price: null,
        features: ["Custom workflows", "Single sign-on (SSO)", "Dedicated database", "Custom ATS integrations"],
      },
    ],
  },
}
