import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function StudioProjectCarousel({
  id,
  label,
  children,
  previousIcon,
  nextIcon,
}: {
  id: string
  label: string
  children: ReactNode
  previousIcon?: string
  nextIcon?: string
}) {
  const track = useRef<HTMLDivElement>(null)
  const count = Children.count(children)
  const [position, setPosition] = useState({
    index: 0,
    previous: false,
    next: false,
  })
  const update = useCallback(() => {
    const element = track.current
    if (!element) return
    const centre =
      element.getBoundingClientRect().left + element.clientWidth / 2
    let index = 0
    let distance = Infinity
    Array.from(element.children).forEach((slide, slideIndex) => {
      const bounds = slide.getBoundingClientRect()
      const delta = Math.abs(bounds.left + bounds.width / 2 - centre)
      if (delta < distance) {
        distance = delta
        index = slideIndex
      }
    })
    const previous = element.scrollLeft > 2
    const next =
      element.scrollLeft + element.clientWidth < element.scrollWidth - 2
    setPosition((current) =>
      current.index === index &&
      current.previous === previous &&
      current.next === next
        ? current
        : { index, previous, next },
    )
  }, [])
  useEffect(() => {
    const element = track.current
    if (!element) return
    update()
    const resize = new ResizeObserver(update)
    resize.observe(element)
    return () => resize.disconnect()
  }, [update, count])

  function scroll(direction: number) {
    const element = track.current
    if (!element) return
    const width =
      element.firstElementChild?.getBoundingClientRect().width ||
      element.clientWidth
    const gap = parseFloat(getComputedStyle(element).columnGap) || 0
    element.scrollBy({
      left: direction * (width + gap),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    })
  }
  return (
    <section
      className="studio-carousel"
      aria-label={label}
      aria-roledescription="carousel"
    >
      <div className="studio-carousel-toolbar">
        <div>
          <p>More selected work</p>
          <span>
            {count > 1 ? "Explore more projects" : "Selected project"}
          </span>
        </div>
        <div className="studio-carousel-controls">
          <span aria-live="polite" aria-atomic="true">
            {String(position.index + 1).padStart(2, "0")} /{" "}
            {String(count).padStart(2, "0")}
          </span>
          <button
            type="button"
            aria-label="Previous project"
            aria-controls={id}
            disabled={!position.previous}
            onClick={() => scroll(-1)}
          >
            {previousIcon ? (
              <img
                src={previousIcon}
                alt=""
                className="studio-reference-icon"
              />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>
          <button
            type="button"
            aria-label="Next project"
            aria-controls={id}
            disabled={!position.next}
            onClick={() => scroll(1)}
          >
            {nextIcon ? (
              <img src={nextIcon} alt="" className="studio-reference-icon" />
            ) : (
              <ChevronRight size={20} />
            )}
          </button>
        </div>
      </div>
      <div
        id={id}
        ref={track}
        className="studio-carousel-track"
        data-single={count === 1}
        tabIndex={count > 1 ? 0 : -1}
        role="group"
        aria-label={`${label} — use left and right arrow keys to scroll`}
        onScroll={update}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault()
            scroll(event.key === "ArrowLeft" ? -1 : 1)
          }
        }}
      >
        {Children.map(children, (child, index) => (
          <div
            className="studio-carousel-slide"
            role="group"
            aria-roledescription="slide"
            aria-label={`Project ${index + 1} of ${count}`}
          >
            {child}
          </div>
        ))}
      </div>
    </section>
  )
}
