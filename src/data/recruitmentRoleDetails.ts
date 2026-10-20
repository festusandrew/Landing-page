export type RecruitmentRole = {
  title: string
  location: string
  type: string
  sector: string
  salary: string
  desc: string
}

export const RECRUITMENT_JOB_REGIONS: Record<string, string> = {
  Belfast: "Northern Ireland",
  Manchester: "England",
  Cardiff: "Wales",
  Edinburgh: "Scotland",
}

type Profile = {
  responsibilities: string[]
  qualifications: string[]
}
const PROFILES: Record<string, Profile> = {
  "Warehouse Operative": {
    responsibilities: [
      "Pick and pack orders and support goods-in activities.",
      "Maintain accurate handling records and follow the site’s stock-control procedures.",
      "Follow agreed safety procedures and report stock or operational issues.",
    ],
    qualifications: [
      "Full training is included in the role brief.",
      "Attention to detail and reliable attendance are useful for this type of role.",
      "Confirm the physical duties, working pattern and any required equipment training with the employer.",
    ],
  },
  "Staff Nurse (General)": {
    responsibilities: [
      "Support the delivery of nursing care within your authorised professional scope.",
      "Maintain clear care records and communicate effectively during handovers.",
      "Work with the wider care team and follow local clinical and safeguarding procedures.",
    ],
    qualifications: [
      "NMBI registration is specified in the role brief.",
      "Confirm the required register division, experience and clinical competencies for the placement.",
      "Right-to-work, suitability and applicable vetting checks need review before appointment.",
    ],
  },
  "Hotel Receptionist": {
    responsibilities: [
      "Welcome guests and support check-in and check-out.",
      "Coordinate reservations and respond to guest enquiries.",
      "Keep front-of-house information accurate and liaise with hotel colleagues.",
    ],
    qualifications: [
      "Previous hospitality experience is specified for the Galway role; confirm requirements for other locations.",
      "Clear communication and an organised approach are relevant to front-of-house work.",
      "Confirm the booking systems, working hours and duties in the employer-approved brief.",
    ],
  },
  "SNA (Special Needs Asst)": {
    responsibilities: [
      "Support students with additional care needs under the school’s direction.",
      "Work alongside teaching staff and follow agreed support plans.",
      "Respect confidentiality and follow the school’s safeguarding procedures.",
    ],
    qualifications: [
      "Garda vetting is specified in the role brief.",
      "Confirm the applicable qualification requirements and the school’s recruitment procedures.",
      "Experience and suitability for the particular support needs must be assessed by the school.",
    ],
  },
  "Supply Chain Coordinator": {
    responsibilities: [
      "Coordinate supply-chain activity and keep operational information up to date.",
      "Use spreadsheets and ERP tools to support visibility of goods and orders.",
      "Liaise with colleagues to identify and resolve coordination issues.",
    ],
    qualifications: [
      "Strong Excel and ERP experience are specified in the role brief.",
      "A logistics degree is listed as preferred, not a confirmed universal requirement.",
      "Confirm the required experience, systems and reporting responsibilities.",
    ],
  },
  "Care Assistant": {
    responsibilities: [
      "Support people with day-to-day care in line with agreed plans and supervision.",
      "Maintain appropriate records and communicate changes to the responsible team.",
      "Respect dignity, preferences and confidentiality, and follow local safeguarding procedures.",
    ],
    qualifications: [
      "Confirm role-specific care training, experience and suitability with the employer.",
      "Identity, employment, right-to-work and applicable safeguarding checks require review.",
      "The precise scope of duties and any registration requirements depend on the setting and jurisdiction.",
    ],
  },
  "Head Chef": {
    responsibilities: [
      "Lead the kitchen team and coordinate day-to-day food service.",
      "Develop menus and support consistent preparation and presentation.",
      "Follow food-safety procedures and coordinate kitchen stock and workflow.",
    ],
    qualifications: [
      "Proven menu-development skills and Irish-market knowledge are specified in the role brief.",
      "Confirm the expected kitchen leadership experience and food-safety training.",
      "Working hours, team size and responsibilities must be agreed with the employer.",
    ],
  },
  "Secondary School Teacher": {
    responsibilities: [
      "Plan and deliver teaching in the subject areas agreed with the school.",
      "Support students’ learning and assess progress appropriately.",
      "Work with school colleagues and follow safeguarding and school policies.",
    ],
    qualifications: [
      "Teaching Council registration is specified in the role brief.",
      "Confirm the subject-specific qualifications and recognised teaching requirements.",
      "Suitability, right-to-work and applicable vetting checks require review before appointment.",
    ],
  },
  "Transport Manager": {
    responsibilities: [
      "Coordinate transport operations and fleet activity.",
      "Support safe, compliant scheduling and communicate with drivers and operational colleagues.",
      "Maintain operational records and review delivery and fleet requirements.",
    ],
    qualifications: [
      "A CPC qualification and fleet-management experience are specified in the role brief.",
      "Confirm the relevant licence, transport-compliance knowledge and management responsibilities.",
      "The fleet size and operating arrangements need confirmation with the employer.",
    ],
  },
  Physiotherapist: {
    responsibilities: [
      "Manage the agreed community outpatient caseload within your professional scope.",
      "Plan, document and review appropriate interventions.",
      "Communicate with service users and the wider clinical team.",
    ],
    qualifications: [
      "CORU registration is specified in the role brief.",
      "Confirm the required clinical competencies, experience and supervision arrangements.",
      "Right-to-work, suitability and applicable safeguarding checks need review.",
    ],
  },
  "Staff Nurse": {
    responsibilities: [
      "Deliver nursing care within your authorised professional scope.",
      "Maintain records and support clear clinical handovers.",
      "Follow the service’s clinical governance and safeguarding procedures.",
    ],
    qualifications: [
      "NMC registration is specified for the Belfast role.",
      "Confirm current registration status, relevant competencies and any restrictions.",
      "The employer must confirm experience, roster and applicable AccessNI requirements.",
    ],
  },
  "Warehouse Team Leader": {
    responsibilities: [
      "Coordinate the warehouse team’s daily activity.",
      "Support safe operations, clear communication and consistent handling procedures.",
      "Monitor work progress and escalate operational issues appropriately.",
    ],
    qualifications: [
      "This role describes warehouse leadership and operational coordination.",
      "Confirm required supervisory experience and equipment or safety training.",
      "Shift patterns, responsibilities and the full person specification remain subject to employer confirmation.",
    ],
  },
}

