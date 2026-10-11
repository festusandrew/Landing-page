import { ArrowLeft } from "lucide-react"
import { Pricing } from "../Pricing"

interface PricingPageProps {
  onBackToHome: () => void
  onBookDemo: () => void
  onStartTrial: () => void
}

export function PricingPage({
  onBackToHome,
  onBookDemo,
  onStartTrial,
}: PricingPageProps) {
  return (
    <div>
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-6 py-6 lg:px-8">
        <button
          type="button"
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-sm text-[#233b35] transition-colors hover:text-[#368B62]"
        >
          <ArrowLeft size={16} /> Back to homepage
        </button>
        <span className="text-xs text-[#68736e]">Plans &amp; pricing</span>
      </div>
      <Pricing standalone onBookDemo={onBookDemo} onStartTrial={onStartTrial} />
    </div>
  )
}
