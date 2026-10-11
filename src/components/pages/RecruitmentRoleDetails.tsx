import { useEffect, useRef, useState } from "react"
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Check,
  FileText,
  MapPin,
  Share2,
  Wallet,
} from "lucide-react"
import {
  getRecommendedRoles,
  getRoleDetails,
  getRoleReference,
  type RecruitmentRole,
} from "../../data/recruitmentRoleDetails"
import "./recruitment-role-details.css"

export function RecruitmentRoleDetails({
  role,
  roles,
  onBack,
  onRead,
  onApply,
}: {
  role: RecruitmentRole
  roles: RecruitmentRole[]
  onBack: () => void
  onRead: (role: RecruitmentRole) => void
  onApply: (role: RecruitmentRole) => void
}) {
  const [shareStatus, setShareStatus] = useState("")
  const [manualLink, setManualLink] = useState("")
  const heading = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    heading.current?.focus({ preventScroll: true })
  }, [role])
  const details = getRoleDetails(role)
  const reference = getRoleReference(role, roles)
  const recommended = getRecommendedRoles(role, roles)
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
    <div className="recruit-role-page">
      <div className="recruit-role-band">
        <div className="recruit-role-container">
          <button className="recruit-role-back" onClick={onBack}>
            <ArrowLeft size={15} />
            Back to job search
          </button>
          <p>Recruitment · Ireland & UK</p>
        </div>
      </div>
      <article
        className="recruit-role-card recruit-role-container"
        aria-labelledby="recruit-role-heading"
      >
        <div className="recruit-role-meta">
          <span>Preview vacancy · Posting date not supplied</span>
          <span>
            <FileText size={13} />
            {reference}
          </span>
        </div>
        <div className="recruit-role-header">
          <div>
            <span className="recruit-role-status">Preview role</span>
            <h1 id="recruit-role-heading" ref={heading} tabIndex={-1}>
              {role.title}
            </h1>
            <div className="recruit-role-tags">
              <span>
                <MapPin size={14} />
                {role.location}
              </span>
              <span>
                <Briefcase size={14} />
                {role.type}
              </span>
              <span>
                <Wallet size={14} />
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
              <ArrowRight size={16} />
            </button>
            <button
              className="recruit-role-share"
              onClick={share}
              aria-label="Share this role"
            >
              <Share2 size={17} />
            </button>
          </div>
        </div>
        <div className="recruit-role-disclosure">
          <p>
            Sample vacancy, not a verified live job. Duties and criteria below
            illustrate the content structure and need an employer-approved
            brief. Availability, pay and full terms must be confirmed before
            appointment.
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
          <h2 id="recruit-role-about">About the job</h2>
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
          <h2 id="recruit-role-overview">Position overview</h2>
          {details.overview.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
        <section
          className="recruit-role-section"
          aria-labelledby="recruit-role-responsibilities"
        >
          <h2 id="recruit-role-responsibilities">Key responsibilities</h2>
          <p className="recruit-role-section-note">
            Illustrative duties for this sample role; confirm the exact scope
            with the employer.
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
          <h2 id="recruit-role-qualifications">
            Candidate profile & qualifications
          </h2>
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
          <h2 id="recruit-role-application">Application details</h2>
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
            <ArrowRight size={16} />
          </button>
        </div>
      </article>

      <section
        className="recruit-role-recommendations"
        aria-labelledby="recruit-recommended-heading"
      >
        <div className="recruit-role-container">
          <div className="recruit-role-recommended-header">
            <div>
              <p>Keep exploring</p>
              <h2 id="recruit-recommended-heading">
                Recommended roles for you
              </h2>
            </div>
            <button onClick={onBack}>
              View all roles
              <ArrowRight size={15} />
            </button>
          </div>
          <p className="recruit-role-recommended-note">
            Related sample roles, prioritised by sector, region and contract
            type.
          </p>
          <div className="recruit-role-recommended-grid">
            {recommended.map((candidate) => (
              <article
                key={getRoleReference(candidate, roles)}
                className="recruit-role-recommended-card"
              >
                <h3>{candidate.title}</h3>
                <div className="recruit-role-tags">
                  <span>
                    <MapPin size={12} />
                    {candidate.location}
                  </span>
                  <span>
                    <Briefcase size={12} />
                    {candidate.type}
                  </span>
                  <span>
                    <Wallet size={12} />
                    {candidate.salary}
                  </span>
                </div>
                <div>
                  <span className="recruit-role-status">
                    <Check size={11} />
                    Preview role
                  </span>
                  <button
                    onClick={() => onRead(candidate)}
                    aria-label={`View ${candidate.title} in ${candidate.location}`}
                  >
                    View role
                    <ArrowRight size={14} />
                  </button>
                </div>
                <p>
                  <FileText size={12} />
                  {getRoleReference(candidate, roles)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
