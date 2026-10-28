import React, { useEffect, useRef, useState } from "react"
import recruitmentIcon from "../imports/navigation-dropdowns/b3169.svg"
import careIcon from "../imports/navigation-dropdowns/2237f.svg"
import productArrow from "../imports/navigation-dropdowns/6f6da.svg"
import locumIcon from "../imports/navigation-dropdowns/60146.svg"
import serviceRecruitmentIcon from "../imports/navigation-dropdowns/3f5d6.svg"
import designIcon from "../imports/navigation-dropdowns/8f45d.svg"
import developmentIcon from "../imports/navigation-dropdowns/df851.svg"
import serviceArrow from "../imports/navigation-dropdowns/3a296.svg"

interface MainNavigationProps {
  onNavigate: (view: string) => void
  onSection: (id: string) => void
  onBookDemo: () => void
  onAction?: () => void
  mobile?: boolean
}

// Each `accent` is the destination page's primary colour: the card's hover fill, and a light
// tint on the overview panel while that card is previewed.
const menus = {
  Products: [
    {
      id: "recruitment-software",
      label: "Recruitment Software",
      icon: recruitmentIcon,
      badge: "ATS Platform",
      description: "Smarter ATS, multi-board job posting & candidate pipeline",
      details:
        "Bring job posting, candidate pipelines and onboarding together in one organised workspace for healthcare recruitment.",
      actionLabel: "Explore recruitment software",
      accent: "#0e1629",
    },
    {
      id: "care-management",
      label: "Care Management Software",
      icon: careIcon,
      badge: "eMAR & Clinical",
      description: "Digital care plans, eMAR medication charts & CQC audits",
      details:
        "Connect care plans, medication records, rotas and daily observations so your team can focus on the people behind the care.",
      actionLabel: "Explore care management",
      accent: "#1d4ed8",
    },
  ],
  Services: [
    {
      id: "locum-provision",
      label: "Locum Provision",
      icon: locumIcon,
      badge: "Popular",
      description: "Urgent shift dispatch & verified locum staff under 2 hrs",
      details:
        "Explore flexible temporary cover and locum opportunities across Ireland and the UK, for providers and healthcare professionals.",
      actionLabel: "Explore locum provision",
      accent: "#368b62",
    },
    {
      id: "recruitment-service",
      label: "Recruitment Service",
      icon: serviceRecruitmentIcon,
      badge: "",
      description: "End-to-end managed hiring, headhunting & DBS vetting",
      details:
        "Find the right people for permanent and international healthcare roles, with specialist support throughout the hiring journey.",
      actionLabel: "Explore recruitment",
      accent: "#810161",
    },
    {
      id: "product-design",
      label: "Product Design",
      icon: designIcon,
      badge: "",
      description: "Healthcare UI/UX design, EHR portals & design systems",
      details:
        "Shape clear, accessible healthcare interfaces, portals and product journeys through research, UI design and design systems.",
      actionLabel: "Explore product design",
      accent: "#0e162a",
    },
    {
      id: "web-development",
      label: "Web Development",
      icon: developmentIcon,
      badge: "",
      description: "Care home websites, NHS spine sync & cloud engineering",
      details:
        "Build responsive healthcare websites, portals and applications with front-end, back-end and integration development support.",
      actionLabel: "Explore web development",
      accent: "#368b62",
    },
  ],
}

