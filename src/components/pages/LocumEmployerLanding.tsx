import { LOCUM_VISUALS } from "../../data/locumVisuals"
import { useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Clock3,
  FileCheck2,
  HeartPulse,
  LockKeyhole,
  MapPin,
  ShieldCheck,
  Stethoscope,
  Users,
  Zap,
} from "lucide-react"
import { Link } from "react-router"

type Props = {
  country: string
  onRequest: (urgent?: boolean) => void
  onRegister: () => void
  onLogin: () => void
  onTalk: () => void
}

const workflow = [
  {
    title: "Tell us what care needs",
    label: "Create your brief",
    icon: ClipboardList,
    description:
      "Choose the profession, location, dates and rate. Add the practical details that help a professional decide whether your shift is the right fit.",
    checklist: [
      "Profession & specialisation",
      "Dates, paid hours & location",
      "Rate, responsibilities & requirements",
    ],
  },
  {
    title: "See the person behind the profile",
    label: "Review applications",
    icon: Users,
    description:
      "Review experience, availability and the documents relevant to your role and region. Make an informed choice, not a last-minute guess.",
    checklist: [
      "Relevant experience & availability",
      "Professional registration",
      "Role-appropriate compliance information",
    ],
  },
  {
    title: "Make the handover clear",
    label: "Agree the booking",
    icon: CheckCircle2,
    description:
      "Agree the complete brief in writing. Confirm the site contact, working arrangements, pay and cancellation terms before the shift starts.",
    checklist: [
      "Written brief & booking terms",
      "Arrival contact & induction",
      "Pay, expenses & cancellation arrangements",
    ],
  },
  {
    title: "Keep the admin connected",
    label: "Manage the shift",
    icon: CalendarDays,
    description:
      "Bring postings, applicant review, booking updates and timesheets together in your employer workflow, rather than across disconnected conversations.",
    checklist: [
      "Postings & applicant records",
      "Booking updates & notifications",
      "Timesheets & shift history",
    ],
  },
]

