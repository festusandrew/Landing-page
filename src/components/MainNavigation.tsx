import React, { useEffect, useRef, useState } from "react"

interface MainNavigationProps {
  onNavigate: (view: string) => void
  onSection: (id: string) => void
  onBookDemo: () => void
  onAction?: () => void
  mobile?: boolean
}

const menus = {
  Products: [
    { id: "recruitment-software", label: "Recruitment Software" },
    { id: "care-management", label: "Care Management Software" },
  ],
  Services: [
    { id: "locum-provision", label: "Locum Provision" },
    { id: "recruitment-service", label: "Recruitment Service" },
    { id: "product-design", label: "Product Design" },
    { id: "web-development", label: "Web Development" },
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
        <div key={name} className="sm:relative">
          <button
            type="button"
            ref={(element) => {
              triggerRefs.current[name] = element
            }}
            aria-expanded={openMenu === name}
            aria-controls={`main-${mobile ? "mobile" : "desktop"}-${name}`}
            onClick={() => setOpenMenu(openMenu === name ? null : name)}
            className="flex items-center gap-1 py-2 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-base font-semibold leading-6 text-[#314158] transition-colors hover:text-[#368B62]"
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
                mobile
                  ? "mt-2 space-y-1 rounded-lg bg-[#f8fafc] p-2"
                  : "absolute left-0 top-full z-50 mt-2 w-64 max-w-full rounded-lg border border-black/5 bg-white p-2 sm:max-w-none"
              }
            >
              {links.map((link) => (
                <button
                  type="button"
                  key={link.id}
                  onClick={() => {
                    closeMenu()
                    onNavigate(link.id)
                  }}
                  className="block w-full rounded-md px-3 py-3 text-left font-['Plus_Jakarta_Sans:Medium',sans-serif] text-sm font-medium text-[#45556c] transition-colors hover:bg-[#f3f6f4] hover:text-[#368B62]"
                >
                  {link.label}
                </button>
              ))}
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
        className="text-left font-['Plus_Jakarta_Sans:Medium',sans-serif] text-base font-medium leading-6 text-[#45556c] hover:text-[#368B62]"
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
          onSection("pricing")
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
