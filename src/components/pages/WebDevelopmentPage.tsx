import { StudioPortfolio } from './StudioPortfolio';

interface WebDevelopmentPageProps {
  onBackToHome: () => void;
  onBookDemo: (moduleTitle?: string) => void;
}

export function WebDevelopmentPage(props: WebDevelopmentPageProps) {
  return <StudioPortfolio discipline="development" {...props} />;
}
