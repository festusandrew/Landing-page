import { useRef, useState } from 'react';
import { Link } from 'react-router';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, Code2, Layers, Minus, Plus, X } from 'lucide-react';
import './studio-portfolio.css';

type Discipline = 'design' | 'development';
type Project = {
  id: string; name: string; category: string; summary: string; image: string;
  tone: string; href: string; linkLabel: string; deliverables: string[];
  brief: string; approach: string;
};

const projects: Record<Discipline, Project[]> = {
  design: [
    { id: 'recruit', name: 'A better next chapter.', category: 'Product UX', summary: 'MployUs Recruit — a clearer journey from opportunity to application.', image: 'recruitment', tone: 'rose', href: '/recruitment-service', linkLabel: 'Explore Recruitment', deliverables: ['User journeys', 'Responsive UI', 'Application flows'], brief: 'Bring employers and candidates into one coherent experience, without losing the detail that makes a recruitment decision meaningful.', approach: 'A distinct magenta identity, scannable opportunities and guided application steps. Country-aware fields and a consistent visual language connect the landing page, article views and forms.' },
    { id: 'journal', name: 'A fresh perspective on locum.', category: 'Editorial', summary: 'The Locum Journal — practical knowledge with an editorial point of view.', image: 'locum-journal', tone: 'sage', href: '/locum-provision', linkLabel: 'Explore the Locum platform', deliverables: ['Editorial direction', 'Content hierarchy', 'Article navigation'], brief: 'Make professional guidance feel approachable and give readers a useful way to find information relevant to their location and interests.', approach: 'An editorial masthead, prominent lead story and quieter article rows. Ireland and UK filters sit alongside topic navigation, with an emphasis on readable typography and local context.' },
    { id: 'care', name: 'More time for what matters.', category: 'Product UX', summary: 'MployUs Care — making complex care software easier to understand.', image: 'care-management', tone: 'sand', href: '/care-management', linkLabel: 'Explore Care Management', deliverables: ['Information architecture', 'Interface design', 'Platform storytelling'], brief: 'Explain a complex platform in a way that helps care teams understand the people and workflows behind the software.', approach: 'A warm visual identity, clear feature groupings and focused interface previews. The experience connects care planning, medication records and operational workflows without overwhelming the visitor.' },
  ],
  development: [
    { id: 'shifts', name: 'The right shift. Less friction.', category: 'Web apps', summary: 'MployUs Locums — a responsive, filterable shift-finding experience.', image: 'locum-shifts', tone: 'sage', href: '/locum-provision', linkLabel: 'Explore the Locum platform', deliverables: ['React interfaces', 'Regional filtering', 'Guided forms'], brief: 'Help healthcare professionals explore opportunities by location and inspect the practical details before starting an application.', approach: 'Reusable React interfaces, Ireland and UK-nation filters, detailed shift briefs and multi-step application previews. Responsive layouts keep the core actions accessible on smaller screens.' },
    { id: 'recruit-site', name: 'From first visit to next step.', category: 'Websites', summary: 'MployUs Recruit — a connected website for candidates and employers.', image: 'recruitment', tone: 'rose', href: '/recruitment-service', linkLabel: 'Explore Recruitment', deliverables: ['Responsive website', 'Article views', 'Form validation'], brief: 'Create a connected digital front door for recruitment, serving both people looking for work and teams looking to hire.', approach: 'A React website with job and insight filters, article detail views and validated front-end forms. Shared patterns make the experience consistent across employer enquiries, applications and account previews.' },
    { id: 'care-platform', name: 'Complexity, considered.', category: 'Platforms', summary: 'MployUs Care — a modular front-end for a connected care platform.', image: 'care-management', tone: 'sand', href: '/care-management', linkLabel: 'Explore Care Management', deliverables: ['Component architecture', 'Responsive layouts', 'Platform navigation'], brief: 'Present a broad care-management offering through a modular interface that can evolve as the product grows.', approach: 'Component-based layouts, focused product sections and reusable navigation patterns. The current implementation demonstrates the front-end experience; production data and integrations require separate verification.' },
  ],
};

