import { RECRUITMENT_VISUALS } from "../../data/recruitmentVisuals"
import { useEffect, useRef, useState } from "react"
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  FileText,
  MapPin,
  Share2,
  Wallet,
} from "lucide-react"
import {
  getRoleDetails,
  getRoleReference,
  type RecruitmentRole,
} from "../../data/recruitmentRoleDetails"
import "./recruitment-role-details.css"

export function RecruitmentRoleDetails({
  role,
  roles,
  onBack,
  onApply,
  embedded = false,
}: {
  role: RecruitmentRole
  roles: RecruitmentRole[]
  onBack: () => void
  onApply: (role: RecruitmentRole) => void
  embedded?: boolean
}) {
  const [shareStatus, setShareStatus] = useState("")
  const [manualLink, setManualLink] = useState("")
  const heading = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    if (!embedded) heading.current?.focus({ preventScroll: true })
  }, [role, embedded])
  const details = getRoleDetails(role)
  const reference = getRoleReference(role, roles)
  const Heading = embedded ? "h2" : "h1"
  const SectionHeading = embedded ? "h3" : "h2"
  async function share() {
    const url = new URL("/recruitment-service", window.location.origin)
    url.searchParams.set("recruitment-role", reference)
    try {
      if (navigator.share) {
        await navigator.share({
          title: role.title,
          text: `${role.title} · ${role.location}`,
          url: url.href,
        })
        setShareStatus("Role shared")
      } else {
        await navigator.clipboard.writeText(url.href)
        setShareStatus("Link copied")
      }
      setManualLink("")
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return
      setShareStatus("Copy the role link below")
      setManualLink(url.href)
    }
  }
  return (
    <div
      className={`recruit-role-page${embedded ? " recruit-role-embedded" : ""}`}
    >
      {embedded && (
        <button className="recruit-role-inline-back" onClick={onBack}>
          <ArrowLeft size={14} />
          Back to results
        </button>
      )}
      {!embedded && (
        <div className="recruit-role-band">
          <div className="recruit-role-container">
            <button className="recruit-role-back" onClick={onBack}>
              <ArrowLeft size={15} />
              Back to job search
            </button>
            <p>Recruitment · Ireland & UK</p>
          </div>
        </div>
      )}
      <article
        className="recruit-role-card recruit-role-container"
        aria-labelledby="recruit-role-heading"
      >
        <div className="recruit-role-meta">
          <span>Recruitment · Posting date to be confirmed</span>
          <span>
            <img
              src={RECRUITMENT_VISUALS.jobs.file[0]}
              alt=""
              className="recruit-reference-icon"
            />
            {reference}
          </span>
        </div>
        <div className="recruit-role-header">
          <div>
            <span className="recruit-role-status">Unconfirmed vacancy</span>
            <Heading id="recruit-role-heading" ref={heading} tabIndex={-1}>
              {role.title}
            </Heading>
            <div className="recruit-role-tags">
              <span>
                <img
                  src={RECRUITMENT_VISUALS.jobs.tags[0]}
                  alt=""
                  className="recruit-reference-icon"
                />
                {role.location}
              </span>
              <span>
                <img
                  src={RECRUITMENT_VISUALS.jobs.tags[1]}
                  alt=""
                  className="recruit-reference-icon"
                />
                {role.type}
              </span>
              <span>
                <img
                  src={RECRUITMENT_VISUALS.jobs.tags[2]}
                  alt=""
                  className="recruit-reference-icon"
                />
                {role.salary}
              </span>
            </div>
          </div>
          <div className="recruit-role-actions">
            <button
              className="recruit-role-primary"
              onClick={() => onApply(role)}
            >
              Apply for this role
              <img
                src={RECRUITMENT_VISUALS.jobs.apply[0]}
                alt=""
                className="recruit-reference-icon"
              />
            </button>
            <button
              className="recruit-role-share"
              onClick={share}
              aria-label="Share this role"
            >
              <img
                src={RECRUITMENT_VISUALS.jobs.share[0]}
                alt=""
                className="recruit-reference-icon"
              />
            </button>
          </div>
        </div>
        <div className="recruit-role-disclosure">
          <p>
            Availability, duties, pay and full terms require employer
            confirmation before you proceed.
          </p>
        </div>
        {shareStatus && (
          <p className="recruit-role-share-status" role="status">
            {shareStatus}
          </p>
        )}
        {manualLink && (
          <label className="recruit-role-link-label">
            Role link
            <input
              readOnly
              value={manualLink}
              onFocus={(event) => event.target.select()}
            />
          </label>
        )}

        <section
          className="recruit-role-section"
          aria-labelledby="recruit-role-about"
        >
          <SectionHeading id="recruit-role-about">About the job</SectionHeading>
          <p className="recruit-role-lead">
            {role.title} · {role.sector}
          </p>
          <dl className="recruit-role-facts">
            {[
              ["Contract", details.duration],
              ["Location", `${role.location}, ${details.region}`],
              ["Salary / rate", role.salary],
            ].map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>
        <section
          className="recruit-role-section"
          aria-labelledby="recruit-role-overview"
        >
          <SectionHeading id="recruit-role-overview">
            Position overview
          </SectionHeading>
          {details.overview.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
        <section
          className="recruit-role-section"
          aria-labelledby="recruit-role-responsibilities"
        >
          <SectionHeading id="recruit-role-responsibilities">
            Key responsibilities
          </SectionHeading>
          <p className="recruit-role-section-note">
            Confirm the exact responsibilities and scope with the employer.
          </p>
          <ul>
            {details.responsibilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section
          className="recruit-role-section"
          aria-labelledby="recruit-role-qualifications"
        >
          <SectionHeading id="recruit-role-qualifications">
            Candidate profile & qualifications
          </SectionHeading>
          <ul>
            {details.qualifications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section
          className="recruit-role-section"
          aria-labelledby="recruit-role-application"
        >
          <SectionHeading id="recruit-role-application">
            Application details
          </SectionHeading>
          <ul>
            {details.applicationDetails.map(([label, value]) => (
              <li key={label}>
                <strong>{label}:</strong> {value}
              </li>
            ))}
          </ul>
        </section>
        <div className="recruit-role-bottom-apply">
          <div>
            <p>Your next chapter starts here.</p>
            <span>Prepare an application for this role.</span>
          </div>
          <button
            className="recruit-role-primary"
            onClick={() => onApply(role)}
          >
            Apply for this role
            <img
              src={RECRUITMENT_VISUALS.jobs.bottomApply[0]}
              alt=""
              className="recruit-reference-icon"
            />
          </button>
        </div>
      </article>
    </div>
  )
}
