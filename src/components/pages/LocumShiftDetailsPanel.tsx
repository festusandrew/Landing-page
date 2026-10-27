import { useImperativeHandle, useLayoutEffect, useRef, type ReactNode, type Ref } from "react"

export type LocumShiftDetailsPanelHandle = {
  /** Brings the selected shift's details fully into view. */
  reveal: () => void
}

type Glide = { position: number; target: number }
type Controller = { reveal: () => void; reset: () => void; destroy: () => void }

// Slack for sub-pixel scroll positions.
const SLACK = 1

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), Math.max(min, max))

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches

function wheelPixels(event: WheelEvent) {
  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) return event.deltaY * 16
  if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) return event.deltaY * window.innerHeight
  return event.deltaY
}

/** Whether another scrollable element under the pointer should take the wheel first. */
function scrollsElsewhere(target: Element, panel: HTMLElement, delta: number) {
  for (
    let element: Element | null = target;
    element && element !== document.body;
    element = element.parentElement
  ) {
    if (element === panel) return false
    const { overflowY } = getComputedStyle(element)
    if (overflowY !== "auto" && overflowY !== "scroll") continue
    const room =
      delta > 0
        ? element.scrollHeight - element.clientHeight - element.scrollTop
        : element.scrollTop
    if (room > SLACK) return true
  }
  return false
}

