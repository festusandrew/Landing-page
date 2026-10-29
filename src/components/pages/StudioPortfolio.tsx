import { useRef, useState } from "react"
import { Link } from "react-router"
import * as Dialog from "@radix-ui/react-dialog"
import { ArrowLeft, Pause, Play } from "lucide-react"
import { useReducedMotion } from "motion/react"
import "./studio-portfolio.css"
import { ProjectEnquiryDialog } from "../modals/ProjectEnquiryDialog"
import { StudioProjectCarousel } from "../StudioProjectCarousel"
import { STUDIO_VISUALS } from "../../data/studioVisuals"
import { WEB_STUDIO_VISUALS } from "../../data/webStudioVisuals"
import careDesignImage from "../../imports/studio-reference/dd653.png"
import "./studio-design-reference.css"
import "./studio-web-reference.css"

type Discipline = "design" | "development"
type Project = {
  id: string
  name: string
  category: string
  summary: string
  image: string
  tone: string
  // Product pages to explore; projects without one show no explore link.
  href?: string
  linkLabel?: string
  deliverables: string[]
  brief: string
  approach: string
  imageSrc?: string
}

type ProjectDemo = { description: string; width: number; height: number }

/**
 * Screen recordings keyed by `Project.image`, played as GIFs from
 * /images/studio/demos. Each `.webp` poster is its recording's first frame.
 */
const PROJECT_DEMOS: Partial<Record<string, ProjectDemo>> = {
  recruitment: {
    description:
      "the MployUs Recruit job board: filtering roles to Ireland, sorting by salary, opening a role and starting an application",
    width: 1280,
    height: 889,
  },
  "locum-journal": {
    description:
      "the Locum Journal: filtering insights for the UK and for compliance, then opening the lead article",
    width: 1280,
    height: 889,
  },
  "care-management": {
    description:
      "MployUs Care Management: jumping to the workflow preview and switching between the care plan, vitals and eMAR views",
    width: 1280,
    height: 889,
  },
  "locum-shifts": {
    description:
      "the MployUs Locums shift finder: showing shifts across UK regions, opening a Manchester shift and starting an application",
    width: 1280,
    height: 889,
  },
  compliance: {
    description:
      "a compliance dashboard: moving from the audit trail to the document register, then the overview of compliance by category and active alerts",
    width: 800,
    height: 480,
  },
  reports: {
    description:
      "a reporting dashboard: browsing insight cards, client revenue and profitability charts, and saved reports with their schedules",
    width: 800,
    height: 480,
  },
  crm: {
    description:
      "a CRM pipeline: dragging a deal from New Lead to Qualified, then adding a new deal as a project, service, product or bid",
    width: 800,
    height: 480,
  },
}

