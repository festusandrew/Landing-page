import React, { useRef, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import {
  Activity,
  ArrowRight,
  Check,
  ClipboardList,
  HeartPulse,
  Menu,
  Pill,
  ShieldCheck,
  X,
} from "lucide-react"
import { Footer } from "../Footer"
import { ProductPageNavigation } from "../ProductPageNavigation"
import { BrandLogo } from "../BrandLogo"
import careDashboard from "../../imports/Screenshot_2026-07-24_140316.png"
import "./product-reference.css"
import { PRODUCT_VISUALS } from "../../data/productVisuals"

const referenceAssets = PRODUCT_VISUALS.care

interface CareManagementPageProps {
  onBackToHome: () => void
  onBookDemo: (moduleTitle?: string) => void
  onStartTrial: () => void
  onNavigate: (view: string) => void
  showHeader?: boolean
}

const features = [
  {
    icon: Pill,
    title: "Medication, made clearer.",
    description:
      "Electronic medication administration records, dosage reminders and a timestamped audit trail. Keep the information your team needs close at hand.",
    label: "eMAR & medication",
  },
  {
    icon: ClipboardList,
    title: "Care that sees the person.",
    description:
      "Person-centred digital care plans, review reminders and a shared history of changes. Support continuity from one shift to the next.",
    label: "Digital care plans",
  },
  {
    icon: Activity,
    title: "The everyday, connected.",
    description:
      "Bring vital signs, daily observations and wellbeing trends into view. Give your team a clearer picture of each person’s day.",
    label: "Vitals & daily logs",
  },
  {
    icon: ShieldCheck,
    title: "Records you can rely on.",
    description:
      "Organised records, compliance alerts and audit exports. Support your inspection preparation without the last-minute paperwork scramble.",
    label: "Audit & reporting",
  },
]
const tabs = ["eMAR", "Care Plans", "Vitals & Logs"] as const
type CareTab = (typeof tabs)[number]

export const CareManagementPage: React.FC<CareManagementPageProps> = ({
  onBackToHome,
  onBookDemo,
  onStartTrial,
  onNavigate,
  showHeader = true,
}) => {
  const [activeTab, setActiveTab] = useState<CareTab>("eMAR")
  const [mobileOpen, setMobileOpen] = useState(false)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const reducedMotion = useReducedMotion()
  const bookDemo = () => onBookDemo("care-management")
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" })
    setMobileOpen(false)
  }
  const primaryButton =
    "group inline-flex items-center justify-center gap-3 rounded-full bg-[#1d4ed8] px-6 py-3.5 text-control font-semibold text-white transition-colors hover:bg-[#1e40af]"
  const secondaryButton =
    "inline-flex items-center justify-center gap-3 rounded-full border border-black/5 bg-white px-6 py-3.5 text-control font-semibold text-[#24332d] transition-colors hover:bg-[#edf0f4]"
  const reveal = {
    initial: reducedMotion ? (false as const) : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  }
  return (
    <div className="product-reference product-reference-care min-h-screen overflow-x-clip bg-white font-sans text-[#24332d] [&_button]:cursor-pointer motion-reduce:[&_*]:transition-none">
      {showHeader ? (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur-sm">
          <div className="site-container flex h-[70px] items-center justify-between gap-6">
            <button
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: reducedMotion ? "auto" : "smooth",
                })
              }
              aria-label="MployUs care management home"
              className="text-brand"
            >
              <BrandLogo />
            </button>
            <nav
              aria-label="Care management navigation"
              className="hidden items-center gap-7 text-control text-[#4b5750] lg:flex"
            >
              <button onClick={() => scrollTo("care-overview")} className="hover:text-[#1d4ed8]">
                Overview
              </button>
              <button onClick={() => scrollTo("care-features")} className="hover:text-[#1d4ed8]">
                Features
              </button>
              <button onClick={() => scrollTo("care-preview")} className="hover:text-[#1d4ed8]">
                See it in action
              </button>
              <button onClick={() => scrollTo("care-onboarding")} className="hover:text-[#1d4ed8]">
                Getting started
              </button>
            </nav>
            <div className="hidden items-center gap-5 lg:flex">
              <button
                onClick={onBackToHome}
                className="text-control text-[#67716b] hover:text-[#24332d]"
              >
                MployUs.com ↗
              </button>
              <button
                onClick={bookDemo}
                className="rounded-full bg-[#1d4ed8] px-5 py-2.5 text-control font-semibold text-white transition-colors hover:bg-[#1e40af]"
              >
                Book a demo
              </button>
            </div>
            <button
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-lg p-2 lg:hidden"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
          {mobileOpen && (
            <nav
              aria-label="Mobile care navigation"
              className="space-y-3 border-t border-black/5 px-6 py-5 lg:hidden"
            >
              {[
                ["Overview", "care-overview"],
                ["Features", "care-features"],
                ["See it in action", "care-preview"],
                ["Getting started", "care-onboarding"],
              ].map(([label, id]) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="block w-full py-1 text-left text-control"
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => {
                  setMobileOpen(false)
                  bookDemo()
                }}
                className={primaryButton}
              >
                Book a demo
              </button>
              <button onClick={onBackToHome} className="ml-4 text-control text-[#67716b]">
                Back to MployUs
              </button>
            </nav>
          )}
        </header>
      ) : (
        <ProductPageNavigation
          product="Care Management"
          onBackToHome={onBackToHome}
          onSelect={scrollTo}
          sections={[
            { label: "Overview", id: "care-overview" },
            { label: "Features", id: "care-features" },
            { label: "See it in action", id: "care-preview" },
            { label: "Getting started", id: "care-onboarding" },
          ]}
        />
      )}

      <section
        id="care-overview"
        className={
          showHeader
            ? "scroll-mt-[70px] bg-[#f5f6f8] px-6 pb-12 pt-[118px] sm:pb-16 sm:pt-[134px] lg:pb-20 lg:pt-[150px]"
            : "scroll-mt-6 bg-[#f5f6f8] px-6 pb-12 pt-12 sm:pb-16 sm:pt-16 lg:pb-20 lg:pt-20"
        }
      >
        <div className="site-content grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <motion.div {...reveal}>
            <div className="mb-7 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#1d4ed8]" />
              <p className="text-eyebrow font-semibold uppercase text-[#67716b]">
                Connected care · Ireland &amp; UK
              </p>
            </div>
            <h1 className="text-hero font-normal font-display">
              Better records.
              <br />
              Connected care.
              <br />
              <span className="text-[#1d4ed8]">Time for care.</span>
            </h1>
            <p className="mb-8 mt-6 max-w-[440px] text-body text-[#68716c]">
              A more human way to manage care. Bring medication, care plans and everyday
              observations together — so your team can focus on the people behind the records.
            </p>
            <div className="flex flex-wrap gap-3">
              <button onClick={bookDemo} className={primaryButton}>
                Book a dashboard demo
                <img
                  src={referenceAssets.arrow}
                  alt=""
                  className="product-reference-feature-icon"
                />
              </button>
              <button onClick={onStartTrial} className={secondaryButton}>
                Start a free trial
              </button>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-black/5 pt-6">
              {["Person-centred records", "Connected workflows", "Audit support"].map(
                (label, index) => (
                  <span key={label} className="flex items-center gap-2 text-caption text-[#68716c]">
                    <img
                      src={referenceAssets.checks[index]}
                      alt=""
                      className="product-reference-feature-icon"
                    />
                    {label}
                  </span>
                ),
              )}
            </div>
          </motion.div>
          <motion.div {...reveal} className="product-reference-dashboard">
            <img
              src={careDashboard}
              alt="Care dashboard with care hours, shift coverage, wellbeing trends and alerts"
            />
          </motion.div>
        </div>
      </section>

      <div className="font-sans text-[#0f172a]">
        <section className="px-6 pb-4 pt-20 text-center">
          <div className="mx-auto max-w-[820px]">
            <p className="text-eyebrow font-semibold uppercase text-[#1d4ed8]">
              One workspace. Every part of care.
            </p>
            <h2 className="mt-5 font-display text-section font-normal">
              Care isn’t in silos.
              <br />
              Your records shouldn’t be either.
            </h2>
            <p className="mx-auto mt-5 max-w-[720px] text-lead text-[#64748b]">
              Replace disconnected folders with a shared workspace. Medication, care plans and daily
              observations — a clearer picture, together.
            </p>
          </div>
        </section>

        <section id="care-features" className="scroll-mt-24 px-6 py-12 lg:py-16">
          <div className="site-content grid items-center gap-12 rounded-2xl border border-black/5 bg-[#f8fafc] p-6 md:p-10 lg:grid-cols-[0.8fr_1.5fr] lg:gap-16">
            <motion.div {...reveal}>
              <p className="mb-5 text-eyebrow font-semibold uppercase text-[#1d4ed8]">
                The everyday, made simpler
              </p>
              <h2 className="text-section font-normal font-display">
                People first.
                <br />
                Paperwork last.
              </h2>
              <p className="mt-6 text-body text-[#68716c]">
                Medication, care plans, daily logs and compliance in one connected workspace.
                Thoughtful tools for the people doing the caring.
              </p>
              <button
                onClick={bookDemo}
                className="mt-7 inline-flex items-center gap-2 text-control font-semibold text-[#1d4ed8]"
              >
                Explore your care dashboard
                <ArrowRight size={16} />
              </button>
            </motion.div>
            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature, index) => (
                <motion.article
                  key={feature.title}
                  {...reveal}
                  className="rounded-xl bg-white p-6 transition-colors hover:bg-[#edf0f6]"
                >
                  <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf0f6] text-[#1d4ed8]">
                    <img
                      src={referenceAssets.features[index]}
                      alt=""
                      className="product-reference-feature-icon"
                    />
                  </span>
                  <p className="mb-3 text-eyebrow font-medium uppercase text-[#67716b]">
                    {feature.label}
                  </p>
                  <h3 className="text-title font-semibold font-sans">{feature.title}</h3>
                  <p className="mt-3 text-body text-[#68716c]">{feature.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="care-preview" className="scroll-mt-24 px-6 py-16 lg:py-20">
          <div className="site-content grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="flex flex-col gap-6 lg:order-2">
              <div>
                <p className="mb-5 text-eyebrow font-semibold uppercase text-[#1d4ed8]">
                  A closer look
                </p>
                <h2 className="text-section font-normal font-display">
                  Every person’s journey.
                  <br />
                  No loose ends.
                </h2>
              </div>
              <p className="max-w-sm text-body text-[#68716c]">Explore a few everyday workflows.</p>
            </div>
            <div className="rounded-2xl border border-black/5 bg-[#f0f1ff] p-4 sm:p-7 lg:order-1">
              <div
                role="tablist"
                aria-label="Care dashboard workflows"
                className="mb-7 flex flex-wrap gap-2"
              >
                {tabs.map((tab, index) => (
                  <button
                    key={tab}
                    ref={(element) => {
                      tabRefs.current[index] = element
                    }}
                    role="tab"
                    id={`care-tab-${index}`}
                    aria-selected={activeTab === tab}
                    aria-controls={`care-panel-${index}`}
                    tabIndex={activeTab === tab ? 0 : -1}
                    onClick={() => setActiveTab(tab)}
                    onKeyDown={(event) => {
                      const next =
                        event.key === "ArrowRight"
                          ? (index + 1) % tabs.length
                          : event.key === "ArrowLeft"
                            ? (index + tabs.length - 1) % tabs.length
                            : event.key === "Home"
                              ? 0
                              : event.key === "End"
                                ? tabs.length - 1
                                : null
                      if (next !== null) {
                        event.preventDefault()
                        setActiveTab(tabs[next])
                        tabRefs.current[next]?.focus()
                      }
                    }}
                    className={`rounded-full px-5 py-2.5 text-control font-medium transition-colors ${
                      activeTab === tab
                        ? "bg-[#1d4ed8] text-white"
                        : "bg-white text-[#68716c] hover:bg-[#edf0f6]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <motion.div
                key={activeTab}
                initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                role="tabpanel"
                tabIndex={0}
                id={`care-panel-${tabs.indexOf(activeTab)}`}
                aria-labelledby={`care-tab-${tabs.indexOf(activeTab)}`}
                className="min-h-[200px]"
              >
                {activeTab === "eMAR" && (
                  <div className="space-y-3">
                    {[
                      {
                        name: "Paracetamol 500mg",
                        detail: "Room 4 · Morning pass, 08:00",
                        status: "Recorded",
                      },
                      {
                        name: "Amlodipine 5mg",
                        detail: "Room 7 · Scheduled for 12:00",
                        status: "Scheduled",
                      },
                    ].map((medication) => (
                      <div
                        key={medication.name}
                        className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-black/5 bg-white p-5"
                      >
                        <div className="flex items-center gap-4">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#edf0f6] text-[#1d4ed8]">
                            <Pill size={19} />
                          </span>
                          <div>
                            <p className="text-body font-semibold">{medication.name}</p>
                            <p className="mt-1 text-caption text-[#68716c]">{medication.detail}</p>
                          </div>
                        </div>
                        <span className="rounded-full bg-[#f0f3ef] px-3 py-1.5 text-caption text-[#506952]">
                          {medication.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === "Care Plans" && (
                  <div className="rounded-xl border border-black/5 bg-white p-6">
                    <div className="flex items-start gap-4">
                      <ClipboardList size={24} className="shrink-0 text-[#1d4ed8]" />
                      <div>
                        <p className="text-body font-semibold">Mobility &amp; dietary care plan</p>
                        <p className="mt-3 text-body text-[#68716c]">
                          Two-person assistance for transfers and an agreed low-sodium dietary plan.
                          Individual needs, goals and review dates are kept together.
                        </p>
                        <p className="mt-4 flex items-center gap-2 text-caption text-[#1d4ed8]">
                          <Check size={14} />
                          Review recorded · 20 July 2026
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "Vitals & Logs" && (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      {
                        label: "Blood pressure",
                        value: "120/80",
                        unit: "mmHg",
                      },
                      {
                        label: "Oxygen saturation",
                        value: "98%",
                        unit: "SpO₂",
                      },
                    ].map((vital) => (
                      <div
                        key={vital.label}
                        className="rounded-xl border border-black/5 bg-white p-6"
                      >
                        <p className="text-caption text-[#68716c]">{vital.label}</p>
                        <p className="mt-5 text-stat font-medium text-[#1d4ed8]">
                          {vital.value}
                          <span className="ml-2 text-caption text-[#68716c]">{vital.unit}</span>
                        </p>
                        <p className="mt-4 text-caption text-[#68716c]">Observation · Room 4</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
              <button
                onClick={bookDemo}
                className="mt-6 inline-flex items-center gap-2 text-control font-semibold text-[#1d4ed8]"
              >
                See this workflow in a demo
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </section>

        <section className="bg-[#1d4ed8] px-6 py-16 text-white lg:py-24">
          <div className="site-content">
            <div className="grid items-end gap-6 md:grid-cols-[1.3fr_1fr]">
              <div>
                <p className="text-eyebrow font-semibold uppercase text-white/75">
                  Clarity isn’t an add-on
                </p>
                <h2 className="mt-5 font-display text-section font-normal">
                  Give your team confidence.
                  <br />
                  Keep care connected.
                </h2>
              </div>
              <p className="text-body text-white/80">
                Organised records and a shared history help your team understand what has happened,
                what comes next and where attention is needed.
              </p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                {
                  icon: ShieldCheck,
                  title: "Records with context",
                  text: "Timestamped entries and a history of changes support your audit preparation.",
                },
                {
                  icon: ClipboardList,
                  title: "Continuity between shifts",
                  text: "Keep care plans and everyday observations together, not in separate folders.",
                },
                {
                  icon: HeartPulse,
                  title: "A person-centred picture",
                  text: "Bring individual needs, agreed goals and wellbeing observations into view.",
                },
              ].map((item, index) => (
                <motion.article
                  key={item.title}
                  {...reveal}
                  className="rounded-xl bg-white/10 p-7 transition-colors hover:bg-white/15"
                >
                  <img
                    src={referenceAssets.confidence[index]}
                    alt=""
                    className="product-reference-feature-icon"
                  />
                  <h3 className="mt-6 text-title font-semibold font-sans">{item.title}</h3>
                  <p className="mt-3 text-body text-white/80">{item.text}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="care-onboarding" className="scroll-mt-24 px-6 py-16 lg:py-24">
          <div className="site-content">
            <p className="mb-5 text-center text-eyebrow font-semibold uppercase text-[#1d4ed8]">
              A thoughtful way to get started
            </p>
            <h2 className="text-center font-display text-section font-normal">
              Less complexity.
              <br />
              Right from the start.
            </h2>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Start with your team",
                  description:
                    "Tell us about your care setting, current processes and what better looks like for you.",
                },
                {
                  title: "Build your workspace",
                  description:
                    "Explore the right workflows for your team and plan a careful transition from existing records.",
                },
                {
                  title: "Move forward, together",
                  description:
                    "Help your team get familiar with the tools and make connected records part of the everyday.",
                },
              ].map((step, index) => (
                <motion.div
                  key={step.title}
                  {...reveal}
                  className="border-t border-black/5 px-2 py-7"
                >
                  <p className="text-stat font-semibold text-[#dce2f0]">0{index + 1}</p>
                  <h3 className="mb-3 mt-7 text-title font-semibold font-sans">{step.title}</h3>
                  <p className="text-body text-[#68716c]">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f8fafc] px-6 py-16 lg:py-20">
          <div className="site-content grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-eyebrow font-semibold uppercase text-[#1d4ed8]">
                A little more clarity
              </p>
              <h2 className="mt-5 font-display text-section font-normal">
                Good questions.
                <br />
                Straight answers.
              </h2>
            </div>
            <div>
              {[
                {
                  question: "Who is MployUs Care Management for?",
                  answer:
                    "It is designed for care providers and healthcare teams looking to connect medication records, individual care plans and everyday observations in one workspace.",
                },
                {
                  question: "Can we see how it fits our care setting?",
                  answer:
                    "Yes. Book a personal demo to discuss your setting, existing processes and the workflows your team needs.",
                },
                {
                  question: "How do we move from existing records?",
                  answer:
                    "We start by understanding your current records and planning the transition with your team. Discuss migration requirements and available support during your demo.",
                },
                {
                  question: "Does software replace professional judgement?",
                  answer:
                    "No. Digital records support your team’s work; clinical decisions and individual care remain the responsibility of qualified professionals.",
                },
              ].map((item, index) => (
                <details key={item.question} className="group border-b border-black/5 py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-control font-semibold [&::-webkit-details-marker]:hidden">
                    {item.question}
                    <span className="text-title font-normal text-[#1d4ed8] group-open:hidden">
                      +
                    </span>
                    <span className="hidden text-title font-normal text-[#1d4ed8] group-open:block">
                      −
                    </span>
                  </summary>
                  <p className="mt-4 text-body text-[#64748b]">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section className="px-6 py-16 lg:py-20">
          <div className="site-content relative flex flex-col items-center gap-8 overflow-hidden rounded-2xl bg-[#edf0fa] px-6 py-16 text-center">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-28 -top-32 h-80 w-80 rounded-full border-[36px] border-white/30"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-36 -right-24 h-80 w-80 rounded-full border-[36px] border-white/30"
            />
            <div>
              <p className="mb-5 text-eyebrow font-medium uppercase text-[#1d4ed8]">
                For the people behind the care
              </p>
              <h2 className="font-display text-section font-normal text-[#0f172a]">
                Your next chapter.
                <br />
                All in one workspace.
              </h2>
              <p className="mt-5 text-body text-[#64748b]">
                Let’s find a way of working that fits your team.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={bookDemo}
                className="inline-flex items-center gap-3 rounded-lg bg-[#1d4ed8] px-6 py-3.5 text-control font-semibold text-white transition-colors hover:bg-[#1e40af]"
              >
                Book a demo
                <ArrowRight size={16} />
              </button>
              <button
                onClick={onStartTrial}
                className="rounded-lg border border-black/5 bg-white px-6 py-3.5 text-control font-semibold text-[#0f172a] transition-colors hover:bg-[#f8fafc]"
              >
                Start a free trial
              </button>
            </div>
          </div>
        </section>
      </div>
      <Footer
        onNavigate={onNavigate}
        onBookDemo={bookDemo}
        onStartTrial={onStartTrial}
        description={
          <>
            Connected records. Person-centred care.
            <br />
            Less busywork. More time for people.
          </>
        }
        tagline="Your team. Your records. Connected."
      />
    </div>
  )
}
