import React, { useRef, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import {
  BarChart3,
  ArrowRight,
  Check,
  ClipboardList,
  Users,
  Menu,
  BriefcaseBusiness,
  ShieldCheck,
  X,
} from "lucide-react"
import { Footer } from "../Footer"
import { ProductPageNavigation } from "../ProductPageNavigation"
import recruitmentDashboard from "../../imports/product-reference/a7a54.png"
import "./product-reference.css"
import { PRODUCT_VISUALS } from "../../data/productVisuals"

const referenceAssets = PRODUCT_VISUALS.hire

interface RecruitmentSoftwarePageProps {
  onBackToHome: () => void
  onBookDemo: (moduleTitle?: string) => void
  onStartTrial: () => void
  onNavigate: (view: string) => void
  showHeader?: boolean
}

const features = [
  {
    icon: BriefcaseBusiness,
    title: "Vacancies, organised.",
    description:
      "Keep role requirements, job descriptions and application activity together. Give your team a shared starting point for every hire.",
    label: "Jobs & applications",
  },
  {
    icon: Users,
    title: "People, not spreadsheets.",
    description:
      "Follow each candidate from application to offer with a visual pipeline and a clear history of progress.",
    label: "Candidate pipeline",
  },
  {
    icon: ClipboardList,
    title: "Better conversations.",
    description:
      "Keep interview notes, feedback and next steps in context so hiring teams can make informed decisions together.",
    label: "Team collaboration",
  },
  {
    icon: BarChart3,
    title: "A clearer hiring picture.",
    description:
      "Bring applications, active vacancies and hiring progress into view. See where your team needs to focus next.",
    label: "Hiring insights",
  },
]
const tabs = ["Applied", "Screened", "Interview", "Offered"] as const
type PipelineTab = (typeof tabs)[number]
const candidates = {
  Applied: {
    name: "Priya Sharma",
    role: "Registered Nurse",
    detail: "Application received · Awaiting initial review",
    next: "Review application",
  },
  Screened: {
    name: "Marcus Bell",
    role: "Financial Analyst",
    detail: "Initial review complete · References pending",
    next: "Arrange an interview",
  },
  Interview: {
    name: "Alistair Vance",
    role: "Senior Software Engineer",
    detail: "Interview scheduled · Feedback pending",
    next: "Collect team feedback",
  },
  Offered: {
    name: "Hannah Wright",
    role: "Retail Store Manager",
    detail: "Offer sent · Awaiting candidate response",
    next: "Follow up on offer",
  },
}

export const RecruitmentSoftwarePage: React.FC<RecruitmentSoftwarePageProps> = ({
  onBackToHome,
  onBookDemo,
  onStartTrial,
  onNavigate,
  showHeader = true,
}) => {
  const [activeTab, setActiveTab] = useState<PipelineTab>("Screened")
  const [mobileOpen, setMobileOpen] = useState(false)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const reducedMotion = useReducedMotion()
  const bookDemo = () => onBookDemo("recruitment-software")
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" })
    setMobileOpen(false)
  }
  const primaryButton =
    "group inline-flex items-center justify-center gap-3 rounded-full bg-[#0e1629] px-6 py-3.5 text-control font-semibold text-white transition-colors hover:bg-[#1c2942]"
  const secondaryButton =
    "inline-flex items-center justify-center gap-3 rounded-full border border-black/5 bg-white px-6 py-3.5 text-control font-semibold text-[#24332d] transition-colors hover:bg-[#edf0f4]"
  const reveal = {
    initial: reducedMotion ? (false as const) : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  }
  return (
    <div className="product-reference product-reference-hire min-h-screen overflow-x-clip bg-white font-sans text-[#24332d] [&_button]:cursor-pointer motion-reduce:[&_*]:transition-none">
      {showHeader ? (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur-sm">
          <div className="mx-auto flex h-[70px] max-w-[1312px] items-center justify-between gap-6 px-6 lg:px-16">
            <button
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: reducedMotion ? "auto" : "smooth",
                })
              }
              aria-label="MployUs recruitment software home"
              className="flex items-baseline gap-2 text-brand font-semibold tracking-tight"
            >
              mployus
              <span className="text-caption font-medium tracking-normal text-[#0e1629]">hire.</span>
            </button>
            <nav
              aria-label="Recruitment software navigation"
              className="hidden items-center gap-7 text-control text-[#4b5750] lg:flex"
            >
              <button
                onClick={() => scrollTo("recruitment-overview")}
                className="hover:text-[#0e1629]"
              >
                Overview
              </button>
              <button
                onClick={() => scrollTo("recruitment-features")}
                className="hover:text-[#0e1629]"
              >
                Features
              </button>
              <button
                onClick={() => scrollTo("recruitment-preview")}
                className="hover:text-[#0e1629]"
              >
                See it in action
              </button>
              <button
                onClick={() => scrollTo("recruitment-onboarding")}
                className="hover:text-[#0e1629]"
              >
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
                className="rounded-full bg-[#0e1629] px-5 py-2.5 text-control font-semibold text-white transition-colors hover:bg-[#1c2942]"
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
              aria-label="Mobile recruitment software navigation"
              className="space-y-3 border-t border-black/5 px-6 py-5 lg:hidden"
            >
              {[
                ["Overview", "recruitment-overview"],
                ["Features", "recruitment-features"],
                ["See it in action", "recruitment-preview"],
                ["Getting started", "recruitment-onboarding"],
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
          product="Recruitment Software"
          onBackToHome={onBackToHome}
          onSelect={scrollTo}
          sections={[
            { label: "Overview", id: "recruitment-overview" },
            { label: "Features", id: "recruitment-features" },
            { label: "See it in action", id: "recruitment-preview" },
            { label: "Getting started", id: "recruitment-onboarding" },
          ]}
        />
      )}

      <section
        id="recruitment-overview"
        className={
          showHeader
            ? "scroll-mt-[70px] bg-[#f5f6f8] px-6 pb-12 pt-[118px] sm:pb-16 sm:pt-[134px] lg:pb-20 lg:pt-[150px]"
            : "scroll-mt-6 bg-[#f5f6f8] px-6 pb-12 pt-12 sm:pb-16 sm:pt-16 lg:pb-20 lg:pt-20"
        }
      >
        <div className="mx-auto grid max-w-[1184px] items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <motion.div {...reveal}>
            <div className="mb-7 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#0e1629]" />
              <p className="text-eyebrow font-semibold uppercase text-[#67716b]">
                Connected hiring · Ireland &amp; UK
              </p>
            </div>
            <h1 className="text-hero font-normal font-display">
              Better hiring.
              <br />
              Less busywork.
              <br />
              <span className="text-[#0e1629]">More human.</span>
            </h1>
            <p className="mb-8 mt-6 max-w-[440px] text-body text-[#68716c]">
              A more human way to recruit. Bring vacancies, candidates and hiring conversations
              together — so your team can focus on finding the right people.
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
              {["Candidate-first workflows", "Connected workflows", "Hiring insights"].map(
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
              src={recruitmentDashboard}
              alt="Recruitment dashboard showing applications, vacancies and hiring activity"
            />
          </motion.div>
        </div>
      </section>

      <div className="font-sans text-[#0f172a]">
        <section className="px-6 pb-4 pt-20 text-center">
          <div className="mx-auto max-w-[820px]">
            <p className="text-eyebrow font-semibold uppercase text-[#0e1629]">
              One workspace. Every step of hiring.
            </p>
            <h2 className="mt-5 font-display text-section font-normal">
              Hiring isn’t in silos.
              <br />
              Your software shouldn’t be either.
            </h2>
            <p className="mx-auto mt-5 max-w-[720px] text-lead text-[#64748b]">
              Replace disconnected tools with a shared workspace. Vacancies, applications and team
              feedback — a clearer picture, together.
            </p>
          </div>
        </section>

        <section id="recruitment-features" className="scroll-mt-24 px-6 py-12 lg:py-16">
          <div className="mx-auto grid max-w-[1184px] items-center gap-12 rounded-2xl border border-black/5 bg-[#f8fafc] p-6 md:p-10 lg:grid-cols-[0.8fr_1.5fr] lg:gap-16">
            <motion.div {...reveal}>
              <p className="mb-5 text-eyebrow font-semibold uppercase text-[#0e1629]">
                The everyday, made simpler
              </p>
              <h2 className="text-section font-normal font-display">
                People first.
                <br />
                Paperwork last.
              </h2>
              <p className="mt-6 text-body text-[#68716c]">
                Vacancies, candidate profiles and team feedback in one connected workspace.
                Thoughtful tools for the people doing the hiring.
              </p>
              <button
                onClick={bookDemo}
                className="mt-7 inline-flex items-center gap-2 text-control font-semibold text-[#0e1629]"
              >
                Explore your hiring dashboard
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
                  <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf0f6] text-[#0e1629]">
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

        <section id="recruitment-preview" className="scroll-mt-24 px-6 py-16 lg:py-20">
          <div className="mx-auto grid max-w-[1184px] items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="flex flex-col gap-6 lg:order-2">
              <div>
                <p className="mb-5 text-eyebrow font-semibold uppercase text-[#0e1629]">
                  A closer look
                </p>
                <h2 className="text-section font-normal font-display">
                  Every candidate’s journey.
                  <br />
                  No loose ends.
                </h2>
              </div>
              <p className="max-w-sm text-body text-[#68716c]">Explore a few everyday workflows.</p>
            </div>
            <div className="rounded-2xl border border-black/5 bg-[#f0f1ff] p-4 sm:p-7 lg:order-1">
              <div
                role="tablist"
                aria-label="Candidate pipeline stages"
                className="mb-7 flex flex-wrap gap-2"
              >
                {tabs.map((tab, index) => (
                  <button
                    key={tab}
                    ref={(element) => {
                      tabRefs.current[index] = element
                    }}
                    role="tab"
                    id={`recruitment-tab-${index}`}
                    aria-selected={activeTab === tab}
                    aria-controls={`recruitment-panel-${index}`}
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
                        ? "bg-[#0e1629] text-white"
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
                id={`recruitment-panel-${tabs.indexOf(activeTab)}`}
                aria-labelledby={`recruitment-tab-${tabs.indexOf(activeTab)}`}
                className="min-h-[200px]"
              >
                <div className="rounded-xl border border-black/5 bg-white p-6">
                  <div className="flex items-center gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#edf0f6] text-control font-semibold text-[#0e1629]">
                      {candidates[activeTab].name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")}
                    </span>
                    <div>
                      <h3 className="text-control font-semibold">{candidates[activeTab].name}</h3>
                      <p className="mt-1 text-caption text-[#64748b]">
                        {candidates[activeTab].role}
                      </p>
                    </div>
                  </div>
                  <p className="mt-6 text-body text-[#64748b]">{candidates[activeTab].detail}</p>
                  <div className="mt-6 border-t border-black/5 pt-4">
                    <p className="text-eyebrow uppercase text-[#64748b]">Suggested next step</p>
                    <p className="mt-2 flex items-center gap-2 text-body text-[#0e1629]">
                      <Check size={15} />
                      {candidates[activeTab].next}
                    </p>
                  </div>
                </div>
              </motion.div>
              <button
                onClick={bookDemo}
                className="mt-6 inline-flex items-center gap-2 text-control font-semibold text-[#0e1629]"
              >
                See this workflow in a demo
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </section>

        <section className="bg-[#0e1629] px-6 py-16 text-white lg:py-24">
          <div className="mx-auto max-w-[1184px]">
            <div className="grid items-end gap-6 md:grid-cols-[1.3fr_1fr]">
              <div>
                <p className="text-eyebrow font-semibold uppercase text-white/75">
                  Clarity isn’t an add-on
                </p>
                <h2 className="mt-5 font-display text-section font-normal">
                  Give your team confidence.
                  <br />
                  Keep hiring connected.
                </h2>
              </div>
              <p className="text-body text-white/80">
                Organised applications and a shared history help your team understand what has
                happened, what comes next and where attention is needed.
              </p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                {
                  icon: ShieldCheck,
                  title: "Applications with context",
                  text: "Candidate profiles, notes and stage history keep each application in context.",
                },
                {
                  icon: ClipboardList,
                  title: "Continuity across your team",
                  text: "Keep feedback and next steps together so hiring teams can work from the same picture.",
                },
                {
                  icon: Users,
                  title: "A candidate-first picture",
                  text: "Bring skills, experience and conversations into view, without losing the person behind the CV.",
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

        <section id="recruitment-onboarding" className="scroll-mt-24 px-6 py-16 lg:py-24">
          <div className="mx-auto max-w-[1184px]">
            <p className="mb-5 text-center text-eyebrow font-semibold uppercase text-[#0e1629]">
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
                    "Tell us about your hiring team, current processes and the roles you recruit for.",
                },
                {
                  title: "Build your workspace",
                  description:
                    "Explore your pipeline stages and plan a careful transition from existing hiring tools.",
                },
                {
                  title: "Move forward, together",
                  description:
                    "Help your team get familiar with the tools and make connected hiring part of the everyday.",
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
          <div className="mx-auto grid max-w-[1184px] gap-12 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-eyebrow font-semibold uppercase text-[#0e1629]">
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
                  question: "Who is MployUs Recruitment Software for?",
                  answer:
                    "It is designed for hiring teams who want to organise vacancies, candidates and recruitment activity in one workspace, across healthcare and other sectors.",
                },
                {
                  question: "Can we see how it fits our hiring process?",
                  answer:
                    "Yes. Book a personal demo to discuss your roles, current hiring process and the workflows your team needs.",
                },
                {
                  question: "How do we move from existing records?",
                  answer:
                    "We start by understanding your current records and planning the transition with your team. Discuss migration requirements and available support during your demo.",
                },
                {
                  question: "Does software make hiring decisions for us?",
                  answer:
                    "No. The workspace supports your hiring process. Your team remains responsible for reviewing candidates and making fair, informed recruitment decisions.",
                },
              ].map((item, index) => (
                <details key={item.question} className="group border-b border-black/5 py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-control font-semibold [&::-webkit-details-marker]:hidden">
                    {item.question}
                    <span className="text-title font-normal text-[#0e1629] group-open:hidden">
                      +
                    </span>
                    <span className="hidden text-title font-normal text-[#0e1629] group-open:block">
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
              <p className="mb-5 text-eyebrow font-medium uppercase text-[#0e1629]">
                For the people behind every hire
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
                className="inline-flex items-center gap-3 rounded-lg bg-[#0e1629] px-6 py-3.5 text-control font-semibold text-white transition-colors hover:bg-[#1c2942]"
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
            Connected hiring. Candidate-first thinking.
            <br />
            Less busywork. More time for people.
          </>
        }
        tagline="Your roles. Your people. Connected."
      />
    </div>
  )
}