const projects: Record<Discipline, Project[]> = {
  design: [
    {
      id: "recruit",
      name: "A better next chapter.",
      category: "Product UX",
      summary:
        "MployUs Recruit — a clearer journey from opportunity to application.",
      image: "recruitment",
      tone: "rose",
      href: "/recruitment-service",
      linkLabel: "Explore Recruitment",
      deliverables: ["User journeys", "Responsive UI", "Application flows"],
      brief:
        "Bring employers and candidates into one coherent experience, without losing the detail that makes a recruitment decision meaningful.",
      approach:
        "A distinct magenta identity, scannable opportunities and guided application steps. Country-aware fields and a consistent visual language connect the landing page, article views and forms.",
    },
    {
      id: "journal",
      name: "A fresh perspective on locum.",
      category: "Editorial",
      summary:
        "The Locum Journal — practical knowledge with an editorial point of view.",
      image: "locum-journal",
      tone: "sage",
      href: "/locum-provision",
      linkLabel: "Explore the Locum platform",
      deliverables: [
        "Editorial direction",
        "Content hierarchy",
        "Article navigation",
      ],
      brief:
        "Make professional guidance feel approachable and give readers a useful way to find information relevant to their location and interests.",
      approach:
        "An editorial masthead, prominent lead story and quieter article rows. Ireland and UK filters sit alongside topic navigation, with an emphasis on readable typography and local context.",
    },
    {
      imageSrc: careDesignImage,
      id: "care",
      name: "More time for what matters.",
      category: "Product UX",
      summary:
        "MployUs Care — making complex care software easier to understand.",
      image: "care-management",
      tone: "sand",
      href: "/care-management",
      linkLabel: "Explore Care Management",
      deliverables: [
        "Information architecture",
        "Interface design",
        "Platform storytelling",
      ],
      brief:
        "Explain a complex platform in a way that helps care teams understand the people and workflows behind the software.",
      approach:
        "A warm visual identity, clear feature groupings and focused interface previews. The experience connects care planning, medication records and operational workflows without overwhelming the visitor.",
    },
    {
      id: "shift-experience",
      name: "Flexibility, thoughtfully designed.",
      category: "Product UX",
      summary:
        "MployUs Locums — a clearer interface for finding the right shift.",
      image: "locum-shifts",
      tone: "sage",
      href: "/locum-provision",
      linkLabel: "Explore the Locum platform",
      deliverables: [
        "Search experience",
        "Shift information",
        "Responsive journeys",
      ],
      brief:
        "Help healthcare professionals understand the location, requirements and practical details of an opportunity before making their next move.",
      approach:
        "A scannable shift finder with regional filters, detailed briefs and guided applications. The design prioritises clarity across desktop and mobile so professionals can find and apply for the right shift quickly.",
    },
  ],
  development: [
    {
      id: "compliance",
      name: "Compliance, always in view.",
      category: "Compliance",
      summary:
        "A compliance dashboard that brings scoring, document registers, alerts and the audit trail into one place.",
      image: "compliance",
      tone: "sage",
      deliverables: ["Compliance scoring", "Document register", "Audit trail"],
      brief:
        "Give a business one clear view of its compliance position across areas such as data protection, security and HR, and surface expiring or overdue items before they become risks.",
      approach:
        "An overview that scores compliance by category and lists active alerts, a document register with clear statuses for valid, expiring, expired and required items, and a chronological audit trail of every review, filing and update.",
    },
    {
      id: "reports",
      name: "Insight, not just numbers.",
      category: "Reporting",
      summary:
        "A reporting dashboard that turns revenue, client, operations and workforce data into clear insights and scheduled reports.",
      image: "reports",
      tone: "sand",
      deliverables: ["Insight cards", "Client profitability", "Scheduled reports"],
      brief:
        "Help a growing business see what is changing across revenue, clients, delivery and people, and where to act first.",
      approach:
        "Colour-coded insight cards with headline figures and trend lines, client revenue and profitability views, and saved reports that can be run, scheduled, paused and exported.",
    },
    {
      id: "crm",
      name: "Every deal, in motion.",
      category: "CRM",
      summary:
        "A CRM pipeline where deals move between stages with drag and drop, from first lead to won.",
      image: "crm",
      tone: "rose",
      deliverables: ["Drag-and-drop pipeline", "Deal tracking", "Typed deal forms"],
      brief:
        "Give a sales team a live view of every opportunity, from first lead to won deal, with the numbers that matter at a glance.",
      approach:
        "A kanban pipeline with drag and drop between stages, showing value, win probability and recent activity on every card. New deals can be added as projects, services, products or bids, each with the fields it needs.",
    },
  ],
}