export function getRoleReference(
  role: RecruitmentRole,
  roles: RecruitmentRole[],
) {
  const index = roles.indexOf(role)
  return index < 0 ? "" : `MPR-${String(index + 1).padStart(4, "0")}`
}

export function getRoleDetails(role: RecruitmentRole) {
  const region = RECRUITMENT_JOB_REGIONS[role.location] || "Ireland"
  const profile = PROFILES[role.title] || {
    responsibilities: [
      "Carry out the agreed duties in the role summary.",
      "Follow relevant workplace procedures and communicate with the team.",
    ],
    qualifications: [
      "Confirm the essential and desirable requirements in the employer-approved job description.",
    ],
  }
  const qualifications = [...profile.qualifications]
  if (role.title === "Care Assistant" && region === "Ireland")
    qualifications.unshift(
      "QQI Level 5 Care Skills is specified in this role brief.",
    )
  if (role.title === "Hotel Receptionist" && role.location !== "Galway")
    qualifications[0] =
      "This role covers front-of-house work and reservations; confirm the required hospitality experience."
  const duration =
    role.type === "Permanent"
      ? "Permanent position"
      : role.desc.includes("6-month")
        ? "6-month rolling contract with renewal, subject to confirmation"
        : "Contract length and renewal terms to be confirmed"
  const hours = role.desc.includes("Early, late")
    ? "Early, late and weekend shifts are mentioned; confirm the full roster."
    : role.desc.includes("Rotating roster")
      ? "A rotating roster is mentioned; confirm hours and shift pattern."
      : "Hours, paid breaks and shift pattern to be confirmed."
  return {
    region,
    duration,
    responsibilities: profile.responsibilities,
    qualifications,
    overview: [
      role.desc,
      `This ${role.type.toLowerCase()} ${role.sector.toLowerCase()} opportunity is based in ${role.location}, ${region}. The role brief provides a starting point; the employer’s identity, exact workplace, reporting line and full person specification must be confirmed before you proceed.`,
    ],
    applicationDetails: [
      ["Contract term", duration],
      [
        "Workplace & arrangement",
        "Employer, exact address and on-site/hybrid arrangements to be confirmed.",
      ],
      ["Hours & shifts", hours],
      [
        "Start date",
        role.desc.includes("Immediate start")
          ? "Immediate start is mentioned; confirm availability and onboarding."
          : "Start date and onboarding arrangements to be agreed.",
      ],
      [
        "Pay & benefits",
        `${role.salary} is shown in the role brief. Confirm pay frequency, overtime, benefits and leave before accepting.`,
      ],
      [
        "Right to work & sponsorship",
        "Country-specific eligibility and any sponsorship availability must be confirmed.",
      ],
      [
        "Registration & safeguarding",
        "Confirm the applicable regulator, current status and role-appropriate local checks.",
      ],
      [
        "Travel & relocation",
        "Travel expectations and any relocation support are not supplied.",
      ],
      [
        "Closing date",
        "Not supplied; confirm availability with your consultant.",
      ],
      [
        "Application process",
        "Application draft, consultant review and employer interview. Online applications are not connected.",
      ],
      [
        "Accessibility & adjustments",
        "Include any recruitment adjustment requirements in your application notes.",
      ],
    ],
  }
}

export function getRecommendedRoles(
  role: RecruitmentRole,
  roles: RecruitmentRole[],
  limit = 6,
) {
  const region = RECRUITMENT_JOB_REGIONS[role.location] || "Ireland"
  const score = (candidate: RecruitmentRole) =>
    Number(candidate.sector === role.sector) * 4 +
    Number(
      (RECRUITMENT_JOB_REGIONS[candidate.location] || "Ireland") === region,
    ) *
      2 +
    Number(candidate.type === role.type)
  return roles
    .filter((candidate) => candidate !== role)
    .sort((a, b) => score(b) - score(a))
    .slice(0, limit)
}
