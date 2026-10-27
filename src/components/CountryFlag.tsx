import { useId } from "react"

export type FlagCountry = "IE" | "UK"

type CountryFlagProps = {
  country: FlagCountry
  className?: string
}

/**
 * Flat 3:2 national flags drawn as SVG so they look the same on every platform.
 * Flag emoji are not used because Windows renders them as letter pairs ("IE", "GB").
 */
export function CountryFlag({ country, className = "" }: CountryFlagProps) {
  const clipId = useId()

  return (
    <svg
      viewBox="0 0 45 30"
      width="21"
      height="14"
      aria-hidden="true"
      className={`box-content shrink-0 rounded-[3px] border border-black/5 ${className}`}
    >
      {country === "IE" ? (
        <>
          <rect width="15" height="30" fill="#03A461" />
          <rect x="15" width="15" height="30" fill="#FFFFFF" />
          <rect x="30" width="15" height="30" fill="#FF6600" />
        </>
      ) : (
        <>
          <defs>
            {/* Keeps one half of each red diagonal so the saltire is counterchanged. */}
            <clipPath id={clipId}>
              <path d="M22.5 15h22.5v15zv15h-22.5zh-22.5v-15zv-15h22.5z" />
            </clipPath>
          </defs>
          <rect width="45" height="30" fill="#012169" />
          <path d="M0 0l45 30M45 0L0 30" stroke="#FFFFFF" strokeWidth="6" />
          <path
            d="M0 0l45 30M45 0L0 30"
            stroke="#C8102E"
            strokeWidth="4"
            clipPath={`url(#${clipId})`}
          />
          <path d="M22.5 0v30M0 15h45" stroke="#FFFFFF" strokeWidth="10" />
          <path d="M22.5 0v30M0 15h45" stroke="#C8102E" strokeWidth="6" />
        </>
      )}
    </svg>
  )
}
