import React, { useState } from "react"
import {
  createBrowserRouter,
  Link,
  RouterProvider,
  useLocation,
  useNavigate,
} from "react-router"
import { MotionConfig } from "motion/react"
import { PolicyPage } from "../components/PlatformExperiences"
import {
  ArrowUpRight,
  ArrowRight,
  ChevronDown,
  Check,
  Heart,
  Users,
  BriefcaseBusiness,
  CalendarDays,
  ShieldCheck,
  Globe2,
  Menu,
  X,
  Plus,
  Minus,
} from "lucide-react"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { PricingPage } from "../components/pages/PricingPage"
import recruitmentPhoto from "../imports/homepage-reference/6104b.png"
import locumPhoto from "../imports/homepage-reference/09cba.png"
import carePhoto from "../imports/homepage-reference/ca8d0.png"
import trustedTeamOne from "../imports/homepage-reference/87c6c.png"
import trustedTeamTwo from "../imports/homepage-reference/87c20.png"
import trustedTeamThree from "../imports/homepage-reference/a08fb.png"

import { LocumProvisionPage } from "../components/pages/LocumProvisionPage"
import { RecruitmentSoftwarePage } from "../components/pages/RecruitmentSoftwarePage"
import { CareManagementPage } from "../components/pages/CareManagementPage"
import { RecruitmentServicePage } from "../components/pages/RecruitmentServicePage"
import { ProductDesignPage } from "../components/pages/ProductDesignPage"
import { WebDevelopmentPage } from "../components/pages/WebDevelopmentPage"

import { BookDemoModal } from "../components/modals/BookDemoModal"
import { LocumContactDialog } from "../components/modals/LocumContactDialog"
import { FreeTrialModal } from "../components/modals/FreeTrialModal"
import { VideoModal } from "../components/modals/VideoModal"
import { ModuleDetailModal } from "../components/modals/ModuleDetailModal"
import { CaseStudyModal } from "../components/modals/CaseStudyModal"

import { HOME_VISUALS } from "../data/homeVisuals"

import { PRODUCT_MODULES } from "../data/mockData"
import { UserRole, ProductModule } from "../types"

const solutions = [
  {
    id: "recruitment-service",
    name: "Recruitment services",
    icon: Users,
    color: "text-[#810161]",
    background: "bg-[#f8eef5]",
    description:
      "The right people. The right fit. A specialist recruitment partner who understands healthcare.",
    features: [
      "Permanent and international recruitment",
      "A personal, end-to-end hiring service",
    ],
  },
  {
    id: "locum-provision",
    name: "Locum provision",
    icon: CalendarDays,
    color: "text-[#368B62]",
    background: "bg-[#edf5ef]",
    description:
      "Keep care moving with qualified professionals, exactly when and where you need them.",
    features: [
      "Flexible, short- and long-term cover",
      "Professionals across Ireland and the UK",
    ],
  },
  {
    id: "care-management",
    name: "Care management",
    icon: Heart,
    color: "text-[#ae663d]",
    background: "bg-[#fbf1e9]",
    description:
      "Less administration. More time for people. Bring your daily care operations together.",
    features: [
      "Digital care plans and medication records",
      "Built for your team’s everyday workflow",
    ],
  },
  {
    id: "recruitment-software",
    name: "Recruitment software",
    icon: BriefcaseBusiness,
    color: "text-[#52658e]",
    background: "bg-[#eef1f7]",
    description:
      "From first application to the first day, make every stage of hiring feel effortless.",
    features: [
      "One organised candidate pipeline",
      "Job posting and applicant tracking",
    ],
  },
]