const capabilities: Record<Discipline, [string, string][]> = {
  design: [
    [
      "Product & interface design",
      "Mobile and web apps, dashboards and SaaS portals, shaped around real tasks.",
    ],
    [
      "Research & prototyping",
      "Journey mapping, usability testing and interactive prototypes that settle the right direction early, while changes cost least.",
    ],
    [
      "Design systems",
      "Reusable components, clear typography and consistent interaction patterns that make every future feature quicker to deliver.",
    ],
    [
      "Brand & digital identity",
      "Visual identities and marketing experiences with a distinctive point of view.",
    ],
  ],
  development: [
    [
      "Full-stack websites & web apps",
      "Responsive React interfaces connected to Node.js backends, from marketing websites to complex business applications.",
    ],
    [
      "Node.js backends & APIs",
      "Server-side applications with Node.js and Express, REST APIs, authentication, role-based access and business logic, scoped around your requirements.",
    ],
    [
      "Databases & integrations",
      "PostgreSQL and other suitable data stores, data modelling, migrations, payments, CRM connections and third-party APIs.",
    ],
    [
      "Mobile experiences",
      "Mobile-first journeys and cross-platform applications connected to the same back-end services.",
    ],
    [
      "Cloud & deployment",
      "Hosting, Docker, CI/CD pipelines, monitoring and operational handover, with security requirements agreed upfront.",
    ],
    [
      "Automation & ongoing support",
      "Background jobs, workflow automation, maintenance and iterative improvements across the front end and back end, with support scoped to what you need.",
    ],
  ],
}

