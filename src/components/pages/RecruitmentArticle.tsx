import { RECRUITMENT_VISUALS } from "../../data/recruitmentVisuals"
import { useState } from "react"
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock,
  Copy,
  MapPin,
} from "lucide-react"

export type RecruitmentStory = {
  img: string
  cat: string
  date: string
  read: string
  title: string
  excerpt: string
  region: string
}

const CONTENT: Record<string, {
  heading: string
  text: string
}[]> = {
  "How Irish SMEs are rethinking recruitment in 2026": [
    {
      heading: "Start with the work, not the vacancy",
      text: "Before replacing a departing employee like for like, take a fresh look at what the team actually needs. Identify the tasks that keep services running, the skills that are missing and the responsibilities that could be shared. A clear brief gives candidates a more honest picture of the role and helps hiring managers make consistent decisions.",
    },
    {
      heading: "Make the candidate experience count",
      text: "Smaller employers can offer something valuable: a direct conversation with the people a new hire will work alongside. Set out the salary range, working pattern and interview stages early. Keep candidates informed, even when there is no decision yet. A straightforward process respects their time and makes your organisation easier to choose.",
    },
    {
      heading: "Build a plan beyond the next hire",
      text: "Recruitment works best when it connects to retention. Agree an induction plan before someone starts, arrange regular check-ins and make development opportunities visible. Review which roles are ongoing needs and which are better suited to temporary cover. The aim is a team that can grow sustainably, rather than a cycle of urgent replacements.",
    },
  ],
  "Contract vs. permanent: which model fits your growth stage?": [
    {
      heading: "Separate core needs from changing demand",
      text: "Permanent recruitment can support continuity, long-term relationships and skills development. Contract staffing can help with a defined project, an absence or a seasonal peak. Start by asking whether the work is predictable and ongoing, rather than choosing a model simply because it feels faster.",
    },
    {
      heading: "Compare the full commitment",
      text: "Consider induction time, supervision, scheduling and the cost of repeated handovers alongside pay. Be clear about who employs the worker and what obligations apply. Employment status depends on the actual arrangement, not just the label on a contract; seek qualified advice where the position is uncertain.",
    },
    {
      heading: "Create one team experience",
      text: "Whichever model you choose, everyone needs a clear brief, appropriate access and a named point of contact. Give temporary colleagues the information they need to work safely and effectively. Review the arrangement as demand changes, and communicate any next steps well before a contract ends.",
    },
  ],
  "Workforce trends shaping healthcare staffing this year": [
    {
      heading: "Plan for continuity as well as coverage",
      text: "A filled roster is only the beginning. Healthcare employers also need the right skill mix, safe handovers and familiarity with service users. Map predictable absences and demand changes early so that flexible cover complements the permanent team rather than becoming a last-minute substitute for planning.",
    },
    {
      heading: "Keep professional checks role-specific",
      text: "Check the registration, qualifications and suitability requirements for each role. In Ireland, relevant regulators may include NMBI or CORU, depending on the profession. Vetting, references and any required training should be confirmed through the appropriate process before placement; requirements are not interchangeable between roles.",
    },
    {
      heading: "Listen to the people delivering care",
      text: "Working patterns, induction and access to development all shape the day-to-day experience. Ask staff what makes a roster sustainable and where support is missing. Practical improvements to communication and supervision can help build a more stable team without relying on unsupported assumptions about the wider labour market.",
    },
  ],
  "Why logistics companies struggle to retain warehouse staff": [
    {
      heading: "Look beyond the vacancy rate",
      text: "Review when people leave and what they tell you about the experience. Shift predictability, travel, physical demands and supervision can all influence whether a role is workable. Exit conversations and early check-ins are more useful than assuming every departure is about pay.",
    },
    {
      heading: "Set expectations before day one",
      text: "Describe the shift pattern, location, duties and working environment accurately. Explain training and safety procedures, and give new starters a contact for questions. Matching expectations to reality reduces avoidable friction during the first few weeks.",
    },
    {
      heading: "Make progression visible",
      text: "Help team members understand how they can develop skills or move into supervisory roles. Recognise dependable work and review schedules with the team. Retention is an ongoing operational responsibility, not a task that ends when recruitment is complete.",
    },
  ],
  "Building a hospitality team that survives the summer peak": [
    {
      heading: "Work backwards from your busiest weeks",
      text: "Use bookings, opening hours and previous staffing experience to identify the likely pressure points. Build in time for recruitment and training before the peak arrives. Plan for absences as well as demand, rather than assuming every team member will be available throughout the season.",
    },
    {
      heading: "Recruit for the real working pattern",
      text: "Be explicit about weekend work, late finishes and the expected contract length. Ask candidates about availability early and avoid promising hours you cannot reliably offer. Clear expectations help both sides decide whether the role is a good fit.",
    },
    {
      heading: "Protect the guest and team experience",
      text: "Give seasonal hires a practical induction and pair them with experienced colleagues. Keep handovers short and useful, with clear escalation routes. After the peak, record what worked and stay in touch with suitable team members for future opportunities.",
    },
  ],
  "The SNA shortage in Irish schools: what recruiters are seeing": [
    {
      heading: "Define the support the role requires",
      text: "Start with a clear description of the role, the school environment and the working pattern. Explain how the Special Needs Assistant will work with teachers and other staff. Avoid including identifying details about pupils in recruitment materials.",
    },
    {
      heading: "Allow time for the right checks",
      text: "Confirm current qualification, suitability and Garda vetting requirements through the relevant official guidance and school procedures. A tight timeline should not mean skipping essential checks. Keep applicants informed about the process and what documents they will need.",
    },
    {
      heading: "Support the person after appointment",
      text: "A useful induction covers responsibilities, safeguarding, communication and the school’s approach to support. Provide a named colleague for questions and regular opportunities to review how the role is working. This article is practical guidance, not a verified assessment of national vacancy levels.",
    },
  ],
  "Hiring across the UK: a regional approach": [
    {
      heading: "Build a local recruitment brief",
      text: "England, Northern Ireland, Wales and Scotland should not be treated as a single recruitment location. Specify the workplace, travel expectations and working pattern. Local accessibility and candidate availability matter as much as the job title.",
    },
    {
      heading: "Check the requirements for each nation",
      text: "Professional registration and safeguarding processes depend on the role and location. Relevant disclosure routes can include DBS in England and Wales, AccessNI in Northern Ireland and Disclosure Scotland. Confirm the current requirements through official guidance rather than assuming one check covers every placement.",
    },
    {
      heading: "Keep the experience consistent",
      text: "Use a shared approach to interviews, communication and onboarding while making room for local requirements. Give hiring teams a clear checklist and candidates a realistic timeline. Review outcomes by location so that regional differences inform your next recruitment brief.",
    },
  ],
  "Building resilient healthcare teams in the UK": [
    {
      heading: "Balance a stable core with flexible cover",
      text: "Identify the roles that support continuity and the gaps that require short-term cover. Build workforce plans around the needs of the service and the competencies required on each shift. Flexible staffing is most effective when it strengthens, rather than replaces, the core team.",
    },
    {
      heading: "Verify credentials before placement",
      text: "Confirm the applicable professional registration, right-to-work and safeguarding checks for the role and UK nation. NMC and HCPC requirements apply to different professions; other roles have different requirements. Use current regulator guidance and your organisation’s own governance procedures.",
    },
    {
      heading: "Invest in clear handovers",
      text: "Ensure incoming colleagues understand local procedures, escalation routes and the limits of their responsibilities. A named supervisor and accessible induction materials help reduce uncertainty. Review placements with both the worker and the service to improve future staffing decisions.",
    },
  ],
}

