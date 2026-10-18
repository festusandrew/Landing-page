import React, { useState } from "react"
import { PRICING_PLANS } from "../data/mockData"
import starterIcon from "../imports/pricing-reference/8cf1a.svg"
import professionalIcon from "../imports/pricing-reference/25964.svg"
import enterpriseIcon from "../imports/pricing-reference/7cf9f.svg"
import starterArrow from "../imports/pricing-reference/90994.svg"
import professionalArrow from "../imports/pricing-reference/fea2a.svg"
import enterpriseArrow from "../imports/pricing-reference/5ee8e.svg"
import starterCheck1 from "../imports/pricing-reference/1b689.svg"
import starterCheck2 from "../imports/pricing-reference/008fa.svg"
import starterCheck3 from "../imports/pricing-reference/e7a5b.svg"
import starterCheck4 from "../imports/pricing-reference/378a7.svg"
import starterCheck5 from "../imports/pricing-reference/e4ca5.svg"
import professionalCheck1 from "../imports/pricing-reference/52667.svg"
import professionalCheck2 from "../imports/pricing-reference/1b769.svg"
import professionalCheck3 from "../imports/pricing-reference/79cda.svg"
import professionalCheck4 from "../imports/pricing-reference/6a0c6.svg"
import professionalCheck5 from "../imports/pricing-reference/11aa7.svg"
import enterpriseCheck1 from "../imports/pricing-reference/36049.svg"
import enterpriseCheck2 from "../imports/pricing-reference/92f4d.svg"
import enterpriseCheck3 from "../imports/pricing-reference/62aae.svg"
import enterpriseCheck4 from "../imports/pricing-reference/f7888.svg"
import enterpriseCheck5 from "../imports/pricing-reference/c6a99.svg"

interface PricingProps {
  onBookDemo: () => void
  onStartTrial: () => void
  standalone?: boolean
}
const euro = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
})
const visuals = [
  {
    icon: starterIcon,
    arrow: starterArrow,
    users: "50 active staff / employees",
    checks: [
      starterCheck1,
      starterCheck2,
      starterCheck3,
      starterCheck4,
      starterCheck5,
    ],
  },
  {
    icon: professionalIcon,
    arrow: professionalArrow,
    users: "200 active staff / employees",
    checks: [
      professionalCheck1,
      professionalCheck2,
      professionalCheck3,
      professionalCheck4,
      professionalCheck5,
    ],
  },
  {
    icon: enterpriseIcon,
    arrow: enterpriseArrow,
    users: "Unlimited staff & service users",
    checks: [
      enterpriseCheck1,
      enterpriseCheck2,
      enterpriseCheck3,
      enterpriseCheck4,
      enterpriseCheck5,
    ],
  },
]
const greenIcon =
  "shrink-0 [filter:brightness(0)_saturate(100%)_invert(47%)_sepia(16%)_saturate(1415%)_hue-rotate(99deg)_brightness(95%)_contrast(86%)]"

