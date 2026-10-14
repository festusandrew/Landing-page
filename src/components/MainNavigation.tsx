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

const menus = {
  Products: [
    {
      id: "recruitment-software",
      label: "Recruitment Software",
      icon: recruitmentIcon,
      badge: "ATS Platform",
      description: "Smarter ATS, multi-board job posting & candidate pipeline",
    },
    {
      id: "care-management",
      label: "Care Management Software",
      icon: careIcon,
      badge: "eMAR & Clinical",
      description: "Digital care plans, eMAR medication charts & CQC audits",
    },
  ],
  Services: [
    {
      id: "locum-provision",
      label: "Locum Provision",
      icon: locumIcon,
      badge: "Popular",
      description: "Urgent shift dispatch & verified locum staff under 2 hrs",
    },
    {
      id: "recruitment-service",
      label: "Recruitment Service",
      icon: serviceRecruitmentIcon,
      badge: "",
      description: "End-to-end managed hiring, headhunting & DBS vetting",
    },
    {
      id: "product-design",
      label: "Product Design",
      icon: designIcon,
      badge: "",
      description: "Healthcare UI/UX design, EHR portals & design systems",
    },
    {
      id: "web-development",
      label: "Web Development",
      icon: developmentIcon,
      badge: "",
      description: "Care home websites, NHS spine sync & cloud engineering",
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
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const closeMenu = () => {
    setOpenMenu(null)
    onAction?.()
  }
  useEffect(() => {
    const outside = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpenMenu(null)
    }
    document.addEventListener("pointerdown", outside)
    return () => document.removeEventListener("pointerdown", outside)
  }, [])
  const smallLink =
    "text-left font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xs font-semibold leading-4 text-[#45556c] transition-colors hover:text-[#368B62]"
  return (
    <div
      ref={rootRef}
      className={
        mobile
          ? "relative flex flex-col gap-5 py-5"
          : "relative flex flex-wrap items-center gap-x-6 gap-y-2 xl:justify-center"
      }
      onKeyDown={(event) => {
        if (event.key === "Escape" && openMenu) {
          triggerRefs.current[openMenu]?.focus()
          setOpenMenu(null)
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setOpenMenu(null)
      }}
    >
      {Object.entries(menus).map(([name, links], index) => (
        <div key={name}>
          <button
            type="button"
            ref={(element) => {
              triggerRefs.current[name] = element
            }}
            aria-expanded={openMenu === name}
            aria-controls={`main-${mobile ? "mobile" : "desktop"}-${name}`}
            onClick={() => setOpenMenu(openMenu === name ? null : name)}
            className="flex items-center gap-1 py-2 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xs font-semibold leading-4 text-[#314158] transition-colors hover:text-[#368B62]"
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
              className={
                "z-50 grid max-h-[calc(100dvh-160px)] grid-cols-1 gap-4 overflow-y-auto rounded-2xl border border-black/5 bg-white p-[17px] animate-fade-in motion-reduce:animate-none sm:grid-cols-[7fr_5fr] " +
                (mobile
                  ? "mt-2"
                  : "absolute left-0 top-full mt-2 w-full sm:left-1/2 sm:w-[min(600px,calc(100vw-48px))] sm:-translate-x-1/2")
              }
            >
              <div className="min-w-0">
                <p className="px-1 font-['Plus_Jakarta_Sans:Bold',sans-serif] text-[10px] font-bold uppercase leading-[13.333px] tracking-[0.5px] text-[#90a1b9]">
                  {name === "Products"
                    ? "Healthcare Software Solutions"
                    : "Healthcare Professional Services"}
                </p>
                <div className="mt-2 space-y-1">
                  {links.map((link) => (
                    <button
                      type="button"
                      key={link.id}
                      onClick={() => {
                        closeMenu()
                        onNavigate(link.id)
                      }}
                      className="group flex w-full items-start gap-3 rounded-[14px] p-[10px] text-left transition-colors hover:bg-[#f8fafc] focus-visible:bg-[#f8fafc]"
                    >
                      <span className="shrink-0 rounded-[10px] border border-black/5 bg-[#f1f5f9] p-[9px]">
                        <img src={link.icon} alt="" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2">
                          <span className="max-w-[155px] font-['Plus_Jakarta_Sans:Bold',sans-serif] text-xs font-bold leading-4 text-[#0f172b] group-hover:text-[#368B62]">
                            {link.label}
                          </span>
                          {link.badge && (
                            <span
                              className={
                                "shrink-0 rounded px-1.5 text-[9px] leading-3 " +
                                (link.badge === "Popular"
                                  ? "bg-[#dbeafe] font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[#193cb8]"
                                  : "bg-[#f1f5f9] font-mono font-normal text-[#45556c]")
                              }
                            >
                              {link.badge}
                            </span>
                          )}
                        </span>
                        <span className="mt-0.5 block font-['Plus_Jakarta_Sans:Regular',sans-serif] text-[11px] font-normal leading-[15.125px] text-[#62748e]">
                          {link.description}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <aside className="flex min-w-0 flex-col justify-between rounded-[14px] border border-black/5 bg-[#edf5ef] p-[15px]">
                <div>
                  <p
                    className={
                      "font-mono text-[9px] font-bold uppercase leading-3 text-[#368B62] " +
                      (name === "Products" ? "px-[9px] pb-[14px] pt-1" : "")
                    }
                  >
                    {name === "Products"
                      ? "Unified Platform"
                      : "Featured Provision"}
                  </p>
                  <h3
                    className={
                      "font-['Plus_Jakarta_Sans:Bold',sans-serif] text-xs font-bold leading-[16.5px] text-[#0f172a] " +
                      (name === "Services" ? "mt-2" : "")
                    }
                  >
                    {name === "Products"
                      ? "Explore Live Interactive Dashboards"
                      : "Locum Provision & Urgent Dispatch"}
                  </h3>
                  <p className="mt-2 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-[10px] font-semibold leading-[16.25px] text-[#475569]">
                    {name === "Products"
                      ? "Test recruitment candidate pipelines and digital eMAR medication pass charts live."
                      : "Need temporary RGN nurses or care assistants today? Shift matching under 2 hours."}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    closeMenu()
                    onNavigate("locum-provision")
                  }}
                  className="mt-3 flex w-full items-center justify-center gap-1 rounded-[10px] bg-[#368B62] px-2 py-2 font-['Plus_Jakarta_Sans:Bold',sans-serif] text-[11px] font-bold leading-[16.5px] text-white transition-colors hover:bg-[#286d4c]"
                >
                  {name === "Products"
                    ? "See Locum Portal"
                    : "Open Locum Landing Page"}
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
      ))}
      <button
        type="button"
        onClick={() => {
          closeMenu()
          onSection("overview")
        }}
        className="text-left font-['Plus_Jakarta_Sans:Medium',sans-serif] text-xs font-medium leading-4 text-[#45556c] hover:text-[#368B62]"
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
