import { StudioPortfolio } from './StudioPortfolio';

interface ProductDesignPageProps {
  onBackToHome: () => void;
  onBookDemo: (moduleTitle?: string) => void;
}

export function ProductDesignPage(props: ProductDesignPageProps) {
  return <StudioPortfolio discipline="design" {...props} />;
}