export const Pricing: React.FC<PricingProps> = ({
  onBookDemo,
  onStartTrial,
  standalone = false,
}) => {
  const [isAnnual, setIsAnnual] = useState(false)
  const Heading = standalone ? "h1" : "h2"
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="scroll-mt-6 border-y border-black/5 bg-[#f8fafc] py-16 text-[#0f172a] md:py-20"
    >
      <div className="mx-auto max-w-[1622.535px] px-6 md:px-[43.268px]">
        <div className="mx-auto max-w-[892.394px] text-center">
          <p className="font-['Inter:Semi_Bold',Inter,sans-serif] text-[14.873px] font-semibold uppercase leading-[22.31px] tracking-[2.3797px] text-[#368B62]">
            Room to grow
          </p>
          <Heading
            id="pricing-heading"
            className="mt-[21.634px] font-['Inter:Semi_Bold',Inter,sans-serif] text-[36px] font-semibold leading-[1.2] tracking-[-1.0817px] md:text-[54.085px] md:leading-[64.901px]"
          >
            A plan for where you are. And where you’re going.
          </Heading>
          <p className="mt-[21.634px] font-['Inter:Regular',Inter,sans-serif] text-[18px] font-normal leading-8 text-[#64748b] md:text-[20.282px] md:leading-[37.859px]">
            Start with the essentials. Expand your capabilities as your business
            grows. Prices are shown in euros.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-[16.225px] md:mt-[64.901px]">
          <div
            role="group"
            aria-label="Billing period"
            className="flex rounded-[10.817px] border border-black/5 bg-white p-[5.408px]"
          >
            {[
              { label: "Monthly", annual: false },
              { label: "Annually", annual: true },
            ].map((period) => (
              <button
                type="button"
                key={period.label}
                aria-pressed={isAnnual === period.annual}
                onClick={() => setIsAnnual(period.annual)}
                className={
                  "rounded-[8.113px] px-[21.634px] py-[10.817px] font-['Inter:Medium',Inter,sans-serif] text-[16.225px] font-medium leading-[21.634px] transition-colors " +
                  (isAnnual === period.annual
                    ? "bg-[#368B62] text-white"
                    : "text-[#62748e] hover:bg-[#edf5ef]")
                }
              >
                {period.label}
              </button>
            ))}
          </div>
          <span className="rounded-full bg-[#edf5ef] px-3 py-2 font-['Inter:Medium',Inter,sans-serif] text-[13.521px] font-medium leading-[20.282px] text-[#368B62]">
            Save with annual billing
          </span>
        </div>
        <div className="mt-[48.676px] grid gap-[27.042px] lg:grid-cols-3">
          {PRICING_PLANS.map((plan, index) => {
            const price = isAnnual ? plan.annualMonthlyPrice : plan.monthlyPrice
            const visual = visuals[index]
            const features =
              plan.id === "enterprise"
                ? [...plan.features.slice(0, 4), plan.features[5]]
                : plan.features.slice(0, 5)
            return (
              <article
                key={plan.id}
                aria-labelledby={"pricing-" + plan.id}
                className={
                  "relative flex flex-col rounded-[16.225px] border border-black/5 p-6 transition-colors md:p-[37.859px] " +
                  (plan.popular ? "bg-[#edf5ef]" : "bg-white")
                }
              >
                {plan.popular && (
                  <p className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#368B62] px-4 py-1.5 font-['Inter:Semi_Bold',Inter,sans-serif] text-[13.521px] font-semibold leading-[20.282px] text-white">
                    For growing teams
                  </p>
                )}
                <div className="flex items-center justify-between gap-3">
                  <h3
                    id={"pricing-" + plan.id}
                    className="font-['Inter:Semi_Bold',Inter,sans-serif] text-[24.338px] font-semibold leading-[37.859px]"
                  >
                    {plan.name}
                  </h3>
                  <span className="rounded-[10.817px] bg-[#edf5ef] p-[10.817px]">
                    <img src={visual.icon} alt="" className={greenIcon} />
                  </span>
                </div>
                <p className="mt-[10.817px] min-h-[44px] font-['Inter:Regular',Inter,sans-serif] text-[16.225px] leading-[21.634px] text-[#62748e]">
                  {plan.target}
                </p>
                <div aria-live="polite" aria-atomic="true" className="mt-6">
                  <p className="flex flex-wrap items-baseline gap-1">
                    <span className="font-['Inter:Semi_Bold',Inter,sans-serif] text-[43.268px] font-semibold leading-[64.901px] tracking-[-1.3521px]">
                      {euro.format(price)}
                    </span>
                    <span className="font-['Inter:Regular',Inter,sans-serif] text-[16.225px] leading-[21.634px] text-[#62748e]">
                      /month
                    </span>
                  </p>
                  <p className="min-h-[42px] font-['Inter:Regular',Inter,sans-serif] text-[13.521px] leading-[20.282px] text-[#62748e]">
                    {isAnnual
                      ? euro.format(price * 12) + " billed annually in euros."
                      : "Billed monthly in euros."}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={plan.id === "starter" ? onStartTrial : onBookDemo}
                  className={
                    "mt-4 flex w-full items-center justify-center gap-[10.817px] rounded-[10.817px] border border-black/5 px-4 py-[13.521px] font-['Inter:Semi_Bold',Inter,sans-serif] text-[16.225px] font-semibold leading-[21.634px] transition-colors " +
                    (plan.popular
                      ? "bg-[#368B62] text-white hover:bg-[#286d4c]"
                      : "bg-white text-[#0f172a] hover:bg-[#edf5ef]")
                  }
                >
                  {plan.id === "starter"
                    ? "Start free trial"
                    : plan.id === "enterprise"
                      ? "Talk to our team"
                      : "Book a demo"}
                  <img src={visual.arrow} alt="" className="shrink-0" />
                </button>
                <div className="mt-[32.451px] border-t border-black/5 pt-[27.042px]">
                  <p className="font-['Inter:Semi_Bold',Inter,sans-serif] text-[13.521px] font-semibold uppercase leading-[20.282px] tracking-[0.6761px] text-[#90a1b9]">
                    {visual.users}
                  </p>
                  <ul className="mt-[21.634px] space-y-[18.93px]">
                    {features.map((feature, featureIndex) => (
                      <li
                        key={feature}
                        className="flex items-start gap-[13.521px]"
                      >
                        <img
                          src={visual.checks[featureIndex]}
                          alt=""
                          className={"mt-[5.408px] " + greenIcon}
                        />
                        <span className="font-['Inter:Regular',Inter,sans-serif] text-[18.93px] font-normal leading-[32.451px] text-[#475569]">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            )
          })}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center font-['Inter:Regular',Inter,sans-serif] text-[13.521px] leading-6 text-[#62748e]">
          Demo plan configuration only. Confirm final euro pricing, applicable
          taxes and available features with our team before purchasing.
        </p>
      </div>
    </section>
  )
}
