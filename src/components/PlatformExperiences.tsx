import React, { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { ArrowRight, Check, Eye, EyeOff, LockKeyhole, X } from "lucide-react"
import { Link, useNavigate, useParams } from "react-router"
import { LocumDialog } from "./LocumDialog"

export function PeopleAnimation({
  kind,
  image,
}: {
  kind: "recruitment" | "locum"
  image: string
}) {
  const reducedMotion = useReducedMotion()
  const locum = kind === "locum"
  return (
    <div
      className={`relative mx-auto w-full max-w-md overflow-hidden rounded-2xl p-7 ${
        locum ? "bg-[#edf5ef]" : "bg-[#f4e7ef]"
      }`}
    >
      <motion.div
        animate={reducedMotion ? {} : { y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative mx-auto w-4/5 overflow-hidden rounded-t-[100px] rounded-b-xl"
      >
        <img
          src={image}
          alt={
            locum
              ? "Healthcare professional in uniform"
              : "Professional exploring their next career opportunity"
          }
          className="h-72 w-full object-cover object-top"
        />
      </motion.div>
      <motion.div
        animate={reducedMotion ? {} : { y: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-4 right-4 flex items-center gap-3 rounded-xl border border-black/5 bg-white p-4"
      >
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
            locum
              ? "bg-[#edf5ef] text-[#368B62]"
              : "bg-[#f7edf4] text-[#810161]"
          }`}
        >
          <Check size={19} />
        </span>
        <div>
          <p className="text-xs font-semibold text-[#233b35]">
            {locum
              ? "Your skills. Your schedule."
              : "A career that fits your life."}
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            {locum
              ? "Care for others, on your terms"
              : "People-first recruitment"}
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export function ModernServiceHero({
  kind,
  image,
  onPrimary,
  onSecondary,
}: {
  kind: "recruitment" | "locum"
  image: string
  onPrimary: () => void
  onSecondary: () => void
}) {
  const locum = kind === "locum"
  const reducedMotion = useReducedMotion()
  return (
    <section
      className={`relative overflow-hidden px-6 py-12 font-['DM_Sans',sans-serif] sm:py-16 lg:py-20 ${
        locum ? "bg-[#f5f7f1]" : "bg-[#faf5f8]"
      }`}
    >
      <div className="mx-auto grid max-w-[1184px] items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-7 flex items-center gap-3">
            <span
              className={`h-2 w-2 rounded-full ${
                locum ? "bg-[#368B62]" : "bg-[#810161]"
              }`}
            />
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#67716b]">
              {locum
                ? "Healthcare, on your terms"
                : "People first. Possibility next."}{" "}
              · Ireland & UK
            </p>
          </div>
          <h1 className="text-[46px] font-medium leading-[1.06] tracking-[-0.025em] text-[#24332d] sm:text-[62px] lg:text-[72px]">
            {locum ? (
              <>
                Great care.
                <br />
                More freedom.
                <br />
                <span className="text-[#368B62]">Your next shift.</span>
              </>
            ) : (
              <>
                Good people.
                <br />
                Great potential.
                <br />
                <span className="text-[#810161]">The right fit.</span>
              </>
            )}
          </h1>
          <p className="mb-8 mt-6 max-w-[440px] text-[15px] leading-7 text-[#68716c]">
            {locum
              ? "A more human way to work in healthcare. Find flexible shifts, connect with trusted facilities and make room for the life you want to live."
              : "We bring talented people and ambitious teams together. Personal recruitment, thoughtful matches and a partner who sees the bigger picture."}
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={onPrimary}
              className={`group inline-flex items-center gap-4 rounded-full px-6 py-3.5 text-sm font-semibold text-white transition-colors ${
                locum
                  ? "bg-[#368B62] hover:bg-[#286d4c]"
                  : "bg-[#810161] hover:bg-[#65014c]"
              }`}
            >
              {locum ? "Find your next shift" : "Find your next role"}
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
            <button
              onClick={onSecondary}
              className="inline-flex items-center gap-3 rounded-full border border-black/5 bg-white px-6 py-3.5 text-sm font-semibold text-[#24332d] transition-colors hover:bg-[#f0f0eb]"
            >
              {locum ? "Join as a locum" : "I’m looking for talent"}
            </button>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-black/5 pt-6">
            {(locum
              ? [
                  "Flexible opportunities",
                  "Country-aware registration",
                  "People-first support",
                ]
              : ["Permanent & contract", "Executive search", "Ireland & the UK"]
            ).map((label) => (
              <span
                key={label}
                className="flex items-center gap-2 text-[11px] text-[#68716c]"
              >
                <Check
                  size={13}
                  className={locum ? "text-[#368B62]" : "text-[#810161]"}
                />
                {label}
              </span>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative mx-auto w-full max-w-[480px] pb-8"
        >
          <div
            className={`relative overflow-hidden rounded-t-[180px] rounded-b-[24px] ${
              locum ? "bg-[#dfe9dd]" : "bg-[#eedee9]"
            }`}
          >
            <img
              src={image}
              alt={
                locum
                  ? "Healthcare professional in teal scrubs"
                  : "Professional ready for their next career opportunity"
              }
              className="h-[360px] w-full object-cover object-top sm:h-[460px] lg:h-[510px]"
            />
          </div>
          <motion.div
            animate={reducedMotion ? {} : { y: [0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-1 left-4 right-4 flex items-center justify-between gap-4 rounded-2xl border border-black/5 bg-white p-5 sm:left-8 sm:right-8"
          >
            <div>
              <p className="mb-1 text-[9px] font-medium uppercase tracking-[0.14em] text-[#7a827c]">
                {locum ? "A schedule that fits" : "A career that fits"}
              </p>
              <p className="text-sm font-semibold text-[#24332d]">
                {locum
                  ? "Your expertise. Your choice."
                  : "Your next chapter starts here."}
              </p>
            </div>
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                locum
                  ? "bg-[#edf5ef] text-[#368B62]"
                  : "bg-[#f8eef5] text-[#810161]"
              }`}
            >
              <Check size={19} />
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export function SoftwareAnimation() {
  const reducedMotion = useReducedMotion()
  return (
    <div
      aria-label="Connected healthcare software preview"
      className="mx-auto mt-10 max-w-xl rounded-xl border border-black/5 bg-[#f6f8f4] p-5 text-left"
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-semibold text-[#233b35]">
          Your team, connected
        </span>
        <span className="text-[10px] text-[#368B62]">Platform preview</span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {["Recruitment", "Care plans", "Staffing"].map((label, index) => (
          <motion.div
            key={label}
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="rounded-lg bg-white p-3"
          >
            <div className="mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#368B62]" />
              <span className="text-[10px] font-medium sm:text-xs">
                {label}
              </span>
            </div>
            {[0, 1, 2].map((row) => (
              <motion.div
                key={row}
                animate={reducedMotion ? {} : { opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: index * 0.4 + row * 0.2,
                }}
                className="mb-2 h-2 rounded-sm bg-[#e3ece2] last:w-2/3"
              />
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export function LoginExperience({
  open,
  onClose,
  kind,
  image,
  onRegister,
}: {
  open: boolean
  onClose: () => void
  kind: "recruitment" | "locum"
  image: string
  onRegister: () => void
}) {
  const [showPassword, setShowPassword] = useState(false)
  const [recover, setRecover] = useState(false)
  const [status, setStatus] = useState("")
  const panel = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const locum = kind === "locum"
  useEffect(() => {
    if (!open) return
    setStatus("")
    setRecover(false)
    setShowPassword(false)
    if (locum) return
    const previousFocus = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    panel.current?.focus()
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
      if (event.key !== "Tab") return
      const focusables = Array.from(
        panel.current?.querySelectorAll<HTMLElement>(
          'button, input, a[href], [tabindex="0"]',
        ) || [],
      ).filter((element) => !element.hasAttribute("disabled"))
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (
        event.shiftKey &&
        (document.activeElement === first ||
          document.activeElement === panel.current)
      ) {
        event.preventDefault()
        last?.focus()
      } else if (
        !event.shiftKey &&
        (document.activeElement === last ||
          document.activeElement === panel.current)
      ) {
        event.preventDefault()
        first?.focus()
      }
    }
    document.addEventListener("keydown", handleKey)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", handleKey)
      previousFocus?.focus()
    }
  }, [open])
  const loginContent = (
<div className={locum ? "flex flex-col px-7 py-7" : "flex flex-col justify-center px-7 py-14 md:px-10"}>
          {!locum && (<>
          <LockKeyhole
            size={26}
            className={locum ? "text-[#368B62]" : "text-[#810161]"}
          />
          <p className="mt-7 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
            YOUR NEXT CHAPTER
          </p>
          <h2
            id="login-title"
            className="mt-3 font-['Libre_Caslon_Display',serif] text-4xl text-[#233b35]"
          >
            {recover ? "A fresh start." : "Good to see you."}
          </h2>
          </>)}
          <p className="mb-7 mt-3 text-sm leading-6 text-slate-500">
            {recover
              ? "Enter your email to request a password reset."
              : "Sign in to keep your opportunities, applications and team in one place."}
          </p>
          <form
            onSubmit={(event) => {
              event.preventDefault()
              setStatus(
                recover
                  ? "Password recovery is not connected in this preview. No email has been sent."
                  : "This is a design preview. Authentication is not connected, so no login was attempted.",
              )
            }}
            className="space-y-5"
          >
            <label className="block text-xs font-medium text-slate-700">
              Email address
              <input
                required
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="mt-2 block w-full rounded-lg border border-black/5 bg-[#f8f8f5] px-4 py-3.5 text-sm"
              />
            </label>
            {!recover && (
              <label className="block text-xs font-medium text-slate-700">
                Password
                <div className="relative mt-2">
                  <input
                    required
                    minLength={8}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Your password"
                    className="w-full rounded-lg border border-black/5 bg-[#f8f8f5] py-3.5 pl-4 pr-12 text-sm"
                  />
                  <button
                    type="button"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 p-1 text-slate-500"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </label>
            )}
            <button
              type="button"
              onClick={() => {
                setRecover(!recover)
                setStatus("")
              }}
              className="text-xs text-slate-600 underline underline-offset-4"
            >
              {recover ? "Back to login" : "Forgot your password?"}
            </button>
            <button
              type="submit"
              className={`flex w-full items-center justify-center gap-3 py-3.5 text-sm font-semibold text-white transition-colors ${
                locum
                  ? "rounded-full bg-[#368B62] hover:bg-[#286d4c]"
                  : "rounded-lg bg-[#810161] hover:bg-[#67014d]"
              }`}
            >
              {recover ? "Request reset link" : "Sign in"}
              <ArrowRight size={16} />
            </button>
            <p role="status" className="text-xs leading-5 text-slate-600">
              {status || "Preview mode · no account connection yet"}
            </p>
          </form>
          <div className="mt-7 border-t border-black/5 pt-5 text-center text-xs text-slate-500">
            New to MployUs?{" "}
            <button
              onClick={onRegister}
              className={`ml-1 font-semibold ${
                locum ? "text-[#368B62]" : "text-[#810161]"
              }`}
            >
              Get started
            </button>
          </div>
          <p className="mt-5 text-center text-[10px] text-slate-400">
            <Link to="/policies/privacy" onClick={onClose}>
              Privacy
            </Link>{" "}
            ·{" "}
            <Link to="/policies/terms" onClick={onClose}>
              Terms
            </Link>
          </p>
        </div>
  )
  if (!open) return null
  if (locum) return <LocumDialog onClose={onClose} closeLabel="Close login" title={recover ? "Let’s get you back in." : "Good to see you again."} description={recover ? "A fresh start for your account." : "Your opportunities, applications and team, all connected."} headline={"Care with purpose.\nWork with freedom."} image={image}>{loginContent}</LocumDialog>
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#10241c]/70 p-4"
      onClick={onClose}
    >
      <motion.div
        ref={panel}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
        onClick={(event) => event.stopPropagation()}
        initial={reducedMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative grid max-h-[95vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white outline-none md:grid-cols-2"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close login"
          className="absolute right-4 top-4 z-10 rounded-full bg-[#f5f5f2] p-2 text-slate-600 hover:bg-[#eaece6]"
        >
          <X size={18} />
        </button>
        <div
          className={`hidden flex-col justify-center gap-7 p-8 md:flex ${
            locum ? "bg-[#f0f5ec]" : "bg-[#fbf1f7]"
          }`}
        >
          <span
            className={`text-xs font-semibold uppercase tracking-[0.15em] ${
              locum ? "text-[#368B62]" : "text-[#810161]"
            }`}
          >
            MployUs {locum ? "Locums" : "Recruit"}
          </span>
          <PeopleAnimation kind={kind} image={image} />
          <p className="font-['Libre_Caslon_Display',serif] text-4xl leading-tight text-[#233b35]">
            {locum
              ? "Care with purpose. Work with freedom."
              : "Your ambition. A world of possibility."}
          </p>
        </div>
        {loginContent}
      </motion.div>
    </div>
  )
}

const policies: Record<string, {
  title: string
  intro: string
  sections: [string, string][]
}> = {
  privacy: {
    title: "Privacy policy",
    intro:
      "How personal information should be handled across recruitment, locum staffing and software services in Ireland and the UK.",
    sections: [
      [
        "Who is responsible",
        "Before publication, MployUs must identify the legal entity operating each service, its registered address and the privacy contact responsible for handling requests.",
      ],
      [
        "Information collected",
        "Depending on the service, information may include contact details, CVs, employment history, qualifications, professional registration, right-to-work documentation, availability and communications. Sensitive information must only be collected where necessary and lawfully permitted.",
      ],
      [
        "Purposes and lawful grounds",
        "Personal information may be used to review applications, match candidates with roles, arrange bookings, administer accounts and fulfil legal obligations. Each processing activity needs an identified lawful basis under EU GDPR or UK GDPR; consent is not a substitute for identifying the correct basis.",
      ],
      [
        "Sharing and transfers",
        "Approved employers, facilities and service providers may receive information needed for the requested service. Candidates should be informed before identifiable profiles are shared. Any international transfer requires appropriate safeguards and transparent disclosure.",
      ],
      [
        "Retention and security",
        "Retention periods must be documented for applications, compliance records, accounts and statutory obligations. Access should be limited to authorised people. Specific retention periods and security arrangements must be confirmed before this policy is published.",
      ],
      [
        "Your rights",
        "Subject to applicable conditions, you may request access, correction, deletion, restriction or portability, object to processing and withdraw consent where processing relies on consent. A verified contact channel must be added before launch.",
      ],
      [
        "Complaints",
        "You may raise concerns with the Irish Data Protection Commission or the UK Information Commissioner’s Office, as appropriate. This draft does not limit your statutory rights.",
      ],
      [
        "Locum applications and compliance documents",
        "Locum registration may require professional registration details, identity and right-to-work information, indemnity evidence and role-appropriate vetting information. Only necessary information should be shared with the hiring facility. Criminal-record and other sensitive information require additional safeguards and a valid legal condition. The production document workflow, recipients and retention schedule must be verified before launch.",
      ],
    ],
  },
  terms: {
    title: "Terms of service",
    intro:
      "An outline of the terms for using MployUs recruitment, locum and care management services.",
    sections: [
      [
        "About these services",
        "MployUs connects candidates, healthcare professionals and employers and offers software services. These draft terms must be completed with the operating entity, registered details and applicable service agreements.",
      ],
      [
        "Accounts and eligibility",
        "Provide accurate information, protect your credentials and use only accounts you are authorised to access. Registration does not guarantee a job, shift, candidate or placement. Professional eligibility and right-to-work requirements depend on the role and country.",
      ],
      [
        "Recruitment and bookings",
        "Job descriptions, remuneration, working hours, eligibility and contract terms should be verified with the employer before acceptance. Employment, staffing and placement agreements are separate from website use.",
      ],
      [
        "Employer responsibilities",
        "Employers should provide accurate briefs, lawful selection criteria, safe working conditions and clear contractual terms. Fees, replacement guarantees, cancellation terms and payment obligations must be agreed in writing.",
      ],
      [
        "Acceptable use",
        "Do not submit misleading information, discriminate unlawfully, access other users’ records, copy confidential material or interfere with the service. Uploaded material must be yours to share lawfully.",
      ],
      [
        "Fees, cancellation and liability",
        "Commercial charges and cancellation rules are set out in the relevant signed agreement. Any limitations of liability require legal review and must not exclude rights or liabilities that cannot lawfully be excluded.",
      ],
      [
        "Governing law and disputes",
        "Applicable law, jurisdiction, dispute procedures and notice details must be specified for each operating entity and service. Consumer and employment protections remain unaffected.",
      ],
      [
        "Locum shift briefs and confirmation",
        "Preview vacancies are demonstration content, not offers of work. For an actual booking, the facility and professional should confirm the exact site, dates, hours, breaks, duties, registration requirements, rate, engagement status, payment schedule, expenses and cancellation terms in writing. An application alone does not confirm a booking. Estimated gross pay is not a guarantee of take-home pay.",
      ],
      [
        "Changes, cancellations and safe practice",
        "Report changes to availability or professional eligibility promptly. Any cancellation notice, replacement process, payment for cancelled work and dispute procedure must be stated in the applicable agreement. Professionals and facilities remain responsible for complying with applicable professional, safeguarding and workplace obligations in Ireland, England, Wales, Scotland or Northern Ireland.",
      ],
    ],
  },
  cookies: {
    title: "Cookie policy",
    intro: "Clear choices about cookies and similar technologies on MployUs.",
    sections: [
      [
        "What cookies do",
        "Cookies and local storage can remember settings, support sessions and help understand usage. A verified inventory of technologies, providers, purposes and retention periods is required before publication.",
      ],
      [
        "Strictly necessary",
        "Technologies essential for a requested service, such as authentication and security, may not require consent. Their actual use must still be disclosed.",
      ],
      [
        "Optional technologies",
        "Functional, analytics and advertising technologies should remain off until valid consent is given where required. This design preview does not implement an analytics or advertising integration.",
      ],
      [
        "Managing choices",
        "A production consent manager should offer equally clear accept and reject options, granular preferences and a persistent way to withdraw consent. Browser settings can also block or delete cookies, though some functions may be affected.",
      ],
      [
        "Inventory and updates",
        "Before launch, add each cookie’s name, provider, purpose, category and lifetime, verify actual behaviour and date the approved policy. This draft is not a verified cookie inventory.",
      ],
      [
        "Consent preference storage in this preview",
        "The Locum preview stores your necessary, functional, performance and targeting choices in first-party local storage under mployus-cookie-preferences. It remembers your decision between visits and has no automatic expiry in the current implementation; it remains until overwritten or browser storage is cleared. Optional choices do not activate analytics or advertising integrations in this preview. Use Manage cookie preferences in the footer to change your decision. Third-party images and fonts may make network requests independently of these stored choices; production integrations must be reviewed before launch.",
      ],
    ],
  },
  "data-protection": {
    title: "Ireland & UK data protection",
    intro: "A draft framework for protecting candidate, professional and facility information across the Locum service.",
    sections: [
      ["Applicable framework", "Processing in Ireland is subject to EU GDPR and applicable Irish legislation. UK processing is subject to UK GDPR and applicable UK legislation. The operating entity must confirm which framework applies to each activity and identify controller and processor roles."],
      ["Purpose limitation and access", "Collect only the information needed for registration, compliance review, applications and agreed bookings. Restrict document access to authorised people and inform professionals about any disclosure to a facility."],
      ["Sensitive and vetting information", "Professional vetting information may be subject to additional legal restrictions. Confirm the lawful basis, additional processing conditions, role eligibility, access controls and retention periods before collecting or sharing it."],
      ["Rights and requests", "People may exercise applicable access, correction, deletion, restriction, objection and portability rights. The production service must publish a verified contact, identity-check process and response procedure; none is assumed by this draft."],
      ["Incidents and complaints", "The operating entity must document incident response and applicable notification obligations. Complaints may be directed to the Irish Data Protection Commission or UK Information Commissioner’s Office, as appropriate."],
    ],
  },
  accessibility: {
    title: "Accessibility statement",
    intro: "Our proposed approach to making MployUs Locums usable for healthcare professionals and facilities with different access needs.",
    sections: [
      ["Our aim", "We aim for clear language, keyboard-operable navigation, readable layouts and accessible forms. This draft is not a claim of audited WCAG conformance. A formal accessibility review and verified statement are required before publication."],
      ["Motion and controls", "The testimonial marquee provides a pause control, pauses on hover and keyboard focus, and becomes static when reduced motion is requested. Users can choose reduced motion in their device or browser settings."],
      ["Areas for review", "Registration, modal focus management, validation messages, colour contrast, third-party content and assistive-technology behaviour should be tested as part of a full accessibility audit. Any confirmed limitations and remediation dates must be published in the final statement."],
      ["Requesting assistance", "Use the service’s published contact options to ask for help or report an access barrier. Describe the page, the task and any assistive technology involved. The production statement must include a verified accessibility contact and response process."],
    ],
  },
}

export function PolicyPage() {
  const { policy = "privacy" } = useParams()
  const navigate = useNavigate()
  const document = policies[policy]
  return (
    <div className="min-h-screen bg-[#fafaf7] font-['DM_Sans',sans-serif] text-[#233b35]">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
          <Link to="/" className="text-2xl font-bold">
            mploy<span className="text-[#368B62]">us.</span>
          </Link>
          <button
            onClick={() =>
              window.history.length > 1 ? navigate(-1) : navigate("/")
            }
            className="text-sm"
          >
            ← Go back
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-6 py-14">
        <p className="text-xs uppercase tracking-[0.15em] text-[#368B62]">
          Clarity & trust
        </p>
        <h1 className="mt-5 font-['Libre_Caslon_Display',serif] text-5xl">
          {document?.title || "Policy not found"}
        </h1>
        <nav
          aria-label="Policy navigation"
          className="my-8 flex flex-wrap gap-3"
        >
          {Object.entries(policies).map(([key, item]) => (
            <Link
              key={key}
              to={`/policies/${key}`}
              aria-current={key === policy ? "page" : undefined}
              className={`rounded-full px-4 py-2 text-xs ${
                key === policy
                  ? "bg-[#368B62] text-white"
                  : "bg-white text-[#233b35]"
              }`}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="mb-8 rounded-lg border border-black/5 bg-[#f3eee3] p-5 text-sm leading-6">
          <strong>Draft for legal review.</strong> This is proposed policy
          content, not an approved legal document. Entity details, processing
          practices, service terms and cookie inventory must be verified before
          launch.
        </div>
        {document && (
          <>
            <p className="mb-10 text-lg leading-8 text-slate-600">
              {document.intro}
            </p>
            <div className="space-y-8">
              {document.sections.map(([heading, text], index) => (
                <section key={heading}>
                  <h2 className="mb-3 text-xl font-semibold">
                    {index + 1}. {heading}
                  </h2>
                  <p className="text-sm leading-7 text-slate-600">{text}</p>
                </section>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
