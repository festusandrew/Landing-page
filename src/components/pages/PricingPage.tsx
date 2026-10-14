import { useState } from "react"
import { PLATFORM_PRICING } from "../../data/platformPricing"
import starterIcon from "../../imports/pricing-design/a2dd0.svg"
import growthIcon from "../../imports/pricing-design/b122f.svg"
import scaleIcon from "../../imports/pricing-design/f546f.svg"
import backIcon from "../../imports/pricing-design/e2e5d.svg"
import arrow from "../../imports/pricing-design/9ca7a.svg"
import lightArrow from "../../imports/pricing-design/0701f.svg"
import scaleArrow from "../../imports/pricing-design/96b6f.svg"
import starterCheck1 from "../../imports/pricing-design/2d1a4.svg"
import starterCheck2 from "../../imports/pricing-design/aaf41.svg"
import starterCheck3 from "../../imports/pricing-design/58749.svg"
import starterCheck4 from "../../imports/pricing-design/89974.svg"
import starterCheck5 from "../../imports/pricing-design/862dc.svg"
import growthCheck1 from "../../imports/pricing-design/c02f3.svg"
import growthCheck2 from "../../imports/pricing-design/47744.svg"
import growthCheck3 from "../../imports/pricing-design/410ab.svg"
import growthCheck4 from "../../imports/pricing-design/4134c.svg"
import growthCheck5 from "../../imports/pricing-design/13187.svg"
import scaleCheck1 from "../../imports/pricing-design/b6239.svg"
import scaleCheck2 from "../../imports/pricing-design/63874.svg"
import scaleCheck3 from "../../imports/pricing-design/8e76e.svg"
import scaleCheck4 from "../../imports/pricing-design/bc480.svg"
import scaleCheck5 from "../../imports/pricing-design/a8129.svg"
import "./pricing-page.css"

const visuals = [
  { icon: starterIcon, arrow, checks: [starterCheck1, starterCheck2, starterCheck3, starterCheck4, starterCheck5] },
  { icon: growthIcon, arrow: lightArrow, checks: [growthCheck1, growthCheck2, growthCheck3, growthCheck4, growthCheck5] },
  { icon: scaleIcon, arrow: scaleArrow, checks: [scaleCheck1, scaleCheck2, scaleCheck3, scaleCheck4, scaleCheck5] },
]
const pounds = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 })

interface PricingPageProps {
  onBackToHome: () => void
  onBookDemo: () => void
  onStartTrial: () => void
}

export function PricingPage({ onBackToHome, onBookDemo, onStartTrial }: PricingPageProps) {
  const [platform, setPlatform] = useState<"care" | "hire">("care")
  const current = PLATFORM_PRICING[platform]
  const enterprise = current.plans[3]

  return (
    <div className="pricing-reference">
      <div className="pricing-reference-back">
        <button type="button" onClick={onBackToHome}><img src={backIcon} alt="" />Back to homepage</button>
        <span>Plans &amp; pricing</span>
      </div>
      <section id="pricing" aria-labelledby="pricing-heading" className="pricing-reference-section">
        <div className="pricing-reference-inner">
          <header className="pricing-reference-heading">
            <p className="pricing-reference-kicker">Room to grow</p>
            <h1 id="pricing-heading">A plan for where you are. And where you’re going.</h1>
            <p className="pricing-reference-intro">Start with the essentials. Expand your capabilities as your business grows. All prices are in pounds sterling, billed annually.</p>
          </header>
          <div className="pricing-reference-controls">
            <div className="pricing-reference-switch" role="group" aria-label="Choose a pricing platform">
              {(["care", "hire"] as const).map(key => <button key={key} type="button" aria-pressed={platform === key} aria-controls="platform-plans" onClick={() => setPlatform(key)}>{PLATFORM_PRICING[key].label}</button>)}
            </div>
            <span className="pricing-reference-billing">GBP · Annual billing</span>
          </div>
          <p className="pricing-reference-platform">{current.description}</p>
          <div id="platform-plans" aria-live="polite" aria-atomic="true">
            <div className="pricing-reference-grid">
              {current.plans.slice(0, 3).map((plan, index) => (
                <article key={plan.name} className={`pricing-reference-card ${index === 1 ? "is-growth" : ""}`} aria-labelledby={`plan-${index}`}>
                  {index === 1 && <p className="pricing-reference-badge">For growing teams</p>}
                  <div className="pricing-reference-card-header">
                    <h3 id={`plan-${index}`}>{plan.name}</h3>
                    <span className="pricing-reference-icon"><img src={visuals[index].icon} alt="" /></span>
                  </div>
                  <p className="pricing-reference-staff">{plan.staff}</p>
                  <p className="pricing-reference-price"><strong>{pounds.format(plan.price!)}</strong><span>/month</span></p>
                  <p className="pricing-reference-total">{pounds.format(plan.price! * 12)} billed annually in GBP.</p>
                  <button type="button" className="pricing-reference-cta" onClick={index === 0 ? onStartTrial : onBookDemo}>{index === 0 ? "Start free trial" : "Book a demo"}<img src={visuals[index].arrow} alt="" /></button>
                  <div className="pricing-reference-features">
                    <p className="pricing-reference-capacity">{plan.capacity}</p>
                    <ul>{plan.features.map((feature, featureIndex) => <li key={feature}><img src={visuals[index].checks[featureIndex]} alt="" /><span>{feature}</span></li>)}</ul>
                  </div>
                </article>
              ))}
            </div>
            <article className="pricing-reference-enterprise">
              <div><h3>{enterprise.name}</h3><p>{enterprise.staff} · {enterprise.capacity}</p><p>Custom pricing for your organisation.</p></div>
              <ul>{enterprise.features.map((feature, index) => <li key={feature}><img src={visuals[2].checks[index]} alt="" />{feature}</li>)}</ul>
              <button type="button" className="pricing-reference-cta" onClick={onBookDemo}>Talk to our team<img src={scaleArrow} alt="" /></button>
            </article>
          </div>
          {platform === "care" && <p className="pricing-reference-addon">Need more active service users within your staff tier? Additional bundles are available. <button type="button" onClick={onBookDemo}>Ask for a GBP quote.</button></p>}
          <p className="pricing-reference-note">Monthly equivalents shown for annual billing. Confirm final GBP pricing, applicable taxes and available features with our team before purchasing.</p>
        </div>
      </section>
    </div>
  )
}
