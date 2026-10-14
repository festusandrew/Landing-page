import { useState } from "react"
import { ArrowLeft, ArrowUpRight, Check, HeartHandshake, Users, Plus } from "lucide-react"
import { PLATFORM_PRICING } from "../../data/platformPricing"

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
  const [platform, setPlatform] = useState<"care" | "hire">("care")
  const current = PLATFORM_PRICING[platform]
  const pounds = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 })
  return (
    <div className="font-['DM_Sans',sans-serif] text-[var(--homepage-ink)]">
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
      <section id="pricing" aria-labelledby="pricing-heading" className="border-y border-black/5 bg-slate-50 px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--homepage-accent)]">Simple plans. Room to grow.</p>
            <h1 id="pricing-heading" className="mt-5 font-['Libre_Caslon_Display:Regular',serif] text-5xl leading-tight tracking-tight md:text-6xl">The right fit for your team.<br />At every stage.</h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-500">Choose your platform, then find the capacity you need. All prices are in pounds sterling (GBP), billed annually.</p>
          </div>

          <div role="group" aria-label="Choose a pricing platform" className="mx-auto mt-10 flex w-fit max-w-full flex-wrap justify-center gap-1 rounded-full border border-black/5 bg-white p-1.5">
            {(["care", "hire"] as const).map(key => {
              const Icon = key === "care" ? HeartHandshake : Users
              return <button key={key} type="button" aria-pressed={platform === key} aria-controls="platform-plans" onClick={() => setPlatform(key)} className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-offset-2 ${platform === key ? "bg-[var(--homepage-accent)] text-white" : "text-slate-600 hover:bg-slate-50"}`}><Icon size={16} />{PLATFORM_PRICING[key].label}</button>
            })}
          </div>

          <div id="platform-plans" className="mt-10" aria-live="polite" aria-atomic="true">
            <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
              <div><h2 className="text-xl font-semibold">{current.label}</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{current.description}</p></div>
              <p className="rounded-full bg-white px-4 py-2 text-xs font-medium text-slate-600">GBP · Annual billing</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {current.plans.map((plan, index) => (
                <article key={plan.name} className={`flex flex-col rounded-2xl border border-black/5 p-6 ${index === 1 ? "bg-[var(--homepage-tint)]" : "bg-white"}`}>
                  <p className="mb-5 text-xs font-medium text-slate-500">{["Start with the essentials", "For growing teams", "For larger operations", "Built around your needs"][index]}</p>
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  <p className="mt-2 text-sm text-slate-500">{plan.staff}</p>
                  <div className="mt-7">
                    <p className="flex items-baseline gap-1"><span className="text-4xl font-semibold tracking-tight">{plan.price === null ? "Let’s talk" : pounds.format(plan.price)}</span>{plan.price !== null && <span className="text-sm text-slate-500">/ month</span>}</p>
                    <p className="mt-2 text-xs leading-5 text-slate-500">{plan.price === null ? "A quote tailored to your organisation" : `${pounds.format(plan.price * 12)} billed annually`}</p>
                  </div>
                  <button type="button" onClick={onBookDemo} className={`mt-6 flex items-center justify-center gap-2 rounded-lg border border-black/5 px-4 py-3 text-sm font-semibold transition-colors ${index === 1 ? "bg-[var(--homepage-accent)] text-white hover:bg-[var(--homepage-accent-hover)]" : "bg-white hover:bg-slate-50"}`}>{plan.price === null ? "Get a custom quote" : "Book a demo"}<ArrowUpRight size={16} /></button>
                  <div className="mt-6 border-t border-black/5 pt-5">
                    <p className="min-h-10 text-sm font-semibold">{plan.capacity}</p>
                    <ul className="mt-5 space-y-4">
                      {plan.features.map((feature, featureIndex) => <li key={feature} className={`flex items-start gap-2 text-sm leading-6 ${featureIndex === 0 && index > 0 && index < 3 ? "font-semibold" : "text-slate-600"}`}><Check size={16} className="mt-1 shrink-0 text-[var(--homepage-accent)]" /><span>{feature}</span></li>)}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {platform === "care" && <aside className="mt-6 flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-black/5 bg-white p-6">
            <div className="flex items-start gap-3"><Plus size={20} className="mt-1 shrink-0" /><div><h3 className="text-sm font-semibold">More people to care for? Add capacity, not a new staff tier.</h3><p className="mt-2 text-sm leading-6 text-slate-500">Additional service-user bundles expand your care load within your existing staff tier.</p></div></div>
            <button type="button" onClick={onBookDemo} className="inline-flex items-center gap-2 text-sm font-semibold hover:underline">Ask for a GBP quote<ArrowUpRight size={16} /></button>
          </aside>}
          <p className="mt-6 text-center text-xs leading-6 text-slate-500">Monthly equivalents shown for annual billing. Confirm applicable taxes, feature availability and final terms with our team before purchasing.</p>
          <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-black/5 pt-8">
            <div><h2 className="text-xl font-semibold">Not sure which plan fits?</h2><p className="mt-2 text-sm text-slate-500">Tell us about your team. We’ll help you choose, without the guesswork.</p></div>
            <div className="flex flex-wrap gap-3"><button type="button" onClick={onBookDemo} className="inline-flex items-center gap-2 rounded-lg bg-[var(--homepage-accent)] px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--homepage-accent-hover)]">Talk to our team<ArrowUpRight size={16} /></button><button type="button" onClick={onStartTrial} className="rounded-lg border border-black/5 bg-white px-5 py-3 text-sm font-semibold hover:bg-slate-100">Explore a free trial</button></div>
          </div>
        </div>
      </section>
    </div>
  )
}