export function RecruitmentArticle({
  article,
  articles,
  onBack,
  onRead,
  onContact,
}: {
  article: RecruitmentStory
  articles: RecruitmentStory[]
  onBack: () => void
  onRead: (article: RecruitmentStory) => void
  onContact: () => void
}) {
  const [copyStatus, setCopyStatus] = useState("")
  const sections = CONTENT[article.title] ?? []
  const related = articles
    .filter((item) => item.title !== article.title)
    .sort(
      (a, b) =>
        Number(b.region === article.region) -
        Number(a.region === article.region),
    )
    .slice(0, 3)
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopyStatus("Link copied")
    } catch {
      setCopyStatus("Copy the link from your address bar")
    }
  }
  return (
    <article className="recruitment-article recruit-surface">
      <header className="mx-auto max-w-6xl px-6 pb-10 pt-10 md:pt-16">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-[var(--article-muted)] transition-colors hover:text-[var(--article-brand)]"
        >
          <img
            src={RECRUITMENT_VISUALS.article.back[0]}
            alt=""
            className="recruit-reference-icon"
          />{" "}
          Back to all insights
        </button>
        <div className="mt-10 flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-widest text-[var(--article-brand)]">
          <span>{article.cat}</span>
          <span className="text-[var(--article-muted)]">/</span>
          <span className="inline-flex items-center gap-1">
            <img
              src={RECRUITMENT_VISUALS.article.location[0]}
              alt=""
              className="recruit-reference-icon"
            />
            {article.region}
          </span>
        </div>
        <h1 className="mt-5 max-w-4xl text-4xl font-medium leading-tight tracking-tight md:text-6xl">
          {article.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--article-muted)]">
          {article.excerpt}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-black/5 pt-6">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-[var(--article-tint)] text-sm font-semibold text-[var(--article-brand)]">
              m.
            </span>
            <div>
              <p className="text-sm font-medium">MployUs editorial team</p>
              <p className="mt-1 text-xs text-[var(--article-muted)]">
                {article.date} <span className="mx-2">·</span> {article.read}{" "}
                read
              </p>
            </div>
          </div>
          <button
            onClick={copyLink}
            className="inline-flex items-center gap-2 rounded-full border border-black/5 px-4 py-2 text-xs hover:bg-[var(--article-tint)]"
          >
            {copyStatus === "Link copied" ? (
              <Check className="size-4" />
            ) : (
              <img
                src={RECRUITMENT_VISUALS.article.copy[0]}
                alt=""
                className="recruit-reference-icon"
              />
            )}
            <span aria-live="polite">{copyStatus || "Copy article link"}</span>
          </button>
        </div>
      </header>
      <figure className="mx-auto max-w-6xl px-6">
        <img
          src={article.img}
          alt={`Editorial image accompanying ${article.title}`}
          className="aspect-[16/9] w-full rounded-2xl object-cover md:aspect-[21/9]"
        />
        <figcaption className="mt-3 text-xs text-[var(--article-muted)]">
          Perspectives on people, work and better recruitment.
        </figcaption>
      </figure>
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 lg:grid-cols-[240px_1fr] lg:gap-20">
        <aside>
          <nav aria-label="In this article" className="sticky top-28">
            <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-[var(--article-muted)]">
              In this article
            </p>
            <ol className="space-y-4">
              {sections.map((section, index) => (
                <li key={section.heading}>
                  <a
                    href={`#recruitment-section-${index}`}
                    className="flex gap-3 text-sm leading-relaxed transition-colors hover:text-[var(--article-brand)]"
                  >
                    <span className="text-[var(--article-brand)]">
                      0{index + 1}
                    </span>
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
            <p className="mt-8 flex items-center gap-2 border-t border-black/5 pt-5 text-xs text-[var(--article-muted)]">
              <img
                src={RECRUITMENT_VISUALS.article.clock[0]}
                alt=""
                className="recruit-reference-icon"
              />{" "}
              A little time. A fresh perspective.
            </p>
          </nav>
        </aside>
        <div className="max-w-2xl">
          <p className="mb-10 text-xl leading-relaxed">
            Good recruitment starts with a clear understanding of people and the
            work they do. Here are three practical ways to turn that
            understanding into a more considered hiring plan.
          </p>
          {sections.map((section, index) => (
            <section
              key={section.heading}
              id={`recruitment-section-${index}`}
              className="mb-10 scroll-mt-28"
            >
              <h2 className="mb-4 text-2xl font-medium leading-snug">
                {section.heading}
              </h2>
              <p className="text-base leading-8 text-[var(--article-muted)]">
                {section.text}
              </p>
            </section>
          ))}
          <div className="rounded-2xl bg-[var(--article-tint)] p-7">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--article-brand)]">
              The takeaway
            </p>
            <p className="text-xl leading-relaxed">
              Hire with clarity. Support people from day one. Build a team for
              what comes next.
            </p>
          </div>
          <p className="mt-6 text-xs leading-6 text-[var(--article-muted)]">
            General recruitment guidance, not legal or regulatory advice.
            Confirm current requirements with the relevant official bodies
            before making employment or placement decisions.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-y border-black/5 py-6">
            <p className="text-sm">Let’s talk about your next hire.</p>
            <button
              onClick={onContact}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--article-brand)] px-5 py-3 text-sm text-white transition-opacity hover:opacity-90"
            >
              Talk to our team{" "}
              <img
                src={RECRUITMENT_VISUALS.article.talk[0]}
                alt=""
                className="recruit-reference-icon"
              />
            </button>
          </div>
        </div>
      </div>
      <section className="bg-[var(--article-paper)] py-14">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs uppercase tracking-widest text-[var(--article-brand)]">
                Keep exploring
              </p>
              <h2 className="text-3xl font-medium">Your next perspective.</h2>
            </div>
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-sm"
            >
              All insights{" "}
              <img
                src={RECRUITMENT_VISUALS.article.all[0]}
                alt=""
                className="recruit-reference-icon"
              />
            </button>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {related.map((item, index) => (
              <button
                key={item.title}
                onClick={() => onRead(item)}
                className="group text-left"
              >
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={item.img}
                    alt=""
                    loading="lazy"
                    className="aspect-[3/2] w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
                  />
                </div>
                <p className="mt-4 text-xs text-[var(--article-brand)]">
                  {item.cat} · {item.region}
                </p>
                <h3 className="mt-2 text-lg font-medium leading-snug group-hover:text-[var(--article-brand)]">
                  {item.title}
                </h3>
                <span className="mt-4 inline-flex items-center gap-2 text-xs text-[var(--article-muted)]">
                  {item.read} read{" "}
                  <img
                    src={RECRUITMENT_VISUALS.article.related[index]}
                    alt=""
                    className="recruit-reference-icon"
                  />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </article>
  )
}
