import { useId, type ReactNode } from "react"

/**
 * IE and UK are national flags; ENG, SCT and WLS are the flags of the UK nations.
 * Northern Ireland has no official flag of its own, so it uses the Union Flag (UK).
 */
export type FlagCountry = "IE" | "UK" | "ENG" | "SCT" | "WLS"

type CountryFlagProps = {
  country: FlagCountry
  className?: string
}

const RED = "#C8102E"

// The Union Flag is drawn inline below because its clip path needs an id unique to each instance.
const FLAG_ARTWORK: Record<Exclude<FlagCountry, "UK">, ReactNode> = {
  IE: (
    <>
      <rect width="15" height="30" fill="#03A461" />
      <rect x="15" width="15" height="30" fill="#FFFFFF" />
      <rect x="30" width="15" height="30" fill="#FF6600" />
    </>
  ),
  ENG: (
    <>
      <rect width="45" height="30" fill="#FFFFFF" />
      <path d="M22.5 0v30M0 15h45" stroke={RED} strokeWidth="6" />
    </>
  ),
  SCT: (
    <>
      <rect width="45" height="30" fill="#005EB8" />
      <path d="M0 0l45 30M45 0L0 30" stroke="#FFFFFF" strokeWidth="6" />
    </>
  ),
  WLS: (
    <>
      <rect width="45" height="15" fill="#FFFFFF" />
      <rect y="15" width="45" height="15" fill="#00B140" />
      {/* Y Ddraig Goch, simplified so it still reads at icon size. Drawn on a 90 × 60 grid. */}
      <g transform="scale(0.5)" fill={RED}>
        <path d="M33 25C31 17 32 9 37 3L40 9L38 16Z" />
        <path d="M35 26C33 17 38 9 47 5L59 2L56 8L62 10L55 13L60 16L53 18L57 21L50 23L52 26Z" />
        <path d="M27 31C27 24 37 23 47 25C56 26 63 25 68 29C72 33 69 40 61 40L38 41C30 41 27 37 27 31Z" />
        <path d="M27 31C24 27 22 24 21 20L29 12C31 17 34 21 38 25Z" />
        <path d="M29 12L32 5L27 8.5L20 8.5L11 11.5L12.5 13.5L19 15L12 18.5L14 20L22 21Z" />
        <path d="M33 37L41 38L38 49L39 51.5L31 52L31 50L34 49Z" />
        <path d="M56 36L64 37L60 49L61 51.5L52 52L53 49.5L56 48.5Z" />
        <path d="M8 14.3L5 16.2L8 18ZM68.5 11.4L64.9 17.1L71.5 16.6Z" />
        <g fill="none" stroke={RED} strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 15.5L8 16" strokeWidth="1.4" />
          <path d="M19 33L16 30M19 33L15.5 33M19 33L16 36" strokeWidth="1.5" />
          <path
            d="M33 34L25 37L19 33M68 31C77 35 85 30 83 21C82 14 75 11 70 14"
            strokeWidth="4.5"
          />
          <path d="M66 35L73 44L79 46.5" strokeWidth="5" />
        </g>
      </g>
    </>
  ),
}

/**
 * Flat 3:2 flags drawn as SVG so they look the same on every platform. Flag emoji are not
 * used: Windows renders country flags as letter pairs ("IE", "GB") and the England,
 * Scotland and Wales flags as plain black flags.
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
      {country === "UK" ? (
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
            stroke={RED}
            strokeWidth="4"
            clipPath={`url(#${clipId})`}
          />
          <path d="M22.5 0v30M0 15h45" stroke="#FFFFFF" strokeWidth="10" />
          <path d="M22.5 0v30M0 15h45" stroke={RED} strokeWidth="6" />
        </>
      ) : (
        FLAG_ARTWORK[country]
      )}
    </svg>
  )
}