export function MainNavigation({
  onNavigate,
  onSection,
  onAction,
  mobile = false,
}: MainNavigationProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [activeItemId, setActiveItemId] = useState<string | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const closeTimerRef = useRef<number | null>(null)
  const hoverOpenedRef = useRef(false)
  const cancelPendingClose = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }
  const dismissMenu = () => {
    cancelPendingClose()
    hoverOpenedRef.current = false
    setOpenMenu(null)
    setActiveItemId(null)
  }
  const closeMenu = () => {
    dismissMenu()
    onAction?.()
  }
  const scheduleHoverClose = () => {
    cancelPendingClose()
    if (!hoverOpenedRef.current || rootRef.current?.contains(document.activeElement)) return

    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = null
      if (hoverOpenedRef.current && !rootRef.current?.contains(document.activeElement)) {
        dismissMenu()
      }
    }, 180)
  }
  const toggleMenu = (name: string) => {
    cancelPendingClose()
    // Clicking a hover-open menu keeps it open; a second click still closes it.
    const shouldClose = openMenu === name && !hoverOpenedRef.current
    hoverOpenedRef.current = false
    if (shouldClose || openMenu !== name) setActiveItemId(null)
    setOpenMenu(shouldClose ? null : name)
  }
  useEffect(() => {
    const outside = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) dismissMenu()
    }
    const escapeHoverMenu = (event: KeyboardEvent) => {
      if (event.key === "Escape" && hoverOpenedRef.current) dismissMenu()
    }
    document.addEventListener("pointerdown", outside)
    document.addEventListener("keydown", escapeHoverMenu)
    return () => {
      document.removeEventListener("pointerdown", outside)
      document.removeEventListener("keydown", escapeHoverMenu)
      cancelPendingClose()
    }
  }, [])
  const smallLink =
    "text-left font-sans text-control font-semibold text-[#45556c] transition-colors hover:text-[#368B62]"
  return (
    <div
      ref={rootRef}
      className={
        mobile
          ? "relative flex flex-col gap-5 py-5"
          : "relative -mb-2 flex flex-wrap items-center gap-x-6 gap-y-2 pb-2 xl:justify-center"
      }
      onPointerEnter={cancelPendingClose}
      onPointerLeave={(event) => {
        if (!mobile && event.pointerType === "mouse") scheduleHoverClose()
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && openMenu) {
          triggerRefs.current[openMenu]?.focus()
          dismissMenu()
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) dismissMenu()
      }}
    >
      {Object.entries(menus).map(([name, links], index) => {
        const previewedLink = links.find((link) => link.id === activeItemId)
        const activeLink = previewedLink ?? links[0]
        if (!activeLink) return null
        const overviewId = `main-${mobile ? "mobile" : "desktop"}-${name}-overview`
        return (
          <div key={name}>
            <button
              type="button"
              ref={(element) => {
                triggerRefs.current[name] = element
              }}
              aria-expanded={openMenu === name}
              aria-controls={`main-${mobile ? "mobile" : "desktop"}-${name}`}
              onPointerEnter={(event) => {
                if (!mobile && event.pointerType === "mouse") {
                  cancelPendingClose()
                  if (openMenu !== name) {
                    hoverOpenedRef.current = true
                    setActiveItemId(null)
                    setOpenMenu(name)
                  }
                }
              }}
              onClick={() => toggleMenu(name)}
              className="flex items-center gap-1 py-2 font-sans text-control font-semibold text-[#314158] transition-colors hover:text-[#368B62]"
            >
              {name}
              <img
                alt=""
                src={index === 0 ? "/assets/ae68d.svg" : "/assets/a0b5c.svg"}
                className={`shrink-0 transition-transform motion-reduce:transition-none ${
                  openMenu === name ? "rotate-180" : ""
                }`}
              />
            </button>
            {openMenu === name && (
              <div
                id={`main-${mobile ? "mobile" : "desktop"}-${name}`}
                onPointerEnter={cancelPendingClose}
                className={
                  "z-50 grid max-h-[calc(100dvh-160px)] grid-cols-1 gap-4 overflow-y-auto rounded-2xl border border-black/5 bg-white p-[17px] animate-fade-in motion-reduce:animate-none sm:grid-cols-[7fr_5fr] " +
                  (mobile
                    ? "mt-2"
                    : `absolute left-0 top-full w-full sm:left-1/2 ${
                        name === "Products"
                          ? "sm:w-[min(560px,calc(100vw-48px))]"
                          : "sm:w-[min(600px,calc(100vw-48px))]"
                      } sm:-translate-x-1/2`)
                }
              >
                <div className="min-w-0">
                  <p className="px-1 font-sans text-eyebrow font-bold uppercase text-[#90a1b9]">
                    {name === "Products"
                      ? "Healthcare Software Solutions"
                      : "Healthcare Professional Services"}
                  </p>
                  <div className="mt-2 space-y-1">
                    {links.map((link) => (
                      <button
                        type="button"
                        key={link.id}
                        data-preview-active={activeLink.id === link.id}
                        aria-describedby={
                          activeLink.id === link.id ? `${overviewId}-description` : undefined
                        }
                        onPointerEnter={(event) => {
                          if (event.pointerType === "mouse") setActiveItemId(link.id)
                        }}
                        onFocus={() => setActiveItemId(link.id)}
                        onClick={() => {
                          closeMenu()
                          onNavigate(link.id)
                        }}
                        style={{ "--nav-accent": link.accent } as React.CSSProperties}
                        className="group flex w-full items-start gap-3 rounded-[14px] p-[10px] text-left transition-colors motion-reduce:transition-none hover:bg-(--nav-accent) focus-visible:bg-(--nav-accent) data-[preview-active=true]:[&:not(:hover,:focus-visible)]:bg-slate-50"
                      >
                        <span className="shrink-0 rounded-[10px] border border-black/5 bg-[#f1f5f9] p-[9px]">
                          <img src={link.icon} alt="" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2">
                            <span className="max-w-[155px] font-sans text-caption font-bold text-[#0f172b] transition-colors motion-reduce:transition-none group-hover:text-white group-focus-visible:text-white">
                              {link.label}
                            </span>
                            {link.badge && (
                              <span
                                className={
                                  "shrink-0 rounded px-1.5 text-caption " +
                                  (link.badge === "Popular"
                                    ? "bg-[#dbeafe] font-sans font-bold text-[#193cb8]"
                                    : "bg-[#f1f5f9] font-sans font-normal text-[#45556c]")
                                }
                              >
                                {link.badge}
                              </span>
                            )}
                          </span>
                          <span className="mt-0.5 block font-sans text-caption font-normal text-[#62748e] transition-colors motion-reduce:transition-none group-hover:text-white group-focus-visible:text-white">
                            {link.description}
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                <aside
                  aria-labelledby={`${overviewId}-title`}
                  style={
                    previewedLink
                      ? ({ "--nav-accent": previewedLink.accent } as React.CSSProperties)
                      : undefined
                  }
                  className={
                    "flex min-h-64 min-w-0 flex-col justify-between rounded-[14px] border p-[15px] transition-colors motion-reduce:transition-none " +
                    (previewedLink
                      ? "border-(--nav-accent)/20 bg-(--nav-accent)/10"
                      : "border-[#e6ebf2] bg-[#f6f7fa]")
                  }
                >
                  <div aria-live="polite" aria-atomic="true">
                    <p className="font-sans text-eyebrow font-bold uppercase text-[#0e162a]">
                      {name === "Products" ? "Product overview" : "Service overview"}
                    </p>
                    <h3
                      id={`${overviewId}-title`}
                      className="mt-2 font-sans text-caption font-bold text-[#0f172a]"
                    >
                      {activeLink.label}
                    </h3>
                    <p
                      id={`${overviewId}-description`}
                      className="mt-2 font-sans text-caption font-semibold text-[#475569]"
                    >
                      {activeLink.details}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      closeMenu()
                      onNavigate(activeLink.id)
                    }}
                    className="mt-3 flex w-full items-center justify-center gap-1 rounded-[10px] bg-[#0e162a] px-2 py-2 font-sans text-control font-bold text-white transition-colors hover:bg-[#1c2942]"
                  >
                    {activeLink.actionLabel}
                    <img
                      src={name === "Products" ? productArrow : serviceArrow}
                      alt=""
                      className="shrink-0"
                    />
                  </button>
                </aside>
              </div>
            )}
          </div>
        )
      })}
      <button
        type="button"
        onClick={() => {
          closeMenu()
          onSection("overview")
        }}
        className="text-left font-sans text-control font-semibold text-[#45556c] hover:text-[#368B62]"
      >
        Overview
      </button>
      <button
        type="button"
        onClick={() => {
          closeMenu()
          onSection("how-it-works")
        }}
        className={smallLink}
      >
        How It Works
      </button>
      <button
        type="button"
        onClick={() => {
          closeMenu()
          onNavigate("pricing")
        }}
        className={smallLink}
      >
        Pricing
      </button>
      <button
        type="button"
        onClick={() => {
          closeMenu()
          onSection("questions")
        }}
        className={smallLink}
      >
        FAQ
      </button>
    </div>
  )
}