const capabilities: Record<Discipline, [string, string][]> = {
  design: [
    ['Product & interface design', 'Mobile and web apps, dashboards and SaaS portals, shaped around real tasks.'],
    ['Research & prototyping', 'Journey mapping, usability testing and interactive prototypes to explore the right direction.'],
    ['Design systems', 'Reusable components, clear typography and consistent interaction patterns.'],
    ['Brand & digital identity', 'Visual identities and marketing experiences with a distinctive point of view.'],
  ],
  development: [
    ['Websites & web apps', 'Responsive marketing sites and application interfaces built for everyday use.'],
    ['Mobile experiences', 'Mobile-first journeys and cross-platform application development, scoped to your needs.'],
    ['APIs & integrations', 'Back-end services, payments, CRM and data connections, planned around the project.'],
    ['Cloud & automation', 'Deployment, monitoring and workflow automation, with security requirements agreed upfront.'],
  ],
};

export function StudioPortfolio({ discipline, onBackToHome, onBookDemo }: {
  discipline: Discipline; onBackToHome: () => void; onBookDemo: (moduleTitle?: string) => void;
}) {
  const design = discipline === 'design';
  const work = projects[discipline];
  const [category, setCategory] = useState('All work');
  const [selected, setSelected] = useState<Project | null>(null);
  const [openCapability, setOpenCapability] = useState<number | null>(0);
  const returnFocus = useRef<HTMLElement | null>(null);
  const filters = ['All work', ...new Set(work.map(project => project.category))];
  const visible = work.filter(project => category === 'All work' || project.category === category);
  const discuss = () => onBookDemo(design ? 'Product Design Service' : 'Web Development Service');
  const sectionId = (section: string) => `${discipline}-${section}`;
  function openProject(project: Project) { returnFocus.current = document.activeElement as HTMLElement; setSelected(project); }
  return <div className="studiofolio" data-discipline={discipline}>
    <div className="studio-subnav studio-container">
      <button onClick={onBackToHome}><ArrowLeft size={14} /> Back to homepage</button>
      <nav aria-label={`${design ? 'Product design' : 'Web development'} page sections`}><a href={`#${sectionId('work')}`}>Selected work</a><a href={`#${sectionId('approach')}`}>Our approach</a><a href={`#${sectionId('capabilities')}`}>Capabilities</a></nav>
      <span>{design ? <Layers size={14} /> : <Code2 size={14} />} MployUs Studio</span>
    </div>

    <section className="studio-hero studio-container" aria-labelledby={`${discipline}-heading`}>
      <div className="studio-eyebrow"><span className="studio-dot" />{design ? 'PRODUCT DESIGN & DIGITAL EXPERIENCES' : 'WEB DEVELOPMENT & DIGITAL PLATFORMS'}<span className="studio-location">Ireland & the UK</span></div>
      <div className="studio-hero-copy"><h1 id={`${discipline}-heading`}>{design ? <>Good design.<br /><em>Better everyday.</em></> : <>Thoughtfully built.<br /><em>Made to work.</em></>}</h1>
        <div className="studio-hero-description"><p>{design ? 'Thoughtful interfaces. Clearer journeys. Products that put people first. Explore the thinking and craft behind our in-house digital work.' : 'From a first impression to a complex workflow. Explore the websites and front-end platforms we’ve built to make the everyday feel simpler.'}</p><a className="studio-text-link" href={`#${sectionId('work')}`}>Explore our work <ArrowDown size={16} /></a></div>
      </div>
      <button className={`studio-hero-stage studio-stage-${work[0].tone}`} onClick={() => openProject(work[0])} aria-label={`View project notes: ${work[0].name}`}>
        <span className="studio-stage-label">IN-HOUSE PROJECT / 01</span>
        <div className="studio-browser studio-hero-browser"><div className="studio-browser-bar"><span /><span /><span /><p>{design ? 'mployus / recruitment' : 'mployus / locums'}</p></div><img src={`/images/studio/${work[0].image}.png`} alt={design ? 'Actual MployUs recruitment website interface' : 'Actual MployUs locum shift finder interface'} fetchPriority="high" /></div>
        <div className="studio-mini-browser studio-browser" aria-hidden="true"><div className="studio-browser-bar"><span /><span /><span /><p>mployus / care</p></div><img src="/images/studio/care-management.png" alt="" /></div>
        <span className="studio-stage-caption">{design ? 'Clarity, from the very first click.' : 'Built around the people using it.'}</span><span className="studio-stage-arrow"><ArrowUpRight size={22} /></span>
      </button>
      <div className="studio-hero-meta"><span>Independent thinking. Connected experiences.</span><span>In-house work · Front-end previews</span></div>
    </section>

    <section id={sectionId('work')} className="studio-work studio-container">
      <div className="studio-section-heading"><div><p className="studio-eyebrow">01 / A CLOSER LOOK</p><h2>Work with <em>purpose.</em></h2></div><p>Real interfaces from the MployUs ecosystem.<br />Not stock mock-ups. Not invented client results.</p></div>
      <div className="studio-work-toolbar"><div aria-label="Filter projects" className="studio-filters">{filters.map(filter => <button key={filter} onClick={() => setCategory(filter)} aria-pressed={category === filter}>{filter}</button>)}</div><span aria-live="polite">{String(visible.length).padStart(2, '0')} projects</span></div>
      <div className="studio-project-grid">{visible.map((project, index) => <button key={project.id} className={`studio-project ${index === 0 && category === 'All work' ? 'studio-project-featured' : ''}`} onClick={() => openProject(project)}>
        <div className={`studio-project-stage studio-stage-${project.tone}`}><span className="studio-project-number">0{work.indexOf(project) + 1} / {project.category.toUpperCase()}</span><div className="studio-browser"><div className="studio-browser-bar"><span /><span /><span /><p>mployus / {project.image}</p></div><img src={`/images/studio/${project.image}.png`} alt={`${project.summary} — screenshot of the existing MployUs interface`} loading="lazy" /></div><span className="studio-project-open"><ArrowUpRight size={20} /></span></div>
        <div className="studio-project-info"><div><h3>{project.name}</h3><p>{project.summary}</p></div><span>{project.category}<br /><small>In-house project</small></span></div>
      </button>)}</div>
      <p className="studio-work-note">Shown as front-end previews. Live authentication, submissions and integrations are not implied. Project outcomes have not been independently measured.</p>
    </section>

    <section id={sectionId('approach')} className="studio-approach">
      <div className="studio-container"><div className="studio-section-heading"><div><p className="studio-eyebrow">02 / HOW WE THINK</p><h2>{design ? <>Less guesswork.<br /><em>More intention.</em></> : <>Good foundations.<br /><em>Better possibilities.</em></>}</h2></div><p>Clear briefs. Collaborative decisions.<br />A considered route from idea to delivery.</p></div>
        <div className="studio-process">{(design ? [
          ['Understand', 'Start with the people, the problem and the context. Agree what success should look like before choosing a direction.'],
          ['Explore', 'Map journeys, test concepts and make the important decisions visible through practical prototypes.'],
          ['Refine', 'Develop the visual language, check the details and document the experience for a confident handover.'],
        ] : [
          ['Define', 'Agree the scope, content, integrations and acceptance criteria. Choose the tools around the problem, not the trend.'],
          ['Build', 'Develop in useful increments, with responsive layouts, reusable components and visible progress.'],
          ['Review', 'Test key journeys, review accessibility and performance, and plan hosting, handover and ongoing support.'],
        ]).map(([title, text], index) => <div key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></div>)}</div>
        <div className="studio-standards"><span><Check size={15} />Accessibility considered from the start</span><span><Check size={15} />Privacy-conscious design</span><span><Check size={15} />Built for mobile, not just desktop</span></div>
        <p className="studio-standards-note">For UK projects, scope includes reviewing WCAG 2.2 AA targets and UK GDPR responsibilities. Conformance and compliance require project-specific assessment, not a blanket promise.</p>
      </div>
    </section>

    <section id={sectionId('capabilities')} className="studio-capabilities studio-container"><div><p className="studio-eyebrow">03 / WHAT WE BRING</p><h2>{design ? <>From first idea<br />to <em>every detail.</em></> : <>The right tools.<br />The <em>right reasons.</em></>}</h2><p>{design ? 'Product design, research, systems and identity — brought together around your brief.' : 'Front-end experiences, platform foundations and connected services — scoped to what your business needs.'}</p>{!design && <div className="studio-stack">{['React', 'TypeScript', 'Vite', 'Tailwind CSS'].map(tool => <span key={tool}>{tool}</span>)}</div>}<Link className="studio-text-link" to={design ? '/web-development' : '/product-design'}>{design ? 'Explore our development work' : 'Explore our design work'}<ArrowUpRight size={16} /></Link></div>
      <div className="studio-capability-list">{capabilities[discipline].map(([title, text], index) => <div key={title}><button aria-expanded={openCapability === index} aria-controls={`${discipline}-capability-${index}`} onClick={() => setOpenCapability(openCapability === index ? null : index)}><span>0{index + 1}</span>{title}<span className="studio-capability-sign" aria-hidden="true">{openCapability === index ? <Minus size={18} /> : <Plus size={18} />}</span></button><div id={`${discipline}-capability-${index}`} hidden={openCapability !== index}><p>{text}</p></div></div>)}</div>
    </section>

    <section className="studio-contact"><div className="studio-container"><p className="studio-eyebrow">YOUR NEXT PROJECT STARTS WITH A CONVERSATION</p><div><h2>Something in mind?<br /><em>Let’s make it matter.</em></h2><div><button className="studio-button" onClick={discuss}>Discuss your project <ArrowUpRight size={18} /></button><p>A conversation about your brief.<br />No one-size-fits-all pitch.</p></div></div><button className="studio-back-link" onClick={onBackToHome}><ArrowLeft size={14} />Back to homepage</button></div></section>

    <Dialog.Root open={selected !== null} onOpenChange={open => { if (!open) setSelected(null); }}><Dialog.Portal><Dialog.Overlay className="studio-dialog-overlay" />{selected && <Dialog.Content className="studio-dialog studiofolio" onCloseAutoFocus={event => { event.preventDefault(); if (returnFocus.current?.isConnected) returnFocus.current.focus(); }}>
      <Dialog.Close className="studio-dialog-close" aria-label="Close project notes"><X size={20} /></Dialog.Close>
      <p className="studio-eyebrow">{selected.category} / IN-HOUSE PROJECT</p><Dialog.Title className="studio-dialog-title">{selected.name}</Dialog.Title><Dialog.Description className="studio-dialog-description">{selected.summary}</Dialog.Description>
      <div className={`studio-dialog-image studio-stage-${selected.tone}`}><img src={`/images/studio/${selected.image}.png`} alt={`Actual interface preview for ${selected.name}`} /></div>
      <div className="studio-dialog-tags">{selected.deliverables.map(deliverable => <span key={deliverable}>{deliverable}</span>)}</div>
      <div className="studio-dialog-notes"><section><h3>The brief</h3><p>{selected.brief}</p></section><section><h3>{design ? 'The design thinking' : 'The implementation'}</h3><p>{selected.approach}</p></section><section><h3>Where it stands</h3><p>This is an in-house MployUs front-end preview, not a commissioned client case study. Live services, production compliance and commercial outcomes have not been verified.</p></section></div>
      <div className="studio-dialog-actions"><Link to={selected.href} className="studio-button" onClick={() => setSelected(null)}>{selected.linkLabel}<ArrowUpRight size={16} /></Link><button className="studio-text-link" onClick={() => { setSelected(null); discuss(); }}>Discuss a similar project<ArrowRight size={16} /></button></div>
    </Dialog.Content>}</Dialog.Portal></Dialog.Root>
  </div>;
}
