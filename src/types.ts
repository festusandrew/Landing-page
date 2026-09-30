export type UserRole = 'care_manager' | 'agency' | 'locum' | 'all';

export interface ProductModule {
  id: string;
  title: string;
  tagline: string;
  iconName: string;
  badge: string;
  color: string;
  features: string[];
  useCase: string;
  ctaText: string;
  metrics: string;
  uiPreviewType: 'recruitment' | 'care' | 'staffing' | 'facility';
  link: string;
}

export interface WorkflowStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  highlights: string[];
  mockupDetails: {
    status: string;
    metrics: string;
    actionLabel: string;
    activeModule: string;
  };
}

export interface MetricOutcome {
  id: string;
  title: string;
  stat: string;
  benchmark: string;
  description: string;
  iconName: string;
  color: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  organization: string;
  avatarUrl: string;
  rating: number;
  moduleBadge: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'compliance' | 'pricing' | 'technical';
}

export interface PricingPlan {
  id: string;
  name: string;
  target: string;
  monthlyPrice: number;
  annualMonthlyPrice: number;
  popular?: boolean;
  features: string[];
  cta: string;
}

export interface FeatureCategory {
  title: string;
  iconName: string;
  items: {
    name: string;
    description: string;
  }[];
}
