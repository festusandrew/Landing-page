import React from "react"
import { Link } from "react-router"
import mailIcon from "../imports/footer-directory/9e5cd.svg"
import phoneIcon from "../imports/footer-directory/770f9.svg"
import locationIcon from "../imports/footer-directory/beae3.svg"
import linkedinIcon from "../imports/footer-directory/c3e17.svg"
import twitterIcon from "../imports/footer-directory/df4ea.svg"
import facebookIcon from "../imports/footer-directory/d323b.svg"
import shieldIcon from "../imports/footer-directory/159cd.svg"

export interface FooterLink {
  label: string
  onClick?: () => void
  href?: string
  arrow?: boolean
}
export interface FooterColumn {
  title: string
  links: FooterLink[]
}
interface FooterProps {
  onNavigate: (viewId: string) => void
  onBookDemo: () => void
  onStartTrial: () => void
  brandSuffix?: "recruit" | "locums"
  description?: React.ReactNode
  tagline?: string
  columns?: FooterColumn[]
  onCookiePreferences?: () => void
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onBookDemo,
  onStartTrial,
  brandSuffix,
  tagline,
  columns,
  onCookiePreferences,
}) => {
  const mainSection = (id: string) => {
    onNavigate("home")
    window.setTimeout(
      () =>
        document
          .getElementById(id)
          ?.scrollIntoView({
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
              .matches
              ? "auto"
              : "smooth",
          }),
      100,
    )
  }
  const headingClass =
    "font-['Plus_Jakarta_Sans:Bold',sans-serif] text-xs font-bold uppercase leading-4 tracking-[0.6px] text-[#0f172b]"
  const smallLinkClass =
    "inline-flex max-w-full items-center gap-1 text-left font-['Plus_Jakarta_Sans:Regular',sans-serif] text-xs font-normal leading-4 text-[#45556c] transition-colors hover:text-[#368B62] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-black/5"
  const renderLink = (link: FooterLink, className = smallLinkClass) =>
    link.href ? (
      <Link to={link.href} className={className}>
        {link.label}
      </Link>
    ) : (
      <button type="button" onClick={link.onClick} className={className}>
        {link.label}
        {link.arrow && <span aria-hidden="true"> ↗</span>}
      </button>
    )
  const customPlatform = columns?.find((column) => column.title === "Platform")
  const customExplore = columns?.find((column) => column.title === "Explore")
  const workspaceLinks = columns?.find(
    (column) => column.title === "Your workspace",
  )?.links || [
    { label: "Book a platform demo", onClick: onBookDemo },
    { label: "Start a free trial", onClick: onStartTrial },
  ]
  const platformLinks = customPlatform?.links || [
    { label: "How it works", onClick: () => mainSection("solutions") },
    { label: "Why MployUs", onClick: () => mainSection("about") },
    { label: "Book a demo", onClick: onBookDemo },
    { label: "FAQ & support", onClick: () => mainSection("questions") },
  ]
  const companyLinks = customExplore?.links.filter(
    (link) => !link.href?.startsWith("/policies/"),
  ) || [
    { label: "About MployUs", onClick: () => mainSection("about") },
    {
      label: "Explore recruitment",
      onClick: () => onNavigate("recruitment-service"),
    },
    { label: "Privacy & data protection", href: "/policies/privacy" },
  ]
  const shareUrl =
    typeof window === "undefined"
      ? ""
      : encodeURIComponent(window.location.origin)
  return (
    <footer className="border-t border-black/5 bg-white pb-12 pt-16">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-8">
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="min-w-0">
            <nav aria-label="Products footer links">
              <h3 className={headingClass}>Products</h3>
              <ul className="mt-3 space-y-2">
                {[
                  {
                    label: "Recruitment Software",
                    onClick: () => onNavigate("recruitment-software"),
                  },
                  {
                    label: "Care Management Software",
                    onClick: () => onNavigate("care-management"),
                  },
                ].map((link) => (
                  <li key={link.label}>{renderLink(link)}</li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Services footer links" className="mt-5">
              <h3 className={headingClass}>Services</h3>
              <ul className="mt-3 space-y-2">
                {[
                  {
                    label: "Locum Provision",
                    onClick: () => onNavigate("locum-provision"),
                  },
                  {
                    label: "Recruitment Service",
                    onClick: () => onNavigate("recruitment-service"),
                  },
                  {
                    label: "Product Design",
                    onClick: () => onNavigate("product-design"),
                  },
                  {
                    label: "Web Development",
                    onClick: () => onNavigate("web-development"),
                  },
                ].map((link) => (
                  <li key={link.label}>{renderLink(link)}</li>
                ))}
              </ul>
            </nav>
          </div>
          <nav aria-label="Platform footer links" className="min-w-0">
            <h3 className={headingClass}>Platform</h3>
            <ul className="mt-3 space-y-2">
              {platformLinks.map((link) => (
                <li key={link.label}>{renderLink(link)}</li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Company footer links" className="min-w-0">
            <h3 className={headingClass}>Company</h3>
            <ul className="mt-3 space-y-2">
              {companyLinks.map((link) => (
                <li key={link.label}>{renderLink(link)}</li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Legal footer links" className="min-w-0">
            <h3 className={headingClass}>Legal</h3>
            <ul className="mt-3 space-y-2">
              {[
                { label: "Privacy Policy", href: "/policies/privacy" },
                { label: "Terms of Service", href: "/policies/terms" },
                { label: "Cookie Policy", href: "/policies/cookies" },
                {
                  label: "UK GDPR & data protection",
                  href: "/policies/privacy",
                },
              ].map((link) => (
                <li key={link.label}>{renderLink(link)}</li>
              ))}
              {onCookiePreferences && (
                <li>
                  <button
                    type="button"
                    onClick={onCookiePreferences}
                    className={smallLinkClass}
                  >
                    Manage cookie preferences
                  </button>
                </li>
              )}
            </ul>
          </nav>
          <div className="min-w-0">
            <h3 className={headingClass}>Contact us</h3>
            <address className="mt-3 space-y-2 font-['Plus_Jakarta_Sans:Medium',sans-serif] text-[11px] font-medium not-italic leading-[14.667px] text-[#45556c]">
              <a
                href="mailto:hello@mployus.cloud"
                className="flex items-center gap-2 hover:text-[#368B62]"
              >
                <img src={mailIcon} alt="" className="shrink-0" />
                hello@mployus.cloud
              </a>
              <a
                href="tel:08009008000"
                className="flex items-center gap-2 hover:text-[#368B62]"
              >
                <img src={phoneIcon} alt="" className="shrink-0" />
                0800 900 8000 (IR Toll-Free)
              </a>
              <p className="flex items-start gap-2">
                <img src={locationIcon} alt="" className="mt-0.5 shrink-0" />
                <span>124 Healthcare Place, Dublin, EC1A 1BB</span>
              </p>
            </address>
            <div className="mt-5 flex gap-3">
              {[
                {
                  label: "Share MployUs on LinkedIn",
                  icon: linkedinIcon,
                  href:
                    "https://www.linkedin.com/sharing/share-offsite/?url=" +
                    shareUrl,
                },
                {
                  label: "Share MployUs on X",
                  icon: twitterIcon,
                  href: "https://twitter.com/intent/tweet?url=" + shareUrl,
                },
                {
                  label: "Share MployUs on Facebook",
                  icon: facebookIcon,
                  href:
                    "https://www.facebook.com/sharer/sharer.php?u=" + shareUrl,
                },
              ].map((social) => (
                <a
                  key={social.label}
                  aria-label={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-[10px] border border-black/5 bg-[#f8fafc] p-[9px] transition-colors hover:bg-[#edf0f6]"
                >
                  <img src={social.icon} alt="" />
                </a>
              ))}
            </div>
            <nav aria-label="Your workspace footer links" className="mt-5">
              <ul className="space-y-2">
                {workspaceLinks.map((link) => (
                  <li key={link.label}>{renderLink(link)}</li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-black/5 pt-8">
          <div className="flex flex-wrap items-baseline gap-2">
            <button
              type="button"
              onClick={() => onNavigate("home")}
              aria-label="MployUs home"
              className="font-['Plus_Jakarta_Sans:Bold',sans-serif] text-sm font-bold leading-5 text-[#0f172b]"
            >
              MployUs
              {brandSuffix && (
                <span
                  className={
                    brandSuffix === "recruit"
                      ? "ml-1 text-[#810161]"
                      : "ml-1 text-[#368B62]"
                  }
                >
                  {brandSuffix}.
                </span>
              )}
            </button>
            <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] text-[11px] leading-[14.667px] text-[#62748e]">
              • © {new Date().getFullYear()} MployUs Platform. All rights
              reserved.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate("home")}
            className={smallLinkClass}
          >
            Back to homepage ↗
          </button>
          <div className="flex items-center gap-2 font-['Plus_Jakarta_Sans:Regular',sans-serif] text-[11px] leading-[14.667px] text-[#62748e]">
            <img src={shieldIcon} alt="" className="shrink-0" />
            <span>{tagline || "One platform. Your people, connected."}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
