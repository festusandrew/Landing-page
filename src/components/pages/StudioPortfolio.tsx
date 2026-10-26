import { useRef, useState } from "react"
import { Link } from "react-router"
import * as Dialog from "@radix-ui/react-dialog"
import { ArrowLeft } from "lucide-react"
import "./studio-portfolio.css"
import { ProjectEnquiryDialog } from "../modals/ProjectEnquiryDialog"
import { StudioProjectCarousel } from "../StudioProjectCarousel"
import { STUDIO_VISUALS } from "../../data/studioVisuals"
import { WEB_STUDIO_VISUALS } from "../../data/webStudioVisuals"
import webShiftImage from "../../imports/web-studio-reference/4daaa.png"
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
  href: string
  linkLabel: string
  deliverables: string[]
  brief: string
  approach: string
  imageSrc?: string
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
      imageSrc: webShiftImage,
      id: "shifts",
      name: "The right shift. Less friction.",
      category: "Web apps",
      summary:
        "MployUs Locums — a responsive, filterable shift-finding experience.",
      image: "locum-shifts",
      tone: "sage",
      href: "/locum-provision",
      linkLabel: "Explore the Locum platform",
      deliverables: ["React interfaces", "Regional filtering", "Guided forms"],
      brief:
        "Help healthcare professionals explore opportunities by location and inspect the practical details before starting an application.",
      approach:
        "Reusable React interfaces, Ireland and UK-nation filters, detailed shift briefs and multi-step applications. Responsive layouts keep the core actions accessible on smaller screens.",
    },
    {
      id: "recruit-site",
      name: "From first visit to next step.",
      category: "Websites",
      summary:
        "MployUs Recruit — a connected website for candidates and employers.",
      image: "recruitment",
      tone: "rose",
      href: "/recruitment-service",
      linkLabel: "Explore Recruitment",
      deliverables: ["Responsive website", "Article views", "Form validation"],
      brief:
        "Create a connected digital front door for recruitment, serving both people looking for work and teams looking to hire.",
      approach:
        "A React website with job and insight filters, article detail views and validated front-end forms. Shared patterns make the experience consistent across employer enquiries, applications and accounts.",
    },
    {
      imageSrc: careDesignImage,
      id: "care-platform",
      name: "Complexity, considered.",
      category: "Platforms",
      summary:
        "MployUs Care — a modular front-end for a connected care platform.",
      image: "care-management",
      tone: "sand",
      href: "/care-management",
      linkLabel: "Explore Care Management",
      deliverables: [
        "Component architecture",
        "Responsive layouts",
        "Platform navigation",
      ],
      brief:
        "Present a broad care-management offering through a modular interface that can evolve as the product grows.",
      approach:
        "Component-based layouts, focused product sections and reusable navigation patterns.",
    },
    {
      id: "journal-site",
      name: "Useful knowledge. Easy to find.",
      category: "Websites",
      summary:
        "The Locum Journal — a responsive editorial experience for healthcare professionals.",
      image: "locum-journal",
      tone: "sage",
      href: "/locum-provision",
      linkLabel: "Explore the Locum platform",
      deliverables: [
        "Editorial layouts",
        "Content filters",
        "Article navigation",
      ],
      brief:
        "Connect professionals with practical, location-relevant articles through a clear, accessible browsing experience.",
      approach:
        "Responsive article layouts, Ireland/UK and topic filters, and reusable content patterns.",
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
      "Journey mapping, usability testing and interactive prototypes to explore the right direction.",
    ],
    [
      "Design systems",
      "Reusable components, clear typography and consistent interaction patterns.",
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
      "Background jobs, workflow automation, maintenance and iterative improvements across the front end and back end.",
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
  const projectScreen = (project: Project, alt: string, lazy = false) =>
    project.id === "care" || project.id === "care-platform" ? (
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
            <p>mployus / {project.image}</p>
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
                Good design.
                <br />
                <em>Better everyday.</em>
              </>
            ) : (
              <>
                Thoughtfully built.
                <br />
                <em>Made to work.</em>
              </>
            )}
          </h1>
          <div className="studio-hero-description">
            <p>
              {design
                ? "Thoughtful interfaces. Clearer journeys. Products that put people first. Explore the thinking and craft behind our in-house digital work."
                : "From the interface to the infrastructure. Full-stack development with React, Node.js backends, APIs and databases — brought together around your business. Explore our digital work below."}
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
          <span className="studio-stage-label">IN-HOUSE PROJECT / 01</span>
          <div className="studio-browser studio-hero-browser">
            <div className="studio-browser-bar">
              <span />
              <span />
              <span />
              <p>{design ? "mployus / recruitment" : "mployus / locums"}</p>
            </div>
            <img
              src={projectImage(work[0])}
              alt={
                design
                  ? "Actual MployUs recruitment website interface"
                  : "Actual MployUs locum shift finder interface"
              }
              fetchPriority="high"
            />
          </div>
          <div
            className="studio-mini-browser studio-browser"
            aria-hidden="true"
          >
            <div className="studio-browser-bar">
              <span />
              <span />
              <span />
              <p>mployus / care</p>
            </div>
            {design ? (
              <div className="studio-reference-crop studio-reference-hero-crop">
                <img src={careDesignImage} alt="" />
              </div>
            ) : (
              <img src="/images/studio/care-management.png" alt="" />
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
          <span>In-house work · MployUs products</span>
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
            Real interfaces from the MployUs ecosystem.
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
                    <em>More intention.</em>
                  </>
                ) : (
                  <>
                    Good foundations.
                    <br />
                    <em>Better possibilities.</em>
                  </>
                )}
              </h2>
            </div>
            <p>
              Clear briefs. Collaborative decisions.
              <br />A considered route from idea to delivery.
            </p>
          </div>
          <div className="studio-process">
            {(design
              ? [
                  [
                    "Understand",
                    "Start with the people, the problem and the context. Agree what success should look like before choosing a direction.",
                  ],
                  [
                    "Explore",
                    "Map journeys, test concepts and make the important decisions visible through practical prototypes.",
                  ],
                  [
                    "Refine",
                    "Develop the visual language, check the details and document the experience for a confident handover.",
                  ],
                ]
              : [
                  [
                    "Define",
                    "Agree the scope, content, integrations and acceptance criteria. Choose the tools around the problem, not the trend.",
                  ],
                  [
                    "Build",
                    "Develop front-end interfaces, Node.js services, APIs and database models in useful increments, with reusable components and visible progress.",
                  ],
                  [
                    "Review",
                    "Test end-to-end journeys and API behaviour, review accessibility and performance, and plan deployment, monitoring, handover and ongoing support.",
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
              ? "Product design, research, systems and identity — brought together around your brief."
              : "End-to-end engineering: front-end experiences, Node.js backends, databases and cloud deployment. The stack is chosen around your project, not the other way round."}
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
              <em>Let’s make it matter.</em>
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
                A conversation about your brief.
                <br />
                No one-size-fits-all pitch.
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
                {selected.category} / IN-HOUSE PROJECT
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
