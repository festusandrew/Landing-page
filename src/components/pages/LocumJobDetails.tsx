import { LOCUM_VISUALS } from "../../data/locumVisuals"
import { useEffect, useId, useRef, useState } from "react"
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock,
  ExternalLink,
  LockKeyhole,
  MapPin,
  Monitor,
  CircleHelp,
  Euro,
  PoundSterling,
  Info,
} from "lucide-react"
import {
  getPublicShiftDate,
  getShiftAreaMap,
  type PublicLocumShift,
} from "../../data/locumShiftPresentation"

export function LocumJobDetails({
  shift,
  reference,
  region,
  onBack,
  onApply,
  onLogin,
}: {
  shift: PublicLocumShift
  reference: string
  region: string
  onBack: () => void
  onApply: () => void
  onLogin: () => void
}) {
  const date = getPublicShiftDate(shift.date)
  const map = getShiftAreaMap(shift.location)
  const area = shift.location.replace(/,\s*(IE|UK|NI)$/, "")
  const CurrencyIcon = region === "Republic of Ireland" ? Euro : PoundSterling
  const [payInfoOpen, setPayInfoOpen] = useState(false)
  const payInfo = useRef<HTMLDivElement>(null)
  const payInfoId = useId()
  useEffect(() => {
    if (!payInfoOpen) return
    const closeOutside = (event: PointerEvent) => {
      if (!payInfo.current?.contains(event.target as Node))
        setPayInfoOpen(false)
    }
    document.addEventListener("pointerdown", closeOutside)
    return () => document.removeEventListener("pointerdown", closeOutside)
  }, [payInfoOpen])
  return (
    <section className="min-w-0 space-y-4" aria-label="Selected locum shift">
      <div className="flex items-center justify-between gap-3 text-[10px] text-slate-500">
        <span>Sample shift · {reference}</span>
        <span>{region}</span>
      </div>
      <h2 className="text-2xl font-medium leading-tight text-[#24332d]">
        Locum Pharmacist in {area}, {region}
        <br />
        <span className="text-[#368B62]">{date.long}</span>
      </h2>
      <div className="rounded-xl border border-black/5 bg-white p-5">
        <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#368B62]">
          <img
            src={LOCUM_VISUALS.shift.location[0]}
            alt=""
            className="locum-reference-icon"
          />
          {area}
        </p>
        <div className="grid gap-5 text-sm sm:grid-cols-2">
          <div className="space-y-3">
            <p className="flex items-start gap-2 text-slate-700">
              <img
                src={LOCUM_VISUALS.shift.clock[0]}
                alt=""
                className="locum-reference-icon"
              />
              <span>{shift.time}</span>
            </p>
            <p className="flex items-center gap-2 text-slate-700">
              <img
                src={LOCUM_VISUALS.shift.calendar[0]}
                alt=""
                className="locum-reference-icon"
              />
              {date.short}
            </p>
            <div className="flex items-center gap-2 text-[#368B62]">
              <button
                type="button"
                onClick={onLogin}
                aria-label="Shift pay is locked. Sign in to view pay."
                className="inline-flex items-center gap-2 rounded p-1"
              >
                <CurrencyIcon size={16} aria-hidden="true" />
                <LockKeyhole size={15} aria-hidden="true" />
              </button>
              <div
                ref={payInfo}
                className="relative"
                onMouseEnter={() => setPayInfoOpen(true)}
                onMouseLeave={() => {
                  if (!payInfo.current?.contains(document.activeElement))
                    setPayInfoOpen(false)
                }}
                onKeyDown={(event) => {
                  if (event.key === "Escape") setPayInfoOpen(false)
                }}
              >
                <button
                  type="button"
                  aria-label="Why is shift pay locked?"
                  aria-expanded={payInfoOpen}
                  aria-describedby={payInfoOpen ? payInfoId : undefined}
                  onFocus={() => setPayInfoOpen(true)}
                  onBlur={() => setPayInfoOpen(false)}
                  onClick={() => setPayInfoOpen(true)}
                  className="flex items-center justify-center rounded p-1 text-slate-500"
                >
                  <Info size={15} aria-hidden="true" />
                </button>
                {payInfoOpen && (
                  <div
                    id={payInfoId}
                    role="tooltip"
                    className="absolute left-0 top-full z-20 mt-2 w-52 rounded-lg border border-black/5 bg-white p-3 text-xs leading-6 text-[#24332d]"
                  >
                    Sign in to your MployUs account to view this shift’s pay.
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <p className="flex items-center gap-2 text-slate-700">
              <img
                src={LOCUM_VISUALS.shift.availability[0]}
                alt=""
                className="locum-reference-icon"
              />
              {shift.availability || "Availability to be confirmed"}
            </p>
            <p className="flex items-center gap-2 text-slate-700">
              <img
                src={LOCUM_VISUALS.shift.system[0]}
                alt=""
                className="locum-reference-icon"
              />
              {shift.dispensingSystem || "Dispensing system not supplied"}
            </p>
            <p className="pl-6 text-xs text-slate-500">
              Start / end time
              <br />
              <span className="mt-1 inline-block text-sm text-slate-700">
                {shift.time}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-black/5 bg-white px-5 py-3 text-sm font-medium text-[#24332d]"
        >
          <img
            src={LOCUM_VISUALS.shift.back[0]}
            alt=""
            className="locum-reference-icon"
          />
          Back to results
        </button>
        <button
          onClick={onApply}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#368B62] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#286d4c]"
        >
          Apply
          <img
            src={LOCUM_VISUALS.shift.apply[0]}
            alt=""
            className="locum-reference-icon"
          />
        </button>
      </div>
      <section
        className="overflow-hidden rounded-xl border border-black/5 bg-white"
        aria-labelledby="locum-shift-location"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/5 px-5 py-3">
          <h3
            id="locum-shift-location"
            className="text-sm font-semibold text-[#24332d]"
          >
            Shift location
          </h3>
          {map && (
            <a
              href={map.external}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-medium text-[#368B62]"
            >
              Open larger map
              <img
                src={LOCUM_VISUALS.shift.external[0]}
                alt=""
                className="locum-reference-icon"
              />
            </a>
          )}
        </div>
        {map ? (
          <iframe
            key={shift.location}
            src={map.embed}
            title={`Map of the general ${area} area`}
            className="block h-[280px] w-full border-0 sm:h-[320px]"
            loading="eager"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="flex h-56 flex-col items-center justify-center gap-3 bg-[#edf4ef] px-6 text-center">
            <MapPin size={28} className="text-[#368B62]" />
            <p className="text-sm">{area}</p>
            <p className="text-xs text-slate-500">
              Map unavailable for this area. Confirm the site address before
              booking.
            </p>
          </div>
        )}
        <p className="border-t border-black/5 px-5 py-3 text-[10px] leading-5 text-slate-500">
          General area only, not a verified workplace address. Confirm the exact
          location and arrival instructions with the facility. Map ©
          OpenStreetMap contributors.
        </p>
      </section>
      <p className="text-[10px] leading-5 text-slate-500">
        Preview listing, not a verified live vacancy. Confirm current
        availability, pay, duties, registration and booking terms before
        accepting a shift.
      </p>
    </section>
  )
}
