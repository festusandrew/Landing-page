import React, { lazy, Suspense, useRef, useState } from "react"
import { createBrowserRouter, Link, RouterProvider, useLocation, useNavigate } from "react-router"
import { AnimatePresence, domAnimation, LazyMotion, m as motion, MotionConfig } from "motion/react"
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
  Menu,
  X,
  Plus,
  Minus,
} from "lucide-react"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import {
  homepageEase,
  homepageHeroItem,
  homepageHeroSequence,
  ParallaxLayer,
  revealCard,
  revealDraw,
  revealGroup,
  revealImage,
  revealItem,
  RevealLines,
  revealPop,
  useHeroScrollAway,
  useHomepageReducedMotion,
} from "../components/HomepageMotion"
import { Skeleton } from "./components/ui/skeleton"
import recruitmentPhoto from "../imports/homepage-reference/6104b.png"
import locumPhoto from "../imports/homepage-reference/09cba.png"
import carePhoto from "../imports/homepage-reference/ca8d0.png"

import { HOME_VISUALS } from "../data/homeVisuals"

import { PRODUCT_MODULES } from "../data/mockData"
import { getModalTone } from "../data/modalTones"
import { UserRole, ProductModule } from "../types"

const PolicyPage = lazy(() =>
  import("../components/PlatformExperiences").then((module) => ({ default: module.PolicyPage })),
)
const BookDemoModal = lazy(() =>
  import("../components/modals/BookDemoModal").then((module) => ({
    default: module.BookDemoModal,
  })),
)
const LocumContactDialog = lazy(() =>
  import("../components/modals/LocumContactDialog").then((module) => ({
    default: module.LocumContactDialog,
  })),
)
const FreeTrialModal = lazy(() =>
  import("../components/modals/FreeTrialModal").then((module) => ({
    default: module.FreeTrialModal,
  })),
)
const VideoModal = lazy(() =>
  import("../components/modals/VideoModal").then((module) => ({ default: module.VideoModal })),
)
const ModuleDetailModal = lazy(() =>
  import("../components/modals/ModuleDetailModal").then((module) => ({
    default: module.ModuleDetailModal,
  })),
)
const CaseStudyModal = lazy(() =>
  import("../components/modals/CaseStudyModal").then((module) => ({
    default: module.CaseStudyModal,
  })),
)

function PageLoading() {
  return (
    <Skeleton
      role="status"
      aria-label="Loading page"
      className="mx-auto my-12 h-48 w-full max-w-5xl"
    />
  )
}

const PricingPage = lazy(() =>
  import("../components/pages/PricingPage").then((module) => ({ default: module.PricingPage })),
)
const LocumProvisionPage = lazy(() =>
  import("../components/pages/LocumProvisionPage").then((module) => ({
    default: module.LocumProvisionPage,
  })),
)
const RecruitmentSoftwarePage = lazy(() =>
  import("../components/pages/RecruitmentSoftwarePage").then((module) => ({
    default: module.RecruitmentSoftwarePage,
  })),
)
const CareManagementPage = lazy(() =>
  import("../components/pages/CareManagementPage").then((module) => ({
    default: module.CareManagementPage,
  })),
)
const RecruitmentServicePage = lazy(() =>
  import("../components/pages/RecruitmentServicePage").then((module) => ({
    default: module.RecruitmentServicePage,
  })),
)
const ProductDesignPage = lazy(() =>
  import("../components/pages/ProductDesignPage").then((module) => ({
    default: module.ProductDesignPage,
  })),
)
const WebDevelopmentPage = lazy(() =>
  import("../components/pages/WebDevelopmentPage").then((module) => ({
    default: module.WebDevelopmentPage,
  })),
)

// Corporate portraits from Unsplash, cropped around each face for the hero trust stack.
const trustedTeamAvatars = [
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=facearea&facepad=2.5&w=128&h=128&q=80",
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=facearea&facepad=2.5&w=128&h=128&q=80",
  "https://images.unsplash.com/photo-1758691737605-69a0e78bd193?auto=format&fit=facearea&facepad=2.5&w=128&h=128&q=80",
]

