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
import careDashboard from "../../imports/Screenshot_2026-07-24_140316.png"

interface CareManagementPageProps {
  onBackToHome: () => void
  onBookDemo: (moduleTitle?: string) => void
  onStartTrial: () => void
  onNavigate: (view: string) => void
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
type CareTab = typeof tabs[number]

export const CareManagementPage: React.FC<CareManagementPageProps> = ({
  onBackToHome,
  onBookDemo,
  onStartTrial,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<CareTab>("eMAR")
  const [mobileOpen, setMobileOpen] = useState(false)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const reducedMotion = useReducedMotion()
  const bookDemo = () => onBookDemo("care-management")
  const scrollTo = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" })
    setMobileOpen(false)
  }
  const primaryButton =
    "group inline-flex items-center justify-center gap-3 rounded-full bg-[#52658e] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#405273]"
  const secondaryButton =
    "inline-flex items-center justify-center gap-3 rounded-full border border-black/5 bg-white px-6 py-3.5 text-sm font-semibold text-[#24332d] transition-colors hover:bg-[#edf0f4]"
  const reveal = {
    initial: reducedMotion ? false as const : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  }
  return (
    <div className="min-h-screen overflow-x-clip bg-white font-['DM_Sans',sans-serif] text-[#24332d] [&_button]:cursor-pointer motion-reduce:[&_*]:transition-none">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex h-[70px] max-w-[1312px] items-center justify-between gap-6 px-6 lg:px-16">
          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: reducedMotion ? "auto" : "smooth",
              })
            }
            aria-label="MployUs care management home"
            className="flex items-baseline gap-2 text-[23px] font-semibold tracking-[-0.02em]"
          >
            mployus
            <span className="text-xs font-medium tracking-normal text-[#52658e]">
              care.
            </span>
          </button>
          <nav
            aria-label="Care management navigation"
            className="hidden items-center gap-7 text-[13px] text-[#4b5750] lg:flex"
          >
            <button
              onClick={() => scrollTo("care-overview")}
              className="hover:text-[#52658e]"
            >
              Overview
            </button>
            <button
              onClick={() => scrollTo("care-features")}
              className="hover:text-[#52658e]"
            >
              Features
            </button>
            <button
              onClick={() => scrollTo("care-preview")}
              className="hover:text-[#52658e]"
            >
              See it in action
            </button>
            <button
              onClick={() => scrollTo("care-onboarding")}
              className="hover:text-[#52658e]"
            >
              Getting started
            </button>
          </nav>
          <div className="hidden items-center gap-5 lg:flex">
            <button
              onClick={onBackToHome}
              className="text-xs text-[#67716b] hover:text-[#24332d]"
            >
              MployUs.com ↗
            </button>
            <button
              onClick={bookDemo}
              className="rounded-full bg-[#52658e] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#405273]"
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
                className="block w-full py-1 text-left text-sm"
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
            <button
              onClick={onBackToHome}
              className="ml-4 text-xs text-[#67716b]"
            >
              Back to MployUs
            </button>
          </nav>
        )}
      </header>

      <section
        id="care-overview"
        className="scroll-mt-[70px] bg-[#f5f6f8] px-6 pb-12 pt-[118px] sm:pb-16 sm:pt-[134px] lg:pb-20 lg:pt-[150px]"
      >
        <div className="mx-auto grid max-w-[1184px] items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <motion.div {...reveal}>
            <div className="mb-7 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#52658e]" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#67716b]">
                Connected care · Ireland &amp; UK
              </p>
            </div>
            <h1 className="text-[46px] font-medium leading-[1.06] tracking-[-0.025em] sm:text-[62px] lg:text-[72px]">
              Better records.
              <br />
              Connected care.
              <br />
              <span className="text-[#52658e]">Time for care.</span>
            </h1>
            <p className="mb-8 mt-6 max-w-[440px] text-[15px] leading-7 text-[#68716c]">
              A more human way to manage care. Bring medication, care plans and
              everyday observations together — so your team can focus on the
              people behind the records.
            </p>
            <div className="flex flex-wrap gap-3">
              <button onClick={bookDemo} className={primaryButton}>
                Book a dashboard demo
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
              <button onClick={onStartTrial} className={secondaryButton}>
                Start a free trial
              </button>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-black/5 pt-6">
              {[
                "Person-centred records",
                "Connected workflows",
                "Audit support",
              ].map((label) => (
                <span
                  key={label}
                  className="flex items-center gap-2 text-[11px] text-[#68716c]"
                >
                  <Check size={13} className="text-[#52658e]" />
                  {label}
                </span>
              ))}
            </div>
          </motion.div>
          <motion.div {...reveal} className="relative min-w-0 pb-7">
            <div className="rounded-[24px] bg-[#e6ebf2] px-4 pb-16 pt-9 sm:px-6 sm:pt-12">
              <div className="overflow-hidden rounded-xl border border-black/5 bg-white">
                <div className="flex items-center justify-between gap-2 border-b border-black/5 px-4 py-3">
                  <span className="flex gap-1.5" aria-hidden="true">
                    {[0, 1, 2].map((dot) => (
                      <span
                        key={dot}
                        className="h-1.5 w-1.5 rounded-full bg-[#c5cfdb]"
                      />
                    ))}
                  </span>
                  <span className="text-[10px] text-[#67716b]">
                    Your care workspace · Preview
                  </span>
                  <HeartPulse size={14} className="text-[#52658e]" />
                </div>
                <img
                  src={careDashboard}
                  alt="Sample care dashboard with care hours, shift coverage, wellbeing trends and alerts"
                  className="block h-auto w-full"
                />
              </div>
            </div>
            <motion.div
              animate={reducedMotion ? {} : { y: [0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-0 left-4 right-4 flex items-center gap-4 rounded-2xl border border-black/5 bg-white p-5 sm:left-8 sm:right-8"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#edf0f6] text-[#52658e]">
                <ClipboardList size={19} />
              </span>
              <div>
                <p className="mb-1 text-[9px] uppercase tracking-[0.14em] text-[#7a827c]">
                  One clearer picture
                </p>
                <p className="text-sm font-semibold">
                  Your team. Your records. Connected.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="font-['Inter:Regular',Inter,sans-serif] text-[#0f172a]">
        <section className="px-6 pb-4 pt-20 text-center">
          <div className="mx-auto max-w-[820px]">
            <p className="text-[14.873px] font-semibold uppercase leading-[22.31px] tracking-[2.3797px] text-[#52658e]">
              One workspace. Every part of care.
            </p>
            <h2 className="mt-5 font-['Inter:Semi_Bold',Inter,sans-serif] text-[36px] font-semibold leading-[1.2] tracking-[-1.0817px] md:text-[54.085px] md:leading-[64.901px]">
              Care isn’t in silos.
              <br />
              Your records shouldn’t be either.
            </h2>
            <p className="mx-auto mt-5 max-w-[720px] text-[17px] leading-8 text-[#64748b] md:text-[20.282px] md:leading-[37.859px]">
              Replace disconnected folders with a shared workspace. Medication,
              care plans and daily observations — a clearer picture, together.
            </p>
          </div>
        </section>

        <section
          id="care-features"
          className="scroll-mt-24 px-6 py-12 lg:py-16"
        >
          <div className="mx-auto grid max-w-[1184px] items-center gap-12 rounded-2xl border border-black/5 bg-[#f8fafc] p-6 md:p-10 lg:grid-cols-[0.8fr_1.5fr] lg:gap-16">
            <motion.div {...reveal}>
              <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#52658e]">
                The everyday, made simpler
              </p>
              <h2 className="text-[38px] font-medium leading-[1.12] sm:text-[46px]">
                People first.
                <br />
                Paperwork last.
              </h2>
              <p className="mt-6 text-sm leading-7 text-[#68716c]">
                Medication, care plans, daily logs and compliance in one
                connected workspace. Thoughtful tools for the people doing the
                caring.
              </p>
              <button
                onClick={bookDemo}
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#52658e]"
              >
                Explore your care dashboard
                <ArrowRight size={16} />
              </button>
            </motion.div>
            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature) => (
                <motion.article
                  key={feature.title}
                  {...reveal}
                  className="rounded-xl bg-white p-6 transition-colors hover:bg-[#edf0f6]"
                >
                  <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf0f6] text-[#52658e]">
                    <feature.icon size={21} strokeWidth={1.5} />
                  </span>
                  <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.1em] text-[#67716b]">
                    {feature.label}
                  </p>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-3 text-[13px] leading-6 text-[#68716c]">
                    {feature.description}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="care-preview" className="scroll-mt-24 px-6 py-16 lg:py-20">
          <div className="mx-auto grid max-w-[1184px] items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="flex flex-col gap-6 lg:order-2">
              <div>
                <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#52658e]">
                  A closer look
                </p>
                <h2 className="text-[38px] font-medium leading-[1.12] sm:text-[46px]">
                  Every person’s journey.
                  <br />
                  No loose ends.
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-7 text-[#68716c]">
                Explore a few everyday workflows.
                <br />
                Illustrative records only — not a live clinical system.
              </p>
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
                    className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                      activeTab === tab
                        ? "bg-[#52658e] text-white"
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
                        detail: "Sample resident A · Morning pass, 08:00",
                        status: "Recorded",
                      },
                      {
                        name: "Amlodipine 5mg",
                        detail: "Sample resident B · Scheduled for 12:00",
                        status: "Scheduled",
                      },
                    ].map((medication) => (
                      <div
                        key={medication.name}
                        className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-black/5 bg-white p-5"
                      >
                        <div className="flex items-center gap-4">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#edf0f6] text-[#52658e]">
                            <Pill size={19} />
                          </span>
                          <div>
                            <p className="text-sm font-semibold">
                              {medication.name}
                            </p>
                            <p className="mt-1 text-xs leading-5 text-[#68716c]">
                              {medication.detail}
                            </p>
                          </div>
                        </div>
                        <span className="rounded-full bg-[#f0f3ef] px-3 py-1.5 text-xs text-[#506952]">
                          {medication.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === "Care Plans" && (
                  <div className="rounded-xl border border-black/5 bg-white p-6">
                    <div className="flex items-start gap-4">
                      <ClipboardList
                        size={24}
                        className="shrink-0 text-[#52658e]"
                      />
                      <div>
                        <p className="text-sm font-semibold">
                          Mobility &amp; dietary care plan
                        </p>
                        <p className="mt-3 text-sm leading-7 text-[#68716c]">
                          Sample plan: two-person assistance for transfers and
                          an agreed low-sodium dietary plan. Individual needs,
                          goals and review dates are kept together.
                        </p>
                        <p className="mt-4 flex items-center gap-2 text-xs text-[#52658e]">
                          <Check size={14} />
                          Example review recorded · 20 July 2026
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
                        <p className="text-xs text-[#68716c]">{vital.label}</p>
                        <p className="mt-5 text-4xl font-medium text-[#52658e]">
                          {vital.value}
                          <span className="ml-2 text-xs text-[#68716c]">
                            {vital.unit}
                          </span>
                        </p>
                        <p className="mt-4 text-[11px] text-[#68716c]">
                          Illustrative observation · Sample resident
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
              <button
                onClick={bookDemo}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#52658e]"
              >
                See this workflow in a demo
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </section>

        <section className="bg-[#52658e] px-6 py-16 text-white lg:py-24">
          <div className="mx-auto max-w-[1184px]">
            <div className="grid items-end gap-6 md:grid-cols-[1.3fr_1fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/75">
                  Clarity isn’t an add-on
                </p>
                <h2 className="mt-5 font-['Inter:Semi_Bold',Inter,sans-serif] text-4xl font-semibold leading-[1.2] tracking-[-1.0817px] md:text-[54.085px]">
                  Give your team confidence.
                  <br />
                  Keep care connected.
                </h2>
              </div>
              <p className="text-sm leading-7 text-white/80">
                Organised records and a shared history help your team understand
                what has happened, what comes next and where attention is
                needed.
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
              ].map((item) => (
                <motion.article
                  key={item.title}
                  {...reveal}
                  className="rounded-xl bg-white/10 p-7 transition-colors hover:bg-white/15"
                >
                  <item.icon size={23} strokeWidth={1.5} />
                  <h3 className="mt-6 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/80">
                    {item.text}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="care-onboarding"
          className="scroll-mt-24 px-6 py-16 lg:py-24"
        >
          <div className="mx-auto max-w-[1184px]">
            <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.16em] text-[#52658e]">
              A thoughtful way to get started
            </p>
            <h2 className="text-center font-['Inter:Semi_Bold',Inter,sans-serif] text-[38px] font-semibold leading-[1.2] tracking-[-1.0817px] md:text-[54.085px]">
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
                  <p className="text-5xl font-semibold text-[#dce2f0]">
                    0{index + 1}
                  </p>
                  <h3 className="mb-3 mt-7 text-lg font-semibold">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-7 text-[#68716c]">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f8fafc] px-6 py-16 lg:py-20">
          <div className="mx-auto grid max-w-[1184px] gap-12 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#52658e]">
                A little more clarity
              </p>
              <h2 className="mt-5 font-['Inter:Semi_Bold',Inter,sans-serif] text-[38px] font-semibold leading-[1.2] md:text-[54.085px]">
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
              ].map((item) => (
                <details
                  key={item.question}
                  className="group border-b border-black/5 py-5"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold [&::-webkit-details-marker]:hidden">
                    {item.question}
                    <span className="text-xl font-normal text-[#52658e] group-open:hidden">
                      +
                    </span>
                    <span className="hidden text-xl font-normal text-[#52658e] group-open:block">
                      −
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-7 text-[#64748b]">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section className="px-6 py-16 lg:py-20">
          <div className="relative mx-auto flex max-w-[1184px] flex-col items-center gap-8 overflow-hidden rounded-2xl bg-[#edf0fa] px-6 py-16 text-center">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-28 -top-32 h-80 w-80 rounded-full border-[36px] border-white/30"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-36 -right-24 h-80 w-80 rounded-full border-[36px] border-white/30"
            />
            <div>
              <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.16em] text-[#52658e]">
                For the people behind the care
              </p>
              <h2 className="font-['Inter:Semi_Bold',Inter,sans-serif] text-[38px] font-semibold leading-[1.2] text-[#0f172a] sm:text-[54.085px]">
                Your next chapter.
                <br />
                All in one workspace.
              </h2>
              <p className="mt-5 text-sm text-[#64748b]">
                Let’s find a way of working that fits your team.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={bookDemo}
                className="inline-flex items-center gap-3 rounded-lg bg-[#52658e] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#435479]"
              >
                Book a demo
                <ArrowRight size={16} />
              </button>
              <button
                onClick={onStartTrial}
                className="rounded-lg border border-black/5 bg-white px-6 py-3.5 text-sm font-semibold text-[#0f172a] transition-colors hover:bg-[#f8fafc]"
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
