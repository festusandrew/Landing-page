import React, { useEffect, useRef, useState } from "react"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { UserRole } from "../types"
import { MainNavigation } from "./MainNavigation"
import { BrandLogo } from "./BrandLogo"
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
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const [pinned, setPinned] = useState(false)
  // Below the lg breakpoint the navigation and actions move into this menu.
  const [menuOpen, setMenuOpen] = useState(false)

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

    // Keep the pin threshold in the document flow when the header becomes fixed.
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

  useEffect(() => {
    if (!menuOpen) return
    const closeOutside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setMenuOpen(false)
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      setMenuOpen(false)
      menuButtonRef.current?.focus()
    }
    // The desktop layout has no menu, so widening the window closes it.
    const desktop = window.matchMedia("(min-width: 1024px)")
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false)
    }
    document.addEventListener("pointerdown", closeOutside)
    document.addEventListener("keydown", closeOnEscape)
    desktop.addEventListener("change", closeOnDesktop)
    return () => {
      document.removeEventListener("pointerdown", closeOutside)
      document.removeEventListener("keydown", closeOnEscape)
      desktop.removeEventListener("change", closeOnDesktop)
    }
  }, [menuOpen])

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
  const closeMenu = () => setMenuOpen(false)
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
              ? "site-container reference-main-navbar flex items-center justify-between gap-4 py-3 lg:grid lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:justify-items-center lg:py-4"
              : "site-container flex items-center justify-between gap-4 py-3 lg:flex-wrap lg:py-4"
          }
        >
          <button
            type="button"
            onClick={() => {
              closeMenu()
              if (activeView === "home") section("overview")
              else navigate("home")
            }}
            aria-label="MployUs home"
            className="shrink-0 text-brand"
          >
            <BrandLogo />
          </button>
          <div
            className={
              embedded
                ? "hidden min-w-0 w-full lg:block [&>div]:justify-center [&>div]:gap-x-4 xl:[&>div]:gap-x-6"
                : "order-3 hidden w-full border-t border-black/5 pt-3 lg:block xl:order-none xl:w-auto xl:flex-1 xl:border-0 xl:pt-0"
            }
          >
            <MainNavigation onNavigate={navigate} onSection={section} onBookDemo={demo} />
          </div>
          {/* Phones and tablets: a demo shortcut (from sm) and the menu button. */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => {
                closeMenu()
                demo()
              }}
              className="hidden items-center justify-center rounded-sm bg-[#368B62] px-4 py-2.5 text-control font-semibold whitespace-nowrap text-white transition-colors hover:bg-[#286d4c] sm:inline-flex"
            >
              Book a demo
            </button>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="main-navigation-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="flex size-11 items-center justify-center rounded-sm border border-black/5 text-[#233b35] transition-colors hover:bg-[#edf5ef]"
            >
              {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
          <div
            className={
              embedded
                ? "hidden flex-row flex-nowrap items-center justify-center gap-3 lg:flex"
                : "ml-auto hidden flex-row flex-nowrap items-center gap-3 lg:flex"
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
        {menuOpen && (
          <div
            id="main-navigation-menu"
            className="absolute inset-x-0 top-full z-40 border-y border-black/5 bg-white shadow-[0_24px_40px_-28px_rgb(15_23_42/0.35)] animate-in fade-in slide-in-from-top-2 duration-200 motion-reduce:animate-none lg:hidden"
          >
            <div className="site-container max-h-[calc(100dvh-var(--main-navigation-height,72px))] overflow-y-auto overscroll-contain pb-6">
              <MainNavigation
                mobile
                onNavigate={navigate}
                onSection={section}
                onBookDemo={demo}
                onAction={closeMenu}
              />
              <div className="grid gap-3 border-t border-black/5 pt-5 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => {
                    closeMenu()
                    demo()
                  }}
                  className={primaryButton}
                >
                  Book a demo
                </button>
                <button
                  type="button"
                  onClick={() => {
                    closeMenu()
                    trial()
                  }}
                  className={secondaryButton}
                >
                  Start free trial
                  <ArrowUpRight size={15} />
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  )
}
