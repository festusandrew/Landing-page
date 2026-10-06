import React, { useEffect, useState } from "react"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { UserRole } from "../types"
import { MainNavigation } from "./MainNavigation"

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
  const [mobileOpen, setMobileOpen] = useState(false)
  useEffect(() => {
    setMobileOpen(false)
  }, [activeView])
  const navigate = (view: string) => {
    setMobileOpen(false)
    onNavigate(view)
  }
  const section = (id: string) => {
    setMobileOpen(false)
    const scroll = () =>
      document
        .getElementById(id)
        ?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "auto"
            : "smooth",
        })
    if (activeView !== "home") {
      onNavigate("home")
      window.setTimeout(scroll, 100)
    } else scroll()
  }
  const demo = () => {
    setMobileOpen(false)
    onBookDemo()
  }
  const trial = () => {
    setMobileOpen(false)
    onStartTrial()
  }
  const primaryButton =
    "inline-flex items-center justify-center rounded-sm bg-[#368B62] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#286d4c]"
  const secondaryButton =
    "inline-flex items-center justify-center gap-2 rounded-sm border border-black/5 bg-white px-5 py-3 text-sm font-semibold text-[#233b35] transition-colors hover:bg-[#edf5ef]"
  return (
    <header
      className={
        embedded
          ? "relative z-40 border-y border-black/5 bg-white"
          : "fixed inset-x-0 top-0 z-40 border-b border-black/5 bg-white"
      }
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-6 py-4 lg:px-8"
      >
        <button
          type="button"
          onClick={() =>
            activeView === "home" ? section("overview") : navigate("home")
          }
          aria-label="MployUs home"
          className="shrink-0 font-['DM_Sans',sans-serif] text-[28px] font-bold tracking-[-1px] text-[#233b35]"
        >
          mploy<span className="text-[#368B62]">us.</span>
        </button>
        <div className="hidden flex-1 justify-center xl:flex">
          <MainNavigation
            onNavigate={navigate}
            onSection={section}
            onBookDemo={demo}
          />
        </div>
        <div className="ml-auto hidden items-center gap-3 sm:flex">
          <button type="button" onClick={demo} className={primaryButton}>
            Book a demo
          </button>
          <button type="button" onClick={trial} className={secondaryButton}>
            Start free trial
            <ArrowUpRight size={15} />
          </button>
        </div>
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="main-mobile-navigation"
          onClick={() => setMobileOpen(!mobileOpen)}
          onKeyDown={(event) => {
            if (event.key === "Escape") setMobileOpen(false)
          }}
          className="rounded-md p-2 text-[#233b35] hover:bg-[#f8fafc] xl:hidden"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      {mobileOpen && (
        <nav
          id="main-mobile-navigation"
          aria-label="Mobile main navigation"
          className="max-h-[calc(100dvh-100px)] overflow-y-auto border-t border-black/5 px-6 pb-6 xl:hidden"
        >
          <MainNavigation
            mobile
            onNavigate={navigate}
            onSection={section}
            onBookDemo={demo}
            onAction={() => setMobileOpen(false)}
          />
          <div className="flex flex-wrap gap-3 sm:hidden">
            <button type="button" onClick={demo} className={primaryButton}>
              Book a demo
            </button>
            <button type="button" onClick={trial} className={secondaryButton}>
              Start free trial
              <ArrowUpRight size={15} />
            </button>
          </div>
        </nav>
      )}
    </header>
  )
}
