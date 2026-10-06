import React from "react"
import { Link } from "react-router"
import workspaceArrow from "../imports/footer-reference/0d194.svg"
import staffArrow from "../imports/footer-reference/d7301.svg"
import topArrow from "../imports/footer-reference/59b01.svg"

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
  description,
  tagline,
  columns,
  onCookiePreferences,
}) => {
  const defaultColumns: FooterColumn[] = [
    {
      title: "Platform",
      links: [
        {
          label: "Recruitment services",
          onClick: () => onNavigate("recruitment-service"),
        },
        {
          label: "Locum provision",
          onClick: () => onNavigate("locum-provision"),
        },
        {
          label: "Care management",
          onClick: () => onNavigate("care-management"),
        },
        {
          label: "Recruitment software",
          onClick: () => onNavigate("recruitment-software"),
        },
        {
          label: "Product design",
          onClick: () => onNavigate("product-design"),
        },
        {
          label: "Web development",
          onClick: () => onNavigate("web-development"),
        },
      ],
    },
    {
      title: "Explore",
      links: [
        {
          label: "Why MployUs",
          onClick: () => {
            onNavigate("home")
            setTimeout(
              () =>
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" }),
              100,
            )
          },
        },
        {
          label: "Frequently asked questions",
          onClick: () => {
            onNavigate("home")
            setTimeout(
              () =>
                document
                  .getElementById("questions")
                  ?.scrollIntoView({ behavior: "smooth" }),
              100,
            )
          },
        },
        { label: "Book a demo", onClick: onBookDemo },
        { label: "Privacy policy", href: "/policies/privacy" },
        { label: "Terms of service", href: "/policies/terms" },
        { label: "Cookie policy", href: "/policies/cookies" },
      ],
    },
    {
      title: "Your workspace",
      links: [
        { label: "Book a platform demo", onClick: onBookDemo, arrow: true },
        { label: "Start a free trial", onClick: onStartTrial, arrow: true },
      ],
    },
  ]
  const linkClasses =
    "inline-flex max-w-full items-center gap-[8.113px] text-left font-['Inter:Regular',Inter,sans-serif] text-[16.225px] font-normal leading-[21.634px] text-[#62748e] transition-colors hover:text-[#0f172a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#62748e]"
  return (
    <footer className="border-t border-black/5 bg-white pb-[32.451px] pt-12 sm:pt-[75.718px]">
      <div className="mx-auto w-full max-w-[1622.535px] px-6 sm:px-[43.268px]">
        <div className="grid gap-x-[54.085px] gap-y-10 sm:grid-cols-2 lg:min-h-[254.2px] lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <button
              onClick={() => onNavigate("home")}
              aria-label="MployUs home"
              className="flex min-h-[51.11px] flex-wrap items-baseline gap-2 font-['Inter:Semi_Bold',Inter,sans-serif] text-[38px] font-semibold leading-[51.11px] tracking-[-0.025em] text-[#0f172a]"
            >
              MployUs
              {brandSuffix && (
                <span
                  className={`text-[14px] font-normal tracking-normal ${
                    brandSuffix === "recruit"
                      ? "text-[#810161]"
                      : "text-[#368B62]"
                  }`}
                >
                  {brandSuffix}.
                </span>
              )}
            </button>
            <div className="mt-[17.17px] font-['Inter:Regular',Inter,sans-serif] text-[16.225px] font-normal leading-[32.451px] text-[#62748e]">
              {description || (
                <>
                  The connected platform for healthcare.
                  <br />
                  Less busywork. More time for care.
                </>
              )}
            </div>
          </div>
          {(columns || defaultColumns).map((column) => (
            <nav
              key={column.title}
              aria-label={`${column.title} footer links`}
              className="min-w-0"
            >
              <h3 className="font-['Inter:Semi_Bold',Inter,sans-serif] text-[16.225px] font-semibold leading-[21.634px] text-[#0f172a]">
                {column.title}
              </h3>
              <ul className="space-y-[16.225px] pt-[21.634px]">
                {column.links.map((link, index) => (
                  <li key={link.label}>
                    {link.href ? (
                      <Link to={link.href} className={linkClasses}>
                        {link.label}
                      </Link>
                    ) : (
                      <button onClick={link.onClick} className={linkClasses}>
                        <span>{link.label}</span>
                        {link.arrow && (
                          <img
                            src={index === 0 ? workspaceArrow : staffArrow}
                            alt=""
                            className="shrink-0"
                          />
                        )}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        {onCookiePreferences && (
          <button
            onClick={onCookiePreferences}
            className="mt-6 font-['Inter:Regular',Inter,sans-serif] text-[13.521px] text-[#62748e] hover:text-[#0f172a]"
          >
            Manage cookie preferences
          </button>
        )}
        <div className="mt-10 grid items-center gap-5 border-t border-black/5 pt-[32.451px] font-['Inter:Regular',Inter,sans-serif] text-[13.521px] font-normal leading-[20.282px] text-[#62748e] sm:mt-[64.901px] lg:grid-cols-[1fr_auto_1fr]">
          <p>
            © {new Date().getFullYear()} MployUs
            {brandSuffix === "recruit"
              ? " Recruit"
              : brandSuffix === "locums"
                ? " Locums"
                : ""}
            . All rights reserved.
          </p>
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-[8.113px] justify-self-start hover:text-[#0f172a] lg:justify-self-center"
          >
            Back to homepage
            <img src={topArrow} alt="" className="rotate-180" />
          </button>
          <p className="lg:text-right">
            {tagline || "One platform. Your people, connected."}
          </p>
        </div>
      </div>
    </footer>
  )
}
