import { useState } from "react"
import { ArrowLeft, ArrowUpRight, Check, HeartHandshake, Users, Plus } from "lucide-react"
import { PLATFORM_PRICING } from "../../data/platformPricing"
import starterIcon from "../../imports/pricing-reference/8cf1a.svg"
import growthIcon from "../../imports/pricing-reference/25964.svg"
import scaleIcon from "../../imports/pricing-reference/7cf9f.svg"

const planIcons = [starterIcon, growthIcon, scaleIcon, scaleIcon]
const pricingIcon = "shrink-0 [filter:brightness(0)_saturate(100%)_invert(47%)_sepia(16%)_saturate(1415%)_hue-rotate(99deg)_brightness(95%)_contrast(86%)]"

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
    <div className="font-['Inter',sans-serif] text-[var(--homepage-ink)]">
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
      <section id="pricing" aria-labelledby="pricing-heading" className="scroll-mt-6 border-y border-black/5 bg-slate-50 py-16 text-slate-900 md:py-20">
        <div className="mx-auto max-w-[1622.535px] px-6 md:px-[43.268px]">
          <div className="mx-auto max-w-[892.394px] text-center">
            <p className="text-[14.873px] font-semibold uppercase leading-[22.31px] tracking-[2.3797px] text-[var(--homepage-accent)]">Room to grow</p>
            <h1 id="pricing-heading" className="mt-[21.634px] text-[36px] font-semibold leading-[1.2] tracking-[-1.0817px] md:text-[54.085px] md:leading-[64.901px]">A plan for where you are. And where you’re going.</h1>
            <p className="mt-[21.634px] text-[18px] leading-8 text-slate-500 md:text-[20.282px] md:leading-[37.859px]">Start with the essentials. Expand your capabilities as your business grows. All prices are in pounds sterling (GBP), billed annually.</p>
          </div>

          <div role="group" aria-label="Choose a pricing platform" className="mx-auto mt-10 flex w-fit max-w-full flex-wrap justify-center gap-1 rounded-[10.817px] border border-black/5 bg-white p-[5.408px] md:mt-[64.901px]">
            {(["care", "hire"] as const).map(key => {
              const Icon = key === "care" ? HeartHandshake : Users
              return <button key={key} type="button" aria-pressed={platform === key} aria-controls="platform-plans" onClick={() => setPlatform(key)} className={`inline-flex items-center justify-center gap-2 rounded-[8.113px] px-[21.634px] py-[10.817px] text-[16.225px] font-medium leading-[21.634px] transition-colors focus-visible:outline focus-visible:outline-offset-2 ${platform === key ? "bg-[var(--homepage-accent)] text-white" : "text-slate-600 hover:bg-slate-50"}`}><Icon size={16} />{PLATFORM_PRICING[key].label}</button>
            })}
          </div>

          <div id="platform-plans" className="mt-10" aria-live="polite" aria-atomic="true">
            <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
              <div><h2 className="text-xl font-semibold">{current.label}</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{current.description}</p></div>
              <p className="rounded-full bg-white px-4 py-2 text-xs font-medium text-slate-600">GBP · Annual billing</p>
            </div>
            <div className="mt-[48.676px] grid gap-[27.042px] md:grid-cols-2 xl:grid-cols-4">
              {current.plans.map((plan, index) => (
                <article key={plan.name} className={`relative flex flex-col rounded-[16.225px] border border-black/5 p-6 transition-colors md:p-[37.859px] ${index === 1 ? "bg-[var(--homepage-tint)]" : "bg-white"}`}>
                  {index === 1 && <p className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[var(--homepage-accent)] px-4 py-1.5 text-[13.521px] font-semibold leading-[20.282px] text-white">For growing teams</p>}
                  <div className="flex items-center justify-between gap-3"><h3 className="text-[24.338px] font-semibold leading-[37.859px]">{plan.name}</h3><span className="rounded-[10.817px] bg-[var(--homepage-tint)] p-[10.817px]"><img src={planIcons[index]} alt="" className={pricingIcon} /></span></div>
                  <p className="mt-[10.817px] min-h-[44px] text-[16.225px] leading-[21.634px] text-slate-500">{plan.staff}</p>
                  <div className="mt-6">
                    <p className="flex flex-wrap items-baseline gap-1"><span className="text-[43.268px] font-semibold leading-[64.901px] tracking-[-1.3521px]">{plan.price === null ? "Custom" : pounds.format(plan.price)}</span>{plan.price !== null && <span className="text-[16.225px] leading-[21.634px] text-slate-500">/month</span>}</p>
                    <p className="min-h-[42px] text-[13.521px] leading-[20.282px] text-slate-500">{plan.price === null ? "A quote tailored to your organisation" : `${pounds.format(plan.price * 12)} billed annually`}</p>
                  </div>
                  <button type="button" onClick={index === 0 ? onStartTrial : onBookDemo} className={`mt-4 flex w-full items-center justify-center gap-[10.817px] rounded-[10.817px] border border-black/5 px-4 py-[13.521px] text-[16.225px] font-semibold leading-[21.634px] transition-colors ${index === 1 ? "bg-[var(--homepage-accent)] text-white hover:bg-[var(--homepage-accent-hover)]" : "bg-white hover:bg-slate-50"}`}>{index === 0 ? "Start free trial" : plan.price === null ? "Talk to our team" : "Book a demo"}<ArrowUpRight size={16} /></button>
                  <div className="mt-[32.451px] border-t border-black/5 pt-[27.042px]">
                    <p className="min-h-10 text-[13.521px] font-semibold uppercase leading-[20.282px] tracking-[0.6761px] text-slate-400">{plan.capacity}</p>
                    <ul className="mt-[21.634px] space-y-[18.93px]">
                      {plan.features.map((feature, featureIndex) => <li key={feature} className={`flex items-start gap-[13.521px] text-[18.93px] leading-[32.451px] ${featureIndex === 0 && index > 0 && index < 3 ? "font-semibold" : "text-slate-600"}`}><Check size={21} className="mt-[5.408px] shrink-0 text-[var(--homepage-accent)]" /><span>{feature}</span></li>)}
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