export function StudioPortfolio({
  discipline,
  onBackToHome,
}: {
  discipline: Discipline
  onBackToHome: () => void
  onBookDemo: (moduleTitle?: string) => void
}) {
  const design = discipline === "design"
  const visuals = design ? STUDIO_VISUALS : WEB_STUDIO_VISUALS
  const work = projects[discipline]
  const [category, setCategory] = useState("All work")
  const [selected, setSelected] = useState<Project | null>(null)
  const [enquiryProject, setEnquiryProject] =
    useState<Pick<Project, "name"> | null>(null)
  const [openCapability, setOpenCapability] = useState<number | null>(0)
  const returnFocus = useRef<HTMLElement | null>(null)
  // The closing project dialog must not steal focus from the enquiry opening next.
  const openingEnquiry = useRef(false)
  // Recordings loop for longer than five seconds, so visitors can pause them;
  // a reduced-motion preference starts on the still posters instead.
  const reduceMotion = useReducedMotion() !== false
  const [previewsPlaying, setPreviewsPlaying] = useState(!reduceMotion)
  const previewToggle = (className = "") => (
    <button
      type="button"
      className={`studio-preview-toggle ${className}`}
      onClick={() => setPreviewsPlaying(!previewsPlaying)}
    >
      {previewsPlaying ? (
        <Pause size={14} aria-hidden="true" />
      ) : (
        <Play size={14} aria-hidden="true" />
      )}
      <span>{previewsPlaying ? "Pause previews" : "Play previews"}</span>
    </button>
  )
  const filters = [
    "All work",
    ...new Set(work.map((project) => project.category)),
  ]
  const visible = work.filter(
    (project) => category === "All work" || project.category === category,
  )
  const featuredProject = category === "All work" ? visible[0] : null
  const carouselProjects = featuredProject ? visible.slice(1) : visible
  const discuss = () => {
    returnFocus.current = (document.activeElement as HTMLElement)
    openingEnquiry.current = true
    setEnquiryProject({ name: "Your next project" })
  }
  const projectImage = (project: Project) =>
    project.imageSrc || `/images/studio/${project.image}.png`
  const projectScreen = (project: Project, alt: string, lazy = false) => {
    const demo = PROJECT_DEMOS[project.image]
    // Recordings are shown whole, so they skip the tall care crop.
    if (demo)
      return (
        <img
          src={`/images/studio/demos/${project.image}.${
            previewsPlaying ? "gif" : "webp"
          }`}
          alt={`${
            previewsPlaying ? "Screen recording" : "Still from a screen recording"
          } of ${demo.description}`}
          width={demo.width}
          height={demo.height}
          loading={lazy ? "lazy" : undefined}
          decoding="async"
        />
      )
    return project.id === "care" || project.id === "care-platform" ? (
      <div
        className={`studio-reference-crop studio-reference-care-crop ${
          design ? "" : "studio-reference-web-care-crop"
        }`}
      >
        <img
          src={projectImage(project)}
          alt={alt}
          loading={lazy ? "lazy" : undefined}
        />
      </div>
    ) : (
      <img
        src={projectImage(project)}
        alt={alt}
        loading={lazy ? "lazy" : undefined}
      />
    )
  }
  const sectionId = (section: string) => `${discipline}-${section}`
  function openProject(project: Project) {
    returnFocus.current = (document.activeElement as HTMLElement)
    setSelected(project)
  }
  const projectCard = (project: Project, featured = false) => (
    <button
      key={project.id}
      className={`studio-project ${featured ? "studio-project-featured" : ""}`}
      onClick={() => openProject(project)}
    >
      <div className={`studio-project-stage studio-stage-${project.tone}`}>
        <span className="studio-project-number">
          0{work.indexOf(project) + 1} / {project.category.toUpperCase()}
        </span>
        <div className="studio-browser">
          <div className="studio-browser-bar">
            <span />
            <span />
            <span />
            <p>
              {design ? "mployus" : "dashboard"} / {project.image}
            </p>
          </div>
          {projectScreen(
            project,
            `${project.summary} — screenshot of the existing MployUs interface`,
            true,
          )}
        </div>
        <span className="studio-project-open">
          {
            <img
              src={
                design
                  ? project.id === "journal"
                    ? visuals.page.journalArrow[0]
                    : visuals.page.projectArrow[0]
                  : visuals.page.projectArrow[work.indexOf(project)] ||
                    visuals.page.projectArrow[0]
              }
              alt=""
              className="studio-reference-icon"
            />
          }
        </span>
      </div>
      <div className="studio-project-info">
        <div>
          <h3>{project.name}</h3>
          <p>{project.summary}</p>
        </div>
        <span>
          {project.category}
          <br />
          <small>In-house project</small>
        </span>
      </div>
    </button>
  )
  return (
    <div
      className="studiofolio"
      data-discipline={discipline}
      data-studio-reference=""
    >
      <div className="studio-subnav studio-container">
        <button onClick={onBackToHome}>
          {
            <img
              src={visuals.page.back[0]}
              alt=""
              className="studio-reference-icon"
            />
          }{" "}
          Back to homepage
        </button>
        <nav
          aria-label={`${
            design ? "Product design" : "Web development"
          } page sections`}
        >
          <a href={`#${sectionId("work")}`}>Selected work</a>
          <a href={`#${sectionId("approach")}`}>Our approach</a>
          <a href={`#${sectionId("capabilities")}`}>Capabilities</a>
        </nav>
        <span>
          {
            <img
              src={visuals.page.studio[0]}
              alt=""
              className="studio-reference-icon"
            />
          }{" "}
          MployUs Studio
        </span>
      </div>

      <section
        className="studio-hero studio-container"
        aria-labelledby={`${discipline}-heading`}
      >
        <div className="studio-eyebrow">
          <span className="studio-dot" />
          {design
            ? "PRODUCT DESIGN & DIGITAL EXPERIENCES"
            : "FULL-STACK WEB & APPLICATION DEVELOPMENT"}
          <span className="studio-location">Ireland & the UK</span>
        </div>
        <div className="studio-hero-copy">
          <h1 id={`${discipline}-heading`}>
            {design ? (
              <>
                Designed for you.
                <br />
                <em>Fast and fair.</em>
              </>
            ) : (
              <>
                Built for you.
                <br />
                <em>Fast and fair.</em>
              </>
            )}
          </h1>
          <div className="studio-hero-description">
            <p>
              {design
                ? "Thoughtful interfaces and clearer journeys from one capable team — delivered at pace, never rushed, and priced for the value they create. Explore the craft behind our in-house work."
                : "From the interface to the infrastructure — React, Node.js, APIs and databases, built by one capable team. Delivered at pace, never rushed, and priced for the value it creates. Explore our work below."}
            </p>
            <a className="studio-text-link" href={`#${sectionId("work")}`}>
              Explore our work{" "}
              {
                <img
                  src={visuals.page.explore[0]}
                  alt=""
                  className="studio-reference-icon"
                />
              }
            </a>
          </div>
        </div>
        <button
          className={`studio-hero-stage studio-stage-${work[0].tone}`}
          onClick={() => openProject(work[0])}
          aria-label={`View project notes: ${work[0].name}`}
        >
          <span className="studio-stage-label">
            {design ? "IN-HOUSE PROJECT" : "PRODUCT DASHBOARD"} / 01
          </span>
          <div className="studio-browser studio-hero-browser">
            <div className="studio-browser-bar">
              <span />
              <span />
              <span />
              <p>
                {design ? "mployus / recruitment" : `dashboard / ${work[0].image}`}
              </p>
            </div>
            {design ? (
              <img
                src={projectImage(work[0])}
                alt="Actual MployUs recruitment website interface"
                fetchPriority="high"
              />
            ) : (
              projectScreen(work[0], work[0].summary)
            )}
          </div>
          <div
            className="studio-mini-browser studio-browser"
            aria-hidden="true"
          >
            <div className="studio-browser-bar">
              <span />
              <span />
              <span />
              <p>{design ? "mployus / care" : `dashboard / ${work[1].image}`}</p>
            </div>
            {design ? (
              <div className="studio-reference-crop studio-reference-hero-crop">
                <img src={careDesignImage} alt="" />
              </div>
            ) : (
              <img src={`/images/studio/demos/${work[1].image}.webp`} alt="" />
            )}
          </div>
          <span className="studio-stage-caption">
            {design
              ? "Clarity, from the very first click."
              : "Built around the people using it."}
          </span>
          <span className="studio-stage-arrow">
            {
              <img
                src={visuals.page.heroArrow[0]}
                alt=""
                className="studio-reference-icon"
              />
            }
          </span>
        </button>
        <div className="studio-hero-meta">
          <span>Independent thinking. Connected experiences.</span>
          <span>
            {design
              ? "In-house work · MployUs products"
              : "Product dashboards · Real recordings"}
          </span>
        </div>
      </section>

      <section id={sectionId("work")} className="studio-work studio-container">
        <div className="studio-section-heading">
          <div>
            <p className="studio-eyebrow">01 / A CLOSER LOOK</p>
            <h2>
              Work with <em>purpose.</em>
            </h2>
          </div>
          <p>
            {design
              ? "Real MployUs interfaces, recorded in use."
              : "Real product dashboards, recorded in use."}
            <br />
            Not stock mock-ups. Not invented client results.
          </p>
        </div>
        <div className="studio-work-toolbar">
          <div aria-label="Filter projects" className="studio-filters">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setCategory(filter)}
                aria-pressed={category === filter}
              >
                {filter}
              </button>
            ))}
          </div>
          <span aria-live="polite">
            {String(visible.length).padStart(2, "0")} projects
          </span>
          {previewToggle()}
        </div>
        <div className="studio-project-grid">
          {featuredProject && projectCard(featuredProject, true)}
          {carouselProjects.length > 0 && (
            <StudioProjectCarousel
              key={category}
              id={`${discipline}-project-carousel`}
              label={`${
                design ? "Product design" : "Web development"
              } projects`}
              previousIcon={visuals.page.previous[0]}
              nextIcon={visuals.page.next[0]}
            >
              {carouselProjects.map((project) => projectCard(project))}
            </StudioProjectCarousel>
          )}
        </div>
      </section>

      <section id={sectionId("approach")} className="studio-approach">
        <div className="studio-container">
          <div className="studio-section-heading">
            <div>
              <p className="studio-eyebrow">02 / HOW WE THINK</p>
              <h2>
                {design ? (
                  <>
                    Less guesswork.
                    <br />
                    <em>More momentum.</em>
                  </>
                ) : (
                  <>
                    Good foundations.
                    <br />
                    <em>Faster progress.</em>
                  </>
                )}
              </h2>
            </div>
            <p>
              Clear scope. Clear quote. Visible progress.
              <br />A focused route from idea to delivery.
            </p>
          </div>
          <div className="studio-process">
            {(design
              ? [
                  [
                    "Understand",
                    "Start with the people, the problem and the context. Agree what success looks like, with a clear scope and quote before work begins.",
                  ],
                  [
                    "Explore",
                    "Share early concepts and practical prototypes quickly, so the important decisions are made together rather than discovered late.",
                  ],
                  [
                    "Refine",
                    "Develop the visual language, check the details and hand over documented, developer-ready designs.",
                  ],
                ]
              : [
                  [
                    "Define",
                    "Agree the scope, integrations and acceptance criteria, with a clear quote before the build begins. Choose the tools around the problem, not the trend.",
                  ],
                  [
                    "Build",
                    "Deliver working increments early — front-end interfaces, Node.js services, APIs and data models — so progress stays visible and feedback stays quick.",
                  ],
                  [
                    "Review",
                    "Moving quickly never means skipping checks. Test end-to-end journeys and API behaviour, review accessibility and performance, then plan deployment, monitoring, handover and ongoing support.",
                  ],
                ]
            ).map(([title, text], index) => (
              <div key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <div className="studio-standards">
            {[
              "Accessibility considered from the start",
              "Privacy-conscious design",
              "Built for mobile, not just desktop",
            ].map((label, index) => (
              <span key={label}>
                {
                  <img
                    src={visuals.page.standards[index]}
                    alt=""
                    className="studio-reference-icon"
                  />
                }
                {label}
              </span>
            ))}
          </div>
          <p className="studio-standards-note">
            For UK projects, scope includes reviewing WCAG 2.2 AA targets and UK
            GDPR responsibilities. Conformance and compliance require
            project-specific assessment, not a blanket promise.
          </p>
        </div>
      </section>

      <section
        id={sectionId("capabilities")}
        className="studio-capabilities studio-container"
      >
        <div>
          <p className="studio-eyebrow">03 / WHAT WE BRING</p>
          <h2>
            {design ? (
              <>
                From first idea
                <br />
                to <em>every detail.</em>
              </>
            ) : (
              <>
                The right tools.
                <br />
                The <em>right reasons.</em>
              </>
            )}
          </h2>
          <p>
            {design
              ? "Product design, research, systems and identity — brought together around your brief, with a clear quote from the outset."
              : "End-to-end engineering: front-end experiences, Node.js backends, databases and cloud deployment. The stack — and the quote — are shaped around your project, not the other way round."}
          </p>
          {!design && (
            <div className="studio-stack">
              {[
                "React",
                "TypeScript",
                "Node.js",
                "Express",
                "PostgreSQL",
                "REST APIs",
                "Docker",
                "AWS",
              ].map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
          )}
          <Link
            className="studio-text-link"
            to={design ? "/web-development" : "/product-design"}
          >
            {design
              ? "Explore our development work"
              : "Explore our design work"}
            {
              <img
                src={visuals.page.development[0]}
                alt=""
                className="studio-reference-icon"
              />
            }
          </Link>
        </div>
        <div className="studio-capability-list">
          {capabilities[discipline].map(([title, text], index) => (
            <div key={title}>
              <button
                aria-expanded={openCapability === index}
                aria-controls={`${discipline}-capability-${index}`}
                onClick={() =>
                  setOpenCapability(openCapability === index ? null : index)
                }
              >
                <span>0{index + 1}</span>
                {title}
                <span className="studio-capability-sign" aria-hidden="true">
                  {
                    <img
                      src={
                        openCapability === index
                          ? visuals.page.minus[0]
                          : visuals.page.plus[Math.max(0, index - 1)]
                      }
                      alt=""
                      className="studio-reference-icon"
                    />
                  }
                </span>
              </button>
              <div
                id={`${discipline}-capability-${index}`}
                hidden={openCapability !== index}
              >
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="studio-contact">
        <div className="studio-container">
          <p className="studio-eyebrow">
            YOUR NEXT PROJECT STARTS WITH A CONVERSATION
          </p>
          <div>
            <h2>
              Something in mind?
              <br />
              <em>Let’s get it moving.</em>
            </h2>
            <div>
              <button className="studio-button" onClick={discuss}>
                Discuss your project{" "}
                {
                  <img
                    src={visuals.page.discuss[0]}
                    alt=""
                    className="studio-reference-icon"
                  />
                }
              </button>
              <p>
                A clear, fair quote shaped around your brief.
                <br />
                No one-size-fits-all pricing.
              </p>
            </div>
          </div>
          <button className="studio-back-link" onClick={onBackToHome}>
            <ArrowLeft size={14} />
            Back to homepage
          </button>
        </div>
      </section>

      <Dialog.Root
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null)
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay
            className="studio-dialog-overlay"
            data-discipline={discipline}
          />
          {selected && (
            <Dialog.Content
              className="studio-dialog studiofolio"
              data-discipline={discipline}
              data-studio-reference=""
              onCloseAutoFocus={(event) => {
                event.preventDefault()
                if (!openingEnquiry.current && returnFocus.current?.isConnected)
                  returnFocus.current.focus()
              }}
            >
              <Dialog.Close
                className="studio-dialog-close"
                aria-label="Close project notes"
              >
                {
                  <img
                    src={visuals.notes.close[0]}
                    alt=""
                    className="studio-reference-icon"
                  />
                }
              </Dialog.Close>
              <p className="studio-eyebrow">
                {selected.category} /{" "}
                {design ? "IN-HOUSE PROJECT" : "PRODUCT DASHBOARD"}
              </p>
              <Dialog.Title className="studio-dialog-title">
                {selected.name}
              </Dialog.Title>
              <Dialog.Description className="studio-dialog-description">
                {selected.summary}
              </Dialog.Description>
              <div
                className={`studio-dialog-image studio-stage-${selected.tone}`}
              >
                {projectScreen(
                  selected,
                  `Interface for ${selected.name}`,
                )}
                {PROJECT_DEMOS[selected.image] &&
                  previewToggle("studio-dialog-preview-toggle")}
              </div>
              <div className="studio-dialog-tags">
                {selected.deliverables.map((deliverable) => (
                  <span key={deliverable}>{deliverable}</span>
                ))}
              </div>
              <div className="studio-dialog-notes">
                <section>
                  <h3>The brief</h3>
                  <p>{selected.brief}</p>
                </section>
                <section>
                  <h3>
                    {design ? "The design thinking" : "The implementation"}
                  </h3>
                  <p>{selected.approach}</p>
                </section>
              </div>
              <div className="studio-dialog-actions">
                {selected.href && selected.linkLabel && (
                  <Link
                    to={selected.href}
                    className="studio-button"
                    onClick={() => setSelected(null)}
                  >
                    {selected.linkLabel}
                    {
                      <img
                        src={visuals.notes.explore[0]}
                        alt=""
                        className="studio-reference-icon"
                      />
                    }
                  </Link>
                )}
                <button
                  className="studio-text-link"
                  onClick={() => {
                    openingEnquiry.current = true
                    setEnquiryProject(selected)
                    setSelected(null)
                  }}
                >
                  Discuss a similar project
                  {
                    <img
                      src={visuals.notes.discuss[0]}
                      alt=""
                      className="studio-reference-icon"
                    />
                  }
                </button>
              </div>
            </Dialog.Content>
          )}
        </Dialog.Portal>
      </Dialog.Root>
      {enquiryProject && (
        <ProjectEnquiryDialog
          projectName={enquiryProject.name}
          discipline={discipline}
          onClose={() => {
            openingEnquiry.current = false
            setEnquiryProject(null)
            requestAnimationFrame(() => returnFocus.current?.focus())
          }}
        />
      )}
    </div>
  )
}
