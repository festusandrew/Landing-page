import backArrow from "../imports/product-reference/18b79.svg"

interface ProductPageNavigationProps {
  product: string
  sections: Array<{
    label: string
    id: string
  }>
  onSelect: (id: string) => void
  onBackToHome: () => void
}

export function ProductPageNavigation({
  product,
  sections,
  onSelect,
  onBackToHome,
}: ProductPageNavigationProps) {
  return (
    <div className="product-section-navigation border-b border-black/5 bg-[#f5f6f8]">
      <div className="site-container flex flex-wrap items-center justify-between gap-4 py-5 text-caption">
        <button
          type="button"
          onClick={onBackToHome}
          className="inline-flex shrink-0 items-center gap-2 text-[#4b5750] transition-colors hover:text-[#52658e]"
        >
          <img src={backArrow} alt="" className="shrink-0" /> Back to homepage
        </button>
        <nav
          aria-label={`${product} page sections`}
          className="order-3 flex w-full flex-wrap gap-x-5 gap-y-3 text-[#4b5750] sm:order-none sm:w-auto"
        >
          {sections.map(({ label, id }) => (
            <button
              key={id}
              type="button"
              onClick={() => onSelect(id)}
              className="transition-colors hover:text-[#52658e]"
            >
              {label}
            </button>
          ))}
        </nav>
        <span className="text-[#67716b]">{product}</span>
      </div>
    </div>
  )
}
