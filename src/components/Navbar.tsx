import React, { useEffect, useRef, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { UserRole } from "../types"
import { MainNavigation } from "./MainNavigation"
import "./navbar.css"

interface NavbarProps {
  activeRole?: UserRole
  onRoleChange?: (role: UserRole) => void
  onBookDemo: (moduleTitle?: string) => void
  onStartTrial: () => void
  onNavigate: (view: string) => void
  activeView?: string
  embedded?: boolean
}

export const Navbar: React.FC<NavbarProps> = ({
  onBookDemo,
  onStartTrial,
  onNavigate,
  activeView = "home",
  embedded = false,
}) => {
  const slotRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const markerRef = useRef<HTMLSpanElement>(null)
  const [pinned, setPinned] = useState(false)

  useEffect(() => {
    const slot = slotRef.current
    const header = headerRef.current
    const marker = markerRef.current
    if (!slot || !header || !marker) return

    const root = document.documentElement
    const updateHeight = () => {
      const height = `${header.getBoundingClientRect().height}px`
      slot.style.setProperty("--main-navigation-height", height)
      root.style.setProperty("--main-navigation-height", height)
    }
    updateHeight()
    const resizeObserver = new ResizeObserver(updateHeight)
    resizeObserver.observe(header)

    // A separate marker keeps the pin threshold independent of the fixed header.
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      setPinned(!entry.isIntersecting && entry.boundingClientRect.top < 0)
    })
    intersectionObserver.observe(marker)

    return () => {
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      root.style.removeProperty("--main-navigation-height")
    }
  }, [])

  const navigate = (view: string) => {
    onNavigate(view)
  }
  const section = (id: string) => {
    const scroll = () =>
      document.getElementById(id)?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      })
    if (activeView !== "home") {
      onNavigate("home")
      window.setTimeout(scroll, 100)
    } else scroll()
  }
  const demo = () => {
    onBookDemo()
  }
  const trial = () => {
    onStartTrial()
  }
  const primaryButton =
    "inline-flex items-center justify-center rounded-sm bg-[#368B62] px-5 py-3 text-control font-semibold text-white transition-colors hover:bg-[#286d4c]"
  const secondaryButton =
    "inline-flex items-center justify-center gap-2 rounded-sm border border-black/5 bg-white px-5 py-3 text-control font-semibold text-[#233b35] transition-colors hover:bg-[#edf5ef]"
  return (
    <div ref={slotRef} className="main-navigation-slot" data-pinned={pinned}>
      <span
        ref={markerRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-px w-px"
      />
      <header
        ref={headerRef}
        className={`${pinned ? "fixed inset-x-0 top-0" : "relative"} z-40 bg-white ${
          embedded ? "border-y border-black/5 font-sans" : "border-b border-black/5"
        }`}
      >
        <nav
          aria-label="Main navigation"
          className={
            embedded
              ? "reference-main-navbar mx-auto grid max-w-[1280px] grid-cols-1 items-center justify-items-center gap-4 px-6 py-4 sm:grid-cols-[auto_minmax(0,1fr)_auto] lg:px-8"
              : "mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-4 px-6 py-4 lg:px-8"
          }
        >
          <button
            type="button"
            onClick={() => (activeView === "home" ? section("overview") : navigate("home"))}
            aria-label="MployUs home"
            className="shrink-0 font-sans text-brand font-bold text-[#233b35]"
          >
            mploy<span className="text-[#368B62]">us.</span>
          </button>
          <div
            className={
              embedded
                ? "min-w-0 w-full [&>div]:justify-center [&>div]:gap-x-4 xl:[&>div]:gap-x-6"
                : "order-3 w-full border-t border-black/5 pt-3 xl:order-none xl:w-auto xl:flex-1 xl:border-0 xl:pt-0"
            }
          >
            <MainNavigation onNavigate={navigate} onSection={section} onBookDemo={demo} />
          </div>
          <div
            className={
              embedded
                ? "flex flex-row flex-nowrap items-center justify-center gap-3"
                : "ml-auto flex flex-row flex-nowrap items-center gap-3"
            }
          >
            <button type="button" onClick={demo} className={primaryButton}>
              Book a demo
            </button>
            <button type="button" onClick={trial} className={secondaryButton}>
              Start free trial
              <ArrowUpRight size={15} />
            </button>
          </div>
        </nav>
      </header>
    </div>
  )
}