const solutions = [
  {
    id: "recruitment-service",
    name: "Recruitment services",
    icon: Users,
    color: "text-[#810161]",
    background: "bg-[#f8eef5]",
    description:
      "The right people. The right fit. A specialist recruitment partner who understands healthcare.",
    features: ["Permanent and international recruitment", "A personal, end-to-end hiring service"],
  },
  {
    id: "locum-provision",
    name: "Locum provision",
    icon: CalendarDays,
    color: "text-[#368B62]",
    background: "bg-[#edf5ef]",
    description:
      "Keep care moving with qualified professionals, exactly when and where you need them.",
    features: ["Flexible, short- and long-term cover", "Professionals across Ireland and the UK"],
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
    features: ["One organised candidate pipeline", "Job posting and applicant tracking"],
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
  const reducedMotion = useHomepageReducedMotion()
  const heroRef = useRef<HTMLElement>(null)
  const heroScroll = useHeroScrollAway(heroRef, reducedMotion)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const buttonMotion = {
    whileHover: reducedMotion ? undefined : { y: -3, transition: { duration: 0.18 } },
    whileTap: reducedMotion ? undefined : { scale: 0.98, transition: { duration: 0.1 } },
  }
  const primaryButton =
    "inline-flex items-center justify-center gap-3 rounded-lg bg-[#368B62] px-6 py-3.5 text-control font-semibold text-white transition-colors hover:bg-[#286d4c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#368B62]"
  const secondaryButton =
    "inline-flex items-center justify-center gap-3 rounded-lg border border-black/5 bg-white px-6 py-3.5 text-control font-semibold text-[#233b35] transition-colors hover:bg-[#edf5ef] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#368B62]"
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
    document.getElementById(id)?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
    })
  }
  return (
    <LazyMotion features={domAnimation} strict>
      <div
        id="overview"
        className="homepage-magenta bg-white font-sans text-[#233b35] selection:bg-[#dfeee4] [&_button]:cursor-pointer motion-reduce:[&_*]:transition-none"
      >
        <div className="homepage-intro bg-white">
          <div className="homepage-header relative bg-white">
            <Navbar
              embedded
              onNavigate={onNavigate}
              onBookDemo={onBookDemo}
              onStartTrial={onStartTrial}
            />
          </div>

          <section
            ref={heroRef}
            aria-labelledby="homepage-hero-heading"
            className="homepage-hero relative isolate overflow-hidden px-6 text-center"
          >
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 origin-bottom"
              style={heroScroll.glow}
            >
              <motion.div
                className="homepage-hero-glow absolute inset-0"
                initial={reducedMotion ? false : { opacity: 0.55, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: reducedMotion ? 0 : 1.2, ease: homepageEase }}
              />
            </motion.div>
            <motion.div
              className="site-content w-full"
              style={heroScroll.content}
              variants={reducedMotion ? undefined : homepageHeroSequence}
              initial={reducedMotion ? false : "hidden"}
              animate={reducedMotion ? undefined : "visible"}
            >
              <motion.div
                variants={homepageHeroItem}
                className="homepage-hero-trust flex flex-wrap items-center justify-center gap-4"
              >
                <div className="flex -space-x-[13px]" aria-hidden="true">
                  {trustedTeamAvatars.map((src) => (
                    <img
                      key={src}
                      src={src}
                      alt=""
                      className="h-[43.327px] w-[43.327px] rounded-full object-cover"
                    />
                  ))}
                </div>
                <p className="flex flex-wrap items-baseline justify-center gap-3 font-sans text-lead font-normal text-[#475569]">
                  Trusted by{" "}
                  <strong className="font-display text-stat font-normal text-[#0f172a]">2K+</strong>{" "}
                  teams
                </p>
              </motion.div>
              <h1 id="homepage-hero-heading" className="font-display text-hero font-normal">
                <RevealLines
                  lines={[
                    "Better people. Better care.",
                    <>
                      All connected<span className="text-[#368B62]">.</span>
                    </>,
                  ]}
                />
              </h1>
              <motion.p
                variants={homepageHeroItem}
                className="homepage-hero-description mx-auto max-w-3xl font-sans text-lead font-normal text-[#68736e]"
              >
                Recruitment, locum staffing and care management — brought together. <br />
                So you can focus on what matters most: people.
              </motion.p>
              <motion.div
                variants={homepageHeroItem}
                data-home-reveal=""
                className="homepage-hero-actions flex flex-wrap justify-center gap-3"
              >
                <motion.button {...buttonMotion} onClick={onBookDemo} className={primaryButton}>
                  Book a demo <ArrowUpRight size={16} />
                </motion.button>
                <motion.button
                  {...buttonMotion}
                  onClick={() => scrollTo("solutions")}
                  className={secondaryButton}
                >
                  Explore our solutions
                </motion.button>
              </motion.div>
            </motion.div>
          </section>
        </div>

        <section
          aria-label="Our healthcare services"
          className="site-inset grid gap-[3px] sm:grid-cols-3"
        >
          {photos.map((photo, index) => (
            <motion.button
              {...revealImage(reducedMotion, index * 0.12)}
              {...buttonMotion}
              key={photo.id}
              onClick={() => onNavigate(photo.id)}
              className="group relative min-h-[350px] overflow-hidden text-left md:min-h-[400px]"
            >
              <ParallaxLayer className="absolute inset-0">
                <img
                  src={photo.image}
                  alt={photo.alt}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none"
                />
              </ParallaxLayer>
              <div className="homepage-service-overlay absolute inset-0" />
              <motion.div
                {...revealItem}
                className="absolute bottom-0 left-0 right-0 p-7 text-white lg:p-10"
              >
                <span className={`mb-5 inline-block h-1 w-8 ${photo.tint}`} />
                <p className="mb-3 text-eyebrow font-medium text-white/80">{photo.category}</p>
                <h2 className="whitespace-pre-line font-display text-card-display font-normal">
                  {photo.title}
                </h2>
                <div className="mt-6 flex items-center justify-between text-caption">
                  <span>{photo.label}</span>
                  <img
                    src={HOME_VISUALS.photoArrows[index]}
                    alt=""
                    className="shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </div>
              </motion.div>
            </motion.button>
          ))}
        </section>

        <section id="about" className="site-container py-16 md:py-20">
          <motion.div
            {...revealGroup(reducedMotion)}
            className="grid gap-8 md:grid-cols-2 md:gap-20"
          >
            <div>
              <motion.p {...revealItem} className="mb-4 text-eyebrow font-semibold text-[#368B62]">
                MEET MPLOYUS
              </motion.p>
              <h2 className="font-display text-section font-normal">
                <RevealLines lines={["Healthcare works better", "when we work together."]} />
              </h2>
            </div>
            <div className="pt-2 text-body text-[#68736e]">
              <motion.p {...revealItem}>
                Great care starts with great people. But finding them, supporting them and managing
                the everyday shouldn’t stand in the way.
              </motion.p>
              <motion.p {...revealItem} className="mt-4">
                MployUs brings your people and processes together. One connected partner for the way
                healthcare works today — and where it goes tomorrow.
              </motion.p>
              <motion.button
                {...revealItem}
                onClick={onBookDemo}
                className="mt-5 flex items-center gap-2 font-semibold text-[#233b35] hover:text-[#368B62]"
              >
                Let’s talk about your team <ArrowRight size={15} />
              </motion.button>
            </div>
          </motion.div>
        </section>

        <section id="solutions" className="bg-[#f6f7f3] py-16 md:py-24">
          <div className="site-container grid gap-12 lg:grid-cols-[0.8fr_1.5fr] lg:gap-16">
            <motion.div {...revealGroup(reducedMotion)} className="lg:pt-3">
              <motion.p {...revealItem} className="mb-5 text-eyebrow font-semibold text-[#368B62]">
                ONE PARTNER. MORE POSSIBILITIES.
              </motion.p>
              <h2 className="font-display text-section font-normal">
                <RevealLines lines={["Everything you need.", "Better, together."]} />
              </h2>
              <motion.p {...revealItem} className="mt-6 max-w-sm text-body text-[#68736e]">
                Find your next team member. Cover your next shift. Simplify your care operations.
                Choose what you need, and we’ll help you move forward.
              </motion.p>
              <motion.button
                {...revealItem}
                onClick={onBookDemo}
                className={`${primaryButton} mt-7`}
              >
                Find your solution <ArrowUpRight size={15} />
              </motion.button>
              <motion.p {...revealItem} className="mt-5 text-caption text-[#7b837e]">
                A real conversation. A solution that fits.
              </motion.p>
            </motion.div>
            <div className="grid gap-4 sm:grid-cols-2">
              {solutions.map((solution, solutionIndex) => (
                <motion.div
                  {...revealCard(reducedMotion, solutionIndex * 0.08)}
                  key={solution.id}
                  className="grid"
                >
                  <motion.article
                    whileHover={
                      reducedMotion ? undefined : { y: -4, transition: { duration: 0.2 } }
                    }
                    className="homepage-solution-card group flex flex-col rounded-lg border border-black/5 bg-white p-7 transition-colors"
                  >
                    <motion.div
                      {...revealPop}
                      className={`mb-5 flex h-10 w-10 items-center justify-center rounded-lg ${solution.background} ${solution.color}`}
                    >
                      <img
                        src={HOME_VISUALS.solutions[solutionIndex].icon}
                        alt=""
                        className="shrink-0"
                      />
                    </motion.div>
                    <h3 className="text-title font-semibold font-sans">{solution.name}</h3>
                    <p className="mb-5 mt-3 text-body text-[#68736e]">{solution.description}</p>
                    <ul className="mb-7 space-y-3">
                      {solution.features.map((feature, featureIndex) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-control text-[#68736e]"
                        >
                          <img
                            src={HOME_VISUALS.solutions[solutionIndex].checks[featureIndex]}
                            alt=""
                            className="mt-1 shrink-0"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => onNavigate(solution.id)}
                      className="mt-auto flex items-center gap-2 text-control font-semibold"
                    >
                      Explore {solution.name.toLowerCase()}{" "}
                      <img
                        src={HOME_VISUALS.solutions[solutionIndex].arrow}
                        alt=""
                        className="shrink-0 transition-transform group-hover:translate-x-1"
                      />
                    </button>
                  </motion.article>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          aria-labelledby="how-it-works-heading"
          className="scroll-mt-6 bg-[#e9f0e7] py-16 md:py-[108.169px]"
        >
          <div className="site-container">
            <motion.div
              {...revealGroup(reducedMotion)}
              className="flex flex-wrap items-end justify-between gap-8"
            >
              <div>
                <motion.p
                  {...revealItem}
                  className="font-sans text-eyebrow font-semibold text-[#368B62]"
                >
                  A LITTLE LESS COMPLEXITY
                </motion.p>
                <h2
                  id="how-it-works-heading"
                  className="mt-[21.634px] font-display text-section font-normal"
                >
                  <RevealLines lines={["More connected.", "More time for care."]} />
                </h2>
              </div>
              <motion.p
                {...revealItem}
                className="max-w-[519.211px] font-sans text-lead font-normal text-[#68736e]"
              >
                Healthcare is human. Your systems should be too.
                <br />
                We make the complicated feel a little simpler.
              </motion.p>
            </motion.div>
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
              ].map((step, index) => (
                <motion.article
                  {...revealGroup(reducedMotion, { delay: index * 0.12 })}
                  key={step.number}
                  className="relative min-w-0 border-t border-transparent pt-8 lg:pt-[51.19px]"
                >
                  {/* The visible divider draws in over the reserved 1px border. */}
                  <motion.span
                    {...revealDraw}
                    aria-hidden="true"
                    className="absolute inset-x-0 -top-px h-px origin-left bg-black/5"
                  />
                  <p
                    aria-hidden="true"
                    className="font-sans text-step font-semibold text-[#368B62]/10"
                  >
                    <RevealLines lines={[step.number]} />
                  </p>
                  <motion.h3
                    {...revealItem}
                    className="font-sans text-title font-semibold text-[#0f172a]"
                  >
                    {step.title}
                  </motion.h3>
                  <motion.p
                    {...revealItem}
                    className="mt-[21.938px] font-sans text-body font-normal text-[#62748e]"
                  >
                    {step.body}
                  </motion.p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="site-container grid items-center gap-10 py-20 md:grid-cols-2 md:gap-20">
          <motion.div
            {...revealImage(reducedMotion)}
            className="relative isolate overflow-hidden rounded-lg"
          >
            <ParallaxLayer distance={3}>
              <img
                src={photos[0].image}
                alt="A healthcare professional ready to support your team"
                loading="lazy"
                className="h-[380px] w-full object-cover object-top"
              />
            </ParallaxLayer>
            <motion.div
              {...revealItem}
              className="absolute bottom-5 left-5 right-5 rounded-lg bg-[#fffffff2] p-5"
            >
              <p className="text-eyebrow font-semibold text-[#368B62]">
                FOR THE PEOPLE BEHIND THE CARE
              </p>
              <p className="mt-2 font-display text-lead">Your next chapter starts here.</p>
            </motion.div>
          </motion.div>
          <motion.div {...revealGroup(reducedMotion, { delay: 0.1 })}>
            <motion.p {...revealItem} className="mb-5 text-eyebrow font-semibold text-[#368B62]">
              HEALTHCARE PROFESSIONALS
            </motion.p>
            <h2 className="font-display text-section font-normal">
              <RevealLines lines={["A career that cares", "for you, too."]} />
            </h2>
            <motion.p {...revealItem} className="mt-5 text-body text-[#68736e]">
              Looking for your next permanent role or the flexibility of locum work? We’ll help you
              find opportunities that fit your skills, your ambitions and your life.
            </motion.p>
            <motion.div {...revealItem} className="mt-7 flex flex-wrap gap-3">
              <motion.button
                {...buttonMotion}
                onClick={() => onNavigate("recruitment-service")}
                className="inline-flex items-center gap-3 rounded-lg bg-[#368B62] px-6 py-3.5 text-control font-semibold text-white transition-colors hover:bg-[#286d4c]"
              >
                Explore opportunities <ArrowUpRight size={15} />
              </motion.button>
              <motion.button
                {...buttonMotion}
                onClick={() => onNavigate("locum-provision")}
                className={secondaryButton}
              >
                Become a locum
              </motion.button>
            </motion.div>
          </motion.div>
        </section>

        <section id="questions" className="border-t border-black/5 bg-[#fafaf8] py-16 md:py-20">
          <div className="site-container grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-20">
            <motion.div {...revealGroup(reducedMotion)}>
              <motion.p {...revealItem} className="mb-5 text-eyebrow font-semibold text-[#368B62]">
                GOOD TO KNOW
              </motion.p>
              <h2 className="font-display text-section font-normal">
                <RevealLines lines={["A few questions.", "Clear answers."]} />
              </h2>
              <motion.button
                {...revealItem}
                onClick={onBookDemo}
                className="mt-7 flex items-center gap-2 text-control font-semibold"
              >
                Talk to our team <ArrowRight size={15} />
              </motion.button>
            </motion.div>
            <motion.div {...revealGroup(reducedMotion, { delay: 0.15, stagger: 0.08 })}>
              {faqs.map(([question, answer], index) => (
                <motion.div {...revealItem} key={question} className="border-b border-black/5">
                  <button
                    aria-expanded={openFaq === index}
                    aria-controls={`faq-${index}`}
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="flex w-full items-center justify-between gap-5 py-5 text-left text-control font-medium"
                  >
                    {question}
                    {openFaq === index ? (
                      <Minus size={16} className="shrink-0 text-[#368B62]" />
                    ) : (
                      <Plus size={16} className="shrink-0" />
                    )}
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === index && (
                      <motion.div
                        key={question}
                        id={`faq-${index}`}
                        initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reducedMotion ? 0 : 0.24, ease: homepageEase }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 pr-8 text-body text-[#68736e]">{answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="bg-[#173e30] py-16 md:py-20">
          <motion.div
            {...revealGroup(reducedMotion)}
            className="site-container flex min-w-0 flex-wrap items-center justify-between gap-8"
          >
            <div>
              <motion.p {...revealItem} className="mb-4 text-eyebrow font-medium text-[#b1ccbb]">
                LET’S MAKE BETTER HAPPEN
              </motion.p>
              <h2 className="font-display text-section text-white font-normal">
                <RevealLines lines={["Better healthcare starts", "with a conversation."]} />
              </h2>
            </div>
            <div>
              <motion.div {...revealItem} className="flex flex-wrap gap-3">
                <motion.button {...buttonMotion} onClick={onBookDemo} className={primaryButton}>
                  Book a demo <ArrowUpRight size={15} />
                </motion.button>
                <motion.button {...buttonMotion} onClick={onStartTrial} className={secondaryButton}>
                  Get started
                </motion.button>
              </motion.div>
              <motion.p {...revealItem} className="mt-4 text-caption text-[#b1ccbb]">
                Your people. Your purpose. Our partnership.
              </motion.p>
            </div>
          </motion.div>
        </section>
        <Footer onNavigate={onNavigate} onBookDemo={onBookDemo} onStartTrial={onStartTrial} />
      </div>
    </LazyMotion>
  )
}

function PlatformApp() {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeRole, setActiveRole] = useState<UserRole>("all")
  const requestedView = location.pathname.replace(/^\/+|\/+$/g, "")
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
  const [selectedModule, setSelectedModule] = useState<ProductModule | null>(null)
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
  const isProductPage = activeView === "care-management" || activeView === "recruitment-software"
  const ownsFooter = hasServiceNavigation || isProductPage
  const modalTone = getModalTone(activeView)

  return (
    <div
      className={`${activeView === "pricing" ? "homepage-magenta " : ""}${
        activeView === "product-design"
          ? "product-design-shell "
          : activeView === "web-development"
            ? "web-development-shell "
            : ""
      }marketing-typography min-h-screen bg-white text-slate-900 font-sans selection:bg-slate-900 selection:text-white`}
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
              handleBookDemoWithModule(mod || (isProductPage ? activeView : undefined))
            }
            onStartTrial={() => setFreeTrialOpen(true)}
            onNavigate={handleNavigate}
            activeView={activeView}
          />
        </div>
      )}

      <main>
        <Suspense fallback={<PageLoading />}>
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
              onBookDemo={(mod) => handleBookDemoWithModule(mod || "Locum Provision")}
              onStartTrial={() => setFreeTrialOpen(true)}
            />
          )}
          {activeView === "recruitment-software" && (
            <RecruitmentSoftwarePage
              showHeader={false}
              onNavigate={handleNavigate}
              onBackToHome={() => handleNavigate("home")}
              onBookDemo={(mod) => handleBookDemoWithModule(mod || "Recruitment Software")}
              onStartTrial={() => setFreeTrialOpen(true)}
            />
          )}
          {activeView === "care-management" && (
            <CareManagementPage
              showHeader={false}
              onNavigate={handleNavigate}
              onBackToHome={() => handleNavigate("home")}
              onBookDemo={(mod) => handleBookDemoWithModule(mod || "Care Management Software")}
              onStartTrial={() => setFreeTrialOpen(true)}
            />
          )}
          {activeView === "recruitment-service" && (
            <RecruitmentServicePage
              onBackToHome={() => handleNavigate("home")}
              onBookDemo={(mod) => handleBookDemoWithModule(mod || "Recruitment Service")}
              onStartTrial={() => setFreeTrialOpen(true)}
            />
          )}
          {activeView === "product-design" && (
            <ProductDesignPage
              onBackToHome={() => handleNavigate("home")}
              onBookDemo={(mod) => handleBookDemoWithModule(mod || "Product Design Service")}
            />
          )}
          {activeView === "web-development" && (
            <WebDevelopmentPage
              onBackToHome={() => handleNavigate("home")}
              onBookDemo={(mod) => handleBookDemoWithModule(mod || "Web Development Service")}
            />
          )}
        </Suspense>
      </main>

      {!ownsFooter && activeView !== "home" && (
        <Footer
          onNavigate={handleNavigate}
          onBookDemo={() => handleBookDemoWithModule()}
          onStartTrial={() => setFreeTrialOpen(true)}
        />
      )}

      <Suspense fallback={null}>
        {bookDemoOpen &&
          (isStandaloneLocum ? (
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
              tone={modalTone}
            />
          ))}
        {freeTrialOpen && (
          <FreeTrialModal
            isOpen={freeTrialOpen}
            onClose={() => setFreeTrialOpen(false)}
            tone={modalTone}
          />
        )}
        {videoModalOpen && (
          <VideoModal
            isOpen={videoModalOpen}
            onClose={() => setVideoModalOpen(false)}
            onBookDemo={() => handleBookDemoWithModule()}
          />
        )}
        {selectedModule && (
          <ModuleDetailModal
            module={selectedModule}
            isOpen={!!selectedModule}
            onClose={() => setSelectedModule(null)}
            onBookDemo={(modTitle) => handleBookDemoWithModule(modTitle)}
            tone={modalTone}
          />
        )}
        {caseStudyOpen && (
          <CaseStudyModal
            isOpen={caseStudyOpen}
            onClose={() => setCaseStudyOpen(false)}
            onBookDemo={() => handleBookDemoWithModule("Meadowview Case Study")}
            tone={modalTone}
          />
        )}
      </Suspense>
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
      <Suspense fallback={<PageLoading />}>
        <RouterProvider router={router} />
      </Suspense>
    </MotionConfig>
  )
}