export function LocumEmployerLanding({
  country,
  onRequest,
  onRegister,
  onLogin,
  onTalk,
}: Props) {
  const [activeStep, setActiveStep] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const reducedMotion = useReducedMotion()
  const step = workflow[activeStep]
  const reveal = {
    initial: { opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-30px" },
    transition: { duration: 0.5 },
  }
  const primary =
    "group inline-flex items-center justify-center gap-3 rounded-full bg-[#368B62] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#286d4c] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-black/5"
  const faqs = [
    {
      question: "Can I request urgent cover or plan ahead?",
      answer:
        "Both. Choose last-minute cover for an urgent brief, or planned cover for annual leave, rota gaps and a recurring need. Include the exact dates and requirements. Availability and a booking are not guaranteed until the professional and facility agree the terms.",
    },
    {
      question: "Which professions and facilities can use MployUs?",
      answer:
        "The registration flow supports doctors, nurses and midwives, pharmacists, healthcare assistants, allied health professionals and dentists. Tell us the role and setting so the required qualifications and checks can be reviewed. Live availability depends on your region and requirements.",
    },
    {
      question: "How do compliance requirements vary by region?",
      answer:
        "Requirements depend on profession and role. Ireland may require Garda vetting; England and Wales use role-appropriate DBS checks; Scotland uses Disclosure Scotland / PVG where applicable; and Northern Ireland uses AccessNI. Pharmacy registration is with PSI in Ireland, GPhC in Great Britain and PSNI in Northern Ireland. Verify the relevant requirements before confirming a booking.",
    },
    {
      question: "How do I advertise a permanent role?",
      answer:
        "Permanent jobs are separate from locum shifts. Contact the MployUs recruitment team with your role requirements. The team will review the brief and arrange posting on the recruitment site; permanent roles cannot be self-posted through the locum shift form.",
    },
    {
      question: "What should I confirm before accepting a locum?",
      answer:
        "Confirm the exact workplace, duties, dates, paid hours, breaks, rate, engagement status, payment arrangements, expenses, eligibility and cancellation terms in writing. Share an arrival contact and any induction or reasonable-adjustment arrangements.",
    },
  ]

  return (
    <div className="locum-employer locum-surface bg-white pt-[70px] text-[#24332d]">
      <section className="site-container pb-12 pt-10 lg:pt-14">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <p className="flex items-center gap-2 text-eyebrow font-semibold uppercase text-[#368B62]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#368B62]" />
            For the people keeping care moving
          </p>
        </div>
        <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_1fr] lg:gap-14">
          <motion.div {...reveal}>
            <h1 className="text-hero font-normal font-display">
              Care doesn’t pause.
              <br />
              <span className="text-[#368B62]">
                Neither should
                <br className="hidden sm:block" /> your team.
              </span>
            </h1>
            <p className="mt-6 max-w-[430px] text-body text-slate-500">
              A rota gap is more than an empty slot. Find the right healthcare
              professional to support your team, protect continuity and keep
              your attention on care.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => onRequest()} className={primary}>
                Request locum cover
                <img
                  src={LOCUM_VISUALS.employer.heroArrow[0]}
                  alt=""
                  className="locum-reference-icon"
                />
              </button>
              <button
                onClick={onTalk}
                className="inline-flex items-center gap-2 rounded-full border border-black/5 px-6 py-3.5 text-control font-medium transition-colors hover:bg-[#edf4ef]"
              >
                Talk to our team
                <img
                  src={LOCUM_VISUALS.employer.talkArrow[0]}
                  alt=""
                  className="locum-reference-icon"
                />
              </button>
            </div>
            <p className="mt-4 text-caption text-slate-400">
              A facility account is needed to manage bookings.
            </p>
            <div className="mt-9 flex flex-wrap gap-x-5 gap-y-3 text-caption text-[#53685b]">
              {[
                "Urgent & planned cover",
                "Temporary locum shifts",
                "Region-aware requirements",
              ].map((label, index) => (
                <span key={label} className="flex items-center gap-1.5">
                  <img
                    src={LOCUM_VISUALS.employer.heroChecks[index]}
                    alt=""
                    className="locum-reference-icon"
                  />
                  {label}
                </span>
              ))}
            </div>
          </motion.div>
          <motion.div
            {...reveal}
            className="relative overflow-hidden rounded-[28px] bg-[#eef2ef]"
          >
            <img
              src="/images/locum-employer-team.jpg"
              width="1200"
              height="822"
              alt="A healthcare team walking together through a hospital corridor"
              className="h-[390px] w-full object-cover sm:h-[480px] lg:h-[540px]"
            />
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-3 rounded-2xl bg-white/95 p-5">
              <div>
                <p className="text-eyebrow uppercase text-slate-500">
                  Behind every well-covered shift
                </p>
                <p className="mt-1.5 text-lead font-medium">
                  A team that can keep caring.
                </p>
              </div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e4eee7]">
                <img
                  src={LOCUM_VISUALS.employer.heart[0]}
                  alt=""
                  className="locum-reference-icon"
                />
              </span>
            </div>
          </motion.div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-5 border-t border-black/5 pt-6 text-caption text-slate-500">
          <p className="text-eyebrow uppercase text-slate-400">
            Built around your care setting
          </p>
          {[
            { icon: Building2, label: "Community pharmacies" },
            { icon: Stethoscope, label: "Hospitals & clinics" },
            { icon: HeartPulse, label: "Care providers" },
          ].map((item, index) => (
            <span key={item.label} className="flex items-center gap-2">
              <img
                src={LOCUM_VISUALS.employer.settings[index]}
                alt=""
                className="locum-reference-icon"
              />
              {item.label}
            </span>
          ))}
        </div>
      </section>

      <section className="site-container py-14">
        <motion.div
          {...reveal}
          className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end"
        >
          <div>
            <p className="text-eyebrow font-semibold uppercase text-[#368B62]">
              Temporary locum cover
            </p>
            <h2 className="mt-4 text-section font-normal font-display">
              Today. Next week. Long term.
            </h2>
          </div>
          <p className="max-w-sm text-body text-slate-500">
            One unexpected absence or your next permanent colleague. Give us the
            brief that fits.
          </p>
        </motion.div>
        <div className="locum-cover-options grid gap-4 md:grid-cols-3">
          {[
            {
              icon: Zap,
              title: "Last-minute cover",
              eyebrow: "WHEN THE ROTA CHANGES",
              copy: "An unexpected absence shouldn’t mean an unclear brief. Set the date, rate and must-have requirements, and mark your request as urgent.",
              action: "Build an urgent request",
              urgent: true,
              tint: "bg-[#e4eee7]",
            },
            {
              icon: CalendarDays,
              title: "Planned locum support",
              eyebrow: "A LITTLE MORE BREATHING ROOM",
              copy: "Plan around annual leave, busy periods and scheduled gaps. Help the right professional understand your team and the cover you need.",
              action: "Plan your locum cover",
              urgent: false,
              tint: "bg-[#f0f2ed]",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              {...reveal}
              className={`flex flex-col rounded-3xl p-7 ${item.tint}`}
            >
              <div className="mb-9 flex items-center justify-between">
                <img
                  src={LOCUM_VISUALS.employer.cards[index]}
                  alt=""
                  className="locum-reference-icon"
                />
              </div>
              <p className="text-eyebrow font-semibold text-[#67786d]">
                {item.eyebrow}
              </p>
              <h3 className="mt-3 text-title font-semibold font-sans">{item.title}</h3>
              <p className="mb-7 mt-3 text-body text-slate-500">
                {item.copy}
              </p>
              <button
                onClick={() => onRequest(item.urgent)}
                className="group mt-auto flex items-center justify-between gap-3 border-t border-black/5 pt-5 text-left text-control font-semibold text-[#368B62]"
              >
                {item.action}
                <img
                  src={LOCUM_VISUALS.employer.cardArrows[index]}
                  alt=""
                  className="locum-reference-icon"
                />
              </button>
            </motion.div>
          ))}
          <motion.article
            {...reveal}
            className="flex flex-col rounded-3xl bg-[#f7f0e5] p-7"
            aria-labelledby="permanent-recruitment-heading"
          >
            <div className="mb-9">
              <img
                src={LOCUM_VISUALS.employer.cards[2]}
                alt=""
                className="locum-reference-icon"
              />
            </div>
            <p className="text-eyebrow font-semibold text-[#67786d]">
              THE RIGHT LONG-TERM FIT
            </p>
            <h3
              id="permanent-recruitment-heading"
              className="mt-3 text-title font-semibold font-sans"
            >
              Your next permanent hire
            </h3>
            <p className="mb-7 mt-3 text-body text-slate-500">
              Go beyond filling a shift. Share the role, contract, salary and
              responsibilities with MployUs Recruitment. Our team reviews and
              arranges permanent job postings on the recruitment site, not the
              locum platform.
            </p>
            <Link
              to="/recruitment-service?recruitment-enquiry=permanent"
              className="group mt-auto flex items-center justify-between gap-3 border-t border-black/5 pt-5 text-left text-control font-semibold text-[#368B62]"
            >
              Create a permanent brief
              <img
                src={LOCUM_VISUALS.employer.cardArrows[2]}
                alt=""
                className="locum-reference-icon"
              />
            </Link>
          </motion.article>
        </div>
      </section>

      <section className="bg-[#f7f9f8] px-6 py-20">
        <div className="site-content grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <motion.div {...reveal}>
            <p className="text-eyebrow font-semibold uppercase text-[#368B62]">
              Less chasing. More clarity.
            </p>
            <h2 className="mt-5 text-section font-normal font-display">
              The whole booking.
              <br />
              Not another inbox.
            </h2>
            <p className="mt-5 max-w-md text-body text-slate-500">
              From the first brief to the completed shift, your facility needs a
              clear view of the people, paperwork and arrangements behind the
              cover.
            </p>
            <div className="mt-8 space-y-4">
              {workflow.map((item, index) => (
                <button
                  key={item.label}
                  onClick={() => setActiveStep(index)}
                  aria-pressed={activeStep === index}
                  className={`flex w-full items-center gap-4 rounded-2xl p-4 text-left transition-colors ${
                    activeStep === index ? "bg-white" : "hover:bg-white/60"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-caption ${
                      activeStep === index
                        ? "bg-[#368B62] text-white"
                        : "bg-[#e9efeb] text-[#82978a]"
                    }`}
                  >
                    0{index + 1}
                  </span>
                  <span className="text-control font-medium">{item.label}</span>
                  {activeStep === index && (
                    <img
                      src={LOCUM_VISUALS.employer.workflow[0]}
                      alt=""
                      className="locum-reference-icon ml-auto"
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
          <motion.div
            {...reveal}
            className="flex flex-col rounded-[28px] bg-[#e4eee7] p-7 sm:p-10"
          >
            <div className="flex items-center justify-between">
              <span className="text-caption uppercase tracking-widest text-[#67786d]">
                Employer workspace
              </span>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white">
                {activeStep === 0 ? (
                  <img
                    src={LOCUM_VISUALS.employer.workflow[1]}
                    alt=""
                    className="locum-reference-icon"
                  />
                ) : (
                  <step.icon className="h-5 w-5 text-[#368B62]" />
                )}
              </span>
            </div>
            <div key={activeStep} role="status" className="my-auto py-10">
              <p className="text-body text-[#82978a]">0{activeStep + 1} / 04</p>
              <h3 className="mt-4 text-title font-semibold font-sans">
                {step.title}
              </h3>
              <p className="mt-5 text-body text-[#64756b]">
                {step.description}
              </p>
              <div className="mt-7 space-y-3">
                {step.checklist.map((label, index) => (
                  <div
                    key={label}
                    className="flex items-start gap-3 rounded-xl bg-white/75 p-4 text-control"
                  >
                    <img
                      src={LOCUM_VISUALS.employer.workflow[index + 2]}
                      alt=""
                      className="locum-reference-icon mt-0.5"
                    />
                    {label}
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={onLogin}
              className="flex items-center justify-between border-t border-black/5 pt-5 text-left text-control font-semibold text-[#368B62]"
            >
              Sign in to your employer account
              <img
                src={LOCUM_VISUALS.employer.workflow[5]}
                alt=""
                className="locum-reference-icon"
              />
            </button>
          </motion.div>
        </div>
      </section>

      <section className="site-container grid gap-10 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <motion.div {...reveal}>
          <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf4ef]">
            <img
              src={LOCUM_VISUALS.employer.context[0]}
              alt=""
              className="locum-reference-icon"
            />
          </span>
          <p className="text-eyebrow font-semibold uppercase text-[#368B62]">
            Local requirements. A considered approach.
          </p>
          <h2 className="mt-5 text-section font-normal font-display">
            Care crosses regions.
            <br />
            Compliance needs context.
          </h2>
          <p className="mt-5 text-body text-slate-500">
            Ireland, Northern Ireland, England, Wales and Scotland each bring
            different requirements. Start with the profession, the role and the
            place—not a one-size-fits-all checklist.
          </p>
          <Link
            to="/policies/data-protection"
            className="mt-6 inline-flex items-center gap-2 text-control font-semibold text-[#368B62]"
          >
            Read about data protection
            <img
              src={LOCUM_VISUALS.employer.context[1]}
              alt=""
              className="locum-reference-icon"
            />
          </Link>
        </motion.div>
        <div className="space-y-0">
          {[
            {
              icon: FileCheck2,
              title: "A meaningful compliance review",
              copy: "Professional registration, right to work, relevant vetting and indemnity should be reviewed against the role’s actual requirements.",
            },
            {
              icon: Clock3,
              title: "Clear arrangements before day one",
              copy: "Agree paid hours, breaks, duties, rates and cancellation terms. Give your locum a named contact and a practical handover.",
            },
            {
              icon: Bell,
              title: "Keep both sides informed",
              copy: "Use your employer workflow to bring applications, booking changes and timesheets into a connected view.",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              {...reveal}
              className="flex gap-5 border-b border-black/5 py-6 first:pt-0 last:border-b-0"
            >
              <img
                src={LOCUM_VISUALS.employer.context[index + 2]}
                alt=""
                className="locum-reference-icon mt-1"
              />
              <div>
                <h3 className="text-body font-medium">{item.title}</h3>
                <p className="mt-2 text-body text-slate-500">
                  {item.copy}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="site-container pb-20">
        <div className="grid gap-8 rounded-[28px] bg-[#f7f9f8] p-7 sm:p-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-eyebrow font-semibold uppercase text-[#368B62]">
              Before your first request
            </p>
            <h2 className="mt-5 text-section font-normal font-display">A few useful answers.</h2>
            <p className="mt-4 text-body text-slate-500">
              Still need a hand? We can talk through your facility’s staffing
              needs.
            </p>
            <button
              onClick={onTalk}
              className="mt-5 inline-flex items-center gap-2 text-control font-semibold text-[#368B62]"
            >
              Talk to our team
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <div>
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="border-b border-black/5 last:border-b-0"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  aria-expanded={openFaq === index}
                  aria-controls={`employer-answer-${index}`}
                  className="flex w-full items-center justify-between gap-5 py-5 text-left text-control font-medium"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-[#368B62] transition-transform ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  id={`employer-answer-${index}`}
                  hidden={openFaq !== index}
                  className="pb-5 text-control text-slate-500"
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="site-container pb-16">
        <motion.div
          {...reveal}
          className="flex flex-col justify-between gap-8 rounded-[28px] bg-[#243e31] p-8 text-white sm:p-12 lg:flex-row lg:items-center"
        >
          <div>
            <p className="text-eyebrow uppercase text-[#b1c7b8]">
              Your people. Their care.
            </p>
            <h2 className="mt-4 text-section font-normal font-display">
              Make room for a better-covered team.
            </h2>
            <p className="mt-4 max-w-lg text-body text-[#b1c7b8]">
              Create a facility account to start organising your staffing needs,
              or talk to us about the cover you have in mind.
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-start gap-4">
            <button
              onClick={onRegister}
              className="group inline-flex items-center gap-4 rounded-full bg-white px-6 py-3.5 text-control font-semibold text-[#243e31] transition-colors hover:bg-[#e4eee7]"
            >
              Register your facility
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={onLogin}
              className="text-control text-[#b1c7b8] hover:text-white"
            >
              Already registered? Sign in ↗
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