function LandingPage({
  onNavigate,
  onBookDemo,
  onStartTrial,
}: {
  onNavigate: (view: string) => void
  onBookDemo: () => void
  onStartTrial: () => void
}) {
  const [country, setCountry] = useState("Ireland")
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const primaryButton =
    "inline-flex items-center justify-center gap-3 rounded-lg bg-[#368B62] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#286d4c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#368B62]"
  const secondaryButton =
    "inline-flex items-center justify-center gap-3 rounded-lg border border-black/5 bg-white px-6 py-3.5 text-sm font-semibold text-[#233b35] transition-colors hover:bg-[#edf5ef] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#368B62]"
  const photos = [
    {
      image: recruitmentPhoto,
      title: "Good people.\nExceptional care.",
      category: "RECRUITMENT SERVICES",
      id: "recruitment-service",
      label: "Find your people",
      alt: "Healthcare professional smiling in a bright interior",
      tint: "bg-[#0e162a]",
    },
    {
      image: locumPhoto,
      title: "The cover you need.\nThe confidence you deserve.",
      category: "LOCUM PROVISION",
      id: "locum-provision",
      label: "Find your cover",
      alt: "Healthcare professional providing care in a hospital",
      tint: "bg-[#368B62]",
    },
    {
      image: carePhoto,
      title: "Less admin.\nMore human.",
      category: "CARE MANAGEMENT",
      id: "care-management",
      label: "Simplify your day",
      alt: "Medical professional focused on patient care",
      tint: "bg-[#ae663d]",
    },
  ]
  const faqs = [
    [
      "Who is MployUs for?",
      "MployUs supports healthcare providers, care homes, hospitals and healthcare professionals with recruitment, locum staffing and care management. Choose a service to explore how we can help your team.",
    ],
    [
      "Do you operate in Ireland and the UK?",
      "Yes. Our services support providers and professionals in Ireland and the UK. Our specialist teams can help you understand the registration and compliance requirements for your country.",
    ],
    [
      "Can I use just one service?",
      "Absolutely. Start with the service you need today, whether that is locum cover, permanent recruitment or software. Add other services as your organisation grows.",
    ],
    [
      "How do I register as a locum?",
      "Visit Locum Provision, select sign up and choose Locum. The registration flow guides you through your country, profession and required details.",
    ],
  ]
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }
  return (
    <div
      id="overview"
      className="homepage-magenta bg-white font-['DM_Sans',sans-serif] text-[#233b35] selection:bg-[#dfeee4] [&_button]:cursor-pointer motion-reduce:[&_*]:transition-none"
    >
      <div className="relative bg-white">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-3 text-[11px] text-[#5d6862] lg:px-10">
          <div className="flex items-center gap-5">
            <Globe2 size={12} />
            <label className="flex items-center gap-2 text-[11px]">
              Your region{" "}
              <select
                aria-label="Country"
                value={country}
                onChange={(event) => setCountry(event.target.value)}
                className="cursor-pointer bg-transparent text-[11px] font-medium text-[#233b35]"
              >
                <option>Ireland</option>
                <option>United Kingdom</option>
              </select>
            </label>
          </div>
          <button
            onClick={onBookDemo}
            className="transition-colors hover:text-[#368B62]"
          >
            Talk to our team <ArrowUpRight size={11} className="ml-1 inline" />
          </button>
        </div>
        <Navbar
          embedded
          onNavigate={onNavigate}
          onBookDemo={onBookDemo}
          onStartTrial={onStartTrial}
        />
      </div>

      <section
        aria-labelledby="homepage-hero-heading"
        className="relative isolate overflow-hidden px-6 pb-24 pt-16 text-center md:pb-36 md:pt-[81px]"
      >
        <div
          aria-hidden="true"
          className="homepage-hero-glow pointer-events-none absolute inset-0 -z-10"
        />
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-[17px] flex flex-wrap items-center justify-center gap-x-[27px] gap-y-3">
            <div className="flex -space-x-[13px]" aria-hidden="true">
              <img
                src={trustedTeamOne}
                alt=""
                className="h-[43.327px] w-[43.327px] -scale-x-100 rounded-full object-cover"
              />
              <img
                src={trustedTeamTwo}
                alt=""
                className="h-[43.327px] w-[43.327px] rounded-full object-cover"
              />
              <span className="relative h-[43.327px] w-[43.327px] overflow-hidden rounded-full">
                <img
                  src={trustedTeamThree}
                  alt=""
                  className="absolute -top-[8.08%] left-[-0.56%] h-[150%] w-full object-cover"
                />
              </span>
            </div>
            <p className="flex flex-wrap items-center justify-center gap-3 font-['Inter:Regular',Inter,sans-serif] text-[18px] font-normal leading-[37.859px] text-[#475569] sm:text-[22.986px]">
              Trusted by{" "}
              <strong className="font-['Inter:Semi_Bold',Inter,sans-serif] text-[36px] font-semibold leading-[54.085px] tracking-[-0.8113px] text-[#0f172a]">
                2K+
              </strong>{" "}
              teams
            </p>
          </div>
          <h1
            id="homepage-hero-heading"
            className="font-['Libre_Caslon_Display:Regular',serif] text-[48px] font-normal leading-[1.07] tracking-[-2.1634px] sm:text-[76px] min-[1440px]:text-[102.761px] min-[1440px]:leading-[109.954px]"
          >
            Better people. Better care.
            <br />
            All connected<span className="text-[#368B62]">.</span>
          </h1>
          <p className="mx-auto mt-[17px] max-w-[770.704px] font-['DM_Sans:Regular',sans-serif] text-[17px] font-normal leading-8 text-[#68736e] [font-variation-settings:'opsz'_14] md:text-[20.282px] md:leading-[37.859px]">
            Recruitment, locum staffing and care management — brought together.
            <br />
            So you can focus on what matters most: people.
          </p>
          <div className="mt-[43.268px] flex flex-wrap justify-center gap-[16.225px]">
            <button onClick={onBookDemo} className={primaryButton}>
              Book a demo <ArrowUpRight size={16} />
            </button>
            <button
              onClick={() => scrollTo("solutions")}
              className={secondaryButton}
            >
              Explore our solutions
            </button>
          </div>
        </div>
      </section>

      <section
        aria-label="Our healthcare services"
        className="grid gap-[3px] sm:grid-cols-3"
      >
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            onClick={() => onNavigate(photo.id)}
            className="group relative min-h-[350px] overflow-hidden text-left md:min-h-[400px]"
          >
            <img
              src={photo.image}
              alt={photo.alt}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none"
            />
            <div className="homepage-service-overlay absolute inset-0" />
            <div className="absolute bottom-0 left-0 right-0 p-7 text-white lg:p-10">
              <span className={`mb-5 inline-block h-1 w-8 ${photo.tint}`} />
              <p className="mb-3 text-[9px] font-medium tracking-[0.16em] text-white/80">
                {photo.category}
              </p>
              <h2 className="whitespace-pre-line font-['Libre_Caslon_Display',serif] text-[32px] leading-[1.1] lg:text-[37px]">
                {photo.title}
              </h2>
              <div className="mt-6 flex items-center justify-between text-xs">
                <span>{photo.label}</span>
                <img
                  src={HOME_VISUALS.photoArrows[index]}
                  alt=""
                  className="shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </div>
            </div>
          </button>
        ))}
      </section>

      <section
        id="about"
        className="mx-auto max-w-[1568.451px] px-6 py-16 md:py-20"
      >
        <div className="grid gap-8 md:grid-cols-2 md:gap-20">
          <div>
            <p className="mb-4 text-[10px] font-semibold tracking-[0.14em] text-[#368B62]">
              MEET MPLOYUS
            </p>
            <h2 className="font-['Libre_Caslon_Display',serif] text-4xl md:text-[46px]">
              Healthcare works better
              <br />
              when we work together.
            </h2>
          </div>
          <div className="pt-2 text-sm leading-7 text-[#68736e]">
            <p>
              Great care starts with great people. But finding them, supporting
              them and managing the everyday shouldn’t stand in the way.
            </p>
            <p className="mt-4">
              MployUs brings your people and processes together. One connected
              partner for the way healthcare works today — and where it goes
              tomorrow.
            </p>
            <button
              onClick={onBookDemo}
              className="mt-5 flex items-center gap-2 font-semibold text-[#233b35] hover:text-[#368B62]"
            >
              Let’s talk about your team <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      <section id="solutions" className="bg-[#f6f7f3] py-16 md:py-24">
        <div className="mx-auto grid max-w-[1568.451px] gap-12 px-6 lg:grid-cols-[0.8fr_1.5fr] lg:gap-16">
          <div className="lg:pt-3">
            <p className="mb-5 text-[10px] font-semibold tracking-[0.14em] text-[#368B62]">
              ONE PARTNER. MORE POSSIBILITIES.
            </p>
            <h2 className="font-['Libre_Caslon_Display',serif] text-[44px] leading-[1.06] md:text-[52px]">
              Everything you need.
              <br />
              Better, together.
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-7 text-[#68736e]">
              Find your next team member. Cover your next shift. Simplify your
              care operations. Choose what you need, and we’ll help you move
              forward.
            </p>
            <button onClick={onBookDemo} className={`${primaryButton} mt-7`}>
              Find your solution <ArrowUpRight size={15} />
            </button>
            <p className="mt-5 text-[11px] text-[#7b837e]">
              A real conversation. A solution that fits.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {solutions.map((solution, solutionIndex) => (
              <article
                key={solution.id}
                className="group flex flex-col rounded-lg border border-black/5 bg-white p-7 transition-colors hover:bg-[#fdfefc]"
              >
                <div
                  className={`mb-5 flex h-10 w-10 items-center justify-center rounded-lg ${solution.background} ${solution.color}`}
                >
                  <img
                    src={HOME_VISUALS.solutions[solutionIndex].icon}
                    alt=""
                    className="shrink-0"
                  />
                </div>
                <h3 className="text-[17px] font-semibold">{solution.name}</h3>
                <p className="mb-5 mt-3 text-[12px] leading-6 text-[#68736e]">
                  {solution.description}
                </p>
                <ul className="mb-7 space-y-3">
                  {solution.features.map((feature, featureIndex) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-[11px] leading-5 text-[#68736e]"
                    >
                      <img
                        src={
                          HOME_VISUALS.solutions[solutionIndex].checks[
                            featureIndex
                          ]
                        }
                        alt=""
                        className="mt-1 shrink-0"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => onNavigate(solution.id)}
                  className="mt-auto flex items-center gap-2 text-xs font-semibold"
                >
                  Explore {solution.name.toLowerCase()}{" "}
                  <img
                    src={HOME_VISUALS.solutions[solutionIndex].arrow}
                    alt=""
                    className="shrink-0 transition-transform group-hover:translate-x-1"
                  />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        aria-labelledby="how-it-works-heading"
        className="scroll-mt-6 bg-[#e9f0e7] py-16 md:py-[108.169px]"
      >
        <div className="mx-auto max-w-[1568.451px] px-6 md:px-[32.451px]">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <p className="font-['DM_Sans:SemiBold',sans-serif] text-[13.521px] font-semibold leading-[20.282px] tracking-[1.893px] text-[#368B62] [font-variation-settings:'opsz'_14]">
                A LITTLE LESS COMPLEXITY
              </p>
              <h2
                id="how-it-works-heading"
                className="mt-[21.634px] font-['Libre_Caslon_Display:Regular',serif] text-[44px] font-normal leading-[1.08] md:text-[67.606px] md:leading-[73.014px]"
              >
                More connected.
                <br />
                More time for care.
              </h2>
            </div>
            <p className="max-w-[519.211px] font-['DM_Sans:Regular',sans-serif] text-[18.93px] font-normal leading-[37.859px] text-[#68736e] [font-variation-settings:'opsz'_14]">
              Healthcare is human. Your systems should be too.
              <br />
              We make the complicated feel a little simpler.
            </p>
          </div>
          <div className="mt-8 grid gap-[20.282px] md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Start with your people",
                body: "Tell us about your team, your challenges and what better looks like for you.",
              },
              {
                number: "02",
                title: "Find your perfect fit",
                body: "We connect you with the right service, software or healthcare professional.",
              },
              {
                number: "03",
                title: "Move forward, together",
                body: "Get practical support from people who understand your world.",
              },
            ].map((step) => (
              <article
                key={step.number}
                className="min-w-0 border-t border-black/5 pt-8 lg:pt-[51.19px]"
              >
                <p
                  aria-hidden="true"
                  className="font-['Inter:Semi_Bold',Inter,sans-serif] text-[96px] font-semibold leading-[109px] text-[#368B62]/10 lg:text-[129.803px] lg:leading-[147.38px]"
                >
                  {step.number}
                </p>
                <h3 className="font-['Inter:Semi_Bold',Inter,sans-serif] text-[24.338px] font-semibold leading-[37.859px] text-[#0f172a] lg:text-[32.908px] lg:leading-[51.19px]">
                  {step.title}
                </h3>
                <p className="mt-[21.938px] font-['Inter:Regular',Inter,sans-serif] text-[18.93px] font-normal leading-[37.859px] text-[#62748e] lg:text-[25.595px] lg:leading-[51.19px]">
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1568.451px] items-center gap-10 px-6 py-20 md:grid-cols-2 md:gap-20">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={photos[0].image}
            alt="A healthcare professional ready to support your team"
            loading="lazy"
            className="h-[380px] w-full object-cover object-top"
          />
          <div className="absolute bottom-5 left-5 right-5 rounded-lg bg-[#fffffff2] p-5">
            <p className="text-[10px] font-semibold tracking-[0.12em] text-[#368B62]">
              FOR THE PEOPLE BEHIND THE CARE
            </p>
            <p className="mt-2 font-['Libre_Caslon_Display',serif] text-2xl">
              Your next chapter starts here.
            </p>
          </div>
        </div>
        <div>
          <p className="mb-5 text-[10px] font-semibold tracking-[0.14em] text-[#368B62]">
            HEALTHCARE PROFESSIONALS
          </p>
          <h2 className="font-['Libre_Caslon_Display',serif] text-[44px] leading-[1.08] md:text-[50px]">
            A career that cares
            <br />
            for you, too.
          </h2>
          <p className="mt-5 text-sm leading-7 text-[#68736e]">
            Looking for your next permanent role or the flexibility of locum
            work? We’ll help you find opportunities that fit your skills, your
            ambitions and your life.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate("recruitment-service")}
              className="inline-flex items-center gap-3 rounded-lg bg-[#368B62] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#286d4c]"
            >
              Explore opportunities <ArrowUpRight size={15} />
            </button>
            <button
              onClick={() => onNavigate("locum-provision")}
              className={secondaryButton}
            >
              Become a locum
            </button>
          </div>
        </div>
      </section>

      <section
        id="questions"
        className="border-t border-black/5 bg-[#fafaf8] py-16 md:py-20"
      >
        <div className="mx-auto grid max-w-[1568.451px] gap-10 px-6 md:grid-cols-[1fr_1.4fr] md:gap-20">
          <div>
            <p className="mb-5 text-[10px] font-semibold tracking-[0.14em] text-[#368B62]">
              GOOD TO KNOW
            </p>
            <h2 className="font-['Libre_Caslon_Display',serif] text-[44px] leading-[1.08]">
              A few questions.
              <br />
              Clear answers.
            </h2>
            <button
              onClick={onBookDemo}
              className="mt-7 flex items-center gap-2 text-sm font-semibold"
            >
              Talk to our team <ArrowRight size={15} />
            </button>
          </div>
          <div>
            {faqs.map(([question, answer], index) => (
              <div key={question} className="border-b border-black/5">
                <button
                  aria-expanded={openFaq === index}
                  aria-controls={`faq-${index}`}
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex w-full items-center justify-between gap-5 py-5 text-left text-sm font-medium"
                >
                  {question}
                  {openFaq === index ? (
                    <Minus size={16} className="shrink-0 text-[#368B62]" />
                  ) : (
                    <Plus size={16} className="shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <p
                    id={`faq-${index}`}
                    className="pb-5 pr-8 text-[13px] leading-7 text-[#68736e]"
                  >
                    {answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#173e30] py-16 md:py-20">
        <div className="mx-auto flex max-w-[1568.451px] min-w-0 flex-wrap items-center justify-between gap-8 px-6">
          <div>
            <p className="mb-4 text-[10px] font-medium tracking-[0.14em] text-[#b1ccbb]">
              LET’S MAKE BETTER HAPPEN
            </p>
            <h2 className="font-['Libre_Caslon_Display',serif] text-[38px] leading-[1.1] text-white sm:text-[44px] md:text-[52px]">
              Better healthcare starts
              <br />
              with a conversation.
            </h2>
          </div>
          <div>
            <div className="flex flex-wrap gap-3">
              <button onClick={onBookDemo} className={primaryButton}>
                Book a demo <ArrowUpRight size={15} />
              </button>
              <button onClick={onStartTrial} className={secondaryButton}>
                Get started
              </button>
            </div>
            <p className="mt-4 text-xs text-[#b1ccbb]">
              Your people. Your purpose. Our partnership.
            </p>
          </div>
        </div>
      </section>
      <Footer
        onNavigate={onNavigate}
        onBookDemo={onBookDemo}
        onStartTrial={onStartTrial}
      />
    </div>
  )
}

function PlatformApp() {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeRole, setActiveRole] = useState<UserRole>("all")
  const requestedView = location.pathname.slice(1)
  const activeView = [
    "locum-provision",
    "recruitment-service",
    "recruitment-software",
    "care-management",
    "product-design",
    "web-development",
    "pricing",
  ].includes(requestedView)
    ? requestedView
    : "home"

  const [bookDemoOpen, setBookDemoOpen] = useState(false)
  const [freeTrialOpen, setFreeTrialOpen] = useState(false)
  const [videoModalOpen, setVideoModalOpen] = useState(false)
  const [selectedModule, setSelectedModule] = useState<ProductModule | null>(
    null,
  )
  const [caseStudyOpen, setCaseStudyOpen] = useState(false)
  const [initialDemoModule, setInitialDemoModule] = useState("All Modules")

  const handleNavigate = (viewId: string) => {
    navigate(viewId === "home" ? "/" : `/${viewId}`)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleOpenModule = (modId: string) => {
    if (modId === "recruitment" || modId === "recruitment-software") {
      handleNavigate("recruitment-software")
    } else if (modId === "care-management") {
      handleNavigate("care-management")
    } else if (modId === "locums-staffing" || modId === "locum-provision") {
      handleNavigate("locum-provision")
    } else if (modId === "recruitment-service") {
      handleNavigate("recruitment-service")
    } else if (modId === "product-design") {
      handleNavigate("product-design")
    } else if (modId === "web-development") {
      handleNavigate("web-development")
    } else {
      const found = PRODUCT_MODULES.find((m) => m.id === modId)
      if (found) setSelectedModule(found)
    }
  }

  const handleBookDemoWithModule = (moduleTitle?: string) => {
    setInitialDemoModule(moduleTitle || "All Modules")
    setBookDemoOpen(true)
  }

  // Service pages own their navigation; product pages keep only their own footer.
  const isStandaloneLocum = activeView === "locum-provision"
  const isStandaloneRecruitment = activeView === "recruitment-service"
  const hasServiceNavigation = isStandaloneLocum || isStandaloneRecruitment
  const isProductPage =
    activeView === "care-management" || activeView === "recruitment-software"
  const ownsFooter = hasServiceNavigation || isProductPage

  return (
    <div
      className={`${activeView === "pricing" ? "homepage-magenta " : ""}${
        activeView === "product-design" ? "product-design-shell " : ""
      }min-h-screen bg-white text-slate-900 font-['Plus_Jakarta_Sans',sans-serif] selection:bg-slate-900 selection:text-white`}
    >
      {!hasServiceNavigation && activeView !== "home" && (
        <div className="homepage-magenta">
          <Navbar
            embedded={
              activeView === "product-design" ||
              activeView === "web-development" ||
              activeView === "pricing" ||
              isProductPage
            }
            activeRole={activeRole}
            onRoleChange={setActiveRole}
            onBookDemo={(mod) =>
              handleBookDemoWithModule(
                mod || (isProductPage ? activeView : undefined),
              )
            }
            onStartTrial={() => setFreeTrialOpen(true)}
            onNavigate={handleNavigate}
            activeView={activeView}
          />
        </div>
      )}

      <main>
        {activeView === "pricing" && (
          <PricingPage
            onBackToHome={() => handleNavigate("home")}
            onBookDemo={() => handleBookDemoWithModule()}
            onStartTrial={() => setFreeTrialOpen(true)}
          />
        )}
        {activeView === "home" && (
          <>
            <LandingPage
              onNavigate={handleNavigate}
              onBookDemo={() => handleBookDemoWithModule()}
              onStartTrial={() => setFreeTrialOpen(true)}
            />
          </>
        )}

        {activeView === "locum-provision" && (
          <LocumProvisionPage
            onBackToHome={() => handleNavigate("home")}
            onBookDemo={(mod) =>
              handleBookDemoWithModule(mod || "Locum Provision")
            }
            onStartTrial={() => setFreeTrialOpen(true)}
          />
        )}
        {activeView === "recruitment-software" && (
          <RecruitmentSoftwarePage
            showHeader={false}
            onNavigate={handleNavigate}
            onBackToHome={() => handleNavigate("home")}
            onBookDemo={(mod) =>
              handleBookDemoWithModule(mod || "Recruitment Software")
            }
            onStartTrial={() => setFreeTrialOpen(true)}
          />
        )}
        {activeView === "care-management" && (
          <CareManagementPage
            showHeader={false}
            onNavigate={handleNavigate}
            onBackToHome={() => handleNavigate("home")}
            onBookDemo={(mod) =>
              handleBookDemoWithModule(mod || "Care Management Software")
            }
            onStartTrial={() => setFreeTrialOpen(true)}
          />
        )}
        {activeView === "recruitment-service" && (
          <RecruitmentServicePage
            onBackToHome={() => handleNavigate("home")}
            onBookDemo={(mod) =>
              handleBookDemoWithModule(mod || "Recruitment Service")
            }
            onStartTrial={() => setFreeTrialOpen(true)}
          />
        )}
        {activeView === "product-design" && (
          <ProductDesignPage
            onBackToHome={() => handleNavigate("home")}
            onBookDemo={(mod) =>
              handleBookDemoWithModule(mod || "Product Design Service")
            }
          />
        )}
        {activeView === "web-development" && (
          <WebDevelopmentPage
            onBackToHome={() => handleNavigate("home")}
            onBookDemo={(mod) =>
              handleBookDemoWithModule(mod || "Web Development Service")
            }
          />
        )}
      </main>

      {!ownsFooter && activeView !== "home" && (
        <Footer
          onNavigate={handleNavigate}
          onBookDemo={() => handleBookDemoWithModule()}
          onStartTrial={() => setFreeTrialOpen(true)}
        />
      )}

      {isStandaloneLocum ? (
        <LocumContactDialog
          isOpen={bookDemoOpen}
          onClose={() => setBookDemoOpen(false)}
          context={initialDemoModule}
        />
      ) : (
        <BookDemoModal
          isOpen={bookDemoOpen}
          onClose={() => setBookDemoOpen(false)}
          initialModule={initialDemoModule}
        />
      )}
      <FreeTrialModal
        isOpen={freeTrialOpen}
        onClose={() => setFreeTrialOpen(false)}
      />
      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        onBookDemo={() => handleBookDemoWithModule()}
      />
      <ModuleDetailModal
        module={selectedModule}
        isOpen={!!selectedModule}
        onClose={() => setSelectedModule(null)}
        onBookDemo={(modTitle) => handleBookDemoWithModule(modTitle)}
      />
      <CaseStudyModal
        isOpen={caseStudyOpen}
        onClose={() => setCaseStudyOpen(false)}
        onBookDemo={() => handleBookDemoWithModule("Meadowview Case Study")}
      />
    </div>
  )
}

const router = createBrowserRouter([
  { path: "/policies/:policy", Component: PolicyPage },
  { path: "*", Component: PlatformApp },
])

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <RouterProvider router={router} />
    </MotionConfig>
  )
}
