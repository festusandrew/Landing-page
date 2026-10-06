import React from "react"
import { ArrowUpRight } from "lucide-react"
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
  const navigate = (view: string) => {
    onNavigate(view)
  }
  const section = (id: string) => {
    const scroll = () => document.getElementById(id)?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
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
    "inline-flex items-center justify-center rounded-sm bg-[#368B62] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#286d4c]"
  const secondaryButton =
    "inline-flex items-center justify-center gap-2 rounded-sm border border-black/5 bg-white px-5 py-3 text-sm font-semibold text-[#233b35] transition-colors hover:bg-[#edf5ef]"
  return (
    <header
      className={
        embedded
          ? "relative z-40 border-y border-black/5 bg-white"
          : "sticky top-0 z-40 border-b border-black/5 bg-white"
      }
    >
      <nav
        aria-label="Main navigation"
        className={
          embedded
            ? "mx-auto grid max-w-[1280px] grid-cols-1 items-center justify-items-center gap-4 px-6 py-4 sm:grid-cols-[auto_minmax(0,1fr)_auto] lg:px-8"
            : "mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-4 px-6 py-4 lg:px-8"
        }
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
        <div
          className={
            embedded
              ? "min-w-0 w-full [&>div]:justify-center [&>div]:gap-x-4 xl:[&>div]:gap-x-6"
              : "order-3 w-full border-t border-black/5 pt-3 xl:order-none xl:w-auto xl:flex-1 xl:border-0 xl:pt-0"
          }
        >
          <MainNavigation
            onNavigate={navigate}
            onSection={section}
            onBookDemo={demo}
          />
        </div>
        <div
          className={
            embedded
              ? "flex flex-wrap items-center justify-center gap-3 sm:flex-col xl:flex-row"
              : "ml-auto flex flex-wrap items-center gap-3"
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
  )
}