function createController(panel: HTMLElement, content: HTMLElement): Controller {
  let panelGlide: Glide | null = null
  let pageGlide: Glide | null = null
  let frame = 0
  let previousTime = 0

  // The panel's sticky top below the header; NaN in the single-column layout,
  // where the details are part of the page.
  const pinLine = () => {
    const style = getComputedStyle(panel)
    return style.position === "sticky" ? parseFloat(style.top) : Number.NaN
  }
  const panelLimit = () => panel.scrollHeight - panel.clientHeight
  const pageLimit = () => document.documentElement.scrollHeight - window.innerHeight

  // Drives the edge fades in locum-reference.css.
  const updateEdges = () => {
    const limit = panelLimit()
    panel.dataset.overflowing = String(limit > SLACK)
    panel.dataset.atStart = String(panel.scrollTop <= SLACK)
    panel.dataset.atEnd = String(panel.scrollTop >= limit - SLACK)
  }

  // Moves a glide towards its target and reports whether it has landed.
  const advance = (glide: Glide, ease: number) => {
    const next = glide.position + (glide.target - glide.position) * ease
    glide.position = Math.abs(glide.target - next) < 0.5 ? glide.target : next
    return glide.position === glide.target
  }

  const tick = (time: number) => {
    const elapsed = previousTime ? Math.min(time - previousTime, 64) : 16
    previousTime = time
    // Eases out over roughly 200ms at any refresh rate.
    const ease = 1 - Math.pow(0.75, elapsed / 16)
    if (panelGlide) {
      // A scrollbar drag or keyboard scroll moved the panel, so the glide yields to it.
      if (Math.abs(panel.scrollTop - panelGlide.position) > 2) panelGlide = null
      else {
        const landed = advance(panelGlide, ease)
        panel.scrollTo({ top: panelGlide.position, behavior: "instant" })
        if (landed) panelGlide = null
      }
    }
    if (pageGlide) {
      if (Math.abs(window.scrollY - pageGlide.position) > 2) pageGlide = null
      else {
        const landed = advance(pageGlide, ease)
        window.scrollTo({ top: pageGlide.position, behavior: "instant" })
        if (landed) pageGlide = null
      }
    }
    frame = panelGlide || pageGlide ? requestAnimationFrame(tick) : 0
    if (!frame) previousTime = 0
  }

  const run = () => {
    if (!frame) frame = requestAnimationFrame(tick)
  }
  const glidePanel = (target: number) => {
    const top = clamp(target, 0, panelLimit())
    if (prefersReducedMotion()) {
      panelGlide = null
      panel.scrollTo({ top, behavior: "instant" })
      return
    }
    panelGlide = { position: panelGlide?.position ?? panel.scrollTop, target: top }
    run()
  }
  const glidePage = (target: number) => {
    const top = Math.round(clamp(target, 0, pageLimit()))
    if (prefersReducedMotion()) {
      pageGlide = null
      window.scrollTo({ top, behavior: "instant" })
      return
    }
    pageGlide = { position: pageGlide?.position ?? window.scrollY, target: top }
    run()
  }
  const stop = () => {
    panelGlide = null
    pageGlide = null
    cancelAnimationFrame(frame)
    frame = 0
    previousTime = 0
  }

  const onWheel = (event: WheelEvent) => {
    if (!event.cancelable || event.defaultPrevented || event.ctrlKey) return
    if (event.deltaY === 0 || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return
    const pin = pinLine()
    const target = event.target instanceof Element ? event.target : null
    if (Number.isNaN(pin) || !target || target.closest('[role="dialog"]')) return
    const delta = wheelPixels(event)
    if (scrollsElsewhere(target, panel, delta)) return

    const panelFrom = panelGlide?.target ?? panel.scrollTop
    const panelRoom = delta > 0 ? panelLimit() - panelFrom : panelFrom
    // The details are fully scrolled in this direction, so the page takes the wheel.
    if (panelRoom <= SLACK) {
      pageGlide = null
      return
    }
    const pageFrom = pageGlide?.target ?? window.scrollY
    const rect = panel.getBoundingClientRect()
    // Page travel that brings the panel's top to the pin line, counted from where
    // any glide in progress will land.
    const toPin = clamp(window.scrollY + rect.top - pin, 0, pageLimit()) - pageFrom
    const approaching = delta > 0 ? toPin > SLACK : toPin < -SLACK
    const passed = delta > 0 ? toPin < -SLACK : toPin > SLACK
    const onScreen = rect.top < window.innerHeight && rect.bottom > pin
    if (passed || (approaching && !onScreen)) return

    event.preventDefault()
    // The page carries the panel to the pin line, then holds while the details scroll.
    const pageStep = !approaching ? 0 : delta > 0 ? Math.min(delta, toPin) : Math.max(delta, toPin)
    if (pageStep !== 0) glidePage(pageFrom + pageStep)
    const rest = delta - pageStep
    if (Math.abs(rest) > 0.5) glidePanel(panelFrom + rest)
  }

  window.addEventListener("wheel", onWheel, { passive: false })
  window.addEventListener("pointerdown", stop, { passive: true })
  window.addEventListener("touchstart", stop, { passive: true })
  window.addEventListener("keydown", stop)
  panel.addEventListener("scroll", updateEdges, { passive: true })
  const resizeObserver = new ResizeObserver(updateEdges)
  resizeObserver.observe(panel)
  resizeObserver.observe(content)
  updateEdges()

  return {
    reveal() {
      const pin = pinLine()
      if (Number.isNaN(pin)) {
        panel.scrollIntoView({
          block: "start",
          behavior: prefersReducedMotion() ? "auto" : "smooth",
        })
        return
      }
      const rect = panel.getBoundingClientRect()
      if (rect.top >= pin - SLACK && rect.bottom <= window.innerHeight + SLACK) return
      glidePage(window.scrollY + rect.top - pin)
    },
    reset() {
      panelGlide = null
      panel.scrollTo({ top: 0, behavior: "instant" })
      updateEdges()
    },
    destroy() {
      stop()
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("pointerdown", stop)
      window.removeEventListener("touchstart", stop)
      window.removeEventListener("keydown", stop)
      panel.removeEventListener("scroll", updateEdges)
      resizeObserver.disconnect()
    },
  }
}

/**
 * Holds the selected shift. In the two-column layout it is a sticky panel with its own
 * scroll: wheel scrolling anywhere on the page first carries the panel up to its pinned
 * position, then scrolls the shift details with an eased glide while the page holds
 * still, and only then moves the page. Scrolling up rewinds the details the same way.
 */
export function LocumShiftDetailsPanel({
  ref,
  resetKey,
  children,
}: {
  ref?: Ref<LocumShiftDetailsPanelHandle>
  /** Changes when another shift is selected, so its details start from the top. */
  resetKey: string
  children: ReactNode
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const controller = useRef<Controller | null>(null)

  useLayoutEffect(() => {
    if (!panelRef.current || !contentRef.current) return
    const instance = createController(panelRef.current, contentRef.current)
    controller.current = instance
    return () => {
      instance.destroy()
      controller.current = null
    }
  }, [])

  useLayoutEffect(() => {
    controller.current?.reset()
  }, [resetKey])

  useImperativeHandle(ref, () => ({ reveal: () => controller.current?.reveal() }), [])

  return (
    <div
      id="selected-locum-shift"
      ref={panelRef}
      className="locum-shift-details min-w-0 scroll-mt-24"
    >
      <div ref={contentRef}>{children}</div>
    </div>
  )
}
